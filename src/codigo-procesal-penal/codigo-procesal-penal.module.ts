import { Module } from '@nestjs/common';
import { CodigoProcesalPenalController } from './codigo-procesal-penal.controller';
import { CodigoProcesalPenalService } from './codigo-procesal-penal.service';

@Module({
  controllers: [CodigoProcesalPenalController],
  providers: [CodigoProcesalPenalService],
})
export class CodigoProcesalPenalModule {}
