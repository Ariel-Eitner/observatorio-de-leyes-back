import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

/**
 * Órdenes e intenciones de compra de productos.
 *
 * Portado de `app/api/producto-orden`, que insertaba en `product_orders` con la
 * `service_role` key desde una ruta pública.
 *
 * `status` distingue dos cosas que se ven parecidas pero no lo son:
 *   - `pendiente`: el producto cobra de verdad y la persona va al checkout.
 *   - `interes`:   todavía no se cobra; es una señal de demanda.
 */

export interface CrearOrdenParams {
  producto: string;
  nombre?: string | null;
  email?: string | null;
  telefono?: string | null;
  precio?: number | null;
  detalle?: Record<string, unknown> | null;
  status: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  notas?: string | null;
  guestId?: string | null;
  consent?: { at: string; version: string } | null;
}

@Injectable()
export class ProductOrdersService {
  private readonly logger = new Logger(ProductOrdersService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Nunca lanza: si esto falla, la persona igual tiene que poder llegar al
   * checkout. El original lo envolvía en un try/catch vacío por lo mismo.
   */
  async crear(p: CrearOrdenParams): Promise<string | null> {
    try {
      const row = await this.prisma.productOrder.create({
        data: {
          producto: p.producto,
          nombre: p.nombre ?? null,
          email: p.email ?? null,
          telefono: p.telefono ?? null,
          precio: p.precio != null ? new Prisma.Decimal(p.precio) : null,
          detalle: (p.detalle ?? null) as never,
          status: p.status,
          utmSource: p.utmSource ?? null,
          utmMedium: p.utmMedium ?? null,
          utmCampaign: p.utmCampaign ?? null,
          notas: p.notas ?? null,
          guestId: p.guestId ?? null,
          ...(p.consent ? { consentAt: new Date(p.consent.at), consentVersion: p.consent.version } : {}),
        },
        select: { id: true },
      });
      return row.id;
    } catch (e) {
      this.logger.warn(`No se pudo registrar la orden (no bloquea): ${(e as Error).message}`);
      return null;
    }
  }
}
