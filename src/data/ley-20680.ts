/**
 * Ley 20.680 (1974) — Ley de Abastecimiento. DEROGADA por el DNU 70/2023 (art. 9).
 *
 * Se carga el TEXTO ACTUALIZADO/VIGENTE al momento de su derogación: el articulado
 * consolidado tras la reforma integral de la Ley 26.991 (BO 19/09/2014), que sustituyó
 * casi todos sus artículos. No se reproduce el texto original de 1974 (muy distinto y
 * derogado). El art. 9 del DNU 70/2023 derogó la ley completa; esa derogación no fue
 * suspendida judicialmente (las suspensiones del DNU recayeron sobre el capítulo laboral).
 *
 * Arts. 25 y 26 ya habían sido derogados por la Ley 26.991.
 *
 * Fuente oficial: https://www.argentina.gob.ar/normativa/nacional/ley-20680-58603/actualizacion
 */
import type { Law, Article } from '../common/types/law.types';

const LAW_ID = 'ley-20680';

function art(number: string, title: string, text: string, explanation: string): Article {
  const id = `${LAW_ID}-art-${number}`;
  return {
    id, lawId: LAW_ID, number, title, text,
    plainLanguageExplanation: explanation,
    practicalEffects: [], examples: [], relatedArticles: [], jurisprudence: [],
    regulations: [], keywords: [], order: Number(number),
    segments: [{
      id: `${id}-s1`, lawId: LAW_ID, articleId: id, articleNumber: number,
      segmentType: 'PARAGRAPH', text, plainExplanation: explanation,
      practicalExample: null, references: [], order: 0,
    }],
    amendments: [],
  };
}

