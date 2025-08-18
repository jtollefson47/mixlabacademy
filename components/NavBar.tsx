import Link from 'next/link'

export function NavBar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🎵</span>
              <span className="font-bold text-xl">Audio Learning</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/games" 
              className="text-foreground/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm px-2 py-1"
            >
              Games
            </Link>
            <Link 
              href="/" 
              className="text-foreground/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm px-2 py-1"
            >
              About
            </Link>
            <a 
              href="mailto:donate@audiolearning.org" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Donate
            </a>
          </div>

          {/* Mobile menu button - simplified for now */}
          <div className="md:hidden">
            <Link 
              href="/games"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Games
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
