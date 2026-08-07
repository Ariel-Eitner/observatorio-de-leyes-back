-- Policies de RLS que SOLO tienen sentido dentro de Supabase.
--
-- Referencian los roles `authenticated` y `anon`, que los crea Supabase y no
-- existen en un Postgres comun. Por eso no van en el baseline: al restaurar en
-- local tiraban `ERROR: role "authenticated" does not exist` — inofensivo, pero
-- ensuciaba el log del restore y hacia dificil ver los errores que SI importan.
--
-- El `ENABLE ROW LEVEL SECURITY` de cada tabla si esta en el baseline: es
-- estandar de Postgres y funciona igual en local (sin policies, solo el dueño de
-- la tabla lee y escribe, que es exactamente lo que queremos).
--
-- Aplicar SOLO contra Supabase, y solo si se reconstruye el proyecto desde cero:
--   .\.claude\skills\cargar-ley\tools\q.ps1 -Target prod -File .\prisma\supabase-only\rls.sql -Force
--
-- Capturado del backup de produccion del 6-ago-2026.

CREATE POLICY no_public_access_post_drafts ON public.post_drafts TO authenticated, anon USING (false);

CREATE POLICY no_public_access_posted_history ON public.posted_law_history TO authenticated, anon USING (false);
