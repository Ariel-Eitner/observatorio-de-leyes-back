import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('by-law/:lawId')
  @ApiOperation({ summary: 'Obtener artículos de una ley' })
  findByLaw(@Param('lawId') lawId: string) {
    return this.articlesService.findByLaw(lawId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener artículo por ID' })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }
}
