import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_TITULO_08: LawSection = {
	id: 'ley-27742-titulo-08',
	lawId: 'ley-27742',
	number: 'VIII',
	name: 'Medidas fiscales para un ajuste equitativo y de calidad',
	articleStart: 229,
	articleEnd: 233,
	titles: [],
};

export const ARTICLES_TITULO_08: Article[] = [
	{
		id: 'ley27742-art-229',
		lawId: 'ley-27742',
		number: '229',
		title: 'Base imponible tabaco — precio de mercado cuando hay subvaluación',
		originalText:
			'Incorpórase como artículo sin número a continuación del artículo 14 de la ley de Impuestos Internos (texto sustituido por la ley 24.674 y sus modificaciones) el siguiente: "Cuando el precio de venta al consumidor declarado por el fabricante o importador fuera inferior en más de un veinte por ciento (20%) al precio de venta al consumidor que resultara del relevamiento efectuado por la AFIP, ésta podrá tomar como base imponible el precio relevado."',
		currentText:
			'Si el precio de venta al consumidor declarado por el fabricante es más de un 20% inferior al precio de mercado relevado por la AFIP, la AFIP puede usar el precio de mercado como base imponible para el impuesto interno al tabaco.',
		plainLanguageExplanation:
			'Cierra una brecha clásica de evasión: si el fabricante declara que sus cigarrillos valen $500 pero en el kiosco se venden a $700, la diferencia (40%) supera el 20% tolerado. La AFIP puede entonces cobrar el impuesto sobre $700, no sobre $500. El fraude se vuelve ineficiente porque la base real se aplica igual.',
		practicalEffects: [
			'La AFIP debe hacer relevamientos de precios de mercado para poder aplicar este artículo',
			'El umbral del 20% da margen para variaciones normales de precio entre canales; solo se activa ante subvaluación significativa',
			'Afecta principalmente a tabacaleras pequeñas o importadoras que subvaluaban el precio declarado',
		],
		examples: [
			'Una tabacalera declara precio de venta de $500 por paquete. La AFIP releva $650 en kioscos. Como $500 es un 23% inferior a $650 (supera el 20%), la AFIP usa $650 como base: impuesto = 73% × $650 = $474,50',
		],
		relatedArticles: ['ley27742-art-230', 'ley27742-art-231'],
		jurisprudence: [],
		regulations: ['Ley 24.674 — Impuestos Internos'],
		keywords: ['impuesto interno tabaco', 'precio de mercado', 'base imponible', 'subvaluación', 'AFIP'],
		order: 229,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-230',
		lawId: 'ley-27742',
		number: '230',
		title: 'Alícuota del impuesto interno a cigarrillos — 73%',
		originalText:
			'Sustitúyese el artículo 15 de la ley de Impuestos Internos (texto sustituido por la ley 24.674 y sus modificaciones) por el siguiente: "Artículo 15: Los cigarrillos de producción nacional o importados, cualquiera sea su clase o denominación, tributarán sobre el precio de venta al consumidor, inclusive impuestos, excepto el impuesto al valor agregado, el setenta y tres por ciento (73%)."',
		currentText:
			'Fija la alícuota del impuesto interno a cigarrillos en el 73% del precio de venta al consumidor (incluyendo todos los impuestos excepto IVA). Aplica tanto a cigarrillos de producción nacional como importados.',
		plainLanguageExplanation:
			'El impuesto "cascada" sobre los cigarrillos es del 73%: de cada $100 que paga el consumidor, $73 van al Estado. Es una de las alícuotas más altas de América Latina, y es la herramienta principal para reducir el consumo de tabaco y recaudar. Este artículo confirma y consolida esa alícuota.',
		practicalEffects: [
			'La base es el precio final al consumidor incluyendo todos los impuestos excepto IVA, lo que eleva la base respecto a si se calculara sobre el precio de fábrica',
			'Aplica igual a cigarrillos nacionales e importados: no hay discriminación',
			'A esta alícuota se suma el IVA por separado, llegando el impuesto total a cerca del 85-87% del precio de fábrica',
		],
		examples: [
			'Un paquete de cigarrillos se vende a $1.000. Impuesto interno: 73% × $1.000 = $730. El IVA se calcula sobre el valor neto de IVA por separado',
		],
		relatedArticles: ['ley27742-art-229', 'ley27742-art-231'],
		jurisprudence: [],
		regulations: ['Ley 24.674 — Impuestos Internos, art. 15'],
		keywords: ['alícuota 73%', 'cigarrillos', 'impuesto interno tabaco', 'precio de venta al consumidor'],
		order: 230,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-231',
		lawId: 'ley-27742',
		number: '231',
		title: 'Actualización trimestral por IPC del monto mínimo del impuesto',
		originalText:
			'Sustitúyese el artículo 16 de la ley de Impuestos Internos (texto sustituido por la ley 24.674 y sus modificaciones) por el siguiente: "Artículo 16: El monto mínimo del impuesto se actualizará trimestralmente de acuerdo con las variaciones del Índice de Precios al Consumidor (IPC) elaborado por el INDEC, tomando como base el mes de enero de 2018. El Poder Ejecutivo nacional podrá incrementar dicho monto mínimo hasta en un veinticinco por ciento (25%) o reducirlo hasta en un diez por ciento (10%), en función de objetivos de política fiscal o de salud pública."',
		currentText:
			'El monto mínimo del impuesto interno al tabaco se actualiza trimestralmente por IPC (base enero 2018). El PEN puede incrementarlo hasta 25% o reducirlo hasta 10% por razones de política fiscal o salud pública.',
		plainLanguageExplanation:
			'El monto mínimo es un piso: si la alícuota del 73% daría un impuesto menor al mínimo, se cobra el mínimo igual. La actualización por IPC evita que la inflación erosione ese piso (en Argentina esto es crítico). El PEN tiene flexibilidad adicional de ±25%/10% para ajustes de política.',
		practicalEffects: [
			'Sin actualización automática, la inflación habría licuado el mínimo y las tabacaleras bajas habrían pagado menos en términos reales',
			'La base enero 2018 fue elegida como punto de referencia post-reforma tributaria anterior',
			'El 25% de margen para subir y sólo 10% para bajar es asimétrico: prioriza ingresos fiscales y política de salud',
		],
		examples: [
			'Si el mínimo en enero 2018 era $10 por paquete, y el IPC acumuló 3.000% desde entonces, el mínimo actualizado sería $310 por paquete',
		],
		relatedArticles: ['ley27742-art-230', 'ley27742-art-232'],
		jurisprudence: [],
		regulations: ['Ley 24.674 — Impuestos Internos, art. 16', 'INDEC — IPC'],
		keywords: ['monto mínimo tabaco', 'actualización IPC', 'impuesto interno', 'inflación', 'política fiscal'],
		order: 231,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-232',
		lawId: 'ley-27742',
		number: '232',
		title: 'Actualización del impuesto a cigarros y cigarritos — art. 18 ley 24.674',
		originalText:
			'Sustitúyese el artículo 18 de la ley de Impuestos Internos (texto sustituido por la ley 24.674 y sus modificaciones) por el siguiente: "Artículo 18: Los cigarros, cigarritos, tabaco para armar y demás manufacturas de tabaco tributarán el impuesto conforme a lo previsto en el artículo 16 para la actualización del monto mínimo, aplicando los porcentajes que correspondan a cada categoría según la reglamentación."',
		currentText:
			'Actualiza el art. 18 de la ley 24.674 (cigarros, cigarritos, tabaco para armar y otras manufacturas de tabaco) para que su mecanismo de actualización quede alineado con el nuevo art. 16 (actualización trimestral por IPC del art. 231 de esta ley).',
		plainLanguageExplanation:
			'Los cigarros y cigarritos también pagan impuesto interno, pero sus alícuotas y mínimos son distintos a los de los cigarrillos. Este artículo los vincula al mismo mecanismo de actualización por IPC para que no queden desactualizados tampoco.',
		practicalEffects: [
			'Alinea todo el universo tabacalero al mismo mecanismo de actualización',
			'Evita que cigarros importados de alta gama (que pagan por el art. 18) queden con impuestos desactualizados',
		],
		examples: [],
		relatedArticles: ['ley27742-art-231', 'ley27742-art-230'],
		jurisprudence: [],
		regulations: ['Ley 24.674 — Impuestos Internos, art. 18'],
		keywords: ['cigarros', 'cigarritos', 'tabaco para armar', 'impuesto interno', 'actualización'],
		order: 232,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-233',
		lawId: 'ley-27742',
		number: '233',
		title: 'Sanción por transporte de tabaco sin documentación',
		originalText:
			'Incorpórase como artículo sin número a continuación del artículo 18 de la ley de Impuestos Internos (texto sustituido por la ley 24.674 y sus modificaciones) el siguiente: "El transporte de tabaco en cualquiera de sus formas, fuera de los establecimientos habilitados, sin la documentación respaldatoria exigida por la AFIP, dará lugar a la aplicación de una multa equivalente al impuesto que resultara de aplicar la alícuota establecida en el artículo 15 sobre el precio de mercado de los productos transportados, determinado en función de los gramos de tabaco, considerando que un cigarrillo equivale a 0,80 gramos."',
		currentText:
			'El transporte de tabaco fuera de establecimientos habilitados sin documentación respaldatoria exigida por AFIP se sanciona con multa. La multa equivale al impuesto que correspondería al tabaco transportado, calculado al 73% sobre el precio de mercado (1 cigarrillo = 0,80 gramos de tabaco).',
		plainLanguageExplanation:
			'Atacar el mercado negro de cigarrillos: si un camión lleva tabaco sin los papeles de la AFIP (guías, facturas, declaraciones de despacho), se lo multa como si hubiera evadido el impuesto de todo lo que transporta. Esto desincentiva el transporte ilegal de tabaco de contrabando o sin impuestos pagados.',
		practicalEffects: [
			'La equivalencia 0,80 gramos/cigarrillo permite calcular el impuesto evadido sobre cualquier formato de tabaco (picado, en hebras, en cigarros)',
			'La multa es confiscatoria en términos proporcionales, lo que desincentiva fuertemente el contrabando',
			'La AFIP puede aplicar esta sanción en controles de tránsito, aduanas y depósitos',
		],
		examples: [
			'Un camión transporta 10 kg de tabaco sin documentación. Equivalencia: 10.000 g ÷ 0,80 = 12.500 cigarrillos. Si el precio de mercado del cigarrillo es $50, la multa es 73% × $50 × 12.500 = $456.250',
		],
		relatedArticles: ['ley27742-art-230', 'ley27742-art-229'],
		jurisprudence: [],
		regulations: ['Ley 24.674 — Impuestos Internos', 'AFIP — guías de transporte de tabaco'],
		keywords: ['tabaco contrabando', 'transporte sin documentación', 'multa tabaco', 'mercado negro cigarrillos'],
		order: 233,
		segments: [],
		amendments: [],
	},
];
