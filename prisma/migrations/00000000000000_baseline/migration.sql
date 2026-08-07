-- ─────────────────────────────────────────────────────────────────────────────
-- BASELINE — el esquema REAL de produccion, capturado el 6-ago-2026.
--
-- De donde sale: `pg_dump --schema-only` sobre el backup de produccion
-- (PostgreSQL 17.6, proyecto jjvsnsppbzxcvvwtvkws). NO esta deducido ni escrito
-- a mano: es el DDL tal como corre en produccion.
--
-- Por que existe: hasta ahora el esquema no estaba versionado en ningun lado.
-- `schema.prisma` conocia 31 de las 43 tablas, y `supabase/migrations/` cubre
-- solo la era pre-corpus (no crea `norms` ni `articles`). El DDL de las columnas
-- `search`, de las 8 funciones y de las RPC del panel vivia unicamente dentro de
-- Supabase. Si esa base se perdia, no habia con que reconstruirlo.
--
-- Contenido: 43 tablas · 57 indices · 8 funciones · 1 trigger.
--
-- Lo que se saco a proposito:
--   * Las 2 `CREATE POLICY` que referencian los roles `authenticated` y `anon`:
--     son de Supabase y no existen en un Postgres comun. Viven en
--     `prisma/supabase-only/rls.sql`.
--   * `SET transaction_timeout`: parametro de PG17 que PG16 no reconoce.
--   * `CREATE SCHEMA public`: ya existe en cualquier base nueva.
--
-- Las extensiones van PRIMERO y no son opcionales: `norms.search` y
-- `articles.search` son columnas GENERATED que llaman a `immutable_unaccent`,
-- que a su vez llama a `unaccent`. Sin la extension, el `COPY` de esas dos
-- tablas falla al restaurar y quedan VACIAS mientras las otras 41 cargan bien
-- — el restore parece exitoso y no lo es.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

--
--



SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
-- El dump traia aqui: SELECT pg_catalog.set_config('search_path', '', false);
-- Se reemplaza por un search_path explicito. Con el search_path vacio, Prisma
-- pierde de vista su propia tabla y aborta con P1014 (_prisma_migrations does
-- not exist). Todos los objetos de abajo estan calificados con public., asi
-- que el resultado es identico.
SET search_path = public;
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--



