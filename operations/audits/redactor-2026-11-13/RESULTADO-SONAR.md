# Auditoría SonarQube del redactor legal

Fecha: 2026-11-13. Referencia: backend `056eaf2bb1f5048b67755e29cef9e57ddff4f944`; frontend `d8baf962d5c1f9b56f9cc7d976e1f3d92c36ccee`; ambos 1.4.3.

## Método y límites

Se utilizó SonarQube Community Build **26.11.0.134175** con SonarScanner **6.2.1.4610** y analizador JavaScript/TypeScript **14.3.0.46350**. La instancia temporal de Docker usa la misma imagen disponible en la instalación del usuario, escucha únicamente en `127.0.0.1:19000` y tiene límites de 2,25 GiB y dos CPU. No se modificaron las credenciales, proyectos, perfiles ni datos del SonarQube existente. Sus contenedores quedaron detenidos, como estaban antes de esta auditoría.

Se ejecutó una pasada inicial para verificar el entorno y después una pasada final con **Sonar way comprehensive** para TypeScript y JavaScript. TypeScript tiene **440 reglas activas**, frente a 199 del perfil core predeterminado. Las cifras de este informe corresponden a la pasada comprehensive. CSS conserva su perfil core; JSON usa el perfil comprehensive disponible, que no agrega reglas en esta edición.

Se analizaron `backend/src` y `frontend/app`, excluyendo archivos de pruebas `*.spec.ts`/`*.test.ts(x)`. Los programas TypeScript usan los tsconfig existentes para resolver imports. No se incluyeron node_modules ni builds como fuentes. En la pasada final se deshabilitó SCM/blame para evitar repetir ese procesamiento; los commits de referencia se registran arriba. No se importó cobertura: cualquier valor 0% que aparezca significa ausencia de un reporte de cobertura importado, no que se haya medido una suite con cero cobertura.

El análisis amplio permite detectar problemas en dependencias compartidas. Se separa su total del subconjunto relevante para el redactor. Las métricas de complejidad y duplicación describen el código, **no son medidas de CPU, RAM, facturación ni capacidad**. La edición utilizada tampoco constituye un análisis exhaustivo del comportamiento SQL embebido en strings.

## Backend: resultados verificados

Total de `src`: **353 hallazgos** —349 code smells, 3 bugs y 1 vulnerabilidad según la clasificación de Sonar—. No son 353 fallos del redactor. El subconjunto `src/search`, `src/articles`, `src/laws`, `src/norms-db`, `src/user-content`, `src/common/guards/proxy-throttler.guard.ts` y `src/main.ts` reúne **90 hallazgos**.

Los más relevantes para la revisión:

| Regla | Archivo/línea | Resultado | Lectura técnica |
| --- | --- | --- | --- |
| S3776 | `src/search/search-db.service.ts:213` | Complejidad cognitiva **52**, umbral 15 | La función `search` concentra decisiones de búsqueda general, números, nombres, referencias y fallback. Conviene separar la búsqueda contextual del redactor y probar sus filtros |
| S3776 | `src/search/search-db.service.ts:500` | Complejidad cognitiva **23**, umbral 15 | `suggest` tiene otra combinación de estrategias; conviene compartir normalización y resolución, sin duplicar políticas divergentes |
| S8786 | `src/laws/laws.service.ts:54`, `305`, `1063`, `1184` | Cuatro expresiones con posible rendimiento superlineal por backtracking | Afectan formato de números y limpieza de rutas. Priorizar según entradas y frecuencia; no demuestran por sí solas un cuello de botella al tipear |
| S5842 | `src/search/search-db.service.ts:155` | Alternativa de regex que puede coincidir con cadena vacía | Revisar el grupo con `\b` dentro de un patrón opcional y conservar regresiones del parser. El patrón completo exige referencia/número: no se debe interpretar el aviso como que toda la expresión acepta cualquier cadena vacía |

En el subconjunto también hay avisos sobre conversiones a string, formas de usar regex, `replaceAll`, `Number.parseInt` y simplificación de condiciones. Muchos son de estilo o mantenibilidad: no justifican prometer un ahorro de recursos al resolverlos.

Para no mezclar ámbitos: los otros bugs del análisis general incluyen manejo de una Promise en notificaciones y el cierre de la Promise de arranque; la vulnerabilidad general se refiere a un enlace HTTP en `src/common/utils/infoleg-map.ts`. No se presentan como vulnerabilidades nuevas del redactor ni se modifican en esta auditoría.

## Frontend: resultados verificados

