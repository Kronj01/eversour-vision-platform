
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, BarChart3, Users, FileText, Settings, AlertCircle, Bug, Globe, Zap, Target, Megaphone, Layout } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import BlogManagement from '@/components/admin/BlogManagement';
import UserManagement from '@/components/admin/UserManagement';
import ContactFormManagement from '@/components/admin/ContactFormManagement';
import SEOManagementDashboard from '@/components/admin/SEOManagementDashboard';
import AdvancedAnalyticsDashboard from '@/components/admin/AdvancedAnalyticsDashboard';
import BackendAnalyticsDashboard from '@/components/backend/BackendAnalyticsDashboard';
import LeadManagement from '@/components/backend/LeadManagement';
import BugReportingDashboard from '@/components/admin/BugReportingDashboard';
import ContentManagementDashboard from '@/components/admin/ContentManagementDashboard';
import FunnelBuilderDashboard from '@/components/admin/FunnelBuilderDashboard';
import ThemeCustomizer from '@/components/admin/ThemeCustomizer';

const AdminDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Check if user is admin
  const isAdmin = user.email === 'suryanshj83@gmail.com';

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <Card className="bg-gray-900/50 border-gray-800 max-w-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
              Access Denied
            </CardTitle>
            <CardDescription className="text-gray-400">
              You don't have permission to access this page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">Please contact an administrator for access.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Advanced Admin Dashboard</h1>
          <p className="text-gray-400">Complete platform management with advanced capabilities</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-10 bg-gray-800/50 overflow-x-auto">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="backend" className="text-white data-[state=active]:bg-purple-600">
              <Shield className="w-4 h-4 mr-2" />
              Backend
            </TabsTrigger>
            <TabsTrigger value="bugs" className="text-white data-[state=active]:bg-purple-600">
              <Bug className="w-4 h-4 mr-2" />
              Bug Reports
            </TabsTrigger>
            <TabsTrigger value="content" className="text-white data-[state=active]:bg-purple-600">
              <Globe className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="funnels" className="text-white data-[state=active]:bg-purple-600">
              <Zap className="w-4 h-4 mr-2" />
              Funnels
            </TabsTrigger>
            <TabsTrigger value="leads" className="text-white data-[state=active]:bg-purple-600">
              <Users className="w-4 h-4 mr-2" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-purple-600">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="blog" className="text-white data-[state=active]:bg-purple-600">
              <FileText className="w-4 h-4 mr-2" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="seo" className="text-white data-[state=active]:bg-purple-600">
              <Target className="w-4 h-4 mr-2" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="theme" className="text-white data-[state=active]:bg-purple-600">
              <Layout className="w-4 h-4 mr-2" />
              Theme
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdvancedAnalyticsDashboard />
          </TabsContent>

          <TabsContent value="backend">
            <BackendAnalyticsDashboard />
          </TabsContent>

          <TabsContent value="bugs">
            <BugReportingDashboard />
          </TabsContent>

          <TabsContent value="content">
            <ContentManagementDashboard />
          </TabsContent>

          <TabsContent value="funnels">
            <FunnelBuilderDashboard />
          </TabsContent>

          <TabsContent value="leads">
            <LeadManagement />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManagement />
          </TabsContent>

          <TabsContent value="seo">
            <SEOManagementDashboard />
          </TabsContent>

          <TabsContent value="theme">
            <ThemeCustomizer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
