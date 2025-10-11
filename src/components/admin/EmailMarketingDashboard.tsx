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
import { useEmailMarketing, DripCampaign, EmailTemplate } from '@/hooks/useEmailMarketing';
import { Mail, Send, Calendar, Users, TrendingUp, Plus, Edit, Trash2, Play, Pause, Copy, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const EmailMarketingDashboard = () => {
  const { dripCampaigns, templates, loading, fetchDripCampaigns, createDripCampaign, updateDripCampaign, deleteDripCampaign, fetchTemplates, createTemplate } = useEmailMarketing();
  const { toast } = useToast();
  const [selectedCampaign, setSelectedCampaign] = useState<DripCampaign | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);

  const [campaignForm, setCampaignForm] = useState({
    name: '',
    description: '',
    trigger_type: 'manual',
    trigger_config: {},
    emails: [] as any[],
    is_active: false
  });

  const [templateForm, setTemplateForm] = useState({
    name: '',
    subject: '',
    html_content: '',
    text_content: '',
    category: 'general',
    variables: [] as any[],
    is_active: true
  });

  useEffect(() => {
    fetchDripCampaigns();
    fetchTemplates();
  }, []);

  const handleCreateCampaign = async () => {
    try {
      await createDripCampaign(campaignForm);
      setIsCreateCampaignOpen(false);
      setCampaignForm({
        name: '',
        description: '',
        trigger_type: 'manual',
        trigger_config: {},
        emails: [],
        is_active: false
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleCreateTemplate = async () => {
    try {
      await createTemplate(templateForm);
      setIsCreateTemplateOpen(false);
      setTemplateForm({
        name: '',
        subject: '',
        html_content: '',
        text_content: '',
        category: 'general',
        variables: [],
        is_active: true
      });
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  const toggleCampaignStatus = async (campaign: DripCampaign) => {
    try {
      await updateDripCampaign(campaign.id, { is_active: !campaign.is_active });
    } catch (error) {
      console.error('Error toggling campaign:', error);
    }
  };

  const stats = [
    { 
      label: 'Total Campaigns', 
      value: dripCampaigns.length, 
      icon: Mail, 
      trend: '+12%',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'Active Campaigns', 
      value: dripCampaigns.filter(c => c.is_active).length, 
      icon: Play, 
      trend: '+8%',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Total Enrolled', 
      value: dripCampaigns.reduce((sum, c) => sum + c.total_enrolled, 0), 
      icon: Users, 
      trend: '+24%',
      color: 'from-green-500 to-green-600'
    },
    { 
      label: 'Templates', 
      value: templates.length, 
      icon: Copy, 
      trend: '+5%',
      color: 'from-orange-500 to-orange-600'
    }
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
                <p className="text-3xl font-bold text-foreground">{stat.value.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-background/50 backdrop-blur-sm border border-border/50">
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Mail className="w-4 h-4 mr-2" />
            Drip Campaigns
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Copy className="w-4 h-4 mr-2" />
            Email Templates
          </TabsTrigger>
        </TabsList>

        {/* Drip Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Drip Campaigns</h2>
              <p className="text-sm text-muted-foreground">Automated email sequences</p>
            </div>
            <Dialog open={isCreateCampaignOpen} onOpenChange={setIsCreateCampaignOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/20">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-xl border-border/50">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Create Drip Campaign</DialogTitle>
                  <DialogDescription>Set up an automated email sequence</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input
                      id="name"
                      placeholder="Welcome Series"
                      value={campaignForm.name}
                      onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your campaign..."
                      value={campaignForm.description}
                      onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trigger">Trigger Type</Label>
                    <Select value={campaignForm.trigger_type} onValueChange={(value) => setCampaignForm({ ...campaignForm, trigger_type: value })}>
                      <SelectTrigger className="bg-background/50 border-border/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="signup">On Signup</SelectItem>
                        <SelectItem value="purchase">After Purchase</SelectItem>
                        <SelectItem value="abandoned_cart">Abandoned Cart</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={campaignForm.is_active}
                      onCheckedChange={(checked) => setCampaignForm({ ...campaignForm, is_active: checked })}
                    />
                    <Label htmlFor="active">Activate immediately</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateCampaignOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateCampaign} className="bg-gradient-to-r from-purple-600 to-purple-700">
                    Create Campaign
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {dripCampaigns.map((campaign) => (
              <Card key={campaign.id} className="group hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm border-border/50 hover:border-purple-500/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl flex items-center gap-2">
                        {campaign.name}
                        {campaign.is_active ? (
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Active</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-gray-500/10 text-gray-400">Paused</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{campaign.description}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toggleCampaignStatus(campaign)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {campaign.is_active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteDripCampaign(campaign.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <p className="text-2xl font-bold text-foreground">{campaign.total_enrolled}</p>
                      <p className="text-xs text-muted-foreground">Enrolled</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-2xl font-bold text-foreground">{campaign.total_completed}</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <p className="text-2xl font-bold text-foreground">{campaign.emails.length}</p>
                      <p className="text-xs text-muted-foreground">Emails</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    Trigger: <span className="ml-1 font-medium text-foreground">{campaign.trigger_type}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {dripCampaigns.length === 0 && !loading && (
            <Card className="border-dashed border-2 border-border/50 bg-background/30">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Mail className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center mb-2">No drip campaigns yet</p>
                <p className="text-sm text-muted-foreground/60 text-center mb-4">Create your first automated email sequence</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Email Templates</h2>
              <p className="text-sm text-muted-foreground">Reusable email designs</p>
            </div>
            <Dialog open={isCreateTemplateOpen} onOpenChange={setIsCreateTemplateOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/20">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl bg-background/95 backdrop-blur-xl border-border/50">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Create Email Template</DialogTitle>
                  <DialogDescription>Design a reusable email template</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="template-name">Template Name</Label>
                      <Input
                        id="template-name"
                        placeholder="Welcome Email"
                        value={templateForm.name}
                        onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                        className="bg-background/50 border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={templateForm.category} onValueChange={(value) => setTemplateForm({ ...templateForm, category: value })}>
                        <SelectTrigger className="bg-background/50 border-border/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="welcome">Welcome</SelectItem>
                          <SelectItem value="promotional">Promotional</SelectItem>
                          <SelectItem value="transactional">Transactional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input
                      id="subject"
                      placeholder="Welcome to our platform!"
                      value={templateForm.subject}
                      onChange={(e) => setTemplateForm({ ...templateForm, subject: e.target.value })}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="html-content">HTML Content</Label>
                    <Textarea
                      id="html-content"
                      placeholder="<html>...</html>"
                      value={templateForm.html_content}
                      onChange={(e) => setTemplateForm({ ...templateForm, html_content: e.target.value })}
                      className="min-h-[200px] font-mono text-sm bg-background/50 border-border/50"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateTemplateOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateTemplate} className="bg-gradient-to-r from-purple-600 to-purple-700">
                    Create Template
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm border-border/50 hover:border-purple-500/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                        {template.category}
                      </Badge>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{template.subject}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Variables: {template.variables.length}</span>
                    {template.is_active ? (
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Active</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-500/10">Inactive</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {templates.length === 0 && !loading && (
            <Card className="border-dashed border-2 border-border/50 bg-background/30">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Copy className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center mb-2">No email templates yet</p>
                <p className="text-sm text-muted-foreground/60 text-center mb-4">Create reusable email designs</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};