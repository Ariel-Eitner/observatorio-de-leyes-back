import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ConstitutionService } from './constitution.service';

@ApiTags('constitucion')
@Controller('constitucion')
export class ConstitutionController {
  constructor(private readonly constitutionService: ConstitutionService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener la Constitución Nacional completa' })
  getConstitution() {
    return this.constitutionService.getConstitution();
  }

  @Get('articles')
  @ApiOperation({ summary: 'Obtener todos los artículos de la Constitución' })
  getArticles() {
    return this.constitutionService.getArticles();
  }

  @Get('articles/:number')
  @ApiOperation({ summary: 'Obtener un artículo por número' })
  getArticle(@Param('number') number: string) {
    return this.constitutionService.getArticle(number);
  }
}
