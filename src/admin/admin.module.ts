import { Module } from '@nestjs/common';
import { MilestonesController } from './milestones.controller';
import { MilestonesService } from './milestones.service';
import { BenefitsController } from './benefits.controller';
import { BenefitsService } from './benefits.service';
import { EventsModule } from '../events/events.module';

@Module({
  imports:     [EventsModule],
  controllers: [MilestonesController, BenefitsController],
  providers:   [MilestonesService, BenefitsService],
})
export class AdminModule {}
