export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
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
      search_index: {
        Row: {
          content: string
          content_id: string
          content_type: string
          created_at: string
          id: string
          search_vector: unknown | null
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
          search_vector?: unknown | null
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
          search_vector?: unknown | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          url?: string
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_reading_time: {
        Args: { content: string }
        Returns: number
      }
      generate_slug: {
        Args: { title: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
