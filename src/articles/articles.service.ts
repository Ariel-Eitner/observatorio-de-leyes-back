import { Injectable, NotFoundException } from '@nestjs/common';
import { ALL_LAWS } from '../data';
import { CONSTITUCIONES_PROVINCIALES } from '../data/constituciones-provinciales/index';
import { Article } from '../common/types/law.types';

type ArticleWithLaw = Article & { law: { id: string; number: string; title: string } };

const ALL_SOURCES = [...ALL_LAWS, ...CONSTITUCIONES_PROVINCIALES];

@Injectable()
export class ArticlesService {
  private readonly allArticles: ArticleWithLaw[];

  constructor() {
    this.allArticles = ALL_SOURCES.flatMap((law) =>
      law.articles.map((a) => ({ ...a, law: { id: law.id, number: law.number, title: law.title } })),
    );
  }

  findByLaw(lawId: string) {
    const law = ALL_SOURCES.find((l) => l.id === lawId);
    if (!law) throw new NotFoundException(`Ley con id "${lawId}" no encontrada`);
    return law.articles.sort((a, b) => a.order - b.order);
  }

  findOne(id: string) {
    const article = this.allArticles.find((a) => a.id === id);
    if (!article) throw new NotFoundException(`Artículo con id "${id}" no encontrado`);
    return article;
  }
}
