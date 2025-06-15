
import { apiClient } from './client';
import { Analytics, Lead, SEOData } from './types';

// Analytics API
export const analyticsApi = {
  getAnalytics: (timeframe: string = '30d'): Promise<Analytics> =>
    apiClient.get(`/analytics?timeframe=${timeframe}`),
    
  getPageAnalytics: (url: string) =>
    apiClient.get(`/analytics/page?url=${encodeURIComponent(url)}`),
};

// Leads API
export const leadsApi = {
  getLeads: (status?: string): Promise<Lead[]> => {
    const params = status ? `?status=${status}` : '';
    return apiClient.get(`/leads${params}`);
  },
  
  createLead: (leadData: Partial<Lead>): Promise<Lead> =>
    apiClient.post('/leads', leadData),
    
  updateLead: (id: string, data: Partial<Lead>): Promise<Lead> =>
    apiClient.put(`/leads/${id}`, data),
    
  deleteLead: (id: string): Promise<void> =>
    apiClient.delete(`/leads/${id}`),
};

// SEO API
export const seoApi = {
  getSEOData: (): Promise<SEOData> =>
    apiClient.get('/seo/overview'),
    
  runSEOAudit: (url: string) =>
    apiClient.post('/seo/audit', { url }),
    
  trackKeyword: (keyword: string, url: string) =>
    apiClient.post('/seo/keywords', { keyword, url }),
};
