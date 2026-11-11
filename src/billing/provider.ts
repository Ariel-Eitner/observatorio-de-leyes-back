import {
  Injectable,
  ServiceUnavailableException,
  BadGatewayException,
} from "@nestjs/common";

export interface ProviderPayment {
  id: number | string;
  external_reference: string;
  status: string;
  transaction_amount: number;
  currency_id: string;
  collector_id: number | string;
  date_last_updated: string;
  transaction_amount_refunded?: number;
}
export class ProviderRequestError extends BadGatewayException {
  constructor(readonly providerStatus?: number) {
    super(
      "No se pudo confirmar la operación con el proveedor. Consultá el estado antes de reintentar.",
    );
  }
}

@Injectable()
export class PaymentProvider {
  private collector?: Promise<string>;

  site() {
    const value = (
      process.env.MP_SITE_URL?.trim() ||
      process.env.FRONTEND_URL?.trim() ||
      "https://observatorio-de-leyes.com"
    ).replace(/\/$/, "");
    if (
      !/^https:\/\/[a-z0-9.-]+(?::\d+)?$/.test(value) &&
      !(
        process.env.NODE_ENV !== "production" &&
        /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(value)
      )
    )
      throw new ServiceUnavailableException("URL de retorno no configurada");
    return value;
  }

  ready() {
    const flag = process.env.BILLING_ENABLED?.trim().toLowerCase();
    if (flag && flag !== "true") return false;
    return this.configured();
  }

  configured() {
    try {
      this.site();
    } catch {
      return false;
    }
    return !!(
      process.env.MP_ACCESS_TOKEN?.trim() || process.env.ADMIN_SECRET?.trim()
    );
  }

  async available() {
    if (!this.ready()) return false;
    if (process.env.MP_ACCESS_TOKEN?.trim()) return true;
    try {
      const response = await fetch(this.site() + "/api/pagos/proveedor", {
        headers: { "x-obs-admin": process.env.ADMIN_SECRET },
        signal: AbortSignal.timeout(12000),
        redirect: "error",
      });
      return response.ok && (await response.json()).enabled === true;
    } catch {
      return false;
    }
  }

  async collectorId(): Promise<string> {
    if (process.env.MP_COLLECTOR_ID?.trim())
      return process.env.MP_COLLECTOR_ID.trim();
    if (!this.collector)
      this.collector = this.request("/users/me")
        .then((profile) => {
          if (!/^\d+$/.test(String(profile?.id ?? "")))
            throw new BadGatewayException(
              "No se pudo verificar la cuenta receptora",
            );
          return String(profile.id);
        })
        .catch((error) => {
          this.collector = undefined;
          throw error;
        });
    return this.collector;
  }
  private base() {
    const base = process.env.MP_API_BASE_URL ?? "https://api.mercadopago.com";
    if (
      base !== "https://api.mercadopago.com" &&
      !(
        process.env.NODE_ENV !== "production" &&
        process.env.ALLOW_MOCK_PAYMENTS === "true" &&
        /^http:\/\/127\.0\.0\.1:\d+$/.test(base)
      )
    ) {
      throw new ServiceUnavailableException("Proveedor de pagos no permitido");
    }
    return base;
  }

  async request(
    path: string,
    body?: unknown,
    key?: string,
    method = body === undefined ? "GET" : "POST",
  ): Promise<any> {
    if (
      !this.ready() &&
      !((method === "GET" || method === "PUT") && this.configured())
    ) {
      throw new ServiceUnavailableException(
        "Pagos temporalmente no disponibles",
      );
    }
    try {
      if (
        body !== undefined &&
        (path === "/v1/payments" ||
          path === "/checkout/preferences" ||
          path === "/preapproval")
      )
        await this.collectorId();
      // Existing deployments keep Mercado Pago credentials in the frontend server.
      // Delegate only the provider call; orders and accreditation stay in this backend.
      if (!process.env.MP_ACCESS_TOKEN?.trim()) {
        const response = await fetch(this.site() + "/api/pagos/proveedor", {
          method: "POST",
          redirect: "error",
          headers: {
            "x-obs-admin": process.env.ADMIN_SECRET,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path, body, key, method }),
          signal: AbortSignal.timeout(20000),
        });
        if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw new ProviderRequestError(error.providerStatus);
        }
        return await response.json();
      }
      const response = await fetch(this.base() + path, {
        method,
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
          ...(key ? { "X-Idempotency-Key": key } : {}),
        },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) throw new ProviderRequestError(response.status);
      return await response.json();
    } catch (error) {
      if (error instanceof ProviderRequestError) throw error;
      // Never log payment form data, tokens, credentials or raw provider errors.
      throw new BadGatewayException(
        "No se pudo confirmar la operación con el proveedor. Consultá el estado antes de reintentar.",
      );
    }
  }

  get(id: string): Promise<ProviderPayment> {
    return this.request("/v1/payments/" + encodeURIComponent(id));
  }
  async search(orderId: string): Promise<ProviderPayment[]> {
    return (
      (
        await this.request(
          "/v1/payments/search?external_reference=" +
            encodeURIComponent(orderId),
        )
      ).results ?? []
    );
  }
}
