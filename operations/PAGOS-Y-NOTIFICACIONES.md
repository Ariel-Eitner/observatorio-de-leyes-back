# Pagos y notificaciones — 1.1.0

Ver también [versionado, administración y descargas](VERSIONADO-Y-CUENTAS.md) para las políticas de esta entrega estable.

## Alcance

Pro mensual y anual con renovación manual. Los precios, moneda y duración se fijan en el backend; el año equivale a doce meses calendario, con ancla de día en Argentina. Un apoyo no concede Pro. Los beneficios anteriores se conservan mediante una base histórica separada de las concesiones pagadas.

El navegador nunca acredita un plan. Se verifica cada pago con Mercado Pago (id, receptor, referencia, importe, moneda, estado y fecha). La concesión, la contabilidad y el evento de dominio se confirman en una transacción. Los webhooks se firman, se guardan antes del ACK y se procesan con reintentos. Los fallos de entrega de avisos no revierten un pago confirmado. Hay conciliación periódica y panel `/admin/pagos-sistema`; reintentar una verificación o entrega no cobra de nuevo.

No se inicia automáticamente un reembolso: un reembolso/contracargo verificado revoca su propia concesión y registra su reversión. Cobros duplicados, importes incorrectos y reembolsos parciales requieren revisión administrativa. El sistema no decide por sí solo la resolución comercial de esos casos.

Notificaciones dentro del sitio: bandeja privada, contador, leído/no leído, marcar todas, archivo/restauración, paginación, preferencias y opinión opcional de 1 a 5 con comentario. Las campañas se crean como borradores, previsualizan audiencia, requieren publicación explícita, congelan destinatarios y pueden retirarse. Marketing deshabilitado por defecto. No hay envío de email, suscripción recurrente ni alertas normativas por correo en esta entrega.

## Entorno local descartable

Desde este repositorio, con Docker y dependencias de ambos proyectos instaladas:

```powershell
npm run build
npm run sandbox:build
npm run test:integration
npm run sandbox:start
npm run sandbox:status
npm run test:browser
```

Abrir http://127.0.0.1:4771. Usuarios sintéticos `usuario@local.invalid`, `otro@local.invalid` y `admin@local.invalid`, contraseña `Local-demo-2026!`. El acceso adicional al panel usa `Local-admin-2026!`. El proveedor HTTP es un simulador en loopback: el botón dice «Simular pago aprobado» y no carga tarjetas reales. Los datos viven en PostgreSQL 17 en tmpfs y se eliminan con `npm run sandbox:stop`. Los tres puertos 4770–4772 sólo escuchan en loopback. El sandbox ignora/sustituye las credenciales de los archivos de entorno; no reproduce el corpus ni usuarios reales.

Ejecutar las pruebas de navegador sobre un sandbox recién iniciado: la suite cambia únicamente sus cuentas sintéticas. Capturas, resultados y registros quedan ignorados en `.local/payments-sandbox/`. La compilación aislada usa URLs locales y desactiva la generación remota de sitemap. No ejecuta migraciones reales.

Las pruebas de integración crean otro PostgreSQL efímero, aplican todas las migraciones y lo eliminan al terminar. Incluyen concurrencia, fallos transaccionales, respuesta perdida del proveedor, duplicados, devoluciones, firma, permisos, RLS y privacidad. La suite general conserva las pruebas existentes; las pruebas que requieren un corpus poblado no sustituyen una validación normativa completa.

## Configuración de un futuro despliegue

No desplegar con el simulador. Respaldar primero y aplicar la migración `20261110190000_billing_notifications` con un rol propietario que pueda crear tablas y habilitar RLS. No hay migración masiva de usuarios, pagos o planes; las tablas anteriores permanecen.

Backend: `BILLING_ENABLED=true`, `MP_ACCESS_TOKEN`, `MP_COLLECTOR_ID` (id real del receptor), `MP_WEBHOOK_SECRET`, `MP_SITE_URL` (origen HTTPS del frontend), `ADMIN_SECRET`, `JWT_ACCESS_SECRET`, `AUTH_ENABLED=true`, `DATABASE_URL`. Frontend: `INTERNAL_API_URL`, el mismo `ADMIN_SECRET`, cookies seguras y `NEXT_PUBLIC_MP_PUBLIC_KEY` al compilar. Configurar Mercado Pago para enviar eventos de pagos a `<MP_SITE_URL>/api/pagos/webhook`. `ALLOW_MOCK_PAYMENTS` y `OBS_LOCAL_SANDBOX` deben estar ausentes en producción. Sin configuración de firma/receptor el checkout queda deshabilitado.

Antes de habilitar cobros: validar con cuentas y tarjetas de prueba oficiales de Mercado Pago, retorno desde Checkout Pro, webhook por HTTPS y receptor correcto. El simulador local no certifica las credenciales ni las respuestas reales del proveedor. Revisar los pagos antiguos pendientes: sus referencias no pertenecen al nuevo libro de órdenes y quedan para conciliación manual; no acreditar desde campos enviados por el cliente. Los derechos de usuarios históricos se capturan al recibir su primera operación nueva, sin quitar derechos vigentes.

Monitorear colas agotadas, órdenes en revisión y pendientes antiguos. Los paneles exponen errores genéricos, sin tokens ni formularios de tarjetas. Las tablas nuevas tienen RLS sin políticas anónimas; su acceso es por servicios autenticados. La eliminación de cuenta borra bandeja/preferencias/opiniones y anonimiza el contacto de las órdenes; conserva los movimientos financieros.

Referencias verificadas: [firma de webhooks](https://www.mercadopago.com.ar/developers/es/docs/checkout-api-orders/optional-notifications), [idempotencia](https://www.mercadopago.com.ar/developers/es/docs/wallet-connect-legacy/payment-flow/idempotency/introduction). Esta entrega mantiene la API Payments y Checkout Pro existentes, no migra a Orders API.
