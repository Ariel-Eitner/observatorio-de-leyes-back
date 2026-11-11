import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../common/prisma/prisma.service";
import { effectivePlan, type PlanTier } from "../common/plan";
import { COMMERCIAL_POLICY } from "../commercial/catalog";
import {
  creditBalance,
  syncQuotaNotice,
} from "../notifications/account-notices";
export type CupoKind = "articulo" | "ley" | "lector" | "exportacion";
export const CUPO_KINDS: CupoKind[] = [
  "articulo",
  "ley",
  "lector",
  "exportacion",
];
export const FREE_DOWNLOAD_LIMIT = COMMERCIAL_POLICY.freeLaws;
export const CUPOS_POR_PLAN = {
  free: {
    articulo: FREE_DOWNLOAD_LIMIT,
    ley: FREE_DOWNLOAD_LIMIT,
    exportacion: 0,
    lector: COMMERCIAL_POLICY.freeContractAnalyses,
  },
  pro: {
    articulo: null,
    ley: null,
    exportacion: null,
    lector: COMMERCIAL_POLICY.proContractAnalyses,
  },
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
  compradas: {
    restante: number;
    lotes: { remaining: number; expiresAt: string }[];
  };
  leyesDisponibles: { normId: string; expiresAt: string }[];
  cupos: Record<CupoKind, CupoEstado>;
}
export type AutorizarResultado = {
  kind: CupoKind;
  usado: number;
  limite: number | null;
  restante?: number | null;
  renueva: string | null;
  reutilizada?: boolean;
  disponibleHasta?: string;
} & (
  | { ok: true }
  | { ok: false; error: "cupo_agotado" | "kind_invalido" | "solo_pro" }
);
function periodoActual(now = new Date()) {
  const local = new Date(+now - 10800000),
    y = local.getUTCFullYear(),
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
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.status !== "active")
      throw new NotFoundException("Cuenta no disponible");
    const plan = effectivePlan(user),
      { desde, hasta } = periodoActual(),
      now = new Date();
    const [lector, lots, access] = await Promise.all([
      this.prisma.downloadLog.count({
        where: { userId, kind: "lector", createdAt: { gte: desde, lt: hasta } },
      }),
      this.prisma.downloadCredit.findMany({
        where: {
          userId,
          revokedAt: null,
          expiresAt: { gt: now },
          remaining: { gt: 0 },
        },
        orderBy: { expiresAt: "asc" },
      }),
      this.prisma.lawDownloadAccess.findMany({
        where: { userId, expiresAt: { gt: now } },
        orderBy: { expiresAt: "asc" },
      }),
    ]);
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
      compradas: {
        restante: lots.reduce((s, l) => s + l.remaining, 0),
        lotes: lots.map((l) => ({
          remaining: l.remaining,
          expiresAt: l.expiresAt.toISOString(),
        })),
      },
      leyesDisponibles: access.map((a) => ({
        normId: a.normId,
        expiresAt: a.expiresAt.toISOString(),
      })),
      cupos: {
        articulo: descargas,
        ley: descargas,
        exportacion: estado(0, plan === "pro" ? null : 0),
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
      async (tx) => {
        await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtextextended(${`user:${userId}`},0))`;
        const user = await tx.user.findUnique({ where: { id: userId } });
        if (!user || user.status !== "active")
          throw new NotFoundException("Cuenta no disponible");
        const plan = effectivePlan(user),
          now = new Date(),
          { desde, hasta } = periodoActual(now);
        const renueva = kind === "lector" ? hasta.toISOString() : null;
        const limite = CUPOS_POR_PLAN[plan][kind];
        const usado =
          kind === "lector"
            ? await tx.downloadLog.count({
                where: { userId, kind, createdAt: { gte: desde, lt: hasta } },
              })
            : user.freeDownloadsUsed;
        if (kind === "exportacion" && plan !== "pro")
          return {
            ok: false,
            error: "solo_pro",
            kind,
            usado: 0,
            limite: 0,
            renueva: null,
          };
        if (kind === "lector") {
          if (limite !== null && usado >= limite)
            return {
              ok: false,
              error: "cupo_agotado",
              kind,
              usado,
              limite,
              renueva,
            };
          await tx.downloadLog.create({
            data: { userId, kind, target: target?.slice(0, 300) },
          });
          return { ok: true, kind, ...estado(usado + 1, limite), renueva };
        }
        if (kind === "exportacion") {
          await tx.downloadLog.create({
            data: { userId, kind, target: target?.slice(0, 300) },
          });
          return { ok: true, kind, ...estado(0, null), renueva: null };
        }
        const normId = target?.split("#")[0];
        if (!normId || normId.length > 300)
          throw new BadRequestException("Elegí la ley que querés descargar.");
        if (
          !(await tx.norms.findUnique({
            where: { id: normId },
            select: { id: true },
          }))
        )
          throw new NotFoundException("La ley no está disponible.");
        const access = await tx.lawDownloadAccess.findUnique({
          where: { userId_normId: { userId, normId } },
        });
        if (access && +access.expiresAt > +now) {
          await tx.downloadLog.create({ data: { userId, kind, target } });
          return {
            ok: true,
            kind,
            ...estado(usado, limite),
            renueva: null,
            reutilizada: true,
            disponibleHasta: access.expiresAt.toISOString(),
          };
        }
        let source = "pro",
          creditId: string | undefined;
        if (plan !== "pro") {
          if (user.freeDownloadsUsed < FREE_DOWNLOAD_LIMIT) {
            await tx.user.update({
              where: { id: userId },
              data: { freeDownloadsUsed: { increment: 1 } },
            });
            user.freeDownloadsUsed++;
            source = "free";
          } else {
            const lot = await tx.downloadCredit.findFirst({
              where: {
                userId,
                revokedAt: null,
                expiresAt: { gt: now },
                remaining: { gt: 0 },
              },
              orderBy: [{ expiresAt: "asc" }, { id: "asc" }],
            });
            if (!lot) {
              await syncQuotaNotice(tx, user);
              return {
                ok: false,
                error: "cupo_agotado",
                kind,
                usado,
                limite,
                renueva: null,
              };
            }
            await tx.downloadCredit.update({
              where: { id: lot.id },
              data: { remaining: { decrement: 1 } },
            });
            source = "paid";
            creditId = lot.id;
          }
        }
        const expiresAt = new Date(
          +now + COMMERCIAL_POLICY.redownloadDays * 86400000,
        );
        await tx.lawDownloadAccess.upsert({
          where: { userId_normId: { userId, normId } },
          create: { userId, normId, source, creditId, expiresAt },
          update: {
            source,
            creditId: creditId ?? null,
            expiresAt,
            createdAt: now,
          },
        });
        await tx.downloadLog.create({ data: { userId, kind, target } });
        await syncQuotaNotice(tx, user);
        return {
          ok: true,
          kind,
          ...estado(user.freeDownloadsUsed, limite),
          renueva: null,
          reutilizada: false,
          disponibleHasta: expiresAt.toISOString(),
        };
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
