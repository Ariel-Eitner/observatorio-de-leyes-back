import { Module } from '@nestjs/common';
import { CodigoCivilComercialController } from './codigo-civil-comercial.controller';
import { CodigoCivilComercialService } from './codigo-civil-comercial.service';

@Module({
  controllers: [CodigoCivilComercialController],
  providers: [CodigoCivilComercialService],
})
export class CodigoCivilComercialModule {}
