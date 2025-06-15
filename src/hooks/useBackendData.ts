
import { useState, useEffect } from 'react';
import { BackendServices } from '@/services/backendServices';
import { useToast } from '@/hooks/use-toast';

export const useBackendAnalytics = (timeframe: string = '30d') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const analytics = await BackendServices.getAnalytics(timeframe);
        setData(analytics);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        toast({
          title: "Error fetching analytics",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeframe, toast]);

  return { data, loading, error };
};

export const useBackendSEO = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const seoData = await BackendServices.getSEOData();
        setData(seoData);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        toast({
          title: "Error fetching SEO data",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  return { data, loading, error, refetch: fetchData };
};

export const useBackendLeads = (status?: string) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await BackendServices.getLeads(status);
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
  }, [status, toast]);

  const createLead = async (leadData: any) => {
    try {
      await BackendServices.createLead(leadData);
      toast({
        title: "Lead created successfully",
      });
      await fetchLeads();
    } catch (err: any) {
      toast({
        title: "Error creating lead",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const updateLead = async (id: string, data: any) => {
    try {
      await BackendServices.updateLead(id, data);
      toast({
        title: "Lead updated successfully",
      });
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

export const useBackendCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const data = await BackendServices.getCampaigns();
      setCampaigns(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error fetching campaigns",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [toast]);

  const createCampaign = async (campaignData: any) => {
    try {
      await BackendServices.createCampaign(campaignData);
      toast({
        title: "Campaign created successfully",
      });
      await fetchCampaigns();
    } catch (err: any) {
      toast({
        title: "Error creating campaign",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  return { campaigns, loading, error, createCampaign, refetch: fetchCampaigns };
};
