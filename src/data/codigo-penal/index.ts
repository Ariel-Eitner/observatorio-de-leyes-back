import type { Law } from '../../common/types/law.types';
import { CODIGO_PENAL_METADATA } from './metadata';
import { ARTICLES_CP_01 } from './sections/s01';
import { ARTICLES_CP_02 } from './sections/s02';
import { ARTICLES_CP_03 } from './sections/s03';
import { ARTICLES_CP_04 } from './sections/s04';
import { ARTICLES_CP_05 } from './sections/s05';
import { ARTICLES_CP_06 } from './sections/s06';
import { ARTICLES_CP_07 } from './sections/s07';
import { ARTICLES_CP_08 } from './sections/s08';
import { ARTICLES_CP_09 } from './sections/s09';
import { ARTICLES_CP_10 } from './sections/s10';
import { ARTICLES_CP_11 } from './sections/s11';
import { ARTICLES_CP_12 } from './sections/s12';
import { ARTICLES_CP_13 } from './sections/s13';
import { ARTICLES_CP_14 } from './sections/s14';

const allArticles = [
  ...ARTICLES_CP_01,
  ...ARTICLES_CP_02,
  ...ARTICLES_CP_03,
  ...ARTICLES_CP_04,
  ...ARTICLES_CP_05,
  ...ARTICLES_CP_06,
  ...ARTICLES_CP_07,
  ...ARTICLES_CP_08,
  ...ARTICLES_CP_09,
  ...ARTICLES_CP_10,
  ...ARTICLES_CP_11,
  ...ARTICLES_CP_12,
  ...ARTICLES_CP_13,
  ...ARTICLES_CP_14,
].filter((a): a is NonNullable<typeof a> => a != null).sort((a, b) => a.order - b.order);

export const CODIGO_PENAL: Law = {
  ...CODIGO_PENAL_METADATA,
  sections: [
    {
      id: 'cp-s01',
      lawId: 'codigo-penal',
      number: 'I',
      name: 'Libro I — Parte General',
      articleStart: 1,
      articleEnd: 781,
      titles: [
        {
          id: 'cp-s01-t01',
          sectionId: 'cp-s01',
          lawId: 'codigo-penal',
          number: 'Tít. I',
          name: 'Aplicación de la ley penal',
          articleStart: 1,
          articleEnd: 4,
        },
        {
          id: 'cp-s01-t02',
          sectionId: 'cp-s01',
          lawId: 'codigo-penal',
          number: 'Tít. II',
          name: 'Responsabilidad criminal',
          articleStart: 5,
          articleEnd: 20,
        },
        {
          id: 'cp-s01-t03',
          sectionId: 'cp-s01',
          lawId: 'codigo-penal',
          number: 'Tít. III',
          name: 'Penas',
          articleStart: 21,
          articleEnd: 44,
        },
        {
          id: 'cp-s01-t04',
          sectionId: 'cp-s01',
          lawId: 'codigo-penal',
          number: 'Tít. IV',
          name: 'Ejercicio de las acciones y extinción',
          articleStart: 45,
          articleEnd: 781,
        },
      ],
    },
    {
      id: 'cp-s02',
      lawId: 'codigo-penal',
      number: 'II',
      name: 'Libro II — Parte Especial',
      articleStart: 79,
      articleEnd: 306,
      titles: [
        {
          id: 'cp-s02-t01',
          sectionId: 'cp-s02',
          lawId: 'codigo-penal',
          number: 'Tít. I',
          name: 'Delitos contra las personas',
          articleStart: 79,
          articleEnd: 108,
        },
        {
          id: 'cp-s02-t02',
          sectionId: 'cp-s02',
          lawId: 'codigo-penal',
          number: 'Tít. II',
          name: 'Delitos contra el honor',
          articleStart: 109,
          articleEnd: 178,
        },
        {
          id: 'cp-s02-t03',
          sectionId: 'cp-s02',
          lawId: 'codigo-penal',
          number: 'Tít. III',
          name: 'Delitos contra la integridad sexual',
          articleStart: 118,
          articleEnd: 133,
        },
        {
          id: 'cp-s02-t04',
          sectionId: 'cp-s02',
          lawId: 'codigo-penal',
          number: 'Tít. IV',
          name: 'Delitos contra el estado civil',
          articleStart: 134,
          articleEnd: 1391,
        },
        {
          id: 'cp-s02-t05',
          sectionId: 'cp-s02',
          lawId: 'codigo-penal',
          number: 'Tít. V',
          name: 'Delitos contra la libertad',
          articleStart: 140,
          articleEnd: 161,
        },
        {
          id: 'cp-s02-t06',
          sectionId: 'cp-s02',
          lawId: 'codigo-penal',
          number: 'Tít. VI',
          name: 'Delitos contra la propiedad',
          articleStart: 162,
          articleEnd: 185,
        },
        {
          id: 'cp-s02-t07',
          sectionId: 'cp-s02',
          lawId: 'codigo-penal',
          number: 'Tít. VII',
          name: 'Delitos contra la seguridad pública',
          articleStart: 186,
          articleEnd: 204,
        },
        {
          id: 'cp-s02-t08',
          sectionId: 'cp-s02',
          lawId: 'codigo-penal',
          number: 'Tít. VIII',
          name: 'Delitos contra el orden público',
          articleStart: 205,
          articleEnd: 213,
        },
        {
          id: 'cp-s02-t09',
          sectionId: 'cp-s02',
          lawId: 'codigo-penal',
          number: 'Tít. IX',
          name: 'Delitos contra la seguridad de la Nación',
          articleStart: 214,
          articleEnd: 225,
        },
        {
          id: 'cp-s02-t10',
          sectionId: 'cp-s02',
          lawId: 'codigo-penal',
          number: 'Tít. X',
          name: 'Delitos contra los poderes públicos y el orden constitucional',
          articleStart: 226,
          articleEnd: 231,
        },
        {
          id: 'cp-s02-t11',
          sectionId: 'cp-s02',
          lawId: 'codigo-penal',
          number: 'Tít. XI',
          name: 'Delitos contra la administración pública',
          articleStart: 232,
          articleEnd: 281,
        },
        {
          id: 'cp-s02-t12',
          sectionId: 'cp-s02',
          lawId: 'codigo-penal',
          number: 'Tít. XII',
          name: 'Delitos contra la fe pública',
          articleStart: 282,
          articleEnd: 302,
        },
        {
          id: 'cp-s02-t13',
          sectionId: 'cp-s02',
          lawId: 'codigo-penal',
          number: 'Tít. XIII',
          name: 'Delitos contra el orden económico y financiero',
          articleStart: 303,
          articleEnd: 306,
        },
      ],
    },
  ],
  articles: allArticles,
};
