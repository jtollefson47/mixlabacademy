-- Users and Authentication Tables

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Audio engineering profile
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  learning_goals TEXT[],
  bio TEXT,
  location TEXT,
  website_url TEXT,
  
  -- Settings
  email_notifications BOOLEAN DEFAULT true,
  progress_public BOOLEAN DEFAULT false,
  achievements_public BOOLEAN DEFAULT false,
  
  -- Onboarding status
  onboarding_completed BOOLEAN DEFAULT false,
  skills_assessed BOOLEAN DEFAULT false,
  
  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30),
  CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_-]+$'),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
  CONSTRAINT valid_website_url CHECK (
    website_url IS NULL OR 
    website_url ~* '^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(/\S*)?$'
  )
);

-- Optimized indexes for profiles table
CREATE INDEX idx_profiles_username_lower ON public.profiles 
USING btree (LOWER(username) COLLATE "default");
CREATE INDEX idx_profiles_email_lower ON public.profiles 
USING btree (LOWER(email) COLLATE "default");
CREATE INDEX idx_profiles_experience_level ON public.profiles(experience_level);
CREATE INDEX idx_profiles_public_created ON public.profiles(is_public, created_at DESC) WHERE is_public = true;
CREATE INDEX idx_profiles_onboarding_status ON public.profiles(onboarding_completed, skills_assessed);

-- Create skill assessments table
CREATE TABLE public.skill_assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  assessment_type TEXT NOT NULL, -- 'onboarding', 'periodic_review', etc.
  
  -- Assessment results
  eq_knowledge_score INTEGER CHECK (eq_knowledge_score >= 0 AND eq_knowledge_score <= 100),
  compression_knowledge_score INTEGER CHECK (compression_knowledge_score >= 0 AND compression_knowledge_score <= 100),
  mixing_knowledge_score INTEGER CHECK (mixing_knowledge_score >= 0 AND mixing_knowledge_score <= 100),
  mastering_knowledge_score INTEGER CHECK (mastering_knowledge_score >= 0 AND mastering_knowledge_score <= 100),
  
  -- Overall assessment
  overall_level TEXT CHECK (overall_level IN ('beginner', 'intermediate', 'advanced')),
  recommended_path TEXT[],
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  UNIQUE(user_id, assessment_type)
);

-- Optimized indexes for skill assessments
CREATE INDEX idx_skill_assessments_user_type ON public.skill_assessments(user_id, assessment_type);
CREATE INDEX idx_skill_assessments_level ON public.skill_assessments(overall_level);
CREATE INDEX idx_skill_assessments_created ON public.skill_assessments(created_at DESC);

-- Create game sessions table
CREATE TABLE public.game_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  game_type TEXT NOT NULL, -- 'eq-match', 'compression-game', etc.
  
  -- Session data
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  max_score INTEGER DEFAULT 100,
  time_spent_seconds INTEGER CHECK (time_spent_seconds >= 0),
  difficulty_level TEXT DEFAULT 'normal' CHECK (difficulty_level IN ('easy', 'normal', 'hard', 'expert')),
  
  -- Game-specific data (JSON)
  game_data JSONB,
  
  -- Tracking
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optimized indexes for game sessions
CREATE INDEX idx_game_sessions_user_game_date ON public.game_sessions(user_id, game_type, completed_at DESC);
CREATE INDEX idx_game_sessions_user_date ON public.game_sessions(user_id, completed_at DESC);
CREATE INDEX idx_game_sessions_game_score ON public.game_sessions(game_type, score DESC);
CREATE INDEX idx_game_sessions_high_scores ON public.game_sessions(game_type, score DESC, completed_at DESC) WHERE score >= 90;
CREATE INDEX idx_game_sessions_recent ON public.game_sessions(completed_at DESC);

