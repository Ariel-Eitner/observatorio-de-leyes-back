import type { Law } from '../common/types/law.types';

const LAW_ID = 'decreto-315-2026';

// ════════════════════════════════════════════════════════════════════════════
//  DECRETO 315/2026 — Reglamentación del Título XX de la Ley 27.802 (RIFL)
//  Firmado: 30/04/2026  |  Publicado: 04/05/2026 (BO)
//  Reglamenta el Régimen de Incentivo a la Formalización Laboral creado por la
//  Ley de Modernización Laboral 27.802. 14 artículos.
//  Fuente: https://www.boletinoficial.gob.ar/detalleAviso/primera/341443/20260504
// ════════════════════════════════════════════════════════════════════════════

export const DECRETO_315_2026: Law = {
  id: LAW_ID,
  number: '315/2026',
  title: 'Reglamentación del Régimen de Incentivo a la Formalización Laboral (RIFL) — Ley 27.802',
  commonName: 'Decreto reglamentario del RIFL (Ley 27.802)',
  summary:
    'Reglamenta el Título XX de la Ley de Modernización Laboral 27.802, que crea el Régimen de Incentivo a la Formalización Laboral (RIFL). Define el período de nuevas incorporaciones (altas registradas ante ARCA entre el 1/5/2026 y el 30/4/2027), los empleadores y trabajadores comprendidos, el alcance del beneficio de reducción de contribuciones patronales por 48 meses, la distribución de los componentes y las causales de pérdida del beneficio.',
  year: 2026,
  sanctionDate: '2026-04-30',
  promulgationDate: '2026-04-30',
  publicationDate: '2026-05-04',
  effectiveDate: '2026-05-04',
  derogatedDate: null,
  boNumber: null,
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'DECRETO',
  issuingBody: 'Poder Ejecutivo Nacional',
  fullText: null,
  sourceUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/341443/20260504',
  articleCount: 14,
  topics: [
    'Derecho laboral',
    'Formalización del empleo',
    'Contribuciones patronales',
    'Régimen de Incentivo a la Formalización Laboral (RIFL)',
    'Seguridad social',
    'Registración laboral ante ARCA',
  ],
  keywords: [
    'RIFL',
    'formalización laboral',
    'contribuciones patronales',
    'reducción de contribuciones',
    'ARCA',
    'ley 27802',
    'modernización laboral',
    'alta laboral',
    'monotributo',
    'SIPA',
    'INSSJP',
    'reglamentación',
    'empleo formal',
    'nuevas incorporaciones',
  ],
  relatedNorms: [
    'Ley 27.802 (Modernización Laboral)',
    'Ley 24.156 (Administración Financiera)',
    'Ley 19.032 (INSSJP)',
    'Resolución General ARCA 5844/2026',
  ],
  relations: [
    {
      type: 'REGLAMENTA',
      targetLawId: 'ley-27802',
      targetLawLabel: 'Ley 27.802 (Modernización Laboral)',
      description: 'Reglamenta el Título XX (Régimen de Incentivo a la Formalización Laboral) de la Ley 27.802.',
    },
  ],
  executiveSummary:
    'El Decreto 315/2026 pone en marcha el Régimen de Incentivo a la Formalización Laboral (RIFL) creado por el Título XX de la Ley 27.802. El RIFL reduce las contribuciones patronales para las nuevas relaciones laborales registradas ante ARCA entre el 1° de mayo de 2026 y el 30 de abril de 2027, por los primeros 48 meses. El decreto precisa quiénes son los empleadores y trabajadores que pueden acceder, cómo se distribuyen las contribuciones reducidas (2% entre SIPA, Fondo de Empleo y Asignaciones; 3% al INSSJP), la incompatibilidad con la reducción del art. 76, la subsistencia de la contribución al Fondo de Asistencia Laboral (FAL) y las causales de pérdida del beneficio.',
  objective:
    'Reglamentar el Título XX de la Ley 27.802 para tornar operativo el RIFL: fijar el período de incorporaciones beneficiadas, los sujetos comprendidos, la mecánica de la reducción de contribuciones y los controles a cargo de ARCA.',
  problemItSolves:
    'La Ley 27.802 creó el RIFL pero delegó en el Poder Ejecutivo precisar su funcionamiento operativo: fechas, topes, distribución de componentes y articulación con ARCA. Sin esta reglamentación el régimen no era aplicable. El decreto resuelve esos vacíos para que los empleadores puedan registrar altas con la alícuota reducida.',
  practicalImpact:
    'Un empleador del sector privado que dé de alta ante ARCA, entre el 1/5/2026 y el 30/4/2027, a un trabajador que no tenía empleo registrado al 10/12/2025 (o monotributista sin dependencia en los últimos 6 meses), paga contribuciones patronales reducidas por 48 meses. Los empleadores nuevos (desde el 10/12/2025) pueden incluir hasta el 80% de su nómina. La reducción del art. 76 no se acumula y la contribución al FAL sigue siendo obligatoria.',
  affectedSubjects: [
    'Empleadores del sector privado que registren nuevas altas',
    'Trabajadores sin relación laboral registrada al 10/12/2025',
    'Monotributistas que se incorporan en relación de dependencia',
    'ARCA (registración, liquidación y control)',
    'Ministerio de Capital Humano / Secretaría de Trabajo',
    'SIPA, Fondo Nacional de Empleo, Régimen de Asignaciones Familiares e INSSJP',
  ],
  createdAt: '2026-05-04T00:00:00.000Z',
  updatedAt: '2026-05-04T00:00:00.000Z',

  articles: [
    {
      id: 'dec-315-art-1',
      lawId: LAW_ID,
      number: '1',
      title: 'Período de nuevas incorporaciones',
      text:
        'A los efectos del Régimen de Incentivo a la Formalización Laboral (RIFL) establecido en el Título XX de la Ley N° 27.802, se considerarán alcanzadas como nuevas incorporaciones las relaciones laborales que se inicien y se registren ante la AGENCIA DE RECAUDACIÓN Y CONTROL ADUANERO (ARCA), entidad autárquica en el ámbito del MINISTERIO DE ECONOMÍA, entre el 1° de mayo de 2026 y el 30 de abril de 2027, ambas fechas inclusive.',
      plainLanguageExplanation:
        'Define la ventana temporal del beneficio: solo las relaciones laborales que se inicien y se registren en ARCA entre el 1° de mayo de 2026 y el 30 de abril de 2027 cuentan como "nuevas incorporaciones" del RIFL. Un alta fuera de ese período no accede a la reducción de contribuciones, aunque cumpla los demás requisitos.',
      practicalEffects: [
        'El beneficio solo aplica a altas registradas entre el 1/5/2026 y el 30/4/2027.',
        'La fecha relevante es la de registración del alta ante ARCA, no la de la firma del contrato.',
        'Pasado el 30/4/2027 el régimen deja de captar nuevas altas (salvo prórroga).',
      ],
      examples: [
        'Un comercio que registra ante ARCA el alta de un empleado el 15/6/2026 queda dentro del RIFL; si lo registra el 2/5/2027, queda fuera.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: ['Resolución General ARCA 5844/2026'],
      keywords: ['RIFL', 'nuevas incorporaciones', 'ARCA', 'período', 'alta laboral'],
      order: 1,
      segments: [
        {
          id: 'dec-315-art-1-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-315-art-1',
          articleNumber: '1',
          segmentType: 'PARAGRAPH',
          text:
            'Se considerarán alcanzadas como nuevas incorporaciones las relaciones laborales que se inicien y se registren ante la AGENCIA DE RECAUDACIÓN Y CONTROL ADUANERO (ARCA) entre el 1° de mayo de 2026 y el 30 de abril de 2027, ambas fechas inclusive.',
          plainExplanation:
            'La ventana del beneficio corre del 1/5/2026 al 30/4/2027; el dato que cuenta es la fecha de registración del alta en ARCA.',
          practicalExample:
            'Alta registrada el 15/6/2026: dentro del RIFL. Alta registrada el 2/5/2027: fuera.',
          references: ['Ley 27.802 Título XX'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'dec-315-art-2',
      lawId: LAW_ID,
      number: '2',
      title: 'Empleadores comprendidos',
      text:
        'A los fines del artículo 158 de la Ley N° 27.802, aquellos que hubieran adquirido el carácter de empleador inscripto ante la AGENCIA DE RECAUDACIÓN Y CONTROL ADUANERO (ARCA), a partir del 10 de diciembre de 2025, inclusive, podrán incluir relaciones laborales en el Régimen de Incentivo a la Formalización Laboral (RIFL) siempre que se reúnan las condiciones y requisitos exigibles por dicho régimen, hasta un máximo del OCHENTA POR CIENTO (80 %) de su nómina de trabajadores.',
      plainLanguageExplanation:
        'Los empleadores que se inscribieron como tales recién a partir del 10 de diciembre de 2025 también pueden usar el RIFL, pero con un tope: solo hasta el 80% de su nómina puede entrar al régimen. Esto evita que una empresa nueva incorpore el 100% de su plantilla con alícuota reducida.',
      practicalEffects: [
        'Empleadores inscriptos desde el 10/12/2025 pueden adherir al RIFL.',
        'El tope es del 80% de la nómina total de trabajadores.',
        'El 20% restante tributa contribuciones por el régimen general.',
      ],
      examples: [
        'Una empresa creada en enero de 2026 con 10 empleados puede incluir en el RIFL hasta 8; los otros 2 van por el régimen general.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['empleadores', 'nómina', '80 por ciento', 'artículo 158', 'ARCA'],
      order: 2,
      segments: [
        {
          id: 'dec-315-art-2-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-315-art-2',
          articleNumber: '2',
          segmentType: 'PARAGRAPH',
          text:
            'Los empleadores inscriptos ante ARCA a partir del 10 de diciembre de 2025 podrán incluir relaciones laborales en el RIFL hasta un máximo del OCHENTA POR CIENTO (80 %) de su nómina de trabajadores.',
          plainExplanation:
            'Los empleadores nuevos (desde el 10/12/2025) pueden usar el RIFL, pero como máximo para el 80% de su plantilla.',
          practicalExample:
            'Empresa nueva con 10 empleados: hasta 8 pueden entrar al RIFL.',
          references: ['Ley 27.802 art. 158'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'dec-315-art-3',
      lawId: LAW_ID,
      number: '3',
      title: 'Trabajadores comprendidos (art. 157 inc. c)',
      text:
        'Artículo 157, inciso c) de la Ley N° 27.802. Trabajadores comprendidos. Los trabajadores a que se refiere el inciso c) del artículo 157 de la Ley N° 27.802 son aquellos que, habiendo estado adheridos al Régimen Simplificado para Pequeños Contribuyentes con carácter previo al mes de alta de la relación laboral, no hayan contado con una relación laboral registrada en el sector privado al 10 de diciembre de 2025 o no hayan ejercido actividades bajo relación de dependencia en el sector privado en los últimos SEIS (6) meses anteriores al de alta de la relación laboral.',
      plainLanguageExplanation:
        'Precisa qué monotributistas pueden ser contratados bajo el RIFL: los que, antes del alta, estaban en el Monotributo y además (a) no tenían empleo registrado en el sector privado al 10/12/2025, o (b) no trabajaron en relación de dependencia privada en los 6 meses previos al alta. Es decir, el régimen apunta a formalizar gente que estaba por fuera del empleo registrado.',
      practicalEffects: [
        'Un monotributista sin empleo registrado al 10/12/2025 puede ser contratado bajo el RIFL.',
        'También aplica al monotributista que no estuvo en relación de dependencia privada en los últimos 6 meses.',
        'El objetivo es traer al empleo formal a trabajadores que estaban informales o autónomos.',
      ],
      examples: [
        'Un diseñador monotributista que nunca tuvo empleo en blanco y es contratado en relación de dependencia en julio de 2026 entra al RIFL.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['trabajadores comprendidos', 'monotributo', 'artículo 157', 'relación de dependencia', 'seis meses'],
      order: 3,
      segments: [
        {
          id: 'dec-315-art-3-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-315-art-3',
          articleNumber: '3',
          segmentType: 'PARAGRAPH',
          text:
            'Son trabajadores comprendidos los monotributistas que no hayan contado con una relación laboral registrada en el sector privado al 10 de diciembre de 2025 o no hayan ejercido actividades bajo relación de dependencia en el sector privado en los últimos SEIS (6) meses anteriores al alta.',
          plainExplanation:
            'Califican los monotributistas sin empleo registrado al 10/12/2025, o sin dependencia privada en los 6 meses previos al alta.',
          practicalExample:
            'Monotributista sin empleo en blanco contratado en julio de 2026: comprendido.',
          references: ['Ley 27.802 art. 157 inc. c'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'dec-315-art-4',
      lawId: LAW_ID,
      number: '4',
      title: 'Ingresos adicionales del trabajador',
      text:
        'La obtención de ingresos por parte del trabajador provenientes de otras actividades económicas luego del inicio de la relación laboral beneficiada por el Régimen de Incentivo a la Formalización Laboral (RIFL), ya sea bajo el régimen general de impuestos y recursos de la seguridad social o bajo el Régimen Simplificado para Pequeños Contribuyentes, no afectará los beneficios que le correspondan al empleador.',
      plainLanguageExplanation:
        'Si después de entrar al RIFL el trabajador empieza a tener otros ingresos (por ejemplo, sigue facturando como monotributista o abre otra actividad), eso no le quita el beneficio al empleador. El incentivo se mantiene aunque el trabajador tenga ingresos adicionales.',
      practicalEffects: [
        'El empleador no pierde el beneficio si el trabajador genera ingresos por otras actividades.',
        'El trabajador puede mantener su monotributo por otra actividad sin afectar al empleador.',
      ],
      examples: [
        'Una empleada bajo RIFL que además sigue vendiendo productos como monotributista: el empleador conserva la alícuota reducida.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['ingresos adicionales', 'monotributo', 'beneficio del empleador', 'otras actividades'],
      order: 4,
      segments: [
        {
          id: 'dec-315-art-4-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-315-art-4',
          articleNumber: '4',
          segmentType: 'PARAGRAPH',
          text:
            'La obtención de ingresos del trabajador por otras actividades económicas luego del inicio de la relación laboral beneficiada por el RIFL no afectará los beneficios que le correspondan al empleador.',
          plainExplanation:
            'Que el trabajador tenga ingresos por otras actividades no le hace perder el beneficio al empleador.',
          practicalExample:
            'Empleada bajo RIFL que además factura como monotributista: el empleador conserva la reducción.',
          references: [],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'dec-315-art-5',
      lawId: LAW_ID,
      number: '5',
      title: 'Sector público (art. 157 inc. d)',
      text:
        'A los fines del inciso d) del artículo 157 de la Ley N° 27.802 se entiende por sector público nacional, provincial, municipal o de la CIUDAD AUTÓNOMA DE BUENOS AIRES a aquel definido en los términos del artículo 8° de la Ley de Administración Financiera y de los Sistemas de Control del Sector Público Nacional N° 24.156 y sus modificaciones, y/o en las respectivas normas dictadas por las Provincias, la CIUDAD AUTÓNOMA DE BUENOS AIRES y las municipalidades, según corresponda.',
      plainLanguageExplanation:
        'Aclara qué se entiende por "sector público" a los fines del régimen: el definido por el artículo 8 de la Ley de Administración Financiera 24.156 (a nivel nacional) y por las normas equivalentes de provincias, CABA y municipios. Importa porque quien venía del sector público puede calificar como nueva incorporación al pasar al privado.',
      practicalEffects: [
        'Se usa la definición de sector público de la Ley 24.156 (art. 8).',
        'Para provincias, CABA y municipios rige su propia normativa de administración financiera.',
        'Permite identificar a quien proviene del empleo público y se incorpora al sector privado.',
      ],
      examples: [
        'Un empleado de un municipio que renuncia y es contratado por una empresa privada puede encuadrar como nueva incorporación del RIFL.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['sector público', 'artículo 157', 'ley 24156', 'administración financiera'],
      order: 5,
      segments: [
        {
          id: 'dec-315-art-5-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-315-art-5',
          articleNumber: '5',
          segmentType: 'PARAGRAPH',
          text:
            'Se entiende por sector público al definido en el artículo 8° de la Ley de Administración Financiera N° 24.156 y/o en las normas de Provincias, CABA y municipios según corresponda.',
          plainExplanation:
            'El "sector público" se define por el art. 8 de la Ley 24.156 y las normas equivalentes de cada jurisdicción.',
          practicalExample:
            'Un empleado municipal que pasa al sector privado puede ser nueva incorporación del RIFL.',
          references: ['Ley 27.802 art. 157 inc. d', 'Ley 24.156 art. 8'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'dec-315-art-6',
      lawId: LAW_ID,
      number: '6',
      title: 'Alcance del beneficio',
      text:
        'Por las nuevas relaciones laborales dadas de alta en el marco del Régimen de Incentivo a la Formalización Laboral (RIFL), el empleador deberá ingresar las contribuciones patronales conforme el régimen general aplicable, con las adecuaciones establecidas en el artículo 159 de la Ley N° 27.802 para los subsistemas allí mencionados, acorde las precisiones establecidas en el presente decreto, por los primeros CUARENTA Y OCHO (48) meses contados a partir del mes de alta de la nueva relación laboral, inclusive, en los términos y condiciones que a esos efectos establezca la AGENCIA DE RECAUDACIÓN Y CONTROL ADUANERO (ARCA).',
      plainLanguageExplanation:
        'El beneficio dura 48 meses contados desde el mes del alta. Durante ese período el empleador paga las contribuciones patronales con las alícuotas reducidas del artículo 159 de la Ley 27.802 (en vez de las del régimen general), según lo que reglamente ARCA. Pasados los 48 meses, vuelve al régimen general.',
      practicalEffects: [
        'La reducción de contribuciones rige por 48 meses desde el mes del alta.',
        'Se aplican las alícuotas del art. 159 de la Ley 27.802 a los subsistemas allí indicados.',
        'ARCA fija los términos y condiciones operativos de la liquidación.',
      ],
      examples: [
        'Alta en junio de 2026: el empleador goza de la reducción desde junio de 2026 hasta mayo de 2030 inclusive.',
      ],
      relatedArticles: ['dec-315-art-7'],
      jurisprudence: [],
      regulations: ['Resolución General ARCA 5844/2026'],
      keywords: ['alcance', '48 meses', 'contribuciones patronales', 'artículo 159', 'ARCA'],
      order: 6,
      segments: [
        {
          id: 'dec-315-art-6-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-315-art-6',
          articleNumber: '6',
          segmentType: 'PARAGRAPH',
          text:
            'El empleador ingresará las contribuciones patronales con las adecuaciones del artículo 159 de la Ley N° 27.802 por los primeros CUARENTA Y OCHO (48) meses contados a partir del mes de alta de la nueva relación laboral, inclusive.',
          plainExplanation:
            'La reducción de contribuciones (art. 159) rige por 48 meses desde el mes del alta.',
          practicalExample:
            'Alta en junio de 2026: beneficio de junio/2026 a mayo/2030 inclusive.',
          references: ['Ley 27.802 art. 159'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'dec-315-art-7',
      lawId: LAW_ID,
      number: '7',
      title: 'Aplicación de beneficios. Distribución de componentes',
      text:
        'Las contribuciones patronales que se determinen por la aplicación de la alícuota del DOS POR CIENTO (2 %) prevista en el inciso a) del artículo 159 de la Ley N° 27.802 se distribuirán entre el Sistema Integrado Previsional Argentino (SIPA), el Fondo Nacional de Empleo y el Régimen de Asignaciones Familiares en igual proporción a la que hubiera correspondido para la relación laboral beneficiada de no proceder su encuadre bajo el Régimen de Incentivo a la Formalización Laboral (RIFL), considerando exclusivamente los subsistemas mencionados. Las contribuciones patronales que se determinen por aplicación de la alícuota del TRES POR CIENTO (3 %) prevista en el inciso b) del artículo 159 de la Ley N° 27.802 tendrán destino al Subsistema regido por la Ley N° 19.032 (INSSJP). La AGENCIA DE RECAUDACIÓN Y CONTROL ADUANERO (ARCA) establecerá el procedimiento de liquidación e ingreso de las contribuciones a que se refieren los párrafos anteriores.',
      plainLanguageExplanation:
        'Explica cómo se reparten las contribuciones reducidas. La alícuota del 2% (inciso a del art. 159) se distribuye entre SIPA (jubilaciones), Fondo Nacional de Empleo y Asignaciones Familiares, en la misma proporción que tendrían sin el RIFL. La alícuota del 3% (inciso b) va íntegra al INSSJP (PAMI, Ley 19.032). ARCA define el procedimiento de liquidación.',
      practicalEffects: [
        'El 2% se reparte entre SIPA, Fondo de Empleo y Asignaciones Familiares.',
        'El 3% se destina íntegramente al INSSJP (PAMI).',
        'ARCA establece el procedimiento de liquidación e ingreso.',
      ],
      examples: [
        'Sobre un sueldo bajo RIFL, el empleador ingresa 2% repartido entre los tres subsistemas previsionales y de empleo, más 3% al PAMI.',
      ],
      relatedArticles: ['dec-315-art-6'],
      jurisprudence: [],
      regulations: ['Resolución General ARCA 5844/2026'],
      keywords: ['distribución', 'alícuotas', '2 por ciento', '3 por ciento', 'SIPA', 'INSSJP', 'PAMI', 'artículo 159'],
      order: 7,
      segments: [
        {
          id: 'dec-315-art-7-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-315-art-7',
          articleNumber: '7',
          segmentType: 'PARAGRAPH',
          text:
            'La alícuota del 2 % (art. 159 inc. a) se distribuye entre el SIPA, el Fondo Nacional de Empleo y el Régimen de Asignaciones Familiares; la del 3 % (art. 159 inc. b) tiene destino al INSSJP (Ley N° 19.032).',
          plainExplanation:
            'El 2% se reparte entre jubilaciones, empleo y asignaciones; el 3% va al PAMI.',
          practicalExample:
            'Sobre el sueldo bajo RIFL: 2% a los tres subsistemas + 3% al PAMI.',
          references: ['Ley 27.802 art. 159', 'Ley 19.032 (INSSJP)'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'dec-315-art-8',
      lawId: LAW_ID,
      number: '8',
      title: 'Artículo 76 de la Ley 27.802. Limitación',
      text:
        'La reducción de contribuciones patronales prevista en el artículo 76 de la Ley N° 27.802 no procederá respecto de las relaciones laborales incluidas en el Régimen de Incentivo a la Formalización Laboral (RIFL), mientras este les resulte aplicable. La contribución mensual con destino al Fondo de Asistencia Laboral (FAL) que, por esas mismas relaciones, pudiera corresponder al empleador conforme el artículo 60 de la mencionada ley seguirá siendo de carácter obligatorio.',
      plainLanguageExplanation:
        'Evita la doble reducción: mientras una relación esté en el RIFL, el empleador no puede además aplicarle la reducción del artículo 76 de la Ley 27.802. Y aclara que la contribución al Fondo de Asistencia Laboral (FAL) del artículo 60 sigue siendo obligatoria, no se exime.',
      practicalEffects: [
        'La reducción del art. 76 no se acumula con el RIFL.',
        'La contribución al FAL (art. 60) sigue siendo obligatoria para esas relaciones.',
      ],
      examples: [
        'Un empleado bajo RIFL no suma además el beneficio del art. 76, pero el empleador igual aporta al FAL.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['artículo 76', 'limitación', 'FAL', 'fondo de asistencia laboral', 'artículo 60'],
      order: 8,
      segments: [
        {
          id: 'dec-315-art-8-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-315-art-8',
          articleNumber: '8',
          segmentType: 'PARAGRAPH',
          text:
            'La reducción del artículo 76 de la Ley N° 27.802 no procede respecto de las relaciones incluidas en el RIFL mientras este les resulte aplicable; la contribución al Fondo de Asistencia Laboral (FAL) del artículo 60 sigue siendo obligatoria.',
          plainExplanation:
            'No se acumula la reducción del art. 76 con el RIFL, y el aporte al FAL sigue siendo obligatorio.',
          practicalExample:
            'Empleado bajo RIFL: sin beneficio del art. 76, pero con aporte al FAL.',
          references: ['Ley 27.802 art. 76', 'Ley 27.802 art. 60 (FAL)'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'dec-315-art-9',
      lawId: LAW_ID,
      number: '9',
      title: 'Pérdida de los beneficios',
      text:
        'Tanto el incumplimiento de las obligaciones previstas en el Título XX de la Ley N° 27.802 así como la configuración de cualquiera de las situaciones de exclusión indicadas en el artículo 160 de dicha ley producirán el decaimiento de los beneficios conforme el artículo 161 de la referida norma. La AGENCIA DE RECAUDACIÓN Y CONTROL ADUANERO (ARCA) instrumentará los controles sistémicos necesarios para tornar operativas las exclusiones automáticas previstas en el citado artículo 160, así como la forma, plazos y condiciones para la recomposición de las contribuciones no abonadas por aplicación de las alícuotas diferenciales del artículo 159 de la Ley N° 27.802, con más los intereses y sanciones que pudieran corresponder conforme la normativa vigente.',
      plainLanguageExplanation:
        'Si el empleador incumple las obligaciones del régimen o cae en alguna causal de exclusión del artículo 160, pierde el beneficio (decaimiento, art. 161). ARCA controla esto de forma automática y, cuando se pierde el beneficio, exige pagar la diferencia de contribuciones que se dejó de ingresar por las alícuotas reducidas, con intereses y sanciones.',
      practicalEffects: [
        'El incumplimiento o las exclusiones del art. 160 hacen perder el beneficio.',
        'ARCA aplica controles automáticos de exclusión.',
        'Al perder el beneficio se recomponen las contribuciones no pagadas, con intereses y sanciones.',
      ],
      examples: [
        'Si una empresa que adhirió al RIFL despide para volver a contratar y burlar el régimen, ARCA puede excluirla y reclamarle las contribuciones reducidas con intereses.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: ['Resolución General ARCA 5844/2026'],
      keywords: ['pérdida de beneficios', 'decaimiento', 'exclusiones', 'artículo 160', 'artículo 161', 'recomposición'],
      order: 9,
      segments: [
        {
          id: 'dec-315-art-9-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-315-art-9',
          articleNumber: '9',
          segmentType: 'PARAGRAPH',
          text:
            'El incumplimiento de las obligaciones del Título XX o las exclusiones del artículo 160 de la Ley N° 27.802 producen el decaimiento de los beneficios (art. 161). ARCA instrumenta los controles y la recomposición de las contribuciones no abonadas, con intereses y sanciones.',
          plainExplanation:
            'Incumplir o caer en una exclusión hace perder el beneficio; hay que recomponer lo no pagado con intereses.',
          practicalExample:
            'Maniobra para simular nuevas altas: ARCA excluye y reclama las contribuciones con intereses.',
          references: ['Ley 27.802 art. 160', 'Ley 27.802 art. 161', 'Ley 27.802 art. 159'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'dec-315-art-10',
      lawId: LAW_ID,
      number: '10',
      title: 'Ejercicio de la opción',
      text:
        'Los empleadores deberán ejercer la opción señalada en el artículo 162 de la Ley N° 27.802, mediante los mecanismos y sistemas que determine la AGENCIA DE RECAUDACIÓN Y CONTROL ADUANERO (ARCA).',
      plainLanguageExplanation:
        'El RIFL no es automático: el empleador tiene que optar expresamente por el régimen (como prevé el art. 162 de la ley), usando los sistemas que ARCA habilite. Sin ejercer la opción por los canales de ARCA, no accede al beneficio.',
      practicalEffects: [
        'El empleador debe ejercer la opción por el RIFL de forma expresa.',
        'La opción se canaliza por los sistemas que defina ARCA.',
      ],
      examples: [
        'El empleador selecciona el régimen RIFL en el sistema de ARCA al registrar el alta; si no lo hace, tributa por el régimen general.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: ['Resolución General ARCA 5844/2026'],
      keywords: ['opción', 'artículo 162', 'ARCA', 'adhesión'],
      order: 10,
      segments: [
        {
          id: 'dec-315-art-10-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-315-art-10',
          articleNumber: '10',
          segmentType: 'PARAGRAPH',
          text:
            'Los empleadores deberán ejercer la opción del artículo 162 de la Ley N° 27.802 mediante los mecanismos y sistemas que determine ARCA.',
          plainExplanation:
            'Hay que optar expresamente por el RIFL a través de los sistemas de ARCA.',
          practicalExample:
            'Seleccionar el RIFL en el sistema de ARCA al dar el alta.',
          references: ['Ley 27.802 art. 162'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'dec-315-art-11',
      lawId: LAW_ID,
      number: '11',
      title: 'Coordinación con planes y programas',
      text:
        'A los fines de lo previsto en el artículo 164 de la Ley N° 27.802, la AGENCIA DE RECAUDACIÓN Y CONTROL ADUANERO (ARCA) articulará con el MINISTERIO DE CAPITAL HUMANO los mecanismos de intercambio de información que resulten necesarios para posibilitar la continuidad de las prestaciones allí referidas, en el marco de las competencias de cada organismo y de la normativa aplicable.',
      plainLanguageExplanation:
        'Para que quien entra al empleo formal bajo el RIFL no pierda automáticamente prestaciones sociales que venía cobrando (artículo 164 de la ley), ARCA y el Ministerio de Capital Humano se intercambian información y coordinan la continuidad de esas prestaciones.',
      practicalEffects: [
        'ARCA y el Ministerio de Capital Humano intercambian información.',
        'Busca preservar la continuidad de prestaciones sociales del trabajador formalizado.',
      ],
      examples: [
        'Un beneficiario de un programa social que toma un empleo bajo RIFL: la coordinación entre ARCA y Capital Humano evita la baja abrupta de la prestación.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['coordinación', 'artículo 164', 'ministerio de capital humano', 'prestaciones', 'intercambio de información'],
      order: 11,
      segments: [
        {
          id: 'dec-315-art-11-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-315-art-11',
          articleNumber: '11',
          segmentType: 'PARAGRAPH',
          text:
            'ARCA articulará con el MINISTERIO DE CAPITAL HUMANO los mecanismos de intercambio de información necesarios para la continuidad de las prestaciones referidas en el artículo 164 de la Ley N° 27.802.',
          plainExplanation:
            'ARCA y Capital Humano coordinan para que el trabajador formalizado no pierda de golpe prestaciones sociales.',
          practicalExample:
            'Beneficiario de un programa social que entra al RIFL: se coordina la continuidad de la prestación.',
          references: ['Ley 27.802 art. 164'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'dec-315-art-12',
      lawId: LAW_ID,
      number: '12',
      title: 'Normas aclaratorias y complementarias',
      text:
        'Facúltase a la SECRETARÍA DE TRABAJO, EMPLEO Y SEGURIDAD SOCIAL del MINISTERIO DE CAPITAL HUMANO y a la AGENCIA DE RECAUDACIÓN Y CONTROL ADUANERO (ARCA) a dictar, en el ámbito de sus respectivas competencias, las normas aclaratorias y complementarias que resulten necesarias para la aplicación de los beneficios previstos en el referido Régimen.',
      plainLanguageExplanation:
        'Delega en la Secretaría de Trabajo y en ARCA la facultad de dictar las normas operativas que falten para aplicar el RIFL. Es la base legal de la que surge, por ejemplo, la Resolución General ARCA 5844/2026.',
      practicalEffects: [
        'La Secretaría de Trabajo y ARCA pueden dictar normas complementarias.',
        'Es el fundamento de las resoluciones operativas posteriores (p. ej. RG ARCA 5844/2026).',
      ],
      examples: [
        'La Resolución General ARCA 5844/2026, que fija la modalidad 710 y el procedimiento, se dicta con base en esta delegación.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: ['Resolución General ARCA 5844/2026'],
      keywords: ['normas complementarias', 'delegación', 'secretaría de trabajo', 'ARCA', 'facultad'],
      order: 12,
      segments: [
        {
          id: 'dec-315-art-12-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-315-art-12',
          articleNumber: '12',
          segmentType: 'PARAGRAPH',
          text:
            'Se faculta a la Secretaría de Trabajo, Empleo y Seguridad Social y a ARCA a dictar las normas aclaratorias y complementarias necesarias para aplicar el RIFL.',
          plainExplanation:
            'La Secretaría de Trabajo y ARCA pueden dictar las normas operativas que falten para el RIFL.',
          practicalExample:
            'La RG ARCA 5844/2026 se apoya en esta delegación.',
          references: [],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'dec-315-art-13',
      lawId: LAW_ID,
      number: '13',
      title: 'Vigencia',
      text:
        'El presente decreto entrará en vigencia el día de su publicación en el BOLETÍN OFICIAL.',
      plainLanguageExplanation:
        'El decreto rige desde su publicación en el Boletín Oficial (4 de mayo de 2026). No tiene un plazo de espera adicional.',
      practicalEffects: [
        'El decreto es exigible desde su publicación en el Boletín Oficial (4/5/2026).',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['vigencia', 'publicación', 'boletín oficial'],
      order: 13,
      segments: [
        {
          id: 'dec-315-art-13-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-315-art-13',
          articleNumber: '13',
          segmentType: 'PARAGRAPH',
          text:
            'El presente decreto entrará en vigencia el día de su publicación en el BOLETÍN OFICIAL.',
          plainExplanation:
            'Rige desde su publicación en el Boletín Oficial (4/5/2026).',
          practicalExample: null,
          references: [],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'dec-315-art-14',
      lawId: LAW_ID,
      number: '14',
      title: 'Forma',
      text:
        'Comuníquese, publíquese, dese a la DIRECCIÓN NACIONAL DEL REGISTRO OFICIAL y archívese.',
      plainLanguageExplanation:
        'Cláusula formal de cierre de todo decreto: ordena su publicación en el Boletín Oficial y su archivo en el Registro Oficial. El decreto está firmado por el presidente Javier Milei, el jefe de Gabinete Manuel Adorni, la ministra Sandra Pettovello y el ministro de Economía Luis Caputo.',
      practicalEffects: [
        'La publicación en el Boletín Oficial es el acto que le da vigencia erga omnes.',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['forma', 'comuníquese', 'registro oficial', 'cláusula de cierre'],
      order: 14,
      segments: [
        {
          id: 'dec-315-art-14-seg-1',
          lawId: LAW_ID,
          articleId: 'dec-315-art-14',
          articleNumber: '14',
          segmentType: 'PARAGRAPH',
          text:
            'Comuníquese, publíquese, dese a la DIRECCIÓN NACIONAL DEL REGISTRO OFICIAL y archívese.',
          plainExplanation:
            'Cláusula formal de cierre; ordena publicar y archivar el decreto. Firmado por Milei, Adorni, Pettovello y Caputo.',
          practicalExample: null,
          references: [],
          order: 1,
        },
      ],
      amendments: [],
    },
  ],
  segments: [],
  annexes: [],
  amendments: [],
  metadata: {
    id: 'meta-decreto-315-2026',
    lawId: LAW_ID,
    mainTopic: 'Régimen de Incentivo a la Formalización Laboral (RIFL)',
    subtopics: [
      'Reducción de contribuciones patronales',
      'Registración laboral ante ARCA',
      'Formalización del empleo',
      'Distribución de contribuciones a la seguridad social',
    ],
    relatedLaws: ['Ley 27.802', 'Ley 24.156', 'Ley 19.032'],
    regulations: ['Resolución General ARCA 5844/2026'],
    modifyingNorms: [],
    derogatingNorms: [],
    jurisprudence: [],
    doctrine: [],
    obligations: [
      'Registrar el alta de la nueva relación laboral ante ARCA dentro del período 1/5/2026 - 30/4/2027 (art. 1)',
      'Ingresar las contribuciones patronales con las alícuotas del art. 159 de la Ley 27.802 (art. 6)',
      'Mantener obligatoria la contribución al Fondo de Asistencia Laboral (FAL) (art. 8)',
    ],
    rights: [
      'Reducción de contribuciones patronales por 48 meses para las nuevas incorporaciones (art. 6)',
    ],
    sanctions: [
      'Decaimiento de los beneficios por incumplimiento o exclusiones del art. 160 de la Ley 27.802 (art. 9)',
    ],
    useCases: [
      'Calcular las contribuciones de un empleado contratado bajo el RIFL en 2026',
      'Determinar si un monotributista califica como nueva incorporación',
      'Saber por cuánto tiempo se mantiene la alícuota reducida',
    ],
    faq: [
      {
        question: '¿Qué es el RIFL y a quién beneficia?',
        answer:
          'El Régimen de Incentivo a la Formalización Laboral (RIFL), creado por el Título XX de la Ley 27.802 y reglamentado por el Decreto 315/2026, reduce las contribuciones patronales para las nuevas relaciones laborales registradas ante ARCA entre el 1° de mayo de 2026 y el 30 de abril de 2027. Beneficia al empleador del sector privado que contrata a trabajadores que no tenían empleo registrado al 10/12/2025 (o monotributistas sin dependencia en los últimos 6 meses), por los primeros 48 meses de la relación.',
      },
      {
        question: '¿Cuánto dura la reducción de contribuciones?',
        answer:
          'La reducción se aplica por los primeros 48 meses contados desde el mes del alta de la nueva relación laboral, inclusive (art. 6). Cumplido ese plazo, el empleador vuelve a tributar contribuciones por el régimen general.',
      },
      {
        question: '¿La reducción del RIFL se acumula con la del artículo 76 de la Ley 27.802?',
        answer:
          'No. Mientras la relación esté incluida en el RIFL no procede la reducción del artículo 76 (art. 8 del decreto). Además, la contribución al Fondo de Asistencia Laboral (FAL) del artículo 60 sigue siendo obligatoria.',
      },
    ],
    createdAt: '2026-05-04T00:00:00.000Z',
    updatedAt: '2026-05-04T00:00:00.000Z',
  },
};
