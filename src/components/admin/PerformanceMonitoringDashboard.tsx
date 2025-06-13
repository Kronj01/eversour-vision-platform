
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Zap, 
  Globe, 
  Smartphone, 
  Monitor, 
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

const PerformanceMonitoringDashboard = () => {
  const { 
    performanceData, 
    realTimeMetrics, 
    loading, 
    monitoring,
    analyzePerformance,
    generatePerformanceReport
  } = usePerformanceMonitoring();

  const {
    metrics,
    applyAllOptimizations,
    getPerformanceScore
  } = usePerformanceOptimization();

  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedDevice, setSelectedDevice] = useState('all');
  const [autoOptimize, setAutoOptimize] = useState(false);

  const coreWebVitalsData = performanceData.slice(-24).map((item, index) => ({
    time: `${index}:00`,
    lcp: item.core_web_vitals.lcp,
    fid: item.core_web_vitals.fid,
    cls: item.core_web_vitals.cls * 100, // Convert to percentage
    fcp: item.core_web_vitals.fcp
  }));

  const lighthouseScoresData = performanceData.slice(-12).map((item, index) => ({
    date: new Date(item.timestamp).toLocaleDateString(),
    performance: item.lighthouse_scores.performance,
    accessibility: item.lighthouse_scores.accessibility,
    bestPractices: item.lighthouse_scores.best_practices,
    seo: item.lighthouse_scores.seo
  }));

  const realTimeData = [
    { metric: 'Active Users', value: realTimeMetrics.active_users, change: '+12%', color: 'text-green-400' },
    { metric: 'Current Sessions', value: realTimeMetrics.current_sessions, change: '+8%', color: 'text-blue-400' },
    { metric: 'Bounce Rate', value: `${realTimeMetrics.bounce_rate}%`, change: '-5%', color: 'text-green-400' },
    { metric: 'Avg Session Duration', value: `${Math.floor(realTimeMetrics.avg_session_duration / 60)}m`, change: '+15%', color: 'text-green-400' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400 bg-green-500/20';
    if (score >= 70) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const getVitalStatus = (vital: string, value: number) => {
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1800, poor: 3000 },
      ttfb: { good: 800, poor: 1800 }
    };

    const threshold = thresholds[vital as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return '  poor';
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading performance dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Performance Monitoring Dashboard
                  {monitoring && <div className="w-2 h-2 bg-green-400 rounded-full ml-2 animate-pulse" />}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time performance monitoring and optimization
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger className="w-24 bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="1h">1h</SelectItem>
                    <SelectItem value="24h">24h</SelectItem>
                    <SelectItem value="7d">7d</SelectItem>
                    <SelectItem value="30d">30d</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  onClick={applyAllOptimizations}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Optimize
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  Report
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="realtime" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
                <TabsTrigger value="realtime" className="text-white data-[state=active]:bg-purple-600">
                  <Activity className="w-4 h-4 mr-2" />
                  Real-time
                </TabsTrigger>
                <TabsTrigger value="vitals" className="text-white data-[state=active]:bg-purple-600">
                  <Zap className="w-4 h-4 mr-2" />
                  Core Vitals
                </TabsTrigger>
                <TabsTrigger value="lighthouse" className="text-white data-[state=active]:bg-purple-600">
                  <Globe className="w-4 h-4 mr-2" />
                  Lighthouse
                </TabsTrigger>
                <TabsTrigger value="mobile" className="text-white data-[state=active]:bg-purple-600">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile
                </TabsTrigger>
                <TabsTrigger value="optimization" className="text-white data-[state=active]:bg-purple-600">
                  <Settings className="w-4 h-4 mr-2" />
                  Optimization
                </TabsTrigger>
              </TabsList>

              <TabsContent value="realtime" className="space-y-6">
                {/* Real-time Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {realTimeData.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glass-card"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-400">{item.metric}</h3>
                        <span className={`text-xs ${item.color}`}>{item.change}</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{item.value}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Server Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="glass-card">
                    <h3 className="text-lg font-semibold text-white mb-4">Server Health</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Uptime</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400 font-semibold">{realTimeMetrics.server_uptime}%</span>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Response Time</span>
                        <span className="text-white font-semibold">{realTimeMetrics.database_response_time}ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">CDN Cache Hit</span>
                        <span className="text-green-400 font-semibold">{realTimeMetrics.cdn_cache_hit_rate}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card">
                    <h3 className="text-lg font-semibold text-white mb-4">Traffic Insights</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Page Views/min</span>
                        <span className="text-white font-semibold">{realTimeMetrics.page_views_per_minute}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">New vs Returning</span>
                        <div className="flex space-x-2">
                          <Badge className="bg-blue-500/20 text-blue-400">68% New</Badge>
                          <Badge className="bg-green-500/20 text-green-400">32% Returning</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card">
                    <h3 className="text-lg font-semibold text-white mb-4">Performance Score</h3>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-400 mb-2">{getPerformanceScore()}</div>
                      <Progress value={getPerformanceScore()} className="mb-2" />
                      <p className="text-sm text-gray-400">Overall Performance</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="vitals" className="space-y-6">
                {/* Core Web Vitals Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="glass-card text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-3">
                      <Clock className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">LCP</h3>
                    <div className="text-2xl font-bold text-white mb-2">
                      {metrics.fcp ? `${metrics.fcp.toFixed(1)}s` : '2.1s'}
                    </div>
                    <Badge className={getScoreColor(85)}>Good</Badge>
                  </div>

                  <div className="glass-card text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-3">
                      <Zap className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">FID</h3>
                    <div className="text-2xl font-bold text-white mb-2">
                      {metrics.fid ? `${metrics.fid.toFixed(0)}ms` : '58ms'}
                    </div>
                    <Badge className={getScoreColor(92)}>Good</Badge>
                  </div>

                  <div className="glass-card text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">CLS</h3>
                    <div className="text-2xl font-bold text-white mb-2">
                      {metrics.cls ? metrics.cls.toFixed(3) : '0.045'}
                    </div>
                    <Badge className={getScoreColor(94)}>Good</Badge>
                  </div>

                  <div className="glass-card text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-lg mx-auto mb-3">
                      <Activity className="w-6 h-6 text-orange-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">TTFB</h3>
                    <div className="text-2xl font-bold text-white mb-2">
                      {metrics.ttfb ? `${metrics.ttfb.toFixed(0)}ms` : '120ms'}
                    </div>
                    <Badge className={getScoreColor(88)}>Good</Badge>
                  </div>
                </div>

                {/* Core Web Vitals Chart */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Core Web Vitals Trends</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={coreWebVitalsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" stroke="#9CA3AF" />
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
                          dataKey="lcp" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          name="LCP (ms)"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="fid" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          name="FID (ms)"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="cls" 
                          stroke="#8b5cf6" 
                          strokeWidth={2}
                          name="CLS (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="lighthouse" className="space-y-6">
                {/* Lighthouse Scores */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="glass-card text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Performance</h3>
                    <div className="text-3xl font-bold text-green-400 mb-2">94</div>
                    <Progress value={94} className="mb-2" />
                    <Badge className="bg-green-500/20 text-green-400">Excellent</Badge>
                  </div>

                  <div className="glass-card text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Accessibility</h3>
                    <div className="text-3xl font-bold text-blue-400 mb-2">91</div>
                    <Progress value={91} className="mb-2" />
                    <Badge className="bg-blue-500/20 text-blue-400">Good</Badge>
                  </div>

                  <div className="glass-card text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Best Practices</h3>
                    <div className="text-3xl font-bold text-purple-400 mb-2">88</div>
                    <Progress value={88} className="mb-2" />
                    <Badge className="bg-purple-500/20 text-purple-400">Good</Badge>
                  </div>

                  <div className="glass-card text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">SEO</h3>
                    <div className="text-3xl font-bold text-orange-400 mb-2">96</div>
                    <Progress value={96} className="mb-2" />
                    <Badge className="bg-orange-500/20 text-orange-400">Excellent</Badge>
                  </div>
                </div>

                {/* Lighthouse Trends */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Lighthouse Score Trends</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={lighthouseScoresData}>
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
                        <Area 
                          type="monotone" 
                          dataKey="performance" 
                          stackId="1"
                          stroke="#10b981" 
                          fill="#10b981"
                          fillOpacity={0.3}
                          name="Performance"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="accessibility" 
                          stackId="2"
                          stroke="#3b82f6" 
                          fill="#3b82f6"
                          fillOpacity={0.3}
                          name="Accessibility"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="bestPractices" 
                          stackId="3"
                          stroke="#8b5cf6" 
                          fill="#8b5cf6"
                          fillOpacity={0.3}
                          name="Best Practices"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="seo" 
                          stackId="4"
                          stroke="#f59e0b" 
                          fill="#f59e0b"
                          fillOpacity={0.3}
                          name="SEO"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Performance Opportunities */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Performance Opportunities</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-white">Eliminate render-blocking resources</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">+0.8s</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        <span className="text-white">Properly size images</span>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400">+0.3s</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-white">Enable text compression</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">+0.2s</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mobile" className="space-y-6">
                {/* Mobile Performance */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-3">
                      <Smartphone className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">Mobile Score</h3>
                    <div className="text-3xl font-bold text-green-400 mb-2">87</div>
                    <Progress value={87} className="mb-2" />
                    <Badge className="bg-green-500/20 text-green-400">Good</Badge>
                  </div>

                  <div className="glass-card text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-3">
                      <Clock className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">Speed Index</h3>
                    <div className="text-3xl font-bold text-blue-400 mb-2">2.4s</div>
                    <Badge className="bg-blue-500/20 text-blue-400">Good</Badge>
                  </div>

                  <div className="glass-card text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mx-auto mb-3">
                      <Activity className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">Interactive</h3>
                    <div className="text-3xl font-bold text-purple-400 mb-2">3.1s</div>
                    <Badge className="bg-yellow-500/20 text-yellow-400">Needs Work</Badge>
                  </div>
                </div>

                {/* Device Breakdown */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Device Performance Breakdown</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center  space-x-3">
                        <Smartphone className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white font-medium">Mobile</p>
                          <p className="text-sm text-gray-400">65% of traffic</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-400">87</div>
                        <Progress value={87} className="w-20" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Monitor className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white font-medium">Desktop</p>
                          <p className="text-sm text-gray-400">35% of traffic</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">94</div>
                        <Progress value={94} className="w-20" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="optimization" className="space-y-6">
                {/* Optimization Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card">
                    <h3 className="text-lg font-semibold text-white mb-4">Active Optimizations</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-white">Image Lazy Loading</span>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-white">CSS Minification</span>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-white">Browser Caching</span>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="w-5 h-5 text-yellow-400" />
                          <span className="text-white">WebP Image Format</span>
                        </div>
                        <Badge className="bg-yellow-500/20 text-yellow-400">Pending</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card">
                    <h3 className="text-lg font-semibold text-white mb-4">Optimization Recommendations</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Zap className="w-4 h-4 text-purple-400" />
                          <span className="text-white font-medium">Enable CDN</span>
                        </div>
                        <p className="text-sm text-gray-400">Improve global loading times</p>
                        <Badge className="bg-purple-500/20 text-purple-400 mt-2">High Impact</Badge>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-blue-400" />
                          <span className="text-white font-medium">Preload Critical Resources</span>
                        </div>
                        <p className="text-sm text-gray-400">Reduce initial load time</p>
                        <Badge className="bg-blue-500/20 text-blue-400 mt-2">Medium Impact</Badge>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Globe className="w-4 h-4 text-green-400" />
                          <span className="text-white font-medium">Optimize Third-party Scripts</span>
                        </div>
                        <p className="text-sm text-gray-400">Reduce JavaScript execution time</p>
                        <Badge className="bg-green-500/20 text-green-400 mt-2">Low Impact</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Auto-optimization Controls */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Auto-optimization Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-white">Image Optimization</span>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-white">CSS/JS Minification</span>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-white">Lazy Loading</span>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Enabled
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-white">Preload Critical Resources</span>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-700">
                          Enable
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-white">Service Worker Caching</span>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-700">
                          Enable
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-white">CDN Integration</span>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-700">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PerformanceMonitoringDashboard;
