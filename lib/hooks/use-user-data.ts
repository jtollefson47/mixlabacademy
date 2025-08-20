import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useUserStore } from '@/lib/stores/user-store';
import type { Database } from '@/lib/types';
import type { GameSession, SkillAssessment, ProfileUpdate } from '@/lib/auth/schemas';

// Profile hooks
export function useProfile() {
  const { user } = useAuth();
  const setProfile = useUserStore((state) => state.setProfile);

  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('No user session');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      setProfile(data);
      return data;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const updateProfile = useUserStore((state) => state.updateProfile);

  return useMutation({
    mutationFn: async (updates: ProfileUpdate) => {
      if (!user?.id) throw new Error('No user session');

      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      updateProfile(data);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

// Game sessions hooks
export function useGameHistory(gameType?: string) {
  const { user } = useAuth();
  const setGameHistory = useUserStore((state) => state.setGameHistory);

  return useQuery({
    queryKey: ['game-history', user?.id, gameType],
    queryFn: async () => {
      if (!user?.id) throw new Error('No user session');
      
      let query = supabase
        .from('game_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (gameType) {
        query = query.eq('game_type', gameType);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      if (!gameType) {
        setGameHistory(data);
      }
      
      return data;
    },
    enabled: !!user?.id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useCreateGameSession() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const addGameSession = useUserStore((state) => state.addGameSession);

  return useMutation({
    mutationFn: async (sessionData: GameSession) => {
      if (!user?.id) throw new Error('No user session');

      const { data, error } = await supabase
        .from('game_sessions')
        .insert({
          game_type: sessionData.game_type,
          score: sessionData.score,
          max_score: sessionData.max_score || 100,
          time_spent_seconds: sessionData.time_spent_seconds,
          difficulty_level: sessionData.difficulty_level || 'normal',
          game_data: sessionData.game_data as any, // Type assertion for JSON compatibility
          user_id: user.id,
          completed_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      addGameSession(data);
      queryClient.invalidateQueries({ queryKey: ['game-history'] });
      
      // Check for new achievements
      checkAchievements(data);
    },
  });
}

// Achievements hooks
export function useAchievements() {
  const setAchievements = useUserStore((state) => state.setAchievements);

  return useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      
      setAchievements(data);
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useUserAchievements() {
  const { user } = useAuth();
  const unlockAchievement = useUserStore((state) => state.unlockAchievement);

  return useQuery({
    queryKey: ['user-achievements', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('No user session');
      
      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievement:achievements(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      
      // Update local store
      data.forEach(userAchievement => {
        unlockAchievement(userAchievement.achievement_id);
      });
      
      return data;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Skill assessment hooks
export function useCreateSkillAssessment() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (assessment: SkillAssessment) => {
      if (!user?.id) throw new Error('No user session');

      const { data, error } = await supabase
        .from('skill_assessments')
        .insert({
          ...assessment,
          user_id: user.id,
          assessment_type: 'onboarding',
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

// Learning paths hooks
export function useLearningPaths() {
  return useQuery({
    queryKey: ['learning-paths'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_paths')
        .select('*')
        .order('difficulty_level', { ascending: true });

      if (error) throw error;
      return data;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Helper function to check for achievements
async function checkAchievements(gameSession: Database['public']['Tables']['game_sessions']['Row']) {
  // This would contain logic to check if the game session unlocks any achievements
  // For now, we'll implement basic achievement checking
  const achievements = useUserStore.getState().achievements;
  const gameHistory = useUserStore.getState().gameHistory;
  
  // Example: First game achievement
  const firstGameAchievement = achievements.find(a => a.code === 'first_eq_game');
  if (firstGameAchievement && gameSession.game_type === 'eq-match') {
    const eqGames = gameHistory.filter(s => s.game_type === 'eq-match');
    if (eqGames.length === 1) {
      // Award achievement
      await supabase
        .from('user_achievements')
        .insert({
          user_id: gameSession.user_id,
          achievement_id: firstGameAchievement.id,
        });
    }
  }

  // Example: Perfect score achievement
  const perfectScoreAchievement = achievements.find(a => a.code === 'perfect_eq_score');
  if (perfectScoreAchievement && gameSession.score === 100 && gameSession.game_type === 'eq-match') {
    await supabase
      .from('user_achievements')
      .insert({
        user_id: gameSession.user_id,
        achievement_id: perfectScoreAchievement.id,
      });
  }
}
