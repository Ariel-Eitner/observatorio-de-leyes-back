// ─────────────────────────────────────────────────────────────────────────────
//  STUBS de normas referenciadas pero NO cargadas en detalle.
//  Permiten que las referencias inline (en el texto oficial y las explicaciones)
//  sean clickeables y muestren el NOMBRE completo + link al texto oficial, sin
//  tener que cargar todo el articulado. El front las distingue de las normas
//  cargadas (otro estilo) y abre una ficha mínima con link a InfoLeg.
//
//  Espejo en el front: app/lib/normStubs.ts (mantener idénticos).
//  Cuando una de estas normas se carga de verdad, sale de esta lista.
// ─────────────────────────────────────────────────────────────────────────────

export interface NormStub {
  number: string;   // con punto, p. ej. "17.285"
  name: string;     // nombre completo (sin sigla)
  infolegId?: string; // id interno de InfoLeg, si se conoce (link directo)
}

export const NORM_STUBS: NormStub[] = [
  // Económico / comercial
  { number: '18.425', name: 'Ley de Promoción Comercial' },
  { number: '20.657', name: 'Régimen de la Actividad Comercial de Supermercados', infolegId: '190553' },
  { number: '19.227', name: 'Ley de Mercados de Interés Nacional' },
  { number: '20.680', name: 'Ley de Abastecimiento' },
  { number: '27.545', name: 'Ley de Góndolas' },
  { number: '27.437', name: 'Ley de Compre Argentino y Desarrollo de Proveedores' },
  { number: '18.875', name: 'Ley de Compre Nacional' },
  { number: '26.736', name: 'Ley de Papel Prensa' },
  { number: '27.221', name: 'Ley de Locación de Inmuebles con Fines Turísticos' },
  { number: '25.065', name: 'Ley de Tarjetas de Crédito' },
  { number: '9.643', name: 'Ley de Warrants' },
  { number: '21.799', name: 'Carta Orgánica del Banco de la Nación Argentina' },
  // Reforma del Estado / sociedades
  { number: '13.653', name: 'Ley de Empresas del Estado' },
  { number: '20.705', name: 'Ley de Sociedades del Estado' },
  { number: '23.696', name: 'Ley de Reforma del Estado' },
  { number: '19.550', name: 'Ley General de Sociedades' },
  { number: '24.156', name: 'Ley de Administración Financiera del Estado' },
  { number: '14.499', name: 'Ley de Haberes Jubilatorios' },
  // Trabajo
  { number: '24.013', name: 'Ley Nacional de Empleo' },
  { number: '25.013', name: 'Ley de Reforma Laboral de 1998' },
  { number: '25.323', name: 'Ley de Indemnizaciones Laborales' },
  { number: '25.345', name: 'Ley de Prevención de la Evasión Fiscal' },
  { number: '26.727', name: 'Régimen de Trabajo Agrario' },
  { number: '26.844', name: 'Régimen Especial para el Personal de Casas Particulares' },
  { number: '14.250', name: 'Ley de Convenciones Colectivas de Trabajo' },
  { number: '23.551', name: 'Ley de Asociaciones Sindicales' },
  { number: '14.546', name: 'Estatuto del Viajante de Comercio' },
  { number: '27.555', name: 'Ley de Teletrabajo' },
  { number: '25.877', name: 'Ley de Ordenamiento Laboral' },
  // Comercio exterior
  { number: '25.626', name: 'Ley de Prohibición de Importación de Bienes Usados' },
  // Bioeconomía / regionales
  { number: '26.737', name: 'Ley de Tierras Rurales' },
  { number: '18.600', name: 'Ley de Elaboración de Vinos' },
  { number: '18.770', name: 'Ley del Régimen del Azúcar' },
  { number: '18.905', name: 'Ley de Política Nacional Vitivinícola' },
  { number: '21.608', name: 'Ley de Promoción Industrial' },
  { number: '22.667', name: 'Ley de la Industria Vitivinícola' },
  { number: '27.114', name: 'Ley de Envasado en Origen de la Yerba Mate' },
  { number: '12.916', name: 'Ley de la Corporación Nacional de Olivicultura' },
  { number: '18.859', name: 'Ley de Envases para Alimentación del Ganado' },
  { number: '19.990', name: 'Ley de la Actividad Algodonera' },
  { number: '25.564', name: 'Ley del Instituto Nacional de la Yerba Mate' },
  // Minería / energía
  { number: '24.523', name: 'Ley del Sistema Nacional de Comercio Minero' },
  { number: '24.695', name: 'Ley del Banco Nacional de Información Minera' },
  { number: '27.424', name: 'Ley de Generación Distribuida de Energía Renovable' },
  // Aerocomercial
  { number: '17.285', name: 'Código Aeronáutico' },
  { number: '19.030', name: 'Ley de Política Nacional de Transporte Aerocomercial' },
  { number: '26.412', name: 'Ley de Aerolíneas Argentinas' },
  { number: '26.466', name: 'Ley de Rescate de Aerolíneas Argentinas' },
  // Salud
  { number: '23.660', name: 'Ley de Obras Sociales' },
  { number: '23.661', name: 'Ley del Sistema Nacional del Seguro de Salud' },
  { number: '26.682', name: 'Ley de Medicina Prepaga' },
  { number: '26.906', name: 'Ley de Trazabilidad de Productos Médicos' },
  { number: '27.553', name: 'Ley de Recetas Electrónicas' },
  { number: '17.132', name: 'Ley de Ejercicio de la Medicina' },
  { number: '17.565', name: 'Ley de Farmacias' },
  { number: '27.113', name: 'Ley de Producción Pública de Medicamentos' },
  { number: '25.649', name: 'Ley de Promoción del Medicamento por su Nombre Genérico' },
  // Comunicaciones / deporte / turismo
  { number: '26.522', name: 'Ley de Servicios de Comunicación Audiovisual' },
  { number: '27.078', name: 'Ley Argentina Digital' },
  { number: '20.655', name: 'Ley del Deporte' },
  { number: '18.828', name: 'Ley de Alojamientos Turísticos' },
  { number: '18.829', name: 'Ley de Agentes de Viajes' },
  { number: '26.356', name: 'Ley de Sistemas Turísticos de Tiempo Compartido' },
  // Citadas adicionales (decretos-ley y otras leyes referenciadas por el DNU)
  { number: '6.582', name: 'Régimen Jurídico del Automotor' },
  { number: '14.467', name: 'Régimen Jurídico del Automotor' },
  { number: '12.507', name: 'Política Aeronáutica Nacional' },
  { number: '15.349', name: 'Ley de Sociedades de Economía Mixta' },
  { number: '17.250', name: 'Ley de Cajas Nacionales de Previsión' },
  { number: '23.928', name: 'Ley de Convertibilidad' },
  { number: '24.467', name: 'Ley de Pequeñas y Medianas Empresas' },
  { number: '24.977', name: 'Ley de Monotributo' },
  { number: '25.822', name: 'Ley del Plan Federal de Transporte Eléctrico' },
  { number: '26.529', name: 'Ley de Derechos del Paciente' },
  { number: '26.573', name: 'Ley del ENARD' },
  { number: '26.992', name: 'Ley del Observatorio de Precios' },
];

const byNumber: Record<string, NormStub> = {};
for (const s of NORM_STUBS) byNumber[s.number.replace(/\./g, '')] = s;

/** Devuelve el stub cuyo número coincide (acepta "17.285", "17285" o "Ley 17.285"). */
export function resolveStub(lawCode: string): NormStub | null {
  const m = lawCode.match(/(\d[\d.]*\d|\d)/);
  if (!m) return null;
  return byNumber[m[1].replace(/\./g, '')] ?? null;
}
