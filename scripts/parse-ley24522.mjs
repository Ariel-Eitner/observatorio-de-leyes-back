/**
 * Parser one-off: lee el texto oficial limpio de la Ley 24.522 (_ley24522.txt,
 * extraído de InfoLeg) y genera src/data/ley-24522.articulos.ts con el array
 * RAW_24522 = [{ number, title, text }]. El texto verbatim de la ley vive en el
 * archivo generado (escrito por Node), nunca en la salida del asistente.
 *
 * Uso: node scripts/parse-ley24522.mjs
 */
import fs from 'fs';

const SRC = 'c:/Users/aeitner/Desktop/Ariel/observatorio-de-leyes/_ley24522.txt';
const OUT = 'c:/Users/aeitner/Desktop/Ariel/observatorio-de-leyes/observatorio-de-leyes-backend/src/data/ley-24522.articulos.ts';

const lines = fs.readFileSync(SRC, 'utf8').split(/\r?\n/);

// Encabezado real: "ARTICULO N" (original, mayúsculas) o "Artículo N bis" (agregado
// por reforma, title-case). Exigimos separador .- o : tras el número para no capturar
// referencias cruzadas del cuerpo ("Artículo 262, quien...", "del artículo 39,").
const ART_RE = /^(?:ARTICULO|Artículo)\s+(\d+(?:\s*(?:bis|ter))?)\s*[°º]?\s*[.\-:]+\s*(.*)$/;
const HEADER_RE = /^(TITULO|CAPITULO|SECCION|LIBRO)\b/i;

function normNum(s) {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

const arts = [];
let cur = null;
for (const line of lines) {
  const m = line.match(ART_RE);
  if (m) {
    if (cur) arts.push(cur);
    cur = { number: normNum(m[1]), rest: [m[2]] };
    continue;
  }
  if (HEADER_RE.test(line)) {
    if (cur) { arts.push(cur); cur = null; }
    continue;
  }
  if (cur) cur.rest.push(line);
}
if (cur) arts.push(cur);

// Limpieza de texto + extracción de título
function clean(text) {
  let t = text.replace(/\s+/g, ' ').trim();
  // Cortar el bloque final de InfoLeg ("Antecedentes Normativos", firma de sanción)
  t = t.split(/Antecedentes\s+Normativos/i)[0];
  t = t.split(/DADA\s+EN\s+LA\s+SALA/i)[0];
  t = t.split(/FE\s+DE\s+ERRATAS/i)[0];
  // Quitar notas de provenance de InfoLeg (cualquier paréntesis con "B.O." o "Nota Infoleg")
  t = t.replace(/\([^)]*B\.O\.[^)]*\)/gi, '');
  t = t.replace(/\(\s*Nota\s+Infoleg[^)]*\)/gi, '');
  t = t.replace(/\s+/g, ' ').trim();
  // Quitar puntos/espacios colgando antes de cierre
  t = t.replace(/\s+\./g, '.').replace(/\s+,/g, ',').trim();
  return t;
}

function title(text) {
  const t = text.replace(/\s+/g, ' ').trim();
  // Título = primera oración (hasta el primer punto), acotado
  let firstStop = t.search(/\.\s/);
  if (firstStop === -1) firstStop = t.indexOf('.');
  let cand = (firstStop > 0 ? t.slice(0, firstStop) : t).trim();
  if (cand.length > 80 || cand.length === 0) {
    cand = t.slice(0, 70).trim();
  }
  return cand;
}

const out = arts.map((a) => {
  const text = clean(a.rest.join(' '));
  return { number: a.number, title: title(text), text };
}).filter((a) => a.text.length > 0);

const header = `/**
 * GENERADO automáticamente por scripts/parse-ley24522.mjs desde el texto oficial
 * de InfoLeg. NO editar a mano: regenerar con \`node scripts/parse-ley24522.mjs\`.
 * Contiene el texto verbatim de los ${out.length} artículos de la Ley 24.522.
 */
export interface Raw24522 { number: string; title: string; text: string; }

export const RAW_24522: Raw24522[] = [
`;

const body = out
  .map((a) => `  { number: ${JSON.stringify(a.number)}, title: ${JSON.stringify(a.title)}, text: ${JSON.stringify(a.text)} },`)
  .join('\n');

fs.writeFileSync(OUT, header + body + '\n];\n', 'utf8');

console.log(`OK: ${out.length} artículos -> ${OUT}`);
console.log('Primeros:', out.slice(0, 3).map((a) => a.number).join(', '));
console.log('Últimos:', out.slice(-3).map((a) => a.number).join(', '));
console.log('Con "bis/ter":', out.filter((a) => /bis|ter/.test(a.number)).map((a) => a.number).join(', '));

// Auditoría de huecos en la numeración entera (informativo: puede haber derogados).
const ints = new Set(out.map((a) => parseInt(a.number, 10)));
const max = Math.max(...ints);
const faltan = [];
for (let i = 1; i <= max; i++) if (!ints.has(i)) faltan.push(i);
console.log(`Rango 1..${max}. Números enteros ausentes: ${faltan.length ? faltan.join(', ') : 'ninguno'}`);
