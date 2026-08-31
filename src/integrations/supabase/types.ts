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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          country: string | null
          created_at: string
          event_name: string
          id: string
          label: string | null
          lang: string | null
          metadata: Json
          path: string | null
          referrer: string | null
          user_agent: string | null
          viewport: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          event_name: string
          id?: string
          label?: string | null
          lang?: string | null
          metadata?: Json
          path?: string | null
          referrer?: string | null
          user_agent?: string | null
          viewport?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          event_name?: string
          id?: string
          label?: string | null
          lang?: string | null
          metadata?: Json
          path?: string | null
          referrer?: string | null
          user_agent?: string | null
          viewport?: string | null
        }
        Relationships: []
      }
      app_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          actor: string
          created_at: string
          detail: string | null
          entity: string | null
          entity_id: string | null
          id: string
        }
        Insert: {
          action: string
          actor?: string
          created_at?: string
          detail?: string | null
          entity?: string | null
          entity_id?: string | null
          id?: string
        }
        Update: {
          action?: string
          actor?: string
          created_at?: string
          detail?: string | null
          entity?: string | null
          entity_id?: string | null
          id?: string
        }
        Relationships: []
      }
      auto_reply_logs: {
        Row: {
          created_at: string
          error: string | null
          id: string
          incoming_text: string | null
          kind: string
          matched_rule_id: string | null
          platform: string
          reply_text: string | null
          sender_id: string | null
          status: string
        }
        Insert: {
          created_at?: string
          error?: string | null
          id?: string
          incoming_text?: string | null
          kind: string
          matched_rule_id?: string | null
          platform: string
          reply_text?: string | null
          sender_id?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          error?: string | null
          id?: string
          incoming_text?: string | null
          kind?: string
          matched_rule_id?: string | null
          platform?: string
          reply_text?: string | null
          sender_id?: string | null
          status?: string
        }
        Relationships: []
      }
      auto_reply_rules: {
        Row: {
          active: boolean
          channel: string
          created_at: string
          id: string
          keyword: string
          match_type: string
          platform: string
          priority: number
          response: string
        }
        Insert: {
          active?: boolean
          channel?: string
          created_at?: string
          id?: string
          keyword: string
          match_type?: string
          platform?: string
          priority?: number
          response: string
        }
        Update: {
          active?: boolean
          channel?: string
          created_at?: string
          id?: string
          keyword?: string
          match_type?: string
          platform?: string
          priority?: number
          response?: string
        }
        Relationships: []
      }
      auto_reply_settings: {
        Row: {
          ai_enabled: boolean
          created_at: string
          enabled: boolean
          fallback_reply: string
          id: string
          reply_to_comments: boolean
          reply_to_messages: boolean
          updated_at: string
        }
        Insert: {
          ai_enabled?: boolean
          created_at?: string
          enabled?: boolean
          fallback_reply?: string
          id?: string
          reply_to_comments?: boolean
          reply_to_messages?: boolean
          updated_at?: string
        }
        Update: {
          ai_enabled?: boolean
          created_at?: string
          enabled?: boolean
          fallback_reply?: string
          id?: string
          reply_to_comments?: boolean
          reply_to_messages?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      automation_alerts: {
        Row: {
          body: string | null
          created_at: string
          id: string
          read: boolean
          rule_id: string | null
          severity: string
          title: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          read?: boolean
          rule_id?: string | null
          severity?: string
          title: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          read?: boolean
          rule_id?: string | null
          severity?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_alerts_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "automation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_rules: {
        Row: {
          action: string
          action_param: string | null
          active: boolean
          created_at: string
          id: string
          last_triggered_at: string | null
          name: string
          threshold: number
          trigger: string
          trigger_count: number
          updated_at: string
        }
        Insert: {
          action?: string
          action_param?: string | null
          active?: boolean
          created_at?: string
          id?: string
          last_triggered_at?: string | null
          name: string
          threshold?: number
          trigger?: string
          trigger_count?: number
          updated_at?: string
        }
        Update: {
          action?: string
          action_param?: string | null
          active?: boolean
          created_at?: string
          id?: string
          last_triggered_at?: string | null
          name?: string
          threshold?: number
          trigger?: string
          trigger_count?: number
          updated_at?: string
        }
        Relationships: []
      }
      automation_settings: {
        Row: {
          alert_email: string | null
          created_at: string
          email_alerts: boolean
          id: string
          master_enabled: boolean
          updated_at: string
        }
        Insert: {
          alert_email?: string | null
          created_at?: string
          email_alerts?: boolean
          id?: string
          master_enabled?: boolean
          updated_at?: string
        }
        Update: {
          alert_email?: string | null
          created_at?: string
          email_alerts?: boolean
          id?: string
          master_enabled?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      autopilot_settings: {
        Row: {
          batch_size: number
          cadence_per_week: number
          campaign_id: string | null
          created_at: string
          enabled: boolean
          id: string
          last_run_at: string | null
          last_run_summary: string | null
          min_queue: number
          platform: string
          theme: string | null
          updated_at: string
          voice_profile_id: string | null
        }
        Insert: {
          batch_size?: number
          cadence_per_week?: number
          campaign_id?: string | null
          created_at?: string
          enabled?: boolean
          id?: string
          last_run_at?: string | null
          last_run_summary?: string | null
          min_queue?: number
          platform?: string
          theme?: string | null
          updated_at?: string
          voice_profile_id?: string | null
        }
        Update: {
          batch_size?: number
          cadence_per_week?: number
          campaign_id?: string | null
          created_at?: string
          enabled?: boolean
          id?: string
          last_run_at?: string | null
          last_run_summary?: string | null
          min_queue?: number
          platform?: string
          theme?: string | null
          updated_at?: string
          voice_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "autopilot_settings_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "autopilot_settings_voice_profile_id_fkey"
            columns: ["voice_profile_id"]
            isOneToOne: false
            referencedRelation: "voice_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts_generated: {
        Row: {
          created_at: string
          data: Json
          id: string
          published: boolean
          published_at: string
          slug: string
          source_job_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          published?: boolean
          published_at?: string
          slug: string
          source_job_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          published?: boolean
          published_at?: string
          slug?: string
          source_job_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_generated_source_job_id_fkey"
            columns: ["source_job_id"]
            isOneToOne: false
            referencedRelation: "seo_writer_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          address: string | null
          created_at: string
          deleted_at: string | null
          district_name: string
          district_slug: string
          id: string
          name: string
          notes: string | null
          phone: string
          preferred_date: string | null
          service_key: string
          service_label: string
          status: Database["public"]["Enums"]["lead_status"]
          time_slot: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          deleted_at?: string | null
          district_name: string
          district_slug: string
          id?: string
          name: string
          notes?: string | null
          phone: string
          preferred_date?: string | null
          service_key: string
          service_label: string
          status?: Database["public"]["Enums"]["lead_status"]
          time_slot?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          deleted_at?: string | null
          district_name?: string
          district_slug?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string
          preferred_date?: string | null
          service_key?: string
          service_label?: string
          status?: Database["public"]["Enums"]["lead_status"]
          time_slot?: string | null
        }
        Relationships: []
      }
      brand_settings: {
        Row: {
          best_times: Json
          business_name: string
          created_at: string
          default_hashtags: string
          id: string
          language: string
          logo_path: string | null
          phone: string
          primary_color: string
          tone: string
          updated_at: string
        }
        Insert: {
          best_times?: Json
          business_name?: string
          created_at?: string
          default_hashtags?: string
          id?: string
          language?: string
          logo_path?: string | null
          phone?: string
          primary_color?: string
          tone?: string
          updated_at?: string
        }
        Update: {
          best_times?: Json
          business_name?: string
          created_at?: string
          default_hashtags?: string
          id?: string
          language?: string
          logo_path?: string | null
          phone?: string
          primary_color?: string
          tone?: string
          updated_at?: string
        }
        Relationships: []
      }
      callback_requests: {
        Row: {
          created_at: string
          deleted_at: string | null
          district_name: string
          district_slug: string
          id: string
          name: string
          phone: string
          status: Database["public"]["Enums"]["lead_status"]
          time_slot: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          district_name: string
          district_slug: string
          id?: string
          name: string
          phone: string
          status?: Database["public"]["Enums"]["lead_status"]
          time_slot: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          district_name?: string
          district_slug?: string
          id?: string
          name?: string
          phone?: string
          status?: Database["public"]["Enums"]["lead_status"]
          time_slot?: string
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          color: string
          created_at: string
          description: string | null
          ends_on: string | null
          goal: string | null
          id: string
          name: string
          require_approval: boolean
          starts_on: string | null
          status: string
          target_district: string | null
          target_service: string | null
          updated_at: string
          voice_profile_id: string | null
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string | null
          ends_on?: string | null
          goal?: string | null
          id?: string
          name: string
          require_approval?: boolean
          starts_on?: string | null
          status?: string
          target_district?: string | null
          target_service?: string | null
          updated_at?: string
          voice_profile_id?: string | null
        }
        Update: {
          color?: string
          created_at?: string
          description?: string | null
          ends_on?: string | null
          goal?: string | null
          id?: string
          name?: string
          require_approval?: boolean
          starts_on?: string | null
          status?: string
          target_district?: string | null
          target_service?: string | null
          updated_at?: string
          voice_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_voice_profile_id_fkey"
            columns: ["voice_profile_id"]
            isOneToOne: false
            referencedRelation: "voice_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_batches: {
        Row: {
          completed: number
          created_at: string
          error: string | null
          id: string
          platform: string
          status: string
          theme: string
          total: number
          updated_at: string
        }
        Insert: {
          completed?: number
          created_at?: string
          error?: string | null
          id?: string
          platform?: string
          status?: string
          theme?: string
          total?: number
          updated_at?: string
        }
        Update: {
          completed?: number
          created_at?: string
          error?: string | null
          id?: string
          platform?: string
          status?: string
          theme?: string
          total?: number
          updated_at?: string
        }
        Relationships: []
      }
      content_ideas: {
        Row: {
          ai_generated: boolean
          created_at: string
          id: string
          notes: string | null
          platform: string | null
          priority: string
          service: string | null
          sort_order: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean
          created_at?: string
          id?: string
          notes?: string | null
          platform?: string | null
          priority?: string
          service?: string | null
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean
          created_at?: string
          id?: string
          notes?: string | null
          platform?: string | null
          priority?: string
          service?: string | null
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_templates: {
        Row: {
          ai_generated: boolean
          category: string
          created_at: string
          cta: string | null
          description: string | null
          example_caption: string | null
          hashtags: string[]
          id: string
          name: string
          platform: string
          service: string | null
          sort_order: number
          structure: string
          updated_at: string
          use_count: number
        }
        Insert: {
          ai_generated?: boolean
          category?: string
          created_at?: string
          cta?: string | null
          description?: string | null
          example_caption?: string | null
          hashtags?: string[]
          id?: string
          name: string
          platform?: string
          service?: string | null
          sort_order?: number
          structure?: string
          updated_at?: string
          use_count?: number
        }
        Update: {
          ai_generated?: boolean
          category?: string
          created_at?: string
          cta?: string | null
          description?: string | null
          example_caption?: string | null
          hashtags?: string[]
          id?: string
          name?: string
          platform?: string
          service?: string | null
          sort_order?: number
          structure?: string
          updated_at?: string
          use_count?: number
        }
        Relationships: []
      }
      conversation_messages: {
        Row: {
          author: string | null
          body: string
          conversation_id: string
          created_at: string
          direction: string
          external_id: string | null
          id: string
        }
        Insert: {
          author?: string | null
          body: string
          conversation_id: string
          created_at?: string
          direction: string
          external_id?: string | null
          id?: string
        }
        Update: {
          author?: string | null
          body?: string
          conversation_id?: string
          created_at?: string
          direction?: string
          external_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          channel: string
          converted_booking_id: string | null
          created_at: string
          escalated: boolean
          id: string
          intent: string | null
          is_lead: boolean
          last_direction: string
          last_message_at: string
          last_message_preview: string | null
          lead_reason: string | null
          lead_scanned_at: string | null
          lead_score: number
          participant_id: string
          participant_name: string | null
          platform: string
          sentiment: string | null
          status: string
          unread_count: number
          updated_at: string
        }
        Insert: {
          channel: string
          converted_booking_id?: string | null
          created_at?: string
          escalated?: boolean
          id?: string
          intent?: string | null
          is_lead?: boolean
          last_direction?: string
          last_message_at?: string
          last_message_preview?: string | null
          lead_reason?: string | null
          lead_scanned_at?: string | null
          lead_score?: number
          participant_id: string
          participant_name?: string | null
          platform: string
          sentiment?: string | null
          status?: string
          unread_count?: number
          updated_at?: string
        }
        Update: {
          channel?: string
          converted_booking_id?: string | null
          created_at?: string
          escalated?: boolean
          id?: string
          intent?: string | null
          is_lead?: boolean
          last_direction?: string
          last_message_at?: string
          last_message_preview?: string | null
          lead_reason?: string | null
          lead_scanned_at?: string | null
          lead_score?: number
          participant_id?: string
          participant_name?: string | null
          platform?: string
          sentiment?: string | null
          status?: string
          unread_count?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_converted_booking_id_fkey"
            columns: ["converted_booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      experiment_variants: {
        Row: {
          created_at: string
          experiment_id: string
          id: string
          is_control: boolean
          label: string
          post_id: string | null
        }
        Insert: {
          created_at?: string
          experiment_id: string
          id?: string
          is_control?: boolean
          label?: string
          post_id?: string | null
        }
        Update: {
          created_at?: string
          experiment_id?: string
          id?: string
          is_control?: boolean
          label?: string
          post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experiment_variants_experiment_id_fkey"
            columns: ["experiment_id"]
            isOneToOne: false
            referencedRelation: "experiments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experiment_variants_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      experiments: {
        Row: {
          base_idea: string | null
          created_at: string
          hypothesis: string | null
          id: string
          metric: string
          name: string
          status: string
          updated_at: string
          winner_post_id: string | null
        }
        Insert: {
          base_idea?: string | null
          created_at?: string
          hypothesis?: string | null
          id?: string
          metric?: string
          name: string
          status?: string
          updated_at?: string
          winner_post_id?: string | null
        }
        Update: {
          base_idea?: string | null
          created_at?: string
          hypothesis?: string | null
          id?: string
          metric?: string
          name?: string
          status?: string
          updated_at?: string
          winner_post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experiments_winner_post_id_fkey"
            columns: ["winner_post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      hashtag_sets: {
        Row: {
          ai_generated: boolean
          created_at: string
          hashtags: string[]
          id: string
          keywords: string[]
          name: string
          notes: string | null
          platform: string
          service: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean
          created_at?: string
          hashtags?: string[]
          id?: string
          keywords?: string[]
          name: string
          notes?: string | null
          platform?: string
          service?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean
          created_at?: string
          hashtags?: string[]
          id?: string
          keywords?: string[]
          name?: string
          notes?: string | null
          platform?: string
          service?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      keyword_snapshots: {
        Row: {
          captured_on: string
          clicks: number
          created_at: string
          ctr: number
          id: string
          impressions: number
          indexed_pages: number | null
          keyword: string
          position: number | null
          submitted_pages: number | null
          tier: number
          updated_at: string
        }
        Insert: {
          captured_on?: string
          clicks?: number
          created_at?: string
          ctr?: number
          id?: string
          impressions?: number
          indexed_pages?: number | null
          keyword: string
          position?: number | null
          submitted_pages?: number | null
          tier?: number
          updated_at?: string
        }
        Update: {
          captured_on?: string
          clicks?: number
          created_at?: string
          ctr?: number
          id?: string
          impressions?: number
          indexed_pages?: number | null
          keyword?: string
          position?: number | null
          submitted_pages?: number | null
          tier?: number
          updated_at?: string
        }
        Relationships: []
      }
      link_clicks: {
        Row: {
          created_at: string
          id: string
          link_id: string
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          link_id: string
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          link_id?: string
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "link_clicks_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "tracked_links"
            referencedColumns: ["id"]
          },
        ]
      }
      media_assets: {
        Row: {
          alt_text: string | null
          created_at: string
          created_by: string | null
          height: number | null
          id: string
          mime_type: string
          name: string
          path: string
          size_bytes: number | null
          source: string
          tags: string[]
          updated_at: string
          usage_count: number
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          created_by?: string | null
          height?: number | null
          id?: string
          mime_type?: string
          name?: string
          path: string
          size_bytes?: number | null
          source?: string
          tags?: string[]
          updated_at?: string
          usage_count?: number
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          created_by?: string | null
          height?: number | null
          id?: string
          mime_type?: string
          name?: string
          path?: string
          size_bytes?: number | null
          source?: string
          tags?: string[]
          updated_at?: string
          usage_count?: number
          width?: number | null
        }
        Relationships: []
      }
      post_analytics: {
        Row: {
          comments: number
          created_at: string
          engagement: number
          fetched_at: string
          id: string
          impressions: number
          likes: number
          platform: string
          post_id: string
          reach: number
          shares: number
        }
        Insert: {
          comments?: number
          created_at?: string
          engagement?: number
          fetched_at?: string
          id?: string
          impressions?: number
          likes?: number
          platform: string
          post_id: string
          reach?: number
          shares?: number
        }
        Update: {
          comments?: number
          created_at?: string
          engagement?: number
          fetched_at?: string
          id?: string
          impressions?: number
          likes?: number
          platform?: string
          post_id?: string
          reach?: number
          shares?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_analytics_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          author_id: string | null
          author_name: string
          body: string
          created_at: string
          id: string
          mentions: string[]
          post_id: string
        }
        Insert: {
          author_id?: string | null
          author_name?: string
          body: string
          created_at?: string
          id?: string
          mentions?: string[]
          post_id: string
        }
        Update: {
          author_id?: string | null
          author_name?: string
          body?: string
          created_at?: string
          id?: string
          mentions?: string[]
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posting_schedule: {
        Row: {
          active: boolean
          created_at: string
          day_of_week: number
          id: string
          platform: string
          time_of_day: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          day_of_week: number
          id?: string
          platform?: string
          time_of_day: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          day_of_week?: number
          id?: string
          platform?: string
          time_of_day?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          body: string
          created_at: string
          district_name: string | null
          district_slug: string | null
          id: string
          name: string
          rating: number
          service_slug: string | null
          status: string
          updated_at: string
        }
        Insert: {
          body: string
          created_at?: string
          district_name?: string | null
          district_slug?: string | null
          id?: string
          name: string
          rating?: number
          service_slug?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          district_name?: string | null
          district_slug?: string | null
          id?: string
          name?: string
          rating?: number
          service_slug?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_writer_jobs: {
        Row: {
          competitor_db: Json | null
          created_at: string
          created_by: string
          draft: Json | null
          entity_db: Json | null
          error: string | null
          final: Json | null
          id: string
          input_type: string
          input_value: string
          knowledge_base: Json | null
          language: string
          outline: Json | null
          progress_log: Json
          published_slug: string | null
          qa_report: Json | null
          research_db: Json | null
          scores: Json | null
          seo_db: Json | null
          serp_db: Json | null
          statistics_db: Json | null
          status: string
          topic_analysis: Json | null
          updated_at: string
          writing_notes: Json | null
        }
        Insert: {
          competitor_db?: Json | null
          created_at?: string
          created_by?: string
          draft?: Json | null
          entity_db?: Json | null
          error?: string | null
          final?: Json | null
          id?: string
          input_type?: string
          input_value: string
          knowledge_base?: Json | null
          language?: string
          outline?: Json | null
          progress_log?: Json
          published_slug?: string | null
          qa_report?: Json | null
          research_db?: Json | null
          scores?: Json | null
          seo_db?: Json | null
          serp_db?: Json | null
          statistics_db?: Json | null
          status?: string
          topic_analysis?: Json | null
          updated_at?: string
          writing_notes?: Json | null
        }
        Update: {
          competitor_db?: Json | null
          created_at?: string
          created_by?: string
          draft?: Json | null
          entity_db?: Json | null
          error?: string | null
          final?: Json | null
          id?: string
          input_type?: string
          input_value?: string
          knowledge_base?: Json | null
          language?: string
          outline?: Json | null
          progress_log?: Json
          published_slug?: string | null
          qa_report?: Json | null
          research_db?: Json | null
          scores?: Json | null
          seo_db?: Json | null
          serp_db?: Json | null
          statistics_db?: Json | null
          status?: string
          topic_analysis?: Json | null
          updated_at?: string
          writing_notes?: Json | null
        }
        Relationships: []
      }
      social_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          level: string
          message: string
          post_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          level?: string
          message?: string
          post_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          level?: string
          message?: string
          post_id?: string | null
        }
        Relationships: []
      }
      social_posts: {
        Row: {
          analytics: Json
          batch_id: string | null
          campaign_id: string | null
          caption: string
          created_at: string
          error: string | null
          fb_post_id: string | null
          hashtags: string | null
          id: string
          idea: string | null
          ig_post_id: string | null
          image_path: string | null
          image_url: string | null
          media_paths: string[]
          media_type: string
          platform: string
          platform_variants: Json
          posted_at: string | null
          retry_count: number
          review_note: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          scheduled_for: string | null
          status: string
          updated_at: string
          variant_group: string | null
          voice_profile_id: string | null
        }
        Insert: {
          analytics?: Json
          batch_id?: string | null
          campaign_id?: string | null
          caption?: string
          created_at?: string
          error?: string | null
          fb_post_id?: string | null
          hashtags?: string | null
          id?: string
          idea?: string | null
          ig_post_id?: string | null
          image_path?: string | null
          image_url?: string | null
          media_paths?: string[]
          media_type?: string
          platform?: string
          platform_variants?: Json
          posted_at?: string | null
          retry_count?: number
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scheduled_for?: string | null
          status?: string
          updated_at?: string
          variant_group?: string | null
          voice_profile_id?: string | null
        }
        Update: {
          analytics?: Json
          batch_id?: string | null
          campaign_id?: string | null
          caption?: string
          created_at?: string
          error?: string | null
          fb_post_id?: string | null
          hashtags?: string | null
          id?: string
          idea?: string | null
          ig_post_id?: string | null
          image_path?: string | null
          image_url?: string | null
          media_paths?: string[]
          media_type?: string
          platform?: string
          platform_variants?: Json
          posted_at?: string | null
          retry_count?: number
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scheduled_for?: string | null
          status?: string
          updated_at?: string
          variant_group?: string | null
          voice_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_posts_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_posts_voice_profile_id_fkey"
            columns: ["voice_profile_id"]
            isOneToOne: false
            referencedRelation: "voice_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      studio_notifications: {
        Row: {
          body: string | null
          created_at: string
          entity_id: string | null
          id: string
          read: boolean
          section: string | null
          title: string
          type: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          entity_id?: string | null
          id?: string
          read?: boolean
          section?: string | null
          title: string
          type?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          entity_id?: string | null
          id?: string
          read?: boolean
          section?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      tracked_links: {
        Row: {
          clicks: number
          code: string
          created_at: string
          destination_url: string
          id: string
          last_clicked_at: string | null
          name: string
          platform: string
          post_id: string | null
          target_url: string
          updated_at: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          clicks?: number
          code: string
          created_at?: string
          destination_url: string
          id?: string
          last_clicked_at?: string | null
          name: string
          platform?: string
          post_id?: string | null
          target_url: string
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          clicks?: number
          code?: string
          created_at?: string
          destination_url?: string
          id?: string
          last_clicked_at?: string | null
          name?: string
          platform?: string
          post_id?: string | null
          target_url?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tracked_links_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      trend_signals: {
        Row: {
          ai_generated: boolean
          category: string
          created_at: string
          id: string
          keywords: string[]
          platform: string
          score: number
          sentiment: string
          source: string | null
          status: string
          suggested_angle: string | null
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean
          category?: string
          created_at?: string
          id?: string
          keywords?: string[]
          platform?: string
          score?: number
          sentiment?: string
          source?: string | null
          status?: string
          suggested_angle?: string | null
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean
          category?: string
          created_at?: string
          id?: string
          keywords?: string[]
          platform?: string
          score?: number
          sentiment?: string
          source?: string | null
          status?: string
          suggested_angle?: string | null
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      voice_profiles: {
        Row: {
          active: boolean
          created_at: string
          cta_style: string | null
          description: string | null
          do_rules: string | null
          dont_rules: string | null
          emoji_level: string
          id: string
          is_default: boolean
          language: string
          name: string
          sample_phrases: string | null
          tone: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          cta_style?: string | null
          description?: string | null
          do_rules?: string | null
          dont_rules?: string | null
          emoji_level?: string
          id?: string
          is_default?: boolean
          language?: string
          name: string
          sample_phrases?: string | null
          tone?: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          cta_style?: string | null
          description?: string | null
          do_rules?: string | null
          dont_rules?: string | null
          emoji_level?: string
          id?: string
          is_default?: boolean
          language?: string
          name?: string
          sample_phrases?: string | null
          tone?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      no_admin_exists: { Args: never; Returns: boolean }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
      register_link_click: {
        Args: { _code: string; _referrer?: string; _user_agent?: string }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin"
      lead_status: "new" | "contacted" | "completed" | "cancelled"
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
    Enums: {
      app_role: ["admin"],
      lead_status: ["new", "contacted", "completed", "cancelled"],
    },
  },
} as const
