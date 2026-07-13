import { buildVetos } from './vetos.util';
import type { Law } from '../common/types/law.types';

// Ley mínima para el armado: solo los campos que buildVetos mira.
function law(partial: Partial<Law> & Pick<Law, 'id' | 'number' | 'title' | 'status'>): Law {
  return {
    commonName: null,
    summary: '',
    sanctionDate: null,
    articleCount: 0,
    categories: [],
    relations: [],
    amendments: [],
    ...partial,
  } as unknown as Law;
}

describe('buildVetos — circuito sanción → veto → insistencia', () => {
  // El caso real más delicado: el Decreto 534/2025 observó TRES leyes, pero el Congreso insistió
  // con la de discapacidad (27.793) y esa SÍ es ley. Solo las dos con veto firme son VETADA.
  const norms: Law[] = [
    law({
      id: 'decreto-534-2025', number: '534/2025', title: 'Veto a tres leyes', status: 'VIGENTE',
      normType: 'DECRETO',
      relations: [
        { type: 'VETA', targetLawId: 'ley-27791', targetLawLabel: 'Aumento jubilatorio', description: null },
        { type: 'VETA', targetLawId: 'ley-27792', targetLawLabel: 'Moratoria', description: null },
        // La 27.793 fue insistida: NO es una relación VETA.
        { type: 'RELACIONADA', targetLawId: 'ley-27793', targetLawLabel: 'Discapacidad', description: null },
      ],
    } as Partial<Law> & Pick<Law, 'id' | 'number' | 'title' | 'status'>),
    law({
      id: 'ley-27791', number: '27791', title: 'Aumento excepcional de haberes', status: 'VETADA',
      commonName: 'Ley vetada del aumento jubilatorio', sanctionDate: '2025-07-10',
      amendments: [{
        id: 'a1', lawId: 'ley-27791', modifyingLaw: 'Decreto 534/2025', modifyingDate: '2025-08-04',
        description: 'Veto total. La insistencia fracasó por dos votos.', type: 'VETO', createdAt: '',
      }],
    } as Partial<Law> & Pick<Law, 'id' | 'number' | 'title' | 'status'>),
    law({
      id: 'ley-27792', number: '27792', title: 'Moratoria previsional', status: 'VETADA',
      sanctionDate: '2025-07-10',
      amendments: [{
        id: 'a2', lawId: 'ley-27792', modifyingLaw: 'Decreto 534/2025', modifyingDate: '2025-08-04',
        description: 'Veto total. Ninguna cámara votó la insistencia.', type: 'VETO', createdAt: '',
      }],
    } as Partial<Law> & Pick<Law, 'id' | 'number' | 'title' | 'status'>),
    // Insistida por el Congreso → es ley. NO debe aparecer entre las vetadas.
    law({ id: 'ley-27793', number: '27793', title: 'Emergencia en Discapacidad', status: 'VIGENTE' }),
    law({ id: 'ley-27804', number: '27804', title: 'Glaciares', status: 'VIGENTE' }),
  ];

  it('devuelve solo las leyes VETADAS', () => {
    const items = buildVetos(norms);
    expect(items.map((i) => i.number).sort()).toEqual(['27791', '27792']);
  });

  it('NO incluye la ley que fue vetada pero insistida (27.793 es ley vigente)', () => {
    expect(buildVetos(norms).some((i) => i.number === '27793')).toBe(false);
  });

  it('vincula cada ley vetada con el decreto que la vetó', () => {
    const item = buildVetos(norms).find((i) => i.number === '27791')!;
    expect(item.veto.decretoId).toBe('decreto-534-2025');
    expect(item.veto.label).toBe('Decreto 534/2025');
    expect(item.veto.decretoPath).toContain('decreto-534-2025');
  });

  it('expone los fundamentos y el resultado de la insistencia', () => {
    const item = buildVetos(norms).find((i) => i.number === '27791')!;
    expect(item.veto.description).toContain('insistencia fracasó');
    expect(item.veto.date).toBe('2025-08-04');
  });

  it('no rompe si una ley vetada no tiene enmienda VETO cargada', () => {
    const sinAmendment = [
      law({ id: 'decreto-1-2025', number: '1/2025', title: 'Veto', status: 'VIGENTE',
        relations: [{ type: 'VETA', targetLawId: 'ley-x', targetLawLabel: 'X', description: null }],
      } as Partial<Law> & Pick<Law, 'id' | 'number' | 'title' | 'status'>),
      law({ id: 'ley-x', number: '99999', title: 'Ley X', status: 'VETADA' }),
    ];
    const items = buildVetos(sinAmendment);
    expect(items).toHaveLength(1);
    // Sin enmienda, cae al título del decreto y no explota.
    expect(items[0].veto.label).toBe('Veto');
    expect(items[0].veto.description).toBeNull();
  });
});
