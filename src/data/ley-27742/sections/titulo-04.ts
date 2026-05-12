import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_TITULO_04: LawSection = {
	id: 'ley-27742-titulo-04',
	lawId: 'ley-27742',
	number: 'IV',
	name: 'Promoción del empleo registrado',
	articleStart: 76,
	articleEnd: 81,
	titles: [],
};

export const ARTICLES_TITULO_04: Article[] = [
	{
		id: 'ley27742-art-76',
		lawId: 'ley-27742',
		number: '76',
		title: 'Regularización de relaciones laborales no registradas',
		originalText:
			'Los empleadores podrán regularizar las relaciones laborales vigentes del sector privado iniciadas con anterioridad a la fecha de promulgación de la presente ley. La regularización podrá comprender relaciones laborales no registradas o relaciones laborales deficientemente registradas.',
		currentText:
			'Los empleadores del sector privado pueden blanquear relaciones laborales no registradas o mal registradas que existían antes de la promulgación de la ley.',
		plainLanguageExplanation:
			'Argentina tiene un problema crónico de empleo informal: millones de trabajadores que no están registrados ante la AFIP y la seguridad social, lo que los priva de obra social, jubilación y asignaciones. El art. 76° abre una ventana de regularización: los empleadores pueden declarar esos trabajadores "en blanco" con beneficios importantes (condonación de deudas, extinción de acciones penales).',
		practicalEffects: [
			'Aplica solo a relaciones laborales que ya existían antes de la promulgación (no habilita nuevas contrataciones informales)',
			'El empleador puede regularizar relaciones "deficientemente registradas" (por ejemplo, declaradas con menos horas o salario menor al real)',
			'Es opcional para el empleador, no obligatorio',
		],
		examples: [
			'Un restaurante tenía a un cocinero trabajando 8 horas diarias pero lo tenía declarado solo 4 horas. El art. 76° le permite rectificar la registración pagando la diferencia de aportes con condonación parcial',
		],
		relatedArticles: ['ley27742-art-77', 'ley27742-art-78', 'ley27742-art-79'],
		jurisprudence: [],
		regulations: [],
		keywords: ['empleo informal', 'regularización laboral', 'blanqueo laboral', 'trabajo no registrado'],
		order: 76,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-77',
		lawId: 'ley-27742',
		number: '77',
		title: 'Efectos de la regularización laboral',
		originalText:
			'El Poder Ejecutivo nacional reglamentará los efectos que producirá la regularización de las relaciones laborales indicadas en el artículo precedente. Esos efectos podrán comprender: a) Extinción de la acción penal y condonación de multas e infracciones laborales y previsionales; b) Baja del REPSAL respecto de infracciones hasta la entrada en vigencia; c) Condonación de deuda por capital e intereses de aportes y contribuciones a la seguridad social (SIPA, PAMI, salud, desempleo, asignaciones familiares), con condonación mínima del 70%; d) La reglamentación podrá establecer incentivos para pago de contado y beneficios para PyMES.',
		currentText:
			'Los empleadores que regularicen obtienen: extinción de la acción penal laboral; condonación de multas e infracciones; baja del REPSAL (registro de infractores); condonación de deuda de seguridad social con al menos 70% de quita. Las PyMES tienen beneficios adicionales.',
		plainLanguageExplanation:
			'La zanahoria de la regularización: los empleadores que se "blanquean" voluntariamente no van a juicio, se les perdonan las multas acumuladas y se les condona gran parte de lo que debían en aportes (mínimo 70% de quita). Es un esquema tipo "amnistía laboral" que los gobiernos usan para achicar la informalidad sin esperar resultados judiciales.',
		practicalEffects: [
			'Un empleador que tenía 5 años de aportes impagos puede regularizar pagando solo el 30% de lo adeudado (mínimo)',
			'La condonación no cubre el 100%: siempre hay que pagar algo',
			'El REPSAL es el registro público de empleadores sancionados: salir de él mejora la imagen de la empresa para licitaciones públicas',
		],
		examples: [
			'Una pyme de 8 empleados tenía deuda de $2 millones en aportes no pagados con la AFIP. Adhiriendo a la regularización, puede pagar solo $600.000 (70% de quita) y quedar libre de toda deuda, multa y acción penal',
		],
		relatedArticles: ['ley27742-art-76', 'ley27742-art-78', 'ley27742-art-80'],
		jurisprudence: [],
		regulations: [],
		keywords: ['condonación deuda laboral', 'REPSAL', 'amnistía laboral', 'seguridad social', 'regularización'],
		order: 77,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-78',
		lawId: 'ley-27742',
		number: '78',
		title: 'Cómputo de años de servicio regularizados para jubilación',
		originalText:
			'Los trabajadores incluidos en la regularización tendrán derecho a computar hasta sesenta (60) meses de servicios con aportes (o la menor cantidad regularizada), calculados sobre el salario mínimo vital y móvil, únicamente a fin de cumplir con los años de servicios requeridos por la ley 24.241 para la Prestación Básica Universal y el beneficio de desempleo (art. 113 ley 24.013). Los meses regularizados no se consideran para la Prestación Compensatoria ni la Prestación Adicional por Permanencia.',
		currentText:
			'Los trabajadores regularizados pueden computar hasta 60 meses de aportes (sobre el SMVM) para alcanzar los años exigidos para la jubilación básica y el seguro de desempleo. Pero esos meses NO se computan para calcular el monto de la jubilación (prestación compensatoria ni permanencia).',
		plainLanguageExplanation:
			'El beneficio para el trabajador: con la regularización puede "sumar" hasta 5 años de aportes que antes no existían en su historia previsional, ayudándolo a alcanzar los 30 años de aportes necesarios para jubilarse. Pero hay un límite importante: esos años extras solo sirven para "llegar al mínimo", no para aumentar el monto de la jubilación.',
		practicalEffects: [
			'Un trabajador que tenía 26 años de aportes y no podía jubilarse puede sumar 4 años regularizados para alcanzar los 30 años requeridos',
			'El monto de la jubilación no mejora con estos años regularizados: solo se alcanza el umbral de acceso',
			'Los aportes se calculan sobre el SMVM, no sobre el sueldo real: puede resultar en una historia previsional base baja',
		],
		examples: [],
		relatedArticles: ['ley27742-art-76', 'ley27742-art-77'],
		jurisprudence: [],
		regulations: ['Ley 24.241 — Sistema Integrado Previsional Argentino'],
		keywords: ['jubilación', 'años de servicio', 'regularización laboral', 'SIPA', 'prestación básica universal'],
		order: 78,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-79',
		lawId: 'ley-27742',
		number: '79',
		title: 'Plazo para regularizar — 90 días desde la reglamentación',
		originalText:
			'La regularización de las relaciones laborales deberá efectivizarse dentro de los noventa (90) días corridos, contados desde la fecha de entrada en vigencia de la reglamentación del presente título de la ley.',
		currentText:
			'El empleador tiene 90 días desde que el PEN reglamente el Título IV para adherir al régimen de regularización.',
		plainLanguageExplanation:
			'El blanqueo laboral tiene ventana acotada: 90 días desde que se publique la reglamentación. Pasado ese plazo, un empleador no puede acceder a los beneficios de la regularización.',
		practicalEffects: [
			'La ventana empieza a correr desde la reglamentación, no desde la ley: el PEN controla el timing',
			'90 días corridos = aproximadamente 3 meses calendario',
		],
		examples: [],
		relatedArticles: ['ley27742-art-76', 'ley27742-art-77'],
		jurisprudence: [],
		regulations: [],
		keywords: ['plazo regularización', '90 días', 'empleo informal', 'ventana de adhesión'],
		order: 79,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-80',
		lawId: 'ley-27742',
		number: '80',
		title: 'Deudas controvertidas judicialmente — adhesión posible',
		originalText:
			'Podrán incluirse en el presente régimen las deudas que se encuentren controvertidas en sede administrativa, contencioso administrativa o judicial, a la fecha de publicación de la presente ley en el Boletín Oficial, en tanto el empleador se allane incondicionalmente y, en su caso, desista y renuncie a toda acción y derecho, incluso al de repetición, asumiendo el pago de las costas y gastos causídicos.',
		currentText:
			'Empleadores con juicios en curso (laborales, administrativos o judiciales) pueden adherir al régimen de regularización. Condición: allanarse incondicionalmente, desistir del litigio y pagar las costas del juicio.',
		plainLanguageExplanation:
			'Si un empleador está peleando en la justicia con la AFIP o un trabajador por deudas laborales, puede "bajar los brazos" y adherir al blanqueo laboral. La contrapartida: renuncia a ganar el juicio y paga las costas. Es una forma de resolver litigios laborales masivos sin seguir años de proceso judicial.',
		practicalEffects: [
			'Libera juzgados laborales de demandas pendientes',
			'El empleador paga las costas incluso si renunciaba a una causa que tenía chances de ganar',
		],
		examples: [],
		relatedArticles: ['ley27742-art-77', 'ley27742-art-79'],
		jurisprudence: [],
		regulations: [],
		keywords: ['deudas controvertidas', 'allanamiento', 'desistimiento', 'regularización laboral'],
		order: 80,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-81',
		lawId: 'ley-27742',
		number: '81',
		title: 'Suspensión de fiscalizaciones y ajustes durante la regularización',
		originalText:
			'La Administración Federal de Ingresos Públicos y las instituciones de la seguridad social se abstendrán de formular, de oficio, determinaciones de deuda y de labrar actas de infracción por las mismas causas y períodos comprendidos en la regularización correspondiente a los subsistemas de la seguridad social, así como de formular ajustes impositivos, todo ello con causa en las relaciones laborales regularizadas en el marco de este título.',
		currentText:
			'Mientras rige el régimen de regularización, la AFIP y los organismos de seguridad social no pueden iniciar de oficio nuevas determinaciones de deuda ni labrar actas de infracción por los mismos períodos y causas que están siendo regularizados.',
		plainLanguageExplanation:
			'Protección durante el proceso: si un empleador se está regularizando, la AFIP no puede salir al mismo tiempo a determinarle deuda o multarlo por los mismos hechos. Sería contradictorio: el Estado no puede ofrecer blanqueo con una mano y multar con la otra.',
		practicalEffects: [
			'La suspensión es automática para los períodos y causas cubiertos por la regularización',
			'Si la regularización fracasa (el empleador no paga lo que prometió), la AFIP puede reanudar las acciones',
		],
		examples: [],
		relatedArticles: ['ley27742-art-76', 'ley27742-art-77'],
		jurisprudence: [],
		regulations: [],
		keywords: ['AFIP', 'seguridad social', 'suspensión fiscalización', 'regularización laboral'],
		order: 81,
		segments: [],
		amendments: [],
	},
];
