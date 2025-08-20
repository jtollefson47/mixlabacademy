# Database Setup Instructions

## Step 1: Access Supabase SQL Editor

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click "SQL Editor" in the left sidebar
4. Click "New query"

## Step 2: Run the Database Schema

Copy the entire contents of `supabase/schema.sql` and paste it into the SQL editor, then click "Run" or press Ctrl/Cmd + Enter.

This will create:
- ✅ User profiles table with audio engineering fields
- ✅ Skill assessments for tracking learning progress
- ✅ Game sessions for storing game results
- ✅ Achievements system with unlockable badges
- ✅ Learning paths with structured courses
- ✅ Row Level Security (RLS) policies for data protection
- ✅ Triggers for automatic profile creation
- ✅ Default achievements and learning paths

## Step 3: Verify the Setup

After running the schema, you should see these tables in the "Table Editor":
- `profiles`
- `skill_assessments`
- `game_sessions`
- `achievements`
- `user_achievements`
- `learning_paths`
- `user_learning_progress`

## Step 4: Test the Application

Once the database is set up, you can:

1. Start the development server: `pnpm dev`
2. Visit `http://localhost:3000`
3. Click "Sign In" and test Google OAuth
4. Complete the onboarding process
5. Try the EQ matching game

## Next Steps: Google OAuth Setup

To enable Google sign-in, you'll need to:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins:
   - `http://localhost:3000` (for development)
   - Your production domain (when deployed)
6. Add callback URLs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - Your production callback URL
7. Copy the Client ID and Secret to your `.env.local` file

## Environment Variables Checklist

Make sure your `.env.local` has:
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`
- ✅ `NEXTAUTH_URL`
- ✅ `NEXTAUTH_SECRET`
- ⏳ `GOOGLE_CLIENT_ID` (pending Google setup)
- ⏳ `GOOGLE_CLIENT_SECRET` (pending Google setup)
