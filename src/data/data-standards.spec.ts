/**
 * Estándar de datos — guardrail de CI contra la BD. Bloquea las clases de error
 * que descubrimos a ojo (números con punto, URLs con número repetido o "forma-id",
 * artículos con número duplicado o mal formateado) para que NO se repitan nunca:
 * una norma nueva mal cargada rompe el build.
 *
 * Grandfathering: lo preexistente conocido (constituciones con bug de carga) va a
 * un backlog y NO rompe el CI; al recargarlas limpias se quita de acá y el spec
 * empieza a exigirlas. El objetivo es que estos sets lleguen a cero.
 *
 * Si no hay DATABASE_URL / la BD no responde, los checks se saltan (no fallan).
 */
import { PrismaClient } from '@prisma/client';
import { computeFrontendPath } from '../common/utils/law-url.util';
import type { Law } from '../common/types/law.types';
import { setupTestDatabase } from './test-db';

// Por defecto: la base LOCAL. Para correr contra producción: TEST_AGAINST_PROD=1
setupTestDatabase();

jest.setTimeout(30_000);
const prisma = new PrismaClient();

// ── Backlog de grandfathering (bug de carga preexistente; se vacía al recargar) ──
// 2026-06-28: 7 constituciones con numeración de artículos DUPLICADA (mismo número
// en >1 artículo, p. ej. la-rioja tiene 3 "141°" que son artículos distintos).
const DUP_ARTNUM_BACKLOG = new Set<string>([
  'const-san-luis', 'const-salta', 'const-la-rioja', 'const-misiones',
  'const-santiago-del-estero', 'const-tierra-del-fuego', 'const-san-juan',
]);
// 2026-06-28: 4 constituciones con artículos en formato "Nº" (grado). Se normaliza
// al recargarlas (Nº → N) con resolver tolerante para las URLs viejas.
const ARTNUM_FORMAT_BACKLOG = new Set<string>([
  'const-chubut', 'const-corrientes', 'const-la-rioja', 'const-san-juan',
]);
// Normas cuyo `number` no es puramente numérico de forma legítima/heredada.
const NUMBER_ALLOWLIST = new Set<string>(['carta-onu', 'disp-dnpdp-7-2005', 'acuerdo-residencia-argentina-brasil']);

interface NormRow { id: string; number: string; title: string }
interface ArtRow { norm_id: string; number: string }

let dbOk = false;
let norms: NormRow[] = [];
// R3 y R4 no necesitan los ~49.500 artículos: necesitan los que INFRINGEN. Bajarlos
// todos costaba 633 kB de egreso de Supabase por corrida de CI (ver el mismo cambio,
// más grande, en completeness.spec.ts).
//
// R4 filtra en SQL a propósito con un patrón MÁS AMPLIO que el de JS (acepta
// minúsculas donde JS pide mayúscula, y cualquier sufijo alfabético donde JS lista
// seis): así el SQL trae un superconjunto y quien decide qué es infracción sigue
// siendo el mismo regex de abajo. Si el prefiltro se equivoca, se equivoca de más.
let dupsPorNorma: ArtRow[] = [];
let formatoSospechoso: ArtRow[] = [];

beforeAll(async () => {
  try {
    norms = await prisma.norms.findMany({ select: { id: true, number: true, title: true } });
    dupsPorNorma = await prisma.$queryRawUnsafe<ArtRow[]>(
      `SELECT norm_id, min(number) AS number
       FROM articles GROUP BY norm_id, btrim(number) HAVING count(*) > 1`,
    );
    formatoSospechoso = await prisma.$queryRawUnsafe<ArtRow[]>(
      `SELECT DISTINCT norm_id, number FROM articles
       WHERE number ~ '[º°]' OR number ~ '^[0-9]+ +[A-Za-z]' OR number ~* '^[0-9]+[a-z]'`,
    );
    dbOk = norms.length > 0;
    if (!dbOk) console.warn('⚠ BD vacía o sin conexión — se saltan los checks de estándar de datos.');
  } catch {
    console.warn('⚠ No se pudo conectar a la BD — se saltan los checks de estándar de datos.');
    dbOk = false;
  }
});

afterAll(async () => { await prisma.$disconnect(); });

const asLaw = (n: NormRow): Law => ({ id: n.id, number: n.number, title: n.title } as unknown as Law);

describe('Estándar de datos — números de norma', () => {
  // R1: number = solo dígitos, o NNN/AAAA (decretos/RG/DNU), o allowlist.
  test('R1 · norms.number sin punto y en formato canónico', () => {
    if (!dbOk) return;
    const bad = norms
      .filter((n) => !NUMBER_ALLOWLIST.has(n.id))
      .filter((n) => !/^\d+$/.test(n.number) && !/^\d+\/\d{4}$/.test(n.number))
      .map((n) => `${n.id}="${n.number}"`);
    expect(bad).toEqual([]);
  });
});

describe('Estándar de datos — URLs (frontendPath)', () => {
  // R2a: el número no se repite en la URL ("/leyes/17801-17801-…").
  test('R2 · sin número repetido en la URL', () => {
    if (!dbOk) return;
    const bad = norms
      .map((n) => computeFrontendPath(asLaw(n)))
      .filter((p) => /^\/leyes\/(\d+)-\1(?:-|$)/.test(p));
    expect(bad).toEqual([]);
  });

  // R2b: las leyes numeradas no quedan en "forma-id" (/leyes/ley-NNNNN).
  test('R2 · leyes numeradas no usan forma-id /leyes/ley-…', () => {
    if (!dbOk) return;
    const bad = norms
      .filter((n) => /^ley-\d+$/.test(n.id))
      .filter((n) => computeFrontendPath(asLaw(n)).startsWith('/leyes/ley-'))
      .map((n) => n.id);
    expect(bad).toEqual([]);
  });
});

describe('Estándar de datos — numeración de artículos', () => {
  // R3: ningún número de artículo se repite dentro de una misma norma.
  test('R3 · sin articles.number duplicado por norma', () => {
    if (!dbOk) return;
    const dups = dupsPorNorma
      .filter((a) => !DUP_ARTNUM_BACKLOG.has(a.norm_id))
      .map((a) => `${a.norm_id}="${a.number}"`);
    expect([...new Set(dups)]).toEqual([]);
  });

  // R4: sin las malformaciones que ya corregimos — grado "º", casing del sufijo
  // ("11 Bis") y sufijo pegado ("175bis"). Las constituciones con "º" están en
  // backlog hasta su recarga.
  test('R4 · articles.number sin grado/casing/sufijo-pegado', () => {
    if (!dbOk) return;
    const bad = formatoSospechoso
      .filter((a) => !ARTNUM_FORMAT_BACKLOG.has(a.norm_id))
      .filter((a) =>
        /[º°]/.test(a.number) ||
        /^\d+ +[A-Z]/.test(a.number) ||
        /^\d+(bis|ter|quáter|quater|quinquies|sexies)$/i.test(a.number),
      )
      .map((a) => `${a.norm_id}="${a.number}"`);
    expect([...new Set(bad)]).toEqual([]);
  });
});
