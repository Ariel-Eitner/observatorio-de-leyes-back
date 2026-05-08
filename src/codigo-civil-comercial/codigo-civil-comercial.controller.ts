import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CodigoCivilComercialService } from './codigo-civil-comercial.service';

@ApiTags('codigo-civil-comercial')
@Controller('codigo-civil-comercial')
export class CodigoCivilComercialController {
  constructor(private readonly codigoCivilComercialService: CodigoCivilComercialService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener el Código Civil y Comercial completo' })
  getCodigoCivilComercial() {
    return this.codigoCivilComercialService.getCodigoCivilComercial();
  }

  @Get('articles')
  @ApiOperation({ summary: 'Obtener todos los artículos del Código Civil y Comercial' })
  getArticles() {
    return this.codigoCivilComercialService.getArticles();
  }

  @Get('articles/:number')
  @ApiOperation({ summary: 'Obtener un artículo por número' })
  getArticle(@Param('number') number: string) {
    return this.codigoCivilComercialService.getArticle(number);
  }
}