-- JSONB indexes for game_data queries
CREATE INDEX idx_game_sessions_game_data_gin ON public.game_sessions USING GIN (game_data);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL, -- 'first_perfect_eq', 'eq_master', etc.
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  category TEXT NOT NULL, -- 'eq', 'compression', 'mixing', etc.
  difficulty TEXT CHECK (difficulty IN ('bronze', 'silver', 'gold', 'platinum')) DEFAULT 'bronze',
  points INTEGER DEFAULT 0 CHECK (points >= 0),
  
  -- Unlock conditions (JSON)
  unlock_conditions JSONB NOT NULL,
  
  -- Achievement status
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optimized indexes for achievements
CREATE INDEX idx_achievements_category_difficulty ON public.achievements(category, difficulty);
CREATE INDEX idx_achievements_active_category ON public.achievements(is_active, category) WHERE is_active = true;
CREATE INDEX idx_achievements_points ON public.achievements(points DESC);
CREATE INDEX idx_achievements_unlock_conditions_gin ON public.achievements USING GIN (unlock_conditions);

-- Create user achievements junction table
CREATE TABLE public.user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  UNIQUE(user_id, achievement_id)
);

-- Optimized indexes for user achievements
CREATE INDEX idx_user_achievements_user_unlocked ON public.user_achievements(user_id, unlocked_at DESC);
CREATE INDEX idx_user_achievements_achievement_unlocked ON public.user_achievements(achievement_id, unlocked_at DESC);
CREATE INDEX idx_user_achievements_recent ON public.user_achievements(unlocked_at DESC);

-- Create learning paths table
CREATE TABLE public.learning_paths (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')) NOT NULL,
  estimated_duration_hours INTEGER CHECK (estimated_duration_hours > 0),
  
  -- Path structure (JSON array of steps)
  steps JSONB NOT NULL,
  
  -- Prerequisites
  prerequisites TEXT[],
  
  -- Path status
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optimized indexes for learning paths
CREATE INDEX idx_learning_paths_difficulty_order ON public.learning_paths(difficulty_level, sort_order);
CREATE INDEX idx_learning_paths_active_difficulty ON public.learning_paths(is_active, difficulty_level) WHERE is_active = true;
CREATE INDEX idx_learning_paths_steps_gin ON public.learning_paths USING GIN (steps);

-- Create user learning path progress table
CREATE TABLE public.user_learning_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  learning_path_id UUID REFERENCES public.learning_paths(id) ON DELETE CASCADE NOT NULL,
  
  -- Progress tracking
  current_step INTEGER DEFAULT 0 CHECK (current_step >= 0),
  completed_steps INTEGER[] DEFAULT '{}',
  completion_percentage NUMERIC(5,2) DEFAULT 0.00 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  
  started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  UNIQUE(user_id, learning_path_id)
);

-- Optimized indexes for user learning progress
CREATE INDEX idx_user_learning_progress_user_active ON public.user_learning_progress(user_id, last_accessed_at DESC) WHERE completed_at IS NULL;
CREATE INDEX idx_user_learning_progress_path_completion ON public.user_learning_progress(learning_path_id, completion_percentage DESC);
CREATE INDEX idx_user_learning_progress_completed ON public.user_learning_progress(completed_at DESC) WHERE completed_at IS NOT NULL;

-- Create RLS (Row Level Security) policies

-- Profiles policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view public profiles or own profile" ON public.profiles
  FOR SELECT USING (
    is_public = true OR 
    auth.uid() = id
  );

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND id = auth.uid()); -- Double check for security

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Skill assessments policies
ALTER TABLE public.skill_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own assessments" ON public.skill_assessments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessments" ON public.skill_assessments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assessments" ON public.skill_assessments
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Game sessions policies
ALTER TABLE public.game_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own game sessions" ON public.game_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own game sessions" ON public.game_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Achievements policies (public read, admin write)
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active achievements" ON public.achievements
  FOR SELECT USING (is_active = true);

CREATE POLICY "Only authenticated users can view all achievements" ON public.achievements
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- User achievements policies
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements or public achievements" ON public.user_achievements
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = user_achievements.user_id AND achievements_public = true
    )
  );

