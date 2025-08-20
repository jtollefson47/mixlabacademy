
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EqualizerIcon, DifficultyIcon } from '@/components/ui/theme-icons'
import { 
  PhaseSvgIcon, 
  CompressorSvgIcon, 
  MixingSvgIcon, 
  ReverbSvgIcon, 
  SpectrumSvgIcon, 
  MasteringSvgIcon,
  SidechainSvgIcon,
  VocalTuningSvgIcon,
  StudioSvgIcon
} from '@/components/svg'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse Games | MixLab Academy',
  description: 'Explore our collection of interactive audio engineering learning games and exercises. Train your ear, master EQ, and improve your mixing skills.',
  keywords: ['audio games', 'EQ match', 'compression', 'mixing games', 'ear training'],
}

// Game status and routing configuration
interface GameConfig {
  id: string
  title: string
  description: string
  details: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  status: 'available' | 'coming-soon'
  route?: string
  icon: React.ComponentType<any>
  iconVariant?: 'default' | 'outline' | 'ghost'
}

const gameConfigs: GameConfig[] = [
  {
    id: 'eq-match',
    title: 'EQ Match',
    description: 'Train your ear to identify frequency ranges and EQ adjustments',
    details: 'Develop critical listening skills by matching EQ curves and identifying problematic frequencies. Perfect for beginners and professionals alike.',
    duration: '10-15 min',
    difficulty: 'beginner',
    status: 'available',
    route: '/games/eq-match',
    icon: EqualizerIcon,
  },
  {
    id: 'phase-alignment',
    title: 'Phase Alignment',
    description: 'Master phase relationships and waveform alignment',
    details: 'Learn to identify and correct phase issues by aligning waveforms. Essential for multi-mic recordings and mixing.',
    duration: '10-15 min',
    difficulty: 'intermediate',
    status: 'available',
    route: '/games/phase-alignment',
    icon: PhaseSvgIcon,
  },
  {
    id: 'compression',
    title: 'Compression Master',
    description: 'Perfect your dynamic range control skills',
    details: 'Master compression settings for different signal types. Learn threshold, ratio, attack, and release timing.',
    duration: '15-20 min',
    difficulty: 'intermediate',
    status: 'available',
    route: '/games/compression',
    icon: CompressorSvgIcon,
  },
  {
    id: 'mixing',
    title: 'Mix Master',
    description: 'Learn professional mixing techniques',
    details: 'Practice mixing techniques with real multitrack recordings and get instant feedback on balance, EQ, and effects.',
    duration: '20-30 min',
    difficulty: 'advanced',
    status: 'coming-soon',
    icon: MixingSvgIcon,
    iconVariant: 'ghost',
  },
  {
    id: 'reverb',
    title: 'Reverb Runner',
    description: 'Master spatial audio and reverb settings',
    details: 'Learn to identify and apply different reverb types and settings for various musical contexts and spaces.',
    duration: '10-15 min',
    difficulty: 'beginner',
    status: 'coming-soon',
    icon: ReverbSvgIcon,
    iconVariant: 'ghost',
  },
  {
    id: 'spectrum',
    title: 'Spectrum Detective',
    description: 'Analyze and identify frequency problems',
    details: 'Analyze frequency spectrums and identify issues in audio recordings like a professional engineer.',
    duration: '15-25 min',
    difficulty: 'intermediate',
    status: 'coming-soon',
    icon: SpectrumSvgIcon,
    iconVariant: 'ghost',
  },
  {
    id: 'mastering',
    title: 'Mastering Challenge',
    description: 'Perfect your mastering skills',
    details: 'Put the finishing touches on tracks with advanced mastering techniques, limiting, and stereo enhancement.',
    duration: '25-35 min',
    difficulty: 'expert',
    status: 'coming-soon',
    icon: MasteringSvgIcon,
    iconVariant: 'ghost',
  },
  {
    id: 'sidechain',
    title: 'Sidechain Specialist',
    description: 'Master sidechain compression techniques',
    details: 'Master the art of sidechain compression and ducking effects for modern productions.',
    duration: '15-20 min',
    difficulty: 'intermediate',
    status: 'coming-soon',
    icon: SidechainSvgIcon,
    iconVariant: 'ghost',
  },
  {
    id: 'vocal-tuning',
    title: 'Vocal Tuning Workshop',
    description: 'Learn pitch correction and vocal enhancement',
    details: 'Learn pitch correction, vocal tuning, and enhancement techniques for professional vocals.',
    duration: '20-25 min',
    difficulty: 'advanced',
    status: 'coming-soon',
    icon: VocalTuningSvgIcon,
    iconVariant: 'ghost',
  },
  {
    id: 'studio-simulator',
    title: 'Studio Simulator',
    description: 'Experience a virtual recording studio',
    details: 'Experience a virtual recording studio with realistic acoustics and professional equipment.',
    duration: '30-45 min',
    difficulty: 'expert',
    status: 'coming-soon',
    icon: StudioSvgIcon,
    iconVariant: 'ghost',
  },
]

