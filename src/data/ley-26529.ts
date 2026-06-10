/**
 * Ley 26.529 (2009) — Derechos del Paciente, Historia Clínica y Consentimiento Informado. VIGENTE.
 *
 * Texto ACTUALIZADO/vigente: consolidado con la reforma de "muerte digna" (Ley 26.742, 2012)
 * y la de historia clínica (Ley 26.812, 2013). 25 artículos + el art. 11 bis.
 *
 * El DNU 70/2023 NO modifica esta ley. La referencia es indirecta: el art. 1 de la Ley de
 * Recetas Electrónicas (27.553), sustituido por el art. 307 del DNU, se inscribe en el marco
 * de derechos del paciente que regula esta ley.
 *
 * Fuente oficial: https://www.argentina.gob.ar/normativa/nacional/ley-26529-160432/actualizacion
 */
import type { Law, Article } from '../common/types/law.types';

const LAW_ID = 'ley-26529';

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
  art('1', 'Ámbito de aplicación',
    `El ejercicio de los derechos del paciente, en cuanto a la autonomía de la voluntad, la información y la documentación clínica, se rige por la presente ley.`,
    `Establece qué regula la ley: los derechos del paciente sobre su autonomía (decidir sobre su salud), la información médica y su documentación clínica.`),

  // ── Capítulo I — DERECHOS DEL PACIENTE ─────────────────────────────────────
  art('2', 'Derechos esenciales del paciente',
    `Constituyen derechos esenciales en la relación entre el paciente y el o los profesionales de la salud, el o los agentes del seguro de salud, y cualquier efector de que se trate, los siguientes: a) Asistencia. El paciente, prioritariamente los niños, niñas y adolescentes, tiene derecho a ser asistido por los profesionales de la salud, sin menoscabo y distinción alguna, producto de sus ideas, creencias religiosas, políticas, condición socioeconómica, raza, sexo, orientación sexual o cualquier otra condición. El profesional actuante sólo podrá eximirse del deber de asistencia cuando se hubiere hecho cargo efectivamente del paciente otro profesional competente; b) Trato digno y respetuoso. El paciente tiene derecho a que los agentes del sistema de salud le otorguen un trato digno, con respeto a sus convicciones personales y morales, principalmente las relacionadas con sus condiciones socioculturales, de género, de pudor y a su intimidad, y se haga extensivo a los familiares o acompañantes; c) Intimidad. Toda actividad médico-asistencial tendiente a obtener, clasificar, utilizar, administrar, custodiar y transmitir información y documentación clínica del paciente debe observar el estricto respeto por la dignidad humana y la autonomía de la voluntad, así como el debido resguardo de la intimidad y la confidencialidad de sus datos sensibles, sin perjuicio de la Ley Nº 25.326; d) Confidencialidad. El paciente tiene derecho a que toda persona que participe en la elaboración o manipulación de la documentación clínica guarde la debida reserva, salvo disposición en contrario de autoridad judicial competente o autorización del propio paciente; e) Autonomía de la voluntad. El paciente tiene derecho a aceptar o rechazar determinadas terapias o procedimientos médicos o biológicos, con o sin expresión de causa, como así también a revocar posteriormente su manifestación de la voluntad. Los niños, niñas y adolescentes tienen derecho a intervenir en los términos de la Ley 26.061 en la toma de decisión sobre terapias o procedimientos médicos o biológicos que involucren su vida o salud. El paciente que presente una enfermedad irreversible, incurable o se encuentre en estadio terminal, o haya sufrido lesiones que lo coloquen en igual situación, informado en forma fehaciente, tiene derecho a manifestar su voluntad en cuanto al rechazo de procedimientos quirúrgicos, de reanimación artificial o al retiro de medidas de soporte vital cuando sean extraordinarias o desproporcionadas en relación con la perspectiva de mejoría, o produzcan un sufrimiento desmesurado. También podrá rechazar procedimientos de hidratación o alimentación cuando produzcan como único efecto la prolongación en el tiempo de ese estadio terminal irreversible o incurable. En todos los casos la negativa o el rechazo no significará la interrupción de las medidas y acciones para el adecuado control y alivio del sufrimiento del paciente; f) Información Sanitaria. El paciente tiene derecho a recibir la información sanitaria necesaria, vinculada a su salud. El derecho a la información sanitaria incluye el de no recibir la mencionada información; g) Interconsulta Médica. El paciente tiene derecho a recibir la información sanitaria por escrito, a fin de obtener una segunda opinión sobre el diagnóstico, pronóstico o tratamiento relacionados con su estado de salud.`,
    `Es el corazón de la ley: enumera los derechos de todo paciente. Derecho a ser atendido sin discriminación (con prioridad para niños y adolescentes), a un trato digno, a la intimidad y confidencialidad de sus datos, y —clave— a la autonomía de la voluntad: aceptar o rechazar tratamientos. El inciso e), reformado por la "ley de muerte digna" (26.742), reconoce que un paciente terminal puede rechazar la reanimación, el soporte vital o la hidratación/alimentación cuando solo prolongan el sufrimiento, sin que eso interrumpa los cuidados paliativos.`),

  // ── Capítulo II — DE LA INFORMACIÓN SANITARIA ──────────────────────────────
  art('3', 'Definición de información sanitaria',
    `A los efectos de la presente ley, entiéndase por información sanitaria aquella que, de manera clara, suficiente y adecuada a la capacidad de comprensión del paciente, informe sobre su estado de salud, los estudios y tratamientos que fueren menester realizarle y la previsible evolución, riesgos, complicaciones o secuelas de los mismos.`,
    `Define qué es la "información sanitaria": lo que el médico debe explicarle al paciente, de forma clara y entendible, sobre su salud, los estudios y tratamientos, y cómo puede evolucionar.`),
  art('4', 'A quién se brinda la información',
    `La información sanitaria sólo podrá ser brindada a terceras personas con autorización del paciente. En el supuesto de incapacidad del paciente o imposibilidad de comprender la información a causa de su estado físico o psíquico, la misma será brindada a su representante legal o, en su defecto, al cónyuge que conviva con el paciente, o la persona que, sin ser su cónyuge, conviva o esté a cargo de la asistencia o cuidado del mismo y los familiares hasta el cuarto grado de consanguinidad.`,
    `La información médica es del paciente: solo se le da a otros con su autorización. Si el paciente no puede comprender (por su estado), se informa a su representante legal, su cónyuge o conviviente, o sus familiares cercanos.`),

  // ── Capítulo III — DEL CONSENTIMIENTO INFORMADO ────────────────────────────
  art('5', 'Definición de consentimiento informado',
    `Entiéndese por consentimiento informado la declaración de voluntad suficiente efectuada por el paciente, o por sus representantes legales en su caso, emitida luego de recibir, por parte del profesional interviniente, información clara, precisa y adecuada con respecto a: a) Su estado de salud; b) El procedimiento propuesto, con especificación de los objetivos perseguidos; c) Los beneficios esperados del procedimiento; d) Los riesgos, molestias y efectos adversos previsibles; e) La especificación de los procedimientos alternativos y sus riesgos, beneficios y perjuicios en relación con el procedimiento propuesto; f) Las consecuencias previsibles de la no realización del procedimiento propuesto o de los alternativos especificados; g) El derecho que le asiste, en caso de padecer una enfermedad irreversible, incurable o en estadio terminal, a rechazar procedimientos quirúrgicos, de hidratación, alimentación, de reanimación artificial o el retiro de medidas de soporte vital cuando sean extraordinarios o desproporcionados o produzcan sufrimiento desmesurado; h) El derecho a recibir cuidados paliativos integrales en el proceso de atención de su enfermedad o padecimiento.`,
    `Define el "consentimiento informado": el paciente decide sobre un procedimiento DESPUÉS de que el médico le explique su estado, qué le van a hacer, los beneficios, los riesgos, las alternativas y qué pasa si no se lo hace. Incluye el derecho del paciente terminal a rechazar tratamientos que prolonguen el sufrimiento y a recibir cuidados paliativos.`),
  art('6', 'Obligatoriedad del consentimiento',
    `Toda actuación profesional en el ámbito médico-sanitario, sea público o privado, requiere, con carácter general y dentro de los límites que se fijen por vía reglamentaria, el previo consentimiento informado del paciente. En el supuesto de incapacidad del paciente, o imposibilidad de brindar el consentimiento informado a causa de su estado físico o psíquico, el mismo podrá ser dado por las personas mencionadas en el artículo 21 de la Ley 24.193, con los requisitos y el orden de prelación allí establecido. Deberá garantizarse que el paciente, en la medida de sus posibilidades, participe en la toma de decisiones a lo largo del proceso sanitario.`,
    `Ningún tratamiento puede hacerse sin el consentimiento informado del paciente. Si el paciente no puede darlo, lo dan sus familiares (en el orden de la ley de trasplantes), pero igual hay que hacer participar al paciente en lo que pueda.`),
  art('7', 'Forma del consentimiento (verbal o escrito)',
    `El consentimiento será verbal con las siguientes excepciones, en los que será por escrito y debidamente suscrito: a) Internación; b) Intervención quirúrgica; c) Procedimientos diagnósticos y terapéuticos invasivos; d) Procedimientos que impliquen riesgos según lo determine la reglamentación; e) Revocación; f) En el supuesto del inciso g) del artículo 5° (rechazo de tratamientos por paciente terminal) deberá dejarse constancia de la información por escrito en un acta firmada por todos los intervinientes en el acto.`,
    `Por regla el consentimiento es verbal, pero debe ser por escrito en los casos importantes: internación, cirugía, procedimientos invasivos o riesgosos, la revocación, y el rechazo de tratamientos por parte de un paciente terminal (que se documenta en un acta firmada).`),
  art('8', 'Exposición con fines académicos',
    `Se requiere el consentimiento del paciente o, en su defecto, el de sus representantes legales, y del profesional de la salud interviniente, ante exposiciones con fines académicos, con carácter previo a la realización de dicha exposición.`,
    `Para usar el caso de un paciente en una clase o presentación académica hace falta su consentimiento previo (o el de su representante).`),
  art('9', 'Excepciones al consentimiento informado',
    `El profesional de la salud quedará eximido de requerir el consentimiento informado en los siguientes casos: a) Cuando mediare grave peligro para la salud pública; b) Cuando mediare una situación de emergencia, con grave peligro para la salud o vida del paciente, y no pudiera dar el consentimiento por sí o a través de sus representantes legales. Las excepciones se acreditarán conforme a la reglamentación y deberán ser interpretadas con carácter restrictivo.`,
    `Solo en dos casos el médico puede actuar sin consentimiento: peligro grave para la salud pública, o una emergencia con riesgo de vida en la que el paciente no puede consentir y no hay representante. Estas excepciones se interpretan de forma restrictiva.`),
  art('10', 'Revocabilidad de la decisión',
    `La decisión del paciente, en cuanto a consentir o rechazar los tratamientos indicados, puede ser revocada. El profesional actuante debe acatar tal decisión, y dejar expresa constancia de ello en la historia clínica, adoptando todas las formalidades que resulten menester a los fines de acreditar fehacientemente tal manifestación de voluntad, y que la misma fue adoptada en conocimiento de los riesgos previsibles que la decisión implica. Las personas mencionadas en el artículo 21 de la Ley 24.193 podrán revocar su anterior decisión con los requisitos y el orden de prelación allí establecido. Deberá garantizarse que el paciente, en la medida de sus posibilidades, participe en la toma de decisiones a lo largo del proceso sanitario.`,
    `El paciente puede cambiar de opinión: tanto el consentimiento como el rechazo de un tratamiento se pueden revocar en cualquier momento, y el médico debe acatarlo y dejarlo asentado en la historia clínica.`),
  art('11', 'Directivas anticipadas',
    `Toda persona capaz mayor de edad puede disponer directivas anticipadas sobre su salud, pudiendo consentir o rechazar determinados tratamientos médicos, preventivos o paliativos, y decisiones relativas a su salud. Las directivas deberán ser aceptadas por el médico a cargo, salvo las que impliquen desarrollar prácticas eutanásicas, las que se tendrán como inexistentes. La declaración de voluntad deberá formalizarse por escrito ante escribano público o juzgados de primera instancia, para lo cual se requerirá de la presencia de dos (2) testigos. Dicha declaración podrá ser revocada en todo momento por quien la manifestó.`,
    `Permite dejar por anticipado, por escrito y ante escribano o juez (con dos testigos), instrucciones sobre qué tratamientos aceptar o rechazar si en el futuro no podés decidir. El médico debe respetarlas, salvo que pidan eutanasia (eso se tiene por inexistente). Se pueden revocar cuando quieras.`),
  art('11 bis', 'Exención de responsabilidad del profesional',
    `Ningún profesional interviniente que haya obrado de acuerdo con las disposiciones de la presente ley está sujeto a responsabilidad civil, penal, ni administrativa, derivadas del cumplimiento de la misma.`,
    `Protege al médico: si actuó respetando esta ley (por ejemplo, acatando el rechazo de un tratamiento por un paciente terminal), no puede ser responsabilizado civil, penal ni administrativamente por ello.`,
    11.1),

  // ── Capítulo IV — DE LA HISTORIA CLÍNICA ───────────────────────────────────
  art('12', 'Definición de historia clínica',
    `A los efectos de esta ley, entiéndase por historia clínica el documento obligatorio cronológico, foliado y completo en el que conste toda actuación realizada al paciente por profesionales y auxiliares de la salud.`,
    `Define la historia clínica: el documento obligatorio, ordenado por fecha y completo, donde se registra todo lo que se le hace al paciente.`),
  art('13', 'Historia clínica informatizada',
    `El contenido de la historia clínica puede confeccionarse en soporte magnético siempre que se arbitren todos los medios que aseguren la preservación de su integridad, autenticidad, inalterabilidad, perdurabilidad y recuperabilidad de los datos contenidos en la misma en tiempo y forma. A tal fin, debe adoptarse el uso de accesos restringidos con claves de identificación, medios no reescribibles de almacenamiento, control de modificación de campos o cualquier otra técnica idónea para asegurar su integridad.`,
    `La historia clínica puede ser digital, siempre que se garantice que no se pueda alterar ni perder: con claves de acceso, almacenamiento seguro y control de cambios.`),
  art('14', 'Titularidad: el paciente es dueño de su historia clínica',
    `El paciente es el titular de la historia clínica. A su simple requerimiento debe suministrársele copia de la misma, autenticada por autoridad competente de la institución asistencial. La entrega se realizará dentro de las cuarenta y ocho (48) horas de solicitada, salvo caso de emergencia.`,
    `La historia clínica es del paciente: puede pedir una copia y se la deben entregar en 48 horas, sin tener que explicar por qué.`),
  art('15', 'Qué debe contener la historia clínica',
    `Sin perjuicio de lo que disponga la reglamentación, en la historia clínica se debe asentar: a) La fecha de inicio de su confección; b) Datos identificatorios del paciente y su núcleo familiar; c) Datos identificatorios del profesional interviniente y su especialidad; d) Registros claros y precisos de los actos realizados por los profesionales y auxiliares intervinientes; e) Antecedentes genéticos, fisiológicos y patológicos del paciente, si los hubiere; f) En las historias clínicas odontológicas, registros que permitan la identificación del paciente; g) Todo acto médico realizado o indicado (prescripción y suministro de medicamentos, tratamientos, prácticas, estudios, intervención de especialistas, diagnóstico, pronóstico, evolución, ingresos y altas médicas). Los asientos de los incisos d), e), f) y g) deberán basarse en nomenclaturas y modelos universales de la Organización Mundial de la Salud.`,
    `Detalla todo lo que debe registrarse en la historia clínica: fecha, datos del paciente y del profesional, antecedentes, y cada acto médico (medicamentos, estudios, diagnósticos, evolución, ingresos y altas).`),
  art('16', 'Integridad de la historia clínica',
    `Forman parte de la historia clínica los consentimientos informados, las hojas de indicaciones médicas, las planillas de enfermería, los protocolos quirúrgicos, las prescripciones dietarias, los estudios y prácticas realizadas, rechazadas o abandonadas, debiéndose acompañar en cada caso breve sumario del acto de agregación y desglose autorizado con constancia de fecha, firma y sello del profesional actuante.`,
    `La historia clínica incluye todos los documentos asociados: consentimientos, indicaciones, planillas de enfermería, protocolos de cirugía, estudios, etc. Es un expediente integral.`),
  art('17', 'Unicidad',
    `La historia clínica tiene carácter único dentro de cada establecimiento asistencial público o privado, y debe identificar al paciente por medio de una "clave uniforme", la que deberá ser comunicada al mismo.`,
    `En cada hospital o clínica hay una sola historia clínica por paciente, identificada con una clave única que se le comunica.`),
  art('18', 'Inviolabilidad y guarda',
    `La historia clínica es inviolable. Los establecimientos asistenciales públicos o privados y los profesionales de la salud, en su calidad de titulares de consultorios privados, tienen a su cargo su guarda y custodia, asumiendo el carácter de depositarios, debiendo instrumentar los medios necesarios para evitar el acceso a la información por personas no autorizadas. Esta obligación rige durante el plazo mínimo de diez (10) años de prescripción liberatoria de la responsabilidad contractual, computado desde la última actuación registrada en la historia clínica.`,
    `La historia clínica es inviolable: el hospital o el médico deben guardarla y protegerla del acceso de personas no autorizadas, por un mínimo de 10 años desde la última anotación.`),
  art('19', 'Quiénes pueden pedir la historia clínica',
    `Se encuentran legitimados para solicitar la historia clínica: a) El paciente y su representante legal; b) El cónyuge o la persona que conviva con el paciente en unión de hecho, sea o no de distinto sexo según acreditación que determine la reglamentación, y los herederos forzosos, en su caso, con la autorización del paciente, salvo que éste se encuentre imposibilitado de darla; c) Los médicos y otros profesionales del arte de curar, cuando cuenten con expresa autorización del paciente o de su representante legal. El depositario deberá disponer de un ejemplar del expediente médico con carácter de copia de resguardo, con todas las formalidades y garantías del original.`,
    `Define quiénes pueden pedir la historia clínica: el paciente y su representante; el cónyuge o conviviente y los herederos forzosos (con autorización del paciente); y los médicos, si el paciente los autoriza.`),
  art('20', 'Habeas data: acción ante la negativa',
    `Todo sujeto legitimado en los términos del artículo 19, frente a la negativa, demora o silencio del responsable que tiene a su cargo la guarda de la historia clínica, dispondrá del ejercicio de la acción directa de "habeas data" a fin de asegurar el acceso y obtención de aquélla. A dicha acción se le imprimirá el modo de proceso que en cada jurisdicción resulte más apto y rápido. En jurisdicción nacional, esta acción quedará exenta de gastos de justicia.`,
    `Si te niegan, demoran o ignoran el pedido de tu historia clínica, podés iniciar una acción de "habeas data" para conseguirla por la vía judicial más rápida. En el fuero nacional es gratis.`),
  art('21', 'Sanciones',
    `Sin perjuicio de la responsabilidad penal o civil que pudiere corresponder, los incumplimientos de las obligaciones emergentes de la presente ley por parte de los profesionales y responsables de los establecimientos asistenciales constituirán falta grave, siendo pasibles en la jurisdicción nacional de las sanciones previstas en el título VIII de la Ley 17.132 —Régimen Legal del Ejercicio de la Medicina, Odontología y Actividades Auxiliares— y, en las jurisdicciones locales, de sanciones de similar tenor del régimen del ejercicio de la medicina que rija en cada una.`,
    `Incumplir esta ley es falta grave para el médico o la institución, además de la posible responsabilidad civil o penal. Las sanciones son las del régimen del ejercicio de la medicina (Ley 17.132 en el orden nacional).`),

  // ── Capítulo V — DISPOSICIONES GENERALES ───────────────────────────────────
  art('22', 'Autoridad de aplicación',
    `Es autoridad de aplicación de la presente ley en la jurisdicción nacional el Ministerio de Salud de la Nación, y en cada una de las jurisdicciones provinciales y la Ciudad Autónoma de Buenos Aires, la máxima autoridad sanitaria local. Invítase a las provincias y a la Ciudad Autónoma de Buenos Aires a adherir a la presente ley en lo que es materia del régimen de sanciones y del beneficio de gratuidad en materia de acceso a la justicia.`,
    `El Ministerio de Salud aplica la ley a nivel nacional y cada provincia a nivel local. Se invita a las provincias a adherir al régimen de sanciones y a la gratuidad de la acción judicial.`),
  art('23', 'Vigencia',
    `La presente ley es de orden público, y entrará en vigencia a partir de los noventa (90) días de la fecha de su publicación.`,
    `La ley es de orden público (no puede dejarse de lado por acuerdos privados) y entró en vigencia 90 días después de publicarse.`),
  art('24', 'Reglamentación',
    `El Poder Ejecutivo debe reglamentar la presente ley dentro de los noventa (90) días contados a partir de su publicación.`,
    `Ordena al Poder Ejecutivo reglamentar la ley dentro de los 90 días.`),
  art('25', 'Comunicación',
    `Comuníquese al Poder Ejecutivo.`,
    `Fórmula final de comunicación de la ley al Poder Ejecutivo.`),
];

