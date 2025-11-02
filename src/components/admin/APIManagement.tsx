import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Key, Webhook, Copy, Eye, EyeOff, Plus, Trash2, Activity, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface APIKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  requests: number;
  status: 'active' | 'revoked';
}

interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive';
  lastTriggered: string;
}

export const APIManagement = () => {
  const { toast } = useToast();
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Production API',
      key: 'sk_live_xxxxxxxxxxxxxxxxxxxxxxxx',
      created: '2024-01-01',
      lastUsed: '2 hours ago',
      requests: 15420,
      status: 'active'
    },
    {
      id: '2',
      name: 'Development API',
      key: 'sk_test_xxxxxxxxxxxxxxxxxxxxxxxx',
      created: '2024-01-10',
      lastUsed: '5 minutes ago',
      requests: 3201,
      status: 'active'
    }
  ]);

  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([
    {
      id: '1',
      url: 'https://api.example.com/webhooks/contact',
      events: ['contact.created', 'contact.updated'],
      status: 'active',
      lastTriggered: '10 minutes ago'
    },
    {
      id: '2',
      url: 'https://api.example.com/webhooks/lead',
      events: ['lead.converted'],
      status: 'active',
      lastTriggered: '1 hour ago'
    }
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "API key copied to clipboard",
    });
  };

  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const revokeKey = (id: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === id ? { ...key, status: 'revoked' as const } : key
    ));
    toast({
      title: "API Key Revoked",
      description: "The API key has been revoked successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Key className="h-4 w-4 text-primary" />
              Active Keys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{apiKeys.filter(k => k.status === 'active').length}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Total Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {apiKeys.reduce((sum, key) => sum + key.requests, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Webhook className="h-4 w-4 text-primary" />
              Webhooks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{webhooks.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Rate Limit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1000/h</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="keys">
        <TabsList>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="ratelimits">Rate Limits</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">API Keys</h3>
              <p className="text-sm text-muted-foreground">Manage your API authentication keys</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Key
            </Button>
          </div>

          <div className="space-y-3">
            {apiKeys.map((key) => (
              <Card key={key.id} className="bg-card border-border/50">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{key.name}</h4>
                        <p className="text-sm text-muted-foreground">Created {key.created}</p>
                      </div>
                      <Badge variant={key.status === 'active' ? 'default' : 'secondary'}>
                        {key.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Input
                        type={showKeys[key.id] ? 'text' : 'password'}
                        value={key.key}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleKeyVisibility(key.id)}
                      >
                        {showKeys[key.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(key.key)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Last Used:</span>
                        <p className="font-medium">{key.lastUsed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Requests:</span>
                        <p className="font-medium">{key.requests.toLocaleString()}</p>
                      </div>
                      <div className="flex justify-end">
                        {key.status === 'active' && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => revokeKey(key.id)}
                            className="gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Revoke
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Webhook Endpoints</h3>
              <p className="text-sm text-muted-foreground">Configure event-driven webhooks</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Webhook
            </Button>
          </div>

          <div className="space-y-3">
            {webhooks.map((webhook) => (
              <Card key={webhook.id} className="bg-card border-border/50">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-mono text-sm">{webhook.url}</p>
                        <p className="text-sm text-muted-foreground">Last triggered: {webhook.lastTriggered}</p>
                      </div>
                      <Badge variant={webhook.status === 'active' ? 'default' : 'secondary'}>
                        {webhook.status}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Subscribed Events:</p>
                      <div className="flex flex-wrap gap-2">
                        {webhook.events.map((event, idx) => (
                          <Badge key={idx} variant="outline">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">Test</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ratelimits" className="space-y-4">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle>Rate Limit Configuration</CardTitle>
              <CardDescription>Set request limits per API key</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Requests per Hour</Label>
                  <Input type="number" defaultValue="1000" />
                </div>
                <div className="grid gap-2">
                  <Label>Requests per Minute</Label>
                  <Input type="number" defaultValue="60" />
                </div>
                <div className="grid gap-2">
                  <Label>Burst Limit</Label>
                  <Input type="number" defaultValue="100" />
                </div>
              </div>
              <Button>Save Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-4">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Integration guides and API reference</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h3>Authentication</h3>
                <p>Include your API key in the Authorization header:</p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>Authorization: Bearer YOUR_API_KEY</code>
                </pre>

                <h3>Base URL</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>https://api.example.com/v1</code>
                </pre>

                <h3>Example Request</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{`curl -X GET https://api.example.com/v1/contacts \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default APIManagement;
