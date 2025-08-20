import React from 'react'

interface SvgIconProps {
  size?: number | string
  className?: string
  color?: string
}

export const WaveformIcon: React.FC<SvgIconProps> = ({ 
  size = 24, 
  className = '', 
  color = 'currentColor' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M2 12h2l1-4 2 8 2-12 2 8 2-4 2 2 2-1 2 3 2-2h2" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

export const EqualizerIcon: React.FC<SvgIconProps> = ({ 
  size = 24, 
  className = '', 
  color = 'currentColor' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="6" width="18" height="12" rx="2" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M6 10v4M10 8v8M14 9v6M18 7v10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="6" cy="12" r="1" fill={color}/>
    <circle cx="10" cy="12" r="1" fill={color}/>
    <circle cx="14" cy="12" r="1" fill={color}/>
    <circle cx="18" cy="12" r="1" fill={color}/>
  </svg>
)

export const MicrophoneIcon: React.FC<SvgIconProps> = ({ 
  size = 24, 
  className = '', 
  color = 'currentColor' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="9" y="2" width="6" height="11" rx="3" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M5 10v2a7 7 0 0 0 14 0v-2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 19v3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 22h8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export const SpeakerIcon: React.FC<SvgIconProps> = ({ 
  size = 24, 
  className = '', 
  color = 'currentColor' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export const FrequencyIcon: React.FC<SvgIconProps> = ({ 
  size = 24, 
  className = '', 
  color = 'currentColor' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 12h2l.5-2 2 4 2-6 2 4 2-2 2 1 2-1.5 2 2.5 2-1.5H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 19h18" stroke={color} strokeWidth="1" strokeLinecap="round"/>
    <path d="M3 5h18" stroke={color} strokeWidth="1" strokeLinecap="round"/>
    <text x="12" y="22" fontSize="8" textAnchor="middle" fill={color}>Hz</text>
  </svg>
)
