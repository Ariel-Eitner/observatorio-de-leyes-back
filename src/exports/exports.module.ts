import { Module } from "@nestjs/common";
import { ExportsController } from "./exports.controller";
import { ExportsService } from "./exports.service";
import { CuposModule } from "../cupos/cupos.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [CuposModule, AuthModule],
  controllers: [ExportsController],
  providers: [ExportsService],
  exports: [ExportsService],
})
export class ExportsModule {}
