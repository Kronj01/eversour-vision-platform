
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  DollarSign, 
  Users, 
  BarChart3,
  PieChart,
  LineChart,
  ArrowUp,
  ArrowDown,
  Calendar,
  Zap,
  Settings,
  Download,
  RefreshCw,
  Eye,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnalyticsForecasting } from '@/hooks/useAnalyticsForecasting';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area, FunnelChart, Funnel, LabelList } from 'recharts';

const AnalyticsForecastingDashboard = () => {
  const {
    forecasts,
    growthTrends,
    adCampaignData,
    conversionFunnels,
    loading,
    generateGrowthForecasts,
    calculateROIProjections
  } = useAnalyticsForecasting();

  const [selectedTimeframe, setSelectedTimeframe] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const forecastChartData = growthTrends.map(trend => ({
    metric: trend.metric,
    current: trend.current,
    predicted: trend.predicted,
    confidence: trend.confidence
  }));

  const roiComparisonData = adCampaignData.map(campaign => ({
    name: campaign.campaign_name.substring(0, 15) + '...',
    spend: campaign.spend,
    revenue: campaign.revenue,
    roi: campaign.roi
  }));

  const funnelData = conversionFunnels.map(stage => ({
    name: stage.stage,
    value: stage.visitors,
    conversion: stage.conversion_rate
  }));

  const pieColors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading analytics dashboard...</p>
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
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Analytics & Forecasting Dashboard
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Comprehensive analytics, forecasting, and ROI tracking
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-24 bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="3m">3M</SelectItem>
                    <SelectItem value="6m">6M</SelectItem>
                    <SelectItem value="12m">12M</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  onClick={generateGrowthForecasts}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Update
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="forecasting" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
                <TabsTrigger value="forecasting" className="text-white data-[state=active]:bg-purple-600">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Forecasting
                </TabsTrigger>
                <TabsTrigger value="campaigns" className="text-white data-[state=active]:bg-purple-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Ad Campaigns
                </TabsTrigger>
                <TabsTrigger value="funnels" className="text-white data-[state=active]:bg-purple-600">
                  <Users className="w-4 h-4 mr-2" />
                  Funnels
                </TabsTrigger>
                <TabsTrigger value="insights" className="text-white data-[state=active]:bg-purple-600">
                  <Eye className="w-4 h-4 mr-2" />
                  Insights
                </TabsTrigger>
                <TabsTrigger value="execution" className="text-white data-[state=active]:bg-purple-600">
                  <Target className="w-4 h-4 mr-2" />
                  Execution
                </TabsTrigger>
              </TabsList>

              <TabsContent value="forecasting" className="space-y-6">
                {/* Growth Forecasts Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {growthTrends.map((trend, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glass-card"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm text-gray-400">{trend.metric}</h3>
                        <Badge className="bg-green-500/20 text-green-400">
                          +{trend.growth_rate}%
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">
                        {typeof trend.predicted === 'number' && trend.predicted > 1000 
                          ? `${(trend.predicted / 1000).toFixed(1)}K` 
                          : trend.predicted}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Current: {
                          typeof trend.current === 'number' && trend.current > 1000 
                            ? `${(trend.current / 1000).toFixed(1)}K` 
                            : trend.current
                        }</span>
                        <span className="text-purple-400">{trend.confidence}% confident</span>
                      </div>
                      <Progress value={trend.confidence} className="mt-2" />
                    </motion.div>
                  ))}
                </div>

                {/* Forecast Trends Chart */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Growth Forecast Trends</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={forecastChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="metric" 
                          stroke="#9CA3AF"
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={100}
                        />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#fff'
                          }} 
                        />
                        <Bar dataKey="current" fill="#6b7280" name="Current" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="predicted" fill="#8b5cf6" name="Predicted" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Detailed Forecasts */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Detailed Growth Forecasts</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="py-3 px-4 text-white font-semibold">Metric</th>
                          <th className="py-3 px-4 text-white font-semibold">Current</th>
                          <th className="py-3 px-4 text-white font-semibold">Predicted</th>
                          <th className="py-3 px-4 text-white font-semibold">Growth</th>
                          <th className="py-3 px-4 text-white font-semibold">Timeline</th>
                          <th className="py-3 px-4 text-white font-semibold">Confidence</th>
                        </tr>
                      </thead>
                      <tbody>
                        {growthTrends.map((trend, index) => (
                          <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                            <td className="py-3 px-4 text-white font-medium">{trend.metric}</td>
                            <td className="py-3 px-4 text-gray-400">{trend.current.toLocaleString()}</td>
                            <td className="py-3 px-4 text-white font-semibold">{trend.predicted.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <ArrowUp className="w-4 h-4 text-green-400" />
                                <span className="text-green-400 font-semibold">+{trend.growth_rate}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-400">{trend.timeline}</td>
                            <td className="py-3 px-4">
                              <Badge className="bg-purple-500/20 text-purple-400">
                                {trend.confidence}%
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="campaigns" className="space-y-6">
                {/* Campaign Performance Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="glass-card text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Total Spend</h3>
                    <div className="text-3xl font-bold text-red-400 mb-2">
                      ${adCampaignData.reduce((sum, campaign) => sum + campaign.spend, 0).toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-400">Across all campaigns</p>
                  </div>

                  <div className="glass-card text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Total Revenue</h3>
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      ${adCampaignData.reduce((sum, campaign) => sum + campaign.revenue, 0).toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-400">Generated revenue</p>
                  </div>

                  <div className="glass-card text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Average ROI</h3>
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {Math.round(adCampaignData.reduce((sum, campaign) => sum + campaign.roi, 0) / adCampaignData.length)}%
                    </div>
                    <p className="text-sm text-gray-400">Return on investment</p>
                  </div>

                  <div className="glass-card text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Total Conversions</h3>
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {adCampaignData.reduce((sum, campaign) => sum + campaign.conversions, 0)}
                    </div>
                    <p className="text-sm text-gray-400">Successful conversions</p>
                  </div>
                </div>

                {/* ROI Comparison Chart */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Campaign ROI Comparison</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={roiComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="name" 
                          stroke="#9CA3AF"
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={100}
                        />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#fff'
                          }} 
                        />
                        <Bar dataKey="spend" fill="#ef4444" name="Spend ($)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="revenue" fill="#10b981" name="Revenue ($)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Campaign Details */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Campaign Performance Details</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="py-3 px-4 text-white font-semibold">Campaign</th>
                          <th className="py-3 px-4 text-white font-semibold">Platform</th>
                          <th className="py-3 px-4 text-white font-semibold">Spend</th>
                          <th className="py-3 px-4 text-white font-semibold">Revenue</th>
                          <th className="py-3 px-4 text-white font-semibold">ROI</th>
                          <th className="py-3 px-4 text-white font-semibold">CTR</th>
                          <th className="py-3 px-4 text-white font-semibold">CPA</th>
                          <th className="py-3 px-4 text-white font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adCampaignData.map((campaign, index) => (
                          <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                            <td className="py-3 px-4 text-white font-medium">{campaign.campaign_name}</td>
                            <td className="py-3 px-4 text-gray-400">{campaign.platform}</td>
                            <td className="py-3 px-4 text-red-400">${campaign.spend.toLocaleString()}</td>
                            <td className="py-3 px-4 text-green-400">${campaign.revenue.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <Badge className={
                                campaign.roi >= 400 ? 'bg-green-500/20 text-green-400' :
                                campaign.roi >= 300 ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }>
                                {campaign.roi}%
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-gray-400">{campaign.ctr}%</td>
                            <td className="py-3 px-4 text-gray-400">${campaign.cpa}</td>
                            <td className="py-3 px-4">
                              <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="funnels" className="space-y-6">
                {/* Conversion Funnel Visualization */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Conversion Funnel Analysis</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={funnelData} layout="horizontal">
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis type="number" stroke="#9CA3AF" />
                          <YAxis type="category" dataKey="name" stroke="#9CA3AF" width={100} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#fff'
                            }} 
                          />
                          <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-white font-semibold">Funnel Optimization Opportunities</h4>
                      {conversionFunnels.map((stage, index) => (
                        <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium">{stage.stage}</span>
                            <Badge className={
                              stage.conversion_rate >= 50 ? 'bg-green-500/20 text-green-400' :
                              stage.conversion_rate >= 20 ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }>
                              {stage.conversion_rate}%
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">{stage.visitors.toLocaleString()} visitors</span>
                            {stage.drop_off_rate > 0 && (
                              <span className="text-red-400">-{stage.drop_off_rate}% drop-off</span>
                            )}
                          </div>
                          <Progress value={stage.conversion_rate} className="mt-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Funnel Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Overall Conversion Rate</h3>
                    <div className="text-3xl font-bold text-purple-400 mb-2">3.75%</div>
                    <p className="text-sm text-gray-400">From awareness to purchase</p>
                  </div>

                  <div className="glass-card text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Biggest Drop-off</h3>
                    <div className="text-3xl font-bold text-red-400 mb-2">70%</div>
                    <p className="text-sm text-gray-400">Purchase Intent → Purchase</p>
                  </div>

                  <div className="glass-card text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Revenue Impact</h3>
                    <div className="text-3xl font-bold text-green-400 mb-2">$45K</div>
                    <p className="text-sm text-gray-400">Monthly revenue generated</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                {/* Key Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card">
                    <h3 className="text-lg font-semibold text-white mb-4">Key Performance Insights</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <p className="text-green-400 font-medium">Strong Organic Growth</p>
                          <p className="text-sm text-gray-400">Organic traffic is projected to grow 50% in the next 6 months</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <p className="text-blue-400 font-medium">Conversion Rate Optimization</p>
                          <p className="text-sm text-gray-400">28% improvement expected with current optimization efforts</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <DollarSign className="w-5 h-5 text-purple-400 mt-0.5" />
                        <div>
                          <p className="text-purple-400 font-medium">Revenue Acceleration</p>
                          <p className="text-sm text-gray-400">50% revenue growth projected with high confidence (78%)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card">
                    <h3 className="text-lg font-semibold text-white mb-4">Market Trends Analysis</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-white">Market Size Growth</span>
                        <Badge className="bg-green-500/20 text-green-400">+22%</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-white">Competition Intensity</span>
                        <Badge className="bg-yellow-500/20 text-yellow-400">Medium</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-white">Technology Adoption</span>
                        <Badge className="bg-blue-500/20 text-blue-400">High</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-white">Consumer Behavior</span>
                        <Badge className="bg-purple-500/20 text-purple-400">Evolving</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Predictive Insights */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Predictive Insights & Opportunities</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">High Impact Opportunities</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <p className="text-green-400 font-medium">Content Marketing Scale</p>
                          <p className="text-sm text-gray-400">Potential +40% traffic increase</p>
                        </div>
                        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <p className="text-green-400 font-medium">Local SEO Expansion</p>
                          <p className="text-sm text-gray-400">Potential +30% local leads</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">Medium Impact Opportunities</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <p className="text-yellow-400 font-medium">Social Media Integration</p>
                          <p className="text-sm text-gray-400">Potential +20% engagement</p>
                        </div>
                        <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <p className="text-yellow-400 font-medium">Email Marketing Automation</p>
                          <p className="text-sm text-gray-400">Potential +15% conversions</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">Risk Factors</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                          <p className="text-red-400 font-medium">Market Saturation</p>
                          <p className="text-sm text-gray-400">Monitor competition closely</p>
                        </div>
                        <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                          <p className="text-red-400 font-medium">Technology Changes</p>
                          <p className="text-sm text-gray-400">Adapt to AI search evolution</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="execution" className="space-y-6">
                {/* Execution Plan Overview */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Strategic Execution Plan</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3">Immediate Actions (1-3 months)</h4>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                          <Calendar className="w-5 h-5 text-purple-400 mr-3" />
                          <div>
                            <p className="text-white font-medium">Content Strategy Enhancement</p>
                            <p className="text-sm text-gray-400">Increase content production by 200%</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <Zap className="w-5 h-5 text-blue-400 mr-3" />
                          <div>
                            <p className="text-white font-medium">Technical SEO Audit</p>
                            <p className="text-sm text-gray-400">Complete technical optimization</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <Target className="w-5 h-5 text-green-400 mr-3" />
                          <div>
                            <p className="text-white font-medium">Ad Campaign Optimization</p>
                            <p className="text-sm text-gray-400">Improve ROI by 25%</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-3">Long-term Goals (3-12 months)</h4>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                          <BarChart3 className="w-5 h-5 text-orange-400 mr-3" />
                          <div>
                            <p className="text-white font-medium">Market Expansion</p>
                            <p className="text-sm text-gray-400">Enter 3 new geographic markets</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
                          <Users className="w-5 h-5 text-pink-400 mr-3" />
                          <div>
                            <p className="text-white font-medium">Customer Acquisition</p>
                            <p className="text-sm text-gray-400">Achieve 50% growth in customer base</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                          <DollarSign className="w-5 h-5 text-cyan-400 mr-3" />
                          <div>
                            <p className="text-white font-medium">Revenue Milestone</p>
                            <p className="text-sm text-gray-400">Reach $500K annual recurring revenue</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resource Allocation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card">
                    <h3 className="text-lg font-semibold text-white mb-4">Budget Allocation</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Content Creation</span>
                        <span className="text-white font-semibold">35%</span>
                      </div>
                      <Progress value={35} />
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Paid Advertising</span>
                        <span className="text-white font-semibold">40%</span>
                      </div>
                      <Progress value={40} />
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Technical Development</span>
                        <span className="text-white font-semibold">25%</span>
                      </div>
                      <Progress value={25} />
                    </div>
                  </div>

                  <div className="glass-card">
                    <h3 className="text-lg font-semibold text-white mb-4">Team Resources</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                        <span className="text-gray-400">Content Team</span>
                        <Badge className="bg-blue-500/20 text-blue-400">3 people</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                        <span className="text-gray-400">Development Team</span>
                        <Badge className="bg-green-500/20 text-green-400">2 people</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                        <span className="text-gray-400">Marketing Team</span>
                        <Badge className="bg-purple-500/20 text-purple-400">2 people</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card">
                    <h3 className="text-lg font-semibold text-white mb-4">Success Metrics</h3>
                    <div className="space-y-3">
                      <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">50%</div>
                        <p className="text-sm text-gray-400">Traffic Growth Target</p>
                      </div>
                      <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">400%</div>
                        <p className="text-sm text-gray-400">ROI Target</p>
                      </div>
                      <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400">5%</div>
                        <p className="text-sm text-gray-400">Conversion Rate Target</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline and Milestones */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Implementation Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">Month 1-2: Foundation</h4>
                        <p className="text-gray-400">Technical optimization, content strategy, team setup</p>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400">In Progress</Badge>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">Month 3-4: Acceleration</h4>
                        <p className="text-gray-400">Content production scale, ad optimization, link building</p>
                      </div>
                      <Badge className="bg-gray-500/20 text-gray-400">Planned</Badge>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">Month 5-6: Optimization</h4>
                        <p className="text-gray-400">Performance analysis, strategy refinement, scaling successful initiatives</p>
                      </div>
                      <Badge className="bg-gray-500/20 text-gray-400">Future</Badge>
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

export default AnalyticsForecastingDashboard;
