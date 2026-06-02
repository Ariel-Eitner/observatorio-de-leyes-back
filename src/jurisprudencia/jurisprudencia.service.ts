import { Injectable, NotFoundException } from '@nestjs/common';
import { ALL_FALLOS } from '../data/jurisprudencia';
import type { Fallo } from '../common/types/law.types';

@Injectable()
export class JurisprudenciaService {
  findAll(): Fallo[] {
    return ALL_FALLOS;
  }

  findBySlug(slug: string): Fallo {
    const fallo = ALL_FALLOS.find((f) => f.slug === slug);
    if (!fallo) throw new NotFoundException(`Fallo "${slug}" no encontrado`);
    return fallo;
  }

  findByArticle(articleId: string): Fallo[] {
    return ALL_FALLOS.filter((f) => f.articlesInterpreted.includes(articleId));
  }
}
