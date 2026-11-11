CREATE TABLE pro_subscriptions (
 id UUID PRIMARY KEY, "requestKey" TEXT NOT NULL UNIQUE, "userId" UUID REFERENCES users(id) ON DELETE SET NULL,
 "providerId" TEXT UNIQUE, status TEXT NOT NULL DEFAULT 'creating', amount DECIMAL(14,2) NOT NULL,
 currency TEXT NOT NULL DEFAULT 'ARS', "catalogVersion" TEXT NOT NULL, "checkoutUrl" TEXT,
 "startsAt" TIMESTAMPTZ(6) NOT NULL, "nextPaymentAt" TIMESTAMPTZ(6), "providerUpdatedAt" TIMESTAMPTZ(6),
 "creationAttemptAt" TIMESTAMPTZ(6), "cancelRequestedAt" TIMESTAMPTZ(6), "lastPaymentStatus" TEXT,
 "lastCheckedAt" TIMESTAMPTZ(6), "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMPTZ(6) NOT NULL
);
CREATE INDEX pro_subscriptions_user_created_idx ON pro_subscriptions("userId", "createdAt");
CREATE INDEX pro_subscriptions_status_checked_idx ON pro_subscriptions(status, "lastCheckedAt");
CREATE UNIQUE INDEX pro_subscriptions_one_current_user ON pro_subscriptions("userId") WHERE status <> 'cancelled' AND "userId" IS NOT NULL;
ALTER TABLE billing_orders ADD COLUMN "subscriptionId" UUID REFERENCES pro_subscriptions(id), ADD COLUMN "subscriptionInvoiceId" TEXT UNIQUE,
 ADD COLUMN "periodStart" TIMESTAMPTZ(6), ADD COLUMN "periodEnd" TIMESTAMPTZ(6);
ALTER TABLE entitlement_grants ADD COLUMN "validUntil" TIMESTAMPTZ(6);
ALTER TABLE provider_events ADD COLUMN "resourceType" TEXT NOT NULL DEFAULT 'payment';
ALTER TABLE pro_subscriptions ENABLE ROW LEVEL SECURITY;
