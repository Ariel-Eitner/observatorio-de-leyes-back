import { Module } from '@nestjs/common';
import { SegmentsController } from './segments.controller';
import { SegmentsService } from './segments.service';
import { LawsModule } from '../laws/laws.module';
import { NormsDbModule } from '../norms-db/norms-db.module';

@Module({
  imports: [LawsModule, NormsDbModule],
  controllers: [SegmentsController],
  providers: [SegmentsService],
  exports: [SegmentsService],
})
export class SegmentsModule {}
