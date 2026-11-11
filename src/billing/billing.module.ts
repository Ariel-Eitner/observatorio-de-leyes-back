import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { BillingService } from "./billing.service";
import { PaymentProvider } from "./provider";
import { SubscriptionsService } from "./subscriptions.service";
import {
  BillingController,
  BillingWebhookController,
} from "./billing.controller";

@Module({
  imports: [JwtModule.register({})],
  controllers: [BillingController, BillingWebhookController],
  providers: [BillingService, PaymentProvider, SubscriptionsService],
  exports: [BillingService, SubscriptionsService],
})
export class BillingModule {}
