
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PerformanceData {
  id: string;
  url: string;
  timestamp: string;
  core_web_vitals: {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
    fcp: number; // First Contentful Paint
    ttfb: number; // Time to First Byte
  };
  lighthouse_scores: {
    performance: number;
    accessibility: number;
    best_practices: number;
    seo: number;
  };
  page_insights: {
    load_time: number;
    page_size: number;
    requests_count: number;
    server_response_time: number;
  };
  mobile_performance: {
    speed_index: number;
    interactive_time: number;
    blocking_time: number;
  };
}

export interface RealTimeMetrics {
  active_users: number;
  current_sessions: number;
  bounce_rate: number;
  avg_session_duration: number;
  page_views_per_minute: number;
  server_uptime: number;
  cdn_cache_hit_rate: number;
  database_response_time: number;
}

export const usePerformanceMonitoring = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetrics>({
    active_users: 0,
    current_sessions: 0,
    bounce_rate: 0,
    avg_session_duration: 0,
    page_views_per_minute: 0,
    server_uptime: 99.9,
    cdn_cache_hit_rate: 95.2,
    database_response_time: 45
  });
  const [loading, setLoading] = useState(true);
  const [monitoring, setMonitoring] = useState(false);
  const { toast } = useToast();

  const fetchPerformanceData = async () => {
    try {
      const { data, error } = await supabase
        .from('performance_metrics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      const transformedData: PerformanceData[] = (data || []).map(item => ({
        id: item.id,
        url: item.url,
        timestamp: item.created_at,
        core_web_vitals: {
          lcp: item.largest_contentful_paint || 0,
          fid: item.first_input_delay || 0,
          cls: Number(item.cumulative_layout_shift) || 0,
          fcp: item.first_contentful_paint || 0,
          ttfb: item.time_to_first_byte || 0
        },
        lighthouse_scores: {
          performance: item.performance_score || 0,
          accessibility: item.accessibility_score || 0,
          best_practices: item.best_practices_score || 0,
          seo: item.seo_lighthouse_score || 0
        },
        page_insights: {
          load_time: item.speed_index || 0,
          page_size: 0,
          requests_count: 0,
          server_response_time: item.time_to_first_byte || 0
        },
        mobile_performance: {
          speed_index: item.speed_index || 0,
          interactive_time: item.total_blocking_time || 0,
          blocking_time: item.total_blocking_time || 0
        }
      }));

      setPerformanceData(transformedData);
    } catch (error: any) {
      console.error('Error fetching performance data:', error);
      toast({
        title: "Error loading performance data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const startRealTimeMonitoring = () => {
    setMonitoring(true);
    
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        ...prev,
        active_users: Math.floor(Math.random() * 500) + 50,
        current_sessions: Math.floor(Math.random() * 300) + 20,
        bounce_rate: Math.floor(Math.random() * 30) + 20,
        avg_session_duration: Math.floor(Math.random() * 300) + 120,
        page_views_per_minute: Math.floor(Math.random() * 50) + 10,
        database_response_time: Math.floor(Math.random() * 20) + 30
      }));
    }, 5000);

    return () => {
      clearInterval(interval);
      setMonitoring(false);
    };
  };

  const analyzePerformance = async (url: string) => {
    try {
      // Simulate performance analysis
      const analysis = {
        overall_score: Math.floor(Math.random() * 100),
        recommendations: [
          'Optimize images for better loading times',
          'Enable browser caching',
          'Minify CSS and JavaScript files',
          'Use a Content Delivery Network (CDN)'
        ],
        critical_issues: [
          'Large image files detected',
          'Render-blocking resources found'
        ],
        opportunities: [
          'Implement lazy loading',
          'Compress text-based resources'
        ]
      };

      return analysis;
    } catch (error) {
      console.error('Error analyzing performance:', error);
      return null;
    }
  };

  const generatePerformanceReport = async (timeRange: string) => {
    try {
      const filteredData = performanceData.filter(item => {
        const itemDate = new Date(item.timestamp);
        const now = new Date();
        const daysAgo = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
        const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
        return itemDate >= cutoffDate;
      });

      const report = {
        summary: {
          total_pages_analyzed: filteredData.length,
          avg_performance_score: filteredData.length > 0 
            ? filteredData.reduce((sum, item) => sum + item.lighthouse_scores.performance, 0) / filteredData.length
            : 0,
          avg_load_time: filteredData.length > 0
            ? filteredData.reduce((sum, item) => sum + item.page_insights.load_time, 0) / filteredData.length
            : 0,
          issues_found: Math.floor(Math.random() * 20) + 5
        },
        trends: {
          performance_trend: 'improving',
          load_time_trend: 'stable',
          mobile_score_trend: 'improving'
        },
        top_issues: [
          'Image optimization needed',
          'JavaScript blocking render',
          'CSS not minified'
        ]
      };

      return report;
    } catch (error) {
      console.error('Error generating performance report:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchPerformanceData();
    const cleanup = startRealTimeMonitoring();
    return cleanup;
  }, []);

  return {
    performanceData,
    realTimeMetrics,
    loading,
    monitoring,
    fetchPerformanceData,
    analyzePerformance,
    generatePerformanceReport,
    startRealTimeMonitoring
  };
};
