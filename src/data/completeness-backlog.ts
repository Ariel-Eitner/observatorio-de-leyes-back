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
    // 2026-07-13: rango 27.700–27.740. PLANAS — articulado corrido, 0 secciones en la fuente oficial.
    //   27.713 (Cardiopatías Congénitas, 15 arts) y 27.726 (PROGRESAR, 27 arts).
    //   (27.715, 27.701, 27.712 y 27.734 SÍ tenían estructura propia → índice cargado, no van acá.)
    //   OJO: 27.712 y 27.734 estuvieron acá por error. `estructura.ps1` buscaba solo "CAPÍTULO" en
    //   mayúsculas y estas leyes lo escriben "Capítulo": daba 0 secciones y parecían planas. El script
    //   ya usa (?i); si una ley "plana" te sorprende, re-verificala.
    'ley-27713', 'ley-27726',
    // 2026-07-14: rango 27.xxx, ola de sustantivas. PLANAS — solo epígrafes por artículo, sin
    //   TÍTULO/CAPÍTULO propios (estructura.ps1 → 0). 27.159 (Muerte Súbita, 18 arts) y 27.491 (Control
    //   de Enfermedades Prevenibles por Vacunación, 36 arts).
    'ley-27159', 'ley-27491',
    // 2026-07-14: 18.711 (Misiones y funciones de las fuerzas de seguridad, 23 arts): articulado corrido,
    //   sin TÍTULO/CAPÍTULO propios. Cargada como madre del caso Gendarmería (arts. 2-6 derogados por el
    //   Decreto 454/2025). PARCIALMENTE_VIGENTE.
    'ley-18711',
    // 2026-07-13: rango 27.000–27.999. PLANA — la 27.617 (Ganancias: piso salarial, aguinaldo exento y
    //   deducciones) tiene 15 arts pero es modificatoria: su articulado es una lista de sustituciones a
    //   la Ley 20.628 y no tiene estructura propia (verificado con estructura.ps1 → 0 secciones).
    'ley-27617',
    // 2026-07-13: rango 27.000–27.999. PLANA — la 27.304 (Ley del Arrepentido) tiene 19 arts corridos,
    //   sin títulos ni capítulos en la fuente oficial (verificado con estructura.ps1 → 0 secciones).
    'ley-27304',
    // 2026-07-13: rango 27.000–27.999. PLANA — la 27.272 (Ley de Flagrancia) tiene 18 arts corridos: los
    //   TÍTULO que aparecen en su texto son los del Código Procesal Penal que sustituye, no propios
    //   (verificado con estructura.ps1 → 0 secciones).
    'ley-27272',
    // 2026-07-13: rango 27.000–27.999. PLANAS — articulado corrido, 0 secciones (verificado con
    //   estructura.ps1 ya corregido + grep directo sobre el .txt). 27.674 (NNyA con cáncer, 16 arts:
    //   usa epígrafes por artículo, que NO son secciones) y 27.552 (Fibrosis Quística, 20 arts).
    'ley-27674', 'ley-27552',
    // 2026-07-13: PLANA — 27.439 (Régimen de Subrogancias, 17 arts): el texto de InfoLeg va directo de
    //   "Ley:" a "Artículo 1°", sin títulos ni capítulos (estructura.ps1 → 0 secciones).
    'ley-27439',
    // 2026-07-13: PLANA — 27.453 (Regularización dominial / barrios populares, 20 arts). estructura.ps1
    //   reporta 1 sección pero es falso positivo: toma la mención "capítulo XI del Anexo del decreto 2.670"
    //   que está DENTRO del texto del art. 1°. No tiene títulos ni capítulos propios.
    'ley-27453',
    // 2026-07-13: PLANA — 27.640 (Marco Regulatorio de Biocombustibles, 25 arts): solo tiene epígrafes
    //   sueltos ("Autoridad de aplicación", "Determinación del precio"), no TÍTULO/CAPÍTULO propios.
    'ley-27640',
    // 2026-07-15: rango 27.xxx, ola de sustantivas. PLANAS — articulado corrido, 0 encabezados de
    //   TÍTULO/CAPÍTULO en el full_text (verificado en BD). 27.249 (Reparación a ex-soldados de Malvinas),
    //   27.418 (Fomento agricultura familiar), 27.428 (Régimen de responsabilidad estatal / consenso fiscal),
    //   27.487 (Presupuestos mínimos… control), 27.570 (deroga beneficios ex-presidentes: el epígrafe interno
    //   de un artículo es una mención, no sección) y 27.685 (Prevención cardiovascular).
    'ley-27249', 'ley-27418', 'ley-27428', 'ley-27487', 'ley-27570', 'ley-27685',
    // 2026-07-15: rango 27.xxx, tanda x5 (22 leyes). PLANAS ≥15 arts — 0 secciones en la fuente oficial
    //   (verificado en BD: 0 encabezados TÍTULO/CAPÍTULO propios). Varias son MODIFICATORIAS y los
    //   capítulos que aparecen en su texto son de la ley madre, no propios:
    //   27.132 (Ferrocarriles Argentinos S.E. — mod. 26.352), 27.202 (reforma Ley del Deporte — mod. 20.655),
    //   27.562 (ampliación moratoria — mod. 27.541), 27.646 (ganadería ovina — mod. 25.422),
    //   27.694 (regularización dominial — mod. 27.453). Sustantivas planas: 27.139 (beneficio víctimas AMIA),
    //   27.179 (indemnización Fábrica Militar Río Tercero), 27.343 (Oficina de Presupuesto del Congreso),
    //   27.508 (Fondo Víctimas de Trata, PARCIALMENTE_VIGENTE — arts. 1-2 derogados por Dto 1048/2024),
    //   27.671 (capacitación obligatoria Malvinas, tipo Ley Micaela).
    'ley-27132', 'ley-27139', 'ley-27179', 'ley-27202', 'ley-27343',
    'ley-27508', 'ley-27562', 'ley-27646', 'ley-27671', 'ley-27694',
    // 2026-07-16: grandes del rango 27.xxx. MODIFICATORIAS PLANAS ≥15 arts — sus artículos sustituyen
    //   artículos de una ley madre y los TÍTULO/CAPÍTULO que aparecen son de la ley modificada, no propios
    //   (estructura.ps1 dio falsos positivos por esas menciones). 27.482 (68 arts, reforma del Código
    //   Procesal Penal Federal 27.063), y la cadena antidopaje que reforma la Ley 26.912: 27.109 (68 arts),
    //   27.434 (54 arts), 27.619 (74 arts).
    'ley-27482', 'ley-27109', 'ley-27434', 'ley-27619',
    // 2026-07-16: tanda de "leyes madre" citadas por el corpus. PLANAS ≥15 arts — articulado corrido, 0
    //   secciones propias en la fuente (verificado con estructura.ps1 + BD). 16.463 (Ley de Medicamentos,
    //   27 arts), 24.819 (Lealtad y Juego Limpio en el Deporte, 21 arts, DEROGADA por la 26.912 — las 2
    //   "secciones" que detecta estructura.ps1 son del Anexo I, posteriores al último artículo) y
    //   26.045 (Registro Nacional de Precursores Químicos, 23 arts).
    'ley-16463', 'ley-24819', 'ley-26045',
    // 2026-07-16: Decreto 1382/2012 (crea la AABE, 21 arts) — PLANO: articulado corrido, sin TÍTULO/CAPÍTULO
    //   propios (estructura.ps1 → 0 secciones reales).
    'decreto-1382-2012',
    // 2026-07-17: rango 26.900-26.999. PLANAS ≥15 arts sin estructura propia. 26.938 (automotores artesanales,
    //   15 arts; el epígrafe "Disposiciones finales" es del art. 12, no una sección). MODIFICATORIAS planas:
    //   26.987 (reforma Bomberos Voluntarios Ley 25.054, 20 arts) y 26.991 (reforma Ley de Abastecimiento
    //   20.680, 20 arts — DEROGADA junto con la 20.680 por el DNU 70/2023).
    'ley-26938', 'ley-26987', 'ley-26991',
    // 2026-07-18: rango 26.800-26.899. MODIFICATORIA plana ≥15 arts: 26.853 (Cámaras Federales de Casación,
    //   16 arts — los TÍTULO que aparecen son del Código Procesal Civil y Comercial que modifica, no propios).
    'ley-26853',
    // 2026-07-18: rango 26.700-26.799. PLANAS ≥15 arts sin estructura propia. 26.716 (Juzgado Federal Rawson,
    //   15 arts — las "secciones" son Anexos de cargos), 26.725 (cesión comunitaria Mapuche Curruhuinca, 15
    //   arts — los Anexos I-III están dentro del art. 14), 26.735 (reforma Régimen Penal Tributario de la Ley
    //   24.769, 20 arts — modificatoria; los TÍTULO son de la ley que modifica).
    'ley-26716', 'ley-26725', 'ley-26735',
    // 2026-07-19: rango 26.600-26.699. MODIFICATORIAS planas ≥15 arts (los TÍTULO/CAPÍTULO son de la ley
    //   madre): 26.683 (lavado de activos, mod. Código Penal + Ley 25.246, 26 arts — art. 25 vetado por Dto
    //   825/2011), 26.684 (reforma de Concursos y Quiebras, mod. Ley 24.522, 33 arts). Sustantiva plana:
    //   26.690 (resarcimiento a damnificados del atentado a la Embajada de Israel, 15 arts).
    'ley-26683', 'ley-26684', 'ley-26690',
    // 2026-07-19: rango 26.500-26.599. PLANAS ≥15 arts sin estructura propia en la fuente. 26.548 (Banco
    //   Nacional de Datos Genéticos, 31 arts — organizada por epígrafes de artículo; el único heading es
    //   "Cláusulas transitorias" del art. 30, no una sección) y 26.566 (extensión de la vida de la Central
    //   Nuclear Embalse, 20 arts — articulado corrido).
    'ley-26548', 'ley-26566',
    // 2026-07-19: rango 26.400-26.499. MODIFICATORIA plana ≥15 arts: 26.478 (reforma Ley 22.939 de marcas y
    //   señales del ganado, 15 arts — los TÍTULO/CAPÍTULO de su texto son de la ley madre, no propios).
    'ley-26478',
    // 2026-07-19: rango 26.300-26.399. PLANAS ≥15 arts sin estructura propia (verificado con estructura.ps1).
    //   26.377 (Convenios de Corresponsabilidad Gremial, 20 arts — epígrafes por artículo, no secciones),
    //   26.355 (Marcas Colectivas, 19 arts) y 26.371 (Cámara Nac. de Casación en lo Criminal y Correccional,
    //   15 arts — modificatoria: sus TÍTULO/CAPÍTULO son del CPP / Ley 24.050 / DL 1285/58, no propios).
    'ley-26377', 'ley-26355', 'ley-26371',
    // 2026-07-19: rango 26.200-26.299. PLANAS ≥15 arts sin estructura propia. 26.281 (Prevención y Control del
    //   Chagas, 17 arts), 26.283 (beneficios tributarios a prestadores médicos y obras sociales, 15 arts) y
    //   26.246 (creación de juzgados y Cámara Federal de La Matanza, 15 arts — sin TÍTULO/CAPÍTULO propios).
    'ley-26281', 'ley-26283', 'ley-26246',
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
  // Leyes SIMBÓLICAS sin obligaciones ni derechos exigibles: declaran una "Capital Nacional de…", un
  // "Día Nacional de…" o una fiesta, y no imponen ninguna conducta a nadie. No es deuda: es la naturaleza
  // de la norma. Se verificó leyendo el texto completo, una por una — NO se inventaron obligaciones para
  // llenar el campo. (Ojo: muchas otras simbólicas SÍ tienen obligaciones reales —incorporar la fecha al
  // calendario escolar, difusión a cargo del PEN, intervención de la Comisión Nacional de Monumentos— y
  // por eso NO están acá.)
  // 2026-07-14: rango 27.000–27.999, ola de simbólicas.
  sinObligDerechos: new Set<string>([
    'ley-27100', 'ley-27105', 'ley-27106', 'ley-27107', 'ley-27108', 'ley-27110', 'ley-27115',
    'ley-27119', 'ley-27128', 'ley-27157', 'ley-27158', 'ley-27190', 'ley-27195', 'ley-27215',
    'ley-27248', 'ley-27255', 'ley-27257', 'ley-27259', 'ley-27277', 'ley-27289', 'ley-27291',
    'ley-27300', 'ley-27309', 'ley-27311',
    'ley-27001', 'ley-27013', 'ley-27048', 'ley-27055', 'ley-27057', 'ley-27058', 'ley-27060',
    'ley-27069', 'ley-27075', 'ley-27085', 'ley-27089', 'ley-27091', 'ley-27096', 'ley-27099',
    'ley-27315', 'ley-27365', 'ley-27366', 'ley-27367', 'ley-27368', 'ley-27380', 'ley-27383',
    'ley-27388', 'ley-27414', 'ley-27422', 'ley-27427', 'ley-27459', 'ley-27460', 'ley-27462',
    'ley-27463', 'ley-27464', 'ley-27471', 'ley-27495', 'ley-27593', 'ley-27596', 'ley-27620',
    'ley-27659', 'ley-27660', 'ley-27681',
    // 2026-07-15: rango 27.xxx, tandas de chicas. Declaraciones honoríficas puras (patrimonio/interés/capital
    //   nacional, denominaciones) sin organismo obligado ni deber concreto → obligations y rights vacíos por
    //   decisión. 27.381 (Feria de Mataderos), 27.389 (denominación Ruta Nac. 40 "Libertador San Martín"),
    //   27.461 (fútbol como deporte popular), 27.494 (Capital Nacional de la Biodiversidad).
    'ley-27381', 'ley-27389', 'ley-27461', 'ley-27494',
    // 2026-07-15: más de las tandas chicas. Honoríficas puras: 27.327 (Trombonanza interés nacional),
    //   27.524 (Córdoba Capital Nac. de la Reforma Universitaria). Organizativa sin derechos/obligaciones
    //   para personas: 27.387 (actualiza la planta de cargos del Juzgado Federal de Campana).
    'ley-27327', 'ley-27387', 'ley-27524',
    // 2026-07-16: cierre de las chicas del rango 27.xxx. Honoríficas/declarativas sin destinatario obligado
    //   (capitales nacionales, días conmemorativos que "invitan", denominaciones, autorizaciones de tropas de
    //   objeto agotado) → obligations y rights vacíos por decisión. 27.038 (Pico Truncado Capital del Hidrógeno),
    //   27.050 (Puente → Ezequiel Demonty), 27.140 (Feria FIAR interés nacional), 27.165 y 27.280 (autorizaciones
    //   de salida de tropas ya cumplidas), 27.288 (Estación Chacarita → Villa Crespo), 27.513 (Capital del Turismo
    //   Astronómico), 27.567 (autorización de ejercicios combinados vencida), 27.575 (Día del Donante de Órganos).
    'ley-27038', 'ley-27050', 'ley-27140', 'ley-27165', 'ley-27280',
    'ley-27288', 'ley-27513', 'ley-27567', 'ley-27575',
    // 2026-07-17: rango 26.900-26.999. Declaraciones honoríficas puras sin organismo obligado (capitales
    //   nacionales, denominaciones, día conmemorativo que solo "adhiere", declaración de interés que solo
    //   "promueve/invita"). 26.900 (Estación Avellaneda Santillán-Kosteki), 26.901 (El Calafate Capital de
    //   los Glaciares), 26.910 (Río Turbio Capital del Carbón), 26.924 (Sgo. del Estero Capital de la
    //   Chacarera), 26.936/26.937 (Atucha II/I denominación), 26.958 (Día Víctimas de Accidentes de
    //   Tránsito), 26.985 (Scholas Occurrentes, interés nacional).
    'ley-26900', 'ley-26901', 'ley-26910', 'ley-26924',
    'ley-26936', 'ley-26937', 'ley-26958', 'ley-26985',
    // 2026-07-18: rango 26.800-26.899. Honoríficas puras (capitales nacionales, denominaciones, días
    //   conmemorativos sin organismo obligado) y las 2 autorizaciones de viaje presidencial de objeto
    //   agotado. 26.802 (Bariloche Cap. Turismo), 26.804 (Las Parejas Cap. PyME Agroindustrial),
    //   26.806/26.898 (viajes de la Presidenta), 26.807 (denominación Biblioteca Nacional), 26.808
    //   (Capitán Bermúdez Cap. Porcelana), 26.810 (Comodoro Rivadavia Cap. Colectividades), 26.832 (Día
    //   Periodista de Exteriores), 26.846 (Cap. Vigilia Malvinas), 26.848 (Tucumán Cap. Mountain Bike),
    //   26.866 (San Carlos Cap. Cristal Artesanal), 26.878 (Día Joven Empresario), 26.891 (Jujuy Cap. Pachamama).
    'ley-26802', 'ley-26804', 'ley-26806', 'ley-26807', 'ley-26808', 'ley-26810', 'ley-26832',
    'ley-26846', 'ley-26848', 'ley-26866', 'ley-26878', 'ley-26891', 'ley-26898',
    // 2026-07-18: rango 26.700-26.799. Honoríficas puras / declarativas sin organismo obligado y 1 viaje
    //   presidencial. 26.715 (RN 66 "Alfonsín"), 26.726 (viaje Presidenta 2012), 26.753 (Día del Niño Heroico
    //   Tambor de Tacuarí), 26.757 (Catamarca Cap. del Poncho), 26.775 (Fiesta de la Actividad Física),
    //   26.787 (Día del Desarrollo Científico y Tecnológico Espacial), 26.794 (denominación CCK), 26.797
    //   (RN 3 "Padre Zink" — el texto solo "solicita", no obliga).
    'ley-26715', 'ley-26726', 'ley-26753', 'ley-26757', 'ley-26775', 'ley-26787', 'ley-26794', 'ley-26797',
    // 2026-07-19: rango 26.600-26.699. Honoríficas puras / viaje presidencial. 26.652 (Día de la Historieta),
    //   26.656 (viaje Presidenta 2011), 26.665 (Día del Folklorista).
    'ley-26652', 'ley-26656', 'ley-26665',
    // 2026-07-19: rango 26.500-26.599. Autorización de viaje presidencial de objeto agotado, sin destinatario
    //   obligado. 26.553 (autorización a la Presidenta para ausentarse del país durante 2010).
    'ley-26553',
    // 2026-07-19: rango 26.400-26.499. Autorización de viaje presidencial de objeto agotado, sin destinatario
    //   obligado. 26.461 (autorización a la Presidenta para ausentarse del país durante 2009).
    'ley-26461',
    // 2026-07-19: rango 26.300-26.399. Honoríficas puras (días conmemorativos y denominación de puente) sin
    //   organismo obligado, y 1 viaje presidencial. 26.316 (Día Nac. de la Prevención del Abuso contra NNyA),
    //   26.320 (Día Nac. de la Gratuidad de la Enseñanza Universitaria), 26.322 (Puente Gobernador Ragone),
    //   26.336 (autorización a la Presidenta para ausentarse del país durante 2008).
    'ley-26316', 'ley-26320', 'ley-26322', 'ley-26336',
    // 2026-07-19: rango 26.200-26.299. Honoríficas puras (días conmemorativos, capitales/cunas, danza nacional)
    //   sin organismo obligado, y 1 viaje presidencial. 26.207 (autorización al Presidente para ausentarse del
    //   país durante 2007), 26.219 (Margarita Belén Cuna del Cooperativismo Algodonero), 26.225 (Feria Nac. del
    //   Comahue), 26.271 (Día del Cooperativismo Agropecuario), 26.275 (Laborde Capital del Malambo), 26.277
    //   (Día de las Heroínas y Mártires de la Independencia), 26.293 (Cuna de la Educación Pública), 26.295
    //   (Día Nac. de la Producción Orgánica), 26.297 (el pericón, danza nacional).
    'ley-26207', 'ley-26219', 'ley-26225', 'ley-26271', 'ley-26275',
    'ley-26277', 'ley-26293', 'ley-26295', 'ley-26297',
  ]),
};
