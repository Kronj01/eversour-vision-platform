import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsData {
  page_views: number;
  unique_visitors: number;
  bounce_rate: number;
  conversion_rate: number;
  top_pages: Array<{ url: string; views: number }>;
}

export const useSupabaseAnalytics = (timeframe: string = '30d') => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        
        // Calculate date range
        const days = parseInt(timeframe.replace('d', ''));
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        // Fetch page views
        const { data: pageViews, error: pageViewsError } = await supabase
          .from('page_views')
          .select('*')
          .gte('created_at', startDate.toISOString());

        if (pageViewsError) throw pageViewsError;

        // Fetch unique sessions
        const { data: sessions, error: sessionsError } = await supabase
          .from('visitor_sessions')
          .select('session_id')
          .gte('started_at', startDate.toISOString());

        if (sessionsError) throw sessionsError;

        // Calculate metrics
        const totalPageViews = pageViews?.length || 0;
        const uniqueVisitors = new Set(sessions?.map(s => s.session_id)).size;
        
        // Calculate top pages
        const pageUrlCounts = pageViews?.reduce((acc: Record<string, number>, view) => {
          acc[view.page_url] = (acc[view.page_url] || 0) + 1;
          return acc;
        }, {}) || {};

        const topPages = Object.entries(pageUrlCounts)
          .map(([url, views]) => ({ url, views: views as number }))
          .sort((a, b) => b.views - a.views)
          .slice(0, 10);

        // Calculate bounce rate (sessions with only 1 page view)
        const sessionPageCounts = pageViews?.reduce((acc: Record<string, number>, view) => {
          acc[view.session_id] = (acc[view.session_id] || 0) + 1;
          return acc;
        }, {}) || {};

        const totalSessions = Object.keys(sessionPageCounts).length;
        const bouncedSessions = Object.values(sessionPageCounts).filter(count => count === 1).length;
        const bounceRate = totalSessions > 0 ? (bouncedSessions / totalSessions) * 100 : 0;

        // Get conversions for conversion rate
        const { data: conversions } = await supabase
          .from('conversions')
          .select('*')
          .gte('created_at', startDate.toISOString());

        const conversionRate = totalSessions > 0 ? ((conversions?.length || 0) / totalSessions) * 100 : 0;

        setData({
          page_views: totalPageViews,
          unique_visitors: uniqueVisitors,
          bounce_rate: Math.round(bounceRate * 100) / 100,
          conversion_rate: Math.round(conversionRate * 100) / 100,
          top_pages: topPages
        });
        setError(null);
      } catch (err: any) {
        console.error('Analytics error:', err);
        setError(err.message);
        // Don't show toast for expected errors (like empty tables)
        if (!err.message.includes('relation') && !err.message.includes('does not exist')) {
          toast({
            title: "Error fetching analytics",
            description: err.message,
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeframe, toast]);

  return { data, loading, error };
};