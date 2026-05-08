import { Module } from '@nestjs/common';
import { CodigoPenalController } from './codigo-penal.controller';
import { CodigoPenalService } from './codigo-penal.service';

@Module({
  controllers: [CodigoPenalController],
  providers: [CodigoPenalService],
})
export class CodigoPenalModule {}
