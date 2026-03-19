ALTER TABLE public.school_settings
ADD COLUMN IF NOT EXISTS director_signature_url text,
ADD COLUMN IF NOT EXISTS coordinator_signature_url text,
ADD COLUMN IF NOT EXISTS secretary_signature_url text;

CREATE TABLE IF NOT EXISTS public.student_occurrences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  title text NOT NULL,
  description text,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.student_occurrences ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "authenticated_select_occurrences" ON public.student_occurrences FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "authenticated_insert_occurrences" ON public.student_occurrences FOR INSERT TO authenticated WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "authenticated_update_occurrences" ON public.student_occurrences FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "authenticated_delete_occurrences" ON public.student_occurrences FOR DELETE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS public.generated_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  file_url text,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.generated_reports ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "authenticated_select_reports" ON public.generated_reports FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "authenticated_insert_reports" ON public.generated_reports FOR INSERT TO authenticated WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "authenticated_update_reports" ON public.generated_reports FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "authenticated_delete_reports" ON public.generated_reports FOR DELETE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS public.academic_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  year text NOT NULL,
  school_name text,
  grade text,
  status text,
  grades jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.academic_records ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "authenticated_select_academic" ON public.academic_records FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "authenticated_insert_academic" ON public.academic_records FOR INSERT TO authenticated WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "authenticated_update_academic" ON public.academic_records FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "authenticated_delete_academic" ON public.academic_records FOR DELETE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ 
DECLARE
  first_student uuid;
BEGIN
  SELECT id INTO first_student FROM public.students LIMIT 1;
  IF first_student IS NOT NULL THEN
    INSERT INTO public.student_occurrences (student_id, date, title, description, category)
    VALUES 
    (first_student, CURRENT_DATE - INTERVAL '10 days', 'Atraso reincidente', 'Aluno chegou atrasado por 3 dias consecutivos.', 'Disciplinar'),
    (first_student, CURRENT_DATE - INTERVAL '2 days', 'Destaque em Matemática', 'Desempenho excepcional na avaliação bimestral.', 'Pedagógica')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO public.academic_records (student_id, year, school_name, grade, status)
    VALUES 
    (first_student, '2024', 'Escola Gilda Bertino Gomes', '6º Ano', 'Aprovado'),
    (first_student, '2025', 'Escola Gilda Bertino Gomes', '7º Ano', 'Cursando')
    ON CONFLICT DO NOTHING;
  END IF;
  
  INSERT INTO public.generated_reports (name, file_url, category)
  VALUES 
  ('Boletins - 6º Ano C - 1º Bimestre', '#', 'Boletim'),
  ('Lista de Alunos AEE - Geral', '#', 'Lista de Alunos')
  ON CONFLICT DO NOTHING;
END $$;
