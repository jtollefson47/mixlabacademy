/**
 * Comprehensive Theme System for Aesthetic Experimentation
 * All themes use solid backgrounds to comply with style guide
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
    background: 'bg-background',
    description: 'The original MixLab Academy theme'
  },

  // Retro Themes
  retro1950s: {
    name: 'Retro 1950s',
    primary: 'hsl(0, 76%, 50%)',
    secondary: 'hsl(185, 35%, 28%)',
    accent: 'hsl(45, 100%, 50%)',
    background: 'bg-amber-50',
    description: 'Classic atomic age and diner aesthetics'
  },

  retro1960s: {
    name: 'Retro 1960s',
    primary: 'hsl(300, 76%, 72%)',
    secondary: 'hsl(60, 100%, 75%)',
    accent: 'hsl(195, 100%, 50%)',
    background: 'bg-cyan-50',
    description: 'Groovy 60s vibes with bold patterns'
  },

  // Modern Themes
  darkMode: {
    name: 'Dark Mode',
    primary: 'hsl(0, 0%, 90%)',
    secondary: 'hsl(0, 0%, 10%)',
    accent: 'hsl(268, 83%, 58%)',
    background: 'bg-zinc-950',
    description: 'Dark mode for low-light environments'
  },

  cyberpunk: {
    name: 'Cyberpunk',
    primary: 'hsl(315, 100%, 50%)',
    secondary: 'hsl(180, 100%, 50%)',
    accent: 'hsl(60, 100%, 50%)',
    background: 'bg-purple-950',
    description: 'Futuristic neon cyberpunk aesthetic'
  },

  // Nature Themes
  sunset: {
    name: 'Sunset',
    primary: 'hsl(14, 100%, 57%)',
    secondary: 'hsl(45, 93%, 47%)',
    accent: 'hsl(348, 83%, 47%)',
    background: 'bg-orange-100',
    description: 'Warm sunset colors and golden hour'
  },

  forest: {
    name: 'Forest',
    primary: 'hsl(125, 71%, 66%)',
    secondary: 'hsl(142, 71%, 45%)',
    accent: 'hsl(159, 64%, 52%)',
    background: 'bg-green-100',
    description: 'Natural forest greens and earth tones'
  },

  // Academic Themes
  darkAcademia: {
    name: 'Dark Academia',
    primary: 'hsl(25, 45%, 37%)',
    secondary: 'hsl(60, 30%, 89%)',
    accent: 'hsl(0, 65%, 51%)',
    background: 'bg-purple-950',
    description: 'Classic scholarly dark aesthetic'
  },

  minimalist: {
    name: 'Minimalist',
    primary: 'hsl(0, 0%, 20%)',
    secondary: 'hsl(0, 0%, 96%)',
    accent: 'hsl(0, 0%, 60%)',
    background: 'bg-gray-50',
    description: 'Clean minimalist design'
  },

  // Tech Themes
  matrix: {
    name: 'Matrix',
    primary: 'hsl(120, 100%, 25%)',
    secondary: 'hsl(120, 100%, 50%)',
    accent: 'hsl(120, 100%, 75%)',
    background: 'bg-blue-950',
    description: 'Green matrix code aesthetic'
  },

  neonNights: {
    name: 'Neon Nights',
    primary: 'hsl(300, 100%, 75%)',
    secondary: 'hsl(280, 100%, 50%)',
    accent: 'hsl(320, 100%, 50%)',
    background: 'bg-purple-100',
    description: 'Bright neon colors for night owls'
  },

  // Seasonal Themes
  deepWinter: {
    name: 'Deep Winter',
    primary: 'hsl(210, 100%, 20%)',
    secondary: 'hsl(220, 70%, 30%)',
    accent: 'hsl(200, 100%, 70%)',
    background: 'bg-green-950',
    description: 'Deep winter blues and whites'
  },

  warmAutumn: {
    name: 'Warm Autumn',
    primary: 'hsl(25, 75%, 47%)',
    secondary: 'hsl(45, 100%, 51%)',
    accent: 'hsl(0, 100%, 50%)',
    background: 'bg-orange-200',
    description: 'Cozy autumn warmth and comfort'
  },

  springFresh: {
    name: 'Spring Fresh',
    primary: 'hsl(85, 85%, 75%)',
    secondary: 'hsl(50, 100%, 80%)',
    accent: 'hsl(15, 100%, 70%)',
    background: 'bg-pink-300',
    description: 'Fresh spring colors and new growth'
  }
}
