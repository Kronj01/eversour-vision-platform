
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer,
  Calendar,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';
import { useAdvancedAnalytics } from '@/hooks/useAdvancedAnalytics';

const AdvancedAnalyticsDashboard = () => {
  const { dashboard, loading } = useAdvancedAnalytics();

  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  const statsCards = [
    {
      title: 'Total Events',
      value: dashboard.totalEvents,
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-600/20'
    },
    {
      title: 'Today',
      value: dashboard.todayEvents,
      icon: Calendar,
      color: 'text-blue-400',
      bgColor: 'bg-blue-600/20'
    },
    {
      title: 'This Week',
      value: dashboard.weeklyEvents,
      icon: Eye,
      color: 'text-green-400',
      bgColor: 'bg-green-600/20'
    },
    {
      title: 'This Month',
      value: dashboard.monthlyEvents,
      icon: MousePointer,
      color: 'text-orange-400',
      bgColor: 'bg-orange-600/20'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card) => (
          <Card key={card.title} className="bg-gray-900/50 border-gray-800 hover:border-purple-400/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{card.title}</p>
                  <p className={`text-2xl font-bold ${card.color} mt-1`}>
                    {card.value.toLocaleString()}
                  </p>
                </div>
                <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Top Pages</CardTitle>
            <CardDescription className="text-gray-400">Most visited pages this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboard.topPages.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="page" 
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="views" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Events */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Event Types</CardTitle>
            <CardDescription className="text-gray-400">Distribution of event types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboard.topEvents.slice(0, 5)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ event, percent }) => `${event} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {dashboard.topEvents.slice(0, 5).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Activity */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Analytics Overview
          </CardTitle>
          <CardDescription className="text-gray-400">
            Comprehensive view of your site's performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Unique Visitors</p>
              <p className="text-white text-xl font-bold">{dashboard.totalEvents}</p>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <Monitor className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Page Views</p>
              <p className="text-white text-xl font-bold">
                {dashboard.topPages.reduce((sum, page) => sum + page.views, 0)}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <MousePointer className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Interactions</p>
              <p className="text-white text-xl font-bold">
                {dashboard.topEvents.reduce((sum, event) => sum + event.count, 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;
