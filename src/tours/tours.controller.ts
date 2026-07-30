import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ToursService, TourDto } from './tours.service';

@ApiTags('tours')
@Controller('tours')
export class ToursController {
  constructor(private readonly tours: ToursService) {}

  @Get()
  @ApiOperation({ summary: 'Recorridos guiados del mapa legal (historias)' })
  findAll(): Promise<TourDto[]> {
    return this.tours.findAll();
  }
}
