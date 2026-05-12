import { Body, Controller, Get, Post, Query, HttpCode, UseGuards } from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { ExportsService, ExportType } from './exports.service';
import { AdminHeaderGuard } from '../common/guards/admin-header.guard';

interface RecordExportDto {
  guestId: string;
  type:    ExportType;
}

@Controller('exports')
export class ExportsController {
  constructor(private readonly exports: ExportsService) {}

  @Get('count')
  @SkipThrottle()
  @UseGuards(AdminHeaderGuard)
  async getCount(
    @Query('guestId') guestId: string,
    @Query('type') type: ExportType,
  ) {
    if (!guestId || !type) return { used: 0, limit: 5, remaining: 5 };
    return this.exports.getCount(guestId, type);
  }

  @Post()
  @HttpCode(200)
  @Throttle({ default: { ttl: 60_000, limit: 10 } })
  async record(@Body() dto: RecordExportDto) {
    if (!dto?.guestId || !dto?.type) return { ok: false, remaining: 0 };
    return this.exports.record(dto.guestId, dto.type);
  }
}
