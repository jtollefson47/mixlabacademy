import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Database } from '@/lib/types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type GameSession = Database['public']['Tables']['game_sessions']['Row'];
type Achievement = Database['public']['Tables']['achievements']['Row'];

interface UserState {
  // Profile data
  profile: Profile | null;
  
  // Game progress
  gameHistory: GameSession[];
  currentGameSession: Partial<GameSession> | null;
  
  // Achievements
  achievements: Achievement[];
  unlockedAchievements: string[];
  
  // UI state
  isOnboarding: boolean;
  showOnboardingModal: boolean;
  
  // Actions
  setProfile: (profile: Profile | null) => void;
  updateProfile: (updates: Partial<Profile>) => void;
  setGameHistory: (history: GameSession[]) => void;
  addGameSession: (session: GameSession) => void;
  setCurrentGameSession: (session: Partial<GameSession> | null) => void;
  setAchievements: (achievements: Achievement[]) => void;
  unlockAchievement: (achievementId: string) => void;
  setOnboarding: (isOnboarding: boolean) => void;
  setShowOnboardingModal: (show: boolean) => void;
  
  // Computed getters
  getRecentGames: (gameType?: string, limit?: number) => GameSession[];
  getBestScore: (gameType: string) => number | null;
  getAverageScore: (gameType: string) => number | null;
  getTotalPlayTime: () => number;
  getAchievementsByCategory: (category: string) => Achievement[];
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      profile: null,
      gameHistory: [],
      currentGameSession: null,
      achievements: [],
      unlockedAchievements: [],
      isOnboarding: false,
      showOnboardingModal: false,

      // Actions
      setProfile: (profile) => set({ profile }),
      
      updateProfile: (updates) => 
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null
        })),

      setGameHistory: (history) => set({ gameHistory: history }),
      
      addGameSession: (session) =>
        set((state) => ({
          gameHistory: [session, ...state.gameHistory]
        })),

      setCurrentGameSession: (session) => set({ currentGameSession: session }),

      setAchievements: (achievements) => set({ achievements }),

      unlockAchievement: (achievementId) =>
        set((state) => ({
          unlockedAchievements: state.unlockedAchievements.includes(achievementId)
            ? state.unlockedAchievements
            : [...state.unlockedAchievements, achievementId]
        })),

      setOnboarding: (isOnboarding) => set({ isOnboarding }),
      
      setShowOnboardingModal: (show) => set({ showOnboardingModal: show }),

      // Computed getters
      getRecentGames: (gameType?: string, limit = 10) => {
        const { gameHistory } = get();
        let filtered = gameHistory;
        
        if (gameType) {
          filtered = gameHistory.filter(session => session.game_type === gameType);
        }
        
        return filtered
          .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
          .slice(0, limit);
      },

      getBestScore: (gameType: string) => {
        const { gameHistory } = get();
        const gameSessions = gameHistory.filter(session => session.game_type === gameType);
        
        if (gameSessions.length === 0) return null;
        
        return Math.max(...gameSessions.map(session => session.score));
      },

      getAverageScore: (gameType: string) => {
        const { gameHistory } = get();
        const gameSessions = gameHistory.filter(session => session.game_type === gameType);
        
        if (gameSessions.length === 0) return null;
        
        const totalScore = gameSessions.reduce((sum, session) => sum + session.score, 0);
        return Math.round(totalScore / gameSessions.length);
      },

      getTotalPlayTime: () => {
        const { gameHistory } = get();
        return gameHistory.reduce((total, session) => {
          return total + (session.time_spent_seconds || 0);
        }, 0);
      },

      getAchievementsByCategory: (category: string) => {
        const { achievements } = get();
        return achievements.filter(achievement => achievement.category === category);
      },
    }),
    {
      name: 'audio-learning-user-store',
      partialize: (state) => ({
        // Only persist essential data
        profile: state.profile,
        unlockedAchievements: state.unlockedAchievements,
        isOnboarding: state.isOnboarding,
      }),
    }
  )
);
