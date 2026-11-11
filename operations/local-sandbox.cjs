// Disposable local demo. All application secrets and data are synthetic.
const fs = require("node:fs");
const path = require("node:path");
const { spawn, spawnSync } = require("node:child_process");
const { createServer } = require("node:http");
const { randomBytes } = require("node:crypto");
const root = path.resolve(__dirname, ".."),
  front = path.resolve(root, "../observatorio-de-leyes-frontend");
const work = path.join(root, ".local/payments-sandbox");
fs.mkdirSync(work, { recursive: true });
const stateFile = path.join(work, "state.private.json");
const action = process.argv[2] ?? "start";
function run(command, args, env) {
  const r = spawnSync(command, args, {
    cwd: root,
    env,
    encoding: "utf8",
    windowsHide: true,
  });
  if (r.status !== 0)
    throw Error((r.stderr || r.stdout || "Command failed").slice(-1500));
  return r.stdout.trim();
}
async function start() {
  try {
    const response = await fetch("http://127.0.0.1:4772/status", {
      signal: AbortSignal.timeout(1500),
    });
    if (
      response.ok &&
      (await response.json()).mode ===
        "synthetic payments; disposable data; no emails"
    ) {
      console.log("Sandbox ya disponible: http://127.0.0.1:4771");
      return;
    }
  } catch {
    /* Not running. */
  }
  const log = fs.openSync(path.join(work, "sandbox.log"), "a");
  const child = spawn(process.execPath, [__filename, "serve"], {
    cwd: root,
    detached: true,
    windowsHide: true,
    stdio: ["ignore", log, log],
  });
  child.unref();
  console.log("Iniciando sandbox. Estado y registros: .local/payments-sandbox");
}
if (action === "start") {
  start().catch((e) => {
    console.error(e.message);
    process.exitCode = 1;
  });
} else if (action === "build") {
  const env = { ...process.env };
  for (const dir of [root, front])
    for (const name of [
      ".env",
      ".env.local",
      ".env.production",
      ".env.production.local",
      ".env.development",
      ".env.development.local",
    ]) {
      const file = path.join(dir, name);
      if (fs.existsSync(file))
        for (const match of fs
          .readFileSync(file, "utf8")
          .matchAll(/^([A-Z][A-Z0-9_]*)=/gm))
          env[match[1]] = "";
    }
  Object.assign(env, {
    NODE_ENV: "production",
    SITEMAP_SKIP: "1",
    OBS_LOCAL_SANDBOX: "true",
    BILLING_ENABLED: "false",
    DATABASE_URL: "postgresql://fixture:fixture@127.0.0.1:1/no_build_database",
    INTERNAL_API_URL: "http://127.0.0.1:4770/api",
    NEXT_PUBLIC_API_URL: "http://127.0.0.1:4770/api",
    ADMIN_SECRET: "isolated-build-only",
    SUPABASE_URL: "http://127.0.0.1:9",
    SUPABASE_SERVICE_KEY: "isolated-build-only",
  });
  const result = spawnSync(
    process.execPath,
    [path.join(front, "node_modules/next/dist/bin/next"), "build"],
    { cwd: front, env, stdio: "inherit", windowsHide: true },
  );
  process.exitCode = result.status ?? 1;
} else if (action === "stop") {
  const state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
  fetch("http://127.0.0.1:4772/shutdown", {
    method: "POST",
    headers: { "x-sandbox-control": state.control },
  })
    .then((r) => {
      if (!r.ok) throw Error("Control rejected");
      console.log("Sandbox detenido");
    })
    .catch((e) => {
      console.error(e.message);
      process.exitCode = 1;
    });
} else if (action === "status") {
  fetch("http://127.0.0.1:4772/status")
    .then((r) => r.json())
    .then(console.log)
    .catch(() => {
      console.log("Sandbox no disponible");
      process.exitCode = 1;
    });
} else if (action === "serve") {
  const children = [];
  let container,
    provider,
    control,
    closing = false;
  async function shutdown() {
    if (closing) return;
    closing = true;
    for (const child of children) {
      if (child.exitCode === null) {
        if (process.platform === "win32")
          spawnSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], {
            windowsHide: true,
            stdio: "ignore",
          });
        else child.kill("SIGTERM");
      }
    }
    if (container)
      spawnSync("docker", ["rm", "--force", container], {
        stdio: "ignore",
        windowsHide: true,
      });
    provider?.close();
    control?.close();
    process.exit(0);
  }
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  (async () => {
    const env = { ...process.env };
    // Next loads .env.local automatically; explicitly override every declared key.
    for (const file of [
      path.join(root, ".env"),
      path.join(front, ".env.local"),
      path.join(front, ".env"),
    ]) {
      if (fs.existsSync(file))
        for (const match of fs
          .readFileSync(file, "utf8")
          .matchAll(/^([A-Z][A-Z0-9_]*)=/gm))
          env[match[1]] = "";
    }
    const secret = randomBytes(32).toString("hex"),
      password = randomBytes(24).toString("hex");
    Object.assign(env, {
      NODE_ENV: "development",
      OBS_LOCAL_SANDBOX: "true",
      BILLING_ENABLED: "true",
      ALLOW_MOCK_PAYMENTS: "true",
      ADMIN_SECRET: secret,
      ADMIN_PASSWORD: "Local-admin-2026!",
      AUTH_ENABLED: "true",
      ADMIN_BYPASS_LOCAL: "false",
      AUTH_COOKIE_SECURE: "false",
      JWT_ACCESS_SECRET: randomBytes(32).toString("hex"),
      JWT_ACCESS_TTL: "15m",
      REFRESH_TTL_DAYS: "30",
      MP_ACCESS_TOKEN: "local-synthetic-token",
      MP_COLLECTOR_ID: "1234",
      MP_WEBHOOK_SECRET: randomBytes(32).toString("hex"),
      MP_SITE_URL: "http://127.0.0.1:4771",
      NEXT_PUBLIC_API_URL: "http://127.0.0.1:4770/api",
      INTERNAL_API_URL: "http://127.0.0.1:4770/api",
      FRONTEND_URL: "http://127.0.0.1:4771",
      PORT: "4770",
      HOST: "127.0.0.1",
      DB_ENV: "local-sandbox",
      SUPABASE_URL: "http://127.0.0.1:9",
      SUPABASE_SERVICE_KEY: "local-fixture",
      SITEMAP_SKIP: "1",
    });
    let serial = 100;
    const payments = new Map(),
      keys = new Map();
    provider = createServer(async (req, res) => {
      const url = new URL(req.url, "http://localhost");
      let raw = "";
      for await (const part of req) raw += part;
      let body = {};
      try {
        body = JSON.parse(raw || "{}");
      } catch {}
      let result;
      if (req.method === "POST" && url.pathname === "/v1/payments") {
        const key = req.headers["x-idempotency-key"];
        let id = keys.get(key);
        if (!id) {
          id = String(++serial);
          keys.set(key, id);
          payments.set(id, {
            id,
            external_reference: body.external_reference,
            status: "approved",
            transaction_amount: body.transaction_amount,
            currency_id: "ARS",
            collector_id: 1234,
            date_last_updated: new Date().toISOString(),
          });
        }
        result = payments.get(id);
      } else if (url.pathname === "/v1/payments/search")
        result = {
          results: [...payments.values()].filter(
            (p) =>
              p.external_reference ===
              url.searchParams.get("external_reference"),
          ),
        };
      else if (url.pathname.startsWith("/v1/payments/"))
        result = payments.get(url.pathname.split("/").pop());
      if (!result) {
        res.statusCode = 404;
        result = { error: "only synthetic card payments supported" };
      }
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    });
    await new Promise((resolve) => provider.listen(0, "127.0.0.1", resolve));
    env.MP_API_BASE_URL = "http://127.0.0.1:" + provider.address().port;
    container = "obs-national-local-" + process.pid;
    run(
      "docker",
      [
        "run",
        "-d",
        "--name",
        container,
        "--label",
        "observatorio.local-sandbox=true",
        "--memory",
        "512m",
        "--tmpfs",
        "/var/lib/postgresql/data",
        "-p",
        "127.0.0.1::5432",
        "-e",
        "POSTGRES_USER=postgres",
        "-e",
        "POSTGRES_DB=observatorio_local_sandbox",
        "-e",
        "POSTGRES_PASSWORD=" + password,
        "postgres:17-alpine",
      ],
      env,
    );
    const port = run("docker", ["port", container, "5432/tcp"], env)
      .split(":")
      .pop();
    env.DATABASE_URL = `postgresql://postgres:${password}@127.0.0.1:${port}/observatorio_local_sandbox?schema=public`;
    for (let i = 0; i < 60; i++) {
      if (
        spawnSync(
          "docker",
          ["exec", container, "pg_isready", "-U", "postgres"],
          { stdio: "ignore", windowsHide: true },
        ).status === 0
      )
        break;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    run(
      process.execPath,
      [require.resolve("prisma/build/index.js"), "migrate", "deploy"],
      env,
    );
    // Prisma client reads the URL from the process environment when constructed.
    process.env.DATABASE_URL = env.DATABASE_URL;
    const { PrismaClient } = require("@prisma/client");
    const db = new PrismaClient();
    const hash = await require("argon2").hash("Local-demo-2026!");
    for (const [email, isAdmin] of [
      ["usuario@local.invalid", false],
      ["otro@local.invalid", false],
      ["admin@local.invalid", true],
    ])
      await db.user.create({
        data: {
          email,
          passwordHash: hash,
          isAdmin,
          nombre: isAdmin ? "Administrador local" : "Usuario de prueba",
        },
      });
    await db.norms.createMany({
      data: Array.from({ length: 20 }, (_, i) => ({
        id: `fixture-law-${i}`,
        title: `Ley de prueba ${i}`,
        jurisdiction: "NACIONAL",
        norm_type: "LEY",
      })),
      skipDuplicates: true,
    });
    await db.$disconnect();
    for (const [cwd, args, file] of [
      [root, ["dist/main.js"], "backend.log"],
      [
        front,
        [
          path.join(front, "node_modules/next/dist/bin/next"),
          "start",
          "-p",
          "4771",
          "-H",
          "127.0.0.1",
        ],
        "frontend.log",
      ],
    ]) {
      const out = fs.openSync(path.join(work, file), "a");
      const child = spawn(process.execPath, args, {
        cwd,
        env: cwd === front ? { ...env, NODE_ENV: "production" } : env,
        windowsHide: true,
        stdio: ["ignore", out, out],
      });
      children.push(child);
      child.once("exit", () => {
        if (!closing) shutdown();
      });
    }
    const controlKey = randomBytes(32).toString("hex");
    fs.writeFileSync(
      stateFile,
      JSON.stringify(
        {
          pid: process.pid,
          container,
          control: controlKey,
          url: "http://127.0.0.1:4771",
          databaseUrl: env.DATABASE_URL,
        },
        null,
        2,
      ),
      { mode: 0o600 },
    );
    control = createServer((req, res) => {
      res.setHeader("Content-Type", "application/json");
      if (
        req.url === "/shutdown" &&
        req.method === "POST" &&
        req.headers["x-sandbox-control"] === controlKey
      ) {
        res.end('{"ok":true}');
        setTimeout(shutdown, 100);
        return;
      }
      if (req.url === "/status" && req.method === "GET") {
        res.end(
          JSON.stringify({
            url: "http://127.0.0.1:4771",
            mode: "synthetic payments; disposable data; no emails",
            users: [
              "usuario@local.invalid",
              "otro@local.invalid",
              "admin@local.invalid",
            ],
            password: "Local-demo-2026!",
          }),
        );
        return;
      }
      res.statusCode = 404;
      res.end("{}");
    });
    await new Promise((resolve) => control.listen(4772, "127.0.0.1", resolve));
    console.log("Sandbox listo: http://127.0.0.1:4771");
  })().catch(async (error) => {
    console.error(error.message);
    await shutdown();
  });
}
