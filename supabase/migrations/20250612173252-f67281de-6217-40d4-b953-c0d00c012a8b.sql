
-- Create newsletter subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'pending')),
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  read BOOLEAN NOT NULL DEFAULT false,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolio files table for file uploads
CREATE TABLE public.portfolio_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  description TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics events table
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  event_type TEXT NOT NULL,
  event_data JSONB NOT NULL DEFAULT '{}',
  page_url TEXT,
  user_agent TEXT,
  ip_address TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create search index table for site-wide search
CREATE TABLE public.search_index (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type TEXT NOT NULL CHECK (content_type IN ('blog_post', 'page', 'service', 'portfolio')),
  content_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  url TEXT NOT NULL,
  tags TEXT[],
  search_vector tsvector,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for newsletter subscriptions
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter" 
  ON public.newsletter_subscriptions 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view their own subscription" 
  ON public.newsletter_subscriptions 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can update their own subscription" 
  ON public.newsletter_subscriptions 
  FOR UPDATE 
  USING (true);

-- Add RLS policies for notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications" 
  ON public.notifications 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
  ON public.notifications 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add RLS policies for portfolio files
ALTER TABLE public.portfolio_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view public portfolio files" 
  ON public.portfolio_files 
  FOR SELECT 
  USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own portfolio files" 
  ON public.portfolio_files 
  FOR ALL 
  USING (auth.uid() = user_id);

-- Add RLS policies for analytics events
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analytics events" 
  ON public.analytics_events 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admins can view all analytics events" 
  ON public.analytics_events 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Add RLS policies for search index
ALTER TABLE public.search_index ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can search the index" 
  ON public.search_index 
  FOR SELECT 
  USING (true);

-- Create storage bucket for portfolio files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-files', 'portfolio-files', true);

-- Create storage policies for portfolio files
CREATE POLICY "Anyone can view portfolio files" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'portfolio-files');

CREATE POLICY "Authenticated users can upload portfolio files" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'portfolio-files' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own portfolio files" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'portfolio-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own portfolio files" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'portfolio-files' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create indexes for better performance
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);
CREATE INDEX idx_portfolio_files_user_id ON public.portfolio_files(user_id);
CREATE INDEX idx_analytics_events_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at);
CREATE INDEX idx_search_index_content_type ON public.search_index(content_type);
CREATE INDEX idx_search_index_search_vector ON public.search_index USING gin(search_vector);

-- Create full-text search index
CREATE INDEX idx_search_index_fts ON public.search_index USING gin(to_tsvector('english', title || ' ' || content));

-- Update search vector trigger
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector = to_tsvector('english', NEW.title || ' ' || NEW.content);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_search_vector
  BEFORE INSERT OR UPDATE ON public.search_index
  FOR EACH ROW EXECUTE FUNCTION update_search_vector();

-- Add updated_at triggers
CREATE TRIGGER trigger_newsletter_subscriptions_updated_at
  BEFORE UPDATE ON public.newsletter_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_notifications_updated_at
  BEFORE UPDATE ON public.notifications
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_portfolio_files_updated_at
  BEFORE UPDATE ON public.portfolio_files
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_search_index_updated_at
  BEFORE UPDATE ON public.search_index
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
