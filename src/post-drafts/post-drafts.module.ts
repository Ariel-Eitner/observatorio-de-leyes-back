import { Module } from '@nestjs/common';
import { PostDraftsController } from './post-drafts.controller';
import { PostDraftsService } from './post-drafts.service';
import { PostGeneratorService } from './post-generator.service';
import { PostDraftsScheduler } from './post-drafts.scheduler';
import { LawsModule } from '../laws/laws.module';

@Module({
  imports:     [LawsModule],
  controllers: [PostDraftsController],
  providers:   [PostDraftsService, PostGeneratorService, PostDraftsScheduler],
})
export class PostDraftsModule {}
