import type { Article } from '../../common/types/law.types';

const LAW_ID = 'ley-27642';

// ─── SELLOS OCTOGONALES — compartidos por Arts. 4 y 5 ────────────────────────
const SIFEGA_PAGE = 'https://www.argentina.gob.ar/anmat/regulados/alimentos/sifega/sistema-grafico';
const ANMAT_FILES = 'https://www.argentina.gob.ar/sites/default/files';

const SELLOS_ADVERTENCIA = [
  {
    id: 'sello-exceso-azucares',
    type: 'sello-advertencia' as const,
    title: 'Exceso en Azúcares',
    description:
      'Se aplica cuando el contenido de azúcares añadidos supera los valores máximos del Perfil de Nutrientes de la OPS. Primera etapa: ≥10g/100ml (bebidas) o ≥5g/100g (sólidos).',
    sourceUrl: `${ANMAT_FILES}/sellos_sueltos_exceso_en_azucares.png`,
    sourcePage: SIFEGA_PAGE,
    data: { nutriente: 'azucares' },
  },
  {
    id: 'sello-exceso-grasas-saturadas',
    type: 'sello-advertencia' as const,
    title: 'Exceso en Grasas Saturadas',
    description:
      'Se aplica cuando las grasas saturadas superan los valores máximos. Primera etapa: ≥4g/100ml (bebidas) o ≥4g/100g (sólidos).',
    sourceUrl: `${ANMAT_FILES}/sellos_sueltos_exceso_en_grasas_saturadas.png`,
    sourcePage: SIFEGA_PAGE,
    data: { nutriente: 'grasas-saturadas' },
  },
  {
    id: 'sello-exceso-grasas-totales',
    type: 'sello-advertencia' as const,
    title: 'Exceso en Grasas Totales',
    description:
      'Se aplica cuando las grasas totales superan los valores máximos. Primera etapa: ≥3g/100ml (bebidas) o ≥10g/100g (sólidos).',
    sourceUrl: `${ANMAT_FILES}/sellos_sueltos_exceso_en_grasas_totales.png`,
    sourcePage: SIFEGA_PAGE,
    data: { nutriente: 'grasas-totales' },
  },
  {
    id: 'sello-exceso-sodio',
    type: 'sello-advertencia' as const,
    title: 'Exceso en Sodio',
    description:
      'Se aplica cuando el sodio supera los valores máximos. Primera etapa: ≥100mg/100ml (bebidas) o ≥400mg/100g (sólidos).',
    sourceUrl: `${ANMAT_FILES}/sellos_sueltos_exceso_en_sodio.png`,
    sourcePage: SIFEGA_PAGE,
    data: { nutriente: 'sodio' },
  },
  {
    id: 'sello-exceso-calorias',
    type: 'sello-advertencia' as const,
    title: 'Exceso en Calorías',
    description:
      'Se aplica cuando el valor energético supera los límites establecidos por la autoridad de aplicación.',
    sourceUrl: `${ANMAT_FILES}/sellos_sueltos_exceso_en_calorias.png`,
    sourcePage: SIFEGA_PAGE,
    data: { nutriente: 'calorias' },
  },
  {
    id: 'leyenda-edulcorantes',
    type: 'sello-advertencia' as const,
    title: 'Contiene Edulcorantes',
    description:
      'Leyenda precautoria obligatoria para alimentos que contengan edulcorantes artificiales, indicando que no es recomendable en niños.',
    sourceUrl: `${ANMAT_FILES}/sellos_sueltos_leyenda_edulcorantes.png`,
    sourcePage: SIFEGA_PAGE,
    data: { nutriente: 'edulcorantes', esLeyenda: true },
  },
  {
    id: 'leyenda-cafeina',
    type: 'sello-advertencia' as const,
    title: 'Contiene Cafeína',
    description:
      'Leyenda precautoria obligatoria para alimentos que contengan cafeína añadida, indicando que no es recomendable en niños, adolescentes ni mujeres embarazadas.',
    sourceUrl: `${ANMAT_FILES}/sellos_sueltos_leyenda_cafeina.png`,
    sourcePage: SIFEGA_PAGE,
    data: { nutriente: 'cafeina', esLeyenda: true },
  },
];

// ─── CAPÍTULO I — DISPOSICIONES GENERALES ────────────────────────────────────

