
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
import RealTimeDashboard from '@/components/admin/RealTimeDashboard';
import MarketingAutomationDashboard from '@/components/admin/MarketingAutomationDashboard';
import AdvancedFormBuilder from '@/components/admin/AdvancedFormBuilder';
import FormSubmissionsManagement from '@/components/admin/FormSubmissionsManagement';

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

        <Tabs defaultValue="realtime" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-gray-800/50">
            <TabsTrigger value="realtime" className="text-white data-[state=active]:bg-purple-600">
              <Zap className="w-4 h-4 mr-2" />
              Real-Time
            </TabsTrigger>
            <TabsTrigger value="backend" className="text-white data-[state=active]:bg-purple-600">
              <Shield className="w-4 h-4 mr-2" />
              Backend
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
            <TabsTrigger value="automation" className="text-white data-[state=active]:bg-purple-600">
              <Zap className="w-4 h-4 mr-2" />
              Automation
            </TabsTrigger>
            <TabsTrigger value="content" className="text-white data-[state=active]:bg-purple-600">
              <Globe className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="theme" className="text-white data-[state=active]:bg-purple-600">
              <Layout className="w-4 h-4 mr-2" />
              Theme
            </TabsTrigger>
          </TabsList>

          <TabsContent value="realtime">
            <RealTimeDashboard />
          </TabsContent>

          <TabsContent value="backend">
            <Tabs defaultValue="analytics" className="space-y-4">
              <TabsList className="bg-gray-800/30">
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="bugs">Bug Reports</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
              <TabsContent value="analytics">
                <BackendAnalyticsDashboard />
              </TabsContent>
              <TabsContent value="leads">
                <LeadManagement />
              </TabsContent>
              <TabsContent value="bugs">
                <BugReportingDashboard />
              </TabsContent>
              <TabsContent value="performance">
                <AdvancedAnalyticsDashboard />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="users">
            <Tabs defaultValue="management" className="space-y-4">
              <TabsList className="bg-gray-800/30">
                <TabsTrigger value="management">User Management</TabsTrigger>
                <TabsTrigger value="forms">Form Submissions</TabsTrigger>
                <TabsTrigger value="contact">Contact Submissions</TabsTrigger>
              </TabsList>
              <TabsContent value="management">
                <UserManagement />
              </TabsContent>
              <TabsContent value="forms">
                <FormSubmissionsManagement />
              </TabsContent>
              <TabsContent value="contact">
                <ContactFormManagement />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="blog">
            <Tabs defaultValue="posts" className="space-y-4">
              <TabsList className="bg-gray-800/30">
                <TabsTrigger value="posts">Blog Posts</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="analytics">Blog Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="posts">
                <BlogManagement />
              </TabsContent>
              <TabsContent value="categories">
                <BlogManagement />
              </TabsContent>
              <TabsContent value="analytics">
                <BlogManagement />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="seo">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="bg-gray-800/30">
                <TabsTrigger value="overview">SEO Overview</TabsTrigger>
                <TabsTrigger value="onpage">On-Page SEO</TabsTrigger>
                <TabsTrigger value="technical">Technical SEO</TabsTrigger>
                <TabsTrigger value="offpage">Off-Page SEO</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <SEOManagementDashboard />
              </TabsContent>
              <TabsContent value="onpage">
                <SEOManagementDashboard />
              </TabsContent>
              <TabsContent value="technical">
                <SEOManagementDashboard />
              </TabsContent>
              <TabsContent value="offpage">
                <SEOManagementDashboard />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="automation">
            <Tabs defaultValue="workflows" className="space-y-4">
              <TabsList className="bg-gray-800/30">
                <TabsTrigger value="workflows">Workflows</TabsTrigger>
                <TabsTrigger value="funnels">Funnels</TabsTrigger>
                <TabsTrigger value="forms">Form Builder</TabsTrigger>
                <TabsTrigger value="email">Email Campaigns</TabsTrigger>
              </TabsList>
              <TabsContent value="workflows">
                <MarketingAutomationDashboard />
              </TabsContent>
              <TabsContent value="funnels">
                <FunnelBuilderDashboard />
              </TabsContent>
              <TabsContent value="forms">
                <AdvancedFormBuilder />
              </TabsContent>
              <TabsContent value="email">
                <MarketingAutomationDashboard />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="content">
            <ContentManagementDashboard />
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
