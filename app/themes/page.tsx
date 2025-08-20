'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AdminOnly, useIsAdmin } from '@/components/AdminOnly'
import { useTheme } from '@/lib/providers/theme-provider'
import { Palette, ArrowLeft, Shield, Eye } from 'lucide-react'

export default function ThemesPage() {
  const router = useRouter()
  const { mode, setMode, resolvedTheme } = useTheme()
  const { isAdmin, isLoading } = useIsAdmin()
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light')

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Access Restricted</h3>
            <p className="text-muted-foreground mb-6">
              Theme management is only available to administrators.
            </p>
            <Button onClick={() => router.push('/profile')}>
              Back to Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <AdminOnly>
      <div className="min-h-screen p-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => router.push('/profile')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Profile
            </Button>
            <div className="flex items-center gap-3">
              <Palette className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Theme Management</h1>
                <p className="text-muted-foreground">Administrator theme controls</p>
              </div>
            </div>
          </div>

          {/* Current Theme Status */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Current Theme Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Active Theme</p>
                  <p className="font-semibold">Retro 1950s</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">User Mode</p>
                  <Badge variant="outline">{mode}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Resolved Theme</p>
                  <Badge variant={resolvedTheme === 'light' ? 'default' : 'secondary'}>
                    {resolvedTheme}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Light Mode Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Light Mode Preview
                  <Button
                    variant={previewMode === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setPreviewMode('light')
                      setMode('light')
                    }}
                  >
                    Preview
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 p-4 bg-card border rounded-lg">
                  <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold text-gray-900 mb-2">Sample Card</h3>
                    <p className="text-gray-700 text-sm mb-3">
                      This is how content appears in light mode with the retro theme.
                    </p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-cyan-500 text-white rounded text-sm">
                        Primary
                      </button>
                      <button className="px-3 py-1 bg-yellow-200 text-gray-900 rounded text-sm">
                        Secondary
                      </button>
                      <button className="px-3 py-1 bg-pink-500 text-white rounded text-sm">
                        Accent
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dark Mode Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Dark Mode Preview
                  <Button
                    variant={previewMode === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setPreviewMode('dark')
                      setMode('dark')
                    }}
                  >
                    Preview
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 p-4 bg-card border rounded-lg">
                  <div className="bg-blue-900 p-4 rounded shadow">
                    <h3 className="font-semibold text-yellow-100 mb-2">Sample Card</h3>
                    <p className="text-yellow-50/80 text-sm mb-3">
                      This is how content appears in dark mode with dark blue theme.
                    </p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-cyan-500 text-white rounded text-sm">
                        Primary
                      </button>
                      <button className="px-3 py-1 bg-yellow-200 text-gray-900 rounded text-sm">
                        Secondary
                      </button>
                      <button className="px-3 py-1 bg-pink-500 text-white rounded text-sm">
                        Accent
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Theme Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Retro 1950s Theme Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  This theme captures the vibrant optimism of mid-century design with carefully 
                  balanced colors that maintain excellent readability in both light and dark modes.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Light Mode Colors</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-cyan-500"></div>
                        <span>Primary: Retro Blue (hsl(195, 100%, 45%))</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-yellow-200 border"></div>
                        <span>Secondary: Light Cream (hsl(50, 100%, 85%))</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-pink-500"></div>
                        <span>Accent: Retro Pink (hsl(345, 100%, 55%))</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Dark Mode Colors</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-cyan-500"></div>
                        <span>Primary: Retro Blue (hsl(195, 100%, 45%))</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-yellow-200 border"></div>
                        <span>Secondary: Light Cream (hsl(50, 100%, 85%))</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-pink-500"></div>
                        <span>Accent: Retro Pink (hsl(345, 100%, 55%))</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminOnly>
  )
}
