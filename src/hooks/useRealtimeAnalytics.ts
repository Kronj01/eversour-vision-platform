import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface RealtimeMetrics {
  activeUsers: number;
  pageViewsPerMinute: number;
  avgSessionDuration: number;
  bounceRate: number;
  topPages: Array<{ url: string; views: number }>;
  deviceBreakdown: { desktop: number; mobile: number; tablet: number };
  geographicData: Array<{ country: string; visitors: number }>;
  trafficSources: Array<{ source: string; count: number }>;
}

export interface SessionData {
  id: string;
  session_id: string;
  started_at: string;
  last_activity: string;
  total_page_views?: number | null;
  total_time_spent?: number | null;
  device_type?: string | null;
  country?: string | null;
  city?: string | null;
  browser?: string | null;
  os?: string | null;
  referrer?: string | null;
  user_id?: string | null;
  user_agent?: string | null;
  ip_address?: string | null;
  is_active?: boolean | null;
}

export const useRealtimeAnalytics = (refreshInterval: number = 5000) => {
  const [metrics, setMetrics] = useState<RealtimeMetrics>({
    activeUsers: 0,
    pageViewsPerMinute: 0,
    avgSessionDuration: 0,
    bounceRate: 0,
    topPages: [],
    deviceBreakdown: { desktop: 0, mobile: 0, tablet: 0 },
    geographicData: [],
    trafficSources: []
  });
  const [activeSessions, setActiveSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRealtimeMetrics = async () => {
    try {
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60000);
      const oneHourAgo = new Date(now.getTime() - 60 * 60000);

      // Get active sessions (last 5 minutes)
      const { data: sessions, error: sessionsError } = await supabase
        .from('visitor_sessions')
        .select('*')
        .gte('last_activity', fiveMinutesAgo.toISOString())
        .order('last_activity', { ascending: false });

      if (sessionsError) throw sessionsError;

      // Get page views in last hour
      const { data: pageViews, error: pageViewsError } = await supabase
        .from('page_views')
        .select('*')
        .gte('created_at', oneHourAgo.toISOString());

      if (pageViewsError) throw pageViewsError;

      // Calculate metrics
      const activeUsers = sessions?.length || 0;
      const pageViewsPerMinute = Math.round((pageViews?.length || 0) / 60);
      
      const avgSessionDuration = sessions?.length 
        ? Math.round(sessions.reduce((sum, s) => sum + (s.total_time_spent || 0), 0) / sessions.length)
        : 0;

      // Calculate bounce rate from sessions with only 1 page view
      const bounceRate = sessions?.length
        ? Math.round((sessions.filter(s => (s.total_page_views || 0) <= 1).length / sessions.length) * 100)
        : 0;

      // Top pages
      const pageUrlCounts = pageViews?.reduce((acc: Record<string, number>, view) => {
        acc[view.page_url] = (acc[view.page_url] || 0) + 1;
        return acc;
      }, {}) || {};

      const topPages = Object.entries(pageUrlCounts)
        .map(([url, views]) => ({ url, views: views as number }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      // Device breakdown
      const deviceBreakdown = sessions?.reduce((acc, s) => {
        const type = (s.device_type || 'desktop').toLowerCase();
        if (type.includes('mobile')) acc.mobile++;
        else if (type.includes('tablet')) acc.tablet++;
        else acc.desktop++;
        return acc;
      }, { desktop: 0, mobile: 0, tablet: 0 }) || { desktop: 0, mobile: 0, tablet: 0 };

      // Geographic data
      const countryData = sessions?.reduce((acc: Record<string, number>, s) => {
        if (s.country) {
          acc[s.country] = (acc[s.country] || 0) + 1;
        }
        return acc;
      }, {}) || {};

      const geographicData = Object.entries(countryData)
        .map(([country, visitors]) => ({ country, visitors: visitors as number }))
        .sort((a, b) => b.visitors - a.visitors)
        .slice(0, 10);

      // Traffic sources
      const referrerData = sessions?.reduce((acc: Record<string, number>, s) => {
        const source = s.referrer ? new URL(s.referrer).hostname : 'direct';
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {}) || {};

      const trafficSources = Object.entries(referrerData)
        .map(([source, count]) => ({ source, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setMetrics({
        activeUsers,
        pageViewsPerMinute,
        avgSessionDuration,
        bounceRate,
        topPages,
        deviceBreakdown,
        geographicData,
        trafficSources
      });

      setActiveSessions(sessions || []);
      setLoading(false);

    } catch (error: any) {
      console.error('Error fetching realtime metrics:', error);
      toast({
        title: "Error loading realtime metrics",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchRealtimeMetrics();
    const interval = setInterval(fetchRealtimeMetrics, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return {
    metrics,
    activeSessions,
    loading,
    refresh: fetchRealtimeMetrics
  };
};
