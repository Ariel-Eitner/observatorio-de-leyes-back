-- Tabla principal de eventos de tracking
create table if not exists tracking_events (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null    default now(),
  type        text        not null,
  session_id  text        not null,
  guest_id    text,
  properties  jsonb,
  context     jsonb
);

create index if not exists idx_te_created_at on tracking_events (created_at desc);
create index if not exists idx_te_type       on tracking_events (type);
create index if not exists idx_te_session    on tracking_events (session_id);
create index if not exists idx_te_guest      on tracking_events (guest_id);
create index if not exists idx_te_type_date  on tracking_events (type, created_at desc);

alter table tracking_events enable row level security;
-- Sin políticas: solo service_role puede leer/escribir

-- Tabla de resumen diario para compactación histórica
create table if not exists tracking_daily_summary (
  date           date primary key,
  sessions       int  not null default 0,
  guests         int  not null default 0,
  page_views     int  not null default 0,
  searches       int  not null default 0,
  zero_searches  int  not null default 0,
  law_views      int  not null default 0,
  art_copies     int  not null default 0,
  amendments     int  not null default 0,
  inline_refs    int  not null default 0,
  contacts_sent  int  not null default 0,
  errors_404     int  not null default 0,
  raw_total      int  not null default 0
);

alter table tracking_daily_summary enable row level security;

-- ── COMPACTACIÓN AUTOMÁTICA VÍA pg_cron ────────────────────────────────────────
-- Habilitar primero: Supabase Dashboard → Database → Extensions → pg_cron
-- Luego ejecutar estas sentencias en SQL Editor:
--
-- Job 1: borrar heartbeats de más de 30 días (mayor volumen, menor valor histórico)
-- SELECT cron.schedule('cleanup-heartbeats', '0 3 * * *',
--   $$DELETE FROM tracking_events
--     WHERE type = 'heartbeat'
--       AND created_at < now() - interval '30 days'$$);
--
-- Job 2: agregar en resumen diario los eventos de más de 90 días, luego borrarlos
-- SELECT cron.schedule('compact-old-events', '0 4 * * 0',
--   $$
--   INSERT INTO tracking_daily_summary (
--     date, sessions, guests, page_views, searches, zero_searches,
--     law_views, art_copies, amendments, inline_refs, contacts_sent, errors_404, raw_total
--   )
--   SELECT
--     created_at::date                                                      AS date,
--     count(*) filter (where type = 'session_start')                        AS sessions,
--     count(distinct guest_id) filter (where guest_id is not null)          AS guests,
--     count(*) filter (where type = 'page_view')                            AS page_views,
--     count(*) filter (where type = 'search_executed')                      AS searches,
--     count(*) filter (where type = 'search_executed'
--       and (properties->>'resultsCount')::int = 0)                         AS zero_searches,
--     count(*) filter (where type = 'law_viewed')                           AS law_views,
--     count(*) filter (where type = 'article_link_copied')                  AS art_copies,
--     count(*) filter (where type = 'article_amendment_opened')             AS amendments,
--     count(*) filter (where type = 'inline_ref_clicked')                   AS inline_refs,
--     count(*) filter (where type = 'contact_form_submitted')               AS contacts_sent,
--     count(*) filter (where type = '404_hit')                              AS errors_404,
--     count(*)                                                               AS raw_total
--   FROM tracking_events
--   WHERE created_at < now() - interval '90 days'
--   GROUP BY created_at::date
--   ON CONFLICT (date) DO UPDATE SET
--     sessions      = tracking_daily_summary.sessions      + EXCLUDED.sessions,
--     guests        = tracking_daily_summary.guests        + EXCLUDED.guests,
--     page_views    = tracking_daily_summary.page_views    + EXCLUDED.page_views,
--     searches      = tracking_daily_summary.searches      + EXCLUDED.searches,
--     zero_searches = tracking_daily_summary.zero_searches + EXCLUDED.zero_searches,
--     law_views     = tracking_daily_summary.law_views     + EXCLUDED.law_views,
--     art_copies    = tracking_daily_summary.art_copies    + EXCLUDED.art_copies,
--     amendments    = tracking_daily_summary.amendments    + EXCLUDED.amendments,
--     inline_refs   = tracking_daily_summary.inline_refs   + EXCLUDED.inline_refs,
--     contacts_sent = tracking_daily_summary.contacts_sent + EXCLUDED.contacts_sent,
--     errors_404    = tracking_daily_summary.errors_404    + EXCLUDED.errors_404,
--     raw_total     = tracking_daily_summary.raw_total     + EXCLUDED.raw_total;
--
--   DELETE FROM tracking_events
--   WHERE created_at < now() - interval '90 days';
--   $$);
