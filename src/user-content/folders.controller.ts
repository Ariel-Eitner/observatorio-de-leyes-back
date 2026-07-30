import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto, RenameFolderDto } from './dto/folder.dto';
import { JwtAuthGuard, AccessTokenPayload } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('folders')
@UseGuards(JwtAuthGuard)
export class FoldersController {
  constructor(private readonly svc: FoldersService) {}

  @Get()
  list(@CurrentUser() user: AccessTokenPayload) {
    return this.svc.list(user.sub);
  }

  @Post()
  create(@CurrentUser() user: AccessTokenPayload, @Body() dto: CreateFolderDto) {
    return this.svc.create(user.sub, dto);
  }

  @Patch(':id')
  rename(@CurrentUser() user: AccessTokenPayload, @Param('id') id: string, @Body() dto: RenameFolderDto) {
    return this.svc.rename(user.sub, id, dto.name);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AccessTokenPayload, @Param('id') id: string) {
    return this.svc.remove(user.sub, id);
  }
}
