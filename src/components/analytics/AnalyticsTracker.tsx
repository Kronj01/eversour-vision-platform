
import React, { useEffect } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customDimensions?: Record<string, string>;
}

interface PageView {
  path: string;
  title: string;
  referrer?: string;
  userAgent?: string;
  timestamp: number;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private pageViews: PageView[] = [];
  private sessionStart: number = Date.now();
  private userId: string;

  constructor() {
    this.userId = this.getOrCreateUserId();
    this.initializeSession();
  }

  private getOrCreateUserId(): string {
    let userId = localStorage.getItem('eversour_user_id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('eversour_user_id', userId);
    }
    return userId;
  }

  private initializeSession() {
    // Track session start
    this.trackEvent({
      action: 'session_start',
      category: 'engagement',
      customDimensions: {
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackEvent({
          action: 'page_hidden',
          category: 'engagement',
          value: Date.now() - this.sessionStart
        });
      } else {
        this.trackEvent({
          action: 'page_visible',
          category: 'engagement'
        });
      }
    });

    // Track beforeunload for session duration
    window.addEventListener('beforeunload', () => {
      this.trackEvent({
        action: 'session_end',
        category: 'engagement',
        value: Date.now() - this.sessionStart
      });
      this.flush();
    });
  }

  trackPageView(path: string, title: string) {
    const pageView: PageView = {
      path,
      title,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: Date.now()
    };

    this.pageViews.push(pageView);
    
    // Also track as event
    this.trackEvent({
      action: 'page_view',
      category: 'navigation',
      label: path,
      customDimensions: {
        page_title: title,
        referrer: document.referrer
      }
    });

    console.log('📊 Page View:', pageView);
  }

  trackEvent(event: AnalyticsEvent) {
    const enrichedEvent = {
      ...event,
      timestamp: Date.now(),
      userId: this.userId,
      sessionId: this.sessionStart.toString(),
      path: window.location.pathname,
      ...event.customDimensions
    };

    this.events.push(enrichedEvent);
    console.log('📈 Event Tracked:', enrichedEvent);

    // Auto-flush events periodically
    if (this.events.length >= 10) {
      this.flush();
    }
  }

  trackClick(element: string, category: string = 'interaction') {
    this.trackEvent({
      action: 'click',
      category,
      label: element
    });
  }

  trackFormSubmission(formName: string, success: boolean = true) {
    this.trackEvent({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'conversion',
      label: formName
    });
  }

  trackDownload(fileName: string, fileType: string) {
    this.trackEvent({
      action: 'download',
      category: 'engagement',
      label: fileName,
      customDimensions: {
        file_type: fileType
      }
    });
  }

  trackScroll(percentage: number) {
    const milestones = [25, 50, 75, 90, 100];
    const milestone = milestones.find(m => percentage >= m && percentage < m + 5);
    
    if (milestone) {
      this.trackEvent({
        action: 'scroll',
        category: 'engagement',
        label: `${milestone}%`,
        value: milestone
      });
    }
  }

  trackTimeOnPage(seconds: number) {
    const milestones = [30, 60, 120, 300]; // 30s, 1m, 2m, 5m
    const milestone = milestones.find(m => seconds >= m && seconds < m + 5);
    
    if (milestone) {
      this.trackEvent({
        action: 'time_on_page',
        category: 'engagement',
        label: `${milestone}s`,
        value: milestone
      });
    }
  }

  flush() {
    if (this.events.length > 0 || this.pageViews.length > 0) {
      // In a real implementation, send to your analytics endpoint
      console.log('🚀 Flushing Analytics Data:', {
        events: this.events,
        pageViews: this.pageViews
      });

      // Store in localStorage as fallback
      const analyticsData = {
        events: this.events,
        pageViews: this.pageViews,
        timestamp: Date.now()
      };
      
      localStorage.setItem('eversour_analytics_buffer', JSON.stringify(analyticsData));

      // Clear buffers
      this.events = [];
      this.pageViews = [];
    }
  }

  getStoredAnalytics() {
    const stored = localStorage.getItem('eversour_analytics_buffer');
    return stored ? JSON.parse(stored) : null;
  }
}

// Global analytics instance
const analytics = new AnalyticsService();

interface AnalyticsTrackerProps {
  children: React.ReactNode;
}

const AnalyticsTracker: React.FC<AnalyticsTrackerProps> = ({ children }) => {
  useEffect(() => {
    // Track initial page view
    analytics.trackPageView(window.location.pathname, document.title);

    // Set up scroll tracking
    let timeOnPage = 0;
    const startTime = Date.now();
    
    const scrollHandler = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      analytics.trackScroll(scrolled);
    };

    const timeTracker = setInterval(() => {
      timeOnPage += 1;
      analytics.trackTimeOnPage(timeOnPage);
    }, 1000);

    // Add event listeners
    window.addEventListener('scroll', scrollHandler, { passive: true });

    // Track clicks on important elements
    const trackableElements = document.querySelectorAll(
      'a[href], button, [data-track]'
    );
    
    trackableElements.forEach(element => {
      element.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const trackLabel = target.getAttribute('data-track') || 
                          target.textContent?.trim() || 
                          target.getAttribute('aria-label') ||
                          'unknown';
        
        analytics.trackClick(trackLabel);
      });
    });

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      clearInterval(timeTracker);
      
      // Track final time on page
      const finalTimeOnPage = Math.floor((Date.now() - startTime) / 1000);
      analytics.trackTimeOnPage(finalTimeOnPage);
    };
  }, []);

  return <>{children}</>;
};

// Hook for components to use analytics
export const useAnalytics = () => {
  return {
    trackEvent: (event: AnalyticsEvent) => analytics.trackEvent(event),
    trackClick: (element: string, category?: string) => analytics.trackClick(element, category),
    trackFormSubmission: (formName: string, success?: boolean) => analytics.trackFormSubmission(formName, success),
    trackDownload: (fileName: string, fileType: string) => analytics.trackDownload(fileName, fileType),
    trackPageView: (path: string, title: string) => analytics.trackPageView(path, title),
    getStoredAnalytics: () => analytics.getStoredAnalytics()
  };
};

export { AnalyticsTracker };
export default analytics;
