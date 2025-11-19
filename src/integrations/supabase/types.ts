export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ab_experiments: {
        Row: {
          confidence_level: number | null
          conversion_goal: string | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          start_date: string | null
          status: string | null
          traffic_allocation: number | null
          updated_at: string
          variants: Json
        }
        Insert: {
          confidence_level?: number | null
          conversion_goal?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          start_date?: string | null
          status?: string | null
          traffic_allocation?: number | null
          updated_at?: string
          variants?: Json
        }
        Update: {
          confidence_level?: number | null
          conversion_goal?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string | null
          status?: string | null
          traffic_allocation?: number | null
          updated_at?: string
          variants?: Json
        }
        Relationships: []
      }
      ab_participants: {
        Row: {
          converted: boolean | null
          created_at: string
          experiment_id: string
          id: string
          session_id: string
          variant_id: string
        }
        Insert: {
          converted?: boolean | null
          created_at?: string
          experiment_id: string
          id?: string
          session_id: string
          variant_id: string
        }
        Update: {
          converted?: boolean | null
          created_at?: string
          experiment_id?: string
          id?: string
          session_id?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ab_participants_experiment_id_fkey"
            columns: ["experiment_id"]
            isOneToOne: false
            referencedRelation: "ab_experiments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ab_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "visitor_sessions"
            referencedColumns: ["session_id"]
          },
        ]
      }
      alerts: {
        Row: {
          alert_type: string
          comparison_operator: string | null
          conditions: Json
          created_at: string
          frequency: string | null
          id: string
          is_active: boolean | null
          last_triggered: string | null
          name: string
          notification_methods: Json | null
          recipients: Json | null
          threshold_value: number | null
          updated_at: string
        }
        Insert: {
          alert_type: string
          comparison_operator?: string | null
          conditions: Json
          created_at?: string
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          last_triggered?: string | null
          name: string
          notification_methods?: Json | null
          recipients?: Json | null
          threshold_value?: number | null
          updated_at?: string
        }
        Update: {
          alert_type?: string
          comparison_operator?: string | null
          conditions?: Json
          created_at?: string
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          last_triggered?: string | null
          name?: string
          notification_methods?: Json | null
          recipients?: Json | null
          threshold_value?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string
          event_data: Json
          event_type: string
          id: string
          ip_address: string | null
          page_url: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json
          event_type: string
          id?: string
          ip_address?: string | null
          page_url?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json
          event_type?: string
          id?: string
          ip_address?: string | null
          page_url?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string
          encrypted_key: string
          id: string
          is_active: boolean | null
          key_name: string
          service_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          encrypted_key: string
          id?: string
          is_active?: boolean | null
          key_name: string
          service_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          encrypted_key?: string
          id?: string
          is_active?: boolean | null
          key_name?: string
          service_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      automation_workflows: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          success_rate: number | null
          total_runs: number | null
          trigger_config: Json
          trigger_type: string
          updated_at: string
          workflow_steps: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          success_rate?: number | null
          total_runs?: number | null
          trigger_config: Json
          trigger_type: string
          updated_at?: string
          workflow_steps?: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          success_rate?: number | null
          total_runs?: number | null
          trigger_config?: Json
          trigger_type?: string
          updated_at?: string
          workflow_steps?: Json
        }
        Relationships: []
      }
      backlinks: {
        Row: {
          anchor_text: string | null
          created_at: string
          domain_authority: number | null
          first_seen: string
          id: string
          last_seen: string
          link_type: string | null
          page_authority: number | null
          source_url: string
          status: string | null
          target_url: string
        }
        Insert: {
          anchor_text?: string | null
          created_at?: string
          domain_authority?: number | null
          first_seen?: string
          id?: string
          last_seen?: string
          link_type?: string | null
          page_authority?: number | null
          source_url: string
          status?: string | null
          target_url: string
        }
        Update: {
          anchor_text?: string | null
          created_at?: string
          domain_authority?: number | null
          first_seen?: string
          id?: string
          last_seen?: string
          link_type?: string | null
          page_authority?: number | null
          source_url?: string
          status?: string | null
          target_url?: string
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_post_categories: {
        Row: {
          category_id: string | null
          id: string
          post_id: string | null
        }
        Insert: {
          category_id?: string | null
          id?: string
          post_id?: string | null
        }
        Update: {
          category_id?: string | null
          id?: string
          post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          reading_time: number | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_analytics: {
        Row: {
          campaign_id: string
          campaign_type: string
          created_at: string
          event_type: string
          id: string
          metadata: Json | null
          recipient_email: string
        }
        Insert: {
          campaign_id: string
          campaign_type: string
          created_at?: string
          event_type: string
          id?: string
          metadata?: Json | null
          recipient_email: string
        }
        Update: {
          campaign_id?: string
          campaign_type?: string
          created_at?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          recipient_email?: string
        }
        Relationships: []
      }
      candidate_tags: {
        Row: {
          application_id: string
          created_at: string | null
          id: string
          tag: string
        }
        Insert: {
          application_id: string
          created_at?: string | null
          id?: string
          tag: string
        }
        Update: {
          application_id?: string
          created_at?: string | null
          id?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_tags_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "job_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          admin_notes: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          service_interest: string | null
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          service_interest?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          service_interest?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      conversions: {
        Row: {
          campaign_id: string | null
          conversion_type: string
          conversion_value: number | null
          created_at: string
          form_id: string | null
          goal_id: string | null
          id: string
          metadata: Json | null
          session_id: string
        }
        Insert: {
          campaign_id?: string | null
          conversion_type: string
          conversion_value?: number | null
          created_at?: string
          form_id?: string | null
          goal_id?: string | null
          id?: string
          metadata?: Json | null
          session_id: string
        }
        Update: {
          campaign_id?: string | null
          conversion_type?: string
          conversion_value?: number | null
          created_at?: string
          form_id?: string | null
          goal_id?: string | null
          id?: string
          metadata?: Json | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "visitor_sessions"
            referencedColumns: ["session_id"]
          },
        ]
      }
      dashboard_widgets: {
        Row: {
          created_at: string
          dashboard_id: string | null
          height: number | null
          id: string
          is_active: boolean | null
          position_x: number | null
          position_y: number | null
          updated_at: string
          user_id: string
          widget_config: Json
          widget_type: string
          width: number | null
        }
        Insert: {
          created_at?: string
          dashboard_id?: string | null
          height?: number | null
          id?: string
          is_active?: boolean | null
          position_x?: number | null
          position_y?: number | null
          updated_at?: string
          user_id: string
          widget_config?: Json
          widget_type: string
          width?: number | null
        }
        Update: {
          created_at?: string
          dashboard_id?: string | null
          height?: number | null
          id?: string
          is_active?: boolean | null
          position_x?: number | null
          position_y?: number | null
          updated_at?: string
          user_id?: string
          widget_config?: Json
          widget_type?: string
          width?: number | null
        }
        Relationships: []
      }
      drip_campaigns: {
        Row: {
          created_at: string
          description: string | null
          emails: Json
          id: string
          is_active: boolean | null
          name: string
          total_completed: number | null
          total_enrolled: number | null
          trigger_config: Json
          trigger_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          emails?: Json
          id?: string
          is_active?: boolean | null
          name: string
          total_completed?: number | null
          total_enrolled?: number | null
          trigger_config?: Json
          trigger_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          emails?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          total_completed?: number | null
          total_enrolled?: number | null
          trigger_config?: Json
          trigger_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      drip_enrollments: {
        Row: {
          campaign_id: string | null
          completed_at: string | null
          current_step: number | null
          email: string
          enrolled_at: string
          id: string
          metadata: Json | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          completed_at?: string | null
          current_step?: number | null
          email: string
          enrolled_at?: string
          id?: string
          metadata?: Json | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          completed_at?: string | null
          current_step?: number | null
          email?: string
          enrolled_at?: string
          id?: string
          metadata?: Json | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drip_enrollments_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "drip_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaigns: {
        Row: {
          content: string
          created_at: string
          id: string
          name: string
          recipient_list: Json
          scheduled_at: string | null
          sent_at: string | null
          stats: Json | null
          status: string
          subject: string
          template_id: string | null
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          name: string
          recipient_list?: Json
          scheduled_at?: string | null
          sent_at?: string | null
          stats?: Json | null
          status?: string
          subject: string
          template_id?: string | null
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          name?: string
          recipient_list?: Json
          scheduled_at?: string | null
          sent_at?: string | null
          stats?: Json | null
          status?: string
          subject?: string
          template_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          category: string | null
          created_at: string
          html_content: string
          id: string
          is_active: boolean | null
          name: string
          subject: string
          text_content: string | null
          thumbnail_url: string | null
          updated_at: string
          variables: Json | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          html_content: string
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          text_content?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          variables?: Json | null
        }
        Update: {
          category?: string | null
          created_at?: string
          html_content?: string
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          text_content?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          variables?: Json | null
        }
        Relationships: []
      }
      file_uploads: {
        Row: {
          created_at: string
          file_path: string
          file_size: number
          filename: string
          id: string
          metadata: Json | null
          mime_type: string
          original_name: string
          upload_type: string | null
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          file_path: string
          file_size: number
          filename: string
          id?: string
          metadata?: Json | null
          mime_type: string
          original_name: string
          upload_type?: string | null
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          file_path?: string
          file_size?: number
          filename?: string
          id?: string
          metadata?: Json | null
          mime_type?: string
          original_name?: string
          upload_type?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          created_at: string
          form_id: string
          id: string
          ip_address: string | null
          session_id: string | null
          submission_data: Json
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          form_id: string
          id?: string
          ip_address?: string | null
          session_id?: string | null
          submission_data?: Json
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          form_id?: string
          id?: string
          ip_address?: string | null
          session_id?: string | null
          submission_data?: Json
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_submissions_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          form_schema: Json
          id: string
          is_active: boolean | null
          name: string
          settings: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          form_schema?: Json
          id?: string
          is_active?: boolean | null
          name: string
          settings?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          form_schema?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          settings?: Json
          updated_at?: string
        }
        Relationships: []
      }
      funnel_analytics: {
        Row: {
          completed: boolean | null
          created_at: string
          current_step: number
          dropped_at_step: number | null
          funnel_id: string | null
          id: string
          metadata: Json | null
          session_id: string
          step_timestamps: Json | null
          time_to_complete: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          current_step: number
          dropped_at_step?: number | null
          funnel_id?: string | null
          id?: string
          metadata?: Json | null
          session_id: string
          step_timestamps?: Json | null
          time_to_complete?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          current_step?: number
          dropped_at_step?: number | null
          funnel_id?: string | null
          id?: string
          metadata?: Json | null
          session_id?: string
          step_timestamps?: Json | null
          time_to_complete?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funnel_analytics_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnel_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_definitions: {
        Row: {
          conversion_window_hours: number | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          steps: Json
          updated_at: string
        }
        Insert: {
          conversion_window_hours?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          steps?: Json
          updated_at?: string
        }
        Update: {
          conversion_window_hours?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          steps?: Json
          updated_at?: string
        }
        Relationships: []
      }
      heatmap_data: {
        Row: {
          created_at: string
          device_type: string
          element_selector: string | null
          id: string
          interaction_type: string
          page_url: string
          scroll_depth: number | null
          session_id: string | null
          timestamp: string
          viewport_height: number | null
          viewport_width: number | null
          x_position: number | null
          y_position: number | null
        }
        Insert: {
          created_at?: string
          device_type?: string
          element_selector?: string | null
          id?: string
          interaction_type: string
          page_url: string
          scroll_depth?: number | null
          session_id?: string | null
          timestamp?: string
          viewport_height?: number | null
          viewport_width?: number | null
          x_position?: number | null
          y_position?: number | null
        }
        Update: {
          created_at?: string
          device_type?: string
          element_selector?: string | null
          id?: string
          interaction_type?: string
          page_url?: string
          scroll_depth?: number | null
          session_id?: string | null
          timestamp?: string
          viewport_height?: number | null
          viewport_width?: number | null
          x_position?: number | null
          y_position?: number | null
        }
        Relationships: []
      }
      interview_schedules: {
        Row: {
          application_id: string
          created_at: string | null
          duration_minutes: number | null
          feedback: string | null
          id: string
          interview_type: string
          interviewer_email: string | null
          interviewer_name: string | null
          location: string | null
          notes: string | null
          scheduled_at: string
          status: string
          updated_at: string | null
        }
        Insert: {
          application_id: string
          created_at?: string | null
          duration_minutes?: number | null
          feedback?: string | null
          id?: string
          interview_type: string
          interviewer_email?: string | null
          interviewer_name?: string | null
          location?: string | null
          notes?: string | null
          scheduled_at: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          application_id?: string
          created_at?: string | null
          duration_minutes?: number | null
          feedback?: string | null
          id?: string
          interview_type?: string
          interviewer_email?: string | null
          interviewer_name?: string | null
          location?: string | null
          notes?: string | null
          scheduled_at?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_schedules_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "job_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          applicant_email: string
          applicant_name: string
          applicant_phone: string | null
          applied_at: string | null
          availability_date: string | null
          cover_letter: string | null
          current_company: string | null
          expected_salary: string | null
          id: string
          job_id: string
          linkedin_url: string | null
          notes: string | null
          portfolio_url: string | null
          rating: number | null
          resume_url: string
          status: string
          updated_at: string | null
          years_of_experience: number | null
        }
        Insert: {
          applicant_email: string
          applicant_name: string
          applicant_phone?: string | null
          applied_at?: string | null
          availability_date?: string | null
          cover_letter?: string | null
          current_company?: string | null
          expected_salary?: string | null
          id?: string
          job_id: string
          linkedin_url?: string | null
          notes?: string | null
          portfolio_url?: string | null
          rating?: number | null
          resume_url: string
          status?: string
          updated_at?: string | null
          years_of_experience?: number | null
        }
        Update: {
          applicant_email?: string
          applicant_name?: string
          applicant_phone?: string | null
          applied_at?: string | null
          availability_date?: string | null
          cover_letter?: string | null
          current_company?: string | null
          expected_salary?: string | null
          id?: string
          job_id?: string
          linkedin_url?: string | null
          notes?: string | null
          portfolio_url?: string | null
          rating?: number | null
          resume_url?: string
          status?: string
          updated_at?: string | null
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          application_count: number | null
          benefits: string | null
          closes_at: string | null
          created_at: string | null
          created_by: string | null
          department: string
          description: string
          employment_type: string
          id: string
          location: string
          published_at: string | null
          requirements: string
          responsibilities: string | null
          salary_range: string | null
          status: string
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          application_count?: number | null
          benefits?: string | null
          closes_at?: string | null
          created_at?: string | null
          created_by?: string | null
          department: string
          description: string
          employment_type: string
          id?: string
          location: string
          published_at?: string | null
          requirements: string
          responsibilities?: string | null
          salary_range?: string | null
          status?: string
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          application_count?: number | null
          benefits?: string | null
          closes_at?: string | null
          created_at?: string | null
          created_by?: string | null
          department?: string
          description?: string
          employment_type?: string
          id?: string
          location?: string
          published_at?: string | null
          requirements?: string
          responsibilities?: string | null
          salary_range?: string | null
          status?: string
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      keyword_tracking: {
        Row: {
          cpc: number | null
          created_at: string
          current_position: number | null
          difficulty_score: number | null
          id: string
          keyword: string
          last_checked: string
          previous_position: number | null
          search_volume: number | null
          target_position: number | null
          tracked_since: string
          url: string
        }
        Insert: {
          cpc?: number | null
          created_at?: string
          current_position?: number | null
          difficulty_score?: number | null
          id?: string
          keyword: string
          last_checked?: string
          previous_position?: number | null
          search_volume?: number | null
          target_position?: number | null
          tracked_since?: string
          url: string
        }
        Update: {
          cpc?: number | null
          created_at?: string
          current_position?: number | null
          difficulty_score?: number | null
          id?: string
          keyword?: string
          last_checked?: string
          previous_position?: number | null
          search_volume?: number | null
          target_position?: number | null
          tracked_since?: string
          url?: string
        }
        Relationships: []
      }
      lead_capture_forms: {
        Row: {
          conversion_rate: number | null
          created_at: string
          description: string | null
          design_config: Json | null
          display_rules: Json | null
          fields: Json
          id: string
          is_active: boolean | null
          name: string
          redirect_url: string | null
          success_message: string | null
          title: string
          total_submissions: number | null
          total_views: number | null
          type: string
          updated_at: string
        }
        Insert: {
          conversion_rate?: number | null
          created_at?: string
          description?: string | null
          design_config?: Json | null
          display_rules?: Json | null
          fields?: Json
          id?: string
          is_active?: boolean | null
          name: string
          redirect_url?: string | null
          success_message?: string | null
          title: string
          total_submissions?: number | null
          total_views?: number | null
          type: string
          updated_at?: string
        }
        Update: {
          conversion_rate?: number | null
          created_at?: string
          description?: string | null
          design_config?: Json | null
          display_rules?: Json | null
          fields?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          redirect_url?: string | null
          success_message?: string | null
          title?: string
          total_submissions?: number | null
          total_views?: number | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      lead_captures: {
        Row: {
          created_at: string
          data: Json
          email: string
          form_id: string | null
          id: string
          ip_address: string | null
          source_url: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          data?: Json
          email: string
          form_id?: string | null
          id?: string
          ip_address?: string | null
          source_url?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          data?: Json
          email?: string
          form_id?: string | null
          id?: string
          ip_address?: string | null
          source_url?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_captures_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "lead_capture_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_magnets: {
        Row: {
          content_url: string | null
          conversion_tracking: Json | null
          created_at: string
          description: string | null
          display_rules: Json | null
          form_config: Json
          id: string
          is_active: boolean | null
          name: string
          thumbnail_url: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          content_url?: string | null
          conversion_tracking?: Json | null
          created_at?: string
          description?: string | null
          display_rules?: Json | null
          form_config?: Json
          id?: string
          is_active?: boolean | null
          name: string
          thumbnail_url?: string | null
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          content_url?: string | null
          conversion_tracking?: Json | null
          created_at?: string
          description?: string | null
          display_rules?: Json | null
          form_config?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          thumbnail_url?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      media_files: {
        Row: {
          alt_text: string | null
          caption: string | null
          cdn_url: string | null
          created_at: string
          description: string | null
          dimensions: Json | null
          file_path: string
          file_size: number
          file_type: string
          filename: string
          folder_path: string | null
          id: string
          is_optimized: boolean | null
          metadata: Json | null
          mime_type: string
          original_name: string
          updated_at: string
          uploaded_by: string
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          cdn_url?: string | null
          created_at?: string
          description?: string | null
          dimensions?: Json | null
          file_path: string
          file_size: number
          file_type: string
          filename: string
          folder_path?: string | null
          id?: string
          is_optimized?: boolean | null
          metadata?: Json | null
          mime_type: string
          original_name: string
          updated_at?: string
          uploaded_by: string
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          cdn_url?: string | null
          created_at?: string
          description?: string | null
          dimensions?: Json | null
          file_path?: string
          file_size?: number
          file_type?: string
          filename?: string
          folder_path?: string | null
          id?: string
          is_optimized?: boolean | null
          metadata?: Json | null
          mime_type?: string
          original_name?: string
          updated_at?: string
          uploaded_by?: string
        }
        Relationships: []
      }
      menus: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          items: Json
          location: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          items?: Json
          location: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          items?: Json
          location?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
          preferences: Json | null
          status: string
          subscribed_at: string
          unsubscribed_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          preferences?: Json | null
          status?: string
          subscribed_at?: string
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          preferences?: Json | null
          status?: string
          subscribed_at?: string
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          message: string
          read: boolean
          title: string
          type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          message: string
          read?: boolean
          title: string
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          message?: string
          read?: boolean
          title?: string
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      page_revisions: {
        Row: {
          content: string
          created_at: string
          created_by: string
          custom_fields: Json | null
          id: string
          meta_description: string | null
          meta_title: string | null
          page_id: string
          revision_note: string | null
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          custom_fields?: Json | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          page_id: string
          revision_note?: string | null
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          custom_fields?: Json | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          page_id?: string
          revision_note?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_revisions_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      page_views: {
        Row: {
          bounce: boolean | null
          created_at: string
          exit_page: boolean | null
          id: string
          page_title: string | null
          page_url: string
          scroll_depth: number | null
          session_id: string
          time_on_page: number | null
          updated_at: string
        }
        Insert: {
          bounce?: boolean | null
          created_at?: string
          exit_page?: boolean | null
          id?: string
          page_title?: string | null
          page_url: string
          scroll_depth?: number | null
          session_id: string
          time_on_page?: number | null
          updated_at?: string
        }
        Update: {
          bounce?: boolean | null
          created_at?: string
          exit_page?: boolean | null
          id?: string
          page_title?: string | null
          page_url?: string
          scroll_depth?: number | null
          session_id?: string
          time_on_page?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_views_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "visitor_sessions"
            referencedColumns: ["session_id"]
          },
        ]
      }
      pages: {
        Row: {
          author_id: string
          content: string
          created_at: string
          custom_fields: Json | null
          featured_image: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          parent_id: string | null
          password: string | null
          scheduled_at: string | null
          seo_settings: Json | null
          slug: string
          sort_order: number | null
          status: string
          template: string | null
          title: string
          updated_at: string
          visibility: string | null
        }
        Insert: {
          author_id: string
          content?: string
          created_at?: string
          custom_fields?: Json | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          parent_id?: string | null
          password?: string | null
          scheduled_at?: string | null
          seo_settings?: Json | null
          slug: string
          sort_order?: number | null
          status?: string
          template?: string | null
          title: string
          updated_at?: string
          visibility?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          custom_fields?: Json | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          parent_id?: string | null
          password?: string | null
          scheduled_at?: string | null
          seo_settings?: Json | null
          slug?: string
          sort_order?: number | null
          status?: string
          template?: string | null
          title?: string
          updated_at?: string
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_metrics: {
        Row: {
          accessibility_score: number | null
          best_practices_score: number | null
          created_at: string
          cumulative_layout_shift: number | null
          device_type: string | null
          first_contentful_paint: number | null
          first_input_delay: number | null
          id: string
          largest_contentful_paint: number | null
          performance_score: number | null
          seo_lighthouse_score: number | null
          speed_index: number | null
          time_to_first_byte: number | null
          total_blocking_time: number | null
          url: string
        }
        Insert: {
          accessibility_score?: number | null
          best_practices_score?: number | null
          created_at?: string
          cumulative_layout_shift?: number | null
          device_type?: string | null
          first_contentful_paint?: number | null
          first_input_delay?: number | null
          id?: string
          largest_contentful_paint?: number | null
          performance_score?: number | null
          seo_lighthouse_score?: number | null
          speed_index?: number | null
          time_to_first_byte?: number | null
          total_blocking_time?: number | null
          url: string
        }
        Update: {
          accessibility_score?: number | null
          best_practices_score?: number | null
          created_at?: string
          cumulative_layout_shift?: number | null
          device_type?: string | null
          first_contentful_paint?: number | null
          first_input_delay?: number | null
          id?: string
          largest_contentful_paint?: number | null
          performance_score?: number | null
          seo_lighthouse_score?: number | null
          speed_index?: number | null
          time_to_first_byte?: number | null
          total_blocking_time?: number | null
          url?: string
        }
        Relationships: []
      }
      performance_snapshots: {
        Row: {
          cls: number | null
          created_at: string
          css_size_kb: number | null
          device_type: string
          fcp: number | null
          fid: number | null
          font_size_kb: number | null
          id: string
          image_size_kb: number | null
          js_size_kb: number | null
          lcp: number | null
          lighthouse_accessibility: number | null
          lighthouse_best_practices: number | null
          lighthouse_performance: number | null
          lighthouse_pwa: number | null
          lighthouse_seo: number | null
          resource_count: number | null
          resource_size_kb: number | null
          speed_index: number | null
          tbt: number | null
          ttfb: number | null
          tti: number | null
          url: string
        }
        Insert: {
          cls?: number | null
          created_at?: string
          css_size_kb?: number | null
          device_type?: string
          fcp?: number | null
          fid?: number | null
          font_size_kb?: number | null
          id?: string
          image_size_kb?: number | null
          js_size_kb?: number | null
          lcp?: number | null
          lighthouse_accessibility?: number | null
          lighthouse_best_practices?: number | null
          lighthouse_performance?: number | null
          lighthouse_pwa?: number | null
          lighthouse_seo?: number | null
          resource_count?: number | null
          resource_size_kb?: number | null
          speed_index?: number | null
          tbt?: number | null
          ttfb?: number | null
          tti?: number | null
          url: string
        }
        Update: {
          cls?: number | null
          created_at?: string
          css_size_kb?: number | null
          device_type?: string
          fcp?: number | null
          fid?: number | null
          font_size_kb?: number | null
          id?: string
          image_size_kb?: number | null
          js_size_kb?: number | null
          lcp?: number | null
          lighthouse_accessibility?: number | null
          lighthouse_best_practices?: number | null
          lighthouse_performance?: number | null
          lighthouse_pwa?: number | null
          lighthouse_seo?: number | null
          resource_count?: number | null
          resource_size_kb?: number | null
          speed_index?: number | null
          tbt?: number | null
          ttfb?: number | null
          tti?: number | null
          url?: string
        }
        Relationships: []
      }
      performance_tracking: {
        Row: {
          connection_type: string | null
          created_at: string
          cumulative_layout_shift: number | null
          device_type: string | null
          first_contentful_paint: number | null
          first_input_delay: number | null
          id: string
          largest_contentful_paint: number | null
          load_time: number | null
          page_url: string
          time_to_interactive: number | null
        }
        Insert: {
          connection_type?: string | null
          created_at?: string
          cumulative_layout_shift?: number | null
          device_type?: string | null
          first_contentful_paint?: number | null
          first_input_delay?: number | null
          id?: string
          largest_contentful_paint?: number | null
          load_time?: number | null
          page_url: string
          time_to_interactive?: number | null
        }
        Update: {
          connection_type?: string | null
          created_at?: string
          cumulative_layout_shift?: number | null
          device_type?: string | null
          first_contentful_paint?: number | null
          first_input_delay?: number | null
          id?: string
          largest_contentful_paint?: number | null
          load_time?: number | null
          page_url?: string
          time_to_interactive?: number | null
        }
        Relationships: []
      }
      portfolio_files: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          file_path: string
          file_size: number
          filename: string
          id: string
          is_public: boolean
          mime_type: string
          original_name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          file_path: string
          file_size: number
          filename: string
          id?: string
          is_public?: boolean
          mime_type: string
          original_name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          file_path?: string
          file_size?: number
          filename?: string
          id?: string
          is_public?: boolean
          mime_type?: string
          original_name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      realtime_metrics: {
        Row: {
          created_at: string
          dimensions: Json | null
          id: string
          metric_name: string
          metric_type: string
          metric_value: number
          timestamp: string
        }
        Insert: {
          created_at?: string
          dimensions?: Json | null
          id?: string
          metric_name: string
          metric_type: string
          metric_value: number
          timestamp?: string
        }
        Update: {
          created_at?: string
          dimensions?: Json | null
          id?: string
          metric_name?: string
          metric_type?: string
          metric_value?: number
          timestamp?: string
        }
        Relationships: []
      }
      search_index: {
        Row: {
          content: string
          content_id: string
          content_type: string
          created_at: string
          id: string
          search_vector: unknown
          tags: string[] | null
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          content: string
          content_id: string
          content_type: string
          created_at?: string
          id?: string
          search_vector?: unknown
          tags?: string[] | null
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          content?: string
          content_id?: string
          content_type?: string
          created_at?: string
          id?: string
          search_vector?: unknown
          tags?: string[] | null
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      segment_members: {
        Row: {
          added_at: string
          email: string
          id: string
          metadata: Json | null
          segment_id: string | null
          user_id: string | null
        }
        Insert: {
          added_at?: string
          email: string
          id?: string
          metadata?: Json | null
          segment_id?: string | null
          user_id?: string | null
        }
        Update: {
          added_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          segment_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "segment_members_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "segments"
            referencedColumns: ["id"]
          },
        ]
      }
      segments: {
        Row: {
          conditions: Json
          created_at: string
          description: string | null
          id: string
          is_dynamic: boolean | null
          member_count: number | null
          name: string
          updated_at: string
        }
        Insert: {
          conditions?: Json
          created_at?: string
          description?: string | null
          id?: string
          is_dynamic?: boolean | null
          member_count?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          conditions?: Json
          created_at?: string
          description?: string | null
          id?: string
          is_dynamic?: boolean | null
          member_count?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_automation_rules: {
        Row: {
          actions: Json
          conditions: Json
          created_at: string
          description: string | null
          execution_count: number | null
          id: string
          is_active: boolean | null
          last_executed: string | null
          name: string
          rule_type: string
          updated_at: string
        }
        Insert: {
          actions: Json
          conditions: Json
          created_at?: string
          description?: string | null
          execution_count?: number | null
          id?: string
          is_active?: boolean | null
          last_executed?: string | null
          name: string
          rule_type: string
          updated_at?: string
        }
        Update: {
          actions?: Json
          conditions?: Json
          created_at?: string
          description?: string | null
          execution_count?: number | null
          id?: string
          is_active?: boolean | null
          last_executed?: string | null
          name?: string
          rule_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_forecasts: {
        Row: {
          confidence_score: number | null
          created_at: string
          current_value: number
          factors: Json | null
          forecast_period: string
          forecast_type: string
          id: string
          methodology: string | null
          predicted_value: number
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          current_value: number
          factors?: Json | null
          forecast_period: string
          forecast_type: string
          id?: string
          methodology?: string | null
          predicted_value: number
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          current_value?: number
          factors?: Json | null
          forecast_period?: string
          forecast_type?: string
          id?: string
          methodology?: string | null
          predicted_value?: number
        }
        Relationships: []
      }
      seo_issues: {
        Row: {
          created_at: string
          description: string
          estimated_fix_time: number | null
          id: string
          impact_score: number | null
          is_resolved: boolean | null
          issue_type: string
          priority_score: number | null
          recommendation: string
          severity: string
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          description: string
          estimated_fix_time?: number | null
          id?: string
          impact_score?: number | null
          is_resolved?: boolean | null
          issue_type: string
          priority_score?: number | null
          recommendation: string
          severity: string
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          description?: string
          estimated_fix_time?: number | null
          id?: string
          impact_score?: number | null
          is_resolved?: boolean | null
          issue_type?: string
          priority_score?: number | null
          recommendation?: string
          severity?: string
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      seo_metrics: {
        Row: {
          aeo_score: number | null
          alt_text_missing: number | null
          backlinks_count: number | null
          created_at: string
          domain_authority: number | null
          external_links: number | null
          geo_optimization_score: number | null
          h1_count: number | null
          h2_count: number | null
          https_enabled: boolean | null
          id: string
          image_count: number | null
          internal_links: number | null
          load_time_ms: number | null
          meta_description: string | null
          meta_title: string | null
          mobile_friendly: boolean | null
          organic_keywords: number | null
          page_size_kb: number | null
          page_speed_score: number | null
          seo_score: number | null
          sitemap_indexed: boolean | null
          structured_data_present: boolean | null
          updated_at: string
          url: string
          voice_optimization_score: number | null
        }
        Insert: {
          aeo_score?: number | null
          alt_text_missing?: number | null
          backlinks_count?: number | null
          created_at?: string
          domain_authority?: number | null
          external_links?: number | null
          geo_optimization_score?: number | null
          h1_count?: number | null
          h2_count?: number | null
          https_enabled?: boolean | null
          id?: string
          image_count?: number | null
          internal_links?: number | null
          load_time_ms?: number | null
          meta_description?: string | null
          meta_title?: string | null
          mobile_friendly?: boolean | null
          organic_keywords?: number | null
          page_size_kb?: number | null
          page_speed_score?: number | null
          seo_score?: number | null
          sitemap_indexed?: boolean | null
          structured_data_present?: boolean | null
          updated_at?: string
          url: string
          voice_optimization_score?: number | null
        }
        Update: {
          aeo_score?: number | null
          alt_text_missing?: number | null
          backlinks_count?: number | null
          created_at?: string
          domain_authority?: number | null
          external_links?: number | null
          geo_optimization_score?: number | null
          h1_count?: number | null
          h2_count?: number | null
          https_enabled?: boolean | null
          id?: string
          image_count?: number | null
          internal_links?: number | null
          load_time_ms?: number | null
          meta_description?: string | null
          meta_title?: string | null
          mobile_friendly?: boolean | null
          organic_keywords?: number | null
          page_size_kb?: number | null
          page_speed_score?: number | null
          seo_score?: number | null
          sitemap_indexed?: boolean | null
          structured_data_present?: boolean | null
          updated_at?: string
          url?: string
          voice_optimization_score?: number | null
        }
        Relationships: []
      }
      session_recordings: {
        Row: {
          created_at: string
          device_info: Json | null
          duration: number | null
          ended_at: string | null
          event_count: number | null
          id: string
          is_processed: boolean | null
          page_count: number | null
          recording_data: Json
          session_id: string
          started_at: string
          storage_url: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          device_info?: Json | null
          duration?: number | null
          ended_at?: string | null
          event_count?: number | null
          id?: string
          is_processed?: boolean | null
          page_count?: number | null
          recording_data?: Json
          session_id: string
          started_at?: string
          storage_url?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          device_info?: Json | null
          duration?: number | null
          ended_at?: string | null
          event_count?: number | null
          id?: string
          is_processed?: boolean | null
          page_count?: number | null
          recording_data?: Json
          session_id?: string
          started_at?: string
          storage_url?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sitemap_urls: {
        Row: {
          changefreq: string | null
          created_at: string
          id: string
          is_indexed: boolean | null
          lastmod: string | null
          priority: number | null
          status_code: number | null
          updated_at: string
          url: string
        }
        Insert: {
          changefreq?: string | null
          created_at?: string
          id?: string
          is_indexed?: boolean | null
          lastmod?: string | null
          priority?: number | null
          status_code?: number | null
          updated_at?: string
          url: string
        }
        Update: {
          changefreq?: string | null
          created_at?: string
          id?: string
          is_indexed?: boolean | null
          lastmod?: string | null
          priority?: number | null
          status_code?: number | null
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      subscriber_tags: {
        Row: {
          added_at: string
          email: string
          id: string
          subscriber_id: string | null
          tag_id: string | null
        }
        Insert: {
          added_at?: string
          email: string
          id?: string
          subscriber_id?: string | null
          tag_id?: string | null
        }
        Update: {
          added_at?: string
          email?: string
          id?: string
          subscriber_id?: string | null
          tag_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriber_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          subscriber_count: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          subscriber_count?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          subscriber_count?: number | null
        }
        Relationships: []
      }
      theme_settings: {
        Row: {
          color_scheme: Json | null
          created_at: string
          custom_css: string | null
          id: string
          is_active: boolean | null
          layout_settings: Json | null
          theme_name: string
          typography: Json | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          color_scheme?: Json | null
          created_at?: string
          custom_css?: string | null
          id?: string
          is_active?: boolean | null
          layout_settings?: Json | null
          theme_name?: string
          typography?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          color_scheme?: Json | null
          created_at?: string
          custom_css?: string | null
          id?: string
          is_active?: boolean | null
          layout_settings?: Json | null
          theme_name?: string
          typography?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_events: {
        Row: {
          coordinates: Json | null
          created_at: string
          element_selector: string | null
          element_text: string | null
          event_type: string
          form_data: Json | null
          id: string
          metadata: Json | null
          page_url: string
          session_id: string
        }
        Insert: {
          coordinates?: Json | null
          created_at?: string
          element_selector?: string | null
          element_text?: string | null
          event_type: string
          form_data?: Json | null
          id?: string
          metadata?: Json | null
          page_url: string
          session_id: string
        }
        Update: {
          coordinates?: Json | null
          created_at?: string
          element_selector?: string | null
          element_text?: string | null
          event_type?: string
          form_data?: Json | null
          id?: string
          metadata?: Json | null
          page_url?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_events_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "visitor_sessions"
            referencedColumns: ["session_id"]
          },
        ]
      }
      visitor_sessions: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          device_type: string | null
          id: string
          ip_address: string | null
          is_active: boolean | null
          last_activity: string
          os: string | null
          referrer: string | null
          session_id: string
          started_at: string
          total_page_views: number | null
          total_time_spent: number | null
          user_agent: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          is_active?: boolean | null
          last_activity?: string
          os?: string | null
          referrer?: string | null
          session_id: string
          started_at?: string
          total_page_views?: number | null
          total_time_spent?: number | null
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          is_active?: boolean | null
          last_activity?: string
          os?: string | null
          referrer?: string | null
          session_id?: string
          started_at?: string
          total_page_views?: number | null
          total_time_spent?: number | null
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      widgets: {
        Row: {
          content: Json
          created_at: string
          created_by: string
          id: string
          is_global: boolean | null
          name: string
          settings: Json | null
          type: string
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          created_by: string
          id?: string
          is_global?: boolean | null
          name: string
          settings?: Json | null
          type: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          created_by?: string
          id?: string
          is_global?: boolean | null
          name?: string
          settings?: Json | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      workflow_executions: {
        Row: {
          completed_at: string | null
          contact_id: string | null
          current_step: number | null
          error_message: string | null
          execution_data: Json | null
          id: string
          session_id: string | null
          started_at: string
          status: string | null
          workflow_id: string
        }
        Insert: {
          completed_at?: string | null
          contact_id?: string | null
          current_step?: number | null
          error_message?: string | null
          execution_data?: Json | null
          id?: string
          session_id?: string | null
          started_at?: string
          status?: string | null
          workflow_id: string
        }
        Update: {
          completed_at?: string | null
          contact_id?: string | null
          current_step?: number | null
          error_message?: string | null
          execution_data?: Json | null
          id?: string
          session_id?: string | null
          started_at?: string
          status?: string | null
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_executions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "automation_workflows"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_reading_time: { Args: { content: string }; Returns: number }
      generate_slug: { Args: { title: string }; Returns: string }
      get_current_user_role: { Args: never; Returns: string }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
