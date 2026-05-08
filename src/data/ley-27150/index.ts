import type { Law } from '../../common/types/law.types';
import { LEY_27150_METADATA } from './metadata';
import { ARTICLES_LEY27150_01 } from './sections/s01';
import { ARTICLES_LEY27150_02 } from './sections/s02';
import { ARTICLES_LEY27150_03 } from './sections/s03';
import { ARTICLES_LEY27150_04 } from './sections/s04';

const allArticles = [
  ...ARTICLES_LEY27150_01,
  ...ARTICLES_LEY27150_02,
  ...ARTICLES_LEY27150_03,
  ...ARTICLES_LEY27150_04,
].filter((a): a is NonNullable<typeof a> => a != null).sort((a, b) => a.order - b.order);

export const LEY_27150: Law = {
  ...LEY_27150_METADATA,
  sections: [
    {
      id: 'cpp-s01',
      lawId: 'ley-27150',
      number: 'I',
      name: 'Implementación y vigencia',
      articleStart: 1,
      articleEnd: 4,
      titles: [],
    },
    {
      id: 'cpp-s02',
      lawId: 'ley-27150',
      number: 'II',
      name: 'Renombramiento de órganos judiciales',
      articleStart: 5,
      articleEnd: 21,
      titles: [],
    },
    {
      id: 'cpp-s03',
      lawId: 'ley-27150',
      number: 'III',
      name: 'Transición procesal y Oficinas Judiciales',
      articleStart: 22,
      articleEnd: 30,
      titles: [],
    },
    {
      id: 'cpp-s04',
      lawId: 'ley-27150',
      number: 'IV',
      name: 'Personal judicial y disposiciones finales',
      articleStart: 31,
      articleEnd: 44,
      titles: [],
    },
  ],
  articles: allArticles,
};