export const ARTICLES_CAP1: Article[] = [
  {
    id: 'ley27642-art-1',
    lawId: LAW_ID,
    number: '1',
    title: 'Objeto de la ley',
    originalText:
      'ARTÍCULO 1°- Objeto. La presente ley tiene por objeto:\na) Garantizar el derecho a la salud y a una alimentación adecuada;\nb) Brindar información nutricional sobre los alimentos y bebidas analcohólicas envasados, a fin de promover hábitos de alimentación saludable;\nc) Advertir sobre el exceso de azúcares, sodio, grasas saturadas, grasas totales y calorías en los productos, mediante el uso de un sistema de advertencia frontal;\nd) Prevenir el sobrepeso, la obesidad y las enfermedades crónicas no transmisibles vinculadas a la alimentación.',
    currentText:
      'ARTÍCULO 1°- Objeto. La presente ley tiene por objeto:\na) Garantizar el derecho a la salud y a una alimentación adecuada;\nb) Brindar información nutricional sobre los alimentos y bebidas analcohólicas envasados, a fin de promover hábitos de alimentación saludable;\nc) Advertir sobre el exceso de azúcares, sodio, grasas saturadas, grasas totales y calorías en los productos, mediante el uso de un sistema de advertencia frontal;\nd) Prevenir el sobrepeso, la obesidad y las enfermedades crónicas no transmisibles vinculadas a la alimentación.',
    plainLanguageExplanation:
      'La ley busca que los consumidores tengan información clara y visible sobre qué alimentos tienen altos niveles de nutrientes que, en exceso, son perjudiciales para la salud. Su objetivo principal es reducir el sobrepeso, la obesidad y enfermedades como la diabetes tipo 2, hipertensión y enfermedades cardiovasculares.',
    practicalEffects: [
      'Los fabricantes deben analizar el perfil nutricional de sus productos y colocar sellos octogonales si superan los límites.',
      'Los consumidores pueden identificar de inmediato en la góndola si un producto tiene exceso de azúcares, sodio, grasas o calorías.',
      'El Estado asume la obligación de promover hábitos de alimentación saludable y fiscalizar el cumplimiento.',
      'Las escuelas y espacios públicos deben restringir el acceso a productos con sellos de advertencia.',
    ],
    examples: [],
    relatedArticles: ['ley27642-art-4', 'ley27642-art-5', 'ley27642-art-6'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022'],
    keywords: ['objeto', 'alimentación saludable', 'derecho a la salud', 'nutrientes críticos', 'obesidad', 'enfermedades crónicas'],
    order: 1,
    segments: [
      {
        id: 'ley27642-art-1-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-1',
        articleNumber: '1',
        order: 0,
        segmentType: 'PARAGRAPH',
        originalText: 'La presente ley tiene por objeto garantizar el derecho a la salud y a una alimentación adecuada.',
        plainExplanation: 'La ley es una norma de salud pública que reconoce la alimentación adecuada como un derecho fundamental.',
        practicalExample: 'Un consumidor tiene derecho a recibir información veraz y accesible sobre el contenido nutricional de lo que compra en el supermercado.',
        references: [],
      },
      {
        id: 'ley27642-art-1-s1',
        lawId: LAW_ID,
        articleId: 'ley27642-art-1',
        articleNumber: '1',
        order: 1,
        segmentType: 'PARAGRAPH',
        originalText: 'Advertir sobre el exceso de azúcares, sodio, grasas saturadas, grasas totales y calorías en los productos, mediante el uso de un sistema de advertencia frontal.',
        plainExplanation: 'El sistema de advertencia frontal son los sellos octogonales negros que deben aparecer en la cara principal del envase, visibles de inmediato al tomar el producto.',
        practicalExample: 'Una gaseosa con 11g de azúcar por cada 100ml debe llevar el sello "EXCESO EN AZÚCARES" en la parte delantera de la botella, no en la etiqueta posterior.',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-2',
    lawId: LAW_ID,
    number: '2',
    title: 'Definiciones',
    originalText:
      'ARTÍCULO 2°- Definiciones. A los efectos de la presente ley se entiende por:\na) Alimentación saludable: aquella que satisface las necesidades nutricionales de los individuos, teniendo en cuenta su edad, sexo, actividad física y estado de salud;\nb) Nutrientes críticos: las grasas saturadas, las grasas totales, los azúcares libres y el sodio;\nc) Rotulado nutricional: toda descripción destinada a informar al consumidor sobre las propiedades nutricionales de un alimento;\nd) Sello de advertencia: símbolo de forma octogonal de color negro con letras de color blanco que advierten sobre el exceso en el contenido de nutrientes críticos o la presencia de sustancias cuyo consumo en exceso es perjudicial para la salud;\ne) Alimento envasado: todo alimento que se presenta envuelto, encerrado o contenido en un envase listo para ofrecerse al consumidor;\nf) Claim: toda mención, representación, imagen o señal que en la publicidad o en el etiquetado afirme o sugiera que un producto posee una o más propiedades especiales.',
    currentText:
      'ARTÍCULO 2°- Definiciones. A los efectos de la presente ley se entiende por:\na) Alimentación saludable: aquella que satisface las necesidades nutricionales de los individuos, teniendo en cuenta su edad, sexo, actividad física y estado de salud;\nb) Nutrientes críticos: las grasas saturadas, las grasas totales, los azúcares libres y el sodio;\nc) Rotulado nutricional: toda descripción destinada a informar al consumidor sobre las propiedades nutricionales de un alimento;\nd) Sello de advertencia: símbolo de forma octogonal de color negro con letras de color blanco que advierten sobre el exceso en el contenido de nutrientes críticos o la presencia de sustancias cuyo consumo en exceso es perjudicial para la salud;\ne) Alimento envasado: todo alimento que se presenta envuelto, encerrado o contenido en un envase listo para ofrecerse al consumidor;\nf) Claim: toda mención, representación, imagen o señal que en la publicidad o en el etiquetado afirme o sugiera que un producto posee una o más propiedades especiales.',
    plainLanguageExplanation:
      'El artículo define los términos clave para entender la ley. Los "nutrientes críticos" son los que en exceso causan enfermedades: grasas saturadas, grasas totales, azúcares y sodio. El "sello de advertencia" es el octágono negro con letras blancas que todos habremos visto en paquetes de alimentos. Un "claim" es cualquier promesa de beneficio nutricional en el packaging (tipo "rico en fibra" o "bajo en grasas").',
    practicalEffects: [
      'Las definiciones son vinculantes: cualquier norma o contrato que mencione estos términos debe interpretarse según esta ley.',
      'El término "claim" abarca tanto texto como imágenes — un personaje deportista en un envase puede considerarse un claim implícito.',
      'Los azúcares "libres" (que incluye azúcares añadidos y naturalmente presentes en jugos y miel) son más amplios que solo el azúcar blanca.',
    ],
    examples: [],
    relatedArticles: ['ley27642-art-4', 'ley27642-art-9'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 2'],
    keywords: ['definiciones', 'nutrientes críticos', 'sello de advertencia', 'alimento envasado', 'claim', 'rotulado nutricional', 'azúcares libres'],
    order: 2,
    segments: [
      {
        id: 'ley27642-art-2-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-2',
        articleNumber: '2',
        order: 0,
        segmentType: 'PARAGRAPH',
        originalText: 'Nutrientes críticos: las grasas saturadas, las grasas totales, los azúcares libres y el sodio.',
        plainExplanation: 'Son los cuatro nutrientes cuyo exceso está asociado a obesidad, diabetes, hipertensión y enfermedades cardiovasculares, según la evidencia científica de la OPS/OMS.',
        practicalExample: 'Una galletita con 18g de grasas totales por 100g tiene exceso en grasas totales. Una sopa instantánea con 900mg de sodio por 100g tiene exceso en sodio.',
        references: [],
      },
      {
        id: 'ley27642-art-2-s1',
        lawId: LAW_ID,
        articleId: 'ley27642-art-2',
        articleNumber: '2',
        order: 1,
        segmentType: 'PARAGRAPH',
        originalText: 'Claim: toda mención, representación, imagen o señal en la publicidad o en el etiquetado que afirme o sugiera que un producto posee propiedades especiales.',
        plainExplanation: 'Un claim puede ser explícito ("0% azúcar") o implícito (una imagen de frutas frescas en un producto ultra-procesado). Si el producto tiene sellos, están prohibidos.',
        practicalExample: 'Una barra de cereal con sello de "EXCESO EN AZÚCARES" no puede tener en su envase la leyenda "fuente de energía natural" ni la imagen de un deportista.',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-3',
    lawId: LAW_ID,
    number: '3',
    title: 'Sujetos obligados',
    originalText:
      'ARTÍCULO 3°- Sujetos obligados. Las disposiciones de la presente ley son aplicables a todas las personas, humanas o jurídicas, que fabriquen, produzcan, elaboren, fraccionen, envasen, transporten, almacenen, distribuyan, importen, exporten, comercialicen o pongan a disposición de los consumidores en el país alimentos envasados y bebidas analcohólicas, cualquiera sea su procedencia o lugar de elaboración.',
    currentText:
      'ARTÍCULO 3°- Sujetos obligados. Las disposiciones de la presente ley son aplicables a todas las personas, humanas o jurídicas, que fabriquen, produzcan, elaboren, fraccionen, envasen, transporten, almacenen, distribuyan, importen, exporten, comercialicen o pongan a disposición de los consumidores en el país alimentos envasados y bebidas analcohólicas, cualquiera sea su procedencia o lugar de elaboración.',
    plainLanguageExplanation:
      'La ley aplica a toda empresa o persona que de alguna manera ponga un alimento envasado en manos del consumidor argentino, sin importar si es nacional o importado. Desde el fabricante de la fábrica hasta el kiosco que lo revende.',
    practicalEffects: [
      'Los importadores tienen la misma obligación que los fabricantes nacionales: deben verificar el perfil nutricional y colocar sellos si corresponde.',
      'Los transportistas y distribuidores no pueden circular con productos que deberían tener sellos y no los tienen.',
      'Las plataformas de e-commerce que venden alimentos envasados también están alcanzadas por la norma.',
      'No hay excepción por ser empresa pequeña en términos de obligación de etiquetar, aunque sí hay plazos diferenciados para MiPyMEs (Art. 19).',
    ],
    examples: [],
    relatedArticles: ['ley27642-art-19', 'ley27642-art-15'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 3'],
    keywords: ['sujetos obligados', 'fabricantes', 'importadores', 'distribuidores', 'comerciantes', 'responsabilidad'],
    order: 3,
    segments: [
      {
        id: 'ley27642-art-3-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-3',
        articleNumber: '3',
        order: 0,
        segmentType: 'PARAGRAPH',
        originalText:
          'Las disposiciones de la presente ley son aplicables a todas las personas, humanas o jurídicas, que fabriquen, produzcan, elaboren, fraccionen, envasen, transporten, almacenen, distribuyan, importen, exporten, comercialicen o pongan a disposición de los consumidores en el país alimentos envasados y bebidas analcohólicas.',
        plainExplanation:
          'La cadena de responsabilidad es total: abarca desde quien fabrica hasta quien vende. Cualquier eslabón que no cumpla puede ser sancionado.',
        practicalExample:
          'Un supermercado que recibe una partida de galletitas importadas sin los sellos correctos está obligado a no poner esos productos a la venta.',
        references: [],
      },
    ],
    amendments: [],
  },
];

// ─── CAPÍTULO II — ALIMENTOS ENVASADOS CON EXCESO DE NUTRIENTES ──────────────

export const ARTICLES_CAP2: Article[] = [
  {
    id: 'ley27642-art-4',
    lawId: LAW_ID,
    number: '4',
    title: 'Sello de advertencia en la cara principal',
    originalText:
      'ARTÍCULO 4°- Sello en la cara principal. Los alimentos envasados y las bebidas analcohólicas que contengan cantidades iguales o superiores a los valores establecidos en el artículo 6° de la presente ley de azúcares añadidos, grasas saturadas, grasas totales, sodio y/o energía, deben llevar en la cara principal los sellos de advertencia que correspondan. Asimismo, deben contener leyendas precautorias cuando contengan edulcorantes y/o cafeína.',
    currentText:
      'ARTÍCULO 4°- Sello en la cara principal. Los alimentos envasados y las bebidas analcohólicas que contengan cantidades iguales o superiores a los valores establecidos en el artículo 6° de la presente ley de azúcares añadidos, grasas saturadas, grasas totales, sodio y/o energía, deben llevar en la cara principal los sellos de advertencia que correspondan. Asimismo, deben contener leyendas precautorias cuando contengan edulcorantes y/o cafeína.',
    plainLanguageExplanation:
      'Si un alimento supera cualquiera de los límites de nutrientes críticos, debe llevar el sello correspondiente visible en el frente del envase. Un producto puede tener más de un sello al mismo tiempo. Además, si contiene edulcorantes o cafeína, debe incluir leyendas de advertencia aunque no supere otros límites.',
    practicalEffects: [
      'Los sellos van en la cara principal del envase, no en la contraetiqueta ni en la base.',
      'Un producto puede acumular múltiples sellos (ej: "EXCESO EN AZÚCARES" + "EXCESO EN SODIO" + "CONTIENE EDULCORANTES").',
      'La mera presencia de edulcorantes o cafeína activa la obligación de leyenda, sin importar la cantidad.',
      'El umbral es "iguales o superiores" — alcanzar exactamente el límite ya obliga a poner el sello.',
    ],
    examples: [
      'Una gaseosa dietética con edulcorantes debe llevar la leyenda "CONTIENE EDULCORANTES" aunque no tenga azúcares añadidos.',
      'Un snack salado que supere el límite de sodio Y de grasas totales lleva ambos sellos en el frente del envase.',
    ],
    relatedArticles: ['ley27642-art-5', 'ley27642-art-6', 'ley27642-art-7', 'ley27642-art-9'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 4'],
    keywords: ['sello de advertencia', 'cara principal', 'azúcares añadidos', 'grasas saturadas', 'sodio', 'edulcorantes', 'cafeína', 'leyendas precautorias'],
    order: 4,
    visualContent: SELLOS_ADVERTENCIA,
    segments: [
      {
        id: 'ley27642-art-4-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-4',
        articleNumber: '4',
        order: 0,
        segmentType: 'PARAGRAPH',
        originalText:
          'Los alimentos envasados que contengan cantidades iguales o superiores a los valores establecidos en el artículo 6° de azúcares añadidos, grasas saturadas, grasas totales, sodio y/o energía, deben llevar en la cara principal los sellos de advertencia que correspondan.',
        plainExplanation:
          'Los sellos son obligatorios una vez que se supera el umbral; el fabricante no tiene opción de no colocarlos.',
        practicalExample:
          'Un yogur bebible con 12g de azúcar por 100ml supera el límite. Debe llevar "EXCESO EN AZÚCARES" en la parte delantera de su envase.',
        references: [],
      },
      {
        id: 'ley27642-art-4-s1',
        lawId: LAW_ID,
        articleId: 'ley27642-art-4',
        articleNumber: '4',
        order: 1,
        segmentType: 'PARAGRAPH',
        originalText:
          'Asimismo, deben contener leyendas precautorias cuando contengan edulcorantes y/o cafeína.',
        plainExplanation:
          'Las leyendas precautorias de edulcorantes y cafeína son independientes de los sellos de exceso: se activan por la simple presencia de esas sustancias.',
        practicalExample:
          'Una bebida energizante puede no tener exceso en azúcares (si usa edulcorante) pero igual debe llevar "CONTIENE EDULCORANTES" y "CONTIENE CAFEÍNA".',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-5',
    lawId: LAW_ID,
    number: '5',
    title: 'Características del sello de advertencia',
    originalText:
      'ARTÍCULO 5°- Características del sello. Los sellos de advertencia y las leyendas precautorias deberán:\na) Ser de forma octogonal, de color negro, con borde y letras de color blanco;\nb) Contener la leyenda correspondiente según el nutriente en exceso;\nc) Tener un tamaño mínimo del cinco por ciento (5%) de la cara principal del envase;\nd) No estar cubiertos ni ocultados por elementos del envase.',
    currentText:
      'ARTÍCULO 5°- Características del sello. Los sellos de advertencia y las leyendas precautorias deberán:\na) Ser de forma octogonal, de color negro, con borde y letras de color blanco;\nb) Contener la leyenda correspondiente según el nutriente en exceso;\nc) Tener un tamaño mínimo del cinco por ciento (5%) de la cara principal del envase;\nd) No estar cubiertos ni ocultados por elementos del envase.',
    plainLanguageExplanation:
      'El artículo define la forma visual exacta del sello: octágono negro con letras blancas. El tamaño mínimo del 5% de la cara principal asegura que sea visible. Es ilegal cubrir el sello con etiquetas de precio, stickers promocionales o cualquier otro elemento.',
    practicalEffects: [
      'Los sellos deben ser visibles, legibles y no pueden estar parcialmente cubiertos por adhesivos, sellos de precio u otros envases.',
      'El 5% de la cara principal en un paquete estándar de galletitas equivale a un sello de aprox. 2,5cm × 2,5cm.',
      'Las especificaciones técnicas exactas (tipografía, proporciones) están en el Anexo II del Decreto 151/2022.',
      'En supermercados, los productos no pueden apilarse de modo que cubran los sellos de los que están detrás.',
    ],
    examples: [
      'Un kiosco no puede pegar el precio sobre el sello de advertencia.',
      'Una oferta especial no puede colocarse con un sticker que tape el sello.',
    ],
    relatedArticles: ['ley27642-art-4', 'ley27642-art-6'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 5 y Anexo II'],
    keywords: ['octágono', 'sello negro', 'letras blancas', 'tamaño mínimo', 'cara principal', 'especificaciones técnicas'],
    order: 5,
    segments: [
      {
        id: 'ley27642-art-5-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-5',
        articleNumber: '5',
        order: 0,
        segmentType: 'PARAGRAPH',
        originalText: 'Ser de forma octogonal, de color negro, con borde y letras de color blanco.',
        plainExplanation:
          'El octágono negro es el formato estandarizado por la OPS/OMS y ya adoptado en Chile, Perú, México y Uruguay. Permite al consumidor reconocer el sistema de advertencia sin importar el idioma.',
        practicalExample:
          'Un consumidor argentino que viaje a Chile reconocerá los mismos sellos octogonales negros en los supermercados chilenos.',
        references: [],
      },
      {
        id: 'ley27642-art-5-s1',
        lawId: LAW_ID,
        articleId: 'ley27642-art-5',
        articleNumber: '5',
        order: 1,
        segmentType: 'PARAGRAPH',
        originalText: 'Tener un tamaño mínimo del cinco por ciento (5%) de la cara principal del envase. No estar cubiertos ni ocultados por elementos del envase.',
        plainExplanation:
          'El tamaño mínimo garantiza visibilidad incluso en envases pequeños. La prohibición de ocultarlos cierra la posibilidad de cumplir formalmente con la ley pero obstaculizar la información.',
        practicalExample:
          'Un fabricante que pone el sello en el envase pero luego aplica una etiqueta promocional encima está violando la ley aunque técnicamente "tiene el sello".',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-6',
    lawId: LAW_ID,
    number: '6',
    title: 'Valores máximos — Perfil de Nutrientes OPS',
    originalText:
      'ARTÍCULO 6°- Valores máximos. Los valores máximos de contenido de nutrientes críticos a partir de los cuales corresponde incluir el sello de advertencia se establecen conforme al Perfil de Nutrientes de la Organización Panamericana de la Salud (OPS). La autoridad de aplicación fijará los parámetros energéticos y establecerá un cronograma de cumplimiento progresivo de un máximo de dos (2) años desde la entrada en vigencia de la presente ley.',
    currentText:
      'ARTÍCULO 6°- Valores máximos. Los valores máximos de contenido de nutrientes críticos a partir de los cuales corresponde incluir el sello de advertencia se establecen conforme al Perfil de Nutrientes de la Organización Panamericana de la Salud (OPS). La autoridad de aplicación fijará los parámetros energéticos y establecerá un cronograma de cumplimiento progresivo de un máximo de dos (2) años desde la entrada en vigencia de la presente ley.',
    plainLanguageExplanation:
      'Los límites numéricos que disparan la obligación de usar el sello no están en la ley sino en el estándar de la OPS, que Argentina adoptó. El Decreto 151/2022 los fija en dos etapas: la primera con umbrales más altos, la segunda más estricta.',
    practicalEffects: [
      'Los límites concretos de la Etapa 1: Azúcares añadidos ≥10g/100ml o ≥5g/100g; Grasas saturadas ≥4g/100ml o ≥4g/100g; Grasas totales ≥3g/100ml o ≥10g/100g; Sodio ≥100mg/100ml o ≥400mg/100g.',
      'Los límites de la Etapa 2 son más restrictivos (aprox. 30% menores que la Etapa 1).',
      'La autoridad puede actualizar los parámetros energéticos por resolución sin necesidad de modificar la ley.',
      'Los fabricantes deben hacer análisis de laboratorio periódicos para verificar que sus productos siguen dentro de los límites.',
    ],
    examples: [
      'Una bebida con 9g de azúcar por 100ml no requiere sello en la Etapa 1, pero sí en la Etapa 2 si el límite baja a 6g.',
      'Un aceite de oliva con 14g de grasas totales por 100ml no requiere sello porque está exento por Art. 7.',
    ],
    relatedArticles: ['ley27642-art-4', 'ley27642-art-7', 'ley27642-art-19'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 6 y Tabla 1'],
    keywords: ['valores máximos', 'OPS', 'perfil de nutrientes', 'azúcares', 'grasas saturadas', 'sodio', 'etapas', 'cronograma'],
    order: 6,
    segments: [
      {
        id: 'ley27642-art-6-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-6',
        articleNumber: '6',
        order: 0,
        segmentType: 'PARAGRAPH',
        originalText:
          'Los valores máximos de contenido de nutrientes críticos se establecen conforme al Perfil de Nutrientes de la OPS. La autoridad de aplicación establecerá un cronograma de cumplimiento progresivo de un máximo de dos (2) años.',
        plainExplanation:
          'El cronograma progresivo da tiempo a los fabricantes para reformular sus productos o ajustar etiquetas. Primero entran en vigor los umbrales más permisivos (Etapa 1), luego los más estrictos (Etapa 2).',
        practicalExample:
          'Una empresa tuvo hasta 9 meses (15 para MiPyMEs) para cumplir la Etapa 1 desde la vigencia. Luego tiene otros 9 meses adicionales para adaptarse a los valores más estrictos de la Etapa 2.',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-7',
    lawId: LAW_ID,
    number: '7',
    title: 'Excepciones a la obligación de sello',
    originalText:
      'ARTÍCULO 7°- Excepción. Quedan exceptuados de la obligación de incluir los sellos de advertencia el azúcar común, los aceites vegetales, los frutos secos y la sal común de mesa, en tanto no sean mezclas o preparaciones que incluyan otros ingredientes que modifiquen su perfil nutricional.',
    currentText:
      'ARTÍCULO 7°- Excepción. Quedan exceptuados de la obligación de incluir los sellos de advertencia el azúcar común, los aceites vegetales, los frutos secos y la sal común de mesa, en tanto no sean mezclas o preparaciones que incluyan otros ingredientes que modifiquen su perfil nutricional.',
    plainLanguageExplanation:
      'Ciertos alimentos que por su naturaleza tienen altos niveles de nutrientes críticos quedan eximidos de los sellos, porque el consumidor ya sabe que el azúcar tiene azúcar o la sal tiene sodio. Pero si esos ingredientes se mezclan con otros (tipo "maní con miel y sal"), la excepción no aplica.',
    practicalEffects: [
      'El azúcar refinada, morena o impalpable no lleva sello.',
      'Los aceites vegetales (maíz, girasol, oliva) no llevan sello aunque tengan alto contenido graso.',
      'Los frutos secos naturales o tostados sin sal no llevan sello.',
      'La excepción desaparece en mezclas: un "mix de frutas secas con chips de chocolate" sí está sujeto a los sellos.',
    ],
    examples: [
      'Una bolsa de nueces naturales → sin sello.',
      'Una bolsa de nueces con chocolate y sal → sujeta a análisis y posible sello.',
      'Aceite de oliva puro → sin sello.',
      'Aderezo a base de aceite con especias y sal → sujeto a análisis.',
    ],
    relatedArticles: ['ley27642-art-4', 'ley27642-art-6'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 7'],
    keywords: ['excepciones', 'azúcar', 'aceites vegetales', 'frutos secos', 'sal', 'alimentos simples'],
    order: 7,
    segments: [
      {
        id: 'ley27642-art-7-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-7',
        articleNumber: '7',
        order: 0,
        segmentType: 'PARAGRAPH',
        originalText:
          'Quedan exceptuados el azúcar común, los aceites vegetales, los frutos secos y la sal común de mesa, en tanto no sean mezclas o preparaciones que incluyan otros ingredientes.',
        plainExplanation:
          'La excepción se basa en que estos productos son ingredientes culinarios básicos cuya composición nutricional es obvia y conocida por el consumidor promedio.',
        practicalExample:
          'Un aceite de girasol puro tiene 100% de grasa, pero no lleva sello. Sin embargo, una margarina (que es una mezcla procesada de aceites y aditivos) sí está sujeta a la norma.',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-8',
    lawId: LAW_ID,
    number: '8',
    title: 'Declaración obligatoria de azúcares',
    originalText:
      'ARTÍCULO 8°- Declaración obligatoria de azúcares. Los alimentos envasados y las bebidas analcohólicas deben declarar el contenido de azúcares totales y de azúcares añadidos en el rotulado nutricional. Esta declaración deberá realizarse inmediatamente después de la declaración de carbohidratos.',
    currentText:
      'ARTÍCULO 8°- Declaración obligatoria de azúcares. Los alimentos envasados y las bebidas analcohólicas deben declarar el contenido de azúcares totales y de azúcares añadidos en el rotulado nutricional. Esta declaración deberá realizarse inmediatamente después de la declaración de carbohidratos.',
    plainLanguageExplanation:
      'Además de los sellos en la cara principal, la tabla nutricional del dorso del envase debe ahora mostrar dos filas: "azúcares totales" (todos los azúcares, incluidos los naturales de la fruta) y "azúcares añadidos" (los que se agregaron en el proceso de producción). Antes la mayoría de las tablas solo decía "azúcares".',
    practicalEffects: [
      'Todos los fabricantes deben actualizar sus tablas nutricionales para discriminar azúcares totales y añadidos.',
      'Los consumidores pueden comparar cuánto azúcar viene naturalmente del alimento vs. cuánto le añadió el fabricante.',
      'Un jugo de naranja 100% puede tener altos azúcares totales pero cero azúcares añadidos — la distinción es relevante.',
    ],
    examples: [
      'Una mermelada dirá: "Carbohidratos 55g; Azúcares totales 52g; Azúcares añadidos 40g".',
      'Un yogur natural dirá: "Carbohidratos 12g; Azúcares totales 10g (lactosa natural); Azúcares añadidos 0g".',
    ],
    relatedArticles: ['ley27642-art-4', 'ley27642-art-6'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 8'],
    keywords: ['azúcares totales', 'azúcares añadidos', 'rotulado nutricional', 'tabla nutricional', 'carbohidratos', 'declaración obligatoria'],
    order: 8,
    segments: [
      {
        id: 'ley27642-art-8-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-8',
        articleNumber: '8',
        order: 0,
        segmentType: 'PARAGRAPH',
        originalText:
          'Los alimentos envasados deben declarar el contenido de azúcares totales y de azúcares añadidos en el rotulado nutricional, inmediatamente después de la declaración de carbohidratos.',
        plainExplanation:
          'La ubicación específica "inmediatamente después de carbohidratos" hace que la información sea fácil de encontrar y difícil de ocultar en la tabla nutricional.',
        practicalExample:
          'Una barra de cereal cuya tabla decía "Carbohidratos 28g; Azúcares 12g" ahora debe decir "Carbohidratos 28g; Azúcares totales 12g; de los cuales Azúcares añadidos 10g".',
        references: [],
      },
    ],
    amendments: [],
  },
  {
    id: 'ley27642-art-9',
    lawId: LAW_ID,
    number: '9',
    title: 'Prohibiciones en envases con sello',
    originalText:
      'ARTÍCULO 9°- Prohibiciones en envases. Los alimentos envasados y las bebidas analcohólicas que deban incluir los sellos de advertencia no podrán:\na) Incluir en sus envases declaraciones nutricionales, de salud, o de propiedades beneficiosas para la salud;\nb) Presentar logos o avales de instituciones o asociaciones científicas o de profesionales de la salud;\nc) Incluir personajes de dibujos animados, animales, deportistas, personajes de ficción o personajes reconocidos que resulten atractivos para menores de dieciséis (16) años;\nd) Incluir juguetes, regalos, concursos, sorteos, aplicaciones y cualquier otro elemento o incentivo que estimule la compra por parte del público infantil.',
    currentText:
      'ARTÍCULO 9°- Prohibiciones en envases. Los alimentos envasados y las bebidas analcohólicas que deban incluir los sellos de advertencia no podrán:\na) Incluir en sus envases declaraciones nutricionales, de salud, o de propiedades beneficiosas para la salud;\nb) Presentar logos o avales de instituciones o asociaciones científicas o de profesionales de la salud;\nc) Incluir personajes de dibujos animados, animales, deportistas, personajes de ficción o personajes reconocidos que resulten atractivos para menores de dieciséis (16) años;\nd) Incluir juguetes, regalos, concursos, sorteos, aplicaciones y cualquier otro elemento o incentivo que estimule la compra por parte del público infantil.',
    plainLanguageExplanation:
      'Los productos con sellos no pueden usar estrategias de marketing que confundan al consumidor o atraigan a menores. Queda prohibido poner el logo de la "Asociación Argentina de Cardiología" en una galletita con exceso en grasas, o usar personajes de películas para vender cereales azucarados a niños.',
    practicalEffects: [
      'Las empresas que usaban avales de sociedades médicas en productos con alto contenido de azúcar o sal deben eliminarlos.',
      'Los packs de cereales con personajes infantiles famosos ya no pueden venderse si esos cereales tienen sellos.',
      'Los huevos de pascua y productos con juguetes incluidos en el envase quedan sujetos a esta restricción si el alimento tiene sellos.',
      'Las promociones de "juntá las tapitas" o "descargá el juego" en envases de productos con sellos están prohibidas.',
    ],
    examples: [
      'Un cereal para niños con "EXCESO EN AZÚCARES" no puede tener en el envase al personaje de una película.',
      'Una mayonesa con sello de "EXCESO EN GRASAS TOTALES" no puede mostrar el logo de una asociación de nutricionistas.',
    ],
    relatedArticles: ['ley27642-art-4', 'ley27642-art-10'],
    jurisprudence: [],
    regulations: ['Decreto 151/2022 Art. 9'],
    keywords: ['prohibiciones', 'personajes infantiles', 'avales científicos', 'juguetes', 'sorteos', 'marketing infantil', 'claims nutricionales'],
    order: 9,
    segments: [
      {
        id: 'ley27642-art-9-s0',
        lawId: LAW_ID,
        articleId: 'ley27642-art-9',
        articleNumber: '9',
        order: 0,
        segmentType: 'PARAGRAPH',
        originalText:
          'Los alimentos que deban incluir los sellos de advertencia no podrán incluir declaraciones nutricionales, de salud, o de propiedades beneficiosas para la salud.',
        plainExplanation:
          'La prohibición de claims positivos evita la paradoja de un alimento con "EXCESO EN AZÚCARES" que al mismo tiempo declara ser "fuente de energía natural".',
        practicalExample: 'Una galletita con sello no puede decir "libre de colesterol" aunque sea técnicamente cierto.',
        references: [],
      },
      {
        id: 'ley27642-art-9-s1',
        lawId: LAW_ID,
        articleId: 'ley27642-art-9',
        articleNumber: '9',
        order: 1,
        segmentType: 'PARAGRAPH',
        originalText:
          'No podrán incluir personajes de dibujos animados, animales, deportistas, personajes de ficción o personajes reconocidos que resulten atractivos para menores de dieciséis (16) años.',
        plainExplanation:
          'El umbral de 16 años es amplio y deliberado: protege a adolescentes además de niños pequeños. Los personajes "de culto" que también atraen a adolescentes están incluidos.',
        practicalExample:
          'Un chocolate con sello no puede tener en su envase ni a un personaje de anime, ni a un youtuber famoso entre adolescentes, ni a un deportista de élite.',
        references: [],
      },
    ],
    amendments: [],
  },
];
