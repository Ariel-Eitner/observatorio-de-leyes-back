import {
  Controller, ForbiddenException, Post, UploadedFile, UseGuards, UseInterceptors, Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Throttle } from '@nestjs/throttler';
import { memoryStorage } from 'multer';
import { ContractAnalyzerService } from './contract-analyzer.service';
import { CuposService, type AutorizarResultado } from '../cupos/cupos.service';
import { JwtAuthGuard, AccessTokenPayload } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

/**
 * Lector de contratos. Requiere cuenta y descuenta el cupo del mes ANTES de
 * analizar (gratis 1, Pro 15): el límite vive acá y no en el navegador.
 * Ver docs/reglas-por-plan.html §5.
 */
@Controller('tools')
export class ContractAnalyzerController {
  constructor(
    private readonly service: ContractAnalyzerService,
    private readonly cupos: CuposService,
  ) {}

  @Post('analizar-contrato')
  @UseGuards(JwtAuthGuard)
  // Rate limit específico: máx 10 análisis/min por IP (parseo de archivos es costoso en memoria)
  @Throttle({ global: { ttl: 60_000, limit: 10 } })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB — reducido al límite real del servicio
    }),
  )
  async analizar(
    @CurrentUser() user: AccessTokenPayload,
    @UploadedFile() file?: Express.Multer.File,
    @Body('text') text?: string,
  ) {
    const cupo = await this.cupos.autorizar(user.sub, 'lector', file?.originalname ?? 'texto pegado');
    if (cupo.ok !== true) {
      // El front distingue este 403 por `error` para mostrar el candado de cupo.
      const c = cupo as Extract<AutorizarResultado, { ok: false }>;
      throw new ForbiddenException({ error: c.error, usado: c.usado, limite: c.limite, renueva: c.renueva });
    }
    const resultado = await this.service.analizar(file, text);
    return { ...resultado, cupo: { usado: cupo.usado, limite: cupo.limite, restante: cupo.restante, renueva: cupo.renueva } };
  }
}
