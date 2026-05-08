import type { Law } from '../../common/types/law.types';
import { LEY_26061_METADATA } from './metadata';
import { ARTICLES_26061 } from './articles';

export const LEY_26061: Law = { ...LEY_26061_METADATA, sections: [], articles: ARTICLES_26061 };
