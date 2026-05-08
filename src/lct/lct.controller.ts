import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LctService } from './lct.service';

@ApiTags('lct')
@Controller('lct')
export class LctController {
  constructor(private readonly lctService: LctService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener la Ley de Contrato de Trabajo completa' })
  getLct() {
    return this.lctService.getLct();
  }

  @Get('articles')
  @ApiOperation({ summary: 'Obtener todos los artículos de la LCT' })
  getArticles() {
    return this.lctService.getArticles();
  }

  @Get('articles/:number')
  @ApiOperation({ summary: 'Obtener un artículo por número' })
  getArticle(@Param('number') number: string) {
    return this.lctService.getArticle(number);
  }
}
