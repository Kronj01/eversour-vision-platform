import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useSegmentation, Segment, Tag } from '@/hooks/useSegmentation';
import { Users, Tag as TagIcon, Plus, Trash2, Edit, TrendingUp, Target, Filter } from 'lucide-react';

export const SegmentationDashboard = () => {
  const { segments, tags, loading, fetchSegments, createSegment, deleteSegment, fetchTags, createTag } = useSegmentation();
  const [isCreateSegmentOpen, setIsCreateSegmentOpen] = useState(false);
  const [isCreateTagOpen, setIsCreateTagOpen] = useState(false);

  const [segmentForm, setSegmentForm] = useState({
    name: '',
    description: '',
    conditions: [] as any[],
    is_dynamic: true
  });

  const [tagForm, setTagForm] = useState({
    name: '',
    description: '',
    color: '#8B5CF6'
  });

  useEffect(() => {
    fetchSegments();
    fetchTags();
  }, []);

  const handleCreateSegment = async () => {
    try {
      await createSegment(segmentForm);
      setIsCreateSegmentOpen(false);
      setSegmentForm({
        name: '',
        description: '',
        conditions: [],
        is_dynamic: true
      });
    } catch (error) {
      console.error('Error creating segment:', error);
    }
  };

  const handleCreateTag = async () => {
    try {
      await createTag(tagForm);
      setIsCreateTagOpen(false);
      setTagForm({
        name: '',
        description: '',
        color: '#8B5CF6'
      });
    } catch (error) {
      console.error('Error creating tag:', error);
    }
  };

  const stats = [
    { 
      label: 'Total Segments', 
      value: segments.length, 
      icon: Target, 
      trend: '+15%',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'Total Members', 
      value: segments.reduce((sum, s) => sum + s.member_count, 0), 
      icon: Users, 
      trend: '+32%',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Dynamic Segments', 
      value: segments.filter(s => s.is_dynamic).length, 
      icon: Filter, 
      trend: '+8%',
      color: 'from-green-500 to-green-600'
    },
    { 
      label: 'Total Tags', 
      value: tags.length, 
      icon: TagIcon, 
      trend: '+12%',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const colorOptions = [
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Pink', value: '#EC4899' },
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

      <Tabs defaultValue="segments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-background/50 backdrop-blur-sm border border-border/50">
          <TabsTrigger value="segments" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Target className="w-4 h-4 mr-2" />
            Segments
          </TabsTrigger>
          <TabsTrigger value="tags" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <TagIcon className="w-4 h-4 mr-2" />
            Tags
          </TabsTrigger>
        </TabsList>

        {/* Segments Tab */}
        <TabsContent value="segments" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Audience Segments</h2>
              <p className="text-sm text-muted-foreground">Organize and target specific user groups</p>
            </div>
            <Dialog open={isCreateSegmentOpen} onOpenChange={setIsCreateSegmentOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/20">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Segment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-xl border-border/50">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Create Segment</DialogTitle>
                  <DialogDescription>Define conditions to automatically group users</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="segment-name">Segment Name</Label>
                    <Input
                      id="segment-name"
                      placeholder="High-Value Customers"
                      value={segmentForm.name}
                      onChange={(e) => setSegmentForm({ ...segmentForm, name: e.target.value })}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="segment-description">Description</Label>
                    <Textarea
                      id="segment-description"
                      placeholder="Describe this segment..."
                      value={segmentForm.description}
                      onChange={(e) => setSegmentForm({ ...segmentForm, description: e.target.value })}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="dynamic"
                      checked={segmentForm.is_dynamic}
                      onCheckedChange={(checked) => setSegmentForm({ ...segmentForm, is_dynamic: checked })}
                    />
                    <Label htmlFor="dynamic">Dynamic segment (auto-updates)</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateSegmentOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateSegment} className="bg-gradient-to-r from-purple-600 to-purple-700">
                    Create Segment
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {segments.map((segment) => (
              <Card key={segment.id} className="group hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm border-border/50 hover:border-purple-500/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl flex items-center gap-2">
                        {segment.name}
                        {segment.is_dynamic && (
                          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Dynamic</Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{segment.description}</CardDescription>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteSegment(segment.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-400" />
                      <span className="text-sm text-muted-foreground">Members</span>
                    </div>
                    <span className="text-2xl font-bold text-foreground">{segment.member_count.toLocaleString()}</span>
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground">
                    Conditions: {segment.conditions.length || 0}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {segments.length === 0 && !loading && (
            <Card className="border-dashed border-2 border-border/50 bg-background/30">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Target className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center mb-2">No segments yet</p>
                <p className="text-sm text-muted-foreground/60 text-center mb-4">Create segments to organize your audience</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tags Tab */}
        <TabsContent value="tags" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground">User Tags</h2>
              <p className="text-sm text-muted-foreground">Label and categorize subscribers</p>
            </div>
            <Dialog open={isCreateTagOpen} onOpenChange={setIsCreateTagOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/20">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Tag
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg bg-background/95 backdrop-blur-xl border-border/50">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Create Tag</DialogTitle>
                  <DialogDescription>Add a new tag to categorize subscribers</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="tag-name">Tag Name</Label>
                    <Input
                      id="tag-name"
                      placeholder="VIP Customer"
                      value={tagForm.name}
                      onChange={(e) => setTagForm({ ...tagForm, name: e.target.value })}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tag-description">Description</Label>
                    <Textarea
                      id="tag-description"
                      placeholder="Describe this tag..."
                      value={tagForm.description}
                      onChange={(e) => setTagForm({ ...tagForm, description: e.target.value })}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tag Color</Label>
                    <div className="grid grid-cols-6 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          className={`w-10 h-10 rounded-lg border-2 transition-all ${
                            tagForm.color === color.value ? 'border-white scale-110' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => setTagForm({ ...tagForm, color: color.value })}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateTagOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateTag} className="bg-gradient-to-r from-purple-600 to-purple-700">
                    Create Tag
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tags.map((tag) => (
              <Card key={tag.id} className="group hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm border-border/50 hover:border-purple-500/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${tag.color}20`, borderColor: `${tag.color}40`, borderWidth: '1px' }}
                    >
                      <TagIcon className="w-6 h-6" style={{ color: tag.color }} />
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{tag.name}</h3>
                  {tag.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{tag.description}</p>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <span className="text-xs text-muted-foreground">Subscribers</span>
                    <span className="text-lg font-bold text-foreground">{tag.subscriber_count}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {tags.length === 0 && !loading && (
            <Card className="border-dashed border-2 border-border/50 bg-background/30">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <TagIcon className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center mb-2">No tags yet</p>
                <p className="text-sm text-muted-foreground/60 text-center mb-4">Create tags to categorize your subscribers</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};