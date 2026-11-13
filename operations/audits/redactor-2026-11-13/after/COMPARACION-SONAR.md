# Comparación SonarQube: 1.4.3 → 1.5.0

SonarQube 26.11.0.134175, scanner 6.2.1.4610 y analizador JS/TS 14.3.0.46350. Mismo perfil **Sonar way comprehensive**, con **440 reglas TypeScript activas**. Se analizó todo `backend/src` y `frontend/app`, con las mismas exclusiones de pruebas. No se desactivaron reglas ni se añadieron supresiones para obtener estos resultados.

| Alcance | Antes | Después |
| --- | ---: | ---: |
| Bugs clasificados por Sonar en `app/herramientas/redactor` | 29 | **0** |
| Total de hallazgos en ese directorio | 137 | 110 |
| Code smells en ese directorio | 108 | 110 |
| Complejidad cognitiva total del archivo LawAutocomplete.tsx | 108 | **64** |
| Hallazgos en la cadena ampliada del frontend | 153 | 125 |
| Bugs en esa cadena ampliada | 29 | **0** |
| Hallazgos en el ámbito backend seleccionado | 90 | 87 |
| Bugs en ese ámbito backend | 2 | 1 |
| Hallazgos de todo el backend | 353 | 350 |
| Hallazgos de todo el frontend | 1.546 | 1.518 |

La cadena ampliada incluye ahora las nuevas rutas del redactor y la protección de salida de cuenta. El bug restante del ámbito backend está en `src/main.ts:198`, en la llamada preexistente a bootstrap. El servicio nuevo de búsquedas no tiene hallazgos clasificados como bugs ni funciones que excedan el umbral de complejidad cognitiva. El detector de referencias ya no tiene las advertencias anteriores por regex de complejidad 39/53 y backtracking; las cuatro regex de formato señaladas en LawsService también se reemplazaron.

La complejidad total de un archivo no equivale a consumo de CPU. Por ejemplo, useRedactorDocs pasa de 65 a 193 al incorporar paginación, aislamiento de cuenta y recuperación explícita de errores, pero no conserva funciones por encima del umbral 15. El detector por tokens también tiene más decisiones explícitas que la regex anterior. Estas cifras no deben ocultarse ni interpretarse como mediciones de rendimiento: el volumen de respuestas, las consultas, sus planes y los recorridos se midieron por separado.

## Puerta de calidad y deuda restante

La puerta de calidad **no está aprobada** en ninguno de los dos proyectos:

- Backend: 5 hallazgos nuevos de mantenibilidad y cobertura nueva reportada como 0%.
- Frontend: 25 hallazgos nuevos de mantenibilidad y cobertura nueva reportada como 0%.
- Duplicación nueva: 0% en ambos, dentro del límite de 3%.

No se importó LCOV; el 0% no representa la ejecución de las suites documentadas. Para aprobar el requisito de 80% hay que instrumentar e importar cobertura real, especialmente del navegador. No se inventó un porcentaje ni se redujeron las exigencias de la puerta.

Los hallazgos nuevos se exportaron completos en `sonar-backend-new-issues.json` y `sonar-frontend-new-issues.json`. Incluyen preferencias de sintaxis/nombres y sugerencias estructurales: String.raw, .some, optional chaining, nombres de catch/setters, output para estados, funciones anidadas y simplificación de una regex del buscador general. También hay avisos que requieren criterio:

- `beforeunload.returnValue` se conserva como compatibilidad del aviso de cambios pendientes; está marcado como API obsoleta.
- La espera secuencial de las pasadas de guardado es deliberada: la siguiente pasada debe observar las revisiones que quedaron tras la anterior. Paralelizarlas cambiaría su comportamiento.
- El avance del índice del detector consume los tokens ya reconocidos y evita volver a sugerir partes de la misma referencia.
- Los manejadores delegados de teclado del selector permiten navegar desde sus entradas; un aviso genérico sobre el contenedor no justifica retirar esa interacción.
- Las advertencias sobre condiciones en los botones de vista previa corresponden a retornos anticipados; el recorrido de navegador valida que una instantánea rechazada no se use para abrirla.

Permanece deuda anterior de complejidad en los exportadores PDF/Word y el buscador general. El redactor utiliza el servicio contextual nuevo en su recorrido de sugerencias. La cadena ampliada conserva el aviso anterior de Math.random en el fallback del identificador de telemetría; ese identificador no se utiliza aquí como credencial de autenticación. No se declara libre de vulnerabilidades a toda la aplicación.

La corrección funcional y las optimizaciones aprobadas están implementadas y verificadas. Llevar toda la deuda de mantenibilidad a cero y conseguir la cobertura exigida por esta puerta son trabajos adicionales identificados, no resultados ya alcanzados.

## Trazabilidad

- Backend: tarea `3c1958d7-0b24-4a45-91df-983e221f9162`, procesada con SUCCESS.
- Frontend: tarea `cee67780-bf0a-419d-996f-eb87de81bdbf`, procesada con SUCCESS.
- Se comprobó que el contenido final de saveQueue.ts coincide con el código almacenado por Sonar. Una pasada anterior falló al coincidir con una edición y no se usó para esta comparación.
- `summary.json`, issues, métricas, perfiles, puerta de calidad y tareas provienen de la API autenticada. Se exportaron sólo hallazgos sin resolver; no se contaron como actuales los hallazgos ya cerrados.
- `source-snapshot.json` registra los commits base, versiones y hashes SHA-256 del código modificado, capturados antes del commit de esta implementación.
- Los logs de compilación, integración PostgreSQL, navegador y scanner acompañan los JSON. La instancia aislada de auditoría quedó detenida al finalizar; los servicios del usuario no se reiniciaron.
