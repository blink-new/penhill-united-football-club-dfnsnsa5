import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, Trophy, Calendar, TrendingUp, 
  Play, Target, Activity, Zap, 
  ArrowUp, ArrowDown, Clock, MapPin
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  SparkLine, 
  ConfidenceRing, 
  LiveIndicator, 
  MatchStatusChip,
  FootballIcon,
  ChartIcon
} from './icons/SkyIcons'

interface DashboardProps {
  onPageChange?: (page: string) => void
}

export function Dashboard({ onPageChange }: DashboardProps = {}) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Mock data for demonstration
  const stats = [
    { 
      icon: Users, 
      label: 'Active Players', 
      value: '247', 
      change: '+12%', 
      trend: 'up',
      sparkData: [45, 52, 48, 61, 55, 67, 72, 69, 75, 82, 78, 85],
      color: '#0686E1'
    },
    { 
      icon: Trophy, 
      label: 'Trophies Won', 
      value: '18', 
      change: '+3', 
      trend: 'up',
      sparkData: [12, 13, 14, 15, 15, 16, 17, 17, 18, 18, 18, 18],
      color: '#F59E0B'
    },
    { 
      icon: Calendar, 
      label: 'Matches Played', 
      value: '156', 
      change: '+8', 
      trend: 'up',
      sparkData: [120, 125, 130, 135, 140, 145, 148, 150, 152, 154, 155, 156],
      color: '#6B46F6'
    },
    { 
      icon: TrendingUp, 
      label: 'Win Rate', 
      value: '78%', 
      change: '+5%', 
      trend: 'up',
      sparkData: [65, 68, 70, 72, 74, 75, 76, 77, 77, 78, 78, 78],
      color: '#22C55E'
    }
  ]

  const quickActions = [
    { 
      icon: Calendar, 
      label: 'Schedule Practice', 
      color: 'sky-gradient',
      description: 'Book training session',
      page: 'training'
    },
    { 
      icon: Users, 
      label: 'Team Selection', 
      color: 'bg-purple-600',
      description: 'Pick match squad',
      page: 'teams'
    },
    { 
      icon: ChartIcon, 
      label: 'AI Analytics', 
      color: 'bg-green-600',
      description: 'View AI insights',
      page: 'ai-analytics'
    },
    { 
      icon: Play, 
      label: 'Match Center', 
      color: 'bg-orange-600',
      description: 'Review matches',
      page: 'match-center'
    }
  ]

  const upcomingMatches = [
    {
      opponent: 'Arsenal FC Youth',
      date: '2025-07-20',
      time: '15:00',
      venue: 'Home',
      status: 'upcoming' as const,
      confidence: 87
    },
    {
      opponent: 'Chelsea Academy',
      date: '2025-07-25',
      time: '14:30',
      venue: 'Away',
      status: 'upcoming' as const,
      confidence: 72
    },
    {
      opponent: 'Tottenham Youth',
      date: '2025-07-28',
      time: '16:00',
      venue: 'Home',
      status: 'upcoming' as const,
      confidence: 91
    }
  ]

  const recentResults = [
    {
      opponent: 'Manchester United Youth',
      score: '3-1',
      result: 'win',
      date: '2025-07-10'
    },
    {
      opponent: 'Liverpool Academy',
      score: '2-2',
      result: 'draw',
      date: '2025-07-07'
    },
    {
      opponent: 'Brighton Youth',
      score: '4-0',
      result: 'win',
      date: '2025-07-03'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 neural-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-display mb-2">
                <span className="stat-gradient">AI Command Centre</span>
              </h1>
              <p className="text-muted-foreground">
                Real-time intelligence for Penhill United FC • {currentTime.toLocaleDateString('en-GB', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <LiveIndicator />
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {currentTime.toLocaleTimeString('en-GB', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </Badge>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          
          {/* Stats Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card className="glass-card hover:sky-glow micro-transition card-entrance">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <stat.icon className="w-8 h-8 text-muted-foreground" />
                        <Badge 
                          variant={stat.trend === 'up' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {stat.trend === 'up' ? (
                            <ArrowUp className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowDown className="w-3 h-3 mr-1" />
                          )}
                          {stat.change}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-display stat-gradient">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                        <div className="flex items-center justify-between">
                          <SparkLine 
                            data={stat.sparkData} 
                            color={stat.color}
                            className="opacity-80"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-accent" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="haptic-bounce"
                    >
                      <Button
                        className={`w-full h-20 flex flex-col items-center justify-center space-y-2 ${action.color} text-white hover:opacity-90 micro-transition`}
                        onClick={() => onPageChange?.(action.page)}
                      >
                        <action.icon className="w-6 h-6" />
                        <div className="text-center">
                          <div className="text-sm font-medium">{action.label}</div>
                          <div className="text-xs opacity-80">{action.description}</div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Upcoming Matches */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FootballIcon className="w-5 h-5 text-accent" />
                    <span>Upcoming Fixtures</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingMatches.map((match, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 micro-transition"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <FootballIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold">{match.opponent}</div>
                          <div className="text-sm text-muted-foreground flex items-center space-x-2">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(match.date).toLocaleDateString('en-GB')}</span>
                            <Clock className="w-3 h-3 ml-2" />
                            <span>{match.time}</span>
                            <MapPin className="w-3 h-3 ml-2" />
                            <span>{match.venue}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <ConfidenceRing confidence={match.confidence} size={60} />
                        <MatchStatusChip status={match.status} />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Insights & Recent Results */}
            <motion.div variants={itemVariants} className="space-y-6">
              
              {/* AI Performance Prediction */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-accent" />
                    <span>AI Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <ConfidenceRing confidence={87} size={100} />
                    <div className="mt-3">
                      <div className="text-sm font-medium">Next Match Prediction</div>
                      <div className="text-xs text-muted-foreground">
                        87% probability of clean sheet based on last 5 matches
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Attack Strength</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Defense Rating</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Team Morale</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Results */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-accent" />
                    <span>Recent Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                      <div>
                        <div className="font-medium text-sm">{result.opponent}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(result.date).toLocaleDateString('en-GB')}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-tabular">{result.score}</span>
                        <Badge 
                          variant={
                            result.result === 'win' ? 'default' : 
                            result.result === 'draw' ? 'secondary' : 
                            'destructive'
                          }
                          className="text-xs"
                        >
                          {result.result.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}