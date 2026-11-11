import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  Equals,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { Throttle } from "@nestjs/throttler";
import { AdminHeaderGuard } from "../common/guards/admin-header.guard";
import {
  JwtAuthGuard,
  AccessTokenPayload,
} from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { AccountDataService } from "./account-data.service";
class DeleteManagedUserDto {
  @IsEmail() email: string;
  @IsString() @MinLength(1) @MaxLength(200) password: string;
  @Equals("BORRAR") confirmation: string;
}
@Controller("admin/users")
@UseGuards(AdminHeaderGuard, JwtAuthGuard)
export class UserAdminController {
  constructor(private readonly data: AccountDataService) {}
  @Post(":id/delete")
  @HttpCode(200)
  @Throttle({ global: { ttl: 60000, limit: 5 } })
  remove(
    @CurrentUser() actor: AccessTokenPayload,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: DeleteManagedUserDto,
  ) {
    return this.data.borrarDesdeAdmin(actor.sub, id, dto.password, dto.email);
  }
}
