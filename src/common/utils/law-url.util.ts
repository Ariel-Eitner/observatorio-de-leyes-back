import type { Law } from '../types/law.types';

const TIPO_SLUG: Record<string, string> = {
  'constitucion-nacional':  '/constituciones/nacional',
  'codigo-penal':           '/codigos/penal',
  'codigo-aduanero':        '/codigos/aduanero',
  'codigo-civil-comercial': '/codigos/civil-comercial',
  'ley-20744':              '/leyes/ley-de-contrato-laboral',
  'ley-27150':              '/codigos/procesal-penal',
  'carta-onu':              '/tratados/carta-onu',
  'ley-26639':              '/leyes/ley-26639',
  'ley-27801':              '/leyes/ley-27801',
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
  if (law.id.startsWith('decreto-')) return `/leyes/${law.id}`;
  const cleanNumber = law.number.replace(/\./g, '');
  const cleanTitle = law.title.replace(/^Ley\s+(de\s+la[s]?\s+|de\s+los?\s+|del\s+|de\s+)?/i, '').trim();
  return `/leyes/${cleanNumber}-${slugify(cleanTitle)}`;
}

export function computeArticleUrl(law: Law, articleNumber: string): string {
  return `${computeFrontendPath(law)}?articulo=${articleNumber.replaceAll(' ', '-')}`;
}
