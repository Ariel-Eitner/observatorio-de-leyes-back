import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { effectivePlan, PLAN_SELECT, type PlanTier } from '../common/plan';

/**
 * Cupos mensuales del plan gratuito + estado del modal por usuario.
 *
 * docs/reglas-por-plan.html §4: el cupo es count(*) de `download_log` en el
 * mes calendario (se renueva el 1°). Se chequea ACÁ, en el servidor, antes de
 * que el navegador imprima el PDF o mande el contrato a analizar: si el conteo
 * viviera en localStorage, el límite se saltearía borrándolo.
 *
 * Pro no tiene límite (null) pero se loguea igual: sirve para métricas y para
 * que /cuenta muestre "este mes bajaste N".
 */

export type CupoKind = 'articulo' | 'ley' | 'lector';
export const CUPO_KINDS: CupoKind[] = ['articulo', 'ley', 'lector'];

// null = ilimitado.
export const CUPOS_POR_PLAN: Record<PlanTier, Record<CupoKind, number | null>> = {
  free: { articulo: 10, ley: 5, lector: 1 },
  pro: { articulo: null, ley: null, lector: 15 },
};

export interface CupoEstado {
  usado: number;
  limite: number | null;
  restante: number | null;
}

export interface CuposResumen {
  plan: PlanTier;
  periodo: { desde: string; hasta: string; renueva: string };
  cupos: Record<CupoKind, CupoEstado>;
}

export type AutorizarResultado =
  | { ok: true; kind: CupoKind; usado: number; limite: number | null; restante: number | null; renueva: string }
  | { ok: false; error: 'cupo_agotado' | 'kind_invalido'; kind: CupoKind; usado: number; limite: number | null; renueva: string };

// El "mes" se corta en hora Argentina, no en UTC: a las 22:00 del 31 todavía
// es el mes viejo para quien está descargando.
const TZ_OFFSET_MS = -3 * 60 * 60 * 1000;

function periodoActual(now = new Date()) {
  const local = new Date(now.getTime() + TZ_OFFSET_MS);
  const y = local.getUTCFullYear();
  const m = local.getUTCMonth();
  const desde = new Date(Date.UTC(y, m, 1) - TZ_OFFSET_MS);
  const hasta = new Date(Date.UTC(y, m + 1, 1) - TZ_OFFSET_MS);
  return { desde, hasta };
}

@Injectable()
export class CuposService {
  constructor(private readonly prisma: PrismaService) {}

  private async planDe(userId: string): Promise<PlanTier> {
    const u = await this.prisma.user.findUnique({ where: { id: userId }, select: PLAN_SELECT });
    if (!u) throw new NotFoundException('Usuario inexistente');
    return effectivePlan(u);
  }

  private async usados(userId: string, desde: Date, hasta: Date): Promise<Record<CupoKind, number>> {
    const rows = await this.prisma.downloadLog.groupBy({
      by: ['kind'],
      where: { userId, createdAt: { gte: desde, lt: hasta } },
      _count: { _all: true },
    });
    const out: Record<CupoKind, number> = { articulo: 0, ley: 0, lector: 0 };
    for (const r of rows) if (r.kind in out) out[r.kind as CupoKind] = r._count._all;
    return out;
  }

  async resumen(userId: string): Promise<CuposResumen> {
    const plan = await this.planDe(userId);
    const { desde, hasta } = periodoActual();
    const usados = await this.usados(userId, desde, hasta);
    const limites = CUPOS_POR_PLAN[plan];
    const cupos = {} as Record<CupoKind, CupoEstado>;
    for (const k of CUPO_KINDS) {
      const limite = limites[k];
      cupos[k] = { usado: usados[k], limite, restante: limite === null ? null : Math.max(0, limite - usados[k]) };
    }
    return {
      plan,
      periodo: { desde: desde.toISOString(), hasta: hasta.toISOString(), renueva: hasta.toISOString() },
      cupos,
    };
  }

  /**
   * Autoriza UNA descarga/análisis y la registra. Conteo e insert en una
   * transacción; dos clicks simultáneos pueden colar uno de más y no importa
   * (es un cupo, no un saldo).
   */
  async autorizar(userId: string, kindRaw: string, target?: string | null): Promise<AutorizarResultado> {
    const kind = kindRaw as CupoKind;
    const { hasta, desde } = periodoActual();
    const renueva = hasta.toISOString();
    if (!CUPO_KINDS.includes(kind)) {
      return { ok: false, error: 'kind_invalido', kind, usado: 0, limite: null, renueva };
    }
    const plan = await this.planDe(userId);
    const limite = CUPOS_POR_PLAN[plan][kind];

    return this.prisma.$transaction(async (tx) => {
      const usado = await tx.downloadLog.count({
        where: { userId, kind, createdAt: { gte: desde, lt: hasta } },
      });
      if (limite !== null && usado >= limite) {
        return { ok: false as const, error: 'cupo_agotado' as const, kind, usado, limite, renueva };
      }
      await tx.downloadLog.create({
        data: { userId, kind, target: target ? String(target).slice(0, 300) : null },
      });
      const nuevo = usado + 1;
      return {
        ok: true as const,
        kind,
        usado: nuevo,
        limite,
        restante: limite === null ? null : Math.max(0, limite - nuevo),
        renueva,
      };
    });
  }

  // ── Estado del modal (cuenta gratis) ────────────────────────────────────────

  async getGateState(userId: string): Promise<Record<string, unknown> | null> {
    const u = await this.prisma.user.findUnique({ where: { id: userId }, select: { gateState: true } });
    return (u?.gateState as Record<string, unknown> | null) ?? null;
  }

  /** Guarda tal cual (con tope de tamaño): la forma la define el front en softgate.ts. */
  async setGateState(userId: string, state: unknown): Promise<{ ok: boolean }> {
    const json = JSON.stringify(state ?? {});
    if (json.length > 4000) return { ok: false };
    await this.prisma.user.update({
      where: { id: userId },
      data: { gateState: JSON.parse(json) as Prisma.InputJsonValue },
    });
    return { ok: true };
  }
}
