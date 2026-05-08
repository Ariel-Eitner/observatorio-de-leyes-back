import { Injectable } from '@nestjs/common';
import { EventsService, type TrackedEvent } from '../events/events.service';

export type MilestoneCategory = 'adquisicion' | 'engagement' | 'retencion' | 'conversion';
export type MilestonePhase = 1 | 2;

export interface Milestone {
  id:          string;
  category:    MilestoneCategory;
  phase:       MilestonePhase;
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

    // ── nth calendar day timestamp ─────────────────────────────────────────────
    const nthDayTs = (n: number): string | null => {
      const sorted = [...calendarDays].sort();
      return sorted[n - 1] ? `${sorted[n - 1]}T23:59:59Z` : null;
    };

    // ── nth unique guest timestamp ────────────────────────────────────────────
    const nthGuestTs = (n: number): string | null => {
      const seen = new Set<string>();
      for (const e of raw) {
        if (!e.guestId || seen.has(e.guestId)) continue;
        seen.add(e.guestId);
        if (seen.size === n) return e.timestamp;
      }
      return null;
    };

    // ── unique guests por tipo de evento ──────────────────────────────────────
    // Usa guestId si existe, si no sessionId como fallback (eventos de navegador siempre tienen guestId)
    const uniqueGuestsForType = (type: string): string[] => {
      const seen = new Set<string>();
      const result: string[] = [];
      for (const e of byType(type)) {
        const id = e.guestId ?? e.sessionId;
        if (!id || seen.has(id)) continue;
        seen.add(id);
        result.push(id);
      }
      return result;
    };

    // Timestamp del n-ésimo guest único que disparó un evento
    const nthGuestTsForType = (type: string, n: number): string | null => {
      const seen = new Set<string>();
      let count = 0;
      for (const e of byType(type)) {
        const id = e.guestId ?? e.sessionId;
        if (!id || seen.has(id)) continue;
        seen.add(id);
        count++;
        if (count === n) return e.timestamp;
      }
      return null;
    };

    // ── Counts de soft gate ───────────────────────────────────────────────────
    const sgShownGuests  = uniqueGuestsForType('soft_gate_shown');
    const sgCtaGuests    = uniqueGuestsForType('soft_gate_cta_clicked');
    const sgCompletedGuests = uniqueGuestsForType('soft_gate_completed');
    const sgShownCount   = sgShownGuests.length;
    const sgCtaCount     = sgCtaGuests.length;
    const sgCompletedCount = sgCompletedGuests.length;

    // ── Sesión ≥ 5 min ─────────────────────────────────────────────────────────
    const longSession = [...sessionDurations.entries()].find(([, ms]) => ms >= 300_000);
    const m9 = longSession
      ? raw.find((e) => e.type === 'session_end' && e.sessionId === longSession[0]) ?? null
      : null;

    // ── Primer guest recurrente ───────────────────────────────────────────────
    const firstReturnedId = returnedGuests[0] ?? null;
    const m10 = firstReturnedId
      ? (raw.filter((e) => e.guestId === firstReturnedId)
           .sort((a, b) => a.timestamp.localeCompare(b.timestamp))[1] ?? null)
      : null;

    // ── Sesión orgánica ───────────────────────────────────────────────────────
    const m2 = byType('session_start').find((e) => {
      const ref = prop(e, 'referrer');
      return ref && !OWN_DOMAINS.some((d) => ref.includes(d));
    }) ?? null;

    // ── Desde Google ──────────────────────────────────────────────────────────
    const m3 = byType('session_start').find((e) =>
      prop(e, 'referrer').includes('google'),
    ) ?? null;

    // ── Primera sesión móvil ──────────────────────────────────────────────────
    const m8 = byType('session_start').find((e) =>
      prop(e, 'device') === 'mobile',
    ) ?? null;

    // ── helper constructor ────────────────────────────────────────────────────
    const m = (
      id: string,
      category: MilestoneCategory,
      phase: MilestonePhase,
      title: string,
      description: string,
      unlocked: boolean,
      unlockedAt: string | null,
      value?: number,
      target?: number,
    ): Milestone => ({ id, category, phase, title, description, unlocked, unlockedAt, value, target });

