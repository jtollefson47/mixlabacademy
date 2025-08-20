'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import GameLayout from '@/components/GameLayout'
import Link from 'next/link'
import { Play, Pause, RotateCcw, Volume2, ZoomIn, ZoomOut } from 'lucide-react'

interface WaveformData {
  id: string
  name: string
  frequency: number
  amplitude: number
  phase: number
  color: string
}

interface GameState {
  score: number
  level: number
  attempts: number
  completed: boolean
  timeRemaining: number
  targetPhase: number
  userPhase: number
  waveforms: WaveformData[]
  zoomLevel: number
  timeScale: number
}

export default function PhaseAlignmentGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isPlaying, setIsPlaying] = useState(false)
  
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    attempts: 0,
    completed: false,
    timeRemaining: 60,
    targetPhase: 0,
    userPhase: 0,
    zoomLevel: 2,
    timeScale: 1,
    waveforms: [
      { id: 'target', name: 'Target Signal', frequency: 440, amplitude: 0.8, phase: 0, color: '#3b82f6' },
      { id: 'user', name: 'Your Signal', frequency: 440, amplitude: 0.8, phase: 0, color: '#ef4444' }
    ]
  })

  const [phaseControl, setPhaseControl] = useState(0)

  // Generate new challenge
  const generateChallenge = () => {
    const targetPhase = Math.random() * 360 - 180 // -180 to +180 degrees
    setGameState(prev => ({
      ...prev,
      targetPhase,
      userPhase: 0,
      waveforms: [
        { ...prev.waveforms[0], phase: targetPhase },
        { ...prev.waveforms[1], phase: 0 }
      ]
    }))
    setPhaseControl(0)
  }

  // Update user phase
  const updatePhase = (newPhase: number) => {
    setPhaseControl(newPhase)
    setGameState(prev => ({
      ...prev,
      userPhase: newPhase,
      waveforms: [
        prev.waveforms[0],
        { ...prev.waveforms[1], phase: newPhase }
      ]
    }))
  }

  // Zoom controls
  const zoomIn = () => {
    setGameState(prev => ({
      ...prev,
      zoomLevel: Math.min(prev.zoomLevel * 1.5, 10)
    }))
  }

  const zoomOut = () => {
    setGameState(prev => ({
      ...prev,
      zoomLevel: Math.max(prev.zoomLevel / 1.5, 0.5)
    }))
  }

  const resetZoom = () => {
    setGameState(prev => ({
      ...prev,
      zoomLevel: 2,
      timeScale: 1
    }))
  }

  // Check alignment accuracy
  const checkAlignment = () => {
    const phaseDifference = Math.abs(gameState.targetPhase - gameState.userPhase)
    const normalizedDiff = Math.min(phaseDifference, 360 - phaseDifference)
    
    let points = 0
    let accuracy = 'Poor'
    
    if (normalizedDiff <= 5) {
      points = 100
      accuracy = 'Perfect'
    } else if (normalizedDiff <= 15) {
      points = 80
      accuracy = 'Excellent'
    } else if (normalizedDiff <= 30) {
      points = 60
      accuracy = 'Good'
    } else if (normalizedDiff <= 45) {
      points = 40
      accuracy = 'Fair'
    }

    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
      attempts: prev.attempts + 1,
      level: Math.floor((prev.score + points) / 500) + 1
    }))

    // Show feedback
    alert(`${accuracy}! Phase difference: ${normalizedDiff.toFixed(1)}° | Points: ${points}`)
    
    // Generate next challenge
    setTimeout(generateChallenge, 1000)
  }

  // Draw waveforms
  const drawWaveforms = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerY = height / 2
    const time = Date.now() * 0.001

    // Clear canvas
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 1
    
    // Vertical grid lines - adjust spacing based on zoom
    const verticalSpacing = Math.max(20, 80 / gameState.zoomLevel)
    for (let i = 0; i * verticalSpacing <= width; i++) {
      const x = i * verticalSpacing
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = (height / 4) * i
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw center line
    ctx.strokeStyle = '#666'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.stroke()

    // Draw waveforms with improved frequency scaling
    gameState.waveforms.forEach((wave) => {
      ctx.strokeStyle = wave.color
      ctx.lineWidth = 3
      ctx.beginPath()

      for (let x = 0; x < width; x++) {
        // Improved frequency calculation for better visibility
        // Base frequency scaled by zoom level for better wave visibility
        const baseFrequency = 0.02 // Increased from 0.01 for longer waves
        const frequency = (baseFrequency / gameState.zoomLevel) * gameState.timeScale
        const phase = (wave.phase * Math.PI) / 180
        const animatedPhase = isPlaying ? time * 2 : 0
        
        // Enhanced amplitude scaling
        const amplitudeScale = Math.min(100, 80 * gameState.zoomLevel)
        const y = centerY + Math.sin(x * frequency + phase + animatedPhase) * wave.amplitude * amplitudeScale
        
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
    })

    // Draw phase difference indicator with enhanced styling
    const phaseDiff = Math.abs(gameState.targetPhase - gameState.userPhase)
    const normalizedDiff = Math.min(phaseDiff, 360 - phaseDiff)
    
    // Enhanced phase difference display
    ctx.fillStyle = normalizedDiff <= 15 ? '#22c55e' : normalizedDiff <= 45 ? '#eab308' : '#ef4444'
    ctx.fillRect(width - 200, 20, 180, 50)
    ctx.fillStyle = '#ffffff'
    ctx.font = '16px monospace'
    ctx.fillText(`Phase Δ: ${normalizedDiff.toFixed(1)}°`, width - 190, 40)
    ctx.font = '12px monospace'
    ctx.fillText(`Zoom: ${gameState.zoomLevel.toFixed(1)}x`, width - 190, 55)

    // Draw zoom indicator
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.fillRect(10, 10, 120, 30)
    ctx.fillStyle = '#ffffff'
    ctx.font = '12px monospace'
    ctx.fillText(`Zoom: ${gameState.zoomLevel.toFixed(1)}x`, 15, 30)
  }

  // Animation loop
  useEffect(() => {
    const animate = () => {
      drawWaveforms()
      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }
    
    if (isPlaying) {
      animate()
    } else {
      drawWaveforms()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, gameState.waveforms, gameState.targetPhase, gameState.userPhase, gameState.zoomLevel, gameState.timeScale])

  // Initialize
  useEffect(() => {
    generateChallenge()
  }, [])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case '=':
        case '+':
          event.preventDefault()
          zoomIn()
          break
        case '-':
          event.preventDefault()
          zoomOut()
          break
        case '0':
          event.preventDefault()
          resetZoom()
          break
        case ' ':
          event.preventDefault()
          setIsPlaying(!isPlaying)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying])

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeRemaining <= 1) {
          return { ...prev, timeRemaining: 0, completed: true }
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const controlsContent = (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          variant={isPlaying ? 'destructive' : 'default'}
          size='sm'
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button onClick={generateChallenge} variant="outline" size="sm">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Zoom Controls */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Zoom Level: {gameState.zoomLevel.toFixed(1)}x</label>
        <div className="flex gap-2">
          <Button onClick={zoomOut} variant="outline" size="sm" className="flex-1">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button onClick={resetZoom} variant="outline" size="sm" className="flex-1 text-xs">
            Reset
          </Button>
          <Button onClick={zoomIn} variant="outline" size="sm" className="flex-1">
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Zoom in to see wave details, zoom out for full cycles</p>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Phase Adjustment: {phaseControl.toFixed(1)}°</label>
        <input
          type="range"
          min="-180"
          max="180"
          step="1"
          value={phaseControl}
          onChange={(e) => updatePhase(parseFloat(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>-180°</span>
          <span>0°</span>
          <span>+180°</span>
        </div>
      </div>

      <Button onClick={checkAlignment} className="w-full" disabled={gameState.completed}>
        Check Alignment
      </Button>
    </div>
  )

  const sidebarContent = (
    <Card className="card-shadow hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg">Legend</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 bg-blue-500 rounded"></div>
          <span className="text-sm">Target Signal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 bg-red-500 rounded"></div>
          <span className="text-sm">Your Signal</span>
        </div>
      </CardContent>
    </Card>
  )

  const instructionsContent = (
    <div className="space-y-2 text-sm">
      <p>• <strong>Objective:</strong> Align your signal's phase with the target signal</p>
      <p>• <strong>Controls:</strong> Use the phase slider to adjust your signal (-180° to +180°)</p>
      <p>• <strong>Zoom:</strong> Use zoom controls to see wave details (zoom in) or full cycles (zoom out)</p>
      <p>• <strong>Keyboard:</strong> + (zoom in), - (zoom out), 0 (reset zoom), Space (play/pause)</p>
      <p>• <strong>Scoring:</strong> Perfect alignment (≤5°) = 100 points, Excellent (≤15°) = 80 points</p>
      <p>• <strong>Visual:</strong> Click Play to see the waveforms animate and understand phase relationships</p>
      <p>• <strong>Goal:</strong> Get as many perfect alignments as possible in 60 seconds</p>
      <p>• <strong>Tip:</strong> Start zoomed out to see wave patterns, then zoom in for fine adjustments</p>
    </div>
  )

  return (
    <GameLayout
      title="Phase Alignment Challenge"
      description="Align the phase of your signal with the target"
      gameStats={{
        score: gameState.score,
        level: gameState.level,
        attempts: gameState.attempts,
        timeRemaining: gameState.timeRemaining,
        totalTime: 60,
        completed: gameState.completed
      }}
      controlsContent={controlsContent}
      instructionsContent={instructionsContent}
      sidebarContent={sidebarContent}
    >
      {/* Waveform Display */}
      <Card className="card-shadow hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-primary" />
            Waveform Visualization
          </CardTitle>
          <CardDescription>
            Adjust the phase to align your signal (red) with the target (blue)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full border border-border rounded-lg bg-card hover:bg-muted/10 transition-colors duration-300"
          />
        </CardContent>
      </Card>

      {/* Game Over Modal */}
      {gameState.completed && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          <Card className="card-shadow w-96 mx-4">
            <CardHeader>
              <CardTitle>Game Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-2xl font-bold text-primary">Final Score: {gameState.score}</p>
                <p>Level Reached: {gameState.level}</p>
                <p>Total Attempts: {gameState.attempts}</p>
                <p>Accuracy: {gameState.attempts > 0 ? ((gameState.score / (gameState.attempts * 100)) * 100).toFixed(1) : 0}%</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => window.location.reload()} className="flex-1">
                  Play Again
                </Button>
                <Link href="/games" className="flex-1">
                  <Button variant="outline" className="w-full">
                    More Games
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </GameLayout>
  )
}
