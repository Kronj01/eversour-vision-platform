-- Create visitor sessions table for tracking user sessions
CREATE TABLE IF NOT EXISTS public.visitor_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text NOT NULL UNIQUE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  ended_at timestamp with time zone,
  last_activity timestamp with time zone NOT NULL DEFAULT now(),
  ip_address text,
  user_agent text,
  device_type text,
  browser text,
  os text,
  country text,
  city text,
  referrer text,
  landing_page text,
  exit_page text,
  page_views_count integer DEFAULT 0,
  total_time_spent integer DEFAULT 0,
  is_bounce boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create user events table for detailed event tracking (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_events') THEN
    CREATE TABLE public.user_events (
      id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      session_id text NOT NULL,
      user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
      event_type text NOT NULL,
      event_category text,
      event_label text,
      event_value numeric,
      page_url text NOT NULL,
      element_selector text,
      element_text text,
      element_position jsonb,
      scroll_depth integer,
      time_on_page integer,
      metadata jsonb DEFAULT '{}'::jsonb,
      created_at timestamp with time zone NOT NULL DEFAULT now()
    );
  END IF;
END $$;

-- Create heatmap data table
CREATE TABLE IF NOT EXISTS public.heatmap_data (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_url text NOT NULL,
  device_type text NOT NULL DEFAULT 'desktop',
  interaction_type text NOT NULL,
  x_position integer,
  y_position integer,
  viewport_width integer,
  viewport_height integer,
  scroll_depth integer,
  element_selector text,
  timestamp timestamp with time zone NOT NULL DEFAULT now(),
  session_id text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create session recordings table
CREATE TABLE IF NOT EXISTS public.session_recordings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text NOT NULL UNIQUE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  recording_data jsonb NOT NULL DEFAULT '[]'::jsonb,
  duration integer DEFAULT 0,
  page_count integer DEFAULT 0,
  event_count integer DEFAULT 0,
  device_info jsonb,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  ended_at timestamp with time zone,
  is_processed boolean DEFAULT false,
  storage_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create funnel definitions table
CREATE TABLE IF NOT EXISTS public.funnel_definitions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  steps jsonb NOT NULL DEFAULT '[]'::jsonb,
  conversion_window_hours integer DEFAULT 24,
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create funnel analytics table
CREATE TABLE IF NOT EXISTS public.funnel_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  funnel_id uuid REFERENCES public.funnel_definitions(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  current_step integer NOT NULL,
  completed boolean DEFAULT false,
  dropped_at_step integer,
  time_to_complete integer,
  step_timestamps jsonb DEFAULT '{}'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create real-time metrics table
CREATE TABLE IF NOT EXISTS public.realtime_metrics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_type text NOT NULL,
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  dimensions jsonb DEFAULT '{}'::jsonb,
  timestamp timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create performance snapshots table
CREATE TABLE IF NOT EXISTS public.performance_snapshots (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url text NOT NULL,
  device_type text NOT NULL DEFAULT 'desktop',
  ttfb integer,
  fcp integer,
  lcp integer,
  fid integer,
  cls numeric,
  tti integer,
  tbt integer,
  speed_index integer,
  resource_count integer,
  resource_size_kb integer,
  js_size_kb integer,
  css_size_kb integer,
  image_size_kb integer,
  font_size_kb integer,
  lighthouse_performance integer,
  lighthouse_accessibility integer,
  lighthouse_best_practices integer,
  lighthouse_seo integer,
  lighthouse_pwa integer,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heatmap_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.realtime_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_snapshots ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert visitor sessions" ON public.visitor_sessions;
DROP POLICY IF EXISTS "Anyone can update their own session" ON public.visitor_sessions;
DROP POLICY IF EXISTS "Admins can view all sessions" ON public.visitor_sessions;
DROP POLICY IF EXISTS "Anyone can insert user events" ON public.user_events;
DROP POLICY IF EXISTS "Admins can view all events" ON public.user_events;
DROP POLICY IF EXISTS "Anyone can insert heatmap data" ON public.heatmap_data;
DROP POLICY IF EXISTS "Admins can view all heatmap data" ON public.heatmap_data;
DROP POLICY IF EXISTS "Anyone can insert session recordings" ON public.session_recordings;
DROP POLICY IF EXISTS "Anyone can update their session recording" ON public.session_recordings;
DROP POLICY IF EXISTS "Admins can view all recordings" ON public.session_recordings;
DROP POLICY IF EXISTS "Admins can manage funnel definitions" ON public.funnel_definitions;
DROP POLICY IF EXISTS "Anyone can view active funnels" ON public.funnel_definitions;
DROP POLICY IF EXISTS "Anyone can insert funnel analytics" ON public.funnel_analytics;
DROP POLICY IF EXISTS "Admins can view all funnel analytics" ON public.funnel_analytics;
DROP POLICY IF EXISTS "Anyone can insert realtime metrics" ON public.realtime_metrics;
DROP POLICY IF EXISTS "Admins can view all realtime metrics" ON public.realtime_metrics;
DROP POLICY IF EXISTS "Anyone can insert performance snapshots" ON public.performance_snapshots;
DROP POLICY IF EXISTS "Admins can view all performance snapshots" ON public.performance_snapshots;

-- Create RLS policies
CREATE POLICY "Anyone can insert visitor sessions" ON public.visitor_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all sessions" ON public.visitor_sessions FOR SELECT USING (is_admin());
CREATE POLICY "Admins can update sessions" ON public.visitor_sessions FOR UPDATE USING (is_admin());

CREATE POLICY "Anyone can insert user events" ON public.user_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all events" ON public.user_events FOR SELECT USING (is_admin());

CREATE POLICY "Anyone can insert heatmap data" ON public.heatmap_data FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all heatmap data" ON public.heatmap_data FOR SELECT USING (is_admin());

CREATE POLICY "Anyone can insert session recordings" ON public.session_recordings FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all recordings" ON public.session_recordings FOR SELECT USING (is_admin());
CREATE POLICY "Admins can update recordings" ON public.session_recordings FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can manage funnel definitions" ON public.funnel_definitions FOR ALL USING (is_admin());
CREATE POLICY "Anyone can view active funnels" ON public.funnel_definitions FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can insert funnel analytics" ON public.funnel_analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all funnel analytics" ON public.funnel_analytics FOR SELECT USING (is_admin());

CREATE POLICY "Anyone can insert realtime metrics" ON public.realtime_metrics FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all realtime metrics" ON public.realtime_metrics FOR SELECT USING (is_admin());

CREATE POLICY "Anyone can insert performance snapshots" ON public.performance_snapshots FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all performance snapshots" ON public.performance_snapshots FOR SELECT USING (is_admin());

-- Create indexes (drop first if exists)
DROP INDEX IF EXISTS idx_visitor_sessions_session_id;
DROP INDEX IF EXISTS idx_visitor_sessions_started_at;
DROP INDEX IF EXISTS idx_visitor_sessions_user_id;
DROP INDEX IF EXISTS idx_user_events_session_id;
DROP INDEX IF EXISTS idx_user_events_created_at;
DROP INDEX IF EXISTS idx_user_events_event_type;
DROP INDEX IF EXISTS idx_user_events_page_url;
DROP INDEX IF EXISTS idx_heatmap_data_page_url;
DROP INDEX IF EXISTS idx_heatmap_data_created_at;
DROP INDEX IF EXISTS idx_heatmap_data_interaction_type;
DROP INDEX IF EXISTS idx_session_recordings_session_id;
DROP INDEX IF EXISTS idx_session_recordings_created_at;
DROP INDEX IF EXISTS idx_funnel_analytics_funnel_id;
DROP INDEX IF EXISTS idx_funnel_analytics_session_id;
DROP INDEX IF EXISTS idx_funnel_analytics_created_at;
DROP INDEX IF EXISTS idx_realtime_metrics_metric_type;
DROP INDEX IF EXISTS idx_realtime_metrics_timestamp;
DROP INDEX IF EXISTS idx_performance_snapshots_url;
DROP INDEX IF EXISTS idx_performance_snapshots_created_at;

CREATE INDEX idx_visitor_sessions_session_id ON public.visitor_sessions(session_id);
CREATE INDEX idx_visitor_sessions_started_at ON public.visitor_sessions(started_at DESC);
CREATE INDEX idx_visitor_sessions_user_id ON public.visitor_sessions(user_id);

CREATE INDEX idx_user_events_session_id ON public.user_events(session_id);
CREATE INDEX idx_user_events_created_at ON public.user_events(created_at DESC);
CREATE INDEX idx_user_events_event_type ON public.user_events(event_type);
CREATE INDEX idx_user_events_page_url ON public.user_events(page_url);

CREATE INDEX idx_heatmap_data_page_url ON public.heatmap_data(page_url);
CREATE INDEX idx_heatmap_data_created_at ON public.heatmap_data(created_at DESC);
CREATE INDEX idx_heatmap_data_interaction_type ON public.heatmap_data(interaction_type);

CREATE INDEX idx_session_recordings_session_id ON public.session_recordings(session_id);
CREATE INDEX idx_session_recordings_created_at ON public.session_recordings(created_at DESC);

CREATE INDEX idx_funnel_analytics_funnel_id ON public.funnel_analytics(funnel_id);
CREATE INDEX idx_funnel_analytics_session_id ON public.funnel_analytics(session_id);
CREATE INDEX idx_funnel_analytics_created_at ON public.funnel_analytics(created_at DESC);

CREATE INDEX idx_realtime_metrics_metric_type ON public.realtime_metrics(metric_type);
CREATE INDEX idx_realtime_metrics_timestamp ON public.realtime_metrics(timestamp DESC);

CREATE INDEX idx_performance_snapshots_url ON public.performance_snapshots(url);
CREATE INDEX idx_performance_snapshots_created_at ON public.performance_snapshots(created_at DESC);

-- Create updated_at triggers
DROP TRIGGER IF EXISTS update_funnel_definitions_updated_at ON public.funnel_definitions;
DROP TRIGGER IF EXISTS update_funnel_analytics_updated_at ON public.funnel_analytics;

CREATE TRIGGER update_funnel_definitions_updated_at
  BEFORE UPDATE ON public.funnel_definitions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_funnel_analytics_updated_at
  BEFORE UPDATE ON public.funnel_analytics
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();