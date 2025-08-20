import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { getCard, iconPatterns } from '@/lib/design-system';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface EnhancedCardProps {
  children: ReactNode;
  variant?: 'base' | 'elevated' | 'interactive' | 'feature' | 'stat' | 'game';
  className?: string;
  onClick?: () => void;
  href?: string;
}

/**
 * Enhanced card component that uses our design system
 */
export const EnhancedCard = forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ children, variant = 'base', className, onClick, href, ...props }, ref) => {
    const cardClasses = cn(getCard(variant), className);
    
    if (href) {
      return (
        <a href={href} className={cn(cardClasses, 'block')} {...props}>
          {children}
        </a>
      );
    }
    
    if (onClick) {
      return (
        <button onClick={onClick} className={cn(cardClasses, 'w-full text-left')} {...props}>
          {children}
        </button>
      );
    }
    
    return (
      <div className={cardClasses} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

EnhancedCard.displayName = 'EnhancedCard';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

/**
 * Specialized stat card component
 */
export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  change, 
  changeType = 'neutral',
  variant = 'primary'
}: StatCardProps) {
  const changeColors = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-muted-foreground'
  };

  return (
    <Card className="card-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={cn(iconPatterns.containers[variant])}>
            <Icon className={cn(iconPatterns.sizes.lg, 
              variant === 'primary' ? 'text-primary' :
              variant === 'secondary' ? 'text-secondary-foreground' :
              variant === 'success' ? 'text-green-500' :
              variant === 'warning' ? 'text-amber-500' :
              variant === 'error' ? 'text-red-500' : 'text-primary'
            )} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-2xl md:text-3xl font-bold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground truncate">{title}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
            {change && (
              <p className={cn('text-xs mt-1', changeColors[changeType])}>
                {change}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  href?: string;
  onClick?: () => void;
  available?: boolean;
  featured?: boolean;
  comingSoon?: boolean;
  buttonText?: string;
  stats?: Array<{ label: string; value: string }>;
}

/**
 * Specialized game card component
 */
export function GameCard({ 
  title, 
  description, 
  icon, 
  href, 
  onClick, 
  available = true, 
  featured = false,
  comingSoon = false,
  buttonText,
  stats
}: GameCardProps) {
  const cardVariant = featured ? 'feature' : (comingSoon ? 'base' : 'game');
  const cardClasses = cn(
    'group',
    comingSoon && 'opacity-75 border-dashed'
  );

  const content = (
    <>
      <CardHeader>
        <div className="text-4xl mb-3" role="img" aria-label={`${title} icon`}>
          {icon}
        </div>
        <CardTitle className={cn(
          'group-hover:text-primary transition-colors',
          featured && 'text-primary'
        )}>
          {title}
          {featured && (
            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Featured
            </span>
          )}
          {comingSoon && (
            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              Coming Soon
            </span>
          )}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {stats && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-2 bg-muted/30 rounded-lg">
                <div className="text-lg font-semibold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-auto">
          {href ? (
            <a 
              href={href} 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              {buttonText || (available ? 'Play Now' : 'Coming Soon')}
            </a>
          ) : onClick ? (
            <button 
              onClick={onClick}
              disabled={!available}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              {buttonText || (available ? 'Play Now' : 'Coming Soon')}
            </button>
          ) : (
            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-muted text-muted-foreground h-10 px-4 py-2 w-full">
              {buttonText || 'Coming Soon'}
            </div>
          )}
        </div>
      </CardContent>
    </>
  );

  return (
    <Card className={cn(getCard(cardVariant), cardClasses)}>
      {content}
    </Card>
  );
}

export default EnhancedCard;
