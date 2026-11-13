import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { RedactorDocsService } from './redactor-docs.service';
import { CreateRedactorDocDto, UpdateRedactorDocDto } from './dto/redactor-doc.dto';
import { JwtAuthGuard, AccessTokenPayload } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('redactor-docs')
@UseGuards(JwtAuthGuard)
export class RedactorDocsController {
  constructor(private readonly svc: RedactorDocsService) {}

  @Get()
  list(@CurrentUser() user: AccessTokenPayload, @Query('summary') summary?: string, @Query('offset') offset?: string) {
    return this.svc.list(user.sub, summary === 'true', Math.max(0, Math.min(10000, Number.parseInt(offset || '0', 10) || 0)));
  }

  @Get(':id')
  get(@CurrentUser() user: AccessTokenPayload, @Param('id') id: string) { return this.svc.get(user.sub, id); }

  @Post()
  create(@CurrentUser() user: AccessTokenPayload, @Body() dto: CreateRedactorDocDto) {
    return this.svc.create(user.sub, dto);
  }

  @Patch(':id')
  update(@CurrentUser() user: AccessTokenPayload, @Param('id') id: string, @Body() dto: UpdateRedactorDocDto) {
    return this.svc.update(user.sub, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AccessTokenPayload, @Param('id') id: string) {
    return this.svc.remove(user.sub, id);
  }
}
