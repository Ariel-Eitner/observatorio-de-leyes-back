# Redactor Legal 1.5.0

Implementación de la revisión del 13 de noviembre de 2026. Repositorios de backend y frontend sincronizados en 1.5.0, incluidos package.json, lockfiles, Docker, Compose y changelogs. No requiere migraciones de base de datos ni incorpora dependencias.

## Cambios implementados

1. **Orden de constituciones:** Constitución Nacional primero en la consulta genérica; luego jurisdicciones en orden alfabético. Una provincia indicada expresamente conserva su relevancia.
2. **Etiquetas consistentes:** nombres y mayúsculas de presentación uniformes, incluida CABA, sin modificar títulos oficiales almacenados.
3. **Búsqueda contextual:** servicio específico para el redactor; todo acceso a artículos exige la norma seleccionada.
4. **Número de artículo:** `7`, `Art. 7` y `artículo 7` son equivalentes; admite sufijos como `14 bis`.
5. **Sin resultados ajenos:** no utiliza otras normas como fallback. También se corrigieron los filtros del buscador anterior en sus ramas numéricas.
6. **Búsqueda por palabras:** texto completo con el índice FTS existente, restringido a la norma. Sin facetas ni cálculo de resultados globales.
7. **Orden y paginación:** páginas de diez sugerencias; orden determinista por relevancia textual cuando corresponde y después orden del articulado e id.
8. **Contrato único:** listado y búsqueda comparten metadatos, estado, disponibilidad y acciones.
9. **Vista previa de artículos:** hasta 160 caracteres; no transporta explicaciones ni cuerpos completos en cada sugerencia.
10. **Texto oficial íntegro:** se solicita por identidad exacta únicamente al pegar o sustituir; nunca se pega la vista previa recortada.
11. **Acciones persistentes:** citar, pegar texto y sustituir siguen disponibles después de filtrar.
12. **Vigencia y visibilidad:** consultas públicas filtran PUBLICA; los cambios de vigencia detectados al recuperar el texto se muestran antes de insertar. Las advertencias de derogación se conservan.
13. **Lecturas acotadas:** se evita hidratar una norma entera para listar diez artículos o recuperar uno. Se mantiene el comportamiento histórico de los consumidores que solicitan un listado ilimitado.
14. **Menos solicitudes:** espera de 300 ms al escribir, cancelación al cambiar o cerrar, descarte de respuestas antiguas y deduplicación de solicitudes simultáneas iguales.
15. **Caché limitada:** por versión del corpus, máximo 64 entradas y 1 MiB, entrada individual hasta 128 KiB y expiración de 15 segundos. El texto oficial se lee fresco y sólo comparte peticiones que ya están en curso.
16. **Protección de infraestructura:** hasta ocho solicitudes distintas en curso por instancia; 40 solicitudes por minuto por IP conforme al guard existente. Firma de IP entre BFF y backend.
17. **Tiempo máximo real:** cada consulta nueva se ejecuta dentro de una transacción con statement_timeout de PostgreSQL de 2 segundos, espera de conexión de 1 segundo y límite de transacción de 3 segundos. No cambia la configuración de otras conexiones. Hay una SELECT de datos por consulta, además de los comandos de control transaccional.
18. **Errores explícitos:** red, respuesta inválida, 429 y 503 se distinguen de resultados vacíos. El BFF limita las rutas y parámetros y tiene un tiempo máximo de 8 segundos.
19. **Detector de referencias:** tokenización acotada y diccionario compacto de siglas/números; búsqueda de pertenencia en Set y resolución de registro mediante mapas. No descarga el articulado ni recorre todo el registro por tecla.
20. **Integridad de texto y teclado:** posiciones originales preservadas con acentos descompuestos; validación del rango antes de sustituir; Backspace permite volver a elegir artículo sin duplicar la cita. Selector móvil nativo, etiquetas y botones accesibles.
21. **Menos trabajo al escribir:** conteo y serialización agrupados a 350 ms; no vuelve a cargar el contenido del editor después de cada confirmación de guardado. Se eliminaron extensiones duplicadas de Tiptap.
22. **Guardado confirmado:** cola por documento con una escritura simultánea, combinación de parches y conservación de revisiones nuevas cuando llega una confirmación antigua. Sólo descarta un parche después de confirmarlo; hasta dos reintentos automáticos, además del reintento manual. Cola limitada a 64 documentos y 2 MiB.
23. **Límites y salida:** conserva el límite existente de 50 KiB por documento y avisa al superarlo; pegar un artículo excesivo no inserta fragmentos. Guarda antes de cambiar de documento; navegación y cierre de sesión verifican cambios pendientes. Cerrar la pestaña mantiene aviso y un intento keepalive acotado, sin afirmar que tuvo éxito.
24. **Documentos livianos:** lista paginada de metadatos, contenido al abrir, hasta ocho cuerpos limpios en memoria; los cambios pendientes no se expulsan. Autorización por propietario y limpieza al cambiar de cuenta.
25. **Creación y borrado robustos:** importación y creación idempotentes por cuenta, cupo comprobado con bloqueo transaccional y errores visibles. Un borrado fallido mantiene el documento. No se transforma un fallo de cuenta en guardado local silencioso.
26. **Vista previa y exportación:** vista previa del escrito y generador PDF cargados bajo demanda; el documento se interpreta una vez por cambio de contenido en la vista previa. PDF y Word siguen cargando sus bibliotecas al usarlas; errores de exportación visibles y promesas controladas.
27. **Compresión, versiones y evidencia:** se conserva gzip negociado existente; se reduce primero el contenido y las consultas. Changelogs actualizados y verificación automática de versiones. Pruebas de regresión, navegador, PostgreSQL aislado y nueva pasada de SonarQube con evidencia exportada.

