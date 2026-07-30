import { extractArticleRef, isNumberOnlyQuery } from './search-db.service';

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
    // "norma N <ley>" (uso coloquial): "norma 280 ccc" = artículo 280 del CCyC.
    ['norma 280 ccc', '280', 'ccc'],
    ['Norma 79 codigo penal', '79', 'codigo penal'],
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
    'norma 26994',              // "norma N" sin ley: es el número de la norma, no un art
    'defensa del consumidor',   // texto puro
    '',
  ])('NO reconoce "%s"', (input) => {
    expect(extractArticleRef(input)).toBeNull();
  });
});

// Locks the "query is only a number" gate that suppresses the FTS text flood. A bare
// numeric token becomes a `24:*` prefix in the tsquery and matches thousands of
// records; for number-only queries the search must rely on the direct number match,
// not the FTS. See isNumberOnlyQuery / search-db.service.ts.
describe('isNumberOnlyQuery', () => {
  test.each([
    '25542',            // número pelado
    '25.542',           // con puntos de miles
    'ley 25542',        // con "ley"
    'ley 25.542',
    'Ley N° 25.542',    // con "N°"
    '24',               // prefijo corto (mientras se tipea)
    '2',
    '1112/2024',        // decreto/RG con barra
    '  27742  ',        // con espacios
    'decreto 70/2023',
  ])('es solo número: "%s"', (input) => {
    expect(isNumberOnlyQuery(input)).toBe(true);
  });

  test.each([
    'contrato de trabajo',   // texto puro
    'ley de alquileres',
    'reforma laboral 27742', // texto + número: el número es una restricción, no ruido
    '25542 libro',
    'art 5 ley 24240',       // referencia a artículo
    'codigo penal',
    '',
    '   ',
  ])('NO es solo número: "%s"', (input) => {
    expect(isNumberOnlyQuery(input)).toBe(false);
  });
});
