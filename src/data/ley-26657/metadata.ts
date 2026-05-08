import type { Law } from '../../common/types/law.types';

type LawBase = Omit<Law, 'articles' | 'sections'>;

export const LEY_26657_METADATA: LawBase = {
  id: 'ley-26657',
  number: '26657',
  title: 'Derecho a la Protección de la Salud Mental',
  commonName: 'Ley Nacional de Salud Mental',
  summary:
    'Establece el marco jurídico para el abordaje de la salud mental desde una perspectiva de derechos humanos. Define derechos de las personas con padecimiento mental, regula las internaciones voluntarias e involuntarias con control judicial estricto, prohíbe la creación de nuevos manicomios y ordena la sustitución de las instituciones existentes por dispositivos comunitarios. Crea el Órgano de Revisión en el ámbito del Ministerio Público de la Defensa.',
  year: 2010,
  sanctionDate: '2010-11-25',
  promulgationDate: '2010-12-02',
  publicationDate: '2010-12-03',
  boNumber: '32041',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/175000-179999/175977/norma.htm',
  articleCount: 46,
  topics: [
    'Salud mental',
    'Derechos humanos',
    'Internaciones',
    'Desmanicomialización',
    'Salud pública',
  ],
  keywords: [
    'salud mental',
    'internación involuntaria',
    'manicomio',
    'desmanicomialización',
    'consentimiento informado',
    'órgano de revisión',
    'equipo interdisciplinario',
    'padecimiento mental',
    'adicciones',
    'autonomía personal',
    'derechos del paciente',
    'hospital general',
  ],
  relatedNorms: [
    'Ley 22.914 (derogada por esta ley)',
    'Ley 23.592 (actos discriminatorios)',
    'Decreto 603/2013 (reglamentario)',
    'Principios ONU para Protección de Enfermos Mentales (1991)',
    'Declaración de Caracas OPS/OMS (1990)',
  ],
  executiveSummary:
    'La Ley 26.657 reemplazó el modelo manicomial por un paradigma de salud mental basado en derechos humanos. Sus pilares son: (1) toda persona se presume capaz; el diagnóstico mental no implica incapacidad ni riesgo; (2) la internación —voluntaria o involuntaria— es un recurso excepcional y restrictivo, con control judicial obligatorio; (3) se prohíbe la creación de nuevos manicomios y se ordena la sustitución de los existentes por dispositivos comunitarios; (4) se crea el Órgano de Revisión en el ámbito del Ministerio Público de la Defensa para supervisar las internaciones. La ley fue reglamentada por el Decreto 603/2013.',
  objective:
    'Asegurar el derecho a la protección de la salud mental y el pleno goce de los derechos humanos de las personas con padecimiento mental, conforme a los instrumentos internacionales de derechos humanos con jerarquía constitucional.',
  problemItSolves:
    'La Ley 22.914 (derogada) habilitaba la internación psiquiátrica sin control judicial adecuado y consolidaba el modelo manicomial: instituciones segregadoras donde las personas permanecían internadas indefinidamente sin perspectiva terapéutica real, muchas veces por razones sociales. La ley actual rompe con ese modelo.',
  practicalImpact:
    'Toda internación involuntaria debe notificarse al juez en 10 horas y recibir evaluación judicial en 3 días. El equipo de salud —no el juez— decide el alta. Se prohíbe el rechazo de pacientes de salud mental en hospitales generales. Los manicomios existentes deben transformarse progresivamente. El presupuesto de salud mental debe alcanzar el 10% del total de salud.',
  affectedSubjects: [
    'Personas con padecimiento mental (pacientes y ex-pacientes)',
    'Instituciones psiquiátricas públicas y privadas',
    'Equipos de salud mental (psicólogos, psiquiatras, trabajadores sociales, enfermeros)',
    'Jueces con competencia en internaciones',
    'Ministerio Público de la Defensa (Órgano de Revisión)',
    'Obras sociales y prepagas (deben adecuar cobertura)',
    'Universidades (recomendaciones de formación)',
  ],
  createdAt: '2010-12-03T00:00:00.000Z',
  updatedAt: '2013-05-28T00:00:00.000Z',
  amendments: [],
  annexes: [],
  segments: [],
  metadata: {
    id: 'meta-26657',
    lawId: 'ley-26657',
    mainTopic: 'Salud mental y derechos humanos',
    subtopics: [
      'Internación voluntaria e involuntaria',
      'Desmanicomialización',
      'Control judicial de internaciones',
      'Órgano de Revisión',
      'Equipo interdisciplinario',
      'Presupuesto de salud mental',
    ],
    relatedLaws: [
      'Ley 23.592 — Actos discriminatorios (1988)',
      'Ley 26.061 — Protección integral de NNyA (2005)',
      'Ley 24.455 — Adicciones y cobertura de salud (1995)',
      'Convención sobre los Derechos de las Personas con Discapacidad (ONU, 2006)',
    ],
    regulations: [
      'Decreto 603/2013 (reglamentario)',
      'Resoluciones del Ministerio de Salud sobre dispositivos comunitarios',
    ],
    modifyingNorms: [],
    derogatingNorms: ['Ley 22.914 (derogada íntegramente)'],
    jurisprudence: [
      'CSJN — "R., M. J." (2008, antes de la ley) — fijó lineamientos sobre internaciones psiquiátricas y control judicial',
      'CSJN — "Fernández, Silvia Mónica s/ art. 482 CC" — aplicación de la ley en internaciones',
      'Cám. Nac. Civ. — distintas salas han aplicado los arts. 20-24 en casos de internaciones involuntarias',
    ],
    doctrine: [
      'Faraoni, F. / Stábile, O. — "Salud mental y derechos humanos: comentario a la Ley 26.657"',
      'Zaffaroni, E.R. — posición crítica al modelo manicomial en la Argentina',
    ],
    obligations: [
      'Equipos de salud: abordaje interdisciplinario, prohibición de internar por razones sociales',
      'Instituciones: notificar internaciones involuntarias al juez en 10 hs',
      'Jueces: resolver la legalidad de la internación involuntaria en 3 días',
      'Estado: alcanzar presupuesto de salud mental del 10% del total de salud',
      'Estado: realizar censo de internados c/2 años',
      'Instituciones: no rechazar pacientes de salud mental en hospitales generales',
    ],
    rights: [
      'Presunción de capacidad de toda persona',
      'Consentimiento informado para toda intervención',
      'Derecho a designar un abogado defensor',
      'Derecho a recibir la alternativa terapéutica menos restrictiva',
      'Derecho al alta en internación voluntaria por decisión propia',
      'Derecho a no ser internado por razones sociales o de vivienda',
      'Derecho a tratamiento personalizado con respeto a la intimidad',
    ],
    sanctions: [
      'Responsabilidad civil y penal por consentimiento obtenido con dolo',
      'Responsabilidad civil y penal por incumplimiento de la obligación de informar',
      'La institución que rechace pacientes de salud mental comete acto discriminatorio (ley 23.592)',
    ],
    useCases: [
      'Una persona internada voluntariamente quiere irse → tiene derecho a hacerlo en cualquier momento; si lleva más de 60 días, el equipo debe notificar al juez',
      'Un familiar pide internar a su pariente sin consentimiento → el equipo evalúa riesgo cierto e inminente; si procede, notifica al juez en 10 hs',
      'Un hospital general rechaza a un paciente con crisis psiquiátrica → es un acto discriminatorio punible bajo la Ley 23.592',
      'Una provincia quiere abrir un nuevo hospital monovalente psiquiátrico → está prohibido por el art. 27',
      'Un juez quiere ordenar el alta de un paciente → no puede: el alta es exclusivamente facultad del equipo de salud',
    ],
    faq: [
      {
        question: '¿Puede un juez ordenar una internación involuntaria?',
        answer:
          'Solo subsidiariamente: cuando el servicio de salud responsable se niega a realizarla pese a que se cumplen todos los requisitos del art. 20. En todos los demás casos, la internación la decide el equipo de salud, y el juez solo controla su legalidad.',
      },
      {
        question: '¿Qué es el Órgano de Revisión?',
        answer:
          'Un organismo multidisciplinario en el ámbito del Ministerio Público de la Defensa que supervisa las internaciones, evalúa su justificación y duración, recibe denuncias de tratos inhumanos y puede apelar decisiones judiciales. Es la instancia central de control no judicial.',
      },
      {
        question: '¿Qué pasa con los manicomios existentes?',
        answer:
          'La ley prohíbe crear nuevos (art. 27) y ordena que los existentes se adapten hasta su sustitución definitiva por dispositivos alternativos. Ese proceso debe realizarse sin reducir personal ni afectar derechos adquiridos de los trabajadores.',
      },
      {
        question: '¿Las adicciones están cubiertas?',
        answer:
          'Sí. El art. 4 integra las adicciones dentro de la política de salud mental. Las personas con uso problemático de drogas legales o ilegales tienen todos los derechos y garantías de esta ley.',
      },
    ],
    createdAt: '2010-12-03T00:00:00.000Z',
    updatedAt: '2013-05-28T00:00:00.000Z',
  },
};
