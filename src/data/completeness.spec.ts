/**
 * Completitud de las normas — "Definition of Done", validada contra la BD.
 *
 * CI FALLA si una norma queda incompleta. La deuda histórica está documentada en
 * completeness-backlog.ts (grandfathering): toda norma que NO esté en la deuda
 * —incluidas las nuevas— DEBE cumplir. Al recompletar una norma, borrarla del
 * backlog; si vuelve a estar incompleta sin estar en el backlog, este spec falla.
 *
 * Si no hay DATABASE_URL / la BD no responde, los checks se saltan (no fallan).
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { COMPLETENESS_BACKLOG } from './completeness-backlog';

if (!process.env.DATABASE_URL) {
  const envPath = path.resolve(__dirname, '../../.env');
  if (fs.existsSync(envPath)) {
    const line = fs.readFileSync(envPath, 'utf8').split(/\r?\n/).find((l) => l.startsWith('DATABASE_URL='));
    if (line) process.env.DATABASE_URL = line.slice('DATABASE_URL='.length).replace(/^["']|["']$/g, '').trim();
  }
}

jest.setTimeout(30_000);
const prisma = new PrismaClient();
const INDICE_MIN_ARTS = 15;

interface NormRow { id: string; article_count: number; affected_subjects: string[] }
interface MetaRow { obligations: string[]; rights: string[]; faq: unknown }

let dbOk = false;
let norms: NormRow[] = [];
let metaByNorm = new Map<string, MetaRow>();
let conIndice = new Set<string>();
let sinTitulo = new Set<string>();
let sinExplicacion = new Set<string>();

beforeAll(async () => {
  try {
    norms = await prisma.norms.findMany({ select: { id: true, article_count: true, affected_subjects: true } });
    const meta = await prisma.norm_metadata.findMany({ select: { norm_id: true, obligations: true, rights: true, faq: true } });
    metaByNorm = new Map(meta.map((m) => [m.norm_id, { obligations: m.obligations, rights: m.rights, faq: m.faq }]));
    conIndice = new Set((await prisma.norm_sections.findMany({ select: { norm_id: true } })).map((s) => s.norm_id));
    const arts = await prisma.articles.findMany({ select: { norm_id: true, title: true, plain_language_explanation: true } });
    for (const a of arts) {
      if (!a.title || a.title.trim() === '') sinTitulo.add(a.norm_id);
      if (!a.plain_language_explanation || a.plain_language_explanation.trim() === '') sinExplicacion.add(a.norm_id);
    }
    dbOk = norms.length > 0;
    if (!dbOk) console.warn('⚠ BD vacía o sin conexión — se saltan los checks de completitud.');
  } catch {
    console.warn('⚠ No se pudo conectar a la BD — se saltan los checks de completitud.');
    dbOk = false;
  }
});

afterAll(async () => { await prisma.$disconnect(); });

const arrOk = (a: unknown) => Array.isArray(a) && a.length > 0;

describe('Completitud — Definition of Done (CI bloquea normas a medias)', () => {
  // En CI la BD es obligatoria: si no se pudo leer (falta el secret DATABASE_URL),
  // los checks se saltarían y el CI pasaría en falso. Acá lo hacemos fallar.
  test('la BD es accesible (obligatorio en CI)', () => {
    if (process.env.CI && !dbOk) {
      throw new Error('No se pudo leer la BD en CI: revisar el secret DATABASE_URL. Los checks de completitud no corrieron.');
    }
  });

  // ── Tier 1: obligatorio para TODA norma (sin excepciones) ──
  test('toda norma tiene metadata', () => {
    if (!dbOk) return;
    expect(norms.filter((n) => !metaByNorm.has(n.id)).map((n) => n.id)).toEqual([]);
  });

  test('toda norma tiene FAQ', () => {
    if (!dbOk) return;
    expect(norms.filter((n) => !arrOk(metaByNorm.get(n.id)?.faq)).map((n) => n.id)).toEqual([]);
  });

  test('toda norma tiene "a quién alcanza" (affected_subjects)', () => {
    if (!dbOk) return;
    expect(norms.filter((n) => !arrOk(n.affected_subjects)).map((n) => n.id)).toEqual([]);
  });

  test('toda norma tiene obligaciones o derechos', () => {
    if (!dbOk) return;
    expect(
      norms.filter((n) => {
        const m = metaByNorm.get(n.id);
        return !arrOk(m?.obligations) && !arrOk(m?.rights) && !COMPLETENESS_BACKLOG.sinObligDerechos.has(n.id);
      }).map((n) => n.id),
    ).toEqual([]);
  });

  // ── Tier 2: obligatorio salvo deuda documentada en completeness-backlog.ts ──
  test('todo artículo tiene título (epígrafe) — salvo deuda documentada', () => {
    if (!dbOk) return;
    const offenders = [...sinTitulo].filter((id) => !COMPLETENESS_BACKLOG.sinTitulo.has(id));
    expect(offenders).toEqual([]);
  });

  test('todo artículo tiene explicación en lenguaje claro — salvo deuda documentada', () => {
    if (!dbOk) return;
    const offenders = [...sinExplicacion].filter((id) => !COMPLETENESS_BACKLOG.sinExplicacion.has(id));
    expect(offenders).toEqual([]);
  });

  test(`toda norma grande (>= ${INDICE_MIN_ARTS} arts) tiene índice — salvo deuda documentada`, () => {
    if (!dbOk) return;
    const offenders = norms
      .filter((n) => n.article_count >= INDICE_MIN_ARTS && !conIndice.has(n.id) && !COMPLETENESS_BACKLOG.sinIndice.has(n.id))
      .map((n) => n.id);
    expect(offenders).toEqual([]);
  });
});
