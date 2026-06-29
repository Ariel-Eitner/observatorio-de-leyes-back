import {
  buildCombined,
  buildLawCodesPattern,
  buildLawNamesIndex,
  parseRefChunks,
  pruneDanglingSelfRefs,
  artNumKey,
  type RefChunk,
} from './inline-refs.util';

const textOf = (chunks: RefChunk[]) => chunks.map((c) => c.text).join('');
const artRefs = (chunks: RefChunk[]) =>
  chunks.filter((c): c is Extract<RefChunk, { kind: 'art' }> => c.kind === 'art');

describe('artNumKey', () => {
  it('normaliza espacios, grados y mayúsculas', () => {
    expect(artNumKey('140')).toBe('140');
    expect(artNumKey('14 bis')).toBe('14bis');
    expect(artNumKey('245 BIS')).toBe('245bis');
    expect(artNumKey('1°')).toBe('1');
  });
});

describe('pruneDanglingSelfRefs (poda de refs colgantes a la propia norma)', () => {
  it('convierte en texto una ref a un artículo INEXISTENTE de la propia norma', () => {
    const chunks: RefChunk[] = [
      { kind: 'text', text: 'El ' },
      { kind: 'art', text: 'artículo 140', lawCode: 'Ley 26.842', articleNumber: '140', paragraph: null, isSelf: false },
      { kind: 'text', text: ' del Código Penal' },
    ];
    const out = pruneDanglingSelfRefs(chunks, 'Ley 26.842', new Set(['5', '9']));
    expect(artRefs(out)).toHaveLength(0); // ya no genera enlace 404
    expect(textOf(out)).toBe('El artículo 140 del Código Penal'); // texto intacto
  });

  it('CONSERVA una ref a un artículo que SÍ existe en la propia norma', () => {
    const chunks: RefChunk[] = [
      { kind: 'art', text: 'artículo 5', lawCode: 'Ley 26.842', articleNumber: '5', paragraph: null, isSelf: false },
    ];
    const out = pruneDanglingSelfRefs(chunks, 'Ley 26.842', new Set(['5', '9']));
    expect(artRefs(out)).toHaveLength(1);
  });

  it('NO toca refs a OTRA ley aunque el número no exista en la norma de contexto', () => {
    const chunks: RefChunk[] = [
      { kind: 'art', text: 'art. 140 CP', lawCode: 'CP', articleNumber: '140', paragraph: null, isSelf: false },
    ];
    const out = pruneDanglingSelfRefs(chunks, 'Ley 26.842', new Set(['5']));
    expect(artRefs(out)).toHaveLength(1);
    expect(out[0]).toMatchObject({ kind: 'art', lawCode: 'CP' });
  });

  it('multi: filtra los números inexistentes y deja solo los válidos', () => {
    const chunks: RefChunk[] = [
      { kind: 'multi', text: '(arts. 4, 200)', lawCode: 'Ley 26.842', articleNumbers: ['4', '200'] },
    ];
    const out = pruneDanglingSelfRefs(chunks, 'Ley 26.842', new Set(['4']));
    expect(out[0]).toMatchObject({ kind: 'multi', articleNumbers: ['4'] });
  });

  it('multi: se vuelve texto si NINGÚN número existe', () => {
    const chunks: RefChunk[] = [
      { kind: 'multi', text: '(arts. 200-205)', lawCode: 'Ley 26.842', articleNumbers: ['200', '201'] },
    ];
    const out = pruneDanglingSelfRefs(chunks, 'Ley 26.842', new Set(['4']));
    expect(out.every((c) => c.kind === 'text')).toBe(true);
  });
});

describe('integración: nombres canónicos + poda (casos reales de Ley 26.842)', () => {
  // buildLawNamesIndex([]) ahora SIEMBRA "Código Penal", "Constitución Nacional", etc.
  // (D2), así "art. 140 del Código Penal" engancha al CP en vez de caer al patrón
  // suelto y autolinkearse a la norma de contexto (que producía los 404).
  const idx = buildLawNamesIndex([]);
  const combined = buildCombined(buildLawCodesPattern([]), idx.pattern);
  const validArtKeys = new Set(['13', '25']); // la 26.842 NO tiene art. 140 ni 145

  it('"el artículo 140 del Código Penal" enlaza al Código Penal (no a la norma de contexto)', () => {
    const raw = parseRefChunks('El artículo 140 del Código Penal sanciona la esclavitud.', combined, 'Ley 26.842', '13', () => true, idx.nameToCode);
    const refs = artRefs(raw);
    expect(refs).toHaveLength(1);
    expect(refs[0]).toMatchObject({ lawCode: 'CP', articleNumber: '140', isSelf: false });
    // la poda NO lo toca: apunta a otra ley, no a la norma de contexto
    const pruned = pruneDanglingSelfRefs(raw, 'Ley 26.842', validArtKeys);
    expect(artRefs(pruned).map((c) => c.lawCode)).toEqual(['CP']);
  });

  it('"artículo 145 bis del Código Penal" enlaza al Código Penal', () => {
    const raw = parseRefChunks('Sustituye el artículo 145 bis del Código Penal.', combined, 'Ley 26.842', '25', () => true, idx.nameToCode);
    const refs = artRefs(raw);
    expect(refs).toHaveLength(1);
    expect(refs[0]).toMatchObject({ lawCode: 'CP', articleNumber: '145 bis' });
  });

  it('una ref suelta a la PROPIA norma con número inexistente SIGUE podándose', () => {
    const raw = parseRefChunks('Ver el artículo 140 de esta ley.', combined, 'Ley 26.842', '13', () => true, idx.nameToCode);
    const pruned = pruneDanglingSelfRefs(raw, 'Ley 26.842', validArtKeys);
    expect(artRefs(pruned)).toHaveLength(0);
  });
});
