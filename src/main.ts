import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger, LogLevel } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { describeDbTarget } from './common/db-env';

async function bootstrap() {
  const isProd = process.env.NODE_ENV === 'production';

  // En producción solo warn+error; en dev se agrega log+verbose
  const logLevels: LogLevel[] = isProd
    ? ['warn', 'error']
    : ['log', 'warn', 'error', 'verbose'];

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: logLevels,
    // Los parsers se registran a mano más abajo para poder dar un límite distinto
    // por ruta. Con el parser de fábrica no se puede: es uno solo para todo.
    bodyParser: false,
  });
  const logger = new Logger('Bootstrap');

  // ── Compresión de las respuestas ────────────────────────────────────────────
  // Va PRIMERO, antes que cualquier otro middleware que escriba en la respuesta:
  // engancha `res.write`/`res.end` y solo comprime lo que pase después de él.
  //
  // El borde de Render ya comprime hacia el navegador, así que esto no cambia lo
  // que ve un visitante. Lo que arregla son los dos tramos que hoy van en crudo:
  // el de Next→Nest (que es servidor contra servidor, y es por donde pasa TODO el
  // tráfico del sitio por el modelo BFF) y el entorno local. Medido sobre
  // /laws/registry: 1.700.252 B → 211.364 B, 8,0x.
  //
  // El umbral de fábrica (1 kb) queda: comprimir respuestas chicas cuesta más CPU
  // del que ahorra en bytes, y el contenedor tiene 0.2 CPU.
  app.use(compression());

  // ── Tamaño máximo del body ──────────────────────────────────────────────────
  // El default de body-parser (100 kb) alcanza para todo el sitio MENOS para el
  // panel: un snapshot de métricas ronda los 500 kb (guarda arrays de eventos) y
  // los recorridos congelados también pesan. Con el límite de fábrica el POST
  // moría con 413 y el panel mostraba "sin datos" sin decir por qué.
  //
  // El límite grande va SOLO en /api/admin-data, que está detrás de
  // AdminHeaderGuard. Subirlo global sería regalar un vector de agotamiento de
  // memoria en rutas públicas, y el contenedor tiene 256 MB (ya hubo un OOM).
  //
  // El orden importa: body-parser marca `req._body` al parsear y el siguiente se
  // saltea solo. Por eso el específico va PRIMERO y el general después.
  app.use('/api/admin-data', json({ limit: '25mb' }));
  app.use(json());
  app.use(urlencoded({ extended: true }));

  // ── Confiar en el proxy ─────────────────────────────────────────────────────
  // Sin esto, Express ignora X-Forwarded-For y `req.ip` es la IP del balanceador
  // de Render (la misma para todo el mundo), así que el rate limit por IP no
  // identifica a nadie. El '1' es a propósito: confiar en UN salto (el proxy de
  // la plataforma) y no en toda la cadena, que el cliente sí puede inventar.
  app.set('trust proxy', 1);

  // ── A qué base estamos apuntando ────────────────────────────────────────────
  // El stack "local" comparte la base con producción, así que arrancar sin saber
  // contra qué se está trabajando es la receta del borrado accidental.
  const db = describeDbTarget();
  if (db.isProduction) {
    logger.warn(`BASE DE DATOS: ${db.label} — las escrituras impactan datos reales`);
  } else {
    logger.log(`Base de datos: ${db.label}`);
  }

  // ── Seguridad HTTP ──────────────────────────────────────────────────────────
  app.use(helmet());
  app.use((_req, res, next) => {
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
    next();
  });
  app.use(cookieParser());

  app.setGlobalPrefix('api');

  // ── CORS — solo orígenes conocidos ─────────────────────────────────────────
  const PROD_ORIGINS = [
    'https://observatorio-de-leyes-front.vercel.app',
    'https://observatoriodeleyes.ar',
    'https://www.observatoriodeleyes.ar',
  ];
  const allowedOrigins = isProd
    ? [...PROD_ORIGINS, ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])]
    : ['http://localhost:3000', 'http://localhost:4000'];

  app.enableCors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (SSR, curl local, Postman en dev)
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  });

  // ── Validación global ───────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:            true,
      transform:            true,
      forbidNonWhitelisted: true,
    }),
  );

  // ── Swagger — solo en dev ───────────────────────────────────────────────────
  if (!isProd) {
    const config = new DocumentBuilder()
      .setTitle('Observatorio de Leyes API')
      .setDescription('API para el repositorio y visualizador de leyes argentinas')
      .setVersion('1.0')
      .addTag('laws', 'Gestión de leyes')
      .addTag('articles', 'Artículos de leyes')
      .addTag('segments', 'Segmentos de artículos')
      .addTag('search', 'Búsqueda full-text')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    logger.log(`Swagger: http://localhost:${process.env.PORT || 3600}/api/docs`);
  }

  const port = process.env.PORT || 3600;
  await app.listen(port);
  logger.log(`API lista en puerto ${port}`);
}

bootstrap();