const ARTICULOS: Article[] = [
  art('1', 'Ámbito de aplicación',
    `La presente ley regirá con respecto a la compraventa, permuta y locación de cosas muebles, obras y servicios —sus materias primas directas o indirectas y sus insumos— lo mismo que a las prestaciones —cualquiera fuere su naturaleza, contrato o relación jurídica que las hubiere originado, de carácter gratuito u oneroso, habitual u ocasional— que se destinen a la producción, construcción, procesamiento, comercialización, sanidad, alimentación, vestimenta, higiene, vivienda, deporte, cultura, transporte y logística, esparcimiento, así como cualquier otro bien mueble o servicio que satisfaga —directa o indirectamente— necesidades básicas o esenciales orientadas al bienestar general de la población. El ámbito de aplicación de esta ley comprende todos los procesos económicos relativos a dichos bienes, prestaciones y servicios y toda otra etapa de la actividad económica vinculada directa o indirectamente a los mismos. Quedan exceptuados del régimen los agentes económicos considerados micro, pequeñas o medianas empresas (MIPyMEs), de conformidad con la ley 25.300, siempre que no detenten posición dominante en los términos de los artículos 4° y 5° de la ley 25.156.`,
    `Definía el enorme alcance de la Ley de Abastecimiento: casi toda la economía de bienes y servicios que cubren necesidades básicas (alimentos, vestimenta, vivienda, salud, transporte, etc.) y todas sus etapas. Las MIPyMEs sin posición dominante quedaban exceptuadas. La ley completa fue derogada por el DNU 70/2023.`),
  art('2', 'Facultades de la autoridad de aplicación',
    `En relación a todo lo comprendido en el artículo 1°, en caso de configurarse alguno de los supuestos del artículo 4°, la autoridad de aplicación podrá: a) Establecer, para cualquier etapa del proceso económico, márgenes de utilidad, precios de referencia, niveles máximos y mínimos de precios, o todas o algunas de estas medidas; b) Dictar normas que rijan la comercialización, intermediación, distribución y/o producción; c) Disponer la continuidad en la producción, industrialización, comercialización, transporte, distribución o prestación de servicios, dentro de niveles o cuotas mínimas, contemplando que resulte económicamente viable o, en su defecto, fijando una justa compensación; d) Acordar subsidios cuando sea necesario para asegurar el abastecimiento; e) Requerir documentación relativa al giro comercial, con carácter reservado; f) Exigir la exhibición de libros, documentos y papeles de comercio, y realizar pericias técnicas; g) Proceder, de ser necesario, al secuestro de los elementos aludidos por un plazo máximo de treinta (30) días hábiles; h) Crear registros y obligar a llevar libros especiales; i) Establecer regímenes de licencias comerciales. Quienes estimen que sufrirán grave e irreparable perjuicio económico podrán solicitar la revisión de las medidas, sin que ello los excuse de cumplirlas mientras no se resuelva su petición.`,
    `Era el corazón de la ley: facultaba al Estado a intervenir fuertemente en la economía —fijar precios máximos, mínimos y de referencia, márgenes de ganancia, obligar a producir y abastecer, dar subsidios, pedir documentación, secuestrar elementos y exigir licencias—. Estas atribuciones de control de precios fueron eliminadas por el DNU 70/2023 al derogar la ley.`),
  art('3', 'Facultades de las provincias y la CABA',
    `Los Gobernadores de Provincia y/o el Jefe de Gobierno de la Ciudad Autónoma de Buenos Aires podrán fijar —dentro de sus respectivas jurisdicciones— precios máximos y medidas complementarias, mientras el Poder Ejecutivo o el organismo nacional de aplicación no los establecieren, dando cuenta de inmediato a este último. También podrán disponer las medidas de los incisos e), f), g) y h) del artículo 2°. Podrán modificar los precios fijados por la autoridad nacional cuando la localización de la producción, los fletes u otros factores permitan reducirlos; si en cambio requirieran incrementarlos, deberán pedir autorización previa al organismo nacional, que deberá expedirse en quince (15) días hábiles.`,
    `Permitía a las provincias y la Ciudad de Buenos Aires fijar precios máximos y otras medidas en su territorio mientras la Nación no lo hiciera, pudiendo bajar (pero no subir sin permiso) los precios nacionales según costos locales.`),
  art('4', 'Conductas sancionables',
    `Serán pasibles de las sanciones del artículo 5° y, en su caso, del artículo 6°, quienes: a) Elevaren artificial o injustificadamente los precios en forma que no responda proporcionalmente a los aumentos de los costos, u obtuvieren ganancias abusivas; b) Revaluaren existencias, salvo autorización expresa; c) Acapararen materias primas o productos, o formaren existencias superiores a las necesarias; d) Intermediaren o crearen artificialmente etapas en la distribución y comercialización; e) Destruyeren mercaderías o impidieren la prestación de servicios para hacer escasear su producción, venta o transporte; f) Negaren o restringieren injustificadamente la venta de bienes o la prestación de servicios, o redujeren sin causa la producción habitual habiendo sido intimados; g) Desviaren o discontinuaren el abastecimiento normal de una zona a otra sin causa justificada; h) No tuvieren para su venta o discontinuaren la producción de mercaderías con precios o márgenes fijados; i) No entregaren factura o comprobante de venta, ni la información prevista, o ejercieran fuera de los registros y licencias; j) Vulneraren cualesquiera de las disposiciones adoptadas en ejercicio de los artículos 2° y 3°.`,
    `Enumeraba las conductas que la ley castigaba: subir precios de forma injustificada, obtener "ganancias abusivas", acaparar productos, desabastecer, negar ventas, no facturar, etc. Estas figuras —en especial las "ganancias abusivas" y el "acaparamiento"— eran las más controvertidas y fueron eliminadas con la derogación por el DNU 70/2023.`),
  art('5', 'Sanciones',
    `Quienes incurrieren en los actos u omisiones del artículo 4° serán pasibles de: a) Multa de pesos quinientos ($ 500) a pesos diez millones ($ 10.000.000), pudiendo aumentarse hasta el triple de la ganancia obtenida en infracción; b) Clausura del establecimiento por hasta noventa (90) días; c) Inhabilitación de hasta dos (2) años para el uso o renovación de créditos de entidades públicas; d) Comiso de las mercaderías objeto de la infracción; e) Inhabilitación especial de hasta cinco (5) años para ejercer el comercio y la función pública; f) Suspensión de hasta cinco (5) años en los registros de proveedores del Estado; g) Pérdida de concesiones, privilegios o regímenes impositivos o crediticios especiales. Las sanciones podrán imponerse en forma independiente o conjunta.`,
    `Fijaba el catálogo de castigos por las conductas del art. 4: multas, clausura del comercio hasta 90 días, comiso de mercadería, inhabilitaciones para el comercio y para obtener crédito público, y pérdida de beneficios. Podían aplicarse varias a la vez.`),
  art('6', 'Reincidencia',
    `En caso de reincidencia, los límites máximos de los montos del inciso a) del artículo 5° y los términos de sus incisos b), c), e) y f) podrán elevarse hasta el doble de la sanción originaria.`,
    `Al reincidente se le podían duplicar la multa y los plazos de clausura, inhabilitación y suspensión.`),
  art('7', 'Graduación de las sanciones',
    `Para la fijación de las sanciones, pecuniarias o personales, se tomará en cuenta en cada caso: a) La dimensión económica de la empresa, atendiendo en especial al capital en giro; b) La posición en el mercado del infractor; c) El efecto e importancia socio-económica de la infracción; d) El lucro generado con la conducta sancionada y su duración temporal; e) El perjuicio provocado al mercado o a los consumidores.`,
    `Daba los criterios para graduar la sanción: el tamaño de la empresa, su poder de mercado, la gravedad y duración de la infracción, la ganancia obtenida y el daño causado.`),
  art('8', 'Responsabilidad de las personas jurídicas',
    `Cuando las infracciones hubieren sido cometidas en beneficio de una persona jurídica, asociación o sociedad, se le dará carácter de parte, sin perjuicio de la responsabilidad personal de los autores. En caso de condena se podrá imponer como sanción complementaria la pérdida de la personería y la caducidad de las prerrogativas acordadas. Los directores, administradores, gerentes y miembros que hubieren participado obrando con dolo o culpa grave serán pasibles de la sanción del artículo 5° inciso a), disminuyéndose a la cuarta parte los límites mínimos y máximos.`,
    `Hacía responsable a la empresa cuando la infracción se cometía en su beneficio (pudiendo perder hasta la personería jurídica) y, además, a sus directores y gerentes que hubieran actuado con dolo o culpa grave, con multas reducidas a un cuarto.`),
  art('9', 'Obstrucción a la autoridad',
    `Todos aquellos que obstruyeren o dificultaren la acción de los encargados de aplicar las disposiciones de esta ley, o no cumplieren los requerimientos de los organismos de aplicación, serán pasibles de una multa de hasta pesos un millón ($ 1.000.000).`,
    `Multaba a quien obstruyera o no respondiera a los controles de la autoridad de aplicación.`),
  art('10', 'Procedimiento sumarial',
    `La verificación de las infracciones y la sustanciación de las actuaciones se ajustarán al siguiente procedimiento: a) Se labrará un acta de comprobación con indicación del funcionario actuante, los testigos y la notificación al presunto infractor, quien dentro de los diez (10) días hábiles podrá presentar por escrito su defensa y ofrecer pruebas; en el acta se explicitará la conducta imputada; b) Las pruebas se admitirán solo en caso de hechos controvertidos y siempre que no resulten manifiestamente inconducentes; c) La prueba deberá producirse dentro de los diez (10) días hábiles, prorrogables por causa justificada; d) Concluidas las diligencias, dentro de los cinco (5) días hábiles se dictará la resolución definitiva, con dictamen jurídico previo.`,
    `Establecía cómo se tramitaba una infracción: se labraba un acta, el imputado tenía 10 días para defenderse y ofrecer pruebas, y luego se dictaba resolución. Era un procedimiento administrativo rápido.`),
  art('11', 'Valor probatorio del acta',
    `Las constancias del acta labrada en forma, que no sean enervadas por otras pruebas, constituirán prueba suficiente de responsabilidad del infractor. En caso de que éste se negare a firmarla, se dejará constancia de ello y se considerará formalmente válida con la sola firma del funcionario actuante, sirviendo como principio de prueba.`,
    `El acta del inspector, si no era desvirtuada por otras pruebas, bastaba para tener por probada la infracción, incluso si el comerciante se negaba a firmarla.`),
  art('12', 'Facultades de los funcionarios actuantes',
    `Para el cumplimiento de su cometido, los funcionarios actuantes podrán: a) Requerir el auxilio de la fuerza pública; b) Ingresar e inspeccionar en horas hábiles los locales comerciales e industriales, y solicitar órdenes de allanamiento para días u horas inhábiles o domicilios particulares; c) Secuestrar libros y elementos relativos a la administración de los negocios por un plazo máximo de treinta (30) días hábiles; d) Intervenir la mercadería en infracción, aun en tránsito, nombrando depositario; e) Clausurar preventivamente hasta por tres (3) días los locales donde se constatare la infracción, pudiendo solicitar judicialmente su extensión hasta treinta (30) días; f) Intervenir e inmovilizar las mercaderías objeto de una maniobra tendiente a reducir la oferta; g) Citar a los presuntos infractores, perjudicados o testigos a prestar declaración.`,
    `Daba a los inspectores amplios poderes: pedir auxilio policial, inspeccionar locales, secuestrar libros, intervenir mercadería, clausurar preventivamente y citar a declarar. Eran facultades fuertes de control directo sobre los comercios.`),
  art('13', 'Clausura y pago de remuneraciones',
    `En todos los casos de clausura, preventiva o temporaria, los infractores podrán retirar de inmediato los bienes perecederos, siempre que no constituyan elementos de prueba indispensables. Mientras dure la clausura, los prevenidos o sancionados deberán pagar íntegramente las remuneraciones del personal en relación de dependencia.`,
    `Aunque el local estuviera clausurado, el comerciante seguía obligado a pagar los sueldos de sus empleados, y podía retirar lo perecedero que no fuera prueba.`),
  art('14', 'Venta de mercaderías intervenidas',
    `Las mercaderías intervenidas en virtud del artículo 12, incisos d) y f), podrán ser vendidas, locadas o consignadas cuando fueren perecederas y/o cuando su abastecimiento sea insuficiente, sin necesidad de depósito previo ni juicio de expropiación. Si recayera resolución que exima de responsabilidad a su propietario, se fijará el monto de la indemnización siguiendo las pautas en materia de expropiaciones.`,
    `Permitía al Estado vender la mercadería intervenida si era perecedera o escaseaba, indemnizando luego al dueño si resultaba inocente.`),
  art('15', 'Autoridad de aplicación y competencia judicial',
    `El Poder Ejecutivo designará la autoridad de aplicación en el ámbito nacional. Las infracciones cometidas en territorios de jurisdicción nacional o que afectaren el comercio interjurisdiccional serán controladas y juzgadas en sede administrativa por la autoridad de aplicación, salvo las sanciones de clausura e inhabilitación especial, que serán impuestas por el Juez Nacional de Primera Instancia en lo Contencioso Administrativo Federal (en la CABA) o por el juez federal correspondiente. Se entenderá por comercio interjurisdiccional el realizado con naciones extranjeras, entre provincias o con la CABA, o con establecimientos de utilidad nacional.`,
    `Definía quién aplicaba la ley: la autoridad nacional juzgaba en sede administrativa, salvo las clausuras e inhabilitaciones, que quedaban en manos de jueces federales. También definía qué era "comercio interjurisdiccional".`),
  art('16', 'Recurso directo contra las sanciones',
    `La resolución administrativa que imponga sanciones podrá ser impugnada solamente por vía de recurso directo ante la Cámara Nacional de Apelaciones en lo Contencioso Administrativo Federal o ante las cámaras federales competentes. El recurso deberá interponerse y fundarse ante la misma autoridad que impuso la sanción, dentro de los diez (10) días hábiles de notificada la resolución; la autoridad deberá elevarlo con su contestación a la Cámara en un plazo de diez (10) días.`,
    `La empresa sancionada podía apelar, pero solo mediante un recurso directo ante la Cámara Federal, presentado en 10 días ante la misma autoridad que la sancionó.`),
  art('17', 'Depósito previo de la multa (solve et repete)',
    `Para interponer el recurso directo contra una resolución que imponga sanción de multa, deberá depositarse el monto de la multa a la orden de la autoridad que la dispuso, y presentar el comprobante con el escrito del recurso, sin cuyo requisito será desestimado, salvo que el cumplimiento pudiese ocasionar un perjuicio irreparable al recurrente.`,
    `Imponía el "solve et repete": para poder apelar una multa había que pagarla primero (depositarla), salvo que eso causara un perjuicio irreparable.`),
  art('18', 'Infracciones provinciales',
    `Las infracciones cometidas en las provincias y que afecten exclusivamente al comercio de sus respectivas jurisdicciones serán juzgadas en sede administrativa por los organismos que determine cada una de ellas, sin perjuicio de lo dispuesto en el artículo 3º.`,
    `Las infracciones puramente locales las juzgaba cada provincia con sus propios organismos.`),
  art('19', 'Conversión de la multa en clausura',
    `La resolución que imponga pena de multa podrá disponer que la misma se convierta en clausura, en caso de no ser abonada en el plazo establecido. El término de la clausura se fijará en el equivalente entre pesos quinientos ($ 500) y pesos un millón ($ 1.000.000) por cada día de clausura, pero no podrá exceder de noventa (90) días.`,
    `Si no se pagaba la multa, podía transformarse en clausura del local, de hasta 90 días según el monto adeudado.`),
  art('20', 'Ejecución fiscal de las multas',
    `La falta de pago de las multas hará exigible su cobro por el procedimiento de ejecución fiscal, constituyendo título suficiente de ejecución el testimonio de la resolución condenatoria firme expedida por el organismo de juzgamiento.`,
    `Las multas impagas se cobraban por vía judicial rápida (ejecución fiscal), usando la resolución firme como título ejecutivo.`),
  art('21', 'Destino de los bienes decomisados',
    `Los bienes decomisados serán vendidos o locados por la autoridad de aplicación en un plazo máximo de treinta (30) días corridos desde su decomiso, atendiendo a su naturaleza. Si fueran perecederos, el plazo se reducirá a cinco (5) días corridos; el producto de la venta o locación ingresará a rentas generales de la Nación.`,
    `La mercadería decomisada se vendía o alquilaba en hasta 30 días (5 si era perecedera) y lo recaudado iba al Estado.`),
  art('22', 'Prescripción de las infracciones',
    `Las infracciones a esta ley y sus normas complementarias prescribirán a los tres (3) años. La prescripción se interrumpirá por la comisión de nuevas infracciones o por el inicio de las actuaciones administrativas o judiciales.`,
    `Las infracciones prescribían a los 3 años, plazo que se reiniciaba con una nueva infracción o al iniciarse las actuaciones.`),
  art('23', 'Destino de multas y decomisos',
    `El importe de las multas y/o el producido de los decomisos ingresará al Fisco Nacional o Provincial, según el órgano que hubiera dictado la resolución condenatoria. Los gobiernos locales dispondrán el destino de los fondos que se perciban en sus respectivas jurisdicciones.`,
    `Lo recaudado por multas y decomisos iba al fisco nacional o provincial según quién hubiera sancionado.`),
  art('24', 'Deber de secreto de los funcionarios',
    `Los funcionarios y empleados que de cualquier forma participen en la aplicación de esta ley estarán obligados a mantener el secreto sobre todos los datos de actuaciones que lleguen a su conocimiento en el ejercicio de sus funciones. La infracción de esta norma será considerada falta grave a los efectos administrativos, sin perjuicio de las sanciones penales que correspondieren.`,
    `Obligaba a los funcionarios a guardar secreto sobre la información de las empresas a la que accedían; violarlo era falta grave y podía tener consecuencias penales.`),
  art('25', 'Artículo derogado — DEROGADO',
    `(Derogado por art. 19 de la Ley N° 26.991, B.O. 19/09/2014.)`,
    `[DEROGADO por la Ley 26.991] Este artículo fue eliminado en la reforma de 2014 y ya no regía.`),
  art('26', 'Artículo derogado — DEROGADO',
    `(Derogado por art. 19 de la Ley N° 26.991, B.O. 19/09/2014.)`,
    `[DEROGADO por la Ley 26.991] Este artículo fue eliminado en la reforma de 2014 y ya no regía.`),
  art('27', 'Medida ante el desabastecimiento',
    `Frente a una situación de desabastecimiento o escasez de bienes o servicios que satisfagan necesidades básicas o esenciales orientadas al bienestar general de la población, la autoridad de aplicación podrá disponer mediante resolución fundada su venta, producción, distribución o prestación en todo el territorio de la Nación, cualquiera sea su propietario, bajo apercibimiento de imponer las sanciones del artículo 5°. Dicha medida durará el tiempo que insuma la rehabilitación de la situación y será proporcional a la gravedad de los hechos.`,
    `Ante un desabastecimiento, autorizaba al Estado a obligar a producir, vender o distribuir bienes esenciales en todo el país, sin importar de quién fueran, por el tiempo necesario. Era una de las facultades más fuertes de la ley.`),
  art('28', 'Aplicación supletoria',
    `Para resolver cuestiones no previstas expresamente en la presente ley, se aplicarán supletoriamente las disposiciones de la Ley Nacional de Procedimientos Administrativos 19.549 y su reglamentación.`,
    `Lo que la ley no preveía se completaba con la Ley Nacional de Procedimientos Administrativos (19.549).`),
  art('29', 'Orden público y derogación previa',
    `La presente ley es de orden público; regirá desde el día siguiente de su publicación en el Boletín Oficial y deroga el Decreto Ley 19.508/72, modificado por el 20.125/73. Las infracciones consumadas durante la vigencia de estos últimos serán penadas según sus disposiciones, aunque se hubieren comprobado con posterioridad.`,
    `Declaraba la ley de orden público (no podía dejarse de lado por acuerdos privados) y derogaba la norma anterior de abastecimiento de 1972.`),
  art('30', 'Comunicación',
    `Comuníquese al Poder Ejecutivo.`,
    `Fórmula final de comunicación de la ley al Poder Ejecutivo.`),
];

