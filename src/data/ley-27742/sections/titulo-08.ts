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
		id: 'ley27742-art-229-233',
		lawId: 'ley-27742',
		number: '229-233',
		title: 'Impuesto Interno al tabaco — modificaciones a ley 24.674',
		originalText: '[Arts. 229-233 modifican la Ley de Impuestos Internos (texto sustituido por ley 24.674) en materia de tabaco: art. 229 incorpora artículo sin número sobre precio de venta al consumidor; art. 230 fija el gravamen sobre cigarrillos en 73%; art. 231 establece actualización trimestral por IPC del monto mínimo; art. 232 actualiza el art. 18; art. 233 regula el transporte de tabaco fuera de establecimientos habilitados.]',
		currentText:
			'Arts. 229-233 reforman el impuesto interno al tabaco:\n\n- Art. 229: Si el precio de venta al consumidor declarado por el fabricante es más de un 20% inferior al precio de mercado relevado por la AFIP, la AFIP puede usar el precio de mercado como base imponible.\n\n- Art. 230: Fija el gravamen sobre cigarrillos en el 73% del precio de venta al consumidor (incluyendo impuestos, excepto IVA).\n\n- Art. 231: El monto mínimo del impuesto se actualiza trimestralmente por IPC desde enero 2018. El PEN puede aumentarlo hasta 25% o reducirlo hasta 10% por razones fiscales.\n\n- Art. 232: Actualiza la referencia del art. 18 de la ley (cigarretes negros/rubios) a la fórmula de actualización del art. 231.\n\n- Art. 233: El transporte de tabaco sin respaldo documental fuera de establecimientos habilitados se sanciona con multa equivalente a la alícuota del art. 230 sobre el precio de mercado, calculada proporcionalmente a la cantidad de gramos transportados (0,80 gramos por cigarrillo equivalente).',
		plainLanguageExplanation:
			'El Título VIII introduce medidas fiscales acotadas al tabaco. El cambio central es que el Estado refuerza su capacidad de cobrar el impuesto del 73% sobre el precio real de mercado, no sobre el precio que declara el fabricante. Era una brecha de evasión: si el fabricante declaraba un precio de venta bajo, pagaba menos impuesto. Ahora si ese precio está más de 20% por debajo del precio real de mercado, la AFIP puede imponer el precio real como base.',
		practicalEffects: [
			'Cierra una brecha de evasión en el mercado tabacalero: los fabricantes no pueden subvaluar el precio de venta para reducir el impuesto',
			'La alícuota del 73% es una de las más altas de América Latina: ya estaba vigente, solo se confirma y refuerza el mecanismo de control',
			'La actualización trimestral por IPC del monto mínimo mantiene la recaudación en términos reales ante la inflación',
		],
		examples: [
			'Una tabacalera declara que sus cigarrillos se venden a $500 el paquete. La AFIP releva que en kioscos se venden a $650. Como $500 es más de un 20% inferior a $650, la AFIP usa $650 como base imponible: el impuesto es 73% de $650 = $474,50 por paquete, no 73% de $500 = $365',
		],
		relatedArticles: ['ley27742-art-234'],
		jurisprudence: [],
		regulations: ['Ley 24.674 — Impuestos Internos', 'AFIP — reglamentación del art. 229'],
		keywords: ['impuesto interno tabaco', 'cigarrillos', 'alícuota 73%', 'ley 24674', 'precio de venta', 'AFIP'],
		order: 229,
		segments: [],
		amendments: [],
	},
];
