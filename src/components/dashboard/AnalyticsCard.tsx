
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, AlertCircle } from 'lucide-react';
import { useAnalytics } from '@/hooks/api/useAnalytics';

const AnalyticsCard = () => {
  const { data, loading, error } = useAnalytics();

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
            Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-2">Failed to load analytics</p>
            <Badge variant="destructive" className="mt-4">{error}</Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Analytics Overview
        </CardTitle>
        <CardDescription className="text-gray-400">
          Key metrics and insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{data.page_views?.toLocaleString() || 'N/A'}</p>
              <p className="text-sm text-gray-400">Page Views</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{data.unique_visitors?.toLocaleString() || 'N/A'}</p>
              <p className="text-sm text-gray-400">Visitors</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{data.conversion_rate ? `${data.conversion_rate}%` : 'N/A'}</p>
              <p className="text-sm text-gray-400">Conversion</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{data.bounce_rate ? `${data.bounce_rate}%` : 'N/A'}</p>
              <p className="text-sm text-gray-400">Bounce Rate</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No analytics data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
