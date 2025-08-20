'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Search, Users, Trophy, TrendingUp, MapPin, Globe, User, Filter, Star } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';

interface CommunityProfile {
  id: string;
  username: string;
  full_name?: string | null;
  bio?: string | null;
  location?: string | null;
  website_url?: string | null;
  experience_level: 'beginner' | 'intermediate' | 'advanced';
  learning_goals: string[] | null;
  created_at: string;
  follower_count?: number;
  game_count?: number;
  best_score?: number;
}

const learningGoalsLabels: Record<string, string> = {
  'eq_mastery': 'EQ Mastery',
  'compression_techniques': 'Compression Techniques', 
  'mixing_fundamentals': 'Mixing Fundamentals',
  'mastering_basics': 'Mastering Basics',
  'sound_design': 'Sound Design',
  'recording_techniques': 'Recording Techniques'
};

const experienceLevelLabels = {
  'beginner': 'Beginner',
  'intermediate': 'Intermediate', 
  'advanced': 'Advanced'
};

export default function CommunityPage() {
  const [profiles, setProfiles] = useState<CommunityProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExperience, setSelectedExperience] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'search' | 'leaderboard' | 'recent'>('search');

  useEffect(() => {
    fetchCommunityProfiles();
  }, [view, selectedExperience, selectedGoals]);

  const fetchCommunityProfiles = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('profiles')
        .select(`
          id, username, full_name, bio, location, website_url, 
          experience_level, learning_goals, created_at
        `)
        .eq('is_public', true)
        .order(view === 'recent' ? 'created_at' : 'username', { ascending: view !== 'recent' });

      if (selectedExperience !== 'all') {
        query = query.eq('experience_level', selectedExperience);
      }

      if (selectedGoals.length > 0) {
        query = query.contains('learning_goals', selectedGoals);
      }

      const { data, error } = await query.limit(50);

      if (error) {
        console.error('Error fetching community profiles:', error);
        return;
      }

      // Enhance with additional stats
      const enhancedProfiles = await Promise.all(
        data.map(async (profile) => {
          // Get game stats
          const { data: gameStats } = await supabase
            .from('game_sessions')
            .select('score')
            .eq('user_id', profile.id);

          const gameCount = gameStats?.length || 0;
          const bestScore = gameStats?.length ? Math.max(...gameStats.map(g => g.score)) : 0;

          return {
            ...profile,
            game_count: gameCount,
            best_score: bestScore,
            follower_count: 0 // We'll implement this when we add the following system
          };
        })
      );

      if (view === 'leaderboard') {
        enhancedProfiles.sort((a, b) => (b.best_score || 0) - (a.best_score || 0));
      }

      setProfiles(enhancedProfiles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching community profiles:', error);
      setLoading(false);
    }
  };

  const filteredProfiles = profiles.filter(profile => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      profile.username.toLowerCase().includes(query) ||
      profile.full_name?.toLowerCase().includes(query) ||
      profile.bio?.toLowerCase().includes(query) ||
      profile.location?.toLowerCase().includes(query)
    );
  });

  const toggleGoalFilter = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-white">Community</h1>
        </div>

        {/* View Selector */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={view === 'search' ? 'default' : 'outline'}
            onClick={() => setView('search')}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
          <Button
            variant={view === 'leaderboard' ? 'default' : 'outline'}
            onClick={() => setView('leaderboard')}
            className="flex items-center gap-2"
          >
            <Trophy className="h-4 w-4" />
            Leaderboard
          </Button>
          <Button
            variant={view === 'recent' ? 'default' : 'outline'}
            onClick={() => setView('recent')}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            New Members
          </Button>
          <Link href="/leaderboards">
            <Button variant="ghost" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Full Leaderboards
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        {view === 'search' && (
          <Card className="bg-slate-800 border-slate-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Search & Filter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by username, name, bio, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>

              {/* Experience Level Filter */}
              <div>
                <p className="text-sm text-slate-400 mb-2">Experience Level</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={selectedExperience === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedExperience('all')}
                  >
                    All
                  </Button>
                  {Object.entries(experienceLevelLabels).map(([level, label]) => (
                    <Button
                      key={level}
                      size="sm"
                      variant={selectedExperience === level ? 'default' : 'outline'}
                      onClick={() => setSelectedExperience(level as 'beginner' | 'intermediate' | 'advanced')}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Learning Goals Filter */}
              <div>
                <p className="text-sm text-slate-400 mb-2">Learning Goals</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(learningGoalsLabels).map(([goal, label]) => (
                    <Button
                      key={goal}
                      size="sm"
                      variant={selectedGoals.includes(goal) ? 'default' : 'outline'}
                      onClick={() => toggleGoalFilter(goal)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProfiles.map((profile) => (
              <Card key={profile.id} className="bg-slate-800 border-slate-700 hover:border-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">
                        <Link 
                          href={`/profile/${profile.username}`}
                          className="hover:text-primary transition-colors"
                        >
                          {profile.full_name || profile.username}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        @{profile.username}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        profile.experience_level === 'beginner' ? 'bg-green-900 text-green-200' :
                        profile.experience_level === 'intermediate' ? 'bg-yellow-900 text-yellow-200' :
                        'bg-purple-900 text-purple-200'
                      }`}>
                        {experienceLevelLabels[profile.experience_level]}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Bio */}
                  {profile.bio && (
                    <p className="text-slate-300 text-sm line-clamp-2">
                      {profile.bio}
                    </p>
                  )}

                  {/* Location and Website */}
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    {profile.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                    {profile.website_url && (
                      <div className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        <span>Website</span>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-slate-400">
                      <span>{profile.game_count} games</span>
                      {view === 'leaderboard' && profile.best_score && (
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="h-3 w-3" />
                          <span>{profile.best_score}% best</span>
                        </div>
                      )}
                    </div>
                    <span className="text-slate-500">
                      {view === 'recent' ? 'Joined ' : 'Member since '}
                      {new Date(profile.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Learning Goals */}
                  {profile.learning_goals && profile.learning_goals.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {profile.learning_goals.slice(0, 3).map((goal) => (
                        <span
                          key={goal}
                          className="inline-block px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs"
                        >
                          {learningGoalsLabels[goal] || goal}
                        </span>
                      ))}
                      {profile.learning_goals.length > 3 && (
                        <span className="inline-block px-2 py-1 bg-slate-700 text-slate-400 rounded text-xs">
                          +{profile.learning_goals.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredProfiles.length === 0 && !loading && (
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="text-center py-12">
              <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No profiles found</h3>
              <p className="text-slate-400">
                Try adjusting your search criteria or filters.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
