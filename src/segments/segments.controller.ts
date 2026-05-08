import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SegmentsService } from './segments.service';

@ApiTags('segments')
@Controller('segments')
export class SegmentsController {
  constructor(private readonly segmentsService: SegmentsService) {}

  @Get('by-law/:lawId')
  @ApiOperation({ summary: 'Obtener todos los segmentos de una ley' })
  findByLaw(@Param('lawId') lawId: string) {
    return this.segmentsService.findByLaw(lawId);
  }

  @Get('by-article/:articleId')
  @ApiOperation({ summary: 'Obtener segmentos de un artículo' })
  findByArticle(@Param('articleId') articleId: string) {
    return this.segmentsService.findByArticle(articleId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener segmento por ID' })
  findOne(@Param('id') id: string) {
    return this.segmentsService.findOne(id);
  }
}
