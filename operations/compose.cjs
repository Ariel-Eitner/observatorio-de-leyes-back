// Run Compose using the actual software version, without exposing .env contents.
const fs = require("node:fs"),
  path = require("node:path"),
  { spawnSync } = require("node:child_process");
const root = path.resolve(__dirname, "../..");
const dirs = [
  "observatorio-de-leyes-backend",
  "observatorio-de-leyes-frontend",
];
const { check } = require('./release.cjs');
const version = check(path.resolve(__dirname, '..'));
if (check(path.join(root, dirs[1])) !== version)
  throw Error('Versiones distintas entre backend y frontend');
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
