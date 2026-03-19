-- Add user_id to professionals for authentication linkage
ALTER TABLE public.professionals ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Helper function for RLS
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS text AS $$
  SELECT role FROM public.professionals WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Drop existing policies to recreate cleanly
DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN 
    SELECT tablename, policyname 
    FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename IN ('students', 'professionals', 'academic_records', 'student_occurrences', 'school_settings', 'generated_reports', 'messages')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

-- Policies for students
CREATE POLICY "students_select" ON public.students FOR SELECT TO authenticated
USING (
    public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)', 'Coordenador(a)')
    OR (
        public.get_user_role() = 'Professor(a)' AND
        EXISTS (
            SELECT 1 FROM public.professionals p 
            WHERE p.user_id = auth.uid() 
            AND p.grades @> ARRAY[students.grade]
            AND p.classes @> ARRAY[students.class]
        )
    )
);
CREATE POLICY "students_insert" ON public.students FOR INSERT TO authenticated WITH CHECK (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)'));
CREATE POLICY "students_update" ON public.students FOR UPDATE TO authenticated USING (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)')) WITH CHECK (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)'));
CREATE POLICY "students_delete" ON public.students FOR DELETE TO authenticated USING (public.get_user_role() = 'Administrador');

-- Policies for professionals
CREATE POLICY "professionals_select" ON public.professionals FOR SELECT TO authenticated USING (true);
CREATE POLICY "professionals_insert" ON public.professionals FOR INSERT TO authenticated WITH CHECK (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)'));
CREATE POLICY "professionals_update" ON public.professionals FOR UPDATE TO authenticated USING (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)')) WITH CHECK (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)'));
CREATE POLICY "professionals_delete" ON public.professionals FOR DELETE TO authenticated USING (public.get_user_role() = 'Administrador');

-- Policies for academic_records
CREATE POLICY "academic_select" ON public.academic_records FOR SELECT TO authenticated
USING (
    public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)', 'Coordenador(a)')
    OR (
        public.get_user_role() = 'Professor(a)' AND
        EXISTS (
            SELECT 1 FROM public.students s
            JOIN public.professionals p ON p.user_id = auth.uid()
            WHERE s.id = academic_records.student_id
            AND p.grades @> ARRAY[s.grade]
            AND p.classes @> ARRAY[s.class]
        )
    )
);
CREATE POLICY "academic_insert" ON public.academic_records FOR INSERT TO authenticated WITH CHECK (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)'));
CREATE POLICY "academic_update" ON public.academic_records FOR UPDATE TO authenticated USING (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)')) WITH CHECK (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)'));
CREATE POLICY "academic_delete" ON public.academic_records FOR DELETE TO authenticated USING (public.get_user_role() = 'Administrador');

-- Policies for student_occurrences
CREATE POLICY "occurrences_select" ON public.student_occurrences FOR SELECT TO authenticated USING (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)', 'Coordenador(a)'));
CREATE POLICY "occurrences_insert" ON public.student_occurrences FOR INSERT TO authenticated WITH CHECK (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)', 'Coordenador(a)'));
CREATE POLICY "occurrences_update" ON public.student_occurrences FOR UPDATE TO authenticated USING (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)', 'Coordenador(a)')) WITH CHECK (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)', 'Coordenador(a)'));
CREATE POLICY "occurrences_delete" ON public.student_occurrences FOR DELETE TO authenticated USING (public.get_user_role() = 'Administrador');

-- Policies for generated_reports
CREATE POLICY "reports_select" ON public.generated_reports FOR SELECT TO authenticated USING (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)', 'Coordenador(a)'));
CREATE POLICY "reports_insert" ON public.generated_reports FOR INSERT TO authenticated WITH CHECK (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)', 'Coordenador(a)'));
CREATE POLICY "reports_update" ON public.generated_reports FOR UPDATE TO authenticated USING (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)', 'Coordenador(a)')) WITH CHECK (public.get_user_role() IN ('Administrador', 'Diretor(a)', 'Secretário(a)', 'Coordenador(a)'));
CREATE POLICY "reports_delete" ON public.generated_reports FOR DELETE TO authenticated USING (public.get_user_role() = 'Administrador');

-- Policies for school_settings
CREATE POLICY "settings_select" ON public.school_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "settings_update" ON public.school_settings FOR UPDATE TO authenticated USING (public.get_user_role() = 'Administrador');
CREATE POLICY "settings_insert" ON public.school_settings FOR INSERT TO authenticated WITH CHECK (public.get_user_role() = 'Administrador');

-- Policies for messages
CREATE POLICY "messages_select" ON public.messages FOR SELECT TO authenticated USING (sender_id = auth.uid() OR receiver_id = auth.uid() OR public.get_user_role() = 'Administrador');
CREATE POLICY "messages_insert" ON public.messages FOR INSERT TO authenticated WITH CHECK (sender_id = auth.uid());
CREATE POLICY "messages_update" ON public.messages FOR UPDATE TO authenticated USING (sender_id = auth.uid());
CREATE POLICY "messages_delete" ON public.messages FOR DELETE TO authenticated USING (sender_id = auth.uid() OR public.get_user_role() = 'Administrador');

-- SEED DATA
DO $seed$
DECLARE
  admin_uid uuid := gen_random_uuid();
  coord_uid uuid := gen_random_uuid();
  prof_uid uuid := gen_random_uuid();
BEGIN
  -- Insert into auth.users
  INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role, aud, confirmation_token, recovery_token, email_change_token_new, email_change, email_change_token_current, phone, phone_change, phone_change_token, reauthentication_token)
  VALUES 
  (admin_uid, '00000000-0000-0000-0000-000000000000', 'admin@escola.gov.br', crypt('admin123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Admin"}', false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', ''),
  (coord_uid, '00000000-0000-0000-0000-000000000000', 'coord@escola.gov.br', crypt('coord123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Coordenador"}', false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', ''),
  (prof_uid, '00000000-0000-0000-0000-000000000000', 'prof@escola.gov.br', crypt('prof123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Professor"}', false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', '');

  -- Insert Professionals linked to users
  INSERT INTO public.professionals (id, user_id, name, email, role, status) VALUES (gen_random_uuid(), admin_uid, 'Administrador Geral', 'admin@escola.gov.br', 'Administrador', 'Ativo');
  INSERT INTO public.professionals (id, user_id, name, email, role, status) VALUES (gen_random_uuid(), coord_uid, 'Coordenadora Maria', 'coord@escola.gov.br', 'Coordenador(a)', 'Ativo');
  INSERT INTO public.professionals (id, user_id, name, email, role, grades, classes, disciplines, status) VALUES (gen_random_uuid(), prof_uid, 'Professor João', 'prof@escola.gov.br', 'Professor(a)', ARRAY['6º Ano', '7º Ano'], ARRAY['A', 'B', 'C'], ARRAY['Matemática'], 'Ativo');

  -- Insert Seed Students so Dashboard/Teacher Portal are not empty
  INSERT INTO public.students (id, name, enrollment_number, grade, class, status) VALUES 
    (gen_random_uuid(), 'Maria Thainna Santana', '1659', '6º Ano', 'C', 'Ativo'),
    (gen_random_uuid(), 'João Pedro Alves', '1660', '7º Ano', 'A', 'Ativo'),
    (gen_random_uuid(), 'Beatriz Lima de Souza', '1661', '8º Ano', 'B', 'Inativo')
  ON CONFLICT DO NOTHING;
END $seed$;
