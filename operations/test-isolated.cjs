const { spawnSync } = require("node:child_process");
const { randomBytes } = require("node:crypto");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const name = `obs-billing-test-${process.pid}-${Date.now()}`;
function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    ...options,
  });
  if (result.status !== 0)
    throw Error(
      (
        result.stderr ||
        result.stdout ||
        result.error?.message ||
        "Command failed"
      ).slice(-4000),
    );
  return result.stdout.trim();
}
const password = randomBytes(24).toString("hex");
let created = false;
try {
  run("docker", [
    "run",
    "-d",
    "--name",
    name,
    "--label",
    "observatorio.test-managed=true",
    "--memory",
    "512m",
    "--cpus",
    "0.5",
    "--tmpfs",
    "/var/lib/postgresql/data",
    "-p",
    "127.0.0.1::5432",
    "-e",
    "POSTGRES_USER=postgres",
    "-e",
    "POSTGRES_DB=observatorio_billing_fixture",
    "-e",
    "POSTGRES_PASSWORD=" + password,
    "postgres:17-alpine",
  ]);
  created = true;
  const address = run("docker", ["port", name, "5432/tcp"]);
  const port = address.split(":").pop();
  let ready = false;
  for (let i = 0; i < 60; i++) {
    const result = spawnSync(
      "docker",
      [
        "exec",
        name,
        "pg_isready",
        "-U",
        "postgres",
        "-d",
        "observatorio_billing_fixture",
      ],
      { stdio: "ignore" },
    );
    if (result.status === 0) {
      ready = true;
      break;
    }
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 500);
  }
  if (!ready) throw Error("Postgres de pruebas no disponible");
  const env = {
    ...process.env,
    NODE_ENV: "test",
    OBS_LOCAL_SANDBOX: "true",
    OBS_ISOLATED_TEST_DB: "1",
    DATABASE_URL: `postgresql://postgres:${password}@127.0.0.1:${port}/observatorio_billing_fixture?schema=public`,
    ADMIN_SECRET: randomBytes(32).toString("hex"),
    JWT_ACCESS_SECRET: randomBytes(32).toString("hex"),
    MP_ACCESS_TOKEN: "local-fixture-not-a-payment-token",
    MP_COLLECTOR_ID: "1234",
    MP_WEBHOOK_SECRET: randomBytes(32).toString("hex"),
    MP_SITE_URL: "http://127.0.0.1:4771",
    BILLING_ENABLED: "true",
    ALLOW_MOCK_PAYMENTS: "true",
    AUTH_ENABLED: "true",
  };
  run(
    process.execPath,
    [require.resolve("prisma/build/index.js"), "migrate", "deploy"],
    { env },
  );
  const result = spawnSync(
    process.execPath,
    [
      require.resolve("jest/bin/jest"),
      "--runInBand",
      "--testPathPattern=billing.integration.spec",
      "--reporters=default",
    ],
    { cwd: root, env, stdio: "inherit" },
  );
  process.exitCode = result.status ?? 1;
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  if (created)
    spawnSync("docker", ["rm", "--force", name], { stdio: "ignore" });
}
