
// Core API types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// Analytics types
export interface Analytics {
  page_views: number;
  unique_visitors: number;
  bounce_rate: number;
  conversion_rate: number;
  top_pages: Array<{ url: string; views: number }>;
}

// Lead types
export interface Lead {
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

// SEO types
export interface SEOData {
  keyword_rankings: Array<{
    keyword: string;
    position: number;
    search_volume: number;
  }>;
  backlinks_count: number;
  domain_authority: number;
  page_speed_score: number;
}
