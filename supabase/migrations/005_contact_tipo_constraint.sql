-- Remove the hardcoded CHECK on tipo — validation is handled in the API layer
ALTER TABLE contact_submissions
  DROP CONSTRAINT IF EXISTS contact_submissions_tipo_check;
