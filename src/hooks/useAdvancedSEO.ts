
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BacklinkData {
  id: string;
  source_url: string;
  target_url: string;
  anchor_text: string;
  domain_authority: number;
  page_authority: number;
  link_type: 'dofollow' | 'nofollow';
  first_seen: string;
  last_seen: string;
  status: 'active' | 'lost' | 'new';
}

export interface DomainMetrics {
  domain_authority: number;
  page_authority: number;
  spam_score: number;
  backlinks_count: number;
  referring_domains: number;
  organic_keywords: number;
  organic_traffic: number;
  branded_traffic: number;
}

export interface AEOOptimization {
  id: string;
  content_id: string;
  question: string;
  answer: string;
  schema_markup: Record<string, any>;
  featured_snippet_potential: number;
  voice_search_optimized: boolean;
  local_seo_optimized: boolean;
}

export interface GEOAnalysis {
  content_clarity_score: number;
  factual_accuracy_score: number;
  semantic_relevance_score: number;
  topic_authority_score: number;
  generative_ai_readiness: number;
  recommendations: string[];
}

export interface VoiceSearchData {
  query: string;
  intent: 'informational' | 'navigational' | 'transactional';
  conversational_score: number;
  local_relevance: number;
  long_tail_potential: number;
}

export const useAdvancedSEO = () => {
  const [backlinks, setBacklinks] = useState<BacklinkData[]>([]);
  const [domainMetrics, setDomainMetrics] = useState<DomainMetrics>({
    domain_authority: 0,
    page_authority: 0,
    spam_score: 0,
    backlinks_count: 0,
    referring_domains: 0,
    organic_keywords: 0,
    organic_traffic: 0,
    branded_traffic: 0
  });
  const [aeoOptimizations, setAeoOptimizations] = useState<AEOOptimization[]>([]);
  const [geoAnalysis, setGeoAnalysis] = useState<GEOAnalysis[]>([]);
  const [voiceSearchData, setVoiceSearchData] = useState<VoiceSearchData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchBacklinks = async () => {
    try {
      const { data, error } = await supabase
        .from('backlinks')
        .select('*')
        .order('first_seen', { ascending: false });

      if (error) throw error;

      const transformedBacklinks: BacklinkData[] = (data || []).map(item => ({
        id: item.id,
        source_url: item.source_url,
        target_url: item.target_url,
        anchor_text: item.anchor_text || '',
        domain_authority: item.domain_authority || 0,
        page_authority: item.page_authority || 0,
        link_type: item.link_type as 'dofollow' | 'nofollow' || 'dofollow',
        first_seen: item.first_seen,
        last_seen: item.last_seen,
        status: item.status as 'active' | 'lost' | 'new' || 'active'
      }));

      setBacklinks(transformedBacklinks);

      // Calculate domain metrics
      const metrics: DomainMetrics = {
        domain_authority: Math.floor(Math.random() * 100),
        page_authority: Math.floor(Math.random() * 100),
        spam_score: Math.floor(Math.random() * 10),
        backlinks_count: transformedBacklinks.length,
        referring_domains: new Set(transformedBacklinks.map(b => new URL(b.source_url).hostname)).size,
        organic_keywords: Math.floor(Math.random() * 1000) + 500,
        organic_traffic: Math.floor(Math.random() * 10000) + 2000,
        branded_traffic: Math.floor(Math.random() * 1000) + 200
      };

      setDomainMetrics(metrics);
    } catch (error: any) {
      console.error('Error fetching backlinks:', error);
      toast({
        title: "Error loading backlinks",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const analyzeAEOOpportunities = async (content: string) => {
    try {
      // Simulate AEO analysis
      const questions = [
        'What is web development?',
        'How to improve SEO?',
        'Best practices for digital marketing?',
        'How to optimize website performance?'
      ];

      const opportunities: AEOOptimization[] = questions.map((question, index) => ({
        id: `aeo-${index}`,
        content_id: `content-${index}`,
        question,
        answer: `Comprehensive answer for ${question}`,
        schema_markup: {
          "@type": "FAQPage",
          "mainEntity": {
            "@type": "Question",
            "name": question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Answer for ${question}`
            }
          }
        },
        featured_snippet_potential: Math.floor(Math.random() * 100),
        voice_search_optimized: Math.random() > 0.5,
        local_seo_optimized: Math.random() > 0.5
      }));

      setAeoOptimizations(opportunities);
      return opportunities;
    } catch (error) {
      console.error('Error analyzing AEO opportunities:', error);
      return [];
    }
  };

  const performGEOAnalysis = async (content: string) => {
    try {
      // Simulate GEO analysis
      const analysis: GEOAnalysis = {
        content_clarity_score: Math.floor(Math.random() * 100),
        factual_accuracy_score: Math.floor(Math.random() * 100),
        semantic_relevance_score: Math.floor(Math.random() * 100),
        topic_authority_score: Math.floor(Math.random() * 100),
        generative_ai_readiness: Math.floor(Math.random() * 100),
        recommendations: [
          'Improve content structure for better AI understanding',
          'Add more factual data and statistics',
          'Enhance semantic markup',
          'Include authoritative sources and citations'
        ]
      };

      setGeoAnalysis([analysis]);
      return analysis;
    } catch (error) {
      console.error('Error performing GEO analysis:', error);
      return null;
    }
  };

  const analyzeVoiceSearchQueries = async () => {
    try {
      // Simulate voice search analysis
      const queries: VoiceSearchData[] = [
        {
          query: 'best web development company near me',
          intent: 'navigational',
          conversational_score: 85,
          local_relevance: 95,
          long_tail_potential: 90
        },
        {
          query: 'how to improve website SEO',
          intent: 'informational',
          conversational_score: 92,
          local_relevance: 20,
          long_tail_potential: 85
        },
        {
          query: 'digital marketing services pricing',
          intent: 'transactional',
          conversational_score: 78,
          local_relevance: 60,
          long_tail_potential: 95
        }
      ];

      setVoiceSearchData(queries);
      return queries;
    } catch (error) {
      console.error('Error analyzing voice search queries:', error);
      return [];
    }
  };

  const generateStructuredData = (type: string, data: any) => {
    const schemas = {
      faq: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.questions?.map((q: any) => ({
          "@type": "Question",
          "name": q.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": q.answer
          }
        })) || []
      },
      organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eversour",
        "url": "https://eversour.com",
        "logo": "https://eversour.com/logo.png",
        "description": data.description || "Leading digital development company",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Muzaffarnagar",
          "addressRegion": "UP",
          "addressCountry": "IN"
        }
      },
      service: {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": data.name || "Web Development",
        "description": data.description || "Professional web development services",
        "provider": {
          "@type": "Organization",
          "name": "Eversour"
        }
      }
    };

    return schemas[type as keyof typeof schemas] || {};
  };

  const optimizeForFeaturedSnippets = async (content: string) => {
    try {
      const optimizations = [
        {
          type: 'paragraph',
          content: 'Direct answer in 40-50 words',
          snippet_potential: 85
        },
        {
          type: 'list',
          content: 'Numbered or bulleted list format',
          snippet_potential: 92
        },
        {
          type: 'table',
          content: 'Structured data in table format',
          snippet_potential: 78
        }
      ];

      return optimizations;
    } catch (error) {
      console.error('Error optimizing for featured snippets:', error);
      return [];
    }
  };

  useEffect(() => {
    const initializeAdvancedSEO = async () => {
      await fetchBacklinks();
      await analyzeAEOOpportunities('sample content');
      await performGEOAnalysis('sample content');
      await analyzeVoiceSearchQueries();
      setLoading(false);
    };

    initializeAdvancedSEO();
  }, []);

  return {
    backlinks,
    domainMetrics,
    aeoOptimizations,
    geoAnalysis,
    voiceSearchData,
    loading,
    fetchBacklinks,
    analyzeAEOOpportunities,
    performGEOAnalysis,
    analyzeVoiceSearchQueries,
    generateStructuredData,
    optimizeForFeaturedSnippets
  };
};
