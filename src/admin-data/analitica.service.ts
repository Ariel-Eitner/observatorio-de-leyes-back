import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { dayKey, iso } from './shared';

/**
 * Lectura de tracking, recorridos y métricas para el panel.
 *
 * Acá vive el ACCESO A DATOS, no el cálculo. `computeMetrics`, `issueOf`,
 * `buildFlowGraph` y `narrator` siguen en el frontend a propósito: son la misma
 * lógica que usa la UI para pintar, y una segunda copia en el backend se
 * desincroniza sin que nadie se entere. El backend consulta; el panel interpreta.
 */

/** Presets de columnas. No se aceptan campos arbitrarios: esto no es PostgREST. */
export type TrackingFields = 'full' | 'index' | 'first';

export interface TrackingQuery {
  since?: string;
  until?: string;
  guestId?: string;
  userIdNotNull?: boolean;
  types?: string[];
  excludeTypes?: string[];
  sessionIds?: string[];
  sessionNull?: boolean;
  fields?: TrackingFields;
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface UpsertJourneyBody {
  guest_id: string;
  timeline: unknown;
  first_touch?: unknown;
  sessions?: number;
  total?: number;
  first_at?: string | null;
  last_at?: string | null;
  frozen_at?: string | null;
}

export interface UpsertMetricsDailyBody {
  day: string;
  payload: unknown;
  guest_ids?: unknown;
  events_count?: number;
  frozen?: boolean;
  computed_at?: string;
}

export interface UpsertMetricsSnapshotBody {
  range_key: string;
  payload: unknown;
  computed_at?: string;
  events_in_range?: number;
  events_all_time?: number;
}

export interface UpsertIssueTriageBody {
  key: string;
  kind: string;
  detail: string;
  status?: string;
  note?: string | null;
}

const MAX_LIMIT = 5000;

@Injectable()
export class AnaliticaService {
  private readonly logger = new Logger(AnaliticaService.name);

  constructor(private readonly prisma: PrismaService) {}

  // ── tracking_events ─────────────────────────────────────────────────────────

  /**
   * Consulta acotada de eventos. Sirve a cinco pantallas (métricas, problemas,
   * recorrido de un visitante, usuarios y el rollup diario) con un solo endpoint
   * en vez de cinco casi-iguales.
   *
   * Los filtros son un DTO cerrado y las columnas salen de un preset: nada de
   * pasar SQL ni nombres de campo desde el cliente.
   */
  async trackingQuery(q: TrackingQuery) {
    const where: Prisma.TrackingEventWhereInput = {};

    if (q.since || q.until) {
      where.createdAt = {};
      if (q.since) where.createdAt.gte = new Date(q.since);
      if (q.until) where.createdAt.lt = new Date(q.until);
    }
    if (q.guestId) where.guestId = q.guestId;
    if (q.userIdNotNull) where.userId = { not: null };
    if (q.types?.length) where.type = { in: q.types };
    if (q.excludeTypes?.length) where.type = { notIn: q.excludeTypes };
    // .in() sobre session_id no matchea NULL: si además de sesiones con id se
    // pide la "sin sesión", hay que pedir las dos cosas con un OR explícito.
    if (q.sessionIds?.length && q.sessionNull) {
      where.OR = [{ sessionId: { in: q.sessionIds } }, { sessionId: null as never }];
    } else if (q.sessionIds?.length) {
      where.sessionId = { in: q.sessionIds };
    } else if (q.sessionNull) {
      where.sessionId = null as never;
    }

    const fields = q.fields ?? 'full';
    const select: Prisma.TrackingEventSelect =
      fields === 'index'
        ? { type: true, createdAt: true, sessionId: true }
        : fields === 'first'
          ? { createdAt: true, context: true, properties: true }
          : {
              id: true, createdAt: true, type: true, sessionId: true,
              guestId: true, userId: true, properties: true, context: true,
            };

    const rows = await this.prisma.trackingEvent.findMany({
      where,
      select,
      orderBy: { createdAt: q.order === 'asc' ? 'asc' : 'desc' },
      take: Math.min(Math.max(q.limit ?? 1000, 1), MAX_LIMIT),
      skip: Math.max(q.offset ?? 0, 0),
    });

    // snake_case, como lo devolvía Supabase: el panel ya está tipado así.
    return rows.map((r) => {
      const o: Record<string, unknown> = {};
      if ('id' in r) o.id = r.id;
      if ('createdAt' in r) o.created_at = iso(r.createdAt as Date);
      if ('type' in r) o.type = r.type;
      if ('sessionId' in r) o.session_id = r.sessionId;
      if ('guestId' in r) o.guest_id = r.guestId;
      if ('userId' in r) o.user_id = r.userId;
      if ('properties' in r) o.properties = r.properties;
      if ('context' in r) o.context = r.context;
      return o;
    });
  }

