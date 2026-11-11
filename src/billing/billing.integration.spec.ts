import { Test } from "@nestjs/testing";
import { ValidationPipe, INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { createServer, Server } from "http";
import { createHmac, randomUUID } from "crypto";
import { PrismaModule } from "../common/prisma/prisma.module";
import { PrismaService } from "../common/prisma/prisma.service";
import { CrmModule } from "../crm/crm.module";
import { BillingModule } from "./billing.module";
import { BillingService } from "./billing.service";
import { NotificationsModule } from "../notifications/notifications.module";
import { NotificationsService } from "../notifications/notifications.service";
import { ProviderPayment } from "./provider";
import { PaymentProvider } from "./provider";
import { BadGatewayException } from "@nestjs/common";
import { addMonths } from "./catalog";
import { CuposModule } from "../cupos/cupos.module";
import { CuposService } from "../cupos/cupos.service";
import { AccountDataService } from "../account/account-data.service";
import { AccountModule } from "../account/account.module";
import { AuthModule } from "../auth/auth.module";
import { ExportsModule } from "../exports/exports.module";
import * as argon2 from "argon2";
import { readFileSync } from "node:fs";
import { SubscriptionsService } from "./subscriptions.service";
import { COMMERCIAL_CATALOG } from "../commercial/catalog";

const integration =
  process.env.OBS_ISOLATED_TEST_DB === "1" ? describe : describe.skip;
integration("pagos y notificaciones en PostgreSQL aislado", () => {
  let app: INestApplication,
    db: PrismaService,
    billing: BillingService,
    notifications: NotificationsService,
    base: string,
    provider: Server;
  let user: any,
    other: any,
    token: string,
    otherToken: string,
    serial = 100;
  const payments = new Map<string, ProviderPayment>();
  const idempotency = new Map<string, string>();
  const recurring =
    require("../../operations/mock-subscriptions.cjs").createSubscriptionFixture(
      payments,
      () => ++serial,
    );
  jest.setTimeout(60000);
  async function call(
    route: string,
    method = "GET",
    body?: unknown,
    options: { service?: boolean; token?: string; access?: string } = {
      service: true,
      token: undefined,
    },
  ) {
    const response = await fetch(base + route, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(options.service === false
          ? {}
          : { "x-obs-admin": process.env.ADMIN_SECRET }),
        ...(options.token ? { Authorization: "Bearer " + options.token } : {}),
        ...(options.access ? { "x-payment-token": options.access } : {}),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    return { status: response.status, data: await response.json() };
  }
  // Historical one-time monthly purchases remain valid; new monthly checkouts use subscriptions.
  const legacyOrder = async (userId = user.id) => {
    const account = await db.user.findUnique({ where: { id: userId } });
    const row = await db.billingOrder.create({
      data: {
        requestKey: randomUUID(),
        userId,
        kind: "pro",
        product: "pro_mensual",
        amount: 26000,
        months: 1,
        description: "Pro mensual histórico",
        contactEmail: account.email,
        accessHash: randomUUID(),
      },
    });
    return { ...row, amount: 26000, guest: false, accessToken: "" };
  };
  const order = () => legacyOrder();
  async function payment(id: string, status = "approved") {
    const p: ProviderPayment = {
      id: String(++serial),
      external_reference: id,
      status,
      transaction_amount: 26000,
      currency_id: "ARS",
      collector_id: 1234,
      date_last_updated: new Date().toISOString(),
    };
    payments.set(String(p.id), p);
    return p;
  }
  beforeAll(async () => {
    const url = new URL(process.env.DATABASE_URL);
    if (
      url.hostname !== "127.0.0.1" ||
      url.pathname !== "/observatorio_billing_fixture"
    )
      throw Error("Se requiere una base efímera local de pruebas");
    provider = createServer(async (req, res) => {
      const url = new URL(req.url, "http://localhost");
      let body = "";
      for await (const chunk of req) body += chunk;
      let data: any;
      const input = body ? JSON.parse(body) : {};
      if (url.pathname === "/api/pagos/proveedor") {
        if (req.headers["x-obs-admin"] !== process.env.ADMIN_SECRET) {
          res.statusCode = 401;
          res.end("{}");
          return;
        }
        if (req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end('{"enabled":true}');
          return;
        }
        const forwarded = await fetch(
          process.env.MP_API_BASE_URL + input.path,
          {
            method: input.method ?? (input.body === undefined ? "GET" : "POST"),
            headers: {
              "Content-Type": "application/json",
              ...(input.key ? { "x-idempotency-key": input.key } : {}),
            },
            ...(input.body === undefined
              ? {}
              : { body: JSON.stringify(input.body) }),
          },
        );
        res.setHeader("Content-Type", "application/json");
        res.statusCode = forwarded.status;
        res.end(await forwarded.text());
        return;
      }
      const recurringResponse = recurring.handle(req.method, url, input);
      if (recurringResponse) {
        res.statusCode = recurringResponse.status ?? 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(recurringResponse.body));
        return;
      }
      if (url.pathname === "/users/me") data = { id: 1234 };
      else if (req.method === "POST" && url.pathname === "/v1/payments") {
        const key = String(req.headers["x-idempotency-key"]);
        let id = idempotency.get(key);
        if (!id) {
          const p = await payment(input.external_reference);
          p.transaction_amount = input.transaction_amount;
          id = String(p.id);
          idempotency.set(key, id);
        }
        data = payments.get(id);
      } else if (url.pathname === "/v1/payments/search")
        data = {
          results: [...payments.values()].filter(
            (p) =>
              p.external_reference ===
              url.searchParams.get("external_reference"),
          ),
        };
      else if (url.pathname.startsWith("/v1/payments/"))
        data = payments.get(url.pathname.split("/").pop());
      else if (url.pathname === "/checkout/preferences")
        data = {
          id: "fixture-preference",
          init_point:
            "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=fixture",
        };
      if (!data) {
        res.statusCode = 404;
        data = { error: "fixture not found" };
      }
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    });
    await new Promise<void>((resolve) =>
      provider.listen(0, "127.0.0.1", resolve),
    );
    process.env.MP_API_BASE_URL = `http://127.0.0.1:${(provider.address() as any).port}`;
    const module = await Test.createTestingModule({
      imports: [
        PrismaModule,
        BillingModule,
        NotificationsModule,
        CrmModule,
        CuposModule,
        AccountModule,
        AuthModule,
        ExportsModule,
      ],
    }).compile();
    app = module.createNestApplication();
    app.setGlobalPrefix("api");
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.listen(0, "127.0.0.1");
    base = (await app.getUrl()) + "/api";
    db = app.get(PrismaService);
    billing = app.get(BillingService);
    notifications = app.get(NotificationsService);
  });
  afterAll(async () => {
    await app?.close();
    await new Promise<void>((resolve) => provider?.close(() => resolve()));
  });
  beforeEach(async () => {
    await db.$executeRawUnsafe(
      'TRUNCATE TABLE "users", "billing_orders", "provider_events", "domain_events", "notification_campaigns", "pagos", "ingresos", "founders" CASCADE',
    );
    await db.norms.createMany({
      data: Array.from({ length: 20 }, (_, i) => ({
        id: `fixture-law-${i}`,
        title: `Ley de prueba ${i}`,
        jurisdiction: "NACIONAL",
        norm_type: "LEY",
      })),
      skipDuplicates: true,
    });
    recurring.reset();
    payments.clear();
    idempotency.clear();
    user = await db.user.create({
      data: {
        email: "a@fixture.invalid",
        passwordHash: "disabled-fixture",
        status: "active",
      },
    });
    other = await db.user.create({
      data: {
        email: "b@fixture.invalid",
        passwordHash: "disabled-fixture",
        status: "active",
      },
    });
    const jwt = app.get(JwtService);
    token = jwt.sign(
      { sub: user.id, email: user.email, roles: [] },
      { secret: process.env.JWT_ACCESS_SECRET, expiresIn: "1h" },
    );
    otherToken = jwt.sign(
      { sub: other.id, email: other.email, roles: [] },
      { secret: process.env.JWT_ACCESS_SECRET, expiresIn: "1h" },
    );
  });
  const subscribe = (overrides = {}) =>
    call(
      "/billing/subscriptions",
      "POST",
      {
        requestKey: randomUUID(),
        catalogVersion: COMMERCIAL_CATALOG.version,
        consent: true,
        ...overrides,
      },
      { token },
    );
  const subs = () => app.get(SubscriptionsService);
  const localSub = (id: string) =>
    db.proSubscription.findUniqueOrThrow({ where: { id } });
  async function chargeSubscription(id: string, options = {}) {
    const row = await localSub(id);
    const invoice = recurring.charge(row.providerId, options);
    await subs().invoice(invoice.id);
    return invoice;
  }
  it("mensual requiere consentimiento, sesion y catalogo vigente; no admite compra unica", async () => {
    expect(
      (
        await call("/billing/subscriptions", "POST", {
          requestKey: randomUUID(),
          catalogVersion: COMMERCIAL_CATALOG.version,
          consent: true,
        })
      ).status,
    ).toBe(401);
    expect((await subscribe({ consent: false })).status).toBe(400);
    expect((await subscribe({ catalogVersion: "old" })).status).toBe(409);
    expect(
      (
        await call(
          "/billing/orders",
          "POST",
          { requestKey: randomUUID(), tipo: "pro", producto: "pro_mensual" },
          { token },
        )
      ).status,
    ).toBe(400);
    expect(recurring.created).toBe(0);
  });
  it("dos solicitudes concurrentes crean un solo mandato; autorizar no acredita Pro", async () => {
    const results = await Promise.all([subscribe(), subscribe()]);
    const ok = results.find((r) => r.status === 200);
    expect(ok).toBeDefined();
    expect(recurring.created).toBe(1);
    const row = await localSub(ok.data.id);
    const remote = recurring.subscriptions.get(row.providerId);
    remote.status = "authorized";
    const state = await subs().status(row.id, user.id, true);
    expect(state.status).toBe("authorized");
    expect(state.hasPaidPeriod).toBe(false);
    expect((await db.user.findUnique({ where: { id: user.id } })).plan).toBe(
      "free",
    );
    expect((await subscribe()).data.id).toBe(row.id);
    expect(recurring.created).toBe(1);
    expect(
      (
        await call("/billing/subscriptions/" + row.id, "GET", undefined, {
          token: otherToken,
        })
      ).status,
    ).toBe(404);
    expect(
      (
        await call(
          "/billing/subscriptions/" + row.id + "/cancel",
          "POST",
          { confirmed: true },
          { token: otherToken },
        )
      ).status,
    ).toBe(404);
  });
  it("respuesta perdida se recupera sin repetir alta; rechazo definitivo permite reintentar", async () => {
    recurring.failCreate = "reject";
    expect((await subscribe()).status).toBe(502);
    expect(
      await db.proSubscription.count({ where: { status: "cancelled" } }),
    ).toBe(1);
    recurring.failCreate = "lost";
    expect((await subscribe()).status).toBe(502);
    expect(recurring.created).toBe(1);
    const retry = await subscribe();
    expect(retry.status).toBe(200);
    expect(retry.data.status).toBe("pending");
    expect(recurring.created).toBe(1);
  });
  it("cada factura acredita un periodo fijo una sola vez; rechazo y devolucion no agregan meses", async () => {
    const created = await subscribe();
    expect(created.status).toBe(200);
    const id = created.data.id;
    const at = new Date();
    const first = await chargeSubscription(id, { at: at.toISOString() });
    const once = await db.user.findUnique({ where: { id: user.id } });
    expect(once.plan).toBe("pro");
    expect(+once.planUntil).toBe(+addMonths(at, 1));
    await Promise.all([subs().invoice(first.id), subs().invoice(first.id)]);
    expect(await db.entitlementGrant.count()).toBe(1);
    const second = await chargeSubscription(id, {
      at: addMonths(at, 1).toISOString(),
    });
    const end = (await db.user.findUnique({ where: { id: user.id } }))
      .planUntil;
    expect(+end).toBe(+addMonths(at, 2));
    await chargeSubscription(id, {
      at: addMonths(at, 2).toISOString(),
      status: "rejected",
    });
    expect(
      +(await db.user.findUnique({ where: { id: user.id } })).planUntil,
    ).toBe(+end);
    const p = payments.get(String(first.payment.id));
    p.status = "refunded";
    p.date_last_updated = new Date(Date.now() + 2000).toISOString();
    await subs().invoice(first.id);
    expect(
      +(await db.user.findUnique({ where: { id: user.id } })).planUntil,
    ).toBe(+end);
    expect(await db.entitlementGrant.count({ where: { active: true } })).toBe(
      1,
    );
    expect(await db.billingOrder.count({ where: { subscriptionId: id } })).toBe(
      3,
    );
    await subs().invoice(second.id);
    expect(
      +(await db.user.findUnique({ where: { id: user.id } })).planUntil,
    ).toBe(+end);
  });
  it("validacion canonica rechaza factura de otra moneda, monto o receptor", async () => {
    const result = await subscribe();
    for (const options of [
      { amount: 1 },
      { currency: "USD" },
      { collector: 9999 },
    ]) {
      const row = await localSub(result.data.id);
      const invoice = recurring.charge(row.providerId, options);
      await expect(subs().invoice(invoice.id)).rejects.toThrow();
    }
    expect(await db.entitlementGrant.count()).toBe(0);
  });
  it("cancelacion confirmada conserva acceso pagado y habilita anual de pago unico", async () => {
    const result = await subscribe();
    await chargeSubscription(result.data.id);
    const before = await db.user.findUnique({ where: { id: user.id } });
    expect(
      (
        await call(
          "/billing/orders",
          "POST",
          { requestKey: randomUUID(), tipo: "pro", producto: "pro_anual" },
          { token },
        )
      ).status,
    ).toBe(409);
    const cancelled = await call(
      "/billing/subscriptions/" + result.data.id + "/cancel",
      "POST",
      { confirmed: true },
      { token },
    );
    expect(cancelled.status).toBe(200);
    expect(cancelled.data.status).toBe("cancelled");
    expect(cancelled.data.hasPaidPeriod).toBe(true);
    expect(
      +(await db.user.findUnique({ where: { id: user.id } })).planUntil,
    ).toBe(+before.planUntil);
    const annual = await call(
      "/billing/orders",
      "POST",
      { requestKey: randomUUID(), tipo: "pro", producto: "pro_anual" },
      { token },
    );
    expect(annual.status).toBe(200);
    expect(annual.data.amount).toBe(200000);
    const p = await payment(annual.data.id);
    p.transaction_amount = 200000;
    await billing.apply(p);
    expect(
      +(await db.user.findUnique({ where: { id: user.id } })).planUntil,
    ).toBe(+addMonths(before.planUntil, 12));
    expect(recurring.created).toBe(1);
  });
  it("no suprime cuentas si cancelar quedo incierto; reintento confirma antes de borrar", async () => {
    const result = await subscribe();
    recurring.failCancel = true;
    await db.user.update({ where: { id: other.id }, data: { isAdmin: true } });
    await expect(
      app.get(AccountDataService).moveToTrash(other.id, user.id),
    ).rejects.toThrow();
    expect((await db.user.findUnique({ where: { id: user.id } })).status).toBe(
      "active",
    );
    expect((await localSub(result.data.id)).cancelRequestedAt).toBeTruthy();
    await app.get(AccountDataService).moveToTrash(other.id, user.id);
    expect((await localSub(result.data.id)).status).toBe("cancelled");
    expect((await db.user.findUnique({ where: { id: user.id } })).status).toBe(
      "trashed",
    );
  });
  it("webhook de factura es durable, firmado e idempotente; evento de pago tambien recupera factura", async () => {
    const result = await subscribe();
    const row = await localSub(result.data.id);
    const invoice = recurring.charge(row.providerId);
    const requestId = randomUUID(),
      ts = String(Date.now());
    const signature =
      "ts=" +
      ts +
      ",v1=" +
      createHmac("sha256", process.env.MP_WEBHOOK_SECRET)
        .update(`id:${invoice.id};request-id:${requestId};ts:${ts};`)
        .digest("hex");
    const body = {
      type: "subscription_authorized_payment",
      data: { id: invoice.id },
    };
    await expect(
      subs().receive(body.type, invoice.id, body, "bad", requestId),
    ).rejects.toThrow();
    await subs().receive(body.type, invoice.id, body, signature, requestId);
    await subs().receive(body.type, invoice.id, body, signature, requestId);
    expect(await db.providerEvent.count()).toBe(1);
    expect(await db.entitlementGrant.count()).toBe(0);
    await subs().tick();
    expect(await db.entitlementGrant.count()).toBe(1);
    const next = recurring.charge(row.providerId);
    await billing.processPayment(String(next.payment.id));
    await subs().tick();
    expect(await db.entitlementGrant.count()).toBe(2);
    expect(await db.providerEvent.count({ where: { processedAt: null } })).toBe(
      0,
    );
  });
  it("prepago se respeta y una cancelacion antigua no cancela un mandato nuevo", async () => {
    const until = new Date(Date.now() + 10 * 86400000);
    await db.user.update({
      where: { id: user.id },
      data: { plan: "pro", planUntil: until },
    });
    const a = await subscribe();
    expect(a.status).toBe(200);
    const row = await localSub(a.data.id);
    expect(+row.startsAt).toBe(+until);
    expect(
      recurring.subscriptions.get(row.providerId).auto_recurring.start_date,
    ).toBe(until.toISOString());
    await subs().cancel(row.id, user.id);
    const b = await subscribe();
    expect(b.status).toBe(200);
    expect(b.data.id).not.toBe(row.id);
    await subs().cancel(row.id, user.id);
    expect((await localSub(b.data.id)).status).toBe("pending");
    const old = process.env.NODE_ENV;
    try {
      process.env.NODE_ENV = "production";
      await expect(subs().simulate(b.data.id, user.id, true)).rejects.toThrow();
    } finally {
      process.env.NODE_ENV = old;
    }
  });
  it("adaptador privado conserva credenciales del frontend y admite alta y cancelacion PUT", async () => {
    const oldToken = process.env.MP_ACCESS_TOKEN,
      oldSite = process.env.MP_SITE_URL;
    try {
      delete process.env.MP_ACCESS_TOKEN;
      process.env.MP_SITE_URL = process.env.MP_API_BASE_URL;
      const created = await subscribe();
      expect(created.status).toBe(200);
      expect(recurring.created).toBe(1);
      const cancelled = await subs().cancel(created.data.id, user.id);
      expect(cancelled.status).toBe("cancelled");
    } finally {
      process.env.MP_ACCESS_TOKEN = oldToken;
      process.env.MP_SITE_URL = oldSite;
    }
  });
  it("pausa comercial bloquea nuevas suscripciones pero permite cancelar y consultar", async () => {
    const a = await subscribe();
    const old = process.env.BILLING_ENABLED;
    try {
      process.env.BILLING_ENABLED = "false";
      expect((await subscribe()).status).toBe(503);
      expect((await subs().cancel(a.data.id, user.id)).status).toBe(
        "cancelled",
      );
    } finally {
      process.env.BILLING_ENABLED = old;
    }
  });
  it("el login funciona con el esquema migrado y emite una sesión", async () => {
    const password = "Login-fixture-2026!";
    await db.user.update({
      where: { id: user.id },
      data: { passwordHash: await argon2.hash(password) },
    });
    const result = await call(
      "/auth/login",
      "POST",
      { email: user.email, password },
      { service: false },
    );
    expect(result.status).toBe(200);
    expect(result.data.user.id).toBe(user.id);
    expect(typeof result.data.accessToken).toBe("string");
    expect(typeof result.data.refreshToken).toBe("string");
    expect(await db.session.count({ where: { userId: user.id } })).toBe(1);
    expect(
      (
        await call(
          "/auth/login",
          "POST",
          { email: user.email, password: "incorrect-password" },
          { service: false },
        )
      ).status,
    ).toBe(401);
  });
  it("la migración importa descargas de meses anteriores y excluye análisis", async () => {
    await db.downloadLog.createMany({
      data: Array.from({ length: 7 }, (_, i) => ({
        userId: user.id,
        kind: i % 2 ? "ley" : "articulo",
        createdAt: new Date("2025-01-01"),
      })),
    });
    await db.downloadLog.create({ data: { userId: other.id, kind: "lector" } });
    const sql = readFileSync(
      "prisma/migrations/20261110210000_lifetime_downloads/migration.sql",
      "utf8",
    );
    await db.$transaction(async (tx) => {
      // Recreate the pre-migration shape only inside this disposable fixture.
      await tx.$executeRawUnsafe(
        "ALTER TABLE users DROP COLUMN free_downloads_used",
      );
      for (const statement of sql.split(";").filter((s) => s.trim()))
        await tx.$executeRawUnsafe(statement);
    });
    expect(
      (await db.user.findUnique({ where: { id: user.id } })).freeDownloadsUsed,
    ).toBe(5);
    expect(
      (await db.user.findUnique({ where: { id: other.id } })).freeDownloadsUsed,
    ).toBe(0);
    expect(
      (await app.get(CuposService).autorizar(user.id, "ley", "fixture-law-0"))
        .ok,
    ).toBe(false);
  });
  it("cinco descargas totales entre tipos, incluso con diez solicitudes concurrentes", async () => {
    const cupos = app.get(CuposService);
    const results = await Promise.all(
      Array.from({ length: 10 }, (_, i) =>
        cupos.autorizar(
          user.id,
          ["ley", "articulo"][i % 2],
          `fixture-law-${i}`,
        ),
      ),
    );
    expect(results.filter((r) => r.ok)).toHaveLength(5);
    expect(
      (await db.user.findUnique({ where: { id: user.id } })).freeDownloadsUsed,
    ).toBe(5);
    expect(await db.downloadLog.count({ where: { userId: user.id } })).toBe(5);
    expect((await cupos.resumen(user.id)).descargas.restante).toBe(0);
    expect(results.every((r) => r.renueva === null)).toBe(true);
  });
  it("el saldo no se recupera al cambiar de mes, limpiar logs o vencer Pro; lector separado", async () => {
    const cupos = app.get(CuposService);
    await db.user.update({
      where: { id: user.id },
      data: { freeDownloadsUsed: 5 },
    });
    await db.downloadLog.deleteMany({ where: { userId: user.id } });
    expect((await cupos.autorizar(user.id, "ley", "fixture-law-0")).ok).toBe(
      false,
    );
    expect((await cupos.autorizar(user.id, "lector")).ok).toBe(true);
    expect((await cupos.autorizar(user.id, "lector")).ok).toBe(false);
    await db.user.update({
      where: { id: user.id },
      data: { plan: "pro", planUntil: new Date(Date.now() + 86400000) },
    });
    expect((await cupos.autorizar(user.id, "exportacion")).ok).toBe(true);
    await db.user.update({
      where: { id: user.id },
      data: { planUntil: new Date(Date.now() - 86400000) },
    });
    expect(
      (await cupos.autorizar(user.id, "articulo", "fixture-law-1")).ok,
    ).toBe(false);
  });
  it("exportaciones usan la cuenta autenticada y comparten el saldo sin guestId", async () => {
    expect(
      (await call("/exports", "POST", { type: "pdf" }, { service: false }))
        .status,
    ).toBe(401);
    expect(
      (await call("/exports", "POST", { type: "pdf" }, { token })).data.ok,
    ).toBe(false);
    expect(
      (await db.user.findUnique({ where: { id: user.id } })).freeDownloadsUsed,
    ).toBe(0);
    expect(
      (await call("/exports", "POST", { type: "exe" }, { token })).status,
    ).toBe(400);
    expect(
      (await call("/exports/count", "GET", undefined, { token })).data
        .remaining,
    ).toBe(0);
  });
  it("papelera exige administrador real y confirmación, suspende, restaura y anonimiza al purgar", async () => {
    const actor = await db.user.create({
      data: {
        email: "admin@fixture.invalid",
        isAdmin: true,
        passwordHash: "disabled",
      },
    });
    const adminToken = app
      .get(JwtService)
      .sign(
        { sub: actor.id },
        { secret: process.env.JWT_ACCESS_SECRET, expiresIn: "1h" },
      );
    const path = `/admin/users/${other.id}/delete`,
      body = { confirmed: true };
    expect(
      (await call(path, "POST", body, { service: false, token: adminToken }))
        .status,
    ).toBe(401);
    expect((await call(path, "POST", body, { token })).status).toBe(403);
    expect(
      (await call(path, "POST", { confirmed: false }, { token: adminToken }))
        .status,
    ).toBe(400);
    expect(
      (
        await call(`/admin/users/${actor.id}/delete`, "POST", body, {
          token: adminToken,
        })
      ).status,
    ).toBe(403);
    const purchase = await legacyOrder(other.id);
    await billing.apply(await payment(purchase.id));
    await db.session.create({
      data: {
        userId: other.id,
        tokenHash: randomUUID(),
        expiresAt: new Date(Date.now() + 86400000),
      },
    });
    expect((await call(path, "POST", body, { token: adminToken })).status).toBe(
      200,
    );
    let trashed = await db.user.findUnique({ where: { id: other.id } });
    expect(trashed.status).toBe("trashed");
    expect(+trashed.purgeAt - +trashed.trashedAt).toBe(30 * 86400000);
    expect(await db.session.count({ where: { userId: other.id } })).toBe(0);
    expect(
      (await call("/auth/me", "GET", undefined, { token: otherToken })).status,
    ).toBe(401);
    expect(
      (
        await call(`/admin/users/${other.id}/restore`, "POST", body, {
          token: adminToken,
        })
      ).status,
    ).toBe(200);
    expect((await db.user.findUnique({ where: { id: other.id } })).status).toBe(
      "active",
    );
    expect((await call(path, "POST", body, { token: adminToken })).status).toBe(
      200,
    );
    expect(
      (
        await call(
          "/admin/users/trash/purge",
          "POST",
          { confirmed: true, ids: [other.id] },
          { token: adminToken },
        )
      ).status,
    ).toBe(200);
    expect(await db.user.findUnique({ where: { id: other.id } })).toBeNull();
    expect(
      (await db.billingOrder.findUnique({ where: { id: purchase.id } }))
        .contactEmail,
    ).toBeNull();
    expect(await db.billingPayment.count()).toBe(1);
    expect((await db.ingreso.findFirst()).cliente).toBeNull();
  });
  it("la limpieza automática elimina sólo cuentas cuyo plazo venció", async () => {
    await db.user.update({
      where: { id: user.id },
      data: {
        status: "trashed",
        trashedAt: new Date(Date.now() - 31 * 86400000),
        purgeAt: new Date(Date.now() - 1000),
      },
    });
    await db.user.update({
      where: { id: other.id },
      data: {
        status: "trashed",
        trashedAt: new Date(),
        purgeAt: new Date(Date.now() + 86400000),
      },
    });
    await app.get(AccountDataService).purgeExpiredTrash();
    expect(await db.user.findUnique({ where: { id: user.id } })).toBeNull();
    expect(
      await db.user.findUnique({ where: { id: other.id } }),
    ).not.toBeNull();
  });
  it("una ley y sus artículos comparten 30 días sin extender el plazo ni consumir otro crédito", async () => {
    const cupos = app.get(CuposService);
    const results = await Promise.all(
      Array.from({ length: 10 }, (_, i) =>
        cupos.autorizar(
          user.id,
          i % 2 ? "articulo" : "ley",
          `fixture-law-0${i % 2 ? "#1" : ""}`,
        ),
      ),
    );
    expect(results.every((r) => r.ok)).toBe(true);
    expect(
      (await db.user.findUnique({ where: { id: user.id } })).freeDownloadsUsed,
    ).toBe(1);
    const access = await db.lawDownloadAccess.findFirst({
      where: { userId: user.id },
    });
    expect(+access.expiresAt - +access.createdAt).toBeLessThanOrEqual(
      30 * 86400000,
    );
    await cupos.autorizar(user.id, "ley", "fixture-law-0");
    expect(
      +(await db.lawDownloadAccess.findUnique({ where: { id: access.id } }))
        .expiresAt,
    ).toBe(+access.expiresAt);
    await db.lawDownloadAccess.update({
      where: { id: access.id },
      data: { expiresAt: new Date(Date.now() - 1000) },
    });
    expect((await cupos.autorizar(user.id, "ley", "fixture-law-0")).ok).toBe(
      true,
    );
    expect(
      (await db.user.findUnique({ where: { id: user.id } })).freeDownloadsUsed,
    ).toBe(2);
  });
  it("compras idempotentes duran un año, respetan cupo gratuito y revierten sólo su saldo", async () => {
    const o = await billing.create(
      { requestKey: randomUUID(), tipo: "descargas", producto: "descargas_10" },
      user.id,
    );
    const p = await payment(o.id);
    p.transaction_amount = 8000;
    await Promise.all([billing.apply(p), billing.apply(p)]);
    expect(await db.downloadCredit.count()).toBe(1);
    let credit = await db.downloadCredit.findFirst();
    expect(credit.remaining).toBe(10);
    expect(+credit.expiresAt - Date.now()).toBeGreaterThan(364 * 86400000);
    const cupos = app.get(CuposService);
    await cupos.autorizar(user.id, "ley", "fixture-law-0");
    expect((await db.downloadCredit.findFirst()).remaining).toBe(10);
    await db.user.update({
      where: { id: user.id },
      data: { freeDownloadsUsed: 5 },
    });
    await cupos.autorizar(user.id, "ley", "fixture-law-1");
    expect((await db.downloadCredit.findFirst()).remaining).toBe(9);
    await notifications.syncAccount(user.id);
    expect(
      await db.userNotification.count({
        where: {
          userId: user.id,
          eventKey: { startsWith: "quota:" },
          archivedAt: null,
        },
      }),
    ).toBe(0);
    await billing.apply({
      ...p,
      status: "refunded",
      date_last_updated: new Date(Date.now() + 1000).toISOString(),
    });
    credit = await db.downloadCredit.findFirst();
    expect(credit.remaining).toBe(0);
    expect(credit.revokedAt).not.toBeNull();
    expect(
      await db.lawDownloadAccess.count({
        where: { userId: user.id, creditId: credit.id },
      }),
    ).toBe(0);
    expect(
      await db.lawDownloadAccess.count({
        where: { userId: user.id, source: "free" },
      }),
    ).toBe(1);
  });
  it("avisos iniciales se deduplican; producto espera 48 horas salvo activación explícita", async () => {
    await db.user.update({
      where: { id: user.id },
      data: { freeDownloadsUsed: 5 },
    });
    await notifications.syncAccount(user.id);
    await notifications.syncAccount(user.id);
    expect(
      await db.userNotification.count({
        where: { userId: user.id, eventKey: { startsWith: "welcome:" } },
      }),
    ).toBe(1);
    expect(
      await db.userNotification.count({
        where: { userId: user.id, eventKey: { startsWith: "product:" } },
      }),
    ).toBe(0);
    expect(
      await db.userNotification.count({
        where: {
          userId: user.id,
          eventKey: { startsWith: "quota:" },
          archivedAt: null,
        },
      }),
    ).toBe(1);
    await notifications.syncAccount(user.id, true);
    expect(
      await db.userNotification.count({
        where: { userId: user.id, eventKey: { startsWith: "product:" } },
      }),
    ).toBe(1);
    await db.user.update({
      where: { id: user.id },
      data: { plan: "pro", planUntil: new Date(Date.now() + 86400000) },
    });
    await notifications.syncAccount(user.id);
    expect(
      await db.userNotification.count({
        where: {
          userId: user.id,
          eventKey: { startsWith: "quota:" },
          archivedAt: null,
        },
      }),
    ).toBe(0);
  });
  it("saldo vencido no autoriza otra ley, pero conserva una ley previamente habilitada", async () => {
    const o = await billing.create(
      { requestKey: randomUUID(), tipo: "descargas", producto: "descargas_10" },
      user.id,
    );
    const p = await payment(o.id);
    p.transaction_amount = 8000;
    await billing.apply(p);
    await db.user.update({
      where: { id: user.id },
      data: { freeDownloadsUsed: 5 },
    });
    const cupos = app.get(CuposService);
    expect((await cupos.autorizar(user.id, "ley", "fixture-law-0")).ok).toBe(
      true,
    );
    const credit = await db.downloadCredit.findFirst();
    await db.downloadCredit.update({
      where: { id: credit.id },
      data: { expiresAt: new Date(Date.now() - 1000) },
    });
    expect((await cupos.resumen(user.id)).compradas.restante).toBe(0);
    expect(
      (await cupos.autorizar(user.id, "articulo", "fixture-law-0#1")).ok,
    ).toBe(true);
    expect((await cupos.autorizar(user.id, "ley", "fixture-law-1")).ok).toBe(
      false,
    );
    expect((await db.downloadCredit.findFirst()).remaining).toBe(9);
  });
  it("una versión de catálogo diferente se rechaza antes de crear la orden", async () => {
    expect(
      (
        await call(
          "/billing/orders",
          "POST",
          {
            requestKey: randomUUID(),
            tipo: "descargas",
            producto: "descargas_1",
            catalogVersion: "old",
          },
          { token },
        )
      ).status,
    ).toBe(409);
    expect(await db.billingOrder.count()).toBe(0);
  });
  it("fallar la auditoría revierte todo el borrado administrativo", async () => {
    const actor = await db.user.create({
      data: {
        email: "rollback-admin@fixture.invalid",
        isAdmin: true,
        passwordHash: await argon2.hash("Fixture-delete-2026!"),
      },
    });
    const adminToken = app
      .get(JwtService)
      .sign(
        { sub: actor.id },
        { secret: process.env.JWT_ACCESS_SECRET, expiresIn: "1h" },
      );
    await db.$executeRawUnsafe(
      "CREATE OR REPLACE FUNCTION deletion_fixture_fail() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'fixture'; END $$",
    );
    await db.$executeRawUnsafe(
      "CREATE TRIGGER deletion_fixture_failure BEFORE INSERT ON account_requests FOR EACH ROW EXECUTE FUNCTION deletion_fixture_fail()",
    );
    try {
      const response = await call(
        `/admin/users/${other.id}/delete`,
        "POST",
        { confirmed: true },
        { token: adminToken },
      );
      expect(response.status).toBe(500);
      expect(
        await db.user.findUnique({ where: { id: other.id } }),
      ).not.toBeNull();
    } finally {
      await db.$executeRawUnsafe(
        "DROP TRIGGER deletion_fixture_failure ON account_requests",
      );
    }
  });
  it("recupera pagos con la configuración anterior y verifica receptor sin variables nuevas", async () => {
    const names = [
      "BILLING_ENABLED",
      "MP_COLLECTOR_ID",
      "MP_WEBHOOK_SECRET",
      "MP_SITE_URL",
      "FRONTEND_URL",
    ];
    const saved = Object.fromEntries(
      names.map((name) => [name, process.env[name]]),
    );
    try {
      for (const name of names) delete process.env[name];
      expect((await call("/billing/config")).data.enabled).toBe(true);
      expect(app.get(PaymentProvider).site()).toBe(
        "https://observatorio-de-leyes.com",
      );
      process.env.FRONTEND_URL = process.env.MP_API_BASE_URL;
      const o = await order();
      await billing.submit(
        await billing.owned(o.id, user.id, null),
        randomUUID(),
        { token: "synthetic", payment_method_id: "visa" },
      );
      expect(payments.size).toBe(1);
      expect(await db.entitlementGrant.count()).toBe(1);
      expect(
        (
          await call(
            "/billing/webhook?data.id=123",
            "POST",
            { data: { id: "123" } },
            { service: false },
          )
        ).status,
      ).toBe(503);
      expect(
        (
          await call(
            "/billing/verified-webhook?data.id=123",
            "POST",
            { data: { id: "123" } },
            { service: false },
          )
        ).status,
      ).toBe(401);
      const id = [...payments.keys()][0];
      const receipt = await fetch(
        base + "/billing/verified-webhook?data.id=" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-obs-admin": process.env.ADMIN_SECRET,
            "x-signature": "verified-by-frontend",
            "x-request-id": "legacy-receipt",
          },
          body: JSON.stringify({ type: "payment", data: { id } }),
        },
      );
      expect(receipt.status).toBe(200);
      await billing.tick();
      expect(await db.entitlementGrant.count()).toBe(1);
    } finally {
      for (const name of names) {
        if (saved[name] === undefined) delete process.env[name];
        else process.env[name] = saved[name];
      }
    }
  });
  it("usa las credenciales existentes del servidor frontend sin transferirlas al backend", async () => {
    const saved = {
      token: process.env.MP_ACCESS_TOKEN,
      site: process.env.MP_SITE_URL,
      flag: process.env.BILLING_ENABLED,
    };
    try {
      delete process.env.MP_ACCESS_TOKEN;
      delete process.env.BILLING_ENABLED;
      process.env.MP_SITE_URL = process.env.MP_API_BASE_URL;
      expect((await call("/billing/config")).data.enabled).toBe(true);
      const o = await order();
      await billing.submit(
        await billing.owned(o.id, user.id, null),
        randomUUID(),
        { token: "synthetic", payment_method_id: "visa" },
      );
      expect(payments.size).toBe(1);
      expect(await db.entitlementGrant.count()).toBe(1);
    } finally {
      process.env.MP_ACCESS_TOKEN = saved.token;
      process.env.MP_SITE_URL = saved.site;
      process.env.BILLING_ENABLED = saved.flag;
    }
  });
  it("una pausa explícita sigue bloqueando los cobros", async () => {
    const flag = process.env.BILLING_ENABLED;
    try {
      process.env.BILLING_ENABLED = "false";
      expect((await call("/billing/config")).data.enabled).toBe(false);
      await expect(
        app.get(PaymentProvider).request("/v1/payments", {}),
      ).rejects.toThrow();
      expect(payments.size).toBe(0);
    } finally {
      process.env.BILLING_ENABLED = flag;
    }
  });
  it("reabre sólo eventos no procesados sin crear cargos", async () => {
    const o = await order();
    const p = await payment(o.id);
    await billing.enqueue("exhausted", String(p.id));
    const event = await db.providerEvent.findFirst();
    await db.providerEvent.update({
      where: { id: event.id },
      data: { attempts: 12, error: "fixture" },
    });
    expect(
      (
        await call(
          `/billing/events/provider/${event.id}/retry`,
          "POST",
          {},
          { service: false },
        )
      ).status,
    ).toBe(401);
    expect(
      (await call(`/billing/events/provider/${event.id}/retry`, "POST", {}))
        .status,
    ).toBe(200);
    await billing.tick();
    expect(await db.entitlementGrant.count()).toBe(1);
    const processed = await db.providerEvent.findUnique({
      where: { id: event.id },
    });
    await billing.retryEvent("provider", event.id);
    expect(
      +(await db.providerEvent.findUnique({ where: { id: event.id } }))
        .processedAt,
    ).toBe(+processed.processedAt);
    expect(payments.size).toBe(1);
  });
  it("bloquea CRM financiero sin secreto y retira acreditación antigua", async () => {
    expect(
      (await call("/crm/pro-aprobado", "POST", {}, { service: false })).status,
    ).toBe(401);
    expect((await call("/crm/pro-aprobado", "POST", {})).status).toBe(410);
    expect(
      (await call("/crm/pagos", "POST", {}, { service: false })).status,
    ).toBe(401);
  });
  it("monto/cuenta se fijan en servidor y la orden es idempotente", async () => {
    const dto = {
      requestKey: randomUUID(),
      tipo: "pro",
      producto: "pro_anual",
      monto: 1000,
    };
    const a = await call("/billing/orders", "POST", dto, { token });
    const b = await call("/billing/orders", "POST", dto, { token });
    expect(a.status).toBe(200);
    expect(a.data.amount).toBe(200000);
    expect(b.data.id).toBe(a.data.id);
    expect(
      (await call("/billing/orders", "POST", dto, { token: otherToken }))
        .status,
    ).toBe(409);
    expect(
      (
        await call("/billing/orders", "POST", {
          ...dto,
          requestKey: randomUUID(),
        })
      ).status,
    ).toBe(403);
  });
  it("estado privado por propietario, sin confiar en id UUID", async () => {
    const o = await order();
    expect(
      (
        await call("/billing/orders/" + o.id, "GET", undefined, {
          token: otherToken,
        })
      ).status,
    ).toBe(403);
    expect(
      (await call("/billing/orders/" + o.id, "GET", undefined, { token })).data
        .paymentConfirmed,
    ).toBe(false);
  });
  it("apoyo anónimo exige capacidad privada y nunca concede Pro", async () => {
    const o = await billing.create(
      {
        requestKey: randomUUID(),
        tipo: "apoyo",
        monto: 1000,
        email: "donor@fixture.invalid",
      },
      null,
    );
    expect((await call("/billing/orders/" + o.id)).status).toBe(403);
    expect(
      (
        await call("/billing/orders/" + o.id, "GET", undefined, {
          access: o.accessToken,
        })
      ).status,
    ).toBe(200);
    const p = await payment(o.id);
    p.transaction_amount = 1000;
    await billing.apply(p);
    expect(await db.entitlementGrant.count()).toBe(0);
    expect(await db.ingreso.count()).toBe(1);
  });
  it("diez entregas concurrentes del mismo pago conceden una sola vez y un aviso", async () => {
    const o = await order(),
      p = await payment(o.id);
    await Promise.all(Array.from({ length: 10 }, () => billing.apply(p)));
    expect(await db.entitlementGrant.count()).toBe(1);
    expect(await db.ingreso.count()).toBe(1);
    expect(await db.domainEvent.count()).toBe(1);
    await Promise.all([notifications.deliver(), notifications.deliver()]);
    expect(await db.userNotification.count()).toBe(1);
  });
  it("dos compras simultáneas suman los dos períodos", async () => {
    const [a, b] = await Promise.all([order(), order()]);
    await Promise.all([
      billing.apply(await payment(a.id)),
      billing.apply(await payment(b.id)),
    ]);
    const grants = await db.entitlementGrant.findMany({
      orderBy: [{ grantedAt: "asc" }, { id: "asc" }],
    });
    const baseline = await db.billingBaseline.findUnique({
      where: { userId: user.id },
    });
    const expected = addMonths(
      addMonths(grants[0].grantedAt, 1, baseline.anchorDay),
      1,
      baseline.anchorDay,
    );
    expect(
      +(await db.user.findUnique({ where: { id: user.id } })).planUntil,
    ).toBe(+expected);
    expect(grants).toHaveLength(2);
  });
  it("una falla contable revierte también la concesión; reintento concede sólo una vez", async () => {
    const o = await order(),
      p = await payment(o.id);
    await db.$executeRawUnsafe(
      `CREATE OR REPLACE FUNCTION billing_fixture_fail() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'fixture failure'; END $$`,
    );
    await db.$executeRawUnsafe(
      "CREATE TRIGGER billing_fixture_failure BEFORE INSERT ON ingresos FOR EACH ROW EXECUTE FUNCTION billing_fixture_fail()",
    );
    try {
      await expect(billing.apply(p)).rejects.toThrow();
      expect(await db.entitlementGrant.count()).toBe(0);
      expect((await db.user.findUnique({ where: { id: user.id } })).plan).toBe(
        "free",
      );
    } finally {
      await db.$executeRawUnsafe(
        "DROP TRIGGER billing_fixture_failure ON ingresos",
      );
    }
    await billing.apply(p);
    expect(await db.entitlementGrant.count()).toBe(1);
    expect(await db.domainEvent.count()).toBe(1);
  });
  it("el HTTP de tarjeta usa proveedor simulado e idempotencia de intención", async () => {
    const o = await order();
    const payload = {
      orderId: o.id,
      attemptKey: randomUUID(),
      formData: {
        token: "synthetic-card",
        payment_method_id: "visa",
        installments: 1,
      },
    };
    const first = await call("/billing/payments", "POST", payload, { token });
    const retry = await call("/billing/payments", "POST", payload, { token });
    expect(first.status).toBe(200);
    expect(first.data.entitlementActive).toBe(true);
    expect(retry.data.paymentConfirmed).toBe(true);
    expect(payments.size).toBe(1);
  });
  it("firma obligatoria, ACK durable y deduplicación del webhook", async () => {
    const o = await order(),
      p = await payment(o.id),
      id = String(p.id),
      requestId = "fixture-request",
      ts = "1794319200";
    expect(
      (
        await call(
          "/billing/webhook?data.id=" + id,
          "POST",
          { data: { id } },
          { service: false },
        )
      ).status,
    ).toBe(403);
    const signature = `ts=${ts},v1=${createHmac("sha256", process.env.MP_WEBHOOK_SECRET).update(`id:${id};request-id:${requestId};ts:${ts};`).digest("hex")}`;
    for (let i = 0; i < 2; i++) {
      const response = await fetch(base + "/billing/webhook?data.id=" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-request-id": requestId,
          "x-signature": signature,
        },
        body: JSON.stringify({ type: "payment", data: { id } }),
      });
      expect(response.status).toBe(200);
    }
    expect(await db.providerEvent.count()).toBe(1);
    expect(await db.entitlementGrant.count()).toBe(0);
    await billing.tick();
    expect(await db.entitlementGrant.count()).toBe(1);
    expect((await db.providerEvent.findFirst()).processedAt).not.toBeNull();
  });
  it("monto o receptor incorrectos no acreditan", async () => {
    const o = await order(),
      p = await payment(o.id);
    p.transaction_amount = 1;
    await expect(billing.apply(p)).rejects.toThrow();
    expect(await db.entitlementGrant.count()).toBe(0);
    expect(
      (await db.billingOrder.findUnique({ where: { id: o.id } })).state,
    ).toBe("review");
    p.transaction_amount = 26000;
    p.collector_id = 999;
    await expect(billing.apply(p)).rejects.toThrow();
    expect(await db.entitlementGrant.count()).toBe(0);
  });
  it("reembolso retira sólo su concesión y no duplica reversión contable", async () => {
    const a = await order(),
      b = await order(),
      p = await payment(a.id),
      q = await payment(b.id);
    await billing.apply(p);
    await billing.apply(q);
    p.status = "refunded";
    p.date_last_updated = new Date(Date.now() + 1000).toISOString();
    await billing.apply(p);
    await billing.apply(p);
    expect(await db.entitlementGrant.count({ where: { active: true } })).toBe(
      1,
    );
    expect(await db.ingreso.count({ where: { monto: { lt: 0 } } })).toBe(1);
    expect((await db.user.findUnique({ where: { id: user.id } })).plan).toBe(
      "pro",
    );
  });
  it("evento antiguo no retrocede un pago verificado", async () => {
    const o = await order(),
      p = await payment(o.id);
    await billing.apply(p);
    await billing.apply({
      ...p,
      status: "pending",
      date_last_updated: new Date(Date.now() - 100000).toISOString(),
    });
    expect(
      (await db.billingOrder.findUnique({ where: { id: o.id } })).state,
    ).toBe("approved");
  });
  it("conserva Pro histórico permanente y distinción de fundador tras reembolso", async () => {
    await db.user.update({
      where: { id: user.id },
      data: { isFounder: true, plan: "pro", planUntil: null },
    });
    const o = await order(),
      p = await payment(o.id);
    await billing.apply(p);
    p.status = "refunded";
    p.date_last_updated = new Date(Date.now() + 1000).toISOString();
    await billing.apply(p);
    const u = await db.user.findUnique({ where: { id: user.id } });
    expect(u.isFounder).toBe(true);
    expect(u.plan).toBe("pro");
    expect(u.planUntil).toBeNull();
  });
  it("campaña congela audiencia, excluye admin y respeta preferencias", async () => {
    await db.user.update({ where: { id: other.id }, data: { isAdmin: true } });
    const c = await notifications.createCampaign({
      requestKey: randomUUID(),
      title: "Novedad",
      body: "Mensaje de prueba",
      category: "product",
      actionPath: "/cuenta",
    });
    expect((await notifications.preview(c.id)).eligible).toBe(1);
    expect((await notifications.publish(c.id)).recipients).toBe(1);
    await db.user.create({
      data: { email: "late@fixture.invalid", passwordHash: "disabled" },
    });
    expect((await notifications.publish(c.id)).recipients).toBe(1);
    expect(await db.userNotification.count()).toBe(1);
    expect((await notifications.count(user.id)).count).toBe(2);
  });
  it("marcar, desmarcar, archivar y restaurar no toca bandeja ajena", async () => {
    await notifications.syncAccount(user.id);
    await db.userNotification.updateMany({
      where: { userId: user.id },
      data: { archivedAt: new Date() },
    });
    const row = await db.userNotification.create({
      data: {
        userId: user.id,
        eventKey: randomUUID(),
        category: "account",
        title: "Aviso",
        body: "Prueba",
      },
    });
    expect(
      (
        await call(
          "/notifications/" + row.id + "/read",
          "PATCH",
          { read: true },
          { token: otherToken },
        )
      ).status,
    ).toBe(404);
    await Promise.all([
      notifications.read(user.id, row.id, true),
      notifications.read(user.id, row.id, true),
    ]);
    expect((await notifications.count(user.id)).count).toBe(0);
    await notifications.read(user.id, row.id, false);
    expect((await notifications.count(user.id)).count).toBe(1);
    expect(
      (await db.userNotification.findUnique({ where: { id: row.id } }))
        .firstOpenedAt,
    ).not.toBeNull();
    await notifications.archive(user.id, row.id, true);
    expect((await notifications.list(user.id)).items).toHaveLength(0);
    await notifications.archive(user.id, row.id, false);
    expect((await notifications.list(user.id)).items).toHaveLength(1);
  });
  it("todas las categorías están activas por defecto y se respetan las bajas expresas", async () => {
    const c = await notifications.createCampaign({
      requestKey: randomUUID(),
      title: "Oferta",
      body: "Promoción",
      category: "marketing",
    });
    expect(await notifications.preferences(user.id)).toMatchObject({
      product: true,
      marketing: true,
    });
    expect((await notifications.preview(c.id)).eligible).toBe(2);
    await notifications.preferences(other.id, {
      product: true,
      marketing: false,
    });
    expect((await notifications.preview(c.id)).eligible).toBe(1);
    expect((await notifications.publish(c.id)).recipients).toBe(1);
    expect(
      (await notifications.list(other.id)).items.some(
        (n) => n.campaignId === c.id,
      ),
    ).toBe(false);
    await notifications.withdraw(c.id);
    expect(
      (await notifications.list(user.id)).items.filter(
        (n) => n.campaignId === c.id,
      ),
    ).toHaveLength(0);
  });
  it("preferencias persistidas conservan las bajas y el esquema crea todas activas", async () => {
    const row = await db.notificationPreference.create({
      data: { userId: user.id },
    });
    expect(row.product).toBe(true);
    expect(row.marketing).toBe(true);
    await notifications.preferences(user.id, {
      product: false,
      marketing: false,
    });
    expect((await notifications.snapshot(user.id)).preferences).toMatchObject({
      product: false,
      marketing: false,
    });
  });
  it("snapshot, contador y bandeja comparten una sincronización y no bloquean cada lectura", async () => {
    const spy = jest.spyOn(notifications, "syncAccount");
    try {
      const [snapshot, count, list] = await Promise.all([
        notifications.snapshot(user.id),
        notifications.count(user.id),
        notifications.list(user.id),
      ]);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(snapshot.count).toBe(count.count);
      expect(snapshot.items.map((n) => n.id)).toEqual(
        list.items.map((n) => n.id),
      );
      await notifications.snapshot(user.id);
      await notifications.count(user.id);
      expect(spy).toHaveBeenCalledTimes(1);
      const foreign = await call("/notifications/snapshot", "GET", undefined, {
        token: otherToken,
      });
      expect(foreign.status).toBe(200);
      expect(foreign.data.items.every((n) => n.userId === other.id)).toBe(true);
      await db.user.update({
        where: { id: user.id },
        data: { status: "blocked" },
      });
      await expect(notifications.snapshot(user.id)).rejects.toThrow();
    } finally {
      spy.mockRestore();
    }
  });
  it("feedback admite crítica, es único por destinatario y valida puntuación", async () => {
    const c = await notifications.createCampaign({
      requestKey: randomUUID(),
      title: "Opinión",
      body: "Contanos",
      category: "product",
    });
    await notifications.publish(c.id);
    expect(
      (
        await call(
          "/notifications/campaigns/" + c.id + "/feedback",
          "POST",
          { score: 0 },
          { token },
        )
      ).status,
    ).toBe(400);
    await notifications.feedback(user.id, c.id, {
      score: 1,
      comment: "No me sirvió",
    });
    await notifications.feedback(user.id, c.id, {
      score: 2,
      comment: "Falta mejorar",
    });
    expect(await db.productFeedback.count({ where: { userId: user.id } })).toBe(
      1,
    );
  });
  it("cursor pagina sin duplicados y marcar todas conserva un aviso futuro", async () => {
    await notifications.syncAccount(user.id);
    await db.userNotification.updateMany({
      where: { userId: user.id },
      data: { archivedAt: new Date() },
    });
    const now = new Date();
    await db.userNotification.createMany({
      data: Array.from({ length: 25 }, (_, i) => ({
        userId: user.id,
        eventKey: randomUUID(),
        category: "account",
        title: "Aviso " + i,
        body: "Prueba",
        createdAt: now,
      })),
    });
    const first = await notifications.list(user.id);
    const second = await notifications.list(user.id, first.nextCursor);
    expect(first.items.length + second.items.length).toBe(25);
    expect(
      new Set([...first.items, ...second.items].map((x) => x.id)).size,
    ).toBe(25);
    await db.userNotification.create({
      data: {
        userId: user.id,
        eventKey: randomUUID(),
        category: "account",
        title: "Posterior",
        body: "Prueba",
        createdAt: new Date(Date.now() + 60000),
      },
    });
    await notifications.readAll(user.id);
    expect((await notifications.count(user.id)).count).toBe(1);
  });
  it("respuesta perdida del proveedor se recupera por conciliación sin volver a cobrar", async () => {
    const o = await order();
    const provider = app.get(PaymentProvider);
    const original = provider.request.bind(provider);
    const spy = jest
      .spyOn(provider, "request")
      .mockImplementationOnce(async (...args) => {
        await original(...args);
        throw new BadGatewayException("Respuesta perdida");
      });
    try {
      await billing.submit(
        await billing.owned(o.id, user.id, null),
        randomUUID(),
        { token: "synthetic", payment_method_id: "visa" },
      );
    } finally {
      spy.mockRestore();
    }
    expect(payments.size).toBe(1);
    expect(await db.entitlementGrant.count()).toBe(0);
    await db.billingOrder.update({
      where: { id: o.id },
      data: { createdAt: new Date(Date.now() - 120000) },
    });
    await billing.reconcile();
    await billing.tick();
    expect(await db.entitlementGrant.count()).toBe(1);
    expect(payments.size).toBe(1);
  });
  it("dos cobros de una misma orden se registran, pero no duplican el derecho", async () => {
    const o = await order(),
      p = await payment(o.id),
      q = await payment(o.id);
    await billing.apply(p);
    await billing.apply(q);
    expect(await db.entitlementGrant.count()).toBe(1);
    expect(await db.ingreso.count()).toBe(2);
    expect(
      (await db.billingOrder.findUnique({ where: { id: o.id } })).state,
    ).toBe("review");
    q.status = "refunded";
    q.date_last_updated = new Date(Date.now() + 1000).toISOString();
    await billing.apply(q);
    const sum = await db.ingreso.aggregate({ _sum: { monto: true } });
    expect(sum._sum.monto).toBe(26000);
    expect(await db.entitlementGrant.count({ where: { active: true } })).toBe(
      1,
    );
  });
  it("reembolso recibido antes de aprobación conserva balance neto cero sin acreditar", async () => {
    const o = await order(),
      p = await payment(o.id, "refunded");
    await billing.apply(p);
    expect(await db.entitlementGrant.count()).toBe(0);
    expect(
      (await db.ingreso.aggregate({ _sum: { monto: true } }))._sum.monto,
    ).toBe(0);
  });
  it("reembolso parcial pasa a revisión sin revocar automáticamente otros derechos", async () => {
    const o = await order(),
      p = await payment(o.id);
    await billing.apply(p);
    await expect(
      billing.apply({ ...p, transaction_amount_refunded: 1000 }),
    ).rejects.toThrow();
    expect(await db.entitlementGrant.count({ where: { active: true } })).toBe(
      1,
    );
    expect((await billing.health()).reviewOrders).toBe(1);
  });
  it("fallo de entrega de aviso no afecta al pago ni a Pro", async () => {
    const o = await order();
    await billing.apply(await payment(o.id));
    await db.$executeRawUnsafe(
      `CREATE OR REPLACE FUNCTION notification_fixture_fail() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'fixture delivery failure'; END $$`,
    );
    await db.$executeRawUnsafe(
      "CREATE TRIGGER notification_fixture_failure BEFORE INSERT ON user_notifications FOR EACH ROW EXECUTE FUNCTION notification_fixture_fail()",
    );
    try {
      await notifications.deliver();
      expect(await db.userNotification.count()).toBe(0);
      expect(await db.entitlementGrant.count({ where: { active: true } })).toBe(
        1,
      );
      expect((await db.domainEvent.findFirst()).attempts).toBe(1);
    } finally {
      await db.$executeRawUnsafe(
        "DROP TRIGGER notification_fixture_failure ON user_notifications",
      );
    }
    await db.domainEvent.updateMany({ data: { nextAttemptAt: new Date() } });
    await notifications.deliver();
    expect(await db.userNotification.count()).toBe(1);
  });
  it("lease vigente impide procesar; lease vencido se recupera", async () => {
    const o = await order(),
      p = await payment(o.id);
    await billing.enqueue("lease-test", String(p.id));
    await db.providerEvent.updateMany({
      data: { leaseUntil: new Date(Date.now() + 60000) },
    });
    await billing.tick();
    expect(await db.entitlementGrant.count()).toBe(0);
    await db.providerEvent.updateMany({
      data: { leaseUntil: new Date(Date.now() - 1000) },
    });
    await billing.tick();
    expect(await db.entitlementGrant.count()).toBe(1);
  });
  it("retirar un beneficio manual preserva una compra pagada", async () => {
    const o = await order();
    await billing.apply(await payment(o.id));
    const until = (await db.user.findUnique({ where: { id: user.id } }))
      .planUntil;
    await billing.adjustLegacyBenefit(user.id, true, 12);
    await billing.adjustLegacyBenefit(user.id, false, 12);
    const u = await db.user.findUnique({ where: { id: user.id } });
    expect(u.isFounder).toBe(false);
    expect(u.plan).toBe("pro");
    expect(+u.planUntil).toBe(+until);
  });
  it("RLS niega lectura directa a un rol anónimo aunque tenga permiso SELECT", async () => {
    await order();
    await db.$executeRawUnsafe(
      `DO $$ BEGIN IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname='billing_fixture_anon') THEN CREATE ROLE billing_fixture_anon; END IF; END $$`,
    );
    await db.$executeRawUnsafe(
      "GRANT USAGE ON SCHEMA public TO billing_fixture_anon",
    );
    await db.$executeRawUnsafe(
      "GRANT SELECT ON billing_orders TO billing_fixture_anon",
    );
    const rows = await db.$transaction(async (tx) => {
      await tx.$executeRawUnsafe("SET LOCAL ROLE billing_fixture_anon");
      return tx.$queryRawUnsafe<any[]>("SELECT id FROM billing_orders");
    });
    expect(rows).toHaveLength(0);
  });
  it("borrado de usuario elimina bandeja y feedback sin borrar movimientos financieros", async () => {
    const o = await order();
    await billing.apply(await payment(o.id));
    await notifications.deliver();
    await db.billingOrder.updateMany({
      where: { userId: user.id },
      data: { contactEmail: null, contactName: null },
    });
    await db.user.delete({ where: { id: user.id } });
    expect(await db.userNotification.count()).toBe(0);
    expect(await db.billingPayment.count()).toBe(1);
    expect(await db.ingreso.count()).toBe(1);
    await expect(billing.owned(o.id, null, o.accessToken)).rejects.toThrow();
  });
});
