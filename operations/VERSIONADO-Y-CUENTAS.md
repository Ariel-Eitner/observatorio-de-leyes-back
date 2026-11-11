# Entrega 1.1.0 — 10 de noviembre de 2026

Primera línea estable 1.x documentada de esta etapa: incluye pagos y notificaciones y agrega administración de cuentas y la política de descargas. No se inventan versiones 1.2–1.17 para funcionalidades anteriores. En adelante: `1.MINOR.PATCH`; una funcionalidad o cambio de política incrementa MINOR y una corrección compatible incrementa PATCH. Un cambio incompatible importante requiere revisar MAJOR. Se documentan resultados para el usuario, migraciones y riesgos, no cada cambio cosmético.

La versión debe coincidir en los dos package.json, sus lockfiles y la cabecera vigente de los changelogs. Las imágenes y nombres Docker llevan la misma versión; `org.opencontainers.image.version` y `APP_VERSION` permiten inspeccionarla. La construcción falla si su etiqueta no coincide con el package.json. PostgreSQL muestra su motor 17; el software no versiona el motor ni mezcla su versión con el corpus.

Desde el backend:

```powershell
npm run docker:local -- config --quiet
npm run docker:local -- build backend frontend
# Cuando se quiera iniciar el stack local configurado:
npm run docker:local -- up -d
```

`operations/compose.local.yml` es la configuración mantenida en Git. El comando fija la versión desde el paquete y resuelve las rutas desde la raíz del proyecto; no imprime credenciales. El docker-compose.yml de la raíz es la copia local equivalente, porque esa raíz todavía no es un repositorio Git. Nombres: `observatorio-de-leyes-backend-1.1.0`, `observatorio-de-leyes-frontend-1.1.0`, `observatorio-de-leyes-db-postgres-17`. El comando `up` no ejecuta migraciones por sí solo: aplicar primero las migraciones con el procedimiento de despliegue y respaldo correspondiente. El sandbox descartable aplica las migraciones automáticamente y utiliza sólo usuarios sintéticos.

## Borrado administrativo

La lista `/admin/usuarios` ofrece Eliminar usuario para cuentas no administradoras. Se exige la sesión de una cuenta administradora activa, acceso al panel, su contraseña, correo exacto de la cuenta elegida y BORRAR. El backend verifica el rol actual en la base; no confía en el rol enviado por el navegador. Una cookie de panel sin cuenta administradora no alcanza. Las cuentas administradoras están protegidas, incluida la propia. No se incluye borrado masivo.

La misma rutina de supresión sirve al titular y al administrador. Borra sesiones, contenido personal, notificaciones y preferencias; anonimiza CRM y movimientos financieros conservados. El asiento de auditoría registra al administrador y se confirma en la misma transacción: si falla, todo se revierte. No se borró ningún usuario real durante el desarrollo.

## Cinco descargas gratuitas permanentes

Un único contador `users.free_downloads_used` concede cinco autorizaciones gratuitas totales por cuenta, compartidas por artículos, leyes y exportaciones/informes. No hay renovación mensual, diaria, por formato, navegador ni dispositivo. Repetir la misma descarga consume otra autorización. Pro conserva descargas ilimitadas mientras esté vigente; al vencer, sigue el saldo gratuito anterior, sin reiniciarlo. Los permisos de herramientas exclusivas de Pro continúan vigentes. Los análisis de contratos conservan su cupo mensual separado; descargar su informe consume el saldo común.

La migración `20261110210000_lifetime_downloads` importa las autorizaciones históricas de `download_log` de todos los meses, excepto los análisis, con un máximo de cinco. Esos registros antiguos no distinguen el plan que tenía la cuenta: la importación conservadora cuenta lo registrado y no reconstruye eventos que nunca fueron persistidos. No se modifica la vigencia de ningún pago ni se cobra automáticamente.

El contador es independiente del detalle de logs. Un bloqueo de transacción por cuenta impide superar cinco ante solicitudes concurrentes; borrar logs o cambiar de mes no recupera saldo. Se eliminó el esquema alternativo de diez exportaciones diarias por guestId. La información personal exportada por el titular desde su cuenta no consume el cupo de documentos del producto.

Los PDF normativos siguen generándose en el navegador. El control se aplica a las funciones de descarga del producto: no pretende impedir imprimir, copiar o guardar manualmente contenido público con herramientas externas. Una autorización consumida no se devuelve automáticamente si se cancela la impresión o falla la generación; evita que un supuesto fallo del cliente reinicie el saldo.

## Mejoras vinculadas al análisis SonarQube

- S3358: retirada la selección ternaria anidada de planes en UsuariosClient.
- S6759: propiedades de usuarios/cupos declaradas de sólo lectura.
- S4624: retiradas plantillas de texto anidadas en el destino de descarga.
- S9383: llamadas asíncronas de descarga explícitas; eliminado el reintento recursivo al fallar la autorización de una cuenta ya iniciada.
- S7772: importación de node:crypto en la supresión de cuentas.
- S1135: aclarado el comentario español con «TODO», que Sonar interpretaba como una tarea pendiente.
- Una única política de cupos sustituye los dos sistemas anteriores. Sin devolución de saldo disponible si falla una consulta; menos ramas y duplicaciones.

Estas son correcciones sobre los sitios señalados por el informe anterior. No son un nuevo conteo de hallazgos ni una medición de reducción de CPU/RAM. Se verifican con integración PostgreSQL aislada, suite general, tipos, compilación y recorridos de navegador.
