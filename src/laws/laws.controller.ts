import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
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

  @Get('registry')
  @ApiOperation({ summary: 'Registro completo de metadata de leyes (shortCodes, paths, aliases)' })
  getRegistry() {
    return this.lawsService.getRegistry();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Estadísticas generales del repositorio' })
  getStats() {
    return this.lawsService.getStats();
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

  @Get(':id')
  @ApiOperation({ summary: 'Obtener ley por ID con todos sus detalles' })
  findOne(@Param('id') id: string) {
    return this.lawsService.findOne(id);
  }
}
