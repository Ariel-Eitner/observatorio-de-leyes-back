import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { iso, likeLiteral, numOrNull } from './shared';

/**
 * Datos del panel de contactos: leads, mensajes, fundadores y el estado del
 * badge de "nuevos".
 *
 * Portado de las consultas que `app/admin/**` y `app/api/admin/**` hacían directo
 * contra Supabase con la `service_role` key. Ver crm/ para la parte pública.
 */

const KV_CONTACTOS_LAST_SEEN = 'contactos_last_seen';

export interface LeadPatchBody {
  pagado?: boolean;
  comprobante_url?: string | null;
  monto?: number | null;
  tipoCambio?: number | null;
  marcarLeido?: boolean;
}

@Injectable()
export class PanelService {
  private readonly logger = new Logger(PanelService.name);

  constructor(private readonly prisma: PrismaService) {}

  // ── Badges de la barra de navegación ────────────────────────────────────────

  /**
   * Los 5 contadores del nav en UNA consulta por contador, en paralelo.
   *
   * Antes eran 6 round-trips a Supabase desde `app/admin/layout.tsx`, que corre
   * en CADA navegación del panel (`force-dynamic`).
   */
  async navBadges() {
    const [contactosNuevos, postDrafts, foundersSinVerificar, pdfPendientes, tareasPendientes, seguimiento] =
      await Promise.all([
        this.contactosNuevosCount(),
        this.prisma.postDraft.count(),
        this.prisma.founders.count({
          where: { pagado: false, comprobante_url: { not: null } },
        }),
        this.prisma.productOrder.count({ where: { status: 'pendiente' } }),
        this.prisma.adminTask.count({ where: { hecha: false } }),
        // Sin filtro por m48 en SQL: filtrar un Json por NULL en Prisma exige
        // Prisma.DbNull y es fácil equivocarse en silencio. Son unas pocas filas.
        this.prisma.contentPost.findMany({
          select: { publishedAt: true, m24: true, m48: true },
        }),
      ]);

    // Posteos cuya ventana de métricas (24 h / 48 h) ya venció y siguen sin cargar.
    const now = Date.now();
    const seguimientoPendiente = seguimiento.filter((p) => {
      const h = (now - p.publishedAt.getTime()) / 3_600_000;
      return (h >= 24 && !p.m24) || (h >= 48 && !p.m48);
    }).length;

    return {
      contactosNuevos,
      postDrafts,
      foundersSinVerificar,
      pdfPendientes,
      tareasPendientes,
      seguimientoPendiente,
    };
  }

  /**
   * Contactos con actividad desde la última vez que se abrió la pestaña.
   * `leads.updated_at` se toca con CADA evento, así que cuenta toda la actividad
   * (descargas, compras, apoyos, mensajes), no solo los mensajes nuevos.
   */
  private async contactosNuevosCount(): Promise<number> {
    const lastSeen = await this.lastSeen();
    return this.prisma.leads.count({ where: { updated_at: { gt: new Date(lastSeen) } } });
  }

  private async lastSeen(): Promise<string> {
    const kv = await this.prisma.adminKv.findUnique({ where: { key: KV_CONTACTOS_LAST_SEEN } });
    return kv?.value ?? '1970-01-01T00:00:00.000Z';
  }

  async marcarContactosVistos(): Promise<void> {
    const now = new Date();
    await this.prisma.adminKv.upsert({
      where: { key: KV_CONTACTOS_LAST_SEEN },
      create: { key: KV_CONTACTOS_LAST_SEEN, value: now.toISOString(), updatedAt: now },
      update: { value: now.toISOString(), updatedAt: now },
    });
  }

  // ── Contactos ───────────────────────────────────────────────────────────────

