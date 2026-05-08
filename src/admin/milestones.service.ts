import { Injectable } from '@nestjs/common';
import { EventsService, type TrackedEvent } from '../events/events.service';

export type MilestoneCategory = 'adquisicion' | 'engagement' | 'retencion' | 'conversion';

export interface Milestone {
  id:          string;
  category:    MilestoneCategory;
  title:       string;
  description: string;
  unlocked:    boolean;
  unlockedAt:  string | null;
  value?:      number;
  target?:     number;
}

const OWN_DOMAINS = ['observatorio', 'localhost', '127.0.0.1'];

@Injectable()
export class MilestonesService {
  constructor(private readonly events: EventsService) {}

  async compute(): Promise<Milestone[]> {
    const raw = await this.events.readAll();

    // ── helpers ───────────────────────────────────────────────────────────────
    const byType = (t: string) => raw.filter((e) => e.type === t);
    const first  = (t: string): TrackedEvent | null => byType(t)[0] ?? null;

    const prop = (e: TrackedEvent, key: string): string =>
      ((e.properties?.[key] ?? e.context?.[key] ?? '') as string);

    // ── guests únicos ─────────────────────────────────────────────────────────
    const allGuests = new Set(raw.map((e) => e.guestId).filter(Boolean) as string[]);
    const guestCount = allGuests.size;

    // Guests que aparecieron en más de un día calendario
    const guestDays = new Map<string, Set<string>>();
    for (const e of raw) {
      if (!e.guestId) continue;
      const day = e.timestamp.slice(0, 10);
      if (!guestDays.has(e.guestId)) guestDays.set(e.guestId, new Set());
      guestDays.get(e.guestId)!.add(day);
    }
    const returnedGuests = [...guestDays.entries()]
      .filter(([, days]) => days.size > 1)
      .map(([id]) => id);

    // ── unique queries ────────────────────────────────────────────────────────
    const uniqueQueries = new Set(
      byType('search_executed').map((e) => prop(e, 'query').toLowerCase().trim())
    ).size;

    // ── days with data ────────────────────────────────────────────────────────
    const calendarDays = new Set(raw.map((e) => e.timestamp.slice(0, 10)));

    // ── unique laws viewed ────────────────────────────────────────────────────
    const uniqueLawsViewed = new Set(
      byType('law_viewed').map((e) => prop(e, 'lawId')).filter(Boolean)
    ).size;

    // ── active minutes per law (heartbeat) ────────────────────────────────────
    const hbMap = new Map<string, number>();
    for (const e of byType('heartbeat')) {
      const k = `${e.sessionId}::${String(e.properties?.page ?? '')}`;
      const s = Number(e.properties?.activeSeconds) || 0;
      if (s > (hbMap.get(k) ?? 0)) hbMap.set(k, s);
    }
    const activeMinsByPath = new Map<string, number>();
    for (const [k, s] of hbMap) {
      const p = k.split('::')[1];
      activeMinsByPath.set(p, (activeMinsByPath.get(p) ?? 0) + Math.round(s / 60));
    }
    const lawWith5Min = [...activeMinsByPath.values()].some((m) => m >= 5);

    // ── zero result rate ──────────────────────────────────────────────────────
    const searchEvents  = byType('search_executed');
    const zeroSearches  = searchEvents.filter((e) => Number(e.properties?.resultsCount) === 0);
    const zeroRate      = searchEvents.length >= 5
      ? zeroSearches.length / searchEvents.length
      : 1;
    const searchQualityOk = zeroRate < 0.4 && searchEvents.length >= 5;

    // ── contact milestones ────────────────────────────────────────────────────
    const firstContact       = byType('contact_form_submitted')[0] ?? null;
    const firstPrensa        = byType('contact_form_submitted').find((e) => prop(e, 'tipo') === 'prensa') ?? null;
    const firstContenido     = byType('contact_form_submitted').find((e) => prop(e, 'tipo') === 'contenido') ?? null;

    // nth calendar day timestamp
    const nthDayTs = (n: number): string | null => {
      const sorted = [...calendarDays].sort();
      return sorted[n - 1] ? `${sorted[n - 1]}T23:59:59Z` : null;
    };

    // ── session durations (session_start → session_end) ───────────────────────
    const sessionStarts = new Map<string, number>();
    const sessionDurations = new Map<string, number>();
    for (const e of raw) {
      if (e.type === 'session_start') {
        sessionStarts.set(e.sessionId, new Date(e.timestamp).getTime());
      }
      if (e.type === 'session_end' && sessionStarts.has(e.sessionId)) {
        const ms = new Date(e.timestamp).getTime() - sessionStarts.get(e.sessionId)!;
        sessionDurations.set(e.sessionId, ms);
      }
    }

    // Timestamp del N-ésimo guest único (por orden de aparición en el log)
    const nthGuestTs = (n: number): string | null => {
      const seen = new Set<string>();
      for (const e of raw) {
        if (!e.guestId || seen.has(e.guestId)) continue;
        seen.add(e.guestId);
        if (seen.size === n) return e.timestamp;
      }
      return null;
    };

    // ── milestone 2: sesión orgánica ──────────────────────────────────────────
    const m2 = byType('session_start').find((e) => {
      const ref = prop(e, 'referrer');
      return ref && !OWN_DOMAINS.some((d) => ref.includes(d));
    }) ?? null;

    // ── milestone 3: desde Google ─────────────────────────────────────────────
    const m3 = byType('session_start').find((e) =>
      prop(e, 'referrer').includes('google'),
    ) ?? null;

    // ── milestone 8: primera sesión móvil ────────────────────────────────────
    const m8 = byType('session_start').find((e) =>
      prop(e, 'device') === 'mobile',
    ) ?? null;

    // ── milestone 9: sesión ≥ 5 min ───────────────────────────────────────────
    const longSession = [...sessionDurations.entries()].find(([, ms]) => ms >= 300_000);
    const m9 = longSession
      ? raw.find((e) => e.type === 'session_end' && e.sessionId === longSession[0]) ?? null
      : null;

    // ── milestone 10: primer guest recurrente ─────────────────────────────────
    const firstReturnedId = returnedGuests[0] ?? null;
    const m10 = firstReturnedId
      ? (raw.filter((e) => e.guestId === firstReturnedId)
           .sort((a, b) => a.timestamp.localeCompare(b.timestamp))[1] ?? null)
      : null;

    // ── thresholds ────────────────────────────────────────────────────────────
    const G10 = 10, G25 = 25, G50 = 50, G100 = 100, R5 = 5;

    const m = (
      id: string,
      category: MilestoneCategory,
      title: string,
      description: string,
      unlocked: boolean,
      unlockedAt: string | null,
      value?: number,
      target?: number,
    ): Milestone => ({ id, category, title, description, unlocked, unlockedAt, value, target });

    return [
      // ── ADQUISICIÓN ───────────────────────────────────────────────────────────
      m('primer_visitante', 'adquisicion', 'Primer visitante',
        'La primera sesión registrada — el sitio está vivo.',
        !!first('session_start'), first('session_start')?.timestamp ?? null),

      m('trafico_organico', 'adquisicion', 'Tráfico orgánico',
        'Primera visita llegada desde fuera del sitio (no directo).',
        !!m2, m2?.timestamp ?? null),

      m('desde_google', 'adquisicion', 'Referido por Google',
        'Primera visita que llegó desde un buscador.',
        !!m3, m3?.timestamp ?? null),

      m('primera_movil', 'adquisicion', 'Primera visita móvil',
        'Alguien entró desde un celular o tablet.',
        !!m8, m8?.timestamp ?? null),

      m('guests_10', 'adquisicion', '10 visitantes únicos',
        'Diez personas distintas pasaron por el sitio.',
        guestCount >= G10, guestCount >= G10 ? nthGuestTs(G10) : null, guestCount, G10),

      m('guests_25', 'adquisicion', '25 visitantes únicos',
        'La audiencia crece — tracción inicial.',
        guestCount >= G25, guestCount >= G25 ? nthGuestTs(G25) : null, guestCount, G25),

      m('guests_50', 'adquisicion', '50 visitantes únicos',
        'Cincuenta personas. Hay algo que funciona.',
        guestCount >= G50, guestCount >= G50 ? nthGuestTs(G50) : null, guestCount, G50),

      m('guests_100', 'adquisicion', '100 visitantes únicos',
        'Cien guests únicos — Fase 1 completada.',
        guestCount >= G100, guestCount >= G100 ? nthGuestTs(G100) : null, guestCount, G100),

      // ── ENGAGEMENT ────────────────────────────────────────────────────────────
      m('primera_busqueda', 'engagement', 'Primera búsqueda',
        'Alguien usó el buscador para encontrar algo.',
        !!first('search_executed'), first('search_executed')?.timestamp ?? null),

      m('primer_articulo', 'engagement', 'Primer artículo abierto',
        'Un visitante expandió un artículo para leer el detalle.',
        !!first('article_expanded'), first('article_expanded')?.timestamp ?? null),

      m('primer_link', 'engagement', 'Primer link copiado',
        'Alguien copió el enlace a un artículo — contenido que vale compartir.',
        !!first('article_link_copied'), first('article_link_copied')?.timestamp ?? null),

      m('sesion_5min', 'engagement', 'Sesión de 5 minutos',
        'Un visitante estuvo al menos 5 minutos leyendo.',
        !!m9, m9?.timestamp ?? null),

      m('primera_ley_vista', 'engagement', 'Primera ley visualizada',
        'Alguien abrió una ley y la cargó en el visor.',
        !!first('law_viewed'), first('law_viewed')?.timestamp ?? null),

      // ── RETENCIÓN ─────────────────────────────────────────────────────────────
      m('primer_retorno', 'retencion', 'Visitante que volvió',
        'El mismo guest regresó al sitio en un día diferente.',
        !!m10, m10?.timestamp ?? null),

      m('retorno_5', 'retencion', '5 visitantes recurrentes',
        'Cinco personas distintas que volvieron. El hábito se forma.',
        returnedGuests.length >= R5, null, returnedGuests.length, R5),

      // ── CONVERSIÓN ────────────────────────────────────────────────────────────
      m('soft_gate', 'conversion', 'Soft gate activado',
        'El modal de registro apareció — hay un usuario que llegó al umbral.',
        !!first('soft_gate_shown'), first('soft_gate_shown')?.timestamp ?? null),

      m('soft_gate_cta', 'conversion', 'CTA de registro clickeado',
        'Alguien clickeó en "Registrarme" dentro del modal.',
        !!first('soft_gate_cta_clicked'), first('soft_gate_cta_clicked')?.timestamp ?? null),

      // ── ADQUISICIÓN — nuevos ──────────────────────────────────────────────
      m('queries_10_unicas', 'adquisicion', '10 búsquedas distintas',
        'Diez términos de búsqueda únicos — hay variedad de interés real.',
        uniqueQueries >= 10, uniqueQueries >= 10 ? nthDayTs(1) : null, uniqueQueries, 10),

      m('semana_de_datos', 'adquisicion', 'Primera semana de datos',
        'El sitio tiene datos de al menos 7 días distintos.',
        calendarDays.size >= 7, calendarDays.size >= 7 ? nthDayTs(7) : null, calendarDays.size, 7),

      // ── ENGAGEMENT — nuevos ───────────────────────────────────────────────
      m('primer_enmienda', 'engagement', 'Primera enmienda consultada',
        'Un usuario abrió el historial de modificaciones de un artículo.',
        !!first('article_amendment_opened'), first('article_amendment_opened')?.timestamp ?? null),

      m('primer_inline_ref', 'engagement', 'Primera referencia cruzada',
        'Un visitante navegó entre leyes usando un link inline — lectura profunda.',
        !!first('inline_ref_clicked'), first('inline_ref_clicked')?.timestamp ?? null),

      m('cinco_leyes_distintas', 'engagement', '5 leyes distintas abiertas',
        'Cinco leyes únicas vistas — la audiencia explora más allá de una sola norma.',
        uniqueLawsViewed >= 5, uniqueLawsViewed >= 5 ? nthDayTs(1) : null, uniqueLawsViewed, 5),

      m('ley_activa_5min', 'engagement', 'Ley con 5 min de lectura activa',
        'Al menos una ley acumuló 5 minutos de tiempo activo — hay lectura real, no rebote.',
        lawWith5Min, lawWith5Min ? nthDayTs(1) : null),

      // ── RETENCIÓN — nuevos ────────────────────────────────────────────────
      m('tres_dias_distintos', 'retencion', 'Datos en 3 días distintos',
        'El sitio tuvo actividad en al menos 3 días calendario — hay recurrencia.',
        calendarDays.size >= 3, calendarDays.size >= 3 ? nthDayTs(3) : null, calendarDays.size, 3),

      // ── CONVERSIÓN — nuevos ───────────────────────────────────────────────
      m('primer_contacto', 'conversion', 'Primer mensaje recibido',
        'Alguien completó el formulario de contacto — hay personas del otro lado.',
        !!firstContact, firstContact?.timestamp ?? null),

      m('primer_reporte_contenido', 'conversion', 'Primer reporte de contenido',
        'Un usuario reportó un error o actualización — señal de usuarios comprometidos con la calidad.',
        !!firstContenido, firstContenido?.timestamp ?? null),

      m('primer_contacto_prensa', 'conversion', 'Primer contacto de prensa',
        'Una consulta de prensa o colaboración. El proyecto tiene visibilidad.',
        !!firstPrensa, firstPrensa?.timestamp ?? null),

      m('busqueda_calidad', 'conversion', 'Búsquedas con <40% sin resultados',
        'El contenido cubre la mayoría de lo que buscan — señal de alineación entre oferta y demanda.',
        searchQualityOk, searchQualityOk ? nthDayTs(1) : null),
    ];
  }
}
