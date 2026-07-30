import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikeDto } from './dto/like.dto';
import { JwtAuthGuard, AccessTokenPayload } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

// AuthEnabledGuard a nivel de clase (todo 404 fuera de localhost). El conteo es
// público (solo el gate); listar/dar/quitar requieren access token.
@Controller('likes')
export class LikesController {
  constructor(private readonly svc: LikesService) {}

  @Get('count')
  count(@Query('normId') normId: string, @Query('articleId') articleId?: string) {
    return this.svc.count(normId, articleId ?? '');
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  list(@CurrentUser() user: AccessTokenPayload) {
    return this.svc.list(user.sub);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  like(@CurrentUser() user: AccessTokenPayload, @Body() dto: LikeDto) {
    return this.svc.like(user.sub, dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  unlike(
    @CurrentUser() user: AccessTokenPayload,
    @Query('normId') normId: string,
    @Query('articleId') articleId?: string,
  ) {
    return this.svc.unlike(user.sub, normId, articleId ?? '');
  }
}
