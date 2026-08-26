import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { iso, num, numOrNull } from './shared';

/**
 * Pagos, Ã³rdenes de informe, fundadores y usuarios del panel.
 *
 * Todo esto lo leÃ­a el frontend directo de Supabase. Los modelos de Prisma que
 * estÃ¡n en camelCase se devuelven en snake_case: los componentes cliente del
 * panel ya estÃ¡n tipados contra ese shape.
 */
@Injectable()
export class ComercialService {
  constructor(private readonly prisma: PrismaService) {}

  // â”€â”€ Pagos â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  async pagos() {
    const rows = await this.prisma.pago.findMany({
      orderBy: { createdAt: 'desc' },
      take: 300,
      select: {
        id: true, createdAt: true, tipo: true, concepto: true, monto: true,
        estado: true, mpPaymentId: true, mpStatusDetail: true, paymentMethod: true,
        email: true, nombre: true, device: true, utmSource: true,
      },
    });
    return rows.map((p) => ({
      id: p.id,
      created_at: iso(p.createdAt),
      tipo: p.tipo,
      concepto: p.concepto,
      monto: num(p.monto),
      estado: p.estado,
      mp_payment_id: p.mpPaymentId,
      mp_status_detail: p.mpStatusDetail,
      payment_method: p.paymentMethod,
      email: p.email,
      nombre: p.nombre,
      device: p.device,
      utm_source: p.utmSource,
    }));
  }

  async borrarPago(id: string) {
    await this.prisma.pago.deleteMany({ where: { id } });
    return { ok: true };
  }

  // â”€â”€ Ã“rdenes de informe (product_orders) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  async ordenes() {
    const rows = await this.prisma.productOrder.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
      select: {
        id: true, createdAt: true, producto: true, nombre: true, email: true,
        telefono: true, precio: true, detalle: true, status: true, notas: true,
      },
    });
    return rows.map((o) => ({
      id: o.id,
      created_at: iso(o.createdAt),
      producto: o.producto,
      nombre: o.nombre,
      email: o.email,
      telefono: o.telefono,
      precio: numOrNull(o.precio),
      detalle: o.detalle,
      status: o.status,
      notas: o.notas,
    }));
  }

  async actualizarOrden(id: string, status: string) {
    await this.prisma.productOrder.updateMany({ where: { id }, data: { status } });
    return { ok: true };
  }

  async borrarOrden(id: string) {
    await this.prisma.productOrder.deleteMany({ where: { id } });
    return { ok: true };
  }

  // â”€â”€ Fundadores â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  /** Ficha completa: la pantalla muestra beneficio, consentimiento y UTMs. */
  async founders() {
    const rows = await this.prisma.founders.findMany({ orderBy: { created_at: 'desc' } });
    return rows.map((f) => ({
      ...f,
      created_at: iso(f.created_at),
      updated_at: iso(f.updated_at),
      confirmed_at: iso(f.confirmed_at),
      comprobante_at: iso(f.comprobante_at),
      beneficio_otorgado_at: iso(f.beneficio_otorgado_at),
      beneficio_hasta: iso(f.beneficio_hasta),
      consent_at: iso(f.consent_at),
    }));
  }

  async borrarFounders(ids: string[]) {
    if (!ids.length) return { ok: true, borrados: 0 };
    const r = await this.prisma.founders.deleteMany({ where: { id: { in: ids } } });
    return { ok: true, borrados: r.count };
  }

  /**
   * Confirma el pago real DESPUÃ‰S de verificarlo en Mercado Pago. El comprobante
   * por sÃ­ solo no alcanza: es el segundo nivel del flujo de confirmaciÃ³n.
   */
  async setFounderPagado(id: string, pagado: boolean) {
    await this.prisma.founders.updateMany({
      where: { id },
      data: { pagado, confirmed_at: pagado ? new Date() : null },
    });
    return { ok: true };
  }

  // â”€â”€ Usuarios â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  /**
   * Listado de usuarios + lo necesario para las mÃ©tricas por usuario. La
   * agregaciÃ³n (descargas, herramientas, Ãºltima actividad) se hace en el front,
   * que ya tiene las listas de tipos de evento.
   */
  async usuarios() {
    const [users, saved, events, claims, leads] = await Promise.all([
      this.prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true, email: true, nombre: true, plan: true, isFounder: true,
          isAdmin: true, leadId: true, createdAt: true, lastLoginAt: true,
        },
      }),
      this.prisma.savedLaw.findMany({ select: { userId: true, createdAt: true } }),
      this.prisma.trackingEvent.findMany({
        where: { userId: { not: null } },
        select: { userId: true, type: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 8000,
      }),
      this.prisma.benefitClaim.findMany({ select: { userId: true } }),
      this.prisma.leads.findMany({
        select: { email: true, first_source: true, utm_source: true },
      }),
    ]);

    return {
      users: users.map((u) => ({
        id: u.id,
        email: u.email,
        nombre: u.nombre,
        plan: u.plan,
        is_founder: u.isFounder,
        is_admin: u.isAdmin,
        lead_id: u.leadId,
        created_at: iso(u.createdAt),
        last_login_at: iso(u.lastLoginAt),
      })),
      saved: saved.map((s) => ({ user_id: s.userId, created_at: iso(s.createdAt) })),
      events: events.map((e) => ({
        user_id: e.userId,
        type: e.type,
        created_at: iso(e.createdAt),
      })),
      claims: claims.map((c) => ({ user_id: c.userId })),
      leads,
    };
  }

  /**
   * Ficha de un usuario con su identidad unificada: el lead (por lead_id o
   * email), el fundador (por email) y la actividad de tracking por user_id O por
   * su guest_id anÃ³nimo â€” lo de ANTES de registrarse.
   */
  async usuario(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;

    const email = user.email ?? '';
    const guestId = user.guestId ?? null;

    const [lead, founder, events, saved, claims] = await Promise.all([
      user.leadId
        ? this.prisma.leads.findUnique({ where: { id: user.leadId } })
        : this.prisma.leads.findFirst({ where: { email: { equals: email, mode: 'insensitive' } } }),
      this.prisma.founders.findFirst({ where: { email: { equals: email, mode: 'insensitive' } } }),
      this.prisma.trackingEvent.findMany({
        where: guestId ? { OR: [{ userId: id }, { guestId }] } : { userId: id },
        select: { type: true, properties: true, createdAt: true, guestId: true, userId: true },
        orderBy: { createdAt: 'desc' },
        take: 500,
      }),
      this.prisma.savedLaw.findMany({
        where: { userId: id },
        select: { normId: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.benefitClaim.findMany({
        where: { userId: id },
        select: {
          id: true, detalle: true, status: true, createdAt: true,
          monto: true, medio: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const leadEvents = lead
      ? await this.prisma.lead_events.findMany({
          where: { lead_id: lead.id },
          select: { type: true, created_at: true },
          orderBy: { created_at: 'desc' },
          take: 100,
        })
      : [];

    return {
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        plan: user.plan,
        plan_until: iso(user.planUntil),
        is_admin: user.isAdmin,
        is_founder: user.isFounder,
        guest_id: user.guestId,
        lead_id: user.leadId,
        created_at: iso(user.createdAt),
        last_login_at: iso(user.lastLoginAt),
      },
      lead: lead
        ? {
            ...lead,
            created_at: iso(lead.created_at),
            updated_at: iso(lead.updated_at),
            consent_at: iso(lead.consent_at),
          }
        : null,
      founder: founder
        ? {
            ...founder,
            created_at: iso(founder.created_at),
            updated_at: iso(founder.updated_at),
            confirmed_at: iso(founder.confirmed_at),
            comprobante_at: iso(founder.comprobante_at),
            beneficio_otorgado_at: iso(founder.beneficio_otorgado_at),
            beneficio_hasta: iso(founder.beneficio_hasta),
            consent_at: iso(founder.consent_at),
          }
        : null,
      events: events.map((e) => ({
        type: e.type,
        properties: e.properties,
        created_at: iso(e.createdAt),
        guest_id: e.guestId,
        user_id: e.userId,
      })),
      saved: saved.map((s) => ({ norm_id: s.normId, created_at: iso(s.createdAt) })),
      claims: claims.map((c) => ({
        id: c.id,
        detalle: c.detalle,
        status: c.status,
        created_at: iso(c.createdAt),
        monto: c.monto,
        medio: c.medio,
      })),
      leadEvents: leadEvents.map((e) => ({ type: e.type, created_at: iso(e.created_at) })),
    };
  }
}
