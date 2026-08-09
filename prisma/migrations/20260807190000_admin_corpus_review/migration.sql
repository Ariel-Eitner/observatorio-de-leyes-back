-- Checklist de revisión del corpus (la columna extra de /corpus).
-- Ver el modelo AdminCorpusReview en schema.prisma.
--
-- Reemplaza a `corpus-review.json`, que vivía en el disco del proyecto y por eso
-- solo funcionaba en el stack local: en Vercel el filesystem es de solo lectura.
-- Con la anotación en la base, el checklist se puede usar desde producción con
-- la cuenta de admin.

CREATE TABLE "admin_corpus_review" (
    "path" TEXT NOT NULL,
    "items" JSONB NOT NULL DEFAULT '{}',
    "nota" TEXT NOT NULL DEFAULT '',
    "revisada" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_corpus_review_pkey" PRIMARY KEY ("path")
);

-- El único filtro de la pantalla que no es por texto: "solo sin revisar".
CREATE INDEX "idx_admin_corpus_review_revisada" ON "admin_corpus_review"("revisada");
