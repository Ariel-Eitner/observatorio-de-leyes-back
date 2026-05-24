import { Article } from '../../../common/types/law.types';

const seg = (
  num: string,
  text: string,
  plain: string,
  example: string | null = null,
): Article['segments'][0] => ({
  id: `carta-onu-art-${num}-s1`,
  lawId: 'carta-onu',
  articleId: `carta-onu-art-${num}`,
  articleNumber: num,
  segmentType: 'PARAGRAPH',
  text: text,
  plainExplanation: plain,
  practicalExample: example,
  references: [],
  order: 1,
});

export const CARTA_ONU_S11: Article[] = [
  {
    id: 'carta-onu-art-102',
    lawId: 'carta-onu',
    number: '102',
    title: 'Registro de tratados internacionales',
    text:
      'Todo tratado y todo acuerdo internacional concertados por cualesquiera Miembros de las Naciones Unidas después de entrar en vigor esta Carta, serán registrados en la Secretaría y publicados por ésta a la mayor brevedad posible.\nNinguna de las partes en un tratado o acuerdo internacional que no haya sido registrado conforme a las disposiciones del párrafo 1 de este Artículo, podrá invocar dicho tratado o acuerdo ante órgano alguno de las Naciones Unidas.',    plainLanguageExplanation:
      'Todo tratado entre miembros de la ONU debe registrarse en la Secretaría y publicarse. Si no se registra, no puede invocarse ante ningún órgano de la ONU, lo que elimina los tratados secretos.',
    practicalEffects: [
      'Prohíbe los tratados secretos: si no se publica no tiene valor ante la ONU.',
      'La Secretaría gestiona la base de datos de tratados de la ONU, accesible al público.',
    ],
    examples: [
      'Argentina registra sus tratados bilaterales (como el Tratado de Integración con Chile de 1984) en la Secretaría de la ONU para que sean oponibles en foros internacionales.',
    ],
    relatedArticles: ['carta-onu-art-103', 'carta-onu-art-104'],
    jurisprudence: [],
    regulations: [],
    keywords: ['registro de tratados', 'transparencia', 'Secretaría', 'tratados secretos'],
    order: 102,
    segments: [
      seg(
        '102',
        'Todo tratado y todo acuerdo internacional concertados por cualesquiera Miembros de las Naciones Unidas después de entrar en vigor esta Carta, serán registrados en la Secretaría y publicados por ésta a la mayor brevedad posible.\nNinguna de las partes en un tratado o acuerdo internacional que no haya sido registrado conforme a las disposiciones del párrafo 1 de este Artículo, podrá invocar dicho tratado o acuerdo ante órgano alguno de las Naciones Unidas.',
        'Los tratados entre miembros de la ONU deben registrarse en la Secretaría; sin registro no pueden invocarse ante ningún órgano de la ONU.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-103',
    lawId: 'carta-onu',
    number: '103',
    title: 'Primacía de la Carta sobre otros acuerdos internacionales',
    text:
      'En caso de conflicto entre las obligaciones contraídas por los Miembros de las Naciones Unidas en virtud de la presente Carta y sus obligaciones contraídas en virtud de cualquier otro convenio internacional, prevalecerán las obligaciones impuestas por la presente Carta.',    plainLanguageExplanation:
      'La Carta de la ONU tiene jerarquía superior a cualquier otro tratado internacional. Si hay conflicto entre una obligación de la Carta y otro tratado, la Carta prevalece.',
    practicalEffects: [
      'Otorga rango constitucional a la Carta en el sistema de derecho internacional.',
      'Las sanciones del Consejo de Seguridad prevalecen sobre tratados de libre comercio o de inversión.',
    ],
    examples: [
      'Cuando el Consejo de Seguridad impuso sanciones a Irak en 1990, esas obligaciones prevalecieron sobre cualquier tratado bilateral de comercio que los miembros tuvieran con Irak.',
    ],
    relatedArticles: ['carta-onu-art-25', 'carta-onu-art-102', 'carta-onu-art-104'],
    jurisprudence: [],
    regulations: [],
    keywords: ['primacía', 'jerarquía normativa', 'Carta ONU', 'conflicto de obligaciones'],
    order: 103,
    segments: [
      seg(
        '103',
        'En caso de conflicto entre las obligaciones contraídas por los Miembros de las Naciones Unidas en virtud de la presente Carta y sus obligaciones contraídas en virtud de cualquier otro convenio internacional, prevalecerán las obligaciones impuestas por la presente Carta.',
        'La Carta de la ONU prevalece sobre cualquier otro tratado internacional en caso de conflicto.',
        'Las sanciones del Consejo de Seguridad a Irak en 1990 prevalecieron sobre cualquier tratado bilateral de comercio de sus miembros con ese país.',
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-104',
    lawId: 'carta-onu',
    number: '104',
    title: 'Capacidad jurídica de la Organización',
    text:
      'La Organización gozará, en el territorio de cada uno de sus Miembros, de la capacidad jurídica que sea necesaria para el ejercicio de sus funciones y la realización de sus propósitos.',    plainLanguageExplanation:
      'La ONU tiene personalidad jurídica en todos los países miembros: puede firmar contratos, adquirir bienes, iniciar acciones legales y ser demandada como cualquier persona jurídica.',
    practicalEffects: [
      'La ONU puede alquilar oficinas, contratar personal local, abrir cuentas bancarias en cualquier país miembro.',
      'Base legal para las sedes de agencias de la ONU en distintos países.',
    ],
    examples: [
      'La ONU firmó un acuerdo de sede con Argentina que le permite operar la CEPAL en Buenos Aires con plena capacidad jurídica.',
    ],
    relatedArticles: ['carta-onu-art-103', 'carta-onu-art-105'],
    jurisprudence: [],
    regulations: [],
    keywords: ['capacidad jurídica', 'personalidad jurídica', 'ONU', 'territorio miembro'],
    order: 104,
    segments: [
      seg(
        '104',
        'La Organización gozará, en el territorio de cada uno de sus Miembros, de la capacidad jurídica que sea necesaria para el ejercicio de sus funciones y la realización de sus propósitos.',
        'La ONU tiene plena capacidad jurídica en todos los países miembros: puede firmar contratos, comprar bienes y actuar ante tribunales.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-105',
    lawId: 'carta-onu',
    number: '105',
    title: 'Privilegios e inmunidades de la Organización y sus funcionarios',
    text:
      'La Organización gozará, en el territorio de cada uno de sus Miembros, de los privilegios e inmunidades necesarios para la realización de sus propósitos.\nLos representantes de los Miembros de la Organización y los funcionarios de ésta, gozarán asimismo de los privilegios e inmunidades necesarios para desempeñar con independencia sus funciones en relación con la Organización.\nLa Asamblea General podrá hacer recomendaciones con el objeto de determinar los pormenores de la aplicación de los párrafos 1 y 2 de este Artículo, o proponer convenciones a los Miembros de las Naciones Unidas con el mismo objeto.',    plainLanguageExplanation:
      'La ONU, sus representantes y funcionarios gozan de inmunidades (como la diplomática) necesarias para operar independientemente. La Asamblea General puede detallar esas inmunidades en convenciones específicas.',
    practicalEffects: [
      'Base de la Convención sobre Prerrogativas e Inmunidades de la ONU (1946).',
      'Los funcionarios de la ONU no pueden ser arrestados o procesados en los países donde trabajan sin que la ONU levante su inmunidad.',
    ],
    examples: [
      'Un funcionario de la ONU destacado en Buenos Aires goza de inmunidad frente a la jurisdicción argentina por actos realizados en función de su cargo.',
    ],
    relatedArticles: ['carta-onu-art-104'],
    jurisprudence: [],
    regulations: [],
    keywords: ['privilegios', 'inmunidades', 'funcionarios', 'representantes', 'ONU'],
    order: 105,
    segments: [
      seg(
        '105',
        'La Organización gozará, en el territorio de cada uno de sus Miembros, de los privilegios e inmunidades necesarios para la realización de sus propósitos.\nLos representantes de los Miembros de la Organización y los funcionarios de ésta, gozarán asimismo de los privilegios e inmunidades necesarios para desempeñar con independencia sus funciones en relación con la Organización.\nLa Asamblea General podrá hacer recomendaciones con el objeto de determinar los pormenores de la aplicación de los párrafos 1 y 2 de este Artículo, o proponer convenciones a los Miembros de las Naciones Unidas con el mismo objeto.',
        'La ONU y sus funcionarios tienen inmunidades para operar de forma independiente; la Asamblea puede detallarlas mediante convenciones.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-106',
    lawId: 'carta-onu',
    number: '106',
    title: 'Disposición transitoria sobre seguridad colectiva',
    text:
      'Mientras entran en vigor los convenios especiales previstos en el Artículo 43, que a juicio del Consejo de Seguridad lo capaciten para ejercer las atribuciones a que se refiere el Artículo 42, las partes en la Declaración de las Cuatro Potencias firmada en Moscú el 30 de octubre de 1943, y Francia, deberán, conforme a las disposiciones del párrafo 5 de esa Declaración, celebrar consultas entre sí, y cuando a ello hubiere lugar, con otros miembros de la Organización, a fin de acordar en nombre de ésta la acción conjunta que fuere necesaria para mantener la paz y la seguridad internacionales.',    plainLanguageExplanation:
      'Disposición transitoria: hasta que los convenios del artículo 43 entren en vigor, EE.UU., Reino Unido, URSS, China y Francia deben coordinarse entre sí para actuar en nombre de la ONU en materia de paz y seguridad.',
    practicalEffects: [
      'Reconoció el papel especial de las cinco grandes potencias en la seguridad mundial en el período fundacional.',
      'Como los convenios del artículo 43 nunca se celebraron, esta disposición perdió relevancia práctica.',
    ],
    examples: ['Esta disposición era operativa en 1945-1950 mientras la ONU aún no tenía capacidad militar propia.'],
    relatedArticles: ['carta-onu-art-42', 'carta-onu-art-43', 'carta-onu-art-107'],
    jurisprudence: [],
    regulations: [],
    keywords: ['disposición transitoria', 'cuatro potencias', 'Francia', 'seguridad colectiva'],
    order: 106,
    segments: [
      seg(
        '106',
        'Mientras entran en vigor los convenios especiales previstos en el Artículo 43, que a juicio del Consejo de Seguridad lo capaciten para ejercer las atribuciones a que se refiere el Artículo 42, las partes en la Declaración de las Cuatro Potencias firmada en Moscú el 30 de octubre de 1943, y Francia, deberán, conforme a las disposiciones del párrafo 5 de esa Declaración, celebrar consultas entre sí, y cuando a ello hubiere lugar, con otros miembros de la Organización, a fin de acordar en nombre de ésta la acción conjunta que fuere necesaria para mantener la paz y la seguridad internacionales.',
        'Disposición transitoria: las cinco grandes potencias debían coordinarse mientras la ONU no tuviera capacidad militar propia (convenios del art. 43).',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-107',
    lawId: 'carta-onu',
    number: '107',
    title: 'Acciones contra ex Estados enemigos de la Segunda Guerra Mundial',
    text:
      'Ninguna de las disposiciones de esta Carta invalidará o impedirá cualquier acción ejercida o autorizada como resultado de la segunda guerra mundial con respecto a un Estado enemigo de cualquiera de los signatarios de esta Carta durante la citada guerra, por los gobiernos responsables de dicha acción.',    plainLanguageExplanation:
      'Las acciones tomadas contra los países que fueron enemigos en la Segunda Guerra Mundial (Alemania, Japón, Italia) no quedan invalidadas por la Carta. Es una cláusula histórica que protegió las medidas de posguerra.',
    practicalEffects: [
      'Históricamente relevante para la ocupación aliada de Alemania y Japón post-1945.',
      'En la práctica, su importancia decayó cuando Alemania y Japón ingresaron a la ONU en 1956 y 1956 respectivamente.',
    ],
    examples: ['La ocupación aliada de Alemania (1945-1955) quedó amparada por esta cláusula y no pudo ser cuestionada ante la ONU.'],
    relatedArticles: ['carta-onu-art-106'],
    jurisprudence: [],
    regulations: [],
    keywords: ['ex Estados enemigos', 'Segunda Guerra Mundial', 'ocupación', 'disposición histórica'],
    order: 107,
    segments: [
      seg(
        '107',
        'Ninguna de las disposiciones de esta Carta invalidará o impedirá cualquier acción ejercida o autorizada como resultado de la segunda guerra mundial con respecto a un Estado enemigo de cualquiera de los signatarios de esta Carta durante la citada guerra, por los gobiernos responsables de dicha acción.',
        'Las acciones tomadas contra los países enemigos en la Segunda Guerra Mundial no quedan invalidadas por la Carta (cláusula histórica de posguerra).',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-108',
    lawId: 'carta-onu',
    number: '108',
    title: 'Proceso de reforma de la Carta',
    text:
      'Las reformas a la presente Carta entrarán en vigor para todos los Miembros de las Naciones Unidas cuando hayan sido adoptadas por el voto de las dos terceras partes de los miembros de la Asamblea General y ratificadas, de conformidad con sus respectivos procedimientos constitucionales, por las dos terceras partes de los Miembros de las Naciones Unidas, incluyendo a todos los miembros permanentes del Consejo de Seguridad.',    plainLanguageExplanation:
      'Para reformar la Carta se necesita: 2/3 de la Asamblea General más la ratificación de 2/3 de los miembros, incluyendo los cinco permanentes del Consejo de Seguridad. Cada permanente tiene veto sobre las reformas.',
    practicalEffects: [
      'Los cinco miembros permanentes tienen veto de facto sobre cualquier reforma a la Carta.',
      'La Carta solo ha sido reformada tres veces: en 1963, 1965 y 1973, ampliando el ECOSOC y el Consejo de Seguridad.',
    ],
    examples: [
      'La reforma de 1963 amplió el Consejo de Seguridad de 11 a 15 miembros; requirió ratificación de todos los permanentes, incluida la URSS.',
    ],
    relatedArticles: ['carta-onu-art-109'],
    jurisprudence: [],
    regulations: [],
    keywords: ['reforma', 'Carta', 'dos tercios', 'ratificación', 'miembros permanentes'],
    order: 108,
    segments: [
      seg(
        '108',
        'Las reformas a la presente Carta entrarán en vigor para todos los Miembros de las Naciones Unidas cuando hayan sido adoptadas por el voto de las dos terceras partes de los miembros de la Asamblea General y ratificadas, de conformidad con sus respectivos procedimientos constitucionales, por las dos terceras partes de los Miembros de las Naciones Unidas, incluyendo a todos los miembros permanentes del Consejo de Seguridad.',
        'Reformar la Carta requiere 2/3 de la Asamblea General y ratificación de 2/3 de los miembros incluyendo los cinco permanentes; cada uno tiene veto.',
        'La ampliación del Consejo de Seguridad de 11 a 15 miembros en 1963 requirió ratificación de todos los permanentes.',
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-109',
    lawId: 'carta-onu',
    number: '109',
    title: 'Conferencia General de revisión de la Carta',
    text:
      'Se podrá celebrar una Conferencia General de los Miembros de las Naciones Unidas con el propósito de revisar esta Carta, en la fecha y lugar que se determinen por el voto de las dos terceras partes de los miembros de la Asamblea General y por el voto de cualesquiera nueve miembros del Consejo de Seguridad. Cada Miembro de las Naciones Unidas tendrá un voto en la Conferencia.\nToda modificación de esta Carta recomendada por el voto de las dos terceras partes de la Conferencia entrará en vigor al ser ratificada de acuerdo con sus respectivos procedimientos constitucionales, por las dos terceras partes de los Miembros de las Naciones Unidas, incluyendo a todos los miembros permanentes del Consejo de Seguridad.\nSi no se hubiere celebrado tal Conferencia antes de la décima reunión anual de la Asamblea General después de entrar en vigor esta Carta, la proposición de convocar tal Conferencia será puesta en la agenda de dicha reunión de la Asamblea General, y la Conferencia será celebrada si así lo decidieren la mayoría de los miembros de la Asamblea General y siete miembros cualesquiera del Consejo de Seguridad.',    plainLanguageExplanation:
      'Puede convocarse una conferencia general de revisión de la Carta con 2/3 de la Asamblea y 9 miembros del Consejo. Las reformas que adopte necesitan ratificación de 2/3 de los miembros incluyendo los cinco permanentes. Si no se celebraba una antes de 1955, debía ponerse en la agenda de la décima Asamblea General.',
    practicalEffects: [
      'La tercera disposición obligó a que se propusiera una conferencia de revisión en 1955; la Asamblea votó aplazarla.',
      'Ninguna conferencia general de revisión se ha celebrado desde la fundación de la ONU.',
    ],
    examples: [
      'En 1955 (décima Asamblea General) se puso el tema en agenda; la mayoría votó postergar la conferencia indefinidamente, y así sigue hasta hoy.',
    ],
    relatedArticles: ['carta-onu-art-108'],
    jurisprudence: [],
    regulations: [],
    keywords: ['conferencia de revisión', 'reforma', 'Carta ONU', 'dos tercios'],
    order: 109,
    segments: [
      seg(
        '109',
        'Se podrá celebrar una Conferencia General de los Miembros de las Naciones Unidas con el propósito de revisar esta Carta, en la fecha y lugar que se determinen por el voto de las dos terceras partes de los miembros de la Asamblea General y por el voto de cualesquiera nueve miembros del Consejo de Seguridad. Cada Miembro de las Naciones Unidas tendrá un voto en la Conferencia.\nToda modificación de esta Carta recomendada por el voto de las dos terceras partes de la Conferencia entrará en vigor al ser ratificada de acuerdo con sus respectivos procedimientos constitucionales, por las dos terceras partes de los Miembros de las Naciones Unidas, incluyendo a todos los miembros permanentes del Consejo de Seguridad.\nSi no se hubiere celebrado tal Conferencia antes de la décima reunión anual de la Asamblea General después de entrar en vigor esta Carta, la proposición de convocar tal Conferencia será puesta en la agenda de dicha reunión de la Asamblea General, y la Conferencia será celebrada si así lo decidieren la mayoría de los miembros de la Asamblea General y siete miembros cualesquiera del Consejo de Seguridad.',
        'Puede convocarse una conferencia de revisión total de la Carta; las reformas igualmente requieren ratificación de 2/3 incluyendo los cinco permanentes.',
        'En 1955 la Asamblea General votó postergar indefinidamente la conferencia de revisión; nunca se ha celebrado ninguna.',
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-110',
    lawId: 'carta-onu',
    number: '110',
    title: 'Ratificación y entrada en vigor de la Carta',
    text:
      'La presente Carta será ratificada por los Estados signatarios de acuerdo con sus respectivos procedimientos constitucionales.\nLas ratificaciones serán entregadas para su depósito al Gobierno de los Estados Unidos de América, el cual notificará cada depósito a todos los Estados signatarios así como al Secretario General de la Organización cuando haya sido designado.\nLa presente Carta entrará en vigor tan pronto como hayan sido depositadas las ratificaciones de la República de China, Francia, la Unión de las Repúblicas Socialistas Soviéticas, el Reino Unido de la Gran Bretaña e Irlanda del Norte y los Estados Unidos de América, y por la mayoría de los demás Estados signatarios. Acto seguido se dejará constancia de las ratificaciones depositadas en un protocolo que extenderá el Gobierno de los Estados Unidos de América, y del cual transmitirá copias a todos los Estados signatarios.\nLos Estados signatarios de esta Carta que la ratifiquen después que haya entrado en vigor adquirirán la calidad de miembros originarios de las Naciones Unidas en la fecha del depósito de sus respectivas ratificaciones.',    plainLanguageExplanation:
      'La Carta debía ratificarse por los cinco permanentes y la mayoría de los demás signatarios para entrar en vigor. El depositario es EE.UU. Los que ratificaron después también obtuvieron la condición de miembros originarios.',
    practicalEffects: [
      'La Carta entró en vigor el 24 de octubre de 1945, fecha que hoy se celebra como el Día de las Naciones Unidas.',
      'Argentina fue uno de los 51 miembros originarios al ratificar el 24 de septiembre de 1945.',
    ],
    examples: ['La ONU entró en vigor el 24 de octubre de 1945 cuando los cinco permanentes y la mayoría de los signatarios depositaron sus ratificaciones.'],
    relatedArticles: ['carta-onu-art-3', 'carta-onu-art-4', 'carta-onu-art-111'],
    jurisprudence: [],
    regulations: [],
    keywords: ['ratificación', 'entrada en vigor', 'miembros originarios', 'depósito'],
    order: 110,
    segments: [
      seg(
        '110',
        'La presente Carta será ratificada por los Estados signatarios de acuerdo con sus respectivos procedimientos constitucionales.\nLas ratificaciones serán entregadas para su depósito al Gobierno de los Estados Unidos de América, el cual notificará cada depósito a todos los Estados signatarios así como al Secretario General de la Organización cuando haya sido designado.\nLa presente Carta entrará en vigor tan pronto como hayan sido depositadas las ratificaciones de la República de China, Francia, la Unión de las Repúblicas Socialistas Soviéticas, el Reino Unido de la Gran Bretaña e Irlanda del Norte y los Estados Unidos de América, y por la mayoría de los demás Estados signatarios. Acto seguido se dejará constancia de las ratificaciones depositadas en un protocolo que extenderá el Gobierno de los Estados Unidos de América, y del cual transmitirá copias a todos los Estados signatarios.\nLos Estados signatarios de esta Carta que la ratifiquen después que haya entrado en vigor adquirirán la calidad de miembros originarios de las Naciones Unidas en la fecha del depósito de sus respectivas ratificaciones.',
        'La Carta exigía ratificación de los cinco permanentes y la mayoría de los demás signatarios; entró en vigor el 24 de octubre de 1945.',
        'Argentina fue miembro originario al ratificar el 24 de septiembre de 1945, antes de la entrada en vigor el 24 de octubre.',
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-111',
    lawId: 'carta-onu',
    number: '111',
    title: 'Textos auténticos y depósito de la Carta',
    text:
      'La presente Carta, cuyos textos en chino, francés, ruso, inglés y español son igualmente auténticos, será depositada en los archivos del Gobierno de los Estados Unidos de América. Dicho Gobierno enviará copias debidamente certificadas de la misma a los Gobiernos de los demás Estados signatarios.',    plainLanguageExplanation:
      'La Carta existe en cinco idiomas igualmente auténticos (chino, francés, ruso, inglés y español) y su original se guarda en los archivos del gobierno de EE.UU., que distribuye copias certificadas.',
    practicalEffects: [
      'El español es uno de los cinco textos auténticos de igual jerarquía: no es traducción.',
      'EE.UU. es el depositario oficial de la Carta de la ONU.',
    ],
    examples: [
      'Cuando surge un conflicto de interpretación entre versiones lingüísticas, los cinco textos tienen igual peso jurídico y se analizan en conjunto.',
    ],
    relatedArticles: ['carta-onu-art-110'],
    jurisprudence: [],
    regulations: [],
    keywords: ['textos auténticos', 'idiomas', 'español', 'depositario', 'EE.UU.'],
    order: 111,
    segments: [
      seg(
        '111',
        'La presente Carta, cuyos textos en chino, francés, ruso, inglés y español son igualmente auténticos, será depositada en los archivos del Gobierno de los Estados Unidos de América. Dicho Gobierno enviará copias debidamente certificadas de la misma a los Gobiernos de los demás Estados signatarios.',
        'La Carta existe en cinco textos igualmente auténticos (chino, francés, ruso, inglés y español); el original se guarda en EE.UU.',
        null,
      ),
    ],
    amendments: [],
  },
];
