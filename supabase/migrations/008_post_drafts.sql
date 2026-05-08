-- Borradores de posts para redes sociales
CREATE TABLE post_drafts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  platform     TEXT NOT NULL DEFAULT 'twitter',
  post_text    TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  law_id       TEXT NOT NULL,
  law_title    TEXT NOT NULL,
  article_number TEXT NOT NULL,
  utm_content  TEXT NOT NULL,
  template_used TEXT NOT NULL
);

-- Historial de lo ya publicado (evita repetir ley+artículo en 90 días)
CREATE TABLE posted_law_history (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  law_id         TEXT NOT NULL,
  article_number TEXT NOT NULL,
  platform       TEXT NOT NULL DEFAULT 'twitter',
  posted_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_post_drafts_platform     ON post_drafts (platform, created_at DESC);
CREATE INDEX idx_posted_history_lookup    ON posted_law_history (law_id, article_number, platform);