export const LEY_20680: Law = {
  id: LAW_ID,
  number: '20680',
  title: 'Ley de Abastecimiento',
  commonName: 'Ley de Abastecimiento',
  shortCode: 'Ley 20.680',
  aliases: ['20.680', 'Ley de Abastecimiento', 'Abastecimiento', 'ley de góndolas'],
  isDestacada: true,
  summary:
    'Ley de Abastecimiento (1974): facultaba al Estado a intervenir en casi toda la economía de bienes y servicios esenciales —fijar precios máximos, mínimos y de referencia, márgenes de ganancia, obligar a producir y abastecer— y sancionaba conductas como las "ganancias abusivas", el acaparamiento y el desabastecimiento. Fue reformada integralmente por la Ley 26.991 (2014) y DEROGADA por completo por el art. 9 del DNU 70/2023.',
  category: 'economico',
  categories: ['economico', 'consumidor'],
  year: 1974,
  sanctionDate: '1974-06-20',
  promulgationDate: '1974-06-25',
  publicationDate: '1974-06-25',
  effectiveDate: '1974-06-26',
  derogatedDate: '2023-12-29',
  boNumber: '22939',
  status: 'DEROGADA',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/ley-20680-58603/actualizacion',
  articleCount: 30,
  topics: ['Abastecimiento', 'Control de precios', 'Desabastecimiento', 'Ganancias abusivas', 'Intervención económica'],
  keywords: [
    'ley de abastecimiento', '20.680', 'control de precios', 'precios máximos',
    'desabastecimiento', 'ganancias abusivas', 'acaparamiento', 'derogada', 'DNU 70/2023',
  ],
  relatedNorms: ['dnu-70-2023', 'ley-24240'],
  relations: [
    {
      type: 'RELACIONADA',
      targetLawId: 'dnu-70-2023',
      targetLawLabel: 'DNU 70/2023',
      description: 'La Ley de Abastecimiento fue derogada por el artículo 9 del DNU 70/2023, que eliminó las facultades estatales de control de precios y las figuras de "ganancias abusivas", acaparamiento y desabastecimiento.',
    },
    {
      type: 'RELACIONADA',
      targetLawId: 'ley-24240',
      targetLawLabel: 'Ley de Defensa del Consumidor',
      description: 'La Ley de Abastecimiento integraba, junto con la Ley de Defensa del Consumidor, el conjunto de normas de protección de los intereses económicos de los consumidores frente a abusos de precios y abastecimiento.',
    },
  ],
  executiveSummary:
    'Sancionada en 1974, la Ley de Abastecimiento dotó al Estado de amplias facultades para intervenir en la economía de los bienes y servicios esenciales: fijar precios máximos, mínimos y de referencia, márgenes de utilidad, obligar a producir y abastecer, otorgar subsidios y sancionar a quienes elevaran precios injustificadamente, acapararan productos o provocaran desabastecimiento. Reformada integralmente por la Ley 26.991 en 2014, fue uno de los instrumentos centrales del control de precios en la Argentina. El DNU 70/2023 la derogó por completo (art. 9), en el marco de la desregulación económica, eliminando esas potestades estatales. Se conserva aquí su texto consolidado a modo de referencia histórica.',
  objective:
    'Asegurar el abastecimiento y dar al Estado herramientas para controlar precios y conductas que afectaran la oferta de bienes y servicios esenciales para el bienestar general.',
  problemItSolves:
    'El desabastecimiento, el acaparamiento y los aumentos de precios considerados abusivos sobre bienes y servicios esenciales, en contextos de inflación o escasez.',
  practicalImpact:
    'Mientras estuvo vigente, permitía al Estado fijar precios y sancionar a empresas por "ganancias abusivas", acaparamiento o desabastecimiento. Con su derogación por el DNU 70/2023, esas facultades dejaron de existir y el control de precios por esta vía quedó sin sustento legal.',
  affectedSubjects: ['Empresas', 'Comercios', 'Productores', 'Consumidores', 'Estado nacional', 'Provincias'],
  articles: ARTICULOS,
  segments: [],
  annexes: [],
  amendments: [],
  metadata: {
    id: `${LAW_ID}-meta`,
    lawId: LAW_ID,
    mainTopic: 'Abastecimiento y control de precios',
    subtopics: ['Precios máximos', 'Ganancias abusivas', 'Acaparamiento', 'Desabastecimiento', 'Sanciones'],
    relatedLaws: ['DNU 70/2023', 'Ley de Defensa del Consumidor', 'Ley 26.991'],
    regulations: [], modifyingNorms: ['Ley 26.991'], derogatingNorms: ['DNU 70/2023'],
    jurisprudence: [], doctrine: [], obligations: [], rights: [], sanctions: [], useCases: [],
    faq: [
      {
        question: '¿La Ley de Abastecimiento sigue vigente?',
        answer: 'No. La Ley 20.680 de Abastecimiento fue derogada por completo por el artículo 9 del DNU 70/2023. Junto con ella se eliminaron las facultades estatales de fijar precios y las figuras de "ganancias abusivas", acaparamiento y desabastecimiento. Se conserva su texto a modo de referencia histórica.',
      },
      {
        question: '¿Qué permitía hacer la Ley de Abastecimiento?',
        answer: 'Facultaba al Estado a fijar precios máximos, mínimos y de referencia, márgenes de ganancia, obligar a producir y abastecer, otorgar subsidios y sancionar con multas, clausuras y comisos a quienes elevaran precios de forma injustificada, acapararan productos o provocaran desabastecimiento.',
      },
    ],
    createdAt: '2026-06-10T00:00:00.000Z',
    updatedAt: '2026-06-10T00:00:00.000Z',
  },
  createdAt: '2026-06-10T00:00:00.000Z',
  updatedAt: '2026-06-10T00:00:00.000Z',
};

export default LEY_20680;
