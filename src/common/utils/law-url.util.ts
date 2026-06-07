import type { Law } from '../types/law.types';

const TIPO_SLUG: Record<string, string> = {
  'constitucion-nacional':  '/constituciones/nacional',
  'codigo-penal':           '/codigos/penal',
  'codigo-aduanero':        '/codigos/aduanero',
  'codigo-civil-comercial': '/codigos/civil-comercial',
  'ley-20744':              '/leyes/ley-de-contrato-laboral',
  'ley-27150':              '/codigos/procesal-penal',
  'carta-onu':              '/tratados/carta-onu',
  'convencion-derechos-nino': '/tratados/convencion-derechos-nino',
  'ley-26639':              '/leyes/ley-26639',
  'ley-27801':              '/leyes/ley-27801',
  'ley-27742':              '/leyes/ley-de-bases',
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
}

export function computeFrontendPath(law: Law): string {
  if (TIPO_SLUG[law.id]) return TIPO_SLUG[law.id];
  if (law.id.startsWith('const-')) return `/constituciones/${law.id.slice('const-'.length)}`;
  if (law.id.startsWith('dnu-')) return `/dnu/${law.id.slice('dnu-'.length)}`;
  if (law.id.startsWith('decreto-') || law.id.startsWith('rg-')) return `/leyes/${law.id}`;
  // saca puntos y barras (ej. "5844/2026") para no romper la ruta
  const cleanNumber = law.number.replace(/\./g, '').replace(/\//g, '-');
  const cleanTitle = law.title.replace(/^Ley\s+(de\s+la[s]?\s+|de\s+los?\s+|del\s+|de\s+)?/i, '').trim();
  return `/leyes/${cleanNumber}-${slugify(cleanTitle)}`;
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
