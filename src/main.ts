import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger, LogLevel } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const isProd = process.env.NODE_ENV === 'production';

  // En producción solo warn+error; en dev se agrega log+verbose
  const logLevels: LogLevel[] = isProd
    ? ['warn', 'error']
    : ['log', 'warn', 'error', 'verbose'];

  const app = await NestFactory.create(AppModule, { logger: logLevels });
  const logger = new Logger('Bootstrap');

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
