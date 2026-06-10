/**
 * Ley 24.977 (1998) — Régimen Simplificado para Pequeños Contribuyentes (MONOTRIBUTO). VIGENTE.
 *
 * Se carga el TEXTO ACTUALIZADO/VIGENTE: el régimen real vive en el ANEXO de la ley
 * (aprobado por el art. 1° del cuerpo), que fue SUSTITUIDO íntegramente por la Ley 26.565
 * (2009) y luego reformado por las leyes 27.346, 27.430, 27.618, 27.737 y 27.743 (2024).
 * Por eso se cargan los artículos del Anexo (1 a 55, más dos artículos sin número a
 * continuación del 21), que son los que se citan en la práctica ("art. 8 del monotributo"
 * = categorías). El cuerpo de la ley (arts. 1 a 4: aprueba el Anexo, sustituye el art. 29
 * de la Ley de IVA, fija la vigencia) es meramente instrumental y no se reproduce aquí.
 *
 * El DNU 70/2023 NO modifica esta ley: la cita en su art. 341 (categoriza a los atletas
 * becados de la Ley del Deporte como monotributistas).
 *
 * Importes: son los valores base fijados por la Ley 27.743 (BO 08/07/2024). El art. 52
 * del Anexo dispone que se actualizan SEMESTRALMENTE por IPC (enero y julio), por lo que
 * los montos vigentes a cada momento los publica ARCA (ex AFIP) y pueden ser mayores.
 *
 * Fuente oficial: https://www.argentina.gob.ar/normativa/nacional/ley-24977-51609/actualizacion
 */
import type { Law, Article } from '../common/types/law.types';

const LAW_ID = 'ley-24977';

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

