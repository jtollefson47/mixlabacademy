import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import { supabaseAdmin } from '@/lib/supabase';
import './types'; // Import type declarations

export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    // Apple Provider configuration is more complex and requires additional setup
    // Commenting out for now - can be enabled when Apple credentials are configured
    /*
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!, // This should be a JWT token, not an object
    }),
    */
  ],
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/onboarding',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, user }) {
      // Get user profile from Supabase
      if (user?.id && supabaseAdmin) {
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile) {
          session.user = {
            ...session.user,
            id: user.id,
            username: profile.username,
            experience_level: profile.experience_level,
            onboarding_completed: profile.onboarding_completed,
            skills_assessed: profile.skills_assessed,
          };
        }
      }
      return session;
    },
    async signIn({ user, account, profile: _ }) {
      // Auto-generate username if not provided
      if (account?.provider && user.email && supabaseAdmin) {
        const baseUsername = user.email.split('@')[0] || 'user';
        let username = baseUsername;
        let counter = 1;

        // Check if username already exists and increment until we find a unique one
        while (true) {
          const { data: existingUser } = await supabaseAdmin
            .from('profiles')
            .select('username')
            .eq('username', username)
            .single();

          if (!existingUser) break;
          username = `${baseUsername}${counter}`;
          counter++;
        }

        // Store the generated username in user metadata
        user.username = username;
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          userId: user.id,
        };
      }
      return token;
    },
  },
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    async createUser({ user }) {
      // This is handled by the database trigger, but we can add additional logic here
      console.log('New user created:', user.id);
    },
  },
};
