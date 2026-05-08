import type { Law } from '../../common/types/law.types';
import { LEY_26618_METADATA } from './metadata';
import { ARTICLES_26618 } from './articles';

export const LEY_26618: Law = {
  ...LEY_26618_METADATA,
  sections: [],
  articles: ARTICLES_26618,
};
