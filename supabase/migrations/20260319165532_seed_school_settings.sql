DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.school_settings LIMIT 1) THEN
    INSERT INTO public.school_settings (
      school_name, 
      address, 
      cnpj, 
      inep_code, 
      portaria
    ) VALUES (
      'Escola Padrão', 
      'Endereço não configurado', 
      '00.000.000/0000-00', 
      '00000000', 
      'Portaria Padrão'
    );
  END IF;
END $$;
