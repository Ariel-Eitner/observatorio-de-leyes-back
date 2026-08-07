import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { iso } from './shared';

/**
 * Anotador de pendientes del panel.
 *
 * Es deliberadamente pobre: una tarea es un texto y si está hecha o no. Sirve
 * para no perder lo que se encuentra mientras se revisa el sitio, no para
 * gestionar proyectos.
 */

// Tope generoso pero real: es una nota, no un documento. Evita que un pegado
// accidental de media pantalla termine en la base.
const MAX_TEXTO = 2000;

export interface TareaRow {
  id: string;
  texto: string;
  hecha: boolean;
  created_at: string | null;
  updated_at: string | null;
  hecha_at: string | null;
}

@Injectable()
export class TareasService {
  constructor(private readonly prisma: PrismaService) {}

  /** Pendientes primero, y dentro de cada grupo lo más nuevo arriba. */
  async listar(): Promise<TareaRow[]> {
    const rows = await this.prisma.adminTask.findMany({
      orderBy: [{ hecha: 'asc' }, { createdAt: 'desc' }],
    });
    return rows.map(this.fila);
  }

  async crear(texto: string): Promise<TareaRow | null> {
    const t = this.limpiar(texto);
    if (!t) return null;
    const row = await this.prisma.adminTask.create({ data: { texto: t } });
    return this.fila(row);
  }

  async actualizar(
    id: string,
    cambios: { texto?: string; hecha?: boolean },
  ): Promise<TareaRow | null> {
    const data: { texto?: string; hecha?: boolean; hechaAt?: Date | null } = {};

    if (cambios.texto !== undefined) {
      const t = this.limpiar(cambios.texto);
      if (!t) return null; // una tarea vacía se borra, no se guarda en blanco
      data.texto = t;
    }
    if (cambios.hecha !== undefined) {
      data.hecha = cambios.hecha;
      // hecha_at deja de tener sentido si se reabre: se limpia junto con el flag.
      data.hechaAt = cambios.hecha ? new Date() : null;
    }
    if (Object.keys(data).length === 0) return null;

    const row = await this.prisma.adminTask.update({ where: { id }, data });
    return this.fila(row);
  }

  async borrar(id: string): Promise<{ ok: boolean }> {
    await this.prisma.adminTask.deleteMany({ where: { id } });
    return { ok: true };
  }

  /** Borra de una las que ya están hechas (el botón "limpiar" de la pantalla). */
  async borrarHechas(): Promise<{ ok: boolean; borradas: number }> {
    const r = await this.prisma.adminTask.deleteMany({ where: { hecha: true } });
    return { ok: true, borradas: r.count };
  }

  private limpiar(texto: unknown): string | null {
    if (typeof texto !== 'string') return null;
    const t = texto.trim().slice(0, MAX_TEXTO);
    return t || null;
  }

  private fila = (t: {
    id: string; texto: string; hecha: boolean;
    createdAt: Date; updatedAt: Date; hechaAt: Date | null;
  }): TareaRow => ({
    id: t.id,
    texto: t.texto,
    hecha: t.hecha,
    created_at: iso(t.createdAt),
    updated_at: iso(t.updatedAt),
    hecha_at: iso(t.hechaAt),
  });
}
