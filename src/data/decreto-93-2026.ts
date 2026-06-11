/**
 * Decreto 93/2026 — Reglamentación de la Ley de Inocencia Fiscal (27.799). VIGENTE (BO 09/02/2026).
 *
 * Cuerpo del decreto (arts. 1-10) + ANEXO "Reglamentación del Capítulo III del
 * Título II de la Ley 27.799" (arts. 1-16 del Anexo, en 4 capítulos). El Anexo
 * regula el procedimiento operativo del Régimen de Declaración Jurada Simplificada.
 *
 * Fuente oficial: https://www.argentina.gob.ar/normativa/nacional/decreto-93-2026-423013/texto
 */
import type { Law, Article } from '../common/types/law.types';

const LAW_ID = 'decreto-93-2026';

function art(number: string, title: string, text: string, explanation: string, order?: number): Article {
  const id = `${LAW_ID}-art-${number.replace(/\s+/g, '-')}`;
  return {
    id, lawId: LAW_ID, number, title, text,
    plainLanguageExplanation: explanation,
    practicalEffects: [], examples: [], relatedArticles: [], jurisprudence: [],
    regulations: [], keywords: [], order: order ?? Number(number),
    segments: [{
      id: `${id}-s1`, lawId: LAW_ID, articleId: id, articleNumber: number,
      segmentType: 'PARAGRAPH', text, plainExplanation: explanation,
      practicalExample: null, references: [], order: 0,
    }],
    amendments: [],
  };
}

