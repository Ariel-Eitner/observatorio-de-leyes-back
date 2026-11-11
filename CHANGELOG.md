# Changelog

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
