import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface LeadCaptureForm {
  id: string;
  name: string;
  type: string;
  title: string;
  description?: string;
  fields: any[];
  success_message: string;
  redirect_url?: string;
  display_rules: any;
  design_config: any;
  is_active: boolean;
  total_views: number;
  total_submissions: number;
  conversion_rate: number;
  created_at: string;
  updated_at: string;
}

export const useLeadCapture = () => {
  const [forms, setForms] = useState<LeadCaptureForm[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchForms = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('lead_capture_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setForms((data || []) as LeadCaptureForm[]);
    } catch (error: any) {
      toast({
        title: "Error loading forms",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createForm = async (form: Partial<LeadCaptureForm>) => {
    try {
      const { data, error } = await supabase
        .from('lead_capture_forms')
        .insert([form] as any)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Form created",
        description: `${form.name} has been created successfully.`
      });

      await fetchForms();
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating form",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateForm = async (id: string, updates: Partial<LeadCaptureForm>) => {
    try {
      const { error } = await supabase
        .from('lead_capture_forms')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Form updated",
        description: "Lead capture form has been updated successfully."
      });

      await fetchForms();
    } catch (error: any) {
      toast({
        title: "Error updating form",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteForm = async (id: string) => {
    try {
      const { error } = await supabase
        .from('lead_capture_forms')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Form deleted",
        description: "Lead capture form has been deleted successfully."
      });

      await fetchForms();
    } catch (error: any) {
      toast({
        title: "Error deleting form",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const submitForm = async (formId: string, email: string, data: any) => {
    try {
      const { error } = await supabase
        .from('lead_captures')
        .insert({
          form_id: formId,
          email,
          data,
          source_url: window.location.href,
          user_agent: navigator.userAgent
        });

      if (error) throw error;

      // Increment submission count - fetch current form and increment
      const { data: formData } = await supabase
        .from('lead_capture_forms')
        .select('total_submissions')
        .eq('id', formId)
        .single();

      if (formData) {
        await supabase
          .from('lead_capture_forms')
          .update({ total_submissions: (formData.total_submissions || 0) + 1 })
          .eq('id', formId);
      }

      toast({
        title: "Submitted successfully",
        description: "Thank you for your submission!"
      });
    } catch (error: any) {
      toast({
        title: "Error submitting form",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const trackView = async (formId: string) => {
    try {
      const { data: formData } = await supabase
        .from('lead_capture_forms')
        .select('total_views')
        .eq('id', formId)
        .single();

      if (formData) {
        await supabase
          .from('lead_capture_forms')
          .update({ total_views: (formData.total_views || 0) + 1 })
          .eq('id', formId);
      }
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const fetchSubmissions = async (formId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('lead_captures')
        .select('*')
        .order('created_at', { ascending: false });

      if (formId) {
        query = query.eq('form_id', formId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading submissions",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    forms,
    submissions,
    loading,
    fetchForms,
    createForm,
    updateForm,
    deleteForm,
    submitForm,
    trackView,
    fetchSubmissions
  };
};
