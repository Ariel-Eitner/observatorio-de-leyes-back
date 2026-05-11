import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PostDraftsService } from './post-drafts.service';

@Injectable()
export class PostDraftsScheduler {
  private readonly logger = new Logger(PostDraftsScheduler.name);

  constructor(private readonly service: PostDraftsService) {}

  // Twitter: lunes, miércoles y viernes a las 8am Argentina (UTC-3 = 11:00 UTC)
  @Cron('0 11 * * 1,3,5')
  async generateTwitterDraft() {
    this.logger.log('[cron] Generando borrador Twitter...');
    const draft = await this.service.generate('twitter');
    if (draft) {
      this.logger.log(`[cron] Twitter: ${draft.lawTitle} Art. ${draft.articleNumber} (${draft.templateUsed})`);
    } else {
      this.logger.warn('[cron] No se pudo generar borrador Twitter');
    }
  }

  // LinkedIn: martes y jueves a las 8am Argentina (UTC-3 = 11:00 UTC)
  @Cron('0 11 * * 2,4')
  async generateLinkedInDraft() {
    this.logger.log('[cron] Generando borrador LinkedIn...');
    const draft = await this.service.generate('linkedin');
    if (draft) {
      this.logger.log(`[cron] LinkedIn: ${draft.lawTitle} Art. ${draft.articleNumber} (${draft.templateUsed})`);
    } else {
      this.logger.warn('[cron] No se pudo generar borrador LinkedIn');
    }
  }
}
