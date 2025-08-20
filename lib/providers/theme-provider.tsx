'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface ThemeContextType {
  mode: 'light' | 'dark' | 'system'
  setMode: (mode: 'light' | 'dark' | 'system') => void
  resolvedTheme: 'light' | 'dark'
  isLoading: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
  defaultMode?: 'light' | 'dark' | 'system'
}

export function ThemeProvider({ children, defaultMode = 'system' }: ThemeProviderProps) {
  const [mode, setModeState] = useState<'light' | 'dark' | 'system'>(defaultMode)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
  const [isLoading, setIsLoading] = useState(true)

  // Retro theme colors - optimized for readability
  const retroTheme = {
    light: {
      primary: 'hsl(195, 100%, 45%)', // Retro blue
      primaryForeground: 'hsl(0, 0%, 100%)', // White text on blue
      secondary: 'hsl(50, 100%, 85%)', // Light cream for accents only
      secondaryForeground: 'hsl(0, 0%, 10%)', // Dark text on cream
      accent: 'hsl(345, 100%, 55%)', // Retro pink
      accentForeground: 'hsl(0, 0%, 100%)', // White text on pink
      background: 'hsl(0, 0%, 100%)', // Pure white background
      foreground: 'hsl(0, 0%, 15%)', // Dark text
      card: 'hsl(0, 0%, 100%)', // White cards
      cardForeground: 'hsl(0, 0%, 15%)', // Dark text
      popover: 'hsl(0, 0%, 100%)',
      popoverForeground: 'hsl(0, 0%, 15%)',
      muted: 'hsl(210, 40%, 96%)', // Very light gray for muted areas
      mutedForeground: 'hsl(0, 0%, 40%)', // Medium gray text
      border: 'hsl(214, 31%, 91%)', // Light gray border
      input: 'hsl(214, 31%, 91%)', // Light input background
      ring: 'hsl(195, 100%, 45%)', // Focus ring matches primary
    },
    dark: {
      primary: 'hsl(195, 100%, 45%)', // Keep same blue as light mode
      primaryForeground: 'hsl(0, 0%, 100%)', // White text on blue
      secondary: 'hsl(50, 100%, 85%)', // Light cream like light mode
      secondaryForeground: 'hsl(0, 0%, 10%)', // Dark text on light cream
      accent: 'hsl(345, 100%, 55%)', // Keep same pink as light mode
      accentForeground: 'hsl(0, 0%, 100%)', // White text on pink
      background: 'hsl(220, 40%, 8%)', // Dark blue background
      foreground: 'hsl(50, 30%, 90%)', // Light cream text
      card: 'hsl(220, 35%, 12%)', // Dark blue cards
      cardForeground: 'hsl(50, 30%, 90%)', // Light text
      popover: 'hsl(220, 35%, 12%)',
      popoverForeground: 'hsl(50, 30%, 90%)',
      muted: 'hsl(220, 30%, 18%)', // Slightly lighter dark blue
      mutedForeground: 'hsl(50, 15%, 65%)', // Medium light text
      border: 'hsl(220, 30%, 20%)', // Dark blue border
      input: 'hsl(220, 30%, 15%)', // Dark blue input background
      ring: 'hsl(195, 100%, 45%)', // Focus ring matches primary
    }
  }

  const applyTheme = (theme: 'light' | 'dark') => {
    const root = document.documentElement
    const colors = retroTheme[theme]

    // Apply CSS variables
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
      root.style.setProperty(cssVar, value.replace('hsl(', '').replace(')', ''))
    })

    // Ensure body uses theme background color (remove any gradients)
    const body = document.body
    if (body) {
      // Remove any existing gradient classes and ensure bg-background is applied
      body.className = body.className.replace(/bg-gradient-[^\s]*|bg-[^\s]*/g, '').trim()
      if (!body.className.includes('bg-background')) {
        body.className += ' bg-background'
      }
    }

    // Add theme class to HTML
    root.className = root.className.replace(/theme-(light|dark)/g, '').trim()
    root.className += ` theme-${theme}`
    
    setResolvedTheme(theme)
  }

  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setMode = (newMode: 'light' | 'dark' | 'system') => {
    setModeState(newMode)
    localStorage.setItem('theme-mode', newMode)
    
    const themeToApply = newMode === 'system' ? getSystemTheme() : newMode
    applyTheme(themeToApply)
  }

  // Load saved mode and apply theme
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as 'light' | 'dark' | 'system' | null
    const modeToUse = savedMode || defaultMode
    setModeState(modeToUse)
    
    const themeToApply = modeToUse === 'system' ? getSystemTheme() : modeToUse
    setResolvedTheme(themeToApply)
    applyTheme(themeToApply)
    setIsLoading(false)
  }, [defaultMode])

  // Listen for system theme changes
  useEffect(() => {
    if (mode !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const newTheme = mediaQuery.matches ? 'dark' : 'light'
      applyTheme(newTheme)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [mode])

  const value: ThemeContextType = {
    mode,
    setMode,
    resolvedTheme,
    isLoading
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
