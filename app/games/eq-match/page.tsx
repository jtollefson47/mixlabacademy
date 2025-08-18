'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Seo } from '@/components/Seo'

export default function EqMatchPage() {
  const { toast } = useToast()

  const handleStartGame = () => {
    toast({
      title: "Game Coming Soon!",
      description: "The EQ Match game is currently in development. Stay tuned for updates!",
      duration: 5000,
    })
  }

  return (
    <>
      <Seo
        title="EQ Match Game"
        description="Train your ear to identify frequency ranges and EQ adjustments with our interactive EQ matching game."
      />
      <div className="container mx-auto px-4 py-8">
        {/* Skip to content link */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md">
          Skip to main content
        </a>

        <div className="max-w-4xl mx-auto">
          {/* Game Header */}
          <header id="main-content" className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3 text-gradient">
              <span className="text-5xl animate-bounce-gentle" role="img" aria-label="Equalizer">🎚️</span>
              EQ Match
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up [animation-delay:0.2s]">
              Train your ear to identify frequency ranges and master EQ adjustments through interactive challenges.
            </p>
          </header>

          {/* Game Panel */}
          <section aria-labelledby="game-panel-heading" className="animate-fade-in-up [animation-delay:0.4s]">
            <Card className="mb-8 border-glow motion-safe:hover:shadow-glow motion-safe:transition-all">
              <CardHeader className="text-center">
                <CardTitle id="game-panel-heading" className="text-2xl">EQ Match (Prototype)</CardTitle>
                <CardDescription>
                  Interactive frequency training game - Coming Next
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="bg-muted rounded-lg p-8 glass animate-scale-in [animation-delay:0.6s]" role="status" aria-live="polite">
                  <div className="text-6xl mb-4 animate-pulse-slow" role="img" aria-label="Under construction">🚧</div>
                  <h3 className="text-lg font-semibold mb-2">Under Development</h3>
                  <p className="text-muted-foreground">
                    We&apos;re crafting an immersive EQ training experience that will help you develop critical listening skills. 
                    The game will feature real audio samples, progressive difficulty levels, and instant feedback.
                  </p>
                </div>
                
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-3 motion-safe:hover:scale-110 motion-safe:transition-all motion-safe:hover:shadow-glow animate-fade-in-up [animation-delay:0.8s]"
                  onClick={handleStartGame}
                  aria-describedby="game-preview-desc"
                >
                  Start Game (Preview)
                </Button>
                <span id="game-preview-desc" className="visually-hidden">
                  This will show a preview notification as the game is still in development
                </span>
              </CardContent>
            </Card>
          </section>

          {/* Game Features Preview */}
          <section aria-labelledby="features-heading">
            <h2 id="features-heading" className="visually-hidden">Game Features</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8" role="list" aria-label="Game features">
              <Card role="listitem">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span role="img" aria-label="Ear">👂</span>
                    Ear Training
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Develop your ability to identify specific frequency ranges and understand how EQ adjustments affect audio.
                  </p>
                </CardContent>
              </Card>

              <Card role="listitem">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span role="img" aria-label="Chart">📈</span>
                    Progressive Difficulty
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Start with basic frequency identification and advance to complex EQ curve matching challenges.
                  </p>
                </CardContent>
              </Card>

              <Card role="listitem">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span role="img" aria-label="Musical note">🎵</span>
                    Real Audio Samples
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Practice with professional-quality audio recordings across various genres and instruments.
                  </p>
                </CardContent>
              </Card>

              <Card role="listitem">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span role="img" aria-label="Chart">📊</span>
                    Performance Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Monitor your progress with detailed statistics and personalized recommendations for improvement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How to Play Section */}
          <section aria-labelledby="how-to-play-heading">
            <Card>
              <CardHeader>
                <CardTitle id="how-to-play-heading">How to Play (Preview)</CardTitle>
                <CardDescription>
                  Here&apos;s what you can expect when the full game launches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-3 text-sm" role="list" aria-label="Game instructions">
                  <li role="listitem">
                    <strong>Listen:</strong> You&apos;ll hear an audio sample with an EQ adjustment applied
                  </li>
                  <li role="listitem">
                    <strong>Identify:</strong> Determine which frequency range has been boosted or cut
                  </li>
                  <li role="listitem">
                    <strong>Match:</strong> Adjust the EQ controls to match the original processing
                  </li>
                  <li role="listitem">
                    <strong>Learn:</strong> Get instant feedback and tips to improve your ear training
                  </li>
                  <li role="listitem">
                    <strong>Progress:</strong> Advance through increasingly challenging scenarios
                  </li>
                </ol>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </>
  )
}
