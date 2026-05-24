import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PostDraftsService } from './post-drafts.service';
import { PrismaService } from '../common/prisma/prisma.service';
import { Platform } from './types';

const SCHEDULE: Record<Platform, { days: number[]; hour: number }> = {
  twitter:  { days: [1, 3, 5], hour: 11 },
  linkedin: { days: [2, 4],    hour: 11 },
};

@Injectable()
export class PostDraftsScheduler implements OnApplicationBootstrap {
  private readonly logger = new Logger(PostDraftsScheduler.name);

  constructor(
    private readonly service: PostDraftsService,
    private readonly prisma:  PrismaService,
  ) {}

  // ── Recuperación de crons perdidos al arrancar ─────────────────────────────

  async onApplicationBootstrap() {
    const now = new Date();
    for (const platform of ['twitter', 'linkedin'] as Platform[]) {
      const { days, hour } = SCHEDULE[platform];
      if (!days.includes(now.getUTCDay()) || now.getUTCHours() < hour) continue;

      const covered = await this.hasCoverageToday(platform);
      if (covered) continue;

      this.logger.warn(`[startup] Cron perdido detectado para ${platform} — generando ahora`);
      const draft = await this.service.generate(platform);
      if (draft) {
        this.logger.log(`[startup] ${platform} recuperado: ${draft.lawTitle} Art. ${draft.articleNumber}`);
      } else {
        this.logger.warn(`[startup] No se pudo recuperar borrador de ${platform}`);
      }
    }
  }

  // ── Crons normales ─────────────────────────────────────────────────────────

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

  // ── Helper ─────────────────────────────────────────────────────────────────

  private async hasCoverageToday(platform: Platform): Promise<boolean> {
    const since = new Date();
    since.setUTCHours(0, 0, 0, 0);

    const draft = await this.prisma.postDraft.findFirst({
      where: { platform, createdAt: { gte: since } },
    });
    if (draft) return true;

    const history = await this.prisma.postedLawHistory.findFirst({
      where: { platform, postedAt: { gte: since } },
    });
    return !!history;
  }
}
