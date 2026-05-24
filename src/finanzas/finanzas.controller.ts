import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, HttpCode } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { AdminHeaderGuard } from '../common/guards/admin-header.guard';
import { FinanzasService } from './finanzas.service';
import { CreateEgresoDto } from './dto/create-egreso.dto';
import { CreateIngresoDto } from './dto/create-ingreso.dto';

@Controller('admin/finanzas')
@SkipThrottle()
@UseGuards(AdminHeaderGuard)
export class FinanzasController {
  constructor(private readonly svc: FinanzasService) {}

  // ── Resumen ───────────────────────────────────────────────────────────────────

  @Get('resumen')
  resumen(@Query('desde') desde?: string, @Query('hasta') hasta?: string) {
    return this.svc.resumen(desde, hasta);
  }

  // ── Egresos ───────────────────────────────────────────────────────────────────

  @Get('egresos')
  findEgresos(@Query('desde') desde?: string, @Query('hasta') hasta?: string) {
    return this.svc.findAllEgresos(desde, hasta);
  }

  @Post('egresos')
  createEgreso(@Body() dto: CreateEgresoDto) {
    return this.svc.createEgreso(dto);
  }

  @Patch('egresos/:id')
  updateEgreso(@Param('id') id: string, @Body() dto: Partial<CreateEgresoDto>) {
    return this.svc.updateEgreso(id, dto);
  }

  @Delete('egresos/:id')
  @HttpCode(204)
  deleteEgreso(@Param('id') id: string) {
    return this.svc.deleteEgreso(id);
  }

  // ── Ingresos ──────────────────────────────────────────────────────────────────

  @Get('ingresos')
  findIngresos(@Query('desde') desde?: string, @Query('hasta') hasta?: string) {
    return this.svc.findAllIngresos(desde, hasta);
  }

  @Post('ingresos')
  createIngreso(@Body() dto: CreateIngresoDto) {
    return this.svc.createIngreso(dto);
  }

  @Patch('ingresos/:id')
  updateIngreso(@Param('id') id: string, @Body() dto: Partial<CreateIngresoDto>) {
    return this.svc.updateIngreso(id, dto);
  }

  @Delete('ingresos/:id')
  @HttpCode(204)
  deleteIngreso(@Param('id') id: string) {
    return this.svc.deleteIngreso(id);
  }
}
