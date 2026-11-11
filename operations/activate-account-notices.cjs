// Activación única de bienvenida y producto para las cuentas existentes.
// Usa DATABASE_URL del entorno; no modifica preferencias ni envía correos.
const { PrismaClient } = require("@prisma/client");
const {
  NotificationsService,
} = require("../dist/notifications/notifications.service");
if (!process.env.DATABASE_URL)
  throw Error("Definí DATABASE_URL explícitamente.");
if (!process.argv.includes("--apply"))
  throw Error("Requiere --apply para activar los avisos existentes.");
const db = new PrismaClient();
(async () => {
  const service = new NotificationsService(db);
  let cursor,
    processed = 0;
  do {
    const users = await db.user.findMany({
      where: { status: "active", ...(cursor ? { id: { gt: cursor } } : {}) },
      select: { id: true },
      orderBy: { id: "asc" },
      take: 100,
    });
    for (const user of users) {
      await service.syncAccount(user.id, true);
      processed++;
    }
    cursor = users.length === 100 ? users[users.length - 1].id : undefined;
  } while (cursor);
  const counts = {};
  for (const kind of ["welcome", "product", "quota"])
    counts[kind] = await db.userNotification.count({
      where: { eventKey: { startsWith: kind + ":" }, archivedAt: null },
    });
  console.log(
    JSON.stringify({
      processed,
      activeNotices: counts,
      completedAt: new Date().toISOString(),
    }),
  );
})()
  .catch(() => {
    console.error(
      "No se completó la activación; se puede reintentar sin duplicar avisos.",
    );
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
