import { Module } from '@nestjs/common';
import { ContractAnalyzerController } from './contract-analyzer.controller';
import { ContractAnalyzerService } from './contract-analyzer.service';

@Module({
  controllers: [ContractAnalyzerController],
  providers: [ContractAnalyzerService],
})
export class ContractAnalyzerModule {}
