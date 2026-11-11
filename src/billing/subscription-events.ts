import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";

export const SUB_TOPICS: Record<string, string> = {
  subscription_preapproval: "subscription",
  subscription_authorized_payment: "subscription_invoice",
};
export const resourceId = (value: unknown) =>
  typeof value === "string" && /^[a-z0-9_-]{1,64}$/i.test(value);
export function verifySubscriptionSignature(
  id: string,
  body: any,
  signature: string,
  requestId: string,
  secret?: string,
) {
  if (
    !resourceId(id) ||
    !requestId ||
    requestId.length > 200 ||
    !signature ||
    signature.length > 300 ||
    (body?.data?.id && String(body.data.id) !== id)
  )
    throw new ForbiddenException("Notificación inválida");
  if (!secret) return;
  const parts = Object.fromEntries(
    signature.split(",").map((part) => part.trim().split("=")),
  );
  if (!/^\d+$/.test(parts.ts ?? "") || !/^[a-f0-9]{64}$/i.test(parts.v1 ?? ""))
    throw new ForbiddenException("Firma inválida");
  const expected = createHmac("sha256", secret)
    .update(`id:${id.toLowerCase()};request-id:${requestId};ts:${parts.ts};`)
    .digest();
  if (!timingSafeEqual(expected, Buffer.from(parts.v1, "hex")))
    throw new ForbiddenException("Firma inválida");
}
export async function enqueueSubscription(
  db: PrismaService,
  type: string,
  id: string,
  key: string,
) {
  if (!resourceId(id)) throw new ForbiddenException("Recurso inválido");
  const eventKey =
    "subscription:" +
    createHash("sha256")
      .update(type + ":" + key)
      .digest("hex");
  await db.providerEvent.upsert({
    where: { eventKey },
    create: { eventKey, paymentId: id, resourceType: type },
    update: {},
  });
}
