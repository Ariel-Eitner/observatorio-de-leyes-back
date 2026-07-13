/* Regresión del buscador contra la BD real: cada caso declara la query y qué norma /
 * artículo DEBE salir primero (match por substring, sin acentos). Sale con código 1 si
 * alguno falla, así puede correrse antes de un deploy.
 *
 * Los casos salen del tracking real (tabla tracking_events): son las búsquedas que la
 * gente hizo y que devolvían ruido o cero.
 *
 *   DATABASE_URL="postgres://..." node scripts/test-search-regress.js
 */
const { PrismaClient } = require('@prisma/client');
const { SearchDbService } = require('../dist/src/search/search-db.service');

const prisma = new PrismaClient();
const svc = new SearchDbService(prisma);

// [query, texto que debe aparecer en el título del PRIMER resultado]
const CASOS = [
  // Referencia a artículo dentro de una norma NOMBRADA (el orden se invertía).
  ['codigo penal art 79', 'homicidio simple'],
  ['codigo penal art. 79', 'homicidio simple'],
  ['articulo 79 codigo penal', 'homicidio simple'],
  ['art 1725 ccc', 'valoracion de la conducta'],
  ['art 14 bis constitucion nacional', 'derechos laborales'],
  // Falso positivo del boost por nombre (trigramas): "Tiempo Compartido" ganaba.
  ['tenencia compartida', 'cuidado personal'],
  ['cuidado personal compartido', 'cuidado personal'],
  // Fallback OR: un único match casual (Ley 11.683) bloqueaba el fallback.
  ['amparo ajustes razonables', 'discapacidad'],
  // Número suelto que es artículo de código, no ley (antes devolvía la Ley 17.250).
  ['1725', 'valoracion de la conducta'],
  // Alias en el boost por nombre (antes: "habeas data" → Ley de Hábeas Corpus).
  ['habeas data', 'datos personales'],
  ['habeas corpus', 'habeas corpus'],
  // Sinónimos nuevos.
  ['mobbing', 'acoso'],
  // Hueco de vocabulario resuelto con keyword en BD.
  ['hemofilia', 'enfermedades poco frecuentes'],
  // Controles de no-regresión (ya andaban).
  ['ley de contrato de trabajo', 'contrato de trabajo'],
  ['codigo penal', 'codigo penal'],
  ['26388', 'delitos informaticos'],
  ['fotomulta', 'transito'],
  ['echar trabajadores sin pagar', 'despido'],
];

const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

(async () => {
  let fallos = 0;
  for (const [q, esperado] of CASOS) {
    const res = await svc.search(q, { limit: 5 });
    const top = res[0];
    const ok = top && norm(top.title).includes(norm(esperado));
    if (!ok) fallos++;
    const got = top ? `${top.title} (${top.lawTitle})` : '— SIN RESULTADOS —';
    console.log(`${ok ? 'OK  ' : 'FALLA'} ${q.padEnd(36)} → ${got}`);
    if (!ok) console.log(`      esperaba que el 1º contuviera: "${esperado}"`);
  }
  console.log(`\n${CASOS.length - fallos}/${CASOS.length} OK`);
  await prisma.$disconnect();
  process.exit(fallos ? 1 : 0);
})();