## Verificación

- Compilación de backend y compilación de producción de frontend, incluida comprobación TypeScript. El build local del frontend usó un backend de loopback inaccesible y SITEMAP_SKIP=1 para evitar acceso a servicios de producción durante la compilación.
- Backend: 126 pruebas unitarias aprobadas en 11 suites. Se excluyeron las pruebas de datos que requieren una base real; las integraciones se ejecutaron mediante el entorno aislado descrito abajo.
- Frontend: 192 comprobaciones generales aprobadas y suite específica del redactor: normalización, enlaces de citas, concurrencia de guardado, recuperación, cancelación y salida de cuenta.
- PostgreSQL 17 desechable: 11 pruebas aprobadas sobre el esquema real migrado, con usuarios y normas sintéticos. Incluyen orden, aislamiento, búsquedas numéricas y textuales, paginación, visibilidad, texto íntegro, cancelación real por tiempo máximo, autorización, idempotencia y carrera de cupos. El contenedor se elimina al finalizar; no se conecta a la base de producción.
- Navegador sobre Next y sus BFF reales, con API sintética aislada: escritorio y móvil; errores 429, respuestas tardías, guardado fallido y recuperación, aviso al navegar, límite de documento, Backspace, cambio de documento y borrado fallido. Comprueba descargas PDF y Word por su firma y que abrir la vista previa no consulte el corpus.
- Verificador de versiones de ambos repositorios y cinco pruebas del sistema de releases.
- Comprobación de sólo lectura sobre los contenedores reconstruidos por el usuario, a través de `localhost:4000`: respuestas 200, Nacional/Buenos Aires/Catamarca/Chaco en ese orden, `7` y `Art. 7` resuelven ambos `cn-art-7`, sin cuerpo completo en la sugerencia. El listado negocia `Content-Encoding: gzip` y declara `Vary: Accept-Encoding`.

