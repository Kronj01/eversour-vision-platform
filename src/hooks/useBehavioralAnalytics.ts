import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface HeatmapData {
  page_url: string;
  clicks: Array<{ x: number; y: number; count: number }>;
  moves: Array<{ x: number; y: number; intensity: number }>;
  scrollDepth: number[];
}

export interface SessionRecording {
  id: string;
  session_id: string;
  started_at: string;
  ended_at: string;
  duration: number;
  page_count: number;
  event_count: number;
  device_info: any;
}

export interface UserJourney {
  session_id: string;
  pages: Array<{
    url: string;
    timestamp: string;
    duration: number;
  }>;
  events: Array<{
    type: string;
    page_url: string;
    timestamp: string;
  }>;
}

export const useBehavioralAnalytics = () => {
  const [heatmapData, setHeatmapData] = useState<HeatmapData | null>(null);
  const [recordings, setRecordings] = useState<SessionRecording[]>([]);
  const [userJourney, setUserJourney] = useState<UserJourney | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchHeatmapData = async (pageUrl: string, deviceType: string = 'desktop') => {
    try {
      setLoading(true);

      const { data: heatmapEntries, error } = await supabase
        .from('heatmap_data')
        .select('*')
        .eq('page_url', pageUrl)
        .eq('device_type', deviceType)
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (error) throw error;

      // Process click data
      const clickMap: Record<string, { x: number; y: number; count: number }> = {};
      const moveData: Array<{ x: number; y: number; intensity: number }> = [];
      const scrollDepths: number[] = [];

      heatmapEntries?.forEach(entry => {
        if (entry.interaction_type === 'click' && entry.x_position && entry.y_position) {
          const key = `${entry.x_position},${entry.y_position}`;
          if (clickMap[key]) {
            clickMap[key].count++;
          } else {
            clickMap[key] = { x: entry.x_position, y: entry.y_position, count: 1 };
          }
        } else if (entry.interaction_type === 'scroll' && entry.scroll_depth) {
          scrollDepths.push(entry.scroll_depth);
        }
      });

      const clicks = Object.values(clickMap);

      setHeatmapData({
        page_url: pageUrl,
        clicks,
        moves: moveData,
        scrollDepth: scrollDepths
      });

    } catch (error: any) {
      console.error('Error fetching heatmap data:', error);
      toast({
        title: "Error loading heatmap data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSessionRecordings = async (limit: number = 50) => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('session_recordings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      setRecordings(data || []);

    } catch (error: any) {
      console.error('Error fetching session recordings:', error);
      toast({
        title: "Error loading session recordings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserJourney = async (sessionId: string) => {
    try {
      setLoading(true);

      // Get page views for this session
      const { data: pageViews, error: pageViewsError } = await supabase
        .from('page_views')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (pageViewsError) throw pageViewsError;

      // Get events for this session
      const { data: events, error: eventsError } = await supabase
        .from('user_events')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (eventsError) throw eventsError;

      const pages = pageViews?.map((pv, index, arr) => ({
        url: pv.page_url,
        timestamp: pv.created_at,
        duration: index < arr.length - 1 
          ? new Date(arr[index + 1].created_at).getTime() - new Date(pv.created_at).getTime()
          : pv.time_on_page || 0
      })) || [];

      const journeyEvents = events?.map(e => ({
        type: e.event_type,
        page_url: e.page_url,
        timestamp: e.created_at
      })) || [];

      setUserJourney({
        session_id: sessionId,
        pages,
        events: journeyEvents
      });

    } catch (error: any) {
      console.error('Error fetching user journey:', error);
      toast({
        title: "Error loading user journey",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const trackHeatmapEvent = async (
    pageUrl: string,
    interactionType: 'click' | 'move' | 'scroll',
    data: {
      x?: number;
      y?: number;
      scrollDepth?: number;
      elementSelector?: string;
      sessionId?: string;
    }
  ) => {
    try {
      const deviceType = /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent) 
        ? 'mobile' 
        : /Tablet|iPad/i.test(navigator.userAgent) 
        ? 'tablet' 
        : 'desktop';

      await supabase.from('heatmap_data').insert({
        page_url: pageUrl,
        device_type: deviceType,
        interaction_type: interactionType,
        x_position: data.x,
        y_position: data.y,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
        scroll_depth: data.scrollDepth,
        element_selector: data.elementSelector,
        session_id: data.sessionId
      });

    } catch (error: any) {
      console.error('Error tracking heatmap event:', error);
    }
  };

  return {
    heatmapData,
    recordings,
    userJourney,
    loading,
    fetchHeatmapData,
    fetchSessionRecordings,
    fetchUserJourney,
    trackHeatmapEvent
  };
};
