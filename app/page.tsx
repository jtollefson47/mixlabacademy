import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MusicNoteIcon, EqualizerIcon, ToolIcon, TargetIcon, GamepadIcon, BookIcon } from '@/components/ui/theme-icons'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learn Audio Engineering by Playing | Nonprofit Audio Learning',
  description: 'Master audio engineering through interactive games and exercises. From EQ training to mixing challenges, develop your skills with hands-on practice.',
  keywords: ['audio engineering', 'EQ training', 'mixing', 'education', 'games', 'nonprofit'],
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Skip to content link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Hero Section */}
        <section id="main-content" aria-labelledby="hero-heading" className="text-center section-spacing-lg">
          <div className="mb-8 animate-fade-in">
            <div className="mb-6 flex justify-center">
              <MusicNoteIcon size="2xl" />
            </div>
            <h1 id="hero-heading" className="text-display text-foreground leading-tight mb-6">
              Learn Audio Engineering by Playing
            </h1>
          </div>
          <p className="text-body-large text-muted-foreground mb-8 container-narrow leading-relaxed animate-fade-in">
            Master the art of audio engineering through interactive games and exercises. 
            From EQ training to mixing challenges, develop your skills with hands-on practice.
          </p>
          <nav aria-label="Main actions" className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button asChild size="lg" className="btn-primary text-lg px-8 py-4 focus-ring motion-safe:hover:scale-105 motion-safe:transition-transform">
              <Link href="/games/eq-match" aria-describedby="eq-match-desc" className="flex items-center gap-2">
                <GamepadIcon size="sm" />
                Play EQ Match
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-secondary text-lg px-8 py-4 focus-ring motion-safe:hover:scale-105 motion-safe:transition-transform">
              <Link href="/games" aria-describedby="browse-games-desc" className="flex items-center gap-2">
                <BookIcon size="sm" />
                Browse Games
              </Link>
            </Button>
          </nav>
          <div className="visually-hidden">
            <span id="eq-match-desc">Start the EQ Match game to train your ear for frequency identification</span>
            <span id="browse-games-desc">View all available audio engineering learning games</span>
          </div>
        </section>

        {/* Nonprofit Mission */}
        <section aria-labelledby="mission-heading" className="section-spacing card-elevated glass">
          <div className="container-narrow text-center">
            <div className="mb-6 flex justify-center">
              <TargetIcon size="xl" />
            </div>
            <h2 id="mission-heading" className="text-heading-2 text-primary mb-6">Our Mission</h2>
            <p className="text-body-large text-muted-foreground leading-relaxed">
              We believe that quality audio engineering education should be accessible to everyone. 
              Our nonprofit platform combines the power of gamification with professional-grade learning 
              to make audio engineering skills development engaging, effective, and free for all learners.
            </p>
          </div>
        </section>

        {/* Featured Games Preview */}
        <section aria-labelledby="featured-games-heading" className="section-spacing">
          <h2 id="featured-games-heading" className="text-heading-2 text-primary text-center mb-12">Featured Learning Games</h2>
          <div className="grid-responsive" role="list" aria-label="Featured games">
            <Card role="listitem" className="card-interactive focus-ring group">
              <CardHeader>
                <div className="mb-3 flex justify-center">
                  <EqualizerIcon size="lg" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">EQ Match</CardTitle>
                <CardDescription>
                  Train your ear to identify frequency ranges and EQ adjustments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-small text-muted-foreground mb-4">
                  Develop critical listening skills by matching EQ curves and identifying problematic frequencies.
                </p>
                <Button asChild className="btn-primary w-full focus-ring">
                  <Link href="/games/eq-match">Start Training</Link>
                </Button>
              </CardContent>
            </Card>

            <Card role="listitem" className="card-flat opacity-75 border-dashed" aria-describedby="compression-quest-status">
              <CardHeader>
                <div className="mb-3 flex justify-center">
                  <ToolIcon size="lg" />
                </div>
                <CardTitle className="flex items-center gap-2 text-muted-foreground">
                  Compression Quest
                  <Badge variant="secondary" className="status-info">Coming Soon</Badge>
                </CardTitle>
                <CardDescription>Coming Soon</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-small text-muted-foreground mb-4">
                  Master dynamic range control through interactive compression challenges.
                </p>
                <Button disabled className="w-full" aria-describedby="compression-quest-status">
                  Coming Soon
                </Button>
                <span id="compression-quest-status" className="visually-hidden">This game is currently under development</span>
              </CardContent>
            </Card>

            <Card role="listitem" className="card-flat opacity-75 border-dashed" aria-describedby="mix-master-status">
              <CardHeader>
                <div className="mb-3 flex justify-center">
                  <MusicNoteIcon size="lg" />
                </div>
                <CardTitle className="flex items-center gap-2 text-muted-foreground">
                  Mix Master
                  <Badge variant="secondary" className="status-info">Coming Soon</Badge>
                </CardTitle>
                <CardDescription>Practice mixing techniques with real multitrack recordings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-small text-muted-foreground mb-4">
                  Practice mixing techniques with real multitrack recordings.
                </p>
                <Button disabled className="w-full" aria-describedby="mix-master-status">
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
