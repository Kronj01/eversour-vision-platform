import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SEOAuditResult {
  url: string;
  seo_score: number;
  page_speed_score: number;
  mobile_friendly: boolean;
  https_enabled: boolean;
  meta_title?: string;
  meta_description?: string;
  h1_count: number;
  h2_count: number;
  image_count: number;
  alt_text_missing: number;
  internal_links: number;
  external_links: number;
  page_size_kb: number;
  load_time_ms: number;
}

export const useSEOAutomation = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const runSEOAudit = async (url: string): Promise<SEOAuditResult | null> => {
    try {
      setLoading(true);

      const { data, error } = await supabase.functions.invoke('seo-automation', {
        body: {
          action: 'audit',
          url
        }
      });

      if (error) throw error;

      toast({
        title: "SEO audit completed",
        description: `Score: ${data.audit.seo_score}/100`,
      });

      return data.audit;
    } catch (error: any) {
      console.error('SEO audit error:', error);
      toast({
        title: "SEO audit failed",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const trackKeyword = async (keyword: string, url: string): Promise<boolean> => {
    try {
      setLoading(true);

      const { error } = await supabase.functions.invoke('seo-automation', {
        body: {
          action: 'track_keyword',
          keyword,
          url
        }
      });

      if (error) throw error;

      toast({
        title: "Keyword tracking added",
        description: `Now tracking "${keyword}" for ${url}`,
      });

      return true;
    } catch (error: any) {
      console.error('Keyword tracking error:', error);
      toast({
        title: "Failed to add keyword tracking",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const generateSitemap = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase.functions.invoke('seo-automation', {
        body: {
          action: 'generate_sitemap'
        }
      });

      if (error) throw error;

      toast({
        title: "Sitemap generated",
        description: `${data.sitemap.total_urls} URLs included`,
      });

      return data.sitemap;
    } catch (error: any) {
      console.error('Sitemap generation error:', error);
      toast({
        title: "Sitemap generation failed",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    runSEOAudit,
    trackKeyword,
    generateSitemap,
    loading
  };
};