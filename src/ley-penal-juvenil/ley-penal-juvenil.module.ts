import { Module } from '@nestjs/common';
import { LeyPenalJuvenilController } from './ley-penal-juvenil.controller';
import { LeyPenalJuvenilService } from './ley-penal-juvenil.service';

@Module({
  controllers: [LeyPenalJuvenilController],
  providers: [LeyPenalJuvenilService],
})
export class LeyPenalJuvenilModule {}
