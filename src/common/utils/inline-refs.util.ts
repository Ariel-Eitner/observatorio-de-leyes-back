// ─────────────────────────────────────────────────────────────────────────────
//  Parser de referencias inline (port EXACTO del front app/lib/inlineRefs.ts).
//  Produce los "chunks" estructurales de un texto: qué tramos son referencias y a
//  qué ley/artículo apuntan. NO decide render (clickeable/opaca/glosario) — eso
//  sigue en el front con el registry en runtime.
//
//  Usa grupos NOMBRADOS (no posicionales): agregar/reordenar patrones no rompe el
//  switch. Reconoce: códigos cortos (CN, CP, LCT…), números ("Ley N° 25.013"),
//  NOMBRES completos del registry ("Ley de Contrato de Trabajo"), y artículos de
//  otra ley por número ("art. 9 de la Ley N° 25.013") o por nombre
//  ("art. 245 bis de la Ley de Contrato de Trabajo").
//
//  IMPORTANTE: debe producir EXACTAMENTE los mismos chunks que el front.
// ─────────────────────────────────────────────────────────────────────────────

export type RefChunk =
  | { kind: 'text'; text: string }
  | { kind: 'art'; text: string; lawCode: string; articleNumber: string; paragraph: number | null; isSelf: boolean }
  | { kind: 'multi'; text: string; lawCode: string; articleNumbers: string[] }
  | { kind: 'law'; text: string; lawCode: string };

const GENERIC_CODE_PREFIX = /^(Ley\s+|Disp\.\s+|Decreto\s+)/i;
const EXTRA_CODES = ['CADH', 'PIDCP', 'PIDESC', 'CDN'];
const FALLBACK_LAW_CODES =
  'CN|CP|CA|CPP|LCT|CCyCN|CBsAs|CCABA|CCat|CChac|CChub|CCor|CCtes|CER|CFos|CJuj|CLPam|CLRio|CMza|CMis|CNqn|CRN|CSal|CSJ|CSL|CSCZ|CSF|CSTE|CTDF|CTUC';

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function escapeCode(code: string): string {
  return escapeRe(code).replace(/\s+/g, '\\s+');
}

export function buildLawCodesPattern(registryShortCodes: string[]): string {
  const specific = registryShortCodes.filter((c) => c && !GENERIC_CODE_PREFIX.test(c)).map(escapeCode);
  const all = [...new Set([...specific, ...EXTRA_CODES])];
  return all.length > 0 ? all.join('|') : FALLBACK_LAW_CODES;
}

// ── Índice de NOMBRES de leyes (para enlazar "Ley de Contrato de Trabajo") ──────
// Entrada mínima de registry. `code` es lo que el chunk lleva como lawCode (debe
// resolver en el front: shortCode o "Ley <número>").
export interface NameIndexEntry { label: string; shortCode?: string | null; number?: string | null; }
export interface NameIndex { pattern: string; nameToCode: Record<string, string> }

const NAME_OK = /^(Ley|Código|Constitución|Decreto|Régimen|Estatuto|Carta|Convención|Convenio|Pacto)\b/i;

function cleanName(label: string): string {
  // saca la sigla entre paréntesis del final: "Ley de Contrato de Trabajo (LCT)" → "…Trabajo"
  return label.replace(/\s*\([^)]*\)\s*$/, '').replace(/\s+/g, ' ').trim();
}
const normKey = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase();

// Nombres canónicos cortos de las normas troncales, sembrados SIEMPRE en el índice.
// El registry guarda la forma larga ("Código Penal de la Nación Argentina") o el
// título de la ley de implementación ("Ley de Implementación del CPP Federal"), así
// que sin esto "art. 140 del Código Penal" no engancha y queda como texto. Van
// primero: si una entrada del registry repite el nombre, gana el canónico (dedup).
const CANONICAL_NAME_ENTRIES: NameIndexEntry[] = [
  { label: 'Código Penal', shortCode: 'CP' },
  { label: 'Constitución Nacional', shortCode: 'CN' },
  { label: 'Código Civil y Comercial', shortCode: 'CCyCN' },
  { label: 'Código Aduanero', shortCode: 'CA' },
  { label: 'Código Procesal Penal', shortCode: 'CPP' },
];

