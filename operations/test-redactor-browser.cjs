// Browser regression over the real Next BFF/UI with an isolated, synthetic HTTP fixture.
// PostgreSQL correctness is covered independently by redactor.integration.spec.ts.
const { createServer } = require('node:http');
const { spawn, spawnSync } = require('node:child_process');
const { createHmac } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const backend = 'http://127.0.0.1:4780/api', front = 'http://127.0.0.1:4781';
const root = path.resolve(__dirname, '..'), frontend = path.resolve(root, '../observatorio-de-leyes-frontend');
const work = path.join(root, '.local/redactor-browser'); fs.mkdirSync(work, { recursive: true });
const secret = 'synthetic-redactor-ip-signature';
const user = { id: 'fixture-owner', email: 'redactor@example.test', nombre: 'Prueba', plan: 'pro', planUntil: null, isFounder: false, isAdmin: false, roles: [] };
const norms = [
  { id: 'constitucion-nacional', number: '', title: 'Constitución Nacional', url: '/constituciones/nacional', status: 'VIGENTE' },
  { id: 'const-chaco', number: '', title: 'Constitución de Chaco', url: '/constituciones/chaco', status: 'VIGENTE' },
  { id: 'const-caba', number: '', title: 'Constitución de la Ciudad Autónoma de Buenos Aires', url: '/constituciones/caba', status: 'VIGENTE' },
];
const text = 'Texto oficial sintético para probar la igualdad. '.repeat(10) + 'FINAL ÍNTEGRO DE PRUEBA';
const article = { id: 'fixture-a7', lawId: 'constitucion-nacional', number: '7', title: 'Igualdad', order: 7,
  preview: text.slice(0, 160), hasText: true, status: 'VIGENTE', normStatus: 'VIGENTE', derogated: false };
