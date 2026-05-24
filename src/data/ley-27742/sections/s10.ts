import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_10: LawSection = {
	id: 'ley-27742-s10',
	lawId: 'ley-27742',
	number: 'X',
	name: 'Jurisdicción y arbitraje',
	articleStart: 221,
	articleEnd: 223,
	titles: [],
};

export const ARTICLES_10: Article[] = [
	{
		id: 'rigi-art-221',
		lawId: 'ley-27742',
		number: '221',
		title: 'Arbitraje internacional',
		text:
			'Todas las controversias entre el Estado nacional y un VPU adherido al RIGI se resolverán, en primer lugar, mediante consultas y negociaciones amistosas durante 60 días corridos.\n\nSi no se resuelve amigablemente, el VPU puede someter la disputa a arbitraje —a su elección— bajo:\na) El Reglamento de Arbitraje de la CPA de 2012;\nb) El Reglamento de la Cámara de Comercio Internacional; o\nc) El Convenio CIADI o su Reglamento de Mecanismo Complementario.\n\nEl arbitraje se realiza fuera de Argentina, en un país parte de la Convención de Nueva York. El tribunal arbitral tiene 3 árbitros; ninguno puede ser argentino ni del país del accionista mayoritario. El idioma es español (o inglés para accionistas extranjeros).',
		plainLanguageExplanation:
			'Si el Estado incumple sus compromisos con un proyecto RIGI (por ejemplo, aplica una retención que viola la estabilidad fiscal), el inversor puede demandar a la Argentina ante árbitros internacionales en el exterior. Este mecanismo —similar al CIADI que Argentina ya conoce— permite que las disputas con inversores extranjeros no pasen por los tribunales argentinos, sino por árbitros internacionales con laudos ejecutables mundialmente. Es uno de los aspectos más polémicos: Argentina fue condenada en múltiples arbitrajes internacionales en el pasado (Aerolíneas, YPF, etc.).',
		practicalEffects: [
			'El inversor puede elegir su foro arbitral preferido (CPA, CCI o CIADI)',
			'Los laudos arbitrales son ejecutables en todos los países firmantes de la Convención de Nueva York (180+ países)',
			'El Estado argentino puede ser condenado a pagar millones de dólares si viola las garantías del RIGI',
			'El proceso arbitral no suspende los derechos del VPU ni sus obligaciones (art. 223)',
		],
		examples: [
			'Si el gobierno impone retenciones que viola la estabilidad RIGI y se niega a corregirlo en 60 días, el inversor puede iniciar un arbitraje ante el CIADI en Washington',
		],
		relatedArticles: ['rigi-art-165', 'rigi-art-200', 'rigi-art-201', 'rigi-art-222', 'rigi-art-223'],
		jurisprudence: [],
		regulations: [],
		keywords: ['arbitraje CIADI', 'arbitraje internacional', 'controversias RIGI', 'CPA', 'CCI', 'laudo arbitral'],
		order: 221,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-222',
		lawId: 'ley-27742',
		number: '222',
		title: 'Protección internacional de las inversiones RIGI',
		text:
			'Los derechos e incentivos adquiridos bajo los términos y condiciones del presente régimen se consideran inversiones protegidas en el sentido previsto en los tratados de promoción y protección recíproca de inversiones, que resulten aplicables y su afectación podrá dar lugar a la responsabilidad internacional del Estado nacional de conformidad con sus disposiciones, y sin perjuicio de los remedios previstos en el presente régimen.',
		plainLanguageExplanation:
			'Argentina tiene acuerdos de protección de inversiones con más de 50 países. Este artículo dice que los beneficios RIGI son "inversiones protegidas" bajo esos tratados. Si el Estado viola las garantías RIGI de un inversor extranjero, no sólo puede ser demandado bajo el RIGI (art. 221), sino también bajo los tratados bilaterales de inversión, sumando múltiples vías de reclamo.',
		practicalEffects: [
			'Un inversor de un país con TBI vigente con Argentina tiene doble protección: el RIGI y el TBI',
			'La responsabilidad puede ser en dólares, intereses y costas',
			'Refuerza la seriedad de los compromisos asumidos por el Estado en el RIGI',
		],
		examples: [],
		relatedArticles: ['rigi-art-221', 'rigi-art-165'],
		jurisprudence: [],
		regulations: [],
		keywords: ['tratados de inversión', 'TBI', 'protección internacional', 'responsabilidad estatal', 'RIGI'],
		order: 222,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-223',
		lawId: 'ley-27742',
		number: '223',
		title: 'No suspensión por arbitraje',
		text:
			'La existencia de un proceso arbitral no suspenderá, retrasará o afectará de ninguna manera las obligaciones de la República Argentina o los derechos del VPU y su pleno uso, goce y ejercicio.',
		plainLanguageExplanation:
			'Si hay un arbitraje en curso, el Estado no puede usar eso como excusa para dejar de cumplir sus compromisos ni para quitarle los beneficios al VPU mientras se resuelve la disputa. El proyecto sigue con arancel 0%, ganancias al 25% y libre disponibilidad de divisas durante todo el tiempo que dure el arbitraje.',
		practicalEffects: [
			'El Estado no puede usar el proceso arbitral para presionar al inversor suspendiendo beneficios',
			'El VPU mantiene todos sus derechos operativos durante el arbitraje',
		],
		examples: [],
		relatedArticles: ['rigi-art-221', 'rigi-art-222'],
		jurisprudence: [],
		regulations: [],
		keywords: ['no suspensión', 'arbitraje RIGI', 'continuidad operativa', 'derechos VPU'],
		order: 223,
		segments: [],
		amendments: [],
	},
];
