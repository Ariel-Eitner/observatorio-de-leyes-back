import type { Article } from '../../../common/types/law.types';

// Capítulo I — Ámbito de aplicación (arts. 1-3)
// Capítulo II — Principios rectores (arts. 4-5)
// Capítulo III — Derechos de las víctimas (arts. 6-7)
// Capítulo IV Sección 1ª — Medidas complementarias (arts. 8-10)

export const ARTICLES_27801_01: Article[] = [
  {
    id: 'art-27801-1',
    lawId: 'ley-27801',
    number: '1',
    title: 'Objeto. Ámbito de aplicación',
    text:
      'El objeto de la presente ley es el establecimiento del régimen penal aplicable a las personas adolescentes, desde los catorce (14) años de edad hasta las cero (0) horas del día en que cumplan dieciocho (18) años de edad, cuando fueran imputadas por un hecho tipificado como delito en el Código Penal o en las leyes penales especiales vigentes o que se dicten en el futuro.',
    plainLanguageExplanation:
      'Esta ley crea un sistema penal especial para jóvenes de 14 a 18 años. Un menor de 14 no puede ser juzgado por esta ley. A partir de que cumple 18 años rige el derecho penal de adultos.',
    practicalEffects: [
      'Aplica desde los 14 años cumplidos hasta el día antes de cumplir 18',
      'Los menores de 14 son inimputables — ninguna sanción penal de esta ley les aplica',
      'A partir de las 0 horas del 18° cumpleaños, el hecho se juzga como adulto',
    ],
    examples: [
      'Un joven de 13 años comete un robo → inimputable; esta ley no aplica aunque el hecho sea delito',
      'Un joven de 17 años y 364 días comete un delito → se le aplica esta ley; si el día del hecho tenía 18, aplica el Código Penal',
    ],
    relatedArticles: ['art-27801-2', 'art-27801-24'],
    jurisprudence: [],
    regulations: [],
    keywords: ['ámbito de aplicación', 'edad', '14 años', '18 años', 'adolescente', 'imputado'],
    order: 1,
    segments: [
      {
        id: 'seg-27801-1-0',
        lawId: 'ley-27801',
        articleId: 'art-27801-1',
        articleNumber: '1',
        segmentType: 'PARAGRAPH',
        text:
          'El objeto de la presente ley es el establecimiento del régimen penal aplicable a las personas adolescentes, desde los catorce (14) años de edad hasta las cero (0) horas del día en que cumplan dieciocho (18) años de edad...',
        plainExplanation:
          'La ley aplica exactamente desde los 14 años cumplidos. El límite superior es preciso: a las 0 horas del 18° cumpleaños la persona deja de estar amparada por este régimen especial.',
        practicalExample:
          'Si un adolescente cumple 18 años el lunes, cualquier delito cometido el domingo anterior es juzgado por esta ley; cualquier delito del lunes en adelante, por el Código Penal de adultos.',
        references: [],
        order: 0,
      },
    ],
    amendments: [],
  },
  {
    id: 'art-27801-2',
    lawId: 'ley-27801',
    number: '2',
    title: 'Presunción de edad',
    text:
      'Las edades indicadas en el presente Capítulo se entienden siempre referidas al momento de la comisión del hecho y se acreditarán con Documento Nacional de Identidad, partidas de los Registros correspondientes y cualquier otro documento que permita determinarlas. Si no resulta posible comprobar fehacientemente las edades mínima o máxima establecida en el artículo 1°, deberá recabarse la prueba adecuada, requerirse los informes correspondientes o practicarse los peritajes necesarios. En caso de que los resultados de los informes requeridos no resultaran concluyentes, se presumirá la minoría de edad.',
    plainLanguageExplanation:
      'La edad se determina al momento del delito, no al del juicio. Si hay dudas sobre si el imputado era menor cuando cometió el hecho, se presume que sí lo era.',
    practicalEffects: [
      'La edad relevante es la del momento del delito, no la del juicio',
      'En caso de duda, siempre se presume la minoría de edad (principio pro minoris)',
      'Puede acreditarse con DNI, acta de nacimiento u otro documento oficial',
    ],
    examples: [
      'Un imputado sin documentos cuya edad es incierta → se realizan peritajes; si no son concluyentes, se lo trata como menor',
    ],
    relatedArticles: ['art-27801-1'],
    jurisprudence: [],
    regulations: [],
    keywords: ['presunción de edad', 'minoría de edad', 'momento del hecho', 'DNI', 'peritaje'],
    order: 2,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-3',
    lawId: 'ley-27801',
    number: '3',
    title: 'Aplicación supletoria',
    text:
      'Se aplicarán supletoriamente las disposiciones del Código Penal en cuanto no se opongan a la presente ley.',
    plainLanguageExplanation:
      'Todo lo que esta ley no regule expresamente se cubre con el Código Penal, siempre que no contradiga el espíritu del régimen juvenil.',
    practicalEffects: [
      'El Código Penal funciona como fuente supletoria para cuestiones no reguladas aquí',
      'Si algo del Código Penal contradice la lógica del régimen juvenil, prevalece esta ley',
    ],
    examples: [],
    relatedArticles: ['art-27801-1'],
    jurisprudence: [],
    regulations: [],
    keywords: ['aplicación supletoria', 'Código Penal', 'fuente'],
    order: 3,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-4',
    lawId: 'ley-27801',
    number: '4',
    title: 'Finalidad',
    text:
      'La finalidad del Régimen de Responsabilidad Penal Juvenil es fomentar en el adolescente imputado el sentido de la responsabilidad legal por sus actos y lograr su educación, resocialización e integración social.\n\nEl objetivo de la ley es procurar que supere el riesgo social y la conflictividad puesta en evidencia en la comisión del delito y, mediante las medidas establecidas en la presente ley.',
    plainLanguageExplanation:
      'La ley no busca castigar por castigar: su objetivo principal es que el joven aprenda a hacerse responsable de sus actos, se eduque y se reintegre a la sociedad. Las penas son un medio, no un fin.',
    practicalEffects: [
      'Las penas deben orientarse a la resocialización, no solo a la punición',
      'El juez debe considerar este objetivo al elegir entre las distintas penas disponibles',
      'Informa la interpretación de toda la ley: ante la duda, se elige la opción más orientada a la integración social',
    ],
    examples: [
      'Al elegir entre privación de libertad y tareas comunitarias para un delito leve, el juez debe preferir la que mejor contribuya a la resocialización del adolescente',
    ],
    relatedArticles: ['art-27801-5', 'art-27801-12'],
    jurisprudence: [],
    regulations: [],
    keywords: ['finalidad', 'resocialización', 'educación', 'responsabilidad', 'integración social'],
    order: 4,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-5',
    lawId: 'ley-27801',
    number: '5',
    title: 'Principios, derechos y garantías generales',
    text:
      'Desde el inicio del proceso penal y hasta su finalización, el niño, niña o adolescente gozará de los derechos y garantías reconocidos en la Constitución Nacional, los instrumentos internacionales de derechos humanos, las Constituciones provinciales, de los ordenamientos locales y demás normas de aplicación.\n\nSin perjuicio de lo expuesto en el primer párrafo, deberán asegurarse durante el proceso los siguientes principios, derechos y garantías judiciales:\n\na) Legalidad: no ser objeto de medidas que no estén previstas en la legislación nacional o provincial;\n\nb) Necesidad, proporcionalidad e idoneidad de las medidas que restrinjan derechos: cualquier medida de restricción o injerencia en sus derechos constitucionales y convencionales deberá ser indispensable, proporcional, idónea y que resulte ser la medida menos lesiva a sus derechos. Cualquier medida que afecte sus derechos deberá ser interpretada de modo restrictivo y excepcional;\n\nc) Debido proceso legal y derecho de defensa en juicio: el adolescente imputado deberá contar desde el inicio del procedimiento con asistencia legal, eficaz e idónea; deberá comunicársele inmediatamente la imputación de modo claro y preciso de manera que la pueda comprender, informársele la totalidad de los derechos con los que cuenta, a fin de asegurarle eficazmente los medios y el tiempo adecuado para confrontar la acusación; informársele del derecho constitucional a guardar silencio y garantizarse de modo amplio el debido proceso y el derecho de defensa en juicio;\n\nd) In dubio pro reo e interpretación pro minoris: en la resolución judicial de su responsabilidad penal, el juez deberá tener especial consideración del principio in dubio pro reo, tanto en lo que respecta a la comprobación de la autoría o participación del adolescente imputado en la comisión del delito como en la constatación judicial de la concurrencia de causas de justificación;\n\ne) Penas: el régimen de penas deberá orientarse siempre a la educación y resocialización, a fin de que el adolescente imputado obtenga un futuro con integración social y trabajo, comprensión y arrepentimiento por la conducta punible perpetrada. Además, deberá tender a disminuir el riesgo de que incurra en la comisión de nuevos delitos;\n\nf) Respeto: el adolescente imputado deberá ser tratado con respeto y consideración a lo largo del proceso;\n\ng) Dignidad humana y prohibición de discriminación: el adolescente imputado tendrá derecho a que se respete su dignidad humana y a no ser discriminado por motivos de raza, color, sexo, identidad de género, idioma, religión, opinión política o de otra índole, origen nacional, étnico o social, posición económica, impedimentos físicos, nacimiento o cualquier otra condición;\n\nh) Plazo razonable de juzgamiento, brevedad y celeridad procesal: el adolescente imputado tendrá derecho a ser juzgado en un plazo razonable, sin dilaciones injustificadas o indebidas. Se deberá tramitar el proceso con premura, priorizando los casos en los que el imputado se encuentre detenido con prisión preventiva. La dilación injustificada a contar desde la intimación del hecho al adolescente imputado hará responsable al magistrado interviniente por falta grave;\n\ni) Reserva del proceso: el proceso deberá tener carácter reservado, salvo para las partes, la defensa, la víctima y los padres o responsables del adolescente imputado. Se prohíbe la publicidad del nombre del adolescente imputado, salvo que el mismo renuncie expresamente a este derecho. El incumplimiento será sancionado en los términos del artículo 2º de la ley 20.056;\n\nj) Privación de la libertad. Requisitos necesarios e imprescindibles: se entenderá como privación de la libertad a toda forma de detención, internación, encarcelamiento o alojamiento en un establecimiento dispuesta por el juez o tribunal en la que no se le permita el egreso por propia voluntad. La medida que implique la restricción de la libertad durante el procedimiento deberá decretarse en auto motivado y fundamentarse en la existencia de riesgos procesales debidamente constatados;\n\nk) Lugar del alojamiento: producida la detención de un adolescente y en caso de que sea indispensable su encierro, su alojamiento deberá hacerse efectivo en dependencias acondicionadas especialmente para ese fin, bajo la dirección de personal idóneo para el trato con aquellos. Queda prohibido dicho alojamiento junto a personas mayores de edad;\n\nl) Derechos de los padres o de sus responsables. Información: al formularse la imputación a un niño, niña o adolescente, la autoridad judicial competente deberá comunicar su actuación y los actos procesales desarrollados a los padres o responsables parentales;\n\nm) Tutela juvenil: durante el proceso, el juez podrá ordenar todas las medidas protectorias que considere necesarias al efecto de salvaguardar la integridad física, mental y social del niño, niña o adolescente, incluidas las enumeradas en el artículo 8° de la presente;\n\nn) Otros principios rectores: se deberá tener en especial consideración la protección integral de la víctima y sus familiares, la seguridad pública y la protección de la sociedad. En todo proceso que involucre como imputada o víctima a una persona menor de dieciocho (18) años, deberá intervenir la asesoría tutelar correspondiente.',
    plainLanguageExplanation:
      'Este artículo es el núcleo de garantías del proceso penal juvenil. Los más importantes: el proceso es reservado (no se puede publicar el nombre del adolescente), la privación de libertad requiere auto motivado, el adolescente tiene derecho a abogado desde el primer momento, y no puede estar alojado junto a adultos detenidos.',
    practicalEffects: [
      'El proceso penal debe ser reservado: ningún medio puede publicar el nombre del adolescente imputado',
      'La privación de libertad es siempre excepcional y requiere auto motivado',
      'El adolescente tiene derecho a abogado desde el primer momento, no desde la imputación formal',
      'Los progenitores deben ser notificados de todas las actuaciones',
      'Está prohibido alojar al adolescente junto a adultos detenidos',
      'La dilación injustificada hace responsable al juez por falta grave',
    ],
    examples: [
      'Un medio periodístico publica el nombre de un menor de 17 años imputado → viola el inciso i); el incumplimiento es sancionado por ley 20.056',
      'La policía detiene a un adolescente sin orden judicial → debe comunicarlo de inmediato a sus padres y a un defensor oficial',
    ],
    relatedArticles: ['art-27801-4', 'art-27801-37', 'art-27801-38', 'art-27801-39'],
    jurisprudence: [
      'CSJN — "Maldonado" (2005): la Corte estableció que las garantías constitucionales aplican en plenitud al proceso penal juvenil',
    ],
    regulations: [],
    keywords: ['garantías', 'principios', 'legalidad', 'proporcionalidad', 'reserva', 'debido proceso', 'dignidad', 'plazo razonable'],
    order: 5,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-6',
    lawId: 'ley-27801',
    number: '6',
    title: 'Protección permanente de los derechos de las víctimas',
    text:
      'El juez y el representante del Ministerio Público Fiscal deberán velar en todo momento por la tutela efectiva de los derechos de las víctimas y de las personas perjudicadas por los delitos cometidos por los adolescentes.',
    plainLanguageExplanation:
      'Tanto el juez como el fiscal tienen la obligación activa de proteger los derechos de la víctima y de quienes resultaron perjudicados durante todo el proceso.',
    practicalEffects: [
      'El juez y el fiscal no son neutrales respecto de la víctima: tienen un deber de protección activo',
      'Complementa y refuerza la Ley 27.372 de derechos de las víctimas',
    ],
    examples: [],
    relatedArticles: ['art-27801-7', 'art-27801-40'],
    jurisprudence: [],
    regulations: [],
    keywords: ['víctimas', 'tutela', 'juez', 'fiscal', 'protección'],
    order: 6,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-7',
    lawId: 'ley-27801',
    number: '7',
    title: 'Derechos. Responsabilidad civil',
    text:
      'Desde el inicio de un proceso penal juvenil y hasta su finalización, la víctima gozará de los derechos reconocidos en la Constitución Nacional, los instrumentos internacionales de derechos humanos y las leyes de protección de los derechos de las víctimas que en cada jurisdicción corresponda aplicar.\n\nLos progenitores de los niños, niñas y adolescentes sometidos a proceso penal serán civilmente responsables por los ilícitos cometidos por sus hijos, de conformidad con lo establecido por el Código Civil y Comercial de la Nación (ley 26.994).',
    plainLanguageExplanation:
      'Las víctimas tienen todos los derechos constitucionales e internacionales. Además, los padres del adolescente son civilmente responsables por los daños que él cause — pueden ser demandados por reparación económica.',
    practicalEffects: [
      'Los padres o tutores del adolescente responden civilmente por los daños causados, conforme el CCyCN',
      'La víctima puede demandar a los padres en sede civil aunque el adolescente sea absuelto penalmente',
    ],
    examples: [
      'Un adolescente de 15 años rompe vidrieras de un comercio → el comerciante puede demandar a los padres del menor por los daños en sede civil',
    ],
    relatedArticles: ['art-27801-6', 'art-27801-26', 'art-27801-40'],
    jurisprudence: [],
    regulations: ['Código Civil y Comercial de la Nación (ley 26.994) — responsabilidad civil de los progenitores'],
    keywords: ['víctimas', 'responsabilidad civil', 'progenitores', 'CCyCN', 'daños'],
    order: 7,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-8',
    lawId: 'ley-27801',
    number: '8',
    title: 'Medidas complementarias. Enunciación',
    text:
      'Al disponerse una condena de ejecución condicional o alguna de las penas previstas en el artículo 12, y en el marco de alguno de los institutos regulados en los artículos 42 y 43 de la presente ley, deberán imponerse al adolescente una o algunas de las siguientes medidas complementarias:\n\na) asesoramiento, orientación o supervisión periódica de un equipo interdisciplinario;\n\nb) asistencia a programas educativos y a medidas conducentes para garantizar al adolescente su derecho a la educación y conclusión de los estudios obligatorios. A los fines de la escolaridad obligatoria, deberán implementarse programas específicos de manera coordinada con el sistema educativo de la jurisdicción. Las sanciones disciplinarias aplicadas al imputado en ningún caso pueden implicar una interrupción de los estudios;\n\nc) asistencia a programas de formación ciudadana, cursos o programas dirigidos a su inserción social, a evitar futuros conflictos, a comprender sus derechos y deberes cívicos, familiares y sociales;\n\nd) asistencia a programas de capacitación laboral, con el objeto de aprender un oficio o profesión para su futura inserción laboral;\n\ne) participación en programas deportivos, recreativos o culturales, para su adecuado desarrollo personal y su integración con sus pares;\n\nf) concurrencia a los servicios de salud acorde a su edad;\n\ng) participación en un tratamiento médico o psicológico por el plazo que los profesionales de la salud estimen necesario;\n\nh) obtención, en un plazo razonable en tanto sea permitido por la legislación laboral, de un trabajo, en el que deberá dar cuenta de su ingreso y registro laboral y aportar al tribunal las constancias pertinentes, que deberán ser verificadas por el juzgado interviniente;\n\ni) obligación de concurrir al tribunal o ante la autoridad que el juez determine;\n\nj) prohibición del consumo o uso de estupefacientes o de bebidas alcohólicas.',
    plainLanguageExplanation:
      'Las medidas complementarias no son penas: son herramientas de acompañamiento que se aplican junto con la condena o las penas del art. 12. Van desde tratamientos médicos hasta actividades deportivas o capacitación laboral. Una sanción disciplinaria no puede interrumpir la educación del adolescente.',
    practicalEffects: [
      'Se aplican junto a las penas del art. 12 o en el marco de los institutos de los arts. 42 y 43, no en reemplazo',
      'El juez puede combinar varias medidas según las necesidades del adolescente',
      'Ninguna sanción disciplinaria puede interrumpir los estudios obligatorios',
    ],
    examples: [
      'A un adolescente condenado por robo se le impone además asistir a un programa de capacitación laboral y tratamiento psicológico → estas son medidas complementarias del art. 8',
    ],
    relatedArticles: ['art-27801-9', 'art-27801-10', 'art-27801-12', 'art-27801-42', 'art-27801-43'],
    jurisprudence: [],
    regulations: [],
    keywords: ['medidas complementarias', 'educación', 'capacitación', 'tratamiento', 'adicciones', 'deportes', 'asesoramiento'],
    order: 8,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-9',
    lawId: 'ley-27801',
    number: '9',
    title: 'Custodia del adolescente imputado y derecho a ser oído',
    text:
      'Si el adolescente careciera de grupo familiar o si este resultara inconveniente y perjudicial para su interés superior, a requerimiento del fiscal, de la defensa o de los organismos de protección de la niñez, se dispondrá su permanencia temporal en ámbitos familiares considerados alternativos o bajo la custodia de organismos de protección de la niñez que garanticen de mejor modo la seguridad y el interés superior del niño.\n\nEn todos los casos, se deberá oír y tener en cuenta la opinión del adolescente imputado, su defensor, el fiscal y la víctima.\n\nEl juez podrá solicitar la asistencia de los órganos especializados de protección de la niñez, los que actuarán bajo su supervisión y responsabilidad.',
    plainLanguageExplanation:
      'Si la familia del adolescente es perjudicial para él, el juez puede ordenar que viva transitoriamente con una familia alternativa o bajo la custodia de organismos de niñez. En todos los casos, el adolescente tiene derecho a ser escuchado.',
    practicalEffects: [
      'Medida provisional — no permanente; puede ser pedida por el fiscal, la defensa o los organismos de niñez',
      'Se prioriza el interés superior del niño',
      'El adolescente siempre debe ser oído antes de tomar la decisión',
    ],
    examples: [],
    relatedArticles: ['art-27801-8', 'art-27801-10'],
    jurisprudence: [],
    regulations: [],
    keywords: ['custodia alternativa', 'familia', 'interés superior', 'organismos de niñez', 'derecho a ser oído'],
    order: 9,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-10',
    lawId: 'ley-27801',
    number: '10',
    title: 'Control de las medidas. Revocación',
    text:
      'El cumplimiento de las medidas reseñadas en esta Sección estará sometido a control judicial. A tales efectos, las partes y los funcionarios a cargo de los organismos pertinentes deberán aportar al juez de la causa toda la información requerida.\n\nEn caso de incumplimiento de tales medidas, se deberá disponer el inmediato cumplimiento de la pena dejada en suspenso, sin computar el plazo de transgresión, imponerse alguna o algunas de las previstas en el artículo 12 o continuarse con el proceso, si se hubiera dispuesto en el marco previsto en los artículos 42 y 43 de esta ley.',
    plainLanguageExplanation:
      'El juez controla que se cumplan las medidas complementarias. Si el adolescente incumple, debe activarse inmediatamente la pena suspendida o se le impone una pena del art. 12. El plazo de incumplimiento no se computa.',
    practicalEffects: [
      'Las medidas están bajo control judicial permanente',
      'El incumplimiento activa de inmediato la pena suspendida, sin computar el período de incumplimiento',
      'Si fue en el marco de los arts. 42 o 43, se continúa el proceso',
    ],
    examples: [],
    relatedArticles: ['art-27801-8', 'art-27801-12', 'art-27801-42', 'art-27801-43'],
    jurisprudence: [],
    regulations: [],
    keywords: ['control judicial', 'revocación', 'incumplimiento', 'medidas complementarias'],
    order: 10,
    segments: [],
    amendments: [],
  },
];
