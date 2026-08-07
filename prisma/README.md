# El esquema de la base

`schema.prisma` es el modelo de datos; `migrations/` es el DDL que se aplica.
Desde el 6-ago-2026 los dos coinciden con producción y están versionados.

## Cómo armar una base local

```powershell
.\db-local.ps1              # crea el esquema (43 tablas) — vacía
.\scripts\restore-local.ps1 # opcional: la llena con una copia de producción
```

`db-local.ps1` corre `prisma migrate deploy`, que aplica `migrations/` en orden.

## El baseline

`migrations/00000000000000_baseline/migration.sql` **no está escrito a mano**: sale de
`pg_dump --schema-only` sobre un backup real de producción (PostgreSQL 17.6). Son 43 tablas,
57 índices, 8 funciones y 1 trigger.

Existe porque hasta entonces el esquema no estaba versionado en ningún lado: `schema.prisma`
conocía 31 de las 43 tablas, y `supabase/migrations/` cubre solo la era pre-corpus (no crea
`norms` ni `articles`). El DDL de las columnas `search`, de las funciones inmutables y de las
RPC del panel vivía únicamente dentro de Supabase. Si esa base se perdía, no había con qué
reconstruirla.

## Trampa 1 — `migrate dev` genera un `DROP DEFAULT` que rompe la migración

`norms.search` y `articles.search` son columnas `GENERATED ALWAYS ... STORED`. Prisma no
soporta columnas generadas, así que las ve como un `DEFAULT` que "sobra" y **toda** migración
nueva va a incluir:

```sql
ALTER TABLE "articles" ALTER COLUMN "search" DROP DEFAULT;
ALTER TABLE "norms" ALTER COLUMN "search" DROP DEFAULT;
```

Postgres lo rechaza:

```
ERROR: column "search" of relation "articles" is a generated column
HINT:  Use ALTER TABLE ... ALTER COLUMN ... DROP EXPRESSION instead.
```

La migración **falla y se detiene ahí**. No destruye nada (la columna generada sigue intacta),
pero deja la migración a medias.

**Qué hacer:** usar siempre `prisma migrate dev --create-only`, abrir el `.sql` generado,
borrar esas dos líneas, y recién ahí aplicar. Es el precio de tener columnas generadas; no
hay forma de que Prisma las ignore.

Por lo mismo, `prisma migrate diff` contra este esquema nunca da vacío: siempre muestra esos
dos `DROP DEFAULT`. Eso es **el diff limpio** — cualquier otra cosa que aparezca sí es drift.

## Trampa 2 — la extensión `unaccent` no es opcional

`search` llama a `immutable_unaccent`, que llama a `unaccent`. Si la extensión no existe en el
destino, el `COPY` de `norms` y `articles` falla al restaurar y **esas dos tablas quedan
vacías**, mientras las otras 41 cargan bien. El restore parece exitoso y no lo es, porque el
error real queda sepultado entre errores de foreign key en cascada que apuntan a otro lado.

El baseline crea `unaccent`, `pg_trgm` y `pgcrypto` antes que nada. Si escribís un script que
restaure por fuera, replicá ese orden.

## Trampa 3 — no confíes en un DDL "deducido"

Hasta el 6-ago-2026 las columnas `search` las recreaba `prisma/local/03-search.sql`, un
archivo que se declaraba a sí mismo una "RECONSTRUCCIÓN no verificada". Al poder compararlo
contra un backup real resultó que no coincidía:

| | El archivo deducido | Producción real |
|---|---|---|
| `articles` | A=título, B=**cuerpo**, C=explicación | A=número+título, B=keywords, C=explicación, D=**cuerpo** |
| `norms` | A=título+nombre, B=sigla+alias, C=resumen, D=temas | A=número+título+nombre, B=keywords, C=temas+resumen, D=executive_summary+objective+problem_it_solves |
| función | `immutable_array_to_string()` | `immutable_join()` — la otra **no existe en prod** |

La búsqueda local rankeaba distinto que la de producción y nada lo delataba. Ese archivo se
eliminó junto con `01-bootstrap.sql` y `02-pre-push.sql`: el baseline los cubre a los tres.

Para verificar que el local sigue igual a producción:

```sql
SELECT a.attrelid::regclass, md5(pg_get_expr(d.adbin, d.adrelid))
  FROM pg_attrdef d
  JOIN pg_attribute a ON a.attrelid = d.adrelid AND a.attnum = d.adnum
 WHERE a.attname = 'search';
```

Los hashes de local y prod tienen que ser idénticos.

## Otras carpetas

- **`supabase-only/rls.sql`** — las 2 policies que referencian los roles `authenticated` y
  `anon`. Solo aplican dentro de Supabase; fuera de ahí tiran `role does not exist`. Por eso
  no están en el baseline.
- **`migrations_manual/add_categories.sql`** — no crea la tabla `categories` (eso lo hace el
  baseline): agrega una columna y corre un `UPDATE` sobre normas ya existentes. Solo tiene
  sentido con corpus cargado.
- **`../supabase/migrations/`** — las 12 migraciones históricas (2026-05, era pre-corpus).
  Quedan como registro; el baseline ya incluye todo lo que hacían.
