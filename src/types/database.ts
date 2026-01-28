export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          line_channel_token: string | null
          shop_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          line_channel_token?: string | null
          shop_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          line_channel_token?: string | null
          shop_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      customers: {
        Row: {
          id: string
          profile_id: string
          line_user_id: string
          display_name: string | null
          last_visit_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          line_user_id: string
          display_name?: string | null
          last_visit_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          line_user_id?: string
          display_name?: string | null
          last_visit_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      visits: {
        Row: {
          id: string
          customer_id: string
          visit_date: string
          photo_url: string | null
          menu_tags: string[] | null
          reminder_sent: boolean | null
          reminder_scheduled_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          visit_date: string
          photo_url?: string | null
          menu_tags?: string[] | null
          reminder_sent?: boolean | null
          reminder_scheduled_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          visit_date?: string
          photo_url?: string | null
          menu_tags?: string[] | null
          reminder_sent?: boolean | null
          reminder_scheduled_at?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "visits_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "customers"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
