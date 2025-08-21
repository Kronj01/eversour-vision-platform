import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SEORequest {
  action: 'audit' | 'track_keyword' | 'update_metrics' | 'generate_sitemap';
  url?: string;
  keyword?: string;
  metrics?: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, url, keyword, metrics }: SEORequest = await req.json();

    switch (action) {
      case 'audit':
        if (!url) throw new Error('URL is required for audit');

        // Simulate SEO audit (in real app, you'd use external APIs)
        const auditResults = {
          url,
          seo_score: Math.floor(Math.random() * 40) + 60, // 60-100
          page_speed_score: Math.floor(Math.random() * 30) + 70, // 70-100
          mobile_friendly: Math.random() > 0.2,
          https_enabled: url.startsWith('https://'),
          meta_title: `Title for ${url}`,
          meta_description: `Description for ${url}`,
          h1_count: Math.floor(Math.random() * 3) + 1,
          h2_count: Math.floor(Math.random() * 5) + 2,
          image_count: Math.floor(Math.random() * 10) + 5,
          alt_text_missing: Math.floor(Math.random() * 3),
          internal_links: Math.floor(Math.random() * 20) + 10,
          external_links: Math.floor(Math.random() * 10) + 5,
          page_size_kb: Math.floor(Math.random() * 1000) + 500,
          load_time_ms: Math.floor(Math.random() * 2000) + 1000
        };

        const { error: metricsError } = await supabase
          .from('seo_metrics')
          .upsert(auditResults);

        if (metricsError) throw metricsError;

        return new Response(
          JSON.stringify({ success: true, audit: auditResults }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );

      case 'track_keyword':
        if (!keyword || !url) throw new Error('Keyword and URL are required');

        const { error: keywordError } = await supabase
          .from('keyword_tracking')
          .insert({
            keyword,
            url,
            current_position: Math.floor(Math.random() * 100) + 1,
            search_volume: Math.floor(Math.random() * 10000) + 1000,
            difficulty_score: Math.floor(Math.random() * 100),
            cpc: Math.random() * 5 + 0.5
          });

        if (keywordError) throw keywordError;

        return new Response(
          JSON.stringify({ success: true, message: 'Keyword tracking added' }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );

      case 'generate_sitemap':
        // Get all pages that should be in sitemap
        const { data: pages } = await supabase
          .from('sitemap_urls')
          .select('*')
          .order('priority', { ascending: false });

        const sitemap = {
          urls: pages || [],
          generated_at: new Date().toISOString(),
          total_urls: pages?.length || 0
        };

        return new Response(
          JSON.stringify({ success: true, sitemap }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );

      default:
        throw new Error(`Unknown action: ${action}`);
    }

  } catch (error: any) {
    console.error('Error in seo-automation function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);