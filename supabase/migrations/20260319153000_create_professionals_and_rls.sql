-- Create professionals table
CREATE TABLE IF NOT EXISTS public.professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  cpf TEXT,
  registration_number TEXT,
  email TEXT,
  phone TEXT,
  employment_type TEXT,
  workload TEXT,
  education TEXT,
  role TEXT,
  disciplines TEXT[],
  grades TEXT[],
  classes TEXT[],
  students TEXT[],
  status TEXT DEFAULT 'Ativo',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to avoid errors on retry
DROP POLICY IF EXISTS "authenticated_select" ON public.professionals;
DROP POLICY IF EXISTS "authenticated_insert" ON public.professionals;
DROP POLICY IF EXISTS "authenticated_update" ON public.professionals;
DROP POLICY IF EXISTS "authenticated_delete" ON public.professionals;

-- Create RLS Policies
CREATE POLICY "authenticated_select" ON public.professionals 
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "authenticated_insert" ON public.professionals 
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "authenticated_update" ON public.professionals 
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "authenticated_delete" ON public.professionals 
  FOR DELETE TO authenticated USING (true);

-- Seed mock data
INSERT INTO public.professionals (id, name, cpf, registration_number, email, phone, employment_type, workload, education, role, disciplines, grades, classes, status)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Carlos Alberto Silva', '123.456.789-00', 'MAT001', 'carlos@escola.gov.br', '(81) 99999-0001', 'Efetivo', '200 h/a', 'Mestrado', 'Professor(a)', ARRAY['Matemática', 'Física'], ARRAY['6º Ano', '7º Ano'], ARRAY['A', 'C'], 'Ativo'),
  ('22222222-2222-2222-2222-222222222222', 'Ana Lúcia Costa', '234.567.890-11', 'MAT002', 'ana@escola.gov.br', '(81) 98888-0002', 'Efetivo', '200 h/a', 'Pós Graduação', 'Coordenador(a)', ARRAY[]::TEXT[], ARRAY['6º Ano', '7º Ano', '8º Ano', '9º Ano'], ARRAY['A', 'B', 'C'], 'Ativo')
ON CONFLICT (id) DO NOTHING;
