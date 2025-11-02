import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Server, CheckCircle2, XCircle, ArrowRight, GitBranch, Settings, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Environment {
  id: string;
  name: string;
  type: 'development' | 'staging' | 'production';
  url: string;
  status: 'active' | 'inactive';
  lastDeployed: string;
  version: string;
}

export const EnvironmentManagement = () => {
  const { toast } = useToast();
  const [environments, setEnvironments] = useState<Environment[]>([
    {
      id: '1',
      name: 'Development',
      type: 'development',
      url: 'https://dev.example.com',
      status: 'active',
      lastDeployed: '2024-01-15 10:30',
      version: '1.0.0-dev'
    },
    {
      id: '2',
      name: 'Staging',
      type: 'staging',
      url: 'https://staging.example.com',
      status: 'active',
      lastDeployed: '2024-01-14 15:45',
      version: '1.0.0-rc1'
    },
    {
      id: '3',
      name: 'Production',
      type: 'production',
      url: 'https://example.com',
      status: 'active',
      lastDeployed: '2024-01-10 09:00',
      version: '1.0.0'
    }
  ]);

  const [selectedEnv, setSelectedEnv] = useState<string>('');
  const [targetEnv, setTargetEnv] = useState<string>('');

  const promoteContent = () => {
    if (!selectedEnv || !targetEnv) {
      toast({
        title: "Selection Required",
        description: "Please select both source and target environments",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Content Promoted",
      description: `Successfully promoted content from ${selectedEnv} to ${targetEnv}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {environments.map((env) => (
          <Card key={env.id} className="bg-card border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{env.name}</CardTitle>
                </div>
                <Badge variant={env.status === 'active' ? 'default' : 'secondary'}>
                  {env.status}
                </Badge>
              </div>
              <CardDescription>{env.url}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version:</span>
                  <span className="font-mono">{env.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Deploy:</span>
                  <span>{env.lastDeployed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status:</span>
                  {env.status === 'active' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Content Promotion Workflow
          </CardTitle>
          <CardDescription>
            Promote content and configurations between environments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Source Environment</Label>
              <Select value={selectedEnv} onValueChange={setSelectedEnv}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  {environments.map((env) => (
                    <SelectItem key={env.id} value={env.name}>
                      {env.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end justify-center">
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
            </div>

            <div className="space-y-2">
              <Label>Target Environment</Label>
              <Select value={targetEnv} onValueChange={setTargetEnv}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target" />
                </SelectTrigger>
                <SelectContent>
                  {environments.map((env) => (
                    <SelectItem key={env.id} value={env.name}>
                      {env.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={promoteContent} className="gap-2">
              <GitBranch className="h-4 w-4" />
              Promote Content
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Environment Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="variables">
            <TabsList>
              <TabsTrigger value="variables">Variables</TabsTrigger>
              <TabsTrigger value="features">Feature Flags</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
            </TabsList>

            <TabsContent value="variables" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>API Base URL</Label>
                  <Input placeholder="https://api.example.com" />
                </div>
                <div className="grid gap-2">
                  <Label>CDN URL</Label>
                  <Input placeholder="https://cdn.example.com" />
                </div>
                <div className="grid gap-2">
                  <Label>Analytics ID</Label>
                  <Input placeholder="UA-XXXXXXXXX-X" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">New Dashboard</p>
                    <p className="text-sm text-muted-foreground">Enable redesigned admin dashboard</p>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Beta Features</p>
                    <p className="text-sm text-muted-foreground">Access to experimental features</p>
                  </div>
                  <Badge variant="secondary">Disabled</Badge>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="database" className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">PostgreSQL</p>
                      <p className="text-sm text-muted-foreground">Primary database</p>
                    </div>
                  </div>
                  <Badge variant="default">Connected</Badge>
                </div>
                <div className="grid gap-2">
                  <Label>Connection Pool Size</Label>
                  <Input type="number" defaultValue="20" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnvironmentManagement;
