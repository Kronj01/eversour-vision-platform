import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DripCampaign {
  id: string;
  name: string;
  description?: string;
  trigger_type: string;
  trigger_config: any;
  emails: any[];
  is_active: boolean;
  total_enrolled: number;
  total_completed: number;
  created_at: string;
  updated_at: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html_content: string;
  text_content?: string;
  category: string;
  variables: any[];
  thumbnail_url?: string;
  is_active: boolean;
}

export const useEmailMarketing = () => {
  const [dripCampaigns, setDripCampaigns] = useState<DripCampaign[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchDripCampaigns = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('drip_campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDripCampaigns((data || []) as DripCampaign[]);
    } catch (error: any) {
      toast({
        title: "Error loading drip campaigns",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createDripCampaign = async (campaign: Partial<DripCampaign>) => {
    try {
      const { data, error } = await supabase
        .from('drip_campaigns')
        .insert([campaign] as any)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Drip campaign created",
        description: `${campaign.name} has been created successfully.`
      });

      await fetchDripCampaigns();
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating campaign",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateDripCampaign = async (id: string, updates: Partial<DripCampaign>) => {
    try {
      const { error } = await supabase
        .from('drip_campaigns')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Campaign updated",
        description: "Drip campaign has been updated successfully."
      });

      await fetchDripCampaigns();
    } catch (error: any) {
      toast({
        title: "Error updating campaign",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteDripCampaign = async (id: string) => {
    try {
      const { error } = await supabase
        .from('drip_campaigns')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Campaign deleted",
        description: "Drip campaign has been deleted successfully."
      });

      await fetchDripCampaigns();
    } catch (error: any) {
      toast({
        title: "Error deleting campaign",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates((data || []) as EmailTemplate[]);
    } catch (error: any) {
      toast({
        title: "Error loading templates",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async (template: Partial<EmailTemplate>) => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .insert([template] as any)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Template created",
        description: `${template.name} has been created successfully.`
      });

      await fetchTemplates();
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating template",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const enrollInDrip = async (campaignId: string, email: string, metadata?: any) => {
    try {
      const { data, error } = await supabase
        .from('drip_enrollments')
        .insert({
          campaign_id: campaignId,
          email,
          metadata: metadata || {}
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Enrolled successfully",
        description: `${email} has been enrolled in the drip campaign.`
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error enrolling",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  return {
    dripCampaigns,
    templates,
    loading,
    fetchDripCampaigns,
    createDripCampaign,
    updateDripCampaign,
    deleteDripCampaign,
    fetchTemplates,
    createTemplate,
    enrollInDrip
  };
};
