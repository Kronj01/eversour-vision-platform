
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  Users, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone,
  Building,
  Search,
  Filter,
  AlertCircle
} from 'lucide-react';
import { useBackendLeads } from '@/hooks/useBackendData';

const LeadManagement = () => {
  const { leads, loading, error, createLead, updateLead } = useBackendLeads();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400';
      case 'contacted': return 'bg-yellow-500/20 text-yellow-400';
      case 'qualified': return 'bg-purple-500/20 text-purple-400';
      case 'converted': return 'bg-green-500/20 text-green-400';
      case 'closed': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleStatusUpdate = async (leadId: string, newStatus: string) => {
    await updateLead(leadId, { status: newStatus });
  };

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
            Lead Management
          </CardTitle>
          <CardDescription className="text-gray-400">
            Manage leads from backend system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-2">Failed to connect to backend</p>
            <p className="text-gray-500 text-sm">
              Make sure your Python/FastAPI backend is running and accessible
            </p>
            <Badge variant="destructive" className="mt-4">
              {error}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Lead Management
            </CardTitle>
            <CardDescription className="text-gray-400">
              Manage and track leads from your backend system
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-purple-400 border-purple-400">
              {leads.length} Total Leads
            </Badge>
            <Button
              variant="outline"
              className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white rounded-md px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {leads.length > 0 ? (
          <div className="rounded-lg border border-gray-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Lead</TableHead>
                  <TableHead className="text-gray-300">Contact</TableHead>
                  <TableHead className="text-gray-300">Company</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Source</TableHead>
                  <TableHead className="text-gray-300">Created</TableHead>
                  <TableHead className="text-gray-300 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="border-gray-700 hover:bg-gray-800/50">
                    <TableCell>
                      <div>
                        <p className="text-white font-medium">{lead.name}</p>
                        <p className="text-gray-400 text-sm truncate max-w-xs">{lead.message}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-gray-300">
                          <Mail className="w-4 h-4 mr-2" />
                          <span className="text-sm">{lead.email}</span>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center text-gray-300">
                            <Phone className="w-4 h-4 mr-2" />
                            <span className="text-sm">{lead.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {lead.company ? (
                        <div className="flex items-center text-gray-300">
                          <Building className="w-4 h-4 mr-2" />
                          <span>{lead.company}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {lead.source}
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 border-gray-700">
                          <DropdownMenuItem 
                            onClick={() => handleStatusUpdate(lead.id, 'contacted')}
                            className="text-white hover:bg-gray-700"
                          >
                            Mark as Contacted
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusUpdate(lead.id, 'qualified')}
                            className="text-white hover:bg-gray-700"
                          >
                            Mark as Qualified
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusUpdate(lead.id, 'converted')}
                            className="text-white hover:bg-gray-700"
                          >
                            Mark as Converted
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">
              {searchTerm ? 'No leads found matching your search.' : 'No leads found.'}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Connect your backend to start managing leads
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadManagement;
