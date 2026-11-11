import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  Equals,
  IsArray,
  IsBoolean,
  IsOptional,
  IsUUID,
  ArrayMaxSize,
} from "class-validator";
import { AdminHeaderGuard } from "../common/guards/admin-header.guard";
import {
  JwtAuthGuard,
  AccessTokenPayload,
} from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { AccountDataService } from "./account-data.service";
class ConfirmationDto {
  @Equals(true) confirmed: boolean;
}
class PurgeDto extends ConfirmationDto {
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(100)
  @IsUUID("4", { each: true })
  ids?: string[];
  @IsOptional() @IsBoolean() all?: boolean;
}
@Controller("admin/users")
@UseGuards(AdminHeaderGuard, JwtAuthGuard)
export class UserAdminController {
  constructor(private readonly data: AccountDataService) {}
  @Get("trash") list(@CurrentUser() actor: AccessTokenPayload) {
    return this.data.trashList(actor.sub);
  }
  @Post("trash/purge")
  @HttpCode(200)
  purge(@CurrentUser() actor: AccessTokenPayload, @Body() dto: PurgeDto) {
    return this.data.purgeTrash(actor.sub, dto.ids ?? [], dto.all === true);
  }
  @Post(":id/restore")
  @HttpCode(200)
  restore(
    @CurrentUser() actor: AccessTokenPayload,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: ConfirmationDto,
  ) {
    return this.data.restoreFromTrash(actor.sub, id);
  }
  @Post(":id/delete")
  @HttpCode(200)
  remove(
    @CurrentUser() actor: AccessTokenPayload,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: ConfirmationDto,
  ) {
    return this.data.moveToTrash(actor.sub, id);
  }
}
