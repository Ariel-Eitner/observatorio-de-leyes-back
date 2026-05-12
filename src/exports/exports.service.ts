import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

export type ExportType = 'pdf' | 'docx';

export interface ExportCountResult {
  used:      number;
  limit:     number;
  remaining: number;
}

const EXPORT_LIMIT = 10;

function todayUTC(): string {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString();
}

@Injectable()
export class ExportsService {
  private readonly logger = new Logger(ExportsService.name);

  constructor(private readonly supabase: SupabaseService) {}

  async getCount(guestId: string, type: ExportType): Promise<ExportCountResult> {
    const { count, error } = await this.supabase.db
      .from('export_generations')
      .select('*', { count: 'exact', head: true })
      .eq('guest_id', guestId)
      .eq('type', type)
      .gte('created_at', todayUTC());

    if (error) {
      this.logger.error(`getCount: ${error.code} ${error.message}`);
      return { used: 0, limit: EXPORT_LIMIT, remaining: EXPORT_LIMIT };
    }

    const used = count ?? 0;
    return { used, limit: EXPORT_LIMIT, remaining: Math.max(0, EXPORT_LIMIT - used) };
  }

  async record(guestId: string, type: ExportType): Promise<{ ok: boolean; remaining: number }> {
    const current = await this.getCount(guestId, type);
    if (current.remaining <= 0) {
      return { ok: false, remaining: 0 };
    }

    const { error } = await this.supabase.db
      .from('export_generations')
      .insert({ guest_id: guestId, type });

    if (error) {
      this.logger.error(`record: ${error.code} ${error.message}`);
      return { ok: false, remaining: current.remaining };
    }

    return { ok: true, remaining: current.remaining - 1 };
  }
}
