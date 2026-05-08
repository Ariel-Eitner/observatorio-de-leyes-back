export interface Category {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { id: 'genero',       label: 'Género y Derechos',         description: 'Igualdad, violencia de género, identidad, matrimonio igualitario, IVE', icon: '⚖️' },
  { id: 'ambiental',   label: 'Ambiental',                 description: 'Recursos naturales, bosques, glaciares, ambiente general',               icon: '🌿' },
  { id: 'salud',       label: 'Salud',                     description: 'Salud mental, cannabis medicinal, trasplantes, VIH',                     icon: '🏥' },
  { id: 'laboral',     label: 'Laboral',                   description: 'Contrato de trabajo, teletrabajo, riesgos laborales',                    icon: '👷' },
  { id: 'economica',   label: 'Económica y Fiscal',        description: 'Reforma económica, emergencia, blanqueo, presupuesto',                   icon: '💰' },
  { id: 'consumidor',  label: 'Consumidor y Alimentación', description: 'Defensa del consumidor, etiquetado, góndolas, lealtad comercial',        icon: '🛒' },
  { id: 'educacion',   label: 'Educación',                 description: 'Educación nacional, ESI, financiamiento universitario',                  icon: '📚' },
  { id: 'transparencia', label: 'Transparencia',           description: 'Acceso a la información pública, ética pública, partidos políticos',     icon: '🔍' },
  { id: 'ninez',       label: 'Niñez y Adolescencia',      description: 'Protección integral de derechos de NNyA, adopción, responsabilidad penal juvenil', icon: '👧' },
  { id: 'penal',       label: 'Penal',                     description: 'Código Penal, Código Procesal Penal, leyes penales especiales',          icon: '⚔️' },
  { id: 'civil',       label: 'Civil y Comercial',         description: 'Código Civil y Comercial, contratos, familia, sucesiones',               icon: '📋' },
  { id: 'aduanero',    label: 'Aduanero y Comercio',       description: 'Código Aduanero, comercio exterior, importaciones y exportaciones',      icon: '🚢' },
  { id: 'constitucion', label: 'Constitucional',           description: 'Constitución Nacional y provinciales, derechos fundamentales',           icon: '📜' },
];

export const CATEGORY_MAP = new Map<string, Category>(CATEGORIES.map(c => [c.id, c]));
