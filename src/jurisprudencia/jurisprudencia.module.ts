import { Module } from '@nestjs/common';
import { JurisprudenciaController } from './jurisprudencia.controller';
import { JurisprudenciaService } from './jurisprudencia.service';

@Module({
  controllers: [JurisprudenciaController],
  providers: [JurisprudenciaService],
  exports: [JurisprudenciaService],
})
export class JurisprudenciaModule {}
