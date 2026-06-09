/**
 * Ley 19.032 (1971) — Instituto Nacional de Servicios Sociales para Jubilados y
 * Pensionados (INSSJP / PAMI). El aporte "Ley 19.032" del recibo y los haberes.
 *
 * Fuente oficial: https://www.argentina.gob.ar/normativa/nacional/ley-19032-16081/texto
 * Texto original literal (BO 22184, 28/05/1971). VIGENTE con modificaciones.
 */
import type { Law, Article } from '../common/types/law.types';

const LAW_ID = 'ley-19032';

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
  art('1',
    'Creación del Instituto',
    `Créase el Instituto Nacional de Servicios Sociales para Jubilados y Pensionados, que funcionará de acuerdo con el régimen de la presente ley.`,
    `Crea el Instituto Nacional de Servicios Sociales para Jubilados y Pensionados (INSSJP), el organismo que hoy conocemos como PAMI.`),
  art('2',
    'Objeto: servicios médicos a jubilados y pensionados',
    `El Instituto tendrá por objeto principal la prestación, por sí o por intermedio de terceros, a los jubilados y pensionados del régimen nacional de previsión y a su grupo familiar primario, de servicios médicos asistenciales destinados al fomento, protección y recuperación de la salud.`,
    `El fin principal del PAMI es dar servicios médicos a los jubilados y pensionados nacionales y a su familia directa, ya sea con prestadores propios o contratados.`),
  art('3',
    'Otros servicios de promoción y asistencia social',
    `El Instituto podrá prestar otros servicios destinados a la promoción y asistencia social de los afiliados, tales como subsidios, préstamos con o sin garantía real, vivienda en comodato mediante programas y asistencia financiera de la Secretaría de Estado de Vivienda, asesoramiento y gestoría previsional gratuitos, promoción cultural, proveeduría, recreación, turismo y todo otro servicio que el Directorio establezca.`,
    `Además de la salud, el PAMI puede brindar otros servicios sociales: subsidios, préstamos, turismo, recreación, asesoramiento previsional gratuito y demás prestaciones que decida su Directorio.`),
  art('4',
    'Extensión del régimen a otras personas',
    `A propuesta del Directorio, el Poder Ejecutivo podrá hacer extensivo el régimen de la presente ley, en las condiciones que fije, a las personas de sesenta o más años de edad o imposibilitadas para trabajar, o que gocen de pensiones graciables, a la vejez o de leyes especiales.`,
    `Permite al Poder Ejecutivo ampliar la cobertura del PAMI a otras personas: mayores de 60 años, personas imposibilitadas de trabajar o con pensiones graciables o especiales.`),
  art('5',
    'Directorio: integración y representación',
    `La administración del Instituto estará a cargo de un directorio integrado por un presidente, tres directores en representación de los jubilados del régimen nacional de previsión, dos en representación de los cotizantes activos y cinco en representación del Estado nombrados por el Poder Ejecutivo. Para ser presidente o director en representación de los jubilados, es requisito ser jubilado del régimen nacional de previsión. Los directores en representación de los jubilados y de los cotizantes activos designarán a propuesta, respectivamente, de las asociaciones de jubilados suficientemente representativas de los beneficiarios del régimen nacional de previsión y de las asociaciones profesionales con personería gremial suficientemente representativas de los trabajadores; los representantes del estado, dos a propuesta de la Secretaría de Estado de Seguridad Social y uno a propuesta, respectivamente, de las de Promoción y Asistencia de la Comunidad y Salud Pública y del Instituto Nacional de Obras Sociales. El presidente y los directores durarán cuatro (4) años en sus funciones, pudiendo ser reelegidos y gozarán de la remuneración que establezca el Presupuesto.`,
    `Define cómo se gobierna el PAMI: un directorio con un presidente, tres directores por los jubilados, dos por los trabajadores activos y cinco por el Estado. Los representantes de jubilados deben ser jubilados, y los cargos duran 4 años (reelegibles). En la práctica, su organización y conducción fueron modificadas por normas posteriores.`),
  art('6',
    'Facultades y obligaciones del Directorio',
    `El Directorio tendrá las siguientes facultades y obligaciones: a) Administrar los fondos y bienes del Instituto; b) Fijar la orientación, planeamiento y coordinación de los servicios que se presten; c) Determinar la distribución de los recursos, en función de los planes, programas y proyectos que se elaboren; d) Ejercer el control administrativo y técnico de todas las prestaciones; e) Establecer las prestaciones reglamentando sus modalidades y beneficiarios y fijando en su caso, los aranceles correspondientes; f) Fijar el régimen disciplinario con respecto a los afiliados, determinando la procedencia de la aplicación de sanciones, de acuerdo con la siguiente escala, referida a la gravedad de la falta cometida: llamado de atención, apercibimiento, suspensión de beneficios. La suspensión de beneficios no eximirá del pago de los aportes correspondientes, ni podrá exceder del plazo de seis (6) meses; g) Crear comisiones técnicas asesoras, y designar sus integrantes; h) Elaborar el escalafón del personal, confeccionar y aprobar el presupuesto anual de gastos y cálculo de sus recursos y la cuenta de inversiones: redactar una memoria anual y aprobar el balance y cuadro de resultados que deberán ser elevados al Poder Ejecutivo; i) Comprar, gravar y vender bienes, gestionar y contratar préstamos, celebrar toda clase de contratos y convenios de reciprocidad o de prestación de servicios con entidades nacionales, provinciales, municipales o privadas; j) Aceptar subsidios, legados y donaciones; k) Nombrar, remover y ascender al personal; l) Dictar las reglamentaciones y resoluciones que fueren necesarias para el mejor ejercicio de sus funciones; m) Elegir de entre los directores en representación de los jubilados, en la primera sesión constitutiva, un vicepresidente que reemplazará al presidente en caso de ausencia o impedimento transitorios o de vacancia del cargo, hasta tanto éste sea cubierto; n) Resolver los recursos que el personal del Instituto, afiliados o terceros interpongan contra las decisiones del presidente.`,
    `Enumera lo que puede y debe hacer el Directorio del PAMI: administrar fondos y bienes, organizar los servicios, fijar prestaciones y aranceles, aplicar sanciones a los afiliados (hasta 6 meses de suspensión de beneficios, sin eximir del pago de aportes), aprobar el presupuesto, contratar, nombrar personal y resolver reclamos.`),
  art('7',
    'Representación del Instituto',
    `El presidente representará en todos sus actos al Instituto, con las facultades y atribuciones que le asigne la reglamentación.`,
    `El presidente del PAMI es quien representa legalmente al Instituto en todos sus actos, con las facultades que fije la reglamentación.`),
  art('8',
    'Recursos del Instituto (aportes)',
    `El Instituto contará con los siguientes recursos: a) El aporte del dos por ciento (2%) de los haberes de pasividad que perciban jubilados y pensionados del régimen nacional de previsión social, tengan o no grupo familiar. b) El aporte del tres por ciento (3%) del haber anual complementario que se abone a los beneficiarios indicados en el artículo anterior; c) El aporte de la diferencia del primer haber jubilatorio o de pensión mensual que se abone a los beneficiarios indicados en el inciso a), resultante de todo incremento de carácter general para todos o determinados sectores de jubilados y pensionados, en calidad de aumento o movilidad de las prestaciones, elevación de los haberes mínimos u otros conceptos de análogas características. Los aportes fijados en este inciso y los anteriores son obligatorios y estarán a cargo de los jubilados y pensionados. d) El aporte obligatorio de las personas en actividad comprendidas en el régimen nacional de previsión, mediante el aumento del uno por ciento (1%) de los aportes personales a cargo de los trabajadores en relación de dependencia y autónomos. Los aumentos indicados precedentemente regirán a partir del 1º de abril de 1972, aplicándose sobre los porcentajes de aportes jubilatorios vigentes al 31 de marzo del mismo año: e) Una contribución del ocho por ciento (8%) del producido neto de la Lotería de Beneficencia Nacional y Casinos durante el ejercicio 1971. Anualmente a partir del ejercicio de 1972, esa contribución será del diez por ciento (10%) del producido neto de toda nueva fuente de recursos que se instituya desde la fecha de vigencia de la presente ley: f) El aporte que el Poder Ejecutivo Nacional fije para los afiliados a que se refiere el artículo 4 de la presente ley. g) El producido de los aranceles que cobre por los servicios que preste. h) Las donaciones, legados y subsidios que reciba. i) Los intereses y las rentas de los bienes que integran ese patrimonio, y el producido de la venta de esos bienes: j) Todo otro ingreso compatible con su naturaleza y fines. Los recursos no invertidos en un ejercicio se transferirán al siguiente.`,
    `Es el artículo del financiamiento del PAMI: define los aportes que lo sostienen. Los pagan los jubilados y pensionados sobre sus haberes y los trabajadores en actividad sobre sus aportes previsionales — este es el descuento que figura como "Ley 19.032" en haberes y recibos. El texto original fijaba un 2% sobre los haberes de pasividad y un 1% adicional para los activos; esas alícuotas fueron luego modificadas por normas posteriores (hoy el aporte de los pasivos es del 3% al 6% según el haber, y el de los activos del 3%).`),
  art('9',
    'Deducción y depósito de los aportes',
    `Los aportes a cargo de los jubilados y pensionados, indicados en los incisos a), b) y c) del artículo anterior, serán deducidos por las Cajas Nacionales de Previsión de los haberes e incrementos que se abonen a partir de la vigencia de la presente ley, debiendo ser depositados a la orden del Instituto en la forma y plazo que determine la reglamentación. Los aportes a cargo del personal en actividad, fijados en el inciso d) del artículo precedente e ingresados a la Dirección Nacional de Previsión Social, como también los recargos que correspondan por mora en el depósito de esos aportes de conformidad con el artículo 3º de la Ley 18820 serán transferidos al Instituto por la citada Dirección Nacional en la forma y plazo que establezca la reglamentación.`,
    `Establece cómo se cobran los aportes: a los jubilados y pensionados se los descuentan directamente de sus haberes las cajas previsionales, y a los trabajadores activos se los retiene junto con sus aportes previsionales. Esos fondos se depositan a la orden del Instituto.`),
  art('10',
    'Tope de gastos administrativos',
    `El presupuesto de gastos administrativos y de funcionamiento del Instituto no podrá exceder del cinco por ciento (5 %) del total de sus recursos. Dicho porcentaje podrá ser aumentado por el Poder Ejecutivo a propuesta fundada del Directorio.`,
    `Limita el gasto administrativo y de funcionamiento del PAMI a un 5% de sus recursos, para que la mayor parte se destine a las prestaciones. El Poder Ejecutivo puede elevar ese tope con fundamento.`),
  art('11',
    'Cuentas y depósitos bancarios',
    `Las cuentas corrientes que fueran necesarias para el desenvolvimiento del Instituto serán abiertas únicamente en el Banco de la Nación Argentina. Los fondos excedentes, no destinados a otras inversiones, serán depositados en el Banco Hipotecario Nacional exclusivamente, el que abonará el interés que corresponda a los depósitos en caja de ahorros del mencionado banco.`,
    `Obliga a manejar las cuentas del PAMI únicamente en el Banco de la Nación Argentina y a depositar los fondos excedentes en el Banco Hipotecario Nacional.`),
  art('12',
    'Convenios con provincias y municipios',
    `El Directorio del Instituto podrá convenir con los gobiernos provinciales y las municipalidades, la incorporación al régimen de la presente ley de los jubilados y pensionados de las Cajas o Institutos locales. En tales supuestos los jubilados y pensionados incorporados, así como el personal en actividad comprendido en el régimen previsional de que se trate, deberán efectuar los aportes indicados en el artículo 8º, que serán retenidos e ingresados en la forma dispuesta en el artículo 9º.`,
    `Permite que el PAMI acuerde con provincias y municipios incorporar a sus jubilados y pensionados (de cajas locales) al régimen, en cuyo caso esos beneficiarios y los activos correspondientes también aportan según los artículos 8 y 9.`),
  art('13',
    'Exenciones impositivas',
    `Los inmuebles de propiedad del Instituto, o aquellos cuyo usufructo ejerza, así como también las operaciones o actos que realice, estarán exentos del pago de todo impuesto, tasa, contribución y/o cualquier otra obligación fiscal de carácter nacional o con la Municipalidad de la Ciudad de Buenos Aires. El Instituto gestionará de las provincias y municipios, la sanción de leyes y ordenanzas que autoricen idénticas exenciones.`,
    `Exime al PAMI del pago de impuestos, tasas y contribuciones nacionales (y de la Ciudad de Buenos Aires) sobre sus inmuebles y operaciones, y lo habilita a gestionar exenciones equivalentes en provincias y municipios.`),
  art('14',
    'Jurisdicción',
    `El Instituto estará sometido exclusivamente a la jurisdicción nacional, pudiendo optar por la justicia ordinaria de las provincias cuando fuere actor. El representante legal del Instituto absolverá posiciones por oficio.`,
    `El PAMI se rige por la justicia nacional, aunque puede elegir la justicia provincial cuando es él quien demanda. Su representante legal declara en juicio por escrito (por oficio), no en persona.`),
  art('15',
    'Régimen aplicable y controles',
    `El Instituto queda comprendido en las disposiciones de la Ley 18610 estando excluido del control del Tribunal de Cuentas de la Nación y del régimen de la ley de contabilidad.`,
    `Encuadra al PAMI dentro del régimen de obras sociales de la época (Ley 18.610) y lo exceptúa del control del Tribunal de Cuentas y de la ley de contabilidad pública.`),
  art('16',
    'Jubilados de obras sociales: aporte único al Instituto',
    `A partir de la vigencia de esta ley, los jubilados y pensionados obligatoriamente comprendidos en cualquiera de las obras sociales mencionadas en el artículo 1º de la ley 18.610, modificado por ley 18.980, aportarán únicamente al Instituto creado por la presente, manteniendo sin embargo su afiliación a aquéllas, con todos los derechos y obligaciones que los respectivos estatutos orgánicos y reglamentaciones determinen. En tal supuesto, se aplicarán los montos o porcentajes de aportes que rijan en esas obras sociales, si fueran mayores que los establecidos en el artículo 8º. En los casos precedentemente aludidos, el Instituto deberá convenir con las respectivas obras sociales los reintegros que correspondan por los servicios que presten a los jubilados y pensionados. Sin perjuicio de lo dispuesto en los párrafos anteriores, los jubilados y pensionados podrán optar por incorporarse directamente al presente régimen, en cuyo caso cesarán las obligaciones recíprocas de aquéllos y de las obras sociales a las que se encontraban afiliados.`,
    `Los jubilados y pensionados que estaban en otras obras sociales pasan a aportar únicamente al PAMI, aunque conservan su afiliación anterior. Si el aporte de esa obra social era mayor, se aplica el mayor. También pueden optar por incorporarse directamente al PAMI y dejar la obra social previa.`),
  art('17',
    'Derogaciones',
    `Deróganse el inciso c) del artículo 5º y el último párrafo del artículo 6º de la ley 18.610, modificados por ley 18.980.`,
    `Deroga dos disposiciones puntuales de la Ley 18.610 (de obras sociales) que quedaban en contradicción con el nuevo régimen del PAMI.`),
  art('18',
    'Vigencia',
    `La presente ley rige a partir de la fecha de su promulgación.`,
    `La ley entró en vigencia el día de su promulgación (13 de mayo de 1971).`),
  art('19',
    'Comunicación',
    `Comuníquese, publíquese, dése a la Dirección Nacional del Registro Oficial y archívese.`,
    `Fórmula final de comunicación y publicación de la ley.`),
];

