import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PerformanceTrackerProps {
  enabled?: boolean;
}

export const PerformanceTracker = ({ enabled = true }: PerformanceTrackerProps) => {
  useEffect(() => {
    if (!enabled) return;

    const trackPerformance = async () => {
      // Wait for page to load
      if (document.readyState !== 'complete') {
        window.addEventListener('load', trackPerformance);
        return;
      }

      try {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paintMetrics = performance.getEntriesByType('paint');
        
        const fcp = paintMetrics.find(m => m.name === 'first-contentful-paint');
        const lcp = await new Promise<number>((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            resolve(lastEntry?.renderTime || lastEntry?.loadTime || 0);
          }).observe({ entryTypes: ['largest-contentful-paint'] });
          
          setTimeout(() => resolve(0), 5000);
        });

        const deviceType = /Mobile|Android|iPhone/i.test(navigator.userAgent) 
          ? 'mobile' 
          : /Tablet|iPad/i.test(navigator.userAgent) 
          ? 'tablet' 
          : 'desktop';

        // Track performance snapshot
        await supabase.from('performance_snapshots').insert({
          url: window.location.pathname,
          device_type: deviceType,
          ttfb: Math.round(perfData.responseStart - perfData.requestStart),
          fcp: Math.round(fcp?.startTime || 0),
          lcp: Math.round(lcp),
          tti: Math.round(perfData.domInteractive),
          cls: 0, // Would need Layout Shift API
          resource_count: performance.getEntriesByType('resource').length,
          resource_size_kb: Math.round(
            performance.getEntriesByType('resource')
              .reduce((acc: number, r: any) => acc + (r.transferSize || 0), 0) / 1024
          )
        });

        // Track performance metrics (legacy table)
        await supabase.from('performance_metrics').insert({
          url: window.location.pathname,
          device_type: deviceType,
          time_to_first_byte: Math.round(perfData.responseStart - perfData.requestStart),
          first_contentful_paint: Math.round(fcp?.startTime || 0),
          largest_contentful_paint: Math.round(lcp),
          performance_score: 0 // Would be calculated based on metrics
        });

      } catch (error) {
        console.error('Error tracking performance:', error);
      }
    };

    if (document.readyState === 'complete') {
      trackPerformance();
    } else {
      window.addEventListener('load', trackPerformance);
    }

    return () => {
      window.removeEventListener('load', trackPerformance);
    };
  }, [enabled]);

  return null;
};