// Articulado del ANEXO (Régimen Simplificado para Pequeños Contribuyentes - Monotributo).
const ARTICULOS: Article[] = [
  // ── TÍTULO I — DISPOSICIONES PRELIMINARES ──────────────────────────────────
  art('1', 'Objeto: régimen tributario integrado y simplificado',
    `Se establece un régimen tributario integrado y simplificado, relativo a los impuestos a las ganancias, al valor agregado y al sistema previsional, destinado a los pequeños contribuyentes.`,
    `Crea el Monotributo: un único pago mensual que reemplaza tres obligaciones (Impuesto a las Ganancias, IVA y aportes jubilatorios y de obra social) para los pequeños contribuyentes.`),

  // ── TÍTULO II — DEFINICIÓN DE PEQUEÑO CONTRIBUYENTE ─────────────────────────
  art('2', 'Quién es pequeño contribuyente',
    `A los fines de lo dispuesto en este régimen, se consideran pequeños contribuyentes: 1) Las personas humanas que realicen venta de cosas muebles, locaciones, prestaciones de servicios y/o ejecuciones de obras, incluida la actividad primaria; 2) Las personas humanas integrantes de cooperativas de trabajo, en los términos y condiciones que se indican en el Título VI; y 3) Las sucesiones indivisas continuadoras de causantes adheridos al Régimen Simplificado para Pequeños Contribuyentes, hasta la finalización del mes en que se dicte la declaratoria de herederos, se declare la validez del testamento que verifique la misma finalidad o se cumpla un año desde el fallecimiento del causante, lo que suceda primero. No se considerarán actividades comprendidas en este régimen el ejercicio de las actividades de dirección, administración o conducción de sociedades. Concurrentemente, deberá verificarse en todos los casos que: a) Hubieran obtenido en los doce (12) meses calendario inmediatos anteriores a la fecha de adhesión, ingresos brutos provenientes de las actividades a ser incluidas en el presente régimen, inferiores o iguales a la suma máxima que se establece en el artículo 8° para la categoría K; b) No superen en el período indicado en el inciso a) los parámetros máximos de las magnitudes físicas y alquileres devengados que se establecen para su categorización; c) El precio máximo unitario de venta, solo en los casos de venta de cosas muebles, no supere el importe de pesos trescientos ochenta y cinco mil ($ 385.000); d) No hayan realizado importaciones de cosas muebles para su comercialización posterior y/o de servicios con idénticos fines, durante los últimos doce (12) meses calendario; e) No realicen más de tres (3) actividades simultáneas o no posean más de tres (3) unidades de explotación. En el caso de la actividad de locación de inmuebles, mediante contratos debidamente registrados, se considera como una sola unidad de explotación independientemente de la cantidad de propiedades afectadas a la misma. Los ingresos provenientes exclusivamente de la locación de hasta dos (2) inmuebles estarán exentos del pago del Monotributo.`,
    `Define quién puede ser monotributista: personas humanas que venden cosas, alquilan, prestan servicios o hacen obras (incluida la actividad primaria), integrantes de cooperativas de trabajo y sucesiones indivisas. No entran los directores/administradores de sociedades. Hay que cumplir a la vez varios topes: facturación anual por debajo del máximo de la categoría K, parámetros físicos (superficie, energía, alquileres), precio unitario de venta y no superar 3 actividades o 3 locales. Alquilar hasta 2 inmuebles está exento del Monotributo.`),

  // ── TÍTULO II — categorización por actividad principal ──────────────────────
  art('3', 'Categorización por actividad principal e ingresos brutos',
    `Los sujetos que realicen alguna o algunas de las actividades mencionadas en el primer párrafo del artículo 2º del presente régimen, deberán categorizarse de acuerdo con la actividad principal, teniendo en cuenta los parámetros establecidos en el artículo 8º de este Anexo, y sumando los ingresos brutos obtenidos por todas las actividades incluidas en el presente régimen. A los fines de lo dispuesto en el párrafo precedente, se entenderá por actividad principal aquella por la que el contribuyente obtenga mayores ingresos brutos. A los efectos del presente régimen, se consideran ingresos brutos obtenidos en las actividades, al producido de las ventas, locaciones o prestaciones correspondientes a operaciones realizadas por cuenta propia o ajena, excluidas aquellas que hubieran sido dejadas sin efecto y neto de descuentos efectuados de acuerdo con las costumbres de plaza.`,
    `Si hacés varias actividades, te categorizás por la principal (la que te da más ingresos), pero sumás los ingresos de todas. "Ingresos brutos" son las ventas y cobros netos de descuentos, sin contar operaciones anuladas.`),

  // ── TÍTULO III — RÉGIMEN SIMPLIFICADO (RS). Cap. I — Impuestos comprendidos ─
  art('4', 'Opción de adherir y tributar el impuesto integrado',
    `Los sujetos que encuadren en la condición de pequeño contribuyente, de acuerdo con lo establecido en el artículo 2º, podrán optar por adherir al Régimen Simplificado para Pequeños Contribuyentes (RS), debiendo tributar el impuesto integrado que, para cada caso, se establece en el artículo 11.`,
    `Quien cumple los requisitos del art. 2 puede optar por entrar al Monotributo y, si lo hace, paga el "impuesto integrado" mensual del art. 11 según su categoría.`),
  art('5', 'Domicilio fiscal especial',
    `Se considerará domicilio fiscal especial de los pequeños contribuyentes adheridos al Régimen Simplificado para Pequeños Contribuyentes (RS), en los términos del artículo 3º de la ley 11.683, texto ordenado en 1998 y sus modificaciones, el declarado en oportunidad de ejercer la opción, salvo que hubiera sido modificado en legal tiempo y forma por el contribuyente.`,
    `El domicilio que declarás al inscribirte en el Monotributo es tu domicilio fiscal a todos los efectos, salvo que lo cambies en forma.`),
  art('6', 'Impuestos que reemplaza el Monotributo',
    `Los ingresos que deban efectuarse como consecuencia de la adhesión al Régimen Simplificado para Pequeños Contribuyentes (RS), sustituyen el pago de los siguientes impuestos: a) El Impuesto a las Ganancias; b) El Impuesto al Valor Agregado (IVA). Las operaciones de los pequeños contribuyentes adheridos al Régimen Simplificado para Pequeños Contribuyentes (RS), se encuentran exentas del Impuesto a las Ganancias y del Impuesto al Valor Agregado (IVA), así como de aquellos impuestos que en el futuro los sustituyan.`,
    `El pago mensual del Monotributo reemplaza el Impuesto a las Ganancias y el IVA: las operaciones del monotributista están exentas de ambos.`),

  // ── Cap. II — Impuesto mensual a ingresar - Categorías ──────────────────────
  art('7', 'Pago mensual del impuesto integrado',
    `Los pequeños contribuyentes adheridos al Régimen Simplificado para Pequeños Contribuyentes (RS) deberán —desde su adhesión al régimen— ingresar mensualmente el impuesto integrado, sustitutivo de los impuestos mencionados en el artículo precedente, que resultará de la categoría en la que queden encuadrados en función al tipo de actividad, a los ingresos brutos, a las magnitudes físicas y a los alquileres devengados, asignados a la misma. El presente impuesto deberá ser ingresado hasta el mes en que el contribuyente renuncie al régimen o, en su caso, hasta el cese definitivo de actividades en los plazos, términos y condiciones que determine la Administración Federal de Ingresos Públicos (AFIP). Facúltase a la AFIP a regular la baja retroactiva del pequeño contribuyente. En los casos de renuncia o de baja retroactiva, no podrá exigirse al contribuyente requisitos que no guarden directa relación con los requeridos en el momento de tramitarse su alta.`,
    `El monotributista paga todos los meses el impuesto integrado según su categoría (que depende de actividad, ingresos, superficie, energía y alquiler), desde que se inscribe hasta que renuncia o cesa la actividad.`),
  art('8', 'Categorías del Monotributo (A a K)',
    `Se establecen las siguientes categorías de contribuyentes de acuerdo con los ingresos brutos anuales, las magnitudes físicas y el monto de los alquileres devengados anualmente. Categoría A: ingresos brutos hasta $ 6.450.000, superficie hasta 30 m², energía hasta 3.330 Kw, alquileres hasta $ 1.500.000. B: hasta $ 9.450.000, 45 m², 5.000 Kw, $ 1.500.000. C: hasta $ 13.250.000, 60 m², 6.700 Kw, $ 2.050.000. D: hasta $ 16.450.000, 85 m², 10.000 Kw, $ 2.050.000. E: hasta $ 19.350.000, 110 m², 13.000 Kw, $ 2.600.000. F: hasta $ 24.250.000, 150 m², 16.500 Kw, $ 2.600.000. G: hasta $ 29.000.000, 200 m², 20.000 Kw, $ 3.100.000. H: hasta $ 44.000.000, 200 m², 20.000 Kw, $ 4.500.000. I: hasta $ 49.250.000, 200 m², 20.000 Kw, $ 4.500.000. J: hasta $ 56.400.000, 200 m², 20.000 Kw, $ 4.500.000. K: hasta $ 68.000.000, 200 m², 20.000 Kw, $ 4.500.000.`,
    `Es la tabla central del Monotributo: define las categorías de la A a la K según ingresos brutos anuales, superficie del local, energía eléctrica consumida y monto de alquileres. Estos topes son los valores base de la Ley 27.743 (2024) y se actualizan por IPC cada semestre (art. 52), así que ARCA publica montos mayores en cada actualización.`),
  art('9', 'Recategorización semestral',
    `A la finalización de cada semestre calendario, el pequeño contribuyente deberá calcular los ingresos brutos acumulados, la energía eléctrica consumida y los alquileres devengados en los doce (12) meses inmediatos anteriores, así como la superficie afectada a la actividad en ese momento. Cuando dichos parámetros superen o sean inferiores a los límites de su categoría, quedará encuadrado en la categoría que le corresponda a partir del segundo mes inmediato siguiente al último mes del semestre respectivo. La recategorización se efectúa por semestre calendario (enero/junio y julio/diciembre). Se considerará al responsable correctamente categorizado cuando se encuadre en la categoría que corresponda al mayor valor de sus parámetros —ingresos brutos, magnitudes físicas o alquileres devengados—. En caso de existir un único medidor se presume, salvo prueba en contrario, que se afectó el veinte por ciento (20%) a la actividad gravada en actividades de bajo consumo energético, y el noventa por ciento (90%) en las de alto consumo. La actividad primaria y la prestación de servicios sin local fijo se categorizarán exclusivamente por el nivel de ingresos brutos.`,
    `Dos veces al año (en enero y julio) el monotributista debe revisar sus ingresos, energía y alquileres de los últimos 12 meses y pasar a la categoría que le corresponda. Se ubica en la categoría del parámetro más alto que tenga. Para actividad primaria o servicios sin local, solo cuentan los ingresos.`),
  art('10', 'Parámetro de superficie: excepción en localidades chicas',
    `A los fines dispuestos en el artículo 8º, se establece que el parámetro de superficie afectada a la actividad no se aplicará en zonas urbanas, suburbanas o rurales de las ciudades o poblaciones de hasta cuarenta mil (40.000) habitantes, con excepción de las zonas, regiones y/o actividades económicas que determine el Ministerio de Economía a través de la Administración Federal de Ingresos Públicos (AFIP). El Poder Ejecutivo nacional podrá incrementar, hasta en un cincuenta por ciento (50%), las magnitudes físicas para determinar las categorías previstas en el citado artículo, y podrá establecer parámetros máximos diferenciales para determinadas zonas, regiones y/o actividades económicas.`,
    `En pueblos de hasta 40.000 habitantes no se mira la superficie del local para categorizarse. El Poder Ejecutivo puede subir hasta un 50% los parámetros físicos o fijar topes diferenciados por zona o actividad.`),
  art('11', 'Impuesto integrado mensual por categoría',
    `El impuesto integrado que por cada categoría deberá ingresarse mensualmente es el siguiente. Categoría A: $ 3.000 (locaciones/servicios) y $ 3.000 (venta de cosas muebles). B: $ 5.700 y $ 5.700. C: $ 9.800 y $ 9.000. D: $ 16.000 y $ 14.900. E: $ 30.000 y $ 23.800. F: $ 42.200 y $ 31.000. G: $ 76.800 y $ 38.400. H: $ 220.000 y $ 110.000. I: $ 437.500 y $ 175.000. J: $ 525.000 y $ 210.000. K: $ 735.000 y $ 245.000. Autorízase al Poder Ejecutivo nacional a bonificar —en una o más mensualidades— hasta un veinte por ciento (20%) del impuesto integrado total anual a aquellos pequeños contribuyentes que cumplan con una determinada modalidad de pago o que guarden estricto cumplimiento con sus obligaciones formales y materiales.`,
    `Es la tabla de cuánto paga por mes cada categoría. Hay dos columnas: una para quienes prestan servicios o hacen locaciones, y otra (más baja desde la C) para quienes venden cosas. El Estado puede bonificar hasta un 20% anual a los buenos cumplidores. Estos son los valores base de la Ley 27.743 (2024); se actualizan por IPC cada semestre.`),

  // ── Cap. III — Inicio de actividades ────────────────────────────────────────
  art('12', 'Categorización al iniciar actividades',
    `En el caso de inicio de actividades, el pequeño contribuyente que opte por adherir al Régimen Simplificado deberá encuadrarse en la categoría que le corresponda de conformidad con la magnitud física referida a la superficie que tenga afectada a la actividad y, en su caso, al monto pactado en el contrato de alquiler respectivo. De no contar con tales referencias se categorizará inicialmente mediante una estimación razonable. Transcurridos seis (6) meses, deberá proceder a anualizar los ingresos brutos obtenidos, la energía eléctrica consumida y los alquileres devengados en dicho período, a efectos de confirmar su categorización o determinar su recategorización o exclusión del régimen.`,
    `Si recién arrancás, te categorizás por la superficie del local y el alquiler (o por una estimación razonable si no los tenés). A los 6 meses anualizás lo que facturaste, consumiste y pagaste de alquiler para confirmar o cambiar de categoría.`),
  art('13', 'Adhesión posterior al inicio de actividades',
    `Cuando la adhesión al Régimen Simplificado se produzca con posterioridad al inicio de actividades, pero antes de transcurridos doce (12) meses, el contribuyente deberá proceder a anualizar los ingresos brutos obtenidos y la energía eléctrica consumida en el período precedente al acto de adhesión, valores que juntamente con la superficie afectada y, en su caso, el monto del contrato de alquiler, determinarán la categoría en que resultará encuadrado. Cuando hubieren transcurrido doce (12) meses o más desde el inicio de actividades, se considerarán los ingresos brutos y la energía eléctrica consumida acumulada en los últimos doce (12) meses anteriores a la adhesión, así como los alquileres devengados en dicho período.`,
    `Si te adherís al Monotributo después de haber empezado a trabajar, anualizás lo facturado hasta ahí (si pasó menos de un año) o tomás los últimos 12 meses (si pasó más), para definir tu categoría.`),
  art('14', 'Sustitución de actividad',
    `En caso que el pequeño contribuyente adherido al Régimen Simplificado sustituya la o las actividades declaradas, por otra u otras comprendidas en el mismo, resultará de aplicación lo previsto en este capítulo respecto de su nueva o nuevas actividades, correspondiendo presentar una declaración jurada en la cual determinará, en su caso, la nueva categoría.`,
    `Si cambiás de actividad, tratás la nueva como un inicio de actividad y presentás una declaración jurada con la categoría que te corresponda.`),

  // ── Cap. IV — Fecha y forma de pago ─────────────────────────────────────────
  art('15', 'Forma y plazo de pago',
    `El pago del impuesto integrado y de las cotizaciones previsionales indicadas en el artículo 39, a cargo de los pequeños contribuyentes adheridos al Régimen Simplificado, será efectuado mensualmente en la forma, plazo y condiciones que establezca la Administración Federal de Ingresos Públicos (AFIP). La obligación tributaria mensual no podrá ser objeto de fraccionamiento, salvo los casos en que se dispongan regímenes de retención o percepción. Facúltase a la AFIP a establecer regímenes de percepción en la fuente así como regímenes especiales de pago que contemplen las actividades estacionales.`,
    `Se paga todos los meses en la forma que fija AFIP/ARCA y no se puede fraccionar la cuota, salvo regímenes de retención. Para actividades de temporada puede haber esquemas especiales de pago.`),

  // ── Cap. V — Declaración jurada categorizadora y recategorizadora ───────────
  art('16', 'Declaración jurada de categorización',
    `Los pequeños contribuyentes que opten por el Régimen Simplificado deberán presentar, al momento de ejercer la opción, en los supuestos de inicio de actividades, o cuando se produzca alguna de las circunstancias que determinen su recategorización de acuerdo con el artículo 9º, una declaración jurada determinativa de su condición frente al régimen, en la forma, plazo y condiciones que establezca la Administración Federal de Ingresos Públicos (AFIP).`,
    `Hay que presentar una declaración jurada al inscribirse y cada vez que corresponda recategorizarse, en la forma que pida AFIP/ARCA.`),

  // ── Cap. VI — Opción al Régimen Simplificado ────────────────────────────────
  art('17', 'Perfeccionamiento de la opción',
    `La opción al Régimen Simplificado se perfeccionará mediante la adhesión de los sujetos que reúnan los requisitos establecidos en el artículo 2º, en las condiciones que fije la Administración Federal de Ingresos Públicos (AFIP). La opción sujetará a los contribuyentes al régimen desde el mes inmediato siguiente a aquel en que se efectivice, hasta el mes en que se solicite su baja por cese de actividad o por renuncia al régimen. En el caso de inicio de actividades, los sujetos podrán adherir con efecto a partir del mes de adhesión, inclusive.`,
    `La adhesión se concreta inscribiéndote en AFIP/ARCA y rige desde el mes siguiente (o desde el mismo mes si recién iniciás actividad), hasta que te des de baja o renuncies.`),
  art('18', 'Quiénes no pueden optar',
    `No podrán optar por el Régimen Simplificado los responsables que estén comprendidos en alguna de las causales contempladas en el artículo 20.`,
    `No pueden entrar al Monotributo quienes están alcanzados por alguna causal de exclusión del art. 20.`),

  // ── Cap. VII — Renuncia ─────────────────────────────────────────────────────
  art('19', 'Renuncia al régimen',
    `Los contribuyentes adheridos al Régimen Simplificado podrán renunciar al mismo en cualquier momento. Dicha renuncia producirá efectos a partir del primer día del mes siguiente de realizada y el contribuyente no podrá optar nuevamente por el presente régimen hasta después de transcurridos tres (3) años calendario posteriores al de efectuada la renuncia, siempre que se produzca a fin de obtener el carácter de responsable inscripto frente al Impuesto al Valor Agregado (IVA) por la misma actividad. La renuncia implicará que los contribuyentes deban dar cumplimiento a sus obligaciones impositivas y de la seguridad social, en el marco de los respectivos regímenes generales.`,
    `Podés renunciar al Monotributo cuando quieras; rige desde el mes siguiente. Si renunciás para pasarte a responsable inscripto en IVA por la misma actividad, no podés volver al Monotributo por 3 años. Al renunciar pasás al régimen general de impuestos y seguridad social.`),
  // ── Cap. VIII — Exclusiones ─────────────────────────────────────────────────
  art('20', 'Causales de exclusión de pleno derecho',
    `Los contribuyentes quedan excluidos de pleno derecho del Régimen Simplificado cuando: a) La suma de los ingresos brutos obtenidos de las actividades incluidas en el régimen, en los últimos doce (12) meses inmediatos anteriores a la obtención de cada nuevo ingreso bruto —incluido este último— exceda el límite máximo establecido para la Categoría K; b) Los parámetros físicos o el monto de los alquileres devengados superen los máximos establecidos para la Categoría K; c) El precio máximo unitario de venta, en el caso de venta de cosas muebles, supere la suma del inciso c) del tercer párrafo del artículo 2°; d) Adquieran bienes o realicen gastos, de índole personal, por un valor incompatible con los ingresos declarados y en tanto no se encuentren debidamente justificados; e) Los depósitos bancarios, debidamente depurados, resulten incompatibles con los ingresos declarados; f) Hayan perdido su calidad de sujetos del presente régimen o hayan realizado importaciones de cosas muebles para su comercialización posterior y/o de servicios; g) Realicen más de tres (3) actividades simultáneas o posean más de tres (3) unidades de explotación; h) Realizando locaciones, prestaciones de servicios y/o ejecutando obras, se hubieran categorizado como si realizaran venta de cosas muebles; i) Sus operaciones no se encuentren respaldadas por las respectivas facturas o documentos equivalentes; j) El importe de las compras más los gastos inherentes a la actividad, durante los últimos doce (12) meses, totalicen una suma igual o superior al ochenta por ciento (80%) en venta de bienes o al cuarenta por ciento (40%) en locaciones, servicios y/u obras, de los ingresos brutos máximos de la Categoría K; k) Resulte incluido en el Registro Público de Empleadores con Sanciones Laborales (REPSAL) desde que adquiera firmeza la sanción aplicada en su condición de reincidente.`,
    `Lista las causales por las que automáticamente quedás afuera del Monotributo: pasarte del tope de la categoría K (ingresos, parámetros físicos o alquileres), tener gastos o depósitos bancarios incompatibles con lo que declarás, importar, hacer más de 3 actividades o tener más de 3 locales, no respaldar tus operaciones con facturas, que tus compras superen cierto porcentaje de tus ventas, o estar sancionado en el REPSAL por trabajo no registrado reincidente.`),
  art('21', 'Efectos de la exclusión',
    `El acaecimiento de cualquiera de las causales indicadas en el artículo anterior producirá, sin necesidad de intervención alguna por parte de la AFIP, la exclusión automática del régimen desde la cero (0) hora del día en que se verifique la misma, debiendo comunicar el contribuyente, en forma inmediata, dicha circunstancia al organismo y solicitar el alta en los tributos del régimen general. Cuando la AFIP constate que un contribuyente se encuentra comprendido en alguna causal de exclusión, labrará el acta de constatación pertinente y comunicará la exclusión de pleno derecho, con efectos desde la cero hora del día en que se produjo la causal. Los contribuyentes excluidos serán dados de alta en el régimen general, no pudiendo reingresar al régimen hasta después de transcurridos tres (3) años calendario posteriores al de la exclusión. El impuesto integrado abonado desde el acaecimiento de la causal se tomará como pago a cuenta de los tributos adeudados por el régimen general.`,
    `Cuando ocurre una causal del art. 20, quedás excluido automáticamente desde la cero hora de ese día, sin que AFIP tenga que hacer nada; debés avisar y pasarte al régimen general. AFIP también puede detectarlo y declarar la exclusión. No podés volver al Monotributo por 3 años, y lo que pagaste de monotributo se descuenta de lo que debas en el régimen general.`),
  art('21 bis', 'Procedimiento permanente de transición al Régimen General',
    `Los y las contribuyentes que resulten excluidos o efectúen la renuncia al Régimen Simplificado con el fin de obtener el carácter de inscriptos ante el Régimen General, podrán acogerse a los beneficios del presente artículo, por única vez, en la medida que sus ingresos brutos no superen el cincuenta por ciento (50%) del límite de ventas totales anuales previsto para la categorización como micro empresas. Podrán, en el impuesto al valor agregado, adicionar al crédito fiscal el impuesto que se les hubiere facturado y discriminado en los doce (12) meses anteriores a la fecha en que la exclusión o renuncia haya surtido efectos, por compras vinculadas con la misma actividad; y en el impuesto a las ganancias, deducir como gasto el monto neto del IVA facturado en esos doce (12) meses por compras vinculadas con la actividad.`,
    `Primer artículo sin número agregado después del 21. Da un beneficio, por única vez, a quien sale del Monotributo (por exclusión o renuncia) y pasa al régimen general siendo micro empresa: puede computar como crédito fiscal de IVA y como gasto en Ganancias el impuesto de sus compras de los 12 meses previos, para suavizar el salto al régimen general.`,
    21.1),
  art('21 ter', 'Reducción gradual del saldo deudor de IVA al salir',
    `Los y las contribuyentes que hubiesen comunicado su exclusión al Régimen Simplificado y solicitado el alta en el Régimen General hasta el último día del mes siguiente al de la causal, o que hayan renunciado con el fin de incorporarse a este, podrán gozar, por única vez, en la medida que sus ingresos brutos no superen el cincuenta por ciento (50%) del límite de ventas anuales de micro empresas, de una reducción del saldo deudor que pudiera surgir, en cada período fiscal, al detraer del débito fiscal el crédito fiscal correspondiente. La mencionada reducción será del cincuenta por ciento (50%) en el primer año; del treinta por ciento (30%) en el segundo y del diez por ciento (10%) en el tercero.`,
    `Segundo artículo sin número agregado después del 21. Complementa al anterior: a quien sale del Monotributo hacia el régimen general (siendo micro empresa) le reduce el saldo de IVA que le toca pagar —50% el primer año, 30% el segundo y 10% el tercero— para que la transición sea más gradual.`,
    21.2),
  art('22', 'Compatibilidad con dependencia, jubilación o pensión',
    `La condición de pequeño contribuyente no es incompatible con el desempeño de actividades en relación de dependencia, como tampoco con la percepción de prestaciones en concepto de jubilación, pensión o retiro, correspondiente a alguno de los regímenes nacionales o provinciales.`,
    `Podés ser monotributista y al mismo tiempo trabajar en relación de dependencia o cobrar una jubilación, pensión o retiro: no son incompatibles.`),

  // ── Cap. IX — Facturación y registración ────────────────────────────────────
  art('23', 'Obligación de facturar',
    `El contribuyente adherido al Régimen Simplificado deberá exigir, emitir y entregar las facturas por las operaciones que realice, estando obligado a conservarlas en la forma y condiciones que establezca la Administración Federal de Ingresos Públicos (AFIP).`,
    `El monotributista tiene que emitir y entregar factura por lo que vende o presta, exigir factura por lo que compra, y guardarlas.`),
  art('24', 'Las operaciones no generan crédito ni débito fiscal',
    `Las adquisiciones efectuadas por los sujetos adheridos al Régimen Simplificado no generan, en ningún caso, crédito fiscal y sus ventas, locaciones o prestaciones no generan débito fiscal para sí mismos, ni crédito fiscal respecto de sus adquirentes, locatarios o prestatarios, en el Impuesto al Valor Agregado (IVA).`,
    `Como el monotributista está fuera del IVA, sus compras no le generan crédito fiscal y sus ventas no generan IVA: quien le compra tampoco puede computar crédito fiscal por esa factura.`),

  // ── Cap. X — Exhibición de la identificación y del comprobante de pago ──────
  art('25', 'Exhibición de la identificación y el comprobante de pago',
    `Los contribuyentes adheridos al Régimen Simplificado deberán exhibir en sus establecimientos, en lugar visible al público: a) Placa indicativa de su condición de pequeño contribuyente y de la categoría en la cual se encuentra adherido; b) Comprobante de pago correspondiente al último mes vencido del Régimen Simplificado. La exhibición de la placa y del comprobante de pago se consideran inseparables. La falta de exhibición de cualquiera de ellos traerá aparejada la infracción contemplada en el inciso a) del artículo 26.`,
    `El monotributista con local debe tener a la vista del público una placa con su condición y categoría y el comprobante del último pago. En la práctica esto se cumple exhibiendo el "Data Fiscal" (formulario con QR). No exhibirlos genera la sanción del art. 26.`),
  // ── Cap. XI — Normas de procedimiento. Medidas precautorias y sanciones ─────
  art('26', 'Procedimiento, recategorización de oficio y sanciones',
    `La aplicación, percepción y fiscalización del gravamen estará a cargo de la AFIP y se regirá por la ley 11.683, con las siguientes previsiones: a) Serán sancionados con clausura de uno (1) a cinco (5) días los pequeños contribuyentes que incurran en los hechos u omisiones del artículo 40 de dicha ley, o cuando sus operaciones no estén respaldadas por facturas, o ante la falta de exhibición de la placa y del comprobante de pago; b) Serán sancionados con una multa del cincuenta por ciento (50%) del impuesto integrado y de la cotización previsional que les hubiera correspondido, quienes, por la falta de presentación de la declaración jurada de recategorización, omitieren el pago del tributo, o cuyas declaraciones juradas resultaren inexactas; c) La AFIP procederá a recategorizar de oficio, liquidando la deuda y aplicando la sanción del inciso anterior, cuando el contribuyente no hubiera cumplido la recategorización del artículo 9º o ésta fuera inexacta. Si el contribuyente acepta la recategorización de oficio dentro de los quince (15) días, la sanción se reduce de pleno derecho a la mitad; si se recategoriza antes de que la AFIP notifique la deuda, queda eximido de la sanción.`,
    `AFIP/ARCA controla el Monotributo. Las sanciones: clausura de 1 a 5 días por no facturar o no exhibir la placa y el pago; multa del 50% del impuesto omitido por no recategorizarse o declarar mal. AFIP puede recategorizar de oficio. Si aceptás esa recategorización en 15 días, la multa se reduce a la mitad; si te recategorizás antes de que te notifiquen, no hay multa.`),
  art('27', 'Cómputo de los plazos en meses',
    `Los plazos en meses fijados en el presente Anexo se contarán desde la cero (0) hora del día en que se inicien y hasta la cero (0) hora del día en que finalicen.`,
    `Aclara cómo se cuentan los plazos en meses del régimen: desde la cero hora del día de inicio hasta la cero hora del día de finalización.`),

  // ── Cap. XII — Normas referidas al IVA ──────────────────────────────────────
  art('28', 'Reglas frente al IVA al cambiar de condición',
    `Los pequeños contribuyentes quedarán sujetos a las siguientes disposiciones respecto de la Ley de IVA: a) Quienes hubieran renunciado o resultado excluidos y adquirieran la calidad de responsables inscriptos, serán pasibles del tratamiento del artículo 16, por el impuesto facturado por hechos imponibles anteriores al cambio de condición, con excepción de lo previsto en el primer artículo sin número agregado a continuación del artículo 21; b) Quedan exceptuadas las operaciones registradas en los mercados de cereales a término en las que el enajenante sea un pequeño contribuyente; c) Las operaciones de quienes vendan en nombre propio bienes de terceros no generarán crédito fiscal para el comisionista o consignatario cuando el comitente sea un pequeño contribuyente.`,
    `Fija cómo juega el IVA cuando un monotributista pasa a responsable inscripto y en ventas a través de consignatarios o en mercados de cereales a término: regula qué crédito fiscal se puede o no computar en esos casos.`),

  // ── Cap. XIII — Normas referidas al Impuesto a las Ganancias ────────────────
  art('29', 'Límite a la deducción de compras a monotributistas',
    `Los adquirentes, locatarios o prestatarios de los sujetos comprendidos en el presente régimen sólo podrán computar en su liquidación del Impuesto a las Ganancias las operaciones realizadas con un mismo sujeto proveedor hasta un total del diez por ciento (10%) y para el conjunto de los sujetos proveedores hasta un total del treinta por ciento (30%), en ambos casos sobre el total de las compras, locaciones o prestaciones del mismo ejercicio fiscal. En ningún caso podrá imputarse a los períodos siguientes el remanente. El Poder Ejecutivo nacional podrá reducir los porcentajes hasta el dos por ciento (2%) y el ocho por ciento (8%), respectivamente, de manera diferencial. La limitación no se aplicará cuando el pequeño contribuyente opere como proveedor o prestador para un mismo sujeto en forma recurrente.`,
    `Pone un límite a las empresas del régimen general: cuando le compran a un monotributista, solo pueden deducir en Ganancias hasta el 10% por ese proveedor y el 30% en total de proveedores monotributistas. Es para evitar que se use el Monotributo para inflar gastos. No se aplica si el monotributista es proveedor recurrente.`),

  // ── Cap. XIV — Situaciones excepcionales ────────────────────────────────────
  art('30', 'Catástrofes y dos ciclos productivos',
    `Cuando los contribuyentes se encuentren ubicados en zonas afectadas por catástrofes naturales que impliquen severos daños a la explotación, el impuesto a ingresar se reducirá en un cincuenta por ciento (50%) en caso de emergencia agropecuaria y en un setenta y cinco por ciento (75%) en caso de desastre, aplicándose las leyes 26.509 y 24.959. Cuando en un mismo período anual se acumularan ingresos por ventas correspondientes a dos ciclos productivos anuales o se liquidaran stocks por razones excepcionales, la AFIP, a solicitud del interesado, podrá considerar métodos de ponderación de ingresos para una categorización que se ajuste a la real dimensión de la explotación.`,
    `Protege a productores ante catástrofes: si hay emergencia agropecuaria, pagan la mitad; si hay desastre, un cuarto. Y si en un año se juntan dos cosechas o se liquida stock por excepción, AFIP puede ponderar los ingresos para no sobrecategorizar.`),

  // ── TÍTULO IV — RÉGIMEN DE INCLUSIÓN SOCIAL Y PROMOCIÓN DEL TRABAJO INDEPENDIENTE ─
  art('31', 'Trabajador independiente promovido: requisitos',
    `El Régimen Simplificado, con los beneficios y salvedades de este Título, será de aplicación a los trabajadores independientes que necesiten de una mayor promoción de su actividad para lograr su inserción en la economía formal. Para adherir y permanecer deberán cumplirse, de manera conjunta: a) Ser persona física mayor de dieciocho (18) años; b) Desarrollar exclusivamente una actividad independiente, que no sea de importación, y no poseer local o establecimiento estable (salvo la casa habitación); c) Que la actividad sea la única fuente de ingresos, no pudiendo adherir jubilados, pensionados, empleados en relación de dependencia o quienes perciban otros ingresos, excepto planes sociales; d) No poseer más de una (1) unidad de explotación; e) Cuando se trate de locación y/o prestación de servicios, no llevar a cabo en el año más de seis (6) operaciones con un mismo sujeto, ni superar por operación la suma de pesos ciento cinco mil ($ 105.000); f) No revestir el carácter de empleador; g) No ser contribuyente del Impuesto sobre los Bienes Personales; h) No haber obtenido en los doce (12) meses anteriores ingresos brutos superiores a la suma máxima de la Categoría A; i) La suma de ingresos brutos de los últimos doce (12) meses, considerando cada nuevo ingreso, debe ser inferior o igual al importe del inciso h); j) De tratarse de un graduado universitario, que no se hubieran superado los dos (2) años desde la expedición del título y que se hubiera obtenido sin pago de matrículas ni cuotas.`,
    `Crea un régimen más beneficioso para el trabajador independiente "promovido" (de baja escala) que busca formalizarse. Requisitos: ser mayor de 18, tener una sola actividad y un solo lugar (puede ser la casa), que sea su única fuente de ingresos, no ser empleador ni pagar Bienes Personales, no superar el tope de la categoría A, y un cupo de operaciones por cliente. Incluye a graduados universitarios recientes de carreras gratuitas.`),
  art('32', 'Tope de ingresos del régimen de inclusión',
    `A los fines del límite de los incisos h) e i) del artículo anterior, se admitirá, como excepción y por única vez, que los ingresos brutos a computar superen el tope previsto en dichos incisos en no más de pesos quinientos veinte mil ($ 520.000), cuando deban sumarse ingresos percibidos correspondientes a períodos anteriores. Los adquirentes, locatarios y/o prestatarios de los sujetos comprendidos en este Título en ningún caso podrán computar en su liquidación del impuesto a las ganancias las operaciones realizadas con dichos sujetos, ni darán lugar a crédito fiscal alguno en el IVA, excepto las actividades que determine la AFIP.`,
    `Permite, por única vez, superar levemente el tope de ingresos del trabajador promovido cuando se suman cobros de períodos anteriores. Quien le compra a un trabajador promovido no puede deducir esa operación en Ganancias ni computar IVA, salvo excepciones que fije AFIP.`),

  // ── Cap. II — Beneficios y cotizaciones ─────────────────────────────────────
  art('33', 'Beneficios del régimen de inclusión social',
    `El régimen previsto en el presente Título comprende: a) El pago de una "cuota de inclusión social" que reemplaza la obligación mensual de ingresar la cotización previsional prevista en el inciso a) del artículo 39; b) La opción de acceder a las prestaciones del inciso c) del artículo 42, en las condiciones dispuestas; c) La exención del pago del impuesto integrado establecido en el Capítulo II del Título III. La adhesión al régimen de este Título implica una categorización como pequeño contribuyente a todos los efectos.`,
    `El trabajador promovido no paga el impuesto integrado y, en lugar del aporte jubilatorio fijo, paga una "cuota de inclusión social". Puede optar por sumar la obra social. A todos los efectos cuenta como pequeño contribuyente.`),
  // ── Cap. III — Cuota de inclusión social ────────────────────────────────────
  art('34', 'Cuota de inclusión social',
    `La cuota de inclusión social consiste en un pago a cuenta de las cotizaciones previsionales dispuestas en el inciso a) del artículo 39, a cargo del pequeño contribuyente. Facúltase al Poder Ejecutivo nacional a establecer el valor mínimo mensual de la cuota. Una vez cumplido cada año, el sujeto adherido deberá calcular la cantidad de meses cancelados, atribuyendo las cuotas abonadas a los aportes sustituidos correspondientes a cada mes. Cuando la cantidad de meses cancelados sea inferior a aquellos en que permaneció en el régimen, podrá optar por ingresar las cotizaciones de los meses faltantes —al valor vigente— para ser considerado aportante regular.`,
    `La cuota de inclusión social es un pago a cuenta de los aportes jubilatorios. Al final del año se cuenta cuántos meses de aportes alcanzó a cubrir; si quedan meses sin cubrir, el trabajador puede pagarlos para sumar como aportante regular de cara a la jubilación.`),

  // ── Cap. IV — Prestaciones y cobertura de salud ─────────────────────────────
  art('35', 'Prestaciones del trabajador promovido',
    `Las prestaciones correspondientes a los trabajadores independientes promovidos, cuando se hubieran ingresado las cotizaciones de conformidad con este Título por la totalidad de los períodos necesarios, serán las previstas en los incisos a), b) y d) del artículo 42. Los períodos en los que no hubieran ingresado las cotizaciones no serán computados a los fines de dichas prestaciones, salvo que las ingresaran —en cualquier momento— al valor vigente al momento de su cancelación.`,
    `El trabajador promovido que pagó sus cotizaciones tiene derecho a la jubilación básica, al retiro por invalidez o pensión por fallecimiento y a la cobertura de PAMI al jubilarse. Los meses no pagados no cuentan, salvo que los abone después.`),
  art('36', 'Opción de obra social del trabajador promovido',
    `Los trabajadores independientes promovidos podrán optar por acceder a las prestaciones del inciso c) del artículo 42 (cobertura de salud). El ejercicio de la opción obliga al pago de las cotizaciones previstas en el inciso b) y, en su caso, en el inciso c) del artículo 39, mensualmente, en la forma que establezca la AFIP. El sujeto podrá desistir de la opción, sólo una vez por año calendario, salvo en el año en que la ejerció.`,
    `El trabajador promovido puede sumar la obra social pagando el aporte de salud del art. 39. Puede dar de baja esa opción una vez por año, pero no en el mismo año en que la activó.`),

  // ── Cap. V — Permanencia y exclusión ────────────────────────────────────────
  art('37', 'Permanencia y exclusión del régimen de inclusión',
    `Cuando dejen de cumplirse cualquiera de las condiciones exigidas en este Título o el sujeto haya renunciado, el trabajador independiente promovido quedará alcanzado desde ese momento por las disposiciones de los Títulos III y V —si opta por ese régimen y cumple el artículo 2º—, o de lo contrario por el régimen general. En tales casos no podrá ejercer nuevamente la opción de adhesión a este Título hasta que hayan transcurrido dos (2) años calendario desde su exclusión o renuncia, y vuelva a cumplir las condiciones.`,
    `Si el trabajador promovido deja de cumplir los requisitos o renuncia, pasa al Monotributo común (si califica) o al régimen general. No puede volver al régimen de inclusión por 2 años.`),

  // ── TÍTULO V — RÉGIMEN ESPECIAL DE LOS RECURSOS DE LA SEGURIDAD SOCIAL ──────
  art('38', 'Aportes por los trabajadores dependientes del monotributista',
    `El empleador acogido al régimen de esta ley deberá ingresar, por sus trabajadores dependientes, los aportes, contribuciones y cuotas establecidos en los regímenes generales del Sistema Integrado Previsional Argentino, del Instituto de Servicios Sociales para Jubilados y Pensionados, del Régimen del Sistema Nacional del Seguro de Salud, de Asignaciones Familiares y Fondo Nacional del Empleo y de la Ley sobre Riesgos del Trabajo, en los plazos y formas establecidos por las normas que regulan cada uno.`,
    `Si un monotributista tiene empleados, por ellos paga los aportes y contribuciones del régimen general (jubilación, PAMI, obra social, asignaciones familiares, fondo de empleo y ART). El Monotributo simplifica los aportes propios, no los de su personal.`),
  art('39', 'Cotizaciones previsionales y de obra social del monotributista',
    `El pequeño contribuyente que desempeñe actividades comprendidas en el inciso b) del artículo 2° de la ley 24.241 queda encuadrado desde su adhesión en el Sistema Integrado Previsional Argentino (SIPA) y sustituye el aporte personal mensual del artículo 11 de dicha ley por las siguientes cotizaciones: a) Aporte con destino al SIPA de pesos nueve mil ochocientos ($ 9.800) para la Categoría A, incrementándose un diez por ciento (10%) en las sucesivas categorías hasta la F inclusive, y un cuarenta por ciento (40%) en las sucesivas a partir de la Categoría G; b) Aporte de pesos trece mil ochocientos ($ 13.800) con destino al Sistema Nacional del Seguro de Salud (leyes 23.660 y 23.661), del cual un diez por ciento (10%) se destina al Fondo Solidario de Redistribución; para las categorías D a K el aporte de obra social asciende a: D $ 16.400; E $ 20.000; F $ 23.000; G $ 24.800; H $ 29.800; I $ 36.800; J $ 41.300; K $ 47.200; c) Aporte adicional de cuatrocientos diecinueve pesos ($ 419), a opción del contribuyente, al Régimen Nacional de Obras Sociales, por la incorporación de cada integrante de su grupo familiar primario. Cuando el contribuyente sea un sujeto inscripto en el Registro Nacional de Efectores de Desarrollo Local y Economía Social encuadrado en la Categoría A, estará exento del aporte del inciso a) e ingresará los de los incisos b) y c) con una disminución del cincuenta por ciento (50%).`,
    `Detalla los aportes mensuales del monotributista: el jubilatorio (SIPA), que arranca en un valor base para la categoría A y sube por categoría; el de obra social, que también sube por categoría; y un aporte adicional opcional por cada familiar que se sume a la obra social. Los monotributistas sociales (efectores) tienen exenciones y descuentos. Estos importes se actualizan por IPC cada semestre.`),
  art('40', 'Eximición de aportes',
    `Quedan eximidos de todos los aportes indicados en el artículo anterior: 1. Los menores de dieciocho (18) años de edad; 2. Los trabajadores autónomos a los que alude el primer párrafo del artículo 13 de la ley 24.476 y su reglamentación; 3. Los profesionales universitarios que por esa actividad se encontraren obligatoriamente afiliados a uno o más regímenes provinciales para profesionales; 4. Los sujetos que —simultáneamente con la actividad por la que adhieran al Régimen Simplificado— se encuentren realizando una actividad en relación de dependencia y aporten en tal carácter al régimen nacional o a algún régimen provincial previsional.`,
    `Algunos monotributistas no pagan los aportes del art. 39: los menores de 18, ciertos jubilados que siguen trabajando, los profesionales que ya aportan a una caja provincial y quienes también están en relación de dependencia y aportan por ese empleo.`),
  art('41', 'Artículo derogado — DEROGADO',
    `(Derogado por art. 159 de la Ley N° 27.430, B.O. 29/12/2017.)`,
    `[DEROGADO por la Ley 27.430] Este artículo del Anexo fue eliminado en la reforma de 2017 y ya no rige.`),
  art('42', 'Prestaciones de la seguridad social',
    `Las prestaciones de la seguridad social correspondientes a los pequeños contribuyentes, por los períodos en que hubieran efectuado las cotizaciones del artículo 39, serán: a) La Prestación Básica Universal (PBU), prevista en el artículo 17 de la ley 24.241; b) El retiro por invalidez o pensión por fallecimiento, previstos en el artículo 17 de la ley 24.241, calculado sobre la base de la PBU; c) Las prestaciones del Sistema Nacional del Seguro de Salud (leyes 23.660 y 23.661), para el pequeño contribuyente y, si ejerce la opción del inciso c) del artículo 39, para su grupo familiar primario; el contribuyente podrá elegir la obra social; d) Cobertura médico-asistencial por parte del Instituto Nacional de Servicios Sociales para Jubilados y Pensionados (INSSJP), en los términos de la ley 19.032, al adquirir la condición de jubilado o pensionado. Para acceder a las prestaciones del inciso c) el contribuyente deberá estar al día con los aportes. El agente de seguro de salud podrá disponer la desafiliación ante la falta de pago de tres (3) aportes mensuales consecutivos y/o de cinco (5) alternados.`,
    `Enumera lo que obtiene el monotributista por sus aportes: jubilación básica (PBU), retiro por invalidez o pensión por fallecimiento, obra social (para sí y, si paga el adicional, para su familia, pudiendo elegir la obra social) y, al jubilarse, PAMI. Para usar la obra social hay que estar al día: con 3 cuotas seguidas o 5 alternadas impagas pueden darte de baja.`),
  art('43', 'Exclusión de regímenes diferenciales',
    `La adhesión al Régimen Simplificado excluye los beneficios previsionales emergentes de los regímenes diferenciales por el ejercicio de actividades penosas o riesgosas, respecto de los contribuyentes en su condición de trabajadores autónomos.`,
    `El monotributista, como trabajador autónomo, no accede a las jubilaciones especiales (anticipadas) por tareas penosas o riesgosas.`),
  art('44', 'Aplicación del artículo 125 de la ley 24.241',
    `Sin perjuicio de lo dispuesto en los incisos a) y b) del artículo 42, resulta de plena aplicación el artículo 125 de la ley 24.241 y sus modificaciones.`,
    `Remite a la garantía del Estado sobre las prestaciones previsionales del artículo 125 de la ley del sistema jubilatorio (24.241).`),
  art('45', 'Aplicación supletoria',
    `Para las situaciones no previstas en el presente Título, serán de aplicación supletoria las disposiciones de las leyes 19.032, 23.660, 23.661, 24.241 y 24.714, sus respectivas modificaciones y normas complementarias, así como los decretos y resoluciones que las reglamenten, siempre que no se opongan ni sean incompatibles a las disposiciones de esta ley.`,
    `Lo que este Título no regula se completa con las leyes generales de PAMI, obras sociales, jubilaciones y asignaciones familiares, en lo que sea compatible.`),
  art('46', 'Financiamiento del SIPA',
    `Ante la incorporación de beneficiarios por aplicación de la presente ley, el Estado nacional deberá garantizar y aportar los fondos necesarios para mantener el nivel de financiamiento del Sistema Integrado Previsional Argentino (SIPA) y sus adecuadas prestaciones.`,
    `El Estado se compromete a poner los fondos para que el sistema jubilatorio no se desfinancie por incorporar monotributistas con aportes reducidos.`),

  // ── TÍTULO VI — ASOCIADOS A COOPERATIVAS DE TRABAJO ────────────────────────
  art('47', 'Asociados a cooperativas de trabajo',
    `Los asociados de las cooperativas de trabajo podrán incorporarse al Régimen Simplificado. Los sujetos cuyos ingresos brutos anuales no superen la suma máxima de la Categoría A sólo estarán obligados a ingresar las cotizaciones previsionales del artículo 39 y se encontrarán exentos del impuesto integrado. Aquellos asociados cuyos ingresos brutos anuales superen dicha suma deberán abonar, además de las restantes cotizaciones del artículo 39, el aporte previsional del inciso a) y el impuesto integrado que correspondan a su categoría. Los asociados a cooperativas inscriptas en el Registro Nacional de Efectores de Desarrollo Local y Economía Social cuyos ingresos no superen esa suma estarán exentos del impuesto integrado y del aporte previsional del inciso a) del artículo 39, e ingresarán los aportes de los incisos b) y c) con una disminución del cincuenta por ciento (50%).`,
    `Los miembros de cooperativas de trabajo pueden ser monotributistas. Los de menores ingresos (hasta la categoría A) solo pagan los aportes previsionales y no el impuesto integrado; los de mayores ingresos pagan ambos. Los asociados inscriptos como efectores sociales tienen exenciones y descuentos.`),
  art('48', 'Asociados a cooperativas en el régimen de inclusión',
    `Los asociados a cooperativas de trabajo, cuyas modalidades de prestación de servicios y de ingresos encuadren en las especificaciones del Título IV, podrán adherir al régimen previsto en dicho Título. Los sujetos a que se refiere el cuarto párrafo del artículo anterior estarán exentos de ingresar el pago dispuesto en el inciso a) del artículo 33.`,
    `Si el asociado a la cooperativa califica como trabajador independiente promovido, puede entrar al régimen de inclusión social del Título IV; los efectores sociales quedan exentos de la cuota de inclusión.`),
  art('49', 'La cooperativa como agente de retención',
    `En todos los casos, la cooperativa de trabajo será agente de retención de los aportes y del impuesto integrado que sus asociados deban ingresar al Régimen Simplificado. La retención se practicará en cada oportunidad en que la cooperativa liquide pagos a sus asociados en concepto de adelanto del resultado anual. A tal efecto, el formulario de recibo que entregue la cooperativa deberá tener preestablecido el rubro correspondiente a la retención.`,
    `La cooperativa retiene de los pagos a sus asociados el monotributo y los aportes que ellos deben, y lo refleja en el recibo. Funciona como agente de retención.`),
  art('50', 'Inscripción de los asociados al iniciar la cooperativa',
    `Las cooperativas de trabajo que inicien su actividad, en la oportunidad de solicitar su inscripción ante la AFIP, deberán solicitar también la adhesión al Régimen Simplificado de cada uno de sus asociados o, en su caso, al Régimen de Inclusión Social y Promoción del Trabajo Independiente del Título IV, en los términos, plazos y condiciones que disponga la AFIP.`,
    `Una cooperativa de trabajo nueva, al inscribirse, debe adherir a la vez a cada uno de sus asociados al Monotributo o al régimen de inclusión, según corresponda.`),
  art('51', 'Cooperativas en actividad a la promulgación',
    `Los asociados a las cooperativas de trabajo que se encontrasen en actividad a la fecha de promulgación de la presente ley podrán optar por su adhesión al Régimen Simplificado o, en su caso, al Régimen de Inclusión Social y Promoción del Trabajo Independiente del Título IV. En estos supuestos, la cooperativa de trabajo deberá adecuar su proceder a lo dispuesto en el presente Título.`,
    `Las cooperativas que ya estaban funcionando podían optar por incorporar a sus asociados al Monotributo o al régimen de inclusión, adecuando su funcionamiento a estas reglas.`),

  // ── TÍTULO VII — OTRAS DISPOSICIONES ───────────────────────────────────────
  art('52', 'Actualización semestral por IPC',
    `Los montos máximos de facturación, los montos de alquileres devengados y los importes del impuesto integrado a ingresar, correspondientes a cada categoría de pequeño contribuyente, así como las cotizaciones previsionales y los importes consignados en el inciso c) del tercer párrafo del artículo 2°, en el inciso e) del segundo párrafo del artículo 31 y en el primer párrafo del artículo 32, se actualizarán semestralmente a partir del año fiscal 2025, inclusive, en los meses de enero y julio, por el coeficiente que surja de la variación anual del Índice de Precios al Consumidor (IPC) que suministre el Instituto Nacional de Estadística y Censos (INDEC), correspondiente al semestre calendario que finalice el mes inmediato anterior. La Administración Federal de Ingresos Públicos será la encargada de publicar semestralmente los nuevos montos y su respectiva aplicación.`,
    `Es la clave para leer los importes del Monotributo: todos los montos (facturación, alquileres, impuesto integrado, aportes) se actualizan automáticamente cada semestre —en enero y julio— según la inflación (IPC del INDEC). Por eso los valores vigentes en cada momento los publica ARCA y son mayores a los valores base de la ley.`),
  art('53', 'Facultades de la AFIP y convenios con provincias',
    `Facúltase a la AFIP a: a) Dictar las normas complementarias necesarias para implementar el Régimen Simplificado, en especial la registración de los pequeños contribuyentes, sus altas, bajas y modificaciones; b) Suscribir convenios con las provincias, la Ciudad Autónoma de Buenos Aires y municipios, a los fines de la aplicación, percepción y fiscalización del régimen, pudiendo establecer una compensación por la gestión; c) Celebrar convenios con los gobiernos provinciales, municipales y/o de la CABA para ejercer la facultad de percepción y, en su caso, de aplicación, interpretación y/o fiscalización de los tributos de esas jurisdicciones correspondientes a los pequeños contribuyentes.`,
    `Da a AFIP/ARCA las herramientas para hacer funcionar el Monotributo: dictar la reglamentación operativa (altas, bajas, registración) y firmar convenios con provincias y municipios para recaudar y fiscalizar de forma coordinada.`),
  art('54', 'Verificación por jubilados, pensionados y estudiantes',
    `La Administración Federal de Ingresos Públicos (AFIP) podrá verificar por intermedio de jubilados, pensionados y estudiantes, sin relación de dependencia, el cumplimiento de las obligaciones de los contribuyentes adheridos al Régimen Simplificado.`,
    `Habilita a AFIP/ARCA a usar verificadores (jubilados, pensionados y estudiantes, sin relación de dependencia) para controlar que los monotributistas cumplan.`),
  art('55', 'Destino de la recaudación',
    `La recaudación del impuesto integrado del artículo 11 se destinará: a) El setenta por ciento (70%) al financiamiento de las prestaciones administradas por la Administración Nacional de la Seguridad Social (ANSES); b) El treinta por ciento (30%) a las jurisdicciones provinciales en forma diaria y automática, de acuerdo a la distribución secundaria prevista en la ley 23.548, incluyendo a la provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur. Esta distribución no sentará precedente a los fines de la Coparticipación.`,
    `Reparte lo recaudado por el impuesto integrado: 70% va a la ANSES (para financiar jubilaciones y prestaciones) y 30% se distribuye entre las provincias en forma diaria y automática, sin que eso siente precedente para la coparticipación.`),
];

