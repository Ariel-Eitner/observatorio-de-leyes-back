import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

/**
 * Recorridos guiados del mapa legal ("historias").
 *
 * Antes vivían en `tours.ts` del frontend, así que agregar una historia obligaba a un
 * redeploy. Ahora viven en la BD (`tours` + `tour_steps`) y el front las consume desde acá:
 * cargar una historia nueva es un INSERT.
 *
 * Se usa SQL crudo a propósito: estas dos tablas no están en el schema de Prisma y no vale
 * la pena regenerar el cliente por dos tablas de solo lectura.
 */

export interface TourStepDto {
  lawId: string;
  titulo: string;
  say: string;
  via?: string;
  scale?: number;
  durMs?: number;
}

export interface TourDto {
  id: string;
  title: string;
  hook: string;
  steps: TourStepDto[];
  emoji?: string;
  accent?: string;
  cardHook?: string;
  comingSoon?: boolean;
  layout?: 'fuerza' | 'kelsen';
}

interface FilaTour {
  id: string;
  title: string;
  hook: string;
  emoji: string | null;
  accent: string | null;
  card_hook: string | null;
  coming_soon: boolean;
  layout: string | null;
}

interface FilaStep {
  tour_id: string;
  law_id: string;
  titulo: string;
  say: string;
  via: string | null;
  scale: number | null;
  dur_ms: number | null;
}

@Injectable()
export class ToursService {
  private readonly logger = new Logger(ToursService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<TourDto[]> {
    try {
      const tours = await this.prisma.$queryRaw<FilaTour[]>`
        select id, title, hook, emoji, accent, card_hook, coming_soon, layout
        from tours order by ord asc
      `;
      const steps = await this.prisma.$queryRaw<FilaStep[]>`
        select tour_id, law_id, titulo, say, via, scale, dur_ms
        from tour_steps order by tour_id asc, ord asc
      `;

      const porTour = new Map<string, TourStepDto[]>();
      for (const s of steps) {
        const lista = porTour.get(s.tour_id) ?? [];
        lista.push({
          lawId: s.law_id,
          titulo: s.titulo,
          say: s.say,
          ...(s.via !== null ? { via: s.via } : {}),
          ...(s.scale !== null ? { scale: Number(s.scale) } : {}),
          ...(s.dur_ms !== null ? { durMs: Number(s.dur_ms) } : {}),
        });
        porTour.set(s.tour_id, lista);
      }

      return tours.map((t) => ({
        id: t.id,
        title: t.title,
        hook: t.hook,
        steps: porTour.get(t.id) ?? [],
        ...(t.emoji ? { emoji: t.emoji } : {}),
        ...(t.accent ? { accent: t.accent } : {}),
        ...(t.card_hook ? { cardHook: t.card_hook } : {}),
        ...(t.coming_soon ? { comingSoon: true } : {}),
        ...(t.layout ? { layout: t.layout as 'fuerza' | 'kelsen' } : {}),
      }));
    } catch (e) {
      // Si las tablas todavía no existen (entorno sin migrar), devolver vacío es mejor que
      // tumbar la página del mapa: el grafo funciona igual, solo se queda sin historias.
      this.logger.warn(`No se pudieron leer los recorridos: ${(e as Error).message}`);
      return [];
    }
  }
}
