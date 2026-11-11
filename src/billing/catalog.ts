import { COMMERCIAL_CATALOG } from "../commercial/catalog";
export const PRODUCTS = Object.fromEntries(
  COMMERCIAL_CATALOG.products.map((p) => [p.id, p]),
) as Record<string, (typeof COMMERCIAL_CATALOG.products)[number]>;

// Calendar months in Argentina, retaining the original billing day through February.
export function billingDay(date: Date): number {
  return new Date(+date - 10800000).getUTCDate();
}
export function addMonths(
  date: Date,
  months: number,
  anchor = billingDay(date),
): Date {
  const local = new Date(+date - 10800000);
  const last = new Date(
    Date.UTC(local.getUTCFullYear(), local.getUTCMonth() + months + 1, 0),
  ).getUTCDate();
  local.setUTCDate(1);
  local.setUTCMonth(local.getUTCMonth() + months);
  local.setUTCDate(Math.min(anchor, last));
  return new Date(+local + 10800000);
}

export function publicState(status: string) {
  return (
    {
      approved: "aprobado",
      rejected: "rechazado",
      cancelled: "cancelado",
      refunded: "reembolsado",
      charged_back: "reembolsado",
      review: "revision",
    }[status] ?? "en_proceso"
  );
}