CREATE POLICY "Users can insert own achievements" ON public.user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Learning paths policies (public read for active paths)
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active learning paths" ON public.learning_paths
  FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can view all learning paths" ON public.learning_paths
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- User learning progress policies
ALTER TABLE public.user_learning_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress" ON public.user_learning_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON public.user_learning_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON public.user_learning_progress
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create function to update progress percentage
CREATE OR REPLACE FUNCTION public.update_progress_percentage()
RETURNS TRIGGER AS $$
DECLARE
  total_steps INTEGER;
  completed_count INTEGER;
BEGIN
  -- Get total number of steps from the learning path
  SELECT jsonb_array_length(steps) INTO total_steps
  FROM public.learning_paths 
  WHERE id = NEW.learning_path_id;
  
  -- Count completed steps
  completed_count := array_length(NEW.completed_steps, 1);
  
  -- Calculate percentage
  IF total_steps > 0 THEN
    NEW.completion_percentage := ROUND((completed_count::NUMERIC / total_steps::NUMERIC) * 100, 2);
  ELSE
    NEW.completion_percentage := 0;
  END IF;
  
  -- Update last_accessed_at
  NEW.last_accessed_at := timezone('utc'::text, now());
  
  -- Set completed_at if 100% complete
  IF NEW.completion_percentage = 100 AND OLD.completed_at IS NULL THEN
    NEW.completed_at := timezone('utc'::text, now());
  END IF;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Create trigger for progress percentage calculation
CREATE TRIGGER update_progress_percentage_trigger
  BEFORE INSERT OR UPDATE ON public.user_learning_progress
  FOR EACH ROW EXECUTE PROCEDURE public.update_progress_percentage();

-- Create optimized function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  base_username TEXT;
  final_username TEXT;
  username_counter INTEGER := 0;
