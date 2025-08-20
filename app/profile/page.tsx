'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useTheme } from '@/lib/providers/theme-provider';
import { AdminOnly } from '@/components/AdminOnly';
import { User, MapPin, Globe, Calendar, Palette } from 'lucide-react';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  full_name: string | null;
  bio: string | null;
  location: string | null;
  website_url: string | null;
  experience_level: 'beginner' | 'intermediate' | 'advanced';
  learning_goals: string[] | null;
  is_public: boolean;
  email_notifications: boolean;
  progress_public: boolean;
  achievements_public: boolean;
  created_at: string;
}

const experienceLevelLabels = {
  'beginner': 'Beginner',
  'intermediate': 'Intermediate', 
  'advanced': 'Advanced'
};

const learningGoalsLabels: Record<string, string> = {
  'eq_mastery': 'EQ Mastery',
  'compression_techniques': 'Compression Techniques',
  'mixing_fundamentals': 'Mixing Fundamentals',
  'mastering_basics': 'Mastering Basics',
  'sound_design': 'Sound Design',
  'recording_techniques': 'Recording Techniques'
};

export default function ProfilePage() {
  const { user } = useAuth();
  const { mode, setMode, resolvedTheme } = useTheme();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
      return;
    }
    fetchProfile();
  }, [user, router]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
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

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Profile not found</h3>
            <p className="text-slate-400">Unable to load your profile data.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <User className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
        </div>

        {/* Profile Content */}
        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-300 text-sm">Username</p>
                  <p className="text-white font-medium">{profile.username}</p>
                </div>
                <div>
                  <p className="text-slate-300 text-sm">Email</p>
                  <p className="text-white font-medium">{profile.email}</p>
                </div>
                <div>
                  <p className="text-slate-300 text-sm">Full Name</p>
                  <p className="text-white font-medium">{profile.full_name || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-slate-300 text-sm">Experience Level</p>
                  <p className="text-white font-medium">{experienceLevelLabels[profile.experience_level]}</p>
                </div>
              </div>

              {profile.bio && (
                <div>
                  <p className="text-slate-300 text-sm">Bio</p>
                  <p className="text-white">{profile.bio}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.location && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.website_url && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Globe className="h-4 w-4" />
                    <a 
                      href={profile.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Learning Goals */}
          {profile.learning_goals && profile.learning_goals.length > 0 && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Learning Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.learning_goals.map((goal) => (
                    <span
                      key={goal}
                      className="inline-block px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm"
                    >
                      {learningGoalsLabels[goal] || goal}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Theme Settings */}
          <Card className="bg-card/80 backdrop-blur border-border/20">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-foreground text-base font-medium">Appearance Mode</Label>
                  <p className="text-muted-foreground text-sm mb-3">
                    Choose how the retro theme appears in your interface
                  </p>
                  
                  <RadioGroup value={mode} onValueChange={setMode} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="text-foreground cursor-pointer">
                        Light Mode
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="text-foreground cursor-pointer">
                        Dark Mode
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system" className="text-foreground cursor-pointer">
                        System Preference (recommended)
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Currently using: <span className="font-medium text-foreground">{resolvedTheme} mode</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin Only Theme Management */}
          <AdminOnly>
            <Card className="bg-card/80 backdrop-blur border-border/20 border-accent/20">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Palette className="h-5 w-5 text-accent" />
                  Theme Management (Admin)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <p className="text-sm text-foreground mb-2">
                      <strong>Current Theme:</strong> Retro 1950s Theme
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      This platform uses a carefully crafted retro theme inspired by 1950s design. 
                      Theme customization is restricted to administrators to maintain design consistency.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push('/themes')}
                      className="border-accent/30 text-accent hover:bg-accent/10"
                    >
                      Advanced Theme Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AdminOnly>

          {/* Privacy Settings Status */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Public Profile</span>
                <span className={`text-sm px-2 py-1 rounded ${profile.is_public ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                  {profile.is_public ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Public Progress</span>
                <span className={`text-sm px-2 py-1 rounded ${profile.progress_public ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                  {profile.progress_public ? 'Enabled' : 'Disabled'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">Public Achievements</span>
                <span className={`text-sm px-2 py-1 rounded ${profile.achievements_public ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                  {profile.achievements_public ? 'Enabled' : 'Disabled'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">Email Notifications</span>
                <span className={`text-sm px-2 py-1 rounded ${profile.email_notifications ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                  {profile.email_notifications ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Profile Stats */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile Link */}
          <div className="text-center">
            <p className="text-slate-400 mb-4">Want to update your profile?</p>
            <Button onClick={() => router.push('/auth/onboarding')}>
              Edit Profile Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
