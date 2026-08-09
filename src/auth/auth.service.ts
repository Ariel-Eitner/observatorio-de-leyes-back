import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
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

// Fuerza bruta POR CUENTA. Es una defensa distinta a la de por IP: un ataque
// distribuido contra un solo email cambia de IP en cada intento y jamás toca el
// techo del throttler. Los umbrales son deliberadamente tolerantes con el
// usuario que se equivoca de contraseña y duros con quien prueba en serie.
const MAX_FALLOS = 8;
const BLOQUEO_MINUTOS = 15;

/**
 * Cuánto sobrevive una sesión ya revocada antes de que la purga se la lleve.
 *
 * No se borran al instante porque las filas revocadas son las que hacen andar la
 * detección de reuso: si un refresh rotado se vuelve a presentar, ese registro
 * es lo que permite darse cuenta y revocar toda la familia. Una semana cubre de
 * sobra la ventana en la que ese aviso todavía sirve para algo.
 */
const RETENCION_REVOCADAS_DIAS = 7;

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
   * Vincula la cuenta con su fila de founder/lead para unificar identidad en el
   * CRM. NO otorga ningún beneficio.
   *
   * POR QUÉ NO OTORGA NADA (cambio de julio 2026): antes, si el email coincidía
   * con un donante pagado, esto daba isFounder + Plan Pro por un año en el acto.
   * El problema es que NADA prueba que quien se registra sea el dueño de ese
   * email: no hay verificación. Bastaba conocer el email de un donante —los
   * nombres están en el muro público— para llevarse su badge y un año de Pro.
   *
   * Ahora el beneficio lo otorga el admin desde /admin/usuarios, contra el
   * comprobante en MercadoPago (mismo flujo de dos niveles que ya existía para
   * los pagos). El usuario lo pide desde /cuenta con "reclamar donación".
   * Ver AdminBenefitsService.
   *
   * El vínculo founder_id/lead_id sí se mantiene porque no da privilegios: solo
   * une la identidad para el CRM. `pagos` y `founders` no están en el schema de
   * Prisma (viven del lado del front), así que se consultan por SQL crudo.
   * Nunca rompe register/login: ante error devuelve el usuario sin cambios.
   */
  private async linkCrmIdentity(user: User): Promise<User> {
    const email = user.email; // ya normalizado a minúsculas
    const data: Prisma.UserUpdateInput = {};

    try {
      const founders = await this.prisma.$queryRaw<Array<{ id: string }>>`
        SELECT id FROM founders WHERE lower(email) = ${email} LIMIT 1`;
      const leads = await this.prisma.$queryRaw<Array<{ id: string }>>`
        SELECT id FROM leads WHERE lower(email) = ${email} LIMIT 1`;

      if (founders[0]) data.founderId = founders[0].id;
      if (leads[0]) data.leadId = leads[0].id;
    } catch {
      /* el cruce con el CRM nunca rompe el flujo */
    }

    // Super-admin: el flag se RE-ASEGURA en login (donde ya se probó la
    // contraseña), nunca se otorga en el registro. Ver register().
    if (this.isAdminEmail(email) && !user.isAdmin) data.isAdmin = true;

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

    // Los emails de ADMIN_EMAILS no se registran desde afuera. Sin esto, en una
    // base nueva (o si la cuenta se borrara) el PRIMERO que se registre con ese
    // email sería administrador: el registro creaba la cuenta con isAdmin=true
    // sin ninguna prueba de que controle el email. La cuenta admin se crea a
    // propósito y después el login le re-asegura el flag.
    // Se responde el MISMO conflicto que un email ya tomado, para no delatar
    // desde afuera cuáles son los emails de administración.
    if (this.isAdminEmail(email)) {
      throw new ConflictException('Ya existe una cuenta con ese email');
    }

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
        // isAdmin NUNCA se otorga en el registro (ver el guard de arriba).
        lastLoginAt: new Date(),
      },
    });

    // Solo vincula identidad en el CRM. El beneficio de donante lo otorga el
    // admin contra comprobante: registrarse con el email de otro no da nada.
    const enriched = await this.linkCrmIdentity(user);

    const tokens = await this.issueTokens(enriched, meta);
    return { user: this.sanitize(enriched), ...tokens };
  }

  async login(dto: LoginDto, meta: SessionMeta) {
    const email = this.normalizeEmail(dto.email);
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Mensaje genérico: no revelar si el email existe (anti-enumeración).
    const genericFail = new UnauthorizedException('Email o contraseña inválidos');
    if (!user || user.status !== 'active') throw genericFail;

    // Cuenta bloqueada por intentos fallidos. Se responde 429 (no 401) porque es
    // una condición temporal y distinta de "credenciales inválidas" — pero solo
    // lo ve quien ya acertó el email, así que no sirve para enumerar cuentas.
    if (user.lockedUntil && user.lockedUntil.getTime() > Date.now()) {
      const minutos = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60_000);
      throw new HttpException(
        `Demasiados intentos fallidos. Probá de nuevo en ${minutos} minuto(s).`,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const ok = await argon2.verify(user.passwordHash, dto.password).catch(() => false);
    if (!ok) {
      // Contador por cuenta: al llegar al tope, se bloquea por un rato. Esto es
      // lo que frena un ataque distribuido, que cambia de IP en cada intento y
      // nunca toca el límite del throttler.
      const fallos = user.failedLoginCount + 1;
      await this.prisma.user
        .update({
          where: { id: user.id },
          data: {
            failedLoginCount: fallos,
            ...(fallos >= MAX_FALLOS
              ? { lockedUntil: new Date(Date.now() + BLOQUEO_MINUTOS * 60_000), failedLoginCount: 0 }
              : {}),
          },
        })
        .catch(() => undefined); // contar nunca debe romper el login
      throw genericFail;
    }

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
        // Login exitoso: se limpia el contador de fallos.
        failedLoginCount: 0,
        lockedUntil: null,
        // Re-asegura el flag admin desde el allowlist (nunca lo pierde). Acá sí
        // es seguro: para llegar hasta este punto hubo que saber la contraseña.
        ...(this.isAdminEmail(email) && !user.isAdmin ? { isAdmin: true } : {}),
      },
    });

    // Solo vincula identidad en el CRM (no otorga beneficios: ver linkCrmIdentity).
    const enriched = await this.linkCrmIdentity(updated);

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

  /**
   * Corta TODAS las sesiones del usuario y le devuelve un par de tokens nuevo.
   *
   * Se usa al cambiar la contraseña. Antes el cambio no tocaba las sesiones, y
   * eso vaciaba de sentido a la única acción que ejecuta alguien a quien le
   * entraron a la cuenta: el atacante conservaba un refresh token válido por 30
   * días que se auto-renovaba en cada uso. Ahora todo lo viejo muere; el
   * dispositivo donde se hizo el cambio recibe una sesión nueva, así que la
   * persona no se auto-expulsa.
   */
  async rotateAllSessions(userId: string, meta: SessionMeta) {
    await this.prisma.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return this.issueTokens(user, meta);
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return this.sanitize(user);
  }

  // ── Mantenimiento ────────────────────────────────────────────────────────────

  /**
   * Borra las sesiones que ya no sirven para nada: las vencidas y las revocadas
   * hace más de una semana.
   *
   * Es minimización de datos, no prolijidad: cada fila de `sessions` guarda la
   * IP y el user-agent del dispositivo, o sea datos personales. Sin esto se
   * acumulan para siempre — la rotación crea una fila nueva en cada refresh (una
   * cada 15 minutos de uso activo) y hasta ahora nada las levantaba: una sola
   * cuenta llegó a tener 30 filas vivas.
   *
   * Corre de madrugada. Si el proceso estaba dormido y el cron no llegó a
   * dispararse, no pasa nada: la purga del día siguiente barre lo acumulado.
   */
  @Cron('0 4 * * *')
  async purgarSesionesViejas() {
    const ahora = Date.now();
    try {
      const { count } = await this.prisma.session.deleteMany({
        where: {
          OR: [
            { expiresAt: { lt: new Date(ahora) } },
            { revokedAt: { lt: new Date(ahora - RETENCION_REVOCADAS_DIAS * 86_400_000) } },
          ],
        },
      });
      if (count > 0) console.log(`[auth] purga de sesiones: ${count} fila(s) borrada(s)`);
      return { borradas: count };
    } catch (e) {
      // El mantenimiento nunca puede tumbar el proceso.
      console.error('[auth] falló la purga de sesiones', e);
      return { borradas: 0 };
    }
  }
}
