# Revisión del redactor legal — 13 de noviembre de 2026

## Resultado y alcance

Los síntomas informados tienen causas concretas en el código. El flujo actual no ofrece una búsqueda contextual de artículos coherente: reutiliza el buscador general con interpretaciones distintas de las que necesita un editor. No es correcto afirmar que todo el software carece de reutilización: existen `LawAutocomplete`, el registro de normas, utilidades de referencias, rutas compartidas y servicios de búsqueda. El problema está en sus contratos, las ramas especiales y la cobertura de integración.

Se inspeccionaron el editor, detector, registro, proxies de búsqueda/artículos, buscador PostgreSQL, limitador, caché de normas y pruebas existentes. Esta entrega NO modifica el comportamiento del redactor: se respeta el pedido de analizarlo primero. No se consultó producción ni se ejecutaron escrituras sobre el corpus. Docker Desktop no está disponible en esta sesión; no hay medición de carga ni reproducción visual de la versión desplegada. Los siguientes hallazgos se desprenden del código local; el orden exacto y la capitalización almacenada deben comprobarse con datos de ejecución.

## Recorrido actual

1. `frontend/app/herramientas/redactor/RedactorClient.tsx`, `onUpdate`: cuenta palabras recorriendo el documento y examina hasta 80 caracteres anteriores al cursor con `detectTrigger`.
2. `trigger.ts`: reconoce vocabulario, artículo seguido de norma, siglas y números existentes en el registro; también `@`. Es un detector por reglas, no comprensión general del escrito.
3. `components/LawAutocomplete.tsx`: espera 300 ms y pide `/api/search?type=law&limit=10`. Reordena una coincidencia exacta del registro, pero no aplica una política nacional/provincias.
4. Al seleccionar norma pide `/api/articles?lawId=...&limit=10`. Al escribir en el campo de artículos cambia a `/api/search?type=article&lawId=...&limit=10`.
5. Las rutas de Next llaman al backend. `SearchService.search` ejecuta búsqueda y facetas en paralelo; el redactor descarta las facetas. `SearchDbService` combina FTS, números, referencias, similitud y fallback.

## Fallos y causas

| Hallazgo | Causa verificable | Consecuencia |
| --- | --- | --- |
| Constitución Nacional sin prioridad | El ranking usa relevancia FTS/similitud de nombre, longitud y boosts; no tiene regla de jerarquía ni desempate por provincia | El orden puede parecer arbitrario y favorecer un nombre más parecido a la consulta |
| Porteña con minúscula | El proxy y el componente muestran `common_name/title` sin una etiqueta editorial común | El código no corrige esa presentación; falta verificar el valor exacto del corpus antes de atribuirlo a datos o formato |
| `7` no encuentra artículo 7 | `isNumberOnlyQuery` omite FTS; `extractNumberDigits` exige al menos tres dígitos; no existe resolución exacta `(lawId, articleNumber)` en este recorrido | Para uno o dos dígitos no se ejecuta la búsqueda contextual necesaria |
| Números de tres o cuatro dígitos pueden salir de la norma elegida | La rama de número suelto busca únicamente códigos, con `LIMIT 4`, sin aplicar `filterClauses(opts)` ni `lawId` | Una consulta contextual puede devolver artículos de otra norma. Es un fallo de corrección prioritario |
| `Art. 7` parece funcionar de otra manera | Activa la búsqueda textual. `extractArticleRef` exige además nombre de norma en la consulta y no utiliza el `lawId` para completar esa intención | No es un acceso exacto garantizado al artículo 7, aunque pueda devolverlo por coincidencia de texto |
| Se pierde “pegar texto” | El listado contiene `text`; el buscador entrega metadatos/snippet, y el proxy de búsqueda no entrega `text`. El componente condiciona el botón a `art.text` | Cambiar el filtro cambia las acciones disponibles; tampoco queda disponible “Sustituir” |
| Advertencias de vigencia inconsistentes | El backend devuelve `status` y `jurisdiction` pero el proxy de búsqueda de normas los omite | La UI contempla avisos que no puede mostrar desde esa respuesta; una coincidencia inyectada por registro sí puede tener estado |
| Orden de artículos deficiente | El componente reordena los diez resultados ya recortados por exacto/prefijo/contiene del texto crudo; sin desempate por orden editorial. `Art. 7` tampoco se normaliza a `7` para ese ranking | Reordenar diez elementos no puede recuperar el artículo correcto si no llegó entre los candidatos |
| Fallos presentados como ausencia | Los proxies transforman respuestas no OK/excepciones en arrays vacíos con HTTP 200; el componente tiene `catch` vacíos | Un 429, 503 o error de red parece “norma no cargada”; incluso puede generar tracking falso de norma faltante |
| Carreras de solicitudes | El efecto de artículos aborta al volver a ejecutar, pero no devuelve cleanup al desmontarse. El de normas no termina al seleccionar una norma; ambos comparten `loading` | Trabajo que puede continuar tras cerrar y respuestas que alteran indicadores fuera de su fase. Abortar navegador tampoco garantiza cancelar SQL ya iniciado |

