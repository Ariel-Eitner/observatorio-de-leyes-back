import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_02: LawSection = {
	id: 'ley-27742-s02',
	lawId: 'ley-27742',
	number: 'II',
	name: 'Plazo. Sujetos habilitados',
	articleStart: 167,
	articleEnd: 171,
	titles: [],
};

export const ARTICLES_02: Article[] = [
	{
		id: 'rigi-art-167',
		lawId: 'ley-27742',
		number: '167',
		title: 'Sectores alcanzados',
		text:
			'El RIGI resultará aplicable a las Grandes Inversiones en proyectos de los sectores de forestoindustria, turismo, infraestructura, minería, tecnología, siderurgia, energía, petróleo y gas que cumplan con los requisitos previstos en el presente título.',
		plainLanguageExplanation:
			'El RIGI aplica a nueve sectores: forestoindustria, turismo, infraestructura, minería, tecnología, siderurgia, energía, petróleo y gas. El Decreto 749/2024 define qué actividades específicas encuadran en cada uno.',
		practicalEffects: [
			'Un proyecto de extracción de litio califica como "minería"',
			'Un datacenter de gran escala puede calificar como "tecnología"',
			'Un proyecto de generación eólica califica como "energía"',
			'Un hotel de lujo de escala puede calificar como "turismo"',
			'Actividades no listadas quedan expresamente excluidas',
		],
		examples: [
			'El proyecto de GNL YPF-Petronas en Río Negro fue uno de los primeros en tramitar adhesión bajo el sector "petróleo y gas"',
		],
		relatedArticles: ['rigi-art-164', 'rigi-art-172', 'rigi-art-173'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024 — define cada sector en detalle (art. 3 inc. n)'],
		keywords: ['sectores RIGI', 'forestoindustria', 'turismo', 'infraestructura', 'minería', 'tecnología', 'energía', 'petróleo y gas'],
		order: 167,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-168',
		lawId: 'ley-27742',
		number: '168',
		title: 'Plazo de adhesión',
		text:
			'El plazo para adherirse al RIGI será de dos (2) años, contados a partir de la entrada en vigencia del presente régimen.\n\nEl Poder Ejecutivo nacional podrá prorrogar por única vez la vigencia del plazo para acogerse al RIGI por un período de hasta un (1) año a contar desde el vencimiento del plazo anterior.\n\n(Nota Infoleg: por art. 1° del Decreto N° 105/2026 B.O. 19/2/2026 se prorroga la vigencia del plazo para acogerse al Régimen de Incentivo de Grandes Inversiones (RIGI) por el período de UN (1) año a contar desde el 8 de julio de 2026.)',
		plainLanguageExplanation:
			'Originalmente el RIGI tenía 2 años de ventana de adhesión (julio 2024 - julio 2026). El Poder Ejecutivo usó su única facultad de prórroga y extendió el plazo hasta julio de 2027 mediante Decreto 105/2026. Una vez que vence ese plazo, no se pueden presentar nuevas solicitudes de adhesión.',
		practicalEffects: [
			'El plazo límite actual para adherirse es julio de 2027',
			'Proyectos que no se inscriban antes de ese plazo no pueden acceder a los beneficios RIGI',
			'El PEN ya usó su única prórroga; no puede haber otra sin modificar la ley',
			'Los proyectos presentados dentro del plazo gozan de protección por 30 años, aun cuando la adhesión formal se resuelva después',
		],
		examples: [],
		relatedArticles: ['rigi-art-167', 'rigi-art-175', 'rigi-art-177'],
		jurisprudence: [],
		regulations: ['Decreto 105/2026 — prórroga del plazo hasta julio 2027'],
		keywords: ['plazo RIGI', 'adhesión', 'prórroga', 'vencimiento'],
		order: 168,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-169',
		lawId: 'ley-27742',
		number: '169',
		title: 'Vehículos de Proyecto Único (VPU): sujetos habilitados',
		text:
			'Podrán solicitar su adhesión al RIGI los Vehículos de Proyecto Único (VPU) titulares de una o más fases de un proyecto que califique como Gran Inversión.\n\nLos VPU deberán tener por único y exclusivo objeto llevar a cabo una o más fases de un único proyecto de inversión admitido en el RIGI.\n\nSerán considerados VPU los siguientes entes:\na) Las sociedades anónimas, incluidas las sociedades anónimas unipersonales y las sociedades de responsabilidad limitada;\nb) Las sucursales establecidas por sociedades constituidas en el extranjero de conformidad con el artículo 118 de la Ley General de Sociedades;\nc) Las Sucursales Dedicadas previstas en el artículo 170 de la presente ley; y\nd) Las uniones transitorias y otros contratos asociativos.',
		plainLanguageExplanation:
			'Sólo puede adherirse al RIGI una entidad cuyo único objeto sea ese proyecto de inversión. Puede ser una SA, SRL, sucursal de empresa extranjera, una "Sucursal Dedicada" (parte de una empresa mayor separada contablemente) o una UTE. No puede adherir una empresa que tenga ese proyecto entre varios otros negocios, a menos que use el mecanismo de Sucursal Dedicada del art. 170.',
		practicalEffects: [
			'Una multinacional con múltiples negocios en Argentina no puede adherir todo el grupo, sólo el VPU dedicado al proyecto',
			'Permite que joint ventures (UTEs) entre varias empresas accedan al RIGI',
			'Sucursales de empresas extranjeras pueden adherir directamente sin crear una sociedad local',
			'El requisito de "objeto único" es verificado y auditado por la Autoridad de Aplicación',
		],
		examples: [
			'YPF y Petronas crearon "YPF LNG S.A." —sociedad anónima con objeto único de desarrollar el proyecto de GNL en Río Negro— para poder adherir al RIGI. La empresa matriz YPF no adhirió; sólo la sociedad dedicada exclusivamente a ese proyecto',
		],
		relatedArticles: ['rigi-art-170', 'rigi-art-171', 'rigi-art-175'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024 — Sección I, art. 3° (definiciones de VPU)'],
		keywords: ['VPU', 'vehículo de proyecto único', 'sociedad anónima', 'sucursal', 'unión transitoria'],
		order: 169,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-170',
		lawId: 'ley-27742',
		number: '170',
		title: 'Sucursal Dedicada',
		text:
			'En los casos en los que una sociedad anónima, una sociedad de responsabilidad limitada o una sucursal de una sociedad constituida en el extranjero desee adherir al RIGI y desarrolle una o más actividades que no formarán parte del proyecto de inversión, o posea uno (1) o más activos que no serán afectados a dicho proyecto, podrá optar, al sólo efecto de su adhesión, por establecer una sucursal que deberá cumplir con los siguientes requisitos:\na) Estar inscripta en el registro público;\nb) Obtener CUIT e inscribirse en los tributos correspondientes en forma independiente;\nc) Tener un capital asignado;\nd) Tener como único objeto el desarrollo del proyecto;\ne) Tener asignados únicamente los activos, pasivos y personal afectados al proyecto;\nf) Llevar contabilidad separada.\n\nLa adhesión al RIGI y los incentivos únicamente resultarán aplicables con relación a dicha sucursal.',
		plainLanguageExplanation:
			'Una empresa grande que tiene múltiples negocios puede crear una "Sucursal Dedicada" —una rama jurídicamente separada dentro de la misma empresa— para adherir al RIGI sólo con esa parte de su negocio. La sucursal debe tener contabilidad propia, CUIT propio y estar inscripta como entidad independiente. Los beneficios RIGI sólo aplican a la sucursal, no al resto de la empresa.',
		practicalEffects: [
			'Permite que grandes empresas ya instaladas en Argentina (con múltiples actividades) accedan al RIGI sin tener que crear una sociedad nueva',
			'La sucursal queda "blindada" con los beneficios RIGI; el resto de la empresa mantiene el régimen general',
			'Contabilidad y tributos son completamente separados',
		],
		examples: [
			'Una empresa petrolera con operaciones convencionales y un nuevo proyecto de GNL puede crear una Sucursal Dedicada sólo para el proyecto GNL y adherir al RIGI',
		],
		relatedArticles: ['rigi-art-169', 'rigi-art-195'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024 — define Sucursal Dedicada en art. 3°'],
		keywords: ['sucursal dedicada', 'ring fence', 'contabilidad separada', 'VPU'],
		order: 170,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-171',
		lawId: 'ley-27742',
		number: '171',
		title: 'Causales de exclusión',
		text:
			'No podrán solicitar su inclusión en el RIGI quienes, a la fecha de adhesión y/o a la fecha en la cual la autoridad de aplicación deba resolver la aprobación del plan de inversión, conformen e integren un VPU y se encuentren incluidos en uno o más de los siguientes supuestos:\na) Los condenados, con condena confirmada en segunda instancia, por cualquier tipo de delito en virtud de la ley 27.401 (anticorrupción), o cuyos socios o accionistas se encuentren en dicha situación;\nb) Los declarados en estado de quiebra;\nc) Los condenados por delitos penales tributarios o aduaneros;\nd) Quienes registren deudas firmes, exigibles e impagas de carácter fiscal, aduanero o previsional;\ne) Las personas jurídicas en las que sus socios, administradores o directores hayan sido condenados por los mismos delitos.',
		plainLanguageExplanation:
			'Están excluidos del RIGI los condenados por corrupción (ley anticorrupción), empresas en quiebra, condenados por delitos tributarios o aduaneros, y quienes tengan deudas impositivas o previsionales exigibles. La exclusión aplica tanto a la empresa como a sus accionistas y directivos.',
		practicalEffects: [
			'Empresas con deudas impositivas deben regularizarlas antes de solicitar la adhesión',
			'Un directivo con condena penal inhabilita a toda la empresa',
			'La condena debe ser confirmada en segunda instancia (no alcanza una condena de primera instancia)',
		],
		examples: [
			'Una empresa con deudas exigibles con la AFIP de $50 millones que quiere adherir al RIGI debe regularizarlas primero; de lo contrario su solicitud será rechazada aunque el proyecto cumpla todos los demás requisitos',
		],
		relatedArticles: ['rigi-art-169', 'rigi-art-175', 'rigi-art-177'],
		jurisprudence: [],
		regulations: [],
		keywords: ['exclusión RIGI', 'inhabilitación', 'deuda fiscal', 'quiebra', 'corrupción'],
		order: 171,
		segments: [],
		amendments: [],
	},
];
