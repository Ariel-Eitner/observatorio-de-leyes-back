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
import * as fs from 'fs';
import * as path from 'path';
import { computeFrontendPath } from '../common/utils/law-url.util';
import type { Law } from '../common/types/law.types';

if (!process.env.DATABASE_URL) {
  const envPath = path.resolve(__dirname, '../../.env');
  if (fs.existsSync(envPath)) {
    const line = fs.readFileSync(envPath, 'utf8').split(/\r?\n/).find((l) => l.startsWith('DATABASE_URL='));
    if (line) process.env.DATABASE_URL = line.slice('DATABASE_URL='.length).replace(/^["']|["']$/g, '').trim();
  }
}

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
const NUMBER_ALLOWLIST = new Set<string>(['carta-onu', 'disp-dnpdp-7-2005']);

interface NormRow { id: string; number: string; title: string }
interface ArtRow { norm_id: string; number: string }

let dbOk = false;
let norms: NormRow[] = [];
let arts: ArtRow[] = [];

beforeAll(async () => {
  try {
    norms = await prisma.norms.findMany({ select: { id: true, number: true, title: true } });
    arts = await prisma.articles.findMany({ select: { norm_id: true, number: true } });
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
    const seen = new Map<string, Set<string>>();
    const dups: string[] = [];
    for (const a of arts) {
      if (DUP_ARTNUM_BACKLOG.has(a.norm_id)) continue;
      let set = seen.get(a.norm_id);
      if (!set) { set = new Set(); seen.set(a.norm_id, set); }
      const key = a.number.trim();
      if (set.has(key)) dups.push(`${a.norm_id}="${a.number}"`);
      else set.add(key);
    }
    expect([...new Set(dups)]).toEqual([]);
  });

  // R4: sin las malformaciones que ya corregimos — grado "º", casing del sufijo
  // ("11 Bis") y sufijo pegado ("175bis"). Las constituciones con "º" están en
  // backlog hasta su recarga.
  test('R4 · articles.number sin grado/casing/sufijo-pegado', () => {
    if (!dbOk) return;
    const bad = arts
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
