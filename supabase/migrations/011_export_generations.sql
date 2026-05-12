-- Export generations: tracks PDF/Word exports per guest to enforce free tier limit (5 per type)
CREATE TABLE IF NOT EXISTS export_generations (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id   TEXT        NOT NULL,
  type       TEXT        NOT NULL CHECK (type IN ('pdf', 'docx')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS export_generations_guest_type_idx
  ON export_generations (guest_id, type);