Total de `app`: **1.546 hallazgos** —1.334 code smells, 211 bugs y 1 vulnerabilidad en la clasificación de Sonar—. El directorio específico **`app/herramientas/redactor` tiene 137: 108 code smells y 29 bugs**. Al agregar sus proxies y utilidades compartidas, el subconjunto suma **153: 123 code smells, 29 bugs y 1 vulnerabilidad**. El resto del sitio no forma parte de la corrección propuesta.

El subconjunto ampliado incluye `app/api/search/route.ts`, `app/api/articles/route.ts`, `app/api/redactor-docs/**` y las utilidades `lawRegistry`, `articleSlug`, `articuloDerogado`, `clientIp`, `adminHeaders`, `authProxy`, `tracking`, `api` y `format` de `app/lib`.

| Regla | Archivo/línea | Resultado | Lectura técnica |
| --- | --- | --- | --- |
| S2004 | `components/LawAutocomplete.tsx:184` | Más de cinco niveles de funciones anidadas | El efecto de búsqueda mezcla fetch, transformación y ranking. Separar responsabilidades con un contrato compartido y un único ciclo de solicitudes |
| S3776 | `components/LawAutocomplete.tsx:240` | Complejidad cognitiva **20**, umbral 15 | Handler de navegación por teclado: separar fases preservando Enter/flechas/Escape y foco |
| S3358 | `components/LawAutocomplete.tsx:185` | Dos ternarios anidados en el ranking | Extraer una política explícita; el cambio debe además resolver números normalizados y orden estable, no solo la sintaxis |
| S8786 / S5843 | `trigger.ts:72` | Regex con posible costo superlineal y complejidad **39/20** | El detector al tipear recibe una ventana de 80 caracteres, lo que acota ese uso. Revisar patrones y límites en todos sus consumidores antes de atribuirle un consumo excesivo |
| S5843 | `trigger.ts:104` | Regex de texto pegado con complejidad **53/20** | A diferencia de la ventana al tipear, el texto pegado puede ser extenso; corresponde probar ese recorrido por separado |
| S3776 | `hooks/useRedactorDocs.ts:81` | Complejidad cognitiva **18/15** | Inicialización y migración de documentos mezclan varios estados y solicitudes. Incluir cancelación, cambio de usuario y errores de guardado |
| S3776 | `components/ExportButtons.tsx:94`; `components/pdfTextRenderer.ts:62`, `86`, `149` | Funciones con complejidad **18–22**, umbral 15 | Afectan exportación; no justifican cambiar la búsqueda. PDF y DOCX ya cargan sus librerías grandes mediante import dinámico |
| S1082 / S6848 | Overlay de `LawAutocomplete.tsx:448–449` y otros controles | Acciones en elementos no interactivos sin soporte completo de teclado | Revisar semántica de diálogo, cierre, foco y accesibilidad manteniendo el flujo de selección |

Los **29 bugs clasificados por Sonar dentro del módulo** se distribuyen en **23 avisos S9383 de Promises** y **6 de accesibilidad S1082**. No equivalen a 29 fallos funcionales reproducidos ni a 29 fugas de recursos. Varias Promises son envíos de tracking intencionalmente independientes; declarar la intención con `void` no elimina peticiones ni ahorra CPU. Otras pertenecen al ciclo de carga y deben revisarse junto con cancelación y errores.

La vulnerabilidad del subconjunto ampliado es S2245 en `app/lib/tracking.ts:214`: un fallback a `Math.random` para identificadores de tracking. La ruta inspeccionada no genera ahí una credencial de autenticación. Hay que evaluar su uso antes de presentar el hallazgo como una debilidad de acceso al redactor. Los hotspots de seguridad exportados son cero en ambos proyectos; eso no constituye una garantía de seguridad exhaustiva.

Hay avisos que requieren criterio y no una corrección automática: S1135 interpreta “TODO el texto” en un comentario en español como una tarea pendiente; `autoFocus` se usa tras una selección explícita de norma y debe evaluarse en ese contexto. La duplicación de **89,4% en `templates.ts`** describe plantillas y estructuras de contenido repetidas; no demuestra por sí sola que falte reutilización de componentes de búsqueda.

Métricas agregadas por archivo, para no confundirlas con complejidad de una sola función:

