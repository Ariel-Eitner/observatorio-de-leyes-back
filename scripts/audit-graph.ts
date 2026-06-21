/**
 * audit:graph — reporte del grafo legal LEÍDO DESDE LA BD (Prisma).
 *
 * Las normas migraron de código a la base; la versión vieja leía los data files
 * (ya borrados) y reportaba 0. Esto cruza norm_relations con norms para encontrar
 * nodos aislados, aristas colgadas, DEROGA inconsistentes y las más referenciadas.
 *
 * No falla (es un reporte). La validación pass/fail vive en
 * src/data/db-integrity.spec.ts.
 */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

// ts-node no carga el .env: lo leemos a mano si DATABASE_URL no está en el entorno.
if (!process.env.DATABASE_URL) {
  const envPath = path.resolve(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const l = fs
      .readFileSync(envPath, 'utf8')
      .split(/\r?\n/)
      .find((x) => x.startsWith('DATABASE_URL='));
    if (l) process.env.DATABASE_URL = l.slice('DATABASE_URL='.length).replace(/^["']|["']$/g, '').trim();
  }
}

const prisma = new PrismaClient();
const line = (s = '') => console.log(s);
const h = (s: string) => {
  line();
  line(`▸ ${s}`);
  line('─'.repeat(78));
};

async function main() {
  const norms = await prisma.norms.findMany({ select: { id: true, status: true, norm_type: true, title: true } });
  const rels = await prisma.norm_relations.findMany({
    select: { source_id: true, target_id: true, type: true, target_label: true },
  });
  const byId = new Map(norms.map((n) => [n.id, n]));

  const deg = new Map<string, number>();
  const inDeg = new Map<string, number>();
  for (const n of norms) {
    deg.set(n.id, 0);
    inDeg.set(n.id, 0);
  }
  for (const r of rels) {
    deg.set(r.source_id, (deg.get(r.source_id) ?? 0) + 1);
    deg.set(r.target_id, (deg.get(r.target_id) ?? 0) + 1);
    inDeg.set(r.target_id, (inDeg.get(r.target_id) ?? 0) + 1);
  }

  line('════════════════════════════════════════════════════════════════════');
  line('  AUDITORÍA DEL GRAFO LEGAL — desde la BD (norm_relations)');
  line('════════════════════════════════════════════════════════════════════');

  h('COBERTURA');
  const conArista = norms.filter((n) => (deg.get(n.id) ?? 0) > 0).length;
  line(`  Normas totales       : ${norms.length}`);
  line(`  Relaciones (aristas) : ${rels.length}`);
  line(`  Normas con ≥1 arista : ${conArista}  (${Math.round((conArista / Math.max(norms.length, 1)) * 100)}%)`);

  h('NODOS AISLADOS (sin ninguna arista — flotan en el mapa)');
  const isolated = norms.filter((n) => (deg.get(n.id) ?? 0) === 0);
  if (!isolated.length) line('  ✓ Ninguno — todas las normas tienen al menos una arista.');
  else for (const n of isolated) line(`  ✗ ${n.id.padEnd(36)} [${n.status}]`);

  h('ARISTAS COLGADAS (target_id inexistente)');
  const dangling = rels.filter((r) => !byId.has(r.target_id));
  if (!dangling.length) line('  ✓ Ninguna.');
  else for (const r of dangling) line(`  ✗ ${r.source_id} --${r.type}--> ${r.target_id}`);

  h('DEROGA APUNTANDO A NORMAS NO DEROGADAS');
  const derogMal = rels
    .filter((r) => r.type === 'DEROGA')
    .filter((r) => {
      const t = byId.get(r.target_id);
      return t && t.status !== 'DEROGADA';
    });
  if (!derogMal.length) line('  ✓ Sin inconsistencias entre DEROGA y el estado del target.');
  else for (const r of derogMal) line(`  ✗ ${r.source_id} DEROGA ${r.target_id} (${byId.get(r.target_id)?.status})`);

  h('TOP 10 NORMAS MÁS REFERENCIADAS (in-degree)');
  [...inDeg.entries()]
    .filter(([, d]) => d > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([id, d], i) =>
      line(`  ${String(i + 1).padStart(2)}. ${(byId.get(id)?.title ?? id).slice(0, 48).padEnd(48)} ${d} refs`),
    );

  h('RESUMEN');
  line(`  Aisladas: ${isolated.length}  |  Colgadas: ${dangling.length}  |  DEROGA mal: ${derogMal.length}`);
  line('  Validación pass/fail: npm test -- db-integrity');
  line('════════════════════════════════════════════════════════════════════');
}

main()
  .catch((e) => {
    console.error('Error:', e instanceof Error ? e.message : e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
