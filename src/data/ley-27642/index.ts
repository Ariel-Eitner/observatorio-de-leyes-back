import type { Law } from '../../common/types/law.types';
import { ARTICLES_CAP1, ARTICLES_CAP2 } from './articles-cap1-2';
import { ARTICLES_CAP3_7 } from './articles-cap3-7';

const LAW_ID = 'ley-27642';

export const LEY_27642: Law = {
  id: LAW_ID,
  number: '27642',
  title: 'Ley de Promoción de la Alimentación Saludable',
  commonName: 'Ley de Etiquetado Frontal',
  summary:
    'Establece el etiquetado frontal obligatorio en alimentos envasados y bebidas analcohólicas mediante sellos octogonales negros que advierten sobre exceso de azúcares, grasas saturadas, grasas totales, sodio y calorías, y presencia de edulcorantes y cafeína.',
  year: 2021,
  sanctionDate: '2021-10-26',
  promulgationDate: '2021-11-12',
  publicationDate: '2021-11-12',
  effectiveDate: null,
  derogatedDate: null,
  boNumber: '34793',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  category: 'salud',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/355000-359999/356607/norma.htm',
  articleCount: 24,
  topics: [
    'Alimentación saludable',
    'Etiquetado nutricional',
    'Protección del consumidor',
    'Salud pública',
    'Alimentos envasados',
    'Nutrición',
  ],
  keywords: [
    'etiquetado frontal',
    'sello de advertencia',
    'exceso en azúcares',
    'exceso en sodio',
    'exceso en grasas',
    'exceso en calorías',
    'edulcorantes',
    'cafeína',
    'alimentos envasados',
    'rotulado nutricional',
    'nutrientes críticos',
    'OPS',
    'alimentación saludable',
    'comida ultraprocesada',
    'bebidas analcohólicas',
  ],
  relatedNorms: [
    'Decreto 151/2022 (Reglamentación)',
    'Decreto 274/2019 (Lealtad Comercial)',
    'Ley 24.240 (Defensa del Consumidor)',
    'Código Alimentario Argentino',
    'Ley 25.300 (MiPyMes)',
  ],
  relations: [],
  executiveSummary:
    'La Ley 27.642 obliga a que todos los alimentos envasados y bebidas analcohólicas que vendan en Argentina lleven sellos octogonales negros cuando superen ciertos límites de azúcares, grasas, sodio o calorías. También prohíbe la venta de estos productos en escuelas y restringe su publicidad dirigida a menores.',
  objective:
    'Garantizar el derecho a la salud y a una alimentación adecuada, informar al consumidor sobre el exceso de nutrientes críticos en alimentos procesados y prevenir enfermedades crónicas no transmisibles vinculadas a la alimentación.',
  problemItSolves:
    'Los consumidores no podían identificar fácilmente qué alimentos tienen altas concentraciones de azúcares, sodio, grasas o calorías. Las tablas nutricionales eran difíciles de interpretar y muchos envases incluían personajes, logos de salud y declaraciones que inducían a pensar que el producto era saludable aunque no lo fuera.',
  practicalImpact:
    'Cualquier empresa que fabrique, importe o comercialice alimentos o bebidas analcohólicas en Argentina debe verificar si sus productos superan los valores límite de la OPS y, en ese caso, agregar los sellos octogonales. Las escuelas no pueden vender ni ofrecer productos con sellos. Los envases no pueden incluir personajes infantiles, logos de organizaciones de salud ni declaraciones nutricionales positivas si tienen sellos.',
  affectedSubjects: [
    'Fabricantes de alimentos y bebidas',
    'Importadores y distribuidores de alimentos',
    'Supermercados y comercios alimenticios',
    'Establecimientos educativos (inicial, primario, secundario)',
    'Empresas de publicidad',
    'Consumidores en general',
    'MiPyMEs del sector alimenticio',
    'Cooperativas y productores de agricultura familiar',
  ],
  sections: [],
  articles: [...ARTICLES_CAP1, ...ARTICLES_CAP2, ...ARTICLES_CAP3_7],
  segments: [],
  annexes: [],
  amendments: [],
  metadata: {
    id: 'meta-27642',
    lawId: 'ley-27642',
    mainTopic: 'Etiquetado nutricional frontal y alimentación saludable',
    subtopics: [
      'Sellos de advertencia octogonales',
      'Nutrientes críticos (azúcares, grasas, sodio, calorías)',
      'Restricciones de publicidad dirigida a menores',
      'Venta en establecimientos educativos',
      'Leyendas precautorias (edulcorantes, cafeína)',
      'Cronograma de implementación por etapas',
    ],
    relatedLaws: [
      'Ley 24.240 — Defensa del Consumidor (1993)',
      'Ley 25.300 — MiPyMEs (2000)',
      'Decreto 151/2022 — Reglamentación operativa',
      'Decreto 274/2019 — Lealtad Comercial',
      'Código Alimentario Argentino (CAA)',
    ],
    regulations: [
      'Decreto 151/2022 (reglamentario — valores máximos y especificaciones del sello)',
      'Resoluciones ANMAT sobre rotulado nutricional',
    ],
    modifyingNorms: [],
    derogatingNorms: [],
    jurisprudence: [],
    doctrine: [
      'OPS/OMS — "Modelo de perfil de nutrientes de la Organización Panamericana de la Salud" (2016) — base técnica de los umbrales',
      'Ministerio de Salud — "Guías Alimentarias para la Población Argentina" (2016)',
    ],
    obligations: [
      'Fabricantes e importadores: incorporar sellos octogonales si el producto supera los umbrales del Decreto 151/2022',
      'Fabricantes e importadores: incluir leyendas "CONTIENE EDULCORANTES" o "CONTIENE CAFEÍNA" cuando corresponda',
      'Establecimientos educativos: prohibido vender o suministrar alimentos con sellos en quioscos, comedores y cualquier espacio del establecimiento',
      'Medios de comunicación y plataformas: respetar las restricciones de publicidad de alimentos con sellos dirigida a menores',
      'Fabricantes: no incluir personajes, figuras animadas, celebridades o logos de organizaciones de salud en productos con sellos',
      'Estado nacional y provincial: promover entornos alimentarios saludables en instituciones públicas',
    ],
    rights: [
      'Derecho a recibir información veraz, clara y suficiente sobre el contenido nutricional de los alimentos',
      'Derecho a una alimentación adecuada conforme al art. 75 inc. 22 CN y tratados internacionales',
      'Derecho de los niños, niñas y adolescentes a entornos escolares libres de alimentos con exceso de nutrientes críticos',
      'Derecho del consumidor a no ser inducido a error por publicidad o diseño de envases engañosos',
    ],
    sanctions: [
      'Infracciones a la ley se sancionan conforme a la Ley 18.284 (Código Alimentario) y la Ley 24.240 (Defensa del Consumidor)',
      'Las sanciones incluyen multas, clausura y decomiso de productos',
      'La autoridad de aplicación es el Ministerio de Salud; ANMAT actúa como organismo técnico',
      'Las provincias y CABA tienen competencia concurrente para aplicar sanciones en sus jurisdicciones',
    ],
    useCases: [
      'Un yogur tiene 12g de azúcares por 100g → supera el umbral de la Etapa 1 (≥5g/100g sólidos) → debe llevar el sello "EXCESO EN AZÚCARES"',
      'Una bebida energizante contiene cafeína → debe incluir la leyenda "CONTIENE CAFEÍNA" independientemente de si tiene otros sellos',
      'Una escuela primaria tiene kiosco → no puede vender ningún producto que tenga uno o más sellos octogonales',
      'Una empresa de publicidad quiere usar un personaje infantil para promocionar galletitas con sellos en TV → está prohibido por el art. 13',
      'Una MiPyME alimentaria → tiene plazos de implementación ampliados respecto a las grandes empresas (ver Decreto 151/2022)',
      'Un producto tiene sello de exceso en grasas → no puede incluir en el envase ninguna declaración nutricional positiva ("bajo en calorías", "fuente de proteínas") ni logos de organizaciones de salud',
    ],
    faq: [
      {
        question: '¿Qué es el sello octogonal y por qué es negro?',
        answer:
          'Es una figura geométrica de ocho lados con fondo negro y texto blanco en mayúsculas que indica que el alimento supera los límites permitidos de un nutriente crítico. El diseño (octógono negro) fue adoptado siguiendo las recomendaciones de la OPS/OMS por su alta visibilidad y por asociarse culturalmente con señales de advertencia, lo que facilita la lectura rápida sin necesidad de interpretar números.',
      },
      {
        question: '¿Cuántos sellos puede tener un producto?',
        answer:
          'Tantos como nutrientes críticos supere. Un producto puede tener simultáneamente los sellos de exceso en azúcares, grasas saturadas, grasas totales, sodio y calorías, más las leyendas de edulcorantes y cafeína. No hay límite; cada nutriente se evalúa de forma independiente.',
      },
      {
        question: '¿Quién controla que los fabricantes cumplan?',
        answer:
          'El Ministerio de Salud es la autoridad de aplicación nacional. ANMAT actúa como organismo técnico. Las provincias y CABA tienen competencia concurrente para fiscalizar en sus territorios. Las infracciones se sancionan bajo la Ley 18.284 y la Ley 24.240.',
      },
      {
        question: '¿Un producto con sello puede venderse en una escuela?',
        answer:
          'No. El art. 14 prohíbe la venta, suministro, publicidad y promoción de alimentos con sellos en establecimientos de educación inicial, primaria y secundaria. La prohibición abarca quioscos, comedores y cualquier espacio dentro del establecimiento.',
      },
      {
        question: '¿Qué diferencia hay entre "sello" y "leyenda precautoria"?',
        answer:
          'El sello octogonal negro advierte sobre exceso de un nutriente crítico (azúcares, grasas, sodio, calorías). Las leyendas precautorias —"CONTIENE EDULCORANTES" y "CONTIENE CAFEÍNA"— informan sobre la presencia de ingredientes específicos que no son nutrientes críticos en el sentido calórico pero requieren advertencia por otros motivos de salud.',
      },
      {
        question: '¿La ley aplica también a productos importados?',
        answer:
          'Sí. Todo alimento envasado que se comercialice en Argentina debe cumplir con la ley, independientemente de su origen. Los importadores son responsables de que los productos cumplan antes de ingresar al comercio.',
      },
    ],
    createdAt: '2021-11-12T00:00:00.000Z',
    updatedAt: '2022-03-23T00:00:00.000Z',
  },
  createdAt: '2021-11-12T00:00:00.000Z',
  updatedAt: '2021-11-12T00:00:00.000Z',
};
