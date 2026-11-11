// El JSON del backend es la fuente Ãºnica. La copia del frontend se genera, no se edita.
const fs = require("node:fs"),
  path = require("node:path"),
  crypto = require("node:crypto");
const source = path.resolve(
  __dirname,
  "../src/commercial/commercial-catalog.json",
);
const target = path.resolve(
  __dirname,
  "../../observatorio-de-leyes-frontend/app/lib/commercial-catalog.json",
);
const data = fs.readFileSync(source);
if (process.argv.includes("--check")) {
  if (!fs.existsSync(target) || !data.equals(fs.readFileSync(target)))
    throw Error(
      "CatÃ¡logo comercial desincronizado; ejecutar operations/sync-commercial-catalog.cjs",
    );
} else fs.writeFileSync(target, data);
console.log(
  "CatÃ¡logo " +
    JSON.parse(data).version +
    " sincronizado; SHA-256 " +
    crypto.createHash("sha256").update(data).digest("hex").slice(0, 12),
);
