import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_12: LawSection = {
	id: 'ley-27742-s12',
	lawId: 'ley-27742',
	number: 'XII',
	name: 'Disposiciones transitorias del RIGI',
	articleStart: 226,
	articleEnd: 228,
	titles: [],
};

export const ARTICLES_12: Article[] = [
	{
		id: 'rigi-art-226',
		lawId: 'ley-27742',
		number: '226',
		title: 'Plazo de reglamentación',
		originalText:
			'El Poder Ejecutivo nacional deberá reglamentar el presente régimen en el término de treinta (30) días, a contar desde su publicación en el Boletín Oficial.',
		currentText:
			'El Poder Ejecutivo debe reglamentar el RIGI en 30 días desde la publicación en el BOA (publicado el 8 de julio de 2024). El Decreto 749/2024 fue publicado el 23 de agosto de 2024, cumpliendo tardíamente este mandato.',
		plainLanguageExplanation:
			'La ley exigía que el gobierno reglamentara el RIGI en 30 días. El Decreto 749/2024 tardó 46 días en publicarse (8 de julio al 23 de agosto de 2024). El art. 227 aclara que esta demora no impidió que el RIGI fuera operativo desde su entrada en vigencia.',
		practicalEffects: [
			'La reglamentación tardía no invalidó el régimen: el RIGI fue operativo desde el 8 de julio de 2024',
			'El Decreto 749/2024 define en detalle los procedimientos, requisitos y definiciones del RIGI',
		],
		examples: [],
		relatedArticles: ['rigi-art-227', 'rigi-art-228'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024 — Reglamentación del RIGI (publicado 23/08/2024)'],
		keywords: ['reglamentación RIGI', 'Decreto 749/2024', 'plazo 30 días', 'operatividad'],
		order: 226,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-227',
		lawId: 'ley-27742',
		number: '227',
		title: 'Operatividad inmediata del RIGI',
		originalText:
			'La falta de reglamentación del presente no obstará a la plena utilización de los incentivos establecidos en el RIGI en las condiciones previstas, ya que las disposiciones del presente régimen son plenamente operativas desde su entrada en vigencia, sin perjuicio de las responsabilidades que pudieren corresponder a los funcionarios por la falta de cumplimiento de lo allí establecido.\n\nTodo funcionario que incurra en el incumplimiento injustificado de los plazos o términos establecidos en el presente Título resultará pasible de ser sancionado, previo sumario administrativo.',
		currentText:
			'El RIGI es plenamente operativo desde su entrada en vigencia, aunque no haya reglamentación. Los funcionarios que incumplan injustificadamente los plazos del RIGI pueden ser sancionados administrativamente.',
		plainLanguageExplanation:
			'Dos mensajes clave: (1) el RIGI no necesita reglamentación para ser aplicado; los inversores pueden adherir y usar los beneficios desde el primer día de vigencia; (2) los funcionarios que demoren sin justificación los trámites del RIGI pueden ser sumariados. Esto es una garantía adicional de que el Estado no puede bloquear el régimen por burocracia o inacción.',
		practicalEffects: [
			'Desde el 8 de julio de 2024, el régimen fue operativo aunque el decreto llegó el 23 de agosto',
			'La sanción a funcionarios es un mecanismo para evitar el bloqueo administrativo del régimen',
			'Refuerza la seriedad del compromiso estatal con el RIGI',
		],
		examples: [],
		relatedArticles: ['rigi-art-226', 'rigi-art-228'],
		jurisprudence: [],
		regulations: [],
		keywords: ['operatividad RIGI', 'sin reglamentación', 'funcionarios', 'sumario administrativo'],
		order: 227,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-228',
		lawId: 'ley-27742',
		number: '228',
		title: 'Entrada en vigencia',
		originalText:
			'El presente régimen entrará en vigencia el día de su publicación en el Boletín Oficial.',
		currentText:
			'El RIGI entró en vigencia el 8 de julio de 2024, fecha de publicación de la Ley 27.742 en el Boletín Oficial de la República Argentina.',
		plainLanguageExplanation:
			'El RIGI rige desde el 8 de julio de 2024. El plazo de 2 años para adherirse corre desde esa fecha (hasta el 8 de julio de 2026, prorrogado por Decreto 105/2026 hasta el 8 de julio de 2027).',
		practicalEffects: [
			'El plazo de adhesión de 2 años venció el 8 de julio de 2026, y fue prorrogado hasta el 8 de julio de 2027',
			'Los plazos de los beneficios (estabilidad 30 años, libre disponibilidad de divisas desde año 4) se cuentan desde la fecha de adhesión de cada proyecto, no desde esta fecha',
		],
		examples: [],
		relatedArticles: ['rigi-art-164', 'rigi-art-168', 'rigi-art-226'],
		jurisprudence: [],
		regulations: ['Decreto 105/2026 — prórroga del plazo de adhesión'],
		keywords: ['vigencia RIGI', 'entrada en vigor', '8 de julio 2024', 'Boletín Oficial'],
		order: 228,
		segments: [],
		amendments: [],
	},
];
