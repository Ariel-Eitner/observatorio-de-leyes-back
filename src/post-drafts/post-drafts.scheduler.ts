import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PostDraftsService } from './post-drafts.service';
import { SupabaseService } from '../supabase/supabase.service';
import { Platform } from './types';

// Días UTC en que corre cada plataforma y la hora programada (UTC)
const SCHEDULE: Record<Platform, { days: number[]; hour: number }> = {
  twitter:  { days: [1, 3, 5], hour: 11 }, // lun, mié, vie a las 11 UTC (8am ARG)
  linkedin: { days: [2, 4],    hour: 11 }, // mar, jue a las 11 UTC (8am ARG)
};

@Injectable()
export class PostDraftsScheduler implements OnApplicationBootstrap {
  private readonly logger = new Logger(PostDraftsScheduler.name);

  constructor(
    private readonly service:   PostDraftsService,
    private readonly supabase:  SupabaseService,
  ) {}

  // ── Recuperación de crons perdidos al arrancar ─────────────────────────────

  async onApplicationBootstrap() {
    const now = new Date();
    for (const platform of ['twitter', 'linkedin'] as Platform[]) {
      const { days, hour } = SCHEDULE[platform];
      const dayUTC  = now.getUTCDay();
      const hourUTC = now.getUTCHours();

      // Solo actuar si hoy es un día programado y ya pasó la hora de corte
      if (!days.includes(dayUTC) || hourUTC < hour) continue;

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

  // ── Helper ─────────────────────────────────────────────────────────────────

  private async hasCoverageToday(platform: Platform): Promise<boolean> {
    const todayUTC = new Date();
    todayUTC.setUTCHours(0, 0, 0, 0);
    const since = todayUTC.toISOString();

    // ¿Hay un borrador generado hoy?
    const { data: drafts } = await this.supabase.db
      .from('post_drafts')
      .select('id')
      .eq('platform', platform)
      .gte('created_at', since)
      .limit(1);

    if (drafts && drafts.length > 0) return true;

    // ¿Ya se publicó algo hoy (borrador ya procesado)?
    const { data: history } = await this.supabase.db
      .from('posted_law_history')
      .select('id')
      .eq('platform', platform)
      .gte('posted_at', since)
      .limit(1);

    return !!(history && history.length > 0);
  }
}
