import type { Law } from '../../common/types/law.types';

type LawBase = Omit<Law, 'articles' | 'sections'>;

export const LEY_27499_METADATA: LawBase = {
  id: 'ley-27499',
  number: '27499',
  title: 'Capacitación Obligatoria en Género para todas las Personas que integran los tres Poderes del Estado',
  commonName: 'Ley Micaela',
  summary:
    'Establece la capacitación obligatoria en género y violencia contra las mujeres para todas las personas que se desempeñen en la función pública en los tres poderes del Estado nacional. La ley lleva el nombre de Micaela García, joven víctima de femicidio en 2017.',
  year: 2019,
  sanctionDate: '2018-12-19',
  promulgationDate: '2019-01-10',
  publicationDate: '2019-01-11',
  effectiveDate: null,
  derogatedDate: null,
  boNumber: '34031',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/315000-319999/317963/norma.htm',
  articleCount: 11,
  topics: [
    'Género',
    'Violencia contra las mujeres',
    'Capacitación obligatoria',
    'Función pública',
    'Femicidio',
  ],
  keywords: [
    'ley micaela',
    'capacitación género',
    'violencia contra la mujer',
    'función pública',
    'Instituto Nacional de las Mujeres',
    'femicidio',
    'Micaela García',
    'perspectiva de género',
    'tres poderes del Estado',
  ],
  relatedNorms: [
    'Ley 26.485 (Protección integral contra la violencia contra las mujeres)',
    'Ley 26.743 (Identidad de género)',
    'Convención de Belém do Pará',
    'CEDAW',
  ],
  executiveSummary:
    'La Ley Micaela obliga a todas las personas que trabajan en el Estado nacional —en cualquier cargo, jerarquía y poder— a capacitarse en género y violencia contra las mujeres. El Instituto Nacional de las Mujeres (INAM) es la autoridad de aplicación y certifica la calidad de las capacitaciones. Las máximas autoridades de cada poder reciben su capacitación directamente del INAM. La negativa injustificada a capacitarse se considera falta grave. La ley lleva el nombre de Micaela García (Gualeguay, Entre Ríos), quien fue violada y asesinada en 2017 por Sebastián Wagner, quien estaba en libertad condicional pese a sus antecedentes por violación.',
  objective:
    'Transversalizar la perspectiva de género en todos los organismos del Estado nacional, garantizando que quienes toman decisiones que afectan a la ciudadanía comprendan las dinámicas de la violencia de género y actúen con esa perspectiva.',
  problemItSolves:
    'La falta de formación en género de funcionarios públicos genera respuestas inadecuadas frente a situaciones de violencia: revictimización, demoras en medidas cautelares, prejudicios en diagnósticos clínicos, etc. El caso Micaela García —cuyo asesino había sido liberado pese a antecedentes de violación— expuso las fallas del sistema judicial y penitenciario en materia de género.',
  practicalImpact:
    'Desde su sanción, miles de organismos públicos han implementado capacitaciones. La ley fue reglamentada en 2020 (Decreto 473/2019). Varias provincias adhirieron y dictaron sus propias leyes Micaela. El incumplimiento es monitoreado por el INAM, que publica en su web el grado de avance de cada organismo. Las altas autoridades que no se capacitan quedan expuestas públicamente en el portal.',
  affectedSubjects: [
    'Todo el personal de los poderes Ejecutivo, Legislativo y Judicial de la Nación',
    'Autoridades máximas de organismos públicos nacionales',
    'Instituto Nacional de las Mujeres (autoridad de aplicación)',
    'Organizaciones sindicales del sector público',
    'Provincias invitadas a adherir',
  ],
  createdAt: '2019-01-11T00:00:00.000Z',
  updatedAt: '2019-01-11T00:00:00.000Z',
  relations: [],
  amendments: [],
  annexes: [],
  segments: [],
  metadata: {
    id: 'meta-27499',
    lawId: 'ley-27499',
    mainTopic: 'Capacitación obligatoria en género en la función pública',
    subtopics: [
      'Perspectiva de género en el Estado',
      'Violencia contra las mujeres',
      'Formación de funcionarios públicos',
      'Femicidio — caso Micaela García',
    ],
    relatedLaws: [
      'Ley 26.485 — Protección integral contra la violencia contra las mujeres (2009)',
      'Ley 26.743 — Identidad de género (2012)',
      'Ley 27.610 — IVE (2020)',
    ],
    regulations: ['Decreto 473/2019 (reglamentario)'],
    modifyingNorms: [],
    derogatingNorms: [],
    jurisprudence: [],
    doctrine: [],
    obligations: [
      'Capacitarse en género y violencia contra las mujeres (todo el personal del Estado)',
      'Garantizar la implementación de las capacitaciones (autoridades de cada organismo)',
      'Certificar la calidad de las capacitaciones (INAM)',
      'Publicar el grado de cumplimiento en su web (INAM)',
      'Capacitar a las máximas autoridades directamente (INAM)',
    ],
    rights: [
      'Derecho a la capacitación gratuita en género (funcionarios públicos)',
      'Derecho de la ciudadanía a ser atendida por un Estado con perspectiva de género',
    ],
    sanctions: [
      'Falta grave por negativa injustificada a capacitarse',
      'Sanción disciplinaria pertinente',
      'Publicación de la negativa en la web del INAM',
    ],
    useCases: [
      'Un juez que nunca se capacitó en género dicta medidas inapropiadas en casos de violencia → el INAM publica su incumplimiento y el organismo debe intimarlo',
      'Una provincia adhiere a la ley y obliga a todos sus empleados públicos a capacitarse en género',
      'Un ministerio diseña su propio programa de capacitación → debe enviarlo al INAM en 6 meses para su certificación',
    ],
    faq: [
      {
        question: '¿Por qué se llama Ley Micaela?',
        answer:
          'Por Micaela García, una militante de 21 años de Gualeguay (Entre Ríos) que fue violada y asesinada en abril de 2017 por Sebastián Wagner, quien estaba en libertad condicional pese a tener condenas previas por violación. La causa expuso que el sistema judicial no consideró el riesgo de reincidencia con perspectiva de género.',
      },
      {
        question: '¿Alcanza a todos los empleados del Estado?',
        answer:
          'Sí, a todas las personas que se desempeñen en la función pública en todos los niveles y jerarquías de los poderes Ejecutivo, Legislativo y Judicial de la Nación. No discrimina por cargo, antigüedad ni modalidad contractual.',
      },
      {
        question: '¿Qué pasa si alguien se niega a capacitarse?',
        answer:
          'Es intimado fehacientemente por la autoridad de aplicación. Si persiste en el incumplimiento, incurre en falta grave y recibe sanción disciplinaria. Además, su negativa puede ser publicada en la web del INAM.',
      },
    ],
    createdAt: '2019-01-11T00:00:00.000Z',
    updatedAt: '2019-01-11T00:00:00.000Z',
  },
};
