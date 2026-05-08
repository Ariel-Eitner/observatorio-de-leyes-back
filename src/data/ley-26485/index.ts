import type { Law } from '../../common/types/law.types';
import { LEY_26485_METADATA } from './metadata';
import { ARTICLES_26485 } from './articles';

export const LEY_26485: Law = {
  ...LEY_26485_METADATA,
  sections: [],
  articles: ARTICLES_26485,
};
