import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchDbService } from './search-db.service';
import { LawsModule } from '../laws/laws.module';
import { RedactorSearchController } from './redactor-search.controller';
import { RedactorSearchService } from './redactor-search.service';

// La búsqueda usa Postgres full-text (tsvector) vía PrismaService (módulo global).
// Ya no se construye un índice minisearch en memoria al arrancar.
@Module({
  imports: [LawsModule],
  controllers: [SearchController, RedactorSearchController],
  providers: [SearchService, SearchDbService, RedactorSearchService],
})
export class SearchModule {}
