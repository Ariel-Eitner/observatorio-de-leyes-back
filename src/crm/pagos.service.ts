import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { LeadsService } from './leads.service';

/**
 * Persistencia de los pagos de Mercado Pago.
 *
 * Portado de `app/api/pagos/*` y `app/lib/pagos.ts`, que escribían `pagos`,
 * `founders` e `ingresos` con la `service_role` key desde rutas públicas (una de
 * ellas el webhook, que es un endpoint abierto por definición).
 *
 * QUÉ NO SE MOVIÓ, Y POR QUÉ
 * --------------------------
 * En el frontend siguen viviendo tres cosas, a propósito:
 *
 *   - `tierForMonto()` (fundadorTiers.ts): la escalera de montos también la usa
 *     la UI para mostrar badges. Duplicarla acá sería garantizar que un día se
 *     desincronicen. El front calcula el tier y lo manda ya resuelto.
 *   - `getDolar()`: es un fetch a una API externa con su propio caché.
 *   - `revalidateFoundersWall()`: es caché de Next, no datos.
 *
 * La firma con Mercado Pago (HMAC del webhook) también queda en el front: ahí
 * llega el request y ahí están los secretos de MP.
 */

export interface PagoRow {
  id: string;
  tipo: string;
  monto: number;
  email: string | null;
  nombre: string | null;
  guest_id: string | null;
  device: string | null;
  founder_id: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

/** Tier ya resuelto por el front a partir del monto. */
export interface TierAplicado {
  id: string;
  proMeses: number;
}

@Injectable()
export class PagosService {
  private readonly logger = new Logger(PagosService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly leads: LeadsService,
  ) {}

  private toRow(p: {
    id: string;
    tipo: string;
    monto: Prisma.Decimal;
    email: string | null;
    nombre: string | null;
    guestId: string | null;
    device: string | null;
    founderId: string | null;
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
  }): PagoRow {
    return {
      id: p.id,
      tipo: p.tipo,
      monto: Number(p.monto),
      email: p.email,
      nombre: p.nombre,
      guest_id: p.guestId,
      device: p.device,
      founder_id: p.founderId,
      utm_source: p.utmSource,
      utm_medium: p.utmMedium,
      utm_campaign: p.utmCampaign,
    };
  }

  async crear(data: Record<string, unknown>): Promise<PagoRow> {
    const row = await this.prisma.pago.create({
      data: {
        tipo: (data.tipo as string) ?? 'apoyo',
        concepto: (data.concepto as string) ?? null,
        monto: new Prisma.Decimal((data.monto as number) ?? 0),
        estado: (data.estado as string) ?? 'pendiente',
        paymentMethod: (data.paymentMethod as string) ?? null,
        email: (data.email as string) ?? null,
        nombre: (data.nombre as string) ?? null,
        guestId: (data.guestId as string) ?? null,
        device: (data.device as string) ?? null,
        utmSource: (data.utmSource as string) ?? null,
        utmMedium: (data.utmMedium as string) ?? null,
        utmCampaign: (data.utmCampaign as string) ?? null,
        metadata: (data.metadata ?? null) as never,
        externalReference: (data.externalReference as string) ?? null,
      },
    });
    return this.toRow(row);
  }

  async actualizar(id: string, patch: Record<string, unknown>): Promise<PagoRow | null> {
    try {
      const row = await this.prisma.pago.update({
        where: { id },
        data: { ...patch, updatedAt: new Date() },
      });
      return this.toRow(row);
    } catch {
      return null;
    }
  }

  async porId(id: string): Promise<PagoRow | null> {
    const row = await this.prisma.pago.findUnique({ where: { id } });
    return row ? this.toRow(row) : null;
  }

  /** Estado público que consulta el checkout mientras espera la confirmación. */
  async estado(id: string) {
    const row = await this.prisma.pago.findUnique({
      where: { id },
      select: { estado: true, mpStatus: true, mpStatusDetail: true, monto: true, tipo: true },
    });
    if (!row) return null;
    return {
      estado: row.estado,
      mp_status: row.mpStatus,
      mp_status_detail: row.mpStatusDetail,
      monto: Number(row.monto),
      tipo: row.tipo,
    };
  }

