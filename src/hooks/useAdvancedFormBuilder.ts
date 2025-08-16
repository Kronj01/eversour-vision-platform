import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'file' | 'rating' | 'number' | 'url';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
  conditional?: {
    dependsOn: string;
    value: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  };
  order: number;
}

export interface FormStyle {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  buttonColor: string;
  buttonTextColor: string;
  fontFamily: string;
  fontSize: string;
  borderRadius: string;
  spacing: string;
}

export interface AdvancedForm {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  settings: {
    submitButtonText: string;
    successMessage: string;
    errorMessage: string;
    redirectUrl?: string;
    emailNotifications: boolean;
    autoResponder: boolean;
    allowMultipleSubmissions: boolean;
    captchaEnabled: boolean;
    submitLimit?: number;
    expiryDate?: string;
  };
  styling: FormStyle;
  analytics: {
    views: number;
    submissions: number;
    conversionRate: number;
    abandonment: number;
    avgTimeToComplete: number;
  };
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface FormSubmission {
  id: string;
  form_id: string;
  submission_data: Record<string, any>;
  submitted_at: string;
  ip_address?: string;
  user_agent?: string;
  session_id?: string;
}

export const useAdvancedFormBuilder = () => {
  const [forms, setForms] = useState<AdvancedForm[]>([]);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchForms = async () => {
    try {
      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform database format to AdvancedForm format
      const transformedForms: AdvancedForm[] = (data || []).map(form => {
        const formSchema = form.form_schema as any;
        const settings = form.settings as any;
        
        return {
          id: form.id,
          name: form.name,
          description: form.description || '',
          fields: formSchema.fields || [],
          settings: {
            submitButtonText: settings.submitButtonText || 'Submit',
            successMessage: settings.successMessage || 'Thank you for your submission!',
            errorMessage: settings.errorMessage || 'There was an error submitting your form.',
            redirectUrl: settings.redirectUrl,
            emailNotifications: settings.emailNotifications || false,
            autoResponder: settings.autoResponder || false,
            allowMultipleSubmissions: settings.allowMultipleSubmissions || true,
            captchaEnabled: settings.captchaEnabled || false,
            submitLimit: settings.submitLimit,
            expiryDate: settings.expiryDate
          },
          styling: settings.styling || {
            backgroundColor: '#ffffff',
            textColor: '#374151',
            borderColor: '#d1d5db',
            buttonColor: '#8b5cf6',
            buttonTextColor: '#ffffff',
            fontFamily: 'Inter',
            fontSize: '16px',
            borderRadius: '8px',
            spacing: '16px'
          },
          analytics: settings.analytics || {
            views: 0,
            submissions: 0,
            conversionRate: 0,
            abandonment: 0,
            avgTimeToComplete: 0
          },
          status: form.is_active ? 'published' : 'draft',
          created_at: form.created_at,
          updated_at: form.updated_at
        };
      });

      setForms(transformedForms);
    } catch (error: any) {
      console.error('Error fetching forms:', error);
      toast({
        title: "Error loading forms",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createForm = async (formData: Omit<AdvancedForm, 'id' | 'created_at' | 'updated_at' | 'analytics'>) => {
    try {
      const user = await supabase.auth.getUser();
      
      const formInsert: Database['public']['Tables']['forms']['Insert'] = {
        name: formData.name,
        description: formData.description || null,
        form_schema: {
          fields: formData.fields
        } as any,
        settings: {
          ...formData.settings,
          styling: formData.styling,
          analytics: {
            views: 0,
            submissions: 0,
            conversionRate: 0,
            abandonment: 0,
            avgTimeToComplete: 0
          }
        } as any,
        is_active: formData.status === 'published',
        created_by: user.data.user?.id || null
      };

      const { data, error } = await supabase
        .from('forms')
        .insert(formInsert)
        .select()
        .single();

      if (error) throw error;

      await fetchForms(); // Refresh the forms list
      toast({
        title: "Form created",
        description: `"${formData.name}" has been created successfully.`,
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error creating form:', error);
      toast({
        title: "Failed to create form",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const updateForm = async (id: string, updates: Partial<AdvancedForm>) => {
    try {
      const dbUpdates: any = {
        updated_at: new Date().toISOString()
      };

      if (updates.name) dbUpdates.name = updates.name;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.status) dbUpdates.is_active = updates.status === 'published';
      
      if (updates.fields || updates.settings || updates.styling) {
        const currentForm = forms.find(f => f.id === id);
        if (currentForm) {
          dbUpdates.form_schema = {
            fields: updates.fields || currentForm.fields
          };
          dbUpdates.settings = {
            ...(currentForm.settings || {}),
            ...(updates.settings || {}),
            styling: updates.styling || currentForm.styling,
            analytics: currentForm.analytics
          };
        }
      }

      const { error } = await supabase
        .from('forms')
        .update(dbUpdates)
        .eq('id', id);

      if (error) throw error;

      await fetchForms(); // Refresh the forms list
      toast({
        title: "Form updated",
        description: "Form has been updated successfully.",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to update form",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const deleteForm = async (id: string) => {
    try {
      const { error } = await supabase
        .from('forms')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchForms(); // Refresh the forms list
      toast({
        title: "Form deleted",
        description: "Form has been deleted successfully.",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to delete form",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const duplicateForm = async (id: string) => {
    try {
      const formToDuplicate = forms.find(f => f.id === id);
      if (!formToDuplicate) throw new Error('Form not found');

      const duplicatedForm: AdvancedForm = {
        ...formToDuplicate,
        id: Math.random().toString(36).substring(2, 15),
        name: `${formToDuplicate.name} (Copy)`,
        status: 'draft',
        analytics: {
          views: 0,
          submissions: 0,
          conversionRate: 0,
          abandonment: 0,
          avgTimeToComplete: 0
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setForms(prev => [duplicatedForm, ...prev]);
      toast({
        title: "Form duplicated",
        description: "Form has been duplicated successfully.",
      });

      return { success: true, data: duplicatedForm };
    } catch (error: any) {
      toast({
        title: "Failed to duplicate form",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const submitForm = async (formId: string, submissionData: Record<string, any>) => {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .insert({
          form_id: formId,
          submission_data: submissionData,
          ip_address: '127.0.0.1', // This would be real IP in production
          user_agent: navigator.userAgent,
          session_id: localStorage.getItem('analytics_session_id') || 'anonymous'
        })
        .select()
        .single();

      if (error) throw error;

      await fetchSubmissions(); // Refresh submissions
      
      // Update form analytics in database
      const form = forms.find(f => f.id === formId);
      if (form) {
        const newSubmissionCount = form.analytics.submissions + 1;
        const newConversionRate = (newSubmissionCount / Math.max(form.analytics.views, 1)) * 100;
        
        await updateForm(formId, {
          analytics: {
            ...form.analytics,
            submissions: newSubmissionCount,
            conversionRate: newConversionRate
          }
        });
      }

      return { success: true, submissionId: data.id };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedSubmissions: FormSubmission[] = (data || []).map(sub => ({
        id: sub.id,
        form_id: sub.form_id,
        submission_data: sub.submission_data as Record<string, any>,
        submitted_at: sub.created_at,
        ip_address: sub.ip_address,
        user_agent: sub.user_agent,
        session_id: sub.session_id
      }));

      setSubmissions(transformedSubmissions);
    } catch (error: any) {
      console.error('Error fetching submissions:', error);
    }
  };

  const getFormSubmissions = (formId: string) => {
    return submissions.filter(s => s.form_id === formId);
  };

  const exportFormSubmissions = (formId: string, format: 'csv' | 'json' = 'csv') => {
    const formSubmissions = getFormSubmissions(formId);
    const form = forms.find(f => f.id === formId);
    
    if (format === 'csv') {
      const headers = form?.fields.map(f => f.label).join(',') + ',Submitted At';
      const rows = formSubmissions.map(sub => {
        const values = form?.fields.map(f => sub.submission_data[f.id] || '').join(',');
        return `${values},${sub.submitted_at}`;
      });
      return [headers, ...rows].join('\n');
    } else {
      return JSON.stringify(formSubmissions, null, 2);
    }
  };

  useEffect(() => {
    fetchForms();
    fetchSubmissions();
  }, []);

  return {
    forms,
    submissions,
    loading,
    fetchForms,
    fetchSubmissions,
    createForm,
    updateForm,
    deleteForm,
    duplicateForm,
    submitForm,
    getFormSubmissions,
    exportFormSubmissions
  };
};