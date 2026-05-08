import type { Law } from '../../common/types/law.types';
import { LEY_27499_METADATA } from './metadata';
import { ARTICLES_27499 } from './articles';

export const LEY_27499: Law = {
  ...LEY_27499_METADATA,
  sections: [],
  articles: ARTICLES_27499,
};
