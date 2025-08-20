import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'
import { NavBar } from '@/components/NavBar'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '@/lib/providers'

// Optimize font loading with display swap for better performance
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

// Lazy load Footer for better initial page load
const Footer = dynamic(() => import('@/components/Footer').then(mod => ({ default: mod.Footer })), {
  ssr: false,
  loading: () => <div className="h-16 bg-muted" />
})

export const metadata: Metadata = {
  title: {
    default: 'Audio Learning Platform - Learn Audio Engineering Through Games',
    template: '%s | Audio Learning Platform',
  },
  description:
    'Learn audio engineering through interactive games and exercises. Master EQ, compression, mixing, and more with hands-on practice.',
  keywords: [
    'audio engineering',
    'music production',
    'eq training',
    'mixing',
    'mastering',
    'game-based learning',
  ],
  authors: [{ name: 'Audio Learning Platform' }],
  creator: 'Audio Learning Platform',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://audiolearning.org',
    title: 'Audio Learning Platform - Learn Audio Engineering Through Games',
    description:
      'Learn audio engineering through interactive games and exercises. Master EQ, compression, mixing, and more with hands-on practice.',
    siteName: 'Audio Learning Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Audio Learning Platform - Learn Audio Engineering Through Games',
    description:
      'Learn audio engineering through interactive games and exercises. Master EQ, compression, mixing, and more with hands-on practice.',
    creator: '@audiolearning',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Performance optimization metadata
  other: {
    'theme-color': '#3b82f6',
    'color-scheme': 'light dark',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Performance and caching hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <NavBar />
            </header>
            <main className="flex-1" role="main">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
