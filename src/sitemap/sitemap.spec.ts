/**
 * Tests de validación del sitemap y URLs del sistema.
 * Validan la estructura estática sin necesitar un servidor corriendo.
 */

import { ALL_LAWS, NORMAS_CLAVE } from '../data';
import { CONSTITUCIONES_PROVINCIALES } from '../data/constituciones-provinciales/index';
import { computeFrontendPath } from '../common/utils/law-url.util';
import { ALL_FALLOS } from '../data/jurisprudencia';

const ALL_SOURCES = [...NORMAS_CLAVE, ...ALL_LAWS, ...CONSTITUCIONES_PROVINCIALES];
const SEEN_IDS = new Set<string>();
const UNIQUE = ALL_SOURCES.filter((l) => {
  if (SEEN_IDS.has(l.id)) return false;
  SEEN_IDS.add(l.id);
  return true;
});

// ── Páginas estáticas conocidas ───────────────────────────────────────────────

const STATIC_PAGES = [
  '/',
  '/leyes',
  '/categorias',
  '/codigos',
  '/tratados',
  '/constituciones',
  '/sectores',
  '/glosario',
  '/herramientas',
  '/buscar',
  '/alerta-sofia',
  '/jurisprudencia',
  '/contacto',
  '/apoya',
  '/legal/terminos-y-condiciones',
  '/legal/politica-de-privacidad',
  '/legal/aviso-legal',
  '/legal/mision',
];

describe('Sitemap — páginas estáticas', () => {
  test('todas las páginas estáticas tienen path que empieza con /', () => {
    for (const page of STATIC_PAGES) {
      expect(page).toMatch(/^\//);
    }
  });

  test('no hay páginas estáticas duplicadas', () => {
    const unique = new Set(STATIC_PAGES);
    expect(STATIC_PAGES.length).toBe(unique.size);
  });

  test('/alerta-sofia está en el sitemap', () => {
    expect(STATIC_PAGES).toContain('/alerta-sofia');
  });

  test('/jurisprudencia está en el sitemap', () => {
    expect(STATIC_PAGES).toContain('/jurisprudencia');
  });
});

// ── Frontend paths de leyes ───────────────────────────────────────────────────

describe('Sitemap — paths de leyes', () => {
  test('computeFrontendPath genera paths que empiezan con /', () => {
    const invalidPaths: string[] = [];
    for (const law of UNIQUE) {
      const path = computeFrontendPath(law);
      if (!path.startsWith('/')) invalidPaths.push(`${law.id} → "${path}"`);
    }
    expect(invalidPaths).toEqual([]);
  });

  test('computeFrontendPath no genera paths con doble slash', () => {
    const invalid: string[] = [];
    for (const law of UNIQUE) {
      const path = computeFrontendPath(law);
      if (path.includes('//')) invalid.push(`${law.id} → "${path}"`);
    }
    expect(invalid).toEqual([]);
  });

  test('las constituciones provinciales tienen path /constituciones/[slug]', () => {
    for (const prov of CONSTITUCIONES_PROVINCIALES) {
      const path = computeFrontendPath(prov);
      expect(path).toMatch(/^\/constituciones\/.+/);
    }
  });

  test('NORMAS_CLAVE tienen paths únicos', () => {
    const paths = NORMAS_CLAVE.map(computeFrontendPath);
    const unique = new Set(paths);
    expect(paths.length).toBe(unique.size);
  });

  test('la Convención de los Derechos del Niño tiene path /tratados/convencion-derechos-nino', () => {
    const cdn = UNIQUE.find((l) => l.id === 'convencion-derechos-nino');
    if (cdn) {
      expect(computeFrontendPath(cdn)).toBe('/tratados/convencion-derechos-nino');
    }
  });

  test('la Carta ONU tiene path /tratados/carta-onu', () => {
    const onu = UNIQUE.find((l) => l.id === 'carta-onu');
    if (onu) {
      expect(computeFrontendPath(onu)).toBe('/tratados/carta-onu');
    }
  });
});

// ── Rutas de jurisprudencia ───────────────────────────────────────────────────

describe('Sitemap — jurisprudencia', () => {
  test('todos los fallos tienen slug válido para URL', () => {
    for (const fallo of ALL_FALLOS) {
      expect(fallo.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  test('rutas de fallos siguen el patrón /jurisprudencia/[slug]', () => {
    for (const fallo of ALL_FALLOS) {
      const path = `/jurisprudencia/${fallo.slug}`;
      expect(path).toMatch(/^\/jurisprudencia\/[a-z0-9-]+$/);
    }
  });

  test('cullen-llerena está disponible en el sistema', () => {
    const fallo = ALL_FALLOS.find((f) => f.slug === 'cullen-llerena');
    expect(fallo).toBeDefined();
    expect(fallo?.tribunal).toBe('CSJN');
  });
});

// ── Registry API ──────────────────────────────────────────────────────────────

describe('Registry — estructura del sistema', () => {
  test('todas las leyes en ALL_LAWS tienen number', () => {
    const missing = ALL_LAWS.filter((l) => !l.number);
    expect(missing.map((l) => l.id)).toEqual([]);
  });

  test('todas las leyes en NORMAS_CLAVE tienen articles cargados', () => {
    const empty = NORMAS_CLAVE.filter((l) => l.articles.length === 0);
    expect(empty.map((l) => l.id)).toEqual([]);
  });

  test(`hay ${CONSTITUCIONES_PROVINCIALES.length} constituciones provinciales`, () => {
    // 24 = 23 provincias + CABA
    expect(CONSTITUCIONES_PROVINCIALES.length).toBe(24);
  });

  test('la CDN está en NORMAS_CLAVE', () => {
    const cdn = NORMAS_CLAVE.find((l) => l.id === 'convencion-derechos-nino');
    expect(cdn).toBeDefined();
  });
});
