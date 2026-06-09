/**
 * Ley 27.545 (2020) — Ley de Góndolas. Reglas de exhibición y competencia en
 * supermercados. DEROGADA por el DNU 70/2023.
 *
 * Fuente oficial: https://www.argentina.gob.ar/normativa/nacional/ley-27545-335538/texto
 * Texto original literal (BO 34331, 17/03/2020).
 */
import type { Law, Article } from '../common/types/law.types';

const LAW_ID = 'ley-27545';

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
  art('1', 'Objetivos',
    `Objetivos. La presente ley tiene por objetivos: a) Contribuir a que el precio de los productos alimenticios, bebidas, de higiene y limpieza del hogar sea transparente y competitivo, en beneficio de los consumidores; b) Mantener la armonía y el equilibrio entre los operadores económicos alcanzados por la ley, con la finalidad de evitar que realicen prácticas comerciales que perjudiquen o impliquen un riesgo para la competencia u ocasionen distorsiones en el mercado; c) Ampliar la oferta de productos artesanales y/o regionales nacionales producidos por las micro, pequeñas y medianas empresas (mipymes) y proteger su actuación; d) Fomentar a través de un régimen especial, la oferta de productos del sector de la agricultura familiar, campesina e indígena, definido por el artículo 5° de la ley 27.118, y de la economía popular, definido por el artículo 2° del anexo del decreto 159/2017, y los productos generados a partir de cooperativas y/o asociaciones mutuales en los términos de la ley 20.337 y la ley 20.321.`,
    `Fija los fines de la ley: precios más transparentes y competitivos, evitar abusos entre operadores, ampliar la oferta de productos de Pymes y fomentar productos de la agricultura familiar, la economía popular y las cooperativas.`),
  art('2', 'Autoridad de aplicación',
    `Autoridad de aplicación. El Poder Ejecutivo nacional designará la autoridad de aplicación de la presente ley.`,
    `El Poder Ejecutivo decide qué organismo aplica y controla la ley (en la práctica, la Secretaría de Comercio).`),
  art('3', 'Sujetos alcanzados',
    `Sujetos alcanzados. Están obligados a dar cumplimiento a la presente ley los establecimientos definidos por el artículo 1° de la ley 18.425. Quedan exceptuados del régimen establecido en la presente ley los agentes económicos cuya facturación sea equivalente a las micro, pequeñas o medianas empresas (mipymes), de conformidad con lo previsto en el artículo 2° de la ley 24.467.`,
    `La ley se aplica a los grandes supermercados y cadenas (definidos por la Ley 18.425). Quedan afuera los comercios cuya facturación equivale a una Pyme.`),
  art('4', 'Productos alcanzados',
    `Productos alcanzados. Esta ley será aplicable exclusivamente respecto de la comercialización de alimentos, bebidas, productos de higiene personal y artículos de limpieza del hogar. La autoridad de aplicación deberá, en el lapso de noventa (90) días de promulgada la presente ley, confeccionar un listado de las distintas categorías de productos alcanzados que comercializan los sujetos indicados en el artículo 3°, y arbitrará los medios para su publicidad a la población en general. El listado deberá contener como mínimo la totalidad de productos de alimentos, bebidas, higiene y limpieza del hogar.`,
    `La ley cubre solo alimentos, bebidas, higiene personal y limpieza del hogar. La autoridad debe publicar el listado de categorías de productos alcanzados.`),
  art('5', 'Definiciones (góndola)',
    `Definiciones. A los fines de esta ley se entiende por góndola todo espacio físico, mueble, estantería, en los que se ofrecen productos de similares características, incluidos las puntas de góndola. No se incluyen los congeladores exclusivos, islas de exhibición y los exhibidores contiguos a la línea de caja. Asimismo, se hacen extensivas las disposiciones referidas a góndolas a las locaciones virtuales que posean los sujetos obligados por la presente ley de forma directa o indirecta, como por ejemplo su página web, aplicación móvil, tiendas de comercio electrónico o similares.`,
    `Define "góndola" como cualquier estantería o mueble de exhibición de productos similares (incluidas las puntas de góndola). También alcanza a las "góndolas virtuales": la web, la app o la tienda online del supermercado.`),
  art('6', 'Estímulo a la competencia',
    `Estímulo a la competencia. A los fines de estimular la competencia de productos, los sujetos indicados en el artículo 3° estarán obligados a que para cada categoría de productos se cumpla con las disposiciones siguientes: a) Queda prohibido generar una exclusión anticompetitiva de proveedores por el alquiler de espacios en góndolas o locaciones virtuales, o espacios preferenciales en góndolas o locaciones virtuales; b) En especial será considerada una exclusión anticompetitiva el pago de cánones y/o comisiones impuestas por los sujetos definidos en el artículo 3° de la presente, que por sus características o magnitud obliguen al proveedor a optar por un solo canal de distribución.`,
    `Prohíbe que los supermercados dejen afuera a proveedores cobrando alquiler por el espacio en góndola o cánones que obliguen al proveedor a venderle solo a una cadena.`),
  art('7', 'Reglas de exhibición de productos',
    `Reglas de exhibición de productos en góndolas, otros lugares de exhibición física y locaciones virtuales. Las góndolas ubicadas dentro de los establecimientos a cargo de los sujetos definidos en el artículo 3° de la presente y las locaciones virtuales del mismo deberán cumplir las siguientes reglas de exhibición de productos: a) En góndolas y locaciones virtuales la exhibición de productos de un proveedor o grupo empresario no podrá superar el treinta por ciento (30%) del espacio disponible que comparte con productos de similares características. La participación deberá involucrar a no menos de cinco (5) proveedores o grupos empresarios; b) En góndolas y locaciones virtuales deberá garantizarse un veinticinco por ciento (25%) del espacio disponible para productos de similares características y diferente marca, para la exhibición de productos producidos por micro y pequeñas empresas nacionales inscriptas en el Registro de Mipymes y/o en el RENAF, o los que en el futuro los reemplacen y/o producidos por cooperativas y/o asociaciones mutuales en los términos de la ley 20.337 y la ley 20.321; y un cinco por ciento (5%) adicional para productos originados por la agricultura familiar, campesina o indígena definido por el artículo 5° de la ley 27.118, y los sectores de la economía popular, definida por el artículo 2° del anexo del decreto 159/2017; c) En góndolas los productos de menor precio conforme la unidad de medida deberán encontrarse a una altura equidistante entre el primero y último estante. En locaciones virtuales, deberá garantizarse que los productos de menor precio conforme la unidad de medida se publiquen en la primera visualización de productos de la categoría en cuestión; d) En las islas de exhibición y exhibidores contiguos a las cajas se deberán presentar en un cincuenta por ciento (50%) del espacio productos elaborados por micro y pequeñas empresas nacionales inscriptas en el Registro de Mipymes y/o en el RENAF, o los que en el futuro los reemplacen y/o producidos por cooperativas y/o asociaciones mutuales en los términos de la ley 20.337 y la ley 20.321, o los que en el futuro los reemplace; e) En góndolas y locaciones virtuales la exhibición de productos importados no podrá superar el porcentaje que determine la autoridad de aplicación del espacio disponible para cada categoría de productos, en función de la capacidad de la industria nacional de satisfacer la demanda de productos, buscando fomentar el crecimiento de la misma. A los fines de lo dispuesto en los incisos anteriores, los productos de marcas licenciadas por los mismos grupos comerciales o de empresas vinculadas o controladas por éstos serán considerados de una única marca.`,
    `Es el corazón de la ley: pone topes de espacio en las góndolas. Una misma marca o grupo no podía ocupar más del 30% (con al menos 5 proveedores compitiendo); se reservaba 25% para Pymes y 5% para agricultura familiar; los productos más baratos debían ir a la altura media del estante, y se limitaba el espacio de los importados.`),
  art('8', 'Límites a los abusos de posición dominante',
    `Límites a los abusos de posición dominante. A los fines de reducir los costos para los proveedores de los sujetos indicados en el artículo 3°, se deberán cumplir con las siguientes condiciones en la relación entre los proveedores y los establecimientos de ventas: a) El plazo máximo de pagos a micro y pequeñas empresas nacionales inscriptas en el Registro de Mipymes y/o en el RENAF, o los que en el futuro los reemplacen, no podrá superar los sesenta (60) días corridos. Asimismo, los proveedores podrán aplicar intereses utilizando la Tasa Activa del Banco Nación en caso de pagos realizados fuera de término, siempre y cuando no existan razones legales y fundamentadas para el incumplimiento; b) Los sujetos indicados en el artículo 3° no podrán exigirles a los proveedores aportes o adelantos financieros por ningún motivo, ni podrán aplicar a los proveedores retenciones económicas o débitos unilaterales; estos últimos solo podrán aplicarse por mutuo acuerdo y cuando las condiciones para realizarlos estén expresamente contempladas en el contrato que los vincula; c) En la negociación contractual entre los sujetos indicados en el artículo 3° y el proveedor de uno o varios productos determinados no podrá oponerse como condición la entrega de mercadería gratuita o por debajo del costo de provisión, ni ninguna otra práctica contraria a la competencia; d) En la negociación de precios entre los sujetos indicados en el artículo 3° y el proveedor de uno o varios productos determinados no podrán interponerse las condiciones o variaciones de los precios de terceros proveedores; e) Está prohibido exigir a los proveedores los costos de distribución inversa o de reposición de los productos; f) Todos los costos por ventas promocionales de productos, o por la generación de residuos o mermas, deberán ser establecidos contractualmente y mediante criterios equitativos y objetivos; g) Las obligaciones contractuales o sus modificaciones que se celebren entre los sujetos alcanzados por la presente ley y sus proveedores, deberán formalizarse por escrito. h) Está prohibido pautar el suministro de información comercial sensible que sea impropia de la relación comercial o que suponga información referida a la relación del proveedor con otros operadores del mercado o información de la competencia.`,
    `Protege a los proveedores frente a las grandes cadenas: pago a Pymes en máximo 60 días, prohibición de exigir adelantos o aplicar retenciones unilaterales, de imponer mercadería gratis o por debajo del costo, de cobrarles la reposición, y obligación de poner todo por escrito.`),
  art('9', 'Promoción de productos regionales',
    `Promoción de productos regionales. Establécese para las compras y contrataciones entre los sujetos definidos en el artículo 3° de la presente ley y los sujetos del sector de la agricultura familiar, campesina e indígena, definido por el artículo 5° de la ley 27.118, de los sectores de la economía popular, definidos por el artículo 2° del anexo del decreto 159/2017, y/o producidos por cooperativas y/o asociaciones mutuales en los términos de la ley 20.337 y la ley 20.321 y productores de frutas y verduras en general que: a) No podrán acordarse plazos de pago superiores a los cuarenta (40) días corridos; b) Deberán establecerse esquemas flexibles y acordes al sector, para la entrega de productos; c) Deberán establecerse facilidades en los requisitos para la contratación, distribución y comercialización. Los proveedores podrán aplicar intereses utilizando la Tasa Activa del Banco Nación en caso de pagos realizados fuera de término, siempre y cuando no existan razones legales y fundamentadas para el incumplimiento.`,
    `Da condiciones más favorables a los productores de la agricultura familiar, la economía popular y las cooperativas: pago en máximo 40 días, esquemas de entrega flexibles y facilidades para contratar.`),
  art('10', 'Compre regional',
    `Compre regional. Los productos nacionales producidos por micro y pequeñas empresas, los sujetos del sector de la agricultura familiar, campesina e indígena, definido por el artículo 5° de la ley 27.118, de los sectores de la economía popular, definidos por el artículo 2° del anexo del decreto 159/2017, y/o producidos por cooperativas y/o asociaciones mutuales en los términos de la ley 20.337 y la ley 20.321, que sean ofrecidos en virtud de la presente ley, deben estar destacados en las góndolas y locaciones virtuales con un isologotipo que diseñe la autoridad de aplicación que exprese la leyenda 'Compre Mipyme' e indique el número de la presente ley.`,
    `Los productos de Pymes, agricultura familiar y cooperativas debían señalizarse en la góndola con un logo "Compre Mipyme", para que el consumidor los identificara fácilmente.`),
  art('11', 'Código de Buenas Prácticas',
    `Código de Buenas Prácticas. Créase el Código de Buenas Prácticas Comerciales de Distribución Mayorista y Minorista, que será de aplicación obligatoria para los sujetos definidos en el artículo 3°, y que tengan una facturación bruta anual superior a los trescientos millones (300.000.000) de unidades móviles de la ley 27.442, de defensa de la competencia, considerando la facturación de todo el grupo económico. El resto de las empresas podrán aplicar el Código de Buenas Prácticas Comerciales adhiriendo voluntariamente al mismo mediante el procedimiento que la autoridad de aplicación establezca a tales efectos. El código será confeccionado por la autoridad de aplicación, a partir de los lineamientos establecidos en la presente ley, y con la participación de los organismos nacionales, provinciales y municipales de defensa del consumidor según corresponda.`,
    `Crea un Código de Buenas Prácticas Comerciales, obligatorio para las cadenas más grandes y voluntario para el resto, que fija las reglas de trato entre supermercados y proveedores.`),
  art('12', 'Práctica comercial',
    `Práctica comercial. El Código de Buenas Prácticas Comerciales de Distribución debe incluir las prácticas consideradas abusivas conforme la presente ley y las que surjan de la normativa comercial vigente de lealtad comercial, defensa de la competencia, y defensa de los consumidores. Asimismo, se incluirá: a) La obligación de designar un responsable corporativo de cumplimiento del código, y la notificación del nombramiento a los proveedores y a la autoridad de aplicación; b) Disponer en los contratos de un procedimiento alternativo de resolución de conflictos, que podrá ser la mediación privada y/o el arbitraje; c) La remisión periódica a la autoridad de aplicación de la información requerida sobre el cumplimiento del código y la información requerida al Observatorio de la Cadena de Valor Alimenticia creado por la presente ley, en calidad de declaración jurada. Los contratos escritos celebrados entre las empresas alcanzadas y sus proveedores, deberán incorporar la copia del Código de Buenas Prácticas Comerciales.`,
    `Define qué debe contener el Código: la lista de prácticas abusivas, un responsable de cumplimiento, un mecanismo de resolución de conflictos (mediación o arbitraje) y la obligación de informar al organismo de control.`),
  art('13', 'Incumplimiento transitorio por falta de competencia',
    `Incumplimiento transitorio por falta de competencia. En los casos en que para una determinada categoría de productos sea transitoriamente imposible cumplir los límites mínimos establecidos en la presente ley, los sujetos indicados en el artículo 3° deberán informar a la autoridad de aplicación las razones fundadas para dicho incumplimiento y el plazo esperado para ajustarse a la presente, que no podrá superar los treinta (30) días, prorrogables por única vez por igual plazo. Solo podrá eximirse del cumplimiento de los topes establecidos en la presente en aquellos casos donde la autoridad de aplicación compruebe la imposibilidad fáctica de ofertar los productos que esta ley busca fomentar. Antes de determinar como desierta la oferta de productos en determinados segmentos, deberán publicarse en el portal web que determine la reglamentación por el plazo de sesenta (60) días productos, precios, demanda anualizada asegurada y requisitos de abastecimiento a fin de garantizar la búsqueda de nuevos proveedores. La ausencia de proveedores permitirá el incumplimiento parcial de la presente ley hasta tanto no se presente un nuevo proveedor a satisfacer la demanda de las cadenas de comercialización.`,
    `Prevé que, si no hay suficientes proveedores para cumplir los cupos de una categoría, el supermercado puede pedir una excepción temporal (hasta 30 días, prorrogables), debiendo antes buscar nuevos proveedores publicando la demanda.`),
  art('14', 'Orden público',
    `Orden público. Las disposiciones de esta ley son de orden público.`,
    `La ley es de orden público: sus reglas no pueden dejarse de lado por acuerdo entre las partes.`),
  art('15', 'Integración con otras normas',
    `Integración. Las disposiciones de esta ley se integran con las normas generales y especiales aplicables a las relaciones de consumo y de la competencia, en particular las leyes 24.240, de Defensa del Consumidor, 27.442, de Defensa de la Competencia, Régimen de Lealtad Comercial, y/o las que las reemplacen. En caso de duda sobre la interpretación de los principios que establece esta ley prevalecerá la más favorable a los sectores más débiles que participan en la cadena de producción, comercialización y consumo de los productos incluidos en el sistema.`,
    `La Ley de Góndolas se complementa con la Ley de Defensa del Consumidor, la de Defensa de la Competencia y el régimen de lealtad comercial. Ante dudas, se interpreta a favor del sector más débil de la cadena.`),
  art('16', 'Plazo de adecuación',
    `Plazo. Los establecimientos contemplados en el artículo 3° tendrán un plazo de ciento veinte (120) días corridos a partir de la promulgación de la presente ley para hacer las modificaciones que sean necesarias e implementar las disposiciones de esta ley.`,
    `Dio a los supermercados 120 días desde la promulgación para adaptar sus góndolas y cumplir con la ley.`),
  art('17', 'Sanciones',
    `Sanciones. En caso de incumplimiento a las disposiciones de la presente ley, la autoridad de aplicación aplicará las normas referidas a procedimiento y sanciones establecidas en el Régimen de Lealtad Comercial, promoviendo la participación de las organizaciones de Defensa del Consumidor de todo el país. Quedarán legitimados para promover denuncias por el incumplimiento de esta ley los sujetos enumerados en el artículo 18 de la presente ley. Si el incumplimiento afectara a los consumidores, también podrán iniciarse las denuncias ante las autoridades de aplicación de la ley 24.240 nacionales, provinciales o municipales. El incumplimiento de la presente ley será pasible de las sanciones y multas previstas en el Régimen de Lealtad Comercial, sin perjuicio de las demás sanciones que pudieren corresponder conforme el procedimiento de la ley 27.442 o 24.240. Los fondos recaudados en virtud de la aplicación de multas pecuniarias por incumplimientos de la presente ley serán asignados por la autoridad de aplicación conforme la siguiente distribución: a) Setenta por ciento (70%) para el fomento publicitario del compre alimentos nacionales bajo esta ley. A su vez, de dicho monto, el cincuenta por ciento (50%) del presupuesto será aplicado en medios de comunicación masivos y el cincuenta por ciento (50%) en medios de comunicación pymes y cooperativos; b) Veinticinco por ciento (25%) del total de las multas aplicado para un fondo de desarrollo de los sujetos del sector de la agricultura familiar, campesina e indígena, definido por el artículo 5° de la ley 27.118, de los sectores de la economía popular, definidos por el artículo 2° del Anexo del Decreto 159/2017, Cooperativas y Asociaciones Mutuales en los términos de la ley 20.337 y la ley 20.321, vía créditos a tasa variable según la inflación del IPC INDEC más costos administrativos del Banco Nación; c) Cinco por ciento (5%) para el funcionamiento del Observatorio de la Cadena de Valor.`,
    `Las infracciones se sancionan con las multas del régimen de lealtad comercial. La ley reparte lo recaudado: 70% para promocionar el "compre nacional", 25% para un fondo de desarrollo de la agricultura familiar y la economía popular, y 5% para el Observatorio de la Cadena de Valor.`),
  art('18', 'Delegación (fiscalización por asociaciones)',
    `Delegación. Las asociaciones, cámaras empresariales, cooperativas de la economía popular que nucleen a los sujetos que participan en la producción y comercialización de los productos comprendidos en la presente ley, así como las asociaciones de consumidores inscriptas en el Registro Nacional de Asociaciones de Consumidores podrán fiscalizar el cumplimiento de la presente en carácter de colaborador ad honórem del órgano de control, previo convenio institucional de las partes que prevea el registro y capacitación de las personas habilitadas para tal fin.`,
    `Permite que cámaras, cooperativas y asociaciones de consumidores colaboren gratis en el control del cumplimiento de la ley, previa capacitación y convenio con el organismo de control.`),
  art('19', 'Observatorio de la Cadena de Valor',
    `Observatorio. Créase en el ámbito de la autoridad de aplicación de la presente ley el Observatorio de la Cadena de Valor, que requerirá y recopilará información relevante de las diferentes instancias de los procesos de producción de los productos alcanzados por la presente ley en el ámbito de la República Argentina. El observatorio tendrá por función el seguimiento, consulta, información y estudio del funcionamiento de la cadena de valor de los productos alcanzados por la presente ley, así como también el asesoramiento de los órganos de la administración pública involucrados.`,
    `Crea un Observatorio de la Cadena de Valor para recopilar información y estudiar cómo funciona la producción y comercialización de los productos alcanzados, y asesorar al Estado.`),
  art('20', 'Registro',
    `Registro. El registro creado por el artículo 6° de la ley 27.345 deberá contemplar las particularidades que se necesiten para el cumplimiento de la presente ley.`,
    `Dispone que el registro de la economía popular (creado por la Ley 27.345) se adapte a las necesidades de esta ley.`),
  art('21', 'Difusión',
    `Difusión. La autoridad de aplicación deberá difundir en medios nacionales y locales, en la vía pública y en la web, los objetivos y contenidos de la presente ley. Asimismo, deberá habilitar una línea telefónica gratuita para recepción de denuncias de falta de competencia para consumidores y asociaciones de consumidores.`,
    `Obliga al Estado a difundir la ley y a habilitar una línea telefónica gratuita para que consumidores y asociaciones denuncien la falta de competencia.`),
  art('22', 'Comunicación',
    `Comuníquese al Poder Ejecutivo nacional.`,
    `Fórmula final de comunicación de la ley al Poder Ejecutivo.`),
];

