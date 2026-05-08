import { Article } from '../../../common/types/law.types';

const seg = (
  num: string,
  text: string,
  plain: string,
  example: string | null = null,
): Article['segments'][0] => ({
  id: `carta-onu-art-${num}-s1`,
  lawId: 'carta-onu',
  articleId: `carta-onu-art-${num}`,
  articleNumber: num,
  segmentType: 'PARAGRAPH',
  originalText: text,
  plainExplanation: plain,
  practicalExample: example,
  references: [],
  order: 1,
});

export const CARTA_ONU_S10: Article[] = [
  {
    id: 'carta-onu-art-91',
    lawId: 'carta-onu',
    number: '91',
    title: 'Cooperación del Consejo de Administración Fiduciaria con otros órganos',
    originalText:
      'El Consejo de Administración Fiduciaria, cuando lo estime conveniente, se valdrá de la ayuda del Consejo Económico y Social y de la de los organismos especializados con respecto a los asuntos de la respectiva competencia de los mismos.',
    currentText:
      'El Consejo de Administración Fiduciaria, cuando lo estime conveniente, se valdrá de la ayuda del Consejo Económico y Social y de la de los organismos especializados con respecto a los asuntos de la respectiva competencia de los mismos.',
    plainLanguageExplanation:
      'El Consejo de Administración Fiduciaria puede pedir asistencia al ECOSOC y a organismos especializados (como la OMS o la UNESCO) en materias de su competencia.',
    practicalEffects: [
      'Permite integrar la experiencia técnica de los organismos especializados en la supervisión de territorios.',
      'Evita la duplicación creando canales de cooperación horizontal entre órganos de la ONU.',
    ],
    examples: [
      'El Consejo consultó a la UNESCO sobre los sistemas educativos de territorios en fideicomiso como Tanganyika.',
    ],
    relatedArticles: ['carta-onu-art-57', 'carta-onu-art-63', 'carta-onu-art-87'],
    jurisprudence: [],
    regulations: [],
    keywords: ['cooperación', 'ECOSOC', 'organismos especializados', 'Consejo de Administración Fiduciaria'],
    order: 91,
    segments: [
      seg(
        '91',
        'El Consejo de Administración Fiduciaria, cuando lo estime conveniente, se valdrá de la ayuda del Consejo Económico y Social y de la de los organismos especializados con respecto a los asuntos de la respectiva competencia de los mismos.',
        'El Consejo de Administración Fiduciaria puede pedir apoyo técnico al ECOSOC y a organismos como la OMS o la UNESCO.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-92',
    lawId: 'carta-onu',
    number: '92',
    title: 'La Corte Internacional de Justicia como órgano judicial principal',
    originalText:
      'La Corte Internacional de Justicia será el órgano judicial principal de las Naciones Unidas; funcionará de conformidad con el Estatuto anexo, que está basado en el de la Corte Permanente de Justicia Internacional, y que forma parte integrante de esta Carta.',
    currentText:
      'La Corte Internacional de Justicia será el órgano judicial principal de las Naciones Unidas; funcionará de conformidad con el Estatuto anexo, que está basado en el de la Corte Permanente de Justicia Internacional, y que forma parte integrante de esta Carta.',
    plainLanguageExplanation:
      'La Corte Internacional de Justicia (CIJ), con sede en La Haya, es el principal tribunal de la ONU. Su Estatuto —parte integrante de la Carta— la rige y derivó del tribunal anterior a la ONU.',
    practicalEffects: [
      'La CIJ resuelve disputas entre Estados y emite opiniones consultivas.',
      'Su Estatuto tiene igual rango jurídico que la propia Carta de la ONU.',
    ],
    examples: [
      'Argentina llevó ante la CIJ la disputa por el Canal de Beagle (aunque finalmente se resolvió por arbitraje papal en 1984).',
    ],
    relatedArticles: ['carta-onu-art-93', 'carta-onu-art-94', 'carta-onu-art-36'],
    jurisprudence: [],
    regulations: [],
    keywords: ['Corte Internacional de Justicia', 'órgano judicial', 'Estatuto', 'La Haya'],
    order: 92,
    segments: [
      seg(
        '92',
        'La Corte Internacional de Justicia será el órgano judicial principal de las Naciones Unidas; funcionará de conformidad con el Estatuto anexo, que está basado en el de la Corte Permanente de Justicia Internacional, y que forma parte integrante de esta Carta.',
        'La CIJ es el tribunal máximo de la ONU; su Estatuto forma parte de la Carta y la rige.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-93',
    lawId: 'carta-onu',
    number: '93',
    title: 'Acceso al Estatuto de la Corte Internacional de Justicia',
    originalText:
      'Todos los Miembros de las Naciones Unidas son ipso facto partes en el Estatuto de la Corte Internacional de Justicia.\nUn Estado que no sea Miembro de las Naciones Unidas podrá llegar a ser parte en el Estatuto de la Corte Internacional de Justicia, de acuerdo con las condiciones que determine en cada caso la Asamblea General a recomendación del Consejo de Seguridad.',
    currentText:
      'Todos los Miembros de las Naciones Unidas son ipso facto partes en el Estatuto de la Corte Internacional de Justicia.\nUn Estado que no sea Miembro de las Naciones Unidas podrá llegar a ser parte en el Estatuto de la Corte Internacional de Justicia, de acuerdo con las condiciones que determine en cada caso la Asamblea General a recomendación del Consejo de Seguridad.',
    plainLanguageExplanation:
      'Ser miembro de la ONU equivale automáticamente a aceptar el Estatuto de la CIJ. Los Estados no miembros también pueden adherirse, pero necesitan aprobación especial.',
    practicalEffects: [
      'Los 193 miembros de la ONU están automáticamente sujetos al Estatuto de la CIJ.',
      'Suiza fue parte del Estatuto antes de ingresar a la ONU (en 2002).',
    ],
    examples: ['Suiza accedió al Estatuto de la CIJ en 1948, décadas antes de ser miembro de la ONU en 2002.'],
    relatedArticles: ['carta-onu-art-92', 'carta-onu-art-94'],
    jurisprudence: [],
    regulations: [],
    keywords: ['Estatuto CIJ', 'ipso facto', 'partes', 'acceso no miembros'],
    order: 93,
    segments: [
      seg(
        '93',
        'Todos los Miembros de las Naciones Unidas son ipso facto partes en el Estatuto de la Corte Internacional de Justicia.\nUn Estado que no sea Miembro de las Naciones Unidas podrá llegar a ser parte en el Estatuto de la Corte Internacional de Justicia, de acuerdo con las condiciones que determine en cada caso la Asamblea General a recomendación del Consejo de Seguridad.',
        'Todo miembro de la ONU es automáticamente parte del Estatuto de la CIJ; los no miembros pueden adherirse con aprobación especial.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-94',
    lawId: 'carta-onu',
    number: '94',
    title: 'Cumplimiento de las sentencias de la Corte Internacional de Justicia',
    originalText:
      'Cada Miembro de las Naciones Unidas compromete a cumplir la decisión de la Corte Internacional de Justicia en todo litigio en que sea parte.\nSi una de las partes en un litigio dejare de cumplir las obligaciones que le imponga un fallo de la Corte, la otra parte podrá recurrir al Consejo de Seguridad, el cual podrá, si lo cree necesario, hacer recomendaciones o dictar medidas con el objeto de que se lleve a efecto la ejecución del fallo.',
    currentText:
      'Cada Miembro de las Naciones Unidas compromete a cumplir la decisión de la Corte Internacional de Justicia en todo litigio en que sea parte.\nSi una de las partes en un litigio dejare de cumplir las obligaciones que le imponga un fallo de la Corte, la otra parte podrá recurrir al Consejo de Seguridad, el cual podrá, si lo cree necesario, hacer recomendaciones o dictar medidas con el objeto de que se lleve a efecto la ejecución del fallo.',
    plainLanguageExplanation:
      'Los miembros de la ONU se obligan a cumplir los fallos de la CIJ. Si un Estado incumple, el otro puede acudir al Consejo de Seguridad, que puede tomar medidas para ejecutar el fallo.',
    practicalEffects: [
      'El Consejo de Seguridad es el mecanismo de ejecución forzada de sentencias de la CIJ.',
      'En la práctica, el veto puede bloquear la ejecución si el incumplidor es un miembro permanente.',
    ],
    examples: [
      'Nicaragua demandó a EE.UU. en 1986; la CIJ falló a favor de Nicaragua pero EE.UU. no cumplió y bloqueó la acción del Consejo de Seguridad con su veto.',
    ],
    relatedArticles: ['carta-onu-art-92', 'carta-onu-art-93', 'carta-onu-art-25'],
    jurisprudence: [],
    regulations: [],
    keywords: ['cumplimiento de fallos', 'CIJ', 'Consejo de Seguridad', 'ejecución de sentencias'],
    order: 94,
    segments: [
      seg(
        '94',
        'Cada Miembro de las Naciones Unidas compromete a cumplir la decisión de la Corte Internacional de Justicia en todo litigio en que sea parte.\nSi una de las partes en un litigio dejare de cumplir las obligaciones que le imponga un fallo de la Corte, la otra parte podrá recurrir al Consejo de Seguridad, el cual podrá, si lo cree necesario, hacer recomendaciones o dictar medidas con el objeto de que se lleve a efecto la ejecución del fallo.',
        'Los miembros deben cumplir los fallos de la CIJ; si no lo hacen, la otra parte puede ir al Consejo de Seguridad para forzar el cumplimiento.',
        'Nicaragua demandó a EE.UU. en 1986; la CIJ falló a su favor pero EE.UU. incumplió y vetó la acción del Consejo de Seguridad.',
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-95',
    lawId: 'carta-onu',
    number: '95',
    title: 'Libertad de recurrir a otros tribunales',
    originalText:
      'Ninguna de las disposiciones de esta Carta impedirá a los Miembros de las Naciones Unidas encomendar la solución de sus diferencias a otros tribunales en virtud de acuerdos ya existentes o que puedan concertarse en el futuro.',
    currentText:
      'Ninguna de las disposiciones de esta Carta impedirá a los Miembros de las Naciones Unidas encomendar la solución de sus diferencias a otros tribunales en virtud de acuerdos ya existentes o que puedan concertarse en el futuro.',
    plainLanguageExplanation:
      'Los Estados pueden elegir resolver sus disputas ante otros tribunales (arbitraje, cortes regionales, paneles de la OMC) sin que la Carta lo prohíba.',
    practicalEffects: [
      'Habilita el arbitraje internacional, los tribunales regionales y los paneles especializados.',
      'La CIJ no tiene jurisdicción exclusiva: los Estados pueden pactar otros foros.',
    ],
    examples: [
      'Argentina y Chile resolvieron la disputa del Canal de Beagle mediante arbitraje papal en 1984, usando esta cláusula de libertad.',
    ],
    relatedArticles: ['carta-onu-art-33', 'carta-onu-art-92', 'carta-onu-art-94'],
    jurisprudence: [],
    regulations: [],
    keywords: ['otros tribunales', 'arbitraje', 'solución de diferencias', 'libre elección de foro'],
    order: 95,
    segments: [
      seg(
        '95',
        'Ninguna de las disposiciones de esta Carta impedirá a los Miembros de las Naciones Unidas encomendar la solución de sus diferencias a otros tribunales en virtud de acuerdos ya existentes o que puedan concertarse en el futuro.',
        'Los Estados pueden resolver disputas ante otros tribunales o árbitros, no solo ante la CIJ.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-96',
    lawId: 'carta-onu',
    number: '96',
    title: 'Opiniones consultivas de la Corte Internacional de Justicia',
    originalText:
      'La Asamblea General o el Consejo de Seguridad podrán solicitar de la Corte Internacional de Justicia que emita una opinión consultiva sobre cualquier cuestión jurídica.\nLos otros órganos de las Naciones Unidas y los organismos especializados que en cualquier momento sean autorizados para ello por la Asamblea General, podrán igualmente solicitar de la Corte opiniones consultivas sobre cuestiones jurídicas que surjan dentro de la esfera de sus actividades.',
    currentText:
      'La Asamblea General o el Consejo de Seguridad podrán solicitar de la Corte Internacional de Justicia que emita una opinión consultiva sobre cualquier cuestión jurídica.\nLos otros órganos de las Naciones Unidas y los organismos especializados que en cualquier momento sean autorizados para ello por la Asamblea General, podrán igualmente solicitar de la Corte opiniones consultivas sobre cuestiones jurídicas que surjan dentro de la esfera de sus actividades.',
    plainLanguageExplanation:
      'La Asamblea General y el Consejo de Seguridad pueden pedir a la CIJ que emita una opinión no vinculante sobre temas jurídicos. Otros órganos y organismos especializados también pueden hacerlo si la Asamblea General los autoriza.',
    practicalEffects: [
      'Las opiniones consultivas no son vinculantes pero tienen gran peso en el derecho internacional.',
      'La OMS, la OIT y otros organismos pueden solicitar opiniones en sus áreas de competencia.',
    ],
    examples: [
      'La Asamblea General solicitó en 1996 a la CIJ una opinión sobre la legalidad del uso de armas nucleares; la CIJ emitió una opinión de alto impacto global.',
    ],
    relatedArticles: ['carta-onu-art-92', 'carta-onu-art-93'],
    jurisprudence: [],
    regulations: [],
    keywords: ['opinión consultiva', 'CIJ', 'Asamblea General', 'Consejo de Seguridad'],
    order: 96,
    segments: [
      seg(
        '96',
        'La Asamblea General o el Consejo de Seguridad podrán solicitar de la Corte Internacional de Justicia que emita una opinión consultiva sobre cualquier cuestión jurídica.\nLos otros órganos de las Naciones Unidas y los organismos especializados que en cualquier momento sean autorizados para ello por la Asamblea General, podrán igualmente solicitar de la Corte opiniones consultivas sobre cuestiones jurídicas que surjan dentro de la esfera de sus actividades.',
        'La Asamblea, el Consejo de Seguridad y órganos autorizados pueden pedir a la CIJ que emita opiniones jurídicas no vinculantes.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-97',
    lawId: 'carta-onu',
    number: '97',
    title: 'El Secretario General: nombramiento y funciones',
    originalText:
      'La Secretaría se compondrá de un Secretario General y del personal que requiera la Organización. El Secretario General será nombrado por la Asamblea General a recomendación del Consejo de Seguridad. El Secretario General será el más alto funcionario administrativo de la Organización.',
    currentText:
      'La Secretaría se compondrá de un Secretario General y del personal que requiera la Organización. El Secretario General será nombrado por la Asamblea General a recomendación del Consejo de Seguridad. El Secretario General será el más alto funcionario administrativo de la Organización.',
    plainLanguageExplanation:
      'La Secretaría tiene un Secretario General (el mayor funcionario de la ONU) nombrado por la Asamblea General pero propuesto por el Consejo de Seguridad, lo que en la práctica da derecho de veto a los cinco permanentes sobre su elección.',
    practicalEffects: [
      'El veto del Consejo de Seguridad influye decisivamente en quién puede ser Secretario General.',
      'El Secretario General dirige el aparato burocrático de la ONU y representa a la Organización.',
    ],
    examples: [
      'António Guterres fue recomendado por el Consejo de Seguridad y nombrado por la Asamblea General en 2016; comenzó su segundo mandato en 2022.',
    ],
    relatedArticles: ['carta-onu-art-98', 'carta-onu-art-99', 'carta-onu-art-100'],
    jurisprudence: [],
    regulations: [],
    keywords: ['Secretario General', 'nombramiento', 'Secretaría', 'funcionario administrativo'],
    order: 97,
    segments: [
      seg(
        '97',
        'La Secretaría se compondrá de un Secretario General y del personal que requiera la Organización. El Secretario General será nombrado por la Asamblea General a recomendación del Consejo de Seguridad. El Secretario General será el más alto funcionario administrativo de la Organización.',
        'El Secretario General es el jefe administrativo de la ONU; lo elige la Asamblea General pero lo propone el Consejo de Seguridad.',
        'António Guterres fue recomendado por el Consejo de Seguridad y confirmado por la Asamblea General en 2016 para el cargo.',
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-98',
    lawId: 'carta-onu',
    number: '98',
    title: 'Funciones del Secretario General',
    originalText:
      'El Secretario General actuará como tal en todas las sesiones de la Asamblea General, del Consejo de Seguridad, del Consejo Económico y Social y del Consejo de Administración Fiduciaria, y desempeñará las demás funciones que le encomienden dichos órganos. El Secretario General rendirá a la Asamblea General un informe anual sobre las actividades de la Organización.',
    currentText:
      'El Secretario General actuará como tal en todas las sesiones de la Asamblea General, del Consejo de Seguridad, del Consejo Económico y Social y del Consejo de Administración Fiduciaria, y desempeñará las demás funciones que le encomienden dichos órganos. El Secretario General rendirá a la Asamblea General un informe anual sobre las actividades de la Organización.',
    plainLanguageExplanation:
      'El Secretario General asiste a todas las sesiones de los principales órganos de la ONU como su secretario, ejecuta las decisiones que le encomiendan y presenta un informe anual a la Asamblea General.',
    practicalEffects: [
      'El informe anual es el documento de rendición de cuentas central de la ONU.',
      'El Secretario General puede recibir mandatos específicos de cualquiera de los cuatro órganos principales.',
    ],
    examples: [
      'Cada septiembre el Secretario General presenta su informe anual ante la Asamblea General durante la apertura del período de sesiones.',
    ],
    relatedArticles: ['carta-onu-art-97', 'carta-onu-art-99'],
    jurisprudence: [],
    regulations: [],
    keywords: ['Secretario General', 'informe anual', 'sesiones', 'funciones administrativas'],
    order: 98,
    segments: [
      seg(
        '98',
        'El Secretario General actuará como tal en todas las sesiones de la Asamblea General, del Consejo de Seguridad, del Consejo Económico y Social y del Consejo de Administración Fiduciaria, y desempeñará las demás funciones que le encomienden dichos órganos. El Secretario General rendirá a la Asamblea General un informe anual sobre las actividades de la Organización.',
        'El Secretario General participa en todas las sesiones de los órganos principales, ejecuta sus mandatos y presenta un informe anual a la Asamblea General.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-99',
    lawId: 'carta-onu',
    number: '99',
    title: 'Facultad del Secretario General de alertar al Consejo de Seguridad',
    originalText:
      'El Secretario General podrá llamar la atención del Consejo de Seguridad hacia cualquier asunto que en su opinión pueda poner en peligro el mantenimiento de la paz y la seguridad internacionales.',
    currentText:
      'El Secretario General podrá llamar la atención del Consejo de Seguridad hacia cualquier asunto que en su opinión pueda poner en peligro el mantenimiento de la paz y la seguridad internacionales.',
    plainLanguageExplanation:
      'El Secretario General tiene la potestad única de activar al Consejo de Seguridad por iniciativa propia si considera que algo amenaza la paz mundial, sin esperar una queja formal de un Estado.',
    practicalEffects: [
      'Es uno de los poderes políticos más significativos del Secretario General.',
      'Permite una respuesta proactiva ante crisis antes de que un Estado la denuncie formalmente.',
    ],
    examples: [
      'Dag Hammarskjöld invocó el artículo 99 durante la crisis del Congo en 1960, convocando al Consejo de Seguridad por iniciativa propia.',
    ],
    relatedArticles: ['carta-onu-art-97', 'carta-onu-art-98', 'carta-onu-art-24'],
    jurisprudence: [],
    regulations: [],
    keywords: ['Secretario General', 'alerta', 'Consejo de Seguridad', 'paz y seguridad', 'iniciativa propia'],
    order: 99,
    segments: [
      seg(
        '99',
        'El Secretario General podrá llamar la atención del Consejo de Seguridad hacia cualquier asunto que en su opinión pueda poner en peligro el mantenimiento de la paz y la seguridad internacionales.',
        'El Secretario General puede activar al Consejo de Seguridad por iniciativa propia si detecta una amenaza a la paz, sin que ningún Estado lo solicite.',
        'Dag Hammarskjöld usó este artículo en 1960 para convocar al Consejo durante la crisis del Congo.',
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-100',
    lawId: 'carta-onu',
    number: '100',
    title: 'Independencia del Secretario General y del personal de la Secretaría',
    originalText:
      'En el cumplimiento de sus deberes, el Secretario General y el personal de la Secretaría no solicitarán ni recibirán instrucciones de ningún gobierno ni de ninguna autoridad ajena a la Organización, y se abstendrán de actuar en forma alguna que sea incompatible con su condición de funcionarios internacionales responsables únicamente ante la Organización.\nCada uno de los Miembros de las Naciones Unidas se compromete a respetar el carácter exclusivamente internacional de las funciones del Secretario General y del personal de la Secretaría, y a no tratar de influir sobre ellos en el desempeño de sus funciones.',
    currentText:
      'En el cumplimiento de sus deberes, el Secretario General y el personal de la Secretaría no solicitarán ni recibirán instrucciones de ningún gobierno ni de ninguna autoridad ajena a la Organización, y se abstendrán de actuar en forma alguna que sea incompatible con su condición de funcionarios internacionales responsables únicamente ante la Organización.\nCada uno de los Miembros de las Naciones Unidas se compromete a respetar el carácter exclusivamente internacional de las funciones del Secretario General y del personal de la Secretaría, y a no tratar de influir sobre ellos en el desempeño de sus funciones.',
    plainLanguageExplanation:
      'El Secretario General y todo el personal de la Secretaría son funcionarios internacionales: no reciben instrucciones de ningún gobierno y los miembros de la ONU se comprometen a no presionarlos.',
    practicalEffects: [
      'Crea una obligación jurídica de independencia para los funcionarios de la ONU.',
      'Los miembros no pueden legalmente presionar al personal para que actúe en su interés nacional.',
    ],
    examples: [
      'Este artículo fue la base para que varios Secretarios Generales rechazaran presiones de las grandes potencias para modificar informes o posiciones de la ONU.',
    ],
    relatedArticles: ['carta-onu-art-97', 'carta-onu-art-101'],
    jurisprudence: [],
    regulations: [],
    keywords: ['independencia', 'Secretaría', 'funcionarios internacionales', 'imparcialidad'],
    order: 100,
    segments: [
      seg(
        '100',
        'En el cumplimiento de sus deberes, el Secretario General y el personal de la Secretaría no solicitarán ni recibirán instrucciones de ningún gobierno ni de ninguna autoridad ajena a la Organización, y se abstendrán de actuar en forma alguna que sea incompatible con su condición de funcionarios internacionales responsables únicamente ante la Organización.\nCada uno de los Miembros de las Naciones Unidas se compromete a respetar el carácter exclusivamente internacional de las funciones del Secretario General y del personal de la Secretaría, y a no tratar de influir sobre ellos en el desempeño de sus funciones.',
        'El personal de la ONU no puede recibir instrucciones de gobiernos; los miembros se obligan a no presionarlos.',
        null,
      ),
    ],
    amendments: [],
  },
  {
    id: 'carta-onu-art-101',
    lawId: 'carta-onu',
    number: '101',
    title: 'Nombramiento del personal de la Secretaría',
    originalText:
      'El personal de la Secretaría será nombrado por el Secretario General de acuerdo con las reglas establecidas por la Asamblea General.\nSe asignará permanentemente personal adecuado al Consejo Económico y Social, al Consejo de Administración Fiduciaria y, según se requiera, a otros órganos de las Naciones Unidas. Este personal formará parte de la Secretaría.\nLa consideración primordial que se tendrá en cuenta al nombrar el personal de la Secretaría y al determinar las condiciones del servicio, es la necesidad de asegurar el más alto grado de eficiencia, competencia e integridad. Se dará debida consideración también a la importancia de contratar el personal en forma de que haya la más amplia representación geográfica posible.',
    currentText:
      'El personal de la Secretaría será nombrado por el Secretario General de acuerdo con las reglas establecidas por la Asamblea General.\nSe asignará permanentemente personal adecuado al Consejo Económico y Social, al Consejo de Administración Fiduciaria y, según se requiera, a otros órganos de las Naciones Unidas. Este personal formará parte de la Secretaría.\nLa consideración primordial que se tendrá en cuenta al nombrar el personal de la Secretaría y al determinar las condiciones del servicio, es la necesidad de asegurar el más alto grado de eficiencia, competencia e integridad. Se dará debida consideración también a la importancia de contratar el personal en forma de que haya la más amplia representación geográfica posible.',
    plainLanguageExplanation:
      'El Secretario General nombra al personal según las reglas de la Asamblea General. Los criterios son eficiencia, competencia e integridad, con representación geográfica amplia como consideración secundaria.',
    practicalEffects: [
      'La Asamblea General fija las normas de personal; el Secretario General las aplica.',
      'La "representación geográfica" equilibra la presencia de distintos países en la burocracia de la ONU.',
    ],
    examples: [
      'La ONU aplica una fórmula de "rango deseable" por país basada en contribución financiera y población para distribuir puestos entre distintas nacionalidades.',
    ],
    relatedArticles: ['carta-onu-art-97', 'carta-onu-art-100'],
    jurisprudence: [],
    regulations: [],
    keywords: ['personal', 'Secretaría', 'nombramiento', 'representación geográfica', 'eficiencia'],
    order: 101,
    segments: [
      seg(
        '101',
        'El personal de la Secretaría será nombrado por el Secretario General de acuerdo con las reglas establecidas por la Asamblea General.\nSe asignará permanentemente personal adecuado al Consejo Económico y Social, al Consejo de Administración Fiduciaria y, según se requiera, a otros órganos de las Naciones Unidas. Este personal formará parte de la Secretaría.\nLa consideración primordial que se tendrá en cuenta al nombrar el personal de la Secretaría y al determinar las condiciones del servicio, es la necesidad de asegurar el más alto grado de eficiencia, competencia e integridad. Se dará debida consideración también a la importancia de contratar el personal en forma de que haya la más amplia representación geográfica posible.',
        'El Secretario General nombra al personal buscando eficiencia e integridad, con representación geográfica amplia como segundo criterio.',
        null,
      ),
    ],
    amendments: [],
  },
];
