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

    const law = this.pickLaw(usedSet);
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

  private pickLaw(usedSet: Set<string>) {
    const { data: summaries } = this.laws.findAll({ page: 1, limit: 500 });

    const eligible = (summaries ?? [])
      .filter(s => s.normType !== 'CONSTITUCION' && s.articleCount > 0)
      .map(s => {
        try { return this.laws.findOne(s.id); } catch { return null; }
      })
      .filter((l): l is NonNullable<typeof l> => !!l)
      .filter(l => (l.articles ?? []).length > 0);

    if (!eligible.length) return null;

    const scored = eligible.map(law => {
      const unused = (law.articles ?? []).filter(
        a => !usedSet.has(`${law.id}::${a.number}`),
      ).length;
      return { law, score: (law.commonName ? 10 : 0) + unused * 2 };
    }).filter(s => s.score > 0);

    if (!scored.length) return null;
    scored.sort((a, b) => b.score - a.score);
    const top5 = scored.slice(0, 5);
    const idx  = new Date().getDay() % top5.length;
    return top5[idx].law;
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
