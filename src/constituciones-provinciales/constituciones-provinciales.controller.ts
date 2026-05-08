import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ConstitucionesProvincialesService } from './constituciones-provinciales.service';

@ApiTags('constituciones-provinciales')
@Controller('constituciones-provinciales')
export class ConstitucionesProvincialesController {
  constructor(private readonly service: ConstitucionesProvincialesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las constituciones provinciales' })
  getAll() {
    return this.service.getAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Obtener una constitución provincial por slug' })
  getBySlug(@Param('slug') slug: string) {
    return this.service.getBySlug(slug);
  }

  @Get(':slug/articles')
  @ApiOperation({ summary: 'Obtener todos los artículos de una constitución provincial' })
  getArticles(@Param('slug') slug: string) {
    return this.service.getArticles(slug);
  }

  @Get(':slug/articles/:number')
  @ApiOperation({ summary: 'Obtener un artículo por número' })
  getArticle(@Param('slug') slug: string, @Param('number') number: string) {
    return this.service.getArticle(slug, number);
  }
}
