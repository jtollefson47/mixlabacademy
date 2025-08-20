'use client'

import React, { useRef, useCallback, useState, useMemo } from 'react'
import { Band } from '@/lib/eq/types'

interface EqGraphProps {
  targetBands: Band[]
  userBands: Band[]
  onBandsChange: (bands: Band[]) => void
  className?: string
}

const GRAPH_WIDTH = 800
const GRAPH_HEIGHT = 400
const PADDING = 60
const MIN_FREQ = 20
const MAX_FREQ = 20000
const MIN_GAIN = -12
const MAX_GAIN = 12

// Memoized utility functions for better performance
const freqToX = (freq: number): number => {
  const logMin = Math.log10(MIN_FREQ)
  const logMax = Math.log10(MAX_FREQ)
  const logFreq = Math.log10(Math.max(MIN_FREQ, Math.min(MAX_FREQ, freq)))
  return PADDING + ((logFreq - logMin) / (logMax - logMin)) * (GRAPH_WIDTH - 2 * PADDING)
}

const xToFreq = (x: number): number => {
  const normalizedX = Math.max(0, Math.min(1, (x - PADDING) / (GRAPH_WIDTH - 2 * PADDING)))
  const logMin = Math.log10(MIN_FREQ)
  const logMax = Math.log10(MAX_FREQ)
  const logFreq = logMin + normalizedX * (logMax - logMin)
  return Math.pow(10, logFreq)
}

const gainToY = (gain: number): number => {
  const clampedGain = Math.max(MIN_GAIN, Math.min(MAX_GAIN, gain))
  return PADDING + ((MAX_GAIN - clampedGain) / (MAX_GAIN - MIN_GAIN)) * (GRAPH_HEIGHT - 2 * PADDING)
}

const yToGain = (y: number): number => {
  const normalizedY = Math.max(0, Math.min(1, (y - PADDING) / (GRAPH_HEIGHT - 2 * PADDING)))
  return MAX_GAIN - normalizedY * (MAX_GAIN - MIN_GAIN)
}