function GameCard({ game }: { game: GameConfig }) {
  const IconComponent = game.icon
  const isAvailable = game.status === 'available'
  const cardClasses = isAvailable 
    ? "hover-lift card-shadow group"
    : "glass opacity-75 border-dashed border-glow motion-safe:hover:opacity-90 motion-safe:transition-all"

  return (
    <Card role="listitem" className={cardClasses}>
      <CardHeader>
        <div className="mb-3 flex justify-center">
          <IconComponent size="lg" variant={game.iconVariant || 'default'} />
        </div>
        <CardTitle className={`flex items-center gap-2 ${isAvailable ? 'group-hover:text-primary transition-colors' : 'text-muted-foreground'}`}>
          {game.title}
        </CardTitle>
        <CardDescription>
          {isAvailable ? game.description : 'Coming Soon'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {game.details}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground" aria-label="Game details">
            <span aria-label="Duration">⏱️ {game.duration}</span>
            <DifficultyIcon level={game.difficulty} />
            <span aria-label="Status" className={isAvailable ? "text-green-600 font-medium" : ""}>
              {isAvailable ? "⭐ Available" : "🚧 In Development"}
            </span>
          </div>
          {isAvailable && game.route ? (
            <Button asChild className="w-full btn-glow">
              <Link href={game.route as any}>Play Now</Link>
            </Button>
          ) : (
            <Button disabled className="w-full shimmer">
              Coming Soon
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function GamesPage() {
  const availableGames = gameConfigs.filter(game => game.status === 'available')
  const comingSoonGames = gameConfigs.filter(game => game.status === 'coming-soon')

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Content */}
        <header id="main-content" className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Learning Games</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Master audio engineering concepts through interactive, hands-on exercises designed by industry professionals.
          </p>
        </header>

        {/* Available Games Section */}
        <section aria-labelledby="available-games-heading" className="mb-12">
          <h2 id="available-games-heading" className="text-2xl font-bold mb-6 text-center">Available Now</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Available audio engineering games">
            {availableGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Coming Soon Games Section */}
        <section aria-labelledby="coming-soon-games-heading" className="mb-12">
          <h2 id="coming-soon-games-heading" className="text-2xl font-bold mb-6 text-center">Coming Soon</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Upcoming audio engineering games">
            {comingSoonGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Suggestion Section */}
        <aside aria-labelledby="suggest-game-heading" className="text-center">
          <div className="card-shadow-md rounded-xl p-8 bg-muted/50">
            <div className="mb-4 flex justify-center">
              <StudioSvgIcon size="2xl" variant="ghost" />
            </div>
            <h2 id="suggest-game-heading" className="text-2xl font-bold mb-4">Suggest a New Game</h2>
            <p className="text-muted-foreground mb-6">
              Have an idea for a new learning game? We&apos;d love to hear from you!
            </p>
            <Button variant="outline" asChild className="hover-lift">
              <Link href="mailto:ideas@audiolearning.org" aria-label="Send email with game suggestion">Share Your Idea</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
