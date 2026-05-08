import { Injectable, NotFoundException } from '@nestjs/common';
import { CARTA_ONU } from '../data/carta-onu/index';

@Injectable()
export class CartaOnuService {
  getCartaOnu() {
    return CARTA_ONU;
  }

  getArticles() {
    return CARTA_ONU.articles;
  }

  getArticle(number: string) {
    const article = CARTA_ONU.articles.find((a) => a.number === number);
    if (!article) throw new NotFoundException(`Artículo ${number} no encontrado en la Carta de la ONU`);
    return article;
  }
}
