-- Existing opt-outs are explicit preferences and must be preserved.
ALTER TABLE notification_preferences ALTER COLUMN marketing SET DEFAULT true;
