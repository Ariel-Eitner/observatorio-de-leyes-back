/**
 * report-all.ts — Corre todos los audits, genera un reporte HTML unificado
 * y lo abre en el browser.
 *
 * Uso: npm run report:all
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const REPORTS_DIR = path.join(__dirname, '..', 'reports');
if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });

function run(label: string, cmd: string): { label: string; output: string; ok: boolean } {
  console.log(`\n▶ Corriendo: ${label}...`);
  try {
    const output = execSync(cmd, { encoding: 'utf-8', cwd: path.join(__dirname, '..') });
    console.log(`  ✓ ${label} completado`);
    return { label, output, ok: true };
  } catch (err: unknown) {
    const e = err as { stdout?: string; stderr?: string; message?: string };
    const output = (e.stdout ?? '') + (e.stderr ?? '');
    console.log(`  ✗ ${label} con errores`);
    return { label, output, ok: false };
  }
}

function stripAnsi(str: string): string {
  return str.replace(/\x1b\[[0-9;]*m/g, '').replace(/\x1b\[[0-9]*[A-Z]/g, '');
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function ansiToHtml(str: string): string {
  const clean = escapeHtml(str);
  return clean
    .replace(/✓/g, '<span class="ok">✓</span>')
    .replace(/✗/g, '<span class="fail">✗</span>')
    .replace(/⚠/g, '<span class="warn">⚠</span>')
    .replace(/★/g, '<span class="star">★</span>')
    .replace(/(PASS|FAIL|ERROR)/g, (m) =>
      m === 'PASS' ? '<span class="ok">PASS</span>' :
      m === 'FAIL' ? '<span class="fail">FAIL</span>' :
      '<span class="warn">ERROR</span>'
    );
}

// ── Correr todos los audits ───────────────────────────────────────────────────

const results = [
  run('Dashboard General',     'npx ts-node --project tsconfig.json -r tsconfig-paths/register scripts/audit.ts'),
  run('Cobertura de Artículos','npx ts-node --project tsconfig.json -r tsconfig-paths/register scripts/audit-coverage.ts'),
  run('Calidad de Contenido',  'npx ts-node --project tsconfig.json -r tsconfig-paths/register scripts/audit-quality.ts'),
];

// ── Generar reporte HTML unificado ────────────────────────────────────────────

const now = new Date().toLocaleString('es-AR', {
  dateStyle: 'full', timeStyle: 'short', timeZone: 'America/Argentina/Buenos_Aires',
});

const sections = results.map((r) => {
  const statusClass = r.ok ? 'ok' : 'fail';
  const statusLabel = r.ok ? '✓ OK' : '✗ Errores';
  return `
    <details open>
      <summary>
        <span class="${statusClass}">${statusLabel}</span>
        <strong>${escapeHtml(r.label)}</strong>
      </summary>
      <pre>${ansiToHtml(stripAnsi(r.output))}</pre>
    </details>`;
}).join('\n');

const allOk = results.every((r) => r.ok);
const overallClass = allOk ? 'ok' : 'fail';
const overallLabel = allOk ? '✓ Todo en orden' : '✗ Hay errores — revisar secciones marcadas';

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Observatorio de Leyes — Reporte de Auditoría</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0d1117; color: #c9d1d9; line-height: 1.6; }
    .header { background: #161b22; border-bottom: 1px solid #30363d; padding: 24px 32px; display: flex; align-items: center; justify-content: space-between; }
    .header h1 { font-size: 1.25rem; font-weight: 700; color: #f0f6fc; }
    .header h1 span { color: #c9a227; }
    .header .meta { font-size: 0.75rem; color: #8b949e; }
    .overall { padding: 16px 32px; font-size: 0.875rem; font-weight: 600; border-bottom: 1px solid #30363d; }
    .overall.ok { background: rgba(35,134,54,.1); color: #3fb950; }
    .overall.fail { background: rgba(248,81,73,.1); color: #f85149; }
    .content { padding: 24px 32px; max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
    details { background: #161b22; border: 1px solid #30363d; border-radius: 8px; overflow: hidden; }
    summary { padding: 12px 16px; cursor: pointer; display: flex; align-items: center; gap-10px; font-size: 0.875rem; user-select: none; }
    summary:hover { background: #1c2128; }
    summary strong { margin-left: 8px; color: #f0f6fc; }
    pre { padding: 16px; font-family: 'Cascadia Code', 'Consolas', monospace; font-size: 0.75rem; overflow-x: auto; white-space: pre-wrap; border-top: 1px solid #30363d; background: #0d1117; color: #c9d1d9; line-height: 1.5; }
    .ok  { color: #3fb950; }
    .fail { color: #f85149; }
    .warn { color: #d29922; }
    .star { color: #c9a227; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Observatorio de Leyes — <span>Reporte de Auditoría</span></h1>
    <div class="meta">${now}</div>
  </div>
  <div class="overall ${overallClass}">${overallLabel}</div>
  <div class="content">${sections}</div>
</body>
</html>`;

const reportPath = path.join(REPORTS_DIR, 'audit-report.html');
fs.writeFileSync(reportPath, html, 'utf-8');
console.log(`\n📄 Reporte HTML generado: ${reportPath}`);

// ── Abrir en browser ──────────────────────────────────────────────────────────

try {
  execSync(`start "" "${reportPath}"`, { shell: 'cmd.exe' });
  console.log('🌐 Abriendo reporte en el browser...');
} catch {
  console.log(`Para abrirlo manualmente: ${reportPath}`);
}
