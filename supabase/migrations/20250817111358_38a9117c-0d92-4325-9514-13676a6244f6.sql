-- Fix RLS policies for tables causing 500 errors

-- Add missing RLS policies for tables without policies
-- performance_metrics
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage performance metrics" ON performance_metrics FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Allow public insert on performance metrics" ON performance_metrics FOR INSERT WITH CHECK (true);

-- backlinks
ALTER TABLE backlinks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage backlinks" ON backlinks FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- keyword_tracking
ALTER TABLE keyword_tracking ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage keyword tracking" ON keyword_tracking FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- seo_metrics
ALTER TABLE seo_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage seo metrics" ON seo_metrics FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- seo_issues
ALTER TABLE seo_issues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage seo issues" ON seo_issues FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- seo_automation_rules
ALTER TABLE seo_automation_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage seo automation rules" ON seo_automation_rules FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- seo_forecasts
ALTER TABLE seo_forecasts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage seo forecasts" ON seo_forecasts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- sitemap_urls
ALTER TABLE sitemap_urls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage sitemap urls" ON sitemap_urls FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Fix function search paths for security
ALTER FUNCTION public.handle_updated_at() SET search_path = '';
ALTER FUNCTION public.calculate_reading_time(text) SET search_path = '';
ALTER FUNCTION public.update_search_vector() SET search_path = '';
ALTER FUNCTION public.generate_slug(text) SET search_path = '';