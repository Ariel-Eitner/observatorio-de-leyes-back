# Changelog

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
