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
          username: string
          email: string
          full_name: string | null
          avatar_url: string | null
          is_public: boolean
          created_at: string
          updated_at: string
          experience_level: 'beginner' | 'intermediate' | 'advanced'
          learning_goals: string[] | null
          bio: string | null
          location: string | null
          website_url: string | null
          email_notifications: boolean
          progress_public: boolean
          achievements_public: boolean
          onboarding_completed: boolean
          skills_assessed: boolean
        }
        Insert: {
          id: string
          username: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
          experience_level?: 'beginner' | 'intermediate' | 'advanced'
          learning_goals?: string[] | null
          bio?: string | null
          location?: string | null
          website_url?: string | null
          email_notifications?: boolean
          progress_public?: boolean
          achievements_public?: boolean
          onboarding_completed?: boolean
          skills_assessed?: boolean
        }
        Update: {
          id?: string
          username?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
          experience_level?: 'beginner' | 'intermediate' | 'advanced'
          learning_goals?: string[] | null
          bio?: string | null
          location?: string | null
          website_url?: string | null
          email_notifications?: boolean
          progress_public?: boolean
          achievements_public?: boolean
          onboarding_completed?: boolean
          skills_assessed?: boolean
        }
        Relationships: []
      }
      skill_assessments: {
        Row: {
          id: string
          user_id: string
          assessment_type: string
          eq_knowledge_score: number | null
          compression_knowledge_score: number | null
          mixing_knowledge_score: number | null
          mastering_knowledge_score: number | null
          overall_level: 'beginner' | 'intermediate' | 'advanced' | null
          recommended_path: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          assessment_type: string
          eq_knowledge_score?: number | null
          compression_knowledge_score?: number | null
          mixing_knowledge_score?: number | null
          mastering_knowledge_score?: number | null
          overall_level?: 'beginner' | 'intermediate' | 'advanced' | null
          recommended_path?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          assessment_type?: string
          eq_knowledge_score?: number | null
          compression_knowledge_score?: number | null
          mixing_knowledge_score?: number | null
          mastering_knowledge_score?: number | null
          overall_level?: 'beginner' | 'intermediate' | 'advanced' | null
          recommended_path?: string[] | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_assessments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      game_sessions: {
        Row: {
          id: string
          user_id: string
          game_type: string
          score: number
          max_score: number | null
          time_spent_seconds: number | null
          difficulty_level: string | null
          game_data: Json | null
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          game_type: string
          score: number
          max_score?: number | null
          time_spent_seconds?: number | null
          difficulty_level?: string | null
          game_data?: Json | null
          completed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          game_type?: string
          score?: number
          max_score?: number | null
          time_spent_seconds?: number | null
          difficulty_level?: string | null
          game_data?: Json | null
          completed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      achievements: {
        Row: {
          id: string
          code: string
          name: string
          description: string
          icon_url: string | null
          category: string
          difficulty: 'bronze' | 'silver' | 'gold' | 'platinum'
          points: number | null
          unlock_conditions: Json
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          description: string
          icon_url?: string | null
          category: string
          difficulty?: 'bronze' | 'silver' | 'gold' | 'platinum'
          points?: number | null
          unlock_conditions: Json
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          description?: string
          icon_url?: string | null
          category?: string
          difficulty?: 'bronze' | 'silver' | 'gold' | 'platinum'
          points?: number | null
          unlock_conditions?: Json
          created_at?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          unlocked_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          unlocked_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          unlocked_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          }
        ]
      }
      learning_paths: {
        Row: {
          id: string
          name: string
          description: string
          difficulty_level: 'beginner' | 'intermediate' | 'advanced'
          estimated_duration_hours: number | null
          steps: Json
          prerequisites: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          difficulty_level: 'beginner' | 'intermediate' | 'advanced'
          estimated_duration_hours?: number | null
          steps: Json
          prerequisites?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
          estimated_duration_hours?: number | null
          steps?: Json
          prerequisites?: string[] | null
          created_at?: string
        }
        Relationships: []
      }
      user_learning_progress: {
        Row: {
          id: string
          user_id: string
          learning_path_id: string
          current_step: number | null
          completed_steps: number[] | null
          started_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          learning_path_id: string
          current_step?: number | null
          completed_steps?: number[] | null
          started_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          learning_path_id?: string
          current_step?: number | null
          completed_steps?: number[] | null
          started_at?: string
          completed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_learning_progress_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_learning_progress_learning_path_id_fkey"
            columns: ["learning_path_id"]
            referencedRelation: "learning_paths"
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
