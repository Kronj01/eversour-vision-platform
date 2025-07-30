import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AnonymousTracker = () => {
  const location = useLocation();
  const sessionRef = useRef<string | null>(null);
  const pageLoadTime = useRef<number>(Date.now());

  useEffect(() => {
    // Get or create session ID
    if (!sessionRef.current) {
      sessionRef.current = localStorage.getItem('analytics_session_id') || 
                          Math.random().toString(36).substring(2, 15);
      localStorage.setItem('analytics_session_id', sessionRef.current);
    }

    // Track page view
    const trackPageView = async () => {
      try {
        await supabase
          .from('analytics_events')
          .insert({
            event_type: 'page_view',
            event_data: {
              url: location.pathname,
              title: document.title,
              referrer: document.referrer
            },
            page_url: location.pathname,
            user_agent: navigator.userAgent,
            session_id: sessionRef.current
          });
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();
    pageLoadTime.current = Date.now();

    // Track clicks
    const trackClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      
      try {
        await supabase
          .from('analytics_events')
          .insert({
            event_type: 'click',
            event_data: {
              element: tagName,
              text: target.textContent?.slice(0, 100) || '',
              className: target.className,
              x: event.clientX,
              y: event.clientY
            },
            page_url: location.pathname,
            user_agent: navigator.userAgent,
            session_id: sessionRef.current
          });
      } catch (error) {
        console.error('Error tracking click:', error);
      }
    };

    // Track scroll depth
    const trackScroll = async () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > 0 && scrollPercent % 25 === 0) {
        try {
          await supabase
            .from('analytics_events')
            .insert({
              event_type: 'scroll',
              event_data: {
                depth: scrollPercent
              },
              page_url: location.pathname,
              user_agent: navigator.userAgent,
              session_id: sessionRef.current
            });
        } catch (error) {
          console.error('Error tracking scroll:', error);
        }
      }
    };

    // Track form submissions
    const trackFormSubmit = async (event: Event) => {
      const form = event.target as HTMLFormElement;
      
      try {
        await supabase
          .from('analytics_events')
          .insert({
            event_type: 'form_submit',
            event_data: {
              formId: form.id || 'unknown',
              action: form.action || 'unknown'
            },
            page_url: location.pathname,
            user_agent: navigator.userAgent,
            session_id: sessionRef.current
          });
      } catch (error) {
        console.error('Error tracking form submit:', error);
      }
    };

    // Add event listeners
    document.addEventListener('click', trackClick);
    window.addEventListener('scroll', trackScroll);
    document.addEventListener('submit', trackFormSubmit);

    // Track time on page when leaving
    const trackTimeOnPage = async () => {
      const timeOnPage = Math.round((Date.now() - pageLoadTime.current) / 1000);
      
      try {
        await supabase
          .from('analytics_events')
          .insert({
            event_type: 'time_on_page',
            event_data: {
              duration: timeOnPage
            },
            page_url: location.pathname,
            user_agent: navigator.userAgent,
            session_id: sessionRef.current
          });
      } catch (error) {
        console.error('Error tracking time on page:', error);
      }
    };

    window.addEventListener('beforeunload', trackTimeOnPage);

    // Cleanup
    return () => {
      document.removeEventListener('click', trackClick);
      window.removeEventListener('scroll', trackScroll);
      document.removeEventListener('submit', trackFormSubmit);
      window.removeEventListener('beforeunload', trackTimeOnPage);
    };
  }, [location.pathname]);

  return null;
};

export default AnonymousTracker;