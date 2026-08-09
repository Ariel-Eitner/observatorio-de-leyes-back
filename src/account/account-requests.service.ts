import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { createHash, randomInt } from 'crypto';
import * as argon2 from 'argon2';
import { PrismaService } from '../common/prisma/prisma.service';
import { AuthService, SessionMeta } from '../auth/auth.service';

/**
 * Alfabeto del código de recuperación.
 *
 * Sin I, L, O, 0 ni 1: el código se dicta por teléfono o se copia de un mensaje,
 * y esos cinco caracteres son los que la gente confunde al transcribir. Quedan
 * 31 símbolos; con 10 posiciones son ~8·10^14 combinaciones (≈2^50), de sobra
 * para algo que además vence, se usa una sola vez y está detrás de un límite de
 * intentos.
 */
const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const LARGO_CODIGO = 10;

/** El admin entrega el código a mano por otro canal: 72h es un plazo humano. */
const TOKEN_TTL_HORAS = 72;

export type TipoSolicitud = 'password_reset' | 'account_deletion' | 'data_export';

export interface DatosSolicitud {
  email: string;
  contacto?: string;
  ip?: string;
  userAgent?: string;
}

@Injectable()
export class AccountRequestsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
  ) {}

  // ── Helpers ────────────────────────────────────────────────────────────────

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private sha256(valor: string): string {
    return createHash('sha256').update(valor).digest('hex');
  }

  /** Código legible de un solo uso, con formato XXXXX-XXXXX. */
  private generarCodigo(): string {
    let crudo = '';
    // randomInt del módulo crypto: uniforme y sin el sesgo de módulo que tiene
    // hacer `randomBytes[i] % 31` (256 no es múltiplo de 31).
    for (let i = 0; i < LARGO_CODIGO; i++) crudo += ALFABETO[randomInt(0, ALFABETO.length)];
    return `${crudo.slice(0, 5)}-${crudo.slice(5)}`;
  }

  /** Tolera minúsculas, espacios y guiones de más al momento de canjear. */
  private normalizarCodigo(codigo: string): string {
    return codigo
      .toUpperCase()
      .split('')
      .filter((c) => ALFABETO.includes(c))
      .join('');
  }

  // ── Alta de solicitudes ────────────────────────────────────────────────────

  /**
   * Registra un pedido de recuperación de contraseña.
   *
   * SIEMPRE devuelve la misma respuesta y SIEMPRE deja la fila, exista o no una
   * cuenta con ese email. Son dos cosas distintas y las dos importan: la
   * respuesta uniforme evita que el formulario sirva para averiguar qué emails
   * están registrados, y la fila sin `user_id` te muestra en el panel que
   * alguien está probando emails que no existen.
   */
  async pedirResetDeContrasena(datos: DatosSolicitud) {
    const email = this.normalizeEmail(datos.email);
    const emailHash = this.sha256(email);
    const user = await this.prisma.user.findUnique({ where: { email }, select: { id: true } });
    const contacto = datos.contacto?.trim().slice(0, 500) || null;

    // Un email = un pedido pendiente. Si ya hay uno abierto se actualiza en vez
    // de apilar otro: con el límite de 3/min, alguien podría dejar cientos de
    // filas por hora y enterrar los pedidos reales en la cola del panel. La
    // fecha original NO se toca — es la que cuenta para el plazo de respuesta.
    const abierto = await this.prisma.accountRequest.findFirst({
      where: { type: 'password_reset', emailHash, status: 'pendiente' },
      select: { id: true },
    });

    if (abierto) {
      await this.prisma.accountRequest.update({
        where: { id: abierto.id },
        data: {
          contacto: contacto ?? undefined,
          ip: datos.ip ?? null,
          userAgent: datos.userAgent?.slice(0, 500) ?? null,
          // Si la cuenta se creó después del primer pedido, queda vinculada.
          userId: user?.id ?? null,
        },
      });
    } else {
      await this.prisma.accountRequest.create({
        data: {
          type: 'password_reset',
          userId: user?.id ?? null,
          email,
          emailHash,
          contacto,
          ip: datos.ip ?? null,
          userAgent: datos.userAgent?.slice(0, 500) ?? null,
        },
      });
    }

    return {
      ok: true,
      mensaje:
        'Recibimos tu pedido. Si hay una cuenta con ese email, te vamos a contactar por el medio que dejaste para darte un código de recuperación.',
    };
  }

  // ── Canje del código ───────────────────────────────────────────────────────

  /**
   * Canjea el código y deja la contraseña nueva.
   *
   * Cierra TODAS las sesiones anteriores y devuelve un par de tokens para el
   * dispositivo actual (queda logueada la persona que acaba de elegir la clave).
   * Cerrar el resto es el punto: si el motivo del reset fue que alguien más
   * entró a la cuenta, dejarle su refresh token vivo 30 días vacía de sentido
   * todo el trámite.
   */
  async canjearReset(codigo: string, nuevaPassword: string, meta: SessionMeta) {
    const limpio = this.normalizarCodigo(codigo);
    const invalido = new BadRequestException('El código no es válido o ya venció');
    if (limpio.length !== LARGO_CODIGO) throw invalido;

    const solicitud = await this.prisma.accountRequest.findUnique({
      where: { tokenHash: this.sha256(limpio) },
    });
    if (!solicitud || solicitud.type !== 'password_reset') throw invalido;
    if (solicitud.status !== 'aprobado' || solicitud.tokenUsedAt) throw invalido;
    if (!solicitud.tokenExpiresAt || solicitud.tokenExpiresAt.getTime() < Date.now()) {
      await this.prisma.accountRequest
        .update({ where: { id: solicitud.id }, data: { status: 'vencido' } })
        .catch(() => undefined);
      throw invalido;
    }
    if (!solicitud.userId) throw invalido;

    const user = await this.prisma.user.findUnique({ where: { id: solicitud.userId } });
    if (!user || user.status !== 'active') throw invalido;

    const passwordHash = await argon2.hash(nuevaPassword, { type: argon2.argon2id });
    await this.prisma.user.update({
      where: { id: user.id },
      // El reset también levanta el bloqueo por intentos fallidos: es
      // exactamente la situación de quien se olvidó la clave y la erró ocho veces.
      data: { passwordHash, failedLoginCount: 0, lockedUntil: null },
    });

    await this.prisma.accountRequest.update({
      where: { id: solicitud.id },
      data: { status: 'resuelto', tokenUsedAt: new Date(), resolvedAt: new Date() },
    });

    // Quema cualquier otro código pendiente de la misma cuenta: si se emitieron
    // dos, usar uno tiene que invalidar el otro.
    await this.prisma.accountRequest
      .updateMany({
        where: { userId: user.id, type: 'password_reset', status: 'aprobado', tokenUsedAt: null },
        data: { status: 'vencido' },
      })
      .catch(() => undefined);

    const tokens = await this.auth.rotateAllSessions(user.id, meta);
    return { user: await this.auth.me(user.id), ...tokens };
  }

  // ── Panel de administración ────────────────────────────────────────────────

  async listar(status?: string) {
    const solicitudes = await this.prisma.accountRequest.findMany({
      where: status && status !== 'todas' ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
      take: 200,
      select: {
        id: true,
        type: true,
        userId: true,
        email: true,
        contacto: true,
        status: true,
        tokenExpiresAt: true,
        tokenUsedAt: true,
        notaAdmin: true,
        ip: true,
        detalle: true,
        createdAt: true,
        resolvedAt: true,
        user: { select: { id: true, email: true, nombre: true, createdAt: true, lastLoginAt: true } },
      },
    });

    const pendientes = await this.prisma.accountRequest.count({ where: { status: 'pendiente' } });
    return { solicitudes, pendientes };
  }

  /**
   * Aprueba un pedido de reset y emite el código.
   *
   * El código en claro se devuelve UNA sola vez, acá: en la base queda solo su
   * sha256. Si se pierde, no hay forma de recuperarlo — se aprueba de nuevo y se
   * emite otro (el anterior queda invalidado).
   */
  async aprobar(id: string, notaAdmin?: string) {
    const solicitud = await this.prisma.accountRequest.findUnique({ where: { id } });
    if (!solicitud) throw new NotFoundException('La solicitud no existe');
    if (solicitud.type !== 'password_reset') {
      throw new BadRequestException('Solo se aprueban pedidos de recuperación de contraseña');
    }
    if (!solicitud.userId) {
      throw new BadRequestException(
        'Ese pedido no corresponde a ninguna cuenta registrada: no hay a quién resetearle la contraseña.',
      );
    }

    // Invalida códigos anteriores de la misma cuenta antes de emitir el nuevo.
    await this.prisma.accountRequest.updateMany({
      where: {
        userId: solicitud.userId,
        type: 'password_reset',
        status: 'aprobado',
        tokenUsedAt: null,
        id: { not: id },
      },
      data: { status: 'vencido' },
    });

    const codigo = this.generarCodigo();
    await this.prisma.accountRequest.update({
      where: { id },
      data: {
        status: 'aprobado',
        tokenHash: this.sha256(this.normalizarCodigo(codigo)),
        tokenExpiresAt: new Date(Date.now() + TOKEN_TTL_HORAS * 3_600_000),
        tokenUsedAt: null,
        notaAdmin: notaAdmin?.slice(0, 1000) ?? solicitud.notaAdmin,
      },
    });

    return { ok: true, codigo, venceEnHoras: TOKEN_TTL_HORAS };
  }

  async rechazar(id: string, notaAdmin?: string) {
    const solicitud = await this.prisma.accountRequest.findUnique({ where: { id } });
    if (!solicitud) throw new NotFoundException('La solicitud no existe');

    await this.prisma.accountRequest.update({
      where: { id },
      data: {
        status: 'rechazado',
        resolvedAt: new Date(),
        notaAdmin: notaAdmin?.slice(0, 1000) ?? solicitud.notaAdmin,
        // Un pedido rechazado no deja código utilizable.
        tokenHash: null,
        tokenExpiresAt: null,
      },
    });
    return { ok: true };
  }
}
