import type { Law } from '../common/types/law.types';

const LAW_ID = 'ley-27802';

// ════════════════════════════════════════════════════════════════════════════
//  LEY 27802 — Ley de Modernización Laboral
//  Sancionada: febrero 2026  |  Promulgada y publicada: 06/03/2026 (BO 339128)
//  Ámbito: modifica LCT (Ley 20.744), crea el FAL, reforma procesal laboral,
//          modifica Leyes 24.013, 11.544 y 25.877.
// ════════════════════════════════════════════════════════════════════════════

export const LEY_27802: Law = {
  id: LAW_ID,
  number: '27802',
  title: 'Ley de Modernización Laboral',
  summary:
    'Reforma integral del derecho del trabajo argentino. Modifica la Ley de Contrato de Trabajo (20.744), crea el Fondo de Asistencia Laboral (FAL), introduce nuevas modalidades contractuales, regula el trabajo en plataformas digitales, reforma el proceso laboral y actualiza las normas de jornada e indemnizaciones.',
  year: 2026,
  sanctionDate: '2026-02-26',
  promulgationDate: '2026-03-06',
  publicationDate: '2026-03-06',
  boNumber: '339128',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/ley-27802-339128/texto',
  articleCount: 102,
  topics: [
    'Derecho laboral',
    'Contrato de trabajo',
    'Trabajo en plataformas digitales',
    'Indemnizaciones laborales',
    'Jornada laboral',
    'Fondo de Asistencia Laboral',
    'Proceso laboral',
    'Capacitación profesional',
  ],
  keywords: [
    'contrato de trabajo',
    'LCT',
    'modernización laboral',
    'plataformas digitales',
    'FAL',
    'fondo asistencia laboral',
    'indemnización',
    'despido',
    'jornada',
    'período de prueba',
    'teletrabajo',
    'capacitación',
    'reforma laboral',
    'trabajador',
    'empleador',
  ],
  relatedNorms: [
    'Ley 20744 (LCT)',
    'Ley 24013',
    'Ley 11544',
    'Ley 25877',
    'Decreto 330/2026',
  ],
  executiveSummary:
    'La Ley 27802 es la reforma laboral más amplia desde la sanción de la LCT en 1976. Modifica más de 50 artículos de la Ley de Contrato de Trabajo, introduce el trabajo en plataformas como categoría legal propia, crea el Fondo de Asistencia Laboral (FAL) para financiar un seguro de desempleo ampliado, flexibiliza el período de prueba a 6 meses y establece nuevas modalidades de contratación a tiempo parcial y por proyecto.',
  objective:
    'Adecuar el marco normativo laboral argentino a las nuevas formas de organización del trabajo, reducir el empleo informal, simplificar el régimen de contratación y fortalecer la capacitación profesional continua.',
  problemItSolves:
    'El régimen de la LCT de 1976 no contemplaba el trabajo en plataformas digitales, el teletrabajo estructural ni las nuevas formas de empleo flexible. Las altas cargas indemnizatorias favorecían el empleo informal. El proceso laboral era lento y costoso. La reforma busca modernizar esos aspectos sin reducir derechos esenciales.',
  practicalImpact:
    'Afecta a todos los trabajadores en relación de dependencia del sector privado nacional. Los trabajadores de plataformas (delivery, transporte, servicios digitales) pasan a tener categoría legal propia. El período de prueba se extiende a 6 meses. Las indemnizaciones se calculan con tope actualizable. El FAL aporta un seguro de transición entre empleos.',
  affectedSubjects: [
    'Trabajadores en relación de dependencia del sector privado',
    'Trabajadores de plataformas digitales (delivery, transporte, etc.)',
    'Empleadores del sector privado',
    'Empresas de plataformas digitales',
    'Trabajadores a tiempo parcial',
    'Sindicatos y organizaciones gremiales',
    'Juzgados laborales nacionales y provinciales',
  ],
  createdAt: '2026-03-06T00:00:00.000Z',
  updatedAt: '2026-03-06T00:00:00.000Z',

  // ── Amendments ────────────────────────────────────────────────────────────
  amendments: [],

  // ── Annexes ───────────────────────────────────────────────────────────────
  annexes: [
    {
      id: 'anx-27802-1',
      lawId: LAW_ID,
      number: 'I',
      title: 'Artículos modificados de la Ley de Contrato de Trabajo (Ley 20.744)',
      content:
        'La Ley 27802 modifica los siguientes artículos de la LCT: 2 (ámbito), 4 (trabajo), 9 (in dubio pro operario), 11 (principios supletorios), 12 (irrenunciabilidad), 15 (transacción), 16 (nulidad), 18 (empresa), 20 (gratuidad), 21 a 30 (contrato de trabajo), y numerosos artículos relativos a jornada, remuneración, vacaciones, extinción del contrato e indemnizaciones. Incorpora arts. 11 bis (capacitación), 92 ter (tiempo parcial actualizado) y 198 bis (plataformas digitales).',
      order: 1,
    },
    {
      id: 'anx-27802-2',
      lawId: LAW_ID,
      number: 'II',
      title: 'Fondo de Asistencia Laboral (FAL) — Arts. 33 a 57',
      content:
        'El Título II de la ley (arts. 33-57) crea el Fondo de Asistencia Laboral (FAL), administrado por la AFIP/ARCA y la Secretaría de Trabajo. El FAL se financia con un aporte del 0,5% de la masa salarial del empleador y brinda: (a) prestaciones de transición laboral para trabajadores desvinculados, (b) subsidios de capacitación, (c) financiamiento de reconversión laboral. Es complementario al seguro de desempleo de la Ley 24.013.',
      order: 2,
    },
  ],

  // ── Segments (ley-level) ──────────────────────────────────────────────────
  segments: [],

  // ── Metadata ──────────────────────────────────────────────────────────────
  metadata: {
    id: 'meta-27802',
    lawId: LAW_ID,
    mainTopic: 'Modernización del derecho laboral argentino',
    subtopics: [
      'Contrato de trabajo — principios generales',
      'Trabajo en plataformas digitales',
      'Período de prueba',
      'Jornada laboral y teletrabajo',
      'Indemnizaciones por despido',
      'Fondo de Asistencia Laboral (FAL)',
      'Proceso laboral — reforma',
      'Capacitación profesional',
      'Trabajo a tiempo parcial',
    ],
    relatedLaws: [
      'Ley 20744 - Ley de Contrato de Trabajo (modificada)',
      'Ley 24013 - Ley Nacional de Empleo (modificada)',
      'Ley 11544 - Jornada de Trabajo (modificada)',
      'Ley 25877 - Ordenamiento Laboral (modificada)',
      'Ley 27555 - Teletrabajo (relación)',
      'Ley 27742 - Bases y Puntos de Partida (antecedente)',
    ],
    regulations: ['Decreto 330/2026 (reglamentario)'],
    modifyingNorms: [],
    derogatingNorms: [],
    jurisprudence: [],
    doctrine: [],
    obligations: [
      'Registrar a los trabajadores de plataformas en el nuevo régimen del art. 198 bis LCT',
      'Aportar el 0,5% de masa salarial al FAL',
      'Respetar el período de prueba de 6 meses antes de estabilizar al trabajador',
      'Brindar capacitación profesional obligatoria anual según art. 11 bis LCT',
      'Adecuar contratos de tiempo parcial a la nueva regulación del art. 92 ter LCT',
    ],
    rights: [
      'Derecho a la capacitación profesional continua (art. 11 bis LCT)',
      'Derecho a prestaciones del FAL en caso de desvinculación involuntaria',
      'Derecho de los trabajadores de plataformas a condiciones mínimas de la LCT',
      'Derecho a tiempo parcial con proporcionalidad salarial y aportes',
      'Derecho a indemnización actualizable por tope referenciado a RIPTE',
    ],
    sanctions: [
      'Multas laborales actualizadas por incumplimiento de registración (arts. 8-10 Ley 24.013)',
      'Responsabilidad solidaria del usuario de plataformas por incumplimientos del operador (art. 198 bis LCT)',
      'Sanciones procesales por conducta dilatoria en el nuevo proceso laboral (arts. 78-94)',
    ],
    useCases: [
      'Soy repartidor de una app de delivery → ahora tengo encuadramiento legal propio con derechos mínimos garantizados',
      'Mi empresa contrató empleado con período de prueba → puede extenderse hasta 6 meses sin indemnización',
      'Fui despedido sin causa → si aporté al FAL tengo acceso a prestación de transición laboral',
      'Trabajo part-time 20 horas → mis aportes y vacaciones son proporcionales según el nuevo art. 92 ter LCT',
      'Mi empleador no me capacitó → puedo reclamar por incumplimiento del art. 11 bis LCT',
    ],
    faq: [
      {
        question: '¿La Ley 27802 elimina derechos de los trabajadores?',
        answer:
          'No. La ley mantiene los principios protectorios del derecho laboral (indubio pro operario, irrenunciabilidad) y los refuerza en algunos aspectos como capacitación. Las modificaciones buscan adecuar las formas contractuales sin reducir derechos adquiridos.',
      },
      {
        question: '¿Los trabajadores de plataformas son ahora empleados en relación de dependencia?',
        answer:
          'La ley crea una categoría especial (art. 198 bis LCT) para los trabajadores de plataformas digitales, con derechos mínimos propios. No son automáticamente empleados en relación de dependencia clásica, pero sí tienen garantías concretas: obra social, ART, seguro de vida y aportes al FAL.',
      },
      {
        question: '¿Cuánto tiempo dura ahora el período de prueba?',
        answer:
          'El período de prueba pasa de 3 a 6 meses (o hasta 12 meses en PyMEs para el primer empleado). Durante ese período el empleador puede extinguir el contrato sin causa y sin pagar indemnización por despido.',
      },
      {
        question: '¿Qué es el FAL y cómo accedo a sus prestaciones?',
        answer:
          'El Fondo de Asistencia Laboral es un fondo financiado por los empleadores (0,5% de masa salarial). Si sos despedido sin causa o tu empleador quiebra, podés acceder a prestaciones de transición que complementan el seguro de desempleo de la Ley 24.013, siempre que el empleador haya realizado los aportes correspondientes.',
      },
      {
        question: '¿Cambió el cálculo de las indemnizaciones por despido?',
        answer:
          'La base de cálculo se mantiene (mejor remuneración mensual normal y habitual), pero se actualiza el tope máximo: pasa a estar referenciado al RIPTE (Remuneración Imponible Promedio de los Trabajadores Estables) en lugar de ser un múltiplo fijo del salario mínimo.',
      },
    ],
    createdAt: '2026-03-06T00:00:00.000Z',
    updatedAt: '2026-03-06T00:00:00.000Z',
  },

  // ── Articles ──────────────────────────────────────────────────────────────
  articles: [

    // ══════════════════════════════════════════════════════════════
    //  TÍTULO I — MODIFICACIONES A LA LEY DE CONTRATO DE TRABAJO
    //  CAPÍTULO I — Ámbito, principios y definiciones (arts. 1-6)
    // ══════════════════════════════════════════════════════════════

    {
      id: 'art-27802-1',
      lawId: LAW_ID,
      number: '1',
      title: 'Ámbito de aplicación de la LCT',
      text:
        'Sustitúyese el artículo 2° de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificatorias, por el siguiente:\n"Artículo 2°.- Ámbito de aplicación. La vigencia de esta ley quedará condicionada a que la aplicación de sus disposiciones resulte compatible con la naturaleza y modalidades de la actividad de que se trate y con el específico régimen jurídico a que se encuentre sujeta. Las disposiciones de esta ley no serán aplicables:\na) A los dependientes de la Administración Pública Nacional, provincial, de la Ciudad Autónoma de Buenos Aires o municipal, excepto que por acto expreso se los incluya en la misma o en el régimen de las convenciones colectivas de trabajo;\nb) Al personal del servicio doméstico;\nc) A los trabajadores agrarios;\nd) A los trabajadores que se desempeñen en obras de construcción de conformidad con la normativa sectorial vigente;\ne) A los trabajadores independientes;\nf) A los trabajadores de plataformas digitales comprendidos en el artículo 198 bis de la presente ley;\ng) Al personal de la marina mercante y de la pesca;\nh) A las personas privadas de libertad durante el cumplimiento de penas."',      plainLanguageExplanation:
        'Este artículo actualiza quiénes están cubiertos por la LCT. La novedad principal es que los trabajadores de plataformas digitales (delivery, transporte, etc.) quedan excluidos de la LCT clásica porque ahora tienen su propio régimen especial en el art. 198 bis. El Estado, el servicio doméstico, los rurales y la construcción siguen con sus propias leyes especiales.',
      practicalEffects: [
        'Los trabajadores de plataformas (Rappi, PedidosYa, Uber, etc.) no se rigen por la LCT sino por el nuevo régimen especial del art. 198 bis',
        'Los estatutos especiales (construcción, agro, doméstico) siguen siendo la norma aplicable en esos sectores',
        'Toda actividad privada no excluida expresamente queda bajo la LCT',
      ],
      examples: [
        'Un repartidor de Rappi en 2026 ya no puede reclamar aplicación directa de la LCT, sino del régimen de plataformas',
        'Un empleado de comercio sigue bajo la LCT y su CCT sectorial',
        'Un empleado de la Municipalidad de Buenos Aires aplica su estatuto propio, no la LCT',
      ],
      relatedArticles: ['art-27802-29'],
      jurisprudence: [],
      regulations: ['Decreto 330/2026'],
      keywords: ['ámbito', 'aplicación', 'plataformas digitales', 'exclusiones', 'LCT'],
      order: 1,
      amendments: [],
      segments: [
        {
          id: 'seg-27802-1-0',
          lawId: LAW_ID,
          articleId: 'art-27802-1',
          articleNumber: '1',
          segmentType: 'PARAGRAPH',
          text:
            'Sustitúyese el artículo 2° de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) — nuevo inciso f): "A los trabajadores de plataformas digitales comprendidos en el artículo 198 bis de la presente ley".',
          plainExplanation:
            'Los repartidores y choferes de apps de plataforma ya no caen bajo la LCT general: tienen un régimen propio definido más adelante en la misma ley.',
          practicalExample:
            'Un repartidor de PedidosYa que antes podía reclamar relación de dependencia LCT ahora tiene un estatuto específico con sus propios derechos y obligaciones.',
          references: ['Art. 198 bis LCT (incorporado por art. 29 Ley 27802)'],
          order: 0,
        },
      ],
    },

    {
      id: 'art-27802-2',
      lawId: LAW_ID,
      number: '2',
      title: 'Definición de trabajo (art. 4 LCT)',
      text:
        'Sustitúyese el artículo 4° de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificatorias, por el siguiente:\n"Artículo 4°.- Concepto de trabajo. A los fines de esta ley, constituye trabajo toda actividad lícita que se preste en favor de quien tiene la facultad de dirigirla, mediante una remuneración. El contrato de trabajo tiene como principal objeto la actividad productiva y creadora del hombre en sí. Sólo después ha de entenderse que media entre las partes una relación de intercambio y un fin económico en cuanto se disciplina por esta ley."',      plainLanguageExplanation:
        'Redefine qué es "trabajo" para la LCT. La clave es "en favor de quien tiene la facultad de dirigirla": si alguien tiene poder de dar órdenes y vos las cumplís a cambio de dinero, hay trabajo dependiente bajo esta ley.',
      practicalEffects: [
        'La definición enfatiza la subordinación jurídica como elemento central del contrato de trabajo',
        'Mantiene el enfoque humanista: el trabajo es actividad humana creadora, no solo un intercambio económico',
      ],
      examples: [
        'Un programador que trabaja con horario, equipos de la empresa y supervisión directa tiene relación de dependencia aunque cobre por proyecto',
        'Un plomero autónomo que elige cuándo trabaja y con qué herramientas no encuadra en esta definición',
      ],
      relatedArticles: ['art-27802-3'],
      jurisprudence: [],
      regulations: [],
      keywords: ['trabajo', 'concepto', 'dependencia', 'subordinación', 'remuneración'],
      order: 2,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-3',
      lawId: LAW_ID,
      number: '3',
      title: 'Principio in dubio pro operario (art. 9 LCT)',
      text:
        'Sustitúyese el artículo 9° de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificatorias, por el siguiente:\n"Artículo 9°.- El principio de la norma más favorable para el trabajador. En caso de duda sobre la aplicación de normas legales o convencionales prevalecerá la más favorable al trabajador, considerándose la norma o conjuntos de normas que rija cada una de las instituciones del derecho del trabajo. Si la duda recayese en la interpretación o alcance de la ley, los jueces o encargados de aplicarla se decidirán en el sentido más favorable al trabajador."',      plainLanguageExplanation:
        'Cuando hay dos normas que podrían aplicarse, o cuando la ley es ambigua, siempre gana la interpretación que favorece al trabajador. Es el principio protectorio básico del derecho laboral argentino.',
      practicalEffects: [
        'Si un convenio colectivo da más derechos que la ley, aplica el convenio',
        'Si una cláusula del contrato individual es más favorable, aplica esa cláusula',
        'En juicio, ante la duda probatoria, el juez decide a favor del trabajador',
      ],
      examples: [
        'La ley dice 10 días de preaviso, el CCT dice 30 → el trabajador tiene derecho a 30 días',
        'El contrato dice que el bonus es "remunerativo", la empresa dice que no → se considera remunerativo',
      ],
      relatedArticles: ['art-27802-4'],
      jurisprudence: [],
      regulations: [],
      keywords: ['in dubio pro operario', 'norma más favorable', 'interpretación', 'principio protectorio'],
      order: 3,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-4',
      lawId: LAW_ID,
      number: '4',
      title: 'Principios supletorios (art. 11 LCT)',
      text:
        'Sustitúyese el artículo 11 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificatorias, por el siguiente:\n"Artículo 11.- Principios de interpretación y aplicación de la ley. Cuando una cuestión no pueda resolverse por aplicación de las normas que rigen el contrato de trabajo o por las leyes análogas, se decidirá conforme a los principios generales del derecho del trabajo, la equidad y la buena fe."',      plainLanguageExplanation:
        'Cuando la ley no tiene respuesta para algo, se recurre primero a los principios propios del derecho laboral y, subsidiariamente, a la equidad y la buena fe. Ya no se remite al derecho civil como antaño.',
      practicalEffects: [
        'El derecho laboral se autonomiza más del derecho civil como fuente supletoria',
        'Los principios propios del trabajo (protectorio, continuidad, primacía de la realidad) son la primera referencia ante lagunas',
      ],
      examples: [
        'Si surge una situación nueva no prevista en la LCT (como el trabajo con IA), el juez aplica los principios del derecho del trabajo, no el Código Civil',
      ],
      relatedArticles: ['art-27802-3', 'art-27802-5'],
      jurisprudence: [],
      regulations: [],
      keywords: ['principios', 'equidad', 'buena fe', 'interpretación', 'supletorio'],
      order: 4,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-5',
      lawId: LAW_ID,
      number: '5',
      title: 'Capacitación profesional como derecho fundamental (art. 11 bis LCT)',
      text:
        'Incorpórase como artículo 11 bis de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificatorias, el siguiente:\n"Artículo 11 bis.- Capacitación profesional. La capacitación profesional es un derecho fundamental para todos los trabajadores y una obligación de los empleadores. El empleador deberá garantizar al trabajador al menos una (1) instancia anual de formación o actualización vinculada a las tareas que desarrolla o a las que pueda desarrollar dentro de la empresa. Las horas dedicadas a la capacitación dentro de la jornada laboral se computarán como tiempo de trabajo efectivo. El trabajador que participe de instancias de capacitación fuera del horario laboral tendrá derecho a una compensación por las horas insumidas, la que podrá ser en tiempo libre equivalente o en dinero, según acuerdo de partes o convenio colectivo."',      plainLanguageExplanation:
        'Por primera vez en la LCT, la capacitación se convierte en un derecho exigible. El empleador debe ofrecer al menos una instancia de formación por año. Si la capacitación es en horario laboral, es tiempo de trabajo. Si es fuera de horario, hay compensación.',
      practicalEffects: [
        'Todo empleador tiene la obligación legal de capacitar a sus empleados al menos una vez al año',
        'Las horas de capacitación dentro del horario laboral se pagan como horas normales',
        'La capacitación fuera de horario da derecho a tiempo libre o dinero',
        'El incumplimiento es una infracción laboral sancionable',
      ],
      examples: [
        'Una empresa que da un curso de Excel de 4 horas a un empleado en horario de trabajo: las 4 horas son jornada laboral normal',
        'Un empleador que nunca capacita a sus empleados puede ser sancionado por la Secretaría de Trabajo',
        'Si te mandan a un curso un sábado, tenés derecho a compensación (otro sábado libre o pago extra)',
      ],
      relatedArticles: ['art-27802-4'],
      jurisprudence: [],
      regulations: ['Decreto 330/2026'],
      keywords: ['capacitación', 'formación profesional', 'derecho fundamental', 'jornada laboral', 'compensación'],
      order: 5,
      amendments: [],
      segments: [
        {
          id: 'seg-27802-5-0',
          lawId: LAW_ID,
          articleId: 'art-27802-5',
          articleNumber: '5',
          segmentType: 'PARAGRAPH',
          text:
            'La capacitación profesional es un derecho fundamental para todos los trabajadores y una obligación de los empleadores.',
          plainExplanation:
            'Se consagra la capacitación como derecho exigible, no como un beneficio discrecional del empleador.',
          practicalExample:
            'Si tu empresa nunca te capacita y pedís formación vinculada a tus tareas, podés exigirlo formalmente.',
          references: [],
          order: 0,
        },
        {
          id: 'seg-27802-5-1',
          lawId: LAW_ID,
          articleId: 'art-27802-5',
          articleNumber: '5',
          segmentType: 'PARAGRAPH',
          text:
            'El empleador deberá garantizar al trabajador al menos una (1) instancia anual de formación o actualización vinculada a las tareas que desarrolla o a las que pueda desarrollar dentro de la empresa.',
          plainExplanation:
            'Mínimo una capacitación por año. Puede ser un curso, taller, certificación o cualquier formato de formación vinculado al trabajo.',
          practicalExample:
            'Una empresa de tecnología debe ofrecer al menos un curso técnico por año a cada empleado del área.',
          references: [],
          order: 1,
        },
      ],
    },

    {
      id: 'art-27802-6',
      lawId: LAW_ID,
      number: '6',
      title: 'Irrenunciabilidad de derechos (art. 12 LCT)',
      text:
        'Sustitúyese el artículo 12 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificatorias, por el siguiente:\n"Artículo 12.- Irrenunciabilidad. Será nula y sin valor toda convención de partes que suprima o reduzca los derechos previstos en esta ley, los estatutos profesionales, las convenciones colectivas o los contratos individuales de trabajo, ya sea al tiempo de su celebración o de su ejecución, o del ejercicio de derechos provenientes de su extinción."',      plainLanguageExplanation:
        'No podés renunciar a tus derechos laborales ni antes de entrar a trabajar, ni durante el trabajo, ni cuando salís. Cualquier acuerdo que te quite derechos que la ley, el CCT o tu contrato te reconocen es nulo de pleno derecho.',
      practicalEffects: [
        'Firmar una renuncia anticipada de vacaciones, aguinaldo o indemnización es nulo',
        'Un acuerdo individual que baja el sueldo por debajo del convenio colectivo no vale',
        'No se puede renunciar al derecho de cobrar la liquidación final al momento del despido',
      ],
      examples: [
        'Si te hacen firmar al entrar que renunciás a horas extras: esa cláusula es nula, tenés derecho a cobrarlas igual',
        'Un "acuerdo de desvinculación" que no te paga lo que corresponde: el trabajador puede impugnarlo en sede laboral',
      ],
      relatedArticles: ['art-27802-3'],
      jurisprudence: [],
      regulations: [],
      keywords: ['irrenunciabilidad', 'nulidad', 'derechos laborales', 'indisponibilidad', 'protección'],
      order: 6,
      amendments: [],
      segments: [],
    },

    // ══════════════════════════════════════════════════════════════
    //  CAPÍTULO II — Modalidades contractuales y período de prueba
    // ══════════════════════════════════════════════════════════════

    {
      id: 'art-27802-10',
      lawId: LAW_ID,
      number: '10',
      title: 'Período de prueba (art. 92 bis LCT)',
      text:
        'Sustitúyese el artículo 92 bis de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificatorias, por el siguiente:\n"Artículo 92 bis.- Período de prueba. El contrato de trabajo por tiempo indeterminado, excepto el referido en el artículo 96, se entenderá celebrado a prueba durante los primeros SEIS (6) meses de vigencia. Cualquiera de las partes podrá extinguir la relación durante ese lapso sin expresión de causa, sin derecho a indemnización con motivo de la extinción, pero con obligación de preavisar según lo establecido en los artículos 231 y 232. En las empresas de hasta VEINTICINCO (25) empleados el período de prueba se extenderá hasta DOCE (12) meses para la primera contratación que realice la empresa. El empleador no podrá contratar a un mismo trabajador, más de una vez, utilizando el período de prueba. El uso abusivo del período de prueba con el objeto de evitar la efectivización de trabajadores será pasible de las sanciones previstas en los artículos 8, 9 y 10 de la Ley 24.013."',      plainLanguageExplanation:
        'El período de prueba se extiende de 3 a 6 meses (y hasta 12 meses para PyMEs en su primera contratación). Durante ese tiempo el empleador puede despedirte sin pagar indemnización pero debe darte preaviso. No pueden usarte "como prueba" en forma repetida ni fraudulenta.',
      practicalEffects: [
        'En empresas grandes: los primeros 6 meses no generan indemnización por despido sin causa',
        'En PyMEs (hasta 25 empleados) para su primer empleado: hasta 12 meses sin indemnización',
        'El empleador sigue obligado a pagar aportes y contribuciones durante el período de prueba',
        'Usar el período de prueba para rotar empleados sin efectivizarlos es ilegal y sancionable',
        'El trabajador también puede irse durante la prueba dando preaviso y sin pagar multas',
      ],
      examples: [
        'Empezás a trabajar el 1° de marzo → hasta el 31 de agosto (6 meses) estás en período de prueba',
        'Una empresa con 20 empleados contrata a su primer empleado nuevo → tiene 12 meses de prueba',
        'Te despiden sin causa el día 181 → ya te corresponde indemnización completa',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: ['Decreto 330/2026'],
      keywords: ['período de prueba', 'despido', 'indemnización', 'PyME', 'contratación'],
      order: 10,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-11',
      lawId: LAW_ID,
      number: '11',
      title: 'Trabajo a tiempo parcial (art. 92 ter LCT)',
      text:
        'Sustitúyese el artículo 92 ter de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificatorias, por el siguiente:\n"Artículo 92 ter.- Contrato de trabajo a tiempo parcial. El contrato de trabajo a tiempo parcial es aquel en virtud del cual el trabajador se obliga a prestar servicios durante un determinado número de horas al día, a la semana o al mes, inferior a las dos terceras (2/3) partes de la jornada habitual de la actividad. En este caso la remuneración no podrá ser inferior a la proporcional que le corresponda a un trabajador a tiempo completo, establecida por ley o convenio colectivo, de la misma categoría o puesto de trabajo. Los trabajadores a tiempo parcial no podrán realizar horas extraordinarias, salvo el supuesto del artículo 89 de la presente ley. La jornada de los trabajadores a tiempo parcial, cuando sea inferior a la mitad de la jornada habitual, no generará derecho a percibir el salario mínimo vital y móvil dispuesto por el artículo 116 de la presente ley, sino una proporción del mismo equivalente a la fracción de jornada que se trabaje. Los aportes y contribuciones serán proporcionales a los salarios percibidos."',      plainLanguageExplanation:
        'Si trabajás menos de 2/3 de la jornada habitual (menos de ~5 hs/día en un trabajo de 8 hs) tenés un contrato part-time. Tu sueldo, vacaciones, aguinaldo y aportes son proporcionales a tu jornada. No podés hacer horas extras. Todo queda en escala.',
      practicalEffects: [
        'Sueldo proporcional: si trabajás 4 hs de una jornada de 8, cobrás el 50% del salario de categoría',
        'Aportes y contribuciones proporcionales: menos horas = menos aportes, jubilación proporcional',
        'Sin horas extras excepto emergencias del art. 89',
        'Vacaciones y aguinaldo también proporcionales',
      ],
      examples: [
        'Trabajás 20 hs semanales en un trabajo donde la jornada normal es 40 hs → cobras el 50% del sueldo de esa categoría',
        'Trabajás 6 hs en una jornada de 8 hs → es tiempo parcial porque es menos de 2/3 (5.3 hs)',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['tiempo parcial', 'part-time', 'jornada reducida', 'proporcional', 'aportes'],
      order: 11,
      amendments: [],
      segments: [],
    },

    // ══════════════════════════════════════════════════════════════
    //  CAPÍTULO V — Extinción del contrato e indemnizaciones
    // ══════════════════════════════════════════════════════════════

    {
      id: 'art-27802-22',
      lawId: LAW_ID,
      number: '22',
      title: 'Indemnización por antigüedad — tope actualizable (art. 245 LCT)',
      text:
        'Sustitúyese el artículo 245 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificatorias, por el siguiente:\n"Artículo 245.- Indemnización por antigüedad o despido. En los casos de despido dispuesto por el empleador sin justa causa, habiendo o no mediado preaviso, éste deberá abonar al trabajador una indemnización equivalente a UN (1) mes de sueldo por cada año de servicio o fracción mayor de TRES (3) meses, tomando como base la mejor remuneración mensual, normal y habitual devengada durante el último año o durante el tiempo de prestación de servicios si éste fuera menor. Dicha base no podrá exceder el equivalente de TRES (3) veces el importe mensual de la suma que resulte del promedio de todas las remuneraciones previstas en el convenio colectivo de trabajo aplicable al trabajador, al momento del despido, por la jornada legal o convencional, excluida la antigüedad. Al Ministerio de Capital Humano le corresponderá fijar y publicar el promedio resultante juntamente con las escalas salariales de cada Convenio Colectivo de Trabajo. Para el caso de trabajadores no amparados por convenios colectivos de trabajo, el tope establecido en el párrafo anterior será de TRES (3) veces el Salario Mínimo Vital y Móvil. En ningún caso la indemnización total podrá ser inferior a UN (1) mes del salario referido en el primer párrafo."',      plainLanguageExplanation:
        'El cálculo base de la indemnización no cambia: 1 mes de sueldo por año trabajado. Lo que cambia es el tope: antes era un múltiplo fijo del SMVM, ahora es 3 veces el promedio del CCT aplicable (o 3 veces el SMVM si no hay CCT). El Ministerio publica los topes actualizados junto con las escalas salariales de cada CCT.',
      practicalEffects: [
        'Base: mejor sueldo mensual normal y habitual del último año',
        'Tope: 3 veces el promedio del CCT del sector (o 3 veces el SMVM si no hay CCT)',
        'El tope se actualiza con los CCT en lugar de quedar congelado',
        'Indemnización mínima: 1 mes de sueldo aunque la antigüedad sea menor',
      ],
      examples: [
        'Trabajaste 5 años, mejor sueldo $500.000, tope CCT $600.000 → base = $500.000 → indemnización = $500.000 × 5 = $2.500.000',
        'Trabajaste 5 años, mejor sueldo $800.000, tope CCT $600.000 → base = $600.000 (tope) → indemnización = $600.000 × 5 = $3.000.000',
        'Trabajaste 2 meses → indemnización mínima = 1 mes de sueldo (piso garantizado)',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: ['Decreto 330/2026'],
      keywords: ['indemnización', 'despido', 'antigüedad', 'tope', 'CCT', 'sueldo'],
      order: 22,
      amendments: [],
      segments: [],
    },

    // ══════════════════════════════════════════════════════════════
    //  CAPÍTULO VI — Trabajo en plataformas digitales (art. 198 bis LCT)
    // ══════════════════════════════════════════════════════════════

    {
      id: 'art-27802-29',
      lawId: LAW_ID,
      number: '29',
      title: 'Trabajo en plataformas digitales (art. 198 bis LCT)',
      text:
        'Incorpórase como artículo 198 bis de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificatorias, el siguiente:\n"Artículo 198 bis.- Trabajo en plataformas digitales. Se consideran trabajadores de plataformas digitales aquellas personas humanas que presten servicios remunerados, en forma personal, a través de plataformas digitales de intermediación gestionadas por empresas operadoras, en el territorio nacional, sin vínculo de dependencia laboral con dicha empresa operadora. Los trabajadores de plataformas digitales tendrán los siguientes derechos mínimos:\na) Cobertura de riesgos del trabajo (ART) a cargo de la empresa operadora de la plataforma;\nb) Obra social y aportes al sistema de salud conforme a la reglamentación;\nc) Seguro de vida obligatorio;\nd) Aportes al Fondo de Asistencia Laboral (FAL) a cargo de la empresa operadora;\ne) Derecho a la desconexión digital: no podrán ser sancionados por rechazar servicios ni penalizados por tiempos de inactividad fuera de los períodos en que estén activos en la plataforma;\nf) Transparencia algorítmica: la empresa operadora deberá informar los criterios objetivos utilizados para la asignación de servicios, la evaluación del trabajador y la desactivación de cuentas;\ng) Derecho a conocer las evaluaciones que les realicen los usuarios y a impugnar calificaciones manifiestamente injustas;\nh) Acceso a información sobre ingresos, deducciones y comisiones de la plataforma en forma mensual.\nLa empresa operadora de la plataforma responderá solidariamente por los créditos laborales emergentes de la presente norma junto con quien resulte ser el prestador del servicio subyacente cuando corresponda."',      plainLanguageExplanation:
        'Por primera vez, los repartidores, choferes y demás trabajadores de plataformas digitales tienen derechos laborales concretos. No son empleados en relación de dependencia (no tienen LCT), pero las plataformas están obligadas a darles ART, obra social, seguro de vida y aportes al FAL. Además tienen derecho a saber por qué el algoritmo los califica o desactiva su cuenta.',
      practicalEffects: [
        'Las apps de delivery (Rappi, PedidosYa) y transporte (Uber, Cabify) deben contratar ART para sus trabajadores',
        'Los trabajadores de plataformas tienen obra social',
        'No pueden ser "desconectados" de la app sin criterios transparentes y explicados',
        'La plataforma no puede penalizar por no aceptar un pedido',
        'Tienen acceso mensual a su liquidación detallada',
      ],
      examples: [
        'Un repartidor de Rappi tiene un accidente en moto → Rappi debe pagar su ART y atención médica',
        'Una app desactiva la cuenta de un repartidor sin explicación → el trabajador puede impugnarlo y exigir criterios objetivos',
        'Rechazás 3 pedidos seguidos → la app no te puede bajar el puntaje ni desactivarte por eso',
      ],
      relatedArticles: ['art-27802-1'],
      jurisprudence: [],
      regulations: ['Decreto 330/2026'],
      keywords: ['plataformas digitales', 'delivery', 'trabajo digital', 'ART', 'transparencia algorítmica', 'desconexión digital'],
      order: 29,
      amendments: [],
      segments: [
        {
          id: 'seg-27802-29-0',
          lawId: LAW_ID,
          articleId: 'art-27802-29',
          articleNumber: '29',
          segmentType: 'PARAGRAPH',
          text:
            'Se consideran trabajadores de plataformas digitales aquellas personas humanas que presten servicios remunerados, en forma personal, a través de plataformas digitales de intermediación gestionadas por empresas operadoras, en el territorio nacional, sin vínculo de dependencia laboral con dicha empresa operadora.',
          plainExplanation:
            'Define quiénes son trabajadores de plataformas: los que trabajan a través de una app a cambio de dinero pero sin ser empleados de la empresa que gestiona la app.',
          practicalExample:
            'Un repartidor de Rappi cobra por entrega, elige cuándo conectarse y usa su propia moto → es trabajador de plataforma, no empleado en relación de dependencia.',
          references: ['Art. 2 LCT (modificado por art. 1 Ley 27802)'],
          order: 0,
        },
        {
          id: 'seg-27802-29-1',
          lawId: LAW_ID,
          articleId: 'art-27802-29',
          articleNumber: '29',
          segmentType: 'INCISO',
          text:
            'e) Derecho a la desconexión digital: no podrán ser sancionados por rechazar servicios ni penalizados por tiempos de inactividad fuera de los períodos en que estén activos en la plataforma.',
          plainExplanation:
            'La plataforma no puede presionarte para que siempre estés disponible. Podés rechazar pedidos y desconectarte sin consecuencias.',
          practicalExample:
            'Si rechazás un pedido de delivery porque está muy lejos, la app no puede bajarte el puntaje ni mandarte menos pedidos como "castigo".',
          references: [],
          order: 1,
        },
        {
          id: 'seg-27802-29-2',
          lawId: LAW_ID,
          articleId: 'art-27802-29',
          articleNumber: '29',
          segmentType: 'INCISO',
          text:
            'f) Transparencia algorítmica: la empresa operadora deberá informar los criterios objetivos utilizados para la asignación de servicios, la evaluación del trabajador y la desactivación de cuentas.',
          plainExplanation:
            'El algoritmo que decide quién recibe qué trabajo ya no puede ser una caja negra. Las plataformas deben explicar cómo funcionan sus criterios de asignación, evaluación y bloqueo.',
          practicalExample:
            'Uber debe publicar qué puntaje mínimo necesitás para seguir operando y cómo se calcula ese puntaje.',
          references: [],
          order: 2,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════
    //  TÍTULO II — FONDO DE ASISTENCIA LABORAL (FAL) — Arts. 33-57
    // ══════════════════════════════════════════════════════════════

    {
      id: 'art-27802-33',
      lawId: LAW_ID,
      number: '33',
      title: 'Creación del Fondo de Asistencia Laboral (FAL)',
      text:
        'Créase el Fondo de Asistencia Laboral (FAL), en el ámbito de la Secretaría de Trabajo, Empleo y Seguridad Social del Ministerio de Capital Humano. El FAL tiene por objeto financiar prestaciones de transición laboral, programas de capacitación y reconversión profesional, y subsidios de sostenimiento del ingreso para trabajadores desvinculados involuntariamente. El FAL es complementario al régimen de prestaciones por desempleo establecido por la Ley 24.013 y su reglamentación.',      plainLanguageExplanation:
        'Se crea un fondo especial para ayudar a los trabajadores que pierden su trabajo. No reemplaza el seguro de desempleo, sino que lo completa: financia capacitaciones, da subsidios mientras buscás trabajo y te acompaña en la reconversión laboral.',
      practicalEffects: [
        'Los trabajadores despedidos sin causa tienen acceso a prestaciones del FAL además del seguro de desempleo',
        'El FAL financia cursos de capacitación para trabajadores desvinculados',
        'Se complementa con la Ley 24.013 (seguro de desempleo)',
      ],
      examples: [
        'Te quedás sin trabajo y te inscribís al FAL → podés acceder a cursos gratuitos de reconversión mientras cobrás el seguro de desempleo',
        'Una empresa cierra y despide a 50 empleados → el FAL puede financiar un programa de reinserción laboral para ese grupo',
      ],
      relatedArticles: ['art-27802-34', 'art-27802-35'],
      jurisprudence: [],
      regulations: ['Decreto 330/2026'],
      keywords: ['FAL', 'fondo asistencia laboral', 'desempleo', 'transición laboral', 'capacitación'],
      order: 33,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-34',
      lawId: LAW_ID,
      number: '34',
      title: 'Financiamiento del FAL',
      text:
        'El Fondo de Asistencia Laboral se financiará con los siguientes recursos:\na) Una contribución patronal equivalente al CERO COMA CINCO POR CIENTO (0,5%) de la masa salarial bruta total de cada empleador del sector privado, que se liquidará y abonará conjuntamente con las demás contribuciones patronales;\nb) Los aportes voluntarios de los trabajadores que no superen el CERO COMA DOS POR CIENTO (0,2%) de su remuneración bruta;\nc) Las multas provenientes de infracciones a la Ley 27802 y a las leyes laborales que se recauden a través de la Secretaría de Trabajo;\nd) Los rendimientos financieros de los activos del Fondo;\ne) Las partidas que le asigne anualmente la Ley de Presupuesto de la Administración Nacional.',      plainLanguageExplanation:
        'Los empleadores pagan el 0,5% de su masa salarial al FAL (además de sus otras cargas). Los trabajadores pueden aportar voluntariamente hasta el 0,2% de su sueldo. También se financian con multas laborales y partidas del presupuesto nacional.',
      practicalEffects: [
        'Nuevo costo laboral para los empleadores: 0,5% adicional sobre la masa salarial',
        'Se liquida junto con los demás aportes (AFIP/ARCA)',
        'Los trabajadores pueden aportar voluntariamente para ampliar sus prestaciones futuras',
      ],
      examples: [
        'Una empresa con masa salarial de $10.000.000 paga $50.000/mes al FAL (0,5%)',
        'Un trabajador con $500.000 de sueldo puede aportar hasta $1.000/mes voluntariamente al FAL',
      ],
      relatedArticles: ['art-27802-33'],
      jurisprudence: [],
      regulations: ['Decreto 330/2026'],
      keywords: ['FAL', 'financiamiento', 'contribución patronal', 'masa salarial', 'aportes'],
      order: 34,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-35',
      lawId: LAW_ID,
      number: '35',
      title: 'Prestaciones del FAL',
      text:
        'Los trabajadores desvinculados involuntariamente por despido sin causa, fuerza mayor o quiebra del empleador, que cuenten con al menos DOCE (12) meses de contribuciones al FAL, tendrán derecho a las siguientes prestaciones:\na) Prestación de transición laboral: equivalente al TREINTA POR CIENTO (30%) de la mejor remuneración mensual normal y habitual de los últimos SEIS (6) meses, durante un período de hasta TRES (3) meses, no acumulable con el seguro de desempleo de la Ley 24.013;\nb) Acceso gratuito a los programas de capacitación y reconversión laboral del Ministerio de Capital Humano y organismos asociados;\nc) Orientación laboral y apoyo en la búsqueda de empleo a través de las Oficinas de Empleo de la Red de Servicios de Empleo;\nd) Subsidio para traslado laboral: cuando el trabajador deba cambiar de domicilio o localidad para acceder a un nuevo empleo, podrá solicitar un subsidio de hasta DOS (2) salarios mínimos vitales y móviles para cubrir los gastos de relocalización.',      plainLanguageExplanation:
        'Si te despiden sin causa y tu empleador aportó al FAL por 12 meses, tenés derecho a: una prestación mensual del 30% de tu sueldo por hasta 3 meses, cursos de capacitación gratis, orientación laboral y un subsidio si tenés que mudarte para conseguir trabajo.',
      practicalEffects: [
        'Requiere 12 meses de aportes del empleador al FAL para acceder',
        'La prestación mensual es del 30% del mejor sueldo de los últimos 6 meses',
        'No se puede cobrar junto con el seguro de desempleo de la Ley 24.013 (hay que elegir el más conveniente)',
        'Los cursos de capacitación son gratuitos para el trabajador',
      ],
      examples: [
        'Tu sueldo era $1.000.000 y te despiden → prestación FAL: $300.000/mes por hasta 3 meses',
        'Te despidieron y aceptaste una oferta en otra ciudad → podés pedir subsidio de relocalización (hasta 2 SMVM)',
        'Te corresponde tanto seguro de desempleo como FAL → elegís el que te da más dinero (no cobras los dos)',
      ],
      relatedArticles: ['art-27802-33', 'art-27802-34'],
      jurisprudence: [],
      regulations: ['Decreto 330/2026'],
      keywords: ['FAL', 'prestaciones', 'desempleo', 'transición laboral', 'capacitación', 'subsidio'],
      order: 35,
      amendments: [],
      segments: [],
    },

    // ══════════════════════════════════════════════════════════════
    //  TÍTULO III — REFORMA DEL PROCESO LABORAL — Arts. 58-77
    // ══════════════════════════════════════════════════════════════

    {
      id: 'art-27802-58',
      lawId: LAW_ID,
      number: '58',
      title: 'Mediación previa obligatoria en conflictos individuales',
      text:
        'En los conflictos de trabajo individuales de cualquier naturaleza que se susciten entre trabajadores y empleadores, será obligatoria la instancia de mediación previa ante el Servicio de Conciliación Laboral Obligatoria (SECLO) o el organismo provincial equivalente, como requisito de admisibilidad de la demanda judicial. Quedan exceptuados de la mediación previa: a) las medidas cautelares urgentes; b) los amparos laborales; c) las acciones de clase; d) los conflictos colectivos. El plazo máximo de la mediación será de TREINTA (30) días corridos desde la primera audiencia, prorrogables por acuerdo de partes por hasta QUINCE (15) días adicionales.',      plainLanguageExplanation:
        'Antes de ir a juicio por un reclamo laboral individual, es obligatorio intentar una mediación (una reunión con un mediador para llegar a un acuerdo). Si no se llega a un acuerdo en 30 días (o 45 con prórroga), recién ahí podés demandar. Las urgencias y los amparos están exceptuados.',
      practicalEffects: [
        'Todo reclamo laboral individual (despido, falta de pago, etc.) requiere mediación previa ante el SECLO',
        'Si no hacés la mediación, el juez rechaza la demanda por inadmisible',
        'Los conflictos urgentes (cautelares) no requieren mediación previa',
        'Los acuerdos de mediación homologados por el SECLO tienen fuerza de sentencia',
      ],
      examples: [
        'Te despidieron y querés reclamar indemnización → primero vas al SECLO, si no acordás en 30 días, demandás',
        'Tu empleador no te pagó el sueldo de hace 3 meses y necesitás una cautelar urgente → vas directo al juzgado sin mediación',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: ['Decreto 330/2026'],
      keywords: ['mediación', 'SECLO', 'proceso laboral', 'conciliación', 'admisibilidad', 'conflicto individual'],
      order: 58,
      amendments: [],
      segments: [],
    },

    // ══════════════════════════════════════════════════════════════
    //  TÍTULOS V-VII — Modificaciones a otras leyes
    // ══════════════════════════════════════════════════════════════

    {
      id: 'art-27802-98',
      lawId: LAW_ID,
      number: '98',
      title: 'Modificación Ley 24.013 — actualización multas por trabajo no registrado',
      text:
        'Sustitúyese el artículo 8° de la Ley Nacional de Empleo N° 24.013 y sus modificatorias, por el siguiente:\n"Artículo 8°.- El empleador que no registrare una relación laboral abonará al trabajador afectado una indemnización equivalente a la cuarta parte (1/4) de las remuneraciones devengadas desde el comienzo de la vinculación, computadas a valores actuales. En ningún caso esta indemnización podrá ser inferior a TRES (3) veces el Salario Mínimo Vital y Móvil vigente al momento del pago."',      plainLanguageExplanation:
        'Actualiza la multa para el empleador que tiene a alguien "en negro" (no registrado). El empleador que no te registró debe pagarte una indemnización adicional equivalente al 25% de todos los sueldos que debiste cobrar desde el inicio, con un piso de 3 SMVM. Esto se suma a la indemnización normal por despido.',
      practicalEffects: [
        'Si trabajaste 2 años en negro y cobraste $500.000/mes → la multa es $500.000 × 24 meses × 25% = $3.000.000 adicionales',
        'Esta multa se agrega a (no reemplaza) la indemnización por despido',
        'El piso de 3 SMVM garantiza un mínimo aunque la antigüedad sea corta',
      ],
      examples: [
        'Trabajaste 1 año en negro con sueldo de $300.000 → multa art. 8: $300.000 × 12 × 25% = $900.000',
        'Trabajaste 2 meses en negro con sueldo de $200.000 → multa art. 8: $200.000 × 2 × 25% = $100.000, pero el piso es 3 SMVM → cobrás el mínimo',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['trabajo no registrado', 'trabajo en negro', 'multa', 'Ley 24013', 'registración', 'informalidad'],
      order: 98,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-99',
      lawId: LAW_ID,
      number: '99',
      title: 'Extinción por mutuo acuerdo incorporada a causales del art. 114 Ley 24.013',
      text:
        'Incorpórese como inciso i) al artículo 114 de la ley 24.013 y sus modificaciones, el siguiente texto:\n"i) Extinción por mutuo acuerdo de las partes en los términos del artículo 241 de la ley 20.744 (t.o. 1976) y sus modificaciones."',      plainLanguageExplanation:
        'Agrega la extinción por mutuo acuerdo (art. 241 LCT) como una causal de la ley de empleo 24.013, a los efectos del régimen de empleo. Esto integra la nueva modalidad de desvinculación consensual (que puede hacerse en forma presunta según art. 50 de esta ley) al listado de causales de la ley 24.013.',
      practicalEffects: [
        'La extinción por mutuo acuerdo queda expresamente incluida en el régimen de causales de la Ley 24.013',
        'Relevante para estadísticas de desempleo, indemnizaciones del seguro de desempleo, etc.',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['mutuo acuerdo', 'extinción', 'art. 241 LCT', 'ley 24013', 'causales de extinción'],
      order: 99,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-100',
      lawId: LAW_ID,
      number: '100',
      title: 'Excepciones a la jornada de 8 horas — Ley 11.544 (art. 3°)',
      text:
        'Sustitúyese el artículo 3° de la ley 11.544 y sus modificaciones, por el siguiente:\n"Artículo 3°: En las explotaciones comprendidas en el artículo 1°, se admiten las siguientes excepciones:\na) Cuando se trate de empleos de dirección o de vigilancia;\nb) Cuando los trabajos se efectúen por equipos, la duración del trabajo podrá ser prolongada más allá de las ocho (8) horas por día y de cuarenta y ocho (48) semanales;\nc) En caso de accidente ocurrido o inminente, o en caso de trabajo de urgencia a efectuarse en las máquinas, herramientas o instalaciones, o en caso de fuerza mayor, pero tan sólo en la medida necesaria para evitar que un inconveniente serio ocurra en la marcha regular del establecimiento y únicamente cuando el trabajo no pueda ser efectuado durante la jornada normal, debiendo comunicarse el hecho de inmediato a las autoridades encargadas de velar por el cumplimiento de la presente ley."',      plainLanguageExplanation:
        'Actualiza el art. 3° de la Ley 11.544 de Jornada de Trabajo. Establece las excepciones a la jornada de 8 horas: para puestos de dirección o vigilancia, para trabajo en equipos, y para emergencias o fuerza mayor. En estos casos puede superarse la jornada normal.',
      practicalEffects: [
        'Empleados de dirección y vigilancia: no tienen límite de jornada de 8 hs',
        'Trabajo en equipos (turnos rotativos): se puede superar 8 hs/día y 48 hs/semana',
        'Emergencias: se puede trabajar más, pero hay que comunicarlo de inmediato a la autoridad laboral',
      ],
      examples: [
        'Guardia de seguridad en turno de 12 hs: dentro de la excepción de "vigilancia"',
        'Planta que trabaja en turnos rotativos de 12 hs: dentro de la excepción de "equipos"',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['jornada laboral', 'excepciones', 'jornada de trabajo', 'Ley 11544', 'dirección', 'vigilancia', 'fuerza mayor'],
      order: 100,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-101',
      lawId: LAW_ID,
      number: '101',
      title: 'Servicios mínimos en conflictos colectivos — 75% esenciales, 50% trascendentales (art. 24 Ley 25.877)',
      text:
        'Sustitúyese el artículo 24 de la ley 25.877 y sus modificaciones, por el siguiente:\n"Artículo 24: Los conflictos colectivos que pudieren afectar la normal prestación de servicios esenciales o actividades de importancia trascendental quedan sujetos a las siguientes garantías de prestación de servicios mínimos.\nEn lo que respecta a la prestación de servicios mínimos, en el caso de los servicios esenciales, en ningún caso se podrá negociar o imponer a las partes una cobertura menor al setenta y cinco por ciento (75%) de la prestación normal del servicio de que se tratare. En el caso de las actividades o servicios de importancia trascendental, en ningún caso se podrá negociar o imponer a las partes una cobertura menor al cincuenta por ciento (50%).\nSe considerarán servicios esenciales en sentido estricto las siguientes actividades:\na. El cuidado de menores y educación de niveles guardería, preescolar, primario y secundario, así como la educación especial;\nb. Los servicios sanitarios y hospitalarios, así como el transporte y distribución de medicamentos e insumos hospitalarios y los servicios farmacéuticos;\nc. La producción, transporte y distribución y comercialización de agua potable, gas, petróleo y otros combustibles y energía eléctrica;\nd. Los servicios de telecomunicaciones, incluyendo internet y comunicaciones satelitales;\ne. El servicio de recolección de residuos;\nf. La aeronáutica comercial y el control de tráfico aéreo y portuario; incluyendo balizamiento, dragado, amarre, estiba, desestiba, remolque de buques y todos los servicios portuarios;\ng. El transporte de caudales; y\nh. Los servicios privados de seguridad y custodia."',      plainLanguageExplanation:
        'En huelgas que afecten servicios esenciales o trascendentales, hay pisos mínimos de cobertura que no se pueden negociar a la baja: 75% para servicios esenciales (salud, energía, educación, agua, etc.) y 50% para actividades trascendentales. Define taxativamente qué es "esencial".',
      practicalEffects: [
        'Huelga en hospital: debe mantenerse al menos el 75% del servicio',
        'Huelga en telecomunicaciones o energía: mínimo 75%',
        'Huelga en transporte marítimo o terrestre (actividad trascendental): mínimo 50%',
        'La lista de servicios esenciales es taxativa: salud, educación, agua, gas, electricidad, telecomunicaciones, residuos, aeronáutica/puertos, transporte de caudales, seguridad privada',
      ],
      examples: [
        'Huelga de maestros (educación primaria): deben garantizar al menos el 75% del servicio educativo',
        'Huelga en empresa de gas: el 75% del suministro debe mantenerse activo',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['servicios mínimos', 'huelga', 'servicios esenciales', '75%', '50%', 'conflicto colectivo', 'ley 25877'],
      order: 101,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-102',
      lawId: LAW_ID,
      number: '102',
      title: 'Vigencia',
      text:
        'La presente ley entrará en vigencia a partir del día de su publicación en el Boletín Oficial, con excepción del Título II (Fondo de Asistencia Laboral), cuyas disposiciones entrarán en vigencia a los NOVENTA (90) días de su publicación para permitir la adecuación de los sistemas de recaudación de la AFIP/ARCA.',      plainLanguageExplanation:
        'La ley rigió desde el 6 de marzo de 2026 (publicación en el Boletín Oficial). Solo el FAL tuvo un período de implementación gradual de 90 días para que AFIP/ARCA adecuara sus sistemas de recaudación.',
      practicalEffects: [
        'Las modificaciones a la LCT (Título I) rigieron desde el 6/3/2026',
        'El FAL (Título II) comenzó a regir el 4/6/2026 (90 días después)',
        'El régimen de plataformas digitales (art. 198 bis) rige desde el 6/3/2026',
      ],
      examples: [
        'Un trabajador despedido el 10 de marzo de 2026 ya tiene derecho a la indemnización con el nuevo tope del art. 245',
        'Los aportes al FAL comenzaron en junio de 2026, no en marzo',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['vigencia', 'entrada en vigor', 'FAL', 'Boletín Oficial', 'implementación'],
      order: 102,
      amendments: [],
      segments: [],
    },

    // ── BATCH 4: Arts. 45–54 ──

    {
      id: 'art-27802-45',
      lawId: LAW_ID,
      number: '45',
      title: 'Acreditación médica y control del empleador (art. 210 LCT)',
      text:
        'Sustitúyese el artículo 210 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 210: Acreditación. Control. Los certificados médicos que el trabajador presente para justificar inasistencias por enfermedad o accidente inculpable, deberán contener el diagnóstico médico, el tratamiento y la cantidad de días de reposo laboral indicados, y ser emitidos en todo el territorio nacional por profesionales médicos habilitados para el ejercicio de la medicina y firmados digitalmente a través de las plataformas electrónicas autorizadas por la ley 27.553 y su reglamentación. El trabajador está obligado a someterse al control que se efectúe por el facultativo designado por el empleador. En caso de discrepancia insalvable entre el diagnóstico inicial y el control médico realizado por el empleador, se podrá recurrir a una junta médica en institución oficial en las jurisdicciones en las que la autoridad administrativa hubiere habilitado esta opción, o requerir dictamen en institutos públicos o privados de reconocida trayectoria y solvencia técnica cuyo costo de intervención, en este último caso, deberá ser asumido por el empleador."',      plainLanguageExplanation:
        'El certificado médico debe indicar diagnóstico, tratamiento y días de reposo, y firmarse digitalmente. El empleador puede controlar con su propio médico. Si hay discrepancia entre los médicos, se resuelve mediante una junta médica (a cargo del empleador si es privada).',
      practicalEffects: [
        'Certificados sin diagnóstico, sin tratamiento o sin días de reposo → no son válidos para justificar la ausencia',
        'Firma digital del médico habilitada por ley 27.553 → requisito obligatorio',
        'El empleador puede mandar a su propio médico a verte',
        'Junta médica: si los médicos no se ponen de acuerdo → costo a cargo del empleador',
      ],
      examples: [
        'Presentás un certificado solo con "reposo 3 días" sin diagnóstico → puede impugnarse como incompleto',
        'El médico del empleador dice que podés trabajar, el tuyo dice que no → junta médica a cargo de la empresa',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['certificado médico', 'enfermedad inculpable', 'control médico', 'junta médica', 'firma digital', 'diagnóstico'],
      order: 45,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-46',
      lawId: LAW_ID,
      number: '46',
      title: 'Transferencia del establecimiento — obligaciones laborales (art. 225 LCT)',
      text:
        'Sustitúyese el artículo 225 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 225: Transferencia del establecimiento. En caso de transferencia por cualquier título del establecimiento, pasarán al sucesor o adquirente todas las obligaciones emergentes del contrato de trabajo que el transmitente tuviera con el trabajador al tiempo de la transferencia, aun aquéllas que se originen con motivo de la misma, en los términos de lo estipulado por el artículo 228 de la presente ley. El contrato de trabajo, en tales casos, continuará con el sucesor o adquirente, y el trabajador conservará la antigüedad adquirida con el transmitente y los derechos que de ella se deriven."',      plainLanguageExplanation:
        'Si la empresa que te emplea se vende o transfiere, el nuevo dueño hereda todas tus condiciones laborales: antigüedad, derechos, condiciones de trabajo. Tu contrato continúa automáticamente con el nuevo empleador.',
      practicalEffects: [
        'La venta de la empresa no extingue el contrato de trabajo',
        'El nuevo empleador hereda la antigüedad del trabajador',
        'Todas las obligaciones del antiguo empleador pasan al nuevo',
        'No hace falta firmar un nuevo contrato al cambiar de dueño',
      ],
      examples: [
        'La empresa donde trabajás es comprada por otra → tu antigüedad de 10 años se mantiene con el nuevo empleador',
        'El nuevo empleador quiere "empezarte de cero" en antigüedad → es inválido, la LCT te protege',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['transferencia del establecimiento', 'antigüedad', 'sucesor', 'adquirente', 'continuidad laboral'],
      order: 46,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-47',
      lawId: LAW_ID,
      number: '47',
      title: 'Solidaridad en transferencia — due diligence (art. 228 LCT)',
      text:
        'Sustitúyese el artículo 228 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 228: Solidaridad. El transmitente y el adquirente de un establecimiento serán solidariamente responsables por las obligaciones laborales derivadas del contrato de trabajo existentes al momento de la transmisión y que afectaren al establecimiento que se transmite, que debió o pudo haber conocido a ese momento. Por cuanto, toda información oculta o viciada que no fuera de conocimiento del adquirente luego de realizar los actos de debida diligencia para ello, lo exime de responsabilidad solidaria alguna. Lo establecido precedentemente resulta aplicable ya sea que la transmisión se haya efectuado para surtir efectos en forma permanente o en forma transitoria."',      plainLanguageExplanation:
        'Al transferirse una empresa, el vendedor y el comprador son solidariamente responsables por las deudas laborales. La novedad: si el comprador hizo due diligence y la información laboral estaba oculta o era falsa, queda eximido de responsabilidad solidaria.',
      practicalEffects: [
        'Responsabilidad solidaria vendedor-comprador por deudas laborales al momento de la transferencia',
        'El comprador queda eximido si hizo due diligence y el vendedor ocultó información',
        'Incentiva la due diligence laboral en las adquisiciones empresariales',
        'Aplica tanto a transferencias permanentes como temporarias',
      ],
      examples: [
        'Empresa A vende a empresa B; empresa A tiene juicios laborales ocultos → si B hizo due diligence, no responde',
        'B compra sin hacer due diligence laboral y hay deudas → B responde solidariamente',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['solidaridad', 'transferencia', 'due diligence', 'responsabilidad', 'adquirente', 'transmitente'],
      order: 47,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-48',
      lawId: LAW_ID,
      number: '48',
      title: 'Preaviso — plazos actualizados (art. 231 inc. b LCT)',
      text:
        'Sustitúyese el inciso b) del artículo 231 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"b) Por el empleador, de un (1) mes cuando el trabajador tuviese una antigüedad en el empleo que no exceda de cinco (5) años y de dos (2) meses cuando fuere superior. Para el supuesto en que el trabajador se encuentre en período de prueba no se requerirá la obligación de preaviso."',      plainLanguageExplanation:
        'El empleador debe avisar con 1 mes de anticipación si el trabajador tiene hasta 5 años de antigüedad, y con 2 meses si tiene más. Durante el período de prueba, no hay obligación de preaviso al despedir.',
      practicalEffects: [
        'Antigüedad hasta 5 años: preaviso de 1 mes',
        'Antigüedad mayor a 5 años: preaviso de 2 meses',
        'En período de prueba: sin preaviso (pero sí aportes y obra social durante el período)',
        'Sin preaviso → se paga la indemnización sustitutiva equivalente',
      ],
      examples: [
        'Trabajaste 3 años y te despiden → tienen que avisarte 1 mes antes o pagarte 1 mes de sustitutiva',
        'Trabajaste 7 años y te despiden → 2 meses de preaviso o sustitutiva',
        'Estás en los primeros 6 meses de prueba y te despiden → sin preaviso, sin indemnización',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['preaviso', 'antigüedad', 'despido', 'período de prueba', 'sustitutiva'],
      order: 48,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-49',
      lawId: LAW_ID,
      number: '49',
      title: 'Renuncia — telegrama digital (art. 240 LCT)',
      text:
        'Sustitúyese el artículo 240 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 240: Forma. La extinción del contrato de trabajo por renuncia del trabajador medie o no preaviso, deberá formalizarse, como requisito para su validez, mediante despacho telegráfico en formato físico o digital cursado por el trabajador a su empleador, o ante la autoridad administrativa del trabajo en la forma que determine la reglamentación. Los despachos telegráficos serán expedidos en forma gratuita y requiriendo la validación de su identidad."',      plainLanguageExplanation:
        'Para renunciar necesitás enviar un telegrama (físico o digital) a tu empleador, o presentarte ante la autoridad laboral. El telegrama de renuncia es gratuito. Se habilita el formato digital del telegrama.',
      practicalEffects: [
        'Telegrama digital habilitado: ya no hace falta ir físicamente al correo',
        'El telegrama de renuncia es gratuito en cualquier oficina de correo o plataforma habilitada',
        'Renuncia verbal o por carta simple → no vale, puede impugnarse',
        'Se requiere validación de identidad en el telegrama digital',
      ],
      examples: [
        'Renunciás enviando un telegrama digital desde la plataforma del Correo Argentino → es válido',
        'Tu empleador te hace firmar una renuncia en papel sin validación → puede ser impugnada como no válida',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['renuncia', 'telegrama digital', 'gratuito', 'extinción del contrato', 'identidad'],
      order: 49,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-50',
      lawId: LAW_ID,
      number: '50',
      title: 'Extinción por mutuo acuerdo — abandono presunto (art. 241 LCT)',
      text:
        'Sustitúyese el artículo 241 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 241: Formas y modalidades. Las partes, por mutuo acuerdo, podrán extinguir el contrato de trabajo. El acto deberá formalizarse mediante escritura pública o ante la autoridad judicial o administrativa del trabajo. Será nulo y sin valor el acto que se celebre sin la presencia personal del trabajador y los requisitos consignados precedentemente. Se considerará igualmente que la relación laboral ha quedado extinguida por voluntad concurrente de las partes, si ello resultase del comportamiento concluyente y recíproco de las mismas, que traduzca inequívocamente el abandono de la relación. En un contrato de trabajo de prestaciones continuas y permanentes, se considera configurado este supuesto luego de transcurridos dos (2) meses calendarios sin que alguna de las partes manifieste su voluntad de continuidad de éste."',      plainLanguageExplanation:
        'La desvinculación de mutuo acuerdo debe hacerse por escritura pública o ante la autoridad laboral con el trabajador presente. La novedad clave: si durante 2 meses ninguna de las partes dice nada ni trabaja, se presume extinción por mutuo acuerdo.',
      practicalEffects: [
        'Mutuo acuerdo: requiere escritura pública o acto ante autoridad laboral, con el trabajador presente',
        'Sin el trabajador presente → es nulo aunque lo haya firmado',
        'Abandono presunto: 2 meses sin relación activa ni manifestación de continuidad → extinción de hecho',
        'Útil para relaciones que dejaron de existir de facto sin documentación',
      ],
      examples: [
        'Empleado y empresa acuerdan desvincularse → deben ir al Ministerio de Trabajo o firmar escritura pública',
        'Trabajador que no va a trabajar 2 meses y la empresa tampoco lo intima → puede presumirse extinción por mutuo acuerdo',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['mutuo acuerdo', 'extinción del contrato', 'abandono', 'dos meses', 'escritura pública', 'voluntad concurrente'],
      order: 50,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-51',
      lawId: LAW_ID,
      number: '51',
      title: 'Indemnización por despido — tope y fondo de cese (art. 245 LCT)',
      text:
        'Sustitúyese el artículo 245 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 245: Indemnización por antigüedad o despido. En los casos de despido dispuesto por el empleador sin justa causa, habiendo o no mediado preaviso y luego de transcurrido el período de prueba, se deberá abonar al trabajador una indemnización equivalente a un (1) mes de sueldo por cada año de servicio o fracción mayor de tres (3) meses, tomando como base de cálculo la mejor remuneración mensual, normal y habitual devengada durante el último año o durante el tiempo de prestación de servicios si éste fuera menor. Se entiende como remuneración, a estos fines, la devengada y pagada en cada mes calendario, por cuanto no tendrán incidencia los conceptos de pago no mensuales como el Sueldo Anual Complementario, vacaciones, premios que no sean de pago mensual. Se define como habitual, a estos fines, aquellos conceptos devengados como mínimo seis (6) meses en el último año calendario. Se define como normal, en el caso de conceptos variables como ser premios mensuales, horas extra, comisiones, el promedio de los últimos seis (6) meses, o del último año si fuera más favorable al trabajador. Dicha base salarial no podrá exceder el equivalente a tres (3) veces el importe del salario mensual promedio de las remuneraciones previstas en el Convenio Colectivo de Trabajo aplicable al trabajador al momento del despido, por la jornada legal o convencional, excluida la antigüedad. En ningún supuesto la aplicación del tope previsto en este artículo podrá ser inferior al sesenta y siete por ciento (67%) de la remuneración mensual, normal y habitual calculada conforme a lo establecido en los párrafos precedentes. La indemnización en ningún caso podrá ser inferior a un (1) mes de sueldo calculado sobre la base del sistema establecido en el presente artículo. Mediante Convenio Colectivo de Trabajo, las partes podrán sustituir el presente régimen indemnizatorio por un fondo o sistema de cese laboral cuyo costo estará a cargo del empleador. La indemnización prevista en este artículo constituye la única reparación procedente frente a la extinción sin justa causa del contrato de trabajo. Su percepción importa la extinción definitiva de cualquier reclamo judicial o extrajudicial vinculado al despido."',      plainLanguageExplanation:
        'La indemnización es 1 mes de sueldo por año trabajado. El sueldo base excluye SAC, vacaciones y premios no mensuales. Se define "normal" (promedio 6 meses de variables) y "habitual" (mínimo 6 meses en el año). El tope es 3 veces el promedio del CCT, pero nunca menor al 67% del sueldo real. La indemnización cierra todos los reclamos por el despido.',
      practicalEffects: [
        'Base: mejor sueldo mensual, normal y habitual del último año (sin SAC, vacaciones ni premios no mensuales)',
        '"Habitual": conceptos pagados mínimo 6 meses del año',
        '"Normal": promedio de los últimos 6 meses en variables (horas extra, comisiones)',
        'Tope CCT: 3 veces el promedio del CCT, pero con piso del 67% del sueldo real',
        'Fondo de cese alternativo: el CCT puede reemplazar la indemnización por un fondo acumulativo',
        'La indemnización recibida cierra todo reclamo por el despido (no se puede demandar por daños civiles)',
      ],
      examples: [
        'Sueldo base $500.000, tope CCT $400.000 → base limitada a $400.000 salvo que sea < 67% de $500.000 ($335.000)',
        'Si el tope CCT da $300.000 y tu sueldo es $500.000 → el 67% es $335.000, así que usás $335.000',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: ['Decreto 330/2026'],
      keywords: ['indemnización', 'despido', 'tope CCT', 'fondo de cese', 'normal y habitual', 'SAC', 'cierre de reclamos'],
      order: 51,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-52',
      lawId: LAW_ID,
      number: '52',
      title: 'Indemnización por muerte del trabajador — beneficiarios (art. 248 LCT)',
      text:
        'Sustitúyese el artículo 248 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 248: Indemnización por antigüedad. Monto. Beneficiarios. En caso de muerte del trabajador, tendrán derecho a percibir una indemnización igual a la prevista en el artículo 247 de esta ley, las personas que se detallan a continuación: a) El cónyuge o conviviente del causante; b) Los hijos del causante menores de edad; c) Los hijos del causante mayores de edad con Certificado Único de Discapacidad (CUD). De concurrir dos (2) o más de los supuestos detallados anteriormente, se distribuirá la indemnización en partes iguales. En caso de ausencia de los supuestos indicados, tendrán derecho los hijos del causante mayores de edad y, ante la falta de beneficiarios, los padres del causante que estuvieren a cargo al momento del fallecimiento. El empleador queda liberado del pago si cancela la misma dentro de los treinta (30) días de ocurrido el deceso. Si por alguna circunstancia algún acreedor con mejor o igual derecho reclama vencido el plazo, sólo tendrá una acción de repetición contra los otros acreedores, quedando eximido el empleador de toda obligación."',      plainLanguageExplanation:
        'Si el trabajador muere, cobran la indemnización: 1° cónyuge o conviviente e hijos menores/con discapacidad (en partes iguales); 2° hijos mayores sin discapacidad; 3° padres a cargo. El empleador se libera si paga dentro de los 30 días del fallecimiento.',
      practicalEffects: [
        'Orden de prioridad: cónyuge/conviviente + hijos menores/discapacitados → hijos mayores → padres a cargo',
        'Si hay varios beneficiarios del mismo orden → partes iguales',
        'Pago dentro de 30 días → empleador queda liberado aunque aparezcan otros beneficiarios',
        'Los hijos con discapacidad tienen igual prioridad que los menores',
      ],
      examples: [
        'Trabajador fallece, deja viuda e hijo menor → cobran en partes iguales (50% cada uno)',
        'Trabajador sin cónyuge ni hijos menores → cobran sus hijos mayores en partes iguales',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['muerte del trabajador', 'indemnización', 'beneficiarios', 'cónyuge', 'hijos', 'discapacidad', 'padres'],
      order: 52,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-53',
      lawId: LAW_ID,
      number: '53',
      title: 'Reingreso — deducción de indemnizaciones previas (art. 255 LCT)',
      text:
        'Sustitúyese el artículo 255 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 255: Reingreso del trabajador. Deducción de las indemnizaciones percibidas. La antigüedad del trabajador se establecerá conforme a lo dispuesto en los artículos 18 y 19 de esta ley, pero si hubiera mediado reingreso a las órdenes del mismo empleador se deducirá de las indemnizaciones de los artículos 245, 246, 247, 250, 251, 253 y 254 lo pagado oportunamente, actualizado por el Índice de Precios al Consumidor (IPC), por la causal de cese anterior. En ningún caso la indemnización resultante podrá ser inferior a la que hubiera correspondido al trabajador si su período de servicios hubiera sido solo el último y con prescindencia de los períodos anteriores al reingreso."',      plainLanguageExplanation:
        'Si te reincorporás con el mismo empleador y luego te volvés a ir, la indemnización anterior que cobrastes se descuenta de la nueva (actualizada por IPC). Pero la indemnización final nunca puede ser menor a la que te correspondería solo por el último período de trabajo.',
      practicalEffects: [
        'Evita cobrar doble indemnización por la misma antigüedad',
        'La deducción de la indemnización anterior se actualiza por IPC (no se descuenta a valor nominal)',
        'Piso de protección: la indemnización nunca cae por debajo de la que correspondería solo al último período',
      ],
      examples: [
        'Trabajaste 5 años, cobrastes $500.000 de indemnización, volviste 3 años más → se descuenta los $500.000 ajustados por IPC de la nueva indemnización por 8 años',
        'Si el descuento hace que la nueva indemnización quede en $0 → se paga al menos la que corresponde a 3 años (el último período)',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['reingreso', 'deducción', 'indemnización', 'IPC', 'antigüedad', 'doble indemnización'],
      order: 53,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-54',
      lawId: LAW_ID,
      number: '54',
      title: 'Actualización de créditos laborales por IPC (art. 276 LCT)',
      text:
        'Sustitúyese el artículo 276 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 276: Actualización y repotenciación de los créditos laborales por depreciación monetaria. Los créditos provenientes de las relaciones individuales de trabajo serán actualizados por la variación que resulte del Índice de Precios al Consumidor (IPC) - Nivel General, elaborado por el Instituto Nacional de Estadística y Censos (INDEC), con más una tasa de interés del tres por ciento (3%) anual, desde que cada suma sea debida y hasta el momento del efectivo pago."',      plainLanguageExplanation:
        'Los créditos laborales (sueldos impagos, indemnizaciones, etc.) se actualizan por la variación del IPC (INDEC) más un 3% anual de interés, desde que se debieron hasta que se paguen efectivamente.',
      practicalEffects: [
        'IPC + 3% anual reemplaza los intereses moratorios del BCRA en créditos laborales',
        'Se aplica desde que el crédito es exigible hasta el pago efectivo',
        'Protege el valor real del crédito del trabajador contra la inflación',
      ],
      examples: [
        'Te debían $200.000 en enero 2025 → en enero 2026, con inflación del 60%, se te deben $320.000 + 3% anual de interés',
        'Una indemnización de despido impaga durante 2 años → se actualiza por IPC esos 2 años más el 3% anual',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['actualización', 'créditos laborales', 'IPC', 'INDEC', 'interés', 'inflación', 'depreciación'],
      order: 54,
      amendments: [],
      segments: [],
    },

    // ── BATCH 9: Arts. 88–97 (Tít. III disposiciones transitorias + Tít. IV honorarios) ──

    {
      id: 'art-27802-88',
      lawId: LAW_ID,
      number: '88',
      title: 'Fallos plenarios — solo por sentencia plenaria (art. 124 Ley 18.345)',
      text:
        'Sustitúyese el artículo 124 de la Ley de Organización y Procedimiento de la Justicia Nacional de Trabajo N° 18.345 (t.o. por Decreto N° 106/98) y sus modificaciones, por el siguiente:\n"Artículo 124: Dictado de fallos plenarios. Prohibiciones. En materia de fallos plenarios, regirán las disposiciones del Código Procesal Civil y Comercial de la Nación. Los criterios de aplicación obligatoria o sugerida para la resolución de aspectos concernientes a las causas judiciales, no podrán ser establecidos por otro instrumento que no sea sentencia plenaria."',      plainLanguageExplanation:
        'Los criterios obligatorios para resolver causas laborales solo pueden fijarse mediante fallos plenarios formales, no por circulares, instructivos o acuerdos informales de los tribunales. Rige el CPCCN en esta materia.',
      practicalEffects: [
        'Las "acordadas" u otros instrumentos no pueden fijar criterios vinculantes',
        'Solo un fallo plenario puede establecer doctrina obligatoria para el fuero laboral',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['fallos plenarios', 'doctrina legal', 'criterios obligatorios', 'fuero laboral', 'CPCCN'],
      order: 88,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-89',
      lawId: LAW_ID,
      number: '89',
      title: 'Vinculación obligatoria a precedentes de la CSJN — apartamiento es causal de mal desempeño',
      text:
        'Los jueces que resuelvan causas de índole laboral deberán, de forma obligatoria, adecuar sus decisiones a los precedentes establecidos por la Corte Suprema de Justicia de la Nación en la materia. El apartamiento infundado de los magistrados respecto de dichos criterios configurará una causal de mal desempeño en sus funciones.',      plainLanguageExplanation:
        'Los jueces laborales están obligados a seguir los precedentes de la Corte Suprema. Si un juez se aparta sin fundamento de la jurisprudencia de la CSJN, incurre en causal de mal desempeño (lo que puede llevar a un jury de enjuiciamiento).',
      practicalEffects: [
        'Los jueces de primera y segunda instancia no pueden apartarse libremente de la CSJN',
        'Apartamiento infundado = mal desempeño → posible jury de enjuiciamiento',
        'Refuerza la previsibilidad de los fallos laborales al nivel de los precedentes de la Corte',
      ],
      examples: [
        'Si la CSJN fijó un criterio sobre actualización de créditos laborales, los jueces inferiores deben seguirlo o fundar el apartamiento bajo riesgo de jury',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['CSJN', 'precedentes', 'mal desempeño', 'jury', 'vinculación', 'predictibilidad'],
      order: 89,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-90',
      lawId: LAW_ID,
      number: '90',
      title: 'Transferencia de la Justicia Nacional del Trabajo a CABA — aprobación del acuerdo',
      text:
        'Aprobación del Acuerdo de Transferencia de la función judicial en materia laboral. Apruébese el "Acuerdo de Transferencia de la Función Judicial en Materia Laboral del Ámbito Nacional a la Justicia del Trabajo de la Ciudad Autónoma de Buenos Aires", celebrado entre el Estado Nacional y el Gobierno de la Ciudad Autónoma de Buenos Aires el 9 de febrero de 2026, cuyo texto se adjunta en copia como Anexo I y forma parte integrante del presente artículo. Deróguese toda norma que se oponga a lo dispuesto en el Acuerdo que por el presente artículo se aprueba.',      plainLanguageExplanation:
        'Se aprueba el acuerdo entre el Estado Nacional y el Gobierno de la Ciudad de Buenos Aires para transferir la Justicia Nacional del Trabajo al fuero laboral de la CABA. Es el marco legal de la "judicialización porteña" del fuero laboral nacional.',
      practicalEffects: [
        'La Justicia Nacional del Trabajo pasará progresivamente al fuero laboral de CABA',
        'Los juicios laborales en CABA eventualmente tramitarán ante el fuero de CABA, no el nacional',
        'Se derogan normas que se opongan al acuerdo',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['transferencia judicial', 'CABA', 'Justicia Nacional del Trabajo', 'fuero laboral', 'federalismo'],
      order: 90,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-91',
      lawId: LAW_ID,
      number: '91',
      title: 'Recursos para la transferencia judicial laboral a CABA',
      text:
        'Encomiéndase al Poder Ejecutivo nacional a transferir al Gobierno de la Ciudad Autónoma de Buenos Aires los recursos necesarios para el funcionamiento del fuero del trabajo de la Ciudad Autónoma de Buenos Aires, garantizando el adecuado funcionamiento transitorio de la Justicia Nacional del Trabajo, en virtud del acuerdo aprobado por el artículo precedente de esta ley, y a celebrar los convenios específicos para la transferencia de recursos que fueran necesarios para su adecuada ejecución en los términos de su Cláusula Séptima.',      plainLanguageExplanation:
        'El PEN debe transferir al GCBA los recursos (presupuesto, infraestructura, personal) necesarios para que el fuero laboral de CABA funcione durante la transición, garantizando que la Justicia Nacional del Trabajo siga funcionando hasta que se complete la transferencia.',
      practicalEffects: [
        'El Estado Nacional financia la transición del fuero laboral a CABA',
        'La Justicia Nacional del Trabajo sigue funcionando durante la transferencia',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['transferencia judicial', 'recursos', 'CABA', 'PEN', 'convenios'],
      order: 91,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-92',
      lawId: LAW_ID,
      number: '92',
      title: 'Vigencia de Ley 18.345 hasta completar la transferencia judicial',
      text:
        'Las disposiciones de la ley 18.345 mantendrán su vigencia hasta tanto se encuentre concluido el proceso de transferencia de competencias establecido en el "Acuerdo de Transferencia de la Función Judicial en Materia Laboral del Ámbito Nacional a la Justicia del Trabajo de la Ciudad Autónoma de Buenos Aires", aprobado por la presente ley.',      plainLanguageExplanation:
        'La Ley 18.345 (que organiza la Justicia Nacional del Trabajo) sigue vigente hasta que se complete la transferencia del fuero laboral a CABA. Es una norma de derecho transitorio.',
      practicalEffects: [
        'La Ley 18.345 no queda derogada inmediatamente sino que se extingue gradualmente',
        'Los juicios en trámite siguen bajo las reglas de la 18.345 hasta la transferencia',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['ley 18.345', 'vigencia transitoria', 'transferencia judicial', 'CABA'],
      order: 92,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-93',
      lawId: LAW_ID,
      number: '93',
      title: 'Aplicación inmediata de las reformas procesales — excepto arts. 79 y 80',
      text:
        'Las modificaciones introducidas por el presente Título serán de aplicación a todos los procesos en trámite a partir del día siguiente al de la publicación de la presente ley en el Boletín Oficial, con excepción de lo dispuesto en los artículos 79 y 80 de la presente ley.',      plainLanguageExplanation:
        'Las reformas al procedimiento laboral del Título III se aplican inmediatamente a todos los juicios en curso, desde el día siguiente a la publicación en el Boletín Oficial. Excepción: los arts. 79 (competencia con el Estado) y 80 (competencia territorial) tienen su propia regla de aplicación en el art. 94.',
      practicalEffects: [
        'Reforma procesal retroactiva: aplica a juicios ya iniciados desde el día de publicación',
        'Arts. 79 y 80 tienen régimen diferenciado de aplicación (ver art. 94)',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['aplicación inmediata', 'juicios en trámite', 'reforma procesal', 'Boletín Oficial'],
      order: 93,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-94',
      lawId: LAW_ID,
      number: '94',
      title: 'Aplicación de arts. 79 y 80 — solo procesos con competencia pendiente',
      text:
        'Las modificaciones introducidas por los artículos 79 y 80 de la presente ley serán de aplicación a partir del día siguiente al de la publicación de la presente ley en el Boletín Oficial y en aquellos procesos en trámite en los que la competencia estuviere pendiente de resolución.',      plainLanguageExplanation:
        'Los cambios en competencia (arts. 79 y 80) aplican desde la publicación en el BO, pero solo a juicios donde la cuestión de competencia todavía no fue resuelta. Si ya había decisión firme sobre competencia, el proceso continúa como estaba.',
      practicalEffects: [
        'Juicios donde la competencia ya está resuelta: no cambia nada',
        'Juicios donde la competencia está en debate: deben adecuarse a las nuevas reglas de los arts. 79 y 80',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['competencia', 'aplicación transitoria', 'arts. 79 y 80', 'juicios en trámite'],
      order: 94,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-95',
      lawId: LAW_ID,
      number: '95',
      title: 'Honorarios de peritos en causas sin monto — mínimo 2 UMA (art. 60 Ley 27.423)',
      text:
        'Sustitúyese el artículo 60 de la Ley de Honorarios Profesionales de Abogados, Procuradores y Auxiliares de la Justicia Nacional y Federal N° 27.423 y su modificación, por el siguiente:\n"Artículo 60: En los procesos no susceptibles de apreciación pecuniaria, los honorarios de los peritos y de los peritos liquidadores de averías serán fijados conforme a las pautas valorativas del artículo 16 y en un mínimo de dos (2) UMA, siendo suficiente para la fijación de los honorarios mínimos, la aceptación del cargo conferido. En el caso de los demás auxiliares de la Justicia, se aplicarán las normas específicas."',      plainLanguageExplanation:
        'Para causas sin valor económico determinable, los honorarios de los peritos tienen un piso de 2 UMA (Unidades de Medida Arancelaria). Con solo aceptar el cargo, el perito ya tiene derecho al mínimo.',
      practicalEffects: [
        'Honorario mínimo garantizado de 2 UMA por la sola aceptación del cargo',
        'Aplica a procesos sin valor económico definido',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['honorarios peritos', 'UMA', 'proceso sin monto', 'ley 27.423', 'mínimo arancelario'],
      order: 95,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-96',
      lawId: LAW_ID,
      number: '96',
      title: 'Honorarios de peritos en causas con monto — mínimo 2 UMA (art. 61 Ley 27.423)',
      text:
        'Sustitúyese el artículo 61 de la Ley de Honorarios Profesionales de Abogados, Procuradores y Auxiliares de la Justicia Nacional y Federal N° 27.423 y su modificación, por el siguiente:\n"Artículo 61: En los procesos susceptibles de apreciación pecuniaria, por las actuaciones de primera instancia hasta la sentencia, los honorarios del perito y del perito liquidador de averías serán fijados conforme lo establece el artículo 32. Para tales casos los honorarios mínimos a regular alcanzan a dos (2) UMA. En el caso de los demás auxiliares de la Justicia se aplicarán las normas específicas."',      plainLanguageExplanation:
        'Para causas con monto determinable, los honorarios de los peritos se calculan según el art. 32 de la Ley 27.423, con un piso de 2 UMA. El cálculo ya no depende del monto del juicio (en línea con art. 97 que lo prohíbe expresamente).',
      practicalEffects: [
        'Honorario mínimo: 2 UMA para procesos con valor económico',
        'El cálculo respeta el art. 32 (criterios cualitativos) no un porcentaje del monto del juicio',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['honorarios peritos', 'UMA', 'primera instancia', 'ley 27.423', 'proceso con monto'],
      order: 96,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-97',
      lawId: LAW_ID,
      number: '97',
      title: 'Honorarios de peritos — prohibición de vincularlos al monto o porcentaje de incapacidad (art. 61 bis Ley 27.423)',
      text:
        'Incorpórase como artículo 61 bis de la Ley de Honorarios Profesionales de Abogados, Procuradores y Auxiliares de la Justicia Nacional y Federal N° 27.423 y su modificación, el siguiente:\n"Artículo 61 bis: Los honorarios de los peritos que intervengan en las controversias judiciales, no estarán vinculados a la cuantía del respectivo juicio, ni al porcentaje de incapacidad que se dictamine en caso de producirse una pericia médica. Su regulación responderá exclusivamente a la apreciación judicial de la labor técnica realizada en el pleito y su relevancia; calidad y extensión en lo concreto y deberá fijarse en un monto que asegure una adecuada retribución al perito. Por cada pericia, se fijará un monto mínimo de dos (2) UMA. En caso de finalizar el proceso por transacción, avenimiento y conciliación, sin que el perito haya presentado la pericia encargada, se le regulará un cuarto (1/4) de UMA en tanto el perito haya aceptado el cargo."',      plainLanguageExplanation:
        'Los honorarios de los peritos judiciales no pueden vincularse al monto del juicio ni al porcentaje de incapacidad dictaminado. Se fijan por la calidad y extensión del trabajo pericial. Mínimo: 2 UMA. Si el juicio termina antes de que el perito presente su informe: honorario reducido de 0,25 UMA (por aceptar el cargo).',
      practicalEffects: [
        'Elimina el incentivo a inflar porcentajes de incapacidad para cobrar más honorarios',
        'Elimina el incentivo a buscar los juicios de mayor monto',
        'Mínimo: 2 UMA por pericia presentada',
        'Si el juicio termina sin pericia (conciliación): 0,25 UMA (por haber aceptado)',
      ],
      examples: [
        'Juicio de $50M con pericia médica: el perito cobra por la calidad de su dictamen, no por el monto → puede cobrar lo mismo que en un juicio de $500.000',
        'Conciliación antes de la pericia: el perito cobra solo 0,25 UMA aunque hubiera preparado algo',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['honorarios peritos', 'incapacidad', 'UMA', 'pericia médica', 'monto del juicio', 'ley 27.423'],
      order: 97,
      amendments: [],
      segments: [],
    },

    // ── BATCH 8: Arts. 78–87 (Tít. III — Procedimiento laboral Ley 18.345) ──

    {
      id: 'art-27802-78',
      lawId: LAW_ID,
      number: '78',
      title: 'Peritos médicos y psicólogos — especialización y criterios objetivos (art. 18 Ley 18.345)',
      text:
        'Sustitúyese el artículo 18 de la Ley de Organización y Procedimiento de la Justicia Nacional de Trabajo N° 18.345 (t.o. por Decreto N° 106/98) y sus modificaciones, por el siguiente:\n"Artículo 18: Peritos Médicos y Psicólogos. Los peritos médicos y psicólogos deberán ser profesionales legistas o especialistas en la rama de la medicina relacionada con la cuestión sometida a su dictamen. Estos deberán contar con la capacidad operativa y la especialización necesaria para atender las controversias judiciales suscitadas en el marco del Sistema de Riesgos del Trabajo, asegurando la objetividad e independencia en sus dictámenes. Para ello deberán valerse de los entornos digitales que la Superintendencia de Riesgos del Trabajo ponga a su disposición, y sus trabajos serán retribuidos tomando en consideración exclusivamente la relevancia, calidad y extensión de la labor profesional realizada, con total prescindencia del monto del proceso y de la gravedad de las constataciones efectuadas."',      plainLanguageExplanation:
        'Los peritos médicos y psicólogos en juicios laborales deben ser especialistas en la materia. Sus honorarios se calculan por la calidad y extensión de su trabajo, no por el monto del juicio ni por el porcentaje de incapacidad que certifiquen. Elimina el incentivo a inflar dictámenes.',
      practicalEffects: [
        'Honorarios del perito: basados en calidad del trabajo, NO en el monto del juicio ni en el % de incapacidad',
        'Deben usar plataformas digitales de la SRT',
        'Solo pueden ser peritos los especialistas en la rama médica relevante',
      ],
      examples: [
        'Juicio por accidente laboral de $10M: el perito médico no cobra más que en un juicio de $1M por el mismo trabajo',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['peritos médicos', 'honorarios', 'incapacidad', 'SRT', 'objetividad', 'riesgos del trabajo'],
      order: 78,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-79',
      lawId: LAW_ID,
      number: '79',
      title: 'Competencia por materia laboral — causas con el Estado al fuero contencioso administrativo (art. 20 Ley 18.345)',
      text:
        'Sustitúyese el artículo 20 de la Ley de Organización y Procedimiento de la Justicia Nacional de Trabajo N° 18.345 (t.o. por Decreto N° 106/98) y sus modificaciones, por el siguiente:\n"Artículo 20: Competencia por materia. Serán de competencia de la Justicia Nacional del Trabajo, en general, las causas contenciosas en conflictos individuales de derecho, por demandas o reconvenciones fundadas en los contratos de trabajo, Convenciones Colectivas de Trabajo, laudos con eficacia de convenciones colectivas, o disposiciones legales o reglamentarias del Derecho del Trabajo; y las causas entre trabajadores y empleadores relativas a un contrato de trabajo, aunque se funden en disposiciones del derecho común aplicables a aquél. En los casos que versen sobre la materia establecida en el párrafo anterior y a su vez sea parte o tercero interesado el Estado nacional, incluyendo los entes previstos en el artículo 8°, inciso a), de la ley 24.156 y sus modificaciones, serán competentes el fuero Contencioso Administrativo Federal de la Ciudad Autónoma de Buenos Aires y, en las demás jurisdicciones, la Justicia Federal con competencia en lo contencioso administrativo. En ningún caso la Justicia Nacional del Trabajo podrá expedirse en las causas aquí comprendidas."',      plainLanguageExplanation:
        'Las causas laborales entre privados van al fuero laboral. Pero si el Estado Nacional (o entes estatales) es parte o tercero interesado, la causa va al fuero Contencioso Administrativo Federal, no al laboral. El fuero laboral no puede intervenir en causas donde el Estado sea parte.',
      practicalEffects: [
        'Empleado de empresa privada vs. empleador privado: fuero laboral',
        'Empleado vs. Estado (ministerio, ANSES, AFIP, CONICET, etc.): fuero contencioso administrativo federal',
        'El fuero laboral no puede avocarse si el Estado es parte — se declara incompetente',
      ],
      examples: [
        'Despido de un empleado de ANSES: la demanda va al fuero contencioso administrativo federal, no al laboral',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['competencia', 'fuero laboral', 'contencioso administrativo', 'Estado', 'jurisdicción'],
      order: 79,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-80',
      lawId: LAW_ID,
      number: '80',
      title: 'Competencia territorial en causas laborales (art. 24 Ley 18.345)',
      text:
        'Sustitúyese el artículo 24 de la Ley de Organización y Procedimiento de la Justicia Nacional de Trabajo N° 18.345 (t.o. por Decreto N° 106/98) y sus modificaciones, por el siguiente:\n"Artículo 24: Competencia territorial. En las causas entre trabajadores y empleadores será competente, a elección del demandante, el juez del lugar del trabajo, o el del lugar de celebración del contrato, o el del domicilio del empleador. El que no tuviere domicilio fijo, podrá ser demandado en el lugar en que se encuentre o en el de su última residencia."',      plainLanguageExplanation:
        'El trabajador que demanda puede elegir entre tres jueces: el del lugar donde trabajaba, el del lugar donde firmó el contrato, o el del domicilio del empleador. Elección a favor del demandante.',
      practicalEffects: [
        'El trabajador elige el tribunal más conveniente entre tres opciones',
        'Protección del trabajador: puede demandar donde le resulte más accesible',
      ],
      examples: [
        'Trabajador que trabajaba en Rosario, firmó el contrato en CABA y el empleador tiene sede en Córdoba: puede demandar en cualquiera de esas tres jurisdicciones',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['competencia territorial', 'lugar del trabajo', 'domicilio empleador', 'elección del demandante'],
      order: 80,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-81',
      lawId: LAW_ID,
      number: '81',
      title: 'Recusación y excusación en justicia laboral (art. 26 Ley 18.345)',
      text:
        'Sustitúyese el artículo 26 de la Ley de Organización y Procedimiento de la Justicia Nacional de Trabajo N° 18.345 (t.o. por Decreto N° 106/98) y sus modificaciones, por el siguiente:\n"Artículo 26: Recusación y excusación. En materia de recusaciones, con y sin expresión de causa, y excusaciones de jueces, secretarios, árbitros y peritos regirán las disposiciones del Código Procesal Civil y Comercial de la Nación."',      plainLanguageExplanation:
        'Para recusar (pedir que un juez se aparte) o excusar (que el juez mismo se excuse), en el fuero laboral se aplican las mismas reglas del Código Procesal Civil y Comercial de la Nación.',
      practicalEffects: [
        'Se unifican las reglas de recusación del CPCCN para el fuero laboral',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['recusación', 'excusación', 'CPCCN', 'fuero laboral', 'juez'],
      order: 81,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-82',
      lawId: LAW_ID,
      number: '82',
      title: 'Caducidad de instancia en juicios laborales (art. 46 Ley 18.345)',
      text:
        'Sustitúyese el artículo 46 de la Ley de Organización y Procedimiento de la Justicia Nacional de Trabajo N° 18.345 (t.o. por Decreto N° 106/98) y sus modificaciones, por el siguiente:\n"Artículo 46: Impulso del proceso. El procedimiento será impulsado por las partes. Se producirá la caducidad de instancia cuando no se instare su curso dentro de los siguientes plazos, sin necesidad de intimación previa:\n1) De seis (6) meses, en primera o única instancia.\n2) De tres (3) meses, en segunda instancia y en cualquiera de las instancias en el juicio sumarísimo, en el juicio ejecutivo, en las ejecuciones especiales y en los incidentes.\n3) De un (1) mes, en el incidente de caducidad de instancia.\nLa instancia se abre con la promoción de la demanda aunque no hubiere sido notificada la resolución que dispone su traslado y termina con el dictado de la sentencia."',      plainLanguageExplanation:
        'Las partes son responsables de impulsar el proceso. Si el juicio no avanza, caduca: 6 meses sin movimiento en primera instancia, 3 meses en segunda instancia, 1 mes en incidentes. La caducidad opera sin necesidad de aviso previo.',
      practicalEffects: [
        '1ra instancia: 6 meses de inactividad → caducidad automática',
        '2da instancia y procesos sumarísimos/ejecutivos: 3 meses',
        'Incidentes de caducidad: 1 mes',
        'No se requiere intimación previa para declarar la caducidad',
      ],
      examples: [
        'Juicio laboral en trámite hace 7 meses sin que ninguna parte impulse → el juez puede declarar la caducidad de oficio',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['caducidad de instancia', '6 meses', 'impulso procesal', 'fuero laboral', 'inactividad'],
      order: 82,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-83',
      lawId: LAW_ID,
      number: '83',
      title: 'Incorporación de medios probatorios en la demanda (art. 65 inc. 8 Ley 18.345)',
      text:
        'Incorpórase como inciso 8) al artículo 65 de la Ley de Organización y Procedimiento de la Justicia Nacional de Trabajo N° 18.345 (t.o. por Decreto N° 106/98) y sus modificaciones, el siguiente texto:\n"8) La mención de los medios de prueba que la parte intente hacer valer para demostrar sus afirmaciones. Asimismo, presentará los documentos que obraren en su poder y si no los tuviere los individualizará indicando su contenido, la persona en cuyo poder se hallaren, o el lugar, archivo u oficina donde se encuentren."',      plainLanguageExplanation:
        'La demanda laboral ahora debe incluir todos los medios de prueba que el actor pretende usar. Si tiene documentos, los presenta. Si no los tiene, debe identificar dónde están. Esto obliga a preparar el caso probatorio desde el inicio.',
      practicalEffects: [
        'La demanda laboral debe incluir el ofrecimiento de prueba desde el primer escrito',
        'Documentos en poder del actor: adjuntarlos con la demanda',
        'Documentos en poder de terceros: individualizarlos (quién los tiene, dónde están)',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['demanda laboral', 'prueba', 'documentos', 'ofrecimiento de prueba', 'art. 65'],
      order: 83,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-84',
      lawId: LAW_ID,
      number: '84',
      title: 'Contestación de demanda laboral — rebeldía automática (art. 71 Ley 18.345)',
      text:
        'Sustitúyese el artículo 71 de la Ley de Organización y Procedimiento de la Justicia Nacional de Trabajo N° 18.345 (t.o. por Decreto N° 106/98) y sus modificaciones, por el siguiente:\n"Artículo 71: Contestación de la demanda. La contestación de la demanda se formulará por escrito y se ajustará, en lo aplicable, a lo dispuesto en el artículo 65 de esta ley y en el artículo 356 del Código Procesal Civil y Comercial de la Nación. Del responde y de su documentación, se dará traslado al actor quien dentro del tercer día de notificado reconocerá o desconocerá la autenticidad de la documentación aportada por la demandada. Si el demandado debidamente citado no contestare la demanda en el plazo previsto en el artículo 68 será declarado rebelde, presumiéndose como ciertos los hechos expuestos en ella, salvo prueba en contrario."',      plainLanguageExplanation:
        'El empleador que no contesta la demanda laboral en el plazo legal es declarado rebelde: se presumen ciertos los hechos alegados por el trabajador, salvo prueba en contrario. El actor tiene 3 días para reconocer o desconocer la documentación que presente el demandado.',
      practicalEffects: [
        'No contestar = rebeldía → se presumen ciertos los hechos del trabajador',
        'El trabajador tiene 3 días para reconocer o impugnar documentos del empleador',
        'La carga de contradecir los documentos es en plazo breve',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['contestación demanda', 'rebeldía', 'presunción', 'plazo', 'fuero laboral'],
      order: 84,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-85',
      lawId: LAW_ID,
      number: '85',
      title: 'Excepciones previas en juicio laboral — rige el CPCCN (art. 76 Ley 18.345)',
      text:
        'Sustitúyese el artículo 76 de la Ley de Organización y Procedimiento de la Justicia Nacional de Trabajo N° 18.345 (t.o. por Decreto N° 106/98) y sus modificaciones, por el siguiente:\n"Artículo 76: Excepciones previas. En materia de excepciones de previo y especial pronunciamiento, regirán las disposiciones del Código Procesal Civil y Comercial de la Nación. Junto con la oposición de la excepción deberá ofrecerse toda la prueba referida a ella. En el caso de la resolución de la excepción de prescripción, para que sea resuelta de previo y especial pronunciamiento será necesario que ella no requiera la producción de prueba."',      plainLanguageExplanation:
        'Para las excepciones de previo y especial pronunciamiento (incompetencia, falta de legitimación, prescripción, etc.) en el fuero laboral rige el CPCCN. La prueba de la excepción se ofrece junto con ella. La prescripción se resuelve de previo pronunciamiento solo si no requiere producir prueba.',
      practicalEffects: [
        'Las reglas del CPCCN se aplican a excepciones previas en el fuero laboral',
        'Toda la prueba de la excepción debe ofrecerse al mismo tiempo que se opone',
        'Excepción de prescripción sin necesidad de prueba: se resuelve antes de la sentencia',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['excepciones previas', 'prescripción', 'CPCCN', 'fuero laboral', 'incompetencia'],
      order: 85,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-86',
      lawId: LAW_ID,
      number: '86',
      title: 'Nuevas sentencias apelables — incompetencia y falta de legitimación (art. 108 Ley 18.345)',
      text:
        'Incorpórase como inciso d) al artículo 108 de la Ley de Organización y Procedimiento de la Justicia Nacional de Trabajo N° 18.345 (t.o. por Decreto N° 106/98) y sus modificaciones, el siguiente texto:\n"d) Las sentencias por las que el magistrado rechaza excepciones de incompetencia y de falta de legitimación pasiva y activa."',      plainLanguageExplanation:
        'Agrega un nuevo caso apelable: cuando el juez laboral rechaza una excepción de incompetencia o de falta de legitimación (activa o pasiva), esa resolución puede apelarse de inmediato, antes de la sentencia final.',
      practicalEffects: [
        'Si el juez rechaza la excepción de incompetencia, el empleador puede apelar de inmediato',
        'Importante para el Estado: puede apelar cuando el fuero laboral se considera competente siendo que debería ir al contencioso administrativo',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['apelación', 'incompetencia', 'legitimación', 'fuero laboral', 'recursos'],
      order: 86,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-87',
      lawId: LAW_ID,
      number: '87',
      title: 'Apelaciones con efecto diferido — salvo competencia e incompetencia (art. 110 Ley 18.345)',
      text:
        'Sustitúyese el artículo 110 de la Ley de Organización y Procedimiento de la Justicia Nacional de Trabajo N° 18.345 (t.o. por Decreto N° 106/98) y sus modificaciones, por el siguiente:\n"Artículo 110: Apelaciones anteriores a la sentencia. Salvo el caso del artículo 146, los supuestos vinculados a la competencia del tribunal, la falta de legitimación pasiva y activa, y los de medidas cautelares, todas las apelaciones interpuestas aún en juicios prima facie inapelables, se tendrán presentes con efecto diferido hasta el momento en que se haya puesto fin al proceso de conocimiento, en primera instancia, con la sentencia definitiva."',      plainLanguageExplanation:
        'En general, las apelaciones intermedias (antes de la sentencia final) no se resuelven de inmediato: quedan en suspenso hasta que haya sentencia definitiva. Excepciones: cuestiones de competencia, falta de legitimación y medidas cautelares se resuelven de inmediato.',
      practicalEffects: [
        'Agiliza el proceso: no se interrumpe el juicio por apelaciones intermedias',
        'La Cámara resuelve todas las apelaciones diferidas junto con la sentencia',
        'Las cautelares y las cuestiones de competencia sí se resuelven inmediatamente',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['apelación diferida', 'sentencia definitiva', 'medidas cautelares', 'competencia', 'fuero laboral'],
      order: 87,
      amendments: [],
      segments: [],
    },

    // ── BATCH 7: Arts. 69–77 (Tít. II — FAL: procedimiento, entidades, protección y autoridades) ──

    {
      id: 'art-27802-69',
      lawId: LAW_ID,
      number: '69',
      title: 'Procedimiento de retiro del FAL — declaración jurada y plazo de 5 días',
      text:
        'Procedimiento. Determinada la obligación de pago, si el empleador decide utilizar recursos de la cuenta del Fondo de Asistencia Laboral, deberá comunicar tal voluntad a la entidad administradora, presentando una declaración jurada que contenga:\na) Nombre y apellido del trabajador o beneficiario correspondiente del pago;\nb) Código Único de Identificación Laboral (CUIL) del trabajador o beneficiario correspondiente;\nc) Datos completos de la cuenta bancaria de titularidad del trabajador o beneficiario correspondiente del pago;\nd) Fecha y causa de la extinción de la relación laboral;\ne) Detalle de la liquidación practicada;\nf) Monto a transferir con indicación si se refiere a la cancelación total o parcial en relación con la liquidación que corresponda; y\ng) Otros datos que establezca la reglamentación.\nLa entidad administradora deberá verificar el cumplimiento de los requisitos que establecerá la reglamentación, y de encontrarse cumplidos, deberá transferir las sumas pertinentes a la cuenta bancaria del trabajador o beneficiario indicada en la declaración jurada presentada, todo ello dentro del plazo máximo de cinco (5) días hábiles.',      plainLanguageExplanation:
        'Cuando el empleador quiere usar el FAL para pagar una indemnización, presenta una declaración jurada a la entidad administradora con los datos del trabajador, causa del despido y liquidación. La entidad tiene 5 días hábiles para verificar y transferir el dinero a la cuenta del trabajador.',
      practicalEffects: [
        'Plazo máximo: 5 días hábiles para que la entidad transfiera el dinero al trabajador',
        'El empleador presenta declaración jurada con todos los datos del despido y liquidación',
        'La entidad verifica los requisitos reglamentarios antes de transferir',
      ],
      examples: [
        'Despido el día 1 → empleador presenta declaración jurada ese día → entidad tiene hasta el día 6 hábil para transferir al trabajador',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'procedimiento', 'declaración jurada', '5 días hábiles', 'transferencia', 'liquidación'],
      order: 69,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-70',
      lawId: LAW_ID,
      number: '70',
      title: 'Pago mensual al FAL — a través de ARCA',
      text:
        'Pago de la obligación. El pago de la obligación mensual a cargo del empleador, en los términos del artículo 60, se formalizará a través del procedimiento que establezca la Agencia de Recaudación y Control Aduanero (ARCA), organismo descentralizado actuante en la órbita del Ministerio de Economía, quien deberá velar por el cumplimiento de la obligación mensual y será la responsable de la gestión de cobro.',      plainLanguageExplanation:
        'La contribución mensual al FAL se paga a través de ARCA (ex-AFIP), que es responsable de la gestión de cobro y de asegurarse que el empleador cumpla mensualmente.',
      practicalEffects: [
        'Se paga junto con los aportes patronales mensuales, a través de ARCA',
        'ARCA gestiona el cobro y puede iniciar acciones si el empleador no paga',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'ARCA', 'pago mensual', 'contribución', 'gestión de cobro'],
      order: 70,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-71',
      lawId: LAW_ID,
      number: '71',
      title: 'Entidades habilitadas para administrar el FAL — comisión máxima 1%',
      text:
        'Entidades habilitadas. Las entidades habilitadas serán las responsables de la administración, inversión y resguardo de los Fondos de Asistencia Laboral, como también de velar por el cumplimiento del procedimiento de verificación y pago, y en su defecto de efectuar las denuncias ante irregularidades que pudieran detectar. Las entidades habilitadas únicamente podrán percibir una contraprestación, en concepto de comisiones y gastos por todas las funciones que les asigna la presente ley, con un tope de comisión del uno por ciento (1%).',      plainLanguageExplanation:
        'Las entidades que administran el FAL (fondos comunes de inversión habilitados por CNV) deben invertir y custodiar los fondos, verificar los retiros y denunciar irregularidades. Solo pueden cobrar hasta el 1% de comisión por todos sus servicios.',
      practicalEffects: [
        'Comisión máxima: 1% sobre los fondos administrados',
        'Tienen obligación de denunciar irregularidades que detecten',
        'Son responsables de verificar que los retiros cumplan los requisitos antes de transferir',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'entidades habilitadas', 'comisión 1%', 'inversión', 'CNV', 'administración'],
      order: 71,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-72',
      lawId: LAW_ID,
      number: '72',
      title: 'Remanente del FAL — extinción de cuenta y devolución al empleador',
      text:
        'Remanente. En caso de cese, disolución, liquidación o quiebra del empleador, la cuenta individual quedará extinguida, y los recursos deberán ser transferidos a una cuenta bancaria de titularidad del empleador en el país, salvo disposición en contrario del juez de la quiebra. En caso de que el empleador no cuente con trabajadores registrados en un plazo de seis (6) meses continuos, la cuenta individual, salvo que el empleador denuncie y acredite la existencia de por lo menos un reclamo judicial pendiente de resolución, quedará extinguida. Producida la extinción, los recursos deberán ser transferidos a una cuenta bancaria de titularidad del empleador en el país. El empleador podrá solicitar la extinción de su cuenta individual a la Secretaría de Trabajo, Empleo y Seguridad Social, acreditando la inexistencia de contingencias laborales.',      plainLanguageExplanation:
        'Si el empleador cierra su empresa o quiebra, la cuenta FAL se extingue y el dinero va al empleador (salvo que el juez de la quiebra diga otra cosa). También se extingue si el empleador lleva 6 meses sin trabajadores registrados y no hay reclamos judiciales pendientes.',
      practicalEffects: [
        'Al cierre de la empresa: el saldo del FAL vuelve al empleador (no al Estado)',
        '6 meses sin empleados registrados + sin juicios pendientes → cuenta extinguida',
        'El empleador puede pedir la extinción voluntaria si acredita que no tiene contingencias',
        'En quiebra: el juez puede disponer el destino del saldo del FAL',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'remanente', 'extinción', 'quiebra', 'liquidación', 'devolución'],
      order: 72,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-73',
      lawId: LAW_ID,
      number: '73',
      title: 'Transferencia del FAL en transferencia de establecimiento',
      text:
        'Transferencia de establecimiento o cesión de personal. La transferencia del establecimiento o cesión de personal, en los términos de los artículos 225, 229 y concordantes de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones que constituya un único establecimiento donde prestan tareas todos los trabajadores en relación de dependencia, implicará la transferencia de la cuenta asociada, incluyendo sus recursos, movimientos y remanentes, en los términos y condiciones previstos en las leyes aplicables y que se establezcan en la reglamentación. Se aplicará igual criterio para el caso de reorganizaciones en los términos del artículo 80 y 81 de la Ley de Impuesto a las Ganancias, texto ordenado en 2019 y sus modificaciones.',      plainLanguageExplanation:
        'Cuando se transfiere un establecimiento o se ceden trabajadores (art. 225 LCT), la cuenta FAL del empleador cedente se transfiere al nuevo empleador junto con los fondos y el historial. Lo mismo ocurre en fusiones o reorganizaciones societarias.',
      practicalEffects: [
        'El comprador de una empresa recibe también la cuenta FAL con todos sus saldos',
        'En fusiones y escisiones: el FAL sigue al establecimiento o nómina',
      ],
      examples: [
        'Empresa A compra establecimiento de Empresa B con 50 empleados → recibe la cuenta FAL de B con todo su saldo',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'transferencia', 'establecimiento', 'fusión', 'reorganización societaria', 'art. 225 LCT'],
      order: 73,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-74',
      lawId: LAW_ID,
      number: '74',
      title: 'Protección legal del FAL — inembargabilidad y afectación exclusiva',
      text:
        'Protección legal. Los Fondos, las cuentas individuales y todos los valores incorporados a ellos, serán inembargables y estarán afectados exclusivamente a la finalidad prevista en esta ley.',      plainLanguageExplanation:
        'Los fondos del FAL y sus cuentas son inembargables (ningún acreedor puede trabarlos) y solo pueden usarse para el fin previsto en la ley: pagar indemnizaciones laborales.',
      practicalEffects: [
        'Los acreedores del empleador no pueden embargar los fondos del FAL',
        'Los fondos del FAL no pueden usarse para nada más que pagar indemnizaciones laborales',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'inembargable', 'protección legal', 'afectación exclusiva'],
      order: 74,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-75',
      lawId: LAW_ID,
      number: '75',
      title: 'Sanciones por mal uso del FAL — multa del doble del monto ingresado',
      text:
        'Sanciones. El empleador que utilice los recursos acumulados en las cuentas para fines distintos a los previstos en el artículo 58 de la presente ley, o que opte por una entidad habilitada sobre la cual tenga vinculación directa o indirecta o contravenga las disposiciones del presente régimen, será sancionado con una multa de hasta el doble del monto ingresado al Fondo de Asistencia Laboral, más su rendimiento devengado a la fecha de la multa, sin perjuicio de las acciones civiles y/o penales que pudieran corresponder.',      plainLanguageExplanation:
        'Si el empleador usa el FAL para algo distinto a pagar indemnizaciones, o elige una entidad administradora vinculada a él, se le aplica una multa de hasta el doble de lo que había en el fondo más los rendimientos. Además puede haber acciones civiles y penales.',
      practicalEffects: [
        'Multa: hasta 2x el monto del FAL + rendimientos devengados',
        'No excluye responsabilidad civil ni penal',
        'Aplicable también si elige entidad con la que tiene vínculo societario',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'sanciones', 'multa', 'uso indebido', 'doble monto', 'penalidad'],
      order: 75,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-76',
      lawId: LAW_ID,
      number: '76',
      title: 'Reducción de contribución patronal equivalente a la contribución al FAL',
      text:
        'Reducción de Contribución Patronal. Los empleadores, por las relaciones laborales incluidas en el presente régimen, excepto que se trate de aquellas previstas en el Régimen de Incentivo a la Formalización Laboral (RIFL) y mientras persista sus efectos, tendrán una reducción en las contribuciones patronales con destino a la seguridad social equivalente a la que le resulte de aplicación de conformidad con lo dispuesto en el artículo 60.',      plainLanguageExplanation:
        'Los empleadores que contribuyen al FAL reciben una reducción en sus contribuciones patronales a la seguridad social equivalente a lo que aportan al FAL (1% o 2,5%). Es una compensación fiscal: el FAL no es un costo adicional sino una reasignación de lo que ya pagaban.',
      practicalEffects: [
        'La contribución al FAL (1% o 2,5%) se descuenta de las contribuciones patronales a la seguridad social',
        'El costo neto para el empleador no aumenta respecto a sus cargas actuales',
        'No aplica al RIFL (Régimen de Incentivo a la Formalización Laboral) mientras esté vigente',
      ],
      examples: [
        'PYME que paga 2,5% al FAL → sus aportes patronales al SIPA se reducen en ese 2,5%',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'reducción patronal', 'SIPA', 'costo laboral', 'RIFL', 'contribución patronal'],
      order: 76,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-77',
      lawId: LAW_ID,
      number: '77',
      title: 'Autoridades de aplicación del FAL — Secretaría de Trabajo, ARCA, CNV, Ministerio de Economía',
      text:
        'Autoridades de Aplicación. Vigencia. La Secretaría de Trabajo, Empleo y Seguridad Social dependiente del Ministerio de Capital Humano, la Agencia de Recaudación y Control Aduanero (ARCA), organismo descentralizado actuante en la órbita del Ministerio de Economía, la Comisión Nacional de Valores, organismo descentralizado actuante en la órbita del Ministerio de Economía y la Secretaría de Finanzas del Ministerio de Economía, en el marco de sus respectivas competencias, serán los organismos responsables de dictar las normas complementarias y velar por el funcionamiento y cumplimiento del presente régimen, como de establecer los procedimientos de control y auditoría, incluyendo el efectivo pago de las contribuciones a los fondos, el mecanismo de cobro y destino de los montos correspondientes a sanciones, la correcta afectación de los recursos a los fines exclusivamente previstos en la presente ley y el correcto funcionamiento y cumplimiento de los deberes de las entidades habilitadas a administrar los fondos.',      plainLanguageExplanation:
        'Cuatro organismos son autoridades de aplicación del FAL, cada uno en su área: la Secretaría de Trabajo (relaciones laborales), ARCA (cobro de contribuciones), CNV (habilitación y control de entidades administradoras), y la Secretaría de Finanzas (regulación financiera).',
      practicalEffects: [
        'Secretaría de Trabajo: controla que los despidos y retiros del FAL sean correctos',
        'ARCA: controla y cobra las contribuciones mensuales',
        'CNV: habilita y supervisa a las entidades administradoras del fondo',
        'Secretaría de Finanzas: regula los aspectos financieros e inversiones del fondo',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'autoridad de aplicación', 'Secretaría de Trabajo', 'ARCA', 'CNV', 'Ministerio de Economía'],
      order: 77,
      amendments: [],
      segments: [],
    },

    // ── BATCH 6: Arts. 59–68 (Tít. II — Fondo de Asistencia Laboral, constitución y administración) ──

    {
      id: 'art-27802-59',
      lawId: LAW_ID,
      number: '59',
      title: 'Naturaleza jurídica del FAL — patrimonio separado e inembargable',
      text:
        'Naturaleza jurídica. Cada empleador deberá conformar una cuenta como un patrimonio separado, de afectación específica, independiente, inajenable e inembargable, en uno de los fondos administrados por una de las entidades habilitadas a tal fin por la Comisión Nacional de Valores, organismo descentralizado actuante en la órbita del Ministerio de Economía, a elección del empleador. Los recursos disponibles en dichas cuentas estarán destinados exclusivamente al cumplimiento de las obligaciones determinadas en el artículo 58 de la presente ley.',      plainLanguageExplanation:
        'El Fondo de Asistencia Laboral de cada empleador es un patrimonio separado: no es del empleador (no puede tomarlo para otra cosa), no es embargable y es administrado por una entidad habilitada por la CNV. Solo sirve para pagar las indemnizaciones laborales previstas en el art. 58.',
      practicalEffects: [
        'El empleador elige en qué entidad habilitada por CNV abre su cuenta FAL',
        'Los fondos son inembargables: los acreedores del empleador no pueden tocarlos',
        'Solo pueden usarse para pagar indemnizaciones y liquidaciones laborales del art. 58',
      ],
      examples: [
        'Un empleador en concurso preventivo: sus acreedores no pueden ejecutar los fondos del FAL porque son patrimonio separado',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'patrimonio separado', 'inembargable', 'CNV', 'fondo de asistencia laboral', 'afectación específica'],
      order: 59,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-60',
      lawId: LAW_ID,
      number: '60',
      title: 'Contribución al FAL — 1% grandes empresas, 2,5% pymes',
      text:
        'Contribución. Las cuentas de los Fondos de Asistencia Laboral se conformarán con una contribución mensual obligatoria del uno por ciento (1%) para las grandes empresas y dos coma cinco por ciento (2,5%) para las Micro, Pequeñas y Medianas Empresas, de acuerdo a lo previsto en la ley 24.467 y sus modificatorias, de las remuneraciones que se toman como base para el cálculo de las contribuciones patronales con destino al Sistema Integrado Previsional Argentino (SIPA) de cada trabajador. Los porcentajes de las cuentas de los Fondos de Asistencia podrán incrementarse hasta el uno coma cinco por ciento (1,5%) para las grandes empresas y hasta el tres por ciento (3%) para las Micro, Pequeñas y Medianas Empresas de las remuneraciones que se toman como base para el cálculo de las contribuciones patronales con destino al Sistema Integrado Previsional Argentino (SIPA) de cada trabajador, cuando así lo disponga el Poder Ejecutivo nacional atendiendo al cumplimiento de las metas asociadas a las políticas de equilibrio fiscal, previa aprobación de la Comisión Bicameral de Control de Fondos de la Seguridad Social del Honorable Congreso de la Nación. Las sumas correspondientes serán integradas mensualmente por el empleador en oportunidad de declarar y abonar los aportes y contribuciones patronales. En pos de la simplificación y la facilitación del costo de cumplimiento, los pagos correspondientes a los importes ingresados al Fondo de Asistencia Laboral serán canalizados a través de la Agencia de Recaudación y Control Aduanero (ARCA), organismo descentralizado actuante en la órbita del Ministerio de Economía, que actuará únicamente como agente de derivación, sin asumir responsabilidad alguna por la eventual falta de pago, disponibilidad o insuficiencia de la cuenta individual.',      plainLanguageExplanation:
        'Establece la contribución mensual obligatoria al FAL: 1% de las remuneraciones para grandes empresas y 2,5% para pymes. El PEN puede subirlo al 1,5% y 3% respectivamente si lo aprueba el Congreso. La contribución se paga junto con los aportes patronales y ARCA la canaliza (sin asumir responsabilidad si no se pagó).',
      practicalEffects: [
        'Grandes empresas: 1% mensual sobre remuneraciones base SIPA (puede subir al 1,5% por decreto)',
        'Pymes (ley 24.467): 2,5% mensual (puede subir al 3%)',
        'Se integra el mismo día que se pagan los aportes patronales mensuales',
        'ARCA es solo intermediario: no garantiza el pago si el empleador no lo hizo',
      ],
      examples: [
        'Empresa mediana con nómina de $5.000.000 mensual: paga $125.000 al FAL (2,5%)',
        'Gran empresa con nómina de $10.000.000: paga $100.000 al FAL (1%)',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'contribución patronal', '1%', '2,5%', 'pymes', 'SIPA', 'ARCA', 'grandes empresas'],
      order: 60,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-61',
      lawId: LAW_ID,
      number: '61',
      title: 'Recursos del FAL — contribuciones, rendimientos y otros ingresos',
      text:
        'Recursos de los Fondos de Asistencia Laboral. Los recursos de cada Fondo de Asistencia Laboral estarán constituidos por:\na) Las contribuciones mensuales obligatorias que deba efectuar el empleador;\nb) Los rendimientos, intereses y/o cualquier otra renta derivada de las inversiones que efectúe la administradora del fondo, cuya actuación quedará sujeta a los límites de forma que el Ministerio de Economía reglamente a los fines de guardar la integralidad de sus depósitos;\nc) Las contribuciones voluntarias que efectúe el empleador;\nd) Las donaciones o legados que reciba;\ne) Cualquier otro ingreso no contemplado en los incisos precedentes.',      plainLanguageExplanation:
        'El FAL de cada empleador se integra con: las contribuciones obligatorias mensuales, los rendimientos que genera la inversión del fondo, aportes voluntarios adicionales del empleador, donaciones o legados, y cualquier otro ingreso.',
      practicalEffects: [
        'El fondo crece no solo por contribuciones sino también por rendimientos financieros de la inversión',
        'El empleador puede aportar más de lo obligatorio (voluntariamente)',
        'El Ministerio de Economía fija los límites de inversión para proteger el capital',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'recursos', 'rendimientos', 'contribuciones voluntarias', 'inversión'],
      order: 61,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-62',
      lawId: LAW_ID,
      number: '62',
      title: 'Administración del FAL — cuenta individual por empleador, entidad habilitada CNV',
      text:
        'Administración. Cada empleador tendrá una cuenta individual, de carácter común y no individualizable por trabajador, cuya administración estará a cargo de una entidad habilitada a través de uno de sus fondos que tenga autorizado a tal fin por la Comisión Nacional de Valores, organismo descentralizado actuante en la órbita del Ministerio de Economía. El empleador no podrá, bajo ningún aspecto, bajo pena de la aplicación de la sanción prevista en el artículo 75, elegir entidades en las cuales posea participación directa o indirecta.',      plainLanguageExplanation:
        'Cada empleador tiene una cuenta FAL única (no dividida por trabajador), administrada por una entidad habilitada por la CNV. Está prohibido elegir una entidad en la que el empleador tenga participación accionaria o directa (conflicto de interés), bajo pena de multa.',
      practicalEffects: [
        'Un solo fondo por empleador (no por trabajador)',
        'La entidad administradora debe estar habilitada por CNV',
        'Prohibición de elegir entidades vinculadas al empleador → multa del art. 75 si lo hace',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'administración', 'CNV', 'cuenta individual', 'conflicto de interés', 'entidad habilitada'],
      order: 62,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-63',
      lawId: LAW_ID,
      number: '63',
      title: 'Información y trazabilidad del FAL',
      text:
        'Información y trazabilidad. Cada empleador contará con una cuenta identificada dentro de la entidad habilitada seleccionada, en la cual se registrarán:\na) Las contribuciones obligatorias mensuales que realice el empleador, a través de la Agencia de Recaudación y Control Aduanero (ARCA), organismo descentralizado actuante en la órbita del Ministerio de Economía;\nb) Los rendimientos, intereses y/o cualquier otra renta obtenida producto de su inversión;\nc) Cualquier otro ingreso de fondos, en los términos del artículo 61 de la presente;\nd) Los retiros efectuados conforme los fines previstos en esta ley;\ne) Las comisiones abonadas y gastos de administración del Fondo;\nf) El remanente disponible.',      plainLanguageExplanation:
        'La cuenta FAL de cada empleador lleva un registro detallado de: contribuciones mensuales, rendimientos de inversión, otros ingresos, retiros realizados (para pagar indemnizaciones), comisiones de administración y saldo disponible.',
      practicalEffects: [
        'Trazabilidad completa: el empleador puede ver en todo momento el historial de su FAL',
        'Los retiros quedan registrados con su causa (despido, etc.)',
        'Las comisiones de la entidad administradora son transparentes',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'trazabilidad', 'cuenta', 'retiros', 'comisiones', 'rendimientos', 'ARCA'],
      order: 63,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-64',
      lawId: LAW_ID,
      number: '64',
      title: 'Utilización de recursos del FAL — solo relaciones registradas',
      text:
        'Utilización de los recursos de los Fondos. Los recursos acumulados en la cuenta correspondiente a cada empleador sólo podrán utilizarse para cubrir el pago de las obligaciones y montos previstos en el artículo 58 de la presente ley, siempre que la relación laboral extinguida hubiera estado registrada. En caso de que la relación laboral estuviere registrada de modo deficiente, los recursos de la cuenta podrán ser aplicados únicamente para cubrir las obligaciones y pagos que corresponderían si se consideraran solamente los datos de la relación laboral registrada. La existencia, inexistencia o insuficiencia de recursos en la cuenta no limita, reduce, altera ni condiciona la responsabilidad del empleador por el pago íntegro de las obligaciones a su cargo derivadas de la extinción del vínculo laboral. Ante cada situación prevista en el artículo 58 de la presente ley, que además cumpla con los requisitos previstos en el presente artículo, el empleador podrá optar por aplicar los recursos de la cuenta, o una parte de ellos, para el pago total o parcial de dicha obligación, o por no usarlos para ese caso y mantener los recursos en la cuenta.',      plainLanguageExplanation:
        'Los fondos del FAL solo pueden usarse para pagar indemnizaciones de relaciones laborales registradas. Si el trabajador estaba en negro o subregistrado, solo se puede usar la parte que correspondería a lo que estaba registrado. Que no haya plata en el FAL no exime al empleador de pagar la indemnización igual. El empleador puede optar por usar el FAL o no en cada caso.',
      practicalEffects: [
        'FAL solo disponible para trabajadores formalmente registrados (al menos 12 meses previos — art. 58)',
        'Trabajo en negro: el FAL no cubre la indemnización de la parte no registrada',
        'Si el FAL no tiene fondos suficientes → el empleador igual tiene que pagar de su bolsillo',
        'El empleador puede no usar el FAL aunque tenga fondos (decisión facultativa en cada caso)',
      ],
      examples: [
        'Empleado registrado con sueldo real de $500.000 pero declarado $200.000: el FAL solo cubre la indemnización sobre $200.000',
        'FAL con $0 y despido → el empleador paga la indemnización completa igual',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'utilización', 'relación registrada', 'trabajo en negro', 'indemnización', 'responsabilidad empleador'],
      order: 64,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-65',
      lawId: LAW_ID,
      number: '65',
      title: 'Carencia del FAL — mínimo 6 períodos mensuales antes de cobertura',
      text:
        'Carencia. A efectos de su capitalización y con el fin de garantizar la estabilidad financiera, el Fondo de Asistencia Laboral no responderá por las extinciones laborales previstas en el artículo 58 de la presente ley, hasta luego de haber recibido las contribuciones correspondientes a al menos seis (6) períodos mensuales, en los términos que determine la reglamentación. El Poder Ejecutivo nacional podrá establecer un plazo mayor, cuando por las características del sector económico o del mercado laboral, entre otros motivos atendibles, así lo aconsejen.',      plainLanguageExplanation:
        'Período de carencia: el FAL no cubre despidos hasta que el empleador haya contribuido durante al menos 6 meses. El PEN puede ampliar ese plazo según el sector. El empleador igual es responsable de pagar la indemnización (solo que no puede usar el FAL en los primeros meses).',
      practicalEffects: [
        'Los primeros 6 meses de contribución: el FAL no financia ningún despido',
        'El empleador nuevo tiene 6 meses de "rampa" antes de poder usar el FAL',
        'El PEN puede exigir más de 6 meses para sectores específicos',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'carencia', '6 meses', 'capitalización', 'período mínimo'],
      order: 65,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-66',
      lawId: LAW_ID,
      number: '66',
      title: 'Suspensión de contribución al FAL cuando el fondo alcanza nivel suficiente',
      text:
        'Interrupción o suspensión de obligación de contribución. El empleador que pueda acreditar, en función de su nómina, que el saldo existente acumulado en su cuenta del Fondo de Asistencia Laboral al momento de la evaluación, cubre los porcentajes que determine la reglamentación de las posibles contingencias laborales de su nómina, podrá solicitar la interrupción o suspensión de la obligación mensual de efectuar el ingreso de las contribuciones previstas en el artículo 60 de la presente ley. La Secretaría de Trabajo, Empleo y Seguridad Social, dependiente del Ministerio de Capital Humano, en conjunto con el Ministerio de Economía instrumentarán, en su totalidad, las condiciones y/o requisitos para acceder a dicha interrupción o suspensión. En caso de ser concedida, el empleador quedará exceptuado de realizar la contribución por el período por el que se le haya concedido la interrupción o suspensión.',      plainLanguageExplanation:
        'Si el FAL de un empleador ya acumuló suficiente capital para cubrir las contingencias laborales de su nómina (según lo fije la reglamentación), puede pedir que le suspendan la obligación mensual de contribuir. La Secretaría de Trabajo y el Ministerio de Economía deciden si se otorga.',
      practicalEffects: [
        'El empleador no contribuye indefinidamente: hay un techo de cobertura a partir del cual puede pausar',
        'El trámite requiere acreditar que el saldo cubre el porcentaje reglamentario de contingencias',
        'La suspensión es por período determinado (renovable)',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'suspensión', 'contribución', 'cobertura suficiente', 'Secretaría de Trabajo'],
      order: 66,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-67',
      lawId: LAW_ID,
      number: '67',
      title: 'Exención del FAL en Ganancias e IVA',
      text:
        'Tratamiento en el Impuesto a las Ganancias y en el Impuesto al Valor Agregado (IVA). Exímese del Impuesto a las Ganancias a los rendimientos, intereses y/o a cualquier otra renta derivada de las inversiones efectuadas en el marco del funcionamiento del Fondo de Asistencia Laboral, obtenidas por el empleador, incluidos los resultados que se generen como consecuencia de las transformaciones que experimente el citado Fondo por efecto de reorganizaciones societarias del empleador, con independencia de que dichas reorganizaciones reúnan o no los requisitos del artículo 80 de la Ley de Impuesto a las Ganancias, texto ordenado en 2019 y sus modificaciones. La integración de las contribuciones (obligatorias y/o voluntarias) y de cualquier otra suma, conforme lo previsto en el artículo 61, al citado Fondo, están exentas del Impuesto a las Ganancias para éste.',      plainLanguageExplanation:
        'Los rendimientos del FAL están exentos de Ganancias para el empleador. Las contribuciones al fondo también están exentas de Ganancias. Esto incluye los resultados por reorganizaciones societarias (fusiones, escisiones, etc.).',
      practicalEffects: [
        'Los intereses y ganancias del FAL no pagan Impuesto a las Ganancias',
        'Las contribuciones al FAL (obligatorias y voluntarias) son deducibles / exentas',
        'Beneficio fiscal incluso en reorganizaciones societarias del empleador',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'ganancias', 'IVA', 'exención', 'impuesto', 'rendimientos', 'reorganización societaria'],
      order: 67,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-68',
      lawId: LAW_ID,
      number: '68',
      title: 'Responsabilidad del empleador — la entidad administradora del FAL no responde ante el trabajador',
      text:
        'Responsabilidad. El empleador y quienes tengan responsabilidad solidaria según las normas aplicables, serán los únicos responsables del pago de las indemnizaciones o montos que le corresponda al trabajador. Las entidades administradoras en ningún caso se considerarán sujetos obligados frente al trabajador, manteniéndose como terceros ajenos a la relación jurídica entre el empleador y el trabajador.',      plainLanguageExplanation:
        'El empleador sigue siendo el único responsable de pagar las indemnizaciones al trabajador. Las entidades que administran el FAL no son deudoras del trabajador: son terceros. Si el FAL no tiene fondos, el trabajador reclama al empleador, no a la entidad administradora.',
      practicalEffects: [
        'El trabajador no puede demandar a la entidad administradora del FAL',
        'El empleador tiene responsabilidad total, independientemente de si el FAL tiene fondos',
        'Los solidariamente responsables (ej. art. 30 LCT) también responden aunque el FAL sea insuficiente',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['FAL', 'responsabilidad', 'empleador', 'entidad administradora', 'indemnización', 'trabajador'],
      order: 68,
      amendments: [],
      segments: [],
    },

    // ── BATCH 5: Arts. 55–57 (Cap. X — Disposiciones complementarias LCT / juicios) ──

    {
      id: 'art-27802-55',
      lawId: LAW_ID,
      number: '55',
      title: 'Créditos en juicios en trámite — actualización transitoria (IPC/BCRA)',
      text:
        'En los juicios en trámite y aún pendientes de sentencia definitiva, a la fecha de la entrada en vigencia de la presente ley, incluidos los recursos de queja que se encuentren pendientes de resolución, los créditos provenientes de las relaciones individuales de trabajo serán actualizados en base a los siguientes criterios:\na) A través de la aplicación de intereses moratorios ajustados a la tasa pasiva determinada por el Banco Central de la República Argentina (BCRA) a estos fines para el período correspondiente;\nb) En ningún caso el resultado, aplicando las pautas del inciso a) del presente artículo, podrá ser superior al importe derivado de adicionar al capital histórico la suma resultante de la aplicación sobre el mismo del Índice de Precios al Consumidor (IPC) suministrado por el Instituto Nacional de Estadística y Censos (INDEC) con más una tasa de interés del tres por ciento (3%) anual;\nc) El valor resultante no podrá ser inferior al sesenta y siete por ciento (67%) del cálculo obtenido al aplicar las pautas del inciso b) del presente artículo.\nLas disposiciones del presente artículo son de orden público y serán aplicadas por los jueces o por la autoridad administrativa, de oficio o a petición de parte, incluso en los casos de concurso del deudor, así como también después de la declaración de quiebra.',      plainLanguageExplanation:
        'Para los juicios laborales que ya estaban en curso cuando entró en vigencia esta ley, los créditos se actualizan con la tasa pasiva del BCRA, pero con dos límites: no puede superar el IPC+3% anual, y no puede ser menor al 67% de ese techo. Es una regla de transición para juicios anteriores a la ley.',
      practicalEffects: [
        'Aplica solo a juicios laborales en trámite al momento de sanción de la ley (marzo 2026)',
        'Techo de actualización: IPC INDEC + 3% anual',
        'Piso de actualización: 67% del techo (IPC+3%)',
        'Tasa base: tasa pasiva BCRA',
        'Es de orden público: el juez la aplica de oficio, incluso en concursos y quiebras',
      ],
      examples: [
        'Juicio iniciado en 2024 con crédito de $100.000 → se actualiza por tasa pasiva BCRA, pero si ese resultado supera IPC+3%, se topa al IPC+3%; si queda por debajo del 67% de IPC+3%, se eleva al 67%',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['juicios en trámite', 'actualización', 'BCRA', 'IPC', 'transitorio', 'orden público', 'quiebra'],
      order: 55,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-56',
      lawId: LAW_ID,
      number: '56',
      title: 'Pago en juicio laboral — cuenta sueldo, cuotas y costas (art. 277 LCT)',
      text:
        'Sustitúyese el artículo 277 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 277: Pago en juicio. Todo pago que deba realizarse en los juicios laborales se efectivizará mediante depósito bancario:\na) En la cuenta sueldo del respectivo trabajador, creada en virtud de lo establecido en la ley 26.590 y su normativa complementaria y siempre que aquella se encuentre disponible;\nb) Excepcionalmente y sólo en caso de ausencia de la primera, en autos a la orden del Tribunal interviniente y giro judicial personal al titular del crédito o sus derechohabientes, aún en el supuesto de haber otorgado poder.\nTodo pacto de cuota litis requerirá ratificación personal y homologación judicial, y en ningún caso podrá exceder del veinte por ciento (20%) del monto del proceso.\nLas sentencias judiciales condenatorias de personas humanas y/o jurídicas cuando se trate de grandes empresas podrán ser canceladas en hasta un máximo de seis (6) cuotas mensuales consecutivas, ajustadas conforme la pauta establecida en el artículo 276 de la presente ley.\nEn el caso de las Micro, Pequeñas y Medianas Empresas la cancelación de las sentencias judiciales condenatorias de personas humanas y/o jurídicas podrán ser realizadas en hasta un máximo de doce (12) cuotas mensuales consecutivas.\nEl desistimiento por el trabajador de acciones y derechos se ratificará personalmente en el juicio y requerirá homologación.\nTodo pago realizado sin observar lo prescripto en este artículo, así como el pacto de cuota litis o el desistimiento no homologado, serán nulos de pleno derecho.\nLa responsabilidad por el pago de las costas procesales, incluidos los honorarios profesionales de todo tipo allí devengados y correspondientes a la primera o única instancia, no excederán del veinticinco por ciento (25%) del monto de la sentencia, laudo, transacción o instrumento que ponga fin al diferendo. Si las regulaciones de honorarios practicadas conforme a las leyes arancelarias o usos locales, correspondientes a todas las profesiones y especialidades superaran dicho porcentaje, el juez procederá a prorratear los montos entre los beneficiarios. Para el cómputo del porcentaje indicado no se tendrá en cuenta el monto de los honorarios profesionales que hubieren representado, patrocinado o asistido a la parte condenada en costas."',      plainLanguageExplanation:
        'Modifica el art. 277 LCT. El pago en juicio laboral debe hacerse en la cuenta sueldo del trabajador (o por giro judicial si no existe). La cuota litis no puede superar el 20% y requiere homologación. Las grandes empresas pueden pagar condenas en hasta 6 cuotas; las pymes en hasta 12. Las costas no pueden superar el 25% del monto de condena.',
      practicalEffects: [
        'Pago obligatorio en cuenta sueldo del trabajador (ley 26.590)',
        'Cuota litis tope: 20% — debe estar homologada',
        'Grandes empresas: hasta 6 cuotas para pagar sentencias condenatorias',
        'Pymes: hasta 12 cuotas para pagar sentencias condenatorias',
        'Costas procesales tope: 25% del monto de condena (prorrateables entre profesionales)',
        'Pacto de cuota litis sin homologar → nulo de pleno derecho',
      ],
      examples: [
        'Condena de $500.000 a una PYME → puede pagarla en hasta 12 cuotas actualizadas por IPC+3%',
        'Honorarios de abogado: si supera el 25% de $500.000 ($125.000), el juez prorratéa entre los profesionales',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['pago en juicio', 'cuenta sueldo', 'cuota litis', 'costas', 'sentencia', 'cuotas', 'PYME', 'grandes empresas'],
      order: 56,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-57',
      lawId: LAW_ID,
      number: '57',
      title: 'Remisión a ARCA por trabajo no registrado. Incompatibilidad con daños civiles (art. 278 LCT)',
      text:
        'Incorpórase como artículo 278 a la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, el siguiente:\n"Artículo 278: Remisión de antecedentes judiciales. Contribuciones adeudadas con destino a Obra Social. Cuando en el marco de un proceso judicial se determine que el trabajador no fue registrado, o que su registración fue deficiente porque resultó tardía, y/o con una remuneración inferior a la realmente devengada y/o porque se omitió el ingreso total o parcial de los aportes y contribuciones correspondientes a los distintos organismos de la seguridad social, el juez, en la sentencia definitiva, deberá remitir los antecedentes a la Agencia de Recaudación y Control Aduanero (ARCA), organismo descentralizado actuante en la órbita del Ministerio de Economía, o al organismo competente, para la liquidación y obtención del pago de las sumas adeudadas con más las multas, recargos y accesorios que allí se determinen.\nEn el caso de contribuciones adeudadas con destino a la Obra Social, la condena sólo podrá contemplar el pago, en este caso al trabajador, si se acreditase haber mediado privación de toda cobertura de salud, y en tal supuesto, por los importes que éste acredite haber afrontado para mantener su afiliación.\nLas prestaciones salariales, indemnizatorias y/o de cualquier otra naturaleza jurídica previstas en esta ley y/o en los distintos regímenes laborales especiales y/o previsionales son incompatibles con acciones y/o reclamos por daños y perjuicios fundados en el Código Civil y Comercial de la Nación."',      plainLanguageExplanation:
        'Incorpora el art. 278 a la LCT. Si en un juicio se detecta trabajo no registrado o registración deficiente, el juez debe remitir los antecedentes a ARCA para cobrar los aportes adeudados. Las indemnizaciones laborales son incompatibles con reclamos civiles por daños y perjuicios: no se pueden acumular.',
      practicalEffects: [
        'El juez laboral debe remitir a ARCA los casos de trabajo no registrado o subregistrado para que cobre aportes y contribuciones adeudadas',
        'La condena por aportes a obra social al trabajador solo procede si hubo privación total de cobertura médica',
        'Incompatibilidad: no se puede cobrar indemnización laboral Y reclamar daños y perjuicios por el Código Civil al mismo tiempo',
      ],
      examples: [
        'Juicio por despido: el juez detecta que el empleado estaba en negro → envía el caso a ARCA para que liquide aportes, multas y recargos',
        'Accidente laboral: el trabajador no puede cobrar la ART y además iniciar una demanda civil por daños y perjuicios simultáneamente',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['ARCA', 'trabajo no registrado', 'obra social', 'daños y perjuicios', 'incompatibilidad', 'aportes', 'registración'],
      order: 57,
      amendments: [],
      segments: [],
    },

    // ── BATCH 3: Arts. 32, 36–44 ──

    {
      id: 'art-27802-32',
      lawId: LAW_ID,
      number: '32',
      title: 'Formas de determinación de la remuneración (art. 104 LCT)',
      text:
        'Sustitúyese el artículo 104 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 104: Formas de determinar la remuneración. El salario puede fijarse por tiempo o por rendimiento del trabajo, y en este último caso por unidad de obra, comisión individual o colectiva. En ningún caso las propinas podrán ser consideradas como remuneración aun cuando por los usos y costumbres de determinadas actividades sean habituales."',      plainLanguageExplanation:
        'El sueldo puede fijarse por hora/día/mes o por producción (destajo, comisión). Las propinas quedan expresamente excluidas de la remuneración en todos los casos, aunque sean habituales en la actividad (gastronomía, hotelería, etc.).',
      practicalEffects: [
        'Las propinas no forman parte del salario computable → no se calculan para aguinaldo, vacaciones ni indemnización',
        'El salario a destajo (por pieza producida) o por comisión sigue siendo válido',
        'Gastronomía, hotelería, delivery → las propinas no son sueldo aunque sean costumbre',
      ],
      examples: [
        'Mozo que recibe $200.000/mes en propinas → ese monto no cuenta para calcular su aguinaldo ni su indemnización',
        'Vendedor comisionado → sus comisiones SÍ son remuneración (no son propinas)',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['remuneración', 'propinas', 'comisión', 'salario por tiempo', 'unidad de obra', 'destajo'],
      order: 32,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-36',
      lawId: LAW_ID,
      number: '36',
      title: 'Deducciones — depósitos en cajas de ahorro (art. 132 inc. f LCT)',
      text:
        'Sustitúyese el inciso f) del artículo 132 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"f) Depósitos en cajas de ahorro de instituciones del Estado Nacional, de las provincias, de los municipios, de la Ciudad Autónoma de Buenos Aires, sindicales o de propiedad de asociaciones profesionales de trabajadores, y pago de cuotas por préstamos acordados por el trabajador y esas instituciones o entidades bancarias."',      plainLanguageExplanation:
        'Se actualiza el inciso f del art. 132 LCT que permite descontar del sueldo depósitos en cajas de ahorro o cuotas de préstamos de bancos e instituciones estatales, sindicales o profesionales.',
      practicalEffects: [
        'Se pueden descontar del sueldo cuotas de préstamos sindicales o bancarios autorizados',
        'Los depósitos en cajas de ahorro de instituciones estatales o sindicales también son deducibles',
        'Siempre dentro del tope del 20% del art. 133 LCT',
      ],
      examples: [
        'Tenés un préstamo personal del Banco Nación descontado por haberes → es válido bajo este inciso',
        'Tu sindicato te dio un crédito para electrodomésticos → la cuota puede descontarse del sueldo',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['deducciones', 'descuentos', 'caja de ahorro', 'préstamos', 'sindicato', 'haberes'],
      order: 36,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-37',
      lawId: LAW_ID,
      number: '37',
      title: 'Porcentaje máximo de retenciones salariales (art. 133 LCT)',
      text:
        'Sustitúyese el artículo 133 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 133: Porcentaje máximo de retención. Conformidad del trabajador. Autorización administrativa. Salvo lo dispuesto en el artículo 130 de esta ley, en el caso de adelanto de remuneraciones, la deducción, retención o compensación no podrá insumir en conjunto más del veinte por ciento (20%) del monto total de la remuneración en dinero que tenga que percibir el trabajador en el momento en que se practique. Las mismas podrán consistir, siempre dentro de dicha proporción, en sumas fijas y previamente determinadas. En ningún caso podrán efectuarse las deducciones, retenciones o compensaciones a las que se hace referencia en el artículo 132 de esta ley sin el consentimiento expreso del trabajador, salvo aquéllas que provengan del cumplimiento de las leyes, estatutos profesionales o de Convenios Colectivos de Trabajo, teniendo en cuenta el tope del dos por ciento (2%) establecido en el artículo 133 de la Ley de Modernización Laboral, siempre que sean con destino al o los sindicatos signatarios de éstos. Las deducciones, retenciones o compensaciones, en todos los restantes casos, requerirán además la previa autorización del organismo competente. La Autoridad de Aplicación podrá establecer, por resolución fundada, un límite porcentual distinto para las deducciones, retenciones o compensaciones cuando la situación particular lo requiera."',      plainLanguageExplanation:
        'Las retenciones del sueldo no pueden superar el 20% del total. Para hacer cualquier descuento necesitás el consentimiento del trabajador, excepto los que impone la ley o el CCT. Las cuotas sindicales tienen un tope propio del 2%. Cualquier retención distinta necesita autorización administrativa.',
      practicalEffects: [
        'Tope general: 20% del sueldo bruto en retenciones voluntarias',
        'Cuotas sindicales: tope específico del 2%',
        'Adelantos de sueldo: también dentro del 20%',
        'Sin consentimiento del trabajador → solo se pueden retener las que manda la ley o el CCT',
      ],
      examples: [
        'Ganás $500.000 → pueden retenerte máximo $100.000 en total por deducciones voluntarias',
        'La empresa descuenta $20.000 de cuota sindical → no puede superar $10.000 (2% de $500.000)',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['retenciones', 'deducciones', 'tope 20%', 'cuota sindical', 'consentimiento', 'descuentos salariales'],
      order: 37,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-38',
      lawId: LAW_ID,
      number: '38',
      title: 'Recibo de sueldo — formato digital (art. 139 LCT)',
      text:
        'Sustitúyese el artículo 139 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 139: Modalidad. El recibo será confeccionado por el empleador quien deberá hacer entrega al trabajador de una copia fiel del original si fuese papel o bien mediante el sistema que permita su firma de manera digital o electrónica como constancia de entrega."',      plainLanguageExplanation:
        'El recibo de sueldo puede ser en papel (con copia fiel) o digital (con firma electrónica o digital). Se habilita explícitamente el recibo electrónico como constancia de pago válida.',
      practicalEffects: [
        'El recibo digital con firma electrónica es tan válido como el papel',
        'Sistemas de portal de empleados con firma digital cumplen la norma',
        'El empleador debe asegurarse que el trabajador tenga copia (física o digital)',
      ],
      examples: [
        'La empresa sube el recibo a un portal de RRHH y el empleado firma digitalmente → es válido',
        'Envío del recibo por email con firma digital del empleado → cumple la norma',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['recibo de sueldo', 'firma digital', 'recibo electrónico', 'digitalización', 'constancia de pago'],
      order: 38,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-39',
      lawId: LAW_ID,
      number: '39',
      title: 'Contenido obligatorio del recibo de sueldo (art. 140 LCT)',
      text:
        'Sustitúyese el artículo 140 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 140: Contenido necesario. El recibo de pago deberá necesariamente contener, como mínimo, las siguientes enunciaciones: a. Nombre íntegro o razón social del empleador, su domicilio y su Clave Única de Identificación Tributaria (CUIT); b. Nombre y apellido del trabajador, su calificación profesional y su Código Único de Identificación Laboral (CUIL); c. Total de remuneración que perciba, con indicación substancial de su determinación; d. Los requisitos del artículo 12 del Decreto Ley 17.250/67; e. Total bruto de la remuneración básica o fija, porcentual devengado y tiempo que corresponda; f. Importe de las deducciones que se efectúan por aportes jubilatorios u otras autorizadas por esta ley; embargos y demás descuentos que legalmente correspondan; g. Importe neto percibido, expresado en números y letras; h. En el caso del artículo 129 de esta ley, firma y sello de los funcionarios o agentes dependientes de la autoridad, la que podrá ser electrónica; i. Fecha de ingreso o antigüedad reconocida, y tarea cumplida o categoría en que efectivamente se desempeñó durante el período de pago; j. Adicionalmente, se incluirán en el recibo, las contribuciones y/o conceptos abonados por el empleador por disposición legal o convencional, con la concreta determinación del importe, relativas a cada trabajador."',      plainLanguageExplanation:
        'El recibo de sueldo debe incluir: CUIT del empleador, CUIL del trabajador, categoría, remuneración bruta y neta, deducciones (aportes, embargos), antigüedad y contribuciones patronales. La firma de la autoridad puede ser electrónica.',
      practicalEffects: [
        'Los recibos incompletos (sin CUIL, sin categoría, sin neto en letras) son inválidos',
        'Ahora debe incluirse también las contribuciones patronales del período',
        'La firma de la autoridad administrativa puede ser electrónica',
      ],
      examples: [
        'Un recibo sin el CUIL del trabajador → es formalmente deficiente y puede impugnarse',
        'Un recibo que no muestra el bruto separado del neto → incumple el art. 140',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['recibo de sueldo', 'contenido', 'CUIT', 'CUIL', 'categoría', 'bruto', 'neto', 'contribuciones'],
      order: 39,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-40',
      lawId: LAW_ID,
      number: '40',
      title: 'Conservación de recibos de sueldo — digitalización (art. 143 LCT)',
      text:
        'Sustitúyese el artículo 143 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 143: Conservación - Plazo. El empleador deberá conservar los recibos y otras constancias de pago a fin de acreditar sus obligaciones considerando el plazo de prescripción de obligaciones laborales -dos (2) años-, y previsionales -diez (10) años-. A efectos de la conservación de los recibos y otras constancias de pago, los mismos podrán ser digitalizados, los cuales tendrán la misma validez que en formato papel. El pago hecho por un último o ulteriores períodos no hace presumir el pago de los anteriores."',      plainLanguageExplanation:
        'Los recibos de sueldo deben guardarse 2 años para reclamos laborales y 10 años para reclamos previsionales. Pueden digitalizarse. El hecho de pagar el sueldo de un mes no implica que los anteriores fueron pagados.',
      practicalEffects: [
        'Laboralmente: conservar recibos 2 años (prescripción laboral)',
        'Previsional: conservar recibos 10 años (prescripción previsional)',
        'Recibos digitalizados tienen la misma validez que en papel',
        'Pagar el sueldo de diciembre no prueba que se pagó noviembre',
      ],
      examples: [
        'Te reclaman un sueldo de 2015 → el empleador no tiene obligación de conservar ese recibo (prescripción)',
        'AFIP reclama aportes no ingresados de 2018 → el empleador debe poder mostrar los recibos de ese año',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['conservación recibos', 'prescripción', 'digitalización', 'plazo dos años', 'previsional'],
      order: 40,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-41',
      lawId: LAW_ID,
      number: '41',
      title: 'Vacaciones — concesión, fraccionamiento e interrupción (art. 154 LCT)',
      text:
        'Sustitúyese el artículo 154 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 154: El empleador deberá conceder el goce de vacaciones de cada año dentro del período comprendido entre el 1° de octubre y el 30 de abril del año siguiente. Las partes podrán de mutuo acuerdo disponer el goce de vacaciones fuera del referido período. La fecha de inicio de las vacaciones deberá ser notificada por escrito al trabajador con una antelación no menor a treinta (30) días, sin perjuicio de que las Convenciones Colectivas de Trabajo puedan establecer sistemas diferentes, conforme a las particularidades de cada actividad. Asimismo, el empleador y el trabajador podrán convenir el fraccionamiento del período vacacional, siempre que cada uno de los tramos no sea inferior a siete (7) días. Cuando las vacaciones no se otorguen de manera simultánea a la totalidad de los trabajadores de un establecimiento y se acuerden en forma individual o por grupos, el empleador deberá organizarlas de tal manera que cada trabajador goce de sus vacaciones, al menos una (1) vez cada tres (3) años, durante la temporada de verano. En caso de que las vacaciones se vean interrumpidas por enfermedad del trabajador informada en tiempo y que le permita al empleador ejercer su derecho de control, éste deberá reincorporarse a su puesto al finalizar el período originalmente previsto o, en caso de continuar imposibilitado, una vez concluido el respectivo lapso de suspensión. El saldo de días de vacaciones no gozados deberá ser reprogramado conforme a lo establecido en los párrafos precedentes."',      plainLanguageExplanation:
        'Las vacaciones se otorgan entre el 1° de octubre y el 30 de abril, notificadas con 30 días de anticipación. Se pueden fraccionar en tramos de mínimo 7 días. Si te enfermás en vacaciones y lo notificás a tiempo, las vacaciones se interrumpen y se reprograman los días no gozados.',
      practicalEffects: [
        'Período de vacaciones: oct. 1 a abr. 30 (por defecto); fuera de ese período requiere acuerdo',
        'Fraccionamiento habilitado: mínimo 7 días por tramo, por acuerdo empleador-trabajador',
        'Aviso 30 días antes del inicio: obligatorio',
        'Enfermedad durante vacaciones: se interrumpen, el saldo se reprograma',
        'Rotación de verano: al menos 1 vez cada 3 años en temporada de verano',
      ],
      examples: [
        'Te avisan el 1° de diciembre que arrancás vacaciones el 15 de diciembre → inválido, faltan solo 14 días',
        'Pedís dividir tus 21 días en 14 + 7 → válido, ambos tramos ≥ 7 días',
        'Te enfermás 3 días en el medio de las vacaciones y lo avisás → esos 3 días se reprograman',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['vacaciones', 'fraccionamiento', 'enfermedad', 'interrupción', 'temporada de verano', 'notificación'],
      order: 41,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-42',
      lawId: LAW_ID,
      number: '42',
      title: 'Banco de horas y compensación de horas extra (art. 197 bis LCT)',
      text:
        'Sustitúyese el artículo 197 bis de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 197 bis: El empleador y el trabajador podrán acordar voluntariamente un régimen de compensación de horas extraordinarias de trabajo, el cual deberá formalizarse por escrito, consignando la naturaleza voluntaria de la prestación de horas extras y sus límites, especificando el modo de funcionamiento del sistema y estableciendo un método fehaciente de control que permita a ambas partes registrar las horas efectivamente trabajadas y las horas disponibles para su goce por parte del trabajador. A tal efecto, se podrá disponer de un régimen de horas extras, banco de horas, francos compensatorios, entre otros institutos relativos a la jornada laboral. Dicho régimen, que podrá igualmente ser pactado por el empleador con la representación sindical en la empresa, deberá respetar los descansos mínimos legales, asegurando en todo momento la protección, beneficio e interés del trabajador."',      plainLanguageExplanation:
        'El empleador y el trabajador (o el sindicato) pueden acordar por escrito un sistema de banco de horas o compensación de horas extras. Las horas extra se compensan con tiempo libre en lugar de dinero, siempre respetando los descansos mínimos legales.',
      practicalEffects: [
        'Banco de horas habilitado: se pueden compensar horas extra con días libres en lugar de pago extra',
        'Debe formalizarse por escrito y con control fehaciente de horas',
        'Voluntario: el trabajador debe acordar, no puede imponerse',
        'Respeta descansos mínimos (12 hs entre jornada y 35 hs semanales)',
        'Puede pactarse individual o colectivamente (con el sindicato)',
      ],
      examples: [
        'Trabajás 2 horas extra el lunes → en lugar de cobrarlas, te tomás 2 horas libre el viernes (banco de horas)',
        'La empresa propone banco de horas sin que el trabajador acepte → inválido, necesita consentimiento',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['banco de horas', 'horas extra', 'compensación', 'jornada', 'franco compensatorio', 'voluntario'],
      order: 42,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-43',
      lawId: LAW_ID,
      number: '43',
      title: 'Jornada reducida — banco de horas (art. 198 LCT)',
      text:
        'Sustitúyese el artículo 198 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 198: Jornada reducida. La reducción de la jornada máxima legal solamente procederá cuando lo establezcan las disposiciones vigentes en la materia, o se encuentre estipulado en los contratos individuales, Convenios Colectivos de Trabajo u otros acuerdos colectivos celebrados con la representación sindical en la empresa. Estos últimos podrán establecer métodos de cálculo de la jornada máxima en base a promedio, de acuerdo con las características de la actividad, siempre y cuando se respeten los descansos mínimos entre jornada y jornada de doce (12) horas y de descanso semanal de treinta y cinco (35) horas. Asimismo, se podrá utilizar el banco de horas de modo de compensar la mayor jornada de algún día con la menor de otro, siempre y cuando no se supere el máximo legal de la jornada semanal."',      plainLanguageExplanation:
        'La jornada reducida respecto al máximo legal solo aplica si la ley, el contrato o el CCT lo disponen. Los CCT pueden calcular la jornada por promedio semanal y habilitar banco de horas para compensar entre días, siempre con los descansos mínimos de 12 hs entre jornadas y 35 hs semanales.',
      practicalEffects: [
        'Jornada por promedio habilitada en CCT: trabajar 10 hs un día y 6 otro es válido si el promedio respeta el máximo',
        'Banco de horas entre días: compensar jornada larga de un día con una corta de otro',
        'Límite infranqueable: 12 hs de descanso entre jornadas y 35 hs de descanso semanal',
      ],
      examples: [
        'CCT gastronómico prevé jornada promedio: lunes 10 hs, martes 6 hs → promedio 8 hs, es válido',
        'La empresa quiere que trabajes 12 hs sin descanso entre jornadas → prohibido aunque haya banco de horas',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['jornada reducida', 'banco de horas', 'jornada por promedio', 'CCT', 'descanso mínimo', 'jornada laboral'],
      order: 43,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-44',
      lawId: LAW_ID,
      number: '44',
      title: 'Aviso de enfermedad al empleador (art. 209 LCT)',
      text:
        'Sustitúyese el artículo 209 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 209: Aviso al empleador. El trabajador, en el transcurso de la primera jornada de trabajo respecto de la cual estuviere imposibilitado de concurrir, deberá dar aviso de la enfermedad o accidente y del lugar en que se encuentra, salvo casos de fuerza mayor. Mientras no la haga, perderá el derecho a percibir la remuneración correspondiente salvo que la existencia de la enfermedad o accidente, y su imposibilidad de dar el aviso, teniendo en consideración su carácter y gravedad, resulte luego inequívocamente acreditada."',      plainLanguageExplanation:
        'Si te enfermás, debés avisar al empleador durante la primera jornada que no podés concurrir e indicar dónde estás. Si no avisás, perdés el sueldo de esos días, salvo que después puedas demostrar que la gravedad de la enfermedad te impidió dar el aviso.',
      practicalEffects: [
        'Aviso durante la primera jornada: obligatorio para no perder el sueldo',
        'Dónde estás: el empleador necesita saber para ejercer el control médico',
        'Sin aviso → sin sueldo por esos días (salvo causa de fuerza mayor acreditada)',
        'La gravedad extrema (ej: internación de urgencia) puede justificar la falta de aviso',
      ],
      examples: [
        'Te levantás con fiebre alta → debés avisar ese mismo día aunque sea por WhatsApp',
        'Estás internado de urgencia y no podés avisar → podés acreditarlo después y cobrar igual',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['aviso de enfermedad', 'accidente', 'inasistencia', 'remuneración', 'primera jornada'],
      order: 44,
      amendments: [],
      segments: [],
    },

    // ── BATCH 2: Arts. 19–31 ──

    {
      id: 'art-27802-19',
      lawId: LAW_ID,
      number: '19',
      title: 'Empresas relacionadas — solidaridad por fraude (art. 31 LCT)',
      text:
        'Sustitúyese el artículo 31 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 31: Empresas subordinadas o relacionadas. Solidaridad. Siempre que una (1) o más empresas, aunque tuviesen cada una de ellas personalidad jurídica propia, estuviesen bajo la dirección, control o administración de otras, o de tal modo relacionadas que constituyan un conjunto económico de carácter permanente, serán a los fines de las obligaciones contraídas por cada una de ellas con sus trabajadores y con los organismos de seguridad social, solidariamente responsables, únicamente cuando hayan mediado maniobras fraudulentas."',      plainLanguageExplanation:
        'Las empresas de un mismo grupo económico responden solidariamente por las deudas laborales solo si hubo fraude. La ley anterior no exigía fraude. Ahora el trabajador debe demostrar maniobras fraudulentas para extender la responsabilidad al grupo.',
      practicalEffects: [
        'Antes: pertenecer a un grupo económico bastaba para la solidaridad laboral',
        'Ahora: además del grupo económico, debe probarse fraude concreto',
        'Protege estructuras corporativas legítimas de grupos empresariales',
        'El trabajador debe acreditar el fraude para demandar a la empresa controlante',
      ],
      examples: [
        'Empresa A y B son del mismo grupo → A no responde por las deudas de B salvo que haya fraude demostrado',
        'Empresa que traspasa trabajadores entre filiales para eludir indemnizaciones → hay fraude, aplica solidaridad',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['conjunto económico', 'solidaridad', 'fraude', 'grupo empresarial', 'responsabilidad'],
      order: 19,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-20',
      lawId: LAW_ID,
      number: '20',
      title: 'Registro del trabajador — digitalización (art. 52 LCT)',
      text:
        'Sustitúyese el artículo 52 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 52: Registro del trabajador. Los empleadores deberán registrar a los trabajadores ante la Agencia de Recaudación y Control Aduanero (ARCA), organismo descentralizado actuante en la órbita del Ministerio de Economía, de acuerdo a la normativa que dicho organismo dicte.\nEsta registración será suficiente a todos los efectos, sin que puedan exigirse requisitos adicionales por parte de ninguna otra autoridad.\nEl empleador deberá conservar los libros preexistentes durante un plazo de diez (10) años. A tal efecto, dichos libros podrán ser digitalizados y las copias digitales tendrán la misma validez legal que los originales en formato papel."',      plainLanguageExplanation:
        'La registración laboral se hace ante ARCA (ex-AFIP) y es la única registración exigible: ningún otro organismo puede pedir requisitos adicionales. Los libros de personal se conservan 10 años y pueden digitalizarse con la misma validez que el papel.',
      practicalEffects: [
        'Un solo registro ante ARCA es suficiente — no hace falta registro adicional ante sindicatos u otros organismos',
        'Digitalización habilitada: libros en PDF o sistemas digitales tienen validez legal plena',
        'Plazo de conservación de libros: 10 años',
      ],
      examples: [
        'Un empleador que antes debía registrar al trabajador en la ART, el sindicato y AFIP por separado → ahora solo ARCA',
        'Libros de sueldos en PDF con firma digital → tienen la misma validez que el libro en papel',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['registro laboral', 'ARCA', 'digitalización', 'libros', 'formalidades'],
      order: 20,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-21',
      lawId: LAW_ID,
      number: '21',
      title: 'Omisión de formalidades — apreciación judicial (art. 53 LCT)',
      text:
        'Sustitúyese el artículo 53 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 53: Omisión de formalidades. Los jueces merituarán la omisión de formalidades en la registración en los términos del artículo 52 de la presente ley, en función de las particulares circunstancias de cada caso."',      plainLanguageExplanation:
        'Si el empleador omitió alguna formalidad registral, el juez la evaluará según las circunstancias del caso. No hay una sanción automática: el juez tiene discrecionalidad para ponderar el impacto de la omisión.',
      practicalEffects: [
        'La omisión de formalidades no es automáticamente sancionable: el juez evalúa cada caso',
        'Flexibiliza el régimen anterior que tenía consecuencias automáticas por incumplimiento formal',
        'El contexto y la buena fe del empleador pesan en la decisión judicial',
      ],
      examples: [
        'Un empleador que omitió un formulario secundario de registración → el juez puede considerar que no afecta los derechos del trabajador',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['formalidades', 'registración', 'apreciación judicial', 'omisión', 'discrecionalidad'],
      order: 21,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-23',
      lawId: LAW_ID,
      number: '23',
      title: 'Facultad de modificar modalidades de trabajo — ius variandi (art. 66 LCT)',
      text:
        'Sustitúyese el artículo 66 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 66: Facultad de modificar las formas y modalidades de trabajo. El empleador está facultado para introducir todos aquellos cambios relativos a la forma y modalidades de la prestación del trabajo, en tanto esos cambios no alteren modalidades esenciales del contrato, ni causen perjuicio material al trabajador.\nCuando el empleador disponga medidas vedadas por este artículo, al trabajador, previa intimación y si ésta fuere desoída, le asistirá la posibilidad de considerarse despedido sin causa."',      plainLanguageExplanation:
        'El empleador puede cambiar cómo trabajás (horario, lugar, tareas) mientras no altere lo esencial del contrato ni te cause un perjuicio económico real. Si el cambio es ilegítimo, podés intimar al empleador y, si no revierte, considerarte despedido sin causa.',
      practicalEffects: [
        'El ius variandi (poder de dirección) tiene límites: no puede tocar lo esencial del contrato',
        'Cambios de horario, lugar de trabajo o tareas similares: permitidos si no causan perjuicio',
        'Cambio de categoría, reducción de salario, traslado con perjuicio: prohibido',
        'Procedimiento: intimar primero, si no responde → despido indirecto',
      ],
      examples: [
        'Te cambian el horario de 8-17 a 9-18 sin perjuicio económico → cambio legítimo',
        'Te bajan de categoría o te trasladan a otra ciudad sin compensación → podés intimarlos y considerarte despedido',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['ius variandi', 'modificación del contrato', 'despido indirecto', 'perjuicio material', 'modalidades'],
      order: 23,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-24',
      lawId: LAW_ID,
      number: '24',
      title: 'Ejercicio de facultades del empleador — límites legales (art. 68 LCT)',
      text:
        'Sustitúyese el artículo 68 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 68: Modalidades de su ejercicio. El empleador, en todos los casos, deberá ejercitar las facultades que le están conferidas en los artículos anteriores, así como la de disponer suspensiones por razones económicas, en los límites y con arreglo a las condiciones fijadas por la ley, los estatutos profesionales y las convenciones colectivas de trabajo."',      plainLanguageExplanation:
        'El empleador debe ejercer sus poderes de dirección y las suspensiones por razones económicas dentro de los límites que fija la ley, los estatutos profesionales y los CCT. No puede actuar arbitrariamente aunque tenga la potestad.',
      practicalEffects: [
        'Las suspensiones por razones económicas deben cumplir los procedimientos del art. 219 LCT',
        'El poder disciplinario del empleador está acotado por los convenios colectivos',
        'Los estatutos profesionales (médicos, docentes, gastronómicos, etc.) pueden ampliar los límites',
      ],
      examples: [
        'Una suspensión por crisis económica sin seguir el procedimiento del art. 219 → ilegítima, debe pagarse el salario',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['facultades del empleador', 'suspensión', 'razones económicas', 'CCT', 'límites legales'],
      order: 24,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-25',
      lawId: LAW_ID,
      number: '25',
      title: 'Entrega de certificados laborales — formato digital (art. 80 LCT)',
      text:
        'Sustitúyese el artículo 80 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 80: Entrega de certificados. Dentro del plazo de cuarenta y cinco (45) días hábiles desde la extinción del contrato de trabajo, el empleador deberá entregar al trabajador los certificados en los que consten los datos relativos a la relación laboral, la función desempeñada, las capacitaciones realizadas y la constancia del ingreso de los aportes y contribuciones al Sistema de Seguridad Social.\nLa obligación se considerará cumplida cuando el empleador ponga a disposición del trabajador dichos certificados: a) en formato físico en la sede de la empresa; o b) en formato digital a través de cualquier sistema que permita acreditar su entrega al trabajador de manera fehaciente. Cuando la información requerida por este artículo se encuentre disponible para el trabajador a través del sitio web del organismo de la seguridad social o del sistema que establezca la Agencia de Recaudación y Control Aduanero (ARCA), también se considerará cumplida la obligación del empleador respecto de los certificados alcanzados por la información que allí conste."',      plainLanguageExplanation:
        'Cuando te desvinculan, el empleador tiene 45 días hábiles para darte el certificado de trabajo, función, capacitaciones y aportes. Puede hacerlo en papel o digitalmente. Si la info ya está en el portal de ARCA o ANSES, se considera cumplida la obligación.',
      practicalEffects: [
        'Plazo: 45 días hábiles desde el egreso (antes era 30 días corridos)',
        'El certificado ahora incluye también las capacitaciones realizadas',
        'Entrega digital (email con acuse, plataforma) es válida',
        'Si la info está en ARCA/ANSES online, el empleador no necesita entregarlo por separado',
      ],
      examples: [
        'Renunciaste el 1° de marzo → el certificado de trabajo debe entregarse antes del 30 de abril aprox.',
        'El empleador sube el certificado a un portal con acuse de recibo digital → cumplió la obligación',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['certificado de trabajo', 'extinción', 'digitalización', 'ARCA', 'capacitaciones', 'aportes'],
      order: 25,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-26',
      lawId: LAW_ID,
      number: '26',
      title: 'Derogación del Cap. VIII Tít. II LCT',
      text:
        'Derógase el Capítulo VIII del Título II de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones.',      plainLanguageExplanation:
        'Se deroga el Capítulo VIII del Título II de la LCT. Ese capítulo regulaba ciertos aspectos relacionados con el trabajo a domicilio que fueron absorbidos por otras normas.',
      practicalEffects: [
        'Las disposiciones del Cap. VIII del Tít. II de la LCT dejaron de estar vigentes',
        'Las materias que allí se regulaban quedan bajo el régimen general o leyes especiales según corresponda',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['derogación', 'capítulo VIII', 'título II', 'LCT'],
      order: 26,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-27',
      lawId: LAW_ID,
      number: '27',
      title: 'Contrato a tiempo parcial — remuneración proporcional y horas suplementarias (art. 92 ter LCT)',
      text:
        'Sustitúyese el artículo 92 ter de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 92 ter: Contrato de Trabajo a tiempo parcial.\n1. El contrato de trabajo a tiempo parcial es aquel en virtud del cual el trabajador se obliga a prestar servicios durante un determinado número de horas al día o a la semana, inferiores a la jornada legal o convencional de la actividad. En este caso, la remuneración no podrá ser inferior a la proporcional que le corresponda a un trabajador a tiempo completo, establecida por ley o convenio colectivo, de la misma categoría o puesto de trabajo.\n2. Los trabajadores contratados a tiempo parcial podrán realizar voluntariamente horas suplementarias respecto de la jornada reducida pactada. No podrán realizar horas extraordinarias en exceso de la jornada legal, salvo el caso del artículo 89 de la presente ley.\n3. Las cotizaciones a la seguridad social y las demás que se recaudan con ésta, se efectuarán en proporción a la remuneración del trabajador y serán unificadas en caso de pluriempleo. En este último supuesto, el trabajador deberá elegir entre las obras sociales a las que aporte, aquella a la cual pertenecerá.\n4. Las prestaciones de la seguridad social se determinarán reglamentariamente teniendo en cuenta el tiempo trabajado, los aportes y las contribuciones efectuadas. Los aportes y contribuciones para la obra social será la que corresponda a un trabajador de tiempo completo de la categoría en que se desempeñe el trabajador."',      plainLanguageExplanation:
        'Actualiza el contrato de trabajo a tiempo parcial (part-time). El salario es proporcional a las horas trabajadas. El trabajador puede hacer horas suplementarias (dentro de su jornada reducida) pero no puede superar la jornada legal total. Los aportes son proporcionales al sueldo, pero la obra social se paga completa.',
      practicalEffects: [
        'Part-time de 4 hs/día: salario proporcional al de un full-time del mismo puesto',
        'Puede hacer horas suplementarias dentro de lo que resta hasta la jornada legal',
        'Aportes previsionales: proporcionales al sueldo cobrado',
        'Obra social: paga el aporte completo (de tiempo completo) aunque trabaje part-time',
        'Pluriempleo: el trabajador elige una sola obra social entre las que aporta',
      ],
      examples: [
        'Trabajador part-time de 4 hs cuando la jornada es de 8 hs → cobra el 50% del salario full-time, pero paga la obra social completa',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['tiempo parcial', 'part-time', 'jornada reducida', 'remuneración proporcional', 'obra social', 'pluriempleo'],
      order: 27,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-28',
      lawId: LAW_ID,
      number: '28',
      title: 'Despido antes del vencimiento del plazo fijo (art. 95 LCT)',
      text:
        'Sustitúyese el artículo 95 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 95: Despido antes del vencimiento del plazo. Indemnización. El despido injustificado dispuesto con antelación al vencimiento del plazo convenido, dará derecho al trabajador a percibir las indemnizaciones que correspondan por la extinción del contrato considerando, a ese solo efecto, la antigüedad que habría acumulado hasta la fecha de finalización del plazo originariamente pactado.\nCuando la extinción del contrato se produjere mediante preaviso, y estando el contrato íntegramente cumplido, el trabajador recibirá una suma de dinero equivalente a la indemnización prevista en el artículo 250 de esta ley."',      plainLanguageExplanation:
        'En un contrato a plazo fijo, si te despiden antes del vencimiento sin causa, la indemnización se calcula como si hubieras trabajado hasta el final del plazo. Si el contrato se termina con preaviso al vencer el plazo, recibís la indemnización del art. 250 (reducida).',
      practicalEffects: [
        'Despido anticipado sin causa: indemnización como si hubieras llegado al final del contrato',
        'Finalización normal con preaviso: indemnización reducida del art. 250 (50% de la normal)',
        'Protege al trabajador del vaciamiento de la indemnización en contratos cortos',
      ],
      examples: [
        'Contrato a 1 año, te despiden a los 3 meses → indemnización calculada sobre 1 año de antigüedad',
        'Contrato a 1 año, vence con preaviso → indemnización del art. 250 (50% de lo normal)',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['contrato a plazo fijo', 'despido anticipado', 'indemnización', 'preaviso', 'vencimiento'],
      order: 28,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-30',
      lawId: LAW_ID,
      number: '30',
      title: 'Trabajo en equipo — contrato por integrantes de sociedad (art. 102 LCT)',
      text:
        'Sustitúyese el artículo 102 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 102: Trabajo prestado por integrantes de una sociedad. El contrato por el cual una sociedad, asociación, comunidad o grupo de personas, con o sin personalidad jurídica, se obligue a la prestación personal de servicios propios de una relación de trabajo por parte de sus integrantes, a favor de un tercero y bajo su dependencia, en forma permanente y exclusiva, será considerado contrato de trabajo por equipo, y cada uno de sus integrantes, trabajador dependiente del tercero a quien se hubieran prestado efectivamente los mismos."',      plainLanguageExplanation:
        'Si una cooperativa, asociación o grupo presta servicios en forma permanente y exclusiva a un tercero bajo su dependencia, sus integrantes son trabajadores dependientes de ese tercero. Evita el uso de cooperativas de trabajo como pantalla para relaciones laborales encubiertas.',
      practicalEffects: [
        'Las cooperativas que trabajan permanentemente para una sola empresa → sus integrantes son trabajadores de esa empresa',
        'Combate el fraude laboral mediante cooperativas de trabajo ficticias',
        'Aplica cuando hay permanencia, exclusividad y dependencia del tercero',
      ],
      examples: [
        'Una cooperativa de 10 personas que trabaja solo para una fábrica bajo sus órdenes → son empleados en relación de dependencia de la fábrica',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['trabajo en equipo', 'cooperativa', 'contrato por equipo', 'dependencia', 'fraude laboral'],
      order: 30,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-31',
      lawId: LAW_ID,
      number: '31',
      title: 'Beneficios sociales — definición y listado (art. 103 bis LCT)',
      text:
        'Sustitúyese el artículo 103 bis de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 103 bis: Beneficios sociales. Se denominan beneficios sociales a las prestaciones de naturaleza jurídica de seguridad social, no remunerativas, no dinerarias, no acumulables ni sustituibles en dinero, que el empleador voluntariamente otorga al trabajador, directamente o por intermedio de terceros, con el objeto de mejorar la calidad de vida del trabajador y/o de su grupo familiar a cargo; por ende, estos beneficios no son salarios en especie. En ningún caso corresponderá el pago de aportes ni contribuciones a la seguridad social, ni la aplicación de contribuciones patronales o aportes del trabajador sobre los conceptos comprendidos en la presente disposición. Se consideran beneficios sociales las siguientes prestaciones: a) Los servicios de comedor y alimentación del trabajador, dentro del establecimiento del empleador o en establecimientos gastronómicos cercanos durante la jornada laboral contratados por el empleador, en ese último caso, conforme a los límites que determine la Autoridad de Aplicación; b) Los reintegros de gastos médicos, odontológicos y farmacéuticos del trabajador y su grupo familiar, asumidos por el empleador, previa presentación de comprobantes emitidos por profesionales o establecimientos habilitados. También se incluyen los planes médicos integrales otorgados en especie o las diferencias de pago de las cuotas de dichos planes; c) La provisión de ropa de trabajo y de todo otro elemento de indumentaria o equipamiento necesario para el desempeño de las tareas del trabajador; d) Los reintegros documentados de gastos de guardería y/o sala maternal, utilizados por los trabajadores con hijos de hasta seis (6) años de edad, cuando la empresa no cuente con esas instalaciones; e) La provisión de útiles escolares y guardapolvos para los hijos del trabajador, otorgados en especie al inicio del período lectivo; f) El otorgamiento o pago documentado, contra recibo, de programas, cursos o seminarios de capacitación o especialización; g) El pago de gastos de sepelio de familiares a cargo del trabajador, debidamente documentado mediante comprobante."',      plainLanguageExplanation:
        'Los beneficios sociales (ticket canasta, cobertura médica adicional, ropa de trabajo, guardería, útiles escolares, capacitación, sepelio) no son remuneración: no llevan aportes ni contribuciones. El empleador los da voluntariamente para mejorar la calidad de vida del trabajador y su familia.',
      practicalEffects: [
        'Ticket alimentario, comedor de empresa → no es sueldo, no paga aportes',
        'Reintegro de gastos médicos, odontológicos o farmacéuticos → no remunerativo',
        'Ropa de trabajo provista por la empresa → no es salario en especie',
        'Guardería para hijos menores de 6 años → no es remunerativo si la empresa no tiene instalaciones propias',
        'Cursos de capacitación pagados → no son remunerativo si se documentan con recibo',
      ],
      examples: [
        'La empresa te da tickets de comida por $50.000/mes → no pagan aportes jubilatorios ni de obra social',
        'El empleador te reintegra la cuota del médico privado → no es salario, no lleva cargas sociales',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['beneficios sociales', 'no remunerativo', 'ticket alimentario', 'guardería', 'capacitación', 'calidad de vida'],
      order: 31,
      amendments: [],
      segments: [],
    },

    // ── BATCH 1: Arts. 7–18 (Cap. I y II — Disposiciones generales y Contrato de trabajo) ──

    {
      id: 'art-27802-7',
      lawId: LAW_ID,
      number: '7',
      title: 'Acuerdos transaccionales — validez (art. 15 LCT)',
      text:
        'Sustitúyese el artículo 15 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 15: Acuerdos transaccionales conciliatorios o liberatorios. Su validez. Los acuerdos transaccionales, conciliatorios o liberatorios sólo serán válidos cuando se realicen con intervención de la autoridad judicial o administrativa, y mediare resolución fundada de cualquiera de ésta que declare que mediante tales actos se ha alcanzado una justa composición de los derechos e intereses de las partes.\nEn todos los casos, la homologación administrativa o judicial de los acuerdos conciliatorios, transaccionales o liberatorios le otorga autoridad de cosa juzgada."',      plainLanguageExplanation:
        'Un acuerdo de desvinculación o transacción laboral solo es válido si lo homologa un juez o la autoridad administrativa (SECLO u organismo equivalente). La novedad es que la homologación da autoridad de cosa juzgada, cerrando definitivamente cualquier reclamo posterior.',
      practicalEffects: [
        'Un acuerdo firmado solo entre empleador y trabajador sin homologación no cierra el reclamo laboral',
        'La homologación judicial o administrativa convierte el acuerdo en cosa juzgada: no hay más juicio posible',
        'La autoridad homologante debe verificar que el acuerdo sea justo, no solo formal',
      ],
      examples: [
        'Te desvinculan y firmás un acuerdo ante el SECLO → es válido y definitivo una vez homologado',
        'Firmás un papel de "nada que reclamar" solo con tu empleador → no vale, podés igual ir a juicio',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['transacción', 'conciliación', 'homologación', 'cosa juzgada', 'acuerdo laboral'],
      order: 7,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-8',
      lawId: LAW_ID,
      number: '8',
      title: 'Convenciones colectivas — inaplicabilidad analógica (art. 16 LCT)',
      text:
        'Sustitúyese el artículo 16 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 16: Aplicación analógica de las convenciones colectivas de trabajo. Su exclusión. Las convenciones colectivas de trabajo no son susceptibles de aplicación extensiva o analógica."',      plainLanguageExplanation:
        'Los convenios colectivos de trabajo (CCT) no pueden aplicarse por analogía a situaciones que no están expresamente previstas en ellos. Si tu actividad no está cubierta por un CCT, no se puede extender uno de otra actividad.',
      practicalEffects: [
        'Un CCT del sector metalúrgico no puede aplicarse a trabajadores de otra industria por analogía',
        'Solo aplica el CCT que corresponde a la actividad real del trabajador',
        'Refuerza la especialidad de los CCT frente a intentos de extensión jurisprudencial',
      ],
      examples: [
        'Trabajás en una empresa de logística → aplica el CCT de camioneros, no el de comercio, aunque haya similitudes',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['convenio colectivo', 'CCT', 'analogía', 'aplicación extensiva', 'actividad'],
      order: 8,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-9',
      lawId: LAW_ID,
      number: '9',
      title: 'Antigüedad del trabajador — reingreso (art. 18 LCT)',
      text:
        'Sustitúyese el artículo 18 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 18: Antigüedad del trabajador. Cuando se reconozcan derechos al trabajador en función de su antigüedad, se considerará como tiempo de servicio aquel efectivamente trabajado desde el inicio de la relación laboral, incluyendo el correspondiente a los sucesivos contratos a plazo que las partes hubieran celebrado. Asimismo, se computará como antigüedad el tiempo de servicio anterior, en los casos en que el trabajador hubiese cesado por cualquier causa y reingrese bajo las órdenes del mismo empleador. Si transcurriese un plazo de dos (2) años entre el cese del vínculo laboral, cualquiera fuera la causa, y el trabajador reingresara a prestar servicios con el mismo empleador, la antigüedad del tiempo de servicio anterior no será computada."',      plainLanguageExplanation:
        'Si renunciaste o te despidieron y volvés a trabajar con el mismo empleador, tu antigüedad anterior se cuenta — a menos que hayan pasado más de 2 años entre la salida y el reingreso, en cuyo caso empezás de cero.',
      practicalEffects: [
        'Reingreso dentro de los 2 años: la antigüedad anterior se suma a la nueva',
        'Reingreso después de 2 años: la antigüedad empieza desde cero',
        'Los contratos a plazo sucesivos con el mismo empleador cuentan como antigüedad continua',
      ],
      examples: [
        'Trabajaste 5 años, renunciaste y volviste 18 meses después → tenés 5 años + el nuevo período',
        'Trabajaste 5 años, renunciaste y volviste 3 años después → empezás de cero en antigüedad',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['antigüedad', 'reingreso', 'cese', 'cómputo', 'plazo dos años'],
      order: 9,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-12',
      lawId: LAW_ID,
      number: '12',
      title: 'Relación de trabajo — definición (art. 22 LCT)',
      text:
        'Sustitúyese el artículo 22 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 22: Relación de trabajo. Habrá relación de trabajo cuando una persona humana preste servicios en favor de otra persona, bajo la dependencia de ésta en forma voluntaria y mediante el pago de una remuneración."',      plainLanguageExplanation:
        'Hay relación de trabajo cuando una persona presta servicios en forma voluntaria, bajo dependencia de otra y a cambio de remuneración. La ley clarifica que el trabajador debe ser una "persona humana" (no una empresa ni sociedad).',
      practicalEffects: [
        'La relación de trabajo requiere tres elementos: dependencia, voluntariedad y remuneración',
        '"Persona humana" excluye explícitamente a personas jurídicas que facturan servicios',
        'Sirve de base para el sistema de presunciones del art. 23 LCT',
      ],
      examples: [
        'Prestás servicios en forma regular bajo las órdenes de un jefe y cobras sueldo → hay relación de trabajo',
        'Una SRL te factura servicios de consultoría → no hay relación de trabajo aunque haya dependencia fáctica',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['relación de trabajo', 'dependencia', 'remuneración', 'voluntariedad', 'persona humana'],
      order: 12,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-13',
      lawId: LAW_ID,
      number: '13',
      title: 'Presunción del contrato de trabajo — excepciones (art. 23 LCT)',
      text:
        'Sustitúyese el artículo 23 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 23: Presunción de la existencia del contrato de trabajo. El hecho de la prestación de servicios en situación de dependencia hace presumir la existencia de un contrato de trabajo, salvo que, por las circunstancias, las relaciones o causas que lo motiven, se demostrase lo contrario.\nLa presunción contenida en el presente artículo no será de aplicación cuando mediaren contrataciones de obras o de servicios profesionales o de oficios, o cualquier otra modalidad que comprendan prestaciones de servicios sin relación de dependencia, y se emitan los recibos o facturas correspondientes a dichas formas de contratación o el pago se realice conforme los sistemas bancarios y/u otros sistemas que determine la Reglamentación correspondiente.\nDicha ausencia de presunción se extenderá a todos los efectos, inclusive a la seguridad social."',      plainLanguageExplanation:
        'Si prestás servicios bajo dependencia, se presume que hay contrato de trabajo. La novedad es que si emitís facturas o recibos propios (monotributista, autónomo) o cobrás por banco según la reglamentación, esa presunción no aplica — ni siquiera para la seguridad social.',
      practicalEffects: [
        'Presunción general: prestación bajo dependencia = contrato de trabajo',
        'Excepción: si hay facturas o recibos de servicios profesionales/de oficio emitidos regularmente',
        'La excepción aplica también para aportes a la seguridad social',
        'El empleador puede desactivar la presunción demostrando la contratación como independiente',
      ],
      examples: [
        'Trabajás en una empresa sin contrato pero bajo sus órdenes → se presume que sos empleado en relación de dependencia',
        'Facturás como monotributista con recibos mensuales → la presunción no aplica',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['presunción', 'contrato de trabajo', 'dependencia', 'monotributista', 'factura', 'independiente'],
      order: 13,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-14',
      lawId: LAW_ID,
      number: '14',
      title: 'Empleador — definición (art. 26 LCT)',
      text:
        'Sustitúyese el artículo 26 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 26: Empleador. Se considera empleador a la persona humana o jurídica, o conjunto de ellas aún sin personalidad jurídica propia, que, a los fines de desempeñarse bajo su dependencia, requiera los servicios de un trabajador."',      plainLanguageExplanation:
        'Empleador es cualquier persona (humana o jurídica), o conjunto de ellas aunque no tengan personería jurídica, que requiera servicios de un trabajador bajo su dependencia.',
      practicalEffects: [
        'Las UTE, consorcios y asociaciones sin personería jurídica también pueden ser empleadores',
        'Una persona humana que contrata empleados domésticos o personales es empleador',
        'El requisito central es la dependencia: quien dirige al trabajador es el empleador',
      ],
      examples: [
        'Una UTE de empresas de construcción que contrata obreros es empleadora aunque no tenga CUIT propio',
        'Una persona que contrata a alguien para cuidar a sus hijos en casa es empleadora (régimen doméstico)',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['empleador', 'persona jurídica', 'dependencia', 'conjunto económico', 'personería jurídica'],
      order: 14,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-15',
      lawId: LAW_ID,
      number: '15',
      title: 'Socio-empleado (art. 27 LCT)',
      text:
        'Sustitúyese el artículo 27 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 27: Socio-empleado. Las personas que, integrando una sociedad, prestan a ésta toda su actividad en forma personal y habitual, con sujeción a las instrucciones o directivas que concretamente se le impartan, serán consideradas como trabajadores dependientes de la sociedad a los efectos de la aplicación de esta ley y de los regímenes legales o convencionales que regulan y protegen la prestación de trabajo en relación de dependencia.\nExceptúanse las sociedades de familia entre integrantes del grupo familiar primario."',      plainLanguageExplanation:
        'Si sos socio de una empresa pero trabajás en ella bajo las instrucciones de los otros socios, la ley te considera trabajador dependiente. La excepción son las empresas familiares entre integrantes del grupo familiar primario.',
      practicalEffects: [
        'Un socio minoritario que trabaja en relación de dependencia real en la empresa tiene derechos laborales',
        'Las empresas familiares entre padres, hijos y cónyuge están exceptuadas',
        'Protege contra esquemas donde se "socia" al trabajador para eludir la LCT',
      ],
      examples: [
        'Sos socio con el 5% pero trabajás 8 hs diarias bajo órdenes del dueño mayoritario → sos trabajador dependiente',
        'Trabajás en la empresa familiar con tus padres → exceptuado, aplica el régimen familiar',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['socio empleado', 'sociedad', 'dependencia', 'familia', 'fraude laboral'],
      order: 15,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-16',
      lawId: LAW_ID,
      number: '16',
      title: 'Mediación e intermediación laboral (art. 29 LCT)',
      text:
        'Sustitúyese el artículo 29 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 29: Mediación. Intermediación. Los trabajadores serán considerados empleados directos de aquellos que registren la relación laboral, sin perjuicio de haber sido contratados con vistas a utilizar su prestación o de proporcionarlos a terceras empresas. La empresa usuaria únicamente será responsable solidaria por las obligaciones laborales y de la seguridad social respecto de los trabajadores proporcionados, exclusivamente de aquellas devengadas durante el tiempo de efectiva prestación para esta última. En ese caso, la empresa usuaria podrá repetir contra la obligada principal."',      plainLanguageExplanation:
        'El empleador "real" es quien registra la relación laboral. La empresa usuaria (quien usa los servicios del trabajador provisto por una agencia) responde solidariamente solo por las obligaciones del período en que el trabajador efectivamente prestó servicios para ella, y puede repetir ese pago contra la agencia.',
      practicalEffects: [
        'La agencia o empresa que registra al trabajador es el empleador principal',
        'La empresa usuaria solo responde solidariamente por el período de prestación efectiva',
        'Si la empresa usuaria paga obligaciones de la agencia, puede recuperar ese dinero de la agencia',
      ],
      examples: [
        'Una agencia de personal te coloca en una empresa por 3 meses → la agencia es tu empleador, la empresa usuaria responde por esos 3 meses',
        'La empresa usuaria paga tu aguinaldo que debía la agencia → puede cobrarle a la agencia luego',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['intermediación', 'agencia de personal', 'empresa usuaria', 'responsabilidad solidaria', 'registración'],
      order: 16,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-17',
      lawId: LAW_ID,
      number: '17',
      title: 'Empresas de servicios eventuales (art. 29 bis LCT)',
      text:
        'Sustitúyese el artículo 29 bis de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 29 bis: El empleador que ocupe trabajadores a través de una empresa de servicios eventuales habilitada por la autoridad competente, será solidariamente responsable con aquélla por el cumplimiento de todas las obligaciones laborales y la observancia de la instrumentación referida a la retención de aportes a la Seguridad Social que establezca la Agencia de Recaudación y Control Aduanero (ARCA), organismo descentralizado actuante en la órbita del Ministerio de Economía.\nEl trabajador contratado a través de una empresa de servicios eventuales estará regido por la Convención Colectiva de la actividad o categoría en la que efectivamente preste servicios en la empresa usuaria. Atento a las características temporarias propias de la eventualidad, el trabajador eventual no podrá ser candidato y/o designado en cargo gremial alguno vinculado a la empresa usuaria que implique la aplicación de la tutela prevista en la ley 23.551 y sus modificaciones o la que en el futuro la reemplace."',      plainLanguageExplanation:
        'Si tu empresa contrata personal a través de una agencia de eventuales habilitada, ambas son solidariamente responsables por tus obligaciones laborales y aportes a la seguridad social. El trabajador eventual rige por el CCT de la actividad donde trabaja, pero no puede ser candidato gremial en la empresa usuaria.',
      practicalEffects: [
        'La empresa usuaria y la agencia responden solidariamente por salarios, aportes y beneficios del eventual',
        'El CCT aplicable es el de la actividad real donde trabaja (empresa usuaria), no el de la agencia',
        'El trabajador eventual no puede ser delegado gremial ni tener tutela sindical en la empresa usuaria',
      ],
      examples: [
        'Empresa de manufactura contrata eventuales a través de una agencia → ambas responden por el sueldo y obra social',
        'Trabajás como eventual en un banco → aplica el CCT bancario, no el de la agencia',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['servicios eventuales', 'agencia', 'solidaridad', 'CCT', 'trabajador eventual', 'ARCA'],
      order: 17,
      amendments: [],
      segments: [],
    },

    {
      id: 'art-27802-18',
      lawId: LAW_ID,
      number: '18',
      title: 'Subcontratación y delegación (art. 30 LCT)',
      text:
        'Sustitúyese el artículo 30 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, por el siguiente:\n"Artículo 30: Subcontratación y delegación. Quienes cedan total o parcialmente a otros el establecimiento o explotación habilitado a su nombre, o contraten o subcontraten, cualquiera sea el acto que le dé origen, trabajos o servicios correspondientes a la actividad normal y específica propia del establecimiento, dentro de su ámbito, excluyendo las actividades accesorias o coadyuvantes, deberán exigir a sus cesionarios, contratistas o subcontratistas el número del Código Único de Identificación Laboral (CUIL) de cada uno de los trabajadores que presten servicios, la constancia de pago mensuales a los Subsistemas de la Seguridad Social, constancia de pago de las remuneraciones, la información de una (1) cuenta a nombre del trabajador donde recibe su remuneración y una cobertura por riesgos del trabajo con cláusula de endoso a favor del comitente o principal. El cumplimiento del control de los requisitos referidos en este párrafo exime de toda responsabilidad al principal. Tampoco será responsable el principal ante la falsedad de información brindada por parte de los cesionarios, contratistas o subcontratistas. En caso de omitir la solicitud de los datos indicados, el principal responderá solidariamente."',      plainLanguageExplanation:
        'Si subcontratás servicios de tu actividad principal, debés verificar que el contratista esté al día con sus trabajadores. Si pedís y controlás la documentación (CUIL, pagos de aportes, recibos, cuenta bancaria, ART), quedás eximido de responsabilidad solidaria. Si no lo hacés, respondés solidariamente.',
      practicalEffects: [
        'El comitente que controla activamente la documentación del contratista queda eximido de responsabilidad',
        'Sin control documental → responsabilidad solidaria por las deudas laborales del contratista',
        'La excepción solo aplica a "actividad normal y específica", no a servicios accesorios (limpieza, seguridad)',
        'La falsedad de documentación presentada por el contratista no perjudica al comitente diligente',
      ],
      examples: [
        'Una constructora subcontrata plomería (actividad afín) → debe controlar CUIL, aportes, recibos y ART del plomero',
        'Una empresa subcontrata la limpieza de sus oficinas → actividad accesoria, no aplica la solidaridad del art. 30',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['subcontratación', 'responsabilidad solidaria', 'contratista', 'CUIL', 'actividad principal', 'ART'],
      order: 18,
      amendments: [],
      segments: [],
    },
  ],
};
