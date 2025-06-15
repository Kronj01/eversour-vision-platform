
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, AlertCircle } from 'lucide-react';
import { useLeads } from '@/hooks/api/useLeads';

const LeadsCard = () => {
  const { leads, loading, error } = useLeads();

  if (loading) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
            Leads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-2">Failed to load leads</p>
            <Badge variant="destructive" className="mt-4">{error}</Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  const newLeads = leads.filter(lead => lead.status === 'new').length;
  const qualifiedLeads = leads.filter(lead => lead.status === 'qualified').length;

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Leads Overview
        </CardTitle>
        <CardDescription className="text-gray-400">
          Current lead status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{newLeads}</p>
            <p className="text-sm text-gray-400">New Leads</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{qualifiedLeads}</p>
            <p className="text-sm text-gray-400">Qualified</p>
          </div>
        </div>
        <div className="mt-4">
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            {leads.length} Total Leads
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsCard;
