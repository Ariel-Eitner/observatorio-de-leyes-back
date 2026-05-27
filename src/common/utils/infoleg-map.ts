// Mapa de IDs Infoleg para las leyes nacionales del Observatorio
// Fuente: datos.jus.gob.ar — base-infoleg-normativa-nacional (actualización abril 2026)
// URL de Infoleg: INFOLEG_BASE_URL + infolegId
//
// digestoAnexo: 'I' = vigente en Digesto (Ley 26.939), 'II' = derogada, 'post_digesto' = sancionada después de 2014
// digestoCategoria: código de categoría del Digesto (ACU, ADM, AED, ASA, ASE, ASO, B–Z)

export const INFOLEG_BASE_URL = 'http://servicios.infoleg.gob.ar/infolegInternet/verVinculos.do?modo=2&id=';

// Categorías del Digesto Jurídico Argentino (Ley 26.939)
export const DIGESTO_CATEGORIAS: Record<string, string> = {
  ACU: 'Administrativo Cultura',
  ADM: 'Administrativo',
  AED: 'Administrativo Educación',
  ASA: 'Administrativo Salud',
  ASE: 'Administrativo Seguridad',
  ASO: 'Administrativo Social',
  B: 'Aduanero',
  C: 'Aeronáutico',
  D: 'Bancario',
  E: 'Civil',
  F: 'Comercial',
  G: 'Comunitario',
  H: 'Constitucional',
  I: 'De la Comunicación',
  J: 'Diplomático y Consular',
  K: 'Económico',
  L: 'Impositivo',
  M: 'Industrial',
  N: 'Internacional Privado',
  O: 'Internacional Público',
  P: 'Laboral',
  Q: 'Medio Ambiente',
  R: 'Militar',
  S: 'Penal',
  T: 'Político',
  U: 'Procesal Civil y Comercial',
  V: 'Procesal Penal',
  W: 'Público, Provincial y Municipal',
  X: 'Recursos Naturales',
  Y: 'Seguridad Social',
  Z: 'Transporte y Seguros',
};

export interface InfolegEntry {
  infolegId: number;
  titulo: string;
  fechaSancion: string | null;
  digestoAnexo: 'I' | 'II' | 'post_digesto' | null;
  digestoCategoria: string | null;
}

