import { Body, Controller, Get, HttpCode, Param, Post, Query, UseGuards } from '@nestjs/common';
import { IsBoolean, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { BenefitsService } from './benefits.service';
import { AdminHeaderGuard } from '../common/guards/admin-header.guard';

class ResolveClaimDto {
  @IsIn(['verificado', 'rechazado'])
  status: 'verificado' | 'rechazado';

  @IsOptional() @IsInt() @Min(1) @Max(1200)
  meses?: number;
}

class SetBenefitDto {
  @IsBoolean()
  otorgar: boolean;

  @IsOptional() @IsInt() @Min(1) @Max(1200)
  meses?: number;
}

/**
 * Otorgamiento manual del beneficio de donante. Protegido por AdminHeaderGuard
 * (cabecera x-obs-admin = ADMIN_SECRET), igual que el resto del panel: solo el
 * frontend, que ya validó la cookie de admin, puede llamar acá.
 */
@Controller('admin/benefits')
@UseGuards(AdminHeaderGuard)
export class BenefitsController {
  constructor(private readonly svc: BenefitsService) {}

  @Get('claims')
  listClaims(@Query('status') status?: string) {
    return this.svc.listClaims(status);
  }

  @Post('claims/:id')
  @HttpCode(200)
  resolveClaim(@Param('id') id: string, @Body() dto: ResolveClaimDto) {
    return this.svc.resolveClaim(id, dto.status, dto.meses ?? 12);
  }

  @Post('users/:id')
  @HttpCode(200)
  setBenefit(@Param('id') id: string, @Body() dto: SetBenefitDto) {
    return this.svc.setBenefit(id, dto.otorgar, dto.meses ?? 12);
  }
}
