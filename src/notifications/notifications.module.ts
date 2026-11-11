import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { NotificationsService } from "./notifications.service";
import {
  NotificationAdminController,
  NotificationsController,
} from "./notifications.controller";

@Module({
  imports: [JwtModule.register({})],
  controllers: [NotificationsController, NotificationAdminController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
