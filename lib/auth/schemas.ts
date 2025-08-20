import { z } from 'zod';

// User profile schemas
export const profileSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be no more than 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  email: z.string().email('Invalid email address'),
  full_name: z.string().optional(),
  bio: z.string().max(500, 'Bio must be no more than 500 characters').optional(),
  location: z.string().max(100, 'Location must be no more than 100 characters').optional(),
  website_url: z.string().url('Invalid website URL').optional().or(z.literal('')),
  experience_level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  learning_goals: z.array(z.string()).default([]),
  is_public: z.boolean().default(false),
  email_notifications: z.boolean().default(true),
  progress_public: z.boolean().default(false),
  achievements_public: z.boolean().default(false),
  onboarding_completed: z.boolean().default(false),
  skills_assessed: z.boolean().default(false),
});

export const profileUpdateSchema = profileSchema.partial().omit({ email: true });

// Onboarding schemas
export const skillAssessmentSchema = z.object({
  eq_knowledge_score: z.number().min(0).max(100).optional(),
  compression_knowledge_score: z.number().min(0).max(100).optional(),
  mixing_knowledge_score: z.number().min(0).max(100).optional(),
  mastering_knowledge_score: z.number().min(0).max(100).optional(),
  overall_level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  recommended_path: z.array(z.string()).default([]),
});

export const onboardingSchema = z.object({
  profile: profileSchema.pick({ 
    username: true, 
    experience_level: true, 
    learning_goals: true,
    is_public: true 
  }),
  assessment: skillAssessmentSchema.optional(),
});

// Game session schema
export const gameSessionSchema = z.object({
  game_type: z.string(),
  score: z.number().min(0).max(100),
  max_score: z.number().default(100),
  time_spent_seconds: z.number().optional(),
  difficulty_level: z.string().default('normal'),
  game_data: z.record(z.string(), z.unknown()).optional(),
});

// Learning goals options
export const learningGoalsOptions = [
  'eq-mastery',
  'compression-techniques',
  'mixing-fundamentals',
  'mastering-basics',
  'sound-design',
  'music-production',
  'live-sound',
  'podcast-production',
  'game-audio',
  'film-scoring'
] as const;

export const learningGoalsLabels = {
  'eq-mastery': 'EQ Mastery',
  'compression-techniques': 'Compression Techniques',
  'mixing-fundamentals': 'Mixing Fundamentals',
  'mastering-basics': 'Mastering Basics',
  'sound-design': 'Sound Design',
  'music-production': 'Music Production',
  'live-sound': 'Live Sound Engineering',
  'podcast-production': 'Podcast Production',
  'game-audio': 'Game Audio',
  'film-scoring': 'Film Scoring'
} as const;

// Types
export type Profile = z.infer<typeof profileSchema>;
export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;
export type SkillAssessment = z.infer<typeof skillAssessmentSchema>;
export type OnboardingData = z.infer<typeof onboardingSchema>;
export type GameSession = z.infer<typeof gameSessionSchema>;
export type LearningGoal = typeof learningGoalsOptions[number];
