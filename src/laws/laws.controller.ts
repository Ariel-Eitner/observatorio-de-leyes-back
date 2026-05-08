import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LawsService } from './laws.service';
import { QueryLawDto } from './dto/query-law.dto';

@ApiTags('laws')
@Controller('laws')
export class LawsController {
  constructor(private readonly lawsService: LawsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar leyes con filtros y paginación' })
  findAll(@Query() query: QueryLawDto) {
    return this.lawsService.findAll(query);
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

  @Get('number/:number')
  @ApiOperation({ summary: 'Obtener ley por número (ej: 25326)' })
  findByNumber(@Param('number') number: string) {
    return this.lawsService.findByNumber(number);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener ley por ID con todos sus detalles' })
  findOne(@Param('id') id: string) {
    return this.lawsService.findOne(id);
  }
}
