'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface AdminOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          setIsAdmin(false)
          setIsLoading(false)
          return
        }

        // Check if user has admin role in profiles table
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) {
          console.error('Error checking admin status:', error)
          setIsAdmin(false)
        } else {
          // Check if role property exists and equals 'admin'
          setIsAdmin(profile && 'role' in profile && profile.role === 'admin')
        }
      } catch (error) {
        console.error('Admin check failed:', error)
        setIsAdmin(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminStatus()
  }, [])

  // Show loading state if still checking
  if (isLoading) {
    return null
  }

  // Show content only if user is admin
  if (isAdmin) {
    return <>{children}</>
  }

  // Show fallback or nothing
  return <>{fallback}</>
}

// Hook for checking admin status
export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          setIsAdmin(false)
          setIsLoading(false)
          return
        }

        // Get admin status by checking role
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return false
    }

    return profile && 'role' in profile && profile.role === 'admin'
      } catch (error) {
        console.error('Admin check failed:', error)
        setIsAdmin(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminStatus()
  }, [])

  return { isAdmin, isLoading }
}
