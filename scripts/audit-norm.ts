/**
 * Auditoría de normalización de texto — detalle completo con file:line.
 * Uso: npm run audit:norm
 *
 * Muestra cada violación con su ubicación exacta y el fragmento afectado.
 * Filtrar por regla: npm run audit:norm -- R01
 */

import {
  C, section, divider, header, footer,
  DATA_DIR, walkDirNorm, countAllTsFiles, normProgressBar, NORM_RULE_ORDER,
} from './audit-lib';
import type { NormViolation } from './audit-lib';

function main() {
  const filterRule = process.argv[2]?.toUpperCase();

  header('AUDITORÍA DE NORMALIZACIÓN — DETALLE COMPLETO');

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

  const violations = filterRule
    ? normViolations.filter((v) => v.ruleId === filterRule)
    : normViolations;

  if (violations.length === 0) {
    if (filterRule)
      console.log(`  ${C.green}✓ Sin violaciones para [${filterRule}] en ${normFiles} archivos.${C.reset}\n`);
    else
      console.log(`  ${C.green}✓ Sin violaciones en ${normFiles} archivos.${C.reset}\n`);
    footer();
    process.exit(0);
  }

  const byRule = new Map<string, NormViolation[]>();
  for (const v of violations) {
    if (!byRule.has(v.ruleId)) byRule.set(v.ruleId, []);
    byRule.get(v.ruleId)!.push(v);
  }

  const ruleOrder = filterRule ? [filterRule] : NORM_RULE_ORDER;

  for (const ruleId of ruleOrder) {
    const items = byRule.get(ruleId);
    if (!items || items.length === 0) continue;

    const filesAff = new Set(items.map((i) => i.file)).size;
    section(`[${ruleId}] ${items[0].desc}  —  ${items.length} violaciones · ${filesAff} archivos`);
    divider(88);

    // Agrupar por archivo para lectura más cómoda
    const byFile = new Map<string, NormViolation[]>();
    for (const item of items) {
      if (!byFile.has(item.file)) byFile.set(item.file, []);
      byFile.get(item.file)!.push(item);
    }

    for (const [file, fileItems] of byFile) {
      console.log(`\n  ${C.bold}${file}${C.reset}  ${C.dim}(${fileItems.length})${C.reset}`);
      for (const item of fileItems) {
        console.log(`    ${C.dim}:${item.line}${C.reset}  → "${item.excerpt}"`);
      }
    }
    console.log();
  }

  // Resumen al final
  section('RESUMEN');
  console.log(`  ${C.dim}${'Regla'.padEnd(8)}${'Descripción'.padEnd(55)}${'Violaciones'.padEnd(14)}Archivos${C.reset}`);
  divider(88);
  for (const ruleId of ruleOrder) {
    const items = byRule.get(ruleId);
    if (!items || items.length === 0) continue;
    const filesAff = new Set(items.map((i) => i.file)).size;
    const c        = items.length > 50 ? C.red : items.length > 10 ? C.yellow : C.green;
    console.log(`  ${c}${`[${ruleId}]`.padEnd(8)}${C.reset} ${items[0].desc.slice(0, 53).padEnd(55)} ${c}${String(items.length).padEnd(14)}${C.reset}${filesAff}`);
  }
  const normFilesWithErrors = new Set(violations.map((v) => v.file)).size;
  console.log();
  console.log(`  Archivos escaneados : ${normFiles}`);
  console.log(`  Archivos con errores: ${normFilesWithErrors}`);
  console.log(`  Total violaciones   : ${violations.length}`);
  if (filterRule) console.log(`  Filtro activo       : [${filterRule}]`);

  footer();
  process.exit(violations.length > 0 ? 1 : 0);
}

main();
