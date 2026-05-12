import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_11: LawSection = {
	id: 'ley-27742-s11',
	lawId: 'ley-27742',
	number: 'XI',
	name: 'Jurisdicciones locales. Declaración de interés nacional',
	articleStart: 224,
	articleEnd: 225,
	titles: [],
};

export const ARTICLES_11: Article[] = [
	{
		id: 'rigi-art-224',
		lawId: 'ley-27742',
		number: '224',
		title: 'Invitación a provincias y municipios a adherir al RIGI',
		originalText:
			'Invítase a las provincias, a la Ciudad Autónoma de Buenos Aires y a los municipios a adherir al RIGI en todos sus términos y condiciones.',
		currentText:
			'Las provincias, la CABA y los municipios son invitados (no obligados) a adherir al RIGI.',
		plainLanguageExplanation:
			'El RIGI national no obliga a las provincias a participar. Las invita a adherir, lo que significa que si una provincia adhiere, sus impuestos provinciales y los de sus municipios también quedan sujetos a la estabilidad del art. 225. Las provincias que no adhieran no están vinculadas por el RIGI en su jurisdicción fiscal local.',
		practicalEffects: [
			'Una provincia que no adhiere puede seguir cobrando ingresos brutos, tasas municipales y otros tributos sin restricciones RIGI',
			'La adhesión provincial convierte al RIGI en un escudo también frente a tributos locales',
			'Las grandes provincias mineras y energéticas (Neuquén, Jujuy, Santa Cruz) tienen fuerte incentivo a adherir para atraer inversiones',
		],
		examples: [
			'Neuquén adhirió al RIGI para poder garantizar a proyectos de GNL en Vaca Muerta que los tributos provinciales no aumentarán',
		],
		relatedArticles: ['rigi-art-225', 'rigi-art-165', 'rigi-art-202'],
		jurisprudence: [],
		regulations: [],
		keywords: ['adhesión provincial', 'provincias RIGI', 'municipios', 'invitación', 'descentralización'],
		order: 224,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-225',
		lawId: 'ley-27742',
		number: '225',
		title: 'Restricciones tributarias para provincias adheridas',
		originalText:
			'Déjase establecido que las provincias, la Ciudad Autónoma de Buenos Aires y los municipios que adhieran al RIGI no podrán imponer a los VPU nuevos gravámenes locales, salvo las tasas retributivas por servicios efectivamente prestados.\n\nSe entenderá que existe un nuevo gravamen local cuando se cree un nuevo hecho imponible o cuando se modifique el hecho imponible, la base imponible, la alícuota, las deducciones, las exenciones y/o desgravaciones de los tributos existentes al 31 de diciembre de 2023, que en los hechos implique una mayor carga fiscal.\n\nLas tasas retributivas por servicios no podrán exceder el costo específico del servicio efectivamente prestado. Si la base imponible de la tasa se determina sobre ventas, ingresos brutos o ganancias, se presume que excede el costo del servicio.\n\nCualquier incumplimiento de este artículo viola el artículo 165.',
		currentText:
			'Las provincias adheridas al RIGI no pueden crear nuevos impuestos ni subir los existentes a los VPU. Sólo pueden cobrar tasas retributivas por servicios reales a costo. La situación tributaria provincial queda "congelada" al 31 de diciembre de 2023 para los VPU adheridos. Cualquier violación es nula e inconstitucional (art. 165).',
		plainLanguageExplanation:
			'Si una provincia adhiere al RIGI, se compromete a que los impuestos provinciales y municipales que aplican a los VPU RIGI no aumenten ni se expandan. No pueden crear un nuevo impuesto, subir alícuotas de ingresos brutos, ni establecer "tasas de inspección" infladas. El único impuesto "nuevo" posible es el cobro exacto del costo de un servicio real (recolección de residuos, inspección de seguridad, etc.), sin usar ventas o ganancias como base imponible.',
		practicalEffects: [
			'Los VPU RIGI quedan protegidos de aumentos de ingresos brutos provinciales',
			'Las tasas municipales de "inspección" que se calculan sobre facturación quedan prohibidas para VPU RIGI en provincias adheridas',
			'Esta restricción es voluntaria para las provincias; solo aplica si adhirieron al RIGI',
		],
		examples: [
			'Un municipio en provincia adherida no puede aumentar la tasa de habilitación de una mina RIGI en base a su producción',
		],
		relatedArticles: ['rigi-art-224', 'rigi-art-165', 'rigi-art-201', 'rigi-art-202'],
		jurisprudence: [],
		regulations: [],
		keywords: ['tributos provinciales RIGI', 'ingresos brutos', 'tasas municipales', 'estabilidad provincial', 'congelamiento fiscal'],
		order: 225,
		segments: [],
		amendments: [],
	},
];