export const LEY_19032: Law = {
  id: LAW_ID,
  number: '19032',
  title: 'Ley del PAMI (Instituto Nacional de Servicios Sociales para Jubilados y Pensionados)',
  commonName: 'Ley del PAMI',
  shortCode: 'Ley 19.032',
  aliases: ['19.032', 'INSSJP', 'PAMI', 'Ley del PAMI'],
  isDestacada: true,
  summary:
    'Ley 19.032 (1971): creó el Instituto Nacional de Servicios Sociales para Jubilados y Pensionados (INSSJP), conocido como PAMI. Organizó los servicios de salud para jubilados y pensionados y los aportes que los financian — el descuento "Ley 19.032" que aparece en los haberes y en el recibo de sueldo. Sigue vigente, con numerosas modificaciones.',
  category: 'laboral',
  categories: ['laboral', 'salud'],
  year: 1971,
  sanctionDate: '1971-05-13',
  promulgationDate: '1971-05-13',
  publicationDate: '1971-05-28',
  effectiveDate: '1971-05-13',
  derogatedDate: null,
  boNumber: '22184',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Poder Ejecutivo Nacional',
  fullText: null,
  sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/ley-19032-16081/texto',
  articleCount: 19,
  topics: ['PAMI', 'INSSJP', 'Jubilados y pensionados', 'Seguridad social', 'Obra social', 'Salud'],
  keywords: [
    'ley 19032', '19.032', 'PAMI', 'INSSJP', 'jubilados', 'pensionados',
    'obra social', 'aporte', 'recibo de sueldo', 'haber previsional', 'seguridad social',
  ],
  relatedNorms: ['ley-20744', 'constitucion-nacional'],
  relations: [
    {
      type: 'RELACIONADA',
      targetLawId: 'ley-20744',
      targetLawLabel: 'Ley de Contrato de Trabajo',
      description:
        'El aporte al INSSJP (PAMI) se retiene sobre las remuneraciones y haberes; aparece como el descuento "Ley 19.032" en el recibo de sueldo regido por la Ley de Contrato de Trabajo.',
    },
    {
      type: 'RELACIONADA',
      targetLawId: 'constitucion-nacional',
      targetLawLabel: 'Constitución Nacional',
      description:
        'Implementa el mandato de seguridad social del artículo 14 bis de la Constitución Nacional (jubilaciones, pensiones y obra social).',
    },
  ],
  executiveSummary:
    'Sancionada en 1971, creó el INSSJP (PAMI) como organismo nacional encargado de la salud y la asistencia social de los jubilados y pensionados. Estableció su gobierno (un directorio con representación de jubilados, activos y el Estado) y, sobre todo, su financiamiento: aportes obligatorios de jubilados y pensionados sobre sus haberes y un aporte de los trabajadores en actividad. Ese aporte es el que figura como "Ley 19.032" en los haberes y recibos. La ley sigue vigente y fue modificada numerosas veces (composición del directorio, alícuotas y alcance).',
  objective:
    'Garantizar a los jubilados y pensionados el acceso a servicios de salud y asistencia social a través de un instituto nacional financiado con aportes propios.',
  problemItSolves:
    'La falta de una cobertura de salud específica y unificada para los jubilados y pensionados, que antes dependían de distintas obras sociales.',
  practicalImpact:
    'Creó el PAMI, la obra social más grande del país. El aporte que la financia se descuenta de los haberes de los jubilados y de las remuneraciones de los trabajadores activos, y aparece identificado como "Ley 19.032" en haberes y recibos.',
  affectedSubjects: ['Jubilados', 'Pensionados', 'Trabajadores en actividad', 'PAMI / INSSJP', 'Empleadores'],
  articles: ARTICULOS,
  segments: [],
  annexes: [],
  amendments: [],
  metadata: {
    id: `${LAW_ID}-meta`,
    lawId: LAW_ID,
    mainTopic: 'Seguridad social — salud de jubilados y pensionados (PAMI)',
    subtopics: ['INSSJP / PAMI', 'Aportes y financiamiento', 'Servicios médicos a jubilados', 'Directorio'],
    relatedLaws: ['Ley de Contrato de Trabajo', 'Constitución Nacional'],
    regulations: [],
    modifyingNorms: [],
    derogatingNorms: [],
    jurisprudence: [],
    doctrine: [],
    obligations: [],
    rights: [],
    sanctions: [],
    useCases: [],
    faq: [
      {
        question: '¿Qué es el descuento "Ley 19.032" del recibo de sueldo?',
        answer:
          'Es el aporte al INSSJP (PAMI) creado por la Ley 19.032. Financia la obra social de los jubilados y pensionados. Lo aportan tanto los jubilados sobre sus haberes como los trabajadores en actividad sobre sus remuneraciones.',
      },
      {
        question: '¿La Ley 19.032 sigue vigente?',
        answer:
          'Sí. Está vigente desde 1971 y fue modificada muchas veces (composición del directorio, alícuotas de aporte y alcance). El texto que se muestra es el original; varias de sus reglas fueron actualizadas por normas posteriores.',
      },
    ],
    createdAt: '2026-06-09T00:00:00.000Z',
    updatedAt: '2026-06-09T00:00:00.000Z',
  },
  createdAt: '2026-06-09T00:00:00.000Z',
  updatedAt: '2026-06-09T00:00:00.000Z',
};

export default LEY_19032;
