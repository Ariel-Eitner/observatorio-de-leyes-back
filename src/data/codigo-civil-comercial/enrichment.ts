import type { Article } from '../../common/types/law.types';

// Enriquecimiento manual de artículos clave (plainLanguageExplanation, relatedArticles, practicalEffects)
// Se aplica sobre los artículos generados automáticamente en index.ts

type ArticleEnrichment = Partial<Pick<Article, 'plainLanguageExplanation' | 'relatedArticles' | 'practicalEffects' | 'examples' | 'keywords'>>;

export const ARTICLE_ENRICHMENT: Record<string, ArticleEnrichment> = {
  '1': {
    plainLanguageExplanation: 'Cuando hay un conflicto o vacío legal, los jueces deben resolverlo usando las leyes que correspondan, pero siempre respetando la Constitución y los tratados de derechos humanos. También pueden tener en cuenta usos y costumbres cuando la ley lo permite o hay silencio legal.',
    relatedArticles: ['2', '3', '7'],
    practicalEffects: ['Un juez no puede negarse a fallar por falta de ley expresa', 'Las costumbres comerciales son vinculantes cuando la ley remite a ellas', 'Los tratados de la CADH, PIDCP y CEDAW integran el bloque de constitucionalidad'],
    keywords: ['fuentes del derecho', 'costumbre', 'Constitución Nacional', 'tratados de derechos humanos', 'leyes aplicables', 'diálogo de fuentes'],
  },
  '2': {
    plainLanguageExplanation: 'La ley no se interpreta solo por sus palabras literales. El juez debe considerar para qué fue creada, qué otras leyes dicen sobre el mismo tema, qué dicen los tratados de derechos humanos y cuáles son los principios generales del derecho, buscando coherencia con todo el sistema jurídico.',
    relatedArticles: ['1', '3'],
    practicalEffects: ['Permite la integración analógica cuando hay lagunas legales', 'Prohíbe la interpretación aislada: siempre en contexto del sistema', 'Los principios generales operan como fuente autónoma'],
    keywords: ['interpretación de la ley', 'analogía', 'valores jurídicos', 'principios generales', 'finalidad de la norma', 'coherencia'],
  },
  '3': {
    plainLanguageExplanation: 'Los jueces tienen la obligación de resolver todos los casos que lleguen a su juzgado. No pueden rechazar una causa argumentando que no hay ley aplicable o que el caso es dudoso: deben dictar sentencia con fundamentos razonados.',
    relatedArticles: ['1', '2'],
    practicalEffects: ['Prohibición de non liquet (abstenerse de juzgar)', 'La sentencia debe ser razonadamente fundada o puede ser nula', 'Incluye el deber de motivar la decisión en hechos y derecho'],
    keywords: ['deber de resolver', 'non liquet', 'sentencia fundada', 'juez', 'jurisdicción obligatoria'],
  },
  '4': {
    plainLanguageExplanation: 'Las leyes argentinas rigen para todos los que estén en el territorio, sean argentinos o extranjeros, turistas o residentes permanentes. No importa la nacionalidad ni la situación migratoria: si estás en Argentina, cumplís las leyes argentinas.',
    relatedArticles: ['5', '6', '7', '8'],
    practicalEffects: ['Un turista extranjero puede demandar y ser demandado bajo las leyes argentinas', 'Los contratos celebrados en Argentina se rigen por ley argentina salvo pacto de ley extranjera válido'],
    keywords: ['ámbito subjetivo', 'obligatoriedad de la ley', 'extranjeros', 'residentes', 'transeúntes', 'territorialidad'],
  },
  '5': {
    plainLanguageExplanation: 'Una ley no entra en vigor el mismo día que se publica en el Boletín Oficial, sino 8 días después, salvo que la propia ley diga otra fecha. Esto da tiempo para que la gente y las empresas se enteren de las nuevas reglas antes de tener que cumplirlas.',
    relatedArticles: ['4', '6', '7'],
    practicalEffects: ['Las leyes sin fecha de vigencia expresa rigen al noveno día de su publicación', 'Las leyes pueden fijar su propia fecha de entrada en vigor, incluso retroactiva si la CN lo permite'],
    keywords: ['vigencia de la ley', 'publicación oficial', 'Boletín Oficial', 'entrada en vigor', 'vacatio legis'],
  },
  '6': {
    plainLanguageExplanation: 'El artículo establece las reglas matemáticas para contar plazos legales: un día va de medianoche a medianoche, el plazo comienza el día siguiente al hecho que lo origina, los meses y años se cuentan de fecha a fecha, y los plazos en días incluyen los inhábiles salvo que la ley diga otra cosa.',
    relatedArticles: ['5', '7'],
    practicalEffects: ['El plazo de prescripción de 3 años vence a los 3 años exactos del hecho generador', 'Un plazo de un mes desde el 31 de enero vence el 28 o 29 de febrero (último día del mes)', 'Los sábados, domingos y feriados cuentan en plazos civiles'],
    keywords: ['plazos', 'cómputo de intervalos', 'días hábiles', 'meses', 'años', 'prescripción', 'caducidad'],
  },
  '7': {
    plainLanguageExplanation: 'Las leyes nuevas rigen hacia el futuro: se aplican a las consecuencias de relaciones jurídicas que siguen existiendo, pero no cambian lo que ya ocurrió. Excepcionalmente pueden ser retroactivas si lo dicen expresamente y no afectan derechos constitucionales. Las leyes supletorias nuevas no cambian contratos ya en curso.',
    relatedArticles: ['4', '5', '6', '8'],
    practicalEffects: ['Un contrato firmado antes del CCyCN se sigue interpretando con las reglas del momento de su celebración en lo que hace a su formación', 'Las consecuencias futuras de ese contrato sí se rigen por el CCyCN', 'Excepción: normas más favorables al consumidor aplican a contratos en curso'],
    keywords: ['eficacia temporal', 'irretroactividad', 'retroactividad', 'relaciones jurídicas existentes', 'consumidor', 'aplicación de la ley en el tiempo'],
  },
  '8': {
    plainLanguageExplanation: 'Nadie puede excusarse de cumplir una ley diciendo que no la conocía. La ignorancia de la ley no es una defensa válida en Argentina, salvo que alguna norma específica autorice esa excepción.',
    relatedArticles: ['4', '7'],
    practicalEffects: ['No procede como defensa decir "no sabía que esa conducta era ilegal"', 'En algunos casos el error de derecho es relevante (arts. 265-270 CCyCN sobre vicios de la voluntad)', 'El funcionario público no puede invocar ignorancia para incumplir sus deberes'],
    keywords: ['ignorancia de la ley', 'inexcusabilidad', 'error de derecho', 'cumplimiento de la ley'],
  },
  '9': {
    plainLanguageExplanation: 'Todos los derechos —el derecho a cobrar una deuda, a exigir el cumplimiento de un contrato, a reclamar una indemnización— deben ejercerse de buena fe. Esto significa actuar con honestidad, lealtad y sin engañar a la otra parte.',
    relatedArticles: ['10', '11', '12', '13'],
    practicalEffects: ['La mala fe puede hacer perder derechos aunque técnicamente se tenga la razón jurídica', 'La teoría de los actos propios (no se puede contradecir la propia conducta anterior) deriva de la buena fe', 'Aplica en contratos, familia, sucesiones y derecho real'],
    keywords: ['buena fe', 'ejercicio de derechos', 'honestidad', 'lealtad', 'actos propios'],
  },
  '10': {
    plainLanguageExplanation: 'Aunque uno tenga un derecho, no puede ejercerlo de cualquier manera. Si el ejercicio de ese derecho va en contra de los fines del sistema jurídico o supera los límites de la buena fe y la moral, el juez puede pararlo y ordenar que se repare el daño causado.',
    relatedArticles: ['9', '11', '12'],
    practicalEffects: ['El acreedor que cobra intereses usurarios abusa de su derecho aunque el deudor firmó', 'El empleador que despide en represalia por una denuncia sindical puede estar abusando de su derecho a despedir', 'El juez puede reencuadrar la situación y limitar los efectos del acto abusivo'],
    keywords: ['abuso del derecho', 'ejercicio abusivo', 'buena fe', 'moral', 'buenas costumbres', 'situación jurídica abusiva'],
  },
  '11': {
    plainLanguageExplanation: 'El mismo límite del abuso del derecho (art. 10) aplica cuando alguien en posición dominante en el mercado —por ejemplo, una empresa monopólica— abusa de esa posición frente a sus clientes o proveedores, sin perjuicio de lo que digan las leyes de defensa de la competencia.',
    relatedArticles: ['9', '10'],
    practicalEffects: ['Una empresa con posición dominante que impone condiciones abusivas a proveedores puede ser sancionada', 'Complementa la Ley de Defensa de la Competencia 27.442', 'La persona física en posición de poder también puede incurrir en abuso'],
    keywords: ['abuso de posición dominante', 'mercado', 'defensa de la competencia', 'poder económico'],
  },
  '12': {
    plainLanguageExplanation: 'Las personas no pueden hacer acuerdos privados que contradigan leyes de orden público. Si alguien usa un contrato o figura legal para obtener el mismo resultado que prohíbe una ley imperativa (fraude a la ley), ese acto se somete igualmente a la norma que intentó evitar.',
    relatedArticles: ['9', '10', '13'],
    practicalEffects: ['No se puede disfrazar un acto jurídico para evitar sus consecuencias legales', 'El fraude a la ley es sancionado aunque formalmente el acto sea lícito', 'Ejemplo: constituir una sociedad para eludir responsabilidades personales puede ser fraude si se abusa de la personalidad jurídica'],
    keywords: ['orden público', 'fraude a la ley', 'norma imperativa', 'convenciones particulares', 'acto en fraude'],
  },
  '13': {
    plainLanguageExplanation: 'No se puede hacer una renuncia general a todas las leyes ("renuncio a todos mis derechos"). Sí se puede renunciar a los efectos de una ley en un caso concreto y particular, siempre que esa ley lo permita.',
    relatedArticles: ['12', '14'],
    practicalEffects: ['Un trabajador no puede firmar un contrato renunciando a todos sus derechos laborales', 'Sí puede renunciar a cobrar un período de vacaciones ya ganadas si el CCT lo permite', 'La renuncia de derechos de orden público es nula'],
    keywords: ['renuncia', 'renuncia general', 'efectos de la ley', 'orden público', 'autonomía de la voluntad'],
  },
  '14': {
    plainLanguageExplanation: 'El CCyCN reconoce dos categorías de derechos: los individuales (de cada persona sobre sus bienes y su vida) y los de incidencia colectiva (que protegen bienes comunes como el ambiente). El ejercicio abusivo de derechos individuales que daña bienes colectivos no está amparado.',
    relatedArticles: ['9', '10', '13', '15'],
    practicalEffects: ['Una empresa puede ser limitada en el ejercicio de su derecho de propiedad si contamina el ambiente', 'Los derechos de incidencia colectiva pueden ser defendidos por cualquier ciudadano mediante amparo colectivo', 'Vincula con el art. 41 CN sobre el derecho al ambiente'],
    keywords: ['derechos individuales', 'derechos de incidencia colectiva', 'ambiente', 'ejercicio abusivo', 'amparo colectivo'],
  },
  '15': {
    plainLanguageExplanation: 'Las personas son titulares de sus propios bienes, o sea, son las dueñas de lo que forma su patrimonio. El patrimonio es el conjunto de bienes y deudas de una persona.',
    relatedArticles: ['14', '16', '17'],
    practicalEffects: ['El titular de un derecho real o personal puede defenderlo judicialmente', 'El patrimonio responde por las deudas de su titular (principio de responsabilidad patrimonial)', 'Los bienes de la persona jurídica son distintos de los de sus socios'],
    keywords: ['titularidad de derechos', 'patrimonio', 'bienes', 'propiedad', 'derechos sobre bienes'],
  },
  '16': {
    plainLanguageExplanation: 'Los derechos pueden recaer sobre bienes. Los bienes materiales se llaman cosas. La energía y las fuerzas naturales (como la electricidad o el gas) también se tratan como cosas cuando pueden ponerse al servicio del hombre.',
    relatedArticles: ['15', '17'],
    practicalEffects: ['La energía eléctrica robada configura hurto', 'El gas o el agua son cosas susceptibles de ser objeto de contratos (compraventa, locación)', 'Los derechos intelectuales son bienes aunque no sean cosas materiales'],
    keywords: ['bienes', 'cosas', 'energía', 'fuerzas naturales', 'valor económico', 'bien material', 'bien inmaterial'],
  },
  '17': {
    plainLanguageExplanation: 'Las partes del cuerpo humano no tienen valor comercial. No se pueden vender órganos ni sangre ni tejidos. Solo se pueden disponer de ellas para fines afectivos, terapéuticos, científicos, humanitarios o sociales, conforme a las leyes especiales como la ley de trasplante.',
    relatedArticles: ['15', '16'],
    practicalEffects: ['Está prohibida la venta de órganos (Ley 24.193)', 'La donación de sangre es altruista y no remunerada', 'El cabello cortado o las uñas pueden comercializarse por haber perdido la conexión con el cuerpo'],
    keywords: ['cuerpo humano', 'órganos', 'trasplante', 'donación', 'valor afectivo', 'valor terapéutico', 'no comercialización'],
  },
  '18': {
    plainLanguageExplanation: 'Las comunidades indígenas reconocidas oficialmente tienen derecho a poseer y ser propietarias de las tierras que históricamente ocuparon y de las que necesiten para desarrollarse. Este artículo implementa el art. 75 inc. 17 de la Constitución Nacional.',
    relatedArticles: ['15'],
    practicalEffects: ['Las tierras de comunidades indígenas no pueden ser enajenadas sin consentimiento de la comunidad', 'El Estado debe relevar, restituir o compensar las tierras comunitarias indígenas (Ley 26.160)', 'La propiedad comunitaria no se divide en cuotas individuales'],
    keywords: ['comunidades indígenas', 'posesión comunitaria', 'tierras', 'Constitución art 75 inc 17', 'propiedad colectiva', 'pueblos originarios'],
  },

  // ── Libro Primero: Personas ──────────────────────────────────────────────
  '19': {
    plainLanguageExplanation: 'La persona humana existe jurídicamente desde el momento de la concepción, ya sea en el seno materno o fuera de él (fecundación in vitro). A partir de ese momento tiene capacidad para ser titular de derechos y obligaciones.',
    relatedArticles: ['20', '21', '22'],
    practicalEffects: ['El embrión concebido pero no implantado tiene protección jurídica', 'Los derechos hereditarios del nasciturus quedan condicionados al nacimiento con vida'],
    keywords: ['comienzo de la existencia', 'concepción', 'persona humana', 'nasciturus'],
  },
  '21': {
    plainLanguageExplanation: 'Los derechos que corresponden al bebé concebido o implantado quedan definitivamente adquiridos si nace vivo. Si nace sin vida, se considera que nunca existió como persona y no adquirió ningún derecho.',
    relatedArticles: ['19', '20', '22'],
    practicalEffects: ['Un niño nacido muerto no hereda ni transmite derechos sucesorios', 'El nacimiento con vida se presume: quien sostenga lo contrario debe probarlo'],
    keywords: ['nacimiento con vida', 'nasciturus', 'derechos del concebido', 'presunción de vida'],
  },
  '22': {
    plainLanguageExplanation: 'Toda persona humana tiene capacidad de derecho: puede ser titular de derechos y deberes. Esta capacidad no puede suprimirse totalmente, aunque la ley puede limitarla para ciertos actos específicos.',
    relatedArticles: ['23', '24', '25'],
    practicalEffects: ['Un penado no pierde su capacidad de derecho: puede heredar, recibir donaciones, tener hijos', 'Un menor puede ser titular de derechos aunque no pueda ejercerlos por sí mismo'],
    keywords: ['capacidad de derecho', 'capacidad jurídica', 'persona humana', 'titular de derechos'],
  },
  '23': {
    plainLanguageExplanation: 'La capacidad de ejercicio es la aptitud para actuar por uno mismo en la vida jurídica: firmar contratos, demandar, aceptar herencias. Toda persona la tiene salvo las excepciones expresamente establecidas por el código o por sentencia judicial.',
    relatedArticles: ['22', '24', '26'],
    practicalEffects: ['Un adulto sin incapacidad declarada puede celebrar cualquier contrato', 'La capacidad de ejercicio se presume: la incapacidad debe declararse judicialmente'],
    keywords: ['capacidad de ejercicio', 'capacidad de obrar', 'autonomía personal', 'actos jurídicos propios'],
  },
  '24': {
    plainLanguageExplanation: 'Son incapaces de ejercicio: los menores de edad que no tienen el grado de madurez suficiente, la persona por nacer, y quien ha sido declarado incapaz por sentencia judicial (como en casos de demencia severa).',
    relatedArticles: ['23', '25', '26', '32'],
    practicalEffects: ['Los actos de un incapaz de ejercicio son nulos', 'Actúan a través de sus representantes legales (padres, tutores, curadores)'],
    keywords: ['incapaces de ejercicio', 'representación legal', 'menores', 'demencia', 'incapacidad judicial'],
  },
  '25': {
    plainLanguageExplanation: 'Menor de edad es quien no cumplió 18 años. Adolescente es el menor que ya cumplió 13 años. Esta distinción es relevante porque los adolescentes tienen mayor autonomía para ciertos actos (atención médica, trabajo, etc.).',
    relatedArticles: ['24', '26', '684'],
    practicalEffects: ['Un joven de 16 años puede decidir sobre su salud sin consentimiento de los padres (art. 26)', 'La mayoría de edad plena se adquiere a los 18 años'],
    keywords: ['menor de edad', 'adolescente', 'mayoría de edad', 'emancipación', 'madurez suficiente'],
  },
  '26': {
    plainLanguageExplanation: 'Los menores ejercen sus derechos a través de sus representantes (padres). Pero a medida que crecen, pueden actuar con mayor autonomía según su madurez. A partir de los 16 años pueden decidir sobre su propia atención médica.',
    relatedArticles: ['24', '25', '639'],
    practicalEffects: ['Un adolescente de 13 años puede consultar un médico sin sus padres para tratamientos de bajo riesgo', 'A partir de los 16, el adolescente es plenamente autónomo en decisiones sobre su propio cuerpo'],
    keywords: ['ejercicio de derechos del menor', 'autonomía progresiva', 'salud adolescente', 'consentimiento médico'],
  },

  // ── Libro Segundo: Matrimonio ─────────────────────────────────────────────
  '402': {
    plainLanguageExplanation: 'El matrimonio en Argentina puede celebrarse entre dos personas de cualquier sexo. No hay distinción entre matrimonio "heterosexual" y "homosexual": ambos tienen los mismos requisitos, efectos y derechos.',
    relatedArticles: ['403', '404', '406'],
    practicalEffects: ['Matrimonio entre personas del mismo sexo: plenamente válido desde la Ley 26.618 (2010), ahora integrado al CCyCN', 'Todos los efectos son idénticos: herencia, alimentos, adopción conjunta'],
    keywords: ['matrimonio igualitario', 'cónyuges', 'sexo', 'identidad de género', 'Ley 26618'],
  },
  '403': {
    plainLanguageExplanation: 'Para casarse hay requisitos de edad (18 años), que no haya parentesco cercano, que no haya vínculo matrimonial anterior no disuelto, y que ambos presten consentimiento libre y pleno.',
    relatedArticles: ['402', '404', '406', '424'],
    practicalEffects: ['Casarse siendo menor de 18 sin autorización hace el matrimonio anulable', 'El matrimonio con una persona casada es nulo de nulidad absoluta (bigamia)'],
    keywords: ['requisitos del matrimonio', 'impedimentos matrimoniales', 'edad para casarse', 'consentimiento matrimonial'],
  },
  '406': {
    plainLanguageExplanation: 'El matrimonio se celebra ante el oficial del Registro Civil con la presencia de ambos contrayentes y dos testigos. Cada uno debe declarar que acepta al otro como cónyuge y que no tiene impedimentos para casarse.',
    relatedArticles: ['403', '402', '407'],
    practicalEffects: ['No hay matrimonio válido sin la intervención del Registro Civil', 'Las ceremonias religiosas no tienen efectos civiles por sí solas'],
    keywords: ['celebración del matrimonio', 'Registro Civil', 'oficial público', 'ceremonia civil', 'testigos'],
  },
  '431': {
    plainLanguageExplanation: 'Los cónyuges se deben mutuamente fidelidad, asistencia y alimentos. La fidelidad es el deber de exclusividad; la asistencia es el apoyo personal y moral; los alimentos cubren las necesidades materiales.',
    relatedArticles: ['432', '433', '455'],
    practicalEffects: ['La infidelidad puede invocarse en el convenio regulador del divorcio pero no es causal de divorcio', 'El deber de asistencia incluye cuidar al cónyuge enfermo', 'Los alimentos entre cónyuges son recíprocos'],
    keywords: ['deberes conyugales', 'fidelidad', 'asistencia', 'alimentos conyugales', 'convivencia'],
  },
  '437': {
    plainLanguageExplanation: 'El divorcio en Argentina es siempre vincular (disuelve el matrimonio completamente) y no requiere probar ninguna causa. Cualquiera de los cónyuges puede pedirlo, o ambos de común acuerdo, simplemente presentando la petición ante el juez.',
    relatedArticles: ['438', '439', '440', '441'],
    practicalEffects: ['No hay divorcio "culpable": el juez no puede rechazar el divorcio ni exigir causas', 'El divorcio unilateral es un derecho: el otro cónyuge no puede oponerse', 'Solo se discuten los efectos: alimentos, vivienda, bienes, hijos'],
    keywords: ['divorcio vincular', 'divorcio sin causa', 'disolución del matrimonio', 'divorcio unilateral'],
  },
  '438': {
    plainLanguageExplanation: 'Al pedir el divorcio se debe acompañar una propuesta de convenio regulador que establezca qué pasa con los hijos (cuidado, alimentos, régimen de comunicación), los bienes y la vivienda familiar.',
    relatedArticles: ['437', '439', '440'],
    practicalEffects: ['Si los dos están de acuerdo, el trámite es más rápido y sin conflicto', 'Si no hay acuerdo en el convenio, el juez resuelve los puntos en disputa pero igual decreta el divorcio'],
    keywords: ['convenio regulador', 'trámite de divorcio', 'acuerdo de divorcio', 'petición conjunta'],
  },

  // ── Libro Segundo: Uniones convivenciales ─────────────────────────────────
  '509': {
    plainLanguageExplanation: 'La unión convivencial es la de dos personas (de cualquier sexo) que viven juntas de manera pública, estable y permanente, en una relación de pareja similar al matrimonio, durante al menos dos años.',
    relatedArticles: ['510', '511', '512', '523'],
    practicalEffects: ['Las parejas que conviven tienen derechos pero no iguales al matrimonio', 'Para tener efectos legales plenos, la unión debe inscribirse en el Registro (aunque la no inscripción no elimina derechos por convivencia probada)'],
    keywords: ['unión convivencial', 'concubinato', 'convivientes', 'pareja de hecho', 'registro de unión'],
  },
  '523': {
    plainLanguageExplanation: 'La unión convivencial cesa por: muerte de uno, matrimonio entre ellos, matrimonio con tercero, o ruptura de la convivencia. Al cesar, se generan ciertos efectos económicos para proteger al conviviente más débil.',
    relatedArticles: ['524', '525', '526', '527'],
    practicalEffects: ['El conviviente supérstite puede pedir compensación económica si la ruptura le genera desequilibrio', 'Puede solicitar continuar usando la vivienda familiar por un tiempo prudencial'],
    keywords: ['cese de la unión convivencial', 'ruptura de convivencia', 'compensación económica', 'vivienda familiar'],
  },

  // ── Libro Tercero: Obligaciones ───────────────────────────────────────────
  '724': {
    plainLanguageExplanation: 'Una obligación es un vínculo jurídico entre dos personas: el deudor debe cumplir una prestación (dar, hacer o no hacer algo) en beneficio del acreedor, quien tiene el derecho de exigirla y de ejecutar el patrimonio del deudor si no cumple.',
    relatedArticles: ['725', '726', '730', '865'],
    practicalEffects: ['Toda obligación implica que el acreedor puede demandar judicialmente su cumplimiento', 'El deudor responde con su patrimonio presente y futuro (art. 743 CCyCN)'],
    keywords: ['obligación', 'deudor', 'acreedor', 'prestación', 'vínculo jurídico', 'derecho creditorio'],
  },
  '730': {
    plainLanguageExplanation: 'Si el deudor no cumple, el acreedor tiene varios recursos: puede pedir que un juez lo obligue a cumplir, que otro cumpla la prestación a cargo del deudor, o que se le indemnicen los daños y perjuicios causados.',
    relatedArticles: ['724', '731', '865'],
    practicalEffects: ['Ante incumplimiento, el acreedor puede ejecutar bienes del deudor mediante ejecución forzosa', 'También puede resolver el contrato y reclamar daños'],
    keywords: ['efectos del incumplimiento', 'ejecución forzosa', 'indemnización', 'recursos del acreedor', 'mora del deudor'],
  },
  '765': {
    plainLanguageExplanation: 'Si la obligación es de dar una suma de dinero, se debe la moneda pactada. Si se pactó en moneda extranjera (dólares, euros), el deudor puede cancelar en pesos al tipo de cambio oficial, salvo que sea una obligación de dar moneda extranjera como cosa cierta.',
    relatedArticles: ['766', '767', '768'],
    practicalEffects: ['Las deudas en dólares pueden cancelarse en pesos al tipo de cambio (doctrina predominante aunque disputada)', 'Los préstamos hipotecarios en dólares generaron jurisprudencia sobre el tipo de cambio aplicable'],
    keywords: ['deuda dineraria', 'moneda extranjera', 'dólares', 'tipo de cambio', 'pesificación', 'obligación en divisa'],
  },
  '768': {
    plainLanguageExplanation: 'Cuando el deudor no paga en tiempo, el acreedor tiene derecho a cobrar intereses moratorios. Si las partes no pactaron tasa, se aplica la tasa que fija el Banco Central para operaciones de descuento.',
    relatedArticles: ['765', '767', '769', '771'],
    practicalEffects: ['Los intereses moratorios corren desde que el deudor está en mora sin necesidad de interpelación si hay plazo cierto', 'Los intereses compensatorios y moratorios se suman pero los jueces pueden reducirlos si son excesivos (art. 771)'],
    keywords: ['intereses moratorios', 'mora del deudor', 'tasa de interés', 'Banco Central', 'usura'],
  },
  '865': {
    plainLanguageExplanation: 'El pago es la forma normal de extinguir una obligación: el deudor cumple exactamente lo que debe. Para liberar al deudor, el pago debe ser completo, en el lugar y tiempo acordados, y al acreedor o a quien este autorice.',
    relatedArticles: ['866', '867', '868', '880'],
    practicalEffects: ['El pago parcial no libera al deudor salvo acuerdo expreso', 'El deudor tiene derecho a un recibo que acredite el pago (art. 896 CCyCN)', 'Pagar al acreedor aparente libera al deudor de buena fe'],
    keywords: ['pago', 'extinción de obligaciones', 'cumplimiento', 'solutio', 'recibo de pago'],
  },

  // ── Libro Tercero: Contratos ──────────────────────────────────────────────
  '957': {
    plainLanguageExplanation: 'Un contrato es el acuerdo de dos o más personas para crear, modificar, transferir o extinguir relaciones jurídicas patrimoniales. Requiere que las partes consientan libremente y que el objeto sea lícito.',
    relatedArticles: ['958', '959', '960', '961', '971'],
    practicalEffects: ['El contrato es ley entre las partes: obliga tanto como la ley misma', 'No hay contrato si falta el consentimiento (vicio de la voluntad) o el objeto es ilícito'],
    keywords: ['contrato', 'acuerdo de partes', 'consentimiento', 'autonomía de la voluntad', 'fuente de obligaciones'],
  },
  '958': {
    plainLanguageExplanation: 'Las partes son libres de celebrar cualquier contrato y de determinar su contenido, siempre que respeten el orden público, la buena fe, los derechos de terceros y las normas indisponibles.',
    relatedArticles: ['957', '959', '960', '12'],
    practicalEffects: ['No se puede pactar la esclavitud aunque ambas partes quieran', 'Sí se puede acordar un precio diferente al habitual de mercado', 'Las cláusulas abusivas en contratos de consumo son nulas de pleno derecho'],
    keywords: ['libertad de contratación', 'autonomía de la voluntad', 'orden público', 'normas indisponibles'],
  },
  '959': {
    plainLanguageExplanation: 'Los contratos válidamente celebrados son obligatorios y solo pueden modificarse o extinguirse por acuerdo mutuo o por las causas que establece la ley (rescisión, resolución, revocación, imposibilidad de cumplimiento).',
    relatedArticles: ['957', '960', '1076', '1077', '1078'],
    practicalEffects: ['Una parte no puede cambiar el precio o las condiciones unilateralmente', 'La excepción es el contrato por adhesión con cláusulas abusivas o la teoría de la imprevisión (art. 1091)'],
    keywords: ['fuerza obligatoria del contrato', 'pacta sunt servanda', 'modificación del contrato', 'extinción del contrato'],
  },
  '1061': {
    plainLanguageExplanation: 'Los contratos deben interpretarse según la intención común de las partes en el momento de contratar, no según el sentido literal de las palabras cuando este conduce a resultados irrazonables.',
    relatedArticles: ['1062', '1063', '1064', '1065'],
    practicalEffects: ['Si una cláusula es ambigua, el juez puede apartarse del texto para respetar la intención original', 'En contratos por adhesión, la duda se interpreta en contra de quien redactó el contrato'],
    keywords: ['interpretación del contrato', 'intención de las partes', 'cláusulas ambiguas', 'interpretación restrictiva'],
  },
  '1091': {
    plainLanguageExplanation: 'Si después de firmado el contrato cambian tanto las circunstancias que cumplirlo resulta excesivamente oneroso para una parte (sin que sea su culpa), esa parte puede pedir al juez que ajuste el contrato o que lo resuelva.',
    relatedArticles: ['1090', '959', '1732'],
    practicalEffects: ['Una devaluación brusca puede habilitarla si no fue previsible al momento de contratar', 'No aplica si el riesgo ya estaba contemplado en el contrato (riesgos propios del negocio)', 'Usada en contratos de larga duración o de tracto sucesivo durante crisis económicas'],
    keywords: ['teoría de la imprevisión', 'excesiva onerosidad', 'hardship', 'desequilibrio contractual', 'reajuste judicial'],
  },

  // ── Libro Tercero: Responsabilidad Civil ──────────────────────────────────
  '1716': {
    plainLanguageExplanation: 'El deber de no dañar a otros es la base de la responsabilidad civil. Quien viola ese deber —sea por acción u omisión— está obligado a reparar el daño causado, ya sea que haya actuado con culpa o sin ella (responsabilidad objetiva).',
    relatedArticles: ['1717', '1718', '1721', '1724', '1725'],
    practicalEffects: ['La responsabilidad civil puede surgir de un contrato o fuera de él (extracontractual)', 'No hay responsabilidad sin daño: la amenaza de daño aún no concretado habilita medidas preventivas'],
    keywords: ['responsabilidad civil', 'deber de no dañar', 'antijuridicidad', 'reparación del daño', 'neminem laedere'],
  },
  '1717': {
    plainLanguageExplanation: 'Una conducta es antijurídica cuando viola el deber de no dañar a otro. No se requiere que esté específicamente prohibida por una norma: basta con que sea contraria al ordenamiento jurídico en general.',
    relatedArticles: ['1716', '1718', '1721'],
    practicalEffects: ['No hay que invocar una norma específica violada: alcanza con probar que el daño no debía ocurrir', 'Las causas de justificación (legítima defensa, estado de necesidad) eliminan la antijuridicidad'],
    keywords: ['antijuridicidad', 'ilicitud', 'conducta dañosa', 'causa de justificación', 'legítima defensa'],
  },
  '1721': {
    plainLanguageExplanation: 'La responsabilidad puede ser subjetiva (requiere culpa o dolo del responsable) u objetiva (responde aunque no haya culpa, por el solo hecho de ser dueño o guardián de algo riesgoso o realizar actividad riesgosa).',
    relatedArticles: ['1722', '1724', '1725', '1757'],
    practicalEffects: ['En responsabilidad objetiva, la víctima no necesita probar culpa: solo el daño y la relación causal', 'El responsable objetivo solo se exime con caso fortuito, culpa de la víctima o hecho de tercero extraño'],
    keywords: ['factor de atribución', 'responsabilidad subjetiva', 'responsabilidad objetiva', 'culpa', 'dolo', 'riesgo'],
  },
  '1724': {
    plainLanguageExplanation: 'La culpa es actuar sin la diligencia que requieren las circunstancias: por imprudencia, negligencia o impericia. El dolo es causar el daño a sabiendas y con intención de dañar.',
    relatedArticles: ['1721', '1722', '1725', '1726'],
    practicalEffects: ['El médico que opera sin respetar protocolos incurre en culpa por impericia', 'El conductor que desobedece señales de tránsito actúa con culpa por imprudencia', 'El dolo agrava la responsabilidad y puede habilitar daño punitivo en contratos de consumo'],
    keywords: ['culpa', 'dolo', 'negligencia', 'imprudencia', 'impericia', 'factor subjetivo'],
  },
  '1726': {
    plainLanguageExplanation: 'Para que haya responsabilidad, el hecho del responsable debe ser la causa del daño (nexo causal). Si el daño se habría producido igual sin ese hecho, no hay responsabilidad.',
    relatedArticles: ['1721', '1727', '1728', '1729'],
    practicalEffects: ['El médico que no diagnostica bien responde si el paciente se agravó POR esa falta de diagnóstico', 'La relación causal se interrumpe por caso fortuito, culpa de la víctima o hecho de un tercero'],
    keywords: ['nexo causal', 'relación de causalidad', 'causa adecuada', 'concausa', 'causalidad jurídica'],
  },
  '1737': {
    plainLanguageExplanation: 'El daño resarcible es la lesión a un bien jurídico protegido: puede ser un daño patrimonial (pérdida económica) o extrapatrimonial (sufrimiento, daño moral). Para ser indemnizable debe ser cierto, subsistente y no reparado.',
    relatedArticles: ['1738', '1739', '1740', '1741'],
    practicalEffects: ['El daño futuro es indemnizable si es cierto (ej. lucro cesante por incapacidad laboral)', 'El daño hipotético o eventual no se indemniza', 'El daño ya reparado (ej. por seguro) no se indemniza de nuevo'],
    keywords: ['daño resarcible', 'daño patrimonial', 'daño extrapatrimonial', 'daño moral', 'certeza del daño'],
  },
  '1741': {
    plainLanguageExplanation: 'La indemnización del daño no patrimonial (daño moral) compensa el sufrimiento, el dolor, la angustia y la pérdida de disfrute de la vida. Solo puede ser reclamada por la víctima y, si murió, por sus herederos.',
    relatedArticles: ['1737', '1738', '1739', '1742'],
    practicalEffects: ['El daño moral es autónomo: se indemniza aunque no haya daño patrimonial', 'Los jueces evalúan el monto según la entidad del sufrimiento, no con criterios matemáticos', 'La reparación del daño moral es en dinero o en otras formas (publicación de sentencia, disculpa pública)'],
    keywords: ['daño moral', 'daño no patrimonial', 'sufrimiento', 'angustia', 'pérdida de disfrute', 'indemnización moral'],
  },
  '1757': {
    plainLanguageExplanation: 'Quien es dueño o guardián de una cosa riesgosa (auto, maquinaria peligrosa, productos químicos) o quien realiza una actividad riesgosa responde por los daños que cause, aunque no haya actuado con culpa.',
    relatedArticles: ['1721', '1758', '1759', '1722'],
    practicalEffects: ['El dueño de un auto responde por los daños del accidente aunque no manejara él', 'La víctima solo prueba el daño, la cosa/actividad riesgosa y la relación causal; no necesita probar culpa', 'Eximente: culpa exclusiva de la víctima, hecho de tercero extraño, caso fortuito'],
    keywords: ['responsabilidad objetiva', 'cosa riesgosa', 'actividad riesgosa', 'dueño', 'guardián', 'riesgo creado'],
  },

  // ── Libro Cuarto: Derechos Reales ────────────────────────────────────────
  '1882': {
    plainLanguageExplanation: 'Un derecho real es el poder jurídico que una persona tiene sobre una cosa: puede usarla, gozarla, disponer de ella y defenderla frente a todos (erga omnes). A diferencia del derecho personal (obligación), el derecho real es oponible a cualquier persona.',
    relatedArticles: ['1883', '1884', '1886', '1887'],
    practicalEffects: ['El dueño de un auto puede reclamarlo a cualquiera que lo tenga, incluso a quien lo compró de buena fe (con matices)', 'El derecho real se adquiere por modos específicos: tradición, inscripción registral, sucesión, prescripción'],
    keywords: ['derecho real', 'erga omnes', 'derechos reales', 'cosa', 'oponibilidad', 'dominio', 'numerus clausus'],
  },
  '1941': {
    plainLanguageExplanation: 'El dominio es el derecho real más amplio: el dueño puede usar, gozar y disponer de la cosa a su arbitrio, sin más límites que los que impone la ley. Puede venderla, alquilarla, destruirla o dejarla abandonada.',
    relatedArticles: ['1942', '1944', '1945', '1946'],
    practicalEffects: ['El propietario puede excluir a cualquier persona de su inmueble', 'El Estado puede expropiar la propiedad por causa de utilidad pública con indemnización previa', 'Las restricciones al dominio (servidumbres, restricciones administrativas) son excepcionales'],
    keywords: ['dominio', 'propiedad', 'dueño', 'uso y goce', 'disposición', 'exclusividad del dominio'],
  },
  '1983': {
    plainLanguageExplanation: 'El condominio es cuando dos o más personas son dueñas de una misma cosa, cada una con una parte indivisa (alícuota). No se puede señalar qué parte física del bien corresponde a cada condómino hasta que se divida.',
    relatedArticles: ['1984', '1985', '1987', '1989'],
    practicalEffects: ['Para vender la cosa en condominio se necesita el acuerdo de todos los condóminos', 'Cualquier condómino puede pedir la división (partición) salvo pacto de indivisión por hasta 10 años', 'Los gastos de conservación son proporcionales a la alícuota de cada uno'],
    keywords: ['condominio', 'copropiedad', 'parte indivisa', 'alícuota', 'indivisión', 'cotitular'],
  },
  '2037': {
    plainLanguageExplanation: 'La propiedad horizontal permite que distintas personas sean dueñas de distintas unidades funcionales (departamentos, locales) en un mismo edificio, mientras comparten las partes comunes (pasillo, ascensor, terraza). Cada propietario tiene su unidad en dominio exclusivo y una alícuota de las partes comunes.',
    relatedArticles: ['2038', '2039', '2044', '2046'],
    practicalEffects: ['El consorcio de propietarios tiene personalidad jurídica y puede demandar y ser demandado', 'Las expensas comunes son obligatorias para todos aunque no usen los espacios comunes', 'El reglamento de propiedad horizontal tiene fuerza legal entre los consorcistas'],
    keywords: ['propiedad horizontal', 'departamento', 'consorcio', 'expensas', 'unidad funcional', 'partes comunes'],
  },
  '2184': {
    plainLanguageExplanation: 'Los derechos reales de garantía (hipoteca, prenda, anticresis) son derechos reales que se constituyen sobre bienes del deudor para garantizar el cumplimiento de una obligación. Si el deudor no paga, el acreedor puede ejecutar el bien.',
    relatedArticles: ['2185', '2187', '2205', '2219'],
    practicalEffects: ['La hipoteca se constituye sobre inmuebles y no requiere que el deudor entregue el bien', 'La prenda recae sobre bienes muebles (puede ser con o sin desplazamiento del bien)', 'El acreedor hipotecario tiene preferencia sobre otros acreedores al ejecutar el inmueble'],
    keywords: ['derechos reales de garantía', 'hipoteca', 'prenda', 'anticresis', 'garantía real', 'ejecución hipotecaria'],
  },
  '2205': {
    plainLanguageExplanation: 'La hipoteca es el derecho real de garantía que se constituye sobre un inmueble del deudor (o de un tercero), sin que el propietario pierda la posesión. Si el deudor no paga, el acreedor puede pedir la subasta del inmueble.',
    relatedArticles: ['2206', '2207', '2208', '2184'],
    practicalEffects: ['El deudor hipotecario sigue viviendo en su casa hasta la ejecución judicial', 'La hipoteca debe inscribirse en el Registro de la Propiedad para ser oponible a terceros', 'El banco que otorga el crédito hipotecario tiene prioridad sobre otros acreedores al ejecutar'],
    keywords: ['hipoteca', 'inmueble', 'garantía hipotecaria', 'subasta', 'registro de la propiedad', 'crédito hipotecario'],
  },

  // ── Libro Quinto: Sucesiones ──────────────────────────────────────────────
  '2277': {
    plainLanguageExplanation: 'La herencia se abre en el momento en que fallece la persona. A partir de ese instante, los herederos adquieren la propiedad de los bienes, aunque todavía no la posesión física. La herencia incluye los bienes, derechos y también las deudas del fallecido.',
    relatedArticles: ['2278', '2279', '2280', '2286'],
    practicalEffects: ['Los herederos responden por las deudas del causante hasta el valor de los bienes heredados (beneficio de inventario automático, art. 2317)', 'Los acreedores del fallecido pueden ejecutar los bienes de la herencia'],
    keywords: ['apertura de la sucesión', 'herencia', 'causante', 'fallecimiento', 'transmisión hereditaria', 'activo y pasivo hereditario'],
  },
  '2317': {
    plainLanguageExplanation: 'Los herederos solo responden por las deudas del fallecido hasta el valor de lo que heredaron: no tienen que pagar deudas del muerto con su propio dinero. Este "beneficio de inventario" es automático: no hay que solicitarlo.',
    relatedArticles: ['2277', '2316', '2318', '2280'],
    practicalEffects: ['Si el fallecido tenía más deudas que bienes, los herederos no pagan la diferencia', 'Es importante realizar el inventario y avalúo de la herencia para fijar el límite de responsabilidad', 'Los herederos que confunden los bienes propios con los hereditarios pueden perder el beneficio'],
    keywords: ['beneficio de inventario', 'responsabilidad del heredero', 'deudas del causante', 'ultra vires hereditatis', 'intra vires'],
  },
  '2424': {
    plainLanguageExplanation: 'Cuando una persona muere sin testamento, heredan sus parientes más cercanos según un orden establecido por ley: primero los descendientes (hijos, nietos), luego los ascendientes (padres, abuelos), y el cónyuge concurre con ambos. Los colaterales (hermanos) solo heredan si no hay ninguno de los anteriores.',
    relatedArticles: ['2425', '2426', '2427', '2428', '2433'],
    practicalEffects: ['Los hijos excluyen a los padres y hermanos', 'El cónyuge concurre con descendientes y ascendientes pero tiene derechos sobre los gananciales', 'Los nietos heredan por representación si el padre premurió'],
    keywords: ['sucesión intestada', 'ab intestato', 'herederos legales', 'orden sucesorio', 'descendientes', 'ascendientes', 'cónyuge'],
  },
  '2444': {
    plainLanguageExplanation: 'La legítima es la porción de herencia que la ley reserva forzosamente para los herederos forzosos (hijos, ascendientes, cónyuge). El testador no puede disponer libremente de esa porción: si lo hace, los herederos perjudicados pueden impugnar.',
    relatedArticles: ['2445', '2446', '2447', '2448'],
    practicalEffects: ['Un padre no puede dejar toda su herencia a un extraño ignorando a sus hijos', 'Los hijos tienen derecho a los 2/3 de la herencia (legítima)', 'La acción de reducción permite reclamar lo que se donó de más en vida'],
    keywords: ['porción legítima', 'legítima hereditaria', 'herederos forzosos', 'porción disponible', 'acción de reducción'],
  },
  '2445': {
    plainLanguageExplanation: 'La porción legítima de los hijos es 2/3 del caudal hereditario. La de los ascendientes (padres, abuelos) es 1/2. La del cónyuge es 1/4. El resto (porción disponible) puede dejarse a quien el testador quiera.',
    relatedArticles: ['2444', '2446', '2447'],
    practicalEffects: ['Un padre con 3 hijos puede disponer libremente solo del 1/3 de su patrimonio por testamento', 'Si hay solo ascendientes, puede disponer del 1/2', 'Si hay solo cónyuge, puede disponer de los 3/4'],
    keywords: ['porción legítima hijos', 'porción legítima ascendientes', 'porción legítima cónyuge', 'porción disponible', 'dos tercios', 'un medio'],
  },

  // ── Libro Sexto: Prescripción ────────────────────────────────────────────
  '2560': {
    plainLanguageExplanation: 'El plazo de prescripción ordinario (general) en Argentina es de 5 años. Esto significa que si no se ejerce un derecho durante 5 años, la acción judicial para reclamarlo se extingue, salvo que exista un plazo específico menor para ese tipo de derecho.',
    relatedArticles: ['2561', '2562', '2563', '2554'],
    practicalEffects: ['Las deudas civiles ordinarias prescriben a los 5 años', 'Muchos derechos específicos tienen plazos menores: 3 años para daños (art. 2561), 2 años para contratos típicos (art. 2562)', 'La prescripción puede interrumpirse (demanda judicial, reconocimiento de deuda) o suspenderse'],
    keywords: ['prescripción', 'plazo ordinario', 'cinco años', 'extinción de la acción', 'plazo general de prescripción'],
  },
  '2561': {
    plainLanguageExplanation: 'Las acciones por daños prescriben a los 3 años. Este es el plazo especial más importante en la práctica: accidentes de tránsito, mala praxis médica, daños del empleador, daños por productos defectuosos.',
    relatedArticles: ['2560', '2562', '2554', '2564'],
    practicalEffects: ['Víctima de accidente: debe demandar dentro de los 3 años desde que supo quién le causó el daño', 'La prescripción corre desde el conocimiento del daño y del responsable (art. 2554)', 'El reconocimiento de responsabilidad por el asegurador interrumpe la prescripción'],
    keywords: ['prescripción de daños', 'tres años', 'acción de daños', 'accidente', 'mala praxis', 'plazo especial'],
  },
  '2554': {
    plainLanguageExplanation: 'La prescripción comienza a correr desde el día en que el titular del derecho pudo ejercer la acción. Para los daños: desde que el damnificado conoció o debió conocer el daño y supo quién fue el responsable.',
    relatedArticles: ['2555', '2556', '2557', '2560', '2561'],
    practicalEffects: ['Si la víctima no sabía quién era el responsable, el plazo no corre hasta que lo descubre', 'La prescripción no corre contra quien no puede actuar (menor de edad, persona incapaz)', 'Ante la duda sobre el inicio del plazo, se favorece al acreedor (principio pro actione)'],
    keywords: ['inicio de la prescripción', 'dies a quo', 'conocimiento del daño', 'cómputo de la prescripción'],
  },
};

export function applyEnrichment(articles: Article[]): Article[] {
  return articles.map((art) => {
    const e = ARTICLE_ENRICHMENT[art.number];
    if (!e) return art;
    return {
      ...art,
      plainLanguageExplanation: e.plainLanguageExplanation ?? art.plainLanguageExplanation,
      relatedArticles: e.relatedArticles ?? art.relatedArticles,
      practicalEffects: e.practicalEffects ?? art.practicalEffects,
      examples: e.examples ?? art.examples,
      keywords: e.keywords ?? art.keywords,
    };
  });
}
