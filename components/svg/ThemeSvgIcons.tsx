import React from 'react'
import { cn } from '@/lib/utils'

interface SvgIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8', 
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
  '2xl': 'w-24 h-24'
}

const variantClasses = {
  default: 'text-primary bg-primary/10 border border-primary/20',
  outline: 'text-primary border border-primary/40 bg-transparent',
  ghost: 'text-muted-foreground hover:text-primary transition-colors'
}

export function WaveformSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M2 12h2l1-4 2 8 2-12 2 8 2-4 2 2 2-1 2 3 2-2h2" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function EqualizerSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M6 10v4M10 8v8M14 9v6M18 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="6" cy="12" r="1" fill="currentColor"/>
        <circle cx="10" cy="12" r="1" fill="currentColor"/>
        <circle cx="14" cy="12" r="1" fill="currentColor"/>
        <circle cx="18" cy="12" r="1" fill="currentColor"/>
      </svg>
    </div>
  )
}

export function MicrophoneSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M5 10v2a7 7 0 0 0 14 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 19v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

export function FrequencySvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 12h2l.5-2 2 4 2-6 2 4 2-2 2 1 2-1.5 2 2.5 2-1.5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 19h18" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.5"/>
        <path d="M3 5h18" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    </div>
  )
}

export function StudioMonitorSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="12" cy="15" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="12" cy="15" r="1.5" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.3"/>
      </svg>
    </div>
  )
}

// Audio Engineering Puns & Essential Icons

export function BusSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="7" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <rect x="4" y="9" width="3" height="2" rx="0.5" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.3"/>
        <rect x="8" y="9" width="3" height="2" rx="0.5" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.3"/>
        <rect x="13" y="9" width="3" height="2" rx="0.5" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.3"/>
        <rect x="17" y="9" width="3" height="2" rx="0.5" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.3"/>
        <circle cx="6" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="18" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M2 13h20" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      </svg>
    </div>
  )
}

export function GateSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M21 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 12h8l2-2 2 2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
      </svg>
    </div>
  )
}

export function LightningBoltSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" opacity="0.2"/>
      </svg>
    </div>
  )
}

export function SnailSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="15" cy="9" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="15" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="15" cy="9" r="1" fill="currentColor"/>
        <path d="M9 9c0-3 2-5 6-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M2 15c0-2 1-3 3-3s3 1 3 3v2c0 1-1 2-2 2H4c-1 0-2-1-2-2v-2z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.2"/>
        <path d="M4 13l-1-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 13l-1-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

export function SpeedLimitSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <text x="12" y="9" fontSize="4" textAnchor="middle" fill="currentColor" fontWeight="bold">MAX</text>
        <text x="12" y="15" fontSize="6" textAnchor="middle" fill="currentColor" fontWeight="bold">∞</text>
        <path d="M6 17h12" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      </svg>
    </div>
  )
}

export function ChainSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="3" y="8" width="6" height="8" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <rect x="9" y="4" width="6" height="8" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <rect x="15" y="8" width="6" height="8" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <rect x="9" y="12" width="6" height="8" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    </div>
  )
}

export function ReverbSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M7 10l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 10l-2 2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="3" r="1" fill="currentColor" opacity="0.5"/>
        <circle cx="12" cy="21" r="1" fill="currentColor" opacity="0.5"/>
      </svg>
    </div>
  )
}

export function DelayEchoSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7"/>
        <circle cx="16" cy="12" r="2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"/>
        <circle cx="8" cy="12" r="1" fill="currentColor"/>
      </svg>
    </div>
  )
}

// Basic Audio Engineering Icons

export function CondenserMicSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="10" y="2" width="4" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M7 6v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17 6v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 12v2a6 6 0 0 0 12 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 21h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="8" r="1" fill="currentColor"/>
      </svg>
    </div>
  )
}

export function DualMicSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="6" y="2" width="4" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <rect x="14" y="2" width="4" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M3 10v1a5 5 0 0 0 10 0v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 10v1a5 5 0 0 0 10 0v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 17v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 17v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

