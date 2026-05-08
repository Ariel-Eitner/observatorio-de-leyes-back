import { Injectable, NotFoundException } from '@nestjs/common';
import { LEY_27801 } from '../data/ley-27801/index';

@Injectable()
export class LeyPenalJuvenilService {
  getLey() {
    return LEY_27801;
  }

  getArticles() {
    return LEY_27801.articles;
  }

  getArticle(number: string) {
    const article = LEY_27801.articles.find((a) => a.number === number);
    if (!article) throw new NotFoundException(`Artículo ${number} no encontrado en la Ley Penal Juvenil`);
    return article;
  }
}
