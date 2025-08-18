import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎵</span>
              <span className="font-bold text-lg">Audio Learning</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Making audio engineering education accessible through game-based learning.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold">Learn</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/games" 
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Browse Games
                </Link>
              </li>
              <li>
                <Link 
                  href="/games/eq-match" 
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  EQ Match
                </Link>
              </li>
              <li>
                <Link 
                  href="/games" 
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  All Games
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h3 className="font-semibold">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Our Mission
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:donate@audiolearning.org" 
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Donate
                </a>
              </li>
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="mailto:help@audiolearning.org" 
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@audiolearning.org" 
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2024 Audio Learning Platform. A nonprofit organization.</p>
          <p className="mt-2 sm:mt-0">
            Made with ❤️ for the audio engineering community
          </p>
        </div>
      </div>
    </footer>
  )
}
