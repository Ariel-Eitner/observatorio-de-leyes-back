import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { computeFrontendPath, computeArticleUrl } from '../common/utils/law-url.util';
import type { Law } from '../common/types/law.types';

// Formato PLANO que espera el front (FullSearchResultItem). Los campos van en el
// nivel del resultado, NO anidados en un `doc`.
export interface SearchResultItem {
  id: string;
  score: number;
  type: 'law' | 'article';
  lawId: string;
  lawNumber: string;
  lawTitle: string;
  normType: string;
  jurisdiction: string;
  status: string;
  year: number;
  category: string;          // categoría temática principal (de la BD)
  categories: string[];      // todas las categorías temáticas (de la BD)
  articleId?: string;
  articleNumber?: string;
  articleTitle?: string;
  title: string;
  highlightedTitle: string;
  summary: string;
  url: string;
  snippet: string;
}

export interface SearchSuggestion {
  id: string;
  type: 'law' | 'article';
  lawId: string;
  lawNumber: string;
  lawTitle: string;
  articleId?: string;
  articleNumber?: string;
  articleTitle?: string;
  title: string;
  highlightedTitle: string;
  normType: string;
  year: number;
  url: string;
  snippet: string;
}

interface SearchOpts {
  type?: 'law' | 'article';
  lawId?: string;
  normType?: string;
  status?: string;
  jurisdiction?: string;
  yearFrom?: number;
  yearTo?: number;
  limit?: number;
}

const RANK_WEIGHTS = '{0.1,0.2,0.4,1.0}';
const HEADLINE_OPTS = 'StartSel=<mark>,StopSel=</mark>,MaxFragments=1,MaxWords=30,MinWords=8,ShortWord=2';

function norm(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9\s]/g, '').trim();
}

