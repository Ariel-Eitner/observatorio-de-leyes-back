import { Injectable, NotFoundException } from '@nestjs/common';
import { ALL_LAWS } from '../data/ley-25326.data';
import { Article } from '../common/types/law.types';

@Injectable()
export class ArticlesService {
  private get allArticles(): (Article & { law: { id: string; number: string; title: string } })[] {
    return ALL_LAWS.flatMap((law) =>
      law.articles.map((a) => ({ ...a, law: { id: law.id, number: law.number, title: law.title } })),
    );
  }

  findByLaw(lawId: string) {
    const law = ALL_LAWS.find((l) => l.id === lawId);
    if (!law) throw new NotFoundException(`Ley con id "${lawId}" no encontrada`);
    return law.articles.sort((a, b) => a.order - b.order);
  }

  findOne(id: string) {
    const article = this.allArticles.find((a) => a.id === id);
    if (!article) throw new NotFoundException(`Artículo con id "${id}" no encontrado`);
    return article;
  }
}
