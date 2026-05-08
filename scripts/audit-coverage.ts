/**
 * Auditoría de cobertura y estructura — artículos faltantes, índices, secciones.
 * Uso: npm run audit:coverage
 */

import {
  C, bar, miniBar, padEnd, section, divider, header, footer,
  checkFileStructure, loadLaws, analyzeLaw, toRanges,
} from './audit-lib';

function main() {
  header('AUDITORÍA DE COBERTURA Y ESTRUCTURA');

  // ── Estructura de archivos ───────────────────────────────────────────────────
  section('ESTRUCTURA DE ARCHIVOS — DETALLE');
  const fileReports  = checkFileStructure();
  const missingFiles: string[] = [];
  for (const [id, r] of fileReports) {
    if (!r.isDirectory) { console.log(`  ${C.green}✓${C.reset} ${C.dim}${id} (archivo único)${C.reset}`); continue; }
    const issues: string[] = [];
    if (!r.hasMetadata) issues.push('metadata.ts');
    if (!r.hasArticles) issues.push('articles/ o articles.ts');
    if (!r.hasIndex)    issues.push('index.ts');
    if (issues.length > 0) {
      console.log(`  ${C.red}✗${C.reset} ${id.padEnd(42)} ${C.red}faltan: ${issues.join(', ')}${C.reset}`);
      missingFiles.push(id);
    } else {
      console.log(`  ${C.green}✓${C.reset} ${id}`);
    }
  }

  // ── Cobertura completa ───────────────────────────────────────────────────────
  const laws    = loadLaws();
  const reports = laws.map(analyzeLaw);

  section(`COBERTURA DE ARTÍCULOS (${laws.length} normas)`);
  console.log(`  ${C.dim}${'Norma'.padEnd(38)}${'Decl.'.padEnd(7)}${'Carg.'.padEnd(7)}${'Falt.'.padEnd(7)}${'Dupl.'.padEnd(7)}Cobertura${C.reset}`);
  divider(90);
  for (const r of reports) {
    const name     = (r.law.commonName ?? r.law.title).slice(0, 36).padEnd(37);
    const faltCol  = r.missingNums.length > 0
      ? `${C.yellow}${String(r.missingNums.length).padEnd(6)}${C.reset}`
      : `${C.dim}${'—'.padEnd(6)}${C.reset}`;
    const duplCol  = r.duplicates.length > 0
      ? `${C.red}${String(r.duplicates.length).padEnd(6)}${C.reset}`
      : `${C.dim}${'—'.padEnd(6)}${C.reset}`;
    console.log(`  ${name} ${String(r.declared).padEnd(6)} ${String(r.actual).padEnd(6)} ${faltCol} ${duplCol} ${bar(r.actual, r.declared)}`);
  }

  // ── Artículos faltantes — detalle ────────────────────────────────────────────
  const withMissing = reports.filter((r) => r.missingNums.length > 0);
  if (withMissing.length > 0) {
    section(`ARTÍCULOS FALTANTES — DETALLE (${withMissing.length} normas afectadas)`);
    for (const r of withMissing) {
      const name = r.law.commonName ?? r.law.title;
      const pct  = Math.round((r.missingNums.length / r.declared) * 100);
      console.log(`  ${C.bold}${name}${C.reset}  ${C.dim}(${r.law.id})${C.reset}`);
      console.log(`  ${miniBar(1 - r.missingNums.length / r.declared)} ${r.actual}/${r.declared} cargados — faltan ${C.yellow}${r.missingNums.length}${C.reset} (${pct}% ausente)`);
      if (r.duplicates.length > 0)
        console.log(`    ${C.red}✗ Duplicados: ${r.duplicates.join(', ')}${C.reset}`);
      const rangeStr = toRanges(r.missingNums);
      const chunks   = rangeStr.match(/.{1,100}(, |$)/g) ?? [rangeStr];
      console.log(`    ${C.dim}Faltantes: ${C.reset}${chunks[0].trim()}`);
      for (let i = 1; i < chunks.length; i++) console.log(`               ${chunks[i].trim()}`);
      console.log();
    }
  } else {
    console.log(`\n  ${C.green}✓ Cobertura completa en todas las normas.${C.reset}\n`);
  }

  // ── Índice y secciones ───────────────────────────────────────────────────────
  section('ÍNDICE Y SECCIONES');
  console.log(`  ${C.dim}${'Norma'.padEnd(38)}${'Secciones'.padEnd(16)}${'Arts.'.padEnd(8)}${'Enmiendas'.padEnd(12)}Estado${C.reset}`);
  divider(90);
  for (const r of reports) {
    const name   = (r.law.commonName ?? r.law.title).slice(0, 36).padEnd(37);
    const secStr = r.hasSections
      ? padEnd(`${C.green}${r.sectionCount} sección(es)${C.reset}`, 16)
      : padEnd(`${C.dim}sin índice${C.reset}`, 16);
    const amStr  = r.amendmentCount > 0
      ? padEnd(`${C.cyan}${r.amendmentCount} enm.${C.reset}`, 12)
      : padEnd(`${C.dim}—${C.reset}`, 12);
    const status = r.coverage >= 1 && r.metaScore >= 0.8
      ? `${C.green}completa${C.reset}`
      : r.coverage >= 0.5 ? `${C.yellow}parcial${C.reset}` : `${C.red}crítica${C.reset}`;
    console.log(`  ${name} ${secStr}${String(r.actual).padEnd(8)}${amStr}${status}`);
  }

  // ── Resumen ──────────────────────────────────────────────────────────────────
  section('RESUMEN');
  const totalDeclared = reports.reduce((s, r) => s + r.declared,           0);
  const totalActual   = reports.reduce((s, r) => s + r.actual,             0);
  const totalMissing  = reports.reduce((s, r) => s + r.missingNums.length, 0);
  const totalDupl     = reports.reduce((s, r) => s + r.duplicates.length,  0);
  const withIndex     = reports.filter((r) => r.hasSections).length;
  const withAmend     = reports.filter((r) => r.amendmentCount > 0).length;
  console.log(`  Normas auditadas     : ${laws.length}`);
  console.log(`  Artículos declarados : ${totalDeclared.toLocaleString('es-AR')}`);
  console.log(`  Artículos cargados   : ${totalActual.toLocaleString('es-AR')}`);
  console.log(`  Artículos faltantes  : ${totalMissing > 0 ? C.yellow : C.dim}${totalMissing.toLocaleString('es-AR')}${C.reset}`);
  console.log(`  Duplicados           : ${totalDupl > 0 ? C.red : C.dim}${totalDupl}${C.reset}`);
  console.log(`  Con índice/secciones : ${withIndex}/${laws.length}`);
  console.log(`  Con enmiendas        : ${withAmend}/${laws.length}`);
  if (missingFiles.length > 0)
    console.log(`\n  ${C.red}✗ Directorios incompletos: ${missingFiles.join(', ')}${C.reset}`);

  footer();
  process.exit(totalMissing > 0 || missingFiles.length > 0 ? 1 : 0);
}

main();
