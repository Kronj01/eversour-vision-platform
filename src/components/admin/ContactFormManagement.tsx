
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, MessageSquare, Search, Filter, RefreshCw } from 'lucide-react';
import { useContactSubmissions } from '@/hooks/useContactSubmissions';
import ContactSubmissionCard from './ContactSubmissionCard';

const ContactFormManagement = () => {
  const { 
    submissions, 
    loading, 
    fetchSubmissions, 
    updateSubmissionStatus, 
    addAdminNotes 
  } = useContactSubmissions();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = 
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusCount = (status: string) => {
    return submissions.filter(sub => sub.status === status).length;
  };

  const stats = [
    { label: 'Total', value: submissions.length, color: 'bg-purple-500' },
    { label: 'New', value: getStatusCount('new'), color: 'bg-blue-500' },
    { label: 'Read', value: getStatusCount('read'), color: 'bg-yellow-500' },
    { label: 'Replied', value: getStatusCount('replied'), color: 'bg-green-500' },
    { label: 'Closed', value: getStatusCount('closed'), color: 'bg-gray-500' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Contact Form Management
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage and respond to contact form submissions
              </CardDescription>
            </div>
            <Button
              onClick={fetchSubmissions}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <span className="text-white font-bold">{stat.value}</span>
                </div>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, email, or message..."
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
                variant={statusFilter === 'new' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('new')}
                className={statusFilter === 'new' ? 'bg-blue-600' : 'border-gray-700 text-gray-300'}
              >
                New
              </Button>
              <Button
                variant={statusFilter === 'read' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('read')}
                className={statusFilter === 'read' ? 'bg-yellow-600' : 'border-gray-700 text-gray-300'}
              >
                Read
              </Button>
              <Button
                variant={statusFilter === 'replied' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('replied')}
                className={statusFilter === 'replied' ? 'bg-green-600' : 'border-gray-700 text-gray-300'}
              >
                Replied
              </Button>
            </div>
          </div>

          {/* Submissions List */}
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {submissions.length === 0 ? 'No submissions yet' : 'No matching submissions'}
              </h3>
              <p className="text-gray-400">
                {submissions.length === 0 
                  ? 'Contact form submissions will appear here once received.'
                  : 'Try adjusting your search or filter criteria.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => (
                <ContactSubmissionCard
                  key={submission.id}
                  submission={submission}
                  onStatusChange={updateSubmissionStatus}
                  onNotesUpdate={addAdminNotes}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactFormManagement;
