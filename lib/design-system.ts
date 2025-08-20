/**
 * Comprehensive Design System for Audio Learning Platform
 * 
 * This file contains standardized design patterns, utilities, and constants
 * to ensure consistency across the entire application.
 */

// =============================================================================
// LAYOUT & SPACING
// =============================================================================

export const layout = {
  // Container widths for different content types
  containers: {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  },
  
  // Standard padding/margin classes
  spacing: {
    section: 'py-16 md:py-24',
    card: 'p-6 md:p-8',
    cardCompact: 'p-4 md:p-6',
    page: 'px-4 md:px-6 lg:px-8',
  },
  
  // Grid patterns
  grids: {
    stats: 'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6',
    features: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8',
    dashboard: 'grid lg:grid-cols-3 gap-6 md:gap-8',
    profiles: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
  }
};

// =============================================================================
// VISUAL HIERARCHY
// =============================================================================

export const typography = {
  // Heading classes with proper hierarchy
  headings: {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold text-foreground',
    h2: 'text-3xl md:text-4xl font-bold text-foreground',
    h3: 'text-2xl md:text-3xl font-semibold text-foreground',
    h4: 'text-xl md:text-2xl font-semibold text-foreground',
    h5: 'text-lg md:text-xl font-medium text-foreground',
    h6: 'text-base md:text-lg font-medium text-foreground',
  },
  
  // Body text variants
  body: {
    large: 'text-lg md:text-xl text-muted-foreground leading-relaxed',
    base: 'text-base text-muted-foreground leading-relaxed',
    small: 'text-sm text-muted-foreground',
    caption: 'text-xs text-muted-foreground',
  },
  
  // Special text treatments
  special: {
    gradient: 'bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent',
    accent: 'text-primary font-medium',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-amber-600 dark:text-amber-400',
    error: 'text-red-600 dark:text-red-400',
  }
};

// =============================================================================
// COMPONENT VARIANTS
// =============================================================================

export const components = {
  // Card variants for different contexts
  cards: {
    base: 'card-shadow bg-card border border-border rounded-lg',
    elevated: 'card-shadow-lg bg-card border border-border rounded-lg',
    interactive: 'card-shadow bg-card border border-border rounded-lg hover-lift transition-all duration-200',
    feature: 'card-shadow-md bg-card border border-border rounded-xl',
    stat: 'card-shadow bg-card border border-border rounded-lg',
    game: 'card-shadow-lg bg-card border border-border rounded-xl hover-lift transition-all duration-200',
  },
  
  // Button variants (extending shadcn defaults)
  buttons: {
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    cta: 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200',
  },
  
  // Input variants
  inputs: {
    base: 'border border-input bg-background text-foreground placeholder:text-muted-foreground',
    focus: 'focus:ring-2 focus:ring-primary focus:border-primary',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
  },
  
  // Badge variants
  badges: {
    primary: 'bg-primary/10 text-primary border border-primary/20',
    secondary: 'bg-secondary/10 text-secondary-foreground border border-secondary/20',
    success: 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
    warning: 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    error: 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
  }
};

// =============================================================================
// PAGE LAYOUTS
// =============================================================================

export const pageLayouts = {
  // Standard page wrapper
  page: 'min-h-screen bg-background',
  
  // Auth pages
  auth: 'min-h-screen bg-background flex items-center justify-center p-4',
  
  // Dashboard layout
  dashboard: 'min-h-screen bg-background py-8',
  
  // Content pages (community, profile, etc.)
  content: 'min-h-screen bg-background py-8',
  
  // Game pages
  game: 'min-h-screen bg-background',
  
  // Landing page
  landing: 'min-h-screen bg-background',
};

// =============================================================================
// INTERACTION STATES
// =============================================================================

