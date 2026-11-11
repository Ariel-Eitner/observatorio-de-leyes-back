// Aplicar el esquema antes de abrir el puerto o iniciar los trabajos periódicos.
const { spawnSync, spawn } = require("node:child_process");
const path = require("node:path");
const root = path.resolve(__dirname, "..");

if (!process.env.DATABASE_URL?.trim()) {
  console.error("No se puede iniciar: falta DATABASE_URL en el entorno.");
  process.exit(1);
}
const migration = spawnSync(
  process.execPath,
  [require.resolve("prisma/build/index.js"), "migrate", "deploy"],
  { cwd: root, env: process.env, stdio: "inherit", windowsHide: true },
);
if (migration.status !== 0) {
  console.error(
    "No se inició el servidor: las migraciones pendientes deben resolverse primero.",
  );
  process.exit(migration.status || 1);
}
const server = spawn(process.execPath, [path.join(root, "dist/main.js")], {
  cwd: root,
  env: process.env,
  stdio: "inherit",
  windowsHide: true,
});
for (const signal of ["SIGTERM", "SIGINT"]) {
  process.on(signal, () => server.kill(signal));
}
server.on("error", () => {
  console.error("No se pudo iniciar el servidor.");
  process.exit(1);
});
server.on("exit", (code, signal) =>
  process.exit(code ?? (signal === "SIGTERM" ? 0 : 1)),
);
