import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProxyThrottlerGuard } from './common/guards/proxy-throttler.guard';
import { APP_GUARD } from '@nestjs/core';
import { LawsModule } from './laws/laws.module';
import { ToursModule } from './tours/tours.module';
import { ArticlesModule } from './articles/articles.module';
import { SegmentsModule } from './segments/segments.module';
import { SearchModule } from './search/search.module';
import { ConstitucionesProvincialesModule } from './constituciones-provinciales/constituciones-provinciales.module';
import { HealthModule } from './health/health.module';
import { PagesModule }  from './pages/pages.module';
import { EventsModule }    from './events/events.module';
import { AdminModule }       from './admin/admin.module';
import { AdminDataModule }   from './admin-data/admin-data.module';
import { PrismaModule }      from './common/prisma/prisma.module';
import { PostDraftsModule }  from './post-drafts/post-drafts.module';
import { ExportsModule }         from './exports/exports.module';
import { ContractAnalyzerModule } from './contract-analyzer/contract-analyzer.module';
import { FinanzasModule }         from './finanzas/finanzas.module';
import { CrmModule }              from './crm/crm.module';
import { JurisprudenciaModule }   from './jurisprudencia/jurisprudencia.module';
import { AuthModule }             from './auth/auth.module';
import { AccountModule }          from './account/account.module';
import { UserContentModule }      from './user-content/user-content.module';
import { UsersModule }            from './users/users.module';
import { CorpusReadyGuard }       from './common/guards/corpus-ready.guard';
import { MonitorModule }          from './monitor/monitor.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    PrismaModule,
    // Primero de la lista: su interceptor tiene que envolver a todos los demás
    // para medir el tiempo real de respuesta, no el de un tramo.
    MonitorModule,
    // Rate limiting por IP — cada IP tiene su propia ventana.
    //
    // OJO: hay UN solo throttler y se llama 'global'. Las anulaciones por ruta
    // (@Throttle) tienen que usar exactamente ese nombre como clave; con una
    // clave inexistente la anulación se descarta EN SILENCIO y la ruta se queda
    // con este límite genérico. Y no agregues un segundo throttler solo para
    // tener un límite más bajo en auth: en @nestjs/throttler v6 todos los
    // throttlers registrados se aplican a TODAS las rutas, así que uno de 10/min
    // limitaría el sitio entero.
    ThrottlerModule.forRoot([{
      name:  'global',
      ttl:   60_000,   // ventana de 1 minuto
      limit: 120,      // 120 req/min por IP — generoso para leer leyes
    }]),
    LawsModule,
    ToursModule,
    ArticlesModule,
    SegmentsModule,
    SearchModule,
    ConstitucionesProvincialesModule,
    HealthModule,
    PagesModule,
    EventsModule,
    AdminModule,
    AdminDataModule,
    PostDraftsModule,
    ExportsModule,
    ContractAnalyzerModule,
    FinanzasModule,
    CrmModule,
    JurisprudenciaModule,
    AuthModule,
    AccountModule,
    UserContentModule,
    UsersModule,
  ],
  providers: [
    // Rate limiting global. ProxyThrottlerGuard (no el ThrottlerGuard de fábrica)
    // porque detrás de Render + el BFF de Vercel `req.ip` es siempre la misma:
    // cuenta por la IP real del usuario, firmada por el frontend.
    { provide: APP_GUARD, useClass: ProxyThrottlerGuard },
    // El puerto abre antes de que el corpus esté cargado: 503 en las rutas que lo
    // necesitan hasta que termine de hidratar (ver LawsService.onModuleInit).
    { provide: APP_GUARD, useClass: CorpusReadyGuard },
  ],
})
export class AppModule {}
