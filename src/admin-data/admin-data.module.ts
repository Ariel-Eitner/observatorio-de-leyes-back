import { Module } from '@nestjs/common';
import { AdminDataController } from './admin-data.controller';
import { PanelService } from './panel.service';
import { ComercialService } from './comercial.service';
import { AnaliticaService } from './analitica.service';
import { TareasService } from './tareas.service';
import { CorpusReviewService } from './corpus-review.service';

/**
 * Datos del panel de administración.
 *
 * Aparte de `admin/` (que ya tenía hitos y beneficios) porque este módulo es la
 * contraparte de `crm/`: la migración del acceso directo del frontend a
 * Supabase. crm/ cubrió las rutas públicas; esto cubre las de admin.
 */
@Module({
  controllers: [AdminDataController],
  providers: [
    PanelService,
    ComercialService,
    AnaliticaService,
    TareasService,
    CorpusReviewService,
  ],
})
export class AdminDataModule {}
