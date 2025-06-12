
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
    analytics, 
    pageViews, 
    userSessions, 
    deviceStats, 
    loading, 
    fetchAnalytics,
    fetchPageViews,
    fetchUserSessions,
    fetchDeviceStats
  } = useAdvancedAnalytics();
  
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('pageviews');

  useEffect(() => {
    fetchAnalytics(timeRange);
    fetchPageViews(timeRange);
    fetchUserSessions(timeRange);
    fetchDeviceStats(timeRange);
  }, [timeRange]);

  const pieColors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

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
                  <h3 className="text-2xl font-bold text-white mb-1">{analytics.totalPageViews.toLocaleString()}</h3>
                  <p className="text-sm text-gray-400">Page Views</p>
                  <div className="flex items-center justify-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+12.5%</span>
                  </div>
                </div>
                
                <div className="glass-card text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-3">
                    <Users className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{analytics.uniqueVisitors.toLocaleString()}</h3>
                  <p className="text-sm text-gray-400">Unique Visitors</p>
                  <div className="flex items-center justify-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+8.3%</span>
                  </div>
                </div>
                
                <div className="glass-card text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mx-auto mb-3">
                    <Clock className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{analytics.avgSessionDuration}</h3>
                  <p className="text-sm text-gray-400">Avg. Session</p>
                  <div className="flex items-center justify-center mt-2">
                    <ArrowDown className="w-4 h-4 text-red-400 mr-1" />
                    <span className="text-sm text-red-400">-2.1%</span>
                  </div>
                </div>
                
                <div className="glass-card text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-lg mx-auto mb-3">
                    <MousePointer className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{analytics.bounceRate}%</h3>
                  <p className="text-sm text-gray-400">Bounce Rate</p>
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
                    <LineChart data={pageViews}>
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
                      <BarChart data={pageViews}>
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
                    {analytics.topPages.map((page, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{page.path}</p>
                          <p className="text-sm text-gray-400">{page.title}</p>
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

              {/* Traffic Sources */}
              <div className="glass-card">
                <h3 className="text-lg font-semibold text-white mb-4">Traffic Sources</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {analytics.trafficSources.map((source, index) => (
                    <div key={index} className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mx-auto mb-3">
                        <Globe className="w-6 h-6 text-purple-400" />
                      </div>
                      <h4 className="text-white font-semibold">{source.source}</h4>
                      <p className="text-2xl font-bold text-purple-400 my-2">{source.visits.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">{source.percentage}% of traffic</p>
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
                      <LineChart data={userSessions}>
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
                      <span className="text-gray-400">Avg. Pages per Session</span>
                      <span className="text-white font-semibold">3.2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Avg. Session Duration</span>
                      <span className="text-white font-semibold">{analytics.avgSessionDuration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Geographic Data */}
              <div className="glass-card">
                <h3 className="text-lg font-semibold text-white mb-4">Geographic Distribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {analytics.countries.map((country, index) => (
                    <div key={index} className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <p className="text-white font-semibold">{country.name}</p>
                      <p className="text-2xl font-bold text-purple-400 my-2">{country.visitors.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">{country.percentage}%</p>
                    </div>
                  ))}
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
                          data={deviceStats}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {deviceStats.map((entry, index) => (
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
                    {deviceStats.map((device, index) => (
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
                          <p className="text-sm text-gray-400">{device.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Browser and OS Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Top Browsers</h3>
                  <div className="space-y-3">
                    {analytics.browsers.map((browser, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-white">{browser.name}</span>
                        <div className="text-right">
                          <span className="text-white font-semibold">{browser.visitors.toLocaleString()}</span>
                          <span className="text-sm text-gray-400 ml-2">{browser.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Operating Systems</h3>
                  <div className="space-y-3">
                    {analytics.operatingSystems.map((os, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-white">{os.name}</span>
                        <div className="text-right">
                          <span className="text-white font-semibold">{os.visitors.toLocaleString()}</span>
                          <span className="text-sm text-gray-400 ml-2">{os.percentage}%</span>
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
