import type { Article, LawSection } from '../../../common/types/law.types';

export const SECTION_04: LawSection = {
	id: 'ley-27742-s04',
	lawId: 'ley-27742',
	number: 'IV',
	name: 'Incentivos tributarios y aduaneros',
	articleStart: 183,
	articleEnd: 197,
	titles: [],
};

export const ARTICLES_04: Article[] = [
	{
		id: 'rigi-art-183',
		lawId: 'ley-27742',
		number: '183',
		title: 'Impuesto a las Ganancias — régimen especial',
		originalText:
			'Con relación al impuesto a las ganancias, los VPU adheridos al RIGI estarán sujetos al siguiente régimen:\na) La alícuota será del veinticinco por ciento (25%), no resultando de aplicación la escala general del artículo 73;\nb) Amortización acelerada: mínimo 2 cuotas anuales para bienes muebles amortizables; y vida útil reducida al 60% para minas, bosques y obras de infraestructura;\nc) Quebrantos sin límite temporal y transferibles a terceros tras 5 años;\nd) Actualización por IPC en lugar de los ajustes generales.',
		currentText:
			'Con relación al impuesto a las ganancias, los VPU adheridos al RIGI estarán sujetos al siguiente régimen:\na) Alícuota del 25% (vs. 35% general);\nb) Amortización acelerada: 2 cuotas anuales mínimo para bienes muebles; vida útil al 60% para minas y obras de infraestructura;\nc) Quebrantos sin límite temporal, transferibles a terceros tras 5 años sin absorber;\nd) Actualización por IPC.',
		plainLanguageExplanation:
			'Los proyectos RIGI pagan ganancias al 25% en vez del 35% que paga el resto de las empresas. Además, pueden amortizar (descontar del impuesto) sus inversiones más rápido —la mitad del tiempo que en el régimen general—. Y si tienen pérdidas, pueden acumularlas sin límite de tiempo.',
		practicalEffects: [
			'Ahorro del 10% de alícuota sobre ganancias en comparación con el régimen general (25% vs 35%)',
			'La amortización acelerada reduce el impuesto a pagar en los primeros años del proyecto, mejorando el flujo de caja',
			'La transferencia de quebrantos permite a los inversores optimizar la estructura fiscal del grupo',
		],
		examples: [
			'Si un proyecto RIGI gana $100M, paga $25M de ganancias (vs. $35M en el régimen general): ahorro de $10M por año',
		],
		relatedArticles: ['rigi-art-184', 'rigi-art-185', 'rigi-art-196', 'rigi-art-201'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024'],
		keywords: ['ganancias RIGI', 'alícuota 25%', 'amortización acelerada', 'quebrantos', 'incentivo tributario'],
		order: 183,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-184',
		lawId: 'ley-27742',
		number: '184',
		title: 'Dividendos y utilidades — alícuota del 7%',
		originalText:
			'La ganancia neta derivada de los dividendos y utilidades proveniente de los VPU adheridos al RIGI tributará a la alícuota del siete por ciento (7%).\n\nCuando los dividendos se paguen a beneficiarios del exterior, quien los pague efectuará la pertinente retención e ingresará a la AFIP dicho porcentaje con carácter de pago único y definitivo.',
		currentText:
			'Los dividendos y utilidades de VPU adheridos al RIGI tributan al 7% (tanto para residentes como para beneficiarios del exterior, mediante retención en la fuente).',
		plainLanguageExplanation:
			'Cuando una empresa RIGI reparte ganancias (dividendos), quien las cobra paga sólo el 7% de impuesto —sin importar si es un accionista local o del exterior—. El régimen general aplica el 15%. El impuesto se paga en la fuente (lo retiene la empresa que distribuye).',
		practicalEffects: [
			'El inversor extranjero que recibe dividendos de su proyecto RIGI paga 7% vs 15% en el régimen general',
			'Este beneficio aplica desde el primer año de adhesión',
			'Después de 7 años la alícuota baja al 3,5% (art. 185)',
		],
		examples: [
			'Una empresa canadiense que es accionista del 60% en un proyecto RIGI que distribuye USD 100M de dividendos retiene 7% (USD 7M) vs el 15% del régimen general (USD 15M): ahorro de USD 8M en ese solo reparto',
		],
		relatedArticles: ['rigi-art-183', 'rigi-art-185'],
		jurisprudence: [],
		regulations: [],
		keywords: ['dividendos RIGI', '7%', 'beneficiarios del exterior', 'retención'],
		order: 184,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-185',
		lawId: 'ley-27742',
		number: '185',
		title: 'Reducción de alícuota de dividendos a los 7 años',
		originalText:
			'Una vez transcurrido un plazo de siete (7) años contados desde la fecha de adhesión al RIGI, los dividendos y utilidades referidos en el artículo precedente quedarán alcanzados por una alícuota del tres coma cinco por ciento (3,5%).\n\nLos pagos que los VPU titulares de proyectos de Exportación Estratégica de Largo Plazo efectúen a beneficiarios del exterior por locaciones o chárter marítimos, servicios de transporte internacional y servicios de ingeniería, adquisición y gestión de construcción, se encontrarán exentos del Impuesto a las Ganancias.',
		currentText:
			'A partir del año 7 de adhesión, los dividendos tributan al 3,5% (vs 7% de los primeros 7 años). Los proyectos de Exportación Estratégica tienen exención adicional de ganancias sobre pagos al exterior por fletes marítimos, transporte de exportaciones y servicios de ingeniería/construcción.',
		plainLanguageExplanation:
			'Los dividendos bajan aún más después de 7 años: del 7% al 3,5%. Y los mega-proyectos de Exportación Estratégica (inversiones superiores a USD 1.000M por etapa) tienen exención total de ganancias sobre los pagos al exterior por transporte y construcción. Es un beneficio progresivo: cuanto más grande el proyecto y más tiempo adherido, más ventajas.',
		practicalEffects: [
			'El régimen es especialmente atractivo a largo plazo: proyectos de 20-30 años ven reducida su carga fiscal progresivamente',
			'Los megaproyectos de GNL o minería que contraten constructoras extranjeras no pagan retención sobre esos contratos',
		],
		examples: [
			'En el año 8 de operación de un proyecto de GNL se distribuyen USD 200M en dividendos: la alícuota es del 3,5% (USD 7M) en lugar del 7% de los primeros años (USD 14M) o el 15% del régimen general (USD 30M)',
		],
		relatedArticles: ['rigi-art-184', 'rigi-art-201'],
		jurisprudence: [],
		regulations: [],
		keywords: ['dividendos 3.5%', 'exportación estratégica', 'exención ganancias', 'beneficiarios exterior'],
		order: 185,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-186',
		lawId: 'ley-27742',
		number: '186',
		title: 'Precios de transferencia',
		originalText:
			'Las transacciones u operaciones que los VPU realicen con sus titulares, miembros o con entidades locales vinculadas a ellos se encontrarán sujetas a las disposiciones del artículo 17 de la Ley de Impuesto a las Ganancias sobre precios de transferencia, con excepción de lo previsto en su octavo párrafo.',
		currentText:
			'Las operaciones de los VPU con sus partes vinculadas quedan sujetas a las reglas de precios de transferencia del art. 17 LIG (parámetros de mercado entre partes independientes), con algunas excepciones.',
		plainLanguageExplanation:
			'Cuando una empresa RIGI le vende o compra servicios a su empresa madre o a empresas del mismo grupo, debe hacerlo a precios de mercado —no puede inflar costos o reducir ingresos artificialmente para reducir el impuesto. Las reglas de precios de transferencia (art. 17 LIG) siguen aplicando.',
		practicalEffects: [
			'Un inversor extranjero no puede cargar al VPU costos de royalties o management fees inflados para reducir la base imponible',
			'Los acuerdos intragrupo deben estar documentados con estudios de comparabilidad',
		],
		examples: [
			'Una multinacional canadiense no puede cobrarle royalties inflados (por encima del precio de mercado) a su subsidiaria VPU para reducir la base imponible argentina. Las regalías deben respaldarse con estudios de comparabilidad que demuestren que son precios de mercado entre partes independientes',
		],
		relatedArticles: ['rigi-art-183'],
		jurisprudence: [],
		regulations: [],
		keywords: ['precios de transferencia', 'partes vinculadas', 'ganancias RIGI', 'operaciones intragrupo'],
		order: 186,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-187',
		lawId: 'ley-27742',
		number: '187',
		title: 'IVA — Certificados de Crédito Fiscal',
		originalText:
			'Con relación al Impuesto al Valor Agregado (IVA), los VPU adheridos al RIGI estarán sujetos al siguiente régimen:\na) Cuando a los VPU se les hubiera facturado IVA por compra, construcción, fabricación, elaboración o importación definitiva de bienes de uso o inversiones de infraestructura, podrán pagar el IVA a sus proveedores a través de la entrega de Certificados de Crédito Fiscal;\nb) Los Certificados de Crédito Fiscal son transferibles: si la AFIP no devuelve el saldo en 3 meses, el proveedor puede transferirlos a terceros sin aprobación previa;\nc) En ningún caso los VPU podrán computar los créditos fiscales reales abonados con Certificados de Crédito Fiscal.',
		currentText:
			'Los VPU pueden pagar el IVA de sus compras de bienes de capital e infraestructura con Certificados de Crédito Fiscal emitidos por ellos mismos. Los proveedores pueden transferir esos certificados si la AFIP no devuelve el saldo en 3 meses.',
		plainLanguageExplanation:
			'En vez de pagar IVA en efectivo a sus proveedores, el VPU puede entregarles un "Certificado de Crédito Fiscal" —un documento que el proveedor puede usar para pagar sus propios impuestos o transferir a terceros. Esto alivia el flujo de caja del proyecto durante la etapa de construcción, cuando no hay ingresos pero sí grandes compras.',
		practicalEffects: [
			'Reduce la necesidad de capital de trabajo durante la fase de construcción',
			'Los proveedores del proyecto RIGI reciben certificados que son básicamente créditos tributarios',
			'La AFIP tiene 3 meses para devolver el saldo; si no lo hace, el proveedor puede transferirlos libremente',
		],
		examples: [
			'Una empresa proveedora de hormigón para un proyecto RIGI recibe un certificado de crédito fiscal en vez de IVA en efectivo; puede usarlo para pagar sus propias obligaciones con AFIP',
		],
		relatedArticles: ['rigi-art-183', 'rigi-art-189'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024'],
		keywords: ['IVA RIGI', 'certificado de crédito fiscal', 'bienes de capital', 'flujo de caja', 'proveedores'],
		order: 187,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-188',
		lawId: 'ley-27742',
		number: '188',
		title: 'Tratamiento tributario de UTEs y contratos asociativos',
		originalText:
			'Los VPU adheridos al RIGI conformados por uniones transitorias u otros contratos asociativos tendrán el tratamiento tributario previsto en este capítulo conforme a las siguientes disposiciones:\na) Ganancias: serán sujetos del gravamen en forma separada a sus miembros; las distribuciones de utilidades seguirán el régimen del art. 68 LIG;\nb) Tributos provinciales y municipales: no podrán alcanzarse con ningún tributo local las operaciones entre el VPU y sus miembros.',
		currentText:
			'Las UTEs y contratos asociativos adheridos al RIGI tributan como sujetos independientes en ganancias. Los tributos provinciales y municipales no pueden alcanzar las operaciones entre la UTE y sus miembros.',
		plainLanguageExplanation:
			'Cuando el VPU es una UTE (unión transitoria de empresas) o joint venture, la UTE paga ganancias como si fuera una empresa separada de sus miembros. Las provincias y municipios no pueden cobrar impuestos sobre las operaciones internas entre la UTE y sus socios.',
		practicalEffects: [
			'Facilita la formación de joint ventures internacionales para proyectos RIGI',
			'Blinda las operaciones intragrupo de impuestos locales',
		],
		examples: [],
		relatedArticles: ['rigi-art-183', 'rigi-art-169'],
		jurisprudence: [],
		regulations: [],
		keywords: ['UTE RIGI', 'joint venture', 'contrato asociativo', 'ganancias', 'tributos locales'],
		order: 188,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-189',
		lawId: 'ley-27742',
		number: '189',
		title: 'Crédito del impuesto a los débitos y créditos bancarios',
		originalText:
			'Los VPU adheridos al RIGI podrán computar el cien por ciento (100%) de los importes abonados y/o percibidos en concepto del impuesto sobre los débitos y créditos en cuentas bancarias, establecido por la ley 25.413 y su reglamentación, como crédito del impuesto a las ganancias.',
		currentText:
			'Los VPU pueden computar el 100% del impuesto a los débitos y créditos bancarios (impuesto al cheque) como crédito de ganancias.',
		plainLanguageExplanation:
			'El "impuesto al cheque" (0,6% sobre todos los movimientos bancarios) que pagan los proyectos RIGI se descuenta íntegramente del impuesto a las ganancias. En el régimen general sólo se permite deducir el 33% o el 17%. Este beneficio elimina el efecto del impuesto al cheque para los VPU.',
		practicalEffects: [
			'En la práctica, los proyectos RIGI no pagan impuesto al cheque en términos netos',
			'El ahorro anual puede ser significativo en proyectos con grandes movimientos bancarios',
		],
		examples: [
			'Un VPU con $50M de movimientos bancarios mensuales paga $300.000 de impuesto al cheque. En el régimen general sólo puede descontar el 33% de ganancias ($99.000); bajo el RIGI descuenta el 100% ($300.000), eliminando el costo neto del impuesto',
		],
		relatedArticles: ['rigi-art-183'],
		jurisprudence: [],
		regulations: [],
		keywords: ['impuesto al cheque', 'débitos y créditos', 'crédito ganancias', 'RIGI'],
		order: 189,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-190',
		lawId: 'ley-27742',
		number: '190',
		title: 'Exención de derechos de importación',
		originalText:
			'Las importaciones de bienes de capital nuevos, repuestos, partes, componentes y mercaderías de consumo, así como las importaciones temporarias efectuadas por los VPU adheridos al RIGI, se encontrarán exentas de derechos de importación, de la tasa de estadística y comprobación de destino, y de todo régimen de percepción, recaudación, anticipo o retención de tributos nacionales y/o locales.\n\nLa propiedad, posesión, tenencia o uso de la mercadería beneficiada no puede ser objeto de transferencia, salvo que dicha transferencia se efectúe a otro VPU adherido al RIGI.',
		currentText:
			'Las importaciones de bienes de capital, repuestos, insumos y mercaderías de los VPU adheridos al RIGI están exentas de derechos de importación, tasa de estadística y toda percepción/retención nacional o local. Los bienes importados con esta franquicia no pueden transferirse a terceros no-RIGI.',
		plainLanguageExplanation:
			'Los proyectos RIGI pueden importar sin pagar aranceles. Turbinas, equipamiento minero, materiales de construcción, repuestos y consumibles entran al país sin pagar derechos de importación (que en el régimen general pueden ser del 0% al 35% según el producto). Es uno de los mayores beneficios en términos de flujo de caja durante la construcción.',
		practicalEffects: [
			'Ahorro potencial de decenas de millones de dólares en aranceles durante la fase de construcción',
			'Los bienes importados con franquicia RIGI sólo pueden usarse en ese proyecto, no revenderse libremente',
			'También quedan exentos de SIMI, SIMPES y otros controles previos de importación',
		],
		examples: [
			'Una perforadora importada para un proyecto de GNL que normalmente pagaría 14% de arancel entra libre de aranceles si el proyecto está adherido al RIGI',
		],
		relatedArticles: ['rigi-art-174', 'rigi-art-193'],
		jurisprudence: [],
		regulations: ['Decreto 749/2024'],
		keywords: ['exención importación', 'arancel', 'bienes de capital', 'libre importación', 'RIGI'],
		order: 190,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-191',
		lawId: 'ley-27742',
		number: '191',
		title: 'Exención de derechos de exportación (retenciones)',
		originalText:
			'Las exportaciones para consumo de los bienes obtenidos al amparo del proyecto promovido, realizadas por los VPU adheridos al RIGI se encontrarán exentas de derechos de exportación, luego de transcurridos tres (3) años contados desde la fecha de adhesión al RIGI.\n\nLas exportaciones de los VPU titulares de proyectos de Exportación Estratégica de Largo Plazo estarán exentas de derechos de exportación a partir de los dos (2) años contados desde la fecha de adhesión al RIGI.',
		currentText:
			'Las exportaciones de los VPU RIGI están exentas de retenciones (derechos de exportación) desde el año 3 de adhesión. Para proyectos de Exportación Estratégica de Largo Plazo, la exención comienza desde el año 2.',
		plainLanguageExplanation:
			'Las retenciones a las exportaciones son uno de los instrumentos más debatidos de la política económica argentina. El RIGI exime a los proyectos adheridos de pagarlas a partir del tercer año (o segundo año para mega-proyectos). En sectores como minería o petróleo, donde las retenciones pueden ser del 12%-33%, este beneficio representa cientos de millones de dólares al año.',
		practicalEffects: [
			'Es uno de los beneficios más cuestionados: el Estado renuncia a ingresos por retenciones por 30 años',
			'Los primeros 2-3 años sí se pagan retenciones (si las hay vigentes); recién luego aplica la exención',
			'Para proyectos mineros con retenciones del 12%, el ahorro puede ser de millones de dólares por exportación',
		],
		examples: [
			'Un proyecto de litio que exporta USD 500M/año y paga 12% de retenciones ahorraría USD 60M/año gracias a esta exención',
		],
		relatedArticles: ['rigi-art-190', 'rigi-art-193', 'rigi-art-198', 'rigi-art-201'],
		jurisprudence: [],
		regulations: [],
		keywords: ['retenciones', 'derechos de exportación', 'exención exportación', 'RIGI'],
		order: 191,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-192',
		lawId: 'ley-27742',
		number: '192',
		title: 'Intereses y diferencias de cambio — tratamiento contable e impositivo',
		originalText:
			'A los efectos de la aplicación del artículo 94 inciso 5) y artículo 206 de la Ley General de Sociedades, podrán deducirse de las ganancias y/o adicionarse a las pérdidas de la sociedad los intereses y las diferencias de cambio originados por la financiación del proyecto promovido por este régimen.\n\nEn lo que hace a su tratamiento impositivo, para los beneficiarios del presente régimen, se estará a lo dispuesto en las disposiciones de la Ley del Impuesto a las Ganancias, excepto por las limitaciones del cuarto párrafo del inciso a) de su artículo 85, las cuales no serán aplicables durante los primeros cinco (5) años desde la fecha de adhesión al RIGI.',
		currentText:
			'Los intereses y diferencias de cambio del financiamiento del proyecto RIGI son totalmente deducibles como pérdidas, sin las limitaciones generales de capitalización (art. 85 LIG) durante los primeros 5 años de adhesión.',
		plainLanguageExplanation:
			'Los proyectos RIGI se financian con deuda (préstamos en dólares). Los intereses de esa deuda y las pérdidas por diferencias de tipo de cambio son completamente deducibles del impuesto a las ganancias, sin los límites que aplican en el régimen general. Durante los primeros 5 años no hay tope de deducción de intereses.',
		practicalEffects: [
			'Los proyectos altamente endeudados (usual en infraestructura) pueden deducir todos sus intereses',
			'Mejora la rentabilidad neta de proyectos financiados con deuda en dólares',
		],
		examples: [
			'Un proyecto que tomó un préstamo de USD 500M al 7% tiene USD 35M de intereses anuales. En los primeros 5 años puede deducirlos íntegramente de ganancias, sin el límite del 30% del EBITDA que aplica en el régimen general',
		],
		relatedArticles: ['rigi-art-183', 'rigi-art-185'],
		jurisprudence: [],
		regulations: [],
		keywords: ['intereses', 'diferencias de cambio', 'deducción ganancias', 'financiamiento RIGI'],
		order: 192,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-193',
		lawId: 'ley-27742',
		number: '193',
		title: 'Libertad de importación y exportación',
		originalText:
			'Los VPU adheridos al RIGI podrán importar y exportar libremente bienes para la construcción, operación y desarrollo de dicho Proyecto Adherido, sin que puedan aplicárseles prohibiciones ni restricciones directas, restricciones cuantitativas, cupos o cuotas, de ningún tipo, ni cualitativas, de carácter económico. Tampoco podrán aplicárseles precios oficiales ni ninguna otra medida oficial que altere el valor de las mercaderías importadas o exportadas, ni prioridades de abastecimiento al mercado interno, aun cuando las mismas estén previstas en la legislación vigente a la fecha de adhesión.',
		currentText:
			'Los VPU RIGI pueden importar y exportar libremente, sin restricciones cuantitativas ni cualitativas, sin precios oficiales ni cupos. Tampoco pueden aplicárseles prioridades de abastecimiento al mercado interno, aun cuando estén previstas en la ley vigente.',
		plainLanguageExplanation:
			'Más allá de la exención arancelaria (art. 190), los proyectos RIGI quedan libres de cualquier restricción de comercio exterior: no hay cupos, no hay precios oficiales, no hay obligación de vender al mercado interno antes de exportar. Incluso si el gobierno establece en el futuro un cupo de exportación de petróleo o gas, los VPU RIGI quedan exentos.',
		practicalEffects: [
			'Elimina el riesgo de que un gobierno futuro obligue a vender gas o minerales al mercado interno en vez de exportarlos',
			'Los proyectos de exportación pueden diseñarse con plena confianza en la disponibilidad para exportar',
			'Este es uno de los puntos más debatidos: los críticos dicen que condiciona la soberanía energética',
		],
		examples: [
			'Si el gobierno establece en 2026 un cupo obligatorio de vender el 20% del gas al mercado interno a precio regulado, un VPU adherido al RIGI puede rechazar esa obligación invocando el art. 193: su estabilidad regulatoria lo exime de cualquier prioridad de abastecimiento interno',
		],
		relatedArticles: ['rigi-art-190', 'rigi-art-191', 'rigi-art-200'],
		jurisprudence: [],
		regulations: [],
		keywords: ['libre importación', 'libre exportación', 'cupos', 'restricciones', 'mercado interno'],
		order: 193,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-194',
		lawId: 'ley-27742',
		number: '194',
		title: 'Contabilidad en dólares bajo NIIF',
		originalText:
			'Los VPU adheridos al RIGI podrán optar por llevar sus registros contables y estados financieros preparados en dólares estadounidenses utilizando las Normas Internacionales de Información Financiera.',
		currentText:
			'Los VPU adheridos al RIGI pueden optar por llevar su contabilidad en dólares estadounidenses bajo NIIF (Normas Internacionales de Información Financiera).',
		plainLanguageExplanation:
			'Las empresas argentinas deben llevar contabilidad en pesos. Los proyectos RIGI pueden optar por hacerlo en dólares bajo normas internacionales (NIIF). Esto es crucial para proyectos financiados y auditados por inversores extranjeros, que necesitan estados financieros en el mismo formato que usan internacionalmente.',
		practicalEffects: [
			'Elimina el problema de la distorsión inflacionaria en los estados financieros en pesos',
			'Facilita la comparación con proyectos similares en otros países',
			'Permite acceder a financiamiento internacional bajo condiciones más favorables',
		],
		examples: [
			'Una empresa canadiense que invierte en litio lleva sus estados financieros en dólares bajo NIIF —el mismo formato que usa para sus reportes a inversores y bancos internacionales—, sin necesidad de conversiones a pesos que distorsionarían los resultados por inflación',
		],
		relatedArticles: ['rigi-art-183'],
		jurisprudence: [],
		regulations: [],
		keywords: ['contabilidad en dólares', 'NIIF', 'estados financieros', 'VPU', 'RIGI'],
		order: 194,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-195',
		lawId: 'ley-27742',
		number: '195',
		title: 'Tratamiento tributario de Sucursales Dedicadas',
		originalText:
			'Las Sucursales Dedicadas tendrán el tratamiento tributario previsto en el presente capítulo, conforme a las siguientes disposiciones:\na) Impuesto a las Ganancias: serán sujetos en forma separada a la sociedad a la cual pertenecen; las distribuciones de utilidades seguirán el art. 68 LIG; la asignación patrimonial para constituirlas es no imponible;\nb) IVA: sujetos separados; la asignación de patrimonio no es "venta"; los saldos de impuesto se transfieren en proporción;\nc) Demás tributos: no pueden alcanzarse con ningún impuesto nacional, provincial o municipal las operaciones entre la sociedad y la Sucursal Dedicada.',
		currentText:
			'Las Sucursales Dedicadas tributan en forma separada de la empresa madre (en ganancias e IVA). La asignación de activos para crear la Sucursal Dedicada no genera IVA ni ganancias. Las operaciones entre la Sucursal y la empresa madre están exentas de todos los tributos.',
		plainLanguageExplanation:
			'Cuando una empresa grande crea una Sucursal Dedicada para adherir al RIGI (art. 170), esa sucursal funciona como una empresa independiente a efectos fiscales. La transferencia de activos para crearla no genera impuestos, y las operaciones internas entre la empresa y su sucursal tampoco.',
		practicalEffects: [
			'Crear la Sucursal Dedicada no genera costo fiscal (ni ganancias ni IVA)',
			'La sucursal paga ganancias al 25% del RIGI; el resto de la empresa sigue al 35% general',
			'Las operaciones entre la empresa y su sucursal no pagan IVA, ingresos brutos ni otros tributos',
		],
		examples: [],
		relatedArticles: ['rigi-art-170', 'rigi-art-183'],
		jurisprudence: [],
		regulations: [],
		keywords: ['sucursal dedicada', 'tratamiento tributario', 'ganancias', 'IVA', 'separación fiscal'],
		order: 195,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-196',
		lawId: 'ley-27742',
		number: '196',
		title: 'Impuesto mínimo global (Pilar 2 OCDE)',
		originalText:
			'Los incentivos tributarios otorgados a través del presente régimen no producirán efectos en la medida en que pudieran resultar en una transferencia de ingresos a fiscos extranjeros por aplicación de un impuesto mínimo global –sea a través de una regla de inclusión de ganancias, una regla de pagos sujetos a baja tributación o cualquier otra medida análoga– que implemente o esté dirigido a implementar, total o parcialmente, el segundo pilar del Marco Inclusivo de la OCDE y el G-20 sobre erosión de las bases imponibles y el traslado de beneficios.',
		currentText:
			'Los beneficios tributarios del RIGI no aplican si producen una transferencia de ingresos a fiscos extranjeros por efecto del impuesto mínimo global del Pilar 2 de la OCDE (tasa mínima global del 15%).',
		plainLanguageExplanation:
			'El Pilar 2 de la OCDE establece que las grandes multinacionales deben pagar al menos un 15% de impuesto en cada país. Si Argentina le cobra 25% con el RIGI, la multinacional no tiene problema. Pero si un beneficio del RIGI baja el impuesto efectivo por debajo del 15%, ese beneficio podría hacer que el país de origen de la multinacional cobre la diferencia. Para evitar eso, este artículo dice que los beneficios no aplicarán cuando generen esa situación.',
		practicalEffects: [
			'Protege al Estado argentino de perder recaudación RIGI en favor de fiscos extranjeros (el beneficio sería para el país de origen de la empresa, no para el inversor)',
			'En la práctica, algunas estructuras de empresas multinacionales pueden ver reducidos ciertos beneficios RIGI',
		],
		examples: [
			'Si los beneficios del RIGI reducen el impuesto efectivo del VPU al 8% y el país de origen de la empresa aplica el Pilar 2 de la OCDE (tasa mínima global del 15%), ese país cobraría al inversor la diferencia hasta el 15%. En ese caso el art. 196 limita los beneficios RIGI para evitar que la ventaja fiscal vaya al fisco extranjero en lugar de beneficiar realmente al inversor',
		],
		relatedArticles: ['rigi-art-183'],
		jurisprudence: [],
		regulations: [],
		keywords: ['Pilar 2 OCDE', 'impuesto mínimo global', 'erosión base imponible', 'BEPS', 'RIGI'],
		order: 196,
		segments: [],
		amendments: [],
	},
	{
		id: 'rigi-art-197',
		lawId: 'ley-27742',
		number: '197',
		title: 'Reorganizaciones empresariales para constituir VPU',
		originalText:
			'Las reorganizaciones de empresas que se lleven a cabo con el objeto de establecer un VPU o realizar las inversiones en activos computables podrán efectuarse de conformidad con lo previsto en el artículo 80 de la Ley de Impuesto a las Ganancias, con las siguientes modificaciones:\na) No será requisito que la entidad continuadora prosiga con la actividad de la empresa reestructurada;\nb) No se requerirá aprobación previa de la AFIP cuando no se produzca la transferencia total;\nc) Los efectos impositivos del art. 80 LIG no requieren los trámites de publicidad e inscripción de la LGS;\nd) No resultan aplicables los requisitos del decreto reglamentario de LIG relativos a la reorganización.',
		currentText:
			'Las reorganizaciones de empresas para crear un VPU pueden hacerse sin cumplir todos los requisitos formales habituales del art. 80 LIG: no hace falta continuidad de la actividad, ni aprobación previa AFIP, ni inscripciones registrales. Los efectos impositivos son plenos con formalidades reducidas.',
		plainLanguageExplanation:
			'Para crear el VPU que va a adherir al RIGI, una empresa puede reestructurarse (fusiones, escisiones, reorganizaciones) sin pagar impuestos por ese cambio y sin cumplir los trámites formales habituales. Facilita la organización societaria necesaria para que un grupo económico cree el vehículo específico para el proyecto.',
		practicalEffects: [
			'Una empresa puede escindir una unidad de negocios para crear el VPU sin costo fiscal',
			'El proceso es más ágil que una reorganización ordinaria bajo la LIG',
		],
		examples: [
			'Una empresa que tiene una división de energía renovable puede escindir esa división para crear el VPU RIGI sin pagar impuestos sobre la transferencia de activos, sin publicación de edictos y sin aprobación previa de AFIP: el proceso es más ágil y sin costo fiscal',
		],
		relatedArticles: ['rigi-art-169', 'rigi-art-170'],
		jurisprudence: [],
		regulations: [],
		keywords: ['reorganización empresarial', 'VPU', 'escisión', 'fusión', 'artículo 80 LIG'],
		order: 197,
		segments: [],
		amendments: [],
	},
];
