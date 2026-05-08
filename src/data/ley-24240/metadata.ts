import type { Law } from '../../common/types/law.types';

type LawBase = Omit<Law, 'articles' | 'sections'>;

export const LEY_24240_METADATA: LawBase = {
  id: 'ley-24240',
  number: '24240',
  title: 'Normas de Protección y Defensa de los Consumidores',
  commonName: 'Ley de Defensa del Consumidor',
  summary:
    'Establece el régimen de protección del consumidor y usuario en todas las relaciones de consumo con proveedores de bienes y servicios. Define derechos irrenunciables del consumidor (información, seguridad, libre elección, trato digno), regula contratos de adhesión, establece garantías legales para productos, prohíbe cláusulas abusivas, regula la publicidad engañosa y crea un sistema de sanciones y acciones colectivas. Es complementaria del Código Civil y Comercial.',
  year: 1993,
  sanctionDate: '1993-09-22',
  promulgationDate: '1993-10-13',
  publicationDate: '1993-10-15',
  boNumber: '27744',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/638/texact.htm',
  articleCount: 65,
  topics: [
    'Defensa del consumidor',
    'Relaciones de consumo',
    'Contratos de adhesión',
    'Garantías',
    'Publicidad',
  ],
  keywords: [
    'consumidor',
    'proveedor',
    'relación de consumo',
    'garantía legal',
    'cláusulas abusivas',
    'publicidad engañosa',
    'trato digno',
    'SCNDA',
    'acciones colectivas',
    'daño directo',
    'rescisión sin cargo',
    'contrato de adhesión',
  ],
  relatedNorms: [
    'Ley 26.994 (Código Civil y Comercial — arts. sobre consumo)',
    'Ley 25.156 (Defensa de la Competencia)',
    'Ley 22.802 (Lealtad Comercial)',
    'Decreto 1798/1994 (reglamentario)',
    'Resoluciones de la Secretaría de Comercio',
  ],
  executiveSummary:
    'La Ley 24.240 es el estatuto básico del consumidor en Argentina. Sus pilares: (1) el consumidor no puede renunciar a sus derechos; (2) el proveedor tiene el deber de información completa, veraz y oportuna; (3) toda garantía por escrito de un bien mueble no fungible dura al menos 6 meses (nuevo) o 3 meses (usado); (4) los contratos de adhesión se interpretan a favor del consumidor; (5) las cláusulas abusivas son nulas de pleno derecho; (6) la publicidad integra el contrato; (7) el daño directo puede ser fijado directamente por la autoridad administrativa (SCNDA); (8) hay acciones colectivas para intereses de categoría. La ley se integra con el CCyCN.',
  objective:
    'Proteger a los consumidores y usuarios de bienes y servicios en las relaciones de consumo, reconociendo la asimetría entre proveedor y consumidor y corrigiendo el desequilibrio mediante normas de orden público irrenunciables.',
  problemItSolves:
    'Antes de esta ley, los consumidores dependían del derecho civil general, que no reconocía la asimetría de información y poder entre empresa y consumidor. Los contratos de adhesión se aplicaban íntegramente aunque tuvieran cláusulas abusivas. No había garantía legal mínima ni sistema de sanciones administrativas.',
  practicalImpact:
    'Cualquier consumidor puede exigir la garantía de 6 meses para productos nuevos. Puede resolver contratos de servicios de telecomunicaciones, turismo, educación privada, etc. sin cargo dentro de los plazos. Los contratos de adhesión se interpretan en su favor. La SCNDA puede imponer multas millonarias y ordenar publicación de la sanción. Las acciones colectivas permiten representar a cientos de miles de consumidores en un solo proceso.',
  affectedSubjects: [
    'Consumidores y usuarios finales (personas físicas y jurídicas)',
    'Proveedores de bienes y servicios (personas físicas y jurídicas)',
    'Secretaría de Comercio Interior (autoridad de aplicación)',
    'Organismos provinciales y municipales de defensa del consumidor',
    'Asociaciones de consumidores',
    'Defensor del Pueblo',
  ],
  createdAt: '1993-10-15T00:00:00.000Z',
  updatedAt: '2014-08-01T00:00:00.000Z',
  amendments: [],
  annexes: [],
  segments: [],
  metadata: {
    id: 'meta-24240',
    lawId: 'ley-24240',
    mainTopic: 'Protección del consumidor en las relaciones de consumo',
    subtopics: [
      'Deber de información',
      'Garantías legales',
      'Contratos de adhesión y cláusulas abusivas',
      'Publicidad engañosa',
      'Daño directo y sanciones',
      'Acciones colectivas',
      'Trato digno y no discriminatorio',
    ],
    relatedLaws: [
      'Ley 25.156 — Defensa de la Competencia (1999)',
      'Ley 22.802 — Lealtad Comercial (1983)',
      'Ley 26.994 — Código Civil y Comercial (arts. 1092-1122 sobre consumo)',
    ],
    regulations: [
      'Decreto 1798/1994 (reglamentario)',
      'Resoluciones de la Secretaría de Comercio sobre garantías, etiquetado y publicidad',
    ],
    modifyingNorms: [
      'Ley 24.787 (1997) — modificó arts. sobre crédito',
      'Ley 24.999 (1998) — amplió ámbito',
      'Ley 26.361 (2008) — mayor reforma: incorporó daño directo, acciones colectivas, trato digno',
      'Ley 26.994 (2014) — adecuación al nuevo CCyCN',
    ],
    derogatingNorms: [],
    jurisprudence: [
      'CSJN — "Halabi c/ PEN" (2009) — reconoció las acciones colectivas de consumidores',
      'CNCom — numerosos fallos sobre cláusulas abusivas en contratos bancarios y de seguros',
      'CSJN — "Unión de Usuarios y Consumidores c/ Banco Itaú" (2011) — acción colectiva en materia bancaria',
    ],
    doctrine: [
      'Farina, J. — "Defensa del Consumidor y del Usuario"',
      'Lorenzetti, R. — "Consumidores" (comentario al régimen)',
    ],
    obligations: [
      'Proveer información completa, cierta, objetiva, veraz, detallada y suficiente (art. 4)',
      'Respetar la garantía legal mínima: 6 meses en productos nuevos, 3 meses en usados',
      'No incluir cláusulas abusivas en contratos de adhesión',
      'Dar trato digno y no discriminatorio',
      'Responder solicitudes de rescisión de contratos de servicios sin penalidad ni mora',
      'Incluir en el precio todo cargo que integra el costo total para el consumidor',
    ],
    rights: [
      'Garantía legal mínima de 6 meses (bienes muebles no fungibles nuevos)',
      'Información completa y veraz antes de la compra',
      'Rescisión de contratos de servicio en cualquier momento sin cargo',
      'Trato digno y no discriminatorio',
      'Acceso a la justicia a través de acciones individuales o colectivas',
      'Indemnización por daño directo fijada por la autoridad administrativa',
    ],
    sanctions: [
      'Multa de $100 a $5.000.000 (actualizable) — art. 47',
      'Decomiso de mercadería',
      'Clausura del establecimiento hasta 30 días',
      'Suspensión de hasta 5 años en registros de proveedores del Estado',
      'Publicación de la sanción a costa del infractor',
      'Pérdida de concesiones, privilegios o autorizaciones',
    ],
    useCases: [
      'Un televisor se rompe a los 4 meses de comprado → garantía legal de 6 meses; el vendedor debe repararlo, reemplazarlo o reintegrar el precio',
      'Una empresa de internet sube el precio del abono → el consumidor puede rescindir sin cargo dentro de los 60 días',
      'Un banco incluye en el contrato de tarjeta una cláusula que limita el reclamo → es nula de pleno derecho (art. 37)',
      'Un proveedor insulta a un cliente → es infracción al art. 8 bis (trato digno); puede ser sancionado con multa y publicación de la sanción',
    ],
    faq: [
      {
        question: '¿Cuánto dura la garantía legal?',
        answer:
          'Para bienes muebles no fungibles nuevos, 6 meses. Para usados, 3 meses, salvo que las partes acuerden un plazo mayor. La garantía puede ejercerse contra el vendedor, el fabricante o el importador.',
      },
      {
        question: '¿Puede una empresa cobrar cargo por dar de baja un servicio?',
        answer:
          'No. El art. 10 ter prohíbe cobrar cargos por rescisión. El proveedor debe dar de baja el servicio dentro de los 30 días de solicitado.',
      },
      {
        question: '¿Qué es el daño directo?',
        answer:
          'Es el perjuicio o menoscabo al derecho del usuario o consumidor que la autoridad de aplicación puede cuantificar y ordenar resarcir directamente, sin necesidad de acción judicial. Su monto no puede superar el valor de la deuda del proveedor con el consumidor al momento de la infracción.',
      },
    ],
    createdAt: '1993-10-15T00:00:00.000Z',
    updatedAt: '2014-08-01T00:00:00.000Z',
  },
};
