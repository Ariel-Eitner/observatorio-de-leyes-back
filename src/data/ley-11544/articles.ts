import type { Article } from '../../common/types/law.types';

export const ARTICLES_11544: Article[] = [
  {
    id: 'art-11544-1',
    lawId: 'ley-11544',
    number: '1',
    title: 'Jornada máxima',
    text:
      'La duración del trabajo no podrá exceder de ocho horas diarias o cuarenta y ocho horas semanales para toda persona ocupada por cuenta ajena en explotaciones públicas o privadas, aunque no persigan fines de lucro. No están comprendidos en las disposiciones de esta ley los trabajos agrícolas, ganaderos y los del servicio doméstico, ni los establecimientos en que trabajen solamente miembros de la familia del jefe, dueño, empresario, gerente, director o habilitado principal.',
    plainLanguageExplanation:
      'Ningún trabajador en relación de dependencia puede ser obligado a trabajar más de 8 horas por día ni más de 48 horas por semana. Las excepciones son el trabajo agrícola, ganadero, doméstico y los negocios de familia.',
    practicalEffects: [
      'El límite es de 8 horas diarias O 48 semanales — ambas condiciones deben respetarse',
      'Se aplica a todos los sectores de actividad salvo las exclusiones expresas',
      'Los convenios colectivos pueden reducir (no ampliar) estos límites',
    ],
    examples: [
      'Un comercio que exige 9 horas diarias 5 días a la semana (45 hs/semana) viola el límite diario aunque no supere el semanal',
      'Una empresa que distribuye 48 horas en 4 días de 12 horas viola el límite diario',
    ],
    relatedArticles: ['art-11544-2', 'art-11544-3', 'art-11544-5'],
    jurisprudence: [],
    regulations: ['Decreto 16.115/1933'],
    keywords: ['jornada máxima', '8 horas', '48 horas', 'trabajo en relación de dependencia'],
    order: 1,
    segments: [
      {
        id: 'seg-11544-1-0',
        lawId: 'ley-11544',
        articleId: 'art-11544-1',
        articleNumber: '1',
        segmentType: 'PARAGRAPH',
        text:
          'La duración del trabajo no podrá exceder de ocho horas diarias o cuarenta y ocho horas semanales para toda persona ocupada por cuenta ajena en explotaciones públicas o privadas, aunque no persigan fines de lucro.',
        plainExplanation:
          'Límite legal: 8 horas por día y 48 por semana para todo trabajador dependiente.',
        practicalExample:
          'Una empresa que obliga a su personal a trabajar 9 horas por día está violando esta ley; la hora extra debe pagarse con recargo.',
        references: [],
        order: 0,
      },
    ],
    amendments: [],
  },
  {
    id: 'art-11544-2',
    lawId: 'ley-11544',
    number: '2',
    title: 'Jornada nocturna',
    text:
      'La jornada de trabajo nocturno no podrá exceder de siete horas, entendiéndose como tal la que se cumpla entre la hora veintiuna de un día y la hora seis del siguiente. Cuando el trabajo sea por equipos, la jornada podrá prolongarse más allá de las nueve horas diarias y de las cuarenta y ocho horas semanales, siempre que el promedio de horas trabajadas calculado para un período de tres semanas, no exceda de ocho horas diarias o de cuarenta y ocho semanales.',
    plainLanguageExplanation:
      'El trabajo nocturno (entre las 21 y las 6 hs) tiene un límite de 7 horas diarias. En el trabajo por turnos rotativos se permite superar las 8 horas diarias, siempre que el promedio en 3 semanas no exceda las 8 h/día o 48 h/semana.',
    practicalEffects: [
      'Todo el trabajo entre las 21 hs y las 6 hs del día siguiente se considera nocturno',
      'En horario mixto: cada hora nocturna equivale a 1 hora 8 minutos de la jornada diurna',
      'El trabajo por equipos (3 turnos) puede superar el límite diario si el promedio trimestral lo respeta',
    ],
    examples: [
      'Guardia de seguridad que trabaja de 22 a 6 → 8 horas de las cuales todas son nocturnas → excede el límite de 7h; la octava hora es extraordinaria',
      'Operario en sistema 3x8 que en una semana trabaja 56 horas → válido si el promedio de 3 semanas es ≤ 48h',
    ],
    relatedArticles: ['art-11544-1', 'art-11544-3'],
    jurisprudence: [],
    regulations: [],
    keywords: ['jornada nocturna', 'trabajo nocturno', '7 horas', 'equipos', 'turnos rotativos'],
    order: 2,
    segments: [
      {
        id: 'seg-11544-2-0',
        lawId: 'ley-11544',
        articleId: 'art-11544-2',
        articleNumber: '2',
        segmentType: 'PARAGRAPH',
        text:
          'La jornada de trabajo nocturno no podrá exceder de siete horas, entendiéndose como tal la que se cumpla entre la hora veintiuna de un día y la hora seis del siguiente.',
        plainExplanation:
          'El trabajo nocturno (21 hs a 6 hs) tiene máximo de 7 horas diarias, una hora menos que la jornada diurna.',
        practicalExample:
          'Un trabajador que hace guardia de 22 a 5 cumple exactamente 7 horas nocturnas — dentro del límite legal.',
        references: [],
        order: 0,
      },
    ],
    amendments: [],
  },
  {
    id: 'art-11544-3',
    lawId: 'ley-11544',
    number: '3',
    title: 'Excepciones al límite de jornada',
    text:
      'Las excepciones a lo dispuesto en el artículo 1 podrán aplicarse en los casos siguientes:\na) Cuando se trate de trabajos preparatorios o complementarios que deban ejecutarse necesariamente fuera del límite asignado al trabajo general del establecimiento;\nb) En caso de accidente ocurrido o inminente, o de trabajo de urgencia a efectuarse en las máquinas, herramientas o instalaciones, o en caso de fuerza mayor; pero solamente en la medida necesaria para evitar que este inconveniente grave obstaculice el funcionamiento del establecimiento;\nc) Cuando sobrevenga un aumento extraordinario de trabajo que no pueda ser atendido por la contratación de nuevo personal.',
    plainLanguageExplanation:
      'Se permiten excepciones al límite de 8 horas en 3 casos: (a) tareas preparatorias necesariamente fuera del horario central, (b) accidentes o urgencias técnicas, y (c) picos extraordinarios de trabajo que no pueden cubrirse con personal adicional.',
    practicalEffects: [
      'Las excepciones habilitan jornada extendida pero siempre con pago de horas extras',
      'El caso (c) no justifica la extensión permanente — debe ser un evento extraordinario',
      'El límite absoluto de horas extra está en el decreto reglamentario y convenios colectivos',
    ],
    examples: [
      'Un operario que debe encender la caldera antes de que llegue el turno regular (trabajo preparatorio) puede trabajar fuera del horario central',
      'Un técnico que repara una falla eléctrica de emergencia puede extender su jornada sin límite temporal por la urgencia',
    ],
    relatedArticles: ['art-11544-1', 'art-11544-4'],
    jurisprudence: [],
    regulations: ['Decreto 16.115/1933'],
    keywords: ['excepciones', 'horas extras', 'urgencia', 'fuerza mayor', 'trabajos preparatorios'],
    order: 3,
    segments: [
      {
        id: 'seg-11544-3-0',
        lawId: 'ley-11544',
        articleId: 'art-11544-3',
        articleNumber: '3',
        segmentType: 'PARAGRAPH',
        text:
          'Las excepciones a lo dispuesto en el artículo 1 podrán aplicarse en los casos siguientes: a) trabajos preparatorios; b) accidente o urgencia; c) aumento extraordinario de trabajo.',
        plainExplanation:
          'El límite de 8 horas puede superarse en casos de trabajos preparatorios, urgencias técnicas o picos imprevistos de demanda.',
        practicalExample: null,
        references: [],
        order: 0,
      },
    ],
    amendments: [],
  },
  {
    id: 'art-11544-4',
    lawId: 'ley-11544',
    number: '4',
    title: 'Trabajo insalubre',
    text:
      'En ningún caso el trabajo insalubre podrá durar más de seis horas diarias o treinta y seis semanales. La insalubridad no existirá sin declaración previa de la autoridad de aplicación, con fundamento en dictámenes médicos de rigor científico.',
    plainLanguageExplanation:
      'El trabajo en condiciones insalubres tiene un límite de 6 horas diarias o 36 semanales. La insalubridad no puede declararse unilateralmente: requiere una declaración oficial previa basada en estudios médicos.',
    practicalEffects: [
      'La jornada insalubre es 2 horas menos por día que la normal; la hora 7 en adelante es extraordinaria con 100% de recargo',
      'La declaración de insalubridad es prerrogativa exclusiva de la autoridad laboral (Ministerio de Trabajo)',
      'Trabajar en condición insalubre sin reducción de jornada habilita reclamo del trabajador',
    ],
    examples: [
      'Operario en contacto con productos químicos tóxicos en una planta declarada insalubre → su jornada máxima es 6 horas; si trabaja 8, las 2 horas extras se pagan con 100% de recargo',
      'Un empleador no puede declarar por sí mismo que el lugar es insalubre — lo hace el inspector de trabajo con respaldo médico',
    ],
    relatedArticles: ['art-11544-1', 'art-11544-5'],
    jurisprudence: [],
    regulations: [],
    keywords: ['trabajo insalubre', '6 horas', 'insalubridad', 'declaración de insalubridad', 'autoridad de aplicación'],
    order: 4,
    segments: [
      {
        id: 'seg-11544-4-0',
        lawId: 'ley-11544',
        articleId: 'art-11544-4',
        articleNumber: '4',
        segmentType: 'PARAGRAPH',
        text:
          'En ningún caso el trabajo insalubre podrá durar más de seis horas diarias o treinta y seis semanales. La insalubridad no existirá sin declaración previa de la autoridad de aplicación, con fundamento en dictámenes médicos de rigor científico.',
        plainExplanation:
          'Trabajo insalubre: máximo 6 horas por día. Requiere declaración oficial — no alcanza con que el lugar sea objetivamente peligroso.',
        practicalExample:
          'Un minero en galería declarada insalubre no puede trabajar más de 6 horas; si lo hace, las horas adicionales se pagan con 100% de recargo.',
        references: [],
        order: 0,
      },
    ],
    amendments: [],
  },
  {
    id: 'art-11544-5',
    lawId: 'ley-11544',
    number: '5',
    title: 'Horas extraordinarias',
    text:
      'Las horas extraordinarias serán remuneradas con un aumento del cincuenta por ciento (50%) sobre el salario habitual si se tratare de días comunes, y del ciento por ciento (100%) en días sábados después de las trece horas, domingos y feriados. El máximo de horas extras será fijado por reglamentación.',
    plainLanguageExplanation:
      'Las horas trabajadas fuera de la jornada legal se pagan con recargo: 50% adicional en días hábiles, 100% adicional en sábados desde las 13 hs, domingos y feriados. El tope de horas extra por semana/mes lo fija la reglamentación.',
    practicalEffects: [
      'El recargo del 50% aplica sobre el valor de la hora normal (básico + adicionales proporcionales)',
      'El 100% de recargo aplica a todas las horas trabajadas en sábado después de las 13 hs, domingo o feriado',
      'El tope de horas extras (actualmente 3 h/día y 30 h/mes según Dec. 484/2000) es independiente del recargo',
    ],
    examples: [
      'Trabajador con salario de $1.000 la hora en día hábil trabaja 2 horas extra → cobra $1.500 por hora extra = $3.000 adicionales',
      'El mismo trabajador trabaja 4 horas el domingo → cobra $2.000 por hora = $8.000 adicionales',
    ],
    relatedArticles: ['art-11544-1', 'art-11544-3'],
    jurisprudence: [],
    regulations: ['Decreto 484/2000 (tope de horas extraordinarias)', 'Decreto 16.115/1933'],
    keywords: ['horas extra', 'horas extraordinarias', 'recargo 50%', 'recargo 100%', 'feriados', 'trabajo en domingo'],
    order: 5,
    segments: [
      {
        id: 'seg-11544-5-0',
        lawId: 'ley-11544',
        articleId: 'art-11544-5',
        articleNumber: '5',
        segmentType: 'PARAGRAPH',
        text:
          'Las horas extraordinarias serán remuneradas con un aumento del cincuenta por ciento (50%) sobre el salario habitual si se tratare de días comunes, y del ciento por ciento (100%) en días sábados después de las trece horas, domingos y feriados.',
        plainExplanation:
          'Horas extra: +50% en días hábiles, +100% en sábados desde las 13 hs, domingos y feriados.',
        practicalExample:
          'Un trabajador que cobra $1.000/hora y hace 2 horas extra un miércoles cobra $3.000 adicionales (2 × $1.500).',
        references: [],
        order: 0,
      },
    ],
    amendments: [],
  },
  {
    id: 'art-11544-6',
    lawId: 'ley-11544',
    number: '6',
    title: 'Trabajo de mujeres y menores (DEROGADO)',
    text: '[Derogado por Ley 27.802]',
    plainLanguageExplanation:
      'Este artículo fue derogado por la Ley 27.802 (Modernización Laboral). Las disposiciones sobre trabajo de mujeres y menores se encuentran actualmente en la Ley de Contrato de Trabajo (arts. 172-182 para mujeres y arts. 187-195 para menores) y legislación específica.',
    practicalEffects: [
      'El artículo ya no tiene vigencia',
      'Las normas sobre trabajo femenino se encuentran en la LCT y en legislación de igualdad de género',
    ],
    examples: [],
    relatedArticles: [],
    jurisprudence: [],
    regulations: [],
    keywords: ['derogado', 'ley 27802'],
    order: 6,
    segments: [
      {
        id: 'seg-11544-6-0',
        lawId: 'ley-11544',
        articleId: 'art-11544-6',
        articleNumber: '6',
        segmentType: 'PARAGRAPH',
        text: '[Derogado por Ley 27.802]',
        plainExplanation: 'Artículo derogado. Sin vigencia.',
        practicalExample: null,
        references: [],
        order: 0,
      },
    ],
    amendments: [],
  },
  {
    id: 'art-11544-7',
    lawId: 'ley-11544',
    number: '7',
    title: 'Autoridad de aplicación',
    text:
      'El Poder Ejecutivo determinará las autoridades encargadas de velar por el cumplimiento de las disposiciones de la presente ley y les acordará las facultades necesarias al efecto.',
    plainLanguageExplanation:
      'El Poder Ejecutivo designa los organismos de control del cumplimiento de la ley. Actualmente la autoridad es el Ministerio de Trabajo y los inspectoratos provinciales.',
    practicalEffects: [
      'El Ministerio de Trabajo ejerce la inspección laboral a nivel nacional',
      'Las provincias tienen sus propias inspecciones laborales por convenio de delegación',
    ],
    examples: [],
    relatedArticles: [],
    jurisprudence: [],
    regulations: [],
    keywords: ['autoridad de aplicación', 'Ministerio de Trabajo', 'inspección laboral'],
    order: 7,
    segments: [
      {
        id: 'seg-11544-7-0',
        lawId: 'ley-11544',
        articleId: 'art-11544-7',
        articleNumber: '7',
        segmentType: 'PARAGRAPH',
        text:
          'El Poder Ejecutivo determinará las autoridades encargadas de velar por el cumplimiento de las disposiciones de la presente ley y les acordará las facultades necesarias al efecto.',
        plainExplanation: 'El Poder Ejecutivo designa quién fiscaliza el cumplimiento de la jornada laboral.',
        practicalExample: null,
        references: [],
        order: 0,
      },
    ],
    amendments: [],
  },
  {
    id: 'art-11544-8',
    lawId: 'ley-11544',
    number: '8',
    title: 'Registros del empleador',
    text:
      'El empleador deberá llevar el registro de las horas de trabajo, indicando el comienzo y la terminación de la jornada y las horas extraordinarias prestadas.',
    plainLanguageExplanation:
      'El empleador está obligado a registrar la jornada de cada trabajador: hora de entrada, hora de salida y horas extras. Ese registro sirve de prueba en caso de litigio laboral.',
    practicalEffects: [
      'La ausencia de registro de jornada opera como presunción a favor del trabajador en litigios por horas extras',
      'El registro debe estar disponible para la inspección laboral',
    ],
    examples: [
      'Empresa sin libro de horas → en juicio por horas extra, el trabajador solo debe aportar indicios; el empleador no puede probar lo contrario si no tiene registros',
    ],
    relatedArticles: [],
    jurisprudence: [],
    regulations: [],
    keywords: ['registro de jornada', 'libro de horas', 'horas extraordinarias', 'empleador'],
    order: 8,
    segments: [
      {
        id: 'seg-11544-8-0',
        lawId: 'ley-11544',
        articleId: 'art-11544-8',
        articleNumber: '8',
        segmentType: 'PARAGRAPH',
        text:
          'El empleador deberá llevar el registro de las horas de trabajo, indicando el comienzo y la terminación de la jornada y las horas extraordinarias prestadas.',
        plainExplanation:
          'El empleador debe registrar entrada, salida y horas extras de cada empleado.',
        practicalExample:
          'El libro de horas o el sistema de fichaje electrónico cumplen esta obligación. Sin registro, el empleador pierde la prueba en un juicio por horas extra.',
        references: [],
        order: 0,
      },
    ],
    amendments: [],
  },
  {
    id: 'art-11544-9',
    lawId: 'ley-11544',
    number: '9',
    title: 'Sanciones',
    text:
      'Las infracciones a esta ley serán penadas con multa que se fijará entre un mínimo de dos días y un máximo de veinte días del salario mínimo vital y móvil, por cada obrero empleado en infracción.',
    plainLanguageExplanation:
      'El empleador que viole los límites de jornada enfrenta multas calculadas sobre el salario mínimo vital y móvil, por cada trabajador afectado. La multa va de 2 a 20 días de salario mínimo por trabajador.',
    practicalEffects: [
      'La multa es por trabajador infractor, no global',
      'Una empresa con 50 empleados trabajando ilegalmente 9 horas puede enfrentar una multa de hasta 1.000 días de salario mínimo',
      'Las multas se actualizan al valor del SMVM vigente al momento de la infracción',
    ],
    examples: [],
    relatedArticles: [],
    jurisprudence: [],
    regulations: [],
    keywords: ['multa', 'sanción', 'salario mínimo vital y móvil', 'infracción laboral'],
    order: 9,
    segments: [
      {
        id: 'seg-11544-9-0',
        lawId: 'ley-11544',
        articleId: 'art-11544-9',
        articleNumber: '9',
        segmentType: 'PARAGRAPH',
        text:
          'Las infracciones a esta ley serán penadas con multa que se fijará entre un mínimo de dos días y un máximo de veinte días del salario mínimo vital y móvil, por cada obrero empleado en infracción.',
        plainExplanation:
          'Multa de 2 a 20 días de SMVM por cada empleado que trabaje más horas de las permitidas.',
        practicalExample:
          'Si el SMVM es $500/día y hay 10 empleados trabajando ilegalmente, la multa máxima es $500 × 20 × 10 = $100.000.',
        references: [],
        order: 0,
      },
    ],
    amendments: [],
  },
  {
    id: 'art-11544-10',
    lawId: 'ley-11544',
    number: '10',
    title: 'Reincidencia',
    text:
      'En caso de reincidencia, la multa podrá elevarse hasta el doble del máximo establecido en el artículo anterior.',
    plainLanguageExplanation:
      'Si el empleador reincide en violar la jornada, la multa puede duplicarse respecto del máximo normal (hasta 40 días de SMVM por trabajador).',
    practicalEffects: ['La reincidencia agrava significativamente la sanción económica'],
    examples: [],
    relatedArticles: ['art-11544-9'],
    jurisprudence: [],
    regulations: [],
    keywords: ['reincidencia', 'multa agravada'],
    order: 10,
    segments: [
      {
        id: 'seg-11544-10-0',
        lawId: 'ley-11544',
        articleId: 'art-11544-10',
        articleNumber: '10',
        segmentType: 'PARAGRAPH',
        text:
          'En caso de reincidencia, la multa podrá elevarse hasta el doble del máximo establecido en el artículo anterior.',
        plainExplanation: 'Reincidencia: multa hasta 40 días de SMVM por trabajador.',
        practicalExample: null,
        references: [],
        order: 0,
      },
    ],
    amendments: [],
  },
  {
    id: 'art-11544-11',
    lawId: 'ley-11544',
    number: '11',
    title: 'Clausura',
    text:
      'En caso de nueva reincidencia, el establecimiento podrá ser clausurado por el tiempo que determine la autoridad de aplicación.',
    plainLanguageExplanation:
      'Si el empleador reincide por segunda vez (es decir, incumple reiteradamente), la autoridad laboral puede clausurar el establecimiento por el tiempo que considere necesario.',
    practicalEffects: ['La clausura es una sanción excepcional pero disponible para infracciones reiteradas'],
    examples: [],
    relatedArticles: ['art-11544-9', 'art-11544-10'],
    jurisprudence: [],
    regulations: [],
    keywords: ['clausura', 'sanción', 'reincidencia'],
    order: 11,
    segments: [
      {
        id: 'seg-11544-11-0',
        lawId: 'ley-11544',
        articleId: 'art-11544-11',
        articleNumber: '11',
        segmentType: 'PARAGRAPH',
        text:
          'En caso de nueva reincidencia, el establecimiento podrá ser clausurado por el tiempo que determine la autoridad de aplicación.',
        plainExplanation: 'Reincidencia múltiple: clausura del local por tiempo determinado por el inspector.',
        practicalExample: null,
        references: [],
        order: 0,
      },
    ],
    amendments: [],
  },
  {
    id: 'art-11544-12',
    lawId: 'ley-11544',
    number: '12',
    title: 'Ámbito de aplicación territorial',
    text:
      'La presente ley es de aplicación en todo el territorio de la Nación Argentina.',
    plainLanguageExplanation:
      'La ley rige en todo el país. No es una ley provincial sino federal de derecho del trabajo.',
    practicalEffects: [
      'Aplica a todos los empleadores del sector privado en cualquier provincia',
      'Las provincias no pueden reducir los derechos que ella establece',
    ],
    examples: [],
    relatedArticles: [],
    jurisprudence: [],
    regulations: [],
    keywords: ['ámbito nacional', 'territorio nacional'],
    order: 12,
    segments: [
      {
        id: 'seg-11544-12-0',
        lawId: 'ley-11544',
        articleId: 'art-11544-12',
        articleNumber: '12',
        segmentType: 'PARAGRAPH',
        text: 'La presente ley es de aplicación en todo el territorio de la Nación Argentina.',
        plainExplanation: 'Rige en todo el país como ley federal de trabajo.',
        practicalExample: null,
        references: [],
        order: 0,
      },
    ],
    amendments: [],
  },
  {
    id: 'art-11544-13',
    lawId: 'ley-11544',
    number: '13',
    title: 'Comunicación',
    text: 'Comuníquese al Poder Ejecutivo.',
    plainLanguageExplanation: 'Artículo de forma para la promulgación de la ley.',
    practicalEffects: [],
    examples: [],
    relatedArticles: [],
    jurisprudence: [],
    regulations: [],
    keywords: [],
    order: 13,
    segments: [
      {
        id: 'seg-11544-13-0',
        lawId: 'ley-11544',
        articleId: 'art-11544-13',
        articleNumber: '13',
        segmentType: 'PARAGRAPH',
        text: 'Comuníquese al Poder Ejecutivo.',
        plainExplanation: 'Artículo de forma para la promulgación.',
        practicalExample: null,
        references: [],
        order: 0,
      },
    ],
    amendments: [],
  },
];
