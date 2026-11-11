// Synthetic provider for disposable integration/browser tests. No network calls.
const { randomUUID } = require("node:crypto");
exports.createSubscriptionFixture = (payments, nextId) => {
  const subscriptions = new Map(),
    invoices = new Map();
  let clock = 0,
    invoiceId = 10000;
  const stamp = () => new Date(Date.now() + ++clock).toISOString();
  const fixture = {
    subscriptions,
    invoices,
    created: 0,
    requests: 0,
    failCreate: null,
    failCancel: false,
    reset() {
      subscriptions.clear();
      invoices.clear();
      this.created = 0;
      this.requests = 0;
      this.failCreate = null;
      this.failCancel = false;
    },
    charge(
      id,
      {
        at,
        status = "approved",
        amount = 26000,
        currency = "ARS",
        collector = 1234,
      } = {},
    ) {
      const sub = subscriptions.get(id);
      if (!sub) throw Error("Unknown synthetic subscription");
      const paymentId = String(nextId()),
        debit = at || sub.next_payment_date || new Date().toISOString();
      const p = {
        id: paymentId,
        external_reference: sub.external_reference,
        status,
        transaction_amount: amount,
        currency_id: currency,
        collector_id: collector,
        date_last_updated: stamp(),
      };
      payments.set(paymentId, p);
      const invoice = {
        id: String(++invoiceId),
        type: "scheduled",
        date_created: stamp(),
        last_modified: stamp(),
        preapproval_id: id,
        external_reference: sub.external_reference,
        currency_id: currency,
        transaction_amount: String(amount),
        debit_date: debit,
        status: status === "approved" ? "processed" : "recycling",
        payment: { id: paymentId, status },
      };
      invoices.set(invoice.id, invoice);
      const next = new Date(debit);
      next.setUTCMonth(next.getUTCMonth() + 1);
      sub.next_payment_date = next.toISOString();
      sub.last_modified = stamp();
      return invoice;
    },
    handle(method, url, body) {
      const path = url.pathname;
      if (path === "/preapproval" && method === "POST") {
        this.requests++;
        if (
          String(body.payer_email ?? "")
            .trim()
            .toLowerCase() === "merchant@fixture.invalid"
        )
          return {
            status: 400,
            body: { message: "payer and collector cannot be the same" },
          };
        if (this.failCreate === "reject") {
          this.failCreate = null;
          return { status: 400, body: { error: "synthetic rejection" } };
        }
        const id = randomUUID().replaceAll("-", "");
        const sub = {
          ...body,
          id,
          collector_id: 1234,
          status: "pending",
          last_modified: stamp(),
          next_payment_date:
            body.auto_recurring?.start_date ?? new Date().toISOString(),
          init_point:
            "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_id=" +
            id,
        };
        subscriptions.set(id, sub);
        this.created++;
        if (this.failCreate === "lost") {
          this.failCreate = null;
          return { status: 500, body: { error: "synthetic lost response" } };
        }
        return { body: sub };
      }
      if (path === "/preapproval/search")
        return {
          body: {
            results: [...subscriptions.values()].filter(
              (s) =>
                s.external_reference ===
                url.searchParams.get("external_reference"),
            ),
          },
        };
      if (path.startsWith("/preapproval/")) {
        const sub = subscriptions.get(path.split("/").pop());
        if (!sub)
          return { status: 404, body: { error: "synthetic not found" } };
        if (method === "PUT") {
          if (sub.status === "cancelled")
            return {
              status: 400,
              body: { error: "synthetic already cancelled" },
            };
          if (body.status !== "cancelled") return { status: 400, body: {} };
          sub.status = "cancelled";
          sub.last_modified = stamp();
          if (this.failCancel) {
            this.failCancel = false;
            return {
              status: 500,
              body: { error: "synthetic lost cancellation" },
            };
          }
        }
        return { body: sub };
      }
      if (path === "/authorized_payments/search") {
        const rows = [...invoices.values()].filter(
          (i) =>
            (!url.searchParams.has("preapproval_id") ||
              i.preapproval_id === url.searchParams.get("preapproval_id")) &&
            (!url.searchParams.has("payment_id") ||
              String(i.payment.id) === url.searchParams.get("payment_id")),
        );
        const offset = Number(url.searchParams.get("offset") || 0),
          limit = Number(url.searchParams.get("limit") || 20);
        return {
          body: {
            paging: { total: rows.length, offset, limit },
            results: rows.slice(offset, offset + limit),
          },
        };
      }
      if (path.startsWith("/authorized_payments/")) {
        const invoice = invoices.get(path.split("/").pop());
        return { status: invoice ? 200 : 404, body: invoice ?? {} };
      }
      if (path.startsWith("/_sandbox/subscriptions/") && method === "POST") {
        const sub = subscriptions.get(path.split("/").pop());
        if (!sub || sub.status === "cancelled")
          return { status: 400, body: {} };
        sub.status = "authorized";
        sub.last_modified = stamp();
        if (body.pay) this.charge(sub.id);
        return { body: sub };
      }
      return null;
    },
  };
  return fixture;
};
