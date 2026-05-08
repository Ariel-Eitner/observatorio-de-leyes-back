import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CodigoAduaneroService } from './codigo-aduanero.service';

@ApiTags('codigo-aduanero')
@Controller('codigo-aduanero')
export class CodigoAduaneroController {
  constructor(private readonly codigoAduaneroService: CodigoAduaneroService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener el Código Aduanero completo' })
  getCodigoAduanero() {
    return this.codigoAduaneroService.getCodigoAduanero();
  }

  @Get('articles')
  @ApiOperation({ summary: 'Obtener todos los artículos del Código Aduanero' })
  getArticles() {
    return this.codigoAduaneroService.getArticles();
  }

  @Get('articles/:number')
  @ApiOperation({ summary: 'Obtener un artículo por número' })
  getArticle(@Param('number') number: string) {
    return this.codigoAduaneroService.getArticle(number);
  }
}
