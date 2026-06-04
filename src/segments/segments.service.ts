import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { LawsService } from '../laws/laws.service';
import { LawSegment } from '../common/types/law.types';

@Injectable()
export class SegmentsService implements OnModuleInit {
  private allSegments: LawSegment[] = [];

  constructor(private readonly laws: LawsService) {}

  onModuleInit() {
    this.allSegments = this.laws.getAllNorms().flatMap((law) => [
      ...law.segments,
      ...law.articles.flatMap((a) => a.segments),
    ]);
  }

  findByLaw(lawId: string) {
    const law = this.laws.getAllNorms().find((l) => l.id === lawId);
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
