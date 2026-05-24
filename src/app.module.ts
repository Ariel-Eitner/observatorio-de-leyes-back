import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LawsModule } from './laws/laws.module';
import { ArticlesModule } from './articles/articles.module';
import { SegmentsModule } from './segments/segments.module';
import { SearchModule } from './search/search.module';
import { ConstitucionesProvincialesModule } from './constituciones-provinciales/constituciones-provinciales.module';
import { HealthModule } from './health/health.module';
import { PagesModule }  from './pages/pages.module';
import { EventsModule }    from './events/events.module';
import { AdminModule }       from './admin/admin.module';
import { PrismaModule }      from './common/prisma/prisma.module';
import { PostDraftsModule }  from './post-drafts/post-drafts.module';
import { ExportsModule }         from './exports/exports.module';
import { ContractAnalyzerModule } from './contract-analyzer/contract-analyzer.module';
import { FinanzasModule }         from './finanzas/finanzas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    PrismaModule,
    // Rate limiting por IP — cada IP tiene su propia ventana
    ThrottlerModule.forRoot([{
      name:  'global',
      ttl:   60_000,   // ventana de 1 minuto
      limit: 120,      // 120 req/min por IP — generoso para leer leyes
    }]),
    LawsModule,
    ArticlesModule,
    SegmentsModule,
    SearchModule,
    ConstitucionesProvincialesModule,
    HealthModule,
    PagesModule,
    EventsModule,
    AdminModule,
    PostDraftsModule,
    ExportsModule,
    ContractAnalyzerModule,
    FinanzasModule,
  ],
  providers: [
    // Aplicar rate limiting globalmente por IP (ThrottlerGuard usa IP por defecto)
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