const ARTICULOS: Article[] = [
  // ── Cuerpo del decreto ─────────────────────────────────────────────────────
  art('1', 'Aprobación de la reglamentación',
    `Apruébase la Reglamentación del Capítulo III del Título II de la Ley Nº 27.799, que como ANEXO (IF-2026-13648372-APN-SSIP#MEC) forma parte integrante del presente decreto.`,
    `Aprueba la reglamentación detallada del Régimen de Declaración Jurada Simplificada, que va en el Anexo del decreto (sus artículos 1 a 16).`),
  art('2', 'Regularización y discrepancia significativa (Decreto 1397/79)',
    `Incorpóranse como artículos sin número a continuación del artículo 53 del Decreto Nº 1397/1979 y sus modificaciones los siguientes: “Artículo…- De acuerdo con el artículo 56, inciso a) de la ley se entiende que el saldo de la declaración jurada se encuentra regularizado cuando se hubiere cancelado en su totalidad o cuando se hubiere adherido a un plan de facilidades de pago de ARCA, dentro del plazo de vencimiento. Artículo…- La discrepancia significativa del primer artículo sin número agregado a continuación del artículo 56 de la ley se considerará configurada cuando ARCA verifique: a. un incremento del saldo a favor del organismo (o reducción de quebrantos/saldos a favor) por un porcentaje no inferior al quince por ciento (15%); o b. una diferencia que supere el importe del artículo 1° del Régimen Penal Tributario (Título IX de la Ley 27.430). Si el ajuste surge de facturas o documentos apócrifos, la discrepancia queda configurada con independencia del importe. No se considera la diferencia entre la declaración original y la rectificativa espontánea presentada antes de la notificación de la orden de intervención”.`,
    `Reglamenta cuándo se considera "regularizado" el saldo (pago total o plan de pagos en término) y precisa el concepto de "discrepancia significativa" del art. 56 (15%, umbral penal, o facturas truchas), aclarando que la rectificación espontánea previa a la fiscalización no cuenta como discrepancia.`),
  art('3', 'Regularización en obligaciones previsionales',
    `Entiéndese, a los fines de los artículos 24 de la Ley 23.660, 47 de la Ley 23.661 y 16 de la Ley 14.236, según la reforma de los artículos 35, 36 y 37 de la Ley 27.799, que el saldo de la respectiva declaración jurada, liquidación u otro instrumento se encuentra regularizado cuando se hubiere cancelado en su totalidad o cuando se hubiere adherido a un plan de facilidades de pago de ARCA, dentro del plazo de vencimiento de la respectiva obligación.`,
    `Aplica el mismo criterio de "regularización" (pago total o plan de pagos en término) a los aportes y contribuciones de obras sociales, seguro de salud y previsión social, para acceder a la prescripción reducida.`),
  art('4', 'Discrepancia significativa en lo previsional',
    `La discrepancia significativa de los últimos párrafos de los artículos 24 de la Ley 23.660, 47 de la Ley 23.661 y 16 de la Ley 14.236 se considerará configurada cuando se verifique: a. un incremento a favor del organismo en aportes, contribuciones u otras obligaciones previsionales por un porcentaje no inferior al quince por ciento (15%) respecto del monto declarado; o b. una diferencia que supere el importe del artículo 5° del Régimen Penal Tributario (Título IX de la Ley 27.430). Si el ajuste surge de documentación apócrifa, queda configurada con independencia del importe. No se considera la rectificativa espontánea previa al inicio de la fiscalización.`,
    `Define la "discrepancia significativa" para los aportes y contribuciones previsionales (15%, umbral penal del art. 5, o documentación apócrifa), en línea con el criterio impositivo.`),
  art('5', 'Convalidación de adhesiones previas (Decreto 353/2025)',
    `Los contribuyentes que hubieran adherido a la modalidad simplificada de declaración jurada prevista en el Decreto N° 353 del 22 de mayo de 2025 y su modificatorio deberán convalidar dicha adhesión a fin de acreditar el cumplimiento de los parámetros del Régimen del Capítulo III del Título II de la Ley N° 27.799, en las condiciones que determine la AGENCIA DE RECAUDACIÓN Y CONTROL ADUANERO (ARCA).`,
    `Quienes ya estaban en el régimen simplificado anterior (Decreto 353/2025) deben confirmar su adhesión y demostrar que cumplen los nuevos requisitos de la Ley 27.799.`),
  art('6', 'Importe aplicable a sanciones y delitos',
    `Las sanciones por incumplimientos a los deberes formales de la Ley 11.683 se cancelarán considerando: a. las cometidas antes de la vigencia de la Ley 27.799, el importe vigente al momento del incumplimiento; b. las cometidas a partir de la vigencia, el monto vigente al momento de su cancelación. Para evaluar los delitos del Régimen Penal Tributario por hechos anteriores a la vigencia, se consideran los importes del Título I de la Ley 27.799; por hechos posteriores, el importe vigente al momento de su comisión.`,
    `Aclara qué monto se usa para sanciones y delitos según cuándo ocurrió el hecho: para los anteriores a la ley, el importe de entonces; para los posteriores, el vigente al momento del pago (sanciones) o de la comisión (delitos). Evita aplicar retroactivamente montos viejos en perjuicio del contribuyente.`),
  art('7', 'ARCA dicta las normas operativas',
    `La AGENCIA DE RECAUDACIÓN Y CONTROL ADUANERO (ARCA), en el marco de su competencia, dictará las normas complementarias y operativas necesarias para la efectiva aplicación de lo dispuesto en el presente decreto y su correspondiente ANEXO.`,
    `Delega en ARCA el dictado de las normas operativas (que se concretaron en la RG ARCA 5820/2026).`),
  art('8', 'Vigencia',
    `El presente decreto entrará en vigencia a partir de su dictado.`,
    `El decreto rige desde su dictado (8 de febrero de 2026).`),
  art('9', 'Comunicación a ARCA',
    `Comuníquese a la AGENCIA DE RECAUDACIÓN Y CONTROL ADUANERO (ARCA).`,
    `Ordena comunicar el decreto a ARCA.`),
  art('10', 'Comunicación y publicación',
    `Comuníquese, publíquese, dese a la DIRECCIÓN NACIONAL DEL REGISTRO OFICIAL y archívese.`,
    `Fórmula final de comunicación y publicación del decreto.`),
  // ── ANEXO · Cap. I — Disposiciones generales ───────────────────────────────
  art('Anexo 1', 'Ámbito subjetivo y residencia',
    `Establécese que, a los fines de definir la condición de residente prevista en el artículo 38 de la Ley 27.799, para el período fiscal de la opción de adhesión y para los de permanencia en el Régimen, deberán considerarse las disposiciones del Capítulo I del Título VIII de la Ley de Impuesto a las Ganancias, texto ordenado en 2019 y sus modificaciones.`,
    `Para saber quién es "residente" y puede entrar al régimen simplificado, se usan las reglas de residencia de la Ley de Impuesto a las Ganancias.`, 101),
  art('Anexo 2', 'Opción de adhesión y constancia digital',
    `La opción de adhesión al Régimen podrá ejercerse para los períodos fiscales iniciados a partir del 1° de enero de 2025, inclusive, y se considerará cumplida cuando los sujetos del artículo 38 la manifiesten por el mecanismo que prevea ARCA. Ejercida la opción, ARCA emitirá una constancia digital de adhesión, con carácter de instrumento probatorio, que contendrá como mínimo: a) la identificación del contribuyente; b) la fecha de la opción; c) el período fiscal desde el cual se ejerció. ARCA dispondrá un mecanismo para que los adheridos ratifiquen anualmente el cumplimiento de los requisitos o soliciten la baja. Los adheridos deben cumplir sus obligaciones del Impuesto a las Ganancias conforme el procedimiento simplificado.`,
    `Cómo se adhiere: desde el período fiscal 2025, manifestando la opción en el sistema de ARCA, que emite una constancia digital. Hay que ratificar cada año que se siguen cumpliendo los requisitos (o darse de baja).`, 102),
  art('Anexo 3', 'Verificación de requisitos (ingresos, patrimonio, gran contribuyente)',
    `El cumplimiento de los requisitos del primer párrafo del artículo 38 se verificará: 1. Ingresos totales (gravados, exentos y/o no gravados, de fuente argentina o extranjera): individualmente, en el período 1/1 al 31/12 del año anterior al de la opción o ratificación, y en cada uno de los dos (2) años fiscales anteriores, con independencia de la condición de contribuyente. Se consideran todas las ganancias, beneficios y entradas de fondos propios, salvo reembolsos de capital. 2. Patrimonio total (bienes en el país y en el exterior, valuados según el Título VI de la Ley 23.966): al 31/12 del año anterior y de los dos años anteriores. 3. No calificar como "grandes contribuyentes nacionales" según el criterio de ARCA, en el mismo período. Si ARCA detecta el incumplimiento de los requisitos, aplicará el último párrafo del artículo 38 (exclusión del Régimen), quedando facultada para establecer la forma de exclusión.`,
    `Detalla cómo ARCA controla los topes: los ingresos (hasta $1.000 millones) se miran año por año en los últimos 3 años; el patrimonio (hasta $10.000 millones) al 31/12 de cada uno; y que no seas gran contribuyente. Si no cumplís, te excluye.`, 103),

  // ── Cap. II — Operaciones en el marco del Régimen ──────────────────────────
  art('Anexo 4', 'Incorporación de los fondos al sistema financiero',
    `Quienes opten por el Régimen deberán canalizar sus operaciones utilizando los medios autorizados por el BANCO CENTRAL DE LA REPÚBLICA ARGENTINA y/o la COMISIÓN NACIONAL DE VALORES (CNV) a sus sujetos regulados, entendiéndose cumplida la exigencia cuando la utilización de esos medios en el sistema financiero formal se produzca en el origen o en el destino de la operación, en las condiciones que establezca ARCA. Se ratifica la vigencia del Decreto N° 22 del 11 de enero de 2001.`,
    `Para estar en el régimen hay que bancarizar: las operaciones deben pasar por el sistema financiero formal (bancos, mercado de capitales), al menos en el origen o el destino. Es la contracara de la "inocencia": trazabilidad para prevenir lavado.`, 104),
  art('Anexo 5', 'Alcance de la constancia de adhesión (antilavado)',
    `Sin perjuicio de las obligaciones de la Ley 25.246 (prevención del lavado de activos), la constancia digital de adhesión al Régimen deberá ser considerada por las entidades financieras y demás sujetos obligados como un antecedente favorable en la identificación y monitoreo de las operaciones. ARCA establecerá servicios de consulta automatizados y/o API para que las entidades validen la situación del cliente respecto del Régimen (adherido, excluido o de baja).`,
    `La constancia de adhesión es un punto a favor del cliente ante bancos y sujetos obligados al control antilavado. ARCA dará un sistema (API) para que las entidades verifiquen si alguien está en el régimen.`, 105),

  // ── Cap. III — Procedimiento ───────────────────────────────────────────────
  art('Anexo 6', 'Modalidad y fuentes de información (declaración precargada)',
    `La modalidad simplificada consistirá en una declaración jurada precargada por ARCA a partir de la información disponible en sus sistemas y la provista por responsables y/o terceros, que el contribuyente podrá modificar, confirmar y presentar. ARCA considerará exclusivamente: a) los ingresos brutos del período (fuente argentina y extranjera) según la Ley de Impuesto a las Ganancias; y b) las deducciones computables conforme esa ley y su reglamentación. Los adheridos quedan exceptuados de la obligación de los párrafos segundo y tercero del artículo 3° de la Reglamentación de Ganancias (Decreto 862/2019).`,
    `El núcleo operativo: ARCA te arma la declaración con lo que ya sabe (tus ingresos y deducciones) y vos la confirmás o corregís. Solo mira ingresos brutos y deducciones, no tu variación patrimonial ni tus consumos.`, 106),
  art('Anexo 7', 'Período fiscal base',
    `Entiéndase como "período fiscal base" al período fiscal en el cual el contribuyente, habiendo ejercido la opción de adhesión o ratificado la permanencia, hubiere presentado la Declaración Jurada Simplificada del Impuesto a las Ganancias y cumplido, en su caso, con el pago en término del gravamen, conforme el artículo 39 de la Ley 27.799.`,
    `Define el "período fiscal base": el año por el cual presentaste y pagaste la declaración simplificada. Es el período que dispara el efecto liberatorio y la presunción de exactitud.`, 107),
  art('Anexo 8', 'Efecto liberatorio del pago',
    `El sujeto que, habiendo adherido al Régimen, cumplimente sus obligaciones del Impuesto a las Ganancias y pague en término el gravamen (si resultare saldo a favor del fisco), gozará del efecto liberatorio del pago respecto del Impuesto a las Ganancias de ese período fiscal base. Se considera satisfecho el "pago en término" cuando el impuesto se cancela en su totalidad, o cuando se adhiere a un plan de facilidades de pago de ARCA, dentro del plazo de vencimiento de la obligación.`,
    `Confirma el beneficio: si pagás en término (o entrás a un plan de pagos a tiempo), tu Ganancias de ese año queda saldado y cerrado.`, 108),
  art('Anexo 9', 'Impugnación y pérdida del efecto liberatorio',
    `El efecto liberatorio del pago sobre el período fiscal base se mantendrá, excepto que ARCA verifique alguna de las circunstancias del artículo 39, in fine, de la Ley 27.799 (omisión de ingresos, deducción improcedente o facturas apócrifas) y detecte una diferencia que constituya una discrepancia significativa en los términos del segundo párrafo del artículo 40 de la ley y del artículo 11 del presente Anexo, en cuyo caso procederá a la impugnación de la declaración jurada.`,
    `El beneficio se pierde solo si ARCA detecta omisión de ingresos, una deducción improcedente o facturas truchas, Y eso configura una discrepancia significativa. Recién ahí puede impugnar tu declaración.`, 109),
  art('Anexo 10', 'Definiciones de las causales del art. 39',
    `A los fines del artículo 39 in fine de la Ley 27.799 se entenderá por: i) Omisión en la declaración de ingresos: la no inclusión —total o parcial— de la renta bruta que debía declarar en el período base, sin considerar la variación patrimonial originada en ingresos de períodos anteriores (depósitos bancarios, bienes registrables y otros). ii) Cómputo de una deducción improcedente: la deducción no admitida conforme las normas vigentes en el período, salvo que aplique el inciso iii). iii) Utilización de facturas u otros documentos apócrifos correspondientes al período base, con independencia del importe involucrado.`,
    `Define con precisión las tres causales que hacen perder el beneficio: ocultar ingresos del año (no tu patrimonio viejo), deducir algo no permitido, o usar facturas truchas. Acota mucho cuándo ARCA puede reabrir.`, 110),
  art('Anexo 11', 'Discrepancia significativa (período base)',
    `La discrepancia significativa se considerará configurada respecto del período fiscal base cuando, habiendo acaecido alguna causal del artículo 39 in fine, ARCA verifique: a) un incremento del saldo del Impuesto a las Ganancias a favor del organismo (o reducción de quebranto/saldos a favor) por un porcentaje no inferior al quince por ciento (15%) respecto del declarado; o b) una diferencia que supere el importe del artículo 1° del Régimen Penal Tributario (Título IX de la Ley 27.430). Si el ajuste surge de facturas o documentos apócrifos, queda configurada con independencia del importe. En todos los casos, conforme el primer párrafo del artículo 40 de la ley, la carga de la prueba recae exclusivamente sobre ARCA, que solo podrá considerar la información declarada y la disponible en sus sistemas o proporcionada por terceros.`,
    `Reitera el umbral de la discrepancia significativa (15%, monto penal, o facturas truchas) para el período base y subraya un punto central de la "inocencia": la carga de la prueba es de ARCA, no del contribuyente.`, 111),
  art('Anexo 12', 'Rectificación y subsanación',
    `A los fines de la discrepancia significativa, no se considerará la diferencia entre la declaración jurada original y la rectificativa espontánea efectuada por el contribuyente respecto del período base con anterioridad a la notificación de la orden de intervención de ARCA. Los mismos efectos producirá la rectificación en los supuestos de facturas o documentos apócrifos, cuando la rectificativa se presente antes de la notificación del acto de determinación de oficio del artículo 17 de la Ley 11.683.`,
    `Si te equivocaste y corregís por tu cuenta antes de que ARCA te notifique una fiscalización, esa corrección no cuenta como discrepancia. Premia la rectificación espontánea.`, 112),

  // ── Cap. IV — Presunción de exactitud ──────────────────────────────────────
  art('Anexo 13', 'Presunción de exactitud y alcance',
    `Los sujetos que adhieran al Régimen y cumplimenten el artículo 39 de la Ley 27.799 tendrán el efecto liberatorio del pago del Impuesto a las Ganancias del período base y, en consecuencia, gozarán de la presunción de exactitud del artículo 40 respecto de las declaraciones juradas presentadas del Impuesto a las Ganancias y del Impuesto al Valor Agregado de los períodos no prescriptos, incluyendo aquellos en que no hubiera existido obligación de presentarlas. La presunción se mantiene mientras el período base cumpla los requisitos. Si ARCA dicta la determinación de oficio del artículo 17 de la Ley 11.683 impugnando la declaración simplificada del período base por discrepancia significativa, podrá verificar y fiscalizar los períodos no prescriptos de Ganancias e IVA, salvo las excepciones del segundo párrafo del artículo 42 de la ley.`,
    `El gran beneficio: además del año base, la presunción de exactitud se extiende a TODOS los períodos no prescriptos de Ganancias e IVA (incluso aquellos en que no presentaste). Solo se cae si ARCA impugna el período base por discrepancia significativa.`, 113),
  art('Anexo 14', 'Falta de presentación o de pago',
    `La falta de presentación de la Declaración Jurada Simplificada del Impuesto a las Ganancias del período por el cual se ejerció la opción de adhesión o ratificación, o la falta de pago en término del gravamen, privará al sujeto de los efectos de los artículos 39 y 40 de la Ley 27.799, debiendo ARCA ejercer sus facultades de verificación y fiscalización.`,
    `Si te adheriste pero no presentás o no pagás en término, perdés el efecto liberatorio y la presunción de exactitud, y ARCA puede fiscalizarte normalmente.`, 114),
  art('Anexo 15', 'Nuevo período fiscal base',
    `Cuando el contribuyente manifieste su voluntad de permanecer en el Régimen, el nuevo período fiscal en que presente la Declaración Jurada Simplificada y, de corresponder, pague en término, se considerará nuevo "período fiscal base". En tal caso, el período base anterior adquirirá la condición de período con presunción de exactitud (art. 40), formando parte de los períodos no prescriptos protegidos, excepto que sobre ese período el fisco ya hubiese notificado la orden de intervención.`,
    `Cada año que seguís en el régimen, el nuevo año pasa a ser el "período base" y el anterior queda protegido por la presunción de exactitud. Así se va "sellando" el pasado año a año.`, 115),
  art('Anexo 16', 'Resolución a favor del contribuyente',
    `Si la resolución determinativa de oficio por la que ARCA impugnó la Declaración Jurada Simplificada por discrepancia significativa resultare anulada, revocada o dejada sin efecto por resolución administrativa o judicial firme o consentida favorable al contribuyente, se restablecerá íntegramente la presunción de exactitud de los períodos alcanzados y se considerará que no debió haberse habilitado la verificación y fiscalización de dichos períodos, retrotrayendo sus efectos a la situación previa.`,
    `Si el contribuyente gana el reclamo contra la impugnación de ARCA, se le devuelve la presunción de exactitud como si nunca lo hubieran fiscalizado. Protege contra impugnaciones infundadas.`, 116),
];

