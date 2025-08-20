import React from 'react'
import { cn } from '@/lib/utils'

interface ThemeIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8', 
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
  '2xl': 'w-24 h-24'
}

export function MusicNoteIcon({ size = 'md', className }: ThemeIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      'flex items-center justify-center rounded-full bg-primary/20 border-2 border-primary/40',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-1/2 h-1/2"
      >
        <path 
          d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" 
          fill="currentColor"
          className="text-primary"
        />
      </svg>
    </div>
  )
}

export function EqualizerIcon({ size = 'md', className }: ThemeIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      'flex items-center justify-center rounded-lg bg-primary/20 border-2 border-primary/40 p-2',
      className
    )}>
      <div className="flex items-end justify-center gap-0.5 w-full h-full">
        <div className="w-1 bg-primary rounded-sm" style={{ height: '30%' }} />
        <div className="w-1 bg-primary rounded-sm" style={{ height: '70%' }} />
        <div className="w-1 bg-primary rounded-sm" style={{ height: '50%' }} />
        <div className="w-1 bg-primary rounded-sm" style={{ height: '80%' }} />
        <div className="w-1 bg-primary rounded-sm" style={{ height: '40%' }} />
      </div>
    </div>
  )
}

export function ToolIcon({ size = 'md', className }: ThemeIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      'flex items-center justify-center rounded-lg bg-primary/20 border-2 border-primary/40',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-1/2 h-1/2"
      >
        <path 
          d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" 
          fill="currentColor"
          className="text-primary"
        />
      </svg>
    </div>
  )
}

export function TargetIcon({ size = 'md', className }: ThemeIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      'flex items-center justify-center rounded-full bg-primary/20 border-2 border-primary/40',
      className
    )}>
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-3/4 h-3/4 rounded-full border-2 border-primary flex items-center justify-center">
          <div className="w-1/2 h-1/2 rounded-full border-2 border-primary flex items-center justify-center">
            <div className="w-1/4 h-1/4 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function GamepadIcon({ size = 'md', className }: ThemeIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      'flex items-center justify-center rounded-lg bg-primary/20 border-2 border-primary/40',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-1/2 h-1/2"
      >
        <path 
          d="M6 9h2v2h2v2H8v2H6v-2H4v-2h2V9zm12.5 0c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5zm-3 3c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z" 
          fill="currentColor"
          className="text-primary"
        />
        <path 
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none"
          className="text-primary"
        />
      </svg>
    </div>
  )
}

export function BookIcon({ size = 'md', className }: ThemeIconProps) {
  return (
    <div className={cn(
      sizeClasses[size],
      'flex items-center justify-center rounded-lg bg-primary/20 border-2 border-primary/40',
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-1/2 h-1/2"
      >
        <path 
          d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" 
          fill="currentColor"
          className="text-primary"
        />
      </svg>
    </div>
  )
}

// Difficulty indicators that match theme colors
export function DifficultyIcon({ 
  level, 
  size = 'sm', 
  className 
}: ThemeIconProps & { 
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert' 
}) {
  const dots = {
    beginner: 1,
    intermediate: 2, 
    advanced: 3,
    expert: 4
  }

  return (
    <div className={cn(
      'flex items-center gap-1',
      className
    )}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'w-1.5 h-1.5 rounded-full border border-primary/40',
            index < dots[level] 
              ? 'bg-primary' 
              : 'bg-primary/20'
          )}
        />
      ))}
      <span className="ml-1 text-xs font-medium text-primary capitalize">
        {level}
      </span>
    </div>
  )
}
