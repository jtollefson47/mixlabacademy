'use client';

import { LocalAuthForm } from '@/components/auth/LocalAuthForm';
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

function SignInForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const callbackUrl = searchParams.get('callbackUrl');

  useEffect(() => {
    // Check if user is already signed in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const redirectUrl = callbackUrl || '/';
        window.location.href = redirectUrl;
      }
    };

    checkUser();
  }, [callbackUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {error && (
        <div className="absolute top-4 right-4 p-3 rounded-md bg-red-900/50 border border-red-700 text-red-200 text-sm max-w-md">
          {error === 'verification_failed' && 'Email verification failed. Please try again.'}
          {error === 'access_denied' && 'Access denied. Please try again.'}
          {!['verification_failed', 'access_denied'].includes(error) && 
            'An error occurred during sign in. Please try again.'}
        </div>
      )}
      
      <LocalAuthForm callbackUrl={callbackUrl || undefined} />
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}
