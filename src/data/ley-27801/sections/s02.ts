import type { Article } from '../../../common/types/law.types';

// Capítulo IV Sección 2ª — Penas (arts. 11-16)
// Capítulo IV Sección 3ª — Penas privativas de la libertad (arts. 17-21)

export const ARTICLES_27801_02: Article[] = [
  {
    id: 'art-27801-11',
    lawId: 'ley-27801',
    number: '11',
    title: 'Sustitución de la pena privativa de libertad',
    text:
      'Cuando la pena prevista para el delito o concurso de delitos imputados sea de hasta tres (3) años de prisión y se cumplieran las demás condiciones del título III del Libro Primero del Código Penal de la Nación, se deberá reemplazar la pena de prisión por alguna de las penas previstas en el artículo 12.\n\nCuando la pena prevista para el delito o concurso de delitos imputados supere los tres (3) años de prisión y hasta un máximo de diez (10) años de prisión y ninguno de los hechos reprochados haya implicado la muerte de la víctima, una grave violencia física o psíquica sobre las personas o, si se tratare de delitos culposos, no existieran lesiones gravísimas ni se haya causado la muerte o un daño psíquico grave a la víctima y el adolescente imputado no registrare condenas u otros procesos en trámite con auto de procesamiento o auto procesal equivalente firme, el tribunal, previo dictamen pericial con la conformidad del Ministerio Público Fiscal y habiendo escuchado a la víctima, podrá reemplazar la pena privativa de la libertad por alguna de las penas previstas en el artículo 12.',
    plainLanguageExplanation:
      'Para delitos con pena de hasta 3 años, el reemplazo por penas alternativas es obligatorio (deberá). Para delitos de 3 a 10 años, el reemplazo es posible (podrá) pero solo si no hubo muerte ni violencia grave, el adolescente no tiene condenas, y el tribunal cuenta con dictamen pericial y conformidad del fiscal.',
    practicalEffects: [
      'Hasta 3 años de pena: el reemplazo por penas del art. 12 es OBLIGATORIO si se cumplen las condiciones del CP',
      'De 3 a 10 años: el reemplazo es DISCRECIONAL pero requiere peritaje, conformidad fiscal y audiencia a la víctima',
      'No aplica si el hecho implicó muerte, grave violencia o lesiones gravísimas',
      'No aplica si el adolescente tiene condenas previas o procesos con auto de procesamiento firme',
    ],
    examples: [
      'Adolescente imputado por hurto simple (pena hasta 2 años) → el juez DEBE sustituir la privación de libertad por penas del art. 12',
      'Adolescente imputado por robo (pena hasta 6 años) sin antecedentes y víctima viva → el tribunal PUEDE reemplazar la privación si el fiscal lo acepta y hay peritaje',
    ],
    relatedArticles: ['art-27801-12', 'art-27801-17'],
    jurisprudence: [],
    regulations: ['Título III del Libro Primero del Código Penal — condiciones de la condicionalidad'],
    keywords: ['sustitución de pena', 'penas alternativas', 'tres años', 'diez años', 'dictamen pericial'],
    order: 11,
    segments: [
      {
        id: 'seg-27801-11-0',
        lawId: 'ley-27801',
        articleId: 'art-27801-11',
        articleNumber: '11',
        segmentType: 'PARAGRAPH',
        text:
          'Cuando la pena prevista para el delito o concurso de delitos imputados sea de hasta tres (3) años de prisión y se cumplieran las demás condiciones del título III del Libro Primero del Código Penal de la Nación, se deberá reemplazar la pena de prisión por alguna de las penas previstas en el artículo 12.',
        plainExplanation:
          'Para los delitos más leves (pena máxima hasta 3 años), el reemplazo es OBLIGATORIO ("se deberá"), no discrecional. El juez no puede optar por el encierro si no hay razones excepcionales.',
        practicalExample:
          'Un adolescente condenado por daño simple (pena hasta 1 año) → el tribunal DEBE imponer prestación de servicios, monitoreo u otra pena del art. 12. No puede enviarlo a un instituto.',
        references: [],
        order: 0,
      },
      {
        id: 'seg-27801-11-1',
        lawId: 'ley-27801',
        articleId: 'art-27801-11',
        articleNumber: '11',
        segmentType: 'PARAGRAPH',
        text:
          'Cuando la pena prevista para el delito o concurso de delitos imputados supere los tres (3) años de prisión y hasta un máximo de diez (10) años de prisión y ninguno de los hechos reprochados haya implicado la muerte de la víctima, una grave violencia física o psíquica sobre las personas...',
        plainExplanation:
          'Para delitos de 3 a 10 años, el reemplazo es posible pero condicionado a cuatro requisitos: (1) no hubo muerte ni violencia grave, (2) el adolescente no tiene condenas previas, (3) hay dictamen pericial, (4) el fiscal consiente.',
        practicalExample:
          'Adolescente de 16 años imputado por robo con arma (pena hasta 10 años), sin condenas, víctima ilesa → el tribunal puede sustituir la privación de libertad si se dan todos los requisitos.',
        references: [],
        order: 1,
      },
    ],
    amendments: [],
  },
  {
    id: 'art-27801-12',
    lawId: 'ley-27801',
    number: '12',
    title: 'Enunciación de penas',
    text:
      'Podrán imponerse al adolescente las siguientes penas:\n\na) Amonestación, en los términos establecidos en el artículo 13 de esta ley;\n\nb) Prohibición de contacto o de aproximarse a la víctima, su familia u otras personas que el juez estime corresponder o de relacionarse con determinadas personas;\n\nc) Prohibición de conducción de vehículos, si el delito imputado se vincula con la conducción de vehículos motorizados de cualquier naturaleza, el juez o tribunal podrá prohibirle la conducción de uno (1) o más tipos de vehículos;\n\nd) Prohibición de concurrir a determinados lugares, establecimientos o espectáculos, inclusive deportivos, musicales o culturales;\n\ne) Prohibición de salir del país o del lugar en el cual reside o del ámbito territorial que el juez determine;\n\nf) Prestación de servicios a la comunidad. La prestación de servicios a la comunidad consiste en la realización de tareas de interés social en entidades de asistencia, públicas o privadas sin fines de lucro como hospitales, escuelas, sociedades o fundaciones destinadas al bien común y con fines sociales u otros establecimientos similares. Dichos servicios deberán ser determinados con estricta observancia de las regulaciones que en materia laboral se establecen respecto del trabajo de las personas menores de dieciocho (18) años de edad en cuanto al tipo de tareas. Las tareas deberán asignarse según las aptitudes del adolescente imputado y no deberán afectar ni perjudicar su concurrencia a establecimientos educativos o laborales;\n\ng) Monitoreo electrónico. El monitoreo electrónico consiste en la aplicación de un dispositivo electrónico para rastrear y registrar la ubicación y actividades del adolescente, a fin de garantizar el cumplimiento de alguna de las penas impuestas o bien como pena en sí misma. El monitoreo electrónico podrá imponerse de forma autónoma o como complemento de las otras penas previstas en este artículo y en el artículo 17 de la presente ley;\n\nh) Reparación integral del daño a la víctima;\n\ni) Penas privativas de libertad.',
    plainLanguageExplanation:
      'Este artículo lista las 9 penas posibles para adolescentes. Van desde la más leve (amonestación) hasta la más grave (privación de libertad del art. 17). Las penas a) a h) no implican encierro; la i) remite a las tres modalidades del art. 17.',
    practicalEffects: [
      'Las penas a) a h) son no privativas de libertad — no implican encierro',
      'La prestación de servicios debe respetar la legislación laboral de menores y no puede perjudicar la educación',
      'El monitoreo electrónico puede usarse como pena autónoma o como complemento de otras penas',
      'La amonestación siempre debe imponerse junto a al menos una pena más (ver art. 13)',
    ],
    examples: [
      'Para un robo leve: el juez puede imponer prohibición de contacto con la víctima + prestación de servicios comunitarios',
      'Para incumplimiento de otra pena: el monitoreo electrónico puede agregarse como complemento',
    ],
    relatedArticles: ['art-27801-11', 'art-27801-13', 'art-27801-15', 'art-27801-16', 'art-27801-17'],
    jurisprudence: [],
    regulations: [],
    keywords: ['penas', 'amonestación', 'prohibición de contacto', 'prestación de servicios', 'monitoreo electrónico', 'reparación', 'privación de libertad'],
    order: 12,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-13',
    lawId: 'ley-27801',
    number: '13',
    title: 'Amonestación',
    text:
      'La amonestación consiste en un llamado de atención, reproche oral y recomendaciones sobre formas de conducta comunitaria formulado personalmente, bajo consecuencia de nulidad, por el juez o tribunal al adolescente imputado en audiencia privada y en presencia del defensor, del fiscal, de los padres o representantes legales y de la víctima, si ella así lo desea.\n\nEn la citada audiencia, el magistrado interviniente deberá hacer saber al imputado, de forma clara y en lenguaje sencillo, la ilegalidad y gravedad del hecho cometido y su responsabilidad, y promover su determinación a no cometer nuevos delitos.\n\nPodrá también convocar en otra audiencia a los padres o responsables y advertirlos sobre la conducta ilícita del adolescente imputado, su necesidad de enmienda y de procurar que aquella no se repita en el futuro.\n\nLa amonestación deberá ser impuesta de forma conjunta con al menos una (1) de las demás penas previstas en el artículo 12.',
    plainLanguageExplanation:
      'La amonestación es una reprimenda oral formal del juez al adolescente, en audiencia privada con el defensor, el fiscal y los padres. Es la pena más leve, pero no puede aplicarse sola: siempre debe acompañarse de al menos otra pena del art. 12. Si el juez no la formula personalmente, la pena es nula.',
    practicalEffects: [
      'SIEMPRE debe imponerse junto a al menos otra pena del art. 12 — no puede ser la única sanción',
      'Debe realizarse en audiencia privada con defensor, fiscal y padres presentes, bajo pena de nulidad',
      'El juez debe usar lenguaje claro y sencillo',
      'La víctima puede asistir si lo desea',
    ],
    examples: [
      'Un adolescente primario por una falta leve → el juez puede imponer amonestación + prohibición de concurrir a determinados lugares (no puede imponer solo amonestación)',
    ],
    relatedArticles: ['art-27801-12'],
    jurisprudence: [],
    regulations: [],
    keywords: ['amonestación', 'reproche oral', 'audiencia privada', 'nulidad', 'penas conjuntas'],
    order: 13,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-14',
    lawId: 'ley-27801',
    number: '14',
    title: 'Límites a las prohibiciones',
    text:
      'Salvo cuando fuera necesario para la protección de la víctima o de testigos, las penas establecidas en el artículo 12, incisos b), d) y e) no podrán impedir u obstaculizar vínculos afectivos de importancia, la asistencia a lugares para su formación educativa o laboral o a su lugar de trabajo o de educación, o el acceso a servicios de salud.',
    plainLanguageExplanation:
      'Las prohibiciones de contacto, de concurrir a lugares y las restricciones territoriales (incisos b, d y e del art. 12) no pueden bloquear la educación, el trabajo ni la salud del adolescente, salvo que sea estrictamente necesario para proteger a la víctima o testigos.',
    practicalEffects: [
      'Si el adolescente va a la misma escuela que la víctima, la prohibición de contacto debe diseñarse de modo que no le impida ir a la escuela',
      'El acceso a servicios de salud es siempre protegido, salvo protección de víctima o testigos',
    ],
    examples: [
      'Un adolescente condenado con prohibición de concurrir a determinados lugares → el juez no puede incluir en esa prohibición su escuela o su lugar de trabajo',
    ],
    relatedArticles: ['art-27801-12'],
    jurisprudence: [],
    regulations: [],
    keywords: ['prohibiciones', 'límites', 'educación', 'salud', 'trabajo', 'víctima', 'testigos'],
    order: 14,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-15',
    lawId: 'ley-27801',
    number: '15',
    title: 'Plazo máximo de las penas alternativas',
    text:
      'Las penas determinadas en el artículo 12, con excepción de las establecidas en los incisos a), h) e i), no podrán exceder de tres (3) años.',
    plainLanguageExplanation:
      'Las penas de los incisos b) a g) del art. 12 (prohibiciones, servicios comunitarios, monitoreo) tienen un techo de 3 años. La amonestación (a), la reparación del daño (h) y las privativas de libertad (i) no tienen ese límite específico de este artículo.',
    practicalEffects: [
      'Ninguna prohibición, prestación de servicios o monitoreo puede durar más de 3 años',
      'La reparación del daño (h) no tiene ese plazo máximo',
      'Las penas privativas de libertad se rigen por los límites propios del art. 19',
    ],
    examples: [],
    relatedArticles: ['art-27801-12', 'art-27801-19'],
    jurisprudence: [],
    regulations: [],
    keywords: ['plazo máximo', 'penas alternativas', 'tres años', 'límite temporal'],
    order: 15,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-16',
    lawId: 'ley-27801',
    number: '16',
    title: 'Verificación de cumplimiento de las penas',
    text:
      'El cumplimiento de las penas referidas en el artículo 12, incisos a) a h) deberá ser controlado periódicamente por el juez interviniente, atendiendo a los informes que presenten las partes y los organismos cuyo objeto sea controlar el cumplimiento de las sanciones impuestas. Podrá participar la víctima, si es su deseo. En caso de verificarse su incumplimiento, se deberá revocar la pena y disponerse una pena privativa de la libertad.',
    plainLanguageExplanation:
      'El juez controla periódicamente el cumplimiento de las penas no privativas de libertad. Si el adolescente incumple, el juez DEBE revocar la pena y disponer privación de libertad — no tiene discrecionalidad para omitirlo.',
    practicalEffects: [
      'El control es periódico y obligatorio — el juez no puede ignorar el cumplimiento',
      'El incumplimiento verificado OBLIGA a revocar y disponer privación de libertad (no es discrecional)',
      'La víctima puede participar del control si lo desea',
    ],
    examples: [
      'Adolescente que no cumple la prohibición de contacto con la víctima → el juez DEBE revocar esa pena y disponer privación de libertad (domiciliaria o en instituto)',
    ],
    relatedArticles: ['art-27801-12', 'art-27801-17', 'art-27801-21'],
    jurisprudence: [],
    regulations: [],
    keywords: ['control de penas', 'incumplimiento', 'revocación', 'privación de libertad'],
    order: 16,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-17',
    lawId: 'ley-27801',
    number: '17',
    title: 'Penas privativas de libertad. Enunciación',
    text:
      'Las penas privativas de la libertad son las siguientes:\n\na) privación de la libertad en domicilio;\n\nb) privación de la libertad en un instituto abierto;\n\nc) privación de la libertad en un instituto especializado de detención.\n\nLa decisión deberá ser tomada por el tribunal o juez en una resolución en la que se expongan los motivos que justifican la privación de la libertad y deberá indicarse el lugar de cumplimiento, conforme a los parámetros de esta ley.',
    plainLanguageExplanation:
      'Hay tres tipos de privación de libertad para adolescentes: domiciliaria, en instituto abierto o en instituto especializado. La ley no contempla cárcel de adultos. Cualquiera que sea la modalidad, el juez debe fundar la decisión y precisar dónde se cumple.',
    practicalEffects: [
      'La detención domiciliaria (a) es la menos restrictiva: el adolescente permanece en su domicilio',
      'El instituto abierto (b) tiene menor nivel de seguridad y mayor libertad de movimiento',
      'El instituto especializado (c) es la privación más restrictiva, equivalente a la detención',
      'Toda resolución debe expresar los motivos e indicar el lugar de cumplimiento',
    ],
    examples: [
      'Un adolescente condenado a privación de libertad no puede ser alojado en una cárcel de adultos, sino en alguna de estas tres modalidades',
    ],
    relatedArticles: ['art-27801-18', 'art-27801-19', 'art-27801-27', 'art-27801-30'],
    jurisprudence: [],
    regulations: [],
    keywords: ['privación de libertad', 'domicilio', 'instituto abierto', 'instituto especializado', 'resolución fundada'],
    order: 17,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-18',
    lawId: 'ley-27801',
    number: '18',
    title: 'Otras medidas durante la privación de libertad',
    text:
      'En todos los casos, se deberán imponer al adolescente, conjuntamente, medidas específicas tendientes a desarrollar su educación, el trabajo y la conciencia de la gravedad del hecho cometido, con vistas a lograr su resocialización y desarrollo de su vida.',
    plainLanguageExplanation:
      'Toda privación de libertad debe acompañarse de medidas de educación y formación laboral. No es posible una detención sin componente educativo-resocializador.',
    practicalEffects: [
      'La privación de libertad nunca es solo encierro: siempre debe incluir educación y formación',
      'El juez debe disponer estas medidas de manera conjunta con la privación de libertad',
    ],
    examples: [],
    relatedArticles: ['art-27801-17', 'art-27801-32'],
    jurisprudence: [],
    regulations: [],
    keywords: ['educación', 'trabajo', 'resocialización', 'privación de libertad', 'medidas conjuntas'],
    order: 18,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-19',
    lawId: 'ley-27801',
    number: '19',
    title: 'Prohibición y plazo máximo de detención',
    text:
      'Respecto de los adolescentes alcanzados por la presente ley, queda prohibida la imposición de las penas privativas de la libertad de reclusión perpetua y de prisión perpetua.\n\nEl plazo máximo de las penas privativas de la libertad respecto de personas adolescentes será de quince (15) años. La regla es aplicable aun si la escala penal fuera más elevada, producto de la concurrencia real de varios hechos independientes.\n\nCuando el adolescente condenado cumpla dos tercios (2/3) de la pena impuesta en detención y se dieran las circunstancias previstas en el Código Penal para otorgar la libertad condicional, el tribunal podrá disponer que el resto de la pena sea cumplida mediante las restantes penas establecidas en esta ley, de modo conjunto o alternativo. Previamente a la decisión se requerirá el dictamen pericial favorable, la conformidad del Ministerio Público Fiscal y la opinión de la víctima, que deberá ser notificada al efecto.\n\nSon de aplicación los beneficios establecidos por las leyes de estímulo educativo vigentes o por las que se dicten en el ámbito nacional o en las jurisdicciones locales.',
    plainLanguageExplanation:
      'Ningún adolescente puede ser condenado a prisión o reclusión perpetua. El máximo es 15 años, aunque haya concurso real de delitos. Al cumplir 2/3 de la pena, el tribunal puede sustituir el resto por penas alternativas. También aplican las leyes de estímulo educativo (reducción de pena por estudio).',
    practicalEffects: [
      'Prohibición absoluta de perpetua para adolescentes',
      'Máximo 15 años de privación de libertad, aun con múltiples delitos graves',
      'A los 2/3 del tiempo cumplido, el tribunal puede sustituir el resto por penas alternativas si peritaje y fiscal lo avalan',
      'Las leyes de estímulo educativo (reducción de pena por estudio) aplican plenamente',
    ],
    examples: [
      'Adolescente condenado a 15 años (máximo legal): al cumplir 10 años (2/3), el tribunal puede sustituir los 5 años restantes por monitoreo electrónico + servicios comunitarios',
    ],
    relatedArticles: ['art-27801-17', 'art-27801-12'],
    jurisprudence: [],
    regulations: ['Leyes de estímulo educativo — reducción de pena por completar estudios'],
    keywords: ['perpetua', 'plazo máximo', 'quince años', 'dos tercios', 'libertad condicional', 'estímulo educativo'],
    order: 19,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-20',
    lawId: 'ley-27801',
    number: '20',
    title: 'Imposición de múltiples medidas y penas',
    text:
      'Cuando no corresponda aplicar una pena privativa de libertad o cuando ésta sea sustituida conforme lo establecido en el artículo 11, el tribunal podrá imponer una (1) o más de las medidas y penas previstas en las Secciones 1ª y 2ª de este Capítulo, en forma simultánea o sucesiva.',
    plainLanguageExplanation:
      'Cuando no aplica la privación de libertad (o cuando se reemplaza conforme al art. 11), el tribunal puede combinar varias penas del art. 12 y medidas complementarias del art. 8, de manera simultánea o una después de la otra.',
    practicalEffects: [
      'El tribunal puede imponer varias penas del art. 12 a la vez',
      'También puede imponerlas sucesivamente: primero una y luego otra',
      'Combinar penas del art. 12 con medidas del art. 8 es posible y frecuente',
    ],
    examples: [
      'Tribunal impone: prestación de servicios comunitarios (art. 12f) + prohibición de contacto con víctima (art. 12b) + asesoramiento interdisciplinario (art. 8a) → todo simultáneamente',
    ],
    relatedArticles: ['art-27801-8', 'art-27801-11', 'art-27801-12'],
    jurisprudence: [],
    regulations: [],
    keywords: ['múltiples penas', 'combinación', 'simultáneas', 'sucesivas'],
    order: 20,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-21',
    lawId: 'ley-27801',
    number: '21',
    title: 'Incumplimiento de la pena',
    text:
      'Ante el incumplimiento injustificado de una pena alternativa impuesta como condena, el juez deberá sustituirla por otra pena más severa, conforme lo dispuesto en el artículo 12.',
    plainLanguageExplanation:
      'Si el adolescente incumple injustificadamente una pena alternativa, el juez DEBE reemplazarla por una pena más severa dentro de las del art. 12. No hay discrecionalidad: la sustitución es obligatoria.',
    practicalEffects: [
      'El incumplimiento injustificado de pena alternativa OBLIGA al juez a sustituirla por una pena más severa',
      'La nueva pena debe ser del listado del art. 12 (puede llegar a privación de libertad)',
      'Si el incumplimiento es justificado (enfermedad, fuerza mayor), no aplica este artículo',
    ],
    examples: [
      'Adolescente que no cumple sin justificación la prohibición de concurrir a determinados lugares → el juez debe cambiar esa pena por monitoreo electrónico o privación de libertad',
    ],
    relatedArticles: ['art-27801-12', 'art-27801-16'],
    jurisprudence: [],
    regulations: [],
    keywords: ['incumplimiento', 'sustitución', 'pena más severa', 'obligatorio'],
    order: 21,
    segments: [],
    amendments: [],
  },
];
