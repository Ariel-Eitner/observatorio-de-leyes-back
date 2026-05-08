import type { Article } from '../../../common/types/law.types';
import type { LawSection } from '../../../common/types/law.types';

export const SECTION_01: LawSection = {
	id: 'codigo-aduanero-s01',
	lawId: 'codigo-aduanero',
	number: 'Preliminar',
	name: 'Disposiciones Generales',
	articleStart: 1,
	articleEnd: 16,
	titles: [
		{
			id: 'ca-s01-titulo-1',
			sectionId: 'codigo-aduanero-s01',
			lawId: 'codigo-aduanero',
			number: 'I',
			name: 'Ámbito Territorial',
			articleStart: 1,
			articleEnd: 8,
		},
		{
			id: 'ca-s01-titulo-2',
			sectionId: 'codigo-aduanero-s01',
			lawId: 'codigo-aduanero',
			number: 'II',
			name: 'Mercadería y Nomenclatura',
			articleStart: 9,
			articleEnd: 12,
		},
		{
			id: 'ca-s01-titulo-3',
			sectionId: 'codigo-aduanero-s01',
			lawId: 'codigo-aduanero',
			number: 'III',
			name: 'Origen y Procedencia',
			articleStart: 13,
			articleEnd: 16,
		},
	],
};

