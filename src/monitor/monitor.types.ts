/** Quién originó el request. Es la dimensión que más explica los picos. */
export type Caller = 'ssr' | 'browser' | 'bot' | 'admin' | 'monitor';

/** Una petición, tal como quedó en el buffer circular. */
export interface RawRequest {
  ts: number;
  method: string;
  /** Plantilla de ruta (/laws/:id), NUNCA la URL expandida: si no, la cardinalidad explota. */
  route: string;
  status: number;
  ms: number;
  bytesIn: number;
  bytesOut: number;
  caller: Caller;
  /** Nombre corto del crawler cuando caller === 'bot'. */
  bot?: string;
  /** Δ de heapUsed durante el request, en bytes. Delata los endpoints que inflan la memoria. */
  heapDelta: number;
}

/** Agregado de un (ruta, caller) dentro de un minuto. */
export interface Agg {
  route: string;
  caller: Caller;
  count: number;
  bytesIn: number;
  bytesOut: number;
  msSum: number;
  msMax: number;
  /** Muestra acotada de duraciones para calcular percentiles sin guardar todo. */
  muestra: number[];
  ok: number;
  err4xx: number;
  err5xx: number;
}

/** Estado del proceso en un instante. Se toma cada 5 s. */
export interface Sample {
  ts: number;
  rss: number;
  heapUsed: number;
  heapTotal: number;
  external: number;
  /** % de un core, calculado como delta de process.cpuUsage(). */
  cpu: number;
  /** Retraso del event loop en ms. La mejor señal única de "el server está sufriendo". */
  lagP50: number;
  lagP99: number;
  /** ms totales de pausa por GC desde la muestra anterior. */
  gcMs: number;
  handles: number;
}

/** Totales por minuto, para las series del panel. */
export interface Minuto {
  ts: number;
  req: number;
  bytesIn: number;
  bytesOut: number;
  err4xx: number;
  err5xx: number;
  msP95: number;
  porCaller: Record<Caller, number>;
}

export type Severidad = 'alta' | 'media' | 'baja';

/** Un hallazgo del motor de análisis: qué pasa, con qué evidencia y qué hacer. */
export interface Hallazgo {
  regla: string;
  severidad: Severidad;
  titulo: string;
  evidencia: string;
  sugerencia: string;
}

/** Una ventana donde alguna serie se salió de su comportamiento normal. */
export interface Pico {
  ts: number;
  metrica: 'req' | 'bytesOut';
  valor: number;
  base: number;
  veces: number;
  /** Qué explica el exceso, ordenado por contribución. */
  atribucion: { etiqueta: string; delta: number; pct: number }[];
}

export interface Snapshot {
  activo: boolean;
  desde: number;
  ahora: number;
  uptimeMs: number;
  limiteMemoriaBytes: number | null;
  totales: {
    req: number;
    bytesIn: number;
    bytesOut: number;
    err4xx: number;
    err5xx: number;
    msP50: number;
    msP95: number;
    msP99: number;
  };
  porCaller: Record<Caller, { req: number; bytesOut: number }>;
  minutos: Minuto[];
  muestras: Sample[];
  endpoints: (Omit<Agg, 'muestra'> & { msP50: number; msP95: number; bytesMedios: number })[];
  bots: { bot: string; req: number; bytesOut: number }[];
  ultimas: RawRequest[];
  picos: Pico[];
  hallazgos: Hallazgo[];
  /** Huella del propio monitor. Con 256 MB de límite, medirse a sí mismo no es opcional. */
  costo: { requestsEnBuffer: number; minutosEnMemoria: number; bytesAprox: number };
}
