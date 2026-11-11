import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { createHash, createHmac, randomUUID, timingSafeEqual } from "crypto";
import { Prisma, BillingOrder } from "@prisma/client";
import { PrismaService } from "../common/prisma/prisma.service";
import { PaymentProvider, ProviderPayment } from "./provider";
import { CreateOrderDto } from "./billing.dto";
import { PRODUCTS, addMonths, billingDay, publicState } from "./catalog";

type Tx = Prisma.TransactionClient;
const digest = (s: string) => createHash("sha256").update(s).digest("hex");
const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

@Injectable()
export class BillingService {
  private working = false;
  constructor(
    private readonly db: PrismaService,
    private readonly provider: PaymentProvider,
  ) {}

  private token(id: string) {
    const secret = process.env.ADMIN_SECRET;
    if (!secret)
      throw new ServiceUnavailableException("Servicio no configurado");
    return createHmac("sha256", secret)
      .update("billing-access-v1:" + id)
      .digest("hex");
  }

  async lock(tx: Tx, key: string) {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtextextended(${key}, 0))`;
  }

  async create(dto: CreateOrderDto, userId: string | null) {
    const user = userId
      ? await this.db.user.findUnique({ where: { id: userId } })
      : null;
    if (dto.tipo === "pro" && (!user || user.status !== "active"))
      throw new ForbiddenException("Necesitás una cuenta activa");
    const product = dto.tipo === "pro" ? PRODUCTS[dto.producto] : null;
    if (dto.tipo === "pro" && !product)
      throw new BadRequestException("Producto inválido");
    const amount = product
      ? product.frozen && user.proPrecioCongelado > 0
        ? user.proPrecioCongelado
        : product.amount
      : dto.monto;
    if (!Number.isInteger(amount) || amount < 1000 || amount > 10000000)
      throw new BadRequestException("Monto inválido");
    const id = randomUUID();
    let order: BillingOrder;
    try {
      order = await this.db.billingOrder.create({
        data: {
          id,
          requestKey: dto.requestKey,
          kind: dto.tipo,
          product: product?.id,
          amount,
          months: product?.months ?? 0,
          frozen: product?.frozen ?? false,
          description: product?.name ?? "Apoyo al Observatorio de Leyes",
          userId: user?.id ?? null,
          contactEmail: user?.email ?? dto.email ?? null,
          contactName: dto.nombre ?? null,
          accessHash: digest(this.token(id)),
        },
      });
    } catch (error) {
      if (error.code !== "P2002") throw error;
      order = await this.db.billingOrder.findUnique({
        where: { requestKey: dto.requestKey },
      });
      if (
        !order ||
        order.userId !== (user?.id ?? null) ||
        order.kind !== dto.tipo ||
        order.product !== (product?.id ?? null)
      )
        throw new ConflictException("La intención pertenece a otra operación");
    }
    return {
      id: order.id,
      guest: order.userId === null,
      amount: Number(order.amount),
      description: order.description,
      accessToken: this.token(order.id),
    };
  }

  async owned(id: string, userId: string | null, token: string | null) {
    if (!UUID.test(id)) throw new NotFoundException();
    const order = await this.db.billingOrder.findUnique({ where: { id } });
    if (!order) throw new NotFoundException();
    if (order.userId) {
      const user =
        userId &&
        (await this.db.user.findUnique({
          where: { id: userId },
          select: { status: true },
        }));
      if (order.userId !== userId || !user || user.status !== "active")
        throw new ForbiddenException();
    } else {
      // A deleted Pro account never becomes an anonymous order.
      if (
        order.kind === "pro" ||
        !token ||
        !timingSafeEqual(
          Buffer.from(digest(token)),
          Buffer.from(order.accessHash),
        )
      )
        throw new ForbiddenException();
    }
    return order;
  }

  async status(id: string, userId: string | null, token: string | null) {
    const order = await this.owned(id, userId, token);
    const grant = await this.db.entitlementGrant.findUnique({
      where: { orderId: id },
    });
    return {
      pagoId: id,
      estado: publicState(order.state),
      paymentConfirmed: order.state === "approved",
      entitlementActive:
        order.kind !== "pro"
          ? order.state === "approved"
          : grant?.active === true,
      monto: Number(order.amount),
      tipo: order.kind,
      renewal: "manual",
    };
  }

  async submit(
    order: BillingOrder,
    attemptKey: string,
    form: Record<string, any>,
  ) {
    if (!UUID.test(attemptKey))
      throw new BadRequestException("Intento inválido");
    const attempt = await this.db.$transaction(async (tx) => {
      await this.lock(tx, "order:" + order.id);
      const current = await tx.billingOrder.findUnique({
        where: { id: order.id },
      });
      if (current.state === "approved") return false;
      if (
        current.state === "review" ||
        current.preferenceId ||
        current.attemptState === "wallet"
      )
        throw new ConflictException(
          "La compra necesita confirmación; consultá su estado",
        );
      if (
        current.attemptKey &&
        current.attemptKey !== attemptKey &&
        current.attemptState !== "rejected"
      )
        throw new ConflictException("Hay un pago pendiente de confirmación");
      await tx.billingOrder.update({
        where: { id: order.id },
        data: { attemptKey, attemptState: "pending" },
      });
      return true;
    });
    if (!attempt) return;
    try {
      const payment = await this.provider.request(
        "/v1/payments",
        {
          token: form.token,
          payment_method_id: form.payment_method_id,
          issuer_id: form.issuer_id,
          installments: form.installments,
          payer: {
            email: order.contactEmail ?? form.payer?.email,
            identification: form.payer?.identification,
          },
          transaction_amount: Number(order.amount),
          description: order.description,
          external_reference: order.id,
          notification_url: this.site() + "/api/pagos/webhook",
        },
        order.id + ":" + attemptKey,
      );
      const id = String(payment.id);
      await this.enqueue("submit:" + id, id);
      await this.processPayment(id);
    } catch (error) {
      await this.db.billingOrder.update({
        where: { id: order.id },
        data: { attemptState: "uncertain" },
      });
      if (error instanceof ServiceUnavailableException) throw error;
      // A timeout is not a rejected charge. Reconciliation searches by order reference.
    }
  }

  private site() {
    const value = process.env.MP_SITE_URL;
    if (
      !value ||
      (!/^https:\/\/[a-z0-9.-]+(?::\d+)?$/.test(value) &&
        !(
          process.env.NODE_ENV !== "production" &&
          /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(value)
        ))
    ) {
      throw new ServiceUnavailableException("URL de retorno no configurada");
    }
    return value;
  }

  async preference(order: BillingOrder) {
    // Serialize creation so repeated requests reuse the same provider idempotency key.
    const current = await this.db.$transaction(async (tx) => {
      await this.lock(tx, "order:" + order.id);
      const row = await tx.billingOrder.findUnique({ where: { id: order.id } });
      if (row.attemptKey && row.attemptState !== "wallet")
        throw new ConflictException("La orden ya tiene otro intento");
      if (row.state === "approved" || row.state === "review")
        throw new ConflictException("Consultá el estado de la compra");
      if (!row.preferenceUrl)
        await tx.billingOrder.update({
          where: { id: order.id },
          data: { attemptKey: order.id, attemptState: "wallet" },
        });
      return row;
    });
    if (current.preferenceUrl) return current.preferenceUrl;
    const result = await this.provider.request(
      "/checkout/preferences",
      {
        items: [
          {
            id: order.id,
            title: order.description,
            quantity: 1,
            unit_price: Number(order.amount),
            currency_id: order.currency,
          },
        ],
        external_reference: order.id,
        payer: order.contactEmail ? { email: order.contactEmail } : undefined,
        back_urls: Object.fromEntries(
          ["success", "failure", "pending"].map((key) => [
            key,
            this.site() + "/pago/resultado?pago=" + order.id,
          ]),
        ),
        auto_return: "approved",
        notification_url: this.site() + "/api/pagos/webhook",
      },
      "preference:" + order.id,
    );
    if (
      !result.id ||
      !/^https:\/\/(?:[a-z0-9-]+\.)*mercadopago\.(?:com(?:\.ar)?|com\.br|cl|com\.mx)\//.test(
        result.init_point ?? "",
      )
    )
      throw new ServiceUnavailableException("Respuesta de checkout inválida");
    await this.db.billingOrder.update({
      where: { id: order.id },
      data: {
        preferenceId: String(result.id),
        preferenceUrl: result.init_point,
      },
    });
    return result.init_point;
  }

  async receiveWebhook(
    queryId: string,
    body: any,
    signature: string,
    requestId: string,
  ) {
    const secret = process.env.MP_WEBHOOK_SECRET;
    if (!secret)
      throw new ServiceUnavailableException("Webhook no configurado");
    const parts = Object.fromEntries(
      (signature ?? "").split(",").map((x) => x.trim().split("=")),
    );
    const id = queryId || String(body?.data?.id ?? "");
    if (
      !/^\d+$/.test(id) ||
      !/^\d+$/.test(parts.ts ?? "") ||
      !/^[a-f0-9]{64}$/i.test(parts.v1 ?? "") ||
      !requestId
    )
      throw new ForbiddenException("Firma inválida");
    if (body?.data?.id && String(body.data.id) !== id)
      throw new ForbiddenException("Identificador inconsistente");
    const expected = createHmac("sha256", secret)
      .update(`id:${id};request-id:${requestId};ts:${parts.ts};`)
      .digest("hex");
    if (
      !timingSafeEqual(
        Buffer.from(expected, "hex"),
        Buffer.from(parts.v1, "hex"),
      )
    )
      throw new ForbiddenException("Firma inválida");
    await this.enqueue(digest(id + ":" + requestId + ":" + signature), id);
    return { ok: true }; // Only acknowledge after the durable receipt commits.
  }

  async enqueue(eventKey: string, paymentId: string) {
    if (!/^\d+$/.test(paymentId))
      throw new BadRequestException("Pago inválido");
    await this.db.providerEvent.upsert({
      where: { eventKey },
      create: { eventKey, paymentId },
      update: {},
    });
  }

  async processPayment(id: string) {
    const payment = await this.provider.get(id);
    if (String(payment.id) !== id)
      throw new BadRequestException(
        "Identificador del proveedor inconsistente",
      );
    await this.apply(payment);
  }

  async apply(payment: ProviderPayment) {
    const id = payment.external_reference;
    if (!UUID.test(id ?? ""))
      throw new BadRequestException("Referencia inválida");
    const order = await this.db.billingOrder.findUnique({ where: { id } });
    if (!order)
      throw new BadRequestException(
        "Orden no encontrada; revisar operación histórica",
      );
    const updated = new Date(payment.date_last_updated);
    if (
      !Number.isFinite(+updated) ||
      ![
        "approved",
        "pending",
        "in_process",
        "authorized",
        "rejected",
        "cancelled",
        "refunded",
        "charged_back",
      ].includes(payment.status)
    )
      throw new BadRequestException("Estado del proveedor inválido");
    if (
      String(payment.collector_id) !== process.env.MP_COLLECTOR_ID ||
      payment.currency_id !== order.currency ||
      !Number.isFinite(payment.transaction_amount) ||
      !order.amount.equals(payment.transaction_amount)
    ) {
      await this.db.billingOrder.update({
        where: { id },
        data: { state: "review" },
      });
      throw new BadRequestException("El pago requiere conciliación");
    }
    if (
      payment.transaction_amount_refunded > 0 &&
      payment.status !== "refunded"
    ) {
      await this.db.billingOrder.update({
        where: { id },
        data: { state: "review" },
      });
      throw new BadRequestException("Reembolso parcial: revisión necesaria");
    }
    await this.db.$transaction(
      async (tx) => {
        await this.lock(tx, "order:" + id);
        if (order.userId) await this.lock(tx, "user:" + order.userId);
        const prior = await tx.billingPayment.findUnique({
          where: { providerId: String(payment.id) },
        });
        if (prior && prior.orderId !== id)
          throw new ConflictException("Pago asociado a otra orden");
        if (prior && +prior.providerUpdatedAt > +updated) return;
        if (
          prior &&
          +prior.providerUpdatedAt === +updated &&
          prior.status !== payment.status
        )
          throw new ConflictException("Estado ambiguo del proveedor");
        await tx.billingPayment.upsert({
          where: { providerId: String(payment.id) },
          create: {
            providerId: String(payment.id),
            orderId: id,
            status: payment.status,
            amount: order.amount,
            currency: order.currency,
            providerUpdatedAt: updated,
          },
          update: { status: payment.status, providerUpdatedAt: updated },
        });
        // Record actual cash movements per provider payment, including accidental duplicate charges.
        if (["approved", "refunded", "charged_back"].includes(payment.status))
          await this.income(tx, order, String(payment.id), false);
        if (["refunded", "charged_back"].includes(payment.status))
          await this.income(tx, order, String(payment.id), true);
        const existing = await tx.entitlementGrant.findUnique({
          where: { orderId: id },
        });
        if (existing && !existing.active && payment.status === "approved") {
          await tx.billingOrder.update({
            where: { id },
            data: { state: "review" },
          });
          return;
        }
        if (
          existing &&
          existing.providerId !== String(payment.id) &&
          payment.status === "approved"
        ) {
          await tx.billingOrder.update({
            where: { id },
            data: { state: "review" },
          });
          return; // Record the second charge; never silently grant twice for one order.
        }
        if (payment.status === "approved") {
          if (order.kind === "pro" && !existing) {
            const user =
              order.userId &&
              (await tx.user.findUnique({ where: { id: order.userId } }));
            if (!user || user.status !== "active")
              throw new ConflictException("Cuenta no disponible");
            await tx.billingBaseline.upsert({
              where: { userId: user.id },
              update: {},
              create: {
                userId: user.id,
                plan: user.plan,
                until: user.planUntil,
                anchorDay: billingDay(
                  user.planUntil && +user.planUntil > Date.now()
                    ? user.planUntil
                    : new Date(),
                ),
              },
            });
            await tx.entitlementGrant.create({
              data: {
                orderId: id,
                userId: user.id,
                providerId: String(payment.id),
                months: order.months,
              },
            });
            if (order.frozen)
              await tx.user.update({
                where: { id: user.id },
                data: { proPrecioCongelado: Math.round(Number(order.amount)) },
              });
            await this.event(tx, "granted:" + id, user.id, "billing.granted", {
              orderId: id,
            });
          }
          if (order.kind === "apoyo" && order.contactEmail) {
            // Mecenazgo stays separate from paid Pro and never extends a plan.
            await tx.founders.upsert({
              where: { email: order.contactEmail },
              create: {
                email: order.contactEmail,
                nombre: order.contactName ?? "Mecenas",
                pagado: true,
                confirmed_at: new Date(),
                nivel: "mecenas",
                canal: "mercado_pago",
              },
              update: { pagado: true, confirmed_at: new Date() },
            });
          }
        }
        if (
          ["refunded", "charged_back"].includes(payment.status) &&
          existing?.providerId === String(payment.id) &&
          existing.active
        ) {
          await tx.entitlementGrant.update({
            where: { orderId: id },
            data: { active: false },
          });
          if (order.userId)
            await this.event(
              tx,
              "revoked:" + id,
              order.userId,
              "billing.revoked",
              { orderId: id },
            );
        }
        if (order.userId && order.kind === "pro")
          await this.project(tx, order.userId);
        // A late pending event for another failed attempt cannot erase an already active grant.
        const grant = await tx.entitlementGrant.findUnique({
          where: { orderId: id },
        });
        const state = grant?.active ? "approved" : payment.status;
        await tx.billingOrder.update({
          where: { id },
          data: {
            state,
            attemptState: ["rejected", "cancelled"].includes(payment.status)
              ? "rejected"
              : state,
          },
        });
        await tx.pago.upsert({
          where: { id },
          create: {
            id,
            tipo: order.kind,
            monto: order.amount,
            userId: order.userId,
            producto: order.product,
            concepto: order.description,
            estado: publicState(state),
            mpPaymentId: String(payment.id),
            mpStatus: payment.status,
            email: order.contactEmail,
          },
          update: {
            estado: publicState(state),
            mpStatus: payment.status,
            mpPaymentId: String(payment.id),
            updatedAt: new Date(),
          },
        });
      },
      { timeout: 15000 },
    );
  }

  private async project(tx: Tx, userId: string) {
    const baseline = await tx.billingBaseline.findUnique({ where: { userId } });
    if (!baseline) return;
    const user = await tx.user.findUnique({ where: { id: userId } });
    // Legacy permanent rights and founder distinctions are preserved.
    if (baseline.plan === "pro" && !baseline.until) return;
    let until = baseline.until;
    const grants = await tx.entitlementGrant.findMany({
      where: { userId, active: true },
      orderBy: [{ grantedAt: "asc" }, { id: "asc" }],
    });
    for (const grant of grants)
      until = addMonths(
        until && +until > +grant.grantedAt ? until : grant.grantedAt,
        grant.months,
        baseline.anchorDay,
      );
    await tx.user.update({
      where: { id: userId },
      data: {
        planUntil: until,
        plan: user.isFounder || (until && +until > Date.now()) ? "pro" : "free",
      },
    });
  }

  private async income(
    tx: Tx,
    order: BillingOrder,
    providerId: string,
    reversal: boolean,
  ) {
    const amount = Number(order.amount) * (reversal ? -1 : 1);
    const sourceRef =
      (reversal ? "billing-refund:" : "billing-payment:") + providerId;
    await tx.ingreso.upsert({
      where: { sourceRef },
      update: {},
      create: {
        sourceRef,
        fecha: new Date(),
        tipo: order.kind === "pro" ? "SUSCRIPCION" : "DONACION",
        monto: amount,
        montoArs: amount,
        moneda: order.currency,
        medioCobro: "MERCADOPAGO",
        cliente: order.contactEmail,
        descripcion: (reversal ? "Reversión: " : "") + order.description,
      },
    });
  }

  async adjustLegacyBenefit(userId: string, grant: boolean, months: number) {
    if (!Number.isInteger(months) || months < 1 || months > 1200)
      throw new BadRequestException("Cantidad de meses inválida");
    return this.db.$transaction(async (tx) => {
      await this.lock(tx, "user:" + userId);
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new NotFoundException("Usuario no encontrado");
      const old = await tx.billingBaseline.findUnique({ where: { userId } });
      const until = grant ? addMonths(new Date(), months) : null;
      const previous = old ? old.until : user.planUntil;
      const legacyUntil =
        grant && previous && +previous > +until ? previous : until;
      await tx.billingBaseline.upsert({
        where: { userId },
        create: {
          userId,
          plan: grant ? "pro" : "free",
          until: legacyUntil,
          anchorDay: billingDay(legacyUntil ?? new Date()),
        },
        update: { plan: grant ? "pro" : "free", until: legacyUntil },
      });
      await tx.user.update({
        where: { id: userId },
        data: { isFounder: grant },
      });
      await this.project(tx, userId);
      return tx.user.findUnique({ where: { id: userId } });
    });
  }

  private async event(
    tx: Tx,
    eventKey: string,
    userId: string,
    topic: string,
    payload: object,
  ) {
    await tx.domainEvent.upsert({
      where: { eventKey },
      update: {},
      create: {
        eventKey,
        userId,
        topic,
        payload: payload as Prisma.InputJsonValue,
      },
    });
  }

  @Cron("*/15 * * * * *")
  async tick() {
    if (this.working || process.env.BILLING_ENABLED !== "true") return;
    this.working = true;
    try {
      const [clock] = await this.db.$queryRaw<
        { now: Date }[]
      >`SELECT clock_timestamp() AS now`;
      const now = clock.now;
      const events = await this.db.providerEvent.findMany({
        where: {
          processedAt: null,
          attempts: { lt: 12 },
          nextAttemptAt: { lte: now },
          OR: [{ leaseUntil: null }, { leaseUntil: { lt: now } }],
        },
        take: 5,
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
          await this.processPayment(event.paymentId);
          await this.db.providerEvent.update({
            where: { id: event.id },
            data: { processedAt: new Date(), leaseUntil: null, error: null },
          });
        } catch {
          await this.db.providerEvent.update({
            where: { id: event.id },
            data: {
              leaseUntil: null,
              error:
                "No se pudo verificar/aplicar el pago; requiere reintento o revisión.",
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

  @Cron("0 */5 * * * *")
  async reconcile() {
    if (process.env.BILLING_ENABLED !== "true") return;
    const orders = await this.db.billingOrder.findMany({
      where: {
        state: { in: ["pending", "in_process", "authorized"] },
        createdAt: {
          gte: new Date(Date.now() - 30 * 86400000),
          lt: new Date(Date.now() - 60000),
        },
      },
      take: 20,
      orderBy: { updatedAt: "asc" },
    });
    for (const order of orders) {
      try {
        for (const payment of await this.provider.search(order.id))
          await this.enqueue(
            "reconcile:" + payment.id + ":" + payment.date_last_updated,
            String(payment.id),
          );
      } catch {
        /* Leave pending; health endpoint exposes queue and stale orders. */
      }
      await this.db.billingOrder.update({
        where: { id: order.id },
        data: { updatedAt: new Date() },
      });
    }
  }

  async health() {
    return {
      enabled: process.env.BILLING_ENABLED === "true",
      pendingEvents: await this.db.providerEvent.count({
        where: { processedAt: null },
      }),
      exhaustedEvents: await this.db.providerEvent.count({
        where: { processedAt: null, attempts: { gte: 12 } },
      }),
      reviewOrders: await this.db.billingOrder.count({
        where: { state: "review" },
      }),
      staleOrders: await this.db.billingOrder.count({
        where: {
          state: "pending",
          createdAt: { lt: new Date(Date.now() - 86400000) },
        },
      }),
      recentOrders: await this.db.billingOrder.findMany({
        take: 20,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          kind: true,
          product: true,
          amount: true,
          state: true,
          attemptState: true,
          createdAt: true,
        },
      }),
      queueErrors: await this.db.providerEvent.findMany({
        where: { processedAt: null, error: { not: null } },
        take: 20,
        orderBy: { createdAt: "asc" },
        select: { id: true, attempts: true, error: true, nextAttemptAt: true },
      }),
      notificationErrors: await this.db.domainEvent.findMany({
        where: { processedAt: null, error: { not: null } },
        take: 20,
        select: { id: true, attempts: true, error: true, nextAttemptAt: true },
      }),
    };
  }

  async retryEvent(kind: string, id: string) {
    if (!UUID.test(id)) throw new NotFoundException();
    if (kind === "provider") {
      await this.db.providerEvent.updateMany({
        where: {
          id,
          processedAt: null,
          OR: [{ leaseUntil: null }, { leaseUntil: { lt: new Date() } }],
        },
        data: { attempts: 0, nextAttemptAt: new Date(), error: null },
      });
    } else if (kind === "notification") {
      await this.db.domainEvent.updateMany({
        where: { id, processedAt: null },
        data: { attempts: 0, nextAttemptAt: new Date(), error: null },
      });
    } else throw new NotFoundException();
    return this.health();
  }
}
