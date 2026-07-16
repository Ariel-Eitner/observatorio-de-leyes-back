import { armarLotes, LOTE_ARTICULOS, LOTE_NORMAS_MAX } from './laws.service';

// armarLotes es lo que sostiene la promesa de memoria de la hidratación: el
// contenedor tiene 256 MB y traer el corpus de una tiraría OOM. Estos tests fijan
// esa garantía.
//
// Los tests leen las constantes en vez de hardcodear los números: si mañana se
// suben los lotes, tienen que seguir siendo verdad (o fallar de verdad), no quedar
// verificando un límite que ya no existe.
//
// Números del corpus real (medido 16-jul-2026): 1.266 normas, 38.960 artículos,
// mediana 8 por norma, máximo 2.671 (Código Civil y Comercial).

const n = (id: string, articleCount: number) => ({ id, articleCount });

describe('armarLotes', () => {
  it('no pierde, no duplica y respeta el orden', () => {
    const normas = Array.from({ length: 500 }, (_, i) => n(`ley-${i}`, i % 30));
    const ids = armarLotes(normas).flat();
    expect(ids).toHaveLength(500);
    expect(new Set(ids).size).toBe(500);
    expect(ids).toEqual(normas.map((x) => x.id));
  });

  it('ningún lote se pasa del presupuesto de artículos (salvo una norma sola)', () => {
    const normas = [
      ...Array.from({ length: 300 }, (_, i) => n(`ley-${i}`, 120)),
      n('gigante', LOTE_ARTICULOS * 2), // más grande que el presupuesto entero
    ];
    const porId = new Map(normas.map((x) => [x.id, x.articleCount]));
    for (const lote of armarLotes(normas)) {
      const arts = lote.reduce((s, id) => s + (porId.get(id) ?? 0), 0);
      // Una norma sola puede exceder el presupuesto: no se puede partir.
      if (lote.length > 1) expect(arts).toBeLessThanOrEqual(LOTE_ARTICULOS);
    }
  });

  it('una norma más grande que el presupuesto va sola', () => {
    const normas = [n('chica-1', 5), n('enorme', LOTE_ARTICULOS + 1), n('chica-2', 5)];
    expect(armarLotes(normas)).toEqual([['chica-1'], ['enorme'], ['chica-2']]);
  });

  it('nunca arma un IN(...) más largo que el tope de normas', () => {
    // Sin artículos (stubs, vetadas): el presupuesto de artículos nunca se activa,
    // así que el que tiene que cortar es el tope de normas.
    const normas = Array.from({ length: LOTE_NORMAS_MAX * 4 }, (_, i) => n(`vetada-${i}`, 0));
    const lotes = armarLotes(normas);
    for (const lote of lotes) expect(lote.length).toBeLessThanOrEqual(LOTE_NORMAS_MAX);
    expect(lotes[0]).toHaveLength(LOTE_NORMAS_MAX);
  });

  it('lista vacía → sin lotes (no un lote vacío que dispare un findMany al pedo)', () => {
    expect(armarLotes([])).toEqual([]);
  });

  it('el corpus real entra en pocos lotes (era ~8.800 consultas, una por relación y norma)', () => {
    const normas = [
      ...Array.from({ length: 1200 }, (_, i) => n(`chica-${i}`, 8)), // la mediana real es 8
      n('codigo-civil-comercial', 2671),
      n('codigo-aduanero', 1198),
      n('ley-17454', 786),
      n('ley-23984', 570),
      n('rg-igj-15-2024', 422),
      n('codigo-procesal-penal-federal', 403),
    ];
    const lotes = armarLotes(normas);
    expect(lotes.flat()).toHaveLength(1206); // no se perdió ninguna
    // ~7 consultas por lote: esto es lo que mantiene el arranque en ~140 s.
    expect(lotes.length).toBeLessThan(20);
  });
});
