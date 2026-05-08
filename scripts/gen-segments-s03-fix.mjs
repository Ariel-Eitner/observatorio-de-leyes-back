import { readFileSync, writeFileSync } from 'fs';

const filePath = new URL('../src/data/codigo-aduanero/sections/s03.ts', import.meta.url).pathname.replace(/^\//, '');

let content = readFileSync(filePath, 'utf8');

// Articles still missing segments (found by inspection)
const missingArtIds = [
  'ca-art-131', 'ca-art-136', 'ca-art-143', 'ca-art-149', 'ca-art-154',
  'ca-art-161', 'ca-art-186', 'ca-art-189', 'ca-art-209', 'ca-art-212',
  'ca-art-246', 'ca-art-253', 'ca-art-266', 'ca-art-275', 'ca-art-278bis',
];

function splitIntoSegments(text) {
  const hasIncisos = /\\na\) /.test(text) || /\\nb\) /.test(text);
  const hasApartados = /^1[\.\-][-\s]/.test(text) || /\\n1[\.\-][-\s]/.test(text);

  if (!hasIncisos && !hasApartados) {
    return [{ segmentType: 'PARAGRAPH', originalText: text }];
  }

  // Split by escaped newlines
  const parts = text.split('\\n');
  const segments = [];
  let currentText = null;
  let currentType = 'PARAGRAPH';

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // Numbered apartado: "1. " "2. " "1.- " "2.- "
    if (/^\d+[\.\-][\.\s]/.test(trimmed)) {
      if (currentText !== null) {
        segments.push({ segmentType: currentType, originalText: currentText });
      }
      currentText = trimmed;
      currentType = 'PARAGRAPH';
    }
    // Inciso: "a) " "b) " etc.
    else if (/^[a-z]\) /.test(trimmed)) {
      if (currentText !== null) {
        segments.push({ segmentType: currentType, originalText: currentText });
      }
      currentText = trimmed;
      currentType = 'INCISO';
    }
    // Continuation
    else {
      if (currentText === null) {
        currentText = trimmed;
        currentType = 'PARAGRAPH';
      } else {
        currentText += '\\n' + trimmed;
      }
    }
  }

  if (currentText !== null) {
    segments.push({ segmentType: currentType, originalText: currentText });
  }

  return segments.length > 1 ? segments : [{ segmentType: 'PARAGRAPH', originalText: text }];
}

function generateSegmentsBlock(artId, artNumber, currentText) {
  const segments = splitIntoSegments(currentText);
  const items = segments.map((seg, idx) => {
    const escaped = seg.originalText.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `        {
          id: '${artId}-s${idx}',
          lawId: 'codigo-aduanero',
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

let replacedCount = 0;

for (const artId of missingArtIds) {
  const artNumber = artId.replace('ca-art-', '');

  // Find the article block
  const artIdPattern = `id: '${artId}',`;
  const artIdPos = content.indexOf(artIdPattern);
  if (artIdPos === -1) {
    console.log(`NOT FOUND: ${artId}`);
    continue;
  }

  // Extract currentText using a targeted search
  // Find currentText: '...' after the artId position
  const currentTextPattern = /currentText: '((?:[^'\\]|\\[\s\S])*?)'/g;
  currentTextPattern.lastIndex = artIdPos;
  const ctMatch = currentTextPattern.exec(content);
  if (!ctMatch || ctMatch.index > artIdPos + 5000) {
    console.log(`No currentText found for ${artId}`);
    continue;
  }
  const currentText = ctMatch[1];

  // Find the segments: [], after the currentText match
  const segmentsPos = content.indexOf('\n      segments: [],', ctMatch.index);
  if (segmentsPos === -1) {
    console.log(`No segments: [], found for ${artId}`);
    continue;
  }

  // Generate replacement
  const segmentsBlock = generateSegmentsBlock(artId, artNumber, currentText);
  const segmentsPlaceholder = '\n      segments: [],';
  const replacement = '\n      ' + segmentsBlock + ',';

  content = content.substring(0, segmentsPos) + replacement + content.substring(segmentsPos + segmentsPlaceholder.length);
  replacedCount++;
  console.log(`Replaced: ${artId}`);
}

console.log(`\nTotal replaced: ${replacedCount}`);
writeFileSync(filePath, content, 'utf8');
console.log('Done!');
