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
      case 'process_drip_campaigns': {
        // Get all active drip campaigns
        const { data: campaigns, error: campaignsError } = await supabaseClient
          .from('drip_campaigns')
          .select('*')
          .eq('is_active', true);

        if (campaignsError) throw campaignsError;

        const results = [];

        for (const campaign of campaigns || []) {
          // Get active enrollments for this campaign
          const { data: enrollments, error: enrollmentsError } = await supabaseClient
            .from('drip_enrollments')
            .select('*')
            .eq('campaign_id', campaign.id)
            .eq('status', 'active');

          if (enrollmentsError) throw enrollmentsError;

          // Process each enrollment
          for (const enrollment of enrollments || []) {
            const emails = campaign.emails as any[];
            const currentStep = enrollment.current_step;

            if (currentStep < emails.length) {
              const emailConfig = emails[currentStep];
              const enrolledDate = new Date(enrollment.enrolled_at);
              const delayMs = emailConfig.delay_hours * 60 * 60 * 1000;
              const shouldSend = Date.now() - enrolledDate.getTime() >= delayMs;

              if (shouldSend) {
                // Send email (would integrate with email service)
                console.log('Sending email:', {
                  to: enrollment.email,
                  subject: emailConfig.subject,
                  step: currentStep + 1
                });

                // Update enrollment
                await supabaseClient
                  .from('drip_enrollments')
                  .update({
                    current_step: currentStep + 1,
                    status: currentStep + 1 >= emails.length ? 'completed' : 'active',
                    completed_at: currentStep + 1 >= emails.length ? new Date().toISOString() : null
                  })
                  .eq('id', enrollment.id);

                results.push({
                  enrollment_id: enrollment.id,
                  email: enrollment.email,
                  step: currentStep + 1,
                  sent: true
                });
              }
            }
          }
        }

        return new Response(JSON.stringify({ processed: results.length, results }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'update_segment_members': {
        const { segmentId } = data;

        // Get segment
        const { data: segment, error: segmentError } = await supabaseClient
          .from('segments')
          .select('*')
          .eq('id', segmentId)
          .single();

        if (segmentError) throw segmentError;

        if (!segment.is_dynamic) {
          return new Response(JSON.stringify({ message: 'Segment is not dynamic' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Evaluate segment conditions and update members
        // This would involve complex condition evaluation logic
        const conditions = segment.conditions as any[];
        
        // Mock implementation - would need real condition evaluation
        console.log('Evaluating segment conditions:', conditions);

        return new Response(JSON.stringify({ message: 'Segment updated' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'track_campaign_event': {
        const { campaignId, campaignType, eventType, recipientEmail, metadata } = data;

        await supabaseClient
          .from('campaign_analytics')
          .insert({
            campaign_id: campaignId,
            campaign_type: campaignType,
            event_type: eventType,
            recipient_email: recipientEmail,
            metadata: metadata || {}
          });

        return new Response(JSON.stringify({ tracked: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'trigger_automation': {
        const { workflowId, triggerData } = data;

        // Get workflow
        const { data: workflow, error: workflowError } = await supabaseClient
          .from('automation_workflows')
          .select('*')
          .eq('id', workflowId)
          .eq('is_active', true)
          .single();

        if (workflowError) throw workflowError;

        // Execute workflow steps
        const steps = workflow.workflow_steps as any[];
        const results = [];

        for (const step of steps) {
          switch (step.type) {
            case 'send_email':
              console.log('Sending email:', step.config);
              results.push({ step: step.name, action: 'email_sent' });
              break;
            case 'add_tag':
              await supabaseClient
                .from('subscriber_tags')
                .insert({
                  email: triggerData.email,
                  tag_id: step.config.tag_id
                });
              results.push({ step: step.name, action: 'tag_added' });
              break;
            case 'add_to_segment':
              await supabaseClient
                .from('segment_members')
                .insert({
                  segment_id: step.config.segment_id,
                  email: triggerData.email
                });
              results.push({ step: step.name, action: 'added_to_segment' });
              break;
            case 'enroll_drip':
              await supabaseClient
                .from('drip_enrollments')
                .insert({
                  campaign_id: step.config.campaign_id,
                  email: triggerData.email
                });
              results.push({ step: step.name, action: 'enrolled_in_drip' });
              break;
            default:
              console.log('Unknown step type:', step.type);
          }
        }

        // Update workflow stats
        await supabaseClient
          .from('automation_workflows')
          .update({
            total_runs: workflow.total_runs + 1,
            last_executed: new Date().toISOString()
          })
          .eq('id', workflowId);

        return new Response(JSON.stringify({ executed: true, results }), {
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
    console.error('Marketing automation error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
