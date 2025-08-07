import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
      // Using mock data since we don't have forms table yet
      const mockForms: AdvancedForm[] = [
        {
          id: '1',
          name: 'Contact Form',
          description: 'General contact form for inquiries',
          fields: [
            { 
              id: '1', 
              type: 'text', 
              label: 'Full Name', 
              required: true, 
              order: 1,
              validation: { minLength: 2, maxLength: 50 }
            },
            { 
              id: '2', 
              type: 'email', 
              label: 'Email Address', 
              required: true, 
              order: 2,
              validation: { pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$' }
            },
            { 
              id: '3', 
              type: 'select', 
              label: 'Service Interest', 
              required: true, 
              order: 3,
              options: ['Web Development', 'SEO Services', 'Branding', 'Software Development']
            },
            { 
              id: '4', 
              type: 'textarea', 
              label: 'Message', 
              required: true, 
              order: 4,
              validation: { minLength: 10, maxLength: 1000 }
            }
          ],
          settings: {
            submitButtonText: 'Send Message',
            successMessage: 'Thank you for your message! We\'ll get back to you soon.',
            errorMessage: 'There was an error submitting your form. Please try again.',
            emailNotifications: true,
            autoResponder: true,
            allowMultipleSubmissions: false,
            captchaEnabled: true
          },
          styling: {
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
          analytics: {
            views: 1234,
            submissions: 89,
            conversionRate: 7.2,
            abandonment: 15.8,
            avgTimeToComplete: 185
          },
          status: 'published',
          created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
          updated_at: new Date(Date.now() - 86400000 * 2).toISOString()
        },
        {
          id: '2',
          name: 'Newsletter Signup',
          description: 'Simple newsletter subscription form',
          fields: [
            { 
              id: '1', 
              type: 'email', 
              label: 'Email Address', 
              placeholder: 'Enter your email',
              required: true, 
              order: 1
            },
            { 
              id: '2', 
              type: 'checkbox', 
              label: 'Consent', 
              required: true, 
              order: 2,
              options: ['I agree to receive marketing emails']
            }
          ],
          settings: {
            submitButtonText: 'Subscribe',
            successMessage: 'Welcome! Check your email to confirm your subscription.',
            errorMessage: 'Subscription failed. Please try again.',
            emailNotifications: false,
            autoResponder: true,
            allowMultipleSubmissions: false,
            captchaEnabled: false
          },
          styling: {
            backgroundColor: '#1f2937',
            textColor: '#f9fafb',
            borderColor: '#374151',
            buttonColor: '#10b981',
            buttonTextColor: '#ffffff',
            fontFamily: 'Inter',
            fontSize: '14px',
            borderRadius: '6px',
            spacing: '12px'
          },
          analytics: {
            views: 2156,
            submissions: 342,
            conversionRate: 15.9,
            abandonment: 8.2,
            avgTimeToComplete: 45
          },
          status: 'published',
          created_at: new Date(Date.now() - 86400000 * 14).toISOString(),
          updated_at: new Date(Date.now() - 86400000 * 1).toISOString()
        }
      ];

      setForms(mockForms);
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
      const newForm: AdvancedForm = {
        ...formData,
        id: Math.random().toString(36).substring(2, 15),
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

      setForms(prev => [newForm, ...prev]);
      toast({
        title: "Form created",
        description: `"${formData.name}" has been created successfully.`,
      });

      return { success: true, data: newForm };
    } catch (error: any) {
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
      setForms(prev => prev.map(form => 
        form.id === id 
          ? { ...form, ...updates, updated_at: new Date().toISOString() }
          : form
      ));

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
      setForms(prev => prev.filter(form => form.id !== id));
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
      const submission: FormSubmission = {
        id: Math.random().toString(36).substring(2, 15),
        form_id: formId,
        submission_data: submissionData,
        submitted_at: new Date().toISOString(),
        ip_address: '127.0.0.1', // This would be real IP in production
        user_agent: navigator.userAgent,
        session_id: localStorage.getItem('analytics_session_id') || 'anonymous'
      };

      setSubmissions(prev => [submission, ...prev]);

      // Update form analytics
      setForms(prev => prev.map(form => 
        form.id === formId 
          ? { 
              ...form, 
              analytics: {
                ...form.analytics,
                submissions: form.analytics.submissions + 1,
                conversionRate: ((form.analytics.submissions + 1) / form.analytics.views) * 100
              }
            }
          : form
      ));

      return { success: true, submissionId: submission.id };
    } catch (error: any) {
      return { success: false, error: error.message };
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
  }, []);

  return {
    forms,
    submissions,
    loading,
    fetchForms,
    createForm,
    updateForm,
    deleteForm,
    duplicateForm,
    submitForm,
    getFormSubmissions,
    exportFormSubmissions
  };
};