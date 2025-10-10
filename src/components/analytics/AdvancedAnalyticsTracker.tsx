import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsTrackerProps {
  enabled?: boolean;
}

export const AdvancedAnalyticsTracker = ({ enabled = true }: AnalyticsTrackerProps) => {
  const sessionIdRef = useRef<string>();
  const lastActivityRef = useRef<Date>(new Date());
  const pageViewStartRef = useRef<Date>(new Date());

  useEffect(() => {
    if (!enabled) return;

    // Generate or retrieve session ID
    const getSessionId = () => {
      let sessionId = sessionStorage.getItem('analytics_session_id');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('analytics_session_id', sessionId);
      }
      return sessionId;
    };

    sessionIdRef.current = getSessionId();

    // Detect device type
    const getDeviceType = () => {
      const ua = navigator.userAgent;
      if (/Mobile|Android|iPhone/i.test(ua)) return 'mobile';
      if (/Tablet|iPad/i.test(ua)) return 'tablet';
      return 'desktop';
    };

    // Initialize session
    const initSession = async () => {
      try {
        await supabase.from('visitor_sessions').insert({
          session_id: sessionIdRef.current,
          started_at: new Date().toISOString(),
          last_activity: new Date().toISOString(),
          device_type: getDeviceType(),
          browser: navigator.userAgent,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          is_active: true
        });
      } catch (error) {
        console.error('Error initializing session:', error);
      }
    };

    // Track page view
    const trackPageView = async () => {
      pageViewStartRef.current = new Date();
      try {
        await supabase.from('page_views').insert({
          session_id: sessionIdRef.current,
          page_url: window.location.pathname,
          page_title: document.title,
          created_at: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    // Update session activity
    const updateActivity = async () => {
      lastActivityRef.current = new Date();
      try {
        await supabase
          .from('visitor_sessions')
          .update({ 
            last_activity: new Date().toISOString(),
            is_active: true
          })
          .eq('session_id', sessionIdRef.current);
      } catch (error) {
        console.error('Error updating activity:', error);
      }
    };

    // Track click events
    const trackClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const elementSelector = target.tagName + (target.id ? `#${target.id}` : '') + 
        (target.className ? `.${target.className.split(' ').join('.')}` : '');

      try {
        // Track user event
        await supabase.from('user_events').insert({
          session_id: sessionIdRef.current,
          event_type: 'click',
          page_url: window.location.pathname,
          element_selector: elementSelector,
          event_data: {
            x: e.clientX,
            y: e.clientY,
            text: target.textContent?.substring(0, 100)
          }
        });

        // Track heatmap data
        await supabase.from('heatmap_data').insert({
          session_id: sessionIdRef.current,
          page_url: window.location.pathname,
          device_type: getDeviceType(),
          interaction_type: 'click',
          x_position: Math.round((e.clientX / window.innerWidth) * 1000),
          y_position: Math.round((e.clientY / window.innerHeight) * 1000),
          viewport_width: window.innerWidth,
          viewport_height: window.innerHeight,
          element_selector: elementSelector
        });
      } catch (error) {
        console.error('Error tracking click:', error);
      }

      updateActivity();
    };

    // Track scroll depth
    let scrollDepthTracked = new Set<number>();
    const trackScroll = async () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track at 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !scrollDepthTracked.has(milestone)) {
          scrollDepthTracked.add(milestone);
          
          try {
            await supabase.from('heatmap_data').insert({
              session_id: sessionIdRef.current,
              page_url: window.location.pathname,
              device_type: getDeviceType(),
              interaction_type: 'scroll',
              scroll_depth: milestone,
              viewport_width: window.innerWidth,
              viewport_height: window.innerHeight
            });

            await supabase.from('user_events').insert({
              session_id: sessionIdRef.current,
              event_type: 'scroll',
              page_url: window.location.pathname,
              event_data: { depth: milestone }
            });
          } catch (error) {
            console.error('Error tracking scroll:', error);
          }
        }
      }

      updateActivity();
    };

    // Track time on page before leaving
    const trackPageExit = async () => {
      const timeOnPage = Math.round((new Date().getTime() - pageViewStartRef.current.getTime()) / 1000);
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      try {
        await supabase
          .from('page_views')
          .update({ 
            time_on_page: timeOnPage,
            scroll_depth: scrollPercent,
            exit_page: true
          })
          .eq('session_id', sessionIdRef.current)
          .eq('page_url', window.location.pathname)
          .order('created_at', { ascending: false })
          .limit(1);

        await supabase
          .from('visitor_sessions')
          .update({ 
            is_active: false,
            total_time_spent: timeOnPage
          })
          .eq('session_id', sessionIdRef.current);
      } catch (error) {
        console.error('Error tracking page exit:', error);
      }
    };

    // Initialize tracking
    initSession();
    trackPageView();

    // Event listeners
    document.addEventListener('click', trackClick);
    window.addEventListener('scroll', trackScroll, { passive: true });
    window.addEventListener('beforeunload', trackPageExit);

    // Activity heartbeat (every 30 seconds)
    const heartbeatInterval = setInterval(updateActivity, 30000);

    // Cleanup
    return () => {
      document.removeEventListener('click', trackClick);
      window.removeEventListener('scroll', trackScroll);
      window.removeEventListener('beforeunload', trackPageExit);
      clearInterval(heartbeatInterval);
      trackPageExit();
    };
  }, [enabled]);

  return null;
};
