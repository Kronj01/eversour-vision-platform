-- Fix function search path security issues
ALTER FUNCTION public.get_current_user_role() SET search_path = '';
ALTER FUNCTION public.is_admin() SET search_path = '';