export function SingleWaveSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 12c3-6 6-6 10 0s7 6 10 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M2 21h20" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
        <path d="M2 3h20" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      </svg>
    </div>
  )
}

export function DoubleWaveSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 10c3-4 6-4 10 0s7 4 10 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M2 14c3-4 6-4 10 0s7 4 10 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M2 20h20" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
        <path d="M2 4h20" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      </svg>
    </div>
  )
}

export function MixConsoleSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M6 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M18 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="6" cy="11" r="1.5" fill="currentColor"/>
        <circle cx="10" cy="13" r="1.5" fill="currentColor"/>
        <circle cx="14" cy="10" r="1.5" fill="currentColor"/>
        <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
      </svg>
    </div>
  )
}

export function FaderSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="10" y="4" width="4" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <rect x="8" y="10" width="8" height="4" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.3"/>
        <path d="M6 4h12" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <path d="M6 20h12" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <path d="M6 12h2" stroke="currentColor" strokeWidth="1"/>
        <path d="M16 12h2" stroke="currentColor" strokeWidth="1"/>
      </svg>
    </div>
  )
}

export function SpeakerPairSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="4" width="8" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <rect x="14" y="4" width="8" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="6" cy="8" r="1.5" stroke="currentColor" strokeWidth="1" fill="none"/>
        <circle cx="6" cy="16" r="2.5" stroke="currentColor" strokeWidth="1" fill="none"/>
        <circle cx="18" cy="8" r="1.5" stroke="currentColor" strokeWidth="1" fill="none"/>
        <circle cx="18" cy="16" r="2.5" stroke="currentColor" strokeWidth="1" fill="none"/>
        <circle cx="6" cy="16" r="1" fill="currentColor" opacity="0.5"/>
        <circle cx="18" cy="16" r="1" fill="currentColor" opacity="0.5"/>
      </svg>
    </div>
  )
}

// More Audio Engineering Puns

export function CompressorSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M8 10l8 4-8 4V10z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.3"/>
        <path d="M18 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

export function DynamicRangeSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 18h18" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <path d="M6 18V6M10 18V10M14 18V4M18 18V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 6l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 4l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export function NoiseFloorSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="16" width="20" height="4" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.2"/>
        <path d="M3 16l1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1" stroke="currentColor" strokeWidth="1" fill="none"/>
        <path d="M4 12l2-4 2 6 2-8 2 5 2-3 2 4 2-2 2 1 2-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="12" y="22" fontSize="6" textAnchor="middle" fill="currentColor" opacity="0.7">FLOOR</text>
      </svg>
    </div>
  )
}

export function HeadroomSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="20" height="4" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.2"/>
        <path d="M4 14l2-4 2 6 2-8 2 5 2-3 2 4 2-2 2 1 2-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6h18" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" opacity="0.7"/>
        <path d="M12 2v4" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <text x="12" y="4" fontSize="4" textAnchor="middle" fill="currentColor">ROOM</text>
      </svg>
    </div>
  )
}

export function OverdriveSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M8 12c2-4 4-4 8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 12c2 4 4 4 8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 18v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

export function BandpassSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 18h4l4-12h4l4 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <rect x="10" y="6" width="4" height="12" fill="currentColor" opacity="0.2"/>
        <path d="M2 18h20" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <path d="M10 18v2" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
        <path d="M14 18v2" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      </svg>
    </div>
  )
}

export function FilterSweepSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 18c4-12 8-12 12 0s8 12 8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="8" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.3"/>
        <path d="M8 10l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2,2"/>
        <path d="M14 16l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 16l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

export function PhaseSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 12c3-6 6-6 10 0s7 6 10 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M2 12c3 6 6 6 10 0s7-6 10 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" strokeDasharray="3,3"/>
        <text x="12" y="4" fontSize="6" textAnchor="middle" fill="currentColor" opacity="0.7">φ</text>
      </svg>
    </div>
  )
}

