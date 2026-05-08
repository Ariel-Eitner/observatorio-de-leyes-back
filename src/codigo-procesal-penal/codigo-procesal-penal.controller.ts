import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CodigoProcesalPenalService } from './codigo-procesal-penal.service';

@ApiTags('codigo-procesal-penal')
@Controller('codigo-procesal-penal')
export class CodigoProcesalPenalController {
  constructor(private readonly codigoProcesalPenalService: CodigoProcesalPenalService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener la Ley de Implementación del CPP Federal completa' })
  getCodigoProcesalPenal() {
    return this.codigoProcesalPenalService.getCodigoProcesalPenal();
  }

  @Get('articles')
  @ApiOperation({ summary: 'Obtener todos los artículos del CPP Federal' })
  getArticles() {
    return this.codigoProcesalPenalService.getArticles();
  }

  @Get('articles/:number')
  @ApiOperation({ summary: 'Obtener un artículo por número' })
  getArticle(@Param('number') number: string) {
    return this.codigoProcesalPenalService.getArticle(number);
  }
}
