import { Module } from '@nestjs/common';
import { MilestonesController } from './milestones.controller';
import { MilestonesService } from './milestones.service';
import { EventsModule } from '../events/events.module';

@Module({
  imports:     [EventsModule],
  controllers: [MilestonesController],
  providers:   [MilestonesService],
})
export class AdminModule {}
