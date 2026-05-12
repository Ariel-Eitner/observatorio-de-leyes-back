import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_06: LawSection = {
	id: 'ley-27742-s06',
	lawId: 'ley-27742',
	number: 'VI',
	name: 'Estabilidad. Compatibilidad con otros regímenes',
	articleStart: 201,
	articleEnd: 208,
	titles: [],
};

export const ARTICLES_06: Article[] = [
	{
		id: 'rigi-art-201',
		lawId: 'ley-27742',
		number: '201',
		title: 'Estabilidad normativa por 30 años',
		originalText:
			'Los VPU adheridos al RIGI gozarán, en lo que respecta a sus proyectos, de estabilidad normativa en materia tributaria, aduanera y cambiaria, consistente en que los incentivos otorgados en los capítulos IV y V del presente título no podrán ser afectados ni por la derogación de la presente ley ni por la creación de normativa tributaria, aduanera o cambiaria respectivamente más gravosa o restrictiva que las que se encuentran contempladas en el RIGI. La estabilidad tributaria, aduanera y cambiaria prevista en el presente, junto con la estabilidad regulatoria prevista en el presente artículo, tendrá vigencia durante los treinta (30) años siguientes de la fecha de adhesión por parte del VPU.\n\nLos proyectos de Exportación Estratégica de Largo Plazo que se ejecuten en etapas pueden tener la estabilidad extendida hasta 30 años desde la puesta en marcha de cada etapa, con el límite de 30 años desde cumplido el décimo año de la primera etapa.',
		currentText:
			'Los VPU RIGI tienen estabilidad normativa tributaria, aduanera, cambiaria y regulatoria por 30 años desde la adhesión. Ninguna norma posterior puede empeorar sus condiciones. Los proyectos de Exportación Estratégica con múltiples etapas pueden extender la estabilidad por cada etapa.',
		plainLanguageExplanation:
			'Esta es la columna vertebral del RIGI: las reglas al momento de adherir no cambian por 30 años. Si el Congreso sube impuestos, crea nuevas retenciones o impone controles cambiarios más duros, el proyecto RIGI sigue con las reglas de 2024. El VPU puede rechazar la aplicación de cualquier norma más gravosa con sólo mostrar su constancia de adhesión. Esto es lo que más debate genera: los críticos dicen que ninguna ley puede atar a los Congresos futuros.',
		practicalEffects: [
			'Cualquier modificación impositiva, aduanera o cambiaria perjudicial aprobada por el Congreso no aplica a los VPU adheridos al RIGI',
			'El VPU puede rechazar una inspección de AFIP o una retención bancaria invocando la estabilidad RIGI',
			'Las normas favorables sí aplican: si el gobierno baja impuestos, el VPU puede beneficiarse',
			'La estabilidad regulatoria abarca también las condiciones operativas, ambientales y administrativas',
		],
		examples: [
			'Si en 2030 el Congreso sube el impuesto a las ganancias del 35% al 40%, el proyecto RIGI sigue pagando el 25% establecido en el art. 183',
		],
		relatedArticles: ['rigi-art-165', 'rigi-art-202', 'rigi-art-203', 'rigi-art-204', 'rigi-art-205'],
		jurisprudence: [],
		regulations: [],
		keywords: ['estabilidad fiscal 30 años', 'garantía RIGI', 'intangibilidad', 'régimen especial', 'inversión extranjera'],
		order: 201,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-202',
		lawId: 'ley-27742',
		number: '202',
		title: 'Estabilidad tributaria — alcance y mecanismo de defensa',
		originalText:
			'Los tributos a aplicarse a los VPU adheridos al RIGI serán los vigentes a la fecha de adhesión con las modificaciones que surgen del capítulo IV del presente título. Los nuevos tributos que se creen a partir de la fecha de adhesión no serán aplicables a tales VPU. Los incrementos de tributos existentes no serán aplicables a los VPU.\n\nSin embargo, si el régimen general establece condiciones más favorables que el RIGI, el VPU puede beneficiarse de ellas.\n\nExisten excepciones: la estabilidad tributaria no impide la aplicación de normas anti-evasión, aportes de seguridad social, ni el aumento del IVA.',
		currentText:
			'Los VPU RIGI pagan los tributos vigentes al momento de adhesión. Los nuevos impuestos y los aumentos de impuestos existentes no les aplican. Excepción: sí aplican aportes de seguridad social, IVA y normas anti-evasión. Si el régimen general baja impuestos, el VPU puede elegir las condiciones más favorables.',
		plainLanguageExplanation:
			'La estabilidad tributaria tiene un mecanismo específico: si la AFIP cobra un impuesto que el VPU considera inaplicable por la estabilidad RIGI, puede rechazarlo. Si lo paga igual (por presión), el exceso se convierte en crédito fiscal usable contra otros impuestos nacionales. La carga de probar que no hubo incremento de impuesto está en la AFIP, no en el inversor.',
		practicalEffects: [
			'Invierte la carga de la prueba: la AFIP debe demostrar que no hubo aumento tributario',
			'Un nuevo impuesto como el "aporte solidario" de 2020 (Ley 27.605) no aplicaría a proyectos RIGI',
			'Los aportes de seguridad social y el IVA sí pueden actualizarse sin violar la estabilidad',
		],
		examples: [
			'Si el Congreso aprueba en 2027 un "impuesto a las superganancias" del sector minero del 15%, ese impuesto no aplica a los VPU adheridos al RIGI antes de 2027. Si la AFIP lo cobra de todas formas, el exceso se convierte en crédito fiscal utilizable contra otros impuestos nacionales',
		],
		relatedArticles: ['rigi-art-201', 'rigi-art-203', 'rigi-art-206'],
		jurisprudence: [],
		regulations: [],
		keywords: ['estabilidad tributaria', 'nuevo impuesto', 'incremento tributario', 'AFIP', 'crédito fiscal'],
		order: 202,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-203',
		lawId: 'ley-27742',
		number: '203',
		title: 'Protección penal tributaria ante discrepancias de criterio',
		originalText:
			'A efectos de lo previsto en el artículo 19 del Régimen Penal Tributario (Ley 27.430), en los casos previstos en los artículos 1°, 2°, 3°, 5°, 6° y 8° de dicho régimen, la Administración Tributaria estará dispensada de formular denuncia penal cuando el VPU haya exteriorizado el criterio utilizado para determinar la obligación tributaria —incluyendo aspectos relativos a la base imponible, alícuota, exenciones, hecho imponible, alcances y/o vulneración de la estabilidad tributaria— a través de presentación por escrito efectuada a dicha administración con anterioridad a la presentación de la respectiva declaración jurada.',
		currentText:
			'Si el VPU aplica un criterio impositivo diferente al de la AFIP —por ejemplo, considera que cierto tributo no le aplica por la estabilidad RIGI— y lo comunica por escrito antes de presentar la declaración jurada, la AFIP no puede formular denuncia penal tributaria (aunque sí puede reclamar en sede administrativa).',
		plainLanguageExplanation:
			'Protección clave para los inversores: si el VPU y la AFIP difieren sobre si un impuesto aplica por la estabilidad RIGI, el VPU puede defender su posición sin riesgo de denuncia penal, siempre que comunique por escrito su criterio antes de presentar su declaración jurada. Elimina el riesgo de criminalización por diferencias de interpretación jurídica.',
		practicalEffects: [
			'El inversor puede aplicar la estabilidad RIGI sin miedo a que la AFIP lo denuncie penalmente',
			'La disputa se resuelve en sede administrativa o judicial, no penal',
			'Incentivo adicional para adherir al RIGI: reduce el riesgo jurídico de las interpretaciones fiscales',
		],
		examples: [
			'Un VPU adhirió en 2024 con ganancias al 25%. En 2028 el Congreso sube la alícuota al 35% para todos. El VPU aplica el 25% por la estabilidad RIGI y lo informa por escrito a la AFIP antes de presentar su DDJJ. La AFIP no puede denunciarlo penalmente aunque considere que el criterio es incorrecto',
		],
		relatedArticles: ['rigi-art-202', 'rigi-art-206'],
		jurisprudence: [],
		regulations: [],
		keywords: ['penal tributario', 'AFIP', 'denuncia penal', 'estabilidad fiscal', 'criterio tributario'],
		order: 203,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-204',
		lawId: 'ley-27742',
		number: '204',
		title: 'Estabilidad aduanera',
		originalText:
			'En el caso de los tributos regidos por la legislación aduanera, serán de aplicación a las importaciones y exportaciones para consumo de los VPU adheridos al RIGI el régimen tributario, la alícuota y la base imponible vigentes al momento de la fecha de adhesión con las modificaciones que surgen de los incentivos previstos en el capítulo IV del presente título.\n\nLa AFIP deberá establecer un procedimiento de autoliquidación manual libre que garantice al VPU la posibilidad de presentar la liquidación de derechos que estime corresponder, sin que pueda exigírsele el pago previo de los importes que resulten aplicables bajo la normativa vigente en cada momento.',
		currentText:
			'La estabilidad aduanera (retenciones, aranceles, base imponible) se mantiene por 30 años. La AFIP debe crear un mecanismo de autoliquidación para que el VPU declare sus propias liquidaciones aduaneras sin pago previo obligatorio.',
		plainLanguageExplanation:
			'Si el Gobierno sube los aranceles de importación de maquinaria o las retenciones a exportaciones después de que el VPU se adhirió, el VPU sigue pagando las tarifas vigentes en 2024 (con los beneficios del art. 190 y 191). Además, puede calcular y pagar sus propios aranceles (autoliquidación) sin que la aduana le exija pagar el "precio de lista" por adelantado.',
		practicalEffects: [
			'Si el gobierno sube retenciones al 20% en 2026, el VPU adherido al RIGI sigue exento por la combinación de estabilidad + art. 191',
			'La autoliquidación manual evita conflictos operativos en el comercio exterior del proyecto',
		],
		examples: [],
		relatedArticles: ['rigi-art-190', 'rigi-art-191', 'rigi-art-201'],
		jurisprudence: [],
		regulations: [],
		keywords: ['estabilidad aduanera', 'retenciones', 'aranceles', 'autoliquidación', 'RIGI'],
		order: 204,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-205',
		lawId: 'ley-27742',
		number: '205',
		title: 'Estabilidad cambiaria',
		originalText:
			'Los VPU adheridos al RIGI gozarán de estabilidad normativa en materia cambiaria desde la fecha de adhesión al RIGI y durante el plazo mencionado en el artículo 201, la cual consiste en que el régimen cambiario vigente a la fecha de adhesión al RIGI, con las modificaciones aplicables en virtud de los incentivos cambiarios otorgados bajo la presente, no podrán ser afectados por la normativa cambiaria que se dicte estableciendo condiciones más gravosas.\n\nLas normas susceptibles de estabilidad cambiaria son todas las vinculadas a la materia cambiaria, con la única exclusión del tipo de cambio.\n\nEl VPU podrá rechazar la aplicación de restricciones cambiarias más gravosas con la mera exhibición de la constancia de adhesión al RIGI. Las nuevas normativas cambiarias más favorables sí aplican de inmediato.',
		currentText:
			'Estabilidad cambiaria por 30 años: las restricciones cambiarias del futuro no aplican al VPU si son más gravosas que las vigentes al momento de adhesión. El tipo de cambio no está estabilizado (el VPU opera al tipo de cambio del mercado). Si hay restricciones más favorables, el VPU las aprovecha de inmediato.',
		plainLanguageExplanation:
			'Si el BCRA impone en el futuro nuevas restricciones a la compra de dólares o a la remisión de utilidades al exterior, el VPU RIGI puede ignorarlas: muestra su constancia de adhesión al RIGI y opera con las reglas de 2024. Sin embargo, si el tipo de cambio varía (devaluación o apreciación), el VPU opera al tipo de cambio de mercado —la estabilidad es sobre las reglas, no sobre el precio del dólar.',
		practicalEffects: [
			'Un nuevo "cepo" cambiario impuesto en 2027 no afecta a los VPU adheridos al RIGI antes',
			'Si el gobierno levanta el cepo y permite operar libremente, los VPU RIGI también se benefician',
			'El BCRA debe dictar normas de implementación dentro de los 30 días de promulgada la ley',
		],
		examples: [],
		relatedArticles: ['rigi-art-198', 'rigi-art-199', 'rigi-art-200', 'rigi-art-201', 'rigi-art-206'],
		jurisprudence: [],
		regulations: ['BCRA — circulares de implementación'],
		keywords: ['estabilidad cambiaria', 'cepo cambiario', 'BCRA', 'restricciones cambiarias', 'RIGI 30 años'],
		order: 205,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-206',
		lawId: 'ley-27742',
		number: '206',
		title: 'Procedimiento ante violaciones a la estabilidad cambiaria',
		originalText:
			'En caso de que un VPU adherido al RIGI alegue una violación a la estabilidad normativa cambiaria, dicho VPU podrá continuar cumpliendo con sus obligaciones cambiarias aplicando las disposiciones normativas vigentes a la fecha de adhesión, notificando fehacientemente al Banco Central de la República Argentina esta circunstancia. Si el Banco Central considerara que no ha existido tal violación, previo a dar inicio al proceso sumario previsto en el artículo 8° de la Ley del Régimen Penal Cambiario, deberá requerir al VPU que en 15 días hábiles explique y fundamente su posición. Dictada resolución del BCRA, el VPU puede recurrir por alzada o acción judicial; el BCRA suspende los efectos hasta que haya resolución firme.',
		currentText:
			'Si el VPU alega violación de la estabilidad cambiaria, puede seguir operando conforme a las reglas de su adhesión notificando al BCRA. El BCRA debe dar 15 días para que el VPU fundamente su posición, y debe resolver en 90 días hábiles. La resolución puede recurrirse judicialmente; los efectos quedan suspendidos hasta que haya cosa juzgada.',
		plainLanguageExplanation:
			'Procedimiento de defensa específico para el VPU frente al BCRA: si el banco central dice que el VPU viola las normas cambiarias pero el VPU dice que está ejerciendo su derecho de estabilidad RIGI, hay un proceso formal antes de cualquier sanción. Primero el VPU puede seguir operando según sus reglas; luego el BCRA debe fundamentar si hay o no violación; y todo puede ser revisado judicialmente antes de que se aplique cualquier sanción.',
		practicalEffects: [
			'El VPU no puede ser sancionado penalmente por aplicar la estabilidad RIGI sin antes agotar un procedimiento de 90 días + recursos',
			'Es una garantía del debido proceso en materia cambiaria',
		],
		examples: [],
		relatedArticles: ['rigi-art-205', 'rigi-art-221'],
		jurisprudence: [],
		regulations: [],
		keywords: ['violación estabilidad cambiaria', 'BCRA', 'procedimiento', 'penal cambiario', 'recurso'],
		order: 206,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-207',
		lawId: 'ley-27742',
		number: '207',
		title: 'Libre transferencia de participaciones societarias del VPU',
		originalText:
			'Las acciones, cuotas o participaciones sociales de los VPU adheridos al RIGI podrán ser transferidos, directa o indirectamente, sin autorización previa de la autoridad de aplicación, debiendo informar de ello a ésta última dentro de los quince (15) días corridos siguientes de ocurrido.\n\nLas acciones, cuotas o participaciones sociales de los VPU adheridos al RIGI podrán ser objeto de prenda, cesión en garantía, fideicomiso y/o cualquier otro tipo de negocio jurídico de garantía con entidades financieras, organismos de crédito, locales o extranjeros, sin autorización previa de la autoridad de aplicación, debiendo ello ser informado dentro de los 15 días corridos.',
		currentText:
			'Las acciones/participaciones del VPU pueden transferirse o gravarse (prenda, cesión en garantía, fideicomiso) sin autorización previa de la Autoridad de Aplicación. Sólo es obligatoria la notificación en 15 días corridos.',
		plainLanguageExplanation:
			'Los socios del VPU pueden vender su participación a quien quieran, o usar sus acciones como garantía de préstamos, sin pedir permiso al Estado. Sólo deben avisarle en 15 días. Esto facilita la financiación y la entrada/salida de inversores durante la vida del proyecto.',
		practicalEffects: [
			'Permite estructurar financiamiento tipo "project finance" usando las acciones del VPU como garantía',
			'Un fondo de inversión puede comprar o vender su participación sin burocracia gubernamental',
			'El cambio de control del VPU no requiere aprobación previa (aunque sí notificación)',
		],
		examples: [
			'Un fondo de private equity que tiene el 30% de un proyecto RIGI puede vender esa participación a un fondo de infraestructura sin pedir autorización al Estado. En 15 días avisa a la Autoridad de Aplicación. El proyecto continúa con todos sus beneficios sin interrupción',
		],
		relatedArticles: ['rigi-art-180', 'rigi-art-209'],
		jurisprudence: [],
		regulations: [],
		keywords: ['transferencia acciones', 'prenda', 'fideicomiso', 'VPU', 'financiamiento RIGI'],
		order: 207,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-208',
		lawId: 'ley-27742',
		number: '208',
		title: 'Compatibilidad con otros regímenes promocionales',
		originalText:
			'Los beneficios previstos en el RIGI no podrán ser acumulados con incentivos de la misma naturaleza existentes en otros regímenes promocionales preexistentes. Sin embargo, la adhesión al RIGI no implicará renuncia ni incompatibilidad con otros regímenes promocionales vigentes y/o futuros con los que se podrán combinar incentivos de distinta naturaleza que no se superpongan, ni se acumulen o reiteren con los incentivos previstos en el presente.\n\nNo resultarán de aplicación las restricciones previstas en el artículo 32 de la ley 24.331 de Zona Franca.',
		currentText:
			'Los beneficios RIGI no se acumulan con beneficios iguales de otros regímenes. Pero sí pueden combinarse con beneficios de distinta naturaleza de otros regímenes que no se superpongan. El RIGI no impide estar en una zona franca (se deroga la restricción del art. 32 Ley 24.331).',
		plainLanguageExplanation:
			'Un proyecto puede estar en el RIGI y también en una zona franca, o en un régimen de promoción industrial —siempre que los beneficios no se dupliquen. Por ejemplo, si tanto el RIGI como la zona franca eximen de IVA, sólo uno aplica; pero si la zona franca da beneficios en ingresos brutos que el RIGI no da, ambos pueden combinarse.',
		practicalEffects: [
			'Permite combinar RIGI con regímenes de promoción regional (Patagonia, NOA, NEA) en lo que no se superponga',
			'La derogación expresa del art. 32 Ley 24.331 permite que proyectos en zonas francas accedan al RIGI',
		],
		examples: [],
		relatedArticles: ['rigi-art-201'],
		jurisprudence: [],
		regulations: [],
		keywords: ['compatibilidad RIGI', 'regímenes promocionales', 'zona franca', 'acumulación beneficios'],
		order: 208,
		segments: [],
		amendments: [],
	},
];