BEGIN
  -- Extract base username from email
  base_username := COALESCE(
    NEW.raw_user_meta_data->>'username',
    split_part(NEW.email, '@', 1)
  );
  
  -- Clean username (remove special chars, limit length)
  base_username := REGEXP_REPLACE(LOWER(base_username), '[^a-z0-9_-]', '', 'g');
  base_username := LEFT(base_username, 25); -- Leave room for counter
  
  -- Ensure minimum length
  IF LENGTH(base_username) < 3 THEN
    base_username := 'user_' || LEFT(base_username, 20);
  END IF;
  
  final_username := base_username;
  
  -- Find unique username
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = final_username) LOOP
    username_counter := username_counter + 1;
    final_username := base_username || '_' || username_counter;
  END LOOP;
  
  -- Insert profile with generated username
  INSERT INTO public.profiles (id, username, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    final_username,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error and continue
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ language 'plpgsql' security definer;

-- Create helper function for leaderboards
CREATE OR REPLACE FUNCTION public.get_game_leaderboard(
  game_type_param TEXT,
  limit_param INTEGER DEFAULT 10
)
RETURNS TABLE (
  user_id UUID,
  username TEXT,
  best_score INTEGER,
  total_games INTEGER,
  avg_score NUMERIC,
  last_played TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    gs.user_id,
    p.username,
    MAX(gs.score) as best_score,
    COUNT(*)::INTEGER as total_games,
    ROUND(AVG(gs.score), 2) as avg_score,
    MAX(gs.completed_at) as last_played
  FROM public.game_sessions gs
  JOIN public.profiles p ON gs.user_id = p.id
  WHERE gs.game_type = game_type_param
    AND p.is_public = true
  GROUP BY gs.user_id, p.username
  ORDER BY best_score DESC, avg_score DESC
  LIMIT limit_param;
END;
$$ language 'plpgsql' security definer;

-- Create function to get user statistics
CREATE OR REPLACE FUNCTION public.get_user_stats(user_id_param UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_games', COALESCE(total_games, 0),
    'average_score', COALESCE(avg_score, 0),
    'best_score', COALESCE(best_score, 0),
    'total_achievements', COALESCE(total_achievements, 0),
    'learning_paths_completed', COALESCE(paths_completed, 0),
    'total_points', COALESCE(total_points, 0)
  ) INTO result
  FROM (
    SELECT 
      (SELECT COUNT(*) FROM public.game_sessions WHERE user_id = user_id_param) as total_games,
      (SELECT ROUND(AVG(score), 2) FROM public.game_sessions WHERE user_id = user_id_param) as avg_score,
      (SELECT MAX(score) FROM public.game_sessions WHERE user_id = user_id_param) as best_score,
      (SELECT COUNT(*) FROM public.user_achievements WHERE user_id = user_id_param) as total_achievements,
      (SELECT COUNT(*) FROM public.user_learning_progress WHERE user_id = user_id_param AND completed_at IS NOT NULL) as paths_completed,
      (SELECT COALESCE(SUM(a.points), 0) FROM public.user_achievements ua JOIN public.achievements a ON ua.achievement_id = a.id WHERE ua.user_id = user_id_param) as total_points
  ) stats;
  
  RETURN result;
END;
$$ language 'plpgsql' security definer;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert some default achievements
INSERT INTO public.achievements (code, name, description, category, difficulty, points, unlock_conditions, is_active) VALUES
-- EQ Category
('first_eq_game', 'EQ Explorer', 'Complete your first EQ matching game', 'eq', 'bronze', 10, '{"game_type": "eq-match", "sessions_completed": 1}', true),
('perfect_eq_score', 'Perfect Pitch', 'Score 100% on an EQ matching game', 'eq', 'silver', 50, '{"game_type": "eq-match", "perfect_scores": 1}', true),
('eq_consistency', 'Consistent EQ Master', 'Score 90% or higher on 5 consecutive EQ games', 'eq', 'gold', 100, '{"game_type": "eq-match", "consecutive_high_scores": 5, "min_score": 90}', true),
('eq_speed_demon', 'Speed Demon', 'Complete an EQ game in under 30 seconds with 80%+ score', 'eq', 'silver', 75, '{"game_type": "eq-match", "max_time": 30, "min_score": 80}', true),

-- General Category
('quick_learner', 'Quick Learner', 'Complete onboarding and first assessment', 'general', 'bronze', 25, '{"onboarding_completed": true, "skills_assessed": true}', true),
('dedicated_student', 'Dedicated Student', 'Play games for 5 consecutive days', 'general', 'silver', 100, '{"consecutive_days": 5}', true),
('high_achiever', 'High Achiever', 'Earn 500 total points', 'general', 'gold', 150, '{"total_points": 500}', true),

-- Social Category
('social_butterfly', 'Social Butterfly', 'Make your profile public', 'social', 'bronze', 15, '{"profile_public": true}', true),
('mentor', 'Mentor', 'Help 10 other users by sharing achievements', 'social', 'gold', 200, '{"achievements_shared": 10}', true),

-- Progression Category
('path_starter', 'Path Starter', 'Begin your first learning path', 'progression', 'bronze', 20, '{"learning_paths_started": 1}', true),
('path_completer', 'Path Completer', 'Complete your first learning path', 'progression', 'silver', 100, '{"learning_paths_completed": 1}', true),
('knowledge_seeker', 'Knowledge Seeker', 'Complete 3 different learning paths', 'progression', 'gold', 300, '{"learning_paths_completed": 3}', true);

-- Insert default learning paths with better organization
INSERT INTO public.learning_paths (name, description, difficulty_level, estimated_duration_hours, steps, prerequisites, is_active, sort_order) VALUES
('EQ Fundamentals', 'Master the basics of equalization in audio production', 'beginner', 8, 
'[
  {"type": "lesson", "title": "What is EQ?", "content": "eq-basics", "duration_minutes": 15},
  {"type": "interactive", "title": "EQ Frequency Chart", "content": "eq-frequency-chart", "duration_minutes": 10},
  {"type": "game", "title": "EQ Frequency Recognition", "game": "eq-match", "target_score": 70, "duration_minutes": 20},
  {"type": "lesson", "title": "EQ Types and Uses", "content": "eq-types", "duration_minutes": 20},
  {"type": "game", "title": "EQ Problem Solving", "game": "eq-match", "target_score": 85, "duration_minutes": 25},
  {"type": "assessment", "title": "EQ Knowledge Check", "assessment": "eq-fundamentals", "duration_minutes": 15}
]', 
'{}', true, 1),

('Compression Basics', 'Learn the fundamentals of dynamic range compression', 'beginner', 6,
'[
  {"type": "lesson", "title": "Understanding Compression", "content": "compression-basics", "duration_minutes": 20},
  {"type": "interactive", "title": "Attack and Release Demo", "content": "compression-demo", "duration_minutes": 15},
  {"type": "game", "title": "Compression Detection", "game": "compression-match", "target_score": 75, "duration_minutes": 20},
  {"type": "lesson", "title": "Compression Types", "content": "compression-types", "duration_minutes": 15},
  {"type": "assessment", "title": "Compression Knowledge Check", "assessment": "compression-fundamentals", "duration_minutes": 10}
]',
'{}', true, 2),

