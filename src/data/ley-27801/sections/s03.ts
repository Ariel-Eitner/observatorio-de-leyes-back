import type { Article } from '../../../common/types/law.types';

// Capítulo V — Extinción de la acción penal (art. 22)
// Capítulo VI — Supervisión (art. 23)
// Capítulo VII — Inimputabilidad (arts. 24-26)
// Capítulo VIII — Institutos especializados (arts. 27-34)
// Capítulo IX — Medidas de salud (arts. 35-36)

export const ARTICLES_27801_03: Article[] = [
  {
    id: 'art-27801-22',
    lawId: 'ley-27801',
    number: '22',
    title: 'Suspensión de la prescripción de la acción penal',
    originalText:
      'Además de las causales previstas en el Código Penal, la prescripción de la acción penal para los delitos en cuyo juzgamiento se aplique esta ley se suspende en los supuestos de:\n\na) delitos para cuyo juzgamiento fuera necesaria la resolución de cuestiones previas o prejudiciales que deban ser resueltas en otro juicio;\n\nb) sustanciación de los procedimientos de mediación;\n\nc) intervención del profesional previsto en la Ley Nacional de Salud Mental N° 26.657.\n\nFinalizada la causa de la suspensión, se reanuda el plazo de la prescripción de la acción penal.',
    currentText:
      'Además de las causales previstas en el Código Penal, la prescripción de la acción penal para los delitos en cuyo juzgamiento se aplique esta ley se suspende en los supuestos de:\n\na) delitos para cuyo juzgamiento fuera necesaria la resolución de cuestiones previas o prejudiciales que deban ser resueltas en otro juicio;\n\nb) sustanciación de los procedimientos de mediación;\n\nc) intervención del profesional previsto en la Ley Nacional de Salud Mental N° 26.657.\n\nFinalizada la causa de la suspensión, se reanuda el plazo de la prescripción de la acción penal.',
    plainLanguageExplanation:
      'La prescripción (el plazo para que el Estado pierda el derecho de perseguir el delito) se suspende en tres casos adicionales a los del Código Penal: cuestiones prejudiciales en otro juicio, durante una mediación, o cuando interviene un profesional de salud mental. Cuando cesa la causa, el plazo retoma.',
    practicalEffects: [
      'Durante una mediación penal juvenil, el plazo de prescripción no corre',
      'Si hay una cuestión prejudicial (ej. determinación de paternidad necesaria para el proceso), la prescripción se suspende',
      'La intervención de un profesional de salud mental (ley 26.657) también suspende el plazo',
      'Al cesar la causa de suspensión, se retoma el plazo desde donde estaba — no desde cero',
    ],
    examples: [
      'Adolescente imputado cuyo caso ingresa a mediación → la prescripción queda suspendida durante todo el proceso de mediación',
    ],
    relatedArticles: ['art-27801-42'],
    jurisprudence: [],
    regulations: ['Ley Nacional de Salud Mental N° 26.657 — intervención profesional en salud mental'],
    keywords: ['prescripción', 'suspensión', 'mediación', 'salud mental', 'cuestión prejudicial'],
    order: 22,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-23',
    lawId: 'ley-27801',
    number: '23',
    title: 'Supervisor',
    originalText:
      'Una vez determinadas las medidas previstas en el artículo 8° o las penas enunciadas en el artículo 12, el juez deberá designar un supervisor especializado a cargo del seguimiento, asistencia y control del imputado.\n\nLas provincias y la Ciudad Autónoma de Buenos Aires normarán sobre los procesos de nombramiento, remoción y sanción de los supervisores, como así todo lo referido a su situación procesal, siguiendo los lineamientos generales del presente artículo.\n\nEl supervisor deberá contar con conocimientos y formación académica en educación, pedagogía infantojuvenil, psicología, adicciones y trabajo social.\n\nSe deberá garantizar que la cantidad de adolescentes asignados a cada supervisor permita el adecuado seguimiento y supervisión de cada uno de los adolescentes imputados.\n\nEl supervisor deberá:\n\na) mantener entrevistas semanales con el adolescente y seguir, asistir, supervisar y controlar su evolución durante el proceso y su detención;\n\nb) elaborar informes mensuales sobre la educación, formación y actitud del adolescente, detallando su desempeño, evolución y demás datos de interés que se incorporarán al legajo personal;\n\nc) procurar resolver los problemas personales, familiares o de salud mental o de adicciones del adolescente;\n\nd) relacionarse y trabajar en conjunto con los demás profesionales intervinientes.',
    currentText:
      'Una vez determinadas las medidas previstas en el artículo 8° o las penas enunciadas en el artículo 12, el juez deberá designar un supervisor especializado a cargo del seguimiento, asistencia y control del imputado.\n\nLas provincias y la Ciudad Autónoma de Buenos Aires normarán sobre los procesos de nombramiento, remoción y sanción de los supervisores, como así todo lo referido a su situación procesal, siguiendo los lineamientos generales del presente artículo.\n\nEl supervisor deberá contar con conocimientos y formación académica en educación, pedagogía infantojuvenil, psicología, adicciones y trabajo social.\n\nSe deberá garantizar que la cantidad de adolescentes asignados a cada supervisor permita el adecuado seguimiento y supervisión de cada uno de los adolescentes imputados.\n\nEl supervisor deberá:\n\na) mantener entrevistas semanales con el adolescente y seguir, asistir, supervisar y controlar su evolución durante el proceso y su detención;\n\nb) elaborar informes mensuales sobre la educación, formación y actitud del adolescente, detallando su desempeño, evolución y demás datos de interés que se incorporarán al legajo personal;\n\nc) procurar resolver los problemas personales, familiares o de salud mental o de adicciones del adolescente;\n\nd) relacionarse y trabajar en conjunto con los demás profesionales intervinientes.',
    plainLanguageExplanation:
      'Cada adolescente condenado tiene un supervisor obligatorio: un profesional especializado que lo entrevista semanalmente, elabora informes mensuales al juez y trabaja para resolver sus problemas. No es un vigilante: es un acompañante profesional con formación en psicología, trabajo social y adicciones.',
    practicalEffects: [
      'El juez DEBE designar un supervisor una vez impuestas las penas o medidas',
      'Las entrevistas son semanales — obligatorias',
      'Los informes son mensuales e integran el legajo personal del adolescente',
      'La ratio adolescentes/supervisor debe permitir un seguimiento real y adecuado',
    ],
    examples: [
      'Un adolescente condenado a prestación de servicios comunitarios + prohibición de contacto → el juez nombra un supervisor que lo entrevista cada semana e informa al juzgado mensualmente',
    ],
    relatedArticles: ['art-27801-8', 'art-27801-12', 'art-27801-46'],
    jurisprudence: [],
    regulations: [],
    keywords: ['supervisor', 'seguimiento', 'entrevistas semanales', 'informes mensuales', 'legajo personal', 'trabajo social'],
    order: 23,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-24',
    lawId: 'ley-27801',
    number: '24',
    title: 'Inimputabilidad',
    originalText:
      'En ningún caso los menores inimputables serán pasibles de las sanciones previstas en la presente ley.\n\nLa declaración de inimputabilidad del niño, niña o adolescente no implicará en ningún caso la suspensión de la investigación, que deberá continuar a los efectos de determinar la existencia y circunstancias del hecho ilícito y la presunta intervención de terceras personas que pudieran estar involucradas.',
    currentText:
      'En ningún caso los menores inimputables serán pasibles de las sanciones previstas en la presente ley.\n\nLa declaración de inimputabilidad del niño, niña o adolescente no implicará en ningún caso la suspensión de la investigación, que deberá continuar a los efectos de determinar la existencia y circunstancias del hecho ilícito y la presunta intervención de terceras personas que pudieran estar involucradas.',
    plainLanguageExplanation:
      'Los inimputables no pueden recibir penas de esta ley. Pero que el adolescente sea declarado inimputable no detiene la investigación: el proceso continúa para esclarecer el hecho y detectar a otros posibles responsables adultos.',
    practicalEffects: [
      'Ninguna sanción de esta ley aplica a un inimputable',
      'La declaración de inimputabilidad no archiva la causa: la investigación continúa',
      'La investigación continúa para determinar el hecho y posibles partícipes mayores de edad',
    ],
    examples: [
      'Un adolescente de 15 años es declarado inimputable por un trastorno mental → no puede ser condenado por esta ley, pero la investigación sigue para determinar si hubo adultos involucrados',
    ],
    relatedArticles: ['art-27801-1', 'art-27801-25', 'art-27801-26'],
    jurisprudence: [],
    regulations: [],
    keywords: ['inimputabilidad', 'sanciones', 'investigación', 'continuación del proceso'],
    order: 24,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-25',
    lawId: 'ley-27801',
    number: '25',
    title: 'Determinación de la inimputabilidad',
    originalText:
      'En forma previa a la declaración de la inimputabilidad de adolescentes que tuvieran entre catorce (14) y dieciocho (18) años de edad, el juez deberá:\n\na) ordenar un peritaje psicológico y psiquiátrico, así como otros estudios que estimase necesarios para determinar si la persona inimputable resulta peligrosa para sí o para terceros, o si existe riesgo de que incurra en nuevos delitos. A estos fines, también podrá ordenar un peritaje médico con finalidad preventiva de consumo problemático, y solicitar en su caso recomendaciones para su recuperación;\n\nb) ordenar un amplio informe ambiental para comprobar sus condiciones de vida, familia, educación, trabajo, estudios, contención y comprobar su relación con la sociedad;\n\nc) consultar al equipo interdisciplinario y dar intervención en forma conjunta o alternativa, según resulte necesario, a:\n\nc.1) los organismos de protección de derechos del niño para que implementen los controles, brinden la colaboración y la asistencia legalmente establecidas;\n\nc.2) los equipos de salud conforme la Ley Nacional de Salud Mental N° 26.657.',
    currentText:
      'En forma previa a la declaración de la inimputabilidad de adolescentes que tuvieran entre catorce (14) y dieciocho (18) años de edad, el juez deberá:\n\na) ordenar un peritaje psicológico y psiquiátrico, así como otros estudios que estimase necesarios para determinar si la persona inimputable resulta peligrosa para sí o para terceros, o si existe riesgo de que incurra en nuevos delitos. A estos fines, también podrá ordenar un peritaje médico con finalidad preventiva de consumo problemático, y solicitar en su caso recomendaciones para su recuperación;\n\nb) ordenar un amplio informe ambiental para comprobar sus condiciones de vida, familia, educación, trabajo, estudios, contención y comprobar su relación con la sociedad;\n\nc) consultar al equipo interdisciplinario y dar intervención en forma conjunta o alternativa, según resulte necesario, a:\n\nc.1) los organismos de protección de derechos del niño para que implementen los controles, brinden la colaboración y la asistencia legalmente establecidas;\n\nc.2) los equipos de salud conforme la Ley Nacional de Salud Mental N° 26.657.',
    plainLanguageExplanation:
      'Antes de declarar a alguien inimputable, el juez debe ordenar peritajes psicológicos y psiquiátricos, un informe ambiental completo (familia, educación, trabajo) y dar intervención a organismos de niñez y salud mental. No se puede declarar inimputabilidad sin este procedimiento.',
    practicalEffects: [
      'La declaración de inimputabilidad requiere un proceso previo con peritajes y informe ambiental',
      'Deben intervenir organismos de niñez y equipos de salud mental (ley 26.657)',
      'El peritaje puede incluir evaluación de consumo problemático de sustancias',
    ],
    examples: [],
    relatedArticles: ['art-27801-24', 'art-27801-26'],
    jurisprudence: [],
    regulations: ['Ley Nacional de Salud Mental N° 26.657 — equipos de salud en declaración de inimputabilidad'],
    keywords: ['inimputabilidad', 'peritaje psicológico', 'peritaje psiquiátrico', 'informe ambiental', 'equipo interdisciplinario'],
    order: 25,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-26',
    lawId: 'ley-27801',
    number: '26',
    title: 'Responsabilidad civil en caso de inimputabilidad',
    originalText:
      'La responsabilidad civil por los hechos a los que se refiere este Capítulo quedará a salvo y la acción pertinente se deberá ejercer ante los tribunales competentes.',
    currentText:
      'La responsabilidad civil por los hechos a los que se refiere este Capítulo quedará a salvo y la acción pertinente se deberá ejercer ante los tribunales competentes.',
    plainLanguageExplanation:
      'Aunque el adolescente sea declarado inimputable (sin responsabilidad penal), los daños que causó generan responsabilidad civil. La víctima puede reclamar indemnización ante la justicia civil.',
    practicalEffects: [
      'La inimputabilidad penal no elimina la responsabilidad civil',
      'La acción civil se ejerce ante los tribunales civiles competentes',
    ],
    examples: [
      'Un adolescente declarado inimputable que causó daños materiales → la víctima puede demandar por daños y perjuicios en sede civil, aunque no hubo condena penal',
    ],
    relatedArticles: ['art-27801-7', 'art-27801-24', 'art-27801-25'],
    jurisprudence: [],
    regulations: [],
    keywords: ['responsabilidad civil', 'inimputabilidad', 'daños', 'acción civil'],
    order: 26,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-27',
    lawId: 'ley-27801',
    number: '27',
    title: 'Lugar de alojamiento',
    originalText:
      'El adolescente deberá ser alojado en un instituto adecuado de detención, con personal que cuente con capacitación especializada en el trato con jóvenes en conflicto con la ley penal, que cada jurisdicción organizará siguiendo los principios generales que se establecen en el presente Capítulo.',
    currentText:
      'El adolescente deberá ser alojado en un instituto adecuado de detención, con personal que cuente con capacitación especializada en el trato con jóvenes en conflicto con la ley penal, que cada jurisdicción organizará siguiendo los principios generales que se establecen en el presente Capítulo.',
    plainLanguageExplanation:
      'Los adolescentes privados de libertad deben estar en institutos especializados, no en cárceles de adultos, con personal específicamente capacitado para tratar con jóvenes en conflicto con la ley.',
    practicalEffects: [
      'Obligación de alojamiento en instituto especializado — no en establecimientos para adultos',
      'El personal debe tener capacitación específica en trato con adolescentes',
      'Cada provincia organiza sus propios institutos siguiendo estos principios generales',
    ],
    examples: [],
    relatedArticles: ['art-27801-17', 'art-27801-28', 'art-27801-30'],
    jurisprudence: [],
    regulations: [],
    keywords: ['instituto de detención', 'alojamiento', 'personal especializado', 'jóvenes en conflicto con la ley'],
    order: 27,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-28',
    lawId: 'ley-27801',
    number: '28',
    title: 'Dirección del instituto',
    originalText:
      'El lugar de alojamiento deberá ser dirigido por personal capacitado.',
    currentText:
      'El lugar de alojamiento deberá ser dirigido por personal capacitado.',
    plainLanguageExplanation:
      'La dirección del instituto donde se alojan adolescentes debe estar en manos de personal capacitado.',
    practicalEffects: [
      'No es suficiente que el personal de trato sea especializado: la dirección también debe serlo',
    ],
    examples: [],
    relatedArticles: ['art-27801-27', 'art-27801-38'],
    jurisprudence: [],
    regulations: [],
    keywords: ['dirección', 'instituto', 'personal capacitado'],
    order: 28,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-29',
    lawId: 'ley-27801',
    number: '29',
    title: 'Características de la detención',
    originalText:
      'La detención se deberá orientar a la educación, formación, resocialización y reinserción social del adolescente, mediante la tutela de la dignidad humana.',
    currentText:
      'La detención se deberá orientar a la educación, formación, resocialización y reinserción social del adolescente, mediante la tutela de la dignidad humana.',
    plainLanguageExplanation:
      'El encierro no puede ser un fin en sí mismo: debe orientarse siempre a educar, formar y reinsertar socialmente al adolescente, con respeto pleno de su dignidad.',
    practicalEffects: [
      'Cualquier régimen de detención que no contemple componentes educativos o formativos viola esta norma',
      'La dignidad humana es un límite absoluto al régimen de detención',
    ],
    examples: [],
    relatedArticles: ['art-27801-18', 'art-27801-32'],
    jurisprudence: [],
    regulations: [],
    keywords: ['educación', 'formación', 'resocialización', 'reinserción', 'dignidad humana'],
    order: 29,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-30',
    lawId: 'ley-27801',
    number: '30',
    title: 'Condiciones de detención',
    originalText:
      'Se establecen las siguientes reglas:\n\na) los adolescentes imputados no deberán tener contacto con personas detenidas mayores de edad. Al alcanzar la mayoría de edad y mientras aún no hubiere concluido la pena establecida, deberán cumplir el resto de la condena en los establecimientos penitenciarios para mayores de edad.\n\nA petición del interesado, y con la aceptación de las autoridades del establecimiento respectivo, el adolescente que llegara a la mayoría de edad podrá seguir en el mismo instituto especializado hasta la finalización del año calendario en que hubiera alcanzado la mayoría, siempre que ello fuera conveniente para la continuidad de un tratamiento médico o psicológico, o de un programa educativo o laboral;\n\nb) dentro de los lugares de detención, los menores en conflicto con la ley penal serán ubicados atendiendo a los siguientes criterios:\n\nb.1) personalidad, características personales y condiciones de salud;\n\nb.2) edad de los alojados; se debe procurar respetar las franjas etarias;\n\nb.3) identidad cultural y educativa;\n\nb.4) naturaleza cautelar o punitiva de la privación de la libertad.',
    currentText:
      'Se establecen las siguientes reglas:\n\na) los adolescentes imputados no deberán tener contacto con personas detenidas mayores de edad. Al alcanzar la mayoría de edad y mientras aún no hubiere concluido la pena establecida, deberán cumplir el resto de la condena en los establecimientos penitenciarios para mayores de edad.\n\nA petición del interesado, y con la aceptación de las autoridades del establecimiento respectivo, el adolescente que llegara a la mayoría de edad podrá seguir en el mismo instituto especializado hasta la finalización del año calendario en que hubiera alcanzado la mayoría, siempre que ello fuera conveniente para la continuidad de un tratamiento médico o psicológico, o de un programa educativo o laboral;\n\nb) dentro de los lugares de detención, los menores en conflicto con la ley penal serán ubicados atendiendo a los siguientes criterios:\n\nb.1) personalidad, características personales y condiciones de salud;\n\nb.2) edad de los alojados; se debe procurar respetar las franjas etarias;\n\nb.3) identidad cultural y educativa;\n\nb.4) naturaleza cautelar o punitiva de la privación de la libertad.',
    plainLanguageExplanation:
      'Prohibición absoluta de convivencia con adultos detenidos. Al cumplir 18 pasa a establecimiento penitenciario para adultos, salvo que solicite permanecer hasta fin del año calendario por tratamiento médico o programa educativo en curso. Dentro del instituto, los adolescentes se clasifican por personalidad, edad, cultura y tipo de privación.',
    practicalEffects: [
      'Prohibición absoluta de contacto con adultos detenidos',
      'Al cumplir 18, el adolescente pasa a establecimiento penitenciario de adultos para cumplir el resto',
      'Excepción: puede permanecer hasta fin del año calendario si hay tratamiento médico o programa educativo en curso, a su solicitud',
      'Dentro del instituto, se clasifica por personalidad, franja etaria, identidad cultural y tipo de privación',
    ],
    examples: [
      'Un adolescente que cumple 18 el 15 de mayo mientras está en el instituto puede pedir permanecer hasta el 31 de diciembre si está haciendo un tratamiento psicológico',
    ],
    relatedArticles: ['art-27801-5', 'art-27801-27'],
    jurisprudence: [],
    regulations: [],
    keywords: ['condiciones de detención', 'mayoría de edad', 'adultos', 'clasificación', 'franja etaria'],
    order: 30,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-31',
    lawId: 'ley-27801',
    number: '31',
    title: 'Atención médica, psicológica y psiquiátrica',
    originalText:
      'Se deberá garantizar el acceso a asistencia médica y psicológica a cargo de profesionales de la salud especializados en adolescentes. Solo el juez competente podrá autorizar las salidas del lugar de detención en los casos en que deba ser atendido fuera del establecimiento, salvo supuestos de urgencia que deberán ser informados al tribunal.',
    currentText:
      'Se deberá garantizar el acceso a asistencia médica y psicológica a cargo de profesionales de la salud especializados en adolescentes. Solo el juez competente podrá autorizar las salidas del lugar de detención en los casos en que deba ser atendido fuera del establecimiento, salvo supuestos de urgencia que deberán ser informados al tribunal.',
    plainLanguageExplanation:
      'El adolescente tiene derecho a atención médica y psicológica especializada dentro del instituto. Si necesita atención fuera, solo puede salir con autorización judicial — salvo urgencia médica, que debe informarse al tribunal.',
    practicalEffects: [
      'La atención médica y psicológica debe ser de profesionales especializados en adolescentes',
      'Solo el juez puede autorizar salidas del instituto para atención externa',
      'Las urgencias no requieren autorización previa pero deben informarse al tribunal',
    ],
    examples: [
      'Un adolescente detenido necesita una cirugía → el instituto solicita autorización judicial para el traslado; si hay riesgo de vida, puede trasladarse de urgencia e informar al tribunal luego',
    ],
    relatedArticles: ['art-27801-27', 'art-27801-35'],
    jurisprudence: [],
    regulations: [],
    keywords: ['atención médica', 'salud mental', 'salidas', 'autorización judicial', 'urgencia'],
    order: 31,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-32',
    lawId: 'ley-27801',
    number: '32',
    title: 'Actividades formativas y de capacitación laboral',
    originalText:
      'El adolescente privado de libertad tendrá derecho a recibir formación y capacitación laboral a fin de lograr una futura inserción social y laboral. Se deberá brindar, en lo posible, una amplia oferta de cursos y talleres que le permitan elegir entre aquellos de acuerdo con sus intereses y capacidades.',
    currentText:
      'El adolescente privado de libertad tendrá derecho a recibir formación y capacitación laboral a fin de lograr una futura inserción social y laboral. Se deberá brindar, en lo posible, una amplia oferta de cursos y talleres que le permitan elegir entre aquellos de acuerdo con sus intereses y capacidades.',
    plainLanguageExplanation:
      'Los adolescentes detenidos tienen derecho a formación laboral dentro del instituto. Debe ofrecerse una variedad de cursos y talleres para que el adolescente pueda elegir según sus intereses.',
    practicalEffects: [
      'Derecho a capacitación laboral — no es opcional para el instituto',
      'Debe haber oferta variada de cursos y talleres',
      'El adolescente puede elegir según sus propios intereses',
    ],
    examples: [],
    relatedArticles: ['art-27801-18', 'art-27801-29'],
    jurisprudence: [],
    regulations: [],
    keywords: ['formación laboral', 'capacitación', 'talleres', 'cursos', 'inserción laboral'],
    order: 32,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-33',
    lawId: 'ley-27801',
    number: '33',
    title: 'Actividades deportivas, culturales, religiosas y recreativas',
    originalText:
      'Se deberá promover en la medida de lo posible el desarrollo de actividades deportivas, culturales, religiosas, en su caso, y de acuerdo a la preferencia del adolescente, y recreativas, orientadas a una efectiva inclusión social.\n\nLos adolescentes tendrán derecho al acceso a libros, diarios y revistas, con las limitaciones pertinentes, música y a las diversas fuentes de información existentes.',
    currentText:
      'Se deberá promover en la medida de lo posible el desarrollo de actividades deportivas, culturales, religiosas, en su caso, y de acuerdo a la preferencia del adolescente, y recreativas, orientadas a una efectiva inclusión social.\n\nLos adolescentes tendrán derecho al acceso a libros, diarios y revistas, con las limitaciones pertinentes, música y a las diversas fuentes de información existentes.',
    plainLanguageExplanation:
      'El instituto debe promover actividades deportivas, culturales y recreativas. Los adolescentes tienen derecho a acceder a libros, diarios, revistas y música, con las restricciones que correspondan por seguridad.',
    practicalEffects: [
      'Derecho a actividades deportivas, culturales y recreativas según preferencia del adolescente',
      'Derecho a libros, diarios, revistas y música — con limitaciones pertinentes',
    ],
    examples: [],
    relatedArticles: ['art-27801-29', 'art-27801-32'],
    jurisprudence: [],
    regulations: [],
    keywords: ['deporte', 'cultura', 'recreación', 'libros', 'música', 'inclusión social'],
    order: 33,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-34',
    lawId: 'ley-27801',
    number: '34',
    title: 'Informe trimestral',
    originalText:
      'El director del instituto especializado deberá enviar a la autoridad judicial competente un informe trimestral sobre la situación del adolescente, su evolución, prácticas y el desarrollo del tratamiento individual.',
    currentText:
      'El director del instituto especializado deberá enviar a la autoridad judicial competente un informe trimestral sobre la situación del adolescente, su evolución, prácticas y el desarrollo del tratamiento individual.',
    plainLanguageExplanation:
      'El director del instituto debe informar al juez cada tres meses sobre cómo está el adolescente: su situación, evolución, participación en actividades y el tratamiento que recibe.',
    practicalEffects: [
      'El control judicial del instituto es trimestral y obligatorio',
      'El informe cubre situación, evolución, prácticas y tratamiento individual',
    ],
    examples: [],
    relatedArticles: ['art-27801-27', 'art-27801-38'],
    jurisprudence: [],
    regulations: [],
    keywords: ['informe trimestral', 'director', 'control judicial', 'tratamiento individual', 'evolución'],
    order: 34,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-35',
    lawId: 'ley-27801',
    number: '35',
    title: 'Regla general sobre medidas de salud',
    originalText:
      'En el supuesto de que el juez o fiscal consideren que el adolescente presenta un uso problemático de drogas o alcohol, se deberá recabar la opinión del equipo interdisciplinario, que mantendrá las entrevistas necesarias para que el adolescente realice el tratamiento que sea adecuado en el ámbito que corresponda.',
    currentText:
      'En el supuesto de que el juez o fiscal consideren que el adolescente presenta un uso problemático de drogas o alcohol, se deberá recabar la opinión del equipo interdisciplinario, que mantendrá las entrevistas necesarias para que el adolescente realice el tratamiento que sea adecuado en el ámbito que corresponda.',
    plainLanguageExplanation:
      'Si el juez o el fiscal detectan que el adolescente tiene consumo problemático de drogas o alcohol, deben intervenir profesionales del equipo interdisciplinario para ordenar el tratamiento adecuado.',
    practicalEffects: [
      'El juez o el fiscal pueden identificar el consumo problemático',
      'La intervención del equipo interdisciplinario es obligatoria en esos casos',
      'El tratamiento se realiza en el ámbito que corresponda según el caso',
    ],
    examples: [
      'Un adolescente detenido que muestra signos de adicción → el juez solicita evaluación del equipo interdisciplinario, que diseña un tratamiento de rehabilitación',
    ],
    relatedArticles: ['art-27801-25', 'art-27801-36'],
    jurisprudence: [],
    regulations: [],
    keywords: ['uso problemático', 'drogas', 'alcohol', 'tratamiento', 'equipo interdisciplinario'],
    order: 35,
    segments: [],
    amendments: [],
  },
  {
    id: 'art-27801-36',
    lawId: 'ley-27801',
    number: '36',
    title: 'Comunicación al juez civil',
    originalText:
      'Si se dispusiera la internación del adolescente, el juez penal deberá remitir copia del legajo personal, de los antecedentes y de la información necesaria del adolescente al juez civil correspondiente a los fines pertinentes.',
    currentText:
      'Si se dispusiera la internación del adolescente, el juez penal deberá remitir copia del legajo personal, de los antecedentes y de la información necesaria del adolescente al juez civil correspondiente a los fines pertinentes.',
    plainLanguageExplanation:
      'Cuando el adolescente es internado, el juez penal debe enviar al juez civil toda la información del caso (legajo, antecedentes) para que la justicia civil pueda intervenir en lo que le corresponda.',
    practicalEffects: [
      'La internación activa una obligación del juez penal de comunicarse con la justicia civil',
      'El juez civil puede intervenir en cuestiones de protección de derechos del adolescente',
    ],
    examples: [],
    relatedArticles: ['art-27801-35'],
    jurisprudence: [],
    regulations: [],
    keywords: ['internación', 'juez civil', 'legajo personal', 'comunicación', 'coordinación'],
    order: 36,
    segments: [],
    amendments: [],
  },
];
