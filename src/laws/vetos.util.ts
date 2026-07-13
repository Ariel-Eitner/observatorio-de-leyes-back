import type { Law } from '../common/types/law.types';
import { computeFrontendPath } from '../common/utils/law-url.util';

export interface VetoItem {
  id: string;
  number: string;
  title: string;
  commonName: string | null;
  summary: string;
  frontendPath: string;
  sanctionDate: string | null;
  articleCount: number;
  categories: string[];
  veto: {
    label: string | null;
    date: string | null;
    description: string | null;
    decretoId: string | null;
    decretoPath: string | null;
  };
}

/**
 * Arma el circuito de las leyes VETADAS: sanción → veto → insistencia.
 *
 * Cruza cada ley con estado VETADA contra el decreto que la vetó (relación VETA) y contra el
 * `norm_amendments` de tipo VETO, que guarda los fundamentos y el resultado de la insistencia.
 *
 * Función pura para poder testear el armado sin levantar Nest ni la BD.
 */
export function buildVetos(norms: Law[]): VetoItem[] {
  const vetadas = norms.filter((n) => n.status === 'VETADA');

  const items = vetadas.map((ley) => {
    // El decreto de veto es el ORIGEN de la relación VETA que apunta a esta ley.
    const decreto = norms.find((n) => n.relations.some((r) => r.type === 'VETA' && r.targetLawId === ley.id));
    const veto = ley.amendments.find((a) => a.type === 'VETO');
    return {
      id: ley.id,
      number: ley.number,
      title: ley.title,
      commonName: ley.commonName ?? null,
      summary: ley.summary,
      frontendPath: computeFrontendPath(ley),
      sanctionDate: ley.sanctionDate,
      articleCount: ley.articleCount,
      categories: ley.categories ?? [],
      veto: {
        label: veto?.modifyingLaw ?? decreto?.title ?? null,
        date: veto?.modifyingDate ?? null,
        description: veto?.description ?? null,
        decretoId: decreto?.id ?? null,
        decretoPath: decreto ? computeFrontendPath(decreto) : null,
      },
    };
  });

  // Más recientes primero: es lo que la gente busca (lo que salió en las noticias).
  items.sort((a, b) => (b.sanctionDate ?? '').localeCompare(a.sanctionDate ?? ''));
  return items;
}
