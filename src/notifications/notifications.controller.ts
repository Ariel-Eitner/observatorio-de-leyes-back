import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  JwtAuthGuard,
  AccessTokenPayload,
} from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { AdminHeaderGuard } from "../common/guards/admin-header.guard";
import { NotificationsService } from "./notifications.service";
import {
  ArchiveDto,
  CampaignDto,
  FeedbackDto,
  PreferencesDto,
  ReadDto,
} from "./notifications.dto";

@Controller("notifications")
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notifications: NotificationsService) {}
  @Get("snapshot")
  @Header("Cache-Control", "private, no-store")
  snapshot(@CurrentUser() u: AccessTokenPayload) {
    return this.notifications.snapshot(u.sub);
  }
  @Get() list(
    @CurrentUser() u: AccessTokenPayload,
    @Query("cursor") cursor?: string,
    @Query("unread") unread?: string,
    @Query("archived") archived?: string,
  ) {
    return this.notifications.list(
      u.sub,
      cursor,
      unread === "true",
      archived === "true",
    );
  }
  @Get("count") count(@CurrentUser() u: AccessTokenPayload) {
    return this.notifications.count(u.sub);
  }
  @Get("preferences") preferences(@CurrentUser() u: AccessTokenPayload) {
    return this.notifications.preferences(u.sub);
  }
  @Put("preferences") setPreferences(
    @CurrentUser() u: AccessTokenPayload,
    @Body() dto: PreferencesDto,
  ) {
    return this.notifications.preferences(u.sub, dto);
  }
  @Post("read-all") @HttpCode(200) readAll(
    @CurrentUser() u: AccessTokenPayload,
  ) {
    return this.notifications.readAll(u.sub);
  }
  @Patch(":id/read") read(
    @CurrentUser() u: AccessTokenPayload,
    @Param("id") id: string,
    @Body() dto: ReadDto,
  ) {
    return this.notifications.read(u.sub, id, dto.read);
  }
  @Patch(":id/archive") archive(
    @CurrentUser() u: AccessTokenPayload,
    @Param("id") id: string,
    @Body() dto: ArchiveDto,
  ) {
    return this.notifications.archive(u.sub, id, dto.archived);
  }
  @Post("campaigns/:id/feedback") @HttpCode(200) feedback(
    @CurrentUser() u: AccessTokenPayload,
    @Param("id") id: string,
    @Body() dto: FeedbackDto,
  ) {
    return this.notifications.feedback(u.sub, id, dto);
  }
}

@Controller("notification-admin")
@UseGuards(AdminHeaderGuard)
export class NotificationAdminController {
  constructor(private readonly notifications: NotificationsService) {}
  @Get("campaigns") campaigns() {
    return this.notifications.campaigns();
  }
  @Post("campaigns") @HttpCode(200) create(@Body() dto: CampaignDto) {
    return this.notifications.createCampaign(dto);
  }
  @Get("campaigns/:id/preview") preview(@Param("id") id: string) {
    return this.notifications.preview(id);
  }
  @Post("campaigns/:id/publish") @HttpCode(200) publish(
    @Param("id") id: string,
  ) {
    return this.notifications.publish(id);
  }
  @Post("campaigns/:id/withdraw") @HttpCode(200) withdraw(
    @Param("id") id: string,
  ) {
    return this.notifications.withdraw(id);
  }
  @Get("campaigns/:id/feedback") feedback(@Param("id") id: string) {
    return this.notifications.campaignFeedback(id);
  }
}
