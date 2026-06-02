import type { Law } from '../common/types/law.types';

const LAW_ID = 'rg-arca-5844-2026';

// ════════════════════════════════════════════════════════════════════════════
//  RESOLUCIÓN GENERAL ARCA 5844/2026 — Procedimiento operativo del RIFL
//  Dictada: 05/05/2026  |  Publicada: 06/05/2026 (BO)
//  Reglamenta operativamente el Régimen de Incentivo a la Formalización Laboral
//  (RIFL) de la Ley 27.802 y el Decreto 315/2026: modalidad de contratación 710,
//  alícuotas, registración y declaraciones juradas. 11 artículos.
//  Fuente: https://www.boletinoficial.gob.ar/detalleAviso/primera/341630/20260506
// ════════════════════════════════════════════════════════════════════════════

export const RG_ARCA_5844_2026: Law = {
  id: LAW_ID,
  number: '5844/2026',
  title: 'Resolución General ARCA 5844/2026 — Procedimiento operativo del Régimen de Incentivo a la Formalización Laboral (RIFL)',
  commonName: 'RG ARCA 5844/2026 (procedimiento del RIFL)',
  summary:
    'Establece el procedimiento, formas, plazos y condiciones para aplicar los beneficios del Régimen de Incentivo a la Formalización Laboral (RIFL) de la Ley 27.802, reglamentado por el Decreto 315/2026. Define la registración por el código de modalidad de contratación 710 en "Simplificación Registral", la tabla de alícuotas reducidas (total 5 %), el uso del sistema "Declaración en línea" (release 7 de la versión 47), las causales de exclusión (REPSAL y uso abusivo) y los efectos del decaimiento.',
  year: 2026,
  sanctionDate: '2026-05-05',
  promulgationDate: '2026-05-05',
  publicationDate: '2026-05-06',
  effectiveDate: '2026-05-06',
  derogatedDate: null,
  boNumber: null,
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'RESOLUCION',
  issuingBody: 'Agencia de Recaudación y Control Aduanero (ARCA)',
  fullText: null,
  sourceUrl: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/341630/20260506',
  articleCount: 11,
  topics: [
    'Régimen de Incentivo a la Formalización Laboral (RIFL)',
    'Contribuciones patronales',
    'Registración laboral',
    'Simplificación Registral',
    'Declaración en línea',
    'Seguridad social',
  ],
  keywords: [
    'RIFL',
    'RG ARCA 5844',
    'modalidad 710',
    'simplificación registral',
    'declaración en línea',
    'alícuotas',
    'contribuciones patronales',
    'ley 27802',
    'decreto 315/2026',
    'ARCA',
    'formalización laboral',
    'REPSAL',
    'release 7 versión 47',
  ],
  relatedNorms: [
    'Ley 27.802 (Modernización Laboral)',
    'Decreto 315/2026',
    'Resolución General ARCA 3.960 (Declaración en línea)',
    'Ley 19.032 (INSSJP)',
  ],
  relations: [],
  executiveSummary:
    'La RG ARCA 5844/2026 es la norma operativa que hace funcionar el RIFL en la práctica. Indica al empleador cómo dar de alta a un trabajador bajo el régimen: mediante el código de modalidad de contratación 710 en "Simplificación Registral", liquidando las contribuciones con el release 7 de la versión 47 del sistema "Declaración en línea", que aplica automáticamente la tabla de alícuotas reducidas (SIPA 1,31 %, Asignaciones Familiares 0,57 %, Fondo Nacional de Empleo 0,12 % e INSSJP 3 %, total 5 %). El beneficio rige por el período fiscal del alta más los 47 siguientes (48 en total). Fija las exclusiones (estar en el REPSAL o incurrir en uso abusivo) y los efectos del decaimiento (rectificar declaraciones juradas y pagar diferencias, intereses y multas).',
  objective:
    'Tornar operativo el RIFL: fijar el procedimiento de registración (código 710), la mecánica de liquidación de contribuciones reducidas y las condiciones de exclusión y decaimiento del beneficio.',
  problemItSolves:
    'La Ley 27.802 y el Decreto 315/2026 crean y reglamentan el RIFL, pero la aplicación concreta requería instrucciones operativas de ARCA: qué código usar al registrar el alta, qué versión del sistema liquida las alícuotas reducidas y cómo proceder en caso de exclusión. Esta resolución resuelve esa parte práctica.',
  practicalImpact:
    'Un empleador que quiera usar el RIFL debe registrar el alta con el código de modalidad de contratación 710 en "Simplificación Registral" y liquidar las contribuciones con el release 7 de la versión 47 de "Declaración en línea", que aplica el 5 % total de contribuciones de forma automática. El beneficio dura 48 períodos fiscales. Si el empleador está en el REPSAL o realiza maniobras abusivas (sustituir personal, cerrar y reabrir como otra figura), queda excluido y debe rectificar y pagar diferencias con intereses y multas.',
  affectedSubjects: [
    'Empleadores del sector privado que adhieren al RIFL',
    'Trabajadores incorporados bajo el código de modalidad 710',
    'ARCA (registración, liquidación y control)',
    'Empleadores incorporados al REPSAL',
    'Sistema "Declaración en línea" y "Simplificación Registral"',
  ],
  createdAt: '2026-05-06T00:00:00.000Z',
  updatedAt: '2026-05-06T00:00:00.000Z',

  articles: [
    {
      id: 'rg-arca-5844-art-1',
      lawId: LAW_ID,
      number: '1',
      title: 'Alcance',
      text:
        'Establécese el procedimiento, las formas, los plazos y demás condiciones para la aplicación de los beneficios del Régimen de Incentivo a la Formalización Laboral (RIFL) previsto en el Título XX de la Ley N° 27.802 y reglamentado por el Decreto N° 315/26.',
      plainLanguageExplanation:
        'Define para qué sirve la resolución: fijar el "cómo" operativo del RIFL (procedimiento, formas, plazos y condiciones). Es la norma que baja a la práctica lo que la Ley 27.802 y el Decreto 315/2026 establecieron en general.',
      practicalEffects: [
        'Es la guía operativa del RIFL para empleadores y ARCA.',
        'Complementa a la Ley 27.802 (Título XX) y al Decreto 315/2026.',
      ],
      examples: [
        'Un contador que necesita saber cómo registrar un alta bajo el RIFL encuentra acá el procedimiento concreto.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['alcance', 'RIFL', 'procedimiento', 'ley 27802', 'decreto 315/2026'],
      order: 1,
      segments: [
        {
          id: 'rg-arca-5844-art-1-seg-1',
          lawId: LAW_ID,
          articleId: 'rg-arca-5844-art-1',
          articleNumber: '1',
          segmentType: 'PARAGRAPH',
          text:
            'Establécese el procedimiento, las formas, los plazos y demás condiciones para la aplicación de los beneficios del RIFL previsto en el Título XX de la Ley N° 27.802 y reglamentado por el Decreto N° 315/26.',
          plainExplanation:
            'Fija el procedimiento operativo del RIFL, complementando la Ley 27.802 y el Decreto 315/2026.',
          practicalExample:
            'Es donde un contador encuentra el "cómo" para registrar un alta bajo el RIFL.',
          references: ['Ley 27.802 Título XX', 'Decreto 315/2026'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'rg-arca-5844-art-2',
      lawId: LAW_ID,
      number: '2',
      title: 'Sujetos comprendidos',
      text:
        'Se encuentran alcanzados por dicho régimen los empleadores del sector privado comprendidos en el artículo 156 de la Ley N° 27.802, por cada nuevo trabajador incorporado entre el 1 de mayo de 2026 y el 30 de abril de 2027, ambas fechas inclusive.',
      plainLanguageExplanation:
        'Define quiénes pueden usar el régimen: los empleadores del sector privado que el artículo 156 de la Ley 27.802 comprende, por cada trabajador nuevo que incorporen dentro de la ventana del 1/5/2026 al 30/4/2027. El beneficio se cuenta por trabajador incorporado, no por empresa.',
      practicalEffects: [
        'Aplica a empleadores del sector privado (art. 156 de la Ley 27.802).',
        'El beneficio se computa por cada nuevo trabajador incorporado en el período.',
        'La ventana es del 1/5/2026 al 30/4/2027.',
      ],
      examples: [
        'Una pyme que toma 3 empleados nuevos en el período puede aplicar el beneficio por cada uno de los 3.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['sujetos comprendidos', 'empleadores', 'artículo 156', 'sector privado', 'nuevo trabajador'],
      order: 2,
      segments: [
        {
          id: 'rg-arca-5844-art-2-seg-1',
          lawId: LAW_ID,
          articleId: 'rg-arca-5844-art-2',
          articleNumber: '2',
          segmentType: 'PARAGRAPH',
          text:
            'Están alcanzados los empleadores del sector privado comprendidos en el artículo 156 de la Ley N° 27.802, por cada nuevo trabajador incorporado entre el 1 de mayo de 2026 y el 30 de abril de 2027.',
          plainExplanation:
            'Pueden usar el régimen los empleadores privados del art. 156, por cada nuevo trabajador del período.',
          practicalExample:
            'Pyme que toma 3 empleados nuevos en el período: beneficio por cada uno.',
          references: ['Ley 27.802 art. 156'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'rg-arca-5844-art-3',
      lawId: LAW_ID,
      number: '3',
      title: 'Alícuotas aplicables',
      text:
        'Las alícuotas de contribuciones patronales previstas en el artículo 159 de la Ley N° 27.802 serán aplicadas y distribuidas entre los diferentes subsistemas de la seguridad social conforme el siguiente detalle: Sistema Integrado Previsional Argentino (SIPA): UNO CON TREINTA Y UNO POR CIENTO (1,31 %); Régimen de Asignaciones Familiares: CERO CON CINCUENTA Y SIETE POR CIENTO (0,57 %); Fondo Nacional de Empleo (FNE): CERO CON DOCE POR CIENTO (0,12 %); Instituto Nacional de Servicios Sociales para Jubilados y Pensionados (INSSJP): TRES POR CIENTO (3,00 %); Total: CINCO POR CIENTO (5,00 %).',
      plainLanguageExplanation:
        'Detalla la tabla de alícuotas reducidas del RIFL. En total el empleador paga 5 % de contribuciones patronales (en lugar de las del régimen general), repartido así: 1,31 % a jubilaciones (SIPA), 0,57 % a Asignaciones Familiares, 0,12 % al Fondo Nacional de Empleo y 3 % al PAMI (INSSJP).',
      practicalEffects: [
        'La contribución patronal total bajo RIFL es del 5 %.',
        'Se reparte: SIPA 1,31 %, Asignaciones Familiares 0,57 %, FNE 0,12 %, INSSJP 3 %.',
        'Reemplaza las alícuotas del régimen general durante el beneficio.',
      ],
      examples: [
        'Sobre una remuneración de $1.000.000, las contribuciones patronales bajo RIFL son $50.000 (5 %), distribuidas según la tabla.',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['alícuotas', '5 por ciento', 'SIPA', 'asignaciones familiares', 'FNE', 'INSSJP', 'artículo 159'],
      order: 3,
      segments: [
        {
          id: 'rg-arca-5844-art-3-seg-1',
          lawId: LAW_ID,
          articleId: 'rg-arca-5844-art-3',
          articleNumber: '3',
          segmentType: 'PARAGRAPH',
          text:
            'Alícuotas del artículo 159 de la Ley N° 27.802: SIPA 1,31 %; Asignaciones Familiares 0,57 %; Fondo Nacional de Empleo 0,12 %; INSSJP 3,00 %; Total 5,00 %.',
          plainExplanation:
            'El empleador paga 5 % total de contribuciones: 1,31 % SIPA, 0,57 % Asig. Familiares, 0,12 % FNE, 3 % PAMI.',
          practicalExample:
            'Sobre $1.000.000 de sueldo: $50.000 de contribuciones bajo RIFL.',
          references: ['Ley 27.802 art. 159', 'Ley 19.032 (INSSJP)'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'rg-arca-5844-art-4',
      lawId: LAW_ID,
      number: '4',
      title: 'Registración',
      text:
        'Los empleadores deberán registrar a cada nuevo trabajador incorporado durante el período previsto en el artículo 1° del Decreto N° 315/26, mediante el servicio denominado "Simplificación Registral", utilizando el siguiente código de modalidad de contratación: 710.',
      plainLanguageExplanation:
        'Indica el paso concreto para acceder al beneficio: al dar de alta al trabajador en "Simplificación Registral", el empleador debe usar el código de modalidad de contratación 710. Ese código es lo que marca al trabajador como incluido en el RIFL.',
      practicalEffects: [
        'El alta se hace en "Simplificación Registral" con el código de modalidad 710.',
        'El código 710 identifica al trabajador como beneficiario del RIFL.',
        'Sin ese código, el alta no accede a las alícuotas reducidas.',
      ],
      examples: [
        'Al cargar el alta de un empleado nuevo, el empleador selecciona la modalidad de contratación 710 para encuadrarlo en el RIFL.',
      ],
      relatedArticles: ['rg-arca-5844-art-6'],
      jurisprudence: [],
      regulations: [],
      keywords: ['registración', 'simplificación registral', 'código 710', 'modalidad de contratación', 'alta'],
      order: 4,
      segments: [
        {
          id: 'rg-arca-5844-art-4-seg-1',
          lawId: LAW_ID,
          articleId: 'rg-arca-5844-art-4',
          articleNumber: '4',
          segmentType: 'PARAGRAPH',
          text:
            'Los empleadores deberán registrar a cada nuevo trabajador en "Simplificación Registral" utilizando el código de modalidad de contratación 710.',
          plainExplanation:
            'El alta se registra con el código de modalidad 710 en "Simplificación Registral".',
          practicalExample:
            'Al dar el alta, seleccionar modalidad 710 para encuadrar al empleado en el RIFL.',
          references: ['Decreto 315/2026 art. 1'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'rg-arca-5844-art-5',
      lawId: LAW_ID,
      number: '5',
      title: 'Utilización del beneficio',
      text:
        'El beneficio de reducción de alícuotas previsto en el artículo 159 de la Ley N° 27.802 se aplicará a partir del período fiscal correspondiente al inicio de la nueva relación laboral y en los CUARENTA Y SIETE (47) períodos fiscales siguientes.',
      plainLanguageExplanation:
        'Precisa la duración exacta del beneficio en términos fiscales: se aplica desde el período fiscal en que arranca la relación laboral y por los 47 períodos siguientes, es decir, 48 períodos fiscales en total (consistente con los 48 meses del Decreto 315/2026).',
      practicalEffects: [
        'El beneficio cubre el período fiscal del alta más 47 períodos siguientes (48 en total).',
        'Equivale a los 48 meses previstos en el Decreto 315/2026.',
      ],
      examples: [
        'Alta con período fiscal de inicio mayo/2026: el beneficio corre hasta abril/2030 inclusive (48 períodos).',
      ],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['utilización', 'beneficio', '48 períodos', '47 períodos siguientes', 'artículo 159'],
      order: 5,
      segments: [
        {
          id: 'rg-arca-5844-art-5-seg-1',
          lawId: LAW_ID,
          articleId: 'rg-arca-5844-art-5',
          articleNumber: '5',
          segmentType: 'PARAGRAPH',
          text:
            'El beneficio se aplica a partir del período fiscal del inicio de la relación laboral y en los CUARENTA Y SIETE (47) períodos fiscales siguientes.',
          plainExplanation:
            'Dura 48 períodos fiscales: el del alta más 47 siguientes.',
          practicalExample:
            'Inicio en mayo/2026: beneficio hasta abril/2030 inclusive.',
          references: ['Ley 27.802 art. 159', 'Decreto 315/2026 art. 6'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'rg-arca-5844-art-6',
      lawId: LAW_ID,
      number: '6',
      title: 'Declaración jurada, determinación e ingreso de aportes y contribuciones',
      text:
        'A los efectos de la determinación nominativa e ingreso de los aportes y contribuciones con destino a la seguridad social, en el sistema "Declaración en línea" regulado por la Resolución General N° 3.960, sus modificatorias y complementarias, deberá utilizarse el código de modalidad de contratación indicado en el artículo 4º de la presente resolución general para identificar a los trabajadores alcanzados por la adecuación de las alícuotas de contribuciones patronales, independientemente de que sea a jornada completa o parcial. A dichos fines, este Organismo pondrá a disposición de los empleadores el release 7 de la versión 47 del mencionado sistema, el que permitirá aplicar las nuevas alícuotas de las contribuciones patronales en forma automática, y cuya información vinculada estará disponible en el micrositio "Declaración en línea" del sitio web institucional (https://www.arca.gob.ar/declaracionenlinea/).',
      plainLanguageExplanation:
        'Explica cómo se liquidan las contribuciones: en el sistema "Declaración en línea" (regulado por la RG 3.960), usando el código de modalidad 710 del artículo 4 para identificar a los trabajadores del RIFL, sea a jornada completa o parcial. ARCA habilita el release 7 de la versión 47 del sistema, que aplica las alícuotas reducidas automáticamente.',
      practicalEffects: [
        'Las contribuciones se liquidan en "Declaración en línea" (RG 3.960).',
        'Se usa el código de modalidad 710 para identificar a los trabajadores del RIFL.',
        'El release 7 de la versión 47 aplica las alícuotas reducidas automáticamente.',
        'Aplica tanto a jornada completa como parcial.',
      ],
      examples: [
        'El estudio contable actualiza a la versión 47 release 7 de "Declaración en línea" y el sistema calcula solo el 5 % para los empleados con modalidad 710.',
      ],
      relatedArticles: ['rg-arca-5844-art-4'],
      jurisprudence: [],
      regulations: ['Resolución General ARCA 3.960'],
      keywords: ['declaración en línea', 'RG 3960', 'release 7 versión 47', 'código 710', 'aportes y contribuciones'],
      order: 6,
      segments: [
        {
          id: 'rg-arca-5844-art-6-seg-1',
          lawId: LAW_ID,
          articleId: 'rg-arca-5844-art-6',
          articleNumber: '6',
          segmentType: 'PARAGRAPH',
          text:
            'En el sistema "Declaración en línea" (RG N° 3.960) debe usarse el código de modalidad de contratación del artículo 4° para identificar a los trabajadores del RIFL; ARCA habilita el release 7 de la versión 47, que aplica las alícuotas reducidas automáticamente.',
          plainExplanation:
            'Se liquida en "Declaración en línea" con el código 710; el release 7 v47 aplica el 5 % automáticamente.',
          practicalExample:
            'Actualizar a la versión 47 release 7: el sistema calcula solo 5 % para los empleados con modalidad 710.',
          references: ['Resolución General ARCA 3.960'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'rg-arca-5844-art-7',
      lawId: LAW_ID,
      number: '7',
      title: 'Exclusión del régimen',
      text:
        'Resultarán excluidos del beneficio de reducción de alícuotas de las contribuciones patronales establecido en el artículo 159 de la Ley N° 27.802, los empleadores que: a) Se encontraren incorporados en el "Registro Público de Empleadores con Sanciones Laborales" (REPSAL), durante el período en que permanezcan en él. b) Hubieren incurrido en prácticas de uso abusivo del beneficio establecido por el mencionado Título. Será considerada práctica de uso abusivo el hecho de producir sustituciones de personal bajo cualquier figura, o el cese como empleador y la constitución de una nueva figura como tal, ya sea a través de las mismas o distintas personas humanas o jurídicas.',
      plainLanguageExplanation:
        'Lista quiénes quedan afuera del beneficio: (a) los empleadores que estén en el REPSAL (registro de empleadores sancionados), mientras permanezcan en él; y (b) los que usen el régimen de forma abusiva. Se considera abuso, por ejemplo, echar gente y recontratarla como "nueva" para acceder a la rebaja, o cerrar la empresa y abrir otra figura para lo mismo.',
      practicalEffects: [
        'Estar en el REPSAL excluye del beneficio mientras dure la inscripción.',
        'Sustituir personal bajo cualquier figura para simular nuevas altas es uso abusivo.',
        'Cerrar como empleador y reabrir como otra figura también es uso abusivo.',
      ],
      examples: [
        'Una empresa que despide empleados y los recontrata como "nuevos" para pagar el 5 % queda excluida por uso abusivo.',
      ],
      relatedArticles: ['rg-arca-5844-art-8'],
      jurisprudence: [],
      regulations: [],
      keywords: ['exclusión', 'REPSAL', 'uso abusivo', 'sustitución de personal', 'artículo 159'],
      order: 7,
      segments: [
        {
          id: 'rg-arca-5844-art-7-seg-1',
          lawId: LAW_ID,
          articleId: 'rg-arca-5844-art-7',
          articleNumber: '7',
          segmentType: 'PARAGRAPH',
          text:
            'Quedan excluidos los empleadores incorporados al REPSAL (mientras permanezcan en él) y los que incurran en uso abusivo del beneficio, considerándose abuso la sustitución de personal bajo cualquier figura o el cese y reconstitución como nueva figura.',
          plainExplanation:
            'Excluye a quienes están en el REPSAL y a quienes simulan nuevas altas (recontratar gente o reabrir como otra figura).',
          practicalExample:
            'Despedir y recontratar empleados como "nuevos" para pagar 5 %: excluido por abuso.',
          references: ['Ley 27.802 art. 159', 'REPSAL'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'rg-arca-5844-art-8',
      lawId: LAW_ID,
      number: '8',
      title: 'Decaimiento del régimen. Efectos',
      text:
        'El incumplimiento de las obligaciones previstas en el Título XX de la Ley N° 27.802 o el acaecimiento de las situaciones indicadas en el artículo anterior -conforme lo previsto en el artículo 160 de la citada ley-, producirán el decaimiento del beneficio de reducción de alícuotas de las contribuciones patronales debiendo el empleador presentar las declaraciones juradas rectificativas correspondientes y abonar las diferencias, sus intereses y las multas pertinentes por los períodos fiscales que correspondan.',
      plainLanguageExplanation:
        'Explica qué pasa cuando se pierde el beneficio: si el empleador incumple las obligaciones del Título XX de la ley o cae en una causal de exclusión del artículo anterior (conforme el art. 160 de la ley), el beneficio decae. Como consecuencia, debe rectificar las declaraciones juradas y pagar la diferencia de contribuciones que no ingresó, con intereses y multas.',
      practicalEffects: [
        'El incumplimiento o la exclusión hacen decaer el beneficio.',
        'El empleador debe presentar declaraciones juradas rectificativas.',
        'Debe pagar las diferencias de contribuciones con intereses y multas.',
      ],
      examples: [
        'Una empresa excluida por uso abusivo debe rectificar y pagar la diferencia entre el 5 % aplicado y las contribuciones del régimen general, con intereses y multas.',
      ],
      relatedArticles: ['rg-arca-5844-art-7'],
      jurisprudence: [],
      regulations: [],
      keywords: ['decaimiento', 'efectos', 'declaraciones juradas rectificativas', 'diferencias', 'intereses', 'multas', 'artículo 160'],
      order: 8,
      segments: [
        {
          id: 'rg-arca-5844-art-8-seg-1',
          lawId: LAW_ID,
          articleId: 'rg-arca-5844-art-8',
          articleNumber: '8',
          segmentType: 'PARAGRAPH',
          text:
            'El incumplimiento de las obligaciones del Título XX o las situaciones del artículo anterior (art. 160 de la Ley N° 27.802) producen el decaimiento del beneficio; el empleador debe rectificar las declaraciones juradas y abonar diferencias, intereses y multas.',
          plainExplanation:
            'Perder el beneficio obliga a rectificar y pagar la diferencia con intereses y multas.',
          practicalExample:
            'Empresa excluida: paga la diferencia entre el 5 % y el régimen general, con intereses y multas.',
          references: ['Ley 27.802 art. 160', 'Ley 27.802 Título XX'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'rg-arca-5844-art-9',
      lawId: LAW_ID,
      number: '9',
      title: 'Disposiciones generales',
      text:
        'La obligación de utilización del release 7 de la versión 47 del sistema "Declaración en línea" comprende las presentaciones de declaraciones juradas correspondientes al período devengado mayo de 2026 y siguientes, así como las presentaciones de declaraciones juradas -originales o rectificativas- correspondientes a períodos anteriores, que se efectúen a partir de la fecha de vigencia de la presente resolución general.',
      plainLanguageExplanation:
        'Aclara desde cuándo es obligatorio el nuevo sistema: el release 7 de la versión 47 de "Declaración en línea" debe usarse para las declaraciones juradas del período devengado mayo de 2026 en adelante, y también para cualquier declaración (original o rectificativa) de períodos anteriores que se presente después de la entrada en vigencia de la resolución.',
      practicalEffects: [
        'El release 7 v47 es obligatorio desde el período devengado mayo/2026.',
        'También aplica a declaraciones de períodos anteriores presentadas tras la vigencia.',
      ],
      examples: [
        'Una rectificativa de abril/2026 presentada en junio/2026 debe hacerse con el release 7 de la versión 47.',
      ],
      relatedArticles: ['rg-arca-5844-art-6'],
      jurisprudence: [],
      regulations: [],
      keywords: ['disposiciones generales', 'release 7 versión 47', 'declaración en línea', 'período devengado', 'mayo 2026'],
      order: 9,
      segments: [
        {
          id: 'rg-arca-5844-art-9-seg-1',
          lawId: LAW_ID,
          articleId: 'rg-arca-5844-art-9',
          articleNumber: '9',
          segmentType: 'PARAGRAPH',
          text:
            'El uso del release 7 de la versión 47 de "Declaración en línea" es obligatorio para las declaraciones juradas del período devengado mayo de 2026 y siguientes, y para las de períodos anteriores presentadas a partir de la vigencia de la resolución.',
          plainExplanation:
            'El release 7 v47 rige desde el devengado mayo/2026, también para rectificativas anteriores posteriores a la vigencia.',
          practicalExample:
            'Rectificativa de abril/2026 presentada en junio/2026: con release 7 v47.',
          references: [],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'rg-arca-5844-art-10',
      lawId: LAW_ID,
      number: '10',
      title: 'Vigencia',
      text:
        'Las disposiciones de la presente resolución general entrarán en vigencia el día de su publicación en el Boletín Oficial, y resultarán de aplicación para las declaraciones juradas correspondientes al período devengado mayo de 2026 y siguientes. Aquellas altas de trabajadores registradas en el sistema "Simplificación Registral", entre el 1 de mayo de 2026 y la puesta en vigencia de la presente resolución general, se podrán rectificar -en caso de cumplir con las pautas y requisitos establecidos- habilitando el código de modalidad de contratación previsto en el artículo 4° de la presente.',
      plainLanguageExplanation:
        'Fija desde cuándo rige y resuelve la transición. La resolución rige desde su publicación y se aplica a las declaraciones del devengado mayo/2026 en adelante. Para no perjudicar a quienes ya habían dado altas entre el 1/5/2026 y la vigencia sin el código correcto, permite rectificar esas altas habilitando el código de modalidad 710, si cumplen los requisitos.',
      practicalEffects: [
        'Rige desde su publicación en el Boletín Oficial (6/5/2026).',
        'Se aplica a las declaraciones del período devengado mayo/2026 y siguientes.',
        'Las altas previas (1/5/2026 a la vigencia) se pueden rectificar para habilitar el código 710.',
      ],
      examples: [
        'Un empleador que dio el alta el 2/5/2026 sin el código 710 puede rectificarla para encuadrarla en el RIFL.',
      ],
      relatedArticles: ['rg-arca-5844-art-4'],
      jurisprudence: [],
      regulations: [],
      keywords: ['vigencia', 'rectificación de altas', 'código 710', 'período devengado', 'transición'],
      order: 10,
      segments: [
        {
          id: 'rg-arca-5844-art-10-seg-1',
          lawId: LAW_ID,
          articleId: 'rg-arca-5844-art-10',
          articleNumber: '10',
          segmentType: 'PARAGRAPH',
          text:
            'La resolución entra en vigencia con su publicación y se aplica a las declaraciones del devengado mayo de 2026 y siguientes; las altas registradas entre el 1 de mayo de 2026 y la vigencia se pueden rectificar habilitando el código de modalidad del artículo 4°.',
          plainExplanation:
            'Rige desde la publicación; las altas previas sin el código 710 se pueden rectificar para entrar al RIFL.',
          practicalExample:
            'Alta del 2/5/2026 sin código 710: se puede rectificar para encuadrarla en el RIFL.',
          references: ['Decreto 315/2026 art. 1'],
          order: 1,
        },
      ],
      amendments: [],
    },
    {
      id: 'rg-arca-5844-art-11',
      lawId: LAW_ID,
      number: '11',
      title: 'Comuníquese (artículo de forma)',
      text:
        'Comuníquese, dese a la DIRECCIÓN NACIONAL DEL REGISTRO OFICIAL para su publicación en el Boletín Oficial y archívese.',
      plainLanguageExplanation:
        'Cláusula formal de cierre de la resolución: ordena su publicación en el Boletín Oficial y su archivo. La resolución está firmada por Andrés Edgardo Vázquez, Director Ejecutivo de ARCA.',
      practicalEffects: [
        'La publicación en el Boletín Oficial le da vigencia a la resolución.',
      ],
      examples: [],
      relatedArticles: [],
      jurisprudence: [],
      regulations: [],
      keywords: ['forma', 'comuníquese', 'registro oficial', 'cláusula de cierre'],
      order: 11,
      segments: [
        {
          id: 'rg-arca-5844-art-11-seg-1',
          lawId: LAW_ID,
          articleId: 'rg-arca-5844-art-11',
          articleNumber: '11',
          segmentType: 'PARAGRAPH',
          text:
            'Comuníquese, dese a la DIRECCIÓN NACIONAL DEL REGISTRO OFICIAL para su publicación en el Boletín Oficial y archívese.',
          plainExplanation:
            'Cláusula formal de cierre; ordena publicar y archivar. Firmada por Andrés Edgardo Vázquez (Director Ejecutivo de ARCA).',
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
    id: 'meta-rg-arca-5844-2026',
    lawId: LAW_ID,
    mainTopic: 'Procedimiento operativo del Régimen de Incentivo a la Formalización Laboral (RIFL)',
    subtopics: [
      'Código de modalidad de contratación 710',
      'Alícuotas reducidas de contribuciones patronales',
      'Declaración en línea (release 7 versión 47)',
      'Exclusiones y decaimiento del beneficio',
    ],
    relatedLaws: ['Ley 27.802', 'Decreto 315/2026', 'Resolución General ARCA 3.960', 'Ley 19.032'],
    regulations: [],
    modifyingNorms: [],
    derogatingNorms: [],
    jurisprudence: [],
    doctrine: [],
    obligations: [
      'Registrar el alta con el código de modalidad de contratación 710 en "Simplificación Registral" (art. 4)',
      'Liquidar las contribuciones con el release 7 de la versión 47 de "Declaración en línea" (arts. 6 y 9)',
      'En caso de decaimiento, presentar declaraciones juradas rectificativas y pagar diferencias, intereses y multas (art. 8)',
    ],
    rights: [
      'Aplicación automática de la alícuota reducida del 5 % por 48 períodos fiscales (arts. 3 y 5)',
    ],
    sanctions: [
      'Exclusión del beneficio por figurar en el REPSAL o por uso abusivo (art. 7)',
      'Decaimiento del beneficio con obligación de rectificar y pagar diferencias, intereses y multas (art. 8)',
    ],
    useCases: [
      'Registrar un alta bajo el RIFL con el código de modalidad 710',
      'Calcular las contribuciones reducidas (5 %) de un trabajador del RIFL',
      'Rectificar altas registradas entre el 1/5/2026 y la vigencia de la resolución',
    ],
    faq: [
      {
        question: '¿Cómo se registra un alta bajo el RIFL?',
        answer:
          'En el servicio "Simplificación Registral", utilizando el código de modalidad de contratación 710 (art. 4). Ese código identifica al trabajador como incluido en el RIFL y habilita la liquidación de las contribuciones con las alícuotas reducidas en el sistema "Declaración en línea".',
      },
      {
        question: '¿Cuál es la alícuota de contribuciones patronales del RIFL?',
        answer:
          'El total es del 5 %, distribuido en SIPA 1,31 %, Asignaciones Familiares 0,57 %, Fondo Nacional de Empleo 0,12 % e INSSJP 3 % (art. 3). El release 7 de la versión 47 de "Declaración en línea" la aplica automáticamente.',
      },
      {
        question: '¿Qué pasa si el empleador hace un uso abusivo del beneficio?',
        answer:
          'Queda excluido del régimen (art. 7). Se considera uso abusivo sustituir personal bajo cualquier figura o cesar como empleador y reconstituirse como otra figura. La exclusión también alcanza a quienes figuren en el REPSAL. Al producirse el decaimiento, el empleador debe rectificar las declaraciones juradas y pagar las diferencias con intereses y multas (art. 8).',
      },
    ],
    createdAt: '2026-05-06T00:00:00.000Z',
    updatedAt: '2026-05-06T00:00:00.000Z',
  },
};
