import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { LawsService } from '../laws/laws.service';
import { PostGeneratorService } from './post-generator.service';
import { PostDraft, Platform, TemplateId } from './types';

const HISTORY_WINDOW_DAYS = 90;

@Injectable()
export class PostDraftsService {
  private readonly logger = new Logger(PostDraftsService.name);

  constructor(
    private readonly supabase:   SupabaseService,
    private readonly laws:       LawsService,
    private readonly generator:  PostGeneratorService,
  ) {}

  // ── read ──────────────────────────────────────────────────────────────────

  async findAll(platform: Platform = 'twitter'): Promise<PostDraft[]> {
    const { data, error } = await this.supabase.db
      .from('post_drafts')
      .select('*')
      .eq('platform', platform)
      .order('created_at', { ascending: false });

    if (error) {
      this.logger.error('[findAll]', error.message);
      return [];
    }
    return (data ?? []).map(this.mapRow);
  }

  async findOne(id: string): Promise<PostDraft> {
    const { data, error } = await this.supabase.db
      .from('post_drafts')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) throw new NotFoundException(`Draft ${id} no encontrado`);
    return this.mapRow(data);
  }

  // ── generate ──────────────────────────────────────────────────────────────

  async generate(platform: Platform = 'twitter'): Promise<PostDraft | null> {
    const usedPairs = await this.getRecentlyUsed(platform);
    const usedSet   = new Set(usedPairs.map(p => `${p.lawId}::${p.articleNumber}`));

    // También excluir leyes que ya tienen un borrador pendiente
    const pending = await this.findAll(platform);
    for (const d of pending) usedSet.add(`${d.lawId}::${d.articleNumber}`);

    const law = this.pickLaw(usedSet);
    if (!law) {
      this.logger.warn('[generate] No hay leyes disponibles para generar');
      return null;
    }

    const result = this.generator.generate(law, usedSet);
    if (!result) return null;

    const { data, error } = await this.supabase.db
      .from('post_drafts')
      .insert({
        platform,
        post_text:      result.postText,
        comment_text:   result.commentText,
        law_id:         result.lawId,
        law_title:      result.lawTitle,
        article_number: result.articleNumber,
        utm_content:    result.utmContent,
        template_used:  result.templateUsed,
      })
      .select()
      .single();

    if (error || !data) {
      this.logger.error('[generate] insert error', error?.message);
      return null;
    }
    return this.mapRow(data);
  }

  // ── update (edit post text) ───────────────────────────────────────────────

  async update(id: string, postText: string, commentText: string): Promise<PostDraft> {
    const { data, error } = await this.supabase.db
      .from('post_drafts')
      .update({ post_text: postText, comment_text: commentText })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) throw new NotFoundException(`Draft ${id} no encontrado`);
    return this.mapRow(data);
  }

  // ── delete (publicado o descartado) ──────────────────────────────────────

  async remove(id: string, markAsPosted = false): Promise<void> {
    const draft = await this.findOne(id);

    if (markAsPosted) {
      await this.supabase.db.from('posted_law_history').insert({
        law_id:         draft.lawId,
        article_number: draft.articleNumber,
        platform:       draft.platform,
      });
    }

    const { error } = await this.supabase.db
      .from('post_drafts')
      .delete()
      .eq('id', id);

    if (error) this.logger.error('[remove]', error.message);
  }

  // ── helpers ───────────────────────────────────────────────────────────────

  private async getRecentlyUsed(platform: Platform): Promise<{ lawId: string; articleNumber: string }[]> {
    const since = new Date(Date.now() - HISTORY_WINDOW_DAYS * 86_400_000).toISOString();
    const { data } = await this.supabase.db
      .from('posted_law_history')
      .select('law_id, article_number')
      .eq('platform', platform)
      .gte('posted_at', since);
    return (data ?? []).map(r => ({ lawId: r.law_id, articleNumber: r.article_number }));
  }

  private pickLaw(usedSet: Set<string>) {
    // Paginación grande para traer todos los IDs de una sola vez
    const { data: summaries } = this.laws.findAll({ page: 1, limit: 500 });

    // Solo leyes con artículos cargados; excluir constituciones (poco tweetables)
    const eligible = (summaries ?? [])
      .filter(s => s.normType !== 'CONSTITUCION' && s.articleCount > 0)
      .map(s => {
        try { return this.laws.findOne(s.id); } catch { return null; }
      })
      .filter((l): l is NonNullable<typeof l> => !!l)
      .filter(l => (l.articles ?? []).length > 0);

    if (!eligible.length) return null;

    // Score: commonName (+10), artículos disponibles no usados (+2 c/u)
    const scored = eligible.map(law => {
      const unused = (law.articles ?? []).filter(
        a => !usedSet.has(`${law.id}::${a.number}`),
      ).length;
      return { law, score: (law.commonName ? 10 : 0) + unused * 2 };
    }).filter(s => s.score > 0);

    if (!scored.length) return null;

    scored.sort((a, b) => b.score - a.score);

    // Top 5 y elegir uno según el día de la semana (determinístico, sin random)
    const top5 = scored.slice(0, 5);
    const idx  = new Date().getDay() % top5.length;
    return top5[idx].law;
  }

  private mapRow(row: Record<string, unknown>): PostDraft {
    return {
      id:            row.id            as string,
      createdAt:     row.created_at    as string,
      platform:      row.platform      as Platform,
      postText:      row.post_text     as string,
      commentText:   row.comment_text  as string,
      lawId:         row.law_id        as string,
      lawTitle:      row.law_title     as string,
      articleNumber: row.article_number as string,
      utmContent:    row.utm_content   as string,
      templateUsed:  row.template_used as TemplateId,
    };
  }
}