--
-- Name: admin_db_stats(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.admin_db_stats() RETURNS jsonb
    LANGUAGE sql SECURITY DEFINER
    SET search_path TO 'public', 'pg_catalog'
    AS $$
  SELECT jsonb_build_object(
    'db_size_bytes', pg_database_size(current_database()),
    'tables', COALESCE((
      SELECT jsonb_agg(
        jsonb_build_object('name', relname, 'total_bytes', total_bytes, 'rows', rows)
        ORDER BY total_bytes DESC
      )
      FROM (
        SELECT c.relname AS relname,
               pg_total_relation_size(c.oid) AS total_bytes,
               GREATEST(c.reltuples, 0)::bigint AS rows
        FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relkind = 'r'
      ) sub
    ), '[]'::jsonb)
  );
$$;


--
-- Name: admin_page_flow(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.admin_page_flow(p_min integer DEFAULT 2) RETURNS TABLE(from_page text, to_page text, peso bigint)
    LANGUAGE sql STABLE
    AS $_$
  with pv as (
    select session_id, created_at,
           regexp_replace(coalesce(context->>'page',''), '[?#].*$', '') as page
    from public.tracking_events
    where type = 'page_view'
      and context ? 'page'
      and coalesce(context->>'page','') <> ''
      and lower(coalesce(context->>'ua','')) !~ '(bot|crawl|spider|applebot|slurp|bingpreview|facebookexternalhit|headless|preview|lighthouse|gptbot|chatgpt|ccbot)'
  ),
  seq as (
    select session_id, page,
           lead(page) over (partition by session_id order by created_at) as next_page
    from pv
  )
  select page as from_page, next_page as to_page, count(*) as peso
  from seq
  where next_page is not null and next_page <> page
  group by page, next_page
  having count(*) >= greatest(p_min, 1)
  order by peso desc
  limit 4000;
$_$;


--
-- Name: admin_visitors(text, integer, integer, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.admin_visitors(p_filtro text DEFAULT 'todos'::text, p_limit integer DEFAULT 200, p_offset integer DEFAULT 0, p_incluir_bots boolean DEFAULT false) RETURNS TABLE(guest_id text, eventos bigint, sesiones bigint, primero timestamp with time zone, ultimo timestamp with time zone, origen text, origen_campana text, ultima_pagina text, pais text, region text, ciudad text, device text, es_bot boolean, registrado boolean, nombre text, email text, status text, top_event text, frustracion bigint)
    LANGUAGE sql STABLE
    AS $_$
  with base as (
    select t.guest_id,
           count(*) as eventos,
           count(distinct t.session_id) as sesiones,
           min(t.created_at) as primero,
           max(t.created_at) as ultimo,
           -- Regex al dia: el viejo (bot|crawl|spider|...) se comia GoogleOther, que
           -- no dice "bot" en ningun lado. Los eventos de bots ya no se ingieren
           -- (ver common/bots.ts); esto queda para lo que haya quedado de antes.
           bool_or(lower(coalesce(t.context->>'ua','')) ~ '(googlebot|googleother|google-extended|adsbot|mediapartners|apis-google|bingbot|bingpreview|msnbot|yandex|baiduspider|duckduckbot|slurp|sogou|applebot|facebookexternalhit|twitterbot|linkedinbot|telegrambot|discordbot|slackbot|redditbot|gptbot|chatgpt|oai-searchbot|claudebot|anthropic|perplexity|ccbot|bytespider|amazonbot|meta-externalagent|semrushbot|ahrefsbot|mj12bot|petalbot|dataforseo|crawler|crawling|spider|headless|lighthouse|pagespeed|puppeteer|playwright|python-requests|scrapy|scrapy|wget|go-http-client|node-fetch|okhttp|bot/|bot$)') as es_bot,
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
$_$;


--
-- Name: immutable_join(text[]); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.immutable_join(text[]) RETURNS text
    LANGUAGE plpgsql IMMUTABLE STRICT PARALLEL SAFE
    AS $_$ BEGIN RETURN array_to_string($1, ' '); END $_$;


--
-- Name: immutable_unaccent(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.immutable_unaccent(text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE STRICT PARALLEL SAFE
    AS $_$ BEGIN RETURN public.unaccent($1); END $_$;


--
-- Name: set_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.set_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;


--
-- Name: tracking_compact_audit(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.tracking_compact_audit() RETURNS TABLE(day date, raw bigint, with_ua bigint)
    LANGUAGE sql SECURITY DEFINER
    AS $$
  select (created_at at time zone 'America/Argentina/Buenos_Aires')::date as day,
         count(*)::bigint as raw,
         count(*) filter (where context ? 'ua')::bigint as with_ua
  from tracking_events
  where (created_at at time zone 'America/Argentina/Buenos_Aires')::date
        < (now() at time zone 'America/Argentina/Buenos_Aires')::date
  group by 1 order by 1;
$$;


--
-- Name: tracking_compact_day(date); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.tracking_compact_day(d date) RETURNS bigint
    LANGUAGE sql SECURITY DEFINER
    AS $$
  with upd as (
    update tracking_events
    set context = (context - 'ua') || jsonb_build_object('bot',
      case
        when context->>'city' = 'Cupertino' then 'Applebot'
        when lower(coalesce(context->>'ua','')) ~ 'applebot' then 'Applebot'
        when lower(coalesce(context->>'ua','')) ~ 'googlebot' then 'Googlebot'
        when lower(coalesce(context->>'ua','')) ~ 'bingbot' then 'Bingbot'
        when lower(coalesce(context->>'ua','')) ~ 'yandex' then 'YandexBot'
        when lower(coalesce(context->>'ua','')) ~ 'bot|crawl|spider|slurp|headless|preview' then 'Bot'
        else null
      end)
    where created_at >= ((d::text || 'T00:00:00-03:00')::timestamptz)
      and created_at <  (((d + 1)::text || 'T00:00:00-03:00')::timestamptz)
      and context ? 'ua'
    returning 1
  )
  select count(*)::bigint from upd;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_docs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_docs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    key text NOT NULL,
    content jsonb DEFAULT '{}'::jsonb NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: admin_kv; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_kv (
    key text NOT NULL,
    value text,
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: annexes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.annexes (
    id text NOT NULL,
    norm_id text NOT NULL,
    number text,
    title text,
    content text NOT NULL,
    ord double precision DEFAULT 0 NOT NULL
);


--
-- Name: article_amendments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.article_amendments (
    id text NOT NULL,
    article_id text NOT NULL,
    modifying_law text,
    modifying_date date,
    previous_text text,
    new_text text,
    description text,
    created_at timestamp with time zone
);


--
-- Name: articles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.articles (
    id text NOT NULL,
    norm_id text NOT NULL,
    number text NOT NULL,
    title text,
    body text NOT NULL,
    plain_language_explanation text,
    ord double precision DEFAULT 0 NOT NULL,
    status text,
    effective_date date,
    derogated_date date,
    practical_effects text[] DEFAULT '{}'::text[] NOT NULL,
    examples text[] DEFAULT '{}'::text[] NOT NULL,
    related_articles text[] DEFAULT '{}'::text[] NOT NULL,
    jurisprudence text[] DEFAULT '{}'::text[] NOT NULL,
    regulations text[] DEFAULT '{}'::text[] NOT NULL,
    keywords text[] DEFAULT '{}'::text[] NOT NULL,
    jurisprudence_refs jsonb,
    visual_content jsonb,
    search tsvector GENERATED ALWAYS AS ((((setweight(to_tsvector('spanish'::regconfig, public.immutable_unaccent(((COALESCE(number, ''::text) || ' '::text) || COALESCE(title, ''::text)))), 'A'::"char") || setweight(to_tsvector('spanish'::regconfig, public.immutable_unaccent(public.immutable_join(keywords))), 'B'::"char")) || setweight(to_tsvector('spanish'::regconfig, public.immutable_unaccent(COALESCE(plain_language_explanation, ''::text))), 'C'::"char")) || setweight(to_tsvector('spanish'::regconfig, public.immutable_unaccent(body)), 'D'::"char"))) STORED
);


--
-- Name: benefit_claims; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.benefit_claims (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    email text NOT NULL,
    monto text,
    fecha text,
    medio text,
    detalle text,
    comprobante_url text,
    status text DEFAULT 'pendiente'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: bot_traffic_daily; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bot_traffic_daily (
    day date NOT NULL,
    bot text NOT NULL,
    hits bigint DEFAULT 0 NOT NULL
);


--
-- Name: TABLE bot_traffic_daily; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.bot_traffic_daily IS 'Trafico de crawlers agregado por dia+bot. Reemplaza guardar cada hit en tracking_events (los bots eran el 80% de la tabla). Lo llena events.service al descartar un evento de bot.';


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    slug text NOT NULL,
    label text NOT NULL,
    description text,
    icon text,
    ord integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: contact_submissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contact_submissions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    nombre text NOT NULL,
    email text,
    tipo text NOT NULL,
    mensaje text NOT NULL,
    user_agent text,
    is_read boolean DEFAULT false NOT NULL,
    apellido text,
    telefono text,
    profesion text,
    utm_source text,
    utm_medium text,
    utm_campaign text,
    utm_content text,
    utm_term text,
    empresa text,
    provincia text,
    como_nos_encontro text,
    tipo_usuario text,
    guest_id text,
    consent_at timestamp with time zone,
    consent_version text
);


--
-- Name: content_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.content_posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    red text DEFAULT 'twitter'::text NOT NULL,
    categoria text NOT NULL,
    ley_tema text,
    angulo text,
    utm text,
    texto text DEFAULT ''::text NOT NULL,
    link text,
    published_at timestamp with time zone DEFAULT now() NOT NULL,
    m24 jsonb,
    m48 jsonb,
    notas text
);


--
-- Name: egresos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.egresos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    fecha date NOT NULL,
    proveedor text NOT NULL,
    categoria text NOT NULL,
    descripcion text,
    monto double precision NOT NULL,
    moneda text DEFAULT 'USD'::text NOT NULL,
    tipo_cambio double precision,
    monto_ars double precision,
    comprobante text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    estado text DEFAULT 'pagado'::text NOT NULL,
    recurrente boolean DEFAULT false NOT NULL,
    meses_pagados text[] DEFAULT '{}'::text[] NOT NULL
);


--
-- Name: export_generations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.export_generations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    guest_id text NOT NULL,
    type text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT export_generations_type_check CHECK ((type = ANY (ARRAY['pdf'::text, 'docx'::text])))
);


--
-- Name: folders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.folders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    name text NOT NULL,
    ord integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: founders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.founders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    nombre text NOT NULL,
    email text NOT NULL,
    canal text,
    confirmed_at timestamp with time zone,
    utm_source text,
    utm_medium text,
    utm_campaign text,
    utm_content text,
    utm_term text,
    pagado boolean DEFAULT false,
    comprobante_url text,
    comprobante_at timestamp with time zone,
    telefono text,
    beneficio text,
    beneficio_meses integer,
    beneficio_otorgado_at timestamp with time zone,
    beneficio_hasta timestamp with time zone,
    beneficio_nota text,
    guest_id text,
    mensaje text,
    nivel text,
    oculto_muro boolean DEFAULT false NOT NULL,
    consent_at timestamp with time zone,
    consent_version text
);


--
-- Name: ingresos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ingresos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    fecha date NOT NULL,
    tipo text NOT NULL,
    plan text,
    cliente text,
    descripcion text,
    monto double precision NOT NULL,
    moneda text DEFAULT 'USD'::text NOT NULL,
    tipo_cambio double precision,
    monto_ars double precision,
    medio_cobro text DEFAULT 'STRIPE'::text NOT NULL,
    factura_afip text,
    periodo text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    source_ref text
);


--
-- Name: issue_triage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.issue_triage (
    issue_key text NOT NULL,
    kind text NOT NULL,
    detail text NOT NULL,
    status text DEFAULT 'pendiente'::text NOT NULL,
    note text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT issue_triage_status_check CHECK ((status = ANY (ARRAY['pendiente'::text, 'resuelto'::text, 'ignorado'::text])))
);


--
-- Name: TABLE issue_triage; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.issue_triage IS 'Triage de "pidio algo y no lo encontro": estado + nota POR PROBLEMA (no por visitante). La clave la calcula app/lib/issueTriage.ts (issueOf) - fuente unica, no duplicar en SQL. Los conteos (cuanta gente, cuando) NO se guardan: se calculan de tracking_events al vuelo.';


--
-- Name: law_likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.law_likes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    norm_id text NOT NULL,
    article_id text DEFAULT ''::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: lead_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lead_events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    lead_id uuid NOT NULL,
    type text NOT NULL,
    payload jsonb,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: leads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.leads (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text,
    nombre text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    first_source text DEFAULT 'unknown'::text NOT NULL,
    status text DEFAULT 'cold'::text NOT NULL,
    utm_source text,
    utm_medium text,
    utm_campaign text,
    utm_content text,
    utm_term text,
    notes text,
    tipo_usuario text,
    profesion text,
    empresa text,
    provincia text,
    telefono text,
    como_nos_encontro text,
    guest_id text,
    device text,
    consent_at timestamp with time zone,
    consent_version text
);


--
-- Name: metrics_daily; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.metrics_daily (
    day date NOT NULL,
    payload jsonb NOT NULL,
    guest_ids jsonb,
    events_count integer DEFAULT 0 NOT NULL,
    frozen boolean DEFAULT false NOT NULL,
    computed_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: metrics_snapshots; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.metrics_snapshots (
    range_key text NOT NULL,
    payload jsonb NOT NULL,
    computed_at timestamp with time zone DEFAULT now() NOT NULL,
    events_in_range integer DEFAULT 0,
    events_all_time integer DEFAULT 0
);


--
-- Name: norm_amendments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.norm_amendments (
    id text NOT NULL,
    norm_id text NOT NULL,
    modifying_law text,
    modifying_date date,
    description text NOT NULL,
    type text,
    created_at timestamp with time zone
);


--
-- Name: norm_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.norm_metadata (
    norm_id text NOT NULL,
    main_topic text,
    subtopics text[] DEFAULT '{}'::text[] NOT NULL,
    related_laws text[] DEFAULT '{}'::text[] NOT NULL,
    regulations text[] DEFAULT '{}'::text[] NOT NULL,
    modifying_norms text[] DEFAULT '{}'::text[] NOT NULL,
    derogating_norms text[] DEFAULT '{}'::text[] NOT NULL,
    jurisprudence text[] DEFAULT '{}'::text[] NOT NULL,
    doctrine text[] DEFAULT '{}'::text[] NOT NULL,
    obligations text[] DEFAULT '{}'::text[] NOT NULL,
    rights text[] DEFAULT '{}'::text[] NOT NULL,
    sanctions text[] DEFAULT '{}'::text[] NOT NULL,
    use_cases text[] DEFAULT '{}'::text[] NOT NULL,
    faq jsonb
);


--
-- Name: norm_relations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.norm_relations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    source_id text NOT NULL,
    target_id text NOT NULL,
    type text NOT NULL,
    description text,
    target_label text
);


--
-- Name: norm_sections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.norm_sections (
    id text NOT NULL,
    norm_id text NOT NULL,
    number text,
    name text NOT NULL,
    article_start integer,
    article_end integer,
    ord double precision DEFAULT 0 NOT NULL
);


--
-- Name: norm_stubs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.norm_stubs (
    number text NOT NULL,
    name text NOT NULL,
    infoleg_id text,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: norm_titles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.norm_titles (
    id text NOT NULL,
    section_id text NOT NULL,
    norm_id text NOT NULL,
    number text,
    name text NOT NULL,
    article_start integer,
    article_end integer,
    ord double precision DEFAULT 0 NOT NULL
);


--
-- Name: norms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.norms (
    id text NOT NULL,
    number text,
    title text NOT NULL,
    common_name text,
    summary text,
    category text,
    year integer,
    sanction_date date,
    promulgation_date date,
    publication_date date,
    effective_date date,
    derogated_date date,
    bo_number text,
    status text DEFAULT 'VIGENTE'::text NOT NULL,
    jurisdiction text NOT NULL,
    norm_type text NOT NULL,
    issuing_body text,
    full_text text,
    source_url text,
    article_count integer DEFAULT 0 NOT NULL,
    executive_summary text,
    objective text,
    problem_it_solves text,
    practical_impact text,
    topics text[] DEFAULT '{}'::text[] NOT NULL,
    keywords text[] DEFAULT '{}'::text[] NOT NULL,
    related_norms text[] DEFAULT '{}'::text[] NOT NULL,
    affected_subjects text[] DEFAULT '{}'::text[] NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    search tsvector GENERATED ALWAYS AS ((((setweight(to_tsvector('spanish'::regconfig, public.immutable_unaccent(((((COALESCE(number, ''::text) || ' '::text) || COALESCE(title, ''::text)) || ' '::text) || COALESCE(common_name, ''::text)))), 'A'::"char") || setweight(to_tsvector('spanish'::regconfig, public.immutable_unaccent(public.immutable_join(keywords))), 'B'::"char")) || setweight(to_tsvector('spanish'::regconfig, public.immutable_unaccent(((public.immutable_join(topics) || ' '::text) || COALESCE(summary, ''::text)))), 'C'::"char")) || setweight(to_tsvector('spanish'::regconfig, public.immutable_unaccent(((((COALESCE(executive_summary, ''::text) || ' '::text) || COALESCE(objective, ''::text)) || ' '::text) || COALESCE(problem_it_solves, ''::text)))), 'D'::"char"))) STORED,
    categories text[] DEFAULT '{}'::text[] NOT NULL,
    short_code text,
    aliases text[] DEFAULT '{}'::text[],
    is_destacada boolean DEFAULT false,
    infoleg_id_meta text
);


--
-- Name: pagos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pagos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    tipo text DEFAULT 'apoyo'::text NOT NULL,
    concepto text,
    monto numeric NOT NULL,
    estado text DEFAULT 'pendiente'::text NOT NULL,
    mp_payment_id text,
    mp_status text,
    mp_status_detail text,
    payment_method text,
    email text,
    nombre text,
    guest_id text,
    lead_id uuid,
    founder_id uuid,
    device text,
    utm_source text,
    utm_medium text,
    utm_campaign text,
    metadata jsonb,
    external_reference text
);


--
-- Name: post_drafts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post_drafts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    platform text DEFAULT 'twitter'::text NOT NULL,
    post_text text NOT NULL,
    comment_text text NOT NULL,
    law_id text NOT NULL,
    law_title text NOT NULL,
    article_number text NOT NULL,
    utm_content text NOT NULL,
    template_used text NOT NULL,
    hashtags text DEFAULT ''::text NOT NULL
);


--
-- Name: posted_law_history; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posted_law_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    law_id text NOT NULL,
    article_number text NOT NULL,
    platform text DEFAULT 'twitter'::text NOT NULL,
    posted_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: product_orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    producto text NOT NULL,
    nombre text,
    email text,
    telefono text,
    precio numeric,
    detalle jsonb,
    status text DEFAULT 'pendiente'::text NOT NULL,
    utm_source text,
    utm_medium text,
    utm_campaign text,
    notas text,
    guest_id text,
    consent_at timestamp with time zone,
    consent_version text
);


--
-- Name: saved_laws; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.saved_laws (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    norm_id text NOT NULL,
    nota text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    folder_id uuid
);


--
-- Name: segments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.segments (
    id text NOT NULL,
    article_id text NOT NULL,
    norm_id text NOT NULL,
    article_number text,
    segment_type text NOT NULL,
    body text NOT NULL,
    plain_explanation text,
    practical_example text,
    refs text[] DEFAULT '{}'::text[] NOT NULL,
    ord double precision DEFAULT 0 NOT NULL
);


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    token_hash text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    last_used_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_at timestamp with time zone,
    replaced_by_id uuid,
    user_agent text,
    ip text,
    device text
);


