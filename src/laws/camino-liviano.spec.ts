import { LawsService } from './laws.service';
import type { NormsDbService } from '../norms-db/norms-db.service';
import type { Article, Law } from '../common/types/law.types';

// El camino liviano —la página de UN artículo— NO puede bajar la norma entera.
//
// POR QUÉ ESTE TEST: ya pasó dos veces. `/laws/:id/light` y `/laws/:id/article/:n`
// nacieron justamente para no traer el articulado completo, pero por dentro los dos
// llamaban a `getFullNorm()` y recortaban en JS. La respuesta adelgazaba (eso se
// medía) y la CONSULTA no (eso no se medía), así que el arreglo se dio por hecho
// mientras Supabase seguía mandando ~1 MB por visita: 6,37 GB en cinco días de
// agosto de 2026 contra un plan de 5 GB/mes.
//
// Es un test de CONSULTAS, no de respuestas: verifica a quién le pide los datos el
// servicio, que es exactamente lo que la comparación de payloads no delata.

const articulo = (n: string): Article => ({
  id: `art-${n}`, lawId: 'ley-test', number: n, title: `Artículo ${n}`,
  text: `Texto del artículo ${n}`, plainLanguageExplanation: `Explicación ${n}`,
  practicalEffects: [], examples: [], relatedArticles: [], jurisprudence: [],
  regulations: [], keywords: [], order: Number(n), segments: [], amendments: [],
  effectiveDate: null, derogatedDate: null,
});

/** Norma como la devuelve el índice liviano: artículos sin una línea de texto. */
const normaLight = (): Law => ({
  id: 'ley-test', number: '99999', title: 'Ley de prueba', summary: null,
  categories: [], year: 2026, sanctionDate: null, promulgationDate: null,
  publicationDate: null, effectiveDate: null, derogatedDate: null, boNumber: null,
  status: 'VIGENTE', jurisdiction: 'NACIONAL', scopeSlug: null, visibility: 'PUBLICA',
  normType: 'LEY', issuingBody: null, fullText: null, sourceUrl: null,
  articleCount: 3, topics: [], keywords: [], relatedNorms: [], relations: [],
  executiveSummary: null, objective: null, problemItSolves: null, practicalImpact: null,
  affectedSubjects: [], shortCode: null, aliases: [], isDestacada: false,
  amendments: [], sections: [], segments: [], annexes: [], metadata: null,
  articles: ['1', '2', '3'].map((n) => ({ ...articulo(n), text: '', plainLanguageExplanation: null })),
  createdAt: '', updatedAt: '',
});

function armar() {
  const db = {
    loadNorm: jest.fn(async () => ({ ...normaLight(), articles: ['1', '2', '3'].map(articulo) })),
    loadNormLight: jest.fn(async () => normaLight()),
    loadArticle: jest.fn(async (id: string) => articulo(id.replace('art-', ''))),
  };
  const service = new LawsService(db as unknown as NormsDbService);
  // Se puebla el índice a mano: `onModuleInit` hidrata contra la BD y acá no hay BD.
  (service as unknown as { dbNorms: Law[] }).dbNorms = [normaLight()];
  return { service, db };
}

describe('camino liviano', () => {
  it('/laws/:id/light no baja la norma completa', async () => {
    const { service, db } = armar();
    const law = await service.getNormLight('ley-test');

    expect(db.loadNormLight).toHaveBeenCalledTimes(1);
    expect(db.loadNorm).not.toHaveBeenCalled();
    expect(law?.articles).toHaveLength(3);
    // La forma es la de siempre: el artículo existe, con el texto vacío.
    expect(law?.articles[0].text).toBe('');
    expect(law?.articles[0].number).toBe('1');
  });

  it('el índice se cachea: la segunda visita no consulta nada', async () => {
    const { service, db } = armar();
    await service.getNormLight('ley-test');
    await service.getNormLight('ley-test');
    expect(db.loadNormLight).toHaveBeenCalledTimes(1);
  });

  it('/laws/:id/article/:n pide UN artículo, no la norma entera', async () => {
    const { service, db } = armar();
    const { article, law } = await service.findArticle('ley-test', '2');

    expect(db.loadNorm).not.toHaveBeenCalled();
    expect(db.loadArticle).toHaveBeenCalledTimes(1);
    expect(db.loadArticle).toHaveBeenCalledWith('art-2');
    expect(article.number).toBe('2');
    expect(article.text).toBe('Texto del artículo 2');
    expect(law.id).toBe('ley-test');
  });

  it('un artículo que no existe da 404 sin bajar la norma', async () => {
    const { service, db } = armar();
    await expect(service.findArticle('ley-test', '404')).rejects.toThrow(/no encontrado/i);
    expect(db.loadNorm).not.toHaveBeenCalled();
    expect(db.loadArticle).not.toHaveBeenCalled();
  });

  it('una norma que no está en el índice no dispara ninguna consulta', async () => {
    const { service, db } = armar();
    expect(await service.getNormLight('no-existe')).toBeNull();
    expect(db.loadNormLight).not.toHaveBeenCalled();
    expect(db.loadNorm).not.toHaveBeenCalled();
  });

  it('si la norma completa ya está en RAM, el artículo sale de ahí', async () => {
    const { service, db } = armar();
    await service.findOne('ley-test');            // la trae completa y la cachea
    expect(db.loadNorm).toHaveBeenCalledTimes(1);

    await service.findArticle('ley-test', '2');
    expect(db.loadArticle).not.toHaveBeenCalled();
    expect(db.loadNormLight).not.toHaveBeenCalled();
  });
});
