import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { LawsModule } from '../laws/laws.module';

// LawsModule: /health responde según si el corpus ya terminó de hidratar.
@Module({ imports: [LawsModule], controllers: [HealthController] })
export class HealthModule {}
