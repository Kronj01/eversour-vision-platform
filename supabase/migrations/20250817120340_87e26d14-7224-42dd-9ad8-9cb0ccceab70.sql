-- Fix infinite recursion in profiles RLS policies by creating security definer functions

-- Create security definer function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Drop existing policies that cause recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Create new policies using security definer functions
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (public.is_admin());

CREATE POLICY "Users can view own profile" ON public.profiles  
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);

-- Fix similar issues on other tables that reference profiles for admin checks
DROP POLICY IF EXISTS "Admins can view all analytics events" ON public.analytics_events;
DROP POLICY IF EXISTS "Admins can manage all uploads" ON public.file_uploads;
DROP POLICY IF EXISTS "Admins can view all theme settings" ON public.theme_settings;

CREATE POLICY "Admins can view all analytics events" ON public.analytics_events
FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can manage all uploads" ON public.file_uploads
FOR ALL USING (public.is_admin());

CREATE POLICY "Admins can view all theme settings" ON public.theme_settings
FOR SELECT USING (public.is_admin());

-- Fix all other admin policies to use the security definer function
UPDATE pg_policies SET qual = 'public.is_admin()' 
WHERE schemaname = 'public' 
AND qual LIKE '%EXISTS ( SELECT 1%FROM profiles%role = ''admin''%';

UPDATE pg_policies SET with_check = 'public.is_admin()' 
WHERE schemaname = 'public' 
AND with_check LIKE '%EXISTS ( SELECT 1%FROM profiles%role = ''admin''%';