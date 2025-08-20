'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import GameLayout from '@/components/GameLayout'
import { Play, Pause, RotateCcw, Volume2, Zap, Activity } from 'lucide-react'

interface CompressionSettings {
  threshold: number
  ratio: number
  attack: number
  release: number
  makeupGain: number
}

interface GameState {
  score: number
  level: number
  attempts: number
  completed: boolean
  timeRemaining: number
  targetSettings: CompressionSettings
  userSettings: CompressionSettings
  signalType: string
  isPlaying: boolean
}

type MeterMode = 'input' | 'output' | 'gain-reduction'

export default function CompressionGame() {
  const vuMeterRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [meterMode, setMeterMode] = useState<MeterMode>('gain-reduction')
  
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    attempts: 0,
    completed: false,
    timeRemaining: 60,
    targetSettings: { threshold: -12, ratio: 4, attack: 5, release: 50, makeupGain: 3 },
    userSettings: { threshold: -20, ratio: 1, attack: 10, release: 100, makeupGain: 0 },
    signalType: 'Vocal',
    isPlaying: false
  })

  const signalTypes = ['Vocal', 'Drum Bus', 'Bass', 'Mix Bus']

  // Generate new challenge
  const generateChallenge = () => {
    const signal = signalTypes[Math.floor(Math.random() * signalTypes.length)]
    const level = gameState.level
    
    let targetSettings: CompressionSettings
    
    switch (signal) {
      case 'Vocal':
        targetSettings = {
          threshold: -12 - (level * 2) + Math.random() * 4 - 2,
          ratio: 3 + (level * 0.5) + Math.random() * 2 - 1,
          attack: 3 + Math.random() * 7,
          release: 50 + Math.random() * 100,
          makeupGain: 2 + Math.random() * 4
        }
        break
      case 'Drum Bus':
        targetSettings = {
          threshold: -6 - (level * 1.5) + Math.random() * 3 - 1.5,
          ratio: 4 + (level * 0.8) + Math.random() * 3 - 1.5,
          attack: 0.5 + Math.random() * 2,
          release: 20 + Math.random() * 50,
          makeupGain: 1 + Math.random() * 3
        }
        break
      case 'Bass':
        targetSettings = {
          threshold: -15 - (level * 2) + Math.random() * 4 - 2,
          ratio: 2.5 + (level * 0.3) + Math.random() * 1.5 - 0.75,
          attack: 8 + Math.random() * 12,
          release: 80 + Math.random() * 120,
          makeupGain: 3 + Math.random() * 5
        }
        break
      default: // Mix Bus
        targetSettings = {
          threshold: -8 - (level * 1.5) + Math.random() * 3 - 1.5,
          ratio: 2.5 + (level * 0.4) + Math.random() * 1.5 - 0.75,
          attack: 5 + Math.random() * 10,
          release: 60 + Math.random() * 100,
          makeupGain: 1 + Math.random() * 3
        }
    }

    setGameState(prev => ({
      ...prev,
      targetSettings,
      signalType: signal,
      userSettings: { threshold: -20, ratio: 1, attack: 10, release: 100, makeupGain: 0 }
    }))
  }

  // Update user settings
  const updateSetting = (setting: keyof CompressionSettings, value: number) => {
    setGameState(prev => ({
      ...prev,
      userSettings: { ...prev.userSettings, [setting]: value }
    }))
  }

  // Check settings accuracy
  const checkSettings = () => {
    const { targetSettings, userSettings } = gameState
    
    const thresholdDiff = Math.abs(targetSettings.threshold - userSettings.threshold) / Math.abs(targetSettings.threshold)
    const ratioDiff = Math.abs(targetSettings.ratio - userSettings.ratio) / targetSettings.ratio
    const attackDiff = Math.abs(targetSettings.attack - userSettings.attack) / targetSettings.attack
    const releaseDiff = Math.abs(targetSettings.release - userSettings.release) / targetSettings.release
    const gainDiff = Math.abs(targetSettings.makeupGain - userSettings.makeupGain) / Math.max(targetSettings.makeupGain, 1)
    
    const weightedError = thresholdDiff * 0.3 + ratioDiff * 0.3 + attackDiff * 0.15 + releaseDiff * 0.15 + gainDiff * 0.1
    
    let points = 0
    if (weightedError <= 0.1) points = 100
    else if (weightedError <= 0.2) points = 85
    else if (weightedError <= 0.35) points = 70
    else if (weightedError <= 0.5) points = 50
    else points = 25

    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
      attempts: prev.attempts + 1,
      level: Math.floor((prev.score + points) / 350) + 1
    }))

    setTimeout(generateChallenge, 1500)
  }

  // Draw professional VU meter
  const drawVUMeter = () => {
    const canvas = vuMeterRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) * 0.4

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Calculate current levels
    const baseInputLevel = -12 + (isPlaying ? Math.sin(Date.now() * 0.003) * 8 + (Math.random() - 0.5) * 3 : 0)
    const settings = gameState.userSettings
    
    let gainReduction = 0
    let outputLevel = baseInputLevel
    
    if (baseInputLevel > settings.threshold) {
      const overThreshold = baseInputLevel - settings.threshold
      gainReduction = overThreshold * (1 - 1/settings.ratio)
      outputLevel = baseInputLevel - gainReduction + settings.makeupGain
    } else {
      outputLevel = baseInputLevel + settings.makeupGain
    }

    // Determine current meter value based on mode
    let meterValue: number
    let meterColor: string
    let meterLabel: string
    let maxValue: number

    switch (meterMode) {
      case 'input':
        meterValue = baseInputLevel
        meterColor = '#00ff88'
        meterLabel = 'INPUT'
        maxValue = 60 // -60dB to 0dB range
        break
      case 'output':
        meterValue = outputLevel
        meterColor = '#0088ff'
        meterLabel = 'OUTPUT'
        maxValue = 60
        break
      case 'gain-reduction':
        meterValue = gainReduction
        meterColor = '#ff6b35'
        meterLabel = 'GR'
        maxValue = 20 // 0dB to -20dB gain reduction
        break
    }

    // Draw VU meter background circle
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI * 0.75, Math.PI * 2.25)
    ctx.stroke()

    // Draw scale markings
    ctx.strokeStyle = '#666'
    ctx.lineWidth = 2
    ctx.font = '10px -apple-system, system-ui'
    ctx.fillStyle = '#999'
    ctx.textAlign = 'center'

    for (let i = 0; i <= 10; i++) {
      const angle = Math.PI * 0.75 + (i / 10) * Math.PI * 1.5
      const x1 = centerX + Math.cos(angle) * (radius - 15)
      const y1 = centerY + Math.sin(angle) * (radius - 15)
      const x2 = centerX + Math.cos(angle) * (radius - 5)
      const y2 = centerY + Math.sin(angle) * (radius - 5)
      
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      // Scale labels
      if (meterMode === 'gain-reduction') {
        const label = (i * 2).toString() // 0, 2, 4... 20
        const labelX = centerX + Math.cos(angle) * (radius - 25)
        const labelY = centerY + Math.sin(angle) * (radius - 25)
        ctx.fillText(label, labelX, labelY + 3)
      } else {
        const label = (-60 + i * 6).toString() // -60, -54, -48... 0
        const labelX = centerX + Math.cos(angle) * (radius - 25)
        const labelY = centerY + Math.sin(angle) * (radius - 25)
        ctx.fillText(label, labelX, labelY + 3)
      }
    }

    // Draw meter needle
    let needleAngle: number
    if (meterMode === 'gain-reduction') {
      needleAngle = Math.PI * 0.75 + (Math.min(meterValue, maxValue) / maxValue) * Math.PI * 1.5
    } else {
      const normalizedValue = Math.max(0, Math.min(1, (meterValue + 60) / 60))
      needleAngle = Math.PI * 0.75 + normalizedValue * Math.PI * 1.5
    }

    const needleLength = radius - 10
    const needleX = centerX + Math.cos(needleAngle) * needleLength
    const needleY = centerY + Math.sin(needleAngle) * needleLength

    // Needle shadow
    ctx.strokeStyle = '#00000080'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(centerX + 1, centerY + 1)
    ctx.lineTo(needleX + 1, needleY + 1)
    ctx.stroke()

    // Needle
    ctx.strokeStyle = meterColor
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(needleX, needleY)
    ctx.stroke()

    // Center circle
    ctx.fillStyle = '#444'
    ctx.beginPath()
    ctx.arc(centerX, centerY, 8, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.strokeStyle = meterColor
    ctx.lineWidth = 2
    ctx.stroke()

    // Meter label and value
    ctx.font = 'bold 14px -apple-system, system-ui'
    ctx.fillStyle = meterColor
    ctx.textAlign = 'center'
    ctx.fillText(meterLabel, centerX, height - 40)
    
    ctx.font = '12px -apple-system, system-ui'
    ctx.fillStyle = '#fff'
    if (meterMode === 'gain-reduction') {
      ctx.fillText(`-${meterValue.toFixed(1)} dB`, centerX, height - 20)
    } else {
      ctx.fillText(`${meterValue.toFixed(1)} dB`, centerX, height - 20)
    }
  }

  // Animation loop
  useEffect(() => {
    drawVUMeter()
  }, [gameState.userSettings, isPlaying, meterMode])

  // Meter animation when playing
  useEffect(() => {
    let animationFrame: number
    
    if (isPlaying) {
      const animate = () => {
        drawVUMeter()
        animationFrame = requestAnimationFrame(animate)
      }
      animate()
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isPlaying, gameState.userSettings, meterMode])

  // Initialize
  useEffect(() => {
    generateChallenge()
  }, [])

  return (
    <GameLayout
      title="Compression Master"
      description="Learn compression by matching target settings"
      gameStats={{
        score: gameState.score,
        level: gameState.level,
        attempts: gameState.attempts,
        completed: gameState.completed
      }}
    >
      <style jsx>{`
        .slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 3px;
          outline: none;
          transition: all 0.2s;
        }
        
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #374151;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          transition: all 0.2s;
        }
        
        .slider::-webkit-slider-thumb:hover {
          background: #f3f4f6;
          transform: scale(1.1);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #374151;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
      `}</style>
      <div className="max-w-4xl mx-auto">
        {/* Compressor Unit */}
        <div className="bg-gradient-to-b from-gray-700 to-gray-900 p-8 rounded-lg border-2 border-gray-600 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">COMPRESSOR</h2>
            <div className="text-lg text-orange-400">{gameState.signalType} Signal</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* VU Meter */}
            <div className="flex flex-col items-center">
              <div className="bg-black p-4 rounded-lg border border-gray-500 mb-4">
                <canvas
                  ref={vuMeterRef}
                  width={200}
                  height={200}
                  className="block"
                />
              </div>
              
              {/* Meter Mode Selector */}
              <div className="flex gap-1 bg-gray-800 p-1 rounded">
                {(['input', 'output', 'gain-reduction'] as MeterMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setMeterMode(mode)}
                    className={`px-3 py-1 text-xs rounded transition-colors ${
                      meterMode === mode 
                        ? 'bg-orange-500 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    {mode === 'gain-reduction' ? 'GR' : mode.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls Column 1 */}
            <div className="space-y-6">
              {/* Threshold */}
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-300 mb-2">THRESHOLD</label>
                <div className="relative">
                  <input
                    type="range"
                    min="-60"
                    max="0"
                    step="0.5"
                    value={gameState.userSettings.threshold}
                    onChange={(e) => updateSetting('threshold', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #ff6b35 0%, #ff6b35 ${((gameState.userSettings.threshold + 60) / 60) * 100}%, #374151 ${((gameState.userSettings.threshold + 60) / 60) * 100}%, #374151 100%)`
                    }}
                  />
                </div>
                <div className="text-orange-400 font-mono text-lg mt-2">
                  {gameState.userSettings.threshold.toFixed(1)} dB
                </div>
              </div>

              {/* Ratio */}
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-300 mb-2">RATIO</label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.1"
                    value={gameState.userSettings.ratio}
                    onChange={(e) => updateSetting('ratio', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((gameState.userSettings.ratio - 1) / 19) * 100}%, #374151 ${((gameState.userSettings.ratio - 1) / 19) * 100}%, #374151 100%)`
                    }}
                  />
                </div>
                <div className="text-blue-400 font-mono text-lg mt-2">
                  {gameState.userSettings.ratio >= 20 ? '∞:1' : `${gameState.userSettings.ratio.toFixed(1)}:1`}
                </div>
              </div>

              {/* Attack */}
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-300 mb-2">ATTACK</label>
                <div className="relative">
                  <input
                    type="range"
                    min="0.1"
                    max="100"
                    step="0.1"
                    value={gameState.userSettings.attack}
                    onChange={(e) => updateSetting('attack', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #10b981 ${((Math.log(gameState.userSettings.attack) - Math.log(0.1)) / (Math.log(100) - Math.log(0.1))) * 100}%, #374151 ${((Math.log(gameState.userSettings.attack) - Math.log(0.1)) / (Math.log(100) - Math.log(0.1))) * 100}%, #374151 100%)`
                    }}
                  />
                </div>
                <div className="text-green-400 font-mono text-lg mt-2">
                  {gameState.userSettings.attack.toFixed(1)} ms
                </div>
              </div>
            </div>

            {/* Controls Column 2 */}
            <div className="space-y-6">
              {/* Release */}
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-300 mb-2">RELEASE</label>
                <div className="relative">
                  <input
                    type="range"
                    min="10"
                    max="3000"
                    step="10"
                    value={gameState.userSettings.release}
                    onChange={(e) => updateSetting('release', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((Math.log(gameState.userSettings.release) - Math.log(10)) / (Math.log(3000) - Math.log(10))) * 100}%, #374151 ${((Math.log(gameState.userSettings.release) - Math.log(10)) / (Math.log(3000) - Math.log(10))) * 100}%, #374151 100%)`
                    }}
                  />
                </div>
                <div className="text-purple-400 font-mono text-lg mt-2">
                  {gameState.userSettings.release >= 1000 ? 
                    `${(gameState.userSettings.release / 1000).toFixed(1)}s` : 
                    `${gameState.userSettings.release.toFixed(0)}ms`}
                </div>
              </div>

              {/* Makeup Gain */}
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-300 mb-2">MAKEUP GAIN</label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.1"
                    value={gameState.userSettings.makeupGain}
                    onChange={(e) => updateSetting('makeupGain', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(gameState.userSettings.makeupGain / 20) * 100}%, #374151 ${(gameState.userSettings.makeupGain / 20) * 100}%, #374151 100%)`
                    }}
                  />
                </div>
                <div className="text-cyan-400 font-mono text-lg mt-2">
                  +{gameState.userSettings.makeupGain.toFixed(1)} dB
                </div>
              </div>

              {/* Transport Controls */}
              <div className="flex flex-col items-center space-y-4 mt-8">
                <div className="flex gap-3">
                  <Button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    variant={isPlaying ? "destructive" : "default"}
                    size="lg"
                    className="w-20"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button onClick={generateChallenge} variant="outline" size="lg">
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                </div>
                
                <Button onClick={checkSettings} className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                  CHECK SETTINGS
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Game Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-400">{gameState.score}</div>
            <div className="text-sm text-gray-400">Score</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-400">{gameState.level}</div>
            <div className="text-sm text-gray-400">Level</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">{gameState.attempts}</div>
            <div className="text-sm text-gray-400">Attempts</div>
          </div>
        </div>
      </div>
    </GameLayout>
  )
}