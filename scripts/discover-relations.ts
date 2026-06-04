/**
 * Descubrimiento de relaciones entre normas CARGADAS, a partir del campo
 * relatedNorms (texto curado a mano) + metadata.relatedLaws. Sugiere un tipo
 * según palabras clave. Es insumo para curar `relations` tipadas — no las aplica.
 */
import { ALL_LAWS, NORMAS_CLAVE } from '../src/data/index';
import type { Law } from '../src/common/types/law.types';

// Las constituciones migraron a la BD; este script estático cubre el resto.
const SOURCES: Law[] = (() => {
  const seen = new Set<string>();
  return [...NORMAS_CLAVE, ...ALL_LAWS].filter((l) =>
    seen.has(l.id) ? false : (seen.add(l.id), true),
  );
})();

// índice número(solo dígitos) -> id, y nombre -> id
const digitsToId = new Map<string, string>();
const nameToId = new Map<string, string>();
for (const l of SOURCES) {
  const d = l.number.replace(/[^\d]/g, '');
  if (d) digitsToId.set(d, l.id);
  if (l.commonName) nameToId.set(l.commonName.toLowerCase(), l.id);
  nameToId.set(l.title.toLowerCase(), l.id);
}
// alias de códigos frecuentes
const aliasName: Record<string, string> = {
  lct: 'ley-20744', ccyc: 'codigo-civil-comercial', ccycn: 'codigo-civil-comercial',
  'código civil': 'codigo-civil-comercial', 'código penal': 'codigo-penal',
  'código aduanero': 'codigo-aduanero', 'constitución nacional': 'constitucion-nacional',
};

function suggestType(s: string): string {
  const t = s.toLowerCase();
  if (/derogad|deroga\b/.test(t)) return 'DEROGA';
  if (/reglament/.test(t)) return 'REGLAMENTA';
  if (/modific|sustituy/.test(t)) return 'MODIFICA';
  if (/complement/.test(t)) return 'COMPLEMENTA';
  return 'RELACIONADA';
}

function matchIds(s: string, selfId: string): { id: string; type: string }[] {
  const out: { id: string; type: string }[] = [];
  // números (Ley 27.802, Decreto 407/2026, etc.)
  for (const m of s.matchAll(/\b(\d[\d.\/]*\d)\b/g)) {
    const d = m[1].replace(/[^\d]/g, '');
    const id = digitsToId.get(d);
    if (id && id !== selfId) out.push({ id, type: suggestType(s) });
  }
  // alias por nombre
  for (const [name, id] of Object.entries(aliasName)) {
    if (s.toLowerCase().includes(name) && id !== selfId) out.push({ id, type: suggestType(s) });
  }
  return out;
}

let totalEdges = 0;
let lawsWithEdges = 0;
for (const law of SOURCES) {
  const strings = [
    ...(law.relatedNorms ?? []),
    ...((law.metadata?.relatedLaws as string[] | undefined) ?? []),
  ];
  const edges = new Map<string, string>(); // targetId -> type (dedup)
  for (const s of strings) {
    for (const { id, type } of matchIds(s, law.id)) {
      // no pisar un tipo específico con RELACIONADA
      if (!edges.has(id) || edges.get(id) === 'RELACIONADA') edges.set(id, type);
    }
  }
  if (edges.size === 0) continue;
  lawsWithEdges++;
  totalEdges += edges.size;
  console.log(`\n${law.id}  (${edges.size})`);
  for (const [id, type] of edges) console.log(`   --${type}--> ${id}`);
}

console.log(`\n────────────────────────────────────`);
console.log(`Normas con aristas candidatas: ${lawsWithEdges}/${SOURCES.length}`);
console.log(`Aristas candidatas totales   : ${totalEdges}`);
