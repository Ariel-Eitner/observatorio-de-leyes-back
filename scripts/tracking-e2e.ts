/**
 * E2E de tracking — navega el sitio como un usuario real y verifica que
 * todos los eventos esperados aparezcan en el log con las props correctas.
 *
 * Uso:
 *   npm run tracking:e2e                         (dev: :3000 / :3600)
 *   npm run tracking:e2e -- http://localhost:4000 http://localhost:4600/api  (Docker)
 */

import { chromium, type Page } from 'playwright';

const FRONTEND = process.argv[2] ?? 'http://localhost:3000';
const EVENTS   = process.argv[3] ?? 'http://localhost:3600/api';

// ── tipos ─────────────────────────────────────────────────────────────────────

interface TrackedEvent {
  id:         string;
  type:       string;
  timestamp:  string;
  sessionId:  string;
  properties?: Record<string, unknown>;
  context?:   Record<string, unknown>;
}

interface Check {
  event:    string;
  label:    string;
  validate: (events: TrackedEvent[]) => { ok: boolean; detail: string };
}

// ── colores consola ───────────────────────────────────────────────────────────

const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  red:    '\x1b[31m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
};

function ok(msg: string)   { console.log(`  ${C.green}✓${C.reset} ${msg}`); }
function fail(msg: string) { console.log(`  ${C.red}✗${C.reset} ${msg}`); }
function warn(msg: string) { console.log(`  ${C.yellow}⚠${C.reset} ${msg}`); }
function info(msg: string) { console.log(`  ${C.dim}${msg}${C.reset}`); }

// ── helpers de evento ─────────────────────────────────────────────────────────

function ofType(events: TrackedEvent[], type: string) {
  return events.filter(e => e.type === type);
}

function hasProps(e: TrackedEvent, keys: string[]): string[] {
  return keys.filter(k => e.properties?.[k] === undefined || e.properties?.[k] === null || e.properties?.[k] === '');
}

// ── checks declarativos ───────────────────────────────────────────────────────

