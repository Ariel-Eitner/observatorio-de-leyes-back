import type { Law, LawSection } from '../../common/types/law.types';
import { LEY_27801_METADATA } from './metadata';
import { ARTICLES_27801_01 } from './sections/s01';
import { ARTICLES_27801_02 } from './sections/s02';
import { ARTICLES_27801_03 } from './sections/s03';
import { ARTICLES_27801_04 } from './sections/s04';

const allArticles = [
  ...ARTICLES_27801_01,
  ...ARTICLES_27801_02,
  ...ARTICLES_27801_03,
  ...ARTICLES_27801_04,
].sort((a, b) => a.order - b.order);

const sections: LawSection[] = [
  {
    id: 'ley-27801-s01',
    lawId: 'ley-27801',
    number: 'I',
    name: 'Ámbito de aplicación',
    articleStart: 1,
    articleEnd: 3,
    titles: [],
  },
  {
    id: 'ley-27801-s02',
    lawId: 'ley-27801',
    number: 'II',
    name: 'Principios rectores del Régimen de Responsabilidad Penal Juvenil',
    articleStart: 4,
    articleEnd: 5,
    titles: [],
  },
  {
    id: 'ley-27801-s03',
    lawId: 'ley-27801',
    number: 'III',
    name: 'Derechos de las víctimas y de las personas perjudicadas',
    articleStart: 6,
    articleEnd: 7,
    titles: [],
  },
  {
    id: 'ley-27801-s04',
    lawId: 'ley-27801',
    number: 'IV',
    name: 'Medidas y penas',
    articleStart: 8,
    articleEnd: 21,
    titles: [
      {
        id: 'ley-27801-s04-t1',
        sectionId: 'ley-27801-s04',
        lawId: 'ley-27801',
        number: '1',
        name: 'Medidas complementarias',
        articleStart: 8,
        articleEnd: 10,
      },
      {
        id: 'ley-27801-s04-t2',
        sectionId: 'ley-27801-s04',
        lawId: 'ley-27801',
        number: '2',
        name: 'Penas',
        articleStart: 11,
        articleEnd: 16,
      },
      {
        id: 'ley-27801-s04-t3',
        sectionId: 'ley-27801-s04',
        lawId: 'ley-27801',
        number: '3',
        name: 'Penas privativas de la libertad',
        articleStart: 17,
        articleEnd: 21,
      },
    ],
  },
  {
    id: 'ley-27801-s05',
    lawId: 'ley-27801',
    number: 'V',
    name: 'Causales de la extinción de la acción penal y de la pena',
    articleStart: 22,
    articleEnd: 22,
    titles: [],
  },
  {
    id: 'ley-27801-s06',
    lawId: 'ley-27801',
    number: 'VI',
    name: 'Supervisión',
    articleStart: 23,
    articleEnd: 23,
    titles: [],
  },
  {
    id: 'ley-27801-s07',
    lawId: 'ley-27801',
    number: 'VII',
    name: 'Exclusión de los inimputables del régimen sancionatorio',
    articleStart: 24,
    articleEnd: 26,
    titles: [],
  },
  {
    id: 'ley-27801-s08',
    lawId: 'ley-27801',
    number: 'VIII',
    name: 'Institutos especializados de detención. Principios Generales',
    articleStart: 27,
    articleEnd: 34,
    titles: [],
  },
  {
    id: 'ley-27801-s09',
    lawId: 'ley-27801',
    number: 'IX',
    name: 'Medidas de salud',
    articleStart: 35,
    articleEnd: 36,
    titles: [],
  },
  {
    id: 'ley-27801-s10',
    lawId: 'ley-27801',
    number: 'X',
    name: 'Normas especiales para la competencia nacional ordinaria y federal',
    articleStart: 37,
    articleEnd: 47,
    titles: [],
  },
  {
    id: 'ley-27801-s11',
    lawId: 'ley-27801',
    number: 'XI',
    name: 'Disposiciones finales',
    articleStart: 48,
    articleEnd: 53,
    titles: [],
  },
];

export const LEY_27801: Law = {
  ...LEY_27801_METADATA,
  sections,
  articles: allArticles,
};
