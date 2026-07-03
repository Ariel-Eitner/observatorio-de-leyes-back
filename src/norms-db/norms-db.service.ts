import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import type {
  Law, Article, LawSegment, ArticleAmendment, LawAmendment,
  LawSection, LawTitle, Annex, LawRelation, LawMetadata,
  LawStatus, Jurisdiction, NormType, SegmentType, ArticleStatus, AmendmentType, RelationType,
  VisualItem, JurisprudenceRef,
} from '../common/types/law.types';
import type { NormStub } from '../data/norm-stubs';

// Convierte columnas date / timestamptz (Date | null) a los strings que usa el tipo Law.
const dDate = (d: Date | null): string | null => (d ? d.toISOString().slice(0, 10) : null);
const dTs = (d: Date | null): string => (d ? d.toISOString() : '');

@Injectable()
export class NormsDbService {
  private readonly logger = new Logger(NormsDbService.name);

  constructor(private readonly prisma: PrismaService) {}

  /** Ids de normas presentes en la BD (para el tracker de migración). */
  async listIds(): Promise<string[]> {
    const rows = await this.prisma.norms.findMany({ select: { id: true } });
    return rows.map((r) => r.id);
  }

  /**
   * Id + marca de actualización de cada norma (consulta liviana, sin artículos).
   * Sirve para refrescar el corpus en memoria de forma incremental: detecta altas,
   * bajas y ediciones (una norma re-cargada cambia su `updated_at`).
   */
  async listIdStamps(): Promise<{ id: string; updatedAt: string }[]> {
    const rows = await this.prisma.norms.findMany({ select: { id: true, updated_at: true } });
    return rows.map((r) => ({ id: r.id, updatedAt: r.updated_at ? r.updated_at.toISOString() : '' }));
  }

  /** Stubs de normas referenciadas pero no cargadas (tabla norm_stubs). */
  async listStubs(): Promise<NormStub[]> {
    const rows = await this.prisma.norm_stubs.findMany({ orderBy: { number: 'asc' } });
    return rows.map((r) => ({ number: r.number, name: r.name, infolegId: r.infoleg_id ?? undefined }));
  }

  /** Categorías temáticas (tabla categories). */
  async listCategories(): Promise<
    { slug: string; label: string; description: string | null; icon: string | null; ord: number }[]
  > {
    const rows = await this.prisma.categories.findMany({ orderBy: { ord: 'asc' } });
    return rows.map((r) => ({ slug: r.slug, label: r.label, description: r.description, icon: r.icon, ord: r.ord }));
  }

