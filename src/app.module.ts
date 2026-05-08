import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LawsModule } from './laws/laws.module';
import { ArticlesModule } from './articles/articles.module';
import { SegmentsModule } from './segments/segments.module';
import { SearchModule } from './search/search.module';
import { ConstitutionModule } from './constitution/constitution.module';
import { CodigoPenalModule } from './codigo-penal/codigo-penal.module';
import { CodigoProcesalPenalModule } from './codigo-procesal-penal/codigo-procesal-penal.module';
import { CodigoAduaneroModule } from './codigo-aduanero/codigo-aduanero.module';
import { CartaOnuModule } from './carta-onu/carta-onu.module';
import { LctModule } from './lct/lct.module';
import { ConstitucionesProvincialesModule } from './constituciones-provinciales/constituciones-provinciales.module';
import { CodigoCivilComercialModule } from './codigo-civil-comercial/codigo-civil-comercial.module';
import { HealthModule } from './health/health.module';
import { PagesModule }  from './pages/pages.module';
import { EventsModule }    from './events/events.module';
import { AdminModule }       from './admin/admin.module';
import { SupabaseModule }    from './supabase/supabase.module';
import { PostDraftsModule }  from './post-drafts/post-drafts.module';
import { LeyPenalJuvenilModule } from './ley-penal-juvenil/ley-penal-juvenil.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    SupabaseModule,
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
    ConstitutionModule,
    CodigoPenalModule,
    CodigoProcesalPenalModule,
    CodigoAduaneroModule,
    CartaOnuModule,
    LctModule,
    ConstitucionesProvincialesModule,
    CodigoCivilComercialModule,
    HealthModule,
    PagesModule,
    EventsModule,
    AdminModule,
    PostDraftsModule,
    LeyPenalJuvenilModule,
  ],
  providers: [
    // Aplicar rate limiting globalmente por IP (ThrottlerGuard usa IP por defecto)
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