--
-- Name: system_health; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.system_health (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    checked_at timestamp with time zone DEFAULT now() NOT NULL,
    payload jsonb NOT NULL
);


--
-- Name: tour_steps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tour_steps (
    id text NOT NULL,
    tour_id text NOT NULL,
    law_id text NOT NULL,
    titulo text NOT NULL,
    say text NOT NULL,
    via text,
    scale double precision,
    dur_ms integer,
    ord integer NOT NULL
);


--
-- Name: tours; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tours (
    id text NOT NULL,
    title text NOT NULL,
    hook text NOT NULL,
    emoji text,
    accent text,
    card_hook text,
    coming_soon boolean DEFAULT false NOT NULL,
    layout text,
    ord integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: tracking_daily_summary; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tracking_daily_summary (
    date date NOT NULL,
    sessions integer DEFAULT 0 NOT NULL,
    guests integer DEFAULT 0 NOT NULL,
    page_views integer DEFAULT 0 NOT NULL,
    searches integer DEFAULT 0 NOT NULL,
    zero_searches integer DEFAULT 0 NOT NULL,
    law_views integer DEFAULT 0 NOT NULL,
    art_copies integer DEFAULT 0 NOT NULL,
    amendments integer DEFAULT 0 NOT NULL,
    inline_refs integer DEFAULT 0 NOT NULL,
    contacts_sent integer DEFAULT 0 NOT NULL,
    errors_404 integer DEFAULT 0 NOT NULL,
    raw_total integer DEFAULT 0 NOT NULL
);


--
-- Name: tracking_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tracking_events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    type text NOT NULL,
    session_id text NOT NULL,
    guest_id text,
    properties jsonb,
    context jsonb,
    user_id text
);


