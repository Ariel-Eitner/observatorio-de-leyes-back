/**
 * Tests de integridad y calidad para los datos de jurisprudencia.
 */

import { ALL_FALLOS } from '../data/jurisprudencia';

describe('Jurisprudencia — datos cargados', () => {
  test('hay al menos un fallo cargado', () => {
    expect(ALL_FALLOS.length).toBeGreaterThan(0);
  });

  test('no hay slugs duplicados', () => {
    const slugs = ALL_FALLOS.map((f) => f.slug);
    const unique = new Set(slugs);
    expect(slugs.length).toBe(unique.size);
  });
});

describe('Jurisprudencia — campos requeridos', () => {
  test.each(ALL_FALLOS.map((f) => [f.slug, f]))(
    '%s tiene campos obligatorios',
    (_, fallo) => {
      expect(fallo.id).toBeTruthy();
      expect(fallo.slug).toBeTruthy();
      expect(fallo.tribunal).toBeTruthy();
      expect(fallo.caratula).toBeTruthy();
      expect(fallo.citation).toBeTruthy();
      expect(fallo.summary).toBeTruthy();
      expect(['VIGENTE', 'SUPERADO', 'MODIFICADO']).toContain(fallo.status);
    }
  );

  test.each(ALL_FALLOS.map((f) => [f.slug, f]))(
    '%s tiene fecha en formato YYYY-MM-DD',
    (_, fallo) => {
      expect(fallo.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  );

  test.each(ALL_FALLOS.map((f) => [f.slug, f]))(
    '%s tiene keywords y topics',
    (_, fallo) => {
      expect(fallo.keywords.length).toBeGreaterThan(0);
      expect(fallo.topics.length).toBeGreaterThan(0);
    }
  );
});

describe('Jurisprudencia — secciones', () => {
  const VALID_SECTION_TYPES = ['hechos', 'cuestion', 'ratio', 'fundamentos', 'obiter', 'disidencia'];

  test.each(ALL_FALLOS.map((f) => [f.slug, f]))(
    '%s tiene al menos una sección',
    (_, fallo) => {
      expect(fallo.sections.length).toBeGreaterThan(0);
    }
  );

  test.each(ALL_FALLOS.map((f) => [f.slug, f]))(
    '%s tiene sección tipo "ratio" (holding principal)',
    (_, fallo) => {
      const hasRatio = fallo.sections.some((s) => s.type === 'ratio');
      expect(hasRatio).toBe(true);
    }
  );

  test.each(ALL_FALLOS.map((f) => [f.slug, f]))(
    '%s tiene sección tipo "hechos"',
    (_, fallo) => {
      const hasHechos = fallo.sections.some((s) => s.type === 'hechos');
      expect(hasHechos).toBe(true);
    }
  );

  test.each(ALL_FALLOS.map((f) => [f.slug, f]))(
    '%s todas las secciones tienen tipo válido y contenido',
    (_, fallo) => {
      for (const sec of fallo.sections) {
        expect(VALID_SECTION_TYPES).toContain(sec.type);
        expect(sec.id).toBeTruthy();
        expect(sec.content.trim().length).toBeGreaterThan(0);
      }
    }
  );

  test.each(ALL_FALLOS.map((f) => [f.slug, f]))(
    '%s sección ratio tiene plainLanguage',
    (_, fallo) => {
      const ratio = fallo.sections.find((s) => s.type === 'ratio');
      if (ratio) {
        expect(ratio.plainLanguage?.trim().length).toBeGreaterThan(0);
      }
    }
  );
});

describe('Jurisprudencia — relaciones', () => {
  test.each(ALL_FALLOS.map((f) => [f.slug, f]))(
    '%s articlesInterpreted tiene IDs en formato válido',
    (_, fallo) => {
      for (const artId of fallo.articlesInterpreted) {
        // Formato esperado: "lawId-art-N"
        expect(artId).toMatch(/^[a-z0-9-]+-art-[a-z0-9-]+$/);
      }
    }
  );

  test.each(ALL_FALLOS.map((f) => [f.slug, f]))(
    '%s sourceUrl es una URL válida si existe',
    (_, fallo) => {
      if (fallo.sourceUrl) {
        expect(fallo.sourceUrl).toMatch(/^https?:\/\/.+/);
      }
    }
  );
});
