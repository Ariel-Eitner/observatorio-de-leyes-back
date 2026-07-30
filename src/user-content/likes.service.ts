import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.lawLike.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: { normId: true, articleId: true, createdAt: true },
    });
  }

  async like(userId: string, dto: LikeDto) {
    const articleId = dto.articleId ?? '';
    await this.prisma.lawLike.upsert({
      where: { userId_normId_articleId: { userId, normId: dto.normId, articleId } },
      create: { userId, normId: dto.normId, articleId },
      update: {},
    });
    return { ok: true, liked: true, normId: dto.normId, articleId };
  }

  async unlike(userId: string, normId: string, articleId = '') {
    await this.prisma.lawLike.deleteMany({ where: { userId, normId, articleId } });
    return { ok: true, liked: false, normId, articleId };
  }

  /** Conteo público (sin auth) de me-gusta de una norma/artículo. */
  async count(normId: string, articleId = '') {
    if (!normId) return { normId: '', articleId, count: 0 };
    const count = await this.prisma.lawLike.count({ where: { normId, articleId } });
    return { normId, articleId, count };
  }
}
