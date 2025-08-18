import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learn Audio Engineering by Playing | Nonprofit Audio Learning',
  description: 'Master audio engineering through interactive games and exercises. From EQ training to mixing challenges, develop your skills with hands-on practice.',
  keywords: ['audio engineering', 'EQ training', 'mixing', 'education', 'games', 'nonprofit'],
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Skip to content link */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md">
          Skip to main content
        </a>

        {/* Hero Section */}
        <section id="main-content" aria-labelledby="hero-heading" className="text-center py-16 animate-fade-in">
          <div className="mb-8">
            <span className="text-6xl md:text-8xl icon-float mb-6 block" role="img" aria-label="Audio waves">🎵</span>
            <h1 id="hero-heading" className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Learn Audio Engineering by Playing
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-up [animation-delay:0.2s] leading-relaxed">
            Master the art of audio engineering through interactive games and exercises. 
            From EQ training to mixing challenges, develop your skills with hands-on practice.
          </p>
          <nav aria-label="Main actions" className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up [animation-delay:0.4s]">
            <Button asChild size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <Link href="/games/eq-match" aria-describedby="eq-match-desc">🎮 Play EQ Match</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-200">
              <Link href="/games" aria-describedby="browse-games-desc">📚 Browse Games</Link>
            </Button>
          </nav>
          <div className="visually-hidden">
            <span id="eq-match-desc">Start the EQ Match game to train your ear for frequency identification</span>
            <span id="browse-games-desc">View all available audio engineering learning games</span>
          </div>
        </section>

        {/* Nonprofit Mission */}
        <section aria-labelledby="mission-heading" className="py-16 glass-dark rounded-xl card-float animate-fade-in-up [animation-delay:0.6s]">
          <div className="max-w-4xl mx-auto text-center px-6">
            <div className="text-5xl mb-6 icon-bounce" role="img" aria-label="Mission">🎯</div>
            <h2 id="mission-heading" className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Our Mission</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We believe that quality audio engineering education should be accessible to everyone. 
              Our nonprofit platform combines the power of gamification with professional-grade learning 
              to make audio engineering skills development engaging, effective, and free for all learners.
            </p>
          </div>
        </section>

        {/* Featured Games Preview */}
        <section aria-labelledby="featured-games-heading" className="py-16 animate-fade-in-up [animation-delay:0.8s]">
          <h2 id="featured-games-heading" className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">Featured Learning Games</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-fade-in" role="list" aria-label="Featured games">
            <Card role="listitem" className="glass card-float border-glow group">
              <CardHeader>
                <div className="text-4xl mb-3 icon-bounce">🎚️</div>
                <CardTitle className="group-hover:text-primary motion-safe:transition-all text-gradient">EQ Match</CardTitle>
                <CardDescription>
                  Train your ear to identify frequency ranges and EQ adjustments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Develop critical listening skills by matching EQ curves and identifying problematic frequencies.
                </p>
                <Button asChild className="w-full btn-glow text-white">
                  <Link href="/games/eq-match">Start Training</Link>
                </Button>
              </CardContent>
            </Card>

            <Card role="listitem" className="glass opacity-75 motion-safe:hover:opacity-90 motion-safe:transition-all border-dashed border-glow" aria-describedby="compression-quest-status">
              <CardHeader>
                <div className="text-4xl mb-3 animate-pulse-slow">🔧</div>
                <CardTitle className="flex items-center gap-2 text-shimmer">
                  Compression Quest
                </CardTitle>
                <CardDescription>Coming Soon</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Master dynamic range control through interactive compression challenges.
                </p>
                <Button disabled className="w-full shimmer" aria-describedby="compression-quest-status">
                  Coming Soon
                </Button>
                <span id="compression-quest-status" className="visually-hidden">This game is currently under development</span>
              </CardContent>
            </Card>

            <Card role="listitem" className="glass opacity-75 motion-safe:hover:opacity-90 motion-safe:transition-all border-dashed border-glow" aria-describedby="mix-master-status">
              <CardHeader>
                <div className="text-4xl mb-3 icon-float">🎵</div>
                <CardTitle className="flex items-center gap-2 text-shimmer">
                  Mix Master
                </CardTitle>
                <CardDescription>Coming Soon</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Practice mixing techniques with real multitrack recordings.
                </p>
                <Button disabled className="w-full shimmer" aria-describedby="mix-master-status">
                  Coming Soon
                </Button>
                <span id="mix-master-status" className="visually-hidden">This game is currently under development</span>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
