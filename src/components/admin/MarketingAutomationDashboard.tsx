import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Zap, 
  Mail, 
  Clock, 
  Users, 
  TrendingUp, 
  Play, 
  Pause, 
  Edit,
  Plus,
  Settings,
  BarChart3
} from 'lucide-react';

interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  status: 'active' | 'paused' | 'draft';
  totalRuns: number;
  successRate: number;
  steps: WorkflowStep[];
}

interface WorkflowStep {
  id: string;
  type: 'email' | 'delay' | 'condition' | 'action';
  title: string;
  config: any;
}

const MarketingAutomationDashboard = () => {
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>([
    {
      id: '1',
      name: 'Welcome Email Series',
      description: 'Send welcome emails to new subscribers',
      trigger: 'user_signup',
      status: 'active',
      totalRuns: 234,
      successRate: 94.5,
      steps: [
        { id: '1', type: 'email', title: 'Welcome Email', config: {} },
        { id: '2', type: 'delay', title: 'Wait 2 days', config: { delay: 2 } },
        { id: '3', type: 'email', title: 'Getting Started Guide', config: {} }
      ]
    },
    {
      id: '2',
      name: 'Abandoned Cart Recovery',
      description: 'Recover abandoned cart conversions',
      trigger: 'cart_abandoned',
      status: 'active',
      totalRuns: 156,
      successRate: 23.1,
      steps: [
        { id: '1', type: 'delay', title: 'Wait 1 hour', config: { delay: 1 } },
        { id: '2', type: 'email', title: 'Cart Reminder', config: {} },
        { id: '3', type: 'delay', title: 'Wait 24 hours', config: { delay: 24 } },
        { id: '4', type: 'email', title: 'Discount Offer', config: {} }
      ]
    }
  ]);

  const [selectedWorkflow, setSelectedWorkflow] = useState<AutomationWorkflow | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateWorkflow = () => {
    setIsCreating(true);
    setSelectedWorkflow({
      id: Date.now().toString(),
      name: '',
      description: '',
      trigger: '',
      status: 'draft',
      totalRuns: 0,
      successRate: 0,
      steps: []
    });
  };

  const handleSaveWorkflow = () => {
    if (selectedWorkflow) {
      if (isCreating) {
        setWorkflows([...workflows, selectedWorkflow]);
      } else {
        setWorkflows(workflows.map(w => 
          w.id === selectedWorkflow.id ? selectedWorkflow : w
        ));
      }
      setSelectedWorkflow(null);
      setIsCreating(false);
    }
  };

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows(workflows.map(w => 
      w.id === id 
        ? { ...w, status: w.status === 'active' ? 'paused' : 'active' as any }
        : w
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'delay': return <Clock className="h-4 w-4" />;
      case 'condition': return <Settings className="h-4 w-4" />;
      case 'action': return <Zap className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  if (selectedWorkflow) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            {isCreating ? 'Create Workflow' : 'Edit Workflow'}
          </h2>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => {
              setSelectedWorkflow(null);
              setIsCreating(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveWorkflow}>
              Save Workflow
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Workflow Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Workflow Name</Label>
                <Input
                  id="name"
                  value={selectedWorkflow.name}
                  onChange={(e) => setSelectedWorkflow({
                    ...selectedWorkflow,
                    name: e.target.value
                  })}
                  placeholder="Enter workflow name"
                />
              </div>
              <div>
                <Label htmlFor="trigger">Trigger Event</Label>
                <Select
                  value={selectedWorkflow.trigger}
                  onValueChange={(value) => setSelectedWorkflow({
                    ...selectedWorkflow,
                    trigger: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user_signup">User Signup</SelectItem>
                    <SelectItem value="cart_abandoned">Cart Abandoned</SelectItem>
                    <SelectItem value="purchase_complete">Purchase Complete</SelectItem>
                    <SelectItem value="form_submit">Form Submit</SelectItem>
                    <SelectItem value="page_visit">Page Visit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={selectedWorkflow.description}
                onChange={(e) => setSelectedWorkflow({
                  ...selectedWorkflow,
                  description: e.target.value
                })}
                placeholder="Describe what this workflow does"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workflow Steps</CardTitle>
            <CardDescription>Define the sequence of actions in your workflow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedWorkflow.steps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {getStepIcon(step.type)}
                      <span className="font-medium">{step.title}</span>
                      <Badge variant="outline">{step.type}</Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Marketing Automation</h2>
        <Button onClick={handleCreateWorkflow}>
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {workflows.filter(w => w.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {workflows.reduce((sum, w) => sum + w.totalRuns, 0)}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all workflows</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">87</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Workflows List */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Workflows</CardTitle>
          <CardDescription>Manage your marketing automation workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(workflow.status)}`} />
                    <div>
                      <h3 className="font-semibold">{workflow.name}</h3>
                      <p className="text-sm text-muted-foreground">{workflow.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{workflow.totalRuns} runs</div>
                      <div className="text-sm text-muted-foreground">{workflow.successRate}% success</div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {workflow.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleWorkflowStatus(workflow.id)}
                      >
                        {workflow.status === 'active' ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedWorkflow(workflow)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>Trigger: {workflow.trigger.replace('_', ' ')}</span>
                    <span>•</span>
                    <span>{workflow.steps.length} steps</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingAutomationDashboard;