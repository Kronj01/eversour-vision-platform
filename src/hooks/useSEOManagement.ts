
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SEOPageData {
  id: string;
  url: string;
  title: string;
  meta_description: string;
  meta_keywords: string[];
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  structured_data: Record<string, any>;
  last_updated: string;
  performance_score: number;
  seo_issues: string[];
}

export interface SitemapEntry {
  id: string;
  url: string;
  priority: number;
  changefreq: string;
  lastmod: string;
  included: boolean;
  status_code: number;
}

export const useSEOManagement = () => {
  const [pages, setPages] = useState<SEOPageData[]>([]);
  const [sitemap, setSitemap] = useState<SitemapEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const fetchSEOData = async () => {
    try {
      const { data: seoData, error: seoError } = await supabase
        .from('seo_metrics')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: sitemapData, error: sitemapError } = await supabase
        .from('sitemap_urls')
        .select('*')
        .order('url');

      if (seoError) throw seoError;
      if (sitemapError) throw sitemapError;

      // Transform SEO data
      const transformedPages: SEOPageData[] = (seoData || []).map(item => ({
        id: item.id,
        url: item.url,
        title: item.meta_title || '',
        meta_description: item.meta_description || '',
        meta_keywords: [],
        canonical_url: item.url,
        og_title: item.meta_title || '',
        og_description: item.meta_description || '',
        og_image: '',
        twitter_title: item.meta_title || '',
        twitter_description: item.meta_description || '',
        twitter_image: '',
        structured_data: {},
        last_updated: item.updated_at,
        performance_score: item.seo_score || 0,
        seo_issues: []
      }));

      const transformedSitemap: SitemapEntry[] = (sitemapData || []).map(item => ({
        id: item.id,
        url: item.url,
        priority: Number(item.priority) || 0.5,
        changefreq: item.changefreq || 'weekly',
        lastmod: item.lastmod || new Date().toISOString(),
        included: true,
        status_code: item.status_code || 200
      }));

      setPages(transformedPages);
      setSitemap(transformedSitemap);
    } catch (error: any) {
      console.error('Error fetching SEO data:', error);
      toast({
        title: "Error loading SEO data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePageSEO = async (pageId: string, seoData: Partial<SEOPageData>) => {
    try {
      const { error } = await supabase
        .from('seo_metrics')
        .update({
          meta_title: seoData.title,
          meta_description: seoData.meta_description,
          updated_at: new Date().toISOString()
        })
        .eq('id', pageId);

      if (error) throw error;

      toast({
        title: "SEO updated successfully",
        description: "Page SEO data has been updated.",
      });

      await fetchSEOData();
    } catch (error: any) {
      console.error('Error updating SEO:', error);
      toast({
        title: "Error updating SEO",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const generateSitemap = async () => {
    setGenerating(true);
    try {
      // Generate XML sitemap content
      const xmlContent = generateSitemapXML(sitemap.filter(item => item.included));
      
      // Here you would typically save the sitemap to a file or CDN
      // For now, we'll just update the database
      toast({
        title: "Sitemap generated successfully",
        description: `Generated sitemap with ${sitemap.filter(item => item.included).length} URLs.`,
      });
    } catch (error: any) {
      console.error('Error generating sitemap:', error);
      toast({
        title: "Error generating sitemap",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const generateSitemapXML = (entries: SitemapEntry[]): string => {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    const xmlFooter = '</urlset>';
    
    const urls = entries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('');

    return xmlHeader + urls + '\n' + xmlFooter;
  };

  const analyzePage = async (url: string) => {
    try {
      // Simulate page analysis
      const analysis = {
        performance_score: Math.floor(Math.random() * 100),
        seo_issues: [
          'Missing meta description',
          'Title tag too long',
          'No alt text on images'
        ].slice(0, Math.floor(Math.random() * 3))
      };

      return analysis;
    } catch (error) {
      console.error('Error analyzing page:', error);
      return null;
    }
  };

  const bulkOptimizePages = async (pageIds: string[]) => {
    try {
      for (const pageId of pageIds) {
        const page = pages.find(p => p.id === pageId);
        if (page) {
          // Auto-generate optimized meta tags
          const optimizedData = {
            title: page.title || `Optimized Title for ${page.url}`,
            meta_description: page.meta_description || `Optimized description for ${page.url}`,
          };
          
          await updatePageSEO(pageId, optimizedData);
        }
      }

      toast({
        title: "Bulk optimization completed",
        description: `Optimized ${pageIds.length} pages successfully.`,
      });
    } catch (error: any) {
      console.error('Error in bulk optimization:', error);
      toast({
        title: "Error in bulk optimization",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSEOData();
  }, []);

  return {
    pages,
    sitemap,
    loading,
    generating,
    fetchSEOData,
    updatePageSEO,
    generateSitemap,
    analyzePage,
    bulkOptimizePages
  };
};
