import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found | MixLab Academy',
  description: "The page you're looking for doesn't exist.",
}

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MusicNoteIcon } from '@/components/ui/theme-icons'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-4 flex justify-center">
          <MusicNoteIcon size="2xl" />
        </div>
          <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Looks like this page hit a wrong note. Let&apos;s get you back on track.
          </p>
          <div className="space-x-4">
            <a 
              href="/"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Go Home
            </a>
            <a 
              href="/games"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Browse Games
            </a>
          </div>
        </div>
      </div>
  )
}
