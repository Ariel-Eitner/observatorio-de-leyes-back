import { Injectable, Logger } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';

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

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async track(dto: TrackEventDto): Promise<void> {
    try {
      await this.prisma.trackingEvent.create({
        data: {
          type:       dto.type,
          sessionId:  dto.sessionId,
          guestId:    dto.guestId    ?? null,
          properties: (dto.properties ?? undefined) as Prisma.InputJsonValue | undefined,
          context:    (dto.context    ?? undefined) as Prisma.InputJsonValue | undefined,
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
