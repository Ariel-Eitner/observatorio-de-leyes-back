import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_07: LawSection = {
	id: 'ley-27742-s07',
	lawId: 'ley-27742',
	number: 'VII',
	name: 'Terminación de los incentivos bajo el RIGI',
	articleStart: 209,
	articleEnd: 210,
	titles: [],
};

export const ARTICLES_07: Article[] = [
	{
		id: 'rigi-art-209',
		lawId: 'ley-27742',
		number: '209',
		title: 'Causas de terminación de los incentivos',
		text:
			'Los incentivos y derechos de un VPU adherido al RIGI cesarán sin efecto retroactivo —dejando de revestir dicho carácter— por las siguientes causas:\na) Finalización del proyecto por fin de su vida útil;\nb) Quiebra del VPU;\nc) Baja voluntaria solicitada por el VPU, a partir de la fecha de su aprobación por la autoridad de aplicación; o\nd) Cese como sanción por infracción al RIGI.',
		plainLanguageExplanation:
			'El RIGI termina en 4 situaciones: cuando el proyecto llega al final de su vida útil (por ejemplo, una mina agotada), si el VPU quiebra, si el propio VPU solicita darse de baja, o como sanción por incumplimiento. En todos los casos el cese es "sin efecto retroactivo": lo hecho bajo el régimen queda firme, los beneficios ya utilizados no se devuelven.',
		practicalEffects: [
			'La quiebra del VPU termina el RIGI automáticamente',
			'El cese sancionatorio es la sanción más grave, se aplica por incumplimientos graves del plan de inversión',
			'Los beneficios ya gozados (exenciones impositivas pasadas, importaciones libres) no se revierten al cesar el RIGI',
		],
		examples: [
			'Si en 2030 el VPU quiebra por sobrecostos, el RIGI termina automáticamente desde la sentencia judicial de quiebra. Los beneficios ya utilizados —importaciones libres de aranceles, ganancias al 25% de años anteriores— quedan firmes y no deben devolverse',
		],
		relatedArticles: ['rigi-art-210', 'rigi-art-211', 'rigi-art-213', 'rigi-art-216'],
		jurisprudence: [],
		regulations: [],
		keywords: ['terminación RIGI', 'cese incentivos', 'quiebra VPU', 'baja voluntaria', 'sanción'],
		order: 209,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-210',
		lawId: 'ley-27742',
		number: '210',
		title: 'Baja voluntaria del RIGI',
		text:
			'Los VPU podrán darse de baja voluntariamente del RIGI en los siguientes casos:\na) Una vez cumplidas las obligaciones previstas en los incisos a) y b) del artículo 172 (monto mínimo e inversión en los primeros 2 años); o\nb) Si ofrecen abonar voluntariamente el mínimo de la multa prevista en el inciso e) del artículo 213 (5% del monto mínimo pendiente), y dicho pago se efectiviza en el plazo que establezca la reglamentación.\n\nLa solicitud de baja debe ser presentada y aprobada por la autoridad de aplicación mediante acto administrativo. Una vez aprobada, el VPU queda liberado de sus obligaciones bajo el RIGI desde la fecha de solicitud, perdiendo los derechos e incentivos del régimen sin efecto retroactivo.',
		plainLanguageExplanation:
			'Un inversor puede decidir salirse del RIGI voluntariamente si ya cumplió sus compromisos básicos de inversión, o si prefiere pagar una multa del 5% del monto pendiente para salir antes. Es una "salida ordenada" que protege tanto al Estado (que recibe la multa si el compromiso no se cumplió) como al inversor (que puede reestructurar el proyecto sin sanciones graves).',
		practicalEffects: [
			'Opción útil si un proyecto ya invirtió el mínimo y no quiere seguir bajo el régimen',
			'La multa del 5% del monto pendiente puede ser menor al costo de seguir operando bajo las condiciones del RIGI',
			'Desde la fecha de solicitud aprobada, el VPU pierde los beneficios (arancel 0%, ganancias 25%, etc.)',
		],
		examples: [
			'Un VPU que ya invirtió los USD 300M comprometidos en los primeros 2 años y operó 6 años bajo el RIGI decide que el régimen ya no le es conveniente porque el país levantó el cepo y no necesita los beneficios cambiarios. Puede solicitar la baja voluntaria sin multa adicional y salir del régimen ordenadamente',
		],
		relatedArticles: ['rigi-art-209', 'rigi-art-213'],
		jurisprudence: [],
		regulations: [],
		keywords: ['baja voluntaria RIGI', 'salida del régimen', 'multa 5%', 'derechos y obligaciones'],
		order: 210,
		segments: [],
		amendments: [],
	},
];
