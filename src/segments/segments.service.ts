import { Injectable, NotFoundException } from '@nestjs/common';
import { ALL_LAWS } from '../data/ley-25326.data';
import { LawSegment } from '../common/types/law.types';

@Injectable()
export class SegmentsService {
  private get allSegments(): LawSegment[] {
    return ALL_LAWS.flatMap((law) => [
      ...law.segments,
      ...law.articles.flatMap((a) => a.segments),
    ]);
  }

  findByLaw(lawId: string) {
    const law = ALL_LAWS.find((l) => l.id === lawId);
    if (!law) throw new NotFoundException(`Ley con id "${lawId}" no encontrada`);
    const articleSegments = law.articles.flatMap((a) => a.segments);
    return [...law.segments, ...articleSegments].sort((a, b) => a.order - b.order);
  }

  findByArticle(articleId: string) {
    return this.allSegments
      .filter((s) => s.articleId === articleId)
      .sort((a, b) => a.order - b.order);
  }

  findOne(id: string) {
    const segment = this.allSegments.find((s) => s.id === id);
    if (!segment) throw new NotFoundException(`Segmento con id "${id}" no encontrado`);
    return segment;
  }
}
