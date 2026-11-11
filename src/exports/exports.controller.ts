import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { IsIn } from "class-validator";
import { ExportsService, ExportType } from "./exports.service";
import {
  JwtAuthGuard,
  AccessTokenPayload,
} from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
class RecordExportDto {
  @IsIn(["pdf", "docx", "text"]) type: ExportType;
}
@Controller("exports")
@UseGuards(JwtAuthGuard)
export class ExportsController {
  constructor(private readonly exports: ExportsService) {}
  @Get("count")
  getCount(@CurrentUser() user: AccessTokenPayload) {
    return this.exports.getCount(user.sub);
  }
  @Post()
  @HttpCode(200)
  record(
    @CurrentUser() user: AccessTokenPayload,
    @Body() dto: RecordExportDto,
  ) {
    return this.exports.record(user.sub, dto.type);
  }
}
