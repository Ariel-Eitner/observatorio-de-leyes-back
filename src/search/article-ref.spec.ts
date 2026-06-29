import { extractArticleRef } from './search-db.service';

// Locks the "<ley> art N" detector that resolves searches like "Código Penal art. 79"
// to a concrete article (the tsvector can't, because the law name and the article
// number never live in the same record). See search-db.service.ts.
describe('extractArticleRef', () => {
  test.each([
    ['Código penal art. 79', '79', 'codigo penal'],
    ['codigo penal articulo 79', '79', 'codigo penal'],
    ['ley 11683 art 5', '5', 'ley 11683'],
    ['constitucion nacional art 14 bis', '14 bis', 'constitucion nacional'],
    ['art 14 bis constitucion nacional', '14 bis', 'constitucion nacional'],
    ['LCT artículo 245', '245', 'lct'],
    ['código civil y comercial art 1710', '1710', 'codigo civil y comercial'],
  ])('reconoce "%s"', (input, artNum, lawText) => {
    const unaccent = (s: string) => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const r = extractArticleRef(input);
    expect(r).not.toBeNull();
    expect(unaccent(r!.artNum)).toBe(artNum);
    // la función conserva acentos/caso del original; el match SQL los unaccentúa después.
    expect(unaccent(r!.lawText)).toBe(lawText);
  });

  test.each([
    'homicidio codigo penal',   // sin "art N"
    'art 79',                   // sin ley: ambiguo, no se resuelve
    'artículo 1',               // idem
    'defensa del consumidor',   // texto puro
    '',
  ])('NO reconoce "%s"', (input) => {
    expect(extractArticleRef(input)).toBeNull();
  });
});
