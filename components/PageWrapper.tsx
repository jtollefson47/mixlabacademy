import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { getContainer, pageLayouts } from '@/lib/design-system';

interface PageWrapperProps {
  children: ReactNode;
  variant?: keyof typeof pageLayouts;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  id?: string;
}

/**
 * Standardized page wrapper that ensures consistent theming and layout.
 * This component enforces our style guide by always using solid theme backgrounds.
 * 
 * STYLE GUIDE ENFORCEMENT:
 * - Always uses `min-h-screen bg-background` for consistent full-screen coverage
 * - Ensures proper container structure for all pages
 * - Prevents gradient background usage by providing solid theme background
 */
export function PageWrapper({ 
  children, 
  variant = 'page', 
  containerSize = 'lg',
  className,
  id = 'main-content'
}: PageWrapperProps) {
  // Ensure all pages use solid background - never gradients
  const baseClasses = 'min-h-screen bg-background';
  const pageClass = pageLayouts[variant] || pageLayouts.page;
  
  return (
    <div className={cn(baseClasses, pageClass, className)}>
      <main id={id} className={getContainer(containerSize)} role="main">
        {children}
      </main>
    </div>
  );
}

/**
 * Loading state component that maintains style guide compliance
 */
export function PageLoading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Page header component for consistent page titles
 */
interface PageHeaderProps {
  title: string
  description?: string
  icon?: ReactNode
  className?: string
}

export function PageHeader({ title, description, icon, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-8', className)}>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      </div>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

/**
 * Specialized wrappers for common page types - all enforce style guide
 */
export function AuthPageWrapper({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('min-h-screen bg-background', pageLayouts.auth, className)}>
      <main role="main">
        {children}
      </main>
    </div>
  );
}

export function DashboardPageWrapper({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('min-h-screen bg-background', pageLayouts.dashboard, className)}>
      <main id="main-content" className={getContainer('xl')} role="main">
        {children}
      </main>
    </div>
  );
}

export function GamePageWrapper({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('min-h-screen bg-background', pageLayouts.game, className)}>
      <main id="main-content" role="main">
        {children}
      </main>
    </div>
  );
}
