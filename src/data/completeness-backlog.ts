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
    // 2026-06-23: cargadas con texto verbatim + explicación + metadata + relaciones; epígrafe por artículo pendiente.
    'ley-25520', 'ley-24059', 'decreto-1023-2001', 'decreto-1112-2024', 'dnu-941-2025',
    // 2026-06-25: gigantes cargadas verbatim (232/197 arts); epígrafe por artículo en tandas.
    'ley-11683', 'ley-24241',
    // 2026-06-25: ola "blind spots" verbatim; epígrafe por artículo en tandas. (26.773 enriquecida → removida)
    'ley-23554', 'ley-27126', 'ley-21526', 'ley-13064', 'ley-5965', 'ley-26993',
    'ley-25212',
    // 2026-06-25: grupo A (alto valor) verbatim; epígrafe por artículo en tandas. (27.348/27.611/27.506 enriquecidas → removidas)
    'ley-27430', 'ley-27349', 'ley-27260', 'ley-26831', 'ley-27440',
    // 2026-06-25: leyes de uso cotidiano (texto actualizado) verbatim; epígrafe por artículo en tandas. (18.345 enriquecida → removida)
    'ley-11723', 'ley-24449', 'ley-23737', 'ley-25871',
    // 2026-06-26: tier verde citadas (financiero/laboral/penal) verbatim; epígrafe en tandas.
    'ley-24083', 'ley-24635', 'ley-25246',
  ]),
  // Artículos sin explicación en lenguaje claro
  sinExplicacion: new Set<string>([
    'const-jujuy', 'const-la-pampa', 'const-la-rioja', 'const-mendoza', 'const-misiones', 'const-neuquen',
    'const-rio-negro', 'const-salta', 'const-san-juan', 'const-san-luis', 'const-santa-cruz', 'const-santa-fe',
    'const-santiago-del-estero', 'const-tierra-del-fuego', 'const-tucuman',
    // 2026-06-25: gigantes cargadas verbatim; explicación por artículo en tandas (como segments).
    'ley-11683', 'ley-24241', 'ley-23554', 'ley-27126', 'ley-21526', 'ley-13064', 'ley-5965', 'ley-26993',
    'ley-25212',
    // 2026-06-25: grupo A (alto valor) verbatim; explicación por artículo en tandas. (27.348/27.611/27.506 enriquecidas → removidas)
    'ley-27430', 'ley-27349', 'ley-27260', 'ley-26831', 'ley-27440',
    // 2026-06-25: leyes de uso cotidiano (texto actualizado) verbatim; explicación por artículo en tandas. (18.345 enriquecida → removida)
    'ley-11723', 'ley-24449', 'ley-23737', 'ley-25871',
    // 2026-06-26: tier verde citadas (financiero/laboral/penal) verbatim; explicación en tandas.
    'ley-24083', 'ley-24635', 'ley-25246',
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
    'ley-9643', 'ley-20655', 'ley-17565', 'ley-25564', 'ley-23551', 'ley-27437', 'ley-19030', 'ley-21608', 'ley-22667', 'ley-26736', 'ley-26737', 'ley-27113', 'ley-14499', 'ley-15336', 'ley-27098', 'ley-22285', 'ley-19990', 'ley-24557', 'ley-17520', 'ley-24714', 'ley-20321', 'ley-27007', 'ley-14878', 'ley-18248', 'ley-26940', 'ley-26739', 'ley-14786', 'ley-26190', 'ley-24185', 'ley-18829', 'decreto-ley-15349-1946', 'decreto-ley-12507-1956',
    // DIFERIDAS (ord fraccionario/anexo → normalizar ord antes de cargar índice)
    'ley-26061', 'ley-26206', 'ley-24977', 'decreto-93-2026', 'decreto-151-2022', 'ley-13653', 'ley-26529',
    // 2026-06-23: recién cargadas. 25520 y 941 tienen bis (ord fraccionario → DIFERIDAS);
    //   24059/1023/1112 tienen títulos en la fuente, índice pendiente de cargar.
    'ley-25520', 'dnu-941-2025', 'ley-24059', 'decreto-1023-2001', 'decreto-1112-2024',
    // 2026-06-24: Ley 26.388 (Delitos Informáticos) — modificatoria plana del Código Penal (15 arts, sin capítulos).
    'ley-26388',
    // 2026-06-25: Ley 11.683 (t.o. 1998) — DIFERIDA: 29 artículos "sin número" (ord fraccionario 3.1, 4.1…) rompen ord==número.
    // 2026-06-25: Ley 24.241 (SIJP) — DIFERIDA: artículos "bis" (ord fraccionario 22.5, 27.5…) rompen ord==número.
    'ley-11683', 'ley-24241',
    // 2026-06-25: ola blind spots — 26.773 PLANA; 23.554/21.526/13.064/5965/26993 con capítulos (índice pendiente); 27.126 modificatoria.
    'ley-26773', 'ley-23554', 'ley-27126', 'ley-21526', 'ley-13064', 'ley-5965', 'ley-26993',
    // 2026-06-25: Ley 25.212 (Pacto Federal del Trabajo) — DIFERIDA: numeración reinicia por ANEXO (ord 1001/2001…) → ord != número.
    'ley-25212',
    // 2026-06-25: grupo A — tienen estructura (títulos/capítulos) y ord==número; índice cargable, pendiente de cargar.
    'ley-27430', 'ley-27348', 'ley-27611', 'ley-27349', 'ley-27506', 'ley-27260', 'ley-26831', 'ley-27440',
    // 2026-06-25: cotidianas — DIFERIDAS: artículos "bis" (ord fraccionario) y derogados (huecos) rompen ord==número.
    'ley-11723', 'ley-24449', 'ley-23737', 'ley-25871', 'ley-18345',
    // 2026-06-26: tier verde — 24.083/25.246 con bis (ord fraccionario); 24.635 con índice pendiente.
    'ley-24083', 'ley-24635', 'ley-25246',
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
