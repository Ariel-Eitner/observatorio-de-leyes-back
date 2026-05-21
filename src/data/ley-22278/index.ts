import type { Law } from '../../common/types/law.types';
import { LEY_22278_METADATA } from './metadata';
import { ARTICLES_22278 } from './articles';

export const LEY_22278: Law = {
  ...LEY_22278_METADATA,
  sections: [],
  articles: ARTICLES_22278,
};
