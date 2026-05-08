import { readFileSync, writeFileSync } from 'fs';

const filePath = new URL('../src/data/codigo-aduanero/sections/s03.ts', import.meta.url).pathname.replace(/^\//, '');

let content = readFileSync(filePath, 'utf8');

/**
 * Split article text into segments.
 * Returns array of { segmentType, originalText }
 */
function splitIntoSegments(text) {
  // If text has numbered apartados like "1. ..." or "1.- ..."
  // AND incisos like "a) ..." within them, we need fine-grained splitting.
  // Strategy: split by top-level numbered paragraphs first, then by incisos within each.

  const segments = [];

  // Check if text has any incisos (a), b), c) ...) or numbered items (1., 2., 1.-, 2.-)
  const hasIncisos = /\n[a-z]\) /m.test(text);
  const hasApartados = /\n\d+[\.\-] /m.test(text) || /^\d+[\.\-] /.test(text);

  if (!hasIncisos && !hasApartados) {
    // Simple single paragraph
    return [{ segmentType: 'PARAGRAPH', originalText: text }];
  }

  // Split the text into lines for processing
  const lines = text.split('\\n');

  let currentParagraph = null;
  let currentType = 'PARAGRAPH';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Check if line starts a numbered apartado: "1." "2." "1.-" "2.-"
    if (/^\d+[\.\-][-\s]/.test(line)) {
      if (currentParagraph !== null) {
        segments.push({ segmentType: currentType, originalText: currentParagraph });
      }
      currentParagraph = line;
      currentType = 'PARAGRAPH';
    }
    // Check if line starts an inciso: "a) " "b) " etc.
    else if (/^[a-z°\d]\°?\) /.test(line)) {
      if (currentParagraph !== null) {
        segments.push({ segmentType: currentType, originalText: currentParagraph });
      }
      currentParagraph = line;
      currentType = 'INCISO';
    }
    // Continuation of current segment
    else {
      if (currentParagraph === null) {
        currentParagraph = line;
        currentType = 'PARAGRAPH';
      } else {
        // Append to current paragraph (with newline separator)
        currentParagraph += '\\n' + line;
      }
    }
  }

  if (currentParagraph !== null) {
    segments.push({ segmentType: currentType, originalText: currentParagraph });
  }

  // If splitting produced only 1 segment, return simple paragraph
  if (segments.length <= 1) {
    return [{ segmentType: 'PARAGRAPH', originalText: text }];
  }

  return segments;
}

/**
 * Generate the segments array TypeScript code for an article.
 */
function generateSegmentsBlock(artId, artNumber, currentText) {
  const segments = splitIntoSegments(currentText);

  const segmentItems = segments.map((seg, idx) => {
    const escapedText = seg.originalText.replace(/'/g, "\\'");
    return `        {
          id: '${artId}-s${idx}',
          lawId: 'codigo-aduanero',
          articleId: '${artId}',
          articleNumber: '${artNumber}',
          order: ${idx},
          segmentType: '${seg.segmentType}',
          originalText: '${escapedText}',
          plainExplanation: null,
          practicalExample: null,
          references: [],
        }`;
  }).join(',\n');

  return `segments: [\n${segmentItems},\n      ]`;
}

// Regex to find each article block and extract its key fields
// Pattern: find id, number, currentText, and the segments: [] placeholder
const articleRegex = /\{\s*\n\s*id: '(ca-art-(\d+[a-z]?))',[\s\S]*?currentText: '((?:[^'\\]|\\[\s\S])*)',[\s\S]*?segments: \[\],/g;

let match;
let replacements = [];

while ((match = articleRegex.exec(content)) !== null) {
  const fullMatch = match[0];
  const artId = match[1];
  const artNumber = match[2];
  const currentText = match[3];

  // Generate segments block
  const segmentsBlock = generateSegmentsBlock(artId, artNumber, currentText);

  replacements.push({
    artId,
    artNumber,
    original: 'segments: [],',
    replacement: segmentsBlock,
    // We'll replace only the LAST occurrence of segments: [], within this article
    // by finding the position
    matchStart: match.index,
    matchEnd: match.index + fullMatch.length,
  });
}

