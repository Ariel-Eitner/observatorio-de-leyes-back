import type { LegalPage } from '../../common/types/legal-page.types';

export const MISION: LegalPage = {
  slug: 'mision',
  title: 'Misión',
  lastUpdated: '2026-05-06',
  sections: [
    {
      id: 'por-que',
      title: 'Por qué existe este proyecto',
      content:
        'La legislación argentina existe, es pública y en teoría está disponible para todos. Pero en la práctica, acceder a ella es difícil: los textos están dispersos en distintos sitios oficiales, escritos en lenguaje técnico, sin explicaciones que permitan entenderlos, y muchas veces desactualizados o fragmentados por múltiples modificaciones. El resultado es que la ley —que en principio protege a todos— en los hechos solo es accesible para quienes pueden pagarle a alguien que la entienda. Observatorio de Leyes existe para cerrar esa brecha.',
    },
    {
      id: 'que-resuelve',
      title: 'Qué resuelve',
      content:
        'Centralizamos la legislación argentina más relevante en un solo lugar, con el texto oficial íntegro y, junto a él, explicaciones en lenguaje claro que permiten entender qué dice la ley, qué implica en la práctica y cómo aplica en situaciones concretas. No reemplazamos al abogado, pero sí hacemos que cualquier persona pueda saber cuáles son sus derechos antes de ir a una consulta, entender qué firmó, qué le pueden exigir o qué puede reclamar.',
    },
    {
      id: 'como-funciona',
      title: 'Cómo generamos el contenido',
      content:
        'Los textos legales son copias fieles de las fuentes oficiales del Estado argentino: InfoLEG, Argentina.gob.ar y el Boletín Oficial. No los modificamos. Las explicaciones son de elaboración propia, revisadas para ser precisas sin ser simplistas. Cuando una ley fue modificada, lo indicamos y explicamos qué cambió. Cuando un artículo tiene jurisprudencia relevante, la referenciamos. El objetivo es que la plataforma sea tan rigurosa como útil.',
    },
    {
      id: 'que-no-somos',
      title: 'Qué no somos',
      content:
        'No somos un estudio jurídico ni ofrecemos asesoramiento legal. No somos un organismo oficial del Estado. El contenido de esta plataforma no tiene validez en ningún proceso judicial como fuente primaria. Para cualquier decisión con consecuencias legales reales, el camino correcto sigue siendo consultar a un abogado. Nuestro rol es ayudarte a llegar a esa conversación mejor informado.',
    },
  ],
};
