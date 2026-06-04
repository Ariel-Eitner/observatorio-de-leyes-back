import { Module } from '@nestjs/common';
import { ConstitucionesProvincialesController } from './constituciones-provinciales.controller';
import { ConstitucionesProvincialesService } from './constituciones-provinciales.service';
import { LawsModule } from '../laws/laws.module';

@Module({
  imports: [LawsModule],
  controllers: [ConstitucionesProvincialesController],
  providers: [ConstitucionesProvincialesService],
})
export class ConstitucionesProvincialesModule {}
