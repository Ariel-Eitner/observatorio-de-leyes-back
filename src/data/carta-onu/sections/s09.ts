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

export const CARTA_ONU_S09: Article[] = [
  {
    id: 'carta-onu-art-81',
    lawId: 'carta-onu',
    number: '81',
    title: 'Contenido del acuerdo de administración fiduciaria',
    text:
      'El acuerdo sobre administración fiduciaria contendrá en cada caso las condiciones en que se administrará el territorio fideicometido, y designará la autoridad que ha de ejercer la administración. Dicha autoridad, que en lo sucesivo se denominará la "autoridad administradora", podrá ser uno o más Estados o la misma Organización.',    plainLanguageExplanation:
      'Cada acuerdo de fideicomiso debe especificar las reglas de administración del territorio y quién lo administra. La "autoridad administradora" puede ser un Estado, varios Estados o la propia ONU.',
    practicalEffects: [
      'Define el contenido mínimo de todo acuerdo de administración fiduciaria.',
      'Habilita a la ONU a actuar directamente como autoridad administradora.',
    ],
    examples: ['El Territorio en Fideicomiso de las Islas del Pacífico fue administrado por EE.UU.'],
    relatedArticles: ['carta-onu-art-77', 'carta-onu-art-79', 'carta-onu-art-83'],
    jurisprudence: [],
    regulations: [],
    keywords: ['administración fiduciaria', 'autoridad administradora', 'acuerdo de fideicomiso'],
    order: 81,
    segments: [
      seg(
        '81',
        'El acuerdo sobre administración fiduciaria contendrá en cada caso las condiciones en que se administrará el territorio fideicometido, y designará la autoridad que ha de ejercer la administración. Dicha autoridad, que en lo sucesivo se denominará la "autoridad administradora", podrá ser uno o más Estados o la misma Organización.',
        'Cada acuerdo de fideicomiso debe indicar cómo se administrará el territorio y quién lo hará; esa entidad se llama "autoridad administradora" y puede ser un Estado, varios o la ONU.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-82',
    lawId: 'carta-onu',
    number: '82',
    title: 'Zonas estratégicas dentro de territorios fideicometidos',
    text:
      'Podrán designarse en cualquier acuerdo sobre administración fiduciaria, una o varias zonas estratégicas que comprendan parte o la totalidad del territorio fideicometido a que se refiera el acuerdo, sin perjuicio de los acuerdos especiales celebrados con arreglo al Artículo 43.',    plainLanguageExplanation:
      'Un acuerdo de fideicomiso puede declarar ciertas áreas como "zonas estratégicas" por razones de seguridad, sin anular los acuerdos militares previstos en el artículo 43.',
    practicalEffects: [
      'Permite separar dentro de un territorio fideicometido las zonas de interés estratégico-militar.',
      'Esas zonas quedan bajo la autoridad del Consejo de Seguridad (artículo 83).',
    ],
    examples: [
      'Las Islas del Pacífico (Carolinas, Marianas, Marshall) fueron declaradas zona estratégica bajo administración de EE.UU.',
    ],
    relatedArticles: ['carta-onu-art-43', 'carta-onu-art-83'],
    jurisprudence: [],
    regulations: [],
    keywords: ['zona estratégica', 'territorio fideicometido', 'seguridad'],
    order: 82,
    segments: [
      seg(
        '82',
        'Podrán designarse en cualquier acuerdo sobre administración fiduciaria, una o varias zonas estratégicas que comprendan parte o la totalidad del territorio fideicometido a que se refiera el acuerdo, sin perjuicio de los acuerdos especiales celebrados con arreglo al Artículo 43.',
        'Un territorio en fideicomiso puede tener zonas declaradas estratégicas por motivos de seguridad; esas zonas las supervisa el Consejo de Seguridad.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-83',
    lawId: 'carta-onu',
    number: '83',
    title: 'Funciones del Consejo de Seguridad en zonas estratégicas',
    text:
      'Todas las funciones de las Naciones Unidas relativas a zonas estratégicas, incluso la de aprobar los términos de los acuerdos sobre administración fiduciaria y de las modificaciones o reformas de los mismos, serán ejercidas por el Consejo de Seguridad.\nLos objetivos básicos enunciados en el Artículo 76 serán aplicables a la población de cada zona estratégica.\nSalvo las disposiciones de los acuerdos sobre administración fiduciaria y sin perjuicio de las exigencias de la seguridad, el Consejo de Seguridad aprovechará la ayuda del Consejo de Administración Fiduciaria para desempeñar, en las zonas estratégicas, aquellas funciones de la Organización relativas a materias políticas, económicas, sociales y educativas que correspondan al régimen de administración fiduciaria.',    plainLanguageExplanation:
      'En zonas estratégicas, el Consejo de Seguridad tiene todas las competencias de la ONU (en lugar de la Asamblea General). Aun así, los objetivos de bienestar del artículo 76 se aplican a la población, y el Consejo puede pedir ayuda al Consejo de Administración Fiduciaria para asuntos no militares.',
    practicalEffects: [
      'El Consejo de Seguridad aprueba y modifica los acuerdos fiduciarios de zonas estratégicas.',
      'Las garantías de bienestar del artículo 76 protegen a la población incluso en zonas militares.',
    ],
    examples: [
      'El Consejo de Seguridad aprobó en 1947 el acuerdo fiduciario sobre las Islas del Pacífico con EE.UU. como autoridad administradora.',
    ],
    relatedArticles: ['carta-onu-art-76', 'carta-onu-art-82', 'carta-onu-art-85'],
    jurisprudence: [],
    regulations: [],
    keywords: ['Consejo de Seguridad', 'zona estratégica', 'administración fiduciaria'],
    order: 83,
    segments: [
      seg(
        '83',
        'Todas las funciones de las Naciones Unidas relativas a zonas estratégicas, incluso la de aprobar los términos de los acuerdos sobre administración fiduciaria y de las modificaciones o reformas de los mismos, serán ejercidas por el Consejo de Seguridad.\nLos objetivos básicos enunciados en el Artículo 76 serán aplicables a la población de cada zona estratégica.\nSalvo las disposiciones de los acuerdos sobre administración fiduciaria y sin perjuicio de las exigencias de la seguridad, el Consejo de Seguridad aprovechará la ayuda del Consejo de Administración Fiduciaria para desempeñar, en las zonas estratégicas, aquellas funciones de la Organización relativas a materias políticas, económicas, sociales y educativas que correspondan al régimen de administración fiduciaria.',
        'El Consejo de Seguridad dirige las zonas estratégicas pero los objetivos de bienestar del artículo 76 siguen vigentes para su población.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-84',
    lawId: 'carta-onu',
    number: '84',
    title: 'Deber de paz de la autoridad administradora',
    text:
      'La autoridad administradora tendrá el deber de velar por que el territorio fideicometido contribuya al mantenimiento de la paz y la seguridad internacionales. Con tal fin, la autoridad administradora podrá hacer uso de las fuerzas voluntarias, de las facilidades y de la ayuda del citado territorio, a efecto de cumplir con las obligaciones por ella contraídas a este respecto ante el Consejo de Seguridad, como también para la defensa local y el mantenimiento de la ley y del orden dentro del territorio fideicometido.',    plainLanguageExplanation:
      'El Estado que administra un territorio en fideicomiso debe garantizar que ese territorio apoye la paz internacional, y puede usar sus recursos (incluso fuerzas voluntarias locales) para cumplir ese deber y mantener el orden interno.',
    practicalEffects: [
      'Habilita a la autoridad administradora a reclutar fuerzas del propio territorio para la defensa.',
      'Crea una obligación de contribuir a la seguridad colectiva de la ONU.',
    ],
    examples: [
      'EE.UU. pudo reclutar isleños de las Islas del Pacífico para fuerzas de defensa local durante la Guerra Fría.',
    ],
    relatedArticles: ['carta-onu-art-43', 'carta-onu-art-76', 'carta-onu-art-83'],
    jurisprudence: [],
    regulations: [],
    keywords: ['paz y seguridad', 'autoridad administradora', 'fuerzas voluntarias', 'fideicomiso'],
    order: 84,
    segments: [
      seg(
        '84',
        'La autoridad administradora tendrá el deber de velar por que el territorio fideicometido contribuya al mantenimiento de la paz y la seguridad internacionales. Con tal fin, la autoridad administradora podrá hacer uso de las fuerzas voluntarias, de las facilidades y de la ayuda del citado territorio, a efecto de cumplir con las obligaciones por ella contraídas a este respecto ante el Consejo de Seguridad, como también para la defensa local y el mantenimiento de la ley y del orden dentro del territorio fideicometido.',
        'Quien administra un territorio en fideicomiso debe contribuir a la paz mundial y puede usar los recursos del territorio para ese fin y para el orden interno.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-85',
    lawId: 'carta-onu',
    number: '85',
    title: 'Funciones de la Asamblea General en zonas no estratégicas',
    text:
      'Las funciones de la Organización en lo que respecta a los acuerdos sobre administración fiduciaria relativos a todas las zonas no designadas como estratégicas, incluso la de aprobar los términos de los acuerdos y las modificaciones o reformas de los mismos serán ejercidas por la Asamblea General.\nEl Consejo de Administración Fiduciaria, bajo la autoridad de la Asamblea General, ayudará a ésta en el desempeño de las funciones aquí enumeradas.',    plainLanguageExplanation:
      'Para los territorios en fideicomiso que no son zonas estratégicas, la Asamblea General (no el Consejo de Seguridad) tiene la autoridad, apoyada por el Consejo de Administración Fiduciaria.',
    practicalEffects: [
      'Divide la supervisión: Asamblea General para zonas ordinarias, Consejo de Seguridad para zonas estratégicas.',
      'El Consejo de Administración Fiduciaria actúa como órgano técnico subordinado a la Asamblea.',
    ],
    examples: [
      'Territorios como el Camerún Británico o Ruanda-Urundi fueron supervisados por la Asamblea General, no por el Consejo de Seguridad.',
    ],
    relatedArticles: ['carta-onu-art-83', 'carta-onu-art-86', 'carta-onu-art-87'],
    jurisprudence: [],
    regulations: [],
    keywords: ['Asamblea General', 'administración fiduciaria', 'zonas no estratégicas'],
    order: 85,
    segments: [
      seg(
        '85',
        'Las funciones de la Organización en lo que respecta a los acuerdos sobre administración fiduciaria relativos a todas las zonas no designadas como estratégicas, incluso la de aprobar los términos de los acuerdos y las modificaciones o reformas de los mismos serán ejercidas por la Asamblea General.\nEl Consejo de Administración Fiduciaria, bajo la autoridad de la Asamblea General, ayudará a ésta en el desempeño de las funciones aquí enumeradas.',
        'La Asamblea General supervisa los territorios en fideicomiso que no son zonas estratégicas, con ayuda del Consejo de Administración Fiduciaria.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-86',
    lawId: 'carta-onu',
    number: '86',
    title: 'Composición del Consejo de Administración Fiduciaria',
    text:
      'El Consejo de Administración Fiduciaria estará integrado por los siguientes Miembros de las Naciones Unidas:\na) los Miembros que administren territorios fideicometidos;\nb) los Miembros mencionados por su nombre en el Artículo 23 que no estén administrando territorios fideicometidos; y\nc) tantos otros Miembros elegidos por periodos de tres años por la Asamblea General cuantos sean necesarios para asegurar que el número total de miembros del Consejo de Administración Fiduciaria se divida por igual entre los Miembros de las Naciones Unidas administradores de tales territorios y los no administradores.\nCada miembro del Consejo de Administración Fiduciaria designará a una persona especialmente calificada para que lo represente en el Consejo.',    plainLanguageExplanation:
      'El Consejo de Administración Fiduciaria se compone de: los Estados que administran territorios, los cinco miembros permanentes del Consejo de Seguridad (art. 23), y los Estados elegidos por la Asamblea General para equilibrar el número entre administradores y no administradores.',
    practicalEffects: [
      'Garantiza que los no administradores tengan igual representación que los administradores.',
      'Cada miembro envía un representante calificado (no necesariamente un diplomático).',
    ],
    examples: [
      'Cuando Australia administraba Papúa Nueva Guinea, era miembro automático del Consejo de Administración Fiduciaria.',
    ],
    relatedArticles: ['carta-onu-art-23', 'carta-onu-art-85', 'carta-onu-art-87'],
    jurisprudence: [],
    regulations: [],
    keywords: ['Consejo de Administración Fiduciaria', 'composición', 'representación'],
    order: 86,
    segments: [
      seg(
        '86',
        'El Consejo de Administración Fiduciaria estará integrado por los siguientes Miembros de las Naciones Unidas:\na) los Miembros que administren territorios fideicometidos;\nb) los Miembros mencionados por su nombre en el Artículo 23 que no estén administrando territorios fideicometidos; y\nc) tantos otros Miembros elegidos por periodos de tres años por la Asamblea General cuantos sean necesarios para asegurar que el número total de miembros del Consejo de Administración Fiduciaria se divida por igual entre los Miembros de las Naciones Unidas administradores de tales territorios y los no administradores.\nCada miembro del Consejo de Administración Fiduciaria designará a una persona especialmente calificada para que lo represente en el Consejo.',
        'El Consejo de Administración Fiduciaria tiene partes iguales de administradores y no administradores, más los cinco permanentes del Consejo de Seguridad.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-87',
    lawId: 'carta-onu',
    number: '87',
    title: 'Funciones del Consejo de Administración Fiduciaria',
    text:
      'En el desempeño de sus funciones, la Asamblea General y, bajo su autoridad, el Consejo de Administración Fiduciaria, podrán:\nconsiderar informes que les haya rendido la autoridad administradora;\naceptar peticiones y examinarlas en consulta con la autoridad administradora;\ndisponer visitas periódicas a los territorios fideicometidos en fechas convenidas con la autoridad administradora; y\ntomar estas y otras medidas de conformidad con los términos de los acuerdos sobre administración fiduciaria.',    plainLanguageExplanation:
      'La Asamblea General y el Consejo de Administración Fiduciaria pueden: revisar informes del administrador, recibir peticiones de los habitantes, realizar visitas periódicas y adoptar otras medidas previstas en el acuerdo.',
    practicalEffects: [
      'Los habitantes de territorios en fideicomiso pueden presentar peticiones directamente al Consejo.',
      'Las visitas de inspección son un mecanismo de control sobre la autoridad administradora.',
    ],
    examples: [
      'El Consejo realizó misiones de visita a Togola nd bajo mandato británico y a Ruanda-Urundi bajo mandato belga.',
    ],
    relatedArticles: ['carta-onu-art-85', 'carta-onu-art-86', 'carta-onu-art-88'],
    jurisprudence: [],
    regulations: [],
    keywords: ['Consejo de Administración Fiduciaria', 'peticiones', 'visitas', 'informes'],
    order: 87,
    segments: [
      seg(
        '87',
        'En el desempeño de sus funciones, la Asamblea General y, bajo su autoridad, el Consejo de Administración Fiduciaria, podrán:\nconsiderar informes que les haya rendido la autoridad administradora;\naceptar peticiones y examinarlas en consulta con la autoridad administradora;\ndisponer visitas periódicas a los territorios fideicometidos en fechas convenidas con la autoridad administradora; y\ntomar estas y otras medidas de conformidad con los términos de los acuerdos sobre administración fiduciaria.',
        'La Asamblea y el Consejo de Administración Fiduciaria supervisan los territorios revisando informes, recibiendo peticiones y realizando visitas.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-88',
    lawId: 'carta-onu',
    number: '88',
    title: 'Cuestionario anual del Consejo de Administración Fiduciaria',
    text:
      'El Consejo de Administración Fiduciaria formulará un cuestionario sobre el adelanto político, económico, social y educativo de los habitantes de cada territorio fideicometido; y la autoridad administradora de cada territorio fideicometido dentro de la competencia de la Asamblea General, rendirá a ésta un informe anual sobre la base de dicho cuestionario.',    plainLanguageExplanation:
      'El Consejo elabora un cuestionario estándar sobre progreso político, económico, social y educativo, y cada autoridad administradora debe presentar un informe anual basado en ese cuestionario.',
    practicalEffects: [
      'Crea un mecanismo de rendición de cuentas anual y estandarizado.',
      'Permite comparar el desarrollo entre distintos territorios en fideicomiso.',
    ],
    examples: [
      'Australia presentaba informes anuales sobre Papúa Nueva Guinea respondiendo el cuestionario del Consejo hasta la independencia del territorio en 1975.',
    ],
    relatedArticles: ['carta-onu-art-87', 'carta-onu-art-89'],
    jurisprudence: [],
    regulations: [],
    keywords: ['cuestionario', 'informe anual', 'fideicomiso', 'rendición de cuentas'],
    order: 88,
    segments: [
      seg(
        '88',
        'El Consejo de Administración Fiduciaria formulará un cuestionario sobre el adelanto político, económico, social y educativo de los habitantes de cada territorio fideicometido; y la autoridad administradora de cada territorio fideicometido dentro de la competencia de la Asamblea General, rendirá a ésta un informe anual sobre la base de dicho cuestionario.',
        'El Consejo diseña un cuestionario anual de progreso; el administrador de cada territorio debe completarlo y presentar un informe a la Asamblea.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-89',
    lawId: 'carta-onu',
    number: '89',
    title: 'Votación en el Consejo de Administración Fiduciaria',
    text:
      'Cada miembro del Consejo de Administración Fiduciaria tendrá un voto.\nLas decisiones del Consejo de Administración Fiduciaria serán tomadas por el voto de la mayoría de los miembros presentes y votantes.',    plainLanguageExplanation:
      'Cada miembro tiene un voto y las decisiones se aprueban por mayoría simple de los presentes y votantes. No hay veto como en el Consejo de Seguridad.',
    practicalEffects: [
      'Sistema mayoritario sin derecho de veto: más democrático que el Consejo de Seguridad.',
      'El quórum efectivo depende de cuántos miembros estén presentes.',
    ],
    examples: [
      'El Consejo de Administración Fiduciaria podía aprobar recomendaciones críticas sobre una potencia administradora con simple mayoría.',
    ],
    relatedArticles: ['carta-onu-art-86', 'carta-onu-art-90'],
    jurisprudence: [],
    regulations: [],
    keywords: ['votación', 'mayoría', 'Consejo de Administración Fiduciaria'],
    order: 89,
    segments: [
      seg(
        '89',
        'Cada miembro del Consejo de Administración Fiduciaria tendrá un voto.\nLas decisiones del Consejo de Administración Fiduciaria serán tomadas por el voto de la mayoría de los miembros presentes y votantes.',
        'Un miembro, un voto; se decide por mayoría simple de los presentes, sin derecho de veto.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-90',
    lawId: 'carta-onu',
    number: '90',
    title: 'Procedimiento del Consejo de Administración Fiduciaria',
    text:
      'El Consejo de Administración Fiduciaria dictará su propio reglamento, el cual establecerá el método de elegir su Presidente.\nEl Consejo de Administración Fiduciaria se reunirá cuando sea necesario, según su reglamento. Este contendrá disposiciones sobre convocación del Consejo a solicitud de la mayoría de sus miembros.',    plainLanguageExplanation:
      'El Consejo de Administración Fiduciaria tiene autonomía para redactar su propio reglamento interno, elegir a su Presidente y decidir cuándo reunirse, con la posibilidad de ser convocado por mayoría de sus miembros.',
    practicalEffects: [
      'El Consejo tiene autonomía procedimental similar a la de la Asamblea General.',
      'La mayoría de miembros puede forzar una convocatoria extraordinaria.',
    ],
    examples: [
      'El Consejo adoptó su reglamento de procedimiento en 1947 y eligió a su primer Presidente en su sesión inaugural.',
    ],
    relatedArticles: ['carta-onu-art-89', 'carta-onu-art-91'],
    jurisprudence: [],
    regulations: [],
    keywords: ['procedimiento', 'reglamento', 'Presidente', 'convocación', 'Consejo de Administración Fiduciaria'],
    order: 90,
    segments: [
      seg(
        '90',
        'El Consejo de Administración Fiduciaria dictará su propio reglamento, el cual establecerá el método de elegir su Presidente.\nEl Consejo de Administración Fiduciaria se reunirá cuando sea necesario, según su reglamento. Este contendrá disposiciones sobre convocación del Consejo a solicitud de la mayoría de sus miembros.',
        'El Consejo elabora su propio reglamento, elige a su Presidente y se reúne cuando lo exigen las circunstancias o lo pide la mayoría de sus miembros.',
        null,
      ),
    ],
    amendments: [],
  },
];
