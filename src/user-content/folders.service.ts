import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateFolderDto } from './dto/folder.dto';

// Límite de carpetas por plan. El admin no tiene límite. Los Fundadores/donantes
// tienen plan 'pro'. 'proplus'/'premium' quedan definidos para cuando existan.
export const FOLDER_LIMITS: Record<string, number> = { free: 3, pro: 10, proplus: 30, premium: 30 };
export const ADMIN_LIMIT = 9999;

// Fuente única del límite de carpetas (la usa también /users/me/overview).
export function folderLimitFor(plan: string | null | undefined, isAdmin: boolean): number {
  if (isAdmin) return ADMIN_LIMIT;
  return FOLDER_LIMITS[plan ?? 'free'] ?? 3;
}

@Injectable()
export class FoldersService {
  constructor(private readonly prisma: PrismaService) {}

  private async limitFor(userId: string): Promise<number> {
    const u = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true, isAdmin: true },
    });
    return folderLimitFor(u?.plan, !!u?.isAdmin);
  }

  async list(userId: string) {
    const [folders, limit, noFolderCount] = await Promise.all([
      this.prisma.folder.findMany({
        where: { userId },
        orderBy: [{ ord: 'asc' }, { createdAt: 'asc' }],
        select: { id: true, name: true, _count: { select: { savedLaws: true } } },
      }),
      this.limitFor(userId),
      this.prisma.savedLaw.count({ where: { userId, folderId: null } }),
    ]);
    return {
      folders: folders.map((f) => ({ id: f.id, name: f.name, count: f._count.savedLaws })),
      limit,
      used: folders.length,
      noFolderCount,
    };
  }

  async create(userId: string, dto: CreateFolderDto) {
    const [count, limit] = await Promise.all([
      this.prisma.folder.count({ where: { userId } }),
      this.limitFor(userId),
    ]);
    if (count >= limit) {
      throw new ForbiddenException(`Llegaste al límite de ${limit} carpetas de tu plan.`);
    }
    const f = await this.prisma.folder.create({ data: { userId, name: dto.name.trim(), ord: count } });
    return { id: f.id, name: f.name, count: 0 };
  }

  async rename(userId: string, id: string, name: string) {
    const f = await this.prisma.folder.findFirst({ where: { id, userId } });
    if (!f) throw new NotFoundException('Carpeta no encontrada');
    await this.prisma.folder.update({ where: { id }, data: { name: name.trim() } });
    return { ok: true, id, name: name.trim() };
  }

  async remove(userId: string, id: string) {
    // La FK usa ON DELETE SET NULL: las leyes de la carpeta quedan "sin carpeta".
    const f = await this.prisma.folder.findFirst({ where: { id, userId } });
    if (!f) throw new NotFoundException('Carpeta no encontrada');
    await this.prisma.folder.delete({ where: { id } });
    return { ok: true, id };
  }
}
