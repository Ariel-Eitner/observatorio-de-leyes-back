import { Injectable } from '@nestjs/common';
import MiniSearch from 'minisearch';
import { ALL_LAWS, NORMAS_CLAVE } from '../data';
import { CONSTITUCIONES_PROVINCIALES } from '../data/constituciones-provinciales/index';
import type { Law } from '../common/types/law.types';
import { computeFrontendPath, computeArticleUrl } from '../common/utils/law-url.util';

const COMMON_NAMES: Record<string, string> = {
  'constitucion-nacional': 'Constitución Nacional',
  'codigo-penal': 'Código Penal',
  'ley-20744': 'Ley de Contrato de Trabajo (LCT)',
  'codigo-aduanero': 'Código Aduanero',
  'ley-27150': 'Código Procesal Penal Federal',
  'codigo-civil-comercial': 'Código Civil y Comercial de la Nación (CCyCN)',
};

export interface SearchDoc {
  id: string;
  type: 'law' | 'article';
  lawId: string;
  lawNumber: string;
  lawTitle: string;
  normType: string;
  jurisdiction: string;
  status: string;
  year: number;
  // article-specific
  articleId?: string;
  articleNumber?: string;
  articleTitle?: string;
  // search fields
  number: string;
  title: string;
  text: string;
  explanation: string;
  keywords: string;
  topics: string;
  summary: string;
  // navigation
  url: string;
}

const FIELD_WEIGHTS = {
  number:      10,
  title:        8,
  keywords:     6,
  topics:       5,
  summary:      4,
  explanation:  3,
  text:         2,
};

// Lowercase + strip diacritics + only alphanumeric+spaces — shared by index and query
function normalizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s]/g, '');
}

