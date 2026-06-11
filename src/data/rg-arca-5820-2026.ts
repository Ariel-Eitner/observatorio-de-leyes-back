/**
 * Resolución General ARCA 5820/2026 — Régimen de Declaración Jurada Simplificada
 * del Impuesto a las Ganancias. VIGENTE (BO 09/02/2026).
 *
 * Norma operativa de ARCA que implementa el régimen creado por la Ley de
 * Inocencia Fiscal (27.799) y reglamentado por el Decreto 93/2026: regula la
 * adhesión, ratificación anual, requisitos, constancia, desistimiento, exclusión
 * y la exigencia de bancarización. Abroga la RG 5704.
 *
 * Fuente oficial: https://www.argentina.gob.ar/normativa/nacional/resoluci%C3%B3n-5820-2026-423037/texto
 */
import type { Law, Article } from '../common/types/law.types';

const LAW_ID = 'rg-arca-5820-2026';

function art(number: string, title: string, text: string, explanation: string): Article {
  const id = `${LAW_ID}-art-${number}`;
  return {
    id, lawId: LAW_ID, number, title, text,
    plainLanguageExplanation: explanation,
    practicalEffects: [], examples: [], relatedArticles: [], jurisprudence: [],
    regulations: [], keywords: [], order: Number(number),
    segments: [{
      id: `${id}-s1`, lawId: LAW_ID, articleId: id, articleNumber: number,
      segmentType: 'PARAGRAPH', text, plainExplanation: explanation,
      practicalExample: null, references: [], order: 0,
    }],
    amendments: [],
  };
}

