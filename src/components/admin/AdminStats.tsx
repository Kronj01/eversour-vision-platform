
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const AdminStats = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '0',
      change: '+0%',
      trend: 'up',
      description: 'vs last month'
    },
    {
      title: 'Active Sessions',
      value: '1',
      change: '+100%',
      trend: 'up',
      description: 'current active users'
    },
    {
      title: 'Contact Forms',
      value: '0',
      change: '0%',
      trend: 'neutral',
      description: 'submissions today'
    },
    {
      title: 'Page Views',
      value: '0',
      change: '+0%',
      trend: 'up',
      description: 'in last 24h'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-purple-600/20 to-purple-400/20 rounded-2xl p-6 border border-purple-400/30">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.title} className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Activity className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-purple-400 font-semibold">{stat.title}</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <div className="flex items-center justify-center space-x-1">
                {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
                {stat.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
                <span className={`text-sm ${
                  stat.trend === 'up' ? 'text-green-400' : 
                  stat.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-gray-400">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStats;
