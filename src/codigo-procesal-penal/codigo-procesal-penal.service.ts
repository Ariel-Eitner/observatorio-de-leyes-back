import { Injectable, NotFoundException } from '@nestjs/common';
import { LEY_27150 } from '../data/ley-27150/index';

@Injectable()
export class CodigoProcesalPenalService {
  getCodigoProcesalPenal() {
    return LEY_27150;
  }

  getArticles() {
    return LEY_27150.articles;
  }

  getArticle(number: string) {
    const article = LEY_27150.articles.find((a) => a.number === number);
    if (!article) throw new NotFoundException(`Artículo ${number} no encontrado en el Código Procesal Penal`);
    return article;
  }
}
