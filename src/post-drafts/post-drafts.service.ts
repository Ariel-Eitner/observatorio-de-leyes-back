import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PostDraft as PrismaPostDraft } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { LawsService } from '../laws/laws.service';
import { PostGeneratorService } from './post-generator.service';
import { LinkedInGeneratorService } from './linkedin-generator.service';
import { PostDraft, Platform, TemplateId } from './types';

const HISTORY_WINDOW_DAYS = 90;

@Injectable()
export class PostDraftsService {
  private readonly logger = new Logger(PostDraftsService.name);

  constructor(
    private readonly prisma:       PrismaService,
    private readonly laws:         LawsService,
    private readonly generator:    PostGeneratorService,
    private readonly liGenerator:  LinkedInGeneratorService,
  ) {}

  // ── read ──────────────────────────────────────────────────────────────────

  async findAll(platform: Platform = 'twitter'): Promise<PostDraft[]> {
    const rows = await this.prisma.postDraft.findMany({
      where:   { platform },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(r => this.mapRow(r));
  }

  async findOne(id: string): Promise<PostDraft> {
    const row = await this.prisma.postDraft.findUnique({ where: { id } });
    if (!row) throw new NotFoundException(`Draft ${id} no encontrado`);
    return this.mapRow(row);
  }

  // ── generate ──────────────────────────────────────────────────────────────

  async generate(platform: Platform = 'twitter'): Promise<PostDraft | null> {
    const usedPairs = await this.getRecentlyUsed(platform);
    const usedSet   = new Set(usedPairs.map(p => `${p.lawId}::${p.articleNumber}`));

    const pending = await this.findAll(platform);
    for (const d of pending) usedSet.add(`${d.lawId}::${d.articleNumber}`);

    const law = await this.pickLaw(usedSet);
    if (!law) {
      this.logger.warn('[generate] No hay leyes disponibles para generar');
      return null;
    }

    const result = platform === 'linkedin'
      ? this.liGenerator.generate(law, usedSet)
      : this.generator.generate(law, usedSet);
    if (!result) return null;

    try {
      const row = await this.prisma.postDraft.create({
        data: {
          platform,
          postText:      result.postText,
          commentText:   result.commentText,
          hashtags:      result.hashtags,
          lawId:         result.lawId,
          lawTitle:      result.lawTitle,
          articleNumber: result.articleNumber,
          utmContent:    result.utmContent,
          templateUsed:  result.templateUsed,
        },
      });
      return this.mapRow(row);
    } catch (e) {
      this.logger.error('[generate] create error', (e as Error).message);
      return null;
    }
  }

  // ── update ────────────────────────────────────────────────────────────────

  async update(id: string, postText: string, commentText: string): Promise<PostDraft> {
    try {
      const row = await this.prisma.postDraft.update({
        where: { id },
        data:  { postText, commentText },
      });
      return this.mapRow(row);
    } catch {
      throw new NotFoundException(`Draft ${id} no encontrado`);
    }
  }

  // ── delete ────────────────────────────────────────────────────────────────

  async remove(id: string, markAsPosted = false): Promise<void> {
    const draft = await this.findOne(id);

    if (markAsPosted) {
      await this.prisma.postedLawHistory.create({
        data: {
          lawId:         draft.lawId,
          articleNumber: draft.articleNumber,
          platform:      draft.platform,
        },
      });
    }

    await this.prisma.postDraft.delete({ where: { id } });
  }

  // ── helpers ───────────────────────────────────────────────────────────────

  private async getRecentlyUsed(platform: Platform): Promise<{ lawId: string; articleNumber: string }[]> {
    const since = new Date(Date.now() - HISTORY_WINDOW_DAYS * 86_400_000);
    return this.prisma.postedLawHistory.findMany({
      where:  { platform, postedAt: { gte: since } },
      select: { lawId: true, articleNumber: true },
    });
  }

  /**
   * Elige la norma del próximo borrador. Puntúa con los datos del índice y baja el
   * articulado de UNA sola: la ganadora.
   *
   * Antes puntuaba abriendo las 500 normas del listado para contarles los artículos
   * sin usar. Con el articulado en la BD eso serían 500 consultas para descartar
   * 499. El conteo sale igual de `articleCount` menos los pares ya usados de esa
   * norma, que están en `usedSet`.
   */
  private async pickLaw(usedSet: Set<string>) {
    const { data: summaries } = this.laws.findAll({ page: 1, limit: 500 });

    const usados = new Map<string, number>();
    for (const clave of usedSet) {
      const lawId = clave.slice(0, clave.indexOf('::'));
      usados.set(lawId, (usados.get(lawId) ?? 0) + 1);
    }

    const scored = (summaries ?? [])
      .filter(s => s.normType !== 'CONSTITUCION' && s.articleCount > 0)
      .map(s => {
        const unused = Math.max(0, s.articleCount - (usados.get(s.id) ?? 0));
        return { id: s.id, score: (s.commonName ? 10 : 0) + unused * 2 };
      })
      .filter(s => s.score > 0);

    if (!scored.length) return null;
    scored.sort((a, b) => b.score - a.score);
    const top5 = scored.slice(0, 5);
    const idx  = new Date().getDay() % top5.length;
    const law  = await this.laws.getFullNorm(top5[idx].id);
    // Si la ganadora resultó no tener articulado cargado, no hay borrador que hacer.
    return law && (law.articles ?? []).length > 0 ? law : null;
  }

  private mapRow(row: PrismaPostDraft): PostDraft {
    return {
      id:            row.id,
      createdAt:     row.createdAt.toISOString(),
      platform:      row.platform      as Platform,
      postText:      row.postText,
      commentText:   row.commentText,
      hashtags:      row.hashtags      ?? '',
      lawId:         row.lawId,
      lawTitle:      row.lawTitle,
      articleNumber: row.articleNumber,
      utmContent:    row.utmContent    ?? '',
      templateUsed:  row.templateUsed  as TemplateId,
    };
  }
}
