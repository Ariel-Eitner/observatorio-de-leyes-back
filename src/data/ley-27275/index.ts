import type { Law } from '../../common/types/law.types';
import { LEY_27275_METADATA } from './metadata';
import { ARTICLES_27275 } from './articles';

export const LEY_27275: Law = { ...LEY_27275_METADATA, sections: [], articles: ARTICLES_27275 };
