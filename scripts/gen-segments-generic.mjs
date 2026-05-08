/**
 * Generic segment generator for any codigo-aduanero section file.
 * Usage: node scripts/gen-segments-generic.mjs s04
 *        node scripts/gen-segments-generic.mjs s04 s05 s06
 */
import { readFileSync, writeFileSync } from 'fs';

const sections = process.argv.slice(2);
if (sections.length === 0) {
  console.error('Usage: node gen-segments-generic.mjs s04 [s05 s06 ...]');
  process.exit(1);
}

function splitIntoSegments(text) {
  // text uses literal \n as escape sequences inside TS string literals
  const hasIncisos = /\\na\) /.test(text) || /\\nb\) /.test(text) || /^[a-z]\) /.test(text);
  const hasApartados = /\\n\d+[\.\-][-\.\s]/.test(text) || /^\d+[\.\-][-\.\s]/.test(text);

  if (!hasIncisos && !hasApartados) {
    return [{ segmentType: 'PARAGRAPH', originalText: text }];
  }

  const parts = text.split('\\n');
  const segments = [];
  let currentText = null;
  let currentType = 'PARAGRAPH';

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (/^\d+[\.\-][-\.\s]/.test(trimmed)) {
      if (currentText !== null) segments.push({ segmentType: currentType, originalText: currentText });
      currentText = trimmed;
      currentType = 'PARAGRAPH';
    } else if (/^[a-z°\d]\°?\) /.test(trimmed)) {
      if (currentText !== null) segments.push({ segmentType: currentType, originalText: currentText });
      currentText = trimmed;
      currentType = 'INCISO';
    } else {
      if (currentText === null) {
        currentText = trimmed;
        currentType = 'PARAGRAPH';
      } else {
        currentText += '\\n' + trimmed;
      }
    }
  }

  if (currentText !== null) segments.push({ segmentType: currentType, originalText: currentText });

  return segments.length > 1 ? segments : [{ segmentType: 'PARAGRAPH', originalText: text }];
}

function generateSegmentsBlock(artId, artNumber, currentText, lawId) {
  const segments = splitIntoSegments(currentText);
  const items = segments.map((seg, idx) => {
    // escape backslashes first, then single quotes
    const escaped = seg.originalText.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `        {
          id: '${artId}-s${idx}',
          lawId: '${lawId}',
          articleId: '${artId}',
          articleNumber: '${artNumber}',
          order: ${idx},
          segmentType: '${seg.segmentType}',
          originalText: '${escaped}',
          plainExplanation: null,
          practicalExample: null,
          references: [],
        }`;
  }).join(',\n');
  return `segments: [\n${items},\n      ]`;
}

for (const section of sections) {
  const filePath = new URL(`../src/data/codigo-aduanero/sections/${section}.ts`, import.meta.url)
    .pathname.replace(/^\//, '');

  console.log(`\n=== Processing ${section} (${filePath}) ===`);
  let content = readFileSync(filePath, 'utf8');

  // Detect law ID from file (e.g. lawId: 'codigo-aduanero')
  const lawIdMatch = content.match(/lawId: '([^']+)'/);
  const lawId = lawIdMatch ? lawIdMatch[1] : 'codigo-aduanero';

  // Find all article IDs present in this section (e.g. 'ca-art-321', 'ca-art-321bis')
  const artIdRe = /id: '(ca-art-(\d+[a-z]*(?:bis|ter|quater|quinquies|sexies|septies)?))',/g;
  const articleIds = [];
  let m;
  while ((m = artIdRe.exec(content)) !== null) {
    // Avoid duplicates (e.g. amendment blocks referencing same ID)
    if (!articleIds.find(a => a.artId === m[1])) {
      articleIds.push({ artId: m[1], artNumber: m[2] });
    }
  }

  console.log(`Found ${articleIds.length} article IDs`);

  let replacedCount = 0;
  let skippedCount = 0;

  for (const { artId, artNumber } of articleIds) {
    const artIdPattern = `id: '${artId}',`;
    const artIdPos = content.indexOf(artIdPattern);
    if (artIdPos === -1) { skippedCount++; continue; }

    // Check this article has segments: [],
    const segmentsPos = content.indexOf('\n      segments: [],', artIdPos);
    if (segmentsPos === -1) { skippedCount++; continue; }

    // Make sure no other article starts between artIdPos and segmentsPos
    const between = content.substring(artIdPos + artIdPattern.length, segmentsPos);
    if (/\n    \{\s*\n\s*id: 'ca-art-/.test(between)) { skippedCount++; continue; }

    // Extract currentText for this article
    const ctRe = /currentText: '((?:[^'\\]|\\[\s\S])*?)'/g;
    ctRe.lastIndex = artIdPos;
    const ctMatch = ctRe.exec(content);
    if (!ctMatch || ctMatch.index > artIdPos + 6000) {
      console.log(`  No currentText for ${artId}`);
      skippedCount++;
      continue;
    }

    const currentText = ctMatch[1];
    const segmentsBlock = generateSegmentsBlock(artId, artNumber, currentText, lawId);
    const placeholder = '\n      segments: [],';
    const replacement = '\n      ' + segmentsBlock + ',';

    content = content.substring(0, segmentsPos) + replacement + content.substring(segmentsPos + placeholder.length);
    replacedCount++;
  }

  // Second pass: handle any remaining segments: [], that were skipped due to between-check
  // (happens when article blocks are immediately adjacent with no gap)
  const remainingBefore = (content.match(/\n      segments: \[\],/g) || []).length;
  if (remainingBefore > 0) {
    console.log(`  ${remainingBefore} remaining after first pass — running targeted fix pass...`);

    // For each remaining, find the closest preceding id: 'ca-art-...' and currentText
    let fixCount = 0;
    const segPlaceholderRe = /\n      segments: \[\],/g;
    let fixMatch;
    const positions = [];
    while ((fixMatch = segPlaceholderRe.exec(content)) !== null) {
      positions.push(fixMatch.index);
    }

    // Process in reverse order to preserve positions
    for (let i = positions.length - 1; i >= 0; i--) {
      const pos = positions[i];
      const before = content.substring(0, pos);

      // Find last article ID before this position
      const lastArtIdMatch = [...before.matchAll(/id: '(ca-art-(\d+[a-z]*(?:bis|ter|quater|quinquies|sexies|septies)?))',/g)].pop();
      if (!lastArtIdMatch) continue;

      const artId = lastArtIdMatch[1];
      const artNumber = lastArtIdMatch[2];

      // Find currentText after that artId position
      const ctRe2 = /currentText: '((?:[^'\\]|\\[\s\S])*?)'/g;
      ctRe2.lastIndex = lastArtIdMatch.index;
      const ctMatch2 = ctRe2.exec(content);
      if (!ctMatch2 || ctMatch2.index > pos) continue;

      const currentText = ctMatch2[1];
      const segmentsBlock = generateSegmentsBlock(artId, artNumber, currentText, lawId);
      const placeholder = '\n      segments: [],';
      const replacement = '\n      ' + segmentsBlock + ',';

      content = content.substring(0, pos) + replacement + content.substring(pos + placeholder.length);
      fixCount++;
    }
    console.log(`  Fixed ${fixCount} in second pass`);
  }

  const remaining = (content.match(/\n      segments: \[\],/g) || []).length;
  console.log(`  Replaced: ${replacedCount}, Skipped: ${skippedCount}, Still empty: ${remaining}`);

  writeFileSync(filePath, content, 'utf8');
  console.log(`  Written: ${filePath}`);
}

console.log('\nAll done!');