| Archivo | Líneas de código (ncloc) | Complejidad ciclomática agregada | Complejidad cognitiva agregada |
| --- | ---: | ---: | ---: |
| `RedactorClient.tsx` | 1.077 | 224 | 85 |
| `components/LawAutocomplete.tsx` | 401 | 152 | 108 |
| `hooks/useRedactorDocs.ts` | 199 | 65 | 65 |
| `components/pdfTextRenderer.ts` | 316 | 123 | 126 |
| `backend/src/search/search-db.service.ts` | 523 | 147 | 125 |

Estas sumas sirven para orientar separación y pruebas; no deben compararse directamente con el umbral 15 de complejidad por función.

## Cruce con el comportamiento y el costo

La complejidad detectada coincide con la concentración de ramas que observamos manualmente. Sin embargo, los problemas funcionales y de recursos más importantes necesitan evidencia adicional a Sonar:

- La prueba del flujo real con Prisma simulado confirma que `7` ejecuta facetas y ninguna búsqueda de artículos; `245` puede devolver otra norma; y la referencia escrita también pierde el filtro contextual en una rama.
- La pérdida del botón de pegar viene de respuestas incompatibles entre listado y búsqueda. Un refactor cosmético de Sonar no agrega el texto oficial ni restaura esa acción.
- El cálculo de facetas se hace aunque el desplegable las descarta. Ni compresión ni minificación eliminan ese trabajo SQL.
- `getFullNorm` hidrata toda la norma para operaciones que necesitan una pequeña proyección o un solo artículo.
- Las pruebas con contenido público del caché local muestran un ahorro del **58,8–64,3% en bytes ya comprimidos con gzip** al conservar una vista previa de 160 caracteres y obtener el texto completo al pegar. El cambio de gzip 6 a Brotli 5 ahorró solo 57/78 bytes adicionales en los listados actuales y llevó más tiempo en el microensayo.

Ver [arquitectura, mediciones y diseño](ARQUITECTURA-Y-MEDICIONES.md), `search-control-flow.json` y `payload-compression.json`. No se realizó una prueba de carga ni se ejecutó EXPLAIN contra una base de datos.

## Decisión para la corrección posterior

El orden recomendado es: corregir aislamiento y resolución de artículos; unificar el contrato y las acciones; retirar facetas y proyecciones completas innecesarias; controlar errores/cancelaciones y cachés; mejorar la estructura de los componentes y funciones señalados; medir índices y compresión en el recorrido real. No conviene hacer una reescritura general ni perseguir primero cientos de avisos menores del resto del sitio.

El cierre debe incluir regresiones de navegador/servicios y una nueva pasada con el mismo perfil, además de mediciones de peticiones, bytes, tiempos y memoria. Reducir hallazgos o pasar un quality gate no certifica eficiencia de infraestructura.

Los JSON exportados y logs de scanner que acompañan este documento permiten verificar cifras, reglas, localizaciones, perfil y métricas. Contienen resultados del análisis; no incluyen tokens ni contraseñas.

## Artefactos y continuidad

- `summary.json`: versiones, commits, tareas finales verificadas, perfiles, métricas y conteos por ámbito.
- `sonar-scoped-issues.json`: hallazgos del subconjunto descrito para backend y frontend.
- `sonar-*-issues.json`, `sonar-*-file-metrics.json`, `sonar-*-metrics.json`, `sonar-*-profiles.json`, `sonar-*-quality-gate.json` y `sonar-*-hotspots.json`: exportaciones completas para comprobar el filtrado y las cifras.
- `sonar-*-scanner.log`: ejecución final del scanner. La advertencia de límite de grupos de duplicación del glosario afecta a un archivo ajeno al redactor y limita la exhaustividad de esa métrica general.
- `sonar-selected-rules.json`: documentación de las reglas S3776, S8786 y S5842 obtenida de la API local de esta versión.

La instancia `observatorio-redactor-sonar-audit-20261113` quedó **detenida** al finalizar, conservando los análisis para comparar después de corregir. Para reutilizarla se puede iniciar ese mismo contenedor; no necesita arrancar ni modificar el SonarQube existente. El acceso de la auditoría quedó protegido con DPAPI para el usuario de Windows en `%TEMP%/observatorio-redactor-sonar-run-20261113`, fuera de los repositorios. No imprimir ni publicar esos archivos de acceso.

Se verificó que los identificadores de tarea de las exportaciones coinciden con los de las pasadas finales comprehensive, que ambos perfiles TypeScript tienen 440 reglas y que no hay cambios en el código de ejecución de ninguno de los repositorios. La versión sigue coherente en 1.4.3. Los únicos archivos nuevos son los informes de esta auditoría; no se hizo otro commit ni push.
