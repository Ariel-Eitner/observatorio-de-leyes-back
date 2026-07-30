import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { SaveLawDto } from './dto/save-law.dto';
import { NotaDto } from './dto/nota.dto';

@Injectable()
export class SavedLawsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Valida que la carpeta sea del usuario. "" o ausente → null (sin carpeta). */
  private async resolveFolder(userId: string, folderId?: string): Promise<string | null> {
    if (!folderId) return null;
    const f = await this.prisma.folder.findFirst({ where: { id: folderId, userId }, select: { id: true } });
    return f ? f.id : null;
  }

  /** Lista completa de leyes guardadas del usuario (para "Mis leyes"). */
  list(userId: string) {
    return this.prisma.savedLaw.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: { normId: true, nota: true, folderId: true, createdAt: true },
    });
  }

  /** Solo los ids — para que el front pinte el estado del ícono en una página. */
  async ids(userId: string): Promise<string[]> {
    const rows = await this.prisma.savedLaw.findMany({ where: { userId }, select: { normId: true } });
    return rows.map((r) => r.normId);
  }

  /** Guardar es idempotente. Si viene folderId, guarda/mueve a esa carpeta. */
  async save(userId: string, dto: SaveLawDto) {
    const folderId = dto.folderId !== undefined ? await this.resolveFolder(userId, dto.folderId) : null;
    await this.prisma.savedLaw.upsert({
      where: { userId_normId: { userId, normId: dto.normId } },
      create: { userId, normId: dto.normId, nota: dto.nota ?? null, folderId },
      update: dto.folderId !== undefined ? { folderId } : {},
    });
    return { ok: true, saved: true, normId: dto.normId, folderId };
  }

  async remove(userId: string, normId: string) {
    await this.prisma.savedLaw.deleteMany({ where: { userId, normId } });
    return { ok: true, saved: false, normId };
  }

  /** Editar nota y/o mover de carpeta. Campos ausentes no se tocan. */
  async updateSaved(userId: string, normId: string, dto: NotaDto) {
    const data: Prisma.SavedLawUncheckedUpdateInput = {};
    if (dto.nota !== undefined) data.nota = dto.nota?.trim() || null;
    if (dto.folderId !== undefined) data.folderId = await this.resolveFolder(userId, dto.folderId);
    if (Object.keys(data).length > 0) {
      // update (no updateMany) porque folderId es un FK escalar: solo está en el
      // input "unchecked". userId_normId es la clave única compuesta.
      try {
        await this.prisma.savedLaw.update({ where: { userId_normId: { userId, normId } }, data });
      } catch {
        /* la ley no está guardada: ignorar */
      }
    }
    return { ok: true, normId };
  }
}
