/**
 * Auditoría de calidad — metadata, explicaciones, segmentos.
 * Uso: npm run audit:quality
 */

import {
  C, miniBar, warn, padEnd, section, divider, header, footer,
  loadLaws, analyzeLaw,
} from './audit-lib';
import type { MetaFlags } from './audit-lib';

function main() {
  header('AUDITORÍA DE CALIDAD — METADATA Y CONTENIDO');

  const laws    = loadLaws();
  const reports = laws.map(analyzeLaw);

  // ── Metadata matrix ──────────────────────────────────────────────────────────
  const META_LABELS: [keyof MetaFlags, string][] = [
    ['summary',          'Resumen     '],
    ['executiveSummary', 'Resumen ejec'],
    ['objective',        'Objetivo    '],
    ['problemItSolves',  'Problema    '],
    ['practicalImpact',  'Impacto     '],
    ['affectedSubjects', 'Afectados   '],
    ['topics',           'Temas       '],
    ['keywords',         'Keywords    '],
    ['relatedNorms',     'Normas rel. '],
    ['metadataObj',      'Obj.metadata'],
  ];

  section('METADATA POR NORMA');
  const hdr = META_LABELS.map(([, l]) => l).join('  ');
  console.log(`  ${C.dim}${'Norma'.padEnd(38)}  ${hdr}  Completitud${C.reset}`);
  divider(38 + META_LABELS.length * 14 + 14);
  for (const r of reports) {
    const name  = (r.law.commonName ?? r.law.title).slice(0, 36).padEnd(37);
    const cells = META_LABELS.map(([key]) => padEnd(warn(r.meta[key]), 14)).join('');
    const mb    = miniBar(r.metaScore, 10);
    console.log(`  ${name}  ${cells}${mb} ${Math.round(r.metaScore * 100)}%`);
  }

  // ── Normas con metadata incompleta ───────────────────────────────────────────
  const incomplete = reports.filter((r) => r.metaScore < 1);
  if (incomplete.length > 0) {
    section(`METADATA INCOMPLETA — DETALLE (${incomplete.length} normas)`);
    for (const r of incomplete) {
      const missing = META_LABELS.filter(([key]) => !r.meta[key]).map(([, label]) => label.trim());
      console.log(`  ${C.bold}${(r.law.commonName ?? r.law.title).slice(0, 50)}${C.reset}`);
      console.log(`    ${C.dim}Faltan: ${C.reset}${C.yellow}${missing.join(', ')}${C.reset}`);
    }
    console.log();
  }

  // ── Calidad de artículos ─────────────────────────────────────────────────────
  section('CALIDAD DE ARTÍCULOS Y SEGMENTOS');
  console.log(`  ${C.dim}${'Norma'.padEnd(38)}${'Sin título'.padEnd(14)}${'Sin texto'.padEnd(14)}${'Sin explicac.'.padEnd(16)}${'Segs s/expl.'.padEnd(16)}${'Segs s/ejemplo'}${C.reset}`);
  divider(112);
  for (const r of reports) {
    const name    = (r.law.commonName ?? r.law.title).slice(0, 36).padEnd(37);
    const noTitle = r.artQ.noTitle > 0
      ? padEnd(`${C.yellow}${r.artQ.noTitle}/${r.artQ.total}${C.reset}`, 14)
      : padEnd(`${C.dim}—${C.reset}`, 14);
    const noOrig  = r.artQ.noOriginalText > 0
      ? padEnd(`${C.red}${r.artQ.noOriginalText}/${r.artQ.total}${C.reset}`, 14)
      : padEnd(`${C.dim}—${C.reset}`, 14);
    const noExpl  = r.artQ.noExplanation > 0
      ? padEnd(`${C.yellow}${r.artQ.noExplanation}/${r.artQ.total}${C.reset}`, 16)
      : padEnd(`${C.dim}—${C.reset}`, 16);
    const segExpl = r.segQ.noExplanation > 0
      ? padEnd(`${C.yellow}${r.segQ.noExplanation}/${r.segQ.total}${C.reset}`, 16)
      : padEnd(`${C.dim}—${C.reset}`, 16);
    const segEx   = r.segQ.noExample > 0
      ? `${C.yellow}${r.segQ.noExample}/${r.segQ.total}${C.reset}`
      : `${C.dim}—${C.reset}`;
    console.log(`  ${name} ${noTitle}${noOrig}${noExpl}${segExpl}${segEx}`);
  }

  // ── Resumen ──────────────────────────────────────────────────────────────────
  section('RESUMEN');
  const totalArts      = reports.reduce((s, r) => s + r.artQ.total,         0);
  const totalNoTitle   = reports.reduce((s, r) => s + r.artQ.noTitle,       0);
  const totalNoOrig    = reports.reduce((s, r) => s + r.artQ.noOriginalText, 0);
  const totalNoExpl    = reports.reduce((s, r) => s + r.artQ.noExplanation,  0);
  const totalSegs      = reports.reduce((s, r) => s + r.segQ.total,          0);
  const totalSegNoExpl = reports.reduce((s, r) => s + r.segQ.noExplanation,  0);
  const totalSegNoEx   = reports.reduce((s, r) => s + r.segQ.noExample,      0);
  const avgMeta        = reports.reduce((s, r) => s + r.metaScore, 0) / reports.length;
  const metaCompletas  = reports.filter((r) => r.metaScore >= 1).length;

  console.log(`  Artículos totales           : ${totalArts.toLocaleString('es-AR')}`);
  console.log(`  Sin título                  : ${totalNoTitle > 0 ? C.yellow : C.dim}${totalNoTitle}${C.reset}`);
  console.log(`  Sin texto original          : ${totalNoOrig > 0 ? C.red : C.dim}${totalNoOrig}${C.reset}`);
  console.log(`  Sin explicación             : ${totalNoExpl > 0 ? C.yellow : C.dim}${totalNoExpl}${C.reset}`);
  console.log(`  Segmentos totales           : ${totalSegs.toLocaleString('es-AR')}`);
  console.log(`  Segmentos sin explicación   : ${totalSegNoExpl > 0 ? C.yellow : C.dim}${totalSegNoExpl}${C.reset}`);
  console.log(`  Segmentos sin ejemplo       : ${totalSegNoEx > 0 ? C.yellow : C.dim}${totalSegNoEx}${C.reset}`);
  console.log(`  Metadata completa           : ${metaCompletas}/${laws.length} normas`);
  console.log(`  Completitud promedio        : ${Math.round(avgMeta * 100)}%`);

  footer();
  process.exit(totalNoOrig > 0 || totalNoExpl > 0 ? 1 : 0);
}

main();
