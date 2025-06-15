import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  FileText, 
  MessageSquare, 
  Mail, 
  Upload,
  Bell,
  Search,
  Settings,
  TrendingUp,
  Activity,
  Target,
  Zap,
  Globe
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AdminStats from '@/components/admin/AdminStats';
import UserManagement from '@/components/admin/UserManagement';
import BlogManagement from '@/components/admin/BlogManagement';
import ContactFormManagement from '@/components/admin/ContactFormManagement';
import NewsletterManagement from '@/components/admin/NewsletterManagement';
import FileUploadManager from '@/components/admin/FileUploadManager';
import AdvancedAnalyticsDashboard from '@/components/admin/AdvancedAnalyticsDashboard';
import SEOManagementDashboard from '@/components/admin/SEOManagementDashboard';
import PerformanceMonitoringDashboard from '@/components/admin/PerformanceMonitoringDashboard';
import AnalyticsForecastingDashboard from '@/components/admin/AnalyticsForecastingDashboard';
import BackendAnalyticsDashboard from '@/components/backend/BackendAnalyticsDashboard';
import LeadManagement from '@/components/backend/LeadManagement';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Fix: Check both user_metadata role AND profile role for admin access
  const isAdmin = user && (
    user.user_metadata?.role === 'admin' || 
    profile?.role === 'admin' ||
    user.email === 'suryanshj83@gmail.com' // Temporary admin access for your email
  );

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  const tabItems = [
    {
      value: 'overview',
      label: 'Overview',
      icon: BarChart3,
      description: 'Dashboard overview and statistics'
    },
    {
      value: 'backend-analytics',
      label: 'Backend Analytics',
      icon: TrendingUp,
      description: 'Analytics from Python/FastAPI backend'
    },
    {
      value: 'leads',
      label: 'Lead Management',
      icon: Users,
      description: 'Manage leads from backend system'
    },
    {
      value: 'analytics',
      label: 'Supabase Analytics',
      icon: Activity,
      description: 'Advanced analytics and insights'
    },
    {
      value: 'performance',
      label: 'Performance',
      icon: Activity,
      description: 'Real-time performance monitoring'
    },
    {
      value: 'seo',
      label: 'SEO Management',
      icon: Search,
      description: 'Complete SEO optimization suite'
    },
    {
      value: 'forecasting',
      label: 'Forecasting',
      icon: Target,
      description: 'Analytics forecasting and ROI tracking'
    },
    {
      value: 'users',
      label: 'Users',
      icon: Users,
      description: 'Manage user accounts and permissions'
    },
    {
      value: 'blog',
      label: 'Blog',
      icon: FileText,
      description: 'Create and manage blog posts'
    },
    {
      value: 'contacts',
      label: 'Contacts',
      icon: MessageSquare,
      description: 'View and manage contact submissions'
    },
    {
      value: 'newsletter',
      label: 'Newsletter',
      icon: Mail,
      description: 'Manage newsletter subscriptions'
    },
    {
      value: 'files',
      label: 'Files',
      icon: Upload,
      description: 'Upload and manage files'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">
              Digital Intelligence Hub
            </h1>
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
              Administrator
            </Badge>
          </div>
          <p className="text-gray-400">
            Advanced digital performance, growth automation, and predictive intelligence platform with Python/FastAPI backend integration.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 bg-gray-900/50 p-1 rounded-lg overflow-x-auto">
            {tabItems.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-400 hover:text-white transition-colors min-w-fit"
              >
                <item.icon className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline text-xs lg:text-sm whitespace-nowrap">{item.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AdminStats />
            </motion.div>
          </TabsContent>

          <TabsContent value="backend-analytics" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <BackendAnalyticsDashboard />
            </motion.div>
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <LeadManagement />
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AdvancedAnalyticsDashboard />
            </motion.div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <PerformanceMonitoringDashboard />
            </motion.div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SEOManagementDashboard />
            </motion.div>
          </TabsContent>

          <TabsContent value="forecasting" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AnalyticsForecastingDashboard />
            </motion.div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <UserManagement />
            </motion.div>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <BlogManagement />
            </motion.div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ContactFormManagement />
            </motion.div>
          </TabsContent>

          <TabsContent value="newsletter" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <NewsletterManagement />
            </motion.div>
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FileUploadManager />
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Enhanced Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8"
        >
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Digital Intelligence Quick Actions
              </CardTitle>
              <CardDescription className="text-gray-400">
                Access advanced tools and automation features instantly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {tabItems.slice(1, 6).map((item) => (
                  <motion.button
                    key={item.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(item.value)}
                    className="glass-card text-left hover:bg-gray-800/50 transition-colors group"
                  >
                    <item.icon className="w-8 h-8 text-purple-400 mb-3 group-hover:text-purple-300 transition-colors" />
                    <h3 className="font-semibold text-white mb-1 group-hover:text-purple-100 transition-colors">{item.label}</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{item.description}</p>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Status Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card text-center">
              <Globe className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-white">System Status</p>
              <Badge className="bg-green-500/20 text-green-400 mt-1">Operational</Badge>
            </div>
            <div className="glass-card text-center">
              <Activity className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-white">Performance</p>
              <Badge className="bg-blue-500/20 text-blue-400 mt-1">Excellent</Badge>
            </div>
            <div className="glass-card text-center">
              <Search className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-white">SEO Score</p>
              <Badge className="bg-purple-500/20 text-purple-400 mt-1">94/100</Badge>
            </div>
            <div className="glass-card text-center">
              <TrendingUp className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <p className="text-sm text-white">Growth Rate</p>
              <Badge className="bg-orange-500/20 text-orange-400 mt-1">+47%</Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
