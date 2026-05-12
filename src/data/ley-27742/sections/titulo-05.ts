import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_TITULO_05: LawSection = {
	id: 'ley-27742-titulo-05',
	lawId: 'ley-27742',
	number: 'V',
	name: 'Modernización laboral',
	articleStart: 82,
	articleEnd: 100,
	titles: [],
};

export const ARTICLES_TITULO_05: Article[] = [
	{
		id: 'ley27742-art-82-87',
		lawId: 'ley-27742',
		number: '82-87',
		title: 'Modificaciones a ley 24.013 — registración laboral simplificada',
		originalText: '[Arts. 82-87 modifican la ley 24.013 (Empleo): arts. 82-85 sustituyen/incorporan arts. 7°, 7° bis, 7° ter y 7° quáter sobre la registración laboral; art. 86 sustituye el rótulo del Capítulo 2 del Título II; art. 87 sustituye el art. 18 sobre el Sistema Único de Registro.]',
		currentText:
			'Reforman el sistema de registración laboral de la ley 24.013: la registración debe ser simple, inmediata, expeditiva y electrónica; se incorpora un sistema simplificado para empresas de hasta 12 trabajadores (importe único); se crea la vía de denuncia electrónica del trabajador ante la autoridad de aplicación o la AFIP; en caso de sentencia que determine empleo no registrado, el juez debe informar a la entidad recaudadora para determinar la deuda previsional.',
		plainLanguageExplanation:
			'Simplificación del proceso de "dar de alta" un empleado: todo debe poder hacerse online y en forma expeditiva. Para las empresas pequeñas (hasta 12 trabajadores) se crea un "importe único" que concentra todos los aportes en un solo pago. También se mejora el circuito de denuncia de trabajo en negro por parte del propio trabajador.',
		practicalEffects: [
			'El "importe único" para micros y pequeñas empresas simplifica enormemente la liquidación de sueldos',
			'La denuncia electrónica hace más accesible el mecanismo de blanqueo para trabajadores en situación de informalidad',
			'La obligación del juez de informar a la AFIP después de una sentencia laboral garantiza que la seguridad social recupere lo adeudado',
		],
		examples: [],
		relatedArticles: ['ley27742-art-76', 'ley27742-art-88'],
		jurisprudence: [],
		regulations: ['Ley 24.013 — Sistema Único de Registro Laboral'],
		keywords: ['registración laboral', 'ley 24013', 'sistema único de registro', 'empleo electrónico', 'blanqueo laboral'],
		order: 82,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-88-95',
		lawId: 'ley-27742',
		number: '88-95',
		title: 'Modificaciones a la Ley de Contrato de Trabajo (ley 20.744)',
		originalText: '[Arts. 88-95 modifican la ley 20.744 (LCT). Ver arts. detallados en la ley 20.744 del Observatorio (ley-20744) donde se han registrado los textos actualizados.]',
		currentText:
			'Arts. 88-95 sustituyen/incorporan artículos de la LCT:\n- Art. 88 (art. 2° LCT): Ámbito de aplicación — excluye contrataciones civiles y comerciales de la presunción laboral.\n- Art. 89 (art. 23 LCT): Presunción del contrato — se exceptúa cuando hay factura o recibo correspondiente (prestación de servicios profesionales).\n- Art. 90 (art. 29 LCT): Intermediación — la empresa usuaria es responsable solidaria solo durante el tiempo de prestación efectiva.\n- Art. 91 (art. 92 bis LCT): Período de prueba — se amplía a 6 meses (8 meses en empresas de 6-100 trabajadores, 12 meses en empresas de hasta 5 trabajadores). Los CCT pueden ampliarlo.\n- Art. 92 (art. 136 LCT): Contratistas e intermediarios — solidaridad y mecanismo de retención para pago a trabajadores.\n- Art. 93 (art. 177 LCT): Licencia por maternidad — lenguaje inclusivo ("persona gestante"), mantiene 45+45 días.\n- Art. 94 (art. 242 LCT): Justa causa — se agrega que los bloqueos o tomas de establecimiento pueden configurar injuria grave.\n- Art. 95 (nuevo art. 245 bis LCT): Despido discriminatorio — indemnización agravada del 50% al 100% extra, pero la prueba recae en quien invoca la causal.',
		plainLanguageExplanation:
			'Este bloque de artículos es el núcleo de la "reforma laboral" de la Ley de Bases. Los cambios más polémicos son: (1) el período de prueba más largo (6-12 meses vs. 3 meses anteriores), que facilita despedir sin indemnización en el período inicial; (2) la excepción a la presunción laboral cuando hay factura (más difícil para trabajadores "en negro" reclamando dependencia si firmaron facturas); (3) la toma de establecimiento como causal de despido con justa causa; (4) la inversión de la carga de la prueba en despidos discriminatorios (el trabajador debe probar la discriminación, no el empleador). También incluye cambios más neutrales o favorables a los trabajadores (licencia de maternidad con lenguaje inclusivo).',
		practicalEffects: [
			'Período de prueba ampliado: más tiempo para despedir sin indemnización. Críticos lo ven como precarización; defensores lo ven como incentivo para contratar',
			'Servicios profesionales con factura: los autónomos con factura tienen menos protección para reclamar dependencia laboral',
			'Bloqueo/toma como justa causa: endurece la posición legal de los empresarios ante conflictos gremiales',
			'Inversión de prueba en despidos discriminatorios: más difícil ganar estos juicios para el trabajador',
		],
		examples: [
			'Un diseñador gráfico trabajaba exclusivamente para una empresa durante 3 años, emitiendo facturas. Antes podía reclamar dependencia laboral. Con el nuevo art. 23 (modificado por art. 89), si emitía facturas consistentes, la presunción de dependencia no aplica automáticamente',
		],
		relatedArticles: ['ley27742-art-82', 'ley27742-art-96'],
		jurisprudence: [],
		regulations: ['Ley 20.744 — Ley de Contrato de Trabajo (arts. 2°, 23, 29, 92 bis, 136, 177, 242, 245 bis)'],
		keywords: ['LCT', 'ley 20744', 'período de prueba', 'despido discriminatorio', 'bloqueo', 'reforma laboral', 'presunción laboral'],
		order: 88,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-96',
		lawId: 'ley-27742',
		number: '96',
		title: 'Fondo de cese laboral — alternativa a la indemnización por antigüedad',
		originalText:
			'Mediante convenio colectivo de trabajo, las partes podrán sustituir la indemnización prevista en el artículo 245 de la ley 20.744 por un fondo o sistema de cese laboral conforme los parámetros que disponga el Poder Ejecutivo nacional. Los empleadores podrán optar por contratar un sistema privado a su costo, a fin de solventar la indemnización y/o la suma que libremente se pacte para el supuesto de desvinculación por mutuo acuerdo. En todos los casos, las empresas podrán auto-asegurarse en el sistema que se defina.',
		currentText:
			'Los convenios colectivos pueden reemplazar la indemnización por antigüedad (art. 245 LCT) por un Fondo de Cese Laboral. El empleador puede contratar un sistema privado de ahorro para solventar la indemnización. También se puede pactar en convenio el monto por mutuo acuerdo.',
		plainLanguageExplanation:
			'El Fondo de Cese es el modelo de la Uocra (construcción) aplicado potencialmente a todo el mercado laboral. En lugar de acumular una "deuda" creciente con cada empleado por años de antigüedad, el empleador deposita mensualmente en un fondo privado (tipo AFJP individual) que el trabajador cobra al desvincularse, independientemente de si fue despedido o renunció. La gran diferencia: en el sistema actual, si renunciás no cobrás indemnización; con el fondo, cobrás lo acumulado siempre.',
		practicalEffects: [
			'Para el empleador: convierte la indemnización de un pasivo incierto en un gasto mensual previsible',
			'Para el trabajador: cobra el fondo aunque renuncie (hoy la renuncia no genera indemnización)',
			'Solo aplica si el convenio colectivo de la actividad lo adopta: no es automático para todas las relaciones laborales',
			'El modelo puede reducir la litigiosidad laboral (menos peleas por si el despido fue justificado o no)',
		],
		examples: [
			'Un metalúrgico lleva 10 años en una empresa donde el convenio adoptó el Fondo de Cese. Si decide renunciar para abrir su propio taller, cobrar su fondo acumulado (como si hubiera sido despedido). Con el sistema actual, renunciar significa perder toda indemnización',
		],
		relatedArticles: ['ley27742-art-88'],
		jurisprudence: [],
		regulations: [],
		keywords: ['fondo de cese laboral', 'indemnización', 'art. 245 LCT', 'convenio colectivo', 'UOCRA'],
		order: 96,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-97',
		lawId: 'ley-27742',
		number: '97',
		title: 'Trabajadores independientes con colaboradores',
		originalText:
			'El trabajador independiente podrá contar con hasta otros tres (3) trabajadores independientes para llevar adelante un emprendimiento productivo y podrá acogerse a un régimen especial unificado que reglamentará el PEN. Basado en la relación autónoma, sin vínculo de dependencia. Incluye aporte individual de una cuota mensual (jubilación, obra social, riesgos del trabajo). Prohibido fragmentar establecimientos para obtener beneficios en fraude a la ley.',
		currentText:
			'Un trabajador autónomo puede asociarse con hasta 3 colaboradores independientes bajo un régimen especial (no de dependencia). Todos pagan una cuota mensual unificada que cubre jubilación, obra social y ART. No hay relación de dependencia entre ellos.',
		plainLanguageExplanation:
			'Crea un nuevo tipo de relación laboral para el trabajo colaborativo informal: un plomero con tres ayudantes, un artesano con colaboradores, un programador freelance con subcontratados. Ya no son empleados en relación de dependencia ni autónomos sin nada: hay un sistema intermedio con protección social básica (jubilación, salud, ART) pero sin las obligaciones de un contrato de trabajo tradicional.',
		practicalEffects: [
			'Legaliza el modelo de trabajo "autónomo con ayudantes" que hoy muchos hacen informalmente',
			'El aporte unificado mensual cubre jubilación + obra social + ART para todos',
			'La cláusula anti-fraude impide que una empresa divide artificialmente en "4 autónomos" lo que en realidad es una relación de dependencia con empleados',
		],
		examples: [
			'Un electricista independiente puede tener 3 ayudantes. Los 4 pagan la cuota mensual del régimen especial y están cubiertos ante accidentes (ART) y aportan para la jubilación. No es una relación empleador-empleado: todos son "independientes colaboradores"',
		],
		relatedArticles: ['ley27742-art-88', 'ley27742-art-96'],
		jurisprudence: [],
		regulations: [],
		keywords: ['trabajador independiente', 'colaboradores', 'monotributo laboral', 'autónomo', 'ART'],
		order: 97,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-98',
		lawId: 'ley-27742',
		number: '98',
		title: 'Modificaciones al trabajo agrario — ley 26.727',
		originalText: 'Sustitúyanse los artículos 16 y 69 de la ley 26.727: Art. 16: el contrato agrario permanente se aplica el período de prueba del art. 92 bis LCT (ampliado). Art. 69: las bolsas de trabajo sindicales pueden proponer candidatos pero el empleador puede contratar a quien quiera (se deroga la exclusividad de las bolsas de trabajo sindicales).',
		currentText:
			'Dos cambios en el régimen de trabajo agrario: (1) se aplica el período de prueba ampliado de la LCT (hasta 6 meses) al trabajo rural permanente; (2) se elimina la exclusividad de las bolsas de trabajo sindicales para tareas temporarias: el empleador puede contratar libremente aunque el sindicato proponga candidatos.',
		plainLanguageExplanation:
			'Dos modificaciones al trabajo en el campo: el período de prueba más largo también aplica en el agro; y la "bolsa de trabajo" sindical deja de tener la última palabra en la contratación de temporeros. Antes los empleadores rurales debían contratar a los candidatos que propusiera el sindicato; ahora pueden elegir libremente.',
		practicalEffects: [
			'La eliminación de la exclusividad sindical en la contratación de temporeros es el cambio más controversial',
			'El período de prueba ampliado aplica a empleados rurales permanentes nuevos',
		],
		examples: [],
		relatedArticles: ['ley27742-art-91', 'ley27742-art-99'],
		jurisprudence: [],
		regulations: ['Ley 26.727 — Régimen de Trabajo Agrario'],
		keywords: ['trabajo agrario', 'ley 26727', 'bolsa de trabajo', 'período de prueba rural', 'libertad de contratación'],
		order: 98,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-99',
		lawId: 'ley-27742',
		number: '99',
		title: 'Derogaciones en materia laboral',
		originalText: 'Deróganse los artículos 8° a 17 y 120, inciso a), de la ley 24.013; el artículo 9° de la ley 25.013; los artículos 43 a 48 de la ley 25.345; el artículo 15 de la ley 26.727 y el artículo 50 de la ley 26.844.',
		currentText:
			'Deroga: arts. 8-17 y 120a de ley 24.013 (multas por trabajo no registrado — la famosa "doble indemnización" y similares); art. 9° ley 25.013; arts. 43-48 ley 25.345 (cheques y pagos laborales); art. 15 ley 26.727 (trabajo agrario); art. 50 ley 26.844 (trabajo doméstico).',
		plainLanguageExplanation:
			'El cambio más polémico del Título V: deroga las multas de la ley 24.013 por trabajo en negro. Antes, un trabajador que probaba que había estado no registrado podía cobrar el doble de indemnización y multas adicionales. Con la nueva ley, esas multas adicionales desaparecen. Los defensores dicen que esas multas incentivaban la "industria del juicio"; los críticos dicen que eran el principal desincentivo a la informalidad laboral.',
		practicalEffects: [
			'La derogación de los arts. 8-17 de ley 24.013 elimina las "multas por no registro" que podían duplicar o triplicar las indemnizaciones',
			'Aplica para relaciones laborales que empiecen desde la vigencia de la ley: los juicios por períodos anteriores conservan el derecho a esas multas',
		],
		examples: [
			'Antes: un trabajador que demostró que estuvo en negro 3 años cobraba la indemnización base + multas del 25% + multas del 100% = hasta el doble. Desde la Ley de Bases: solo cobra la indemnización base del art. 245 LCT',
		],
		relatedArticles: ['ley27742-art-88', 'ley27742-art-100'],
		jurisprudence: [],
		regulations: ['Ley 24.013, arts. 8-17', 'Ley 25.013, art. 9°', 'Ley 25.345, arts. 43-48'],
		keywords: ['derogación multas laborales', 'trabajo no registrado', 'ley 24013', 'industria del juicio', 'reforma laboral'],
		order: 99,
		segments: [],
		amendments: [],
	},
	{
		id: 'ley27742-art-100',
		lawId: 'ley-27742',
		number: '100',
		title: 'Derogación de ley 25.323',
		originalText: 'Derógase la ley 25.323 y toda norma que se oponga o resultare incompatible con el contenido del presente título.',
		currentText:
			'Deroga la ley 25.323 completa (agravamiento indemnizatorio por despido de trabajador no registrado o con datos incorrectos en el registro).',
		plainLanguageExplanation:
			'La ley 25.323 imponía que si un empleador despedía a un trabajador que estaba mal registrado y no le pagaba la indemnización, la misma se duplicaba. Era otra "multa" sobre la informalidad y la falta de pago. Con su derogación, desaparece este agravamiento automático. El trabajador sigue teniendo derecho a la indemnización base, pero ya no puede reclamar el doble automáticamente.',
		practicalEffects: [
			'Junto con la derogación del art. 99, elimina prácticamente todas las multas adicionales por trabajo en negro',
			'Los juicios laborales por trabajo no registrado anterior a la ley mantienen el derecho a la ley 25.323',
		],
		examples: [],
		relatedArticles: ['ley27742-art-99', 'ley27742-art-95'],
		jurisprudence: [],
		regulations: ['Ley 25.323'],
		keywords: ['ley 25323', 'agravamiento indemnizatorio', 'derogación', 'multas laborales'],
		order: 100,
		segments: [],
		amendments: [],
	},
];
