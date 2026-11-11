# Pagos y notificaciones — 1.4.0

Ver también [versionado, administración y descargas](VERSIONADO-Y-CUENTAS.md) para las políticas de esta entrega estable.

## Alcance

Pro mensual con suscripción de Mercado Pago por $26.000 al mes hasta cancelar. El anual conserva un pago único por doce meses, sin renovación automática, al precio vigente del catálogo. Los precios, moneda y duración se fijan en el backend; el año equivale a doce meses calendario, con ancla de día en Argentina. Un apoyo no concede Pro. Los beneficios anteriores se conservan mediante una base histórica separada de las concesiones pagadas.

El navegador nunca acredita un plan. Se verifica cada pago con Mercado Pago (id, receptor, referencia, importe, moneda, estado y fecha). La concesión, la contabilidad y el evento de dominio se confirman en una transacción. Los webhooks se firman, se guardan antes del ACK y se procesan con reintentos. Los fallos de entrega de avisos no revierten un pago confirmado. Hay conciliación periódica y panel `/admin/pagos-sistema`; reintentar una verificación o entrega no cobra de nuevo.

La suscripción usa autorización alojada en Mercado Pago (`preapproval`, estado `pending`), con consentimiento expreso. Autorizar no acredita Pro: cada factura debe tener un pago aprobado verificado y concede su período calendario una sola vez. Si hay Pro prepagado, el inicio se difiere hasta su vencimiento. Se permite un solo mandato sin resolver por cuenta. Una respuesta perdida se recupera buscando la referencia; nunca se repite ciegamente un alta incierta. Las compras anteriores no se convierten en mandatos.

El comprador debe ser distinto del receptor de Mercado Pago. Antes del alta se compara el correo comprador con el perfil autenticado del receptor, sin exponer ese perfil al navegador ni transferir su correo entre servidores. Un rechazo definitivo deja la solicitud sin mandato y permite corregir el correo; una respuesta incierta conserva la protección contra duplicados. Los motivos que viajan entre servidores son categorías conocidas, nunca texto crudo del proveedor. Para probar una contratación nueva, usar una cuenta gratuita del Observatorio y una cuenta compradora distinta de la receptora; una cuenta con Pro hasta una fecha lejana programaría el inicio para ese vencimiento.

La cancelación desde `/cuenta#suscripcion` se confirma con Mercado Pago antes de anunciar éxito; conserva el período pagado. Para contratar el anual se cancela primero la renovación mensual. El borrado de cuenta exige confirmar previamente esa cancelación. Pausar nuevas contrataciones con `BILLING_ENABLED=false` no impide consultas ni cancelaciones existentes.

Activar en el panel de Mercado Pago los temas `subscription_preapproval` y `subscription_authorized_payment`, además de `payment`, con el webhook HTTPS existente `/api/pagos/webhook`. El backend acepta también `/api/billing/webhook` con su secreto. Las notificaciones se guardan antes del ACK y se verifican contra la API. La conciliación cada cinco minutos recupera facturas aunque se pierda el webhook. La cuenta y el retorno consultan el estado verificado, sin confiar en `status=approved` de la URL. No se crean suscripciones reales durante pruebas ni despliegues.

No se inicia automáticamente un reembolso: un reembolso/contracargo verificado revoca su propia concesión y registra su reversión. Cobros duplicados, importes incorrectos y reembolsos parciales requieren revisión administrativa. El sistema no decide por sí solo la resolución comercial de esos casos.

Notificaciones dentro del sitio: campana con desplegable, bandeja privada, contador, leído/no leído, marcar todas, archivo/restauración, paginación, preferencias y opinión opcional de 1 a 5 con comentario. Las campañas se crean como borradores, previsualizan audiencia, requieren publicación explícita, congelan destinatarios y pueden retirarse. Todas las categorías están activadas por defecto; cada persona puede desactivarlas desde sus preferencias. Las bajas guardadas se conservan. No hay envío de email ni alertas normativas por correo en esta entrega.

La campana y la bandeja comparten una consulta y una caché privada en memoria de 30 segundos, que se limpia al cerrar sesión y se actualiza tras las acciones. El servidor agrupa la sincronización de avisos de cuenta durante un minuto; las lecturas siguen verificando que la cuenta esté activa y consultan los avisos actuales. Las respuestas HTTP mantienen `private, no-store`, sin caché compartida entre personas.

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

## Catálogo y reglas comerciales

`src/commercial/commercial-catalog.json` define la versión, precios, paquetes y plazos. `npm run catalog:sync` genera la copia del frontend; `npm run catalog:check` comprueba que coincidan. Compose también comprueba esa igualdad. Cada orden guarda su versión y condiciones; una pantalla con versión diferente recibe un conflicto y debe actualizarse antes de comprar.

Una descarga consume una ley, incluyendo sus artículos y formatos PDF, con acceso reutilizable durante 30 días sin extender el plazo. Se utilizan primero las cinco leyes gratuitas y luego el lote comprado con vencimiento más cercano. Cada compra dura 12 meses; Pro conserva los créditos sin consumirlos. Escritos, Redactor y exportaciones son Pro.

