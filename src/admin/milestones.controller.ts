import { Controller, Get, UseGuards } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { MilestonesService } from './milestones.service';
import { AdminHeaderGuard } from '../common/guards/admin-header.guard';

@Controller('admin/milestones')
@SkipThrottle()
@UseGuards(AdminHeaderGuard)
export class MilestonesController {
  constructor(private readonly milestones: MilestonesService) {}

  @Get()
  async compute() {
    return this.milestones.compute();
  }
}
