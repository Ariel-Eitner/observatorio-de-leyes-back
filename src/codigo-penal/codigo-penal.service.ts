import { Injectable, NotFoundException } from '@nestjs/common';
import { CODIGO_PENAL } from '../data/codigo-penal/index';

@Injectable()
export class CodigoPenalService {
  getCodigoPenal() {
    return CODIGO_PENAL;
  }

  getArticles() {
    return CODIGO_PENAL.articles;
  }

  getArticle(number: string) {
    const article = CODIGO_PENAL.articles.find((a) => a.number === number);
    if (!article) throw new NotFoundException(`Artículo ${number} no encontrado en el Código Penal`);
    return article;
  }
}