export const interactions = {
  // Hover effects
  hover: {
    lift: 'hover-lift transition-transform duration-200',
    glow: 'hover:shadow-lg hover:shadow-primary/25 transition-shadow duration-200',
    scale: 'hover:scale-105 transition-transform duration-200',
    fade: 'hover:opacity-80 transition-opacity duration-200',
  },
  
  // Focus states (accessibility)
  focus: {
    visible: 'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
    button: 'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
    input: 'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
  },
  
  // Loading states
  loading: {
    spinner: 'animate-spin rounded-full h-8 w-8 border-b-2 border-primary',
    pulse: 'animate-pulse bg-muted rounded',
    shimmer: 'animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted',
  },
  
  // Animation classes
  animations: {
    fadeIn: 'animate-in fade-in duration-300',
    slideUp: 'animate-in slide-in-from-bottom-4 duration-300',
    slideDown: 'animate-in slide-in-from-top-4 duration-300',
    scaleIn: 'animate-in zoom-in-95 duration-200',
  }
};

// =============================================================================
// RESPONSIVE BREAKPOINTS
// =============================================================================

export const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large desktop
};

// =============================================================================
// ACCESSIBILITY HELPERS
// =============================================================================

export const a11y = {
  // Screen reader only content
  srOnly: 'sr-only',
  
  // Focus management
  skipLink: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md',
  
  // High contrast support
  highContrast: 'contrast-more:border-2 contrast-more:border-current',
  
  // Reduced motion support
  reducedMotion: 'motion-reduce:animate-none motion-reduce:transition-none',
};

// =============================================================================
// ICON PATTERNS
// =============================================================================

export const iconPatterns = {
  // Standard icon sizes
  sizes: {
    sm: 'h-4 w-4',
    base: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
    '2xl': 'h-12 w-12',
  },
  
  // Icon containers for consistent backgrounds
  containers: {
    primary: 'p-2 rounded-lg bg-primary/10',
    secondary: 'p-2 rounded-lg bg-secondary/10',
    success: 'p-2 rounded-lg bg-green-500/10',
    warning: 'p-2 rounded-lg bg-amber-500/10',
    error: 'p-2 rounded-lg bg-red-500/10',
  }
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Combines multiple CSS classes, handling conditionals
 */
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Gets responsive container class based on content type
 */
export function getContainer(size: keyof typeof layout.containers = 'lg'): string {
  return `container mx-auto ${layout.containers[size]} ${layout.spacing.page}`;
}

/**
 * Gets appropriate card class based on context
 */
export function getCard(variant: keyof typeof components.cards = 'base'): string {
  return components.cards[variant];
}

/**
 * Gets heading class with proper hierarchy
 */
export function getHeading(level: keyof typeof typography.headings): string {
  return typography.headings[level];
}

/**
 * Creates a focus-visible class for better accessibility
 */
export function getFocusClass(type: keyof typeof interactions.focus = 'visible'): string {
  return interactions.focus[type];
}

// =============================================================================
// GAME-SPECIFIC DESIGN PATTERNS
// =============================================================================

export const gameDesign = {
  // Game card variants
  gameCards: {
    available: 'card-shadow-lg bg-card border border-border rounded-xl hover-lift transition-all duration-200 group',
    comingSoon: 'card-shadow bg-card border border-dashed border-border/50 rounded-xl opacity-75',
    featured: 'card-shadow-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl hover-lift transition-all duration-200',
  },
  
  // Score display patterns
  scores: {
    excellent: 'text-green-600 dark:text-green-400 font-bold',
    good: 'text-amber-600 dark:text-amber-400 font-bold',
    needsWork: 'text-red-600 dark:text-red-400 font-bold',
  },
  
  // Progress indicators
  progress: {
    bar: 'bg-muted rounded-full overflow-hidden',
    fill: 'bg-primary h-full transition-all duration-300',
    ring: 'text-primary',
  }
};

// =============================================================================
// EXPORT ALL
// =============================================================================

export const designSystem = {
  layout,
  typography,
  components,
  pageLayouts,
  interactions,
  breakpoints,
  a11y,
  iconPatterns,
  gameDesign,
  cn,
  getContainer,
  getCard,
  getHeading,
  getFocusClass,
};

export default designSystem;
