/**
 * audit:graph — reporte de discrepancias del grafo legal.
 *
 * No falla: descubre qué relaciones conviene curar. La fuente de verdad
 * determinística es `law.relations`. Este script cruza ese dato con el estado
 * de cada norma y con lo que cada norma DECLARA (metadata.derogatingNorms) para
 * encontrar derogaciones/relaciones faltantes o inconsistentes.
 */
import { ALL_LAWS, NORMAS_CLAVE } from '../src/data/index';
import { CONSTITUCIONES_PROVINCIALES } from '../src/data/constituciones-provinciales/index';
import type { Law } from '../src/common/types/law.types';

const SOURCES: Law[] = (() => {
  const seen = new Set<string>();
  return [...NORMAS_CLAVE, ...ALL_LAWS, ...CONSTITUCIONES_PROVINCIALES].filter((l) =>
    seen.has(l.id) ? false : (seen.add(l.id), true),
  );
})();

const byId = new Map(SOURCES.map((l) => [l.id, l]));

// Índice de relaciones entrantes: targetLawId -> [{src, type}]
const incoming = new Map<string, { src: string; type: string }[]>();
for (const law of SOURCES) {
  for (const r of law.relations ?? []) {
    if (!incoming.has(r.targetLawId)) incoming.set(r.targetLawId, []);
    incoming.get(r.targetLawId)!.push({ src: law.id, type: r.type });
  }
}

const totalRels = [...incoming.values()].reduce((s, v) => s + v.length, 0);
const withRel = SOURCES.filter((l) => (l.relations ?? []).length > 0);

const line = (s = '') => console.log(s);
const h = (s: string) => { line(); line(`▸ ${s}`); line('─'.repeat(78)); };

line('════════════════════════════════════════════════════════════════════');
line('  AUDITORÍA DEL GRAFO LEGAL — discrepancias de relaciones');
line('════════════════════════════════════════════════════════════════════');

h('COBERTURA');
line(`  Normas totales            : ${SOURCES.length}`);
line(`  Normas con relations       : ${withRel.length}  (${Math.round((withRel.length / SOURCES.length) * 100)}%)`);
line(`  Relaciones curadas totales : ${totalRels}`);
line(`  Normas SIN ninguna relación: ${SOURCES.length - withRel.length}`);

// ── 0. Nodos aislados (sin relación entrante ni saliente) ─────────────────────
h('NODOS AISLADOS (sin ninguna arista — flotan en el mapa)');
const isolated = SOURCES.filter(
  (l) => (l.relations ?? []).length === 0 && !(incoming.get(l.id)?.length),
);
if (isolated.length === 0) line('  ✓ Ninguno — todas las normas tienen al menos una arista.');
else for (const l of isolated) line(`  ✗ ${l.id.padEnd(34)} [${l.status}]`);

// ── 1. Normas derogadas/parciales sin quién las derogue (curado) ──────────────
h('DEROGADAS / PARCIALES SIN DEROGA ENTRANTE (curar la relación)');
const derogadas = SOURCES.filter((l) => l.status === 'DEROGADA' || l.status === 'PARCIALMENTE_VIGENTE');
let faltanDerog = 0;
for (const l of derogadas) {
  const inDerog = (incoming.get(l.id) ?? []).filter((x) => x.type === 'DEROGA' || x.type === 'DEROGA_PARCIALMENTE');
  if (inDerog.length === 0) {
    faltanDerog++;
    const declara = (l.metadata?.derogatingNorms ?? []).join(' · ') || '(no declara derogatingNorms)';
    line(`  ✗ ${l.id.padEnd(34)} [${l.status}]  declara: ${declara}`);
  }
}
if (faltanDerog === 0) line('  ✓ Todas las normas derogadas/parciales tienen una DEROGA entrante curada.');

// ── 2. Relaciones DEROGA hacia normas que NO están derogadas (inconsistente) ──
h('DEROGA APUNTANDO A NORMAS NO DEROGADAS (relación o estado mal)');
let derogMal = 0;
for (const law of SOURCES) {
  for (const r of law.relations ?? []) {
    if (r.type === 'DEROGA' || r.type === 'DEROGA_PARCIALMENTE') {
      const t = byId.get(r.targetLawId);
      if (!t) continue;
      const ok = r.type === 'DEROGA' ? t.status === 'DEROGADA' : t.status !== 'VIGENTE';
      if (!ok) { derogMal++; line(`  ✗ ${law.id} ${r.type} ${r.targetLawId} — target.status = ${t.status}`); }
    }
  }
}
if (derogMal === 0) line('  ✓ Sin inconsistencias entre relaciones DEROGA y el estado del target.');

// ── 3. Normas que DECLARAN derogar/modificar pero no tienen la relación curada ─
h('DECLARA derogatingNorms/modifyingNorms PERO SIN RELACIÓN CURADA');
let declaraSinRel = 0;
for (const l of SOURCES) {
  const declaraDerog = (l.metadata?.derogatingNorms ?? []).length > 0;
  const declaraMod = (l.metadata?.modifyingNorms ?? []).length > 0;
  const tieneEntranteDerog = (incoming.get(l.id) ?? []).some((x) => x.type.startsWith('DEROGA'));
  const tieneEntranteMod = (incoming.get(l.id) ?? []).some((x) => x.type === 'MODIFICA');
  if ((declaraDerog && !tieneEntranteDerog) || (declaraMod && !tieneEntranteMod)) {
    declaraSinRel++;
    const piezas: string[] = [];
    if (declaraDerog && !tieneEntranteDerog) piezas.push(`derogada por: ${l.metadata!.derogatingNorms!.join(', ')}`);
    if (declaraMod && !tieneEntranteMod) piezas.push(`modificada por: ${l.metadata!.modifyingNorms!.join(', ')}`);
    line(`  ⚠ ${l.id.padEnd(34)} ${piezas.join(' | ')}`);
  }
}
if (declaraSinRel === 0) line('  ✓ Todo lo declarado en metadata tiene su relación tipada.');

// ── 4. Resumen ────────────────────────────────────────────────────────────────
h('RESUMEN');
line(`  Derogadas/parciales sin DEROGA curada : ${faltanDerog}`);
line(`  DEROGA con target mal                 : ${derogMal}`);
line(`  Declara en metadata pero sin relación  : ${declaraSinRel}`);
line();
line(`  Próximo paso: curar 'relations' tipadas en los data files señalados,`);
line(`  y validar con: npm test -- legal-graph-integrity`);
line('════════════════════════════════════════════════════════════════════');
