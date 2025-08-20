'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TargetIcon } from '@/components/ui/theme-icons'
import { Band, EqScore } from '@/lib/eq/types'
import { scoreEqMatch } from '@/lib/eq/scoring'
import { EqGraph } from './EqGraph'
import GameLayout from '@/components/GameLayout'

// Hardcoded target for now - later this could be randomized or from a database
const TARGET_BANDS: Band[] = [
  { id: 'target-1', freq: 150, gainDb: +3, q: 1.2, type: 'peak' },
  { id: 'target-2', freq: 1200, gainDb: -4, q: 0.8, type: 'peak' },
  { id: 'target-3', freq: 6800, gainDb: +2, q: 2.1, type: 'peak' }
]

export default function EqMatchPage() {
  // Unified state for both graph and sliders - start with 3 adjustable bands
  const [userBands, setUserBands] = useState<Band[]>([
    { id: 'user-1', freq: 100, gainDb: 0, q: 1.0, type: 'peak' },
    { id: 'user-2', freq: 1000, gainDb: 0, q: 1.0, type: 'peak' },
    { id: 'user-3', freq: 8000, gainDb: 0, q: 1.0, type: 'peak' }
  ])
  const [currentScore, setCurrentScore] = useState<EqScore | null>(null)

  const handleSubmit = useCallback(() => {
    const score = scoreEqMatch(userBands, TARGET_BANDS)
    setCurrentScore(score)

    // Store last score in localStorage (best-effort)
    try {
      localStorage.setItem('eq-match-last-score', JSON.stringify({
        score: score.total,
        timestamp: Date.now()
      }))
    } catch (error) {
      // Storage failed, continue silently
      console.warn('Could not save score to localStorage:', error)
    }
  }, [userBands])

  const handleBandsChange = useCallback((bands: Band[]) => {
    setUserBands(bands)
  }, [])

  // Get last score from localStorage
  const getLastScore = (): number | null => {
    try {
      const stored = localStorage.getItem('eq-match-last-score')
      if (stored) {
        const data = JSON.parse(stored)
        return data.score
      }
    } catch (error) {
      // Storage failed, return null
    }
    return null
  }

  const lastScore = typeof window !== 'undefined' ? getLastScore() : null

  // Calculate current game stats
  const totalAttempts = typeof window !== 'undefined' ? 
    parseInt(localStorage.getItem('eq-match-attempts') || '0') : 0
  const level = Math.floor(totalAttempts / 10) + 1

  const controlsContent = (
    <div className="space-y-4">
      <Button 
        onClick={handleSubmit}
        size="lg"
        className="w-full"
      >
        Check Score
      </Button>
      
      {lastScore !== null && !currentScore && (
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Last score: <span className="font-bold text-primary">{lastScore}</span>
          </p>
        </div>
      )}
    </div>
  )

  const instructionsContent = (
    <div className="space-y-2 text-sm">
      <p>• <strong>Objective:</strong> Match the target EQ curve as closely as possible</p>
      <p>• <strong>Selection:</strong> Click a band number (1, 2, 3) to select it</p>
      <p>• <strong>Adjustment:</strong> Drag the point on the graph or use the controls below</p>
      <p>• <strong>Target:</strong> Try to match the yellow dashed target curve</p>
      <p>• <strong>Controls:</strong> Use integrated sliders for frequency, gain, Q, and filter type</p>
      <p>• <strong>Real-time:</strong> Watch your current EQ values update as you make adjustments</p>
      <p>• <strong>Scoring:</strong> Perfect match gets maximum points, close matches get partial credit</p>
    </div>
  )

  return (
    <GameLayout
      title="EQ Match Challenge"
      description="Train your ear by matching the target EQ curve. Use the professional EQ interface with both visual graph and precise controls."
      gameStats={{
        score: currentScore?.total || 0,
        level: level,
        attempts: totalAttempts,
        completed: false
      }}
      controlsContent={controlsContent}
      instructionsContent={instructionsContent}
    >
      {/* Target Information */}
      <Card className="card-shadow hover:shadow-lg transition-shadow duration-300 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TargetIcon size="sm" />
            Target EQ Settings
          </CardTitle>
          <CardDescription>
            Match these frequency adjustments using the graph below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TARGET_BANDS.map((band, index) => (
              <div key={index} className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold text-lg">{band.freq}Hz</div>
                <div className="text-2xl font-bold text-primary">
                  {band.gainDb > 0 ? '+' : ''}{band.gainDb}dB
                </div>
                <div className="text-sm text-muted-foreground">Q: {band.q}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* EQ Graph with Integrated Controls */}
      <div className="mb-6">
        <EqGraph
          targetBands={TARGET_BANDS}
          userBands={userBands}
          onBandsChange={handleBandsChange}
          className="mb-4"
        />
      </div>

      {/* Current EQ Values Display */}
      <Card className="card-shadow hover:shadow-lg transition-shadow duration-300 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span role="img" aria-label="Current values">📊</span>
            Your Current EQ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userBands.map((band, index) => (
              <div key={index} className="text-center p-3 bg-muted rounded-lg">
                <div className="font-semibold text-lg">{band.freq.toFixed(0)}Hz</div>
                <div className="text-2xl font-bold text-primary">
                  {band.gainDb > 0 ? '+' : ''}{band.gainDb.toFixed(1)}dB
                </div>
                <div className="text-sm text-muted-foreground">Q: {(band.q ?? 1.0).toFixed(1)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Score Display */}
      {currentScore && (
        <Card className="card-shadow hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span role="img" aria-label="Score">🏆</span>
              Your Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* ARIA live region for score announcement */}
            <div 
              role="status" 
              aria-live="polite" 
              className="text-center mb-6"
            >
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                Score: {currentScore.total}
              </div>
              <div className="text-lg text-muted-foreground">
                {currentScore.total >= 90 ? 'Excellent! 🎉' :
                 currentScore.total >= 75 ? 'Great job! 👏' :
                 currentScore.total >= 50 ? 'Good effort! 👍' :
                 'Keep practicing! 💪'}
              </div>
            </div>

            {/* Per-band breakdown */}
            <div className="space-y-3">
              <h3 className="font-semibold text-center">Frequency Breakdown:</h3>
              {currentScore.perBand.map((result, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <span className="font-medium">{result.freq}Hz</span>
                  <div className="text-right">
                    <div className="font-bold text-green-600 dark:text-green-400">
                      {result.score} points
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isNaN(result.deltaDb) ? 'No adjustment' : 
                       `${Math.abs(result.deltaDb).toFixed(1)}dB ${result.deltaDb > 0 ? 'high' : 'low'}`}
                      {result.deltaFreq !== undefined && !isNaN(result.deltaFreq) && `, ${Math.abs(result.deltaFreq).toFixed(0)}Hz ${result.deltaFreq > 0 ? 'high' : 'low'}`}
                      {result.deltaQ !== undefined && !isNaN(result.deltaQ) && `, Q ${result.deltaQ > 0 ? '+' : ''}${result.deltaQ.toFixed(1)}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </GameLayout>
  )
}
