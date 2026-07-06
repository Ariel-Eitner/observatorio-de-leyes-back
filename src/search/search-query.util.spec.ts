import { buildFtsQuery, buildFtsFallback } from './search-query.util';

describe('buildFtsQuery', () => {
  it('expande "venta online" con sinónimos legales (grupo OR)', () => {
    expect(buildFtsQuery('venta online')).toBe(
      'venta:* & (online:* | distancia:* | electronica:* | domiciliaria:*)',
    );
  });

  it('colapsa "on line" (dos palabras) a online', () => {
    expect(buildFtsQuery('venta on line')).toBe(
      'venta:* & (online:* | distancia:* | electronica:* | domiciliaria:*)',
    );
  });

  it('colapsa "e-commerce" y "e commerce" a ecommerce', () => {
    const expected = '(ecommerce:* | distancia:* | electronica:* | domiciliaria:*)';
    expect(buildFtsQuery('e-commerce')).toBe(expected);
    expect(buildFtsQuery('e commerce')).toBe(expected);
  });

  it('mapea "boton de arrepentimiento" (dropea el stopword "de")', () => {
    expect(buildFtsQuery('boton de arrepentimiento')).toBe(
      'boton:* & (arrepentimiento:* | revocacion:*)',
    );
  });

  it('expande "echar" (coloquial) a despido/cesantía y dropea "sin"', () => {
    expect(buildFtsQuery('echar trabajadores sin pagar')).toBe(
      '(echar:* | despido:* | despedir:* | cesantia:* | desvincular:*) & trabajadores:* & pagar:*',
    );
  });

  it('no toca queries sin sinónimos (AND de prefijos)', () => {
    expect(buildFtsQuery('codigo penal')).toBe('codigo:* & penal:*');
  });

  it('normaliza acentos y mayúsculas', () => {
    expect(buildFtsQuery('Código Penal')).toBe('codigo:* & penal:*');
  });

  it('devuelve null si no queda ningún token útil', () => {
    expect(buildFtsQuery('   ')).toBeNull();
    expect(buildFtsQuery('...')).toBeNull();
    expect(buildFtsQuery('de la')).toBeNull();
  });

  it('solo emite tokens [a-z0-9] + operadores (tsquery válido)', () => {
    const q = buildFtsQuery("venta; online! (2024)")!;
    expect(q).not.toMatch(/[^a-z0-9\s:*&|()]/);
  });
});

describe('buildFtsFallback', () => {
  it('arma OR de grupos + bigramas adyacentes', () => {
    expect(buildFtsFallback('amparo ajustes razonables')).toEqual({
      or: 'amparo:* | ajustes:* | razonables:*',
      groups: ['amparo:*', 'ajustes:*', 'razonables:*'],
      bigrams: ['amparo ajustes', 'ajustes razonables'],
    });
  });

  it('conserva los sinónimos en los grupos del OR', () => {
    const fb = buildFtsFallback('venta online')!;
    expect(fb.or).toBe('venta:* | (online:* | distancia:* | electronica:* | domiciliaria:*)');
    expect(fb.bigrams).toEqual(['venta online']);
  });

  it('null si hay menos de 2 tokens (con 1, OR == AND)', () => {
    expect(buildFtsFallback('discapacidad')).toBeNull();
    expect(buildFtsFallback('   ')).toBeNull();
  });
});