--
-- Name: tweets_performance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tweets_performance (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    fecha date NOT NULL,
    tipo text NOT NULL,
    url text,
    texto_preview text,
    impresiones integer DEFAULT 0 NOT NULL,
    replies integer DEFAULT 0 NOT NULL,
    bookmarks integer DEFAULT 0 NOT NULL,
    retweets integer DEFAULT 0 NOT NULL,
    link_clicks integer DEFAULT 0 NOT NULL,
    follows_ganados integer DEFAULT 0 NOT NULL,
    notas text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    subtweets jsonb DEFAULT '[]'::jsonb NOT NULL
);


--
-- Name: user_journeys; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_journeys (
    guest_id text NOT NULL,
    contact_email text,
    first_touch jsonb,
    timeline jsonb DEFAULT '[]'::jsonb NOT NULL,
    sessions integer DEFAULT 0 NOT NULL,
    total integer DEFAULT 0 NOT NULL,
    first_at timestamp with time zone,
    last_at timestamp with time zone,
    frozen_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    nombre text,
    status text DEFAULT 'active'::text NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    is_founder boolean DEFAULT false NOT NULL,
    plan text DEFAULT 'free'::text NOT NULL,
    plan_until timestamp with time zone,
    guest_id text,
    lead_id uuid,
    founder_id uuid,
    consent_at timestamp with time zone,
    consent_version text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    last_login_at timestamp with time zone,
    apellido text,
    telefono text,
    tipo_usuario text,
    profesion text,
    especialidad text,
    empresa text,
    provincia text,
    failed_login_count integer DEFAULT 0 NOT NULL,
    locked_until timestamp with time zone
);


