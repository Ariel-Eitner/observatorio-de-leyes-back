import type { Law } from '../../common/types/law.types';

type LawBase = Omit<Law, 'articles' | 'sections'>;

export const LEY_27610_METADATA: LawBase = {
  id: 'ley-27610',
  number: '27610',
  title: 'Acceso a la Interrupción Voluntaria del Embarazo',
  commonName: 'Ley IVE',
  summary:
    'Legaliza la interrupción voluntaria del embarazo (IVE) hasta la semana 14 de gestación sin necesidad de invocar causal alguna, y garantiza el acceso a la interrupción legal del embarazo (ILE) fuera de ese plazo en casos de violación o riesgo para la salud o vida de la persona gestante. Modifica el Código Penal eliminando la penalización del aborto en esas circunstancias.',
  year: 2020,
  sanctionDate: '2020-12-30',
  promulgationDate: '2021-01-14',
  publicationDate: '2021-01-15',
  boNumber: '34562',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/345000-349999/346231/norma.htm',
  articleCount: 22,
  topics: [
    'Salud reproductiva',
    'Derechos de la mujer',
    'Interrupción voluntaria del embarazo',
    'Código Penal',
    'Salud pública',
  ],
  keywords: [
    'IVE',
    'aborto legal',
    'interrupción voluntaria del embarazo',
    'semana 14',
    'salud reproductiva',
    'objeción de conciencia',
    'consentimiento informado',
    'violación',
    'Plan Médico Obligatorio',
    'personas gestantes',
    'Código Penal',
  ],
  relatedNorms: [
    'Ley 26.485 (Protección integral contra la violencia contra las mujeres)',
    'Ley 25.673 (Programa Nacional de Salud Sexual y Procreación Responsable)',
    'Ley 26.150 (Educación Sexual Integral)',
    'Ley 26.529 (Derechos del paciente)',
    'Código Civil y Comercial — art. 26 (capacidad progresiva)',
    'Código Penal — arts. 85, 85 bis, 86, 87, 88 (modificados)',
  ],
  executiveSummary:
    'La Ley IVE permite a las mujeres y personas con capacidad de gestar interrumpir voluntariamente su embarazo hasta la semana 14 inclusive, sin necesidad de invocar ninguna causa. El sistema de salud tiene 10 días para dar respuesta desde el requerimiento. Fuera de esas 14 semanas, el acceso está garantizado en casos de violación (con declaración jurada) o riesgo para la vida o salud integral. La ley regula el derecho a la objeción de conciencia individual (no institucional), el consentimiento informado y la cobertura gratuita de las obras sociales y prepagas. Modifica los artículos 85, 85 bis, 86, 87 y 88 del Código Penal.',
  objective:
    'Garantizar el acceso seguro a la interrupción voluntaria del embarazo como un derecho de salud pública, reduciendo la morbimortalidad vinculada a procedimientos clandestinos e inseguros.',
  problemItSolves:
    'Antes de la ley, el aborto era penal en casi todas las circunstancias. El Código Penal solo permitía el aborto no punible en casos de violación o riesgo de vida, pero la falta de regulación clara generaba que los hospitales negaran el acceso incluso en esos casos. Se estimaban 370.000 a 520.000 abortos clandestinos anuales en Argentina, con alta morbimortalidad en mujeres de sectores vulnerables.',
  practicalImpact:
    'Desde 2021, las interrupciones en el sistema de salud se realizan de forma segura y gratuita. Las obras sociales y prepagas deben cubrir el procedimiento sin costo. El personal de salud puede objetar conciencia individualmente pero no puede negarse a derivar. Los establecimientos de salud del sector privado y de obras sociales que no tengan profesionales disponibles por objeción deben derivar con costos a su cargo.',
  affectedSubjects: [
    'Mujeres y personas con capacidad de gestar',
    'Efectores del sistema público, privado y obras sociales',
    'Profesionales de salud (objeción de conciencia)',
    'Ministerio de Salud (autoridad de aplicación)',
    'Menores de edad y personas con capacidad restringida',
  ],
  createdAt: '2021-01-15T00:00:00.000Z',
  updatedAt: '2021-01-15T00:00:00.000Z',
  amendments: [],
  annexes: [],
  segments: [],
  metadata: {
    id: 'meta-27610',
    lawId: 'ley-27610',
    mainTopic: 'Interrupción voluntaria del embarazo como derecho de salud pública',
    subtopics: [
      'Plazo de 14 semanas sin causal',
      'ILE por violación o riesgo de vida/salud',
      'Objeción de conciencia individual',
      'Cobertura obligatoria obras sociales y prepagas',
      'Modificación del Código Penal',
    ],
    relatedLaws: [
      'Ley 25.673 — Salud Sexual y Procreación Responsable (2002)',
      'Ley 26.150 — Educación Sexual Integral (2006)',
      'Ley 26.485 — Violencia contra la mujer (2009)',
      'Ley 26.743 — Identidad de género (2012)',
      'Ley 27.499 — Ley Micaela (2018)',
    ],
    regulations: [],
    modifyingNorms: ['Observación parcial mediante Decreto 14/2021 (textos en negrita del articulado)'],
    derogatingNorms: [],
    jurisprudence: [
      'CSJN — "Portal de Belén" (2002) — interpretación restrictiva del art. 86 anterior, superada por la nueva ley',
      'CSJN — "F., A.L." (2012) — aclaró que el aborto no punible por violación no requería denuncia previa ni autorización judicial',
    ],
    doctrine: [],
    obligations: [
      'Dar respuesta dentro de 10 días corridos desde el requerimiento (sistema de salud)',
      'Garantizar cobertura total y gratuita (obras sociales, prepagas, sistema público)',
      'Derivar a otro efector si no se puede atender por objeción (efectores privados)',
      'Respetar el consentimiento informado por escrito (personal de salud)',
      'Implementar programas de capacitación en IVE (Ministerio de Salud)',
    ],
    rights: [
      'Derecho a interrumpir el embarazo hasta semana 14 sin invocar causal',
      'Derecho a acceder a ILE fuera del plazo en casos de violación o riesgo',
      'Derecho a cobertura gratuita de la práctica',
      'Derecho a trato digno, privacidad y confidencialidad',
      'Derecho a la información y al consentimiento informado',
    ],
    sanctions: [
      'Prisión de 3 meses a 1 año + inhabilitación especial para funcionarios que obstaculicen el acceso (art. 85 bis CP)',
      'Sanciones disciplinarias, administrativas, penales y civiles por incumplimiento de la ley',
    ],
    useCases: [
      'Una mujer en semana 10 de embarazo solicita IVE → tiene derecho a la práctica sin invocar ninguna causal; el sistema de salud tiene 10 días para realizarla',
      'Una adolescente de 16 años solicita IVE → puede prestar su propio consentimiento sin representante legal (capacidad plena a partir de los 16 según art. 26 CCC)',
      'Un médico objeta conciencia → puede negarse a realizar la práctica pero debe derivar de buena fe y en tiempo oportuno; no puede negarse en emergencias',
      'Una mujer fue violada y tiene 20 semanas de embarazo → puede acceder a la ILE presentando declaración jurada; si tiene menos de 13 años, no se requiere declaración jurada',
    ],
    faq: [
      {
        question: '¿La ley IVE legaliza el aborto sin límites?',
        answer:
          'No. Establece el derecho hasta la semana 14 sin causal. Fuera de ese plazo, solo en casos de violación o riesgo para la vida o salud integral de la persona gestante.',
      },
      {
        question: '¿Un médico puede negarse a realizarlo?',
        answer:
          'Individualmente sí, por objeción de conciencia, pero debe derivar. No pueden objetar las instituciones (solo las personas). Tampoco se puede objetar cuando hay riesgo de vida o en la atención postaborto.',
      },
      {
        question: '¿Lo cubre la obra social?',
        answer:
          'Sí. La ley incluye la IVE en el Plan Médico Obligatorio (PMO). Obras sociales, prepagas y el sistema público deben cubrir la práctica de forma gratuita.',
      },
    ],
    createdAt: '2021-01-15T00:00:00.000Z',
    updatedAt: '2021-01-15T00:00:00.000Z',
  },
};
