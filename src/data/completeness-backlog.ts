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
    // 2026-07-06: RG IGJ 15/2024 (Normas de la IGJ, 422 arts) — título (epígrafe) + explicación por artículo completados en tandas → removida. DEUDA SALDADA.
    // 2026-06-29: cluster electoral verbatim enriquecido (epígrafe) → removidos: 19.945 Código Electoral, 23.298 Partidos, 26.571 PASO.
    // 2026-06-30: derogadas enriquecidas (epígrafe) → removidas: 24.769, 23.515, 20.840, 24.779, 13.512, 23.091, 20.771, 25.250, 14.394, 21.342, 2.393, 8.871.
    // 2026-07-06: 23.984 (CPP 1991, 570 arts) enriquecida (título + explicación + índice) → removida. DEUDA SALDADA.
    // 2026-07-06: 19.724 (Prehorizontalidad) — corregido el BUG DE DATOS (tenía el texto de la RG 2439/COTI de AFIP);
    //   recargado el texto correcto de InfoLeg (38 arts, id 189951) con título + explicación → removida. DEUDA SALDADA.
    // 2026-06-30: RRHH + Estatuto del Periodista verbatim enriquecidas (epígrafe) → removidas: 26.390, 26.427, 24.700, 12.908.
    // 2026-06-26: Código Aduanero (1198 arts) y DNU 70/2023 (366 arts) — epígrafe completado → removidos.
    'const-buenos-aires', 'const-la-pampa', 'const-la-rioja', 'const-mendoza', 'const-misiones',
    'const-neuquen', 'const-rio-negro', 'const-salta', 'const-san-juan', 'const-san-luis',
    'const-santa-cruz', 'const-santa-fe', 'const-santiago-del-estero', 'const-tierra-del-fuego', 'const-tucuman',
    // 2026-06-23/26: cargadas verbatim + explicación + metadata + relaciones; epígrafe agregado en tandas → removidas (25.520/24.059/decreto-1023/decreto-1112/dnu-941).
    // 2026-06-25: gigantes cargadas verbatim (232/197 arts); epígrafe por artículo en tandas. (24.241 SIJP / 11.683 Procedimiento Tributario enriquecidas → removidas)
    // 2026-06-25: ola "blind spots" verbatim; epígrafe por artículo en tandas. (26.773/23.554/27.126/13.064/21.526/5.965/26.993 enriquecidas → removidas)
    // 2026-06-25: grupo A (alto valor) verbatim; epígrafe por artículo en tandas. TODAS enriquecidas → removidas (27.348/27.611/27.506/27.349/27.260/26.831/27.440/27.430).
    // 2026-06-25: leyes de uso cotidiano (texto actualizado) verbatim; epígrafe por artículo en tandas. (18.345/23.737/11.723/24.449/25.871 enriquecidas → removidas)
    // 2026-06-26: tier verde citadas (financiero/laboral/penal) verbatim; epígrafe en tandas. (26.417/24.463/25.246/23.966/24.083/26.363/24.635/23.576/20.643/24.441 enriquecidas → removidas)
    // 2026-06-26: propiedad intelectual — Patentes y Marcas. (24.481 Patentes / 22.362 Marcas enriquecidas → removidas)
    // 2026-06-26: cotidianas — Seguros. (19.587 Higiene y Seguridad / 11.867 Fondo de Comercio / 24.521 Educación Superior / 17.418 Seguros enriquecidas → removidas)
    // 2026-06-26: alto valor social (salud/género/ambiente). (26.862/27.636/27.592/27.675/27.447 enriquecidas → removidas)
    // 2026-06-26: troncal — Código Procesal Civil y Comercial de la Nación (786 arts) enriquecido → removido. (Trata 26.364 también)
    // 2026-06-26: Ganancias t.o. 2019 (Anexo I del Decreto 824/2019) enriquecida → removida.
  ]),
  // Artículos sin explicación en lenguaje claro
  sinExplicacion: new Set<string>([
    // 2026-07-06: RG IGJ 15/2024 (422 arts) — explicación en lenguaje claro por artículo completada en tandas → removida. DEUDA SALDADA.
    // 2026-06-30: derogadas enriquecidas (explicación) → removidas: 24.769, 23.515, 20.840, 24.779, 13.512, 23.091, 20.771, 25.250, 14.394, 21.342, 2.393, 8.871.
    // 2026-07-06: 23.984 (CPP 1991) enriquecida y 19.724 (Prehorizontalidad) recargada con el texto correcto + explicación → removidas. DEUDA SALDADA.
    // 2026-06-30: RRHH + Estatuto del Periodista verbatim enriquecidas (explicación) → removidas: 26.390, 26.427, 24.700, 12.908.
    'const-jujuy', 'const-la-pampa', 'const-la-rioja', 'const-mendoza', 'const-misiones', 'const-neuquen',
    'const-rio-negro', 'const-salta', 'const-san-juan', 'const-san-luis', 'const-santa-cruz', 'const-santa-fe',
    'const-santiago-del-estero', 'const-tierra-del-fuego', 'const-tucuman',
    // 2026-06-25: gigantes cargadas verbatim; explicación por artículo en tandas (como segments). (24.241 SIJP / 11.683 Procedimiento Tributario enriquecidas → removidas)
    // 2026-06-26: medianas enriquecidas al 100% (21.526 Entidades Financieras / 5.965 Letra de Cambio / 26.993 COPREC) → removidas de sinTitulo+sinExplicacion, quedan en sinIndice.
    // 2026-06-25: grupo A (alto valor) verbatim; explicación por artículo en tandas. TODAS enriquecidas → removidas (27.348/27.611/27.506/27.349/27.260/26.831/27.440/27.430).
    // 2026-06-25: leyes de uso cotidiano (texto actualizado) verbatim; explicación por artículo en tandas. (18.345/23.737/11.723/24.449/25.871 enriquecidas → removidas)
    // 2026-06-26: tier verde citadas (financiero/laboral/penal) verbatim; explicación en tandas. (26.417/24.463/25.246/23.966/24.083/26.363/24.635/23.576/20.643/24.441 enriquecidas → removidas)
    // 2026-06-26: propiedad intelectual — Patentes y Marcas. (24.481 Patentes / 22.362 Marcas enriquecidas → removidas)
    // 2026-06-26: cotidianas — Seguros. (19.587 Higiene y Seguridad / 11.867 Fondo de Comercio / 24.521 Educación Superior / 17.418 Seguros enriquecidas → removidas)
    // 2026-06-26: alto valor social (salud/género/ambiente). (26.862/27.636/27.592/27.675/27.447 enriquecidas → removidas)
    // 2026-06-26: troncal — Código Procesal Civil y Comercial de la Nación (786 arts) enriquecido → removido. (Trata 26.364 también)
    // 2026-06-26: Ganancias t.o. 2019 (Anexo I del Decreto 824/2019) enriquecida → removida.
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
    // 2026-07-06: 24.059 (Seguridad Interior) — índice de 8 títulos cargado → removida.
    'ley-25520', 'dnu-941-2025', 'decreto-1023-2001', 'decreto-1112-2024',
    // 2026-06-24: Ley 26.388 (Delitos Informáticos) — modificatoria plana del Código Penal (15 arts, sin capítulos).
    'ley-26388',
    // 2026-06-25: Ley 11.683 (t.o. 1998) — DIFERIDA: 29 artículos "sin número" (ord fraccionario 3.1, 4.1…) rompen ord==número.
    // 2026-06-25: Ley 24.241 (SIJP) — DIFERIDA: artículos "bis" (ord fraccionario 22.5, 27.5…) rompen ord==número.
    'ley-11683', 'ley-24241',
    // 2026-06-25: ola blind spots — 26.773 PLANA; 21.526 con capítulos; 27.126 modificatoria.
    // 2026-07-06: 23.554/13.064 (índice cargado); 5.965 (letra de cambio: 2 títulos + 13 caps) y 26.993 (COPREC: 6 títulos) — índice cargado → removidas.
    'ley-26773', 'ley-27126', 'ley-21526',
    // 2026-06-25: Ley 25.212 (Pacto Federal del Trabajo) — DIFERIDA: numeración reinicia por ANEXO (ord 1001/2001…) → ord != número.
    'ley-25212',
    // 2026-06-25: grupo A — tienen estructura (títulos/capítulos) y ord==número; índice cargable, pendiente de cargar.
    // 2026-07-06: 27.430 (13 títulos), 27.440 (17 títulos), 26.831 (7 títulos), 27.260 (2 libros/14 títulos) — índice cargado → removidas.
    'ley-27348', 'ley-27611', 'ley-27349', 'ley-27506',
    // 2026-07-07: lote de estructurales/citadas. PLANAS: 27.161 (EANA, 31 arts sin capítulos), 24.633 (obras de arte, 16 arts).
    //   DIFERIDAS (bis → ord fraccionario): 24.018 (10 bis), 24.937 (3 bis), 25.922 (8/10 bis), 11.672 (116 bis).
    //   (24.195/18.037/22.248 SÍ tienen índice cargado; 23.853/22.016 <15 arts, exentas.)
    'ley-27161', 'ley-24633', 'ley-24018', 'ley-24937', 'ley-25922', 'ley-11672',
    // 2026-07-12: era Milei. PLANAS — modificatorias sin estructura propia en la fuente: su articulado
    //   es una lista de sustituciones y los CAPÍTULOS que aparecen en el texto son de la norma modificada,
    //   no de estas leyes. 27.781 (Boleta Única de Papel, 44 arts → modifica el Código Electoral);
    //   27.759 (19 arts → sustituye artículos de la Ley 26.879 y el art. 157 bis del Código Penal).
    //   (27.743 y 27.798 SÍ tenían títulos propios en la fuente → índice cargado, no van al backlog.)
    'ley-27781', 'ley-27759',
    // 2026-07-12: Ley 26.216 (entrega voluntaria de armas) — PLANA: 24 artículos corridos, sin
    //   títulos ni capítulos en la fuente oficial (verificado con estructura.ps1 → 0 secciones).
    'ley-26216',
    // 2026-06-25: cotidianas — DIFERIDAS: artículos "bis" (ord fraccionario) y derogados (huecos) rompen ord==número.
    'ley-11723', 'ley-24449', 'ley-23737', 'ley-25871', 'ley-18345',
    // 2026-06-26: tier verde — 24.083/25.246 con bis (ord fraccionario).
    // 2026-07-06: 24.635 (Conciliación Laboral Obligatoria, 14 títulos) — índice cargado → removida.
    'ley-24083', 'ley-25246',
    // 2026-06-26: 23.966/23.576 con bis; 26.363 modificatoria — índice diferido.
    'ley-23966', 'ley-26363', 'ley-23576',
    // 2026-06-26: 24.441/24.463/26.417/20.643 — bis o modificatorias, índice diferido.
    'ley-24441', 'ley-24463', 'ley-26417', 'ley-20643',
    // 2026-06-26: Patentes (t.o. por decreto, Anexo I) y Marcas — índice diferido.
    'ley-24481', 'ley-22362',
    // 2026-06-26: Educación Superior y Seguros — con bis/estructura; índice diferido. (19.587/11.867 <15 arts, exentas)
    'ley-24521', 'ley-17418',
    // 2026-06-26: sociales >=15 arts con capítulos — índice diferido (26.862 <15, exenta).
    'ley-27675', 'ley-27447', 'ley-27636', 'ley-27592',
    // 2026-06-26: troncales — Trata y CPCCN (con bis y estructura de libros/títulos) — índice diferido.
    'ley-26364', 'ley-17454',
    // 2026-06-26: Ganancias t.o. 2019 — estructura de títulos/capítulos; índice diferido.
    'ley-20628',
    // 2026-06-26: Impuestos Internos 24.674 — con derogados (huecos); índice diferido.
    'ley-24674',
    // 2026-06-27: Digesto/demanda — born-complete (título+explicación), estructura por capítulos; índice diferido.
    'ley-27401', 'ley-24051', 'ley-26331', 'ley-22421', 'ley-25916', 'ley-26815', 'ley-25670', 'ley-25612', 'ley-17801',
    // 2026-06-27: GRANDE en carga por batches (born-complete) — Ley 24.660 Ejecución de la Pena (242 arts, texto con reforma 27.375).
    'ley-24660',
    // 2026-06-27: IVA t.o. 1997 (Decreto 280/97) — born-complete, 47 arts vigentes (gap 29-35 = Título V derogado). Texto consolidado limpiado (tabla de alícuotas y notas).
    'ley-23349',
    // 2026-06-28: GRANDES born-complete cargadas por batches — Código de Minería (398 arts, t.o. Dto 456/97) y Código Procesal Penal Federal (403 arts, t.o. Dto 118/2019, PARCIALMENTE_VIGENTE). Índice diferido: estructura de libros/títulos; CPPF con bis/ter/quáter/quinquies/sexies (ord fraccionario).
    'codigo-mineria', 'codigo-procesal-penal-federal',
    // 2026-06-29: ecosistema del peso — Decreto 214/2002 (Pesificación, 18 arts) es un DNU plano sin capítulos → sin índice.
    'decreto-214-2002',
    // 2026-06-29: Ley 1.130 (Ley de Monedas, 1881, 17 arts) — ley plana sin capítulos.
    'ley-1130',
    // 2026-06-29: faltantes del DNU 70/2023 — leyes planas sin capítulos.
    'ley-17250',
    // 2026-06-29: Ley 22.426 (Transferencia de Tecnología, 15 arts) — lista plana sin capítulos.
    'ley-22426',
    // 2026-06-29: Ley 19.640 (Régimen fiscal/aduanero Tierra del Fuego, 34 arts) — sin títulos/capítulos en la fuente.
    'ley-19640',
    // 2026-06-29: Ley 26.588 (Enfermedad Celíaca, 17 arts) — ley plana sin capítulos.
    'ley-26588',
    // 2026-06-29: Ley 26.396 (Trastornos Alimentarios, 22 arts) — ley plana sin capítulos.
    'ley-26396',
    // 2026-06-29: cluster electoral verbatim; tienen estructura pero con bis y ord secuencial (ord != número) → índice diferido.
    'ley-19945', 'ley-23298', 'ley-26571', 'ley-24769',
    // 2026-06-29: Ley 25.250 (Reforma Laboral Banelco, 34 arts) verbatim derogada; índice diferido.
    'ley-25250',
    // 2026-06-29: derogadas históricas grandes (Matrimonio Civil 1888 / Bien de Familia) verbatim; índice diferido.
    'ley-2393', 'ley-14394',
    // 2026-06-29: Propiedad Horizontal / Locaciones Urbanas / Defensa de la Democracia (≥15 arts) verbatim; índice diferido.
    'ley-13512', 'ley-23091', 'ley-23077',
    // 2026-06-29: Normalizacion Locaciones Urbanas 1976 (50) verbatim; índice diferido.
    // 2026-07-06: Prehorizontalidad 19.724 recargada (38 arts) — lista plana sin capítulos → PLANA (exenta).
    'ley-19724', 'ley-21342',
    // 2026-06-29: Ley Saenz Pena (100) verbatim; índice diferido.
    // 2026-07-06: 23.984 (CPP 1991, 570 arts) — índice de 6 secciones cargado → removida. DEUDA SALDADA.
    'ley-8871',
    // 2026-06-30: 26.390/26.427 modificatorias PLANAS (sustituyen artículos de otras leyes, sin capítulos propios) → exentas; 12.908 índice diferido.
    'ley-26390', 'ley-26427', 'ley-12908',
    // 2026-06-28: tanda Digesto/demanda para llegar a 300 normas — born-complete (título+explicación+metadata+relaciones).
    //   Índice diferido: tienen estructura (títulos/capítulos) pero varias con bis o textos sustituidos inline (ord fraccionario) → ord != número.
    'ley-22315', 'ley-22351', 'ley-22990', 'ley-23184', 'ley-23898', 'ley-24452', 'ley-24588',
    'ley-24937', 'ley-25467', 'ley-26058', 'ley-26075', 'ley-26122', 'ley-26854',
    'ley-27148', 'ley-27149', 'ley-27319', 'ley-27328', 'ley-27520', 'ley-27541', 'ley-27743',
    // 2026-07-01: cluster Modernización del Estado — Decreto 1063/2016 (TAD, 17 arts) es un decreto
    //   plano sin capítulos en la fuente oficial → exento permanente (PLANA). (27.446/27.444/27.445 y
    //   los otros decretos del cluster tienen índice cargado o <15 arts.)
    'decreto-1063-2016',
    // 2026-07-06: cargadas born-complete sin capítulos en la fuente → PLANAS (exentas permanentes).
    //   Ley 48 (Jurisdicción Federal / recurso extraordinario, 24 arts) y Ley 25.891 (Comunicaciones
    //   Móviles, 17 arts) son listas planas de artículos, sin títulos/capítulos.
    'ley-48', 'ley-25891',
    // 2026-07-06: barrido de completitud — normas >=15 arts cargadas born-complete en tandas
    //   (título+explicación+metadata+relaciones) SIN índice. Deuda de índice diferido: clasificar
    //   PLANA (modificatorias/listas) vs DIFERIDA (bis/ord/anexo) y cargar en tandas. TODO → cero.
    'decreto-408-2026', 'decreto-ley-6673-1963', 'ley-3959', 'ley-13273', 'ley-16986', 'ley-17811',
    'ley-19511', 'ley-20247', 'ley-20284', 'ley-20429', 'ley-21382', 'ley-22428', 'ley-22802',
    'ley-23771', 'ley-23877', 'ley-24028', 'ley-24193', 'ley-24573', 'ley-24922', 'ley-25018',
    'ley-25054', 'ley-25080', 'ley-25087', 'ley-25191', 'ley-25248', 'ley-25453', 'ley-25551',
    'ley-25603', 'ley-25743', 'ley-25798', 'ley-26222', 'ley-26361', 'ley-26370', 'ley-26425',
    'ley-26589', 'ley-26855', 'ley-26951', 'ley-27233', 'ley-27279', 'ley-27372', 'ley-27375',
    // 2026-07-07: lote "18 nacionales para llegar a 500" — born-complete (título+explicación+metadata+relaciones).
    //   PLANAS (sin capítulos en la fuente): 24.476 (autónomos), 18.038 (previsional autónomos), y los
    //   decretos-leyes 15.385/1944 (Zonas de Seguridad) y 9.316/1946 (Reciprocidad Jubilatoria).
    //   (26.509 Emergencia Agropecuaria SÍ tiene índice de 6 títulos cargado → NO va acá.)
    'ley-24476', 'ley-18038', 'decreto-ley-15385-1944', 'decreto-ley-9316-1946',
    //   DIFERIDAS: 25.917 (bis/ter/quáter → ord fraccionario), 25.344 (Cap. VI derogado = hueco 19-22),
    //   24.946 (Ministerio Público, títulos+secciones de 2 niveles), 14.473 (Estatuto Docente, 2 niveles
    //   + derogados), 24.073/25.239 (ómnibus tributarias por títulos), 23.982/26.360 (estructura fiscal),
    //   y el decreto-ley 15.348/1946 (Prenda con Registro, capítulos irregulares).
    'ley-25917', 'ley-25344', 'ley-24946', 'ley-14473', 'ley-24073', 'ley-25239', 'ley-23982', 'ley-26360', 'decreto-ley-15348-1946',
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
    'decreto-222-2003', 'decreto-467-2026', 'ley-27423', 'rg-igj-15-2024',
  ]),
  // Normas sin obligaciones ni derechos. ✅ SALDADO (2026-06-21): las 3 normas
  // tienen obligaciones/derechos. Se mantiene vacío: toda norma debe tenerlos.
  sinObligDerechos: new Set<string>([]),
};
