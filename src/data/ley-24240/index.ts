import type { Law } from '../../common/types/law.types';
import { LEY_24240_METADATA } from './metadata';
import { ARTICLES_24240 } from './articles';

export const LEY_24240: Law = { ...LEY_24240_METADATA, sections: [], articles: ARTICLES_24240 };
