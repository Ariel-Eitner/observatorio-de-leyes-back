/**
 * Ley 27.551 — Ley de Alquileres (2020).
 * Reformó el régimen de locaciones del Código Civil y Comercial y creó el
 * Programa Nacional de Alquiler Social. DEROGADA por el DNU 70/2023.
 *
 * Fuente oficial: https://www.argentina.gob.ar/normativa/nacional/ley-27551-339378/texto
 * Texto literal verificado (BO 34416, 30/06/2020).
 */
import type { Law, Article } from '../common/types/law.types';

const LAW_ID = 'ley-27551';

/** Crea un artículo con un único segmento (texto oficial + explicación). */
function art(
  number: string,
  title: string,
  text: string,
  explanation: string,
): Article {
  const id = `${LAW_ID}-art-${number}`;
  return {
    id,
    lawId: LAW_ID,
    number,
    title,
    text,
    plainLanguageExplanation: explanation,
    practicalEffects: [],
    examples: [],
    relatedArticles: [],
    jurisprudence: [],
    regulations: [],
    keywords: [],
    order: Number(number),
    segments: [
      {
        id: `${id}-s1`,
        lawId: LAW_ID,
        articleId: id,
        articleNumber: number,
        segmentType: 'PARAGRAPH',
        text,
        plainExplanation: explanation,
        practicalExample: null,
        references: [],
        order: 0,
      },
    ],
    amendments: [],
  };
}

