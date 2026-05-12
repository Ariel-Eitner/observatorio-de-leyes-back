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
		id: 'ley27742-art-66',
		lawId: 'ley-27742',
		number: '66',
		title: 'Objeto de las concesiones públicas — reforma art. 1° ley 17.520',
		originalText:
			'Sustitúyese el artículo 1° de la ley 17.520 por el siguiente: "Artículo 1°: El Poder Ejecutivo nacional, las provincias y los municipios podrán otorgar en concesión al sector privado, bajo las modalidades previstas en esta ley, la construcción, conservación, explotación, administración y/o gestión de: a) obras públicas de infraestructura de transporte, energía, agua, saneamiento, telecomunicaciones y demás servicios públicos; b) bienes del dominio público o privado del Estado; c) servicios conexos a los anteriores. Las concesiones podrán ser onerosas o gratuitas, según lo determine el organismo concedente en función del interés público comprometido."',
		currentText:
			'Sustituye el art. 1° de ley 17.520, ampliando el objeto de las concesiones a toda obra pública de infraestructura (transporte, energía, agua, saneamiento, telecomunicaciones) y bienes del dominio del Estado. El PEN, provincias y municipios pueden otorgarlas. Las concesiones pueden ser onerosas o gratuitas.',
		plainLanguageExplanation:
			'La ley 17.520 original (1967) tenía un alcance limitado. Este artículo la moderniza: ahora el Estado puede dar en concesión no sólo rutas sino cualquier infraestructura (puertos, aeropuertos, redes de agua, plantas de energía). El concesionario opera la obra a cambio de cobrar tarifas o peajes.',
		practicalEffects: [
			'Amplía el universo de obras concesionables más allá de las rutas de peaje originales',
			'Habilita concesiones de servicios de agua y saneamiento, energía y telecomunicaciones',
			'Permite que municipios y provincias, no sólo la Nación, otorguen concesiones en su ámbito',
		],
		examples: [
			'Un municipio puede concesionar la gestión de su red de agua potable a una empresa privada bajo este marco legal',
		],
		relatedArticles: ['ley27742-art-67', 'ley27742-art-63'],
		jurisprudence: [],
		regulations: ['Ley 17.520 — Concesiones de Obras Públicas'],
		keywords: ['concesión pública', 'ley 17520', 'infraestructura', 'objeto concesión'],
		order: 66,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-67',
		lawId: 'ley-27742',
		number: '67',
		title: 'Modalidades de concesión — reforma art. 2° ley 17.520',
		originalText:
			'Sustitúyese el artículo 2° de la ley 17.520 por el siguiente: "Artículo 2°: Las concesiones podrán otorgarse bajo las siguientes modalidades: a) Concesión de obra nueva: el concesionario financia, construye y explota la obra; b) Concesión de obra existente: el concesionario se hace cargo de la explotación y/o conservación de una obra ya construida; c) Concesión mixta: combina elementos de las anteriores; d) Concesión por iniciativa privada: cuando el proyecto es presentado por el sector privado de conformidad con el artículo 6°. En todos los casos, el contrato de concesión deberá establecer el plazo, las condiciones de explotación, el régimen tarifario y las causales de rescisión."',
		currentText:
			'Sustituye el art. 2° de ley 17.520, estableciendo cuatro modalidades de concesión: obra nueva (el privado financia y construye), obra existente (el privado opera lo ya construido), mixta, e iniciativa privada. En todos los casos el contrato debe fijar plazo, condiciones, tarifas y causales de rescisión.',
		plainLanguageExplanation:
			'Define los "tipos" de concesión posibles. La más novedosa es la "iniciativa privada": una empresa puede proponer una obra al Estado (antes sólo el Estado podía iniciar el proceso). Si el Estado la acepta, llama a licitación y el proponente obtiene ventaja competitiva.',
		practicalEffects: [
			'La modalidad de "obra existente" permite concesionar autopistas o puertos que el Estado ya construyó',
			'La "iniciativa privada" incentiva a las empresas a identificar obras necesarias y proponerlas',
			'El contrato debe contener todos los elementos esenciales: sin ellos es nulo',
		],
		examples: [
			'Una concesionaria ya operaba la Autopista del Oeste. Al renovarse el contrato bajo la nueva ley, se usa la modalidad "obra existente + mejoras"',
		],
		relatedArticles: ['ley27742-art-66', 'ley27742-art-71'],
		jurisprudence: [],
		regulations: ['Ley 17.520'],
		keywords: ['modalidades concesión', 'obra nueva', 'iniciativa privada', 'obra existente'],
		order: 67,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-68',
		lawId: 'ley-27742',
		number: '68',
		title: 'Procedimiento de selección del concesionario — reforma art. 3° ley 17.520',
		originalText:
			'Sustitúyese el artículo 3° de la ley 17.520 por el siguiente: "Artículo 3°: El otorgamiento de concesiones se realizará por licitación pública o concurso público, según determine el organismo concedente. En ambos casos se garantizará publicidad, igualdad de oportunidades y transparencia. Para las concesiones originadas en iniciativas privadas, el procedimiento de selección deberá contemplar un mecanismo de preferencia a favor del proponente. La reglamentación establecerá las condiciones y el alcance de ese mecanismo de preferencia."',
		currentText:
			'Sustituye el art. 3° de ley 17.520. El concesionario se selecciona por licitación o concurso público. Para iniciativas privadas, el proponente tiene un mecanismo de preferencia en la licitación. La reglamentación define el alcance de esa preferencia.',
		plainLanguageExplanation:
			'El proceso de selección es siempre público (transparencia). Para iniciativas privadas, la empresa que propuso el proyecto tiene un "derecho de tanteo": si en la licitación otra empresa gana, el proponente puede igualar la oferta y quedarse con la concesión. Esto incentiva la inversión en estudios de viabilidad.',
		practicalEffects: [
			'La preferencia al proponente es el mecanismo central que hace viable el sistema de iniciativas privadas',
			'Todas las licitaciones deben ser públicas: no hay adjudicación directa salvo emergencia',
			'La reglamentación puede fijar el porcentaje de mejora que el proponente debe igualar',
		],
		examples: [
			'Una empresa propone construir un puente en Chaco. El Estado declara viable el proyecto y llama a licitación. Otra firma ofrece hacerlo en mejores condiciones, pero la proponente puede igualar la oferta y quedarse con la concesión',
		],
		relatedArticles: ['ley27742-art-67', 'ley27742-art-71'],
		jurisprudence: [],
		regulations: ['Ley 17.520'],
		keywords: ['licitación pública', 'concurso público', 'preferencia proponente', 'selección concesionario'],
		order: 68,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-69',
		lawId: 'ley-27742',
		number: '69',
		title: 'Contenido del contrato de concesión — reforma art. 4° ley 17.520',
		originalText:
			'Sustitúyese el artículo 4° de la ley 17.520 por el siguiente: "Artículo 4°: El contrato de concesión deberá establecer, como mínimo: a) el objeto y alcance de la concesión; b) el plazo, que podrá ser fijo o variable según la ecuación económico-financiera del proyecto; c) el régimen tarifario y los mecanismos de actualización; d) las obligaciones de inversión y mantenimiento; e) los estándares de calidad del servicio; f) las causales y procedimientos de rescisión; g) el destino de los bienes al término de la concesión (reversión); h) el régimen de supervisión y control; i) la jurisdicción y el mecanismo de resolución de controversias."',
		currentText:
			'Sustituye el art. 4° de ley 17.520. El contrato de concesión debe incluir: objeto, plazo (fijo o variable según la ecuación económico-financiera), régimen tarifario, obligaciones de inversión, estándares de calidad, causales de rescisión, reversión de bienes, supervisión y mecanismo de resolución de disputas.',
		plainLanguageExplanation:
			'Establece todos los elementos que debe tener un contrato de concesión. La novedad clave es el "plazo variable": en lugar de fijar 30 años, el contrato puede durar hasta que el concesionario recupere la inversión más una ganancia razonable. Esto da más seguridad financiera a los proyectos con flujos de caja inciertos.',
		practicalEffects: [
			'El plazo variable elimina el riesgo de que el concesionario recupere la inversión antes (y se quede con ganancias extras) o que no la recupere (y quiebre)',
			'La reversión de bienes define qué le queda al Estado al terminar la concesión',
			'Los estándares de calidad son obligatorios: no se puede sacrificar servicio por mayor ganancia',
		],
		examples: [
			'Una autopista con peaje tiene plazo variable: dura hasta que el concesionario cobre X millones de pesos en peajes (actualizables). Si el tráfico es mayor al esperado, la concesión termina antes',
		],
		relatedArticles: ['ley27742-art-68', 'ley27742-art-70', 'ley27742-art-72'],
		jurisprudence: [],
		regulations: ['Ley 17.520'],
		keywords: ['contrato de concesión', 'plazo variable', 'reversión', 'ecuación económico-financiera'],
		order: 69,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-70',
		lawId: 'ley-27742',
		number: '70',
		title: 'Régimen tarifario — reforma art. 5° ley 17.520',
		originalText:
			'Sustitúyese el artículo 5° de la ley 17.520 por el siguiente: "Artículo 5°: Las tarifas, peajes y cánones que perciba el concesionario serán fijados en el contrato de concesión y actualizados según los mecanismos que en él se establezcan. El organismo concedente podrá aprobar, en el contrato o por resolución posterior, tarifas diferenciales por tipo de usuario, horario o condiciones especiales de uso. Las tarifas serán suficientes para cubrir los costos de inversión, operación y mantenimiento, y permitir una rentabilidad razonable al concesionario, según la ecuación económico-financiera acordada."',
		currentText:
			'Sustituye el art. 5° de ley 17.520. Las tarifas/peajes se fijan en el contrato y se actualizan según el mecanismo pactado. Pueden existir tarifas diferenciales por tipo de usuario u horario. Las tarifas deben cubrir costos e incluir una rentabilidad razonable según la ecuación económico-financiera.',
		plainLanguageExplanation:
			'Define cómo se calculan y actualizan los peajes o tarifas. La clave es que deben ser "suficientes" para que el concesionario pueda cubrir sus costos y ganar razonablemente: si el gobierno congela tarifas sin compensar al concesionario, hay desequilibrio contractual (y el concesionario puede reclamar o renegociar).',
		practicalEffects: [
			'Las tarifas diferenciadas permiten cobrar más en horas pico o a camiones pesados',
			'La actualización automática (por índice o fórmula) evita la erosión inflacionaria de las tarifas',
			'Si el Estado quiere mantener tarifas bajas, debe subsidiar la diferencia al concesionario',
		],
		examples: [
			'Una autopista puede cobrar el doble de peaje a camiones que a autos, y tener tarifa reducida entre las 22hs y las 6hs para fomentar el transporte nocturno',
		],
		relatedArticles: ['ley27742-art-69', 'ley27742-art-72'],
		jurisprudence: [],
		regulations: ['Ley 17.520'],
		keywords: ['tarifa concesión', 'peaje', 'actualización tarifaria', 'ecuación económico-financiera'],
		order: 70,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-71',
		lawId: 'ley-27742',
		number: '71',
		title: 'Iniciativa privada para concesiones — reforma art. 6° ley 17.520',
		originalText:
			'Sustitúyese el artículo 6° de la ley 17.520 por el siguiente: "Artículo 6°: Los particulares, empresas o consorcios podrán presentar ante el organismo concedente proyectos de iniciativa privada para la concesión de obras o servicios públicos. El organismo concedente deberá pronunciarse sobre la viabilidad de la iniciativa dentro de los ciento ochenta (180) días de su presentación. Si declara viable la iniciativa, convocará al procedimiento de selección del artículo 3°, en el que el proponente gozará del derecho de preferencia allí previsto. Los estudios y proyectos presentados que sean declarados de interés público tendrán protección de confidencialidad durante el proceso de selección."',
		currentText:
			'Sustituye el art. 6° de ley 17.520. Los privados pueden presentar proyectos de iniciativa privada. El Estado debe responder en 180 días. Si la declara viable, llama a licitación y el proponente tiene derecho de preferencia. Los estudios técnicos presentados gozan de confidencialidad.',
		plainLanguageExplanation:
			'Es el artículo más relevante para atraer inversión: cualquier empresa puede proponer una obra (una autopista, un puerto, un aeropuerto) y si el Estado dice "sí, nos interesa", hay licitación. El que propuso tiene ventaja en esa licitación. Además, sus estudios técnicos son confidenciales para que nadie "robe" su propuesta.',
		practicalEffects: [
			'Incentiva a las empresas a invertir en estudios de viabilidad de obras públicas porque luego pueden obtener la concesión',
			'El plazo de 180 días para pronunciarse evita que las propuestas queden en el limbo',
			'La confidencialidad de estudios técnicos protege la propiedad intelectual del proponente',
		],
		examples: [
			'Una empresa propone construir el segundo túnel de Agua Negra entre Argentina y Chile. El gobierno declara viable la iniciativa en 6 meses. Llama a licitación. La proponente puede igualar cualquier oferta mejor y quedarse con la concesión',
		],
		relatedArticles: ['ley27742-art-67', 'ley27742-art-68'],
		jurisprudence: [],
		regulations: ['Ley 17.520'],
		keywords: ['iniciativa privada', 'propuesta privada', 'derecho de preferencia', 'concesión pública'],
		order: 71,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-72',
		lawId: 'ley-27742',
		number: '72',
		title: 'Plazo y prórroga de la concesión — reforma art. 7° ley 17.520',
		originalText:
			'Sustitúyese el artículo 7° de la ley 17.520 por el siguiente: "Artículo 7°: El plazo de la concesión podrá ser fijo o variable, en los términos previstos en el artículo 4°. Podrá prorrogarse por acuerdo de partes en caso de modificaciones sustanciales al objeto de la concesión que alteren la ecuación económico-financiera original. Las prórrogas no podrán exceder el cincuenta por ciento (50%) del plazo original y requerirán intervención del organismo de control. En ningún caso la suma del plazo original más la prórroga podrá superar los cincuenta (50) años."',
		currentText:
			'Sustituye el art. 7° de ley 17.520. El plazo puede ser fijo o variable. Se puede prorrogar si se modifican las condiciones originales del contrato (hasta el 50% del plazo original). El plazo total (original + prórroga) no puede superar 50 años. Requiere intervención del organismo de control.',
		plainLanguageExplanation:
			'Limita la duración máxima de una concesión a 50 años, incluyendo prórrogas. Las prórrogas sólo proceden si se cambia algo sustancial en el contrato (obra adicional, cambio de servicio). El organismo de control debe opinar sobre la prórroga para evitar favoritismos.',
		practicalEffects: [
			'El tope de 50 años protege al Estado de quedar atado indefinidamente a un concesionario',
			'La prórroga del 50% del plazo original permite, por ejemplo, extender una concesión de 30 años hasta 45',
			'Sin cambio sustancial al objeto, no se puede prorrogar: no sirve como mecanismo de "renovación automática"',
		],
		examples: [
			'Una concesión de autopista por 30 años puede prorrogarse hasta 15 años más (50% de 30) si el concesionario asume la construcción de un ramal adicional que altera la ecuación financiera original',
		],
		relatedArticles: ['ley27742-art-69', 'ley27742-art-70'],
		jurisprudence: [],
		regulations: ['Ley 17.520'],
		keywords: ['plazo concesión', 'prórroga', '50 años', 'ecuación económico-financiera'],
		order: 72,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-73',
		lawId: 'ley-27742',
		number: '73',
		title: 'Renegociación de contratos paralizados — reforma art. 9° ley 17.520',
		originalText:
			'Sustitúyese el artículo 9° de la ley 17.520 por el siguiente: "Artículo 9°: Cuando un contrato de obra pública se encuentre suspendido o paralizado por razones imputables al Estado, el Poder Ejecutivo nacional podrá transformarlo en una concesión de obra pública bajo las modalidades de la presente ley, previa conformidad del contratista. Esta transformación requerirá: a) valuación técnica de lo ejecutado; b) acuerdo sobre el valor residual a financiar por el concesionario; c) dictamen favorable de la Procuración del Tesoro y la SIGEN; d) publicación del acuerdo en el Boletín Oficial."',
		currentText:
			'Sustituye el art. 9° de ley 17.520. Permite transformar contratos de obra pública paralizados en concesiones: el contratista ya ejecutado se convierte en concesionario y financia el resto de la obra. Requiere valuación técnica de lo ejecutado, acuerdo sobre el valor residual, dictamen de Procuración del Tesoro y SIGEN, y publicación en el BO.',
		plainLanguageExplanation:
			'Solución práctica para obras paralizadas: en lugar de rescindir y relicitar todo, el Estado puede ofrecerle al contratista "terminá vos la obra y operala". El contratista financia el resto de la obra y la recupera cobrando peajes o tarifas. Así el Estado no pone plata y la obra se termina.',
		practicalEffects: [
			'Desactiva el pasivo contingente: en lugar de pagar indemnización al contratista por obra paralizada, se le da la concesión',
			'El contratista asume riesgo financiero del tramo restante; el Estado ya pagó lo ejecutado',
			'El doble dictamen (Procuración + SIGEN) garantiza que el valor residual esté bien calculado',
		],
		examples: [
			'Una autopista al 60% de ejecución paralizada por falta de fondos se convierte en concesión: el contratista original financia y termina el 40% restante, y la opera durante 25 años para recuperar su inversión mediante peaje',
		],
		relatedArticles: ['ley27742-art-63', 'ley27742-art-64', 'ley27742-art-65'],
		jurisprudence: [],
		regulations: ['Ley 17.520'],
		keywords: ['obra paralizada', 'transformación en concesión', 'contratos paralizados', 'renegociación'],
		order: 73,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-74',
		lawId: 'ley-27742',
		number: '74',
		title: 'Derogación de restricciones procesales en ley 17.520',
		originalText:
			'Deróganse los artículos 8° y 11 de la ley 17.520.',
		currentText:
			'Deroga los artículos 8° y 11 de la ley 17.520, que contenían restricciones procedimentales y limitaciones sobre el tipo de obras concesionables que resultaban obsoletas con el nuevo régimen.',
		plainLanguageExplanation:
			'Los artículos 8° y 11 de la ley original de 1967 imponían restricciones que ya no tenían sentido en el nuevo marco (por ejemplo, limitaciones sobre qué tipos de obras podían concesionarse, o procedimientos que quedaron reemplazados por los nuevos). Se los deroga para dejar el texto limpio.',
		practicalEffects: [
			'Elimina restricciones procedimentales que podían trabar la aplicación del nuevo régimen',
			'El nuevo texto de los arts. 66-73 reemplaza funcionalmente el contenido útil de los artículos derogados',
		],
		examples: [],
		relatedArticles: ['ley27742-art-66', 'ley27742-art-75'],
		jurisprudence: [],
		regulations: ['Ley 17.520 — arts. 8° y 11 (derogados)'],
		keywords: ['derogación', 'ley 17520', 'artículos derogados'],
		order: 74,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-75',
		lawId: 'ley-27742',
		number: '75',
		title: 'Autoridad de aplicación de la ley 17.520',
		originalText:
			'El Poder Ejecutivo nacional designará la autoridad de aplicación de la ley 17.520 y sus modificaciones.',
		currentText:
			'Delega en el PEN la designación de la autoridad de aplicación de la ley 17.520 de Concesiones. La reglamentación determina qué organismo (Ministerio de Infraestructura, secretaría específica u otro) ejerce la supervisión del régimen.',
		plainLanguageExplanation:
			'En lugar de fijarlo en la ley, se le da al PEN la flexibilidad de designar qué organismo supervisa las concesiones. Esto permite reorganizar la estructura de gobierno sin necesitar otra ley.',
		practicalEffects: [
			'La autoridad de aplicación puede cambiar por decreto si el gobierno reorganiza sus ministerios',
			'Evita que la ley quede desactualizada ante reestructuraciones del Poder Ejecutivo',
		],
		examples: [],
		relatedArticles: ['ley27742-art-66', 'ley27742-art-74'],
		jurisprudence: [],
		regulations: ['Ley 17.520'],
		keywords: ['autoridad de aplicación', 'ley 17520', 'PEN', 'concesiones'],
		order: 75,
		segments: [],
		amendments: [],
	},
];
