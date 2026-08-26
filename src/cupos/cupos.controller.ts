import { Body, Controller, Get, HttpCode, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, AccessTokenPayload } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CuposService } from './cupos.service';

/** Cupos del mes y estado del modal. Siempre con sesión: sin cuenta no hay cupo. */
@Controller('cupos')
@UseGuards(JwtAuthGuard)
export class CuposController {
  constructor(private readonly cupos: CuposService) {}

  @Get()
  resumen(@CurrentUser() user: AccessTokenPayload) {
    return this.cupos.resumen(user.sub);
  }

  @Post('autorizar')
  @HttpCode(200)
  autorizar(@CurrentUser() user: AccessTokenPayload, @Body() body: { kind?: string; target?: string }) {
    return this.cupos.autorizar(user.sub, body?.kind ?? '', body?.target ?? null);
  }

  @Get('gate-state')
  async gateState(@CurrentUser() user: AccessTokenPayload) {
    return { state: await this.cupos.getGateState(user.sub) };
  }

  @Put('gate-state')
  setGateState(@CurrentUser() user: AccessTokenPayload, @Body() body: { state?: unknown }) {
    return this.cupos.setGateState(user.sub, body?.state ?? {});
  }
}
