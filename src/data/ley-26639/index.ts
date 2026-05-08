import type { Law } from '../../common/types/law.types';
import { LEY_26639_METADATA } from './metadata';
import { ARTICLES_26639_01 } from './sections/s01';
import { ARTICLES_26639_02 } from './sections/s02';
import { ARTICLES_26639_03 } from './sections/s03';

const allArticles = [
  ...ARTICLES_26639_01,
  ...ARTICLES_26639_02,
  ...ARTICLES_26639_03,
].sort((a, b) => a.order - b.order);

export const LEY_26639: Law = {
  ...LEY_26639_METADATA,
  sections: [
    {
      id: 'gl-s01',
      lawId: 'ley-26639',
      number: 'I',
      name: 'Disposiciones Generales e Inventario Nacional',
      articleStart: 1,
      articleEnd: 5,
      titles: [
        {
          id: 'gl-s01-t01',
          sectionId: 'gl-s01',
          lawId: 'ley-26639',
          number: 'Cap. I',
          name: 'Objeto, Definiciones e Inventario Nacional de Glaciares',
          articleStart: 1,
          articleEnd: 5,
        },
      ],
    },
    {
      id: 'gl-s02',
      lawId: 'ley-26639',
      number: 'II',
      name: 'Actividades Prohibidas, EIA y Autoridades',
      articleStart: 6,
      articleEnd: 10,
      titles: [
        {
          id: 'gl-s02-t01',
          sectionId: 'gl-s02',
          lawId: 'ley-26639',
          number: 'Cap. II',
          name: 'Actividades Prohibidas y Evaluación de Impacto Ambiental',
          articleStart: 6,
          articleEnd: 7,
        },
        {
          id: 'gl-s02-t02',
          sectionId: 'gl-s02',
          lawId: 'ley-26639',
          number: 'Cap. III',
          name: 'Autoridades de Aplicación y sus Funciones',
          articleStart: 8,
          articleEnd: 10,
        },
      ],
    },
    {
      id: 'gl-s03',
      lawId: 'ley-26639',
      number: 'III',
      name: 'Infracciones, Sanciones y Disposiciones Finales',
      articleStart: 11,
      articleEnd: 18,
      titles: [
        {
          id: 'gl-s03-t01',
          sectionId: 'gl-s03',
          lawId: 'ley-26639',
          number: 'Cap. IV',
          name: 'Infracciones y Sanciones',
          articleStart: 11,
          articleEnd: 14,
        },
        {
          id: 'gl-s03-t02',
          sectionId: 'gl-s03',
          lawId: 'ley-26639',
          number: 'Cap. V',
          name: 'Disposiciones Finales y Transitorias',
          articleStart: 15,
          articleEnd: 18,
        },
      ],
    },
  ],
  articles: allArticles,
};
