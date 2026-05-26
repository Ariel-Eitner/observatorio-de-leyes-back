export const LawStatus = { VIGENTE: 'VIGENTE', DEROGADA: 'DEROGADA', PARCIALMENTE_VIGENTE: 'PARCIALMENTE_VIGENTE' } as const;
export type LawStatus = (typeof LawStatus)[keyof typeof LawStatus];

export const Jurisdiction = { NACIONAL: 'NACIONAL', PROVINCIAL: 'PROVINCIAL', MUNICIPAL: 'MUNICIPAL', INTERNACIONAL: 'INTERNACIONAL' } as const;
export type Jurisdiction = (typeof Jurisdiction)[keyof typeof Jurisdiction];

export const NormType = { CONSTITUCION: 'CONSTITUCION', LEY: 'LEY', DECRETO: 'DECRETO', RESOLUCION: 'RESOLUCION', DISPOSICION: 'DISPOSICION', ORDENANZA: 'ORDENANZA', DECRETO_LEY: 'DECRETO_LEY', CIRCULAR: 'CIRCULAR', TRATADO: 'TRATADO' } as const;
export type NormType = (typeof NormType)[keyof typeof NormType];

export const SegmentType = { PARAGRAPH: 'PARAGRAPH', INCISO: 'INCISO', ANNEX: 'ANNEX', TITLE: 'TITLE', CHAPTER: 'CHAPTER' } as const;
export type SegmentType = (typeof SegmentType)[keyof typeof SegmentType];

export type AmendmentType = 'MODIFICATION' | 'REGULATION' | 'PARTIAL_REPEAL' | 'VETO';

export const ArticleStatus = { VIGENTE: 'VIGENTE', DEROGADO: 'DEROGADO', MODIFICADO: 'MODIFICADO' } as const;
export type ArticleStatus = (typeof ArticleStatus)[keyof typeof ArticleStatus];

export const RelationType = {
  MODIFICA:            'MODIFICA',            // A modifica parcialmente B
  DEROGA:              'DEROGA',              // A deroga totalmente B
  DEROGA_PARCIALMENTE: 'DEROGA_PARCIALMENTE', // A deroga algunos artículos de B
  REGLAMENTA:          'REGLAMENTA',          // A reglamenta B (decreto → ley)
  IMPLEMENTA:          'IMPLEMENTA',          // A implementa o baja B (ley → tratado; reglamento → ley)
  RATIFICA:            'RATIFICA',            // A ratifica B (Congreso → tratado internacional)
  COMPLEMENTA:         'COMPLEMENTA',         // A complementa B sin modificarla; conviven
  SUPLETORIA:          'SUPLETORIA',          // A se aplica supletoriamente cuando B no regula
  ESPECIALIZA:         'ESPECIALIZA',         // A es estatuto especial que prevalece sobre B para un sector
  RELACIONADA:         'RELACIONADA',         // relación genérica para el grafo
} as const;
export type RelationType = (typeof RelationType)[keyof typeof RelationType];

export interface LawRelation {
  type: RelationType;
  targetLawId: string;
  targetLawLabel: string;
  description: string | null;
}

export interface LawAmendment {
  id: string;
  lawId: string;
  modifyingLaw: string;
  modifyingDate: string | null;
  description: string;
  type?: AmendmentType;
  createdAt: string;
}

export interface ArticleAmendment {
  id: string;
  articleId: string;
  modifyingLaw: string;
  modifyingDate: string | null;
  previousText: string;
  newText: string;
  description: string | null;
  createdAt: string;
}

export interface LawSegment {
  id: string;
  lawId: string;
  articleId: string | null;
  articleNumber: string;
  segmentType: SegmentType;
  text: string;
  plainExplanation: string | null;
  practicalExample: string | null;
  references: string[];
  order: number;
}

export interface LawTitle {
  id: string;
  sectionId: string;
  lawId: string;
  number: string;
  name: string;
  articleStart: number;
  articleEnd: number;
}

export interface LawSection {
  id: string;
  lawId: string;
  number: string;
  name: string;
  articleStart: number;
  articleEnd: number;
  titles: LawTitle[];
}

export type VisualItemType = 'sello-advertencia' | 'tabla' | 'imagen' | 'diagrama';

export interface VisualItem {
  id: string;
  type: VisualItemType;
  title: string;
  description?: string;
  sourceUrl?: string;   // URL directa a la imagen oficial (png/jpg) o página fuente
  sourcePage?: string;  // URL de la página donde el usuario puede ver/descargar el recurso
  data: Record<string, unknown>;
}

export interface Article {
  id: string;
  lawId: string;
  number: string;
  title: string | null;
  text: string;
  plainLanguageExplanation: string | null;
  practicalEffects: string[];
  examples: string[];
  relatedArticles: string[];
  jurisprudence: string[];
  regulations: string[];
  keywords: string[];
  order: number;
  segments: LawSegment[];
  amendments: ArticleAmendment[];
  visualContent?: VisualItem[];
  // Estado individual del artículo (relevante para leyes PARCIALMENTE_VIGENTE)
  status?: ArticleStatus;
  effectiveDate?: string | null;
  derogatedDate?: string | null;
}

export interface Annex {
  id: string;
  lawId: string;
  number: string;
  title: string | null;
  content: string;
  order: number;
}

export interface LawMetadata {
  id: string;
  lawId: string;
  mainTopic: string | null;
  subtopics: string[];
  relatedLaws: string[];
  regulations: string[];
  modifyingNorms: string[];
  derogatingNorms: string[];
  jurisprudence: string[];
  doctrine: string[];
  obligations: string[];
  rights: string[];
  sanctions: string[];
  useCases: string[];
  faq: { question: string; answer: string }[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface Law {
  id: string;
  number: string;
  title: string;
  summary: string | null;
  category?: string;
  year: number;
  sanctionDate: string | null;
  promulgationDate: string | null;
  publicationDate: string | null;
  effectiveDate: string | null;    // entrada en vigor (puede diferir de publicación)
  derogatedDate: string | null;    // fecha en que quedó derogada (null si no aplica)
  boNumber: string | null;
  status: LawStatus;
  jurisdiction: Jurisdiction;
  normType: NormType;
  issuingBody: string | null;
  fullText: string | null;
  sourceUrl: string | null;
  articleCount: number;
  topics: string[];
  keywords: string[];
  relatedNorms: string[];
  relations: LawRelation[];        // relaciones tipadas con otras normas
  executiveSummary: string | null;
  objective: string | null;
  problemItSolves: string | null;
  practicalImpact: string | null;
  affectedSubjects: string[];
  commonName?: string;
  sections?: LawSection[];
  articles: Article[];
  segments: LawSegment[];
  annexes: Annex[];
  amendments: LawAmendment[];
  metadata: LawMetadata | null;
  createdAt: string;
  updatedAt: string;
}

export interface LawSummary {
  id: string;
  number: string;
  title: string;
  commonName?: string;
  summary: string | null;
  category?: string;
  year: number;
  sanctionDate: string | null;
  status: LawStatus;
  jurisdiction: Jurisdiction;
  normType: NormType;
  topics: string[];
  keywords: string[];
  articleCount: number;
  _count: { articles: number; amendments: number };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}
