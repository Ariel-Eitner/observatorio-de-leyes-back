import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../common/prisma/prisma.service";
import { effectivePlan, PLAN_SELECT, type PlanTier } from "../common/plan";
export type CupoKind = "articulo" | "ley" | "lector" | "exportacion";
export const CUPO_KINDS: CupoKind[] = [
  "articulo",
  "ley",
  "lector",
  "exportacion",
];
export const FREE_DOWNLOAD_LIMIT = 5;
export const CUPOS_POR_PLAN = {
  free: { articulo: 5, ley: 5, exportacion: 5, lector: 1 },
  pro: { articulo: null, ley: null, exportacion: null, lector: 15 },
} as const;
export interface CupoEstado {
  usado: number;
  limite: number | null;
  restante: number | null;
}
export interface CuposResumen {
  plan: PlanTier;
  periodo: { desde: string; hasta: string; renueva: string };
  descargas: CupoEstado;
  cupos: Record<CupoKind, CupoEstado>;
}
export type AutorizarResultado = {
  kind: CupoKind;
  usado: number;
  limite: number | null;
  restante?: number | null;
  renueva: string | null;
} & ({ ok: true } | { ok: false; error: "cupo_agotado" | "kind_invalido" });
function periodoActual(now = new Date()) {
  const local = new Date(+now - 10800000);
  const y = local.getUTCFullYear(),
    m = local.getUTCMonth();
  return {
    desde: new Date(Date.UTC(y, m, 1) + 10800000),
    hasta: new Date(Date.UTC(y, m + 1, 1) + 10800000),
  };
}
const estado = (usado: number, limite: number | null): CupoEstado => ({
  usado,
  limite,
  restante: limite === null ? null : Math.max(0, limite - usado),
});
@Injectable()
export class CuposService {
  constructor(private readonly prisma: PrismaService) {}
  async resumen(userId: string): Promise<CuposResumen> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { ...PLAN_SELECT, freeDownloadsUsed: true, status: true },
    });
    if (!user || user.status !== "active")
      throw new NotFoundException("Cuenta no disponible");
    const plan = effectivePlan(user),
      { desde, hasta } = periodoActual();
    const lector = await this.prisma.downloadLog.count({
      where: { userId, kind: "lector", createdAt: { gte: desde, lt: hasta } },
    });
    const descargas = estado(
      user.freeDownloadsUsed,
      plan === "pro" ? null : FREE_DOWNLOAD_LIMIT,
    );
    return {
      plan,
      periodo: {
        desde: desde.toISOString(),
        hasta: hasta.toISOString(),
        renueva: hasta.toISOString(),
      },
      descargas,
      cupos: {
        articulo: descargas,
        ley: descargas,
        exportacion: descargas,
        lector: estado(lector, CUPOS_POR_PLAN[plan].lector),
      },
    };
  }
  async autorizar(
    userId: string,
    kindRaw: string,
    target?: string | null,
  ): Promise<AutorizarResultado> {
    const kind = kindRaw as CupoKind;
    if (!CUPO_KINDS.includes(kind))
      return {
        ok: false,
        error: "kind_invalido",
        kind,
        usado: 0,
        limite: null,
        renueva: null,
      };
    return this.prisma.$transaction(
      async (tx): Promise<AutorizarResultado> => {
        await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtextextended(${`user:${userId}`},0))`;
        const user = await tx.user.findUnique({
          where: { id: userId },
          select: { ...PLAN_SELECT, freeDownloadsUsed: true, status: true },
        });
        if (!user || user.status !== "active")
          throw new NotFoundException("Cuenta no disponible");
        const plan = effectivePlan(user),
          { desde, hasta } = periodoActual();
        const renueva = kind === "lector" ? hasta.toISOString() : null;
        const limite = CUPOS_POR_PLAN[plan][kind];
        const usado =
          kind === "lector"
            ? await tx.downloadLog.count({
                where: { userId, kind, createdAt: { gte: desde, lt: hasta } },
              })
            : user.freeDownloadsUsed;
        if (limite !== null && usado >= limite)
          return {
            ok: false,
            error: "cupo_agotado",
            kind,
            usado,
            limite,
            renueva,
          };
        if (kind !== "lector" && plan === "free")
          await tx.user.update({
            where: { id: userId },
            data: { freeDownloadsUsed: { increment: 1 } },
          });
        await tx.downloadLog.create({
          data: {
            userId,
            kind,
            target: target ? String(target).slice(0, 300) : null,
          },
        });
        const nuevo = usado + (kind === "lector" || plan === "free" ? 1 : 0);
        return { ok: true, kind, ...estado(nuevo, limite), renueva };
      },
      { timeout: 15000 },
    );
  }
  async getGateState(userId: string): Promise<Record<string, unknown> | null> {
    const u = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { gateState: true },
    });
    return (u?.gateState as Record<string, unknown> | null) ?? null;
  }
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
