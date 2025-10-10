import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Play, Pause, TrendingUp, Users, Target } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

export const ABTestingDashboard = () => {
  const [experiments, setExperiments] = useState<any[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newExperiment, setNewExperiment] = useState({
    name: '',
    description: '',
    conversion_goal: '',
    variants: [
      { id: 'control', name: 'Control (Original)', weight: 50 },
      { id: 'variant_a', name: 'Variant A', weight: 50 }
    ]
  });
  const { toast } = useToast();

  const createExperiment = async () => {
    try {
      await supabase.from('ab_experiments').insert({
        name: newExperiment.name,
        description: newExperiment.description,
        conversion_goal: newExperiment.conversion_goal,
        variants: newExperiment.variants,
        status: 'draft',
        traffic_allocation: 100,
        confidence_level: 95
      });

      toast({
        title: "Experiment created",
        description: `${newExperiment.name} has been created successfully.`
      });

      setIsCreateDialogOpen(false);
      fetchExperiments();
    } catch (error: any) {
      toast({
        title: "Error creating experiment",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const fetchExperiments = async () => {
    const { data } = await supabase
      .from('ab_experiments')
      .select('*')
      .order('created_at', { ascending: false });
    
    setExperiments(data || []);
  };

  const toggleExperiment = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'running' ? 'paused' : 'running';
    
    await supabase
      .from('ab_experiments')
      .update({ 
        status: newStatus,
        start_date: newStatus === 'running' ? new Date().toISOString() : undefined
      })
      .eq('id', id);
    
    fetchExperiments();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">A/B Testing</h2>
          <p className="text-muted-foreground">Run experiments to optimize conversions</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Experiment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create A/B Test</DialogTitle>
              <DialogDescription>Set up a new experiment to test variations</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Experiment Name</label>
                <Input
                  placeholder="e.g., Homepage Hero Test"
                  value={newExperiment.name}
                  onChange={(e) => setNewExperiment({ ...newExperiment, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input
                  placeholder="What are you testing?"
                  value={newExperiment.description}
                  onChange={(e) => setNewExperiment({ ...newExperiment, description: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Conversion Goal</label>
                <Input
                  placeholder="e.g., signup_clicked"
                  value={newExperiment.conversion_goal}
                  onChange={(e) => setNewExperiment({ ...newExperiment, conversion_goal: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Variants</label>
                {newExperiment.variants.map((variant, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-4">
                        <Input
                          placeholder="Variant name"
                          value={variant.name}
                          onChange={(e) => {
                            const updated = [...newExperiment.variants];
                            updated[index].name = e.target.value;
                            setNewExperiment({ ...newExperiment, variants: updated });
                          }}
                        />
                        <Input
                          type="number"
                          placeholder="Weight %"
                          value={variant.weight}
                          onChange={(e) => {
                            const updated = [...newExperiment.variants];
                            updated[index].weight = parseInt(e.target.value);
                            setNewExperiment({ ...newExperiment, variants: updated });
                          }}
                          className="w-24"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button onClick={createExperiment}>Create Experiment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Experiments List */}
      <div className="grid gap-4">
        {experiments.map((experiment) => {
          const variants = experiment.variants as any[];
          const mockData = variants.map(v => ({
            name: v.name,
            participants: Math.floor(Math.random() * 1000),
            conversions: Math.floor(Math.random() * 200),
            conversionRate: (Math.random() * 15).toFixed(2)
          }));

          return (
            <Card key={experiment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {experiment.name}
                      <Badge variant={
                        experiment.status === 'running' ? 'default' : 
                        experiment.status === 'draft' ? 'secondary' : 'outline'
                      }>
                        {experiment.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{experiment.description}</CardDescription>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleExperiment(experiment.id, experiment.status)}
                  >
                    {experiment.status === 'running' ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Total Participants
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {mockData.reduce((sum, v) => sum + v.participants, 0)}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Total Conversions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {mockData.reduce((sum, v) => sum + v.conversions, 0)}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Confidence Level
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{experiment.confidence_level}%</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Variant Comparison */}
                <Card>
                  <CardHeader>
                    <CardTitle>Variant Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={mockData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="conversions" fill="hsl(var(--primary))">
                          {mockData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Variant Details */}
                <div className="space-y-3">
                  {mockData.map((variant, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{variant.name}</span>
                            <Badge variant="outline">{variant.conversionRate}% CR</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Participants</div>
                              <div className="font-bold">{variant.participants}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Conversions</div>
                              <div className="font-bold">{variant.conversions}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">CR</div>
                              <div className="font-bold">{variant.conversionRate}%</div>
                            </div>
                          </div>
                          <Progress value={parseFloat(variant.conversionRate) * 5} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {experiments.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Target className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Experiments Yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Create your first A/B test to start optimizing</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Experiment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