/** Construye el patrón de nombres + el mapa nombre→código desde el registry. */
export function buildLawNamesIndex(entries: NameIndexEntry[]): NameIndex {
  const nameToCode: Record<string, string> = {};
  const names: string[] = [];
  for (const e of [...CANONICAL_NAME_ENTRIES, ...entries]) {
    const name = cleanName(e.label);
    if (!name || name.length < 11 || !NAME_OK.test(name)) continue;
    const code = e.shortCode || (e.number ? `Ley ${e.number}` : '');
    if (!code) continue;
    const key = normKey(name);
    if (nameToCode[key]) continue;
    nameToCode[key] = code;
    names.push(name);
  }
  // más largos primero → "…de la Nación" gana sobre "…" base
  names.sort((a, b) => b.length - a.length);
  const pattern = names.length ? names.map(escapeRe).join('|') : '(?!x)x'; // nunca matchea si vacío
  return { pattern, nameToCode };
}

export function buildCombined(lawCodesPattern: string, lawNamesPattern = '(?!x)x'): RegExp {
  const lcpFull = `${lawCodesPattern}|Disp\\.\\s+[\\w-]+|Ley\\s+[\\d.,]+`;
  const ART = `(?:art(?:ículo)?s?\\.?)`;            // art / art. / arts / artículo(s)
  const ARTNUM = `\\d+\\s*°?\\s*(?:bis|ter|qu[aá]ter)?`;

  // Específicos primero; genéricos (BARE/SPELLED) al final.
  const P = [
    `\\(arts?\\.\\s+(?<mrFrom>\\d+[a-z]*)\\s*[-–/]\\s*(?<mrTo>\\d+[a-z]*)(?:\\s+(?<mrLaw>${lcpFull}))?\\)`,
    `\\(arts?\\.\\s+(?<mlList>\\d+[a-z]*(?:(?:\\s*,\\s*|\\s+y\\s+)\\d+[a-z]*)+)(?:\\s+(?<mlLaw>${lcpFull}))?\\)`,
    `\\(art\\.\\s+(?<pailArt>\\d+[a-z]*)\\s+inc\\.\\s+(?<pailInc>\\d+)\\s+(?<pailLaw>${lcpFull})\\)`,
    `\\(art\\.\\s+(?<paiArt>\\d+[a-z]*)\\s+inc\\.\\s+(?<paiInc>\\d+)\\)`,
    `\\(art\\.\\s+(?<paArt>\\d+\\s*(?:bis|ter|quater)?)\\s+(?<paLaw>${lcpFull})\\)`,
    `\\b${ART}\\s+(?<adlnArt>\\d+)\\s*°?\\s*(?:bis|ter|qu[aá]ter)?[^.]{0,45}?\\bde\\s+la\\s+Ley\\s+(?:N[°º]\\.?\\s*)?(?<adlnLey>\\d+\\.?\\d*)`,
    `\\b${ART}\\s+(?<adnArt>${ARTNUM})\\s+(?:(?:de\\s+la|del)\\s+)?(?<adnName>${lawNamesPattern})`,
    `\\bart\\.\\s+(?<prArt>\\d+\\s*(?:bis|ter|quater)?)\\s+(?<prLaw>${lawCodesPattern})\\b`,
    `\\bLey\\s+(?:N[°º]\\.?\\s*)?(?<laLey>[\\d.,]+)\\s+arts?\\.\\s+(?<laArt>\\d+[a-z]*)\\b`,
    `\\bDecreto\\s+(?<daDec>\\d+\\/\\d{4})\\s+arts?\\.\\s+(?<daArt>\\d+[a-z]*)\\b`,
    `(?<nlaName>Código\\s+Civil\\s+y\\s+Comercial(?:\\s+de\\s+la\\s+Nación)?|Código\\s+Penal|Código\\s+Aduanero|Código\\s+Procesal\\s+Penal|Constitución\\s+Nacional),\\s*[Aa]rts?\\.\\s+(?<nlaArt>\\d+[a-z]*(?:-\\d+[a-z]*)?)`,
    `(?<nlName>${lawNamesPattern})`,
    `\\bLey\\s+(?:N[°º]\\.?\\s*)?(?<klLey>\\d+\\.?\\d*)\\b`,
    `\\bDecreto\\s+(?<kdDec>\\d+\\/\\d{4})\\b`,
    `\\barts?\\.\\s+(?<baArt>\\d+[a-z]*)(?!\\s*(?:${lawCodesPattern}|Ley\\s|N[°º]))`,
    `\\bartículos?\\s+(?<saArt>\\d+[a-z]*)(?!\\s*(?:${lawCodesPattern}|Ley\\s|N[°º]))`,
  ];
  return new RegExp(P.join('|'), 'gi');
}

function expandRange(from: string, to: string): string[] {
  const fromN = parseInt(from, 10);
  const toN = parseInt(to, 10);
  if (isNaN(fromN) || isNaN(toN) || toN < fromN || toN - fromN > 20) return [from, to];
  return Array.from({ length: toN - fromN + 1 }, (_, i) => String(fromN + i));
}