('Mixing Foundations', 'Essential mixing techniques and workflows', 'intermediate', 12,
'[
  {"type": "lesson", "title": "Mixing Philosophy", "content": "mixing-basics", "duration_minutes": 25},
  {"type": "lesson", "title": "Level Balancing", "content": "level-balancing", "duration_minutes": 30},
  {"type": "game", "title": "Balance Challenge", "game": "balance-game", "target_score": 80, "duration_minutes": 30},
  {"type": "lesson", "title": "Panning and Stereo Image", "content": "panning-stereo", "duration_minutes": 20},
  {"type": "lesson", "title": "EQ in Context", "content": "eq-mixing", "duration_minutes": 25},
  {"type": "game", "title": "Mix EQ Challenge", "game": "eq-match", "target_score": 85, "duration_minutes": 35},
  {"type": "assessment", "title": "Mixing Fundamentals Test", "assessment": "mixing-fundamentals", "duration_minutes": 20}
]',
'{"EQ Fundamentals", "Compression Basics"}', true, 3),

('Advanced EQ Techniques', 'Professional EQ strategies and advanced concepts', 'advanced', 10,
'[
  {"type": "lesson", "title": "Surgical EQ", "content": "surgical-eq", "duration_minutes": 30},
  {"type": "lesson", "title": "Musical EQ", "content": "musical-eq", "duration_minutes": 25},
  {"type": "interactive", "title": "EQ Curve Analysis", "content": "eq-curve-analysis", "duration_minutes": 20},
  {"type": "game", "title": "Complex EQ Scenarios", "game": "eq-match", "target_score": 95, "duration_minutes": 40},
  {"type": "lesson", "title": "EQ Automation", "content": "eq-automation", "duration_minutes": 20},
  {"type": "game", "title": "Advanced EQ Challenge", "game": "eq-advanced", "target_score": 90, "duration_minutes": 45},
  {"type": "assessment", "title": "Advanced EQ Mastery", "assessment": "eq-advanced", "duration_minutes": 20}
]',
'{"EQ Fundamentals", "Mixing Foundations"}', true, 4),

