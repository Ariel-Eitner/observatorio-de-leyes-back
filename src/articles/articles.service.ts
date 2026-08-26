import { Injectable, NotFoundException } from '@nestjs/common';
import { LawsService } from '../laws/laws.service';
import { NormsDbService } from '../norms-db/norms-db.service';

/**
 * Artículos sueltos, resueltos contra la BD.
 *
 * Antes esto armaba un índice de los 49.518 artículos del corpus en
 * `onModuleInit`. Tenía dos problemas: era una segunda copia entera del cuerpo en
 * memoria, y sobre todo se armaba ANTES de que la hidratación terminara (que es
 * asíncrona a propósito), así que el índice quedaba vacío para siempre y
 * `findOne` contestaba 404 a ids que existían. Ahora se resuelve por consulta.
 */
@Injectable()
export class ArticlesService {
  constructor(
    private readonly laws: LawsService,
    private readonly normsDb: NormsDbService,
  ) {}

  async findByLaw(lawId: string, limit?: number) {
    const law = await this.laws.getFullNorm(lawId);
    if (!law) throw new NotFoundException(`Ley con id "${lawId}" no encontrada`);
    const ordenados = [...law.articles].sort((a, b) => a.order - b.order);
    return limit ? ordenados.slice(0, limit) : ordenados;
  }

  async findOne(id: string) {
    const normId = await this.normsDb.normIdOfArticle(id);
    const law = normId ? await this.laws.getFullNorm(normId) : null;
    const article = law?.articles.find((a) => a.id === id);
    if (!law || !article) throw new NotFoundException(`Artículo con id "${id}" no encontrado`);
    return { ...article, law: { id: law.id, number: law.number, title: law.title } };
  }
}
