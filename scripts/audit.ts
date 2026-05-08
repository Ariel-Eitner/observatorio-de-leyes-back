/**
 * Dashboard general — visión de alto nivel del estado del proyecto.
 * Uso: npm run audit
 *
 * Para análisis específico:
 *   npm run audit:coverage  → artículos faltantes + estructura
 *   npm run audit:quality   → metadata + calidad de artículos/segmentos
 *   npm run audit:norm      → normalización de texto con detalle completo
 */

import {
  C, col, bar, miniBar, scoreGauge, warn, padEnd,
  section, divider, header, footer,
  DATA_DIR, checkFileStructure, loadLaws, analyzeLaw,
  walkDirNorm, countAllTsFiles, normProgressBar, NORM_RULE_ORDER,
} from './audit-lib';
import type { NormViolation } from './audit-lib';

function main() {
  header('AUDITORÍA — DASHBOARD GENERAL');

  // ── 1. Estructura de archivos ────────────────────────────────────────────────
  section('ESTRUCTURA DE ARCHIVOS');
  const fileReports  = checkFileStructure();
  const missingFiles: string[] = [];
  for (const [id, r] of fileReports) {
    if (!r.isDirectory) { console.log(`  ${C.green}✓${C.reset} ${C.dim}${id} (archivo único)${C.reset}`); continue; }
    const issues: string[] = [];
    if (!r.hasMetadata) issues.push('metadata.ts');
    if (!r.hasArticles) issues.push('articles/');
    if (!r.hasIndex)    issues.push('index.ts');
    if (issues.length > 0) {
      console.log(`  ${C.red}✗${C.reset} ${id.padEnd(38)} ${C.red}faltan: ${issues.join(', ')}${C.reset}`);
      missingFiles.push(id);
    } else {
      console.log(`  ${C.green}✓${C.reset} ${id}`);
    }
  }
  if (missingFiles.length === 0)
    console.log(`\n  ${C.green}${C.bold}Todos los directorios tienen la estructura requerida.${C.reset}`);

  // ── 2. Cobertura de artículos ────────────────────────────────────────────────
  const laws    = loadLaws();
  const reports = laws.map(analyzeLaw);

  section(`COBERTURA DE ARTÍCULOS (${laws.length} normas)`);
  console.log(`  ${C.dim}${'Norma'.padEnd(38)}${'Decl.'.padEnd(7)}${'Carg.'.padEnd(7)}${'Falt.'.padEnd(7)}Cobertura${C.reset}`);
  divider(85);
  for (const r of reports) {
    const name    = (r.law.commonName ?? r.law.title).slice(0, 36).padEnd(37);
    const faltCol = r.missingNums.length > 0
      ? `${C.yellow}${String(r.missingNums.length).padEnd(6)}${C.reset}`
      : `${C.dim}${'—'.padEnd(6)}${C.reset}`;
    console.log(`  ${name} ${String(r.declared).padEnd(6)} ${String(r.actual).padEnd(6)} ${faltCol} ${bar(r.actual, r.declared)}`);
  }

  // ── 3. Health score ranking ──────────────────────────────────────────────────
  section('SCORE DE SALUD  (cobertura 40% · metadata 25% · explicaciones 20% · títulos 10% · enmiendas 5%)');
  const ranked = [...reports].sort((a, b) => b.healthScore - a.healthScore);
  for (const r of ranked) {
    const name = (r.law.commonName ?? r.law.title).slice(0, 36).padEnd(37);
    console.log(`  ${name} ${scoreGauge(r.healthScore)}`);
  }

  // ── 4. Distribución de salud ─────────────────────────────────────────────────
  section('DISTRIBUCIÓN DE SALUD');
  const buckets = [
    { label: '90–100 %  ★ Excelente', min: 90, max: 101 },
    { label: '70–89  %  ◆ Buena    ', min: 70, max: 90  },
    { label: '50–69  %  ◇ Parcial  ', min: 50, max: 70  },
    { label: '0–49   %  ✗ Crítica  ', min: 0,  max: 50  },
  ];
  const maxBucket = Math.max(...buckets.map((b) => reports.filter((r) => r.healthScore >= b.min && r.healthScore < b.max).length));
  for (const b of buckets) {
    const count = reports.filter((r) => r.healthScore >= b.min && r.healthScore < b.max).length;
    const barW  = maxBucket > 0 ? Math.round((count / maxBucket) * 30) : 0;
    const c     = b.min >= 90 ? C.green : b.min >= 70 ? C.cyan : b.min >= 50 ? C.yellow : C.red;
    console.log(`  ${b.label}  ${c}${'█'.repeat(barW)}${C.reset}  ${count}`);
  }

  // ── 5. Resumen global ────────────────────────────────────────────────────────
  const totalDeclared  = reports.reduce((s, r) => s + r.declared,           0);
  const totalActual    = reports.reduce((s, r) => s + r.actual,             0);
  const totalMissing   = reports.reduce((s, r) => s + r.missingNums.length, 0);
  const totalSegs      = reports.reduce((s, r) => s + r.segQ.total,         0);
  const totalSegNoExpl = reports.reduce((s, r) => s + r.segQ.noExplanation, 0);
  const totalAmend     = reports.reduce((s, r) => s + r.amendmentCount,     0);
  const avgMeta        = reports.reduce((s, r) => s + r.metaScore,          0) / reports.length;
  const avgHealth      = Math.round(reports.reduce((s, r) => s + r.healthScore, 0) / reports.length);
  const lawsExcellent  = reports.filter((r) => r.healthScore >= 90).length;
  const lawsGood       = reports.filter((r) => r.healthScore >= 70 && r.healthScore < 90).length;
  const lawsPartial    = reports.filter((r) => r.healthScore >= 50 && r.healthScore < 70).length;
  const lawsCritical   = reports.filter((r) => r.healthScore < 50).length;

  section('RESUMEN GLOBAL');
  console.log(`  ${C.bold}Normas auditadas:         ${laws.length}${C.reset}`);
  console.log(`  Artículos declarados:     ${totalDeclared.toLocaleString('es-AR')}`);
  console.log(`  Artículos cargados:       ${totalActual.toLocaleString('es-AR')}`);
  console.log(`  Artículos faltantes:      ${totalMissing > 0 ? C.yellow : C.dim}${totalMissing.toLocaleString('es-AR')}${C.reset}`);
  console.log(`  Cobertura total:          ${bar(totalActual, totalDeclared, 30)}`);
  console.log(`  Segmentos totales:        ${totalSegs.toLocaleString('es-AR')}`);
  console.log(`  Segmentos sin explicar:   ${totalSegNoExpl > 0 ? C.yellow : C.dim}${totalSegNoExpl.toLocaleString('es-AR')}${C.reset}`);
  console.log(`  Enmiendas registradas:    ${totalAmend.toLocaleString('es-AR')}`);
  console.log(`  Completitud de metadata:  ${bar(Math.round(avgMeta * 100), 100, 20)}`);
  console.log(`  Health score promedio:    ${scoreGauge(avgHealth)}`);
  console.log();
  console.log(`  ${C.green}★ Excelentes (≥90):  ${lawsExcellent}${C.reset}`);
  console.log(`  ${C.cyan}◆ Buenas  (70–89):  ${lawsGood}${C.reset}`);
  console.log(`  ${C.yellow}◇ Parciales(50–69): ${lawsPartial}${C.reset}`);
  console.log(`  ${C.red}✗ Críticas  (<50):  ${lawsCritical}${C.reset}`);
  if (missingFiles.length > 0)
    console.log(`\n  ${C.red}✗ Directorios incompletos: ${missingFiles.join(', ')}${C.reset}`);

  // ── 6. Normalización — resumen ───────────────────────────────────────────────
  section('NORMALIZACIÓN DE TEXTO');
  const normViolations: NormViolation[] = [];
  const normTotal = countAllTsFiles(DATA_DIR);
  let normProcessed = 0;
  process.stdout.write(`  Escaneando archivos... [${'░'.repeat(28)}]   0% (0/${normTotal})`);
  const normFiles = walkDirNorm(DATA_DIR, normViolations, (name) => {
    normProcessed++;
    const pct = Math.round((normProcessed / normTotal) * 100);
    const b   = normProgressBar(normProcessed, normTotal);
    process.stdout.write(`\r  Escaneando archivos... [${b}] ${String(pct).padStart(3)}% (${normProcessed}/${normTotal}) ${C.dim}${name.slice(0, 22).padEnd(22)}${C.reset}`);
  });
  process.stdout.write('\r' + ' '.repeat(100) + '\r');

  if (normViolations.length === 0) {
    console.log(`  ${C.green}✓ Sin violaciones en ${normFiles} archivos.${C.reset}`);
  } else {
    const byRule = new Map<string, NormViolation[]>();
    for (const v of normViolations) {
      if (!byRule.has(v.ruleId)) byRule.set(v.ruleId, []);
      byRule.get(v.ruleId)!.push(v);
    }
    console.log(`  ${C.dim}${'Regla'.padEnd(8)}${'Descripción'.padEnd(55)}${'Violaciones'.padEnd(14)}Archivos${C.reset}`);
    divider(88);
    for (const ruleId of NORM_RULE_ORDER) {
      const items = byRule.get(ruleId);
      if (!items || items.length === 0) continue;
      const filesAff = new Set(items.map((i) => i.file)).size;
      const c        = items.length > 50 ? C.red : items.length > 10 ? C.yellow : C.green;
      console.log(`  ${c}${`[${ruleId}]`.padEnd(8)}${C.reset} ${items[0].desc.slice(0, 53).padEnd(55)} ${c}${String(items.length).padEnd(14)}${C.reset}${filesAff}`);
    }
    const normFilesWithErrors = new Set(normViolations.map((v) => v.file)).size;
    console.log();
    console.log(`  ${C.dim}Total: ${normViolations.length} violaciones en ${normFilesWithErrors}/${normFiles} archivos — detalle: npm run audit:norm${C.reset}`);
  }

  footer();
  process.exit(lawsCritical > 0 || missingFiles.length > 0 ? 1 : 0);
}

main();
