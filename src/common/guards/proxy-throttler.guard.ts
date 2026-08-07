import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { createHmac, timingSafeEqual } from 'crypto';

/**
 * ThrottlerGuard que sabe cuál es la IP REAL del usuario.
 *
 * POR QUÉ EXISTE: el throttler de fábrica cuenta por `req.ip`, y en esta
 * arquitectura eso no identifica a nadie. Hay dos capas en el medio:
 *
 *   1. Render pone su balanceador delante del backend.
 *   2. El modelo BFF: el navegador nunca llama al backend, llama a las rutas
 *      /api del frontend, y esas rutas llaman al backend desde los servidores
 *      de Vercel. Para el backend, TODOS los usuarios comparten las pocas IP
 *      de salida de Vercel.
 *
 * Resultado sin esto: un solo balde compartido por todo el mundo. No protege
 * contra nadie, y encima cualquiera puede agotarlo y dejar la ruta en 429 para
 * el resto (denegación de servicio trivial).
 *
 * CÓMO SE RESUELVE: el frontend adjunta la IP real del usuario y la FIRMA con
 * el secreto que ya comparte con el backend (ADMIN_SECRET). Acá se verifica la
 * firma antes de confiar en ella — si no, cualquiera mandaría una IP inventada
 * en cada request y evadiría el límite con la misma facilidad.
 *
 * Cuando no hay firma válida (llamada directa al backend, curl, un cliente que
 * no es nuestro front) se cae a la cadena de proxies estándar, que ahora sí
 * funciona porque main.ts habilita `trust proxy`.
 */
@Injectable()
export class ProxyThrottlerGuard extends ThrottlerGuard {
  static readonly IP_HEADER = 'x-obs-client-ip';
  static readonly SIG_HEADER = 'x-obs-ip-sig';

  /** Firma que el frontend tiene que adjuntar junto con la IP. */
  static sign(ip: string, secret: string): string {
    return createHmac('sha256', secret).update(ip).digest('hex');
  }

  private trustedClientIp(req: Record<string, any>): string | null {
    const secret = process.env.ADMIN_SECRET;
    if (!secret) return null;

    const ip = req.headers?.[ProxyThrottlerGuard.IP_HEADER] as string | undefined;
    const sig = req.headers?.[ProxyThrottlerGuard.SIG_HEADER] as string | undefined;
    if (!ip || !sig) return null;

    const expected = ProxyThrottlerGuard.sign(ip, secret);
    // timingSafeEqual explota si los largos difieren, así que se compara antes.
    if (sig.length !== expected.length) return null;
    try {
      if (!timingSafeEqual(Buffer.from(sig, 'utf8'), Buffer.from(expected, 'utf8'))) return null;
    } catch {
      return null;
    }
    return ip;
  }

  protected async getTracker(req: Record<string, any>): Promise<string> {
    const real = this.trustedClientIp(req);
    if (real) return real;

    // Fallback: cadena de proxies (req.ips se puebla solo con `trust proxy`).
    const ips = req.ips as string[] | undefined;
    return (ips?.length ? ips[0] : req.ip) ?? 'desconocida';
  }
}
