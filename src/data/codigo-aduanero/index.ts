import type { Law } from '../../common/types/law.types';
import { CODIGO_ADUANERO_METADATA } from './metadata';
import { SECTION_01, ARTICLES_01 } from './sections/s01';
import { SECTION_02, ARTICLES_02 } from './sections/s02';
import { SECTION_02B, ARTICLES_02B } from './sections/s02b';
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
import { SECTION_13, ARTICLES_13 } from './sections/s13';
import { SECTION_14, ARTICLES_14 } from './sections/s14';
import { SECTION_15, ARTICLES_15 } from './sections/s15';
import { SECTION_16, ARTICLES_16 } from './sections/s16';

const allArticles = [
  ...ARTICLES_01,
  ...ARTICLES_02,
  ...ARTICLES_02B,
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
  ...ARTICLES_13,
  ...ARTICLES_14,
  ...ARTICLES_15,
  ...ARTICLES_16,
].filter((a): a is NonNullable<typeof a> => a != null).sort((a, b) => a.order - b.order);

export const CODIGO_ADUANERO: Law = {
  ...CODIGO_ADUANERO_METADATA,
  sections: [
    SECTION_01,
    SECTION_02,
    SECTION_02B,
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
    SECTION_13,
    SECTION_14,
    SECTION_15,
    SECTION_16,
  ],
  articles: allArticles,
};
