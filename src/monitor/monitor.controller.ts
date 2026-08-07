import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { AdminHeaderGuard } from '../common/guards/admin-header.guard';
import { MonitorService } from './monitor.service';
import type { Snapshot } from './monitor.types';

/**
 * Lectura del monitor. Protegido por el mismo header compartido que el resto del
 * admin: expone rutas internas, tiempos y consumo, o sea un mapa de por dónde
 * atacar. Nunca público.
 */
@ApiExcludeController()
@Controller('monitor')
@UseGuards(AdminHeaderGuard)
export class MonitorController {
  constructor(private readonly monitor: MonitorService) {}

  @Get('snapshot')
  snapshot(): Snapshot {
    return this.monitor.snapshot();
  }

  /** Vaciar los contadores para medir algo puntual desde cero. */
  @Delete('snapshot')
  reiniciar(): { ok: true } {
    this.monitor.reiniciar();
    return { ok: true };
  }
}
