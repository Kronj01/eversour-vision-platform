import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest?: string;
  message: string;
}

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const submitContactForm = async (formData: ContactFormData) => {
    try {
      setLoading(true);

      const { data, error } = await supabase.functions.invoke('contact-notification', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. We'll get back to you soon.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    submitContactForm,
    loading,
    isSubmitting: loading
  };
};