// Build a character-class pattern so a normalized term (no accents) matches accented originals
// e.g. "ilicito" → matches "ilícito", "ILÍCITO", "ilicito"
function buildMarkPattern(normalizedTerm: string): string {
  return [...normalizedTerm]
    .map((ch) => {
      switch (ch) {
        case 'a': return '[aáàäâãÁÀÄÂÃ]';
        case 'e': return '[eéèëêÉÈËÊ]';
        case 'i': return '[iíìïîÍÌÏÎ]';
        case 'o': return '[oóòöôõÓÒÖÔÕ]';
        case 'u': return '[uúùüûÚÙÜÛ]';
        case 'n': return '[nñNÑ]';
        default:  return ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
    })
    .join('');
}


function buildDocs(law: Law): SearchDoc[] {
  const docs: SearchDoc[] = [];
  const displayTitle = COMMON_NAMES[law.id] ?? law.title;

  // Law-level document
  docs.push({
    id: `law:${law.id}`,
    type: 'law',
    lawId: law.id,
    lawNumber: law.number,
    lawTitle: displayTitle,
    normType: law.normType,
    jurisdiction: law.jurisdiction,
    status: law.status,
    year: law.year,
    number: law.number,
    title: displayTitle,
    text: [law.summary, law.executiveSummary, law.objective, law.problemItSolves].filter(Boolean).join(' '),
    explanation: law.practicalImpact ?? '',
    keywords: law.keywords.join(' '),
    topics: law.topics.join(' '),
    summary: law.summary ?? '',
    url: computeFrontendPath(law),
  });

  // Article-level documents
  for (const article of law.articles) {
    const segmentTexts = article.segments.map((s) => s.originalText).join(' ');
    const segmentExplanations = article.segments.map((s) => s.plainExplanation ?? '').join(' ');

    docs.push({
      id: `article:${article.id}`,
      type: 'article',
      lawId: law.id,
      lawNumber: law.number,
      lawTitle: displayTitle,
      normType: law.normType,
      jurisdiction: law.jurisdiction,
      status: law.status,
      year: law.year,
      articleId: article.id,
      articleNumber: article.number,
      articleTitle: article.title ?? undefined,
      number: `${law.number} art ${article.number}`,
      title: article.title ?? `Art. ${article.number}`,
      text: [article.originalText, segmentTexts, article.jurisprudence.join(' ')].filter(Boolean).join(' '),
      explanation: [article.plainLanguageExplanation, segmentExplanations].filter(Boolean).join(' '),
      keywords: article.keywords.join(' '),
      topics: article.regulations.join(' '),
      summary: article.examples.join(' '),
      url: computeArticleUrl(law, article.number),
    });
  }

  return docs;
}

@Injectable()
export class SearchIndexService {
  private readonly index: MiniSearch<SearchDoc>;
  private readonly docs: Map<string, SearchDoc> = new Map();

  constructor() {
    this.index = new MiniSearch<SearchDoc>({
      fields: Object.keys(FIELD_WEIGHTS) as (keyof typeof FIELD_WEIGHTS)[],
      storeFields: [
        'id', 'type', 'lawId', 'lawNumber', 'lawTitle', 'normType',
        'jurisdiction', 'status', 'year',
        'articleId', 'articleNumber', 'articleTitle',
        'title', 'summary', 'url',
      ],
      // Normalize diacritics + lowercase at index AND query time so "ilicito"=="ilícito"
      processTerm: (term: string): string | null => {
        const n = normalizeForSearch(term).trim();
        return n.length > 0 ? n : null;
      },
      searchOptions: {
        boost: FIELD_WEIGHTS,
        fuzzy: 0.3,
        prefix: true,
      },
    });

    this.buildIndex();
  }

  private buildIndex() {
    const allSources: Law[] = [...ALL_LAWS, ...NORMAS_CLAVE, ...CONSTITUCIONES_PROVINCIALES];
    const allDocs: SearchDoc[] = allSources.flatMap(buildDocs);

    // Deduplicate by id (guard against duplicate article ids in data files)
    const seen = new Set<string>();
    const uniqueDocs: SearchDoc[] = [];
    for (const doc of allDocs) {
      if (!seen.has(doc.id)) {
        seen.add(doc.id);
        uniqueDocs.push(doc);
        this.docs.set(doc.id, doc);
      }
    }

    this.index.addAll(uniqueDocs);
  }

  search(
    query: string,
    opts: {
      type?: 'law' | 'article';
      normType?: string;
      status?: string;
      jurisdiction?: string;
      yearFrom?: number;
      yearTo?: number;
      limit?: number;
    } = {},
  ) {
    const { type, normType, status, jurisdiction, yearFrom, yearTo, limit = 20 } = opts;

    const filter = (result: { [key: string]: unknown }) => {
      if (type && result['type'] !== type) return false;
      if (normType && result['normType'] !== normType) return false;
      if (status && result['status'] !== status) return false;
      if (jurisdiction && result['jurisdiction'] !== jurisdiction) return false;
      if (yearFrom && (result['year'] as number) < yearFrom) return false;
      if (yearTo && (result['year'] as number) > yearTo) return false;
      return true;
    };

    const results = this.index.search(query, { filter });

    return results.slice(0, limit).map((r) => {
      const doc = this.docs.get(r.id)!;
      return {
        ...r,
        doc,
        highlightedTitle: this.highlightTitle(doc.title, query),
        snippet: this.buildSnippet(doc, query),
      };
    });
  }

  suggest(query: string, limit = 8) {
    if (query.length < 2) return [];

    const results = this.index.search(query, {
      prefix: true,
      fuzzy: 0.2,
      boost: { number: 15, title: 10, keywords: 5 },
      filter: (result: { [key: string]: unknown }) => result['type'] === 'law' || result['type'] === 'article',
    });

    return results.slice(0, limit).map((r) => {
      const doc = this.docs.get(r.id)!;
      return {
        id: r.id,
        type: doc.type,
        lawId: doc.lawId,
        lawNumber: doc.lawNumber,
        lawTitle: doc.lawTitle,
        articleId: doc.articleId,
        articleNumber: doc.articleNumber,
        articleTitle: doc.articleTitle,
        title: doc.title,
        highlightedTitle: this.highlightTitle(doc.title, query),
        normType: doc.normType,
        year: doc.year,
        url: doc.url,
        snippet: this.buildSnippet(doc, query, 80),
      };
    });
  }

  facets(query?: string) {
    const allDocs = query
      ? this.index.search(query, { prefix: true, fuzzy: 0.3 }).map((r) => this.docs.get(r.id)!)
      : Array.from(this.docs.values());

    const byType: Record<string, number> = {};
    const byNormType: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    const byJurisdiction: Record<string, number> = {};
    const byDecade: Record<string, number> = {};

    for (const doc of allDocs) {
      if (!doc) continue;
      byType[doc.type] = (byType[doc.type] ?? 0) + 1;
      byNormType[doc.normType] = (byNormType[doc.normType] ?? 0) + 1;
      byStatus[doc.status] = (byStatus[doc.status] ?? 0) + 1;
      byJurisdiction[doc.jurisdiction] = (byJurisdiction[doc.jurisdiction] ?? 0) + 1;
      const decade = `${Math.floor(doc.year / 10) * 10}s`;
      byDecade[decade] = (byDecade[decade] ?? 0) + 1;
    }

    return { byType, byNormType, byStatus, byJurisdiction, byDecade };
  }

  private buildSnippet(doc: SearchDoc, query: string, maxLen = 160): string {
    // Normalize terms the same way the index does, so accent-free queries find accented text
    const normalizedTerms = query
      .split(/\s+/)
      .map((t) => normalizeForSearch(t).trim())
      .filter((t) => t.length > 2);

    if (normalizedTerms.length === 0) return '';

    const haystack = [doc.text, doc.explanation, doc.summary]
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ');

    if (!haystack) return '';

    // Find earliest match position in the normalized haystack (accent-insensitive)
    const normalizedHaystack = normalizeForSearch(haystack);
    let bestPos = haystack.length;
    for (const term of normalizedTerms) {
      const pos = normalizedHaystack.indexOf(term);
      if (pos !== -1 && pos < bestPos) bestPos = pos;
    }

    const start = Math.max(0, bestPos - 40);
    const end = Math.min(haystack.length, start + maxLen);
    let snippet = (start > 0 ? '…' : '') + haystack.slice(start, end) + (end < haystack.length ? '…' : '');

    // Mark using accent-insensitive char-class regex so "ilicito" marks "ilícito" in the original text
    for (const term of normalizedTerms) {
      try {
        snippet = snippet.replace(
          new RegExp(`(${buildMarkPattern(term)})`, 'gi'),
          '<mark>$1</mark>',
        );
      } catch {
        // skip terms that produce invalid regex (e.g. special chars)
      }
    }

    return snippet;
  }

  private highlightTitle(title: string, query: string): string {
    const normalizedTerms = query
      .split(/\s+/)
      .map((t) => normalizeForSearch(t).trim())
      .filter((t) => t.length > 2);

    let result = title;
    for (const term of normalizedTerms) {
      try {
        result = result.replace(
          new RegExp(`(${buildMarkPattern(term)})`, 'gi'),
          '<mark>$1</mark>',
        );
      } catch {
        // skip
      }
    }
    return result;
  }
}
