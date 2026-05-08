import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

export interface TrackEventDto {
  type:        string;
  sessionId:   string;
  guestId?:    string;
  properties?: Record<string, unknown>;
  context?:    Record<string, unknown>;
}

export interface TrackedEvent extends TrackEventDto {
  id:        string;
  timestamp: string;
}

@Injectable()
export class EventsService {
  constructor(private readonly supabase: SupabaseService) {}

  async track(dto: TrackEventDto): Promise<void> {
    const { error } = await this.supabase.db
      .from('tracking_events')
      .insert({
        type:       dto.type,
        session_id: dto.sessionId,
        guest_id:   dto.guestId   ?? null,
        properties: dto.properties ?? null,
        context:    dto.context    ?? null,
      });
    if (error) console.error('[events.track]', error.code, error.message);
  }

  async readAll(): Promise<TrackedEvent[]> {
    const { data, error } = await this.supabase.db
      .from('tracking_events')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(100_000);
    if (error || !data) {
      if (error) console.error('[events.readAll]', error.code, error.message);
      return [];
    }
    return data.map((row) => ({
      id:         row.id,
      type:       row.type,
      timestamp:  row.created_at,
      sessionId:  row.session_id,
      guestId:    row.guest_id   ?? undefined,
      properties: row.properties ?? undefined,
      context:    row.context    ?? undefined,
    }));
  }

  async clear(): Promise<void> {
    const { error } = await this.supabase.db
      .from('tracking_events')
      .delete()
      .lte('created_at', new Date().toISOString());
    if (error) console.error('[events.clear]', error.code, error.message);
  }
}
