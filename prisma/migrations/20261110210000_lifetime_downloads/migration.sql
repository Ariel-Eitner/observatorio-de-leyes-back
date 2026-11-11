ALTER TABLE users ADD COLUMN free_downloads_used INTEGER NOT NULL DEFAULT 0;
-- Older logs did not distinguish free from Pro. Preserve historical usage,
-- including older months, capped at the new allowance.
UPDATE users u SET free_downloads_used = LEAST(5, h.used)::integer
FROM (SELECT user_id, count(*) AS used FROM download_log WHERE kind <> 'lector' GROUP BY user_id) h
WHERE u.id = h.user_id;
ALTER TABLE users ADD CONSTRAINT free_downloads_used_nonnegative CHECK (free_downloads_used >= 0);