const ARTICULOS: Article[] = [
  art('1', 'Alcance',
    `Las personas humanas y las sucesiones indivisas residentes en el país que cumplan las condiciones del artículo 38 de la Ley N° 27.799 y opten por la presentación y determinación del impuesto a las ganancias mediante el Régimen de Declaración Jurada Simplificada (el Régimen), deberán observar los procedimientos, formas, plazos y condiciones que se establecen en la presente. Quienes hubieran ejercido la opción de adhesión en los términos de la Resolución General N° 5.704 deberán formular, en su caso, la convalidación de acuerdo con el artículo 9° de esta resolución.`,
    `Define a quiénes aplica la norma operativa: las personas humanas y sucesiones que cumplen los requisitos de la Ley 27.799 y eligen el régimen simplificado. Quienes ya estaban en el régimen anterior (RG 5704) deben convalidar.`),
  art('2', 'Ejercicio de la opción de adhesión',
    `A fin de manifestar la opción de adhesión al Régimen, los contribuyentes deberán ingresar al servicio “Sistema Registral”, opción “Ganancias PH Simplificada”, disponible en https://www.arca.gob.ar, con Clave Fiscal nivel 3 o superior. La opción podrá ejercerse desde el primer día hábil del período fiscal respectivo y hasta el día del vencimiento general de la obligación de presentar la declaración jurada del impuesto a las ganancias de dicho período, inclusive. Al ejercer la opción, el contribuyente deberá confirmar, con carácter de declaración jurada, que cumple los parámetros objetivos (ingresos y patrimonio) del artículo 38 de la Ley N° 27.799.`,
    `Cómo adherirse en la práctica: en la web de ARCA, servicio "Sistema Registral" → "Ganancias PH Simplificada", con Clave Fiscal nivel 3+, hasta el vencimiento de la declaración del período. Hay que declarar que se cumplen los topes de ingresos y patrimonio.`),
  art('3', 'Ratificación anual',
    `La ratificación anual de permanencia en el Régimen (tercer párrafo del artículo 2° del Anexo del Decreto N° 93/2026) podrá realizarse, en tanto se cumplan los parámetros del artículo 38 de la Ley N° 27.799, a través del mismo servicio. Podrá efectuarse al presentar la declaración jurada simplificada del período anterior al período a ratificar, o con posterioridad y hasta el vencimiento general de la obligación de presentación de la declaración del período fiscal que se ratifica.`,
    `Para seguir en el régimen, cada año hay que ratificar que se siguen cumpliendo los requisitos, por el mismo sistema, hasta el vencimiento de la declaración del período.`),
  art('4', 'Requisitos verificados por ARCA',
    `Al ejercer la opción de adhesión o al ratificar, ARCA verificará que los contribuyentes: a) No posean la CUIT con estado administrativo limitado (CUIT digital observada o sujetos del art. 3° de la RG 3.832); b) No estén comprendidos en la órbita de la Subdirección General de Operaciones Impositivas de Grandes Contribuyentes (RG 5.670) al 31 de diciembre del año anterior y durante los dos períodos fiscales anteriores; c) Registren el alta en el impuesto a las ganancias. Verificadas las condiciones, el sistema emite un acuse de recibo y el contribuyente queda caracterizado con el código “639-Ganancias Simplificado Ley 27799”, consultable en el “Sistema Registral”.`,
    `ARCA controla automáticamente tres cosas para dejarte entrar: que tu CUIT no esté observada, que no seas gran contribuyente y que estés dado de alta en Ganancias. Si todo está bien, te etiqueta con el código 639.`),
  art('5', 'Constancia de adhesión',
    `El ejercicio de la opción de adhesión o la ratificación anual podrán acreditarse mediante la constancia de inscripción de la Resolución General N° 1.817, disponible en https://www.arca.gob.ar, que contendrá los datos del artículo 2° del Anexo del Decreto N° 93/26 y la caracterización indicada, constituyendo instrumento probatorio con el alcance del artículo 5° de dicho Anexo. La ausencia de los datos de caracterización en la constancia se considerará indicativa de que el sujeto no se encuentra adherido, ha desistido o ha sido excluido.`,
    `La adhesión se prueba con la constancia de inscripción de ARCA, que muestra la caracterización 639. Si esa marca no aparece, significa que la persona no está (o ya no está) en el régimen.`),
  art('6', 'Consulta de terceros',
    `La condición acreditada y su vigencia podrán ser consultadas por terceros interesados —entidades financieras u otros obligados a comprobar la situación fiscal de los sujetos con los que operan— a través del procedimiento de consulta del artículo 3° de la Resolución General N° 1.817. La constancia obtenida constituirá elemento probatorio suficiente de la condición del contribuyente frente al Régimen.`,
    `Los bancos y sujetos obligados al control antilavado pueden consultar si una persona está en el régimen (la constancia les sirve como prueba), conectando con la idea de la constancia como "antecedente favorable".`),
  art('7', 'Desistimiento del régimen',
    `Los contribuyentes podrán desistir de la opción de adhesión en cualquier momento anterior a la presentación de la declaración jurada del período por el cual se hubiere ejercido, ingresando al “Sistema Registral”, opción “Ganancias PH Simplificada”. El desistimiento produce efectos respecto de ese período fiscal y no implica la baja en el impuesto a las ganancias, debiendo cumplirse las obligaciones del régimen general (RG 5.692). La presentación de la declaración jurada del período conforme al régimen general importará el desistimiento automático de la opción simplificada. Lo mismo aplica al desistimiento de la convalidación o ratificación anual.`,
    `Te podés bajar del régimen antes de presentar la declaración del período, por el mismo sistema. Si presentás la declaración por el régimen general, ya se entiende que desististe. Bajarte no te da de baja de Ganancias.`),
  art('8', 'Exclusión del régimen',
    `Cuando ARCA detecte el incumplimiento de alguno de los requisitos del artículo 38 de la Ley N° 27.799 a los efectos de la opción, la convalidación o la ratificación, notificará al contribuyente en el Domicilio Fiscal Electrónico para que, dentro de los QUINCE (15) días hábiles administrativos, formule aclaraciones, rectificaciones o descargos y acompañe la documentación respaldatoria. El descargo se efectúa por el servicio “Presentaciones Digitales” (RG 5.126), trámite “Disconformidad sobre exclusión del Régimen de Declaración Jurada Simplificada - Ley 27799”. Vencido el plazo sin presentación, o cuando el incumplimiento se verifique objetivamente, ARCA dispondrá la exclusión mediante acto administrativo notificado en el Domicilio Fiscal Electrónico. El excluido deberá cumplir el régimen general (RG 5.692) respecto del período observado.`,
    `Si ARCA detecta que no cumplís los requisitos, te avisa al domicilio fiscal electrónico y tenés 15 días hábiles para descargar tu defensa por "Presentaciones Digitales". Si no respondés o el incumplimiento se confirma, te excluye por acto administrativo y pasás al régimen general.`),
  art('9', 'Disposiciones transitorias — Convalidación de la opción de la RG 5.704',
    `Los contribuyentes que hubieran ejercido la opción de adhesión en los términos de la Resolución General N° 5.704 por el período fiscal 2025 (en el marco del art. 3° del Decreto N° 353/25) y que cumplan los requisitos del artículo 38 de la Ley N° 27.799 y del artículo 4° de la presente, deberán convalidar dicha adhesión para quedar comprendidos en el Régimen y gozar de sus efectos. La convalidación deberá efectuarse hasta el vencimiento general de la declaración jurada de ganancias del período fiscal 2025, inclusive, por el servicio del artículo 2°, confirmando con carácter de declaración jurada el cumplimiento de los parámetros de ingresos y patrimonio. De no mediar convalidación, se tendrá por desistida la opción simplificada para ese período y el contribuyente deberá cumplir el régimen general (RG 5.692).`,
    `Quienes ya se habían anotado bajo la norma anterior (RG 5704) por 2025 tienen que "convalidar" su adhesión antes del vencimiento de la declaración 2025, confirmando que cumplen los topes. Si no convalidan, se considera que desistieron y van al régimen general.`),
  art('10', 'Disposiciones generales — Operaciones financieras (bancarización)',
    `A los fines del artículo 4° del Anexo del Decreto N° 93/26, se considera que los activos utilizados en las operaciones se encuentran incorporados al sistema financiero formal: a) en el origen, cuando los activos usados para el pago ya estaban incorporados al sistema financiero formal antes de la operación, en la cuenta bancaria, cuenta comitente, cuenta en un Proveedor de Servicios de Activos Virtuales (PSAV) inscripto en la CNV y/o billetera virtual del pagador; b) en el destino, cuando el pago se realice mediante depósito en las cuentas bancarias o billetera virtual, o transferencia a una cuenta comitente o a una cuenta en un PSAV inscripto en la CNV del receptor. No se considera verificada la incorporación en el destino cuando el receptor la perciba en efectivo o por medios ajenos al sistema financiero, aun si después lo deposita. El incumplimiento hará pasible al contribuyente de las sanciones de la Ley N° 11.683 y dará lugar a las facultades de fiscalización y verificación de ARCA.`,
    `Define qué significa "bancarizar": el dinero tiene que pasar por el sistema financiero formal —cuenta bancaria, comitente, PSAV de la CNV o billetera virtual— en el origen o el destino del pago. Cobrar en efectivo no cuenta, aunque después lo deposites, y habilita sanciones y fiscalización.`),
  art('11', 'Abrogación de la RG 5.704',
    `Abrogar la Resolución General N° 5.704, sin perjuicio de su aplicación a los hechos acaecidos durante su vigencia.`,
    `Deja sin efecto la resolución anterior (RG 5704), que reglamentaba la versión previa del régimen, salvo para hechos ocurridos mientras estuvo vigente.`),
  art('12', 'Vigencia y aplicación',
    `La presente resolución general entrará en vigencia el día siguiente al de su publicación en el Boletín Oficial y será de aplicación respecto de las declaraciones juradas del impuesto a las ganancias correspondientes al período fiscal 2025 y siguientes. El servicio “Sistema Registral”, opción “Ganancias PH Simplificada”, se encontrará disponible para efectuar la adhesión y/o convalidación y/o desistimiento a partir del 11 de febrero de 2026.`,
    `Rige desde el día siguiente a su publicación (10/02/2026) y se aplica a las declaraciones de Ganancias del período fiscal 2025 en adelante. El sistema online para adherir, convalidar o desistir está disponible desde el 11/02/2026.`),
  art('13', 'Comunicación',
    `Comuníquese, dese a la Dirección Nacional del Registro Oficial para su publicación en el Boletín Oficial y archívese.`,
    `Cláusula formal de cierre: ordena publicar la resolución en el Boletín Oficial y archivarla.`),
];

