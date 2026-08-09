import { Body, Controller, Headers, HttpCode, Ip, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AccountRequestsService } from './account-requests.service';
import { RequestResetDto, RedeemResetDto } from './dto/account.dto';
import type { SessionMeta } from '../auth/auth.service';

/**
 * Recuperación de contraseña SIN email transaccional.
 *
 * El flujo clásico (link mágico al correo) necesita un proveedor de email y un
 * dominio propio, que hoy no hay. En su lugar, el mismo esquema de dos niveles
 * que ya se usa para verificar pagos: la persona pide y deja un canal de
 * contacto, el admin la aprueba a mano desde el panel, y recién ahí el sistema
 * emite un código de un solo uso que se entrega por fuera del sitio.
 *
 * Es un endpoint público, así que los dos límites de abajo son la única defensa
 * contra alguien que quiera llenar la cola de pedidos o probar códigos en serie.
 */
@Controller('auth/password-reset')
export class AccountController {
  constructor(private readonly svc: AccountRequestsService) {}

  private meta(ip: string, xff?: string, ua?: string): SessionMeta {
    const clientIp = xff?.split(',')[0]?.trim() || ip;
    const device = ua && /Mobi|Android|iPhone|iPad/i.test(ua) ? 'mobile' : 'desktop';
    return { ip: clientIp, userAgent: ua, device };
  }

  /**
   * Pide la recuperación. Responde siempre lo mismo, exista o no la cuenta.
   *
   * OJO con la clave del throttler: tiene que ser 'global', el nombre registrado
   * en AppModule. Con cualquier otra, @nestjs/throttler descarta la anulación en
   * silencio y la ruta se queda con el límite genérico de 120/min.
   */
  @Post()
  @HttpCode(200)
  @Throttle({ global: { ttl: 60_000, limit: 3 } })
  pedir(
    @Body() dto: RequestResetDto,
    @Ip() ip: string,
    @Headers('x-forwarded-for') xff?: string,
    @Headers('user-agent') ua?: string,
  ) {
    const meta = this.meta(ip, xff, ua);
    return this.svc.pedirResetDeContrasena({
      email: dto.email,
      contacto: dto.contacto,
      ip: meta.ip,
      userAgent: meta.userAgent,
    });
  }

  /** Canjea el código y deja la contraseña nueva. Devuelve sesión iniciada. */
  @Post('redeem')
  @HttpCode(200)
  @Throttle({ global: { ttl: 60_000, limit: 10 } })
  canjear(
    @Body() dto: RedeemResetDto,
    @Ip() ip: string,
    @Headers('x-forwarded-for') xff?: string,
    @Headers('user-agent') ua?: string,
  ) {
    return this.svc.canjearReset(dto.codigo, dto.newPassword, this.meta(ip, xff, ua));
  }
}
