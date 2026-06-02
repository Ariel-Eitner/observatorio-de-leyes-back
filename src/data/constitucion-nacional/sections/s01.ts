import type { Article } from '../../../common/types/law.types';

export const ARTICLES_CN_01: Article[] = [
	{
		id: 'cn-preambulo',
		lawId: 'constitucion-nacional',
		number: 'Preámbulo',
		title: 'Preámbulo',
		text:
			'Nos los representantes del pueblo de la Nación Argentina, reunidos en Congreso General Constituyente por voluntad y elección de las provincias que la componen, en cumplimiento de pactos preexistentes, con el objeto de constituir la unión nacional, afianzar la justicia, consolidar la paz interior, proveer a la defensa común, promover el bienestar general, y asegurar los beneficios de la libertad, para nosotros, para nuestra posteridad, y para todos los hombres del mundo que quieran habitar en el suelo argentino: invocando la protección de Dios, fuente de toda razón y justicia: ordenamos, decretamos y establecemos esta Constitución, para la Nación Argentina.',		plainLanguageExplanation:
			'El Preámbulo es la introducción de la Constitución. Explica quiénes la hicieron (representantes del pueblo), por qué la hicieron (unión, justicia, paz, libertad) y para quiénes rige (todos los que habiten el suelo argentino, sin importar la nacionalidad). No genera derechos aplicables directamente, pero los jueces lo usan para interpretar el resto del texto.',
		practicalEffects: [
			'Guía la interpretación de toda la Constitución',
			'Declara los fines del Estado argentino',
			'Afirma que Argentina es abierta a personas de todo el mundo',
		],
		examples: [
			'Los jueces usan el Preámbulo para resolver casos donde un artículo no es claro, buscando la solución que mejor "afianza la justicia" o "promueve el bienestar general".',
		],
		relatedArticles: ['cn-art-1', 'cn-art-14', 'cn-art-20'],
		jurisprudence: [],
		regulations: [],
		keywords: ['preámbulo', 'fines del estado', 'unión nacional', 'justicia', 'libertad', 'posteridad'],
		order: 0,
		segments: [],
		amendments: [],
	},
	{
		id: 'cn-art-1',
		lawId: 'constitucion-nacional',
		number: '1',
		title: 'Forma de gobierno',
		text:
			'La Nación Argentina adopta para su gobierno la forma representativa republicana federal, según la establece la presente Constitución.',		plainLanguageExplanation:
			'Argentina tiene tres características de gobierno: (1) Representativa: el pueblo no gobierna directamente sino a través de representantes elegidos. (2) Republicana: hay división de poderes, mandatos temporales, transparencia y responsabilidad de los funcionarios. (3) Federal: el poder se divide entre el gobierno nacional y los 23 estados provinciales, cada uno con autonomía.',
		practicalEffects: [
			'Los ciudadanos eligen a sus representantes en elecciones periódicas',
			'Ningún poder puede actuar fuera de sus competencias constitucionales',
			'Las provincias se gobiernan a sí mismas con sus propias constituciones',
			'Los funcionarios son responsables por sus actos de gobierno',
		],
		examples: [
			'Por ser república, el presidente no puede ejercer funciones judiciales. Por ser federal, la Provincia de Buenos Aires tiene su propia constitución, su gobernador y su legislatura, distintos del gobierno nacional.',
		],
		relatedArticles: ['cn-art-5', 'cn-art-22', 'cn-art-31', 'cn-art-121'],
		jurisprudence: [],
		regulations: [],
		keywords: ['república', 'federalismo', 'representativa', 'forma de gobierno', 'división de poderes'],
		order: 1,
		segments: [
			{
				id: 'cn-art-1-s1',
				lawId: 'constitucion-nacional',
				articleId: 'cn-art-1',
				articleNumber: '1',
				segmentType: 'PARAGRAPH',
				text:
					'La Nación Argentina adopta para su gobierno la forma representativa republicana federal, según la establece la presente Constitución.',
				plainExplanation:
					'Tres palabras definen cómo se gobierna Argentina: REPRESENTATIVA (el pueblo elige a quienes gobiernan), REPUBLICANA (hay división de poderes, transparencia y periodicidad en los cargos) y FEDERAL (las provincias conservan poderes propios y no dependen totalmente del gobierno central).',
				practicalExample:
					'Cuando votás para elegir presidente o gobernador ejercés el principio representativo. Cuando la Corte Suprema declara inconstitucional un decreto presidencial, aplica el principio republicano de división de poderes.',
				references: [],
				order: 0,
			},
		],
		amendments: [],
	},
	{
		id: 'cn-art-2',
		lawId: 'constitucion-nacional',
		number: '2',
		title: 'Religión',
		text: 'El Gobierno federal sostiene el culto católico apostólico romano.',		plainLanguageExplanation:
			'El Estado nacional da apoyo económico a la Iglesia Católica. Esto no significa que el catolicismo sea la religión oficial del Estado, ni que se prohíban otras religiones. El artículo 14 garantiza la libertad de culto para todos.',
		practicalEffects: [
			'El Estado financia parcialmente a la Iglesia Católica',
			'No implica una religión de Estado excluyente',
			'Coexiste con la libertad de culto del Art. 14',
		],
		examples: [
			'Los sacerdotes y obispos que fueron designados antes de 1994 recibían un sueldo del Estado. La reforma de 1994 mantuvo esta disposición histórica.',
		],
		relatedArticles: ['cn-art-14'],
		jurisprudence: [],
		regulations: [],
		keywords: ['religión', 'culto', 'iglesia católica', 'libertad religiosa'],
		order: 2,
		segments: [],
		amendments: [],
	},
	{
		id: 'cn-art-3',
		lawId: 'constitucion-nacional',
		number: '3',
		title: 'Capital de la Nación',
		text:
			'Las autoridades que ejercen el Gobierno federal, residen en la ciudad que se declare Capital de la República por una ley especial del Congreso, previa cesión hecha por una o más legislaturas provinciales, del territorio que haya de federalizarse.',		plainLanguageExplanation:
			'El Congreso debe designar por ley la capital del país, pero solo después de que la o las provincias cedan el territorio correspondiente. Históricamente esto se resolvió con la Ley 1.029 (1880) que federalizó la Ciudad de Buenos Aires. La reforma de 1994 reconoció la autonomía de la Ciudad de Buenos Aires como Ciudad Autónoma (art. 129).',
		practicalEffects: [
			'La capital federal debe ser establecida por ley del Congreso',
			'Requiere cesión previa del territorio por parte de las provincias',
			'La Ciudad de Buenos Aires fue federalizada en 1880 por Ley 1.029',
			'La CABA tiene desde 1994 un régimen de ciudad autónoma (art. 129 CN)',
		],
		examples: [
			'La Ciudad de Buenos Aires es la Capital Federal desde 1880. Su federalización requirió que la Provincia de Buenos Aires cediera ese territorio al gobierno nacional mediante la Ley 1.029.',
		],
		relatedArticles: ['cn-art-129'],
		jurisprudence: [],
		regulations: [
			'Ley 1.029 — Federalización de Buenos Aires (1880)',
			'Ley 24.588 — Garantías al Estado Nacional en la CABA',
		],
		keywords: ['capital federal', 'Buenos Aires', 'federalización', 'CABA', 'sede del gobierno'],
		order: 3,
		segments: [],
		amendments: [],
	},
	{
		id: 'cn-art-4',
		lawId: 'constitucion-nacional',
		number: '4',
		title: 'Recursos del Tesoro Nacional',
		text:
			'El Gobierno federal provee a los gastos de la Nación con los fondos del Tesoro nacional formado del producto de derechos de importación y exportación, del de la venta o locación de tierras de propiedad nacional, de la renta de Correos, de las demás contribuciones que equitativa y proporcionalmente a la población imponga el Congreso General, y de los empréstitos y operaciones de crédito que decrete el mismo Congreso para urgencias de la Nación, o para empresas de utilidad nacional.',		plainLanguageExplanation:
			'El Estado nacional se financia con: derechos aduaneros (importaciones y exportaciones), venta o arrendamiento de tierras nacionales, correo, impuestos que fije el Congreso en forma equitativa y proporcional a la población, y endeudamiento autorizado por el Congreso. La proporcionalidad a la población fue la base histórica para justificar el impuesto a las ganancias y el IVA como tributos nacionales.',
		practicalEffects: [
			'Solo el Congreso puede crear impuestos nacionales',
			'Los derechos de exportación (retenciones) son constitucionalmente válidos',
			'El endeudamiento externo requiere autorización del Congreso',
			'Los impuestos deben ser equitativos y proporcionales',
		],
		examples: [
			'Cuando el Congreso sanciona la Ley de Presupuesto anual y fija las retenciones a las exportaciones agropecuarias, está ejerciendo la facultad que le otorga este artículo para financiar al Estado.',
		],
		relatedArticles: ['cn-art-16', 'cn-art-17', 'cn-art-52', 'cn-art-75'],
		jurisprudence: [],
		regulations: [
			'Ley 24.156 — Administración Financiera del Estado',
			'Ley 11.672 — Ley Complementaria Permanente de Presupuesto',
		],
		keywords: [
			'tesoro nacional',
			'impuestos',
			'derechos aduaneros',
			'retenciones',
			'empréstitos',
			'presupuesto',
			'recursos del estado',
		],
		order: 4,
		segments: [],
		amendments: [],
	},
	{
		id: 'cn-art-5',
		lawId: 'constitucion-nacional',
		number: '5',
		title: 'Constituciones provinciales',
		text:
			'Cada provincia dictará para sí una Constitución bajo el sistema representativo republicano, de acuerdo con los principios, declaraciones y garantías de la Constitución Nacional; y que asegure su administración de justicia, su régimen municipal, y la educación primaria. Bajo de estas condiciones el Gobierno federal, garante a cada provincia el goce y ejercicio de sus instituciones.',		plainLanguageExplanation:
			'Cada provincia debe tener su propia Constitución, siempre y cuando respete el sistema republicano, garantice la justicia, los municipios y la educación primaria. A cambio, el gobierno nacional garantiza a cada provincia el ejercicio de sus instituciones.',
		practicalEffects: [
			'Las 23 provincias tienen sus propias constituciones',
			'Deben respetar los mínimos que fija la Constitución Nacional',
			'El gobierno nacional protege a las provincias que cumplen estas condiciones',
		],
		examples: [
			'La Constitución de la Provincia de Buenos Aires, la de Córdoba o la de Mendoza son válidas porque todas respetan el sistema republicano y garantizan educación pública y municipios.',
		],
		relatedArticles: ['cn-art-1', 'cn-art-121', 'cn-art-122', 'cn-art-123'],
		jurisprudence: [],
		regulations: [],
		keywords: ['provincias', 'constituciones provinciales', 'autonomía', 'educación primaria', 'municipios'],
		order: 5,
		segments: [],
		amendments: [],
	},
	{
		id: 'cn-art-6',
		lawId: 'constitucion-nacional',
		number: '6',
		title: 'Intervención federal',
		text:
			'El Gobierno federal interviene en el territorio de las provincias para garantir la forma republicana de gobierno, o repeler invasiones exteriores, y a requisición de sus autoridades constituidas para sostenerlas o restablecerlas, si hubiesen sido depuestas por la sedición, o por invasión de otra provincia.',		plainLanguageExplanation:
			'El gobierno nacional puede intervenir en una provincia en cuatro casos: (1) para garantizar la forma republicana de gobierno; (2) para repeler una invasión extranjera; (3) si las autoridades locales lo piden para sostenerse frente a una sedición; (4) si las autoridades locales lo piden para restablecerse tras haber sido derrocadas. La intervención federal es decretada por el Congreso o, en receso, por el Poder Ejecutivo.',
		practicalEffects: [
			'El Poder Ejecutivo puede designar un interventor federal que reemplaza a las autoridades provinciales',
			'Requiere decreto del Congreso, salvo urgencia donde puede actuar el Ejecutivo',
			'La intervención es una medida excepcional que altera el federalismo',
			'El interventor ejerce los tres poderes provinciales',
		],
		examples: [
			'A lo largo de la historia argentina hubo más de 200 intervenciones federales. Una de las más recientes fue la intervención a la Provincia de Santiago del Estero en 2004, para restablecer la institucionalidad democrática.',
		],
		relatedArticles: ['cn-art-1', 'cn-art-5', 'cn-art-75', 'cn-art-99'],
		jurisprudence: ['Corte Suprema (1893) — las intervenciones federales son decisiones políticas que los jueces no pueden revisar'],
		jurisprudenceRefs: [
			{
				id: 'cn-art6-cullen-llerena',
				slug: 'cullen-llerena',
				tribunal: 'CSJN',
				caratula: 'Cullen c/ Llerena',
				year: 1893,
				citation: 'Fallos: 53:420',
				holding: 'Las intervenciones federales son actos políticos no judiciables. El Poder Judicial carece de jurisdicción para revisar la oportunidad, los motivos o la conveniencia de una intervención federal decretada por el Congreso o el Poder Ejecutivo, por tratarse de una cuestión política no susceptible de control jurisdiccional.',
				url: 'https://www.saij.gob.ar/corte-suprema-justicia-nacion-federal-ciudad-autonoma-buenos-aires-cullen-joaquin-llerena-baldomero-fa93998068-1893-09-07/123456789-860-8993-9ots-eupmocsollaf',
			},
		],
		regulations: [],
		keywords: ['intervención federal', 'provincias', 'forma republicana', 'sedición', 'autonomía provincial'],
		order: 6,
		segments: [],
		amendments: [],
	},
	{
		id: 'cn-art-7',
		lawId: 'constitucion-nacional',
		number: '7',
		title: 'Fe pública de los actos provinciales',
		text:
			'Los actos públicos y procedimientos judiciales de una provincia gozan de entera fe en las demás; y el Congreso puede por leyes generales determinar cuál será la forma probatoria de estos actos y procedimientos, y los efectos legales que producirán.',		plainLanguageExplanation:
			'Una escritura firmada en Córdoba vale en Buenos Aires, un divorcio dictado en Mendoza es válido en Santa Fe. Los actos públicos y sentencias judiciales de una provincia son reconocidos en todas las demás. El Congreso puede reglamentar cómo se acreditan esos actos.',
		practicalEffects: [
			'Una sentencia judicial dictada en una provincia tiene efecto en todo el país',
			'Las escrituras, partidas de nacimiento y otros actos notariales valen en todas las provincias',
			'Evita que cada provincia sea un Estado independiente con sus propias reglas de reconocimiento',
		],
		examples: [
			'Un matrimonio celebrado en Salta es reconocido en Tierra del Fuego. Una sentencia de divorcio de los tribunales de Entre Ríos puede ejecutarse en la Provincia de Buenos Aires sin necesidad de un nuevo juicio.',
		],
		relatedArticles: ['cn-art-5', 'cn-art-8'],
		jurisprudence: [],
		regulations: ['Código Procesal Civil y Comercial de la Nación — exhortos interprovinciales'],
		keywords: ['fe pública', 'actos públicos', 'procedimientos judiciales', 'reconocimiento interprovincial', 'federalismo'],
		order: 7,
		segments: [],
		amendments: [],
	},
	{
		id: 'cn-art-8',
		lawId: 'constitucion-nacional',
		number: '8',
		title: 'Ciudadanos de cada provincia',
		text:
			'Los ciudadanos de cada provincia gozan de todos los derechos, privilegios e inmunidades inherentes al título de ciudadano en las demás. La extradición de los criminales es de obligación recíproca entre todas las provincias.',		plainLanguageExplanation:
			'Un ciudadano de Chaco tiene los mismos derechos en la Provincia de Buenos Aires que un ciudadano nacido allí. No existe discriminación entre ciudadanos de distintas provincias. Además, si alguien comete un delito en una provincia y huye a otra, esta última está obligada a entregarlo.',
		practicalEffects: [
			'No existe discriminación entre ciudadanos de distintas provincias',
			'Un tucumano tiene los mismos derechos civiles en Neuquén que un neuquino',
			'Las provincias deben extraditar a quien cometió un delito en otra provincia',
		],
		examples: [
			'Si alguien comete un robo en Rosario y se refugia en Córdoba, la Justicia de Córdoba debe entregarlo a la Justicia de Santa Fe. Eso es la extradición interprovincial.',
		],
		relatedArticles: ['cn-art-7', 'cn-art-16'],
		jurisprudence: [],
		regulations: [],
		keywords: ['ciudadanos', 'igualdad interprovincial', 'extradición', 'derechos civiles', 'federalismo'],
		order: 8,
		segments: [],
		amendments: [],
	},
	{
		id: 'cn-art-9',
		lawId: 'constitucion-nacional',
		number: '9',
		title: 'Aduana nacional única',
		text:
			'En todo el territorio de la Nación no habrá más aduanas que las nacionales, en las cuales regirán las tarifas que sancione el Congreso.',		plainLanguageExplanation:
			'Solo existen aduanas nacionales; las provincias no pueden tener sus propias aduanas. Las tarifas arancelarias (impuestos al comercio exterior) son fijadas exclusivamente por el Congreso de la Nación. Esto garantiza la unidad del mercado interno y la uniformidad del comercio exterior.',
		practicalEffects: [
			'Las provincias no pueden cobrar derechos de importación ni exportación',
			'Solo el Estado nacional regula el comercio exterior',
			'Las tarifas aduaneras las fija el Congreso, no el Ejecutivo unilateralmente',
		],
		examples: [
			'Una provincia no puede poner un control aduanero propio en su frontera con otra provincia ni cobrar aranceles por los bienes que entran a su territorio desde el exterior.',
		],
		relatedArticles: ['cn-art-4', 'cn-art-10', 'cn-art-11', 'cn-art-75'],
		jurisprudence: [],
		regulations: ['Código Aduanero (Ley 22.415)'],
		keywords: ['aduana', 'comercio exterior', 'aranceles', 'tarifas', 'unidad económica', 'federalismo fiscal'],
		order: 9,
		segments: [],
		amendments: [],
	},
	{
		id: 'cn-art-10',
		lawId: 'constitucion-nacional',
		number: '10',
		title: 'Libre circulación interior',
		text:
			'En el interior de la República es libre de derechos la circulación de los efectos de producción o fabricación nacional, así como la de los géneros y mercancías de todas clases, despachadas en las aduanas exteriores.',		plainLanguageExplanation:
			'Dentro de Argentina, los bienes producidos en el país y los bienes importados (ya despachados en aduana) circulan libremente sin pagar impuestos por cruzar de una provincia a otra. No puede haber "aduanas internas" que graven el tránsito de mercaderías.',
		practicalEffects: [
			'Una empresa de Mendoza puede vender vino en Buenos Aires sin pagar derechos de circulación',
			'Las provincias no pueden gravar la entrada de productos de otras provincias',
			'Base del mercado interno unificado argentino',
		],
		examples: [
			'Si Salta produce azúcar, puede venderla en cualquier provincia sin que haya un impuesto provincial por el simple hecho de cruzar la frontera provincial.',
		],
		relatedArticles: ['cn-art-9', 'cn-art-11', 'cn-art-12'],
		jurisprudence: [],
		regulations: [],
		keywords: ['libre circulación', 'mercado interno', 'aduanas internas', 'comercio interprovincial', 'unidad económica'],
		order: 10,
		segments: [],
		amendments: [],
	},
	{
		id: 'cn-art-11',
		lawId: 'constitucion-nacional',
		number: '11',
		title: 'Prohibición de derechos de tránsito',
		text:
			'Los artículos de producción o fabricación nacional o extranjera, así como los ganados de toda especie, que pasen por territorio de una provincia a otra, serán libres de los derechos llamados de tránsito, siéndolo también los carruajes, buques o bestias en que se transporten; y ningún otro derecho podrá imponérseles en adelante, cualquiera que sea su denominación, por el hecho de transitar el territorio.',		plainLanguageExplanation:
			'Complementa el art. 10: no solo los productos están exentos de impuestos provinciales al circular, sino también los medios de transporte (camiones, barcos, trenes). Ninguna provincia puede inventar un impuesto con cualquier nombre que en la práctica funcione como una aduana interna.',
		practicalEffects: [
			'Los camiones y barcos no pagan por cruzar provincias',
			'Las provincias no pueden disfrazar aduanas internas con otros nombres',
			'Aplica a ganado y a toda clase de bienes',
		],
		examples: [
			'Un camión con soja que cruza de Córdoba a Buenos Aires para embarcar en el puerto no puede ser obligado a pagar ningún "peaje provincial" que funcione como un derecho de tránsito sobre la mercadería.',
		],
		relatedArticles: ['cn-art-9', 'cn-art-10', 'cn-art-12'],
		jurisprudence: [],
		regulations: [],
		keywords: ['derechos de tránsito', 'libre circulación', 'aduanas internas', 'transporte', 'mercadería'],
		order: 11,
		segments: [],
		amendments: [],
	},
	{
		id: 'cn-art-12',
		lawId: 'constitucion-nacional',
		number: '12',
		title: 'Libre navegación y cabotaje',
		text:
			'Los buques destinados de una provincia a otra, no serán obligados a entrar, anclar y pagar derechos por causa de tránsito, sin que en ningún caso puedan concederse preferencias a un puerto respecto de otro, por medio de leyes o reglamentos de comercio.',		plainLanguageExplanation:
			'Los barcos que van de un puerto provincial a otro no pueden ser obligados a hacer escala, fondear ni pagar derechos solo por pasar frente a una provincia. Tampoco puede haber leyes que den privilegios a un puerto sobre otro (por ejemplo, beneficiar al Puerto de Buenos Aires sobre el de Rosario).',
		practicalEffects: [
			'La libre navegación fluvial está garantizada',
			'No puede haber privilegios legales para un puerto sobre otro',
			'Base del sistema portuario competitivo argentino',
		],
		examples: [
			'Un barco que va de Rosario a Buenos Aires navegando el Paraná y el Río de la Plata no puede ser obligado a entrar a ningún puerto intermedio ni pagar derechos de paso.',
		],
		relatedArticles: ['cn-art-9', 'cn-art-10', 'cn-art-11', 'cn-art-26'],
		jurisprudence: [],
		regulations: ['Ley 24.093 — Actividades portuarias'],
		keywords: ['navegación', 'puertos', 'cabotaje', 'libre comercio', 'ríos interiores'],
		order: 12,
		segments: [],
		amendments: [],
	},
	{
		id: 'cn-art-13',
		lawId: 'constitucion-nacional',
		number: '13',
		title: 'Admisión de nuevas provincias',
		text:
			'Podrán admitirse nuevas provincias en la Nación; pero no podrá erigirse una provincia en el territorio de otra u otras, ni de varias formarse una sola, sin el consentimiento de la Legislatura de las provincias interesadas y del Congreso.',		plainLanguageExplanation:
			'Pueden crearse nuevas provincias, pero para dividir o fusionar provincias existentes se necesita el acuerdo de las legislaturas de las provincias involucradas y del Congreso nacional. Ninguna provincia puede ser desmembrada unilateralmente ni fusionada con otra sin su consentimiento.',
		practicalEffects: [
			'La creación de nuevas provincias requiere ley del Congreso',
			'La división de una provincia requiere su propio consentimiento legislativo',
			'Protege la integridad territorial de las provincias',
		],
		examples: [
			'Tierra del Fuego era un territorio nacional hasta que el Congreso la convirtió en provincia por Ley 23.775 (1991). Si hoy se quisiera dividir la Provincia de Buenos Aires, requeriría el voto de la propia Legislatura bonaerense y del Congreso Nacional.',
		],
		relatedArticles: ['cn-art-3', 'cn-art-121', 'cn-art-124'],
		jurisprudence: [],
		regulations: ['Ley 23.775 — Provincialización de Tierra del Fuego'],
		keywords: ['nuevas provincias', 'territorios nacionales', 'división provincial', 'integridad territorial'],
		order: 13,
		segments: [],
		amendments: [],
	},
	{
		id: 'cn-art-14',
		lawId: 'constitucion-nacional',
		number: '14',
		title: 'Derechos civiles',
		text:
			'Todos los habitantes de la Nación gozan de los siguientes derechos conforme a las leyes que reglamenten su ejercicio; a saber: de trabajar y ejercer toda industria lícita; de navegar y comerciar; de peticionar a las autoridades; de entrar, permanecer, transitar y salir del territorio argentino; de publicar sus ideas por la prensa sin censura previa; de usar y disponer de su propiedad; de asociarse con fines útiles; de profesar libremente su culto; de enseñar y aprender.',		plainLanguageExplanation:
			'El artículo 14 lista los derechos civiles básicos de todos los habitantes: trabajar, comerciar, pedir cosas a las autoridades, circular libremente, publicar ideas sin censura previa, usar la propiedad, asociarse, practicar religión y educarse. Son derechos de todos los habitantes, no solo de los ciudadanos argentinos.',
		practicalEffects: [
			'Cualquier persona puede trabajar en Argentina sin necesidad de ser ciudadano',
			'No se puede censurar una publicación antes de que salga (sí puede haber responsabilidad posterior)',
			'Toda persona puede circular libremente por el territorio nacional',
			'Cualquiera puede peticionar a las autoridades sin necesidad de abogado',
		],
		examples: [
			'Un ciudadano venezolano residente en Argentina tiene los mismos derechos del Art. 14 que un argentino. Una empresa de medios no puede ser censurada antes de publicar una nota —aunque puede ser demandada después si la nota es falsa.',
		],
		relatedArticles: ['cn-art-14bis', 'cn-art-17', 'cn-art-19', 'cn-art-20', 'cn-art-28'],
		jurisprudence: [],
		regulations: [],
		keywords: ['derechos civiles', 'trabajo', 'libertad de prensa', 'libre circulación', 'propiedad', 'petición'],
		order: 14,
		segments: [
			{
				id: 'cn-art-14-s1',
				lawId: 'constitucion-nacional',
				articleId: 'cn-art-14',
				articleNumber: '14',
				segmentType: 'PARAGRAPH',
				text:
					'Todos los habitantes de la Nación gozan de los siguientes derechos conforme a las leyes que reglamenten su ejercicio; a saber: de trabajar y ejercer toda industria lícita; de navegar y comerciar; de peticionar a las autoridades; de entrar, permanecer, transitar y salir del territorio argentino.',
				plainExplanation:
					'La primera parte enumera los derechos económicos y de circulación: trabajar en cualquier actividad legal, hacer comercio, pedir cosas al Estado, y moverse libremente dentro y fuera del país. Son derechos de todos los "habitantes", no solo de los ciudadanos.',
				practicalExample:
					'Un inmigrante recién llegado puede trabajar, abrir un negocio y moverse por el país sin restricciones, porque el artículo habla de "habitantes", no de ciudadanos.',
				references: [],
				order: 0,
			},
			{
				id: 'cn-art-14-s2',
				lawId: 'constitucion-nacional',
				articleId: 'cn-art-14',
				articleNumber: '14',
				segmentType: 'PARAGRAPH',
				text:
					'de publicar sus ideas por la prensa sin censura previa; de usar y disponer de su propiedad; de asociarse con fines útiles; de profesar libremente su culto; de enseñar y aprender.',
				plainExplanation:
					'La segunda parte garantiza las libertades de expresión, propiedad, asociación, religión y educación. La clave en libertad de prensa es "sin censura previa": el Estado no puede impedir una publicación antes de que salga, aunque sí puede haber consecuencias legales después.',
				practicalExample:
					'Un diario puede publicar una investigación periodística sin que ningún juez la bloquee antes de salir. Si la nota contiene información falsa y daña la honra de alguien, esa persona puede demandarlo después —pero la censura previa está prohibida.',
				references: [],
				order: 1,
			},
		],
		amendments: [],
	},
	{
		id: 'cn-art-14bis',
		lawId: 'constitucion-nacional',
		number: '14 bis',
		title: 'Derechos laborales y sociales',
		text:
			'El trabajo en sus diversas formas gozará de la protección de las leyes, las que asegurarán al trabajador: condiciones dignas y equitativas de labor; jornada limitada; descanso y vacaciones pagados; retribución justa; salario mínimo vital móvil; igual remuneración por igual tarea; participación en las ganancias de las empresas, con control de la producción y colaboración en la dirección; protección contra el despido arbitrario; estabilidad del empleado público; organización sindical libre y democrática, reconocida por la simple inscripción en un registro especial. Queda garantizado a los gremios: concertar convenios colectivos de trabajo; recurrir a la conciliación y al arbitraje; el derecho de huelga. Los representantes gremiales gozarán de las garantías necesarias para el cumplimiento de su gestión sindical y las relacionadas con la estabilidad de su empleo. El Estado otorgará los beneficios de la seguridad social, que tendrá carácter de integral e irrenunciable. En especial, la ley establecerá: el seguro social obligatorio, que estará a cargo de entidades nacionales o provinciales con autonomía financiera y económica, administradas por los interesados con participación del Estado, sin que pueda existir superposición de aportes; jubilaciones y pensiones móviles; la protección integral de la familia; la defensa del bien de familia; la compensación económica familiar y el acceso a una vivienda digna.',		plainLanguageExplanation:
			'Incorporado en 1957, el artículo 14 bis protege al trabajador en tres dimensiones: (1) Derechos individuales del trabajo: salario justo, jornada limitada, vacaciones pagas, protección contra el despido, estabilidad del empleo público. (2) Derechos sindicales: huelga, convenios colectivos, organización gremial libre. (3) Seguridad social: jubilación, pensiones, seguro social, vivienda digna.',
		practicalEffects: [
			'El empleador no puede despedir arbitrariamente sin indemnización',
			'La jornada laboral está limitada por ley',
			'Los trabajadores pueden sindicalizarse libremente',
			'El derecho de huelga está garantizado constitucionalmente',
			'Existe un salario mínimo obligatorio',
			'Todos los trabajadores acceden a jubilación y obra social',
		],
		examples: [
			'Cuando una empresa quiere despedir a un trabajador sin causa, debe pagarle una indemnización establecida por ley porque el Art. 14 bis prohíbe el despido arbitrario. Un gremio puede declarar una huelga sin que el gobierno la prohíba —aunque puede declarar servicios esenciales.',
		],
		relatedArticles: ['cn-art-14', 'cn-art-17'],
		jurisprudence: [
			'CSJN "Vizzoti" (2004) — indemnización por despido, límites constitucionales',
			'CSJN "Aquino" (2004) — riesgos del trabajo y dignidad laboral',
		],
		regulations: ['Ley 20.744 — Contrato de Trabajo', 'Ley 24.013 — Empleo', 'Ley 24.557 — Riesgos del Trabajo'],
		keywords: [
			'trabajo',
			'derechos laborales',
			'salario mínimo',
			'huelga',
			'sindicatos',
			'jubilación',
			'seguridad social',
			'despido',
		],
		order: 15,
		segments: [
			{
				id: 'cn-art-14bis-s1',
				lawId: 'constitucion-nacional',
				articleId: 'cn-art-14bis',
				articleNumber: '14 bis',
				segmentType: 'PARAGRAPH',
				text:
					'El trabajo en sus diversas formas gozará de la protección de las leyes, las que asegurarán al trabajador: condiciones dignas y equitativas de labor; jornada limitada; descanso y vacaciones pagados; retribución justa; salario mínimo vital móvil; igual remuneración por igual tarea; participación en las ganancias de las empresas; protección contra el despido arbitrario; estabilidad del empleado público.',
				plainExplanation:
					'El Estado debe proteger a los trabajadores mediante leyes que garanticen: condiciones de trabajo dignas, horarios limitados, vacaciones pagas, un salario justo y mínimo, igual pago por igual tarea, parte de las ganancias de la empresa, y protección frente a despidos injustificados.',
				practicalExample:
					'Una empresa no puede pagar menos a una mujer que a un hombre por la misma tarea (igual remuneración por igual tarea). Si despide a un trabajador sin causa justificada, debe indemnizarlo según la Ley de Contrato de Trabajo.',
				references: [],
				order: 0,
			},
			{
				id: 'cn-art-14bis-s2',
				lawId: 'constitucion-nacional',
				articleId: 'cn-art-14bis',
				articleNumber: '14 bis',
				segmentType: 'PARAGRAPH',
				text:
					'Queda garantizado a los gremios: concertar convenios colectivos de trabajo; recurrir a la conciliación y al arbitraje; el derecho de huelga. El Estado otorgará los beneficios de la seguridad social: el seguro social obligatorio; jubilaciones y pensiones móviles; la protección integral de la familia; el acceso a una vivienda digna.',
				plainExplanation:
					'Los sindicatos tienen derecho a negociar salarios y condiciones colectivamente (convenio colectivo), a hacer huelga y a recurrir a mediación en conflictos. El Estado además debe garantizar jubilación, obra social, y ayuda a las familias para acceder a una vivienda digna.',
				practicalExample:
					'Cuando UPCN o ATE negocian el sueldo de los empleados públicos con el gobierno, están ejerciendo el derecho a convenio colectivo. Cuando los médicos del hospital hacen huelga, ejercen el derecho constitucional de huelga.',
				references: [],
				order: 1,
			},
		],
		amendments: [
			{
				id: 'cn-amend-14bis-1957',
				articleId: 'cn-art-14bis',
				modifyingLaw: 'Reforma Constitucional 1957',
				modifyingDate: '1957-10-24',
				previousText: '(artículo no existía)',
				newText: 'Texto completo del Art. 14 bis',
				description:
					'El Art. 14 bis fue incorporado por la Convención Constituyente de 1957 durante el gobierno de facto de Aramburu.',
				createdAt: '2024-01-01T00:00:00.000Z',
			},
		],
	},
	{
		id: 'cn-art-15',
		lawId: 'constitucion-nacional',
		number: '15',
		title: 'Abolición de la esclavitud',
		text:
			'En la Nación Argentina no hay esclavos: los pocos que hoy existen quedan libres desde la jura de esta Constitución; y una ley especial reglará las indemnizaciones a que dé lugar esta declaración. Todo contrato de compra y venta de personas es un crimen de que serán responsables los que lo celebrasen, y el escribano o funcionario que lo autorice. Y los esclavos que de cualquier modo se introduzcan quedan libres por el solo hecho de pisar el territorio de la República.',		plainLanguageExplanation:
			'Desde 1853 no existe la esclavitud en Argentina. Todo contrato de compraventa de personas es un crimen. Cualquier persona que llegue a territorio argentino siendo esclava, queda libre automáticamente por el solo hecho de pisar suelo argentino.',
		practicalEffects: [
			'La esclavitud está absolutamente prohibida',
			'Quienes trafiquen personas cometen un delito constitucional',
			'Cualquier persona esclavizada queda libre al entrar al país',
		],
		examples: [
			'El principio de libertad por pisar suelo argentino sigue siendo relevante en casos de trata de personas: la víctima de trata que logra entrar al país tiene derecho a la libertad y a la protección del Estado.',
		],
		relatedArticles: ['cn-art-14', 'cn-art-16'],
		jurisprudence: [],
		regulations: ['Ley 26.364 — Prevención y sanción de la trata de personas'],
		keywords: ['esclavitud', 'libertad', 'trata de personas', 'dignidad humana'],
		order: 16,
		segments: [],
		amendments: [],
	},
	{
		id: 'cn-art-16',
		lawId: 'constitucion-nacional',
		number: '16',
		title: 'Igualdad ante la ley',
		text:
			'La Nación Argentina no admite prerrogativas de sangre, ni de nacimiento: no hay en ella fueros personales ni títulos de nobleza. Todos sus habitantes son iguales ante la ley, y admisibles en los empleos sin otra condición que la idoneidad. La igualdad es la base del impuesto y de las cargas públicas.',		plainLanguageExplanation:
			'Todos somos iguales ante la ley: no existen privilegios por apellido, origen familiar ni títulos nobiliarios. Para los empleos públicos, la única condición válida es ser idóneo (tener capacidad para el cargo). Los impuestos también deben ser igualitarios: quien gana más, paga más.',
		practicalEffects: [
			'No existen privilegios hereditarios ni nobiliarios',
			'Los cargos públicos deben accederse por concurso o idoneidad',
			'Los impuestos deben ser proporcionales a la capacidad contributiva',
		],
		examples: [
			'Un concurso para ingresar al Poder Judicial debe evaluarse solo por capacidad, sin importar apellido o familia. Un impuesto a las ganancias que cobra más a quienes más ganan aplica el principio de igualdad contributiva.',
		],
		relatedArticles: ['cn-art-14', 'cn-art-37'],
		jurisprudence: ['CSJN "Cámara" (1958) — igualdad ante la ley e impuestos'],
		regulations: [],
		keywords: ['igualdad', 'no discriminación', 'idoneidad', 'impuestos', 'cargos públicos'],
		order: 17,
		segments: [],
		amendments: [],
	},
	{
		id: 'cn-art-17',
		lawId: 'constitucion-nacional',
		number: '17',
		title: 'Propiedad privada',
		text:
			'La propiedad es inviolable, y ningún habitante de la Nación puede ser privado de ella, sino en virtud de sentencia fundada en ley. La expropiación por causa de utilidad pública, debe ser calificada por ley y previamente indemnizada. Sólo el Congreso impone las contribuciones que se expresan en el artículo 4º. Ningún servicio personal es exigible, sino en virtud de ley o de sentencia fundada en ley. Todo autor o inventor es propietario exclusivo de su obra, invento o descubrimiento, por el término que le acuerde la ley. La confiscación de bienes queda borrada para siempre del Código Penal argentino. Ningún cuerpo armado puede hacer requisiciones, ni exigir auxilios de ninguna especie.',		plainLanguageExplanation:
			'Nadie puede quitarte tu propiedad sin una sentencia judicial. Si el Estado necesita tu tierra o inmueble por razones de utilidad pública (construir una ruta, por ejemplo), debe primero pagarte una indemnización justa y el Congreso debe declarar esa utilidad por ley. También protege la propiedad intelectual de autores e inventores.',
		practicalEffects: [
			'El Estado no puede confiscar bienes sin indemnización previa',
			'La expropiación requiere ley del Congreso y pago previo',
			'Los autores tienen derechos de propiedad intelectual',
			'Las Fuerzas Armadas no pueden requisar bienes sin respaldo legal',
		],
		examples: [
			'Cuando el Estado necesita terrenos para construir una autopista, debe sancionarse una ley de expropiación, tasar el valor del terreno y pagar al dueño antes de tomar posesión.',
		],
		relatedArticles: ['cn-art-14', 'cn-art-16'],
		jurisprudence: ['CSJN "Salomón" — expropiación y valor justo'],
		regulations: ['Ley 21.499 — Expropiaciones', 'Ley 11.723 — Propiedad intelectual'],
		keywords: ['propiedad', 'expropiación', 'propiedad intelectual', 'inviolabilidad', 'confiscación'],
		order: 18,
		segments: [],
		amendments: [],
	},
	{
		id: 'cn-art-18',
		lawId: 'constitucion-nacional',
		number: '18',
		title: 'Garantías penales y procesales',
		text:
			'Ningún habitante de la Nación puede ser penado sin juicio previo fundado en ley anterior al hecho del proceso, ni juzgado por comisiones especiales, o sacado de los jueces designados por la ley antes del hecho de la causa. Nadie puede ser obligado a declarar contra sí mismo; ni arrestado sino en virtud de orden escrita de autoridad competente. Es inviolable la defensa en juicio de la persona y de los derechos. El domicilio es inviolable, como también la correspondencia epistolar y los papeles privados; y una ley determinará en qué casos y con qué justificativos podrá procederse a su allanamiento y ocupación. Quedan abolidos para siempre la pena de muerte por causas políticas, toda especie de tormento y los azotes. Las cárceles de la Nación serán sanas y limpias, para seguridad y no para castigo de los reos detenidos en ellas, y toda medida que a pretexto de precaución conduzca a mortificarlos más allá de lo que aquélla exija, hará responsable al juez que la autorice.',		plainLanguageExplanation:
			'El artículo 18 es la base del debido proceso penal. Establece que: nadie puede ser condenado sin un juicio previo; nadie puede ser juzgado por una ley creada después del hecho; nadie está obligado a declarar en su contra; nadie puede ser detenido sin una orden escrita de juez; el domicilio, la correspondencia y los papeles privados son inviolables; quedan prohibidas la tortura y la pena de muerte por causas políticas.',
		practicalEffects: [
			'Toda persona acusada tiene derecho a un juicio con todas las garantías',
			'Un imputado puede negarse a declarar sin que eso sea tomado en su contra',
			'Solo un juez puede ordenar una detención o un allanamiento',
			'La tortura o los tratos degradantes en custodia son inconstitucionales',
			'Las cárceles deben ser lugares de seguridad, no de castigo adicional',
		],
		examples: [
			'Si la policía allanó tu casa sin orden judicial escrita, todo lo obtenido en ese allanamiento es nulo y no puede ser usado en tu contra en el juicio.',
		],
		relatedArticles: ['cn-art-19', 'cn-art-43'],
		jurisprudence: [
			'CSJN "Montenegro" (1981) — prueba obtenida mediante torturas',
			'CSJN "Fiorentino" (1984) — allanamiento sin orden',
		],
		regulations: [
			'Ley 27.150 — Implementación del Código Procesal Penal Federal',
			'Ley 27.063 — Código Procesal Penal Federal (texto sustantivo)',
			'Ley 23.984 — Código Procesal Penal de la Nación (sistema anterior)',
		],
		keywords: [
			'debido proceso',
			'defensa en juicio',
			'detención',
			'allanamiento',
			'tortura',
			'garantías penales',
			'juicio previo',
		],
		order: 19,
		segments: [
			{
				id: 'cn-art-18-s1',
				lawId: 'constitucion-nacional',
				articleId: 'cn-art-18',
				articleNumber: '18',
				segmentType: 'PARAGRAPH',
				text:
					'Ningún habitante de la Nación puede ser penado sin juicio previo fundado en ley anterior al hecho del proceso, ni juzgado por comisiones especiales, o sacado de los jueces designados por la ley antes del hecho de la causa.',
				plainExplanation:
					'Para condenar a alguien se necesita: (1) un juicio previo con todas las garantías, (2) que el hecho sea delito según una ley que existía ANTES de que se cometiera, y (3) que juzgue el tribunal que la ley asigna ordinariamente, no comisiones especiales creadas ad hoc.',
				practicalExample:
					'Si el Congreso aprueba una ley que declara delito cierta conducta, esa ley no puede aplicarse retroactivamente a quienes realizaron esa conducta antes de que la ley existiera.',
				references: [],
				order: 0,
			},
			{
				id: 'cn-art-18-s2',
				lawId: 'constitucion-nacional',
				articleId: 'cn-art-18',
				articleNumber: '18',
				segmentType: 'PARAGRAPH',
				text:
					'Nadie puede ser obligado a declarar contra sí mismo; ni arrestado sino en virtud de orden escrita de autoridad competente. Es inviolable la defensa en juicio de la persona y de los derechos.',
				plainExplanation:
					'Tres garantías clave: el derecho a no auto-incriminarse (podés negarte a declarar), que solo un juez puede ordenar tu detención mediante escrito, y que siempre podés defenderte en juicio con un abogado.',
				practicalExample:
					'En cualquier proceso penal podés decir "me niego a declarar en mi contra" sin que eso sea considerado como prueba de culpabilidad. Es lo que se conoce como el derecho al silencio.',
				references: [],
				order: 1,
			},
			{
				id: 'cn-art-18-s3',
				lawId: 'constitucion-nacional',
				articleId: 'cn-art-18',
				articleNumber: '18',
				segmentType: 'PARAGRAPH',
				text:
					'El domicilio es inviolable, como también la correspondencia epistolar y los papeles privados. Quedan abolidos para siempre la pena de muerte por causas políticas, toda especie de tormento y los azotes. Las cárceles serán sanas y limpias, para seguridad y no para castigo.',
				plainExplanation:
					'Tu casa, tus cartas y documentos privados no pueden ser revisados sin orden judicial. La tortura y la pena de muerte por delitos políticos están prohibidas para siempre. Las prisiones deben ser dignas: el encierro es el castigo, no las condiciones inhumanas.',
				practicalExample:
					'Si la policía revisa tu celular o computadora sin una orden judicial que lo autorice específicamente, esa evidencia obtenida es ilegal y no puede usarse en el juicio.',
				references: [],
				order: 2,
			},
		],
		amendments: [],
	},
	{
		id: 'cn-art-19',
		lawId: 'constitucion-nacional',
		number: '19',
		title: 'Privacidad e intimidad',
		text:
			'Las acciones privadas de los hombres que de ningún modo ofendan al orden y a la moral pública, ni perjudiquen a un tercero, están sólo reservadas a Dios, y exentas de la autoridad de los magistrados. Ningún habitante de la Nación será obligado a hacer lo que no manda la ley, ni privado de lo que ella no prohíbe.',		plainLanguageExplanation:
			'Todo lo que hacés en privado y que no daña a nadie ni al orden público es tu asunto y el Estado no puede meterse. La segunda parte establece el principio de legalidad: nadie está obligado a hacer lo que la ley no ordena, ni puede ser prohibido de hacer lo que la ley no prohíbe.',
		practicalEffects: [
			'El Estado no puede perseguir conductas privadas que no dañen a terceros',
			'No existe obligación de hacer nada que la ley no imponga expresamente',
			'No existe prohibición de nada que la ley no prohíba expresamente',
			'Base constitucional de la despenalización de conductas que afectan solo al propio individuo',
		],
		examples: [
			'La CSJN usó este artículo para declarar inconstitucional penalizar la tenencia de marihuana para consumo personal ("Arriola", 2009): si solo te afecta a vos, el Estado no puede prohibirlo.',
		],
		relatedArticles: ['cn-art-14', 'cn-art-18', 'cn-art-43'],
		jurisprudence: [
			'CSJN "Arriola" (2009) — tenencia de estupefacientes para consumo personal',
			'CSJN "Bazterrica" (1986) — privacidad y tenencia',
		],
		regulations: [],
		keywords: ['privacidad', 'intimidad', 'libertad individual', 'principio de legalidad', 'autonomía personal'],
		order: 19,
		segments: [
			{
				id: 'cn-art-19-s1',
				lawId: 'constitucion-nacional',
				articleId: 'cn-art-19',
				articleNumber: '19',
				segmentType: 'PARAGRAPH',
				text:
					'Las acciones privadas de los hombres que de ningún modo ofendan al orden y a la moral pública, ni perjudiquen a un tercero, están sólo reservadas a Dios, y exentas de la autoridad de los magistrados.',
				plainExplanation:
					'Lo que hacés en privado, sin dañar a nadie ni al orden público, es solo tuyo. El Estado no tiene jurisdicción sobre tus decisiones íntimas. "Reservadas a Dios" es una expresión del siglo XIX que hoy se interpreta como: es tu decisión personal, no del Estado.',
				practicalExample:
					'Lo que una persona adulta decide hacer en su casa, sus relaciones personales o sus creencias religiosas no puede ser objeto de persecución estatal si no perjudica a terceros.',
				references: [],
				order: 0,
			},
		],
		amendments: [],
	},
	{
		id: 'cn-art-20',
		lawId: 'constitucion-nacional',
		number: '20',
		title: 'Derechos civiles de los extranjeros',
		text:
			'Los extranjeros gozan en el territorio de la Nación de todos los derechos civiles del ciudadano; pueden ejercer su industria, comercio y profesión; poseer bienes raíces, comprarlos y enajenarlos; navegar los ríos y costas; ejercer libremente su culto; testar y casarse conforme a las leyes. No están obligados a admitir la ciudadanía, ni a pagar contribuciones forzosas extraordinarias. Pueden obtener la naturalización residiendo dos años continuos en la Nación; pero la autoridad puede acortar este término a favor del que lo solicite, alegando y probando servicios a la República.',		plainLanguageExplanation:
			'Los extranjeros tienen los mismos derechos civiles que los ciudadanos argentinos: pueden trabajar, comerciar, tener propiedades, casarse, hacer testamento, practicar su religión. No están obligados a hacerse argentinos ni a pagar impuestos extraordinarios. Para naturalizarse basta con dos años de residencia continua, plazo que puede reducirse por servicios al país.',
		practicalEffects: [
			'Un extranjero puede comprar y vender inmuebles en Argentina',
			'Puede ejercer cualquier profesión o actividad comercial',
			'La naturalización requiere solo 2 años de residencia',
			'No se puede obligar a un extranjero a hacerse ciudadano',
			'No se les pueden cobrar impuestos extraordinarios que no pagan los ciudadanos',
		],
		examples: [
			'Un ciudadano de Bolivia que vive en Argentina puede abrir un negocio, comprar un departamento, casarse y practicar su religión con los mismos derechos civiles que un argentino. Para votar en elecciones nacionales sí necesitaría naturalizarse.',
		],
		relatedArticles: ['cn-art-14', 'cn-art-16', 'cn-art-25'],
		jurisprudence: [],
		regulations: ['Ley 25.871 — Migraciones', 'Ley 346 — Ciudadanía y naturalización'],
		keywords: ['extranjeros', 'derechos civiles', 'naturalización', 'ciudadanía', 'inmigración', 'igualdad'],
		order: 20,
		segments: [],
		amendments: [],
	},
];
