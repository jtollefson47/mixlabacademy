"use client"

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'dark' | 'light'
}

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  ...props
}: {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
  [key: string]: unknown
}) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('light')

  // Memoized theme switching function with performance optimization
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    
    // Use requestIdleCallback for non-blocking storage operation
    if (typeof window !== 'undefined') {
      const callback = () => {
        try {
          localStorage.setItem(storageKey, newTheme)
        } catch (error) {
          console.warn('Failed to save theme preference:', error)
        }
      }
      
      if ('requestIdleCallback' in window) {
        requestIdleCallback(callback)
      } else {
        setTimeout(callback, 0)
      }
    }
  }, [storageKey])

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    const initializeTheme = () => {
      try {
        const stored = localStorage.getItem(storageKey) as Theme | null
        if (stored && ['dark', 'light', 'system'].includes(stored)) {
          setThemeState(stored)
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error)
      }
    }

    if (typeof window !== 'undefined') {
      initializeTheme()
    }
  }, [storageKey])

  // Handle theme resolution and application
  useEffect(() => {
    const applyTheme = () => {
      const root = window.document.documentElement
      
      let effectiveTheme: 'dark' | 'light' = 'light'
      
      if (theme === 'system') {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      } else {
        effectiveTheme = theme as 'dark' | 'light'
      }
      
      setResolvedTheme(effectiveTheme)
      
      // Use requestAnimationFrame for smooth theme transition
      requestAnimationFrame(() => {
        root.classList.remove('light', 'dark')
        root.classList.add(effectiveTheme)
        
        // Set CSS custom properties for theme-aware styling
        const isDark = effectiveTheme === 'dark'
        root.style.setProperty('--theme-primary', isDark ? '#ffffff' : '#000000')
        root.style.setProperty('--theme-secondary', isDark ? '#e5e5e5' : '#666666')
        root.style.setProperty('--theme-background', isDark ? '#0a0a0a' : '#ffffff')
        root.style.setProperty('--theme-surface', isDark ? '#1a1a1a' : '#f5f5f5')
        root.style.setProperty('--card-shadow', isDark 
          ? '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        )
      })
    }

    if (typeof window !== 'undefined') {
      applyTheme()
    }
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      const effectiveTheme = mediaQuery.matches ? 'dark' : 'light'
      setResolvedTheme(effectiveTheme)
      
      requestAnimationFrame(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(effectiveTheme)
      })
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    theme,
    setTheme,
    resolvedTheme
  }), [theme, setTheme, resolvedTheme])

  return (
    <ThemeProviderContext.Provider {...props} value={contextValue}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
