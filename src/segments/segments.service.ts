import { Injectable, NotFoundException } from '@nestjs/common';
import { LawsService } from '../laws/laws.service';
import { NormsDbService } from '../norms-db/norms-db.service';
import { LawSegment } from '../common/types/law.types';

/**
 * Segmentos sueltos, resueltos contra la BD. Mismo cambio que ArticlesService:
 * el índice global que había acá se armaba antes de que la hidratación terminara
 * y quedaba vacío, así que `findOne` y `findByArticle` no encontraban nada.
 */
@Injectable()
export class SegmentsService {
  constructor(
    private readonly laws: LawsService,
    private readonly normsDb: NormsDbService,
  ) {}

  private todos(law: { segments: LawSegment[]; articles: { segments: LawSegment[] }[] }): LawSegment[] {
    return [...law.segments, ...law.articles.flatMap((a) => a.segments)];
  }

  async findByLaw(lawId: string) {
    const law = await this.laws.getFullNorm(lawId);
    if (!law) throw new NotFoundException(`Ley con id "${lawId}" no encontrada`);
    return this.todos(law).sort((a, b) => a.order - b.order);
  }

  async findByArticle(articleId: string) {
    const normId = await this.normsDb.normIdOfArticle(articleId);
    const law = normId ? await this.laws.getFullNorm(normId) : null;
    if (!law) return [];
    return this.todos(law)
      .filter((s) => s.articleId === articleId)
      .sort((a, b) => a.order - b.order);
  }

  async findOne(id: string) {
    const normId = await this.normsDb.normIdOfSegment(id);
    const law = normId ? await this.laws.getFullNorm(normId) : null;
    const segment = law ? this.todos(law).find((s) => s.id === id) : undefined;
    if (!segment) throw new NotFoundException(`Segmento con id "${id}" no encontrado`);
    return segment;
  }
}
