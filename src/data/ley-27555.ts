/**
 * Ley 27.555 (2020) — Régimen Legal del Contrato de Teletrabajo. Incorpora el
 * Capítulo VI (art. 102 bis) a la Ley de Contrato de Trabajo. VIGENTE.
 *
 * Fuente oficial: https://www.argentina.gob.ar/normativa/nacional/ley-27555-341093/texto
 * Texto original literal (BO 34450, 14/08/2020).
 */
import type { Law, Article } from '../common/types/law.types';

const LAW_ID = 'ley-27555';

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
  art('1', 'Objeto',
    `Objeto. La presente ley tiene por objeto establecer los presupuestos legales mínimos para la regulación de la modalidad de Teletrabajo en aquellas actividades, que por su naturaleza y particulares características, lo permitan. Los aspectos específicos se establecerán en el marco de las negociaciones colectivas.`,
    `Fija las reglas mínimas del teletrabajo para las actividades que lo permitan. Los detalles de cada sector se acuerdan en los convenios colectivos.`),
  art('2', 'Incorporación a la Ley de Contrato de Trabajo (art. 102 bis)',
    `Incorpórese al Título III "De las modalidades del contrato de trabajo" del Régimen de Contrato de Trabajo aprobado por la ley 20.744 (t.o. 1976) y sus modificatorias, el siguiente texto: Capítulo VI - Del Contrato de Teletrabajo - Artículo 102 bis: Concepto. Habrá contrato de teletrabajo cuando la realización de actos, ejecución de obras o prestación de servicios, en los términos de los artículos 21 y 22 de esta ley, sea efectuada total o parcialmente en el domicilio de la persona que trabaja, o en lugares distintos al establecimiento o los establecimientos del empleador, mediante la utilización de tecnologías de la información y comunicación. Los presupuestos legales mínimos del contrato de teletrabajo se establecerán por ley especial. Las regulaciones específicas para cada actividad se establecerán mediante la negociación colectiva respetando los principios de orden público establecidos en esta ley.`,
    `Incorpora el teletrabajo a la Ley de Contrato de Trabajo como una modalidad más (nuevo artículo 102 bis). Define el teletrabajo: trabajar total o parcialmente desde el domicilio u otro lugar fuera de la empresa, usando tecnología.`),
  art('3', 'Derechos y obligaciones',
    `Derechos y obligaciones. Las personas que trabajen contratadas bajo esta modalidad, en los términos del artículo 102 bis del Régimen de Contrato de Trabajo aprobado por la ley 20.744 (t.o. 1976) y sus modificatorias, gozarán de los mismos derechos y obligaciones que las personas que trabajan bajo la modalidad presencial y su remuneración no podrá ser inferior a la que percibían o percibirían bajo la modalidad presencial. Los convenios colectivos deben, acorde a la realidad de cada actividad, prever una combinación entre prestaciones presenciales y por teletrabajo.`,
    `Quien trabaja desde casa tiene los mismos derechos y obligaciones que quien va a la oficina, y no puede cobrar menos por hacerlo de forma remota.`),
  art('4', 'Jornada laboral',
    `Jornada laboral. La jornada laboral debe ser pactada previamente por escrito en el contrato de trabajo de conformidad con los límites legales y convencionales vigentes, tanto en lo que respecta a lo convenido por hora como por objetivos. Las plataformas y/o software utilizados por el empleador a los fines específicos del teletrabajo, y registrados según lo establecido en el artículo 18 de la presente, deberán desarrollarse de modo acorde a la jornada laboral establecida, impidiendo la conexión fuera de la misma.`,
    `La jornada del teletrabajo se pacta por escrito y respeta los límites legales. Los sistemas del empleador deben impedir la conexión fuera del horario acordado.`),
  art('5', 'Derecho a la desconexión digital',
    `Derecho a la desconexión digital. La persona que trabaja bajo la modalidad de teletrabajo tendrá derecho a no ser contactada y a desconectarse de los dispositivos digitales y/o tecnologías de la información y comunicación, fuera de su jornada laboral y durante los períodos de licencias. No podrá ser sancionada por hacer uso de este derecho. El empleador no podrá exigir a la persona que trabaja la realización de tareas, ni remitirle comunicaciones, por ningún medio, fuera de la jornada laboral.`,
    `Consagra el "derecho a la desconexión": fuera del horario y en las licencias, el trabajador no puede ser contactado ni obligado a responder, y no puede ser sancionado por desconectarse.`),
  art('6', 'Tareas de cuidados',
    `Tareas de cuidados. Las personas que trabajen bajo esta modalidad y que acrediten tener a su cargo, de manera única o compartida, el cuidado de personas menores de trece (13) años, personas con discapacidad o adultas mayores que convivan con la persona trabajadora y que requieran asistencia específica, tendrán derecho a horarios compatibles con las tareas de cuidado a su cargo y/o a interrumpir la jornada. Cualquier acto, conducta, decisión, represalia u obstaculización proveniente del empleador que lesione estos derechos se presumirá discriminatorio resultando aplicables las previsiones de la ley 23.592. Mediante la negociación colectiva podrán establecerse pautas específicas para el ejercicio de este derecho.`,
    `Quien teletrabaja y cuida a chicos menores de 13 años, personas con discapacidad o adultos mayores convivientes tiene derecho a horarios compatibles o a interrumpir la jornada. Negarle este derecho se presume discriminatorio.`),
  art('7', 'Voluntariedad',
    `Voluntariedad. El traslado de quien trabaja en una posición presencial a la modalidad de teletrabajo, salvo casos de fuerza mayor debidamente acreditada, debe ser voluntario y prestado por escrito.`,
    `Pasar de trabajar presencial a teletrabajo debe ser voluntario y por escrito (salvo fuerza mayor). El empleador no puede imponerlo.`),
  art('8', 'Reversibilidad',
    `Reversibilidad. El consentimiento prestado por la persona que trabaja en una posición presencial para pasar a la modalidad de teletrabajo, podrá ser revocado por la misma en cualquier momento de la relación. En tal caso, el empleador le deberá otorgar tareas en el establecimiento en el cual las hubiera prestado anteriormente, o en su defecto, en el más cercano al domicilio del dependiente, en el cual puedan ser prestadas. Salvo que por motivos fundados resulte imposible la satisfacción de tal deber. El incumplimiento de esta obligación será considerado violatorio del deber previsto en el artículo 78 del Régimen de Contrato de Trabajo aprobado por la ley 20.744 (t.o. 1976) y sus modificatorias. La negativa del empleador dará derecho a la persona que trabaja bajo esta modalidad a considerarse en situación de despido o accionar para el restablecimiento de las condiciones oportunamente modificadas. En los contratos que se pacte la modalidad de teletrabajo al inicio de la relación, el eventual cambio a la modalidad presencial operará conforme las pautas que se establezcan en la negociación colectiva.`,
    `Quien aceptó pasar a teletrabajo puede arrepentirse y volver a presencial en cualquier momento; el empleador debe darle tareas en su establecimiento anterior o el más cercano. Si se niega, el trabajador puede considerarse despedido. (Para quienes ya entran como teletrabajadores, el pase a presencial lo define el convenio.)`),
  art('9', 'Elementos de trabajo',
    `Elementos de trabajo. El empleador debe proporcionar el equipamiento -hardware y software-, las herramientas de trabajo y el soporte necesario para el desempeño de las tareas, y asumir los costos de instalación, mantenimiento y reparación de las mismas, o la compensación por la utilización de herramientas propias de la persona que trabaja. La compensación operará conforme las pautas que se establezcan en la negociación colectiva. La persona que trabaja será responsable por el correcto uso y mantenimiento de los elementos y herramientas de trabajo provistas por su empleador, deberá procurar que estos no sean utilizados por personas ajenas a la relación o contrato de trabajo. En ningún caso responderá por el desgaste normal producto del uso o el paso del tiempo. En caso de desperfectos, roturas o desgaste en los elementos, instrumentos y/o medios tecnológicos que impidan la prestación de tareas, el empleador deberá proveer su reemplazo o reparación a fin de posibilitar la prestación de tareas. El tiempo que demande el cumplimiento de esta obligación patronal no afectará el derecho de la persona que trabaja a continuar percibiendo la remuneración habitual.`,
    `El empleador debe dar la computadora, el software y el soporte, y pagar instalación, mantenimiento y reparaciones (o compensar si el trabajador usa sus propias herramientas). Si algo se rompe, lo repara el empleador y el trabajador sigue cobrando mientras tanto.`),
  art('10', 'Compensación de gastos',
    `Compensación de Gastos. La persona que trabaja bajo la modalidad del teletrabajo tendrá derecho a la compensación por los mayores gastos en conectividad y/o consumo de servicios que deba afrontar. Dicha compensación operará conforme las pautas que se establezcan en la negociación colectiva, y quedará exenta del pago del impuesto a las ganancias establecido en la ley 20.628 (t. o. 2019) y sus modificatorias.`,
    `El teletrabajador tiene derecho a que le compensen los mayores gastos de internet y servicios. Esa compensación no paga impuesto a las ganancias.`),
  art('11', 'Capacitación',
    `Capacitación. El empleador deberá garantizar la correcta capacitación de sus dependientes en nuevas tecnologías, brindando cursos y herramientas de apoyo, tanto en forma virtual como presencial, que permitan una mejor adecuación de las partes a esta modalidad laboral. La misma no implicará una mayor carga de trabajo. Podrá realizarla en forma conjunta con la entidad sindical representativa y el Ministerio de Trabajo, Empleo y Seguridad Social de la Nación.`,
    `El empleador debe capacitar al teletrabajador en las tecnologías necesarias, sin que eso signifique más carga de trabajo.`),
  art('12', 'Derechos colectivos',
    `Derechos colectivos. Las personas que se desempeñen bajo la modalidad de teletrabajo, gozarán de todos los derechos colectivos. Serán consideradas, a los fines de la representación sindical, como parte del conjunto de quiénes trabajen en forma presencial.`,
    `Los teletrabajadores tienen todos los derechos colectivos (sindicalización, etc.) y cuentan como parte del plantel presencial a efectos sindicales.`),
  art('13', 'Representación sindical',
    `Representación sindical. La representación sindical será ejercida por la asociación sindical de la actividad donde presta servicios, en los términos de la ley 23.551. Las personas que trabajan bajo esta modalidad deberán ser anexadas por el empleador a un centro de trabajo, unidad productiva o área específica de la empresa a los efectos de elegir y ser elegidas, para integrar los órganos de la asociación sindical.`,
    `El teletrabajador es representado por el sindicato de su actividad (Ley 23.551) y debe asignarse a un centro de trabajo para poder votar y ser elegido en el sindicato.`),
  art('14', 'Higiene y seguridad laboral',
    `Higiene y seguridad laboral. La autoridad de aplicación dictará las normas relativas a higiene y seguridad en el trabajo con el objetivo de brindar una protección adecuada a quienes trabajen bajo la modalidad laboral del teletrabajo. El control del cumplimiento de esta normativa deberá contar con participación sindical. Asimismo la autoridad de aplicación determinará la inclusión de las enfermedades causadas por esta modalidad laboral dentro del listado previsto en el artículo 6°, inciso 2, de la ley 24.557. Los accidentes acaecidos en el lugar, jornada y en ocasión del teletrabajo, se presumen accidentes en los términos del artículo 6°, inciso 1, de la ley 24.557.`,
    `Manda dictar normas de higiene y seguridad para el teletrabajo, incluir sus enfermedades en el listado de riesgos del trabajo, y presume como accidente laboral lo que ocurra en el lugar y horario del teletrabajo (Ley 24.557 de Riesgos del Trabajo).`),
  art('15', 'Sistema de control y derecho a la intimidad',
    `Sistema de Control y Derecho a la Intimidad. Los sistemas de control destinados a la protección de los bienes e informaciones de propiedad del empleador deberán contar con participación sindical a fin de salvaguardar la intimidad de la persona que trabaja bajo la modalidad de teletrabajo y la privacidad de su domicilio.`,
    `Los sistemas de control del empleador deben tener participación sindical para proteger la intimidad del teletrabajador y la privacidad de su casa.`),
  art('16', 'Protección de la información laboral',
    `Protección de la Información Laboral. El empleador deberá tomar las medidas que correspondan, especialmente en lo que se refiere a software, para garantizar la protección de los datos utilizados y procesados por la persona que trabaja bajo la modalidad de teletrabajo para fines profesionales, no pudiendo hacer uso de software de vigilancia que viole la intimidad de la misma.`,
    `El empleador debe proteger los datos laborales del teletrabajo y tiene prohibido usar software de vigilancia que viole la intimidad del trabajador.`),
  art('17', 'Prestaciones transnacionales',
    `Prestaciones transnacionales. Cuando se trate de prestaciones transnacionales de teletrabajo, se aplicará al contrato de trabajo respectivo la ley del lugar de ejecución de las tareas o la ley del domicilio del empleador, según sea más favorable para la persona que trabaja. En caso de contratación de personas extranjeras no residentes en el país, se requerirá la autorización previa de la autoridad de aplicación. Los convenios colectivos, acorde a la realidad de cada actividad, deberán establecer un tope máximo para estas contrataciones.`,
    `Para el teletrabajo entre países, se aplica la ley del lugar donde se trabaja o la del domicilio del empleador, la que sea más favorable al trabajador. Contratar extranjeros no residentes requiere autorización previa.`),
  art('18', 'Autoridad de aplicación, registro y fiscalización',
    `Autoridad de aplicación. Registro. Fiscalización. El Ministerio de Trabajo, Empleo y Seguridad Social de la Nación será la autoridad de aplicación de la presente ley y deberá dictar la reglamentación respectiva dentro de los noventa (90) días. En el ámbito de su competencia se deberán registrar las empresas que desarrollen esta modalidad, acreditando el software o plataforma a utilizar y la nómina de las personas que desarrollan estas tareas, las que deberán informarse ante cada alta producida o de manera mensual. Esta información deberá ser remitida a la organización sindical pertinente. La fiscalización del cumplimiento de las disposiciones legales y convencionales relativas a las tareas cumplidas bajo la modalidad del teletrabajo se ejercerá conforme a lo establecido por el título III - capítulo I, sobre inspección del trabajo de la ley 25.877 y sus modificatorias. Toda inspección de la autoridad de aplicación, de ser necesaria, deberá contar con autorización previa de la persona que trabaja.`,
    `El Ministerio de Trabajo aplica la ley. Las empresas deben registrar el software y la nómina de teletrabajadores e informar al sindicato. Para inspeccionar el domicilio del trabajador se necesita su autorización previa.`),
  art('19', 'Régimen de transitoriedad (vigencia)',
    `Régimen de transitoriedad. La presente ley entrará en vigor luego de noventa (90) días contados a partir de que se determine la finalización del período de vigencia del aislamiento social, preventivo y obligatorio.`,
    `Estableció que la ley entraría en vigencia 90 días después del fin del aislamiento por la pandemia; una resolución posterior fijó esa fecha en el 1 de abril de 2021.`),
  art('20', 'Comunicación',
    `Comuníquese al Poder Ejecutivo nacional.`,
    `Fórmula final de comunicación de la ley al Poder Ejecutivo.`),
];

