import { Controller, Get, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { LawsService } from './laws.service';
import { QueryLawDto } from './dto/query-law.dto';
import { AdminHeaderGuard } from '../common/guards/admin-header.guard';

@ApiTags('laws')
@Controller('laws')
export class LawsController {
  constructor(private readonly lawsService: LawsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar leyes con filtros y paginación' })
  findAll(@Query() query: QueryLawDto) {
    return this.lawsService.findAll(query);
  }

  // Re-sincroniza las normas en memoria con la BD (incremental) para que una
  // norma recién cargada aparezca en registry / grafo / refs SIN reiniciar Render.
  // Protegido: header x-obs-admin = ADMIN_SECRET.
  @Post('refresh')
  @UseGuards(AdminHeaderGuard)
  @SkipThrottle()
  @ApiOperation({ summary: 'Refrescar el corpus en memoria desde la BD (admin)' })
  refresh() {
    return this.lawsService.refreshFromDb();
  }

  // Antes de @Get('registry'): Nest resuelve por orden de declaración y la ruta
  // de dos segmentos tiene que ganarle a la de uno.
  @Get('registry/light')
  @ApiOperation({ summary: 'Registro mínimo para resolver referencias (sin catálogo). Lo consume el layout del front en cada request' })
  getRegistryLight() {
    return this.lawsService.getRegistryLight();
  }

  @Get('registry')
  @ApiOperation({ summary: 'Registro completo de metadata de leyes (shortCodes, paths, aliases, catálogo)' })
  getRegistry() {
    return this.lawsService.getRegistry();
  }

  // Antes de @Get(':id'). Resuelve por ruta pública e incluye las no listadas:
  // es el único camino a una norma con visibility='ENLACE'.
  @Get('by-path')
  @ApiOperation({ summary: 'Norma por su ruta pública exacta (incluye no listadas)' })
  async findByPath(@Query('path') path: string) {
    const law = await this.lawsService.findByFrontendPath(path ?? '');
    if (!law) throw new NotFoundException(`No hay norma en la ruta "${path}"`);
    return law;
  }

  @Get('stats')
  @ApiOperation({ summary: 'Estadísticas generales del repositorio' })
  getStats() {
    return this.lawsService.getStats();
  }

  // Antes de @Get(':id'), como todas las rutas de un segmento.
  @Get('article-numbers')
  @ApiOperation({ summary: 'Por norma: fecha de última actualización y números de artículo, sin texto. Lo consume el generador del sitemap' })
  getArticleNumbers() {
    return this.lawsService.getArticleNumbers();
  }

  @Get('graph')
  @ApiOperation({ summary: 'Grafo del mapa legal (nodos + relaciones tipadas), armado en el backend' })
  getGraph() {
    return this.lawsService.getGraphData();
  }

  // Antes de @Get(':id'): si no, 'vetos' se interpretaría como un id de norma.
  @Get('vetos')
  @ApiOperation({ summary: 'Leyes sancionadas y vetadas: circuito sanción → veto → insistencia' })
  getVetos() {
    return this.lawsService.getVetos();
  }

  @Get('number/:number')
  @ApiOperation({ summary: 'Obtener ley por número (ej: 25326)' })
  findByNumber(@Param('number') number: string) {
    return this.lawsService.findByNumber(number);
  }

  @Get('number/:number/article/:articleNumber')
  @ApiOperation({ summary: 'Un artículo de una ley por número (sin bajar la norma entera)' })
  findArticleByNumber(
    @Param('number') number: string,
    @Param('articleNumber') articleNumber: string,
  ) {
    return this.lawsService.findArticleByNumber(number, articleNumber);
  }

  @Get(':id/article/:articleNumber')
  @ApiOperation({ summary: 'Un artículo de una ley por id (sin bajar la norma entera)' })
  findArticle(
    @Param('id') id: string,
    @Param('articleNumber') articleNumber: string,
  ) {
    return this.lawsService.findArticle(id, articleNumber);
  }

  // Antes de @Get(':id'): dos segmentos le ganan a uno.
  @Get(':id/light')
  @ApiOperation({ summary: 'Norma con el articulado sin texto (solo números y títulos). Para la página de un artículo' })
  async findOneLight(@Param('id') id: string) {
    const law = await this.lawsService.getNormLight(id);
    if (!law) throw new NotFoundException(`No existe la norma "${id}"`);
    return law;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener ley por ID con todos sus detalles' })
  findOne(@Param('id') id: string) {
    return this.lawsService.findOne(id);
  }
}
