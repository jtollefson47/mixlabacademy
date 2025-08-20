/**
 * Comprehensive Theme System for Aesthetic Experimentation
 * Updated with additional themes including Dark Academia, Retro 50s/60s, and more
 */

export interface Theme {
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
  description: string
}

export const themes: Record<string, Theme> = {
  // Original Themes
  default: {
    name: 'MixLab Default',
    primary: 'hsl(221.2, 83.2%, 53.3%)',
    secondary: 'hsl(210, 40%, 96%)',
    accent: 'hsl(268, 83%, 58%)',
    background: 'bg-slate-50',
    description: 'Clean, professional default theme'
  },

  studioDark: {
    name: 'Studio Dark',
    primary: 'hsl(210, 15%, 95%)', // Much brighter for better contrast
    secondary: 'hsl(220, 15%, 25%)', // Lighter secondary
    accent: 'hsl(47, 100%, 70%)', // Brighter accent
    background: 'bg-slate-900',
    description: 'Professional studio environment with high contrast'
  },

  // Enhanced Requested Themes
  darkAcademia: {
    name: 'Dark Academia',
    primary: 'hsl(35, 80%, 85%)', // Much brighter gold
    secondary: 'hsl(30, 25%, 25%)', // Lighter for better readability
    accent: 'hsl(45, 100%, 75%)', // Brighter accent
    background: 'bg-gradient-to-br from-amber-950 via-stone-900 to-yellow-900',
    description: 'Scholarly libraries with leather and gold'
  },

  retro50s: {
    name: 'Retro 50s/60s',
    primary: 'hsl(195, 100%, 45%)',
    secondary: 'hsl(50, 100%, 90%)',
    accent: 'hsl(345, 100%, 55%)',
    background: 'bg-gradient-to-br from-cyan-200 via-yellow-100 to-pink-200',
    description: 'Mid-century diner with bold colors'
  },

  darkMinimal: {
    name: 'Dark Minimalist',
    primary: 'hsl(0, 0%, 98%)', // Almost white for maximum contrast
    secondary: 'hsl(0, 0%, 15%)', // Lighter secondary
    accent: 'hsl(0, 0%, 75%)', // Much brighter accent
    background: 'bg-gradient-to-br from-zinc-950 via-gray-950 to-slate-950',
    description: 'Pure minimalism in dark tones with high contrast'
  },

  // Enhanced Original Themes
  neonCyber: {
    name: 'Neon Cyber',
    primary: 'hsl(315, 100%, 75%)', // Brighter neon pink
    secondary: 'hsl(280, 100%, 20%)', // Slightly lighter
    accent: 'hsl(180, 100%, 60%)', // Brighter cyan
    background: 'bg-gradient-to-br from-purple-950 via-fuchsia-900 to-cyan-900',
    description: 'Cyberpunk with electric neon accents'
  },

  warmAnalog: {
    name: 'Warm Analog',
    primary: 'hsl(25, 95%, 50%)',
    secondary: 'hsl(45, 87%, 85%)',
    accent: 'hsl(350, 89%, 55%)',
    background: 'bg-gradient-to-br from-orange-100 via-amber-50 to-red-100',
    description: 'Vintage tube amp warmth'
  },

  forestGreen: {
    name: 'Forest Studio',
    primary: 'hsl(142, 76%, 40%)',
    secondary: 'hsl(60, 5%, 90%)',
    accent: 'hsl(45, 100%, 55%)',
    background: 'bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100',
    description: 'Natural studio environment'
  },

  // Enhanced Fun Themes
  synthwave: {
    name: 'Synthwave',
    primary: 'hsl(320, 100%, 70%)', // Brighter neon pink
    secondary: 'hsl(280, 100%, 25%)', // Lighter dark purple
    accent: 'hsl(180, 100%, 55%)', // Brighter cyan
    background: 'bg-gradient-to-br from-purple-950 via-pink-900 to-indigo-950',
    description: '80s retrowave with neon grids'
  },

  monochrome: {
    name: 'Monochrome Pro',
    primary: 'hsl(0, 0%, 15%)',
    secondary: 'hsl(0, 0%, 97%)',
    accent: 'hsl(0, 0%, 50%)',
    background: 'bg-gradient-to-br from-gray-50 via-neutral-100 to-stone-50',
    description: 'Professional black and white'
  },

  oceanDepth: {
    name: 'Ocean Depth',
    primary: 'hsl(200, 100%, 55%)', // Much brighter blue
    secondary: 'hsl(220, 100%, 15%)', // Lighter secondary
    accent: 'hsl(180, 100%, 50%)', // Brighter cyan
    background: 'bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-950',
    description: 'Deep ocean studio vibes with high contrast'
  },

  lavenderDream: {
    name: 'Lavender Dream',
    primary: 'hsl(280, 50%, 55%)',
    secondary: 'hsl(300, 30%, 95%)',
    accent: 'hsl(320, 70%, 65%)',
    background: 'bg-gradient-to-br from-purple-100 via-violet-50 to-fuchsia-100',
    description: 'Soft lavender workspace'
  },

  neonGreen: {
    name: 'Matrix Green',
    primary: 'hsl(120, 100%, 55%)', // Much brighter green
    secondary: 'hsl(120, 100%, 10%)', // Slightly lighter dark
    accent: 'hsl(60, 100%, 55%)', // Brighter yellow
    background: 'bg-gradient-to-br from-green-950 via-emerald-900 to-black',
    description: 'Digital matrix aesthetic with high contrast'
  },

  rustAutumn: {
    name: 'Rust & Autumn',
    primary: 'hsl(25, 75%, 40%)',
    secondary: 'hsl(35, 40%, 90%)',
    accent: 'hsl(15, 85%, 50%)',
    background: 'bg-gradient-to-br from-orange-200 via-amber-100 to-red-200',
    description: 'Warm autumn colors'
  },

  sunset: {
    name: 'Sunset Vibes',
    primary: 'hsl(340, 82%, 48%)',
    secondary: 'hsl(25, 95%, 90%)',
    accent: 'hsl(60, 100%, 45%)',
    background: 'bg-gradient-to-br from-pink-300 via-orange-200 to-yellow-300',
    description: 'Golden hour warmth'
  }
}
