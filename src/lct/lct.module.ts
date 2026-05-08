import { Module } from '@nestjs/common';
import { LctController } from './lct.controller';
import { LctService } from './lct.service';

@Module({
  controllers: [LctController],
  providers: [LctService],
})
export class LctModule {}
