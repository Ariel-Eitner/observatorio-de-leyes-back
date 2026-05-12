import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_TITULO_09: LawSection = {
	id: 'ley-27742-titulo-09',
	lawId: 'ley-27742',
	number: 'IX',
	name: 'Disposiciones finales',
	articleStart: 234,
	articleEnd: 238,
	titles: [],
};

export const ARTICLES_TITULO_09: Article[] = [
	{
		id: 'ley27742-art-234',
		lawId: 'ley-27742',
		number: '234',
		title: 'Control parlamentario de los decretos delegados',
		originalText:
			'Los decretos dictados en ejercicio de las facultades delegadas por el Congreso de la Nación en la presente ley, estarán sujetos al control de la Comisión Bicameral Permanente de conformidad con lo dispuesto en el artículo 100, inciso 12 de la Constitución Nacional.',
		currentText:
			'Los decretos que dicte el PEN en ejercicio de la delegación legislativa de esta ley son controlados por la Comisión Bicameral Permanente (art. 100, inc. 12 CN).',
		plainLanguageExplanation:
			'Toda delegación legislativa tiene como contrapeso el control parlamentario posterior. La Comisión Bicameral Permanente recibe los decretos delegados y puede formular observaciones, aunque no tiene poder de veto: solo puede elevar sus observaciones al pleno del Congreso.',
		practicalEffects: [
			'Los decretos delegados deben enviarse a la Comisión Bicameral en el plazo constitucional (10 días)',
			'La Comisión puede declarar que un decreto excede las bases de la delegación: eso abre debate parlamentario pero no invalida el decreto por sí solo',
		],
		examples: [],
		relatedArticles: ['ley27742-art-1', 'ley27742-art-235'],
		jurisprudence: [],
		regulations: ['Constitución Nacional, art. 100 inc. 12'],
		keywords: ['Comisión Bicameral Permanente', 'control legislativo', 'decretos delegados', 'delegación legislativa'],
		order: 234,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-235',
		lawId: 'ley-27742',
		number: '235',
		title: 'Invitación a las provincias a adherir',
		originalText:
			'Invítase a las provincias y a la Ciudad Autónoma de Buenos Aires a dictar las normas que resulten necesarias para el establecimiento de procedimientos congruentes con los propósitos de esta ley.',
		currentText:
			'Se invita a las provincias y CABA a dictar normas provinciales que sean coherentes con los objetivos de la Ley de Bases.',
		plainLanguageExplanation:
			'Las provincias tienen sus propias competencias constitucionales: el Congreso no puede obligarlas a seguir estas reformas en materia provincial. El art. 235° "invita" (no obliga) a que las provincias adapten sus marcos normativos. Esta invitación es especialmente relevante para el RIGI (Título VII), donde la adhesión provincial al régimen amplía la cobertura de las garantías.',
		practicalEffects: [
			'La "invitación" es políticamente relevante pero jurídicamente no vinculante: una provincia puede ignorarla',
			'Las provincias que adhieran al RIGI deben legislar en consecuencia para garantizar los beneficios en su territorio',
		],
		examples: [],
		relatedArticles: ['ley27742-art-1', 'rigi-art-164'],
		jurisprudence: [],
		regulations: [],
		keywords: ['provincias', 'adhesión provincial', 'CABA', 'invitación', 'federalismo'],
		order: 235,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-236',
		lawId: 'ley-27742',
		number: '236',
		title: 'Plazo de reglamentación — 90 días',
		originalText:
			'Salvo para los casos en que se establezca un plazo específico, el Poder Ejecutivo nacional reglamentará la presente ley en un plazo máximo de noventa (90) días a partir de su entrada en vigencia y dictará las normas complementarias, interpretativas o aclaratorias que resulten necesarias para su aplicación.',
		currentText:
			'El PEN tiene 90 días desde la vigencia de la ley para reglamentarla. El RIGI tiene plazo propio (30 días, art. 226).',
		plainLanguageExplanation:
			'El plazo de 90 días para reglamentar es el estándar general. Sin reglamentación, muchas disposiciones no son operativas en la práctica (aunque algunas, como el RIGI, son operativas de inmediato según el art. 227).',
		practicalEffects: [
			'El PEN publicó el decreto reglamentario del RIGI (Decreto 749/2024) dentro del plazo de 30 días',
			'Algunas secciones de la ley (empleo, privatizaciones) requirieron reglamentaciones adicionales que se fueron dictando en los meses siguientes',
		],
		examples: [],
		relatedArticles: ['ley27742-art-237', 'rigi-art-226'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024 — Reglamentación del RIGI'],
		keywords: ['reglamentación', '90 días', 'PEN', 'vigencia'],
		order: 236,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-237',
		lawId: 'ley-27742',
		number: '237',
		title: 'Vigencia de la ley',
		originalText:
			'Las disposiciones de la presente ley entrarán en vigor el día siguiente al de su publicación en el Boletín Oficial de la República Argentina, salvo en los capítulos o títulos en donde se señala lo contrario.',
		currentText:
			'La ley entró en vigor el día siguiente a su publicación en el Boletín Oficial (publicada el 8 de julio de 2024, vigente desde el 9 de julio de 2024). Excepciones: las secciones que tienen su propia regla de entrada en vigencia.',
		plainLanguageExplanation:
			'La ley Nº 27.742 fue publicada en el Boletín Oficial el 8 de julio de 2024 y entró en vigencia el 9 de julio de 2024. Algunas secciones tienen reglas propias: el RIGI entra en vigencia el mismo día de publicación (art. 228), y el "silencio positivo" de la ley de procedimiento administrativo requería reglamentación previa.',
		practicalEffects: [
			'A partir del 9 de julio de 2024 comenzó a correr el plazo de 2 años para adherirse al RIGI (hasta el 8 de julio de 2026, luego prorrogado hasta julio 2027)',
			'A partir de esa fecha también comenzó el plazo de 1 año de la emergencia declarada por el art. 1°',
		],
		examples: [],
		relatedArticles: ['ley27742-art-1', 'rigi-art-228'],
		jurisprudence: [],
		regulations: [],
		keywords: ['vigencia', 'Boletín Oficial', '9 de julio de 2024', 'publicación'],
		order: 237,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-238',
		lawId: 'ley-27742',
		number: '238',
		title: 'Comunicación al Poder Ejecutivo',
		originalText: 'Comuníquese al Poder Ejecutivo nacional.',
		currentText: 'Cláusula de promulgación: el Congreso comunica la ley sancionada al PEN para su promulgación.',
		plainLanguageExplanation: 'Fórmula protocolar de cierre de toda ley nacional argentina: el Congreso instruye al PEN a promulgar y publicar la ley. La ley fue promulgada el 5 de julio de 2024 y publicada el 8 de julio de 2024.',
		practicalEffects: [],
		examples: [],
		relatedArticles: ['ley27742-art-237'],
		jurisprudence: [],
		regulations: [],
		keywords: ['promulgación', 'comunicación', 'fórmula de cierre'],
		order: 238,
		segments: [],
		amendments: [],
	},
];
