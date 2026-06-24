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
  'ley-24522': [
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'El Código Civil y Comercial rige supletoriamente las obligaciones, contratos y garantías en el concurso preventivo y la quiebra.' },
    { type: 'RELACIONADA', target: 'ley-20744', description: 'Los créditos laborales tienen tratamiento especial en el concurso y la quiebra: pronto pago, privilegios y efectos sobre el contrato de trabajo (arts. 16, 196-199, 241 y 246).' },
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
    { type: 'DEROGA', target: 'ley-20705', description: 'Deroga la Ley de Sociedades del Estado (art. 40).' },
    { type: 'DEROGA', target: 'ley-13653', description: 'Deroga la Ley de Empresas del Estado (art. 37).' },
    { type: 'DEROGA', target: 'ley-26992', description: 'Deroga la Ley del Observatorio de Precios (art. 5).' },
    { type: 'DEROGA', target: 'ley-18875', description: 'Deroga la Ley de Compre Nacional (art. 38).' },
    { type: 'DEROGA', target: 'decreto-ley-15349-1946', description: 'Deroga el Decreto-Ley 15.349/46 de Sociedades de Economía Mixta (art. 36).' },
    { type: 'DEROGA', target: 'decreto-ley-12507-1956', description: 'Deroga el Decreto-Ley 12.507/56 de política aeronáutica nacional (art. 178).' },
    { type: 'DEROGA', target: 'ley-18828', description: 'Deroga la Ley 18.828 de alojamientos turísticos (art. 348).' },
    { type: 'MODIFICA', target: 'ley-25649', description: 'Sustituye el art. 2 de la Ley del Medicamento por su Nombre Genérico (art. 266).' },
    { type: 'MODIFICA', target: 'ley-27553', description: 'Sustituye los arts. 1, 3 y 13 de la Ley de Recetas Electrónicas (arts. 307/308/309).' },
    { type: 'RELACIONADA', target: 'ley-25323', description: 'Derogó la Ley 25.323 (art. 55), pero el Título IV laboral está suspendido judicialmente y se sigue aplicando.' },
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

  // ── Lote verde (interconexión de las normas recién cargadas) ──────────────
  'ley-25323': [
    { type: 'RELACIONADA', target: 'ley-20744', description: 'Agrava (duplica / +50%) las indemnizaciones por despido de los arts. 232, 233 y 245 de la Ley de Contrato de Trabajo.' },
    { type: 'RELACIONADA', target: 'ley-24013', description: 'El agravamiento del art. 1 no es acumulable con las multas por empleo no registrado de la Ley Nacional de Empleo (arts. 8, 9, 10 y 15).' },
  ],
  'ley-25649': [
    { type: 'RELACIONADA', target: 'ley-26529', description: 'La prescripción por nombre genérico se enmarca en los derechos a la información y autonomía del paciente.' },
  ],
  'ley-27553': [
    { type: 'RELACIONADA', target: 'ley-26529', description: 'La receta electrónica y la teleasistencia se ejercen garantizando los derechos del paciente.' },
    { type: 'RELACIONADA', target: 'ley-25326', description: 'Las plataformas de receta electrónica y teleasistencia operan bajo la protección de los datos personales.' },
  ],
  'ley-23928': [
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'El nominalismo y la prohibición de indexar (arts. 7 y 10) inciden en las obligaciones de dar dinero; su art. 11 modificó el entonces Código Civil.' },
  ],
  'ley-27221': [
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'Remite al art. 1199 inc. b del Código Civil y Comercial para excluir las locaciones turísticas de corto plazo del régimen de locación.' },
    { type: 'RELACIONADA', target: 'ley-27551', description: 'Los alquileres turísticos temporarios quedan fuera de la locación de vivienda y se rigen como hospedaje.' },
  ],
  'ley-26992': [
    { type: 'RELACIONADA', target: 'ley-20680', description: 'El Observatorio podía emitir dictámenes técnicos previos al ejercicio de las potestades del art. 2 de la Ley de Abastecimiento.' },
  ],
  'ley-20705': [
    { type: 'RELACIONADA', target: 'ley-13653', description: 'Figuras hermanas del Estado empresario (Sociedades del Estado y Empresas del Estado); ambas derogadas por el DNU 70/2023.' },
  ],

  // ── Seguridad / Inteligencia / Defensa / Compras públicas (cluster 2026-06-23) ──
  'ley-25520': [
    { type: 'RELACIONADA', target: 'constitucion-nacional', description: 'Operativiza las garantías de los arts. 18 y 19 (inviolabilidad de la correspondencia y de los papeles privados, intimidad): exige orden judicial para interceptar comunicaciones.' },
    { type: 'MODIFICA', target: 'ley-24059', description: 'Los arts. 47 a 50 de la Ley de Inteligencia modifican la Ley de Seguridad Interior: renombran la inteligencia criminal y reformulan su Título VII de control parlamentario.' },
  ],
  'ley-24059': [
    { type: 'RELACIONADA', target: 'constitucion-nacional', description: 'Operativiza el deber del Estado de garantizar la seguridad interior y los derechos de los habitantes dentro del marco constitucional.' },
  ],
  'decreto-1112-2024': [
    { type: 'RELACIONADA', target: 'ley-24059', description: 'Reglamenta el Sistema de Defensa Nacional (Ley 23.554), que se articula con la Ley de Seguridad Interior: defensa = amenazas externas, seguridad interior = orden interno.' },
    { type: 'RELACIONADA', target: 'ley-25520', description: 'La inteligencia estratégica militar integra el Sistema de Inteligencia Nacional dentro de la defensa.' },
  ],
  'dnu-941-2025': [
    { type: 'MODIFICA', target: 'ley-25520', description: 'Reestructura la SIDE y modifica numerosos artículos de la Ley de Inteligencia: crea el Servicio de Inteligencia Argentino, la Agencia Nacional de Contrainteligencia y la Agencia Federal de Ciberinteligencia.' },
  ],
  'decreto-1023-2001': [
    { type: 'RELACIONADA', target: 'ley-24156', description: 'El Régimen de Contrataciones se aplica a las jurisdicciones y entidades del inciso a del art. 8 de la Ley de Administración Financiera.' },
  ],

  // ── Delitos informáticos / firma digital (cluster 2026-06-24, demanda del tracking) ──
  'ley-26388': [
    { type: 'MODIFICA', target: 'codigo-penal', description: 'Incorpora y sustituye artículos del Código Penal para tipificar los delitos informáticos: acceso ilegítimo a sistemas, daño y fraude informático, intercepción de comunicaciones electrónicas y delitos contra los datos personales.' },
  ],
  'ley-25506': [
    { type: 'RELACIONADA', target: 'codigo-penal', description: 'El art. 51 incorporó el art. 78 bis al Código Penal equiparando la firma y el documento digital a los del papel; esa equiparación fue luego reubicada en el art. 77 por la Ley 26.388.' },
    { type: 'RELACIONADA', target: 'ley-26388', description: 'La Ley 26.388 de delitos informáticos derogó el art. 78 bis del Código Penal que esta ley había incorporado y reformuló la equiparación de la firma digital.' },
  ],

  // ── Estado empresario / aeronáutica (derogadas por el DNU 70/2023) ────────
  'decreto-ley-15349-1946': [
    { type: 'RELACIONADA', target: 'ley-19550', description: 'Las sociedades de economía mixta se regían supletoriamente por el régimen de las sociedades anónimas, hoy en la Ley General de Sociedades.' },
  ],
  'decreto-ley-12507-1956': [
    { type: 'RELACIONADA', target: 'codigo-aeronautico', description: 'Integraba el marco rector del sector aéreo junto con el Código Aeronáutico, que regula la aeronavegación civil.' },
  ],

  // ── Turismo ───────────────────────────────────────────────────────────────
  'ley-18829': [
    { type: 'RELACIONADA', target: 'ley-24240', description: 'La relación entre la agencia de viajes y el turista es una relación de consumo: la Ley de Defensa del Consumidor protege al viajero.' },
    { type: 'RELACIONADA', target: 'constitucion-nacional', description: 'Reglamenta el ejercicio de una actividad comercial (art. 14) sujetándola a habilitación, fondo de garantía y control.' },
  ],
  'ley-18828': [
    { type: 'RELACIONADA', target: 'ley-18829', description: 'Ambas integraban el marco regulatorio del turismo: la 18.828 los alojamientos y la 18.829 las agencias de viaje.' },
  ],

  // ── Ejercicio de la abogacía ──────────────────────────────────────────────
  'ley-23187': [
    { type: 'RELACIONADA', target: 'ley-27423', description: 'Ambas regulan el ejercicio de la abogacía: la 23.187 la matrícula y la ética, y la 27.423 los honorarios profesionales.' },
    { type: 'RELACIONADA', target: 'constitucion-nacional', description: 'Reglamenta el derecho de ejercer una profesión lícita (art. 14) y organiza el control de la abogacía como institución de derecho público.' },
  ],

  // ── Registro del automotor ────────────────────────────────────────────────
  'decreto-ley-6582-1958': [
    { type: 'RELACIONADA', target: 'constitucion-nacional', description: 'Reglamenta el derecho de propiedad (art. 17) sobre los automotores mediante un registro constitutivo del dominio.' },
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'El Código Civil y Comercial rige supletoriamente el dominio, la posesión y los contratos sobre el automotor; este régimen establece su registración constitutiva especial.' },
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
