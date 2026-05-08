import type { Law } from '../../common/types/law.types';
import { LEY_26206_METADATA } from './metadata';
import { ARTICLES_26206 } from './articles';

export const LEY_26206: Law = { ...LEY_26206_METADATA, sections: [], articles: ARTICLES_26206 };
