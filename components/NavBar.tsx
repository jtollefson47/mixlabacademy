'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MusicNoteIcon } from '@/components/ui/theme-icons';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useIsAdmin } from '@/components/AdminOnly';
import { 
  User, 
  LogOut, 
  Menu, 
  X, 
  Home, 
  Gamepad2, 
  BarChart3, 
  Users, 
  Palette,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function NavBar() {
  const { user, loading, signOut } = useAuth();
  const { isAdmin } = useIsAdmin();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const navigation = [
    { name: 'Home', href: '/' as const, icon: Home },
    { name: 'Games', href: '/games' as const, icon: Gamepad2 },
    ...(user ? [
      { name: 'Dashboard', href: '/dashboard' as const, icon: BarChart3 },
      { name: 'Community', href: '/community' as const, icon: Users },
    ] : []),
    ...(isAdmin ? [
      { name: 'Themes', href: '/themes' as const, icon: Palette },
    ] : []),
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b bg-background shadow-sm" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg px-2 py-1 -mx-2 -my-1"
              aria-label="Audio Learning - Home"
            >
              <MusicNoteIcon size="md" />
              <span className="font-bold text-xl text-foreground">Audio Learning</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => {
                const isCurrentPage = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      isCurrentPage
                        ? 'nav-button-active'
                        : 'nav-button-inactive'
                    )}
                    aria-current={isCurrentPage ? 'page' : undefined}
                  >
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" aria-label="Loading" />
              ) : user ? (
                <div className="flex items-center space-x-3">
                  <Link 
                    href="/profile" 
                    className={cn(
                      "inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isActive('/profile')
                        ? "nav-button-active"
                        : "nav-button-inactive"
                    )}
                  >
                    <User className="h-4 w-4" aria-hidden="true" />
                    Profile
                  </Link>
                  <span className="text-sm text-muted-foreground border-l border-border pl-3">
                    {user.email?.split('@')[0]}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link href="/auth/signin">
                  <Button variant="default" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" aria-hidden="true" />
                    Sign In
                  </Button>
                </Link>
              )}

              {/* Donate Button */}
              <a 
                href="mailto:donate@audiolearning.org" 
                className="inline-flex items-center gap-2 justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-red-600 text-white hover:bg-red-700 h-9 px-4 py-2"
                aria-label="Donate to support Audio Learning"
              >
                <Heart className="h-4 w-4" aria-hidden="true" />
                Donate
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              {!loading && !user && (
                <Link href="/auth/signin">
                  <Button variant="default" size="sm" className="flex items-center gap-1">
                    <User className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only sm:not-sr-only">Sign In</span>
                  </Button>
                </Link>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center gap-1"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden border-t bg-background shadow-lg"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const isCurrentPage = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors w-full",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isCurrentPage
                        ? "nav-button-active"
                        : "nav-button-inactive"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                    role="menuitem"
                    aria-current={isCurrentPage ? 'page' : undefined}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    {item.name}
                  </Link>
                );
              })}
              
              {user && (
                <>
                  <div className="border-t border-border my-2" />
                  <Link
                    href="/profile"
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors w-full",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isActive('/profile')
                        ? "nav-button-active"
                        : "nav-button-inactive"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                    role="menuitem"
                  >
                    <User className="h-5 w-5" aria-hidden="true" />
                    Profile
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
                    role="menuitem"
                  >
                    <LogOut className="h-5 w-5" aria-hidden="true" />
                    Sign Out
                  </Button>
                </>
              )}
              
              <div className="border-t border-border my-2" />
              <a 
                href="mailto:donate@audiolearning.org" 
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium bg-red-600 text-white hover:bg-red-700 transition-colors w-full"
                onClick={() => setIsMobileMenuOpen(false)}
                role="menuitem"
              >
                <Heart className="h-5 w-5" aria-hidden="true" />
                Donate
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium"
      >
        Skip to main content
      </a>
    </>
  );
}