const emptyContent = JSON.stringify({ type: 'doc', content: [{ type: 'paragraph' }] });
const documents = new Map(['one', 'two'].map((id, i) => [id, { id, title: `Escrito ${i + 1}`, content: emptyContent, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]));
let failSave = false, failDelete = false, delayed = false, signedRequests = 0, textReads = 0, longText = false;
const savedBodies = [], queryLog = [];
function json(res, value, status = 200) { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(value)); }
const fixture = createServer(async (req, res) => {
  const url = new URL(req.url, backend), p = url.pathname.replace(/^\/api/, '');
  if (p.startsWith('/redactor-search')) {
    const ip = req.headers['x-obs-client-ip'];
    if (ip && req.headers['x-obs-ip-sig'] === createHmac('sha256', secret).update(ip).digest('hex')) signedRequests++;
    queryLog.push(p + url.search);
  }
  if (p === '/auth/me') return json(res, user);
  if (p === '/exports') return json(res, { ok: true });
  if (p === '/users/me/overview') return json(res, { user, saved: [], folders: { folders: [], limit: 30 } });
  if (p.startsWith('/laws/registry')) return json(res, { slugAliases: {}, stubs: [], categories: [], corpusVersion: 'browser-fixture', laws: [] });
  if (p === '/redactor-search/tokens') return json(res, { tokens: ['cn', '24240'], corpusVersion: 'browser-fixture' });
  if (p.startsWith('/redactor-search/norms/')) return json(res, norms.find(n => n.id === decodeURIComponent(p.split('/').pop())));
  if (p === '/redactor-search/norms') return json(res, { results: norms, nextOffset: null, corpusVersion: 'browser-fixture' });
  if (p === '/redactor-search/articles') {
    const q = url.searchParams.get('q') || '';
    if (q === 'fallo') return json(res, { message: 'rate limited' }, 429);
    if (q === 'demora') { delayed = true; return setTimeout(() => json(res, { results: [{ ...article, number: '99', id: 'stale' }], nextOffset: null }), 1200); }
    return json(res, { results: q === '999' ? [] : [article], nextOffset: null, corpusVersion: 'browser-fixture' });
  }
  if (p.startsWith('/redactor-search/articles/')) { textReads++; return json(res, { ...article, text: longText ? 'X'.repeat(60 * 1024) : text }); }
  if (p === '/redactor-docs' && req.method === 'GET') return json(res, { docs: [...documents.values()].map(({ content, ...meta }) => meta), used: documents.size, limit: 30, nextOffset: null });
  if (p.startsWith('/redactor-docs/')) {
    const id = p.split('/').pop(), doc = documents.get(id);
    if (!doc) return json(res, {}, 404);
    if (req.method === 'GET') return json(res, doc);
    if (req.method === 'DELETE') { if (failDelete) return json(res, {}, 503); documents.delete(id); return json(res, { ok: true }); }
    const chunks = []; for await (const chunk of req) chunks.push(chunk);
    if (failSave) return json(res, {}, 503);
    const patch = JSON.parse(Buffer.concat(chunks).toString()); Object.assign(doc, patch); savedBodies.push({ id, patch }); return json(res, { id, title: doc.title, updatedAt: doc.updatedAt });
  }
  if (p.includes('notifications')) return json(res, { notifications: [], unreadCount: 0, preferences: {} });
  return json(res, {});
});
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
async function until(fn, timeout = 30000) { const end = Date.now() + timeout; while (Date.now() < end) { if (await fn()) return; await wait(200); } throw new Error('Timeout waiting for fixture/UI'); }
let next, browser, page;
(async () => {
  await new Promise(resolve => fixture.listen(4780, '127.0.0.1', resolve));
  const fd = fs.openSync(path.join(work, 'next.log'), 'w');
  next = spawn(process.execPath, [path.join(frontend, 'node_modules/next/dist/bin/next'), 'dev', '--hostname', '127.0.0.1', '--port', '4781', '--webpack'], {
    cwd: frontend, windowsHide: true, stdio: ['ignore', fd, fd], env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1',
      INTERNAL_API_URL: backend, NEXT_PUBLIC_API_URL: backend, NEXT_PUBLIC_SITE_URL: front, ADMIN_SECRET: secret,
      OBS_LOCAL_SANDBOX: 'true', AUTH_COOKIE_SECURE: 'false', NEXT_PUBLIC_MP_PUBLIC_KEY: '' },
  });
  await until(() => fetch(front + '/api/redactor-search/tokens').then(r => r.ok).catch(() => false), 120000);
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, extraHTTPHeaders: { 'x-forwarded-for': '198.51.100.7' } });
  await context.addCookies([{ name: 'obs_at', value: 'fixture-owner-token', url: front }]);
  await context.addInitScript(() => { localStorage.setItem('obs_disclaimer_seen', '1'); });
  await context.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
  page = await context.newPage(); page.setDefaultTimeout(20000);
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto(front + '/herramientas/redactor', { waitUntil: 'domcontentloaded', timeout: 120000 });
  if (await page.getByRole('button', { name: 'Cerrar aviso', exact: true }).isVisible()) await page.getByRole('button', { name: 'Cerrar aviso', exact: true }).click();
  const editor = page.locator('.tiptap[contenteditable=true]'); await editor.waitFor();
  await editor.fill('constitucio\u0301n');
  const panel = page.locator('[data-tour=law-panel]'); await panel.waitFor();
  const choices = panel.locator('button').filter({ hasText: /Constitución/ });
  assert.match(await choices.first().innerText(), /Nacional/);
  await panel.getByRole('button', { name: 'Constitución Nacional', exact: true }).click();
  const input = page.getByLabel('Número o palabras del artículo'); await input.fill('7');
  const articles = page.locator('[data-tour=article-panel]');
  await articles.getByRole('button', { name: '+ pegar el texto del artículo', exact: true }).waitFor();
  assert.equal(textReads, 0, 'suggestions must not download full text');
  assert.equal(await articles.getByText('FINAL ÍNTEGRO DE PRUEBA').count(), 0);
  await input.fill('Art. 7'); await wait(500); await articles.getByRole('button', { name: '+ pegar el texto del artículo', exact: true }).waitFor();
  await input.fill('fallo'); await articles.getByRole('alert').waitFor(); assert.match(await articles.getByRole('alert').innerText(), /varias búsquedas/);
  await input.fill('demora'); await until(() => delayed); await input.fill('7'); await wait(1600);
  assert.equal(await articles.getByText('Art. 99', { exact: true }).count(), 0, 'late responses cannot replace newer results');
  await articles.getByRole('button', { name: '+ pegar el texto del artículo', exact: true }).click();
  await until(() => editor.innerText().then(t => t.includes('FINAL ÍNTEGRO DE PRUEBA'))); assert.equal(textReads, 1);
  assert.equal(await editor.locator('.citation-inline a').getAttribute('href'), front + '/constituciones/nacional/articulo/7');
  assert.ok((await editor.innerText()).startsWith('Constitución Nacional'), 'normalization must not leave characters before the citation');
  await until(() => savedBodies.some(b => b.id === 'one' && b.patch.content?.includes('FINAL ÍNTEGRO DE PRUEBA')));
  assert.ok(signedRequests > 0, 'the real BFF must sign client IP headers');
  failSave = true; await editor.press('End'); await editor.pressSequentially(' CAMBIO PENDIENTE');
  await until(() => page.getByRole('alert').filter({ hasText: 'No pudimos' }).isVisible());
  let navigationPrompt = false;
  page.once('dialog', async dialog => { navigationPrompt = true; await dialog.dismiss(); });
  await page.getByRole('link', { name: 'Planes', exact: true }).first().click();
  await until(() => navigationPrompt); assert.match(page.url(), /herramientas\/redactor/);
  failSave = false; await page.getByRole('alert').filter({ hasText: 'No pudimos' }).getByRole('button', { name: 'Reintentar' }).click();
  await until(() => savedBodies.some(b => b.patch.content?.includes('CAMBIO PENDIENTE')));
  await editor.fill('CN'); await panel.waitFor(); await panel.getByRole('button', { name: 'Constitución Nacional', exact: true }).waitFor();
  await editor.press('Enter'); await input.fill('7'); await articles.getByRole('button', { name: '+ pegar el texto del artículo', exact: true }).waitFor();
  await input.press('Enter'); await until(() => editor.locator('.citation-inline a').count().then(n => n === 1)); assert.equal(textReads, 1);
  await editor.press('End'); await editor.press('Backspace');
  await input.waitFor(); await input.fill('7');
  await articles.getByRole('button', { name: '+ pegar el texto del art\u00edculo', exact: true }).waitFor();
  await input.press('Enter');
  await until(() => articles.count().then(n => n === 0));
  assert.equal(await editor.locator('.citation-inline a').count(), 1, 'replacing an article after Backspace must not duplicate the citation');
  await editor.fill('CN'); await panel.getByRole('button', { name: 'Constitución Nacional', exact: true }).click();
  await input.fill('7'); longText = true;
  await articles.getByRole('button', { name: '+ pegar el texto del artículo', exact: true }).click();
  await articles.getByRole('alert').filter({ hasText: /50 KB/ }).waitFor();
  assert.equal(await editor.innerText(), 'CN', 'oversized article is neither truncated nor partially inserted');
  longText = false; await articles.getByRole('button', { name: 'Cerrar selector de normas' }).click();
  const readsBeforePreview = queryLog.length;
  await page.getByRole('button', { name: 'Vista previa', exact: true }).click();
  await page.getByRole('button', { name: 'Cerrar', exact: true }).waitFor();
  await page.getByRole('button', { name: 'Cerrar', exact: true }).click();
  assert.equal(queryLog.length, readsBeforePreview, 'document preview must not query the normative corpus');
  for (const [label, signature] of [['PDF', '%PDF'], ['Word', 'PK']]) {
    await page.getByRole('button', { name: 'Descargar', exact: true }).click();
    const downloading = page.waitForEvent('download');
    await page.getByRole('button', { name: label, exact: false }).last().click();
    const download = await downloading;
    assert.equal(fs.readFileSync(await download.path()).subarray(0, signature.length).toString(), signature);
  }
  // Rapid document switching must flush the current snapshot before loading a different body.
  await editor.fill('ÚLTIMO CAMBIO ANTES DE CAMBIAR');
  await page.getByRole('button', { name: /^Escrito 2/ }).click();
  await until(() => editor.innerText().then(t => t.trim() === ''));
  await until(() => savedBodies.some(b => b.id === 'one' && b.patch.content?.includes('ÚLTIMO CAMBIO ANTES DE CAMBIAR')));
  failDelete = true;
  await page.getByRole('button', { name: 'Eliminar Escrito 2', exact: true }).click();
  await page.getByRole('alert').waitFor(); assert.ok(documents.has('two'));
  failDelete = false;
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ browser: 'desktop', fullTextReads: textReads, signedRequests, saves: savedBodies.length, assertions: 'ranking, number/text equivalence, previews, paste integrity, 429, cancellation, save recovery, cold acronym, document switching and deletion errors passed' }));
  // Mobile uses a native modal with an editable norm query and Escape/cancel support.
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, extraHTTPHeaders: { 'x-forwarded-for': '198.51.100.8' } });
  await mobile.addCookies([{ name: 'obs_at', value: 'fixture-owner-token', url: front }]);
  await mobile.addInitScript(() => { localStorage.setItem('obs_disclaimer_seen', '1'); });
  await mobile.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
  page = await mobile.newPage(); await page.goto(front + '/herramientas/redactor', { waitUntil: 'domcontentloaded' });
  if (await page.getByRole('button', { name: 'Cerrar aviso', exact: true }).isVisible()) await page.getByRole('button', { name: 'Cerrar aviso', exact: true }).click();
  await page.locator('.tiptap[contenteditable=true]').fill('constitucion');
  await page.getByLabel('Buscar norma').waitFor(); await page.getByLabel('Buscar norma').fill('constitucion nacional');
  await page.locator('[data-tour=law-panel]').getByRole('button', { name: 'Constitución Nacional', exact: true }).click();
  await page.getByLabel('Número o palabras del artículo').fill('7');
  await page.locator('[data-tour=article-panel]').getByRole('button', { name: '+ pegar el texto del artículo', exact: true }).waitFor();
  await page.keyboard.press('Escape'); assert.equal(await page.locator('[data-tour=article-panel]').count(), 0);
  console.log('Mobile: native dialog, query input, article search and Escape passed.');
})().catch(async error => {
  console.error(error.stack || error.message); if (page) await page.screenshot({ path: path.join(work, 'failure.png') }).catch(() => {}); process.exitCode = 1;
}).finally(async () => {
  await browser?.close();
  if (next?.pid) { if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(next.pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore' }); else next.kill(); }
  fixture.closeAllConnections(); fixture.close();
});
