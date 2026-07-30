import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, createHash } from 'crypto';
import * as argon2 from 'argon2';
import { PrismaService } from '../common/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Prisma, User } from '@prisma/client';

export interface SessionMeta {
  userAgent?: string;
  ip?: string;
  device?: string;
}

const REFRESH_TTL_DAYS = Number(process.env.REFRESH_TTL_DAYS ?? 30);
const ACCESS_TTL = process.env.JWT_ACCESS_TTL ?? '15m';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  // ── Helpers ────────────────────────────────────────────────────────────────

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  /**
   * Super-admins fijos: los emails de ADMIN_EMAILS (env, separados por coma) son
   * siempre administradores. Es el modo seguro de tener un admin que no se puede
   * otorgar desde afuera ni perder — se re-asigna en cada registro/login. El
   * control lo tenés vos por la variable de entorno, no por la BD.
   */
  private isAdminEmail(email: string): boolean {
    return (process.env.ADMIN_EMAILS ?? '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
      .includes(email);
  }

  private rolesOf(user: Pick<User, 'isAdmin' | 'isFounder'>): string[] {
    const roles = ['user'];
    if (user.isFounder) roles.push('founder');
    if (user.isAdmin) roles.push('admin');
    return roles;
  }

  /** Vista pública del usuario — nunca expone el hash de contraseña. */
  private sanitize(user: User) {
    return {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
      telefono: user.telefono,
      tipoUsuario: user.tipoUsuario,
      profesion: user.profesion,
      especialidad: user.especialidad,
      empresa: user.empresa,
      provincia: user.provincia,
      status: user.status,
      plan: user.plan,
      planUntil: user.planUntil,
      isAdmin: user.isAdmin,
      isFounder: user.isFounder,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
      roles: this.rolesOf(user),
    };
  }

  private hashToken(raw: string): string {
    return createHash('sha256').update(raw).digest('hex');
  }

  /** Access JWT (corto) + refresh opaco (guardado hasheado en `sessions`). */
  private async issueTokens(user: User, meta: SessionMeta) {
    const accessToken = await this.jwt.signAsync(
      { sub: user.id, email: user.email, roles: this.rolesOf(user) },
      // expiresIn viene de env (string); el typedef de jsonwebtoken pide su
      // literal StringValue, así que casteamos puntualmente.
      { secret: process.env.JWT_ACCESS_SECRET, expiresIn: ACCESS_TTL as `${number}m` },
    );

    const refreshToken = randomBytes(32).toString('base64url');
    const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 86_400_000);
    await this.prisma.session.create({
      data: {
        userId: user.id,
        tokenHash: this.hashToken(refreshToken),
        expiresAt,
        userAgent: meta.userAgent?.slice(0, 500),
        ip: meta.ip,
        device: meta.device,
      },
    });

    return { accessToken, refreshToken };
  }

  /**
   * Cruce de donantes por email: si el email coincide con un founder pagado o un
   * pago de apoyo aprobado, otorga isFounder + Plan Pro (1 año, u honrando la
   * fecha de beneficio ya cargada). También linkea founder_id/lead_id para
   * unificar identidad. `pagos` no está en el schema Prisma (vive en el front),
   * así que se consulta por SQL crudo. Nunca rompe register/login: ante error
   * devuelve el usuario sin cambios.
   */
  private async applyDonorBenefits(user: User): Promise<User> {
    const email = user.email; // ya normalizado a minúsculas
    const data: Prisma.UserUpdateInput = {};

    // Cruce de donantes (best-effort: nunca debe romper register/login).
    try {
      const founders = await this.prisma.$queryRaw<
        Array<{ id: string; pagado: boolean | null; beneficio_hasta: Date | null }>
      >`SELECT id, pagado, beneficio_hasta FROM founders WHERE lower(email) = ${email} LIMIT 1`;
      const pagos = await this.prisma.$queryRaw<Array<{ id: string }>>`
        SELECT id FROM pagos
        WHERE lower(email) = ${email} AND estado = 'aprobado' AND tipo = 'apoyo'
        ORDER BY created_at ASC LIMIT 1`;
      const leads = await this.prisma.$queryRaw<Array<{ id: string }>>`
        SELECT id FROM leads WHERE lower(email) = ${email} LIMIT 1`;

      const founder = founders[0];
      const isDonor = founder?.pagado === true || pagos.length > 0;

      if (founder) data.founderId = founder.id;
      if (leads[0]) data.leadId = leads[0].id;
      if (isDonor) {
        data.isFounder = true;
        data.plan = 'pro';
        const oneYear = new Date(Date.now() + 365 * 86_400_000);
        const until = founder?.beneficio_hasta ?? oneYear;
        if (!user.planUntil || user.planUntil < until) data.planUntil = until;
      }
    } catch {
      /* el cruce de donantes nunca rompe el flujo */
    }

    // Super-admin (allowlist ADMIN_EMAILS): garantizado — ve todo (plan Pro).
    if (this.isAdminEmail(email)) {
      if (!user.isAdmin) data.isAdmin = true;
      data.plan = 'pro';
      const far = new Date(Date.now() + 100 * 365 * 86_400_000);
      if (!user.planUntil || user.planUntil.getTime() < far.getTime()) data.planUntil = far;
    }

    if (Object.keys(data).length === 0) return user;
    try {
      return await this.prisma.user.update({ where: { id: user.id }, data });
    } catch {
      return user;
    }
  }

  // ── Casos de uso ─────────────────────────────────────────────────────────────

  async register(dto: RegisterDto, meta: SessionMeta) {
    const email = this.normalizeEmail(dto.email);

    const exists = await this.prisma.user.findUnique({ where: { email } });
    if (exists) throw new ConflictException('Ya existe una cuenta con ese email');

    const passwordHash = await argon2.hash(dto.password, { type: argon2.argon2id });

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        nombre: dto.nombre?.trim() || null,
        // Perfil opcional que se haya completado en el registro.
        apellido: dto.apellido?.trim() || null,
        telefono: dto.telefono?.trim() || null,
        tipoUsuario: dto.tipoUsuario?.trim() || null,
        profesion: dto.profesion?.trim() || null,
        especialidad: dto.especialidad?.trim() || null,
        empresa: dto.empresa?.trim() || null,
        provincia: dto.provincia?.trim() || null,
        guestId: dto.guestId || null,
        consentAt: dto.consentVersion ? new Date() : null,
        consentVersion: dto.consentVersion || null,
        isAdmin: this.isAdminEmail(email),
        lastLoginAt: new Date(),
      },
    });

    // Cruce con donantes por email: founder/plan Pro si corresponde.
    const enriched = await this.applyDonorBenefits(user);

    const tokens = await this.issueTokens(enriched, meta);
    return { user: this.sanitize(enriched), ...tokens };
  }

  async login(dto: LoginDto, meta: SessionMeta) {
    const email = this.normalizeEmail(dto.email);
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Mensaje genérico: no revelar si el email existe (anti-enumeración).
    const genericFail = new UnauthorizedException('Email o contraseña inválidos');
    if (!user || user.status !== 'active') throw genericFail;

    const ok = await argon2.verify(user.passwordHash, dto.password).catch(() => false);
    if (!ok) throw genericFail;

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
        // Re-asegura el flag admin desde el allowlist (nunca lo pierde).
        ...(this.isAdminEmail(email) && !user.isAdmin ? { isAdmin: true } : {}),
      },
    });

    // Re-evaluar beneficios de donante por si donó después de crear la cuenta.
    const enriched = await this.applyDonorBenefits(updated);

    const tokens = await this.issueTokens(enriched, meta);
    return { user: this.sanitize(enriched), ...tokens };
  }

  async refresh(rawToken: string, meta: SessionMeta) {
    const tokenHash = this.hashToken(rawToken);
    const session = await this.prisma.session.findUnique({ where: { tokenHash } });
    if (!session) throw new UnauthorizedException('Sesión inválida');

    // Detección de reuso: un refresh ya rotado que se vuelve a presentar es señal
    // de robo → se revocan TODAS las sesiones del usuario.
    if (session.revokedAt) {
      await this.prisma.session.updateMany({
        where: { userId: session.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      throw new UnauthorizedException('Sesión revocada');
    }

    if (session.expiresAt.getTime() < Date.now()) {
      await this.prisma.session.update({
        where: { id: session.id },
        data: { revokedAt: new Date() },
      });
      throw new UnauthorizedException('Sesión expirada');
    }

    const user = await this.prisma.user.findUnique({ where: { id: session.userId } });
    if (!user || user.status !== 'active') throw new UnauthorizedException('Sesión inválida');

    // Rotación: emitir tokens nuevos y marcar el viejo como reemplazado.
    const tokens = await this.issueTokens(user, meta);
    const nuevo = await this.prisma.session.findUnique({
      where: { tokenHash: this.hashToken(tokens.refreshToken) },
    });
    await this.prisma.session.update({
      where: { id: session.id },
      data: { revokedAt: new Date(), replacedById: nuevo?.id ?? null },
    });

    return { user: this.sanitize(user), ...tokens };
  }

  async logout(rawToken: string) {
    const tokenHash = this.hashToken(rawToken);
    await this.prisma.session.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    return { ok: true };
  }

  async logoutAll(userId: string) {
    await this.prisma.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    return { ok: true };
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return this.sanitize(user);
  }
}