('Mastering Fundamentals', 'Introduction to audio mastering concepts', 'advanced', 14,
'[
  {"type": "lesson", "title": "What is Mastering?", "content": "mastering-intro", "duration_minutes": 20},
  {"type": "lesson", "title": "Mastering Chain", "content": "mastering-chain", "duration_minutes": 30},
  {"type": "lesson", "title": "Loudness and Dynamics", "content": "loudness-dynamics", "duration_minutes": 25},
  {"type": "interactive", "title": "LUFS Measurement", "content": "lufs-demo", "duration_minutes": 15},
  {"type": "lesson", "title": "Stereo Enhancement", "content": "stereo-enhancement", "duration_minutes": 20},
  {"type": "game", "title": "Mastering Challenge", "game": "mastering-game", "target_score": 85, "duration_minutes": 50},
  {"type": "assessment", "title": "Mastering Knowledge Test", "assessment": "mastering-fundamentals", "duration_minutes": 20}
]',
'{"Mixing Foundations", "Advanced EQ Techniques"}', true, 5);

-- User Following System
CREATE TABLE public.user_follows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Indexes for following system
CREATE INDEX idx_user_follows_follower ON public.user_follows(follower_id);
CREATE INDEX idx_user_follows_following ON public.user_follows(following_id);
CREATE INDEX idx_user_follows_created ON public.user_follows(created_at DESC);

-- Community Posts System
CREATE TABLE public.community_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  post_type TEXT CHECK (post_type IN ('achievement', 'progress', 'question', 'tip', 'showcase')) NOT NULL,
  metadata JSONB DEFAULT '{}',
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for community posts
CREATE INDEX idx_community_posts_user ON public.community_posts(user_id);
CREATE INDEX idx_community_posts_type_created ON public.community_posts(post_type, created_at DESC);
CREATE INDEX idx_community_posts_public_created ON public.community_posts(is_public, created_at DESC) WHERE is_public = true;

-- Post Likes System
CREATE TABLE public.post_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  UNIQUE(post_id, user_id)
);

-- Indexes for post likes
CREATE INDEX idx_post_likes_post ON public.post_likes(post_id);
CREATE INDEX idx_post_likes_user ON public.post_likes(user_id);

-- Post Comments System
CREATE TABLE public.post_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  parent_comment_id UUID REFERENCES public.post_comments(id) ON DELETE CASCADE,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for post comments
CREATE INDEX idx_post_comments_post ON public.post_comments(post_id);
CREATE INDEX idx_post_comments_user ON public.post_comments(user_id);
CREATE INDEX idx_post_comments_parent ON public.post_comments(parent_comment_id);
CREATE INDEX idx_post_comments_created ON public.post_comments(created_at DESC);

-- User Activity Feed
CREATE TABLE public.user_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT CHECK (activity_type IN ('game_completed', 'achievement_unlocked', 'level_up', 'milestone_reached', 'post_created', 'follow_user')) NOT NULL,
  activity_data JSONB NOT NULL,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for user activities
CREATE INDEX idx_user_activities_user ON public.user_activities(user_id);
CREATE INDEX idx_user_activities_type_created ON public.user_activities(activity_type, created_at DESC);
CREATE INDEX idx_user_activities_public_created ON public.user_activities(is_public, created_at DESC) WHERE is_public = true;

-- User Stats Cache (for performance)
CREATE TABLE public.user_stats (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  total_games INTEGER DEFAULT 0,
  total_playtime_seconds INTEGER DEFAULT 0,
  best_eq_score INTEGER DEFAULT 0,
  average_eq_score DECIMAL(5,2) DEFAULT 0,
  achievements_count INTEGER DEFAULT 0,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_game_date DATE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for user stats
CREATE INDEX idx_user_stats_best_score ON public.user_stats(best_eq_score DESC);
CREATE INDEX idx_user_stats_total_games ON public.user_stats(total_games DESC);
CREATE INDEX idx_user_stats_followers ON public.user_stats(followers_count DESC);
CREATE INDEX idx_user_stats_streak ON public.user_stats(current_streak DESC);

-- Enable RLS on all new tables
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Following System
CREATE POLICY "Users can view public follows" ON public.user_follows
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = user_follows.following_id 
      AND profiles.is_public = true
    ) OR 
    follower_id = auth.uid() OR 
    following_id = auth.uid()
  );

