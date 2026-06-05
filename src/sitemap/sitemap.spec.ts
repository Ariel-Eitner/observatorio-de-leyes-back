/**
 * Tests del sitemap: páginas estáticas y rutas de jurisprudencia.
 * Las normas migraron a la BD; su integridad y paths se validan en
 * db-integrity.spec (datos) y en el endpoint del registry.
 */

import { ALL_FALLOS } from '../data/jurisprudencia';

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
