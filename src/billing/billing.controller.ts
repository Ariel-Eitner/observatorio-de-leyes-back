import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminHeaderGuard } from "../common/guards/admin-header.guard";
import { BillingService } from "./billing.service";
import { CreateOrderDto, PreferenceDto, SubmitPaymentDto } from "./billing.dto";
import { PaymentProvider } from "./provider";

@Controller("billing")
@UseGuards(AdminHeaderGuard)
export class BillingController {
  constructor(
    private readonly billing: BillingService,
    private readonly jwt: JwtService,
    private readonly provider: PaymentProvider,
  ) {}
  @Get("config") config() {
    return {
      enabled: this.provider.ready(),
      sandbox:
        process.env.NODE_ENV !== "production" &&
        process.env.OBS_LOCAL_SANDBOX === "true" &&
        process.env.ALLOW_MOCK_PAYMENTS === "true" &&
        /^http:\/\/127\.0\.0\.1:\d+$/.test(process.env.MP_API_BASE_URL ?? ""),
      renewal: "manual",
    };
  }
  private user(authorization?: string) {
    if (!authorization) return null;
    if (!authorization.startsWith("Bearer ")) throw new UnauthorizedException();
    try {
      const payload = this.jwt.verify(authorization.slice(7), {
        secret: process.env.JWT_ACCESS_SECRET,
        algorithms: ["HS256"],
      });
      if (
        typeof payload.sub !== "string" ||
        !/^[0-9a-f-]{36}$/i.test(payload.sub)
      )
        throw new Error();
      return payload.sub as string;
    } catch {
      throw new UnauthorizedException();
    }
  }
  @Post("orders")
  @HttpCode(200)
  create(@Body() dto: CreateOrderDto, @Headers("authorization") auth?: string) {
    return this.billing.create(dto, this.user(auth));
  }
  @Get("orders/:id")
  status(
    @Param("id") id: string,
    @Headers("authorization") auth?: string,
    @Headers("x-payment-token") token?: string,
  ) {
    return this.billing.status(id, this.user(auth), token);
  }
  @Post("payments")
  @HttpCode(200)
  async pay(
    @Body() dto: SubmitPaymentDto,
    @Headers("authorization") auth?: string,
    @Headers("x-payment-token") token?: string,
  ) {
    const user = this.user(auth);
    const order = await this.billing.owned(dto.orderId, user, token);
    await this.billing.submit(order, dto.attemptKey, dto.formData);
    return { ok: true, ...(await this.billing.status(order.id, user, token)) };
  }
  @Post("preferences")
  @HttpCode(200)
  async preference(
    @Body() dto: PreferenceDto,
    @Headers("authorization") auth?: string,
    @Headers("x-payment-token") token?: string,
  ) {
    const order = await this.billing.owned(dto.orderId, this.user(auth), token);
    return {
      ok: true,
      pagoId: order.id,
      initPoint: await this.billing.preference(order),
    };
  }
  @Get("health") health() {
    return this.billing.health();
  }
  @Post("events/:kind/:id/retry")
  @HttpCode(200)
  retry(@Param("kind") kind: string, @Param("id") id: string) {
    return this.billing.retryEvent(kind, id);
  }
  @Post("reconcile")
  @HttpCode(200)
  async reconcile() {
    await this.billing.reconcile();
    await this.billing.tick();
    return this.billing.health();
  }
}

@Controller("billing/webhook")
export class BillingWebhookController {
  constructor(private readonly billing: BillingService) {}
  @Post()
  @HttpCode(200)
  receive(
    @Query("data.id") id: string,
    @Body() body: unknown,
    @Headers("x-signature") signature: string,
    @Headers("x-request-id") requestId: string,
  ) {
    return this.billing.receiveWebhook(id, body, signature, requestId);
  }
}
