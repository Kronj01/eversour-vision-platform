import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFunnelAnalytics } from "@/hooks/useFunnelAnalytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, TrendingDown, TrendingUp, Filter, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export const FunnelAnalyticsDashboard = () => {
  const { funnels, analysis, loading, createFunnel, updateFunnel, deleteFunnel, analyzeFunnel } = useFunnelAnalytics();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newFunnel, setNewFunnel] = useState({
    name: '',
    description: '',
    conversion_window_hours: 24,
    steps: [{ name: '', url: '', event: '' }]
  });
  const [selectedFunnelId, setSelectedFunnelId] = useState<string | null>(null);

  const handleCreateFunnel = async () => {
    try {
      await createFunnel({
        ...newFunnel,
        is_active: true,
        updated_at: new Date().toISOString()
      } as any);
      setIsCreateDialogOpen(false);
      setNewFunnel({
        name: '',
        description: '',
        conversion_window_hours: 24,
        steps: [{ name: '', url: '', event: '' }]
      });
    } catch (error) {
      console.error('Error creating funnel:', error);
    }
  };

  const handleAnalyzeFunnel = (funnelId: string) => {
    setSelectedFunnelId(funnelId);
    analyzeFunnel(funnelId);
  };

  const addStep = () => {
    setNewFunnel({
      ...newFunnel,
      steps: [...newFunnel.steps, { name: '', url: '', event: '' }]
    });
  };

  const updateStep = (index: number, field: string, value: string) => {
    const updatedSteps = [...newFunnel.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setNewFunnel({ ...newFunnel, steps: updatedSteps });
  };

  const selectedAnalysis = analysis.find(a => a.funnel_id === selectedFunnelId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Funnel Analytics</h2>
          <p className="text-muted-foreground">Track conversion funnels and identify drop-off points</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Funnel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Funnel</DialogTitle>
              <DialogDescription>Define the steps users take to complete a conversion</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Funnel Name</label>
                <Input
                  placeholder="e.g., Checkout Flow"
                  value={newFunnel.name}
                  onChange={(e) => setNewFunnel({ ...newFunnel, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input
                  placeholder="Brief description"
                  value={newFunnel.description}
                  onChange={(e) => setNewFunnel({ ...newFunnel, description: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Conversion Window (hours)</label>
                <Input
                  type="number"
                  value={newFunnel.conversion_window_hours}
                  onChange={(e) => setNewFunnel({ ...newFunnel, conversion_window_hours: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Funnel Steps</label>
                  <Button size="sm" variant="outline" onClick={addStep}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add Step
                  </Button>
                </div>
                {newFunnel.steps.map((step, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge>{index + 1}</Badge>
                        <Input
                          placeholder="Step name"
                          value={step.name}
                          onChange={(e) => updateStep(index, 'name', e.target.value)}
                        />
                      </div>
                      <Input
                        placeholder="URL (e.g., /checkout)"
                        value={step.url}
                        onChange={(e) => updateStep(index, 'url', e.target.value)}
                      />
                      <Input
                        placeholder="Event (optional)"
                        value={step.event || ''}
                        onChange={(e) => updateStep(index, 'event', e.target.value)}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateFunnel} disabled={!newFunnel.name || newFunnel.steps.length === 0}>
                Create Funnel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Funnels List */}
      <div className="grid gap-4">
        {funnels.map((funnel) => {
          const isAnalyzed = selectedFunnelId === funnel.id;
          return (
            <Card key={funnel.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{funnel.name}</CardTitle>
                    <CardDescription>{funnel.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={funnel.is_active ? "default" : "secondary"}>
                      {funnel.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    <Button
                      size="sm"
                      variant={isAnalyzed ? "secondary" : "outline"}
                      onClick={() => handleAnalyzeFunnel(funnel.id)}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      {isAnalyzed ? 'Analyzing...' : 'Analyze'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {isAnalyzed && selectedAnalysis && (
                <CardContent className="space-y-6">
                  {/* Overview Stats */}
                  <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Total Entered</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{selectedAnalysis.total_entered}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Completed</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{selectedAnalysis.total_completed}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Conversion Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold flex items-center">
                          {selectedAnalysis.conversion_rate}%
                          {selectedAnalysis.conversion_rate > 50 ? (
                            <TrendingUp className="h-5 w-5 ml-2 text-green-500" />
                          ) : (
                            <TrendingDown className="h-5 w-5 ml-2 text-red-500" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Avg Time</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold flex items-center">
                          <Clock className="h-5 w-5 mr-2" />
                          {Math.floor(selectedAnalysis.avg_time_to_complete / 60)}m
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Funnel Visualization */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Funnel Flow</CardTitle>
                      <CardDescription>Step-by-step conversion breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={selectedAnalysis.step_metrics} layout="horizontal">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="step_name" type="category" width={120} />
                          <Tooltip />
                          <Bar dataKey="entered" fill="hsl(var(--primary))" name="Entered">
                            {selectedAnalysis.step_metrics.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Step Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Step Performance</CardTitle>
                      <CardDescription>Detailed metrics for each funnel step</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedAnalysis.step_metrics.map((step, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge>{step.step}</Badge>
                                <span className="font-medium">{step.step_name}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Drop-off: {step.drop_rate}%
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <div className="text-muted-foreground">Entered</div>
                                <div className="font-bold">{step.entered}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Completed</div>
                                <div className="font-bold">{step.completed}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Dropped</div>
                                <div className="font-bold text-red-500">{step.dropped}</div>
                              </div>
                            </div>
                            <Progress 
                              value={step.entered > 0 ? (step.completed / step.entered) * 100 : 0} 
                              className="h-2"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              )}
            </Card>
          );
        })}

        {funnels.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Filter className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Funnels Created</h3>
              <p className="text-sm text-muted-foreground mb-4">Create your first funnel to start tracking conversions</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Funnel
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
