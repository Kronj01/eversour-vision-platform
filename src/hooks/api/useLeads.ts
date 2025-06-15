
import { useState, useEffect } from 'react';
import { leadsApi } from '@/api/endpoints';
import { Lead } from '@/api/types';
import { useToast } from '@/hooks/use-toast';

export const useLeads = (status?: string) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await leadsApi.getLeads(status);
      setLeads(data);
      setError(null);
    } catch (err: any) {
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

  const createLead = async (leadData: Partial<Lead>) => {
    try {
      await leadsApi.createLead(leadData);
      toast({ title: "Lead created successfully" });
      await fetchLeads();
    } catch (err: any) {
      toast({
        title: "Error creating lead",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const updateLead = async (id: string, data: Partial<Lead>) => {
    try {
      await leadsApi.updateLead(id, data);
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

  return { leads, loading, error, createLead, updateLead, refetch: fetchLeads };
};