export const LEY_26529: Law = {
  id: LAW_ID,
  number: '26529',
  title: 'Ley de Derechos del Paciente',
  commonName: 'Ley de Derechos del Paciente',
  shortCode: 'Ley 26.529',
  aliases: ['26.529', 'Ley de Derechos del Paciente', 'Derechos del Paciente', 'consentimiento informado', 'historia clínica', 'muerte digna'],
  isDestacada: true,
  summary:
    'Ley de Derechos del Paciente (2009): regula los derechos de toda persona en su relación con los profesionales e instituciones de la salud. Reconoce el derecho a la asistencia sin discriminación, al trato digno, a la intimidad y confidencialidad, a la información sanitaria y, sobre todo, a la autonomía de la voluntad: aceptar o rechazar tratamientos mediante el consentimiento informado. La reforma de "muerte digna" (Ley 26.742) sumó el derecho del paciente terminal a rechazar el soporte vital y a las directivas anticipadas. Regula también la historia clínica como documento del que el paciente es titular.',
  category: 'salud',
  categories: ['salud', 'derechos-humanos'],
  year: 2009,
  sanctionDate: '2009-10-21',
  promulgationDate: '2009-11-19',
  publicationDate: '2009-11-20',
  effectiveDate: '2010-02-18',
  derogatedDate: null,
  boNumber: '31785',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/ley-26529-160432/actualizacion',
  articleCount: 26,
  topics: ['Derechos del paciente', 'Consentimiento informado', 'Historia clínica', 'Muerte digna', 'Autonomía de la voluntad'],
  keywords: [
    'derechos del paciente', '26.529', 'consentimiento informado', 'historia clínica',
    'muerte digna', 'directivas anticipadas', 'autonomía de la voluntad', 'cuidados paliativos',
    'confidencialidad', 'salud',
  ],
  relatedNorms: ['ley-26682', 'codigo-civil-comercial', 'ley-25326', 'dnu-70-2023'],
  relations: [
    {
      type: 'RELACIONADA',
      targetLawId: 'codigo-civil-comercial',
      targetLawLabel: 'Código Civil y Comercial',
      description: 'El Código Civil y Comercial regula el consentimiento informado para actos médicos, las directivas médicas anticipadas y los derechos sobre el propio cuerpo (arts. 55 a 60), en línea con esta ley.',
    },
    {
      type: 'RELACIONADA',
      targetLawId: 'ley-26682',
      targetLawLabel: 'Ley de Medicina Prepaga',
      description: 'Los derechos del paciente rigen también frente a los agentes del seguro de salud y las empresas de medicina prepaga reguladas por la Ley 26.682.',
    },
    {
      type: 'RELACIONADA',
      targetLawId: 'ley-25326',
      targetLawLabel: 'Ley de Protección de Datos Personales',
      description: 'La confidencialidad de los datos sensibles de salud del paciente se complementa con la Ley de Protección de Datos Personales (25.326), citada expresamente en el art. 2 inc. c).',
    },
    {
      type: 'RELACIONADA',
      targetLawId: 'dnu-70-2023',
      targetLawLabel: 'DNU 70/2023',
      description: 'El DNU 70/2023 no modifica esta ley. La referencia es indirecta: el art. 1 de la Ley de Recetas Electrónicas (27.553), sustituido por el art. 307 del DNU, se inscribe en el marco de derechos del paciente que esta ley regula.',
    },
  ],
  executiveSummary:
    'Sancionada en 2009, la Ley 26.529 estableció el marco de los derechos del paciente en su relación con el sistema de salud. Reconoce el derecho a ser asistido sin discriminación, al trato digno, a la intimidad y confidencialidad de los datos, a la información sanitaria y, como eje, a la autonomía de la voluntad: ningún tratamiento puede realizarse sin el consentimiento informado del paciente. La reforma de "muerte digna" (Ley 26.742, 2012) reconoció el derecho del paciente terminal a rechazar el soporte vital cuando solo prolonga el sufrimiento y a otorgar directivas anticipadas. La ley regula además la historia clínica, de la que el paciente es titular y a la que puede acceder, con la acción de habeas data como garantía. El DNU 70/2023 no la modifica.',
  objective:
    'Garantizar los derechos de los pacientes —autonomía, información, confidencialidad y consentimiento informado— y regular la historia clínica y las directivas anticipadas en la relación con el sistema de salud.',
  problemItSolves:
    'La falta de un marco claro que pusiera al paciente en el centro de las decisiones sobre su salud, frente al paternalismo médico y la ausencia de reglas sobre el acceso a la historia clínica y el rechazo de tratamientos.',
  practicalImpact:
    'Todo paciente puede aceptar o rechazar tratamientos con información previa, acceder a una copia de su historia clínica en 48 horas, exigir confidencialidad y, si es terminal, rechazar el encarnizamiento terapéutico y dejar directivas anticipadas.',
  affectedSubjects: ['Pacientes', 'Profesionales de la salud', 'Hospitales y clínicas', 'Obras sociales y prepagas', 'Ministerio de Salud'],
  articles: ARTICULOS,
  segments: [],
  annexes: [],
  amendments: [],
  metadata: {
    id: `${LAW_ID}-meta`,
    lawId: LAW_ID,
    mainTopic: 'Derechos del paciente, consentimiento informado e historia clínica',
    subtopics: ['Consentimiento informado', 'Autonomía de la voluntad', 'Muerte digna', 'Directivas anticipadas', 'Historia clínica'],
    relatedLaws: ['Ley 26.742 (muerte digna)', 'Código Civil y Comercial', 'Ley de Medicina Prepaga', 'Ley de Protección de Datos Personales'],
    regulations: [], modifyingNorms: ['Ley 26.742', 'Ley 26.812'], derogatingNorms: [],
    jurisprudence: [], doctrine: [], obligations: [], rights: [], sanctions: [], useCases: [],
    faq: [
      {
        question: '¿Puedo acceder a mi historia clínica?',
        answer: 'Sí. El paciente es el titular de su historia clínica (art. 14). A su simple pedido deben darle una copia autenticada dentro de las 48 horas. Si se la niegan o demoran, puede usar la acción de habeas data (art. 20), que en jurisdicción nacional está exenta de gastos.',
      },
      {
        question: '¿Qué es la "muerte digna" en esta ley?',
        answer: 'La reforma de la Ley 26.742 reconoció que un paciente con una enfermedad irreversible, incurable o terminal puede rechazar la reanimación, el soporte vital o la hidratación y alimentación cuando solo prolongan el sufrimiento, sin que eso interrumpa los cuidados paliativos. También puede dejar directivas anticipadas por escrito (art. 11).',
      },
      {
        question: '¿Pueden hacerme un tratamiento sin mi consentimiento?',
        answer: 'Por regla, no: toda actuación médica requiere el consentimiento informado previo del paciente (art. 6). Solo se exceptúan dos casos, de interpretación restrictiva: grave peligro para la salud pública, o una emergencia con riesgo de vida en la que el paciente no puede consentir y no hay representante (art. 9).',
      },
    ],
    createdAt: '2026-06-10T00:00:00.000Z',
    updatedAt: '2026-06-10T00:00:00.000Z',
  },
  createdAt: '2026-06-10T00:00:00.000Z',
  updatedAt: '2026-06-10T00:00:00.000Z',
};

export default LEY_26529;
