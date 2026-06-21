/**
 * LIBRO DE DEUDA de completitud (grandfathering).
 *
 * Cada norma listada acá está PENDIENTE de completar ese campo. El
 * `completeness.spec` EXIGE el campo a TODA norma que NO esté en la lista
 * (incluidas las nuevas) y queda verde mientras la deuda se salda.
 *
 * REGLA: al recompletar una norma, BORRARLA de la lista. El objetivo es que
 * estas listas lleguen a cero. No agregar normas nuevas acá: una norma nueva
 * debe nacer completa.
 */
export const COMPLETENESS_BACKLOG = {
  // Artículos sin título (epígrafe)
  sinTitulo: new Set<string>([
    'codigo-aduanero', 'dnu-70-2023',
    'const-buenos-aires', 'const-la-pampa', 'const-la-rioja', 'const-mendoza', 'const-misiones',
    'const-neuquen', 'const-rio-negro', 'const-salta', 'const-san-juan', 'const-san-luis',
    'const-santa-cruz', 'const-santa-fe', 'const-santiago-del-estero', 'const-tierra-del-fuego', 'const-tucuman',
  ]),
  // Artículos sin explicación en lenguaje claro
  sinExplicacion: new Set<string>([
    'const-jujuy', 'const-la-pampa', 'const-la-rioja', 'const-mendoza', 'const-misiones', 'const-neuquen',
    'const-rio-negro', 'const-salta', 'const-san-juan', 'const-san-luis', 'const-santa-cruz', 'const-santa-fe',
    'const-santiago-del-estero', 'const-tierra-del-fuego', 'const-tucuman',
  ]),
  // Normas >= INDICE_MIN_ARTS arts sin índice (norm_sections). Se dividen en:
  //  • PLANAS: sin estructura de capítulos/títulos en la fuente oficial (modificatorias o
  //    listas planas) → exentas permanentes, no necesitan índice.
  //  • DIFERIDAS: ord fraccionario/anexo → el índice se ancla por ord y no coincide con el
  //    número; hay que normalizar ord antes de cargarlo.
  // 2026-06-21: cargado índice de 10 normas (removidas de acá): ley-25326, carta-onu, ley-26485,
  //   ley-27275, convencion-derechos-nino, ley-27642, ley-25065, ley-27802, ley-26682, ley-27799.
  //   (Las <15 arts se quitaron: el spec no las exige.)
  sinIndice: new Set<string>([
    // PLANAS (sin capítulos en la fuente) — exentas permanentes
    'ley-14546', 'ley-18875', 'ley-23798', 'ley-24788', 'ley-26618', 'ley-26743', 'ley-27553',
    'ley-27610', 'ley-26842', 'ley-23660', 'ley-20680', 'ley-27545', 'ley-19032', 'ley-27555',
    // DIFERIDAS (ord fraccionario/anexo → normalizar ord antes de cargar índice)
    'ley-26061', 'ley-26206', 'ley-24977', 'decreto-93-2026', 'decreto-151-2022', 'ley-13653', 'ley-26529',
  ]),
  // Normas sin segments (párrafos). NO bloquea CI (es enriquecimiento), se reporta en audit:coverage.
  sinSegments: new Set<string>([
    'ley-25649', 'ley-20705', 'const-chaco', 'const-entre-rios', 'const-jujuy', 'const-la-rioja', 'const-misiones',
    'const-rio-negro', 'const-san-juan', 'const-santa-cruz', 'ley-26992', 'ley-18875', 'ley-25013', 'ley-14546',
    'ley-23052', 'const-caba', 'const-catamarca', 'const-chubut', 'const-cordoba', 'const-corrientes', 'const-formosa',
    'const-la-pampa', 'const-mendoza', 'const-neuquen', 'const-salta', 'const-san-luis', 'const-santa-fe',
    'const-santiago-del-estero', 'const-tierra-del-fuego', 'ley-27150', 'const-tucuman', 'codigo-civil-comercial',
    'ley-27742', 'ley-24417', 'ley-25929', 'ley-25561', 'ley-27130', 'ley-25675', 'ley-22431', 'ley-23302', 'ley-23277',
    'ley-27553', 'ley-24788', 'ley-25673', 'ley-26150', 'ley-23798', 'ley-27350', 'ley-23928', 'ley-26160', 'ley-13653',
    'decreto-222-2003', 'decreto-467-2026', 'ley-27423',
  ]),
  // Normas sin obligaciones ni derechos. ✅ SALDADO (2026-06-21): las 3 normas
  // tienen obligaciones/derechos. Se mantiene vacío: toda norma debe tenerlos.
  sinObligDerechos: new Set<string>([]),
};
