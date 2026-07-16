import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { LawsService } from '../laws/laws.service';

/**
 * Dos preguntas distintas, dos endpoints (antes había uno solo y alcanzaba, porque
 * el puerto no abría hasta tener el corpus cargado):
 *
 * - /live   ¿el proceso está vivo? → responde apenas abre el puerto.
 * - /health ¿puede SERVIR leyes?   → recién cuando el corpus terminó de hidratar.
 *
 * La diferencia importa: el corpus tarda varios minutos en entrar y ahora se carga
 * en background. Si /health dijera "ok" desde el segundo 0, un orquestador que use
 * /health para decidir cuándo mandar tráfico (Render) se lo mandaría a un backend
 * con el corpus vacío. Docker usa /live porque ahí solo queremos que el frontend
 * (depends_on: service_healthy) arranque sin esperar al corpus.
 */
@Controller()
export class HealthController {
  constructor(private readonly laws: LawsService) {}

  @Get('live')
  live() {
    return { status: 'ok' };
  }

  @Get('health')
  check() {
    if (!this.laws.isReady()) {
      throw new ServiceUnavailableException({ status: 'hidratando', corpus: 'cargando' });
    }
    return { status: 'ok', corpus: 'listo' };
  }
}
