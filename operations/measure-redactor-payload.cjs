// Offline, public normative cache only. No database or network access.
const fs = require('node:fs');
const path = require('node:path');
const { gzipSync } = require('node:zlib');
const root = path.resolve(__dirname, '..');
const audit = path.join(root, 'operations/audits/redactor-2026-11-13');
const baseline = JSON.parse(fs.readFileSync(path.join(audit, 'payload-compression.json'), 'utf8'));
const size = value => {
  const json = Buffer.from(JSON.stringify(value));
  return { jsonBytes: json.length, gzip6Bytes: gzipSync(json, { level: 6 }).length };
};
const samples = baseline.samples.map(sample => {
  const cached = JSON.parse(fs.readFileSync(path.join(root, '../observatorio-de-leyes-frontend/.next/cache/fetch-cache', sample.sourceCacheFile), 'utf8'));
  const norm = JSON.parse(Buffer.from(cached.data.body, 'base64').toString('utf8'));
  const articles = [...norm.articles].sort((a, b) => a.order - b.order).slice(0, 10);
  const old = articles.map(a => ({ id: a.id, number: a.number, title: a.title ?? `Art. ${a.number}`, text: a.text ?? '', explicacion: (a.plainLanguageExplanation ?? '').slice(0, 400), lawId: norm.id }));
  const current = { results: articles.map(a => ({ id: a.id, lawId: norm.id, number: a.number, title: a.title ?? '', order: a.order, preview: Array.from(a.text || '').slice(0, 160).join(''), hasText: !!a.text, status: null, normStatus: norm.status, derogated: !!a.derogatedDate || /derogad[oa]/i.test(a.title || '') })), nextOffset: 10, match: 'text', corpusVersion: 'offline-public-cache-1.5.0' };
  const before = size(old), after = size(current);
  return { route: sample.route, before, after, gzipReductionPercent: +(100 * (1 - after.gzip6Bytes / before.gzip6Bytes)).toFixed(1) };
});
const result = { method: 'Offline public cached articles, first ten by order; legacy BFF compared with implemented 1.5.0 DTO including status fields and page envelope. Article status absent in legacy cache modeled null. Not a live SQL or production latency measurement.', node: process.version, samples };
if (process.argv.includes('--write')) {
  fs.mkdirSync(path.join(audit, 'after'), { recursive: true });
  fs.writeFileSync(path.join(audit, 'after/payload-compression.json'), JSON.stringify(result, null, 2) + '\n');
}
console.log(JSON.stringify(result, null, 2));
