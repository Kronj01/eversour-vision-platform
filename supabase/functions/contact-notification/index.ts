import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const submission: ContactSubmission = await req.json();
    
    console.log('Processing contact submission:', submission);

    // Store in contact_submissions table
    const { data: contactData, error: contactError } = await supabase
      .from('contact_submissions')
      .insert({
        name: submission.name,
        email: submission.email,
        phone: submission.phone,
        company: submission.company,
        service_interest: submission.service_interest,
        message: submission.message,
        status: 'new'
      })
      .select()
      .single();

    if (contactError) {
      console.error('Error storing contact submission:', contactError);
      throw contactError;
    }

    // Create notification for admins
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        title: 'New Contact Submission',
        message: `New contact from ${submission.name} (${submission.email})`,
        type: 'info',
        data: { contact_id: contactData.id, source: 'contact_form' }
      });

    if (notificationError) {
      console.error('Error creating notification:', notificationError);
    }

    // Track conversion
    const { error: conversionError } = await supabase
      .from('conversions')
      .insert({
        session_id: crypto.randomUUID(),
        conversion_type: 'contact_form',
        form_id: 'main_contact',
        metadata: { 
          service_interest: submission.service_interest,
          has_company: !!submission.company 
        }
      });

    if (conversionError) {
      console.error('Error tracking conversion:', conversionError);
    }

    console.log('Contact submission processed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact submission received successfully',
        id: contactData.id 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in contact-notification function:', error);
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