console.log(`Found ${replacements.length} articles to update`);

// Process replacements - we need to find each `segments: [],` that belongs to each article
// Since articles can have amendments that also have arrays, we need to be careful
// Strategy: for each article, find the `segments: [],` BEFORE the `amendments:` field

// Better approach: replace in reverse order to preserve positions
// Find all `segments: [],` occurrences that are at the article level (preceded by `order: N,`)
const segmentPlaceholderRegex = /(\s*order: \d+,\n\s*)segments: \[\],/g;

let count = 0;
content = content.replace(segmentPlaceholderRegex, (fullMatch, prefix, offset) => {
  // This is an article-level segments: [],
  // We need to find the currentText of this article to generate segments
  // Find the article block that contains this position
  // Look backwards for the most recent `id: 'ca-art-XXX'` and `currentText: '...'`
  const beforeMatch = content.substring(0, content.indexOf(fullMatch, 0));
  // This approach doesn't work perfectly because we replaced content...
  return fullMatch; // placeholder - we'll do this differently
});

// Better approach: process article by article using the extracted data
// Re-read fresh content
content = readFileSync(filePath, 'utf8');

// Find all articles with segments: [],
// Use a more targeted approach: find each article ID, get its currentText, generate segments
const articleBlockRegex = /id: '(ca-art-(\d+[a-z]?))',\n\s*lawId: 'codigo-aduanero',\n\s*number: '[^']+',\n\s*title: '[^']*',\n\s*originalText: '(?:[^'\\]|\\[\s\S])*',\n\s*currentText: '((?:[^'\\]|\\[\s\S])*)',[\s\S]*?\n\s*order: \d+,\n\s*segments: \[\],/g;

const articleDataMap = new Map();

while ((match = articleBlockRegex.exec(content)) !== null) {
  const artId = match[1];
  const artNumber = match[2];
  const currentText = match[3];
  articleDataMap.set(artId, { artNumber, currentText });
}

console.log(`Extracted data for ${articleDataMap.size} articles`);

// Now do the replacement using a simpler approach:
// Find `order: N,\n      segments: [],` and replace with segments block
// But we need to know which article we're in...

// Most reliable: do string replacement with context
// For each article in map, find its specific `segments: [],` by surrounding context

let newContent = content;
let replacedCount = 0;

for (const [artId, { artNumber, currentText }] of articleDataMap) {
  // The pattern to find: `order: N,\n      segments: [],` within THIS article's block
  // We identify it by the unique article ID nearby

  // Find the article block in content
  const artIdPattern = `id: '${artId}',`;
  const artIdPos = newContent.indexOf(artIdPattern);
  if (artIdPos === -1) continue;

  // Find `segments: [],` after the artId
  const afterArtId = newContent.indexOf(`\n      segments: [],`, artIdPos);
  if (afterArtId === -1) continue;

  // Make sure we're within the same article (not a following article)
  // Check that there's no other `id: 'ca-art-` between artIdPos and afterArtId
  const between = newContent.substring(artIdPos + artIdPattern.length, afterArtId);
  if (/\n    \{\n\s*id: 'ca-art-/.test(between)) continue; // skip - it's in a different article

  const segmentsPlaceholder = `\n      segments: [],`;
  const segmentsBlock = generateSegmentsBlock(artId, artNumber, currentText);
  const replacement = `\n      ${segmentsBlock},`;

  newContent = newContent.substring(0, afterArtId) + replacement + newContent.substring(afterArtId + segmentsPlaceholder.length);
  replacedCount++;
}

console.log(`Replaced segments for ${replacedCount} articles`);

writeFileSync(filePath, newContent, 'utf8');
console.log('Done! File written.');
