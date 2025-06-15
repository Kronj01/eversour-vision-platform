
-- Fix the profiles table RLS policies to prevent infinite recursion
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create proper RLS policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Add RLS policies for other tables that need them
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public access to contact submissions" ON contact_submissions
  FOR SELECT USING (true);
CREATE POLICY "Allow public insert to contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public access to newsletter" ON newsletter_subscriptions
  FOR SELECT USING (true);
CREATE POLICY "Allow public insert to newsletter" ON newsletter_subscriptions
  FOR INSERT WITH CHECK (true);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read of published posts" ON blog_posts
  FOR SELECT USING (status = 'published');
CREATE POLICY "Allow authenticated users to manage posts" ON blog_posts
  FOR ALL USING (auth.uid() IS NOT NULL);

ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read of categories" ON blog_categories
  FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage categories" ON blog_categories
  FOR ALL USING (auth.uid() IS NOT NULL);
