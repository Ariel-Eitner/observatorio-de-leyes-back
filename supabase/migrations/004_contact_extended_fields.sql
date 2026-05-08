-- Extend contact_submissions with optional fields collected in the enhanced form
ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS apellido  TEXT,
  ADD COLUMN IF NOT EXISTS telefono  TEXT,
  ADD COLUMN IF NOT EXISTS profesion TEXT;

-- Expand the allowed tipos to match the updated form
-- (no constraint change needed — tipo was TEXT with no CHECK; validation is in the API)
