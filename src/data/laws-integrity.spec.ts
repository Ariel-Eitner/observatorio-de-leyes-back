/**
 * Data integrity tests — validan que las leyes, artículos y segmentos
 * cargados en el sistema cumplen con la estructura requerida.
 */

import { ALL_LAWS, NORMAS_CLAVE } from './index';

// Las constituciones (nacional + provinciales) migraron a la BD: su integridad
// se valida en la migración, ya no en estos tests estáticos sobre el código.
const ALL_SOURCES = [...NORMAS_CLAVE, ...ALL_LAWS];

// Dedup por id (igual que hace LawsService)
const UNIQUE_LAWS = (() => {
  const seen = new Set<string>();
  return ALL_SOURCES.filter((l) => {
    if (seen.has(l.id)) return false;
    seen.add(l.id);
    return true;
  });
})();

// ── Leyes ──────────────────────────────────────────────────────────────────────

describe('Leyes — campos requeridos', () => {
  test('no hay IDs duplicados entre todas las fuentes', () => {
    const ids = ALL_SOURCES.map((l) => l.id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicates).toEqual([]);
  });

  test.each(UNIQUE_LAWS.map((l) => [l.id, l]))(
    '%s tiene id, number, title y status válido',
    (_, law) => {
      expect(law.id).toBeTruthy();
      expect(law.number).toBeTruthy();
      expect(law.title).toBeTruthy();
      expect(['VIGENTE', 'DEROGADA', 'PARCIALMENTE_VIGENTE']).toContain(law.status);
    }
  );

  test.each(UNIQUE_LAWS.map((l) => [l.id, l]))(
    '%s tiene jurisdiction y normType válidos',
    (_, law) => {
      expect(['NACIONAL', 'PROVINCIAL', 'MUNICIPAL', 'INTERNACIONAL']).toContain(law.jurisdiction);
      expect(['CONSTITUCION', 'LEY', 'DECRETO', 'RESOLUCION', 'DISPOSICION',
              'ORDENANZA', 'DECRETO_LEY', 'CIRCULAR', 'TRATADO']).toContain(law.normType);
    }
  );

  test('todos los ids siguen el formato kebab-case', () => {
    const invalidIds = UNIQUE_LAWS.filter((l) => !/^[a-z0-9-]+$/.test(l.id));
    expect(invalidIds.map((l) => l.id)).toEqual([]);
  });
});

// ── Artículos ─────────────────────────────────────────────────────────────────

describe('Artículos — integridad', () => {
  test('ningún artículo tiene text vacío', () => {
    const empty: string[] = [];
    for (const law of UNIQUE_LAWS) {
      for (const art of law.articles) {
        if (!art.text?.trim()) empty.push(`${law.id} art.${art.number}`);
      }
    }
    expect(empty).toEqual([]);
  });

  test('no hay IDs de artículo duplicados dentro de cada ley', () => {
    const lawsWithDups: string[] = [];
    for (const law of UNIQUE_LAWS) {
      const ids = law.articles.map((a) => a.id);
      const unique = new Set(ids);
      if (ids.length !== unique.size) lawsWithDups.push(law.id);
    }
    expect(lawsWithDups).toEqual([]);
  });

  test('todos los artículos tienen order numérico', () => {
    const invalid: string[] = [];
    for (const law of UNIQUE_LAWS) {
      for (const art of law.articles) {
        if (typeof art.order !== 'number' || isNaN(art.order)) {
          invalid.push(`${law.id} art.${art.number}`);
        }
      }
    }
    expect(invalid).toEqual([]);
  });

  test('todos los artículos tienen lawId que coincide con la ley padre', () => {
    const mismatches: string[] = [];
    for (const law of UNIQUE_LAWS) {
      for (const art of law.articles) {
        if (art.lawId !== law.id) mismatches.push(`${law.id} → art.lawId=${art.lawId}`);
      }
    }
    expect(mismatches).toEqual([]);
  });
});

// NORMAS_CLAVE (códigos, tratados, LCT, RIGI) migradas a la BD: su calidad se
// validó al migrar; ya no se testean estáticamente acá (el array quedó vacío).

// ── Segmentos ─────────────────────────────────────────────────────────────────

describe('Segmentos — estructura', () => {
  test('todos los segmentos tienen id, text y order', () => {
    const invalid: string[] = [];
    for (const law of UNIQUE_LAWS) {
      for (const art of law.articles) {
        for (const seg of art.segments) {
          if (!seg.id || !seg.text?.trim() || typeof seg.order !== 'number') {
            invalid.push(`${law.id} art.${art.number} seg.${seg.id ?? 'sin-id'}`);
          }
        }
      }
    }
    expect(invalid).toEqual([]);
  });

  test('los segmentos tienen lawId correcto (articleId legacy tolerado con umbral 5%)', () => {
    const lawIdMismatches: string[] = [];
    const articleIdMismatches: string[] = [];
    let totalSegs = 0;
    for (const law of UNIQUE_LAWS) {
      for (const art of law.articles) {
        for (const seg of art.segments) {
          totalSegs++;
          if (seg.lawId !== law.id) lawIdMismatches.push(`${law.id} seg.${seg.id}`);
          else if (seg.articleId !== art.id) articleIdMismatches.push(`${law.id} art.${art.number}`);
        }
      }
    }
    // lawId nunca puede diferir — error crítico
    expect(lawIdMismatches).toEqual([]);
    // articleId: advertencia para datos legacy, falla si supera 5%
    if (articleIdMismatches.length > 0) {
      console.warn(`\n⚠ ${articleIdMismatches.length} segmentos con articleId legacy`);
    }
    expect(articleIdMismatches.length / Math.max(totalSegs, 1)).toBeLessThan(0.05);
  });
});
