-- Anotador de pendientes del panel (/admin/tareas).
-- Ver el modelo AdminTask en schema.prisma: a propósito es solo texto + hecha.

CREATE TABLE "admin_tasks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "texto" TEXT NOT NULL,
    "hecha" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hecha_at" TIMESTAMPTZ(6),

    CONSTRAINT "admin_tasks_pkey" PRIMARY KEY ("id")
);

-- Las pendientes primero y las más nuevas arriba: es el único orden que usa la pantalla.
CREATE INDEX "idx_admin_tasks_hecha" ON "admin_tasks"("hecha", "created_at" DESC);
