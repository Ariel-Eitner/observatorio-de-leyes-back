create table if not exists contact_submissions (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null    default now(),
  nombre      text        not null,
  email       text        not null,
  tipo        text        not null check (tipo in ('general', 'privacidad', 'contenido', 'prensa')),
  mensaje     text        not null,
  user_agent  text
);

-- Solo el service role puede leer; nadie puede leer/modificar desde el cliente anon
alter table contact_submissions enable row level security;

-- Sin políticas públicas: solo service_role tiene acceso full
