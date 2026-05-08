import { Module } from '@nestjs/common';
import { ConstitucionesProvincialesController } from './constituciones-provinciales.controller';
import { ConstitucionesProvincialesService } from './constituciones-provinciales.service';

@Module({
  controllers: [ConstitucionesProvincialesController],
  providers: [ConstitucionesProvincialesService],
})
export class ConstitucionesProvincialesModule {}