function isSelf(refLawCode: string, refArtNum: string, ctxLaw?: string, ctxArt?: string): boolean {
  if (!ctxLaw || !ctxArt) return false;
  const norm = (n: string) => n.trim().split(/[\s-]/)[0].toLowerCase();
  return refLawCode === ctxLaw && norm(refArtNum) === norm(ctxArt);
}

// fallback de nombres conocidos → código corto (cuando no vienen en el índice)
const LAW_NAME_TO_CODE: Record<string, string> = {
  'código penal': 'CP',
  'constitución nacional': 'CN',
  'código civil y comercial': 'CCyCN',
  'código civil y comercial de la nación': 'CCyCN',
  'código aduanero': 'CA',
  'código procesal penal': 'CPP',
};

const cleanArt = (s: string) => s.replace(/\s*°/g, '').replace(/\s+/g, ' ').trim();

/**
 * Parser estructural. `isAvailable(lawCode)` replica isLawAvailable del front.
 * `nameToCode` mapea nombre completo (lowercase) → código (shortCode o "Ley N").
 */
export function parseRefChunks(
  input: string,
  combined: RegExp,
  ctxLawCode?: string,
  ctxArtNum?: string,
  isAvailable: (lawCode: string) => boolean = () => true,
  nameToCode: Record<string, string> = {},
): RefChunk[] {
  const chunks: RefChunk[] = [];
  const regex = new RegExp(combined.source, 'gi');
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const resolveName = (raw: string): string | null => {
    const key = normKey(raw);
    return nameToCode[key] ?? LAW_NAME_TO_CODE[key] ?? null;
  };

  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      chunks.push({ kind: 'text', text: input.slice(lastIndex, match.index) });
    }
    const g = match.groups ?? {};
    const raw = match[0];

    if (g.mrFrom !== undefined) {
      const lawCode = g.mrLaw?.trim() ?? ctxLawCode;
      if (lawCode && isAvailable(lawCode)) chunks.push({ kind: 'multi', text: raw, lawCode, articleNumbers: expandRange(g.mrFrom.trim(), g.mrTo!.trim()) });
      else chunks.push({ kind: 'text', text: raw });
    } else if (g.mlList !== undefined) {
      const lawCode = g.mlLaw?.trim() ?? ctxLawCode;
      if (lawCode && isAvailable(lawCode)) chunks.push({ kind: 'multi', text: raw, lawCode, articleNumbers: g.mlList.split(/\s*(?:,|y)\s*/).map((s) => s.trim()).filter(Boolean) });
      else chunks.push({ kind: 'text', text: raw });
    } else if (g.pailArt !== undefined) {
      chunks.push({ kind: 'art', text: raw, lawCode: g.pailLaw!.trim(), articleNumber: g.pailArt.trim(), paragraph: parseInt(g.pailInc!, 10), isSelf: false });
    } else if (g.paiArt !== undefined) {
      if (ctxLawCode) chunks.push({ kind: 'art', text: raw, lawCode: ctxLawCode, articleNumber: g.paiArt.trim(), paragraph: parseInt(g.paiInc!, 10), isSelf: false });
      else chunks.push({ kind: 'text', text: raw });
    } else if (g.paArt !== undefined) {
      const lawCode = g.paLaw!.trim(); const artNum = cleanArt(g.paArt);
      chunks.push({ kind: 'art', text: raw, lawCode, articleNumber: artNum, paragraph: null, isSelf: isSelf(lawCode, artNum, ctxLawCode, ctxArtNum) });
    } else if (g.adlnArt !== undefined) {
      // art. N de la Ley N° NNNNN  → artículo de otra ley (por número)
      const lawCode = `Ley ${g.adlnLey!.trim()}`; const artNum = cleanArt(g.adlnArt);
      chunks.push({ kind: 'art', text: raw, lawCode, articleNumber: artNum, paragraph: null, isSelf: isSelf(lawCode, artNum, ctxLawCode, ctxArtNum) });
    } else if (g.adnArt !== undefined) {
      // art. N de la <Nombre> → artículo de otra ley (por nombre)
      const code = resolveName(g.adnName!); const artNum = cleanArt(g.adnArt);
      if (code) chunks.push({ kind: 'art', text: raw, lawCode: code, articleNumber: artNum, paragraph: null, isSelf: isSelf(code, artNum, ctxLawCode, ctxArtNum) });
      else chunks.push({ kind: 'text', text: raw });
    } else if (g.prArt !== undefined) {
      const lawCode = g.prLaw!.trim(); const artNum = cleanArt(g.prArt);
      chunks.push({ kind: 'art', text: raw, lawCode, articleNumber: artNum, paragraph: null, isSelf: isSelf(lawCode, artNum, ctxLawCode, ctxArtNum) });
    } else if (g.laLey !== undefined) {
      const lawCode = `Ley ${g.laLey.trim()}`;
      chunks.push({ kind: 'art', text: raw, lawCode, articleNumber: g.laArt!.trim(), paragraph: null, isSelf: false });
    } else if (g.daDec !== undefined) {
      const lawCode = `Decreto ${g.daDec.trim()}`;
      chunks.push({ kind: 'art', text: raw, lawCode, articleNumber: g.daArt!.trim(), paragraph: null, isSelf: false });
    } else if (g.nlaName !== undefined) {
      const code = resolveName(g.nlaName) ?? g.nlaName.replace(/\s+/g, ' ').trim();
      const artNum = g.nlaArt!.split('-')[0].trim();
      chunks.push({ kind: 'art', text: raw, lawCode: code, articleNumber: artNum, paragraph: null, isSelf: isSelf(code, artNum, ctxLawCode, ctxArtNum) });
    } else if (g.nlName !== undefined) {
      const code = resolveName(g.nlName);
      if (code) chunks.push({ kind: 'law', text: raw, lawCode: code });
      else chunks.push({ kind: 'text', text: raw });
    } else if (g.klLey !== undefined) {
      chunks.push({ kind: 'law', text: raw, lawCode: `Ley ${g.klLey}` });
    } else if (g.kdDec !== undefined) {
      chunks.push({ kind: 'law', text: raw, lawCode: `Decreto ${g.kdDec}` });
    } else if (g.baArt !== undefined) {
      if (ctxLawCode) chunks.push({ kind: 'art', text: raw, lawCode: ctxLawCode, articleNumber: g.baArt.trim(), paragraph: null, isSelf: isSelf(ctxLawCode, g.baArt.trim(), ctxLawCode, ctxArtNum) });
      else chunks.push({ kind: 'text', text: raw });
    } else if (g.saArt !== undefined) {
      if (ctxLawCode) chunks.push({ kind: 'art', text: raw, lawCode: ctxLawCode, articleNumber: g.saArt.trim(), paragraph: null, isSelf: isSelf(ctxLawCode, g.saArt.trim(), ctxLawCode, ctxArtNum) });
      else chunks.push({ kind: 'text', text: raw });
    }

    lastIndex = match.index + raw.length;
  }

  if (lastIndex < input.length) chunks.push({ kind: 'text', text: input.slice(lastIndex) });
  return chunks;
}

