import type { RefChunk } from '../utils/inline-refs.util';

// VETADA: el Congreso la sancionó pero el Ejecutivo la vetó totalmente y la insistencia no
// prosperó → NUNCA fue ley. Se conserva el texto sancionado por su valor informativo (la gente
// la busca por lo que leyó en las noticias), SIEMPRE con la advertencia de que no rige.
export const LawStatus = { VIGENTE: 'VIGENTE', DEROGADA: 'DEROGADA', PARCIALMENTE_VIGENTE: 'PARCIALMENTE_VIGENTE', VETADA: 'VETADA' } as const;
export type LawStatus = (typeof LawStatus)[keyof typeof LawStatus];

export const Jurisdiction = { NACIONAL: 'NACIONAL', PROVINCIAL: 'PROVINCIAL', MUNICIPAL: 'MUNICIPAL', INTERNACIONAL: 'INTERNACIONAL' } as const;
export type Jurisdiction = (typeof Jurisdiction)[keyof typeof Jurisdiction];

// Si la norma SE MUESTRA. Ortogonal a LawStatus, que dice si RIGE: una norma
// puede estar VIGENTE y no publicarse todavía, o estar DEROGADA y ser pública.
//
// ENLACE es "no listada": se sirve por URL directa pero queda afuera del
// sitemap, del listado, del buscador, del grafo y de las estadísticas. Sirve
// para demos y para revisar una tanda grande antes de darla a conocer.
export const Visibility = { PUBLICA: 'PUBLICA', ENLACE: 'ENLACE' } as const;
export type Visibility = (typeof Visibility)[keyof typeof Visibility];

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
  VETA:                'VETA',                // A (decreto de veto) observa totalmente a B, que por eso nunca fue ley
  RELACIONADA:         'RELACIONADA',         // relación genérica para el grafo
} as const;
export type RelationType = (typeof RelationType)[keyof typeof RelationType];

export interface LawRelation {
  type: RelationType;
  targetLawId: string;
  targetLawLabel: string;
  description: string | null;
  /**
   * Ruta pública de la norma destino, o null si no está cargada (la tarjeta se
   * muestra sin enlace). La resuelve el backend al hidratar el índice.
   *
   * Existe para que "Normas relacionadas" no necesite el registry en el cliente:
   * ese componente resolvía el path con las 3.400 entradas del registry, que por
   * eso viajaban serializadas dentro del HTML de cada página. Ver `enriquecerRelaciones`.
   */
  targetPath?: string | null;
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
  // Referencias inline pre-parseadas por el back (el front las usa en vez de su
  // mega-regex; si faltan, cae a parsear en el cliente). Ver inline-refs.util.
  textChunks?: RefChunk[];
  explanationChunks?: RefChunk[];
  exampleChunks?: RefChunk[];
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

export interface JurisprudenceRef {
  id: string;
  slug: string;           // slug de la página interna: "cullen-llerena"
  tribunal: string;
  caratula?: string;
  year?: number;
  citation?: string;
  holding: string;        // resumen corto para el modal
  url?: string;           // link a SAIJ (fuente oficial)
}

export type FalloStatus = 'VIGENTE' | 'SUPERADO' | 'MODIFICADO';

export type FalloSectionType =
  | 'hechos'
  | 'cuestion'
  | 'ratio'
  | 'fundamentos'
  | 'obiter'
  | 'disidencia';

export interface FalloSection {
  id: string;
  type: FalloSectionType;
  title: string;
  content: string;
  plainLanguage?: string;
}

export interface Fallo {
  id: string;
  slug: string;
  tribunal: string;
  caratula: string;
  date: string;
  citation: string;
  summary: string;
  status: FalloStatus;
  superadoBy?: string;
  sections: FalloSection[];
  articlesInterpreted: string[];
  relatedNorms: string[];
  relatedFallos: string[];
  keywords: string[];
  topics: string[];
  sourceUrl?: string;
  createdAt: string;
  updatedAt: string;
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
  jurisprudenceRefs?: JurisprudenceRef[];   // índice paralelo a jurisprudence[]
  regulations: string[];
  keywords: string[];
  order: number;
  segments: LawSegment[];
  amendments: ArticleAmendment[];
  visualContent?: VisualItem[];
  // Referencias inline pre-parseadas (para la página de artículo individual).
  textChunks?: RefChunk[];
  explanationChunks?: RefChunk[];
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
  category?: string;          // categoría temática principal (de la BD)
  categories?: string[];      // todas las categorías temáticas (principal + secundarias)
  year: number;
  sanctionDate: string | null;
  promulgationDate: string | null;
  publicationDate: string | null;
  effectiveDate: string | null;    // entrada en vigor (puede diferir de publicación)
  derogatedDate: string | null;    // fecha en que quedó derogada (null si no aplica)
  boNumber: string | null;
  status: LawStatus;
  jurisdiction: Jurisdiction;
  /** Qué jurisdicción subnacional: 'catamarca-capital', 'caba', 'salta'… */
  scopeSlug?: string | null;
  /** Ausente = PUBLICA. Opcional para no tocar las normas que viven en código. */
  visibility?: Visibility;
  normType: NormType;
  issuingBody: string | null;
  fullText: string | null;
  sourceUrl: string | null;
  // Ficha en InfoLeg, si la norma está mapeada. Sale de INFOLEG_MAP y lo adjunta
  // LawsService al servir la norma. Vive acá y no en el registry porque lo usa
  // una sola página —la ficha— que ya baja la norma: en el registry costaría
  // ~70 bytes × 3.100 normas en CADA render del sitio.
  infolegUrl?: string | null;
  /** Anexo del Digesto Jurídico, si corresponde. Misma fuente y mismo motivo. */
  digestoAnexo?: 'I' | 'II' | 'post_digesto' | null;
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
  shortCode?: string | null;   // sigla (CN, CP, LCT…) — columna en BD
  aliases?: string[];          // sinónimos de búsqueda — columna en BD
  isDestacada?: boolean;       // norma resaltada — columna en BD
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
  categoryLabel?: string | null;
  categories?: string[];
  year: number;
  sanctionDate: string | null;
  status: LawStatus;
  jurisdiction: Jurisdiction;
  normType: NormType;
  topics: string[];
  keywords: string[];
  articleCount: number;
  frontendPath?: string;   // ruta del front (la calcula el back; el front ya no la deriva)
  // Badge del listado. Viaja acá —20 filas por página— y no se busca en el
  // registry: era la única razón por la que /buscar bajaba el registry COMPLETO
  // (1,7 MB) al navegador en cada visita.
  digestoAnexo?: 'I' | 'II' | 'post_digesto' | null;
  _count: { articles: number; amendments: number };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}
