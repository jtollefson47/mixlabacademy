/**
 * Live CSS Editor Component
 * Allows real-time CSS customization for aesthetic experimentation
 */
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { DifficultyIcon } from '@/components/ui/theme-icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Code, Download, Upload, RotateCcw } from 'lucide-react'

interface CSSVariable {
  name: string
  value: string
  description: string
  type: 'color' | 'size' | 'shadow' | 'animation'
}

const defaultVariables: CSSVariable[] = [
  { name: '--primary', value: '221.2 83.2% 53.3%', description: 'Primary brand color', type: 'color' },
  { name: '--primary-foreground', value: '210 40% 98%', description: 'Primary text color', type: 'color' },
  { name: '--secondary', value: '210 40% 96%', description: 'Secondary color', type: 'color' },
  { name: '--secondary-foreground', value: '222.2 84% 4.9%', description: 'Secondary text color', type: 'color' },
  { name: '--accent', value: '268 83% 58%', description: 'Accent color', type: 'color' },
  { name: '--accent-foreground', value: '210 40% 98%', description: 'Accent text color', type: 'color' },
  { name: '--background', value: '0 0% 100%', description: 'Main background', type: 'color' },
  { name: '--foreground', value: '222.2 84% 4.9%', description: 'Main text color', type: 'color' },
  { name: '--card', value: '0 0% 100%', description: 'Card background', type: 'color' },
  { name: '--card-foreground', value: '222.2 84% 4.9%', description: 'Card text color', type: 'color' },
  { name: '--muted', value: '210 40% 96%', description: 'Muted backgrounds', type: 'color' },
  { name: '--muted-foreground', value: '215.4 16.3% 46.9%', description: 'Muted text', type: 'color' },
  { name: '--border', value: '214.3 31.8% 91.4%', description: 'Border color', type: 'color' },
  { name: '--input', value: '214.3 31.8% 91.4%', description: 'Input border color', type: 'color' },
  { name: '--ring', value: '221.2 83.2% 53.3%', description: 'Focus ring color', type: 'color' },
  { name: '--radius', value: '0.5rem', description: 'Border radius', type: 'size' },
  { name: '--glow-color', value: 'rgba(139, 92, 246, 0.3)', description: 'Glow effect color', type: 'color' },
]

export default function LiveCSSEditor() {
  const [variables, setVariables] = useState<CSSVariable[]>(defaultVariables)
  const [customCSS, setCustomCSS] = useState('')
  const [activeTab, setActiveTab] = useState<'variables' | 'css'>('variables')

  useEffect(() => {
    // Apply CSS variables to document
    variables.forEach(variable => {
      document.documentElement.style.setProperty(variable.name, variable.value)
    })
  }, [variables])

  useEffect(() => {
    // Apply custom CSS
    const styleElement = document.getElementById('live-css')
    if (styleElement) {
      styleElement.textContent = customCSS
    } else {
      const newStyleElement = document.createElement('style')
      newStyleElement.id = 'live-css'
      newStyleElement.textContent = customCSS
      document.head.appendChild(newStyleElement)
    }
  }, [customCSS])

  const updateVariable = (index: number, value: string) => {
    const newVariables = [...variables]
    newVariables[index].value = value
    setVariables(newVariables)
  }

  const resetVariables = () => {
    setVariables(defaultVariables)
    setCustomCSS('')
  }

  const exportStyles = () => {
    const cssExport = `/* Exported CSS Variables */\n:root {\n${variables.map(v => `  ${v.name}: ${v.value};`).join('\n')}\n}\n\n/* Custom CSS */\n${customCSS}`
    
    const blob = new Blob([cssExport], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'custom-theme.css'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importStyles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setCustomCSS(content)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Live CSS Editor
              </CardTitle>
              <CardDescription>
                Experiment with colors, spacing, and custom styles in real-time
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={exportStyles} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button onClick={resetVariables} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Tab Navigation */}
          <div className="flex gap-1 mb-4">
            <Button
              variant={activeTab === 'variables' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('variables')}
            >
              CSS Variables
            </Button>
            <Button
              variant={activeTab === 'css' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('css')}
            >
              Custom CSS
            </Button>
          </div>

          {activeTab === 'variables' && (
            <div className="space-y-4">
              <div className="grid gap-4">
                {variables.map((variable, index) => (
                  <div key={variable.name} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 border rounded-lg">
                    <div>
                      <Label className="font-mono text-sm">{variable.name}</Label>
                      <p className="text-xs text-muted-foreground">{variable.description}</p>
                      <Badge variant="secondary" className="mt-1">
                        {variable.type}
                      </Badge>
                    </div>
                    <div>
                      <Input
                        value={variable.value}
                        onChange={(e) => updateVariable(index, e.target.value)}
                        className="font-mono text-sm"
                        placeholder="Enter value..."
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      {variable.type === 'color' && (
                        <div 
                          className="w-8 h-8 rounded border-2 border-white shadow-sm"
                          style={{ 
                            backgroundColor: variable.value.includes('hsl') 
                              ? variable.value 
                              : `hsl(${variable.value})` 
                          }}
                        />
                      )}
                      <span className="text-xs text-muted-foreground">Live preview</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'css' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="custom-css">Custom CSS</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Write custom CSS that will be applied immediately. Use this to experiment with animations, layouts, or any other styles.
                </p>
                <Textarea
                  id="custom-css"
                  value={customCSS}
                  onChange={(e) => setCustomCSS(e.target.value)}
                  placeholder={`/* Example: Add custom animations */
.custom-animation {
  animation: pulse 2s infinite;
}

/* Override component styles */
.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Add new utility classes */
.text-glow {
  text-shadow: 0 0 10px currentColor;
}`}
                  className="h-64 font-mono text-sm"
                />
              </div>
              
              <div className="flex gap-2">
                <Label htmlFor="import-css" className="cursor-pointer">
                  <Button variant="outline" size="sm" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Import CSS File
                    </span>
                  </Button>
                </Label>
                <Input
                  id="import-css"
                  type="file"
                  accept=".css"
                  onChange={importStyles}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <CardDescription>
            See your changes applied to sample components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Sample Components */}
            <div className="p-6 border-2 border-dashed border-muted rounded-lg space-y-4">
              <h3 className="text-lg font-semibold">Sample Components</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="glass border-glow">
                  <CardHeader>
                    <CardTitle>Game Card</CardTitle>
                    <CardDescription>Sample game with your custom styling</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>⏱️ 15 min</span>
                        <DifficultyIcon level="intermediate" />
                      </div>
                      <Button className="w-full btn-glow">Play Now</Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <h4 className="font-semibold">Button Variations</h4>
                  <div className="flex gap-2 flex-wrap">
                    <Button>Primary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="secondary">Secondary</Button>
                  </div>
                  
                  <h4 className="font-semibold mt-4">Typography</h4>
                  <div>
                    <h1 className="text-2xl font-bold text-gradient">Gradient Text</h1>
                    <p className="text-muted-foreground">Body text example</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
