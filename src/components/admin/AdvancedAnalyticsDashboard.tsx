
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Globe,
  MousePointer,
  Smartphone,
  Monitor,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useAdvancedAnalytics } from '@/hooks/useAdvancedAnalytics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AdvancedAnalyticsDashboard = () => {
  const { 
    dashboard, 
    loading, 
    trackEvent,
    fetchDashboard
  } = useAdvancedAnalytics();
  
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('pageviews');

  useEffect(() => {
    fetchDashboard();
  }, [timeRange]);

  const pieColors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  // Mock data for charts since we're working with the dashboard data structure
  const pageViewsChart = [
    { date: '2024-01-01', views: 245 },
    { date: '2024-01-02', views: 312 },
    { date: '2024-01-03', views: 289 },
    { date: '2024-01-04', views: 356 },
    { date: '2024-01-05', views: 421 },
    { date: '2024-01-06', views: 387 },
    { date: '2024-01-07', views: 445 }
  ];

  const userSessionsChart = [
    { date: '2024-01-01', sessions: 189 },
    { date: '2024-01-02', sessions: 234 },
    { date: '2024-01-03', sessions: 201 },
    { date: '2024-01-04', sessions: 278 },
    { date: '2024-01-05', sessions: 312 },
    { date: '2024-01-06', sessions: 289 },
    { date: '2024-01-07', sessions: 334 }
  ];

  const deviceStatsChart = [
    { name: 'Desktop', value: 65, percentage: '65%' },
    { name: 'Mobile', value: 28, percentage: '28%' },
    { name: 'Tablet', value: 7, percentage: '7%' }
  ];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Advanced Analytics Dashboard
              </CardTitle>
              <CardDescription className="text-gray-400">
                Comprehensive insights into your website performance and user behavior
              </CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="1d">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
              <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-600">
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="traffic" className="text-white data-[state=active]:bg-purple-600">
                <TrendingUp className="w-4 h-4 mr-2" />
                Traffic
              </TabsTrigger>
              <TabsTrigger value="users" className="text-white data-[state=active]:bg-purple-600">
                <Users className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="devices" className="text-white data-[state=active]:bg-purple-600">
                <Smartphone className="w-4 h-4 mr-2" />
                Devices
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-3">
                    <Eye className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{dashboard.totalEvents.toLocaleString()}</h3>
                  <p className="text-sm text-gray-400">Total Events</p>
                  <div className="flex items-center justify-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+12.5%</span>
                  </div>
                </div>
                
                <div className="glass-card text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-3">
                    <Users className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{dashboard.todayEvents.toLocaleString()}</h3>
                  <p className="text-sm text-gray-400">Today's Events</p>
                  <div className="flex items-center justify-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+8.3%</span>
                  </div>
                </div>
                
                <div className="glass-card text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mx-auto mb-3">
                    <Clock className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{dashboard.weeklyEvents.toLocaleString()}</h3>
                  <p className="text-sm text-gray-400">Weekly Events</p>
                  <div className="flex items-center justify-center mt-2">
                    <ArrowDown className="w-4 h-4 text-red-400 mr-1" />
                    <span className="text-sm text-red-400">-2.1%</span>
                  </div>
                </div>
                
                <div className="glass-card text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-lg mx-auto mb-3">
                    <MousePointer className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{dashboard.monthlyEvents.toLocaleString()}</h3>
                  <p className="text-sm text-gray-400">Monthly Events</p>
                  <div className="flex items-center justify-center mt-2">
                    <ArrowDown className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">-5.2%</span>
                  </div>
                </div>
              </div>

              {/* Traffic Chart */}
              <div className="glass-card">
                <h3 className="text-lg font-semibold text-white mb-4">Traffic Overview</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pageViewsChart}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="traffic" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Page Views Chart */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Page Views Trend</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={pageViewsChart}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#fff'
                          }} 
                        />
                        <Bar dataKey="views" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Top Pages */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Top Pages</h3>
                  <div className="space-y-3">
                    {dashboard.topPages.map((page, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{page.page}</p>
                          <p className="text-sm text-gray-400">Page</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">{page.views.toLocaleString()}</p>
                          <p className="text-sm text-gray-400">views</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Events */}
              <div className="glass-card">
                <h3 className="text-lg font-semibold text-white mb-4">Top Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {dashboard.topEvents.map((event, index) => (
                    <div key={index} className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mx-auto mb-3">
                        <Globe className="w-6 h-6 text-purple-400" />
                      </div>
                      <h4 className="text-white font-semibold">{event.event}</h4>
                      <p className="text-2xl font-bold text-purple-400 my-2">{event.count.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">events</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Sessions */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">User Sessions</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userSessionsChart}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#fff'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="sessions" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* User Behavior */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">User Behavior</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">New vs Returning</span>
                      <div className="flex space-x-2">
                        <Badge className="bg-green-500/20 text-green-400">68% New</Badge>
                        <Badge className="bg-blue-500/20 text-blue-400">32% Returning</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Avg. Events per Session</span>
                      <span className="text-white font-semibold">3.2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Sessions</span>
                      <span className="text-white font-semibold">{dashboard.totalEvents}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="devices" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Device Types */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Device Types</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deviceStatsChart}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {deviceStatsChart.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#fff'
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Device Stats */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Device Statistics</h3>
                  <div className="space-y-4">
                    {deviceStatsChart.map((device, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: pieColors[index % pieColors.length] }}
                          />
                          <span className="text-white">{device.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">{device.value.toLocaleString()}</p>
                          <p className="text-sm text-gray-400">{device.percentage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;
