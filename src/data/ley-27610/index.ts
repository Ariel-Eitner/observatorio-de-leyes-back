import type { Law } from '../../common/types/law.types';
import { LEY_27610_METADATA } from './metadata';
import { ARTICLES_27610 } from './articles';

export const LEY_27610: Law = {
  ...LEY_27610_METADATA,
  sections: [],
  articles: ARTICLES_27610,
};
