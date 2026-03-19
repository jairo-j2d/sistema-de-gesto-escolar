CREATE TABLE IF NOT EXISTS public.students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  birth_date date,
  enrollment_number text UNIQUE,
  cpf text,
  rg text,
  address text,
  parent_name text,
  phone text,
  email text,
  grade text,
  class text,
  status text DEFAULT 'Ativo',
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_students_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_students_updated_at_trigger
    BEFORE UPDATE ON public.students
    FOR EACH ROW
    EXECUTE FUNCTION public.update_students_updated_at();

-- RLS Policies
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "authenticated_select_students" ON public.students FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "authenticated_insert_students" ON public.students FOR INSERT TO authenticated WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "authenticated_update_students" ON public.students FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "authenticated_delete_students" ON public.students FOR DELETE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Seed some mock data to avoid empty states
INSERT INTO public.students (name, birth_date, enrollment_number, cpf, address, parent_name, phone, grade, class, status)
VALUES 
  ('Maria Thainna Santana da Silva', '2013-05-20', 'MAT1659', '001.819.554-74', 'Sítio Pedra Branca, S/N', 'Claudia Patrícia dos Santos Silva', '(81) 99999-1111', '6º Ano', 'C', 'Ativo'),
  ('João Pedro Alves Ferreira', '2012-08-14', 'MAT1660', '111.222.333-44', 'Rua do Sol, 123', 'Ana Maria Alves', '(81) 98888-2222', '7º Ano', 'A', 'Ativo'),
  ('Beatriz Lima de Souza', '2011-11-30', 'MAT1661', '555.666.777-88', 'Avenida Brasil, 45', 'Camila Lima', '(81) 97777-3333', '8º Ano', 'B', 'Inativo')
ON CONFLICT (enrollment_number) DO NOTHING;
