import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchDbService } from './search-db.service';

// La búsqueda usa Postgres full-text (tsvector) vía PrismaService (módulo global).
// Ya no se construye un índice minisearch en memoria al arrancar.
@Module({
  controllers: [SearchController],
  providers: [SearchService, SearchDbService],
})
export class SearchModule {}
