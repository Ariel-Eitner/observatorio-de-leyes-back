// Standalone in each repository so CI and Docker never require its sibling.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const base = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(p, 'utf8');
const json = (p) => JSON.parse(read(p));
const semver = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
function check(dir) {
  const pkg = json(path.join(dir, 'package.json'));
  const lock = json(path.join(dir, 'package-lock.json'));
  const version = pkg.version;
  if (!semver.test(version)) throw Error('Versión inválida: ' + version);
  if (lock.version !== version || lock.packages?.['']?.version !== version)
    throw Error('Lockfile desincronizado en ' + dir);
  const changelog = read(path.join(dir, 'CHANGELOG.md'));
  const headers = [...changelog.matchAll(/^## (\d+\.\d+\.\d+) — (\d{4}-\d{2}-\d{2})\r?$/gm)];
  if (headers[0]?.[1] !== version || headers.length !== new Set(headers.map(h => h[1])).size)
    throw Error('Cabecera o versiones duplicadas en CHANGELOG: ' + dir);
  if ([...changelog.matchAll(/^## /gm)].length !== headers.length)
    throw Error('Formato inválido de cabecera en CHANGELOG: ' + dir);
  for (let i = 0; i < headers.length; i++) {
    const [, releaseVersion, date] = headers[i];
    if (!semver.test(releaseVersion) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date)
      throw Error('Versión o fecha inválida en CHANGELOG: ' + dir);
    if (i > 0) {
      const newer = headers[i - 1][1].split('.').map(Number);
      if (releaseVersion.split('.').map(Number).reduce((cmp,n,j) => cmp || Math.sign(newer[j] - n), 0) <= 0 || date > headers[i - 1][2])
        throw Error('Historia fuera de orden en CHANGELOG: ' + dir);
    }
  }
  const entry = changelog.slice(headers[0].index + headers[0][0].length, headers[1]?.index);
  if (!/^\s*- \S/m.test(entry)) throw Error('La entrega necesita notas reales en CHANGELOG');
  const dockerVersion = /ARG APP_VERSION=(\S+)/.exec(read(path.join(dir, 'Dockerfile')))?.[1];
  if (dockerVersion !== version) throw Error('Docker desincronizado en ' + dir + ': ejecutar release:prepare');
  const compose = path.join(dir, 'operations/compose.local.yml');
  if (fs.existsSync(compose)) {
    const versions = [...read(compose).matchAll(/OBSERVATORIO_VERSION:-(\d+\.\d+\.\d+)/g)];
    if (!versions.length || versions.some(v => v[1] !== version)) throw Error('Compose desincronizado');
  }
  return version;
}
function workspace() {
  const root = path.dirname(base);
  const dirs = ['observatorio-de-leyes-backend', 'observatorio-de-leyes-frontend'].map(d => path.join(root, d));
  for (const dir of dirs) if (!fs.existsSync(path.join(dir, 'package.json'))) throw Error('Se necesitan ambos repositorios para preparar una entrega');
  return { root, dirs };
}
function prepare(target, notesFile) {
  const { root, dirs } = workspace();
  const versions = dirs.map(check);
  if (versions[0] !== versions[1]) throw Error('Los repositorios tienen distintas versiones');
  const current = versions[0].split('.').map(Number);
  let next = target;
  if (['patch', 'minor', 'major'].includes(target)) {
    const idx = ['major', 'minor', 'patch'].indexOf(target);
    current[idx]++;
    for (let i = idx + 1; i < 3; i++) current[i] = 0;
    next = current.join('.');
  }
  if (!semver.test(next) || next.split('.').map(Number).reduce((cmp, n, i) => cmp || Math.sign(n - Number(versions[0].split('.')[i])), 0) <= 0)
    throw Error('La nueva versión debe ser mayor que ' + versions[0]);
  if (!notesFile) throw Error('Uso: release:prepare -- patch|minor|major|X.Y.Z archivo-de-notas.md');
  const notes = read(path.resolve(notesFile)).trim();
  if (!/^- \S/m.test(notes) || /^## /m.test(notes)) throw Error('Las notas deben ser una lista de cambios sin cabeceras de versión');
  const date = new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Argentina/Buenos_Aires' }).format(new Date());
  // Plan every write before modifying any file. No changelog content is invented.
  const writes = [];
  for (const dir of dirs) {
    for (const name of ['package.json', 'package-lock.json']) {
      const file = path.join(dir, name), data = json(file);
      data.version = next;
      if (name === 'package-lock.json') data.packages[''].version = next;
      const indent = read(file).match(/\n([\t ]+)"/)?.[1] || '  ';
      writes.push([file, JSON.stringify(data, null, indent) + '\n']);
    }
    const log = path.join(dir, 'CHANGELOG.md');
    writes.push([log, read(log).replace(/(?=^## )/m, `## ${next} — ${date}\n\n${notes}\n\n`)]);
    const docker = path.join(dir, 'Dockerfile');
    writes.push([docker, read(docker).replace(/ARG APP_VERSION=\S+/, 'ARG APP_VERSION=' + next)]);
    const compose = path.join(dir, 'operations/compose.local.yml');
    if (fs.existsSync(compose)) writes.push([compose, read(compose).replace(/OBSERVATORIO_VERSION:-\d+\.\d+\.\d+/g, 'OBSERVATORIO_VERSION:-' + next)]);
  }
  const local = path.join(root, 'docker-compose.yml');
  if (fs.existsSync(local)) writes.push([local, read(local).replace(/OBSERVATORIO_VERSION:-\d+\.\d+\.\d+/g, 'OBSERVATORIO_VERSION:-' + next)]);
  const originals = writes.map(([file]) => [file, read(file)]);
  try {
    for (const [file, content] of writes) fs.writeFileSync(file, content);
    dirs.forEach(check);
  } catch (error) {
    for (const [file, content] of originals) fs.writeFileSync(file, content);
    throw error;
  }
  console.log('Entrega preparada: ' + next + '. Revisar diffs antes de publicar.');
}
if (require.main === module) {
  try {
    if (process.argv[2] === 'prepare') prepare(process.argv[3], process.argv[4]);
    else if (process.argv[2] === '--workspace') {
      const { root, dirs } = workspace(), versions = dirs.map(check);
      if (new Set(versions).size !== 1) throw Error('Versiones distintas entre repositorios');
      const local = path.join(root, 'docker-compose.yml');
      if (fs.existsSync(local) && [...read(local).matchAll(/OBSERVATORIO_VERSION:-(\d+\.\d+\.\d+)/g)].some(v => v[1] !== versions[0])) throw Error('Compose raíz desincronizado');
      console.log('Versionado de ambos repositorios OK: ' + versions[0]);
    } else {
      const version = check(base);
      if (process.argv[2] === '--base') {
        const ref = process.argv[3];
        if (!ref || !/^[a-f0-9]{40}$/i.test(ref)) throw Error('Se requiere el SHA base completo');
        if (!/^0+$/.test(ref)) {
          const previous = JSON.parse(execFileSync('git', ['show', `${ref}:package.json`], {cwd:base, encoding:'utf8', windowsHide:true})).version;
          const changed = execFileSync('git', ['diff', '--name-only', ref, 'HEAD'], {cwd:base, encoding:'utf8', windowsHide:true}).trim();
          if (changed && version.split('.').map(Number).reduce((cmp,n,i) => cmp || Math.sign(n - Number(previous.split('.')[i])),0) <= 0)
            throw Error('Hay cambios sin nueva versión/changelog respecto de ' + previous);
        }
      }
      console.log('Versionado OK: ' + version);
    }
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { check, prepare };
