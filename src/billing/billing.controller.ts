import {
  Body,
  Controller,
  Get,
  GoneException,
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
import {
  CreateOrderDto,
  PreferenceDto,
  SubmitPaymentDto,
  SubscriptionDto,
  CancelSubscriptionDto,
  SimulateSubscriptionDto,
} from "./billing.dto";
import { SubscriptionsService } from "./subscriptions.service";
import { SUB_TOPICS } from "./subscription-events";
import { PaymentProvider } from "./provider";
import { COMMERCIAL_CATALOG } from "../commercial/catalog";

@Controller("billing")
@UseGuards(AdminHeaderGuard)
export class BillingController {
  constructor(
    private readonly billing: BillingService,
    private readonly jwt: JwtService,
    private readonly provider: PaymentProvider,
    private readonly subscriptions: SubscriptionsService,
  ) {}
  @Get("config") async config() {
    return {
      enabled: await this.provider.available(),
      sandbox:
        process.env.NODE_ENV !== "production" &&
        process.env.OBS_LOCAL_SANDBOX === "true" &&
        process.env.ALLOW_MOCK_PAYMENTS === "true" &&
        /^http:\/\/127\.0\.0\.1:\d+$/.test(process.env.MP_API_BASE_URL ?? ""),
      renewal: "manual",
      catalogVersion: COMMERCIAL_CATALOG.version,
    };
  }
  @Get("catalog") catalog() {
    return COMMERCIAL_CATALOG;
  }
  @Post("verified-webhook")
  @HttpCode(200)
  verifiedWebhook(
    @Query("data.id") id: string,
    @Body() body: unknown,
    @Headers("x-signature") signature: string,
    @Headers("x-request-id") requestId: string,
  ) {
    const type = (body as { type?: string })?.type;
    return SUB_TOPICS[type]
      ? this.subscriptions.receive(type, id, body, signature, requestId, true)
      : this.billing.receiveVerifiedWebhook(id, body, signature, requestId);
  }
  private requiredUser(authorization?: string) {
    const id = this.user(authorization);
    if (!id) throw new UnauthorizedException();
    return id;
  }
  @Post("subscriptions")
  @HttpCode(200)
  subscribe(
    @Body() _dto: SubscriptionDto,
    @Headers("authorization") auth?: string,
  ) {
    this.requiredUser(auth);
    throw new GoneException(
      "Las nuevas suscripciones están deshabilitadas. Comprá un mes de Pro por $26.000 desde la página de planes, sin renovación automática.",
    );
  }
  @Get("subscriptions/current")
  currentSubscription(
    @Headers("authorization") auth?: string,
    @Query("refresh") refresh?: string,
  ) {
    return this.subscriptions.current(
      this.requiredUser(auth),
      refresh === "true",
    );
  }
  @Get("subscriptions/:id")
  subscription(
    @Param("id") id: string,
    @Headers("authorization") auth?: string,
    @Query("refresh") refresh?: string,
  ) {
    return this.subscriptions.status(
      id,
      this.requiredUser(auth),
      refresh === "true",
    );
  }
  @Post("subscriptions/:id/cancel")
  @HttpCode(200)
  cancelSubscription(
    @Param("id") id: string,
    @Body() _dto: CancelSubscriptionDto,
    @Headers("authorization") auth?: string,
  ) {
    return this.subscriptions.cancel(id, this.requiredUser(auth));
  }
  @Post("subscriptions/:id/simulate")
  @HttpCode(200)
  simulateSubscription(
    @Param("id") id: string,
    @Body() dto: SimulateSubscriptionDto,
    @Headers("authorization") auth?: string,
  ) {
    return this.subscriptions.simulate(id, this.requiredUser(auth), dto.pay);
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
  constructor(
    private readonly billing: BillingService,
    private readonly subscriptions: SubscriptionsService,
  ) {}
  @Post()
  @HttpCode(200)
  receive(
    @Query("data.id") id: string,
    @Body() body: unknown,
    @Headers("x-signature") signature: string,
    @Headers("x-request-id") requestId: string,
  ) {
    const type = (body as { type?: string })?.type;
    return SUB_TOPICS[type]
      ? this.subscriptions.receive(type, id, body, signature, requestId)
      : this.billing.receiveWebhook(id, body, signature, requestId);
  }
}
