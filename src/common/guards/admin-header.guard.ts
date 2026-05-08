import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class AdminHeaderGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req     = context.switchToHttp().getRequest();
    const key     = req.headers['x-obs-admin'] as string | undefined;
    const secret  = process.env.ADMIN_SECRET;

    if (!secret) throw new UnauthorizedException('Admin no configurado');

    // timingSafeEqual para evitar timing attacks aunque sea local
    const keyBuf      = Buffer.from(key ?? '', 'utf8');
    const secretBuf   = Buffer.from(secret, 'utf8');
    const ok = keyBuf.length === secretBuf.length && timingSafeEqual(keyBuf, secretBuf);

    if (!ok) throw new UnauthorizedException();
    return true;
  }
}
