import type { Law } from '../../common/types/law.types';
import { LEY_11544_METADATA } from './metadata';
import { ARTICLES_11544 } from './articles';

export const LEY_11544: Law = {
  ...LEY_11544_METADATA,
  sections: [],
  articles: ARTICLES_11544,
};