export const INFOLEG_MAP: Record<string, InfolegEntry> = {
  // Leyes anteriores al Digesto (2014) — clasificadas en Anexo I o II
  'codigo-penal':           { infolegId: 16546,  titulo: 'SU APROBACION',                                                                     fechaSancion: '1921-09-30', digestoAnexo: 'I',  digestoCategoria: 'S' },
  'ley-11544':              { infolegId: 63368,  titulo: 'REGIMEN LEGAL',                                                                      fechaSancion: '1929-08-29', digestoAnexo: 'I',  digestoCategoria: 'P' },
  'ley-20744':              { infolegId: 25552,  titulo: 'REGIMEN',                                                                            fechaSancion: '1974-09-05', digestoAnexo: 'I',  digestoCategoria: 'P' },
  'ley-22278':              { infolegId: 114167, titulo: 'REGIMEN PENAL',                                                                      fechaSancion: '1980-08-25', digestoAnexo: 'I',  digestoCategoria: 'S' },
  'codigo-aduanero':        { infolegId: 16536,  titulo: 'SU APROBACION',                                                                      fechaSancion: '1981-02-05', digestoAnexo: 'I',  digestoCategoria: 'B' },
  'ley-23592':              { infolegId: 20465,  titulo: 'MEDIDAS CONTRA ACTOS DISCRIMINATORIOS',                                              fechaSancion: '1988-08-03', digestoAnexo: 'I',  digestoCategoria: 'H' },
  'ley-24240':              { infolegId: 638,    titulo: 'REGIMEN LEGAL',                                                                      fechaSancion: '1993-09-22', digestoAnexo: 'I',  digestoCategoria: 'F' },
  'constitucion-nacional':  { infolegId: 804,    titulo: 'ORDENA SU PUBLICACION',                                                              fechaSancion: '1994-12-14', digestoAnexo: 'I',  digestoCategoria: 'H' },
  'ley-25326':              { infolegId: 64790,  titulo: 'REGIMEN LEGAL',                                                                      fechaSancion: '2000-10-04', digestoAnexo: 'I',  digestoCategoria: 'ADM' },
  'ley-26061':              { infolegId: 110778, titulo: 'DISPOSICIONES GENERALES',                                                            fechaSancion: '2005-09-28', digestoAnexo: 'I',  digestoCategoria: 'ASO' },
  'ley-26206':              { infolegId: 123542, titulo: 'SISTEMA EDUCATIVO NACIONAL',                                                         fechaSancion: '2006-12-14', digestoAnexo: 'I',  digestoCategoria: 'AED' },
  'ley-26485':              { infolegId: 152155, titulo: 'LEY PARA PREVENIR, SANCIONAR Y ERRADICAR LA VIOLENCIA',                              fechaSancion: '2009-03-11', digestoAnexo: 'I',  digestoCategoria: 'ASO' },
  'ley-26618':              { infolegId: 169608, titulo: 'CODIGO CIVIL, LEYES 26.413 Y 18.248 - MODIFICACION',                                 fechaSancion: '2010-07-15', digestoAnexo: 'I',  digestoCategoria: 'E'   },
  'ley-26639':              { infolegId: 174117, titulo: 'PRESERVACION DE LOS GLACIARES Y DEL AMBIENTE PERIGLACIAL',                           fechaSancion: '2010-09-30', digestoAnexo: 'I',  digestoCategoria: 'Q' },
  'ley-26657':              { infolegId: 175977, titulo: 'DERECHO A LA PROTECCION DE LA SALUD MENTAL',                                         fechaSancion: '2010-11-25', digestoAnexo: 'I',  digestoCategoria: 'ASA' },
  'ley-26743':              { infolegId: 197860, titulo: 'DERECHO DE LAS PERSONAS - ESTABLECESE',                                              fechaSancion: '2012-05-09', digestoAnexo: 'I',  digestoCategoria: 'E'   },
  'ley-26939':              { infolegId: 231154, titulo: 'DIGESTO JURIDICO ARGENTINO - APROBACION',                                            fechaSancion: '2014-05-21', digestoAnexo: 'I',  digestoCategoria: 'ADM' },
  // Leyes sancionadas después del Digesto (post_digesto = no clasificadas)
  'codigo-civil-comercial': { infolegId: 235975, titulo: 'APROBACION',                                                                         fechaSancion: '2014-10-01', digestoAnexo: 'post_digesto', digestoCategoria: null },
  'ley-27150':              { infolegId: 248181, titulo: 'IMPLEMENTACION',                                                                     fechaSancion: '2015-06-10', digestoAnexo: 'post_digesto', digestoCategoria: null },
  'ley-27275':              { infolegId: 265949, titulo: 'OBJETO. EXCEPCIONES. ALCANCES.',                                                     fechaSancion: '2016-09-14', digestoAnexo: 'post_digesto', digestoCategoria: null },
  'ley-27499':              { infolegId: 318666, titulo: 'CAPACITACION OBLIGATORIA EN LA TEMATICA DE GENERO Y VIOLENCIA CONTRA LAS MUJERES',   fechaSancion: '2018-12-19', digestoAnexo: 'post_digesto', digestoCategoria: null },
  'ley-27610':              { infolegId: 346231, titulo: 'DISPOSICIONES',                                                                      fechaSancion: '2020-12-30', digestoAnexo: 'post_digesto', digestoCategoria: null },
  'ley-27642':              { infolegId: 356607, titulo: 'DISPOSICIONES GENERALES',                                                            fechaSancion: '2021-10-26', digestoAnexo: 'post_digesto', digestoCategoria: null },
  'ley-27742':              { infolegId: 401266, titulo: 'DISPOSICIONES',                                                                      fechaSancion: '2024-06-27', digestoAnexo: 'post_digesto', digestoCategoria: null },
  'ley-27801':              { infolegId: 423722, titulo: 'DISPOSICIONES',                                                                      fechaSancion: '2026-02-27', digestoAnexo: 'post_digesto', digestoCategoria: null },
  'ley-27802':              { infolegId: 423680, titulo: 'DISPOSICIONES',                                                                      fechaSancion: '2026-02-27', digestoAnexo: 'post_digesto', digestoCategoria: null },
};
