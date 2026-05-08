import type { Law } from '../../common/types/law.types';
import { LEY_26657_METADATA } from './metadata';
import { ARTICLES_26657 } from './articles';

export const LEY_26657: Law = {
  ...LEY_26657_METADATA,
  sections: [],
  articles: ARTICLES_26657,
};
