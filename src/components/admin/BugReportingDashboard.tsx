
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Bug, 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Code, 
  Shield, 
  Zap,
  BarChart3,
  FileCode,
  Search
} from 'lucide-react';
import { useBugReporting, BugReport } from '@/hooks/useBugReporting';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const BugReportingDashboard = () => {
  const { bugs, codeMetrics, loading, createBug, updateBugStatus } = useBugReporting();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [newBug, setNewBug] = useState<Partial<BugReport>>({
    title: '',
    description: '',
    severity: 'low',
    steps_to_reproduce: [''],
    labels: [],
  });

  const filteredBugs = bugs.filter(bug => {
    const matchesSearch = bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bug.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bug.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || bug.severity === severityFilter;
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const bugStatusData = [
    { name: 'Open', value: bugs.filter(b => b.status === 'open').length, color: '#ef4444' },
    { name: 'In Progress', value: bugs.filter(b => b.status === 'in-progress').length, color: '#f59e0b' },
    { name: 'Resolved', value: bugs.filter(b => b.status === 'resolved').length, color: '#10b981' },
    { name: 'Closed', value: bugs.filter(b => b.status === 'closed').length, color: '#6b7280' },
  ];

  const severityData = [
    { name: 'Critical', value: bugs.filter(b => b.severity === 'critical').length },
    { name: 'High', value: bugs.filter(b => b.severity === 'high').length },
    { name: 'Medium', value: bugs.filter(b => b.severity === 'medium').length },
    { name: 'Low', value: bugs.filter(b => b.severity === 'low').length },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400';
      case 'high': return 'bg-orange-500/20 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-500/20 text-red-400';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400';
      case 'resolved': return 'bg-green-500/20 text-green-400';
      case 'closed': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBug(newBug);
    setNewBug({
      title: '',
      description: '',
      severity: 'low',
      steps_to_reproduce: [''],
      labels: [],
    });
    setShowForm(false);
  };

  const addStep = () => {
    setNewBug(prev => ({
      ...prev,
      steps_to_reproduce: [...(prev.steps_to_reproduce || []), '']
    }));
  };

  const updateStep = (index: number, value: string) => {
    setNewBug(prev => ({
      ...prev,
      steps_to_reproduce: prev.steps_to_reproduce?.map((step, i) => i === index ? value : step) || []
    }));
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading bug reports...</p>
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
                <Bug className="w-5 h-5 mr-2" />
                Bug Reporting & Code Quality
              </CardTitle>
              <CardDescription className="text-gray-400">
                Track bugs, monitor code quality, and manage technical debt
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Report Bug
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
              <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-purple-600">
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="bugs" className="text-white data-[state=active]:bg-purple-600">
                <Bug className="w-4 h-4 mr-2" />
                Bug Reports
              </TabsTrigger>
              <TabsTrigger value="quality" className="text-white data-[state=active]:bg-purple-600">
                <Code className="w-4 h-4 mr-2" />
                Code Quality
              </TabsTrigger>
              <TabsTrigger value="security" className="text-white data-[state=active]:bg-purple-600">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-card text-center">
                  <Bug className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{bugs.length}</p>
                  <p className="text-sm text-gray-400">Total Bugs</p>
                </div>
                <div className="glass-card text-center">
                  <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{bugs.filter(b => b.status === 'open').length}</p>
                  <p className="text-sm text-gray-400">Open Issues</p>
                </div>
                <div className="glass-card text-center">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{bugs.filter(b => b.status === 'resolved').length}</p>
                  <p className="text-sm text-gray-400">Resolved</p>
                </div>
                <div className="glass-card text-center">
                  <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{codeMetrics.code_coverage}%</p>
                  <p className="text-sm text-gray-400">Code Coverage</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Bug Status Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={bugStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {bugStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#fff'
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-white mb-4">Bugs by Severity</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={severityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#fff'
                          }} 
                        />
                        <Bar dataKey="value" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bugs" className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search bugs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Severity</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Bug List */}
              <div className="space-y-4">
                {filteredBugs.map((bug) => (
                  <div key={bug.id} className="glass-card">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{bug.title}</h3>
                        <p className="text-gray-400 mb-4">{bug.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Reporter: {bug.reporter_name}</span>
                          <span>Created: {new Date(bug.created_at).toLocaleDateString()}</span>
                          {bug.file_path && <span>File: {bug.file_path}</span>}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex space-x-2">
                          <Badge className={getSeverityColor(bug.severity)}>
                            {bug.severity}
                          </Badge>
                          <Badge className={getStatusColor(bug.status)}>
                            {bug.status}
                          </Badge>
                        </div>
                        <Select value={bug.status} onValueChange={(value) => updateBugStatus(bug.id, value as BugReport['status'])}>
                          <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {bug.labels.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {bug.labels.map((label, index) => (
                          <Badge key={index} variant="outline" className="text-purple-400 border-purple-400">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="quality" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card text-center">
                  <FileCode className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{codeMetrics.total_files}</div>
                  <p className="text-sm text-gray-400">Total Files</p>
                </div>
                <div className="glass-card text-center">
                  <Code className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{codeMetrics.lines_of_code.toLocaleString()}</div>
                  <p className="text-sm text-gray-400">Lines of Code</p>
                </div>
                <div className="glass-card text-center">
                  <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{codeMetrics.technical_debt_ratio}%</div>
                  <p className="text-sm text-gray-400">Technical Debt</p>
                </div>
                <div className="glass-card text-center">
                  <CheckCircle className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{codeMetrics.cyclomatic_complexity}</div>
                  <p className="text-sm text-gray-400">Complexity Score</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card text-center">
                  <Shield className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{codeMetrics.security_vulnerabilities}</div>
                  <p className="text-sm text-gray-400">Security Issues</p>
                </div>
                <div className="glass-card text-center">
                  <Zap className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{codeMetrics.performance_issues}</div>
                  <p className="text-sm text-gray-400">Performance Issues</p>
                </div>
                <div className="glass-card text-center">
                  <Code className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{codeMetrics.duplicated_lines}</div>
                  <p className="text-sm text-gray-400">Duplicated Lines</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Bug Report Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">Report a Bug</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-white">Title</Label>
                <Input
                  value={newBug.title}
                  onChange={(e) => setNewBug(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              
              <div>
                <Label className="text-white">Description</Label>
                <Textarea
                  value={newBug.description}
                  onChange={(e) => setNewBug(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label className="text-white">Severity</Label>
                <Select value={newBug.severity} onValueChange={(value) => setNewBug(prev => ({ ...prev, severity: value as any }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-white">Steps to Reproduce</Label>
                {newBug.steps_to_reproduce?.map((step, index) => (
                  <Input
                    key={index}
                    value={step}
                    onChange={(e) => updateStep(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    className="bg-gray-800 border-gray-700 text-white mb-2"
                  />
                ))}
                <Button type="button" onClick={addStep} variant="outline" className="text-purple-400 border-purple-400">
                  Add Step
                </Button>
              </div>
              
              <div className="flex space-x-4">
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Report Bug
                </Button>
                <Button type="button" onClick={() => setShowForm(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BugReportingDashboard;
