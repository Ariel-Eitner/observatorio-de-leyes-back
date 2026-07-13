import type { Law } from '../types/law.types';

// Rutas curadas a mano SOLO para normas "troncales" que viven fuera de /leyes
// (códigos, constitución nacional, tratados). Las leyes comunes NO van acá: usan
// el patrón canónico número-nombre (computeFrontendPath default), así no quedan
// URLs "forma-id" (ej. /leyes/ley-26639) ni slugs "de marca" que repiten "ley".
const TIPO_SLUG: Record<string, string> = {
  'constitucion-nacional':  '/constituciones/nacional',
  'codigo-penal':           '/codigos/penal',
  'codigo-aduanero':        '/codigos/aduanero',
  'codigo-civil-comercial': '/codigos/civil-comercial',
  'ley-27150':              '/codigos/procesal-penal',
  'carta-onu':              '/tratados/carta-onu',
  'convencion-derechos-nino': '/tratados/convencion-derechos-nino',
};

function slugify(text: string): string {
  const s = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  if (s.length <= 60) return s.replace(/-+$/, '');
  // Corte a ~60 sin partir palabras: retrocede hasta el último guion, así
  // termina en "…trafico" y no en "…trafico-ilicit" (palabra cortada al medio).
  const cut = s.slice(0, 60);
  const i = cut.lastIndexOf('-');
  return (i > 0 ? cut.slice(0, i) : cut).replace(/-+$/, '');
}

// Slug descriptivo a partir del título oficial, sin el prefijo redundante.
// Saca: el tipo de norma con su número ("Decreto 151/2022 —", "Resolución
// General ARCA 5844/2026 —"), el prefijo "Ley de/del/de la", y un "N° 6961 —"
// inicial (para no duplicar el número que ya se antepone en las leyes).
function descriptiveSlug(title: string): string {
  const name = title
    .replace(/^(?:Decreto(?:-Ley)?|Resoluci[oó]n\s+General(?:\s+[A-Za-z]+)?|Disposici[oó]n|DNU)\s+[^—–-]*[—–-]\s*/i, '')
    .replace(/^Ley\s+(de\s+la[s]?\s+|de\s+los?\s+|del\s+|de\s+)?/i, '')
    .replace(/^N[°º]?\s*\d[\d.]*\s*[—–\-:.]*\s*/i, '')
    .trim();
  return slugify(name);
}

export function computeFrontendPath(law: Law): string {
  if (TIPO_SLUG[law.id]) return TIPO_SLUG[law.id];
  if (law.id.startsWith('const-')) return `/constituciones/${law.id.slice('const-'.length)}`;
  if (law.id.startsWith('dnu-')) return `/dnu/${law.id.slice('dnu-'.length)}`;
  // Decretos y resoluciones: id (que ya trae tipo+número) + nombre descriptivo,
  // para sumar keywords y no quedar como /leyes/decreto-151-2022 "pelado".
  if (law.id.startsWith('decreto-') || law.id.startsWith('rg-')) {
    const slug = descriptiveSlug(law.title);
    return slug ? `/leyes/${law.id}-${slug}` : `/leyes/${law.id}`;
  }
  // Ley común: número (sin punto/barra) + nombre descriptivo. Patrón canónico SEO.
  const cleanNumber = law.number.replace(/\./g, '').replace(/\//g, '-');
  let slug = descriptiveSlug(law.title);
  // No duplicar el número cuando el título ya arranca con él, ej. el título guardado
  // "Ley 11.683 - Procedimiento Tributario" → slug "11683-…" → /leyes/11683-… (no
  // /leyes/11683-11683-…). Dedup EXACTO contra el número real: no toca un número que
  // sea parte del nombre (un año, una cantidad).
  if (slug === cleanNumber) slug = '';
  else if (slug.startsWith(`${cleanNumber}-`)) slug = slug.slice(cleanNumber.length + 1);
  return slug ? `/leyes/${cleanNumber}-${slug}` : `/leyes/${cleanNumber}`;
}

export function slugifyArticle(articleNumber: string): string {
  return articleNumber
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[º°]/g, 'o')
    .replace(/ª/g, 'a')
    .toLowerCase()
    // alineado con toArticleSlug del front: "142bis" → "142-bis"
    .replace(/(\d)(bis|ter|quater)\b/g, '$1-$2')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');
}

export function computeArticleUrl(law: Law, articleNumber: string): string {
  if (!articleNumber || articleNumber === '0') return computeFrontendPath(law);
  const slug = slugifyArticle(articleNumber);
  return `${computeFrontendPath(law)}/articulo/${slug}`;
}