  async trackingCount(since?: string, until?: string): Promise<number> {
    const where: Prisma.TrackingEventWhereInput = {};
    if (since || until) {
      where.createdAt = {};
      if (since) where.createdAt.gte = new Date(since);
      if (until) where.createdAt.lt = new Date(until);
    }
    return this.prisma.trackingEvent.count({ where });
  }

  /** created_at del evento más viejo anterior a `before`. Ancla el rollup. */
  async trackingOldest(before?: string): Promise<string | null> {
    const row = await this.prisma.trackingEvent.findFirst({
      where: before ? { createdAt: { lt: new Date(before) } } : {},
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    });
    return iso(row?.createdAt);
  }

  /** DESTRUCTIVO: borra los eventos crudos de una ventana ya congelada. */
  async purgeTracking(since: string, until: string): Promise<number> {
    const r = await this.prisma.trackingEvent.deleteMany({
      where: { createdAt: { gte: new Date(since), lt: new Date(until) } },
    });
    return r.count;
  }

  // ── Recorridos congelados (user_journeys) ───────────────────────────────────

  /** Solo guest_id + timeline: lo que necesita el agrupado de problemas. */
  async journeys() {
    const rows = await this.prisma.userJourney.findMany({
      select: { guestId: true, timeline: true },
    });
    return rows.map((j) => ({ guest_id: j.guestId, timeline: j.timeline }));
  }

  async journey(guestId: string) {
    const j = await this.prisma.userJourney.findUnique({
      where: { guestId },
      select: { timeline: true, lastAt: true },
    });
    return j ? { timeline: j.timeline, last_at: iso(j.lastAt) } : null;
  }

  async upsertJourney(row: UpsertJourneyBody) {
    const data = {
      timeline: (row.timeline ?? []) as never,
      firstTouch: (row.first_touch ?? null) as never,
      sessions: row.sessions ?? 0,
      total: row.total ?? 0,
      firstAt: row.first_at ? new Date(row.first_at) : null,
      lastAt: row.last_at ? new Date(row.last_at) : null,
      frozenAt: row.frozen_at ? new Date(row.frozen_at) : new Date(),
    };
    await this.prisma.userJourney.upsert({
      where: { guestId: row.guest_id },
      create: { guestId: row.guest_id, ...data },
      update: data,
    });
    return { ok: true };
  }

  /**
   * Los guest_id que dejaron datos en alguna tabla de contactos. De ellos sí se
   * guarda el recorrido completo; del resto solo el agregado.
   */
  async contactGuestIds(): Promise<string[]> {
    const [leads, founders, orders, subs] = await Promise.all([
      this.prisma.leads.findMany({
        where: { guest_id: { not: null } }, select: { guest_id: true },
      }),
      this.prisma.founders.findMany({
        where: { guest_id: { not: null } }, select: { guest_id: true },
      }),
      this.prisma.productOrder.findMany({
        where: { guestId: { not: null } }, select: { guestId: true },
      }),
      this.prisma.contact_submissions.findMany({
        where: { guest_id: { not: null } }, select: { guest_id: true },
      }),
    ]);
    const set = new Set<string>();
    for (const r of leads) if (r.guest_id) set.add(r.guest_id);
    for (const r of founders) if (r.guest_id) set.add(r.guest_id);
    for (const r of orders) if (r.guestId) set.add(r.guestId);
    for (const r of subs) if (r.guest_id) set.add(r.guest_id);
    return [...set];
  }

  // ── Métricas congeladas y snapshots ─────────────────────────────────────────

  async metricsDaily() {
    const rows = await this.prisma.metricsDaily.findMany({
      select: { day: true, frozen: true, eventsCount: true },
    });
    return rows.map((r) => ({
      day: dayKey(r.day),
      frozen: r.frozen,
      events_count: r.eventsCount,
    }));
  }

  async upsertMetricsDaily(row: UpsertMetricsDailyBody) {
    // @db.Date anclada a UTC: con el huso local la clave se corre un día.
    const day = new Date(`${row.day.slice(0, 10)}T00:00:00Z`);
    const data = {
      payload: row.payload as never,
      guestIds: (row.guest_ids ?? []) as never,
      eventsCount: row.events_count ?? 0,
      frozen: row.frozen ?? false,
      computedAt: row.computed_at ? new Date(row.computed_at) : new Date(),
    };
    await this.prisma.metricsDaily.upsert({
      where: { day },
      create: { day, ...data },
      update: data,
    });
    return { ok: true };
  }

  async metricsDailyOne(day: string) {
    const r = await this.prisma.metricsDaily.findUnique({
      where: { day: new Date(`${day.slice(0, 10)}T00:00:00Z`) },
      select: { frozen: true, eventsCount: true },
    });
    return r ? { frozen: r.frozen, events_count: r.eventsCount } : null;
  }

  async metricsSnapshot(rangeKey: string) {
    const s = await this.prisma.metricsSnapshot.findUnique({ where: { rangeKey } });
    if (!s) return null;
    return {
      payload: s.payload,
      computed_at: iso(s.computedAt),
      events_in_range: s.eventsInRange,
      events_all_time: s.eventsAllTime,
    };
  }

