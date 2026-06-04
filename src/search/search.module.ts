import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchIndexService } from './search-index.service';
import { LawsModule } from '../laws/laws.module';

@Module({
  imports: [LawsModule],
  controllers: [SearchController],
  providers: [SearchService, SearchIndexService],
})
export class SearchModule {}
