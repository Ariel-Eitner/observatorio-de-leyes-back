import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { effectivePlan, PLAN_SELECT } from '../common/plan';
import { CreateRedactorDocDto, UpdateRedactorDocDto, MAX_CONTENT_BYTES } from './dto/redactor-doc.dto';

// Límite de documentos por plan (mismo criterio que FOLDER_LIMITS). El invitado
// sin cuenta tiene 1 en localStorage (probar); la cuenta gratis guarda 3 y el
// plan pago es donde el Redactor se vuelve herramienta de trabajo.
export const REDACTOR_DOC_LIMITS: Record<string, number> = { free: 3, pro: 30, proplus: 100, premium: 100 };
const ADMIN_LIMIT = 9999;

export function redactorDocLimitFor(plan: string | null | undefined, isAdmin: boolean): number {
  if (isAdmin) return ADMIN_LIMIT;
  return REDACTOR_DOC_LIMITS[plan ?? 'free'] ?? 3;
}

@Injectable()
export class RedactorDocsService {
  constructor(private readonly prisma: PrismaService) {}

  private async limitFor(userId: string): Promise<number> {
    const u = await this.prisma.user.findUnique({
      where: { id: userId },
      select: PLAN_SELECT,
    });
    // effectivePlan: un Pro vencido vuelve a 3; un fundador sin plan sigue en 30.
    return redactorDocLimitFor(u ? effectivePlan(u) : 'free', !!u?.isAdmin);
  }

  private checkContent(content: string | undefined) {
    if (content !== undefined && Buffer.byteLength(content, 'utf8') > MAX_CONTENT_BYTES) {
      throw new BadRequestException('El documento supera el tamaño máximo permitido.');
    }
  }

  async list(userId: string) {
    const [docs, limit] = await Promise.all([
      this.prisma.redactorDoc.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        select: { id: true, title: true, content: true, createdAt: true, updatedAt: true },
      }),
      this.limitFor(userId),
    ]);
    return { docs, limit, used: docs.length };
  }

  async create(userId: string, dto: CreateRedactorDocDto) {
    this.checkContent(dto.content);
    const [count, limit] = await Promise.all([
      this.prisma.redactorDoc.count({ where: { userId } }),
      this.limitFor(userId),
    ]);
    if (count >= limit) {
      throw new ForbiddenException(`Llegaste al límite de ${limit} documentos de tu plan.`);
    }
    return this.prisma.redactorDoc.create({
      data: { userId, title: dto.title.trim() || 'Nuevo documento', content: dto.content },
      select: { id: true, title: true, content: true, createdAt: true, updatedAt: true },
    });
  }

  async update(userId: string, id: string, dto: UpdateRedactorDocDto) {
    this.checkContent(dto.content);
    const doc = await this.prisma.redactorDoc.findFirst({ where: { id, userId }, select: { id: true } });
    if (!doc) throw new NotFoundException('Documento no encontrado');
    return this.prisma.redactorDoc.update({
      where: { id },
      data: {
        ...(dto.title !== undefined ? { title: dto.title.trim() || 'Sin título' } : {}),
        ...(dto.content !== undefined ? { content: dto.content } : {}),
      },
      select: { id: true, title: true, content: true, createdAt: true, updatedAt: true },
    });
  }

  async remove(userId: string, id: string) {
    const doc = await this.prisma.redactorDoc.findFirst({ where: { id, userId }, select: { id: true } });
    if (!doc) throw new NotFoundException('Documento no encontrado');
    await this.prisma.redactorDoc.delete({ where: { id } });
    return { ok: true, id };
  }
}
