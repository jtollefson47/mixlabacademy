'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trophy, Clock, Target, Zap, Users, User } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthProvider'
import { supabase } from '@/lib/supabase'

interface DashboardStats {
  totalGames: number;
  averageScore: number;
  bestScore: number;
  timePlayedHours: number;
  currentStreak: number;
  weeklyGrowth: number;
}

interface RecentGame {
  id: string;
  game_type: string;
  score: number;
  completed_at: string;
}

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalGames: 0,
    averageScore: 0,
    bestScore: 0,
    timePlayedHours: 0,
    currentStreak: 0,
    weeklyGrowth: 0
  })
  const [recentGames, setRecentGames] = useState<RecentGame[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    if (!user) return

    try {
      // If using mock user, create mock dashboard data
      if (user.id === 'mock-user-id') {
        setStats({
          totalGames: 12,
          averageScore: 85,
          bestScore: 95,
          timePlayedHours: 2.5,
          currentStreak: 5,
          weeklyGrowth: 3
        });

        const mockRecentGames: RecentGame[] = [
          {
            id: '1',
            game_type: 'eq_match',
            score: 95,
            completed_at: new Date().toISOString()
          },
          {
            id: '2',
            game_type: 'compression',
            score: 82,
            completed_at: new Date(Date.now() - 86400000).toISOString()
          }
        ];

        setRecentGames(mockRecentGames);
        setLoading(false);
        return;
      }

      // Fetch game sessions
      const { data: gameSessions, error: gamesError } = await supabase
        .from('game_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })

      if (gamesError) {
        console.error('Error fetching game sessions:', gamesError)
        return
      }

      // Calculate stats
      const totalGames = gameSessions?.length || 0
      const scores = gameSessions?.map(g => g.score) || []
      const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
      const bestScore = scores.length > 0 ? Math.max(...scores) : 0
      
      // Calculate time played (assuming each game takes about 5-15 minutes on average)
      const timePlayedHours = Math.round((totalGames * 10) / 60 * 100) / 100

      // Get recent games for display
      const recent = gameSessions?.slice(0, 5) || []

      setStats({
        totalGames,
        averageScore,
        bestScore,
        timePlayedHours,
        currentStreak: Math.min(totalGames, 7), // Simplified streak calculation
        weeklyGrowth: Math.min(totalGames, 15) // Simplified growth calculation
      })

      setRecentGames(recent)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setLoading(false)
    }
  }

  const getGameDisplayName = (gameType: string) => {
    const gameNames: Record<string, string> = {
      'eq_match': 'EQ Match Challenge',
      'phase_alignment': 'Phase Alignment',
      'compression': 'Compression Challenge'
    }
    return gameNames[gameType] || gameType
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 75) return 'text-yellow-400'
    if (score >= 60) return 'text-orange-400'
    return 'text-red-400'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your audio engineering learning progress</p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Games</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGames}</div>
            <p className="text-xs text-muted-foreground">
              {stats.weeklyGrowth > 0 ? `+${stats.weeklyGrowth} this week` : 'Start playing to see progress!'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              Best: {stats.bestScore}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentStreak} days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Played</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.timePlayedHours}h</div>
            <p className="text-xs text-muted-foreground">Total time</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Games */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Games</CardTitle>
          </CardHeader>
          <CardContent>
            {recentGames.length > 0 ? (
              <div className="space-y-4">
                {recentGames.map((game) => (
                  <div key={game.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div>
                        <p className="font-medium">{getGameDisplayName(game.game_type)}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(game.completed_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getScoreColor(game.score)}>
                      {game.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No games played yet</p>
                <Link href="/games">
                  <Button>Start Playing</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learning Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">EQ Fundamentals</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.min(stats.averageScore, 100)}%
                  </span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min(stats.averageScore, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Compression Techniques</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.max(0, Math.min(stats.averageScore - 20, 100))}%
                  </span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.max(0, Math.min(stats.averageScore - 20, 100))}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Phase & Timing</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.max(0, Math.min(stats.averageScore - 10, 100))}%
                  </span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.max(0, Math.min(stats.averageScore - 10, 100))}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Play Games
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Practice your audio engineering skills with interactive challenges
            </p>
            <Link href="/games">
              <Button className="w-full">Browse Games</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with other learners and see leaderboards
            </p>
            <Link href="/community">
              <Button variant="outline" className="w-full">Join Community</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage your profile and learning preferences
            </p>
            <Link href="/profile">
              <Button variant="outline" className="w-full">View Profile</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  )
}