CREATE POLICY "Users can manage their own follows" ON public.user_follows
  FOR ALL USING (follower_id = auth.uid());

-- RLS Policies for Community Posts
CREATE POLICY "Users can view public posts" ON public.community_posts
  FOR SELECT USING (is_public = true OR user_id = auth.uid());

CREATE POLICY "Users can manage their own posts" ON public.community_posts
  FOR ALL USING (user_id = auth.uid());

-- RLS Policies for Post Likes
CREATE POLICY "Users can view post likes" ON public.post_likes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.community_posts 
      WHERE community_posts.id = post_likes.post_id 
      AND (community_posts.is_public = true OR community_posts.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage their own likes" ON public.post_likes
  FOR ALL USING (user_id = auth.uid());

-- RLS Policies for Post Comments
CREATE POLICY "Users can view comments on viewable posts" ON public.post_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.community_posts 
      WHERE community_posts.id = post_comments.post_id 
      AND (community_posts.is_public = true OR community_posts.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage their own comments" ON public.post_comments
  FOR ALL USING (user_id = auth.uid());

-- RLS Policies for User Activities
CREATE POLICY "Users can view public activities" ON public.user_activities
  FOR SELECT USING (
    is_public = true OR user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.user_follows 
      WHERE user_follows.following_id = user_activities.user_id 
      AND user_follows.follower_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their own activities" ON public.user_activities
  FOR ALL USING (user_id = auth.uid());

-- RLS Policies for User Stats
CREATE POLICY "Users can view public stats" ON public.user_stats
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = user_stats.user_id 
      AND profiles.is_public = true
    ) OR 
    user_id = auth.uid()
  );

CREATE POLICY "Users can manage their own stats" ON public.user_stats
  FOR ALL USING (user_id = auth.uid());

-- Functions to update stats automatically
CREATE OR REPLACE FUNCTION update_user_stats_on_game_session()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_stats (user_id, total_games, total_playtime_seconds, best_eq_score, last_game_date)
  VALUES (NEW.user_id, 1, COALESCE(NEW.time_spent_seconds, 0), NEW.score, CURRENT_DATE)
  ON CONFLICT (user_id) DO UPDATE SET
    total_games = user_stats.total_games + 1,
    total_playtime_seconds = user_stats.total_playtime_seconds + COALESCE(NEW.time_spent_seconds, 0),
    best_eq_score = GREATEST(user_stats.best_eq_score, NEW.score),
    last_game_date = CURRENT_DATE,
    updated_at = NOW();
  
  -- Update average score
  UPDATE public.user_stats 
  SET average_eq_score = (
    SELECT AVG(score)::DECIMAL(5,2) 
    FROM public.game_sessions 
    WHERE user_id = NEW.user_id AND game_type = 'eq-match'
  )
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_follow_counts()
RETURNS TRIGGER AS $$
BEGIN
  -- Update follower count
  UPDATE public.user_stats 
  SET followers_count = (
    SELECT COUNT(*) FROM public.user_follows 
    WHERE following_id = COALESCE(NEW.following_id, OLD.following_id)
  ),
  updated_at = NOW()
  WHERE user_id = COALESCE(NEW.following_id, OLD.following_id);
  
  -- Update following count
  UPDATE public.user_stats 
  SET following_count = (
    SELECT COUNT(*) FROM public.user_follows 
    WHERE follower_id = COALESCE(NEW.follower_id, OLD.follower_id)
  ),
  updated_at = NOW()
  WHERE user_id = COALESCE(NEW.follower_id, OLD.follower_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER trigger_update_user_stats_on_game_session
  AFTER INSERT ON public.game_sessions
  FOR EACH ROW EXECUTE FUNCTION update_user_stats_on_game_session();

CREATE TRIGGER trigger_update_follow_counts
  AFTER INSERT OR DELETE ON public.user_follows
  FOR EACH ROW EXECUTE FUNCTION update_follow_counts();