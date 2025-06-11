
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
  updated_at: string;
  last_sign_in?: string;
}

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error loading users",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Role updated successfully",
        description: `User role has been changed to ${newRole}.`,
      });

      await fetchUsers();
      return { success: true };
    } catch (error: any) {
      console.error('Error updating user role:', error);
      toast({
        title: "Failed to update role",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const bulkUpdateRoles = async (userIds: string[], newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .in('id', userIds);

      if (error) throw error;

      toast({
        title: "Bulk update successful",
        description: `${userIds.length} users updated to ${newRole} role.`,
      });

      await fetchUsers();
      setSelectedUsers([]);
      return { success: true };
    } catch (error: any) {
      console.error('Error bulk updating roles:', error);
      toast({
        title: "Bulk update failed",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const exportUsers = () => {
    const csvContent = [
      ['Email', 'Full Name', 'Role', 'Created At'],
      ...users.map(user => [
        user.email,
        user.full_name || 'N/A',
        user.role,
        new Date(user.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export successful",
      description: "User data has been exported to CSV.",
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    selectedUsers,
    setSelectedUsers,
    fetchUsers,
    updateUserRole,
    bulkUpdateRoles,
    exportUsers
  };
};
