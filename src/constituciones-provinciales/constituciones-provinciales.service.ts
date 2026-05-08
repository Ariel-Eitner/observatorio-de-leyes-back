import { Injectable, NotFoundException } from '@nestjs/common';
import { CONSTITUCIONES_PROVINCIALES } from '../data/constituciones-provinciales/index';

@Injectable()
export class ConstitucionesProvincialesService {
  getAll() {
    return CONSTITUCIONES_PROVINCIALES.map((c) => ({
      id: c.id,
      title: c.title,
      year: c.year,
      articleCount: c.articleCount,
      status: c.status,
    }));
  }

  getBySlug(slug: string) {
    const law = CONSTITUCIONES_PROVINCIALES.find((c) => c.id === `const-${slug}`);
    if (!law) throw new NotFoundException(`Constitución de '${slug}' no encontrada`);
    return law;
  }

  getArticles(slug: string) {
    return this.getBySlug(slug).articles;
  }

  getArticle(slug: string, number: string) {
    const article = this.getBySlug(slug).articles.find((a) => a.number === number);
    if (!article) throw new NotFoundException(`Artículo ${number} no encontrado en const-${slug}`);
    return article;
  }
}
