import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { LeadsService } from './leads.service';

/**
 * Mensajes de contacto y feedback.
 *
 * Portado de `app/api/contact` y `app/api/feedback`, que insertaban en
 * `contact_submissions` con la `service_role` key desde rutas públicas.
 *
 * Los dos casos escriben en la misma tabla y se distinguen por `tipo`; el
 * feedback del Redactor entra como un contacto más para que caiga en la misma
 * bandeja del panel.
 */

export interface CrearContactoParams {
  nombre: string;
  email?: string | null;
  tipo: string;
  mensaje: string;
  apellido?: string | null;
  telefono?: string | null;
  profesion?: string | null;
  empresa?: string | null;
  provincia?: string | null;
  comoNosEncontro?: string | null;
  tipoUsuario?: string | null;
  userAgent?: string | null;
  guestId?: string | null;
  utms?: {
    utm_source?: string | null;
    utm_medium?: string | null;
    utm_campaign?: string | null;
    utm_content?: string | null;
    utm_term?: string | null;
  };
  consent?: { at: string; version: string } | null;
  // Origen del lead: 'contact' o 'feedback'.
  source?: string;
  // Nombre exacto del evento a registrar en lead_events. Lo manda el llamador
  // para no reinventar el catálogo de eventos acá: los nombres ya están en uso
  // en las métricas del panel y renombrarlos rompería las series históricas.
  eventType?: string;
  eventPayload?: Record<string, unknown>;
  /**
   * Si crear/actualizar el lead además del mensaje. Default true.
   *
   * El feedback del Redactor lo pone en false cuando no dejaron email: ahí el
   * teléfono es un WhatsApp de contacto puntual, y darlo de alta como lead
   * generaría contactos que nunca aceptaron estar en la base.
   */
  registrarLead?: boolean;
}

@Injectable()
export class ContactoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly leads: LeadsService,
  ) {}

  async crear(p: CrearContactoParams): Promise<{ id: string }> {
    const utms = p.utms ?? {};
    const source = p.source ?? 'contact';

    const row = await this.prisma.contact_submissions.create({
      data: {
        nombre: p.nombre,
        email: p.email ?? null,
        tipo: p.tipo,
        mensaje: p.mensaje,
        apellido: p.apellido ?? null,
        telefono: p.telefono ?? null,
        profesion: p.profesion ?? null,
        empresa: p.empresa ?? null,
        provincia: p.provincia ?? null,
        como_nos_encontro: p.comoNosEncontro ?? null,
        tipo_usuario: p.tipoUsuario ?? null,
        user_agent: p.userAgent ?? null,
        guest_id: p.guestId ?? null,
        utm_source: utms.utm_source ?? null,
        utm_medium: utms.utm_medium ?? null,
        utm_campaign: utms.utm_campaign ?? null,
        utm_content: utms.utm_content ?? null,
        utm_term: utms.utm_term ?? null,
        ...(p.consent ? { consent_at: new Date(p.consent.at), consent_version: p.consent.version } : {}),
      },
      select: { id: true },
    });

    if (p.registrarLead === false) return row;

    await this.leads.upsert({
      email: p.email,
      nombre: p.nombre,
      source,
      status: 'warm',
      guestId: p.guestId,
      device: (p.eventPayload?.device as string) ?? null,
      enrichment: {
        tipo_usuario: p.tipoUsuario ?? null,
        profesion: p.profesion ?? null,
        empresa: p.empresa ?? null,
        provincia: p.provincia ?? null,
        telefono: p.telefono ?? null,
        como_nos_encontro: p.comoNosEncontro ?? null,
      },
      utms,
      consent: p.consent,
      event: {
        type: p.eventType ?? 'contact_message',
        payload: { tipo: p.tipo, ...(p.eventPayload ?? {}) },
      },
    });

    return row;
  }

  /** Marcar como leído desde el panel. */
  async marcarLeido(id: string): Promise<void> {
    await this.prisma.contact_submissions.update({
      where: { id },
      data: { is_read: true },
    });
  }
}
