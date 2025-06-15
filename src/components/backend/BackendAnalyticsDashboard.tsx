
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe,
  Activity,
  AlertCircle
} from 'lucide-react';
import { useBackendAnalytics } from '@/hooks/useBackendData';

const BackendAnalyticsDashboard = () => {
  const { data: analytics, loading, error } = useBackendAnalytics();

  if (loading) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
            Backend Analytics
          </CardTitle>
          <CardDescription className="text-gray-400">
            Analytics data from Python/FastAPI backend
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-2">Failed to connect to backend</p>
            <p className="text-gray-500 text-sm">
              Make sure your Python/FastAPI backend is running and accessible
            </p>
            <Badge variant="destructive" className="mt-4">
              {error}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Backend Analytics Overview
          </CardTitle>
          <CardDescription className="text-gray-400">
            Real-time analytics from Python/FastAPI backend
          </CardDescription>
        </CardHeader>
        <CardContent>
          {analytics ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card text-center">
                <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{analytics.page_views?.toLocaleString() || 'N/A'}</p>
                <p className="text-sm text-gray-400">Page Views</p>
              </div>
              <div className="glass-card text-center">
                <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{analytics.unique_visitors?.toLocaleString() || 'N/A'}</p>
                <p className="text-sm text-gray-400">Unique Visitors</p>
              </div>
              <div className="glass-card text-center">
                <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{analytics.conversion_rate ? `${analytics.conversion_rate}%` : 'N/A'}</p>
                <p className="text-sm text-gray-400">Conversion Rate</p>
              </div>
              <div className="glass-card text-center">
                <Activity className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{analytics.bounce_rate ? `${analytics.bounce_rate}%` : 'N/A'}</p>
                <p className="text-sm text-gray-400">Bounce Rate</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No analytics data available</p>
              <p className="text-gray-500 text-sm">Connect your backend to view analytics</p>
            </div>
          )}
        </CardContent>
      </Card>

      {analytics?.top_pages && analytics.top_pages.length > 0 && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics.top_pages.slice(0, 5).map((page, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                  <span className="text-gray-300">{page.url}</span>
                  <Badge variant="outline" className="text-purple-400 border-purple-400">
                    {page.views} views
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BackendAnalyticsDashboard;
