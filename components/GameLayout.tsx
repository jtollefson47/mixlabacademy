'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Clock, Target, Trophy } from 'lucide-react'

interface GameStats {
  score: number
  level: number
  attempts: number
  timeRemaining?: number
  totalTime?: number
  completed: boolean
}

interface GameLayoutProps {
  title: string
  description: string
  gameStats: GameStats
  children: ReactNode
  controlsContent?: ReactNode
  instructionsContent?: ReactNode
  sidebarContent?: ReactNode
  onBack?: () => void
  backHref?: string
  className?: string
}

export function GameLayout({
  title,
  description,
  gameStats,
  children,
  controlsContent,
  instructionsContent,
  sidebarContent,
  onBack,
  backHref = '/games',
  className = ''
}: GameLayoutProps) {
  return (
    <div className={`min-h-screen bg-background transition-colors duration-300 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 lg:mb-8">
          {backHref && (
            <Link href={backHref as any}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-fit hover:bg-muted transition-colors"
                onClick={onBack}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Games
              </Button>
            </Link>
          )}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              {title}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4 lg:space-y-6">
            {/* Game Stats */}
            <Card className="card-shadow hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Game Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Score</span>
                    <Badge variant="secondary" className="w-full justify-center text-base py-1">
                      {gameStats.score}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Level</span>
                    <Badge variant="outline" className="w-full justify-center text-base py-1">
                      {gameStats.level}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Attempts</span>
                  <div className="text-2xl font-bold text-foreground">{gameStats.attempts}</div>
                </div>

                {/* Timer */}
                {gameStats.timeRemaining !== undefined && gameStats.totalTime && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Time
                      </span>
                      <span className="text-sm font-medium">{gameStats.timeRemaining}s</span>
                    </div>
                    <Progress 
                      value={(gameStats.timeRemaining / gameStats.totalTime) * 100} 
                      className="h-2"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Controls */}
            {controlsContent && (
              <Card className="card-shadow hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Controls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {controlsContent}
                </CardContent>
              </Card>
            )}

            {/* Additional Sidebar Content */}
            {sidebarContent}
          </div>

          {/* Main Game Area */}
          <div className="lg:col-span-3">
            <div className="space-y-4 lg:space-y-6">
              {children}
            </div>

            {/* Instructions */}
            {instructionsContent && (
              <Card className="mt-6 card-shadow hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">How to Play</CardTitle>
                </CardHeader>
                <CardContent>
                  {instructionsContent}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameLayout
