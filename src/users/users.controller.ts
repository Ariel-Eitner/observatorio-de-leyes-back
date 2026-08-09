import { Body, Controller, Get, Headers, HttpCode, Ip, Patch, Post, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { UsersService } from './users.service';
import { ClaimDonationDto } from './dto/claim-donation.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AccountDataService } from '../account/account-data.service';
import { DeleteAccountDto } from '../account/dto/account.dto';
import { JwtAuthGuard, AccessTokenPayload } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

// Gate de entorno + auth para todo el perfil del usuario.
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly svc: UsersService,
    private readonly datos: AccountDataService,
  ) {}

  // ── Perfil ────────────────────────────────────────────────────────────────────

  @Patch('me')
  updateProfile(@CurrentUser() user: AccessTokenPayload, @Body() dto: UpdateProfileDto) {
    return this.svc.updateProfile(user.sub, dto);
  }

  @Post('me/password')
  @HttpCode(200)
  changePassword(
    @CurrentUser() user: AccessTokenPayload,
    @Body() dto: ChangePasswordDto,
    @Ip() ip: string,
    @Headers('x-forwarded-for') xff?: string,
    @Headers('user-agent') ua?: string,
  ) {
    // El cambio de clave cierra todas las sesiones y abre una nueva para este
    // dispositivo, así que hace falta la metadata de la sesión entrante.
    const clientIp = xff?.split(',')[0]?.trim() || ip;
    const device = ua && /Mobi|Android|iPhone|iPad/i.test(ua) ? 'mobile' : 'desktop';
    return this.svc.changePassword(user.sub, dto, { ip: clientIp, userAgent: ua, device });
  }

  // ── Bootstrap de la cuenta (perfil + guardadas + carpetas en un request) ────────

  @Get('me/overview')
  overview(@CurrentUser() user: AccessTokenPayload) {
    return this.svc.overview(user.sub);
  }

  // ── Reclamos ──────────────────────────────────────────────────────────────────

  @Get('me/stats')
  stats(@CurrentUser() user: AccessTokenPayload) {
    return this.svc.stats(user.sub);
  }

  @Get('me/claims')
  listClaims(@CurrentUser() user: AccessTokenPayload) {
    return this.svc.listClaims(user.sub);
  }

  @Post('me/claim-donation')
  claim(@CurrentUser() user: AccessTokenPayload, @Body() dto: ClaimDonationDto) {
    return this.svc.createClaim(user.sub, user.email, dto);
  }

  // ── Datos personales (Ley 25.326) ─────────────────────────────────────────────

  /**
   * Derecho de acceso: copia completa de los datos del titular.
   *
   * Con límite propio porque arma un JSON grande cruzando varias tablas; nadie
   * necesita pedir su exportación más de unas pocas veces por minuto.
   */
  @Get('me/export')
  @Throttle({ global: { ttl: 60_000, limit: 5 } })
  exportar(@CurrentUser() user: AccessTokenPayload) {
    return this.datos.exportar(user.sub);
  }

  /**
   * Derecho de supresión: borra la cuenta y anonimiza el resto del rastro.
   * Irreversible. Pide contraseña y la palabra BORRAR (ver DeleteAccountDto).
   */
  @Post('me/delete')
  @HttpCode(200)
  @Throttle({ global: { ttl: 60_000, limit: 5 } })
  borrarCuenta(
    @CurrentUser() user: AccessTokenPayload,
    @Body() dto: DeleteAccountDto,
    @Ip() ip: string,
    @Headers('x-forwarded-for') xff?: string,
    @Headers('user-agent') ua?: string,
  ) {
    const clientIp = xff?.split(',')[0]?.trim() || ip;
    return this.datos.borrarCuenta(user.sub, dto.password, { ip: clientIp, userAgent: ua });
  }
}
