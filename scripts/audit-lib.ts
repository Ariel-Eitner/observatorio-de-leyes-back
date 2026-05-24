/**
 * Librería compartida para todos los scripts de auditoría.
 * No ejecutar directamente — importar desde audit*.ts
 */

import * as fs   from 'fs';
import * as path from 'path';
import { ALL_LAWS, NORMAS_CLAVE } from '../src/data/index';
import type { Law } from '../src/common/types/law.types';

// ─── Re-export data ───────────────────────────────────────────────────────────

export { ALL_LAWS, NORMAS_CLAVE };
export type { Law };

// ─── Colors ───────────────────────────────────────────────────────────────────

export const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  red:    '\x1b[31m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
};

// ─── Render helpers ───────────────────────────────────────────────────────────

export function col(pct: number): string {
  return pct >= 0.85 ? C.green : pct >= 0.5 ? C.yellow : C.red;
}

export function bar(covered: number, total: number, width = 20): string {
  if (total === 0) return `[${C.dim}${'─'.repeat(width)}${C.reset}] N/A`;
  const pct    = Math.min(covered / total, 1);
  const filled = Math.round(pct * width);
  const c      = col(pct);
  return `${c}[${'█'.repeat(filled)}${'░'.repeat(width - filled)}]${C.reset} ${covered}/${total} (${Math.round(pct * 100)}%)`;
}

export function miniBar(pct: number, width = 10): string {
  const clamped = Math.min(Math.max(pct, 0), 1);
  const filled  = Math.round(clamped * width);
  const c       = col(pct);
  return `${c}${'▓'.repeat(filled)}${'░'.repeat(width - filled)}${C.reset}`;
}

export function scoreGauge(score: number): string {
  const width  = 25;
  const filled = Math.round((score / 100) * width);
  const c      = col(score / 100);
  const medal  = score >= 90 ? '★' : score >= 70 ? '◆' : score >= 50 ? '◇' : '✗';
  return `${c}${medal} [${'█'.repeat(filled)}${'░'.repeat(width - filled)}] ${score}%${C.reset}`;
}

export function warn(ok: boolean): string {
  return ok ? `${C.green}✓${C.reset}` : `${C.yellow}○${C.reset}`;
}

