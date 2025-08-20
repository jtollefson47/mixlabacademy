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
 * Standardized page wrapper that ensures consistent theming and layout
 */
export function PageWrapper({ 
  children, 
  variant = 'page', 
  containerSize = 'lg',
  className,
  id = 'main-content'
}: PageWrapperProps) {
  return (
    <div className={cn(pageLayouts[variant], className)}>
      <main id={id} className={getContainer(containerSize)} role="main">
        {children}
      </main>
    </div>
  );
}

/**
 * Specialized wrappers for common page types
 */
export function AuthPageWrapper({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(pageLayouts.auth, className)}>
      <main role="main">
        {children}
      </main>
    </div>
  );
}

export function DashboardPageWrapper({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(pageLayouts.dashboard, className)}>
      <main id="main-content" className={getContainer('xl')} role="main">
        {children}
      </main>
    </div>
  );
}

export function GamePageWrapper({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(pageLayouts.game, className)}>
      <main id="main-content" role="main">
        {children}
      </main>
    </div>
  );
}
