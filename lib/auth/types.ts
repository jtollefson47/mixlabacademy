import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string;
      experience_level?: 'beginner' | 'intermediate' | 'advanced';
      onboarding_completed?: boolean;
      skills_assessed?: boolean;
    };
  }

  interface User {
    id: string;
    username?: string;
    experience_level?: 'beginner' | 'intermediate' | 'advanced';
    onboarding_completed?: boolean;
    skills_assessed?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    userId?: string;
  }
}
