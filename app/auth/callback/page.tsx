'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          router.push('/auth/signin?error=callback_error');
          return;
        }

        if (data.session) {
          // User is authenticated, check if they need onboarding
          const { data: profile } = await supabase
            .from('profiles')
            .select('onboarding_completed')
            .eq('id', data.session.user.id)
            .single();

          if (profile && !profile.onboarding_completed) {
            router.push('/auth/onboarding');
          } else {
            router.push('/dashboard');
          }
        } else {
          // No session, redirect to sign in
          router.push('/auth/signin');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/auth/signin?error=callback_error');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-white">Completing authentication...</p>
      </div>
    </div>
  );
}