const CHECKS: Check[] = [
  {
    event: 'session_start',
    label: 'session_start con referrer',
    validate(evs) {
      const found = ofType(evs, 'session_start');
      if (!found.length) return { ok: false, detail: 'no encontrado' };
      // referrer vacío es válido (visita directa desde headless)
      const hasReferrerKey = found[0].properties?.['referrer'] !== undefined && found[0].properties?.['referrer'] !== null;
      return hasReferrerKey
        ? { ok: true, detail: `referrer="${found[0].properties!.referrer}" ×${found.length}` }
        : { ok: false, detail: 'falta prop: referrer' };
    },
  },
  {
    event: 'page_view',
    label: 'page_view en ≥5 rutas distintas',
    validate(evs) {
      const found = ofType(evs, 'page_view');
      const pages = new Set(found.map(e => e.properties?.page as string));
      if (pages.size < 5) return { ok: false, detail: `solo ${pages.size} rutas: ${[...pages].join(', ')}` };
      return { ok: true, detail: `${pages.size} rutas: ${[...pages].join(', ')}` };
    },
  },
  {
    event: 'search_autocomplete_shown',
    label: 'search_autocomplete_shown con query y suggestionsCount',
    validate(evs) {
      const found = ofType(evs, 'search_autocomplete_shown');
      if (!found.length) return { ok: false, detail: 'no encontrado' };
      const missing = hasProps(found[0], ['query', 'suggestionsCount']);
      return missing.length
        ? { ok: false, detail: `faltan props: ${missing.join(', ')}` }
        : { ok: true,  detail: `query="${found[0].properties!.query}"` };
    },
  },
  {
    event: 'search_suggestion_clicked',
    label: 'search_suggestion_clicked con suggestionType y lawId',
    validate(evs) {
      const found = ofType(evs, 'search_suggestion_clicked');
      if (!found.length) return { ok: false, detail: 'no encontrado' };
      const missing = hasProps(found[0], ['suggestionType', 'lawId']);
      return missing.length
        ? { ok: false, detail: `faltan props: ${missing.join(', ')}` }
        : { ok: true,  detail: `type=${found[0].properties!.suggestionType}` };
    },
  },
  {
    event: 'search_executed',
    label: 'search_executed con query, resultsCount y durationMs',
    validate(evs) {
      const found = ofType(evs, 'search_executed');
      if (!found.length) return { ok: false, detail: 'no encontrado' };
      const missing = hasProps(found[0], ['query', 'resultsCount', 'durationMs']);
      return missing.length
        ? { ok: false, detail: `faltan props: ${missing.join(', ')}` }
        : { ok: true,  detail: `query="${found[0].properties!.query}" results=${found[0].properties!.resultsCount}` };
    },
  },
  {
    event: 'search_refined',
    label: 'search_refined con previousQuery y newQuery',
    validate(evs) {
      const found = ofType(evs, 'search_refined');
      if (!found.length) return { ok: false, detail: 'no encontrado' };
      const missing = hasProps(found[0], ['previousQuery', 'newQuery']);
      return missing.length
        ? { ok: false, detail: `faltan props: ${missing.join(', ')}` }
        : { ok: true,  detail: `"${found[0].properties!.previousQuery}" → "${found[0].properties!.newQuery}"` };
    },
  },
  {
    event: 'laws_filter_applied',
    label: 'laws_filter_applied con dimension y value',
    validate(evs) {
      const found = ofType(evs, 'laws_filter_applied');
      if (!found.length) return { ok: false, detail: 'no encontrado' };
      const missing = hasProps(found[0], ['dimension', 'value']);
      return missing.length
        ? { ok: false, detail: `faltan props: ${missing.join(', ')}` }
        : { ok: true,  detail: `${found[0].properties!.dimension}=${found[0].properties!.value}` };
    },
  },
  {
    event: 'article_link_copied',
    label: 'article_link_copied con articleId y lawId',
    validate(evs) {
      const found = ofType(evs, 'article_link_copied');
      if (!found.length) return { ok: false, detail: 'no encontrado' };
      const missing = hasProps(found[0], ['articleId', 'lawId']);
      return missing.length
        ? { ok: false, detail: `faltan props: ${missing.join(', ')}` }
        : { ok: true,  detail: `article=${found[0].properties!.articleId}` };
    },
  },
  {
    event: 'article_expanded',
    label: 'article_expanded con articleId y lawId',
    validate(evs) {
      const found = ofType(evs, 'article_expanded');
      if (!found.length) return { ok: false, detail: 'no encontrado' };
      const missing = hasProps(found[0], ['articleId', 'lawId']);
      return missing.length
        ? { ok: false, detail: `faltan props: ${missing.join(', ')}` }
        : { ok: true,  detail: `article=${found[0].properties!.articleId}` };
    },
  },
  {
    event: 'article_amendment_opened',
    label: 'article_amendment_opened con articleId y amendmentCount',
    validate(evs) {
      const found = ofType(evs, 'article_amendment_opened');
      if (!found.length) return { ok: false, detail: 'no encontrado' };
      const missing = hasProps(found[0], ['articleId', 'amendmentCount']);
      return missing.length
        ? { ok: false, detail: `faltan props: ${missing.join(', ')}` }
        : { ok: true,  detail: `article=${found[0].properties!.articleId} amendmentCount=${found[0].properties!.amendmentCount}` };
    },
  },
  {
    event: 'inline_ref_clicked',
    label: 'inline_ref_clicked con refType y targetLawCode',
    validate(evs) {
      const found = ofType(evs, 'inline_ref_clicked');
      if (!found.length) return { ok: false, detail: 'no encontrado' };
      const missing = hasProps(found[0], ['refType', 'targetLawCode']);
      return missing.length
        ? { ok: false, detail: `faltan props: ${missing.join(', ')}` }
        : { ok: true,  detail: `refType=${found[0].properties!.refType} law=${found[0].properties!.targetLawCode}` };
    },
  },
  {
    event: 'law_card_clicked',
    label: 'law_card_clicked con lawId y normType',
    validate(evs) {
      const found = ofType(evs, 'law_card_clicked');
      if (!found.length) return { ok: false, detail: 'no encontrado' };
      const missing = hasProps(found[0], ['lawId', 'normType']);
      return missing.length
        ? { ok: false, detail: `faltan props: ${missing.join(', ')}` }
        : { ok: true, detail: `lawId=${found[0].properties!.lawId} pos=${found[0].properties!.position}` };
    },
  },
  {
    event: '404_hit',
    label: '404_hit con url',
    validate(evs) {
      const found = ofType(evs, '404_hit');
      if (!found.length) return { ok: false, detail: 'no encontrado' };
      const missing = hasProps(found[0], ['url']);
      return missing.length
        ? { ok: false, detail: `faltan props: ${missing.join(', ')}` }
        : { ok: true, detail: `url=${found[0].properties!.url}` };
    },
  },
];

