import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { computeFrontendPath, computeArticleUrl } from '../common/utils/law-url.util';
import { buildFtsQuery, buildFtsFallback } from './search-query.util';
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

// Umbral del boost por NOMBRE de norma (word_similarity de trigramas). Medido contra el
// corpus real: los nombres de verdad caen entre 0.55 y 1.0 ("ley de iva" → Ley del
// Impuesto al Valor Agregado = 0.55; "código penal" = 0.69; "ley de contrato de trabajo"
// = 0.83), y los falsos positivos por debajo de 0.45 ("tenencia compartida" → "Tiempo
// Compartido" = 0.45, que con el umbral viejo de 0.4 se colaba PRIMERO en una de las
// consultas de familia más frecuentes). 0.5 los separa sin perder ningún nombre legítimo.
const NAME_SIM_MIN = 0.5;

// Similaridad de la query ($1) con el NOMBRE de la norma: el mejor puntaje entre el
// nombre visible, sus ALIASES y la sigla exacta ($2 = términos significativos).
// Los aliases son clave: sin ellos, "habeas data" caía en la Ley de Hábeas Corpus
// (0.58 de similaridad por compartir "habeas") en vez de la Ley de Protección de los
// Datos Personales (0.25). Como los aliases viven en la BD, se pueden curar sin deploy.
const NAME_SIM_EXPR = `GREATEST(
  word_similarity(immutable_unaccent(lower($1)), immutable_unaccent(lower(coalesce(n.common_name, n.title)))),
  coalesce((SELECT max(word_similarity(immutable_unaccent(lower($1)), immutable_unaccent(lower(al))))
            FROM unnest(coalesce(n.aliases, ARRAY[]::text[])) al), 0),
  (immutable_unaccent(lower(coalesce(n.short_code,''))) = ANY($2::text[]))::int::float
)`;

// Con menos de estos resultados, el AND estricto se considera fallido y se prueba el
// fallback OR (ver search()). Los ítems del fallback puntúan por frase/cobertura, así que
// se ordenan solos respecto de los pocos que ya había; no se pierde nada de lo anterior.
const FALLBACK_MIN_RESULTS = 3;

function norm(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9\s]/g, '').trim();
}

// Palabras genéricas que NO identifican una norma puntual (el usuario las agrega por
// costumbre: "ley de...", "código...", "decreto..."). Se descartan al hacer el match
// por nombre para no exigir que estén en el título (ej. la norma puede llamarse
// "Contrato de Trabajo" sin la palabra "Ley").
const NAME_GENERIC = new Set([
  'ley', 'leyes', 'decreto', 'decretos', 'codigo', 'dnu', 'norma', 'normas',
  'resolucion', 'disposicion', 'nacional', 'de', 'del', 'la', 'el', 'los', 'las',
  'y', 'en', 'para', 'por', 'con',
]);
function nameTerms(q: string): string[] {
  return norm(q).split(/\s+/).filter((t) => t.length > 2 && !NAME_GENERIC.has(t));
}