export const DECRETO_93_2026: Law = {
  id: LAW_ID,
  number: '93/2026',
  title: 'Decreto 93/2026 — Reglamentación de la Ley de Inocencia Fiscal',
  commonName: 'Decreto reglamentario de Inocencia Fiscal',
  shortCode: 'Decreto 93/2026',
  aliases: ['93/2026', 'Decreto 93/2026', 'reglamentación inocencia fiscal', 'reglamento ley 27.799'],
  isDestacada: false,
  summary:
    'Decreto 93/2026: reglamenta el Régimen de Declaración Jurada Simplificada del impuesto a las ganancias creado por la Ley de Inocencia Fiscal (27.799). Precisa el concepto de "discrepancia significativa" (impositiva y previsional), define la regularización del saldo, exige canalizar las operaciones por el sistema financiero formal (trazabilidad antilavado), y regula la adhesión, el efecto liberatorio del pago, la presunción de exactitud, la impugnación y el "período fiscal base". Su Anexo contiene la reglamentación operativa (16 artículos).',
  category: 'tributario',
  categories: ['tributario'],
  year: 2026,
  sanctionDate: '2026-02-08',
  promulgationDate: '2026-02-09',
  publicationDate: '2026-02-09',
  effectiveDate: '2026-02-08',
  derogatedDate: null,
  boNumber: '35848',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'DECRETO',
  issuingBody: 'Poder Ejecutivo Nacional',
  fullText: null,
  sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/decreto-93-2026-423013/texto',
  articleCount: 26,
  topics: ['Inocencia fiscal', 'Declaración jurada simplificada', 'Discrepancia significativa', 'ARCA', 'Trazabilidad'],
  keywords: [
    'decreto 93/2026', 'inocencia fiscal', 'reglamentación', 'declaración jurada simplificada',
    'discrepancia significativa', 'período fiscal base', 'presunción de exactitud', 'ARCA', 'ganancias',
  ],
  relatedNorms: ['ley-27799', 'ley-23660'],
  relations: [
    {
      type: 'REGLAMENTA',
      targetLawId: 'ley-27799',
      targetLawLabel: 'Ley de Inocencia Fiscal',
      description: 'El Decreto 93/2026 reglamenta el Capítulo III del Título II de la Ley 27.799 (Régimen de Declaración Jurada Simplificada) y aclara las modificaciones que la ley introdujo al Régimen Penal Tributario y a la Ley 11.683.',
    },
    {
      type: 'RELACIONADA',
      targetLawId: 'ley-23660',
      targetLawLabel: 'Ley de Obras Sociales',
      description: 'Precisa el alcance de la "discrepancia significativa" y la regularización para los aportes y contribuciones de obras sociales (art. 24 de la Ley 23.660), reformados por la Ley 27.799.',
    },
  ],
  executiveSummary:
    'Publicado el 9 de febrero de 2026, el Decreto 93/2026 reglamenta la Ley de Inocencia Fiscal. Su cuerpo aclara, con efecto operativo, el concepto de "discrepancia significativa" (tanto impositiva como previsional), define cuándo el saldo está "regularizado" y fija qué importe se aplica a sanciones y delitos según el momento del hecho. Su Anexo regula en detalle el Régimen de Declaración Jurada Simplificada: la adhesión y la constancia digital, la verificación de los requisitos (ingresos, patrimonio, no ser gran contribuyente), la obligación de canalizar las operaciones por el sistema financiero formal (trazabilidad antilavado, GAFI), la declaración precargada por ARCA, el "período fiscal base", el efecto liberatorio del pago, la presunción de exactitud y los casos de impugnación.',
  objective:
    'Reglamentar los aspectos operativos y procedimentales del Régimen de Declaración Jurada Simplificada de la Ley 27.799 y precisar las definiciones clave (discrepancia significativa, regularización, período fiscal base).',
  problemItSolves:
    'La necesidad de reglas operativas concretas para aplicar la Ley de Inocencia Fiscal: cómo se adhiere, cómo se mide la discrepancia significativa, qué importes rigen y cómo se articula con la prevención del lavado de activos.',
  practicalImpact:
    'Define el procedimiento real del régimen: ARCA precarga la declaración, el contribuyente la confirma y paga, y gana el efecto liberatorio y la presunción de exactitud, siempre que canalice sus operaciones por el sistema financiero formal y no incurra en discrepancia significativa.',
  affectedSubjects: ['Contribuyentes del régimen simplificado', 'ARCA', 'Entidades financieras', 'UIF', 'BCRA', 'CNV'],
  articles: ARTICULOS,
  segments: [],
  annexes: [],
  amendments: [],
  metadata: {
    id: `${LAW_ID}-meta`,
    lawId: LAW_ID,
    mainTopic: 'Reglamentación del Régimen de Declaración Jurada Simplificada (Inocencia Fiscal)',
    subtopics: ['Discrepancia significativa', 'Período fiscal base', 'Efecto liberatorio', 'Presunción de exactitud', 'Trazabilidad'],
    relatedLaws: ['Ley 27.799', 'Ley 11.683', 'Ley 23.660', 'RG ARCA 5820/2026'],
    regulations: [], modifyingNorms: [], derogatingNorms: [],
    jurisprudence: [], doctrine: [], obligations: [], rights: [], sanctions: [], useCases: [],
    faq: [
      {
        question: '¿Qué reglamenta el Decreto 93/2026?',
        answer: 'Reglamenta el Régimen de Declaración Jurada Simplificada del impuesto a las ganancias creado por la Ley de Inocencia Fiscal (27.799): la adhesión, la verificación de requisitos, el efecto liberatorio del pago, la presunción de exactitud y, sobre todo, precisa el concepto de "discrepancia significativa" que habilita a ARCA a impugnar.',
      },
      {
        question: '¿Hay que bancarizar las operaciones para entrar al régimen?',
        answer: 'Sí. El Anexo exige que quienes adhieran al Régimen de Declaración Jurada Simplificada canalicen sus operaciones por los medios formales autorizados por el BCRA o la CNV, en línea con la prevención del lavado de activos (estándares GAFI).',
      },
    ],
    createdAt: '2026-06-11T00:00:00.000Z',
    updatedAt: '2026-06-11T00:00:00.000Z',
  },
  createdAt: '2026-06-11T00:00:00.000Z',
  updatedAt: '2026-06-11T00:00:00.000Z',
};

export default DECRETO_93_2026;
