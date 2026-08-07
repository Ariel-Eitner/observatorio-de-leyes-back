import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { LeadsService } from './leads.service';

/**
 * Alta de fundadores y el muro público.
 *
 * Portado de `app/api/founders/*` y `app/lib/foundersWall.ts` del frontend, que
 * consultaban Supabase directo con la `service_role` key — incluso desde la home
 * y `/fundadores`, que son páginas públicas.
 *
 * El badge/tier NO se calcula acá: sigue viviendo en el front
 * (`app/lib/fundadorTiers.ts`), que es de donde se consume. Este servicio
 * devuelve `nivel` crudo y el front lo mapea, para no duplicar la escalera de
 * tiers en dos lugares y que se desincronicen.
 */

export interface UpsertFounderParams {
  nombre: string;
  email: string;
  canal?: string | null;
  telefono?: string | null;
  mensaje?: string | null;
  guestId?: string | null;
  tipoUsuario?: string | null;
  profesion?: string | null;
  provincia?: string | null;
  utms?: {
    utm_source?: string | null;
    utm_medium?: string | null;
    utm_campaign?: string | null;
    utm_content?: string | null;
    utm_term?: string | null;
  };
  consent?: { at: string; version: string } | null;
  // Contexto server-side (device, geo, url) que arma el front con leadContext().
  eventPayload?: Record<string, unknown>;
}

export interface FounderWallRow {
  nombre: string;
  nivel: string | null;
  confirmedAt: string | null;
  createdAt: string | null;
}

@Injectable()
export class FoundersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly leads: LeadsService,
  ) {}

  async upsert(p: UpsertFounderParams): Promise<void> {
    const utms = p.utms ?? {};

    // Solo se escriben las columnas presentes. Es a propósito: el alta de un
    // founder son DOS POST (datos, y después elección del canal de donación), y
    // el segundo no trae ni teléfono ni consentimiento. Si se mandaran como null
    // borrarían lo que guardó el primero.
    const opcionales: Record<string, unknown> = {};
    if (p.telefono) opcionales.telefono = p.telefono;
    if (p.mensaje) opcionales.mensaje = p.mensaje;
    if (p.guestId) opcionales.guest_id = p.guestId;
    if (p.consent) {
      opcionales.consent_at = new Date(p.consent.at);
      opcionales.consent_version = p.consent.version;
    }

    const comunes = {
      nombre: p.nombre,
      canal: p.canal ?? null,
      utm_source: utms.utm_source ?? null,
      utm_medium: utms.utm_medium ?? null,
      utm_campaign: utms.utm_campaign ?? null,
      utm_content: utms.utm_content ?? null,
      utm_term: utms.utm_term ?? null,
      ...opcionales,
    };

    await this.prisma.founders.upsert({
      where: { email: p.email },
      create: { email: p.email, ...comunes },
      update: comunes,
    });

    await this.leads.upsert({
      email: p.email,
      nombre: p.nombre,
      source: 'founder',
      status: 'founder',
      guestId: p.guestId,
      device: (p.eventPayload?.device as string) ?? null,
      enrichment: {
        tipo_usuario: p.tipoUsuario ?? null,
        profesion: p.profesion ?? null,
        provincia: p.provincia ?? null,
        telefono: p.telefono ?? null,
      },
      utms,
      consent: p.consent,
      event: {
        type: 'founder_pledge',
        payload: { canal: p.canal, mensaje: p.mensaje, ...(p.eventPayload ?? {}) },
      },
    });
  }

  /** Cuántos fundadores hay (contador público de la landing de apoyo). */
  async count(): Promise<number> {
    return this.prisma.founders.count();
  }

  /**
   * El muro: solo los que pagaron y no pidieron quedar ocultos.
   * Orden por antigüedad; el ranking por tier lo aplica el front, que es quien
   * conoce la escalera de montos.
   */
  async wall(): Promise<FounderWallRow[]> {
    const rows = await this.prisma.founders.findMany({
      where: { pagado: true, oculto_muro: false },
      select: { nombre: true, nivel: true, confirmed_at: true, created_at: true },
      orderBy: { created_at: 'asc' },
    });

    return rows
      .filter((r) => (r.nombre ?? '').trim().length > 0)
      .map((r) => ({
        nombre: r.nombre,
        nivel: r.nivel,
        confirmedAt: r.confirmed_at?.toISOString() ?? null,
        createdAt: r.created_at?.toISOString() ?? null,
      }));
  }

  /**
   * Adjuntar el comprobante que pega el donante.
   *
   * OJO: esto NO marca `pagado`. La verificación contra Mercado Pago la hace el
   * admin desde /admin/fundadores; son dos niveles a propósito.
   *
   * Si el email no estaba registrado se da de alta igual: el comprobante se manda
   * después del formulario, así que no debería pasar, pero perder un comprobante
   * de alguien que efectivamente pagó es mucho peor que crear una fila de más.
   */
  async adjuntarComprobante(
    email: string,
    url: string,
    opts: { nombre?: string | null; canal?: string | null } = {},
  ): Promise<boolean> {
    const datos = {
      comprobante_url: url,
      comprobante_at: new Date(),
      ...(opts.canal ? { canal: opts.canal } : {}),
    };

    await this.prisma.founders.upsert({
      where: { email },
      create: { email, nombre: opts.nombre || email, ...datos },
      update: datos,
    });

    await this.leads.upsert({
      email,
      source: 'founder',
      status: 'founder',
      event: { type: 'founder_comprobante', payload: { canal: opts.canal ?? null } },
    });

    return true;
  }
}
