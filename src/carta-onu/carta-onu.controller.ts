import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CartaOnuService } from './carta-onu.service';

@ApiTags('carta-onu')
@Controller('carta-onu')
export class CartaOnuController {
  constructor(private readonly cartaOnuService: CartaOnuService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener la Carta de las Naciones Unidas completa' })
  getCartaOnu() {
    return this.cartaOnuService.getCartaOnu();
  }

  @Get('articles')
  @ApiOperation({ summary: 'Obtener todos los artículos de la Carta de la ONU' })
  getArticles() {
    return this.cartaOnuService.getArticles();
  }

  @Get('articles/:number')
  @ApiOperation({ summary: 'Obtener un artículo por número' })
  getArticle(@Param('number') number: string) {
    return this.cartaOnuService.getArticle(number);
  }
}
