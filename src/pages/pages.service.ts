import { Injectable, NotFoundException } from '@nestjs/common';
import type { LegalPage } from '../common/types/legal-page.types';
import { TERMINOS } from '../data/pages/terminos';
import { PRIVACIDAD } from '../data/pages/privacidad';
import { AVISO_LEGAL } from '../data/pages/aviso-legal';
import { MISION } from '../data/pages/mision';
import { CONTACTO } from '../data/pages/contacto';

const PAGES: Record<string, LegalPage> = {
  terminos: TERMINOS,
  privacidad: PRIVACIDAD,
  'aviso-legal': AVISO_LEGAL,
  mision: MISION,
  contacto: CONTACTO,
};

@Injectable()
export class PagesService {
  findBySlug(slug: string): LegalPage {
    const page = PAGES[slug];
    if (!page) throw new NotFoundException(`Página "${slug}" no encontrada`);
    return page;
  }

  findAll(): LegalPage[] {
    return Object.values(PAGES);
  }
}
