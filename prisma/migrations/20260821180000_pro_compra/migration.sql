-- Compra de Pro (docs/reglas-por-plan.html, decisión del 21-ago-2026):
-- Pro mensual a precio normal y "Pro Fundador" anual a precio promocional
-- congelado mientras se renueve por ese monto. El apoyo (/apoya) pasa a ser
-- mecenazgo sin producto.
--
-- `pagos.user_id`: el Pro se compra CON SESIÓN y se acredita a esa cuenta por
-- id, no por email. Cruzar por email era explotable (no hay verificación de
-- email: cualquiera que conociera el email de un pagador podía llevarse el
-- plan); por eso el beneficio de Fundador era manual. Con el id no hace falta.
ALTER TABLE "pagos" ADD COLUMN "user_id" UUID;
ALTER TABLE "pagos" ADD COLUMN "producto" TEXT;
CREATE INDEX "idx_pagos_user" ON "pagos"("user_id");

-- Precio anual congelado: el monto que pagó por el año; mientras renueve por
-- ese monto, no se le aplica el aumento.
ALTER TABLE "users" ADD COLUMN "pro_precio_congelado" INTEGER;
