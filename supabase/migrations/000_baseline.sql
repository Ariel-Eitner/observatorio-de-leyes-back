-- ─────────────────────────────────────────────────────────────────────────────
-- BASELINE — estado completo del schema al 2026-05-08
-- Solo usar para entornos nuevos (staging, local dev).
-- Producción ya tiene este schema aplicado vía migraciones 001–009.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── contact_submissions ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL    DEFAULT now(),
  nombre       TEXT        NOT NULL,
  email        TEXT        NOT NULL,
  tipo         TEXT        NOT NULL,
  mensaje      TEXT        NOT NULL,
  user_agent   TEXT,
  is_read      BOOLEAN     NOT NULL    DEFAULT false,
  apellido     TEXT,
  telefono     TEXT,
  profesion    TEXT,
  utm_source   TEXT,
  utm_medium   TEXT,
  utm_campaign TEXT,
  utm_content  TEXT,
  utm_term     TEXT
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- ── founders ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS founders (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL    DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL    DEFAULT now(),
  nombre       TEXT        NOT NULL,
  email        TEXT        NOT NULL    UNIQUE,
  canal        TEXT,
  confirmed_at TIMESTAMPTZ,
  utm_source   TEXT,
  utm_medium   TEXT,
  utm_campaign TEXT,
  utm_content  TEXT,
  utm_term     TEXT
);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER founders_updated_at
  BEFORE UPDATE ON founders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE founders ENABLE ROW LEVEL SECURITY;

-- ── tracking_events ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tracking_events (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL    DEFAULT now(),
  type       TEXT        NOT NULL,
  session_id TEXT        NOT NULL,
  guest_id   TEXT,
  properties JSONB,
  context    JSONB
);

CREATE INDEX IF NOT EXISTS idx_te_created_at ON tracking_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_te_type       ON tracking_events (type);
CREATE INDEX IF NOT EXISTS idx_te_session    ON tracking_events (session_id);
CREATE INDEX IF NOT EXISTS idx_te_guest      ON tracking_events (guest_id);
CREATE INDEX IF NOT EXISTS idx_te_type_date  ON tracking_events (type, created_at DESC);

ALTER TABLE tracking_events ENABLE ROW LEVEL SECURITY;

-- ── tracking_daily_summary ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tracking_daily_summary (
  date          DATE PRIMARY KEY,
  sessions      INT  NOT NULL DEFAULT 0,
  guests        INT  NOT NULL DEFAULT 0,
  page_views    INT  NOT NULL DEFAULT 0,
  searches      INT  NOT NULL DEFAULT 0,
  zero_searches INT  NOT NULL DEFAULT 0,
  law_views     INT  NOT NULL DEFAULT 0,
  art_copies    INT  NOT NULL DEFAULT 0,
  amendments    INT  NOT NULL DEFAULT 0,
  inline_refs   INT  NOT NULL DEFAULT 0,
  contacts_sent INT  NOT NULL DEFAULT 0,
  errors_404    INT  NOT NULL DEFAULT 0,
  raw_total     INT  NOT NULL DEFAULT 0
);

ALTER TABLE tracking_daily_summary ENABLE ROW LEVEL SECURITY;

-- ── post_drafts ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS post_drafts (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  platform       TEXT        NOT NULL DEFAULT 'twitter',
  post_text      TEXT        NOT NULL,
  comment_text   TEXT        NOT NULL,
  law_id         TEXT        NOT NULL,
  law_title      TEXT        NOT NULL,
  article_number TEXT        NOT NULL,
  utm_content    TEXT        NOT NULL,
  template_used  TEXT        NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_post_drafts_platform ON post_drafts (platform, created_at DESC);

ALTER TABLE post_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "no_public_access_post_drafts"
  ON post_drafts FOR ALL TO anon, authenticated USING (false);

-- ── posted_law_history ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS posted_law_history (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  law_id         TEXT        NOT NULL,
  article_number TEXT        NOT NULL,
  platform       TEXT        NOT NULL DEFAULT 'twitter',
  posted_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_posted_history_lookup ON posted_law_history (law_id, article_number, platform);

ALTER TABLE posted_law_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "no_public_access_posted_history"
  ON posted_law_history FOR ALL TO anon, authenticated USING (false);
