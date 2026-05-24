import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_TITULO_01: LawSection = {
	id: 'ley-27742-titulo-01',
	lawId: 'ley-27742',
	number: 'I',
	name: 'Declaración de emergencia',
	articleStart: 1,
	articleEnd: 1,
	titles: [],
};

export const ARTICLES_TITULO_01: Article[] = [
	{
		id: 'ley27742-art-1',
		lawId: 'ley-27742',
		number: '1',
		title: 'Declaración de emergencia pública y delegación legislativa',
		text:
			'Declárase la emergencia pública en materia administrativa, económica, financiera y energética por el plazo de un (1) año.\n\nDeléganse en el Poder Ejecutivo nacional las facultades dispuestas por la presente ley, vinculadas a materias determinadas de administración y de emergencia, en los términos del artículo 76 de la Constitución Nacional, con arreglo a las bases aquí establecidas y por el plazo dispuesto en el párrafo precedente.\n\nEl Poder Ejecutivo nacional informará mensualmente y en forma detallada al Honorable Congreso de la Nación acerca del ejercicio de las facultades delegadas y los resultados obtenidos.',
		plainLanguageExplanation:
			'El artículo 1° es el eje de toda la ley: declara el estado de emergencia pública en cuatro áreas clave (administración, economía, finanzas y energía) y habilita al Presidente a tomar medidas de gran alcance sin pasar por el Congreso en cada caso. Esta "delegación legislativa" está expresamente autorizada por la Constitución (art. 76), pero solo por un plazo limitado (1 año) y sobre las materias definidas en la propia ley. Como contrapeso, el PEN debe rendir cuentas al Congreso mes a mes.',
		practicalEffects: [
			'Habilita al PEN a privatizar, reorganizar organismos, disolver fondos fiduciarios e intervenir entidades del Estado sin ley separada para cada acto',
			'El plazo es de 1 año desde la promulgación (julio 2024 a julio 2025). Vencido el plazo, las facultades delegadas se extinguen',
			'El Congreso puede revocar la delegación antes del vencimiento mediante ley',
			'La información mensual al Congreso es un deber formal; su incumplimiento no suspende las facultades delegadas pero es pasible de control político',
		],
		examples: [
			'En agosto 2024, el PEN dictó el DNU 764/2024 reorganizando organismos del Estado en ejercicio de las facultades delegadas por este artículo. Sin el art. 1°, ese decreto habría sido inconstitucional',
		],
		relatedArticles: ['ley27742-art-2', 'ley27742-art-3', 'ley27742-art-234'],
		jurisprudence: [],
		regulations: [],
		keywords: [
			'emergencia pública',
			'delegación legislativa',
			'art. 76 CN',
			'poderes de emergencia',
			'Ley de Bases',
		],
		order: 1,
		segments: [],
		amendments: [],
	},
];