// Extrae el número de una norma cuando la query ES (esencialmente) un número:
// "26.388", "26388", "ley 26.388", "decreto 1112/2024", "941/2025". Devuelve solo
// los dígitos para un match directo por número. null si la query trae texto además
// del número (ahí manda el tsvector). Resuelve el bug de que el tsvector parte los
// puntos/barras ("26.388" → "26" & "388") y no matchea el token entero ("26388").
function extractNumberDigits(q: string): string | null {
  const cleaned = q
    .toLowerCase()
    .replace(/\b(ley|leyes|decreto|decretos|dnu|norma|normas|resoluci[oó]n|disposici[oó]n|n[°º]|nro\.?|numero|n[uú]mero)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  // Si queda texto que no sea dígitos / separadores, no es una búsqueda por número.
  if (cleaned.replace(/[\d.\/\s-]/g, '').length > 0) return null;
  const digits = cleaned.replace(/\D/g, '');
  return digits.length >= 3 && digits.length <= 9 ? digits : null;
}

// Detecta una referencia directa a un artículo dentro de una norma nombrada:
// "Código Penal art. 79", "ley 11683 art 5", "art 14 bis constitución nacional".
// Dispara con "art/artículo N" y también con "norma N" (uso coloquial muy común: la
// gente escribe "norma 280 ccc" cuando quiere el artículo 280 del CCyC).
// Devuelve { artNum, lawText } con el número del artículo (con sufijo bis/ter…) y
// el texto restante que nombra a la ley. null si no hay patrón o si no queda texto
// de ley: un "art 79" o un "norma 26994" suelto es ambiguo (este último es el número
// de la norma, y lo resuelve extractNumberDigits) → no se trata como ref de artículo.
export function extractArticleRef(q: string): { artNum: string; lawText: string } | null {
  const m = q.match(
    /\b(?:art(?:[íi]culos?|\.|\b)?|normas?)\s*(\d+\s*(?:bis|ter|qu[áa]ter|quater|quinquies|sexies|septies)?)/i,
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

    // tsquery con sinónimos (coloquial ↔ legal). null = la query no aporta términos
    // de texto (p. ej. es solo un número) → la resuelven los match por número/nombre.
    const ftsQ = buildFtsQuery(q);

    if (opts.type !== 'law' && ftsQ) {
      const params: unknown[] = [ftsQ];
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
             to_tsquery('spanish'::regconfig, $1) qq
        WHERE a.search @@ qq${where}
        ORDER BY rank DESC
        LIMIT $${params.length}`;
      try {
        const rows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(sql, ...params);
        for (const r of rows) out.push(this.articleItem(r, q));
      } catch { /* un tsquery inválido nunca debe romper la búsqueda */ }
    }

    if (opts.type !== 'article' && ftsQ) {
      const params: unknown[] = [ftsQ];
      const where = this.filterClauses(opts, params);
      params.push(limit);
      const sql = `
        SELECT n.id, n.number, coalesce(n.common_name, n.title) AS title, n.title AS raw_title,
               n.norm_type, n.jurisdiction, n.status, n.year, n.category, n.categories, coalesce(n.summary,'') AS summary,
               ts_rank('${RANK_WEIGHTS}', n.search, qq) AS rank,
               ts_headline('spanish'::regconfig, coalesce(n.summary,''), qq, '${HEADLINE_OPTS}') AS snippet
        FROM norms n, to_tsquery('spanish'::regconfig, $1) qq
        WHERE n.search @@ qq${where}
        ORDER BY rank DESC
        LIMIT $${params.length}`;
      try {
        const rows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(sql, ...params);
        for (const r of rows) out.push(this.lawItem(r, q));
      } catch { /* un tsquery inválido nunca debe romper la búsqueda */ }
    }

    // Match directo por número de norma ("26.388", "1112/2024", "ley 27742"): el
    // tsvector parte puntos/barras y no matchea el número entero. Va con score alto.
    const numDigits = extractNumberDigits(q);
    let numMatchedNorm = false;
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
      numMatchedNorm = rows.length > 0;
      // Score DECRECIENTE por posición: la SQL ya viene ordenada por relevancia y el
      // sort final es por score. Con un score fijo para todas, el orden de la SQL se
      // perdía (y con `unshift` en el loop, además se invertía: la peor quedaba primera).
      rows.forEach((r, i) => { const it = this.lawItem(r, q); it.score = 1000 - i; out.push(it); });
    }

    // Número suelto que NO es ninguna norma cargada: casi siempre la persona quiere un
    // ARTÍCULO de un código ("1725" = art. 1725 del Código Civil y Comercial; "280" = art.
    // 280). Sin esto caía en el texto libre y devolvía ruido (la "Ley 17.250" para 1725).
    // Del tracking: el guest que buscó "1725" fue refinando a "art 1" y "art . 1
    // constitución nacional" hasta encontrar lo que quería — nunca llegó.
    // Solo para números de hasta 4 dígitos (ningún código pasa del art. 2671) y solo si
    // no hubo norma con ese número, así "27001" (ley no cargada) sigue avisando eso.
    if (numDigits && !numMatchedNorm && numDigits.length <= 4 && opts.type !== 'law') {
      try {
        const rows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(
          `SELECT a.id AS aid, a.norm_id, a.number AS art_number, a.title AS art_title,
                  n.number AS law_number, coalesce(n.common_name, n.title) AS law_title, n.title AS law_raw_title,
                  n.norm_type, n.jurisdiction, n.status, n.year, n.category AS law_category, n.categories AS law_categories,
                  left(coalesce(nullif(a.plain_language_explanation, ''), a.body, ''), 240) AS snippet,
                  (SELECT count(*) FROM articles a2 WHERE a2.norm_id = n.id) AS art_count
           FROM articles a JOIN norms n ON n.id = a.norm_id
           WHERE a.number = $1
             AND (n.id LIKE 'codigo%' OR coalesce(n.common_name, n.title) ILIKE 'c_digo%')
           ORDER BY art_count DESC
           LIMIT 4`,
          numDigits,
        );
        // Por debajo del match exacto de norma por número (1000) y por encima del boost
        // por nombre (≤800): es una interpretación, no lo que el usuario escribió textual.
        rows.forEach((r, i) => { const it = this.articleItem(r, q); it.score = 900 - i; out.push(it); });
      } catch { /* interpretar el número como artículo es un extra; nunca rompe la búsqueda */ }
    }

    // Referencia directa a un artículo de una norma nombrada ("Código Penal art. 79",
    // "ley 11683 art 5"). El tsvector falla porque exige que TODOS los términos (el
    // nombre de la ley + el nro de artículo) convivan en un mismo registro, y no lo
    // hacen. Se resuelve buscando el artículo por número dentro de la(s) norma(s) que
    // matchean el texto restante. Score muy alto: es lo que el usuario pidió exacto.
    const artRef = extractArticleRef(q);
    if (artRef && opts.type !== 'law') {
      try {
        const artNumKey = norm(artRef.artNum).replace(/\s+/g, '');
        const lawDigits = artRef.lawText.replace(/\D/g, '');
        const params: unknown[] = [artNumKey, artRef.lawText];
        // La rama por número solo se agrega si la ley se nombró por número. Cuando se
        // nombra por texto NO hay dígitos: antes se pasaba un byte nulo '\x00' como
        // centinela y Postgres lo rechaza → 500 en toda búsqueda "artículo N <ley por
        // nombre>" (código penal, constitución, CCyC…). Ahora la rama se omite.
        let numCond = '';
        if (lawDigits) { params.push(lawDigits); numCond = ` OR regexp_replace(n.number, '\\D', '', 'g') = $${params.length}`; }
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
            AND ( n.search @@ websearch_to_tsquery('spanish'::regconfig, immutable_unaccent($2))${numCond} )
          ORDER BY phrase DESC, rank DESC
          LIMIT 5`;
        const rows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(sql, ...params);
        // Score DECRECIENTE por posición (ver el match por número): el ORDER BY de la SQL
        // ya pone primero el artículo de la norma cuyo nombre contiene la frase buscada
        // ("Código Penal art. 79" → Homicidio simple, no el art. 79 del Código Aduanero).
        rows.forEach((r, i) => { const it = this.articleItem(r, q); it.score = 2000 - i; out.push(it); });
      } catch { /* la ref a artículo es un extra; nunca debe romper la búsqueda */ }
    }

    // Boost por NOMBRE de norma: cuando el usuario escribe el nombre de una ley
    // ("ley de contrato de trabajo", "código penal", "LCT"), priorizamos la norma cuyo
    // nombre / sigla / alias contiene TODOS los términos significativos (sin los
    // genéricos). El nombre más corto que matchea gana (el más específico). Resuelve
    // que los artículos sueltos con esas palabras enterraran a la ley buscada.
    const nt = nameTerms(q);
    if (nt.length > 0 && opts.type !== 'article') {
      try {
        // Similaridad por trigramas (pg_trgm) sobre el NOMBRE (title/common_name) + sigla
        // exacta. Rankea bien nombres multi-palabra ("código penal" → Código Penal) y
        // descarta los que no se parecen (no más "Vinos"/"SIDA" por matchear un alias).
        // Score por similaridad → la norma más parecida al nombre tipeado queda primera.
        const params: unknown[] = [q, nt];
        const where = this.filterClauses(opts, params);
        const sql = `
          SELECT * FROM (
            SELECT n.id, n.number, coalesce(n.common_name, n.title) AS title, n.title AS raw_title,
                   n.norm_type, n.jurisdiction, n.status, n.year, n.category, n.categories,
                   coalesce(n.summary,'') AS summary, coalesce(n.summary,'') AS snippet,
                   length(coalesce(n.common_name, n.title)) AS name_len,
                   ${NAME_SIM_EXPR} AS sim
            FROM norms n
            WHERE true${where}
          ) s
          WHERE s.sim >= ${NAME_SIM_MIN}
          ORDER BY s.sim DESC, s.name_len ASC
          LIMIT 6`;
        const rows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(sql, ...params);
        rows.forEach((r, i) => { const it = this.lawItem(r, q); it.score = 500 + Number(r.sim) * 300 - i * 0.1; out.push(it); });
      } catch { /* el boost por nombre es un extra; nunca rompe la búsqueda */ }
    }

    // FALLBACK: relajar el AND a OR. En vez de exigir TODOS los términos, matchea
    // cualquiera y re-rankea por: frase-adyacente (bigrama) > cobertura (nº de términos
    // que matchea) > ts_rank. Resuelve consultas en lenguaje natural ("amparo ajustes
    // razonables") donde ningún registro tiene todas las palabras. Candidatos acotados
    // por ts_rank (200) para no pagar phrase/cobertura/headline sobre todo el OR.
    //
    // Corre con `out` vacío Y TAMBIÉN con muy pocos resultados: exigir CERO lo volvía
    // inalcanzable justo cuando más falta hace, porque basta UN match casual e irrelevante
    // para bloquearlo ("amparo ajustes razonables" traía solo la Ley 11.683 —por el
    // "recurso de amparo" del procedimiento fiscal— y así la Convención de Discapacidad,
    // que sí habla de ajustes razonables, nunca aparecía). No corre si hubo match exacto
    // por número de norma o por referencia a artículo: eso es lo que el usuario pidió textual.
    const exactMatch = Boolean(numDigits) || Boolean(artRef);
    if (!exactMatch && out.length < FALLBACK_MIN_RESULTS) {
      const fb = buildFtsFallback(q);
      if (fb && opts.type !== 'law') {
        const params: unknown[] = [fb.or, fb.bigrams, fb.groups];
        const where = this.filterClauses(opts, params);
        params.push(limit);
        const sql = `
          WITH cand AS (
            SELECT a.id AS aid, a.norm_id, a.number AS art_number, a.title AS art_title, a.body, a.search,
                   n.number AS law_number, coalesce(n.common_name, n.title) AS law_title, n.title AS law_raw_title,
                   n.norm_type, n.jurisdiction, n.status, n.year, n.category AS law_category, n.categories AS law_categories,
                   ts_rank('${RANK_WEIGHTS}', a.search, qq) AS rank
            FROM articles a JOIN norms n ON n.id = a.norm_id, to_tsquery('spanish'::regconfig, $1) qq
            WHERE a.search @@ qq${where}
            ORDER BY rank DESC LIMIT 200
          ), scored AS (
            SELECT c.*,
                   (EXISTS (SELECT 1 FROM unnest($2::text[]) bg WHERE c.search @@ phraseto_tsquery('spanish'::regconfig, bg)))::int AS phrase,
                   (SELECT count(*) FROM unnest($3::text[]) g WHERE c.search @@ to_tsquery('spanish'::regconfig, g)) AS cov
            FROM cand c ORDER BY phrase DESC, cov DESC, rank DESC LIMIT $${params.length}
          )
          SELECT aid, norm_id, art_number, art_title, law_number, law_title, law_raw_title,
                 norm_type, jurisdiction, status, year, law_category, law_categories, rank, phrase, cov,
                 ts_headline('spanish'::regconfig, body, to_tsquery('spanish'::regconfig, $1), '${HEADLINE_OPTS}') AS snippet
          FROM scored`;
        try {
          const rows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(sql, ...params);
          for (const r of rows) {
            const it = this.articleItem(r, q);
            it.score = Number(r.phrase) * 10_000 + Number(r.cov) * 100 + Number(r.rank ?? 0);
            out.push(it);
          }
        } catch { /* el fallback nunca debe romper la búsqueda */ }
      }
      if (fb && opts.type !== 'article') {
        const params: unknown[] = [fb.or, fb.bigrams, fb.groups];
        const where = this.filterClauses(opts, params);
        params.push(limit);
        const sql = `
          WITH cand AS (
            SELECT n.id, n.number, coalesce(n.common_name, n.title) AS title, n.title AS raw_title, n.search,
                   coalesce(n.summary,'') AS summary, n.norm_type, n.jurisdiction, n.status, n.year, n.category, n.categories,
                   ts_rank('${RANK_WEIGHTS}', n.search, qq) AS rank
            FROM norms n, to_tsquery('spanish'::regconfig, $1) qq
            WHERE n.search @@ qq${where}
            ORDER BY rank DESC LIMIT 200
          ), scored AS (
            SELECT c.*,
                   (EXISTS (SELECT 1 FROM unnest($2::text[]) bg WHERE c.search @@ phraseto_tsquery('spanish'::regconfig, bg)))::int AS phrase,
                   (SELECT count(*) FROM unnest($3::text[]) g WHERE c.search @@ to_tsquery('spanish'::regconfig, g)) AS cov
            FROM cand c ORDER BY phrase DESC, cov DESC, rank DESC LIMIT $${params.length}
          )
          SELECT id, number, title, raw_title, norm_type, jurisdiction, status, year, category, categories, summary, rank, phrase, cov,
                 ts_headline('spanish'::regconfig, summary, to_tsquery('spanish'::regconfig, $1), '${HEADLINE_OPTS}') AS snippet
          FROM scored`;
        try {
          const rows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(sql, ...params);
          for (const r of rows) {
            const it = this.lawItem(r, q);
            it.score = Number(r.phrase) * 10_000 + Number(r.cov) * 100 + Number(r.rank ?? 0);
            out.push(it);
          }
        } catch { /* el fallback nunca debe romper la búsqueda */ }
      }
    }

    // Dedup por id quedándonos con el MAYOR score: una norma puede venir del FTS (score
    // bajo) Y del boost por nombre/número/artículo (score alto) — debe ganar el alto.
    // (Antes el dedup se quedaba con la primera aparición = la del FTS, y enterraba el boost.)
    const best = new Map<string, SearchResultItem>();
    for (const it of out) {
      const prev = best.get(it.id);
      if (!prev || it.score > prev.score) best.set(it.id, it);
    }

    // Orden final en dos bandas. Los boosts intencionales (número exacto, nombre de norma,
    // referencia directa a artículo, fallback) puntúan >= 500 y mandan por SCORE puro: un
    // match exacto de artículo ("código penal art. 80") tiene que quedar arriba. Por debajo
    // de ese piso están los resultados por texto (ts_rank <= ~1); ahí la NORMA va antes que
    // los artículos, para que la ley sea la puerta de entrada y sus artículos la sigan
    // (p. ej. "ganancias" → Ley 20.628 primero, después sus artículos), de forma dinámica y
    // sin fijar nada por query.
    const EXACT_TIER_FLOOR = 100; // el ts_rank del FTS nunca lo alcanza; el boost más bajo (nombre) arranca en ~500
    const rank = (a: SearchResultItem, b: SearchResultItem): number => {
      const aExact = a.score >= EXACT_TIER_FLOOR;
      const bExact = b.score >= EXACT_TIER_FLOOR;
      if (aExact !== bExact) return aExact ? -1 : 1;
      if (aExact) return b.score - a.score;
      if (a.type !== b.type) return a.type === 'law' ? -1 : 1;
      return b.score - a.score;
    };
    return [...best.values()].sort(rank).slice(0, limit);
  }

  async suggest(query: string, limit = 8): Promise<SearchSuggestion[]> {
    const q = query?.trim();
    if (!q || q.length < 2) return [];

    // Mismo tsquery con sinónimos que search(), para que el autocompletado también
    // cruce coloquial ↔ legal (p. ej. "venta onl…" ya sugiere Defensa del Consumidor).
    const ftsQ = buildFtsQuery(q);
    let rows: Record<string, unknown>[] = [];
    if (ftsQ) {
      const sql = `
        WITH tq AS (SELECT to_tsquery('spanish'::regconfig, $1) AS qq)
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
      try {
        rows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(sql, ftsQ, limit);
      } catch { rows = []; }
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
        const aparams: unknown[] = [artNumKey, artRef.lawText];
        // Ver search(): la rama por número solo va si la ley se nombró por número; con
        // texto se omite (el centinela '\x00' hacía fallar la query — acá el catch la
        // tragaba y el artículo no aparecía en el autocompletado).
        let numCond = '';
        if (lawDigits) { aparams.push(lawDigits); numCond = ` OR regexp_replace(n.number, '\\D', '', 'g') = $${aparams.length}`; }
        const arows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(
          `SELECT a.id AS aid, a.norm_id, a.number AS art_number, a.title AS art_title,
                  n.number AS law_number, coalesce(n.common_name, n.title) AS law_title, n.title AS law_raw_title, n.norm_type, n.year
           FROM articles a JOIN norms n ON n.id = a.norm_id
           WHERE regexp_replace(lower(immutable_unaccent(a.number)), '\\s', '', 'g') = $1
             AND ( n.search @@ websearch_to_tsquery('spanish'::regconfig, immutable_unaccent($2))${numCond} )
           ORDER BY (position(immutable_unaccent(lower($2)) in immutable_unaccent(lower(
                       coalesce(n.common_name,'') || ' ' || coalesce(n.title,'') || ' ' ||
                       coalesce(n.short_code,'') || ' ' || coalesce(array_to_string(n.aliases,' '),'')
                     ))) > 0)::int DESC,
                    ts_rank('${RANK_WEIGHTS}', n.search, websearch_to_tsquery('spanish'::regconfig, immutable_unaccent($2))) DESC
           LIMIT 3`,
          ...aparams,
        );
        for (const r of arows) {
          const i = this.articleItem(r, q);
          head.push({ id: i.id, type: 'article', lawId: i.lawId, lawNumber: i.lawNumber, lawTitle: i.lawTitle, articleId: i.articleId, articleNumber: i.articleNumber, articleTitle: i.articleTitle, title: i.title, highlightedTitle: i.highlightedTitle, normType: i.normType, year: i.year, url: i.url, snippet: '' });
        }
      } catch { /* ignora: el match por referencia es un extra */ }
    }

    // Match por NOMBRE de norma (trigramas, ver search()): "ley de contrato de trabajo" → LCT.
    const nt = nameTerms(q);
    if (nt.length > 0) {
      try {
        const nrows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(
          `SELECT * FROM (
             SELECT n.id, n.number AS law_number, coalesce(n.common_name, n.title) AS law_title, n.title AS law_raw_title,
                    n.norm_type, n.year, length(coalesce(n.common_name, n.title)) AS name_len,
                    ${NAME_SIM_EXPR} AS sim
             FROM norms n
           ) s
           WHERE s.sim >= ${NAME_SIM_MIN}
           ORDER BY s.sim DESC, s.name_len ASC LIMIT 5`,
          q, nt,
        );
        for (const r of nrows) {
          const i = this.lawItem({ ...r, id: r.id }, q);
          head.push({ id: i.id, type: 'law', lawId: i.lawId, lawNumber: i.lawNumber, lawTitle: i.lawTitle, title: i.title, highlightedTitle: i.highlightedTitle, normType: i.normType, year: i.year, url: i.url, snippet: '' });
        }
      } catch { /* el match por nombre es un extra */ }
    }

    const mapped: SearchSuggestion[] = rows.map((r): SearchSuggestion => {
      if (r.rtype === 'law') {
        const i = this.lawItem(r, q);
        return { id: i.id, type: 'law', lawId: i.lawId, lawNumber: i.lawNumber, lawTitle: i.lawTitle, title: i.title, highlightedTitle: i.highlightedTitle, normType: i.normType, year: i.year, url: i.url, snippet: '' };
      }
      const i = this.articleItem(r, q);
      return { id: i.id, type: 'article', lawId: i.lawId, lawNumber: i.lawNumber, lawTitle: i.lawTitle, articleId: i.articleId, articleNumber: i.articleNumber, articleTitle: i.articleTitle, title: i.title, highlightedTitle: i.highlightedTitle, normType: i.normType, year: i.year, url: i.url, snippet: '' };
    });

    // Si hubo match por NOMBRE, sacamos las LEYES del FTS (ruido: matchean una palabra
    // suelta del cuerpo, no el nombre). Los ARTÍCULOS del FTS quedan. Sin match por
    // nombre, el FTS de leyes sigue como fallback.
    const nameLawIds = new Set(head.filter((h) => h.type === 'law').map((h) => h.lawId));
    const hasNameMatch = nt.length > 0 && nameLawIds.size > 0;
    const seenIds = new Set(head.map((h) => h.id));
    const body = mapped.filter((m) => {
      if (seenIds.has(m.id)) return false;
      if (m.type === 'law' && hasNameMatch && !nameLawIds.has(m.lawId)) return false;
      return true;
    });
    return [...head, ...body].slice(0, limit);
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
