import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});

// Type helpers
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          business_name: string | null;
          industry: string | null;
          onboarding_step: number;
          onboarding_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          business_name?: string | null;
          industry?: string | null;
          onboarding_step?: number;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          business_name?: string | null;
          industry?: string | null;
          onboarding_step?: number;
          onboarding_completed?: boolean;
          updated_at?: string;
        };
      };
      businesses: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          industry: string | null;
          website: string | null;
          description: string | null;
          address: string | null;
          phone: string | null;
          timezone: string;
          logo_url: string | null;
          settings: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          industry?: string | null;
          website?: string | null;
          description?: string | null;
          address?: string | null;
          phone?: string | null;
          timezone?: string;
          logo_url?: string | null;
          settings?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          industry?: string | null;
          website?: string | null;
          description?: string | null;
          address?: string | null;
          phone?: string | null;
          timezone?: string;
          logo_url?: string | null;
          settings?: Record<string, unknown>;
          updated_at?: string;
        };
      };
      departments: {
        Row: {
          id: string;
          business_id: string;
          type: 'support' | 'sales' | 'marketing' | 'finance' | 'operations' | 'hr';
          name: string;
          status: 'active' | 'paused' | 'training' | 'error';
          config: Record<string, unknown>;
          stats: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          type: 'support' | 'sales' | 'marketing' | 'finance' | 'operations' | 'hr';
          name?: string;
          status?: 'active' | 'paused' | 'training' | 'error';
          config?: Record<string, unknown>;
          stats?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          type?: 'support' | 'sales' | 'marketing' | 'finance' | 'operations' | 'hr';
          name?: string;
          status?: 'active' | 'paused' | 'training' | 'error';
          config?: Record<string, unknown>;
          stats?: Record<string, unknown>;
          updated_at?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          business_id: string;
          department_id: string | null;
          channel: 'email' | 'whatsapp' | 'chat' | 'phone' | 'social';
          external_id: string | null;
          customer_email: string | null;
          customer_name: string | null;
          customer_phone: string | null;
          status: 'open' | 'in_progress' | 'resolved' | 'escalated' | 'closed';
          priority: 'low' | 'normal' | 'high' | 'urgent';
          tags: string[];
          metadata: Record<string, unknown>;
          created_at: string;
          updated_at: string;
          resolved_at: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          department_id?: string | null;
          channel: 'email' | 'whatsapp' | 'chat' | 'phone' | 'social';
          external_id?: string | null;
          customer_email?: string | null;
          customer_name?: string | null;
          customer_phone?: string | null;
          status?: 'open' | 'in_progress' | 'resolved' | 'escalated' | 'closed';
          priority?: 'low' | 'normal' | 'high' | 'urgent';
          tags?: string[];
          metadata?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
          resolved_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          department_id?: string | null;
          channel?: 'email' | 'whatsapp' | 'chat' | 'phone' | 'social';
          external_id?: string | null;
          customer_email?: string | null;
          customer_name?: string | null;
          customer_phone?: string | null;
          status?: 'open' | 'in_progress' | 'resolved' | 'escalated' | 'closed';
          priority?: 'low' | 'normal' | 'high' | 'urgent';
          tags?: string[];
          metadata?: Record<string, unknown>;
          updated_at?: string;
          resolved_at?: string | null;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          role: 'customer' | 'agent' | 'system' | 'human';
          content: string;
          metadata: Record<string, unknown>;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          role: 'customer' | 'agent' | 'system' | 'human';
          content: string;
          metadata?: Record<string, unknown>;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          role?: 'customer' | 'agent' | 'system' | 'human';
          content?: string;
          metadata?: Record<string, unknown>;
        };
      };
      integrations: {
        Row: {
          id: string;
          business_id: string;
          type: string;
          provider_account_id: string | null;
          provider_email: string | null;
          access_token: string | null;
          refresh_token: string | null;
          token_expires_at: string | null;
          scopes: string[];
          config: Record<string, unknown>;
          status: 'connected' | 'disconnected' | 'error' | 'expired';
          last_sync_at: string | null;
          error_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          type: string;
          provider_account_id?: string | null;
          provider_email?: string | null;
          access_token?: string | null;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          scopes?: string[];
          config?: Record<string, unknown>;
          status?: 'connected' | 'disconnected' | 'error' | 'expired';
          last_sync_at?: string | null;
          error_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          type?: string;
          provider_account_id?: string | null;
          provider_email?: string | null;
          access_token?: string | null;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          scopes?: string[];
          config?: Record<string, unknown>;
          status?: 'connected' | 'disconnected' | 'error' | 'expired';
          last_sync_at?: string | null;
          error_message?: string | null;
          updated_at?: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          business_id: string;
          department_id: string | null;
          conversation_id: string | null;
          type: string;
          status: 'pending' | 'running' | 'completed' | 'failed' | 'retrying' | 'cancelled';
          priority: number;
          input: Record<string, unknown>;
          output: Record<string, unknown> | null;
          error: string | null;
          attempts: number;
          max_attempts: number;
          scheduled_for: string;
          started_at: string | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          department_id?: string | null;
          conversation_id?: string | null;
          type: string;
          status?: 'pending' | 'running' | 'completed' | 'failed' | 'retrying' | 'cancelled';
          priority?: number;
          input: Record<string, unknown>;
          output?: Record<string, unknown> | null;
          error?: string | null;
          attempts?: number;
          max_attempts?: number;
          scheduled_for?: string;
          started_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          department_id?: string | null;
          conversation_id?: string | null;
          type?: string;
          status?: 'pending' | 'running' | 'completed' | 'failed' | 'retrying' | 'cancelled';
          priority?: number;
          input?: Record<string, unknown>;
          output?: Record<string, unknown> | null;
          error?: string | null;
          attempts?: number;
          max_attempts?: number;
          scheduled_for?: string;
          started_at?: string | null;
          completed_at?: string | null;
          updated_at?: string;
        };
      };
      analytics_events: {
        Row: {
          id: string;
          business_id: string;
          department_id: string | null;
          event_type: string;
          metric_name: string;
          metric_value: number;
          dimensions: Record<string, unknown>;
          occurred_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          department_id?: string | null;
          event_type: string;
          metric_name: string;
          metric_value: number;
          dimensions?: Record<string, unknown>;
          occurred_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          department_id?: string | null;
          event_type?: string;
          metric_name?: string;
          metric_value?: number;
          dimensions?: Record<string, unknown>;
        };
      };
      leads: {
        Row: {
          id: string;
          business_id: string;
          department_id: string | null;
          email: string | null;
          name: string | null;
          company: string | null;
          title: string | null;
          phone: string | null;
          linkedin_url: string | null;
          source: string | null;
          status:
            | 'new'
            | 'contacted'
            | 'qualified'
            | 'meeting_booked'
            | 'proposal'
            | 'won'
            | 'lost';
          score: number;
          last_contact_at: string | null;
          next_follow_up_at: string | null;
          metadata: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          department_id?: string | null;
          email?: string | null;
          name?: string | null;
          company?: string | null;
          title?: string | null;
          phone?: string | null;
          linkedin_url?: string | null;
          source?: string | null;
          status?:
            | 'new'
            | 'contacted'
            | 'qualified'
            | 'meeting_booked'
            | 'proposal'
            | 'won'
            | 'lost';
          score?: number;
          last_contact_at?: string | null;
          next_follow_up_at?: string | null;
          metadata?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          department_id?: string | null;
          email?: string | null;
          name?: string | null;
          company?: string | null;
          title?: string | null;
          phone?: string | null;
          linkedin_url?: string | null;
          source?: string | null;
          status?:
            | 'new'
            | 'contacted'
            | 'qualified'
            | 'meeting_booked'
            | 'proposal'
            | 'won'
            | 'lost';
          score?: number;
          last_contact_at?: string | null;
          next_follow_up_at?: string | null;
          metadata?: Record<string, unknown>;
          updated_at?: string;
        };
      };
    };
  };
};
