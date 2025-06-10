
import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Mail, 
  BarChart3, 
  Settings, 
  Shield,
  Calendar,
  MessageSquare,
  Eye,
  Plus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminStats from '@/components/admin/AdminStats';
import UserManagement from '@/components/admin/UserManagement';
import ContactFormManagement from '@/components/admin/ContactFormManagement';
import BlogManagement from '@/components/admin/BlogManagement';

const AdminDashboard = () => {
  const { user, profile, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect if not admin
  if (profile?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const adminCards = [
    {
      title: 'Users',
      description: 'Manage user accounts',
      icon: Users,
      value: '0', // Will be dynamic later
      color: 'text-blue-400',
      tab: 'users'
    },
    {
      title: 'Contact Forms',
      description: 'Review submissions',
      icon: Mail,
      value: '0',
      color: 'text-green-400',
      tab: 'contacts'
    },
    {
      title: 'Blog Posts',
      description: 'Manage content',
      icon: FileText,
      value: '0',
      color: 'text-purple-400',
      tab: 'blog'
    },
    {
      title: 'Analytics',
      description: 'View site metrics',
      icon: BarChart3,
      value: 'Live',
      color: 'text-orange-400',
      tab: 'analytics'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Admin Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 text-lg">
                Manage your application and monitor performance
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-white font-medium">{profile.full_name}</p>
                <p className="text-purple-400 text-sm">Administrator</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <AdminStats />
        </motion.div>

        {/* Admin Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 bg-gray-900/50 border border-purple-400/30">
              <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-600">
                Overview
              </TabsTrigger>
              <TabsTrigger value="users" className="text-white data-[state=active]:bg-purple-600">
                Users
              </TabsTrigger>
              <TabsTrigger value="contacts" className="text-white data-[state=active]:bg-purple-600">
                Contacts
              </TabsTrigger>
              <TabsTrigger value="blog" className="text-white data-[state=active]:bg-purple-600">
                Blog
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-purple-600">
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {adminCards.map((card, index) => (
                  <Card key={card.title} className="bg-gray-900/50 border-gray-800 hover:border-purple-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <card.icon className={`w-6 h-6 ${card.color}`} />
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-white text-lg mb-1">{card.title}</CardTitle>
                      <CardDescription className="text-gray-400 mb-3">{card.description}</CardDescription>
                      <p className={`font-semibold ${card.color}`}>{card.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Activity</CardTitle>
                    <CardDescription className="text-gray-400">Latest system events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                        <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-green-400" />
                        </div>
                        <div>
                          <p className="text-white text-sm">New user registered</p>
                          <p className="text-gray-400 text-xs">2 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                          <Mail className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white text-sm">Contact form submitted</p>
                          <p className="text-gray-400 text-xs">5 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                    <CardDescription className="text-gray-400">Common admin tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white">
                        <Plus className="w-4 h-4 mr-3" />
                        Create Blog Post
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800">
                        <MessageSquare className="w-4 h-4 mr-3" />
                        View Messages
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800">
                        <Settings className="w-4 h-4 mr-3" />
                        System Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="contacts">
              <ContactFormManagement />
            </TabsContent>

            <TabsContent value="blog">
              <BlogManagement />
            </TabsContent>

            <TabsContent value="analytics">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Analytics Dashboard</CardTitle>
                  <CardDescription className="text-gray-400">Site performance and user metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <p className="text-gray-400">Analytics dashboard coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