const ARTICULOS: Article[] = [
  art(
    '1',
    'Domicilio especial (art. 75 del Código Civil y Comercial)',
    `Sustitúyase el artículo 75 del Código Civil y Comercial de la Nación por el siguiente: Artículo 75: Domicilio especial. Las partes de un contrato pueden elegir un domicilio para el ejercicio de los derechos y obligaciones que de él emanan. Pueden además constituir un domicilio electrónico en el que se tengan por eficaces todas las notificaciones, comunicaciones y emplazamientos que allí se dirijan.`,
    `Permite a las partes de un contrato fijar un domicilio especial —incluso electrónico— donde se consideran válidas todas las notificaciones. En un alquiler, sirve para que intimaciones y avisos lleguen a una dirección acordada de antemano.`,
  ),
  art(
    '2',
    'Locación habitacional: límites a favor del inquilino (art. 1.196 del Código Civil y Comercial)',
    `Sustitúyase el artículo 1.196 del Código Civil y Comercial de la Nación por el siguiente: Artículo 1.196: Locación habitacional. Si el destino es habitacional, no puede requerirse del locatario: a) El pago de alquileres anticipados por períodos mayores a un mes; b) Depósitos de garantía o exigencias asimilables, por cantidad mayor del importe equivalente al primer mes de alquiler. El depósito de garantía será devuelto mediante la entrega de una suma equivalente al precio del último mes de la locación, o la parte proporcional en caso de haberse efectuado un depósito inferior a un mes de alquiler. El reintegro deberá hacerse efectivo en el momento de la restitución del inmueble. En el caso de existir alguna deuda por servicios públicos domiciliarios o expensas, correspondientes al período contractual y que al momento de la entrega del inmueble no hubiese sido facturada, puede acordarse su pago tomando al efecto los valores del último servicio o expensas abonado, o bien el locador puede retener una suma equivalente a dichos montos como garantía de pago. En este último caso, una vez que el locatario abone las facturas remanentes, debe presentar las constancias al locador, quien debe restituir de manera inmediata las sumas retenidas; c) El pago de valor llave o equivalentes; y d) La firma de pagarés o cualquier otro documento que no forme parte del contrato original.`,
    `En viviendas, puso límites a favor del inquilino: prohibió pedir más de un mes de alquiler por adelantado, depósitos mayores a un mes (que se devuelven al valor del último mes), el "valor llave" y la firma de pagarés. El DNU 70/2023 derogó estos límites y volvió a la libre negociación.`,
  ),
  art(
    '3',
    'Plazo mínimo de la locación (art. 1.198 del Código Civil y Comercial)',
    `Sustitúyase el artículo 1.198 del Código Civil y Comercial de la Nación por el siguiente: Artículo 1.198: Plazo mínimo de la locación de inmueble. El contrato de locación de inmueble, cualquiera sea su destino, si carece de plazo expreso y determinado mayor, se considera celebrado por el plazo mínimo legal de tres (3) años, excepto los casos del artículo 1.199. El locatario puede renunciar a este plazo si está en la tenencia de la cosa.`,
    `Elevó el plazo mínimo de las locaciones de 2 a 3 años. Si el contrato no fijaba un plazo mayor, se entendía celebrado por 3 años. El DNU 70/2023 eliminó el plazo mínimo legal: hoy las partes lo pactan libremente.`,
  ),
  art(
    '4',
    'Excepciones al plazo mínimo (art. 1.199 del Código Civil y Comercial)',
    `Sustitúyase el artículo 1.199 del Código Civil y Comercial de la Nación por el siguiente: Artículo 1.199: Excepciones al plazo mínimo legal. No se aplica el plazo mínimo legal a los contratos de locación de inmuebles o parte de ellos destinados a: a) Sede de embajada, consulado u organismo internacional, y el destinado a habitación de su personal extranjero diplomático o consular; b) Habitación con muebles que se arriende con fines de turismo, descanso o similares. Si el plazo del contrato o de los contratos consecutivos supera los tres (3) meses, se presume que no fue hecho con esos fines; c) Guarda de cosas; d) Exposición u oferta de cosas o servicios en un predio ferial. Tampoco se aplica el plazo mínimo legal a los contratos que tengan por objeto el cumplimiento de una finalidad determinada expresada en el contrato y que debe normalmente cumplirse en el plazo menor pactado.`,
    `Enumeró los casos que quedan afuera del plazo mínimo: embajadas y consulados, alquileres turísticos (si superan 3 meses se presume que no son turísticos), guarda de cosas, ferias y contratos con una finalidad puntual de corto plazo.`,
  ),
  art(
    '5',
    'Conservar la cosa apta para el uso (art. 1.201 del Código Civil y Comercial)',
    `Sustitúyase el artículo 1.201 del Código Civil y Comercial de la Nación por el siguiente: Artículo 1.201: Conservar la cosa con aptitud para el uso convenido. El locador debe conservar la cosa locada en estado de servir al uso y goce convenido y efectuar a su cargo la reparación que exija el deterioro en su calidad o defecto, originado por cualquier causa no imputable al locatario. En caso de negativa o silencio del locador ante un reclamo del locatario debidamente notificado, para que efectúe alguna reparación urgente, el locatario puede realizarla por sí, con cargo al locador, una vez transcurridas al menos veinticuatro (24) horas corridas, contadas a partir de la recepción de la notificación. Si las reparaciones no fueran urgentes, el locatario debe intimar al locador para que realice las mismas dentro de un plazo que no podrá ser inferior a diez (10) días corridos, contados a partir de la recepción de la intimación, cumplido el cual podrá proceder en la forma indicada en el párrafo precedente. En todos los casos, la notificación remitida al domicilio denunciado por el locador en el contrato se tendrá por válida, aun si el locador se negara a recibirla o no pudiese perfeccionarse por motivos imputables al mismo.`,
    `Obligó al propietario a mantener el inmueble en condiciones y a pagar las reparaciones que no sean culpa del inquilino. Si el propietario no responde, el inquilino puede repararlo por su cuenta y descontarlo: a las 24 horas si es urgente, o a los 10 días si no lo es.`,
  ),
  art(
    '6',
    'Frustración del uso o goce (art. 1.203 del Código Civil y Comercial)',
    `Sustitúyase el artículo 1.203 del Código Civil y Comercial de la Nación por el siguiente: Artículo 1.203: Frustración del uso o goce de la cosa. Si por causas no imputables al locatario, éste se ve impedido de usar o gozar de la cosa, o ésta no puede servir para el objeto de la convención, puede pedir la rescisión del contrato, o la cesación del pago del precio por el tiempo que no pueda usar o gozar de la cosa. Si no se viese afectada directa o indirectamente la cosa misma, sus obligaciones continúan como antes.`,
    `Si por causas ajenas a él el inquilino no puede usar el inmueble, puede rescindir el contrato o dejar de pagar el alquiler mientras dure el impedimento. Si el inmueble en sí no se ve afectado, sus obligaciones siguen iguales.`,
  ),
  art(
    '7',
    'Compensación de gastos (art. 1.204 bis del Código Civil y Comercial)',
    `Agréguese como artículo 1.204 bis del Código Civil y Comercial de la Nación el siguiente: Artículo 1.204 bis: Compensación. Los gastos y acreencias que se encuentran a cargo del locador conforme las disposiciones de esta sección, pueden ser compensados de pleno derecho por el locatario con los cánones locativos, previa notificación fehaciente al locador del detalle de los mismos.`,
    `Permitió al inquilino descontar directamente del alquiler los gastos que le correspondían al propietario, siempre que le avise antes de manera fehaciente con el detalle de esos gastos.`,
  ),
  art(
    '8',
    'Cargas y contribuciones (art. 1.209 del Código Civil y Comercial)',
    `Sustitúyase el artículo 1.209 del Código Civil y Comercial de la Nación por el siguiente: Artículo 1.209: Pagar cargas y contribuciones por la actividad. El locatario tiene a su cargo el pago de las cargas y contribuciones que se originen en el destino que dé a la cosa locada. No tiene a su cargo el pago de las que graven la cosa ni las expensas comunes extraordinarias. Solo puede establecerse que estén a cargo del locatario aquellas expensas que deriven de gastos habituales, entendiéndose por tales aquellos que se vinculan a los servicios normales y permanentes a disposición del locatario, independientemente de que sean considerados como expensas comunes ordinarias o extraordinarias.`,
    `Estableció que el inquilino paga solo las expensas habituales (servicios normales y permanentes), pero no las expensas extraordinarias ni los impuestos que gravan el inmueble, que quedan a cargo del propietario.`,
  ),
  art(
    '9',
    'Resolución anticipada (art. 1.221 del Código Civil y Comercial)',
    `Sustitúyase el artículo 1.221 del Código Civil y Comercial de la Nación por el siguiente: Artículo 1.221: Resolución anticipada. El contrato de locación puede ser resuelto anticipadamente por el locatario: a) Si la cosa locada es un inmueble y han transcurrido seis (6) meses de contrato, debiendo notificar en forma fehaciente su decisión al locador con al menos un (1) mes de anticipación. Si hace uso de la opción resolutoria en el primer año de vigencia de la relación locativa, debe abonar al locador, en concepto de indemnización, la suma equivalente a un (1) mes y medio de alquiler al momento de desocupar el inmueble y la de un (1) mes si la opción se ejercita transcurrido dicho lapso. En los contratos de inmuebles destinados a vivienda, cuando la notificación al locador se realiza con una anticipación de tres (3) meses o más, transcurridos al menos seis (6) meses de contrato, no corresponde el pago de indemnización alguna por dicho concepto. b) En los casos del artículo 1.199, debiendo abonar al locador el equivalente a dos (2) meses de alquiler.`,
    `Reguló cómo el inquilino puede irse antes de tiempo: después de 6 meses, avisando con 1 mes de anticipación. La indemnización es de un mes y medio de alquiler si se va en el primer año, o de un mes después. En vivienda, si avisa con 3 meses o más, no paga indemnización.`,
  ),
  art(
    '10',
    'Renovación del contrato (art. 1.221 bis del Código Civil y Comercial)',
    `Agréguese como artículo 1.221 bis del Código Civil y Comercial de la Nación el siguiente: Artículo 1.221 bis: Renovación del contrato. En los contratos de inmuebles destinados a vivienda, dentro de los tres (3) últimos meses de la relación locativa, cualquiera de las partes puede convocar a la otra, notificándola en forma fehaciente, a efectos de acordar la renovación del contrato, en un plazo no mayor a quince (15) días corridos. En caso de silencio del locador o frente a su negativa de llegar a un acuerdo, estando debidamente notificado, el locatario puede resolver el contrato de manera anticipada sin pagar la indemnización correspondiente.`,
    `Creó un mecanismo de renovación: en los últimos 3 meses del contrato, cualquiera de las partes puede convocar a la otra a negociar la renovación. Si el propietario calla o se niega, el inquilino puede irse antes sin pagar indemnización.`,
  ),
  art(
    '11',
    'Intimación de pago y desalojo de viviendas (art. 1.222 del Código Civil y Comercial)',
    `Sustitúyase el artículo 1.222 del Código Civil y Comercial de la Nación por el siguiente: Artículo 1.222: Intimación de pago y desalojo de viviendas. Si el destino es habitacional, previamente a la demanda de desalojo por falta de pago de alquileres, el locador debe intimar fehacientemente al locatario al pago de la cantidad debida, otorgando para ello un plazo que nunca debe ser inferior a diez (10) días corridos contados a partir de la recepción de la intimación, especificando el lugar de pago. La notificación remitida al domicilio denunciado en el contrato por el locatario se tiene por válida, aun si éste se negara a recibirla o no pudiese perfeccionarse por motivos imputables al mismo. Cumplido el plazo previsto en el primer párrafo de este artículo, o habiéndose verificado la extinción de la locación por cualquier motivo, el locatario debe restituir la tenencia del inmueble locado. Ante el incumplimiento del locatario, el locador puede iniciar la acción judicial de desalojo, la que debe sustanciarse por el proceso previsto al efecto en cada jurisdicción y en caso de no prever un procedimiento especial, el más abreviado que establezcan sus leyes procesales o especiales. En ningún caso el locador puede negarse a recibir las llaves del inmueble o condicionar la misma, sin perjuicio de la reserva por las obligaciones pendientes a cargo del locatario. En caso de negativa o silencio frente al requerimiento por parte del inquilino a efectos de que se le reciba la llave del inmueble, éste puede realizar la consignación judicial de las mismas, siendo los gastos y costas a cargo del locador. En ningún caso se adeudarán alquileres ni ningún tipo de obligación accesoria a partir del día de la notificación fehaciente realizada al locador a efectos de que reciba las llaves del inmueble, siempre que el locatario efectúe la consignación judicial dentro de los diez (10) días hábiles siguientes a la misma, o desde que le fuera notificado al locador el depósito judicial de la llave si la consignación se hubiese iniciado después del vencimiento de dicho plazo.`,
    `Antes de demandar el desalojo por falta de pago, obliga al propietario a intimar al inquilino dándole al menos 10 días para pagar. El propietario no puede negarse a recibir las llaves; si lo hace, el inquilino puede consignarlas judicialmente y deja de adeudar alquileres desde que avisó.`,
  ),
  art(
    '12',
    'Intervención de corredores inmobiliarios (art. 1.351 del Código Civil y Comercial)',
    `Sustitúyase el artículo 1.351 del Código Civil y Comercial de la Nación por el siguiente: Artículo 1.351: Intervención de uno o de varios corredores. Si solo interviene un corredor, todas las partes le deben comisión, excepto pacto en contrario o protesta de una de las partes según el artículo 1.346. No existe solidaridad entre las partes respecto del corredor. Si interviene un corredor por cada parte, cada uno de ellos solo tiene derecho a cobrar comisión de su respectivo comitente. En las locaciones de inmuebles la intermediación solo podrá estar a cargo de un profesional matriculado para ejercer el corretaje inmobiliario conforme la legislación local.`,
    `Reguló las comisiones de los corredores inmobiliarios: si interviene un solo corredor, todas las partes le deben comisión; si hay uno por parte, cada uno cobra del suyo. Exigió que la intermediación en alquileres esté a cargo de un corredor inmobiliario matriculado.`,
  ),
  art(
    '13',
    'Garantías',
    `Garantía. En las locaciones habitacionales, en el caso de requerirse una garantía, el locatario debe proponer al locador al menos dos (2) de las siguientes garantías: a) Título de propiedad inmueble; b) Aval bancario; c) Seguro de caución; d) Garantía de fianza o fiador solidario; o e) Garantía personal del locatario, que se documenta con recibo de sueldo, certificado de ingresos o cualquier otro medio fehaciente. En caso de ser más de un locatario, deben sumarse los ingresos de cada uno de ellos a los efectos de este artículo. El locador no puede requerir una garantía que supere el equivalente a cinco (5) veces el valor mensual de la locación, salvo que se trate del supuesto previsto en el inciso e), en el cual puede elevarse dicho valor hasta un máximo de diez (10) veces. Bajo tales condiciones, el locador debe aceptar una de las garantías propuestas por el locatario. En los supuestos de los incisos b), c) y d), la reglamentación debe establecer los requisitos que deben cumplir las personas que otorguen estas garantías así como las características y condiciones de las mismas.`,
    `Obligó a que el inquilino pudiera ofrecer al menos dos tipos de garantía (propiedad, aval bancario, seguro de caución, fiador o garantía personal con recibo de sueldo), y el propietario debía aceptar una. Puso topes: la garantía no podía superar 5 veces el alquiler mensual (o 10 si era garantía personal). El DNU 70/2023 lo derogó.`,
  ),
  art(
    '14',
    'Ajustes del alquiler (índice IPC/RIPTE)',
    `Ajustes. Los contratos de locación, cualquiera sea su destino, están exceptuados de lo dispuesto en los artículos 7° y 10 de la ley 23.928 y sus modificatorias. En los contratos de locación de inmuebles destinados a uso habitacional, el precio del alquiler debe fijarse como valor único y por períodos mensuales, sobre el cual solo pueden realizarse ajustes anuales. En ningún caso se pueden establecer bonificaciones ni otras metodologías que induzcan a error al locatario. A los fines dispuestos en el párrafo anterior, los ajustes deben efectuarse utilizando un índice conformado por partes iguales por las variaciones mensuales del índice de precios al consumidor (IPC) y la remuneración imponible promedio de los trabajadores estables (RIPTE), que debe ser elaborado y publicado mensualmente por el Banco Central de la República Argentina (BCRA).`,
    `Prohibió los ajustes en plazos menores a un año y obligó a calcular el aumento con un índice mixto (mitad inflación IPC, mitad salarios RIPTE) publicado por el Banco Central. El DNU 70/2023 lo derogó: hoy se puede pactar libremente la moneda, el índice y la periodicidad del ajuste.`,
  ),
  art(
    '15',
    'Consignación del alquiler',
    `Consignación. Si el locador de un inmueble se rehusare a cobrar el canon locativo, según lo dispone el artículo 1.208 del Código Civil y Comercial de la Nación, el locatario debe intimarlo de manera fehaciente a que lo reciba dentro de las cuarenta y ocho (48) horas siguientes a su notificación. En caso de silencio o negativa del locador, el locatario, dentro de los tres (3) días hábiles siguientes al vencimiento del plazo estipulado en la notificación, debe proceder a la consignación judicial del monto adeudado, o mediante cheque cancelatorio, de conformidad con las previsiones de la ley 25.345 y regulaciones del Banco Central de la República Argentina, de acuerdo a las modalidades que fijen al efecto las distintas jurisdicciones provinciales, el Gobierno de la Ciudad Autónoma de Buenos Aires y en su caso el Banco Central de la República Argentina, estando los gastos y costas correspondientes a cargo del locador.`,
    `Si el propietario se niega a cobrar, el inquilino debe intimarlo a recibir el pago en 48 horas y, si no responde, consignar judicialmente el dinero (o pagar con cheque cancelatorio) para no quedar en mora. Los gastos quedan a cargo del propietario.`,
  ),
  art(
    '16',
    'Declaración del contrato ante la AFIP',
    `Los contratos de locación de inmueble deben ser declarados por el locador ante la Administración Federal de Ingresos Públicos de la Nación (AFIP), dentro del plazo, en la forma y con los alcances que dicho organismo disponga. La Administración Federal de Ingresos Públicos (AFIP) debe disponer un régimen de facilidades para la registración de contratos vigentes. El incumplimiento del locador lo hace pasible de las sanciones previstas en la ley 11.683 (t. o. en 1998 y sus modificaciones). Cuando se inicien acciones judiciales a causa de la ejecución de un contrato de locación, previo a correr traslado de la demanda, el juez debe informar a la Administración Federal de Ingresos Públicos de la Nación (AFIP) sobre la existencia del contrato, a los fines de que tome la intervención que corresponda. Sin perjuicio de la obligación del locador, cualquiera de las partes puede informar la existencia del contrato a la Administración Federal de Ingresos Públicos de la Nación (AFIP) a los fines dispuestos en el presente artículo, en los términos que esta autoridad disponga.`,
    `Obligó al propietario a declarar el contrato ante la AFIP, bajo las sanciones de la ley 11.683 si no lo hacía. También dispuso que en los juicios por alquileres el juez informe a la AFIP sobre la existencia del contrato.`,
  ),
  art(
    '17',
    'Programa Nacional de Alquiler Social',
    `Alquiler social. Créase el Programa Nacional de Alquiler Social destinado a la adopción de medidas que tiendan a facilitar el acceso a una vivienda digna en alquiler mediante una contratación formal.`,
    `Creó el Programa Nacional de Alquiler Social, orientado a facilitar el acceso a una vivienda digna en alquiler mediante contratos formales, sobre todo para personas en situación de vulnerabilidad.`,
  ),
  art(
    '18',
    'Organismo rector del programa',
    `Organismo rector. El Ministerio del Interior, Obras Públicas y Vivienda, a través de la Secretaría de Vivienda, es el organismo rector encargado del diseño de las políticas públicas para efectivizar el Programa Nacional de Alquiler Social creado por el artículo 17 de la presente norma.`,
    `Designó a la Secretaría de Vivienda (dentro del entonces Ministerio del Interior, Obras Públicas y Vivienda) como el organismo encargado de diseñar y poner en marcha el Programa Nacional de Alquiler Social.`,
  ),
  art(
    '19',
    'Medidas de implementación del programa',
    `Medidas de implementación del programa. La Secretaría de Vivienda, para garantizar el logro de los objetivos del Programa Nacional de Alquiler Social creado por el artículo 17 de la presente norma, debe: a) Tener especial consideración con las personas que se encuentren en situación de violencia de género en el marco de lo previsto en la Ley de Protección Integral a las Mujeres, 26.485 y por las personas adultas mayores, velando por la no discriminación de las mismas; b) Promover, a través de los organismos competentes, la regulación del accionar de entidades que otorguen garantías de fianza o seguros de caución para contratos de alquiler de viviendas; c) Propiciar la creación de líneas de subsidios o créditos blandos a efectos de facilitar el acceso a la locación de viviendas; d) Diseñar e implementar mecanismos orientados a ampliar la oferta de alquileres de inmuebles destinados a la vivienda; e) Promover en conjunto con la Administración Nacional de la Seguridad Social la adopción de medidas que permitan facilitar el acceso al alquiler a jubilados, pensionados y titulares de la prestación por desempleo; f) Adoptar cualquier otra medida en su carácter de organismo rector que tenga por objeto facilitar el acceso a una vivienda digna en alquiler para todas aquellas personas que se encuentren en situación de vulnerabilidad; g) Fomentar la creación de mecanismos tendientes a asegurar el efectivo cumplimiento por parte del locador y del locatario de las obligaciones a su cargo; h) Apoyar a quienes tengan dificultades para cumplir con los requisitos de garantía, depósito y demás gastos necesarios para obtener una vivienda en alquiler, siempre que el destino de la locación sea el de vivienda familiar única en los términos y con los alcances que establezca la reglamentación; i) Promover, a través de los organismos competentes la creación de un seguro obligatorio que cubra la falta de pago de alquileres y las indemnizaciones por daño y ocupación indebida del inmueble; j) Generar alternativas para la resolución de conflictos entre locador y locatario, en general dictar o propiciar todo tipo de medidas orientadas a favorecer y ampliar la oferta de alquileres de inmuebles destinados a la vivienda y facilitar el acceso a dicha modalidad contractual.`,
    `Enumeró las medidas del programa: atención prioritaria a víctimas de violencia de género y adultos mayores, regulación de seguros de caución, subsidios y créditos blandos, ampliación de la oferta, acceso para jubilados y desempleados, un seguro contra la falta de pago y mecanismos de resolución de conflictos.`,
  ),
  art(
    '20',
    'Facultades de la Secretaría de Vivienda',
    `Facúltase a la Secretaría de Vivienda o el órgano que en el futuro la reemplace a dictar las medidas que resulten pertinentes a los fines de la adecuada implementación del Programa Nacional de Alquiler Social creado por el artículo 17 de la presente norma.`,
    `Facultó a la Secretaría de Vivienda (o al organismo que la reemplace) a dictar todas las medidas necesarias para implementar correctamente el Programa Nacional de Alquiler Social.`,
  ),
  art(
    '21',
    'Resolución de conflictos: mediación y arbitraje',
    `Resolución de conflictos. El Poder Ejecutivo nacional, a través del área competente del Ministerio de Justicia y Derechos Humanos, en forma concertada con las provincias y la Ciudad Autónoma de Buenos Aires, debe realizar las acciones necesarias para fomentar el desarrollo de ámbitos de mediación y arbitraje, gratuitos o de bajo costo, aplicando métodos específicos para la resolución de conflictos derivados de la relación locativa.`,
    `Encomendó al Poder Ejecutivo, junto con las provincias y la Ciudad de Buenos Aires, fomentar ámbitos de mediación y arbitraje gratuitos o de bajo costo para resolver los conflictos entre inquilinos y propietarios.`,
  ),
  art(
    '22',
    'Modificación de la Ley 26.589 (mediación)',
    `Modificación de la ley 26.589. Sustitúyase el artículo 6° de la ley 26.589, el que quedará redactado de la siguiente manera: Artículo 6°: Aplicación optativa del procedimiento de mediación prejudicial obligatoria. En los casos de ejecución el procedimiento de mediación prejudicial obligatoria es optativo para el reclamante sin que el requerido pueda cuestionar la vía.`,
    `Modificó la Ley 26.589 de mediación: en los juicios de ejecución (por ejemplo, el cobro de alquileres adeudados), la mediación prejudicial pasó a ser optativa para quien reclama, sin que la otra parte pueda objetarlo.`,
  ),
  art(
    '23',
    'Entrada en vigencia',
    `Las disposiciones de la presente ley entrarán en vigencia el día siguiente al de su publicación en el Boletín Oficial de la República Argentina y serán aplicables para los contratos que se celebren a partir de su entrada en vigencia.`,
    `La ley entró en vigencia el día siguiente a su publicación (1 de julio de 2020) y se aplicó a los contratos celebrados desde esa fecha. Por eso, los contratos firmados durante su vigencia se siguen rigiendo por ella aun después de su derogación.`,
  ),
  art(
    '24',
    'Comunicación',
    `Comuníquese al Poder Ejecutivo nacional.`,
    `Fórmula final de comunicación de la ley sancionada al Poder Ejecutivo nacional para su promulgación y publicación.`,
  ),
];

