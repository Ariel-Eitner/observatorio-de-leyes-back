import type { Law } from '../types/law.types';

const CUSTOM_PATHS: Record<string, string> = {
  'constitucion-nacional':  '/constitucion-nacional',
  'codigo-penal':           '/codigo-penal',
  'ley-20744':              '/ley-de-contrato-de-trabajo',
  'codigo-aduanero':        '/codigo-aduanero',
  'ley-27150':              '/codigo-procesal-penal',
  'codigo-civil-comercial': '/codigo-civil-comercial',
  'carta-onu':              '/carta-onu',
  'ley-26639':              '/ley-de-glaciares',
  'ley-27801':              '/ley-penal-juvenil',
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
  if (CUSTOM_PATHS[law.id]) return CUSTOM_PATHS[law.id];
  if (law.id.startsWith('const-')) return `/constituciones/${law.id.slice('const-'.length)}`;
  if (law.id.startsWith('decreto-')) return `/leyes/${law.id}`;
  const cleanNumber = law.number.replace(/\./g, '');
  const cleanTitle = law.title.replace(/^Ley\s+(de\s+la[s]?\s+|de\s+los?\s+|del\s+|de\s+)?/i, '').trim();
  return `/leyes/${cleanNumber}-${slugify(cleanTitle)}`;
}

export function computeArticleUrl(law: Law, articleNumber: string): string {
  return `${computeFrontendPath(law)}?articulo=${articleNumber.replaceAll(' ', '-')}`;
}
