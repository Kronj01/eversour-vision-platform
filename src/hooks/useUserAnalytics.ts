
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserActivity {
  id: string;
  user_id: string;
  action: string;
  details: string | null;
  created_at: string;
  user?: {
    full_name: string | null;
    email: string;
  };
}

export interface UserAnalytics {
  totalUsers: number;
  newUsersThisMonth: number;
  activeUsers: number;
  adminUsers: number;
  userGrowth: number;
  activityTrend: Array<{ date: string; count: number }>;
}

export const useUserAnalytics = () => {
  const [analytics, setAnalytics] = useState<UserAnalytics>({
    totalUsers: 0,
    newUsersThisMonth: 0,
    activeUsers: 0,
    adminUsers: 0,
    userGrowth: 0,
    activityTrend: []
  });
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAnalytics = async () => {
    try {
      // Get total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get new users this month
      const currentMonth = new Date();
      currentMonth.setDate(1);
      const { count: newUsersThisMonth } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', currentMonth.toISOString());

      // Get admin users
      const { count: adminUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'admin');

      // Calculate user growth (mock data for now)
      const userGrowth = newUsersThisMonth || 0;

      setAnalytics({
        totalUsers: totalUsers || 0,
        newUsersThisMonth: newUsersThisMonth || 0,
        activeUsers: totalUsers || 0, // Mock active users
        adminUsers: adminUsers || 0,
        userGrowth,
        activityTrend: [] // Mock trend data
      });

    } catch (error: any) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Error loading analytics",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logActivity = async (userId: string, action: string, details?: string) => {
    try {
      console.log('Logging activity:', { userId, action, details });
      // For now, we'll just log to console since we don't have an activity table
      // In a real implementation, you'd insert into an activities table
    } catch (error: any) {
      console.error('Error logging activity:', error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    analytics,
    activities,
    loading,
    fetchAnalytics,
    logActivity
  };
};
