import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../common/prisma/prisma.service";

export interface AccessTokenPayload {
  sub: string; // userId
  email: string;
  roles: string[];
}

/**
 * Verifica el access token (JWT) del header Authorization: Bearer <token>.
 * Deja el payload en req.user. Se aplica por-ruta en las rutas protegidas
 * (register/login/refresh son públicas dentro del gate de AUTH_ENABLED).
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly db: PrismaService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const header = (req.headers["authorization"] as string | undefined) ?? "";
    const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
    if (!token) throw new UnauthorizedException("Falta el token de acceso");

    try {
      const payload = this.jwt.verify<AccessTokenPayload>(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      req.user = payload;
    } catch {
      throw new UnauthorizedException("Token de acceso inválido o expirado");
    }
    const user = await this.db.user.findUnique({
      where: { id: req.user.sub },
      select: { status: true },
    });
    if (!user || user.status !== "active")
      throw new UnauthorizedException("La cuenta no está disponible.");
    return true;
  }
}