export const LEY_27555: Law = {
  id: LAW_ID,
  number: '27555',
  title: 'Ley de Teletrabajo',
  commonName: 'Ley de Teletrabajo',
  shortCode: 'Ley 27.555',
  aliases: ['27.555', 'Ley de Teletrabajo', 'Teletrabajo'],
  isDestacada: true,
  summary:
    'Ley de Teletrabajo (2020): incorporó el contrato de teletrabajo a la Ley de Contrato de Trabajo (artículo 102 bis) y fijó sus reglas mínimas — igualdad de derechos con el trabajo presencial, derecho a la desconexión digital, voluntariedad y reversibilidad, provisión de equipos por el empleador, compensación de gastos y tareas de cuidado. Está vigente desde abril de 2021.',
  category: 'laboral',
  categories: ['laboral'],
  year: 2020,
  sanctionDate: '2020-07-30',
  promulgationDate: '2020-08-14',
  publicationDate: '2020-08-14',
  effectiveDate: '2021-04-01',
  derogatedDate: null,
  boNumber: '34450',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/ley-27555-341093/texto',
  articleCount: 20,
  topics: ['Teletrabajo', 'Trabajo remoto', 'Contrato de trabajo', 'Desconexión digital', 'Derecho laboral'],
  keywords: [
    'ley de teletrabajo', '27.555', 'teletrabajo', 'trabajo remoto', 'home office',
    'desconexión digital', 'jornada', 'contrato de trabajo', 'voluntariedad', 'reversibilidad',
  ],
  relatedNorms: ['ley-20744', 'ley-23592'],
  relations: [
    {
      type: 'MODIFICA',
      targetLawId: 'ley-20744',
      targetLawLabel: 'Ley de Contrato de Trabajo',
      description: 'Incorporó el Capítulo VI "Del Contrato de Teletrabajo" (artículo 102 bis) al Título III de la Ley de Contrato de Trabajo.',
    },
    {
      type: 'RELACIONADA',
      targetLawId: 'ley-23592',
      targetLawLabel: 'Ley Antidiscriminatoria',
      description: 'Las represalias contra quien ejerce el derecho a tareas de cuidado se presumen discriminatorias en los términos de la Ley 23.592.',
    },
  ],
  executiveSummary:
    'Sancionada en 2020 y vigente desde abril de 2021, la Ley de Teletrabajo incorporó esta modalidad a la Ley de Contrato de Trabajo (art. 102 bis) y estableció un piso de derechos: igualdad con el trabajo presencial y misma remuneración, derecho a la desconexión digital, voluntariedad y reversibilidad del pase a remoto, provisión de equipos y soporte por el empleador, compensación de los gastos de conectividad, protección de las tareas de cuidado y de la intimidad del domicilio. Los detalles de cada actividad se definen por negociación colectiva.',
  objective:
    'Dar un marco legal de derechos mínimos al trabajo remoto, equiparándolo al presencial y protegiendo al trabajador (desconexión, voluntariedad, gastos, cuidado, intimidad).',
  problemItSolves:
    'La falta de regulación del trabajo remoto, que dejaba sin reglas claras la jornada, los gastos, los equipos y la protección de quien trabaja desde su casa.',
  practicalImpact:
    'Toda relación de teletrabajo registrada se rige por estas reglas: el empleador provee equipos y cubre la conectividad, el trabajador puede desconectarse fuera de hora y volver a presencial, y conserva los mismos derechos que en la oficina.',
  affectedSubjects: ['Trabajadores remotos', 'Empleadores', 'Sindicatos', 'Personas con tareas de cuidado'],
  articles: ARTICULOS,
  segments: [],
  annexes: [],
  amendments: [],
  metadata: {
    id: `${LAW_ID}-meta`,
    lawId: LAW_ID,
    mainTopic: 'Régimen del contrato de teletrabajo',
    subtopics: ['Desconexión digital', 'Jornada', 'Voluntariedad y reversibilidad', 'Elementos de trabajo', 'Tareas de cuidado'],
    relatedLaws: ['Ley de Contrato de Trabajo', 'Ley Antidiscriminatoria'],
    regulations: [], modifyingNorms: [], derogatingNorms: [],
    jurisprudence: [], doctrine: [], obligations: [], rights: [], sanctions: [], useCases: [],
    faq: [
      {
        question: '¿Qué es el derecho a la desconexión digital?',
        answer: 'Es el derecho del teletrabajador a no ser contactado ni a responder mensajes o tareas fuera de su jornada laboral y durante sus licencias, sin poder ser sancionado por ello (art. 5 de la Ley 27.555).',
      },
      {
        question: '¿El empleador debe pagar los gastos de internet y los equipos?',
        answer: 'Sí. El empleador debe proveer el equipamiento y el soporte, asumir su instalación y mantenimiento, y compensar los mayores gastos de conectividad y servicios, según lo que fije la negociación colectiva.',
      },
    ],
    createdAt: '2026-06-09T00:00:00.000Z',
    updatedAt: '2026-06-09T00:00:00.000Z',
  },
  createdAt: '2026-06-09T00:00:00.000Z',
  updatedAt: '2026-06-09T00:00:00.000Z',
};

export default LEY_27555;
