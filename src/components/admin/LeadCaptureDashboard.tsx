import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useLeadCapture, LeadCaptureForm } from '@/hooks/useLeadCapture';
import { FormInput, MousePointer, TrendingUp, Eye, Users, Plus, Edit, Trash2, Copy, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const LeadCaptureDashboard = () => {
  const { forms, submissions, loading, fetchForms, createForm, updateForm, deleteForm, fetchSubmissions } = useLeadCapture();
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    type: 'popup',
    title: '',
    description: '',
    fields: [] as any[],
    success_message: 'Thank you for subscribing!',
    redirect_url: '',
    display_rules: {},
    design_config: {},
    is_active: true
  });

  useEffect(() => {
    fetchForms();
    fetchSubmissions();
  }, []);

  const handleCreateForm = async () => {
    try {
      await createForm(formData);
      setIsCreateFormOpen(false);
      setFormData({
        name: '',
        type: 'popup',
        title: '',
        description: '',
        fields: [],
        success_message: 'Thank you for subscribing!',
        redirect_url: '',
        display_rules: {},
        design_config: {},
        is_active: true
      });
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  const stats = [
    { 
      label: 'Total Forms', 
      value: forms.length, 
      icon: FormInput, 
      trend: '+8%',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'Total Views', 
      value: forms.reduce((sum, f) => sum + f.total_views, 0), 
      icon: Eye, 
      trend: '+45%',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Total Submissions', 
      value: forms.reduce((sum, f) => sum + f.total_submissions, 0), 
      icon: Users, 
      trend: '+28%',
      color: 'from-green-500 to-green-600'
    },
    { 
      label: 'Avg Conversion', 
      value: forms.length > 0 
        ? `${(forms.reduce((sum, f) => sum + f.conversion_rate, 0) / forms.length).toFixed(1)}%` 
        : '0%', 
      icon: TrendingUp, 
      trend: '+12%',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const formTypes = [
    { value: 'popup', label: 'Popup' },
    { value: 'inline', label: 'Inline' },
    { value: 'slide-in', label: 'Slide-in' },
    { value: 'banner', label: 'Banner' },
    { value: 'full-screen', label: 'Full Screen' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-background/95 to-background border-border/50 hover:border-purple-500/50">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
                  {stat.trend}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="forms" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-background/50 backdrop-blur-sm border border-border/50">
          <TabsTrigger value="forms" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <FormInput className="w-4 h-4 mr-2" />
            Lead Forms
          </TabsTrigger>
          <TabsTrigger value="submissions" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" />
            Submissions
          </TabsTrigger>
        </TabsList>

        {/* Forms Tab */}
        <TabsContent value="forms" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Lead Capture Forms</h2>
              <p className="text-sm text-muted-foreground">Convert visitors into subscribers</p>
            </div>
            <Dialog open={isCreateFormOpen} onOpenChange={setIsCreateFormOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/20">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Form
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-xl border-border/50">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Create Lead Capture Form</DialogTitle>
                  <DialogDescription>Design a form to capture leads</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="form-name">Form Name</Label>
                      <Input
                        id="form-name"
                        placeholder="Newsletter Signup"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-background/50 border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="form-type">Form Type</Label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                        <SelectTrigger className="bg-background/50 border-border/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {formTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="form-title">Form Title</Label>
                    <Input
                      id="form-title"
                      placeholder="Join Our Newsletter"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="form-description">Description</Label>
                    <Textarea
                      id="form-description"
                      placeholder="Get weekly updates..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="success-message">Success Message</Label>
                    <Input
                      id="success-message"
                      placeholder="Thank you for subscribing!"
                      value={formData.success_message}
                      onChange={(e) => setFormData({ ...formData, success_message: e.target.value })}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="active">Activate immediately</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateFormOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateForm} className="bg-gradient-to-r from-purple-600 to-purple-700">
                    Create Form
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {forms.map((form) => (
              <Card key={form.id} className="group hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm border-border/50 hover:border-purple-500/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl flex items-center gap-2">
                        {form.name}
                        {form.is_active ? (
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Active</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-gray-500/10">Inactive</Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="line-clamp-1">{form.title}</CardDescription>
                      <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                        {formTypes.find(t => t.value === form.type)?.label}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteForm(form.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <Eye className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                        <p className="text-xl font-bold text-foreground">{form.total_views}</p>
                        <p className="text-xs text-muted-foreground">Views</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <Users className="w-5 h-5 mx-auto mb-1 text-green-400" />
                        <p className="text-xl font-bold text-foreground">{form.total_submissions}</p>
                        <p className="text-xs text-muted-foreground">Submissions</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <TrendingUp className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                        <p className="text-xl font-bold text-foreground">{form.conversion_rate.toFixed(1)}%</p>
                        <p className="text-xs text-muted-foreground">Conv. Rate</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Conversion Rate</span>
                        <span className="font-medium text-foreground">{form.conversion_rate.toFixed(1)}%</span>
                      </div>
                      <Progress value={form.conversion_rate} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {forms.length === 0 && !loading && (
            <Card className="border-dashed border-2 border-border/50 bg-background/30">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FormInput className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center mb-2">No lead capture forms yet</p>
                <p className="text-sm text-muted-foreground/60 text-center mb-4">Create forms to capture leads from visitors</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Submissions Tab */}
        <TabsContent value="submissions" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Form Submissions</h2>
              <p className="text-sm text-muted-foreground">View and manage captured leads</p>
            </div>
            <Select value={selectedForm || ''} onValueChange={setSelectedForm}>
              <SelectTrigger className="w-[200px] bg-background/50 border-border/50">
                <SelectValue placeholder="All Forms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Forms</SelectItem>
                {forms.map(form => (
                  <SelectItem key={form.id} value={form.id}>{form.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card className="bg-background/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border/30">
                    <tr className="text-left text-sm text-muted-foreground">
                      <th className="p-4 font-medium">Email</th>
                      <th className="p-4 font-medium">Form</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Source</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {submissions.slice(0, 10).map((submission) => (
                      <tr key={submission.id} className="hover:bg-purple-500/5 transition-colors">
                        <td className="p-4 text-foreground font-medium">{submission.email}</td>
                        <td className="p-4 text-muted-foreground">
                          {forms.find(f => f.id === submission.form_id)?.name || 'Unknown'}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {new Date(submission.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                            {new URL(submission.source_url || window.location.href).hostname}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {submissions.length === 0 && !loading && (
            <Card className="border-dashed border-2 border-border/50 bg-background/30">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center mb-2">No submissions yet</p>
                <p className="text-sm text-muted-foreground/60 text-center">Submissions will appear here once users fill out your forms</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};