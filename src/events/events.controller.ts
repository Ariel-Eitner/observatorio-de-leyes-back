import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Headers,
  HttpCode,
  Ip,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { EventsService, TrackEventDto } from './events.service';
import { AdminHeaderGuard } from '../common/guards/admin-header.guard';
import { describeDbTarget, destructiveOpsAllowed } from '../common/db-env';

@Controller('events')
export class EventsController {
  constructor(private readonly events: EventsService) {}

  @Post()
  @HttpCode(200)
  // 'global' = nombre del throttler registrado en AppModule. Una clave inexistente
  // se ignora sin avisar y la ruta queda con el límite genérico.
  @Throttle({ global: { ttl: 60_000, limit: 30 } })
  async track(
    @Body() dto: TrackEventDto,
    @Ip() ip: string,
    @Headers('x-forwarded-for') xff?: string,
    @Headers('user-agent') ua?: string,
  ): Promise<{ ok: boolean }> {
    // Detrás del proxy de Render la IP real viaja en x-forwarded-for (la primera
    // de la cadena); @Ip() es el fallback para entornos sin proxy.
    const clientIp = xff?.split(',')[0]?.trim() || ip;
    await this.events.track(dto, clientIp, ua);
    return { ok: true };
  }

  @Get()
  @SkipThrottle()
  @UseGuards(AdminHeaderGuard)
  async readAll(@Query('since') since?: string) {
    return this.events.readAll(since);
  }

  /**
   * Borra TODO el tracking. Doble llave a propósito: además de la cabecera de
   * admin, exige ALLOW_DESTRUCTIVE=true. El motivo es que el stack local comparte
   * la base con producción, así que apretar "limpiar tracking" desde un panel
   * levantado en la notebook borraba los eventos reales sin red de contención.
   */
  @Delete()
  @HttpCode(200)
  @SkipThrottle()
  @UseGuards(AdminHeaderGuard)
  async clear(): Promise<{ ok: boolean }> {
    if (!destructiveOpsAllowed()) {
      const db = describeDbTarget();
      throw new ForbiddenException(
        `Operación destructiva bloqueada sobre ${db.label}. ` +
          'Habilitala con ALLOW_DESTRUCTIVE=true en el entorno donde corresponda.',
      );
    }
    await this.events.clear();
    return { ok: true };
  }
}