// Clave normalizada de número de artículo para comparar refs contra los artículos
// reales de una norma ("14 bis" → "14bis", "1°" → "1", "245 BIS" → "245bis").
export function artNumKey(n: string): string {
  return n.toLowerCase().replace(/[°º]/g, '').replace(/\s+/g, '');
}

/**
 * Poda referencias "colgantes" a la PROPIA norma: convierte en texto plano las refs
 * de tipo artículo cuyo `lawCode` es la norma de contexto pero cuyo número NO existe
 * en ella. Cubre los falsos enlaces que producen 404 cuando una explicación cita un
 * artículo de OTRA ley sin nombrarla de forma reconocible ("el artículo 140 del
 * Código Penal") o cuando un número no es un artículo ("la línea es el 145"): el
 * parser, sin ley explícita, los engancha al artículo homónimo de la norma actual.
 *
 * Solo toca refs que apuntan a la norma de contexto (`ctxLawCode`); las refs a otras
 * leyes quedan intactas. No altera `parseRefChunks` (paridad con el parser del front).
 */
export function pruneDanglingSelfRefs(
  chunks: RefChunk[],
  ctxLawCode: string | undefined,
  validArtKeys: Set<string>,
): RefChunk[] {
  if (!ctxLawCode) return chunks;
  return chunks.map((c): RefChunk => {
    if (c.kind === 'art' && c.lawCode === ctxLawCode && !validArtKeys.has(artNumKey(c.articleNumber))) {
      return { kind: 'text', text: c.text };
    }
    if (c.kind === 'multi' && c.lawCode === ctxLawCode) {
      const keep = c.articleNumbers.filter((n) => validArtKeys.has(artNumKey(n)));
      if (keep.length === 0) return { kind: 'text', text: c.text };
      if (keep.length !== c.articleNumbers.length) return { ...c, articleNumbers: keep };
    }
    return c;
  });
}