export const LEY_27551: Law = {
  id: LAW_ID,
  number: '27551',
  title: 'Ley de Alquileres',
  commonName: 'Ley de Alquileres',
  summary:
    'Ley de Alquileres (2020): reformó el régimen de locaciones del Código Civil y Comercial —plazo mínimo de 3 años, límites al depósito, ajuste anual por índice IPC/RIPTE y registro ante la AFIP— y creó el Programa Nacional de Alquiler Social. Fue derogada por el DNU 70/2023, que restableció la libertad contractual en las locaciones.',
  category: 'civil',
  categories: ['civil'],
  year: 2020,
  sanctionDate: '2020-06-11',
  promulgationDate: '2020-06-30',
  publicationDate: '2020-06-30',
  effectiveDate: '2020-07-01',
  derogatedDate: '2023-12-29',
  boNumber: '34416',
  status: 'DEROGADA',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/ley-27551-339378/texto',
  articleCount: 24,
  topics: ['Alquileres', 'Locación de vivienda', 'Contratos', 'Vivienda', 'Derecho civil'],
  keywords: [
    'ley de alquileres',
    '27551',
    'locación',
    'inquilino',
    'propietario',
    'depósito en garantía',
    'plazo mínimo',
    'ajuste IPC RIPTE',
    'programa de alquiler social',
    'contrato de alquiler',
  ],
  relatedNorms: ['codigo-civil-comercial', 'dnu-70-2023'],
  relations: [
    {
      type: 'MODIFICA',
      targetLawId: 'codigo-civil-comercial',
      targetLawLabel: 'Código Civil y Comercial',
      description:
        'Reformó el régimen de locaciones del Código Civil y Comercial (artículos 75, 1.196, 1.198 a 1.204 bis, 1.209, 1.221, 1.222 y 1.351).',
    },
    {
      type: 'RELACIONADA',
      targetLawId: 'dnu-70-2023',
      targetLawLabel: 'DNU 70/2023',
      description:
        'La Ley de Alquileres fue derogada por el DNU 70/2023, que restableció la libertad contractual en las locaciones.',
    },
  ],
  executiveSummary:
    'Sancionada en junio de 2020, buscó equilibrar la relación entre inquilinos y propietarios dando más estabilidad al inquilino: plazo mínimo de tres años, límites al depósito y a los pagos anticipados, ajuste anual obligatorio por un índice mixto (IPC y RIPTE), registro de los contratos ante la AFIP y un Programa Nacional de Alquiler Social. Su aplicación fue muy discutida —se la acusó de reducir la oferta y encarecer los alquileres— y el DNU 70/2023 la derogó por completo, devolviendo a las partes la libertad para pactar plazo, moneda, índice y periodicidad de ajuste.',
  objective:
    'Equilibrar la relación entre inquilinos y propietarios, dando más estabilidad y previsibilidad a quien alquila su vivienda.',
  problemItSolves:
    'La precariedad y los abusos en el mercado de alquileres: contratos cortos, depósitos elevados, ajustes frecuentes e informalidad de los contratos.',
  practicalImpact:
    'Rigió los contratos de locación celebrados entre el 1 de julio de 2020 y diciembre de 2023. El DNU 70/2023 la derogó y restableció la libertad contractual; los contratos firmados durante su vigencia se siguen rigiendo por sus reglas.',
  affectedSubjects: ['Inquilinos', 'Propietarios', 'Inmobiliarias', 'Garantes', 'Corredores inmobiliarios'],
  sections: [
    { id: `${LAW_ID}-sec-1`, lawId: LAW_ID, number: 'I', name: 'Reformas al Código Civil y Comercial de la Nación', articleStart: 1, articleEnd: 12, titles: [] },
    { id: `${LAW_ID}-sec-2`, lawId: LAW_ID, number: 'II', name: 'Regulación complementaria de las locaciones', articleStart: 13, articleEnd: 16, titles: [] },
    { id: `${LAW_ID}-sec-3`, lawId: LAW_ID, number: 'III', name: 'Programa Nacional de Alquiler Social', articleStart: 17, articleEnd: 20, titles: [] },
    { id: `${LAW_ID}-sec-4`, lawId: LAW_ID, number: 'IV', name: 'Métodos alternativos de resolución de conflictos', articleStart: 21, articleEnd: 22, titles: [] },
    { id: `${LAW_ID}-sec-5`, lawId: LAW_ID, number: 'V', name: 'Disposiciones finales', articleStart: 23, articleEnd: 24, titles: [] },
  ],
  articles: ARTICULOS,
  segments: [],
  annexes: [],
  amendments: [
    {
      id: `${LAW_ID}-amend-dnu70`,
      lawId: LAW_ID,
      modifyingLaw: 'DNU 70/2023',
      modifyingDate: '2023-12-29',
      description:
        'El DNU 70/2023 derogó íntegramente la Ley 27.551 de Alquileres y modificó el régimen de locaciones del Código Civil y Comercial, eliminando el plazo mínimo legal, los límites al depósito y a los pagos anticipados, y el índice de ajuste obligatorio.',
      createdAt: '2026-06-08T00:00:00.000Z',
    },
  ],
  metadata: {
    id: `${LAW_ID}-meta`,
    lawId: LAW_ID,
    mainTopic: 'Locación de inmuebles',
    subtopics: ['Plazo de locación', 'Depósito en garantía', 'Ajuste del alquiler', 'Garantías', 'Programa de alquiler social'],
    relatedLaws: ['Código Civil y Comercial', 'DNU 70/2023', 'Ley 23.928', 'Ley 26.589'],
    regulations: [],
    modifyingNorms: [],
    derogatingNorms: ['DNU 70/2023'],
    jurisprudence: [],
    doctrine: [],
    obligations: [],
    rights: [],
    sanctions: [],
    useCases: [],
    faq: [
      {
        question: '¿La Ley de Alquileres 27.551 sigue vigente?',
        answer:
          'No. Fue derogada por el DNU 70/2023, vigente desde fines de diciembre de 2023. Los contratos firmados mientras la ley estuvo vigente (julio 2020 a diciembre 2023) se siguen rigiendo por sus reglas; los nuevos, por la libertad contractual del DNU.',
      },
      {
        question: '¿Qué cambió con la derogación?',
        answer:
          'Desaparecieron el plazo mínimo de 3 años, el tope al depósito y a los pagos anticipados y el ajuste anual obligatorio por índice. Hoy las partes pueden pactar libremente plazo, moneda, periodicidad e índice de ajuste.',
      },
    ],
    createdAt: '2026-06-08T00:00:00.000Z',
    updatedAt: '2026-06-08T00:00:00.000Z',
  },
  createdAt: '2026-06-08T00:00:00.000Z',
  updatedAt: '2026-06-08T00:00:00.000Z',
};

export default LEY_27551;
