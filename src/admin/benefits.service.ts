import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

/**
 * Otorgamiento MANUAL del beneficio de donante (Fundador + Plan Pro).
 *
 * POR QUÉ ES MANUAL: antes el beneficio se otorgaba solo, cruzando el email de
 * la cuenta contra la tabla de donantes al registrarse o iniciar sesión. Como no
 * hay verificación de email, eso significaba que cualquiera que conociera el
 * email de un donante podía registrarse con él y llevarse el badge y un año de
 * Pro. Ahora lo otorga el admin contra el comprobante en MercadoPago — el mismo
 * flujo de dos niveles que ya se usaba para confirmar los pagos.
 *
 * El usuario lo pide desde /cuenta ("reclamar donación") y eso crea la fila en
 * benefit_claims que se resuelve acá.
 */
@Injectable()
export class BenefitsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Reclamos con el email y el nombre de la cuenta que los hizo. */
  async listClaims(status?: string) {
    const claims = await this.prisma.benefitClaim.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    if (claims.length === 0) return [];

    // benefit_claims no tiene relación Prisma con users (solo el scalar), así
    // que el usuario se trae aparte y se une en memoria.
    const users = await this.prisma.user.findMany({
      where: { id: { in: [...new Set(claims.map((c) => c.userId))] } },
      select: { id: true, email: true, nombre: true, plan: true, planUntil: true, isFounder: true },
    });
    const porId = new Map(users.map((u) => [u.id, u]));

    return claims.map((c) => ({
      id: c.id,
      status: c.status,
      email: c.email,
      monto: c.monto,
      fecha: c.fecha,
      medio: c.medio,
      detalle: c.detalle,
      comprobanteUrl: c.comprobanteUrl,
      createdAt: c.createdAt,
      usuario: porId.get(c.userId) ?? null,
    }));
  }

  /**
   * Otorga (o quita) el beneficio a una cuenta. `meses` extiende el Pro; si la
   * cuenta ya tenía una fecha más lejana se respeta la más lejana, para no
   * degradar por error un beneficio ya concedido.
   */
  async setBenefit(userId: string, otorgar: boolean, meses = 12) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    if (!otorgar) {
      const actualizado = await this.prisma.user.update({
        where: { id: userId },
        data: { isFounder: false, plan: 'free', planUntil: null },
      });
      return this.resumen(actualizado);
    }

    if (!Number.isFinite(meses) || meses < 1 || meses > 1200) {
      throw new BadRequestException('Cantidad de meses inválida');
    }
    const hasta = new Date(Date.now() + meses * 30 * 86_400_000);
    const planUntil = user.planUntil && user.planUntil > hasta ? user.planUntil : hasta;

    const actualizado = await this.prisma.user.update({
      where: { id: userId },
      data: { isFounder: true, plan: 'pro', planUntil },
    });
    return this.resumen(actualizado);
  }

  /** Resuelve un reclamo y, si se verifica, otorga el beneficio en el acto. */
  async resolveClaim(claimId: string, status: 'verificado' | 'rechazado', meses = 12) {
    if (status !== 'verificado' && status !== 'rechazado') {
      throw new BadRequestException('Estado inválido');
    }
    const claim = await this.prisma.benefitClaim.findUnique({ where: { id: claimId } });
    if (!claim) throw new NotFoundException('Reclamo no encontrado');

    await this.prisma.benefitClaim.update({ where: { id: claimId }, data: { status } });
    if (status === 'rechazado') return { ok: true, status, usuario: null };

    const usuario = await this.setBenefit(claim.userId, true, meses);
    return { ok: true, status, usuario };
  }

  private resumen(u: {
    id: string;
    email: string;
    plan: string;
    planUntil: Date | null;
    isFounder: boolean;
  }) {
    return {
      id: u.id,
      email: u.email,
      plan: u.plan,
      planUntil: u.planUntil,
      isFounder: u.isFounder,
    };
  }
}
