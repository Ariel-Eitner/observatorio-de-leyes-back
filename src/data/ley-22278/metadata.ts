import type { Law } from '../../common/types/law.types';

type LawBase = Omit<Law, 'articles' | 'sections'>;

export const LEY_22278_METADATA: LawBase = {
  id: 'ley-22278',
  number: '22278',
  title: 'Régimen Penal de la Minoridad',
  commonName: 'Régimen Penal de la Minoridad',
  summary:
    'Establece el régimen de responsabilidad penal de los menores de 18 años en Argentina. Fija la edad de no punibilidad en 16 años (art. 1, modificado por Ley 22.803). Fue derogada por la Ley 27.801 (Ley Penal Juvenil), con vigencia diferida de 180 días a partir del 9 de marzo de 2026.',
  year: 1980,
  sanctionDate: '1980-08-25',
  promulgationDate: '1980-08-25',
  publicationDate: '1980-08-28',
  boNumber: '24491',
  status: 'DEROGADA',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Poder Ejecutivo Nacional (de facto)',
  fullText: null,
  sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/125000-129999/126476/texact.htm',
  articleCount: 14,
  topics: [
    'Derecho penal juvenil',
    'Menores de edad',
    'Inimputabilidad',
    'Responsabilidad penal juvenil',
    'Sistema tutelar',
  ],
  keywords: [
    'régimen penal de la minoridad',
    'menores',
    'inimputabilidad',
    'edad penal',
    'responsabilidad penal juvenil',
    'tutela',
    'disposición tutelar',
    'internación de menores',
    'delincuencia juvenil',
  ],
  relatedNorms: [
    'Ley 27.801 (Ley Penal Juvenil — deroga esta ley)',
    'Ley 22.803 (modifica arts. 1 y 2 — elevó edad a 16 años)',
    'Ley 23.264 (modifica art. 7)',
    'Ley 23.742 (agrega art. 3bis)',
    'Convención sobre los Derechos del Niño (arts. 37 y 40)',
    'Ley 26.061 (Protección Integral de NNyA)',
  ],
  executiveSummary:
    'La Ley 22.278 fue el marco legal central del sistema penal juvenil argentino desde 1980. Distingue entre menores no punibles (menores de 16 años) y menores punibles (16 y 17 años). Para los no punibles solo procede la disposición tutelar; para los punibles, el proceso penal puede derivar en sanción o en sobreseimiento con medidas tutelares. Fue sancionada durante la dictadura y criticada por su modelo tutelar-discrecional. La Ley 27.801 la derogó en 2026.',
  objective:
    'Establecer un régimen diferenciado de responsabilidad penal para menores de 18 años, separando la respuesta estatal según la edad y la gravedad del hecho.',
  problemItSolves:
    'Históricamente, la ley buscó separar el sistema penal juvenil del de adultos. Fue criticada por no incorporar garantías procesales mínimas (derecho de defensa, doble instancia, proporcionalidad) y por el modelo tutelar discrecional del juez.',
  practicalImpact:
    'Durante más de 40 años rigió el sistema penal juvenil en Argentina. Creó el modelo de "disposición tutelar" como respuesta punitiva encubierta. Los debates sobre baja de edad de imputabilidad se articulaban en torno a modificar esta ley. La Ley 27.801 la reemplazó con un sistema de responsabilidad penal juvenil con garantías del debido proceso.',
  affectedSubjects: [
    'Menores de 18 años imputados de delitos',
    'Jueces de menores',
    'Ministerio Público',
    'Organismos de protección de la niñez',
  ],
  createdAt: '1980-08-28T00:00:00.000Z',
  updatedAt: '2026-03-09T00:00:00.000Z',
  amendments: [
    {
      id: 'amend-22278-22803',
      lawId: 'ley-22278',
      modifyingLaw: 'Ley 22.803',
      modifyingDate: '1983-05-09',
      description: 'Modificó los artículos 1 y 2 elevando la edad de no punibilidad de 14 a 16 años.',
      type: 'MODIFICATION' as const,
      createdAt: '1983-05-09T00:00:00.000Z',
    },
    {
      id: 'amend-22278-23742',
      lawId: 'ley-22278',
      modifyingLaw: 'Ley 23.742',
      modifyingDate: '1989-10-25',
      description: 'Incorporó el artículo 3bis.',
      type: 'MODIFICATION' as const,
      createdAt: '1989-10-25T00:00:00.000Z',
    },
    {
      id: 'amend-22278-23264',
      lawId: 'ley-22278',
      modifyingLaw: 'Ley 23.264',
      modifyingDate: '1985-10-25',
      description: 'Modificó el artículo 7.',
      type: 'MODIFICATION' as const,
      createdAt: '1985-10-25T00:00:00.000Z',
    },
    {
      id: 'amend-22278-27801',
      lawId: 'ley-22278',
      modifyingLaw: 'Ley 27.801 (Ley Penal Juvenil)',
      modifyingDate: '2026-03-09',
      description: 'Derogó íntegramente la Ley 22.278 con vigencia diferida de 180 días desde el 9/3/2026.',
      type: 'PARTIAL_REPEAL' as const,
      createdAt: '2026-03-09T00:00:00.000Z',
    },
  ],
  annexes: [],
  segments: [],
  metadata: {
    id: 'meta-22278',
    lawId: 'ley-22278',
    mainTopic: 'Responsabilidad penal de menores de 18 años',
    subtopics: [
      'No punibilidad de menores de 16 años',
      'Régimen tutelar discrecional',
      'Proceso penal juvenil',
      'Disposición tutelar como medida de protección/sanción',
    ],
    relatedLaws: [
      'Ley 27.801 — Ley Penal Juvenil (derogante, 2026)',
      'Ley 26.061 — Protección Integral de NNyA (2005)',
      'Ley 22.803 — Modificación (elevó edad a 16 años, 1983)',
    ],
    regulations: [],
    modifyingNorms: ['Ley 22.803 (arts. 1 y 2)', 'Ley 23.264 (art. 7)', 'Ley 23.742 (art. 3bis)'],
    derogatingNorms: ['Ley 27.801 (derogación total, vigente desde ~septiembre 2026)'],
    jurisprudence: [
      'CSJN "García Méndez" (2008) — declaró inconstitucional la privación de libertad de menores no punibles como medida tutelar',
      'CSJN "Maldonado" (2005) — prohibición de aplicar prisión perpetua a menores; principio de culpabilidad diferenciada',
    ],
    doctrine: [],
    obligations: [
      'Jueces: aplicar disposición tutelar a menores no punibles en lugar de sanción penal',
      'Jueces: respetar el período de prueba antes de imponer sanción a menores punibles',
      'Estado: garantizar la tutela y tratamiento adecuado del menor',
    ],
    rights: [
      'Menores de 16 años: no punibilidad penal',
      'Menores de 18 años: sistema diferenciado del proceso penal de adultos',
    ],
    sanctions: [
      'Disposición tutelar (para no punibles y durante período de prueba)',
      'Pena reducida en un tercio del mínimo y la mitad del máximo de la escala penal de adultos (para punibles condenados)',
    ],
    useCases: [
      'Menor de 15 años imputado de robo → no punible, el juez puede disponer su tutela pero no condenarlo penalmente',
      'Menor de 17 años imputado de homicidio → punible; el juez instruye, puede aplicar disposición tutelar y, si corresponde, pena reducida respecto del máximo adulto',
    ],
    faq: [
      {
        question: '¿Cuándo fue derogada esta ley?',
        answer:
          'La Ley 22.278 fue derogada por la Ley 27.801 (Ley Penal Juvenil), publicada en el Boletín Oficial el 9 de marzo de 2026. La vigencia se difirió 180 días, por lo que la derogación efectiva opera aproximadamente en septiembre de 2026.',
      },
      {
        question: '¿Cuál era la edad de imputabilidad bajo esta ley?',
        answer:
          'La ley original (1980) fijaba la no punibilidad en 14 años. La Ley 22.803 (1983) la elevó a 16 años. Los menores de 16 años eran absolutamente no punibles; entre 16 y 18 años eran penalmente responsables pero con un régimen diferenciado.',
      },
      {
        question: '¿Qué es la "disposición tutelar"?',
        answer:
          'Era la medida judicial que el juez podía ordenar sobre un menor —punible o no— consistente en internación en establecimientos especiales o libertad vigilada con obligaciones. Fue criticada por funcionar como sanción encubierta sin las garantías del proceso penal regular.',
      },
    ],
    createdAt: '1980-08-28T00:00:00.000Z',
    updatedAt: '2026-03-09T00:00:00.000Z',
  },
};
