import { Prisma } from "@prisma/client";
import { COMMERCIAL_POLICY, COMMERCIAL_CATALOG } from "../commercial/catalog";
import { effectivePlan, PlanFields } from "../common/plan";
type Tx = Prisma.TransactionClient;
export async function creditBalance(tx: Tx, userId: string, now = new Date()) {
  const result = await tx.downloadCredit.aggregate({
    where: {
      userId,
      revokedAt: null,
      expiresAt: { gt: now },
      remaining: { gt: 0 },
    },
    _sum: { remaining: true },
  });
  return result._sum.remaining ?? 0;
}
export async function ensureAccountNotices(
  tx: Tx,
  user: { id: string; createdAt: Date },
  forceProduct = false,
) {
  const welcome = "welcome:" + user.id + ":v1";
  await tx.userNotification.upsert({
    where: { eventKey: welcome },
    update: {},
    create: {
      eventKey: welcome,
      userId: user.id,
      category: "account",
      title: "Bienvenido al Observatorio de Leyes",
      body: `Consultá la legislación, guardá tus leyes y organizá tus consultas desde tu cuenta. La cuenta gratuita incluye ${COMMERCIAL_POLICY.freeLaws} leyes para descargar; cada ley descargada queda disponible durante ${COMMERCIAL_POLICY.redownloadDays} días.`,
      actionPath: "/cuenta",
    },
  });
  const preference = await tx.notificationPreference.findUnique({
    where: { userId: user.id },
  });
  if (
    forceProduct ||
    (preference?.product !== false &&
      +user.createdAt <=
        Date.now() - COMMERCIAL_POLICY.productNoticeDelayHours * 3600000)
  ) {
    const key = "product:" + user.id + ":v1";
    await tx.userNotification.upsert({
      where: { eventKey: key },
      update: {},
      create: {
        eventKey: key,
        userId: user.id,
        category: "product",
        title: "Elegí cómo trabajar con el Observatorio",
        body: "Podés consultar las leyes sin costo, comprar descargas para usarlas cuando las necesites o contratar Pro para descargar sin límite y usar las herramientas profesionales. Conocé las opciones y elegí la que te sirva.",
        actionPath: "/planes",
      },
    });
  }
}
// El llamador mantiene el bloqueo por usuario: comparte transacción con consumos y pagos.
export async function syncQuotaNotice(
  tx: Tx,
  user: PlanFields & { id: string; freeDownloadsUsed: number; status: string },
) {
  const prefix = "quota:" + user.id + ":";
  if (
    user.status !== "active" ||
    effectivePlan(user) === "pro" ||
    user.freeDownloadsUsed < COMMERCIAL_POLICY.freeLaws ||
    (await creditBalance(tx, user.id)) > 0
  ) {
    await tx.userNotification.updateMany({
      where: {
        userId: user.id,
        eventKey: { startsWith: prefix },
        archivedAt: null,
      },
      data: { archivedAt: new Date() },
    });
    return;
  }
  const eventKey = prefix + COMMERCIAL_CATALOG.version;
  const unitPrice = COMMERCIAL_CATALOG.products
    .find((p) => p.kind === "descargas" && p.quantity === 1)!
    .amount.toLocaleString("es-AR");
  await tx.userNotification.upsert({
    where: { eventKey },
    update: { archivedAt: null },
    create: {
      eventKey,
      userId: user.id,
      category: "account",
      title: "No te quedan descargas disponibles",
      body: `Usaste tus ${COMMERCIAL_POLICY.freeLaws} leyes gratuitas y no tenés saldo comprado disponible. La consulta sigue siendo gratuita. Podés comprar descargas desde $${unitPrice} o elegir Pro. Las compras ayudan a sostener el alojamiento, el procesamiento de documentos y el mantenimiento del servicio. Las leyes que ya descargaste siguen disponibles durante su plazo de ${COMMERCIAL_POLICY.redownloadDays} días.`,
      actionPath: "/planes#descargas",
    },
  });
}
