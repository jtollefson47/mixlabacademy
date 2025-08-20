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
      secondary: 'hsl(50, 100%, 85%)', // Light cream
      secondaryForeground: 'hsl(0, 0%, 10%)', // Dark text on light
      accent: 'hsl(345, 100%, 55%)', // Retro pink
      accentForeground: 'hsl(0, 0%, 100%)', // White text on pink
      background: 'hsl(48, 100%, 97%)', // Very light cream
      foreground: 'hsl(0, 0%, 15%)', // Dark text
      card: 'hsl(0, 0%, 100%)', // White cards
      cardForeground: 'hsl(0, 0%, 15%)', // Dark text
      popover: 'hsl(0, 0%, 100%)',
      popoverForeground: 'hsl(0, 0%, 15%)',
      muted: 'hsl(50, 30%, 94%)', // Very light beige
      mutedForeground: 'hsl(0, 0%, 40%)', // Medium gray text
      border: 'hsl(50, 30%, 85%)', // Light beige border
      input: 'hsl(50, 30%, 90%)', // Light input background
      ring: 'hsl(195, 100%, 45%)', // Focus ring matches primary
    },
    dark: {
      primary: 'hsl(195, 85%, 65%)', // Brighter blue for dark mode
      primaryForeground: 'hsl(0, 0%, 10%)', // Dark text on bright blue
      secondary: 'hsl(50, 40%, 25%)', // Dark warm brown
      secondaryForeground: 'hsl(50, 100%, 85%)', // Light cream text
      accent: 'hsl(345, 80%, 70%)', // Brighter pink for dark mode
      accentForeground: 'hsl(0, 0%, 10%)', // Dark text on bright pink
      background: 'hsl(30, 20%, 8%)', // Very dark brown
      foreground: 'hsl(50, 30%, 90%)', // Light cream text
      card: 'hsl(30, 25%, 12%)', // Dark brown cards
      cardForeground: 'hsl(50, 30%, 90%)', // Light text
      popover: 'hsl(30, 25%, 12%)',
      popoverForeground: 'hsl(50, 30%, 90%)',
      muted: 'hsl(30, 20%, 18%)', // Slightly lighter brown
      mutedForeground: 'hsl(50, 15%, 65%)', // Medium light text
      border: 'hsl(30, 25%, 20%)', // Brown border
      input: 'hsl(30, 25%, 15%)', // Dark input background
      ring: 'hsl(195, 85%, 65%)', // Focus ring matches primary
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

    // Apply background gradient for retro theme
    const body = document.body
    if (body) {
      body.className = body.className.replace(/bg-gradient-[^\s]*|bg-[^\s]*/g, '').trim()
      
      if (theme === 'light') {
        body.className += ' bg-gradient-to-br from-cyan-200 via-yellow-100 to-pink-200'
      } else {
        body.className += ' bg-gradient-to-br from-amber-950/30 via-stone-900 to-pink-950/30'
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
