// Run Compose using the actual software version, without exposing .env contents.
const fs = require("node:fs"),
  path = require("node:path"),
  { spawnSync } = require("node:child_process");
const root = path.resolve(__dirname, "../..");
const dirs = [
  "observatorio-de-leyes-backend",
  "observatorio-de-leyes-frontend",
];
const version = require("../package.json").version;
const catalogSource = fs.readFileSync(
  path.join(__dirname, "../src/commercial/commercial-catalog.json"),
);
const catalogCopy = fs.readFileSync(
  path.join(
    root,
    "observatorio-de-leyes-frontend/app/lib/commercial-catalog.json",
  ),
);
if (!catalogSource.equals(catalogCopy))
  throw Error("Catálogo comercial desincronizado: npm run catalog:sync");
if (!/^1\.\d+\.\d+$/.test(version))
  throw Error("La versión estable debe ser 1.x.y");
for (const dir of dirs) {
  const base = path.join(root, dir),
    pkg = JSON.parse(fs.readFileSync(path.join(base, "package.json"))),
    lock = JSON.parse(fs.readFileSync(path.join(base, "package-lock.json")));
  if (
    pkg.version !== version ||
    lock.version !== version ||
    lock.packages[""].version !== version ||
    /^## (\d+\.\d+\.\d+) /m.exec(
      fs.readFileSync(path.join(base, "CHANGELOG.md"), "utf8"),
    )?.[1] !== version
  )
    throw Error("Versión/changelog inconsistente en " + dir);
}
const result = spawnSync(
  "docker",
  [
    "compose",
    "--project-directory",
    root,
    "-f",
    path.join(__dirname, "compose.local.yml"),
    ...(process.argv.length > 2
      ? process.argv.slice(2)
      : ["config", "--quiet"]),
  ],
  {
    cwd: root,
    env: { ...process.env, OBSERVATORIO_VERSION: version },
    stdio: "inherit",
    windowsHide: true,
  },
);
process.exitCode = result.status ?? 1;
