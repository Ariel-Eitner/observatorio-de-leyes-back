import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../common/prisma/prisma.service";
import { CampaignDto, FeedbackDto, PreferencesDto } from "./notifications.dto";
import { ensureAccountNotices, syncQuotaNotice } from "./account-notices";

const UUID = /^[0-9a-f-]{36}$/i;
export function safeAction(value?: string) {
  if (!value) return null;
  let decoded: string;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    throw new BadRequestException("Enlace inválido");
  }
  if (
    !decoded.startsWith("/") ||
    decoded.startsWith("//") ||
    /[\\\r\n]/.test(decoded)
  )
    throw new BadRequestException("Usá un enlace interno");
  return value;
}

@Injectable()
export class NotificationsService {
  private readonly synced = new Map<string, number>();
  private readonly syncing = new Map<string, Promise<void>>();
  private async ensureSynced(userId: string) {
    if (Date.now() - (this.synced.get(userId) ?? 0) < 60000) return;
    const pending = this.syncing.get(userId);
    if (pending) return pending;
    const job = this.syncAccount(userId)
      .then(() => {
        this.synced.delete(userId);
        this.synced.set(userId, Date.now());
        if (this.synced.size > 2000)
          this.synced.delete(this.synced.keys().next().value!);
      })
      .finally(() => this.syncing.delete(userId));
    this.syncing.set(userId, job);
    return job;
  }
  private noticeCursor: string | undefined;
  private notifying = false;
  async syncAccount(userId: string, forceProduct = false) {
    return this.db.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtextextended(${`user:${userId}`},0))`;
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user || user.status !== "active") return;
      await ensureAccountNotices(tx, user, forceProduct);
      await syncQuotaNotice(tx, user);
    });
  }
  @Cron("0 * * * * *")
  async accountNotices() {
    if (this.notifying) return;
    this.notifying = true;
    try {
      const users = await this.db.user.findMany({
        where: {
          status: "active",
          ...(this.noticeCursor ? { id: { gt: this.noticeCursor } } : {}),
        },
        select: { id: true },
        orderBy: { id: "asc" },
        take: 100,
      });
      for (const user of users) await this.syncAccount(user.id);
      this.noticeCursor =
        users.length === 100 ? users[users.length - 1].id : undefined;
    } finally {
      this.notifying = false;
    }
  }
  constructor(private readonly db: PrismaService) {}
  private async active(userId: string) {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      select: { status: true },
    });
    if (user?.status !== "active") throw new ForbiddenException();
  }
  private visible(
    userId: string,
    archived = false,
  ): Prisma.UserNotificationWhereInput {
    return {
      userId,
      archivedAt: archived ? { not: null } : null,
      OR: [
        { campaignId: null },
        {
          campaign: {
            state: "published",
            OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
          },
        },
      ],
    };
  }

  async list(
    userId: string,
    cursor?: string,
    unread = false,
    archived = false,
  ) {
    await this.active(userId);
    await this.ensureSynced(userId);
    return this.listItems(userId, cursor, unread, archived);
  }
  private async listItems(
    userId: string,
    cursor?: string,
    unread = false,
    archived = false,
  ) {
    let after: Prisma.UserNotificationWhereInput = {};
    if (cursor) {
      try {
        if (cursor.length > 300) throw Error();
        const c = JSON.parse(Buffer.from(cursor, "base64url").toString());
        if (!UUID.test(c.id) || !Number.isFinite(+new Date(c.at)))
          throw Error();
        after = {
          OR: [
            { createdAt: { lt: new Date(c.at) } },
            { createdAt: new Date(c.at), id: { lt: c.id } },
          ],
        };
      } catch {
        throw new BadRequestException("Cursor inválido");
      }
    }
    const items = await this.db.userNotification.findMany({
      where: {
        AND: [
          this.visible(userId, archived),
          after,
          unread ? { readAt: null } : {},
        ],
      },
      take: 21,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    });
    const rows = items.slice(0, 20),
      last = rows[rows.length - 1];
    return {
      items: rows,
      nextCursor:
        items.length > 20
          ? Buffer.from(
              JSON.stringify({ at: last.createdAt.toISOString(), id: last.id }),
            ).toString("base64url")
          : null,
    };
  }
  async count(userId: string) {
    await this.active(userId);
    await this.ensureSynced(userId);
    return {
      count: await this.db.userNotification.count({
        where: { AND: [this.visible(userId), { readAt: null }] },
      }),
    };
  }
  async snapshot(userId: string) {
    await this.active(userId);
    await this.ensureSynced(userId);
    const [page, count, preferences] = await Promise.all([
      this.listItems(userId),
      this.db.userNotification.count({
        where: { AND: [this.visible(userId), { readAt: null }] },
      }),
      this.db.notificationPreference.findUnique({ where: { userId } }),
    ]);
    return {
      userId,
      ...page,
      count,
      preferences: preferences ?? { product: true, marketing: true },
    };
  }
  async read(userId: string, id: string, read: boolean) {
    await this.active(userId);
    if (!UUID.test(id)) throw new NotFoundException();
    await this.db.$transaction(async (tx) => {
      const result = await tx.userNotification.updateMany({
        where: { AND: [this.visible(userId), { id }] },
        data: { readAt: read ? new Date() : null },
      });
      if (!result.count) throw new NotFoundException();
      if (read)
        await tx.userNotification.updateMany({
          where: { id, userId, firstOpenedAt: null },
          data: { firstOpenedAt: new Date() },
        });
    });
    return this.count(userId);
  }
  async readAll(userId: string) {
    await this.active(userId);
    const cutoff = new Date();
    await this.db.userNotification.updateMany({
      where: {
        AND: [
          this.visible(userId),
          { readAt: null, createdAt: { lte: cutoff } },
        ],
      },
      data: { readAt: cutoff },
    });
    return { ...(await this.count(userId)), cutoff };
  }
  async archive(userId: string, id: string, archived: boolean) {
    await this.active(userId);
    if (!UUID.test(id)) throw new NotFoundException();
    const result = await this.db.userNotification.updateMany({
      where: { id, userId },
      data: { archivedAt: archived ? new Date() : null },
    });
    if (!result.count) throw new NotFoundException();
    return this.count(userId);
  }
  async preferences(userId: string, values?: PreferencesDto) {
    await this.active(userId);
    if (!values)
      return (
        (await this.db.notificationPreference.findUnique({
          where: { userId },
        })) ?? { product: true, marketing: true }
      );
    return this.db.notificationPreference.upsert({
      where: { userId },
      create: { userId, ...values },
      update: values,
    });
  }
  async feedback(userId: string, campaignId: string, dto: FeedbackDto) {
    await this.active(userId);
    if (!UUID.test(campaignId)) throw new NotFoundException();
    const recipient = await this.db.userNotification.findFirst({
      where: { AND: [this.visible(userId), { campaignId }] },
    });
    if (!recipient) throw new NotFoundException();
    await this.db.productFeedback.upsert({
      where: { userId_campaignId: { userId, campaignId } },
      create: { userId, campaignId, ...dto },
      update: dto,
    });
    return { ok: true };
  }
  async createCampaign(dto: CampaignDto) {
    const data = {
      ...dto,
      title: dto.title.trim(),
      body: dto.body.trim(),
      actionPath: safeAction(dto.actionPath),
    };
    if (!data.title || !data.body)
      throw new BadRequestException("Título y mensaje requeridos");
    const campaign = await this.db.notificationCampaign.upsert({
      where: { requestKey: dto.requestKey },
      create: data,
      update: {},
    });
    if (
      campaign.title !== data.title ||
      campaign.body !== data.body ||
      campaign.category !== data.category ||
      campaign.actionPath !== data.actionPath
    )
      throw new ConflictException("La intención ya tiene otro contenido");
    return campaign;
  }
  private audience(category: string, cutoff: Date): Prisma.UserWhereInput {
    return {
      status: "active",
      isAdmin: false,
      createdAt: { lte: cutoff },
      OR: [
        { notificationPreference: null },
        {
          notificationPreference:
            category === "marketing" ? { marketing: true } : { product: true },
        },
      ],
    };
  }
  async campaigns() {
    const rows = await this.db.notificationCampaign.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { recipients: true, feedback: true } } },
    });
    return { items: rows };
  }
  async preview(id: string) {
    if (!UUID.test(id)) throw new NotFoundException();
    const campaign = await this.db.notificationCampaign.findUnique({
      where: { id },
    });
    if (!campaign) throw new NotFoundException();
    return {
      campaign,
      eligible: await this.db.user.count({
        where: this.audience(campaign.category, new Date()),
      }),
      channel: "in-app",
    };
  }
  async publish(id: string) {
    if (!UUID.test(id)) throw new NotFoundException();
    return this.db.$transaction(
      async (tx) => {
        await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtextextended(${`campaign:${id}`},0))`;
        const campaign = await tx.notificationCampaign.findUnique({
          where: { id },
        });
        if (!campaign) throw new NotFoundException();
        if (campaign.state === "withdrawn")
          throw new ConflictException("La campaña fue retirada");
        if (campaign.state === "published")
          return {
            recipients: await tx.userNotification.count({
              where: { campaignId: id },
            }),
            repeated: true,
          };
        const cutoff = new Date();
        // Materialize recipients in PostgreSQL; never load the entire audience into Node RAM.
        const recipients = await tx.$executeRaw`
          INSERT INTO user_notifications (id,"userId","campaignId","eventKey",category,title,body,"actionPath")
          SELECT gen_random_uuid(),u.id,${id}::uuid,'campaign:' || ${id} || ':' || u.id::text,
                 ${campaign.category},${campaign.title},${campaign.body},${campaign.actionPath}
          FROM users u LEFT JOIN notification_preferences p ON p."userId"=u.id
          WHERE u.status='active' AND NOT u.is_admin AND u.created_at<=${cutoff}
            AND CASE WHEN ${campaign.category}='marketing' THEN COALESCE(p.marketing,true) ELSE COALESCE(p.product,true) END
          ON CONFLICT DO NOTHING`;
        await tx.notificationCampaign.update({
          where: { id },
          data: { state: "published", cutoffAt: cutoff, publishedAt: cutoff },
        });
        return { recipients, repeated: false };
      },
      { timeout: 15000 },
    );
  }
  async withdraw(id: string) {
    if (!UUID.test(id)) throw new NotFoundException();
    await this.db.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtextextended(${`campaign:${id}`},0))`;
      await tx.notificationCampaign.update({
        where: { id },
        data: { state: "withdrawn" },
      });
    });
    return { ok: true };
  }
  async campaignFeedback(id: string) {
    if (!UUID.test(id)) throw new NotFoundException();
    return {
      scores: await this.db.productFeedback.groupBy({
        by: ["score"],
        where: { campaignId: id },
        _count: true,
      }),
      comments: await this.db.productFeedback.findMany({
        where: { campaignId: id, comment: { not: null } },
        select: { score: true, comment: true, updatedAt: true },
        take: 100,
      }),
    };
  }

  @Cron("*/10 * * * * *")
  async deliver() {
    const events = await this.db.domainEvent.findMany({
      where: {
        processedAt: null,
        attempts: { lt: 12 },
        nextAttemptAt: { lte: new Date() },
      },
      take: 20,
      orderBy: { createdAt: "asc" },
    });
    for (const event of events) {
      try {
        await this.db.$transaction(async (tx) => {
          await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtextextended(${`event:${event.id}`},0))`;
          const current = await tx.domainEvent.findUnique({
            where: { id: event.id },
          });
          if (current.processedAt) return;
          const user =
            current.userId &&
            (await tx.user.findUnique({
              where: { id: current.userId },
              select: { status: true },
            }));
          if (user?.status === "active") {
            const granted = current.topic === "billing.granted";
            const downloads = current.topic === "billing.downloads";
            await tx.userNotification.upsert({
              where: { eventKey: current.eventKey },
              update: {},
              create: {
                eventKey: current.eventKey,
                userId: current.userId,
                category: "account",
                title: downloads
                  ? "Tus descargas están disponibles"
                  : granted
                    ? "Tu plan Pro está activo"
                    : "Se actualizó el derecho de tu compra",
                body: downloads
                  ? "El pago se confirmó. El saldo de leyes está disponible en tu cuenta durante un año. Cada ley que descargues puede volver a descargarse durante 30 días sin consumir más saldo."
                  : granted
                    ? "El pago se confirmó y el beneficio fue acreditado. Consultá tu cuenta para ver su vigencia."
                    : "Se registró una devolución o contracargo. Se conservan tus otros beneficios vigentes.",
                actionPath: "/cuenta",
              },
            });
          }
          await tx.domainEvent.update({
            where: { id: event.id },
            data: { processedAt: new Date(), error: null },
          });
        });
      } catch {
        await this.db.domainEvent.updateMany({
          where: { id: event.id, processedAt: null },
          data: {
            attempts: { increment: 1 },
            nextAttemptAt: new Date(
              Date.now() + Math.min(21600000, 60000 * 2 ** event.attempts),
            ),
            error: "Entrega in-app pendiente de reintento",
          },
        });
      }
    }
  }
}
