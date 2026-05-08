export const LawStatus = { VIGENTE: 'VIGENTE', DEROGADA: 'DEROGADA', PARCIALMENTE_VIGENTE: 'PARCIALMENTE_VIGENTE' } as const;
export type LawStatus = (typeof LawStatus)[keyof typeof LawStatus];

export const Jurisdiction = { NACIONAL: 'NACIONAL', PROVINCIAL: 'PROVINCIAL', MUNICIPAL: 'MUNICIPAL', INTERNACIONAL: 'INTERNACIONAL' } as const;
export type Jurisdiction = (typeof Jurisdiction)[keyof typeof Jurisdiction];

export const NormType = { CONSTITUCION: 'CONSTITUCION', LEY: 'LEY', DECRETO: 'DECRETO', RESOLUCION: 'RESOLUCION', DISPOSICION: 'DISPOSICION', ORDENANZA: 'ORDENANZA', DECRETO_LEY: 'DECRETO_LEY', CIRCULAR: 'CIRCULAR', TRATADO: 'TRATADO' } as const;
export type NormType = (typeof NormType)[keyof typeof NormType];

export const SegmentType = { PARAGRAPH: 'PARAGRAPH', INCISO: 'INCISO', ANNEX: 'ANNEX', TITLE: 'TITLE', CHAPTER: 'CHAPTER' } as const;
export type SegmentType = (typeof SegmentType)[keyof typeof SegmentType];

export type AmendmentType = 'MODIFICATION' | 'REGULATION' | 'PARTIAL_REPEAL' | 'VETO';

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
  originalText: string;
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

export interface Article {
  id: string;
  lawId: string;
  number: string;
  title: string | null;
  originalText: string;
  currentText: string;
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
