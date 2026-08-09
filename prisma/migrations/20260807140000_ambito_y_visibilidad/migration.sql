-- Ámbito subnacional y visibilidad de las normas.
--
-- scope_slug: QUÉ jurisdicción, no de qué nivel (eso ya lo dice `jurisdiction`).
--   Hasta ahora la provincia se deducía en el FRONTEND con un regex sobre el id
--   (`^ley-([a-z-]+)-\d+$`), que no matchea decretos ni resoluciones y sobre el
--   que no se puede filtrar ni facetar. Con 24 provincias, CABA y municipios,
--   además, los números se repiten: el decreto 45/2026 existe en varias
--   jurisdicciones a la vez.
--
-- visibility: si la norma SE MUESTRA. Es distinto de `status`, que dice si RIGE.
--   PUBLICA = como siempre. ENLACE = cargada y accesible por URL directa, pero
--   fuera del sitemap, del listado, del buscador, del grafo y de las stats.
--   Sirve para demos y para revisar una tanda grande antes de publicarla.

ALTER TABLE "norms" ADD COLUMN "scope_slug" TEXT;
ALTER TABLE "norms" ADD COLUMN "visibility" TEXT NOT NULL DEFAULT 'PUBLICA';

-- El índice de visibilidad es parcial: el 99% de las filas son PUBLICA, así que
-- indexar solo las ocultas deja un índice diminuto y sirve igual para excluirlas.
CREATE INDEX "idx_norms_scope" ON "norms"("scope_slug");
CREATE INDEX "idx_norms_visibility" ON "norms"("visibility") WHERE "visibility" <> 'PUBLICA';

-- ── Backfill de lo que ya está cargado ──────────────────────────────────────
-- Constituciones provinciales: el ámbito ya vive en el id (`const-catamarca`).
UPDATE "norms"
   SET "scope_slug" = substring("id" from 7)
 WHERE "id" LIKE 'const-%'
   AND "id" <> 'constitucion-nacional';

-- Las dos normas subnacionales sueltas del corpus.
UPDATE "norms" SET "scope_slug" = 'caba'         WHERE "id" = 'ley-caba-6961';
UPDATE "norms" SET "scope_slug" = 'buenos-aires' WHERE "id" = 'decreto-ley-6769-1958';
