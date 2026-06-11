import { Body, Controller, Delete, Get, Headers, HttpCode, Ip, Post, Query, UseGuards } from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { EventsService, TrackEventDto } from './events.service';
import { AdminHeaderGuard } from '../common/guards/admin-header.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly events: EventsService) {}

  @Post()
  @HttpCode(200)
  @Throttle({ default: { ttl: 60_000, limit: 30 } })
  async track(
    @Body() dto: TrackEventDto,
    @Ip() ip: string,
    @Headers('x-forwarded-for') xff?: string,
  ): Promise<{ ok: boolean }> {
    // Detrás del proxy de Render la IP real viaja en x-forwarded-for (la primera
    // de la cadena); @Ip() es el fallback para entornos sin proxy.
    const clientIp = xff?.split(',')[0]?.trim() || ip;
    await this.events.track(dto, clientIp);
    return { ok: true };
  }

  @Get()
  @SkipThrottle()
  @UseGuards(AdminHeaderGuard)
  async readAll(@Query('since') since?: string) {
    return this.events.readAll(since);
  }

  @Delete()
  @HttpCode(200)
  @SkipThrottle()
  @UseGuards(AdminHeaderGuard)
  async clear(): Promise<{ ok: boolean }> {
    await this.events.clear();
    return { ok: true };
  }
}
