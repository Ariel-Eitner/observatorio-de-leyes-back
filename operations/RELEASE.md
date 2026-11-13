# Preparar y verificar entregas

La versión compartida vive en los paquetes de backend y frontend. Se mantienen copias de `operations/release.cjs` y su prueba en ambos repositorios para poder verificar cada checkout y cada imagen sin depender del otro repositorio.

Desde cualquiera de los dos repositorios:

```powershell
npm run release:check
npm run release:check:workspace
npm run release:test
# Crear un archivo UTF-8 con notas reales, una viñeta '- ' por cambio.
npm run release:prepare -- patch C:\ruta\notas.md
# También admite minor, major o una versión explícita superior.
```

`prepare` requiere ambos repositorios hermanos. Valida la entrega anterior, prepara todas las escrituras y actualiza los dos paquetes, las dos versiones de cada lockfile, cabeceras de changelog, defaults de Docker y Compose mantenido y local. Conserva la historia y usa fecha de Argentina. Si falla una escritura o la validación final, intenta restaurar los contenidos originales. Revisar los diffs antes de publicar; el comando no hace commit, push ni despliegue.

Las notas son obligatorias: no se inventa automáticamente qué cambió. Si alguien ya modificó versiones a mano y dejó inconsistencias, `check` identifica el archivo y bloquea la construcción; corregir ese cambio o restablecer la coherencia antes de preparar la entrega. No descartar notas históricas para hacer pasar el control.

`npm run build` ejecuta la validación como `prebuild`. El Docker del backend copia explícitamente los metadatos y el validador al builder; el frontend ya copia el contexto. Ambos runners conservan su verificación de `APP_VERSION`: un argumento explícito incorrecto continúa siendo un error. El wrapper `npm run docker:local -- build backend frontend` valida ambos repositorios antes de construir.

Los workflows `release.yml` validan cada repositorio sin secretos ni instalación de dependencias, ejecutan las pruebas del preparador y comparan con el SHA anterior/base del PR para rechazar cambios sin una versión superior. Se retiró `.github/` del ignore del backend: los workflows tienen que entrar en Git. Configurar este check como requerido en las reglas de la rama y conectar el despliegue al resultado de CI para bloquear también publicaciones remotas; esos ajustes externos no se hicieron desde esta sesión. Un build por sí solo verifica coherencia, no puede saber si una versión ya se publicó. Docker puede reutilizar etiquetas: para trazabilidad adicional conviene publicar imágenes con SHA de commit y desplegar por digest.

La raíz local no es un repositorio. Los cambios allí no viajarán con un push de frontend/backend; la configuración mantenida es `backend/operations/compose.local.yml`.
