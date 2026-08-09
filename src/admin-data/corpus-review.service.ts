import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { iso } from './shared';

/**
 * Checklist de revisión del corpus (la columna extra de /corpus).
 *
 * Por cada norma se guarda qué ítems están bien, cuáles mal, una nota libre y si
 * ya se revisó. Antes vivía en `corpus-review.json`, en el disco del frontend, y
 * por eso el checklist solo existía en el stack local: en Vercel el filesystem es
 * de solo lectura. Acá la anotación queda en la base y se puede revisar el corpus
 * desde producción, entrando con la cuenta de admin.
 *
 * La clave es el `path` público de la norma, la misma que usaba el JSON.
 */

// Tope de la nota libre. Es un apunte al margen, no un informe: evita que un
// pegado accidental de media pantalla termine en la base.
const MAX_NOTA = 4000;

// Vocabulario cerrado. Cualquier otro valor se descarta al guardar, así un bug
// del cliente no puede meter basura en el JSON que después hay que limpiar.
const VEREDICTOS = new Set(['ok', 'mal']);

export type Verdict = 'ok' | 'mal';

export interface NormReview {
  items: Record<string, Verdict>;
  nota: string;
  revisada: boolean;
  ts: string;
}

export type ReviewFile = Record<string, NormReview>;

@Injectable()
export class CorpusReviewService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Todo el checklist de una, como diccionario `path → review`.
   *
   * Se manda entero a propósito: son unas pocas miles de filas chicas y la
   * pantalla necesita los contadores globales ("✓ 412 / 3.106", "18 con
   * problemas") apenas abre. Paginarlo obligaría a un segundo viaje solo para
   * los totales.
   */
  async listar(): Promise<ReviewFile> {
    const rows = await this.prisma.adminCorpusReview.findMany();
    const out: ReviewFile = {};
    for (const r of rows) {
      out[r.path] = {
        items: this.saneaItems(r.items),
        nota: r.nota,
        revisada: r.revisada,
        ts: iso(r.updatedAt) ?? '',
      };
    }
    return out;
  }

  /**
   * Guarda la revisión de UNA norma.
   *
   * Si queda vacía —sin ítems, sin nota y sin marcar como revisada— se borra la
   * fila en lugar de dejarla en blanco. Así "desmarcar todo" vuelve al estado
   * inicial de verdad y la tabla no junta filas neutras.
   */
  async guardar(
    path: string,
    review: Partial<NormReview>,
  ): Promise<{ ok: boolean; total: number }> {
    const p = typeof path === 'string' ? path.trim() : '';
    if (!p) return { ok: false, total: await this.prisma.adminCorpusReview.count() };

    const items = this.saneaItems(review.items);
    const nota = typeof review.nota === 'string' ? review.nota.slice(0, MAX_NOTA) : '';
    const revisada = review.revisada === true;

    const vacia = !revisada && !nota.trim() && Object.keys(items).length === 0;
    if (vacia) {
      await this.prisma.adminCorpusReview.deleteMany({ where: { path: p } });
    } else {
      await this.prisma.adminCorpusReview.upsert({
        where: { path: p },
        create: { path: p, items, nota, revisada },
        update: { items, nota, revisada },
      });
    }

    return { ok: true, total: await this.prisma.adminCorpusReview.count() };
  }

  /**
   * Deja pasar solo `clave: 'ok' | 'mal'`.
   *
   * Vale tanto para lo que llega del cliente como para lo que sale de la base:
   * la columna es `Json`, así que Prisma la tipa como `unknown` y nada garantiza
   * su forma. Filtrar en los dos sentidos evita que un valor viejo o inesperado
   * llegue a la pantalla y rompa el conteo de problemas.
   */
  private saneaItems(raw: unknown): Record<string, Verdict> {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    const out: Record<string, Verdict> = {};
    for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
      if (typeof v === 'string' && VEREDICTOS.has(v)) out[k] = v as Verdict;
    }
    return out;
  }
}
