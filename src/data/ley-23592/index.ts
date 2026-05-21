import type { Law } from '../../common/types/law.types';
import { LEY_23592_METADATA } from './metadata';
import { ARTICLES_23592 } from './articles';

export const LEY_23592: Law = {
  ...LEY_23592_METADATA,
  sections: [],
  articles: ARTICLES_23592,
};
