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

-- Drop existing problematic policies on profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Create new non-recursive policies
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (public.is_admin());

CREATE POLICY "Users can view own profile" ON public.profiles  
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);

-- Fix analytics_events policies
DROP POLICY IF EXISTS "Admins can view all analytics events" ON public.analytics_events;
CREATE POLICY "Admins can view all analytics events" ON public.analytics_events
FOR SELECT USING (public.is_admin());

-- Fix file_uploads policies  
DROP POLICY IF EXISTS "Admins can manage all uploads" ON public.file_uploads;
CREATE POLICY "Admins can manage all uploads" ON public.file_uploads
FOR ALL USING (public.is_admin());

-- Fix theme_settings policies
DROP POLICY IF EXISTS "Admins can view all theme settings" ON public.theme_settings;  
CREATE POLICY "Admins can view all theme settings" ON public.theme_settings
FOR SELECT USING (public.is_admin());

-- Fix all other admin policies manually
-- Blog posts
DROP POLICY IF EXISTS "Admins can manage all blog posts" ON public.blog_posts;
CREATE POLICY "Admins can manage all blog posts" ON public.blog_posts
FOR ALL USING (public.is_admin());

-- Blog categories
DROP POLICY IF EXISTS "Admins can manage blog categories" ON public.blog_categories;
CREATE POLICY "Admins can manage blog categories" ON public.blog_categories
FOR ALL USING (public.is_admin());

-- Contact submissions
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can update contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins can view all contact submissions" ON public.contact_submissions
FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update contact submissions" ON public.contact_submissions
FOR UPDATE USING (public.is_admin());

-- Forms
DROP POLICY IF EXISTS "Admins can manage all forms" ON public.forms;
CREATE POLICY "Admins can manage all forms" ON public.forms
FOR ALL USING (public.is_admin());

-- Form submissions
DROP POLICY IF EXISTS "Admins can view all form submissions" ON public.form_submissions;
CREATE POLICY "Admins can view all form submissions" ON public.form_submissions
FOR SELECT USING (public.is_admin());