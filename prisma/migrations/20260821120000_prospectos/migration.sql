-- Prospección comercial (/admin/prospectos): la tabla de gente y organizaciones
-- a las que SALIMOS a buscar (abogados, estudios, áreas legales de empresas,
-- universidades, organismos). Es distinta de `leads`, que son los que ENTRARON
-- solos por un formulario. Cuando un prospecto deja datos en el sitio o abre
-- cuenta se cruza por email (columnas lead_id / user_id, sin FK a propósito:
-- son punteros blandos que no tienen que impedir borrar del otro lado).
--
-- Base legal del tratamiento (ley 25.326): datos de contacto profesional
-- tomados de fuentes de acceso público (art. 5 inc. 2) con fines de marketing
-- directo (art. 27). `origen_dato` registra DE DÓNDE salió cada fila y
-- `opt_out` el pedido de retiro (art. 27 inc. 3), que es obligatorio atender.
-- Ver el modelo Prospecto en schema.prisma.

CREATE TABLE "prospectos" (
    "id"                 UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre"             TEXT NOT NULL,
    "organizacion"       TEXT,
    "tipo"               TEXT NOT NULL DEFAULT 'abogado',
    "segmento"           TEXT,
    "email"              TEXT,
    "telefono"           TEXT,
    "linkedin"           TEXT,
    "web"                TEXT,
    "ciudad"             TEXT,
    "provincia"          TEXT,
    "fuente"             TEXT NOT NULL DEFAULT 'manual',
    "origen_dato"        TEXT,
    "etapa"              TEXT NOT NULL DEFAULT 'nuevo',
    "prioridad"          SMALLINT NOT NULL DEFAULT 2,
    "canal"              TEXT,
    "proximo_paso"       TEXT,
    "proximo_at"         TIMESTAMPTZ(6),
    "ultimo_contacto_at" TIMESTAMPTZ(6),
    "toques"             INTEGER NOT NULL DEFAULT 0,
    "notas"              TEXT,
    "opt_out"            BOOLEAN NOT NULL DEFAULT false,
    "opt_out_at"         TIMESTAMPTZ(6),
    "lead_id"            UUID,
    "user_id"            UUID,
    "created_at"         TIMESTAMPTZ(6) NOT NULL DEFAULT now(),
    "updated_at"         TIMESTAMPTZ(6) NOT NULL DEFAULT now(),

    CONSTRAINT "prospectos_pkey" PRIMARY KEY ("id")
);

-- Un email identifica a una persona: el importador deduplica por acá.
CREATE UNIQUE INDEX "prospectos_email_key" ON "prospectos"("email") WHERE "email" IS NOT NULL;
-- "Qué hago hoy": pendientes ordenados por próxima acción.
CREATE INDEX "idx_prospectos_etapa_proximo" ON "prospectos"("etapa", "proximo_at");
CREATE INDEX "idx_prospectos_provincia" ON "prospectos"("provincia");
CREATE INDEX "idx_prospectos_tipo" ON "prospectos"("tipo");

-- Bitácora por prospecto: cada toque (email, LinkedIn, llamada, reunión), cada
-- cambio de etapa y cada nota. Sin esto no se sabe qué se le dijo a quién.
CREATE TABLE "prospecto_eventos" (
    "id"           UUID NOT NULL DEFAULT gen_random_uuid(),
    "prospecto_id" UUID NOT NULL,
    "tipo"         TEXT NOT NULL,
    "detalle"      TEXT,
    "created_at"   TIMESTAMPTZ(6) NOT NULL DEFAULT now(),

    CONSTRAINT "prospecto_eventos_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "prospecto_eventos_prospecto_id_fkey" FOREIGN KEY ("prospecto_id")
        REFERENCES "prospectos"("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE INDEX "idx_prospecto_eventos_prospecto" ON "prospecto_eventos"("prospecto_id", "created_at" DESC);
