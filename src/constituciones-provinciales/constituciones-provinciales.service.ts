import { Injectable, NotFoundException } from '@nestjs/common';
import { LawsService } from '../laws/laws.service';

@Injectable()
export class ConstitucionesProvincialesService {
  constructor(private readonly laws: LawsService) {}

  // Constituciones provinciales (const-*), excluyendo la nacional. Vienen de la BD
  // vía LawsService (ya hidratadas al arrancar).
  private provinciales() {
    return this.laws
      .getAllNorms()
      .filter((c) => c.id.startsWith('const-') && c.id !== 'constitucion-nacional');
  }

  getAll() {
    return this.provinciales().map((c) => ({
      id: c.id,
      title: c.title,
      year: c.year,
      articleCount: c.articleCount,
      status: c.status,
    }));
  }

  getBySlug(slug: string) {
    const law = this.provinciales().find((c) => c.id === `const-${slug}`);
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
