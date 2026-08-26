import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { iso } from './shared';

/**
 * Prospección comercial: la tabla de gente a la que SALIMOS a buscar.
 *
 * Es la contraparte de `leads` (quien ENTRÓ solo por un formulario). Un
 * prospecto es una fila con datos de contacto profesional, una etapa del
 * pipeline y una próxima acción. Cada toque queda en `prospecto_eventos`,
 * porque a la tercera semana nadie se acuerda qué le dijo a quién.
 *
 * Base legal (ley 25.326): los datos salen de fuentes de acceso público
 * (art. 5 inc. 2) y se usan para marketing directo (art. 27). Por eso cada
 * fila registra `origen_dato` y, si la persona pide que no la contactemos,
 * `opt_out` la saca de todas las listas SIN borrarla: borrarla sería perder la
 * prueba de que pidió el retiro y volver a cargarla al mes siguiente.
 */

export const ETAPAS = [
  'nuevo',
  'por_contactar',
  'contactado',
  'respondio',
  'reunion',
  'prueba',
  'cliente',
  'descartado',
  'no_contactar',
] as const;
export type Etapa = (typeof ETAPAS)[number];

export const TIPOS = [
  'abogado', 'estudio', 'empresa', 'contador', 'escribano',
  'universidad', 'sindicato', 'estado', 'medio', 'otro',
] as const;

/** Toques que cuentan como "contacté a esta persona". */
const TIPOS_CONTACTO = new Set(['email', 'linkedin', 'whatsapp', 'llamada', 'reunion']);

const MAX_TEXTO = 4000;
const MAX_CORTO = 300;
const MAX_IMPORT = 2000;

export interface ProspectoRow {
  id: string;
  nombre: string;
  organizacion: string | null;
  tipo: string;
  segmento: string | null;
  email: string | null;
  telefono: string | null;
  linkedin: string | null;
  web: string | null;
  ciudad: string | null;
  provincia: string | null;
  fuente: string;
  origen_dato: string | null;
  etapa: string;
  prioridad: number;
  canal: string | null;
  proximo_paso: string | null;
  proximo_at: string | null;
  ultimo_contacto_at: string | null;
  toques: number;
  notas: string | null;
  opt_out: boolean;
  opt_out_at: string | null;
  lead_id: string | null;
  user_id: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ProspectoEventoRow {
  id: string;
  prospecto_id: string;
  tipo: string;
  detalle: string | null;
  created_at: string | null;
}

/** Campos editables desde el panel (snake_case, como todo admin-data). */
export interface ProspectoInput {
  nombre?: string;
  organizacion?: string | null;
  tipo?: string;
  segmento?: string | null;
  email?: string | null;
  telefono?: string | null;
  linkedin?: string | null;
  web?: string | null;
  ciudad?: string | null;
  provincia?: string | null;
  fuente?: string;
  origen_dato?: string | null;
  etapa?: string;
  prioridad?: number;
  canal?: string | null;
  proximo_paso?: string | null;
  proximo_at?: string | null;
  notas?: string | null;
  opt_out?: boolean;
}

export interface ImportResult {
  creados: number;
  actualizados: number;
  omitidos: number;
  errores: string[];
}

/** Input ya limpio, en las columnas de Prisma (camelCase) y con valores planos. */
interface Campos {
  nombre?: string;
  organizacion?: string | null;
  tipo?: string;
  segmento?: string | null;
  email?: string | null;
  telefono?: string | null;
  linkedin?: string | null;
  web?: string | null;
  ciudad?: string | null;
  provincia?: string | null;
  fuente?: string;
  origenDato?: string | null;
  etapa?: string;
  prioridad?: number;
  canal?: string | null;
  proximoPaso?: string | null;
  proximoAt?: Date | null;
  notas?: string | null;
  optOut?: boolean;
  optOutAt?: Date | null;
}

@Injectable()
export class ProspectosService {
  constructor(private readonly prisma: PrismaService) {}

