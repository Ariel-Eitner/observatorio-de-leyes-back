-- Categorías temáticas: cierra el hueco entre la tabla `categories` (que era la
-- fuente única declarada) y los slugs que las normas realmente usaban.
--
-- Diagnóstico: 22 slugs aparecían en norms.categories sin fila en `categories`.
-- Como el buscador arma sus facetas contando norms.categories, esos 22 salían
-- crudos en la UI ("justicia", "empleo publico", "servicios publicos") mientras
-- /categorias y el Navbar —que sí leen la tabla— ni los mencionaban.
--
-- Acá se resuelve en dos tiempos: los que son un tema propio se dan de alta, y
-- los que eran otra forma de escribir una categoría existente se fusionan.
--
-- Se agrega además `color`: el color de cada categoría estaba hardcodeado en
-- cuatro archivos del front (LegalGraph2D, LegalGraph3D, MapaLegalClient y el
-- script de topología), ya divergentes entre sí. Pasa a viajar en el registry.

-- ── 1. Color por categoría ────────────────────────────────────────────────────
ALTER TABLE categories ADD COLUMN IF NOT EXISTS color TEXT;

UPDATE categories SET color = v.color FROM (VALUES
  ('constitucional',   '#22c55e'),
  ('civil',            '#60a5fa'),
  ('penal',            '#ef4444'),
  ('procesal-penal',   '#fca5a5'),
  ('administrativo',   '#6366f1'),
  ('laboral',          '#f59e0b'),
  ('comercial',        '#14b8a6'),
  ('aduanero',         '#94a3b8'),
  ('tributario',       '#d97706'),
  ('datos-personales', '#2dd4bf'),
  ('transparencia',    '#8b5cf6'),
  ('ambiental',        '#10b981'),
  ('genero',           '#a855f7'),
  ('salud',            '#ec4899'),
  ('consumidor',       '#f97316'),
  ('ninez',            '#e879f9'),
  ('educacion',        '#06b6d4'),
  ('internacional',    '#38bdf8'),
  ('derechos-humanos', '#fb7185'),
  ('economico',        '#eab308'),
  ('previsional',      '#a3e635'),
  ('cultura',          '#c084fc'),
  ('discapacidad',     '#67e8f9'),
  ('transporte',       '#fbbf24'),
  ('electoral',        '#818cf8'),
  ('seguridad',        '#f87171'),
  ('defensa',          '#78716c'),
  ('ciencia',          '#22d3ee'),
  ('familia',          '#f472b6'),
  ('agropecuario',     '#84cc16')
) AS v(slug, color) WHERE categories.slug = v.slug;

-- ── 2. Alta de las categorías que sí eran un tema propio ──────────────────────
-- `ord` queda en 0: el orden pasó a ser alfabético por label en el backend, así
-- que ya no se lee (ver norms-db.service.listCategories).
INSERT INTO categories (slug, label, description, icon, ord, color) VALUES
  ('justicia',           'Justicia',           'Organización del Poder Judicial, cooperación jurisdiccional y acceso a la justicia', '⚖️', 0, '#93c5fd'),
  ('social',             'Social',             'Políticas sociales, asistencia y programas de inclusión',                            '🤝', 0, '#34d399'),
  ('deporte',            'Deporte',            'Actividad deportiva, entidades y promoción del deporte',                             '🏅', 0, '#4ade80'),
  ('federalismo',        'Federalismo',        'Relaciones Nación-provincias, coparticipación y regímenes federales',                '🗺️', 0, '#7dd3fc'),
  ('empresa',            'Empresa',            'Empresas del Estado, privatizaciones y sociedades con participación estatal',        '🏭', 0, '#5eead4'),
  ('vivienda',           'Vivienda',           'Acceso a la vivienda, planes habitacionales y locación',                             '🏠', 0, '#d8b4fe'),
  ('inversiones',        'Inversiones',        'Promoción y protección de inversiones',                                              '📈', 0, '#ca8a04'),
  ('energia',            'Energía',            'Energía eléctrica, hidrocarburos y combustibles',                                    '⚡', 0, '#fde047'),
  ('telecomunicaciones', 'Telecomunicaciones', 'Telecomunicaciones, radiodifusión y servicios de comunicación',                      '📡', 0, '#0ea5e9'),
  ('turismo',            'Turismo',            'Actividad turística y su promoción',                                                 '✈️', 0, '#fb923c'),
  ('urbanismo',          'Urbanismo',          'Ordenamiento urbano, obra pública y desarrollo territorial',                         '🏙️', 0, '#a8a29e'),
  ('presupuesto',        'Presupuesto',        'Presupuesto nacional y administración financiera del Estado',                        '💰', 0, '#bef264')
ON CONFLICT (slug) DO NOTHING;

-- ── 3. Fusión de los slugs que eran otra escritura de una categoría existente ─
-- Se reescriben tanto la principal (`category`) como el array (`categories`),
-- porque el filtro del buscador mira el array y las fichas miran la principal.
-- El array se deduplica: si una norma tenía 'economia' y 'economico', la fusión
-- las colapsa y sin el DISTINCT quedaría 'economico' repetido.
DO $$
DECLARE
  m RECORD;
BEGIN
  FOR m IN SELECT * FROM (VALUES
    ('economia',           'economico'),
    ('fiscal',             'tributario'),
    ('cientifico',         'ciencia'),
    ('institucional',      'administrativo'),
    ('procesal',           'procesal-penal'),
    ('cultural',           'cultura'),
    ('agro',               'agropecuario'),
    ('federal',            'federalismo'),
    ('empleo publico',     'administrativo'),
    ('servicios publicos', 'administrativo')
  ) AS v(viejo, nuevo) LOOP
    UPDATE norms SET category = m.nuevo WHERE category = m.viejo;
    UPDATE norms
       SET categories = (
         SELECT array_agg(DISTINCT c ORDER BY c)
         FROM unnest(array_replace(categories, m.viejo, m.nuevo)) AS c
       )
     WHERE m.viejo = ANY(categories);
  END LOOP;
END $$;
