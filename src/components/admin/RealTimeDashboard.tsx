import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { Eye, Users, Clock, TrendingUp, MousePointer, FormInput, Target, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RealTimeMetrics {
  activeUsers: number;
  pageViews: number;
  avgTimeOnPage: number;
  topPages: Array<{ url: string; views: number }>;
  recentEvents: Array<{
    id: string;
    event_type: string;
    page_url: string;
    created_at: string;
  }>;
  conversions: number;
  bounceRate: number;
}

const RealTimeDashboard = () => {
  const [metrics, setMetrics] = useState<RealTimeMetrics>({
    activeUsers: 0,
    pageViews: 0,
    avgTimeOnPage: 0,
    topPages: [],
    recentEvents: [],
    conversions: 0,
    bounceRate: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRealTimeMetrics = async () => {
    try {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

      // Get active users (unique sessions in last hour)
      const { data: sessionsData } = await supabase
        .from('analytics_events')
        .select('session_id')
        .gte('created_at', oneHourAgo.toISOString());

      const activeUsers = new Set(sessionsData?.map(s => s.session_id) || []).size;

      // Get page views in last hour
      const { count: pageViews } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'page_view')
        .gte('created_at', oneHourAgo.toISOString());

      // Get top pages in last hour
      const { data: pageViewsData } = await supabase
        .from('analytics_events')
        .select('page_url')
        .eq('event_type', 'page_view')
        .gte('created_at', oneHourAgo.toISOString());

      const topPages = pageViewsData?.reduce((acc: Record<string, number>, curr) => {
        acc[curr.page_url] = (acc[curr.page_url] || 0) + 1;
        return acc;
      }, {});

      const topPagesArray = Object.entries(topPages || {})
        .map(([url, views]) => ({ url, views: views as number }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      // Get recent events
      const { data: recentEvents } = await supabase
        .from('analytics_events')
        .select('id, event_type, page_url, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

      // Get conversions in last hour (form submissions)
      const { count: conversions } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'form_submit')
        .gte('created_at', oneHourAgo.toISOString());

      // Calculate average time on page
      const { data: avgTimeData } = await supabase
        .from('analytics_events')
        .select('event_data')
        .eq('event_type', 'time_on_page')
        .gte('created_at', oneHourAgo.toISOString());

      const avgTimeOnPage = avgTimeData?.length 
        ? avgTimeData.reduce((sum, item) => {
            const duration = (item.event_data as any)?.duration || 0;
            return sum + duration;
          }, 0) / avgTimeData.length
        : 0;

      // Calculate bounce rate (sessions with only one event)
      const { data: sessionEvents } = await supabase
        .from('analytics_events')
        .select('session_id')
        .gte('created_at', oneHourAgo.toISOString());

      const sessionCounts = sessionEvents?.reduce((acc: Record<string, number>, curr) => {
        acc[curr.session_id] = (acc[curr.session_id] || 0) + 1;
        return acc;
      }, {});

      const totalSessions = Object.keys(sessionCounts || {}).length;
      const bouncedSessions = Object.values(sessionCounts || {}).filter(count => count === 1).length;
      const bounceRate = totalSessions ? (bouncedSessions / totalSessions) * 100 : 0;

      setMetrics({
        activeUsers,
        pageViews: pageViews || 0,
        avgTimeOnPage: Math.round(avgTimeOnPage),
        topPages: topPagesArray,
        recentEvents: recentEvents || [],
        conversions: conversions || 0,
        bounceRate: Math.round(bounceRate)
      });

    } catch (error: any) {
      console.error('Error fetching real-time metrics:', error);
      toast({
        title: "Error loading metrics",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealTimeMetrics();
    
    // Set up real-time subscription for new events
    const eventsChannel = supabase
      .channel('realtime-events')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'analytics_events' },
        () => fetchRealTimeMetrics()
      )
      .subscribe();

    // Refresh every 30 seconds
    const interval = setInterval(fetchRealTimeMetrics, 30000);

    return () => {
      supabase.removeChannel(eventsChannel);
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Real-Time Analytics</h2>
        <Badge variant="secondary" className="animate-pulse">
          Live
        </Badge>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{metrics.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Online now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{metrics.pageViews}</div>
            <p className="text-xs text-muted-foreground">Last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{metrics.avgTimeOnPage}s</div>
            <p className="text-xs text-muted-foreground">Time on page</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{metrics.conversions}</div>
            <p className="text-xs text-muted-foreground">Last hour</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Live Activity</TabsTrigger>
          <TabsTrigger value="pages">Top Pages</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent User Events</CardTitle>
              <CardDescription>Live feed of user interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {metrics.recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center space-x-2">
                      {event.event_type === 'click' && <MousePointer className="h-4 w-4 text-blue-500" />}
                      {event.event_type === 'form_submit' && <FormInput className="h-4 w-4 text-green-500" />}
                      {event.event_type === 'page_view' && <Eye className="h-4 w-4 text-purple-500" />}
                      {event.event_type === 'cta_click' && <Zap className="h-4 w-4 text-orange-500" />}
                      <div>
                        <p className="text-sm font-medium">{event.event_type.replace('_', ' ').toUpperCase()}</p>
                        <p className="text-xs text-muted-foreground">{event.page_url}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
                {metrics.recentEvents.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">No recent events</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages (Last Hour)</CardTitle>
              <CardDescription>Most visited pages in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {metrics.topPages.map((page, index) => (
                  <div key={page.url} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <span className="text-sm font-medium truncate max-w-xs">{page.url}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{page.views} views</span>
                      <Progress 
                        value={(page.views / (metrics.topPages[0]?.views || 1)) * 100} 
                        className="w-20" 
                      />
                    </div>
                  </div>
                ))}
                {metrics.topPages.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">No page data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Bounce Rate</CardTitle>
                <CardDescription>Percentage of single-page visits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">{metrics.bounceRate}%</div>
                <Progress value={metrics.bounceRate} className="w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement</CardTitle>
                <CardDescription>User interaction metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Page Views</span>
                    <span className="font-medium">{metrics.pageViews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Active Users</span>
                    <span className="font-medium">{metrics.activeUsers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Conversions</span>
                    <span className="font-medium">{metrics.conversions}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealTimeDashboard;