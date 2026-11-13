const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync, execFileSync } = require('node:child_process');
const { check } = require('./release.cjs');
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'obs-release-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const dirs = ['observatorio-de-leyes-backend', 'observatorio-de-leyes-frontend'].map(d => path.join(root, d));
  for (const dir of dirs) {
    fs.mkdirSync(path.join(dir, 'operations'), { recursive: true });
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({version:'1.4.2'}));
    fs.writeFileSync(path.join(dir, 'package-lock.json'), JSON.stringify({version:'1.4.2',packages:{'':{version:'1.4.2'}}}));
    fs.writeFileSync(path.join(dir, 'CHANGELOG.md'), '# Changelog\n\n## 1.4.2 — 2026-11-12\n\n- Anterior.\n');
    fs.writeFileSync(path.join(dir, 'Dockerfile'), 'ARG APP_VERSION=1.4.2\n');
    fs.copyFileSync(path.join(__dirname, 'release.cjs'), path.join(dir, 'operations/release.cjs'));
  }
  fs.writeFileSync(path.join(dirs[0], 'operations/compose.local.yml'), '${OBSERVATORIO_VERSION:-1.4.2}');
  fs.writeFileSync(path.join(root, 'docker-compose.yml'), '${OBSERVATORIO_VERSION:-1.4.2}');
  return { root, dirs, run: (...args) => spawnSync(process.execPath, [path.join(dirs[0], 'operations/release.cjs'), ...args], { encoding:'utf8' }) };
}
test('rechaza Docker, lock, Compose o changelog desincronizados', t => {
  const { dirs } = fixture(t), dir = dirs[0];
  assert.equal(check(dir), '1.4.2');
  for (const file of ['Dockerfile','package-lock.json','CHANGELOG.md','operations/compose.local.yml']) {
    const full = path.join(dir, file), original = fs.readFileSync(full, 'utf8');
    fs.writeFileSync(full, original.replaceAll('1.4.2','1.4.1'));
    assert.throws(() => check(dir));
    fs.writeFileSync(full, original);
  }
});
test('prepara ambos repositorios, conserva historia y sincroniza Docker', t => {
  const { root, dirs, run } = fixture(t), notes = path.join(root,'notes.md');
  fs.writeFileSync(notes,'- Corrige versiones.\n');
  const result = run('prepare','patch',notes);
  assert.equal(result.status,0,result.stderr);
  dirs.forEach(dir => assert.equal(check(dir),'1.4.3'));
  const log = fs.readFileSync(path.join(dirs[0],'CHANGELOG.md'),'utf8');
  assert.match(log,/## 1.4.3/); assert.match(log,/## 1.4.2 — 2026-11-12\n\n- Anterior./);
  assert.match(fs.readFileSync(path.join(root,'docker-compose.yml'),'utf8'),/1.4.3/);
  assert.equal(run('--workspace').status,0);
});
test('sin notas o con versión anterior no modifica archivos', t => {
  const { dirs, run } = fixture(t);
  assert.equal(run('prepare','patch').status,1);
  assert.equal(run('prepare','1.4.1').status,1);
  dirs.forEach(dir => assert.equal(check(dir),'1.4.2'));
});
test('rechaza changelog vacío, fecha imposible e historia repetida', t => {
  const { dirs } = fixture(t), file = path.join(dirs[0], 'CHANGELOG.md');
  const original = fs.readFileSync(file, 'utf8');
  for (const content of [original.replace('- Anterior.',''), original.replace('2026-11-12','2026-02-30'), original + '\n## 1.4.2 — 2026-11-12\n\n- Duplicado.\n']) {
    fs.writeFileSync(file, content);
    assert.throws(() => check(dirs[0]));
  }
});
test('CI rechaza cambios sin incremento y acepta la nueva entrega', t => {
  const { root, dirs, run } = fixture(t);
  const git = (...args) => execFileSync('git', ['-c','user.name=Release Test','-c','user.email=release@example.invalid','-c','commit.gpgsign=false', ...args], {cwd:dirs[0], encoding:'utf8', windowsHide:true});
  git('init','-q'); git('add','.'); git('commit','-qm','Initial');
  const ref = git('rev-parse','HEAD').trim();
  fs.writeFileSync(path.join(dirs[0], 'source.js'), '// Change\n');
  git('add','.'); git('commit','-qm','Change without release');
  assert.equal(run('--base',ref).status,1);
  const notes = path.join(root,'notes.md'); fs.writeFileSync(notes,'- Cambio probado.\n');
  assert.equal(run('prepare','patch',notes).status,0);
  git('add','.'); git('commit','-qm','Release');
  const result = run('--base',ref);
  assert.equal(result.status,0,result.stderr);
});
