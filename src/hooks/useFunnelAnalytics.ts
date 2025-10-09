import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface FunnelStep {
  name: string;
  url: string;
  event?: string;
}

export interface FunnelDefinition {
  id: string;
  name: string;
  description?: string | null;
  steps: any;
  conversion_window_hours: number;
  is_active: boolean;
  created_at: string;
  created_by?: string | null;
  updated_at: string;
}

export interface FunnelAnalysis {
  funnel_id: string;
  funnel_name: string;
  total_entered: number;
  total_completed: number;
  conversion_rate: number;
  avg_time_to_complete: number;
  step_metrics: Array<{
    step: number;
    step_name: string;
    entered: number;
    completed: number;
    dropped: number;
    drop_rate: number;
    avg_time: number;
  }>;
}

export const useFunnelAnalytics = () => {
  const [funnels, setFunnels] = useState<FunnelDefinition[]>([]);
  const [analysis, setAnalysis] = useState<FunnelAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFunnels = async () => {
    try {
      const { data, error } = await supabase
        .from('funnel_definitions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setFunnels(data || []);
    } catch (error: any) {
      console.error('Error fetching funnels:', error);
      toast({
        title: "Error loading funnels",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const createFunnel = async (funnel: Omit<FunnelDefinition, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('funnel_definitions')
        .insert({
          name: funnel.name,
          description: funnel.description,
          steps: funnel.steps,
          conversion_window_hours: funnel.conversion_window_hours,
          is_active: funnel.is_active
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Funnel created",
        description: `${funnel.name} has been created successfully.`,
      });

      await fetchFunnels();
      return data;
    } catch (error: any) {
      console.error('Error creating funnel:', error);
      toast({
        title: "Error creating funnel",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateFunnel = async (id: string, updates: Partial<FunnelDefinition>) => {
    try {
      const { error } = await supabase
        .from('funnel_definitions')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Funnel updated",
        description: "Funnel has been updated successfully.",
      });

      await fetchFunnels();
    } catch (error: any) {
      console.error('Error updating funnel:', error);
      toast({
        title: "Error updating funnel",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteFunnel = async (id: string) => {
    try {
      const { error } = await supabase
        .from('funnel_definitions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Funnel deleted",
        description: "Funnel has been deleted successfully.",
      });

      await fetchFunnels();
    } catch (error: any) {
      console.error('Error deleting funnel:', error);
      toast({
        title: "Error deleting funnel",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const analyzeFunnel = async (funnelId: string, dateRange?: { start: Date; end: Date }) => {
    try {
      setLoading(true);

      const { data: funnel, error: funnelError } = await supabase
        .from('funnel_definitions')
        .select('*')
        .eq('id', funnelId)
        .single();

      if (funnelError) throw funnelError;

      let query = supabase
        .from('funnel_analytics')
        .select('*')
        .eq('funnel_id', funnelId);

      if (dateRange) {
        query = query
          .gte('created_at', dateRange.start.toISOString())
          .lte('created_at', dateRange.end.toISOString());
      }

      const { data: analyticsData, error: analyticsError } = await query;

      if (analyticsError) throw analyticsError;

      const totalEntered = analyticsData?.length || 0;
      const totalCompleted = analyticsData?.filter(a => a.completed).length || 0;
      const conversionRate = totalEntered > 0 ? (totalCompleted / totalEntered) * 100 : 0;

      const completedSessions = analyticsData?.filter(a => a.completed && a.time_to_complete) || [];
      const avgTimeToComplete = completedSessions.length > 0
        ? completedSessions.reduce((sum, a) => sum + (a.time_to_complete || 0), 0) / completedSessions.length
        : 0;

      // Calculate step metrics
      const steps = Array.isArray(funnel.steps) ? funnel.steps : [];
      const stepMetrics = steps.map((step: any, index: number) => {
        const stepNumber = index + 1;
        const entered = analyticsData?.filter(a => a.current_step >= stepNumber).length || 0;
        const completed = analyticsData?.filter(a => a.current_step > stepNumber).length || 0;
        const dropped = analyticsData?.filter(a => a.dropped_at_step === stepNumber).length || 0;
        const dropRate = entered > 0 ? (dropped / entered) * 100 : 0;

        return {
          step: stepNumber,
          step_name: step?.name || `Step ${stepNumber}`,
          entered,
          completed,
          dropped,
          drop_rate: Math.round(dropRate * 100) / 100,
          avg_time: 0 // Can be calculated from step_timestamps
        };
      });

      const result: FunnelAnalysis = {
        funnel_id: funnelId,
        funnel_name: funnel.name,
        total_entered: totalEntered,
        total_completed: totalCompleted,
        conversion_rate: Math.round(conversionRate * 100) / 100,
        avg_time_to_complete: Math.round(avgTimeToComplete),
        step_metrics: stepMetrics
      };

      setAnalysis([result]);
      return result;

    } catch (error: any) {
      console.error('Error analyzing funnel:', error);
      toast({
        title: "Error analyzing funnel",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunnels();
    setLoading(false);
  }, []);

  return {
    funnels,
    analysis,
    loading,
    createFunnel,
    updateFunnel,
    deleteFunnel,
    analyzeFunnel,
    refresh: fetchFunnels
  };
};
