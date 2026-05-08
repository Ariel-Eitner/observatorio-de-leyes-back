import type { Law } from '../../common/types/law.types';
import { CONSTITUCION_NACIONAL_METADATA } from './metadata';
import { ARTICLES_CN_01 } from './sections/s01';
import { ARTICLES_CN_02 } from './sections/s02';
import { ARTICLES_CN_03 } from './sections/s03';
import { ARTICLES_CN_04 } from './sections/s04';
import { ARTICLES_CN_05 } from './sections/s05';
import { ARTICLES_CN_06 } from './sections/s06';
import { ARTICLES_CN_07 } from './sections/s07';
import { ARTICLES_CN_08 } from './sections/s08';

const allArticles = [
  ...ARTICLES_CN_01,
  ...ARTICLES_CN_02,
  ...ARTICLES_CN_03,
  ...ARTICLES_CN_04,
  ...ARTICLES_CN_05,
  ...ARTICLES_CN_06,
  ...ARTICLES_CN_07,
  ...ARTICLES_CN_08,
].filter((a): a is NonNullable<typeof a> => a != null).sort((a, b) => a.order - b.order);

export const CONSTITUCION_NACIONAL: Law = {
  ...CONSTITUCION_NACIONAL_METADATA,
  sections: [
    {
      id: 'cn-s01',
      lawId: 'constitucion-nacional',
      number: 'I',
      name: 'Primera Parte — Declaraciones, Derechos y Garantías',
      articleStart: 0,
      articleEnd: 43,
      titles: [
        {
          id: 'cn-s01-t01',
          sectionId: 'cn-s01',
          lawId: 'constitucion-nacional',
          number: 'Cap. Primero',
          name: 'Declaraciones, Derechos y Garantías',
          articleStart: 0,
          articleEnd: 35,
        },
        {
          id: 'cn-s01-t02',
          sectionId: 'cn-s01',
          lawId: 'constitucion-nacional',
          number: 'Cap. Segundo',
          name: 'Nuevos Derechos y Garantías (1994)',
          articleStart: 36,
          articleEnd: 43,
        },
      ],
    },
    {
      id: 'cn-s02',
      lawId: 'constitucion-nacional',
      number: 'II',
      name: 'Segunda Parte — Autoridades de la Nación',
      articleStart: 44,
      articleEnd: 129,
      titles: [
        {
          id: 'cn-s02-t01',
          sectionId: 'cn-s02',
          lawId: 'constitucion-nacional',
          number: 'Secc. Primera',
          name: 'Poder Legislativo',
          articleStart: 44,
          articleEnd: 86,
        },
        {
          id: 'cn-s02-t02',
          sectionId: 'cn-s02',
          lawId: 'constitucion-nacional',
          number: 'Secc. Segunda',
          name: 'Poder Ejecutivo',
          articleStart: 87,
          articleEnd: 107,
        },
        {
          id: 'cn-s02-t03',
          sectionId: 'cn-s02',
          lawId: 'constitucion-nacional',
          number: 'Secc. Tercera',
          name: 'Poder Judicial',
          articleStart: 108,
          articleEnd: 119,
        },
        {
          id: 'cn-s02-t04',
          sectionId: 'cn-s02',
          lawId: 'constitucion-nacional',
          number: 'Secc. Cuarta',
          name: 'Ministerio Público',
          articleStart: 120,
          articleEnd: 120,
        },
        {
          id: 'cn-s02-t05',
          sectionId: 'cn-s02',
          lawId: 'constitucion-nacional',
          number: 'Tít. Segundo',
          name: 'Gobiernos de Provincia',
          articleStart: 121,
          articleEnd: 129,
        },
      ],
    },
    {
      id: 'cn-s03',
      lawId: 'constitucion-nacional',
      number: 'III',
      name: 'Disposiciones Transitorias (1994)',
      articleStart: 130,
      articleEnd: 146,
      titles: [],
    },
  ],
  articles: allArticles,
};
