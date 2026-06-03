import type { Law } from '../../common/types/law.types';

type LawBase = Omit<Law, 'articles' | 'sections'>;

export const LEY_27801_METADATA: LawBase = {
  id: 'ley-27801',
  number: '27801',
  title: 'Régimen Penal Juvenil',
  commonName: 'Ley Penal Juvenil',
  summary:
    'Establece el régimen penal aplicable a las personas adolescentes de 14 a 18 años imputadas por delitos. Reemplaza la ley 22.278. Define penas y medidas especiales para adolescentes, prohíbe la prisión perpetua y fija un máximo de 15 años, y crea institutos especializados de detención.',
  year: 2026,
  sanctionDate: '2026-02-26',
  promulgationDate: '2026-03-07',
  publicationDate: '2026-03-09',
  effectiveDate: null,
  derogatedDate: null,
  boNumber: '35118',
  status: 'VIGENTE',
  jurisdiction: 'NACIONAL',
  normType: 'LEY',
  issuingBody: 'Honorable Congreso de la Nación Argentina',
  fullText: null,
  sourceUrl: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423722/norma.htm',
  articleCount: 53,
  topics: [
    'Derecho penal',
    'Menores en conflicto con la ley',
    'Justicia juvenil',
    'Responsabilidad penal juvenil',
    'Derechos del niño',
    'Privación de libertad',
  ],
  keywords: [
    'régimen penal juvenil',
    'adolescentes',
    'menores',
    'imputados',
    'penas juveniles',
    'institutos de detención',
    'inimputabilidad',
    'responsabilidad penal',
    'supervisor',
    'mediación penal',
    'suspensión del proceso a prueba',
    'derogación ley 22278',
    'criterio de oportunidad',
    'privación de libertad',
    'resocialización',
  ],
  relatedNorms: [
    'Ley 22.278 (derogada — régimen anterior)',
    'Convención sobre los Derechos del Niño (ley 23.849)',
    'Ley 26.061 — Protección Integral de Niños, Niñas y Adolescentes',
    'Código Penal (aplicación supletoria)',
    'Código Procesal Penal Federal — Ley 27.063',
    'Ley 27.372 — Derechos y Garantías de las Personas Víctimas de Delitos',
    'Ley 26.657 — Salud Mental',
    'Ley 24.390 (plazos de prisión preventiva)',
  ],
  relations: [
    {
      type: 'DEROGA' as const,
      targetLawId: 'ley-22278',
      targetLawLabel: 'Régimen Penal de la Minoridad (Ley 22.278)',
      description: 'Deroga totalmente el Régimen Penal de la Minoridad (Ley 22.278 y sus modificatorias), conforme su art. 48.',
    },
  ],
  executiveSummary:
    'La Ley Penal Juvenil crea un régimen de responsabilidad penal específico para adolescentes de 14 a 18 años. Reemplaza el viejo sistema de la ley 22.278, que permitía detener menores sin condena. El nuevo régimen establece un catálogo de penas propias (amonestación, tareas comunitarias, privación de libertad domiciliaria, en instituto especializado), prohíbe la prisión perpetua y limita la pena máxima a 15 años. Crea la figura del "supervisor" especializado que acompaña al adolescente, regula la mediación penal y la suspensión del proceso a prueba, y garantiza institutos de detención separados de los adultos.',
  objective:
    'Establecer un sistema de responsabilidad penal diferenciado para adolescentes que fomente la educación, la resocialización y la integración social, en línea con la Convención sobre los Derechos del Niño.',
  problemItSolves:
    'La ley 22.278 (de 1980, de facto) permitía detener a menores de 18 años sin juicio ni condena bajo el eufemismo de "tutela". Organismos de derechos humanos y el Comité de los Derechos del Niño de la ONU criticaron reiteradamente ese régimen. La nueva ley establece un proceso acusatorio con garantías, penas propias y límites máximos de detención.',
  practicalImpact:
    'Rige desde 180 días después del 9 de marzo de 2026. Afecta a todos los procesos penales contra adolescentes de 14 a 18 años en el orden federal y nacional ordinario. Las provincias deben adecuar sus legislaciones procesales. El Estado nacional debe crear o adaptar institutos especializados de detención y designar supervisores con formación específica.',
  affectedSubjects: [
    'Adolescentes de 14 a 18 años imputados por delitos',
    'Menores de 14 años (inimputables — se aplica otra normativa)',
    'Víctimas de delitos cometidos por adolescentes',
    'Defensores, fiscales y jueces con competencia en materia penal juvenil',
    'Ministerio de Justicia (autoridad de aplicación)',
    'Institutos de detención juvenil (PRISMA y equivalentes provinciales)',
    'Familias y representantes legales de adolescentes imputados',
    'Provincias (invitadas a adecuar su legislación procesal)',
  ],
  createdAt: '2026-03-09T00:00:00.000Z',
  updatedAt: '2026-03-09T00:00:00.000Z',
  amendments: [],
  annexes: [],
  segments: [],
  metadata: {
    id: 'meta-27801',
    lawId: 'ley-27801',
    mainTopic: 'Responsabilidad penal juvenil',
    subtopics: [
      'Penas y medidas para adolescentes',
      'Institutos especializados de detención',
      'Garantías procesales del adolescente imputado',
      'Derechos de las víctimas en proceso juvenil',
      'Mediación y suspensión del proceso a prueba',
      'Inimputabilidad',
      'Figura del supervisor especializado',
    ],
    relatedLaws: [
      'Convención sobre los Derechos del Niño (ley 23.849)',
      'Ley 26.061 — Protección Integral de NNyA',
      'Ley 27.372 — Derechos de las Víctimas',
      'Código Procesal Penal Federal (ley 27.063)',
      'Ley 24.390 — Plazos de Prisión Preventiva',
    ],
    regulations: [
      'Decreto reglamentario pendiente de dictado',
      'Resoluciones del Ministerio de Justicia sobre institutos especializados',
      'Adecuaciones procesales provinciales (invitación — art. 49)',
    ],
    modifyingNorms: [],
    derogatingNorms: ['Ley 22.278 y sus modificatorias (art. 48)'],
    jurisprudence: [
      'CSJN — "Maldonado, Daniel Enrique s/ robo agravado por el uso de armas" (2005) — declaró inconstitucional aplicar prisión perpetua a menores',
      'CSJN — "García Méndez, Emilio y Musa, Laura Cristina" (2008) — fijó límites al sistema tutelar de la ley 22.278',
      'Comité de los Derechos del Niño de la ONU — Observaciones a Argentina sobre el régimen de la ley 22.278',
    ],
    doctrine: [],
    obligations: [
      'Crear o adecuar institutos especializados de detención juvenil separados de adultos',
      'Designar supervisores con formación especializada en pedagogía juvenil, psicología o trabajo social',
      'Garantizar que jueces, fiscales y defensores con competencia juvenil tengan capacitación específica',
      'Comunicar cada detención a los representantes legales del adolescente',
      'Elaborar informes trimestrales sobre la situación de los adolescentes privados de libertad',
      'Proveer asistencia médica, psicológica y psiquiátrica especializada en los institutos',
    ],
    rights: [
      'Derecho al debido proceso desde el inicio del procedimiento',
      'Derecho a guardar silencio sin que ello implique presunción de culpabilidad',
      'Derecho a que el proceso sea reservado — prohibición de publicar el nombre del imputado',
      'Derecho a alojamiento en instituto especializado separado de adultos',
      'Prohibición de imposición de penas perpetuas (máximo 15 años)',
      'Derecho a la asistencia de un supervisor especializado',
      'Derecho a la educación, formación laboral y actividades deportivas durante la privación de libertad',
    ],
    sanctions: [
      'Amonestación',
      'Prohibición de conducir vehículos a motor',
      'Prohibición de asistir a determinados lugares o de acercarse a determinadas personas',
      'Obligación de reparar el daño causado',
      'Prestación de servicios a la comunidad (máximo 6 horas semanales)',
      'Prohibición de salida del país',
      'Tareas comunitarias',
      'Inhabilitación para obtener licencia de conducir',
      'Penas privativas de libertad: domiciliaria, en instituto especializado, o en sección separada del establecimiento carcelario (máximo 15 años)',
    ],
    useCases: [
      'Un adolescente de 16 años es imputado por robo simple → el fiscal puede aplicar criterio de oportunidad si la pena máxima no supera 6 años y no hubo violencia grave; alternativamente puede ofrecerse mediación o suspensión del proceso a prueba',
      'Un menor de 13 años comete un delito → es inimputado; la ley no le aplica; la investigación puede continuar para determinar el hecho pero no pueden imponerse las sanciones de la ley',
      'Un adolescente de 17 años es condenado por homicidio → la pena máxima es 15 años; está prohibida la prisión perpetua; debe cumplirse en instituto especializado separado de adultos',
      'Una víctima de un delito cometido por un adolescente → tiene derecho a asistencia psicológica, patrocinio jurídico gratuito y puede participar en el proceso de mediación si lo desea',
      'Un adolescente durante su detención → tiene derecho a educación, formación laboral, actividades deportivas, atención médica especializada y supervisión por un profesional capacitado',
    ],
    faq: [
      {
        question: '¿A partir de qué edad se aplica la Ley Penal Juvenil?',
        answer:
          'A los 14 años. Los menores de 14 son inimputables y no pueden recibir ninguna sanción penal de esta ley. La ley aplica desde los 14 hasta las 0 horas del día en que la persona cumple 18 años. A partir de esa hora, rigen las leyes penales de adultos.',
      },
      {
        question: '¿Qué pasó con la ley 22.278?',
        answer:
          'La ley 22.278 fue derogada íntegramente por el art. 48 de la nueva ley. Era un decreto de la dictadura militar de 1980 que habilitaba detener a menores sin condena bajo el nombre de "tutela", lo que fue sistemáticamente cuestionado como inconstitucional por organismos de derechos humanos y la propia Corte Suprema.',
      },
      {
        question: '¿Pueden los adolescentes recibir prisión perpetua?',
        answer:
          'No. El art. 19 prohíbe expresamente la reclusión perpetua y la prisión perpetua para adolescentes. El máximo absoluto de cualquier pena privativa de libertad es de 15 años, incluso en casos de concurso de delitos.',
      },
      {
        question: '¿Qué es el "supervisor" en la nueva ley?',
        answer:
          'Es un profesional especializado (psicólogo, pedagogo, trabajador social, especialista en adicciones) designado por el juez para acompañar al adolescente durante la ejecución de la pena. Mantiene entrevistas semanales, elabora informes mensuales y asiste al adolescente en su proceso de resocialización.',
      },
      {
        question: '¿Cuándo entra en vigencia la ley?',
        answer:
          'A los 180 días de su publicación en el Boletín Oficial, ocurrida el 9 de marzo de 2026. Por lo tanto, rige a partir del 5 de septiembre de 2026 aproximadamente.',
      },
      {
        question: '¿Qué diferencia hay entre "medidas complementarias" y "penas"?',
        answer:
          'Las medidas complementarias (art. 8) son intervenciones de apoyo como asesoramiento, educación, capacitación laboral o tratamiento médico. No son penas en sí mismas. Las penas (art. 12) son las sanciones propiamente dichas, desde la amonestación hasta la privación de libertad. Las medidas se aplican de forma accesoria junto a las penas o en lugar de ellas.',
      },
    ],
    createdAt: '2026-03-09T00:00:00.000Z',
    updatedAt: '2026-03-09T00:00:00.000Z',
  },
};
