import { Module } from '@nestjs/common';
import { NormsDbService } from './norms-db.service';

@Module({
  providers: [NormsDbService],
  exports: [NormsDbService],
})
export class NormsDbModule {}