Los avisos de bienvenida se crean con el registro. El aviso de producto espera 48 horas y respeta preferencias. Para la activación única de cuentas anteriores, después de respaldar y migrar, ejecutar `node operations/activate-account-notices.cjs --apply` con `DATABASE_URL` explícita y el backend compilado. Fuerza ese aviso de producto sin cambiar preferencias. Se puede repetir sin duplicados; el aviso de cupo agotado se crea sólo para cuentas gratuitas sin saldo y se archiva cuando corresponde. No envía correos.

La papelera cierra sesiones y bloquea los JWT mediante el estado real de la cuenta. La restauración conserva datos y saldos, sin pausar sus vencimientos. La limpieza periódica elimina definitivamente las cuentas después de 30 días y conserva los movimientos financieros anonimizados. Los administradores están protegidos.

## Configuración del despliegue

La imagen Docker y `npm run start:prod` ejecutan `prisma migrate deploy` antes de iniciar Nest y sus tareas periódicas. Si falta `DATABASE_URL` o falla una migración, el servidor no arranca con un esquema incompatible. Prisma se conserva como dependencia de producción. Este paso no sustituye el respaldo previo al despliegue.

No desplegar con el simulador. Respaldar primero y aplicar las migraciones pendientes, incluidas `20261111150000_trash_download_credits` y `20261111210000_pro_subscriptions`, con un rol propietario que pueda crear tablas y habilitar RLS. Las tablas anteriores permanecen; se preservan los contadores históricos y los accesos identificables de los últimos 30 días.

Los pagos con credenciales existentes están habilitados por defecto; `BILLING_ENABLED=false` los pausa explícitamente. Backend: `ADMIN_SECRET`, `JWT_ACCESS_SECRET`, `AUTH_ENABLED=true`, `DATABASE_URL`. Frontend: `INTERNAL_API_URL`, el mismo `ADMIN_SECRET`, cookies seguras y `NEXT_PUBLIC_MP_PUBLIC_KEY` al compilar. `MP_ACCESS_TOKEN` puede permanecer en el servidor del frontend: el backend usa el adaptador privado `/api/pagos/proveedor`, autenticado y limitado a operaciones de pago. También puede configurarse directamente en el backend. Sin `MP_COLLECTOR_ID`, la cuenta receptora se obtiene con `/users/me` autenticado y se verifica antes de acreditar. `MP_SITE_URL` permite sobrescribir el origen; por defecto usa `FRONTEND_URL` o `https://observatorio-de-leyes.com`.

El secreto `MP_WEBHOOK_SECRET` puede permanecer en el frontend: allí se valida la firma antes de enviar el evento al endpoint privado del backend. Si solo está en el backend, se conserva la validación directa. Si no existe en ninguno, las notificaciones se rechazan y la conciliación verifica los pagos con la API del proveedor; la falta del secreto no apaga el checkout. Configurar Mercado Pago para enviar eventos a `<MP_SITE_URL>/api/pagos/webhook`. `ALLOW_MOCK_PAYMENTS` y `OBS_LOCAL_SANDBOX` deben estar ausentes en producción.

Antes de habilitar cobros: validar con cuentas y tarjetas de prueba oficiales de Mercado Pago, retorno desde Checkout Pro, webhook por HTTPS y receptor correcto. El simulador local no certifica las credenciales ni las respuestas reales del proveedor. Revisar los pagos antiguos pendientes: sus referencias no pertenecen al nuevo libro de órdenes y quedan para conciliación manual; no acreditar desde campos enviados por el cliente. Los derechos de usuarios históricos se capturan al recibir su primera operación nueva, sin quitar derechos vigentes.

Monitorear colas agotadas, órdenes en revisión y pendientes antiguos. Los paneles exponen errores genéricos, sin tokens ni formularios de tarjetas. Las tablas nuevas tienen RLS sin políticas anónimas; su acceso es por servicios autenticados. La eliminación de cuenta borra bandeja/preferencias/opiniones y anonimiza el contacto de las órdenes; conserva los movimientos financieros.

Referencias verificadas: [firma de webhooks](https://www.mercadopago.com.ar/developers/es/docs/checkout-api-orders/optional-notifications), [idempotencia](https://www.mercadopago.com.ar/developers/es/docs/wallet-connect-legacy/payment-flow/idempotency/introduction). Esta entrega mantiene la API Payments y Checkout Pro existentes, no migra a Orders API.

Referencias de suscripciones: [alta](https://www.mercadopago.com.ar/developers/es/reference/online-payments/subscriptions/create-preapproval/post), [cancelación](https://www.mercadopago.com.ar/developers/es/reference/online-payments/subscriptions/update-preapproval/put), [facturas](https://www.mercadopago.com.ar/developers/es/reference/online-payments/subscriptions/authorized-payment-search/get).
