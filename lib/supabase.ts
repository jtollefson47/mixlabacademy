import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Provide fallback values for CI/testing environments
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU5MzI3OTMsImV4cCI6MTk2MTUwODc5M30.placeholder';

// Only warn in development/CI when using fallback values
if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.warn('Using fallback Supabase URL for testing/development');
}

if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('Using fallback Supabase anon key for testing/development');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Server-side client with service role key
function createSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  
  if (!url || !serviceRoleKey) {
    // Return null if environment variables are not available
    console.warn('Supabase admin client not available - missing environment variables');
    return null;
  }
  
  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

export const supabaseAdmin = createSupabaseAdmin();
