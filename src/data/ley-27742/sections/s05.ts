import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_05: LawSection = {
	id: 'ley-27742-s05',
	lawId: 'ley-27742',
	number: 'V',
	name: 'Incentivos cambiarios',
	articleStart: 198,
	articleEnd: 200,
	titles: [],
};

export const ARTICLES_05: Article[] = [
	{
		id: 'rigi-art-198',
		lawId: 'ley-27742',
		number: '198',
		title: 'Libre disponibilidad de divisas de exportación',
		originalText:
			'Los cobros de exportaciones de productos del Proyecto Adherido al RIGI efectuados por los VPU quedan exceptuados en los porcentajes descriptos a continuación de la obligación de ingreso y/o negociación y liquidación en el mercado de cambios:\na) Veinte por ciento (20%) luego de transcurrido dos (2) años contados desde la fecha de puesta en marcha del VPU;\nb) Cuarenta por ciento (40%) luego de transcurrido tres (3) años contados desde la fecha de puesta en marcha del VPU;\nc) Ciento por ciento (100%) luego de transcurrido cuatro (4) años contados desde la fecha de puesta en marcha del VPU.\n\nDichos fondos en los porcentajes referidos serán de libre disponibilidad.\n\nLos VPU no estarán obligados a ingresar y/o liquidar en el mercado de cambios las divisas y/o cualquier contravalor correspondiente a otros rubros o conceptos (tales como aportes de capital, préstamos o servicios) vinculados al proyecto, contando con la libre disponibilidad de los mismos.\n\nCuando se trate de cobros de exportaciones efectuadas por VPU titulares de Proyectos de Exportación Estratégica de Largo Plazo, los plazos se computan como: 20% al año 1; 40% al año 2; 100% al año 3 desde la puesta en marcha.',
		currentText:
			'Las divisas de exportación de proyectos RIGI se liberan progresivamente:\n- Año 2: 20% libre disponibilidad\n- Año 3: 40% libre disponibilidad\n- Año 4: 100% libre disponibilidad\n(Plazos desde la puesta en marcha, no desde la adhesión)\n\nPara proyectos de Exportación Estratégica: plazos 1 año antes.\n\nAportes de capital, préstamos y servicios: libre disponibilidad desde el inicio.',
		plainLanguageExplanation:
			'En Argentina, las empresas deben liquidar en el BCRA los dólares que cobran por sus exportaciones ("cepo cambiario"). El RIGI exime de esta obligación en forma progresiva: a los 4 años de empezar a operar, el 100% de lo que el proyecto gane en el exterior es de libre disponibilidad (el VPU no necesita venderlos al BCRA). Los aportes de capital y préstamos son libres desde el inicio.',
		practicalEffects: [
			'A los 4 años de operación, el VPU puede guardar el 100% de sus divisas en el exterior o en Argentina, sin obligación de venderlas al BCRA',
			'Los primeros años aún hay restricciones parciales (80% debe liquidarse en el año 2, 60% en el año 3)',
			'Para proyectos de Exportación Estratégica (USD 1.000M+), la liberación total es a los 3 años',
			'Es el beneficio cambiario más debatido: los críticos dicen que priva al BCRA de divisas necesarias para la economía',
		],
		examples: [
			'Un proyecto de GNL que en su año 5 de operación exporta USD 1.000M puede retener el 100% de esos dólares en el exterior',
		],
		relatedArticles: ['rigi-art-199', 'rigi-art-200', 'rigi-art-201', 'rigi-art-205'],
		jurisprudence: [],
		regulations: ['BCRA — circulares de implementación del régimen cambiario RIGI'],
		keywords: ['libre disponibilidad de divisas', 'cepo cambiario', 'exportación RIGI', 'BCRA', 'liquidación de divisas'],
		order: 198,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-199',
		lawId: 'ley-27742',
		number: '199',
		title: 'Divisas de financiamiento',
		originalText:
			'Las divisas provenientes de financiamientos locales o externos tomados por los VPU adheridos al RIGI, que fueran desembolsados con posterioridad a la entrada en vigencia de la presente ley, no estarán sujetas a restricciones en cuanto a su libre disponibilidad en el exterior o en el país. Dichos fondos serán de libre disponibilidad por parte del VPU y/o del Proyecto Adherido y sus montos podrán ser utilizados libremente para cualquier concepto.\n\nNo le será aplicable a los VPU adheridos al RIGI ninguna limitación a la tenencia de activos externos líquidos o no, impuesta por la normativa cambiaria.',
		currentText:
			'Las divisas provenientes de préstamos (nacionales o extranjeros) y aportes de capital de los VPU son de libre disponibilidad desde el inicio, sin las restricciones del régimen cambiario general. Tampoco aplican las restricciones sobre tenencia de activos externos.',
		plainLanguageExplanation:
			'El dinero que una empresa del exterior aporta como capital o préstamo a un proyecto RIGI puede mantenerse en el exterior o moverse libremente, sin las restricciones del "cepo" cambiario. Los VPU tampoco tienen límites para mantener activos líquidos en el exterior (como las restricciones de "posición en activos externos" que afectan al resto de las empresas).',
		practicalEffects: [
			'Un inversor puede aportar capital al VPU desde el exterior y el VPU no está obligado a ingresarlo al BCRA',
			'Facilita la estructuración de proyectos con financiamiento externo en dólares',
			'Elimina el riesgo de que futuras regulaciones cambiarias bloqueen el movimiento de fondos del proyecto',
		],
		examples: [
			'Un fondo de inversión de Emiratos Árabes aporta USD 400M de capital a un proyecto RIGI de hidrógeno verde. Ese dinero puede permanecer en una cuenta en el exterior, usarse directamente para importar equipos, o ingresar a Argentina: el BCRA no puede obligarlo a liquidarlo al tipo de cambio oficial',
		],
		relatedArticles: ['rigi-art-198', 'rigi-art-200', 'rigi-art-205'],
		jurisprudence: [],
		regulations: [],
		keywords: ['divisas financiamiento', 'libre disponibilidad', 'capital extranjero', 'cepo', 'RIGI'],
		order: 199,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-200',
		lawId: 'ley-27742',
		number: '200',
		title: 'Garantías del Estado nacional',
		originalText:
			'El Estado nacional garantiza a los VPU adheridos al RIGI:\na) La plena disponibilidad sobre los productos resultantes del proyecto, sin obligación de comercialización en el mercado local;\nb) La plena disponibilidad de sus activos e inversiones, que no serán objeto de actos confiscatorios o expropiatorios;\nc) El derecho a la operación continuada del proyecto sin interrupciones, salvo orden judicial con previo derecho de defensa;\nd) El derecho a pagar utilidades, dividendos e intereses mediante acceso al mercado de cambios sin restricciones;\ne) El acceso irrestricto a la justicia y demás remedios legales disponibles.',
		currentText:
			'El Estado nacional garantiza a los VPU RIGI: libre disponibilidad de la producción (sin obligación de vender al mercado local); no confiscación ni expropiación; continuidad operativa (sólo una orden judicial puede interrumpirla); acceso libre al mercado de cambios para pagar dividendos e intereses; y acceso irrestricto a la justicia.',
		plainLanguageExplanation:
			'El Estado se compromete a 5 garantías fundamentales para los inversores RIGI: (1) no obligar a vender al mercado interno, (2) no expropiar, (3) no interrumpir las operaciones salvo orden judicial, (4) permitir girar dividendos al exterior sin restricciones, y (5) garantizar acceso a la justicia. Estas garantías son parte de la "seguridad jurídica" que el RIGI promete.',
		practicalEffects: [
			'La garantía anti-expropiación está respaldada por el art. 165 (nulidad de normas contrarias) y el arbitraje del art. 221',
			'La no-comercialización en mercado local elimina el riesgo de "abastecimiento forzoso" (priorizar el mercado interno)',
			'Si el Estado viola cualquiera de estas garantías, el inversor puede ir al arbitraje internacional (art. 221)',
		],
		examples: [
			'Si un gobierno decide expropiar activos de una mina RIGI por "interés público", el inversor invoca la garantía del art. 200 inc. b). Si el Estado no revierte la medida en los 60 días del proceso amistoso del art. 221, el inversor puede iniciar arbitraje internacional ante el CIADI',
		],
		relatedArticles: ['rigi-art-165', 'rigi-art-198', 'rigi-art-201', 'rigi-art-221'],
		jurisprudence: [],
		regulations: [],
		keywords: ['garantías Estado', 'expropiación', 'continuidad operativa', 'mercado local', 'divisas', 'RIGI'],
		order: 200,
		segments: [],
		amendments: [],
	},
];
