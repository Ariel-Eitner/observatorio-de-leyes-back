import { Module } from '@nestjs/common';
import { CartaOnuController } from './carta-onu.controller';
import { CartaOnuService } from './carta-onu.service';

@Module({
  controllers: [CartaOnuController],
  providers: [CartaOnuService],
})
export class CartaOnuModule {}
