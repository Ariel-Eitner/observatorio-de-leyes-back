import { Module } from '@nestjs/common';
import { BillingModule } from '../billing/billing.module';
import { BenefitsController } from './benefits.controller';
import { BenefitsService } from './benefits.service';

@Module({
  imports: [BillingModule],
  controllers: [BenefitsController],
  providers: [BenefitsService],
})
export class AdminModule {}