export const LEY_24977: Law = {
  id: LAW_ID,
  number: '24977',
  title: 'Ley de Monotributo',
  commonName: 'Ley de Monotributo',
  shortCode: 'Ley 24.977',
  aliases: ['24.977', 'Ley de Monotributo', 'Monotributo', 'Régimen Simplificado para Pequeños Contribuyentes', 'monotributista', 'pequeño contribuyente'],
  isDestacada: true,
  summary:
    'Ley de Monotributo (1998): crea el Régimen Simplificado para Pequeños Contribuyentes, un único pago mensual que reemplaza el Impuesto a las Ganancias, el IVA y los aportes a la seguridad social. El régimen vive en el Anexo de la ley (sustituido por la Ley 26.565 y reformado por las leyes 27.430, 27.618, 27.737 y 27.743): define las categorías A a K según ingresos, superficie, energía y alquileres; la recategorización semestral; las exclusiones; el régimen de inclusión social del trabajo independiente; y las cotizaciones previsionales y de obra social.',
  category: 'tributario',
  categories: ['tributario', 'economico'],
  year: 1998,
  sanctionDate: '1998-06-03',
  promulgationDate: '1998-07-02',
  publicationDate: '1998-07-06',
  effectiveDate: '1998-07-06',
  derogatedDate: null,
  boNumber: '28931',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/ley-24977-51609/actualizacion',
  articleCount: 57,
  topics: ['Monotributo', 'Pequeños contribuyentes', 'Impuestos', 'Seguridad social', 'Categorías'],
  keywords: [
    'monotributo', '24.977', 'régimen simplificado', 'pequeño contribuyente',
    'categorías', 'recategorización', 'impuesto integrado', 'cotización previsional',
    'obra social monotributo', 'AFIP', 'ARCA',
  ],
  relatedNorms: ['dnu-70-2023', 'ley-23660', 'ley-19032'],
  relations: [
    {
      type: 'RELACIONADA',
      targetLawId: 'dnu-70-2023',
      targetLawLabel: 'DNU 70/2023',
      description: 'El DNU 70/2023 cita el Régimen Simplificado del Monotributo en su artículo 341: categoriza a los atletas becados de la Ley del Deporte (20.655) como pequeños contribuyentes a los efectos previsionales. No modifica la Ley de Monotributo.',
    },
    {
      type: 'RELACIONADA',
      targetLawId: 'ley-23660',
      targetLawLabel: 'Ley de Obras Sociales',
      description: 'El aporte de obra social del monotributista (art. 39) se canaliza al Sistema Nacional del Seguro de Salud regido por las leyes 23.660 y 23.661.',
    },
    {
      type: 'RELACIONADA',
      targetLawId: 'ley-19032',
      targetLawLabel: 'Ley del INSSJP (PAMI)',
      description: 'Al jubilarse, el monotributista accede a la cobertura del INSSJP (PAMI) en los términos de la Ley 19.032 (art. 42 inc. d).',
    },
  ],
  executiveSummary:
    'Sancionada en 1998, la Ley 24.977 creó el Monotributo: un régimen simplificado que unifica en un solo pago mensual el Impuesto a las Ganancias, el IVA y los aportes a la seguridad social (jubilación y obra social) para los pequeños contribuyentes. El régimen operativo está en el Anexo de la ley, que fue sustituido íntegramente por la Ley 26.565 (2009) y reformado sucesivamente, en especial por la Ley 27.743 (2024). Define las categorías A a K según ingresos brutos, superficie, energía eléctrica y alquileres; la recategorización semestral; las causales de exclusión; un régimen de inclusión social para el trabajo independiente; y las prestaciones de la seguridad social. El DNU 70/2023 no lo modifica: solo lo cita al asimilar a los atletas becados a la condición de monotributistas.',
  objective:
    'Simplificar el cumplimiento tributario y previsional de los pequeños contribuyentes mediante un único pago mensual que reemplaza Ganancias, IVA y aportes a la seguridad social, fomentando la formalización.',
  problemItSolves:
    'La complejidad y el costo de cumplir con el régimen general de impuestos para quienes tienen baja facturación, que desincentivaba la formalización de pequeños comerciantes, profesionales y trabajadores independientes.',
  practicalImpact:
    'Millones de comerciantes, profesionales y trabajadores independientes pagan una cuota mensual única según su categoría (A a K) y con eso quedan al día con AFIP/ARCA, tienen obra social y suman aportes jubilatorios. Los montos se actualizan por IPC cada semestre.',
  affectedSubjects: ['Pequeños contribuyentes', 'Comerciantes', 'Profesionales', 'Trabajadores independientes', 'Cooperativas de trabajo', 'AFIP/ARCA'],
  articles: ARTICULOS,
  segments: [],
  annexes: [],
  amendments: [],
  metadata: {
    id: `${LAW_ID}-meta`,
    lawId: LAW_ID,
    mainTopic: 'Régimen Simplificado para Pequeños Contribuyentes (Monotributo)',
    subtopics: ['Categorías', 'Recategorización', 'Exclusiones', 'Cotizaciones previsionales', 'Obra social', 'Inclusión social'],
    relatedLaws: ['DNU 70/2023', 'Ley de Obras Sociales', 'Ley del INSSJP (PAMI)', 'Ley 27.743'],
    regulations: [], modifyingNorms: ['Ley 26.565', 'Ley 27.430', 'Ley 27.618', 'Ley 27.737', 'Ley 27.743'], derogatingNorms: [],
    jurisprudence: [], doctrine: [], obligations: [], rights: [], sanctions: [], useCases: [],
    faq: [
      {
        question: '¿Qué impuestos reemplaza el Monotributo?',
        answer: 'El pago mensual del Monotributo reemplaza el Impuesto a las Ganancias y el IVA (art. 6 del Anexo) e incluye los aportes a la jubilación y a la obra social. Con una sola cuota mensual el pequeño contribuyente queda al día con esos tres conceptos.',
      },
      {
        question: '¿Cuáles son las categorías del Monotributo y cada cuánto se actualizan?',
        answer: 'Van de la A a la K según los ingresos brutos anuales, la superficie del local, la energía eléctrica consumida y los alquileres (art. 8 del Anexo). Los montos se actualizan automáticamente por el IPC cada semestre, en enero y julio (art. 52), y ARCA publica los valores vigentes.',
      },
      {
        question: '¿El DNU 70/2023 modificó el Monotributo?',
        answer: 'No. El DNU 70/2023 no modifica la Ley de Monotributo. Solo la menciona en su artículo 341, al disponer que los atletas que reciben becas de la Ley del Deporte se asimilan a la condición de pequeños contribuyentes a los efectos previsionales.',
      },
    ],
    createdAt: '2026-06-10T00:00:00.000Z',
    updatedAt: '2026-06-10T00:00:00.000Z',
  },
  createdAt: '2026-06-10T00:00:00.000Z',
  updatedAt: '2026-06-10T00:00:00.000Z',
};

export default LEY_24977;
