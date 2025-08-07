import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  trigger_type: string;
  trigger_config: Record<string, any>;
  workflow_steps: WorkflowStep[];
  is_active: boolean;
  total_runs: number;
  success_rate: number;
  created_at: string;
  updated_at: string;
}

export interface WorkflowStep {
  id: string;
  type: 'email' | 'delay' | 'condition' | 'action' | 'webhook';
  title: string;
  config: Record<string, any>;
  order: number;
}

export interface WorkflowExecution {
  id: string;
  workflow_id: string;
  status: 'running' | 'completed' | 'failed' | 'paused';
  current_step: number;
  execution_data: Record<string, any>;
  started_at: string;
  completed_at?: string;
  error_message?: string;
}

export const useAutomationWorkflows = () => {
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>([]);
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchWorkflows = async () => {
    try {
      // Mock data for now - replace with real Supabase calls when tables are created
      const mockWorkflows: AutomationWorkflow[] = [
        {
          id: '1',
          name: 'Welcome Email Series',
          description: 'Send welcome emails to new subscribers',
          trigger_type: 'user_signup',
          trigger_config: { event: 'user_registration' },
          workflow_steps: [
            { id: '1', type: 'email', title: 'Welcome Email', config: { template: 'welcome' }, order: 1 },
            { id: '2', type: 'delay', title: 'Wait 2 days', config: { delay: 2, unit: 'days' }, order: 2 },
            { id: '3', type: 'email', title: 'Getting Started Guide', config: { template: 'guide' }, order: 3 }
          ],
          is_active: true,
          total_runs: 234,
          success_rate: 94.5,
          created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
          updated_at: new Date(Date.now() - 86400000 * 2).toISOString()
        },
        {
          id: '2',
          name: 'Abandoned Cart Recovery',
          description: 'Recover abandoned cart conversions',
          trigger_type: 'cart_abandoned',
          trigger_config: { timeout: 60, event: 'cart_abandon' },
          workflow_steps: [
            { id: '1', type: 'delay', title: 'Wait 1 hour', config: { delay: 1, unit: 'hours' }, order: 1 },
            { id: '2', type: 'email', title: 'Cart Reminder', config: { template: 'cart_reminder' }, order: 2 },
            { id: '3', type: 'delay', title: 'Wait 24 hours', config: { delay: 24, unit: 'hours' }, order: 3 },
            { id: '4', type: 'email', title: 'Discount Offer', config: { template: 'discount_offer' }, order: 4 }
          ],
          is_active: true,
          total_runs: 156,
          success_rate: 23.1,
          created_at: new Date(Date.now() - 86400000 * 14).toISOString(),
          updated_at: new Date(Date.now() - 86400000 * 1).toISOString()
        }
      ];

      setWorkflows(mockWorkflows);
    } catch (error: any) {
      console.error('Error fetching workflows:', error);
      toast({
        title: "Error loading workflows",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchExecutions = async () => {
    try {
      // Mock data for now
      const mockExecutions: WorkflowExecution[] = [
        {
          id: '1',
          workflow_id: '1',
          status: 'completed',
          current_step: 3,
          execution_data: { user_id: 'user123', email: 'user@example.com' },
          started_at: new Date(Date.now() - 3600000).toISOString(),
          completed_at: new Date(Date.now() - 1800000).toISOString()
        },
        {
          id: '2',
          workflow_id: '2',
          status: 'running',
          current_step: 2,
          execution_data: { cart_id: 'cart456', user_id: 'user789' },
          started_at: new Date(Date.now() - 1800000).toISOString()
        }
      ];

      setExecutions(mockExecutions);
    } catch (error: any) {
      console.error('Error fetching executions:', error);
    } finally {
      setLoading(false);
    }
  };

  const createWorkflow = async (workflowData: Omit<AutomationWorkflow, 'id' | 'created_at' | 'updated_at' | 'total_runs' | 'success_rate'>) => {
    try {
      const newWorkflow: AutomationWorkflow = {
        ...workflowData,
        id: Math.random().toString(36).substring(2, 15),
        total_runs: 0,
        success_rate: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setWorkflows(prev => [newWorkflow, ...prev]);
      toast({
        title: "Workflow created",
        description: `"${workflowData.name}" has been created successfully.`,
      });

      return { success: true, data: newWorkflow };
    } catch (error: any) {
      toast({
        title: "Failed to create workflow",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const updateWorkflow = async (id: string, updates: Partial<AutomationWorkflow>) => {
    try {
      setWorkflows(prev => prev.map(w => 
        w.id === id 
          ? { ...w, ...updates, updated_at: new Date().toISOString() }
          : w
      ));

      toast({
        title: "Workflow updated",
        description: "Workflow has been updated successfully.",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to update workflow",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const deleteWorkflow = async (id: string) => {
    try {
      setWorkflows(prev => prev.filter(w => w.id !== id));
      toast({
        title: "Workflow deleted",
        description: "Workflow has been deleted successfully.",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to delete workflow",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const executeWorkflow = async (workflowId: string, triggerData: Record<string, any> = {}) => {
    try {
      const newExecution: WorkflowExecution = {
        id: Math.random().toString(36).substring(2, 15),
        workflow_id: workflowId,
        status: 'running',
        current_step: 0,
        execution_data: triggerData,
        started_at: new Date().toISOString()
      };

      setExecutions(prev => [newExecution, ...prev]);
      
      // Update workflow run count
      setWorkflows(prev => prev.map(w => 
        w.id === workflowId 
          ? { ...w, total_runs: w.total_runs + 1 }
          : w
      ));

      return { success: true, executionId: newExecution.id };
    } catch (error: any) {
      console.error('Error executing workflow:', error);
      return { success: false, error: error.message };
    }
  };

  const pauseExecution = async (executionId: string) => {
    try {
      setExecutions(prev => prev.map(e => 
        e.id === executionId ? { ...e, status: 'paused' as const } : e
      ));

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const resumeExecution = async (executionId: string) => {
    try {
      setExecutions(prev => prev.map(e => 
        e.id === executionId ? { ...e, status: 'running' as const } : e
      ));

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchWorkflows();
    fetchExecutions();
  }, []);

  return {
    workflows,
    executions,
    loading,
    fetchWorkflows,
    fetchExecutions,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    executeWorkflow,
    pauseExecution,
    resumeExecution
  };
};