--
-- Name: admin_docs admin_docs_key_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_docs
    ADD CONSTRAINT admin_docs_key_key UNIQUE (key);


--
-- Name: admin_docs admin_docs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_docs
    ADD CONSTRAINT admin_docs_pkey PRIMARY KEY (id);


--
-- Name: admin_kv admin_kv_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_kv
    ADD CONSTRAINT admin_kv_pkey PRIMARY KEY (key);


--
-- Name: annexes annexes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.annexes
    ADD CONSTRAINT annexes_pkey PRIMARY KEY (id);


--
-- Name: article_amendments article_amendments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_amendments
    ADD CONSTRAINT article_amendments_pkey PRIMARY KEY (id);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: benefit_claims benefit_claims_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.benefit_claims
    ADD CONSTRAINT benefit_claims_pkey PRIMARY KEY (id);


--
-- Name: bot_traffic_daily bot_traffic_daily_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bot_traffic_daily
    ADD CONSTRAINT bot_traffic_daily_pkey PRIMARY KEY (day, bot);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (slug);


--
-- Name: contact_submissions contact_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contact_submissions
    ADD CONSTRAINT contact_submissions_pkey PRIMARY KEY (id);


--
-- Name: content_posts content_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.content_posts
    ADD CONSTRAINT content_posts_pkey PRIMARY KEY (id);


--
-- Name: egresos egresos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.egresos
    ADD CONSTRAINT egresos_pkey PRIMARY KEY (id);


--
-- Name: export_generations export_generations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.export_generations
    ADD CONSTRAINT export_generations_pkey PRIMARY KEY (id);


--
-- Name: folders folders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.folders
    ADD CONSTRAINT folders_pkey PRIMARY KEY (id);


--
-- Name: founders founders_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.founders
    ADD CONSTRAINT founders_email_key UNIQUE (email);


--
-- Name: founders founders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.founders
    ADD CONSTRAINT founders_pkey PRIMARY KEY (id);


--
-- Name: ingresos ingresos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ingresos
    ADD CONSTRAINT ingresos_pkey PRIMARY KEY (id);


--
-- Name: issue_triage issue_triage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.issue_triage
    ADD CONSTRAINT issue_triage_pkey PRIMARY KEY (issue_key);


