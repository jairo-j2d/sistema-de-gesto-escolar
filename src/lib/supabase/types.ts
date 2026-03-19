// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.4'
  }
  public: {
    Tables: {
      academic_records: {
        Row: {
          created_at: string | null
          grade: string | null
          grades: Json | null
          id: string
          school_name: string | null
          status: string | null
          student_id: string
          year: string
        }
        Insert: {
          created_at?: string | null
          grade?: string | null
          grades?: Json | null
          id?: string
          school_name?: string | null
          status?: string | null
          student_id: string
          year: string
        }
        Update: {
          created_at?: string | null
          grade?: string | null
          grades?: Json | null
          id?: string
          school_name?: string | null
          status?: string | null
          student_id?: string
          year?: string
        }
        Relationships: [
          {
            foreignKeyName: 'academic_records_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'students'
            referencedColumns: ['id']
          },
        ]
      }
      generated_reports: {
        Row: {
          category: string
          created_at: string | null
          file_url: string | null
          id: string
          name: string
        }
        Insert: {
          category: string
          created_at?: string | null
          file_url?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string | null
          file_url?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      professionals: {
        Row: {
          classes: string[] | null
          cpf: string | null
          created_at: string | null
          disciplines: string[] | null
          education: string | null
          email: string | null
          employment_type: string | null
          grades: string[] | null
          id: string
          name: string
          phone: string | null
          registration_number: string | null
          role: string | null
          status: string | null
          students: string[] | null
          transport_used: string | null
          updated_at: string | null
          workload: string | null
        }
        Insert: {
          classes?: string[] | null
          cpf?: string | null
          created_at?: string | null
          disciplines?: string[] | null
          education?: string | null
          email?: string | null
          employment_type?: string | null
          grades?: string[] | null
          id?: string
          name: string
          phone?: string | null
          registration_number?: string | null
          role?: string | null
          status?: string | null
          students?: string[] | null
          transport_used?: string | null
          updated_at?: string | null
          workload?: string | null
        }
        Update: {
          classes?: string[] | null
          cpf?: string | null
          created_at?: string | null
          disciplines?: string[] | null
          education?: string | null
          email?: string | null
          employment_type?: string | null
          grades?: string[] | null
          id?: string
          name?: string
          phone?: string | null
          registration_number?: string | null
          role?: string | null
          status?: string | null
          students?: string[] | null
          transport_used?: string | null
          updated_at?: string | null
          workload?: string | null
        }
        Relationships: []
      }
      school_settings: {
        Row: {
          address: string | null
          cnpj: string | null
          coordinator_signature_url: string | null
          director_signature_url: string | null
          id: string
          inep_code: string | null
          logo_url: string | null
          portaria: string | null
          school_name: string
          secretary_signature_url: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          cnpj?: string | null
          coordinator_signature_url?: string | null
          director_signature_url?: string | null
          id?: string
          inep_code?: string | null
          logo_url?: string | null
          portaria?: string | null
          school_name?: string
          secretary_signature_url?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          cnpj?: string | null
          coordinator_signature_url?: string | null
          director_signature_url?: string | null
          id?: string
          inep_code?: string | null
          logo_url?: string | null
          portaria?: string | null
          school_name?: string
          secretary_signature_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      student_occurrences: {
        Row: {
          category: string
          created_at: string | null
          date: string
          description: string | null
          id: string
          student_id: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          student_id: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          student_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'student_occurrences_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'students'
            referencedColumns: ['id']
          },
        ]
      }
      students: {
        Row: {
          address: string | null
          birth_date: string | null
          class: string | null
          cpf: string | null
          created_at: string | null
          email: string | null
          enrollment_number: string | null
          grade: string | null
          id: string
          metadata: Json | null
          name: string
          parent_name: string | null
          phone: string | null
          rg: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          class?: string | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          enrollment_number?: string | null
          grade?: string | null
          id?: string
          metadata?: Json | null
          name: string
          parent_name?: string | null
          phone?: string | null
          rg?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          class?: string | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          enrollment_number?: string | null
          grade?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          parent_name?: string | null
          phone?: string | null
          rg?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: academic_records
//   id: uuid (not null, default: gen_random_uuid())
//   student_id: uuid (not null)
//   year: text (not null)
//   school_name: text (nullable)
//   grade: text (nullable)
//   status: text (nullable)
//   grades: jsonb (nullable, default: '{}'::jsonb)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: generated_reports
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   file_url: text (nullable)
//   category: text (not null)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: professionals
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   cpf: text (nullable)
//   registration_number: text (nullable)
//   email: text (nullable)
//   phone: text (nullable)
//   employment_type: text (nullable)
//   workload: text (nullable)
//   education: text (nullable)
//   role: text (nullable)
//   disciplines: _text (nullable)
//   grades: _text (nullable)
//   classes: _text (nullable)
//   students: _text (nullable)
//   status: text (nullable, default: 'Ativo'::text)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
//   transport_used: text (nullable)
// Table: school_settings
//   id: uuid (not null, default: gen_random_uuid())
//   school_name: text (not null, default: ''::text)
//   logo_url: text (nullable)
//   address: text (nullable)
//   cnpj: text (nullable)
//   inep_code: text (nullable)
//   portaria: text (nullable)
//   updated_at: timestamp with time zone (nullable, default: now())
//   director_signature_url: text (nullable)
//   coordinator_signature_url: text (nullable)
//   secretary_signature_url: text (nullable)
// Table: student_occurrences
//   id: uuid (not null, default: gen_random_uuid())
//   student_id: uuid (not null)
//   date: date (not null)
//   title: text (not null)
//   description: text (nullable)
//   category: text (not null)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: students
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   birth_date: date (nullable)
//   enrollment_number: text (nullable)
//   cpf: text (nullable)
//   rg: text (nullable)
//   address: text (nullable)
//   parent_name: text (nullable)
//   phone: text (nullable)
//   email: text (nullable)
//   grade: text (nullable)
//   class: text (nullable)
//   status: text (nullable, default: 'Ativo'::text)
//   metadata: jsonb (nullable, default: '{}'::jsonb)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())

// --- CONSTRAINTS ---
// Table: academic_records
//   PRIMARY KEY academic_records_pkey: PRIMARY KEY (id)
//   FOREIGN KEY academic_records_student_id_fkey: FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
// Table: generated_reports
//   PRIMARY KEY generated_reports_pkey: PRIMARY KEY (id)
// Table: professionals
//   PRIMARY KEY professionals_pkey: PRIMARY KEY (id)
// Table: school_settings
//   PRIMARY KEY school_settings_pkey: PRIMARY KEY (id)
// Table: student_occurrences
//   PRIMARY KEY student_occurrences_pkey: PRIMARY KEY (id)
//   FOREIGN KEY student_occurrences_student_id_fkey: FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
// Table: students
//   UNIQUE students_enrollment_number_key: UNIQUE (enrollment_number)
//   PRIMARY KEY students_pkey: PRIMARY KEY (id)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: academic_records
//   Policy "authenticated_delete_academic" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert_academic" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select_academic" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update_academic" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: generated_reports
//   Policy "authenticated_delete_reports" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert_reports" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select_reports" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update_reports" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: professionals
//   Policy "authenticated_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: school_settings
//   Policy "authenticated_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: student_occurrences
//   Policy "authenticated_delete_occurrences" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert_occurrences" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select_occurrences" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update_occurrences" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: students
//   Policy "authenticated_delete_students" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert_students" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select_students" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update_students" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true

// --- DATABASE FUNCTIONS ---
// FUNCTION update_students_updated_at()
//   CREATE OR REPLACE FUNCTION public.update_students_updated_at()
//    RETURNS trigger
//    LANGUAGE plpgsql
//   AS $function$
//   BEGIN
//       NEW.updated_at = now();
//       RETURN NEW;
//   END;
//   $function$
//

// --- TRIGGERS ---
// Table: students
//   update_students_updated_at_trigger: CREATE TRIGGER update_students_updated_at_trigger BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION update_students_updated_at()

// --- INDEXES ---
// Table: students
//   CREATE UNIQUE INDEX students_enrollment_number_key ON public.students USING btree (enrollment_number)
