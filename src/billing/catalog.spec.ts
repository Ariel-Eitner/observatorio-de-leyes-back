import { addMonths } from "./catalog";
import { safeAction } from "../notifications/notifications.service";
import { BillingService } from "./billing.service";
import { BillingController } from "./billing.controller";
import { COMMERCIAL_CATALOG } from "../commercial/catalog";
import { randomUUID } from "node:crypto";

describe("calendario y enlaces de notificaciones", () => {
  it("conserva día de facturación al pasar por febrero", () => {
    const first = addMonths(new Date("2027-01-31T15:00:00Z"), 1, 31);
    expect(first.toISOString()).toBe("2027-02-28T15:00:00.000Z");
    expect(addMonths(first, 1, 31).toISOString()).toBe(
      "2027-03-31T15:00:00.000Z",
    );
  });
  it("anual de doce meses y bisiesto", () => {
    expect(addMonths(new Date("2026-01-01T15:00:00Z"), 12).toISOString()).toBe(
      "2027-01-01T15:00:00.000Z",
    );
    expect(addMonths(new Date("2024-02-29T15:00:00Z"), 12).toISOString()).toBe(
      "2025-02-28T15:00:00.000Z",
    );
  });
  it("usa el día calendario de Argentina, no el de UTC", () => {
    expect(addMonths(new Date("2026-02-01T01:00:00Z"), 1).toISOString()).toBe(
      "2026-03-01T01:00:00.000Z",
    );
  });
  it.each([
    "https://example.invalid",
    "//example.invalid",
    "/%2fexample.invalid",
    "/\\example.invalid",
    "javascript:alert(1)",
    "/%0afoo",
  ])("rechaza destino inseguro %s", (value) =>
    expect(() => safeAction(value)).toThrow(),
  );
  it("permite rutas internas", () =>
    expect(safeAction("/cuenta?tab=plan")).toBe("/cuenta?tab=plan"));
});

describe("compra mensual sin suscripción", () => {
  const userId = randomUUID();
  const account = {
    id: userId,
    status: "active",
    email: "buyer@fixture.invalid",
  };
  const setup = () => {
    const db = {
      user: { findUnique: jest.fn().mockResolvedValue(account) },
      proSubscription: { findFirst: jest.fn().mockResolvedValue(null) },
      billingOrder: {
        create: jest.fn().mockImplementation(async ({ data }) => data),
      },
    };
    return { db, billing: new BillingService(db as any, {} as any) };
  };
  it("fija $26.000 y un mes en el servidor, aunque el cliente envíe otro monto", async () => {
    const oldSecret = process.env.ADMIN_SECRET;
    process.env.ADMIN_SECRET = "synthetic-fixture-secret";
    try {
      const { db, billing } = setup();
      const result = await billing.create(
        {
          requestKey: randomUUID(),
          tipo: "pro",
          producto: "pro_mensual",
          catalogVersion: COMMERCIAL_CATALOG.version,
          monto: 1000,
        },
        userId,
      );
      expect(result.amount).toBe(26000);
      expect(db.billingOrder.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId,
          product: "pro_mensual",
          amount: 26000,
          months: 1,
        }),
      });
      expect(
        db.billingOrder.create.mock.calls[0][0].data.subscriptionId,
      ).toBeUndefined();
    } finally {
      if (oldSecret === undefined) delete process.env.ADMIN_SECRET;
      else process.env.ADMIN_SECRET = oldSecret;
    }
  });
  it("evita superponer la compra con una renovación anterior", async () => {
    const { db, billing } = setup();
    db.proSubscription.findFirst.mockResolvedValue({ status: "authorized" });
    await expect(
      billing.create(
        {
          requestKey: randomUUID(),
          tipo: "pro",
          producto: "pro_mensual",
        },
        userId,
      ),
    ).rejects.toThrow("Cancelá la renovación mensual");
    expect(db.billingOrder.create).not.toHaveBeenCalled();
  });
  it("el endpoint no crea mandatos nuevos y publica renovación manual", async () => {
    const subscriptions = { create: jest.fn() };
    const controller = new BillingController(
      {} as any,
      { verify: () => ({ sub: userId }) } as any,
      { available: async () => true } as any,
      subscriptions as any,
    );
    expect(() =>
      controller.subscribe(
        {
          requestKey: randomUUID(),
          catalogVersion: COMMERCIAL_CATALOG.version,
          consent: true,
        },
        "Bearer fixture",
      ),
    ).toThrow("Las nuevas suscripciones están deshabilitadas");
    expect(subscriptions.create).not.toHaveBeenCalled();
    expect((await controller.config()).renewal).toBe("manual");
  });
});