// Extrae el número de una norma cuando la query ES (esencialmente) un número:
// "26.388", "26388", "ley 26.388", "decreto 1112/2024", "941/2025". Devuelve solo
// los dígitos para un match directo por número. null si la query trae texto además
// del número (ahí manda el tsvector). Resuelve el bug de que el tsvector parte los
// puntos/barras ("26.388" → "26" & "388") y no matchea el token entero ("26388").
function extractNumberDigits(q: string): string | null {
  const cleaned = q
    .toLowerCase()
    .replace(/\b(ley|leyes|decreto|decretos|dnu|resoluci[oó]n|disposici[oó]n|n[°º]|nro\.?|numero|n[uú]mero)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  // Si queda texto que no sea dígitos / separadores, no es una búsqueda por número.
  if (cleaned.replace(/[\d.\/\s-]/g, '').length > 0) return null;
  const digits = cleaned.replace(/\D/g, '');
  return digits.length >= 3 && digits.length <= 9 ? digits : null;
}

// Detecta una referencia directa a un artículo dentro de una norma nombrada:
// "Código Penal art. 79", "ley 11683 art 5", "art 14 bis constitución nacional".
// Devuelve { artNum, lawText } con el número del artículo (con sufijo bis/ter…) y
// el texto restante que nombra a la ley. null si no hay patrón "art N" o si no
// queda texto de ley (un "art 79" suelto es ambiguo: no se puede resolver).
export function extractArticleRef(q: string): { artNum: string; lawText: string } | null {
  const m = q.match(
    /\bart(?:[íi]culos?|\.|\b)?\s*(\d+\s*(?:bis|ter|qu[áa]ter|quater|quinquies|sexies|septies)?)/i,
  );
  if (!m) return null;
  const artNum = m[1].replace(/\s+/g, ' ').trim();
  const lawText = q.replace(m[0], ' ').replace(/\s+/g, ' ').trim();
  if (!lawText || !/[a-z0-9]/i.test(lawText)) return null;
  return { artNum, lawText };
}

function highlightTitle(title: string, query: string): string {
  const terms = norm(query).split(/\s+/).filter((t) => t.length > 2);
  let out = title;
  for (const t of terms) {
    try {
      const cls = t.split('').map((c) => {
        switch (c) {
          case 'a': return '[aáàäâ]';
          case 'e': return '[eéèëê]';
          case 'i': return '[iíìïî]';
          case 'o': return '[oóòöô]';
          case 'u': return '[uúùüû]';
          case 'n': return '[nñ]';
          default: return c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
      }).join('');
      out = out.replace(new RegExp(`(${cls})`, 'gi'), '<mark>$1</mark>');
    } catch { /* término inválido */ }
  }
  return out;
}

function lawStub(id: string, number: string, title: string): Law {
  return { id, number, title } as Law;
}

@Injectable()
export class SearchDbService {
  constructor(private readonly prisma: PrismaService) {}

  private filterClauses(opts: SearchOpts, params: unknown[]): string {
    const c: string[] = [];
    const add = (sql: string, val: unknown) => { params.push(val); c.push(sql.replace('$$', `$${params.length}`)); };
    if (opts.normType)     add('n.norm_type = $$', opts.normType);
    if (opts.status)       add('n.status = $$', opts.status);
    if (opts.jurisdiction) add('n.jurisdiction = $$', opts.jurisdiction);
    if (opts.lawId)        add('n.id = $$', opts.lawId);
    if (opts.yearFrom)     add('n.year >= $$', opts.yearFrom);
    if (opts.yearTo)       add('n.year <= $$', opts.yearTo);
    return c.length ? ' AND ' + c.join(' AND ') : '';
  }

  async search(query: string, opts: SearchOpts = {}): Promise<SearchResultItem[]> {
    const q = query?.trim();
    if (!q) return [];
    const limit = Math.min(opts.limit ?? 30, 100);
    const out: SearchResultItem[] = [];

    if (opts.type !== 'law') {
      const params: unknown[] = [q];
      const where = this.filterClauses(opts, params);
      params.push(limit);
      const sql = `
        SELECT a.id AS aid, a.norm_id, a.number AS art_number, a.title AS art_title,
               n.number AS law_number, coalesce(n.common_name, n.title) AS law_title, n.title AS law_raw_title,
               n.norm_type, n.jurisdiction, n.status, n.year, n.category AS law_category, n.categories AS law_categories,
               ts_rank('${RANK_WEIGHTS}', a.search, qq) AS rank,
               ts_headline('spanish'::regconfig, a.body, qq, '${HEADLINE_OPTS}') AS snippet
        FROM articles a
        JOIN norms n ON n.id = a.norm_id,
             websearch_to_tsquery('spanish'::regconfig, immutable_unaccent($1)) qq
        WHERE a.search @@ qq${where}
        ORDER BY rank DESC
        LIMIT $${params.length}`;
      const rows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(sql, ...params);
      for (const r of rows) out.push(this.articleItem(r, q));
    }

    if (opts.type !== 'article') {
      const params: unknown[] = [q];
      const where = this.filterClauses(opts, params);
      params.push(limit);
      const sql = `
        SELECT n.id, n.number, coalesce(n.common_name, n.title) AS title, n.title AS raw_title,
               n.norm_type, n.jurisdiction, n.status, n.year, n.category, n.categories, coalesce(n.summary,'') AS summary,
               ts_rank('${RANK_WEIGHTS}', n.search, qq) AS rank,
               ts_headline('spanish'::regconfig, coalesce(n.summary,''), qq, '${HEADLINE_OPTS}') AS snippet
        FROM norms n, to_tsquery('spanish'::regconfig, regexp_replace(trim(regexp_replace(immutable_unaccent($1), '[^a-z0-9 ]', ' ', 'gi')), '\\s+', ':* & ', 'g') || ':*') qq
        WHERE n.search @@ qq${where}
        ORDER BY rank DESC
        LIMIT $${params.length}`;
      const rows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(sql, ...params);
      for (const r of rows) out.push(this.lawItem(r, q));
    }

    // Match directo por número de norma ("26.388", "1112/2024", "ley 27742"): el
    // tsvector parte puntos/barras y no matchea el número entero. Va con score alto.
    const numDigits = extractNumberDigits(q);
    if (numDigits && opts.type !== 'article') {
      const params: unknown[] = [numDigits];
      const where = this.filterClauses(opts, params);
      const sql = `
        SELECT n.id, n.number, coalesce(n.common_name, n.title) AS title, n.title AS raw_title,
               n.norm_type, n.jurisdiction, n.status, n.year, n.category, n.categories,
               coalesce(n.summary,'') AS summary, coalesce(n.summary,'') AS snippet
        FROM norms n
        WHERE regexp_replace(n.number, '\\D', '', 'g') = $1${where}
        LIMIT 5`;
      const rows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(sql, ...params);
      for (const r of rows) { const it = this.lawItem(r, q); it.score = 1000; out.unshift(it); }
    }

    // Referencia directa a un artículo de una norma nombrada ("Código Penal art. 79",
    // "ley 11683 art 5"). El tsvector falla porque exige que TODOS los términos (el
    // nombre de la ley + el nro de artículo) convivan en un mismo registro, y no lo
    // hacen. Se resuelve buscando el artículo por número dentro de la(s) norma(s) que
    // matchean el texto restante. Score muy alto: es lo que el usuario pidió exacto.
    const artRef = extractArticleRef(q);
    if (artRef && opts.type !== 'law') {
      const artNumKey = norm(artRef.artNum).replace(/\s+/g, '');
      const lawDigits = artRef.lawText.replace(/\D/g, '');
      const params: unknown[] = [artNumKey, artRef.lawText, lawDigits || '\x00'];
      const sql = `
        SELECT a.id AS aid, a.norm_id, a.number AS art_number, a.title AS art_title,
               n.number AS law_number, coalesce(n.common_name, n.title) AS law_title, n.title AS law_raw_title,
               n.norm_type, n.jurisdiction, n.status, n.year, n.category AS law_category, n.categories AS law_categories,
               coalesce(ts_rank('${RANK_WEIGHTS}', n.search, websearch_to_tsquery('spanish'::regconfig, immutable_unaccent($2))), 0) AS rank,
               (position(immutable_unaccent(lower($2)) in immutable_unaccent(lower(
                  coalesce(n.common_name,'') || ' ' || coalesce(n.title,'') || ' ' ||
                  coalesce(n.short_code,'') || ' ' || coalesce(array_to_string(n.aliases,' '),'')
               ))) > 0)::int AS phrase,
               left(coalesce(nullif(a.plain_language_explanation, ''), a.body, ''), 240) AS snippet
        FROM articles a
        JOIN norms n ON n.id = a.norm_id
        WHERE regexp_replace(lower(immutable_unaccent(a.number)), '\\s', '', 'g') = $1
          AND ( n.search @@ websearch_to_tsquery('spanish'::regconfig, immutable_unaccent($2))
                OR regexp_replace(n.number, '\\D', '', 'g') = $3 )
        ORDER BY phrase DESC, rank DESC
        LIMIT 5`;
      const rows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(sql, ...params);
      for (const r of rows) { const it = this.articleItem(r, q); it.score = 2000; out.unshift(it); }
    }

    // Dedup por id (el match por número puede coincidir con el del tsvector).
    const seen = new Set<string>();
    const deduped = out.filter((it) => (seen.has(it.id) ? false : (seen.add(it.id), true)));
    return deduped.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  async suggest(query: string, limit = 8): Promise<SearchSuggestion[]> {
    const q = query?.trim();
    if (!q || q.length < 2) return [];
    const params = [q, limit];
    const sql = `
      WITH tq AS (SELECT to_tsquery('spanish'::regconfig, regexp_replace(immutable_unaccent($1), '\\s+', ':* & ', 'g') || ':*') AS qq)
      SELECT 'article' AS rtype, a.id AS aid, a.norm_id, a.number AS art_number, a.title AS art_title,
             n.number AS law_number, coalesce(n.common_name, n.title) AS law_title, n.title AS law_raw_title, n.norm_type, n.year,
             ts_rank('${RANK_WEIGHTS}', a.search, tq.qq) AS rank
      FROM articles a JOIN norms n ON n.id = a.norm_id, tq
      WHERE a.search @@ tq.qq
      UNION ALL
      SELECT 'law' AS rtype, n.id AS aid, n.id AS norm_id, NULL AS art_number, NULL AS art_title,
             n.number AS law_number, coalesce(n.common_name, n.title) AS law_title, n.title AS law_raw_title, n.norm_type, n.year,
             ts_rank('${RANK_WEIGHTS}', n.search, tq.qq) * 1.5 AS rank
      FROM norms n, tq WHERE n.search @@ tq.qq
      ORDER BY rank DESC LIMIT $2`;
    let rows: Record<string, unknown>[] = [];
    try {
      rows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(sql, ...params);
    } catch {
      return [];
    }

    // Match directo por número al frente ("26.388", "1112/2024"): mismo bug que en search().
    const numDigits = extractNumberDigits(q);
    const head: SearchSuggestion[] = [];
    if (numDigits) {
      try {
        const nrows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(
          `SELECT n.id, n.number AS law_number, coalesce(n.common_name, n.title) AS law_title, n.title AS law_raw_title, n.norm_type, n.year
           FROM norms n WHERE regexp_replace(n.number, '\\D', '', 'g') = $1 LIMIT 3`,
          numDigits,
        );
        for (const r of nrows) {
          const i = this.lawItem({ ...r, id: r.id }, q);
          head.push({ id: i.id, type: 'law', lawId: i.lawId, lawNumber: i.lawNumber, lawTitle: i.lawTitle, title: i.title, highlightedTitle: i.highlightedTitle, normType: i.normType, year: i.year, url: i.url, snippet: '' });
        }
      } catch { /* ignora: el match por número es un extra */ }
    }

    // Referencia directa a un artículo ("Código Penal art. 79"): mismo caso que en
    // search(). Se resuelve al artículo concreto y va al frente del autocompletado.
    const artRef = extractArticleRef(q);
    if (artRef) {
      try {
        const artNumKey = norm(artRef.artNum).replace(/\s+/g, '');
        const lawDigits = artRef.lawText.replace(/\D/g, '');
        const arows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(
          `SELECT a.id AS aid, a.norm_id, a.number AS art_number, a.title AS art_title,
                  n.number AS law_number, coalesce(n.common_name, n.title) AS law_title, n.title AS law_raw_title, n.norm_type, n.year
           FROM articles a JOIN norms n ON n.id = a.norm_id
           WHERE regexp_replace(lower(immutable_unaccent(a.number)), '\\s', '', 'g') = $1
             AND ( n.search @@ websearch_to_tsquery('spanish'::regconfig, immutable_unaccent($2))
                   OR regexp_replace(n.number, '\\D', '', 'g') = $3 )
           ORDER BY (position(immutable_unaccent(lower($2)) in immutable_unaccent(lower(
                       coalesce(n.common_name,'') || ' ' || coalesce(n.title,'') || ' ' ||
                       coalesce(n.short_code,'') || ' ' || coalesce(array_to_string(n.aliases,' '),'')
                     ))) > 0)::int DESC,
                    ts_rank('${RANK_WEIGHTS}', n.search, websearch_to_tsquery('spanish'::regconfig, immutable_unaccent($2))) DESC
           LIMIT 3`,
          artNumKey, artRef.lawText, lawDigits || '\x00',
        );
        for (const r of arows) {
          const i = this.articleItem(r, q);
          head.push({ id: i.id, type: 'article', lawId: i.lawId, lawNumber: i.lawNumber, lawTitle: i.lawTitle, articleId: i.articleId, articleNumber: i.articleNumber, articleTitle: i.articleTitle, title: i.title, highlightedTitle: i.highlightedTitle, normType: i.normType, year: i.year, url: i.url, snippet: '' });
        }
      } catch { /* ignora: el match por referencia es un extra */ }
    }

    const mapped: SearchSuggestion[] = rows.map((r): SearchSuggestion => {
      if (r.rtype === 'law') {
        const i = this.lawItem(r, q);
        return { id: i.id, type: 'law', lawId: i.lawId, lawNumber: i.lawNumber, lawTitle: i.lawTitle, title: i.title, highlightedTitle: i.highlightedTitle, normType: i.normType, year: i.year, url: i.url, snippet: '' };
      }
      const i = this.articleItem(r, q);
      return { id: i.id, type: 'article', lawId: i.lawId, lawNumber: i.lawNumber, lawTitle: i.lawTitle, articleId: i.articleId, articleNumber: i.articleNumber, articleTitle: i.articleTitle, title: i.title, highlightedTitle: i.highlightedTitle, normType: i.normType, year: i.year, url: i.url, snippet: '' };
    });

    const seenIds = new Set(head.map((h) => h.id));
    return [...head, ...mapped.filter((m) => !seenIds.has(m.id))].slice(0, limit);
  }

  async facets(query?: string): Promise<Record<string, Record<string, number>>> {
    const q = query?.trim();
    const cond = q ? `WHERE n.search @@ websearch_to_tsquery('spanish'::regconfig, immutable_unaccent($1))` : '';
    const params = q ? [q] : [];
    const sql = `
      SELECT n.norm_type, n.status, n.jurisdiction, n.categories, (floor(n.year/10)*10)::int AS decade
      FROM norms n ${cond}`;
    const rows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(sql, ...params);
    const byType: Record<string, number> = {};
    const byNormType: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    const byJurisdiction: Record<string, number> = {};
    const byDecade: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    for (const r of rows) {
      const nt = String(r.norm_type); byNormType[nt] = (byNormType[nt] ?? 0) + 1;
      const st = String(r.status); byStatus[st] = (byStatus[st] ?? 0) + 1;
      const ju = String(r.jurisdiction); byJurisdiction[ju] = (byJurisdiction[ju] ?? 0) + 1;
      const de = `${r.decade}s`; byDecade[de] = (byDecade[de] ?? 0) + 1;
      const cats = Array.isArray(r.categories) ? (r.categories as string[]) : [];
      for (const c of cats) byCategory[c] = (byCategory[c] ?? 0) + 1;
    }
    return { byType, byNormType, byStatus, byJurisdiction, byDecade, byCategory };
  }

  private articleItem(r: Record<string, unknown>, q: string): SearchResultItem {
    const lawId = String(r.norm_id);
    const lawNumber = String(r.law_number ?? '');
    const lawTitle = String(r.law_title ?? '');
    const lawRawTitle = String(r.law_raw_title ?? r.law_title ?? '');
    const artNumber = String(r.art_number ?? '');
    const artTitle = r.art_title ? String(r.art_title) : undefined;
    const title = artTitle ?? `Art. ${artNumber}`;
    return {
      id: `article:${String(r.aid)}`, score: Number(r.rank ?? 0), type: 'article',
      lawId, lawNumber, lawTitle, normType: String(r.norm_type), jurisdiction: String(r.jurisdiction),
      status: String(r.status), year: Number(r.year ?? 0),
      category: String(r.law_category ?? ''), categories: Array.isArray(r.law_categories) ? (r.law_categories as string[]) : [],
      articleId: String(r.aid), articleNumber: artNumber, articleTitle: artTitle,
      title, highlightedTitle: highlightTitle(title, q), summary: '',
      url: computeArticleUrl(lawStub(lawId, lawNumber, lawRawTitle), artNumber),
      snippet: String(r.snippet ?? ''),
    };
  }

  private lawItem(r: Record<string, unknown>, q: string): SearchResultItem {
    const id = String(r.id ?? r.aid);
    const number = String(r.number ?? r.law_number ?? '');
    const title = String(r.title ?? r.law_title ?? '');
    const rawTitle = String(r.raw_title ?? title);
    return {
      id: `law:${id}`, score: Number(r.rank ?? 0), type: 'law',
      lawId: id, lawNumber: number, lawTitle: title, normType: String(r.norm_type),
      jurisdiction: String(r.jurisdiction ?? ''), status: String(r.status ?? ''), year: Number(r.year ?? 0),
      category: String(r.category ?? ''), categories: Array.isArray(r.categories) ? (r.categories as string[]) : [],
      title, highlightedTitle: highlightTitle(title, q), summary: String(r.summary ?? ''),
      url: computeFrontendPath(lawStub(id, number, rawTitle)),
      snippet: String(r.snippet ?? ''),
    };
  }
}
