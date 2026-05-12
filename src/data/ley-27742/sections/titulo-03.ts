import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_TITULO_03: LawSection = {
	id: 'ley-27742-titulo-03',
	lawId: 'ley-27742',
	number: 'III',
	name: 'Contratos y acuerdos transaccionales',
	articleStart: 63,
	articleEnd: 75,
	titles: [],
};

export const ARTICLES_TITULO_03: Article[] = [
	{
		id: 'ley27742-art-63',
		lawId: 'ley-27742',
		number: '63',
		title: 'Fuerza mayor en contratos del Estado — renegociación y rescisión',
		originalText:
			'Autorícese al Poder Ejecutivo nacional, previa intervención de la Procuración del Tesoro y la SIGEN, a disponer por razones de emergencia —que constituyen causales de fuerza mayor bajo el art. 54 ley 13.064— la renegociación o rescisión de contratos: (i) de obra pública, concesión, o construcción/provisión de bienes y servicios y sus contratos anexos; (ii) cuyos montos superen los 10.000.000 módulos del decreto 1030/2016; y (iii) celebrados con anterioridad al 10 de diciembre de 2023.\n\nSolo puede ejercerse con informe de transparencia y cuando resulte financiera o económicamente más conveniente para el interés público. Excluidos: contratos de privatización (ley 23.696) y contratos de regímenes de promoción de inversiones.',
		currentText:
			'El PEN puede renegociar o rescindir contratos de obra pública y servicios de más de 10 millones de módulos firmados antes del 10/12/2023, invocando emergencia como fuerza mayor. Requiere dictamen previo de la Procuración del Tesoro y la SIGEN, y debe ser más conveniente para el interés público.',
		plainLanguageExplanation:
			'El gobierno heredó centenares de contratos de obra pública firmados por administraciones anteriores, muchos con sobreprecios o condiciones desfavorables. El art. 63° les da una herramienta legal para renegociarlos o cancelarlos sin pagar todas las penalidades de rescisión, porque declara que la situación de emergencia constituye "fuerza mayor" (causa que no es culpa del Estado). La condición: que sea más conveniente económicamente y con controles previos.',
		practicalEffects: [
			'Afecta solo contratos "grandes" (más de 10 millones de módulos, cifra que equivale a decenas de millones de pesos) firmados antes del 10 de diciembre de 2023',
			'Excluye contratos del RIGI y de regímenes de inversión para proteger la seguridad jurídica',
			'El contratista puede reclamar daños por rescisión, pero la declaración de fuerza mayor limita lo que puede cobrar',
		],
		examples: [
			'El gobierno encontró un contrato de construcción de autopistas a un precio que consideró inflado. Invocando el art. 63°, llamó a renegociar las condiciones. El contratista aceptó un precio menor o la obra fue relicitada',
		],
		relatedArticles: ['ley27742-art-64', 'ley27742-art-65'],
		jurisprudence: [],
		regulations: ['Decreto 1030/2016 — reglamento de contrataciones'],
		keywords: ['contratos obra pública', 'fuerza mayor', 'emergencia', 'renegociación', 'rescisión'],
		order: 63,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-64',
		lawId: 'ley-27742',
		number: '64',
		title: 'Contratos con 80% de avance físico — no rescindibles',
		originalText:
			'A los fines del artículo 63, se entenderá que resulta económica y financieramente inconveniente para el interés público la suspensión o rescisión de los contratos de obra pública que se encontraran físicamente ejecutadas en un ochenta por ciento (80%) a la fecha de la sanción de la presente ley; o que cuenten con financiamiento internacional para su concreción. En caso de que dichos contratos se hayan visto suspendidos, su ejecución se reanudará previo acuerdo firmado dentro de noventa (90) días desde la publicación de la presente ley.',
		currentText:
			'No se pueden rescindir obras que ya tenían el 80% de avance físico o financiamiento internacional al momento de la sanción de la ley. Si estaban suspendidas, deben reanudarse en 90 días.',
		plainLanguageExplanation:
			'Protección del sentido común: si una obra ya está al 80% de ejecución, rescindirla sale más caro que terminarla. Y si tiene financiamiento internacional (por ejemplo del Banco Mundial), cancelarla dañaría la relación con el organismo prestamista. El art. 64° impone esta restricción como salvaguarda explícita.',
		practicalEffects: [
			'Hospitales, autopistas y obras hídricas que estaban casi terminadas no podían cancelarse',
			'Los contratos suspendidos por el DNU 70/2023 debían reanudarse en 90 días',
		],
		examples: [],
		relatedArticles: ['ley27742-art-63', 'ley27742-art-65'],
		jurisprudence: [],
		regulations: [],
		keywords: ['obra pública', 'avance físico 80%', 'financiamiento internacional', 'reanudación de obras'],
		order: 64,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-65',
		lawId: 'ley-27742',
		number: '65',
		title: 'Acuerdos transaccionales con contratistas',
		originalText:
			'En toda controversia o reclamo administrativo, judicial y/o arbitral que se suscite entre un contratista y cualquier órgano del Estado nacional fundado en supuestos incumplimientos de obligaciones contractuales estatales, el Poder Ejecutivo nacional estará autorizado para realizar acuerdos transaccionales (art. 1641 y ss. Código Civil y Comercial), siempre que estén debidamente fundados y sean convenientes para el Estado.\n\nRequiere dictámenes favorables previos de la Procuración del Tesoro y de la SIGEN.',
		currentText:
			'El PEN puede llegar a acuerdos extrajudiciales con contratistas que demandaron al Estado por incumplimientos contractuales. Requiere dictamen favorable de la Procuración del Tesoro y la SIGEN. Debe ser conveniente para el Estado.',
		plainLanguageExplanation:
			'El Estado argentino tiene miles de juicios pendientes con contratistas por contratos incumplidos. El art. 65° permite al PEN cerrar esos juicios mediante acuerdos (transacciones) sin necesidad de esperar la sentencia judicial. Es un mecanismo para desactivar pasivos contingentes del Estado, siempre que la Procuración del Tesoro y la SIGEN avalen que el acuerdo es conveniente.',
		practicalEffects: [
			'Permite cerrar litigios que acumulan intereses y pueden multiplicar la deuda del Estado',
			'El doble dictamen (Procuración + SIGEN) es una garantía contra acuerdos ruinosos para el Estado',
			'Los acuerdos deben ser "convenientes": el Estado no puede transar pagando más de lo que le correspondería perder en juicio',
		],
		examples: [],
		relatedArticles: ['ley27742-art-63', 'ley27742-art-64'],
		jurisprudence: [],
		regulations: ['Código Civil y Comercial, arts. 1641 y ss. — Contrato de transacción'],
		keywords: ['acuerdo transaccional', 'contratistas', 'litigios del Estado', 'Procuración del Tesoro', 'SIGEN'],
		order: 65,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-66-75',
		lawId: 'ley-27742',
		number: '66-75',
		title: 'Concesiones de obra e infraestructura pública — modificaciones a ley 17.520',
		originalText: '[Arts. 66-75 reforman la ley 17.520 de Concesiones de Obras Públicas. Art. 74 deroga arts. 8° y 11 de ley 17.520. Art. 75 delega la designación de la autoridad de aplicación al PEN.]',
		currentText:
			'Arts. 66-73: Reforman integralmente la ley 17.520 de Concesiones Públicas. Habilitan las concesiones de obra e infraestructura (rutas, puentes, aeropuertos, etc.) con mayor flexibilidad: el PEN puede otorgar concesiones por plazo fijo o variable, a privados o mixtas; se incorporan las "iniciativas privadas" (un particular puede proponer una obra y tener ventaja competitiva en la licitación); el contrato debe definir todos los aspectos tarifarios, de control y de reversión.\n\nArt. 74: Deroga arts. 8° y 11 de ley 17.520 (eliminando restricciones procedimentales obsoletas).\n\nArt. 75: El PEN designa la autoridad de aplicación de la ley 17.520.',
		plainLanguageExplanation:
			'Argentina necesita renovar infraestructura de rutas, puertos y aeropuertos. Estos artículos modernizan el marco de concesiones: el gobierno puede dar en concesión infraestructura existente o nueva, por períodos variables, y aceptar "iniciativas privadas" (si una empresa quiere proponer una autopista, puede hacerlo y obtener ventaja en la licitación si se declara de interés público). Esto apunta a atraer inversión privada en infraestructura sin endeudamiento estatal.',
		practicalEffects: [
			'Las iniciativas privadas permiten que un privado proponga una autopista de peaje o un aeropuerto nuevo y tenga preferencia en la licitación si el gobierno la acepta',
			'El plazo de concesión puede ser variable: se fija según la ecuación económico-financiera del proyecto, no por ley',
			'Art. 73 específicamente permite renegociar contratos de obra pública paralizados para reincorporar financiamiento privado',
		],
		examples: [
			'Una empresa constructora propone construir el tercer carril de la ruta 2 Buenos Aires-Mar del Plata con peaje. El gobierno declara la iniciativa de interés público. En la posterior licitación, la empresa proponente obtiene un puntaje extra por haber sido el autor de la iniciativa',
		],
		relatedArticles: ['ley27742-art-63', 'ley27742-art-65'],
		jurisprudence: [],
		regulations: ['Ley 17.520 — Concesiones de Obras Públicas'],
		keywords: ['concesión pública', 'ley 17520', 'iniciativa privada', 'infraestructura', 'peaje'],
		order: 66,
		segments: [],
		amendments: [],
	},
];
