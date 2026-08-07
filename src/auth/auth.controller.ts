import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Ip,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService, SessionMeta } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { JwtAuthGuard, AccessTokenPayload } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

/**
 * Endpoints de autenticación. El AuthEnabledGuard a nivel de clase hace que TODO
 * el controlador devuelva 404 salvo cuando AUTH_ENABLED=true (localhost).
 *
 * Modelo BFF: el backend valida, firma y rota; devuelve los tokens en el body.
 * El front (route handlers Next) los guarda en cookies httpOnly y reenvía el
 * access token como Bearer. Ver docs/sistema-usuarios.html.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  private meta(ip: string, xff?: string, ua?: string): SessionMeta {
    const clientIp = xff?.split(',')[0]?.trim() || ip;
    const device = ua && /Mobi|Android|iPhone|iPad/i.test(ua) ? 'mobile' : 'desktop';
    return { ip: clientIp, userAgent: ua, device };
  }

  @Post('register')
  // OJO con la clave: tiene que ser el NOMBRE del throttler registrado en
  // AppModule ('global'). Con una clave que no existe (antes decía 'default')
  // @nestjs/throttler descarta la anulación en silencio y la ruta se queda con
  // el límite genérico de 120/min. No hay error ni warning: parece protegida.
  @Throttle({ global: { ttl: 60_000, limit: 10 } })
  register(
    @Body() dto: RegisterDto,
    @Ip() ip: string,
    @Headers('x-forwarded-for') xff?: string,
    @Headers('user-agent') ua?: string,
  ) {
    return this.auth.register(dto, this.meta(ip, xff, ua));
  }

  @Post('login')
  @HttpCode(200)
  @Throttle({ global: { ttl: 60_000, limit: 10 } })
  login(
    @Body() dto: LoginDto,
    @Ip() ip: string,
    @Headers('x-forwarded-for') xff?: string,
    @Headers('user-agent') ua?: string,
  ) {
    return this.auth.login(dto, this.meta(ip, xff, ua));
  }

  @Post('refresh')
  @HttpCode(200)
  @Throttle({ global: { ttl: 60_000, limit: 60 } })
  refresh(
    @Body() dto: RefreshDto,
    @Ip() ip: string,
    @Headers('x-forwarded-for') xff?: string,
    @Headers('user-agent') ua?: string,
  ) {
    return this.auth.refresh(dto.refreshToken, this.meta(ip, xff, ua));
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Body() dto: RefreshDto) {
    return this.auth.logout(dto.refreshToken);
  }

  @Post('logout-all')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  logoutAll(@CurrentUser() user: AccessTokenPayload) {
    return this.auth.logoutAll(user.sub);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: AccessTokenPayload) {
    return this.auth.me(user.sub);
  }
}
