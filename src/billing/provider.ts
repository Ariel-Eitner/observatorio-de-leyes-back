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

@Injectable()
export class PaymentProvider {
  ready() {
    return (
      process.env.BILLING_ENABLED === "true" &&
      !!process.env.MP_ACCESS_TOKEN &&
      !!process.env.MP_COLLECTOR_ID &&
      !!process.env.MP_WEBHOOK_SECRET &&
      !!process.env.MP_SITE_URL
    );
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

  async request(path: string, body?: unknown, key?: string): Promise<any> {
    if (!this.ready()) {
      throw new ServiceUnavailableException(
        "Pagos temporalmente no disponibles",
      );
    }
    try {
      const response = await fetch(this.base() + path, {
        method: body === undefined ? "GET" : "POST",
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
          ...(key ? { "X-Idempotency-Key": key } : {}),
        },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) throw new Error("provider unavailable");
      return await response.json();
    } catch {
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
