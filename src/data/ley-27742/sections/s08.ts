import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_08: LawSection = {
	id: 'ley-27742-s08',
	lawId: 'ley-27742',
	number: 'VIII',
	name: 'Régimen infraccional y recursivo',
	articleStart: 211,
	articleEnd: 217,
	titles: [],
};

export const ARTICLES_08: Article[] = [
	{
		id: 'rigi-art-211',
		lawId: 'ley-27742',
		number: '211',
		title: 'Infracciones sancionables',
		text:
			'Serán sancionables los siguientes incumplimientos:\na) Omitir o demorar la presentación de información requerida;\nb) Presentar información o declaraciones juradas falsas o inexactas;\nc) Omitir la autorización previa expresa de la autoridad de aplicación cuando sea necesaria;\nd) Desafectar bienes introducidos con franquicias RIGI antes del vencimiento de los plazos;\ne) Desarrollar actividades que no correspondan al objeto único del VPU;\nf) Incumplir injustificadamente las obligaciones de inversión de los incisos a) y b) del art. 172;\ng) Goce indebido de las franquicias tributarias, aduaneras y cambiarias.',
		plainLanguageExplanation:
			'El RIGI tiene su propio régimen de infracciones: si el VPU no cumple con el plan de inversión, usa los beneficios (arancel 0%, ganancias reducidas) para proyectos distintos al declarado, vende a terceros equipos importados con franquicia, o da información falsa, puede ser sancionado. Las sanciones van desde apercibimiento hasta el cese del régimen.',
		practicalEffects: [
			'El incumplimiento del cronograma de inversión (inciso f) es la infracción más grave: puede llevar al cese del RIGI',
			'Vender bienes importados con arancel 0% a terceros no-RIGI es una infracción grave (inciso d)',
			'La información falsa en las declaraciones juradas puede ser sancionada administrativamente y también penalmente',
		],
		examples: [],
		relatedArticles: ['rigi-art-212', 'rigi-art-213', 'rigi-art-215', 'rigi-art-216'],
		jurisprudence: [],
		regulations: [],
		keywords: ['infracciones RIGI', 'incumplimiento', 'sanciones', 'información falsa', 'desafectación'],
		order: 211,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-212',
		lawId: 'ley-27742',
		number: '212',
		title: 'Procedimiento sumarial',
		text:
			'Verificado un incumplimiento, la autoridad de aplicación debe intimar al VPU a subsanarlo en 30 días hábiles. Si no subsana o si no es subsanable, se instruye el sumario infraccional. El procedimiento garantiza: notificación de la imputación; 15 días hábiles para descargo y prueba; plazo para producción de prueba (mínimo 20 días hábiles); alegato en 5 días hábiles; resolución en 30 días hábiles desde el cierre del período probatorio.',
		plainLanguageExplanation:
			'Antes de sancionar al VPU, la Autoridad de Aplicación debe seguir un proceso formal que garantiza la defensa: primero da plazo para corregir, luego si no corrige abre un sumario con notificación, plazo para presentar descargo y pruebas, y resolución fundada. No hay sanciones automáticas ni sin audiencia previa.',
		practicalEffects: [
			'El VPU tiene múltiples oportunidades de defenderse antes de ser sancionado',
			'El plazo total del proceso puede extenderse varios meses',
			'La Autoridad de Aplicación debe fundamentar por escrito cualquier rechazo de prueba',
		],
		examples: [],
		relatedArticles: ['rigi-art-211', 'rigi-art-213', 'rigi-art-217'],
		jurisprudence: [],
		regulations: [],
		keywords: ['sumario RIGI', 'procedimiento infraccional', 'debido proceso', 'defensa', 'descargo'],
		order: 212,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-213',
		lawId: 'ley-27742',
		number: '213',
		title: 'Sanciones',
		text:
			'Concluido el procedimiento sumarial, si se verifica el incumplimiento, la autoridad de aplicación aplica una o más de las siguientes sanciones:\na) Apercibimiento, para omisión de información;\nb) Multa de $10M a $30M, para omisión de información;\nc) Multa de $100M a $400M, para información falsa, omisión de autorización y desafectación de bienes;\nd) Multa de 1% a 3% del monto mínimo de inversión, para actividades fuera del objeto único;\ne) Multa de 5% a 15% del monto mínimo pendiente, por incumplimiento de cronograma;\nf) Cese del RIGI, por incumplimiento grave del cronograma;\ng) Cese del RIGI, por goce indebido de franquicias.',
		plainLanguageExplanation:
			'Las sanciones van de menor a mayor: el apercibimiento es una advertencia formal; las multas en pesos son económicas pero no implican perder el régimen; la multa del 5-15% del monto pendiente es significativa para proyectos grandes; y el cese del RIGI —la sanción máxima— significa perder todos los beneficios del régimen hacia adelante.',
		practicalEffects: [
			'Un proyecto de USD 500M que incumple el cronograma puede recibir una multa del 15% del monto pendiente = decenas de millones de dólares',
			'El cese del RIGI no tiene efecto retroactivo: los beneficios ya utilizados quedan firmes',
			'Las multas en pesos fijas pueden quedar desactualizadas por inflación',
		],
		examples: [
			'Un proyecto minero debía invertir USD 400M en 2 años y sólo invirtió USD 200M sin justificación válida. La multa por incumplimiento de cronograma puede llegar al 15% del monto pendiente: 15% × USD 200M = USD 30M. Si el incumplimiento es reiterado, puede aplicarse el cese del régimen',
		],
		relatedArticles: ['rigi-art-212', 'rigi-art-214', 'rigi-art-216'],
		jurisprudence: [],
		regulations: [],
		keywords: ['sanciones RIGI', 'multa', 'cese régimen', 'apercibimiento', 'incumplimiento'],
		order: 213,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-214',
		lawId: 'ley-27742',
		number: '214',
		title: 'Efecto del cese sobre las garantías',
		text:
			'En la misma resolución en la que la autoridad de aplicación disponga el cese del RIGI como sanción, deberá disponer también la ejecución de las garantías previstas en el artículo 182, sin perjuicio de los daños y perjuicios que pudieran corresponder al Estado.',
		plainLanguageExplanation:
			'Si el VPU es sancionado con el cese del RIGI, el Estado ejecuta inmediatamente las garantías que el inversor constituyó al adherirse (art. 182). Esto es el "seguro" del Estado frente a incumplimientos: si el proyecto fracasa o incumple deliberadamente, el Estado cobra esas garantías.',
		practicalEffects: [
			'La ejecución de garantías es simultánea al cese, sin necesidad de proceso adicional',
			'El Estado puede reclamar daños adicionales más allá de lo cubierto por la garantía',
		],
		examples: [],
		relatedArticles: ['rigi-art-182', 'rigi-art-213', 'rigi-art-216'],
		jurisprudence: [],
		regulations: [],
		keywords: ['ejecución garantías', 'cese RIGI', 'sanción', 'incumplimiento'],
		order: 214,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-215',
		lawId: 'ley-27742',
		number: '215',
		title: 'Prescripción de la acción penal en infracciones RIGI',
		text:
			'La acción penal en las infracciones del artículo 211 prescribe a los cinco (5) años de haber sido cometida la infracción. La acción de repetición prescribe a los cinco (5) años de que la autoridad de aplicación haya tomado conocimiento de la infracción.',
		plainLanguageExplanation:
			'El plazo para que el Estado persiga infracciones al RIGI es de 5 años. Si la Autoridad de Aplicación no actúa dentro de ese plazo, pierde el derecho a sancionar. La prescripción para recuperar beneficios tributarios o aduaneros usados indebidamente también es de 5 años, pero corre desde que el Estado se enteró (no desde la infracción).',
		practicalEffects: [
			'Infracciones muy antiguas o no detectadas a tiempo quedan sin sanción',
			'El plazo más largo para repetición (desde el conocimiento) protege al Estado en casos donde el fraude fue ocultado',
		],
		examples: [],
		relatedArticles: ['rigi-art-211', 'rigi-art-213'],
		jurisprudence: [],
		regulations: [],
		keywords: ['prescripción RIGI', 'acción penal', 'infracciones', '5 años', 'repetición'],
		order: 215,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-216',
		lawId: 'ley-27742',
		number: '216',
		title: 'Resolución de cese',
		text:
			'El cese será dispuesto por la autoridad de aplicación mediante resolución fundada, en la que se especifiquen las causales del incumplimiento que dan lugar al cese, los efectos del mismo y la forma en que operará la ejecución de las garantías. El cese produce efectos desde la fecha de su notificación al VPU.',
		plainLanguageExplanation:
			'La pérdida del régimen RIGI no puede ser arbitraria: la Autoridad de Aplicación debe dictar una resolución que explique por qué se aplica el cese, qué efectos tiene y cómo se ejecutan las garantías. El VPU pierde los beneficios desde el día en que recibe esa notificación.',
		practicalEffects: [
			'El cese es apelable (art. 217): el VPU puede recurrir judicialmente y pedir medidas cautelares',
			'El VPU puede seguir operando (sin beneficios RIGI) mientras apela',
		],
		examples: [],
		relatedArticles: ['rigi-art-213', 'rigi-art-214', 'rigi-art-217'],
		jurisprudence: [],
		regulations: [],
		keywords: ['resolución cese RIGI', 'notificación', 'efectos cese', 'recurso'],
		order: 216,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-217',
		lawId: 'ley-27742',
		number: '217',
		title: 'Recursos contra sanciones',
		text:
			'Las sanciones dispuestas por la autoridad de aplicación podrán ser recurridas por el VPU ante la Cámara Nacional de Apelaciones en lo Contencioso Administrativo Federal, dentro de los treinta (30) días hábiles de su notificación. La interposición del recurso suspenderá la ejecución de la sanción, salvo en lo que respecta al cese del régimen que producirá efectos desde la notificación de la resolución de la autoridad de aplicación.',
		plainLanguageExplanation:
			'Si el VPU no está de acuerdo con la sanción, puede apelarla ante la justicia federal en 30 días. Mientras dure la apelación, la sanción no se ejecuta (excepto el cese del régimen, que sí opera aunque puede pedirse una medida cautelar para suspenderlo durante el juicio).',
		practicalEffects: [
			'El VPU puede seguir operando mientras apela multas',
			'El cese del RIGI sí es inmediato, pero puede revertirse si la justicia concede una medida cautelar',
			'El ámbito judicial es la Cámara Federal en lo Contencioso Administrativo, especializada en casos contra el Estado',
		],
		examples: [
			'La Autoridad sanciona con cese a un VPU por actividades fuera del objeto único. El VPU recurre en 30 días hábiles ante la Cámara Federal y pide medida cautelar. Si la cautelar es concedida, el proyecto sigue operando con todos los beneficios RIGI hasta que haya sentencia firme',
		],
		relatedArticles: ['rigi-art-216', 'rigi-art-221'],
		jurisprudence: [],
		regulations: [],
		keywords: ['recurso judicial RIGI', 'apelación', 'Cámara Federal', 'suspensión sanción', 'medida cautelar'],
		order: 217,
		segments: [],
		amendments: [],
	},
];
