import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PerformanceObserver, monitorEventLoopDelay } from 'perf_hooks';
import { readFileSync } from 'fs';
import type { Agg, Caller, Minuto, RawRequest, Sample, Snapshot } from './monitor.types';
import { analizar } from './monitor.analyzer';

/**
 * Núcleo de medición. Todo vive en memoria y a propósito:
 *
 * El recurso escaso acá es la RAM (256 MB de límite y un OOM en el historial), así
 * que el monitor NO puede escribir a la base en el camino caliente ni acumular sin
 * techo. El interceptor solo hace sumas sobre estructuras ya reservadas; nada de
 * I/O, nada de await. Los topes de abajo son el contrato: pase lo que pase, el
 * monitor no crece más que eso.
 */
@Injectable()
export class MonitorService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MonitorService.name);

  // ── Topes duros ────────────────────────────────────────────────────────────
  /** Peticiones crudas para el explorador. ~200 B c/u → ~100 KB. */
  private static readonly MAX_CRUDAS = 500;
  /** Minutos de historia. 120 = 2 h, suficiente para ver un pico y su línea base. */
  private static readonly MAX_MINUTOS = 120;
  /** Muestras de proceso: 720 × 5 s = 1 h. */
  private static readonly MAX_MUESTRAS = 720;
  /** Duraciones guardadas por (ruta, caller) y minuto, para percentiles. */
  private static readonly MAX_MUESTRA_MS = 100;
  /** Techo de claves distintas por minuto: freno si alguna ruta se escapa del template. */
  private static readonly MAX_CLAVES = 400;

  readonly activo = process.env.MONITOR_ENABLED !== 'false';
  readonly desde = Date.now();

  private readonly crudas: RawRequest[] = [];
  /** minuto (ts truncado) → clave "ruta|caller" → agregado. */
  private readonly porMinuto = new Map<number, Map<string, Agg>>();
  private readonly muestras: Sample[] = [];
  private readonly bots = new Map<string, { req: number; bytesOut: number }>();

  private lag = monitorEventLoopDelay({ resolution: 10 });
  private gcAcum = 0;
  private gcObs?: PerformanceObserver;
  private cpuPrev = process.cpuUsage();
  private tsPrev = Date.now();
  private timer?: NodeJS.Timeout;
  private readonly limiteMemoria = leerLimiteMemoria();

  onModuleInit(): void {
    if (!this.activo) {
      this.logger.log('Monitor DESACTIVADO (MONITOR_ENABLED=false)');
      return;
    }
    this.lag.enable();

    // Las pausas de GC no se ven en el CPU% pero sí congelan el proceso.
    try {
      this.gcObs = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) this.gcAcum += e.duration;
      });
      this.gcObs.observe({ entryTypes: ['gc'] });
    } catch {
      // Si el runtime no expone entradas de GC, seguimos sin ese dato.
    }

    this.timer = setInterval(() => this.muestrear(), 5000);
    // unref: un timer del monitor no puede ser la razón por la que el proceso no cierra.
    this.timer.unref();
    this.logger.log(
      `Monitor activo — límite de memoria del contenedor: ${
        this.limiteMemoria ? `${Math.round(this.limiteMemoria / 1048576)} MB` : 'sin límite'
      }`,
    );
  }

  onModuleDestroy(): void {
    if (this.timer) clearInterval(this.timer);
    this.gcObs?.disconnect();
    try {
      this.lag.disable();
    } catch {
      /* ya deshabilitado */
    }
  }

  // ── Camino caliente ────────────────────────────────────────────────────────

  registrar(r: RawRequest): void {
    if (!this.activo) return;

    this.crudas.push(r);
    if (this.crudas.length > MonitorService.MAX_CRUDAS) this.crudas.shift();

    const minuto = Math.floor(r.ts / 60000) * 60000;
    let bucket = this.porMinuto.get(minuto);
    if (!bucket) {
      bucket = new Map();
      this.porMinuto.set(minuto, bucket);
      // Purga por antigüedad, no por tamaño: los minutos son monótonos.
      if (this.porMinuto.size > MonitorService.MAX_MINUTOS) {
        const masViejo = Math.min(...this.porMinuto.keys());
        this.porMinuto.delete(masViejo);
      }
    }

    const clave = `${r.route}|${r.caller}`;
    let agg = bucket.get(clave);
    if (!agg) {
      // Si una ruta se escapó del template, esto evita que el minuto crezca sin fin.
      if (bucket.size >= MonitorService.MAX_CLAVES) return;
      agg = {
        route: r.route, caller: r.caller, count: 0, bytesIn: 0, bytesOut: 0,
        msSum: 0, msMax: 0, muestra: [], ok: 0, err4xx: 0, err5xx: 0,
      };
      bucket.set(clave, agg);
    }

    agg.count++;
    agg.bytesIn += r.bytesIn;
    agg.bytesOut += r.bytesOut;
    agg.msSum += r.ms;
    if (r.ms > agg.msMax) agg.msMax = r.ms;
    if (agg.muestra.length < MonitorService.MAX_MUESTRA_MS) agg.muestra.push(r.ms);
    if (r.status >= 500) agg.err5xx++;
    else if (r.status >= 400) agg.err4xx++;
    else agg.ok++;

    if (r.caller === 'bot' && r.bot) {
      const b = this.bots.get(r.bot) ?? { req: 0, bytesOut: 0 };
      b.req++;
      b.bytesOut += r.bytesOut;
      this.bots.set(r.bot, b);
    }
  }

  // ── Muestreo del proceso ───────────────────────────────────────────────────

  private muestrear(): void {
    const ahora = Date.now();
    const mem = process.memoryUsage();

    const cpuDelta = process.cpuUsage(this.cpuPrev);
    this.cpuPrev = process.cpuUsage();
    const msTranscurridos = ahora - this.tsPrev || 1;
    this.tsPrev = ahora;
    // (user+system) viene en microsegundos; sobre el tiempo real da % de un core.
    const cpu = ((cpuDelta.user + cpuDelta.system) / 1000 / msTranscurridos) * 100;

    const lagP50 = this.lag.percentile(50) / 1e6;
    const lagP99 = this.lag.percentile(99) / 1e6;
    this.lag.reset();

    const gcMs = this.gcAcum;
    this.gcAcum = 0;

    this.muestras.push({
      ts: ahora,
      rss: mem.rss,
      heapUsed: mem.heapUsed,
      heapTotal: mem.heapTotal,
      external: mem.external,
      cpu: Math.round(cpu * 10) / 10,
      lagP50: Math.round(lagP50 * 100) / 100,
      lagP99: Math.round(lagP99 * 100) / 100,
      gcMs: Math.round(gcMs * 10) / 10,
      // @ts-expect-error _getActiveHandles no está tipado pero existe en Node.
      handles: typeof process._getActiveHandles === 'function' ? process._getActiveHandles().length : 0,
    });
    if (this.muestras.length > MonitorService.MAX_MUESTRAS) this.muestras.shift();
  }

  // ── Lectura ────────────────────────────────────────────────────────────────

  snapshot(): Snapshot {
    const ahora = Date.now();
    const minutos: Minuto[] = [];
    const totalPorClave = new Map<string, Agg>();
    const porCaller: Record<Caller, { req: number; bytesOut: number }> = {
      ssr: { req: 0, bytesOut: 0 }, browser: { req: 0, bytesOut: 0 }, bot: { req: 0, bytesOut: 0 },
      admin: { req: 0, bytesOut: 0 }, monitor: { req: 0, bytesOut: 0 },
    };
    const todasMs: number[] = [];

    for (const ts of [...this.porMinuto.keys()].sort((a, b) => a - b)) {
      const bucket = this.porMinuto.get(ts)!;
      const m: Minuto = {
        ts, req: 0, bytesIn: 0, bytesOut: 0, err4xx: 0, err5xx: 0, msP95: 0,
        porCaller: { ssr: 0, browser: 0, bot: 0, admin: 0, monitor: 0 },
      };
      const msDelMinuto: number[] = [];

      for (const [clave, a] of bucket) {
        m.req += a.count;
        m.bytesIn += a.bytesIn;
        m.bytesOut += a.bytesOut;
        m.err4xx += a.err4xx;
        m.err5xx += a.err5xx;
        m.porCaller[a.caller] += a.count;
        msDelMinuto.push(...a.muestra);
        todasMs.push(...a.muestra);
        porCaller[a.caller].req += a.count;
        porCaller[a.caller].bytesOut += a.bytesOut;

        const t = totalPorClave.get(clave);
        if (!t) {
          totalPorClave.set(clave, { ...a, muestra: [...a.muestra] });
        } else {
          t.count += a.count; t.bytesIn += a.bytesIn; t.bytesOut += a.bytesOut;
          t.msSum += a.msSum; t.ok += a.ok; t.err4xx += a.err4xx; t.err5xx += a.err5xx;
          if (a.msMax > t.msMax) t.msMax = a.msMax;
          if (t.muestra.length < MonitorService.MAX_MUESTRA_MS) t.muestra.push(...a.muestra);
        }
      }
      m.msP95 = percentil(msDelMinuto, 95);
      minutos.push(m);
    }

    const endpoints = [...totalPorClave.values()]
      .map(({ muestra, ...a }) => ({
        ...a,
        msP50: percentil(muestra, 50),
        msP95: percentil(muestra, 95),
        bytesMedios: a.count ? Math.round(a.bytesOut / a.count) : 0,
      }))
      .sort((a, b) => b.bytesOut - a.bytesOut);

    const totales = {
      req: endpoints.reduce((s, e) => s + e.count, 0),
      bytesIn: endpoints.reduce((s, e) => s + e.bytesIn, 0),
      bytesOut: endpoints.reduce((s, e) => s + e.bytesOut, 0),
      err4xx: endpoints.reduce((s, e) => s + e.err4xx, 0),
      err5xx: endpoints.reduce((s, e) => s + e.err5xx, 0),
      msP50: percentil(todasMs, 50),
      msP95: percentil(todasMs, 95),
      msP99: percentil(todasMs, 99),
    };

    const { picos, hallazgos } = analizar({
      minutos, endpoints, muestras: this.muestras, totales, porCaller,
      limiteMemoria: this.limiteMemoria,
    });

    return {
      activo: this.activo,
      desde: this.desde,
      ahora,
      uptimeMs: ahora - this.desde,
      limiteMemoriaBytes: this.limiteMemoria,
      totales,
      porCaller,
      minutos,
      muestras: this.muestras,
      endpoints,
      bots: [...this.bots.entries()]
        .map(([bot, v]) => ({ bot, ...v }))
        .sort((a, b) => b.req - a.req),
      ultimas: [...this.crudas].reverse(),
      picos,
      hallazgos,
      costo: {
        requestsEnBuffer: this.crudas.length,
        minutosEnMemoria: this.porMinuto.size,
        bytesAprox:
          this.crudas.length * 200 +
          [...this.porMinuto.values()].reduce((s, b) => s + b.size * 300, 0) +
          this.muestras.length * 120,
      },
    };
  }

  reiniciar(): void {
    this.crudas.length = 0;
    this.porMinuto.clear();
    this.muestras.length = 0;
    this.bots.clear();
  }
}

/** Percentil sobre una muestra chica. Copia y ordena: los arrays acá son ≤100. */
export function percentil(valores: number[], p: number): number {
  if (!valores.length) return 0;
  const orden = [...valores].sort((a, b) => a - b);
  const i = Math.min(orden.length - 1, Math.max(0, Math.ceil((p / 100) * orden.length) - 1));
  return Math.round(orden[i] * 100) / 100;
}

/**
 * Límite de memoria del contenedor, leído del cgroup. Sin esto el panel muestra
 * "usa 240 MB" sin decir sobre cuánto — que es justo el dato que importa cuando
 * el proceso ya murió una vez por OOM.
 */
function leerLimiteMemoria(): number | null {
  const rutas = ['/sys/fs/cgroup/memory.max', '/sys/fs/cgroup/memory/memory.limit_in_bytes'];
  for (const ruta of rutas) {
    try {
      const txt = readFileSync(ruta, 'utf8').trim();
      if (txt === 'max') return null;
      const n = Number(txt);
      // Sin límite, cgroup reporta un número absurdo (2^63-ish). Lo tratamos como null.
      if (Number.isFinite(n) && n > 0 && n < 1024 ** 4) return n;
    } catch {
      /* probar la siguiente */
    }
  }
  return null;
}
