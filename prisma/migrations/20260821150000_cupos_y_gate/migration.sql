-- Cupos mensuales del plan gratuito y estado del modal por usuario.
-- Ver docs/reglas-por-plan.html (§4 cupos, §9 modal) y los modelos DownloadLog
-- y User.gateState en schema.prisma.
--
-- POR QUÉ UN LOG Y NO CONTADORES: el cupo es count(*) del mes calendario.
-- No hay nada que resetear ni que se desincronice; y queda la prueba de qué
-- bajó cada cuenta (sirve para métricas: qué normas se llevan los abogados).

CREATE TABLE "download_log" (
    "id"         UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id"    UUID NOT NULL,
    -- articulo | ley | lector
    "kind"       TEXT NOT NULL,
    -- qué se descargó / analizó (slug de la norma, nº de artículo, nombre de archivo)
    "target"     TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT now(),

    CONSTRAINT "download_log_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "download_log_user_id_fkey" FOREIGN KEY ("user_id")
        REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- La consulta es siempre "cuántos de este tipo hizo este usuario este mes".
CREATE INDEX "idx_download_log_user_kind_created" ON "download_log"("user_id", "kind", "created_at" DESC);

-- Estado del modal "pasate a Pro" de la cuenta gratis: puntaje, apariciones,
-- último cierre. Vive en el servidor para que cambiar de dispositivo no
-- resetee el tope de 3 apariciones en la vida de la cuenta.
ALTER TABLE "users" ADD COLUMN "gate_state" JSONB;
