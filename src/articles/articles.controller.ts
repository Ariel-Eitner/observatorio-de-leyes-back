import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('by-law/:lawId')
  @ApiOperation({ summary: 'Obtener artículos de una ley' })
  findByLaw(@Param('lawId') lawId: string, @Query('limit') limit?: string) {
    // Sin `limit` devuelve la ley entera (comportamiento histórico). El Redactor
    // pide 10: sin el recorte acá, elegir el Código Civil y Comercial serializaba
    // 5,4 MB (2.671 artículos) para que el front tirara todo salvo 10.
    const n = limit ? Math.max(1, Math.min(parseInt(limit, 10) || 0, 100)) : undefined;
    return this.articlesService.findByLaw(lawId, n);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener artículo por ID' })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }
}
