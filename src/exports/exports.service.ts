import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

export type ExportType = 'pdf' | 'docx';

export interface ExportCountResult {
  used:      number;
  limit:     number;
  remaining: number;
}

const EXPORT_LIMIT = 10;

function todayUTC(): Date {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

@Injectable()
export class ExportsService {
  private readonly logger = new Logger(ExportsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getCount(guestId: string, type: ExportType): Promise<ExportCountResult> {
    try {
      const used = await this.prisma.exportGeneration.count({
        where: { guestId, type, createdAt: { gte: todayUTC() } },
      });
      return { used, limit: EXPORT_LIMIT, remaining: Math.max(0, EXPORT_LIMIT - used) };
    } catch (e) {
      this.logger.error(`getCount: ${(e as Error).message}`);
      return { used: 0, limit: EXPORT_LIMIT, remaining: EXPORT_LIMIT };
    }
  }

  async record(guestId: string, type: ExportType): Promise<{ ok: boolean; remaining: number }> {
    const current = await this.getCount(guestId, type);
    if (current.remaining <= 0) return { ok: false, remaining: 0 };

    try {
      await this.prisma.exportGeneration.create({ data: { guestId, type } });
      return { ok: true, remaining: current.remaining - 1 };
    } catch (e) {
      this.logger.error(`record: ${(e as Error).message}`);
      return { ok: false, remaining: current.remaining };
    }
  }
}