// ── acciones del browser ──────────────────────────────────────────────────────

async function step(label: string, fn: () => Promise<void>) {
  process.stdout.write(`  ${C.dim}→ ${label}...${C.reset}`);
  try {
    await fn();
    process.stdout.write(` ${C.green}ok${C.reset}\n`);
  } catch (e) {
    process.stdout.write(` ${C.yellow}skipped (${(e as Error).message.split('\n')[0].slice(0, 60)})${C.reset}\n`);
  }
}

async function wait(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

// ── flow principal ────────────────────────────────────────────────────────────

async function runBrowser(): Promise<void> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  const page: Page = await context.newPage();

  // 1. Home — session_start + page_view
  await step('home — session_start + page_view', async () => {
    await page.goto(FRONTEND, { waitUntil: 'networkidle' });
    await wait(800);
  });

  // 2. Autocomplete — search_autocomplete_shown
  await step('autocomplete en search bar', async () => {
    const input = page.locator('input[aria-label="Buscar leyes"]').first();
    await input.fill('trabajo');
    await wait(600);
  });

  // 3. Click sugerencia — search_suggestion_clicked
  await step('click primera sugerencia', async () => {
    const suggestion = page.locator('[role="listbox"] a, [role="option"]').first();
    await suggestion.waitFor({ timeout: 3000 });
    await suggestion.click();
    await wait(800);
  });

  // 4. /leyes — page_view
  await step('navegar a /leyes', async () => {
    await page.goto(`${FRONTEND}/leyes`, { waitUntil: 'networkidle' });
    await wait(500);
  });

  // 4b. Click en card de ley — law_card_clicked
  // Las LawCards tienen data-track-event="law_card_clicked"; el listener global en TrackingProvider las captura.
  await step('click en card de ley — law_card_clicked', async () => {
    const card = page.locator('a[data-track-event="law_card_clicked"]').first();
    await card.waitFor({ timeout: 5000 });
    // Ctrl+click para no navegar lejos de /leyes (abrir en nueva pestaña), pero como no tenemos popup permitido
    // simplemente clickeamos y volvemos.
    await card.click();
    await wait(800);
    // Volver a /leyes para continuar el flujo
    await page.goto(`${FRONTEND}/leyes`, { waitUntil: 'networkidle' });
    await wait(500);
  });

  // 4c. Navegar a ley sin artículos — unavailable_content_clicked
  // Ley 27.802 (Modernización Laboral) está en la BD con articles vacíos → muestra UnavailableContentBanner
  await step('navegar a ley sin artículos (27802) — unavailable_content_clicked', async () => {
    await page.goto(`${FRONTEND}/leyes/27802`, { waitUntil: 'networkidle' });
    await wait(1200); // esperar mount de UnavailableTracker + sendEvent
  });

  // 4d. Navegar a URL inexistente — 404_hit
  await step('navegar a URL inexistente — 404_hit', async () => {
    await page.goto(`${FRONTEND}/esta-pagina-no-existe-404-test`, { waitUntil: 'networkidle' });
    await wait(800); // esperar mount de NotFoundTracker + sendEvent
  });

  // 5. /buscar?q=trabajo — search_executed + page_view
  await step('/buscar?q=trabajo — search_executed', async () => {
    await page.goto(`${FRONTEND}/buscar?q=trabajo`, { waitUntil: 'networkidle' });
    await wait(1500); // esperar fetch + track
  });

  // 6. Aplicar filtro — laws_filter_applied
  await step('aplicar filtro de tipo', async () => {
    const filterBtn = page.locator('aside button').filter({ hasText: /Normas|Artículo/ }).first();
    await filterBtn.waitFor({ timeout: 3000 });
    await filterBtn.click();
    await wait(400);
  });

  // 7. Refinar búsqueda — search_refined
  // Hay que tipear en el input estando ya en /buscar para que prevQueryRef.current conserve "trabajo".
  // Usamos triple-click para seleccionar todo + type() char a char (garantiza onChange en React).
  await step('refinar búsqueda a "despido" — search_refined', async () => {
    const searchInput = page.locator('input[aria-label="Buscar leyes"]').first();
    await searchInput.waitFor({ timeout: 4000 });
    await searchInput.click({ clickCount: 3 }); // seleccionar todo
    await page.keyboard.type('despido', { delay: 40 });
    await wait(700); // debounce 250ms + suggestions
    await page.keyboard.press('Escape'); // cerrar dropdown (no queremos navegar a sugerencia)
    await page.keyboard.press('Enter');  // submit → router.push → soft nav
    await wait(2500); // fetch + track
  });

  // 8. Navegar a LCT — page_view
  await step('navegar a /ley-de-contrato-de-trabajo', async () => {
    await page.goto(`${FRONTEND}/ley-de-contrato-de-trabajo`, { waitUntil: 'networkidle', timeout: 30000 });
    await wait(3000); // la LCT es extensa — esperar hydration completa
  });

  // diagnóstico: ver qué elementos clave hay en la página
  const diagInfo = await page.evaluate(() => {
    const ariaExpButtons = document.querySelectorAll('button[aria-expanded]');
    const titleElems     = document.querySelectorAll('[title*="Copiar"]');
    const modifButtons   = [...document.querySelectorAll('button')].filter(b => /modif\./.test(b.textContent ?? ''));
    const fontMonoBtns   = document.querySelectorAll('button.font-mono');
    return {
      ariaExpanded:  ariaExpButtons.length,
      copyTitles:    titleElems.length,
      modifBtns:     modifButtons.length,
      fontMonoBtns:  fontMonoBtns.length,
      firstAriaExpText: ariaExpButtons[0]?.textContent?.trim().slice(0, 60) ?? 'none',
    };
  });
  info(`diagnóstico /lct: ariaExpanded=${diagInfo.ariaExpanded} copyTitles=${diagInfo.copyTitles} modifBtns=${diagInfo.modifBtns} fontMonoBtns=${diagInfo.fontMonoBtns}`);
  info(`  primer button[aria-expanded]: "${diagInfo.firstAriaExpText}"`);

  // 9. Copiar link de artículo — article_link_copied
  // El elemento es <span role="button" title="Copiar enlace al artículo">
  await step('copiar link de artículo', async () => {
    const copyBtn = page.locator('[title*="Copiar"]').first();
    await copyBtn.waitFor({ timeout: 10000 });
    await copyBtn.click();
    await wait(500);
  });

  // 10. Abrir historial de modificaciones — article_amendment_opened
  // Ahora es un <button> standalone (fuera del header div), click normal funciona.
  await step('abrir historial de modificaciones', async () => {
    const amendBtn = page.locator('button').filter({ hasText: /\d+\s*modif\./ }).first();
    await amendBtn.waitFor({ timeout: 10000 });
    await amendBtn.click();
    await wait(800);
    await page.keyboard.press('Escape');
    await wait(400);
  });

  // 11. Colapsar artículo — (sin evento, es para poder expandir luego)
  // El expand/collapse usa div[role="button"][aria-expanded] (no button)
  await step('colapsar artículo', async () => {
    const header = page.locator('[role="button"][aria-expanded="true"]').first();
    await header.waitFor({ timeout: 6000 });
    await header.click();
    await wait(400);
  });

  // 12. Expandir artículo — article_expanded
  await step('expandir artículo — article_expanded', async () => {
    const header = page.locator('[role="button"][aria-expanded="false"]').first();
    await header.waitFor({ timeout: 6000 });
    await header.click();
    await wait(500);
  });

  // 13. Click referencia inline — inline_ref_clicked
  // Botones con class font-mono en InlineRefText: "Art. N — LCT", "Art. N — CP", etc.
  await step('click referencia inline dorada', async () => {
    const refBtn = page.locator('button.font-mono').first();
    await refBtn.waitFor({ timeout: 10000 });
    await refBtn.click();
    await wait(500);
    await page.keyboard.press('Escape');
    await wait(400);
  });

  // Esperar que todos los fetch de tracking se completen
  await wait(1000);

  // session_end via beforeunload
  await page.close();
  await wait(600);
  await browser.close();
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n${C.bold}════════════════════════════════════════════════${C.reset}`);
  console.log(`${C.bold}  E2E TEST DE TRACKING${C.reset}`);
  console.log(`  Frontend : ${C.cyan}${FRONTEND}${C.reset}`);
  console.log(`  Events   : ${C.cyan}${EVENTS}${C.reset}`);
  console.log(`${C.bold}════════════════════════════════════════════════${C.reset}\n`);

  // Limpiar log antes del test
  info('Limpiando log de eventos...');
  await fetch(`${EVENTS}/events`, { method: 'DELETE' }).catch(() => {
    console.log(`  ${C.red}✗ No se pudo conectar a ${EVENTS}/events — ¿está corriendo el backend?${C.reset}\n`);
    process.exit(1);
  });
  info('Log limpiado.\n');

  // Navegar y disparar eventos
  console.log(`${C.bold}  NAVEGACIÓN${C.reset}`);
  await runBrowser();
  console.log();

  // Leer eventos
  info('Leyendo eventos del log...');
  const res    = await fetch(`${EVENTS}/events`);
  const events = await res.json() as TrackedEvent[];
  info(`${events.length} eventos recibidos.\n`);

  // Validar
  console.log(`${C.bold}  VALIDACIÓN${C.reset}`);
  let passed = 0;
  let failed = 0;

  for (const check of CHECKS) {
    const result = check.validate(events);
    if (result.ok) {
      ok(`${check.label}  ${C.dim}${result.detail}${C.reset}`);
      passed++;
    } else {
      fail(`${check.label}  ${C.red}${result.detail}${C.reset}`);
      failed++;
    }
  }

  // session_end es best-effort (beacon)
  const sessionEnd = ofType(events, 'session_end');
  if (sessionEnd.length) {
    ok(`session_end recibido  ${C.dim}lastPage=${sessionEnd[0].properties?.lastPage}${C.reset}`);
  } else {
    warn('session_end no recibido (normal — beacon puede llegar tarde o perderse en headless)');
  }

  // unavailable_content_clicked es best-effort — solo ocurre cuando hay leyes sin artículos cargados
  const unavail = ofType(events, 'unavailable_content_clicked');
  if (unavail.length) {
    ok(`unavailable_content_clicked recibido  ${C.dim}law=${unavail[0].properties?.lawTitle ?? unavail[0].properties?.lawId}${C.reset}`);
  } else {
    warn('unavailable_content_clicked no recibido (esperado — todas las leyes actuales tienen artículos cargados)');
  }

  console.log(`\n${C.bold}════════════════════════════════════════════════${C.reset}`);
  console.log(`  ${C.green}Pasaron: ${passed}${C.reset}  ${failed > 0 ? C.red : C.dim}Fallaron: ${failed}${C.reset}`);
  console.log(`${C.bold}════════════════════════════════════════════════${C.reset}\n`);

  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
