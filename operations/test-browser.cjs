const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const base = "http://127.0.0.1:4771";
const work = path.resolve(__dirname, "../.local/payments-sandbox/browser");
fs.mkdirSync(work, { recursive: true });
const timeout = 60000;
async function until(check, ms = 20000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (await check()) return;
    await new Promise((r) => setTimeout(r, 300));
  }
  throw Error("Timed out waiting for local state");
}
(async () => {
  await until(
    () =>
      fetch("http://127.0.0.1:4772/status", {
        signal: AbortSignal.timeout(2000),
      })
        .then((r) => r.ok)
        .catch(() => false),
    120000,
  );
  const status = await fetch("http://127.0.0.1:4772/status", {
    signal: AbortSignal.timeout(3000),
  }).then((r) => r.json());
  assert.equal(status.url, base);
  assert.match(status.mode, /synthetic/);
  await until(
    () =>
      fetch(base + "/api/pagos/config", { signal: AbortSignal.timeout(2000) })
        .then((r) => r.ok)
        .catch(() => false),
    60000,
  );
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const results = [];
  async function account(email) {
    const context = await browser.newContext();
    const login = await context.request.post(base + "/api/auth/login", {
      data: { email, password: "Local-demo-2026!" },
      headers: { Origin: base },
      timeout,
    });
    assert.equal(login.status(), 200, await login.text());
    return context;
  }
  try {
    const config = await fetch(base + "/api/pagos/config", {
      signal: AbortSignal.timeout(timeout),
    }).then((r) => r.json());
    assert.equal(config.sandbox, true);
    const guest = await browser.newContext();
    const foreignGuest = await browser.newContext();
    let donation;
    for (let i = 0; i < 7; i++) {
      const response = await guest.request.post(base + "/api/pagos/orden", {
        data: {
          requestKey: require("node:crypto").randomUUID(),
          tipo: "apoyo",
          monto: 1000,
        },
        headers: { Origin: base },
        timeout,
      });
      assert.equal(response.status(), 200);
      donation = await response.json();
      assert.equal(donation.accessToken, undefined);
    }
    const receiptCookies = (await guest.cookies()).filter((c) =>
      c.name.startsWith("obs_payment_"),
    );
    assert.equal(receiptCookies.length, 5);
    assert.ok(receiptCookies.every((c) => c.httpOnly && c.sameSite === "Lax"));
    assert.equal(
      (
        await guest.request.get(base + `/api/pagos/${donation.pagoId}/estado`)
      ).status(),
      200,
    );
    assert.equal(
      (
        await foreignGuest.request.get(
          base + `/api/pagos/${donation.pagoId}/estado`,
        )
      ).status(),
      403,
    );
    await guest.close();
    await foreignGuest.close();
    results.push("Recibo anónimo privado, cookie httpOnly y cantidad acotada");
    const a = await account("usuario@local.invalid"),
      b = await account("otro@local.invalid"),
      admin = await account("admin@local.invalid");
    await admin.request.get(base + "/api/admin/enter", {
      maxRedirects: 0,
      timeout,
    });
    const adminPage = await admin.newPage();
    adminPage.setDefaultTimeout(timeout);
    const hydrated = adminPage.waitForResponse(
      (response) =>
        response.url().endsWith("/api/admin/notificaciones/campaigns") &&
        response.request().method() === "GET" &&
        response.status() === 200,
    );
    await adminPage.goto(base + "/admin/notificaciones", {
      waitUntil: "domcontentloaded",
    });
    await hydrated;
    await adminPage
      .getByRole("button", { name: "Cerrar aviso", exact: true })
      .click();
    const title = "Prueba local " + Date.now();
    await adminPage.getByLabel("Título", { exact: true }).fill(title);
    await adminPage
      .getByLabel("Mensaje", { exact: true })
      .fill(
        "Este aviso sólo existe en el entorno local con usuarios ficticios.",
      );
    await adminPage
      .getByRole("button", { name: "Guardar borrador y revisar audiencia" })
      .click();
    await adminPage
      .getByRole("heading", { name: "Revisión antes de publicar" })
      .waitFor();
    await adminPage.screenshot({
      path: path.join(work, "01-preview-campaign.png"),
      fullPage: true,
    });
    await adminPage
      .getByRole("button", { name: "Publicar este aviso dentro del sitio" })
      .click();
    await adminPage
      .getByRole("status")
      .filter({ hasText: "Aviso publicado" })
      .waitFor();
    results.push("Publicación administrativa con preview y audiencia");
    const page = await a.newPage();
    page.setDefaultTimeout(timeout);
    let notificationReads = 0;
    page.on("request", (request) => {
      if (new URL(request.url()).pathname === "/api/notificaciones/snapshot")
        notificationReads++;
    });
    await page.goto(base + "/cuenta/notificaciones", {
      waitUntil: "domcontentloaded",
    });
    await page
      .getByRole("button", { name: "Cerrar aviso", exact: true })
      .click();
    await page.getByRole("heading", { name: title, exact: true }).waitFor();
    assert.equal(
      notificationReads,
      1,
      "Campana y bandeja deben compartir una sola carga",
    );
    const bell = page
      .getByRole("button", { name: /^Notificaciones: \d+ sin leer$/ })
      .first();
    assert(!/Avisos/.test(await bell.innerText()));
    const originalUrl = page.url();
    await bell.click();
    const dropdown = page.getByRole("dialog", {
      name: "Notificaciones",
      exact: true,
    });
    await dropdown.getByText(title, { exact: true }).waitFor();
    assert.equal(page.url(), originalUrl, "Abrir la campana no debe navegar");
    await page.screenshot({
      path: path.join(work, "notifications-dropdown-desktop.png"),
      fullPage: true,
    });
    await page.keyboard.press("Escape");
    await bell.click();
    await dropdown.waitFor();
    assert.equal(notificationReads, 1, "Reabrir usa la caché");
    await dropdown
      .getByRole("link", { name: "Preferencias", exact: true })
      .click();
    await page
      .getByRole("checkbox", { name: "Novedades y mejoras del producto" })
      .waitFor();
    assert.equal(
      await page
        .getByRole("checkbox", { name: "Novedades y mejoras del producto" })
        .isChecked(),
      true,
    );
    assert.equal(
      await page
        .getByRole("checkbox", {
          name: "Ofertas y promociones dentro del sitio",
        })
        .isChecked(),
      true,
    );
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("button", { name: "Abrir menú", exact: true }).click();
    await page
      .getByRole("button", { name: /^Notificaciones: \d+ sin leer$/ })
      .last()
      .click();
    await dropdown.waitFor();
    const popupBox = await dropdown.boundingBox();
    assert(popupBox.x >= 0 && popupBox.x + popupBox.width <= 390);
    await page.screenshot({
      path: path.join(work, "notifications-dropdown-mobile.png"),
      fullPage: true,
    });
    await dropdown
      .getByRole("link", { name: "Ver todas", exact: true })
      .click();
    await page.setViewportSize({ width: 1280, height: 900 });
    results.push(
      "Campana sin texto, desplegable accesible, caché compartida y preferencias activas en escritorio y móvil",
    );
    const rows = await (
      await a.request.get(base + "/api/notificaciones")
    ).json();
    const row = rows.items.find((x) => x.title === title);
    assert.ok(row);
    const foreign = await b.request.patch(
      base + `/api/notificaciones/${row.id}/read`,
      { data: { read: true }, headers: { Origin: base } },
    );
    assert.equal(foreign.status(), 404);
    assert.equal(
      (await b.request.get(base + "/api/admin/notificaciones")).status(),
      401,
    );
    const csrf = await a.request.patch(
      base + `/api/notificaciones/${row.id}/read`,
      { data: { read: true }, headers: { Origin: "https://example.invalid" } },
    );
    assert.equal(csrf.status(), 403);
    results.push(
      "Aislamiento entre cuentas y rechazo de escritura cross-origin",
    );
    const item = page
      .getByRole("listitem")
      .filter({ has: page.getByRole("heading", { name: title, exact: true }) });
    await item
      .getByRole("button", { name: "Marcar como leído", exact: true })
      .click();
    await item
      .getByRole("button", { name: "Marcar como no leído", exact: true })
      .waitFor();
    await item
      .getByRole("button", { name: "Marcar como no leído", exact: true })
      .click();
    await item
      .getByRole("button", { name: "Marcar como leído", exact: true })
      .waitFor();
    await item.getByRole("button", { name: "Dar mi opinión" }).click();
    await item
      .getByLabel("¿Qué tan útil te resulta para tu tarea?")
      .selectOption("1");
    await item
      .getByLabel("Comentario opcional")
      .fill("Crítica de prueba: falta mejorar.");
    await item.getByRole("button", { name: "Enviar opinión" }).click();
    await page
      .getByRole("status")
      .filter({ hasText: "Tu opinión quedó registrada" })
      .waitFor();
    await item.getByRole("button", { name: "Archivar", exact: true }).click();
    await page.getByLabel("Filtrar avisos").selectOption("archived");
    await item.getByRole("button", { name: "Restaurar" }).click();
    await page.getByLabel("Filtrar avisos").selectOption("all");
    await page.getByRole("heading", { name: title, exact: true }).waitFor();
    await page.screenshot({
      path: path.join(work, "02-inbox-desktop.png"),
      fullPage: true,
    });
    results.push("Leído/no leído, feedback crítico, archivo y restauración");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({
      path: path.join(work, "03-inbox-mobile.png"),
      fullPage: true,
    });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(base + "/planes", { waitUntil: "domcontentloaded" });
    await page
      .getByRole("button", { name: "Contratar Pro mensual", exact: true })
      .click();
    await page.getByRole("button", { name: "Simular pago aprobado" }).click();
    await page
      .getByRole("link", { name: "Ir a mi cuenta", exact: true })
      .waitFor();
    const me = await (await a.request.get(base + "/api/auth/me")).json();
    assert.equal(me.plan, "pro");
    assert.ok(me.planUntil);
    results.push(
      "Compra Pro con proveedor simulado, acreditación y actualización de sesión",
    );
    const accessCookie = (await a.cookies()).find((c) => c.name === "obs_at");
    assert.ok(accessCookie);
    await a.addCookies([{ ...accessCookie, value: "expired-fixture-access" }]);
    await page.goto(base + "/herramientas/escritos");
    await page
      .getByRole("heading", {
        name: "Modelos de escritos legales",
        exact: true,
      })
      .waitFor({ timeout: 60000 });
    assert.notEqual(
      (await a.cookies()).find((c) => c.name === "obs_at")?.value,
      "expired-fixture-access",
    );
    results.push(
      "Acceso Pro renovado automáticamente cuando vence el token corto",
    );

    await until(async () => {
      const data = await (
        await a.request.get(base + "/api/notificaciones")
      ).json();
      return data.items.some((x) => x.title === "Tu plan Pro está activo");
    });
    await page.goto(base + "/cuenta/notificaciones");
    await page
      .getByRole("heading", { name: "Tu plan Pro está activo", exact: true })
      .waitFor();
    await page.screenshot({
      path: path.join(work, "04-payment-notification.png"),
      fullPage: true,
    });
    results.push("Aviso de pago entregado por outbox");
    const draft = await (
      await a.request.post(base + "/api/pagos/orden", {
        data: {
          requestKey: require("node:crypto").randomUUID(),
          tipo: "pro",
          producto: "pro_mensual",
        },
        headers: { Origin: base },
      })
    ).json();
    await page.goto(
      base + `/pago/resultado?pago=${draft.pagoId}&status=approved`,
    );
    await page
      .getByRole("heading", { name: "Pago en proceso", exact: true })
      .waitFor();
    assert.equal(
      await page.getByText("¡Pago confirmado!", { exact: true }).count(),
      0,
    );
    results.push("Parámetro approved en URL no simula una confirmación");
    await adminPage.goto(base + "/admin/pagos-sistema");
    await adminPage
      .getByRole("heading", { name: "Órdenes recientes" })
      .waitFor();
    await adminPage.screenshot({
      path: path.join(work, "05-billing-health.png"),
      fullPage: true,
    });
    results.push("Panel de acreditaciones y cola");
    const quota = await Promise.all(
      Array.from({ length: 10 }, (_, i) =>
        b.request
          .post(base + "/api/cupos/autorizar", {
            headers: { Origin: base },
            data: {
              kind: ["ley", "articulo"][i % 2],
              target: `fixture-law-${i}`,
            },
          })
          .then((r) => r.json()),
      ),
    );
    assert.equal(quota.filter((r) => r.ok).length, 5);
    assert.ok(quota.every((r) => r.renueva === null));
    const accountPage = await b.newPage();
    await accountPage.goto(base + "/cuenta");
    await accountPage
      .getByRole("button", { name: "Cerrar aviso", exact: true })
      .click();
    await accountPage
      .getByRole("button", { name: "Plan y beneficios" })
      .click();
    await accountPage
      .getByText("0 leyes gratuitas y 0 descargas compradas disponibles.", {
        exact: true,
      })
      .waitFor();
    await accountPage.screenshot({
      path: path.join(work, "06-lifetime-downloads.png"),
      fullPage: true,
    });
    results.push(
      "Cinco descargas compartidas, bloqueo concurrente y saldo sin renovación en cuenta",
    );
    await adminPage.goto(base + "/admin/usuarios");
    const targetRow = adminPage
      .getByRole("row")
      .filter({ hasText: "otro@local.invalid" });
    const move = targetRow.getByRole("button", {
      name: "Mover a papelera",
      exact: true,
    });
    assert.equal(
      await move.evaluate((el) => getComputedStyle(el).cursor),
      "pointer",
    );
    await move.click();
    assert.equal(await adminPage.locator('input[type="password"]').count(), 0);
    let releaseMove;
    const moveHeld = new Promise((resolve) => {
      releaseMove = resolve;
    });
    await adminPage.route("**/api/admin/usuarios/*/eliminar", async (route) => {
      await moveHeld;
      await route.continue();
    });
    await adminPage
      .getByRole("button", { name: "Confirmar traslado", exact: true })
      .click();
    await adminPage
      .getByRole("status")
      .filter({ hasText: "Moviendo cuenta a la papelera" })
      .first()
      .waitFor();
    assert.equal(
      await adminPage
        .getByRole("button", { name: "Trasladando…", exact: true })
        .isDisabled(),
      true,
    );
    await adminPage.screenshot({
      path: path.join(work, "users-moving-loading.png"),
      fullPage: true,
    });
    releaseMove();
    await targetRow.waitFor({ state: "detached" });
    assert.notEqual((await b.request.get(base + "/api/auth/me")).status(), 200);
    await adminPage.goto(base + "/admin/usuarios/papelera");
    const trashRow = adminPage
      .getByRole("row")
      .filter({ hasText: "otro@local.invalid" });
    await trashRow
      .getByRole("button", { name: "Restaurar", exact: true })
      .click();
    let releaseRestore;
    const restoreHeld = new Promise((resolve) => {
      releaseRestore = resolve;
    });
    await adminPage.route(
      "**/api/admin/papelera/usuarios/*/restaurar",
      async (route) => {
        await restoreHeld;
        await route.continue();
      },
    );
    await adminPage
      .getByRole("button", { name: "Confirmar restauración", exact: true })
      .click();
    await adminPage
      .getByRole("status")
      .filter({ hasText: "Restaurando cuenta" })
      .first()
      .waitFor();
    releaseRestore();
    await trashRow.waitFor({ state: "detached" });
    results.push(
      "Papelera con cursor, confirmación simple, suspensión y restauración",
    );
    const fresh = await account("otro@local.invalid"),
      purchasePage = await fresh.newPage();
    await purchasePage.goto(base + "/herramientas/escritos");
    const closeNotice = purchasePage.getByRole("button", {
      name: "Cerrar aviso",
      exact: true,
    });
    await closeNotice.click();
    await purchasePage.getByText("Herramienta Pro", { exact: true }).waitFor();
    await purchasePage.goto(base + "/planes#descargas");
    await purchasePage
      .getByRole("button", { name: "Comprar una descarga", exact: true })
      .click();
    await purchasePage
      .getByRole("button", { name: "Simular pago aprobado" })
      .click();
    await purchasePage
      .getByRole("link", { name: "Ir a mi cuenta", exact: true })
      .waitFor();
    const balance = await (await fresh.request.get(base + "/api/cupos")).json();
    assert.equal(balance.compradas.restante, 1);
    const notices = await (
      await fresh.request.get(base + "/api/notificaciones")
    ).json();
    assert.ok(!notices.items.some((n) => n.eventKey?.startsWith("quota:")));
    await purchasePage.screenshot({
      path: path.join(work, "08-download-purchase.png"),
      fullPage: true,
    });
    results.push(
      "Escritos exclusivo Pro, compra de descarga, saldo y aviso de agotamiento oculto",
    );
    fs.writeFileSync(
      path.join(work, "results.json"),
      JSON.stringify(
        {
          time: new Date().toISOString(),
          base,
          results,
          noRealPayments: true,
          noRealUsers: true,
        },
        null,
        2,
      ),
    );
    console.log(JSON.stringify({ passed: results.length, results }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
