import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_TITULO_06: LawSection = {
	id: 'ley-27742-titulo-06',
	lawId: 'ley-27742',
	number: 'VI',
	name: 'Energía',
	articleStart: 101,
	articleEnd: 163,
	titles: [],
};

export const ARTICLES_TITULO_06: Article[] = [
	{
		id: 'ley27742-art-101-127',
		lawId: 'ley-27742',
		number: '101-127',
		title: 'Modificaciones a la ley de hidrocarburos (ley 17.319) — comercio, exploración y explotación',
		originalText: '[Arts. 101-127 modifican la ley 17.319 de Hidrocarburos. Sustituyen arts. 2°, 3°, 4°, 5°, 6°, 7°, 12, 14, 19, 21, 27 bis, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 57, 59, 61, 63, 65 y 93; derogan arts. 76, 77, 78, 79, 80, 81.]',
		currentText:
			'Arts. 101-127 reforman integralmente la ley 17.319 de Hidrocarburos (1967). Los cambios más importantes:\n\n- Art. 105 (ex art. 6°): Los concesionarios tienen dominio sobre los hidrocarburos que extraigan y pueden comercializarlos libremente. El PEN no puede fijar precios en el mercado interno ni para exportación.\n\n- Art. 106 (ex art. 7°): El comercio internacional de hidrocarburos es libre.\n\n- Art. 111 (ex art. 27 bis): Concesión No Convencional (fracking, shale): el concesionario puede solicitar reconvertir su área a "no convencional" hasta el 31/12/2028; plazo de la concesión reconvertida: 35 años.\n\n- Art. 107 (ex art. 12): El Estado y las provincias perciben regalías de la explotación.\n\n- Arts. 115-120: Plazos de las concesiones de exploración y explotación; condiciones de prórroga.\n\n- Arts. 121-123: Regalías mínimas del 12% sobre producción; posibilidad de reducción al 5% para "desarrollo de área" en situaciones especiales.\n\n- Arts. 124-127: Derogaciones de artículos sobre intervención estatal en comercialización (arts. 76-81 ley 17.319), consistente con la liberalización del comercio de hidrocarburos.',
		plainLanguageExplanation:
			'El Título VI reforma el marco regulatorio del sector energético argentino. El cambio central en hidrocarburos es la liberalización: las empresas que explotan petróleo y gas pueden vender libremente (incluyendo exportar sin restricciones), el Estado no puede fijar precios ni intervenir en la comercialización. Se facilita también la explotación no convencional (shale/fracking) con concesiones de 35 años para esa modalidad. Esto es especialmente relevante para Vaca Muerta.',
		practicalEffects: [
			'Libre comercialización de hidrocarburos: YPF y las operadoras privadas pueden exportar sin necesitar autorización del gobierno (salvo objeción técnica de la Secretaría de Energía en 30 días)',
			'El fracking en Vaca Muerta tiene una ventana hasta 2028 para solicitar reconversión de áreas a no convencional, con concesiones de 35 años',
			'Las regalías mínimas del 12% garantizan ingresos provinciales de la producción',
		],
		examples: [
			'Una empresa con concesión convencional en Neuquén solicita reconvertirla a No Convencional antes del 31/12/2028. La provincia aprueba en 60 días. La concesión reconvertida dura 35 años desde la solicitud',
		],
		relatedArticles: ['rigi-art-164', 'ley27742-art-163'],
		jurisprudence: [],
		regulations: ['Ley 17.319 — Hidrocarburos', 'Decreto 749/2024 — RIGI'],
		keywords: ['hidrocarburos', 'ley 17319', 'Vaca Muerta', 'fracking', 'shale', 'concesión no convencional', 'libre comercialización', 'regalías'],
		order: 101,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-128-152',
		lawId: 'ley-27742',
		number: '128-152',
		title: 'Modificaciones al marco eléctrico — ley 24.065 (electricidad) y ley 26.093 (biocombustibles)',
		originalText: '[Arts. 128-152 modifican la ley 24.065 del Marco Regulatorio Eléctrico y la ley 26.093 de Biocombustibles. Sustituyen múltiples artículos de la ley 24.065 sobre funciones del ENRE, concesionarios y permisos; y modifican la ley 26.093 sobre cupos y mezcla de biocombustibles.]',
		currentText:
			'Arts. 128-144 (Marco Eléctrico — ley 24.065):\n- Reforma las funciones del ENRE (Ente Nacional Regulador de la Electricidad): desregula parte de la comercialización de energía eléctrica.\n- Permite nuevas formas de contratos entre generadores y grandes usuarios directos (bypassing del mercado spot).\n- Modifica los plazos y condiciones de las concesiones de distribución y transporte de electricidad.\n- Desregula la actividad de los "comercializadores" de energía eléctrica.\n\nArts. 145-152 (Biocombustibles — ley 26.093):\n- Mantiene la obligación de mezcla de biocombustibles en los combustibles fósiles.\n- Modifica las cuotas de mezcla (biodiesel en gasoil, bioetanol en naftas).\n- Amplía el mercado de biocombustibles habilitando exportaciones.',
		plainLanguageExplanation:
			'El sector eléctrico argentino es altamente regulado y subsidiado. Estos artículos avanzan hacia una mayor desregulación: los grandes consumidores industriales pueden contratar energía directamente con los generadores sin pasar por las distribuidoras, lo que puede bajar los costos industriales pero potencialmente aumentar tarifas residenciales al eliminarse la subsidio cruzado.\n\nEn biocombustibles, se mantiene la obligación de mezcla pero se flexibiliza para permitir la exportación del excedente, lo que beneficia a los productores de soja (biodiesel) y caña/maíz (bioetanol).',
		practicalEffects: [
			'Un industrial con alta demanda eléctrica puede contratar directamente con una generadora o parque solar, sin pasar por Edenor/Edesur',
			'Las exportaciones de biodiesel (principalmente de la industria sojera santafesina) quedan habilitadas bajo un marco más claro',
		],
		examples: [],
		relatedArticles: ['ley27742-art-101', 'ley27742-art-153'],
		jurisprudence: [],
		regulations: ['Ley 24.065 — Marco Regulatorio Eléctrico', 'Ley 26.093 — Biocombustibles'],
		keywords: ['electricidad', 'ENRE', 'ley 24065', 'biocombustibles', 'ley 26093', 'biodiesel', 'marco eléctrico'],
		order: 128,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-153-163',
		lawId: 'ley-27742',
		number: '153-163',
		title: 'Gas natural, energías renovables y disposiciones ambientales de energía',
		originalText: '[Arts. 153-163 modifican la ley 24.076 (Gas Natural) y la ley 27.191 (Energías Renovables). Art. 163 faculta al PEN a elaborar legislación ambiental armonizada para hidrocarburos.]',
		currentText:
			'Arts. 153-159 (Gas Natural — ley 24.076):\n- Modifica el marco regulatorio del gas natural (distribución, transporte).\n- Facilita la entrada de nuevos actores en el transporte y la distribución.\n- Ajusta los mecanismos de fijación de tarifas.\n\nArts. 160-162 (Energías Renovables — ley 27.191):\n- Ajusta los objetivos de participación de energías renovables en la matriz eléctrica.\n- Mantiene los contratos existentes bajo el Programa RenovAr.\n- Modifica las penalidades por incumplimiento de los objetivos de renovables.\n\nArt. 163: El PEN puede elaborar, de acuerdo con las provincias, una legislación ambiental armonizada para la exploración, explotación y transporte de hidrocarburos, con base en las mejores prácticas internacionales.',
		plainLanguageExplanation:
			'El gas natural y las renovables completan el capítulo energético. En gas, los cambios buscan agilizar la expansión de la red de transporte y distribución. En renovables, se ajustan las metas pero se protegen los contratos existentes. El art. 163 reconoce que el fracking y la explotación de Vaca Muerta requieren un marco ambiental nacional que hoy es fragmentado: el PEN y las provincias deben acordar estándares comunes.',
		practicalEffects: [
			'Los contratos del programa RenovAr (parques solares y eólicos) firmados antes de la ley mantienen sus condiciones',
			'La armonización ambiental del art. 163 puede ser relevante para los proyectos RIGI en energía',
		],
		examples: [],
		relatedArticles: ['ley27742-art-101', 'rigi-art-167'],
		jurisprudence: [],
		regulations: ['Ley 24.076 — Gas Natural', 'Ley 27.191 — Energías Renovables', 'Programa RenovAr'],
		keywords: ['gas natural', 'ley 24076', 'energías renovables', 'ley 27191', 'RenovAr', 'legislación ambiental'],
		order: 153,
		segments: [],
		amendments: [],
	},
];
