import { computeFrontendPath } from './law-url.util';
import type { Law } from '../types/law.types';

// Solo usa id, number, title. Construimos objetos mínimos.
const law = (id: string, number: string, title: string): Law =>
  ({ id, number, title } as unknown as Law);

describe('computeFrontendPath', () => {
  it('ley común: número + nombre, sin prefijo "Ley de" (patrón canónico SEO)', () => {
    expect(computeFrontendPath(law('ley-25326', '25326', 'Ley de Protección de los Datos Personales')))
      .toBe('/leyes/25326-proteccion-de-los-datos-personales');
  });

  it('NO deja URLs "forma-id" /leyes/ley-NNNNN (las normalizadas)', () => {
    const p26639 = computeFrontendPath(law('ley-26639', '26639', 'Régimen de Presupuestos Mínimos para la Preservación de los Glaciares y del Ambiente Periglacial'));
    const p27801 = computeFrontendPath(law('ley-27801', '27801', 'Régimen Penal Juvenil'));
    expect(p26639).toMatch(/^\/leyes\/26639-regimen-de-presupuestos-minimos/);
    expect(p26639).not.toContain('/leyes/ley-');
    expect(p27801).toBe('/leyes/27801-regimen-penal-juvenil');
  });

  it('NO duplica el número cuando el título ya arranca con él ("Ley 11.683 - …")', () => {
    expect(computeFrontendPath(law('ley-17801', '17801', 'Ley 17.801 - Registro de la Propiedad Inmueble')))
      .toBe('/leyes/17801-registro-de-la-propiedad-inmueble');
    expect(computeFrontendPath(law('ley-11683', '11683', 'Ley 11.683 - Procedimiento Tributario (t.o. 1998)')))
      .toBe('/leyes/11683-procedimiento-tributario-to-1998');
    // dedup exacto: un número que es parte del nombre (un año) NO se toca
    expect(computeFrontendPath(law('ley-99999', '99999', 'Reforma de 1994 sobre algo')))
      .toBe('/leyes/99999-reforma-de-1994-sobre-algo');
  });

  it('leyes "de marca": ahora número + nombre (se saca el prefijo "Ley de")', () => {
    expect(computeFrontendPath(law('ley-20744', '20744', 'Ley de Contrato de Trabajo')))
      .toBe('/leyes/20744-contrato-de-trabajo');
    expect(computeFrontendPath(law('ley-27742', '27742', 'Ley de Bases y Puntos de Partida para la Libertad de los Argentinos')))
      .toMatch(/^\/leyes\/27742-bases-y-puntos-de-partida/);
  });

  it('decreto: id (tipo+número) + nombre del título, sin repetir "decreto"', () => {
    const p = computeFrontendPath(law('decreto-151-2022', '151', 'Decreto 151/2022 — Reglamentación de la Ley de Etiquetado Frontal'));
    expect(p).toBe('/leyes/decreto-151-2022-reglamentacion-de-la-ley-de-etiquetado-frontal');
    expect(p).not.toContain('decreto-151-2022-decreto'); // no se duplica el prefijo
  });

  it('resolución general ARCA: id + nombre (sin el prefijo "Resolución General ARCA N/A —")', () => {
    const p = computeFrontendPath(law('rg-arca-5844-2026', '5844/2026', 'Resolución General ARCA 5844/2026 — Procedimiento operativo del Régimen de Incentivo a la Formalización Laboral (RIFL)'));
    expect(p).toMatch(/^\/leyes\/rg-arca-5844-2026-procedimiento-operativo/);
  });

  it('decreto sin prefijo tipo-norma en el título: usa el título completo', () => {
    expect(computeFrontendPath(law('decreto-1023-2001', '1023/2001', 'Regimen de Contrataciones de la Administracion Nacional')))
      .toBe('/leyes/decreto-1023-2001-regimen-de-contrataciones-de-la-administracion-nacional');
  });

  it('normas troncales (TIPO_SLUG) siguen en /codigos, /constituciones, /tratados', () => {
    expect(computeFrontendPath(law('codigo-penal', '11179', 'Código Penal'))).toBe('/codigos/penal');
    expect(computeFrontendPath(law('constitucion-nacional', '0', 'Constitución Nacional'))).toBe('/constituciones/nacional');
    expect(computeFrontendPath(law('carta-onu', 'Carta ONU', 'Carta de las Naciones Unidas'))).toBe('/tratados/carta-onu');
  });

  it('constituciones provinciales y DNU por prefijo de id', () => {
    expect(computeFrontendPath(law('const-santa-fe', '0', 'Constitución de Santa Fe'))).toBe('/constituciones/santa-fe');
    expect(computeFrontendPath(law('dnu-70-2023', '70/2023', 'DNU 70/2023'))).toBe('/dnu/70-2023');
  });
});
