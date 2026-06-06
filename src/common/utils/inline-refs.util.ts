// ─────────────────────────────────────────────────────────────────────────────
//  Parser de referencias inline (port EXACTO del front InlineRefText.parseChunks).
//  Produce los "chunks" estructurales de un texto: qué tramos son referencias y a
//  qué ley/artículo apuntan. NO decide render (clickeable/derogada/glosario) — eso
//  sigue en el front con el registry en runtime. Pre-computar esto en el back saca
//  el regex más caro del cliente.
//
//  IMPORTANTE: debe producir EXACTAMENTE los mismos chunks que el front, o el
//  fallback diverge. Hay un test que compara ambos (test-inline-refs).
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

function escapeCode(code: string): string {
  return code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
}

export function buildLawCodesPattern(registryShortCodes: string[]): string {
  const specific = registryShortCodes.filter((c) => c && !GENERIC_CODE_PREFIX.test(c)).map(escapeCode);
  const all = [...new Set([...specific, ...EXTRA_CODES])];
  return all.length > 0 ? all.join('|') : FALLBACK_LAW_CODES;
}

export function buildCombined(lawCodesPattern: string): RegExp {
  const lcpFull = `${lawCodesPattern}|Disp\\.\\s+[\\w-]+|Ley\\s+[\\d.,]+`;
  const MULTI_RANGE = `\\(arts?\\.\\s+(\\d+[a-z]*)\\s*[-–/]\\s*(\\d+[a-z]*)(?:\\s+(${lcpFull}))?\\)`;
  const MULTI_LIST = `\\(arts?\\.\\s+(\\d+[a-z]*(?:(?:\\s*,\\s*|\\s+y\\s+)\\d+[a-z]*)+)(?:\\s+(${lcpFull}))?\\)`;
  const PAREN_ART_INC_LAW = `\\(art\\.\\s+(\\d+[a-z]*)\\s+inc\\.\\s+(\\d+)\\s+(${lcpFull})\\)`;
  const PAREN_ART_INC = `\\(art\\.\\s+(\\d+[a-z]*)\\s+inc\\.\\s+(\\d+)\\)`;
  const PAREN_ART = `\\(art\\.\\s+(\\d+\\s*(?:bis|ter|quater)?)\\s+(${lcpFull})\\)`;
  const PROSE_ART = `\\bart\\.\\s+(\\d+\\s*(?:bis|ter|quater)?)\\s+(${lawCodesPattern})\\b`;
  const LEY_ART = `\\bLey\\s+([\\d.,]+)\\s+arts?\\.\\s+(\\d+[a-z]*)\\b`;
  const KNOWN_LAW = `\\bLey\\s+(\\d+\\.?\\d*)\\b`;
  const NAMED_LAW_ART = `(Código\\s+Civil\\s+y\\s+Comercial(?:\\s+de\\s+la\\s+Nación)?|Código\\s+Penal|Código\\s+Aduanero|Código\\s+Procesal\\s+Penal|Constitución\\s+Nacional),\\s*[Aa]rts?\\.\\s+(\\d+[a-z]*(?:-\\d+[a-z]*)?)`;
  const negLookahead = `(?!\\s*(?:${lawCodesPattern}|Ley\\s))`;
  const BARE_ART = `\\barts?\\.\\s+(\\d+[a-z]*)${negLookahead}`;
  const SPELLED_ART = `\\bartículos?\\s+(\\d+[a-z]*)${negLookahead}`;
  const DECRETO_ART = `\\bDecreto\\s+(\\d+\\/\\d{4})\\s+arts?\\.\\s+(\\d+[a-z]*)\\b`;
  const KNOWN_DECRETO = `\\bDecreto\\s+(\\d+\\/\\d{4})\\b`;

  return new RegExp(
    `${MULTI_RANGE}|${MULTI_LIST}|${PAREN_ART_INC_LAW}|${PAREN_ART_INC}|${PAREN_ART}|${PROSE_ART}|${LEY_ART}|${KNOWN_LAW}|${NAMED_LAW_ART}|${BARE_ART}|${SPELLED_ART}|${DECRETO_ART}|${KNOWN_DECRETO}`,
    'gi',
  );
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

const LAW_NAME_TO_CODE: Record<string, string> = {
  'Código Penal': 'CP',
  'Constitución Nacional': 'CN',
  'Código Civil y Comercial': 'CCyCN',
  'Código Civil y Comercial de la Nación': 'CCyCN',
  'Código Aduanero': 'CA',
  'Código Procesal Penal': 'CPP',
};

/**
 * Parser estructural. `isAvailable(lawCode)` replica isLawAvailable del front (para
 * decidir si un rango/lista es referencia clickeable o texto). El glosario NO se
 * toca acá: lo sigue resolviendo el front sobre los chunks de tipo "text".
 */
export function parseRefChunks(
  input: string,
  combined: RegExp,
  ctxLawCode?: string,
  ctxArtNum?: string,
  isAvailable: (lawCode: string) => boolean = () => true,
): RefChunk[] {
  const chunks: RefChunk[] = [];
  const regex = new RegExp(combined.source, 'gi');
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      chunks.push({ kind: 'text', text: input.slice(lastIndex, match.index) });
    }

    if (match[1] !== undefined) {
      const from = match[1].trim();
      const to = match[2].trim();
      const lawCode = match[3]?.trim() ?? ctxLawCode;
      if (lawCode && isAvailable(lawCode)) {
        chunks.push({ kind: 'multi', text: match[0], lawCode, articleNumbers: expandRange(from, to) });
      } else {
        chunks.push({ kind: 'text', text: match[0] });
      }
    } else if (match[4] !== undefined) {
      const lawCode = match[5]?.trim() ?? ctxLawCode;
      if (lawCode && isAvailable(lawCode)) {
        const articleNumbers = match[4].split(/\s*(?:,|y)\s*/).map((s) => s.trim()).filter(Boolean);
        chunks.push({ kind: 'multi', text: match[0], lawCode, articleNumbers });
      } else {
        chunks.push({ kind: 'text', text: match[0] });
      }
    } else if (match[6] !== undefined) {
      const artNum = match[6].trim();
      const inciso = parseInt(match[7], 10);
      const lawCode = match[8].trim();
      chunks.push({ kind: 'art', text: match[0], lawCode, articleNumber: artNum, paragraph: inciso, isSelf: false });
    } else if (match[9] !== undefined) {
      const artNum = match[9].trim();
      const inciso = parseInt(match[10], 10);
      if (ctxLawCode) {
        chunks.push({ kind: 'art', text: match[0], lawCode: ctxLawCode, articleNumber: artNum, paragraph: inciso, isSelf: false });
      } else {
        chunks.push({ kind: 'text', text: match[0] });
      }
    } else if (match[11] !== undefined) {
      const lawCode = match[12].trim();
      const artNum = match[11].trim();
      chunks.push({ kind: 'art', text: match[0], lawCode, articleNumber: artNum, paragraph: null, isSelf: isSelf(lawCode, artNum, ctxLawCode, ctxArtNum) });
    } else if (match[13] !== undefined) {
      const lawCode = match[14].trim();
      const artNum = match[13].trim();
      chunks.push({ kind: 'art', text: match[0], lawCode, articleNumber: artNum, paragraph: null, isSelf: isSelf(lawCode, artNum, ctxLawCode, ctxArtNum) });
    } else if (match[15] !== undefined) {
      const lawCode = `Ley ${match[15].trim()}`;
      const artNum = match[16].trim();
      chunks.push({ kind: 'art', text: match[0], lawCode, articleNumber: artNum, paragraph: null, isSelf: false });
    } else if (match[17] !== undefined) {
      chunks.push({ kind: 'law', text: match[0], lawCode: `Ley ${match[17]}` });
    } else if (match[18] !== undefined) {
      const rawName = match[18].replace(/\s+/g, ' ').trim();
      const lawCode = LAW_NAME_TO_CODE[rawName] ?? rawName;
      const artNum = match[19].split('-')[0].trim();
      chunks.push({ kind: 'art', text: match[0], lawCode, articleNumber: artNum, paragraph: null, isSelf: isSelf(lawCode, artNum, ctxLawCode, ctxArtNum) });
    } else if (match[20] !== undefined) {
      const artNum = match[20].trim();
      if (ctxLawCode) {
        chunks.push({ kind: 'art', text: match[0], lawCode: ctxLawCode, articleNumber: artNum, paragraph: null, isSelf: isSelf(ctxLawCode, artNum, ctxLawCode, ctxArtNum) });
      } else {
        chunks.push({ kind: 'text', text: match[0] });
      }
    } else if (match[21] !== undefined) {
      const artNum = match[21].trim();
      if (ctxLawCode) {
        chunks.push({ kind: 'art', text: match[0], lawCode: ctxLawCode, articleNumber: artNum, paragraph: null, isSelf: isSelf(ctxLawCode, artNum, ctxLawCode, ctxArtNum) });
      } else {
        chunks.push({ kind: 'text', text: match[0] });
      }
    } else if (match[22] !== undefined) {
      const lawCode = `Decreto ${match[22].trim()}`;
      const artNum = match[23].trim();
      chunks.push({ kind: 'art', text: match[0], lawCode, articleNumber: artNum, paragraph: null, isSelf: false });
    } else if (match[24] !== undefined) {
      chunks.push({ kind: 'law', text: match[0], lawCode: `Decreto ${match[24]}` });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < input.length) {
    chunks.push({ kind: 'text', text: input.slice(lastIndex) });
  }

  return chunks;
}
