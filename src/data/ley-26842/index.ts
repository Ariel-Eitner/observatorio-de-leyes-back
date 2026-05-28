import type { Law } from '../../common/types/law.types';
import { LEY_26842_METADATA } from './metadata';
import { LEY_26842_S01 } from './sections/s01';
import { LEY_26842_S02 } from './sections/s02';
import { LEY_26842_S03 } from './sections/s03';

const allArticles = [
  ...LEY_26842_S01,
  ...LEY_26842_S02,
  ...LEY_26842_S03,
].sort((a, b) => a.order - b.order);

export const LEY_26842: Law = {
  ...LEY_26842_METADATA,
  articles: allArticles,
};