  /**
   * Todo lo que necesita /admin/contactos, en una sola llamada.
   *
   * El cruce (lead ↔ founder ↔ orden ↔ mensaje ↔ usuario) se sigue haciendo en el
   * front: ahí vive `buildMensajes` / `categoriaDeEvento`, que también usa el
   * detalle de un contacto. Duplicar esa lógica acá sería garantizar que las dos
   * copias se desincronicen.
   */
  async contactos() {
    const [leads, leadEvents, founders, orders, subs, users, lastSeen] = await Promise.all([
      this.prisma.leads.findMany({
        select: {
          id: true, email: true, nombre: true, status: true, first_source: true,
          updated_at: true, telefono: true, tipo_usuario: true, profesion: true,
          empresa: true, provincia: true, guest_id: true, utm_source: true,
          utm_medium: true, utm_campaign: true, device: true,
        },
        orderBy: { updated_at: 'desc' },
      }),
      this.prisma.lead_events.findMany({
        select: { id: true, lead_id: true, type: true, payload: true, created_at: true },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.founders.findMany({
        select: {
          id: true, email: true, canal: true, pagado: true, comprobante_url: true,
          comprobante_at: true, mensaje: true, nivel: true,
        },
      }),
      this.prisma.productOrder.findMany({
        select: { email: true, producto: true, precio: true, status: true, createdAt: true },
      }),
      this.prisma.contact_submissions.findMany({
        select: {
          email: true, tipo: true, mensaje: true, como_nos_encontro: true,
          created_at: true, is_read: true,
        },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.user.findMany({ select: { id: true, email: true } }),
      this.lastSeen(),
    ]);

    return {
      leads: leads.map((l) => ({ ...l, updated_at: iso(l.updated_at) })),
      leadEvents: leadEvents.map((e) => ({ ...e, created_at: iso(e.created_at) })),
      founders: founders.map((f) => ({ ...f, comprobante_at: iso(f.comprobante_at) })),
      orders: orders.map((o) => ({
        email: o.email,
        producto: o.producto,
        precio: numOrNull(o.precio),
        status: o.status,
        created_at: iso(o.createdAt),
      })),
      subs: subs.map((s) => ({ ...s, created_at: iso(s.created_at) })),
      users,
      lastSeen,
    };
  }

  /** Bundle de /admin/mensajes (la vista vieja, más liviana que Contactos). */
  async mensajes() {
    const [leads, leadEvents, founders, unread] = await Promise.all([
      this.prisma.leads.findMany({
        select: {
          id: true, email: true, nombre: true, status: true, first_source: true,
          updated_at: true, telefono: true, tipo_usuario: true,
        },
        orderBy: { updated_at: 'desc' },
      }),
      this.prisma.lead_events.findMany({
        select: { id: true, lead_id: true, type: true, payload: true, created_at: true },
        orderBy: { created_at: 'asc' },
      }),
      this.prisma.founders.findMany({
        select: {
          id: true, email: true, canal: true, pagado: true, comprobante_url: true,
          comprobante_at: true, created_at: true,
        },
      }),
      this.prisma.contact_submissions.findMany({
        where: { is_read: false },
        select: { email: true, is_read: true },
      }),
    ]);

    return {
      leads: leads.map((l) => ({ ...l, updated_at: iso(l.updated_at) })),
      leadEvents: leadEvents.map((e) => ({ ...e, created_at: iso(e.created_at) })),
      founders: founders.map((f) => ({
        ...f,
        comprobante_at: iso(f.comprobante_at),
        created_at: iso(f.created_at),
      })),
      unread,
    };
  }

  // ── Detalle de un contacto ──────────────────────────────────────────────────

  /**
   * Detalle pesado de UN lead. Se baja solo al abrir su tarjeta: la lista trae el
   * resumen liviano.
   */
  async leadDetalle(id: string) {
    const lead = await this.prisma.leads.findUnique({
      where: { id },
      select: { id: true, email: true, updated_at: true },
    });
    if (!lead) return null;

    const emailPat = lead.email ? likeLiteral(lead.email) : null;
    const [events, subs, founder] = await Promise.all([
      this.prisma.lead_events.findMany({
        where: { lead_id: id },
        select: { id: true, type: true, payload: true, created_at: true },
        orderBy: { created_at: 'desc' },
      }),
      emailPat
        ? this.prisma.contact_submissions.findMany({
            where: { email: { equals: lead.email!, mode: 'insensitive' } },
            select: {
              mensaje: true, tipo: true, como_nos_encontro: true,
              created_at: true, is_read: true,
            },
            orderBy: { created_at: 'desc' },
          })
        : Promise.resolve([]),
      emailPat
        ? this.prisma.founders.findFirst({
            where: { email: { equals: lead.email!, mode: 'insensitive' } },
            select: { mensaje: true },
          })
        : Promise.resolve(null),
    ]);

    return {
      lead: { ...lead, updated_at: iso(lead.updated_at) },
      events: events.map((e) => ({ ...e, created_at: iso(e.created_at) })),
      subs: subs.map((s) => ({ ...s, created_at: iso(s.created_at) })),
      founderMensaje: founder?.mensaje ?? null,
    };
  }

  /**
   * Confirmar/desconfirmar el pago de un fundador y marcar mensajes como leídos.
   *
   * El tipo de cambio llega YA RESUELTO desde el front (`getDolar`), igual que en
   * el flujo de apoyo aprobado: esa cotización también la muestra la UI y tener
   * dos fuentes sería garantizar que se desincronicen.
   */
  async leadPatch(id: string, body: LeadPatchBody): Promise<{ ok: boolean; error?: string }> {
    const tocaFounder = 'pagado' in body || 'comprobante_url' in body;

    if (tocaFounder) {
      const lead = await this.prisma.leads.findUnique({
        where: { id },
        select: { email: true, nombre: true },
      });
      if (!lead?.email) return { ok: false, error: 'Lead no encontrado' };

      const updates: Record<string, unknown> = {};
      if ('pagado' in body) {
        updates.pagado = body.pagado;
        if (body.pagado) updates.comprobante_at = new Date();
      }
      if ('comprobante_url' in body) updates.comprobante_url = body.comprobante_url;

      await this.prisma.founders.updateMany({ where: { email: lead.email }, data: updates });

      if ('pagado' in body) {
        const sourceRef = `apoyo:lead:${id}`;
        if (body.pagado) {
          // El apoyo confirmado también entra como INGRESO en finanzas. Falla en
          // silencio: el registro contable no puede tumbar la confirmación.
          const monto = typeof body.monto === 'number' && body.monto > 0 ? body.monto : null;
          if (monto) {
            try {
              const now = new Date();
              const periodo = now.toISOString().slice(0, 7);
              await this.prisma.ingreso.upsert({
                where: { sourceRef },
                create: {
                  fecha: new Date(now.toISOString().slice(0, 10)),
                  tipo: 'DONACION',
                  cliente: lead.email,
                  descripcion: `Apoyo${lead.nombre ? ` — ${lead.nombre}` : ''} (confirmado manual)`,
                  monto,
                  moneda: 'ARS',
                  tipoCambio: body.tipoCambio ?? null,
                  montoArs: monto,
                  medioCobro: 'MERCADOPAGO',
                  periodo,
                  sourceRef,
                },
                // ignoreDuplicates: si ya se registró, se deja como está.
                update: {},
              });
            } catch (e) {
              this.logger.warn(`No se pudo registrar el ingreso de ${sourceRef}: ${String(e)}`);
            }
          }
        } else {
          // Al des-confirmar, revertir el ingreso asociado.
          await this.prisma.ingreso.deleteMany({ where: { sourceRef } });
        }
      }
    }

    if (body.marcarLeido) {
      const lead = await this.prisma.leads.findUnique({
        where: { id },
        select: { email: true },
      });
      if (lead?.email) {
        await this.prisma.contact_submissions.updateMany({
          where: { email: lead.email, is_read: false },
          data: { is_read: true },
        });
      }
    }

    return { ok: true };
  }

  /** Borrado completo de un contacto: eventos, lead, mensajes y ficha de fundador. */
  async leadDelete(id: string): Promise<{ ok: boolean }> {
    const lead = await this.prisma.leads.findUnique({
      where: { id },
      select: { email: true },
    });

    await this.prisma.lead_events.deleteMany({ where: { lead_id: id } });
    await this.prisma.leads.deleteMany({ where: { id } });

    if (lead?.email) {
      await this.prisma.contact_submissions.deleteMany({ where: { email: lead.email } });
      await this.prisma.founders.deleteMany({ where: { email: lead.email } });
    }
    return { ok: true };
  }

  // ── Soporte (admin_docs) ────────────────────────────────────────────────────

  async soporte() {
    const [doc, mensajes] = await Promise.all([
      this.prisma.adminDoc.findUnique({ where: { key: 'soporte' }, select: { content: true } }),
      this.prisma.contact_submissions.findMany({
        where: { is_read: false },
        select: { id: true, nombre: true, email: true, tipo: true, mensaje: true, created_at: true },
        orderBy: { created_at: 'desc' },
        take: 10,
      }),
    ]);
    return {
      config: doc?.content ?? null,
      mensajesPendientes: mensajes.map((m) => ({ ...m, created_at: iso(m.created_at) })),
    };
  }

  async guardarSoporte(content: unknown) {
    const now = new Date();
    const row = await this.prisma.adminDoc.upsert({
      where: { key: 'soporte' },
      create: { key: 'soporte', content: content as never, updatedAt: now },
      update: { content: content as never, updatedAt: now },
      select: { content: true },
    });
    return row.content;
  }
}
