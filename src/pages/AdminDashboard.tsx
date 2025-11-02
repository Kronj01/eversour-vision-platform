
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, BarChart3, Users, FileText, Settings, AlertCircle, Bug, Globe, Zap, Target, Megaphone, Layout, Mail, Tag, FormInput } from 'lucide-react';
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
import { PageManagement } from '@/components/admin/PageManagement';
import { MediaLibrary } from '@/components/admin/MediaLibrary';
import FunnelBuilderDashboard from '@/components/admin/FunnelBuilderDashboard';
import ThemeCustomizer from '@/components/admin/ThemeCustomizer';
import RealTimeDashboard from '@/components/admin/RealTimeDashboard';
import MarketingAutomationDashboard from '@/components/admin/MarketingAutomationDashboard';
import AdvancedFormBuilder from '@/components/admin/AdvancedFormBuilder';
import FormSubmissionsManagement from '@/components/admin/FormSubmissionsManagement';
import { RealTimeAnalyticsDashboard } from '@/components/admin/RealTimeAnalyticsDashboard';
import { BehavioralAnalyticsDashboard } from '@/components/admin/BehavioralAnalyticsDashboard';
import { FunnelAnalyticsDashboard } from '@/components/admin/FunnelAnalyticsDashboard';
import { ABTestingDashboard } from '@/components/admin/ABTestingDashboard';
import { EmailMarketingDashboard } from '@/components/admin/EmailMarketingDashboard';
import { SegmentationDashboard } from '@/components/admin/SegmentationDashboard';
import { LeadCaptureDashboard } from '@/components/admin/LeadCaptureDashboard';
import { AutomationWorkflowBuilder } from '@/components/admin/AutomationWorkflowBuilder';
import { CampaignAnalyticsDashboard } from '@/components/admin/CampaignAnalyticsDashboard';
import EnvironmentManagement from '@/components/admin/EnvironmentManagement';
import APIManagement from '@/components/admin/APIManagement';
import BackupRecovery from '@/components/admin/BackupRecovery';

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
          <TabsList className="grid w-full grid-cols-7 lg:grid-cols-14 bg-background/50 backdrop-blur-sm border border-border/50">
            <TabsTrigger value="realtime" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Zap className="w-4 h-4 mr-2" />
              Real-Time
            </TabsTrigger>
            <TabsTrigger value="marketing" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Mail className="w-4 h-4 mr-2" />
              Marketing
            </TabsTrigger>
            <TabsTrigger value="enterprise" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Enterprise
            </TabsTrigger>
            <TabsTrigger value="backend" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Shield className="w-4 h-4 mr-2" />
              Backend
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <FileText className="w-4 h-4 mr-2" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-2" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="automation" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Zap className="w-4 h-4 mr-2" />
              Automation
            </TabsTrigger>
            <TabsTrigger value="pages" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Globe className="w-4 h-4 mr-2" />
              Pages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="realtime">
            <RealTimeAnalyticsDashboard />
          </TabsContent>

          <TabsContent value="marketing">
            <Tabs defaultValue="email" className="space-y-4">
              <TabsList className="bg-background/30 backdrop-blur-sm">
                <TabsTrigger value="email">Email Campaigns</TabsTrigger>
                <TabsTrigger value="segments">Segmentation</TabsTrigger>
                <TabsTrigger value="leads">Lead Capture</TabsTrigger>
                <TabsTrigger value="workflows">Workflows</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <EmailMarketingDashboard />
              </TabsContent>
              <TabsContent value="segments">
                <SegmentationDashboard />
              </TabsContent>
              <TabsContent value="leads">
                <LeadCaptureDashboard />
              </TabsContent>
              <TabsContent value="workflows">
                <AutomationWorkflowBuilder />
              </TabsContent>
              <TabsContent value="analytics">
                <CampaignAnalyticsDashboard />
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Tabs defaultValue="behavioral" className="space-y-4">
              <TabsList className="bg-gray-800/30">
                <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
                <TabsTrigger value="funnels">Funnels</TabsTrigger>
                <TabsTrigger value="abtesting">A/B Testing</TabsTrigger>
              </TabsList>
              <TabsContent value="behavioral">
                <BehavioralAnalyticsDashboard />
              </TabsContent>
              <TabsContent value="funnels">
                <FunnelAnalyticsDashboard />
              </TabsContent>
              <TabsContent value="abtesting">
                <ABTestingDashboard />
              </TabsContent>
            </Tabs>
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

          <TabsContent value="pages">
            <Tabs defaultValue="management" className="space-y-4">
              <TabsList className="bg-gray-800/30">
                <TabsTrigger value="management">Page Management</TabsTrigger>
                <TabsTrigger value="media">Media Library</TabsTrigger>
                <TabsTrigger value="theme">Theme</TabsTrigger>
              </TabsList>
              <TabsContent value="management">
                <PageManagement />
              </TabsContent>
              <TabsContent value="media">
                <MediaLibrary />
              </TabsContent>
              <TabsContent value="theme">
                <ThemeCustomizer />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="enterprise">
            <Tabs defaultValue="environments" className="space-y-4">
              <TabsList className="bg-gray-800/30">
                <TabsTrigger value="environments">Environments</TabsTrigger>
                <TabsTrigger value="api">API Management</TabsTrigger>
                <TabsTrigger value="backup">Backup & Recovery</TabsTrigger>
              </TabsList>
              <TabsContent value="environments">
                <EnvironmentManagement />
              </TabsContent>
              <TabsContent value="api">
                <APIManagement />
              </TabsContent>
              <TabsContent value="backup">
                <BackupRecovery />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