  async porMpPaymentId(mpPaymentId: string): Promise<PagoRow | null> {
    const row = await this.prisma.pago.findFirst({ where: { mpPaymentId } });
    return row ? this.toRow(row) : null;
  }

  /**
   * Un APOYO quedó aprobado: confirma al fundador, lo registra como lead y anota
   * el ingreso. Idempotente — si el pago se reprocesa (el webhook de MP puede
   * repetir), no duplica nada: `founders` va por email y `ingresos` por
   * `source_ref`.
   */
  async aplicarApoyoAprobado(
    pago: PagoRow,
    tier: TierAplicado | null,
    tipoCambio: number | null,
  ): Promise<string | null> {
    const email = pago.email?.trim() || null;
    if (pago.tipo !== 'apoyo' || !email) return null;

    const now = new Date();
    const existing = await this.prisma.founders.findUnique({
      where: { email },
      select: { id: true, nombre: true, beneficio_meses: true },
    });

    let founderId: string | null = existing?.id ?? null;

    if (existing) {
      const upd: Record<string, unknown> = {
        pagado: true,
        confirmed_at: now,
        canal: 'mercado_pago',
      };
      if (pago.nombre && !existing.nombre) upd.nombre = pago.nombre;
      if (pago.guest_id) upd.guest_id = pago.guest_id;
      // Solo subir de nivel, nunca bajar: si vuelve a donar más, mejora.
      if (tier && tier.proMeses >= (existing.beneficio_meses ?? 0)) {
        upd.nivel = tier.id;
        upd.beneficio = 'Pro';
        upd.beneficio_meses = tier.proMeses;
      }
      await this.prisma.founders.update({ where: { id: existing.id }, data: upd });
    } else {
      const created = await this.prisma.founders.create({
        data: {
          email,
          nombre: pago.nombre ?? null,
          canal: 'mercado_pago',
          pagado: true,
          confirmed_at: now,
          guest_id: pago.guest_id ?? null,
          nivel: tier?.id ?? null,
          beneficio: tier ? 'Pro' : null,
          beneficio_meses: tier?.proMeses ?? null,
          utm_source: pago.utm_source,
          utm_medium: pago.utm_medium,
          utm_campaign: pago.utm_campaign,
        },
        select: { id: true },
      });
      founderId = created.id;
    }

    await this.leads.upsert({
      email,
      nombre: pago.nombre ?? null,
      source: 'founder',
      status: 'founder',
      guestId: pago.guest_id ?? null,
      device: pago.device ?? null,
      utms: {
        utm_source: pago.utm_source,
        utm_medium: pago.utm_medium,
        utm_campaign: pago.utm_campaign,
      },
      event: {
        type: 'apoyo_pagado',
        payload: { monto: pago.monto, via: 'bricks', nivel: tier?.id ?? null },
      },
    });

    // El registro contable nunca puede romper el flujo del pago.
    try {
      const iso = now.toISOString();
      await this.prisma.ingreso.upsert({
        where: { sourceRef: `apoyo:${pago.id}` },
        create: {
          fecha: new Date(iso.slice(0, 10)),
          tipo: 'DONACION',
          cliente: email,
          descripcion: `Apoyo${pago.nombre ? ` — ${pago.nombre}` : ''}`,
          monto: pago.monto,
          moneda: 'ARS',
          tipoCambio: tipoCambio,
          montoArs: pago.monto,
          medioCobro: 'MERCADOPAGO',
          periodo: iso.slice(0, 7),
          sourceRef: `apoyo:${pago.id}`,
        },
        // update vacío = el equivalente al ignoreDuplicates del upsert original:
        // si el pago ya se contabilizó, no se vuelve a tocar.
        update: {},
      });
    } catch (e) {
      this.logger.warn(`No se pudo registrar el ingreso del pago ${pago.id}: ${(e as Error).message}`);
    }

    return founderId;
  }
}
