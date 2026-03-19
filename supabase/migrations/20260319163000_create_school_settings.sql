CREATE TABLE IF NOT EXISTS public.school_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name text NOT NULL DEFAULT '',
  logo_url text,
  address text,
  cnpj text,
  inep_code text,
  portaria text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.school_settings ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "authenticated_select" ON public.school_settings FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "authenticated_update" ON public.school_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "authenticated_insert" ON public.school_settings FOR INSERT TO authenticated WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

INSERT INTO public.school_settings (id, school_name, logo_url, address, cnpj, inep_code, portaria)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Escola Gilda Bertino Gomes',
  'https://img.usecurling.com/i?q=school&shape=fill&color=blue',
  'Rua Principal, 123, Centro',
  '00.000.000/0001-00',
  '12345678',
  'Portaria Nº 123/2026'
)
ON CONFLICT (id) DO NOTHING;
