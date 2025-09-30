-- Create pages table for dynamic content management
CREATE TABLE public.pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  meta_title TEXT,
  meta_description TEXT,
  featured_image TEXT,
  template TEXT DEFAULT 'default',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  parent_id UUID REFERENCES public.pages(id),
  sort_order INTEGER DEFAULT 0,
  custom_fields JSONB DEFAULT '{}',
  seo_settings JSONB DEFAULT '{}',
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'password')),
  password TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create media_files table for file management
CREATE TABLE public.media_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  description TEXT,
  file_type TEXT NOT NULL CHECK (file_type IN ('image', 'video', 'audio', 'document', 'other')),
  dimensions JSONB, -- {width, height} for images/videos
  metadata JSONB DEFAULT '{}',
  is_optimized BOOLEAN DEFAULT false,
  cdn_url TEXT,
  folder_path TEXT DEFAULT '/',
  uploaded_by UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menus table for navigation management
CREATE TABLE public.menus (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL, -- 'header', 'footer', 'sidebar', etc.
  items JSONB NOT NULL DEFAULT '[]', -- Array of menu items with structure
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create page_revisions table for version control
CREATE TABLE public.page_revisions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  custom_fields JSONB DEFAULT '{}',
  revision_note TEXT,
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create widgets table for reusable content blocks
CREATE TABLE public.widgets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'text', 'image', 'gallery', 'form', 'custom'
  content JSONB NOT NULL DEFAULT '{}',
  settings JSONB DEFAULT '{}',
  is_global BOOLEAN DEFAULT false, -- can be used across pages
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.widgets ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pages
CREATE POLICY "Anyone can view published pages" 
ON public.pages FOR SELECT 
USING (status = 'published' AND visibility = 'public');

CREATE POLICY "Admins can manage all pages" 
ON public.pages FOR ALL 
USING (is_admin());

CREATE POLICY "Authors can manage their own pages" 
ON public.pages FOR ALL 
USING (auth.uid() = author_id);

-- RLS Policies for media_files
CREATE POLICY "Anyone can view media files" 
ON public.media_files FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can upload media" 
ON public.media_files FOR INSERT 
WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can manage their own media" 
ON public.media_files FOR ALL 
USING (auth.uid() = uploaded_by OR is_admin());

-- RLS Policies for menus
CREATE POLICY "Anyone can view active menus" 
ON public.menus FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage menus" 
ON public.menus FOR ALL 
USING (is_admin());

-- RLS Policies for page_revisions
CREATE POLICY "Authors can view their page revisions" 
ON public.page_revisions FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.pages 
    WHERE pages.id = page_revisions.page_id 
    AND (pages.author_id = auth.uid() OR is_admin())
  )
);

CREATE POLICY "Authors can create revisions for their pages" 
ON public.page_revisions FOR INSERT 
WITH CHECK (
  auth.uid() = created_by AND
  EXISTS (
    SELECT 1 FROM public.pages 
    WHERE pages.id = page_revisions.page_id 
    AND (pages.author_id = auth.uid() OR is_admin())
  )
);

-- RLS Policies for widgets
CREATE POLICY "Anyone can view global widgets" 
ON public.widgets FOR SELECT 
USING (is_global = true);

CREATE POLICY "Users can view their own widgets" 
ON public.widgets FOR SELECT 
USING (auth.uid() = created_by OR is_admin());

CREATE POLICY "Users can manage their own widgets" 
ON public.widgets FOR ALL 
USING (auth.uid() = created_by OR is_admin());

-- Create indexes for better performance
CREATE INDEX idx_pages_slug ON public.pages(slug);
CREATE INDEX idx_pages_status ON public.pages(status);
CREATE INDEX idx_pages_author ON public.pages(author_id);
CREATE INDEX idx_pages_parent ON public.pages(parent_id);
CREATE INDEX idx_media_files_type ON public.media_files(file_type);
CREATE INDEX idx_media_files_folder ON public.media_files(folder_path);
CREATE INDEX idx_page_revisions_page ON public.page_revisions(page_id);

-- Create triggers for updated_at
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_media_files_updated_at
  BEFORE UPDATE ON public.media_files
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_widgets_updated_at
  BEFORE UPDATE ON public.widgets
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();