  async upsertMetricsSnapshot(row: UpsertMetricsSnapshotBody) {
    const data = {
      payload: row.payload as never,
      computedAt: row.computed_at ? new Date(row.computed_at) : new Date(),
      eventsInRange: row.events_in_range ?? 0,
      eventsAllTime: row.events_all_time ?? 0,
    };
    await this.prisma.metricsSnapshot.upsert({
      where: { rangeKey: row.range_key },
      create: { rangeKey: row.range_key, ...data },
      update: data,
    });
    return { ok: true };
  }

  // ── Triage de problemas ─────────────────────────────────────────────────────

  async issueTriage() {
    const rows = await this.prisma.issueTriage.findMany({
      select: { issueKey: true, status: true, note: true, updatedAt: true },
    });
    return rows.map((t) => ({
      issue_key: t.issueKey,
      status: t.status,
      note: t.note,
      updated_at: iso(t.updatedAt),
    }));
  }

  /**
   * kind/detail se guardan (aunque se puedan derivar de la clave) para que la
   * fila se lea sola en la base y para que un problema marcado siga teniendo
   * sentido cuando su evento crudo ya se purgó.
   */
  async upsertIssueTriage(row: UpsertIssueTriageBody) {
    const data = {
      kind: row.kind,
      detail: row.detail,
      status: row.status ?? 'pendiente',
      note: row.note?.trim() ? row.note.trim() : null,
      updatedAt: new Date(),
    };
    await this.prisma.issueTriage.upsert({
      where: { issueKey: row.key },
      create: { issueKey: row.key, ...data },
      update: data,
    });
    return { ok: true };
  }

  // ── Funciones de la base (RPC) ──────────────────────────────────────────────
  //
  // Estas tres viven en la BD como funciones SQL. Con supabase-js se llamaban con
  // .rpc(); acá con $queryRaw parametrizado.
  //
  // OJO con los bigint: Postgres devuelve `count(*)` como bigint y el driver lo
  // trae como BigInt de JS, que JSON.stringify NO sabe serializar (tira
  // "Do not know how to serialize a BigInt"). Hay que pasarlos a Number.

  async visitors(filtro: string, limit: number, offset: number, incluirBots: boolean) {
    const rows = await this.prisma.$queryRaw<Array<Record<string, unknown>>>`
      SELECT * FROM admin_visitors(${filtro}::text, ${limit}::int, ${offset}::int, ${incluirBots}::boolean)
    `;
    return rows.map((r) => ({
      ...r,
      eventos: Number(r.eventos ?? 0),
      sesiones: Number(r.sesiones ?? 0),
      frustracion: Number(r.frustracion ?? 0),
      primero: r.primero instanceof Date ? r.primero.toISOString() : r.primero,
      ultimo: r.ultimo instanceof Date ? r.ultimo.toISOString() : r.ultimo,
    }));
  }

  async pageFlow(min: number) {
    const rows = await this.prisma.$queryRaw<
      Array<{ from_page: string; to_page: string; peso: bigint }>
    >`SELECT * FROM admin_page_flow(${min}::int)`;
    return rows.map((r) => ({
      from_page: r.from_page,
      to_page: r.to_page,
      peso: Number(r.peso),
    }));
  }

  /** Tamaño de la base y peso por tabla — lo muestra /admin/sistema. */
  async dbStats() {
    const rows = await this.prisma.$queryRaw<Array<{ admin_db_stats: unknown }>>`
      SELECT admin_db_stats() AS admin_db_stats
    `;
    return rows[0]?.admin_db_stats ?? null;
  }

  async normsCount(): Promise<number> {
    return this.prisma.norms.count();
  }

  // ── Healthcheck del panel /admin/sistema ────────────────────────────────────

  async ultimoSystemHealth() {
    const row = await this.prisma.systemHealth.findFirst({
      orderBy: { checkedAt: 'desc' },
      select: { checkedAt: true, payload: true },
    });
    return row ? { checked_at: iso(row.checkedAt), payload: row.payload } : null;
  }

  async guardarSystemHealth(payload: unknown) {
    const row = await this.prisma.systemHealth.create({
      data: { payload: payload as never },
      select: { checkedAt: true },
    });
    return { checked_at: iso(row.checkedAt) };
  }

  // ── Mensajes de contacto (los consume el cálculo de métricas) ───────────────

  async contactSubmissions() {
    const rows = await this.prisma.contact_submissions.findMany({
      select: {
        id: true, created_at: true, nombre: true, email: true,
        tipo: true, mensaje: true, is_read: true,
      },
      orderBy: { created_at: 'desc' },
    });
    return rows.map((m) => ({ ...m, created_at: iso(m.created_at) }));
  }

  async borrarContactSubmissions(ids: string[]) {
    if (!ids.length) return { ok: true, borrados: 0 };
    const r = await this.prisma.contact_submissions.deleteMany({ where: { id: { in: ids } } });
    return { ok: true, borrados: r.count };
  }
}
