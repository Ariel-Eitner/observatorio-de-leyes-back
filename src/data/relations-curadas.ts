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
  'codigo-aduanero': [
    { type: 'RELACIONADA', target: 'constitucion-nacional' },
    { type: 'RELACIONADA', target: 'dnu-70-2023', description: 'Modificado por el DNU 70/2023 (Título V, Comercio Exterior y Aduana).' },
  ],
  'codigo-penal': [{ type: 'RELACIONADA', target: 'ley-27150', description: 'Código Procesal Penal Federal que instrumenta el proceso del Código Penal.' }],
  'ley-27150': [{ type: 'RELACIONADA', target: 'constitucion-nacional' }],
  'codigo-civil-comercial': [
    { type: 'RELACIONADA', target: 'ley-25326' },
    { type: 'RELACIONADA', target: 'ley-24240' },
    { type: 'RELACIONADA', target: 'ley-26618' },
    { type: 'RELACIONADA', target: 'constitucion-nacional' },
    { type: 'RELACIONADA', target: 'dnu-70-2023', description: 'Modificado por el DNU 70/2023 (Título X, Justicia).' },
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
  'ley-20744': [
    { type: 'RELACIONADA', target: 'ley-11544' },
    { type: 'RELACIONADA', target: 'dnu-70-2023', description: 'Afectada por el DNU 70/2023 (Título IV, reforma laboral — suspendido judicialmente).' },
  ],
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

  // ── DNU 70/2023 (mega-decreto Milei) — afecta normas ya cargadas ──────────
  'dnu-70-2023': [
    { type: 'MODIFICA', target: 'ley-20744', description: 'El DNU 70/2023 modifica la Ley de Contrato de Trabajo (Título IV, suspendido judicialmente).' },
    { type: 'MODIFICA', target: 'codigo-aduanero', description: 'Reforma el Código Aduanero (Título V, Comercio Exterior).' },
    { type: 'MODIFICA', target: 'codigo-civil-comercial', description: 'Modifica el Código Civil y Comercial (Título X, Justicia).' },
    { type: 'RELACIONADA', target: 'ley-27742', description: 'La Ley de Bases retomó por vía legislativa parte de las reformas del DNU.' },
    { type: 'RELACIONADA', target: 'ley-27802', description: 'La Modernización Laboral canalizó parte del capítulo laboral del DNU (suspendido).' },
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
// Labels de normas ya migradas a la BD (ya no están en los arrays de código,
// pero las relaciones que las apuntan deben conservar su nombre para el grafo).
// Exportado para que la validación de integridad las reconozca como nodos válidos.
export const MIGRATED_LABELS: Record<string, string> = {
  'constitucion-nacional': 'Constitución Nacional',
  'carta-onu': 'Carta de la ONU',
  'convencion-derechos-nino': 'Convención sobre los Derechos del Niño',
  'codigo-aduanero': 'Código Aduanero',
  'codigo-civil-comercial': 'Código Civil y Comercial',
  'codigo-penal': 'Código Penal',
  'ley-27150': 'Código Procesal Penal Federal',
  'ley-20744': 'Ley de Contrato de Trabajo (LCT)',
  'ley-27742': 'Ley de Bases',
  'ley-27802': 'Ley de Modernización Laboral',
  'dnu-70-2023': 'DNU 70/2023',
};

export function applyCuratedRelations(laws: Law[]): void {
  const byId = new Map(laws.map((l) => [l.id, l]));
  const labelOf = (id: string): string | null => {
    const t = byId.get(id);
    return t ? (t.commonName ?? t.title) : (MIGRATED_LABELS[id] ?? null);
  };

  for (const [srcId, edges] of Object.entries(RELACIONES_CURADAS)) {
    const src = byId.get(srcId);
    if (!src) continue;
    for (const e of edges) {
      const tgtLabel = labelOf(e.target);
      if (!tgtLabel || e.target === srcId) continue;
      if (src.relations.some((r) => r.type === e.type && r.targetLawId === e.target)) continue;
      const rel: LawRelation = {
        type: e.type,
        targetLawId: e.target,
        targetLawLabel: tgtLabel,
        description: e.description ?? null,
      };
      src.relations.push(rel);
    }
  }

  // Constituciones provinciales → Constitución Nacional (marco federal, art. 5 CN).
  const cnLabel = labelOf('constitucion-nacional');
  if (cnLabel) {
    for (const law of laws) {
      if (!law.id.startsWith('const-') || law.id === 'constitucion-nacional') continue;
      if (law.relations.some((r) => r.targetLawId === 'constitucion-nacional')) continue;
      law.relations.push({
        type: 'RELACIONADA',
        targetLawId: 'constitucion-nacional',
        targetLawLabel: cnLabel,
        description: 'Constitución provincial dentro del marco federal de la Constitución Nacional (art. 5 CN).',
      });
    }
  }
}
