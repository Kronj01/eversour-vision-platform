-- Fix specific policies that already exist
-- Only add policies that don't exist yet

-- Drop existing conflicting policy if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'analytics_events' 
      AND policyname = 'Admins can view all analytics events'
  ) THEN
    DROP POLICY "Admins can view all analytics events" ON public.analytics_events;
  END IF;
END$$;

-- Recreate the policy with correct function call
CREATE POLICY "Admins can view all analytics events"
  ON public.analytics_events FOR SELECT
  USING (public.is_admin());

-- Make sure trigger exists for auto-creating profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();