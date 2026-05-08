import {
  Controller, Get, Post, Patch, Delete,
  Param, Body, Query, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PostDraftsService } from './post-drafts.service';
import { AdminHeaderGuard } from '../common/guards/admin-header.guard';
import { Platform } from './types';

@ApiTags('post-drafts')
@UseGuards(AdminHeaderGuard)
@Controller('post-drafts')
export class PostDraftsController {
  constructor(private readonly service: PostDraftsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar borradores pendientes' })
  findAll(@Query('platform') platform = 'twitter') {
    return this.service.findAll(platform as Platform);
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generar un nuevo borrador' })
  generate(@Query('platform') platform = 'twitter') {
    return this.service.generate(platform as Platform);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar texto de un borrador' })
  update(
    @Param('id') id: string,
    @Body() body: { postText: string; commentText: string },
  ) {
    return this.service.update(id, body.postText, body.commentText);
  }

  @Delete(':id/publish')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Marcar como publicado y eliminar' })
  publish(@Param('id') id: string) {
    return this.service.remove(id, true);
  }

  @Delete(':id/discard')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Descartar borrador' })
  discard(@Param('id') id: string) {
    return this.service.remove(id, false);
  }
}
