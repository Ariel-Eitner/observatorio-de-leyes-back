import { Module } from '@nestjs/common';
import { CodigoAduaneroController } from './codigo-aduanero.controller';
import { CodigoAduaneroService } from './codigo-aduanero.service';

@Module({
  controllers: [CodigoAduaneroController],
  providers: [CodigoAduaneroService],
})
export class CodigoAduaneroModule {}
