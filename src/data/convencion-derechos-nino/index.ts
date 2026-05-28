import type { Law } from '../../common/types/law.types';
import { CDN_METADATA } from './metadata';
import { CDN_S01 } from './sections/s01';
import { CDN_S02 } from './sections/s02';
import { CDN_S03 } from './sections/s03';
import { CDN_S04 } from './sections/s04';
import { CDN_S05 } from './sections/s05';

const allArticles = [
  ...CDN_S01,
  ...CDN_S02,
  ...CDN_S03,
  ...CDN_S04,
  ...CDN_S05,
].sort((a, b) => a.order - b.order);

export const CONVENCION_DERECHOS_NINO: Law = {
  ...CDN_METADATA,
  articles: allArticles,
};
