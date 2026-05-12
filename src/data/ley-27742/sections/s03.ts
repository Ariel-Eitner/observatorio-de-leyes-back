import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_03: LawSection = {
	id: 'ley-27742-s03',
	lawId: 'ley-27742',
	number: 'III',
	name: 'Requisitos y condiciones para la inclusión en el RIGI',
	articleStart: 172,
	articleEnd: 182,
	titles: [],
};

export const ARTICLES_03: Article[] = [
	{
		id: 'rigi-art-172',
		lawId: 'ley-27742',
		number: '172',
		title: 'Definición de "Grandes Inversiones"',
		originalText:
			'A los efectos del presente, serán considerados "Grandes Inversiones" los proyectos que involucren la adquisición, producción, construcción y/o desarrollo de activos que serán afectados a actividades que cumplan con las siguientes condiciones:\na) Involucrar un monto de inversión por proyecto en activos computables igual o superior al monto mínimo de inversión previsto en el primer párrafo del artículo 173;\nb) Prever para el primer y segundo año, contado desde la fecha de aprobación del plan de inversión y de la solicitud de adhesión, el cumplimiento de una inversión mínima en activos computables igual o superior a la prevista en el segundo párrafo del artículo 173.\n\nAsimismo, para contar con las garantías del presente régimen, las inversiones deberán tener un carácter de largo plazo: serán consideradas de largo plazo en tanto tengan un cociente no mayor al treinta y cinco por ciento (35%) entre el valor presente del flujo neto de caja esperado durante los primeros tres años y el valor presente neto de las inversiones de capital planeadas durante ese mismo período.\n\nLos proyectos que puedan resultar en el posicionamiento de la Argentina como nuevo proveedor de largo plazo en mercados globales, con inversiones mínimas por etapa de USD 1.000 millones, podrán ser calificados como de Exportación Estratégica de Largo Plazo.',
		currentText:
			'A los efectos del presente, serán considerados "Grandes Inversiones" los proyectos que involucren la adquisición, producción, construcción y/o desarrollo de activos que serán afectados a actividades que cumplan con las siguientes condiciones:\na) Monto de inversión en activos computables igual o superior al mínimo del art. 173 (USD 200M base);\nb) Inversión mínima del 40% del monto total durante los primeros 2 años.\n\nLas inversiones deben ser de "largo plazo": el cociente entre el VP del flujo de caja de los primeros 3 años y el VP de las inversiones no puede superar el 35% (según Resolución 484/2026).\n\nLos proyectos con inversiones mínimas por etapa de USD 1.000 millones que posicionen a Argentina como nuevo exportador estratégico pueden calificarse como "Exportación Estratégica de Largo Plazo" con beneficios ampliados.',
		plainLanguageExplanation:
			'Para ser "Gran Inversión" RIGI, el proyecto debe superar el mínimo de USD 200M en activos, comprometerse a invertir 40% de ese mínimo en los primeros 2 años, y ser de "largo plazo" (que no recupere inversión rápido). Los proyectos que superen USD 1.000M por etapa y abran nuevos mercados exportadores tienen la categoría especial de Exportación Estratégica con beneficios adicionales (menores plazos cambiarios, más exenciones).',
		practicalEffects: [
			'El criterio de "largo plazo" impide el acceso de proyectos con recupero rápido (especulativos)',
			'La categoría "Exportación Estratégica" habilita plazos cambiarios un año más cortos y exenciones adicionales de ganancias',
			'La Resolución 484/2026 elevó el umbral de largo plazo del 30% al 35%, ampliando el universo de proyectos calificables',
		],
		examples: [
			'Un proyecto de litio con inversión de USD 500M que tardará 5 años en recuperar la inversión califica como "largo plazo"',
		],
		relatedArticles: ['rigi-art-173', 'rigi-art-174', 'rigi-art-201'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024 — art. 3°; Resolución 484/2026 MEC'],
		keywords: ['grandes inversiones', 'largo plazo', 'exportación estratégica', 'monto mínimo', 'RIGI'],
		order: 172,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-173',
		lawId: 'ley-27742',
		number: '173',
		title: 'Montos mínimos de inversión',
		originalText:
			'A efectos de lo previsto en el inciso a) del artículo 172, el monto mínimo de inversión en activos computables será de al menos doscientos millones de dólares estadounidenses (USD 200.000.000). El Poder Ejecutivo nacional podrá establecer diferentes montos mínimos de inversión en activos computables por sector o subsector productivo o por etapa productiva, iguales o mayores a doscientos millones de dólares estadounidenses (USD 200.000.000). En ningún caso ese monto mínimo que establezca el Poder Ejecutivo nacional podrá superar el importe de novecientos millones de dólares estadounidenses (USD 900.000.000).\n\nA efectos de lo previsto en el inciso b) del artículo 172, el Poder Ejecutivo nacional establecerá el porcentaje del monto mínimo que deberá completarse durante el primer y segundo año contados desde la notificación del acto administrativo de aprobación. Dicho porcentaje no podrá ser inferior al cuarenta por ciento (40%) del monto mínimo como condición de permanencia.\n\nExcepcionalmente, el Poder Ejecutivo nacional podrá reducir el referido porcentaje hasta no menos del veinte por ciento (20%) del monto mínimo.',
		currentText:
			'El monto mínimo de inversión base es USD 200.000.000. El Poder Ejecutivo puede fijar montos distintos por sector (siempre entre USD 200M y USD 900M). En los primeros 2 años desde la aprobación, el VPU debe haber invertido al menos el 40% del mínimo (puede reducirse excepcionalmente hasta el 20% del mínimo).',
		plainLanguageExplanation:
			'El umbral de entrada al RIGI es USD 200 millones en activos del proyecto. El Ejecutivo puede subir ese umbral por sector (hasta USD 900M), por ejemplo para que sólo proyectos muy grandes de GNL puedan adherir. Además, en los primeros 2 años hay que invertir al menos el 40% del total comprometido, como garantía de que el proyecto avanza.',
		practicalEffects: [
			'El piso de USD 200M excluye a la inmensa mayoría de empresas argentinas; el RIGI está diseñado para mega-proyectos',
			'Un proyecto que no cumple el 40% en 2 años puede perder el régimen',
			'El Ejecutivo puede segmentar por sector: exigir más a la minería metalífera que al turismo, por ejemplo',
		],
		examples: [
			'Un proyecto de parque eólico de USD 200M en Patagonia puede adherir al RIGI con el monto mínimo base',
		],
		relatedArticles: ['rigi-art-172', 'rigi-art-174', 'rigi-art-181'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024 — porcentajes por sector'],
		keywords: ['monto mínimo', 'USD 200 millones', 'activos computables', 'cronograma de inversión'],
		order: 173,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-174',
		lawId: 'ley-27742',
		number: '174',
		title: 'Activos computables',
		originalText:
			'A los efectos de lo previsto en los artículos 172 y 173, se considerarán inversiones en activos computables todas aquellas que se realicen a partir de la entrada en vigencia del RIGI y estén destinadas a la adquisición, producción, construcción y/o desarrollo de activos afectados a actividades incluidas en el RIGI, para el desarrollo de un proyecto de titularidad de un VPU adherido, excluidos los activos financieros y/o de portafolio y los bienes de cambio.\n\nLa adquisición de cuotas, acciones y/o participaciones societarias podrán considerarse como activos computables en tanto se cumplan ciertas condiciones y la sociedad adquirida se fusione con el VPU dentro de un plazo de ciento ochenta (180) días corridos.\n\nA los efectos del cumplimiento del monto de inversión mínima, las inversiones en la adquisición o asignación de los siguientes activos sólo podrán computarse en forma conjunta hasta un máximo del quince por ciento (15%) del monto mínimo: adquisición de acciones/cuotas, bienes inmuebles, derechos de usufructo sobre inmuebles y concesiones de explotación minera, de petróleo y gas.',
		currentText:
			'Son activos computables para el RIGI: los activos físicos destinados al proyecto (maquinaria, construcción, infraestructura), realizados desde la vigencia del RIGI. No son computables: activos financieros, carteras de inversión y bienes de cambio.\n\nLa compra de acciones/cuotas computa sólo si la empresa adquirida se fusiona con el VPU en 180 días. Los bienes inmuebles, concesiones y compra de acciones no pueden superar el 15% del monto mínimo en conjunto.',
		plainLanguageExplanation:
			'Define qué se puede contar para llegar al umbral de USD 200M. Son computables: plantas, equipos, obras civiles y similares. No son computables acciones de bolsa, inventarios ni activos financieros. Los terrenos e inmuebles y las concesiones mineras cuentan sólo hasta el 15% del total: la inversión debe ser "real" y productiva.',
		practicalEffects: [
			'La regla del 15% para inmuebles impide que un proyecto infle su inversión comprando terrenos caros',
			'La fusión en 180 días obliga a consolidar rápido si se compran acciones como parte del plan',
			'Bienes importados con franquicia aduanera del art. 190 también cuentan como activos computables',
		],
		examples: [
			'La compra de turbinas eólicas es activo computable; la compra de bonos del Tesoro con fondos del proyecto no lo es',
		],
		relatedArticles: ['rigi-art-172', 'rigi-art-173', 'rigi-art-190'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024'],
		keywords: ['activos computables', 'inversión computable', 'inmuebles', 'bienes de capital', 'monto mínimo RIGI'],
		order: 174,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-175',
		lawId: 'ley-27742',
		number: '175',
		title: 'Condiciones para adherir',
		originalText:
			'A efectos de adherir al RIGI y adquirir los derechos y beneficios que se establecen en dicho régimen, los VPU deberán:\na) Presentar la solicitud de adhesión y un plan de inversión en los términos y condiciones previstos en el artículo 176; y\nb) Obtener la aprobación por parte de la autoridad de aplicación de la solicitud de adhesión y del plan de inversión presentado.',
		currentText:
			'Para adherir al RIGI, el VPU debe: a) presentar solicitud de adhesión y plan de inversión (art. 176); b) obtener la aprobación de la Autoridad de Aplicación.',
		plainLanguageExplanation:
			'El proceso de adhesión tiene dos pasos: primero se presenta la solicitud con el plan de inversión detallado; luego la Autoridad de Aplicación (Secretaría de Industria y Desarrollo Productivo) la aprueba. Los beneficios sólo corren desde la aprobación formal.',
		practicalEffects: [
			'La adhesión no es automática: requiere aprobación administrativa discrecional',
			'Desde la presentación el VPU queda protegido en cuanto a la fecha para computar inversiones previas',
			'La Autoridad de Aplicación tiene plazo legal para resolver (art. 177)',
		],
		examples: [],
		relatedArticles: ['rigi-art-176', 'rigi-art-177', 'rigi-art-178'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024'],
		keywords: ['adhesión RIGI', 'plan de inversión', 'solicitud', 'aprobación administrativa'],
		order: 175,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-176',
		lawId: 'ley-27742',
		number: '176',
		title: 'Contenido del plan de inversión',
		originalText:
			'La solicitud de adhesión y el plan de inversión deberán contener como mínimo:\na) Descripción del proyecto, ubicación y sector;\nb) Datos societarios del VPU;\nc) Constitución de domicilio y designación de representante;\nd) Monto total de inversión en activos computables con rubros detallados;\ne) Rubros principales de inversión con costos discriminados;\nf) Cronograma estimado de inversión;\ng) Monto a invertir en el primer y segundo año;\nh) Declaración jurada de no distorsión del mercado local;\ni) Fecha límite para alcanzar el monto mínimo;\nj) Fuente de financiamiento;\nk) Empleo directo e indirecto estimado;\nl) Plan de desarrollo de proveedores locales con compromiso mínimo del 20% de la inversión en proveedores;\nm) Estimado de producción y exportaciones;\nn) Balance comercial y de divisas proyectado;\no) Declaración de factibilidad técnica, económica y financiera;\np) Descripción de permisos y habilitaciones obtenidos y pendientes.',
		currentText:
			'La solicitud de adhesión y el plan de inversión deberán contener como mínimo:\na) Descripción del proyecto, ubicación y sector;\nb) Datos societarios del VPU;\nc) Domicilio y representante;\nd) Monto total de inversión detallado;\ne) Cronograma estimado;\nf) Inversión comprometida para los primeros 2 años;\ng) Declaración jurada de no distorsión del mercado;\nh) Fecha límite para completar el monto mínimo;\ni) Fuente de financiamiento;\nj) Empleo estimado;\nk) Plan de proveedores locales con compromiso mínimo del 20%;\nl) Estimado de producción y exportaciones;\nm) Declaración de factibilidad;\nn) Permisos obtenidos y pendientes.',
		plainLanguageExplanation:
			'El plan de inversión es el documento central de la adhesión al RIGI. Debe detallar qué se va a hacer, cuánto va a costar, cuándo, cómo se va a financiar, cuánto empleo va a generar y qué parte se va a contratar con proveedores locales (mínimo 20%). Es un compromiso jurídicamente vinculante.',
		practicalEffects: [
			'El 20% mínimo de proveedores locales es obligatorio "siempre que la oferta local esté disponible en condiciones de mercado"',
			'Los permisos ambientales pendientes deben detallarse; la falta de permisos puede ser causal de rechazo',
			'El plan es auditado durante toda la vida del proyecto (art. 179)',
		],
		examples: [
			'Una empresa que adhiere al RIGI para un proyecto minero debe detallar qué servicios contratará con empresas locales (explosivos, transporte, catering), comprometiéndose al menos al 20% del total destinado a proveedores',
		],
		relatedArticles: ['rigi-art-175', 'rigi-art-177', 'rigi-art-179'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024 — art. 9° (contenidos adicionales)'],
		keywords: ['plan de inversión', 'proveedores locales', '20%', 'solicitud de adhesión', 'cronograma'],
		order: 176,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-177',
		lawId: 'ley-27742',
		number: '177',
		title: 'Procedimiento de aprobación',
		originalText:
			'Desde la presentación de la solicitud de adhesión y el plan de inversión, la autoridad de aplicación dispone de un plazo de cuarenta y cinco (45) días hábiles para aprobarlos o requerir información adicional. Vencido ese plazo sin resolución, opera el silencio administrativo con aprobación ficta. La autoridad podrá solicitar una única vez información adicional, con suspensión del plazo. La aprobación o rechazo debe ser mediante acto administrativo motivado.\n\nLa autoridad de aplicación puede aprobar parcialmente, modificar condiciones o rechazar el plan. En caso de aprobación parcial o modificación, el VPU puede aceptar o retirar la solicitud.',
		currentText:
			'La Autoridad de Aplicación tiene 45 días hábiles para aprobar, pedir información adicional o rechazar la solicitud. Si no responde en ese plazo, opera la aprobación ficta por silencio administrativo. La Autoridad puede solicitar información adicional una sola vez (con suspensión del plazo). La resolución debe ser fundada.',
		plainLanguageExplanation:
			'El Estado tiene 45 días hábiles (aprox. 2 meses) para responder. Si no lo hace, el silencio vale como aprobación. Esto es una garantía importante: el inversor no puede quedar en el limbo esperando indefinidamente. Si la autoridad pide más información, el plazo se suspende durante esa espera.',
		practicalEffects: [
			'La aprobación ficta por silencio es una garantía inusual en la administración argentina, diseñada para dar certidumbre al inversor',
			'La Autoridad puede aprobar con condiciones; si el VPU no acepta, retira la solicitud',
			'Desde la presentación corre el cómputo de inversiones previas como parte del plan',
		],
		examples: [
			'Un VPU presenta su solicitud el 1 de marzo. La Autoridad no responde hasta el 30 de mayo (más de 45 días hábiles). La adhesión quedó aprobada fictamente por silencio administrativo el primer día hábil posterior al vencimiento, sin necesidad de resolución expresa',
		],
		relatedArticles: ['rigi-art-175', 'rigi-art-176', 'rigi-art-178'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024'],
		keywords: ['aprobación RIGI', 'silencio administrativo', 'plazo 45 días', 'acto administrativo'],
		order: 177,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-178',
		lawId: 'ley-27742',
		number: '178',
		title: 'Efectos de la adhesión',
		originalText:
			'La adhesión al RIGI implicará para el VPU: el compromiso de cumplir con el plan de inversión aprobado; la sujeción a todos los derechos y obligaciones del presente título; la aceptación de las competencias de la autoridad de aplicación; la aceptación del régimen arbitral para controversias; y el reconocimiento de que el incumplimiento del plan de inversión puede dar lugar a las sanciones previstas en el Capítulo VIII.',
		currentText:
			'La adhesión al RIGI implica para el VPU: compromiso vinculante de cumplir el plan de inversión; sujeción a todos los derechos y obligaciones del régimen; aceptación de las competencias de la autoridad de aplicación; aceptación del régimen arbitral; y reconocimiento de que el incumplimiento puede generar sanciones.',
		plainLanguageExplanation:
			'Una vez aprobada la adhesión, el VPU queda atado: debe cumplir el plan de inversión, acepta la fiscalización de la Autoridad de Aplicación, y si incumple puede ser sancionado o perder el régimen. A cambio, tiene todas las garantías y beneficios del RIGI por 30 años.',
		practicalEffects: [
			'La adhesión genera obligaciones vinculantes, no sólo derechos: incumplir el cronograma puede costar la adhesión',
			'El VPU acepta el arbitraje internacional como mecanismo de resolución de disputas con el Estado',
		],
		examples: [],
		relatedArticles: ['rigi-art-177', 'rigi-art-179', 'rigi-art-181', 'rigi-art-211'],
		jurisprudence: [],
		regulations: [],
		keywords: ['efectos adhesión', 'obligaciones VPU', 'compromisos RIGI'],
		order: 178,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-179',
		lawId: 'ley-27742',
		number: '179',
		title: 'Seguimiento y control',
		originalText:
			'La autoridad de aplicación deberá hacer seguimiento y controlar: a) que los activos del VPU estén exclusivamente afectados al proyecto; b) que se cumpla el plan de desarrollo de proveedores locales; c) que se respeten los cronogramas de inversión; d) que la información declarada sea verdadera; e) que se cumplan las condiciones ambientales y de seguridad establecidas.',
		currentText:
			'La Autoridad de Aplicación controla: que los activos del VPU estén exclusivamente afectados al proyecto; que se cumpla el plan de proveedores locales; que se respeten los cronogramas de inversión; que la información sea veraz; y que se cumplan las condiciones ambientales y de seguridad.',
		plainLanguageExplanation:
			'La Autoridad de Aplicación tiene función de auditoría continua sobre los proyectos adheridos. Controla que el VPU use sus activos sólo para el proyecto (no para otros negocios), que pague a proveedores locales según lo comprometido, y que avance según el cronograma. El incumplimiento activa el régimen sancionatorio.',
		practicalEffects: [
			'La obligación de afectación exclusiva de activos es permanente durante la vida del proyecto',
			'El control de proveedores locales incluye certificaciones anuales',
			'La Autoridad puede inspeccionar, pedir documentación y verificar in situ',
		],
		examples: [],
		relatedArticles: ['rigi-art-178', 'rigi-art-181', 'rigi-art-211'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024'],
		keywords: ['fiscalización RIGI', 'seguimiento', 'proveedores locales', 'control', 'auditoría'],
		order: 179,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-180',
		lawId: 'ley-27742',
		number: '180',
		title: 'Cesión de derechos del proyecto',
		originalText:
			'Con las limitaciones que surgen del último párrafo del artículo 209, el VPU podrá ceder, transferir, fusionar o escindir el Proyecto Único, o sus activos, a otro VPU, siempre que el cesionario asuma todas las obligaciones previstas en el presente Título y el acto respectivo se haya comunicado a la Autoridad de Aplicación dentro de los treinta (30) días corridos de producido.',
		currentText:
			'El VPU puede ceder, transferir, fusionar o escindir el proyecto a otro VPU, siempre que el cesionario asuma todas las obligaciones del RIGI y se notifique a la Autoridad de Aplicación dentro de los 30 días corridos.',
		plainLanguageExplanation:
			'Un VPU puede vender o transferir su proyecto a otro VPU. El comprador hereda todos los beneficios pero también todas las obligaciones: debe cumplir el cronograma restante y el plan de proveedores. La notificación a la Autoridad de Aplicación es obligatoria en 30 días.',
		practicalEffects: [
			'Permite que proyectos RIGI sean comercializados (vendidos) entre inversores',
			'El comprador no puede "resetear" el cronograma de inversión: lo hereda en el estado en que está',
			'Importante para financiamiento: permite vender el proyecto a fondos de infraestructura una vez aprobado',
		],
		examples: [
			'Un fondo de infraestructura que participó en la fase de construcción de una planta de GNL puede vender su participación al 40% en el VPU a otro fondo de inversión. El comprador hereda el cronograma de inversión en el estado en que está y todas las obligaciones del plan aprobado',
		],
		relatedArticles: ['rigi-art-178', 'rigi-art-209'],
		jurisprudence: [],
		regulations: [],
		keywords: ['cesión RIGI', 'transferencia proyecto', 'VPU cesionario'],
		order: 180,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-181',
		lawId: 'ley-27742',
		number: '181',
		title: 'Condición de permanencia',
		originalText:
			'Como condición de la permanencia en el RIGI, el VPU deberá: mantener el objeto único; mantener los activos afectados exclusivamente al proyecto; cumplir los cronogramas de inversión aprobados; presentar informes periódicos ante la Autoridad de Aplicación con la documentación respaldatoria que ésta requiera; cumplir con el plan de proveedores locales; y mantener al día sus obligaciones fiscales, aduaneras y previsionales.',
		currentText:
			'Para permanecer en el RIGI, el VPU debe: mantener el objeto único; afectar activos exclusivamente al proyecto; cumplir cronogramas; presentar informes periódicos; cumplir el plan de proveedores locales; y mantener al día sus obligaciones fiscales, aduaneras y previsionales.',
		plainLanguageExplanation:
			'Permanecer en el RIGI requiere cumplimiento continuo: no sólo adherirse, sino mantener durante toda la vida del proyecto el objeto único, los cronogramas, los proveedores locales y las obligaciones tributarias. El incumplimiento de cualquier condición puede significar la pérdida del régimen.',
		practicalEffects: [
			'Los informes periódicos son el mecanismo de auditoría continua',
			'Una deuda impositiva sobrevenida puede comprometer la permanencia en el RIGI',
			'Modificaciones al plan de inversión deben aprobarse por la Autoridad de Aplicación',
		],
		examples: [],
		relatedArticles: ['rigi-art-178', 'rigi-art-179', 'rigi-art-211'],
		jurisprudence: [],
		regulations: [],
		keywords: ['permanencia RIGI', 'condiciones VPU', 'cronograma', 'informes'],
		order: 181,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-182',
		lawId: 'ley-27742',
		number: '182',
		title: 'Garantías de cumplimiento',
		originalText:
			'La reglamentación establecerá las clases de garantías de cumplimiento que los VPU deberán constituir para asegurar el cumplimiento de las obligaciones del presente Título, el monto de las mismas, los plazos de constitución, los supuestos de ejecución y los de liberación.',
		currentText:
			'La reglamentación establecerá las clases de garantías de cumplimiento que los VPU deberán constituir para asegurar el cumplimiento de las obligaciones del RIGI: monto, plazos de constitución, supuestos de ejecución y de liberación.',
		plainLanguageExplanation:
			'Los VPU deben constituir garantías (fianzas, seguros, avales bancarios o similares) que el Estado puede ejecutar si el inversor incumple sus compromisos. El monto y tipo de garantía lo fija la reglamentación (Decreto 749/2024). Esto protege al Estado y al sistema de promesas incumplidas.',
		practicalEffects: [
			'El inversor debe inmovilizar fondos o contratar seguros desde el inicio',
			'Si incumple el cronograma, el Estado puede ejecutar la garantía',
			'La garantía se libera progresivamente a medida que se acredita el cumplimiento del plan',
		],
		examples: [
			'Si el cronograma exige invertir USD 80M en el primer año y el VPU no lo hace, el Estado puede ejecutar la fianza bancaria constituida al momento de la adhesión. El banco garante paga el importe correspondiente sin que el VPU pueda impedirlo',
		],
		relatedArticles: ['rigi-art-181', 'rigi-art-211', 'rigi-art-213'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024 — Capítulo IX (garantías)'],
		keywords: ['garantías RIGI', 'cumplimiento plan de inversión', 'fianza', 'ejecución'],
		order: 182,
		segments: [],
		amendments: [],
	},
];
