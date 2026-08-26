import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RedactorDocsService } from './redactor-docs.service';
import { CreateRedactorDocDto, UpdateRedactorDocDto } from './dto/redactor-doc.dto';
import { JwtAuthGuard, AccessTokenPayload } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('redactor-docs')
@UseGuards(JwtAuthGuard)
export class RedactorDocsController {
  constructor(private readonly svc: RedactorDocsService) {}

  @Get()
  list(@CurrentUser() user: AccessTokenPayload) {
    return this.svc.list(user.sub);
  }

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
