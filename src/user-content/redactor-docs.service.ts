import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { createHash } from "node:crypto";
import { effectivePlan, PLAN_SELECT } from "../common/plan";
import {
  CreateRedactorDocDto,
  UpdateRedactorDocDto,
  MAX_CONTENT_BYTES,
} from "./dto/redactor-doc.dto";

// Límite de documentos por plan (mismo criterio que FOLDER_LIMITS). El invitado
// sin cuenta tiene 1 en localStorage (probar); la cuenta gratis guarda 3 y el
// plan pago es donde el Redactor se vuelve herramienta de trabajo.
export const REDACTOR_DOC_LIMITS: Record<string, number> = {
  free: 3,
  pro: 30,
  proplus: 100,
  premium: 100,
};
const ADMIN_LIMIT = 9999;

export function redactorDocLimitFor(
  plan: string | null | undefined,
  isAdmin: boolean,
): number {
  if (isAdmin) return ADMIN_LIMIT;
  return REDACTOR_DOC_LIMITS[plan ?? "free"] ?? 3;
}

@Injectable()
export class RedactorDocsService {
  constructor(private readonly prisma: PrismaService) {}

  private async limitFor(
    userId: string,
    db: Pick<PrismaService, "user"> = this.prisma,
  ): Promise<number> {
    const u = await db.user.findUnique({
      where: { id: userId },
      select: { ...PLAN_SELECT, status: true },
    });
    if (!u || u.status !== "active" || effectivePlan(u) !== "pro")
      throw new ForbiddenException(
        "El Redactor Legal está disponible con Pro.",
      );
    return redactorDocLimitFor(effectivePlan(u), u.isAdmin);
  }

  private checkContent(content: string | undefined) {
    if (
      content !== undefined &&
      Buffer.byteLength(content, "utf8") > MAX_CONTENT_BYTES
    ) {
      throw new BadRequestException(
        "El documento supera el tamaño máximo permitido.",
      );
    }
  }

  async list(userId: string, summary = false, offset = 0) {
    const limit = await this.limitFor(userId);
    const [rows, used] = await Promise.all([
      this.prisma.redactorDoc.findMany({
        where: { userId },
        orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
        skip: offset,
        take: summary ? 31 : 101,
        select: {
          id: true,
          title: true,
          content: !summary,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.redactorDoc.count({ where: { userId } }),
    ]);
    const pageSize = summary ? 30 : 100;
    return {
      docs: rows.slice(0, pageSize),
      limit,
      used,
      nextOffset: rows.length > pageSize ? offset + pageSize : null,
    };
  }

  async get(userId: string, id: string) {
    await this.limitFor(userId);
    const doc = await this.prisma.redactorDoc.findFirst({
      where: { id, userId },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!doc) throw new NotFoundException("Documento no encontrado");
    return doc;
  }

  async create(userId: string, dto: CreateRedactorDocDto) {
    this.checkContent(dto.content);
    const hex = dto.clientId
      ? createHash("sha256")
          .update(`${userId}:${dto.clientId}`)
          .digest("hex")
          .slice(0, 32)
      : null;
    const id = hex
      ? `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
      : undefined;
    return this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT id FROM users WHERE id = ${userId}::uuid FOR UPDATE`;
      const limit = await this.limitFor(userId, tx);
      if (id) {
        const existing = await tx.redactorDoc.findFirst({
          where: { id, userId },
        });
        if (existing) return existing;
      }
      const count = await tx.redactorDoc.count({ where: { userId } });
      if (count >= limit) {
        throw new ForbiddenException(
          `Llegaste al límite de ${limit} documentos de tu plan.`,
        );
      }
      return tx.redactorDoc.create({
        data: {
          id,
          userId,
          title: dto.title.trim() || "Nuevo documento",
          content: dto.content,
        },
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    });
  }

  async update(userId: string, id: string, dto: UpdateRedactorDocDto) {
    await this.limitFor(userId);
    this.checkContent(dto.content);
    const doc = await this.prisma.redactorDoc.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!doc) throw new NotFoundException("Documento no encontrado");
    return this.prisma.redactorDoc.update({
      where: { id },
      data: {
        ...(dto.title !== undefined
          ? { title: dto.title.trim() || "Sin título" }
          : {}),
        ...(dto.content !== undefined ? { content: dto.content } : {}),
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(userId: string, id: string) {
    const doc = await this.prisma.redactorDoc.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!doc) throw new NotFoundException("Documento no encontrado");
    await this.prisma.redactorDoc.delete({ where: { id } });
    return { ok: true, id };
  }
}