--
-- Name: law_likes law_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.law_likes
    ADD CONSTRAINT law_likes_pkey PRIMARY KEY (id);


--
-- Name: law_likes law_likes_user_id_norm_id_article_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.law_likes
    ADD CONSTRAINT law_likes_user_id_norm_id_article_id_key UNIQUE (user_id, norm_id, article_id);


--
-- Name: lead_events lead_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lead_events
    ADD CONSTRAINT lead_events_pkey PRIMARY KEY (id);


--
-- Name: leads leads_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_email_key UNIQUE (email);


--
-- Name: leads leads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_pkey PRIMARY KEY (id);


--
-- Name: metrics_daily metrics_daily_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.metrics_daily
    ADD CONSTRAINT metrics_daily_pkey PRIMARY KEY (day);


--
-- Name: metrics_snapshots metrics_snapshots_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.metrics_snapshots
    ADD CONSTRAINT metrics_snapshots_pkey PRIMARY KEY (range_key);


--
-- Name: norm_amendments norm_amendments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.norm_amendments
    ADD CONSTRAINT norm_amendments_pkey PRIMARY KEY (id);


--
-- Name: norm_metadata norm_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.norm_metadata
    ADD CONSTRAINT norm_metadata_pkey PRIMARY KEY (norm_id);


--
-- Name: norm_relations norm_relations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.norm_relations
    ADD CONSTRAINT norm_relations_pkey PRIMARY KEY (id);


--
-- Name: norm_relations norm_relations_source_id_target_id_type_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.norm_relations
    ADD CONSTRAINT norm_relations_source_id_target_id_type_key UNIQUE (source_id, target_id, type);


--
-- Name: norm_sections norm_sections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.norm_sections
    ADD CONSTRAINT norm_sections_pkey PRIMARY KEY (id);


--
-- Name: norm_stubs norm_stubs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.norm_stubs
    ADD CONSTRAINT norm_stubs_pkey PRIMARY KEY (number);


--
-- Name: norm_titles norm_titles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.norm_titles
    ADD CONSTRAINT norm_titles_pkey PRIMARY KEY (id);


--
-- Name: norms norms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.norms
    ADD CONSTRAINT norms_pkey PRIMARY KEY (id);


--
-- Name: pagos pagos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_pkey PRIMARY KEY (id);


--
-- Name: post_drafts post_drafts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_drafts
    ADD CONSTRAINT post_drafts_pkey PRIMARY KEY (id);


--
-- Name: posted_law_history posted_law_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posted_law_history
    ADD CONSTRAINT posted_law_history_pkey PRIMARY KEY (id);


--
-- Name: product_orders product_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_orders
    ADD CONSTRAINT product_orders_pkey PRIMARY KEY (id);


--
-- Name: saved_laws saved_laws_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_laws
    ADD CONSTRAINT saved_laws_pkey PRIMARY KEY (id);


--
-- Name: saved_laws saved_laws_user_id_norm_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_laws
    ADD CONSTRAINT saved_laws_user_id_norm_id_key UNIQUE (user_id, norm_id);


--
-- Name: segments segments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.segments
    ADD CONSTRAINT segments_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_hash_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_hash_key UNIQUE (token_hash);


--
-- Name: system_health system_health_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.system_health
    ADD CONSTRAINT system_health_pkey PRIMARY KEY (id);


--
-- Name: tour_steps tour_steps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tour_steps
    ADD CONSTRAINT tour_steps_pkey PRIMARY KEY (id);


--
-- Name: tours tours_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tours
    ADD CONSTRAINT tours_pkey PRIMARY KEY (id);


--
-- Name: tracking_daily_summary tracking_daily_summary_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tracking_daily_summary
    ADD CONSTRAINT tracking_daily_summary_pkey PRIMARY KEY (date);


--
-- Name: tracking_events tracking_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tracking_events
    ADD CONSTRAINT tracking_events_pkey PRIMARY KEY (id);


--
-- Name: tweets_performance tweets_performance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tweets_performance
    ADD CONSTRAINT tweets_performance_pkey PRIMARY KEY (id);


