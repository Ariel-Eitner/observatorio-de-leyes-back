import type { Caller, Hallazgo, Minuto, Pico, Sample, Snapshot } from './monitor.types';

type Endpoint = Snapshot['endpoints'][number];

interface Entrada {
  minutos: Minuto[];
  endpoints: Endpoint[];
  muestras: Sample[];
  totales: Snapshot['totales'];
  porCaller: Record<Caller, { req: number; bytesOut: number }>;
  limiteMemoria: number | null;
}

// ── Umbrales ─────────────────────────────────────────────────────────────────
// Elegidos contra la realidad medida de este proyecto, no genéricos:
// el registry pesa 2,27 MB, el contenedor tiene 256 MB y la CPU está a 0,2.
const PAYLOAD_GORDO_BYTES = 500 * 1024;
const LAG_BLOQUEADO_MS = 200;
const MEM_ALTA_PCT = 80;
const BOT_STORM_PCT = 40;
const ERROR_5XX_PCT = 2;
const LENTO_P95_MS = 1500;
/** Un pico tiene que superar mediana + 3·MAD y además ser el doble de la base. */
const PICO_MAD = 3;
const PICO_VECES = 2;
/** Con menos minutos que esto no hay línea base: no se reporta nada. */
const MIN_MINUTOS = 5;

export function analizar(e: Entrada): { picos: Pico[]; hallazgos: Hallazgo[] } {
  return { picos: detectarPicos(e.minutos), hallazgos: reglas(e) };
}

// ── Detección de picos ───────────────────────────────────────────────────────

/**
 * Mediana + MAD en vez de media + desvío estándar, a propósito: la desviación
 * estándar la infla el propio pico que queremos encontrar, así que un pico grande
 * sube el umbral y se esconde solo. La MAD es robusta — un outlier no la mueve.
 */
function detectarPicos(minutos: Minuto[]): Pico[] {
  if (minutos.length < MIN_MINUTOS) return [];
  const picos: Pico[] = [];

  for (const metrica of ['req', 'bytesOut'] as const) {
    const serie = minutos.map((m) => m[metrica]);
    const med = mediana(serie);
    const mad = mediana(serie.map((v) => Math.abs(v - med))) || 1;
    const umbral = Math.max(med + PICO_MAD * mad, med * PICO_VECES);

    for (let i = 0; i < minutos.length; i++) {
      if (serie[i] <= umbral || serie[i] === 0 || med === 0) continue;
      picos.push({
        ts: minutos[i].ts,
        metrica,
        valor: serie[i],
        base: Math.round(med),
        veces: Math.round((serie[i] / (med || 1)) * 10) / 10,
        atribucion: atribuir(minutos[i], metrica),
      });
    }
  }
  return picos.sort((a, b) => b.ts - a.ts).slice(0, 20);
}

/** Qué caller explica el exceso de ese minuto, ordenado por contribución. */
function atribuir(m: Minuto, metrica: 'req' | 'bytesOut'): Pico['atribucion'] {
  // Para bytes no tenemos desglose por caller a nivel minuto, así que se usa el
  // reparto de requests como proxy — honesto y suficiente para señalar al culpable.
  const total = m.req || 1;
  return (Object.entries(m.porCaller) as [Caller, number][])
    .filter(([, v]) => v > 0)
    .map(([etiqueta, v]) => ({
      etiqueta,
      delta: metrica === 'req' ? v : Math.round((v / total) * m.bytesOut),
      pct: Math.round((v / total) * 100),
    }))
    .sort((a, b) => b.delta - a.delta);
}

// ── Catálogo de sospechosos ──────────────────────────────────────────────────

