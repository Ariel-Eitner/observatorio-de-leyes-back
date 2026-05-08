import type { Law } from '../../common/types/law.types';

type LawBase = Omit<Law, 'articles' | 'sections'>;

export const LEY_20744_METADATA: LawBase = {
  id: 'ley-20744',
  number: '20744',
  title: 'Ley de Contrato de Trabajo',
  summary:
    'Régimen general del contrato y la relación de trabajo en el sector privado. Establece los derechos y obligaciones de trabajadores y empleadores: remuneración, jornada, vacaciones, licencias, enfermedades, maternidad, modalidades de contratación y causas de extinción con sus indemnizaciones.',
  year: 1974,
  sanctionDate: '1974-09-05',
  promulgationDate: '1974-09-20',
  publicationDate: '1974-09-27',
  boNumber: '23003',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/ley-20744-25552/texto',
  articleCount: 266,
  topics: [
    'Derecho laboral',
    'Contrato de trabajo',
    'Remuneración y salarios',
    'Jornada laboral',
    'Vacaciones y licencias',
    'Despido e indemnizaciones',
    'Maternidad y familia',
    'Trabajo en plataformas',
    'Período de prueba',
  ],
  keywords: [
    'contrato de trabajo',
    'relación de dependencia',
    'trabajador',
    'empleador',
    'remuneración',
    'salario',
    'jornada',
    'vacaciones',
    'despido',
    'indemnización',
    'preaviso',
    'período de prueba',
    'maternidad',
    'enfermedad inculpable',
    'plataformas digitales',
    'in dubio pro operario',
  ],
  relatedNorms: [
    'Ley 11544 (jornada de trabajo)',
    'Ley 24013 (empleo)',
    'Ley 25877 (ordenamiento laboral)',
    'Ley 27802 (modernización laboral)',
    'Decreto 390/1976 (texto ordenado)',
  ],
  executiveSummary:
    'La Ley de Contrato de Trabajo es la norma madre del derecho laboral argentino. Define qué es un contrato de trabajo, quiénes son trabajador y empleador, cuáles son sus derechos y obligaciones, cómo se calculan las indemnizaciones y cuándo puede extinguirse la relación laboral. Rige para todos los trabajadores privados del país, salvo estatutos especiales.',
  objective:
    'Regular de manera integral el contrato y la relación de trabajo en el sector privado, garantizando un piso mínimo de derechos irrenunciables para los trabajadores y estableciendo las obligaciones recíprocas de las partes.',
  problemItSolves:
    'Antes de esta ley, las condiciones de trabajo estaban dispersas en decenas de leyes sectoriales y decretos sin coherencia sistemática. Los trabajadores carecían de un régimen uniforme de derechos. La Ley de Contrato de Trabajo unificó ese piso normativo y estableció principios como el in dubio pro operario, la irrenunciabilidad y la continuidad del contrato.',
  practicalImpact:
    'Rige para la mayoría de los trabajadores privados en relación de dependencia. Define el salario mínimo, el SAC, las vacaciones pagas, la indemnización por despido (art. 245), el período de prueba, la protección por embarazo y enfermedad, y los requisitos del preaviso. Es el código base sobre el que se construyen todos los convenios colectivos.',
  affectedSubjects: [
    'Trabajadores en relación de dependencia del sector privado',
    'Empleadores privados (personas físicas y jurídicas)',
    'Trabajadores de plataformas digitales (art. 198 bis)',
    'Trabajadoras embarazadas o en período de lactancia',
    'Trabajadores con enfermedades inculpables',
    'Sindicatos y comisiones internas',
    'Jueces y operadores del derecho laboral',
  ],
  createdAt: '1974-09-27T00:00:00.000Z',
  updatedAt: '2026-03-06T00:00:00.000Z',
  amendments: [
    {
      id: 'amd-20744-1',
      lawId: 'ley-20744',
      modifyingLaw: 'Ley 21297',
      modifyingDate: '1976-04-23',
      description:
        'Primera gran reforma: eliminó o modificó más de 100 artículos y reordenó la numeración actual del texto. Redujo beneficios en materia de preaviso e indemnizaciones que fueron restituidos posteriormente.',
      createdAt: '1976-04-23T00:00:00.000Z',
    },
    {
      id: 'amd-20744-2',
      lawId: 'ley-20744',
      modifyingLaw: 'Ley 24465',
      modifyingDate: '1995-03-28',
      description:
        'Incorporó el artículo 92 ter (trabajo a tiempo parcial) y otras modalidades promovidas de contratación.',
      createdAt: '1995-03-28T00:00:00.000Z',
    },
    {
      id: 'amd-20744-3',
      lawId: 'ley-20744',
      modifyingLaw: 'Ley 25877',
      modifyingDate: '2004-03-19',
      description:
        'Derogó modalidades promovidas, redactó el actual artículo 92 bis (período de prueba de 3 meses) y restableció varias protecciones eliminadas en 1995.',
      createdAt: '2004-03-19T00:00:00.000Z',
    },
    {
      id: 'amd-20744-4',
      lawId: 'ley-20744',
      modifyingLaw: 'Ley 26574',
      modifyingDate: '2009-01-02',
      description:
        'Modificó el artículo 91 para incorporar la identidad de género como causa prohibida de discriminación.',
      createdAt: '2009-01-02T00:00:00.000Z',
    },
    {
      id: 'amd-20744-5',
      lawId: 'ley-20744',
      modifyingLaw: 'Ley 27802',
      modifyingDate: '2026-03-06',
      description:
        'Reforma integral: extendió el período de prueba a 6 meses, modificó el cálculo de indemnizaciones, incorporó el art. 198 bis para trabajadores de plataformas digitales y actualizó el régimen de jornada.',
      createdAt: '2026-03-06T00:00:00.000Z',
    },
  ],
  annexes: [
    {
      id: 'anx-20744-1',
      lawId: 'ley-20744',
      number: 'I',
      title: 'Texto Ordenado — Decreto 390/1976',
      content:
        'El Decreto 390/1976 aprobó el texto ordenado de la Ley de Contrato de Trabajo luego de las modificaciones de la Ley 21297/1976. Es la versión de referencia histórica. La numeración actual de los artículos deriva de ese texto ordenado.',
      order: 1,
    },
    {
      id: 'anx-20744-2',
      lawId: 'ley-20744',
      number: 'II',
      title: 'Principios fundamentales del derecho laboral',
      content:
        'Esta ley consagra cinco principios fundamentales: (1) In dubio pro operario: la duda se resuelve a favor del trabajador (art. 9); (2) Norma más favorable: prevalece la norma más beneficiosa para el trabajador (art. 7); (3) Irrenunciabilidad: el trabajador no puede renunciar a derechos mínimos (art. 12); (4) Continuidad del contrato: en caso de duda se presume que el contrato subsiste (art. 10); (5) Primacía de la realidad: lo que ocurre de hecho prevalece sobre los documentos formales (art. 23).',
      order: 2,
    },
  ],
  segments: [],
  metadata: {
    id: 'meta-20744',
    lawId: 'ley-20744',
    mainTopic: 'Contrato y relación de trabajo',
    subtopics: [
    'Derecho laboral',
    'Contrato de trabajo',
    'Remuneración y salarios',
    'Jornada laboral',
    'Vacaciones y licencias',
    'Despido e indemnizaciones',
    'Maternidad y familia',
    'Trabajo en plataformas',
    'Período de prueba',
  ],
    relatedLaws: [
      'Ley 11544 — Jornada de trabajo (8 horas)',
      'Ley 24013 — Empleo y registro laboral',
      'Ley 24557 — Riesgos del trabajo (ART)',
      'Ley 25191 — Libreta del trabajador rural',
      'Ley 27802 — Modernización laboral (reforma 2026)',
      'Ley 26727 — Régimen del trabajo agrario',
      'Ley 26844 — Régimen del personal de casas particulares',
    ],
    regulations: [
      'Decreto 390/1976 (texto ordenado)',
      'Resolución MTEySS sobre libros laborales',
      'Convenios colectivos de cada actividad (CCT)',
    ],
    modifyingNorms: [
      'Ley 21297 (1976)',
      'Ley 24465 (1995)',
      'Ley 25013 (1998)',
      'Ley 25877 (2004)',
      'Ley 26390 (2008)',
      'Ley 26574 (2009)',
      'Ley 27802 (2026)',
    ],
    derogatingNorms: [],
    jurisprudence: [
      'CSJN — Vizzoti c/ AMSA (2004) — tope indemnizatorio inconstitucional si supera el 33% del salario real',
      'CSJN — Aquino c/ Cargo Servicios (2004) — inconstitucionalidad del art. 39 LRT frente al derecho común',
      'CSJN — Madorrán c/ Adm. Nacional de Aduanas (2007) — estabilidad del empleado público vs. Ley de Contrato de Trabajo',
      'CNAT — Sala II — Cairone c/ Sociedad Italiana de Beneficencia (2013) — plataformas y dependencia',
    ],
    doctrine: [
      'Justo López, Norberto Centeno, Juan A. Fernández Madrid — "Ley de Contrato de Trabajo Comentada"',
      'Antonio Vázquez Vialard — "Tratado de Derecho del Trabajo"',
      'Rodolfo Capón Filas — "Derecho del Trabajo"',
    ],
    obligations: [
      'Registrar al trabajador ante AFIP desde el primer día (Ley 24013)',
      'Pagar el salario en tiempo y forma (art. 74)',
      'Otorgar vacaciones en período legal (arts. 154-157)',
      'Abonar el sueldo anual complementario (arts. 121-123)',
      'Respetar la jornada máxima legal (art. 196, Ley 11544)',
      'Otorgar certificado de trabajo al finalizar la relación (art. 80)',
      'Pagar indemnización por despido sin causa (art. 245)',
      'Conservar el empleo durante la enfermedad inculpable (art. 208)',
      'Respetar la licencia por maternidad (art. 177)',
    ],
    rights: [
      'Salario mínimo vital y móvil (art. 116, Ley 24013)',
      'Sueldo anual complementario — SAC (art. 121)',
      'Vacaciones pagas mínimas de 14 a 35 días según antigüedad (art. 150)',
      'Indemnización por despido sin causa equivalente a 1 mes de sueldo por año (art. 245)',
      'Preaviso de 15 días a 2 meses según antigüedad (art. 231)',
      'Licencia por maternidad de 90 días (art. 177)',
      'Licencia por enfermedad inculpable de 3 a 12 meses con sueldo (art. 208)',
      'Período de prueba de 6 meses sin indemnización (art. 92 bis)',
      'Certificado de trabajo al finalizar la relación (art. 80)',
      'Protección contra el despido discriminatorio (art. 17, Ley 23592)',
    ],
    sanctions: [
      'Multa del 25% sobre indemnización por falta de registración (Ley 24013 art. 8)',
      'Duplicación de indemnización por despido durante huelga (art. 245 + Ley 25013)',
      'Indemnización agravada por despido por embarazo: 1 año de remuneraciones (art. 182)',
      'Intimación a regularizar situación registral antes de despido (Ley 24013 art. 11)',
      'Sanciones penales por incumplimiento de normas laborales (Código Penal)',
    ],
    useCases: [
      'Me despidieron sin causa y sin preaviso → tenés derecho a indemnización por antigüedad (art. 245) más integración del mes y preaviso (arts. 232/233)',
      'Estoy embarazada y me notificaron el despido → se presume que fue por el embarazo, indemnización especial de 1 año (art. 182)',
      'Llevo 6 meses enfermo y la empresa no me paga → la empresa debe pagarte durante los plazos del art. 208 según antigüedad',
      'Trabajo para una app de delivery → el art. 198 bis (incorporado por Ley 27802) reconoce derechos específicos: ART, obra social, desconexión digital',
      'La empresa dice que soy monotributista pero en realidad trabajo bajo sus órdenes → el art. 23 presume la existencia del contrato de trabajo por la sola prestación de servicios',
    ],
    faq: [
      {
        question: '¿Qué es el in dubio pro operario?',
        answer:
          'Es el principio del art. 9: cuando hay duda sobre cómo aplicar una norma o cómo apreciar la prueba, siempre se resuelve a favor del trabajador. Es uno de los pilares del derecho laboral.',
      },
      {
        question: '¿Cuánto es la indemnización por despido sin causa?',
        answer:
          'Según el art. 245: 1 mes de la mejor remuneración mensual, normal y habitual del último año, por cada año trabajado o fracción mayor a 3 meses. Tiene un tope equivalente a 3 veces el promedio de salarios del convenio colectivo aplicable.',
      },
      {
        question: '¿Qué pasa si me despiden durante el período de prueba?',
        answer:
          'Según el art. 92 bis (texto según Ley 27802), el período de prueba es de 6 meses. En ese lapso cualquiera de las partes puede extinguir el contrato sin indemnización, pero debe preavisar con 15 días de anticipación.',
      },
      {
        question: '¿Puedo renunciar a mis derechos laborales?',
        answer:
          'No. El art. 12 establece que es nula toda convención que suprima o reduzca los derechos previstos en la ley o en los convenios colectivos. Ni siquiera si el trabajador firma el documento voluntariamente.',
      },
      {
        question: '¿La Ley de Contrato de Trabajo aplica a empleados públicos?',
        answer:
          'No directamente. El art. 2 excluye a los dependientes de la Administración pública nacional, provincial o municipal, salvo que por acto expreso se los incluya en su régimen.',
      },
    ],
    createdAt: '1974-09-27T00:00:00.000Z',
    updatedAt: '2026-03-06T00:00:00.000Z',
  },
};