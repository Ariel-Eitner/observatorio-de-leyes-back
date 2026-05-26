import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { SearchService } from './search.service';

@ApiTags('search')
@Controller('search')
@Throttle({ default: { ttl: 60_000, limit: 40 } })
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Búsqueda full-text con lenguaje natural' })
  @ApiQuery({ name: 'q', required: true })
  @ApiQuery({ name: 'type', required: false, enum: ['law', 'article'] })
  @ApiQuery({ name: 'lawId', required: false })
  @ApiQuery({ name: 'normType', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'jurisdiction', required: false })
  @ApiQuery({ name: 'yearFrom', required: false })
  @ApiQuery({ name: 'yearTo', required: false })
  @ApiQuery({ name: 'limit', required: false })
  search(
    @Query('q') q: string,
    @Query('type') type?: 'law' | 'article',
    @Query('lawId') lawId?: string,
    @Query('normType') normType?: string,
    @Query('status') status?: string,
    @Query('jurisdiction') jurisdiction?: string,
    @Query('yearFrom') yearFrom?: string,
    @Query('yearTo') yearTo?: string,
    @Query('limit') limit?: string,
  ) {
    const safeQ     = (q ?? '').slice(0, 200);
    const safeLimit = Math.min(Math.max(parseInt(limit ?? '30') || 30, 1), 50);
    return this.searchService.search(safeQ, {
      type,
      lawId,
      normType,
      status,
      jurisdiction,
      yearFrom: yearFrom ? parseInt(yearFrom) : undefined,
      yearTo: yearTo ? parseInt(yearTo) : undefined,
      limit: safeLimit,
    });
  }

  @Get('suggest')
  @ApiOperation({ summary: 'Autocompletado inteligente' })
  @ApiQuery({ name: 'q', required: true })
  suggest(@Query('q') q: string) {
    return this.searchService.suggest((q ?? '').slice(0, 200));
  }

  @Get('facets')
  @ApiOperation({ summary: 'Facetas y agregaciones' })
  @ApiQuery({ name: 'q', required: false })
  facets(@Query('q') q?: string) {
    return this.searchService.facets(q ? q.slice(0, 200) : undefined);
  }
}