--
-- Name: user_journeys user_journeys_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_journeys
    ADD CONSTRAINT user_journeys_pkey PRIMARY KEY (guest_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: export_generations_guest_type_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX export_generations_guest_type_idx ON public.export_generations USING btree (guest_id, type);


--
-- Name: idx_annexes_norm; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_annexes_norm ON public.annexes USING btree (norm_id);


--
-- Name: idx_art_amend_article; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_art_amend_article ON public.article_amendments USING btree (article_id);


--
-- Name: idx_articles_norm; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_articles_norm ON public.articles USING btree (norm_id);


--
-- Name: idx_articles_search; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_articles_search ON public.articles USING gin (search);


--
-- Name: idx_benefit_claims_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_benefit_claims_status ON public.benefit_claims USING btree (status);


--
-- Name: idx_benefit_claims_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_benefit_claims_user ON public.benefit_claims USING btree (user_id);


--
-- Name: idx_content_posts_published; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_content_posts_published ON public.content_posts USING btree (published_at DESC);


--
-- Name: idx_egresos_categoria; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_egresos_categoria ON public.egresos USING btree (categoria);


--
-- Name: idx_egresos_fecha; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_egresos_fecha ON public.egresos USING btree (fecha DESC);


--
-- Name: idx_folders_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_folders_user ON public.folders USING btree (user_id);


--
-- Name: idx_ingresos_fecha; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_ingresos_fecha ON public.ingresos USING btree (fecha DESC);


--
-- Name: idx_ingresos_tipo; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_ingresos_tipo ON public.ingresos USING btree (tipo);


--
-- Name: idx_law_likes_norm; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_law_likes_norm ON public.law_likes USING btree (norm_id);


--
-- Name: idx_law_likes_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_law_likes_user ON public.law_likes USING btree (user_id);


--
-- Name: idx_norm_amend_norm; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_norm_amend_norm ON public.norm_amendments USING btree (norm_id);


--
-- Name: idx_norms_keywords; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_norms_keywords ON public.norms USING gin (keywords);


--
-- Name: idx_norms_search; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_norms_search ON public.norms USING gin (search);


--
-- Name: idx_norms_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_norms_status ON public.norms USING btree (status);


--
-- Name: idx_norms_topics; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_norms_topics ON public.norms USING gin (topics);


--
-- Name: idx_norms_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_norms_type ON public.norms USING btree (norm_type);


--
-- Name: idx_pagos_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pagos_created_at ON public.pagos USING btree (created_at DESC);


--
-- Name: idx_pagos_estado; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pagos_estado ON public.pagos USING btree (estado);


--
-- Name: idx_pagos_guest; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pagos_guest ON public.pagos USING btree (guest_id);


--
-- Name: idx_pagos_mp_payment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pagos_mp_payment_id ON public.pagos USING btree (mp_payment_id);


--
-- Name: idx_post_drafts_platform; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_post_drafts_platform ON public.post_drafts USING btree (platform, created_at DESC);


--
-- Name: idx_posted_history_lookup; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_posted_history_lookup ON public.posted_law_history USING btree (law_id, article_number, platform);


--
-- Name: idx_relations_source; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_relations_source ON public.norm_relations USING btree (source_id);


--
-- Name: idx_relations_target; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_relations_target ON public.norm_relations USING btree (target_id);


--
-- Name: idx_saved_laws_folder; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_saved_laws_folder ON public.saved_laws USING btree (folder_id);


--
-- Name: idx_saved_laws_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_saved_laws_user ON public.saved_laws USING btree (user_id);


--
-- Name: idx_sections_norm; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sections_norm ON public.norm_sections USING btree (norm_id);


--
-- Name: idx_segments_article; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_segments_article ON public.segments USING btree (article_id);


--
-- Name: idx_segments_norm; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_segments_norm ON public.segments USING btree (norm_id);


--
-- Name: idx_sessions_expires; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sessions_expires ON public.sessions USING btree (expires_at);


--
-- Name: idx_sessions_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sessions_user ON public.sessions USING btree (user_id);


--
-- Name: idx_system_health_checked; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_system_health_checked ON public.system_health USING btree (checked_at DESC);


--
-- Name: idx_te_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_te_created_at ON public.tracking_events USING btree (created_at DESC);


--
-- Name: idx_te_guest; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_te_guest ON public.tracking_events USING btree (guest_id);


--
-- Name: idx_te_guest_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_te_guest_created ON public.tracking_events USING btree (guest_id, created_at DESC);


--
-- Name: idx_te_session; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_te_session ON public.tracking_events USING btree (session_id);


--
-- Name: idx_te_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_te_type ON public.tracking_events USING btree (type);


--
-- Name: idx_te_type_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_te_type_date ON public.tracking_events USING btree (type, created_at DESC);


--
-- Name: idx_te_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_te_user ON public.tracking_events USING btree (user_id);


--
-- Name: idx_titles_section; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_titles_section ON public.norm_titles USING btree (section_id);


--
-- Name: idx_users_founder; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_users_founder ON public.users USING btree (founder_id);


--
-- Name: idx_users_guest; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_users_guest ON public.users USING btree (guest_id);


--
-- Name: ingresos_source_ref_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ingresos_source_ref_key ON public.ingresos USING btree (source_ref);


--
-- Name: lead_events_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lead_events_created_at_idx ON public.lead_events USING btree (created_at DESC);


--
-- Name: lead_events_lead_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lead_events_lead_id_idx ON public.lead_events USING btree (lead_id);


--
-- Name: lead_events_type_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lead_events_type_idx ON public.lead_events USING btree (type);


--
-- Name: leads_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX leads_created_at_idx ON public.leads USING btree (created_at DESC);


--
-- Name: leads_first_source_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX leads_first_source_idx ON public.leads USING btree (first_source);


--
-- Name: leads_provincia_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX leads_provincia_idx ON public.leads USING btree (provincia);


--
-- Name: leads_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX leads_status_idx ON public.leads USING btree (status);


--
-- Name: leads_tipo_usuario_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX leads_tipo_usuario_idx ON public.leads USING btree (tipo_usuario);


--
-- Name: tour_steps_tour_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tour_steps_tour_idx ON public.tour_steps USING btree (tour_id, ord);


--
-- Name: founders founders_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER founders_updated_at BEFORE UPDATE ON public.founders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: annexes annexes_norm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.annexes
    ADD CONSTRAINT annexes_norm_id_fkey FOREIGN KEY (norm_id) REFERENCES public.norms(id) ON DELETE CASCADE;


--
-- Name: article_amendments article_amendments_article_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_amendments
    ADD CONSTRAINT article_amendments_article_id_fkey FOREIGN KEY (article_id) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- Name: articles articles_norm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_norm_id_fkey FOREIGN KEY (norm_id) REFERENCES public.norms(id) ON DELETE CASCADE;


--
-- Name: benefit_claims benefit_claims_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.benefit_claims
    ADD CONSTRAINT benefit_claims_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: folders folders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.folders
    ADD CONSTRAINT folders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: law_likes law_likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.law_likes
    ADD CONSTRAINT law_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: lead_events lead_events_lead_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lead_events
    ADD CONSTRAINT lead_events_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE CASCADE;


--
-- Name: norm_amendments norm_amendments_norm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.norm_amendments
    ADD CONSTRAINT norm_amendments_norm_id_fkey FOREIGN KEY (norm_id) REFERENCES public.norms(id) ON DELETE CASCADE;


--
-- Name: norm_metadata norm_metadata_norm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.norm_metadata
    ADD CONSTRAINT norm_metadata_norm_id_fkey FOREIGN KEY (norm_id) REFERENCES public.norms(id) ON DELETE CASCADE;


--
-- Name: norm_relations norm_relations_source_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.norm_relations
    ADD CONSTRAINT norm_relations_source_id_fkey FOREIGN KEY (source_id) REFERENCES public.norms(id) ON DELETE CASCADE;


--
-- Name: norm_sections norm_sections_norm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.norm_sections
    ADD CONSTRAINT norm_sections_norm_id_fkey FOREIGN KEY (norm_id) REFERENCES public.norms(id) ON DELETE CASCADE;


--
-- Name: norm_titles norm_titles_norm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.norm_titles
    ADD CONSTRAINT norm_titles_norm_id_fkey FOREIGN KEY (norm_id) REFERENCES public.norms(id) ON DELETE CASCADE;


--
-- Name: norm_titles norm_titles_section_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.norm_titles
    ADD CONSTRAINT norm_titles_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.norm_sections(id) ON DELETE CASCADE;


--
-- Name: saved_laws saved_laws_folder_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_laws
    ADD CONSTRAINT saved_laws_folder_id_fkey FOREIGN KEY (folder_id) REFERENCES public.folders(id) ON DELETE SET NULL;


--
-- Name: saved_laws saved_laws_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_laws
    ADD CONSTRAINT saved_laws_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: segments segments_article_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.segments
    ADD CONSTRAINT segments_article_id_fkey FOREIGN KEY (article_id) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- Name: segments segments_norm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.segments
    ADD CONSTRAINT segments_norm_id_fkey FOREIGN KEY (norm_id) REFERENCES public.norms(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: tour_steps tour_steps_tour_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tour_steps
    ADD CONSTRAINT tour_steps_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON DELETE CASCADE;


--
-- Name: admin_docs; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.admin_docs ENABLE ROW LEVEL SECURITY;

--
-- Name: annexes; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.annexes ENABLE ROW LEVEL SECURITY;

--
-- Name: article_amendments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.article_amendments ENABLE ROW LEVEL SECURITY;

--
-- Name: articles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

--
-- Name: benefit_claims; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.benefit_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: bot_traffic_daily; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.bot_traffic_daily ENABLE ROW LEVEL SECURITY;

--
-- Name: contact_submissions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

--
-- Name: content_posts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.content_posts ENABLE ROW LEVEL SECURITY;

--
-- Name: egresos; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.egresos ENABLE ROW LEVEL SECURITY;

--
-- Name: export_generations; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.export_generations ENABLE ROW LEVEL SECURITY;

--
-- Name: folders; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.folders ENABLE ROW LEVEL SECURITY;

--
-- Name: founders; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.founders ENABLE ROW LEVEL SECURITY;

--
-- Name: ingresos; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.ingresos ENABLE ROW LEVEL SECURITY;

--
-- Name: issue_triage; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.issue_triage ENABLE ROW LEVEL SECURITY;

--
-- Name: law_likes; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.law_likes ENABLE ROW LEVEL SECURITY;

--
-- Name: lead_events; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.lead_events ENABLE ROW LEVEL SECURITY;

--
-- Name: leads; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

--
-- Name: metrics_daily; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.metrics_daily ENABLE ROW LEVEL SECURITY;

--
-- Name: metrics_snapshots; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.metrics_snapshots ENABLE ROW LEVEL SECURITY;

--
-- Name: post_drafts no_public_access_post_drafts; Type: POLICY; Schema: public; Owner: -
--



--
-- Name: posted_law_history no_public_access_posted_history; Type: POLICY; Schema: public; Owner: -
--



--
-- Name: norm_amendments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.norm_amendments ENABLE ROW LEVEL SECURITY;

--
-- Name: norm_metadata; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.norm_metadata ENABLE ROW LEVEL SECURITY;

--
-- Name: norm_relations; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.norm_relations ENABLE ROW LEVEL SECURITY;

--
-- Name: norm_sections; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.norm_sections ENABLE ROW LEVEL SECURITY;

--
-- Name: norm_titles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.norm_titles ENABLE ROW LEVEL SECURITY;

--
-- Name: norms; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.norms ENABLE ROW LEVEL SECURITY;

--
-- Name: pagos; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.pagos ENABLE ROW LEVEL SECURITY;

--
-- Name: post_drafts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.post_drafts ENABLE ROW LEVEL SECURITY;

--
-- Name: posted_law_history; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.posted_law_history ENABLE ROW LEVEL SECURITY;

--
-- Name: product_orders; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.product_orders ENABLE ROW LEVEL SECURITY;

--
-- Name: saved_laws; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.saved_laws ENABLE ROW LEVEL SECURITY;

--
-- Name: segments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.segments ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: system_health; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.system_health ENABLE ROW LEVEL SECURITY;

--
-- Name: tracking_daily_summary; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.tracking_daily_summary ENABLE ROW LEVEL SECURITY;

--
-- Name: tracking_events; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.tracking_events ENABLE ROW LEVEL SECURITY;

--
-- Name: tweets_performance; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.tweets_performance ENABLE ROW LEVEL SECURITY;

--
-- Name: user_journeys; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_journeys ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

--
--