export const RG_ARCA_5820_2026: Law = {
  id: LAW_ID,
  number: '5820/2026',
  title: 'RG ARCA 5820/2026 — Régimen de Declaración Jurada Simplificada de Ganancias',
  commonName: 'RG ARCA 5820/2026 (Ganancias Simplificada)',
  shortCode: 'RG ARCA 5820/2026',
  aliases: ['5820/2026', 'RG 5820/2026', 'RG ARCA 5820/2026', 'Ganancias PH Simplificada', 'Ganancias Simplificado'],
  isDestacada: false,
  summary:
    'Resolución General ARCA 5820/2026: implementa operativamente el Régimen de Declaración Jurada Simplificada del impuesto a las ganancias de la Ley de Inocencia Fiscal (27.799) y su Decreto reglamentario 93/2026. Regula cómo se adhiere ("Sistema Registral" / "Ganancias PH Simplificada"), la ratificación anual, los requisitos que ARCA verifica, la constancia de adhesión (código 639), el desistimiento, la exclusión y la exigencia de bancarizar las operaciones. Abroga la RG 5704.',
  category: 'tributario',
  categories: ['tributario'],
  year: 2026,
  sanctionDate: '2026-02-08',
  promulgationDate: '2026-02-09',
  publicationDate: '2026-02-09',
  effectiveDate: '2026-02-10',
  derogatedDate: null,
  boNumber: '35848',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'RESOLUCION',
  issuingBody: 'Agencia de Recaudación y Control Aduanero (ARCA)',
  fullText: null,
  sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/resoluci%C3%B3n-5820-2026-423037/texto',
  articleCount: 13,
  topics: ['Ganancias simplificada', 'Inocencia fiscal', 'Adhesión', 'ARCA', 'Bancarización'],
  keywords: [
    'rg 5820/2026', 'ganancias ph simplificada', 'inocencia fiscal', 'declaración jurada simplificada',
    'adhesión', 'ratificación', 'código 639', 'ARCA', 'sistema registral', 'tributario',
  ],
  relatedNorms: ['ley-27799', 'decreto-93-2026'],
  relations: [
    {
      type: 'REGLAMENTA',
      targetLawId: 'ley-27799',
      targetLawLabel: 'Ley de Inocencia Fiscal',
      description: 'La RG ARCA 5820/2026 implementa operativamente el Régimen de Declaración Jurada Simplificada del impuesto a las ganancias creado por el Capítulo III del Título II de la Ley 27.799.',
    },
    {
      type: 'COMPLEMENTA',
      targetLawId: 'decreto-93-2026',
      targetLawLabel: 'Decreto 93/2026',
      description: 'Dictada por ARCA en ejercicio de la facultad del artículo 7° del Decreto 93/2026, concreta el procedimiento, los plazos y los requisitos de su Anexo.',
    },
  ],
  executiveSummary:
    'Publicada el 9 de febrero de 2026 y vigente desde el día siguiente, la RG ARCA 5820/2026 es la norma operativa del Régimen de Declaración Jurada Simplificada de Ganancias. Define el procedimiento concreto: la adhesión se ejerce en el "Sistema Registral" (opción "Ganancias PH Simplificada") con Clave Fiscal nivel 3, hasta el vencimiento de la declaración del período; cada año hay que ratificar la permanencia; ARCA verifica que la CUIT no esté observada, que el contribuyente no sea gran contribuyente y que tenga alta en Ganancias, y lo caracteriza con el código 639. Regula la constancia de adhesión (oponible a terceros y bancos), el desistimiento, la exclusión y la exigencia de bancarizar las operaciones. Abroga la RG 5704.',
  objective:
    'Implementar operativamente el Régimen de Declaración Jurada Simplificada de Ganancias: fijar la forma, los plazos y las condiciones de la adhesión, la ratificación, el desistimiento y la exclusión.',
  problemItSolves:
    'La necesidad de pasos concretos para usar el régimen simplificado: dónde se adhiere, qué se valida, cómo se prueba y qué pasa si no se bancarizan las operaciones.',
  practicalImpact:
    'Permite que millones de personas humanas declaren Ganancias confirmando una declaración precargada por ARCA, con el efecto liberatorio y la presunción de exactitud de la Ley de Inocencia Fiscal, siempre que adhieran en el sistema y canalicen sus operaciones por el sistema financiero formal.',
  affectedSubjects: ['Personas humanas', 'Sucesiones indivisas', 'ARCA', 'Entidades financieras', 'PSAV'],
  articles: ARTICULOS,
  segments: [],
  annexes: [],
  amendments: [],
  metadata: {
    id: `${LAW_ID}-meta`,
    lawId: LAW_ID,
    mainTopic: 'Implementación operativa del Régimen de Declaración Jurada Simplificada de Ganancias',
    subtopics: ['Adhesión', 'Ratificación anual', 'Constancia (código 639)', 'Desistimiento', 'Bancarización'],
    relatedLaws: ['Ley 27.799', 'Decreto 93/2026', 'RG 5704 (abrogada)'],
    regulations: [], modifyingNorms: [], derogatingNorms: [],
    jurisprudence: [], doctrine: [], obligations: [], rights: [], sanctions: [], useCases: [],
    faq: [
      {
        question: '¿Cómo me adhiero al Régimen Simplificado de Ganancias?',
        answer: 'En la web de ARCA (arca.gob.ar), servicio "Sistema Registral", opción "Ganancias PH Simplificada", con Clave Fiscal nivel 3 o superior, desde el primer día hábil del período hasta el vencimiento de la declaración jurada. Hay que confirmar, como declaración jurada, que se cumplen los topes de ingresos y patrimonio. Quedás caracterizado con el código 639.',
      },
      {
        question: '¿Qué pasa si pago en efectivo y no por el sistema financiero?',
        answer: 'El régimen exige bancarizar: las operaciones deben canalizarse por el sistema financiero formal (cuenta bancaria, comitente, PSAV inscripto en la CNV o billetera virtual) en el origen o el destino. Cobrar en efectivo no cumple el requisito y puede hacer perder los beneficios y habilitar la fiscalización.',
      },
    ],
    createdAt: '2026-06-11T00:00:00.000Z',
    updatedAt: '2026-06-11T00:00:00.000Z',
  },
  createdAt: '2026-06-11T00:00:00.000Z',
  updatedAt: '2026-06-11T00:00:00.000Z',
};

export default RG_ARCA_5820_2026;
