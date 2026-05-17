import type { Law } from '../common/types/law.types';

const LAW_ID = 'ley-25326';

export const LEY_25326: Law = {
  id: LAW_ID,
  number: '25326',
  title: 'Ley de Protección de los Datos Personales',
  summary:
    'Regula el tratamiento de datos personales asentados en archivos, registros y bancos de datos, garantizando el derecho a la intimidad y al honor de las personas. Establece el habeas data como acción judicial de protección.',
  year: 2000,
  sanctionDate: '2000-10-04',
  promulgationDate: '2000-10-30',
  publicationDate: '2000-11-02',
  boNumber: '29517',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790/texto',
  articleCount: 48,
  topics: [
    'Datos personales',
    'Privacidad',
    'Habeas data',
    'Protección de la información',
    'Derechos digitales',
  ],
  keywords: [
    'datos personales',
    'habeas data',
    'privacidad',
    'consentimiento',
    'base de datos',
    'rectificación',
    'supresión',
    'datos sensibles',
    'registro',
    'usuario responsable',
    'DNPDP',
  ],
  relatedNorms: ['Decreto 1558/2001', 'Ley 26343', 'Decreto 995/2000'],
  executiveSummary:
    'La Ley 25326 es la norma fundamental de privacidad en Argentina. Establece que nadie puede usar tus datos personales sin tu consentimiento, que tenés derecho a saber qué datos guardan sobre vos, y que podés pedir que los corrijan o borren. Las empresas y organismos que manejan bases de datos tienen obligaciones concretas y pueden ser sancionados si las incumplen.',
  objective:
    'Garantizar la protección integral de los datos personales para asegurar el derecho a la intimidad, honor y dignidad de las personas físicas y jurídicas.',
  problemItSolves:
    'Antes de esta ley, empresas y organismos podían recopilar, ceder y comercializar datos personales sin ningún control. Las personas no sabían qué información se guardaba sobre ellas ni podían corregir errores que les afectaban (como datos crediticios falsos). Tampoco existía un mecanismo judicial rápido para proteger la privacidad.',
  practicalImpact:
    'Todo negocio, profesional o entidad pública que almacene datos de personas (clientes, empleados, pacientes) debe cumplir esta ley. Afecta desde hospitales con historias clínicas hasta apps de delivery con listas de usuarios, pasando por bancos, estudios contables y organismos del Estado.',
  affectedSubjects: [
    'Empresas y comercios con bases de datos de clientes',
    'Profesionales con datos de pacientes o clientes',
    'Organismos públicos nacionales y provinciales',
    'Plataformas digitales y apps',
    'Empresas de informes crediticios',
    'Cualquier persona física que trate datos de terceros',
  ],
  createdAt: '2000-11-02T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  amendments: [
    {
      id: 'amd-25326-1',
      lawId: LAW_ID,
      modifyingLaw: 'Decreto 995/2000',
      modifyingDate: '2000-11-02',
      description:
        'Vetó los artículos 29 (puntos 2 y 3) y 47 relativos a la estructura y funcionamiento del órgano de control.',
      createdAt: '2000-11-02T00:00:00.000Z',
    },
    {
      id: 'amd-25326-2',
      lawId: LAW_ID,
      modifyingLaw: 'Decreto 1558/2001',
      modifyingDate: '2001-12-03',
      description:
        'Reglamentó la ley y modificó el artículo 46, estableciendo 180 días para que los archivos existentes se adecuen al régimen legal.',
      createdAt: '2001-12-03T00:00:00.000Z',
    },
    {
      id: 'amd-25326-3',
      lawId: LAW_ID,
      modifyingLaw: 'Ley 26343',
      modifyingDate: '2008-01-09',
      description:
        'Incorporó el artículo 47: eliminación de datos sobre obligaciones morosas o mal clasificadas del período 2000–2003 que estuvieran canceladas o regularizadas.',
      createdAt: '2008-01-09T00:00:00.000Z',
    },
  ],
  annexes: [
    {
      id: 'anx-25326-1',
      lawId: LAW_ID,
      number: 'I',
      title: 'Decreto Reglamentario 1558/2001',
      content:
        'El Decreto 1558/2001 reglamentó la Ley 25326 y estableció: (1) La Dirección Nacional de Protección de Datos Personales como órgano de control; (2) El procedimiento de inscripción de bases de datos; (3) El plazo de 180 días para la adecuación de archivos existentes al régimen legal; (4) Las condiciones de transferencia internacional de datos personales; (5) El régimen de auditorías periódicas.',
      order: 1,
    },
    {
      id: 'anx-25326-2',
      lawId: LAW_ID,
      number: 'II',
      title: 'Ley 26343 — Datos de deudores período 2000-2003',
      content:
        'La Ley 26343 (sancionada en enero 2008) incorporó el artículo 47 a la Ley 25326, disponiendo la eliminación de datos sobre obligaciones morosas o mal clasificadas correspondientes al período de crisis económica 2000-2003, siempre que dichas obligaciones estuvieran canceladas o regularizadas. La norma tuvo un impacto masivo sobre los informes crediticios de millones de argentinos afectados por la crisis del 2001.',
      order: 2,
    },
  ],
  segments: [],
  metadata: {
    id: 'meta-25326',
    lawId: LAW_ID,
    mainTopic: 'Protección de datos personales',
    subtopics: [
      'Habeas data',
      'Datos sensibles',
      'Consentimiento informado',
      'Seguridad de la información',
      'Derechos del titular',
      'Organismos de control',
      'Infracciones y sanciones',
    ],
    relatedLaws: [
      'Ley 26951 - No llame',
      'Ley 27078 - Argentina Digital',
      'RGPD (Reglamento europeo, referencia comparativa)',
      'Decreto 1558/2001 (reglamentario)',
    ],
    regulations: ['Decreto 1558/2001', 'Resolución DNPDP 37/2019', 'Disposición DNPDP 3/2005'],
    modifyingNorms: ['Ley 26343', 'Decreto 995/2000', 'Decreto 1558/2001'],
    derogatingNorms: [],
    jurisprudence: [
      'CSJN - Urteaga c/ Estado Mayor - Fallos 321:2947 (1998) - habeas data preventivo',
      'CSJN - Ganora c/ Estado Nacional - Fallos 322:2139 (1999)',
      'CNCiv - Macchi c/ BCRA (2003) - datos crediticios',
    ],
    doctrine: [
      'Palazzi, Pablo - "La Ley de Protección de Datos Personales"',
      'Altmark, Daniel - "Informática y Derecho"',
      'Feldstein de Cárdenas, Sara - "Derecho Internacional Privado"',
    ],
    obligations: [
      'Registrar la base de datos ante la DNPDP',
      'Obtener consentimiento libre, expreso e informado del titular',
      'Informar al titular la finalidad del tratamiento al recolectar datos',
      'Garantizar la seguridad e integridad de los datos almacenados',
      'Guardar confidencialidad sobre los datos tratados',
      'Responder solicitudes de acceso en 10 días corridos',
      'Rectificar o suprimir datos erróneos en 5 días hábiles',
      'No ceder datos sin consentimiento del titular',
    ],
    rights: [
      'Derecho de acceso: conocer qué datos se guardan sobre uno',
      'Derecho de rectificación: corregir datos inexactos o incompletos',
      'Derecho de actualización: actualizar datos desactualizados',
      'Derecho de supresión: solicitar el borrado de datos ("derecho al olvido")',
      'Derecho de confidencialidad: que los datos no sean divulgados',
      'Acción de habeas data: vía judicial directa para proteger estos derechos',
    ],
    sanctions: [
      'Multas administrativas de $1.000 a $100.000 según escala de infracciones leves, graves y muy graves (art. 1 Disp. 7-DNPDP)',
      'Suspensión temporal de la base de datos de 1 a 365 días para infracciones graves o muy graves (art. 2 Disp. 7-DNPDP)',
      'Clausura o cancelación definitiva de la base de datos para infracciones muy graves (art. 3 Disp. 7-DNPDP)',
      'Penas de prisión de 1 mes a 2 años por inserción de datos falsos (art. 117 bis CP)',
      'Penas de 6 meses a 3 años por revelar datos secretos (art. 157 bis CP)',
      'Penas de 1 mes a 2 años por acceso ilegítimo a bases de datos (art. 157 bis CP)',
    ],
    useCases: [
      'Un banco me tiene como deudor incobrable pero la deuda ya fue cancelada → podés pedir rectificación',
      'Una empresa de mailing usa mis datos sin que yo haya dado permiso → podés solicitar supresión',
      'Un ex empleador comparte mi legajo con otras empresas → es cesión sin consentimiento, es ilegal',
      'Una clínica vende historial de pacientes a una farmacéutica → violación de datos sensibles',
      'Un sitio web no tiene política de privacidad ni pide consentimiento → está incumpliendo la ley',
    ],
    faq: [
      {
        question: '¿Cualquier lista de contactos es una base de datos en el sentido de la ley?',
        answer:
          'Sí. La ley define base de datos de manera amplia: cualquier conjunto organizado de datos que permita el tratamiento o transmisión. Una agenda de clientes en Excel ya califica.',
      },
      {
        question: '¿Una persona particular que guarda datos de amigos en su teléfono está alcanzada?',
        answer:
          'No. La ley excluye expresamente los archivos mantenidos por personas para uso exclusivamente personal y sin propósito de difusión.',
      },
      {
        question: '¿Qué pasa si una empresa no registra su base de datos?',
        answer:
          'Puede recibir sanciones administrativas de la DNPDP, incluyendo multas y clausura del archivo.',
      },
      {
        question: '¿El habeas data sirve sólo para datos crediticios?',
        answer:
          'No. Sirve para cualquier tipo de datos personales: laborales, médicos, policiales, comerciales, etc.',
      },
      {
        question: '¿Cuánto tarda el proceso de habeas data?',
        answer:
          'La acción es sumaria. El responsable del archivo tiene 5 días hábiles para contestar el informe, y el juez debe resolver en 3 días.',
      },
    ],
    createdAt: '2000-11-02T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  articles: [
    // ══════════════════════════════════════════════════
    //  CAPÍTULO I — DISPOSICIONES GENERALES
    // ══════════════════════════════════════════════════
    {
      id: 'art-25326-1',
      lawId: LAW_ID,
      number: '1',
      title: 'Objeto',
      originalText:
        'La presente ley tiene por objeto la protección integral de los datos personales asentados en archivos, registros, bancos de datos, u otros medios técnicos de tratamiento de datos, sean éstos públicos, o privados destinados a dar informes, para garantizar el derecho al honor y a la intimidad de las personas, así como también el acceso a la información que sobre las mismas se registre, de conformidad a lo establecido en el artículo 43, párrafo tercero de la Constitución Nacional.',
      currentText:
        'La presente ley tiene por objeto la protección integral de los datos personales asentados en archivos, registros, bancos de datos, u otros medios técnicos de tratamiento de datos, sean éstos públicos, o privados destinados a dar informes, para garantizar el derecho al honor y a la intimidad de las personas, así como también el acceso a la información que sobre las mismas se registre, de conformidad a lo establecido en el artículo 43, párrafo tercero de la Constitución Nacional.',
      plainLanguageExplanation:
        'Esta ley protege tu información personal: tu nombre, domicilio, historial médico, datos bancarios, etc. Aplica a cualquier lugar donde esos datos estén guardados: un hospital, una empresa, el Estado, o una app. El objetivo es que nadie pueda usar tus datos para dañar tu reputación o invadir tu privacidad.',
      practicalEffects: [
        'Toda empresa o entidad que guarde datos de personas debe cumplir esta ley',
        'El fundamento constitucional está en el art. 43 de la Constitución (habeas data)',
        'Aplica tanto a bases de datos públicas (RENAPER, ANSES) como privadas (bancos, clínicas)',
      ],
      examples: [
        'Una empresa de informes crediticios que guarda tu historial de pagos está alcanzada',
        'Un hospital con historias clínicas electrónicas debe cumplir esta ley',
        'Un algoritmo de recomendaciones que procesa tu comportamiento online entra en este régimen',
      ],
      relatedArticles: ['art-25326-43-CN'],
      jurisprudence: ['CSJN - Urteaga c/ Estado Mayor - Fallos 321:2947 (1998)'],
      regulations: [],
      keywords: ['objeto', 'protección integral', 'datos personales', 'honor', 'intimidad', 'habeas data'],
      order: 1,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-1-0',
          lawId: LAW_ID,
          articleId: 'art-25326-1',
          articleNumber: '1',
          segmentType: 'PARAGRAPH',
          originalText:
            'La presente ley tiene por objeto la protección integral de los datos personales asentados en archivos, registros, bancos de datos, u otros medios técnicos de tratamiento de datos, sean éstos públicos, o privados destinados a dar informes...',
          plainExplanation:
            'La ley protege cualquier dato personal que esté guardado en algún sistema, ya sea del Estado o de una empresa privada.',
          practicalExample:
            'Tu historial en Mercado Libre, tu legajo en ANSES, tu ficha de paciente en un hospital: todos están cubiertos.',
          references: ['Art. 43 CN'],
          order: 0,
        },
        {
          id: 'seg-25326-1-1',
          lawId: LAW_ID,
          articleId: 'art-25326-1',
          articleNumber: '1',
          segmentType: 'PARAGRAPH',
          originalText:
            '...para garantizar el derecho al honor y a la intimidad de las personas, así como también el acceso a la información que sobre las mismas se registre, de conformidad a lo establecido en el artículo 43, párrafo tercero de la Constitución Nacional.',
          plainExplanation:
            'El objetivo final es doble: que tus datos no se usen para perjudicarte, y que puedas saber qué información existe sobre vos. Este derecho tiene rango constitucional.',
          practicalExample:
            'Si una empresa de informes te califica como "deudor moroso" siendo falso, esta ley te da herramientas para corregirlo.',
          references: ['Art. 43 CN - párrafo 3°'],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-2',
      lawId: LAW_ID,
      number: '2',
      title: 'Definiciones',
      originalText:
        'A los fines de la presente ley se entiende por:\nDATOS PERSONALES: Información de cualquier tipo referida a personas físicas o de existencia ideal determinadas o determinables.\nDATOS SENSIBLES: Datos personales que revelan origen racial y étnico, opiniones políticas, convicciones religiosas, filosóficas o morales, afiliación sindical e información referente a la salud o a la vida sexual.\nARCHIVO, REGISTRO, BASE O BANCO DE DATOS: Indistintamente, designan al conjunto organizado de datos personales que sean objeto de tratamiento o procesamiento, electrónico o no, cualquiera que fuere la modalidad de su formación, almacenamiento, organización o acceso.\nTRATAMIENTO DE DATOS: Operaciones y procedimientos sistemáticos, electrónicos o no, que permitan la recolección, conservación, ordenación, almacenamiento, modificación, relacionamiento, evaluación, bloqueo, destrucción, y en general el procesamiento de datos personales, así como también su cesión a terceros a través de comunicaciones, consultas, interconexiones o transferencias.\nRESPONSABLE DE ARCHIVO, REGISTRO, BASE O BANCO DE DATOS: Persona física o de existencia ideal, pública o privada, que es titular de un archivo, registro, base o banco de datos.\nDATOS INFORMATIZADOS: Los datos personales sometidos al tratamiento o procesamiento electrónico o automatizado.\nTITULAR DE LOS DATOS: Toda persona física o persona jurídica de existencia ideal con domicilio legal o delegaciones o sucursales en el país, cuyos datos sean objeto del tratamiento al que se refiere la presente ley.\nUSUARIO DE DATOS: Toda persona, pública o privada que realice a su arbitrio el tratamiento de datos, ya sea en archivos, registros o bancos de datos propios o a través de conexión con los mismos.\nDISOCIACIÓN DE DATOS: Todo tratamiento de datos personales de manera que la información obtenida no pueda asociarse a persona determinada o determinable.',
      currentText:
        'A los fines de la presente ley se entiende por:\nDATOS PERSONALES: Información de cualquier tipo referida a personas físicas o de existencia ideal determinadas o determinables.\nDATOS SENSIBLES: Datos personales que revelan origen racial y étnico, opiniones políticas, convicciones religiosas, filosóficas o morales, afiliación sindical e información referente a la salud o a la vida sexual.\nARCHIVO, REGISTRO, BASE O BANCO DE DATOS: Indistintamente, designan al conjunto organizado de datos personales que sean objeto de tratamiento o procesamiento, electrónico o no, cualquiera que fuere la modalidad de su formación, almacenamiento, organización o acceso.\nTRATAMIENTO DE DATOS: Operaciones y procedimientos sistemáticos, electrónicos o no, que permitan la recolección, conservación, ordenación, almacenamiento, modificación, relacionamiento, evaluación, bloqueo, destrucción, y en general el procesamiento de datos personales, así como también su cesión a terceros a través de comunicaciones, consultas, interconexiones o transferencias.\nRESPONSABLE DE ARCHIVO, REGISTRO, BASE O BANCO DE DATOS: Persona física o de existencia ideal, pública o privada, que es titular de un archivo, registro, base o banco de datos.\nDATOS INFORMATIZADOS: Los datos personales sometidos al tratamiento o procesamiento electrónico o automatizado.\nTITULAR DE LOS DATOS: Toda persona física o persona jurídica de existencia ideal con domicilio legal o delegaciones o sucursales en el país, cuyos datos sean objeto del tratamiento al que se refiere la presente ley.\nUSUARIO DE DATOS: Toda persona, pública o privada que realice a su arbitrio el tratamiento de datos, ya sea en archivos, registros o bancos de datos propios o a través de conexión con los mismos.\nDISOCIACIÓN DE DATOS: Todo tratamiento de datos personales de manera que la información obtenida no pueda asociarse a persona determinada o determinable.',
      plainLanguageExplanation:
        'El artículo 2 es el glosario de la ley. Define los términos clave para que no haya confusiones. Lo más importante: "datos personales" es casi cualquier información que permita identificarte; "datos sensibles" son los más protegidos (salud, religión, política, sexualidad).',
      practicalEffects: [
        '"Datos personales" incluye nombre, DNI, mail, foto, voz, geolocalización e IP',
        '"Datos sensibles" tienen protección extra y no pueden usarse sin consentimiento expreso',
        '"Usuario de datos" puede ser una empresa tercera que procesa datos en nombre de otra',
      ],
      examples: [
        'Tu nombre + DNI = datos personales ordinarios',
        'Tu diagnóstico médico + orientación sexual + afiliación política = datos sensibles',
        'Una empresa de análisis de datos que trabaja para otra es "usuario de datos"',
      ],
      relatedArticles: ['art-25326-7'],
      jurisprudence: [],
      regulations: [],
      keywords: ['definiciones', 'datos sensibles', 'datos personales', 'usuario', 'responsable', 'tratamiento'],
      order: 2,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-2-0',
          lawId: LAW_ID,
          articleId: 'art-25326-2',
          articleNumber: '2',
          segmentType: 'INCISO',
          originalText:
            'DATOS PERSONALES: Información de cualquier tipo referida a personas físicas o de existencia ideal determinadas o determinables.',
          plainExplanation:
            'Dato personal = cualquier información que permita identificar a alguien, directa o indirectamente. Alcanza desde el nombre hasta una IP o un número de placa.',
          practicalExample:
            'Tu email, tu número de celular, tu foto de perfil y tu geolocalización son datos personales.',
          references: [],
          order: 0,
        },
        {
          id: 'seg-25326-2-1',
          lawId: LAW_ID,
          articleId: 'art-25326-2',
          articleNumber: '2',
          segmentType: 'INCISO',
          originalText:
            'DATOS SENSIBLES: Datos personales que revelan origen racial y étnico, opiniones políticas, convicciones religiosas, filosóficas o morales, afiliación sindical e información referente a la salud o a la vida sexual.',
          plainExplanation:
            'Los datos sensibles son los que más pueden usarse para discriminar o perjudicar. Por eso tienen protección reforzada y reglas mucho más estrictas para su tratamiento.',
          practicalExample:
            'Tu diagnóstico de VIH, tu militancia política o tu religión son datos sensibles. Una empresa no puede pedirte eso para darte empleo.',
          references: ['Art. 7'],
          order: 1,
        },
        {
          id: 'seg-25326-2-2',
          lawId: LAW_ID,
          articleId: 'art-25326-2',
          articleNumber: '2',
          segmentType: 'INCISO',
          originalText:
            'TRATAMIENTO DE DATOS: Operaciones y procedimientos sistemáticos, electrónicos o no, que permitan la recolección, conservación, ordenación, almacenamiento, modificación, relacionamiento, evaluación, bloqueo, destrucción, y en general el procesamiento de datos personales, así como también su cesión a terceros a través de comunicaciones, consultas, interconexiones o transferencias.',
          plainExplanation:
            '"Tratamiento" abarca todo lo que se pueda hacer con un dato: guardarlo, modificarlo, mandárselo a otro, borrarlo. Si hacés cualquiera de estas cosas, estás tratando datos.',
          practicalExample:
            'Cuando una app de delivery guarda tu dirección, la muestra al repartidor y luego la borra: ejecutó tres operaciones de tratamiento distintas.',
          references: [],
          order: 2,
        },
        {
          id: 'seg-25326-2-3',
          lawId: LAW_ID,
          articleId: 'art-25326-2',
          articleNumber: '2',
          segmentType: 'INCISO',
          originalText:
            'DISOCIACIÓN DE DATOS: Todo tratamiento de datos personales de manera que la información obtenida no pueda asociarse a persona determinada o determinable.',
          plainExplanation:
            'Disociar datos = anonimizarlos. Si los datos ya no pueden identificar a nadie, dejan de ser "datos personales" y salen del régimen protectorio de la ley. Muy usado en investigación.',
          practicalExample:
            'Un hospital puede compartir estadísticas de enfermedades si elimina nombre, DNI y todo dato identificatorio del paciente.',
          references: [],
          order: 3,
        },
      ],
    },
    {
      id: 'art-25326-3',
      lawId: LAW_ID,
      number: '3',
      title: 'Ámbito de aplicación',
      originalText:
        'La presente ley rige en todo el territorio nacional y se aplica a todos los datos personales que, reuniendo las características y condiciones que establece la presente ley, sean tratados por personas o entidades domiciliadas en la República Argentina, salvo lo dispuesto en los convenios internacionales en que la República Argentina sea parte. También rige a personas o entidades domiciliadas en el extranjero siempre que sean tratados en el territorio nacional o con fines comerciales en la República Argentina. Quedan excluidos del ámbito de aplicación de esta ley los archivos de datos mantenidos por personas físicas en el ejercicio de actividades exclusivamente personales o domésticas. Los archivos, registros, bases y bancos de datos que contengan información de personas de existencia ideal no son alcanzados por la presente ley.',
      currentText:
        'La presente ley rige en todo el territorio nacional y se aplica a todos los datos personales que, reuniendo las características y condiciones que establece la presente ley, sean tratados por personas o entidades domiciliadas en la República Argentina, salvo lo dispuesto en los convenios internacionales en que la República Argentina sea parte. También rige a personas o entidades domiciliadas en el extranjero siempre que sean tratados en el territorio nacional o con fines comerciales en la República Argentina. Quedan excluidos del ámbito de aplicación de esta ley los archivos de datos mantenidos por personas físicas en el ejercicio de actividades exclusivamente personales o domésticas. Los archivos, registros, bases y bancos de datos que contengan información de personas de existencia ideal no son alcanzados por la presente ley.',
      plainLanguageExplanation:
        'La ley aplica en todo el país. También aplica a empresas extranjeras que operen en Argentina o que usen datos de argentinos con fines comerciales. Hay dos excepciones: las agendas personales (uso doméstico) y los datos de empresas (personas jurídicas), que no están protegidos por esta ley.',
      practicalEffects: [
        'Una empresa extranjera con usuarios argentinos (Netflix, Spotify, Google) queda alcanzada',
        'La agenda del teléfono personal está excluida',
        'Los datos de empresas (CUIT, razón social) no tienen la misma protección que los de personas físicas',
      ],
      examples: [
        'Facebook, Amazon o Google deben cumplir esta ley respecto de sus usuarios argentinos',
        'Una lista de números de amigos en tu celular no es una base de datos alcanzada',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['ámbito de aplicación', 'territorio', 'extranjero', 'exclusiones', 'personas físicas'],
      order: 3,
      amendments: [],
      segments: [],
    },
    {
      id: 'art-25326-4',
      lawId: LAW_ID,
      number: '4',
      title: 'Calidad de los datos',
      originalText:
        'Los datos personales que se recojan a los efectos de su tratamiento deben ser ciertos, adecuados, pertinentes y no excesivos en relación al ámbito y finalidad para los que se hubieren obtenido. La recolección de datos no puede hacerse por medios desleales, ilícitos, o en forma contraria a las disposiciones de la presente ley. Los datos objeto de tratamiento no pueden ser utilizados para finalidades distintas o incompatibles con aquellas que motivaron su obtención. Los datos deben ser exactos y actualizarse en el caso de que ello fuere necesario. Los datos total o parcialmente inexactos, o que sean incompletos, deben ser suprimidos y sustituidos, o en su caso completados, por el responsable del archivo o base de datos cuando se tenga conocimiento de la inexactitud o carácter incompleto de la información de que se trate, sin perjuicio de los derechos del titular establecidos en el artículo 16 de la presente ley. Los datos deben ser almacenados de modo que permitan el ejercicio del derecho de acceso de su titular. Los datos deben ser destruidos cuando hayan dejado de ser necesarios o pertinentes a los fines para los cuales hubiesen sido recolectados.',
      currentText:
        'Los datos personales que se recojan a los efectos de su tratamiento deben ser ciertos, adecuados, pertinentes y no excesivos en relación al ámbito y finalidad para los que se hubieren obtenido. La recolección de datos no puede hacerse por medios desleales, ilícitos, o en forma contraria a las disposiciones de la presente ley. Los datos objeto de tratamiento no pueden ser utilizados para finalidades distintas o incompatibles con aquellas que motivaron su obtención. Los datos deben ser exactos y actualizarse en el caso de que ello fuere necesario. Los datos total o parcialmente inexactos, o que sean incompletos, deben ser suprimidos y sustituidos, o en su caso completados, por el responsable del archivo o base de datos cuando se tenga conocimiento de la inexactitud o carácter incompleto de la información de que se trate, sin perjuicio de los derechos del titular establecidos en el artículo 16 de la presente ley. Los datos deben ser almacenados de modo que permitan el ejercicio del derecho de acceso de su titular. Los datos deben ser destruidos cuando hayan dejado de ser necesarios o pertinentes a los fines para los cuales hubiesen sido recolectados.',
      plainLanguageExplanation:
        'Principio de calidad: los datos deben ser verídicos, necesarios y usarse sólo para lo que fueron pedidos. No se pueden usar de cualquier manera ni guardarlos para siempre. Este artículo consagra el principio de "mínima recopilación" y el "derecho al olvido".',
      practicalEffects: [
        'Una empresa no puede usar tu mail para publicidad si te lo pidió para emitir una factura',
        'Los datos obsoletos o incorrectos deben corregirse o borrarse automáticamente',
        'No se pueden pedir más datos de los necesarios (principio de proporcionalidad)',
      ],
      examples: [
        'Un gimnasio no puede pedirte el nombre de tu médico de cabecera para inscribirte',
        'Si pagaste una deuda, el registro de mora debe eliminarse (datos obsoletos)',
        'Una aerolínea no puede usar tu historial de viajes para venderte seguros de vida sin consentimiento',
      ],
      relatedArticles: ['art-25326-16'],
      jurisprudence: [],
      regulations: [],
      keywords: ['calidad de datos', 'exactitud', 'proporcionalidad', 'finalidad', 'datos obsoletos'],
      order: 4,
      amendments: [],
      segments: [],
    },
    // ══════════════════════════════════════════════════
    //  CAPÍTULO II — PRINCIPIOS GENERALES
    // ══════════════════════════════════════════════════
    {
      id: 'art-25326-5',
      lawId: LAW_ID,
      number: '5',
      title: 'Consentimiento',
      originalText:
        '1. El tratamiento de datos personales es ilícito cuando el titular no hubiere prestado su consentimiento libre, expreso e informado, el que deberá constar por escrito, o por otro medio que permita se le equipare, de acuerdo a las circunstancias. El referido consentimiento prestado con otras declaraciones, deberá figurar en forma expresa y destacada, previa notificación al titular de los datos de la información descrita en el artículo 6 de la presente ley.\n2. No será necesario el consentimiento cuando:\na) Los datos se obtengan de fuentes de acceso público irrestricto;\nb) Se recaben para el ejercicio de funciones propias de los poderes del Estado o en virtud de una obligación legal;\nc) Se trate de listados cuyos datos se limiten a nombre, documento nacional de identidad, identificación tributaria o previsional, ocupación, fecha de nacimiento y domicilio;\nd) Deriven de una relación contractual, científica o profesional del titular de los datos, y resulten necesarios para su desarrollo o cumplimiento;\ne) Se trate de las operaciones que realicen las entidades financieras y de las informaciones que reciban de sus clientes conforme las disposiciones del artículo 39 de la Ley 21.526.',
      currentText:
        '1. El tratamiento de datos personales es ilícito cuando el titular no hubiere prestado su consentimiento libre, expreso e informado, el que deberá constar por escrito, o por otro medio que permita se le equipare, de acuerdo a las circunstancias. El referido consentimiento prestado con otras declaraciones, deberá figurar en forma expresa y destacada, previa notificación al titular de los datos de la información descrita en el artículo 6 de la presente ley.\n2. No será necesario el consentimiento cuando:\na) Los datos se obtengan de fuentes de acceso público irrestricto;\nb) Se recaben para el ejercicio de funciones propias de los poderes del Estado o en virtud de una obligación legal;\nc) Se trate de listados cuyos datos se limiten a nombre, documento nacional de identidad, identificación tributaria o previsional, ocupación, fecha de nacimiento y domicilio;\nd) Deriven de una relación contractual, científica o profesional del titular de los datos, y resulten necesarios para su desarrollo o cumplimiento;\ne) Se trate de las operaciones que realicen las entidades financieras y de las informaciones que reciban de sus clientes conforme las disposiciones del artículo 39 de la Ley 21.526.',
      plainLanguageExplanation:
        'La regla es que nadie puede usar tus datos sin que vos lo hayas autorizado de manera libre, clara y consciente. Las excepciones son específicas: datos de acceso público, datos necesarios para una obligación legal, o datos que surgen de un contrato donde participaste.',
      practicalEffects: [
        'Una casilla tildada por defecto NO cumple el requisito de consentimiento libre',
        'El consentimiento debe ser específico para cada finalidad, no genérico',
        'Si los datos vienen del guía telefónico público, no necesitan consentimiento',
      ],
      examples: [
        'Un e-commerce que usa tu dirección para enviarte el producto no necesita consentimiento extra (relación contractual)',
        'Una empresa que compra listas de emails para spam SÍ necesita consentimiento de cada persona',
        'AFIP puede procesar tus datos sin consentimiento por obligación legal',
      ],
      relatedArticles: ['art-25326-6'],
      jurisprudence: ['CNCom - Tarjeta Naranja c/ DNPDP (2005) - consentimiento tácito'],
      regulations: ['Decreto 1558/2001 - art. 5'],
      keywords: ['consentimiento', 'libre', 'expreso', 'informado', 'excepciones', 'ilicitud'],
      order: 5,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-5-0',
          lawId: LAW_ID,
          articleId: 'art-25326-5',
          articleNumber: '5',
          segmentType: 'PARAGRAPH',
          originalText:
            'El tratamiento de datos personales es ilícito cuando el titular no hubiere prestado su consentimiento libre, expreso e informado, el que deberá constar por escrito, o por otro medio que permita se le equipare, de acuerdo a las circunstancias.',
          plainExplanation:
            'La regla general: sin consentimiento, no hay tratamiento lícito. El consentimiento debe ser libre (sin presión), expreso (no tácito) e informado (sabiendo para qué).',
          practicalExample:
            'Una app que en su pantalla de registro dice "al usar la app aceptás que vendemos tus datos a terceros" en letra chica NO cumple con consentimiento informado.',
          references: ['Art. 6'],
          order: 0,
        },
        {
          id: 'seg-25326-5-1',
          lawId: LAW_ID,
          articleId: 'art-25326-5',
          articleNumber: '5',
          segmentType: 'INCISO',
          originalText:
            'No será necesario el consentimiento cuando:\na) Los datos se obtengan de fuentes de acceso público irrestricto...',
          plainExplanation:
            'Excepción 1: si la información ya es pública (guía telefónica, registro de propietarios), no hace falta pedir permiso para usarla.',
          practicalExample:
            'Una empresa puede usar un número de teléfono que aparece en la guía comercial sin pedir consentimiento.',
          references: [],
          order: 1,
        },
        {
          id: 'seg-25326-5-2',
          lawId: LAW_ID,
          articleId: 'art-25326-5',
          articleNumber: '5',
          segmentType: 'INCISO',
          originalText:
            'd) Deriven de una relación contractual, científica o profesional del titular de los datos, y resulten necesarios para su desarrollo o cumplimiento...',
          plainExplanation:
            'Excepción clave para negocios: si tenés un contrato con alguien, podés usar los datos que necesitás para cumplirlo, sin necesidad de un consentimiento adicional.',
          practicalExample:
            'Una mutual que usa tu CUIL y obra social para gestionar tu cobertura no necesita un consentimiento separado.',
          references: [],
          order: 2,
        },
      ],
    },
    {
      id: 'art-25326-6',
      lawId: LAW_ID,
      number: '6',
      title: 'Información al titular',
      originalText:
        'Cuando se recaben datos personales se deberá informar previamente a sus titulares en forma expresa y clara:\na) La finalidad para la que serán tratados y quiénes pueden ser sus destinatarios o clase de destinatarios;\nb) La existencia del archivo, registro, base o banco de datos, electrónico o de cualquier otro tipo, de que se trate y la identidad y domicilio de su responsable;\nc) El carácter obligatorio o facultativo de las respuestas al cuestionario que se le proponga, en especial en cuanto a los datos referidos en el artículo siguiente;\nd) Las consecuencias de proporcionar los datos, de la negativa a hacerlo o de la inexactitud de los mismos;\ne) La posibilidad de ejercer los derechos de acceso, rectificación y supresión de los datos.',
      currentText:
        'Cuando se recaben datos personales se deberá informar previamente a sus titulares en forma expresa y clara:\na) La finalidad para la que serán tratados y quiénes pueden ser sus destinatarios o clase de destinatarios;\nb) La existencia del archivo, registro, base o banco de datos, electrónico o de cualquier otro tipo, de que se trate y la identidad y domicilio de su responsable;\nc) El carácter obligatorio o facultativo de las respuestas al cuestionario que se le proponga, en especial en cuanto a los datos referidos en el artículo siguiente;\nd) Las consecuencias de proporcionar los datos, de la negativa a hacerlo o de la inexactitud de los mismos;\ne) La posibilidad de ejercer los derechos de acceso, rectificación y supresión de los datos.',
      plainLanguageExplanation:
        'Cuando alguien te pide datos, antes de que los des, tiene la obligación de decirte: para qué los va a usar, quién los va a tener, si es obligatorio contestar, qué pasa si no contestás, y que podés pedir verlos, corregirlos o borrarlos. Es el fundamento legal de las "políticas de privacidad".',
      practicalEffects: [
        'Toda app, formulario o contrato que pida datos debe incluir esta información',
        'La política de privacidad no es un capricho: es una obligación legal',
        'Si no informaron correctamente, el consentimiento queda viciado',
      ],
      examples: [
        'Un formulario de inscripción escolar debe decir si el DNI es obligatorio y para qué se usa',
        'Una tienda online debe indicar si comparte tus datos con empresas de marketing antes de que compres',
      ],
      relatedArticles: ['art-25326-5', 'art-25326-7'],
      jurisprudence: [],
      regulations: [],
      keywords: ['información al titular', 'finalidad', 'política de privacidad', 'obligatorio', 'acceso'],
      order: 6,
      amendments: [],
      segments: [],
    },
    {
      id: 'art-25326-7',
      lawId: LAW_ID,
      number: '7',
      title: 'Categorías de datos',
      originalText:
        '1. Ninguna persona puede ser obligada a proporcionar datos sensibles.\n2. Los datos sensibles sólo pueden ser recolectados y objeto de tratamiento cuando medien razones de interés general autorizadas por ley. También podrán ser tratados con finalidades estadísticas o científicas cuando no puedan ser identificados sus titulares.\n3. Queda prohibida la formación de archivos, bancos o registros que almacenen información que directa o indirectamente revele datos sensibles. Se exceptúan los archivos de las Iglesias, asociaciones religiosas y organizaciones políticas y sindicales que procedan con relación a sus miembros respectivos.\n4. Los datos relativos a antecedentes penales o contravencionales sólo pueden ser objeto de tratamiento por parte de las autoridades públicas competentes, en el marco de las leyes y reglamentaciones respectivas.',
      currentText:
        '1. Ninguna persona puede ser obligada a proporcionar datos sensibles.\n2. Los datos sensibles sólo pueden ser recolectados y objeto de tratamiento cuando medien razones de interés general autorizadas por ley. También podrán ser tratados con finalidades estadísticas o científicas cuando no puedan ser identificados sus titulares.\n3. Queda prohibida la formación de archivos, bancos o registros que almacenen información que directa o indirectamente revele datos sensibles. Se exceptúan los archivos de las Iglesias, asociaciones religiosas y organizaciones políticas y sindicales que procedan con relación a sus miembros respectivos.\n4. Los datos relativos a antecedentes penales o contravencionales sólo pueden ser objeto de tratamiento por parte de las autoridades públicas competentes, en el marco de las leyes y reglamentaciones respectivas.',
      plainLanguageExplanation:
        'Los datos sensibles tienen protección máxima. Nadie puede obligarte a revelar tu religión, ideología política, sexualidad o estado de salud. Ni siquiera el Estado puede crear bases de datos que contengan este tipo de información, salvo excepciones muy acotadas.',
      practicalEffects: [
        'Un empleador no puede exigirte declarar tu religión, ideología o condición de salud en el proceso de selección',
        'El Gobierno no puede crear un registro de ciudadanos clasificados por orientación sexual',
        'Un hospital puede tratar datos de salud (excepción expresa de la ley)',
      ],
      examples: [
        'Una empresa que filtra candidatos por no pertenecer a cierta religión está violando este artículo',
        'Una investigación universitaria puede usar datos de salud si los anonimiza correctamente',
        'Los sindicatos pueden guardar datos de afiliación de sus propios miembros',
      ],
      relatedArticles: ['art-25326-2'],
      jurisprudence: [],
      regulations: [],
      keywords: ['datos sensibles', 'prohibición', 'antecedentes penales', 'religión', 'ideología', 'salud'],
      order: 7,
      amendments: [],
      segments: [],
    },
    {
      id: 'art-25326-9',
      lawId: LAW_ID,
      number: '9',
      title: 'Seguridad de los datos',
      originalText:
        '1. El responsable o usuario del archivo de datos debe adoptar las medidas técnicas y organizativas que resulten necesarias para garantizar la seguridad y confidencialidad de los datos personales, de modo de evitar su adulteración, pérdida, consulta o tratamiento no autorizado, y que permitan detectar desviaciones, intencionales o no, de información, ya sea que los riesgos provengan de la acción humana o del medio técnico utilizado.\n2. Queda prohibido registrar datos personales en archivos, registros, bases o bancos que no reúnan condiciones técnicas de integridad y seguridad.',
      currentText:
        '1. El responsable o usuario del archivo de datos debe adoptar las medidas técnicas y organizativas que resulten necesarias para garantizar la seguridad y confidencialidad de los datos personales, de modo de evitar su adulteración, pérdida, consulta o tratamiento no autorizado, y que permitan detectar desviaciones, intencionales o no, de información, ya sea que los riesgos provengan de la acción humana o del medio técnico utilizado.\n2. Queda prohibido registrar datos personales en archivos, registros, bases o bancos que no reúnan condiciones técnicas de integridad y seguridad.',
      plainLanguageExplanation:
        'Toda empresa u organismo que maneje datos tiene la obligación de implementar medidas de seguridad. Si no protegen bien los datos y hay una brecha (hackeo, filtración), son responsables. No alcanza con buenas intenciones: deben existir medidas concretas, técnicas y organizativas.',
      practicalEffects: [
        'Uso de contraseñas, cifrado y control de acceso son obligatorios, no opcionales',
        'Si una empresa es hackeada por descuido, puede ser sancionada',
        'Deben existir procedimientos para detectar filtraciones',
      ],
      examples: [
        'Una clínica que guarda historias clínicas en un Excel sin contraseña en una PC compartida viola este artículo',
        'Un banco que no cifra los datos de tarjetas de crédito incumple la obligación de seguridad',
      ],
      relatedArticles: ['art-25326-10'],
      jurisprudence: [],
      regulations: ['Decreto 1558/2001 - art. 9'],
      keywords: ['seguridad', 'confidencialidad', 'medidas técnicas', 'integridad', 'brecha de datos'],
      order: 9,
      amendments: [],
      segments: [],
    },
    {
      id: 'art-25326-10',
      lawId: LAW_ID,
      number: '10',
      title: 'Deber de confidencialidad',
      originalText:
        'El responsable y las personas que intervengan en cualquier fase del tratamiento de datos personales están obligados al secreto profesional respecto de los mismos. Tal obligación subsistirá aun después de finalizada su relación con el titular del archivo de datos.',
      currentText:
        'El responsable y las personas que intervengan en cualquier fase del tratamiento de datos personales están obligados al secreto profesional respecto de los mismos. Tal obligación subsistirá aun después de finalizada su relación con el titular del archivo de datos.',
      plainLanguageExplanation:
        'Cualquier persona que trabaje con datos personales —empleados, contratistas, consultores— debe guardar secreto sobre ellos. Esta obligación no termina cuando dejan el trabajo. Un exempleado que filtra base de datos de clientes sigue siendo responsable legalmente.',
      practicalEffects: [
        'Aplica a todos: empleados de IT, call centers, consultoras, freelancers',
        'La confidencialidad rige después de renunciar o ser despedido',
        'Los contratos laborales deben incluir cláusulas de confidencialidad de datos',
      ],
      examples: [
        'Un programador que se lleva la base de datos de clientes al irse a otra empresa viola este artículo',
        'Un empleado de call center que comparte datos de usuarios con amigos incurre en delito penal',
      ],
      relatedArticles: ['art-25326-32'],
      jurisprudence: [],
      regulations: [],
      keywords: ['confidencialidad', 'secreto profesional', 'empleados', 'obligación'],
      order: 10,
      amendments: [],
      segments: [],
    },
    // ══════════════════════════════════════════════════
    //  CAPÍTULO V — DERECHOS DE LOS TITULARES
    // ══════════════════════════════════════════════════
    {
      id: 'art-25326-14',
      lawId: LAW_ID,
      number: '14',
      title: 'Derecho de acceso',
      originalText:
        '1. El titular de los datos, previa acreditación de su identidad, tiene derecho a solicitar y obtener información de sus datos personales incluidos en los bancos de datos públicos, o privados destinados a proveer informes.\n2. El responsable o usuario debe proporcionar la información solicitada dentro de los diez días corridos de haber sido intimado fehacientemente. Vencido el plazo sin que se satisfaga el pedido, o si evacuado el informe, éste resultara insuficiente, quedará expedita la acción de protección de los datos personales o de habeas data prevista en esta ley.\n3. El derecho de acceso a que se refiere este artículo sólo puede ser ejercido en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto.',
      currentText:
        '1. El titular de los datos, previa acreditación de su identidad, tiene derecho a solicitar y obtener información de sus datos personales incluidos en los bancos de datos públicos, o privados destinados a proveer informes.\n2. El responsable o usuario debe proporcionar la información solicitada dentro de los diez días corridos de haber sido intimado fehacientemente. Vencido el plazo sin que se satisfaga el pedido, o si evacuado el informe, éste resultara insuficiente, quedará expedita la acción de protección de los datos personales o de habeas data prevista en esta ley.\n3. El derecho de acceso a que se refiere este artículo sólo puede ser ejercido en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto.',
      plainLanguageExplanation:
        'Tenés derecho a saber qué información guardan sobre vos. Podés pedirla a cualquier empresa o entidad pública que tenga una base de datos. Tienen 10 días corridos para responder. Si no responden o la respuesta es incompleta, podés ir a la Justicia con una acción de habeas data. El derecho es gratuito, pero no podés pedirlo más de dos veces por año sin demostrar necesidad.',
      practicalEffects: [
        'Podés pedir a Veraz, Nosis o cualquier empresa de informes crediticios que te muestren tu ficha',
        'El plazo es de 10 días corridos, no hábiles',
        'Si no contestan en tiempo, directamente podés iniciar el habeas data judicial',
      ],
      examples: [
        'Pedís a Veraz por carta documento que te informen qué datos tienen. Tienen 10 días para enviarte el informe gratuito.',
        'Un banco no puede negarse a decirte qué información guarda sobre vos en sus sistemas',
      ],
      relatedArticles: ['art-25326-16', 'art-25326-33'],
      jurisprudence: ['CSJN - Ganora c/ Estado Nacional - Fallos 322:2139 (1999)'],
      regulations: [],
      keywords: ['derecho de acceso', 'diez días', 'habeas data', 'gratuito', 'identidad'],
      order: 14,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-14-0',
          lawId: LAW_ID,
          articleId: 'art-25326-14',
          articleNumber: '14',
          segmentType: 'PARAGRAPH',
          originalText:
            'El titular de los datos, previa acreditación de su identidad, tiene derecho a solicitar y obtener información de sus datos personales incluidos en los bancos de datos públicos, o privados destinados a proveer informes.',
          plainExplanation:
            'El derecho de acceso es universal: aplica a bases de datos del Estado y también a empresas privadas que proveen informes (Veraz, Nosis, etc.). Solo necesitás acreditar que sos vos.',
          practicalExample:
            'Vas a Veraz, presentás tu DNI y pedís el "informe de titular". Están obligados a dártelo.',
          references: [],
          order: 0,
        },
        {
          id: 'seg-25326-14-1',
          lawId: LAW_ID,
          articleId: 'art-25326-14',
          articleNumber: '14',
          segmentType: 'PARAGRAPH',
          originalText:
            'El responsable o usuario debe proporcionar la información solicitada dentro de los diez días corridos de haber sido intimado fehacientemente. Vencido el plazo sin que se satisfaga el pedido, o si evacuado el informe, éste resultara insuficiente, quedará expedita la acción de protección de los datos personales o de habeas data prevista en esta ley.',
          plainExplanation:
            'El plazo para recibir respuesta es de 10 días corridos. Si no te responden o te responden con evasivas, ya podés ir a la Justicia sin ningún otro trámite previo.',
          practicalExample:
            'Mandás la carta documento el 1 de mayo. Si el 11 de mayo no recibiste respuesta completa, podés presentar el habeas data ante el juez.',
          references: ['Art. 33'],
          order: 1,
        },
        {
          id: 'seg-25326-14-2',
          lawId: LAW_ID,
          articleId: 'art-25326-14',
          articleNumber: '14',
          segmentType: 'PARAGRAPH',
          originalText:
            'El derecho de acceso a que se refiere este artículo sólo puede ser ejercido en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto.',
          plainExplanation:
            'El derecho de acceso es gratis, pero tiene límite de frecuencia: una vez cada 6 meses. Si necesitás consultarlo antes, tenés que demostrar un motivo válido (por ejemplo, una causa judicial en curso).',
          practicalExample:
            'Si pediste tu informe en enero, no podés pedir otro gratis hasta julio, a menos que demuestres que hay una situación urgente que lo justifica.',
          references: [],
          order: 2,
        },
      ],
    },
    {
      id: 'art-25326-16',
      lawId: LAW_ID,
      number: '16',
      title: 'Derecho de rectificación, actualización o supresión',
      originalText:
        '1. Toda persona tiene derecho a que sean rectificados, actualizados y, cuando corresponda, suprimidos o sometidos a confidencialidad los datos personales de los que sea titular, que estuvieren incluidos en un banco de datos.\n2. El responsable o usuario del banco de datos, debe proceder a la rectificación, supresión o actualización de los datos en el plazo máximo de cinco días hábiles de haber recibido la solicitud del titular de los mismos.\n3. El incumplimiento de esta obligación dentro del término acordado en el inciso precedente, habilitará al interesado a promover sin más trámite la acción de habeas data prevista en la presente ley.\n4. En el supuesto de cesión, o transferencia de datos, el responsable o usuario del banco de datos debe notificar la rectificación o supresión al cesionario dentro del quinto día hábil de efectuado el tratamiento del dato.\n5. La rectificación, actualización o supresión de datos personales inexactos o incompletos que obren en registros públicos, se hará asimismo de oficio cuando se tenga conocimiento de la inexactitud o carácter incompleto de la información de que se trate.',
      currentText:
        '1. Toda persona tiene derecho a que sean rectificados, actualizados y, cuando corresponda, suprimidos o sometidos a confidencialidad los datos personales de los que sea titular, que estuvieren incluidos en un banco de datos.\n2. El responsable o usuario del banco de datos, debe proceder a la rectificación, supresión o actualización de los datos en el plazo máximo de cinco días hábiles de haber recibido la solicitud del titular de los mismos.\n3. El incumplimiento de esta obligación dentro del término acordado en el inciso precedente, habilitará al interesado a promover sin más trámite la acción de habeas data prevista en la presente ley.\n4. En el supuesto de cesión, o transferencia de datos, el responsable o usuario del banco de datos debe notificar la rectificación o supresión al cesionario dentro del quinto día hábil de efectuado el tratamiento del dato.\n5. La rectificación, actualización o supresión de datos personales inexactos o incompletos que obren en registros públicos, se hará asimismo de oficio cuando se tenga conocimiento de la inexactitud o carácter incompleto de la información de que se trate.',
      plainLanguageExplanation:
        'Si tus datos son incorrectos, desactualizados o irrelevantes, podés pedir que los corrijan, actualicen o borren. El plazo de respuesta es de 5 días hábiles. Si no lo hacen, vas directo a la Justicia. Importante: si tus datos ya fueron cedidos a terceros, también deben notificarlos del cambio.',
      practicalEffects: [
        'El plazo es de 5 días hábiles (más corto que el derecho de acceso)',
        'La corrección debe propagarse a todos a quienes se cedieron los datos',
        'Los registros públicos deben corregir de oficio errores que conozcan',
      ],
      examples: [
        'Aparecer como deudor en Veraz habiendo pagado: pedís supresión y tienen 5 días hábiles para corregirlo',
        'Si Veraz ya cedió tu ficha a 3 bancos, también debe notificar la corrección a esos bancos',
      ],
      relatedArticles: ['art-25326-14', 'art-25326-33'],
      jurisprudence: [],
      regulations: [],
      keywords: ['rectificación', 'supresión', 'actualización', 'cinco días hábiles', 'habeas data'],
      order: 16,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-16-0',
          lawId: LAW_ID,
          articleId: 'art-25326-16',
          articleNumber: '16',
          segmentType: 'PARAGRAPH',
          originalText:
            'Toda persona tiene derecho a que sean rectificados, actualizados y, cuando corresponda, suprimidos o sometidos a confidencialidad los datos personales de los que sea titular, que estuvieren incluidos en un banco de datos.',
          plainExplanation:
            'El "derecho al olvido" argentino: podés pedir que borren tus datos cuando ya no son necesarios o son incorrectos. También podés pedir que los bloqueen (confidencialidad) en lugar de borrarlos.',
          practicalExample:
            'Una persona que tuvo una deuda hace 15 años puede pedir que se eliminen esos datos de informes crediticios.',
          references: [],
          order: 0,
        },
        {
          id: 'seg-25326-16-1',
          lawId: LAW_ID,
          articleId: 'art-25326-16',
          articleNumber: '16',
          segmentType: 'PARAGRAPH',
          originalText:
            'El responsable o usuario del banco de datos, debe proceder a la rectificación, supresión o actualización de los datos en el plazo máximo de cinco días hábiles de haber recibido la solicitud del titular de los mismos.',
          plainExplanation:
            'El plazo de 5 días hábiles es muy corto. Contá desde que reciben la nota: si el lunes reciben tu carta, el lunes siguiente (5 hábiles) ya debería estar corregido.',
          practicalExample:
            'Mandás nota el lunes 6. El martes 14 (8 días corridos ≈ 5 hábiles) deben haber corregido. De lo contrario, podés ir al juez.',
          references: [],
          order: 1,
        },
        {
          id: 'seg-25326-16-2',
          lawId: LAW_ID,
          articleId: 'art-25326-16',
          articleNumber: '16',
          segmentType: 'PARAGRAPH',
          originalText:
            'En el supuesto de cesión, o transferencia de datos, el responsable o usuario del banco de datos debe notificar la rectificación o supresión al cesionario dentro del quinto día hábil de efectuado el tratamiento del dato.',
          plainExplanation:
            'Si tus datos fueron compartidos con otras empresas, la corrección debe propagarse. El responsable tiene 5 días hábiles para avisar a todos los que recibieron tu información.',
          practicalExample:
            'Veraz corrigió tu ficha. Tiene 5 días hábiles para notificar a todos los bancos que consultaron esa información que hay un cambio.',
          references: [],
          order: 2,
        },
      ],
    },
    {
      id: 'art-25326-26',
      lawId: LAW_ID,
      number: '26',
      title: 'Prestación de servicios de información crediticia',
      originalText:
        '1. En la prestación de servicios de información crediticia sólo pueden tratarse datos personales de carácter patrimonial relativos a la solvencia económica y al crédito, obtenidos de fuentes accesibles al público o procedentes de informaciones facilitadas por el interesado o con su consentimiento.\n2. Pueden tratarse igualmente datos personales relativos al cumplimiento o incumplimiento de obligaciones de contenido patrimonial, facilitados por el acreedor o por quien actúe por su cuenta o interés.\n3. A solicitud del titular de los datos, el responsable del banco de datos le comunicará las informaciones, evaluaciones y apreciaciones que sobre el mismo hayan sido comunicadas durante los últimos seis meses, y el nombre y domicilio del cesionario en el supuesto de tratarse de datos obtenidos por cesión.\n4. Sólo se podrán archivar, registrar o ceder los datos personales que sean significativos para evaluar la solvencia económica-financiera de los afectados durante los últimos cinco años. Dicho plazo se reducirá a dos años cuando el deudor cancele o de otro modo extinga la obligación, debiéndose hacer constar dicho hecho.',
      currentText:
        '1. En la prestación de servicios de información crediticia sólo pueden tratarse datos personales de carácter patrimonial relativos a la solvencia económica y al crédito, obtenidos de fuentes accesibles al público o procedentes de informaciones facilitadas por el interesado o con su consentimiento.\n2. Pueden tratarse igualmente datos personales relativos al cumplimiento o incumplimiento de obligaciones de contenido patrimonial, facilitados por el acreedor o por quien actúe por su cuenta o interés.\n3. A solicitud del titular de los datos, el responsable del banco de datos le comunicará las informaciones, evaluaciones y apreciaciones que sobre el mismo hayan sido comunicadas durante los últimos seis meses, y el nombre y domicilio del cesionario en el supuesto de tratarse de datos obtenidos por cesión.\n4. Sólo se podrán archivar, registrar o ceder los datos personales que sean significativos para evaluar la solvencia económica-financiera de los afectados durante los últimos cinco años. Dicho plazo se reducirá a dos años cuando el deudor cancele o de otro modo extinga la obligación, debiéndose hacer constar dicho hecho.',
      plainLanguageExplanation:
        'Este artículo regula específicamente a Veraz, Nosis, Score y similares. Solo pueden guardar tu historial de deudas de los últimos 5 años. Si pagaste una deuda, el plazo se reduce a 2 años desde que la cancelaste. Podés pedirles que te digan qué informaron y a quién en los últimos 6 meses.',
      practicalEffects: [
        'Deudas viejas de más de 5 años deben ser borradas automáticamente',
        'Si pagaste, después de 2 años no pueden figurarte más como deudor',
        'Podés saber exactamente qué bancos o empresas consultaron tu historial crediticio',
      ],
      examples: [
        'Una deuda del 2018 que nunca pagaste debe desaparecer de Veraz en 2023 (5 años)',
        'Si pagaste en diciembre 2022, en diciembre 2024 deben eliminarte del registro',
        'Podés pedir la lista de todos los bancos que consultaron tu Veraz en los últimos 6 meses',
      ],
      relatedArticles: ['art-25326-14', 'art-25326-16'],
      jurisprudence: ['CNCiv - Macchi c/ BCRA (2003) - plazos de informes crediticios'],
      regulations: [],
      keywords: ['informes crediticios', 'Veraz', 'Nosis', 'deudas', 'cinco años', 'dos años', 'solvencia'],
      order: 26,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-26-0',
          lawId: LAW_ID,
          articleId: 'art-25326-26',
          articleNumber: '26',
          segmentType: 'PARAGRAPH',
          originalText:
            'Sólo se podrán archivar, registrar o ceder los datos personales que sean significativos para evaluar la solvencia económica-financiera de los afectados durante los últimos cinco años. Dicho plazo se reducirá a dos años cuando el deudor cancele o de otro modo extinga la obligación, debiéndose hacer constar dicho hecho.',
          plainExplanation:
            'Los plazos son taxativos: máximo 5 años para deudas impagas. Si pagaste la deuda, el dato debe borrarse a los 2 años de haber saldado.',
          practicalExample:
            'Tenías una deuda con Telecom desde 2019 y la pagaste en 2021. En 2023 Veraz ya no puede figurarte como deudor moroso.',
          references: [],
          order: 0,
        },
      ],
    },
    {
      id: 'art-25326-29',
      lawId: LAW_ID,
      number: '29',
      title: 'Dirección Nacional de Protección de Datos Personales',
      originalText:
        '1. El órgano de control de la presente ley estará representado por la Dirección Nacional de Protección de Datos Personales, organismo que actuará en el ámbito de la Secretaría de Justicia y Asuntos Legislativos del Ministerio de Justicia y Derechos Humanos de la Nación.\n2. La Dirección Nacional de Protección de Datos Personales tendrá las siguientes funciones:\na) Asistir y asesorar a las personas que lo requieran acerca de los alcances de la presente y los medios legales de que disponen para la defensa de los derechos que ésta garantiza;\nb) Dictar las normas y reglamentaciones que se deben observar en el desarrollo de las actividades comprendidas por esta ley;\nc) Realizar una auditoría anual de sistemas, a fin de evaluar los distintos archivos de datos existentes;\nd) Recibir y tramitar las denuncias y reclamos presentados por quienes se crean afectados en los derechos que la presente les garantiza;\ne) Llevar el registro de archivos y bases de datos previsto por el artículo 21 de la presente ley.',
      currentText:
        '1. El órgano de control de la presente ley estará representado por la Dirección Nacional de Protección de Datos Personales, organismo que actuará en el ámbito de la Secretaría de Justicia y Asuntos Legislativos del Ministerio de Justicia y Derechos Humanos de la Nación.\n2. La Dirección Nacional de Protección de Datos Personales tendrá las siguientes funciones:\na) Asistir y asesorar a las personas que lo requieran acerca de los alcances de la presente y los medios legales de que disponen para la defensa de los derechos que ésta garantiza;\nb) Dictar las normas y reglamentaciones que se deben observar en el desarrollo de las actividades comprendidas por esta ley;\nc) Realizar una auditoría anual de sistemas, a fin de evaluar los distintos archivos de datos existentes;\nd) Recibir y tramitar las denuncias y reclamos presentados por quienes se crean afectados en los derechos que la presente les garantiza;\ne) Llevar el registro de archivos y bases de datos previsto por el artículo 21 de la presente ley.',
      plainLanguageExplanation:
        'La DNPDP es el "árbitro" de la ley. Depende del Ministerio de Justicia y tiene varias funciones: asesorar ciudadanos, hacer auditorías anuales, recibir denuncias y llevar el registro de bases de datos. Si una empresa viola la ley, la DNPDP puede iniciar un sumario administrativo.',
      practicalEffects: [
        'La DNPDP es gratuita y pública: cualquier ciudadano puede hacer una consulta o denuncia',
        'Realiza auditorías anuales a bases de datos existentes',
        'Puede dictar resoluciones que aclaran cómo se aplica la ley',
      ],
      examples: [
        'Si una empresa no te borra de su base de datos, podés denunciarla ante la DNPDP antes de ir a la Justicia',
        'La DNPDP publicó disposiciones sobre cookies, apps móviles y transferencia internacional de datos',
      ],
      relatedArticles: ['art-25326-21', 'art-25326-31'],
      jurisprudence: [],
      regulations: ['Decreto 1558/2001 - art. 29'],
      keywords: ['DNPDP', 'órgano de control', 'auditoría', 'denuncias', 'Ministerio de Justicia'],
      order: 29,
      amendments: [],
      segments: [],
    },
    {
      id: 'art-25326-32',
      lawId: LAW_ID,
      number: '32',
      title: 'Sanciones penales',
      originalText:
        'Incorpóranse como artículos 117 bis y 157 bis del Código Penal los siguientes:\nArtículo 117 bis.\n1. Será reprimido con la pena de prisión de un mes a dos años el que insertara o hiciera insertar a sabiendas datos falsos en un archivo de datos personales.\n2. La pena será de seis meses a tres años, al que proporcionara a un tercero a sabiendas información falsa contenida en un archivo de datos personales.\n3. La escala penal se aumentará en la mitad del mínimo y del máximo, cuando del hecho se derive perjuicio a alguna persona.\nArtículo 157 bis. Será reprimido con la pena de prisión de un mes a dos años el que:\n1. A sabiendas e ilegítimamente, o violando sistemas de confidencialidad y seguridad de datos, accediere, de cualquier forma, a un banco de datos personales;\n2. Revelare a otro información registrada en un banco de datos personales cuyo secreto estuviere obligado a guardar conforme a la ley.',
      currentText:
        'Incorpóranse como artículos 117 bis y 157 bis del Código Penal los siguientes:\nArtículo 117 bis.\n1. Será reprimido con la pena de prisión de un mes a dos años el que insertara o hiciera insertar a sabiendas datos falsos en un archivo de datos personales.\n2. La pena será de seis meses a tres años, al que proporcionara a un tercero a sabiendas información falsa contenida en un archivo de datos personales.\n3. La escala penal se aumentará en la mitad del mínimo y del máximo, cuando del hecho se derive perjuicio a alguna persona.\nArtículo 157 bis. Será reprimido con la pena de prisión de un mes a dos años el que:\n1. A sabiendas e ilegítimamente, o violando sistemas de confidencialidad y seguridad de datos, accediere, de cualquier forma, a un banco de datos personales;\n2. Revelare a otro información registrada en un banco de datos personales cuyo secreto estuviere obligado a guardar conforme a la ley.',
      plainLanguageExplanation:
        'Además de las multas administrativas, la ley tipificó delitos penales en el Código Penal. Hay tres conductas que pueden llevar a la cárcel: insertar datos falsos en una base de datos, divulgar esos datos falsos, y acceder ilegítimamente a bases de datos (hacking). También va preso quien revela datos confidenciales de una base a la que tiene acceso por razones laborales.',
      practicalEffects: [
        'Un empleado que hackea la base de datos de su empresa puede ir preso de 1 mes a 2 años',
        'Quien carga datos falsos en Veraz para perjudicar a alguien comete un delito penal',
        'Quien filtra datos de empleados o clientes puede ser procesado penalmente',
      ],
      examples: [
        'Un exempleado que accede al sistema de la empresa con sus credenciales vencidas comete el delito del art. 157 bis',
        'Una empresa que carga como deudor a alguien que no debe, sabiendo que es falso, incurre en el art. 117 bis',
      ],
      relatedArticles: ['art-25326-10'],
      jurisprudence: [],
      regulations: [],
      keywords: ['sanciones penales', 'prisión', 'Código Penal', 'datos falsos', 'hacking', 'confidencialidad'],
      order: 32,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-32-1',
          lawId: LAW_ID,
          articleId: 'art-25326-32',
          articleNumber: '32',
          segmentType: 'PARAGRAPH',
          originalText: 'Artículo 117 bis.\n1. Será reprimido con la pena de prisión de un mes a dos años el que insertara o hiciera insertar a sabiendas datos falsos en un archivo de datos personales.\n2. La pena será de seis meses a tres años, al que proporcionara a un tercero a sabiendas información falsa contenida en un archivo de datos personales.\n3. La escala penal se aumentará en la mitad del mínimo y del máximo, cuando del hecho se derive perjuicio a alguna persona.',
          plainExplanation: 'La propia Ley 25.326 incorporó el art. 117 bis CP al Código Penal para penalizar la inserción de datos falsos en bases de datos. El que carga datos falsos a sabiendas va preso de 1 mes a 2 años. Si además le da esa información falsa a un tercero, la pena sube a 6 meses–3 años. Si la víctima sufre un perjuicio concreto, las penas aumentan 50%.',
          practicalExample: 'Una empresa de informes crediticios que carga una deuda ficticia en el perfil de un usuario, sabiendo que es falsa, comete el Art. 117 bis CP. Si además emite ese informe negativo a un banco, comete también el inciso 2.',
          references: ['Art. 117 bis CP'],
          order: 0,
        },
        {
          id: 'seg-25326-32-2',
          lawId: LAW_ID,
          articleId: 'art-25326-32',
          articleNumber: '32',
          segmentType: 'PARAGRAPH',
          originalText: 'Artículo 157 bis. Será reprimido con la pena de prisión de un mes a dos años el que:\n1. A sabiendas e ilegítimamente, o violando sistemas de confidencialidad y seguridad de datos, accediere, de cualquier forma, a un banco de datos personales;\n2. Revelare a otro información registrada en un banco de datos personales cuyo secreto estuviere obligado a guardar conforme a la ley.',
          plainExplanation: 'El art. 157 bis CP penaliza el acceso ilegítimo a bases de datos (hacking de datos personales) y la revelación de datos confidenciales por parte de quien estaba obligado a guardarlos. Ambas conductas tienen pena de 1 mes a 2 años de prisión.',
          practicalExample: 'Un técnico de sistemas que accede sin autorización a la base de datos de RRHH para ver los sueldos de sus compañeros comete el inciso 1. Un empleado de obra social que le cuenta a un familiar el diagnóstico de un paciente comete el inciso 2.',
          references: ['Art. 157 bis CP'],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-33',
      lawId: LAW_ID,
      number: '33',
      title: 'Procedencia del habeas data',
      originalText:
        '1. La acción de protección de los datos personales o de habeas data procederá:\na) Para tomar conocimiento de los datos personales almacenados en archivos, registros o bancos de datos públicos o privados destinados a proporcionar informes, y de la finalidad de aquellos;\nb) En los casos en que se presuma la falsedad, inexactitud, desactualización de la información de que se trate, o el tratamiento de datos cuyo registro se encuentra prohibido en la presente ley, para exigir su rectificación, supresión, confidencialidad o actualización.\n2. Al juez interviniente en una acción entablada en virtud de la presente ley le estará prohibido revelar la información obtenida o a obtenerse, ni divulgarla de ningún modo.',
      currentText:
        '1. La acción de protección de los datos personales o de habeas data procederá:\na) Para tomar conocimiento de los datos personales almacenados en archivos, registros o bancos de datos públicos o privados destinados a proporcionar informes, y de la finalidad de aquellos;\nb) En los casos en que se presuma la falsedad, inexactitud, desactualización de la información de que se trate, o el tratamiento de datos cuyo registro se encuentra prohibido en la presente ley, para exigir su rectificación, supresión, confidencialidad o actualización.\n2. Al juez interviniente en una acción entablada en virtud de la presente ley le estará prohibido revelar la información obtenida o a obtenerse, ni divulgarla de ningún modo.',
      plainLanguageExplanation:
        'El habeas data es la acción judicial que protege tus datos personales. Tiene dos variantes: el "habeas data informativo" (para saber qué datos tienen sobre vos) y el "habeas data rectificatorio/supresorio" (para corregir o borrar datos falsos, desactualizados o prohibidos). El juez tiene prohibido difundir la información que obtenga en el proceso.',
      practicalEffects: [
        'Es una acción rápida (sumaria) y gratuita para el titular de los datos',
        'Se puede iniciar sin necesidad de abogado en algunos tribunales',
        'El juez puede ordenar la corrección o supresión inmediata de los datos',
      ],
      examples: [
        'Aparecer en una base de datos de "terroristas" o "deudores" sin serlo: caso típico de habeas data rectificatorio',
        'Querer saber si organismos de inteligencia tienen información sobre vos: habeas data informativo',
      ],
      relatedArticles: ['art-25326-14', 'art-25326-16'],
      jurisprudence: ['CSJN - Urteaga c/ Estado Mayor - Fallos 321:2947 (1998)'],
      regulations: [],
      keywords: ['habeas data', 'acción judicial', 'rectificación', 'supresión', 'informativo', 'procedencia'],
      order: 33,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-33-0',
          lawId: LAW_ID,
          articleId: 'art-25326-33',
          articleNumber: '33',
          segmentType: 'INCISO',
          originalText:
            'a) Para tomar conocimiento de los datos personales almacenados en archivos, registros o bancos de datos públicos o privados destinados a proporcionar informes, y de la finalidad de aquellos...',
          plainExplanation:
            'Habeas data informativo: sirve para preguntarle al juez que ordene a una base de datos que te informe qué datos tiene sobre vos. Útil cuando la empresa no respondió extrajudicialmente.',
          practicalExample:
            'Sospechás que el PAMI tiene datos erróneos sobre tu historia médica y no te los mostraron. Pedís habeas data informativo y el juez los obliga a informar.',
          references: ['Art. 14'],
          order: 0,
        },
        {
          id: 'seg-25326-33-1',
          lawId: LAW_ID,
          articleId: 'art-25326-33',
          articleNumber: '33',
          segmentType: 'INCISO',
          originalText:
            'b) En los casos en que se presuma la falsedad, inexactitud, desactualización de la información de que se trate, o el tratamiento de datos cuyo registro se encuentra prohibido en la presente ley, para exigir su rectificación, supresión, confidencialidad o actualización.',
          plainExplanation:
            'Habeas data rectificatorio: sirve para corregir o eliminar datos incorrectos. Basta con "presumir" la falsedad, no hay que probarla definitivamente para iniciar la acción.',
          practicalExample:
            'Aparecés en el Registro de Deudores del BCRA pero nunca tuviste créditos. Pedís habeas data y el juez puede ordenar la corrección preventiva mientras se investiga.',
          references: ['Art. 16'],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-8',
      lawId: LAW_ID,
      number: '8',
      title: 'Datos sensibles',
      originalText:
        'ARTICULO 8° — Queda prohibida la formación de archivos, bancos o registros que almacenen información que directa o indirectamente revele datos sensibles. Las instituciones religiosas y las asociaciones políticas, sindicales, profesionales y similares podrán llevar un registro de sus miembros.',
      currentText:
        'ARTICULO 8° — Queda prohibida la formación de archivos, bancos o registros que almacenen información que directa o indirectamente revele datos sensibles. Las instituciones religiosas y las asociaciones políticas, sindicales, profesionales y similares podrán llevar un registro de sus miembros.',
      plainLanguageExplanation:
        'Está prohibido crear bases de datos que contengan datos sensibles (origen racial, opiniones políticas, creencias religiosas, salud, vida sexual, etc.). La única excepción son las organizaciones religiosas, políticas, sindicales y profesionales para sus propios miembros.',
      practicalEffects: [
        'Ninguna empresa puede crear una base de datos que registre la religión o las opiniones políticas de sus clientes.',
        'Un partido político puede registrar a sus afiliados (incluyendo su orientación política) porque cae en la excepción.',
        'Una empresa de salud sólo puede registrar datos de salud con consentimiento expreso y para fines médicos (art. 7).',
      ],
      examples: [
        'Una aseguradora que crea un registro de clientes con su credo religioso viola este artículo.',
        'Un sindicato que lleva un padrón de sus afiliados (que implica conocer su afiliación sindical) está dentro de la excepción legal.',
      ],
      relatedArticles: ['art-25326-2', 'art-25326-7'],
      jurisprudence: [],
      regulations: [],
      keywords: ['datos sensibles', 'prohibición', 'archivos', 'sindicatos', 'religión', 'política'],
      order: 8,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-8-1',
          lawId: LAW_ID,
          articleId: 'art-25326-8',
          articleNumber: '8',
          segmentType: 'PARAGRAPH',
          originalText:
            'Queda prohibida la formación de archivos, bancos o registros que almacenen información que directa o indirectamente revele datos sensibles. Las instituciones religiosas y las asociaciones políticas, sindicales, profesionales y similares podrán llevar un registro de sus miembros.',
          plainExplanation: 'Prohibición de crear bases de datos con datos sensibles; excepción para organizaciones que registran a sus propios miembros.',
          practicalExample:
            'Un supermercado que en su programa de fidelidad pregunta la religión del cliente viola este artículo; una iglesia que lleva padrón de feligreses está dentro de la excepción.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-11',
      lawId: LAW_ID,
      number: '11',
      title: 'Cesión',
      originalText:
        'ARTICULO 11. — 1. Los datos personales objeto de tratamiento sólo pueden ser cedidos para el cumplimiento de los fines directamente relacionados con el interés legítimo del cedente y del cesionario y con el previo consentimiento del titular de los datos, al que se le debe informar sobre la finalidad de la cesión e identificar al cesionario o los elementos que permitan hacerlo. 2. El consentimiento para la cesión es revocable. 3. El consentimiento no es requerido cuando: a) Así lo disponga una ley; b) En los supuestos previstos en el artículo 5° inciso 2; c) Se realice entre dependencias de los órganos del Estado en forma directa, en la medida del cumplimiento de sus respectivas competencias; d) Se trate de datos personales relativos a la salud, y sea necesario por razones de salud pública, de emergencia o para la realización de estudios epidemiológicos, en tanto se preserven los datos identificatorios del titular mediante mecanismos de disociación adecuados; e) Se hubiera aplicado un procedimiento de disociación de la información.',
      currentText:
        'Los datos personales objeto de tratamiento sólo pueden ser cedidos para el cumplimiento de los fines directamente relacionados con el interés legítimo del cedente y del cesionario y con el previo consentimiento del titular de los datos. El consentimiento para la cesión es revocable. El consentimiento no es requerido cuando así lo disponga una ley, en los supuestos del art. 5.2, entre dependencias estatales, para datos de salud por razones de salud pública con disociación, o cuando se aplique disociación.',
      plainLanguageExplanation:
        'Los datos personales sólo pueden cederse a terceros con el consentimiento del titular, informándole para qué y a quién. El consentimiento puede revocarse en cualquier momento. Hay excepciones: cesión por ley, entre organismos del Estado con competencia, o para estudios epidemiológicos con datos disociados.',
      practicalEffects: [
        'Una empresa no puede vender su base de clientes a otra empresa sin el consentimiento de cada cliente.',
        'El banco puede compartir datos con organismos reguladores (BCRA) sin consentimiento porque lo ordena la ley.',
        'Un hospital puede ceder datos disociados para estudios de salud pública sin consentimiento individual.',
      ],
      examples: [
        'Una empresa de seguros que vende su base de datos de clientes a otra aseguradora sin consentimiento viola este artículo.',
        'Un organismo de salud que comparte estadísticas epidemiológicas anonimizadas está dentro de la excepción del inciso d).',
      ],
      relatedArticles: ['art-25326-5', 'art-25326-6', 'art-25326-12'],
      jurisprudence: [],
      regulations: [],
      keywords: ['cesión de datos', 'consentimiento', 'terceros', 'revocable', 'disociación'],
      order: 11,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-11-1',
          lawId: LAW_ID,
          articleId: 'art-25326-11',
          articleNumber: '11',
          segmentType: 'PARAGRAPH',
          originalText:
            'Los datos personales objeto de tratamiento sólo pueden ser cedidos para el cumplimiento de los fines directamente relacionados con el interés legítimo del cedente y del cesionario y con el previo consentimiento del titular de los datos, al que se le debe informar sobre la finalidad de la cesión e identificar al cesionario.',
          plainExplanation: 'Los datos sólo pueden cederse a terceros con consentimiento del titular, informando el propósito y el destinatario.',
          practicalExample:
            'Una tienda online que quiere compartir datos de clientes con su subsidiaria de marketing debe obtener el consentimiento expreso de cada cliente, informando qué datos comparte y para qué.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-12',
      lawId: LAW_ID,
      number: '12',
      title: 'Transferencia internacional',
      originalText:
        'ARTICULO 12. — 1. Es prohibida la transferencia de datos personales de cualquier tipo con países u organismos internacionales o supranacionales, que no proporcionen niveles de protección adecuados. 2. La prohibición no regirá en los siguientes supuestos: a) Colaboración judicial internacional; b) Intercambio de datos de carácter médico, cuando así lo exija el tratamiento del afectado, o una investigación epidemiológica; c) Transferencias bancarias o bursátiles, en lo relativo a las transacciones respectivas y conforme las leyes que les resulten aplicables; d) Cuando la transferencia se hubiera acordado en el marco de tratados internacionales en los cuales la República Argentina sea parte; e) Cuando la transferencia tenga por objeto la cooperación internacional entre organismos de inteligencia para la lucha contra el crimen organizado, el terrorismo y el narcotráfico.',
      currentText:
        'Es prohibida la transferencia de datos personales a países u organismos internacionales que no proporcionen niveles de protección adecuados. La prohibición no rige para colaboración judicial, datos médicos necesarios, transferencias bancarias/bursátiles, tratados internacionales, o cooperación de inteligencia contra crimen organizado.',
      plainLanguageExplanation:
        'Está prohibido enviar datos personales a países que no tengan un nivel de protección de datos similar al argentino. Las excepciones son: colaboración judicial, salud, banca y bolsa, tratados internacionales, y cooperación antiterrorista.',
      practicalEffects: [
        'Una empresa argentina que envía datos de clientes a un servidor en un país sin ley de protección de datos viola este artículo.',
        'Las transferencias a países con protección adecuada (como la UE con el GDPR) están permitidas.',
        'Los servicios cloud internacionales deben garantizar niveles de protección equivalentes.',
      ],
      examples: [
        'Una empresa que usa un CRM en servidores en un país sin legislación de protección de datos debe verificar que haya niveles adecuados de protección.',
        'Las transferencias bancarias SWIFT tienen excepción explícita bajo el inciso c).',
      ],
      relatedArticles: ['art-25326-11'],
      jurisprudence: [],
      regulations: ['Disposición DNPDP 7/2005 (países con protección adecuada)'],
      keywords: ['transferencia internacional', 'protección adecuada', 'países', 'GDPR', 'cloud'],
      order: 12,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-12-1',
          lawId: LAW_ID,
          articleId: 'art-25326-12',
          articleNumber: '12',
          segmentType: 'PARAGRAPH',
          originalText:
            'Es prohibida la transferencia de datos personales de cualquier tipo con países u organismos internacionales o supranacionales, que no proporcionen niveles de protección adecuados.',
          plainExplanation: 'Prohibición de enviar datos a países sin protección adecuada.',
          practicalExample:
            'Una startup argentina que sube sus datos de usuarios a un servidor en un país con baja protección de datos debe evaluar si cumple con los niveles de protección requeridos.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-13',
      lawId: LAW_ID,
      number: '13',
      title: 'Secreto profesional',
      originalText:
        'ARTICULO 13. — El responsable y las personas que intervengan en cualquier fase del tratamiento de datos personales están obligados al secreto profesional respecto de los mismos. Tal obligación subsistirá aun después de finalizada la relación con el titular del archivo de datos.',
      currentText:
        'El responsable y las personas que intervengan en cualquier fase del tratamiento de datos personales están obligados al secreto profesional respecto de los mismos. Tal obligación subsistirá aun después de finalizada la relación con el titular del archivo de datos.',
      plainLanguageExplanation:
        'Todas las personas que trabajan con datos personales (no sólo el responsable del archivo, sino también empleados, consultores, proveedores) tienen obligación de secreto profesional. Esta obligación no termina cuando dejan de trabajar con esos datos.',
      practicalEffects: [
        'Un empleado que accede a bases de datos de clientes sigue obligado al secreto aunque renuncie.',
        'Los proveedores de servicios de IT que procesan datos también están alcanzados.',
        'Violar el secreto puede generar responsabilidad civil y penal (art. 157 bis CP).',
      ],
      examples: [
        'Un analista que trabaja con datos de salud de una empresa de medicina prepaga y luego va a otra empresa no puede revelar los datos que conoció en su empleo anterior.',
        'Un consultor de IT externo que accede a la base de datos de clientes queda obligado al secreto aunque su contrato haya terminado.',
      ],
      relatedArticles: ['art-25326-9', 'art-25326-32'],
      jurisprudence: [],
      regulations: [],
      keywords: ['secreto profesional', 'confidencialidad', 'empleados', 'consultores', 'perpetuo'],
      order: 13,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-13-1',
          lawId: LAW_ID,
          articleId: 'art-25326-13',
          articleNumber: '13',
          segmentType: 'PARAGRAPH',
          originalText:
            'El responsable y las personas que intervengan en cualquier fase del tratamiento de datos personales están obligados al secreto profesional respecto de los mismos. Tal obligación subsistirá aun después de finalizada la relación con el titular del archivo de datos.',
          plainExplanation: 'El secreto sobre datos personales es permanente y aplica a todos quienes los tratan, incluso ex-empleados.',
          practicalExample:
            'Un ex-empleado de un banco que filtró datos de clientes a un competidor viola este artículo aunque ya no trabaje allí.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-15',
      lawId: LAW_ID,
      number: '15',
      title: 'Control. Calidad de los datos. Actualización',
      originalText:
        'ARTICULO 15. — 1. Los responsables de archivos de datos deben adoptar las medidas técnicas y organizativas necesarias para garantizar la seguridad y confidencialidad de los datos personales, de modo de evitar su adulteración, pérdida, consulta o tratamiento no autorizado, y que permitan detectar desviaciones, intencionales o no, de información, ya sea que los riesgos provengan de la acción humana o del medio técnico utilizado. 2. Queda prohibido registrar datos personales en archivos, registros o bancos que no reúnan condiciones técnicas de integridad y seguridad. 3. La DNPDP establecerá los requisitos de integridad y seguridad de conformidad con los estándares internacionales.',
      currentText:
        'Los responsables de archivos deben adoptar medidas técnicas y organizativas para garantizar la seguridad y confidencialidad de los datos personales, evitando adulteración, pérdida, consulta o tratamiento no autorizado. Está prohibido registrar datos en archivos que no reúnan condiciones técnicas de integridad y seguridad.',
      plainLanguageExplanation:
        'Quienes tienen bases de datos deben implementar medidas de seguridad técnicas y organizativas. No se pueden usar sistemas o bases de datos que no cumplan los estándares de seguridad. La autoridad (DNPDP) establece los requisitos mínimos según estándares internacionales.',
      practicalEffects: [
        'Las empresas deben tener políticas de seguridad de la información para los datos personales.',
        'Usar sistemas obsoletos sin cifrado o sin control de acceso puede ser una infracción.',
        'En caso de incidente de seguridad, la falta de medidas agrava la responsabilidad.',
      ],
      examples: [
        'Una empresa que almacena datos de tarjetas de crédito en texto plano sin cifrar viola este artículo.',
        'Un sistema de historias clínicas sin control de acceso (cualquier empleado puede ver cualquier paciente) no reúne condiciones de seguridad.',
      ],
      relatedArticles: ['art-25326-9', 'art-25326-14'],
      jurisprudence: [],
      regulations: ['Disposición DNPDP 11/2006 (medidas de seguridad)'],
      keywords: ['seguridad de datos', 'medidas técnicas', 'confidencialidad', 'integridad', 'cifrado'],
      order: 15,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-15-1',
          lawId: LAW_ID,
          articleId: 'art-25326-15',
          articleNumber: '15',
          segmentType: 'PARAGRAPH',
          originalText:
            'Los responsables de archivos de datos deben adoptar las medidas técnicas y organizativas necesarias para garantizar la seguridad y confidencialidad de los datos personales, de modo de evitar su adulteración, pérdida, consulta o tratamiento no autorizado.',
          plainExplanation: 'Los responsables de bases de datos deben implementar medidas de seguridad técnicas y organizativas.',
          practicalExample:
            'Una empresa de e-commerce debe cifrar las contraseñas, limitar el acceso a datos de clientes por roles, y hacer backups seguros para cumplir este artículo.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-17',
      lawId: LAW_ID,
      number: '17',
      title: 'Excepciones',
      originalText:
        'ARTICULO 17. — 1. Los responsables de bancos de datos públicos pueden, mediante decisión fundada, denegar el acceso, la rectificación o la supresión en función de la protección de la defensa de la Nación, del orden y la seguridad pública, o de la protección de los derechos e intereses de terceros. 2. La información sobre datos personales también puede ser denegada por los responsables de bancos de datos públicos, cuando de tal modo se pudieran obstaculizar actuaciones judiciales o administrativas en curso vinculadas a la investigación sobre el cumplimiento de obligaciones tributarias o previsionales, el desarrollo de funciones de control de la salud y del medio ambiente, la investigación y persecución de infracciones penales y la verificación de infracciones administrativas. 3. La resolución que así lo disponga debe ser fundada y notificada al afectado.',
      currentText:
        'Los responsables de bases de datos públicas pueden denegar el acceso, rectificación o supresión de datos cuando sea necesario para: defensa nacional, seguridad pública, protección de terceros, investigaciones judiciales en curso (impuestos, salud, penal, administrativo). La resolución debe ser fundada y notificada.',
      plainLanguageExplanation:
        'Los organismos públicos pueden negarle al ciudadano el acceso o corrección de sus datos cuando hay razones de seguridad nacional, investigaciones judiciales en curso, o protección de terceros. Pero deben comunicar la denegación de forma fundada.',
      practicalEffects: [
        'La AFIP puede negarte ver tus datos si hay una investigación fiscal en curso.',
        'La denegación debe ser por escrito y explicar el motivo (aunque sea genérico por razones de seguridad).',
        'La persona puede impugnar judicialmente la denegación mediante habeas data.',
      ],
      examples: [
        'El Ministerio de Seguridad puede denegar el acceso a datos de inteligencia sobre una persona si divulgarlos afecta la seguridad pública.',
        'La AFIP puede negar mostrar datos de una investigación fiscal en curso para no entorpecerla.',
      ],
      relatedArticles: ['art-25326-14', 'art-25326-16', 'art-25326-33'],
      jurisprudence: [],
      regulations: [],
      keywords: ['excepciones', 'denegación', 'seguridad nacional', 'investigación judicial', 'bases de datos públicas'],
      order: 17,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-17-1',
          lawId: LAW_ID,
          articleId: 'art-25326-17',
          articleNumber: '17',
          segmentType: 'PARAGRAPH',
          originalText:
            'Los responsables de bancos de datos públicos pueden, mediante decisión fundada, denegar el acceso, la rectificación o la supresión en función de la protección de la defensa de la Nación, del orden y la seguridad pública, o de la protección de los derechos e intereses de terceros.',
          plainExplanation: 'Los organismos públicos pueden denegar acceso a datos por razones de seguridad nacional o investigaciones en curso, pero deben fundarlo.',
          practicalExample:
            'El Ministerio de Justicia puede denegar el acceso a datos de una persona investigada por tráfico de drogas si hacerlo podría entorpecer la investigación.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-18',
      lawId: LAW_ID,
      number: '18',
      title: 'Archivos de seguridad',
      originalText:
        'ARTICULO 18. — Los responsables de archivos de datos personales que actúen con fines de seguridad, defensa, inteligencia del Estado, o persecución de infracciones penales, estarán excluidos de las disposiciones contenidas en los capítulos II, III y IV de esta ley. Queda a salvo la posibilidad de iniciar una acción de habeas data.',
      currentText:
        'Los responsables de archivos de datos que actúen con fines de seguridad, defensa, inteligencia del Estado, o persecución de infracciones penales están excluidos de los capítulos II, III y IV de esta ley. La acción de habeas data sigue siendo posible.',
      plainLanguageExplanation:
        'Las bases de datos de organismos de seguridad e inteligencia (SIDE, PFA, Gendarmería, etc.) están exentas de las reglas de acceso, rectificación y baja de datos. Sin embargo, cualquier persona puede iniciar una acción de habeas data judicial contra esos organismos.',
      practicalEffects: [
        'Los archivos de inteligencia no están obligados a responder pedidos de acceso extrajudicial.',
        'El habeas data judicial sigue siendo el mecanismo disponible para acceder a esos datos.',
        'Esta excepción es polémica y ha sido cuestionada en casos de violaciones de derechos humanos.',
      ],
      examples: [
        'Una persona que sospecha que la AFI (ex SIDE) tiene un archivo sobre ella no puede pedir acceso directamente: debe iniciar habeas data judicial.',
      ],
      relatedArticles: ['art-25326-17', 'art-25326-33'],
      jurisprudence: ['CSJN - Urteaga c/ Estado Mayor - Fallos 321:2947 (1998) — límites al habeas data frente a archivos de seguridad'],
      regulations: [],
      keywords: ['seguridad del Estado', 'inteligencia', 'excepción', 'habeas data', 'archivos policiales'],
      order: 18,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-18-1',
          lawId: LAW_ID,
          articleId: 'art-25326-18',
          articleNumber: '18',
          segmentType: 'PARAGRAPH',
          originalText:
            'Los responsables de archivos de datos personales que actúen con fines de seguridad, defensa, inteligencia del Estado, o persecución de infracciones penales, estarán excluidos de las disposiciones contenidas en los capítulos II, III y IV de esta ley. Queda a salvo la posibilidad de iniciar una acción de habeas data.',
          plainExplanation: 'Los archivos de seguridad e inteligencia están exentos de acceso extrajudicial pero el habeas data judicial sigue disponible.',
          practicalExample:
            'Si alguien cree que tiene un legajo en la Policía Federal, no puede pedirlo directamente por el art. 14: debe iniciar habeas data ante la justicia federal.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-19',
      lawId: LAW_ID,
      number: '19',
      title: 'Registros de acceso restringido',
      originalText:
        'ARTICULO 19. — Las normas de los capítulos I y II de la presente ley se aplicarán a los registros que contengan datos personales destinados a ser utilizados con fines estadísticos, científicos o de investigación, siempre y cuando no se puedan identificar a los titulares de los datos.',
      currentText:
        'Las normas de los capítulos I y II de esta ley se aplican a los registros estadísticos, científicos o de investigación, siempre que no sea posible identificar a los titulares de los datos.',
      plainLanguageExplanation:
        'Los datos usados con fines estadísticos, científicos o de investigación están protegidos por los capítulos I y II de la ley, pero sólo cuando los titulares puedan ser identificados. Si los datos están efectivamente disociados (anónimos), las protecciones plenas no aplican.',
      practicalEffects: [
        'Los datos de investigación anónimos están menos sujetos a restricciones.',
        'Si los datos de investigación permiten reidentificar a personas, se aplican todas las protecciones.',
        'El INDEC y los centros de investigación académica pueden usar datos con menos restricciones si aseguran la anonimización.',
      ],
      examples: [
        'Una encuesta del INDEC que no permite identificar a los encuestados está dentro de las excepciones.',
        'Un estudio médico que usa datos de pacientes con nombre y número de documento sí está sujeto a todas las protecciones de la ley.',
      ],
      relatedArticles: ['art-25326-2', 'art-25326-3'],
      jurisprudence: [],
      regulations: [],
      keywords: ['estadísticas', 'investigación científica', 'disociación', 'anonimización', 'INDEC'],
      order: 19,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-19-1',
          lawId: LAW_ID,
          articleId: 'art-25326-19',
          articleNumber: '19',
          segmentType: 'PARAGRAPH',
          originalText:
            'Las normas de los capítulos I y II de la presente ley se aplicarán a los registros que contengan datos personales destinados a ser utilizados con fines estadísticos, científicos o de investigación, siempre y cuando no se puedan identificar a los titulares de los datos.',
          plainExplanation: 'Los datos estadísticos y de investigación están protegidos si permiten identificar personas; si son anónimos, tienen menos restricciones.',
          practicalExample:
            'Una base de datos de investigación universitaria con nombres de pacientes requiere consentimiento y protección plena; si los nombres están eliminados, opera con menores restricciones.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-20',
      lawId: LAW_ID,
      number: '20',
      title: 'Prestación de servicios de información crediticia',
      originalText:
        'ARTICULO 20. — 1. En la prestación de servicios de información crediticia sólo pueden tratarse datos personales de carácter patrimonial relativos a la solvencia económica y al crédito, obtenidos de fuentes accesibles al público o procedentes de informaciones facilitadas por el interesado o con su consentimiento. 2. Pueden tratarse igualmente datos personales relativos al cumplimiento o incumplimiento de obligaciones de contenido patrimonial, facilitados por el acreedor o por quien actúe por su cuenta o interés. 3. A solicitud del titular de los datos, el responsable del banco de datos le comunicará las informaciones, evaluaciones y apreciaciones que sobre el mismo hayan sido comunicadas durante los últimos seis meses y el nombre y domicilio del cesionario en el supuesto de tratarse de datos obtenidos por cesión. 4. Sólo se podrán archivar, registrar o ceder los datos personales que sean significativos para evaluar la solvencia económico-financiera de los afectados durante los últimos cinco años. Dicho plazo se reducirá a dos años cuando el deudor cancele o de otro modo extinga la obligación, debiéndose hacer constar dicho hecho.',
      currentText:
        'En información crediticia sólo pueden tratarse datos patrimoniales de fuentes públicas o con consentimiento. Los datos de incumplimiento pueden ser aportados por el acreedor. El titular puede pedir qué datos se informaron en los últimos 6 meses. Los datos pueden archivarse por 5 años máximo; 2 años si se cancela la deuda.',
      plainLanguageExplanation:
        'Las empresas de informes crediticios (como Veraz, Nosis, Equifax) sólo pueden usar datos económicos de fuentes públicas o con tu consentimiento. Un acreedor puede reportar tu deuda. Tenés derecho a saber qué datos se informaron en los últimos 6 meses. Los datos de mora permanecen por 5 años máximo (2 años si cancelaste la deuda).',
      practicalEffects: [
        'Una mora de 2016 ya no puede aparecer en el Veraz en 2022 (superó los 5 años).',
        'Si cancelás una deuda, a los 2 años ya no puede aparecer en el historial crediticio.',
        'Podés pedir gratuitamente el informe de lo que informaron sobre vos en los últimos 6 meses.',
        'El banco puede reportarte como moroso sin necesitar tu consentimiento.',
      ],
      examples: [
        'Una persona que canceló una deuda de tarjeta de crédito puede exigir que la eliminen del Veraz a los 2 años de la cancelación.',
        'Una empresa de informes crediticios que mantiene una deuda de 2015 en sus registros en 2024 viola el plazo de 5 años de este artículo.',
      ],
      relatedArticles: ['art-25326-14', 'art-25326-26'],
      jurisprudence: [],
      regulations: [],
      keywords: ['informes crediticios', 'Veraz', 'cinco años', 'dos años', 'morosidad', 'solvencia'],
      order: 20,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-20-1',
          lawId: LAW_ID,
          articleId: 'art-25326-20',
          articleNumber: '20',
          segmentType: 'PARAGRAPH',
          originalText:
            'En la prestación de servicios de información crediticia sólo pueden tratarse datos personales de carácter patrimonial relativos a la solvencia económica y al crédito, obtenidos de fuentes accesibles al público o procedentes de informaciones facilitadas por el interesado o con su consentimiento.',
          plainExplanation: 'Las empresas de informes crediticios sólo pueden usar datos patrimoniales de fuentes públicas o con consentimiento.',
          practicalExample:
            'El Veraz puede tomar datos de deudas reportadas por bancos (que actúan como acreedores) pero no puede incorporar datos de tu cuenta bancaria sin tu consentimiento.',
          references: [],
          order: 1,
        },
        {
          id: 'seg-25326-20-2',
          lawId: LAW_ID,
          articleId: 'art-25326-20',
          articleNumber: '20',
          segmentType: 'PARAGRAPH',
          originalText:
            'Sólo se podrán archivar, registrar o ceder los datos personales que sean significativos para evaluar la solvencia económico-financiera de los afectados durante los últimos cinco años. Dicho plazo se reducirá a dos años cuando el deudor cancele o de otro modo extinga la obligación.',
          plainExplanation: 'Los datos de mora sólo pueden conservarse 5 años; 2 años si se canceló la deuda.',
          practicalExample:
            'Una persona que fue mora en 2019 y nunca canceló puede aparecer en el Veraz hasta 2024; si canceló en 2020, puede aparecer sólo hasta 2022.',
          references: [],
          order: 2,
        },
      ],
    },
    {
      id: 'art-25326-21',
      lawId: LAW_ID,
      number: '21',
      title: 'Prestación de servicios de información crediticia — datos de salud',
      originalText:
        'ARTICULO 21. — Los datos de salud sólo podrán ser cedidos, en los términos previstos en la presente ley, cuando medien razones de salud pública, de emergencia o para la realización de estudios epidemiológicos, siempre que se preserven los datos identificatorios del titular mediante mecanismos de disociación adecuados.',
      currentText:
        'Los datos de salud sólo podrán cederse cuando medien razones de salud pública, emergencia o estudios epidemiológicos, preservando los datos identificatorios mediante disociación adecuada.',
      plainLanguageExplanation:
        'Los datos de salud son datos sensibles con protección reforzada: sólo pueden cederse para salud pública, emergencias o estudios epidemiológicos, y siempre con anonimización.',
      practicalEffects: [
        'Un hospital no puede ceder historias clínicas identificadas a una compañía de seguros.',
        'Una obra social puede compartir estadísticas de enfermedades anonimizadas con el Ministerio de Salud.',
      ],
      examples: [
        'El INDEC puede usar datos de salud anonimizados para la Encuesta Nacional de Salud; compartir esos datos con nombres de pacientes viola este artículo.',
      ],
      relatedArticles: ['art-25326-7', 'art-25326-11'],
      jurisprudence: [],
      regulations: [],
      keywords: ['datos de salud', 'cesión', 'epidemiología', 'disociación', 'salud pública'],
      order: 21,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-21-1',
          lawId: LAW_ID,
          articleId: 'art-25326-21',
          articleNumber: '21',
          segmentType: 'PARAGRAPH',
          originalText:
            'Los datos de salud sólo podrán ser cedidos cuando medien razones de salud pública, de emergencia o para la realización de estudios epidemiológicos, siempre que se preserven los datos identificatorios mediante mecanismos de disociación adecuados.',
          plainExplanation: 'Los datos de salud sólo pueden cederse para fines de salud pública y con anonimización.',
          practicalExample:
            'Una prepaga puede ceder datos de diagnósticos al Ministerio de Salud para estudios epidemiológicos, pero sólo si los datos no permiten identificar al paciente.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-22',
      lawId: LAW_ID,
      number: '22',
      title: 'Archivos, registros o bancos de datos públicos',
      originalText:
        'ARTICULO 22. — 1. Las normas del presente capítulo se aplicarán a los archivos de datos personales de los organismos públicos con las siguientes modificaciones: a) La reglamentación establecerá el procedimiento específico para que el responsable del archivo informe sobre la existencia y finalidad del mismo. b) Los responsables de los archivos de datos dependientes de los organismos públicos comunicarán a la autoridad de aplicación la existencia de esos archivos. 2. Cuando por la índole de la información que tuvieran registrada en sus archivos, los organismos públicos estuvieran alcanzados por las excepciones previstas en el artículo 17, las disposiciones de este capítulo les serán de aplicación en la medida en que no obsten al cumplimiento de sus funciones específicas.',
      currentText:
        'Las normas del capítulo se aplican a archivos públicos con modificaciones: los responsables deben registrar el archivo ante la autoridad de aplicación. Si están alcanzados por las excepciones del art. 17, las normas aplican sólo en la medida en que no obstaculicen sus funciones.',
      plainLanguageExplanation:
        'Los organismos del Estado también están sometidos a la ley de datos personales, con algunas adaptaciones. Deben registrar sus bases de datos ante la autoridad. Si tienen excepciones por razones de seguridad (art. 17), las normas aplican en la medida posible.',
      practicalEffects: [
        'Un ministerio que tiene una base de datos de ciudadanos debe registrarla ante la DNPDP.',
        'Los organismos de seguridad con excepciones del art. 17 cumplen las normas sólo en lo que no afecte sus funciones.',
      ],
      examples: [
        'El Ministerio de Trabajo debe registrar ante la DNPDP su base de datos de beneficiarios de planes sociales.',
      ],
      relatedArticles: ['art-25326-17', 'art-25326-3'],
      jurisprudence: [],
      regulations: [],
      keywords: ['archivos públicos', 'organismos del Estado', 'registro', 'DNPDP'],
      order: 22,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-22-1',
          lawId: LAW_ID,
          articleId: 'art-25326-22',
          articleNumber: '22',
          segmentType: 'PARAGRAPH',
          originalText:
            'Las normas del presente capítulo se aplicarán a los archivos de datos personales de los organismos públicos. Los responsables de los archivos de datos dependientes de organismos públicos comunicarán a la autoridad de aplicación la existencia de esos archivos.',
          plainExplanation: 'Los organismos públicos también deben cumplir la ley de datos y registrar sus bases ante la DNPDP.',
          practicalExample:
            'El ANSES debe tener registrada ante la DNPDP su base de datos de jubilados y beneficiarios de asignaciones.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-23',
      lawId: LAW_ID,
      number: '23',
      title: 'Responsabilidad',
      originalText:
        'ARTICULO 23. — 1. El responsable del archivo de datos responderá por los daños y perjuicios que cause al titular de los datos como consecuencia del incumplimiento de las obligaciones previstas en la presente ley. 2. El responsable se eximirá de responsabilidad cuando demuestre que existió causa ajena que le impidió cumplirlas. 3. En materia de daños derivados del tratamiento de datos personales, los jueces podrán aplicar el Código Civil y Comercial de la Nación y las disposiciones de esta ley.',
      currentText:
        'El responsable del archivo responde por los daños causados al titular por incumplimiento de la ley. Se exime si demuestra causa ajena. Los jueces pueden aplicar el CCyC.',
      plainLanguageExplanation:
        'El responsable del archivo de datos es responsable civil por los daños que cause a las personas cuyos datos trata. Para eximirse, debe probar que fue una causa ajena (hecho de tercero, caso fortuito). Los jueces aplican la ley de datos y el Código Civil y Comercial.',
      practicalEffects: [
        'Si una empresa filtra datos de clientes por negligencia, responde civilmente por todos los daños causados.',
        'La empresa debe probar que el daño se debió a una causa ajena para liberarse.',
        'Los afectados pueden reclamar daño moral además del daño material.',
      ],
      examples: [
        'Una empresa de e-commerce que sufre un hackeo por no haber implementado medidas de seguridad básicas responde por los daños a los clientes afectados.',
      ],
      relatedArticles: ['art-25326-15', 'art-25326-31'],
      jurisprudence: [],
      regulations: [],
      keywords: ['responsabilidad civil', 'daños y perjuicios', 'causa ajena', 'titular de datos'],
      order: 23,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-23-1',
          lawId: LAW_ID,
          articleId: 'art-25326-23',
          articleNumber: '23',
          segmentType: 'PARAGRAPH',
          originalText:
            'El responsable del archivo de datos responderá por los daños y perjuicios que cause al titular de los datos como consecuencia del incumplimiento de las obligaciones previstas en la presente ley. El responsable se eximirá de responsabilidad cuando demuestre que existió causa ajena que le impidió cumplirlas.',
          plainExplanation: 'El responsable del archivo responde civilmente por daños; sólo se exime probando causa ajena.',
          practicalExample:
            'Una empresa de RR.HH. que publica inadvertidamente datos de empleados en internet responde por los daños morales y materiales causados.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-24',
      lawId: LAW_ID,
      number: '24',
      title: 'Sanciones administrativas',
      originalText:
        'ARTICULO 24. — 1. El organismo de control podrá aplicar las sanciones de apercibimiento, suspensión, multa de mil pesos ($ 1.000) a cien mil pesos ($ 100.000), clausura o cancelación del archivo, registro o banco de datos. 2. La reglamentación determinará las condiciones y procedimientos para la aplicación de las sanciones previstas, las que deberán graduarse en relación a la gravedad y extensión de la violación y de los daños que se hubieran producido. 3. Cuando los archivos de datos sean públicos, las sanciones administrativas podrán imponerse a las autoridades responsables de los mismos, dentro del máximo previsto en este artículo.',
      currentText:
        'El organismo de control puede aplicar: apercibimiento, suspensión, multa ($1.000 a $100.000), clausura o cancelación del archivo. Las sanciones se gradúan según la gravedad y extensión de la violación. Para archivos públicos, las sanciones pueden recaer sobre los funcionarios responsables.',
      plainLanguageExplanation:
        'La DNPDP puede sancionar a quienes violen la ley con apercibimiento, suspensión, multas, clausura o hasta cancelación definitiva de la base de datos. Para organismos públicos, los funcionarios responsables también pueden ser sancionados.',
      practicalEffects: [
        'La clausura de una base de datos puede paralizar la operación de una empresa que depende de ella.',
        'Los funcionarios públicos responsables de bases de datos ilegales también pueden ser sancionados.',
        'Las multas han quedado desactualizadas por inflación; la reglamentación puede actualizarlas.',
      ],
      examples: [
        'Una empresa que opera una base de datos no registrada puede recibir un apercibimiento en primera instancia y multa si reincide.',
        'Un funcionario público responsable de filtrar datos de ciudadanos puede recibir sanción directa.',
      ],
      relatedArticles: ['art-25326-29', 'art-25326-31'],
      jurisprudence: [],
      regulations: [],
      keywords: ['sanciones', 'DNPDP', 'multa', 'clausura', 'cancelación', 'apercibimiento'],
      order: 24,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-24-1',
          lawId: LAW_ID,
          articleId: 'art-25326-24',
          articleNumber: '24',
          segmentType: 'PARAGRAPH',
          originalText:
            'El organismo de control podrá aplicar las sanciones de apercibimiento, suspensión, multa de mil pesos ($ 1.000) a cien mil pesos ($ 100.000), clausura o cancelación del archivo, registro o banco de datos.',
          plainExplanation: 'La DNPDP puede sancionar con apercibimiento, multa, clausura o cancelación del archivo de datos.',
          practicalExample:
            'Una empresa de marketing que usó datos comprados sin consentimiento puede recibir apercibimiento, y si reincide, una multa y eventualmente la clausura de su base de datos.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-25',
      lawId: LAW_ID,
      number: '25',
      title: 'Sanciones penales',
      originalText:
        'ARTICULO 25. — Incorpórase como artículo 117 bis del Código Penal el siguiente texto: "1°. Será reprimido con la pena de prisión de un mes a dos años el que insertare o hiciere insertar a sabiendas datos falsos en un archivo de datos personales. 2°. La pena será de seis meses a tres años, al que proporcionare a un tercero a sabiendas información falsa contenida en un archivo de datos personales. 3°. La escala penal se aumentará en la mitad del mínimo y del máximo, cuando del hecho se derive perjuicio a alguna persona. 4°. Cuando el autor o responsable del ilícito sea funcionario público en ejercicio de sus funciones, se le aplicará la accesoria de inhabilitación para el desempeño de cargos públicos por el doble del tiempo que el de la condena."',
      currentText:
        'Incorpora el art. 117 bis al Código Penal: insertar datos falsos en archivo de datos personales: 1–2 años de prisión. Proporcionar información falsa a terceros: 6 meses a 3 años. Si causa perjuicio, se agrava la pena. Si es funcionario público, inhabilitación por el doble del tiempo de condena.',
      plainLanguageExplanation:
        'Incorpora al Código Penal el delito de manipulación de datos personales. Es delito insertar datos falsos en una base de datos (1-2 años de prisión) o dar esa información falsa a terceros (6 meses-3 años). Si el autor es funcionario público, también pierde su cargo.',
      practicalEffects: [
        'Insertar datos falsos en el Veraz o en el BCRA es un delito penal.',
        'Un funcionario público que falsifica datos en una base oficial puede ser encarcelado e inhabilitado.',
        'La pena se agrava si la falsedad causa un perjuicio concreto a la víctima.',
      ],
      examples: [
        'Un empleado bancario que inserta datos falsos en el sistema crediticio para perjudicar a un ex-empleado comete el delito del art. 117 bis CP.',
        'Un funcionario del RENAPER que modifica datos de identidad de una persona comete el delito agravado por funcionario público.',
      ],
      relatedArticles: ['art-25326-32'],
      jurisprudence: [],
      regulations: ['Art. 117 bis CP (incorporado por esta ley)'],
      keywords: ['sanciones penales', 'datos falsos', 'art. 117 bis', 'Código Penal', 'funcionario público'],
      order: 25,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-25-1',
          lawId: LAW_ID,
          articleId: 'art-25326-25',
          articleNumber: '25',
          segmentType: 'PARAGRAPH',
          originalText:
            'Será reprimido con prisión de un mes a dos años el que insertare o hiciere insertar a sabiendas datos falsos en un archivo de datos personales. La pena será de seis meses a tres años al que proporcionare a un tercero información falsa contenida en un archivo de datos personales.',
          plainExplanation: 'Insertar datos falsos en un archivo: 1-2 años; dar esa información falsa a terceros: 6 meses-3 años.',
          practicalExample:
            'Un empleado de una empresa de informes crediticios que a sabiendas registra una mora inexistente contra alguien comete este delito y puede ser procesado penalmente.',
          references: ['Art. 117 bis CP'],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-27',
      lawId: LAW_ID,
      number: '27',
      title: 'Autoridad de control',
      originalText:
        'ARTICULO 27. — 1. El organismo de control realizará todas las acciones necesarias para el cumplimiento de los objetivos y demás disposiciones de la presente ley. En especial, podrá: a) Asistir y asesorar a las personas que lo requieran acerca de los alcances de la presente y de los medios legales de que disponen para la defensa de los derechos que ella garantiza; b) Dictar las normas y reglamentaciones que se deben observar en el desarrollo de las actividades incluidas en la presente ley; c) Realizar una auditoria anual sobre los archivos, registros o bancos de datos alcanzados por la ley, a efectos de evaluar el cumplimiento de sus disposiciones; d) Solicitar información a las entidades públicas y privadas; e) Imponer las sanciones administrativas que correspondan por violación a las normas de la presente ley y su reglamentación; f) Efectuar denuncias penales en los casos en que lo estime pertinente; g) Controlar el cumplimiento de los requisitos y garantías que deben reunir los archivos o bancos de datos privados destinados a suministrar informes, para obtener la correspondiente inscripción en el registro.',
      currentText:
        'El organismo de control (DNPDP) puede: asesorar, dictar normas, auditar archivos anualmente, solicitar información a entidades públicas y privadas, imponer sanciones, efectuar denuncias penales, y controlar inscripciones de bases de datos privadas.',
      plainLanguageExplanation:
        'La DNPDP (hoy AAIP) tiene amplias facultades: puede asesorar ciudadanos, dictar normas, hacer auditorías anuales de bases de datos, pedir información a cualquier organismo, sancionar, denunciar penalmente y controlar que las bases privadas estén inscriptas.',
      practicalEffects: [
        'La DNPDP puede auditar cualquier base de datos privada sin previo aviso si tiene razones fundadas.',
        'Las empresas pueden pedir asesoramiento gratuito a la DNPDP sobre cómo cumplir la ley.',
        'El organismo puede iniciar denuncias penales directamente sin esperar queja de un particular.',
      ],
      examples: [
        'Un ciudadano que no sabe cómo solicitar sus datos a una empresa puede consultar gratuitamente a la AAIP (ex DNPDP).',
        'La AAIP puede auditar a una empresa de marketing digital sin que ningún ciudadano haya presentado una queja.',
      ],
      relatedArticles: ['art-25326-24', 'art-25326-29'],
      jurisprudence: [],
      regulations: [],
      keywords: ['DNPDP', 'AAIP', 'autoridad de control', 'auditoría', 'sanciones', 'facultades'],
      order: 27,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-27-1',
          lawId: LAW_ID,
          articleId: 'art-25326-27',
          articleNumber: '27',
          segmentType: 'PARAGRAPH',
          originalText:
            'El organismo de control realizará todas las acciones necesarias para el cumplimiento de los objetivos de la ley. Podrá asesorar, dictar normas, auditar archivos, solicitar información, imponer sanciones y efectuar denuncias penales.',
          plainExplanation: 'La DNPDP/AAIP tiene amplias facultades para hacer cumplir la ley de datos personales.',
          practicalExample:
            'La AAIP puede iniciar una auditoría a una empresa de recursos humanos que maneja datos de miles de empleados para verificar que cumple con las medidas de seguridad del art. 15.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-28',
      lawId: LAW_ID,
      number: '28',
      title: 'Registro de archivos de datos',
      originalText:
        'ARTICULO 28. — 1. Todo archivo, registro, base o banco de datos público, y privado destinado a proporcionar informes debe inscribirse en el Registro que al efecto habilite el organismo de control. 2. El registro de archivos de datos debe comprender como mínimo, la siguiente información: a) Nombre y domicilio del responsable; b) Características y finalidad del archivo; c) Naturaleza de los datos personales contenidos en cada archivo; d) Forma de recolección y actualización de datos; e) Destino de los datos y personas físicas o jurídicas a las cuales pueden ser transmitidos; f) Modo de interrelacionar la información registrada; g) Medios utilizados para garantizar la seguridad de los datos, debiendo informar sobre las categorías de personas que tendrán acceso al tratamiento de la información; h) Tiempo de conservación de los datos; i) Forma y condiciones en que las personas pueden acceder a los datos referidos a ellas y los procedimientos a realizar para la rectificación o actualización de los datos.',
      currentText:
        'Todo archivo público o privado de datos que sirva para informes debe inscribirse en el Registro de la DNPDP. La inscripción debe incluir: datos del responsable, características del archivo, tipo de datos, forma de recolección, destinatarios, medidas de seguridad, tiempo de conservación y procedimiento de acceso.',
      plainLanguageExplanation:
        'Toda base de datos que sirva para dar informes (Veraz, Nosis, bases empresariales) debe estar inscripta en el Registro de la DNPDP. La inscripción requiere informar qué datos tiene, para qué, quién accede, cómo se protegen y cuánto tiempo se guardan.',
      practicalEffects: [
        'Una empresa que opera una base de datos sin inscripción viola la ley aunque no haya causado daños.',
        'La inscripción es pública: cualquiera puede saber qué bases de datos existen y quién las administra.',
        'La inscripción es un prerrequisito para que la empresa pueda operar legalmente.',
      ],
      examples: [
        'Veraz, Nosis y Equifax deben estar inscriptos en el Registro de la DNPDP con todos los detalles de sus bases de datos.',
        'Una empresa de RR.HH. que maneja datos de candidatos debe inscribir esa base en el Registro.',
      ],
      relatedArticles: ['art-25326-3', 'art-25326-27'],
      jurisprudence: [],
      regulations: [],
      keywords: ['registro de archivos', 'inscripción', 'DNPDP', 'bases de datos', 'transparencia'],
      order: 28,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-28-1',
          lawId: LAW_ID,
          articleId: 'art-25326-28',
          articleNumber: '28',
          segmentType: 'PARAGRAPH',
          originalText:
            'Todo archivo, registro, base o banco de datos público, y privado destinado a proporcionar informes debe inscribirse en el Registro que al efecto habilite el organismo de control.',
          plainExplanation: 'Toda base de datos que sirva para dar informes debe inscribirse en el Registro de la DNPDP.',
          practicalExample:
            'Una empresa de análisis de riesgo crediticio que vende informes sobre personas debe estar registrada ante la AAIP con los detalles de su base de datos.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-30',
      lawId: LAW_ID,
      number: '30',
      title: 'Acción de protección de datos (habeas data) — competencia',
      originalText:
        'ARTICULO 30. — 1. La acción de habeas data tramitará según las disposiciones de la ley 16.986, en lo que no sea modificado por la presente. 2. Cuando la acción sea iniciada por personas jurídicas, no será de aplicación el procedimiento establecido en la ley 16.986, sino el que corresponda según la naturaleza de la cuestión planteada. 3. En el caso de los archivos o bancos de datos públicos, la acción se entenderá como dirigida contra el Estado, el que será el responsable del procedimiento. 4. Cuando la acción sea dirigida contra una entidad privada, y ésta invoque la confidencialidad de la información que se le requiere, el juez podrá tomar conocimiento personal y directo de los datos solicitados, asegurando su confidencialidad.',
      currentText:
        'La acción de habeas data tramita según la ley 16.986. Para personas jurídicas aplica el proceso ordinario. Contra archivos públicos, el demandado es el Estado. Para archivos privados que invoquen confidencialidad, el juez puede revisar los datos en privado.',
      plainLanguageExplanation:
        'El habeas data se tramita por el proceso de amparo (ley 16.986). Si la empresa demandada dice que los datos son confidenciales, el juez puede revisarlos él mismo sin revelarlos al público. Contra organismos públicos, el demandado es el Estado.',
      practicalEffects: [
        'El habeas data es una acción rápida similar al amparo.',
        'El juez puede conocer los datos privadamente si la empresa alega confidencialidad.',
        'Para personas jurídicas (empresas) que piden habeas data, aplica el proceso ordinario, no el amparo.',
      ],
      examples: [
        'Una empresa que inicia habeas data para conocer datos que una base tiene sobre ella usa el proceso ordinario, no el amparo simplificado.',
        'Un ciudadano que pide habeas data a una entidad privada que alega secreto comercial: el juez puede ver los datos en privado.',
      ],
      relatedArticles: ['art-25326-33', 'art-25326-14'],
      jurisprudence: [],
      regulations: ['Ley 16.986 (amparo)'],
      keywords: ['habeas data', 'competencia', 'amparo', 'confidencialidad', 'proceso'],
      order: 30,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-30-1',
          lawId: LAW_ID,
          articleId: 'art-25326-30',
          articleNumber: '30',
          segmentType: 'PARAGRAPH',
          originalText:
            'La acción de habeas data tramitará según las disposiciones de la ley 16.986. Cuando la acción sea dirigida contra una entidad privada y ésta invoque confidencialidad, el juez podrá tomar conocimiento personal y directo de los datos solicitados.',
          plainExplanation: 'El habeas data tramita por amparo; si la empresa invoca confidencialidad, el juez puede revisar los datos en privado.',
          practicalExample:
            'Un periodista que pide habeas data a una empresa de inteligencia privada: si la empresa dice que los datos son confidenciales, el juez los analiza sin divulgarlos.',
          references: ['Ley 16.986'],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-31',
      lawId: LAW_ID,
      number: '31',
      title: 'Legitimación activa',
      originalText:
        'ARTICULO 31. — La acción de protección de los datos personales o de habeas data podrá ser ejercida por el afectado, sus tutores o curadores y los sucesores de las personas físicas, sean en línea directa o colateral hasta el segundo grado, por sí o por intermedio de apoderado. Cuando la acción sea ejercida por personas de existencia ideal, deberá ser interpuesta por sus representantes legales, o apoderados que éstas designen al efecto. En el proceso podrá intervenir en forma coadyuvante el Defensor del Pueblo.',
      currentText:
        'El habeas data puede iniciarlo el afectado, tutores, curadores, o herederos hasta 2° grado. Las personas jurídicas actúan por sus representantes. El Defensor del Pueblo puede intervenir como coadyuvante.',
      plainLanguageExplanation:
        'El habeas data puede iniciarlo la persona afectada, sus familiares directos (hasta segundo grado), sus tutores o apoderados. Las empresas actúan por sus representantes legales. El Defensor del Pueblo puede intervenir en el proceso.',
      practicalEffects: [
        'Los herederos pueden iniciar habeas data para acceder a datos de una persona fallecida.',
        'Un padre puede iniciar habeas data en nombre de un hijo menor.',
        'El Defensor del Pueblo puede intervenir en procesos de habeas data de interés colectivo.',
      ],
      examples: [
        'Un hijo que quiere acceder a datos de su padre fallecido que estaba en un registro de deudores puede iniciar habeas data como sucesor.',
        'Los padres de un menor pueden pedir que eliminen datos de su hijo de una base de datos de marketing.',
      ],
      relatedArticles: ['art-25326-30', 'art-25326-33'],
      jurisprudence: [],
      regulations: [],
      keywords: ['legitimación', 'habeas data', 'sucesores', 'tutores', 'Defensor del Pueblo'],
      order: 31,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-31-1',
          lawId: LAW_ID,
          articleId: 'art-25326-31',
          articleNumber: '31',
          segmentType: 'PARAGRAPH',
          originalText:
            'La acción de protección de los datos personales o de habeas data podrá ser ejercida por el afectado, sus tutores o curadores y los sucesores de las personas físicas, sean en línea directa o colateral hasta el segundo grado. En el proceso podrá intervenir en forma coadyuvante el Defensor del Pueblo.',
          plainExplanation: 'El habeas data puede iniciarlo el afectado, tutores, herederos hasta 2° grado, o el Defensor del Pueblo como coadyuvante.',
          practicalExample:
            'Un nieto que descubre que el abuelo fallecido figura como deudor en una base de datos puede iniciar habeas data como sucesor colateral de segundo grado.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-34',
      lawId: LAW_ID,
      number: '34',
      title: 'Trámite de la acción — demanda',
      originalText:
        'ARTICULO 34. — En la demanda se deberá indicar con precisión los datos personales que se solicita rectificar, actualizar, suprimir o en su caso la información que se requiere conocer. El afectado podrá solicitar que, mientras dure el proceso, el registro sea bloqueado temporariamente.',
      currentText:
        'La demanda de habeas data debe indicar con precisión los datos a rectificar, actualizar o suprimir. El titular puede pedir el bloqueo temporal del registro mientras dure el proceso.',
      plainLanguageExplanation:
        'Al iniciar el habeas data, hay que especificar exactamente qué datos se quieren conocer, corregir o eliminar. Durante el proceso, el juez puede bloquear temporariamente el uso de esos datos para evitar daños mientras se resuelve el caso.',
      practicalEffects: [
        'El bloqueo temporal impide que la empresa use los datos cuestionados mientras dura el juicio.',
        'La demanda debe ser precisa: no se puede pedir genéricamente "todos mis datos".',
      ],
      examples: [
        'Si alguien pide habeas data porque aparece en el Veraz como deudor de un préstamo que no tomó, puede pedir que bloqueen temporalmente ese registro para que no afecte su scoring crediticio mientras se resuelve.',
      ],
      relatedArticles: ['art-25326-33', 'art-25326-35'],
      jurisprudence: [],
      regulations: [],
      keywords: ['demanda', 'habeas data', 'bloqueo temporal', 'rectificación', 'precisión'],
      order: 34,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-34-1',
          lawId: LAW_ID,
          articleId: 'art-25326-34',
          articleNumber: '34',
          segmentType: 'PARAGRAPH',
          originalText:
            'En la demanda se deberá indicar con precisión los datos personales que se solicita rectificar, actualizar, suprimir o la información que se requiere conocer. El afectado podrá solicitar que el registro sea bloqueado temporariamente mientras dure el proceso.',
          plainExplanation: 'La demanda de habeas data debe ser precisa; se puede pedir bloqueo temporal de los datos durante el proceso.',
          practicalExample:
            'Una persona que demanda habeas data debe indicar: "quiero suprimir el dato de que soy deudor moroso de X banco desde fecha Y", no simplemente "quiero borrar mis datos".',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-35',
      lawId: LAW_ID,
      number: '35',
      title: 'Citación del demandado',
      originalText:
        'ARTICULO 35. — Admitida la acción, se requerirá al archivo, registro o banco de datos la remisión de la información concerniente al accionante. Podrá ordenarse la suspensión del uso de los datos personales en cuestión. La información deberá ser remitida por el responsable dentro del plazo fijado por el juez.',
      currentText:
        'Admitida la acción, el juez requiere al responsable del archivo la información concerniente al actor. Puede ordenar la suspensión del uso de los datos. El plazo lo fija el juez.',
      plainLanguageExplanation:
        'Cuando el juez admite el habeas data, pide al responsable de la base de datos que remita la información sobre el actor. El juez también puede suspender el uso de esos datos durante el proceso. El responsable debe cumplir en el plazo que fije el juez.',
      practicalEffects: [
        'El responsable está legalmente obligado a remitir la información al juez.',
        'La suspensión de uso protege al actor mientras se resuelve el caso.',
        'El incumplimiento del responsable puede acarrear sanciones de contempt of court.',
      ],
      examples: [
        'El juez pide a Veraz que informe todos los datos que tiene registrados sobre el demandante; Veraz debe remitirlos en el plazo fijado.',
      ],
      relatedArticles: ['art-25326-34', 'art-25326-36'],
      jurisprudence: [],
      regulations: [],
      keywords: ['habeas data', 'citación', 'suspensión de uso', 'plazo judicial', 'responsable'],
      order: 35,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-35-1',
          lawId: LAW_ID,
          articleId: 'art-25326-35',
          articleNumber: '35',
          segmentType: 'PARAGRAPH',
          originalText:
            'Admitida la acción, se requerirá al archivo, registro o banco de datos la remisión de la información concerniente al accionante. Podrá ordenarse la suspensión del uso de los datos personales en cuestión.',
          plainExplanation: 'El juez pide la información al responsable y puede suspender el uso de los datos durante el proceso.',
          practicalExample:
            'El juez ordena a Nosis que remita todos los datos del demandante y suspende el uso de la calificación crediticia negativa mientras se resuelve el habeas data.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-36',
      lawId: LAW_ID,
      number: '36',
      title: 'Contestación del demandado',
      originalText:
        'ARTICULO 36. — 1. Si el archivo, registro o banco de datos reconoce la inexactitud o falsedad de los datos, deberá proceder de inmediato a su rectificación, actualización, supresión o confidencialidad según corresponda, y comunicarlo al actor. 2. Si el accionado no estuviese de acuerdo con lo solicitado, se procederá a una audiencia ante el juez para que cada parte exponga sus fundamentos.',
      currentText:
        'Si el responsable reconoce la inexactitud o falsedad, debe rectificar inmediatamente y comunicarlo al actor. Si no está de acuerdo, el juez convoca a audiencia para que cada parte exponga sus fundamentos.',
      plainLanguageExplanation:
        'Si la empresa reconoce que los datos son incorrectos, debe corregirlos de inmediato y notificar al actor. Si no está de acuerdo, hay una audiencia ante el juez donde ambas partes exponen su posición.',
      practicalEffects: [
        'La rectificación espontánea puede poner fin al proceso rápidamente.',
        'Si hay controversia sobre los datos, el juez escucha a ambas partes antes de resolver.',
      ],
      examples: [
        'Veraz reconoce que el dato de mora es incorrecto y lo elimina inmediatamente, informando al actor: el juicio termina.',
        'Si Veraz dice que el dato es correcto y el actor insiste en que no, el juez cita a audiencia.',
      ],
      relatedArticles: ['art-25326-35', 'art-25326-37'],
      jurisprudence: [],
      regulations: [],
      keywords: ['rectificación', 'audiencia', 'contestación', 'falsedad', 'habeas data'],
      order: 36,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-36-1',
          lawId: LAW_ID,
          articleId: 'art-25326-36',
          articleNumber: '36',
          segmentType: 'PARAGRAPH',
          originalText:
            'Si el archivo, registro o banco de datos reconoce la inexactitud o falsedad de los datos, deberá proceder de inmediato a su rectificación y comunicarlo al actor. Si el accionado no estuviese de acuerdo con lo solicitado, se procederá a una audiencia ante el juez.',
          plainExplanation: 'Reconocimiento voluntario lleva a rectificación inmediata; si hay desacuerdo, el juez convoca audiencia.',
          practicalExample:
            'Una empresa de informes crediticios que reconoce el error en la primera citación judicial y rectifica el dato evita que el juicio continúe.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-37',
      lawId: LAW_ID,
      number: '37',
      title: 'Sentencia',
      originalText:
        'ARTICULO 37. — La sentencia que haga lugar al habeas data deberá contener: a) Identificación del archivo, registro, base o banco de datos; b) Si correspondiere, la determinación de la información a rectificar, completar, depurar, suprimir, reservar o actualizar; c) El plazo para cumplir con lo resuelto; d) En su caso, la imposición de las costas al vencido.',
      currentText:
        'La sentencia favorable al habeas data debe identificar el archivo, determinar qué información rectificar/suprimir, fijar el plazo de cumplimiento e imponer costas al vencido.',
      plainLanguageExplanation:
        'La sentencia que da lugar al habeas data debe ser concreta: identifica la base de datos, establece exactamente qué hay que corregir o eliminar, y fija el plazo para cumplirlo. Las costas (gastos del juicio) van al perdedor.',
      practicalEffects: [
        'La sentencia es ejecutable: si el responsable no cumple en el plazo, puede ser sancionado.',
        'Las costas al vencido desincentivan el rechazo infundado de pedidos de rectificación.',
      ],
      examples: [
        'La sentencia dice: "Veraz debe eliminar el dato de mora del actor en el plazo de 5 días hábiles, bajo apercibimiento de astreintes."',
      ],
      relatedArticles: ['art-25326-36', 'art-25326-38'],
      jurisprudence: [],
      regulations: [],
      keywords: ['sentencia', 'habeas data', 'costas', 'plazo', 'rectificación', 'supresión'],
      order: 37,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-37-1',
          lawId: LAW_ID,
          articleId: 'art-25326-37',
          articleNumber: '37',
          segmentType: 'PARAGRAPH',
          originalText:
            'La sentencia que haga lugar al habeas data deberá contener: a) Identificación del archivo; b) La información a rectificar, completar, depurar, suprimir, reservar o actualizar; c) El plazo para cumplir; d) Imposición de costas al vencido.',
          plainExplanation: 'La sentencia favorable identifica el archivo, qué corregir o eliminar, el plazo de cumplimiento, y condena en costas.',
          practicalExample:
            'La sentencia de habeas data condena al Veraz a eliminar los datos de mora dentro de 10 días y a pagar las costas del proceso.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-38',
      lawId: LAW_ID,
      number: '38',
      title: 'Medidas conminatorias',
      originalText:
        'ARTICULO 38. — Cuando se declare procedente la acción, el juez podrá fijar astreintes a cargo del responsable del archivo, registro, base o banco de datos, según lo previsto en el artículo 666 bis del Código Civil, sin perjuicio de las demás responsabilidades emergentes.',
      currentText:
        'Declarada procedente la acción, el juez puede fijar astreintes (multas diarias) al responsable del archivo para compeler su cumplimiento.',
      plainLanguageExplanation:
        'Si el juez da lugar al habeas data, puede imponer astreintes: multas diarias que se acumulan hasta que el responsable cumpla la sentencia. Son una herramienta para forzar el cumplimiento sin necesidad de un nuevo juicio.',
      practicalEffects: [
        'Las astreintes hacen que el incumplimiento de la sentencia sea económicamente insostenible.',
        'El monto lo fija el juez a su prudente arbitrio, considerando la capacidad económica del responsable.',
      ],
      examples: [
        'Un juez fija astreintes de $50.000 por día hasta que la empresa elimine los datos de la persona. La empresa cumple en 2 días para evitar la acumulación.',
      ],
      relatedArticles: ['art-25326-37'],
      jurisprudence: [],
      regulations: [],
      keywords: ['astreintes', 'medidas conminatorias', 'cumplimiento', 'multa diaria', 'sentencia'],
      order: 38,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-38-1',
          lawId: LAW_ID,
          articleId: 'art-25326-38',
          articleNumber: '38',
          segmentType: 'PARAGRAPH',
          originalText:
            'Cuando se declare procedente la acción, el juez podrá fijar astreintes a cargo del responsable del archivo, registro, base o banco de datos, sin perjuicio de las demás responsabilidades emergentes.',
          plainExplanation: 'El juez puede imponer astreintes (multas diarias) para forzar el cumplimiento de la sentencia de habeas data.',
          practicalExample:
            'Una empresa que se niega a eliminar datos ordenados por sentencia puede enfrentar multas de $100.000 por día hasta cumplir.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-39',
      lawId: LAW_ID,
      number: '39',
      title: 'Gratuidad',
      originalText:
        'ARTICULO 39. — La acción de protección de los datos personales o de habeas data es gratuita cuando se deduzca por el propio afectado o sus sucesores.',
      currentText:
        'La acción de habeas data es gratuita cuando la deduce el afectado o sus sucesores.',
      plainLanguageExplanation:
        'Iniciar una acción de habeas data es gratuito: no se paga tasa de justicia. Aplica cuando lo deduce la persona afectada o sus herederos. Para personas jurídicas o abogados actuando por otros, pueden aplicarse otras reglas.',
      practicalEffects: [
        'El acceso a la justicia para proteger datos personales es gratuito.',
        'No hay barrera económica para iniciar un habeas data.',
        'Para organizaciones que demandan por habeas data pueden aplicarse tasas ordinarias.',
      ],
      examples: [
        'Una persona que inicia habeas data para que el Veraz elimine una mora inexistente no paga ninguna tasa de justicia.',
      ],
      relatedArticles: ['art-25326-33', 'art-25326-31'],
      jurisprudence: [],
      regulations: [],
      keywords: ['gratuidad', 'habeas data', 'acceso a la justicia', 'tasa de justicia'],
      order: 39,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-39-1',
          lawId: LAW_ID,
          articleId: 'art-25326-39',
          articleNumber: '39',
          segmentType: 'PARAGRAPH',
          originalText:
            'La acción de protección de los datos personales o de habeas data es gratuita cuando se deduzca por el propio afectado o sus sucesores.',
          plainExplanation: 'El habeas data es gratuito cuando lo inicia el propio afectado o sus herederos.',
          practicalExample:
            'Una persona que inicia habeas data no paga tasa de justicia ni sellados; la acción es completamente gratuita.',
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-40',
      lawId: LAW_ID,
      number: '40',
      title: 'Reglamentación',
      originalText:
        'ARTICULO 40. — La presente ley será reglamentada por el Poder Ejecutivo en un plazo no mayor de CIENTO OCHENTA (180) días contados a partir de su publicación en el Boletín Oficial.',
      currentText:
        'La ley será reglamentada por el Poder Ejecutivo en un plazo no mayor de 180 días desde su publicación en el Boletín Oficial.',
      plainLanguageExplanation:
        'Mandato de reglamentación: el Poder Ejecutivo tenía 180 días desde la publicación de la ley para dictar su reglamentación. Fue cumplido mediante el Decreto 1558/2001.',
      practicalEffects: [
        'La reglamentación complementa y aclara los aspectos técnicos de la ley.',
        'El Decreto 1558/2001 es la norma reglamentaria principal de esta ley.',
      ],
      examples: [
        'El Decreto 1558/2001, dictado dentro del plazo de 180 días, reglamentó los aspectos procedimentales y técnicos de la Ley 25326.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: ['Decreto 1558/2001 (reglamentario)'],
      keywords: ['reglamentación', 'Poder Ejecutivo', '180 días', 'Decreto 1558/2001'],
      order: 40,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-40-1',
          lawId: LAW_ID,
          articleId: 'art-25326-40',
          articleNumber: '40',
          segmentType: 'PARAGRAPH',
          originalText:
            'La presente ley será reglamentada por el Poder Ejecutivo en un plazo no mayor de CIENTO OCHENTA (180) días contados a partir de su publicación en el Boletín Oficial.',
          plainExplanation: 'El Poder Ejecutivo tenía 180 días para reglamentar la ley; lo hizo mediante el Decreto 1558/2001.',
          practicalExample: null,
          references: ['Decreto 1558/2001'],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-41',
      lawId: LAW_ID,
      number: '41',
      title: 'Aplicación',
      originalText:
        'ARTICULO 41. — Quedan derogadas todas las normas que se opongan a la presente ley. Se exceptúa de su aplicación los archivos, registros o bancos de datos regulados por leyes especiales.',
      currentText:
        'Quedan derogadas todas las normas que se opongan a esta ley. Se exceptúan los archivos regulados por leyes especiales.',
      plainLanguageExplanation:
        'La Ley 25326 deroga toda norma previa que se le oponga. Las bases de datos reguladas por leyes especiales (como los registros del sistema financiero regulados por el BCRA) tienen sus propias reglas.',
      practicalEffects: [
        'La ley prevalece sobre cualquier norma anterior incompatible.',
        'Los registros del BCRA, ANSES, RENAPER tienen sus propias regulaciones sectoriales.',
      ],
      examples: [
        'El Registro de Deudores del Sistema Financiero regulado por el BCRA tiene su propia normativa que convive con la ley 25326.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['derogación', 'leyes especiales', 'BCRA', 'ANSES', 'RENAPER'],
      order: 41,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-41-1',
          lawId: LAW_ID,
          articleId: 'art-25326-41',
          articleNumber: '41',
          segmentType: 'PARAGRAPH',
          originalText:
            'Quedan derogadas todas las normas que se opongan a la presente ley. Se exceptúa de su aplicación los archivos, registros o bancos de datos regulados por leyes especiales.',
          plainExplanation: 'La ley deroga normas previas incompatibles; las bases de datos reguladas por leyes especiales tienen sus propias reglas.',
          practicalExample: null,
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-42',
      lawId: LAW_ID,
      number: '42',
      title: 'Incorporación al Código Penal — art. 117 bis',
      originalText:
        'ARTICULO 42. — Incorpórase como artículo 157 bis del Código Penal el siguiente texto: "Será reprimido con la pena de prisión de un mes a dos años el que: 1. A sabiendas e ilegítimamente, o violando sistemas de confidencialidad y seguridad de datos, accediere, de cualquier forma, a un banco de datos personales; 2. Ilegítimamente proporcionare o revelare a otro información registrada en un archivo o en un banco de datos personales cuyo secreto estuviere obligado a preservar por disposición de la ley. 3. Ilegítimamente insertare o hiciere insertar datos en un archivo de datos personales. Cuando el autor sea funcionario público sufrirá, además, pena de inhabilitación especial de un a cuatro años."',
      currentText:
        'Incorpora el art. 157 bis al CP: 1-2 años de prisión por acceder ilegítimamente a una base de datos, revelar información de una base cuyo secreto se está obligado a guardar, o insertar datos ilegítimamente. Si es funcionario público, inhabilitación adicional de 1 a 4 años.',
      plainLanguageExplanation:
        'Incorpora al Código Penal el delito de violación de datos personales: hackear una base de datos (art. 157 bis CP). Es delito: acceder sin autorización a una base de datos (hacking), revelar datos confidenciales de una base que se tiene acceso legítimo, o insertar datos falsos. El funcionario público también pierde su cargo.',
      practicalEffects: [
        'El acceso no autorizado a bases de datos es un delito penal en Argentina.',
        'Un empleado que comparte datos de la empresa con un competidor comete el inciso 2.',
        'Los hackers que roban bases de datos cometen el inciso 1.',
      ],
      examples: [
        'Un empleado de un banco que accede a cuentas sin autorización y las comparte comete el delito del art. 157 bis inciso 2 CP.',
        'Un hacker que accede a una base de datos de clientes de una empresa comete el inciso 1.',
      ],
      relatedArticles: ['art-25326-25'],
      jurisprudence: [],
      regulations: ['Art. 157 bis CP (incorporado por esta ley)'],
      keywords: ['Código Penal', 'art. 157 bis', 'hacking', 'acceso no autorizado', 'datos personales', 'funcionario público'],
      order: 42,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-42-1',
          lawId: LAW_ID,
          articleId: 'art-25326-42',
          articleNumber: '42',
          segmentType: 'PARAGRAPH',
          originalText:
            'Será reprimido con la pena de prisión de un mes a dos años el que: 1. A sabiendas e ilegítimamente accediere a un banco de datos personales. 2. Ilegítimamente proporcionare o revelare información registrada en un archivo cuyo secreto estuviere obligado a preservar. 3. Ilegítimamente insertare datos en un archivo de datos personales.',
          plainExplanation: 'El art. 157 bis CP penaliza el acceso no autorizado, la revelación y la inserción ilegítima de datos personales.',
          practicalExample:
            'Un técnico de IT que accede a la base de datos de RRHH para ver los salarios de sus compañeros comete el inciso 1 del art. 157 bis CP.',
          references: ['Art. 157 bis CP'],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-43',
      lawId: LAW_ID,
      number: '43',
      title: 'Vigencia',
      originalText:
        'ARTICULO 43. — La presente ley entrará en vigencia a los seis meses de su publicación en el Boletín Oficial. Sin perjuicio de ello, las acciones de protección de datos personales podrán interponerse desde el momento de su publicación.',
      currentText:
        'La ley entró en vigencia a los 6 meses de su publicación. Las acciones de habeas data pudieron interponerse desde su publicación.',
      plainLanguageExplanation:
        'La ley tuvo un período de vacancia de 6 meses para que los responsables de bases de datos pudieran adaptarse. Sin embargo, las acciones de habeas data pudieron iniciarse desde el mismo día de publicación.',
      practicalEffects: [
        'Los registros y bases de datos tuvieron 6 meses para cumplir con los requisitos de la ley.',
        'Las acciones judiciales de habeas data estuvieron disponibles desde el primer día.',
      ],
      examples: [
        'Publicada en noviembre de 2000, la ley fue plenamente aplicable en mayo de 2001; pero una persona pudo iniciar habeas data en diciembre de 2000.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['vigencia', 'vacancia legal', 'seis meses', 'publicación'],
      order: 43,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-43-1',
          lawId: LAW_ID,
          articleId: 'art-25326-43',
          articleNumber: '43',
          segmentType: 'PARAGRAPH',
          originalText:
            'La presente ley entrará en vigencia a los seis meses de su publicación en el Boletín Oficial. Sin perjuicio de ello, las acciones de protección de datos personales podrán interponerse desde el momento de su publicación.',
          plainExplanation: 'La ley rigió 6 meses después de publicarse, pero el habeas data estuvo disponible desde el primer día.',
          practicalExample: null,
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-44',
      lawId: LAW_ID,
      number: '44',
      title: 'Adecuación de los archivos existentes',
      originalText:
        'ARTICULO 44. — Los archivos, registros o bancos de datos existentes al momento de la sanción de la presente ley que no se adecuen a las disposiciones de la misma en el plazo previsto en el artículo anterior, quedarán sujetos al régimen sancionatorio de la presente ley.',
      currentText:
        'Los archivos existentes al momento de la ley que no se adecuen en el plazo de 6 meses quedan sujetos al régimen sancionatorio.',
      plainLanguageExplanation:
        'Las bases de datos que existían antes de la ley tenían 6 meses para adaptarse. Si no lo hicieron, pueden ser sancionadas como cualquier base de datos creada después de la ley.',
      practicalEffects: [
        'No hay protección para bases de datos antiguas que no se adecuaron.',
        'Toda base de datos, vieja o nueva, debe cumplir la ley.',
      ],
      examples: [
        'Un registro de morosos creado en 1995 que no se inscribió en el Registro ni cumplió con las normas de la ley en 2001 puede ser sancionado.',
      ],
      relatedArticles: ['art-25326-43'],
      jurisprudence: [],
      regulations: [],
      keywords: ['adecuación', 'archivos existentes', 'plazo', 'sanciones'],
      order: 44,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-44-1',
          lawId: LAW_ID,
          articleId: 'art-25326-44',
          articleNumber: '44',
          segmentType: 'PARAGRAPH',
          originalText:
            'Los archivos, registros o bancos de datos existentes al momento de la sanción de la presente ley que no se adecuen a las disposiciones de la misma en el plazo previsto, quedarán sujetos al régimen sancionatorio de la presente ley.',
          plainExplanation: 'Los archivos preexistentes que no se adecuaron en el plazo de 6 meses están sujetos a las mismas sanciones que los nuevos.',
          practicalExample: null,
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-45',
      lawId: LAW_ID,
      number: '45',
      title: 'Comunicación al Congreso',
      originalText:
        'ARTICULO 45. — El Poder Ejecutivo Nacional deberá informar anualmente al Congreso de la Nación sobre las medidas adoptadas para el cumplimiento de la presente ley y los resultados obtenidos.',
      currentText:
        'El Poder Ejecutivo debe informar anualmente al Congreso sobre las medidas adoptadas para el cumplimiento de la ley y los resultados obtenidos.',
      plainLanguageExplanation:
        'El Poder Ejecutivo tiene la obligación de rendir cuentas al Congreso anualmente sobre la aplicación de la ley de datos personales: qué hizo la DNPDP, cuántas sanciones impuso, qué mejoras implementó.',
      practicalEffects: [
        'El Congreso puede controlar la efectividad de la política de protección de datos.',
        'Los informes son públicos y permiten evaluar el desempeño de la DNPDP.',
      ],
      examples: [
        'El AAIP (ex DNPDP) debe presentar anualmente un informe al Congreso con estadísticas de reclamos, sanciones y regulaciones dictadas.',
      ],
      relatedArticles: ['art-25326-27'],
      jurisprudence: [],
      regulations: [],
      keywords: ['informe anual', 'Congreso', 'control parlamentario', 'DNPDP', 'rendición de cuentas'],
      order: 45,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-45-1',
          lawId: LAW_ID,
          articleId: 'art-25326-45',
          articleNumber: '45',
          segmentType: 'PARAGRAPH',
          originalText:
            'El Poder Ejecutivo Nacional deberá informar anualmente al Congreso de la Nación sobre las medidas adoptadas para el cumplimiento de la presente ley y los resultados obtenidos.',
          plainExplanation: 'El Poder Ejecutivo debe informar al Congreso anualmente sobre la aplicación de la ley.',
          practicalExample: null,
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-46',
      lawId: LAW_ID,
      number: '46',
      title: 'Derogación de leyes',
      originalText:
        'ARTICULO 46. — Deróganse las leyes 18.331 y 21.044.',
      currentText:
        'Deróganse las leyes 18.331 y 21.044.',
      plainLanguageExplanation:
        'La ley 25326 derogó las normas previas sobre protección de datos (ley 18.331 de habeas data y ley 21.044). La nueva ley las reemplaza íntegramente con un marco más completo.',
      practicalEffects: [
        'Las leyes anteriores de habeas data quedaron reemplazadas por la ley 25326.',
        'Toda la normativa de protección de datos quedó consolidada en una sola ley.',
      ],
      examples: [
        'Cualquier reclamo de datos personales presentado a partir de la vigencia de la ley 25326 se rige por ésta, no por las leyes derogadas.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['derogación', 'ley 18331', 'ley 21044'],
      order: 46,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-46-1',
          lawId: LAW_ID,
          articleId: 'art-25326-46',
          articleNumber: '46',
          segmentType: 'PARAGRAPH',
          originalText: 'Deróganse las leyes 18.331 y 21.044.',
          plainExplanation: 'Deroga las leyes previas de habeas data y las reemplaza con el nuevo marco integral de la ley 25326.',
          practicalExample: null,
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-47',
      lawId: LAW_ID,
      number: '47',
      title: 'Disposición complementaria',
      originalText:
        'ARTICULO 47. — Comuníquese al Poder Ejecutivo.',
      currentText: 'Comuníquese al Poder Ejecutivo.',
      plainLanguageExplanation:
        'Cláusula de cierre formal estándar de las leyes sancionadas por el Congreso: ordena comunicar el texto al Poder Ejecutivo para su promulgación.',
      practicalEffects: [
        'Es la instrucción formal al Senado/Cámara de Diputados para enviar la ley al Ejecutivo para su promulgación.',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['comunicación', 'Poder Ejecutivo', 'promulgación', 'cláusula de cierre'],
      order: 47,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-47-1',
          lawId: LAW_ID,
          articleId: 'art-25326-47',
          articleNumber: '47',
          segmentType: 'PARAGRAPH',
          originalText: 'Comuníquese al Poder Ejecutivo.',
          plainExplanation: 'Cláusula formal de cierre que ordena comunicar la ley al Poder Ejecutivo para su promulgación.',
          practicalExample: null,
          references: [],
          order: 1,
        },
      ],
    },
    {
      id: 'art-25326-48',
      lawId: LAW_ID,
      number: '48',
      title: 'Publicación y vigencia',
      originalText:
        'ARTICULO 48. — Publíquese en el Boletín Oficial.',
      currentText: 'Publíquese en el Boletín Oficial.',
      plainLanguageExplanation:
        'Cláusula formal de publicación: ordena publicar la ley en el Boletín Oficial, lo que le otorga publicidad y hace correr los plazos de vigencia.',
      practicalEffects: [
        'La publicación en el Boletín Oficial es el acto que le da publicidad a la ley y desde cuando empieza a contarse el plazo de vigencia.',
        'Fue publicada el 2 de noviembre de 2000 (BO 29517).',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['publicación', 'Boletín Oficial', 'vigencia'],
      order: 48,
      amendments: [],
      segments: [
        {
          id: 'seg-25326-48-1',
          lawId: LAW_ID,
          articleId: 'art-25326-48',
          articleNumber: '48',
          segmentType: 'PARAGRAPH',
          originalText: 'Publíquese en el Boletín Oficial.',
          plainExplanation: 'Ordena la publicación en el Boletín Oficial, que le da vigencia pública a la ley.',
          practicalExample: null,
          references: [],
          order: 1,
        },
      ],
    },
  ],
};

import { DISP_DNPDP_7_2005 } from './disp-dnpdp-7-2005.data';
import { LEY_27802 } from './ley-27802.data';

export const ALL_LAWS: Law[] = [LEY_25326, DISP_DNPDP_7_2005, LEY_27802];
