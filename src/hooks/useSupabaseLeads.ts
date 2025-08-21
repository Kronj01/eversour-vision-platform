import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  created_at: string;
  updated_at: string;
  service_interest?: string;
  admin_notes?: string;
}

export const useSupabaseLeads = (status?: string) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchLeads = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Map contact_submissions to Lead interface
      const mappedLeads = (data || []).map((submission): Lead => ({
        id: submission.id,
        name: submission.name,
        email: submission.email,
        phone: submission.phone || undefined,
        company: submission.company || undefined,
        message: submission.message,
        status: submission.status as Lead['status'],
        created_at: submission.created_at,
        updated_at: submission.updated_at,
        service_interest: submission.service_interest || undefined,
        admin_notes: submission.admin_notes || undefined
      }));

      setLeads(mappedLeads);
      setError(null);
    } catch (err: any) {
      console.error('Leads error:', err);
      setError(err.message);
      toast({
        title: "Error fetching leads",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [status]);

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({
          status: updates.status,
          admin_notes: updates.admin_notes
        })
        .eq('id', id);

      if (error) throw error;

      toast({ title: "Lead updated successfully" });
      await fetchLeads();
    } catch (err: any) {
      toast({
        title: "Error updating lead",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  return { leads, loading, error, updateLead, refetch: fetchLeads };
};