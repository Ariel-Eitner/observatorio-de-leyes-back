import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { PrismaService } from '../common/prisma/prisma.service';
import { AuthService, SessionMeta } from '../auth/auth.service';
import { ClaimDonationDto } from './dto/claim-donation.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { folderLimitFor } from '../user-content/folders.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
  ) {}

  // ── Reclamos de donación ──────────────────────────────────────────────────────

  createClaim(userId: string, email: string, dto: ClaimDonationDto) {
    return this.prisma.benefitClaim.create({
      data: {
        userId,
        email,
        detalle: dto.detalle,
        monto: dto.monto ?? null,
        fecha: dto.fecha ?? null,
        medio: dto.medio ?? null,
        comprobanteUrl: dto.comprobanteUrl ?? null,
      },
      select: { id: true, status: true, createdAt: true },
    });
  }

  listClaims(userId: string) {
    return this.prisma.benefitClaim.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: { id: true, status: true, monto: true, medio: true, detalle: true, createdAt: true },
    });
  }

  // ── Perfil ────────────────────────────────────────────────────────────────────

  /** Actualiza el perfil (nombre + opcionales) y devuelve el usuario en el mismo
   *  formato que /auth/me. Campos ausentes (undefined) no se tocan; string vacío
   *  limpia el dato. Prisma ignora las claves undefined. */
  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const norm = (v?: string) => (v === undefined ? undefined : v.trim() || null);
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        nombre: norm(dto.nombre),
        apellido: norm(dto.apellido),
        telefono: norm(dto.telefono),
        tipoUsuario: norm(dto.tipoUsuario),
        profesion: norm(dto.profesion),
        especialidad: norm(dto.especialidad),
        empresa: norm(dto.empresa),
        provincia: norm(dto.provincia),
      },
    });
    return this.auth.me(userId);
  }

  /**
   * Cambia la contraseña verificando la actual y CIERRA TODAS las sesiones.
   *
   * Cerrar las sesiones es el punto: cambiar la clave es lo que hace alguien que
   * sospecha que le entraron a la cuenta, y si las sesiones viejas sobreviven el
   * atacante se queda adentro 30 días más con su refresh token. Se devuelve un
   * par de tokens nuevo para el dispositivo actual, así quien hizo el cambio no
   * se auto-expulsa; el front los guarda en las cookies.
   */
  async changePassword(userId: string, dto: ChangePasswordDto, meta: SessionMeta) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const ok = await argon2.verify(user.passwordHash, dto.currentPassword).catch(() => false);
    if (!ok) throw new UnauthorizedException('La contraseña actual es incorrecta');

    const passwordHash = await argon2.hash(dto.newPassword, { type: argon2.argon2id });
    await this.prisma.user.update({
      where: { id: userId },
      // Cambiar la clave también levanta un bloqueo por intentos fallidos.
      data: { passwordHash, failedLoginCount: 0, lockedUntil: null },
    });

    const tokens = await this.auth.rotateAllSessions(userId, meta);
    return { ok: true, sesionesCerradas: true, ...tokens };
  }

  // ── Bootstrap de la cuenta ──────────────────────────────────────────────────────

  /**
   * Todo lo que la app necesita al iniciar sesión, en un solo request: perfil,
   * leyes guardadas y carpetas. Reemplaza a /auth/me + /saved-laws + /folders.
   * Los conteos (por carpeta, sin-carpeta) se derivan de la lista de guardadas,
   * así son solo 3 queries y sin repetir user.findUnique. Stats va aparte
   * (solo la necesita /cuenta y usa una agregación más cara sobre tracking).
   */
  async overview(userId: string) {
    const [user, saved, folders] = await Promise.all([
      this.auth.me(userId),
      this.prisma.savedLaw.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: { normId: true, nota: true, folderId: true, createdAt: true },
      }),
      this.prisma.folder.findMany({
        where: { userId },
        orderBy: [{ ord: 'asc' }, { createdAt: 'asc' }],
        select: { id: true, name: true },
      }),
    ]);

    // Conteos derivados de la lista de guardadas (sin queries extra).
    const perFolder = new Map<string, number>();
    let noFolderCount = 0;
    for (const s of saved) {
      if (s.folderId) perFolder.set(s.folderId, (perFolder.get(s.folderId) ?? 0) + 1);
      else noFolderCount++;
    }

    return {
      user,
      saved,
      folders: {
        folders: folders.map((f) => ({ id: f.id, name: f.name, count: perFolder.get(f.id) ?? 0 })),
        limit: folderLimitFor(user.plan, user.isAdmin),
        used: folders.length,
        noFolderCount,
      },
    };
  }

  // ── Métricas propias del usuario (para /cuenta) ────────────────────────────────

  /** Contadores de actividad del usuario. Descargas/herramientas salen de
   *  tracking_events (se pueblan en producción); guardadas es dato directo. */
  async stats(userId: string) {
    const savedLaws = await this.prisma.savedLaw.count({ where: { userId } });
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { createdAt: true, lastLoginAt: true },
    });

    let downloads = 0;
    let tools = 0;
    let lastActivity: Date | null = user?.lastLoginAt ?? null;
    try {
      const rows = await this.prisma.$queryRaw<Array<{ downloads: bigint; tools: bigint; last: Date | null }>>`
        SELECT
          count(*) FILTER (WHERE type IN ('descarga_completed','contract_informe_descargado','producto_pdf_descargado','redactor_export_pdf','redactor_export_word','redactor_export_text')) AS downloads,
          count(*) FILTER (WHERE type ~ '^(redactor_|contract_|calc|calculadora|escrito|producto|mapa)') AS tools,
          max(created_at) AS last
        FROM tracking_events WHERE user_id = ${userId}`;
      const r = rows[0];
      if (r) {
        downloads = Number(r.downloads);
        tools = Number(r.tools);
        if (r.last) lastActivity = r.last;
      }
    } catch {
      /* el tracking es opcional */
    }

    return { savedLaws, downloads, tools, memberSince: user?.createdAt ?? null, lastActivity };
  }
}
