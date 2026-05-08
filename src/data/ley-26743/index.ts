import type { Law } from '../../common/types/law.types';
import { LEY_26743_METADATA } from './metadata';
import { ARTICLES_26743 } from './articles';

export const LEY_26743: Law = {
  ...LEY_26743_METADATA,
  sections: [],
  articles: ARTICLES_26743,
};
