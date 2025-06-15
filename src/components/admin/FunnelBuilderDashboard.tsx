
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Zap, 
  Plus, 
  Play, 
  Pause, 
  BarChart3, 
  Download,
  Magnet,
  Target,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';
import { useFunnelBuilder, Funnel, LeadMagnet } from '@/hooks/useFunnelBuilder';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const FunnelBuilderDashboard = () => {
  const { funnels, leadMagnets, loading, createFunnel, createLeadMagnet } = useFunnelBuilder();
  const [showFunnelForm, setShowFunnelForm] = useState(false);
  const [showMagnetForm, setShowMagnetForm] = useState(false);
  const [newFunnel, setNewFunnel] = useState<Partial<Funnel>>({
    name: '',
    description: '',
    status: 'draft',
  });
  const [newMagnet, setNewMagnet] = useState<Partial<LeadMagnet>>({
    title: '',
    description: '',
    type: 'ebook',
    form_fields: [],
  });

  const funnelPerformanceData = [
    { month: 'Jan', conversions: 45, revenue: 4500 },
    { month: 'Feb', conversions: 52, revenue: 5200 },
    { month: 'Mar', conversions: 48, revenue: 4800 },
    { month: 'Apr', conversions: 61, revenue: 6100 },
    { month: 'May', conversions: 87, revenue: 8700 },
    { month: 'Jun', conversions: 94, revenue: 9400 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'draft': return 'bg-gray-500/20 text-gray-400';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400';
      case 'archived': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleCreateFunnel = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createFunnel(newFunnel);
    if (result) {
      setNewFunnel({ name: '', description: '', status: 'draft' });
      setShowFunnelForm(false);
    }
  };

  const handleCreateMagnet = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createLeadMagnet(newMagnet);
    if (result) {
      setNewMagnet({ title: '', description: '', type: 'ebook', form_fields: [] });
      setShowMagnetForm(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading funnel builder...</p>
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
                <Zap className="w-5 h-5 mr-2" />
                Funnel Builder & Lead Magnets
              </CardTitle>
              <CardDescription className="text-gray-400">
                Create high-converting funnels and lead magnets to capture and nurture leads
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => setShowFunnelForm(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Funnel
              </Button>
              <Button 
                onClick={() => setShowMagnetForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Magnet className="w-4 h-4 mr-2" />
                New Lead Magnet
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="funnels" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
              <TabsTrigger value="funnels" className="text-white data-[state=active]:bg-purple-600">
                <Zap className="w-4 h-4 mr-2" />
                Funnels
              </TabsTrigger>
              <TabsTrigger value="magnets" className="text-white data-[state=active]:bg-purple-600">
                <Magnet className="w-4 h-4 mr-2" />
                Lead Magnets
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-purple-600">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="templates" className="text-white data-[state=active]:bg-purple-600">
                <Target className="w-4 h-4 mr-2" />
                Templates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="funnels" className="space-y-6">
              {/* Funnel Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-card text-center">
                  <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{funnels.length}</p>
                  <p className="text-sm text-gray-400">Total Funnels</p>
                </div>
                <div className="glass-card text-center">
                  <Play className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{funnels.filter(f => f.status === 'active').length}</p>
                  <p className="text-sm text-gray-400">Active Funnels</p>
                </div>
                <div className="glass-card text-center">
                  <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">
                    {funnels.reduce((sum, f) => sum + f.analytics.conversion_rate, 0) / funnels.length || 0}%
                  </p>
                  <p className="text-sm text-gray-400">Avg Conversion</p>
                </div>
                <div className="glass-card text-center">
                  <DollarSign className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">
                    ${funnels.reduce((sum, f) => sum + f.analytics.revenue, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">Total Revenue</p>
                </div>
              </div>

              {/* Funnels List */}
              <div className="space-y-4">
                {funnels.map((funnel) => (
                  <div key={funnel.id} className="glass-card">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{funnel.name}</h3>
                        <p className="text-gray-400">{funnel.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(funnel.status)}>
                          {funnel.status}
                        </Badge>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Edit
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">{funnel.analytics.views.toLocaleString()}</p>
                        <p className="text-sm text-gray-400">Views</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">{funnel.analytics.conversions}</p>
                        <p className="text-sm text-gray-400">Conversions</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">{funnel.analytics.conversion_rate}%</p>
                        <p className="text-sm text-gray-400">Conversion Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">${funnel.analytics.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-400">Revenue</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-400 mb-2">Funnel Steps ({funnel.steps.length})</p>
                      <div className="flex space-x-2">
                        {funnel.steps.map((step, index) => (
                          <div key={step.id} className="flex items-center">
                            <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                              {step.name}
                            </div>
                            {index < funnel.steps.length - 1 && (
                              <div className="w-4 h-0.5 bg-gray-600 mx-2"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="magnets" className="space-y-6">
              {/* Lead Magnets Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card text-center">
                  <Magnet className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{leadMagnets.length}</p>
                  <p className="text-sm text-gray-400">Lead Magnets</p>
                </div>
                <div className="glass-card text-center">
                  <Download className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">
                    {leadMagnets.reduce((sum, m) => sum + m.downloads, 0)}
                  </p>
                  <p className="text-sm text-gray-400">Total Downloads</p>
                </div>
                <div className="glass-card text-center">
                  <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">
                    {leadMagnets.reduce((sum, m) => sum + m.conversion_rate, 0) / leadMagnets.length || 0}%
                  </p>
                  <p className="text-sm text-gray-400">Avg Conversion</p>
                </div>
              </div>

              {/* Lead Magnets List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {leadMagnets.map((magnet) => (
                  <div key={magnet.id} className="glass-card">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{magnet.title}</h3>
                        <p className="text-gray-400">{magnet.description}</p>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400">
                        {magnet.type}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-xl font-bold text-white">{magnet.downloads}</p>
                        <p className="text-sm text-gray-400">Downloads</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-white">{magnet.conversion_rate}%</p>
                        <p className="text-sm text-gray-400">Conversion Rate</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Form Fields:</p>
                      <div className="flex flex-wrap gap-2">
                        {magnet.form_fields.map((field) => (
                          <Badge key={field.id} variant="outline" className="text-purple-400 border-purple-400">
                            {field.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        View Landing Page
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Funnel Performance Trends</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={funnelPerformanceData}>
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
                          dataKey="conversions" 
                          stroke="#8b5cf6" 
                          strokeWidth={3}
                          name="Conversions"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#10b981" 
                          strokeWidth={3}
                          name="Revenue ($)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Lead Magnet Performance</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={leadMagnets}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="title" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#fff'
                          }} 
                        />
                        <Bar dataKey="downloads" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Lead Capture Funnel', description: 'Simple email capture with thank you page' },
                  { name: 'Product Launch Funnel', description: 'Multi-step product launch sequence' },
                  { name: 'Webinar Funnel', description: 'Registration to replay sequence' },
                  { name: 'SaaS Trial Funnel', description: 'Free trial to paid conversion' },
                  { name: 'eBook Download Funnel', description: 'Content upgrade lead magnet' },
                  { name: 'Consultation Funnel', description: 'Service booking and qualification' },
                ].map((template) => (
                  <div key={template.name} className="glass-card">
                    <h4 className="text-white font-medium mb-2">{template.name}</h4>
                    <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Use Template
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Funnel Creation Form */}
      {showFunnelForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Create New Funnel</h2>
            <form onSubmit={handleCreateFunnel} className="space-y-4">
              <div>
                <Label className="text-white">Funnel Name</Label>
                <Input
                  value={newFunnel.name}
                  onChange={(e) => setNewFunnel(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              
              <div>
                <Label className="text-white">Description</Label>
                <Textarea
                  value={newFunnel.description}
                  onChange={(e) => setNewFunnel(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-4">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Create Funnel
                </Button>
                <Button type="button" onClick={() => setShowFunnelForm(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lead Magnet Creation Form */}
      {showMagnetForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Create Lead Magnet</h2>
            <form onSubmit={handleCreateMagnet} className="space-y-4">
              <div>
                <Label className="text-white">Title</Label>
                <Input
                  value={newMagnet.title}
                  onChange={(e) => setNewMagnet(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              
              <div>
                <Label className="text-white">Description</Label>
                <Textarea
                  value={newMagnet.description}
                  onChange={(e) => setNewMagnet(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                />
              </div>
              
              <div>
                <Label className="text-white">Type</Label>
                <Select value={newMagnet.type} onValueChange={(value) => setNewMagnet(prev => ({ ...prev, type: value as any }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="ebook">eBook</SelectItem>
                    <SelectItem value="checklist">Checklist</SelectItem>
                    <SelectItem value="template">Template</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Create Lead Magnet
                </Button>
                <Button type="button" onClick={() => setShowMagnetForm(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FunnelBuilderDashboard;
