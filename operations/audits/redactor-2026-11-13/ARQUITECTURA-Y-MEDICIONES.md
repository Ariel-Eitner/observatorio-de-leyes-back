# Redactor: arquitectura y mediciones previas a la corrección

Fecha: 2026-11-13. Código de referencia: backend `056eaf2`, frontend `d8baf96`, versión 1.4.3. Esta auditoría no modifica el código de ejecución del redactor.

## Qué se midió y qué falta medir

Se ejecutó el flujo real de `SearchService` y `SearchDbService` con un adaptador Prisma simulado que registra las consultas y devuelve resultados controlados. Esto comprueba decisiones y filtros del programa; NO mide tiempos de PostgreSQL ni representa la distribución real de búsquedas.

Además se reconstruyó el DTO actual del listado a partir de respuestas normativas públicas ya guardadas en el caché local de Next. Se comparó su serialización y compresión con dos proyecciones propuestas. No se accedió a documentos privados, no se consultó producción y no se introdujo tráfico de carga. Las muestras del caché pueden corresponder a un corpus anterior al vigente.

Quedan pendientes planes SQL con datos representativos, latencias p50/p95 del recorrido HTTP, tasas de caché/errores, concurrencia y perfiles del navegador con escritos largos. Un intento de iniciar la base local para extender estas mediciones fue rechazado por la revisión automática de herramientas, con el mensaje “bloqueado por política”. No se insistió ni se ejecutó SQL sobre esa base.

## Evidencia del recorrido de búsqueda

La prueba registra las ramas que se ejecutan si no hay coincidencias. Los conteos pueden cambiar cuando sí hay resultados, porque algunos fallbacks son condicionales.

| Entrada y contexto | Consultas emitidas | Consultas de facetas | Resultado de la inspección |
| --- | ---: | ---: | --- |
| `constitucion`, normas | 3 | 1 | Ranking general y trabajo de estadísticas que no usa el selector |
| `7`, Constitución Nacional | 1 | 1 | No se emite ninguna búsqueda de artículo |
| `Art. 7`, Constitución Nacional | 2 | 1 | Cambia de interpretación: busca texto, sin acceso exacto garantizado |
| `245`, Constitución Nacional | 2 | 1 | La consulta de artículos no contiene la norma solicitada |
| `14 bis`, Constitución Nacional | 3 | 1 | Búsqueda textual y fallback, en vez de resolución directa normalizada |
| `igualdad`, Constitución Nacional | 2 | 1 | Búsqueda textual más facetas |
| `art 7 constitucion`, Constitución Nacional | 3 | 1 | La rama de referencia directa tampoco conserva el filtro contextual |

Una segunda prueba inyecta un artículo sintético de otro código únicamente en la rama numérica sin filtro. El servicio devuelve ese artículo aun cuando se pidió `lawId=constitucion-nacional`. Así se reproduce la pérdida de aislamiento sin depender del contenido de una base real.

Evidencia completa: `search-control-flow.json`, incluidos SQL y parámetros del ensayo. La captura del flujo no identifica un problema de inyección SQL: el servicio usa parámetros; el defecto observado es la falta de un filtro en ciertas ramas.

## Tamaño de respuestas y compresión

Muestras: primeros diez artículos ordenados por `order` de Constitución Nacional y Código Penal, tomados del caché existente. El formato actual incluye texto oficial completo y hasta 400 caracteres de explicación por artículo. La variante propuesta conserva título, número, id, orden, disponibilidad del texto y una vista previa de hasta 160 caracteres; el texto oficial se obtiene al pegar/citar con texto. No se propone pegar esa vista previa.

| Muestra | JSON actual | JSON con vista previa | Gzip 6 actual | Gzip 6 con vista previa | Ahorro después de gzip |
| --- | ---: | ---: | ---: | ---: | ---: |
| Constitución Nacional | 7.414 B | 2.834 B | 2.753 B | 982 B | 64,3% |
| Código Penal | 6.513 B | 2.773 B | 2.448 B | 1.008 B | 58,8% |

La variante sin vista previa pesa todavía menos (1.224/1.151 B de JSON), pero pierde información útil para elegir el artículo. Es una alternativa medida, no la recomendación por defecto.

En el listado actual, cambiar gzip 6 por Brotli 5 produjo estas diferencias:

| Muestra | Gzip 6 | Brotli 5 | Ahorro adicional | Mediana gzip / Brotli |
| --- | ---: | ---: | ---: | ---: |
| Constitución Nacional | 2.753 B | 2.675 B | 78 B | 0,118 / 0,464 ms |
| Código Penal | 2.448 B | 2.391 B | 57 B | 0,099 / 0,435 ms |

Se usó Node 22.21.1, 30 iteraciones medidas tras dos calentamientos, compresión síncrona en un único proceso local. Son tiempos de pared de un microensayo, con ruido del equipo; NO son perfiles de CPU de Render ni percentiles de producción. El orden de los ensayos y el entorno pueden afectar sus tiempos. La reducción de bytes de cada formato sí es reproducible con esas mismas muestras. Datos: `payload-compression.json`.

