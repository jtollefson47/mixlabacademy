'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/lib/supabase';

interface OnboardingFormData {
  username: string;
  experience_level: 'beginner' | 'intermediate' | 'advanced';
  learning_goals: string[];
  is_public: boolean;
}

const learningGoalsOptions = [
  'eq_mastery',
  'compression_techniques', 
  'mixing_fundamentals',
  'mastering_basics',
  'sound_design',
  'recording_techniques'
];

const learningGoalsLabels: Record<string, string> = {
  'eq_mastery': 'EQ Mastery',
  'compression_techniques': 'Compression Techniques', 
  'mixing_fundamentals': 'Mixing Fundamentals',
  'mastering_basics': 'Mastering Basics',
  'sound_design': 'Sound Design',
  'recording_techniques': 'Recording Techniques'
};

export default function OnboardingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
    const [step] = useState(1)
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<OnboardingFormData>({
    username: '',
    experience_level: 'beginner',
    learning_goals: [],
    is_public: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
      return;
    }

    if (user?.email) {
      setFormData(prev => ({
        ...prev,
        username: user.email!.split('@')[0] || ''
      }));
    }
  }, [user, loading, router]);

  const validateUsername = (username: string): string | null => {
    if (!username) return 'Username is required';
    if (username.length < 3) return 'Username must be at least 3 characters';
    if (username.length > 30) return 'Username must be no more than 30 characters';
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return 'Username can only contain letters, numbers, underscores, and hyphens';
    }
    return null;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setErrors({});

    try {
      // Validate username
      const usernameError = validateUsername(formData.username);
      if (usernameError) {
        setErrors({ username: usernameError });
        setSubmitting(false);
        return;
      }

      // Update user profile in Supabase
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          username: formData.username,
          experience_level: formData.experience_level,
          learning_goals: formData.learning_goals,
          is_public: formData.is_public,
          onboarding_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id!); // User is guaranteed to exist at this point

      if (profileError) {
        console.error('Profile update error:', profileError);
        setErrors({ submit: 'Failed to save profile. Please try again.' });
        setSubmitting(false);
        return;
      }

      // Success! Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Onboarding error:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to signin
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, username: e.target.value }));
                  if (errors.username) {
                    setErrors(prev => ({ ...prev, username: '' }));
                  }
                }}
                placeholder="Enter your username"
                className="mt-1"
              />
              {errors.username && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <Label>Experience Level</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="beginner"
                    value="beginner"
                    checked={formData.experience_level === 'beginner'}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      experience_level: e.target.value as 'beginner' | 'intermediate' | 'advanced'
                    }))}
                    className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="beginner">Beginner - New to audio engineering</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="intermediate"
                    value="intermediate"
                    checked={formData.experience_level === 'intermediate'}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      experience_level: e.target.value as 'beginner' | 'intermediate' | 'advanced'
                    }))}
                    className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="intermediate">Intermediate - Some experience with audio tools</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="advanced"
                    value="advanced"
                    checked={formData.experience_level === 'advanced'}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      experience_level: e.target.value as 'beginner' | 'intermediate' | 'advanced'
                    }))}
                    className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="advanced">Advanced - Experienced audio engineer</Label>
                </div>
              </div>
            </div>

            <div>
              <Label>Learning Goals (select all that apply)</Label>
              <div className="mt-2 space-y-2">
                {learningGoalsOptions.map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal}
                      checked={formData.learning_goals.includes(goal)}
                      onCheckedChange={(checked: boolean) => {
                        if (checked) {
                          setFormData(prev => ({
                            ...prev,
                            learning_goals: [...prev.learning_goals, goal]
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            learning_goals: prev.learning_goals.filter(g => g !== goal)
                          }));
                        }
                      }}
                    />
                    <Label htmlFor={goal}>{learningGoalsLabels[goal]}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_public"
                checked={formData.is_public}
                onCheckedChange={(checked: boolean) => 
                  setFormData(prev => ({ ...prev, is_public: checked }))
                }
              />
              <Label htmlFor="is_public">Make my profile public</Label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Welcome to Audio Learning!
          </CardTitle>
          <CardDescription className="text-slate-300">
            Let&apos;s set up your profile to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
          
          {errors.submit && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-600 rounded text-red-200 text-sm">
              {errors.submit}
            </div>
          )}
          
          <div className="flex justify-end mt-8">
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={submitting || !formData.username}
            >
              {submitting ? 'Setting up...' : 'Complete Setup'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
