import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

/**
 * Alta y enriquecimiento progresivo de leads.
 *
 * Portado desde `app/lib/upsertLead.ts` del frontend, que hacía esto mismo
 * pegándole directo a Supabase con la `service_role` key. Esa key bypassea RLS
 * por completo y estaba en rutas públicas (contacto, feedback, descargas, alta de
 * founder, órdenes de producto). Ahora el frontend proxea acá y no toca la base.
 *
 * La lógica se mantiene igual a propósito, incluidas dos reglas que no son obvias:
 *
 *   1. El status solo SUBE (cold < warm < founder < registered). Un lead que ya
 *      pagó no vuelve a "cold" porque después haya bajado un PDF.
 *   2. Los campos solo se completan si estaban vacíos (enriquecimiento
 *      progresivo): lo que el usuario cargó primero gana. Vale también para el
 *      consentimiento: se guarda la primera prueba, no la última.
 */

const STATUS_RANK: Record<string, number> = {
  cold: 0,
  warm: 1,
  founder: 2,
  registered: 3,
};

export interface LeadEnrichment {
  tipo_usuario?: string | null;
  profesion?: string | null;
  empresa?: string | null;
  provincia?: string | null;
  telefono?: string | null;
  como_nos_encontro?: string | null;
}

export interface UpsertLeadParams {
  // Identificación flexible: alcanza con email O teléfono. La descarga de leyes
  // deja elegir uno de los dos (ver DescargaModal).
  email?: string | null;
  nombre?: string | null;
  source: string; // contact | founder | feedback | registro | newsletter | descarga
  status: string; // cold | warm | founder | registered
  guestId?: string | null; // id anónimo del visitante → permite reconstruir el recorrido
  device?: string | null; // mobile | desktop
  enrichment?: LeadEnrichment;
  utms?: {
    utm_source?: string | null;
    utm_medium?: string | null;
    utm_campaign?: string | null;
    utm_content?: string | null;
    utm_term?: string | null;
  };
  event: { type: string; payload?: Record<string, unknown> };
  createdAt?: string;
  // Prueba del consentimiento (ley 25.326): fecha + versión de la política.
  consent?: { at: string; version: string } | null;
}

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Nunca lanza: un fallo acá no puede tumbar el flujo principal (el usuario ya
   * mandó su consulta / pagó / descargó). Se loguea y sigue.
   */
  async upsert(params: UpsertLeadParams): Promise<string | null> {
    try {
      const { nombre, source, status, enrichment = {}, utms = {}, event, createdAt, consent } = params;
      const email = params.email?.trim() || null;
      const telefono = enrichment.telefono?.trim() || null;
      const guestId = params.guestId?.trim() || null;
      const device = params.device?.trim() || null;

      // Sin identificador no se puede deduplicar ni contactar.
      if (!email && !telefono) return null;

      const now = new Date();

      let existing = email
        ? await this.prisma.leads.findFirst({ where: { email } })
        : null;
      if (!existing && telefono) {
        existing = await this.prisma.leads.findFirst({ where: { telefono } });
      }

      let leadId: string;

      if (!existing) {
        const created = await this.prisma.leads.create({
          data: {
            email,
            nombre: nombre ?? null,
            first_source: source,
            status,
            updated_at: now,
            guest_id: guestId,
            device,
            ...utms,
            ...enrichment,
            ...(consent ? { consent_at: new Date(consent.at), consent_version: consent.version } : {}),
          },
          select: { id: true },
        });
        leadId = created.id;
      } else {
        leadId = existing.id;

        const currentRank = STATUS_RANK[existing.status] ?? 0;
        const newRank = STATUS_RANK[status] ?? 0;

        // Solo campos que estaban vacíos. `updated_at` va siempre, por eso el
        // corte de abajo es > 1 y no > 0.
        const updates: Record<string, unknown> = { updated_at: now };
        if (email && !existing.email) updates.email = email;
        if (nombre && !existing.nombre) updates.nombre = nombre;
        if (newRank > currentRank) updates.status = status;
        if (enrichment.tipo_usuario && !existing.tipo_usuario) updates.tipo_usuario = enrichment.tipo_usuario;
        if (enrichment.profesion && !existing.profesion) updates.profesion = enrichment.profesion;
        if (enrichment.empresa && !existing.empresa) updates.empresa = enrichment.empresa;
        if (enrichment.provincia && !existing.provincia) updates.provincia = enrichment.provincia;
        if (telefono && !existing.telefono) updates.telefono = telefono;
        if (guestId && !existing.guest_id) updates.guest_id = guestId;
        if (device && !existing.device) updates.device = device;
        if (enrichment.como_nos_encontro && !existing.como_nos_encontro) {
          updates.como_nos_encontro = enrichment.como_nos_encontro;
        }
        if (consent && !existing.consent_at) {
          updates.consent_at = new Date(consent.at);
          updates.consent_version = consent.version;
        }

        if (Object.keys(updates).length > 1) {
          await this.prisma.leads.update({ where: { id: leadId }, data: updates });
        }
      }

      await this.prisma.lead_events.create({
        data: {
          lead_id: leadId,
          type: event.type,
          payload: (event.payload ?? null) as never,
          created_at: createdAt ? new Date(createdAt) : now,
        },
      });

      return leadId;
    } catch (e) {
      this.logger.warn(`upsertLead falló (no bloquea el flujo): ${(e as Error).message}`);
      return null;
    }
  }
}
