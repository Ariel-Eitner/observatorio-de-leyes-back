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
  // ── Procedimiento tributario / previsional (cluster 2026-06-25, demanda del tracking) ──
  'ley-11683': [
    { type: 'RELACIONADA', target: 'ley-24156', description: 'El procedimiento tributario rige sobre los recursos que integran el sistema de administración financiera del sector público nacional.' },
  ],
  'ley-24241': [
    { type: 'RELACIONADA', target: 'constitucion-nacional', description: 'Operativiza el artículo 14 bis de la Constitución: jubilaciones y pensiones móviles y el seguro social obligatorio.' },
  ],
  'ley-26773': [
    { type: 'COMPLEMENTA', target: 'ley-24557', description: 'Ordena y mejora la reparación del régimen de la Ley de Riesgos del Trabajo: indemnización adicional, opción excluyente y actualización RIPTE.' },
  ],
  'ley-23554': [
    { type: 'RELACIONADA', target: 'decreto-1112-2024', description: 'El Decreto 1112/2024 reglamenta el Sistema de Defensa Nacional que esta ley organiza.' },
    { type: 'RELACIONADA', target: 'ley-24059', description: 'Separa la defensa nacional (agresiones externas) de la seguridad interior de la Ley 24.059.' },
  ],
  'ley-27126': [
    { type: 'MODIFICA', target: 'ley-25520', description: 'Crea la Agencia Federal de Inteligencia (AFI) en reemplazo de la SIDE y modifica la Ley de Inteligencia Nacional.' },
  ],
  'ley-21526': [
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'Las entidades financieras que regula operan los contratos bancarios previstos en el Código Civil y Comercial.' },
  ],
  'ley-13064': [
    { type: 'RELACIONADA', target: 'decreto-1023-2001', description: 'La obra pública se integra con el régimen general de contrataciones del Estado.' },
  ],
  'ley-5965': [
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'La letra de cambio y el pagaré son títulos de crédito que el Código Civil y Comercial trata en el régimen de títulos valores.' },
  ],
  'ley-26993': [
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'Articula el sistema de resolución de conflictos de consumo con la relación de consumo del Código Civil y Comercial.' },
  ],
  'ley-25212': [
    { type: 'RELACIONADA', target: 'ley-20744', description: 'El Régimen General de Sanciones por Infracciones Laborales (Anexo II) sanciona el incumplimiento de las normas de fondo del trabajo, entre ellas la Ley de Contrato de Trabajo.' },
    { type: 'RELACIONADA', target: 'ley-26940', description: 'Complementa el régimen sancionatorio laboral reforzando el combate al empleo no registrado.' },
  ],

  // ── Grupo A: fiscal, laboral, societario, financiero (2026-06-25) ─────────
  'ley-27430': [
    { type: 'MODIFICA', target: 'ley-11683', description: 'La reforma tributaria modifica numerosos artículos de la Ley de Procedimiento Tributario (determinación de oficio, sanciones, acuerdo conclusivo voluntario).' },
    { type: 'RELACIONADA', target: 'codigo-penal', description: 'Su Título IX establece el Régimen Penal Tributario, que reemplaza la anterior ley penal tributaria.' },
  ],
  'ley-27348': [
    { type: 'COMPLEMENTA', target: 'ley-24557', description: 'Ley complementaria de Riesgos del Trabajo: instaura la instancia administrativa previa ante las comisiones médicas.' },
    { type: 'RELACIONADA', target: 'ley-24241', description: 'Las comisiones médicas que regula son las creadas por el artículo 51 de la Ley 24.241.' },
  ],
  'ley-27611': [
    { type: 'RELACIONADA', target: 'ley-26061', description: 'Refuerza la protección integral de la primera infancia consagrada en la Ley 26.061.' },
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'Se articula con la responsabilidad parental y los derechos del niño del Código Civil y Comercial.' },
  ],
  'ley-27349': [
    { type: 'RELACIONADA', target: 'ley-19550', description: 'Crea la Sociedad por Acciones Simplificada (SAS), que se rige supletoriamente por la Ley General de Sociedades.' },
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'La SAS y los contratos asociativos se integran con el régimen de personas jurídicas y contratos del Código Civil y Comercial.' },
  ],
  'ley-27506': [
    { type: 'RELACIONADA', target: 'ley-27349', description: 'Forma parte del paquete de promoción productiva junto con la Ley de Apoyo al Capital Emprendedor.' },
    { type: 'RELACIONADA', target: 'ley-11683', description: 'Otorga estabilidad fiscal y beneficios impositivos dentro del marco de la Ley de Procedimiento Tributario.' },
  ],
  'ley-27260': [
    { type: 'RELACIONADA', target: 'ley-24241', description: 'Reajusta los haberes previsionales y cancela deudas del sistema regulado por la Ley 24.241.' },
    { type: 'RELACIONADA', target: 'ley-11683', description: 'Crea el régimen de sinceramiento fiscal (blanqueo), administrado dentro del marco de la Ley de Procedimiento Tributario.' },
  ],
  'ley-26831': [
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'Regula los valores negociables, que se integran con el régimen de títulos valores del Código Civil y Comercial.' },
    { type: 'RELACIONADA', target: 'ley-19550', description: 'Las sociedades emisoras que hacen oferta pública se rigen por la Ley General de Sociedades en lo no previsto por esta ley.' },
  ],
  'ley-27440': [
    { type: 'MODIFICA', target: 'ley-26831', description: 'Reforma sustancialmente la Ley de Mercado de Capitales (atribuciones de la CNV, oferta pública, agentes).' },
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'Regula la factura de crédito electrónica y los títulos valores, integrados con el Código Civil y Comercial.' },
  ],

  // ── Leyes de uso cotidiano (2026-06-25) ──────────────────────────────────
  'ley-11723': [
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'Los derechos de autor y la propiedad intelectual se integran con el régimen de bienes y derechos del Código Civil y Comercial.' },
    { type: 'RELACIONADA', target: 'codigo-penal', description: 'Tipifica delitos contra la propiedad intelectual (reproducción y plagio no autorizados) que se aplican junto con el Código Penal.' },
  ],
  'ley-24449': [
    { type: 'RELACIONADA', target: 'codigo-penal', description: 'Las infracciones graves de tránsito se vinculan con los delitos culposos del Código Penal (homicidio y lesiones culposas).' },
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'La responsabilidad civil por los daños de accidentes de tránsito se rige por el Código Civil y Comercial.' },
  ],
  'ley-23737': [
    { type: 'MODIFICA', target: 'codigo-penal', description: 'Sustituye e incorpora figuras penales del Código Penal y establece el régimen penal de los estupefacientes.' },
    { type: 'RELACIONADA', target: 'codigo-aduanero', description: 'Se articula con el régimen aduanero en materia de contrabando de estupefacientes y precursores químicos.' },
  ],
  'ley-25871': [
    { type: 'RELACIONADA', target: 'constitucion-nacional', description: 'Reglamenta el derecho a migrar y los derechos de los extranjeros reconocidos por la Constitución Nacional.' },
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'Se articula con el régimen de la persona, el domicilio y la capacidad del Código Civil y Comercial.' },
  ],
  'ley-18345': [
    { type: 'RELACIONADA', target: 'ley-20744', description: 'Es la ley procesal del fuero donde se reclaman los derechos de fondo de la Ley de Contrato de Trabajo y demás normas laborales.' },
    { type: 'RELACIONADA', target: 'ley-27348', description: 'El recurso ante la Justicia del Trabajo, tras la instancia administrativa de las comisiones médicas, tramita conforme este procedimiento.' },
  ],

  // ── Tier verde citadas: financiero / laboral / penal (2026-06-26) ─────────
  'ley-24083': [
    { type: 'RELACIONADA', target: 'ley-26831', description: 'Los fondos comunes de inversión operan en el mercado de capitales regulado por la Ley 26.831 y controlado por la Comisión Nacional de Valores.' },
    { type: 'RELACIONADA', target: 'ley-27440', description: 'La Ley de Financiamiento Productivo modernizó el régimen de los fondos comunes de inversión, en especial los cerrados.' },
  ],
  'ley-24635': [
    { type: 'MODIFICA', target: 'ley-18345', description: 'Crea la instancia obligatoria de conciliación previa (SECLO) y modifica la Ley de Procedimiento Laboral 18.345.' },
    { type: 'RELACIONADA', target: 'ley-20744', description: 'La conciliación previa alcanza los reclamos sobre los derechos de fondo de la Ley de Contrato de Trabajo.' },
  ],
  'ley-25246': [
    { type: 'MODIFICA', target: 'codigo-penal', description: 'Reforma el delito de encubrimiento y tipifica el lavado de activos de origen delictivo en el Código Penal.' },
    { type: 'RELACIONADA', target: 'ley-21526', description: 'Las entidades financieras son sujetos obligados a informar operaciones sospechosas a la Unidad de Información Financiera.' },
  ],
  'ley-23966': [
    { type: 'RELACIONADA', target: 'ley-11683', description: 'El Impuesto sobre los Bienes Personales y demás tributos que crea se aplican dentro del marco de la Ley de Procedimiento Tributario.' },
    { type: 'RELACIONADA', target: 'ley-27430', description: 'La reforma tributaria y normas posteriores modificaron el Impuesto sobre los Bienes Personales de esta ley.' },
  ],
  'ley-26363': [
    { type: 'MODIFICA', target: 'ley-24449', description: 'Crea la Agencia Nacional de Seguridad Vial y la Licencia Nacional de Conducir, y modifica la Ley Nacional de Tránsito.' },
    { type: 'RELACIONADA', target: 'codigo-penal', description: 'La política de seguridad vial se vincula con los delitos culposos de tránsito del Código Penal.' },
  ],
  'ley-23576': [
    { type: 'RELACIONADA', target: 'ley-26831', description: 'Las obligaciones negociables son valores negociables que se ofertan en el mercado de capitales bajo control de la Comisión Nacional de Valores.' },
    { type: 'RELACIONADA', target: 'ley-19550', description: 'Las sociedades por acciones que emiten obligaciones negociables se rigen, en lo no previsto, por la Ley General de Sociedades.' },
  ],
  'ley-24441': [
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'Creó el fideicomiso y el leasing; su régimen general fue luego incorporado al Código Civil y Comercial.' },
    { type: 'RELACIONADA', target: 'ley-26831', description: 'El fideicomiso financiero opera en el mercado de capitales bajo control de la Comisión Nacional de Valores.' },
  ],
  'ley-24463': [
    { type: 'RELACIONADA', target: 'ley-24241', description: 'Reforma el sistema previsional regulado por la Ley 24.241: movilidad, topes y financiamiento.' },
    { type: 'RELACIONADA', target: 'ley-27260', description: 'Se inscribe en la cadena de normas sobre determinación y reajuste de los haberes previsionales.' },
  ],
  'ley-26417': [
    { type: 'RELACIONADA', target: 'ley-24241', description: 'Establece la movilidad de las prestaciones del régimen previsional regulado por la Ley 24.241.' },
    { type: 'RELACIONADA', target: 'ley-24463', description: 'Sucede al régimen de movilidad atado al presupuesto de la Ley de Solidaridad Previsional.' },
  ],
  'ley-20643': [
    { type: 'RELACIONADA', target: 'ley-26831', description: 'Crea la Caja de Valores, depositaria central de los valores negociables del mercado de capitales.' },
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'Se vincula con el régimen de los títulos valores del Código Civil y Comercial.' },
  ],
  'ley-24481': [
    { type: 'RELACIONADA', target: 'ley-11723', description: 'Integra el sistema de propiedad intelectual e industrial junto con los derechos de autor de la Ley 11.723.' },
    { type: 'RELACIONADA', target: 'ley-22362', description: 'Forma parte del régimen de propiedad industrial junto con la Ley de Marcas y Designaciones.' },
  ],
  'ley-22362': [
    { type: 'RELACIONADA', target: 'ley-11723', description: 'Integra el sistema de propiedad intelectual e industrial junto con los derechos de autor de la Ley 11.723.' },
    { type: 'RELACIONADA', target: 'ley-24481', description: 'Forma parte del régimen de propiedad industrial junto con la Ley de Patentes de Invención.' },
  ],
  'ley-24521': [
    { type: 'RELACIONADA', target: 'ley-26206', description: 'La educación superior se articula con el sistema educativo regulado por la Ley de Educación Nacional.' },
    { type: 'RELACIONADA', target: 'constitucion-nacional', description: 'Reglamenta la autonomía universitaria y los principios educativos del artículo 75 inciso 19 de la Constitución Nacional.' },
  ],
  'ley-17418': [
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'El contrato de seguro se rige por esta ley especial y, supletoriamente, por el Código Civil y Comercial.' },
    { type: 'RELACIONADA', target: 'ley-20091', description: 'Regula el contrato de seguro; la Ley 20.091 regula a las aseguradoras y su control por la Superintendencia de Seguros de la Nación.' },
  ],
  'ley-19587': [
    { type: 'RELACIONADA', target: 'ley-24557', description: 'Fija las condiciones de higiene y seguridad cuyo incumplimiento se vincula con los accidentes y enfermedades cubiertos por la Ley de Riesgos del Trabajo.' },
    { type: 'RELACIONADA', target: 'ley-20744', description: 'Concreta el deber de seguridad del empleador previsto en la Ley de Contrato de Trabajo.' },
  ],
  'ley-11867': [
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'La transferencia del fondo de comercio se integra con el régimen de contratos y bienes del Código Civil y Comercial.' },
    { type: 'RELACIONADA', target: 'ley-19550', description: 'La transmisión de establecimientos comerciales suele darse en operaciones societarias regidas por la Ley General de Sociedades.' },
  ],

  // ── Alto valor social: salud / género / ambiente (2026-06-26) ─────────────
  'ley-27675': [
    { type: 'RELACIONADA', target: 'ley-23798', description: 'Reemplaza y amplía la anterior Ley Nacional de SIDA con una respuesta integral al VIH, las hepatitis, las ITS y la tuberculosis.' },
    { type: 'RELACIONADA', target: 'ley-26529', description: 'Garantiza la atención respetando la autonomía, la confidencialidad y los derechos del paciente.' },
  ],
  'ley-26862': [
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'La filiación derivada de las técnicas de reproducción humana asistida está regulada en el Código Civil y Comercial.' },
    { type: 'RELACIONADA', target: 'ley-26529', description: 'El acceso a las técnicas se realiza con el consentimiento informado y los derechos del paciente.' },
  ],
  'ley-27447': [
    { type: 'RELACIONADA', target: 'ley-26529', description: 'La donación y el trasplante se rigen por el consentimiento informado y los derechos del paciente.' },
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'Se vincula con los derechos personalísimos y la disposición del propio cuerpo del Código Civil y Comercial.' },
  ],
  'ley-27636': [
    { type: 'RELACIONADA', target: 'ley-26743', description: 'Profundiza los derechos de las personas travestis, transexuales y transgénero reconocidos por la Ley de Identidad de Género, en el acceso al empleo.' },
    { type: 'RELACIONADA', target: 'ley-20744', description: 'Promueve el acceso al empleo formal, regido en el sector privado por la Ley de Contrato de Trabajo.' },
  ],
  'ley-27592': [
    { type: 'RELACIONADA', target: 'ley-25675', description: 'Refuerza la educación ambiental dentro de la política ambiental nacional de la Ley General del Ambiente.' },
    { type: 'RELACIONADA', target: 'constitucion-nacional', description: 'Operativiza el derecho a un ambiente sano del artículo 41 de la Constitución a través de la capacitación de los agentes públicos.' },
  ],
  'ley-26364': [
    { type: 'MODIFICA', target: 'codigo-penal', description: 'Tipifica la trata de personas e incorpora figuras al Código Penal (artículos 145 bis y 145 ter).' },
    { type: 'RELACIONADA', target: 'ley-26485', description: 'La trata con fines de explotación sexual se vincula con la protección contra la violencia de género de la Ley 26.485.' },
  ],
  'ley-17454': [
    { type: 'RELACIONADA', target: 'codigo-civil-comercial', description: 'Es la ley procesal con la que se hacen valer ante la Justicia los derechos de fondo del Código Civil y Comercial.' },
    { type: 'RELACIONADA', target: 'ley-27423', description: 'Los honorarios de los profesionales en los procesos regidos por este código se regulan conforme la Ley de Honorarios.' },
  ],
  'ley-20628': [
    { type: 'RELACIONADA', target: 'ley-11683', description: 'El Impuesto a las Ganancias se determina, declara y recauda dentro del marco de la Ley de Procedimiento Tributario.' },
    { type: 'RELACIONADA', target: 'ley-27430', description: 'La reforma tributaria de la Ley 27.430 modificó profundamente el Impuesto a las Ganancias.' },
  ],
  'ley-24674': [
    { type: 'RELACIONADA', target: 'ley-11683', description: 'Los impuestos internos se determinan, declaran y recaudan dentro del marco de la Ley de Procedimiento Tributario.' },
    { type: 'RELACIONADA', target: 'ley-27430', description: 'La reforma tributaria de la Ley 27.430 modificó el régimen de impuestos internos.' },
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
