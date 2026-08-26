-- Documentos del Redactor guardados en la cuenta (antes solo localStorage del
-- invitado: 3 documentos que se perdian al cambiar de navegador). Ver el modelo
-- RedactorDoc en schema.prisma.
--
-- `content` es el JSON de Tiptap serializado como texto, el MISMO formato que el
-- Redactor guarda en localStorage: la migracion guest -> cuenta es copiar el
-- string tal cual, sin transformarlo.

CREATE TABLE "redactor_docs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT now(),

    CONSTRAINT "redactor_docs_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "redactor_docs_user_id_fkey" FOREIGN KEY ("user_id")
        REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE INDEX "idx_redactor_docs_user" ON "redactor_docs"("user_id");
