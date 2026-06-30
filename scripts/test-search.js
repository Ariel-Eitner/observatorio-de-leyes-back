/* Test manual del buscador: corre SearchDbService (compilado, dist/) contra la BD
 * real y muestra, por cada query, qué devuelve el autocompletado (suggest) y la
 * búsqueda completa (search). Uso:
 *   DATABASE_URL="postgres://..." node scripts/test-search.js
 */
const { PrismaClient } = require("@prisma/client");
const { SearchDbService } = require("../dist/src/search/search-db.service");

const prisma = new PrismaClient();
const svc = new SearchDbService(prisma);

// query → qué se PRETENDE encontrar (para comparar a ojo).
const CASOS = [
  ["ley de contra",              "Leyes cuyo nombre empieza con 'contra…' (Contrato de Trabajo, etc.)"],
  ["ley de contrato de trabajo", "Ley de Contrato de Trabajo (20.744 / LCT) primera"],
  ["contrato de trabajo",        "Ley de Contrato de Trabajo (20.744 / LCT) primera"],
  ["codigo penal",               "Código Penal primero"],
  ["LCT",                        "Ley de Contrato de Trabajo (sigla)"],
  ["habeas corpus",              "Norma de Habeas Corpus"],
  ["26388",                      "Ley 26.388 por número"],
];

function fmt(r) {
  const n = r.lawNumber ? ` · ${r.lawNumber}` : "";
  const sc = r.score != null ? ` (score ${Math.round(r.score)})` : "";
  return `[${r.type}] ${r.title}${n}${sc}`;
}

(async () => {
  for (const [q, esperado] of CASOS) {
    console.log("\n══════════════════════════════════════════════════════════");
    console.log(`QUERY:     "${q}"`);
    console.log(`SE BUSCA:  ${esperado}`);

    const sug = await svc.suggest(q, 8);
    console.log(`\n  AUTOCOMPLETE (suggest) — ${sug.length} resultados:`);
    sug.forEach((s, i) => console.log(`   ${i + 1}. ${fmt(s)}`));

    const res = await svc.search(q, { limit: 8 });
    console.log(`\n  BÚSQUEDA (search) — ${res.length} resultados:`);
    res.forEach((r, i) => console.log(`   ${i + 1}. ${fmt(r)}`));
  }
  await prisma.$disconnect();
})().catch((e) => { console.error(e); process.exit(1); });
