
import { apiClient } from './client';
import { Analytics, Lead, SEOData } from './types';

// External APIs disabled - using Supabase directly
export const analyticsApi = {
  getAnalytics: async (timeframe: string = '30d'): Promise<Analytics> => {
    throw new Error('External API disabled - use Supabase analytics instead');
  },
    
  getPageAnalytics: async (url: string) => {
    throw new Error('External API disabled - use Supabase analytics instead');
  },
};

export const leadsApi = {
  getLeads: async (status?: string): Promise<Lead[]> => {
    throw new Error('External API disabled - use Supabase contact_submissions instead');
  },
  
  createLead: async (leadData: Partial<Lead>): Promise<Lead> => {
    throw new Error('External API disabled - use Supabase contact_submissions instead');
  },
    
  updateLead: async (id: string, data: Partial<Lead>): Promise<Lead> => {
    throw new Error('External API disabled - use Supabase contact_submissions instead');
  },
    
  deleteLead: async (id: string): Promise<void> => {
    throw new Error('External API disabled - use Supabase contact_submissions instead');
  },
};

export const seoApi = {
  getSEOData: async (): Promise<SEOData> => {
    throw new Error('External API disabled - use Supabase SEO tables instead');
  },
    
  runSEOAudit: async (url: string) => {
    throw new Error('External API disabled - use Supabase SEO tables instead');
  },
    
  trackKeyword: async (keyword: string, url: string) => {
    throw new Error('External API disabled - use Supabase SEO tables instead');
  },
};
