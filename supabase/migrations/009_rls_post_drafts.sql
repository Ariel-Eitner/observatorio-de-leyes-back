-- RLS para post_drafts y posted_law_history
-- Solo el backend (service_role) puede leer/escribir; ningún usuario anónimo tiene acceso.

ALTER TABLE post_drafts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE posted_law_history ENABLE ROW LEVEL SECURITY;

-- service_role bypasses RLS por diseño en Supabase, así que no hace falta política explícita.
-- Bloqueamos todo acceso desde roles no privilegiados (anon, authenticated).

CREATE POLICY "no_public_access_post_drafts"
  ON post_drafts
  FOR ALL
  TO anon, authenticated
  USING (false);

CREATE POLICY "no_public_access_posted_history"
  ON posted_law_history
  FOR ALL
  TO anon, authenticated
  USING (false);
