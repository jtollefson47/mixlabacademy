import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <header>
            <NavBar />
          </header>
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