// Optimized EQ curve generation with better filter modeling
const generateEqCurve = (bands: Band[]): string => {
  if (!bands.length) return ''
  
  const points: [number, number][] = []
  const numPoints = 100 // Reduced for better performance
  
  for (let i = 0; i <= numPoints; i++) {
    const logMin = Math.log10(MIN_FREQ)
    const logMax = Math.log10(MAX_FREQ)
    const logFreq = logMin + (i / numPoints) * (logMax - logMin)
    const freq = Math.pow(10, logFreq)
    
    let totalGain = 0
    
    for (const band of bands) {
      const q = band.q ?? 1.0
      const type = band.type ?? 'peak'
      
      // More accurate filter response calculation
      switch (type) {
        case 'peak':
        case 'notch': {
          const ratio = freq / band.freq
          const logRatio = Math.log(ratio)
          const qFactor = Math.max(0.1, q) // Prevent division by zero
          const response = 1 / (1 + Math.pow(logRatio * qFactor * 2, 2))
          totalGain += band.gainDb * response * (type === 'notch' ? -1 : 1)
          break
        }
        case 'highpass': {
          const cutoffResponse = freq >= band.freq ? 1 : Math.pow(freq / band.freq, q * 2)
          totalGain += band.gainDb * cutoffResponse
          break
        }
        case 'lowpass': {
          const cutoffResponse = freq <= band.freq ? 1 : Math.pow(band.freq / freq, q * 2)
          totalGain += band.gainDb * cutoffResponse
          break
        }
        case 'highshelf': {
          const shelfResponse = freq >= band.freq ? 1 : 0.5 + 0.5 * Math.tanh((freq - band.freq) / (band.freq / q))
          totalGain += band.gainDb * shelfResponse
          break
        }
        case 'lowshelf': {
          const shelfResponse = freq <= band.freq ? 1 : 0.5 + 0.5 * Math.tanh((band.freq - freq) / (band.freq / q))
          totalGain += band.gainDb * shelfResponse
          break
        }
      }
    }
    
    // Clamp to display range with smooth limiting
    totalGain = Math.max(MIN_GAIN, Math.min(MAX_GAIN, totalGain))
    points.push([freqToX(freq), gainToY(totalGain)])
  }
  
  if (points.length === 0) return ''
  
  // Generate smooth path with better curve interpolation
  let path = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`
  
  for (let i = 1; i < points.length; i++) {
    const prevPoint = points[i - 1]
    const currentPoint = points[i]
    
    // Use quadratic Bézier curves for smoother lines
    if (i === 1) {
      path += ` L ${currentPoint[0].toFixed(1)} ${currentPoint[1].toFixed(1)}`
    } else {
      const midX = (prevPoint[0] + currentPoint[0]) / 2
      const midY = (prevPoint[1] + currentPoint[1]) / 2
      path += ` Q ${prevPoint[0].toFixed(1)} ${prevPoint[1].toFixed(1)} ${midX.toFixed(1)} ${midY.toFixed(1)}`
    }
  }
  
  return path
}

export function EqGraph({ targetBands, userBands, onBandsChange, className = '' }: EqGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dragState, setDragState] = useState<{
    bandId: string
    offsetX: number
    offsetY: number
  } | null>(null)
  const [hoveredBand, setHoveredBand] = useState<string | null>(null)
  const [selectedBand, setSelectedBand] = useState<string | null>(null)

  // Ensure all bands have required properties with defaults
  const normalizedUserBands = useMemo(() => 
    userBands.map((band, index) => ({
      ...band,
      id: band.id ?? `user-${index}`,
      q: band.q ?? 1.0,
      type: band.type ?? 'peak' as const
    })), [userBands]
  )

  const normalizedTargetBands = useMemo(() => 
    targetBands.map((band, index) => ({
      ...band,
      id: band.id ?? `target-${index}`,
      q: band.q ?? 1.0,
      type: band.type ?? 'peak' as const
    })), [targetBands]
  )

  // Generate frequency and gain grid lines
  const frequencyGridLines = [50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]
  const gainGridLines = [-12, -6, 0, 6, 12]

  // Generate curves
  const userCurve = generateEqCurve(normalizedUserBands)
  const targetCurve = generateEqCurve(normalizedTargetBands)

  // Handle mouse/touch start with improved error handling
  const handlePointerDown = useCallback((e: React.PointerEvent, bandId: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Find the band being dragged
    const band = normalizedUserBands.find(b => b.id === bandId)
    if (!band) return
    
    // Select this band for editing
    setSelectedBand(bandId)
    
    // Calculate offset from cursor to band center for smooth dragging
    const bandX = freqToX(band.freq)
    const bandY = gainToY(band.gainDb)
    
    setDragState({
      bandId,
      offsetX: x - bandX,
      offsetY: y - bandY
    })
    
    // Capture pointer for smooth dragging with error handling
    try {
      const target = e.currentTarget as Element
      if (target.setPointerCapture) {
        target.setPointerCapture(e.pointerId)
      }
    } catch (error) {
      console.warn('Pointer capture failed:', error)
    }
  }, [normalizedUserBands])

  // Handle mouse/touch move with optimized updates
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragState) return
    
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return

    // Get cursor position and subtract the initial offset
    const cursorX = e.clientX - rect.left
    const cursorY = e.clientY - rect.top
    
    // Apply offset to make the band follow cursor smoothly
    const targetX = cursorX - dragState.offsetX
    const targetY = cursorY - dragState.offsetY
    
    // Convert to frequency and gain with bounds checking and rounding
    const newFreq = Math.round(Math.max(MIN_FREQ, Math.min(MAX_FREQ, xToFreq(targetX))))
    const newGain = Math.round(Math.max(MIN_GAIN, Math.min(MAX_GAIN, yToGain(targetY))) * 10) / 10
    
    // Only update if values actually changed to reduce re-renders
    const currentBand = normalizedUserBands.find(b => b.id === dragState.bandId)
    if (!currentBand || (currentBand.freq === newFreq && currentBand.gainDb === newGain)) {
      return
    }
    
    // Update the dragged band efficiently
    const newBands = userBands.map(band => 
      (band.id ?? `user-${userBands.indexOf(band)}`) === dragState.bandId 
        ? { ...band, freq: newFreq, gainDb: newGain }
        : band
    )
    
    onBandsChange(newBands)
  }, [dragState, normalizedUserBands, userBands, onBandsChange])

  // Handle mouse/touch end with proper cleanup
  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (dragState) {
      try {
        const target = e.currentTarget as Element
        if (target.releasePointerCapture) {
          target.releasePointerCapture(e.pointerId)
        }
      } catch (error) {
        console.warn('Pointer release failed:', error)
      }
      setDragState(null)
    }
  }, [dragState])

  // Handle parameter changes from sliders with validation
  const handleBandChange = useCallback((bandId: string, updates: Partial<Band>) => {
    // Validate inputs
    if (updates.freq !== undefined) {
      updates.freq = Math.max(MIN_FREQ, Math.min(MAX_FREQ, updates.freq))
    }
    if (updates.gainDb !== undefined) {
      updates.gainDb = Math.max(MIN_GAIN, Math.min(MAX_GAIN, updates.gainDb))
    }
    if (updates.q !== undefined) {
      updates.q = Math.max(0.1, Math.min(10, updates.q))
    }
    
    const newBands = userBands.map(band => {
      const currentId = band.id ?? `user-${userBands.indexOf(band)}`
      return currentId === bandId ? { ...band, ...updates } : band
    })
    onBandsChange(newBands)
  }, [userBands, onBandsChange])

  return (
    <div className={`bg-slate-900 rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-slate-800 px-6 py-3 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">Professional EQ</h3>
        <p className="text-sm text-slate-400">Drag points on the graph or use the controls below</p>
      </div>
      
      {/* EQ Graph */}
      <div className="relative bg-slate-900 p-4">
        <svg
          ref={svgRef}
          width={GRAPH_WIDTH}
          height={GRAPH_HEIGHT}
          className="bg-slate-800 rounded border border-slate-700 cursor-crosshair mx-auto"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Frequency grid lines */}
          {frequencyGridLines.map(freq => (
            <g key={freq}>
              <line
                x1={freqToX(freq)}
                y1={PADDING}
                x2={freqToX(freq)}
                y2={GRAPH_HEIGHT - PADDING}
                stroke="#6b7280"
                strokeWidth="1"
                opacity="0.4"
              />
              <text
                x={freqToX(freq)}
                y={GRAPH_HEIGHT - PADDING + 20}
                textAnchor="middle"
                className="fill-slate-400 text-xs"
              >
                {freq >= 1000 ? `${freq/1000}k` : freq}
              </text>
            </g>
          ))}
          
          {/* Gain grid lines */}
          {gainGridLines.map(gain => (
            <g key={gain}>
              <line
                x1={PADDING}
                y1={gainToY(gain)}
                x2={GRAPH_WIDTH - PADDING}
                y2={gainToY(gain)}
                stroke="#6b7280"
                strokeWidth={gain === 0 ? '2' : '1'}
                opacity={gain === 0 ? '0.8' : '0.4'}
              />
              <text
                x={PADDING - 10}
                y={gainToY(gain)}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-slate-400 text-xs"
              >
                {gain > 0 ? `+${gain}` : gain}
              </text>
            </g>
          ))}
          
          {/* Target curve */}
          {targetCurve && (
            <path
              d={targetCurve}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="3"
              strokeDasharray="8 4"
              opacity="0.8"
            />
          )}
          
          {/* User curve */}
          {userCurve && (
            <path
              d={userCurve}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              opacity="0.9"
            />
          )}
          
          {/* Target points */}
          {normalizedTargetBands.map(band => (
            <circle
              key={`target-${band.id}`}
              cx={freqToX(band.freq)}
              cy={gainToY(band.gainDb)}
              r="6"
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth="2"
              opacity="0.8"
            />
          ))}
          
          {/* User EQ points */}
          {normalizedUserBands.map(band => {
            const isHovered = hoveredBand === band.id
            const isDragging = dragState?.bandId === band.id
            const isSelected = selectedBand === band.id
            
            return (
              <g key={band.id}>
                {/* Invisible larger hit area for easier clicking */}
                <circle
                  cx={freqToX(band.freq)}
                  cy={gainToY(band.gainDb)}
                  r="20"
                  fill="transparent"
                  className="cursor-grab active:cursor-grabbing"
                  onPointerDown={(e) => handlePointerDown(e, band.id)}
                  onPointerEnter={() => setHoveredBand(band.id)}
                  onPointerLeave={() => setHoveredBand(null)}
                />
                
                {/* Q factor visualization (circle size) */}
                <circle
                  cx={freqToX(band.freq)}
                  cy={gainToY(band.gainDb)}
                  r={Math.max(15, Math.min(50, 15 + band.q * 8))}
                  fill="none"
                  stroke={isSelected ? '#60a5fa' : '#3b82f6'}
                  strokeWidth={isSelected ? '2' : '1'}
                  opacity='0.2'
                  style={{ pointerEvents: 'none' }}
                />
                
                {/* Visual point */}
                <circle
                  cx={freqToX(band.freq)}
                  cy={gainToY(band.gainDb)}
                  r={isDragging ? '10' : isHovered || isSelected ? '8' : '6'}
                  fill={isSelected ? '#60a5fa' : '#3b82f6'}
                  stroke={isSelected ? '#2563eb' : '#1d4ed8'}
                  strokeWidth='2'
                  className={`transition-all duration-150 ${isDragging ? 'drop-shadow-lg' : ''}`}
                  style={{ pointerEvents: 'none' }}
                />
                
                {/* Frequency/gain label */}
                {(isHovered || isDragging) && (
                  <g>
                    <rect
                      x={freqToX(band.freq) - 35}
                      y={gainToY(band.gainDb) - 35}
                      width="70"
                      height="25"
                      rx="4"
                      fill="#1f2937"
                      stroke="#374151"
                      strokeWidth="1"
                      opacity="0.9"
                    />
                    <text
                      x={freqToX(band.freq)}
                      y={gainToY(band.gainDb) - 20}
                      textAnchor="middle"
                      className="fill-white text-xs font-medium"
                    >
                      {band.freq >= 1000 ? `${(band.freq/1000).toFixed(1)}k` : band.freq.toFixed(0)}Hz
                    </text>
                    <text
                      x={freqToX(band.freq)}
                      y={gainToY(band.gainDb) - 8}
                      textAnchor="middle"
                      className="fill-white text-xs"
                    >
                      {band.gainDb > 0 ? '+' : ''}{band.gainDb.toFixed(1)}dB
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Integrated Controls Panel */}
      <div className="bg-slate-800 border-t border-slate-700">
        {/* Band Selector */}
        <div className="px-6 py-3 border-b border-slate-700">
          <div className="flex gap-2">
            {normalizedUserBands.map((band, index) => (
              <button
                key={band.id}
                onClick={() => setSelectedBand(band.id)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedBand === band.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Parameter Controls for Selected Band */}
        {selectedBand && normalizedUserBands.find(b => b.id === selectedBand) && (
          <div className="px-6 py-4">
            {(() => {
              const band = normalizedUserBands.find(b => b.id === selectedBand)!
              return (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Frequency Control */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-white">Frequency</label>
                      <span className="text-sm text-slate-400">
                        {band.freq >= 1000 ? `${(band.freq/1000).toFixed(1)}kHz` : `${band.freq.toFixed(0)}Hz`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={Math.log10(20)}
                      max={Math.log10(20000)}
                      step="0.01"
                      value={Math.log10(band.freq)}
                      onChange={(e) => {
                        const logFreq = parseFloat(e.target.value)
                        const freq = Math.round(Math.pow(10, logFreq))
                        handleBandChange(band.id, { freq })
                      }}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  {/* Gain Control */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-white">Gain</label>
                      <span className="text-sm text-slate-400">
                        {band.gainDb > 0 ? '+' : ''}{band.gainDb.toFixed(1)}dB
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-12"
                      max="12"
                      step="0.1"
                      value={band.gainDb}
                      onChange={(e) => {
                        const gainDb = parseFloat(e.target.value)
                        handleBandChange(band.id, { gainDb })
                      }}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  {/* Q Factor Control */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-white">Q Factor</label>
                      <span className="text-sm text-slate-400">
                        {band.q.toFixed(1)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="10"
                      step="0.1"
                      value={band.q}
                      onChange={(e) => {
                        const q = parseFloat(e.target.value)
                        handleBandChange(band.id, { q })
                      }}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  {/* EQ Type Control */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Type</label>
                    <select
                      value={band.type}
                      onChange={(e) => {
                        const type = e.target.value as Band['type']
                        handleBandChange(band.id, { type })
                      }}
                      className="w-full px-3 py-2 text-sm border border-slate-600 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="peak">Peak</option>
                      <option value="highpass">High Pass</option>
                      <option value="lowpass">Low Pass</option>
                      <option value="highshelf">High Shelf</option>
                      <option value="lowshelf">Low Shelf</option>
                      <option value="notch">Notch</option>
                    </select>
                  </div>
                </div>
              )
            })()}
          </div>
        )}
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1d4ed8;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1d4ed8;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .slider:focus {
          outline: none;
        }

        .slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }

        .slider:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  )
}
