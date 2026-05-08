import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Ley 25326...');

  // ─── Upsert law ───────────────────────────────────────────────────────────────
  const law = await prisma.law.upsert({
    where: { number: '25326' },
    update: {},
    create: {
      number: '25326',
      title: 'Ley de Protección de los Datos Personales',
      summary:
        'Regula el tratamiento de datos personales asentados en archivos, registros y bancos de datos, garantizando el derecho a la intimidad y al honor de las personas. Establece el habeas data como acción judicial de protección.',
      year: 2000,
      sanctionDate: new Date('2000-10-04'),
      promulgationDate: new Date('2000-10-30'),
      publicationDate: new Date('2000-11-02'),
      boNumber: '29517',
      status: 'VIGENTE',
      jurisdiction: 'NACIONAL',
      normType: 'LEY',
      issuingBody: 'Honorable Congreso de la Nación Argentina',
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
    },
  });

  // ─── Metadata ─────────────────────────────────────────────────────────────────
  await prisma.lawMetadata.upsert({
    where: { lawId: law.id },
    update: {},
    create: {
      lawId: law.id,
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
        'Responder solicitudes de acceso en 10 días hábiles',
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
        'Multas administrativas de entre $1.000 y $100.000 (actualizables)',
        'Clausura de la base de datos',
        'Inhabilitación para operar bases de datos',
        'Penas de prisión de 1 mes a 2 años por inserción de datos falsos',
        'Penas de 6 meses a 3 años por revelar datos secretos',
        'Penas de 1 mes a 2 años por acceso ilegítimo a bases de datos',
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
    },
  });

  // ─── Amendments ───────────────────────────────────────────────────────────────
  await prisma.amendment.createMany({
    skipDuplicates: true,
    data: [
      {
        lawId: law.id,
        modifyingLaw: 'Decreto 995/2000',
        modifyingDate: new Date('2000-11-02'),
        description:
          'Vetó los artículos 29 (puntos 2 y 3) y 47 relativos a la estructura y funcionamiento del órgano de control.',
      },
      {
        lawId: law.id,
        modifyingLaw: 'Decreto 1558/2001',
        modifyingDate: new Date('2001-12-03'),
        description:
          'Reglamentó la ley y modificó el artículo 46, estableciendo 180 días para que los archivos existentes se adecuen al régimen legal.',
      },
      {
        lawId: law.id,
        modifyingLaw: 'Ley 26343',
        modifyingDate: new Date('2008-01-09'),
        description:
          'Incorporó el artículo 47: eliminación de datos sobre obligaciones morosas o mal clasificadas del período 2000–2003 que estuvieran canceladas o regularizadas.',
      },
    ],
  });

  // ─── Articles + Segments ──────────────────────────────────────────────────────
  const articlesData = [
    // ══════════════════════════════════════════════════
    //  CAPÍTULO I — DISPOSICIONES GENERALES
    // ══════════════════════════════════════════════════
    {
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
      jurisprudence: ['CSJN - Urteaga c/ Estado Mayor - Fallos 321:2947 (1998)'],
      keywords: ['objeto', 'protección integral', 'datos personales', 'honor', 'intimidad', 'habeas data'],
      order: 1,
      segments: [
        {
          segmentType: 'PARAGRAPH',
          originalText:
            'La presente ley tiene por objeto la protección integral de los datos personales asentados en archivos, registros, bancos de datos, u otros medios técnicos de tratamiento de datos, sean éstos públicos, o privados destinados a dar informes...',
          plainExplanation:
            'La ley protege cualquier dato personal que esté guardado en algún sistema, ya sea del Estado o de una empresa privada.',
          practicalExample:
            'Tu historial en Mercado Libre, tu legajo en ANSES, tu ficha de paciente en un hospital: todos están cubiertos.',
        },
        {
          segmentType: 'PARAGRAPH',
          originalText:
            '...para garantizar el derecho al honor y a la intimidad de las personas, así como también el acceso a la información que sobre las mismas se registre, de conformidad a lo establecido en el artículo 43, párrafo tercero de la Constitución Nacional.',
          plainExplanation:
            'El objetivo final es doble: que tus datos no se usen para perjudicarte, y que puedas saber qué información existe sobre vos. Esto tiene rango constitucional.',
          practicalExample:
            'Si una empresa de informes te califica como "deudor moroso" siendo falso, esta ley te da herramientas para corregirlo.',
        },
      ],
    },
    {
      number: '2',
      title: 'Definiciones',
      originalText:
        'A los fines de la presente ley se entiende por: DATOS PERSONALES: Información de cualquier tipo referida a personas físicas o de existencia ideal determinadas o determinables. DATOS SENSIBLES: Datos personales que revelan origen racial y étnico, opiniones políticas, convicciones religiosas, filosóficas o morales, afiliación sindical e información referente a la salud o a la vida sexual. ARCHIVO, REGISTRO, BASE O BANCO DE DATOS: Indistintamente, designan al conjunto organizado de datos personales que sean objeto de tratamiento o procesamiento, electrónico o no, cualquiera que fuere la modalidad de su formación, almacenamiento, organización o acceso. TRATAMIENTO DE DATOS: Operaciones y procedimientos sistemáticos, electrónicos o no, que permitan la recolección, conservación, ordenación, almacenamiento, modificación, relacionamiento, evaluación, bloqueo, destrucción, y en general el procesamiento de datos personales, así como también su cesión a terceros a través de comunicaciones, consultas, interconexiones o transferencias. RESPONSABLE DE ARCHIVO, REGISTRO, BASE O BANCO DE DATOS: Persona física o de existencia ideal, pública o privada, que es titular de un archivo, registro, base o banco de datos. DATOS INFORMATIZADOS: Los datos personales sometidos al tratamiento o procesamiento electrónico o automatizado. TITULAR DE LOS DATOS: Toda persona física o persona jurídica de existencia ideal con domicilio legal o delegaciones o sucursales en el país, cuyos datos sean objeto del tratamiento al que se refiere la presente ley. USUARIO DE DATOS: Toda persona, pública o privada que realice a su arbitrio el tratamiento de datos, ya sea en archivos, registros o bancos de datos propios o a través de conexión con los mismos. DISOCIACIÓN DE DATOS: Todo tratamiento de datos personales de manera que la información obtenida no pueda asociarse a persona determinada o determinable.',
      currentText:
        'A los fines de la presente ley se entiende por: DATOS PERSONALES: Información de cualquier tipo referida a personas físicas o de existencia ideal determinadas o determinables. DATOS SENSIBLES: Datos personales que revelan origen racial y étnico, opiniones políticas, convicciones religiosas, filosóficas o morales, afiliación sindical e información referente a la salud o a la vida sexual. ARCHIVO, REGISTRO, BASE O BANCO DE DATOS: Indistintamente, designan al conjunto organizado de datos personales que sean objeto de tratamiento o procesamiento, electrónico o no, cualquiera que fuere la modalidad de su formación, almacenamiento, organización o acceso. TRATAMIENTO DE DATOS: Operaciones y procedimientos sistemáticos, electrónicos o no, que permitan la recolección, conservación, ordenación, almacenamiento, modificación, relacionamiento, evaluación, bloqueo, destrucción, y en general el procesamiento de datos personales, así como también su cesión a terceros a través de comunicaciones, consultas, interconexiones o transferencias. RESPONSABLE DE ARCHIVO, REGISTRO, BASE O BANCO DE DATOS: Persona física o de existencia ideal, pública o privada, que es titular de un archivo, registro, base o banco de datos. DATOS INFORMATIZADOS: Los datos personales sometidos al tratamiento o procesamiento electrónico o automatizado. TITULAR DE LOS DATOS: Toda persona física o persona jurídica de existencia ideal con domicilio legal o delegaciones o sucursales en el país, cuyos datos sean objeto del tratamiento al que se refiere la presente ley. USUARIO DE DATOS: Toda persona, pública o privada que realice a su arbitrio el tratamiento de datos, ya sea en archivos, registros o bancos de datos propios o a través de conexión con los mismos. DISOCIACIÓN DE DATOS: Todo tratamiento de datos personales de manera que la información obtenida no pueda asociarse a persona determinada o determinable.',
      plainLanguageExplanation:
        'El artículo 2 es el glosario de la ley. Define los términos clave para que no haya confusiones. Lo más importante: "datos personales" es casi cualquier información que permita identificarte, y "datos sensibles" son los más protegidos (salud, religión, política, sexualidad).',
      practicalEffects: [
        '"Datos personales" incluye nombre, DNI, mail, foto, voz, geolocalización, IP',
        '"Datos sensibles" tienen protección extra y no pueden usarse sin consentimiento expreso',
        '"Usuario de datos" puede ser una empresa tercera que procesa datos en nombre de otra',
      ],
      examples: [
        'Tu nombre + DNI = datos personales ordinarios',
        'Tu diagnóstico médico + orientación sexual + afiliación política = datos sensibles',
        'Una empresa de análisis de datos que trabaja para otra es "usuario de datos"',
      ],
      keywords: ['definiciones', 'datos sensibles', 'datos personales', 'usuario', 'responsable', 'tratamiento'],
      order: 2,
      segments: [
        {
          segmentType: 'INCISO',
          originalText:
            'DATOS PERSONALES: Información de cualquier tipo referida a personas físicas o de existencia ideal determinadas o determinables.',
          plainExplanation:
            'Dato personal = cualquier información que permita identificar a alguien, directa o indirectamente. Alcanza desde el nombre hasta una IP o un número de placa.',
          practicalExample: 'Tu email, tu número de celular, tu foto de perfil y tu geolocalización son datos personales.',
        },
        {
          segmentType: 'INCISO',
          originalText:
            'DATOS SENSIBLES: Datos personales que revelan origen racial y étnico, opiniones políticas, convicciones religiosas, filosóficas o morales, afiliación sindical e información referente a la salud o a la vida sexual.',
          plainExplanation:
            'Los datos sensibles son los que más pueden usarse para discriminar o perjudicar. Por eso tienen protección reforzada y reglas mucho más estrictas para su tratamiento.',
          practicalExample:
            'Tu diagnóstico de VIH, tu militancia política o tu religión son datos sensibles. Una empresa no puede pedirte eso para darte empleo.',
        },
        {
          segmentType: 'INCISO',
          originalText:
            'TRATAMIENTO DE DATOS: Operaciones y procedimientos sistemáticos, electrónicos o no, que permitan la recolección, conservación, ordenación, almacenamiento, modificación, relacionamiento, evaluación, bloqueo, destrucción, y en general el procesamiento de datos personales, así como también su cesión a terceros...',
          plainExplanation:
            '"Tratamiento" abarca absolutamente todo lo que se pueda hacer con un dato: guardarlo, modificarlo, mandárselo a otro, borrarlo. Si hacés cualquiera de estas cosas, estás tratando datos.',
          practicalExample:
            'Cuando una app de delivery guarda tu dirección, la muestra al repartidor y luego la borra: ejecutó tres operaciones de tratamiento distintas.',
        },
      ],
    },
    {
      number: '3',
      title: 'Ámbito de aplicación',
      originalText:
        'La presente ley rige en todo el territorio nacional y se aplica a todos los datos personales que, reuniendo las características y condiciones que establece la presente ley, sean tratados por personas o entidades domiciliadas en la República Argentina, salvo lo dispuesto en los convenios internacionales en que la República Argentina sea parte. También rige a personas o entidades domiciliadas en el extranjero siempre que sean tratados en el territorio nacional o con fines comerciales en la República Argentina. Quedan excluidos del ámbito de aplicación de esta ley los archivos de datos mantenidos por personas físicas en el ejercicio de actividades exclusivamente personales o domésticas. Los archivos, registros, bases y bancos de datos que contengan información de personas de existencia ideal no son alcanzados por la presente ley.',
      currentText:
        'La presente ley rige en todo el territorio nacional y se aplica a todos los datos personales que, reuniendo las características y condiciones que establece la presente ley, sean tratados por personas o entidades domiciliadas en la República Argentina, salvo lo dispuesto en los convenios internacionales en que la República Argentina sea parte. También rige a personas o entidades domiciliadas en el extranjero siempre que sean tratados en el territorio nacional o con fines comerciales en la República Argentina. Quedan excluidos del ámbito de aplicación de esta ley los archivos de datos mantenidos por personas físicas en el ejercicio de actividades exclusivamente personales o domésticas. Los archivos, registros, bases y bancos de datos que contengan información de personas de existencia ideal no son alcanzados por la presente ley.',
      plainLanguageExplanation:
        'La ley aplica en todo el país. También aplica a empresas extranjeras que operen en Argentina o que usen datos de argentinos con fines comerciales. Hay dos excepciones: las agendas personales (uso doméstico) y los datos de empresas (personas jurídicas), que no están protegidos por esta ley.',
      practicalEffects: [
        'Una empresa extranjera con usuarios argentinos (tipo Netflix o Spotify) queda alcanzada',
        'La agenda del teléfono personal está excluida',
        'Los datos de empresas (CUIT, razón social) no tienen la misma protección que los de personas físicas',
      ],
      examples: [
        'Facebook, Amazon o Google deben cumplir esta ley respecto de sus usuarios argentinos',
        'Una lista de números de amigos en tu celular no es una base de datos alcanzada',
      ],
      keywords: ['ámbito de aplicación', 'territorio', 'extranjero', 'exclusiones', 'personas físicas'],
      order: 3,
      segments: [],
    },
    {
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
      keywords: ['calidad de datos', 'exactitud', 'proporcionalidad', 'finalidad', 'datos obsoletos'],
      order: 4,
      segments: [],
    },
    // ══════════════════════════════════════════════════
    //  CAPÍTULO II — PRINCIPIOS GENERALES
    // ══════════════════════════════════════════════════
    {
      number: '5',
      title: 'Consentimiento',
      originalText:
        '1. El tratamiento de datos personales es ilícito cuando el titular no hubiere prestado su consentimiento libre, expreso e informado, el que deberá constar por escrito, o por otro medio que permita se le equipare, de acuerdo a las circunstancias. El referido consentimiento prestado con otras declaraciones, deberá figurar en forma expresa y destacada, previa notificación al titular de los datos de la información descrita en el artículo 6 de la presente ley. 2. No será necesario el consentimiento cuando: a) Los datos se obtengan de fuentes de acceso público irrestricto; b) Se recaben para el ejercicio de funciones propias de los poderes del Estado o en virtud de una obligación legal; c) Se trate de listados cuyos datos se limiten a nombre, documento nacional de identidad, identificación tributaria o previsional, ocupación, fecha de nacimiento y domicilio; d) Deriven de una relación contractual, científica o profesional del titular de los datos, y resulten necesarios para su desarrollo o cumplimiento; e) Se trate de las operaciones que realicen las entidades financieras y de las informaciones que reciban de sus clientes conforme las disposiciones del artículo 39 de la Ley 21.526.',
      currentText:
        '1. El tratamiento de datos personales es ilícito cuando el titular no hubiere prestado su consentimiento libre, expreso e informado, el que deberá constar por escrito, o por otro medio que permita se le equipare, de acuerdo a las circunstancias. El referido consentimiento prestado con otras declaraciones, deberá figurar en forma expresa y destacada, previa notificación al titular de los datos de la información descrita en el artículo 6 de la presente ley. 2. No será necesario el consentimiento cuando: a) Los datos se obtengan de fuentes de acceso público irrestricto; b) Se recaben para el ejercicio de funciones propias de los poderes del Estado o en virtud de una obligación legal; c) Se trate de listados cuyos datos se limiten a nombre, documento nacional de identidad, identificación tributaria o previsional, ocupación, fecha de nacimiento y domicilio; d) Deriven de una relación contractual, científica o profesional del titular de los datos, y resulten necesarios para su desarrollo o cumplimiento; e) Se trate de las operaciones que realicen las entidades financieras y de las informaciones que reciban de sus clientes conforme las disposiciones del artículo 39 de la Ley 21.526.',
      plainLanguageExplanation:
        'La regla es que nadie puede usar tus datos sin que vos lo hayas autorizado de manera libre, clara y consciente. Las excepciones son específicas: datos de acceso público, datos necesarios para una obligación legal, o datos que surgen de un contrato donde participaste.',
      practicalEffects: [
        'Una casilla de "acepto los términos" que viene tildada por defecto NO cumple el requisito de consentimiento libre',
        'El consentimiento debe ser específico para cada finalidad, no genérico',
        'Si los datos vienen del guía telefónico público, no necesitan consentimiento',
      ],
      examples: [
        'Un e-commerce que usa tu dirección para enviarte el producto no necesita consentimiento extra (relación contractual)',
        'Una empresa que compra listas de emails para spam SÍ necesita consentimiento de cada persona',
        'AFIP puede procesar tus datos sin consentimiento por obligación legal',
      ],
      jurisprudence: ['CNCom - Tarjeta Naranja c/ DNPDP (2005) - consentimiento tácito'],
      keywords: ['consentimiento', 'libre', 'expreso', 'informado', 'excepciones', 'ilicitud'],
      order: 5,
      segments: [
        {
          segmentType: 'PARAGRAPH',
          originalText:
            'El tratamiento de datos personales es ilícito cuando el titular no hubiere prestado su consentimiento libre, expreso e informado, el que deberá constar por escrito, o por otro medio que permita se le equipare...',
          plainExplanation:
            'La regla general: sin consentimiento, no hay tratamiento lícito. El consentimiento debe ser libre (sin presión), expreso (no tácito) e informado (sabiendo para qué).',
          practicalExample:
            'Una app que en su pantalla de registro dice "al usar la app aceptás que vendemos tus datos a terceros" en letra chica NO cumple con consentimiento informado.',
        },
        {
          segmentType: 'INCISO',
          originalText:
            'No será necesario el consentimiento cuando: a) Los datos se obtengan de fuentes de acceso público irrestricto...',
          plainExplanation:
            'Excepción 1: si la información ya es pública (guía telefónica, registro de propietarios), no hace falta pedir permiso para usarla.',
          practicalExample: 'Una empresa puede usar un número de teléfono que aparece en la guía comercial sin pedir consentimiento.',
        },
        {
          segmentType: 'INCISO',
          originalText:
            'd) Deriven de una relación contractual, científica o profesional del titular de los datos, y resulten necesarios para su desarrollo o cumplimiento...',
          plainExplanation:
            'Excepción clave para negocios: si tenés un contrato con alguien, podés usar los datos que necesitás para cumplirlo, sin necesidad de un consentimiento adicional.',
          practicalExample:
            'Una mutual que usa tu CUIL y obra social para gestionar tu cobertura no necesita un consentimiento separado.',
        },
      ],
    },
    {
      number: '6',
      title: 'Información al titular',
      originalText:
        'Cuando se recaben datos personales se deberá informar previamente a sus titulares en forma expresa y clara: a) La finalidad para la que serán tratados y quiénes pueden ser sus destinatarios o clase de destinatarios; b) La existencia del archivo, registro, base o banco de datos, electrónico o de cualquier otro tipo, de que se trate y la identidad y domicilio de su responsable; c) El carácter obligatorio o facultativo de las respuestas al cuestionario que se le proponga, en especial en cuanto a los datos referidos en el artículo siguiente; d) Las consecuencias de proporcionar los datos, de la negativa a hacerlo o de la inexactitud de los mismos; e) La posibilidad de ejercer los derechos de acceso, rectificación y supresión de los datos.',
      currentText:
        'Cuando se recaben datos personales se deberá informar previamente a sus titulares en forma expresa y clara: a) La finalidad para la que serán tratados y quiénes pueden ser sus destinatarios o clase de destinatarios; b) La existencia del archivo, registro, base o banco de datos, electrónico o de cualquier otro tipo, de que se trate y la identidad y domicilio de su responsable; c) El carácter obligatorio o facultativo de las respuestas al cuestionario que se le proponga, en especial en cuanto a los datos referidos en el artículo siguiente; d) Las consecuencias de proporcionar los datos, de la negativa a hacerlo o de la inexactitud de los mismos; e) La posibilidad de ejercer los derechos de acceso, rectificación y supresión de los datos.',
      plainLanguageExplanation:
        'Cuando alguien te pide datos, antes de que los des, tiene la obligación de decirte: para qué los va a usar, quién los va a tener, si es obligatorio contestar, qué pasa si no contestás, y que podés pedir verlos, corregirlos o borrarlos. Es el fundamento de las "políticas de privacidad".',
      practicalEffects: [
        'Toda app, formulario o contrato que pida datos debe incluir esta información',
        'La política de privacidad no es un capricho: es una obligación legal',
        'Si no informaron correctamente, el consentimiento queda viciado',
      ],
      examples: [
        'Un formulario de inscripción escolar debe decir si el DNI es obligatorio y para qué se usa',
        'Una tienda online debe indicar si comparte tus datos con empresas de marketing antes de que compres',
      ],
      keywords: ['información al titular', 'finalidad', 'política de privacidad', 'obligatorio', 'acceso'],
      order: 6,
      segments: [],
    },
    {
      number: '7',
      title: 'Categorías de datos',
      originalText:
        '1. Ninguna persona puede ser obligada a proporcionar datos sensibles. 2. Los datos sensibles sólo pueden ser recolectados y objeto de tratamiento cuando medien razones de interés general autorizadas por ley. También podrán ser tratados con finalidades estadísticas o científicas cuando no puedan ser identificados sus titulares. 3. Queda prohibida la formación de archivos, bancos o registros que almacenen información que directa o indirectamente revele datos sensibles. Se exceptúan los archivos de las Iglesias, asociaciones religiosas y organizaciones políticas y sindicales que procedan con relación a sus miembros respectivos. 4. Los datos relativos a antecedentes penales o contravencionales sólo pueden ser objeto de tratamiento por parte de las autoridades públicas competentes, en el marco de las leyes y reglamentaciones respectivas.',
      currentText:
        '1. Ninguna persona puede ser obligada a proporcionar datos sensibles. 2. Los datos sensibles sólo pueden ser recolectados y objeto de tratamiento cuando medien razones de interés general autorizadas por ley. También podrán ser tratados con finalidades estadísticas o científicas cuando no puedan ser identificados sus titulares. 3. Queda prohibida la formación de archivos, bancos o registros que almacenen información que directa o indirectamente revele datos sensibles. Se exceptúan los archivos de las Iglesias, asociaciones religiosas y organizaciones políticas y sindicales que procedan con relación a sus miembros respectivos. 4. Los datos relativos a antecedentes penales o contravencionales sólo pueden ser objeto de tratamiento por parte de las autoridades públicas competentes, en el marco de las leyes y reglamentaciones respectivas.',
      plainLanguageExplanation:
        'Los datos sensibles tienen protección máxima. Nadie puede obligarte a revelar tu religión, ideología política, sexualidad o estado de salud. Ni siquiera el Estado puede crear bases de datos que contengan este tipo de información, salvo excepciones muy acotadas (investigación científica con datos anonimizados, partidos políticos sobre sus afiliados, etc.).',
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
      keywords: ['datos sensibles', 'prohibición', 'antecedentes penales', 'religión', 'ideología', 'salud'],
      order: 7,
      segments: [],
    },
    {
      number: '9',
      title: 'Seguridad de los datos',
      originalText:
        '1. El responsable o usuario del archivo de datos debe adoptar las medidas técnicas y organizativas que resulten necesarias para garantizar la seguridad y confidencialidad de los datos personales, de modo de evitar su adulteración, pérdida, consulta o tratamiento no autorizado, y que permitan detectar desviaciones, intencionales o no, de información, ya sea que los riesgos provengan de la acción humana o del medio técnico utilizado. 2. Queda prohibido registrar datos personales en archivos, registros, bases o bancos que no reúnan condiciones técnicas de integridad y seguridad.',
      currentText:
        '1. El responsable o usuario del archivo de datos debe adoptar las medidas técnicas y organizativas que resulten necesarias para garantizar la seguridad y confidencialidad de los datos personales, de modo de evitar su adulteración, pérdida, consulta o tratamiento no autorizado, y que permitan detectar desviaciones, intencionales o no, de información, ya sea que los riesgos provengan de la acción humana o del medio técnico utilizado. 2. Queda prohibido registrar datos personales en archivos, registros, bases o bancos que no reúnan condiciones técnicas de integridad y seguridad.',
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
      keywords: ['seguridad', 'confidencialidad', 'medidas técnicas', 'integridad', 'brecha de datos'],
      order: 9,
      segments: [],
    },
    {
      number: '10',
      title: 'Deber de confidencialidad',
      originalText:
        'El responsable y las personas que intervengan en cualquier fase del tratamiento de datos personales están obligados al secreto profesional respecto de los mismos. Tal obligación subsistirá aun después de finalizada su relación con el titular del archivo de datos.',
      currentText:
        'El responsable y las personas que intervengan en cualquier fase del tratamiento de datos personales están obligados al secreto profesional respecto de los mismos. Tal obligación subsistirá aun después de finalizada su relación con el titular del archivo de datos.',
      plainLanguageExplanation:
        'Cualquier persona que trabaje con datos personales —empleados, contratistas, consultores— debe guardar secreto sobre ellos. Esta obligación no termina cuando dejan el trabajo. Un exempleado que filtra base de datos de clientes sigue siendo responsable.',
      practicalEffects: [
        'Aplica a todos: empleados de IT, call centers, consultoras, freelancers',
        'La confidencialidad rige después de renunciar o ser despedido',
        'Los contratos laborales deben incluir cláusulas de confidencialidad de datos',
      ],
      examples: [
        'Un programador que se lleva la base de datos de clientes al irse a otra empresa viola este artículo',
        'Un empleado de call center que comparte datos de usuarios con amigos incurre en delito penal',
      ],
      keywords: ['confidencialidad', 'secreto profesional', 'empleados', 'obligación'],
      order: 10,
      segments: [],
    },
    // ══════════════════════════════════════════════════
    //  CAPÍTULO V — DERECHOS DE LOS TITULARES
    // ══════════════════════════════════════════════════
    {
      number: '14',
      title: 'Derecho de acceso',
      originalText:
        '1. El titular de los datos, previa acreditación de su identidad, tiene derecho a solicitar y obtener información de sus datos personales incluidos en los bancos de datos públicos, o privados destinados a proveer informes. 2. El responsable o usuario debe proporcionar la información solicitada dentro de los diez días corridos de haber sido intimado fehacientemente. Vencido el plazo sin que se satisfaga el pedido, o si evacuado el informe, éste resultara insuficiente, quedará expedita la acción de protección de los datos personales o de habeas data prevista en esta ley. 3. El derecho de acceso a que se refiere este artículo sólo puede ser ejercido en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto.',
      currentText:
        '1. El titular de los datos, previa acreditación de su identidad, tiene derecho a solicitar y obtener información de sus datos personales incluidos en los bancos de datos públicos, o privados destinados a proveer informes. 2. El responsable o usuario debe proporcionar la información solicitada dentro de los diez días corridos de haber sido intimado fehacientemente. Vencido el plazo sin que se satisfaga el pedido, o si evacuado el informe, éste resultara insuficiente, quedará expedita la acción de protección de los datos personales o de habeas data prevista en esta ley. 3. El derecho de acceso a que se refiere este artículo sólo puede ser ejercido en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto.',
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
      jurisprudence: ['CSJN - Ganora c/ Estado Nacional - Fallos 322:2139 (1999)'],
      keywords: ['derecho de acceso', 'diez días', 'habeas data', 'gratuito', 'identidad'],
      order: 14,
      segments: [
        {
          segmentType: 'PARAGRAPH',
          originalText:
            'El titular de los datos, previa acreditación de su identidad, tiene derecho a solicitar y obtener información de sus datos personales incluidos en los bancos de datos públicos, o privados destinados a proveer informes.',
          plainExplanation:
            'El derecho de acceso es universal: aplica a bases de datos del Estado y también a empresas privadas que proveen informes (Veraz, Nosis, etc.). Solo necesitás acreditar que sos vos.',
          practicalExample:
            'Vas a Veraz, presentás tu DNI y pedís el "informe de titular". Están obligados a dártelo.',
        },
        {
          segmentType: 'PARAGRAPH',
          originalText:
            'El responsable o usuario debe proporcionar la información solicitada dentro de los diez días corridos de haber sido intimado fehacientemente. Vencido el plazo sin que se satisfaga el pedido, o si evacuado el informe, éste resultara insuficiente, quedará expedita la acción de protección de los datos personales o de habeas data prevista en esta ley.',
          plainExplanation:
            'El plazo para recibir respuesta es de 10 días corridos. Si no te responden o te responden con evasivas, ya podés ir a la Justicia sin necesidad de ningún otro trámite previo.',
          practicalExample:
            'Mandás la carta documento el 1 de mayo. Si el 11 de mayo no recibiste respuesta completa, podés presentar el habeas data ante el juez.',
        },
      ],
    },
    {
      number: '16',
      title: 'Derecho de rectificación, actualización o supresión',
      originalText:
        '1. Toda persona tiene derecho a que sean rectificados, actualizados y, cuando corresponda, suprimidos o sometidos a confidencialidad los datos personales de los que sea titular, que estuvieren incluidos en un banco de datos. 2. El responsable o usuario del banco de datos, debe proceder a la rectificación, supresión o actualización de los datos en el plazo máximo de cinco días hábiles de haber recibido la solicitud del titular de los mismos. 3. El incumplimiento de esta obligación dentro del término acordado en el inciso precedente, habilitará al interesado a promover sin más trámite la acción de habeas data prevista en la presente ley. 4. En el supuesto de cesión, o transferencia de datos, el responsable o usuario del banco de datos debe notificar la rectificación o supresión al cesionario dentro del quinto día hábil de efectuado el tratamiento del dato. 5. La rectificación, actualización o supresión de datos personales inexactos o incompletos que obren en registros públicos, se hará asimismo de oficio cuando se tenga conocimiento de la inexactitud o carácter incompleto de la información.',
      currentText:
        '1. Toda persona tiene derecho a que sean rectificados, actualizados y, cuando corresponda, suprimidos o sometidos a confidencialidad los datos personales de los que sea titular, que estuvieren incluidos en un banco de datos. 2. El responsable o usuario del banco de datos, debe proceder a la rectificación, supresión o actualización de los datos en el plazo máximo de cinco días hábiles de haber recibido la solicitud del titular de los mismos. 3. El incumplimiento de esta obligación dentro del término acordado en el inciso precedente, habilitará al interesado a promover sin más trámite la acción de habeas data prevista en la presente ley. 4. En el supuesto de cesión, o transferencia de datos, el responsable o usuario del banco de datos debe notificar la rectificación o supresión al cesionario dentro del quinto día hábil de efectuado el tratamiento del dato. 5. La rectificación, actualización o supresión de datos personales inexactos o incompletos que obren en registros públicos, se hará asimismo de oficio cuando se tenga conocimiento de la inexactitud o carácter incompleto de la información.',
      plainLanguageExplanation:
        'Si tus datos son incorrectos, desactualizados o irrelevantes, podés pedir que los corrijan, actualicen o borren. El plazo de respuesta es de sólo 5 días hábiles. Si no lo hacen, vas directo a la Justicia. Importante: si tus datos ya fueron cedidos a terceros, también deben notificarlos del cambio.',
      practicalEffects: [
        'El plazo es de 5 días hábiles (más corto que el derecho de acceso)',
        'La corrección debe propagarse a todos a quienes se cedieron los datos',
        'Los registros públicos deben corregir de oficio errores que conozcan',
      ],
      examples: [
        'Aparecer como deudor en Veraz habiendo pagado: pedís supresión y tienen 5 días hábiles para corregirlo',
        'Si Veraz ya cedió tu ficha a 3 bancos, también debe notificar la corrección a esos bancos',
      ],
      keywords: ['rectificación', 'supresión', 'actualización', 'cinco días hábiles', 'habeas data'],
      order: 16,
      segments: [
        {
          segmentType: 'PARAGRAPH',
          originalText:
            'Toda persona tiene derecho a que sean rectificados, actualizados y, cuando corresponda, suprimidos o sometidos a confidencialidad los datos personales de los que sea titular...',
          plainExplanation:
            'El "derecho al olvido" argentino: podés pedir que borren tus datos cuando ya no son necesarios o son incorrectos. También podés pedir que los bloqueen (confidencialidad) en lugar de borrarlos.',
          practicalExample:
            'Una persona que tuvo una deuda hace 15 años puede pedir que se eliminen esos datos de informes crediticios.',
        },
        {
          segmentType: 'PARAGRAPH',
          originalText:
            'El responsable o usuario del banco de datos, debe proceder a la rectificación, supresión o actualización de los datos en el plazo máximo de cinco días hábiles de haber recibido la solicitud del titular de los mismos.',
          plainExplanation:
            'El plazo de 5 días hábiles es muy corto. Contá desde que reciben la nota: si el viernes 1 reciben tu carta, el viernes 8 (o antes) deben haber corregido. De lo contrario podés ir al juez.',
          practicalExample:
            'Mandás nota el lunes. Si el lunes siguiente (7 días hábiles = 9 días corridos aprox.) no hubo respuesta, presentás el habeas data.',
        },
      ],
    },
    // ══════════════════════════════════════════════════
    //  CAPÍTULO VI — USUARIOS Y RESPONSABLES
    // ══════════════════════════════════════════════════
    {
      number: '21',
      title: 'Registro de archivos de datos',
      originalText:
        '1. Todo archivo, registro, base o banco de datos público, y privado destinado a proporcionar informes debe inscribirse en el Registro que al efecto habilite el organismo de control. 2. El registro de archivos de datos debe comprender como mínimo la siguiente información: a) Nombre y domicilio del responsable; b) Características y finalidad del archivo; c) Naturaleza de los datos personales contenidos en cada archivo; d) Forma de recolección y actualización de datos; e) Destino de los datos y personas físicas o jurídicas a las que pueden ser transmitidos; f) Modo de interrelacionar la información registrada; g) Tiempo de conservación de los datos; h) Forma y condiciones en que las personas pueden acceder a los datos referidos a ellas y los procedimientos a realizar para la rectificación o actualización de los datos.',
      currentText:
        '1. Todo archivo, registro, base o banco de datos público, y privado destinado a proporcionar informes debe inscribirse en el Registro que al efecto habilite el organismo de control. 2. El registro de archivos de datos debe comprender como mínimo la siguiente información: a) Nombre y domicilio del responsable; b) Características y finalidad del archivo; c) Naturaleza de los datos personales contenidos en cada archivo; d) Forma de recolección y actualización de datos; e) Destino de los datos y personas físicas o jurídicas a las que pueden ser transmitidos; f) Modo de interrelacionar la información registrada; g) Tiempo de conservación de los datos; h) Forma y condiciones en que las personas pueden acceder a los datos referidos a ellas y los procedimientos a realizar para la rectificación o actualización de los datos.',
      plainLanguageExplanation:
        'Toda base de datos que se use para dar informes debe estar registrada ante la Dirección Nacional de Protección de Datos Personales (DNPDP). En ese registro debe constar quién es el responsable, qué datos guarda, para qué, cuánto tiempo los conserva y cómo las personas pueden ejercer sus derechos.',
      practicalEffects: [
        'Operar una base de datos sin registro es una infracción administrativa',
        'El registro permite al órgano de control auditar las bases existentes',
        'El incumplimiento puede derivar en clausura de la base de datos',
      ],
      examples: [
        'Veraz, Nosis, Score y empresas similares deben estar registradas en la DNPDP',
        'Un hospital con sistema de historia clínica electrónica debe inscribir esa base',
      ],
      keywords: ['registro', 'DNPDP', 'inscripción', 'archivos de datos', 'obligación'],
      order: 21,
      segments: [],
    },
    {
      number: '26',
      title: 'Prestación de servicios de información crediticia',
      originalText:
        '1. En la prestación de servicios de información crediticia sólo pueden tratarse datos personales de carácter patrimonial relativos a la solvencia económica y al crédito, obtenidos de fuentes accesibles al público o procedentes de informaciones facilitadas por el interesado o con su consentimiento. 2. Pueden tratarse igualmente datos personales relativos al cumplimiento o incumplimiento de obligaciones de contenido patrimonial, facilitados por el acreedor o por quien actúe por su cuenta o interés. 3. A solicitud del titular de los datos, el responsable del banco de datos le comunicará las informaciones, evaluaciones y apreciaciones que sobre el mismo hayan sido comunicadas durante los últimos seis meses, y el nombre y domicilio del cesionario en el supuesto de tratarse de datos obtenidos por cesión. 4. Sólo se podrán archivar, registrar o ceder los datos personales que sean significativos para evaluar la solvencia económica-financiera de los afectados durante los últimos cinco años. Dicho plazo se reducirá a dos años cuando el deudor cancele o de otro modo extinga la obligación, debiéndose hacer constar dicho hecho.',
      currentText:
        '1. En la prestación de servicios de información crediticia sólo pueden tratarse datos personales de carácter patrimonial relativos a la solvencia económica y al crédito, obtenidos de fuentes accesibles al público o procedentes de informaciones facilitadas por el interesado o con su consentimiento. 2. Pueden tratarse igualmente datos personales relativos al cumplimiento o incumplimiento de obligaciones de contenido patrimonial, facilitados por el acreedor o por quien actúe por su cuenta o interés. 3. A solicitud del titular de los datos, el responsable del banco de datos le comunicará las informaciones, evaluaciones y apreciaciones que sobre el mismo hayan sido comunicadas durante los últimos seis meses, y el nombre y domicilio del cesionario en el supuesto de tratarse de datos obtenidos por cesión. 4. Sólo se podrán archivar, registrar o ceder los datos personales que sean significativos para evaluar la solvencia económica-financiera de los afectados durante los últimos cinco años. Dicho plazo se reducirá a dos años cuando el deudor cancele o de otro modo extinga la obligación, debiéndose hacer constar dicho hecho.',
      plainLanguageExplanation:
        'Este artículo regula específicamente a Veraz, Nosis, Score y similares. Solo pueden guardar tu historial de deudas de los últimos 5 años. Si pagaste una deuda, el plazo se reduce a 2 años desde que la cancelaste. Podés pedirles que te digan qué informaron y a quién en los últimos 6 meses.',
      practicalEffects: [
        'Deudas viejas de más de 5 años deben ser borradas automáticamente',
        'Si pagaste, después de 2 años no pueden figurar más como deudor',
        'Podés saber exactamente qué bancos o empresas consultaron tu historial crediticio',
      ],
      examples: [
        'Una deuda del 2018 que nunca pagaste debe desaparecer de Veraz en 2023 (5 años)',
        'Si pagaste en diciembre 2022, en diciembre 2024 deben eliminarte del registro',
        'Podés pedir la lista de todos los bancos que consultaron tu Veraz en los últimos 6 meses',
      ],
      jurisprudence: ['CNCiv - Macchi c/ BCRA (2003) - plazos de informes crediticios'],
      keywords: ['informes crediticios', 'Veraz', 'Nosis', 'deudas', 'cinco años', 'dos años', 'solvencia'],
      order: 26,
      segments: [
        {
          segmentType: 'PARAGRAPH',
          originalText:
            'Sólo se podrán archivar, registrar o ceder los datos personales que sean significativos para evaluar la solvencia económica-financiera de los afectados durante los últimos cinco años. Dicho plazo se reducirá a dos años cuando el deudor cancele o de otro modo extinga la obligación...',
          plainExplanation:
            'Los plazos de los datos crediticios son acotados por ley. El máximo es 5 años para deudas impagas. Pero si pagaste la deuda, el dato debe borrarse a los 2 años de haber saldado.',
          practicalExample:
            'Tenías una deuda con Telecom desde 2019 y la pagaste en 2021. En 2023 Veraz ya no puede figurarte como deudor moroso.',
        },
      ],
    },
    // ══════════════════════════════════════════════════
    //  CAPÍTULO VIII — ÓRGANO DE CONTROL
    // ══════════════════════════════════════════════════
    {
      number: '29',
      title: 'Dirección Nacional de Protección de Datos Personales',
      originalText:
        '1. El órgano de control de la presente ley estará representado por la Dirección Nacional de Protección de Datos Personales, organismo que actuará en el ámbito de la Secretaría de Justicia y Asuntos Legislativos del Ministerio de Justicia y Derechos Humanos de la Nación. 2. La Dirección Nacional de Protección de Datos Personales tendrá las siguientes funciones: a) Asistir y asesorar a las personas que lo requieran acerca de los alcances de la presente y los medios legales de que disponen para la defensa de los derechos que ésta garantiza; b) Dictar las normas y reglamentaciones que se deben observar en el desarrollo de las actividades comprendidas por esta ley; c) Realizar una auditoría anual de sistemas, a fin de evaluar los distintos archivos de datos existentes; d) Recibir y tramitar las denuncias y reclamos presentados por quienes se crean afectados en los derechos que la presente les garantiza; e) Llevar el registro de archivos y bases de datos previsto por el artículo 21 de la presente ley.',
      currentText:
        '1. El órgano de control de la presente ley estará representado por la Dirección Nacional de Protección de Datos Personales, organismo que actuará en el ámbito de la Secretaría de Justicia y Asuntos Legislativos del Ministerio de Justicia y Derechos Humanos de la Nación. 2. La Dirección Nacional de Protección de Datos Personales tendrá las siguientes funciones: a) Asistir y asesorar a las personas que lo requieran acerca de los alcances de la presente y los medios legales de que disponen para la defensa de los derechos que ésta garantiza; b) Dictar las normas y reglamentaciones que se deben observar en el desarrollo de las actividades comprendidas por esta ley; c) Realizar una auditoría anual de sistemas, a fin de evaluar los distintos archivos de datos existentes; d) Recibir y tramitar las denuncias y reclamos presentados por quienes se crean afectados en los derechos que la presente les garantiza; e) Llevar el registro de archivos y bases de datos previsto por el artículo 21 de la presente ley.',
      plainLanguageExplanation:
        'La DNPDP es el "árbitro" de la ley. Depende del Ministerio de Justicia y tiene varias funciones: asesorar ciudadanos, hacer auditorías, recibir denuncias y llevar el registro de bases de datos. Si una empresa viola la ley, la DNPDP puede iniciar un sumario administrativo.',
      practicalEffects: [
        'La DNPDP es gratuita y pública: cualquier ciudadano puede hacer una consulta o denuncia',
        'Realiza auditorías anuales a bases de datos existentes',
        'Puede dictar resoluciones que aclaran cómo se aplica la ley',
      ],
      examples: [
        'Si una empresa no te borra de su base de datos, podés denunciarla ante la DNPDP antes de ir a la Justicia',
        'La DNPDP publicó disposiciones sobre cookies, apps móviles y transferencia internacional de datos',
      ],
      keywords: ['DNPDP', 'órgano de control', 'auditoría', 'denuncias', 'Ministerio de Justicia'],
      order: 29,
      segments: [],
    },
    // ══════════════════════════════════════════════════
    //  CAPÍTULO IX — SANCIONES
    // ══════════════════════════════════════════════════
    {
      number: '31',
      title: 'Sanciones administrativas',
      originalText:
        '1. Sin perjuicio de las responsabilidades administrativas que correspondan en los casos en que el responsable o usuario del archivo, registro o banco de datos fuera un organismo público, la Dirección Nacional de Protección de Datos Personales podrá aplicar las sanciones de apercibimiento, suspensión, multa de mil pesos ($ 1.000.-) a cien mil pesos ($ 100.000.-), clausura o cancelación del archivo, registro o banco de datos. 2. La reglamentación determinará las condiciones y procedimientos para la aplicación de las sanciones previstas, las que deberán graduarse en relación a la gravedad y extensión de la violación y de los perjuicios derivados de la infracción, garantizándose el principio del debido proceso.',
      currentText:
        '1. Sin perjuicio de las responsabilidades administrativas que correspondan en los casos en que el responsable o usuario del archivo, registro o banco de datos fuera un organismo público, la Dirección Nacional de Protección de Datos Personales podrá aplicar las sanciones de apercibimiento, suspensión, multa de mil pesos ($ 1.000.-) a cien mil pesos ($ 100.000.-), clausura o cancelación del archivo, registro o banco de datos. 2. La reglamentación determinará las condiciones y procedimientos para la aplicación de las sanciones previstas, las que deberán graduarse en relación a la gravedad y extensión de la violación y de los perjuicios derivados de la infracción, garantizándose el principio del debido proceso.',
      plainLanguageExplanation:
        'Las sanciones van desde un simple apercibimiento hasta la clausura definitiva de la base de datos. Las multas del texto original ($1.000 a $100.000) están desactualizadas monetariamente, pero la DNPDP actualiza los montos periódicamente. La sanción más grave es la clausura: la empresa queda inhabilitada para seguir operando la base de datos.',
      practicalEffects: [
        'Las multas son actualizadas por la DNPDP por resolución periódica',
        'La clausura puede ser temporal (suspensión) o definitiva (cancelación)',
        'Los organismos públicos también pueden ser sancionados',
      ],
      examples: [
        'Una empresa que no registró su base de datos puede recibir primero un apercibimiento y luego multa',
        'Una empresa que filtró datos de salud podría recibir la clausura de su base de datos',
      ],
      keywords: ['sanciones', 'multa', 'clausura', 'apercibimiento', 'DNPDP', 'administrativo'],
      order: 31,
      segments: [],
    },
    {
      number: '32',
      title: 'Sanciones penales',
      originalText:
        'Incorpóranse como artículos 117 bis y 157 bis del Código Penal los siguientes: Artículo 117 bis. 1. Será reprimido con la pena de prisión de un mes a dos años el que insertara o hiciera insertar a sabiendas datos falsos en un archivo de datos personales. 2. La pena será de seis meses a tres años, al que proporcionara a un tercero a sabiendas información falsa contenida en un archivo de datos personales. 3. La escala penal se aumentará en la mitad del mínimo y del máximo, cuando del hecho se derive perjuicio a alguna persona. Artículo 157 bis. Será reprimido con la pena de prisión de un mes a dos años el que: 1. A sabiendas e ilegítimamente, o violando sistemas de confidencialidad y seguridad de datos, accediere, de cualquier forma, a un banco de datos personales; 2. Revelare a otro información registrada en un banco de datos personales cuyo secreto estuviere obligado a guardar conforme a la ley.',
      currentText:
        'Incorpóranse como artículos 117 bis y 157 bis del Código Penal los siguientes: Artículo 117 bis. 1. Será reprimido con la pena de prisión de un mes a dos años el que insertara o hiciera insertar a sabiendas datos falsos en un archivo de datos personales. 2. La pena será de seis meses a tres años, al que proporcionara a un tercero a sabiendas información falsa contenida en un archivo de datos personales. 3. La escala penal se aumentará en la mitad del mínimo y del máximo, cuando del hecho se derive perjuicio a alguna persona. Artículo 157 bis. Será reprimido con la pena de prisión de un mes a dos años el que: 1. A sabiendas e ilegítimamente, o violando sistemas de confidencialidad y seguridad de datos, accediere, de cualquier forma, a un banco de datos personales; 2. Revelare a otro información registrada en un banco de datos personales cuyo secreto estuviere obligado a guardar conforme a la ley.',
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
      keywords: ['sanciones penales', 'prisión', 'Código Penal', 'datos falsos', 'hacking', 'confidencialidad'],
      order: 32,
      segments: [],
    },
    // ══════════════════════════════════════════════════
    //  CAPÍTULO X — ACCIÓN DE HABEAS DATA
    // ══════════════════════════════════════════════════
    {
      number: '33',
      title: 'Procedencia',
      originalText:
        '1. La acción de protección de los datos personales o de habeas data procederá: a) Para tomar conocimiento de los datos personales almacenados en archivos, registros o bancos de datos públicos o privados destinados a proporcionar informes, y de la finalidad de aquellos; b) En los casos en que se presuma la falsedad, inexactitud, desactualización de la información de que se trate, o el tratamiento de datos cuyo registro se encuentra prohibido en la presente ley, para exigir su rectificación, supresión, confidencialidad o actualización. 2. Al juez interviniente en una acción entablada en virtud de la presente ley le estará prohibido revelar la información obtenida o a obtenerse, ni divulgarla de ningún modo.',
      currentText:
        '1. La acción de protección de los datos personales o de habeas data procederá: a) Para tomar conocimiento de los datos personales almacenados en archivos, registros o bancos de datos públicos o privados destinados a proporcionar informes, y de la finalidad de aquellos; b) En los casos en que se presuma la falsedad, inexactitud, desactualización de la información de que se trate, o el tratamiento de datos cuyo registro se encuentra prohibido en la presente ley, para exigir su rectificación, supresión, confidencialidad o actualización. 2. Al juez interviniente en una acción entablada en virtud de la presente ley le estará prohibido revelar la información obtenida o a obtenerse, ni divulgarla de ningún modo.',
      plainLanguageExplanation:
        'El habeas data es la acción judicial que protege tus datos personales. Tiene dos variantes: el "habeas data informativo" (para saber qué datos tienen sobre vos) y el "habeas data rectificatorio/supresorio" (para corregir o borrar datos falsos, desactualizados o prohibidos). El juez tiene prohibido difundir la información que obtenga en el proceso.',
      practicalEffects: [
        'Es una acción rápida (sumaria) y gratuita para el titular de los datos',
        'Se puede iniciar sin necesidad de abogado en algunos tribunales',
        'El juez puede ordenar la corrección o supresión inmediata de los datos',
      ],
      examples: [
        'Aparecer en una base de datos de "terroristas" o "deudores" sin serlo: caso típico de habeas data rectificatorio',
        'Querer saber si la SIDE o el Ejército tienen información sobre vos: habeas data informativo',
      ],
      jurisprudence: ['CSJN - Urteaga c/ Estado Mayor - Fallos 321:2947 (1998)'],
      keywords: ['habeas data', 'acción judicial', 'rectificación', 'supresión', 'informativo', 'procedencia'],
      order: 33,
      segments: [
        {
          segmentType: 'INCISO',
          originalText:
            'Para tomar conocimiento de los datos personales almacenados en archivos, registros o bancos de datos públicos o privados destinados a proporcionar informes, y de la finalidad de aquellos...',
          plainExplanation:
            'Habeas data informativo: la variante más básica. Sirve para preguntarle al juez que ordene a una base de datos que te informe qué datos tiene sobre vos. Útil cuando la empresa no respondió extrajudicialmente.',
          practicalExample:
            'Sospechás que el PAMI tiene datos erróneos sobre tu historia médica y no te los mostraron. Pedís habeas data informativo y el juez los obliga a informar.',
        },
        {
          segmentType: 'INCISO',
          originalText:
            'En los casos en que se presuma la falsedad, inexactitud, desactualización de la información de que se trate, o el tratamiento de datos cuyo registro se encuentra prohibido en la presente ley, para exigir su rectificación, supresión, confidencialidad o actualización.',
          plainExplanation:
            'Habeas data rectificatorio: sirve para corregir o eliminar datos incorrectos. Basta con "presumir" la falsedad, no hay que probarla definitivamente para iniciar la acción.',
          practicalExample:
            'Aparecés en el Registro de Deudores del BCRA pero nunca tuviste créditos. Pedís habeas data y el juez ordena la corrección mientras se investiga.',
        },
      ],
    },
  ];

  // ─── Insert articles and their segments ───────────────────────────────────────
  for (const artData of articlesData) {
    const { segments, ...articleFields } = artData;

    const article = await prisma.article.upsert({
      where: { id: `art-ley25326-${artData.number}` },
      update: {},
      create: {
        id: `art-ley25326-${artData.number}`,
        lawId: law.id,
        number: articleFields.number,
        title: articleFields.title,
        originalText: articleFields.originalText,
        currentText: articleFields.currentText,
        plainLanguageExplanation: articleFields.plainLanguageExplanation,
        practicalEffects: articleFields.practicalEffects ?? [],
        examples: articleFields.examples ?? [],
        relatedArticles: [],
        jurisprudence: articleFields.jurisprudence ?? [],
        regulations: [],
        keywords: articleFields.keywords ?? [],
        order: articleFields.order,
      },
    });

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      await prisma.lawSegment.upsert({
        where: { id: `seg-ley25326-${artData.number}-${i}` },
        update: {},
        create: {
          id: `seg-ley25326-${artData.number}-${i}`,
          lawId: law.id,
          articleId: article.id,
          articleNumber: artData.number,
          segmentType: seg.segmentType as any,
          originalText: seg.originalText,
          plainExplanation: seg.plainExplanation,
          practicalExample: seg.practicalExample ?? null,
          references: [],
          order: i,
        },
      });
    }
  }

  // ─── Annexes ──────────────────────────────────────────────────────────────────
  await prisma.annex.upsert({
    where: { id: 'anx-ley25326-1' },
    update: {},
    create: {
      id: 'anx-ley25326-1',
      lawId: law.id,
      number: 'I',
      title: 'Decreto Reglamentario 1558/2001 (extracto)',
      content:
        'El Decreto 1558/2001 reglamentó la Ley 25326 y estableció: (1) La Dirección Nacional de Protección de Datos Personales como órgano de control; (2) El procedimiento de inscripción de bases de datos; (3) El plazo de 180 días para la adecuación de archivos existentes al régimen legal; (4) Las condiciones de transferencia internacional de datos personales; (5) El régimen de auditorías periódicas.',
      order: 1,
    },
  });

  await prisma.annex.upsert({
    where: { id: 'anx-ley25326-2' },
    update: {},
    create: {
      id: 'anx-ley25326-2',
      lawId: law.id,
      number: 'II',
      title: 'Ley 26343 — Datos de deudores período 2000-2003',
      content:
        'La Ley 26343 (sancionada en enero 2008) incorporó el artículo 47 a la Ley 25326, disponiendo la eliminación de datos sobre obligaciones morosas o mal clasificadas correspondientes al período de crisis económica 2000-2003, siempre que dichas obligaciones estuvieran canceladas o regularizadas. La norma tuvo un impacto masivo sobre los informes crediticios de millones de argentinos afectados por la crisis del 2001.',
      order: 2,
    },
  });

  console.log(`✓ Ley 25326 cargada con ${articlesData.length} artículos y segments`);
  console.log(`  ID: ${law.id}`);
  console.log(`  Artículos: ${articlesData.length}`);
  console.log(`  Podés acceder por: GET /api/laws/number/25326`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
