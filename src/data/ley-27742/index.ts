import type { Law } from '../../common/types/law.types';
import { LEY_27742_METADATA } from './metadata';
// Títulos I-VI y VIII-IX (artículos 1-163 y 229-238)
import { SECTION_TITULO_01, ARTICLES_TITULO_01 } from './sections/titulo-01';
import { SECTION_TITULO_02, ARTICLES_TITULO_02 } from './sections/titulo-02';
import { SECTION_TITULO_03, ARTICLES_TITULO_03 } from './sections/titulo-03';
import { SECTION_TITULO_04, ARTICLES_TITULO_04 } from './sections/titulo-04';
import { SECTION_TITULO_05, ARTICLES_TITULO_05 } from './sections/titulo-05';
import { SECTION_TITULO_06, ARTICLES_TITULO_06 } from './sections/titulo-06';
import { SECTION_TITULO_08, ARTICLES_TITULO_08 } from './sections/titulo-08';
import { SECTION_TITULO_09, ARTICLES_TITULO_09 } from './sections/titulo-09';
// Título VII: RIGI (artículos 164-228), dividido en secciones temáticas
import { SECTION_01, ARTICLES_01 } from './sections/s01';
import { SECTION_02, ARTICLES_02 } from './sections/s02';
import { SECTION_03, ARTICLES_03 } from './sections/s03';
import { SECTION_04, ARTICLES_04 } from './sections/s04';
import { SECTION_05, ARTICLES_05 } from './sections/s05';
import { SECTION_06, ARTICLES_06 } from './sections/s06';
import { SECTION_07, ARTICLES_07 } from './sections/s07';
import { SECTION_08, ARTICLES_08 } from './sections/s08';
import { SECTION_09, ARTICLES_09 } from './sections/s09';
import { SECTION_10, ARTICLES_10 } from './sections/s10';
import { SECTION_11, ARTICLES_11 } from './sections/s11';
import { SECTION_12, ARTICLES_12 } from './sections/s12';

const allArticles = [
  // Artículos 1-163 (Títulos I-VI)
  ...ARTICLES_TITULO_01,
  ...ARTICLES_TITULO_02,
  ...ARTICLES_TITULO_03,
  ...ARTICLES_TITULO_04,
  ...ARTICLES_TITULO_05,
  ...ARTICLES_TITULO_06,
  // Artículos 164-228 (Título VII: RIGI)
  ...ARTICLES_01,
  ...ARTICLES_02,
  ...ARTICLES_03,
  ...ARTICLES_04,
  ...ARTICLES_05,
  ...ARTICLES_06,
  ...ARTICLES_07,
  ...ARTICLES_08,
  ...ARTICLES_09,
  ...ARTICLES_10,
  ...ARTICLES_11,
  ...ARTICLES_12,
  // Artículos 229-238 (Títulos VIII-IX)
  ...ARTICLES_TITULO_08,
  ...ARTICLES_TITULO_09,
].filter((a): a is NonNullable<typeof a> => a != null).sort((a, b) => a.order - b.order);

export const LEY_27742: Law = {
  ...LEY_27742_METADATA,
  sections: [
    // Títulos I-VI
    SECTION_TITULO_01,
    SECTION_TITULO_02,
    SECTION_TITULO_03,
    SECTION_TITULO_04,
    SECTION_TITULO_05,
    SECTION_TITULO_06,
    // Título VII: RIGI (secciones temáticas)
    SECTION_01,
    SECTION_02,
    SECTION_03,
    SECTION_04,
    SECTION_05,
    SECTION_06,
    SECTION_07,
    SECTION_08,
    SECTION_09,
    SECTION_10,
    SECTION_11,
    SECTION_12,
    // Títulos VIII-IX
    SECTION_TITULO_08,
    SECTION_TITULO_09,
  ],
  articles: allArticles,
};
