
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Users, 
  Send, 
  Download,
  Search,
  Filter,
  MoreHorizontal,
  UserCheck,
  UserX
} from 'lucide-react';
import { useNewsletter } from '@/hooks/useNewsletter';
import { formatDistanceToNow } from 'date-fns';

const NewsletterManagement = () => {
  const { loading, getSubscriptions } = useNewsletter();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    const data = await getSubscriptions();
    setSubscriptions(data);
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusCount = (status: string) => {
    return subscriptions.filter(sub => sub.status === status).length;
  };

  const exportSubscriptions = () => {
    const csvContent = [
      ['Email', 'Status', 'Subscribed At', 'Unsubscribed At'],
      ...filteredSubscriptions.map(sub => [
        sub.email,
        sub.status,
        new Date(sub.subscribed_at).toLocaleDateString(),
        sub.unsubscribed_at ? new Date(sub.unsubscribed_at).toLocaleDateString() : 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const stats = [
    { label: 'Total', value: subscriptions.length, color: 'bg-purple-500', icon: Mail },
    { label: 'Active', value: getStatusCount('active'), color: 'bg-green-500', icon: UserCheck },
    { label: 'Unsubscribed', value: getStatusCount('unsubscribed'), color: 'bg-red-500', icon: UserX },
    { label: 'Pending', value: getStatusCount('pending'), color: 'bg-yellow-500', icon: Users }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Newsletter Management
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage newsletter subscriptions and send campaigns
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={exportSubscriptions}
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                size="sm"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Campaign
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-white text-lg font-bold">{stat.value}</p>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
                className={statusFilter === 'all' ? 'bg-purple-600' : 'border-gray-700 text-gray-300'}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('active')}
                className={statusFilter === 'active' ? 'bg-green-600' : 'border-gray-700 text-gray-300'}
              >
                Active
              </Button>
              <Button
                variant={statusFilter === 'unsubscribed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('unsubscribed')}
                className={statusFilter === 'unsubscribed' ? 'bg-red-600' : 'border-gray-700 text-gray-300'}
              >
                Unsubscribed
              </Button>
            </div>
          </div>

          {/* Subscriptions List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            </div>
          ) : filteredSubscriptions.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {subscriptions.length === 0 ? 'No subscriptions yet' : 'No matching subscriptions'}
              </h3>
              <p className="text-gray-400">
                {subscriptions.length === 0 
                  ? 'Newsletter subscriptions will appear here once users subscribe.'
                  : 'Try adjusting your search or filter criteria.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSubscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-purple-400/30 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      subscription.status === 'active' ? 'bg-green-500' :
                      subscription.status === 'unsubscribed' ? 'bg-red-500' :
                      'bg-yellow-500'
                    }`}></div>
                    <div>
                      <p className="text-white font-medium">{subscription.email}</p>
                      <p className="text-gray-400 text-sm">
                        Subscribed {formatDistanceToNow(new Date(subscription.subscribed_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant="outline" 
                      className={`${
                        subscription.status === 'active' ? 'border-green-500 text-green-400' :
                        subscription.status === 'unsubscribed' ? 'border-red-500 text-red-400' :
                        'border-yellow-500 text-yellow-400'
                      }`}
                    >
                      {subscription.status}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterManagement;
