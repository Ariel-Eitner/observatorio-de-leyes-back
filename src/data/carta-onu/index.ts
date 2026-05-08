import type { Law } from '../../common/types/law.types';
import { CARTA_ONU_METADATA } from './metadata';
import { ARTICLES_CARTA_ONU_01 } from './sections/s01';
import { ARTICLES_CARTA_ONU_02 } from './sections/s02';
import { ARTICLES_CARTA_ONU_03 } from './sections/s03';
import { ARTICLES_CARTA_ONU_04 } from './sections/s04';
import { ARTICLES_CARTA_ONU_05 } from './sections/s05';
import { ARTICLES_CARTA_ONU_06 } from './sections/s06';
import { ARTICLES_CARTA_ONU_07 } from './sections/s07';
import { ARTICLES_CARTA_ONU_08 } from './sections/s08';
import { CARTA_ONU_S09 } from './sections/s09';
import { CARTA_ONU_S10 } from './sections/s10';
import { CARTA_ONU_S11 } from './sections/s11';

const allArticles = [
  ...ARTICLES_CARTA_ONU_01,
  ...ARTICLES_CARTA_ONU_02,
  ...ARTICLES_CARTA_ONU_03,
  ...ARTICLES_CARTA_ONU_04,
  ...ARTICLES_CARTA_ONU_05,
  ...ARTICLES_CARTA_ONU_06,
  ...ARTICLES_CARTA_ONU_07,
  ...ARTICLES_CARTA_ONU_08,
  ...CARTA_ONU_S09,
  ...CARTA_ONU_S10,
  ...CARTA_ONU_S11,
].sort((a, b) => a.order - b.order);

export const CARTA_ONU: Law = {
  ...CARTA_ONU_METADATA,
  articles: allArticles,
};
