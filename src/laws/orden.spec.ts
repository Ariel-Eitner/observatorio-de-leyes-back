/**
 * Orden del listado de normas.
 *
 * El bug que motivó esto: `number` es TEXTO en la base y el listado lo ordenaba
 * con `<` / `>`, o sea alfabéticamente. Con orden descendente eso daba
 * 9643 → 8871 → 6961 → 48 → 3959 → 2976 → 27818, con la Ley 48 en el medio.
 */
import { claveNumero } from './laws.service';

/** Ordena solo por número, como hace compararNormas para sortBy='number'. */
function ordenarPorNumero(nums: string[], dir: 1 | -1): string[] {
  return [...nums].sort((a, b) => {
    const [ga, pa, sa] = claveNumero(a);
    const [gb, pb, sb] = claveNumero(b);
    if (ga !== gb) return ga - gb;
    return ((pa - pb) || (sa - sb)) * dir;
  });
}

describe('claveNumero', () => {
  it('lee el entero pelado de una ley', () => {
    expect(claveNumero('27818')).toEqual([0, 27818, 0]);
    expect(claveNumero('48')).toEqual([0, 48, 0]);
  });

  it('en "N/AAAA" el año manda y el número desempata', () => {
    expect(claveNumero('990/2020')).toEqual([0, 2020, 990]);
    expect(claveNumero('70/2023')).toEqual([0, 2023, 70]);
  });

  it('tolera espacios alrededor de la barra', () => {
    expect(claveNumero('1017 / 1999')).toEqual([0, 1999, 1017]);
  });

  it('manda al grupo 1 lo que no tiene número comparable', () => {
    expect(claveNumero('Carta ONU')[0]).toBe(1);
    expect(claveNumero('7-DNPDP')[0]).toBe(1);
    expect(claveNumero('')[0]).toBe(1);
  });
});

describe('orden por número', () => {
  // Exactamente lo que devolvía el listado antes del arreglo.
  const reales = ['9643', '8871', '6961', '48', '3959', '2976', '27818', '27805', '11179'];

  it('de mayor a menor ordena por valor, no por dígito', () => {
    expect(ordenarPorNumero(reales, -1)).toEqual([
      '27818', '27805', '11179', '9643', '8871', '6961', '3959', '2976', '48',
    ]);
  });

  it('de menor a mayor es el inverso exacto', () => {
    expect(ordenarPorNumero(reales, 1)).toEqual([
      '48', '2976', '3959', '6961', '8871', '9643', '11179', '27805', '27818',
    ]);
  });

  it('los decretos se ordenan por año, no por número', () => {
    // 70/2023 es posterior a 990/2020 aunque 70 < 990.
    expect(ordenarPorNumero(['990/2020', '70/2023', '1017/1999'], -1)).toEqual([
      '70/2023', '990/2020', '1017/1999',
    ]);
  });

  it('dos decretos del mismo año desempatan por número', () => {
    expect(ordenarPorNumero(['70/2023', '315/2023'], -1)).toEqual(['315/2023', '70/2023']);
  });

  it('las que no tienen número van al final en los DOS sentidos', () => {
    const con = ['27818', 'Carta ONU', '48'];
    expect(ordenarPorNumero(con, -1).at(-1)).toBe('Carta ONU');
    expect(ordenarPorNumero(con, 1).at(-1)).toBe('Carta ONU');
  });
});