export function padEnd(str: string, len: number): string {
  const visible = str.replace(/\x1b\[[0-9;]*m/g, '');
  return str + ' '.repeat(Math.max(0, len - visible.length));
}

export function section(title: string): void {
  console.log(`\n${C.bold}▸ ${title}${C.reset}\n`);
}

export function divider(width = 100): void {
  console.log('  ' + '─'.repeat(width));
}

export function header(title: string): void {
  console.log(`\n${C.bold}${'═'.repeat(80)}${C.reset}`);
  console.log(`${C.bold}  ${title}${C.reset}`);
  console.log(`${C.dim}  ${new Date().toLocaleString('es-AR')}${C.reset}`);
  console.log(`${C.bold}${'═'.repeat(80)}${C.reset}`);
}

export function footer(): void {
  console.log(`\n${C.bold}${'═'.repeat(80)}${C.reset}\n`);
}

// ─── Data helpers ─────────────────────────────────────────────────────────────

export function parseArticleNumber(raw: string): number | null {
  const m = raw.match(/^(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

export function toRanges(nums: number[]): string {
  if (nums.length === 0) return '—';
  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  const ranges: string[] = [];
  let start = sorted[0], end = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === end + 1) { end = sorted[i]; }
    else { ranges.push(start === end ? `${start}` : `${start}–${end}`); start = end = sorted[i]; }
  }
  ranges.push(start === end ? `${start}` : `${start}–${end}`);
  return ranges.join(', ');
}

// ─── Law loading ──────────────────────────────────────────────────────────────

export function loadLaws(): Law[] {
  const all    = [...NORMAS_CLAVE, ...ALL_LAWS];
  const seen   = new Map<string, Law>();
  for (const l of all) if (!seen.has(l.id)) seen.set(l.id, l);
  return [...seen.values()].sort((a, b) => a.id.localeCompare(b.id));
}

// ─── Types ────────────────────────────────────────────────────────────────────

export const DATA_DIR = path.join(__dirname, '../src/data');

export interface FileReport {
  id: string; isDirectory: boolean;
  hasMetadata: boolean; hasArticles: boolean; hasIndex: boolean;
}

export interface MetaFlags {
  summary: boolean; executiveSummary: boolean; objective: boolean;
  problemItSolves: boolean; practicalImpact: boolean; affectedSubjects: boolean;
  topics: boolean; keywords: boolean; relatedNorms: boolean; metadataObj: boolean;
}

export interface ArticleQuality {
  total: number; noTitle: number; noOriginalText: number; noExplanation: number;
}

export interface SegmentQuality {
  total: number; noText: number; noExplanation: number; noExample: number;
}

export interface LawReport {
  law: Law;
  declared: number; actual: number; coverage: number;
  missingNums: number[]; duplicates: string[];
  meta: MetaFlags; metaScore: number;
  artQ: ArticleQuality; segQ: SegmentQuality;
  hasSections: boolean; sectionCount: number; amendmentCount: number;
  healthScore: number;
}

export interface NormViolation {
  ruleId: string; desc: string; file: string; line: number; excerpt: string;
}

// ─── File structure check ─────────────────────────────────────────────────────

const SINGLE_FILE_PATTERN = /\.data\.ts$/;
const EXCLUDED_DIRS       = new Set(['constituciones-provinciales']);

export function checkFileStructure(): Map<string, FileReport> {
  const reports = new Map<string, FileReport>();
  for (const entry of fs.readdirSync(DATA_DIR)) {
    if (EXCLUDED_DIRS.has(entry)) continue;
    const full = path.join(DATA_DIR, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      reports.set(entry, {
        id: entry, isDirectory: true,
        hasIndex:    fs.existsSync(path.join(full, 'index.ts')),
        hasMetadata: fs.existsSync(path.join(full, 'metadata.ts')),
        hasArticles: fs.existsSync(path.join(full, 'articles.ts')) ||
                     fs.existsSync(path.join(full, 'sections'))    ||
                     fs.existsSync(path.join(full, 'sections.ts')),
      });
    } else if (SINGLE_FILE_PATTERN.test(entry)) {
      const id = entry.replace(/\.data\.ts$/, '');
      reports.set(id, { id, isDirectory: false, hasMetadata: true, hasArticles: true, hasIndex: true });
    }
  }
  return reports;
}

// ─── Law analysis ─────────────────────────────────────────────────────────────

export function analyzeLaw(law: Law): LawReport {
  const declared = law.articleCount;
  const actual   = law.articles.length;
  const coverage = declared > 0 ? Math.min(actual / declared, 1) : 1;

  const seenNums = new Map<string, number>();
  for (const a of law.articles) seenNums.set(a.number, (seenNums.get(a.number) ?? 0) + 1);
  const duplicates = [...seenNums.entries()].filter(([, c]) => c > 1).map(([n]) => n);

  const presentNums = new Set<number>();
  for (const a of law.articles) { const n = parseArticleNumber(a.number); if (n !== null) presentNums.add(n); }
  const missingNums: number[] = [];
  for (let i = 1; i <= declared; i++) if (!presentNums.has(i)) missingNums.push(i);

  const meta: MetaFlags = {
    summary:          !!law.summary?.trim(),
    executiveSummary: !!law.executiveSummary?.trim(),
    objective:        !!law.objective?.trim(),
    problemItSolves:  !!law.problemItSolves?.trim(),
    practicalImpact:  !!law.practicalImpact?.trim(),
    affectedSubjects: law.affectedSubjects.length > 0,
    topics:           law.topics.length > 0,
    keywords:         law.keywords.length > 0,
    relatedNorms:     law.relatedNorms.length > 0,
    metadataObj:      !!law.metadata,
  };
  const metaScore = Object.values(meta).filter(Boolean).length / Object.keys(meta).length;

  let artNoTitle = 0, artNoOriginal = 0, artNoExplanation = 0;
  let segTotal = 0, segNoText = 0, segNoExplanation = 0, segNoExample = 0;

  for (const a of law.articles) {
    if (!a.title)                    artNoTitle++;
    if (!a.text?.trim())              artNoOriginal++;
    if (!a.plainLanguageExplanation) artNoExplanation++;
    for (const seg of a.segments) {
      segTotal++;
      if (!seg.text?.trim())             segNoText++;
      if (!seg.plainExplanation?.trim()) segNoExplanation++;
      if (seg.practicalExample === null || seg.practicalExample === undefined) segNoExample++;
    }
  }

  const hasSections    = (law.sections?.length ?? 0) > 0;
  const sectionCount   = law.sections?.length ?? 0;
  const amendmentCount = law.amendments?.length ?? 0;

  const coverageScore = coverage;
  const segExplScore  = segTotal > 0 ? (segTotal - segNoExplanation) / segTotal : 1;
  const artTitleScore = actual > 0 ? (actual - artNoTitle) / actual : 1;
  const amendBonus    = amendmentCount > 0 ? 1 : 0;
  const health        = Math.round(coverageScore * 40 + metaScore * 25 + segExplScore * 20 + artTitleScore * 10 + amendBonus * 5);

  return {
    law, declared, actual, coverage, missingNums, duplicates,
    meta, metaScore,
    artQ: { total: actual, noTitle: artNoTitle, noOriginalText: artNoOriginal, noExplanation: artNoExplanation },
    segQ: { total: segTotal, noText: segNoText, noExplanation: segNoExplanation, noExample: segNoExample },
    hasSections, sectionCount, amendmentCount,
    healthScore: Math.min(health, 100),
  };
}

// ─── Normalization ────────────────────────────────────────────────────────────

export const NORM_RULE_ORDER = ['R01','R02','R03','R04','R05','R06','R07','R08','R09','R10'];

const NORM_SKIP_SYNTAX   = /^\s*(?:import |export (?:type |interface |const [A-Z_])|\/\/|\*|from ')/;
const NORM_SKIP_OFFICIAL = /\b(?:text)\s*:/;

export function normExcerpt(line: string, idx: number, len: number, pad = 35): string {
  const start = Math.max(0, idx - pad);
  const end   = Math.min(line.length, idx + len + pad);
  return (start > 0 ? '…' : '') + line.slice(start, end).trim() + (end < line.length ? '…' : '');
}

function normScan(
  line: string, re: RegExp, ruleId: string, desc: string,
  file: string, lineNum: number, out: NormViolation[],
  filter?: (m: RegExpExecArray) => boolean,
): void {
  const r = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
  let m: RegExpExecArray | null;
  while ((m = r.exec(line)) !== null) {
    if (filter && !filter(m)) continue;
    out.push({ ruleId, desc, file, line: lineNum, excerpt: normExcerpt(line, m.index, m[0].length) });
  }
}

function checkNormLine(file: string, lineNum: number, line: string, out: NormViolation[]): void {
  normScan(line, /(?<![-a-záéíóúüñ])ley\s+\d/gi,
    'R01', '"ley" con capitalización incorrecta (debe ser "Ley")',
    file, lineNum, out, (m) => !/^Ley\s/.test(m[0]));

  {
    const re = /\bLey\s+([\d.,]+)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(line)) !== null) {
      // strip trailing sentence punctuation (. o , al final de oración)
      const num = m[1].replace(/[.,]+$/, '');
      if (num.includes(','))
        out.push({ ruleId: 'R02', desc: `Número usa coma: "Ley ${num}" (usar punto)`, file, line: lineNum, excerpt: normExcerpt(line, m.index, m[0].length) });
      else if (!/^\d{1,3}(\.\d{3})*$/.test(num))
        out.push({ ruleId: 'R02', desc: `Número mal formateado: "Ley ${num}" (correcto: Ley 1, Ley 25.326)`, file, line: lineNum, excerpt: normExcerpt(line, m.index, m[0].length) });
    }
  }

  normScan(line, /\bArt\.\s+\d/g,    'R03', '"Art." mayúscula (debe ser "art.")',                   file, lineNum, out);
  normScan(line, /\barts?\s+\d/g,    'R04', '"art"/"arts" sin punto',                               file, lineNum, out);
  normScan(line, /\barts?\.\d/g,     'R05', '"art."/"arts." sin espacio tras el punto',             file, lineNum, out);
  normScan(line, /\barts?\.\s+\d+[a-z]?\s+y\s+\d+[a-z]?\s+y\s+\d/gi,
    'R06', 'Lista usa "y" como separador (usar comas)',                                              file, lineNum, out);
  normScan(line, /\barts?\.\s+\d+\s*\/\s*\d/g,
    'R07', 'Rango con "/" (usar guion: arts. 12-15)',                                                file, lineNum, out);
  normScan(line, /\barts?\.\s+\d+\s+(?:al|a)\s+\d/gi,
    'R08', 'Rango con "al"/"a" (usar guion: arts. 12-15)',                                          file, lineNum, out);
  normScan(line, /\bartículos?\s+\d|\barticulos?\s+\d/gi,
    'R09', '"artículo/artículos" completo seguido de número (usar "art."/"arts.")',                  file, lineNum, out);
}

// R10 — incisos inline sin separar: busca a) ... b) ... en originalText/currentText
// Solo reporta una vez por línea (no por cada inciso). Excerpt mínimo: cuántos incisos y cuáles.
const INLINE_INCISE = /\b([a-h])\)\s/g;

