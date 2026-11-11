-- CreateTable
CREATE TABLE "billing_orders" (
    "id" UUID NOT NULL,
    "requestKey" TEXT NOT NULL,
    "userId" UUID,
    "kind" TEXT NOT NULL,
    "product" TEXT,
    "amount" DECIMAL(14,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'ARS',
    "months" INTEGER NOT NULL DEFAULT 0,
    "frozen" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "contactEmail" TEXT,
    "contactName" TEXT,
    "accessHash" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'pending',
    "preferenceId" TEXT,
    "attemptKey" TEXT,
    "attemptState" TEXT,
    "preferenceUrl" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "billing_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billing_payments" (
    "providerId" TEXT NOT NULL,
    "orderId" UUID NOT NULL,
    "status" TEXT NOT NULL,
    "amount" DECIMAL(14,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "providerUpdatedAt" TIMESTAMPTZ(6) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "billing_payments_pkey" PRIMARY KEY ("providerId")
);

-- CreateTable
CREATE TABLE "billing_baselines" (
    "userId" UUID NOT NULL,
    "plan" TEXT NOT NULL,
    "until" TIMESTAMPTZ(6),
    "anchorDay" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "billing_baselines_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "entitlement_grants" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "userId" UUID,
    "providerId" TEXT NOT NULL,
    "months" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "grantedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entitlement_grants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider_events" (
    "id" UUID NOT NULL,
    "eventKey" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "nextAttemptAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leaseUntil" TIMESTAMPTZ(6),
    "processedAt" TIMESTAMPTZ(6),
    "error" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "provider_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domain_events" (
    "id" UUID NOT NULL,
    "eventKey" TEXT NOT NULL,
    "userId" UUID,
    "topic" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "processedAt" TIMESTAMPTZ(6),
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "nextAttemptAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "error" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "domain_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_campaigns" (
    "id" UUID NOT NULL,
    "requestKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "actionPath" TEXT,
    "category" TEXT NOT NULL DEFAULT 'product',
    "state" TEXT NOT NULL DEFAULT 'draft',
    "cutoffAt" TIMESTAMPTZ(6),
    "publishedAt" TIMESTAMPTZ(6),
    "expiresAt" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_notifications" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "campaignId" UUID,
    "eventKey" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "actionPath" TEXT,
    "readAt" TIMESTAMPTZ(6),
    "firstOpenedAt" TIMESTAMPTZ(6),
    "archivedAt" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_preferences" (
    "userId" UUID NOT NULL,
    "product" BOOLEAN NOT NULL DEFAULT true,
    "marketing" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "notification_preferences_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "product_feedback" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "campaignId" UUID NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "product_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "billing_orders_requestKey_key" ON "billing_orders"("requestKey");

-- CreateIndex
CREATE INDEX "billing_orders_userId_createdAt_idx" ON "billing_orders"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "billing_payments_orderId_idx" ON "billing_payments"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "entitlement_grants_orderId_key" ON "entitlement_grants"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "entitlement_grants_providerId_key" ON "entitlement_grants"("providerId");

-- CreateIndex
CREATE INDEX "entitlement_grants_userId_grantedAt_idx" ON "entitlement_grants"("userId", "grantedAt");

-- CreateIndex
CREATE UNIQUE INDEX "provider_events_eventKey_key" ON "provider_events"("eventKey");

-- CreateIndex
CREATE INDEX "provider_events_processedAt_nextAttemptAt_idx" ON "provider_events"("processedAt", "nextAttemptAt");

-- CreateIndex
CREATE UNIQUE INDEX "domain_events_eventKey_key" ON "domain_events"("eventKey");

-- CreateIndex
CREATE INDEX "domain_events_processedAt_nextAttemptAt_idx" ON "domain_events"("processedAt", "nextAttemptAt");

-- CreateIndex
CREATE UNIQUE INDEX "notification_campaigns_requestKey_key" ON "notification_campaigns"("requestKey");

-- CreateIndex
CREATE UNIQUE INDEX "user_notifications_eventKey_key" ON "user_notifications"("eventKey");

-- CreateIndex
CREATE INDEX "user_notifications_userId_createdAt_id_idx" ON "user_notifications"("userId", "createdAt", "id");

-- CreateIndex
CREATE UNIQUE INDEX "user_notifications_campaignId_userId_key" ON "user_notifications"("campaignId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "product_feedback_userId_campaignId_key" ON "product_feedback"("userId", "campaignId");

-- AddForeignKey
ALTER TABLE "billing_orders" ADD CONSTRAINT "billing_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_payments" ADD CONSTRAINT "billing_payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "billing_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_baselines" ADD CONSTRAINT "billing_baselines_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entitlement_grants" ADD CONSTRAINT "entitlement_grants_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "billing_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entitlement_grants" ADD CONSTRAINT "entitlement_grants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_notifications" ADD CONSTRAINT "user_notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_notifications" ADD CONSTRAINT "user_notifications_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "notification_campaigns"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_preferences" ADD CONSTRAINT "notification_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_feedback" ADD CONSTRAINT "product_feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_feedback" ADD CONSTRAINT "product_feedback_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "notification_campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Same RLS convention as existing private tables: no anonymous policies.
ALTER TABLE "billing_orders" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "billing_payments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "billing_baselines" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "entitlement_grants" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "provider_events" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "domain_events" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "notification_campaigns" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "user_notifications" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "notification_preferences" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "product_feedback" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "billing_orders" ADD CONSTRAINT "billing_positive_amount" CHECK ("amount" > 0 AND "months" >= 0);
ALTER TABLE "product_feedback" ADD CONSTRAINT "feedback_score_range" CHECK ("score" BETWEEN 1 AND 5);
CREATE INDEX "notification_unread_user_idx" ON "user_notifications"("userId", "createdAt") WHERE "readAt" IS NULL AND "archivedAt" IS NULL;
