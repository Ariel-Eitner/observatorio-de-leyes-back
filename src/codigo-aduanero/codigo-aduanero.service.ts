import { Injectable, NotFoundException } from '@nestjs/common';
import { CODIGO_ADUANERO } from '../data/codigo-aduanero/index';

@Injectable()
export class CodigoAduaneroService {
  getCodigoAduanero() {
    return CODIGO_ADUANERO;
  }

  getArticles() {
    return CODIGO_ADUANERO.articles;
  }

  getArticle(number: string) {
    const article = CODIGO_ADUANERO.articles.find((a) => a.number === number);
    if (!article) throw new NotFoundException(`Artículo ${number} no encontrado en el Código Aduanero`);
    return article;
  }
}
