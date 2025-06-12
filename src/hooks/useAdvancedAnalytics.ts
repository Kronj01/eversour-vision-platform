
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AnalyticsEvent {
  id: string;
  user_id?: string;
  event_type: string;
  event_data: Record<string, any>;
  page_url?: string;
  user_agent?: string;
  ip_address?: string;
  session_id?: string;
  created_at: string;
}

export interface AnalyticsDashboard {
  totalEvents: number;
  todayEvents: number;
  weeklyEvents: number;
  monthlyEvents: number;
  topPages: Array<{ page: string; views: number }>;
  topEvents: Array<{ event: string; count: number }>;
  dailyTrend: Array<{ date: string; events: number }>;
  userAgents: Array<{ browser: string; count: number }>;
}

export const useAdvancedAnalytics = () => {
  const [dashboard, setDashboard] = useState<AnalyticsDashboard>({
    totalEvents: 0,
    todayEvents: 0,
    weeklyEvents: 0,
    monthlyEvents: 0,
    topPages: [],
    topEvents: [],
    dailyTrend: [],
    userAgents: []
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const trackEvent = async (
    eventType: string,
    eventData: Record<string, any> = {},
    pageUrl?: string
  ) => {
    try {
      const sessionId = localStorage.getItem('analytics_session_id') || 
                       Math.random().toString(36).substring(2, 15);
      
      if (!localStorage.getItem('analytics_session_id')) {
        localStorage.setItem('analytics_session_id', sessionId);
      }

      const { error } = await supabase
        .from('analytics_events')
        .insert({
          event_type: eventType,
          event_data: eventData,
          page_url: pageUrl || window.location.pathname,
          user_agent: navigator.userAgent,
          session_id: sessionId
        });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error tracking event:', error);
    }
  };

  const fetchDashboard = async () => {
    try {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Get total events
      const { count: totalEvents } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true });

      // Get today's events
      const { count: todayEvents } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

      // Get weekly events
      const { count: weeklyEvents } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekAgo.toISOString());

      // Get monthly events
      const { count: monthlyEvents } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', monthAgo.toISOString());

      // Get top pages
      const { data: pageViews } = await supabase
        .from('analytics_events')
        .select('page_url')
        .eq('event_type', 'page_view')
        .gte('created_at', monthAgo.toISOString());

      const topPages = pageViews?.reduce((acc: Record<string, number>, curr) => {
        const page = curr.page_url || 'Unknown';
        acc[page] = (acc[page] || 0) + 1;
        return acc;
      }, {});

      const topPagesArray = Object.entries(topPages || {})
        .map(([page, views]) => ({ page, views: views as number }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      // Get top events
      const { data: allEvents } = await supabase
        .from('analytics_events')
        .select('event_type')
        .gte('created_at', monthAgo.toISOString());

      const topEvents = allEvents?.reduce((acc: Record<string, number>, curr) => {
        acc[curr.event_type] = (acc[curr.event_type] || 0) + 1;
        return acc;
      }, {});

      const topEventsArray = Object.entries(topEvents || {})
        .map(([event, count]) => ({ event, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setDashboard({
        totalEvents: totalEvents || 0,
        todayEvents: todayEvents || 0,
        weeklyEvents: weeklyEvents || 0,
        monthlyEvents: monthlyEvents || 0,
        topPages: topPagesArray,
        topEvents: topEventsArray,
        dailyTrend: [], // Could be implemented with more complex query
        userAgents: []  // Could be implemented with user agent parsing
      });

    } catch (error: any) {
      console.error('Error fetching analytics dashboard:', error);
      toast({
        title: "Error loading analytics",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    dashboard,
    loading,
    trackEvent,
    fetchDashboard
  };
};
