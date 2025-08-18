import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Seo } from '@/components/Seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Audio Learning Games | Nonprofit Audio Learning',
  description: 'Explore our collection of interactive audio engineering games. Train your ear, master EQ, and improve your mixing skills.',
  keywords: ['audio games', 'EQ match', 'compression', 'mixing games', 'ear training'],
}

export default function GamesPage() {
  return (
    <>
      <Seo
        title="Browse Games"
        description="Explore our collection of interactive audio engineering learning games and exercises."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900">
        <div className="container mx-auto px-4 py-8">
          {/* Skip to content link */}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md">
            Skip to main content
          </a>

          <header id="main-content" className="text-center mb-12 animate-fade-in">
            <div className="mb-6">
              <span className="text-6xl md:text-8xl icon-float" role="img" aria-label="Game controller">🎮</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Learning Games</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up [animation-delay:0.2s] leading-relaxed">
              Choose from our collection of interactive audio engineering games designed to build your skills progressively.
            </p>
          </header>

          <section aria-labelledby="games-section-heading" className="animate-fade-in-up [animation-delay:0.4s]">
            <h2 id="games-section-heading" className="visually-hidden">Available Games</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto stagger-fade-in" role="list" aria-label="Audio engineering games">
            {/* EQ Match Game */}
            <Card role="listitem" className="glass card-float border-glow group">
              <CardHeader>
                <div className="text-4xl mb-3 icon-bounce" role="img" aria-label="Equalizer icon">🎚️</div>
                <CardTitle className="flex items-center gap-2 group-hover:text-primary motion-safe:transition-all text-gradient">
                  EQ Match
                </CardTitle>
                <CardDescription>
                  Train your ear to identify frequency ranges and EQ adjustments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Develop critical listening skills by matching EQ curves and identifying problematic frequencies. 
                    Perfect for beginners and professionals alike.
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground" aria-label="Game details">
                    <span aria-label="Duration">⏱️ 10-15 min</span>
                    <span aria-label="Difficulty">🎯 Beginner</span>
                    <span aria-label="Status" className="text-green-600 font-medium">⭐ Available</span>
                  </div>
                  <Button asChild className="w-full btn-glow text-white">
                    <Link href="/games/eq-match">Play Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Coming Soon Games */}
            <Card role="listitem" className="glass opacity-75 border-dashed border-glow motion-safe:hover:opacity-90 motion-safe:transition-all" aria-describedby="compression-quest-status">
              <CardHeader>
                <div className="text-4xl mb-3 animate-pulse-slow" role="img" aria-label="Tool icon">🔧</div>
                <CardTitle className="flex items-center gap-2 text-shimmer">
                  Compression Quest
                </CardTitle>
                <CardDescription>Coming Soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Master dynamic range control through interactive compression challenges and real-world scenarios.
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground" aria-label="Game details">
                    <span aria-label="Duration">⏱️ 15-20 min</span>
                    <span aria-label="Difficulty">🎯 Intermediate</span>
                    <span aria-label="Status">🚧 In Development</span>
                  </div>
                  <Button disabled className="w-full shimmer" aria-describedby="compression-quest-status">
                    Coming Soon
                  </Button>
                  <span id="compression-quest-status" className="visually-hidden">This game is currently under development</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass opacity-75 border-dashed border-glow motion-safe:hover:opacity-90 motion-safe:transition-all">
              <CardHeader>
                <div className="text-4xl mb-3 icon-float" role="img" aria-label="Musical note">🎵</div>
                <CardTitle className="flex items-center gap-2 text-shimmer">
                  Mix Master
                </CardTitle>
                <CardDescription>Coming Soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Practice mixing techniques with real multitrack recordings and get instant feedback.
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>⏱️ 20-30 min</span>
                    <span>🎯 Advanced</span>
                    <span>🚧 In Development</span>
                  </div>
                  <Button disabled className="w-full shimmer">
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass opacity-75 border-dashed border-glow motion-safe:hover:opacity-90 motion-safe:transition-all">
              <CardHeader>
                <div className="text-4xl mb-3 animate-pulse-slow" role="img" aria-label="Microphone">🎤</div>
                <CardTitle className="flex items-center gap-2 text-shimmer">
                  Reverb Runner
                </CardTitle>
                <CardDescription>Coming Soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Learn to identify and apply different reverb types and settings for various musical contexts.
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>⏱️ 10-15 min</span>
                    <span>🎯 Beginner</span>
                    <span>🚧 In Development</span>
                  </div>
                  <Button disabled className="w-full shimmer">
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass opacity-75 border-dashed border-glow motion-safe:hover:opacity-90 motion-safe:transition-all">
              <CardHeader>
                <div className="text-4xl mb-3 icon-float [animation-delay:0.5s]" role="img" aria-label="Chart">📊</div>
                <CardTitle className="flex items-center gap-2 text-shimmer">
                  Spectrum Detective
                </CardTitle>
                <CardDescription>Coming Soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Analyze frequency spectrums and identify issues in audio recordings like a professional engineer.
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>⏱️ 15-25 min</span>
                    <span>🎯 Intermediate</span>
                    <span>🚧 In Development</span>
                  </div>
                  <Button disabled className="w-full shimmer">
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass opacity-75 border-dashed border-glow motion-safe:hover:opacity-90 motion-safe:transition-all">
              <CardHeader>
                <div className="text-4xl mb-3 icon-bounce [animation-delay:1s]" role="img" aria-label="Musical score">🎼</div>
                <CardTitle className="flex items-center gap-2 text-shimmer">
                  Mastering Challenge
                </CardTitle>
                <CardDescription>Coming Soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Put the finishing touches on tracks with advanced mastering techniques and tools.
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>⏱️ 25-35 min</span>
                    <span>🎯 Expert</span>
                    <span>🚧 In Development</span>
                  </div>
                  <Button disabled className="w-full shimmer">
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          </section>

          <aside aria-labelledby="suggest-game-heading" className="text-center mt-12 animate-fade-in-up [animation-delay:1s]">
            <div className="glass-dark rounded-xl p-8 card-float">
              <div className="text-5xl mb-4 icon-bounce" role="img" aria-label="Light bulb">💡</div>
              <h2 id="suggest-game-heading" className="text-2xl font-bold mb-4 text-gradient">Suggest a New Game</h2>
              <p className="text-muted-foreground mb-6">
                Have an idea for a new learning game? We&apos;d love to hear from you!
              </p>
              <Button variant="outline" asChild className="btn-glow border-glow">
                <Link href="mailto:ideas@audiolearning.org" aria-label="Send email with game suggestion">Share Your Idea</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
