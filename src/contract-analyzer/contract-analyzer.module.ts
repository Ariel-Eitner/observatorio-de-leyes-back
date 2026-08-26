import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CuposModule } from '../cupos/cupos.module';
import { ContractAnalyzerController } from './contract-analyzer.controller';
import { ContractAnalyzerService } from './contract-analyzer.service';

// AuthModule por el JwtAuthGuard; CuposModule porque el análisis descuenta cupo.
@Module({
  imports: [AuthModule, CuposModule],
  controllers: [ContractAnalyzerController],
  providers: [ContractAnalyzerService],
})
export class ContractAnalyzerModule {}