function checkInlineIncises(file: string, lineNum: number, line: string, out: NormViolation[]): void {
  const matches = [...line.matchAll(INLINE_INCISE)].map((m) => `${m[1]})`);
  // Necesita al menos a) y b) consecutivos para ser un inciso real
  if (matches.length >= 2 && matches[0] === 'a)') {
    const preview = matches.slice(0, 5).join(' ') + (matches.length > 5 ? ' …' : '');
    out.push({
      ruleId: 'R10',
      desc:   `Incisos inline sin separar (${matches.length} encontrados: ${preview})`,
      file,
      line:   lineNum,
      excerpt: '',  // no mostramos el texto del artículo, solo el archivo y línea
    });
  }
}

export function scanFileNorm(filePath: string, out: NormViolation[]): void {
  const rel   = path.relative(path.resolve(__dirname, '..'), filePath);
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  lines.forEach((line, i) => {
    const lineNum = i + 1;
    if (NORM_SKIP_SYNTAX.test(line)) return;
    // R01–R09: solo en líneas que no sean texto oficial verbatim
    if (!NORM_SKIP_OFFICIAL.test(line)) checkNormLine(rel, lineNum, line, out);
    // R10: solo en líneas de texto oficial
    if (/\btext\s*:/.test(line)) checkInlineIncises(rel, lineNum, line, out);
  });
}

export function countAllTsFiles(dir: string): number {
  let n = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) n += countAllTsFiles(path.join(dir, entry.name));
    else if (entry.name.endsWith('.ts')) n++;
  }
  return n;
}

export function walkDirNorm(dir: string, out: NormViolation[], onFile?: (name: string) => void): number {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += walkDirNorm(full, out, onFile);
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      scanFileNorm(full, out);
      onFile?.(entry.name);
      count++;
    }
  }
  return count;
}

export function normProgressBar(current: number, total: number, width = 28): string {
  const pct    = total > 0 ? current / total : 0;
  const filled = Math.round(pct * width);
  return `${'█'.repeat(filled)}${'░'.repeat(width - filled)}`;
}
