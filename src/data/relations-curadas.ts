/**
 * Relaciones curadas del grafo legal — fuente de verdad determinística.
 *
 * Descubiertas desde el campo `relatedNorms` (texto curado a mano) con
 * `scripts/discover-relations.ts`, y REVISADAS a mano (tipo + dirección). Se
 * aplican (merge, dedup) sobre las relaciones ya presentes en cada data file.
 *
 * Dirección: la relación va EN la norma que ejerce la acción.
 *   - REGLAMENTA: source = reglamento (decreto/resolución/disposición), target = ley.
 *   - DEROGA / MODIFICA: source = norma posterior, target = norma afectada.
 *   - RELACIONADA: vínculo temático genérico (una sola dirección por par).
 *
 * El `targetLawLabel` se autocompleta desde el target en el merge.
 */
import type { Law, LawRelation, RelationType } from '../common/types/law.types';

type CuratedEdge = { type: RelationType; target: string; description?: string };

export const RELACIONES_CURADAS: Record<string, CuratedEdge[]> = {
  // ── Constitución y códigos ────────────────────────────────────────────────
  'codigo-aduanero': [{ type: 'RELACIONADA', target: 'constitucion-nacional' }],
  'codigo-penal': [{ type: 'RELACIONADA', target: 'ley-27150', description: 'Código Procesal Penal Federal que instrumenta el proceso del Código Penal.' }],
  'ley-27150': [{ type: 'RELACIONADA', target: 'constitucion-nacional' }],
  'codigo-civil-comercial': [
    { type: 'RELACIONADA', target: 'ley-25326' },
    { type: 'RELACIONADA', target: 'ley-24240' },
    { type: 'RELACIONADA', target: 'ley-26618' },
    { type: 'RELACIONADA', target: 'constitucion-nacional' },
  ],

  // ── Tratados y niñez ──────────────────────────────────────────────────────
  'convencion-derechos-nino': [
    { type: 'RELACIONADA', target: 'ley-26061' },
    { type: 'RELACIONADA', target: 'ley-26842' },
    { type: 'RELACIONADA', target: 'ley-23592' },
    { type: 'RELACIONADA', target: 'ley-27801' },
  ],
  'ley-26061': [{ type: 'RELACIONADA', target: 'ley-26657' }],

  // ── Laboral (reforma 2026) ────────────────────────────────────────────────
  'ley-20744': [{ type: 'RELACIONADA', target: 'ley-11544' }],
  'ley-27742': [{ type: 'MODIFICA', target: 'ley-20744', description: 'La Ley de Bases modifica artículos de la Ley de Contrato de Trabajo.' }],
  'ley-27802': [
    { type: 'MODIFICA', target: 'ley-20744' },
    { type: 'MODIFICA', target: 'ley-11544' },
    { type: 'RELACIONADA', target: 'ley-27742' },
  ],
  'decreto-315-2026': [{ type: 'REGLAMENTA', target: 'ley-27802' }],
  'rg-arca-5844-2026': [
    { type: 'REGLAMENTA', target: 'ley-27802' },
    { type: 'COMPLEMENTA', target: 'decreto-315-2026' },
  ],
  'decreto-407-2026': [
    { type: 'REGLAMENTA', target: 'ley-27802' },
    { type: 'RELACIONADA', target: 'ley-20744', description: 'Reglamenta artículos de la LCT (recibo, registración, licencias).' },
  ],

  // ── Datos personales / acceso a la información ────────────────────────────
  'disp-dnpdp-7-2005': [{ type: 'REGLAMENTA', target: 'ley-25326', description: 'Disposición que reglamenta aspectos de la Ley de Protección de Datos Personales.' }],
  'ley-27275': [{ type: 'RELACIONADA', target: 'ley-25326' }],

  // ── Ambiental ─────────────────────────────────────────────────────────────
  // decreto-207-2011 REGLAMENTA ley-26639 ya está curada en su data file.

  // ── Género / salud / derechos ─────────────────────────────────────────────
  'ley-27499': [
    { type: 'RELACIONADA', target: 'ley-26485' },
    { type: 'RELACIONADA', target: 'ley-26743' },
    { type: 'RELACIONADA', target: 'ley-27610' },
  ],
  'ley-26743': [
    { type: 'RELACIONADA', target: 'ley-26485' },
    { type: 'RELACIONADA', target: 'ley-26061' },
  ],
  'ley-26485': [
    { type: 'RELACIONADA', target: 'ley-26061' },
    { type: 'RELACIONADA', target: 'ley-27610' },
  ],
  'ley-27610': [
    { type: 'MODIFICA', target: 'codigo-penal', description: 'La Ley de IVE modifica los artículos del Código Penal sobre interrupción del embarazo.' },
    { type: 'RELACIONADA', target: 'codigo-civil-comercial' },
  ],
  'ley-26657': [{ type: 'RELACIONADA', target: 'ley-23592' }],
  'ley-23592': [
    { type: 'RELACIONADA', target: 'ley-26743' },
    { type: 'RELACIONADA', target: 'constitucion-nacional' },
  ],

  // ── Consumidor / etiquetado ───────────────────────────────────────────────
  'ley-27642': [{ type: 'RELACIONADA', target: 'ley-24240' }],
  'decreto-151-2022': [
    { type: 'REGLAMENTA', target: 'ley-27642' },
    { type: 'RELACIONADA', target: 'ley-24240' },
  ],

  // ── Penal juvenil ─────────────────────────────────────────────────────────
  'ley-27801': [
    // DEROGA ley-22278 ya está curada en su data file.
    { type: 'RELACIONADA', target: 'convencion-derechos-nino' },
    { type: 'RELACIONADA', target: 'ley-26061' },
    { type: 'RELACIONADA', target: 'codigo-penal' },
    { type: 'RELACIONADA', target: 'ley-26657' },
  ],
};

/**
 * Aplica (merge, dedup por type+target) las relaciones curadas sobre las normas.
 * Muta `law.relations` — los objetos son singletons compartidos, así que el grafo
 * y los tests ven las relaciones combinadas.
 */
export function applyCuratedRelations(laws: Law[]): void {
  const byId = new Map(laws.map((l) => [l.id, l]));
  for (const [srcId, edges] of Object.entries(RELACIONES_CURADAS)) {
    const src = byId.get(srcId);
    if (!src) continue;
    for (const e of edges) {
      const tgt = byId.get(e.target);
      if (!tgt || e.target === srcId) continue;
      if (src.relations.some((r) => r.type === e.type && r.targetLawId === e.target)) continue;
      const rel: LawRelation = {
        type: e.type,
        targetLawId: e.target,
        targetLawLabel: tgt.commonName ?? tgt.title,
        description: e.description ?? null,
      };
      src.relations.push(rel);
    }
  }

  // Constituciones provinciales → Constitución Nacional (marco federal, art. 5 CN).
  const cn = byId.get('constitucion-nacional');
  if (cn) {
    for (const law of laws) {
      if (!law.id.startsWith('const-') || law.id === 'constitucion-nacional') continue;
      if (law.relations.some((r) => r.targetLawId === 'constitucion-nacional')) continue;
      law.relations.push({
        type: 'RELACIONADA',
        targetLawId: 'constitucion-nacional',
        targetLawLabel: cn.commonName ?? cn.title,
        description: 'Constitución provincial dentro del marco federal de la Constitución Nacional (art. 5 CN).',
      });
    }
  }
}