export function ChorusSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6 8c0-2 1-4 6-4s6 2 6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M6 12c0-2 1-4 6-4s6 2 6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M6 16c0-2 1-4 6-4s6 2 6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <circle cx="6" cy="8" r="1" fill="currentColor"/>
        <circle cx="6" cy="12" r="1" fill="currentColor"/>
        <circle cx="6" cy="16" r="1" fill="currentColor"/>
        <circle cx="18" cy="8" r="1" fill="currentColor"/>
        <circle cx="18" cy="12" r="1" fill="currentColor"/>
        <circle cx="18" cy="16" r="1" fill="currentColor"/>
      </svg>
    </div>
  )
}

// More Creative Audio Engineering Icons

export function MasteringSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.3"/>
        <path d="M12 4l1 1-1 1-1-1 1-1z" fill="currentColor"/>
        <path d="M20 12l-1 1-1-1 1-1 1 1z" fill="currentColor"/>
        <path d="M12 20l-1-1 1-1 1 1-1 1z" fill="currentColor"/>
        <path d="M4 12l1-1 1 1-1 1-1-1z" fill="currentColor"/>
      </svg>
    </div>
  )
}

export function SpectrumSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="3" y="16" width="2" height="5" fill="currentColor" opacity="0.8"/>
        <rect x="6" y="12" width="2" height="9" fill="currentColor" opacity="0.7"/>
        <rect x="9" y="8" width="2" height="13" fill="currentColor" opacity="0.9"/>
        <rect x="12" y="4" width="2" height="17" fill="currentColor"/>
        <rect x="15" y="6" width="2" height="15" fill="currentColor" opacity="0.8"/>
        <rect x="18" y="10" width="2" height="11" fill="currentColor" opacity="0.6"/>
        <path d="M2 21h20" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <path d="M2 3h20" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
      </svg>
    </div>
  )
}

export function VocalTuningSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 12c0-2 1-4 4-4s4 2 4 4-1 4-4 4-4-2-4-4z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.2"/>
        <path d="M6 8l2 4-2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 8l-2 4 2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
        <path d="M12 2v4" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <path d="M12 18v4" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      </svg>
    </div>
  )
}

export function SidechainSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 10l4-2 4 6 4-8 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 14l4-1 4 3 4-4 4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        <circle cx="8" cy="8" r="1" fill="currentColor"/>
        <circle cx="16" cy="6" r="1" fill="currentColor"/>
        <path d="M8 8l8-2" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" opacity="0.5"/>
      </svg>
    </div>
  )
}

export function StudioSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="8" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <rect x="4" y="10" width="3" height="8" rx="1" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.3"/>
        <rect x="8" y="12" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.3"/>
        <rect x="13" y="11" width="3" height="7" rx="1" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.3"/>
        <rect x="17" y="13" width="3" height="5" rx="1" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.3"/>
        <path d="M2 8l10-5 10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export function LoopingSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 12c0-5 4-9 9-9s9 4 9 9-4 9-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M18 16l3-3-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="11" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.3"/>
        <path d="M6 8l2 2-2 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
      </svg>
    </div>
  )
}

export function PunchingSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="3" y="10" width="18" height="4" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <rect x="8" y="8" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.2"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
        <path d="M8 4l8 4-8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        <path d="M8 16l8 4-8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      </svg>
    </div>
  )
}

export function AutoTuneSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 12h3l3-4 3 8 3-6 3 4h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 12h3l3-2 3 4 3-3 3 2h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" strokeDasharray="2,2"/>
        <rect x="10" y="8" width="4" height="8" rx="2" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.2"/>
        <text x="12" y="13" fontSize="4" textAnchor="middle" fill="currentColor">♪</text>
      </svg>
    </div>
  )
}

export function MixingSvgIcon({ size = 'md', className, variant = 'default' }: SvgIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'flex items-center justify-center rounded-lg p-1',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M8 12l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.4"/>
        <path d="M12 4v16" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
        <path d="M4 12h16" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      </svg>
    </div>
  )
}