Comandos reproducibles: backend `npm run test:redactor:integration`, `npm run test:redactor:browser`, `npm run release:check:workspace`, `npm run release:test`; frontend `npm test`, `npm run test:redactor`, `npm run build`. Las pruebas de navegador requieren ambos repositorios y Playwright instalado; usan exclusivamente los puertos de loopback 4780/4781.

## Mediciones y límites

Con las mismas muestras públicas del caché local utilizadas en la auditoría inicial, el formato final incluye también los estados y el sobre de paginación:

| Primeros diez artículos | JSON anterior / nuevo | Gzip 6 anterior / nuevo | Reducción de bytes comprimidos |
| --- | ---: | ---: | ---: |
| Constitución Nacional | 7.414 / 3.472 B | 2.753 / 1.085 B | 60,6% |
| Código Penal | 6.513 / 3.411 B | 2.448 / 1.113 B | 54,5% |

El caché histórico no expone el estado individual del artículo: el ensayo lo modela como null. Es una comparación de serialización y compresión offline, no de latencia ni de datos actuales de producción. Script: `operations/measure-redactor-payload.cjs --write`; evidencia: `audits/redactor-2026-11-13/after/payload-compression.json`. Requiere las muestras originales en el caché local.

En la última prueba aislada con 3.000 artículos sintéticos, EXPLAIN ANALYZE registró 0,194 ms de planificación y 5,182 ms de ejecución SQL. Para 32 búsquedas frías con concurrencia cuatro se midieron p50 de 87,34 ms y p95 de 193 ms, incluyendo los comandos transaccionales y bajo carga local concurrente de otras comprobaciones. Las solicitudes calientes de prueba no ejecutaron SQL. Un pg_sleep(3) fue cancelado por PostgreSQL y la siguiente consulta pudo ejecutarse. Estos valores no son un SLA ni una prueba de carga de producción.

No se añadieron índices por intuición: se reutilizaron los índices existentes y se midió el plan. Una copia representativa de producción puede justificar un índice compuesto o una columna normalizada de números. Cancelar HTTP no cancela por sí solo una SELECT ya iniciada; por eso se aplica también el límite real en PostgreSQL.

El detector reconoce referencias estructuradas y las siglas del diccionario; no interpreta cualquier frase jurídica arbitraria. La tokenización reduce los casos ambiguos, pero no reemplaza la revisión humana del escrito. La vista previa A4 conserva su sistema de paginación anterior y no promete coincidencia exacta con Word.

## SonarQube y despliegue

La comparación final y los JSON reproducibles se encuentran en `audits/redactor-2026-11-13/after/`. Se conserva la auditoría 1.4.3 para comparar con el mismo perfil comprehensive; no se rebajaron reglas ni se añadieron exclusiones de código productivo. Las pruebas siguen excluidas como en la línea base. No se importó cobertura: el valor 0% de Sonar no representa una medición de estas suites.

Resultado: **29 → 0 bugs clasificados por Sonar dentro del redactor**; LawAutocomplete reduce su complejidad cognitiva de 108 a 64. La puerta de calidad sigue en ERROR por cobertura no importada y 5/25 hallazgos nuevos de mantenibilidad en backend/frontend. Los detalles y el criterio para los avisos deliberados están en `audits/redactor-2026-11-13/after/COMPARACION-SONAR.md`. No se declara aprobada esa puerta ni eliminada toda la deuda técnica.

El servicio general de búsqueda y los exportadores tienen deuda de complejidad preexistente fuera del recorrido de sugerencias. No se deben presentar todos los hallazgos de Sonar como bugs ni afirmar que toda la aplicación está libre de ellos; la comparación distingue el redactor del total del repositorio.

Desplegar backend antes que frontend, porque el cliente usa las rutas nuevas. Los contenedores reconstruidos antes de los últimos ajustes de exportación y accesibilidad requieren una nueva construcción para incluirlos. Las pruebas no publican cambios ni reinician los servicios del usuario.
