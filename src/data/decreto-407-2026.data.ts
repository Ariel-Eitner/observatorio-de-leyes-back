import type { Law } from '../common/types/law.types';

const LAW_ID = 'decreto-407-2026';

// ════════════════════════════════════════════════════════════════════════════
//  DECRETO 407/2026 — Reglamentación de la LCT (Ley 27.802) — RECIBO DE SUELDO
//  Firmado: 29/05/2026  |  Publicado: 01/06/2026 (BO)
//
//  ALCANCE DE ESTA FICHA (parcial): el decreto tiene 24 artículos dispositivos y
//  3 Anexos. Acá se carga la parte de reglamentación de la LCT (recibo de sueldo,
//  registración, viáticos, licencias, renuncia, jubilación): arts. dispositivos
//  1-3 + ANEXO I (9 arts) + ANEXO III (modelo de recibo). NO se incluyen los
//  arts. 4-22 (modificatorios de los decretos sindicales 199/1988 y 467/1988 y de
//  convenios colectivos) ni el ANEXO II (Empresas de Servicios Eventuales).
//  Fuente: https://www.argentina.gob.ar/normativa/nacional/decreto-407-2026-426270/texto
//  Texto consolidado InfoLeg (id 426270). Modelo de recibo: Anexo III (imagen oficial).
// ════════════════════════════════════════════════════════════════════════════

