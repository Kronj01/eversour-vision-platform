
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
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AdminStats from '@/components/admin/AdminStats';
import UserManagement from '@/components/admin/UserManagement';
import BlogManagement from '@/components/admin/BlogManagement';
import ContactFormManagement from '@/components/admin/ContactFormManagement';
import NewsletterManagement from '@/components/admin/NewsletterManagement';
import FileUploadManager from '@/components/admin/FileUploadManager';
import AdvancedAnalyticsDashboard from '@/components/admin/AdvancedAnalyticsDashboard';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user || user.user_metadata?.role !== 'admin') {
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
      value: 'analytics',
      label: 'Analytics',
      icon: TrendingUp,
      description: 'Advanced analytics and insights'
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
              Admin Dashboard
            </h1>
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
              Administrator
            </Badge>
          </div>
          <p className="text-gray-400">
            Manage your website content, users, and analytics from one central location.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-7 bg-gray-900/50 p-1 rounded-lg">
            {tabItems.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-400 hover:text-white transition-colors"
              >
                <item.icon className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">{item.label}</span>
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

          <TabsContent value="analytics" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AdvancedAnalyticsDashboard />
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

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8"
        >
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-gray-400">
                Common administrative tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tabItems.slice(1).map((item) => (
                  <motion.button
                    key={item.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(item.value)}
                    className="glass-card text-left hover:bg-gray-800/50 transition-colors"
                  >
                    <item.icon className="w-8 h-8 text-purple-400 mb-3" />
                    <h3 className="font-semibold text-white mb-1">{item.label}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
