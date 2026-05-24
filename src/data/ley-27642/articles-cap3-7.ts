import type { Article } from '../../common/types/law.types';

const LAW_ID = 'ley-27642';

export const ARTICLES_CAP3_7: Article[] = [
  // ─── CAPÍTULO III — PUBLICIDAD, PROMOCIÓN Y PATROCINIO ───────────────────
  {
    id: 'ley27642-art-10',
    lawId: LAW_ID,
    number: '10',
    title: 'Prohibiciones en publicidad',
    text:
      'ARTÍCULO 10.- Prohibiciones. Queda prohibida toda publicidad, promoción y/o patrocinio de alimentos envasados y bebidas analcohólicas que deban incluir los sellos de advertencia cuando estén dirigidas a menores de dieciséis (16) años en programas, publicaciones, sitios web o cualquier otro tipo de espacio de comunicación cuya audiencia esté conformada en más de un treinta y cinco por ciento (35%) por personas menores de dieciséis (16) años.',
    plainLanguageExplanation:
      'Los productos con sellos no se pueden anunciar en medios donde más del 35% de la audiencia sean menores de 16 años. Esto incluye programas de TV infantiles, canales de YouTube para chicos, apps educativas y redes sociales con audiencia joven.',
    practicalEffects: [
      'Los anunciantes deben verificar los datos demográficos de audiencia de los medios donde publicitan.',
      'Las plataformas digitales deberán desactivar la segmentación publicitaria de estos productos hacia perfiles menores de 16 años.',
      'Los influencers con audiencia mayor al 35% de menores no pueden promocionar productos con sellos.',
      'ANMAT tiene facultades para fiscalizar y sancionar publicidad no permitida.',
    ],
    examples: [
      'Un programa de TV infantil que proyecta en el horario 14-18hs con audiencia 80% menor de 16 años no puede emitir publicidad de gaseosas con sello.',
      'Un canal de YouTube de gaming con 40% de audiencia menor de 16 años no puede tener sponsoreo de snacks con sello.',
    ],
    relatedArticles: ['ley27642-art-9', 'ley27642-art-14', 'ley27642-art-15'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 10'],
    keywords: ['publicidad', 'menores', 'audiencia infantil', 'promoción', 'patrocinio', 'medios', 'redes sociales', 'influencers'],
    order: 10,
    segments: [
      {
        id: 'ley27642-art-10-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-10',
        articleNumber: '10',
        order: 0,
        segmentType: 'PARAGRAPH',
        text:
          'Queda prohibida toda publicidad de alimentos con sellos cuando esté dirigida a menores de 16 años en espacios de comunicación cuya audiencia esté conformada en más de un 35% por personas menores de dieciséis (16) años.',
        plainExplanation:
          'El umbral del 35% es clave: no se requiere que la audiencia sea mayoritariamente menor, basta con que más de un tercio lo sea.',
        practicalExample:
          'Una revista de modas con 36% de lectoras menores de 16 años no puede publicar avisos de cereales azucarados con sello.',
        references: [],
      },
    ],
    amendments: [],
  },

  // ─── CAPÍTULO IV — ESTABLECIMIENTOS EDUCATIVOS ───────────────────────────
  {
    id: 'ley27642-art-11',
    lawId: LAW_ID,
    number: '11',
    title: 'Hábitos saludables en educación',
    text:
      'ARTÍCULO 11.- Hábitos de alimentación saludable. El Consejo Federal de Educación, en conjunto con la autoridad de aplicación de la presente ley, promoverá la inclusión de contenidos de educación alimentaria nutricional en los diferentes niveles del sistema educativo.',
    plainLanguageExplanation:
      'Las escuelas de todo el país deben incorporar contenidos sobre alimentación saludable en el currículum, no solo como una materia sino transversalmente en los distintos niveles. El Consejo Federal de Educación debe coordinar esto con el Ministerio de Salud.',
    practicalEffects: [
      'Los diseños curriculares provinciales deben actualizarse para incluir educación alimentaria.',
      'Los docentes de distintas materias (ciencias naturales, biología, educación física) deben capacitarse en el tema.',
      'El contenido debe ser apropiado para cada nivel educativo, desde inicial hasta secundario.',
    ],
    examples: [],
    relatedArticles: ['ley27642-art-12'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 11'],
    keywords: ['educación alimentaria', 'escuelas', 'Consejo Federal de Educación', 'currículum', 'hábitos saludables'],
    order: 11,
    segments: [
      {
        id: 'ley27642-art-11-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-11',
        articleNumber: '11',
        order: 0,
        segmentType: 'PARAGRAPH',
        text:
          'El Consejo Federal de Educación promoverá la inclusión de contenidos de educación alimentaria nutricional en los diferentes niveles del sistema educativo.',
        plainExplanation:
          'Esta obligación es de resultado: los contenidos deben incorporarse efectivamente al currículo, no solo ser "promovidos" sin seguimiento.',
        practicalExample:
          'Una escuela primaria que ya enseña "grupos de alimentos" debe actualizar esos contenidos para incluir la lectura de sellos y la comprensión de los nutrientes críticos.',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-12',
    lawId: LAW_ID,
    number: '12',
    title: 'Prohibición de venta en establecimientos educativos',
    text:
      'ARTÍCULO 12.- Entornos escolares. Queda prohibido ofrecer, comercializar, publicitar o patrocinar alimentos envasados y bebidas analcohólicas que deban incluir los sellos de advertencia en los establecimientos educativos de los niveles inicial, primario y secundario.',
    plainLanguageExplanation:
      'En jardines de infantes, primarias y secundarias queda prohibido vender, regalar o publicitar cualquier producto con sello de advertencia. Esto aplica a kioscos, cantinas, máquinas expendedoras y cualquier evento o patrocinio escolar.',
    practicalEffects: [
      'Los kioscos escolares no pueden vender gaseosas, snacks con sello, galletitas azucaradas ni productos similares.',
      'Las máquinas expendedoras en escuelas deben reemplazar todos los productos con sello por alternativas sin sello.',
      'Los actos escolares, fiestas de fin de año y eventos no pueden ser patrocinados por empresas de productos con sello.',
      'Los comedores escolares deben adaptar sus menús para excluir productos con sello.',
    ],
    examples: [
      'Un kiosco de secundario que vendía Coca-Cola y Lay\'s debe reemplazarlos por opciones sin sello.',
      'Una empresa de snacks que patrocinaba el torneo de fútbol escolar ya no puede hacerlo si sus productos tienen sello.',
    ],
    relatedArticles: ['ley27642-art-11', 'ley27642-art-4'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 12'],
    keywords: ['establecimientos educativos', 'kioscos escolares', 'prohibición venta', 'cantinas', 'máquinas expendedoras', 'patrocinio escolar'],
    order: 12,
    segments: [
      {
        id: 'ley27642-art-12-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-12',
        articleNumber: '12',
        order: 0,
        segmentType: 'PARAGRAPH',
        text:
          'Queda prohibido ofrecer, comercializar, publicitar o patrocinar alimentos envasados con sellos en los establecimientos educativos de los niveles inicial, primario y secundario.',
        plainExplanation:
          'La prohibición cubre todo el espacio escolar y toda modalidad de disposición del producto: no solo la venta sino también la distribución gratuita y el patrocinio.',
        practicalExample:
          'Un fabricante que repartía muestras gratis de su cereal azucarado en las escuelas debe suspender esa práctica si el cereal tiene sello.',
        references: [],
      },
    ],
    amendments: [],
  },

  // ─── CAPÍTULO V — AUTORIDAD DE APLICACIÓN ────────────────────────────────
  {
    id: 'ley27642-art-13',
    lawId: LAW_ID,
    number: '13',
    title: 'Determinación de la autoridad de aplicación',
    text:
      'ARTÍCULO 13.- Determinación. El Poder Ejecutivo debe determinar la autoridad de aplicación de la presente ley. Las provincias y la Ciudad Autónoma de Buenos Aires son las autoridades locales de aplicación, ejerciendo el control y vigilancia de la presente ley y sus normas reglamentarias en sus respectivas jurisdicciones.',
    plainLanguageExplanation:
      'El Poder Ejecutivo Nacional designa quién aplica la ley a nivel nacional (el Decreto 151/2022 designó al Ministerio de Salud). Pero cada provincia y CABA también tiene autoridad para controlar el cumplimiento en su territorio.',
    practicalEffects: [
      'El Ministerio de Salud de la Nación es la autoridad de aplicación nacional (según Decreto 151/2022 Art. 3).',
      'Las autoridades de salud provinciales pueden fiscalizar y sancionar en su jurisdicción.',
      'Puede haber inspecciones de organismos provinciales además de los nacionales (ANMAT, Secretaría de Comercio).',
      'En caso de conflicto entre normas nacionales y provinciales, prima la norma más protectora del consumidor.',
    ],
    examples: [],
    relatedArticles: ['ley27642-art-14', 'ley27642-art-15'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 3 y Art. 13'],
    keywords: ['autoridad de aplicación', 'Ministerio de Salud', 'provincias', 'CABA', 'jurisdicción', 'fiscalización'],
    order: 13,
    segments: [
      {
        id: 'ley27642-art-13-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-13',
        articleNumber: '13',
        order: 0,
        segmentType: 'PARAGRAPH',
        text:
          'Las provincias y la Ciudad Autónoma de Buenos Aires son las autoridades locales de aplicación, ejerciendo el control y vigilancia en sus respectivas jurisdicciones.',
        plainExplanation:
          'El federalismo de la ley implica que los controles se ejercen en dos niveles: el nacional (ANMAT y Ministerio de Salud) y el local (secretarías de salud provinciales).',
        practicalExample:
          'La Secretaría de Salud de la Provincia de Buenos Aires puede inspeccionar un supermercado en Mar del Plata e imponer multas por incumplimiento de los sellos.',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-14',
    lawId: LAW_ID,
    number: '14',
    title: 'Facultades de la autoridad de aplicación',
    text:
      'ARTÍCULO 14.- Facultades. La autoridad de aplicación tendrá las siguientes competencias:\na) Difundir información sobre la importancia de la alimentación saludable;\nb) Implementar acciones de coordinación para la promoción del consumo de alimentos no procesados;\nc) Fiscalizar el cumplimiento de la presente ley;\nd) Requerir declaraciones juradas a los responsables del rotulado sobre los nutrientes críticos;\ne) Cualquier otra función necesaria para la implementación de esta ley.',
    plainLanguageExplanation:
      'La autoridad puede hacer campañas de concientización, hacer inspecciones, pedir a las empresas que declaren por escrito qué nutrientes tienen sus productos, y cualquier otra acción necesaria para que la ley funcione.',
    practicalEffects: [
      'Las empresas pueden ser obligadas a presentar declaraciones juradas con el perfil nutricional de sus productos.',
      'La autoridad puede emitir guías, manuales y materiales de comunicación para consumidores.',
      'Las facultades son amplias y no taxativas ("cualquier otra función necesaria").',
    ],
    examples: [],
    relatedArticles: ['ley27642-art-13', 'ley27642-art-15'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 14'],
    keywords: ['facultades', 'fiscalización', 'declaración jurada', 'campañas', 'coordinación', 'cumplimiento'],
    order: 14,
    segments: [
      {
        id: 'ley27642-art-14-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-14',
        articleNumber: '14',
        order: 0,
        segmentType: 'PARAGRAPH',
        text:
          'La autoridad de aplicación podrá requerir declaraciones juradas a los responsables del rotulado sobre el contenido de nutrientes críticos.',
        plainExplanation:
          'Las declaraciones juradas crean responsabilidad penal si son falsas, lo que desincentiva a los fabricantes de sub-declarar nutrientes críticos.',
        practicalExample:
          'ANMAT puede exigirle a una empresa que declare bajo juramento que su producto tiene 3,5g de azúcar por 100g. Si luego un análisis de laboratorio da 9g, la empresa tiene responsabilidad penal además de la infracción.',
        references: [],
      },
    ],
    amendments: [],
  },

  // ─── CAPÍTULO VI — SANCIONES ─────────────────────────────────────────────
  {
    id: 'ley27642-art-15',
    lawId: LAW_ID,
    number: '15',
    title: 'Sanciones por infracciones',
    text:
      'ARTÍCULO 15.- Sanciones. Las infracciones a las disposiciones de la presente ley serán pasibles de las sanciones establecidas en el Capítulo III del Título IV del decreto 274/2019, de Lealtad Comercial, según corresponda.',
    plainLanguageExplanation:
      'Las multas y sanciones por no cumplir la ley son las del Decreto de Lealtad Comercial (274/2019), que va desde apercibimientos hasta multas de hasta 5 millones de pesos (actualizables), cierre del establecimiento y secuestro de productos.',
    practicalEffects: [
      'Las sanciones van desde apercibimiento, multa de 1 a 5.000.000 de pesos (actualizable por INDEC), decomiso del producto, cierre temporal del establecimiento, hasta suspensión o cancelación de habilitación.',
      'La reincidencia agrava las sanciones.',
      'Cada producto sin sello puede considerarse una infracción separada.',
    ],
    examples: [
      'Un supermercado que vende 500 unidades de un snack sin sello puede recibir multa por el total de unidades infractoras.',
    ],
    relatedArticles: ['ley27642-art-14', 'ley27642-art-16'],
    jurisprudence: [],
    regulations: ['Decreto 274/2019', 'Decreto 151/2022 Art. 15'],
    keywords: ['sanciones', 'multas', 'infracciones', 'Lealtad Comercial', 'decomiso', 'cierre'],
    order: 15,
    segments: [
      {
        id: 'ley27642-art-15-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-15',
        articleNumber: '15',
        order: 0,
        segmentType: 'PARAGRAPH',
        text:
          'Las infracciones serán pasibles de las sanciones establecidas en el Capítulo III del Título IV del decreto 274/2019, de Lealtad Comercial.',
        plainExplanation:
          'La ley no fija sus propias sanciones sino que remite al régimen de Lealtad Comercial, que ya tiene un sistema de infracciones consolidado con graduación según la gravedad.',
        practicalExample:
          'Un fabricante que no agrega los sellos puede recibir una multa de hasta $5.000.000 por cada producto, el decomiso de la mercadería sin sello y la suspensión de su habilitación para producir.',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-16',
    lawId: LAW_ID,
    number: '16',
    title: 'Integración con Defensa del Consumidor',
    text:
      'ARTÍCULO 16.- Las disposiciones de la presente ley se integran con la ley 24.240 de Defensa del Consumidor y el decreto 274/2019 de Lealtad Comercial.',
    plainLanguageExplanation:
      'La Ley 27.642 no reemplaza sino que se suma al sistema de protección del consumidor. Los derechos del consumidor (información veraz, buenas prácticas) se aplican conjuntamente con las obligaciones de etiquetado.',
    practicalEffects: [
      'Los consumidores pueden reclamar ante Defensa del Consumidor además de ante la autoridad de salud.',
      'La infracción a la Ley 27.642 puede configurar también una infracción a la Ley 24.240.',
      'Los organismos de defensa del consumidor provincial también tienen competencia en la materia.',
    ],
    examples: [],
    relatedArticles: ['ley27642-art-15'],
    jurisprudence: [],
    regulations: ['Ley 24.240', 'Decreto 274/2019'],
    keywords: ['Defensa del Consumidor', 'integración normativa', 'Lealtad Comercial', 'sistema de protección'],
    order: 16,
    segments: [
      {
        id: 'ley27642-art-16-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-16',
        articleNumber: '16',
        order: 0,
        segmentType: 'PARAGRAPH',
        text: 'Las disposiciones de la presente ley se integran con la ley 24.240 de Defensa del Consumidor y el decreto 274/2019 de Lealtad Comercial.',
        plainExplanation: 'La integración normativa significa que se aplican todas las normas en conjunto: no hay que elegir una sola.',
        practicalExample:
          'Un consumidor que compra un producto sin sello que debía tenerlo puede reclamar por Ley 24.240 (violación al deber de información) y también bajo esta ley (incumplimiento de etiquetado).',
        references: [],
      },
    ],
    amendments: [],
  },

  // ─── CAPÍTULO VII — DISPOSICIONES COMPLEMENTARIAS ────────────────────────
  {
    id: 'ley27642-art-17',
    lawId: LAW_ID,
    number: '17',
    title: 'Compras del Estado — priorizar sin sellos',
    text:
      'ARTÍCULO 17.- Disposición complementaria. El Estado nacional priorizará ante igual conveniencia, de acuerdo a la forma que establezca la reglamentación, las contrataciones de los alimentos y bebidas analcohólicas que no cuenten con sellos de advertencia.',
    plainLanguageExplanation:
      'Cuando el Estado compra alimentos para comedores escolares, hospitales, fuerzas armadas y otros organismos, debe preferir productos sin sello de advertencia cuando precio y calidad sean similares.',
    practicalEffects: [
      'Los pliegos de licitación pública para provisión de alimentos deben incluir criterios de preferencia por productos sin sello.',
      'Afecta compras para comedores escolares, comedores comunitarios subsidiados, hospitales públicos y fuerzas de seguridad.',
    ],
    examples: [],
    relatedArticles: ['ley27642-art-4'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 17'],
    keywords: ['compras del Estado', 'licitación pública', 'contrataciones', 'prioridad', 'alimentos saludables'],
    order: 17,
    segments: [
      {
        id: 'ley27642-art-17-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-17',
        articleNumber: '17',
        order: 0,
        segmentType: 'PARAGRAPH',
        text: 'El Estado nacional priorizará las contrataciones de alimentos que no cuenten con sellos de advertencia ante igual conveniencia.',
        plainExplanation: 'La condición "ante igual conveniencia" implica que el Estado no está obligado a pagar más por un producto sin sello — solo debe preferirlo si el precio y condiciones son equivalentes.',
        practicalExample: 'Si dos ofertas de galletitas tienen el mismo precio, el hospital público debe elegir la que no tenga sello de "EXCESO EN SODIO".',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-18',
    lawId: LAW_ID,
    number: '18',
    title: 'Independencia del etiquetado nutricional',
    text:
      'ARTÍCULO 18.- Disposición final. El sistema de etiquetado de advertencias dispuesto en el artículo 5° de la presente ley debe hacerse en forma separada e independiente a la declaración de ingredientes e información nutricional establecida en el Código Alimentario Argentino.',
    plainLanguageExplanation:
      'Los sellos octogonales de advertencia deben ir ADEMÁS de la tabla nutricional del Código Alimentario, no en reemplazo. Un producto debe tener tanto la tabla nutricional en el dorso como los sellos en el frente.',
    practicalEffects: [
      'No se puede argumentar que la tabla nutricional reemplaza los sellos o viceversa.',
      'Ambos sistemas coexisten y son obligatorios independientemente.',
      'Las reformas al Código Alimentario Argentino no pueden eliminar los sellos.',
    ],
    examples: [],
    relatedArticles: ['ley27642-art-5', 'ley27642-art-22'],
    jurisprudence: [],
    regulations: ['Código Alimentario Argentino'],
    keywords: ['Código Alimentario Argentino', 'tabla nutricional', 'independencia', 'etiquetado'],
    order: 18,
    segments: [
      {
        id: 'ley27642-art-18-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-18',
        articleNumber: '18',
        order: 0,
        segmentType: 'PARAGRAPH',
        text: 'El sistema de etiquetado de advertencias debe hacerse en forma separada e independiente a la declaración de ingredientes e información nutricional establecida en el Código Alimentario Argentino.',
        plainExplanation: 'Los sellos no reemplazan ninguna información nutricional existente. Son información adicional y complementaria.',
        practicalExample: 'Un paquete de galletitas debe tener: (dorso) tabla nutricional completa con ingredientes según el CAA + (frente) los sellos octogonales que correspondan.',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-19',
    lawId: LAW_ID,
    number: '19',
    title: 'Plazos de implementación — dos etapas',
    text:
      'ARTÍCULO 19.- Disposición transitoria. La presente ley entrará en vigencia a los ciento ochenta (180) días corridos de su promulgación. Para las Micro, Pequeñas y Medianas Empresas correspondientes al Tramo 1 determinado en la ley 25.300, las cooperativas en el marco de la economía popular, y los proveedores de productos del sector de la agricultura familiar, el plazo será de doce (12) meses corridos desde la promulgación de la presente ley.',
    plainLanguageExplanation:
      'Las grandes empresas tuvieron 180 días (6 meses) desde la promulgación para comenzar a usar los sellos. Las MiPyMEs Tramo 1, cooperativas y productores de agricultura familiar tuvieron 12 meses. Esto permitió que los más pequeños tuvieran más tiempo para adaptar sus envases sin costos prohibitivos.',
    practicalEffects: [
      'Para grandes empresas: vigencia desde mayo 2022 (180 días desde noviembre 2021).',
      'Para MiPyMEs Tramo 1 y cooperativas: vigencia desde noviembre 2022 (12 meses desde promulgación).',
      'Los valores de la Etapa 2 (más estrictos) entraron en vigencia 12 meses después de los de la Etapa 1 para las grandes empresas.',
    ],
    examples: [
      'Arcor (empresa grande) debió tener los sellos desde mayo 2022.',
      'Una fábrica familiar de alfajores MiPyME Tramo 1 tuvo hasta noviembre 2022.',
    ],
    relatedArticles: ['ley27642-art-6', 'ley27642-art-20', 'ley27642-art-21'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 19', 'Ley 25.300 (MiPyMes)'],
    keywords: ['plazos', 'vigencia', 'MiPyMEs', 'cooperativas', 'agricultura familiar', 'implementación', 'etapas'],
    order: 19,
    segments: [
      {
        id: 'ley27642-art-19-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-19',
        articleNumber: '19',
        order: 0,
        segmentType: 'PARAGRAPH',
        text: 'La presente ley entrará en vigencia a los 180 días corridos de su promulgación.',
        plainExplanation: 'El plazo de 180 días corridos desde el 12/11/2021 equivale aproximadamente al 10 de mayo de 2022.',
        practicalExample: 'Desde el 10 de mayo de 2022, las grandes empresas tienen la obligación de comercializar solo productos con los sellos que correspondan.',
        references: [],
      },
      {
        id: 'ley27642-art-19-s1',
        lawId: LAW_ID,
        articleId: 'ley27642-art-19',
        articleNumber: '19',
        order: 1,
        segmentType: 'PARAGRAPH',
        text: 'Para las MiPyMEs Tramo 1, cooperativas y proveedores de agricultura familiar, el plazo será de doce (12) meses corridos desde la promulgación.',
        plainExplanation: 'El plazo extendido reconoce que adaptar el packaging y reformular productos es más costoso y difícil para empresas pequeñas.',
        practicalExample: 'Una cooperativa de mermeladas artesanales tuvo hasta el 12 de noviembre de 2022 para cumplir con el etiquetado.',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-20',
    lawId: LAW_ID,
    number: '20',
    title: 'Prórroga de plazos',
    text:
      'ARTÍCULO 20.- El Poder Ejecutivo podrá disponer, en caso de que el sujeto obligado pueda justificar motivos pertinentes, una prórroga de ciento ochenta (180) días a los plazos previstos en el artículo anterior.',
    plainLanguageExplanation:
      'Si una empresa tiene razones fundadas (problemas de abastecimiento de packaging, reformulación compleja, etc.), puede pedir al Poder Ejecutivo una prórroga de 6 meses adicionales.',
    practicalEffects: [
      'La prórroga es facultativa del Poder Ejecutivo, no un derecho automático.',
      'La empresa debe justificar los motivos — no basta con pedirla sin fundamento.',
      'Se aplica sobre los plazos del Art. 19, extendiendo el período de adaptación.',
    ],
    examples: [],
    relatedArticles: ['ley27642-art-19'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 20'],
    keywords: ['prórroga', 'plazos', 'extensión', 'Poder Ejecutivo', 'justificación'],
    order: 20,
    segments: [
      {
        id: 'ley27642-art-20-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-20',
        articleNumber: '20',
        order: 0,
        segmentType: 'PARAGRAPH',
        text: 'El Poder Ejecutivo podrá disponer una prórroga de 180 días en caso de motivos pertinentes justificados por el sujeto obligado.',
        plainExplanation: 'La prórroga es una válvula de escape para situaciones excepcionales, no una habilitación general para posponer el cumplimiento.',
        practicalExample: 'Una empresa que importa envases desde China y tuvo un corte en la cadena de suministro podría pedir prórroga documentando el problema.',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-21',
    lawId: LAW_ID,
    number: '21',
    title: 'Stock anterior — productos elaborados antes de la vigencia',
    text:
      'ARTÍCULO 21.- Los alimentos y bebidas analcohólicas cuya fecha de elaboración sea anterior a la entrada en vigencia de la presente ley no se retirarán del mercado, pudiendo permanecer a la venta hasta agotar su stock.',
    plainLanguageExplanation:
      'Los productos ya fabricados antes de que la ley entrara en vigor no tienen que retirarse de las góndolas aunque no tengan los sellos. Esto evita que las empresas tengan que destruir stock existente.',
    practicalEffects: [
      'Los productos con fecha de elaboración anterior a la vigencia pueden venderse hasta agotarse.',
      'Esto generó una coexistencia transitoria en góndola de productos con y sin sellos.',
      'Una vez agotado el stock viejo, todos los productos nuevos deben cumplir la norma.',
    ],
    examples: [
      'Un supermercado con galletitas fabricadas en marzo 2022 (antes de la vigencia de mayo 2022) pudo venderlas sin sello hasta agotarlas.',
    ],
    relatedArticles: ['ley27642-art-19'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 21'],
    keywords: ['stock anterior', 'fecha de elaboración', 'vigencia', 'transitorio', 'agotamiento de stock'],
    order: 21,
    segments: [
      {
        id: 'ley27642-art-21-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-21',
        articleNumber: '21',
        order: 0,
        segmentType: 'PARAGRAPH',
        text: 'Los alimentos cuya fecha de elaboración sea anterior a la entrada en vigencia no se retirarán del mercado, pudiendo permanecer a la venta hasta agotar su stock.',
        plainExplanation: 'La norma respeta la inversión ya realizada en packaging y producción existente al momento de la entrada en vigor.',
        practicalExample: 'Una empresa que tenía 100.000 unidades de cereal en depósito al momento de la vigencia pudo venderlas sin el nuevo sello hasta terminar esa partida.',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-22',
    lawId: LAW_ID,
    number: '22',
    title: 'Reformulación del Código Alimentario Argentino',
    text:
      'ARTÍCULO 22.- Encomiéndase al Poder Ejecutivo la reforma del Código Alimentario Argentino a fin de adecuarlo a las disposiciones de la presente ley.',
    plainLanguageExplanation:
      'El Poder Ejecutivo debe actualizar el Código Alimentario Argentino (CAA) para que sea consistente con esta ley. Esto incluye incorporar los parámetros de nutrientes críticos y los requisitos de etiquetado como parte permanente del Código.',
    practicalEffects: [
      'El Decreto 151/2022 (Art. 22) encomienda al ANMAT y al Ministerio de Agricultura dictar una resolución conjunta en 90 días para incorporar los cambios al CAA.',
      'Mientras el CAA no se actualice, la ley 27.642 y su decreto reglamentario prevalecen.',
    ],
    examples: [],
    relatedArticles: ['ley27642-art-18'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 22', 'Código Alimentario Argentino'],
    keywords: ['Código Alimentario Argentino', 'reforma', 'adecuación normativa'],
    order: 22,
    segments: [
      {
        id: 'ley27642-art-22-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-22',
        articleNumber: '22',
        order: 0,
        segmentType: 'PARAGRAPH',
        text: 'Encomiéndase al Poder Ejecutivo la reforma del Código Alimentario Argentino a fin de adecuarlo a las disposiciones de la presente ley.',
        plainExplanation: 'La ley ordena su propia integración al cuerpo normativo alimentario vigente para evitar contradicciones entre el CAA y los nuevos requisitos de etiquetado.',
        practicalExample: 'Antes de la reforma, el CAA podía exigir cierta información en el frente que ahora puede estar en conflicto con el espacio necesario para los sellos octogonales.',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-23',
    lawId: LAW_ID,
    number: '23',
    title: 'Plazo de reglamentación',
    text:
      'ARTÍCULO 23.- Reglamentación. El Poder Ejecutivo debe reglamentar la presente ley dentro de los noventa (90) días de promulgada y debe dictar las normas complementarias que resulten necesarias para su aplicación.',
    plainLanguageExplanation:
      'El Congreso le dio al Poder Ejecutivo 90 días para reglamentar la ley. El Decreto 151/2022 fue dictado el 22 de marzo de 2022, dentro de ese plazo (130 días después de la promulgación del 12/11/2021 — se demoró levemente más de los 90 días pero fue aceptado).',
    practicalEffects: [
      'El Decreto 151/2022 es la reglamentación que cumple este mandato.',
      'El Poder Ejecutivo puede dictar normas complementarias adicionales (resoluciones ministeriales, disposiciones ANMAT) sin necesidad de nueva ley.',
    ],
    examples: [],
    relatedArticles: ['ley27642-art-14'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022'],
    keywords: ['reglamentación', 'plazo', '90 días', 'normas complementarias'],
    order: 23,
    segments: [
      {
        id: 'ley27642-art-23-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-23',
        articleNumber: '23',
        order: 0,
        segmentType: 'PARAGRAPH',
        text: 'El Poder Ejecutivo debe reglamentar la presente ley dentro de los noventa (90) días de promulgada.',
        plainExplanation: 'El Decreto 151/2022 fue el instrumento reglamentario. Contiene las definiciones técnicas, los valores concretos de nutrientes y las especificaciones de diseño de los sellos.',
        practicalExample: 'Sin la reglamentación, la ley no podría aplicarse porque no define los valores exactos de los nutrientes que activan la obligación de colocar el sello.',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-24',
    lawId: LAW_ID,
    number: '24',
    title: 'Cláusula de comunicación al Poder Ejecutivo',
    text: 'ARTÍCULO 24.- Comuníquese al Poder Ejecutivo nacional.',
    plainLanguageExplanation:
      'Es la cláusula formal de cierre de toda ley sancionada por el Congreso, indicando que la ley se comunica al Poder Ejecutivo para su promulgación y publicación en el Boletín Oficial.',
    practicalEffects: [],
    examples: [],
    relatedArticles: [],
    jurisprudence: [],
    regulations: [],
    keywords: ['comunicación', 'promulgación', 'Poder Ejecutivo'],
    order: 24,
    segments: [
      {
        id: 'ley27642-art-24-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-24',
        articleNumber: '24',
        order: 0,
        segmentType: 'PARAGRAPH',
        text: 'Comuníquese al Poder Ejecutivo nacional.',
        plainExplanation: 'Cláusula de cierre protocolar de toda ley argentina, sin contenido sustancial.',
        practicalExample: null,
        references: [],
      },
    ],
    amendments: [],
  },
];
