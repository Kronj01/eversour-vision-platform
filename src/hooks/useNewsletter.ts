
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface NewsletterSubscription {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed' | 'pending';
  subscribed_at: string;
  unsubscribed_at?: string;
  preferences: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export const useNewsletter = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const subscribe = async (email: string, preferences: Record<string, any> = {}) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email,
          preferences,
          status: 'active'
        });

      if (error) throw error;

      toast({
        title: "Subscribed successfully!",
        description: "You've been added to our newsletter.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error subscribing to newsletter:', error);
      toast({
        title: "Subscription failed",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .update({
          status: 'unsubscribed',
          unsubscribed_at: new Date().toISOString()
        })
        .eq('email', email);

      if (error) throw error;

      toast({
        title: "Unsubscribed successfully",
        description: "You've been removed from our newsletter.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error unsubscribing from newsletter:', error);
      toast({
        title: "Unsubscribe failed",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as NewsletterSubscription[];
    } catch (error: any) {
      console.error('Error fetching newsletter subscriptions:', error);
      toast({
        title: "Error loading subscriptions",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
  };

  return {
    loading,
    subscribe,
    unsubscribe,
    getSubscriptions
  };
};
