import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyticsEvent {
  event_type: string;
  page_url?: string;
  event_data?: any;
  user_agent?: string;
  ip_address?: string;
  session_id?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const eventData: AnalyticsEvent = await req.json();

    // Get client info from headers
    const userAgent = req.headers.get('user-agent') || '';
    const forwarded = req.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || '';

    // Store analytics event
    const { data, error } = await supabase
      .from('analytics_events')
      .insert({
        event_type: eventData.event_type,
        page_url: eventData.page_url,
        event_data: eventData.event_data || {},
        user_agent: eventData.user_agent || userAgent,
        ip_address: eventData.ip_address || ipAddress,
        session_id: eventData.session_id
      });

    if (error) {
      console.error('Analytics storage error:', error);
      throw new Error('Failed to store analytics event');
    }

    console.log('Analytics event stored successfully');

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in analytics-tracking function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);