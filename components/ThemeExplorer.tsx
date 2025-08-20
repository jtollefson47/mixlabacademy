'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MusicNoteIcon, DifficultyIcon } from '@/components/ui/theme-icons'
import { Palette, Eye, RotateCcw, Code, Save, AlertCircle } from 'lucide-react'
import LiveCSSEditor from './LiveCSSEditor'
import { themes, type Theme } from '@/lib/themes'

export default function ThemeExplorer() {
  const [currentTheme, setCurrentTheme] = useState('default')
  const [activeMode, setActiveMode] = useState<'themes' | 'editor'>('themes')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedStatus, setSavedStatus] = useState<'saved' | 'unsaved' | 'saving'>('unsaved')

  // Load saved theme on component mount
  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = localStorage.getItem('mixlab-theme')
        if (savedTheme && themes[savedTheme]) {
          setCurrentTheme(savedTheme)
          // Apply theme without saving again
          const theme = themes[savedTheme]
          const root = document.documentElement
          if (root && theme) {
            // Apply basic theme variables
            const parseHSL = (hslString: string): string => {
              try {
                return hslString.replace('hsl(', '').replace(')', '')
              } catch (err) {
                return '0 0% 50%'
              }
            }
            
            root.style.setProperty('--primary', parseHSL(theme.primary))
            root.style.setProperty('--secondary', parseHSL(theme.secondary))
            root.style.setProperty('--accent', parseHSL(theme.accent))
            
            const body = document.body
            if (body) {
              const bodyClasses = body.className.split(' ').filter(cls => 
                !cls.startsWith('bg-') && !cls.startsWith('theme-')
              )
              body.className = `${bodyClasses.join(' ')} ${theme.background} theme-${savedTheme}`
            }
          }
        }
      } catch (err) {
        console.warn('Failed to load saved theme:', err)
        setError('Failed to load saved theme preferences')
      }
    }
    
    loadSavedTheme()
  }, [])

  const applyTheme = useCallback(async (themeKey: string, shouldSave: boolean = true) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const theme = themes[themeKey]
      if (!theme) {
        throw new Error(`Theme "${themeKey}" not found`)
      }
      
      setCurrentTheme(themeKey)
      
      // Apply comprehensive theme to CSS variables with error handling
      const root = document.documentElement
      if (!root) {
        throw new Error('Could not access document root for styling')
      }
      
      // Parse HSL values safely
      const parseHSL = (hslString: string): string => {
        try {
          return hslString.replace('hsl(', '').replace(')', '')
        } catch (err) {
          console.warn('Failed to parse HSL value:', hslString)
          return '0 0% 50%' // Fallback gray
        }
      }
      
      // Apply CSS variables with fallbacks
      const cssVariables = [
        ['--primary', parseHSL(theme.primary)],
        ['--primary-foreground', '210 40% 98%'],
        ['--secondary', parseHSL(theme.secondary)],
        ['--secondary-foreground', '222.2 84% 4.9%'],
        ['--accent', parseHSL(theme.accent)],
        ['--accent-foreground', '210 40% 98%']
      ]

      cssVariables.forEach(([property, value]) => {
        try {
          root.style.setProperty(property, value)
        } catch (err) {
          console.warn(`Failed to set CSS property ${property}:`, err)
        }
      })
      
      // Determine if it's a dark theme based on background
      const isDarkTheme = theme.background.includes('slate-900') || 
                         theme.background.includes('slate-950') ||
                         theme.background.includes('gray-950') ||
                         theme.background.includes('zinc-950') ||
                         theme.background.includes('black') ||
                         theme.background.includes('900') ||
                         theme.background.includes('950')
      
      if (isDarkTheme) {
        // Dark theme colors with high contrast
        const darkVariables = [
          ['--background', '222.2 84% 4.9%'],
          ['--foreground', '210 40% 98%'],
          ['--card', '222.2 84% 4.9%'],
          ['--card-foreground', '210 40% 98%'],
          ['--popover', '222.2 84% 4.9%'],
          ['--popover-foreground', '210 40% 98%'],
          ['--muted', '217.2 32.6% 17.5%'],
          ['--muted-foreground', '215 20.2% 65.1%'],
          ['--border', '217.2 32.6% 17.5%'],
          ['--input', '217.2 32.6% 17.5%'],
          ['--destructive', '0 62.8% 30.6%'],
          ['--destructive-foreground', '210 40% 98%'],
          ['--ring', parseHSL(theme.primary)]
        ]
        
        darkVariables.forEach(([property, value]) => {
          try {
            root.style.setProperty(property, value)
          } catch (err) {
            console.warn(`Failed to set dark theme property ${property}:`, err)
          }
        })
      } else {
        // Light theme colors
        const lightVariables = [
          ['--background', '0 0% 100%'],
          ['--foreground', '222.2 84% 4.9%'],
          ['--card', '0 0% 100%'],
          ['--card-foreground', '222.2 84% 4.9%'],
          ['--popover', '0 0% 100%'],
          ['--popover-foreground', '222.2 84% 4.9%'],
          ['--muted', '210 40% 96%'],
          ['--muted-foreground', '215.4 16.3% 46.9%'],
          ['--border', '214.3 31.8% 91.4%'],
          ['--input', '214.3 31.8% 91.4%'],
          ['--destructive', '0 84.2% 60.2%'],
          ['--destructive-foreground', '210 40% 98%'],
          ['--ring', parseHSL(theme.primary)]
        ]
        
        lightVariables.forEach(([property, value]) => {
          try {
            root.style.setProperty(property, value)
          } catch (err) {
            console.warn(`Failed to set light theme property ${property}:`, err)
          }
        })
      }
      
      // Apply background class safely
      try {
        const body = document.body
        if (body) {
          const bodyClasses = body.className.split(' ').filter(cls => 
            !cls.startsWith('bg-') && !cls.startsWith('theme-')
          )
          body.className = `${bodyClasses.join(' ')} ${theme.background} theme-${themeKey}`
        }
      } catch (err) {
        console.warn('Failed to apply body classes:', err)
      }
      
      // Save theme preference if requested
      if (shouldSave) {
        await saveThemePreference(themeKey)
      }
      
    } catch (err) {
      console.error('Failed to apply theme:', err)
      setError(err instanceof Error ? err.message : 'Failed to apply theme')
    } finally {
      setIsLoading(false)
    }
  }, []) // Dependencies would cause circular reference

  const saveThemePreference = useCallback(async (themeKey: string) => {
    try {
      setSavedStatus('saving')
      
      // Save to localStorage
      localStorage.setItem('mixlab-theme', themeKey)
      
      // Also save theme state to a global style element for persistence across page loads
      const existingStyle = document.getElementById('theme-persistence')
      if (existingStyle) {
        existingStyle.remove()
      }
      
      const theme = themes[themeKey]
      if (theme) {
        const style = document.createElement('style')
        style.id = 'theme-persistence'
        style.textContent = `
          body.theme-${themeKey} {
            ${theme.background.replace('bg-', 'background: ')} !important;
          }
          :root {
            --theme-name: "${themeKey}";
          }
        `
        document.head.appendChild(style)
      }
      
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setSavedStatus('saved')
      
      // Reset saved status after 3 seconds
      setTimeout(() => {
        setSavedStatus('unsaved')
      }, 3000)
      
    } catch (err) {
      console.error('Failed to save theme preference:', err)
      setError('Failed to save theme preference')
      setSavedStatus('unsaved')
    }
  }, [])

  const resetTheme = useCallback(async () => {
    try {
      setError(null)
      localStorage.removeItem('mixlab-theme')
      await applyTheme('default')
    } catch (err) {
      console.error('Failed to reset theme:', err)
      setError('Failed to reset theme')
    }
  }, [applyTheme])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Palette className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-gradient">Theme Explorer</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Experiment with different aesthetic styles for your audio learning platform
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="outline">
              Current: {themes[currentTheme]?.name || 'Unknown'}
            </Badge>
            <Badge 
              variant={savedStatus === 'saved' ? 'default' : savedStatus === 'saving' ? 'secondary' : 'outline'}
              className="flex items-center gap-1"
            >
              {savedStatus === 'saved' && <Save className="w-3 h-3" />}
              {savedStatus === 'saving' ? 'Saving...' : savedStatus === 'saved' ? 'Saved' : 'Not Saved'}
            </Badge>
            <Button 
              onClick={resetTheme} 
              variant="outline" 
              size="sm"
              disabled={isLoading}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center justify-center gap-2 mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <span className="text-sm text-destructive">{error}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setError(null)}
                className="ml-2"
              >
                Dismiss
              </Button>
            </div>
          )}
          
          {/* Mode Toggle */}
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant={activeMode === 'themes' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveMode('themes')}
            >
              <Palette className="w-4 h-4 mr-2" />
              Quick Themes
            </Button>
            <Button
              variant={activeMode === 'editor' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveMode('editor')}
            >
              <Code className="w-4 h-4 mr-2" />
              Advanced Editor
            </Button>
          </div>
        </div>

        {/* Content based on active mode */}
        {activeMode === 'themes' ? (
          <>
            {/* Theme Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Object.entries(themes).map(([key, theme]) => (
                <Card 
                  key={key} 
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    currentTheme === key ? 'ring-2 ring-primary shadow-lg' : ''
                  } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => applyTheme(key)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">{theme.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        {currentTheme === key && (
                          <Badge className="bg-primary text-primary-foreground">Active</Badge>
                        )}
                        {isLoading && currentTheme === key && (
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>
                    </div>
                    <CardDescription className="text-sm">{theme.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Enhanced Color Swatches */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-muted-foreground">Color Palette</div>
                      <div className="flex gap-2">
                        <div className="flex flex-col items-center gap-1">
                          <div 
                            className="w-10 h-10 rounded-lg border-2 border-white shadow-md transition-transform hover:scale-110"
                            style={{ backgroundColor: theme.primary }}
                            title="Primary Color"
                            role="img"
                            aria-label={`Primary color: ${theme.primary}`}
                          />
                          <span className="text-xs text-muted-foreground">Primary</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div 
                            className="w-10 h-10 rounded-lg border-2 border-white shadow-md transition-transform hover:scale-110"
                            style={{ backgroundColor: theme.secondary }}
                            title="Secondary Color"
                            role="img"
                            aria-label={`Secondary color: ${theme.secondary}`}
                          />
                          <span className="text-xs text-muted-foreground">Secondary</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div 
                            className="w-10 h-10 rounded-lg border-2 border-white shadow-md transition-transform hover:scale-110"
                            style={{ backgroundColor: theme.accent }}
                            title="Accent Color"
                            role="img"
                            aria-label={`Accent color: ${theme.accent}`}
                          />
                          <span className="text-xs text-muted-foreground">Accent</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Preview Bar */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-muted-foreground">Background Preview</div>
                      <div className={`h-20 rounded-lg ${theme.background} border border-gray-200 relative overflow-hidden`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-xs font-medium opacity-70">Sample Background</div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full transition-all duration-300" 
                      variant={currentTheme === key ? "default" : "outline"}
                      disabled={isLoading}
                      onClick={(e) => {
                        e.stopPropagation()
                        applyTheme(key)
                      }}
                      aria-label={`Apply ${theme.name} theme`}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {isLoading && currentTheme === key ? 'Applying...' : 
                       currentTheme === key ? 'Applied ✓' : 'Try This Theme'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Live Preview Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Live Preview - {themes[currentTheme].name}</CardTitle>
                <CardDescription>
                  See how the current theme affects your components and overall design
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Sample UI Elements Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Buttons & Controls</h3>
                    <div className="space-y-3">
                      <div className="flex gap-2 flex-wrap">
                        <Button>Primary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="secondary">Secondary</Button>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="btn-glow">Glow Effect</Button>
                        <Button size="sm" variant="destructive">Warning</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Typography</h3>
                    <div className="space-y-2">
                      <h1 className="text-2xl font-bold text-gradient">Gradient Heading</h1>
                      <h2 className="text-lg font-semibold text-primary">Primary Text</h2>
                      <p className="text-muted-foreground">This is muted body text showing readability and contrast ratios.</p>
                      <p className="text-sm text-accent">Accent colored small text</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Status Indicators</h3>
                    <div className="space-y-2">
                      <Badge>Default Badge</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline Badge</Badge>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Online Status</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span>Accent Status</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sample Cards */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Card Examples</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="glass card-float border-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MusicNoteIcon size="sm" /> Audio Game Card
                        </CardTitle>
                        <CardDescription>
                          This shows how your game cards look with the current theme
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>⏱️ 10-15 min</span>
                            <DifficultyIcon level="beginner" />
                            <span className="text-green-600">⭐ Available</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{width: '60%'}}></div>
                          </div>
                          <Button className="w-full btn-glow">Play Now</Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border">
                      <CardHeader>
                        <CardTitle>Settings Panel</CardTitle>
                        <CardDescription>Configuration and options</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Volume Level</span>
                          <span className="text-sm text-muted-foreground">75%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-accent h-2 rounded-full" style={{width: '75%'}}></div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Cancel</Button>
                          <Button size="sm">Save Settings</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Navigation Preview */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Navigation Preview</h3>
                  <Card className="p-4">
                    <nav className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <MusicNoteIcon size="sm" />
                        <span className="font-bold text-xl">Audio Learning</span>
                      </div>
                      <div className="flex items-center space-x-6">
                        <button className="text-foreground/60 hover:text-foreground transition-colors">Games</button>
                        <button className="text-foreground/60 hover:text-foreground transition-colors">Dashboard</button>
                        <button className="text-foreground/60 hover:text-foreground transition-colors">Community</button>
                        <Button size="sm">Sign In</Button>
                      </div>
                    </nav>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <LiveCSSEditor />
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Experiment with Aesthetics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">1. Quick Theme Testing</h4>
                <p className="text-sm text-muted-foreground">
                  Click any theme above to instantly see how it affects your site. 
                  Navigate to different pages to see the full effect.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">2. Custom Colors</h4>
                <p className="text-sm text-muted-foreground">
                  Modify the colors in <code>/lib/themes.ts</code> or directly in 
                  <code>/app/globals.css</code> CSS variables.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">3. Component Variants</h4>
                <p className="text-sm text-muted-foreground">
                  Create new component variants in your existing UI components 
                  for different aesthetic approaches.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">4. Animation Styles</h4>
                <p className="text-sm text-muted-foreground">
                  Experiment with different animation timing and easing in 
                  <code>tailwind.config.ts</code> and CSS animations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
