import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  action: 'create' | 'mark_read' | 'get_unread';
  user_id?: string;
  notification_id?: string;
  title?: string;
  message?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  data?: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, user_id, notification_id, title, message, type, data }: NotificationRequest = await req.json();

    switch (action) {
      case 'create':
        const { data: notificationData, error: createError } = await supabase
          .from('notifications')
          .insert({
            user_id: user_id || null,
            title: title || 'Notification',
            message: message || '',
            type: type || 'info',
            data: data || {}
          })
          .select()
          .single();

        if (createError) throw createError;

        return new Response(
          JSON.stringify({ 
            success: true, 
            notification: notificationData 
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );

      case 'mark_read':
        if (!notification_id) {
          throw new Error('notification_id is required for mark_read action');
        }

        const { error: updateError } = await supabase
          .from('notifications')
          .update({ read: true, updated_at: new Date().toISOString() })
          .eq('id', notification_id);

        if (updateError) throw updateError;

        return new Response(
          JSON.stringify({ success: true, message: 'Notification marked as read' }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );

      case 'get_unread':
        if (!user_id) {
          throw new Error('user_id is required for get_unread action');
        }

        const { data: unreadData, error: fetchError } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user_id)
          .eq('read', false)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        return new Response(
          JSON.stringify({ 
            success: true, 
            notifications: unreadData || [],
            count: unreadData?.length || 0
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );

      default:
        throw new Error(`Unknown action: ${action}`);
    }

  } catch (error: any) {
    console.error('Error in notifications function:', error);
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