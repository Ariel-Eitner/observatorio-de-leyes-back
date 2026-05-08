import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PostDraftsService } from './post-drafts.service';

@Injectable()
export class PostDraftsScheduler {
  private readonly logger = new Logger(PostDraftsScheduler.name);

  constructor(private readonly service: PostDraftsService) {}

  // Lunes, miércoles y viernes a las 8am Argentina (UTC-3 = 11:00 UTC)
  @Cron('0 11 * * 1,3,5')
  async generateDraft() {
    this.logger.log('[cron] Generando borrador semanal...');
    const draft = await this.service.generate('twitter');
    if (draft) {
      this.logger.log(`[cron] Borrador generado: ${draft.lawTitle} Art. ${draft.articleNumber} (${draft.templateUsed})`);
    } else {
      this.logger.warn('[cron] No se pudo generar borrador');
    }
  }
}