export const ARTICLES_01: Article[] = [
	{
		id: 'ca-art-1',
		lawId: 'codigo-aduanero',
		number: '1',
		title: 'Ámbito de aplicación',
		originalText:
			'Las disposiciones de este código rigen en todo el ámbito terrestre, acuático y aéreo sometido a la soberanía de la Nación Argentina, así como también en los enclaves constituidos a su favor.',
		currentText:
			'Las disposiciones de este código rigen en todo el ámbito terrestre, acuático y aéreo sometido a la soberanía de la Nación Argentina, así como también en los enclaves constituidos a su favor.',
		plainLanguageExplanation:
			'El Código Aduanero rige en todo el territorio argentino (tierra, agua y aire) y también en los enclaves: zonas fuera del país donde por tratado internacional se aplica la legislación argentina.',
		practicalEffects: [
			'Aplica en puertos, aeropuertos, fronteras terrestres y ríos navegables internacionales',
			'Incluye los enclaves constituidos a favor de Argentina por convenio internacional',
			'No tiene límite geográfico dentro del espacio soberano argentino',
		],
		examples: ['El control aduanero en el Aeropuerto de Ezeiza o en el Puerto de Buenos Aires opera bajo este código'],
		relatedArticles: ['ca-art-2', 'ca-art-3', 'ca-art-4'],
		jurisprudence: [],
		regulations: [],
		keywords: ['ámbito de aplicación', 'soberanía', 'enclave', 'territorio', 'código aduanero'],
		order: 1,
		segments: [],
		amendments: [],
	},
	{
		id: 'ca-art-2',
		lawId: 'codigo-aduanero',
		number: '2',
		title: 'Territorio aduanero',
		originalText:
			'1. Territorio aduanero es la parte del ámbito mencionado en el artículo 1, en la que se aplica un mismo sistema arancelario y de prohibiciones de carácter económico a las importaciones y a las exportaciones.\n2. Territorio aduanero general es aquél en el cual es aplicable el sistema general arancelario y de prohibiciones de carácter económico a las importaciones y a las exportaciones.\n3. Territorio aduanero especial o área aduanera especial es aquél en el cual es aplicable un sistema especial arancelario y de prohibiciones de carácter económico a las importaciones y a las exportaciones.',
		currentText:
			'1. Territorio aduanero es la parte del ámbito mencionado en el artículo 1, en la que se aplica un mismo sistema arancelario y de prohibiciones de carácter económico a las importaciones y a las exportaciones.\n2. Territorio aduanero general es aquél en el cual es aplicable el sistema general arancelario y de prohibiciones de carácter económico a las importaciones y a las exportaciones.\n3. Territorio aduanero especial o área aduanera especial es aquél en el cual es aplicable un sistema especial arancelario y de prohibiciones de carácter económico a las importaciones y a las exportaciones.',
		plainLanguageExplanation:
			'El "territorio aduanero" es la zona donde rige un sistema de aranceles y prohibiciones económicas. Hay dos tipos: el general (la mayor parte del país) y el especial (zonas con régimen diferenciado, como Tierra del Fuego).',
		practicalEffects: [
			'El territorio aduanero general tiene los aranceles comunes para importar y exportar',
			'El territorio aduanero especial (como Tierra del Fuego) tiene aranceles e impuestos distintos, generalmente reducidos',
			'No todo el espacio soberano argentino es "territorio aduanero" — el mar territorial queda afuera',
		],
		examples: [
			'Tierra del Fuego es un territorio aduanero especial: muchos productos tienen arancel 0% o beneficios impositivos que no rigen en el resto del país',
		],
		relatedArticles: ['ca-art-1', 'ca-art-3'],
		jurisprudence: [],
		regulations: ['Ley 19.640 — Régimen especial Tierra del Fuego'],
		keywords: [
			'territorio aduanero',
			'territorio aduanero general',
			'territorio aduanero especial',
			'aranceles',
			'área aduanera especial',
		],
		order: 2,
		segments: [
			{
				id: 'ca-art2-num-1',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-2',
				articleNumber: '2',
				segmentType: 'PARAGRAPH',
				originalText:
					'1. Territorio aduanero es la parte del ámbito mencionado en el artículo 1, en la que se aplica un mismo sistema arancelario y de prohibiciones de carácter económico a las importaciones y a las exportaciones.',
				plainExplanation:
					'Definición general: territorio aduanero es la zona del espacio soberano argentino donde rige un sistema uniforme de aranceles y restricciones económicas al comercio exterior.',
				practicalExample:
					'Cuando se importa un televisor desde Corea del Sur, al ingresar al territorio aduanero argentino se aplica el arancel del 35% y las prohibiciones económicas vigentes. Ese mismo televisor no pagaría ese arancel si ingresara a Tierra del Fuego, que es territorio aduanero especial con régimen diferente.',
				references: ['Art. 1'],
				order: 1,
			},
			{
				id: 'ca-art2-num-2',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-2',
				articleNumber: '2',
				segmentType: 'PARAGRAPH',
				originalText:
					'2. Territorio aduanero general es aquél en el cual es aplicable el sistema general arancelario y de prohibiciones de carácter económico a las importaciones y a las exportaciones.',
				plainExplanation:
					'El territorio aduanero general es la mayor parte del país continental: rige el régimen arancelario común sin beneficios especiales.',
				practicalExample: 'Buenos Aires, Córdoba, Rosario y todo el continente son territorio aduanero general.',
				references: [],
				order: 2,
			},
			{
				id: 'ca-art2-num-3',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-2',
				articleNumber: '2',
				segmentType: 'PARAGRAPH',
				originalText:
					'3. Territorio aduanero especial o área aduanera especial es aquél en el cual es aplicable un sistema especial arancelario y de prohibiciones de carácter económico a las importaciones y a las exportaciones.',
				plainExplanation:
					'El territorio aduanero especial tiene un régimen de aranceles diferente al general. Se crea por ley para regiones específicas con fines de fomento económico.',
				practicalExample:
					'Tierra del Fuego (Ley 19.640) es territorio aduanero especial: importar bienes al resto del país desde allí paga arancel, como si fuera una importación del exterior.',
				references: [],
				order: 3,
			},
		],
		amendments: [],
	},
	{
		id: 'ca-art-3',
		lawId: 'codigo-aduanero',
		number: '3',
		title: 'Exclusiones del territorio aduanero',
		originalText:
			'No constituye territorio aduanero, ni general ni especial:\na) el mar territorial argentino y los ríos internacionales;\nb) las áreas francas;\nc) los exclaves;\nd) los espacios aéreos correspondientes a los ámbitos a que se refieren los incisos precedentes;\ne) el lecho y subsuelo submarinos nacionales.\nEn estos ámbitos se aplican los regímenes aduaneros que para cada caso se contemplan en este código.',
		currentText:
			'No constituye territorio aduanero, ni general ni especial:\na) el mar territorial argentino y los ríos internacionales;\nb) las áreas francas;\nc) los exclaves;\nd) los espacios aéreos correspondientes a los ámbitos a que se refieren los incisos precedentes;\ne) el lecho y subsuelo submarinos nacionales.\nEn estos ámbitos se aplican los regímenes aduaneros que para cada caso se contemplan en este código.',
		plainLanguageExplanation:
			'Hay zonas argentinas que no son "territorio aduanero" pero no están desreguladas: el propio Código tiene regímenes especiales para cada una.',
		practicalEffects: [
			'Las áreas francas están excluidas del régimen aduanero general',
			'El mar territorial argentino no es territorio aduanero pero tiene su propio régimen de control',
			'Un exporte desde un área franca no paga derechos de exportación del territorio aduanero general',
		],
		examples: [
			'Una empresa en el Área Franca de La Plata opera fuera del territorio aduanero: no paga IVA ni aranceles en sus operaciones internas al área',
		],
		relatedArticles: ['ca-art-2', 'ca-art-4'],
		jurisprudence: [],
		regulations: [],
		keywords: ['áreas francas', 'mar territorial', 'exclave', 'exclusiones territorio aduanero', 'subsuelo submarino'],
		order: 3,
		segments: [
			{
				id: 'ca-art3-intro',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-3',
				articleNumber: '3',
				segmentType: 'PARAGRAPH',
				originalText: 'No constituye territorio aduanero, ni general ni especial:',
				plainExplanation:
					'Lista taxativa de ámbitos excluidos del territorio aduanero. La exclusión no implica ausencia de control: cada uno tiene su propio régimen en el Código.',
				practicalExample: null,
				references: [],
				order: 1,
			},
			{
				id: 'ca-art3-inciso-a',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-3',
				articleNumber: '3',
				segmentType: 'INCISO',
				originalText: 'a) el mar territorial argentino y los ríos internacionales;',
				plainExplanation:
					'El mar territorial (hasta 12 millas náuticas desde la costa) y los ríos compartidos con otros países (Paraná, Uruguay, Pilcomayo) quedan fuera del territorio aduanero.',
				practicalExample:
					'Un barco que navega en el Río Uruguay transportando mercadería no está en territorio aduanero argentino: no rige el sistema arancelario general. Cuando esa mercadería desembarca en un puerto argentino, recién "ingresa" al territorio aduanero y queda sujeta a control.',
				references: ['Art. 8'],
				order: 2,
			},
			{
				id: 'ca-art3-inciso-b',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-3',
				articleNumber: '3',
				segmentType: 'INCISO',
				originalText: 'b) las áreas francas;',
				plainExplanation:
					'Las áreas francas son zonas habilitadas donde la mercadería puede ingresar, almacenarse y transformarse sin pagar tributos aduaneros, hasta que ingrese al territorio aduanero general.',
				practicalExample:
					'El Área Franca de La Plata: las empresas almacenan mercadería importada sin pagar aranceles hasta decidir introducirla al mercado interno.',
				references: [],
				order: 3,
			},
			{
				id: 'ca-art3-inciso-c',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-3',
				articleNumber: '3',
				segmentType: 'INCISO',
				originalText: 'c) los exclaves;',
				plainExplanation:
					'Los exclaves son zonas de soberanía argentina donde, por convenio internacional, rige la legislación aduanera de otro Estado. Por eso están fuera del territorio aduanero argentino.',
				practicalExample:
					'Si Argentina cediera por convenio bilateral el control aduanero de un punto fronterizo a Bolivia (para facilitar el tránsito de exportaciones bolivinas), ese punto sería un exclave: suelo argentino, pero aduana boliviana.',
				references: ['Art. 4'],
				order: 4,
			},
			{
				id: 'ca-art3-inciso-d',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-3',
				articleNumber: '3',
				segmentType: 'INCISO',
				originalText: 'd) los espacios aéreos correspondientes a los ámbitos a que se refieren los incisos precedentes;',
				plainExplanation:
					'El espacio aéreo sobre el mar territorial, ríos internacionales, áreas francas y exclaves también queda fuera del territorio aduanero.',
				practicalExample: null,
				references: [],
				order: 5,
			},
			{
				id: 'ca-art3-inciso-e',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-3',
				articleNumber: '3',
				segmentType: 'INCISO',
				originalText: 'e) el lecho y subsuelo submarinos nacionales.',
				plainExplanation:
					'El fondo marino y el subsuelo bajo aguas argentinas (plataforma continental) tampoco son territorio aduanero, aunque Argentina ejerce soberanía sobre los recursos allí existentes.',
				practicalExample:
					'Una plataforma petrolífera que opera en el lecho marino argentino a 200 km de la costa no está en territorio aduanero. Cuando el petróleo extraído se transporta a tierra para su refinación, en ese momento ingresa al territorio aduanero y quedan habilitados los controles.',
				references: [],
				order: 6,
			},
			{
				id: 'ca-art3-cierre',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-3',
				articleNumber: '3',
				segmentType: 'PARAGRAPH',
				originalText: 'En estos ámbitos se aplican los regímenes aduaneros que para cada caso se contemplan en este código.',
				plainExplanation:
					'La exclusión del "territorio aduanero" no significa libre circulación: cada ámbito tiene su propio régimen específico regulado en otras secciones del Código.',
				practicalExample: null,
				references: [],
				order: 7,
			},
		],
		amendments: [],
	},
	{
		id: 'ca-art-4',
		lawId: 'codigo-aduanero',
		number: '4',
		title: 'Enclave y exclave',
		originalText:
			'1. Enclave es el ámbito sometido a la soberanía de otro Estado, en el cual, en virtud de un convenio internacional, se permite la aplicación de la legislación aduanera nacional.\n2. Exclave es el ámbito, sometido a la soberanía de la Nación Argentina, en el cual, en virtud de un convenio internacional, se permite la aplicación de la legislación aduanera de otro Estado.',
		currentText:
			'1. Enclave es el ámbito sometido a la soberanía de otro Estado, en el cual, en virtud de un convenio internacional, se permite la aplicación de la legislación aduanera nacional.\n2. Exclave es el ámbito, sometido a la soberanía de la Nación Argentina, en el cual, en virtud de un convenio internacional, se permite la aplicación de la legislación aduanera de otro Estado.',
		plainLanguageExplanation:
			'Enclave = territorio extranjero donde Argentina aplica su aduana. Exclave = territorio argentino donde aplica la aduana de otro Estado. Ambas figuras requieren convenio internacional.',
		practicalEffects: [
			'Los enclaves quedan sujetos a control aduanero argentino aunque estén en suelo extranjero',
			'Los exclaves, pese a ser territorio soberano argentino, se rigen por reglas aduaneras del otro Estado',
		],
		examples: ['Una aduana argentina establecida en territorio uruguayo por convenio bilateral sería un enclave'],
		relatedArticles: ['ca-art-1', 'ca-art-3', 'ca-art-16'],
		jurisprudence: [],
		regulations: [],
		keywords: ['enclave', 'exclave', 'convenio internacional', 'soberanía', 'legislación aduanera'],
		order: 4,
		segments: [
			{
				id: 'ca-art4-num-1',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-4',
				articleNumber: '4',
				segmentType: 'PARAGRAPH',
				originalText:
					'1. Enclave es el ámbito sometido a la soberanía de otro Estado, en el cual, en virtud de un convenio internacional, se permite la aplicación de la legislación aduanera nacional.',
				plainExplanation:
					'Enclave: territorio de OTRO país donde, por tratado, rige la legislación aduanera ARGENTINA. Argentina tiene jurisdicción aduanera allí aunque no tenga soberanía territorial.',
				practicalExample:
					'Una aduana argentina habilitada en suelo uruguayo por convenio bilateral sería un enclave: se controla con ley argentina aunque sea territorio uruguayo.',
				references: [],
				order: 1,
			},
			{
				id: 'ca-art4-num-2',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-4',
				articleNumber: '4',
				segmentType: 'PARAGRAPH',
				originalText:
					'2. Exclave es el ámbito, sometido a la soberanía de la Nación Argentina, en el cual, en virtud de un convenio internacional, se permite la aplicación de la legislación aduanera de otro Estado.',
				plainExplanation:
					'Exclave: territorio ARGENTINO donde, por tratado, rige la legislación aduanera de OTRO Estado. Argentina mantiene soberanía pero cede el control aduanero.',
				practicalExample:
					'Un ejemplo hipotético: si por convenio bilateral con Paraguay se habilitara un depósito franco dentro de territorio argentino donde los funcionarios paraguayos aplican su legislación aduanera para la mercadería en tránsito hacia Paraguay, ese depósito sería un exclave argentino.',
				references: [],
				order: 2,
			},
		],
		amendments: [],
	},
	{
		id: 'ca-art-5',
		lawId: 'codigo-aduanero',
		number: '5',
		title: 'Zona primaria aduanera',
		originalText:
			'1. Zona primaria aduanera es aquella parte del territorio aduanero habilitada para la ejecución de operaciones aduaneras o afectada al control de las mismas, en la que rigen normas especiales para la circulación de personas y el movimiento y disposición de la mercadería.\n2. La zona primaria aduanera comprende, en particular:\na) los locales, instalaciones, depósitos, plazoletas y demás lugares en donde se realizaren operaciones aduaneras o se ejerciere el control aduanero;\nb) los puertos, muelles, atracaderos, aeropuertos y pasos fronterizos;\nc) los espejos de agua de las radas y puertos adyacentes a los espacios enumerados en los incisos a) y b) de este artículo;\nd) los demás lugares que cumplieren una función similar a la de los mencionados en los incisos a), b) y c) de este artículo, que determinare la reglamentación;\ne) los espacios aéreos correspondientes a los lugares mencionados en los incisos precedentes.',
		currentText:
			'1. Zona primaria aduanera es aquella parte del territorio aduanero habilitada para la ejecución de operaciones aduaneras o afectada al control de las mismas, en la que rigen normas especiales para la circulación de personas y el movimiento y disposición de la mercadería.\n2. La zona primaria aduanera comprende, en particular:\na) los locales, instalaciones, depósitos, plazoletas y demás lugares en donde se realizaren operaciones aduaneras o se ejerciere el control aduanero;\nb) los puertos, muelles, atracaderos, aeropuertos y pasos fronterizos;\nc) los espejos de agua de las radas y puertos adyacentes a los espacios enumerados en los incisos a) y b) de este artículo;\nd) los demás lugares que cumplieren una función similar a la de los mencionados en los incisos a), b) y c) de este artículo, que determinare la reglamentación;\ne) los espacios aéreos correspondientes a los lugares mencionados en los incisos precedentes.',
		plainLanguageExplanation:
			'La zona primaria es la "primera línea" de control aduanero: puertos, aeropuertos, pasos fronterizos, depósitos fiscales. Aquí rigen normas estrictas sobre personas y mercaderías.',
		practicalEffects: [
			'En zona primaria la aduana tiene facultades de inspección directa sobre personas y mercaderías',
			'Sin habilitación aduanera, no se puede operar comercialmente en zona primaria',
			'El ingreso y egreso de personas en zona primaria está sujeto a controles especiales',
		],
		examples: [
			'Los galpones de depósito en el Puerto de Buenos Aires son zona primaria aduanera',
			'La terminal de cargas del Aeropuerto de Ezeiza es zona primaria: se necesita autorización para ingresar',
		],
		relatedArticles: ['ca-art-6', 'ca-art-7'],
		jurisprudence: [],
		regulations: [],
		keywords: ['zona primaria aduanera', 'puerto', 'aeropuerto', 'depósito fiscal', 'control aduanero', 'paso fronterizo'],
		order: 5,
		segments: [
			{
				id: 'ca-art5-num-1',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-5',
				articleNumber: '5',
				segmentType: 'PARAGRAPH',
				originalText:
					'1. Zona primaria aduanera es aquella parte del territorio aduanero habilitada para la ejecución de operaciones aduaneras o afectada al control de las mismas, en la que rigen normas especiales para la circulación de personas y el movimiento y disposición de la mercadería.',
				plainExplanation:
					'Definición: la zona primaria es donde físicamente se realizan las operaciones de importación y exportación, con reglas estrictas de acceso para personas y mercaderías.',
				practicalExample:
					'El sector de verificación de cargas del Aeropuerto de Ezeiza es zona primaria: sin autorización aduanera no se puede circular ni retirar mercadería. Un camión que ingresa a ese sector queda sujeto a inspección y no puede salir con la carga sin el despacho correspondiente.',
				references: [],
				order: 1,
			},
			{
				id: 'ca-art5-num-2',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-5',
				articleNumber: '5',
				segmentType: 'PARAGRAPH',
				originalText:
					'2. La zona primaria aduanera comprende, en particular:\na) los locales, instalaciones, depósitos, plazoletas y demás lugares en donde se realizaren operaciones aduaneras o se ejerciere el control aduanero;\nb) los puertos, muelles, atracaderos, aeropuertos y pasos fronterizos;\nc) los espejos de agua de las radas y puertos adyacentes a los espacios enumerados en los incisos a) y b) de este artículo;\nd) los demás lugares que cumplieren una función similar a la de los mencionados en los incisos a), b) y c) de este artículo, que determinare la reglamentación;\ne) los espacios aéreos correspondientes a los lugares mencionados en los incisos precedentes.',
				plainExplanation:
					'Enumeración (no taxativa) de qué lugares integran la zona primaria:\n— inc. a) Depósitos fiscales, playas de contenedores, oficinas de verificación\n— inc. b) Puertos, aeropuertos, pasos fronterizos\n— inc. c) Espejos de agua junto a puertos\n— inc. d) Otros lugares habilitados por reglamento\n— inc. e) Espacio aéreo sobre todos ellos',
				practicalExample:
					'El Puerto de Buenos Aires, el Aeropuerto de Ezeiza y los pasos Paso de los Libres y La Quiaca son zona primaria aduanera.',
				references: [],
				order: 2,
			},
		],
		amendments: [],
	},
	{
		id: 'ca-art-6',
		lawId: 'codigo-aduanero',
		number: '6',
		title: 'Zona secundaria aduanera',
		originalText: 'El territorio aduanero, excluida la zona primaria, constituye zona secundaria aduanera.',
		currentText: 'El territorio aduanero, excluida la zona primaria, constituye zona secundaria aduanera.',
		plainLanguageExplanation:
			'Todo el territorio aduanero que no es zona primaria es zona secundaria: el interior del país, ciudades, rutas. La aduana también tiene poderes de control aquí, pero menos intensos.',
		practicalEffects: [
			'En zona secundaria la aduana puede controlar el transporte de mercaderías en tránsito',
			'La DGA puede establecer zonas de vigilancia especial dentro de la zona secundaria en fronteras',
		],
		examples: [
			'La ruta nacional 34 en Salta, cerca de la frontera boliviana, es zona secundaria aduanera y puede ser objeto de controles de tránsito',
		],
		relatedArticles: ['ca-art-5', 'ca-art-7'],
		jurisprudence: [],
		regulations: [],
		keywords: ['zona secundaria aduanera', 'territorio aduanero', 'control aduanero'],
		order: 6,
		segments: [],
		amendments: [],
	},
	{
		id: 'ca-art-7',
		lawId: 'codigo-aduanero',
		number: '7',
		title: 'Zona de vigilancia especial',
		originalText:
			'1. Zona de vigilancia especial es la franja de la zona secundaria aduanera sometida a disposiciones especiales de control, que se extiende:\na) en las fronteras terrestres del territorio aduanero, entre el límite de éste y una línea interna paralela trazada a una distancia que se determinará reglamentariamente;\nb) en las fronteras acuáticas del territorio aduanero, entre la costa de éste y una línea interna paralela trazada a una distancia que se determinará reglamentariamente;\nc) entre las riberas de los ríos internacionales y nacionales de navegación internacional y una línea interna paralela trazada a una distancia que se determinará reglamentariamente;\nd) en todo el curso de los ríos nacionales de navegación internacional;\ne) a los espacios aéreos correspondientes a los lugares mencionados en los incisos precedentes.\n2. En los incisos a), b) y c) del apartado 1, la distancia a determinarse no podrá exceder de cien kilómetros del límite correspondiente.\n3. Salvo disposición expresa en contrario, los enclaves constituidos a favor de la Nación y sus correspondientes espacios aéreos constituyen zona de vigilancia especial, en cuanto no integraren la zona primaria aduanera.',
		currentText:
			'1. Zona de vigilancia especial es la franja de la zona secundaria aduanera sometida a disposiciones especiales de control, que se extiende:\na) en las fronteras terrestres del territorio aduanero, entre el límite de éste y una línea interna paralela trazada a una distancia que se determinará reglamentariamente;\nb) en las fronteras acuáticas del territorio aduanero, entre la costa de éste y una línea interna paralela trazada a una distancia que se determinará reglamentariamente;\nc) entre las riberas de los ríos internacionales y nacionales de navegación internacional y una línea interna paralela trazada a una distancia que se determinará reglamentariamente;\nd) en todo el curso de los ríos nacionales de navegación internacional;\ne) a los espacios aéreos correspondientes a los lugares mencionados en los incisos precedentes.\n2. En los incisos a), b) y c) del apartado 1, la distancia a determinarse no podrá exceder de cien kilómetros del límite correspondiente.\n3. Salvo disposición expresa en contrario, los enclaves constituidos a favor de la Nación y sus correspondientes espacios aéreos constituyen zona de vigilancia especial, en cuanto no integraren la zona primaria aduanera.',
		plainLanguageExplanation:
			'Franja especial dentro de la zona secundaria que rodea los límites del territorio aduanero (hasta 100 km desde el límite). La aduana tiene poderes de control reforzados para prevenir el contrabando.',
		practicalEffects: [
			'La aduana puede realizar controles de vehículos y personas sin orden judicial previa',
			'El transporte de mercaderías en esta zona requiere documentación especial',
			'La distancia máxima es 100 km desde el límite, la exacta la fija el reglamento',
		],
		examples: ['La ciudad de Posadas (Misiones), a metros del límite con Paraguay, está en zona de vigilancia especial'],
		relatedArticles: ['ca-art-5', 'ca-art-6', 'ca-art-8'],
		jurisprudence: [],
		regulations: [],
		keywords: [
			'zona de vigilancia especial',
			'frontera',
			'control aduanero',
			'cien kilómetros',
			'contrabando',
			'ríos internacionales',
		],
		order: 7,
		segments: [
			{
				id: 'ca-art7-num-1',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-7',
				articleNumber: '7',
				segmentType: 'PARAGRAPH',
				originalText:
					'1. Zona de vigilancia especial es la franja de la zona secundaria aduanera sometida a disposiciones especiales de control, que se extiende:\na) en las fronteras terrestres del territorio aduanero, entre el límite de éste y una línea interna paralela trazada a una distancia que se determinará reglamentariamente;\nb) en las fronteras acuáticas del territorio aduanero, entre la costa de éste y una línea interna paralela trazada a una distancia que se determinará reglamentariamente;\nc) entre las riberas de los ríos internacionales y nacionales de navegación internacional y una línea interna paralela trazada a una distancia que se determinará reglamentariamente;\nd) en todo el curso de los ríos nacionales de navegación internacional;\ne) a los espacios aéreos correspondientes a los lugares mencionados en los incisos precedentes.',
				plainExplanation:
					'Definición y ámbito: la zona de vigilancia especial es una franja de seguridad dentro de la zona secundaria que cubre:\n— inc. a) Fronteras terrestres (hasta X km hacia adentro)\n— inc. b) Costas acuáticas\n— inc. c) Riberas de ríos internacionales\n— inc. d) Todo el curso de ríos navegables internacionales\n— inc. e) Los espacios aéreos sobre todo lo anterior',
				practicalExample:
					'Las rutas que corren paralelas a la frontera con Bolivia o Brasil están en zona de vigilancia especial y pueden ser objeto de control aduanero sin orden judicial.',
				references: [],
				order: 1,
			},
			{
				id: 'ca-art7-num-2',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-7',
				articleNumber: '7',
				segmentType: 'PARAGRAPH',
				originalText:
					'2. En los incisos a), b) y c) del apartado 1, la distancia a determinarse no podrá exceder de cien kilómetros del límite correspondiente.',
				plainExplanation:
					'Límite máximo: la zona de vigilancia especial no puede extenderse más de 100 km desde el límite fronterizo. La distancia exacta la fija el Poder Ejecutivo por reglamento.',
				practicalExample:
					'Si la reglamentación fijara 50 km, una ciudad a 60 km de la frontera ya no estaría en zona de vigilancia especial.',
				references: [],
				order: 2,
			},
			{
				id: 'ca-art7-num-3',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-7',
				articleNumber: '7',
				segmentType: 'PARAGRAPH',
				originalText:
					'3. Salvo disposición expresa en contrario, los enclaves constituidos a favor de la Nación y sus correspondientes espacios aéreos constituyen zona de vigilancia especial, en cuanto no integraren la zona primaria aduanera.',
				plainExplanation:
					'Los enclaves argentinos en el exterior que no sean zona primaria son automáticamente zona de vigilancia especial, salvo norma expresa en contrario.',
				practicalExample: null,
				references: ['Art. 4'],
				order: 3,
			},
		],
		amendments: [],
	},
	{
		id: 'ca-art-8',
		lawId: 'codigo-aduanero',
		number: '8',
		title: 'Zona marítima aduanera',
		originalText:
			'Zona marítima aduanera es la franja del mar territorial argentino y de la parte de los ríos internacionales sometida a la soberanía de la Nación Argentina, comprendidos sus espacios aéreos, que se encuentra sujeta a disposiciones especiales de control y que se extiende entre la costa, medida desde la línea de las más bajas mareas, y una línea externa paralela a ella, trazada a una distancia que se determinará reglamentariamente. La distancia entre estas dos líneas, que conforman la franja, no podrá exceder de veinte kilómetros.',
		currentText:
			'Zona marítima aduanera es la franja del mar territorial argentino y de la parte de los ríos internacionales sometida a la soberanía de la Nación Argentina, comprendidos sus espacios aéreos, que se encuentra sujeta a disposiciones especiales de control y que se extiende entre la costa, medida desde la línea de las más bajas mareas, y una línea externa paralela a ella, trazada a una distancia que se determinará reglamentariamente. La distancia entre estas dos líneas, que conforman la franja, no podrá exceder de veinte kilómetros.',
		plainLanguageExplanation:
			'Franja costera (hasta 20 km desde la bajamar) del mar territorial y ríos internacionales argentinos. Equivalente marítimo de la zona de vigilancia especial terrestre.',
		practicalEffects: [
			'Los buques en esta franja pueden ser inspeccionados por la aduana',
			'El límite de 20 km se mide desde la línea de las más bajas mareas',
			'Aplica sobre la parte argentina de ríos internacionales como el Paraná y el Uruguay',
		],
		examples: ['Un barco que navega a 10 km de la costa bonaerense transportando mercadería está en zona marítima aduanera'],
		relatedArticles: ['ca-art-7'],
		jurisprudence: [],
		regulations: [],
		keywords: ['zona marítima aduanera', 'mar territorial', 'ríos internacionales', 'control marítimo', 'franja costera'],
		order: 8,
		segments: [],
		amendments: [],
	},
	{
		id: 'ca-art-9',
		lawId: 'codigo-aduanero',
		number: '9',
		title: 'Importación y exportación',
		originalText:
			'1. Importación es la introducción de cualquier mercadería a un territorio aduanero.\n2. Exportación es la extracción de cualquier mercadería de un territorio aduanero.',
		currentText:
			'1. Importación es la introducción de cualquier mercadería a un territorio aduanero.\n2. Exportación es la extracción de cualquier mercadería de un territorio aduanero.',
		plainLanguageExplanation:
			'Definiciones centrales del CA: importar = meter mercadería en el territorio aduanero; exportar = sacarla. La referencia es al "territorio aduanero", no al territorio nacional.',
		practicalEffects: [
			'La introducción de mercadería desde un área franca al territorio aduanero general es una "importación"',
			'La exportación incluye toda extracción, independientemente del destino final',
			'No es necesario que haya finalidad comercial: el viajero que trae mercadería también "importa"',
		],
		examples: [
			'Un viajero que trae un celular de Estados Unidos está importando: introdujo mercadería al territorio aduanero',
			'Una empresa que saca granos hacia Brasil está exportando: extrae mercadería del territorio aduanero',
		],
		relatedArticles: ['ca-art-2', 'ca-art-10'],
		jurisprudence: [],
		regulations: [],
		keywords: ['importación', 'exportación', 'territorio aduanero', 'introducción', 'extracción', 'mercadería'],
		order: 9,
		segments: [
			{
				id: 'ca-art9-num-1',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-9',
				articleNumber: '9',
				segmentType: 'PARAGRAPH',
				originalText: '1. Importación es la introducción de cualquier mercadería a un territorio aduanero.',
				plainExplanation:
					'Importar = introducir mercadería dentro del territorio aduanero. No importa si viene del exterior del país o de una zona franca: ambos son importación.',
				practicalExample:
					'Un turista que trae ropa desde Chile introduce mercadería al territorio aduanero argentino → importa.',
				references: ['Art. 2'],
				order: 1,
			},
			{
				id: 'ca-art9-num-2',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-9',
				articleNumber: '9',
				segmentType: 'PARAGRAPH',
				originalText: '2. Exportación es la extracción de cualquier mercadería de un territorio aduanero.',
				plainExplanation:
					'Exportar = sacar mercadería del territorio aduanero. Tampoco requiere que el destino sea el extranjero: también es exportación sacar mercadería hacia una zona franca.',
				practicalExample:
					'Una empresa que envía soja desde Rosario a China extrae mercadería del territorio aduanero → exporta.',
				references: ['Art. 2'],
				order: 2,
			},
		],
		amendments: [],
	},
	{
		id: 'ca-art-10',
		lawId: 'codigo-aduanero',
		number: '10',
		title: 'Concepto de mercadería',
		originalText:
			'1. A los fines de este Código es mercadería todo objeto que fuere susceptible de ser importado o exportado.\n2. Se consideran igualmente a los fines de este Código como si se tratare de mercadería:\na) las locaciones y prestaciones de servicios realizadas en el exterior, cuya utilización o explotación efectiva se lleve a cabo en el país, excluido todo servicio que no se suministre en condiciones comerciales ni en competencia con uno o varios proveedores de servicios;\nb) los derechos de autor y derechos de propiedad intelectual.\nc) Las prestaciones de servicios realizadas en el país, cuya utilización o explotación efectiva se lleve a cabo en el exterior.\nEl PODER EJECUTIVO NACIONAL será el encargado de establecer las normas complementarias pertinentes, como así también las disposiciones del presente código que no resultarán de aplicación.',
		currentText:
			'1. A los fines de este Código es mercadería todo objeto que fuere susceptible de ser importado o exportado.\n2. Se consideran igualmente a los fines de este Código como si se tratare de mercadería:\na) las locaciones y prestaciones de servicios realizadas en el exterior, cuya utilización o explotación efectiva se lleve a cabo en el país, excluido todo servicio que no se suministre en condiciones comerciales ni en competencia con uno o varios proveedores de servicios;\nb) los derechos de autor y derechos de propiedad intelectual.\nc) Las prestaciones de servicios realizadas en el país, cuya utilización o explotación efectiva se lleve a cabo en el exterior.\nEl PODER EJECUTIVO NACIONAL será el encargado de establecer las normas complementarias pertinentes, como así también las disposiciones del presente código que no resultarán de aplicación.',
		plainLanguageExplanation:
			'Para el CA, "mercadería" es todo lo que puede importarse o exportarse. La Ley 25.063 amplió el concepto para incluir servicios y propiedad intelectual.',
		practicalEffects: [
			'Los servicios de software prestados desde el exterior son "mercadería" para el CA',
			'Los royalties y licencias de software pagados al exterior pueden quedar sujetos al régimen del CA',
			'Los servicios exportados (ej. desarrollo de software para clientes del exterior) también son mercadería',
		],
		examples: [
			'Una empresa argentina que paga licencias de software a Microsoft USA: ese servicio es "mercadería" importada',
		],
		relatedArticles: ['ca-art-9', 'ca-art-11'],
		jurisprudence: [],
		regulations: [],
		keywords: [
			'mercadería',
			'servicios',
			'propiedad intelectual',
			'derechos de autor',
			'economía digital',
			'objeto importable',
		],
		order: 10,
		segments: [
			{
				id: 'ca-art10-num-1',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-10',
				articleNumber: '10',
				segmentType: 'PARAGRAPH',
				originalText:
					'1. A los fines de este Código es mercadería todo objeto que fuere susceptible de ser importado o exportado.',
				plainExplanation:
					'Definición amplia original: cualquier cosa que pueda entrar o salir del territorio aduanero es "mercadería". No requiere que sea un bien físico tradicional.',
				practicalExample:
					'Una tonelada de soja, un celular, un repuesto automotriz, una obra de arte y un lingote de oro son todos "mercadería" para el CA. La amplitud de la definición permite aplicar el código a prácticamente cualquier objeto del comercio exterior.',
				references: [],
				order: 1,
			},
			{
				id: 'ca-art10-num-2',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-10',
				articleNumber: '10',
				segmentType: 'PARAGRAPH',
				originalText:
					'2. Se consideran igualmente a los fines de este Código como si se tratare de mercadería:\na) las locaciones y prestaciones de servicios realizadas en el exterior, cuya utilización o explotación efectiva se lleve a cabo en el país, excluido todo servicio que no se suministre en condiciones comerciales ni en competencia con uno o varios proveedores de servicios;\nb) los derechos de autor y derechos de propiedad intelectual.\nc) Las prestaciones de servicios realizadas en el país, cuya utilización o explotación efectiva se lleve a cabo en el exterior.\nEl PODER EJECUTIVO NACIONAL será el encargado de establecer las normas complementarias pertinentes, como así también las disposiciones del presente código que no resultarán de aplicación.',
				plainExplanation:
					'Ampliación legal (Ley 25.063 + 27.467): también son "mercadería":\n— inc. a) Servicios prestados en el exterior y usados en Argentina (ej. Netflix, software cloud)\n— inc. b) Derechos de autor y propiedad intelectual (ej. regalías, licencias)\n— inc. c) Servicios prestados en Argentina y usados en el exterior (ej. software exportado)\nEl PEN reglamenta qué disposiciones del CA se aplican a estos casos.',
				practicalExample:
					'Una empresa argentina que usa AWS (servicios cloud de Amazon USA) importa "mercadería" bajo el inc. a). Si exporta desarrollo de software a un cliente europeo, exporta "mercadería" bajo el inc. c).',
				references: [],
				order: 2,
			},
		],
		amendments: [
			{
				id: 'ca-art10-mod-25063',
				articleId: 'ca-art-10',
				modifyingLaw: 'Ley 25.063',
				modifyingDate: '1998-12-30',
				previousText: null,
				newText: null,
				description: 'Sustituyó el artículo para incorporar servicios y derechos de propiedad intelectual como mercadería.',
				createdAt: '2024-01-01T00:00:00.000Z',
			},
			{
				id: 'ca-art10-mod-27467',
				articleId: 'ca-art-10',
				modifyingLaw: 'Ley 27.467',
				modifyingDate: '2018-12-04',
				previousText: null,
				newText: null,
				description: 'Incorporó el inciso c) sobre servicios prestados en el país con utilización en el exterior.',
				createdAt: '2024-01-01T00:00:00.000Z',
			},
		],
	},
	{
		id: 'ca-art-11',
		lawId: 'codigo-aduanero',
		number: '11',
		title: 'Sistema Armonizado de clasificación',
		originalText:
			'1. En las normas que se dictaren para regular el tráfico internacional de mercadería, ésta se individualizará y clasificará de acuerdo con el Sistema Armonizado de Designación y Codificación de Mercancías, establecido por el Convenio Internacional del Sistema Armonizado de Designación y Codificación de Mercancías, elaborado bajo los auspicios del Consejo de Cooperación Aduanera, en Bruselas, con fecha 14 de junio de 1983 y modificado por su Protocolo de Enmienda hecho en Bruselas el 24 de junio de 1986, y sus Notas Explicativas.\n2. El Poder Ejecutivo por conducto de la Subsecretaría de Finanzas Públicas, mantendrá permanentemente actualizadas las versiones vigentes en la República, del Sistema Armonizado de Designación y Codificación de Mercancías y de sus Notas Explicativas, a medida que el Consejo de Cooperación Aduanera modificare sus textos oficiales.',
		currentText:
			'1. En las normas que se dictaren para regular el tráfico internacional de mercadería, ésta se individualizará y clasificará de acuerdo con el Sistema Armonizado de Designación y Codificación de Mercancías, establecido por el Convenio Internacional del Sistema Armonizado de Designación y Codificación de Mercancías, elaborado bajo los auspicios del Consejo de Cooperación Aduanera, en Bruselas, con fecha 14 de junio de 1983 y modificado por su Protocolo de Enmienda hecho en Bruselas el 24 de junio de 1986, y sus Notas Explicativas.\n2. El Poder Ejecutivo por conducto de la Subsecretaría de Finanzas Públicas, mantendrá permanentemente actualizadas las versiones vigentes en la República, del Sistema Armonizado de Designación y Codificación de Mercancías y de sus Notas Explicativas, a medida que el Consejo de Cooperación Aduanera modificare sus textos oficiales.',
		plainLanguageExplanation:
			'Toda mercadería en el comercio exterior se clasifica según el Sistema Armonizado (SA): un código numérico internacional. Ese código determina qué arancel paga la mercadería.',
		practicalEffects: [
			'La clasificación arancelaria (posición del SA) determina el arancel al importar o exportar',
			'Una clasificación incorrecta puede dar lugar a multas o liquidaciones adicionales',
			'El importador puede impugnar la clasificación asignada por la aduana',
		],
		examples: ['Un auto se clasifica en la posición 8703 del SA y paga arancel del 35% al importarse'],
		relatedArticles: ['ca-art-12'],
		jurisprudence: [
			'CSJN "Machinery SA" (1986) — base imponible en importación, valor en aduana y clasificación arancelaria',
		],
		regulations: ['Ley 24.206 — Adopción del Sistema Armonizado'],
		keywords: [
			'sistema armonizado',
			'clasificación arancelaria',
			'posición arancelaria',
			'nomenclatura',
			'Consejo de Cooperación Aduanera',
			'SA',
		],
		order: 11,
		segments: [
			{
				id: 'ca-art11-num-1',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-11',
				articleNumber: '11',
				segmentType: 'PARAGRAPH',
				originalText:
					'1. En las normas que se dictaren para regular el tráfico internacional de mercadería, ésta se individualizará y clasificará de acuerdo con el Sistema Armonizado de Designación y Codificación de Mercancías, establecido por el Convenio Internacional del Sistema Armonizado de Designación y Codificación de Mercancías, elaborado bajo los auspicios del Consejo de Cooperación Aduanera, en Bruselas, con fecha 14 de junio de 1983 y modificado por su Protocolo de Enmienda hecho en Bruselas el 24 de junio de 1986, y sus Notas Explicativas.',
				plainExplanation:
					'Argentina adopta el Sistema Armonizado (SA): un código de 6 dígitos acordado internacionalmente que identifica cualquier mercadería. Es el lenguaje común del comercio exterior mundial.',
				practicalExample:
					'El código SA 0901.11 identifica café sin tostar, sin descafeinar en todo el mundo: el mismo código vale en Argentina, China o Alemania.',
				references: [],
				order: 1,
			},
			{
				id: 'ca-art11-num-2',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-11',
				articleNumber: '11',
				segmentType: 'PARAGRAPH',
				originalText:
					'2. El Poder Ejecutivo por conducto de la Subsecretaría de Finanzas Públicas, mantendrá permanentemente actualizadas las versiones vigentes en la República, del Sistema Armonizado de Designación y Codificación de Mercancías y de sus Notas Explicativas, a medida que el Consejo de Cooperación Aduanera modificare sus textos oficiales.',
				plainExplanation:
					'El PEN debe mantener el SA actualizado en Argentina a medida que el Consejo de Cooperación Aduanera lo modifica. Las actualizaciones ocurren generalmente cada 5 años.',
				practicalExample: null,
				references: [],
				order: 2,
			},
		],
		amendments: [
			{
				id: 'ca-art11-mod-24206',
				articleId: 'ca-art-11',
				modifyingLaw: 'Ley 24.206',
				modifyingDate: '1993-08-06',
				previousText: null,
				newText: null,
				description: 'Sustituyó el artículo para adoptar el Sistema Armonizado de Designación y Codificación de Mercancías.',
				createdAt: '2024-01-01T00:00:00.000Z',
			},
		],
	},
	{
		id: 'ca-art-12',
		lawId: 'codigo-aduanero',
		number: '12',
		title: 'Facultades del Poder Ejecutivo en nomenclatura',
		originalText:
			'El Poder Ejecutivo podrá:\na) Desdoblar las partidas y subpartidas no subdivididas del Sistema Armonizado de Designación y Codificación de Mercancías (S.A.) mediante la creación de subpartidas e ítems, quedando igualmente facultado para sustituir, refundir y desdoblar dichas subdivisiones;\nb) Incorporar reglas generales de interpretación y notas a las Secciones, a sus Capítulos o a sus subpartidas, adicionales a las que integran el mencionado Sistema Armonizado de Designación y Codificación de Mercancías, como así también adiciones a sus Notas Explicativas, siempre que las reglas, notas y adiciones en cuestión resultaren compatibles con los textos a que se refiere el artículo 11 y con las Resoluciones del Consejo de Cooperación Aduanera en materia de nomenclatura.',
		currentText:
			'El Poder Ejecutivo podrá:\na) Desdoblar las partidas y subpartidas no subdivididas del Sistema Armonizado de Designación y Codificación de Mercancías (S.A.) mediante la creación de subpartidas e ítems, quedando igualmente facultado para sustituir, refundir y desdoblar dichas subdivisiones;\nb) Incorporar reglas generales de interpretación y notas a las Secciones, a sus Capítulos o a sus subpartidas, adicionales a las que integran el mencionado Sistema Armonizado de Designación y Codificación de Mercancías, como así también adiciones a sus Notas Explicativas, siempre que las reglas, notas y adiciones en cuestión resultaren compatibles con los textos a que se refiere el artículo 11 y con las Resoluciones del Consejo de Cooperación Aduanera en materia de nomenclatura.',
		plainLanguageExplanation:
			'El PEN puede agregar detalle al SA (más dígitos, más subdivisiones) y agregar notas interpretativas, siempre dentro del marco internacional. Así surge la Nomenclatura Común del Mercosur (NCM).',
		practicalEffects: [
			'El PEN crea subpartidas adicionales: de 6 dígitos internacionales a 8 o 12 dígitos nacionales',
			'Las notas adicionales explican cómo clasificar mercaderías en casos dudosos',
			'Las modificaciones deben respetar la compatibilidad con el SA internacional',
		],
		examples: [
			'La NCM (Nomenclatura Común del Mercosur) usa 8 dígitos: los 6 del SA + 2 regionales fijados bajo esta facultad',
		],
		relatedArticles: ['ca-art-11'],
		jurisprudence: [],
		regulations: ['Ley 24.206 — Adopción del Sistema Armonizado'],
		keywords: ['nomenclatura', 'NCM', 'sistema armonizado', 'desdoblar partidas', 'Poder Ejecutivo', 'subpartidas'],
		order: 12,
		segments: [
			{
				id: 'ca-art12-intro',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-12',
				articleNumber: '12',
				segmentType: 'PARAGRAPH',
				originalText: 'El Poder Ejecutivo podrá:',
				plainExplanation:
					'El artículo otorga al Poder Ejecutivo dos facultades específicas para adaptar la nomenclatura internacional a las necesidades nacionales.',
				practicalExample: null,
				references: [],
				order: 1,
			},
			{
				id: 'ca-art12-inciso-a',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-12',
				articleNumber: '12',
				segmentType: 'INCISO',
				originalText:
					'a) Desdoblar las partidas y subpartidas no subdivididas del Sistema Armonizado de Designación y Codificación de Mercancías (S.A.) mediante la creación de subpartidas e ítems, quedando igualmente facultado para sustituir, refundir y desdoblar dichas subdivisiones;',
				plainExplanation:
					'El PEN puede crear posiciones arancelarias más específicas que las 6 dígitos del SA, llegando a 8 (Mercosur/NCM) o más dígitos nacionales.',
				practicalExample:
					'La NCM 8471.30.11 para "laptops de uso personal" es una subdivisión argentina dentro de la posición SA 8471 para máquinas de tratamiento de información.',
				references: [],
				order: 2,
			},
			{
				id: 'ca-art12-inciso-b',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-12',
				articleNumber: '12',
				segmentType: 'INCISO',
				originalText:
					'b) Incorporar reglas generales de interpretación y notas a las Secciones, a sus Capítulos o a sus subpartidas, adicionales a las que integran el mencionado Sistema Armonizado de Designación y Codificación de Mercancías, como así también adiciones a sus Notas Explicativas, siempre que las reglas, notas y adiciones en cuestión resultaren compatibles con los textos a que se refiere el artículo 11 y con las Resoluciones del Consejo de Cooperación Aduanera en materia de nomenclatura.',
				plainExplanation:
					'El PEN puede agregar notas interpretativas nacionales para aclarar cómo clasificar mercaderías en casos dudosos, siempre que sean compatibles con el SA internacional.',
				practicalExample:
					'Una "Nota Complementaria Argentina" puede aclarar que ciertos vinos espumosos se clasifican de una forma específica, resolviendo disputas frecuentes con la aduana.',
				references: ['Art. 11'],
				order: 3,
			},
		],
		amendments: [
			{
				id: 'ca-art12-mod-24206',
				articleId: 'ca-art-12',
				modifyingLaw: 'Ley 24.206',
				modifyingDate: '1993-08-06',
				previousText: null,
				newText: null,
				description:
					'Sustituyó el artículo para adecuarlo al Sistema Armonizado de Designación y Codificación de Mercancías.',
				createdAt: '2024-01-01T00:00:00.000Z',
			},
		],
	},
	{
		id: 'ca-art-13',
		lawId: 'codigo-aduanero',
		number: '13',
		title: 'Nomenclatura Arancelaria (derogado)',
		originalText:
			'(Derogado por art. 4° de la Ley N° 24.206 B.O. 6/8/1993. Originalmente regulaba la Nomenclatura Arancelaria y de Avalúo, sistema de clasificación previo al Sistema Armonizado adoptado por Ley 24.206.)',
		currentText: '(Derogado)',
		plainLanguageExplanation:
			'Derogado por la Ley 24.206 (1993), que adoptó el Sistema Armonizado. Originalmente definía la "Nomenclatura Arancelaria y de Avalúo" (NAA), el sistema de clasificación vigente al sancionarse el Código en 1981. Fue reemplazado por los (arts. 11-12) actuales.',
		practicalEffects: [],
		examples: [],
		relatedArticles: ['ca-art-11', 'ca-art-12'],
		jurisprudence: [],
		regulations: [],
		keywords: ['derogado', 'nomenclatura arancelaria', 'ley 24206'],
		order: 13,
		segments: [],
		amendments: [
			{
				id: 'ca-art13-derogado-24206',
				articleId: 'ca-art-13',
				modifyingLaw: 'Ley 24.206',
				modifyingDate: '1993-08-06',
				previousText: null,
				newText: null,
				description:
					'Artículo derogado. Regulaba la Nomenclatura Arancelaria y de Avalúo (NAA), reemplazada por el Sistema Armonizado.',
				createdAt: '2024-01-01T00:00:00.000Z',
			},
		],
	},
	{
		id: 'ca-art-14',
		lawId: 'codigo-aduanero',
		number: '14',
		title: 'Origen de la mercadería',
		originalText:
			'1. En ausencia de disposiciones especiales aplicables, el origen de la mercadería importada se determina de conformidad con las siguientes reglas:\na) la mercadería que fuere un producto natural es originaria del país en cuyo suelo, agua territorial, lecho y subsuelo submarinos o espacio aéreo hubiera nacido y sido criada, o hubiera sido cosechada, recolectada, extraída o aprehendida;\nb) la mercadería extraída en alta mar o en su espacio aéreo, por buques, aeronaves y demás medios de transporte o artefactos de cualquier tipo, es originaria del país al que correspondiere el pabellón o matrícula de aquéllos. Del mismo origen se considera el producto resultante de la transformación o del perfeccionamiento de dicha mercadería en alta mar o en su espacio aéreo, siempre que no hubiese mediado aporte de materia de otro país;\nc) la mercadería que fuere un producto manufacturado en un solo país, sin el aporte de materia de otro, es originaria del país donde hubiera sido fabricada;\nd) la mercadería que fuere un producto manufacturado en un solo país, con el aporte total o parcial de materia de otro, es originaria de aquél en el cual se hubiera realizado la transformación o el perfeccionamiento, siempre que dichos procesos hubieran variado las características de la mercadería de modo tal que ello implicare un cambio de la partida de la Nomenclatura aplicable;\ne) la mercadería que hubiera sufrido transformaciones o perfeccionamientos en distintos países, como consecuencia de las cuales se hubiesen variado sus características de modo tal que ello implicare un cambio de la partida de la Nomenclatura aplicable, es originaria del país al cual resultare atribuible el último cambio de partida;\nf) cuando no resultaren aplicables las reglas precedentes, la mercadería es originaria de aquel lugar en el que se la hubiere sometido a un proceso que le otorgare el mayor valor relativo en aduana al producto importado, y si fueren dos o más los que se encontraren en tales condiciones, la mercadería se considera originaria del último de ellos.\n2. Aun cuando fueren de aplicación las reglas previstas en los incisos d) y e) del apartado 1 de este artículo, el Poder Ejecutivo, por motivos fundados, podrá establecer que el origen de cierta especie de mercadería se determine por cualquiera de los siguientes métodos:\na) de conformidad con la regla prevista en el inciso f) del apartado 1 de este artículo;\nb) en función de una lista de transformaciones o perfeccionamientos que se consideren especialmente relevantes;\nc) conforme a otros criterios similares que se consideren idóneos a tales fines.\nEl Poder Ejecutivo podrá delegar la facultad prevista en este apartado en el Ministerio de Economía.',
		currentText:
			'1. En ausencia de disposiciones especiales aplicables, el origen de la mercadería importada se determina de conformidad con las siguientes reglas:\na) la mercadería que fuere un producto natural es originaria del país en cuyo suelo, agua territorial, lecho y subsuelo submarinos o espacio aéreo hubiera nacido y sido criada, o hubiera sido cosechada, recolectada, extraída o aprehendida;\nb) la mercadería extraída en alta mar o en su espacio aéreo, por buques, aeronaves y demás medios de transporte o artefactos de cualquier tipo, es originaria del país al que correspondiere el pabellón o matrícula de aquéllos. Del mismo origen se considera el producto resultante de la transformación o del perfeccionamiento de dicha mercadería en alta mar o en su espacio aéreo, siempre que no hubiese mediado aporte de materia de otro país;\nc) la mercadería que fuere un producto manufacturado en un solo país, sin el aporte de materia de otro, es originaria del país donde hubiera sido fabricada;\nd) la mercadería que fuere un producto manufacturado en un solo país, con el aporte total o parcial de materia de otro, es originaria de aquél en el cual se hubiera realizado la transformación o el perfeccionamiento, siempre que dichos procesos hubieran variado las características de la mercadería de modo tal que ello implicare un cambio de la partida de la Nomenclatura aplicable;\ne) la mercadería que hubiera sufrido transformaciones o perfeccionamientos en distintos países, como consecuencia de las cuales se hubiesen variado sus características de modo tal que ello implicare un cambio de la partida de la Nomenclatura aplicable, es originaria del país al cual resultare atribuible el último cambio de partida;\nf) cuando no resultaren aplicables las reglas precedentes, la mercadería es originaria de aquel lugar en el que se la hubiere sometido a un proceso que le otorgare el mayor valor relativo en aduana al producto importado, y si fueren dos o más los que se encontraren en tales condiciones, la mercadería se considera originaria del último de ellos.\n2. Aun cuando fueren de aplicación las reglas previstas en los incisos d) y e) del apartado 1 de este artículo, el Poder Ejecutivo, por motivos fundados, podrá establecer que el origen de cierta especie de mercadería se determine por cualquiera de los siguientes métodos:\na) de conformidad con la regla prevista en el inciso f) del apartado 1 de este artículo;\nb) en función de una lista de transformaciones o perfeccionamientos que se consideren especialmente relevantes;\nc) conforme a otros criterios similares que se consideren idóneos a tales fines.\nEl Poder Ejecutivo podrá delegar la facultad prevista en este apartado en el Ministerio de Economía.',
		plainLanguageExplanation:
			'El "origen" determina de qué país proviene la mercadería a efectos del arancel. Las reglas van de más simple a más complejo: productos naturales → su tierra; manufacturados en un país → ese país; con insumos de varios países → donde ocurrió el último cambio de posición arancelaria.',
		practicalEffects: [
			'El origen determina si la mercadería puede beneficiarse de preferencias arancelarias del Mercosur',
			'Un producto chino ensamblado en Brasil no es originario de Brasil si no hubo cambio de posición arancelaria',
			'La falsificación del origen para obtener preferencias arancelarias es infracción grave',
		],
		examples: [
			'Una tela hilada en Uruguay con fibra de algodón paraguayo es originaria de Uruguay si el proceso de hilar cambió la posición arancelaria',
		],
		relatedArticles: ['ca-art-15', 'ca-art-16'],
		jurisprudence: [],
		regulations: [],
		keywords: [
			'origen de mercadería',
			'reglas de origen',
			'cambio de partida',
			'valor agregado',
			'preferencias arancelarias',
			'Mercosur',
		],
		order: 14,
		segments: [
			{
				id: 'ca-art14-num-1',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-14',
				articleNumber: '14',
				segmentType: 'PARAGRAPH',
				originalText:
					'1. En ausencia de disposiciones especiales aplicables, el origen de la mercadería importada se determina de conformidad con las siguientes reglas:\na) la mercadería que fuere un producto natural es originaria del país en cuyo suelo, agua territorial, lecho y subsuelo submarinos o espacio aéreo hubiera nacido y sido criada, o hubiera sido cosechada, recolectada, extraída o aprehendida;\nb) la mercadería extraída en alta mar o en su espacio aéreo, por buques, aeronaves y demás medios de transporte o artefactos de cualquier tipo, es originaria del país al que correspondiere el pabellón o matrícula de aquéllos. Del mismo origen se considera el producto resultante de la transformación o del perfeccionamiento de dicha mercadería en alta mar o en su espacio aéreo, siempre que no hubiese mediado aporte de materia de otro país;\nc) la mercadería que fuere un producto manufacturado en un solo país, sin el aporte de materia de otro, es originaria del país donde hubiera sido fabricada;\nd) la mercadería que fuere un producto manufacturado en un solo país, con el aporte total o parcial de materia de otro, es originaria de aquél en el cual se hubiera realizado la transformación o el perfeccionamiento, siempre que dichos procesos hubieran variado las características de la mercadería de modo tal que ello implicare un cambio de la partida de la Nomenclatura aplicable;\ne) la mercadería que hubiera sufrido transformaciones o perfeccionamientos en distintos países, como consecuencia de las cuales se hubiesen variado sus características de modo tal que ello implicare un cambio de la partida de la Nomenclatura aplicable, es originaria del país al cual resultare atribuible el último cambio de partida;\nf) cuando no resultaren aplicables las reglas precedentes, la mercadería es originaria de aquel lugar en el que se la hubiere sometido a un proceso que le otorgare el mayor valor relativo en aduana al producto importado, y si fueren dos o más los que se encontraren en tales condiciones, la mercadería se considera originaria del último de ellos.',
				plainExplanation:
					'Las 6 reglas generales de origen (en orden de prioridad):\n— inc. a) Productos naturales: origen = donde crecieron/fueron extraídos\n— inc. b) Alta mar: origen = pabellón del barco/avión\n— inc. c) Manufactura en un solo país sin insumos extranjeros: ese país\n— inc. d) Manufactura con insumos de otro país: el país que hizo el cambio de partida\n— inc. e) Manufactura en varios países: el último en hacer cambio de partida\n— inc. f) Residual: el que agregó mayor valor en aduana',
				practicalExample:
					'Un televisor chino armado en Tierra del Fuego puede ser "de origen argentino" si el proceso productivo implica cambio de posición arancelaria (de partes sueltas a aparato terminado).',
				references: [],
				order: 1,
			},
			{
				id: 'ca-art14-num-2',
				lawId: 'codigo-aduanero',
				articleId: 'ca-art-14',
				articleNumber: '14',
				segmentType: 'PARAGRAPH',
				originalText:
					'2. Aun cuando fueren de aplicación las reglas previstas en los incisos d) y e) del apartado 1 de este artículo, el Poder Ejecutivo, por motivos fundados, podrá establecer que el origen de cierta especie de mercadería se determine por cualquiera de los siguientes métodos:\na) de conformidad con la regla prevista en el inciso f) del apartado 1 de este artículo;\nb) en función de una lista de transformaciones o perfeccionamientos que se consideren especialmente relevantes;\nc) conforme a otros criterios similares que se consideren idóneos a tales fines.\nEl Poder Ejecutivo podrá delegar la facultad prevista en este apartado en el Ministerio de Economía.',
				plainExplanation:
					'El PEN puede apartarse de las reglas d) y e) para determinadas mercaderías y usar criterios alternativos:\n— inc. a) Mayor valor agregado (regla f del apt. 1)\n— inc. b) Lista específica de transformaciones relevantes por tipo de producto\n— inc. c) Otros criterios equivalentes\nPuede delegar esta facultad en el Ministerio de Economía.',
				practicalExample:
					'Para los textiles, el PEN puede establecer que el origen se determine por el país donde se realizó el tejido, sin importar el cambio de partida arancelaria.',
				references: [],
				order: 2,
			},
		],
		amendments: [],
	},
	{
		id: 'ca-art-15',
		lawId: 'codigo-aduanero',
		number: '15',
		title: 'Procedencia de la mercadería',
		originalText:
			'En ausencia de disposiciones especiales aplicables, la mercadería se considera procedente del lugar del cual hubiera sido expedida con destino final al lugar de importación.',
		currentText:
			'En ausencia de disposiciones especiales aplicables, la mercadería se considera procedente del lugar del cual hubiera sido expedida con destino final al lugar de importación.',
		plainLanguageExplanation:
			'La "procedencia" es diferente del "origen": es el lugar desde donde fue expedida la mercadería con destino a Argentina. Un producto puede ser de origen chino pero de procedencia brasileña.',
		practicalEffects: [
			'La procedencia afecta la documentación requerida y algunos regímenes de control fitosanitario',
			'Un producto puede tener origen en un país y proceder de otro (tránsito o reexportación)',
		],
		examples: [
			'Un producto fabricado en China, enviado a un depósito en Chile y luego expedido a Argentina: origen China, procedencia Chile',
		],
		relatedArticles: ['ca-art-14', 'ca-art-16'],
		jurisprudence: [],
		regulations: [],
		keywords: ['procedencia', 'origen', 'lugar de expedición', 'destino final', 'importación'],
		order: 15,
		segments: [],
		amendments: [],
	},
	{
		id: 'ca-art-16',
		lawId: 'codigo-aduanero',
		number: '16',
		title: 'Enclaves y determinación de origen',
		originalText:
			'A los fines de la determinación del origen, y de la procedencia de la mercadería, los enclaves se consideran parte integrante del país a cuyo favor se hubieran constituido.',
		currentText:
			'A los fines de la determinación del origen, y de la procedencia de la mercadería, los enclaves se consideran parte integrante del país a cuyo favor se hubieran constituido.',
		plainLanguageExplanation:
			'Para determinar el origen o procedencia de la mercadería, un enclave argentino (territorio extranjero bajo régimen aduanero argentino) se considera parte de Argentina.',
		practicalEffects: [
			'La mercadería producida en un enclave argentino tiene origen Argentina a todos los efectos aduaneros',
		],
		examples: [],
		relatedArticles: ['ca-art-4', 'ca-art-14', 'ca-art-15'],
		jurisprudence: [],
		regulations: [],
		keywords: ['enclave', 'origen', 'procedencia', 'determinación de origen'],
		order: 16,
		segments: [],
		amendments: [],
	},
];
