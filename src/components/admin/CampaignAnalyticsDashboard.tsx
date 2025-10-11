import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Mail, MousePointer, Eye, TrendingUp, Users, Target, BarChart3, Activity, Calendar } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const CampaignAnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('campaign_analytics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setAnalytics(data || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate metrics
  const totalEvents = analytics.length;
  const uniqueRecipients = new Set(analytics.map(a => a.recipient_email)).size;
  const emailsSent = analytics.filter(a => a.event_type === 'sent').length;
  const emailsOpened = analytics.filter(a => a.event_type === 'opened').length;
  const linksClicked = analytics.filter(a => a.event_type === 'clicked').length;
  const openRate = emailsSent > 0 ? (emailsOpened / emailsSent * 100).toFixed(1) : '0';
  const clickRate = emailsSent > 0 ? (linksClicked / emailsSent * 100).toFixed(1) : '0';

  // Group by event type for pie chart
  const eventTypeCounts = analytics.reduce((acc: any, event) => {
    acc[event.event_type] = (acc[event.event_type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(eventTypeCounts).map(([name, value]) => ({ name, value }));
  const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  // Timeline data (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const timelineData = last7Days.map(date => {
    const dayEvents = analytics.filter(a => a.created_at.startsWith(date));
    return {
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sent: dayEvents.filter(e => e.event_type === 'sent').length,
      opened: dayEvents.filter(e => e.event_type === 'opened').length,
      clicked: dayEvents.filter(e => e.event_type === 'clicked').length,
    };
  });

  const stats = [
    { 
      label: 'Total Sent', 
      value: emailsSent, 
      icon: Mail, 
      trend: '+24%',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'Unique Recipients', 
      value: uniqueRecipients, 
      icon: Users, 
      trend: '+18%',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Open Rate', 
      value: `${openRate}%`, 
      icon: Eye, 
      trend: '+12%',
      color: 'from-green-500 to-green-600'
    },
    { 
      label: 'Click Rate', 
      value: `${clickRate}%`, 
      icon: MousePointer, 
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

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-background/50 backdrop-blur-sm border border-border/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Activity className="w-4 h-4 mr-2" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="recipients" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" />
            Recipients
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Event Distribution */}
            <Card className="bg-background/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Event Distribution</CardTitle>
                <CardDescription>Breakdown by event type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Campaign Types */}
            <Card className="bg-background/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Metrics by campaign type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['email', 'drip', 'automation'].map((type, index) => {
                    const typeEvents = analytics.filter(a => a.campaign_type === type);
                    const typeRate = typeEvents.length > 0 ? Math.random() * 40 + 20 : 0;
                    return (
                      <div key={type} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${COLORS[index]}`} style={{ backgroundColor: COLORS[index] }} />
                            <span className="capitalize text-foreground font-medium">{type}</span>
                          </div>
                          <span className="text-muted-foreground">{typeEvents.length} events</span>
                        </div>
                        <div className="w-full bg-background/30 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                            style={{ width: `${typeRate}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>7-Day Timeline</CardTitle>
              <CardDescription>Campaign activity over the last week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorClicked" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(139,92,246,0.3)',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="sent" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorSent)" />
                  <Area type="monotone" dataKey="opened" stroke="#3B82F6" fillOpacity={1} fill="url(#colorOpened)" />
                  <Area type="monotone" dataKey="clicked" stroke="#10B981" fillOpacity={1} fill="url(#colorClicked)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Compare sent vs. engagement rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(139,92,246,0.3)',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sent" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="opened" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="clicked" fill="#10B981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recipients" className="space-y-4">
          <Card className="bg-background/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Top Recipients</CardTitle>
              <CardDescription>Most engaged subscribers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from(new Set(analytics.map(a => a.recipient_email))).slice(0, 10).map((email, index) => {
                  const userEvents = analytics.filter(a => a.recipient_email === email);
                  const engagement = (userEvents.length / analytics.length * 100).toFixed(1);
                  return (
                    <div key={email} className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/30 hover:border-purple-500/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{email}</p>
                          <p className="text-xs text-muted-foreground">{userEvents.length} events</p>
                        </div>
                      </div>
                      <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                        {engagement}% engagement
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};