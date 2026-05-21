import { Injectable, NotFoundException } from '@nestjs/common';
import { ALL_LAWS } from '../data';
import { CONSTITUCIONES_PROVINCIALES } from '../data/constituciones-provinciales/index';
import { LawSegment } from '../common/types/law.types';

const ALL_SOURCES = [...ALL_LAWS, ...CONSTITUCIONES_PROVINCIALES];

@Injectable()
export class SegmentsService {
  private readonly allSegments: LawSegment[];

  constructor() {
    this.allSegments = ALL_SOURCES.flatMap((law) => [
      ...law.segments,
      ...law.articles.flatMap((a) => a.segments),
    ]);
  }

  findByLaw(lawId: string) {
    const law = ALL_SOURCES.find((l) => l.id === lawId);
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
