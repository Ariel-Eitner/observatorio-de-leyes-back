import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { LawsService } from '../../laws/laws.service';

/**
 * Corta con 503 las rutas que leen el corpus mientras se está hidratando.
 *
 * El backend ya no espera a cargar las 1.261 normas para abrir el puerto (tardaba
 * más de 439 s y Docker/Render lo mataban por unhealthy; ver LawsService.onModuleInit).
 * El precio es que durante ~2-7 min el corpus está a medio llenar, y ahí una ley
 * que todavía no entró se vería como **404**: le mentiríamos a Google en pleno
 * deploy y ensuciaríamos las métricas de law_not_found / búsquedas sin resultado.
 *
 * 503 + Retry-After dice lo que realmente pasa: "existe, volvé en un rato".
 *
 * NO se aplica a health (el healthcheck tiene que pasar: es el punto de todo esto),
 * events (el tracking no toca el corpus) ni search (va derecho a Postgres).
 */
@Injectable()
export class CorpusReadyGuard implements CanActivate {
  // Prefijos de ruta que se sirven desde el corpus en memoria.
  private static readonly NECESITAN_CORPUS =
    /^\/?(api\/)?(laws|articles|segments|constituciones-provinciales)(\/|$)/;

  constructor(private readonly laws: LawsService) {}

  canActivate(ctx: ExecutionContext): boolean {
    if (ctx.getType() !== 'http') return true;
    if (this.laws.isReady()) return true;

    const req = ctx.switchToHttp().getRequest<{ path?: string; url?: string }>();
    const path = req.path ?? req.url ?? '';
    if (!CorpusReadyGuard.NECESITAN_CORPUS.test(path)) return true;

    const res = ctx.switchToHttp().getResponse<{ setHeader?: (k: string, v: string) => void }>();
    res.setHeader?.('Retry-After', '30');
    throw new ServiceUnavailableException(
      'El corpus se está cargando. Reintentá en unos segundos.',
    );
  }
}
