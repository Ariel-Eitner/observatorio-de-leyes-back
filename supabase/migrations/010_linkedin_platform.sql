-- Agrega campo hashtags a post_drafts para LinkedIn
ALTER TABLE post_drafts ADD COLUMN IF NOT EXISTS hashtags TEXT NOT NULL DEFAULT '';
