/**
 * Integridad del grafo legal — valida las relaciones tipadas (`law.relations`),
 * que son la fuente de verdad determinística del mapa legal.
 *
 * Estos checks FALLAN cuando una relación curada está mal. No exigen que todas
 * las normas tengan relaciones (eso lo descubre `npm run audit:graph`), pero sí
 * que las que existen sean correctas y consistentes con el estado de la norma.
 */
import { ALL_LAWS, NORMAS_CLAVE } from './index';
import { CONSTITUCIONES_PROVINCIALES } from './constituciones-provinciales/index';
import { MIGRATED_LABELS } from './relations-curadas';
import { RelationType } from '../common/types/law.types';

const ALL_SOURCES = [...NORMAS_CLAVE, ...ALL_LAWS, ...CONSTITUCIONES_PROVINCIALES];

const UNIQUE = (() => {
  const seen = new Set<string>();
  return ALL_SOURCES.filter((l) => (seen.has(l.id) ? false : (seen.add(l.id), true)));
})();

const byId = new Map(UNIQUE.map((l) => [l.id, l]));
// Nodos válidos como target = los del código + los ya migrados a la BD (que ya
// no viven en estos arrays pero siguen siendo destino legítimo de relaciones).
const VALID_TARGET_IDS = new Set<string>([...byId.keys(), ...Object.keys(MIGRATED_LABELS)]);
const VALID_TYPES = new Set<string>(Object.values(RelationType));

interface RelRef {
  src: string;
  type: string;
  target: string;
}

const ALL_RELS: RelRef[] = UNIQUE.flatMap((l) =>
  (l.relations ?? []).map((r) => ({ src: l.id, type: r.type, target: r.targetLawId })),
);

describe('Grafo legal — integridad de relaciones', () => {
  test('todo targetLawId existe en el sistema (sin aristas colgadas)', () => {
    const dangling = ALL_RELS.filter((r) => !VALID_TARGET_IDS.has(r.target)).map(
      (r) => `${r.src} --${r.type}--> ${r.target} (target inexistente)`,
    );
    expect(dangling).toEqual([]);
  });

  test('no hay auto-relaciones (una norma no se relaciona consigo misma)', () => {
    const self = ALL_RELS.filter((r) => r.src === r.target).map((r) => `${r.src} --${r.type}--> sí misma`);
    expect(self).toEqual([]);
  });

  test('no hay relaciones duplicadas (mismo tipo + target dentro de una norma)', () => {
    const dups: string[] = [];
    for (const law of UNIQUE) {
      const seen = new Set<string>();
      for (const r of law.relations ?? []) {
        const key = `${r.type}|${r.targetLawId}`;
        if (seen.has(key)) dups.push(`${law.id}: ${key}`);
        seen.add(key);
      }
    }
    expect(dups).toEqual([]);
  });

  test('todos los tipos de relación son válidos', () => {
    const invalid = ALL_RELS.filter((r) => !VALID_TYPES.has(r.type)).map((r) => `${r.src}: ${r.type}`);
    expect(invalid).toEqual([]);
  });

  test('targetLawLabel no está vacío', () => {
    const empty: string[] = [];
    for (const law of UNIQUE) {
      for (const r of law.relations ?? []) {
        if (!r.targetLawLabel?.trim()) empty.push(`${law.id} --${r.type}--> ${r.targetLawId}`);
      }
    }
    expect(empty).toEqual([]);
  });

  // ── Consistencia direccional con el estado de la norma ──────────────────────
  test('una relación DEROGA apunta a una norma con estado DEROGADA', () => {
    const bad: string[] = [];
    for (const r of ALL_RELS.filter((x) => x.type === 'DEROGA')) {
      const t = byId.get(r.target);
      if (!t) continue; // norma migrada a BD: no está en estos arrays
      if (t.status !== 'DEROGADA') {
        bad.push(`${r.src} DEROGA ${r.target} — pero ${r.target}.status = ${t.status} (esperado DEROGADA)`);
      }
    }
    expect(bad).toEqual([]);
  });

  test('una relación DEROGA_PARCIALMENTE no apunta a una norma VIGENTE plena', () => {
    const bad: string[] = [];
    for (const r of ALL_RELS.filter((x) => x.type === 'DEROGA_PARCIALMENTE')) {
      const t = byId.get(r.target);
      if (!t) continue; // norma migrada a BD: no está en estos arrays
      if (t.status === 'VIGENTE') {
        bad.push(`${r.src} DEROGA_PARCIALMENTE ${r.target} — pero ${r.target}.status = VIGENTE (esperado PARCIALMENTE_VIGENTE o DEROGADA)`);
      }
    }
    expect(bad).toEqual([]);
  });

  test('REGLAMENTA apunta a una ley/constitución/tratado (no a un reglamento) — caza direcciones invertidas', () => {
    // Un reglamento (decreto/resolución/disposición) reglamenta una norma de mayor
    // jerarquía. Si apunta a otro decreto/resolución, la dirección probablemente
    // está invertida (ej. "ley REGLAMENTA decreto" en vez de "decreto REGLAMENTA ley").
    const RANGO_MENOR = new Set(['DECRETO', 'RESOLUCION', 'DISPOSICION']);
    const bad: string[] = [];
    for (const r of ALL_RELS.filter((x) => x.type === 'REGLAMENTA')) {
      const t = byId.get(r.target);
      if (!t) continue; // norma migrada a BD: no está en estos arrays
      if (RANGO_MENOR.has(t.normType)) {
        bad.push(`${r.src} REGLAMENTA ${r.target} (${t.normType}) — dirección probablemente invertida`);
      }
    }
    expect(bad).toEqual([]);
  });
});
