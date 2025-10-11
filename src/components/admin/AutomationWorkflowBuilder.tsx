import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAutomationWorkflows } from '@/hooks/useAutomationWorkflows';
import { Workflow, Zap, Plus, Play, Pause, Trash2, GitBranch, Mail, Tag, Users, Target, TrendingUp, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AutomationWorkflowBuilder = () => {
  const { workflows, loading, fetchWorkflows, createWorkflow, updateWorkflow, deleteWorkflow } = useAutomationWorkflows();
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);

  const [workflowForm, setWorkflowForm] = useState({
    name: '',
    description: '',
    trigger_type: 'form_submission',
    trigger_config: {},
    workflow_steps: [] as any[],
    is_active: false
  });

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const triggerTypes = [
    { value: 'form_submission', label: 'Form Submission', icon: Mail },
    { value: 'tag_added', label: 'Tag Added', icon: Tag },
    { value: 'segment_join', label: 'Joined Segment', icon: Users },
    { value: 'page_visit', label: 'Page Visit', icon: Target },
    { value: 'email_opened', label: 'Email Opened', icon: Mail },
    { value: 'link_clicked', label: 'Link Clicked', icon: CheckCircle },
  ];

  const actionTypes = [
    { value: 'send_email', label: 'Send Email', icon: Mail, color: 'from-blue-500 to-blue-600' },
    { value: 'add_tag', label: 'Add Tag', icon: Tag, color: 'from-green-500 to-green-600' },
    { value: 'add_to_segment', label: 'Add to Segment', icon: Users, color: 'from-purple-500 to-purple-600' },
    { value: 'enroll_drip', label: 'Enroll in Drip', icon: GitBranch, color: 'from-orange-500 to-orange-600' },
    { value: 'wait', label: 'Wait', icon: Pause, color: 'from-gray-500 to-gray-600' },
  ];

  const handleCreateWorkflow = async () => {
    try {
      await createWorkflow(workflowForm);
      setIsCreateOpen(false);
      setWorkflowForm({
        name: '',
        description: '',
        trigger_type: 'form_submission',
        trigger_config: {},
        workflow_steps: [],
        is_active: false
      });
    } catch (error) {
      console.error('Error creating workflow:', error);
    }
  };

  const addStep = (type: string) => {
    const newStep = {
      id: `step_${Date.now()}`,
      type,
      name: `${actionTypes.find(a => a.value === type)?.label} Step`,
      config: {}
    };
    setWorkflowForm({
      ...workflowForm,
      workflow_steps: [...workflowForm.workflow_steps, newStep]
    });
  };

  const removeStep = (index: number) => {
    setWorkflowForm({
      ...workflowForm,
      workflow_steps: workflowForm.workflow_steps.filter((_, i) => i !== index)
    });
  };

  const stats = [
    { 
      label: 'Total Workflows', 
      value: workflows.length, 
      icon: Workflow, 
      trend: '+12%',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'Active Workflows', 
      value: workflows.filter(w => w.is_active).length, 
      icon: Play, 
      trend: '+18%',
      color: 'from-green-500 to-green-600'
    },
    { 
      label: 'Total Runs', 
      value: workflows.reduce((sum, w) => sum + w.total_runs, 0), 
      icon: Zap, 
      trend: '+45%',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Success Rate', 
      value: workflows.length > 0 
        ? `${(workflows.reduce((sum, w) => sum + w.success_rate, 0) / workflows.length).toFixed(1)}%`
        : '0%', 
      icon: TrendingUp, 
      trend: '+8%',
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
                <p className="text-3xl font-bold text-foreground">{typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Automation Workflows</h2>
          <p className="text-sm text-muted-foreground">Build automated marketing sequences</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/20">
              <Plus className="w-4 h-4 mr-2" />
              Create Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-xl border-border/50 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Create Automation Workflow</DialogTitle>
              <DialogDescription>Design a multi-step automation sequence</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workflow-name">Workflow Name</Label>
                  <Input
                    id="workflow-name"
                    placeholder="Welcome Automation"
                    value={workflowForm.name}
                    onChange={(e) => setWorkflowForm({ ...workflowForm, name: e.target.value })}
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trigger">Trigger</Label>
                  <Select value={workflowForm.trigger_type} onValueChange={(value) => setWorkflowForm({ ...workflowForm, trigger_type: value })}>
                    <SelectTrigger className="bg-background/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {triggerTypes.map(trigger => (
                        <SelectItem key={trigger.value} value={trigger.value}>
                          <div className="flex items-center gap-2">
                            <trigger.icon className="w-4 h-4" />
                            {trigger.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe this workflow..."
                  value={workflowForm.description}
                  onChange={(e) => setWorkflowForm({ ...workflowForm, description: e.target.value })}
                  className="bg-background/50 border-border/50"
                />
              </div>

              {/* Workflow Steps Builder */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Workflow Steps</Label>
                  <Select onValueChange={addStep}>
                    <SelectTrigger className="w-[200px] bg-background/50 border-border/50">
                      <SelectValue placeholder="Add Step" />
                    </SelectTrigger>
                    <SelectContent>
                      {actionTypes.map(action => (
                        <SelectItem key={action.value} value={action.value}>
                          <div className="flex items-center gap-2">
                            <action.icon className="w-4 h-4" />
                            {action.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Steps Timeline */}
                <div className="space-y-3">
                  {workflowForm.workflow_steps.length === 0 ? (
                    <Card className="border-dashed border-2 border-border/50 bg-background/30">
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <GitBranch className="w-8 h-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">No steps added yet</p>
                        <p className="text-xs text-muted-foreground/60">Add steps to build your workflow</p>
                      </CardContent>
                    </Card>
                  ) : (
                    workflowForm.workflow_steps.map((step, index) => {
                      const actionType = actionTypes.find(a => a.value === step.type);
                      return (
                        <div key={step.id} className="relative">
                          {index > 0 && (
                            <div className="absolute left-6 -top-3 w-0.5 h-3 bg-gradient-to-b from-purple-500/50 to-transparent" />
                          )}
                          <Card className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-purple-500/50 transition-all">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-lg bg-gradient-to-br ${actionType?.color} bg-opacity-10`}>
                                    {actionType?.icon && <actionType.icon className="w-5 h-5 text-white" />}
                                  </div>
                                  <div>
                                    <p className="font-medium text-foreground">{step.name}</p>
                                    <p className="text-xs text-muted-foreground">Step {index + 1}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                                    {actionType?.label}
                                  </Badge>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => removeStep(index)}
                                    className="text-red-400 hover:text-red-300"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={workflowForm.is_active}
                  onCheckedChange={(checked) => setWorkflowForm({ ...workflowForm, is_active: checked })}
                />
                <Label htmlFor="active">Activate immediately</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateWorkflow} className="bg-gradient-to-r from-purple-600 to-purple-700">
                Create Workflow
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="group hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm border-border/50 hover:border-purple-500/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl flex items-center gap-2">
                    {workflow.name}
                    {workflow.is_active ? (
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Active</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-500/10">Paused</Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{workflow.description}</CardDescription>
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                    {triggerTypes.find(t => t.value === workflow.trigger_type)?.label}
                  </Badge>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteWorkflow(workflow.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-xl font-bold text-foreground">{workflow.workflow_steps.length}</p>
                  <p className="text-xs text-muted-foreground">Steps</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-xl font-bold text-foreground">{workflow.total_runs}</p>
                  <p className="text-xs text-muted-foreground">Runs</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="text-xl font-bold text-foreground">{workflow.success_rate.toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">Success</p>
                </div>
              </div>
              <div className="space-y-2">
                {workflow.workflow_steps.slice(0, 3).map((step: any, idx: number) => {
                  const actionType = actionTypes.find(a => a.value === step.type);
                  return (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      {actionType?.icon && <actionType.icon className="w-4 h-4" />}
                      <span>{step.name}</span>
                    </div>
                  );
                })}
                {workflow.workflow_steps.length > 3 && (
                  <p className="text-xs text-muted-foreground">+{workflow.workflow_steps.length - 3} more steps</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {workflows.length === 0 && !loading && (
        <Card className="border-dashed border-2 border-border/50 bg-background/30">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Workflow className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-2">No workflows yet</p>
            <p className="text-sm text-muted-foreground/60 text-center mb-4">Create automated sequences to nurture leads</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};