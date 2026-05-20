import type { Law } from '../../common/types/law.types';
import { DECRETO_151_ARTICLES } from './articles';

const LAW_ID = 'decreto-151-2022';

export const DECRETO_151_2022: Law = {
  id: LAW_ID,
  number: '151',
  title: 'Decreto 151/2022 — Reglamentación de la Ley de Etiquetado Frontal',
  commonName: 'Reglamentación Etiquetado Frontal',
  summary:
    'Reglamenta la Ley 27.642 de Promoción de la Alimentación Saludable. Establece los valores máximos de nutrientes críticos en dos etapas, las especificaciones técnicas de los sellos octogonales (Anexo II), el cronograma de implementación y designa al Ministerio de Salud como autoridad de aplicación.',
  year: 2022,
  sanctionDate: '2022-03-22',
  promulgationDate: '2022-03-22',
  publicationDate: '2022-03-23',
  boNumber: '34879',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'DECRETO',
  category: 'salud',
  issuingBody: 'Poder Ejecutivo Nacional',
  fullText: null,
  sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/360000-364999/362577/norma.htm',
  articleCount: 22,
  topics: [
    'Alimentación saludable',
    'Etiquetado nutricional',
    'Reglamentación',
    'Salud pública',
    'Valores máximos de nutrientes',
  ],
  keywords: [
    'decreto reglamentario',
    'etiquetado frontal',
    'valores máximos',
    'tabla de nutrientes',
    'Etapa 1',
    'Etapa 2',
    'ANMAT',
    'sello octogonal',
    'especificaciones técnicas',
    'Ministerio de Salud',
    'cronograma',
    'MiPyMEs',
  ],
  relatedNorms: [
    'Ley 27.642 (norma reglamentada)',
    'Decreto 274/2019 (Lealtad Comercial)',
    'Código Alimentario Argentino',
    'Ley 24.240 (Defensa del Consumidor)',
  ],
  executiveSummary:
    'El Decreto 151/2022 es la reglamentación operativa de la Ley 27.642. Define los números concretos: cuánto azúcar, sodio, grasa o calorías activa el sello (Tabla 1), en dos etapas progresivamente más estrictas. También aprueba las especificaciones gráficas del octágono negro (Anexo II) y fija los plazos reales de implementación para grandes empresas y MiPyMEs.',
  objective:
    'Establecer las reglas técnicas y operativas necesarias para que fabricantes, importadores y comercializadores puedan implementar el sistema de etiquetado frontal de advertencia en Argentina.',
  problemItSolves:
    'La ley 27.642 estableció la obligación del etiquetado pero no dio los valores numéricos concretos ni las especificaciones gráficas. Sin el decreto, los fabricantes no podían saber exactamente cuándo colocar el sello ni cómo diseñarlo.',
  practicalImpact:
    'Toda empresa que fabrique o importe alimentos envasados debe conocer este decreto: determina si sus productos necesitan sello (Tabla 1), cómo diseñar el sello (Anexo II), y cuándo debió empezar a cumplir (cronograma del Art. 19).',
  affectedSubjects: [
    'Fabricantes de alimentos y bebidas',
    'Importadores y exportadores de alimentos',
    'Diseñadores gráficos y agencias de packaging',
    'Supermercados y distribuidores',
    'ANMAT y autoridades de control',
    'MiPyMEs alimentarias',
  ],
  sections: [],
  articles: DECRETO_151_ARTICLES,
  segments: [],
  annexes: [
    {
      id: 'dec151-anexo-ii',
      lawId: LAW_ID,
      number: 'II',
      title: 'Especificaciones Técnicas del Sello de Advertencia y Leyendas Precautorias',
      content:
        'El Anexo II contiene los archivos gráficos oficiales con las especificaciones técnicas de diseño de los sellos octogonales de advertencia y las leyendas precautorias. Incluye: modelo del octágono negro con borde y texto blanco, proporciones exactas, tipografía oficial, variantes para cada nutriente (EXCESO EN AZÚCARES, EXCESO EN GRASAS SATURADAS, EXCESO EN GRASAS TOTALES, EXCESO EN SODIO, EXCESO EN CALORÍAS) y las leyendas precautorias (CONTIENE EDULCORANTES, CONTIENE CAFEÍNA). Los archivos están disponibles en el sitio del Ministerio de Salud.',
      order: 1,
    },
  ],
  amendments: [
    {
      id: 'dec151-reglamenta-ley27642',
      lawId: LAW_ID,
      modifyingLaw: 'Ley 27.642',
      modifyingDate: '2021-11-12',
      description: 'Norma reglamentada por este decreto',
      type: 'REGULATION',
      createdAt: '2022-03-23T00:00:00.000Z',
    },
  ],
  metadata: {
    id: 'meta-decreto-151-2022',
    lawId: 'decreto-151-2022',
    mainTopic: 'Reglamentación técnica y operativa del etiquetado frontal de advertencia',
    subtopics: [
      'Umbrales de nutrientes críticos (Tabla 1 — Etapa 1 y Etapa 2)',
      'Especificaciones gráficas del sello octogonal (Anexo II)',
      'Cronograma de implementación por tipo de empresa',
      'Leyendas precautorias (edulcorantes y cafeína)',
      'MiPyMEs: plazos diferenciados',
    ],
    relatedLaws: [
      'Ley 27.642 — Norma reglamentada',
      'Decreto 274/2019 — Lealtad Comercial',
      'Ley 24.240 — Defensa del Consumidor',
      'Ley 18.284 — Código Alimentario Argentino',
    ],
    regulations: [
      'Resoluciones ANMAT complementarias sobre rotulado',
      'Resoluciones del Ministerio de Salud sobre autoridad de aplicación',
    ],
    modifyingNorms: [],
    derogatingNorms: [],
    jurisprudence: [],
    doctrine: [
      'OPS/OMS — "Modelo de perfil de nutrientes" (2016) — fuente de los valores umbral adoptados',
    ],
    obligations: [
      'Fabricantes: aplicar los sellos cuando el producto supere los valores de la Tabla 1 (Etapa 1 a partir del plazo del art. 19)',
      'Fabricantes: utilizar exclusivamente el diseño gráfico oficial del Anexo II para el sello octogonal',
      'MiPyMEs: cumplir en los plazos ampliados previstos en el art. 19',
      'Ministerio de Salud: actuar como autoridad de aplicación y publicar los archivos gráficos del Anexo II',
    ],
    rights: [
      'Las MiPyMEs tienen plazos de implementación más amplios que las grandes empresas',
      'Los fabricantes pueden usar cualquier tamaño de sello mientras respeten las proporciones del Anexo II',
    ],
    sanctions: [
      'Las mismas que la Ley 27.642: Ley 18.284 y Ley 24.240 — multas, clausura y decomiso',
    ],
    useCases: [
      'Etapa 1 — sólidos: si el producto tiene ≥5g de azúcares por 100g → sello "EXCESO EN AZÚCARES"',
      'Etapa 1 — líquidos: si tiene ≥10g de azúcares por 100ml → sello "EXCESO EN AZÚCARES"',
      'Etapa 1 — sodio: si supera 400mg/100g en sólidos o 100mg/100ml en líquidos → sello "EXCESO EN SODIO"',
      'Etapa 2 (más estricta): los umbrales bajan; productos que no tenían sello en Etapa 1 pueden necesitarlo en Etapa 2',
      'Diseño del sello: deben usarse los archivos del Anexo II, no crearse diseños propios aunque sean octogonales',
      'Una empresa grande debió cumplir en los primeros 9 meses; una MiPyME tuvo plazo de 15 meses para la Etapa 1',
    ],
    faq: [
      {
        question: '¿Qué es la Tabla 1 del Decreto?',
        answer:
          'Es el corazón operativo del sistema: una tabla que fija los valores máximos de azúcares, grasas saturadas, grasas totales, sodio y calorías —separados para sólidos y líquidos— en dos etapas progresivamente más estrictas. Si un producto supera alguno de esos valores, debe llevar el sello correspondiente. La Etapa 2 tiene umbrales más bajos que la Etapa 1.',
      },
      {
        question: '¿Dónde están los archivos del sello octogonal?',
        answer:
          'En el Anexo II del decreto, disponible en el sitio del Ministerio de Salud. Contiene los archivos gráficos oficiales con las especificaciones de diseño: octágono negro, borde blanco, texto blanco en mayúsculas, tipografía y proporciones exactas para cada variante (exceso en azúcares, grasas, sodio, calorías y leyendas precautorias).',
      },
      {
        question: '¿Cuándo entró en vigor el decreto?',
        answer:
          'El decreto fue publicado el 23 de marzo de 2022. Los plazos del art. 19 establecen cuándo cada empresa debía implementar el etiquetado: las grandes empresas a los 9 meses para Etapa 1 (18 meses para Etapa 2), y las MiPyMEs a los 15 meses para Etapa 1 (24 meses para Etapa 2), contados desde la publicación de la ley (noviembre 2021).',
      },
      {
        question: '¿Qué diferencia hay entre Etapa 1 y Etapa 2?',
        answer:
          'La Etapa 2 tiene umbrales de nutrientes más bajos que la Etapa 1, lo que significa que más productos quedan obligados a llevar sellos. Es un sistema de implementación gradual para dar tiempo a la industria a reformular sus productos antes de que los límites se vuelvan más estrictos.',
      },
    ],
    createdAt: '2022-03-23T00:00:00.000Z',
    updatedAt: '2022-03-23T00:00:00.000Z',
  },
  createdAt: '2022-03-23T00:00:00.000Z',
  updatedAt: '2022-03-23T00:00:00.000Z',
};
