-- RLS en las tablas de la tanda de agosto de 2026.
--
-- La convención de este proyecto es que toda tabla nueva sale con Row Level
-- Security habilitado y SIN políticas: así solo `service_role` (y el rol
-- `postgres` del backend, que tiene BYPASSRLS) puede leer o escribir, y una
-- credencial `anon` filtrada no alcanza para sacar nada. Medido en producción
-- el 26-ago-2026: 38 de 45 tablas ya estaban así.
--
-- Las cuatro de acá guardan datos personales o de negocio:
--   · redactor_docs      — documentos privados de cada cuenta
--   · download_log       — qué bajó cada usuario y cuándo
--   · prospectos         — datos de contacto profesional (ley 25.326)
--   · prospecto_eventos  — la bitácora de qué se le dijo a cada prospecto
-- admin_tasks va igual por prolijidad: es del panel y nunca se sirve al público.

ALTER TABLE "redactor_docs"     ENABLE ROW LEVEL SECURITY;
ALTER TABLE "download_log"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE "prospectos"        ENABLE ROW LEVEL SECURITY;
ALTER TABLE "prospecto_eventos" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "admin_tasks"       ENABLE ROW LEVEL SECURITY;
