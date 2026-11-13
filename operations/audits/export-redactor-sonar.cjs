// Exports reproducible audit evidence. SONAR_TOKEN must be supplied externally.
const fs = require('node:fs');
const path = require('node:path');
const base = 'http://127.0.0.1:19000';
const out = path.join(__dirname, 'redactor-2026-11-13/after');
const baseline = JSON.parse(fs.readFileSync(path.join(__dirname, 'redactor-2026-11-13/summary.json'), 'utf8'));
const metrics = 'ncloc,complexity,cognitive_complexity,duplicated_lines_density,coverage,sqale_index,code_smells,bugs,vulnerabilities,security_hotspots';
async function api(route, params) {
  const response = await fetch(`${base}/api/${route}?${new URLSearchParams(params)}`, {
    headers: { Authorization: `Bearer ${process.env.SONAR_TOKEN}` }, signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`Sonar ${route}: ${response.status}`);
  return response.json();
}
function write(name, value) { fs.writeFileSync(path.join(out, name + '.json'), JSON.stringify(value, null, 2) + '\n'); }
function counts(issues, key) { return issues.reduce((acc, i) => { acc[i[key]] = (acc[i[key]] || 0) + 1; return acc; }, {}); }
function inScope(side, file) {
  if (side === 'backend') return /^(src\/(search|articles|laws|norms-db|user-content)\/|src\/common\/guards\/proxy-throttler.guard.ts$|src\/main.ts$)/.test(file);
  return file.startsWith('app/herramientas/redactor/') || file.startsWith('app/api/redactor-') || baseline.scopeDescription.frontendShared.includes(file) || file === 'app/lib/accountExitGuards.ts';
}
(async () => {
  if (!process.env.SONAR_TOKEN) throw new Error('SONAR_TOKEN is required');
  fs.mkdirSync(out, { recursive: true });
  const summary = { version: '1.5.0', exportedAt: new Date().toISOString(), profile: baseline.profile, projects: {} };
  for (const side of ['backend', 'frontend']) {
    const project = baseline.projects[side].project;
    const ce = await api('ce/component', { component: project });
    if (ce.current?.status === 'FAILED') throw new Error(`${side}: analysis failed; inspect task ${ce.current.id}`);
    if (ce.current?.status !== 'SUCCESS' || ce.queue?.length) throw new Error(`${side}: analysis is not complete`);
    write(`sonar-${side}-task`, ce);
    const first = await api('issues/search', { componentKeys: project, ps: '500', p: '1', resolved: 'false' });
    const issues = [...first.issues];
    for (let p = 2; p <= Math.ceil(first.total / 500); p++) {
      issues.push(...(await api('issues/search', { componentKeys: project, ps: '500', p: String(p), resolved: 'false' })).issues);
    }
    write(`sonar-${side}-issues`, { project, total: first.total, analysisTask: ce.current.id, issues });
    const selected = issues.filter(i => inScope(side, i.component.slice(project.length + 1)));
    write(`sonar-${side}-scoped-issues`, selected);
    for (const [name, route, params] of [
      ['metrics', 'measures/component', { component: project, metricKeys: metrics }],
      ['file-metrics', 'measures/component_tree', { component: project, strategy: 'leaves', metricKeys: 'ncloc,complexity,cognitive_complexity,duplicated_lines_density', ps: '500' }],
      ['quality-gate', 'qualitygates/project_status', { projectKey: project }],
      ['profiles', 'qualityprofiles/search', { project }],
      ['hotspots', 'hotspots/search', { project, ps: '500' }],
    ]) write(`sonar-${side}-${name}`, await api(route, params));
    const direct = issues.filter(i => i.component.startsWith(project + ':app/herramientas/redactor/'));
    summary.projects[side] = { project, analysisTask: ce.current.id, totalIssues: issues.length, types: counts(issues, 'type'), selectedScopeIssues: selected.length, selectedScopeTypes: counts(selected, 'type'), selectedScopeRules: counts(selected, 'rule'), directEditorIssues: direct.length, directEditorTypes: counts(direct, 'type') };
  }
  write('summary', summary);
  console.log(JSON.stringify(summary, null, 2));
})().catch(error => { console.error(error.message); process.exitCode = 1; });
