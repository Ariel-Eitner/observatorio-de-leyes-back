import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CuposController } from './cupos.controller';
import { CuposService } from './cupos.service';

// Cupos mensuales del plan gratuito (descargas, lector) y estado del modal.
// Exporta el servicio porque el analizador de contratos descuenta el cupo
// del lado del servidor antes de analizar.
@Module({
  imports: [AuthModule],
  controllers: [CuposController],
  providers: [CuposService],
  exports: [CuposService],
})
export class CuposModule {}
