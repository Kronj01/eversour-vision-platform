
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointer, 
  Clock, 
  Target,
  RefreshCw
} from 'lucide-react';
import { useBackendAnalytics } from '@/hooks/useBackendData';

const BackendAnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState('30d');
  const { data: analytics, loading, error } = useBackendAnalytics(timeframe);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Backend Analytics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-8 bg-gray-700 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-red-400 mb-4">Error loading analytics: {error}</p>
            <p className="text-gray-400 text-sm">
              Make sure your Python/FastAPI backend is running and accessible at the configured URL.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const metrics = [
    {
      title: 'Page Views',
      value: analytics?.page_views || 0,
      icon: BarChart3,
      color: 'text-blue-400',
      bgColor: 'bg-blue-600/20'
    },
    {
      title: 'Unique Visitors',
      value: analytics?.unique_visitors || 0,
      icon: Users,
      color: 'text-green-400',
      bgColor: 'bg-green-600/20'
    },
    {
      title: 'Bounce Rate',
      value: `${analytics?.bounce_rate || 0}%`,
      icon: MousePointer,
      color: 'text-orange-400',
      bgColor: 'bg-orange-600/20'
    },
    {
      title: 'Avg Session',
      value: `${Math.round((analytics?.avg_session_duration || 0) / 60)}m`,
      icon: Clock,
      color: 'text-purple-400',
      bgColor: 'bg-purple-600/20'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Backend Analytics</h2>
        <div className="flex items-center space-x-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="border-gray-700">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{metric.title}</p>
                  <p className={`text-2xl font-bold ${metric.color} mt-1`}>
                    {metric.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Top Pages</CardTitle>
            <CardDescription className="text-gray-400">
              Most visited pages in the selected timeframe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics?.top_pages?.map((page: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{page.url}</p>
                    <p className="text-gray-400 text-sm">{page.views} views</p>
                  </div>
                  <div className="text-right">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                </div>
              )) || (
                <p className="text-gray-400 text-center py-4">No data available</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Traffic Sources</CardTitle>
            <CardDescription className="text-gray-400">
              Where your visitors are coming from
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics?.traffic_sources?.map((source: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{source.source}</p>
                    <p className="text-gray-400 text-sm">{source.visitors} visitors</p>
                  </div>
                  <div className="text-right">
                    <Target className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              )) || (
                <p className="text-gray-400 text-center py-4">No data available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BackendAnalyticsDashboard;
