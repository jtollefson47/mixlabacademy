import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Enhanced Card component that enforces style guide compliance.
 * 
 * STYLE GUIDE ENFORCEMENT:
 * - Always uses solid card backgrounds (bg-card)
 * - Prevents semi-transparent or gradient backgrounds
 * - Ensures proper border styling
 * - Maintains theme consistency
 */

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Enforce solid card background - never semi-transparent or gradients
      'bg-card border-border rounded-lg border shadow-sm',
      className
    )}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      // Enforce theme text color
      'text-2xl font-semibold leading-none tracking-tight text-card-foreground',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      // Enforce muted text color for descriptions
      'text-sm text-muted-foreground',
      className
    )}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

/**
 * Style guide compliant card variants for common use cases
 */

// Standard content card - most common use case
export const ContentCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn('bg-card border-border', className)}
    {...props}
  />
))
ContentCard.displayName = 'ContentCard'

// Highlighted card for important content
export const HighlightCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn('bg-card border-primary/20 shadow-md', className)}
    {...props}
  />
))
HighlightCard.displayName = 'HighlightCard'

// Admin card with accent border
export const AdminCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn('bg-card border-accent/20', className)}
    {...props}
  />
))
AdminCard.displayName = 'AdminCard'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
