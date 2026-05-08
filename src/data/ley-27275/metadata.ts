import type { Law } from '../../common/types/law.types';

type LawBase = Omit<Law, 'articles' | 'sections'>;

export const LEY_27275_METADATA: LawBase = {
  id: 'ley-27275',
  number: '27275',
  title: 'Derecho de Acceso a la Información Pública',
  commonName: 'Ley de Acceso a la Información Pública',
  summary:
    'Regula el derecho de toda persona a solicitar y recibir información de los organismos públicos nacionales, sin necesidad de acreditar interés ni identidad. Establece principios de máxima divulgación, transparencia activa y presunción de publicidad. Crea la Agencia de Acceso a la Información Pública como autoridad de aplicación autárquica. La denegación de información es gratuita para el solicitante y la carga de la prueba recae en el Estado.',
  year: 2016,
  sanctionDate: '2016-09-14',
  promulgationDate: '2016-09-27',
  publicationDate: '2016-09-29',
  boNumber: '33464',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/265000-269999/265949/norma.htm',
  articleCount: 40,
  topics: [
    'Transparencia',
    'Acceso a la información',
    'Gobierno abierto',
    'Derechos civiles',
    'Control ciudadano',
  ],
  keywords: [
    'acceso a la información pública',
    'transparencia activa',
    'Agencia de Acceso a la Información',
    'sujetos obligados',
    'excepciones',
    'datos abiertos',
    'silencio positivo',
    'reclamo',
    'publicidad de actos de gobierno',
    'presunción de publicidad',
  ],
  relatedNorms: [
    'Decreto 1172/2003 (anterior régimen de acceso a información)',
    'Ley 25.326 (protección de datos personales)',
    'Ley 27.078 (Argentina Digital)',
    'Decreto 434/2016 (Plan de Modernización del Estado)',
  ],
  executiveSummary:
    'La Ley 27.275 reemplazó el Decreto 1172/2003 y estableció un régimen legal amplio de acceso a la información pública. Sus principios son: presunción de publicidad (toda información pública salvo excepciones taxativas), máxima divulgación, gratuidad, informalismo (no exige invocar motivo), y celeridad (15 días hábiles para responder). La información pedida se considera denegada si no hay respuesta (silencio negativo). Crea la Agencia de Acceso a la Información Pública como organismo autárquico e independiente.',
  objective:
    'Garantizar el efectivo ejercicio del derecho de acceso a la información pública, promover la participación ciudadana y la transparencia en la gestión pública, y fortalecer el principio republicano de gobierno.',
  problemItSolves:
    'El Decreto 1172/2003 solo vinculaba al Poder Ejecutivo y carecía de rango legal, lo que dificultaba su exigibilidad. Faltaba un organismo independiente de control y un régimen sancionatorio claro. Las excepciones eran difusas y la cultura de opacidad en el Estado era generalizada.',
  practicalImpact:
    'Cualquier persona puede pedir información a cualquier organismo del Estado nacional (incluyendo empresas públicas, concesionarios y partidos políticos que reciben fondos públicos) sin acreditar identidad ni interés. El organismo tiene 15 días hábiles para responder. Si no responde, se puede interponer reclamo ante la Agencia. El acceso es gratuito.',
  affectedSubjects: [
    'Todos los poderes del Estado nacional (Ejecutivo, Legislativo, Judicial)',
    'Ministerio Público',
    'Empresas y sociedades del Estado',
    'Concesionarios y permisionarios de servicios públicos',
    'Partidos políticos (respecto de fondos públicos)',
    'Fideicomisos y fondos fiduciarios con fondos públicos',
    'Agencia de Acceso a la Información Pública (autoridad de aplicación)',
  ],
  createdAt: '2016-09-29T00:00:00.000Z',
  updatedAt: '2016-09-29T00:00:00.000Z',
  amendments: [],
  annexes: [],
  segments: [],
  metadata: {
    id: 'meta-27275',
    lawId: 'ley-27275',
    mainTopic: 'Derecho de acceso a la información pública y transparencia estatal',
    subtopics: [
      'Transparencia activa',
      'Sujetos obligados',
      'Excepciones al acceso',
      'Agencia de Acceso a la Información Pública',
      'Procedimiento de solicitud y reclamo',
      'Gobierno abierto y datos abiertos',
    ],
    relatedLaws: [
      'Ley 25.326 — Protección de Datos Personales (2000)',
      'Ley 26.857 — Declaraciones juradas de funcionarios (2013)',
      'Ley 27.401 — Responsabilidad penal de personas jurídicas (2017)',
    ],
    regulations: [
      'Decreto 206/2017 (reglamentario)',
      'Disposiciones de la Agencia de Acceso a la Información Pública',
    ],
    modifyingNorms: [],
    derogatingNorms: [],
    jurisprudence: [
      'CSJN — "CIPPEC c/ Ministerio de Desarrollo Social" (2014) — reconoció el acceso a información pública como derecho humano autónomo antes de la ley',
      'CSJN — "Asociación por los Derechos Civiles c/ PAMI" (2012) — amplió el concepto de sujeto obligado',
    ],
    doctrine: [
      'Basterra, M. — "El derecho fundamental de acceso a la información pública"',
      'Montiel, L. — "La Ley 27.275: alcances y desafíos de implementación"',
    ],
    obligations: [
      'Responder solicitudes de información en 15 días hábiles',
      'Publicar proactivamente información básica (transparencia activa)',
      'No exigir al solicitante invocar motivo ni acreditar identidad',
      'Aplicar criterio de disociación si solo parte de la información está sujeta a excepción',
      'Actualizar la información publicada activamente',
    ],
    rights: [
      'Solicitar información sin invocar motivo ni acreditar interés',
      'Obtener la información de forma gratuita',
      'Reclamar ante la Agencia si la información es denegada o no respondida',
      'Acceder a información en formato abierto y reutilizable',
    ],
    sanctions: [
      'Sanciones disciplinarias al agente responsable de la denegación injustificada',
      'El organismo que no responde queda sujeto a reclamo ante la Agencia',
      'Posibilidad de acciones judiciales (amparo) por denegación',
    ],
    useCases: [
      'Un periodista pide los contratos de obra pública de un ministerio → debe recibirlos en 15 días sin dar explicaciones',
      'Una ONG solicita el listado de beneficiarios de un programa social → es información pública; solo se deniega si afecta privacidad individual',
      'Un ciudadano pide el expediente de habilitación de un local → puede pedirlo sin acreditar ser el titular',
      'Un organismo no responde en 15 días → el silencio se equipara a denegación y habilita el reclamo ante la Agencia',
    ],
    faq: [
      {
        question: '¿Quién puede pedir información?',
        answer:
          'Cualquier persona, física o jurídica, nacional o extranjera, sin necesidad de acreditar identidad ni invocar razón o interés. El acceso es universal.',
      },
      {
        question: '¿Qué información puede denegarse?',
        answer:
          'Solo la que encuadre en las excepciones taxativas del art. 8: información clasificada como secreta, datos personales de terceros, secretos comerciales o industriales, investigaciones en curso, deliberaciones previas a resoluciones, información financiera que afecte la política cambiaria, entre otras. La excepción debe ser expresa, fundada y proporcional.',
      },
      {
        question: '¿Qué es la transparencia activa?',
        answer:
          'La obligación de los sujetos obligados de publicar en sus sitios web, sin que nadie lo pida, información básica: estructura orgánica, presupuesto, contratos, personal, viáticos, subsidios, etc. No hay que pedir lo que ya debe estar publicado.',
      },
    ],
    createdAt: '2016-09-29T00:00:00.000Z',
    updatedAt: '2016-09-29T00:00:00.000Z',
  },
};