  /** Toda la tabla: son cientos, no miles. Filtrar se hace en el cliente. */
  async listar(): Promise<ProspectoRow[]> {
    const rows = await this.prisma.prospecto.findMany({
      orderBy: [{ proximoAt: { sort: 'asc', nulls: 'last' } }, { createdAt: 'desc' }],
    });
    const emails = rows.map((r) => r.email).filter((e): e is string => !!e);
    // Cruce con leads/users por email, en el borde: muestra "ya dejó datos" /
    // "ya tiene cuenta" sin mantener punteros a mano.
    const [leads, users] = emails.length
      ? await Promise.all([
          this.prisma.leads.findMany({ where: { email: { in: emails } }, select: { id: true, email: true } }),
          this.prisma.user.findMany({ where: { email: { in: emails } }, select: { id: true, email: true } }),
        ])
      : [[], []];
    const leadByEmail = new Map(leads.map((l) => [l.email!.toLowerCase(), l.id]));
    const userByEmail = new Map(users.map((u) => [u.email.toLowerCase(), u.id]));
    return rows.map((r) => {
      const key = r.email?.toLowerCase() ?? '';
      return this.fila({
        ...r,
        leadId: r.leadId ?? leadByEmail.get(key) ?? null,
        userId: r.userId ?? userByEmail.get(key) ?? null,
      });
    });
  }

  async crear(input: ProspectoInput): Promise<ProspectoRow | { error: string }> {
    const data = this.normalizar(input, true);
    if ('error' in data) return data;
    try {
      const row = await this.prisma.prospecto.create({ data: data as Prisma.ProspectoUncheckedCreateInput });
      await this.prisma.prospectoEvento.create({
        data: { prospectoId: row.id, tipo: 'sistema', detalle: `Alta (${row.fuente})` },
      });
      return this.fila(row);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        return { error: 'email_duplicado' };
      }
      throw e;
    }
  }

