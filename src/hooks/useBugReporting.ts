
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface BugReport {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  reporter_id: string;
  reporter_name: string;
  file_path?: string;
  line_number?: number;
  stack_trace?: string;
  browser_info?: string;
  steps_to_reproduce: string[];
  created_at: string;
  updated_at: string;
  assigned_to?: string;
  labels: string[];
}

export interface CodeQualityMetrics {
  total_files: number;
  lines_of_code: number;
  technical_debt_ratio: number;
  code_coverage: number;
  cyclomatic_complexity: number;
  duplicated_lines: number;
  security_vulnerabilities: number;
  performance_issues: number;
}

export const useBugReporting = () => {
  const [bugs, setBugs] = useState<BugReport[]>([]);
  const [codeMetrics, setCodeMetrics] = useState<CodeQualityMetrics>({
    total_files: 156,
    lines_of_code: 12450,
    technical_debt_ratio: 2.3,
    code_coverage: 78.5,
    cyclomatic_complexity: 3.2,
    duplicated_lines: 234,
    security_vulnerabilities: 2,
    performance_issues: 5,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockBugs: BugReport[] = [
      {
        id: '1',
        title: 'Login form validation not working',
        description: 'The email validation on login form is not triggering properly',
        severity: 'medium',
        status: 'open',
        reporter_id: 'user1',
        reporter_name: 'John Doe',
        file_path: 'src/components/auth/LoginForm.tsx',
        line_number: 45,
        stack_trace: 'Error at validateEmail function...',
        browser_info: 'Chrome 120.0.0',
        steps_to_reproduce: [
          'Go to login page',
          'Enter invalid email',
          'Click submit',
          'No validation error shows'
        ],
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-15T10:30:00Z',
        labels: ['frontend', 'validation', 'auth'],
      },
      {
        id: '2',
        title: 'Performance issue on dashboard',
        description: 'Dashboard loading time is very slow with large datasets',
        severity: 'high',
        status: 'in-progress',
        reporter_id: 'user2',
        reporter_name: 'Jane Smith',
        file_path: 'src/pages/Dashboard.tsx',
        steps_to_reproduce: [
          'Login as admin',
          'Navigate to dashboard',
          'Wait for data to load',
          'Notice slow loading time'
        ],
        created_at: '2024-01-14T14:20:00Z',
        updated_at: '2024-01-15T09:15:00Z',
        assigned_to: 'dev-team',
        labels: ['performance', 'dashboard', 'optimization'],
      },
    ];

    setBugs(mockBugs);
    setLoading(false);
  }, []);

  const createBug = async (bugData: Partial<BugReport>) => {
    try {
      const newBug: BugReport = {
        id: Date.now().toString(),
        title: bugData.title || '',
        description: bugData.description || '',
        severity: bugData.severity || 'low',
        status: 'open',
        reporter_id: 'current-user',
        reporter_name: 'Current User',
        steps_to_reproduce: bugData.steps_to_reproduce || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        labels: bugData.labels || [],
        ...bugData,
      };

      setBugs(prev => [newBug, ...prev]);
      toast({
        title: "Bug reported successfully",
        description: "The bug has been added to the tracking system.",
      });
    } catch (error: any) {
      toast({
        title: "Error reporting bug",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateBugStatus = async (bugId: string, status: BugReport['status']) => {
    try {
      setBugs(prev => prev.map(bug => 
        bug.id === bugId 
          ? { ...bug, status, updated_at: new Date().toISOString() }
          : bug
      ));
      toast({
        title: "Bug status updated",
        description: `Bug status changed to ${status}.`,
      });
    } catch (error: any) {
      toast({
        title: "Error updating bug status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    bugs,
    codeMetrics,
    loading,
    createBug,
    updateBugStatus,
  };
};
