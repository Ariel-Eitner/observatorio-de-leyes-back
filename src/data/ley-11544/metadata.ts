import type { Law } from '../../common/types/law.types';

type LawBase = Omit<Law, 'articles' | 'sections'>;

export const LEY_11544_METADATA: LawBase = {
  id: 'ley-11544',
  number: '11544',
  title: 'Jornada de Trabajo',
  commonName: 'Ley de Jornada de Trabajo',
  summary:
    'Establece la jornada máxima de trabajo de 8 horas diarias o 48 horas semanales, regula la jornada nocturna (7 horas), el trabajo en condiciones insalubres (6 horas) y el régimen de horas extraordinarias. El artículo 6 fue derogado por la Ley 27.802.',
  year: 1929,
  sanctionDate: '1929-09-11',
  promulgationDate: '1929-09-17',
  publicationDate: '1929-09-27',
  boNumber: null,
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/115000-119999/116245/texact.htm',
  articleCount: 13,
  topics: [
    'Derecho laboral',
    'Jornada de trabajo',
    'Horas extraordinarias',
    'Trabajo nocturno',
    'Trabajo insalubre',
  ],
  keywords: [
    'jornada de trabajo',
    'horas extras',
    'trabajo nocturno',
    'insalubridad',
    '8 horas',
    '48 horas semanales',
    'horas extraordinarias',
    'trabajo a turnos',
    'jornada máxima legal',
  ],
  relatedNorms: [
    'Ley 20.744 (Ley de Contrato de Trabajo — arts. 196 a 207)',
    'Ley 27.802 (derogó el art. 6)',
    'Decreto 16.115/1933 (reglamentario)',
    'Convenio OIT N° 1 (horas de trabajo, 1919)',
  ],
  executiveSummary:
    'La Ley 11.544 es la norma fundacional del derecho a la limitación de la jornada laboral en Argentina. Fija 8 horas diarias y 48 semanales como techo legal, reducidas a 7 horas para el trabajo nocturno y a 6 para el trabajo insalubre. Regula el pago recargado de horas extras (50% en días hábiles, 100% en días inhábiles y feriados). La LCT de 1974 absorbió muchos de sus principios pero la ley sigue vigente como norma de fondo.',
  objective:
    'Proteger la salud y el tiempo libre del trabajador fijando un límite legal a la jornada, con recargo económico que desincentiva el abuso de horas extraordinarias.',
  problemItSolves:
    'A principios del siglo XX los trabajadores cumplían jornadas de 12 a 16 horas sin límite legal. La presión sindical internacional y el Convenio OIT N° 1 (1919) impulsaron la adopción del límite de 8 horas.',
  practicalImpact:
    'Define el piso mínimo indisponible de protección de la jornada. Los convenios colectivos y la LCT operan sobre este piso. El incumplimiento genera obligación de pago de horas extras y puede constituir causa de despido indirecto.',
  affectedSubjects: [
    'Trabajadores en relación de dependencia del sector privado',
    'Empleadores del sector privado',
    'Autoridad de aplicación laboral (Ministerio de Trabajo)',
  ],
  createdAt: '1929-09-27T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  amendments: [
    {
      id: 'amend-11544-27802',
      lawId: 'ley-11544',
      modifyingLaw: 'Ley 27.802 (Modernización Laboral)',
      modifyingDate: '2024-01-01',
      description: 'Derogó el artículo 6 de la Ley 11.544.',
      type: 'PARTIAL_REPEAL' as const,
      createdAt: '2024-01-01T00:00:00.000Z',
    },
  ],
  annexes: [],
  segments: [],
  metadata: {
    id: 'meta-11544',
    lawId: 'ley-11544',
    mainTopic: 'Jornada máxima de trabajo y horas extraordinarias',
    subtopics: [
      'Jornada diurna (8h/día — 48h/semana)',
      'Jornada nocturna (7h/día)',
      'Trabajo insalubre (6h/día)',
      'Horas extras — recargo 50%/100%',
      'Excepciones y trabajos continuos',
    ],
    relatedLaws: [
      'Ley 20.744 — Contrato de Trabajo (arts. 196-207)',
      'Ley 27.802 — Modernización Laboral (derogó art. 6)',
    ],
    regulations: ['Decreto 16.115/1933 (reglamentario)'],
    modifyingNorms: ['Ley 27.802 (derogó art. 6)'],
    derogatingNorms: [],
    jurisprudence: [],
    doctrine: [],
    obligations: [
      'Respetar el límite de 8 horas diarias y 48 semanales (empleadores)',
      'Pagar las horas extras con recargo del 50% en días hábiles y 100% en feriados o días de descanso',
      'Reducir la jornada a 7 horas en trabajo nocturno y a 6 en trabajo insalubre',
    ],
    rights: [
      'Derecho a la jornada máxima legal de 8 horas diarias',
      'Derecho al cobro de horas extras con recargo',
      'Derecho a jornada reducida en trabajo nocturno e insalubre',
    ],
    sanctions: [
      'Multas laborales por incumplimiento (Ministerio de Trabajo)',
      'Obligación de pago retroactivo de horas extras no abonadas',
    ],
    useCases: [
      'Trabajador que cumple 10 horas diarias → tiene derecho a cobrar las 2 horas extras con 50% de recargo en día hábil',
      'Empleador que asigna jornada nocturna de 8 horas → viola la ley; debe reducirla a 7 o compensar la hora adicional como extraordinaria',
      'Trabajo en condiciones insalubres → jornada máxima de 6 horas; la hora séptima en adelante debe pagarse como extraordinaria con 100% de recargo',
    ],
    faq: [
      {
        question: '¿Qué diferencia hay entre jornada diurna y nocturna?',
        answer:
          'La jornada diurna es de hasta 8 horas (entre las 6 y las 21 hs). La jornada nocturna (entre las 21 y las 6 hs) tiene un máximo de 7 horas. Si se trabaja en horario mixto, cada hora nocturna equivale a 1 hora y 8 minutos de la jornada diurna a efectos del cálculo.',
      },
      {
        question: '¿Las 48 horas semanales son acumulables?',
        answer:
          'Sí. La jornada se puede distribuir de forma desigual entre los días de la semana, siempre que el total semanal no supere las 48 horas y que ningún día exceda las 9 horas. Los convenios colectivos pueden establecer distribuciones diferentes.',
      },
      {
        question: '¿Qué pasó con el artículo 6?',
        answer:
          'El artículo 6 regulaba el trabajo de mujeres y menores. Fue derogado por la Ley 27.802 (Modernización Laboral). Las normas sobre trabajo de menores quedaron en la LCT y en legislación específica.',
      },
    ],
    createdAt: '1929-09-27T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
};
