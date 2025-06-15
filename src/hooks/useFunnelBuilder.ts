
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface FunnelStep {
  id: string;
  name: string;
  type: 'landing' | 'capture' | 'sales' | 'thank-you' | 'upsell';
  template: string;
  content: any;
  settings: {
    redirect_url?: string;
    delay?: number;
    conditions?: any[];
  };
  order: number;
}

export interface Funnel {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'archived';
  steps: FunnelStep[];
  analytics: {
    views: number;
    conversions: number;
    conversion_rate: number;
    revenue: number;
  };
  created_at: string;
  updated_at: string;
}

export interface LeadMagnet {
  id: string;
  title: string;
  description: string;
  type: 'ebook' | 'checklist' | 'template' | 'video' | 'webinar';
  file_url?: string;
  landing_page_id: string;
  form_fields: FormField[];
  downloads: number;
  conversion_rate: number;
  created_at: string;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'checkbox';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export const useFunnelBuilder = () => {
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [leadMagnets, setLeadMagnets] = useState<LeadMagnet[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Mock data
    const mockFunnels: Funnel[] = [
      {
        id: '1',
        name: 'Web Development Lead Funnel',
        description: 'Captures leads interested in web development services',
        status: 'active',
        steps: [
          {
            id: 'step1',
            name: 'Landing Page',
            type: 'landing',
            template: 'hero-cta',
            content: { headline: 'Get Your Free Quote', subheadline: 'Professional web development' },
            settings: { redirect_url: '/step2' },
            order: 1,
          },
          {
            id: 'step2',
            name: 'Lead Capture',
            type: 'capture',
            template: 'form-basic',
            content: { form_title: 'Get Started Today' },
            settings: { redirect_url: '/thank-you' },
            order: 2,
          },
        ],
        analytics: {
          views: 1250,
          conversions: 87,
          conversion_rate: 6.96,
          revenue: 15400,
        },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-15T10:00:00Z',
      },
    ];

    const mockLeadMagnets: LeadMagnet[] = [
      {
        id: '1',
        title: 'Web Development Checklist',
        description: 'Complete checklist for planning your web development project',
        type: 'checklist',
        file_url: '/downloads/web-dev-checklist.pdf',
        landing_page_id: 'page1',
        form_fields: [
          { id: 'name', type: 'text', label: 'Full Name', required: true },
          { id: 'email', type: 'email', label: 'Email Address', required: true },
          { id: 'company', type: 'text', label: 'Company Name', required: false },
        ],
        downloads: 342,
        conversion_rate: 12.5,
        created_at: '2024-01-01T00:00:00Z',
      },
    ];

    setFunnels(mockFunnels);
    setLeadMagnets(mockLeadMagnets);
    setLoading(false);
  }, []);

  const createFunnel = async (funnelData: Partial<Funnel>) => {
    try {
      const newFunnel: Funnel = {
        id: Date.now().toString(),
        name: funnelData.name || 'New Funnel',
        description: funnelData.description || '',
        status: 'draft',
        steps: [],
        analytics: { views: 0, conversions: 0, conversion_rate: 0, revenue: 0 },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...funnelData,
      };

      setFunnels(prev => [newFunnel, ...prev]);
      toast({
        title: "Funnel created successfully",
        description: "Your new funnel has been created and is ready to configure.",
      });
      return newFunnel;
    } catch (error: any) {
      toast({
        title: "Error creating funnel",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  const createLeadMagnet = async (magnetData: Partial<LeadMagnet>) => {
    try {
      const newMagnet: LeadMagnet = {
        id: Date.now().toString(),
        title: magnetData.title || 'New Lead Magnet',
        description: magnetData.description || '',
        type: magnetData.type || 'ebook',
        landing_page_id: magnetData.landing_page_id || '',
        form_fields: magnetData.form_fields || [],
        downloads: 0,
        conversion_rate: 0,
        created_at: new Date().toISOString(),
        ...magnetData,
      };

      setLeadMagnets(prev => [newMagnet, ...prev]);
      toast({
        title: "Lead magnet created successfully",
        description: "Your lead magnet has been created and is ready to use.",
      });
      return newMagnet;
    } catch (error: any) {
      toast({
        title: "Error creating lead magnet",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    funnels,
    leadMagnets,
    loading,
    createFunnel,
    createLeadMagnet,
  };
};
