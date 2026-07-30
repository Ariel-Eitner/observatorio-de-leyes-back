import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SavedLawsService } from './saved-laws.service';
import { SaveLawDto } from './dto/save-law.dto';
import { NotaDto } from './dto/nota.dto';
import { JwtAuthGuard, AccessTokenPayload } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

// Gate de entorno + auth: fuera de localhost (AUTH_ENABLED!=true) todo da 404;
// dentro, requiere access token válido.
@Controller('saved-laws')
@UseGuards(JwtAuthGuard)
export class SavedLawsController {
  constructor(private readonly svc: SavedLawsService) {}

  @Get()
  list(@CurrentUser() user: AccessTokenPayload) {
    return this.svc.list(user.sub);
  }

  @Get('ids')
  ids(@CurrentUser() user: AccessTokenPayload) {
    return this.svc.ids(user.sub);
  }

  @Post()
  save(@CurrentUser() user: AccessTokenPayload, @Body() dto: SaveLawDto) {
    return this.svc.save(user.sub, dto);
  }

  @Patch(':normId')
  update(
    @CurrentUser() user: AccessTokenPayload,
    @Param('normId') normId: string,
    @Body() dto: NotaDto,
  ) {
    return this.svc.updateSaved(user.sub, normId, dto);
  }

  @Delete(':normId')
  remove(@CurrentUser() user: AccessTokenPayload, @Param('normId') normId: string) {
    return this.svc.remove(user.sub, normId);
  }
}
