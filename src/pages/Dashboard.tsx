
import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield, BarChart3, FileText, Users, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user, profile } = useAuth();

  if (!user || !profile) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const dashboardCards = [
    {
      title: 'Profile',
      description: 'Manage your account settings',
      icon: User,
      value: profile.full_name || 'Complete your profile',
      color: 'text-blue-400'
    },
    {
      title: 'Projects',
      description: 'View your active projects',
      icon: FileText,
      value: '0 Active',
      color: 'text-green-400'
    },
    {
      title: 'Analytics',
      description: 'Track your performance',
      icon: BarChart3,
      value: 'Coming Soon',
      color: 'text-purple-400'
    },
    {
      title: 'Team',
      description: 'Collaborate with others',
      icon: Users,
      value: '1 Member',
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-6 mb-8">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profile.avatar_url || ''} alt={profile.full_name || 'User'} />
              <AvatarFallback className="bg-purple-600 text-white text-xl">
                {profile.full_name ? getInitials(profile.full_name) : <User className="w-8 h-8" />}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {profile.full_name || 'User'}!
              </h1>
              <p className="text-gray-400 text-lg">
                Manage your account and projects from your dashboard
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-purple-600/20 to-purple-400/20 rounded-2xl p-6 border border-purple-400/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Mail className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-purple-400 font-semibold">Email</span>
                </div>
                <p className="text-white">{profile.email}</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-purple-400 font-semibold">Role</span>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  profile.role === 'admin' 
                    ? 'bg-purple-600/20 text-purple-400'
                    : 'bg-blue-600/20 text-blue-400'
                }`}>
                  {profile.role === 'admin' ? 'Administrator' : 'User'}
                </span>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-purple-400 font-semibold">Member Since</span>
                </div>
                <p className="text-white">{new Date(profile.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {dashboardCards.map((card, index) => (
            <Card key={card.title} className="bg-gray-900/50 border-gray-800 hover:border-purple-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Settings className="w-4 h-4" />
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
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-gray-400">Your latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                  <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">Account created</p>
                    <p className="text-gray-400 text-xs">{new Date(profile.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-center py-8">
                  <p className="text-gray-400">No recent activity</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-400">Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white">
                  <FileText className="w-4 h-4 mr-3" />
                  Create New Project
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Settings className="w-4 h-4 mr-3" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800">
                  <BarChart3 className="w-4 h-4 mr-3" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
