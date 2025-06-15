
import { apiClient } from './apiClient';

// Types for backend API responses
export interface BackendUser {
  id: string;
  email: string;
  full_name?: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface BackendAnalytics {
  page_views: number;
  unique_visitors: number;
  bounce_rate: number;
  avg_session_duration: number;
  conversion_rate: number;
  top_pages: Array<{ url: string; views: number }>;
  traffic_sources: Array<{ source: string; visitors: number }>;
}

export interface BackendSEOData {
  keyword_rankings: Array<{
    keyword: string;
    position: number;
    search_volume: number;
    difficulty: number;
  }>;
  backlinks_count: number;
  domain_authority: number;
  page_speed_score: number;
  seo_issues: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    recommendations: string[];
  }>;
}

export interface BackendLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface BackendCampaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'ads' | 'seo';
  status: 'draft' | 'active' | 'paused' | 'completed';
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
    roi: number;
  };
  created_at: string;
  updated_at: string;
}

// Backend API Services
export class BackendServices {
  // Analytics Services
  static async getAnalytics(timeframe: string = '30d'): Promise<BackendAnalytics> {
    return apiClient.get<BackendAnalytics>(`/analytics?timeframe=${timeframe}`);
  }

  static async getPageAnalytics(url: string): Promise<any> {
    return apiClient.get(`/analytics/page?url=${encodeURIComponent(url)}`);
  }

  // SEO Services
  static async getSEOData(): Promise<BackendSEOData> {
    return apiClient.get<BackendSEOData>('/seo/overview');
  }

  static async runSEOAudit(url: string): Promise<any> {
    return apiClient.post('/seo/audit', { url });
  }

  static async trackKeyword(keyword: string, url: string): Promise<any> {
    return apiClient.post('/seo/keywords', { keyword, url });
  }

  // Lead Management
  static async getLeads(status?: string): Promise<BackendLead[]> {
    const params = status ? `?status=${status}` : '';
    return apiClient.get<BackendLead[]>(`/leads${params}`);
  }

  static async createLead(leadData: Partial<BackendLead>): Promise<BackendLead> {
    return apiClient.post<BackendLead>('/leads', leadData);
  }

  static async updateLead(id: string, data: Partial<BackendLead>): Promise<BackendLead> {
    return apiClient.patch<BackendLead>(`/leads/${id}`, data);
  }

  static async deleteLead(id: string): Promise<void> {
    return apiClient.delete(`/leads/${id}`);
  }

  // Campaign Management
  static async getCampaigns(): Promise<BackendCampaign[]> {
    return apiClient.get<BackendCampaign[]>('/campaigns');
  }

  static async createCampaign(campaignData: Partial<BackendCampaign>): Promise<BackendCampaign> {
    return apiClient.post<BackendCampaign>('/campaigns', campaignData);
  }

  static async updateCampaign(id: string, data: Partial<BackendCampaign>): Promise<BackendCampaign> {
    return apiClient.patch<BackendCampaign>(`/campaigns/${id}`, data);
  }

  // Email Marketing
  static async sendEmail(data: {
    to: string[];
    subject: string;
    content: string;
    template?: string;
  }): Promise<any> {
    return apiClient.post('/email/send', data);
  }

  static async createEmailTemplate(template: {
    name: string;
    subject: string;
    content: string;
    type: string;
  }): Promise<any> {
    return apiClient.post('/email/templates', template);
  }

  // AI/ML Services
  static async generateContent(prompt: string, type: 'blog' | 'ad_copy' | 'email'): Promise<any> {
    return apiClient.post('/ai/generate-content', { prompt, type });
  }

  static async analyzeLeadQuality(leadData: any): Promise<any> {
    return apiClient.post('/ai/analyze-lead', leadData);
  }

  static async predictChurn(userId: string): Promise<any> {
    return apiClient.get(`/ai/predict-churn/${userId}`);
  }

  // File Management
  static async uploadFile(file: File, category: string = 'general'): Promise<any> {
    return apiClient.uploadFile('/files/upload', file);
  }

  // Integration Services
  static async syncGoogleAnalytics(): Promise<any> {
    return apiClient.post('/integrations/google-analytics/sync');
  }

  static async syncFacebookAds(): Promise<any> {
    return apiClient.post('/integrations/facebook-ads/sync');
  }

  static async syncMailchimp(): Promise<any> {
    return apiClient.post('/integrations/mailchimp/sync');
  }

  // Funnel Management
  static async getFunnels(): Promise<any[]> {
    return apiClient.get('/funnels');
  }

  static async createFunnel(funnelData: any): Promise<any> {
    return apiClient.post('/funnels', funnelData);
  }

  static async getFunnelAnalytics(funnelId: string): Promise<any> {
    return apiClient.get(`/funnels/${funnelId}/analytics`);
  }
}
