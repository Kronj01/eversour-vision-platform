import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface BugReport {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  steps_to_reproduce: string;
  expected_behavior: string;
  actual_behavior: string;
  browser: string;
  os: string;
  url: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  reporter_email?: string;
}

export interface BugStats {
  total: number;
  open: number;
  in_progress: number;
  resolved: number;
  closed: number;
}

export const useBugReporting = () => {
  const [bugs, setBugs] = useState<BugReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<BugStats>({
    total: 0,
    open: 0,
    in_progress: 0,
    resolved: 0,
    closed: 0
  });
  const { toast } = useToast();

  const fetchBugs = async () => {
    try {
      // Mock data for demonstration
      const mockBugs: BugReport[] = [
        {
          id: '1',
          title: 'Contact form submission fails',
          description: 'When submitting the contact form, users get an error message.',
          severity: 'high',
          status: 'open',
          steps_to_reproduce: '1. Go to contact page\n2. Fill out form\n3. Click submit',
          expected_behavior: 'Form should submit successfully',
          actual_behavior: 'Error message appears and form doesn\'t submit',
          browser: 'Chrome 120.0',
          os: 'Windows 11',
          url: '/contact',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ];

      setBugs(mockBugs);
      setStats({
        total: mockBugs.length,
        open: mockBugs.filter(b => b.status === 'open').length,
        in_progress: mockBugs.filter(b => b.status === 'in_progress').length,
        resolved: mockBugs.filter(b => b.status === 'resolved').length,
        closed: mockBugs.filter(b => b.status === 'closed').length
      });
    } catch (error: any) {
      console.error('Error fetching bugs:', error);
      toast({
        title: "Error loading bug reports",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createBug = async (bugData: Omit<BugReport, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
    try {
      const newBug: BugReport = {
        ...bugData,
        id: Math.random().toString(),
        status: 'open',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setBugs(prev => [newBug, ...prev]);
      toast({
        title: "Bug report submitted",
        description: "Thank you for reporting this issue.",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to submit bug report",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const updateBugStatus = async (bugId: string, newStatus: string) => {
    try {
      setBugs(prev => prev.map(bug => 
        bug.id === bugId 
          ? { ...bug, status: newStatus as BugReport['status'], updated_at: new Date().toISOString() }
          : bug
      ));

      toast({
        title: "Bug status updated",
        description: `Bug status changed to ${newStatus.replace('_', ' ')}.`,
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to update bug status",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const assignBug = async (bugId: string, assignee: string) => {
    try {
      setBugs(prev => prev.map(bug => 
        bug.id === bugId 
          ? { ...bug, assigned_to: assignee, updated_at: new Date().toISOString() }
          : bug
      ));

      toast({
        title: "Bug assigned",
        description: `Bug assigned to ${assignee}.`,
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to assign bug",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  return {
    bugs,
    loading,
    stats,
    fetchBugs,
    createBug,
    updateBugStatus,
    assignBug
  };
};