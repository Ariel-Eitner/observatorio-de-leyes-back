import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CodigoPenalService } from './codigo-penal.service';

@ApiTags('codigo-penal')
@Controller('codigo-penal')
export class CodigoPenalController {
  constructor(private readonly codigoPenalService: CodigoPenalService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener el Código Penal completo' })
  getCodigoPenal() {
    return this.codigoPenalService.getCodigoPenal();
  }

  @Get('articles')
  @ApiOperation({ summary: 'Obtener todos los artículos del Código Penal' })
  getArticles() {
    return this.codigoPenalService.getArticles();
  }

  @Get('articles/:number')
  @ApiOperation({ summary: 'Obtener un artículo por número' })
  getArticle(@Param('number') number: string) {
    return this.codigoPenalService.getArticle(number);
  }
}
