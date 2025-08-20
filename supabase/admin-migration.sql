-- Add role column to profiles table for admin functionality
ALTER TABLE public.profiles 
ADD COLUMN role TEXT CHECK (role IN ('user', 'admin')) DEFAULT 'user';

-- Create index for role-based queries
CREATE INDEX idx_profiles_role ON public.profiles(role);

-- Update RLS policies to allow admins to manage themes and achievements
CREATE POLICY "Admins can manage achievements" ON public.achievements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage learning paths" ON public.learning_paths
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant usage on the function
GRANT EXECUTE ON FUNCTION public.is_admin(UUID) TO authenticated;
