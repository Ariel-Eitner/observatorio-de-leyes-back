import type { Law } from '../../common/types/law.types';
import { CODIGO_CIVIL_COMERCIAL_METADATA } from './metadata';
import { applyEnrichment } from './enrichment';
import { SECTION_00, ARTICLES_00 } from './sections/s00';
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
import { SECTION_13, ARTICLES_13 } from './sections/s13';
import { SECTION_14, ARTICLES_14 } from './sections/s14';
import { SECTION_15, ARTICLES_15 } from './sections/s15';
import { SECTION_16, ARTICLES_16 } from './sections/s16';
import { SECTION_17, ARTICLES_17 } from './sections/s17';
import { SECTION_18, ARTICLES_18 } from './sections/s18';
import { SECTION_19, ARTICLES_19 } from './sections/s19';

const allArticles = [
  ...ARTICLES_00,
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
  ...ARTICLES_13,
  ...ARTICLES_14,
  ...ARTICLES_15,
  ...ARTICLES_16,
  ...ARTICLES_17,
  ...ARTICLES_18,
  ...ARTICLES_19,
].filter((a): a is NonNullable<typeof a> => a != null).sort((a, b) => a.order - b.order);

const enrichedArticles = applyEnrichment(allArticles);

export const CODIGO_CIVIL_COMERCIAL: Law = {
  ...CODIGO_CIVIL_COMERCIAL_METADATA,
  sections: [
    SECTION_00,
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
    SECTION_13,
    SECTION_14,
    SECTION_15,
    SECTION_16,
    SECTION_17,
    SECTION_18,
    SECTION_19,
  ],
  articles: enrichedArticles,
};
