
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Activity,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useUserAnalytics } from '@/hooks/useUserAnalytics';

const UserAnalytics = () => {
  const { analytics, loading } = useUserAnalytics();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-8 bg-gray-700 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const analyticsCards = [
    {
      title: 'Total Users',
      value: analytics.totalUsers,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-600/20'
    },
    {
      title: 'New This Month',
      value: analytics.newUsersThisMonth,
      icon: UserPlus,
      color: 'text-green-400',
      bgColor: 'bg-green-600/20'
    },
    {
      title: 'Admin Users',
      value: analytics.adminUsers,
      icon: Shield,
      color: 'text-purple-400',
      bgColor: 'bg-purple-600/20'
    },
    {
      title: 'Active Users',
      value: analytics.activeUsers,
      icon: Activity,
      color: 'text-orange-400',
      bgColor: 'bg-orange-600/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsCards.map((card) => (
          <Card key={card.title} className="bg-gray-900/50 border-gray-800 hover:border-purple-400/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{card.title}</p>
                  <p className={`text-2xl font-bold ${card.color} mt-1`}>
                    {card.value.toLocaleString()}
                  </p>
                </div>
                <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              User Growth
            </CardTitle>
            <CardDescription className="text-gray-400">
              Monthly user registration trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-3xl font-bold text-green-400 mb-2">
                +{analytics.userGrowth}
              </div>
              <p className="text-gray-400">New users this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gray-400">
              Latest user activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-sm">New user registration</p>
                  <p className="text-gray-400 text-xs">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center">
                  <Activity className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-white text-sm">User login activity</p>
                  <p className="text-gray-400 text-xs">5 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserAnalytics;
