import { Injectable, NotFoundException } from '@nestjs/common';
import { LEY_20744 } from '../data/ley-20744/index';

@Injectable()
export class LctService {
  getLct() {
    return LEY_20744;
  }

  getArticles() {
    return LEY_20744.articles;
  }

  getArticle(number: string) {
    const article = LEY_20744.articles.find((a) => a.number === number);
    if (!article) throw new NotFoundException(`Artículo ${number} no encontrado en la LCT`);
    return article;
  }
}
