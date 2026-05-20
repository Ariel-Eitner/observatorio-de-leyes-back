import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Throttle } from '@nestjs/throttler';
import { memoryStorage } from 'multer';
import { ContractAnalyzerService } from './contract-analyzer.service';

@Controller('tools')
export class ContractAnalyzerController {
  constructor(private readonly service: ContractAnalyzerService) {}

  @Post('analizar-contrato')
  // Rate limit específico: máx 10 análisis/min por IP (parseo de archivos es costoso en memoria)
  @Throttle({ global: { ttl: 60_000, limit: 10 } })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB — reducido al límite real del servicio
    }),
  )
  analizar(
    @UploadedFile() file?: Express.Multer.File,
    @Body('text') text?: string,
  ) {
    return this.service.analizar(file, text);
  }
}