  /** Reconstruye el objeto Law completo desde las tablas relacionales. */
  async loadNorm(id: string): Promise<Law | null> {
    const n = await this.prisma.norms.findUnique({
      where: { id },
      include: {
        norm_metadata: true,
        norm_sections: { include: { norm_titles: { orderBy: { ord: 'asc' } } }, orderBy: { ord: 'asc' } },
        articles: {
          include: { segments: { orderBy: { ord: 'asc' } }, article_amendments: true },
          orderBy: { ord: 'asc' },
        },
        norm_amendments: true,
        annexes: { orderBy: { ord: 'asc' } },
        norm_relations: true,
      },
    });
    if (!n) return null;

    const articles: Article[] = n.articles.map((a) => {
      const segments: LawSegment[] = a.segments.map((s) => ({
        id: s.id, lawId: s.norm_id, articleId: s.article_id, articleNumber: s.article_number ?? '',
        segmentType: s.segment_type as SegmentType, text: s.body,
        plainExplanation: s.plain_explanation, practicalExample: s.practical_example,
        references: s.refs, order: s.ord,
      }));
      const amendments: ArticleAmendment[] = a.article_amendments.map((am) => ({
        id: am.id, articleId: am.article_id, modifyingLaw: am.modifying_law ?? '',
        modifyingDate: dDate(am.modifying_date), previousText: am.previous_text ?? '',
        newText: am.new_text ?? '', description: am.description, createdAt: dTs(am.created_at),
      }));
      return {
        id: a.id, lawId: a.norm_id, number: a.number, title: a.title, text: a.body,
        plainLanguageExplanation: a.plain_language_explanation,
        practicalEffects: a.practical_effects, examples: a.examples,
        relatedArticles: a.related_articles, jurisprudence: a.jurisprudence,
        jurisprudenceRefs: (a.jurisprudence_refs as unknown as JurisprudenceRef[]) ?? undefined,
        regulations: a.regulations, keywords: a.keywords, order: a.ord,
        segments, amendments,
        visualContent: (a.visual_content as unknown as VisualItem[]) ?? undefined,
        status: (a.status as ArticleStatus | null) ?? undefined,
        effectiveDate: dDate(a.effective_date), derogatedDate: dDate(a.derogated_date),
      };
    });

    const sections: LawSection[] = n.norm_sections.map((s) => ({
      id: s.id, lawId: s.norm_id, number: s.number ?? '', name: s.name,
      articleStart: s.article_start ?? 0, articleEnd: s.article_end ?? 0,
      titles: s.norm_titles.map((t): LawTitle => ({
        id: t.id, sectionId: t.section_id, lawId: t.norm_id, number: t.number ?? '',
        name: t.name, articleStart: t.article_start ?? 0, articleEnd: t.article_end ?? 0,
      })),
    }));

    const amendments: LawAmendment[] = n.norm_amendments.map((am) => ({
      id: am.id, lawId: am.norm_id, modifyingLaw: am.modifying_law ?? '',
      modifyingDate: dDate(am.modifying_date), description: am.description,
      type: (am.type as AmendmentType | null) ?? undefined, createdAt: dTs(am.created_at),
    }));

    const annexes: Annex[] = n.annexes.map((an) => ({
      id: an.id, lawId: an.norm_id, number: an.number ?? '', title: an.title,
      content: an.content, order: an.ord,
    }));

    const relations: LawRelation[] = n.norm_relations.map((r) => ({
      type: r.type as RelationType, targetLawId: r.target_id,
      targetLawLabel: r.target_label ?? r.target_id, description: r.description,
    }));

    const metadata: LawMetadata | null = n.norm_metadata
      ? {
          id: `${n.id}-meta`, lawId: n.id, mainTopic: n.norm_metadata.main_topic,
          subtopics: n.norm_metadata.subtopics, relatedLaws: n.norm_metadata.related_laws,
          regulations: n.norm_metadata.regulations, modifyingNorms: n.norm_metadata.modifying_norms,
          derogatingNorms: n.norm_metadata.derogating_norms, jurisprudence: n.norm_metadata.jurisprudence,
          doctrine: n.norm_metadata.doctrine, obligations: n.norm_metadata.obligations,
          rights: n.norm_metadata.rights, sanctions: n.norm_metadata.sanctions,
          useCases: n.norm_metadata.use_cases,
          faq: (n.norm_metadata.faq as unknown as { question: string; answer: string }[]) ?? null,
          createdAt: dTs(n.created_at), updatedAt: dTs(n.updated_at),
        }
      : null;

    return {
      id: n.id, number: n.number ?? '', title: n.title, summary: n.summary,
      category: n.category ?? undefined, categories: n.categories ?? [], year: n.year ?? 0,
      sanctionDate: dDate(n.sanction_date), promulgationDate: dDate(n.promulgation_date),
      publicationDate: dDate(n.publication_date), effectiveDate: dDate(n.effective_date),
      derogatedDate: dDate(n.derogated_date), boNumber: n.bo_number,
      status: n.status as LawStatus, jurisdiction: n.jurisdiction as Jurisdiction,
      normType: n.norm_type as NormType, issuingBody: n.issuing_body, fullText: n.full_text,
      sourceUrl: n.source_url, articleCount: n.article_count, topics: n.topics, keywords: n.keywords,
      relatedNorms: n.related_norms, relations, executiveSummary: n.executive_summary,
      objective: n.objective, problemItSolves: n.problem_it_solves, practicalImpact: n.practical_impact,
      affectedSubjects: n.affected_subjects, commonName: n.common_name ?? undefined,
      shortCode: n.short_code ?? null, aliases: n.aliases ?? [], isDestacada: n.is_destacada ?? false,
      sections, articles, segments: [], annexes, amendments, metadata,
      createdAt: dTs(n.created_at), updatedAt: dTs(n.updated_at),
    };
  }
}
