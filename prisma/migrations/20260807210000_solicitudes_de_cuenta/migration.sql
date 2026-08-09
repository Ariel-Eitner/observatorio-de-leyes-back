-- Solicitudes de cuenta: recuperar contraseña, borrar la cuenta y exportar los datos.
-- Ver el modelo AccountRequest en schema.prisma.
--
-- POR QUÉ EXISTE: no hay proveedor de email, así que el "olvidé mi contraseña"
-- clásico (link mágico al correo) no se puede hacer. El reemplazo es un flujo de
-- dos niveles, igual al que ya se usa para los pagos: la persona pide el reset y
-- deja un canal de contacto, el admin lo aprueba a mano y el sistema emite un
-- código de un solo uso que se entrega por fuera del sitio.
--
-- La misma tabla es el REGISTRO DE CUMPLIMIENTO de la Ley 25.326: deja asentado
-- quién pidió qué, cuándo, y cuándo se resolvió. Por eso `user_id` es ON DELETE
-- SET NULL y no CASCADE — la prueba de que se atendió un pedido de supresión
-- tiene que sobrevivir al borrado de la cuenta que la originó. La identidad se
-- conserva ahí como `email_hash` (sha256), que ya no es un dato personal legible
-- pero permite reconocer al mismo titular si vuelve a escribir.

CREATE TABLE "account_requests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    -- password_reset | account_deletion | data_export
    "type" TEXT NOT NULL,
    -- Null cuando el pedido no matchea ninguna cuenta (se registra igual: ver
    -- abajo) o cuando la cuenta se borró después.
    "user_id" UUID,
    -- Se vacía al resolver un borrado; `email_hash` queda como prueba.
    "email" TEXT,
    "email_hash" TEXT,
    -- Por dónde contactar a la persona: sin email transaccional, este es el
    -- único canal para hacerle llegar el código.
    "contacto" TEXT,
    -- pendiente | aprobado | rechazado | resuelto | vencido
    "status" TEXT NOT NULL DEFAULT 'pendiente',
    -- sha256 del código de un solo uso. Nunca se guarda el código en claro: se
    -- muestra una única vez al admin en el momento de aprobar.
    "token_hash" TEXT,
    "token_expires_at" TIMESTAMPTZ(6),
    "token_used_at" TIMESTAMPTZ(6),
    "nota_admin" TEXT,
    "ip" TEXT,
    "user_agent" TEXT,
    -- Qué se hizo exactamente (tablas tocadas y filas afectadas en un borrado).
    -- Es la parte del registro que prueba el ALCANCE de lo que se suprimió.
    "detalle" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMPTZ(6),

    CONSTRAINT "account_requests_pkey" PRIMARY KEY ("id")
);

-- Un código no se puede repetir jamás, ni siquiera entre solicitudes distintas.
CREATE UNIQUE INDEX "account_requests_token_hash_key" ON "account_requests"("token_hash");

-- La cola del admin: pendientes primero, y el historial por fecha.
CREATE INDEX "idx_account_requests_status" ON "account_requests"("status");
CREATE INDEX "idx_account_requests_created" ON "account_requests"("created_at" DESC);
CREATE INDEX "idx_account_requests_user" ON "account_requests"("user_id");
-- Para reconocer al mismo titular después de que su cuenta se borró.
CREATE INDEX "idx_account_requests_email_hash" ON "account_requests"("email_hash");

-- SET NULL, no CASCADE: ver el comentario del encabezado.
ALTER TABLE "account_requests"
  ADD CONSTRAINT "account_requests_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
