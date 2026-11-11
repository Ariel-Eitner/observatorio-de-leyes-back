import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ProSubscription } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { PrismaService } from "../common/prisma/prisma.service";
import { BillingService } from "./billing.service";
import { PaymentProvider, ProviderRequestError } from "./provider";
import { PRODUCTS, addMonths, billingDay } from "./catalog";
import { COMMERCIAL_CATALOG } from "../commercial/catalog";
import {
  enqueueSubscription,
  resourceId,
  SUB_TOPICS,
  verifySubscriptionSignature,
} from "./subscription-events";

const date = (value: unknown) => {
  const d = new Date(String(value ?? ""));
  return Number.isFinite(+d) ? d : null;
};
const checkoutUrl = (value: unknown) =>
  typeof value === "string" &&
  /^https:\/\/(?:[a-z0-9-]+\.)*mercadopago\.com\.ar\/subscriptions\/checkout\?/.test(
    value,
  );

@Injectable()
export class SubscriptionsService {
  private working = false;
  constructor(
    private readonly db: PrismaService,
    private readonly provider: PaymentProvider,
    private readonly billing: BillingService,
  ) {}

  private async account(id: string) {
    const user = await this.db.user.findUnique({ where: { id } });
    if (!user || user.status !== "active")
      throw new ForbiddenException("Necesitás una cuenta activa.");
    return user;
  }
  private async owned(id: string, userId: string) {
    await this.account(userId);
    const row =
      /^[a-f0-9-]{36}$/i.test(id) &&
      (await this.db.proSubscription.findUnique({ where: { id } }));
    if (!row || row.userId !== userId)
      throw new NotFoundException("Suscripción no encontrada.");
    return row;
  }
  async create(
    userId: string,
    input: {
      requestKey: string;
      catalogVersion: string;
      payerEmail?: string;
      consent: boolean;
    },
  ) {
    if (!this.provider.ready())
      throw new ServiceUnavailableException(
        "La contratación no está disponible en este momento.",
      );
    if (!input.consent)
      throw new BadRequestException(
        "Confirmá la autorización del cobro mensual.",
      );
    if (input.catalogVersion !== COMMERCIAL_CATALOG.version)
      throw new ConflictException(
        "Las condiciones cambiaron. Actualizá la página de planes.",
      );
    const row = await this.db.$transaction(async (tx) => {
      await this.billing.lock(tx, "user:" + userId);
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user || user.status !== "active")
        throw new ForbiddenException("Necesitás una cuenta activa.");
      if (user.plan === "pro" && !user.planUntil)
        throw new ConflictException(
          "Tu cuenta ya tiene acceso Pro permanente.",
        );
      const current = await tx.proSubscription.findFirst({
        where: { userId, status: { not: "cancelled" } },
      });
      if (current) return current;
      const previous = await tx.proSubscription.findUnique({
        where: { requestKey: input.requestKey },
      });
      if (previous)
        throw new ConflictException(
          "Esta solicitud ya fue utilizada. Iniciá una nueva contratación.",
        );
      return tx.proSubscription.create({
        data: {
          requestKey: input.requestKey,
          userId,
          amount: PRODUCTS.pro_mensual.amount,
          catalogVersion: COMMERCIAL_CATALOG.version,
          startsAt:
            user.planUntil && +user.planUntil > Date.now()
              ? user.planUntil
              : new Date(),
        },
      });
    });
    const user = await this.account(userId);
    await this.ensureProvider(row, input.payerEmail ?? user.email);
    const latest = await this.db.proSubscription.findUniqueOrThrow({
      where: { id: row.id },
    });
    if (latest.cancelRequestedAt) await this.cancelForAccount(userId, row.id);
    return this.status(row.id, userId);
  }
  private async ensureProvider(row: ProSubscription, email?: string) {
    if (row.providerId) return row;
    const claimed = await this.db.proSubscription.updateMany({
      where: {
        id: row.id,
        creationAttemptAt: null,
        status: "creating",
        cancelRequestedAt: null,
      },
      data: { creationAttemptAt: new Date() },
    });
    if (!claimed.count) {
      const results = await this.provider.request(
        "/preapproval/search?external_reference=" + row.id,
      );
      const matches = (results.results ?? []).filter(
        (r) => r.external_reference === row.id,
      );
      if (matches.length !== 1)
        throw new ConflictException(
          "Estamos confirmando la suscripción con Mercado Pago. No vuelvas a contratar mientras se verifica.",
        );
      return this.adopt(row, matches[0]);
    }
    try {
      if (!email) {
        const owner =
          row.userId &&
          (await this.db.user.findUnique({ where: { id: row.userId } }));
        if (!owner || owner.status !== "active")
          throw new ForbiddenException("Cuenta no disponible.");
        email = owner.email;
      }
      const remote = await this.provider.request(
        "/preapproval",
        {
          reason: "Observatorio de Leyes — Pro mensual",
          external_reference: row.id,
          payer_email: email,
          auto_recurring: {
            frequency: 1,
            frequency_type: "months",
            transaction_amount: Number(row.amount),
            currency_id: row.currency,
            ...(+row.startsAt > Date.now() + 60000
              ? { start_date: row.startsAt.toISOString() }
              : {}),
          },
          back_url:
            this.provider.site() +
            "/suscripcion/resultado?suscripcion=" +
            row.id,
          status: "pending",
        },
        "subscription:" + row.id,
      );
      return await this.adopt(row, remote);
    } catch (error) {
      if (
        error instanceof ProviderRequestError &&
        [400, 401, 403, 404, 422].includes(error.providerStatus)
      ) {
        await this.db.proSubscription.updateMany({
          where: { id: row.id, providerId: null },
          data: { status: "cancelled" },
        });
        const messages: Record<string, string> = {
          payer_is_collector:
            "Mercado Pago no permite suscribirte con la misma cuenta que recibe los cobros. Usá una cuenta compradora distinta.",
          invalid_payer:
            "Ingresá el correo de una cuenta compradora válida de Mercado Pago.",
          account_mode_mismatch:
            "Mercado Pago no permite mezclar cuentas de prueba y cuentas reales. Usá una cuenta compradora del mismo entorno.",
          invalid_start_date:
            "Mercado Pago rechazó la fecha del primer cobro. Tu acceso Pro actual se conserva; no se creó una suscripción.",
        };
        throw new BadRequestException(
          messages[error.providerReason] ??
            "Mercado Pago rechazó la solicitud de suscripción. Verificá el correo de tu cuenta compradora o contactanos. No se creó una suscripción.",
        );
      }
      throw error;
    }
  }
  private async adopt(row: ProSubscription, remote: any) {
    const recurring = remote.auto_recurring;
    if (
      !resourceId(String(remote.id ?? "")) ||
      remote.external_reference !== row.id ||
      String(remote.collector_id) !== (await this.provider.collectorId()) ||
      recurring?.frequency !== 1 ||
      recurring?.frequency_type !== "months" ||
      recurring?.currency_id !== row.currency ||
      !row.amount.equals(Number(recurring?.transaction_amount)) ||
      !["pending", "authorized", "paused", "cancelled"].includes(
        remote.status,
      ) ||
      !date(remote.last_modified)
    ) {
      await this.db.proSubscription.update({
        where: { id: row.id },
        data: { status: "review" },
      });
      throw new BadRequestException(
        "La suscripción necesita revisión antes de acreditar Pro.",
      );
    }
    return this.db.$transaction(async (tx) => {
      await this.billing.lock(tx, "subscription:" + row.id);
      const current = await tx.proSubscription.findUniqueOrThrow({
        where: { id: row.id },
      });
      if (current.providerId && current.providerId !== String(remote.id))
        throw new ConflictException(
          "Identificador de suscripción inconsistente.",
        );
      if (
        (current.providerUpdatedAt &&
          +current.providerUpdatedAt > +date(remote.last_modified)) ||
        (current.status === "cancelled" && remote.status !== "cancelled")
      )
        return current;
      return tx.proSubscription.update({
        where: { id: row.id },
        data: {
          providerId: String(remote.id),
          status: remote.status,
          providerUpdatedAt: date(remote.last_modified),
          nextPaymentAt: date(remote.next_payment_date),
          ...(checkoutUrl(remote.init_point)
            ? { checkoutUrl: remote.init_point }
            : {}),
        },
      });
    });
  }
  async current(userId: string, refresh = false) {
    await this.account(userId);
    const row = await this.db.proSubscription.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return row ? this.status(row.id, userId, refresh) : null;
  }
  async status(id: string, userId: string, refresh = false) {
    let row = await this.owned(id, userId);
    if (
      refresh ||
      !row.lastCheckedAt ||
      Date.now() - +row.lastCheckedAt > 30000
    ) {
      try {
        await this.sync(row);
        row = await this.owned(id, userId);
      } catch {
        /* Display durable state and allow a retry; never imply a payment succeeded. */
      }
    }
    const user = await this.account(userId);
    const paid = await this.db.billingOrder.findFirst({
      where: {
        subscriptionId: id,
        state: "approved",
        grant: { active: true },
        periodEnd: { gt: new Date() },
      },
      orderBy: { periodEnd: "desc" },
    });
    return {
      id: row.id,
      status: row.status,
      amount: Number(row.amount),
      currency: row.currency,
      startsAt: row.startsAt,
      nextPaymentAt: row.nextPaymentAt,
      cancelRequested: !!row.cancelRequestedAt,
      checkoutUrl:
        row.status === "pending" && !row.cancelRequestedAt
          ? row.checkoutUrl
          : null,
      lastPaymentStatus: row.lastPaymentStatus,
      paidUntil: user.planUntil,
      hasPaidPeriod: !!paid,
    };
  }
  async cancel(id: string, userId: string) {
    await this.owned(id, userId);
    await this.cancelForAccount(userId, id);
    return this.status(id, userId);
  }
  async simulate(id: string, userId: string, pay: boolean) {
    if (
      process.env.NODE_ENV === "production" ||
      process.env.OBS_LOCAL_SANDBOX !== "true" ||
      process.env.ALLOW_MOCK_PAYMENTS !== "true" ||
      !/^http:\/\/127\.0\.0\.1:\d+$/.test(process.env.MP_API_BASE_URL ?? "")
    )
      throw new NotFoundException();
    const row = await this.owned(id, userId);
    if (!row.providerId || row.cancelRequestedAt || row.status === "cancelled")
      throw new ConflictException("La suscripción no admite esta simulación.");
    await this.provider.request(
      "/_sandbox/subscriptions/" + row.providerId,
      { pay },
      "simulation:" + row.id,
    );
    await this.sync(row);
    return this.status(id, userId);
  }
  async cancelForAccount(userId: string, id?: string) {
    const rows = await this.db.proSubscription.findMany({
      where: { userId, ...(id ? { id } : {}), status: { not: "cancelled" } },
    });
    for (let row of rows) {
      await this.db.proSubscription.update({
        where: { id: row.id },
        data: { cancelRequestedAt: new Date() },
      });
      if (!row.creationAttemptAt && !row.providerId) {
        await this.db.proSubscription.update({
          where: { id: row.id },
          data: { status: "cancelled" },
        });
        continue;
      }
      if (!row.providerId) row = await this.ensureProvider(row);
      const current = await this.provider.request(
        "/preapproval/" + row.providerId,
      );
      if (current.status === "cancelled") {
        await this.adopt(row, current);
        continue;
      }
      await this.provider.request(
        "/preapproval/" + row.providerId,
        { status: "cancelled" },
        "cancel:" + row.id,
        "PUT",
      );
      const remote = await this.provider.request(
        "/preapproval/" + row.providerId,
      );
      if (remote.status !== "cancelled")
        throw new ConflictException(
          "La cancelación aún no está confirmada. Volvé a consultar el estado.",
        );
      await this.adopt(row, remote);
    }
  }
  private async sync(row: ProSubscription) {
    if (!row.providerId) row = await this.ensureProvider(row);
    row = await this.adopt(
      row,
      await this.provider.request("/preapproval/" + row.providerId),
    );
    if (row.cancelRequestedAt && row.status !== "cancelled" && row.userId)
      await this.cancelForAccount(row.userId, row.id);
    // Queue verification durably so a long billing history cannot block the account page.
    const result = await this.provider.request(
      "/authorized_payments/search?preapproval_id=" +
        row.providerId +
        "&limit=100",
    );
    for (const invoice of (result.results ?? []).slice(0, 100))
      await enqueueSubscription(
        this.db,
        "subscription_invoice",
        String(invoice.id),
        invoice.id +
          ":" +
          (invoice.last_modified ?? "") +
          ":" +
          (invoice.payment?.status ?? "") +
          ":" +
          new Date().toISOString().slice(0, 10),
      );
    await this.tick(1);
    await this.db.proSubscription.update({
      where: { id: row.id },
      data: { lastCheckedAt: new Date() },
    });
  }
  async invoice(id: string) {
    if (!/^\d{1,32}$/.test(id))
      throw new BadRequestException("Identificador de factura invalido.");
    const invoice = await this.provider.request("/authorized_payments/" + id);
    if (String(invoice.id) !== id)
      throw new BadRequestException("Factura inconsistente.");
    let sub = await this.db.proSubscription.findUnique({
      where: { providerId: String(invoice.preapproval_id) },
    });
    if (!sub) return;
    sub = await this.adopt(
      sub,
      await this.provider.request("/preapproval/" + sub.providerId),
    );
    const start = date(invoice.debit_date);
    if (
      invoice.external_reference !== sub.id ||
      invoice.currency_id !== sub.currency ||
      !sub.amount.equals(Number(invoice.transaction_amount)) ||
      !start
    )
      throw new BadRequestException("La factura requiere revisión.");
    const paymentId = invoice.payment?.id;
    if (!paymentId) return;
    const payment = await this.provider.get(String(paymentId));
    if (
      String(payment.id) !== String(paymentId) ||
      payment.external_reference !== sub.id ||
      String(payment.collector_id) !== (await this.provider.collectorId()) ||
      payment.currency_id !== sub.currency ||
      !sub.amount.equals(payment.transaction_amount)
    )
      throw new BadRequestException("El pago recurrente requiere revisión.");
    const end = addMonths(start, 1, billingDay(sub.startsAt));
    const order = await this.db.billingOrder.upsert({
      where: { subscriptionInvoiceId: id },
      create: {
        requestKey: "subscription-invoice:" + id,
        subscriptionId: sub.id,
        subscriptionInvoiceId: id,
        userId: sub.userId,
        kind: "pro",
        product: "pro_mensual",
        amount: sub.amount,
        months: 1,
        description: "Pro mensual — cobro de suscripción",
        catalogVersion: sub.catalogVersion,
        accessHash: randomUUID(),
        periodStart: start,
        periodEnd: end,
        conditions: {
          renewal: "automatic",
          frequency: 1,
          frequencyType: "months",
        },
      },
      update: {},
    });
    if (
      order.subscriptionId !== sub.id ||
      +order.periodStart !== +start ||
      +order.periodEnd !== +end
    )
      throw new ConflictException("Factura asociada a otra suscripción.");
    await this.billing.apply({ ...payment, external_reference: order.id });
    const newer = await this.db.billingOrder.findFirst({
      where: { subscriptionId: sub.id, periodStart: { gt: start } },
    });
    if (!newer)
      await this.db.proSubscription.update({
        where: { id: sub.id },
        data: { lastPaymentStatus: payment.status },
      });
  }
  async receive(
    type: string,
    id: string,
    body: any,
    signature: string,
    requestId: string,
    trusted = false,
  ) {
    if (!SUB_TOPICS[type])
      throw new BadRequestException("Tipo de notificación inválido.");
    if (!trusted && !process.env.MP_WEBHOOK_SECRET)
      throw new ServiceUnavailableException("Webhook no configurado.");
    verifySubscriptionSignature(
      id,
      body,
      signature,
      requestId,
      process.env.MP_WEBHOOK_SECRET,
    );
    await enqueueSubscription(
      this.db,
      SUB_TOPICS[type],
      id,
      id + ":" + requestId + ":" + signature,
    );
    return { ok: true };
  }
  @Cron("*/15 * * * * *")
  async tick(limit = 5) {
    if (this.working || !this.provider.configured()) return;
    this.working = true;
    try {
      const events = await this.db.providerEvent.findMany({
        where: {
          resourceType: {
            in: [
              "subscription",
              "subscription_invoice",
              "subscription_payment",
            ],
          },
          processedAt: null,
          attempts: { lt: 12 },
          nextAttemptAt: { lte: new Date() },
          OR: [{ leaseUntil: null }, { leaseUntil: { lt: new Date() } }],
        },
        take: limit,
        orderBy: { createdAt: "asc" },
      });
      for (const event of events) {
        const claimed = await this.db.providerEvent.updateMany({
          where: {
            id: event.id,
            processedAt: null,
            OR: [{ leaseUntil: null }, { leaseUntil: { lt: new Date() } }],
          },
          data: {
            leaseUntil: new Date(Date.now() + 60000),
            attempts: { increment: 1 },
          },
        });
        if (!claimed.count) continue;
        try {
          if (event.resourceType === "subscription_invoice")
            await this.invoice(event.paymentId);
          else if (event.resourceType === "subscription") {
            const remote = await this.provider.request(
              "/preapproval/" + event.paymentId,
            );
            const local =
              typeof remote.external_reference === "string" &&
              /^[a-f0-9-]{36}$/i.test(remote.external_reference) &&
              (await this.db.proSubscription.findUnique({
                where: { id: remote.external_reference },
              }));
            if (local) await this.sync(await this.adopt(local, remote));
          } else {
            const results = await this.provider.request(
              "/authorized_payments/search?payment_id=" + event.paymentId,
            );
            if (!results.results?.length)
              throw new ConflictException("Factura aún no disponible.");
            for (const invoice of results.results)
              await this.invoice(String(invoice.id));
          }
          await this.db.providerEvent.update({
            where: { id: event.id },
            data: { processedAt: new Date(), leaseUntil: null, error: null },
          });
        } catch {
          await this.db.providerEvent.update({
            where: { id: event.id },
            data: {
              leaseUntil: null,
              error: "No se pudo verificar la suscripción. Requiere reintento.",
              nextAttemptAt: new Date(
                Date.now() + Math.min(21600000, 60000 * 2 ** event.attempts),
              ),
            },
          });
        }
      }
    } finally {
      this.working = false;
    }
  }
  @Cron("30 */5 * * * *")
  async reconcile() {
    if (!this.provider.configured()) return;
    const rows = await this.db.proSubscription.findMany({
      where: {
        OR: [
          { status: { not: "cancelled" } },
          { providerUpdatedAt: { gte: new Date(Date.now() - 35 * 86400000) } },
        ],
      },
      orderBy: { lastCheckedAt: { sort: "asc", nulls: "first" } },
      take: 20,
    });
    for (const row of rows)
      try {
        await this.sync(row);
      } catch {
        await this.db.proSubscription.update({
          where: { id: row.id },
          data: { lastCheckedAt: new Date() },
        });
      }
    await this.tick();
  }
}
