CREATE TABLE IF NOT EXISTS founders (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   timestamptz NOT NULL    DEFAULT now(),
  updated_at   timestamptz NOT NULL    DEFAULT now(),
  nombre       text        NOT NULL,
  email        text        NOT NULL    UNIQUE,
  canal        text,                   -- 'cafecito' | 'mercado_pago' | null
  confirmed_at timestamptz             -- set client-side via completeGate() in localStorage; server tracks canal click
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER founders_updated_at
  BEFORE UPDATE ON founders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- RLS: solo service_role
ALTER TABLE founders ENABLE ROW LEVEL SECURITY;
