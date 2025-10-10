import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, data } = await req.json();

    switch (action) {
      case 'calculate_session_metrics': {
        // Calculate aggregate metrics for sessions
        const { data: sessions, error } = await supabaseClient
          .from('visitor_sessions')
          .select('*')
          .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

        if (error) throw error;

        const metrics = {
          total_sessions: sessions?.length || 0,
          active_sessions: sessions?.filter(s => s.is_active).length || 0,
          avg_session_duration: sessions?.length 
            ? sessions.reduce((acc, s) => acc + (s.total_time_spent || 0), 0) / sessions.length
            : 0,
          bounce_rate: sessions?.length
            ? (sessions.filter(s => (s.total_page_views || 0) <= 1).length / sessions.length) * 100
            : 0
        };

        return new Response(JSON.stringify({ metrics }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'process_funnel': {
        const { funnelId, dateRange } = data;

        const { data: funnel, error: funnelError } = await supabaseClient
          .from('funnel_definitions')
          .select('*')
          .eq('id', funnelId)
          .single();

        if (funnelError) throw funnelError;

        // Process funnel analytics
        const steps = funnel.steps as any[];
        const analytics = [];

        for (let i = 0; i < steps.length; i++) {
          const step = steps[i];
          
          // Count entries at this step
          const { count: entered } = await supabaseClient
            .from('page_views')
            .select('*', { count: 'exact', head: true })
            .eq('page_url', step.url)
            .gte('created_at', dateRange?.start || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

          analytics.push({
            step: i + 1,
            step_name: step.name,
            entered: entered || 0
          });
        }

        return new Response(JSON.stringify({ analytics }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'aggregate_heatmap': {
        const { pageUrl, deviceType, days = 7 } = data;

        const { data: heatmapData, error } = await supabaseClient
          .from('heatmap_data')
          .select('*')
          .eq('page_url', pageUrl)
          .eq('device_type', deviceType)
          .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());

        if (error) throw error;

        // Aggregate click positions
        const clickMap: Record<string, number> = {};
        const scrollDepths: number[] = [];

        heatmapData?.forEach(entry => {
          if (entry.interaction_type === 'click' && entry.x_position && entry.y_position) {
            const key = `${entry.x_position},${entry.y_position}`;
            clickMap[key] = (clickMap[key] || 0) + 1;
          } else if (entry.interaction_type === 'scroll' && entry.scroll_depth) {
            scrollDepths.push(entry.scroll_depth);
          }
        });

        const clicks = Object.entries(clickMap).map(([key, count]) => {
          const [x, y] = key.split(',').map(Number);
          return { x, y, count };
        });

        return new Response(JSON.stringify({ clicks, scrollDepths }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
