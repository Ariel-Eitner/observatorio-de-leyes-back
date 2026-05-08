import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LeyPenalJuvenilService } from './ley-penal-juvenil.service';

@ApiTags('ley-penal-juvenil')
@Controller('ley-penal-juvenil')
export class LeyPenalJuvenilController {
  constructor(private readonly leyPenalJuvenilService: LeyPenalJuvenilService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener la Ley Penal Juvenil (Ley 27801) completa' })
  getLey() {
    return this.leyPenalJuvenilService.getLey();
  }

  @Get('articles')
  @ApiOperation({ summary: 'Obtener todos los artículos de la Ley Penal Juvenil' })
  getArticles() {
    return this.leyPenalJuvenilService.getArticles();
  }

  @Get('articles/:number')
  @ApiOperation({ summary: 'Obtener un artículo por número' })
  getArticle(@Param('number') number: string) {
    return this.leyPenalJuvenilService.getArticle(number);
  }
}
