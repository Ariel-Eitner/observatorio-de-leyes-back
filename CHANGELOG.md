# Changelog

## 1.5.0 — 2026-11-13

- Tiempo máximo de búsqueda en PostgreSQL de 2 segundos, limitado a cada transacción, y respuesta recuperable ante saturación o demora.
- Vista previa del escrito y generador PDF cargados bajo demanda; menos procesamiento repetido y errores de exportación visibles.
- Redactor con búsqueda contextual: Constitución Nacional primero en consultas generales, jurisdicciones ordenadas y nombres de presentación consistentes.
- Artículos por número o palabras dentro de la norma seleccionada; equivalencia entre 7, Art. 7 y artículo 7, incluyendo sufijos como 14 bis, sin resultados de otra norma.
- Vista previa de hasta 160 caracteres y texto oficial íntegro bajo demanda; citar, pegar y sustituir disponibles también al filtrar, con control del límite de documento sin recortar textos.
- Consultas y respuestas livianas sin facetas ni hidratación de normas completas; caché limitada, deduplicación, concurrencia acotada y firma de IP entre frontend y backend.
- Solicitudes cancelables, descarte de respuestas antiguas y estados diferenciados para ausencia, conexión, límites temporales y errores; mejoras de teclado, foco y selector móvil.
- Lista de documentos paginada con metadatos y carga del contenido al abrir; guardado confirmado, cambios conservados ante fallos, reintentos acotados y avisos antes de salir o cerrar sesión.
- Importación idempotente y control transaccional del cupo de documentos; aislamiento al cambiar de cuenta y errores de creación o borrado visibles. Sin migraciones de base de datos.
- Índice compacto de siglas y números para el arranque, resolución en memoria y detección de referencias por tokens; eliminadas expresiones costosas y registros duplicados de extensiones del editor.
- Pruebas de regresión, integración PostgreSQL aislada, mediciones de consultas y recorridos de navegador para escritorio y móvil.

## 1.4.3 — 2026-11-13

- Verificación de versiones y changelog antes de compilar y en CI; detecta cambios sin incremento de versión.
- Comando de preparación que actualiza ambos paquetes, lockfiles, changelogs y versiones de Docker/Compose con notas explícitas.
- Retirada de helpers obsoletos y artefactos temporales; inventario de limpieza y diagnóstico del redactor legal.

## 1.4.2 — 2026-11-12

- Corrige la versión predeterminada de Docker y Compose a 1.4.2 para evitar el fallo de construcción por desajuste con package.json.

- Pro mensual vuelve al pago único de $26.000 por un mes, sin renovación automática, mediante Mercado Pago.
- Nuevas suscripciones deshabilitadas; las existentes conservan consulta y cancelación desde la cuenta.

## 1.4.1 — 2026-11-11

- Detecta cuando comprador y receptor son la misma cuenta antes de solicitar una suscripción. Explica el rechazo y permite corregir el correo sin dejar solicitudes bloqueadas.
- Conserva motivos seguros de rechazo entre servidores, sin exponer respuestas crudas de Mercado Pago. Muestra la fecha prevista del primer cobro cuando ya hay Pro vigente.

## 1.4.0 — 2026-11-11

- Pro mensual con suscripción de Mercado Pago por $26.000 al mes, consentimiento expreso y cancelación desde la cuenta. El anual conserva un pago único por doce meses.
- Cada cobro se verifica en el backend y acredita su período una sola vez; autorizar el mandato no acredita Pro. Cancelar conserva el acceso ya pagado.
- Cola durable y conciliación para recuperar notificaciones perdidas; cancelación confirmada antes de borrar una cuenta.
- Pruebas con PostgreSQL Docker aislado y navegador local, sin cargos reales.

## 1.3.0 — 2026-11-11

- Una sola consulta reúne bandeja, contador y preferencias. Las lecturas comparten la sincronización de avisos de cuenta durante un minuto, sin repetir escrituras y bloqueos por cada petición.
- Todas las categorías de notificaciones dentro del sitio vienen activadas por defecto. Las preferencias desactivadas expresamente se conservan.
- Pruebas de concurrencia, aislamiento, caché y recorrido de notificaciones y operaciones con usuarios en navegador local.

## 1.2.1 — 2026-11-11

- Corrige el bloqueo del checkout introducido al exigir variables nuevas: los pagos configurados vuelven a estar activos por defecto, con pausa solo explícita.
- Conserva las credenciales de Mercado Pago en el servidor del frontend cuando el backend no dispone de ellas; adaptador privado autenticado, sin transferir secretos al navegador.
- Obtiene y verifica la cuenta receptora con la API autenticada, mantiene importes, idempotencia y acreditación en el backend y conserva la validación de firmas en el servidor que tiene el secreto.
- Pruebas locales de regresión con configuración anterior, proveedor simulado, PostgreSQL aislado y navegador.

## 1.2.0 — 2026-11-11

- Papelera de usuarios: suspensión inmediata, restauración y borrado definitivo manual o a los 30 días.
- Avisos de bienvenida, producto y cupo agotado con enlaces a cuenta y planes.
- Descargas por ley con acceso durante 30 días y paquetes de 1, 10, 50 y 100 créditos válidos por un año.
- Catálogo comercial versionado y condiciones guardadas con cada compra; Escritos y Redactor exclusivos de Pro.


- El arranque de producción aplica las migraciones antes de abrir el servidor y sus tareas periódicas; un fallo bloquea el arranque en lugar de servir con tablas o campos ausentes.
- Prisma se conserva como dependencia de ejecución; regresión de inicio de sesión sobre PostgreSQL migrado.

## 1.1.0 — 2026-11-10

- Primera línea estable 1.x documentada, integrando pagos y notificaciones de la etapa 0.2.0.
- Cinco descargas gratuitas totales por cuenta, compartidas entre tipos y formatos, sin renovación.
- Borrado de usuarios con verificación del administrador, confirmación y auditoría transaccional.
- Versiones en nombres, etiquetas e imágenes Docker; PostgreSQL conserva su versión de motor.
- Unificación de cupos, bloqueo de concurrencia y eliminación de reintentos recursivos ante fallos de descarga.
- Simplificación de componentes señalados por SonarQube (props inmutables, condicionales y promesas).

## 0.2.0 — 2026-11-10

- Libro de órdenes y pagos, precios canónicos, concesiones independientes e idempotencia transaccional.
- Firma obligatoria, cola durable, conciliación, reversión por devolución verificada y panel operativo con reintentos.
- Bandeja privada de notificaciones, campañas con revisión de audiencia, preferencias y opiniones opcionales.
- CRM interno protegido; retirada la acreditación de Pro desde el flujo antiguo.
- Migración aditiva con RLS; exportación y eliminación de datos de cuenta actualizadas.
- Sandbox descartable y pruebas de integración PostgreSQL y navegador; corregida la salida de compilación a `dist/main.js`.
- Parche de proxy-addr. Quedan otras advertencias de dependencias a tratar por separado.
