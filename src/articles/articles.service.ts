import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { LawsService } from '../laws/laws.service';
import { Article } from '../common/types/law.types';

type ArticleWithLaw = Article & { law: { id: string; number: string; title: string } };

@Injectable()
export class ArticlesService implements OnModuleInit {
  private allArticles: ArticleWithLaw[] = [];

  constructor(private readonly laws: LawsService) {}

  onModuleInit() {
    this.allArticles = this.laws.getAllNorms().flatMap((law) =>
      law.articles.map((a) => ({ ...a, law: { id: law.id, number: law.number, title: law.title } })),
    );
  }

  findByLaw(lawId: string) {
    const law = this.laws.getAllNorms().find((l) => l.id === lawId);
    if (!law) throw new NotFoundException(`Ley con id "${lawId}" no encontrada`);
    return law.articles.sort((a, b) => a.order - b.order);
  }

  findOne(id: string) {
    const article = this.allArticles.find((a) => a.id === id);
    if (!article) throw new NotFoundException(`Artículo con id "${id}" no encontrado`);
    return article;
  }
}
