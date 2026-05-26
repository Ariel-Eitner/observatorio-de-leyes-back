import type { Law } from '../../common/types/law.types';

type LawBase = Omit<Law, 'articles' | 'sections'>;

export const LEY_26061_METADATA: LawBase = {
  id: 'ley-26061',
  number: '26061',
  title: 'Protección Integral de los Derechos de las Niñas, Niños y Adolescentes',
  commonName: 'Ley de Protección Integral de NNyA',
  summary:
    'Establece el sistema de protección integral de los derechos de niñas, niños y adolescentes (NNyA) en la Argentina. Reconoce al niño como sujeto de derechos (no objeto de tutela), incorpora el principio del interés superior del niño, crea el sistema de protección con organismos especializados y establece medidas de protección excepcional. Deroga el sistema de patronato del Estado basado en la situación irregular.',
  year: 2005,
  sanctionDate: '2005-09-28',
  promulgationDate: '2005-10-21',
  publicationDate: '2005-10-26',
  effectiveDate: null,
  derogatedDate: null,
  boNumber: '30767',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/110000-114999/110778/norma.htm',
  articleCount: 78,
  topics: [
    'Niñez y adolescencia',
    'Derechos humanos',
    'Protección integral',
    'Interés superior del niño',
    'Sistema de protección',
  ],
  keywords: [
    'niñas niños adolescentes',
    'NNyA',
    'interés superior del niño',
    'protección integral',
    'medidas de protección excepcional',
    'sistema de protección',
    'Secretaría Nacional de Niñez',
    'SENNAF',
    'desjudicialización',
    'Convención sobre los Derechos del Niño',
    'patronato del Estado',
    'sujeto de derechos',
  ],
  relatedNorms: [
    'Convención sobre los Derechos del Niño (CDN — Ley 23.849)',
    'Ley 10.903 (Ley Agote — derogada)',
    'Decreto 415/2006 (reglamentario)',
    'Ley 26.390 (prohibición del trabajo infantil)',
    'Ley 26.892 (convivencia en instituciones educativas)',
  ],
  executiveSummary:
    'La Ley 26.061 reemplazó la Ley Agote (1919) y su sistema de patronato por un modelo de protección integral basado en la Convención sobre los Derechos del Niño (CDN). El cambio conceptual central es que el niño pasa de ser objeto de tutela a ser sujeto pleno de derechos. El sistema de protección tiene dos niveles: (1) medidas de protección ordinarias, que no implican separación familiar y se ejecutan administrativamente; (2) medidas de protección excepcionales, que implican separación temporal de la familia y requieren control judicial. La internación de NNyA está estrictamente restringida.',
  objective:
    'Garantizar el ejercicio y disfrute pleno, efectivo y permanente de los derechos y garantías reconocidos en los instrumentos internacionales de derechos humanos a las niñas, niños y adolescentes en el territorio nacional.',
  problemItSolves:
    'La Ley 10.903 (Agote) permitía al Estado intervenir en la vida de los menores con amplísima discrecionalidad, privando de libertad a niños por "situación de riesgo" (pobreza) sin garantías procesales. La nueva ley prohíbe la privación de libertad por razones vinculadas a la falta de recursos y exige que las medidas más graves (separación familiar) sean excepcionales, temporales y controladas judicialmente.',
  practicalImpact:
    'Las medidas de protección ordinarias (bolsón alimentario, inclusión escolar, apoyo a la familia) se ejecutan sin intervención judicial. La separación de la familia siempre es medida de último recurso, temporal y revisable. Los menores privados de libertad en conflicto con la ley penal tienen garantías procesales específicas. La Secretaría Nacional de Niñez (SENNAF) coordina el sistema a nivel nacional.',
  affectedSubjects: [
    'Niñas, niños y adolescentes (hasta 18 años)',
    'Familias con NNyA en situación de vulnerabilidad',
    'Secretaría Nacional de Niñez, Adolescencia y Familia (SENNAF)',
    'Organismos provinciales de protección de la niñez',
    'Poder Judicial (control de medidas excepcionales)',
    'Instituciones de acogimiento (hogares, familias de acogida)',
    'Sistema educativo y de salud',
  ],
  createdAt: '2005-10-26T00:00:00.000Z',
  updatedAt: '2006-04-17T00:00:00.000Z',
  relations: [],
  amendments: [],
  annexes: [],
  segments: [],
  metadata: {
    id: 'meta-26061',
    lawId: 'ley-26061',
    mainTopic: 'Protección integral de derechos de NNyA y sistema de protección',
    subtopics: [
      'Interés superior del niño',
      'Sistema de protección integral',
      'Medidas de protección ordinarias y excepcionales',
      'Desjudicialización de la pobreza',
      'Responsabilidad penal juvenil',
      'Institucionalización excepcional',
    ],
    relatedLaws: [
      'Ley 23.849 — Convención sobre los Derechos del Niño (1990)',
      'Ley 26.390 — Prohibición del trabajo infantil (2008)',
      'Ley 26.657 — Salud Mental (2010) — arts. sobre menores',
      'Ley 26.743 — Identidad de Género (2012) — menores',
    ],
    regulations: ['Decreto 415/2006 (reglamentario)'],
    modifyingNorms: [],
    derogatingNorms: ['Ley 10.903 (Ley Agote — Patronato del Estado, 1919)'],
    jurisprudence: [
      'CSJN — "Verbitsky" (2005) — condiciones de detención de menores',
      'CSJN — "García Méndez" (2008) — régimen penal juvenil y privación de libertad de menores',
      'CSJN — "M., G. M. c/ PAMI" (2012) — interés superior del niño en materia de salud',
    ],
    doctrine: [
      'García Méndez, E. / Beloff, M. — "Infancia, ley y democracia en América Latina"',
      'Grosman, C. — "El interés superior del niño"',
    ],
    obligations: [
      'El Estado debe garantizar todos los derechos reconocidos en la CDN',
      'Cualquier persona puede denunciar vulneraciones de derechos de NNyA',
      'Las medidas excepcionales deben ser temporales y revisadas periódicamente',
      'La privación de libertad de NNyA solo procede como último recurso',
      'Los organismos deben priorizar el mantenimiento del vínculo familiar',
    ],
    rights: [
      'Derecho a la identidad (nombre, apellido, DNI, filiación)',
      'Derecho a vivir en familia',
      'Derecho a la salud, educación y alimentación',
      'Derecho a ser oído en toda decisión que lo afecte',
      'Derecho a la privacidad y a no ser expuesto mediáticamente',
      'Derecho a no ser separado de sus padres salvo por medida excepcional fundada',
    ],
    sanctions: [
      'Sanciones administrativas y penales para quienes vulneren los derechos de NNyA',
      'Los funcionarios que apliquen medidas contrarias a la ley incurren en responsabilidad',
    ],
    useCases: [
      'Un niño que falta sistemáticamente a la escuela por pobreza → medida de protección ordinaria (bolsón alimentario, acompañamiento familiar); no hay internación ni judicialización',
      'Un adolescente cuya familia ejerce violencia grave → medida de protección excepcional (acogimiento familiar o institucional), con control judicial y revisión periódica',
      'Un medio de comunicación publica la foto de un menor víctima → es violación al art. 22 (privacidad); el organismo puede actuar de oficio',
      'Un juez quiere ordenar la institucionalización de un niño por pobreza → está prohibido; la pobreza no es causa de separación familiar',
    ],
    faq: [
      {
        question: '¿Cuál es la diferencia entre medida ordinaria y excepcional?',
        answer:
          'Las medidas ordinarias (bolsón alimentario, inclusión escolar, orientación familiar) se ejecutan sin separar al niño de su familia y sin control judicial. Las excepcionales implican separación temporal de la familia y siempre requieren control judicial, fundamento, temporalidad y revisión periódica.',
      },
      {
        question: '¿Cuándo puede separarse a un niño de su familia?',
        answer:
          'Solo cuando la permanencia en la familia implique un peligro para su integridad psicofísica, como último recurso y de forma temporal. La ley prohíbe expresamente separar a un niño de su familia por causas vinculadas a la falta de recursos económicos.',
      },
      {
        question: '¿Qué es el interés superior del niño?',
        answer:
          'El principio que ordena priorizar, en toda decisión que afecte a un NNyA, su desarrollo integral, sus derechos y garantías. Se aplica de forma transversal en toda decisión judicial, administrativa o legislativa que involucre a menores.',
      },
    ],
    createdAt: '2005-10-26T00:00:00.000Z',
    updatedAt: '2006-04-17T00:00:00.000Z',
  },
};
