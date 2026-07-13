/**
 * Integridad de las normas y del grafo legal, validada contra la BD (todas las
 * normas migraron de código a la base). Reemplaza a laws-integrity.spec y
 * legal-graph-integrity.spec, que validaban los data files (ya borrados).
 *
 * Si no hay DATABASE_URL / la BD no responde, los checks se saltan (no fallan),
 * para no romper entornos sin conexión.
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { RelationType } from '../common/types/law.types';

// jest no carga el .env: lo leemos a mano si DATABASE_URL no está en el entorno.
if (!process.env.DATABASE_URL) {
  const envPath = path.resolve(__dirname, '../../.env');
  if (fs.existsSync(envPath)) {
    const line = fs.readFileSync(envPath, 'utf8').split(/\r?\n/).find((l) => l.startsWith('DATABASE_URL='));
    if (line) process.env.DATABASE_URL = line.slice('DATABASE_URL='.length).replace(/^["']|["']$/g, '').trim();
  }
}

jest.setTimeout(30_000);
const prisma = new PrismaClient();

interface NormRow { id: string; status: string; norm_type: string; title: string; jurisdiction: string }
interface RelRow { source_id: string; target_id: string; type: string; target_label: string | null }

let dbOk = false;
let norms: NormRow[] = [];
let rels: RelRow[] = [];
let byId = new Map<string, NormRow>();

beforeAll(async () => {
  try {
    norms = await prisma.norms.findMany({ select: { id: true, status: true, norm_type: true, title: true, jurisdiction: true } });
    rels = await prisma.norm_relations.findMany({ select: { source_id: true, target_id: true, type: true, target_label: true } });
    byId = new Map(norms.map((n) => [n.id, n]));
    dbOk = norms.length > 0;
    if (!dbOk) console.warn('⚠ BD vacía o sin conexión — se saltan los checks de integridad.');
  } catch {
    console.warn('⚠ No se pudo conectar a la BD — se saltan los checks de integridad.');
    dbOk = false;
  }
});

afterAll(async () => { await prisma.$disconnect(); });

const VALID_TYPES = new Set<string>(Object.values(RelationType));

describe('BD — integridad del grafo (norm_relations)', () => {
  test('todo target_id existe (sin aristas colgadas)', () => {
    if (!dbOk) return;
    const dangling = rels.filter((r) => !byId.has(r.target_id)).map((r) => `${r.source_id} --${r.type}--> ${r.target_id}`);
    expect(dangling).toEqual([]);
  });

  test('no hay auto-relaciones', () => {
    if (!dbOk) return;
    expect(rels.filter((r) => r.source_id === r.target_id).map((r) => r.source_id)).toEqual([]);
  });

  test('todos los tipos de relación son válidos', () => {
    if (!dbOk) return;
    expect(rels.filter((r) => !VALID_TYPES.has(r.type)).map((r) => `${r.source_id}:${r.type}`)).toEqual([]);
  });

  test('target_label no está vacío', () => {
    if (!dbOk) return;
    expect(rels.filter((r) => !r.target_label?.trim()).map((r) => `${r.source_id}->${r.target_id}`)).toEqual([]);
  });

  test('DEROGA apunta a una norma con estado DEROGADA', () => {
    if (!dbOk) return;
    const bad = rels.filter((r) => r.type === 'DEROGA')
      .filter((r) => { const t = byId.get(r.target_id); return t && t.status !== 'DEROGADA'; })
      .map((r) => `${r.source_id} DEROGA ${r.target_id} (${byId.get(r.target_id)?.status})`);
    expect(bad).toEqual([]);
  });

  // Coherencia del circuito de veto: si un decreto VETA una norma, esa norma NUNCA fue ley.
  // Marcarla VIGENTE por error la mostraría como derecho aplicable — es el peor error posible acá.
  test('VETA apunta a una norma con estado VETADA', () => {
    if (!dbOk) return;
    const bad = rels.filter((r) => r.type === 'VETA')
      .filter((r) => { const t = byId.get(r.target_id); return t && t.status !== 'VETADA'; })
      .map((r) => `${r.source_id} VETA ${r.target_id} (${byId.get(r.target_id)?.status})`);
    expect(bad).toEqual([]);
  });

  // …y a la inversa: una norma VETADA tiene que tener el decreto de veto que la explica.
  // Una "ley" vetada suelta, sin su veto, es una ley fantasma.
  test('toda norma VETADA es destino de una relación VETA', () => {
    if (!dbOk) return;
    const vetadas = new Set(rels.filter((r) => r.type === 'VETA').map((r) => r.target_id));
    const bad = norms.filter((n) => n.status === 'VETADA' && !vetadas.has(n.id)).map((n) => n.id);
    expect(bad).toEqual([]);
  });

  test('REGLAMENTA no apunta a un reglamento (decreto/resolución/disposición)', () => {
    if (!dbOk) return;
    const RANGO_MENOR = new Set(['DECRETO', 'RESOLUCION', 'DISPOSICION']);
    const bad = rels.filter((r) => r.type === 'REGLAMENTA')
      .filter((r) => { const t = byId.get(r.target_id); return t && RANGO_MENOR.has(t.norm_type); })
      .map((r) => `${r.source_id} REGLAMENTA ${r.target_id}`);
    expect(bad).toEqual([]);
  });
});

describe('BD — integridad de normas', () => {
  test('todas las normas tienen title y status/norm_type/jurisdiction válidos', () => {
    if (!dbOk) return;
    const STATUS = ['VIGENTE', 'DEROGADA', 'PARCIALMENTE_VIGENTE', 'VETADA'];
    const TYPES = ['CONSTITUCION', 'LEY', 'DECRETO', 'RESOLUCION', 'DISPOSICION', 'ORDENANZA', 'DECRETO_LEY', 'CIRCULAR', 'TRATADO'];
    const JUR = ['NACIONAL', 'PROVINCIAL', 'MUNICIPAL', 'INTERNACIONAL'];
    const bad = norms.filter((n) =>
      !n.title?.trim() || !STATUS.includes(n.status) || !TYPES.includes(n.norm_type) || !JUR.includes(n.jurisdiction),
    ).map((n) => n.id);
    expect(bad).toEqual([]);
  });

  test('ids en kebab-case', () => {
    if (!dbOk) return;
    expect(norms.filter((n) => !/^[a-z0-9-]+$/.test(n.id)).map((n) => n.id)).toEqual([]);
  });
});
