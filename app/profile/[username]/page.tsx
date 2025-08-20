'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { User, MapPin, Globe, Calendar, Eye, EyeOff } from 'lucide-react';

interface PublicProfile {
  id: string;
  username: string;
  full_name?: string | null;
  bio?: string | null;
  location?: string | null;
  website_url?: string | null;
  experience_level: 'beginner' | 'intermediate' | 'advanced';
  learning_goals: string[] | null;
  is_public: boolean;
  progress_public: boolean;
  achievements_public: boolean;
  created_at: string;
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

const experienceLevelDescriptions = {
  'beginner': 'New to audio engineering',
  'intermediate': 'Some experience with audio tools',
  'advanced': 'Experienced audio engineer'
};

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (username) {
      fetchPublicProfile();
    }
  }, [username]);

  const fetchPublicProfile = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, full_name, bio, location, website_url, experience_level, learning_goals, is_public, progress_public, achievements_public, created_at')
        .eq('username', username)
        .eq('is_public', true)
        .single();

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setProfile(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching public profile:', error);
      setNotFound(true);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800 border-slate-700 w-full max-w-md">
          <CardContent className="text-center py-8">
            <EyeOff className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Profile Not Found</h2>
            <p className="text-slate-300">
              This profile doesn't exist or is set to private.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <User className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-white">{profile.username}'s Profile</h1>
            <div className="flex items-center gap-1">
              <Eye className="h-5 w-5 text-green-400" />
              <span className="text-sm text-green-400">Public</span>
            </div>
          </div>
          {/* Follow functionality coming soon */}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Information */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.full_name && (
                <div>
                  <p className="text-sm text-slate-400">Full Name</p>
                  <p className="text-white">{profile.full_name}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-slate-400">Username</p>
                <p className="text-white">@{profile.username}</p>
              </div>

              {profile.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-400">Location</p>
                    <p className="text-white">{profile.location}</p>
                  </div>
                </div>
              )}

              {profile.website_url && (
                <div className="flex items-start gap-2">
                  <Globe className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-400">Website</p>
                    <a 
                      href={profile.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 break-all"
                    >
                      {profile.website_url}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-400">Member since</p>
                  <p className="text-white">{new Date(profile.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audio Engineering Profile */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Audio Engineering Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-400">Experience Level</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    profile.experience_level === 'beginner' ? 'bg-green-900 text-green-200' :
                    profile.experience_level === 'intermediate' ? 'bg-yellow-900 text-yellow-200' :
                    'bg-purple-900 text-purple-200'
                  }`}>
                    {experienceLevelLabels[profile.experience_level]}
                  </span>
                  <span className="text-slate-300 text-sm">
                    {experienceLevelDescriptions[profile.experience_level]}
                  </span>
                </div>
              </div>

              {profile.learning_goals && profile.learning_goals.length > 0 && (
                <div>
                  <p className="text-sm text-slate-400 mb-2">Learning Goals</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.learning_goals.map((goal) => (
                      <span
                        key={goal}
                        className="inline-block px-3 py-1 bg-slate-700 text-slate-200 rounded-full text-sm"
                      >
                        {learningGoalsLabels[goal] || goal}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bio */}
          {profile.bio && (
            <Card className="bg-slate-800 border-slate-700 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-200 whitespace-pre-wrap">{profile.bio}</p>
              </CardContent>
            </Card>
          )}

          {/* Progress Tracking - Temporarily Disabled */}
          {profile.progress_public && (
            <div className="md:col-span-2">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Learning Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">Progress tracking coming soon!</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Achievements Section - Temporarily Disabled */}
          {profile.achievements_public && (
            <div className="md:col-span-2">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">Achievement showcase coming soon!</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Activity Feed - Temporarily Disabled */}
          <div className="md:col-span-2">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">Activity feed coming soon!</p>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Notice */}
          <Card className="bg-slate-700 border-slate-600 md:col-span-2">
            <CardContent className="py-4">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Eye className="h-4 w-4 text-green-400" />
                <span>This is a public profile.</span>
                {!profile.progress_public && !profile.achievements_public && (
                  <span>Learning progress and achievements are private.</span>
                )}
                {profile.progress_public && (
                  <span>Learning progress is public.</span>
                )}
                {profile.achievements_public && (
                  <span>Achievements are public.</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
