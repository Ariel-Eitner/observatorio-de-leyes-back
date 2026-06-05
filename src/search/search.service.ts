import { Injectable } from '@nestjs/common';
import { SearchDbService } from './search-db.service';

export interface ParsedQuery {
  q: string;
  type?: 'law' | 'article';
  yearFrom?: number;
  yearTo?: number;
  normType?: string;
}

function parseNaturalQuery(raw: string): ParsedQuery {
  let q = raw.trim();
  const result: ParsedQuery = { q };

  // "entre YYYY y YYYY" / "desde YYYY hasta YYYY" / "YYYY-YYYY"
  const yearRange = q.match(/entre\s+(\d{4})\s+y\s+(\d{4})/i)
    ?? q.match(/desde\s+(\d{4})\s+hasta\s+(\d{4})/i)
    ?? q.match(/(\d{4})\s*[-–]\s*(\d{4})/);
  if (yearRange) {
    result.yearFrom = parseInt(yearRange[1]);
    result.yearTo = parseInt(yearRange[2]);
    q = q.replace(yearRange[0], '').trim();
  }

  // "artículos que mencionan X" / "artículo que"
  if (/art[ií]culos?\s+(que|sobre|con)/i.test(q)) {
    result.type = 'article';
    q = q.replace(/art[ií]culos?\s+(que|sobre|con)/i, '').trim();
  }

  // "leyes sobre X" / "normas sobre X" / "leyes que"
  if (/leyes?\s+(sobre|que|con)/i.test(q) || /normas?\s+(que|sobre)/i.test(q)) {
    result.type = 'law';
    q = q.replace(/(leyes?|normas?)\s+(sobre|que|con)/i, '').trim();
  }

  // "normas que modifican la ley X" → keep the law number in q
  q = q.replace(/normas?\s+que\s+modifican(\s+la\s+ley)?/i, '').trim();

  // normType hints
  if (/decreto/i.test(q)) result.normType = 'DECRETO';
  else if (/resoluci[oó]n/i.test(q)) result.normType = 'RESOLUCION';
  else if (/disposici[oó]n/i.test(q)) result.normType = 'DISPOSICION';

  // Remove filler words that hurt search quality
  q = q
    .replace(/\b(sobre|acerca de|relativo a|que mencionan|que hablan de|en materia de)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  result.q = q;
  return result;
}

@Injectable()
export class SearchService {
  constructor(private readonly db: SearchDbService) {}

  async search(
    rawQuery: string,
    opts: {
      type?: 'law' | 'article';
      lawId?: string;
      normType?: string;
      status?: string;
      jurisdiction?: string;
      yearFrom?: number;
      yearTo?: number;
      limit?: number;
    } = {},
  ) {
    if (!rawQuery?.trim()) return { results: [], query: '', facets: await this.db.facets() };

    const parsed = parseNaturalQuery(rawQuery);

    const merged = {
      type: opts.type ?? parsed.type,
      lawId: opts.lawId,
      normType: opts.normType ?? parsed.normType,
      status: opts.status,
      jurisdiction: opts.jurisdiction,
      yearFrom: opts.yearFrom ?? parsed.yearFrom,
      yearTo: opts.yearTo ?? parsed.yearTo,
      limit: opts.limit ?? 30,
    };

    const [results, facets] = await Promise.all([
      this.db.search(parsed.q || rawQuery, merged),
      this.db.facets(parsed.q || rawQuery),
    ]);

    return { results, query: rawQuery, parsedQuery: parsed, facets };
  }

  suggest(query: string) {
    return this.db.suggest(query);
  }

  facets(query?: string) {
    return this.db.facets(query);
  }
}
