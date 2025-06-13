
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  TrendingUp, 
  Globe, 
  Target, 
  Zap, 
  BarChart3,
  Settings,
  RefreshCw,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useSEOManagement } from '@/hooks/useSEOManagement';
import { useAdvancedSEO } from '@/hooks/useAdvancedSEO';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const SEOManagementDashboard = () => {
  const { 
    pages, 
    sitemap, 
    loading, 
    generating, 
    updatePageSEO, 
    generateSitemap, 
    bulkOptimizePages 
  } = useSEOManagement();
  
  const {
    backlinks,
    domainMetrics,
    aeoOptimizations,
    geoAnalysis,
    voiceSearchData
  } = useAdvancedSEO();

  const [selectedPage, setSelectedPage] = useState<string>('');
  const [autoOptimize, setAutoOptimize] = useState(false);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);

  const seoTrendData = [
    { month: 'Jan', score: 65, traffic: 1200 },
    { month: 'Feb', score: 72, traffic: 1450 },
    { month: 'Mar', score: 78, traffic: 1680 },
    { month: 'Apr', score: 85, traffic: 2100 },
    { month: 'May', score: 91, traffic: 2450 },
    { month: 'Jun', score: 94, traffic: 2800 }
  ];

  const backlinkStatusData = [
    { name: 'Active', value: backlinks.filter(b => b.status === 'active').length, color: '#10b981' },
    { name: 'New', value: backlinks.filter(b => b.status === 'new').length, color: '#3b82f6' },
    { name: 'Lost', value: backlinks.filter(b => b.status === 'lost').length, color: '#ef4444' }
  ];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading SEO dashboard...</p>
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
                  <Search className="w-5 h-5 mr-2" />
                  SEO Management Dashboard
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Comprehensive SEO optimization and management suite
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={generateSitemap}
                  disabled={generating}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {generating ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                  Generate Sitemap
                </Button>
                <Button 
                  onClick={() => bulkOptimizePages(selectedPages)}
                  disabled={selectedPages.length === 0}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Bulk Optimize
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6 bg-gray-800/50">
                <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-600">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="pages" className="text-white data-[state=active]:bg-purple-600">
                  <Globe className="w-4 h-4 mr-2" />
                  Pages
                </TabsTrigger>
                <TabsTrigger value="backlinks" className="text-white data-[state=active]:bg-purple-600">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Backlinks
                </TabsTrigger>
                <TabsTrigger value="aeo" className="text-white data-[state=active]:bg-purple-600">
                  <Target className="w-4 h-4 mr-2" />
                  AEO
                </TabsTrigger>
                <TabsTrigger value="geo" className="text-white data-[state=active]:bg-purple-600">
                  <Zap className="w-4 h-4 mr-2" />
                  GEO
                </TabsTrigger>
                <TabsTrigger value="voice" className="text-white data-[state=active]:bg-purple-600">
                  <Settings className="w-4 h-4 mr-2" />
                  Voice SEO
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Domain Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="glass-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Domain Authority</h3>
                      <Badge className="bg-green-500/20 text-green-400">Excellent</Badge>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{domainMetrics.domain_authority}</div>
                    <p className="text-sm text-gray-400">+5 from last month</p>
                  </div>

                  <div className="glass-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Backlinks</h3>
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{domainMetrics.backlinks_count}</div>
                    <p className="text-sm text-gray-400">+12 new this week</p>
                  </div>

                  <div className="glass-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Organic Keywords</h3>
                      <Target className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{domainMetrics.organic_keywords.toLocaleString()}</div>
                    <p className="text-sm text-gray-400">+45 this month</p>
                  </div>

                  <div className="glass-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Organic Traffic</h3>
                      <BarChart3 className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{domainMetrics.organic_traffic.toLocaleString()}</div>
                    <p className="text-sm text-gray-400">+18% growth</p>
                  </div>
                </div>

                {/* SEO Trends Chart */}
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">SEO Performance Trends</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={seoTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9CA3AF" />
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
                          dataKey="score" 
                          stroke="#8b5cf6" 
                          strokeWidth={3}
                          dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                          name="SEO Score"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="traffic" 
                          stroke="#10b981" 
                          strokeWidth={3}
                          dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                          name="Organic Traffic"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Backlink Status Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="glass-card">
                    <h3 className="text-lg font-semibold text-white mb-4">Backlink Status Distribution</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={backlinkStatusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {backlinkStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
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

                  <div className="glass-card">
                    <h3 className="text-lg font-semibold text-white mb-4">Top Referring Domains</h3>
                    <div className="space-y-3">
                      {backlinks.slice(0, 6).map((backlink, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <div>
                            <p className="text-white font-medium">{new URL(backlink.source_url).hostname}</p>
                            <p className="text-sm text-gray-400">DA: {backlink.domain_authority}</p>
                          </div>
                          <Badge 
                            className={
                              backlink.status === 'active' ? 'bg-green-500/20 text-green-400' :
                              backlink.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-red-500/20 text-red-400'
                            }
                          >
                            {backlink.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pages" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={autoOptimize}
                        onCheckedChange={setAutoOptimize}
                      />
                      <Label className="text-white">Auto-optimize pages</Label>
                    </div>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>

                <div className="glass-card">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="py-3 px-4 text-white font-semibold">
                            <input 
                              type="checkbox" 
                              className="mr-2"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedPages(pages.map(p => p.id));
                                } else {
                                  setSelectedPages([]);
                                }
                              }}
                            />
                            Page
                          </th>
                          <th className="py-3 px-4 text-white font-semibold">SEO Score</th>
                          <th className="py-3 px-4 text-white font-semibold">Issues</th>
                          <th className="py-3 px-4 text-white font-semibold">Last Updated</th>
                          <th className="py-3 px-4 text-white font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pages.slice(0, 10).map((page) => (
                          <tr key={page.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                            <td className="py-3 px-4">
                              <input 
                                type="checkbox" 
                                className="mr-2"
                                checked={selectedPages.includes(page.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedPages([...selectedPages, page.id]);
                                  } else {
                                    setSelectedPages(selectedPages.filter(id => id !== page.id));
                                  }
                                }}
                              />
                              <div>
                                <p className="text-white font-medium">{page.title || page.url}</p>
                                <p className="text-sm text-gray-400">{page.url}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <div className="text-white font-semibold">{page.performance_score}</div>
                                <div className={`w-2 h-2 rounded-full ${
                                  page.performance_score >= 80 ? 'bg-green-400' :
                                  page.performance_score >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                                }`} />
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-1">
                                {page.seo_issues.length > 0 ? (
                                  <>
                                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                                    <span className="text-yellow-400">{page.seo_issues.length}</span>
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span className="text-green-400">0</span>
                                  </>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-400">
                              {new Date(page.last_updated).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                  <Settings className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="backlinks" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Total Backlinks</h3>
                    <div className="text-3xl font-bold text-blue-400">{backlinks.length}</div>
                    <p className="text-sm text-gray-400">+12 this week</p>
                  </div>
                  <div className="glass-card text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Referring Domains</h3>
                    <div className="text-3xl font-bold text-green-400">{domainMetrics.referring_domains}</div>
                    <p className="text-sm text-gray-400">+5 this month</p>
                  </div>
                  <div className="glass-card text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Avg Domain Authority</h3>
                    <div className="text-3xl font-bold text-purple-400">
                      {backlinks.length > 0 
                        ? Math.round(backlinks.reduce((sum, b) => sum + b.domain_authority, 0) / backlinks.length)
                        : 0
                      }
                    </div>
                    <p className="text-sm text-gray-400">Quality score</p>
                  </div>
                </div>

                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Backlinks</h3>
                  <div className="space-y-3">
                    {backlinks.slice(0, 8).map((backlink) => (
                      <div key={backlink.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-white font-medium">{backlink.anchor_text}</p>
                          <p className="text-sm text-gray-400">{backlink.source_url}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-white font-semibold">{backlink.domain_authority}</p>
                            <p className="text-xs text-gray-400">DA</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-semibold">{backlink.page_authority}</p>
                            <p className="text-xs text-gray-400">PA</p>
                          </div>
                          <Badge 
                            className={
                              backlink.status === 'active' ? 'bg-green-500/20 text-green-400' :
                              backlink.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-red-500/20 text-red-400'
                            }
                          >
                            {backlink.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="aeo" className="space-y-6">
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Answer Engine Optimization (AEO)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3">Featured Snippet Opportunities</h4>
                      <div className="space-y-3">
                        {aeoOptimizations.slice(0, 4).map((optimization) => (
                          <div key={optimization.id} className="p-3 bg-gray-800/50 rounded-lg">
                            <p className="text-white font-medium">{optimization.question}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-gray-400">Snippet Potential</span>
                              <Badge className="bg-purple-500/20 text-purple-400">
                                {optimization.featured_snippet_potential}%
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-3">Schema Markup Status</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <span className="text-white">FAQ Schema</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <span className="text-white">Organization Schema</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <span className="text-white">Service Schema</span>
                          <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <span className="text-white">Review Schema</span>
                          <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="geo" className="space-y-6">
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Generative Engine Optimization (GEO)</h3>
                  {geoAnalysis.map((analysis, index) => (
                    <div key={index} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-400">{analysis.content_clarity_score}</div>
                          <p className="text-sm text-gray-400">Content Clarity</p>
                        </div>
                        <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                          <div className="text-2xl font-bold text-green-400">{analysis.factual_accuracy_score}</div>
                          <p className="text-sm text-gray-400">Factual Accuracy</p>
                        </div>
                        <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-400">{analysis.semantic_relevance_score}</div>
                          <p className="text-sm text-gray-400">Semantic Relevance</p>
                        </div>
                        <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-400">{analysis.topic_authority_score}</div>
                          <p className="text-sm text-gray-400">Topic Authority</p>
                        </div>
                        <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                          <div className="text-2xl font-bold text-pink-400">{analysis.generative_ai_readiness}</div>
                          <p className="text-sm text-gray-400">AI Readiness</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-semibold mb-3">Optimization Recommendations</h4>
                        <div className="space-y-2">
                          {analysis.recommendations.map((rec, recIndex) => (
                            <div key={recIndex} className="flex items-center p-3 bg-gray-800/50 rounded-lg">
                              <Target className="w-5 h-5 text-purple-400 mr-3" />
                              <span className="text-white">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="voice" className="space-y-6">
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Voice Search Optimization</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3">Voice Query Analysis</h4>
                      <div className="space-y-3">
                        {voiceSearchData.map((query, index) => (
                          <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                            <p className="text-white font-medium mb-2">"{query.query}"</p>
                            <div className="flex items-center justify-between">
                              <Badge className={
                                query.intent === 'informational' ? 'bg-blue-500/20 text-blue-400' :
                                query.intent === 'navigational' ? 'bg-green-500/20 text-green-400' :
                                'bg-purple-500/20 text-purple-400'
                              }>
                                {query.intent}
                              </Badge>
                              <div className="flex space-x-2 text-sm">
                                <span className="text-gray-400">Conv: {query.conversational_score}%</span>
                                <span className="text-gray-400">Local: {query.local_relevance}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-3">Optimization Strategies</h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-gray-800/50 rounded-lg">
                          <h5 className="text-white font-medium mb-2">Long-tail Keywords</h5>
                          <p className="text-sm text-gray-400">Focus on conversational, question-based queries</p>
                        </div>
                        <div className="p-4 bg-gray-800/50 rounded-lg">
                          <h5 className="text-white font-medium mb-2">Local SEO Integration</h5>
                          <p className="text-sm text-gray-400">Optimize for "near me" and location-based searches</p>
                        </div>
                        <div className="p-4 bg-gray-800/50 rounded-lg">
                          <h5 className="text-white font-medium mb-2">Featured Snippets</h5>
                          <p className="text-sm text-gray-400">Structure content for voice assistant responses</p>
                        </div>
                        <div className="p-4 bg-gray-800/50 rounded-lg">
                          <h5 className="text-white font-medium mb-2">Natural Language</h5>
                          <p className="text-sm text-gray-400">Use conversational tone and FAQ format</p>
                        </div>
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

export default SEOManagementDashboard;
