import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { LawsModule } from '../laws/laws.module';
import { NormsDbModule } from '../norms-db/norms-db.module';

@Module({
  imports: [LawsModule, NormsDbModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
