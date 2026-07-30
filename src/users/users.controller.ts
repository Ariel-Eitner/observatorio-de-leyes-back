import { Body, Controller, Get, HttpCode, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ClaimDonationDto } from './dto/claim-donation.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard, AccessTokenPayload } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

// Gate de entorno + auth para todo el perfil del usuario.
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly svc: UsersService) {}

  // ── Perfil ────────────────────────────────────────────────────────────────────

  @Patch('me')
  updateProfile(@CurrentUser() user: AccessTokenPayload, @Body() dto: UpdateProfileDto) {
    return this.svc.updateProfile(user.sub, dto);
  }

  @Post('me/password')
  @HttpCode(200)
  changePassword(@CurrentUser() user: AccessTokenPayload, @Body() dto: ChangePasswordDto) {
    return this.svc.changePassword(user.sub, dto);
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
}
