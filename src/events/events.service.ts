import { Injectable, Logger } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { botName, isBotUa } from '../common/bots';

export class TrackEventDto {
  @IsString() @IsNotEmpty() @MaxLength(100)
  type: string;

  @IsString() @IsNotEmpty() @MaxLength(200)
  sessionId: string;

  @IsOptional() @IsString() @MaxLength(200)
  guestId?: string;

  @IsOptional()
  properties?: Record<string, unknown>;

  @IsOptional()
  context?: Record<string, unknown>;
}

export interface TrackedEvent extends TrackEventDto {
  id:        string;
  timestamp: string;
}

interface GeoData {
  country?: string;
  countryCode?: string;
  region?: string; // provincia / estado
  city?: string;
}

// Rangos privados / loopback: no tiene sentido geolocalizarlos.
const PRIVATE_IP =
  /^(::1|::ffff:127\.|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|fc|fd|fe80)/i;

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  // Geo resuelto server-side por IP (ip-api.com). Cacheado en memoria: una sesión
  // genera muchos eventos con la misma IP → solo el primero paga la llamada.
  // null = IP ya consultada sin resultado (no reintentar en caliente).
  private readonly geoCache = new Map<string, GeoData | null>();
  private static readonly GEO_CACHE_MAX = 5000;

  constructor(private readonly prisma: PrismaService) {}

  private async resolveGeo(ip?: string): Promise<GeoData | null> {
    if (!ip) return null;
    const clean = ip.trim();
    if (!clean || PRIVATE_IP.test(clean)) return null;
    if (this.geoCache.has(clean)) return this.geoCache.get(clean) ?? null;

    let geo: GeoData | null = null;
    try {
      // lang=es → nombres de país/provincia en español ("Estados Unidos", no "United States").
      const url = `http://ip-api.com/json/${encodeURIComponent(clean)}?fields=status,country,countryCode,regionName,city&lang=es`;
      const res = await fetch(url, { signal: AbortSignal.timeout(2500) });
      if (res.ok) {
        const d = (await res.json()) as {
          status?: string; country?: string; countryCode?: string; regionName?: string; city?: string;
        };
        if (d.status === 'success') {
          geo = { country: d.country, countryCode: d.countryCode, region: d.regionName, city: d.city };
        }
      }
    } catch {
      geo = null; // best-effort: el geo nunca debe romper el tracking
    }

    // Acotar el tamaño del caché (FIFO simple).
    if (this.geoCache.size >= EventsService.GEO_CACHE_MAX) {
      const first = this.geoCache.keys().next().value;
      if (first !== undefined) this.geoCache.delete(first);
    }
    this.geoCache.set(clean, geo);
    return geo;
  }

  // Los bots no se guardan crudos: se cuentan agregados por día. Sin esto la tabla
  // crecía a 80% crawlers y el panel de visitantes se colgaba (ver common/bots.ts).
  private async countBot(ua?: string | null): Promise<void> {
    try {
      await this.prisma.$executeRaw`
        INSERT INTO bot_traffic_daily (day, bot, hits)
        VALUES (CURRENT_DATE, ${botName(ua)}, 1)
        ON CONFLICT (day, bot) DO UPDATE SET hits = bot_traffic_daily.hits + 1`;
    } catch (e) {
      this.logger.error(`countBot: ${(e as Error).message}`);
    }
  }

  async track(dto: TrackEventDto, ip?: string, uaHeader?: string): Promise<void> {
    try {
      // El header lo pone el cliente HTTP real; context.ua lo manda el JS y puede
      // faltar. Con que cualquiera de los dos huela a crawler, alcanza.
      const ua = uaHeader || (dto.context?.ua as string | undefined);
      if (isBotUa(ua)) {
        await this.countBot(ua);
        return;
      }

      const geo = await this.resolveGeo(ip);
      const context = {
        ...(dto.context ?? {}),
        ...(geo
          ? {
              country:     geo.country,
              countryCode: geo.countryCode,
              region:      geo.region,
              city:        geo.city,
            }
          : {}),
      };
      await this.prisma.trackingEvent.create({
        data: {
          type:       dto.type,
          sessionId:  dto.sessionId,
          guestId:    dto.guestId    ?? null,
          properties: (dto.properties ?? undefined) as Prisma.InputJsonValue | undefined,
          context:    (Object.keys(context).length ? context : undefined) as Prisma.InputJsonValue | undefined,
        },
      });
    } catch (e) {
      this.logger.error(`track: ${(e as Error).message}`);
    }
  }

  async readAll(since?: string): Promise<TrackedEvent[]> {
    const PAGE = 1000;
    const all: TrackedEvent[] = [];
    let skip = 0;

    while (true) {
      const rows = await this.prisma.trackingEvent.findMany({
        where:   since ? { createdAt: { gte: new Date(since) } } : undefined,
        orderBy: { createdAt: 'asc' },
        skip,
        take: PAGE,
      });

      for (const row of rows) {
        all.push({
          id:         row.id,
          type:       row.type,
          timestamp:  row.createdAt.toISOString(),
          sessionId:  row.sessionId,
          guestId:    row.guestId    ?? undefined,
          properties: (row.properties as Record<string, unknown>) ?? undefined,
          context:    (row.context    as Record<string, unknown>) ?? undefined,
        });
      }

      if (rows.length < PAGE) break;
      skip += PAGE;
    }

    return all;
  }

  async clear(): Promise<void> {
    try {
      await this.prisma.trackingEvent.deleteMany({
        where: { createdAt: { lte: new Date() } },
      });
    } catch (e) {
      this.logger.error(`clear: ${(e as Error).message}`);
    }
  }
}
