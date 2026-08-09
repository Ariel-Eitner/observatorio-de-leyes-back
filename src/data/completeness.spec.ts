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
import { COMPLETENESS_BACKLOG } from './completeness-backlog';
import { setupTestDatabase } from './test-db';

// Por defecto: la base LOCAL. Para correr contra producción: TEST_AGAINST_PROD=1
setupTestDatabase();

jest.setTimeout(30_000);
const prisma = new PrismaClient();
const INDICE_MIN_ARTS = 15;

// TODO lo que sigue se resuelve con agregaciones, no bajando filas.
//
// Este spec corre en CI contra la BD de PRODUCCIÓN (secret DATABASE_URL), y lo
// hacía leyendo los ~49.500 artículos con `title` y `plain_language_explanation`
// enteros —12 MB de egreso de Supabase por corrida, en cada push y cada PR— para
// después quedarse solo con "¿alguno está vacío?". Preguntado en SQL son unos
// pocos kB: viajan los ids ofensores, no el texto legal. El rigor es el mismo.
//
// El `btrim` con la lista de espacios replica el `.trim() === ''` de JS (incluido
// el NBSP, que aparece en textos pegados de PDFs).
const VACIO = String.raw`btrim(coalesce(%C%, ''), E' \t\n\r\f\v\u00a0') = ''`;

interface NormRow { id: string; article_count: number; tiene_sujetos: boolean }
interface MetaRow { obligations: boolean; rights: boolean; faq: boolean }

let dbOk = false;
let norms: NormRow[] = [];
let metaByNorm = new Map<string, MetaRow>();
let conIndice = new Set<string>();
let sinTitulo = new Set<string>();
let sinExplicacion = new Set<string>();

const idsDe = (rows: { norm_id: string }[]) => new Set(rows.map((r) => r.norm_id));

beforeAll(async () => {
  try {
    norms = await prisma.$queryRawUnsafe<NormRow[]>(
      `SELECT id, article_count, coalesce(array_length(affected_subjects, 1), 0) > 0 AS tiene_sujetos FROM norms`,
    );
    const meta = await prisma.$queryRawUnsafe<({ norm_id: string } & MetaRow)[]>(
      `SELECT norm_id,
              coalesce(array_length(obligations, 1), 0) > 0 AS obligations,
              coalesce(array_length(rights, 1), 0) > 0 AS rights,
              (jsonb_typeof(faq::jsonb) = 'array' AND jsonb_array_length(faq::jsonb) > 0) AS faq
       FROM norm_metadata`,
    );
    metaByNorm = new Map(meta.map((m) => [m.norm_id, { obligations: m.obligations, rights: m.rights, faq: m.faq }]));
    conIndice = idsDe(await prisma.$queryRawUnsafe<{ norm_id: string }[]>(
      `SELECT DISTINCT norm_id FROM norm_sections`,
    ));
    sinTitulo = idsDe(await prisma.$queryRawUnsafe<{ norm_id: string }[]>(
      `SELECT DISTINCT norm_id FROM articles WHERE ${VACIO.replace('%C%', 'title')}`,
    ));
    sinExplicacion = idsDe(await prisma.$queryRawUnsafe<{ norm_id: string }[]>(
      `SELECT DISTINCT norm_id FROM articles WHERE ${VACIO.replace('%C%', 'plain_language_explanation')}`,
    ));
    dbOk = norms.length > 0;
    if (!dbOk) console.warn('⚠ BD vacía o sin conexión — se saltan los checks de completitud.');
  } catch {
    console.warn('⚠ No se pudo conectar a la BD — se saltan los checks de completitud.');
    dbOk = false;
  }
});

afterAll(async () => { await prisma.$disconnect(); });

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
    expect(norms.filter((n) => !metaByNorm.get(n.id)?.faq).map((n) => n.id)).toEqual([]);
  });

  test('toda norma tiene "a quién alcanza" (affected_subjects)', () => {
    if (!dbOk) return;
    expect(norms.filter((n) => !n.tiene_sujetos).map((n) => n.id)).toEqual([]);
  });

  test('toda norma tiene obligaciones o derechos', () => {
    if (!dbOk) return;
    expect(
      norms.filter((n) => {
        const m = metaByNorm.get(n.id);
        return !m?.obligations && !m?.rights && !COMPLETENESS_BACKLOG.sinObligDerechos.has(n.id);
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
