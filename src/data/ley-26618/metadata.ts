import type { Law } from '../../common/types/law.types';

type LawBase = Omit<Law, 'articles' | 'sections'>;

export const LEY_26618_METADATA: LawBase = {
  id: 'ley-26618',
  number: '26618',
  title: 'Matrimonio Civil — Matrimonio entre personas del mismo sexo',
  commonName: 'Matrimonio Igualitario',
  summary:
    'Modifica el Código Civil para equiparar el matrimonio entre personas del mismo sexo al matrimonio heterosexual en todos sus requisitos, efectos y obligaciones. Argentina fue el primer país de América Latina en legalizarlo. La ley modifica más de 40 artículos del Código Civil y leyes complementarias para adaptar el lenguaje y garantizar la plena igualdad.',
  year: 2010,
  sanctionDate: '2010-07-15',
  promulgationDate: '2010-07-21',
  publicationDate: '2010-07-22',
  effectiveDate: null,
  derogatedDate: null,
  boNumber: '31949',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/165000-169999/169608/norma.htm',
  articleCount: 43,
  topics: [
    'Matrimonio',
    'Diversidad sexual',
    'Igualdad de derechos',
    'Código Civil',
    'Familia',
  ],
  keywords: [
    'matrimonio igualitario',
    'mismo sexo',
    'Código Civil',
    'adopción',
    'igualdad',
    'diversidad sexual',
    'derechos de familia',
    'patria potestad',
    'apellido',
    'sociedad conyugal',
  ],
  relatedNorms: [
    'Código Civil argentino (vigente hasta 2015 — hoy reemplazado por el CCyCN)',
    'Ley 18.248 (Nombre de las personas naturales — modificada)',
    'Ley 26.413 (Registro del Estado Civil — modificada)',
    'Ley 26.994 (Código Civil y Comercial — que consolidó la igualdad matrimonial en 2015)',
  ],
  executiveSummary:
    'La Ley 26.618 iguala el matrimonio entre personas del mismo sexo al heterosexual en todos sus efectos jurídicos. Su artículo 42 —el más importante— dispone que todas las referencias al matrimonio en el ordenamiento jurídico argentino se aplican indistintamente a parejas del mismo o distinto sexo. La ley modifica el Código Civil en más de 35 artículos, actualizando normas sobre patria potestad, adopción, apellidos, usufructo de bienes de hijos, sociedad conyugal y prescripción. Argentina fue el primer país de América Latina y el décimo en el mundo en legalizar el matrimonio igualitario.',
  objective:
    'Garantizar que las parejas del mismo sexo tengan acceso a todos los derechos y obligaciones del matrimonio civil en igualdad de condiciones con las parejas heterosexuales, eliminando la discriminación en el derecho de familia.',
  problemItSolves:
    'Antes de la ley, las parejas del mismo sexo carecían de reconocimiento legal: no podían heredarse, no podían dar consentimiento médico por el otro, no podían adoptar conjuntamente, no accedían a la obra social del cónyuge, y sus hijos no tenían el mismo régimen de apellido. La ley de unión civil porteña (2002) daba reconocimiento parcial solo en CABA.',
  practicalImpact:
    'Desde 2010, más de 100.000 parejas del mismo sexo se casaron en Argentina. El matrimonio igualitario permitió la adopción conjunta, el reconocimiento de hijos por ambos cónyuges, la herencia sin testamento y el acceso a la seguridad social. En 2015, el Código Civil y Comercial consolidó estos derechos con lenguaje de género neutro ("cónyuges" en lugar de "marido y mujer").',
  affectedSubjects: [
    'Parejas del mismo sexo',
    'Hijos e hijas de parejas del mismo sexo',
    'Registros Civiles de todo el país',
    'Obras sociales y sistema previsional',
    'Poderes judiciales en causas de familia, sucesiones y adopción',
  ],
  createdAt: '2010-07-22T00:00:00.000Z',
  updatedAt: '2010-07-22T00:00:00.000Z',
  relations: [],
  amendments: [
    {
      id: 'amd-26618-1',
      lawId: 'ley-26618',
      modifyingLaw: 'Ley 26.994 (Código Civil y Comercial — 2015)',
      modifyingDate: '2015-08-01',
      type: 'MODIFICATION',
      description:
        'El CCyCN consolidó la igualdad matrimonial en su articulado con lenguaje neutro ("cónyuges"), reemplazando las referencias a "marido y mujer" del Código Civil original. Las modificaciones de la Ley 26.618 quedaron absorbidas en el nuevo código.',
      createdAt: '2015-08-01T00:00:00.000Z',
    },
  ],
  annexes: [],
  segments: [],
  metadata: {
    id: 'meta-26618',
    lawId: 'ley-26618',
    mainTopic: 'Igualdad matrimonial para parejas del mismo sexo',
    subtopics: [
      'Modificaciones al Código Civil',
      'Adopción por parejas del mismo sexo',
      'Apellido de los hijos',
      'Sociedad conyugal igualitaria',
      'Patria potestad compartida',
    ],
    relatedLaws: [
      'Ley 18.248 — Nombre de las personas naturales (modificada en arts. 4, 8, 9, 10, 12)',
      'Ley 26.413 — Registro del Estado Civil (modificada en art. 36)',
      'Ley 26.994 — Código Civil y Comercial (consolida el matrimonio igualitario, 2015)',
    ],
    regulations: [],
    modifyingNorms: ['Ley 26.994 (CCyCN — absorbe y consolida las modificaciones)'],
    derogatingNorms: [],
    jurisprudence: [
      'Juzgado de Familia de Villa María (Córdoba) — primer sentencia que ordenó el matrimonio entre dos hombres antes de la ley (2010)',
      'Múltiples amparos provinciales que anticiparon la decisión legislativa nacional',
    ],
    doctrine: [],
    obligations: [
      'Inscribir matrimonios entre personas del mismo sexo (Registro Civil)',
      'Interpretar todas las normas sobre matrimonio de forma igualitaria (art. 42)',
      'Tramitar adopciones conjuntas de parejas del mismo sexo',
    ],
    rights: [
      'Derecho a casarse independientemente de la orientación sexual',
      'Derecho a heredarse sin testamento',
      'Derecho a adoptar conjuntamente',
      'Derecho a la obra social del cónyuge',
      'Derecho a dar consentimiento médico por el cónyuge',
      'Iguales derechos sobre los hijos (patria potestad compartida)',
    ],
    sanctions: [],
    useCases: [
      'Una pareja del mismo sexo quiere casarse → puede hacerlo en cualquier Registro Civil del país con idénticos requisitos que una pareja heterosexual',
      'Una pareja de mujeres quiere adoptar → puede hacerlo conjuntamente; la ley modifica el art. 324 CC para incluirlas',
      'Un hombre fallece sin testamento y su cónyuge del mismo sexo quiere heredar → tiene el mismo derecho que un cónyuge heterosexual bajo las normas de sucesión intestada',
    ],
    faq: [
      {
        question: '¿Argentina fue el primer país de América Latina en legalizar el matrimonio igualitario?',
        answer:
          'Sí. La Ley 26.618 fue sancionada el 15 de julio de 2010, convirtiendo a Argentina en el primer país de América Latina y el décimo del mundo en reconocer el matrimonio entre personas del mismo sexo.',
      },
      {
        question: '¿La ley permite la adopción por parejas del mismo sexo?',
        answer:
          'Sí. Al modificar el artículo 324 del Código Civil (y los artículos sobre filiación y adopción), la ley habilitó la adopción conjunta por cónyuges del mismo sexo. Esto fue consolidado por el CCyCN de 2015.',
      },
    ],
    createdAt: '2010-07-22T00:00:00.000Z',
    updatedAt: '2010-07-22T00:00:00.000Z',
  },
};