export const LEY_27545: Law = {
  id: LAW_ID,
  number: '27545',
  title: 'Ley de Góndolas',
  commonName: 'Ley de Góndolas',
  shortCode: 'Ley 27.545',
  aliases: ['27.545', 'Ley de Góndolas', 'Góndolas'],
  isDestacada: true,
  summary:
    'Ley de Góndolas (2020): estableció reglas de exhibición y competencia para los grandes supermercados — topes de espacio por marca, cupos para Pymes y productos de la agricultura familiar, ubicación de los productos más baratos y límites a los abusos sobre los proveedores. Fue derogada por el DNU 70/2023, que la consideró una intervención sobre el comercio.',
  category: 'consumidor',
  categories: ['consumidor', 'economico'],
  year: 2020,
  sanctionDate: '2020-02-28',
  promulgationDate: '2020-03-17',
  publicationDate: '2020-03-17',
  effectiveDate: '2020-03-17',
  derogatedDate: '2023-12-29',
  boNumber: '34331',
  status: 'DEROGADA',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/ley-27545-335538/texto',
  articleCount: 22,
  topics: ['Góndolas', 'Supermercados', 'Defensa del consumidor', 'Competencia', 'Pymes', 'Comercio'],
  keywords: [
    'ley de góndolas', '27.545', 'supermercados', 'góndola', 'competencia',
    'pymes', 'proveedores', 'precios', 'agricultura familiar', 'compre mipyme',
  ],
  relatedNorms: ['dnu-70-2023', 'ley-24240'],
  relations: [
    {
      type: 'RELACIONADA',
      targetLawId: 'dnu-70-2023',
      targetLawLabel: 'DNU 70/2023',
      description: 'La Ley de Góndolas fue derogada por el DNU 70/2023, que eliminó las reglas de exhibición y competencia en supermercados.',
    },
    {
      type: 'RELACIONADA',
      targetLawId: 'ley-24240',
      targetLawLabel: 'Ley de Defensa del Consumidor',
      description: 'Se integraba con la Ley de Defensa del Consumidor y con el régimen de lealtad comercial y defensa de la competencia.',
    },
  ],
  executiveSummary:
    'Sancionada en 2020, la Ley de Góndolas reguló cómo los grandes supermercados debían exhibir y comercializar alimentos, bebidas y productos de higiene y limpieza. Impuso topes de espacio por marca o grupo (máximo 30%, con al menos 5 proveedores), cupos para Pymes (25%) y agricultura familiar (5%), reglas sobre la ubicación de los productos más baratos, límites a los plazos de pago y a los abusos de posición dominante sobre los proveedores, y creó un Observatorio de la Cadena de Valor. El DNU 70/2023 la derogó por completo, por considerarla una intervención que distorsionaba el comercio.',
  objective:
    'Transparentar los precios y dar competencia en las góndolas de los grandes supermercados, protegiendo a las Pymes y a los productores de la economía popular frente a las grandes marcas.',
  problemItSolves:
    'La concentración del espacio de góndola en pocas marcas grandes y los abusos de las cadenas sobre sus proveedores chicos.',
  practicalImpact:
    'Mientras estuvo vigente, obligó a los supermercados a repartir el espacio de góndola y a respetar plazos de pago a Pymes. Su aplicación fue discutida y el DNU 70/2023 la derogó, devolviendo a los comercios la libertad de organizar sus góndolas.',
  affectedSubjects: ['Supermercados', 'Proveedores', 'Pymes', 'Agricultura familiar', 'Consumidores'],
  articles: ARTICULOS,
  segments: [],
  annexes: [],
  amendments: [
    {
      id: `${LAW_ID}-amend-dnu70`,
      lawId: LAW_ID,
      modifyingLaw: 'DNU 70/2023',
      modifyingDate: '2023-12-29',
      description: 'El DNU 70/2023 derogó la Ley 27.545 de Góndolas, eliminando las reglas de exhibición, los cupos de espacio y los límites a la relación con proveedores.',
      createdAt: '2026-06-09T00:00:00.000Z',
    },
  ],
  metadata: {
    id: `${LAW_ID}-meta`,
    lawId: LAW_ID,
    mainTopic: 'Competencia y exhibición en supermercados',
    subtopics: ['Topes de espacio en góndola', 'Cupos para Pymes', 'Relación con proveedores', 'Defensa del consumidor'],
    relatedLaws: ['DNU 70/2023', 'Ley de Defensa del Consumidor', 'Ley de Defensa de la Competencia'],
    regulations: [], modifyingNorms: [], derogatingNorms: ['DNU 70/2023'],
    jurisprudence: [], doctrine: [], obligations: [], rights: [], sanctions: [], useCases: [],
    faq: [
      {
        question: '¿La Ley de Góndolas sigue vigente?',
        answer: 'No. Fue derogada por el DNU 70/2023, vigente desde fines de diciembre de 2023. Hoy los supermercados no están obligados a respetar los topes de espacio ni los cupos para Pymes que establecía.',
      },
    ],
    createdAt: '2026-06-09T00:00:00.000Z',
    updatedAt: '2026-06-09T00:00:00.000Z',
  },
  createdAt: '2026-06-09T00:00:00.000Z',
  updatedAt: '2026-06-09T00:00:00.000Z',
};

export default LEY_27545;
