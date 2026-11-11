import { addMonths } from "./catalog";
import { safeAction } from "../notifications/notifications.service";

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
