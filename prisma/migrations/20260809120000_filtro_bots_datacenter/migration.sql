-- Filtro de bots, segunda vuelta: los que se disfrazan de Chrome real (ago-2026).
--
-- Contexto: el filtro por user-agent solo caza a los crawlers que se declaran. En
-- agosto de 2026 el 56% de los "visitantes" (3.165 de 5.669) eran procesos corriendo
-- en Santa Clara, Hong Kong y Singapur con user-agent de Chrome legítimo y versión
-- rotada entre la 145 y la 150. Los delataba la red y el comportamiento: 0,95 page
-- views por visitante, 6,1 s de sesión promedio, un guest_id nuevo en cada visita y
-- cero búsquedas, formularios o descargas en los 3.165.
--
-- El corte a futuro ya está en events.service.ts: ip-api devuelve `hosting` en su
-- plan gratuito y los eventos con IP de datacenter van a bot_traffic_daily en vez de
-- a tracking_events. Esta migración se ocupa de lo que quedó guardado antes.
--
-- Dos partes:
--   1. admin_visitors: su copia SQL del regex no tenía `notebooklm` y no miraba el
--      pre-tag context.bot, así que el panel de visitantes seguiría contándolos.
--   2. El marcado retroactivo de los eventos ya guardados.

-- ── 1. admin_visitors ──────────────────────────────────────────────────────────
-- Cambios respecto del baseline, ambos dentro de es_bot:
--   · se agrega `notebooklm` al regex (Google-NotebookLM no dice "bot" en ningún
--     lado, igual que GoogleOther en su momento: 270 eventos colados);
--   · se reconoce `context.bot`, el pre-tag que ya usa metricsCompute.ts, para que
--     el tráfico de datacenter marcado abajo también quede fuera de este panel.
CREATE OR REPLACE FUNCTION public.admin_visitors(
  -- Los DEFAULT tienen que estar: producción creó la función con ellos y
  -- CREATE OR REPLACE no puede quitárselos ("cannot remove parameter defaults
  -- from existing function"). Sin esto la migración falla contra prod y habría
  -- que DROPear la función, dejando el panel de visitantes roto en el medio.
  p_filtro text DEFAULT 'todos'::text,
  p_limit integer DEFAULT 200,
  p_offset integer DEFAULT 0,
  p_incluir_bots boolean DEFAULT false
) RETURNS TABLE(
  guest_id text, eventos bigint, sesiones bigint,
  primero timestamp with time zone, ultimo timestamp with time zone,
  origen text, origen_campana text, ultima_pagina text,
  pais text, region text, ciudad text, device text,
  es_bot boolean, registrado boolean, nombre text, email text, status text,
  top_event text, frustracion bigint
)
LANGUAGE sql
AS $function$
  with base as (
    select t.guest_id,
           count(*) as eventos,
           count(distinct t.session_id) as sesiones,
           min(t.created_at) as primero,
           max(t.created_at) as ultimo,
           -- Regex al dia: el viejo (bot|crawl|spider|...) se comia GoogleOther, que
           -- no dice "bot" en ningun lado. Los eventos de bots ya no se ingieren
           -- (ver common/bots.ts); esto queda para lo que haya quedado de antes.
           -- context ? 'bot' = pre-tag: trafico de datacenter que se disfraza de
           -- navegador real y que el user-agent no puede delatar.
           bool_or(
             lower(coalesce(t.context->>'ua','')) ~ '(googlebot|googleother|google-extended|adsbot|mediapartners|apis-google|notebooklm|bingbot|bingpreview|msnbot|yandex|baiduspider|duckduckbot|slurp|sogou|applebot|facebookexternalhit|twitterbot|linkedinbot|telegrambot|discordbot|slackbot|redditbot|gptbot|chatgpt|oai-searchbot|claudebot|anthropic|perplexity|ccbot|bytespider|amazonbot|meta-externalagent|semrushbot|ahrefsbot|mj12bot|petalbot|dataforseo|crawler|crawling|spider|headless|lighthouse|pagespeed|puppeteer|playwright|python-requests|scrapy|scrapy|wget|go-http-client|node-fetch|okhttp|bot/|bot$)'
             or t.context ? 'bot'
           ) as es_bot,
           -- Busco y no encontro: la senal que importa y que quedaba enterrada.
           count(*) filter (where t.type in (
             'search_zero_results','search_ley_no_cargada','law_not_found',
             'law_load_error','404_hit','unavailable_content_clicked')) as frustracion
    from public.tracking_events t
    where t.guest_id is not null
    group by t.guest_id
  ),
  contacto as (
    select g as guest_id, max(nombre) as nombre, max(email) as email, max(status) as status
    from (
      select guest_id as g, nombre, email, status from public.leads where guest_id is not null
      union all
      select guest_id, nombre, email, 'founder' from public.founders where guest_id is not null
      union all
      select guest_id, null::text, email, 'contacto' from public.contact_submissions where guest_id is not null
      union all
      select guest_id, null::text, email, 'producto' from public.product_orders where guest_id is not null
    ) u
    group by g
  ),
  joined as (
    select b.*, c.nombre, c.email, c.status, (c.guest_id is not null) as registrado
    from base b left join contacto c on c.guest_id = b.guest_id
  ),
  filtered as (
    select * from joined j
    where (p_incluir_bots or not j.es_bot)
      and (case
            when p_filtro = 'registrados' then j.registrado
            when p_filtro = 'anonimos' then not j.registrado
            when p_filtro = 'frustrados' then j.frustracion > 0
            else true end)
    order by j.ultimo desc
    limit greatest(p_limit, 1) offset greatest(p_offset, 0)
  ),
  -- Una sola pasada lateral en vez de 6 subconsultas correlacionadas: el ultimo
  -- valor conocido de page/geo/device por guest. Usa idx_te_guest_created.
  ult as (
    select f.guest_id,
      (select t.context->>'page'    from public.tracking_events t where t.guest_id = f.guest_id and t.context ? 'page'    order by t.created_at desc limit 1) as ultima_pagina,
      (select t.context->>'country' from public.tracking_events t where t.guest_id = f.guest_id and t.context ? 'country' order by t.created_at desc limit 1) as pais,
      (select t.context->>'region'  from public.tracking_events t where t.guest_id = f.guest_id and t.context ? 'region'  order by t.created_at desc limit 1) as region,
      (select t.context->>'city'    from public.tracking_events t where t.guest_id = f.guest_id and t.context ? 'city'    order by t.created_at desc limit 1) as ciudad,
      (select t.context->>'device'  from public.tracking_events t where t.guest_id = f.guest_id and t.context ? 'device'  order by t.created_at desc limit 1) as device
    from filtered f
  ),
  prim as (
    select f.guest_id,
      (select coalesce(t.context->>'utm_source', nullif(t.context->>'referrer','')) from public.tracking_events t
         where t.guest_id = f.guest_id and t.type = 'session_start' order by t.created_at asc limit 1) as origen,
      (select t.context->>'utm_campaign' from public.tracking_events t
         where t.guest_id = f.guest_id and t.type = 'session_start' order by t.created_at asc limit 1) as origen_campana
    from filtered f
  )
  select f.guest_id, f.eventos, f.sesiones, f.primero, f.ultimo,
    p.origen, p.origen_campana, u.ultima_pagina, u.pais, u.region, u.ciudad, u.device,
    f.es_bot, f.registrado, f.nombre, f.email, f.status,
    (select t.type from public.tracking_events t
       where t.guest_id = f.guest_id
         and t.type = any(array['pago_aprobado','soft_gate_completed','descarga_lead_submitted','contact_form_submitted','producto_orden_creada','redactor_feedback_sent','contract_informe_descargado','pago_enviado','soft_gate_cta_clicked','contract_submitted','calculadora_used','redactor_opened','mapa_legal_loaded','guia_viewed','article_page_viewed','law_viewed','search_executed'])
       order by array_position(array['pago_aprobado','soft_gate_completed','descarga_lead_submitted','contact_form_submitted','producto_orden_creada','redactor_feedback_sent','contract_informe_descargado','pago_enviado','soft_gate_cta_clicked','contract_submitted','calculadora_used','redactor_opened','mapa_legal_loaded','guia_viewed','article_page_viewed','law_viewed','search_executed'], t.type) asc
       limit 1) as top_event,
    f.frustracion
  from filtered f
  join ult u on u.guest_id = f.guest_id
  join prim p on p.guest_id = f.guest_id
  order by f.ultimo desc;
$function$;

-- ── 2. Marcado retroactivo del tráfico de datacenter ───────────────────────────
-- NO borra nada: escribe context.bot = 'Datacenter', que es la etiqueta que
-- metricsCompute.ts ya reconoce como pre-tag y que admin_visitors acaba de aprender
-- a leer. El selector de bots del panel (sin / con / solo) los sigue mostrando, así
-- que no se pierde la señal de cuánto nos crawlean.
--
-- Para revertir:
--   UPDATE tracking_events SET context = context - 'bot'
--   WHERE context->>'bot' = 'Datacenter';
--
-- Criterio: los tres a la vez, para no marcar a una persona real por error.
--   1. Ciudad de datacenter conocido — verificadas una por una contra los datos.
--   2. Cero interacción: ninguna búsqueda, formulario, descarga, redactor ni pago.
--   3. Menos de 60 s entre el primer y el último evento (el promedio medido fue
--      6,1 s, y 2.745 de 3.113 tenían exactamente 0 s).
-- Medido antes de aplicar: 3.167 guests en ciudad de datacenter, 0 descartados por
-- interacción, 2 por duración, 3.165 marcados.
WITH dc_city AS (
  SELECT unnest(ARRAY[
    'Santa Clara', 'Cupertino', 'Mountain View', 'The Dalles', 'Prineville',
    'Council Bluffs', 'Ashburn', 'Hong Kong', 'Singapur', 'Richmond',
    'Alexandria', 'North Charleston', 'Portland'
  ]) AS c
), g AS (
  SELECT guest_id,
         max(context->>'city') AS city,
         extract(epoch FROM (max(created_at) - min(created_at)))::int AS seg,
         bool_or(type IN (
           'search_executed', 'contact_form_submitted', 'contact_form_opened',
           'descarga_lead_submitted', 'soft_gate_lead_captured', 'pago_aprobado',
           'producto_orden_creada', 'redactor_opened', 'calculadora_used',
           'article_link_copied', 'glosario_term_clicked'
         )) AS interactuo
  FROM public.tracking_events
  WHERE guest_id IS NOT NULL
  GROUP BY 1
), objetivo AS (
  SELECT guest_id FROM g
  WHERE city IN (SELECT c FROM dc_city)
    AND NOT interactuo
    AND seg < 60
)
UPDATE public.tracking_events t
SET context = coalesce(t.context, '{}'::jsonb) || '{"bot":"Datacenter"}'::jsonb
FROM objetivo o
WHERE t.guest_id = o.guest_id
  AND (t.context->>'bot') IS DISTINCT FROM 'Datacenter';
