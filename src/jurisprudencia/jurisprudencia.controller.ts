import { Controller, Get, Param } from '@nestjs/common';
import { JurisprudenciaService } from './jurisprudencia.service';

@Controller('jurisprudencia')
export class JurisprudenciaController {
  constructor(private readonly svc: JurisprudenciaService) {}

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get('by-article/:articleId')
  findByArticle(@Param('articleId') articleId: string) {
    return this.svc.findByArticle(articleId);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.svc.findBySlug(slug);
  }
}
