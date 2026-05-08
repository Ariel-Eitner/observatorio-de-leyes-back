import { Injectable, NotFoundException } from '@nestjs/common';
import { CODIGO_CIVIL_COMERCIAL } from '../data/codigo-civil-comercial/index';

@Injectable()
export class CodigoCivilComercialService {
  getCodigoCivilComercial() {
    return CODIGO_CIVIL_COMERCIAL;
  }

  getArticles() {
    return CODIGO_CIVIL_COMERCIAL.articles;
  }

  getArticle(number: string) {
    const article = CODIGO_CIVIL_COMERCIAL.articles.find((a) => a.number === number);
    if (!article) throw new NotFoundException(`Artículo ${number} no encontrado en el Código Civil y Comercial`);
    return article;
  }
}
