import type { Law } from '../../common/types/law.types';

type LawBase = Omit<Law, 'articles' | 'sections'>;

export const LEY_23592_METADATA: LawBase = {
  id: 'ley-23592',
  number: '23592',
  title: 'Actos Discriminatorios',
  commonName: 'Ley Antidiscriminatoria',
  summary:
    'Penaliza los actos discriminatorios y obliga a quienes los cometan a dejar sin efecto el acto o cesar la conducta y a reparar el daño material y moral causado. Agrava las penas de delitos cometidos por motivos discriminatorios y prohíbe las organizaciones que promuevan la discriminación.',
  year: 1988,
  sanctionDate: '1988-08-03',
  promulgationDate: '1988-08-20',
  publicationDate: '1988-08-23',
  boNumber: '26439',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/20000-24999/20465/texact.htm',
  articleCount: 4,
  topics: [
    'Discriminación',
    'Derechos humanos',
    'Igualdad',
    'Delitos de odio',
    'Reparación civil',
  ],
  keywords: [
    'discriminación',
    'ley antidiscriminatoria',
    'actos discriminatorios',
    'raza',
    'religión',
    'nacionalidad',
    'ideología',
    'orientación sexual',
    'delitos de odio',
    'propaganda discriminatoria',
    'organizaciones discriminatorias',
  ],
  relatedNorms: [
    'Constitución Nacional (art. 16 — igualdad ante la ley)',
    'Ley 26.743 (Identidad de género)',
    'Ley 27.499 (Ley Micaela)',
    'CADH art. 1 (no discriminación)',
    'Convención Internacional sobre la Eliminación de todas las Formas de Discriminación Racial',
  ],
  executiveSummary:
    'La Ley 23.592 prohíbe cualquier acto u omisión que impida, obstruya, restrinja o de algún modo menoscabe el pleno ejercicio de derechos y garantías fundamentales con motivo de raza, religión, nacionalidad, ideología, opinión política o gremial, sexo, posición económica, condición social o caracteres físicos. Quien lo cometa debe hacer cesar el acto y reparar el daño. Además, agrava hasta el doble la pena de delitos comunes cuando son cometidos por motivos discriminatorios.',
  objective:
    'Proteger la igualdad de trato y el libre ejercicio de derechos fundamentales, disuadir conductas discriminatorias mediante obligación de reparación y agravamiento de penas, y prohibir las organizaciones que promueven el odio.',
  problemItSolves:
    'Hasta 1988 no existía una norma específica que sancionara civilmente los actos discriminatorios ni que agravara las penas penales por motivos de odio. La ley crea una herramienta civil y penal específica frente a estas conductas.',
  practicalImpact:
    'Es la norma base del litigio antidiscriminatorio en Argentina. Se usa en despidos discriminatorios (nulidad + doble indemnización por integración con LCT), en publicaciones de odio, en casos de discriminación por identidad de género, por discapacidad, por condición de salud (HIV) y en violencia institucional. El INADI fue creado por Ley 24.515 como organismo de aplicación.',
  affectedSubjects: [
    'Toda persona física o jurídica que cometa actos discriminatorios',
    'Empleadores (despido discriminatorio)',
    'Medios de comunicación (publicaciones de odio)',
    'Organizaciones que promuevan la discriminación',
    'Víctimas de discriminación (titulares de la acción civil)',
  ],
  createdAt: '1988-08-23T00:00:00.000Z',
  updatedAt: '1988-08-23T00:00:00.000Z',
  amendments: [],
  annexes: [],
  segments: [],
  metadata: {
    id: 'meta-23592',
    lawId: 'ley-23592',
    mainTopic: 'Prohibición y sanción de actos discriminatorios',
    subtopics: [
      'Discriminación por raza, religión, género, orientación sexual',
      'Delitos de odio — agravante penal',
      'Propaganda y organizaciones discriminatorias',
      'Reparación civil del daño discriminatorio',
    ],
    relatedLaws: [
      'Ley 26.743 — Identidad de género (2012)',
      'Ley 26.485 — Violencia contra la mujer (2009)',
      'Ley 24.515 — Creación del INADI (1995)',
      'Ley 25.280 — Convención Interamericana contra la Discriminación de Personas con Discapacidad',
    ],
    regulations: [],
    modifyingNorms: [],
    derogatingNorms: [],
    jurisprudence: [
      'CSJN "Álvarez c/ Cencosud" (2010) — despido discriminatorio nulo, Ley 23.592 aplicable a relación laboral privada',
      'CSJN "Pellicori c/ Colegio Público de Abogados" (2011) — inversión de la carga probatoria en discriminación',
    ],
    doctrine: [],
    obligations: [
      'Hacer cesar el acto discriminatorio',
      'Reparar el daño material y moral causado',
      'Restablecer al afectado en el pleno ejercicio del derecho restringido',
    ],
    rights: [
      'Derecho a no ser discriminado por raza, religión, nacionalidad, ideología, sexo, orientación sexual, posición económica, condición social o caracteres físicos',
      'Derecho a la reparación material y moral ante acto discriminatorio',
      'Derecho a la nulidad del acto discriminatorio',
    ],
    sanctions: [
      'Obligación de hacer cesar el acto y reparar el daño (acción civil)',
      'Agravante de hasta el doble de la pena para delitos comunes con motivo discriminatorio',
      'Reclusión de un mes a tres años para quienes integren o sostengan organizaciones discriminatorias',
    ],
    useCases: [
      'Empleado despedido por su orientación sexual → acción de nulidad del despido y/o doble indemnización bajo Ley 23.592 + LCT',
      'Medio que publica contenido de odio racial → acción civil de cese y reparación',
      'Establecimiento que niega el acceso a persona por su condición de HIV positivo → acción por discriminación con reparación de daño moral',
    ],
    faq: [
      {
        question: '¿Qué causales de discriminación cubre la ley?',
        answer:
          'Raza, religión, nacionalidad, ideología, opinión política o gremial, sexo, posición económica, condición social y caracteres físicos. La jurisprudencia amplió el listado por vía interpretativa a orientación sexual, identidad de género, discapacidad y condición de salud (como el HIV).',
      },
      {
        question: '¿Cómo funciona la carga de la prueba?',
        answer:
          'La CSJN en "Pellicori" (2011) estableció que basta con que el afectado aporte indicios razonables de discriminación para que la carga de probar que no hubo motivo discriminatorio se traslade al demandado. No es inversión total, sino carga probatoria dinámica.',
      },
      {
        question: '¿Se aplica en relaciones laborales privadas?',
        answer:
          'Sí. La CSJN lo confirmó en "Álvarez c/ Cencosud" (2010): el empleador privado está obligado por la ley. El despido discriminatorio puede declararse nulo con reincorporación del trabajador, además de la reparación del daño moral.',
      },
    ],
    createdAt: '1988-08-23T00:00:00.000Z',
    updatedAt: '1988-08-23T00:00:00.000Z',
  },
};