function reglas(e: Entrada): Hallazgo[] {
  const h: Hallazgo[] = [];
  const { endpoints, muestras, totales, porCaller } = e;

  // PAYLOAD_GORDO — respuestas que por sí solas explican el ancho de banda.
  for (const ep of endpoints.filter((x) => x.bytesMedios > PAYLOAD_GORDO_BYTES).slice(0, 5)) {
    h.push({
      regla: 'PAYLOAD_GORDO',
      severidad: ep.bytesMedios > 1024 * 1024 ? 'alta' : 'media',
      titulo: `${ep.route} devuelve ${mb(ep.bytesMedios)} por llamada`,
      evidencia: `${ep.count} llamadas (caller: ${ep.caller}) = ${mb(ep.bytesOut)} salientes en total.`,
      sugerencia:
        ep.bytesMedios > 2 * 1024 * 1024
          ? 'Supera los 2 MB: el caché de datos de Next lo RECHAZA, así que ningún revalidate lo va a cachear. Partir la respuesta o servir una versión liviana.'
          : 'Paginar o recortar campos. A 0,2 CPU, serializar esto es tiempo de CPU puro.',
    });
  }

  // SIN_CACHE — el mismo (ruta, caller) repitiéndose con respuestas grandes.
  for (const ep of endpoints.filter((x) => x.caller === 'ssr' && x.count >= 5 && x.bytesMedios > 100 * 1024).slice(0, 3)) {
    h.push({
      regla: 'SIN_CACHE',
      severidad: 'alta',
      titulo: `${ep.route} se repite ${ep.count} veces desde el render del servidor`,
      evidencia: `${mb(ep.bytesMedios)} por llamada, siempre el mismo contenido → ${mb(ep.bytesOut)} desperdiciados.`,
      sugerencia: 'El SSR lo pide una y otra vez. Cachear del lado del frontend, o servirlo desde el backend con ETag fuerte.',
    });
  }

  // EVENT_LOOP_BLOQUEADO — el proceso se congela; ningún request avanza.
  const lagMax = Math.max(0, ...muestras.map((m) => m.lagP99));
  if (lagMax > LAG_BLOQUEADO_MS) {
    h.push({
      regla: 'EVENT_LOOP_BLOQUEADO',
      severidad: lagMax > 1000 ? 'alta' : 'media',
      titulo: `El event loop se trabó hasta ${Math.round(lagMax)} ms`,
      evidencia: `p99 del retraso: ${Math.round(lagMax)} ms (sano: <50 ms). Mientras tanto el proceso no atiende a nadie.`,
      sugerencia: 'Trabajo síncrono pesado — típicamente serializar JSON grande. Correlacionar con los endpoints de PAYLOAD_GORDO.',
    });
  }

  // MEM_ALTA — precursor del OOM, que en este backend ya pasó una vez.
  const ultima = muestras.at(-1);
  if (ultima && e.limiteMemoria) {
    const pct = (ultima.rss / e.limiteMemoria) * 100;
    if (pct > MEM_ALTA_PCT) {
      h.push({
        regla: 'MEM_ALTA',
        severidad: pct > 90 ? 'alta' : 'media',
        titulo: `Memoria al ${Math.round(pct)}% del límite del contenedor`,
        evidencia: `RSS ${mb(ultima.rss)} sobre ${mb(e.limiteMemoria)}. Heap: ${mb(ultima.heapUsed)}.`,
        sugerencia: 'A este nivel el siguiente pico mata el proceso (exit 137). Subir el límite o bajar el corpus en RAM.',
      });
    }
  }

  // MEM_ESCALANDO — crecimiento monótono, que distingue una fuga de un pico.
  if (muestras.length >= 12) {
    const ventana = muestras.slice(-12);
    const suben = ventana.slice(1).filter((m, i) => m.rss > ventana[i].rss).length;
    const crecio = ventana.at(-1)!.rss - ventana[0].rss;
    if (suben >= 10 && crecio > 20 * 1024 * 1024) {
      h.push({
        regla: 'MEM_ESCALANDO',
        severidad: 'media',
        titulo: `La memoria creció ${mb(crecio)} en el último minuto, sin bajar`,
        evidencia: `${suben} de 11 muestras consecutivas subieron. El GC no está recuperando.`,
        sugerencia: 'Puede ser hidratación normal del corpus o una fuga. Si sigue después de estabilizarse, es fuga.',
      });
    }
  }

  // BOT_STORM — el consumo que no genera un solo usuario.
  const reqTotal = totales.req || 1;
  const pctBot = (porCaller.bot.req / reqTotal) * 100;
  if (pctBot > BOT_STORM_PCT && porCaller.bot.req > 20) {
    h.push({
      regla: 'BOT_STORM',
      severidad: pctBot > 70 ? 'alta' : 'media',
      titulo: `Los crawlers son el ${Math.round(pctBot)}% del tráfico`,
      evidencia: `${porCaller.bot.req} de ${reqTotal} requests, ${mb(porCaller.bot.bytesOut)} salientes. Cero personas detrás.`,
      sugerencia: 'Revisar robots.txt y considerar bloqueo duro por firewall: robots.txt es solo una sugerencia.',
    });
  }

  // ERROR_BURST
  const pct5xx = (totales.err5xx / reqTotal) * 100;
  if (pct5xx > ERROR_5XX_PCT) {
    h.push({
      regla: 'ERROR_BURST',
      severidad: 'alta',
      titulo: `${Math.round(pct5xx)}% de las respuestas son 5xx`,
      evidencia: `${totales.err5xx} errores de servidor sobre ${reqTotal} requests.`,
      sugerencia: 'Ver la pestaña de peticiones filtrando por estado ≥500 para ubicar la ruta.',
    });
  }

  // LENTO
  for (const ep of endpoints.filter((x) => x.msP95 > LENTO_P95_MS && x.count >= 3).slice(0, 3)) {
    h.push({
      regla: 'LENTO',
      severidad: 'baja',
      titulo: `${ep.route} tarda ${Math.round(ep.msP95)} ms en el p95`,
      evidencia: `${ep.count} llamadas, máximo ${Math.round(ep.msMax)} ms.`,
      sugerencia: 'Si además es PAYLOAD_GORDO, la causa es el tamaño. Si no, mirar las consultas a la base.',
    });
  }

  const orden = { alta: 0, media: 1, baja: 2 };
  return h.sort((a, b) => orden[a.severidad] - orden[b.severidad]);
}

// ── Utilidades ───────────────────────────────────────────────────────────────

function mediana(v: number[]): number {
  if (!v.length) return 0;
  const o = [...v].sort((a, b) => a - b);
  const m = Math.floor(o.length / 2);
  return o.length % 2 ? o[m] : (o[m - 1] + o[m]) / 2;
}

function mb(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1048576).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}
