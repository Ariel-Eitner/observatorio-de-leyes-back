import { Module } from '@nestjs/common';
import { LawsController } from './laws.controller';
import { LawsService } from './laws.service';
import { NormsDbModule } from '../norms-db/norms-db.module';

@Module({
  imports: [NormsDbModule],
  controllers: [LawsController],
  providers: [LawsService],
  exports: [LawsService],
})
export class LawsModule {}
