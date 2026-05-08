import { Injectable, NotFoundException } from '@nestjs/common';
import { CONSTITUCION_NACIONAL } from '../data/constitucion-nacional/index';

@Injectable()
export class ConstitutionService {
  getConstitution() {
    return CONSTITUCION_NACIONAL;
  }

  getArticles() {
    return CONSTITUCION_NACIONAL.articles;
  }

  getArticle(number: string) {
    const article = CONSTITUCION_NACIONAL.articles.find((a) => a.number === number);
    if (!article) throw new NotFoundException(`Artículo ${number} no encontrado en la Constitución Nacional`);
    return article;
  }
}
