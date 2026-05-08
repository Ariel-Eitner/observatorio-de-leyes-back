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
  @ApiQuery({ name: 'normType', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'jurisdiction', required: false })
  @ApiQuery({ name: 'yearFrom', required: false })
  @ApiQuery({ name: 'yearTo', required: false })
  @ApiQuery({ name: 'limit', required: false })
  search(
    @Query('q') q: string,
    @Query('type') type?: 'law' | 'article',
    @Query('normType') normType?: string,
    @Query('status') status?: string,
    @Query('jurisdiction') jurisdiction?: string,
    @Query('yearFrom') yearFrom?: string,
    @Query('yearTo') yearTo?: string,
    @Query('limit') limit?: string,
  ) {
    return this.searchService.search(q, {
      type,
      normType,
      status,
      jurisdiction,
      yearFrom: yearFrom ? parseInt(yearFrom) : undefined,
      yearTo: yearTo ? parseInt(yearTo) : undefined,
      limit: limit ? parseInt(limit) : 30,
    });
  }

  @Get('suggest')
  @ApiOperation({ summary: 'Autocompletado inteligente' })
  @ApiQuery({ name: 'q', required: true })
  suggest(@Query('q') q: string) {
    return this.searchService.suggest(q);
  }

  @Get('facets')
  @ApiOperation({ summary: 'Facetas y agregaciones' })
  @ApiQuery({ name: 'q', required: false })
  facets(@Query('q') q?: string) {
    return this.searchService.facets(q);
  }
}
