
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  Users, 
  TrendingUp, 
  Download, 
  Search, 
  Filter,
  UserCheck,
  UserX,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useNewsletter } from '@/hooks/useNewsletter';
import { formatDistanceToNow } from 'date-fns';

const NewsletterManagement = () => {
  const { loading, subscribe, unsubscribe, getSubscriptions } = useNewsletter();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    unsubscribed: 0,
    pending: 0
  });

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    const data = await getSubscriptions();
    setSubscriptions(data);
    
    // Calculate stats
    const total = data.length;
    const active = data.filter(sub => sub.status === 'active').length;
    const unsubscribed = data.filter(sub => sub.status === 'unsubscribed').length;
    const pending = data.filter(sub => sub.status === 'pending').length;
    
    setStats({ total, active, unsubscribed, pending });
  };

  const handleStatusChange = async (email: string, newStatus: string) => {
    if (newStatus === 'unsubscribed') {
      await unsubscribe(email);
    } else if (newStatus === 'active') {
      await subscribe(email);
    }
    fetchSubscriptions();
  };

  const exportSubscriptions = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Email,Status,Subscribed Date,Unsubscribed Date\n" +
      filteredSubscriptions.map(sub => 
        `${sub.email},${sub.status},${sub.subscribed_at},${sub.unsubscribed_at || ''}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "newsletter_subscriptions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'unsubscribed': return 'bg-red-500/20 text-red-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return UserCheck;
      case 'unsubscribed': return UserX;
      case 'pending': return Calendar;
      default: return Users;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Newsletter Management
          </CardTitle>
          <CardDescription className="text-gray-400">
            Manage newsletter subscriptions and analyze engagement
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="subscribers" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
              <TabsTrigger value="subscribers" className="text-white data-[state=active]:bg-purple-600">
                <Users className="w-4 h-4 mr-2" />
                Subscribers
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-purple-600">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="subscribers" className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-3">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stats.total}</h3>
                  <p className="text-sm text-gray-400">Total Subscribers</p>
                </div>
                
                <div className="glass-card text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-3">
                    <UserCheck className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stats.active}</h3>
                  <p className="text-sm text-gray-400">Active</p>
                </div>
                
                <div className="glass-card text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-500/20 rounded-lg mx-auto mb-3">
                    <UserX className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stats.unsubscribed}</h3>
                  <p className="text-sm text-gray-400">Unsubscribed</p>
                </div>
                
                <div className="glass-card text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-lg mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stats.pending}</h3>
                  <p className="text-sm text-gray-400">Pending</p>
                </div>
              </div>

              {/* Filters and Actions */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search subscribers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button
                  onClick={exportSubscriptions}
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>

              {/* Subscribers List */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading subscribers...</p>
                </div>
              ) : filteredSubscriptions.length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    {subscriptions.length === 0 ? 'No subscribers yet' : 'No subscribers match your filters'}
                  </h3>
                  <p className="text-gray-500">
                    {subscriptions.length === 0 
                      ? 'Subscribers will appear here once they sign up for your newsletter'
                      : 'Try adjusting your search or filter criteria'
                    }
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-400">
                      Showing {filteredSubscriptions.length} of {subscriptions.length} subscribers
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {filteredSubscriptions.map((subscription) => {
                      const StatusIcon = getStatusIcon(subscription.status);
                      
                      return (
                        <div
                          key={subscription.id}
                          className="glass-card hover:bg-gray-800/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className={`p-2 rounded-lg ${getStatusColor(subscription.status)}`}>
                                <StatusIcon className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-medium text-white">
                                  {subscription.email}
                                </h4>
                                <p className="text-sm text-gray-400">
                                  Subscribed {formatDistanceToNow(new Date(subscription.subscribed_at), { addSuffix: true })}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <Badge className={getStatusColor(subscription.status)}>
                                {subscription.status}
                              </Badge>
                              
                              <Select
                                value={subscription.status}
                                onValueChange={(value) => handleStatusChange(subscription.email, value)}
                              >
                                <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                                  <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                    Growth Rate
                  </h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      +{Math.round((stats.active / Math.max(stats.total, 1)) * 100)}%
                    </div>
                    <p className="text-gray-400">Active subscriber rate</p>
                  </div>
                </div>
                
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                    Engagement
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Active Rate</span>
                      <span className="text-white font-semibold">
                        {Math.round((stats.active / Math.max(stats.total, 1)) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Unsubscribe Rate</span>
                      <span className="text-white font-semibold">
                        {Math.round((stats.unsubscribed / Math.max(stats.total, 1)) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Subscription Trends
                </h3>
                <p className="text-gray-400">
                  Advanced analytics and trend data will be displayed here. 
                  This can include subscription growth over time, engagement rates, 
                  and other important metrics.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterManagement;
