import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { isBotUa, botName } from '../common/bots';
import { MonitorService } from './monitor.service';
import type { Caller } from './monitor.types';

/** Rutas que no se miden: son el propio monitor y los healthchecks cada 30 s. */
const IGNORAR = /^\/api\/(monitor|live|health)(\/|$)/;

/**
 * Mide cada request. Todo lo que hace es aritmética sobre estructuras ya
 * reservadas — ni I/O ni await, porque esto corre en el camino de TODAS las
 * respuestas y el presupuesto de CPU acá es 0,2 de un core.
 */
@Injectable()
export class MonitorInterceptor implements NestInterceptor {
  /**
   * process.memoryUsage() cuesta decenas de microsegundos, demasiado para pagarlo
   * en cada request. Se mide 1 de cada N: alcanza para ver QUÉ endpoint infla el
   * heap, que es la pregunta, sin volver caro el camino caliente.
   */
  private static readonly CADA_N_HEAP = 5;
  private contador = 0;

  constructor(private readonly monitor: MonitorService) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (!this.monitor.activo || ctx.getType() !== 'http') return next.handle();

    const req = ctx.switchToHttp().getRequest();
    const res = ctx.switchToHttp().getResponse();
    const path: string = req.originalUrl ?? req.url ?? '';
    if (IGNORAR.test(path.split('?')[0])) return next.handle();

    const inicio = Date.now();
    const medirHeap = ++this.contador % MonitorInterceptor.CADA_N_HEAP === 0;
    const heapAntes = medirHeap ? process.memoryUsage().heapUsed : 0;

    // Contar bytes salientes de verdad. Content-Length no sirve: en respuestas
    // chunked (que es como salen las grandes) directamente no viene.
    let bytesOut = 0;
    const writeOrig = res.write.bind(res);
    const endOrig = res.end.bind(res);
    res.write = (chunk: unknown, ...resto: unknown[]) => {
      if (chunk && typeof chunk !== 'function') bytesOut += largo(chunk);
      return writeOrig(chunk, ...resto);
    };
    res.end = (chunk: unknown, ...resto: unknown[]) => {
      if (chunk && typeof chunk !== 'function') bytesOut += largo(chunk);
      return endOrig(chunk, ...resto);
    };

    res.once('finish', () => {
      this.monitor.registrar({
        ts: inicio,
        method: req.method ?? 'GET',
        route: plantilla(req, path),
        status: res.statusCode ?? 0,
        ms: Date.now() - inicio,
        bytesIn: Number(req.headers['content-length'] ?? 0) || 0,
        bytesOut,
        caller: quienLlama(req),
        bot: isBotUa(req.headers['user-agent']) ? botName(req.headers['user-agent']) : undefined,
        heapDelta: medirHeap ? process.memoryUsage().heapUsed - heapAntes : 0,
      });
    });

    return next.handle();
  }
}

function largo(chunk: unknown): number {
  if (Buffer.isBuffer(chunk)) return chunk.length;
  if (typeof chunk === 'string') return Buffer.byteLength(chunk);
  return 0;
}

/**
 * Ruta-plantilla, no URL expandida. Sin esto, /laws/ley-27742 y /laws/ley-26994
 * serían dos métricas distintas y en un rato habría miles de filas inútiles.
 */
function plantilla(req: { route?: { path?: string }; baseUrl?: string }, path: string): string {
  const p = req.route?.path;
  if (p) return `${req.baseUrl ?? ''}${p}` || p;

  // Sin match de ruta (404): se normaliza a mano para no ensuciar el panel.
  return (
    path
      .split('?')[0]
      .replace(/\/[0-9a-f]{8}-[0-9a-f-]{27,}/gi, '/:uuid')
      .replace(/\/\d+/g, '/:n')
      .slice(0, 120) || '/'
  );
}

/**
 * Quién originó el request. Es la dimensión que más explica un pico: no es lo
 * mismo que el tráfico lo genere gente, el propio render del servidor, o un crawler.
 *
 * El discriminante del SSR es el Host: el frontend llama por la red interna de
 * Docker (backend:3600), mientras que el navegador entra por el puerto publicado.
 */
function quienLlama(req: { headers: Record<string, unknown> }): Caller {
  const h = req.headers;
  if (h['x-obs-admin']) return 'admin';

  const host = String(h['host'] ?? '');
  if (/^backend(:|$)/.test(host) || h['x-obs-client-ip']) return 'ssr';

  if (isBotUa(h['user-agent'] as string | undefined)) return 'bot';
  return 'browser';
}
