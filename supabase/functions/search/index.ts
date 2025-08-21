import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SearchRequest {
  query: string;
  filters?: {
    content_type?: string[];
    tags?: string[];
  };
  limit?: number;
}

interface IndexRequest {
  action: 'add' | 'remove';
  content_type: 'blog_post' | 'page' | 'service' | 'portfolio';
  content_id: string;
  title?: string;
  content?: string;
  url?: string;
  tags?: string[];
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const requestData = await req.json();
    
    if ('action' in requestData) {
      // Handle search index management
      const indexData: IndexRequest = requestData;
      
      if (indexData.action === 'add') {
        const { error } = await supabase
          .from('search_index')
          .upsert({
            content_type: indexData.content_type,
            content_id: indexData.content_id,
            title: indexData.title || '',
            content: indexData.content || '',
            url: indexData.url || '',
            tags: indexData.tags || []
          });

        if (error) throw error;

        return new Response(
          JSON.stringify({ success: true, message: 'Added to search index' }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      } else if (indexData.action === 'remove') {
        const { error } = await supabase
          .from('search_index')
          .delete()
          .eq('content_type', indexData.content_type)
          .eq('content_id', indexData.content_id);

        if (error) throw error;

        return new Response(
          JSON.stringify({ success: true, message: 'Removed from search index' }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }
    } else {
      // Handle search query
      const searchData: SearchRequest = requestData;
      
      let query = supabase
        .from('search_index')
        .select('*');

      // Apply text search
      if (searchData.query) {
        query = query.textSearch('search_vector', searchData.query);
      }

      // Apply content type filter
      if (searchData.filters?.content_type?.length) {
        query = query.in('content_type', searchData.filters.content_type);
      }

      // Apply tags filter
      if (searchData.filters?.tags?.length) {
        query = query.overlaps('tags', searchData.filters.tags);
      }

      // Apply limit
      query = query.limit(searchData.limit || 10);

      const { data, error } = await query;

      if (error) throw error;

      return new Response(
        JSON.stringify({ 
          success: true, 
          results: data || [],
          total: data?.length || 0
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

  } catch (error: any) {
    console.error('Error in search function:', error);
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