export const DECRETO_407_2026: Law = {
  id: LAW_ID,
  number: '407/2026',
  title: 'Reglamentación de la LCT (Ley 27.802) — recibo de sueldo, registración y licencias',
  commonName: 'Decreto del recibo de sueldo digital (Ley 27.802)',
  summary:
    'Reglamenta artículos de la Ley de Contrato de Trabajo (20.744) modificados por la Ley de Modernización Laboral 27.802. Su Anexo I fija, entre otros, el nuevo recibo de sueldo (art. 140 LCT): cuatro secciones obligatorias más un resumen del costo laboral total agrupado en siete rubros (sindical, seguridad social, obra social, INSSJP/PAMI, ART, cámaras empresariales y otros), conforme el modelo del Anexo III. También reglamenta la registración laboral ante ARCA (art. 52), los viáticos (art. 105), las licencias médicas (art. 210), la renuncia (art. 240), los acuerdos extintivos (art. 241) y la jubilación (art. 252). NOTA: ficha parcial — no incluye los arts. 4-22 (sindical/convenios) ni el Anexo II (servicios eventuales).',
  year: 2026,
  sanctionDate: '2026-05-29',
  promulgationDate: '2026-05-29',
  publicationDate: '2026-06-01',
  effectiveDate: '2026-06-01',
  derogatedDate: null,
  boNumber: null,
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'DECRETO',
  issuingBody: 'Poder Ejecutivo Nacional',
  fullText: null,
  sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/decreto-407-2026-426270/texto',
  articleCount: 3,
  topics: [
    'Recibo de sueldo',
    'Costo laboral',
    'Registración laboral ante ARCA',
    'Derecho laboral',
    'Licencias médicas',
    'Modernización Laboral',
  ],
  keywords: [
    'recibo de sueldo',
    'recibo de haberes',
    'recibo digital',
    'costo laboral',
    'gráfico de torta',
    'rubros',
    'registración',
    'ARCA',
    'libro de sueldos',
    'artículo 140 LCT',
    'artículo 52 LCT',
    'ley 27802',
    'decreto 407/2026',
    'viáticos',
    'licencia médica',
    'ReNaPDiS',
  ],
  relatedNorms: [
    'Ley 27.802 (Modernización Laboral)',
    'Ley 20.744 (LCT)',
    'Ley 14.250 (Convenios Colectivos de Trabajo)',
    'Ley 23.551 (Asociaciones Sindicales)',
    'Ley 24.013 (Empleo)',
    'Ley 24.714 (Asignaciones Familiares)',
    'Decreto 199/1988',
    'Decreto 467/1988',
    'Decreto 315/2026',
    'Resolución General ARCA 5844/2026',
  ],
  relations: [],
  executiveSummary:
    'El Decreto 407/2026 reglamenta varios artículos de la LCT modificados por la Ley 27.802. Lo más visible para el trabajador es el NUEVO RECIBO DE SUELDO (Anexo I, art. 5, que reglamenta el art. 140 LCT): debe tener cuatro secciones (datos; contribuciones del empleador; remuneración bruta y deducciones; remuneración neta) y, en el anverso, un resumen de la composición total del COSTO LABORAL discriminado como mínimo en siete rubros (sindical, seguridad social, obra social, INSSJP, ART, cámaras empresariales y otros). El recibo debe ajustarse al modelo del Anexo III (imagen oficial). El decreto también dispone que la registración laboral del art. 52 LCT se cumple con el alta/baja en los sistemas de ARCA, reemplazando los libros de sueldos. IMPORTANTE: el decreto completo tiene 24 artículos dispositivos y 3 Anexos; esta ficha cubre la reglamentación de la LCT (arts. 1-3 + Anexos I y III). Los arts. 4-22 (modificatorios de los decretos sindicales 199/1988 y 467/1988 y de convenios colectivos) y el Anexo II (Empresas de Servicios Eventuales) no están incluidos en esta ficha.',
  objective:
    'Reglamentar los artículos de la LCT reformados por la Ley 27.802 en materia de recibo de sueldo, registración laboral, viáticos, beneficios sociales, licencias médicas, renuncia, acuerdos extintivos y jubilación. Según sus considerandos, busca adecuar el régimen laboral a los avances tecnológicos, promover esquemas digitales más simples y eficientes y mejorar la claridad, accesibilidad y comprensión de la información para el trabajador. Firmado por Milei, Adorni, Sturzenegger y Caputo (Expte. EX-2026-53036291-APN-DGDTEYSS#MCH).',
  problemItSolves:
    'La Ley 27.802 modificó numerosos artículos de la LCT pero su aplicación requería precisiones operativas: cómo debe estructurarse el nuevo recibo, qué muestra el resumen del costo laboral, cómo se cumple la registración ante ARCA, etc. El decreto fija esos criterios.',
  practicalImpact:
    'Desde el devengado de mayo/junio de 2026, el recibo de sueldo cambia de formato: además del neto, debe mostrar en el anverso cuánto paga el empleador en concepto de costo laboral total, agrupado en siete rubros. La registración del trabajador se hace con el alta/baja en ARCA (sin libro de sueldos físico). Afecta a todos los empleadores y trabajadores en relación de dependencia del sector privado.',
  affectedSubjects: [
    'Trabajadores en relación de dependencia del sector privado',
    'Empleadores del sector privado',
    'Estudios contables y liquidadores de sueldos',
    'ARCA (registración)',
    'BCRA (supervisión del art. 132 inc. f)',
    'ANSES y agentes del seguro de salud (trámite jubilatorio)',
  ],
  createdAt: '2026-06-01T00:00:00.000Z',
  updatedAt: '2026-06-02T00:00:00.000Z',

  articles: [
    {
      id: 'dec-407-art-1',
      lawId: LAW_ID,
      number: '1',
      title: 'Aprobación de la reglamentación de la LCT (Anexos I y III)',
      text:
        'Apruébase la Reglamentación de los artículos 52, 103 bis, 105, inciso f) del artículo 132, 140, 210, 240, 241 y 252 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, que como ANEXO I (IF-2026-53626853-APN-STEYSS#MCH) y ANEXO III (IF-2026-53626708-APN-STEYSS#MCH) forman parte integrante del presente decreto.',
      plainLanguageExplanation:
        'Este artículo da fuerza legal a la reglamentación de nueve artículos de la Ley de Contrato de Trabajo (entre ellos el art. 140, que es el recibo de sueldo). El detalle de esa reglamentación está en el Anexo I, y el modelo concreto del recibo en el Anexo III. Sin este artículo, esos Anexos serían solo documentos sin fuerza obligatoria.',
      practicalEffects: [
        'El Anexo I (reglamentación de la LCT) y el Anexo III (modelo de recibo) pasan a ser obligatorios.',
        'Quedan reglamentados los arts. 52, 103 bis, 105, 132 inc. f, 140, 210, 240, 241 y 252 de la LCT.',
      ],
      examples: [
        'El nuevo formato de recibo (Anexo III) es exigible porque este artículo lo incorporó como parte del decreto.',
      ],
      relatedArticles: ['dec-407-annex-i', 'dec-407-annex-iii'],
      jurisprudence: [],
      regulations: [],
      keywords: ['aprobación', 'reglamentación', 'LCT', 'anexo I', 'anexo III', 'recibo'],
      order: 1,
      visualContent: [
        {
          id: 'dec-407-modelo-recibo',
          type: 'imagen',
          title: 'Modelo oficial del recibo de sueldo',
          description:
            'Modelo del nuevo recibo de haberes (Anexo III del Decreto 407/2026). Tiene cuatro secciones obligatorias (datos; contribuciones del empleador; remuneración bruta y deducciones; remuneración neta) y, en el anverso, un resumen de la composición total del costo laboral agrupado en siete rubros: sindical, seguridad social, obra social, INSSJP (PAMI), ART, cámaras empresariales y otros.',
          sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/425000-429999/426270/dec407anexo3.jpg',
          sourcePage: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/342620/20260601',
          data: {},
        },
      ],
      segments: [
        {
          id: 'dec-407-art-1-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-407-art-1',
          articleNumber: '1',
          segmentType: 'PARAGRAPH',
          text:
            'Apruébase la Reglamentación de los artículos 52, 103 bis, 105, 132 inc. f), 140, 210, 240, 241 y 252 de la Ley de Contrato de Trabajo N° 20.744, que como ANEXO I y ANEXO III forman parte integrante del presente decreto.',
          plainExplanation:
            'Da fuerza legal a la reglamentación de la LCT (Anexo I) y al modelo de recibo (Anexo III).',
          practicalExample:
            'El nuevo recibo (Anexo III) es obligatorio porque este artículo lo incorporó al decreto.',
          references: ['Ley 20.744 (LCT)', 'Ley 27.802'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'dec-407-art-2',
      lawId: LAW_ID,
      number: '2',
      title: 'Aprobación de la reglamentación de Empresas de Servicios Eventuales (Anexo II)',
      text:
        'Apruébase la Reglamentación de Empresas de Servicios Eventuales, de acuerdo con lo establecido en la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones y la Ley N° 24.013 y sus modificaciones, que como ANEXO II (IF-2026-53626789-APN-STEYSS#MCH) forma parte integrante del presente decreto.',
      plainLanguageExplanation:
        'Aprueba la reglamentación de las Empresas de Servicios Eventuales (las que proveen personal temporario), contenida en el Anexo II. NOTA: el contenido de ese Anexo II no está cargado en esta ficha, que se enfoca en el recibo de sueldo y la reglamentación de la LCT.',
      practicalEffects: [
        'Da fuerza legal al Anexo II sobre Empresas de Servicios Eventuales.',
        'El detalle del Anexo II no está incluido en esta ficha (pendiente).',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['servicios eventuales', 'anexo II', 'ley 24013', 'personal temporario'],
      order: 2,
      segments: [
        {
          id: 'dec-407-art-2-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-407-art-2',
          articleNumber: '2',
          segmentType: 'PARAGRAPH',
          text:
            'Apruébase la Reglamentación de Empresas de Servicios Eventuales (Ley 20.744 y Ley 24.013), que como ANEXO II forma parte integrante del presente decreto.',
          plainExplanation:
            'Aprueba el Anexo II sobre Empresas de Servicios Eventuales (no cargado en esta ficha).',
          practicalExample: null,
          references: ['Ley 24.013', 'Ley 20.744 (LCT)'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'dec-407-art-3',
      lawId: LAW_ID,
      number: '3',
      title: 'Autoridad de aplicación de plataformas de movilidad y reparto',
      text:
        'Desígnase como Autoridad de Aplicación del Régimen de los Servicios Privados de Movilidad de Personas y/o Reparto que utilizan plataformas tecnológicas previsto en el TÍTULO XII de la Ley de Modernización Laboral N° 27.802, a la SECRETARÍA DE TRANSPORTE del MINISTERIO DE ECONOMÍA, y la SECRETARÍA DE TRABAJO, EMPLEO Y SEGURIDAD SOCIAL del MINISTERIO DE CAPITAL HUMANO, cada uno en el marco de sus competencias conforme lo establecido en el artículo 127 de dicha norma.',
      plainLanguageExplanation:
        'Define quién controla el régimen de las plataformas de movilidad y reparto (tipo apps de transporte y delivery) que regula el Título XII de la Ley 27.802: la Secretaría de Transporte y la Secretaría de Trabajo, cada una en lo suyo.',
      practicalEffects: [
        'La Secretaría de Transporte y la Secretaría de Trabajo son autoridades de aplicación de las plataformas de movilidad/reparto.',
        'Cada una actúa según sus competencias (transporte / laboral).',
      ],
      examples: [
        'Un reclamo sobre las condiciones laborales en una app de reparto se canaliza ante la Secretaría de Trabajo; uno sobre el servicio de transporte, ante la Secretaría de Transporte.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['plataformas', 'movilidad', 'reparto', 'autoridad de aplicación', 'título XII', 'artículo 127'],
      order: 3,
      segments: [
        {
          id: 'dec-407-art-3-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-407-art-3',
          articleNumber: '3',
          segmentType: 'PARAGRAPH',
          text:
            'Desígnase como Autoridad de Aplicación del régimen de plataformas de movilidad y reparto (Título XII de la Ley N° 27.802) a la Secretaría de Transporte y a la Secretaría de Trabajo, Empleo y Seguridad Social, cada una en el marco de sus competencias (art. 127).',
          plainExplanation:
            'Las plataformas de movilidad/reparto quedan bajo control de las Secretarías de Transporte y de Trabajo.',
          practicalExample:
            'Reclamo laboral en una app de delivery → Secretaría de Trabajo.',
          references: ['Ley 27.802 Título XII', 'Ley 27.802 art. 127'],
          order: 1,
        },
      ],
      amendments: [],
    },
  ],
  segments: [],
  annexes: [
    {
      id: 'dec-407-annex-i',
      lawId: LAW_ID,
      number: 'I',
      title: 'Reglamentación de la LCT — recibo de sueldo, registración, viáticos y licencias (9 arts.)',
      content:
        'ANEXO I — Reglamentación de artículos de la Ley de Contrato de Trabajo (20.744) modificados por la Ley 27.802. Contiene 9 artículos:\n\n' +
        'Art. 1 (reglamenta art. 52 LCT — Registración): «La obligación de registración de las relaciones laborales prevista en el artículo 52 de la LCT se cumplirá mediante el alta y baja de los trabajadores en los sistemas habilitados por la AGENCIA DE RECAUDACIÓN Y CONTROL ADUANERO (ARCA)». La inscripción en ARCA es suficiente a todos los efectos legales, sin requisitos administrativos adicionales y sin libros de sueldos en soporte físico.\n\n' +
        'Art. 2 (reglamenta art. 103 bis inc. a LCT — Beneficios sociales): el beneficio de servicios gastronómicos fuera del establecimiento solo puede instrumentarse mediante prestación solventada directamente por el empleador (no en dinero) y no puede superar el 40 % del Salario Mínimo Vital y Móvil mensual.\n\n' +
        'Art. 3 (reglamenta art. 105 inc. b LCT — Viáticos): fija en el CINCO POR CIENTO (5 %) de la remuneración bruta anual del trabajador el límite máximo aplicable.\n\n' +
        'Art. 4 (reglamenta art. 132 inc. f LCT): el BANCO CENTRAL DE LA REPÚBLICA ARGENTINA dictará las normas complementarias y supervisará el cumplimiento, en el ámbito de sus competencias.\n\n' +
        'Art. 5 (reglamenta art. 140 LCT — RECIBO DE HABERES): el recibo debe estructurarse en CUATRO (4) secciones claramente diferenciadas: a) datos del empleador (CUIT), del trabajador (CUIL), fecha de ingreso, antigüedad, categoría, fecha y lugar de pago de cargas sociales; b) detalle de las contribuciones y/o conceptos abonados por el empleador por disposición legal o convencional; c) total de la remuneración bruta con su determinación y deducciones; d) remuneración neta. Los conceptos deben consignarse con su base de cálculo, unidad de medida y monto resultante; las sumas globales se prorratean en cada recibo individual; el total de conceptos a cargo del empleador debe consignarse antes del monto bruto a percibir. Además, EN EL ANVERSO del recibo debe incorporarse un resumen de la composición total del COSTO LABORAL, con los conceptos a cargo del empleador agrupados como mínimo en los rubros: a) sindical; b) seguridad social; c) obra social; d) I.N.S.S.J.P.; e) A.R.T.; f) cámaras o entidades empresariales; g) otros rubros. El recibo debe respetar el formato y contenido del modelo del ANEXO III.\n\n' +
        'Art. 6 (reglamenta art. 210 LCT — Licencias médicas): toda prescripción con reposo laboral debe contener diagnóstico, tratamiento y cantidad de días, y emitirse electrónicamente mediante plataforma registrada en el REGISTRO NACIONAL DE PLATAFORMAS DIGITALES SANITARIAS (ReNaPDiS).\n\n' +
        'Art. 7 (reglamenta art. 240 LCT — Renuncia): la Secretaría de Trabajo dictará el procedimiento para formalizar la renuncia ante la autoridad administrativa, con registro y notificación fehaciente al empleador.\n\n' +
        'Art. 8 (reglamenta art. 241 LCT — Acuerdos extintivos): los acuerdos de extinción presentados ante la autoridad administrativa podrán homologarse (art. 15 LCT) previa verificación de legalidad, ausencia de vicios del consentimiento y justa composición de intereses.\n\n' +
        'Art. 9 (reglamenta art. 252 LCT — Jubilación): se instruye a la ANSES a implementar un sistema de notificación del inicio y la finalización del trámite jubilatorio, dirigido a empleadores y agentes del seguro de salud.',
      order: 1,
    },
    {
      id: 'dec-407-annex-iii',
      lawId: LAW_ID,
      number: 'III',
      title: 'Modelo oficial del recibo de sueldo',
      content:
        'ANEXO III — «El recibo de sueldo deberá ajustarse al modelo previsto en el presente anexo.» El modelo es una imagen oficial (IF-2026-53626708-APN-STEYSS#MCH). Refleja las cuatro secciones del art. 5 del Anexo I y el resumen de la composición del costo laboral en siete rubros (sindical, seguridad social, obra social, INSSJP, ART, cámaras empresariales y otros), que se incorpora en el anverso. El modelo oficial puede verse y descargarse desde el contenido visual del artículo 1 de esta ficha.',
      order: 2,
    },
  ],
  amendments: [],
  metadata: {
    id: 'meta-decreto-407-2026',
    lawId: LAW_ID,
    mainTopic: 'Recibo de sueldo y reglamentación de la LCT (Ley 27.802)',
    subtopics: [
      'Recibo de sueldo (art. 140 LCT)',
      'Resumen del costo laboral en siete rubros',
      'Registración laboral ante ARCA (art. 52 LCT)',
      'Licencias médicas electrónicas (ReNaPDiS)',
    ],
    relatedLaws: ['Ley 27.802', 'Ley 20.744 (LCT)', 'Decreto 315/2026', 'Resolución General ARCA 5844/2026'],
    regulations: [],
    modifyingNorms: [],
    derogatingNorms: [],
    jurisprudence: [],
    doctrine: [],
    obligations: [
      'Emitir el recibo de sueldo con las 4 secciones y el resumen del costo laboral en 7 rubros (Anexo I art. 5)',
      'Ajustar el recibo al modelo oficial del Anexo III',
      'Registrar las relaciones laborales mediante alta/baja en ARCA (Anexo I art. 1)',
    ],
    rights: [
      'El trabajador recibe un recibo que transparenta el costo laboral total que paga el empleador',
    ],
    sanctions: [
      'Un recibo que omita el resumen del costo laboral o no agrupe los conceptos en los rubros exigidos queda fuera de norma',
    ],
    useCases: [
      'Entender qué muestra el nuevo recibo de sueldo y el resumen del costo laboral',
      'Saber cómo se cumple la registración laboral ante ARCA',
      'Verificar el límite de viáticos (5 % de la remuneración bruta anual)',
    ],
    faq: [
      {
        question: '¿Qué muestra el gráfico/resumen de costo laboral del nuevo recibo?',
        answer:
          'Muestra el COSTO LABORAL TOTAL que paga el empleador por encima del sueldo de bolsillo del trabajador, agrupado como mínimo en siete rubros: sindical, seguridad social, obra social, INSSJP (PAMI), ART, cámaras o entidades empresariales y otros. No es lo que se le descuenta al trabajador, sino lo que aporta el empleador. Va en el anverso del recibo (Anexo I, art. 5).',
      },
      {
        question: '¿Cómo se registra ahora a un trabajador?',
        answer:
          'Mediante el alta y baja en los sistemas de ARCA (Anexo I, art. 1, que reglamenta el art. 52 LCT). Esa inscripción es suficiente a todos los efectos legales y reemplaza a los libros de sueldos en soporte físico.',
      },
      {
        question: '¿Esta ficha cubre todo el Decreto 407/2026?',
        answer:
          'No. El decreto tiene 24 artículos dispositivos y 3 Anexos. Esta ficha cubre la reglamentación de la LCT (recibo de sueldo, registración, viáticos, licencias, renuncia, jubilación): arts. 1-3 y Anexos I y III. No incluye los arts. 4-22 (modificatorios de los decretos sindicales 199/1988 y 467/1988 y de convenios colectivos) ni el Anexo II (Empresas de Servicios Eventuales).',
      },
    ],
    createdAt: '2026-06-01T00:00:00.000Z',
    updatedAt: '2026-06-02T00:00:00.000Z',
  },
};