El backend YA tiene `app.use(compression())`, antes de los demás middlewares. No hace falta instalar otra capa equivalente. La respuesta se negocia por salto HTTP; que el BFF reciba gzip no significa que deba reenviar sus cabeceras sobre un JSON que ya descomprimió y transformó. Conviene dejar la compresión negociada del servidor/plataforma y validar cabeceras en el despliegue real.

El mayor ahorro demostrado aquí proviene de enviar menos datos y hacer menos trabajo. No se recomienda Brotli de máxima calidad por petición, comprimir en el hilo del editor, ni aplicar compresión de cuerpos personalizados que cambie los contratos sin una medición que lo justifique.

## Diseño recomendado para corregir

1. **Sugerencias de normas con política explícita.** Reutilizar registro y normalización; Nacional primero para la consulta genérica de constituciones, después provincias/CABA por jurisdicción; consulta explícita de una provincia favorece esa provincia. Mantener vigencia y visibilidad en el DTO. No alterar títulos oficiales para corregir una etiqueta de presentación.
2. **Búsqueda de artículos contextual.** Endpoint o servicio específico que exige `lawId`. Si la consulta es un número o una referencia normalizable (`7`, `Art. 7`, `14 bis`), resolver directamente en esa norma y terminar. Si es texto, FTS dentro de esa norma. Sin facetas, sin ranking global de códigos, sin búsqueda de otra norma como fallback. Limitar y ordenar en la base.
3. **Una respuesta común para listado y búsqueda.** Metadatos, orden, vigencia, vista previa y disponibilidad de texto; una fábrica común de `CitationAttrs` y las mismas acciones. “Pegar texto” descarga el texto oficial íntegro de ese artículo, con carga/error visibles. No recuperar texto mediante diez llamadas que hidraten diez veces una norma completa.
4. **Acceso liviano a datos.** Actualmente `findByLaw` y `findOne` pasan por `getFullNorm`: un fallo de caché hidrata y procesa toda la norma. Agregar proyecciones acotadas para sugerencias y detalle de artículo. Ya existen índices por `norm_id` y GIN de búsqueda. Evaluar planes antes de añadir un índice compuesto; no duplicar índices por intuición.
5. **Estados y solicitudes controlados.** Separar fases norma/artículos/acción; limpiar timers y abortar al cerrar, desmontar o cambiar de norma; descartar respuestas antiguas aunque el aborto llegue tarde. Propagar cancelación desde Next a su fetch cuando corresponda. El aborto de HTTP no garantiza cancelar SQL ya iniciado: hacen falta límites de consulta y tiempos de espera en el servidor.
6. **Caché acotada y correcta.** Deduplicar consultas simultáneas y reutilizar resultados por consulta normalizada, norma y versión del corpus. Fijar máximo de entradas/bytes y expiración; invalidar con cambios del corpus. No cargar todo el articulado en cada navegador ni crear un Map ilimitado. Mantener caché personal de documentos separada por cuenta y limpiarla al salir.
7. **Límites y errores reales.** Usar la firma de IP existente entre BFF y backend; medir agrupación de usuarios antes de subir el límite de 40/minuto. Mostrar 429/503 y error de red como estados propios; no convertirlos en “norma ausente” ni enviar tracking de falta de contenido.
8. **Escritos extensos y guardado.** Medir `getText`, conteo de palabras y serialización en cada actualización. El hook actual elimina parches pendientes antes de confirmar la respuesta y oculta fallos de guardado/borrado; debe mantener estado pendiente/error y un reintento acotado. `updateDoc` también rechaza silenciosamente contenido que supera el máximo del cliente. El listado de documentos del servidor trae todos sus cuerpos sin paginar: usar metadatos y carga del documento activo, con autorización por usuario.

## Prioridades y aceptación

Primero corrección: ninguna sugerencia fuera de la norma, equivalencia de números y referencias, orden determinista, texto íntegro y errores visibles. Después eficiencia: retirar facetas, proyecciones livianas, caché limitada, deduplicación y control de solicitudes. Luego medir y decidir cambios de índices y compresión específicos.

Las pruebas deben atravesar componentes y servicios: Constitución Nacional/Chaco/CABA, `7`/`Art. 7`/`14 bis`, número inexistente, palabras, filtros de vigencia y visibilidad, cierre/cambio rápido, errores de red y 429/503, acciones de pegar/sustituir, guardado fallido y escritos grandes. Las pruebas unitarias del detector por sí solas no cubren estas fronteras.

No se fija una promesa de capacidad sin medir. La meta inicial verificable es eliminar las facetas de sugerencias, usar una consulta de artículo exacto acotada por norma y evitar hidratar todo el corpus para seleccionar o pegar un artículo. El presupuesto de latencia, memoria y peticiones debe validarse sobre una copia representativa, con carga acordada.