Las consultas especiales de referencias directas también omiten filtros generales en su SQL. Debe auditarse toda rama, no corregir únicamente el caso `7` en el frontend.

## Detección y pruebas

El detector tiene límites deliberados: ventana de 80 caracteres, vocabulario finito, siglas/números dependientes de un registro ya inicializado y patrones que no representan todas las citas múltiples, incisos o referencias complejas. No debe prometer detectar todo. `RE_ARTICULO` acepta variantes plurales pero captura un único número: el comentario que menciona “arts. 1 y 2” no equivale a soporte semántico completo.

Hay pruebas de funciones del detector en `frontend/scripts/test-funciones.ts` y de utilidades del buscador en `backend/src/search`. Esto demuestra reutilización y cierta cobertura, pero no verifica el recorrido editor → proxy → ranking → artículo con texto → inserción. Son justamente las fronteras donde ocurren estos errores. El informe no atribuye el problema a una persona ni concluye una calidad global del producto a partir de una herramienta.

## Infraestructura y eficiencia

Aspectos favorables: debounce de 300 ms, límites de diez resultados, cancelación de consultas anteriores, FTS en PostgreSQL, registro local para siglas y caché LRU de cuerpos normativos. No hay una llamada a un modelo de IA por tecla en el recorrido inspeccionado.

Costos y riesgos presentes:

- `/api/search` usa `cache: no-store`: cada pausa suficiente vuelve a Next, backend y PostgreSQL. El debounce reduce ráfagas, pero no fija un límite de consultas por minuto.
- Cada petición ejecuta búsqueda más facetas. Las facetas leen coincidencias y agregan en JavaScript datos que el desplegable nunca utiliza. La búsqueda puede ejecutar varias ramas SQL secuenciales además de ese trabajo paralelo.
- Como ejemplo de planificación, una persona que cambia la consulta y pausa algo más de 300 ms puede producir cerca de tres peticiones por segundo. Veinte personas con ese patrón sumarían unas sesenta peticiones por segundo; NO es una medición real ni representa usuarios que escriben sin pausas. El trabajo SQL depende de las ramas y del caché efectivo.
- El controlador limita búsqueda a 40 peticiones/minuto por identificador. El proxy de búsqueda no utiliza `clientIpHeaders`, aunque existe esa utilidad y el guard del backend espera la firma. En despliegues con BFF varios visitantes pueden compartir la IP de salida y consumir el mismo cupo. Hay que medirlo con la topología real; no asumir que el límite ya es individual.
- El límite del listado reduce la respuesta HTTP, pero `ArticlesService.findByLaw` llama a `getFullNorm`, ordena todos sus artículos y recién entonces recorta. Una norma fuera de caché se carga completa desde la base y se procesan sus referencias. `findOne` también hidrata la norma completa. Añadir diez llamadas a ese detalle para recuperar textos sería una mala solución.
- El listado de artículos usa caché Next de una hora; esa ruta no tiene etiquetas explícitas. La revalidación inspeccionada invalida páginas, no declara expresamente el recurso del listado. Debe probarse actualización de un artículo y su sugerencia; el comentario que promete revalidación no demuestra por sí solo ese comportamiento.
- `onUpdate` recorre el texto completo para contar palabras en cada cambio y serializa el documento al guardar. En escritos extensos esto afecta CPU del navegador aunque no cargue el backend.

No hay evidencia suficiente para afirmar que la infraestructura va a colapsar, ni para certificar capacidad o costos. Faltan p50/p95, consultas por petición, planes SQL, tamaño de respuestas, aciertos de caché, tasa de 429/503 y escenarios de concurrencia sobre una copia local representativa. No se debe hacer una prueba de carga contra producción para resolverlo.

