ALTER TABLE users ADD COLUMN trashed_at timestamptz, ADD COLUMN purge_at timestamptz, ADD COLUMN status_before_trash text;
CREATE INDEX users_purge_at_idx ON users(purge_at) WHERE status='trashed';
ALTER TABLE billing_orders ADD COLUMN "catalogVersion" text NOT NULL DEFAULT 'legacy', ADD COLUMN "downloadQuantity" integer NOT NULL DEFAULT 0, ADD COLUMN conditions jsonb NOT NULL DEFAULT '{}';
CREATE TABLE download_credits (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), "orderId" uuid NOT NULL UNIQUE REFERENCES billing_orders(id),
 "userId" uuid REFERENCES users(id) ON DELETE SET NULL, "providerId" text NOT NULL UNIQUE,
 quantity integer NOT NULL CHECK(quantity>0), remaining integer NOT NULL CHECK(remaining>=0 AND remaining<=quantity),
 "expiresAt" timestamptz NOT NULL, "revokedAt" timestamptz, "createdAt" timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX "download_credits_userId_expiresAt_idx" ON download_credits("userId","expiresAt");
CREATE TABLE law_download_access (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), "userId" uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 "normId" text NOT NULL REFERENCES norms(id) ON DELETE CASCADE, source text NOT NULL,
 "creditId" uuid REFERENCES download_credits(id) ON DELETE SET NULL,
 "expiresAt" timestamptz NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT now(),
 UNIQUE("userId","normId")
);
ALTER TABLE download_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE law_download_access ENABLE ROW LEVEL SECURITY;
-- Respetar autorizaciones históricas con una ley identificable durante su ventana original.
INSERT INTO law_download_access("userId","normId",source,"expiresAt","createdAt")
SELECT l.user_id,split_part(l.target,'#',1),'historical',max(l.created_at)+interval '30 days',max(l.created_at)
FROM download_log l JOIN norms n ON n.id=split_part(l.target,'#',1)
WHERE l.kind IN ('ley','articulo') AND l.created_at>now()-interval '30 days'
GROUP BY l.user_id,split_part(l.target,'#',1)
ON CONFLICT("userId","normId") DO NOTHING;
