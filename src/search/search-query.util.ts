// ─────────────────────────────────────────────────────────────────────────────
//  Capa de sinónimos del buscador (diccionario término coloquial ↔ término legal).
//
//  El corpus usa el vocabulario de la ley ("venta a distancia / domiciliaria /
//  electrónica", "revocación"), pero la gente busca en coloquial ("venta online",
//  "botón de arrepentimiento"). Como el buscador arma un tsquery AND, si un token
//  no está en NINGÚN texto legal (p. ej. "online") la búsqueda da 0 resultados.
//
//  Solución: expandir cada token en un grupo OR con sus sinónimos legales dentro
//  del tsquery (AND entre tokens, OR dentro del grupo). El resultado es una cadena
//  compatible con to_tsquery('spanish', …). Determinístico, sin IA.
// ─────────────────────────────────────────────────────────────────────────────

// Clave y valores SIN acento y en minúscula: así los normaliza el tsvector, que se
// construye con immutable_unaccent + config 'spanish'. Cada valor es un lexema que
// SÍ aparece en el corpus. Ampliar acá a medida que aparecen zero-results reales.
export const SEARCH_SYNONYMS: Record<string, string[]> = {
  // e-commerce / venta a distancia → Defensa del Consumidor (24.240 arts 32-34), CCyC 1104-1116
  online:          ['distancia', 'electronica', 'domiciliaria'],
  ecommerce:       ['distancia', 'electronica', 'domiciliaria'],
  arrepentimiento: ['revocacion'],
  // "echar" (coloquial) → despido/cesantía (LCT, Ley de Empleo, DNU 70/2023).
  // Detectado por tracking: "echar trabajadores sin pagar" (3×) daba 0.
  echar:           ['despido', 'despedir', 'cesantia', 'desvincular'],
  echaron:         ['despido', 'despedir', 'cesantia', 'desvincular'],
  echan:           ['despido', 'despedir', 'cesantia', 'desvincular'],
  // Tránsito coloquial → Ley de Tránsito 24.449 (comprobación de faltas por medios
  // técnicos, art. 70) y ANSV 26.363. Detectado por tracking: "fotomulta(s)" daba 0.
  // Valores discriminantes: "transito" (título de la 24.449, peso A) y "velocidad"
  // (arts 50-51). Se evitan "multa"/"infraccion" por ser lexemas ruidosos (aduanero, penal).
  fotomulta:       ['transito'],
  fotomultas:      ['transito'],
  radar:           ['velocidad', 'transito'],
  cinemometro:     ['velocidad', 'transito'],
};

// Frases coloquiales que se colapsan a un token ANTES de tokenizar
// ("on line" → "online", "e-commerce"/"e commerce" → "ecommerce").
const SEARCH_PHRASES: [RegExp, string][] = [
  [/\bon\s+line\b/g, 'online'],
  [/\be[\s-]?commerce\b/g, 'ecommerce'],
];

// Palabras vacías (el propio 'spanish' también las descarta; las sacamos para no
// armar un grupo OR con un lexema que to_tsquery dejaría nulo).
const FTS_STOP = new Set([
  'de', 'la', 'el', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'u',
  'en', 'a', 'al', 'del', 'por', 'para', 'con', 'que', 'su', 'sus', 'se', 'lo',
  'le', 'les', 'mi', 'tu', 'sin', 'sobre', 'entre', 'hasta', 'desde', 'ni',
]);

function ftsNorm(raw: string): string {
  let s = raw.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  for (const [re, rep] of SEARCH_PHRASES) s = s.replace(re, rep);
  return s.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Tokens útiles de la query (sin acentos, sin puntuación, sin stopwords, ≥2 chars).
function tokenize(raw: string): string[] {
  return ftsNorm(raw)
    .split(' ')
    .filter((t) => t.length >= 2 && !FTS_STOP.has(t));
}

// Grupo tsquery de un token: `tok:*`, o `(tok:* | syn1:* | …)` si tiene sinónimos.
function groupFor(t: string): string {
  const syns = SEARCH_SYNONYMS[t];
  return syns?.length ? `(${[t, ...syns].map((w) => `${w}:*`).join(' | ')})` : `${t}:*`;
}

/**
 * Construye un tsquery (para to_tsquery('spanish', …)) desde la query del usuario,
 * expandiendo sinónimos. Cada token → `tok:*`; si tiene sinónimos → `(tok:* | s1:* | …)`.
 * Une los grupos con ` & ` (AND). Devuelve null si no queda ningún token útil (p. ej.
 * la query es solo puntuación) → la búsqueda por número/nombre igual corre aparte.
 * Solo emite tokens [a-z0-9] + operadores `:* & | ( )` → siempre es tsquery válido.
 */
export function buildFtsQuery(raw: string): string | null {
  const tokens = tokenize(raw);
  if (!tokens.length) return null;
  return tokens.map(groupFor).join(' & ');
}

export interface FtsFallback {
  or: string;         // OR de todos los grupos (matchea CUALQUIER término)
  groups: string[];   // cada grupo suelto (para contar cobertura por artículo)
  bigrams: string[];  // pares de tokens adyacentes (para boost por frase con phraseto_tsquery)
}

/**
 * Plan de FALLBACK para cuando el AND estricto da 0 resultados: en vez de exigir
 * TODOS los términos, matchea cualquiera (OR) y rankea por frase-adyacente > cobertura
 * (cuántos términos matchea) > ts_rank. Sirve para consultas en lenguaje natural
 * ("amparo ajustes razonables") donde ningún registro tiene todas las palabras.
 * Solo tiene sentido con ≥2 tokens (con 1, OR == AND). null si no aplica.
 */
export function buildFtsFallback(raw: string): FtsFallback | null {
  const tokens = tokenize(raw);
  if (tokens.length < 2) return null;
  const groups = tokens.map(groupFor);
  const bigrams: string[] = [];
  for (let i = 0; i < tokens.length - 1; i++) bigrams.push(`${tokens[i]} ${tokens[i + 1]}`);
  return { or: groups.join(' | '), groups, bigrams };
}