  async actualizar(id: string, input: ProspectoInput): Promise<ProspectoRow | { error: string }> {
    const antes = await this.prisma.prospecto.findUnique({ where: { id } });
    if (!antes) return { error: 'no_existe' };
    const data = this.normalizar(input, false);
    if ('error' in data) return data;
    if (Object.keys(data).length === 0) return { error: 'sin_cambios' };

    // El retiro (opt-out) se registra con fecha y saca de la lista: etapa
    // no_contactar. Es la obligación del art. 27 inc. 3, no una preferencia.
    if (data.optOut === true && !antes.optOut) {
      data.optOutAt = new Date();
      data.etapa = 'no_contactar';
      data.proximoAt = null;
      data.proximoPaso = null;
    }
    if (data.optOut === false && antes.optOut) data.optOutAt = null;

    try {
      const row = await this.prisma.prospecto.update({ where: { id }, data });
      if (data.etapa && data.etapa !== antes.etapa) {
        await this.prisma.prospectoEvento.create({
          data: { prospectoId: id, tipo: 'etapa', detalle: `${antes.etapa} → ${data.etapa}` },
        });
      }
      return this.fila(row);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        return { error: 'email_duplicado' };
      }
      throw e;
    }
  }

  async borrar(id: string): Promise<{ ok: boolean }> {
    await this.prisma.prospecto.deleteMany({ where: { id } });
    return { ok: true };
  }

  async eventos(id: string): Promise<ProspectoEventoRow[]> {
    const rows = await this.prisma.prospectoEvento.findMany({
      where: { prospectoId: id },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return rows.map((e) => ({
      id: e.id,
      prospecto_id: e.prospectoId,
      tipo: e.tipo,
      detalle: e.detalle,
      created_at: iso(e.createdAt),
    }));
  }

  /**
   * Registrar un toque. Si es un contacto real (email, LinkedIn, llamada…)
   * suma al contador, mueve `ultimo_contacto_at` y, si el prospecto estaba
   * "nuevo"/"por contactar", lo pasa a "contactado" solo. Opcionalmente deja
   * programada la próxima acción.
   */
  async agregarEvento(
    id: string,
    body: { tipo?: string; detalle?: string; proximo_paso?: string | null; proximo_at?: string | null; etapa?: string },
  ): Promise<{ evento: ProspectoEventoRow; prospecto: ProspectoRow } | { error: string }> {
    const p = await this.prisma.prospecto.findUnique({ where: { id } });
    if (!p) return { error: 'no_existe' };
    const tipo = (body.tipo ?? 'nota').trim().slice(0, 40) || 'nota';
    const detalle = this.texto(body.detalle, MAX_TEXTO);

    const data: Prisma.ProspectoUpdateInput = {};
    if (TIPOS_CONTACTO.has(tipo)) {
      data.toques = { increment: 1 };
      data.ultimoContactoAt = new Date();
      if (p.etapa === 'nuevo' || p.etapa === 'por_contactar') data.etapa = 'contactado';
    }
    if (body.etapa && (ETAPAS as readonly string[]).includes(body.etapa)) data.etapa = body.etapa;
    if (body.proximo_paso !== undefined) data.proximoPaso = this.texto(body.proximo_paso, MAX_CORTO);
    if (body.proximo_at !== undefined) data.proximoAt = this.fecha(body.proximo_at);

    const [evento, prospecto] = await this.prisma.$transaction([
      this.prisma.prospectoEvento.create({ data: { prospectoId: id, tipo, detalle } }),
      this.prisma.prospecto.update({ where: { id }, data }),
    ]);
    if (data.etapa && data.etapa !== p.etapa) {
      await this.prisma.prospectoEvento.create({
        data: { prospectoId: id, tipo: 'etapa', detalle: `${p.etapa} → ${String(data.etapa)}` },
      });
    }
    return {
      evento: {
        id: evento.id, prospecto_id: id, tipo: evento.tipo, detalle: evento.detalle,
        created_at: iso(evento.createdAt),
      },
      prospecto: this.fila(prospecto),
    };
  }

  /**
   * Importación masiva (CSV ya parseado en el front). Deduplica por email y,
   * a falta de email, por LinkedIn o por nombre+ciudad. Las filas que ya
   * existen se ENRIQUECEN (solo campos vacíos), nunca se pisan: lo que se
   * anotó a mano vale más que lo que trae un scraper.
   */
  async importar(filas: ProspectoInput[], fuente: string): Promise<ImportResult> {
    const out: ImportResult = { creados: 0, actualizados: 0, omitidos: 0, errores: [] };
    if (!Array.isArray(filas)) return { ...out, errores: ['formato_invalido'] };
    const lote = filas.slice(0, MAX_IMPORT);
    if (filas.length > MAX_IMPORT) out.errores.push(`solo se importan las primeras ${MAX_IMPORT} filas`);
    const fuenteOk = (fuente || 'csv').trim().slice(0, 40) || 'csv';

    for (let i = 0; i < lote.length; i++) {
      const data = this.normalizar({ ...lote[i], fuente: lote[i].fuente ?? fuenteOk }, true);
      if ('error' in data) {
        out.omitidos++;
        if (out.errores.length < 20) out.errores.push(`fila ${i + 1}: ${data.error}`);
        continue;
      }
      const existente = await this.buscarDuplicado(data);
      if (!existente) {
        const row = await this.prisma.prospecto.create({ data: data as Prisma.ProspectoUncheckedCreateInput });
        await this.prisma.prospectoEvento.create({
          data: { prospectoId: row.id, tipo: 'sistema', detalle: `Importado (${data.fuente ?? fuenteOk})` },
        });
        out.creados++;
        continue;
      }
      const relleno: Prisma.ProspectoUpdateInput = {};
      for (const k of ['organizacion', 'segmento', 'email', 'telefono', 'linkedin', 'web', 'ciudad', 'provincia', 'origenDato'] as const) {
        const v = data[k];
        if (v && !existente[k]) relleno[k] = v;
      }
      if (Object.keys(relleno).length) {
        await this.prisma.prospecto.update({ where: { id: existente.id }, data: relleno });
        out.actualizados++;
      } else {
        out.omitidos++;
      }
    }
    return out;
  }

  private async buscarDuplicado(d: Campos) {
    if (d.email) {
      const r = await this.prisma.prospecto.findFirst({ where: { email: d.email } });
      if (r) return r;
    }
    if (d.linkedin) {
      const r = await this.prisma.prospecto.findFirst({ where: { linkedin: d.linkedin } });
      if (r) return r;
    }
    if (d.nombre && d.ciudad) {
      return this.prisma.prospecto.findFirst({
        where: { nombre: { equals: d.nombre, mode: 'insensitive' }, ciudad: { equals: d.ciudad, mode: 'insensitive' } },
      });
    }
    return null;
  }

  /**
   * Limpia y valida. `esAlta` exige nombre. Devuelve solo las claves presentes
   * en el input, para que un PATCH parcial no pise el resto.
   */
  private normalizar(input: ProspectoInput, esAlta: boolean): Campos | { error: string } {
    const d: Campos = {};
    if (input.nombre !== undefined || esAlta) {
      const n = this.texto(input.nombre, MAX_CORTO);
      if (!n) return { error: 'nombre_vacio' };
      d.nombre = n;
    }
    const cortos = {
      organizacion: 'organizacion', segmento: 'segmento', telefono: 'telefono', web: 'web',
      ciudad: 'ciudad', provincia: 'provincia', origen_dato: 'origenDato', canal: 'canal',
      proximo_paso: 'proximoPaso',
    } as const;
    for (const [k, col] of Object.entries(cortos) as Array<[keyof typeof cortos, (typeof cortos)[keyof typeof cortos]]>) {
      if (input[k] !== undefined) d[col] = this.texto(input[k], MAX_CORTO);
    }
    if (input.email !== undefined) {
      const e = this.texto(input.email, MAX_CORTO)?.toLowerCase() ?? null;
      if (e && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return { error: 'email_invalido' };
      d.email = e;
    }
    if (input.linkedin !== undefined) {
      let l = this.texto(input.linkedin, MAX_CORTO);
      // Normaliza a la forma canónica para que el dedupe funcione.
      if (l) l = l.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/+$/, '').replace(/\?.*$/, '');
      d.linkedin = l;
    }
    if (input.notas !== undefined) d.notas = this.texto(input.notas, MAX_TEXTO);
    if (input.tipo !== undefined) {
      const t = (input.tipo || 'abogado').trim().toLowerCase();
      d.tipo = (TIPOS as readonly string[]).includes(t) ? t : 'otro';
    }
    if (input.fuente !== undefined) d.fuente = (input.fuente || 'manual').trim().slice(0, 40).toLowerCase() || 'manual';
    if (input.etapa !== undefined) {
      const e = input.etapa.trim().toLowerCase();
      if (!(ETAPAS as readonly string[]).includes(e)) return { error: 'etapa_invalida' };
      d.etapa = e;
    }
    if (input.prioridad !== undefined) {
      const p = Number(input.prioridad);
      d.prioridad = p >= 1 && p <= 3 ? Math.round(p) : 2;
    }
    if (input.proximo_at !== undefined) d.proximoAt = this.fecha(input.proximo_at);
    if (input.opt_out !== undefined) d.optOut = !!input.opt_out;
    return d;
  }

  private texto(v: unknown, max: number): string | null {
    if (v === null || v === undefined) return null;
    const t = String(v).trim().slice(0, max);
    return t || null;
  }

  private fecha(v: unknown): Date | null {
    if (!v) return null;
    const d = new Date(String(v));
    return Number.isNaN(d.getTime()) ? null : d;
  }

  private fila = (p: {
    id: string; nombre: string; organizacion: string | null; tipo: string; segmento: string | null;
    email: string | null; telefono: string | null; linkedin: string | null; web: string | null;
    ciudad: string | null; provincia: string | null; fuente: string; origenDato: string | null;
    etapa: string; prioridad: number; canal: string | null; proximoPaso: string | null;
    proximoAt: Date | null; ultimoContactoAt: Date | null; toques: number; notas: string | null;
    optOut: boolean; optOutAt: Date | null; leadId: string | null; userId: string | null;
    createdAt: Date; updatedAt: Date;
  }): ProspectoRow => ({
    id: p.id,
    nombre: p.nombre,
    organizacion: p.organizacion,
    tipo: p.tipo,
    segmento: p.segmento,
    email: p.email,
    telefono: p.telefono,
    linkedin: p.linkedin,
    web: p.web,
    ciudad: p.ciudad,
    provincia: p.provincia,
    fuente: p.fuente,
    origen_dato: p.origenDato,
    etapa: p.etapa,
    prioridad: p.prioridad,
    canal: p.canal,
    proximo_paso: p.proximoPaso,
    proximo_at: iso(p.proximoAt),
    ultimo_contacto_at: iso(p.ultimoContactoAt),
    toques: p.toques,
    notas: p.notas,
    opt_out: p.optOut,
    opt_out_at: iso(p.optOutAt),
    lead_id: p.leadId,
    user_id: p.userId,
    created_at: iso(p.createdAt),
    updated_at: iso(p.updatedAt),
  });
}