## Comportamiento propuesto

1. Al escribir “constitución”, lista específica: Constitución Nacional primero; luego constituciones provinciales y CABA por nombre de jurisdicción, con desempate estable por id. Una consulta explícita “constitución de Chaco” debe favorecer Chaco. Usar nombres consistentes (“Constitución de la Ciudad Autónoma de Buenos Aires”), sin modificar automáticamente el título oficial almacenado.
2. Al elegir la norma, fijar su id como restricción obligatoria en TODOS los recorridos. Mostrar artículos en orden normativo editorial. No saltar a otra norma por ausencia de resultados.
3. Interpretar `7`, `Art. 7` y `artículo 7` como la misma consulta de número dentro de esa norma. Normalizar `14 bis` y sufijos conservando su identidad. Coincidencia exacta primero; después variantes/prefijos ordenados naturalmente. Si no existe el 7, decirlo sin sustituirlo silenciosamente por el 70.
4. Para palabras, buscar título/texto dentro de la norma: relevancia, luego orden editorial y id como desempate. Diferenciar búsqueda textual de búsqueda por número.
5. Mantener acciones “citar”, “pegar texto oficial” y, cuando corresponda, “sustituir” en listado y resultados filtrados. Obtener el texto oficial completo por id al hacer clic; no pegar snippets ni explicaciones. Mostrar carga/error de esa acción y no insertar contenido incompleto.
6. Presentar estado y derogación con el mismo contrato en todas las fases. Distinguir sin coincidencias, cargando, corpus no disponible, límite temporal y fallo de conexión.
7. Mantener teclado/foco, selección, cierre y retorno entre fases; limpiar timers y abortar al cambiar de norma/cerrar/desmontar. Solo la solicitud vigente puede actualizar su estado.

## Diseño propuesto y orden de implementación

Prioridad 1: endpoint/contexto de sugerencias de normas y endpoint de artículos de una norma, con DTO común tipado que conserve `id`, `lawId`, `number`, `title`, `status`, `jurisdiction`, `order`, URL y disponibilidad de texto. Reutilizar servicios y normalización compartidos; separar la política del redactor del ranking del buscador general. No copiar otro buscador entero ni corregirlo solo con un `sort` visual.

Prioridad 2: acceso SQL acotado por norma/número, paginación y proyecciones livianas; texto completo bajo demanda por artículo sin hidratar toda la norma. Revisar índices existentes y planes con EXPLAIN antes de agregar índices. Omitir facetas y `ts_headline` cuando la UI no los necesita. Mantener controles de visibilidad y vigencia en toda rama.

Prioridad 3: estado de UI explícito por fase, cancelación/descartes de respuestas antiguas, propagación de errores y firma de IP; caché acotada y deduplicación de solicitudes por consulta normalizada + norma + versión del corpus. No almacenar cada combinación indefinidamente ni descargar el corpus completo al navegador. Medir texto y explicaciones enviados: el comentario del listado dice “se recortan”, pero `text` se devuelve íntegro.

Prioridad 4: recorrido de navegador con datos de prueba deterministas: Constitución Nacional/Chaco/CABA; `7`, `Art. 7`, `14 bis`, número inexistente y búsqueda por palabras; ninguna respuesta fuera de `lawId`; botones disponibles al filtrar; texto íntegro insertado; avisos de derogación; errores 429/503; teclado, móvil, cambio rápido y cierre. Luego medir carga en copia aislada con distintas concurrencias y escritos largos.

Criterio de cierre: mismos resultados y acciones para consultas equivalentes, selección siempre dentro de la norma elegida, errores visibles y costo de cada petición conocido. La capacidad aceptable y el presupuesto de latencia deben fijarse con esas mediciones, no inferirse del debounce.

## Verificación de esta entrega

Backend compilado correctamente; frontend sin errores de TypeScript y con 192 pruebas de funciones aprobadas. Cinco pruebas del nuevo sistema de entrega aprobadas, incluida comparación de commits en un repositorio temporal, y versiones de ambos proyectos coherentes en 1.4.3. Prebuild del frontend validado omitiendo generación de sitemap local. Configuración Compose validada con `config --quiet`; el motor Docker no está disponible para construir/arrancar contenedores. No se ejecutó el build completo de Next ni una suite contra producción. Estos resultados verifican los cambios de versionado y la compatibilidad estática tras retirar helpers; no prueban que los bugs del redactor estén resueltos.
