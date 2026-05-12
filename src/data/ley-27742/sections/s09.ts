import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_09: LawSection = {
	id: 'ley-27742-s09',
	lawId: 'ley-27742',
	number: 'IX',
	name: 'De la autoridad de aplicación',
	articleStart: 218,
	articleEnd: 220,
	titles: [],
};

export const ARTICLES_09: Article[] = [
	{
		id: 'rigi-art-218',
		lawId: 'ley-27742',
		number: '218',
		title: 'Autoridad de aplicación y sus facultades',
		originalText:
			'El Poder Ejecutivo nacional designará la autoridad de aplicación del presente título de la ley, con facultades para:\na) La evaluación y aprobación o rechazo de las solicitudes de adhesión y de los planes de inversión presentados por los VPU;\nb) La fiscalización y control del RIGI;\nc) La verificación del cumplimiento de las disposiciones de esta ley y sus normas reglamentarias y de las obligaciones a cargo de los VPU;\nd) La caducidad de los incentivos; y\ne) El dictado de las normas operativas, aclaratorias y complementarias que resulten necesarias para asegurar el adecuado cumplimiento del RIGI, el cual es considerado operativo desde su vigencia.',
		currentText:
			'El Poder Ejecutivo designa la Autoridad de Aplicación del RIGI (actualmente la Secretaría de Industria y Desarrollo Productivo). Sus funciones: evaluar y aprobar/rechazar solicitudes; fiscalizar; verificar cumplimiento; declarar la caducidad de incentivos; y dictar normas operativas.',
		plainLanguageExplanation:
			'El gobierno designa al organismo que administra el RIGI. La Autoridad de Aplicación es el árbitro central del régimen: aprueba proyectos, los controla, y puede sancionar hasta el cese del régimen. El Decreto 749/2024 designó a la Secretaría de Industria y Desarrollo Productivo como Autoridad de Aplicación.',
		practicalEffects: [
			'La Autoridad de Aplicación puede cambiar si el gobierno reorganiza ministerios, sin que eso afecte los derechos de los VPU',
			'Puede delegar en secretarías sectoriales (por sector de actividad) según el art. 219',
			'El RIGI es "plenamente operativo" desde la publicación de la ley, sin necesidad de reglamentación (art. 227)',
		],
		examples: [],
		relatedArticles: ['rigi-art-177', 'rigi-art-179', 'rigi-art-212'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024 — designa la Secretaría de Industria como Autoridad de Aplicación'],
		keywords: ['autoridad de aplicación RIGI', 'Secretaría de Industria', 'fiscalización', 'aprobación solicitudes'],
		order: 218,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-219',
		lawId: 'ley-27742',
		number: '219',
		title: 'Delegación en secretarías sectoriales',
		originalText:
			'La autoridad de aplicación podrá delegar en las Secretarías de gobierno las facultades previstas en el artículo precedente en base al sector de actividad de que se trate.',
		currentText:
			'La Autoridad de Aplicación puede delegar sus facultades en secretarías sectoriales según el sector del proyecto (por ejemplo: Secretaría de Energía para proyectos energéticos; Secretaría de Minería para proyectos mineros).',
		plainLanguageExplanation:
			'El RIGI puede tener "ventanillas" diferentes según el sector: un proyecto de petróleo y gas sería evaluado por la Secretaría de Energía con criterios sectoriales específicos. Esto permite que cada área de gobierno con conocimiento técnico del sector participe en la evaluación.',
		practicalEffects: [
			'En la práctica, los proyectos energéticos los evalúa la Secretaría de Energía; los mineros, la de Minería, etc.',
			'La especialización sectorial mejora la calidad técnica de las evaluaciones',
		],
		examples: [],
		relatedArticles: ['rigi-art-218'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024'],
		keywords: ['delegación RIGI', 'secretarías sectoriales', 'evaluación técnica'],
		order: 219,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-220',
		lawId: 'ley-27742',
		number: '220',
		title: 'Obligación de informar y área específica AFIP',
		originalText:
			'Los sujetos beneficiarios deberán presentar ante la autoridad de aplicación la información que les fuera requerida acerca del estado del proyecto y de los VPU. Instrúyese a la Administración Federal de Ingresos Públicos a crear un área específica cuyas funciones serán crear las CUIT asignadas a los VPU y fiscalizar el cumplimiento de las obligaciones tributarias y aduaneras por parte de tales sujetos.',
		currentText:
			'Los VPU deben informar periódicamente a la Autoridad de Aplicación sobre el estado del proyecto. La AFIP debe crear un área específica para atender a los VPU: emitir sus CUIT y fiscalizar sus obligaciones tributarias y aduaneras.',
		plainLanguageExplanation:
			'La AFIP crea una "ventanilla RIGI" especializada: los proyectos RIGI tienen una CUIT propia y un área dedicada de fiscalización. Esto permite una atención diferenciada y especializada, separando la fiscalización del RIGI de la fiscalización ordinaria.',
		practicalEffects: [
			'Los VPU tienen interlocutores específicos en AFIP que conocen el régimen',
			'Las CUIT de los VPU están vinculadas al régimen especial en los sistemas de AFIP',
		],
		examples: [],
		relatedArticles: ['rigi-art-218', 'rigi-art-169'],
		jurisprudence: [],
		regulations: [],
		keywords: ['AFIP RIGI', 'CUIT VPU', 'área específica', 'fiscalización', 'información'],
		order: 220,
		segments: [],
		amendments: [],
	},
];
