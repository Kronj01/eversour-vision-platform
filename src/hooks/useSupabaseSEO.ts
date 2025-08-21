import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SEOData {
  keyword_rankings: Array<{
    keyword: string;
    position: number;
    search_volume: number;
  }>;
  backlinks_count: number;
  domain_authority: number;
  page_speed_score: number;
}

export const useSupabaseSEO = () => {
  const [data, setData] = useState<SEOData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSEOData = async () => {
    try {
      setLoading(true);

      // Fetch keyword tracking data
      const { data: keywordData, error: keywordError } = await supabase
        .from('keyword_tracking')
        .select('keyword, current_position, search_volume')
        .order('search_volume', { ascending: false })
        .limit(10);

      if (keywordError) throw keywordError;

      // Fetch backlinks data
      const { data: backlinksData, error: backlinksError } = await supabase
        .from('backlinks')
        .select('*')
        .eq('status', 'active');

      if (backlinksError) throw backlinksError;

      // Fetch SEO metrics for domain authority and page speed
      const { data: metricsData, error: metricsError } = await supabase
        .from('seo_metrics')
        .select('domain_authority, page_speed_score')
        .order('created_at', { ascending: false })
        .limit(1);

      if (metricsError) throw metricsError;

      const keyword_rankings = (keywordData || []).map(item => ({
        keyword: item.keyword,
        position: item.current_position || 0,
        search_volume: item.search_volume || 0
      }));

      const backlinks_count = backlinksData?.length || 0;
      const domain_authority = metricsData?.[0]?.domain_authority || 0;
      const page_speed_score = metricsData?.[0]?.page_speed_score || 0;

      setData({
        keyword_rankings,
        backlinks_count,
        domain_authority,
        page_speed_score
      });
      setError(null);
    } catch (err: any) {
      console.error('SEO data error:', err);
      setError(err.message);
      // Don't show toast for expected errors (like empty tables)
      if (!err.message.includes('relation') && !err.message.includes('does not exist')) {
        toast({
          title: "Error fetching SEO data",
          description: err.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSEOData();
  }, []);

  return { data, loading, error, refetch: fetchSEOData };
};