    return [
      // ══════════════════════════════════════════════════════════════
      // FASE 1
      // ══════════════════════════════════════════════════════════════

      // ── ADQUISICIÓN ───────────────────────────────────────────────────────────
      m('primer_visitante', 'adquisicion', 1, 'Primer visitante',
        'La primera sesión registrada — el sitio está vivo.',
        !!first('session_start'), first('session_start')?.timestamp ?? null),

      m('trafico_organico', 'adquisicion', 1, 'Tráfico orgánico',
        'Primera visita llegada desde fuera del sitio (no directo).',
        !!m2, m2?.timestamp ?? null),

      m('desde_google', 'adquisicion', 1, 'Referido por Google',
        'Primera visita que llegó desde un buscador.',
        !!m3, m3?.timestamp ?? null),

      m('primera_movil', 'adquisicion', 1, 'Primera visita móvil',
        'Alguien entró desde un celular o tablet.',
        !!m8, m8?.timestamp ?? null),

      m('guests_10', 'adquisicion', 1, '10 visitantes únicos',
        'Diez personas distintas pasaron por el sitio.',
        guestCount >= 10, guestCount >= 10 ? nthGuestTs(10) : null, guestCount, 10),

      m('guests_25', 'adquisicion', 1, '25 visitantes únicos',
        'La audiencia crece — tracción inicial.',
        guestCount >= 25, guestCount >= 25 ? nthGuestTs(25) : null, guestCount, 25),

      m('guests_50', 'adquisicion', 1, '50 visitantes únicos',
        'Cincuenta personas. Hay algo que funciona.',
        guestCount >= 50, guestCount >= 50 ? nthGuestTs(50) : null, guestCount, 50),

      m('guests_100', 'adquisicion', 1, '100 visitantes únicos',
        'Cien guests únicos — Fase 1 completada.',
        guestCount >= 100, guestCount >= 100 ? nthGuestTs(100) : null, guestCount, 100),

      m('queries_10_unicas', 'adquisicion', 1, '10 búsquedas distintas',
        'Diez términos únicos — hay variedad de interés real.',
        uniqueQueries >= 10, uniqueQueries >= 10 ? nthDayTs(1) : null, uniqueQueries, 10),

      m('semana_de_datos', 'adquisicion', 1, 'Primera semana de datos',
        'El sitio tiene datos de al menos 7 días distintos.',
        calendarDays.size >= 7, calendarDays.size >= 7 ? nthDayTs(7) : null, calendarDays.size, 7),

      // ── ENGAGEMENT ────────────────────────────────────────────────────────────
      m('primera_busqueda', 'engagement', 1, 'Primera búsqueda',
        'Alguien usó el buscador para encontrar algo.',
        !!first('search_executed'), first('search_executed')?.timestamp ?? null),

      m('primer_articulo', 'engagement', 1, 'Primer artículo abierto',
        'Un visitante expandió un artículo para leer el detalle.',
        !!first('article_expanded'), first('article_expanded')?.timestamp ?? null),

      m('primer_link', 'engagement', 1, 'Primer link copiado',
        'Alguien copió el enlace a un artículo — contenido que vale compartir.',
        !!first('article_link_copied'), first('article_link_copied')?.timestamp ?? null),

      m('sesion_5min', 'engagement', 1, 'Sesión de 5 minutos',
        'Un visitante estuvo al menos 5 minutos leyendo.',
        !!m9, m9?.timestamp ?? null),

      m('primera_ley_vista', 'engagement', 1, 'Primera ley visualizada',
        'Alguien abrió una ley y la cargó en el visor.',
        !!first('law_viewed'), first('law_viewed')?.timestamp ?? null),

      m('primer_enmienda', 'engagement', 1, 'Primera enmienda consultada',
        'Un usuario abrió el historial de modificaciones de un artículo.',
        !!first('article_amendment_opened'), first('article_amendment_opened')?.timestamp ?? null),

      m('primer_inline_ref', 'engagement', 1, 'Primera referencia cruzada',
        'Un visitante navegó entre leyes usando un link inline — lectura profunda.',
        !!first('inline_ref_clicked'), first('inline_ref_clicked')?.timestamp ?? null),

      m('cinco_leyes_distintas', 'engagement', 1, '5 leyes distintas abiertas',
        'Cinco leyes únicas vistas — la audiencia explora más allá de una sola norma.',
        uniqueLawsViewed >= 5, uniqueLawsViewed >= 5 ? nthDayTs(1) : null, uniqueLawsViewed, 5),

      m('ley_activa_5min', 'engagement', 1, 'Ley con 5 min de lectura activa',
        'Al menos una ley acumuló 5 minutos de tiempo activo — lectura real, no rebote.',
        lawWith5Min, lawWith5Min ? nthDayTs(1) : null),

      m('busqueda_profunda', 'engagement', 1, 'Primera búsqueda refinada',
        'Un usuario ajustó su query — señal de intención seria de encontrar algo.',
        !!first('search_refined'), first('search_refined')?.timestamp ?? null),

      m('primer_demanda', 'engagement', 1, 'Contenido demandado no disponible',
        'Alguien intentó abrir una ley sin artículos cargados — demanda real para priorizar.',
        !!first('unavailable_content_clicked'), first('unavailable_content_clicked')?.timestamp ?? null),

      // ── RETENCIÓN ─────────────────────────────────────────────────────────────
      m('primer_retorno', 'retencion', 1, 'Visitante que volvió',
        'El mismo guest regresó al sitio en un día diferente.',
        !!m10, m10?.timestamp ?? null),

      m('retorno_5', 'retencion', 1, '5 visitantes recurrentes',
        'Cinco personas distintas que volvieron. El hábito se forma.',
        returnedGuests.length >= 5, null, returnedGuests.length, 5),

      m('retorno_10', 'retencion', 1, '10 visitantes recurrentes',
        'Diez visitantes que volvieron — hay una audiencia fiel consolidada.',
        returnedGuests.length >= 10,
        returnedGuests.length >= 10 ? (raw.filter((e) => e.guestId === returnedGuests[9])
          .sort((a, b) => a.timestamp.localeCompare(b.timestamp))[1]?.timestamp ?? null) : null,
        returnedGuests.length, 10),

      // ── CONVERSIÓN ────────────────────────────────────────────────────────────
      m('soft_gate', 'conversion', 1, 'Soft gate activado',
        'El modal de registro apareció — hay un usuario que llegó al umbral.',
        !!first('soft_gate_shown'), first('soft_gate_shown')?.timestamp ?? null),

      m('soft_gate_cta', 'conversion', 1, 'CTA de registro clickeado',
        'Alguien clickeó en "Registrarme" dentro del modal.',
        !!first('soft_gate_cta_clicked'), first('soft_gate_cta_clicked')?.timestamp ?? null),

      m('soft_gate_5', 'conversion', 1, '5 usuarios alcanzaron el umbral',
        'Cinco guests distintos llegaron a los 50 puntos y vieron el modal.',
        sgShownCount >= 5, sgShownCount >= 5 ? nthGuestTsForType('soft_gate_shown', 5) : null, sgShownCount, 5),

      m('soft_gate_cta_5', 'conversion', 1, '5 usuarios clickearon el CTA',
        'Cinco guests distintos mostraron intención de registrarse.',
        sgCtaCount >= 5, sgCtaCount >= 5 ? nthGuestTsForType('soft_gate_cta_clicked', 5) : null, sgCtaCount, 5),

      m('primer_fundador', 'conversion', 1, 'Primer registro completado',
        'Alguien completó el flujo de registro entero — el primer fundador.',
        sgCompletedCount >= 1, first('soft_gate_completed')?.timestamp ?? null),

      m('primer_contacto', 'conversion', 1, 'Primer mensaje recibido',
        'Alguien completó el formulario de contacto — hay personas del otro lado.',
        !!firstContact, firstContact?.timestamp ?? null),

      m('primer_reporte_contenido', 'conversion', 1, 'Primer reporte de contenido',
        'Un usuario reportó un error o actualización — señal de usuarios comprometidos con la calidad.',
        !!firstContenido, firstContenido?.timestamp ?? null),

      m('primer_contacto_prensa', 'conversion', 1, 'Primer contacto de prensa',
        'Una consulta de prensa o colaboración. El proyecto tiene visibilidad.',
        !!firstPrensa, firstPrensa?.timestamp ?? null),

      m('busqueda_calidad', 'conversion', 1, 'Búsquedas con <40% sin resultados',
        'El contenido cubre la mayoría de lo que buscan — alineación entre oferta y demanda.',
        searchQualityOk, searchQualityOk ? nthDayTs(1) : null),

      // ══════════════════════════════════════════════════════════════
      // FASE 2 — Escala
      // ══════════════════════════════════════════════════════════════

      // ── ADQUISICIÓN FASE 2 ────────────────────────────────────────────────────
      m('guests_250', 'adquisicion', 2, '250 visitantes únicos',
        'Tracción sostenida — la audiencia ya tiene masa crítica.',
        guestCount >= 250, guestCount >= 250 ? nthGuestTs(250) : null, guestCount, 250),

      m('guests_500', 'adquisicion', 2, '500 visitantes únicos',
        'Quinientas personas distintas. El sitio escala.',
        guestCount >= 500, guestCount >= 500 ? nthGuestTs(500) : null, guestCount, 500),

      m('guests_1000', 'adquisicion', 2, '1.000 visitantes únicos',
        'Mil visitantes únicos — producto validado a escala.',
        guestCount >= 1000, guestCount >= 1000 ? nthGuestTs(1000) : null, guestCount, 1000),

      // ── RETENCIÓN FASE 2 ──────────────────────────────────────────────────────
      m('retorno_25', 'retencion', 2, '25 visitantes recurrentes',
        'Veinticinco personas que vuelven — la retención escala.',
        returnedGuests.length >= 25, null, returnedGuests.length, 25),

      // ── CONVERSIÓN FASE 2 ─────────────────────────────────────────────────────
      m('soft_gate_25', 'conversion', 2, '25 usuarios alcanzaron el umbral',
        'La intención de registro aparece con regularidad.',
        sgShownCount >= 25, sgShownCount >= 25 ? nthGuestTsForType('soft_gate_shown', 25) : null, sgShownCount, 25),

      m('soft_gate_50', 'conversion', 2, '50 usuarios alcanzaron el umbral',
        'El soft gate es un embudo activo — hay flujo constante.',
        sgShownCount >= 50, sgShownCount >= 50 ? nthGuestTsForType('soft_gate_shown', 50) : null, sgShownCount, 50),

      m('soft_gate_100', 'conversion', 2, '100 usuarios alcanzaron el umbral',
        'Cien personas llegaron al umbral — hay demanda real de registro.',
        sgShownCount >= 100, sgShownCount >= 100 ? nthGuestTsForType('soft_gate_shown', 100) : null, sgShownCount, 100),

      m('soft_gate_200', 'conversion', 2, '200 usuarios alcanzaron el umbral',
        'El embudo de conversión opera a escala.',
        sgShownCount >= 200, sgShownCount >= 200 ? nthGuestTsForType('soft_gate_shown', 200) : null, sgShownCount, 200),

      m('soft_gate_cta_25', 'conversion', 2, '25 usuarios clickearon el CTA',
        'La propuesta de valor del modal convierte de forma consistente.',
        sgCtaCount >= 25, sgCtaCount >= 25 ? nthGuestTsForType('soft_gate_cta_clicked', 25) : null, sgCtaCount, 25),

      m('soft_gate_cta_50', 'conversion', 2, '50 usuarios clickearon el CTA',
        'Cincuenta intenciones de registro concretas.',
        sgCtaCount >= 50, sgCtaCount >= 50 ? nthGuestTsForType('soft_gate_cta_clicked', 50) : null, sgCtaCount, 50),

      m('fundadores_5', 'conversion', 2, '5 registros completados',
        'Cinco fundadores — hay una comunidad inicial.',
        sgCompletedCount >= 5, sgCompletedCount >= 5 ? nthGuestTsForType('soft_gate_completed', 5) : null, sgCompletedCount, 5),

      m('fundadores_10', 'conversion', 2, '10 registros completados',
        'Diez fundadores — el modelo de comunidad está validado.',
        sgCompletedCount >= 10, sgCompletedCount >= 10 ? nthGuestTsForType('soft_gate_completed', 10) : null, sgCompletedCount, 10),
    ];
  }
}
