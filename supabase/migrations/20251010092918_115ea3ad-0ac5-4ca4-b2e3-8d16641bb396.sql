-- Create drip campaigns table
CREATE TABLE IF NOT EXISTS public.drip_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  trigger_type TEXT NOT NULL, -- 'signup', 'tag_added', 'custom_event', 'manual'
  trigger_config JSONB NOT NULL DEFAULT '{}',
  emails JSONB NOT NULL DEFAULT '[]', -- Array of email objects with delay, subject, content
  is_active BOOLEAN DEFAULT true,
  total_enrolled INTEGER DEFAULT 0,
  total_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create drip campaign enrollments table
CREATE TABLE IF NOT EXISTS public.drip_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES public.drip_campaigns(id) ON DELETE CASCADE,
  user_id UUID,
  email TEXT NOT NULL,
  current_step INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'paused', 'cancelled'
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'
);

-- Create segments table
CREATE TABLE IF NOT EXISTS public.segments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  conditions JSONB NOT NULL DEFAULT '[]', -- Array of condition objects
  member_count INTEGER DEFAULT 0,
  is_dynamic BOOLEAN DEFAULT true, -- Dynamic updates or static snapshot
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create segment members table
CREATE TABLE IF NOT EXISTS public.segment_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  segment_id UUID REFERENCES public.segments(id) ON DELETE CASCADE,
  user_id UUID,
  email TEXT NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Create email templates table
CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  category TEXT DEFAULT 'general', -- 'transactional', 'promotional', 'newsletter', 'general'
  variables JSONB DEFAULT '[]', -- Available variables for template
  thumbnail_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create campaign analytics table
CREATE TABLE IF NOT EXISTS public.campaign_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL,
  campaign_type TEXT NOT NULL, -- 'email', 'drip', 'automation'
  event_type TEXT NOT NULL, -- 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'unsubscribed'
  recipient_email TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lead capture forms table
CREATE TABLE IF NOT EXISTS public.lead_capture_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'popup', 'embedded', 'slide_in', 'bar'
  title TEXT NOT NULL,
  description TEXT,
  fields JSONB NOT NULL DEFAULT '[]', -- Form field definitions
  success_message TEXT DEFAULT 'Thank you for subscribing!',
  redirect_url TEXT,
  display_rules JSONB DEFAULT '{}', -- When/where to show
  design_config JSONB DEFAULT '{}', -- Colors, fonts, layout
  is_active BOOLEAN DEFAULT true,
  total_views INTEGER DEFAULT 0,
  total_submissions INTEGER DEFAULT 0,
  conversion_rate NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lead capture submissions table
CREATE TABLE IF NOT EXISTS public.lead_captures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID REFERENCES public.lead_capture_forms(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  source_url TEXT,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#6366f1',
  description TEXT,
  subscriber_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subscriber tags table
CREATE TABLE IF NOT EXISTS public.subscriber_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subscriber_id UUID,
  email TEXT NOT NULL,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.drip_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drip_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.segment_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_capture_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_captures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriber_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for drip_campaigns
CREATE POLICY "Admins can manage drip campaigns" ON public.drip_campaigns
  FOR ALL USING (is_admin());

-- RLS Policies for drip_enrollments
CREATE POLICY "Admins can view all enrollments" ON public.drip_enrollments
  FOR SELECT USING (is_admin());

CREATE POLICY "Anyone can enroll" ON public.drip_enrollments
  FOR INSERT WITH CHECK (true);

-- RLS Policies for segments
CREATE POLICY "Admins can manage segments" ON public.segments
  FOR ALL USING (is_admin());

-- RLS Policies for segment_members
CREATE POLICY "Admins can view segment members" ON public.segment_members
  FOR SELECT USING (is_admin());

-- RLS Policies for email_templates
CREATE POLICY "Admins can manage email templates" ON public.email_templates
  FOR ALL USING (is_admin());

-- RLS Policies for campaign_analytics
CREATE POLICY "Admins can view campaign analytics" ON public.campaign_analytics
  FOR SELECT USING (is_admin());

CREATE POLICY "Anyone can track campaign events" ON public.campaign_analytics
  FOR INSERT WITH CHECK (true);

-- RLS Policies for lead_capture_forms
CREATE POLICY "Admins can manage lead capture forms" ON public.lead_capture_forms
  FOR ALL USING (is_admin());

CREATE POLICY "Anyone can view active forms" ON public.lead_capture_forms
  FOR SELECT USING (is_active = true);

-- RLS Policies for lead_captures
CREATE POLICY "Admins can view lead captures" ON public.lead_captures
  FOR SELECT USING (is_admin());

CREATE POLICY "Anyone can submit lead captures" ON public.lead_captures
  FOR INSERT WITH CHECK (true);

-- RLS Policies for tags
CREATE POLICY "Admins can manage tags" ON public.tags
  FOR ALL USING (is_admin());

CREATE POLICY "Anyone can view tags" ON public.tags
  FOR SELECT USING (true);

-- RLS Policies for subscriber_tags
CREATE POLICY "Admins can manage subscriber tags" ON public.subscriber_tags
  FOR ALL USING (is_admin());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_drip_enrollments_campaign_id ON public.drip_enrollments(campaign_id);
CREATE INDEX IF NOT EXISTS idx_drip_enrollments_email ON public.drip_enrollments(email);
CREATE INDEX IF NOT EXISTS idx_segment_members_segment_id ON public.segment_members(segment_id);
CREATE INDEX IF NOT EXISTS idx_segment_members_email ON public.segment_members(email);
CREATE INDEX IF NOT EXISTS idx_campaign_analytics_campaign_id ON public.campaign_analytics(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_analytics_event_type ON public.campaign_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_lead_captures_form_id ON public.lead_captures(form_id);
CREATE INDEX IF NOT EXISTS idx_lead_captures_email ON public.lead_captures(email);
CREATE INDEX IF NOT EXISTS idx_subscriber_tags_tag_id ON public.subscriber_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_subscriber_tags_email ON public.subscriber_tags(email);

-- Create updated_at triggers
CREATE TRIGGER update_drip_campaigns_updated_at
  BEFORE UPDATE ON public.drip_campaigns
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_segments_updated_at
  BEFORE UPDATE ON public.segments
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_email_templates_updated_at
  BEFORE UPDATE ON public.email_templates
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_lead_capture_forms_updated_at
  BEFORE UPDATE ON public.lead_capture_forms
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();