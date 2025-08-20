'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Star, Zap, Calendar, Users } from 'lucide-react';

export default function LeaderboardsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'best_score' | 'total_games' | 'average_score' | 'current_streak'>('best_score');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'all_time' | 'this_month' | 'this_week'>('all_time');

  const categories = [
    {
      id: 'best_score' as const,
      label: 'Top Scores',
      description: 'Highest individual scores',
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      id: 'total_games' as const,
      label: 'Most Active',
      description: 'Total games played',
      icon: Target,
      color: 'text-blue-500'
    },
    {
      id: 'average_score' as const,
      label: 'Consistent Players',
      description: 'Best average scores',
      icon: Star,
      color: 'text-purple-500'
    },
    {
      id: 'current_streak' as const,
      label: 'Streak Masters',
      description: 'Current daily streaks',
      icon: Zap,
      color: 'text-orange-500'
    }
  ];

  const timeframes = [
    { id: 'all_time' as const, label: 'All Time' },
    { id: 'this_month' as const, label: 'This Month' },
    { id: 'this_week' as const, label: 'This Week' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-white">Leaderboards</h1>
        </div>

        {/* Category Selection */}
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              Competition Categories
            </CardTitle>
            <CardDescription>
              Choose a category to see the top performers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => {
                const CategoryIcon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category.id)}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <CategoryIcon className={`h-6 w-6 ${
                      selectedCategory === category.id ? 'text-primary-foreground' : category.color
                    }`} />
                    <div className="text-center">
                      <p className="font-medium">{category.label}</p>
                      <p className="text-xs opacity-70">{category.description}</p>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Timeframe Selection */}
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Time Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {timeframes.map((timeframe) => (
                <Button
                  key={timeframe.id}
                  variant={selectedTimeframe === timeframe.id ? 'default' : 'outline'}
                  onClick={() => setSelectedTimeframe(timeframe.id)}
                  size="sm"
                >
                  {timeframe.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Leaderboard */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Primary Leaderboard Placeholder */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  {categories.find(c => c.id === selectedCategory)?.label} - {timeframes.find(t => t.id === selectedTimeframe)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="py-12">
                <div className="text-center">
                  <Trophy className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Leaderboards Coming Soon!</h3>
                  <p className="text-slate-400 mb-6">
                    Start playing games to be among the first to appear on our leaderboards when they go live.
                  </p>
                  <Button>Start Playing Games</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Stats */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Competition Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Active Players</span>
                  <span className="text-white font-medium">Coming Soon</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Games This Week</span>
                  <span className="text-white font-medium">Coming Soon</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Average Score</span>
                  <span className="text-white font-medium">Coming Soon</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Top Score Today</span>
                  <span className="text-white font-medium">Coming Soon</span>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-white">Join the Competition!</CardTitle>
                <CardDescription>
                  Play games to climb the leaderboards and earn your place among the top audio engineers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Start Playing
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
