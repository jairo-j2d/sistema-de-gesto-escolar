-- Drop the transport_used column from professionals table as it is no longer required
ALTER TABLE public.professionals DROP COLUMN IF EXISTS transport_used;
